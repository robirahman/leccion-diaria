// ════════════════════════════════════════════════════════════
//  app-init.js — Event delegation, keyboard shortcuts,
//                search inputs, initialization, SW registration
// ════════════════════════════════════════════════════════════
'use strict';

// ════════════════════════════════════════
//  EVENT DELEGATION
// ════════════════════════════════════════

document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (!target) {
    closeDropdowns();
    return;
  }
  const action = target.dataset.action;

  switch (action) {
    // Navigation
    case 'go-back': goBack(); break;
    case 'switch-tab': switchTab(target.dataset.tab); break;
    case 'toggle-theme': {
      const cur = progress?.settings?.theme || 'dark';
      setSetting('theme', cur === 'dark' ? 'light' : 'dark');
      break;
    }
    case 'open-settings': showScreen('settings'); break;
    case 'open-guide': showScreen('guide'); break;

    // Profile
    case 'select-profile': selectProfile(target.dataset.name); break;
    case 'create-profile': createProfile(); break;
    case 'confirm-create-profile': confirmCreateProfile(); break;
    case 'onboarding-next': onboardingNext(); break;
    case 'onboarding-skip': onboardingSkip(); break;

    // Modal
    case 'close-modal': closeModal(); _pendingNavTab = null; break;
    case 'confirm-leave-quiz': closeModal(); if (_pendingNavTab) { const fn = _pendingNavTab; _pendingNavTab = null; _leaveConfirmed = true; fn(); } break;

    // Bookmarks
    case 'toggle-bookmark': toggleBookmark(target.dataset.bkType, target.dataset.bkId); break;

    // Settings
    case 'set-display': setSetting('display', target.dataset.val); break;
    case 'set-theme': setSetting('theme', target.dataset.val); break;
    case 'set-palette': setSetting('palette', target.dataset.val); break;
    case 'set-region': setSetting('region', target.dataset.val); break;
    case 'set-accents': setSetting('accents', target.dataset.val); break;
    case 'set-tts-rate': setSetting('ttsRate', target.dataset.val); break;
    case 'set-hideFutureSubjunctive': setSetting('hideFutureSubjunctive', target.dataset.val === 'true'); break;
    case 'set-subjunctiveForm': setSetting('subjunctiveForm', target.dataset.val); break;
    case 'set-dailyGoal': setSetting('dailyGoal', parseInt(target.dataset.val)); break;
    case 'export-progress': exportProgress(); break;
    case 'import-progress': importProgress(); break;
    case 'reset-progress': {
      showModal(t('resetTitle'), `<p>${t('resetConfirm')}</p>`, [
        { label: tBtn('cancel'), action: 'close-modal', cls: 'btn-secondary' },
        { label: tBtn('reset'), action: 'confirm-reset', cls: 'btn-primary' },
      ]);
      break;
    }
    case 'confirm-reset': {
      progress = newProgress();
      saveProgress();
      updateNavStats();
      closeModal();
      switchTab('today');
      break;
    }

    // Admin mode
    case 'admin-tap-settings': {
      adminTaps++;
      clearTimeout(adminTapTimer);
      adminTapTimer = setTimeout(() => adminTaps = 0, 3000);
      if (adminTaps >= 5) {
        adminTaps = 0;
        const btn = document.getElementById('admin-mode-btn');
        if (btn) btn.style.display = '';
      }
      break;
    }
    case 'open-admin': showScreen('admin'); renderAdmin(); break;
    case 'admin-collapse': {
      const section = target.nextElementSibling;
      if (section) {
        const open = section.style.display !== 'none';
        section.style.display = open ? 'none' : '';
        target.textContent = target.textContent.replace(/[▸▾]/, open ? '▸' : '▾');
      }
      break;
    }
    case 'admin-toggle': {
      const store = target.dataset.store;
      const key = target.dataset.key;
      if (store && key && progress[store]) {
        if (progress[store][key]) { delete progress[store][key]; }
        else { progress[store][key] = true; }
        saveProgress();
        renderAdmin();
      }
      break;
    }
    case 'admin-clear-store': {
      const stores = (target.dataset.stores || '').split(',');
      for (const s of stores) { if (progress[s]) progress[s] = {}; }
      saveProgress();
      renderAdmin();
      break;
    }
    case 'admin-set-level': {
      progress.placementLevel = target.dataset.val || null;
      saveProgress();
      renderAdmin();
      break;
    }

    // Word of the Day / Daily Challenge
    case 'speak-wotd': speak(target.dataset.word); break;
    case 'start-phrase-quiz-daily': { currentSituation = null; startPhraseQuiz(); break; }
    case 'start-grammar-quiz-random': {
      if (typeof GRAMMAR_DATA !== 'undefined' && GRAMMAR_DATA.length > 0) {
        const lesson = GRAMMAR_DATA[Math.floor(Math.random() * GRAMMAR_DATA.length)];
        openGrammarLesson(lesson.id);
        startGrammarQuiz();
      }
      break;
    }

    // Verbs
    case 'start-verb-learn': startVerbLearn(); break;
    case 'start-verb-drill': startVerbDrill(); break;
    case 'start-verb-quiz': startVerbQuiz(); break;
    case 'open-verb-patterns': showScreen('verb-patterns'); renderVerbPatterns(); break;
    case 'start-pattern-drill': startPatternDrill(target.dataset.pattern || target.closest('[data-pattern]')?.dataset.pattern); break;
    case 'open-verb-browser': renderVerbBrowser(); break;
    case 'flip-verb-card': flipVerbCard(); break;
    case 'rate-verb': rateVerb(parseInt(target.dataset.rating)); break;
    case 'check-verb-drill': checkVerbDrill(); break;
    case 'next-verb-drill': nextVerbDrill(); break;
    case 'answer-verb-quiz': answerVerbQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-verb-quiz-mc': submitVerbQuizMC(); break;
    case 'submit-verb-quiz-fib': submitVerbQuizFIB(); break;
    case 'next-verb-quiz': nextVerbQuiz(); break;
    case 'show-verb-detail': showVerbDetail(target.dataset.verb); break;
    case 'filter-verbs': renderVerbBrowser(target.dataset.filter); break;
    case 'search-verbs': renderVerbBrowser('all', document.getElementById('verb-search')?.value); break;

    // Vocab
    case 'open-vocab-cat': openVocabCategory(target.dataset.cat); break;
    case 'vocab-cat-more': openVocabCategory(target.dataset.cat, parseInt(target.dataset.page)); break;
    case 'start-vocab-learn': startVocabLearn(); break;
    case 'start-vocab-quiz': startVocabQuiz(); break;
    case 'start-quick-vocab': startQuickVocab(); break;
    case 'start-learn-new': startLearnNewWords(); break;
    case 'start-gender-quiz': startGenderQuiz(); break;
    case 'flip-vocab-card': flipVocabCard(); break;
    case 'rate-vocab': rateVocab(parseInt(target.dataset.rating)); break;
    case 'answer-vocab-quiz': {
      answerVocabQuizMC(parseInt(target.dataset.idx));
      break;
    }
    case 'submit-vocab-quiz-mc': {
      if (vocabQuizQueue[vocabQuizIdx]?.type === 'gender') {
        submitGenderQuizMC();
      } else {
        submitVocabQuizMC();
      }
      break;
    }
    case 'submit-vocab-quiz-produce': submitVocabQuizProduce(); break;
    // insert-accent-vocq handled by unified accent handler below
    case 'next-vocab-quiz': {
      vocabQuizIdx++;
      const nextItem = vocabQuizQueue[vocabQuizIdx];
      if (nextItem?.type === 'gender') renderVocabQuizQuestion_Gender();
      else if (nextItem?.type === 'produce') renderVocabQuizQuestion_Produce();
      else renderVocabQuizQuestion();
      break;
    }

    // Grammar
    case 'open-grammar-lesson': openGrammarLesson(target.dataset.lesson); break;
    case 'start-grammar-quiz': startGrammarQuiz(); break;
    case 'answer-grammar-quiz': answerGrammarQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-grammar-quiz-mc': submitGrammarQuizMC(); break;
    case 'submit-grammar-fib': submitGrammarFIB(); break;
    case 'next-grammar-quiz': nextGrammarQuiz(); break;

    // Phrases
    case 'open-phrase-sit': openPhraseSituation(target.dataset.sit); break;
    case 'start-phrase-learn': startPhraseLearn(); break;
    case 'start-phrase-quiz': startPhraseQuiz(); break;
    case 'answer-phrase-quiz': answerPhraseQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-phrase-quiz-mc': submitPhraseQuizMC(); break;
    case 'next-phrase-quiz': nextPhraseQuiz(); break;
    case 'flip-phrase-card': flipPhraseCard(); break;
    case 'rate-phrase': ratePhrase(parseInt(target.dataset.rating)); break;

    // Culture
    case 'open-culture': openCultureModule(target.dataset.module); break;
    case 'open-culture-item': openCultureItem(target.dataset.id); break;
    case 'start-culture-quiz': startCultureQuiz(); break;
    case 'start-dialogue-practice': startDialoguePractice(); break;
    case 'answer-dialogue': answerDialogueMC(parseInt(target.dataset.idx)); break;
    case 'submit-dialogue-mc': submitDialogueMC(); break;
    case 'next-dialogue': nextDialogue(); break;
    case 'answer-culture-quiz': answerCultureQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-culture-quiz-mc': submitCultureQuizMC(); break;
    case 'next-culture-quiz': nextCultureQuiz(); break;

    // Results
    case 'results-retry': goBack(); break;
    case 'results-home': switchTab('today'); break;

    // Review
    case 'start-review': startReview(); break;
    case 'answer-review': answerReviewMC(parseInt(target.dataset.idx)); break;
    case 'submit-review-mc': submitReviewMC(); break;
    case 'rate-review': rateReviewItem(parseInt(target.dataset.rating)); break;
    case 'next-review': nextReviewItem(); break;
    case 'check-review-drill': checkReviewDrill(); break;
    case 'flip-review-card': flipReviewCard(); break;
    // insert-accent-rev handled by unified accent handler below

    // Stats / Progress Dashboard
    case 'open-stats': showScreen('stats'); renderStats(); break;
    case 'share-progress': generateShareCard(); break;
    case 'close-share': document.getElementById('share-overlay').classList.remove('open'); break;
    case 'download-share': downloadShareCard(); break;
    case 'native-share': nativeShareCard(); break;
    case 'start-weak-review': startWeakReview(); break;

    // Placement Test
    case 'start-placement': startPlacementTest(); break;
    case 'answer-placement': answerPlacementMC(parseInt(target.dataset.idx)); break;
    case 'submit-placement-mc': submitPlacementMC(); break;
    case 'submit-placement-fib': submitPlacementFIB(); break;
    case 'next-placement': nextPlacementQuestion(); break;
    case 'placement-done': switchTab('today'); break;
    case 'retake-placement': startPlacementTest(); break;
    case 'start-placement-at': showPlacementModeSelection(target.dataset.level); break;
    case 'start-placement-mode': startPlacementAt(target.dataset.level, target.dataset.mode); break;
    case 'end-placement-early': if (placementIdx >= 5) finishPlacementTest(); break;
    case 'pt-set-length': {
      const len = parseInt(target.dataset.len);
      if ([10, 20, 40].includes(len)) {
        placementTargetLength = len;
        savePlacementState();
        if (placementIdx >= len) finishPlacementTest();
        else {
          // Re-render just the controls and progress, not the question
          document.getElementById('pt-progress').textContent = `${placementIdx + 1} / ${placementTargetLength}`;
          document.getElementById('pt-progress-bar-fill').style.width = Math.round((placementIdx / placementTargetLength) * 100) + '%';
          const ctrl = document.getElementById('pt-controls');
          if (ctrl) {
            const minReached = placementIdx >= 5;
            ctrl.innerHTML = `<div class="pt-controls-row">
              <button class="btn btn-outline btn-xs${placementTargetLength===10?' active':''}" data-action="pt-set-length" data-len="10">10 Qs</button>
              <button class="btn btn-outline btn-xs${placementTargetLength===20?' active':''}" data-action="pt-set-length" data-len="20">20 Qs</button>
              <button class="btn btn-outline btn-xs${placementTargetLength===40?' active':''}" data-action="pt-set-length" data-len="40">40 Qs</button>
              <button class="btn btn-outline btn-xs pt-end-btn" data-action="end-placement-early" ${minReached?'':'disabled'}>End Test</button>
            </div>`;
          }
        }
      }
      break;
    }

    // Practice exercises
    case 'open-minimal-pairs': showScreen('minimal-pairs'); renderMinimalPairCategories(); break;
    case 'start-mp': startMinimalPairs(target.dataset.cat || target.closest('[data-cat]')?.dataset.cat); break;
    case 'answer-mp': answerMP(parseInt(target.dataset.idx)); break;
    case 'next-mp': nextMP(); break;
    case 'open-phonetic-pairs': showScreen('phonetic-pairs'); renderPhoneticPairCategories(); break;
    case 'start-pp': startPhoneticPairs(target.dataset.cat || target.closest('[data-cat]')?.dataset.cat); break;
    case 'answer-pp': answerPP(parseInt(target.dataset.idx)); break;
    case 'next-pp': nextPP(); break;
    case 'open-homophones': showScreen('homophones'); renderHomophoneCategories(); break;
    case 'start-hom': startHomophones(target.dataset.cat || target.closest('[data-cat]')?.dataset.cat); break;
    case 'answer-hom': answerHom(parseInt(target.dataset.idx)); break;
    case 'next-hom': nextHom(); break;
    case 'open-connectors': showScreen('connectors'); renderConnectorCategories(); break;
    case 'start-conn': startConnectors(target.dataset.cat || target.closest('[data-cat]')?.dataset.cat); break;
    case 'answer-conn': answerConn(parseInt(target.dataset.idx)); break;
    case 'next-conn': nextConn(); break;
    case 'open-sentence-build-topics': startSentenceBuild(); break;
    case 'tap-sb-word': tapSBWord(target); break;
    case 'check-sentence-build': checkSentenceBuild(); break;
    case 'next-sentence-build': nextSentenceBuild(); break;
    case 'open-cloze-topics': showScreen('cloze-topics'); renderClozeTopics(); break;
    case 'start-cloze': startCloze(target.dataset.topic || target.closest('[data-topic]')?.dataset.topic); break;
    case 'check-cloze': checkCloze(); break;
    case 'next-cloze': nextCloze(); break;
    case 'open-translation-topics': startTranslation(); break;
    case 'check-translation': checkTranslation(); break;
    case 'next-translation': nextTranslation(); break;
    case 'open-dictation': startDictation(); break;
    case 'dict-play': dictPlayNormal(); break;
    case 'dict-play-slow': dictPlaySlow(); break;
    case 'check-dictation': checkDictation(); break;
    case 'next-dictation': nextDictation(); break;

    // Verb Reference
    case 'open-verb-reference': showScreen('verb-reference'); break;
    case 'select-vref': renderVerbReference(target.dataset.verb); break;
    case 'vref-tab': {
      const tab = target.dataset.tab;
      document.querySelectorAll('#vref-tabs .btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
      document.getElementById('vref-tab-lookup').style.display = tab === 'lookup' ? '' : 'none';
      document.getElementById('vref-tab-rules').style.display = tab === 'rules' ? '' : 'none';
      if (tab === 'rules') renderConjugationRules();
      break;
    }

    // Pronunciation Guide
    case 'open-pronunciation': showScreen('pronunciation'); renderPronunciation(); break;

    // Reading Comprehension
    case 'open-reading': showScreen('reading-list'); renderReadingList(); break;
    case 'filter-reading': renderReadingList(target.dataset.filter); break;
    case 'filter-reading-type': {
      readingTypeFilter = target.dataset.filter || 'standard';
      renderReadingList();
      break;
    }
    case 'start-reading': startReading(target.dataset.id || target.closest('[data-id]')?.dataset.id); break;
    case 'answer-reading': answerReadingMC(parseInt(target.dataset.idx)); break;
    case 'submit-reading-mc': submitReadingMC(); break;
    case 'next-reading': nextReading(); break;
    case 'toggle-listen-mode': {
      listenMode = !listenMode;
      const textEl = document.getElementById('read-text');
      const toggleBtn = document.getElementById('read-listen-toggle');
      if (listenMode) {
        textEl.style.display = 'none';
        toggleBtn.classList.add('active');
        // Auto-play the passage
        speak(currentReading.text);
      } else {
        textEl.style.display = '';
        toggleBtn.classList.remove('active');
      }
      break;
    }

    // Themed Vocabulary
    case 'open-themed-vocab': showScreen('themed-vocab'); renderThemedVocabList(); break;
    case 'open-themed-detail': openThemedDetail(target.dataset.id || target.closest('[data-id]')?.dataset.id); break;
    case 'start-themed-quiz': startThemedQuiz(); break;
    case 'answer-themed-quiz': answerThemedQuizMC(parseInt(target.dataset.idx)); break;
    case 'submit-themed-quiz-mc': submitThemedQuizMC(); break;
    case 'next-themed-quiz': nextThemedQuiz(); break;

    // CEFR Curriculum
    case 'open-curriculum': renderCurriculumOverview(); showScreen('curriculum'); break;
    case 'open-curriculum-level': renderCurriculumLevel(target.dataset.level || target.closest('[data-level]')?.dataset.level); showScreen('curriculum-level'); break;

    // Curriculum Tracks
    case 'open-tracks': renderTrackList(); showScreen('tracks'); break;
    case 'open-track-detail': openTrackDetail(target.dataset.id || target.closest('[data-id]')?.dataset.id); break;
    case 'launch-track-module': {
      const el = target.closest('[data-track-id]');
      if (el) launchTrackModule(el.dataset.trackId, el.dataset.moduleId);
      break;
    }

    // TTS
    case 'speak': speak(target.dataset.text); break;

    // Unified accent insertion — maps action suffix to input ID
    case 'insert-accent':
    case 'insert-accent-vq':
    case 'insert-accent-gq':
    case 'insert-accent-pt':
    case 'insert-accent-cloze':
    case 'insert-accent-tr':
    case 'insert-accent-dict':
    case 'insert-accent-vocq':
    case 'insert-accent-rev': {
      const accentInputMap = {
        'insert-accent': 'vd-input',
        'insert-accent-vq': 'vq-fib-input',
        'insert-accent-gq': 'gq-fib-input',
        'insert-accent-pt': 'pt-fib-input',
        'insert-accent-tr': 'tr-input',
        'insert-accent-dict': 'dict-input',
        'insert-accent-vocq': 'vocq-produce-input',
        'insert-accent-rev': 'rev-drill-input',
      };
      if (action === 'insert-accent-cloze') {
        const focused = document.activeElement;
        if (focused?.classList.contains('cloze-blank')) insertCharAtCursor(focused, target.dataset.char);
      } else {
        const inputId = target.dataset.inputId || accentInputMap[action];
        const input = inputId ? document.getElementById(inputId) : null;
        if (input) insertCharAtCursor(input, target.dataset.char);
      }
      break;
    }
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  // Arrow key navigation for quiz options
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const focused = document.activeElement;
    if (focused && focused.classList.contains('quiz-option') && !focused.classList.contains('disabled')) {
      const options = [...focused.closest('.quiz-options').querySelectorAll('.quiz-option:not(.disabled)')];
      const idx = options.indexOf(focused);
      const next = e.key === 'ArrowDown' ? (idx + 1) % options.length : (idx - 1 + options.length) % options.length;
      options[next]?.focus();
      e.preventDefault();
      return;
    }
  }

  // Arrow key navigation for tab bar
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const focused = document.activeElement;
    if (focused && focused.classList.contains('tab') && focused.closest('.tab-bar')) {
      const tabs = [...focused.closest('.tab-bar').querySelectorAll('.tab')];
      const idx = tabs.indexOf(focused);
      const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
      tabs[next]?.focus();
      e.preventDefault();
      return;
    }
  }

  // Flashcard flip on Enter/Space (#3 keyboard accessibility)
  if (e.key === 'Enter' || e.key === ' ') {
    const focused = document.activeElement;
    if (focused && focused.classList.contains('flashcard') && focused.dataset.action) {
      e.preventDefault();
      focused.click();
      return;
    }
  }

  if (e.key === 'Enter') {
    // Submit on Enter for drill inputs
    if (document.getElementById('screen-verb-drill')?.classList.contains('active')) {
      if (document.getElementById('vd-next').style.display !== 'none') nextVerbDrill();
      else checkVerbDrill();
      e.preventDefault();
    }
    // Enter to advance or submit on quiz screens
    const quizScreens = [
      { screen: 'verb-quiz', next: 'vq-next', fib: 'vq-fib-input', submitFn: submitVerbQuizFIB, nextFn: nextVerbQuiz },
      { screen: 'vocab-quiz', next: 'vocq-next', fib: 'vocq-produce-input', submitFn: submitVocabQuizProduce, nextFn: () => { vocabQuizIdx++; const ni = vocabQuizQueue[vocabQuizIdx]; if (ni?.type === 'gender') renderVocabQuizQuestion_Gender(); else if (ni?.type === 'produce') renderVocabQuizQuestion_Produce(); else renderVocabQuizQuestion(); } },
      { screen: 'grammar-quiz', next: 'gq-next', fib: 'gq-fib-input', submitFn: submitGrammarFIB, nextFn: nextGrammarQuiz },
      { screen: 'phrase-quiz', next: 'pq-next', fib: null, submitFn: null, nextFn: nextPhraseQuiz },
      { screen: 'culture-quiz', next: 'cq-next', fib: null, submitFn: null, nextFn: nextCultureQuiz },
      { screen: 'dialogue-practice', next: 'dp-next', fib: null, submitFn: null, nextFn: nextDialogue },
      { screen: 'placement', next: 'pt-next', fib: 'pt-fib-input', submitFn: submitPlacementFIB, nextFn: nextPlacementQuestion },
      { screen: 'mp-drill', next: 'mp-next', fib: null, submitFn: null, nextFn: nextMP },
      { screen: 'sentence-build', next: 'sb-next', fib: null, submitFn: checkSentenceBuild, nextFn: nextSentenceBuild },
      { screen: 'cloze', next: 'cloze-next', fib: null, submitFn: checkCloze, nextFn: nextCloze },
      { screen: 'translation', next: 'tr-next', fib: 'tr-input', submitFn: checkTranslation, nextFn: nextTranslation },
      { screen: 'dictation', next: 'dict-next', fib: 'dict-input', submitFn: checkDictation, nextFn: nextDictation },
    ];
    for (const qs of quizScreens) {
      if (!document.getElementById('screen-' + qs.screen)?.classList.contains('active')) continue;
      const nextBtn = document.getElementById(qs.next);
      if (nextBtn && nextBtn.style.display !== 'none') {
        qs.nextFn();
        e.preventDefault();
      } else if (qs.fib && qs.submitFn) {
        const fibInput = document.getElementById(qs.fib);
        if (fibInput && document.activeElement === fibInput) {
          qs.submitFn();
          e.preventDefault();
        }
      }
      break;
    }
    // Enter to create profile
    if (document.getElementById('modal-overlay').classList.contains('open')) {
      const nameInput = document.getElementById('new-profile-name');
      if (nameInput && document.activeElement === nameInput) {
        confirmCreateProfile();
        e.preventDefault();
      }
    }
  }

  // Number shortcuts for rating (1-4)
  const ratingBars = [
    { screen: 'verb-learn', bar: 'verb-learn-rating', fn: rateVerb },
    { screen: 'vocab-learn', bar: 'vocab-learn-rating', fn: rateVocab },
    { screen: 'phrase-learn', bar: 'phrase-learn-rating', fn: ratePhrase },
  ];
  for (const { screen, bar, fn } of ratingBars) {
    const el = document.getElementById(`screen-${screen}`);
    if (el?.classList.contains('active') && document.getElementById(bar)?.style.display !== 'none') {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) { fn(num); e.preventDefault(); break; }
    }
  }
});

