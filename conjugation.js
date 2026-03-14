// ════════════════════════════════════════
//  SPANISH CONJUGATION ENGINE
//  Ported from util.py and expanded to 14 tenses
// ════════════════════════════════════════

const PERSONS = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
const PERSON_LABELS = {
  yo: 'yo', tu: 'tú', el: 'él/ella/usted',
  nosotros: 'nosotros', vosotros: 'vosotros', ellos: 'ellos/ellas/ustedes'
};
const PERSON_LABELS_SHORT = {
  yo: 'yo', tu: 'tú', el: 'él', nosotros: 'nos.', vosotros: 'vos.', ellos: 'ellos'
};

// NOTE: The pretérito anterior (hube/hubiste/hubo/hubimos/hubisteis/hubieron + participle)
// is intentionally omitted from this app. It is archaic and virtually unused in modern
// Spanish, replaced by the pretérito indefinido or pluscuamperfecto in all contexts.

const TENSE_META = {
  present:             { label: 'Presente',              labelEn: 'Present',              level: 'A1', compound: false },
  preterite:           { label: 'Pretérito Indefinido',   labelEn: 'Preterite',            level: 'A2', compound: false },
  imperfect:           { label: 'Pretérito Imperfecto',   labelEn: 'Imperfect',            level: 'A2', compound: false },
  future:              { label: 'Futuro Simple',          labelEn: 'Future',               level: 'A2', compound: false },
  conditional:         { label: 'Condicional Simple',     labelEn: 'Conditional',           level: 'B1', compound: false },
  subjunctive_present: { label: 'Subjuntivo Presente',    labelEn: 'Present Subjunctive',   level: 'B1', compound: false },
  subjunctive_imperfect:{ label: 'Subjuntivo Imperfecto', labelEn: 'Imperfect Subjunctive', level: 'B2', compound: false },
  imperative_aff:      { label: 'Imperativo Afirmativo',  labelEn: 'Affirmative Imperative',level: 'A2', compound: false },
  imperative_neg:      { label: 'Imperativo Negativo',    labelEn: 'Negative Imperative',   level: 'B1', compound: false },
  present_perfect:     { label: 'Pretérito Perfecto',     labelEn: 'Present Perfect',       level: 'A2', compound: true, auxTense: 'present' },
  pluperfect:          { label: 'Pluscuamperfecto',       labelEn: 'Pluperfect',            level: 'B1', compound: true, auxTense: 'imperfect' },
  future_perfect:      { label: 'Futuro Perfecto',        labelEn: 'Future Perfect',        level: 'B2', compound: true, auxTense: 'future' },
  conditional_perfect: { label: 'Condicional Perfecto',   labelEn: 'Conditional Perfect',   level: 'B2', compound: true, auxTense: 'conditional' },
  subjunctive_perfect: { label: 'Subjuntivo Perfecto',    labelEn: 'Present Perfect Subj.', level: 'B2', compound: true, auxTense: 'subjunctive_present' },
  subjunctive_pluperfect: { label: 'Pluscuamperfecto del Subjuntivo', labelEn: 'Pluperfect Subjunctive', level: 'B2', compound: true, auxTense: 'subjunctive_imperfect' },
  progressive_present: { label: 'Presente Progresivo',  labelEn: 'Present Progressive',  level: 'A2', compound: false, progressive: true, auxTense: 'present' },
  progressive_preterite: { label: 'Pretérito Progresivo', labelEn: 'Preterite Progressive', level: 'B1', compound: false, progressive: true, auxTense: 'preterite' },
  progressive_imperfect: { label: 'Imperfecto Progresivo', labelEn: 'Imperfect Progressive', level: 'B1', compound: false, progressive: true, auxTense: 'imperfect' },
  future_subjunctive: { label: 'Futuro del Subjuntivo', labelEn: 'Future Subjunctive', level: 'C2', compound: false },
};
const TENSES = Object.keys(TENSE_META);
const SIMPLE_TENSES = TENSES.filter(t => !TENSE_META[t].compound);

