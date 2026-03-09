#!/usr/bin/env node
// bump-version.js — Auto-generate SW cache version from source file hashes.
// Run: node bump-version.js
// This computes a short hash from all cached assets so the SW cache
// automatically invalidates whenever any source file changes.

'use strict';

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const SW_PATH = path.join(__dirname, 'sw.js');
const sw = fs.readFileSync(SW_PATH, 'utf8');

// Extract the ASSETS array from sw.js
const assetsMatch = sw.match(/const ASSETS\s*=\s*\[([\s\S]*?)\];/);
if (!assetsMatch) { console.error('Could not find ASSETS array in sw.js'); process.exit(1); }

const assets = assetsMatch[1].match(/'([^']+)'/g).map(s => s.replace(/'/g, ''));

// Hash each file's contents
const hash = crypto.createHash('sha256');
for (const asset of assets) {
  const filePath = path.join(__dirname, asset.replace('./', ''));
  try {
    hash.update(fs.readFileSync(filePath));
  } catch (e) {
    // File might not exist (e.g. './'), skip it
  }
}
const version = 'leccion-diaria-' + hash.digest('hex').slice(0, 8);

// Replace the CACHE_NAME value
const updated = sw.replace(
  /const CACHE_NAME\s*=\s*'[^']*'/,
  `const CACHE_NAME = '${version}'`
);

if (updated === sw) {
  console.log('No change needed. Current version is up to date.');
} else {
  fs.writeFileSync(SW_PATH, updated, 'utf8');
  console.log(`Updated SW cache version to: ${version}`);
}
