const APP_CACHE = 'leccion-app-v1';
const DATA_CACHE = 'leccion-data-v1';

// App shell — precached on install (~500KB)
const APP_SHELL = [
  './', './index.html', './styles.css', './manifest.json',
  './fsrs.js', './conjugation.js', './quiz-engine.js',
  './app-core.js', './learn-vocab.js', './app-learn.js',
  './placement.js', './app-practice.js', './practice-reference.js',
  './app-init.js', './vocab-categories.js', './vocab-search-worker.js',
];

// Data files — cached on first use (stale-while-revalidate)
const DATA_FILES = new Set([
  './verbs.js', './vocab-data.json', './grammar.js',
  './vocab-a1a2.json', './vocab-b1.json', './vocab-b2.json',
  './vocab-c1.json', './vocab-c2.json',
  './phrases.js', './conversations.js', './placement_questions.js',
  './recipes.js', './music.js', './movies.js', './poetry.js',
  './sports.js', './proverbs.js', './folktales.js', './festivals.js',
  './history.js', './travel.js', './trivia.js', './idioms.js',
  './minimal_pairs.js', './sentence_construction.js', './cloze_passages.js',
  './translation_drills.js', './dictation.js', './jokes.js',
  './reading.js', './reading_sat.js', './themed_vocab.js',
  './curriculum_tracks.js', './phonetic_pairs.js', './homophones.js',
  './connectors.js', './branching_dialogues.js',
]);

const KNOWN_CACHES = [APP_CACHE, DATA_CACHE];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP_CACHE).then(c =>
    Promise.allSettled(APP_SHELL.map(url =>
      c.add(url).catch(err => console.warn('SW: failed to cache', url, err))
    ))
  ));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => !KNOWN_CACHES.includes(k)).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

function fetchWithTimeout(request, timeout) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}

function isDataFile(url) {
  const pathname = new URL(url).pathname;
  for (const f of DATA_FILES) {
    if (pathname.endsWith(f.replace('./', '/'))) return true;
  }
  return false;
}

function cacheName(url) {
  return isDataFile(url) ? DATA_CACHE : APP_CACHE;
}

self.addEventListener('fetch', e => {
  const isData = isDataFile(e.request.url);
  const timeout = isData ? 5000 : 10000;
  const targetCache = isData ? DATA_CACHE : APP_CACHE;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetchWithTimeout(e.request, timeout).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(targetCache).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