// Verb search input (debounced)
let verbSearchTimer = null;
document.getElementById('verb-search')?.addEventListener('input', e => {
  clearTimeout(verbSearchTimer);
  verbSearchTimer = setTimeout(() => renderVerbBrowser('all', e.target.value), 150);
});

// Vocab search — uses Web Worker for non-blocking search on 28K entries
let vocabSearchTimer = null;
let _vocabWorker = null;
let _vocabSearchId = 0;

function _getVocabWorker() {
  if (!_vocabWorker) {
    try {
      _vocabWorker = new Worker(_resolveFile('vocab-search-worker.js'));
      _vocabWorker.onmessage = function(e) {
        if (e.data.type === 'results') {
          _renderVocabSearchResults(e.data.results, e.data.id);
        }
      };
      // Init worker with current data
      if (typeof VOCAB_DATA !== 'undefined' && VOCAB_DATA.length > 0) {
        _vocabWorker.postMessage({ type: 'init', data: VOCAB_DATA });
      }
    } catch (err) {
      // Worker not supported or blocked — fall back to main thread
      _vocabWorker = null;
    }
  }
  return _vocabWorker;
}

// Keep worker in sync when vocab data loads progressively
const _origBuildVocabIndexes = typeof buildVocabIndexes === 'function' ? buildVocabIndexes : null;
function _updateVocabWorker() {
  if (_vocabWorker && typeof VOCAB_DATA !== 'undefined') {
    _vocabWorker.postMessage({ type: 'update', data: VOCAB_DATA });
  }
}

