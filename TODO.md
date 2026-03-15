# Lección Diaria — TODO

Remaining improvements not yet implemented, organized by priority.

## P3 — Medium Impact, Medium-High Effort

- [ ] **Refactor 430-line switch statement** in app-init.js (lines 11–440) into action handler modules (e.g., quiz-actions.js, settings-actions.js, navigation-actions.js)
- [ ] **Undo last flashcard rating** — let users undo accidental SRS ratings within a short window
- [ ] **Onboarding flow** — after placement test, show personalized learning plan recommending modules based on level
- [ ] **Offline indicator UX** — gray out TTS buttons when offline, show connectivity state on network-dependent features
- [ ] **CSV export** — add option to export progress data as CSV alongside JSON
- [ ] **Parallel vocab fetching** — change `_fetchVocabProgressive()` from sequential `.reduce()` chain to `Promise.all()` for B1-C2 chunks
- [ ] **Batch `applyDisplayMode()`** — replace 100+ DOM queries with CSS class toggles or custom properties
- [ ] **Card grid responsive fix** — test on 320px screens; may need `minmax(80px, 1fr)` for very small devices
- [ ] **Improve card clickability** — add cursor:pointer, hover lift animation, subtle shadow transition on all interactive cards
- [ ] **Encapsulate quiz state** — replace global mutable variables (vpQuizQueue, subjQuizIdx, etc.) in feature-modules.js with closures or objects

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

## Code Quality (ongoing)

- [ ] **Consistent null checks** — standardize on `??` / `?.` instead of mixed `== null` / `typeof === 'undefined'`
- [ ] **Named constants for magic numbers** — quiz slice limits, timeout delays, XP values
- [ ] **Hardcoded tense arrays** — derive from TENSE_META in placement.js and practice-reference.js
- [ ] **Reduce inline styles** — extract repeated `style="..."` attributes to CSS classes
- [ ] **Document z-index scale** — navbar:100, dropdown:150, modal:200, toast:250
- [ ] **Worker prefix index** — use Set instead of Array to avoid duplicate indices
- [ ] **Cached string normalization** in vocab-search-worker.js — normalize once, reuse
