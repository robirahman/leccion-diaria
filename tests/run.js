#!/usr/bin/env node
'use strict';

// Minimal test runner — no dependencies required
const fs = require('fs');
const path = require('path');

let passed = 0, failed = 0, errors = [];

const TEST_TIMEOUT_MS = 5000;

function describe(name, fn) {
  console.log(`\n  ${name}`);
  fn();
}

function it(name, fn) {
  try {
    const result = fn();
    // Support async test functions with a timeout
    if (result && typeof result.then === 'function') {
      return Promise.race([
        result,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Test timed out after ${TEST_TIMEOUT_MS}ms`)), TEST_TIMEOUT_MS)
        )
      ]).then(() => {
        passed++;
        console.log(`    \x1b[32m✓\x1b[0m ${name}`);
      }).catch(e => {
        failed++;
        errors.push({ name, error: e });
        console.log(`    \x1b[31m✗\x1b[0m ${name}`);
        console.log(`      ${e.stack || e.message}`);
      }).finally(() => {
        if (typeof global.afterEach === 'function') {
          try { global.afterEach(); } catch (_) {}
        }
      });
    }
    // Synchronous test passed
    passed++;
    console.log(`    \x1b[32m✓\x1b[0m ${name}`);
  } catch (e) {
    failed++;
    errors.push({ name, error: e });
    console.log(`    \x1b[31m✗\x1b[0m ${name}`);
    console.log(`      ${e.stack || e.message}`);
  } finally {
    if (typeof global.afterEach === 'function') {
      try { global.afterEach(); } catch (_) {}
    }
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

if (testFiles.length === 0) {
  console.warn('\x1b[33mWarning: No test files found matching pattern test_*.js\x1b[0m');
  process.exit(1);
}

console.log(`Running ${testFiles.length} test files...\n`);

for (const file of testFiles) {
  console.log(`\x1b[1m${file}\x1b[0m`);
  require(path.join(testDir, file));
  // Reset afterEach between test files so one file's cleanup
  // does not leak into the next file
  global.afterEach = undefined;
}

console.log(`\n${'─'.repeat(40)}`);
console.log(`  ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.log('\nFailed tests:');
  errors.forEach(e => console.log(`  - ${e.name}: ${e.error.stack || e.error.message}`));
  process.exit(1);
}
