# Changelog

## [Unreleased]

### Fixed
- **The Go client treated SQLite as SQL Server** — the bare connection string `"sqlite"`
  now selects `DialectSqlite` instead of silently defaulting to SQL Server.
- **The Go client kept the `dbo.` schema prefix under SQLite** — the prefix is stripped
  for SQLite, which has no `dbo` schema.
- **`OR: []`, an empty `OR` branch and `NOT: {}` did not build a constraint** — they now
  produce `1=0` / `1=1` as the ORM does, instead of silently matching every row.

  **This changes results.** A filter that used `OR: []` to mean "no restriction" now
  matches nothing.

### Added
- Runtime tests for the generated clients: the Go client against real SQLite (create,
  filter, transaction rollback verified through `Count`, `UpdateMany`, `DeleteMany`), the
  Rust client over `sqlx`, and the Python client. `test:go` and `test:rust` now run them,
  and `test:python` executes the client instead of only compiling it.

## [0.1.2] - 2026-10-02

### Fixed
- **`Order.total` was generated as a Go `string` and a Rust `i64`** — the column is
  `INT`. The generators read the collapsed TypeScript type, which is `number` for
  `INT`, `FLOAT` and `DECIMAL` alike, and the Go type table matched none of them. Now
  `int` and `i32`.

  Breaking for Rust and Go consumers of this package: the Go type could not hold a
  number at all, and the Rust one is narrower than it was.

### Note
- `0.1.1` was recorded here but never reached `package.json`, which stayed at `0.1.0`.
  This release is `0.1.2` so the version and this file stay in step.

## [0.1.1] - 2026-08-19

## [0.1.1] - 2026-08-19

- chore: update build

## [0.1.0] - 2026-07-04

- Initial release