function _renderVocabSearchResults(results, id) {
  // Ignore stale results
  if (id !== _vocabSearchId) return;
  document.getElementById('vocab-categories').innerHTML = results.map(w => `
    <div class="card" style="padding:0.5rem 0.75rem;text-align:left">
      ${w.gender ? `<span class="word-gender ${w.gender}" style="font-size:0.6rem;padding:0.05rem 0.25rem">${w.gender === 'f' ? 'la' : 'el'}</span>` : ''}
      <strong>${esc(w.word)}</strong>
      <span class="text-muted text-sm"> — ${esc(w.english)}</span>
    </div>
  `).join('') || emptyState('🔍', t('noResults'));
  hideLoading();
}

function _searchVocabMainThread(q) {
  buildVocabIndexes();
  const results = [];
  for (let i = 0; i < VOCAB_DATA.length && results.length < 50; i++) {
    const v = VOCAB_DATA[i];
    if (v.word.includes(q) || v.english.toLowerCase().includes(q)) {
      results.push(v);
    }
  }
  _renderVocabSearchResults(results, _vocabSearchId);
}

document.getElementById('vocab-search')?.addEventListener('input', e => {
  if (typeof VOCAB_DATA === 'undefined') return;
  const q = e.target.value.toLowerCase();
  if (!q) { clearTimeout(vocabSearchTimer); renderVocabHome(); return; }
  clearTimeout(vocabSearchTimer);
  vocabSearchTimer = setTimeout(() => {
    showLoading();
    _vocabSearchId++;
    const worker = _getVocabWorker();
    if (worker) {
      worker.postMessage({ type: 'search', query: q, limit: 50, id: _vocabSearchId });
    } else {
      requestAnimationFrame(() => _searchVocabMainThread(q));
    }
  }, 150);
});

