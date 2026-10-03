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
