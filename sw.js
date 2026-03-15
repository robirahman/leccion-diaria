const CACHE_NAME = 'leccion-diaria-v18';

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
  './connectors.js',
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