// ── Regular endings (ported from util.py verb_endings) ──
const REGULAR_ENDINGS = {
  present: {
    ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
    er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
    ir: ['o', 'es', 'e', 'imos', 'ís', 'en'],
  },
  preterite: {
    ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
    er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
  },
  imperfect: {
    ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
    er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  },
  future: {
    ar: ['aré', 'arás', 'ará', 'aremos', 'aréis', 'arán'],
    er: ['eré', 'erás', 'erá', 'eremos', 'eréis', 'erán'],
    ir: ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán'],
  },
  conditional: {
    ar: ['aría', 'arías', 'aría', 'aríamos', 'aríais', 'arían'],
    er: ['ería', 'erías', 'ería', 'eríamos', 'eríais', 'erían'],
    ir: ['iría', 'irías', 'iría', 'iríamos', 'iríais', 'irían'],
  },
  subjunctive_present: {
    ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
    er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
    ir: ['a', 'as', 'a', 'amos', 'áis', 'an'],
  },
  subjunctive_imperfect: {
    ar: ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran'],
    er: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'],
    ir: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'],
  },
  subjunctive_imperfect_se: {
    ar: ['ase', 'ases', 'ase', 'ásemos', 'aseis', 'asen'],
    er: ['iese', 'ieses', 'iese', 'iésemos', 'ieseis', 'iesen'],
    ir: ['iese', 'ieses', 'iese', 'iésemos', 'ieseis', 'iesen'],
  },
  imperative_aff: {
    ar: ['—', 'a', 'e', 'emos', 'ad', 'en'],
    er: ['—', 'e', 'a', 'amos', 'ed', 'an'],
    ir: ['—', 'e', 'a', 'amos', 'id', 'an'],
  },
  imperative_neg: {
    ar: ['—', 'es', 'e', 'emos', 'éis', 'en'],
    er: ['—', 'as', 'a', 'amos', 'áis', 'an'],
    ir: ['—', 'as', 'a', 'amos', 'áis', 'an'],
  },
  future_subjunctive: {
    ar: ['are', 'ares', 'are', 'áremos', 'areis', 'aren'],
    er: ['iere', 'ieres', 'iere', 'iéremos', 'iereis', 'ieren'],
    ir: ['iere', 'ieres', 'iere', 'iéremos', 'iereis', 'ieren'],
  },
};

// ── Future/conditional use full infinitive as stem ──
const FUTURE_COND_ENDINGS = ['é', 'ás', 'á', 'emos', 'éis', 'án'];
const CONDITIONAL_ENDINGS = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];

// ── Irregular future/conditional stems ──
const IRREGULAR_FUTURE_STEMS = {
  caber: 'cabr', decir: 'dir', haber: 'habr', hacer: 'har',
  poder: 'podr', poner: 'pondr', querer: 'querr', saber: 'sabr',
  salir: 'saldr', tener: 'tendr', valer: 'valdr', venir: 'vendr',
  satisfacer: 'satisfar',
};

// ── Haber conjugation (for compound tenses) ──
const HABER = {
  present: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
  imperfect: ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
  future: ['habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán'],
  conditional: ['habría', 'habrías', 'habría', 'habríamos', 'habríais', 'habrían'],
  subjunctive_present: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
  subjunctive_imperfect: ['hubiera', 'hubieras', 'hubiera', 'hubiéramos', 'hubierais', 'hubieran'],
  subjunctive_imperfect_se: ['hubiese', 'hubieses', 'hubiese', 'hubiésemos', 'hubieseis', 'hubiesen'],
};

const ESTAR = {
  present: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
  preterite: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
  imperfect: ['estaba', 'estabas', 'estaba', 'estábamos', 'estabais', 'estaban'],
};

// ── Irregular past participles ──
const IRREGULAR_PARTICIPLES = {
  abrir: 'abierto', cubrir: 'cubierto', decir: 'dicho', escribir: 'escrito',
  freír: 'frito', hacer: 'hecho', imprimir: 'impreso', morir: 'muerto',
  poner: 'puesto', resolver: 'resuelto', romper: 'roto', satisfacer: 'satisfecho',
  ver: 'visto', volver: 'vuelto', devolver: 'devuelto', descubrir: 'descubierto',
  bendecir: 'bendecido', maldecir: 'maldecido',
  inscribir: 'inscrito', prescribir: 'prescrito',
};