// Grammar search input
document.getElementById('grammar-search')?.addEventListener('input', e => {
  if (typeof GRAMMAR_DATA === 'undefined') return;
  const q = e.target.value.toLowerCase();
  if (!q) { renderGrammarHome(); return; }
  const results = GRAMMAR_DATA.filter(g =>
    g.title.toLowerCase().includes(q) || g.titleEn.toLowerCase().includes(q)
  );
  const levelsEl = document.getElementById('grammar-levels');
  if (levelsEl) {
    levelsEl.innerHTML = results.map(g => `
      <div class="card" data-action="open-grammar-lesson" data-id="${g.id}" style="padding:0.5rem 0.75rem;text-align:left">
        <span class="badge badge-${g.level}">${g.level}</span>
        <strong>${esc(g.titleEn)}</strong>
        <span class="text-muted text-sm"> — ${esc(g.title)}</span>
      </div>
    `).join('') || emptyState('🔍', t('noResults'));
  }
  const summaryEl = document.getElementById('grammar-level-summary');
  if (summaryEl) summaryEl.innerHTML = '';
});

// Verb reference search input
document.getElementById('vref-search')?.addEventListener('input', e => {
  showVrefSuggestions(e.target.value.trim().toLowerCase());
});

function insertCharAtCursor(input, char) {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const val = input.value;
  input.value = val.substring(0, start) + char + val.substring(end);
  input.selectionStart = input.selectionEnd = start + char.length;
  input.focus();
}

