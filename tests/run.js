#!/usr/bin/env node
'use strict';

// Minimal test runner — no dependencies required
const fs = require('fs');
const path = require('path');

let passed = 0, failed = 0, errors = [];

function describe(name, fn) {
  console.log(`\n  ${name}`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    passed++;
    console.log(`    \x1b[32m✓\x1b[0m ${name}`);
  } catch (e) {
    failed++;
    errors.push({ name, error: e });
    console.log(`    \x1b[31m✗\x1b[0m ${name}`);
    console.log(`      ${e.message}`);
  }
}

function assert(val, msg) {
  if (!val) throw new Error(msg || 'Assertion failed');
}

function assertEqual(a, b, msg) {
  if (a !== b) throw new Error(msg || `Expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
}

function assertClose(a, b, tolerance, msg) {
  if (Math.abs(a - b) > tolerance) throw new Error(msg || `Expected ~${b}, got ${a}`);
}

// Make test helpers global
global.describe = describe;
global.it = it;
global.assert = assert;
global.assertEqual = assertEqual;
global.assertClose = assertClose;

// Run all test files
const testDir = __dirname;
const testFiles = fs.readdirSync(testDir)
  .filter(f => f.startsWith('test_') && f.endsWith('.js'))
  .sort();

console.log(`Running ${testFiles.length} test files...\n`);

for (const file of testFiles) {
  console.log(`\x1b[1m${file}\x1b[0m`);
  require(path.join(testDir, file));
}

console.log(`\n${'─'.repeat(40)}`);
console.log(`  ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log('\nFailed tests:');
  errors.forEach(e => console.log(`  - ${e.name}: ${e.error.message}`));
  process.exit(1);
}