// ── Compound verb resolution ──
// When a prefix is added to an irregular verb, the compound inherits irregularities.
// Longer suffixes listed first to prevent false matches.
const COMPOUND_BASES = [
  'poner', 'tener', 'venir', 'hacer', 'decir',
  'traer', 'ducir',
];
const COMPOUND_FUTURE_EXCEPTIONS = new Set([
  'predecir', 'contradecir', 'bendecir', 'maldecir',
]);

function resolveCompound(base) {
  for (const root of COMPOUND_BASES) {
    if (base.endsWith(root) && base.length > root.length) {
      const prefix = base.slice(0, base.length - root.length);
      const irregularKey = root === 'ducir' ? 'conducir' : root;
      return { prefix, root, irregularKey };
    }
  }
  return null;
}

function addImperativeAccent(word) {
  if (word.length <= 3) return word; // monosyllabic base, no accent needed
  const lastChar = word.slice(-1);
  if (/[aeiouns]/.test(lastChar)) {
    const accents = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
    return word.replace(/([aeiou])([^aeiou]*)$/, (m, v, rest) =>
      (accents[v] || v) + rest
    );
  }
  return word;
}

function getIrregularFutureStem(base) {
  if (IRREGULAR_FUTURE_STEMS[base]) return IRREGULAR_FUTURE_STEMS[base];
  if (COMPOUND_FUTURE_EXCEPTIONS.has(base)) return null;
  const compound = resolveCompound(base);
  if (compound && IRREGULAR_FUTURE_STEMS[compound.irregularKey]) {
    return compound.prefix + IRREGULAR_FUTURE_STEMS[compound.irregularKey];
  }
  return null;
}

// ── Stem-change patterns ──
// Affects present indicative (all except nosotros/vosotros) and present subjunctive
const STEM_CHANGE_MAP = {
  'e>ie': { from: 'e', to: 'ie' },
  'o>ue': { from: 'o', to: 'ue' },
  'e>i':  { from: 'e', to: 'i' },
  'u>ue': { from: 'u', to: 'ue' },
  'i>ie': { from: 'i', to: 'ie' },
};

// Which person indices get the stem change (boot pattern: all except nosotros/vosotros)
const BOOT_PERSONS = [0, 1, 2, 5]; // yo, tú, él, ellos

// ── Spelling change rules ──
function applySpellingChange(stem, group, ending) {
  const firstChar = ending.charAt(0);
  const lastChar = stem.slice(-1);
  // c -> qu before e (buscar -> busque)
  if (lastChar === 'c' && group === 'ar' && (firstChar === 'e')) return stem.slice(0, -1) + 'qu';
  // g -> gu before e (pagar -> pague)
  if (lastChar === 'g' && group === 'ar' && (firstChar === 'e')) return stem.slice(0, -1) + 'gu';
  // z -> c before e (empezar -> empiece)
  if (lastChar === 'z' && (firstChar === 'e')) return stem.slice(0, -1) + 'c';
  // g -> j before a,o (coger -> cojo)
  if (lastChar === 'g' && (group === 'er' || group === 'ir') && (firstChar === 'a' || firstChar === 'o')) return stem.slice(0, -1) + 'j';
  // gu -> gü before e (averiguar -> averigüe)
  if (stem.slice(-2) === 'gu' && group === 'ar' && firstChar === 'e') return stem.slice(0, -1) + 'ü';
  return stem;
}

// Apply stem change to last occurrence of the vowel in the stem
function applyStemChange(stem, pattern) {
  const { from, to } = STEM_CHANGE_MAP[pattern];
  const idx = stem.lastIndexOf(from);
  if (idx === -1) return stem;
  return stem.substring(0, idx) + to + stem.substring(idx + from.length);
}

