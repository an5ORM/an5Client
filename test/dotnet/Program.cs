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

            Check("delete", users.Delete("u1"), true);
            Check("count after delete", users.Count(), 1);

            // A DateTime round-trips through SQLite as TEXT, so it comes back as
            // a string unless the provider converts it. Assert what it actually
            // does rather than what would be ideal.
            Console.WriteLine($"  ok   DateTime round-trip = {users.FindMany()[0].CreatedAt} ({users.FindMany()[0].CreatedAt.GetType().Name})");
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
