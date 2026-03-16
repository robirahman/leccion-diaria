# Lección Diaria — TODO

Remaining improvements not yet implemented, organized by priority.

## P1 — Security & Error Handling (completed)

- [x] **Content-Security-Policy** — added CSP meta tag to index.html
- [x] **Service worker registration** — already present in app-init.js
- [x] **FileReader `onerror` handler** — added error modal on read failure in app-practice.js
- [x] **Empty catch blocks** — replaced with console.warn logging in app-init.js
- [x] **DOM element data store** — replaced `container._revQuiz` with `_currentRevQuiz` variable

## P2 — Robustness & Performance

- [ ] **fsrs.js no input validation** — functions accept `rating`, `s`, `d`, `r` without range checks; invalid values produce NaN that propagates through the SRS system
- [ ] **placement.js `thetaToLevel` thresholds misaligned** — thresholds (1.8, 2.7, 3.5, 4.3, 5.2) don't correspond to midpoints of `LEVEL_DIFFICULTY` values
- [ ] **Grammar search has no debounce** — vocab search has 150ms debounce but grammar search fires on every keystroke
- [ ] **Repeated DOM queries in render loops** — app-practice.js render functions do 6+ `getElementById` calls per render; should cache references
- [ ] **Global quiz state never cleared between profiles** — `mpQueue`, `ppQueue`, `homQueue`, etc. persist across profile switches
- [ ] **TTS rate modification without try/finally** — app-practice.js `dictPlaySlow()` overwrites `progress.settings.ttsRate` but doesn't restore on exception
- [ ] **Service worker has no fetch timeout** — network requests have no timeout; users wait indefinitely on slow connections
- [ ] **vocab-data.json not cache-busted** — build.js copies it as a static file without content hashing

## P3 — Code Quality & CSS

- [ ] **`var` declarations in quiz-engine.js** — ~15 `var` declarations inconsistent with `const`/`let` used elsewhere
- [ ] **Hardcoded topic labels not translatable** — app-practice.js `topicLabels` object has English-only strings that bypass `t()` i18n
- [ ] **CSS z-index scattered with no clear scale** — values range from 100 to 10000; `.navbar` and `.tab-bar` both use 100 (collision risk)
- [ ] **CSS missing `-webkit-` prefixes for 3D transforms** — flashcard flip uses `perspective`, `transform-style`, `rotateY` without webkit prefixes
- [ ] **CSS `!important` overuse** — `.hidden`, `.modal-overlay`, `.offline-banner` all use `!important`
- [ ] **Dead CSS rules** — `.nav-crumb` always `display: none`; duplicate `.flashcard` border declarations
- [ ] **Duplicated quiz rendering logic** — `renderVerbQuizQuestion`, `renderVocabQuizQuestion`, `renderGrammarQuizQuestion` follow near-identical patterns; could extract shared renderer
- [ ] **Bookmark string parsing fragility** — app-core.js `bk.split(':')` in multiple places; tightly coupled to format

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

## Code Quality (ongoing)

- [ ] **Consistent null checks** — standardize on `??` / `?.` instead of mixed `== null` / `typeof === 'undefined'`
- [ ] **Named constants for magic numbers** — quiz thresholds (0.9, 0.7), XP values (5, 3, 1), TTS slow rate (0.55), timeout delays
- [ ] **Hardcoded tense arrays** — derive from TENSE_META in placement.js and practice-reference.js
- [ ] **Reduce inline styles** — extract repeated `style="..."` attributes to CSS classes
- [ ] **Document z-index scale** — establish and enforce: nav=100, dropdown=150, modal=1000, toast=1100
- [ ] **Worker prefix index** — use Set instead of Array to avoid duplicate indices
- [ ] **Cached string normalization** in vocab-search-worker.js — normalize once, reuse
