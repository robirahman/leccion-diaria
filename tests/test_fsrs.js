'use strict';

const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync(require('path').join(__dirname, '..', 'fsrs.js'), 'utf8');
const ctx = vm.createContext({ Math, Error });
vm.runInContext(code, ctx);
// Export const declarations
vm.runInContext('this.FSRS_W = FSRS_W; this.FSRS_AGAIN = FSRS_AGAIN; this.FSRS_HARD = FSRS_HARD; this.FSRS_GOOD = FSRS_GOOD; this.FSRS_EASY = FSRS_EASY;', ctx);

const { fsrsInitS, fsrsInitD, fsrsR, fsrsSAfterRecall, fsrsSAfterForgetting, fsrsNextD, masteryFromFsrs,
        FSRS_AGAIN, FSRS_HARD, FSRS_GOOD, FSRS_EASY, FSRS_W } = ctx;

describe('FSRS-4.5', () => {
  it('has 17 weight parameters', () => {
    assertEqual(FSRS_W.length, 17);
  });

  it('fsrsInitS returns positive stability for all ratings', () => {
    for (let r = 1; r <= 4; r++) {
      assert(fsrsInitS(r) > 0, `Rating ${r} should give positive stability`);
    }
  });

  it('fsrsInitD returns difficulty between 1 and 10', () => {
    for (let r = 1; r <= 4; r++) {
      const d = fsrsInitD(r);
      assert(d >= 1 && d <= 10, `Rating ${r}: difficulty ${d} out of range`);
    }
  });

  it('fsrsR returns ~1.0 at elapsed=0', () => {
    const r = fsrsR(5, 0);
    assertClose(r, 1.0, 0.001);
  });

  it('fsrsR decreases over time', () => {
    const r1 = fsrsR(5, 1);
    const r7 = fsrsR(5, 7);
    const r30 = fsrsR(5, 30);
    assert(r1 > r7 && r7 > r30, 'Recall should decrease over time');
    assert(r1 > 0 && r30 > 0, 'Recall should stay positive');
  });

  it('fsrsR is higher for higher stability', () => {
    assert(fsrsR(20, 10) > fsrsR(5, 10), 'Higher stability = better recall');
  });

  it('fsrsR is always in (0, 1]', () => {
    for (const s of [0.5, 1, 5, 20, 100]) {
      for (const d of [0, 1, 7, 30, 365]) {
        const r = fsrsR(s, d);
        assert(r > 0 && r <= 1, `fsrsR(${s}, ${d}) = ${r} out of range`);
      }
    }
  });

  it('fsrsSAfterRecall increases stability on GOOD', () => {
    const s = 5, d = 5, r = fsrsR(s, 3);
    const newS = fsrsSAfterRecall(d, s, r, FSRS_GOOD);
    assert(newS > s, `Stability should increase: ${newS} > ${s}`);
  });

  it('fsrsSAfterForgetting reduces stability', () => {
    const s = 10, d = 5, r = fsrsR(s, 15);
    const newS = fsrsSAfterForgetting(d, s, r);
    assert(newS < s, `Stability should decrease: ${newS} < ${s}`);
    assert(newS > 0, 'Stability should stay positive');
  });

  it('fsrsNextD adjusts difficulty based on rating', () => {
    const d = 5;
    const dAfterAgain = fsrsNextD(d, FSRS_AGAIN);
    const dAfterEasy = fsrsNextD(d, FSRS_EASY);
    // AGAIN should increase difficulty, EASY should decrease
    assert(dAfterAgain > dAfterEasy, `AGAIN (${dAfterAgain}) should give higher difficulty than EASY (${dAfterEasy})`);
  });

  it('fsrsNextD clamps to [1, 10]', () => {
    // Test extreme values
    for (const d of [1, 5, 10]) {
      for (const r of [FSRS_AGAIN, FSRS_EASY]) {
        const nd = fsrsNextD(d, r);
        assert(nd >= 1 && nd <= 10, `fsrsNextD(${d}, ${r}) = ${nd} out of range`);
      }
    }
  });

  it('masteryFromFsrs maps stability to correct levels', () => {
    assertEqual(masteryFromFsrs(0), 1);
    assertEqual(masteryFromFsrs(0.3), 1);
    assertEqual(masteryFromFsrs(3), 2);
    assertEqual(masteryFromFsrs(10), 3);
    assertEqual(masteryFromFsrs(25), 4);
    assertEqual(masteryFromFsrs(100), 4);
  });
});
