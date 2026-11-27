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

	// Case-insensitive StringFilter (Contains, In, invalid Mode).
	ciUsers, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Where: &an5.UserWhereInput{
			Name: &an5.StringFilter{Contains: an5.StringPtr("ALICE"), Mode: "insensitive"},
		},
	})
	if err != nil || len(ciUsers) != 1 || ciUsers[0].Id != "u1" {
		t.Fatalf("insensitive Contains got %+v err=%v, want [u1]", ciUsers, err)
	}
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Where: &an5.UserWhereInput{
			Email: &an5.StringFilter{Equals: an5.StringPtr("a"), Mode: "bogus"},
		},
	}); err == nil {
		t.Fatalf("invalid StringFilter Mode should return an error")
	}

	// GroupBy with HAVING, per-field _count, and offset-only SQLite pagination.
	_, err = db.Exec(`CREATE TABLE orders (
		id TEXT PRIMARY KEY,
		user_id TEXT NOT NULL,
		total INTEGER NOT NULL,
		created_at TEXT
	)`)
	if err != nil {
		t.Fatalf("create orders: %v", err)
	}
	if _, err := db.Exec(`INSERT INTO orders (id, user_id, total, created_at) VALUES
		('o1', 'u1', 60, '2026-01-01'),
		('o2', 'u1', 90, NULL),
		('o3', 'u2', 40, '2026-01-02'),
		('o4', 'u3', 200, '2026-01-03')`); err != nil {
		t.Fatalf("seed orders: %v", err)
	}

	grouped, err := client.Order.GroupBy(ctx, &an5.OrderGroupByArgs{
		By: []string{"user_id"},
		Having: &an5.OrderAggregateHavingInput{
			OR: []an5.OrderAggregateHavingInput{
				{
					Count: &an5.OrderCountAggregateFilter{All: &an5.IntFilter{Gte: an5.IntPtr(2)}},
					Sum:   &an5.OrderNumericAggregateFilter{Total: &an5.NumberFilter{Gte: an5.Float64Ptr(150)}},
				},
				{
					UserId: &an5.StringFilter{Equals: an5.StringPtr("u3")},
				},
			},
		},
		Count:   []string{"_all", "created_at"},
		Sum:     []string{"total"},
		OrderBy: &an5.OrderOrderByInput{UserId: an5.SortOrderPtr(an5.SortOrderAsc)},
	})
	if err != nil {
		t.Fatalf("GroupBy with OrderAggregateHavingInput failed: %v", err)
	}
	if len(grouped) != 2 || grouped[0]["user_id"] != "u1" || grouped[1]["user_id"] != "u3" {
		t.Fatalf("unexpected grouped rows: %#v", grouped)
	}
	if grouped[0]["_count"] != int64(2) || grouped[0]["_count_created_at"] != int64(1) || grouped[0]["_sum_total"] != int64(150) {
		t.Fatalf("unexpected per-field count / sum for u1: %#v", grouped[0])
	}

	paged, err := client.Order.GroupBy(ctx, &an5.OrderGroupByArgs{
		By:      []string{"user_id"},
		OrderBy: &an5.OrderOrderByInput{UserId: an5.SortOrderPtr(an5.SortOrderAsc)},
		Skip:    an5.IntPtr(1),
	})
	if err != nil {
		t.Fatalf("GroupBy offset-only pagination failed: %v", err)
	}
	if len(paged) != 2 || paged[0]["user_id"] != "u2" || paged[1]["user_id"] != "u3" {
		t.Fatalf("unexpected offset-only paged rows: %#v", paged)
	}

	// Reject ungrouped scalar field in Having before executing query.
	if _, err := client.Order.GroupBy(ctx, &an5.OrderGroupByArgs{
		By:     []string{"user_id"},
		Having: &an5.OrderAggregateHavingInput{Total: &an5.IntFilter{Gt: an5.IntPtr(10)}},
	}); err == nil {
		t.Fatalf("expected error for ungrouped scalar field Total in Having")
	}
}

func TestGeneratedClientIncludeValidationAndFindUniqueSelect(t *testing.T) {
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

	if _, err := client.User.Create(ctx, &an5.User{
		Id:        "u1",
		Email:     "alice@example.com",
		Name:      an5.StringPtr("Alice"),
		CreatedAt: time.Now().UTC(),
	}); err != nil {
		t.Fatal(err)
	}

	// FindUnique with Select and empty Include._count on model with no many relations.
	picked, err := client.User.FindUnique(ctx, &an5.UserFindUniqueArgs{
		Where:   &an5.UserWhereInput{Id: &an5.StringFilter{Equals: an5.StringPtr("u1")}},
		Select:  []string{"email"},
		Include: &an5.UserInclude{Count: true},
	})
	if err != nil {
		t.Fatalf("FindUnique with Select+Include failed: %v", err)
	}
	if picked == nil || picked.Email != "alice@example.com" || picked.Id != "" {
		t.Fatalf("expected email-only projection with stripped Id, got %+v", picked)
	}

	// Take: 0 returns empty slice without error.
	zeroRows, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Take: an5.IntPtr(0),
	})
	if err != nil {
		t.Fatalf("FindMany with Take=0 failed: %v", err)
	}
	if len(zeroRows) != 0 {
		t.Fatalf("expected 0 rows with Take=0, got %d", len(zeroRows))
	}

	// Reject negative Take / Skip, unknown Select columns, unknown relations, and invalid Include payloads.
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{Take: an5.IntPtr(-1)}); err == nil {
		t.Fatalf("expected error for negative Take")
	}
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{Skip: an5.IntPtr(-2)}); err == nil {
		t.Fatalf("expected error for negative Skip")
	}
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{Select: []string{"non_existent"}}); err == nil {
		t.Fatalf("expected error for unknown Select column")
	}
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Where:   &an5.UserWhereInput{Id: &an5.StringFilter{Equals: an5.StringPtr("missing")}},
		Include: map[string]interface{}{"orders": true},
	}); err == nil {
		t.Fatalf("expected error for unknown relation in Include even when parent matches 0 rows")
	}
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{
		Include: &an5.UserInclude{Count: map[string]interface{}{"select": map[string]interface{}{"orders": true}}},
	}); err == nil {
		t.Fatalf("expected error for unknown relation in _count")
	}
	if _, err := client.User.FindMany(ctx, &an5.UserFindManyArgs{Include: "bogus"}); err == nil {
		t.Fatalf("expected error for invalid Include payload type")
	}
}
