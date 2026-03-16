# Lección Diaria — TODO

Remaining improvements not yet implemented, organized by priority.

## P4 — Lower Priority / Larger Scope

### Content
- [ ] **Vocabulary with images** — add image URLs/assets for concrete nouns (requires image hosting)

### Social / Backend Features (requires server)
- [ ] **Social/competitive features** — leaderboards, friend challenges
- [ ] **Cloud sync** — sync progress across devices
- [ ] **Spaced repetition notifications** — push notifications for due reviews

## Recently Completed

### Code Quality Fixes (P0-P3)
- [x] Gender quiz FSRS tracking, conjugation stem-change bug
- [x] Grammar search aria-label, share modal dialog ARIA
- [x] pick() guard, bookmarkId() fix, TTS error toast, IDB logging
- [x] parseInt radix, vocab indexing null guard, focus() optional chaining
- [x] Arrow key modulo guard, VERB_DATA.length, build error reporting
- [x] Daily Challenge fallback, sw.js rename, verb frequency gap

### P4 Data Quality
- [x] Normalized 2,744 POS abbreviations (adj→adjective, adv→adverb, v→verb)
- [x] Removed naranja duplicate, added gender to 17 nouns

### P4 Build Infrastructure
- [x] Regex escaping helper for filename replacement
- [x] Recursive directory copy (fs.cpSync)
- [x] Prominent esbuild fallback warning
- [x] 17 new unit tests (pick, bookmarkId, shuffle, pickN, dormir conjugation) — 91→108

### P4 Accessibility
- [x] Focus management on screen transitions (h1/h2/h3 focus)
- [x] Flashcard flip aria-live announcer
- [x] Color contrast verified — all pass WCAG AA 4.5:1

### P4 Content
- [x] 5 new A1 reading passages (family, morning routine, food, school, hobbies)
- [x] 15 new B1-C2 reading passages (51 total: 10 A1, 5 A2, 10 B1, 9 B2, 9 C1, 8 C2)
- [x] Pronunciation: b/v distinction, intervocalic d, regional accent notes (24 new pairs)

### P4 Infrastructure (Wave 2)
- [x] Content versioning in service worker — APP_CACHE + DATA_CACHE with separate version hashes
- [x] Test coverage: localStorage round-trips, build helpers, vocab data validation — 108→142 tests
- [x] Vocab category normalization — 51 clean categories, 0 sparse (all merged)
- [x] All nouns have gender, all POS full words, all freqs in range 1-6
- [x] Reclassified 100 non-infinitive verb entries as phrases (idiomatic expressions)
- [x] Flagged 1,415 trivial cognates with `cognate: true` for filtering

### P4 Wave 3: A11y Audit, TypeScript, Branching Dialogues
- [x] Accessibility audit: 22 issues found, 15 critical/important fixed
  - Card button semantics (role="button" tabindex="0") on 64 elements
  - Share overlay: aria-hidden toggle, focus management, focus trap
  - Touch targets: nav-btn, accent-btn, tab-bar all ≥44px
  - Focus-visible styles for cards and nav buttons
  - aria-disabled on disabled quiz options (6 files)
  - Screen transition announcer (aria-live)
  - Card keyboard handler (Enter/Space)
- [x] TypeScript migration: jsconfig.json + JSDoc types for fsrs.js and conjugation.js
- [x] Branching dialogue practice: 6 dialogues (A1-B2), chat-style UI, XP tracking

### P4 Wave 4: E2E Tests, Analytics, A11y Polish, Example Fixes
- [x] E2E tests: Playwright + Chromium, 14 smoke tests (navigation, learn flow, placement)
- [x] Analytics: local-only stats screen with study time, daily XP chart, quiz breakdown, feature usage, learning pace
- [x] A11y moderate fixes: quiz feedback assertive, dark theme contrast, flashcard announcements, nav streak live region, focus-visible improvements
- [x] Fixed 441 A1/A2 vocab examples to include dictionary form (verbs, adjectives, nouns)

### P4 Wave 5: Programmatic API
- [x] `api.js` — UMD API: pure function re-exports (conjugation, FSRS, IRT, utils), data access, `Session` class, `PlacementSession` class
- [x] `api-node.js` — Node.js loader using `vm.createContext` with DOM stubs
- [x] `tests/test_api.js` — 31 tests covering pure functions, session CRUD, FSRS review flow, headless placement
- [x] Integrated into build pipeline (`build.js`), service worker (`sw.js`), and `index.html`
- [x] Total test count: 142 → 174
