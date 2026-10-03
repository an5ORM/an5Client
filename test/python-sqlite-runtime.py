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

if __name__ == "__main__":
    unittest.main()
