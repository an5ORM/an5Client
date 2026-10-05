#!/usr/bin/env node
/**
 * Compile-check the generated Java, Kotlin and Swift clients.
 *
 * A generator that emits code nobody compiles is a generator that breaks silently: the
 * artifact still looks plausible, and the failure lands in a consumer's build instead of
 * here. So this compiles each generated client against its runtime, the same way a consumer
 * would.
 *
 * Each language skips when its toolchain is absent, so a workspace with only a JDK can still
 * run the rest of the suite.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const adapters = path.join(__dirname, '..', '..', 'an5Adapters');
const client = path.join(__dirname, '..');
function sources(dir, extension) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return sources(full, extension);
      return entry.name.endsWith(extension) ? [full] : [];
    });
}

function javac() {
  if (process.env.JAVA_HOME && fs.existsSync(path.join(process.env.JAVA_HOME, 'bin', 'javac'))) {
    return path.join(process.env.JAVA_HOME, 'bin', 'javac');
  }
  try {
    execFileSync('javac', ['-version'], { stdio: 'ignore' });
    return 'javac';
  } catch {
    return null;
  }
}

function kotlinc() {
  for (const candidate of [
    process.env.KOTLIN_HOME && path.join(process.env.KOTLIN_HOME, 'bin', 'kotlinc'),
    'kotlinc',
  ].filter(Boolean)) {
    try {
      execFileSync(candidate, ['-version'], { stdio: 'ignore' });
      return candidate.includes(path.sep) ? candidate : execFileSync('which', [candidate], { encoding: 'utf8' }).trim();
    } catch {
      // try the next candidate
    }
  }
  return null;
}

function swift() {
  for (const candidate of [
    process.env.SWIFT_HOME && path.join(process.env.SWIFT_HOME, 'usr', 'bin', 'swift'),
    'swift',
  ].filter(Boolean)) {
    try {
      execFileSync(candidate, ['--version'], { stdio: 'ignore' });
      return candidate;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), 'an5-jvm-client-'));
let ran = 0;
try {
  const javacTool = javac();
  if (!javacTool) {
    console.log('client-compile-check: no JDK installed, skipping the JVM clients');
  } else {
    const classes = path.join(work, 'classes');
    fs.mkdirSync(classes, { recursive: true });
    const listFile = path.join(work, 'sources.txt');
    const all = [
      ...sources(path.join(adapters, 'java', 'src', 'main', 'java'), '.java'),
      ...sources(path.join(client, 'java'), '.java'),
    ];
    fs.writeFileSync(listFile, all.join('\n'), 'utf8');
    execFileSync(javacTool, ['-Xlint:all', '-Werror', '-d', classes, `@${listFile}`], { stdio: 'inherit' });
    console.log(`an5Client Java client compiles clean (${all.length} files)`);
    ran++;

    const kotlinTool = kotlinc();
    if (!kotlinTool) {
      console.log('client-compile-check: kotlinc not installed, skipping the Kotlin client');
    } else {
      const stdlib = path.join(path.dirname(path.dirname(kotlinTool)), 'lib', 'kotlin-stdlib.jar');
      execFileSync(
        kotlinTool,
        [
          '-classpath',
          [classes, fs.existsSync(stdlib) ? stdlib : null].filter(Boolean).join(path.delimiter),
          '-d',
          work,
          ...sources(path.join(adapters, 'kotlin', 'src', 'main', 'kotlin'), '.kt'),
          ...sources(path.join(client, 'kotlin'), '.kt'),
        ],
        { stdio: 'inherit' }
      );
      console.log('an5Client Kotlin client compiles clean');
      ran++;
    }
  }

  const swiftTool = swift();
  const hasSQLiteHeaders = ['/usr/include/sqlite3.h', '/usr/local/include/sqlite3.h'].some((h) =>
    fs.existsSync(h)
  );
  if (!swiftTool || !hasSQLiteHeaders) {
    console.log('client-compile-check: no Swift toolchain or SQLite headers, skipping the Swift client');
  } else {
    // The generated manifest is built as written, with only the dependency swapped for a
    // local path: a package referenced by URL resolves to the identity in its last path
    // component, which a checkout on disk does not reproduce. Checking the emitted manifest
    // too is the point — a client that ships without a resolvable manifest is not a client.
    const packageDir = path.join(work, 'An5Client');
    fs.cpSync(path.join(client, 'swift'), packageDir, { recursive: true });
    const manifest = path.join(packageDir, 'Package.swift');
    const runtimeIdentity = path.basename(path.join(adapters, 'swift'));
    fs.writeFileSync(
      manifest,
      fs
        .readFileSync(manifest, 'utf8')
        .replace(/\.package\(url: "[^"]+", from: "[^"]+"\)/, `.package(path: ${JSON.stringify(path.join(adapters, 'swift'))})`)
        .replace(/package: "an5Adapters"/, `package: ${JSON.stringify(runtimeIdentity)}`)
    );
    execFileSync(swiftTool, ['build', '--scratch-path', path.join(work, 'build')], {
      cwd: packageDir,
      stdio: 'inherit',
    });
    console.log('an5Client Swift client compiles clean');
    ran++;
  }
} finally {
  fs.rmSync(work, { recursive: true, force: true });
}

if (ran === 0) {
  console.log('client-compile-check: no toolchain available, nothing was checked');
}