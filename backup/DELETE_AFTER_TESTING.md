# Backup — Safe to Delete After Testing

This folder contains the original monolithic `app.js` (6,597 lines) before it was split into:

- `app-core.js` — State, persistence, navigation, settings, achievements, FSRS, TTS, utilities
- `app-learn.js` — Today, Verbs, Vocab, Grammar, Phrases, Numbers, Culture, Dialogue, Results, Placement
- `app-practice.js` — Practice exercises, export/import, admin, dashboard, review, reading, themed vocab, curriculum
- `app-init.js` — Event delegation, keyboard shortcuts, search, initialization

## When to delete

Once you have verified that the app works correctly with the new split files, delete this entire `backup/` folder:

```
rm -rf backup/
```

## How to restore (if needed)

If something is broken, you can restore the original by:

1. Copy `backup/app.js` back to the project root
2. In `index.html`, replace the four `app-*.js` script tags with a single `<script defer src="app.js"></script>`
3. In `sw.js`, replace the four `./app-*.js` entries in ASSETS with `./app.js`
