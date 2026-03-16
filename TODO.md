# Lección Diaria — TODO

Remaining improvements not yet implemented, organized by priority.

## P4 — Lower Priority / Larger Scope

### Content
- [ ] **More graded reading passages** — expand B1+ passages (A1-A2 now have 10 passages each)
- [ ] **Branching dialogue practice** — interactive conversations with choice points
- [ ] **Vocabulary with images** — add image URLs/assets for concrete nouns (requires image hosting)

### Infrastructure
- [ ] **Content versioning in service worker** — version data files separately from app shell
- [ ] **E2E tests** — set up Playwright or Cypress for critical user flows
- [ ] **Full accessibility audit** — run axe-core and Lighthouse, fix all reported violations
- [ ] **Analytics infrastructure** — lightweight, privacy-respecting usage analytics
- [ ] **TypeScript migration** — gradual migration starting with utility functions and data types
- [ ] **Test coverage gaps** — no tests for: localStorage/IDB round-trips, offline behavior, keyboard navigation, bundle size

### Data Quality
- [ ] **Fix remaining flagged vocab entries** from vocab_quality_report.json:
  - 2,756 entries where English = Spanish (cognates with no learning value)
  - 1,466 entries where example doesn't contain the word
  - 609 entries with invalid/inconsistent categories
  - 477 verb entries that aren't infinitive forms
  - 606 verb examples that may not contain the verb
- [ ] **Normalize vocab categories** — standardize naming (e.g., "interjection" vs "interjections")
- [ ] **Clean up sparse categories** — merge or remove categories with only 1-2 entries (aviation:1, brand:1, etc.)

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
- [x] Pronunciation: b/v distinction, intervocalic d, regional accent notes (24 new pairs)
