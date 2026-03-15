#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ── Config ──────────────────────────────────────────────────────
const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// Files that get minified + hashed
const JS_FILES = [
  'fsrs.js', 'conjugation.js', 'verbs.js', 'vocab-categories.js',
  'grammar.js', 'phrases.js', 'placement_questions.js', 'quiz-engine.js',
  'app-core.js', 'learn-vocab.js', 'app-learn.js', 'placement.js',
  'app-practice.js', 'practice-reference.js', 'app-init.js',
  // Lazy-loaded
  'conversations.js', 'recipes.js', 'music.js', 'movies.js', 'poetry.js',
  'sports.js', 'proverbs.js', 'folktales.js', 'festivals.js', 'history.js',
  'travel.js', 'trivia.js', 'idioms.js', 'minimal_pairs.js',
  'sentence_construction.js', 'cloze_passages.js', 'translation_drills.js',
  'dictation.js', 'jokes.js', 'reading.js', 'reading_sat.js',
  'themed_vocab.js', 'curriculum_tracks.js', 'phonetic_pairs.js',
  'homophones.js', 'connectors.js',
  'verb_prepositions.js', 'subjunctive_triggers.js', 'writing_prompts.js',
  'comparative_grammar.js', 'number_practice.js', 'feature-modules.js',
  // Worker
  'vocab-search-worker.js',
];

const CSS_FILES = ['styles.css'];

// Files copied as-is (no minification)
const COPY_FILES = [
  'manifest.json',
  'vocab-a1a2.json', 'vocab-b1.json', 'vocab-b2.json',
  'vocab-c1.json', 'vocab-c2.json',
];

const COPY_DIRS = ['icons'];

// Files excluded from dist
const EXCLUDE = new Set([
  'build.js', 'bump-version.js', 'package.json', 'package-lock.json',
  'vocab_backup.js', 'vocab.js', 'freq_vocab.js', 'vocab-data.json',
  'serve.sh',
]);

// ── Helpers ──────────────────────────────────────────────────────