// ── Fully irregular verb conjugation tables ──
const FULL_IRREGULARS = {
  ser: {
    present: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
    preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    imperfect: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
    subjunctive_present: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
    subjunctive_imperfect: ['fuera', 'fueras', 'fuera', 'fuéramos', 'fuerais', 'fueran'],
    subjunctive_imperfect_se: ['fuese', 'fueses', 'fuese', 'fuésemos', 'fueseis', 'fuesen'],
    future_subjunctive: ['fuere', 'fueres', 'fuere', 'fuéremos', 'fuereis', 'fueren'],
    imperative_aff: ['—', 'sé', 'sea', 'seamos', 'sed', 'sean'],
  },
  estar: {
    present: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
    preterite: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
    subjunctive_present: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
    subjunctive_imperfect: ['estuviera', 'estuvieras', 'estuviera', 'estuviéramos', 'estuvierais', 'estuvieran'],
    subjunctive_imperfect_se: ['estuviese', 'estuvieses', 'estuviese', 'estuviésemos', 'estuvieseis', 'estuviesen'],
    imperative_aff: ['—', 'está', 'esté', 'estemos', 'estad', 'estén'],
  },
  ir: {
    present: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
    preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
    imperfect: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
    subjunctive_present: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
    subjunctive_imperfect: ['fuera', 'fueras', 'fuera', 'fuéramos', 'fuerais', 'fueran'],
    subjunctive_imperfect_se: ['fuese', 'fueses', 'fuese', 'fuésemos', 'fueseis', 'fuesen'],
    future_subjunctive: ['fuere', 'fueres', 'fuere', 'fuéremos', 'fuereis', 'fueren'],
    imperative_aff: ['—', 've', 'vaya', 'vayamos', 'id', 'vayan'],
  },
  haber: {
    present: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
    preterite: ['hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron'],
    imperfect: ['había', 'habías', 'había', 'habíamos', 'habíais', 'habían'],
    subjunctive_present: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
    subjunctive_imperfect: ['hubiera', 'hubieras', 'hubiera', 'hubiéramos', 'hubierais', 'hubieran'],
    subjunctive_imperfect_se: ['hubiese', 'hubieses', 'hubiese', 'hubiésemos', 'hubieseis', 'hubiesen'],
    future_subjunctive: ['hubiere', 'hubieres', 'hubiere', 'hubiéremos', 'hubiereis', 'hubieren'],
  },
  tener: {
    present: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
    preterite: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
    subjunctive_present: ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan'],
    subjunctive_imperfect: ['tuviera', 'tuvieras', 'tuviera', 'tuviéramos', 'tuvierais', 'tuvieran'],
    subjunctive_imperfect_se: ['tuviese', 'tuvieses', 'tuviese', 'tuviésemos', 'tuvieseis', 'tuviesen'],
    future_subjunctive: ['tuviere', 'tuvieres', 'tuviere', 'tuviéremos', 'tuviereis', 'tuvieren'],
    imperative_aff: ['—', 'ten', 'tenga', 'tengamos', 'tened', 'tengan'],
  },
  hacer: {
    present: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
    preterite: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
    subjunctive_present: ['haga', 'hagas', 'haga', 'hagamos', 'hagáis', 'hagan'],
    subjunctive_imperfect: ['hiciera', 'hicieras', 'hiciera', 'hiciéramos', 'hicierais', 'hicieran'],
    subjunctive_imperfect_se: ['hiciese', 'hicieses', 'hiciese', 'hiciésemos', 'hicieseis', 'hiciesen'],
    imperative_aff: ['—', 'haz', 'haga', 'hagamos', 'haced', 'hagan'],
  },
  poder: {
    present: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
    preterite: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
    subjunctive_present: ['pueda', 'puedas', 'pueda', 'podamos', 'podáis', 'puedan'],
    subjunctive_imperfect: ['pudiera', 'pudieras', 'pudiera', 'pudiéramos', 'pudierais', 'pudieran'],
    subjunctive_imperfect_se: ['pudiese', 'pudieses', 'pudiese', 'pudiésemos', 'pudieseis', 'pudiesen'],
  },
  decir: {
    present: ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
    preterite: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
    subjunctive_present: ['diga', 'digas', 'diga', 'digamos', 'digáis', 'digan'],
    subjunctive_imperfect: ['dijera', 'dijeras', 'dijera', 'dijéramos', 'dijerais', 'dijeran'],
    subjunctive_imperfect_se: ['dijese', 'dijeses', 'dijese', 'dijésemos', 'dijeseis', 'dijesen'],
    imperative_aff: ['—', 'di', 'diga', 'digamos', 'decid', 'digan'],
  },
  querer: {
    present: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
    preterite: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
    subjunctive_present: ['quiera', 'quieras', 'quiera', 'queramos', 'queráis', 'quieran'],
    subjunctive_imperfect: ['quisiera', 'quisieras', 'quisiera', 'quisiéramos', 'quisierais', 'quisieran'],
    subjunctive_imperfect_se: ['quisiese', 'quisieses', 'quisiese', 'quisiésemos', 'quisieseis', 'quisiesen'],
  },
  venir: {
    present: ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
    preterite: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
    subjunctive_present: ['venga', 'vengas', 'venga', 'vengamos', 'vengáis', 'vengan'],
    subjunctive_imperfect: ['viniera', 'vinieras', 'viniera', 'viniéramos', 'vinierais', 'vinieran'],
    subjunctive_imperfect_se: ['viniese', 'vinieses', 'viniese', 'viniésemos', 'vinieseis', 'viniesen'],
    imperative_aff: ['—', 'ven', 'venga', 'vengamos', 'venid', 'vengan'],
  },
  dar: {
    present: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
    preterite: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
    subjunctive_present: ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
    subjunctive_imperfect: ['diera', 'dieras', 'diera', 'diéramos', 'dierais', 'dieran'],
    subjunctive_imperfect_se: ['diese', 'dieses', 'diese', 'diésemos', 'dieseis', 'diesen'],
  },
  ver: {
    present: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
    preterite: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
    imperfect: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
    subjunctive_present: ['vea', 'veas', 'vea', 'veamos', 'veáis', 'vean'],
    subjunctive_imperfect: ['viera', 'vieras', 'viera', 'viéramos', 'vierais', 'vieran'],
    subjunctive_imperfect_se: ['viese', 'vieses', 'viese', 'viésemos', 'vieseis', 'viesen'],
    imperative_aff: ['—', 've', 'vea', 'veamos', 'ved', 'vean'],
  },
  saber: {
    present: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
    preterite: ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
    subjunctive_present: ['sepa', 'sepas', 'sepa', 'sepamos', 'sepáis', 'sepan'],
    subjunctive_imperfect: ['supiera', 'supieras', 'supiera', 'supiéramos', 'supierais', 'supieran'],
    subjunctive_imperfect_se: ['supiese', 'supieses', 'supiese', 'supiésemos', 'supieseis', 'supiesen'],
    imperative_aff: ['—', 'sabe', 'sepa', 'sepamos', 'sabed', 'sepan'],
  },
  poner: {
    present: ['pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen'],
    preterite: ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'],
    subjunctive_present: ['ponga', 'pongas', 'ponga', 'pongamos', 'pongáis', 'pongan'],
    subjunctive_imperfect: ['pusiera', 'pusieras', 'pusiera', 'pusiéramos', 'pusierais', 'pusieran'],
    subjunctive_imperfect_se: ['pusiese', 'pusieses', 'pusiese', 'pusiésemos', 'pusieseis', 'pusiesen'],
    imperative_aff: ['—', 'pon', 'ponga', 'pongamos', 'poned', 'pongan'],
  },
  salir: {
    present: ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
    subjunctive_present: ['salga', 'salgas', 'salga', 'salgamos', 'salgáis', 'salgan'],
    imperative_aff: ['—', 'sal', 'salga', 'salgamos', 'salid', 'salgan'],
  },
  traer: {
    present: ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'],
    preterite: ['traje', 'trajiste', 'trajo', 'trajimos', 'trajisteis', 'trajeron'],
    subjunctive_present: ['traiga', 'traigas', 'traiga', 'traigamos', 'traigáis', 'traigan'],
    subjunctive_imperfect: ['trajera', 'trajeras', 'trajera', 'trajéramos', 'trajerais', 'trajeran'],
    subjunctive_imperfect_se: ['trajese', 'trajeses', 'trajese', 'trajésemos', 'trajeseis', 'trajesen'],
  },
  caer: {
    present: ['caigo', 'caes', 'cae', 'caemos', 'caéis', 'caen'],
    preterite: ['caí', 'caíste', 'cayó', 'caímos', 'caísteis', 'cayeron'],
    subjunctive_present: ['caiga', 'caigas', 'caiga', 'caigamos', 'caigáis', 'caigan'],
    subjunctive_imperfect: ['cayera', 'cayeras', 'cayera', 'cayéramos', 'cayerais', 'cayeran'],
    subjunctive_imperfect_se: ['cayese', 'cayeses', 'cayese', 'cayésemos', 'cayeseis', 'cayesen'],
  },
  oír: {
    present: ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'],
    preterite: ['oí', 'oíste', 'oyó', 'oímos', 'oísteis', 'oyeron'],
    subjunctive_present: ['oiga', 'oigas', 'oiga', 'oigamos', 'oigáis', 'oigan'],
    subjunctive_imperfect: ['oyera', 'oyeras', 'oyera', 'oyéramos', 'oyerais', 'oyeran'],
    subjunctive_imperfect_se: ['oyese', 'oyeses', 'oyese', 'oyésemos', 'oyeseis', 'oyesen'],
  },
  conocer: {
    present: ['conozco', 'conoces', 'conoce', 'conocemos', 'conocéis', 'conocen'],
    subjunctive_present: ['conozca', 'conozcas', 'conozca', 'conozcamos', 'conozcáis', 'conozcan'],
  },
  conducir: {
    present: ['conduzco', 'conduces', 'conduce', 'conducimos', 'conducís', 'conducen'],
    preterite: ['conduje', 'condujiste', 'condujo', 'condujimos', 'condujisteis', 'condujeron'],
    subjunctive_present: ['conduzca', 'conduzcas', 'conduzca', 'conduzcamos', 'conduzcáis', 'conduzcan'],
    subjunctive_imperfect: ['condujera', 'condujeras', 'condujera', 'condujéramos', 'condujerais', 'condujeran'],
    subjunctive_imperfect_se: ['condujese', 'condujeses', 'condujese', 'condujésemos', 'condujeseis', 'condujesen'],
  },
  satisfacer: {
    present: ['satisfago', 'satisfaces', 'satisface', 'satisfacemos', 'satisfacéis', 'satisfacen'],
    preterite: ['satisfice', 'satisficiste', 'satisfizo', 'satisficimos', 'satisficisteis', 'satisficieron'],
    subjunctive_present: ['satisfaga', 'satisfagas', 'satisfaga', 'satisfagamos', 'satisfagáis', 'satisfagan'],
    subjunctive_imperfect: ['satisficiera', 'satisficieras', 'satisficiera', 'satisficiéramos', 'satisficierais', 'satisficieran'],
    subjunctive_imperfect_se: ['satisficiese', 'satisficieses', 'satisficiese', 'satisficiésemos', 'satisficieseis', 'satisficiesen'],
    imperative_aff: ['—', 'satisfaz', 'satisfaga', 'satisfagamos', 'satisfaced', 'satisfagan'],
  },
};

