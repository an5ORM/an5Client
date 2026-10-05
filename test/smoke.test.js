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
assert.ok(fs.existsSync(path.join(root, 'rust', 'Cargo.toml')), 'Expected generated Rust crate');
assert.ok(fs.existsSync(path.join(root, 'rust', 'src', 'lib.rs')), 'Expected generated Rust lib.rs');
assert.ok(fs.existsSync(path.join(root, 'rust', 'src', 'models.rs')), 'Expected generated Rust models.rs');
assert.ok(fs.existsSync(path.join(root, 'test', 'dotnet-compile-check.js')), 'Expected .NET compile check script');
assert.ok(fs.existsSync(path.join(root, 'test', 'rust-compile-check.js')), 'Expected Rust compile check script');
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
assert.strictEqual(pkg.exports['./rust'], './rust/Cargo.toml', 'Expected Rust subpath export');
assert.ok(pkg.files.includes('golang/**/*'), 'Expected Go files to be packaged');
assert.ok(pkg.files.includes('rust/Cargo.toml'), 'Expected Rust manifest to be packaged');
assert.ok(pkg.files.includes('rust/src/**/*'), 'Expected Rust sources to be packaged');
assert.strictEqual(pkg.exports['./java'], './java', 'Expected Java subpath export');
assert.strictEqual(pkg.exports['./kotlin'], './kotlin', 'Expected Kotlin subpath export');
assert.strictEqual(pkg.exports['./swift'], './swift/Package.swift', 'Expected Swift subpath export to name the manifest');
assert.ok(pkg.files.includes('java/**/*.java'), 'Expected Java sources to be packaged');
assert.ok(pkg.files.includes('kotlin/**/*.kt'), 'Expected Kotlin sources to be packaged');
assert.ok(pkg.files.includes('swift/Sources/An5Client/*.swift'), 'Expected Swift sources to be packaged');
for (const [language, file] of [
  ['java', 'An5DbContext.java'],
  ['kotlin', 'An5Db.kt'],
  ['swift', 'Sources/An5Client/An5Db.swift'],
]) {
  assert.ok(
    fs.existsSync(path.join(root, language, file)),
    `Expected generated ${language} client entry point ${language}/${file}`
  );
}
// Swift ships as a package rather than loose sources, because SwiftPM has no way to point a
// target at an arbitrary directory the way a csproj or a go.mod does.
assert.ok(fs.existsSync(path.join(root, 'swift', 'Package.swift')), 'Expected a generated SwiftPM manifest');
assert.strictEqual(pkg.scripts.test, 'npm run build && node test/smoke.test.js', 'Expected smoke test to build first');
assert.strictEqual(pkg.scripts['test:package:smoke'], 'node test/package-smoke.js', 'Expected package smoke test script');
// The gate must build the generated sources and run them, or a client that
// compiles but queries wrongly would still pass.
assert.ok(
  pkg.scripts['test:dotnet'].includes('dotnet-compile-check.js') &&
    pkg.scripts['test:dotnet'].includes('dotnet-sqlite-smoke.js'),
  'Expected .NET compile check and SQLite smoke test'
);
assert.ok(fs.existsSync(path.join(root, 'test', 'dotnet-sqlite-smoke.js')), 'Expected .NET SQLite smoke script');
assert.strictEqual(pkg.scripts['test:go'], 'cd golang && go test ./... && cd ../test/golang-runtime && go test -mod=mod ./...', 'Expected Go runtime test script');
assert.strictEqual(pkg.scripts['test:rust'], 'node test/rust-compile-check.js', 'Expected Rust compile test script');
assert.strictEqual(pkg.scripts['test:java'], 'node test/client-compile-check.js', 'Expected JVM and Swift client compile test script');

const dotnetDbContext = fs.readFileSync(path.join(root, 'dotnet', 'An5DbContext.cs'), 'utf8');
const dotnetTypes = fs.readFileSync(path.join(root, 'dotnet', 'An5OrmTypes.cs'), 'utf8');
assert.ok(dotnetDbContext.includes('using System.Text.Json;'), 'Expected .NET client to import System.Text.Json');
assert.ok(dotnetDbContext.includes('public List<T> QueryRaw('), 'Expected .NET TableClient raw query helper');
// The generated client picks its provider from the connection string rather
// than importing one set of types, so all three have to be reachable.
assert.ok(dotnetDbContext.includes('Microsoft.Data.SqlClient.SqlConnection'), 'Expected .NET client to reach the SQL Server provider');
assert.ok(dotnetDbContext.includes('Npgsql.NpgsqlConnection'), 'Expected .NET client to reach the Postgres provider');
assert.ok(dotnetDbContext.includes('Microsoft.Data.Sqlite.SqliteConnection'), 'Expected .NET client to reach the SQLite provider');
assert.ok(!dotnetDbContext.includes('using Microsoft.Data.SqlClient;'), 'Expected no direct SqlClient using, the client is dialect-driven');
assert.ok(!dotnetDbContext.includes('System.Data.SqlClient'), 'Generated .NET client must not use System.Data.SqlClient');
assert.ok(dotnetTypes.includes('public new string Equals { get; set; }'), 'Expected .NET filters to hide object.Equals explicitly');

const goClient = fs.readFileSync(path.join(root, 'golang', 'client.go'), 'utf8');
assert.ok(goClient.includes('direction := strings.ToUpper(fv.Elem().String())'), 'Expected safe Go SortOrder reflection');
assert.ok(!goClient.includes('fv.Pointer()'), 'Go generated client must not convert reflect pointer to SortOrder');

const rustLib = fs.readFileSync(path.join(root, 'rust', 'src', 'lib.rs'), 'utf8');
assert.ok(rustLib.includes('pub mod models'), 'Expected Rust lib.rs to export models module');
assert.ok(rustLib.includes('pub mod client'), 'Expected Rust lib.rs to export client module');
const rustModels = fs.readFileSync(path.join(root, 'rust', 'src', 'models.rs'), 'utf8');
assert.ok(rustModels.includes('pub struct User'), 'Expected Rust models.rs to contain User struct');
assert.ok(rustModels.includes('UserWhereInput'), 'Expected Rust models.rs to contain WhereInput types');
const rustClient = fs.readFileSync(path.join(root, 'rust', 'src', 'client.rs'), 'utf8');
assert.ok(rustClient.includes('pub struct An5Client'), 'Expected Rust client.rs to contain An5Client');
assert.ok(rustClient.includes('use an5_adapters::'), 'Expected Rust client.rs to use the adapter runtime');
assert.ok(rustClient.includes('pub fn user(&self) -> UserTable'), 'Expected Rust client.rs to expose typed model handles');
assert.ok(rustClient.includes('pub async fn find_many(&self, args: &UserFindManyArgs)'), 'Expected Rust typed find_many');
assert.ok(rustClient.includes('pub fn table(&self, name: &str) -> TableClient'), 'Expected Rust dynamic table access');

console.log('an5Client smoke test passed');