function contentHash(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ── Try to load esbuild ──────────────────────────────────────────
let esbuild;
try {
  esbuild = require('esbuild');
} catch {
  // Fallback: try /tmp/leccion-build or just copy without minification
  try {
    esbuild = require('/tmp/leccion-build/node_modules/esbuild');
  } catch {
    console.warn('WARNING: esbuild not found — copying JS/CSS without minification');
    esbuild = null;
  }
}

async function minifyJS(code) {
  if (!esbuild) return code;
  const result = await esbuild.transform(code, {
    minify: true,
    target: 'es2020',
  });
  return result.code;
}

async function minifyCSS(code) {
  if (!esbuild) return code;
  const result = await esbuild.transform(code, {
    loader: 'css',
    minify: true,
  });
  return result.code;
}

// ── Main build ──────────────────────────────────────────────────

async function build() {
  const startTime = Date.now();
  console.log('Building to dist/...\n');

  // Clean dist
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  ensureDir(DIST);

  // Map: original filename → hashed filename
  const hashMap = {};
  let totalSaved = 0;

  // Process JS files
  for (const file of JS_FILES) {
    const src = path.join(ROOT, file);
    if (!fs.existsSync(src)) {
      console.warn(`  SKIP (not found): ${file}`);
      continue;
    }
    const raw = fs.readFileSync(src, 'utf8');
    const minified = await minifyJS(raw);
    const hash = contentHash(Buffer.from(minified));
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const hashed = `${base}.${hash}${ext}`;
    fs.writeFileSync(path.join(DIST, hashed), minified);
    hashMap[file] = hashed;
    const saved = raw.length - minified.length;
    totalSaved += saved;
    const pct = raw.length > 0 ? ((saved / raw.length) * 100).toFixed(0) : 0;
    console.log(`  ${file} → ${hashed} (${(minified.length / 1024).toFixed(1)}KB, -${pct}%)`);
  }

  // Process CSS files
  for (const file of CSS_FILES) {
    const src = path.join(ROOT, file);
    if (!fs.existsSync(src)) {
      console.warn(`  SKIP (not found): ${file}`);
      continue;
    }
    const raw = fs.readFileSync(src, 'utf8');
    const minified = await minifyCSS(raw);
    const hash = contentHash(Buffer.from(minified));
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const hashed = `${base}.${hash}${ext}`;
    fs.writeFileSync(path.join(DIST, hashed), minified);
    hashMap[file] = hashed;
    const saved = raw.length - minified.length;
    totalSaved += saved;
    console.log(`  ${file} → ${hashed} (${(minified.length / 1024).toFixed(1)}KB, -${((saved / raw.length) * 100).toFixed(0)}%)`);
  }

  // Copy static files
  for (const file of COPY_FILES) {
    const src = path.join(ROOT, file);
    if (!fs.existsSync(src)) {
      console.warn(`  SKIP (not found): ${file}`);
      continue;
    }
    fs.copyFileSync(src, path.join(DIST, file));
  }

  // Copy directories
  for (const dir of COPY_DIRS) {
    const src = path.join(ROOT, dir);
    if (!fs.existsSync(src)) continue;
    ensureDir(path.join(DIST, dir));
    for (const f of fs.readdirSync(src)) {
      fs.copyFileSync(path.join(src, f), path.join(DIST, dir, f));
    }
  }

  // Rewrite index.html with hashed filenames
  let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  // Replace CSS references
  for (const [orig, hashed] of Object.entries(hashMap)) {
    if (orig.endsWith('.css')) {
      html = html.replace(
        new RegExp(`href="${orig.replace(/\./g, '\\.')}"`, 'g'),
        `href="${hashed}"`
      );
    }
  }

  // Replace script src references (both defer and lazy-loaded)
  for (const [orig, hashed] of Object.entries(hashMap)) {
    if (orig.endsWith('.js')) {
      html = html.replace(
        new RegExp(`src="${orig.replace(/\./g, '\\.')}"`, 'g'),
        `src="${hashed}"`
      );
    }
  }

  // Minify HTML (basic: collapse whitespace between tags)
  html = html.replace(/>\s+</g, '><').replace(/\n\s*\n/g, '\n');

  fs.writeFileSync(path.join(DIST, 'index.html'), html);
  console.log(`  index.html → index.html (references updated)`);

  // Generate service worker with hashed filenames
  const swSrc = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');

  // Build new APP_SHELL list with hashed names
  const appShellFiles = [
    'fsrs.js', 'conjugation.js', 'quiz-engine.js',
    'app-core.js', 'learn-vocab.js', 'app-learn.js',
    'placement.js', 'app-practice.js', 'practice-reference.js',
    'app-init.js', 'vocab-categories.js',
  ];
  const appShell = [
    "'./'", "'./index.html'",
    `'./${hashMap['styles.css'] || 'styles.css'}'`,
    "'./manifest.json'",
    ...appShellFiles.map(f => `'./${hashMap[f] || f}'`),
  ];

  // Build new DATA_FILES list with hashed names
  const dataFileNames = [
    'verbs.js', 'grammar.js', 'phrases.js', 'conversations.js',
    'placement_questions.js', 'recipes.js', 'music.js', 'movies.js',
    'poetry.js', 'sports.js', 'proverbs.js', 'folktales.js',
    'festivals.js', 'history.js', 'travel.js', 'trivia.js',
    'idioms.js', 'minimal_pairs.js', 'sentence_construction.js',
    'cloze_passages.js', 'translation_drills.js', 'dictation.js',
    'jokes.js', 'reading.js', 'reading_sat.js', 'themed_vocab.js',
    'curriculum_tracks.js', 'phonetic_pairs.js', 'homophones.js',
    'connectors.js',
  ];
  const dataFiles = dataFileNames.map(f => `  './${hashMap[f] || f}'`);

  // Compute cache name from content hash of all output files
  const allHash = crypto.createHash('sha256');
  const distFiles = fs.readdirSync(DIST).filter(f => !fs.statSync(path.join(DIST, f)).isDirectory());
  distFiles.sort().forEach(f => {
    allHash.update(fs.readFileSync(path.join(DIST, f)));
  });
  const cacheVersion = 'leccion-diaria-' + allHash.digest('hex').slice(0, 8);

  // Also update LAZY_SCRIPTS mapping in app-init — we need to rewrite the
  // lazy-loaded script names in the already-minified app-init.js
  // We handle this by patching the HTML to inject a script-name map
  const lazyMap = {};
  JS_FILES.forEach(f => {
    if (hashMap[f] && hashMap[f] !== f) {
      lazyMap[f] = hashMap[f];
    }
  });

  // Inject the lazy-script hash map into index.html before app-init
  const mapScript = `<script>window.__fileHash=${JSON.stringify(lazyMap)};</script>`;
  const distHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const initTag = `src="${hashMap['app-init.js'] || 'app-init.js'}"`;
  const patchedHtml = distHtml.replace(
    `<script defer ${initTag}></script>`,
    `${mapScript}<script defer ${initTag}></script>`
  );
  fs.writeFileSync(path.join(DIST, 'index.html'), patchedHtml);

  // Write the new SW
  const newSW = `const CACHE_NAME = '${cacheVersion}';

const APP_SHELL = [
  ${appShell.join(',\n  ')},
];

const DATA_FILES = new Set([
${dataFiles.join(',\n')},
  './vocab-a1a2.json', './vocab-b1.json', './vocab-b2.json',
  './vocab-c1.json', './vocab-c2.json',
]);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c =>
    Promise.allSettled(APP_SHELL.map(url =>
      c.add(url).catch(err => console.warn('SW: failed to cache', url, err))
    ))
  ));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
`;

  fs.writeFileSync(path.join(DIST, 'sw.js'), newSW);
  console.log(`  sw.js → sw.js (cache: ${cacheVersion})`);

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nBuild complete in ${elapsed}s`);
  console.log(`  Total minification savings: ${(totalSaved / 1024).toFixed(0)}KB`);

  // Calculate dist size
  let distSize = 0;
  function addSize(dir) {
    for (const f of fs.readdirSync(dir)) {
      const fp = path.join(dir, f);
      const stat = fs.statSync(fp);
      if (stat.isDirectory()) addSize(fp);
      else distSize += stat.size;
    }
  }
  addSize(DIST);
  console.log(`  dist/ total size: ${(distSize / 1024 / 1024).toFixed(1)}MB`);
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