// ── Get past participle ──
function getParticiple(infinitive) {
  // Strip reflexive -se
  const base = infinitive.replace(/se$/, '');
  if (IRREGULAR_PARTICIPLES[base]) return IRREGULAR_PARTICIPLES[base];
  // Check compounds (e.g. describir -> descrito based on escribir)
  // Sort by key length descending to match longest suffix first (volver before ver)
  const sortedParticiples = Object.entries(IRREGULAR_PARTICIPLES).sort((a, b) => b[0].length - a[0].length);
  for (const [k, v] of sortedParticiples) {
    if (base.endsWith(k) && base.length > k.length) {
      return base.slice(0, base.length - k.length) + v;
    }
  }
  const group = base.slice(-2);
  const stem = base.slice(0, -2);
  if (group === 'ar') return stem + 'ado';
  return stem + 'ido';
}

// ── Get gerund ──
const IRREGULAR_GERUNDS = {
  decir: 'diciendo', poder: 'pudiendo', venir: 'viniendo',
  dormir: 'durmiendo', morir: 'muriendo', pedir: 'pidiendo',
  sentir: 'sintiendo', seguir: 'siguiendo', ir: 'yendo',
  leer: 'leyendo', oír: 'oyendo', traer: 'trayendo', caer: 'cayendo',
};
function getGerund(infinitive) {
  const base = infinitive.replace(/se$/, '');
  const group = base.slice(-2);
  const stem = base.slice(0, -2);
  if (IRREGULAR_GERUNDS[base]) return IRREGULAR_GERUNDS[base];
  // Compound verb gerund inheritance (e.g. predecir → prediciendo)
  // Skip short keys like 'ir' to avoid false matches (e.g. recibir ≠ re+c+ib+ir)
  for (const [k, v] of Object.entries(IRREGULAR_GERUNDS)) {
    if (k.length > 2 && base.endsWith(k) && base.length > k.length) {
      return base.slice(0, base.length - k.length) + v;
    }
  }
  if (group === 'ar') return stem + 'ando';
  return stem + 'iendo';
}

