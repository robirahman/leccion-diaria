'use strict';

// Web Worker for vocab search — prevents main thread jank on 28K entries.
// Builds a prefix index on init for fast autocomplete lookups.

let vocabData = [];
let normalizedData = []; // parallel array: { word, english } pre-normalized
let prefixIndex = null; // Map<prefix, Set<index>>

function normalizeStr(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildNormalizedData() {
  normalizedData = new Array(vocabData.length);
  for (let i = 0; i < vocabData.length; i++) {
    const w = vocabData[i];
    normalizedData[i] = {
      word: normalizeStr(w.word),
      english: normalizeStr(w.english),
    };
  }
}

function buildPrefixIndex() {
  buildNormalizedData();
  prefixIndex = new Map();
  for (let i = 0; i < normalizedData.length; i++) {
    const n = normalizedData[i];
    const terms = [n.word, n.english];
    for (const term of terms) {
      // Index prefixes up to 4 chars deep
      for (let len = 1; len <= Math.min(4, term.length); len++) {
        const prefix = term.slice(0, len);
        if (!prefixIndex.has(prefix)) prefixIndex.set(prefix, new Set());
        prefixIndex.get(prefix).add(i);
      }
    }
  }
}

function search(query, limit) {
  limit = limit || 50;
  const q = normalizeStr(query).trim();
  if (!q) return [];

  let candidateIndices;
  // Use prefix index for short queries (1-4 chars)
  if (prefixIndex && q.length <= 4) {
    const indices = prefixIndex.get(q);
    if (!indices) return [];
    candidateIndices = Array.from(indices);
  } else {
    // For longer queries, filter from prefix candidates then do substring match
    const prefix = q.slice(0, 4);
    const indices = prefixIndex ? prefixIndex.get(prefix) : null;
    const pool = indices ? Array.from(indices) : vocabData.map((_, i) => i);
    candidateIndices = pool.filter(i => {
      const n = normalizedData[i];
      return n.word.includes(q) || n.english.includes(q);
    });
  }

  // Sort: exact prefix matches first, then by level priority
  const levelOrder = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
  candidateIndices.sort((ai, bi) => {
    const aWord = normalizedData[ai].word;
    const bWord = normalizedData[bi].word;
    const aExact = aWord.startsWith(q) ? 0 : 1;
    const bExact = bWord.startsWith(q) ? 0 : 1;
    if (aExact !== bExact) return aExact - bExact;
    return (levelOrder[vocabData[ai].level] || 3) - (levelOrder[vocabData[bi].level] || 3);
  });

  return candidateIndices.slice(0, limit).map(i => vocabData[i]);
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
