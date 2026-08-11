#!/usr/bin/env node
/**
 * Compile-check the standalone generated .NET client sources.
 *
 * The npm package ships raw C# files instead of a csproj, so this script copies
 * the generated sources into a temporary SDK-style project and runs dotnet build.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'dotnet');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'an5-client-dotnet-check-'));

function copyAllCs(sourceDir, destDir = '') {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const dest = path.join(tmp, destDir, entry.name);
    if (entry.isDirectory()) {
      copyAllCs(source, path.join(destDir, entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.cs')) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(source, dest);
    }
  }
}

try {
  copyAllCs(srcDir);

  fs.writeFileSync(
    path.join(tmp, 'An5ClientDotnetCheck.csproj'),
    [
      '<Project Sdk="Microsoft.NET.Sdk">',
      '  <PropertyGroup>',
      '    <TargetFramework>net8.0</TargetFramework>',
      '    <Nullable>disable</Nullable>',
      '    <ImplicitUsings>enable</ImplicitUsings>',
      '  </PropertyGroup>',
      '  <ItemGroup>',
      '    <PackageReference Include="Microsoft.Data.SqlClient" Version="5.2.2" />',
      '  </ItemGroup>',
      '</Project>',
      ''
    ].join('\n'),
    'utf8'
  );

  execFileSync('dotnet', ['build', tmp, '--nologo'], { stdio: 'inherit' });
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
