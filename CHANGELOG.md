# Changelog

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

