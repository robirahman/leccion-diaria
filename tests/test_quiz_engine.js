'use strict';

const fs = require('fs');
const vm = require('vm');
const root = require('path').join(__dirname, '..');

const quizEngineCode = fs.readFileSync(root + '/quiz-engine.js', 'utf8');

// Minimal DOM mock that tracks state for testing
function makeMockDOM() {
  const elements = {};
  const queries = {};

  function makeElement(id) {
    return {
      id: id || '',
      style: {},
      innerHTML: '',
      textContent: '',
      className: '',
      dataset: {},
      classList: {
        _classes: new Set(),
        add: function (c) { this._classes.add(c); },
        remove: function (c) { this._classes.delete(c); },
        contains: function (c) { return this._classes.has(c); },
      },
      appendChild: function () {},
      focus: function () {},
    };
  }

  return {
    getElementById: function (id) {
      if (!elements[id]) elements[id] = makeElement(id);
      return elements[id];
    },
    querySelector: function (sel) {
      return queries[sel] || null;
    },
    querySelectorAll: function (sel) {
      return queries[sel + '[]'] || [];
    },
    createElement: function () { return makeElement(); },
    // Test helpers to wire up query results
    _setQuery: function (sel, el) { queries[sel] = el; },
    _setQueryAll: function (sel, arr) { queries[sel + '[]'] = arr; },
    _getElement: function (id) { return elements[id]; },
    _elements: elements,
  };
}

function buildContext() {
  const mockDoc = makeMockDOM();
  const ctx = vm.createContext({
    console, Math, Object, Array, JSON, parseInt, parseFloat,
    String, Number, Boolean, Error, RegExp,
    setTimeout, clearTimeout,
    document: mockDoc,
    navigator: { vibrate: function () {} },
    // Stubs for globals referenced by processMCSubmit
    FSRS_GOOD: 3,
    FSRS_AGAIN: 1,
    reviewItem: function () {},
    saveProgress: function () {},
  });
  vm.runInContext(quizEngineCode, ctx);
  vm.runInContext(`
    this.createQuizFlow = createQuizFlow;
    this.processMCSubmit = processMCSubmit;
    this.accentBarHTML = accentBarHTML;
    this.progressBarHTML = progressBarHTML;
  `, ctx);
  return { ctx, mockDoc };
}


// ═══════════════════════════════════════════════════════════
//  Tests
// ═══════════════════════════════════════════════════════════

describe('createQuizFlow API', () => {
  it('returns an object with expected methods', () => {
    const { ctx } = buildContext();
    const flow = ctx.createQuizFlow({
      containerId: 'c', nextBtnId: 'n',
    });
    assert(typeof flow.start === 'function', 'should have start');
    assert(typeof flow.render === 'function', 'should have render');
    assert(typeof flow.selectOption === 'function', 'should have selectOption');
    assert(typeof flow.submit === 'function', 'should have submit');
    assert(typeof flow.next === 'function', 'should have next');
    assert(typeof flow.getState === 'function', 'should have getState');
  });
});

describe('createQuizFlow getState after start', () => {
  it('returns correct initial values', () => {
    const { ctx } = buildContext();
    const flow = ctx.createQuizFlow({
      containerId: 'c', nextBtnId: 'n',
    });
    const items = [
      { prompt: 'Q1', options: ['a', 'b', 'c', 'd'], answer: 'a' },
      { prompt: 'Q2', options: ['a', 'b', 'c', 'd'], answer: 'b' },
      { prompt: 'Q3', options: ['a', 'b', 'c', 'd'], answer: 'c' },
    ];
    flow.start(items);
    const state = flow.getState();
    assertEqual(state.idx, 0, 'idx should be 0');
    assertEqual(state.score, 0, 'score should be 0');
    assertEqual(state.total, 3, 'total should be 3');
    assertEqual(state.queue.length, 3, 'queue should have 3 items');
  });
});

