# Lección Diaria — TODO

Remaining improvements not yet implemented, organized by priority.

## P4 — Lower Priority / Larger Scope

### Content
- [ ] **More graded reading passages** — add A1-A2 level readers, expand B1+ passages
- [ ] **Branching dialogue practice** — interactive conversations with choice points
- [ ] **Pronunciation guide expansion** — b/v distinction, intervocalic d, regional accent notes
- [ ] **Vocabulary with images** — add image URLs/assets for concrete nouns (requires image hosting)

### Infrastructure
- [ ] **Content versioning in service worker** — version data files separately from app shell
- [ ] **E2E tests** — set up Playwright or Cypress for critical user flows
- [ ] **Full accessibility audit** — run axe-core and Lighthouse, fix all reported violations
- [ ] **Analytics infrastructure** — lightweight, privacy-respecting usage analytics
- [ ] **TypeScript migration** — gradual migration starting with utility functions and data types
- [ ] **Build regex escaping** — build.js only escapes dots in filenames; other regex metacharacters aren't escaped
- [ ] **Build directory copy not recursive** — `COPY_DIRS` loop only copies one level deep
- [ ] **esbuild fallback is silent** — if esbuild is missing, build continues unminified without a prominent warning
- [ ] **Test coverage gaps** — no tests for: localStorage/IDB round-trips, offline behavior, keyboard navigation, bundle size

### Accessibility
- [ ] **Focus management on screen transitions** — no code moves focus when screens change; keyboard users lose context
- [ ] **Flashcard 3D transform not accessible** — screen readers get no announcement of card flip; add `aria-pressed` or live region
- [ ] **Color-only quiz feedback** — verify all quiz types include text/icon indicators alongside green/red colors
- [ ] **Color contrast verification** — `--text2`, `--text3`, `--accent2` may fall below WCAG AA 4.5:1 on dark backgrounds

### Data Quality
- [ ] **Fix 5,812 flagged vocab entries** from vocab_quality_report.json:
  - 2,756 entries where English = Spanish (cognates with no learning value)
  - 1,466 entries where example doesn't contain the word
  - 609 entries with invalid/inconsistent categories
  - 477 verb entries that aren't infinitive forms
  - 606 verb examples that may not contain the verb
  - 48 entries with freq out of range
  - 36 nouns missing gender
- [ ] **Remove 4 duplicate vocab entries** (tío, naranja, matizar, receta)
- [ ] **Normalize vocab categories** — standardize naming (e.g., "interjection" vs "interjections")
- [ ] **Clean up sparse categories** — merge or remove categories with only 1-2 entries (aviation:1, brand:1, etc.)

### Social / Backend Features (requires server)
- [ ] **Social/competitive features** — leaderboards, friend challenges
- [ ] **Cloud sync** — sync progress across devices
- [ ] **Spaced repetition notifications** — push notifications for due reviews

## Recently Completed

### Code Quality Fixes (Rounds 1-3)
- [x] **Gender quiz FSRS tracking** — `submitGenderQuizMC()` now calls `reviewItem()` for SRS scheduling
- [x] **Conjugation stem variable** — fixed o>ue preterite/imperfect subjunctive using `conjStem` instead of `stem`
- [x] **Grammar search aria-label** — added missing `aria-label` to grammar search input
- [x] **Share modal dialog ARIA** — added `role="dialog"`, `aria-modal`, `aria-labelledby`
- [x] **`pick()` empty array guard** — returns `undefined` safely for empty/falsy arrays
- [x] **`bookmarkId()` malformed input** — returns empty string if no colon found
- [x] **TTS error feedback** — shows one-time toast on speech synthesis failure
- [x] **IDB backup error logging** — catch block now logs via `console.warn`
- [x] **`parseInt` radix** — added explicit radix 10 in learn-vocab.js, app-practice.js
- [x] **Vocab indexing null guard** — skips entries with missing `word` property
- [x] **`?.focus()` null checks** — added optional chaining on `getElementById().focus()`
- [x] **Arrow key modulo-by-zero** — guard for empty quiz options array
- [x] **`VERB_DATA.length`** — replaced `Object.keys(VERB_DATA).length` with direct `.length`
- [x] **Build error reporting** — per-file try/catch in minification loop
- [x] **Daily Challenge fallback** — `topics[dayOfWeek] || topics[0]`
- [x] **sw.js variable rename** — `path` → `pathname` in `isDataFile()`
- [x] **Verb frequency gap** — closed 153→155 gap, shifted B2 frequencies
