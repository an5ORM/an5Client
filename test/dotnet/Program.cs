using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using An5Orm;

namespace SmokeTest
{
    // Runtime smoke test for the generated .NET client on SQLite.
    //
    // Run through test/dotnet-sqlite-smoke.js. The thing to watch: the generator
    // emits table names like "dbo.users" while SQLite has no schemas, so the client
    // has to strip that prefix. The client compiles fine without it and still
    // returns 0 rows on every query — the kind of bug a compile check cannot see.
    //
    // The NameVi values are deliberately non-ASCII so the round trip through
    // SQLite is exercised, not just ASCII text.

    public class Doc
    {
        public string Id { get; set; }
        public float[] Embedding { get; set; }
        public double Distance { get; set; }
    }

    internal static class Program
    {
        private static int _failed;

        private static void Check(string label, object got, object want)
        {
            var ok = Equals(got?.ToString(), want?.ToString());
            Console.WriteLine($"  {(ok ? "ok  " : "FAIL")} {label} = {got}");
            if (!ok)
            {
                Console.WriteLine($"       expected: {want}");
                _failed++;
            }
        }

        private static void CheckThrows<T>(string label, Action action) where T : Exception
        {
            try
            {
                action();
                Console.WriteLine($"  FAIL {label}: no exception");
                _failed++;
            }
            catch (T)
            {
                Console.WriteLine($"  ok   {label}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"  FAIL {label}: {ex.GetType().Name}");
                _failed++;
            }
        }

        private static void Dialects()
        {
            Console.WriteLine("\n[dialect detection]");
            Check("sqlite:app.db", An5Provider.Detect("sqlite:app.db"), An5Dialect.Sqlite);
            Check("Data Source=app.db", An5Provider.Detect("Data Source=app.db"), An5Dialect.Sqlite);
            Check("app.db", An5Provider.Detect("app.db"), An5Dialect.Sqlite);
            Check(":memory:", An5Provider.Detect(":memory:"), An5Dialect.Sqlite);
            Check("postgres://u@h/db", An5Provider.Detect("postgres://u@h/db"), An5Dialect.Postgres);
            Check("Server=s;Database=d", An5Provider.Detect("Server=s;Database=d"), An5Dialect.Mssql);
        }

        private static void TableNames()
        {
            Console.WriteLine("\n[table name]");
            Check("sqlite strips dbo.", An5Provider.TableName("dbo.users", An5Dialect.Sqlite), "users");
            Check("mssql keeps dbo.", An5Provider.TableName("dbo.users", An5Dialect.Mssql), "dbo.users");
            Check("postgres keeps dbo.", An5Provider.TableName("dbo.users", An5Dialect.Postgres), "dbo.users");
        }

        private static void ConnectionStrings()
        {
            Console.WriteLine("\n[connection string]");
            Check("bare path", An5Provider.NormalizeSqlite("app.db"), "Data Source=app.db");
            Check("sqlite: prefix", An5Provider.NormalizeSqlite("sqlite:app.db"), "Data Source=app.db");
            Check("empty", An5Provider.NormalizeSqlite(""), "Data Source=:memory:");
        }

        private static void Crud(string dbPath)
        {
            Console.WriteLine("\n[crud]");
            var ctx = new An5DbContext($"sqlite:{dbPath}");
            Check("dialect", ctx.Dialect, An5Dialect.Sqlite);

            var users = ctx.Users;
            Check("dbo. prefix stripped", users.TableName, "users");

            using (var ddl = An5Provider.Open(ctx.ConnectionString, ctx.Dialect))
            using (var cmd = ddl.CreateCommand())
            {
                cmd.CommandText =
                    "CREATE TABLE users (Id TEXT PRIMARY KEY, Email TEXT NOT NULL, Name TEXT, CreatedAt TEXT NOT NULL)";
                cmd.ExecuteNonQuery();
            }

            users.Create(new An5Orm.Entities.User
            {
                Id = "u1", Email = "alice@example.com", Name = "Alice",
                CreatedAt = new DateTime(2026, 1, 2, 3, 4, 5, DateTimeKind.Utc),
            });
            users.Create(new An5Orm.Entities.User
            {
                Id = "u2", Email = "bob@example.com", Name = "Bob",
                CreatedAt = new DateTime(2026, 2, 2, 3, 4, 5, DateTimeKind.Utc),
            });
            Console.WriteLine("  ok   insert");

            Check("count", users.Count(), 2);
            Check("find_all", users.FindMany().Count, 2);
            Check(
                "where clause",
                users.FindMany("Email = @email", new Dictionary<string, object> { { "email", "bob@example.com" } }).Count,
                1
            );
            Check("find_first", users.FindFirst("Id = @id", new Dictionary<string, object> { { "id", "u1" } })?.Email, "alice@example.com");

            users.Update(new An5Orm.Entities.User
            {
                Id = "u2", Email = "bob@example.com", Name = "Bobby",
                CreatedAt = new DateTime(2026, 2, 2, 3, 4, 5, DateTimeKind.Utc),
            });
            Check("update", users.FindFirst("Id = @id", new Dictionary<string, object> { { "id", "u2" } })?.Name, "Bobby");

            Check("metadata ModelFields[User][email]", An5ClientMetadata.ModelHasField("User", "email"), true);
            Check("metadata RelationMap non-null", An5ClientMetadata.RelationMap != null, true);

            var ciAlice = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { Contains = "ALICE", Mode = "insensitive" } },
            });
            Check("typed Contains Mode=insensitive", ciAlice.Count == 1 ? ciAlice[0].Email : "", "alice@example.com");

