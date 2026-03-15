// ════════════════════════════════════════════════════════════
//  app-init.js — Event delegation, keyboard shortcuts,
//                search inputs, initialization, SW registration
// ════════════════════════════════════════════════════════════
'use strict';

// ════════════════════════════════════════
//  EVENT DELEGATION
// ════════════════════════════════════════

// ── Helper functions for complex action handlers ──

function _handleToggleTheme() {
  const cur = progress?.settings?.theme || 'dark';
  setSetting('theme', cur === 'dark' ? 'light' : 'dark');
}

function _handleConfirmLeaveQuiz() {
  closeModal();
  if (_pendingNavTab) {
    const fn = _pendingNavTab;
    _pendingNavTab = null;
    _leaveConfirmed = true;
    fn();
  }
}

function _handleResetProgress() {
  showModal(t('resetTitle'), `<p>${t('resetConfirm')}</p>`, [
    { label: tBtn('cancel'), action: 'close-modal', cls: 'btn-secondary' },
    { label: tBtn('reset'), action: 'confirm-reset', cls: 'btn-primary' },
  ]);
}

function _handleConfirmReset() {
  progress = newProgress();
  saveProgress();
  updateNavStats();
  closeModal();
  switchTab('today');
}

function _handleAdminTapSettings() {
  adminTaps++;
  clearTimeout(adminTapTimer);
  adminTapTimer = setTimeout(() => adminTaps = 0, 3000);
  if (adminTaps >= 5) {
    adminTaps = 0;
    const btn = document.getElementById('admin-mode-btn');
    if (btn) btn.style.display = '';
  }
}

function _handleAdminCollapse(target) {
  const section = target.nextElementSibling;
  if (section) {
    const open = section.style.display !== 'none';
    section.style.display = open ? 'none' : '';
    target.textContent = target.textContent.replace(/[▸▾]/, open ? '▸' : '▾');
  }
}

function _handleAdminToggle(target) {
  const store = target.dataset.store;
  const key = target.dataset.key;
  if (store && key && progress[store]) {
    if (progress[store][key]) { delete progress[store][key]; }
    else { progress[store][key] = true; }
    saveProgress();
    renderAdmin();
  }
}

function _handleAdminClearStore(target) {
  const stores = (target.dataset.stores || '').split(',');
  for (const s of stores) { if (progress[s]) progress[s] = {}; }
  saveProgress();
  renderAdmin();
}

function _handleStartGrammarQuizRandom() {
  if (typeof GRAMMAR_DATA !== 'undefined' && GRAMMAR_DATA.length > 0) {
    const lesson = GRAMMAR_DATA[Math.floor(Math.random() * GRAMMAR_DATA.length)];
    openGrammarLesson(lesson.id);
    startGrammarQuiz();
  }
}

function _handleSubmitVocabQuizMC() {
  if (vocabQuizQueue[vocabQuizIdx]?.type === 'gender') {
    submitGenderQuizMC();
  } else {
    submitVocabQuizMC();
  }
}

function _handleNextVocabQuiz() {
  vocabQuizIdx++;
  const nextItem = vocabQuizQueue[vocabQuizIdx];
  if (nextItem?.type === 'gender') renderVocabQuizQuestion_Gender();
  else if (nextItem?.type === 'produce') renderVocabQuizQuestion_Produce();
  else renderVocabQuizQuestion();
}

