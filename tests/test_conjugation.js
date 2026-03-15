'use strict';

const fs = require('fs');
const vm = require('vm');
const root = require('path').join(__dirname, '..');

// Load verbs and conjugation engine into a shared context
// Use a wrapper to export const declarations to the context
const ctx = vm.createContext({ console, Math, Object });
vm.runInContext(fs.readFileSync(root + '/verbs.js', 'utf8'), ctx);
vm.runInContext(fs.readFileSync(root + '/conjugation.js', 'utf8'), ctx);
// const declarations aren't added to context — extract via eval
vm.runInContext('this.VERB_DATA = VERB_DATA; this.TENSES = TENSES; this.PERSONS = PERSONS; this.TENSE_META = TENSE_META;', ctx);

const { conjugate, conjugateAll, PERSONS, TENSES, TENSE_META, VERB_DATA } = ctx;

// Person indices: yo=0, tu=1, el=2, nosotros=3, vosotros=4, ellos=5

describe('Conjugation Engine', () => {
  it('conjugates regular -ar verbs in present tense', () => {
    assertEqual(conjugate('hablar', 'present', 0), 'hablo');
    assertEqual(conjugate('hablar', 'present', 1), 'hablas');
    assertEqual(conjugate('hablar', 'present', 2), 'habla');
    assertEqual(conjugate('hablar', 'present', 3), 'hablamos');
    assertEqual(conjugate('hablar', 'present', 5), 'hablan');
  });

  it('conjugates regular -er verbs in present tense', () => {
    assertEqual(conjugate('comer', 'present', 0), 'como');
    assertEqual(conjugate('comer', 'present', 1), 'comes');
    assertEqual(conjugate('comer', 'present', 2), 'come');
  });

  it('conjugates regular -ir verbs in present tense', () => {
    assertEqual(conjugate('vivir', 'present', 0), 'vivo');
    assertEqual(conjugate('vivir', 'present', 3), 'vivimos');
  });

  it('conjugates ser (highly irregular)', () => {
    assertEqual(conjugate('ser', 'present', 0), 'soy');
    assertEqual(conjugate('ser', 'present', 1), 'eres');
    assertEqual(conjugate('ser', 'present', 2), 'es');
    assertEqual(conjugate('ser', 'preterite', 0), 'fui');
    assertEqual(conjugate('ser', 'imperfect', 0), 'era');
  });

  it('conjugates estar', () => {
    assertEqual(conjugate('estar', 'present', 0), 'estoy');
    assertEqual(conjugate('estar', 'present', 1), 'estás');
    assertEqual(conjugate('estar', 'preterite', 0), 'estuve');
  });

  it('conjugates ir', () => {
    assertEqual(conjugate('ir', 'present', 0), 'voy');
    assertEqual(conjugate('ir', 'preterite', 0), 'fui');
  });

  it('conjugates tener (irregular stem + go-verb)', () => {
    assertEqual(conjugate('tener', 'present', 0), 'tengo');
    assertEqual(conjugate('tener', 'present', 1), 'tienes');
    assertEqual(conjugate('tener', 'future', 0), 'tendré');
  });

  it('conjugates hacer', () => {
    assertEqual(conjugate('hacer', 'present', 0), 'hago');
    assertEqual(conjugate('hacer', 'preterite', 0), 'hice');
    assertEqual(conjugate('hacer', 'future', 0), 'haré');
  });

  it('conjugates stem-changing e→ie verbs (pensar)', () => {
    assertEqual(conjugate('pensar', 'present', 0), 'pienso');
    assertEqual(conjugate('pensar', 'present', 1), 'piensas');
    assertEqual(conjugate('pensar', 'present', 3), 'pensamos'); // no change in nosotros
  });

  it('conjugates stem-changing o→ue verbs (poder)', () => {
    assertEqual(conjugate('poder', 'present', 0), 'puedo');
    assertEqual(conjugate('poder', 'present', 3), 'podemos');
  });

  it('handles preterite tense', () => {
    assertEqual(conjugate('hablar', 'preterite', 0), 'hablé');
    assertEqual(conjugate('comer', 'preterite', 0), 'comí');
    assertEqual(conjugate('vivir', 'preterite', 0), 'viví');
  });

  it('handles imperfect tense', () => {
    assertEqual(conjugate('hablar', 'imperfect', 0), 'hablaba');
    assertEqual(conjugate('comer', 'imperfect', 0), 'comía');
    assertEqual(conjugate('ser', 'imperfect', 0), 'era');
    assertEqual(conjugate('ir', 'imperfect', 0), 'iba');
  });

  it('handles future tense (regular)', () => {
    assertEqual(conjugate('hablar', 'future', 0), 'hablaré');
    assertEqual(conjugate('comer', 'future', 0), 'comeré');
  });

  it('handles compound tenses (present perfect)', () => {
    assertEqual(conjugate('hablar', 'present_perfect', 0), 'he hablado');
    assertEqual(conjugate('comer', 'present_perfect', 0), 'he comido');
    assertEqual(conjugate('vivir', 'present_perfect', 0), 'he vivido');
    assertEqual(conjugate('hacer', 'present_perfect', 0), 'he hecho');
    assertEqual(conjugate('escribir', 'present_perfect', 0), 'he escrito');
  });

  it('handles reflexive verbs', () => {
    assertEqual(conjugate('levantarse', 'present', 0), 'me levanto');
  });

  it('returns a string for every verb × tense × person combination', () => {
    let failures = 0;
    const sampleVerbs = ['hablar', 'comer', 'vivir', 'ser', 'estar', 'ir', 'tener', 'hacer', 'poder', 'decir'];
    for (const verb of sampleVerbs) {
      for (const tense of TENSES) {
        for (let p = 0; p < PERSONS.length; p++) {
          const result = conjugate(verb, tense, p);
          if (typeof result !== 'string' || result.length === 0) {
            failures++;
            if (failures <= 3) console.log(`      FAIL: ${verb} ${tense} ${PERSONS[p]} = ${JSON.stringify(result)}`);
          }
        }
      }
    }
    assertEqual(failures, 0, `${failures} verb/tense/person combos returned empty`);
  });
});

describe('Verb Data', () => {
  it('has at least 200 verbs', () => {
    assert(VERB_DATA.length >= 200, `Only ${VERB_DATA.length} verbs`);
  });

  it('every verb has required fields', () => {
    let bad = 0;
    for (const v of VERB_DATA) {
      if (!v.infinitive || !v.type || !v.group || !v.level) {
        bad++;
        if (bad <= 3) console.log(`      BAD: ${JSON.stringify(v).slice(0, 80)}`);
      }
    }
    assertEqual(bad, 0, `${bad} verbs missing required fields`);
  });

  it('verb groups are ar/er/ir', () => {
    const validGroups = new Set(['ar', 'er', 'ir']);
    const bad = VERB_DATA.filter(v => !validGroups.has(v.group));
    assertEqual(bad.length, 0, `${bad.length} verbs have invalid group`);
  });
});