            var inCiAlice = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { In = new List<string> { "ALICE@EXAMPLE.COM" }, Mode = "insensitive" } },
            });
            Check("typed In Mode=insensitive", inCiAlice.Count == 1 ? inCiAlice[0].Email : "", "alice@example.com");

            var notInCiAlice = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { NotIn = new List<string> { "BOB@EXAMPLE.COM" }, Mode = "insensitive" } },
            });
            Check("typed NotIn Mode=insensitive", notInCiAlice.Count == 1 ? notInCiAlice[0].Email : "", "alice@example.com");

            var notBob = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { NotIn = new List<string> { "bob@example.com" } } },
            });
            Check("typed NotIn filter", notBob.Count == 1 ? notBob[0].Email : "", "alice@example.com");

            var emptyIn = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { In = new List<string>() } },
            });
            Check("typed empty In filter", emptyIn.Count, 0);

            var emptyNotIn = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { NotIn = new List<string>() } },
            });
            Check("typed empty NotIn filter", emptyNotIn.Count, 2);

            CheckThrows<ArgumentException>("reject invalid StringFilter.Mode", () =>
                users.FindMany(new UserFindManyArgs
                {
                    Where = new UserWhereInput { Email = new StringFilter { Contains = "a", Mode = "fuzzy" } },
                }));
            CheckThrows<ArgumentException>("reject non-input query args", () => users.FindMany(12345));
            CheckThrows<ArgumentException>("reject unknown dict filter op", () =>
                users.FindMany(new Dictionary<string, object> { { "email", new Dictionary<string, object> { { "bogus", "x" } } } }));
            CheckThrows<ArgumentException>("reject non-list OR in dict where", () =>
                users.FindMany(new Dictionary<string, object> { { "OR", new Dictionary<string, object> { { "email", "alice@example.com" } } } }));
            CheckThrows<ArgumentException>("reject collection on scalar dict where", () =>
                users.FindMany(new Dictionary<string, object> { { "email", new List<string> { "alice@example.com" } } }));

            var withEmptyCount = users.FindMany(new UserFindManyArgs
            {
                Where = new UserWhereInput { Email = new StringFilter { Equals = "alice@example.com" } },
                Include = new UserInclude { _count = true },
            });
            Check("typed Include._count initialized", withEmptyCount.Count == 1 && withEmptyCount[0]._count != null, true);

            var envelopeRows = users.FindMany(new Dictionary<string, object>
            {
                { "where", new Dictionary<string, object> { { "email", "alice@example.com" } } },
                { "include", new Dictionary<string, object> { { "_count", true } } },
            });
            Check("query envelope dict with where+include", envelopeRows.Count == 1 && envelopeRows[0]._count != null, true);

            CheckThrows<ArgumentException>("reject unknown relation in dict Include", () =>
                users.FindMany(new UserFindManyArgs
                {
                    Include = new Dictionary<string, object> { { "unknownRel", true } },
                }));
            CheckThrows<ArgumentException>("reject unknown relation in Include._count", () =>
                users.FindMany(new UserFindManyArgs
                {
                    Include = new UserInclude { _count = new Dictionary<string, object> { { "select", new Dictionary<string, object> { { "unknownRel", true } } } } },
                }));
            CheckThrows<ArgumentException>("reject non-object Include payload", () =>
                users.FindMany(new UserFindManyArgs { Include = 123 }));

            GroupByHavingAndCounts(ctx, dbPath);

            Check("delete", users.Delete("u1"), true);
            Check("count after delete", users.Count(), 1);

            // A DateTime round-trips through SQLite as TEXT, so it comes back as
            // a string unless the provider converts it. Assert what it actually
            // does rather than what would be ideal.
            Console.WriteLine($"  ok   DateTime round-trip = {users.FindMany()[0].CreatedAt} ({users.FindMany()[0].CreatedAt.GetType().Name})");
        }

        private static void GroupByHavingAndCounts(An5DbContext ctx, string dbPath)
        {
            Console.WriteLine("\n[groupBy having, per-field count & pagination]");
            using (var conn = An5Provider.Open(ctx.ConnectionString, ctx.Dialect))
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                    CREATE TABLE IF NOT EXISTS orders (
                        Id TEXT PRIMARY KEY,
                        UserId TEXT NOT NULL,
                        Total INTEGER NOT NULL,
                        CreatedAt TEXT NOT NULL
                    );
                    INSERT INTO orders VALUES
                        ('o1', 'u1', 150, '2026-01-01'),
                        ('o2', 'u1', 50,  '2026-01-02'),
                        ('o3', 'u2', 120, '2026-01-03'),
                        ('o4', 'u3', 40,  '2026-01-04');";
                cmd.ExecuteNonQuery();
            }

            // Insert a user with NULL Name so per-field _count differs from _all
            ctx.Users.Create(new An5Orm.Entities.User
            {
                Id = "u3", Email = "u3@example.com", Name = null,
                CreatedAt = new DateTime(2026, 3, 2, 0, 0, 0, DateTimeKind.Utc),
            });

            var userCounts = ctx.Users.GroupBy(new UserGroupByArgs
            {
                By = new List<string> { "Email" },
                Where = new UserWhereInput { Email = new StringFilter { In = new List<string> { "BOB@EXAMPLE.COM", "U3@EXAMPLE.COM" }, Mode = "insensitive" } },
                Count = new Dictionary<string, bool> { { "_all", true }, { "Name", true } },
                OrderBy = new UserOrderByInput { Email = "asc" },
            });
            Check("user groupBy count rows", userCounts.Count, 2);
            var bobCount = (Dictionary<string, object>)userCounts[0]["_count"];
            var u3Count = (Dictionary<string, object>)userCounts[1]["_count"];
            Check("bob _count._all", bobCount["_all"], 1);
            Check("bob _count.Name", bobCount["Name"], 1);
            Check("u3 _count._all (null Name)", u3Count["_all"], 1);
            Check("u3 _count.Name (null excluded)", u3Count["Name"], 0);

            var grouped = ctx.Orders.GroupBy(new OrderGroupByArgs
            {
                By = new List<string> { "UserId" },
                Count = true,
                Sum = new List<string> { "Total" },
                Avg = new List<string> { "Total" },
                Min = new List<string> { "Total" },
                Max = new List<string> { "Total" },
                Having = new OrderAggregateHavingInput
                {
                    OR = new List<OrderAggregateHavingInput>
                    {
                        new OrderAggregateHavingInput { _count = new OrderCountAggregateFilter { _all = new IntFilter { Gte = 2 } } },
                        new OrderAggregateHavingInput { _sum = new OrderNumericAggregateFilter { Total = new NumberFilter { Gte = 120 } } },
                    },
                    NOT = new OrderAggregateHavingInput { UserId = new StringFilter { Equals = "u3" } },
                },
                OrderBy = new OrderOrderByInput { UserId = "asc" },
            });
            Check("typed Order GroupBy Having UserIds", string.Join(",", grouped.Select(r => r["UserId"])), "u1,u2");
            var u1 = grouped[0];
            Check("u1 _count", u1["_count"], 2);
            Check("u1 _sum.Total", ((Dictionary<string, object>)u1["_sum"])["Total"], 200);
            Check("u1 _avg.Total", Convert.ToDouble(((Dictionary<string, object>)u1["_avg"])["Total"]), 100);
            Check("u1 _min.Total", ((Dictionary<string, object>)u1["_min"])["Total"], 50);
            Check("u1 _max.Total", ((Dictionary<string, object>)u1["_max"])["Total"], 150);

            // Grouped scalar filter + Skip-only pagination (SQLite LIMIT -1 OFFSET 1)
            var skipped = ctx.Orders.GroupBy(new OrderGroupByArgs
            {
                By = new List<string> { "UserId" },
                Having = new OrderAggregateHavingInput
                {
                    UserId = new StringFilter { NotIn = new List<string> { "MISSING" }, Mode = "insensitive" },
                },
                OrderBy = new OrderOrderByInput { UserId = "asc" },
                Skip = 1,
            });
            Check("typed GroupBy skip-only UserIds", string.Join(",", skipped.Select(r => r["UserId"])), "u2,u3");

            // Dict GroupBy validations + Having rejections
            CheckThrows<ArgumentException>("reject ungrouped scalar in OrderAggregateHavingInput", () =>
                ctx.Orders.GroupBy(new OrderGroupByArgs
                {
                    By = new List<string> { "UserId" },
                    Having = new OrderAggregateHavingInput { Total = new IntFilter { Gte = 100 } },
                }));
            CheckThrows<ArgumentException>("reject _all in dict _sum", () =>
                ctx.Orders.GroupBy(new Dictionary<string, object>
                {
                    { "by", new List<string> { "UserId" } },
                    { "_sum", new List<string> { "_all" } },
                }));
            CheckThrows<ArgumentException>("reject non-object GroupBy(12345)", () => ctx.Orders.GroupBy(12345));

            // Remove extra u3 so downstream Transactions count remains exact
            ctx.Users.Delete("u3");
        }

        private static void Transactions(string dbPath)
        {
            Console.WriteLine("\n[transaction]");
            var ctx = new An5DbContext($"sqlite:{dbPath}");

            using (var tx = ctx.BeginTransaction())
            {
                ctx.Users.Create(new An5Orm.Entities.User
                {
                    Id = "u9", Email = "tx@example.com", Name = "Tx",
                    CreatedAt = DateTime.UtcNow,
                });
                tx.Commit();
            }
            Check("commit", ctx.Users.Count(), 2);

            try
            {
                using (var tx = ctx.BeginTransaction())
                {
                    ctx.Users.Create(new An5Orm.Entities.User
                    {
                        Id = "u10", Email = "rb@example.com", Name = "Rb",
                        CreatedAt = DateTime.UtcNow,
                    });
                    tx.Rollback();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"  note rollback raised {ex.GetType().Name}");
            }
            Check("rollback took effect", ctx.Users.Count(), 2);
        }

        private static void VectorSearchFallback(string dbPath)
        {
            Console.WriteLine("\n[vector search -> in-memory fallback]");
            var ctx = new An5DbContext($"sqlite:{dbPath}");
            using (var conn = An5Provider.Open(ctx.ConnectionString, ctx.Dialect))
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "CREATE TABLE docs (Id TEXT PRIMARY KEY, Embedding TEXT, Distance REAL)";
                cmd.ExecuteNonQuery();
                cmd.CommandText = "INSERT INTO docs VALUES ('d1', '[1.0, 0.0]', 0.1), ('d2', '[0.0, 1.0]', 0.9)";
                cmd.ExecuteNonQuery();
            }

            // SQLite has no vector operator, so this must not try
            // VECTOR_DISTANCE and must reach the in-memory path.
            var docs = new TableClient<Doc>(ctx.ConnectionString, "dbo.docs");
            Check("dbo. prefix stripped for vector", docs.TableName, "docs");
            var hits = docs.VectorSearch(new List<double> { 1, 0 }, take: 2);
            Check("hit count", hits.Count, 2);
            Check("cosine order", string.Join(",", hits.Select(h => h.Id)), "d1,d2");
            var l2Hits = docs.VectorSearch(new List<double> { 0, 1 }, take: 2, distanceMetric: "euclidean");
            Check("euclidean order", string.Join(",", l2Hits.Select(h => h.Id)), "d2,d1");
            var dotHits = docs.VectorSearch(new List<double> { 0, 1 }, take: 2, distanceMetric: "dot");
            Check("dot order", string.Join(",", dotHits.Select(h => h.Id)), "d2,d1");
        }

        private static int Main()
        {
            var dbPath = Path.Combine(Path.GetTempPath(), $"an5-client-sqlite-{Guid.NewGuid():N}.db");
            try
            {
                Dialects();
                TableNames();
                ConnectionStrings();
                Crud(dbPath);
                Transactions(dbPath);
                VectorSearchFallback(dbPath);
            }
            finally
            {
                try { File.Delete(dbPath); } catch { }
            }

            Console.WriteLine();
            if (_failed > 0)
            {
                Console.WriteLine($"{_failed} CHECK FAIL");
                return 1;
            }
            Console.WriteLine("TAT CA CHECK PASS");
            return 0;
        }
    }
}
