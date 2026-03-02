# Plan: Expand Curated Vocabulary from 6.5k to 30k Words

## Context

The app has two vocab sources: `vocab.js` with ~6,457 richly curated entries (translation, category, POS, gender, example sentences) and `freq_vocab.js` with 30k bare-minimum entries (just word + rank + level). The user wants 30,000 fully curated, learnable words. The current `freq_vocab.js` is too noisy to use as-is — quality degrades from ~80% usable at A1 to ~30% at C2 due to conjugated forms, proper nouns, English loanwords, and duplicates. To yield 30k clean lemmas, we need to pull ~80k raw candidates, aggressively filter, then enrich the survivors with full metadata via LLM.

---

## Step 1: Build filtering/lemmatization pipeline (`build_vocab_pipeline.py`)

Create a new Python script that:

1. **Extracts ~80k raw candidates** from `wordfreq.top_n_list('es', 80000)`
2. **Lemmatizes with spaCy** (`es_core_news_lg` model):
   - Reduce conjugated verbs to infinitives (pasó → pasar, luchando → luchar)
   - Reduce adjective variants to masculine singular (europea → europeo)
   - Deduplicate collapsed lemmas, keeping highest-frequency entry
3. **Filters out junk**:
   - Proper nouns: spaCy NER + curated list of ~2k names/places from Wikidata
   - English loanwords: cross-reference against `wordfreq.top_n_list('en', 20000)`, expanded allowlist for valid cognates (chocolate, hotel, etc.)
   - Conjugated forms missed by spaCy: secondary suffix-pattern check (-ó, -aron, -aba, -ando, -iendo, etc.)
   - Plurals when singular exists, diminutives/augmentatives (-ito/-ota/-azo), acronyms (<5 chars all-caps), words <3 chars
4. **Deduplicates against existing `vocab.js`** — the 6,457 curated entries are preserved untouched
5. **Outputs** a JSON file of ~25k–27k clean lemmas with their frequency rank and zipf score

**Dependencies**: `pip install spacy wordfreq && python -m spacy download es_core_news_lg`

---

## Step 2: Enrich new words via Claude API (`enrich_vocab.py`)

Send the ~25k new words to Claude in batches of 100, requesting structured JSON output per word:

```
{ word, english, pos, gender, category, example, exampleEn }
```

- **Cost**: ~250 batches × ~5.5k tokens = ~1.4M tokens. ~$4–8 with Claude Sonnet.
- **Checkpoint/resume**: Save after each batch to a JSON file so interrupted runs can resume.
- **CEFR level**: Assigned from frequency rank (same mapping as current: 1–500=A1, 501–1500=A2, etc.)
- **`freq` field**: Mapped from zipf score (≥6.0→1, ≥5.0→2, ≥4.0→3, ≥3.5→4, <3.5→5)

### Category expansion

Add ~13 new categories to handle 30k words (current 32 → ~45):

| New Category | Key | Covers |
|---|---|---|
| Medicine | `medicine` | Clinical terms (split from health/scientific) |
| Cooking | `cooking` | Cooking verbs/tools (split from food) |
| Music & Arts | `music_arts` | Art/music terms |
| Geography | `geography` | Terrain, geographic terms |
| Economics | `economics` | Economic terms (split from business) |
| Military | `military` | Military/defense terms |
| Architecture | `architecture` | Building/construction |
| Fashion | `fashion` | Fashion terms (beyond basic clothing) |
| Religion | `religion` | Religious terminology |
| Psychology | `psychology` | Psychological terms |
| Transportation | `transportation` | Vehicles, traffic (split from travel) |
| Agriculture | `agriculture` | Farming terms |
| Maritime | `marine` | Nautical/ocean terms |

Post-processing ensures no category has <50 entries (merge small ones back).

---

## Step 3: Merge and produce final `vocab.js` (`merge_vocab.py`)

1. Load existing 6,457 curated entries (preserved exactly)
2. Append ~23.5k enriched entries
3. Add new categories to `VOCAB_CATEGORIES` object
4. Write out as `vocab.js` in the same format (~4–5MB, compresses to ~800KB–1MB gzipped)
5. **Retire `freq_vocab.js`** — remove from `index.html` and `sw.js`

---

## Step 4: Validate data quality (`test_vocab_quality.py`)

Automated checks:
- All required fields present; nouns have gender; verbs end in -ar/-er/-ir/-se
- No duplicate words (case-insensitive)
- Categories and CEFR levels are valid
- Example sentences contain the word (or stem for verbs)
- No empty translations; translation ≠ Spanish word
- Level distribution reasonable (A1: ~2k, A2: ~3k, B1: ~6k, B2: ~7k, C1: ~6k, C2: ~6k)
- No category has >3000 or <50 entries

Entries failing validation get re-sent to Claude for correction. Budget for ~5–10% needing a second pass.

Manual spot-check: 200 random entries stratified by level, checking translation accuracy, category fit, and example naturalness.

---

## Step 5: Optimize `app.js` for 30k entries

### 5a. Build indexes at startup

```javascript
const VOCAB_BY_CATEGORY = Object.create(null);
const VOCAB_BY_LEVEL = Object.create(null);
const VOCAB_BY_WORD = Object.create(null);
```

Populate once on load. Replace all ~41 `VOCAB_DATA.filter(v => v.category === ...)` calls with O(1) index lookups.

**Key lines to change in `app.js`**:
- Lines 1516, 1532, 1584, 1634, 1729–1730 (category filtering)
- Lines 2286, 2459, 2984 (level filtering)
- Lines 3915–3916, 4729–4731 (stats/mastery counting)

### 5b. Debounce search (line 5185)

Add 200ms debounce to the vocab search input. Use a for-loop with early break at 50 results instead of `.filter().slice(0, 50)`.

### 5c. Paginate large category views

Show 50 words at a time with a "Load More" button, since categories like "verbs" could have 3000+ entries.

### 5d. Remove FREQ_VOCAB references

Delete `buildFreqVocabQuestions()` (lines 2422–2486) and all other `FREQ_VOCAB` references. The placement test already has a `VOCAB_DATA`-based path that will now cover the full 30k.

### 5e. Update `index.html` and `sw.js`

- Remove `<script src="freq_vocab.js">` from `index.html`
- Add `defer` to the vocab.js script tag for faster first paint
- Update `sw.js` ASSETS array and bump cache version

---

## Step 6: End-to-end verification

1. Run the app locally, test vocab category browsing, search, quizzes, and placement test
2. Verify no perceptible lag on search or category navigation
3. Confirm placement test still correctly assigns levels
4. Check service worker caches correctly and app works offline
5. Test on mobile (or throttled network) to verify first-load time is acceptable

---

## Files to modify

| File | Action |
|---|---|
| `generate_vocab.py` | Replace with `build_vocab_pipeline.py` |
| (new) `enrich_vocab.py` | LLM enrichment script |
| (new) `merge_vocab.py` | Merge curated + enriched → final vocab.js |
| (new) `test_vocab_quality.py` | Validation script |
| `vocab.js` | Expand from 6.5k → 30k entries, add new categories |
| `freq_vocab.js` | Delete (retired) |
| `app.js` | Add indexing, debounce search, paginate categories, remove FREQ_VOCAB |
| `index.html` | Remove freq_vocab.js script tag, add defer to vocab.js |
| `sw.js` | Update ASSETS array, bump cache version |
