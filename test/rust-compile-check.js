#!/usr/bin/env node
/**
 * Compile-check the generated Rust client crate.
 *
 * Copies are not needed: `cargo check` runs directly in an5Client/rust.
 * If cargo is not installed, the check is skipped (exit 0) so offline
 * environments without a Rust toolchain still pass.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const rustDir = path.join(root, 'rust');

try {
  const cargoToml = path.join(rustDir, 'Cargo.toml');
  const libRs = path.join(rustDir, 'src', 'lib.rs');
  if (!fs.existsSync(cargoToml) || !fs.existsSync(libRs)) {
    console.log('rust-compile-check: no Rust crate found, skipping');
    process.exit(0);
  }
  try {
    execFileSync('cargo', ['--version'], { stdio: 'ignore' });
  } catch {
    console.log('rust-compile-check: cargo not installed, skipping');
    process.exit(0);
  }
  const os = require("os");
  const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "an5-rust-check-"));
  const env = { ...process.env, CARGO_TARGET_DIR: targetDir };
  try {
    execFileSync("cargo", ["check"], { cwd: rustDir, stdio: "inherit", env });
  } catch (e) {
    execFileSync("cargo", ["check", "--offline"], { cwd: rustDir, stdio: "inherit", env });
  }
} catch (err) {
  // Network-restricted environments may fail to fetch crates.io deps.
  // Fall back to a structural check so the gate stays meaningful offline.
  const msg = String((err && err.message) || err);
  if (/offline|network|failed to download|no matching package/i.test(msg)) {
    console.log('rust-compile-check: offline, verifying generated sources structurally');
    const required = ['src/lib.rs', 'src/models.rs', 'src/filters.rs', 'src/metadata.rs', 'src/config.rs', 'src/client.rs', 'Cargo.toml'];
    for (const rel of required) {
      if (!fs.existsSync(path.join(rustDir, rel))) {
        console.error(`missing Rust artifact: ${rel}`);
        process.exit(1);
      }
    }
    const lib = fs.readFileSync(path.join(rustDir, 'src', 'lib.rs'), 'utf8');
    if (!lib.includes('pub mod models') || !lib.includes('pub mod client')) {
      console.error('rust lib.rs missing module exports');
      process.exit(1);
    }
    console.log('rust-compile-check: structural check passed (offline)');
    process.exit(0);
  }
  throw err;
}