// ════════════════════════════════════════
//  INITIALIZATION
// ════════════════════════════════════════

// ── Lazy-load secondary content modules after init ──
const LAZY_SCRIPTS = [
  'conversations.js', 'recipes.js', 'music.js', 'movies.js', 'poetry.js',
  'sports.js', 'proverbs.js', 'folktales.js', 'festivals.js', 'history.js',
  'travel.js', 'trivia.js', 'idioms.js', 'minimal_pairs.js',
  'sentence_construction.js', 'cloze_passages.js', 'translation_drills.js',
  'dictation.js', 'jokes.js', 'reading.js', 'reading_sat.js',
  'themed_vocab.js', 'curriculum_tracks.js', 'phonetic_pairs.js',
  'homophones.js', 'connectors.js'
];
let _lazyLoaded = false;
function _resolveFile(name) {
  // In production builds, window.__fileHash maps original names to hashed names
  return (window.__fileHash && window.__fileHash[name]) || name;
}
function lazyLoadSecondaryScripts() {
  if (_lazyLoaded) return;
  _lazyLoaded = true;
  // Load vocab data via fetch + JSON.parse (progressive: A1-A2 first, then rest)
  loadVocabData();
  LAZY_SCRIPTS.forEach(src => {
    const s = document.createElement('script');
    s.src = _resolveFile(src);
    s.async = true;
    document.body.appendChild(s);
  });
}

