const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const entry = path.join(root, 'typescript', 'index.js');
const types = path.join(root, 'typescript', 'index.d.ts');
const metadata = path.join(root, 'typescript', 'an5Metadata.js');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

assert.ok(fs.existsSync(entry), 'Expected generated TypeScript runtime entrypoint');
assert.ok(fs.existsSync(types), 'Expected generated TypeScript declaration entrypoint');
assert.ok(fs.existsSync(metadata), 'Expected generated metadata runtime file');
assert.ok(fs.existsSync(path.join(root, 'python', 'an5_client.py')), 'Expected generated Python client');
assert.ok(fs.existsSync(path.join(root, 'dotnet', 'An5DbContext.cs')), 'Expected generated .NET client');
assert.ok(fs.existsSync(path.join(root, 'golang', 'client.go')), 'Expected generated Go client');
assert.ok(fs.existsSync(path.join(root, 'test', 'dotnet-compile-check.js')), 'Expected .NET compile check script');
assert.ok(fs.existsSync(path.join(root, 'test', 'package-smoke.js')), 'Expected package smoke test script');

const client = require(entry);
assert.strictEqual(typeof client.An5Client, 'function', 'Expected An5Client runtime export');
assert.ok(client.An5, 'Expected An5 namespace runtime export');

const dts = fs.readFileSync(types, 'utf8');
for (const expected of ['EmbeddingConfig', 'LlmConfig', 'User', 'Order']) {
  assert.ok(
    dts.includes(`export * from './${expected}'`) || dts.includes(`type ${expected} =`),
    `Expected ${expected} declarations in generated entrypoint`
  );
}

const meta = require(metadata);
assert.ok(meta.modelToTable, 'Expected modelToTable metadata export');
assert.ok(meta.modelFields, 'Expected modelFields metadata export');

assert.strictEqual(pkg.exports['./golang'], './golang', 'Expected Go subpath export');
assert.ok(pkg.files.includes('golang/**/*'), 'Expected Go files to be packaged');
assert.strictEqual(pkg.scripts.test, 'npm run build && node test/smoke.test.js', 'Expected smoke test to build first');
assert.strictEqual(pkg.scripts['test:package:smoke'], 'node test/package-smoke.js', 'Expected package smoke test script');
assert.strictEqual(pkg.scripts['test:dotnet'], 'node test/dotnet-compile-check.js', 'Expected .NET compile test script');
assert.strictEqual(pkg.scripts['test:go'], 'cd golang && go test ./...', 'Expected Go compile test script');

const dotnetDbContext = fs.readFileSync(path.join(root, 'dotnet', 'An5DbContext.cs'), 'utf8');
const dotnetTypes = fs.readFileSync(path.join(root, 'dotnet', 'An5OrmTypes.cs'), 'utf8');
assert.ok(dotnetDbContext.includes('using System.Text.Json;'), 'Expected .NET client to import System.Text.Json');
assert.ok(dotnetDbContext.includes('public List<T> QueryRaw('), 'Expected .NET TableClient raw query helper');
assert.ok(dotnetDbContext.includes('using Microsoft.Data.SqlClient;'), 'Expected .NET client to use Microsoft.Data.SqlClient');
assert.ok(!dotnetDbContext.includes('System.Data.SqlClient'), 'Generated .NET client must not use System.Data.SqlClient');
assert.ok(dotnetTypes.includes('public new string Equals { get; set; }'), 'Expected .NET filters to hide object.Equals explicitly');

const goClient = fs.readFileSync(path.join(root, 'golang', 'client.go'), 'utf8');
assert.ok(goClient.includes('direction := strings.ToUpper(fv.Elem().String())'), 'Expected safe Go SortOrder reflection');
assert.ok(!goClient.includes('fv.Pointer()'), 'Go generated client must not convert reflect pointer to SortOrder');

console.log('an5Client smoke test passed');