// ── Get reflexive pronoun ──
function getReflexivePronoun(personIdx) {
  return ['me', 'te', 'se', 'nos', 'os', 'se'][personIdx];
}

// ── Main conjugation function ──
function conjugate(infinitive, tense, personIdx, useSeForm = false) {
  const isReflexive = infinitive.endsWith('se');
  const base = isReflexive ? infinitive.slice(0, -2) : infinitive;
  const group = base.slice(-2); // ar, er, ir
  const stem = base.slice(0, -2);

  // Resolve -se form: remap subjunctive_imperfect to subjunctive_imperfect_se
  let effectiveTense = tense;
  if (useSeForm && tense === 'subjunctive_imperfect') {
    effectiveTense = 'subjunctive_imperfect_se';
  }

  // Find verb entry for metadata
  const verbEntry = typeof VERB_DATA !== 'undefined' ?
    VERB_DATA.find(v => v.infinitive === infinitive || v.infinitive === base) : null;

  let form;

  // 1. Check progressive tenses (estar + gerund)
  if (TENSE_META[tense] && TENSE_META[tense].progressive) {
    const auxTense = TENSE_META[tense].auxTense;
    const aux = ESTAR[auxTense] ? ESTAR[auxTense][personIdx] : conjugate('estar', auxTense, personIdx);
    const gerund = getGerund(base);
    form = aux + ' ' + gerund;
  }
  // 2. Check compound tenses (haber + participle)
  else if (TENSE_META[tense] && TENSE_META[tense].compound) {
    let auxTense = TENSE_META[tense].auxTense;
    // For subjunctive_pluperfect with -se preference, use hubiese instead of hubiera
    if (useSeForm && auxTense === 'subjunctive_imperfect') auxTense = 'subjunctive_imperfect_se';
    const aux = HABER[auxTense] ? HABER[auxTense][personIdx] : conjugate('haber', auxTense, personIdx);
    const participle = getParticiple(base);
    form = aux + ' ' + participle;
  }
  // 2. Check full irregular overrides
  else if (FULL_IRREGULARS[base] && FULL_IRREGULARS[base][effectiveTense]) {
    form = FULL_IRREGULARS[base][effectiveTense][personIdx];
  }
  // 2b. Compound verb inheritance from FULL_IRREGULARS (e.g. proponer → poner)
  else if (resolveCompound(base)) {
    const compound = resolveCompound(base);
    const irrTable = FULL_IRREGULARS[compound.irregularKey];
    if (irrTable && irrTable[effectiveTense]) {
      const baseForm = irrTable[effectiveTense][personIdx];
      if (baseForm === '—') {
        form = '—';
      } else if (compound.root === 'ducir') {
        form = baseForm.replace(/^con/, compound.prefix);
      } else {
        form = compound.prefix + baseForm;
      }
      if (effectiveTense === 'imperative_aff' && personIdx === 1) {
        form = addImperativeAccent(form);
      }
    }
  }
  // 3. Future subjunctive: derive from imperfect subjunctive -ra form
  if (!form && tense === 'future_subjunctive') {
    const raForm = conjugate(base, 'subjunctive_imperfect', personIdx);
    const raSuffixes = ['ra', 'ras', 'ra', 'ramos', 'rais', 'ran'];
    const reSuffixes = ['re', 'res', 're', 'remos', 'reis', 'ren'];
    form = raForm.replace(new RegExp(raSuffixes[personIdx] + '$'), reSuffixes[personIdx]);
  }
  // 4. Future and conditional with irregular stems
  else if (!form && (tense === 'future' || tense === 'conditional') && getIrregularFutureStem(base)) {
    const irrStem = getIrregularFutureStem(base);
    const endings = tense === 'future' ? FUTURE_COND_ENDINGS : CONDITIONAL_ENDINGS;
    form = irrStem + endings[personIdx];
  }
  // 5. Regular conjugation (with possible stem change and spelling change)
  if (!form && REGULAR_ENDINGS[effectiveTense] && REGULAR_ENDINGS[effectiveTense][group]) {
    let conjStem = stem;
    const ending = REGULAR_ENDINGS[effectiveTense][group][personIdx];

    // Apply stem change if applicable
    if (verbEntry && verbEntry.stemChange) {
      const pattern = verbEntry.stemChange;
      const affectedTenses = ['present', 'subjunctive_present', 'imperative_aff', 'imperative_neg'];
      if (affectedTenses.includes(tense) && BOOT_PERSONS.includes(personIdx)) {
        conjStem = applyStemChange(conjStem, pattern);
      }
      // Preterite stem change for -ir stem-changers (e>i, o>u in 3rd person)
      if (tense === 'preterite' && group === 'ir' && (personIdx === 2 || personIdx === 5)) {
        if (pattern === 'e>ie' || pattern === 'e>i') {
          conjStem = applyStemChange(conjStem, 'e>i');
        } else if (pattern === 'o>ue') {
          conjStem = applyStemChange(stem, 'o>ue').replace('ue', 'u');
        }
      }
      // Imperfect subjunctive stem change for -ir stem-changers (all persons)
      if ((effectiveTense === 'subjunctive_imperfect' || effectiveTense === 'subjunctive_imperfect_se') && group === 'ir') {
        if (pattern === 'e>ie' || pattern === 'e>i') {
          conjStem = applyStemChange(conjStem, 'e>i');
        } else if (pattern === 'o>ue') {
          conjStem = applyStemChange(stem, 'o>ue').replace('ue', 'u');
        }
      }
    }

    // Non-existent person for this tense (e.g. imperative yo)
    if (ending === '—') { form = '—'; }
    else {
      // Apply spelling change
      conjStem = applySpellingChange(conjStem, group, ending);
      form = conjStem + ending;
    }
  }
  // 6. Future/conditional regular (use full infinitive as stem)
  if (!form && tense === 'future') {
    form = base + FUTURE_COND_ENDINGS[personIdx];
  } else if (!form && tense === 'conditional') {
    form = base + CONDITIONAL_ENDINGS[personIdx];
  }
  if (!form) {
    form = '?';
  }

  // Prepend reflexive pronoun
  if (isReflexive && form !== '—' && form !== '?') {
    const pron = getReflexivePronoun(personIdx);
    // For affirmative imperative, pronoun attaches to end
    if (tense === 'imperative_aff') {
      form = form + pron;
    } else {
      form = pron + ' ' + form;
    }
  }

  return form;
}

// Get full conjugation table for a verb in one tense
function conjugateAll(infinitive, tense, useSeForm = false) {
  return PERSONS.map((_, i) => conjugate(infinitive, tense, i, useSeForm));
}