// Load vocab from split JSON files, progressively by CEFR level.
// A1+A2 loads first (~500KB) for immediate use, then B1/B2/C1/C2 follow.
const VOCAB_CHUNKS = ['vocab-a1a2.json', 'vocab-b1.json', 'vocab-b2.json', 'vocab-c1.json', 'vocab-c2.json'];
const _IDB_VOCAB_KEY = 'vocab-data-v2'; // versioned key for split format

function loadVocabData() {
  if (typeof VOCAB_DATA !== 'undefined' && VOCAB_DATA.length > 0) return;
  window.VOCAB_DATA = [];

  // Try IndexedDB cache first (full dataset)
  _idbGet(_IDB_VOCAB_KEY).then(cached => {
    if (cached && cached.length > 1000) {
      window.VOCAB_DATA = cached;
      if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
      return;
    }
    _fetchVocabProgressive();
  }).catch(() => _fetchVocabProgressive());
}

function _fetchVocabProgressive() {
  // Load A1+A2 first for immediate use
  fetch('vocab-a1a2.json').then(r => r.json()).then(data => {
    window.VOCAB_DATA = data;
    if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
    _updateVocabWorker();

    // Then load remaining levels in background
    const remaining = ['vocab-b1.json', 'vocab-b2.json', 'vocab-c1.json', 'vocab-c2.json'];
    return remaining.reduce((chain, file) =>
      chain.then(() => fetch(file).then(r => r.json()).then(chunk => {
        window.VOCAB_DATA = window.VOCAB_DATA.concat(chunk);
        if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
        _updateVocabWorker();
      })),
      Promise.resolve()
    );
  }).then(() => {
    // Cache the full dataset in IndexedDB
    _idbPut(_IDB_VOCAB_KEY, window.VOCAB_DATA);
  }).catch(() => {
    // Fallback: try loading the monolithic file
    fetch('vocab-data.json').then(r => r.json()).then(data => {
      window.VOCAB_DATA = data;
      if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
      _updateVocabWorker();
    }).catch(err => console.warn('Failed to load vocab data:', err));
  });
}

