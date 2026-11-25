package runtime_test

import (
	an5 "an5client"
	"context"
	"database/sql"
	"errors"
	_ "modernc.org/sqlite"
	"testing"
	"time"
)

func TestGeneratedClientSQLite(t *testing.T) {
	db, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	db.SetMaxOpenConns(1)
	_, err = db.Exec("CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT, created_at DATETIME NOT NULL)")
	if err != nil {
		t.Fatal(err)
	}
	client := an5.NewAn5DbContextWithConnStr(db, "sqlite")
	ctx := context.Background()
	for _, id := range []string{"1", "2", "3"} {
		_, err := client.User.Create(ctx, &an5.User{Id: id, Email: id + "@example.com", CreatedAt: time.Now().UTC()})
		if err != nil {
			t.Fatal(err)
		}
	}
	for _, c := range []struct {
		name  string
		where an5.UserWhereInput
		count int
	}{
		{"empty OR", an5.UserWhereInput{OR: []an5.UserWhereInput{}}, 0},
		{"empty OR branch", an5.UserWhereInput{OR: []an5.UserWhereInput{{}}}, 3},
		{"NOT empty object", an5.UserWhereInput{NOT: &an5.UserWhereInput{}}, 0},
	} {
		t.Run(c.name, func(t *testing.T) {
			got, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{Where: &c.where})
			if err != nil {
				t.Fatal(err)
			}
			if len(got) != c.count {
				t.Fatalf("got %d rows, want %d", len(got), c.count)
			}
		})
	}
	err = client.User.Transaction(ctx, func(tx *sql.Tx) error {
		if _, err := tx.Exec("DELETE FROM users"); err != nil {
			return err
		}
		return errors.New("rollback test")
	})
	if err == nil {
		t.Fatal("transaction should propagate callback failure")
	}
	count, err := client.User.Count(ctx, nil)
	if err != nil || count != 3 {
		t.Fatalf("rollback count=%d err=%v", count, err)
	}
	if _, err := client.User.UpdateMany(ctx, nil, map[string]interface{}{"name": "updated"}); err != nil {
		t.Fatal(err)
	}
	if _, err := client.User.DeleteMany(ctx, nil); err != nil {
		t.Fatal(err)
	}
	count, err = client.User.Count(ctx, nil)
	if err != nil || count != 0 {
		t.Fatalf("cleanup count=%d err=%v", count, err)
	}
}

func TestGeneratedClientMetadataAndFilters(t *testing.T) {
	if _, ok := an5.ModelFields["User"]["email"]; !ok {
		t.Fatalf("expected ModelFields[User][email] to be registered")
	}
	if an5.RelationMap == nil {
		t.Fatalf("expected RelationMap to be non-nil")
	}

	db, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}
	defer db.Close()

	_, err = db.Exec(`CREATE TABLE users (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		name TEXT,
		created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
	)`)
	if err != nil {
		t.Fatalf("create table: %v", err)
	}

	ctx := context.Background()
	client := an5.NewAn5DbContextWithConnStr(db, "sqlite://:memory:")

	if _, err := client.User.CreateMany(ctx, []*an5.User{
		{Id: "u1", Email: "alice@example.com", Name: an5.StringPtr("Alice")},
		{Id: "u2", Email: "bob@example.com", Name: an5.StringPtr("Bob")},
	}); err != nil {
		t.Fatalf("CreateMany: %v", err)
	}

	notBob, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Where: &an5.UserWhereInput{
			Email: &an5.StringFilter{NotIn: []string{"bob@example.com"}},
		},
	})
	if err != nil {
		t.Fatalf("FindMany NotIn: %v", err)
	}
	if len(notBob) != 1 || notBob[0].Email != "alice@example.com" {
		t.Fatalf("NotIn filter got %+v, want alice only", notBob)
	}

	emptyIn, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Where: &an5.UserWhereInput{
			Email: &an5.StringFilter{In: []string{}},
		},
	})
	if err != nil || len(emptyIn) != 0 {
		t.Fatalf("empty In filter got len=%d err=%v, want 0 rows", len(emptyIn), err)
	}

	emptyNotIn, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Where: &an5.UserWhereInput{
			Email: &an5.StringFilter{NotIn: []string{}},
		},
	})
	if err != nil || len(emptyNotIn) != 2 {
		t.Fatalf("empty NotIn filter got len=%d err=%v, want 2 rows", len(emptyNotIn), err)
	}

	if _, err := client.User.FindMany(ctx, "invalid-non-struct"); err == nil {
		t.Fatalf("FindMany with non-struct args should return an error")
	}
}
