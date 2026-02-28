const CACHE_NAME = 'leccion-diaria-v5';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './fsrs.js',
  './conjugation.js', './verbs.js', './vocab.js', './grammar.js',
  './phrases.js', './conversations.js', './recipes.js', './music.js',
  './movies.js', './poetry.js', './sports.js', './proverbs.js',
  './folktales.js', './festivals.js', './history.js', './travel.js',
  './trivia.js', './idioms.js', './freq_vocab.js', './placement_questions.js',
  './minimal_pairs.js', './sentence_construction.js', './cloze_passages.js',
  './translation_drills.js', './dictation.js', './jokes.js',
  './manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
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
