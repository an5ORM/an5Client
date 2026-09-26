#!/usr/bin/env node
/**
 * an5-client package smoke test.
 *
 * Builds and packs the generated client package, installs the tarball into a
 * fresh temp project, then verifies runtime exports and packaged language
 * artifacts from the installed package.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'an5-client-smoke-'));
const packDir = path.join(tmp, 'pack');
const projDir = path.join(tmp, 'proj');
fs.mkdirSync(packDir, { recursive: true });
fs.mkdirSync(projDir, { recursive: true });

function cleanEnv() {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (key.startsWith('npm_config_')) delete env[key];
  }
  return env;
}

function run(command, cwd) {
  return execSync(command, { cwd, env: cleanEnv(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

try {
  console.log('\n=== an5-client package smoke test ===\n');

  console.log('[0] build package artifacts');
  run('npm run build', root);

  console.log('[1] npm pack');
  const packOut = run(`npm pack "${root}"`, packDir);
  const tarball = packOut
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.endsWith('.tgz'));
  if (!tarball) throw new Error(`no .tgz produced by npm pack:\n${packOut}`);
  console.log(`    packed ${tarball}`);

  console.log('[2] install into fresh project');
  fs.writeFileSync(
    path.join(projDir, 'package.json'),
    JSON.stringify({ name: 'an5-client-smoke', version: '1.0.0', private: true }, null, 2),
    'utf8'
  );
  run(`npm install --no-audit --no-fund "${path.join(packDir, tarball)}"`, projDir);

  const smokeProbe = path.join(projDir, 'smoke.js');
  fs.writeFileSync(
    smokeProbe,
    [
      `const assert = require('assert');`,
      `const fs = require('fs');`,
      `const path = require('path');`,
      `const pkgDir = path.dirname(path.dirname(require.resolve('an5-client')));`,
      `const root = require('an5-client');`,
      `const ts = require('an5-client/typescript');`,
      `assert.strictEqual(typeof root.An5Client, 'function');`,
      `assert.strictEqual(typeof ts.An5Client, 'function');`,
      `assert.ok(root.An5, 'missing An5 namespace');`,
      `assert.ok(require.resolve('an5-client/typescript/index.js'));`,
      `assert.ok(fs.existsSync(path.join(pkgDir, 'typescript', 'index.d.ts')), 'missing generated declarations');`,
      `['python/an5_client.py','python/an5_metadata.py','dotnet/An5DbContext.cs','dotnet/An5OrmTypes.cs','golang/client.go','golang/User.go','golang/Order.go','golang/go.mod','rust/Cargo.toml','rust/src/lib.rs','rust/src/models.rs','rust/src/client.rs'].forEach((rel) => {`,
      `  assert.ok(fs.existsSync(path.join(pkgDir, rel)), 'missing packaged file: ' + rel);`,
      `});`,
      `const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));`,
      `assert.strictEqual(pkg.exports['./python'], './python/an5_metadata.py');`,
      `assert.strictEqual(pkg.exports['./dotnet'], './dotnet');`,
      `assert.strictEqual(pkg.exports['./golang'], './golang');`,
      `assert.strictEqual(pkg.exports['./rust'], './rust/Cargo.toml');`,
      `console.log('an5-client installed package smoke passed');`,
      ``
    ].join('\n'),
    'utf8'
  );

  console.log('[3] run smoke checks');
  run('node smoke.js', projDir);
  console.log('\nPackage smoke test: PASSED');
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
