#!/usr/bin/env node
/**
 * Compile-check the generated Rust client crate.
 *
 * The generated crate depends on the `an5-adapters` runtime, which is not on
 * crates.io yet. When the sibling an5Adapters checkout is available we point
 * cargo at it with a `[patch.crates-io]` override, so this is a real compile
 * rather than a structural check.
 *
 * If cargo is missing, or no adapter source is available, the check degrades to
 * a structural verification (exit 0) so offline environments stay green.
 *
 * Run: node test/rust-compile-check.js
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const rustDir = path.join(root, 'rust');
// Look for the adapter checkout beside this repo, then one level further up,
// so the check works in the monorepo and in a nested workspace layout.
const adapterCandidates = [
  path.resolve(root, '..', 'an5Adapters', 'rust'),
  path.resolve(root, '..', '..', 'an5Adapters', 'rust'),
];
const adapterDir = adapterCandidates.find((dir) => fs.existsSync(path.join(dir, 'Cargo.toml')));

function haveCargo() {
  try {
    execFileSync('cargo', ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function structuralCheck() {
  const required = [
    'src/lib.rs',
    'src/models.rs',
    'src/filters.rs',
    'src/metadata.rs',
    'src/config.rs',
    'src/client.rs',
    'Cargo.toml',
  ];
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
  console.log('rust-compile-check: structural check passed');
}

if (!fs.existsSync(path.join(rustDir, 'Cargo.toml')) || !fs.existsSync(path.join(rustDir, 'src', 'lib.rs'))) {
  console.log('rust-compile-check: no Rust crate found, skipping');
  process.exit(0);
}
if (!haveCargo()) {
  console.log('rust-compile-check: cargo not installed, skipping');
  process.exit(0);
}
if (!adapterDir) {
  console.log('rust-compile-check: an5Adapters/rust not available, structural check only');
  structuralCheck();
  process.exit(0);
}

  const targetDir = process.env.CARGO_TARGET_DIR || path.join(os.tmpdir(), 'an5-cargo-target');
  fs.mkdirSync(targetDir, { recursive: true });
  const env = { ...process.env, CARGO_TARGET_DIR: targetDir };
const patch = `patch.crates-io.an5-adapters.path="${adapterDir}"`;

try {
  execFileSync('cargo', ['--config', patch, 'check'], { cwd: rustDir, stdio: 'inherit', env });
  console.log('an5Client Rust crate cargo check passed');
} catch (err) {
  const msg = String((err && err.message) || err);
  if (/offline|network|failed to download|no matching package|failed to query/i.test(msg)) {
    console.log('rust-compile-check: crates.io unreachable, structural check only');
    structuralCheck();
  } else {
    throw err;
  }
}
