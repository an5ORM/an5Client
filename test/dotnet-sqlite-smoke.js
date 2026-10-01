#!/usr/bin/env node
/**
 * Runtime smoke test for the generated .NET client against a real SQLite
 * database.
 *
 * The compile check proves the sources build; this proves the dialect layer
 * works. It builds a temporary project from the generated C# plus this program
 * and runs it, so a change to the generator that emits plausible-looking but
 * wrong SQL fails here.
 *
 * The point of interest is the dbo. prefix: the generator emits table names as
 * "dbo.users", which SQLite has no schema for, so the client has to strip it.
 * A client that compiled but forgot that would return zero rows everywhere.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'dotnet');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'an5-client-dotnet-sqlite-'));

function copyAllCs(sourceDir, destDir = '') {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const dest = path.join(tmp, destDir, entry.name);
    if (entry.isDirectory()) copyAllCs(source, path.join(destDir, entry.name));
    else if (entry.isFile() && entry.name.endsWith('.cs')) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(source, dest);
    }
  }
}

try {
  copyAllCs(srcDir);
  copyAllCs(path.join(__dirname, 'dotnet'));

  fs.writeFileSync(
    path.join(tmp, 'An5ClientDotnetSqlite.csproj'),
    [
      '<Project Sdk="Microsoft.NET.Sdk">',
      '  <PropertyGroup>',
      '    <OutputType>Exe</OutputType>',
      '    <TargetFramework>net8.0</TargetFramework>',
      '    <Nullable>disable</Nullable>',
      '    <ImplicitUsings>enable</ImplicitUsings>',
      '    <StartupObject>SmokeTest.Program</StartupObject>',
      '  </PropertyGroup>',
      '  <ItemGroup>',
      '    <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.2" />',
      '    <PackageReference Include="Npgsql" Version="8.0.6" />',
      '    <PackageReference Include="Microsoft.Data.Sqlite" Version="9.0.0" />',
      '  </ItemGroup>',
      '</Project>',
      '',
    ].join('\n'),
    'utf8'
  );

  execFileSync('dotnet', ['run', '--project', tmp, '--nologo'], { stdio: 'inherit' });
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