describe('createQuizFlow score tracking', () => {
  // Helper: build a flow that can process submissions via mocked DOM
  function buildTestFlow() {
    const { ctx, mockDoc } = buildContext();
    const completions = [];

    const flow = ctx.createQuizFlow({
      containerId: 'quiz',
      nextBtnId: 'next-btn',
      getCorrectIdx: function (q) { return q.correctIdx; },
      onComplete: function (score, total) { completions.push({ score, total }); },
    });

    // Wire up mock option buttons for submit
    function setupMockButtons(selectedIdx, totalOptions) {
      const btns = [];
      for (let i = 0; i < totalOptions; i++) {
        const btn = {
          dataset: { idx: String(i) },
          textContent: 'opt' + i,
          classList: {
            _classes: new Set(),
            add: function (c) { this._classes.add(c); },
            remove: function (c) { this._classes.delete(c); },
            contains: function (c) { return this._classes.has(c); },
          },
        };
        if (i === selectedIdx) btn.classList.add('selected');
        btns.push(btn);
      }
      mockDoc._setQuery('#quiz .quiz-option.selected', btns[selectedIdx]);
      mockDoc._setQueryAll('#quiz .quiz-option', btns);
      mockDoc._setQuery('#quiz .mc-submit', { style: {} });
      return btns;
    }

    return { flow, ctx, mockDoc, completions, setupMockButtons };
  }

  it('increments score on correct answer', () => {
    const { flow, setupMockButtons } = buildTestFlow();
    flow.start([
      { prompt: 'Q1', correctIdx: 2 },
      { prompt: 'Q2', correctIdx: 0 },
    ]);
    // Select correct answer (idx 2)
    setupMockButtons(2, 4);
    flow.submit();
    assertEqual(flow.getState().score, 1, 'Score should be 1 after correct answer');
  });

  it('does not increment score on incorrect answer', () => {
    const { flow, setupMockButtons } = buildTestFlow();
    flow.start([
      { prompt: 'Q1', correctIdx: 2 },
      { prompt: 'Q2', correctIdx: 0 },
    ]);
    // Select wrong answer (idx 0, correct is 2)
    setupMockButtons(0, 4);
    flow.submit();
    assertEqual(flow.getState().score, 0, 'Score should be 0 after incorrect answer');
  });

  it('idx advances on next()', () => {
    const { flow } = buildTestFlow();
    flow.start([
      { prompt: 'Q1', correctIdx: 0 },
      { prompt: 'Q2', correctIdx: 1 },
      { prompt: 'Q3', correctIdx: 2 },
    ]);
    assertEqual(flow.getState().idx, 0);
    flow.next();
    assertEqual(flow.getState().idx, 1, 'idx should be 1 after first next()');
    flow.next();
    assertEqual(flow.getState().idx, 2, 'idx should be 2 after second next()');
  });

  it('onComplete fires when all questions done', () => {
    const { flow, completions, setupMockButtons } = buildTestFlow();
    flow.start([
      { prompt: 'Q1', correctIdx: 0 },
    ]);
    // Answer and advance past the last question
    setupMockButtons(0, 4);
    flow.submit();
    flow.next(); // idx becomes 1, triggers render which calls onComplete
    assertEqual(completions.length, 1, 'onComplete should have fired once');
    assertEqual(completions[0].score, 1, 'Final score should be 1');
    assertEqual(completions[0].total, 1, 'Total should be 1');
  });
});

describe('processMCSubmit', () => {
  it('returns false when no option is selected', () => {
    const { ctx, mockDoc } = buildContext();
    // No selected button
    mockDoc._setQuery('#test .quiz-option', null);
    const result = ctx.processMCSubmit({
      optionsSel: '#test .quiz-option',
      isCorrectBtn: function () { return false; },
      feedbackId: 'fb',
      nextBtnId: 'next',
    });
    assertEqual(result, false, 'Should return false when no selection');
  });

  it('returns boolean based on correctness', () => {
    const { ctx, mockDoc } = buildContext();
    const selectedBtn = {
      dataset: {},
      classList: {
        _classes: new Set(['selected']),
        add: function (c) { this._classes.add(c); },
        remove: function (c) { this._classes.delete(c); },
        contains: function (c) { return this._classes.has(c); },
      },
    };
    mockDoc._setQuery('#test .quiz-option.selected', selectedBtn);
    mockDoc._setQueryAll('#test .quiz-option', [selectedBtn]);
    const result = ctx.processMCSubmit({
      optionsSel: '#test .quiz-option',
      isCorrectBtn: function (btn) { return btn === selectedBtn; },
      feedbackId: 'fb',
      nextBtnId: 'next',
    });
    assertEqual(result, true, 'Should return true for correct answer');
  });
});

describe('accentBarHTML', () => {
  it('generates HTML with all Spanish accent characters', () => {
    const { ctx } = buildContext();
    const html = ctx.accentBarHTML('insert-accent', 'my-input');
    const chars = ['\u00e1', '\u00e9', '\u00ed', '\u00f3', '\u00fa', '\u00f1'];
    for (const c of chars) {
      assert(html.includes(c), `Should contain accent character "${c}"`);
    }
    assert(html.includes('accent-bar'), 'Should have accent-bar class');
    assert(html.includes('insert-accent'), 'Should have the action');
    assert(html.includes('my-input'), 'Should reference input id');
  });

  it('generates 6 accent buttons', () => {
    const { ctx } = buildContext();
    const html = ctx.accentBarHTML('insert-accent', 'inp');
    const count = (html.match(/accent-btn/g) || []).length;
    assertEqual(count, 6, `Should have 6 accent buttons, got ${count}`);
  });
});

describe('progressBarHTML', () => {
  it('generates correct percentage for 50%', () => {
    const { ctx } = buildContext();
    const html = ctx.progressBarHTML(5, 10, 'bar-fill');
    assert(html.includes('50%'), 'Should contain 50%');
    assert(html.includes('bar-fill'), 'Should contain fill id');
    assert(html.includes('aria-valuenow="50"'), 'Should have correct aria value');
  });

  it('generates 0% when total is 0', () => {
    const { ctx } = buildContext();
    const html = ctx.progressBarHTML(0, 0);
    assert(html.includes('0%'), 'Should contain 0%');
  });

  it('generates 100% when current equals total', () => {
    const { ctx } = buildContext();
    const html = ctx.progressBarHTML(8, 8);
    assert(html.includes('100%'), 'Should contain 100%');
    assert(html.includes('aria-valuenow="100"'), 'Should have aria-valuenow=100');
  });

  it('rounds percentage correctly', () => {
    const { ctx } = buildContext();
    const html = ctx.progressBarHTML(1, 3);
    // 1/3 = 33.333...% — aria-valuenow should round to 33
    assert(html.includes('aria-valuenow="33"'), 'Should round 33.3% to 33');
  });
});