// ── Minimal IndexedDB helpers for vocab caching ──
const _IDB_NAME = 'leccion-diaria';
const _IDB_STORE = 'cache';
const _IDB_VERSION = 1;
function _idbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(_IDB_NAME, _IDB_VERSION);
    req.onupgradeneeded = () => { req.result.createObjectStore(_IDB_STORE); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function _idbGet(key) {
  return _idbOpen().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(_IDB_STORE, 'readonly');
    const req = tx.objectStore(_IDB_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}
function _idbPut(key, value) {
  return _idbOpen().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(_IDB_STORE, 'readwrite');
    const req = tx.objectStore(_IDB_STORE).put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  }));
}

function init() {
  renderProfiles();
  // Pre-populate voices
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }
  // Restore session if the page was discarded (e.g. tab switch on mobile/PWA)
  try {
    const savedProfile = sessionStorage.getItem('ld_active_profile');
    if (savedProfile && getProfiles().includes(savedProfile)) {
      selectProfile(savedProfile);
      // Restore placement test if it was in progress
      restorePlacementTest();
    }
  } catch (e) { /* ignore */ }
  // Lazy-load secondary content modules after a short delay
  if ('requestIdleCallback' in window) {
    requestIdleCallback(lazyLoadSecondaryScripts, { timeout: 2000 });
  } else {
    setTimeout(lazyLoadSecondaryScripts, 1000);
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showToast('🔄', 'Update available! Reload to get the latest version.');
          }
        });
      });
    })
    .catch(err => {
      console.error('SW registration failed:', err);
    });
}

// Offline indicator — badge in navbar + prominent banner + toast on change
let _previousOnlineState = navigator.onLine;
function updateOnlineStatus() {
  const isOnline = navigator.onLine;
  const badge = document.getElementById('offline-badge');
  if (badge) badge.classList.toggle('hidden', isOnline);
  const banner = document.getElementById('offline-banner');
  if (banner) banner.classList.toggle('visible', !isOnline);
  // Show toast only when coming back online (offline state shown via banner)
  if (isOnline && !_previousOnlineState) {
    showToast('\u2705', 'Back online');
  }
  _previousOnlineState = isOnline;
}
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// Global error handlers — show user-facing toast instead of silent console errors
let _lastErrorToast = 0;
function _showErrorToast() {
  const now = Date.now();
  if (now - _lastErrorToast < 3000) return;
  _lastErrorToast = now;
  try { showToast('⚠️', 'Something went wrong. Try reloading the page.'); } catch (_) { /* prevent loop */ }
}
window.addEventListener('error', e => { console.error('Uncaught error:', e.error); _showErrorToast(); });
window.addEventListener('unhandledrejection', e => { console.error('Unhandled promise rejection:', e.reason); _showErrorToast(); });

init();
