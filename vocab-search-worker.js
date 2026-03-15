'use strict';

// Web Worker for vocab search — prevents main thread jank on 28K entries.
// Builds a prefix index on init for fast autocomplete lookups.

let vocabData = [];
let prefixIndex = null; // Map<prefix, Set<index>>

function buildPrefixIndex() {
  prefixIndex = new Map();
  for (let i = 0; i < vocabData.length; i++) {
    const w = vocabData[i];
    const terms = [
      (w.word || '').toLowerCase(),
      (w.english || '').toLowerCase(),
    ];
    for (const term of terms) {
      // Index prefixes up to 4 chars deep
      const normalized = term.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      for (let len = 1; len <= Math.min(4, normalized.length); len++) {
        const prefix = normalized.slice(0, len);
        if (!prefixIndex.has(prefix)) prefixIndex.set(prefix, []);
        prefixIndex.get(prefix).push(i);
      }
    }
  }
}

function search(query, limit) {
  limit = limit || 50;
  const q = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  if (!q) return [];

  let candidates;
  // Use prefix index for short queries (1-4 chars)
  if (prefixIndex && q.length <= 4) {
    const indices = prefixIndex.get(q);
    if (!indices) return [];
    candidates = indices.map(i => vocabData[i]);
  } else {
    // For longer queries, filter from prefix candidates then do substring match
    const prefix = q.slice(0, 4);
    const indices = prefixIndex ? prefixIndex.get(prefix) : null;
    const pool = indices ? indices.map(i => vocabData[i]) : vocabData;
    candidates = pool.filter(w => {
      const word = (w.word || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const eng = (w.english || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return word.includes(q) || eng.includes(q);
    });
  }

  // Sort: exact prefix matches first, then by level priority
  const levelOrder = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
  candidates.sort((a, b) => {
    const aWord = (a.word || '').toLowerCase();
    const bWord = (b.word || '').toLowerCase();
    const aExact = aWord.startsWith(q) ? 0 : 1;
    const bExact = bWord.startsWith(q) ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return (levelOrder[a.level] || 3) - (levelOrder[b.level] || 3);
  });

  return candidates.slice(0, limit);
}

self.onmessage = function(e) {
  const msg = e.data;
  switch (msg.type) {
    case 'init':
      vocabData = msg.data;
      buildPrefixIndex();
      self.postMessage({ type: 'ready', count: vocabData.length });
      break;
    case 'update':
      // Append new data (for progressive loading)
      vocabData = msg.data;
      buildPrefixIndex();
      self.postMessage({ type: 'ready', count: vocabData.length });
      break;
    case 'search':
      const results = search(msg.query, msg.limit);
      self.postMessage({ type: 'results', id: msg.id, results: results });
      break;
  }
};
