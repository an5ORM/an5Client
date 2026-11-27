"""Exercise the generated Python client through its real SQLite adapter."""
from pathlib import Path
import sys
import tempfile
import unittest

root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / "python"))
adapter_source = root.parent / "an5Adapters" / "python"
if adapter_source.is_dir():
    sys.path.insert(0, str(adapter_source))
from an5_client import An5Client
from an5_orm_types import (
    IntFilter,
    NumberFilter,
    OrderAggregateHavingInput,
    OrderGroupByArgs,
    OrderInclude,
    StringFilter,
    UserCreateInput,
    UserFindFirstArgs,
    UserFindManyArgs,
    UserFindUniqueArgs,
    UserInclude,
    UserOrderByInput,
    UserUpdateInput,
    UserWhereInput,
)

class GeneratedClientRuntime(unittest.TestCase):
    def test_sqlite_crud_and_boolean_filters(self):
        with tempfile.TemporaryDirectory(prefix="an5-client-python-") as directory:
            client = An5Client("sqlite:" + str(Path(directory) / "client.sqlite"))
            client.execute_raw("CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT, created_at TEXT)")
            for number in range(1, 4):
                client.user.create({"id": str(number), "email": f"{number}@example.com", "name": "User"})
            self.assertEqual(client.user.count(), 3)
            self.assertEqual(client.user.find_many(where={"OR": []}), [])
            self.assertEqual([r["id"] for r in client.user.find_many(where={"NOT": [{"id": "1"}, {"id": "2"}]})], ["3"])
            self.assertEqual(client.user.update_many(None, {"name": "Updated"})["count"], 3)
            self.assertEqual(client.user.delete_many()["count"], 3)
            self.assertEqual(client.user.count(), 0)

    def test_typed_dataclasses_snake_case_keys_and_strict_validation(self):
        with tempfile.TemporaryDirectory(prefix="an5-client-python-") as directory:
            client = An5Client("sqlite:" + str(Path(directory) / "typed.sqlite"))
            client.execute_raw(
                'CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, name TEXT, createdAt TEXT NOT NULL DEFAULT \'2026-01-01T00:00:00Z\')'
            )

            created_a = client.user.create(UserCreateInput(email="alice@example.com", name="Alice"))
            created_b = client.user.create({"email": "bob@example.com", "name": "Bob", "created_at": "2026-01-02T00:00:00Z"})
            self.assertEqual(created_a["email"], "alice@example.com")
            self.assertEqual(created_b["createdAt"], "2026-01-02T00:00:00Z")

            updated = client.user.update(
                where=UserWhereInput(email=StringFilter(equals="alice@example.com")),
                data=UserUpdateInput(name="Alice Updated"),
            )
            self.assertEqual(updated["name"], "Alice Updated")

            found = client.user.find_many(
                UserFindManyArgs(
                    where=UserWhereInput(
                        name=StringFilter(starts_with="Alice"),
                        email=StringFilter(ends_with="@example.com"),
                    ),
                    order_by=UserOrderByInput(created_at="desc"),
                    take=5,
                    select=["id", "email", "created_at"],
                )
            )
            self.assertEqual(len(found), 1)
            self.assertEqual(set(found[0].keys()), {"id", "email", "createdAt"})

            first = client.user.find_first(
                UserFindFirstArgs(
                    where=UserWhereInput(email=StringFilter(not_="alice@example.com")),
                    order_by=UserOrderByInput(created_at="asc"),
                )
            )
            self.assertIsNotNone(first)
            self.assertEqual(first["email"], "bob@example.com")

            snake_rows = client.user.find_many(
                where={"created_at": "2026-01-02T00:00:00Z"},
                order_by={"created_at": "asc"},
            )
            self.assertEqual([r["email"] for r in snake_rows], ["bob@example.com"])

            ci_rows = client.user.find_many(
                where=UserWhereInput(name=StringFilter(contains="alice", mode="insensitive")),
            )
            self.assertEqual([r["email"] for r in ci_rows], ["alice@example.com"])

            client.execute_raw(
                "CREATE TABLE orders (id TEXT PRIMARY KEY, userId TEXT NOT NULL, total INTEGER NOT NULL, createdAt TEXT)"
            )
            client.execute_raw(
                "INSERT INTO orders (id, userId, total, createdAt) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
                "o1", created_a["id"], 60, "2026-01-01T00:00:00Z",
                "o2", created_a["id"], 90, None,
                "o3", created_b["id"], 40, "2026-01-02T00:00:00Z",
            )
            grouped = client.order.group_by(
                OrderGroupByArgs(
                    by=["user_id"],
                    having=OrderAggregateHavingInput(
                        _count={"_all": IntFilter(gte=2)},
                        _sum={"total": NumberFilter(gt=100)},
                    ),
                    _count={"_all": True, "created_at": True},
                    _sum={"total": True},
                )
            )
            self.assertEqual(len(grouped), 1)
            self.assertEqual(grouped[0]["userId"], created_a["id"])
            self.assertEqual(grouped[0]["_count"], {"_all": 2, "createdAt": 1})
            self.assertEqual(grouped[0]["_sum"]["total"], 150.0)

            # Typed UserInclude, OrderInclude & UserFindUniqueArgs on generated an5Client schema
            self.assertTrue(UserInclude._an5_include)
            self.assertTrue(OrderInclude._an5_include)
            unique_bob = client.user.find_unique(
                UserFindUniqueArgs(
                    where=UserWhereInput(id=StringFilter(equals=created_b["id"])),
                    select=["email"],
                    include=UserInclude(_count=True),
                )
            )
            self.assertIsNotNone(unique_bob)
            self.assertEqual(unique_bob["email"], "bob@example.com")
            self.assertNotIn("id", unique_bob)
            self.assertEqual(unique_bob["_count"], {})

            with self.assertRaises(ValueError):
                client.user.find_many(
                    include=UserInclude(_count={"select": {"orders": True}}),
                )

            with self.assertRaises(ValueError):
                client.user.find_many(where={"non_existent_col": "x"})
            with self.assertRaises(ValueError):
                client.user.find_many(where={"email": {"bogus_op": "x"}})
            with self.assertRaises(ValueError):
                client.user.find_many(where=UserWhereInput(email=StringFilter(contains="a", mode="bogus")))
            with self.assertRaises(ValueError):
                client.order.group_by(by="user_id", having={"total": {"gt": 10}})

if __name__ == "__main__":
    unittest.main()