function _handleVrefTab(target) {
  const tab = target.dataset.tab;
  document.querySelectorAll('#vref-tabs .btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.getElementById('vref-tab-lookup').style.display = tab === 'lookup' ? '' : 'none';
  document.getElementById('vref-tab-rules').style.display = tab === 'rules' ? '' : 'none';
  if (tab === 'rules') renderConjugationRules();
}

function _handleFilterReadingType(target) {
  readingTypeFilter = target.dataset.filter || 'standard';
  renderReadingList();
}

function _handleToggleListenMode() {
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
}

function _handleLaunchTrackModule(target) {
  const el = target.closest('[data-track-id]');
  if (el) launchTrackModule(el.dataset.trackId, el.dataset.moduleId);
}

function _handlePtSetLength(target) {
  const len = parseInt(target.dataset.len, 10);
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
}

// Unified accent insertion — maps action suffix to input ID
const _ACCENT_INPUT_MAP = {
  'insert-accent': 'vd-input',
  'insert-accent-vq': 'vq-fib-input',
  'insert-accent-gq': 'gq-fib-input',
  'insert-accent-nq': 'nq-input',
  'insert-accent-pt': 'pt-fib-input',
  'insert-accent-tr': 'tr-input',
  'insert-accent-dict': 'dict-input',
  'insert-accent-vocq': 'vocq-produce-input',
  'insert-accent-rev': 'rev-drill-input',
};

function _handleInsertAccent(target, action) {
  if (action === 'insert-accent-cloze') {
    const focused = document.activeElement;
    if (focused?.classList.contains('cloze-blank')) insertCharAtCursor(focused, target.dataset.char);
  } else {
    const inputId = target.dataset.inputId || _ACCENT_INPUT_MAP[action];
    const input = inputId ? document.getElementById(inputId) : null;
    if (input) insertCharAtCursor(input, target.dataset.char);
  }
}

// ── Action handler maps organized by category ──

// Navigation
const NAV_HANDLERS = {
  'go-back':               ()  => goBack(),
  'switch-tab':            (t) => switchTab(t.dataset.tab),
  'toggle-theme':          ()  => _handleToggleTheme(),
  'open-settings':         ()  => showScreen('settings'),
  'open-guide':            ()  => showScreen('guide'),
  'open-keyboard-help':    ()  => { showScreen('keyboard-help'); renderKeyboardHelp(); },
  'open-review-dashboard': ()  => { showScreen('review-dashboard'); renderReviewDashboard(); },
  'close-session-summary': ()  => { document.getElementById('session-summary-container').innerHTML = ''; },
  'start-review-filtered': (t) => startReviewFiltered(t.dataset.filter),
};

// Profile
const PROFILE_HANDLERS = {
  'select-profile':         (t) => selectProfile(t.dataset.name),
  'create-profile':         ()  => createProfile(),
  'confirm-create-profile': ()  => confirmCreateProfile(),
  'onboarding-next':        ()  => onboardingNext(),
  'onboarding-skip':        ()  => onboardingSkip(),
};

// Modal
const MODAL_HANDLERS = {
  'close-modal':        () => { closeModal(); _pendingNavTab = null; },
  'confirm-leave-quiz': () => _handleConfirmLeaveQuiz(),
};

// Bookmarks
const BOOKMARK_HANDLERS = {
  'toggle-bookmark': (t) => toggleBookmark(t.dataset.bkType, t.dataset.bkId),
};

// Settings
const SETTINGS_HANDLERS = {
  'set-display':              (t) => setSetting('display', t.dataset.val),
  'set-theme':                (t) => setSetting('theme', t.dataset.val),
  'set-palette':              (t) => setSetting('palette', t.dataset.val),
  'set-region':               (t) => setSetting('region', t.dataset.val),
  'set-accents':              (t) => setSetting('accents', t.dataset.val),
  'set-tts-rate':             (t) => setSetting('ttsRate', t.dataset.val),
  'set-hideFutureSubjunctive':(t) => setSetting('hideFutureSubjunctive', t.dataset.val === 'true'),
  'set-subjunctiveForm':      (t) => setSetting('subjunctiveForm', t.dataset.val),
  'set-dailyGoal':            (t) => setSetting('dailyGoal', parseInt(t.dataset.val, 10)),
  'export-progress':          ()  => exportProgress(),
  'export-csv':               ()  => exportProgressCSV(),
  'import-progress':          ()  => importProgress(),
  'reset-progress':           ()  => _handleResetProgress(),
  'confirm-reset':            ()  => _handleConfirmReset(),
};

// Admin mode
const ADMIN_HANDLERS = {
  'admin-tap-settings': ()  => _handleAdminTapSettings(),
  'open-admin':         ()  => { showScreen('admin'); renderAdmin(); },
  'admin-collapse':     (t) => _handleAdminCollapse(t),
  'admin-toggle':       (t) => _handleAdminToggle(t),
  'admin-clear-store':  (t) => _handleAdminClearStore(t),
  'admin-set-level':    (t) => { progress.placementLevel = t.dataset.val || null; saveProgress(); renderAdmin(); },
};

// Word of the Day / Daily Challenge
const DAILY_HANDLERS = {
  'speak-wotd':                (t) => speak(t.dataset.word),
  'start-phrase-quiz-daily':   ()  => { currentSituation = null; startPhraseQuiz(); },
  'start-grammar-quiz-random': ()  => _handleStartGrammarQuizRandom(),
};

// Verbs
const VERB_HANDLERS = {
  'start-verb-learn':    ()  => startVerbLearn(),
  'start-verb-drill':    ()  => startVerbDrill(),
  'start-verb-quiz':     ()  => startVerbQuiz(),
  'open-verb-patterns':  ()  => { showScreen('verb-patterns'); renderVerbPatterns(); },
  'start-pattern-drill': (t) => startPatternDrill(t.dataset.pattern || t.closest('[data-pattern]')?.dataset.pattern),
  'open-verb-browser':   ()  => renderVerbBrowser(),
  'flip-verb-card':      ()  => flipVerbCard(),
  'rate-verb':           (t) => rateVerb(parseInt(t.dataset.rating, 10)),
  'check-verb-drill':    ()  => checkVerbDrill(),
  'next-verb-drill':     ()  => nextVerbDrill(),
  'answer-verb-quiz':    (t) => answerVerbQuizMC(parseInt(t.dataset.idx, 10)),
  'submit-verb-quiz-mc': ()  => submitVerbQuizMC(),
  'submit-verb-quiz-fib':()  => submitVerbQuizFIB(),
  'next-verb-quiz':      ()  => nextVerbQuiz(),
  'show-verb-detail':    (t) => showVerbDetail(t.dataset.verb),
  'filter-verbs':        (t) => renderVerbBrowser(t.dataset.filter),
  'search-verbs':        ()  => renderVerbBrowser('all', document.getElementById('verb-search')?.value),
};

// Vocab
const VOCAB_HANDLERS = {
  'open-vocab-cat':            (t) => openVocabCategory(t.dataset.cat),
  'vocab-cat-more':            (t) => openVocabCategory(t.dataset.cat, parseInt(t.dataset.page, 10)),
  'start-vocab-learn':         ()  => startVocabLearn(),
  'start-vocab-quiz':          ()  => startVocabQuiz(),
  'start-quick-vocab':         ()  => startQuickVocab(),
  'start-learn-new':           ()  => startLearnNewWords(),
  'start-gender-quiz':         ()  => startGenderQuiz(),
  'flip-vocab-card':           ()  => flipVocabCard(),
  'rate-vocab':                (t) => rateVocab(parseInt(t.dataset.rating, 10)),
  'answer-vocab-quiz':         (t) => answerVocabQuizMC(parseInt(t.dataset.idx, 10)),
  'submit-vocab-quiz-mc':      ()  => _handleSubmitVocabQuizMC(),
  'submit-vocab-quiz-produce': ()  => submitVocabQuizProduce(),
  // insert-accent-vocq handled by unified accent handler
  'next-vocab-quiz':           ()  => _handleNextVocabQuiz(),
};

// Grammar
const GRAMMAR_HANDLERS = {
  'open-grammar-lesson':    (t) => openGrammarLesson(t.dataset.lesson),
  'start-grammar-quiz':     ()  => startGrammarQuiz(),
  'answer-grammar-quiz':    (t) => answerGrammarQuizMC(parseInt(t.dataset.idx, 10)),
  'submit-grammar-quiz-mc': ()  => submitGrammarQuizMC(),
  'submit-grammar-fib':     ()  => submitGrammarFIB(),
  'next-grammar-quiz':      ()  => nextGrammarQuiz(),
};

// Phrases
const PHRASE_HANDLERS = {
  'open-phrase-sit':       (t) => openPhraseSituation(t.dataset.sit),
  'start-phrase-learn':    ()  => startPhraseLearn(),
  'start-phrase-quiz':     ()  => startPhraseQuiz(),
  'answer-phrase-quiz':    (t) => answerPhraseQuizMC(parseInt(t.dataset.idx, 10)),
  'submit-phrase-quiz-mc': ()  => submitPhraseQuizMC(),
  'next-phrase-quiz':      ()  => nextPhraseQuiz(),
  'flip-phrase-card':      ()  => flipPhraseCard(),
  'rate-phrase':           (t) => ratePhrase(parseInt(t.dataset.rating, 10)),
};

// Culture
const CULTURE_HANDLERS = {
  'open-culture':            (t) => openCultureModule(t.dataset.module),
  'open-culture-item':       (t) => openCultureItem(t.dataset.id),
  'start-culture-quiz':      ()  => startCultureQuiz(),
  'start-dialogue-practice': ()  => startDialoguePractice(),
  'answer-dialogue':         (t) => answerDialogueMC(parseInt(t.dataset.idx, 10)),
  'submit-dialogue-mc':      ()  => submitDialogueMC(),
  'next-dialogue':           ()  => nextDialogue(),
  'answer-culture-quiz':     (t) => answerCultureQuizMC(parseInt(t.dataset.idx, 10)),
  'submit-culture-quiz-mc':  ()  => submitCultureQuizMC(),
  'next-culture-quiz':       ()  => nextCultureQuiz(),
};

// Undo last flashcard rating
const UNDO_HANDLERS = {
  'undo-last-rating': () => undoLastRating(),
};

// Results
const RESULTS_HANDLERS = {
  'results-retry': () => goBack(),
  'results-home':  () => switchTab('today'),
};

// Review
const REVIEW_HANDLERS = {
  'start-review':       ()  => startReview(),
  'answer-review':      (t) => answerReviewMC(parseInt(t.dataset.idx, 10)),
  'submit-review-mc':   ()  => submitReviewMC(),
  'rate-review':        (t) => rateReviewItem(parseInt(t.dataset.rating, 10)),
  'next-review':        ()  => nextReviewItem(),
  'check-review-drill': ()  => checkReviewDrill(),
  'flip-review-card':   ()  => flipReviewCard(),
  // insert-accent-rev handled by unified accent handler
};

// Stats / Progress Dashboard
const STATS_HANDLERS = {
  'open-stats':        ()  => { showScreen('stats'); renderStats(); },
  'share-progress':    ()  => generateShareCard(),
  'close-share':       ()  => { document.getElementById('share-overlay').classList.remove('open'); },
  'download-share':    ()  => downloadShareCard(),
  'native-share':      ()  => nativeShareCard(),
  'start-weak-review': ()  => startWeakReview(),
};

// Placement Test
const PLACEMENT_HANDLERS = {
  'start-placement':      ()  => startPlacementTest(),
  'answer-placement':     (t) => answerPlacementMC(parseInt(t.dataset.idx, 10)),
  'submit-placement-mc':  ()  => submitPlacementMC(),
  'submit-placement-fib': ()  => submitPlacementFIB(),
  'next-placement':       ()  => nextPlacementQuestion(),
  'placement-done':       ()  => switchTab('today'),
  'show-learning-plan':   ()  => showLearningPlan(),
  'learning-plan-start':  ()  => closeLearningPlan(),
  'retake-placement':     ()  => startPlacementTest(),
  'start-placement-at':   (t) => showPlacementModeSelection(t.dataset.level),
  'start-placement-mode': (t) => startPlacementAt(t.dataset.level, t.dataset.mode),
  'end-placement-early':  ()  => { if (placementIdx >= 5) finishPlacementTest(); },
  'pt-set-length':        (t) => _handlePtSetLength(t),
};

// Practice exercises
const PRACTICE_HANDLERS = {
  'open-minimal-pairs':        ()  => { showScreen('minimal-pairs'); renderMinimalPairCategories(); },
  'start-mp':                  (t) => startMinimalPairs(t.dataset.cat || t.closest('[data-cat]')?.dataset.cat),
  'answer-mp':                 (t) => answerMP(parseInt(t.dataset.idx, 10)),
  'next-mp':                   ()  => nextMP(),
  'open-phonetic-pairs':       ()  => { showScreen('phonetic-pairs'); renderPhoneticPairCategories(); },
  'start-pp':                  (t) => startPhoneticPairs(t.dataset.cat || t.closest('[data-cat]')?.dataset.cat),
  'answer-pp':                 (t) => answerPP(parseInt(t.dataset.idx, 10)),
  'next-pp':                   ()  => nextPP(),
  'open-homophones':           ()  => { showScreen('homophones'); renderHomophoneCategories(); },
  'start-hom':                 (t) => startHomophones(t.dataset.cat || t.closest('[data-cat]')?.dataset.cat),
  'answer-hom':                (t) => answerHom(parseInt(t.dataset.idx, 10)),
  'next-hom':                  ()  => nextHom(),
  'open-connectors':           ()  => { showScreen('connectors'); renderConnectorCategories(); },
  'start-conn':                (t) => startConnectors(t.dataset.cat || t.closest('[data-cat]')?.dataset.cat),
  'answer-conn':               (t) => answerConn(parseInt(t.dataset.idx, 10)),
  'next-conn':                 ()  => nextConn(),
  'open-sentence-build-topics':()  => startSentenceBuild(),
  'tap-sb-word':               (t) => tapSBWord(t),
  'check-sentence-build':      ()  => checkSentenceBuild(),
  'next-sentence-build':       ()  => nextSentenceBuild(),
  'open-cloze-topics':         ()  => { showScreen('cloze-topics'); renderClozeTopics(); },
  'start-cloze':               (t) => startCloze(t.dataset.topic || t.closest('[data-topic]')?.dataset.topic),
  'check-cloze':               ()  => checkCloze(),
  'next-cloze':                ()  => nextCloze(),
  'open-translation-topics':   ()  => startTranslation(),
  'check-translation':         ()  => checkTranslation(),
  'next-translation':          ()  => nextTranslation(),
  'open-dictation':            ()  => startDictation(),
  'dict-play':                 ()  => dictPlayNormal(),
  'dict-play-slow':            ()  => dictPlaySlow(),
  'check-dictation':           ()  => checkDictation(),
  'next-dictation':            ()  => nextDictation(),
};

// Verb Reference
const VREF_HANDLERS = {
  'open-verb-reference': ()  => showScreen('verb-reference'),
  'select-vref':         (t) => renderVerbReference(t.dataset.verb),
  'vref-tab':            (t) => _handleVrefTab(t),
};

// Pronunciation Guide
const PRONUNCIATION_HANDLERS = {
  'open-pronunciation': () => { showScreen('pronunciation'); renderPronunciation(); },
};

// Reading Comprehension
const READING_HANDLERS = {
  'open-reading':        ()  => { showScreen('reading-list'); renderReadingList(); },
  'filter-reading':      (t) => renderReadingList(t.dataset.filter),
  'filter-reading-type': (t) => _handleFilterReadingType(t),
  'start-reading':       (t) => startReading(t.dataset.id || t.closest('[data-id]')?.dataset.id),
  'answer-reading':      (t) => answerReadingMC(parseInt(t.dataset.idx, 10)),
  'submit-reading-mc':   ()  => submitReadingMC(),
  'next-reading':        ()  => nextReading(),
  'toggle-listen-mode':  ()  => _handleToggleListenMode(),
};

// Themed Vocabulary
const THEMED_VOCAB_HANDLERS = {
  'open-themed-vocab':     ()  => { showScreen('themed-vocab'); renderThemedVocabList(); },
  'open-themed-detail':    (t) => openThemedDetail(t.dataset.id || t.closest('[data-id]')?.dataset.id),
  'start-themed-quiz':     ()  => startThemedQuiz(),
  'answer-themed-quiz':    (t) => answerThemedQuizMC(parseInt(t.dataset.idx, 10)),
  'submit-themed-quiz-mc': ()  => submitThemedQuizMC(),
  'next-themed-quiz':      ()  => nextThemedQuiz(),
};

// CEFR Curriculum
const CURRICULUM_HANDLERS = {
  'open-curriculum':       ()  => { renderCurriculumOverview(); showScreen('curriculum'); },
  'open-curriculum-level': (t) => { renderCurriculumLevel(t.dataset.level || t.closest('[data-level]')?.dataset.level); showScreen('curriculum-level'); },
};

// Curriculum Tracks
const TRACK_HANDLERS = {
  'open-tracks':         ()  => { renderTrackList(); showScreen('tracks'); },
  'open-track-detail':   (t) => openTrackDetail(t.dataset.id || t.closest('[data-id]')?.dataset.id),
  'launch-track-module': (t) => _handleLaunchTrackModule(t),
};

// Verb + Prepositions
const VERB_PREPS_HANDLERS = {
  'open-verb-preps': ()  => { showScreen('verb-preps'); if (typeof renderVerbPreps === 'function') renderVerbPreps(); },
  'start-vp-quiz':   ()  => { if (typeof startVerbPrepsQuiz === 'function') startVerbPrepsQuiz(); },
  'answer-vp-quiz':  (t) => { if (typeof answerVPQuizMC === 'function') answerVPQuizMC(parseInt(t.dataset.idx, 10)); },
  'next-vp-quiz':    ()  => { if (typeof nextVPQuiz === 'function') nextVPQuiz(); },
};

// Subjunctive Triggers
const SUBJ_HANDLERS = {
  'open-subjunctive-triggers': ()  => { showScreen('subjunctive-triggers'); if (typeof renderSubjunctiveTriggers === 'function') renderSubjunctiveTriggers(); },
  'start-subj-quiz':           ()  => { if (typeof startSubjunctiveQuiz === 'function') startSubjunctiveQuiz(); },
  'answer-subj-quiz':          (t) => { if (typeof answerSubjQuizMC === 'function') answerSubjQuizMC(parseInt(t.dataset.idx, 10)); },
  'next-subj-quiz':            ()  => { if (typeof nextSubjQuiz === 'function') nextSubjQuiz(); },
};

// Writing Prompts
const WRITING_HANDLERS = {
  'open-writing-prompts': ()  => { showScreen('writing-prompts'); if (typeof renderWritingPromptsList === 'function') renderWritingPromptsList(); },
  'start-writing':        (t) => { if (typeof startWritingExercise === 'function') startWritingExercise(t.dataset.id || t.closest('[data-id]')?.dataset.id); },
  'show-writing-sample':  ()  => { if (typeof showWritingSample === 'function') showWritingSample(); },
};

// Comparative Grammar
const COMP_GRAMMAR_HANDLERS = {
  'open-comparative-grammar': ()  => { showScreen('comparative-grammar'); if (typeof renderComparativeGrammarList === 'function') renderComparativeGrammarList(); },
  'open-comparative-detail':  (t) => { if (typeof openComparativeDetail === 'function') openComparativeDetail(t.dataset.id || t.closest('[data-id]')?.dataset.id); },
};

// Number Practice
const NUMBER_HANDLERS = {
  'start-number-learn': ()  => { showScreen('number-learn'); if (typeof renderNumberLearn === 'function') renderNumberLearn(); },
  'start-number-quiz':  ()  => { showScreen('number-quiz'); if (typeof startNumberQuiz === 'function') startNumberQuiz(); },
  'answer-number-quiz': (t) => { if (typeof answerNumberQuizMC === 'function') answerNumberQuizMC(parseInt(t.dataset.idx, 10)); },
  'check-number-quiz':  ()  => { if (typeof checkNumberQuiz === 'function') checkNumberQuiz(); },
  'next-number-quiz':   ()  => { if (typeof nextNumberQuiz === 'function') nextNumberQuiz(); },
  'start-time-quiz':    ()  => { showScreen('time-quiz'); if (typeof startTimeQuiz === 'function') startTimeQuiz(); },
  'answer-time-quiz':   (t) => { if (typeof answerTimeQuizMC === 'function') answerTimeQuizMC(parseInt(t.dataset.idx, 10)); },
  'next-time-quiz':     ()  => { if (typeof nextTimeQuiz === 'function') nextTimeQuiz(); },
};

// TTS
const TTS_HANDLERS = {
  'speak': (t) => speak(t.dataset.text),
};

// ── Merged action handler map ──
const ACTION_HANDLERS = Object.assign({},
  NAV_HANDLERS,
  PROFILE_HANDLERS,
  MODAL_HANDLERS,
  BOOKMARK_HANDLERS,
  SETTINGS_HANDLERS,
  ADMIN_HANDLERS,
  DAILY_HANDLERS,
  VERB_HANDLERS,
  VOCAB_HANDLERS,
  GRAMMAR_HANDLERS,
  PHRASE_HANDLERS,
  CULTURE_HANDLERS,
  UNDO_HANDLERS,
  RESULTS_HANDLERS,
  REVIEW_HANDLERS,
  STATS_HANDLERS,
  PLACEMENT_HANDLERS,
  PRACTICE_HANDLERS,
  VREF_HANDLERS,
  PRONUNCIATION_HANDLERS,
  READING_HANDLERS,
  THEMED_VOCAB_HANDLERS,
  CURRICULUM_HANDLERS,
  TRACK_HANDLERS,
  VERB_PREPS_HANDLERS,
  SUBJ_HANDLERS,
  WRITING_HANDLERS,
  COMP_GRAMMAR_HANDLERS,
  NUMBER_HANDLERS,
  TTS_HANDLERS
);

document.addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (!target) {
    closeDropdowns();
    return;
  }
  const action = target.dataset.action;

  // Unified accent insertion — check prefix match for all insert-accent-* actions
  if (action.startsWith('insert-accent')) {
    _handleInsertAccent(target, action);
    return;
  }

  const handler = ACTION_HANDLERS[action];
  if (handler) handler(target, e);
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
      const num = parseInt(e.key, 10);
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
      <div class="card" data-action="open-grammar-lesson" data-lesson="${g.id}" style="padding:0.5rem 0.75rem;text-align:left">
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
  'homophones.js', 'connectors.js',
  'verb_prepositions.js', 'subjunctive_triggers.js', 'writing_prompts.js',
  'comparative_grammar.js', 'number_practice.js', 'feature-modules.js'
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

    // Load supplementary A1-A2 vocab (non-critical — silently skip if missing)
    fetch('vocab-a1a2-extra.json').then(r => {
      if (!r.ok) return [];
      return r.json();
    }).then(extra => {
      if (extra && extra.length) {
        window.VOCAB_DATA = window.VOCAB_DATA.concat(extra);
        if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
        _updateVocabWorker();
      }
    }).catch(() => {});

    // Then load remaining levels in parallel for faster loading
    const remaining = ['vocab-b1.json', 'vocab-b2.json', 'vocab-c1.json', 'vocab-c2.json'];
    return Promise.all(remaining.map(file => fetch(file).then(r => r.json())))
      .then(chunks => {
        for (const chunk of chunks) {
          window.VOCAB_DATA = window.VOCAB_DATA.concat(chunk);
        }
        if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
        _updateVocabWorker();
      });
  }).then(() => {
    // Cache the full dataset in IndexedDB
    _idbPut(_IDB_VOCAB_KEY, window.VOCAB_DATA).catch(() => {
      // IndexedDB cache write failed — non-critical, vocab still works from memory
    });
  }).catch(() => {
    // Fallback: try loading the monolithic file
    fetch('vocab-data.json').then(r => r.json()).then(data => {
      window.VOCAB_DATA = data;
      if (typeof buildVocabIndexes === 'function') buildVocabIndexes();
      _updateVocabWorker();
    }).catch(err => {
      console.warn('Failed to load vocab data:', err);
      if (typeof showErrorState === 'function') {
        showErrorState('vocab-categories', 'Could not load vocabulary data. Check your connection and try again.', 'switch-tab');
      }
    });
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
  // Check for data version changes to invalidate stale caches
  if (typeof checkDataVersion === 'function') checkDataVersion();
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
  // Gray out / restore TTS buttons when offline/online
  const ttsButtons = document.querySelectorAll('[data-action="speak"], .tts-btn, .tts-inline');
  ttsButtons.forEach(btn => btn.classList.toggle('offline-disabled', !isOnline));
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
