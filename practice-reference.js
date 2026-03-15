'use strict';

// ════════════════════════════════════════════════════════════
//  practice-reference.js — Verb conjugation reference,
//  conjugation rules, pronunciation guide, reading
//  comprehension, themed vocabulary, curriculum tracks
// ════════════════════════════════════════════════════════════

// ════════════════════════════════════════
//  VERB CONJUGATION REFERENCE
// ════════════════════════════════════════

function renderVerbReference(infinitive) {
  if (!infinitive || typeof VERB_DATA === 'undefined') return;
  const verb = VERB_DATA.find(v => v.infinitive === infinitive);
  if (!verb) {
    document.getElementById('vref-content').innerHTML = `<p class="text-muted">Verb not found.</p>`;
    return;
  }
  document.getElementById('vref-suggestions').innerHTML = '';
  let html = '';

  // Compute overall verb recall
  const verbFsrsKeys = Object.keys(progress.verbFsrs || {}).filter(k => k.startsWith(infinitive + ':'));
  let verbRecallBadge = '';
  if (verbFsrsKeys.length) {
    const now = Date.now();
    const sum = verbFsrsKeys.reduce((s, k) => {
      const rec = progress.verbFsrs[k];
      return s + (rec?.s ? fsrsR(rec.s, (now - rec.lastRev) / 86400000) : 0);
    }, 0);
    const avgR = Math.round(sum / verbFsrsKeys.length * 100);
    const rc = avgR >= 90 ? 'var(--green)' : avgR >= 70 ? 'var(--yellow)' : 'var(--red)';
    verbRecallBadge = `<span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:${rc}20;color:${rc};border-radius:4px">Recall ${avgR}%</span>`;
  }

  // Header
  html += `<div class="card mb-1">
    <h2 style="margin:0">${esc(verb.infinitive)}</h2>
    <p class="text-muted">${esc(verb.english)}</p>
    <div class="flex gap-1 mt-1" style="flex-wrap:wrap">
      <span class="verb-type-badge ${verb.type}" style="font-size:0.7rem;padding:0.15rem 0.5rem">${verb.type}</span>
      <span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:var(--bg3);color:var(--text2);border-radius:4px">-${verb.group}</span>
      <span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:var(--accent-bg);color:var(--accent);border-radius:4px">${verb.level}</span>
      ${verb.stemChange ? `<span style="font-size:0.7rem;padding:0.15rem 0.5rem;background:var(--yellow-bg);color:var(--yellow);border-radius:4px">${verb.stemChange}</span>` : ''}
      ${verbRecallBadge}
    </div>
  </div>`;

  // Non-finite forms
  const base = infinitive.replace(/se$/, '');
  html += `<div class="card mb-1">
    <div class="card-title text-sm" style="color:var(--text2)">Non-Finite Forms</div>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><td>Infinitive</td><td><strong>${esc(infinitive)}</strong></td></tr>
      <tr><td>Past Participle</td><td><strong>${esc(getParticiple(base))}</strong></td></tr>
      <tr><td>Gerund</td><td><strong>${esc(getGerund(base))}</strong></td></tr>
    </table></div>
  </div>`;

  // Tense groups by mood
  const indicative = ['present','preterite','imperfect','future','conditional',
    'present_perfect','pluperfect','future_perfect','conditional_perfect',
    'progressive_present','progressive_preterite','progressive_imperfect'];
  const subjunctive = getActiveTenses(['subjunctive_present','subjunctive_imperfect',
    'subjunctive_perfect','subjunctive_pluperfect','future_subjunctive']);
  const imperative = ['imperative_aff','imperative_neg'];

  // Determine -se form preference for reference tables
  const seFormPref = progress?.settings?.subjunctiveForm || 'ra';

  html += '<div class="mood-header mood-indicative">Indicative</div>';
  for (const t of indicative) html += renderRefTenseTable(base, t);

  html += '<div class="mood-header mood-subjunctive">Subjunctive</div>';
  for (const t of subjunctive) {
    const isSubjImpf = (t === 'subjunctive_imperfect' || t === 'subjunctive_pluperfect');
    if (isSubjImpf && seFormPref === 'both') {
      html += renderRefTenseTable(base, t, false);
      html += renderRefTenseTable(base, t, true);
    } else {
      html += renderRefTenseTable(base, t, isSubjImpf && seFormPref === 'se');
    }
  }

  html += '<div class="mood-header mood-imperative">Imperative</div>';
  for (const t of imperative) html += renderRefTenseTable(base, t);

  document.getElementById('vref-content').innerHTML = html;
}

function renderRefTenseTable(infinitive, tense, useSeForm = false) {
  const meta = TENSE_META[tense];
  if (!meta) return '';
  let forms;
  try { forms = conjugateAll(infinitive, tense, useSeForm); }
  catch { return ''; }
  const lookupTense = useSeForm ? 'subjunctive_imperfect_se' : tense;
  const isIrregular = !!(FULL_IRREGULARS[infinitive] && FULL_IRREGULARS[infinitive][lookupTense]);
  const label = useSeForm ? (tenseLabel(meta) + ' (-se)') : tenseLabel(meta);

  // Per-tense recall badge
  let tenseRecallBadge = '';
  const tenseKeys = PERSONS.map((_, i) => `${infinitive}:${lookupTense}:${i}`);
  const tenseRecs = tenseKeys.map(k => progress.verbFsrs?.[k]).filter(r => r?.s);
  if (tenseRecs.length) {
    const now = Date.now();
    const avg = Math.round(tenseRecs.reduce((s, r) => s + fsrsR(r.s, (now - r.lastRev) / 86400000), 0) / tenseRecs.length * 100);
    const tc = avg >= 90 ? 'var(--green)' : avg >= 70 ? 'var(--yellow)' : 'var(--red)';
    tenseRecallBadge = `<span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:${tc}20;color:${tc};border-radius:3px">${avg}%</span>`;
  }

  return `<div class="card mb-1">
    <div class="flex" style="justify-content:space-between;align-items:center">
      <div class="card-title text-sm">${label}</div>
      <div style="display:flex;gap:0.25rem">
        <span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">${meta.level}</span>
        ${isIrregular ? '<span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--accent-bg);color:var(--accent);border-radius:3px">irregular</span>' : ''}
        ${tenseRecallBadge}
      </div>
    </div>
    ${meta.compound ? `<div class="text-muted" style="font-size:0.7rem">haber (${meta.auxTense}) + past participle</div>` : ''}
    ${meta.progressive ? `<div class="text-muted" style="font-size:0.7rem">estar (${meta.auxTense}) + gerund</div>` : ''}
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      ${PERSONS.map((p, i) => {
        const form = forms[i];
        if (form === '—') return `<tr><td>${PERSON_LABELS[p]}</td><td style="color:var(--text3)">—</td></tr>`;
        return `<tr><td>${PERSON_LABELS[p]}</td><td${isIrregular ? ' class="irreg"' : ''}>${esc(form)}</td></tr>`;
      }).join('')}
    </table></div>
  </div>`;
}

function showVrefSuggestions(query) {
  if (!query || typeof VERB_DATA === 'undefined') {
    document.getElementById('vref-suggestions').innerHTML = '';
    document.getElementById('vref-content').innerHTML = '';
    return;
  }
  const exact = VERB_DATA.find(v => v.infinitive === query);
  if (exact) { renderVerbReference(query); return; }
  const matches = VERB_DATA.filter(v => v.infinitive.startsWith(query) || v.english.toLowerCase().includes(query)).slice(0, 10);
  document.getElementById('vref-content').innerHTML = '';
  document.getElementById('vref-suggestions').innerHTML = matches.map(v =>
    `<div class="vref-suggestion" data-action="select-vref" data-verb="${esc(v.infinitive)}">
      <strong>${esc(v.infinitive)}</strong> <span class="text-muted text-sm">— ${esc(v.english)}</span>
    </div>`
  ).join('') || '<p class="text-muted text-sm" style="padding:0.5rem">No matching verbs.</p>';
}

// ════════════════════════════════════════
//  CONJUGATION RULES / ENDINGS REFERENCE
// ════════════════════════════════════════

function renderConjugationRules() {
  const container = document.getElementById('vref-tab-rules');
  if (!container) return;

  const seFormPref = progress?.settings?.subjunctiveForm || 'ra';
  if (container.dataset.rendered === seFormPref) return; // already rendered with current setting
  container.dataset.rendered = seFormPref;

  const groups = ['ar', 'er', 'ir'];
  const personLabels = ['yo', 'tú', 'él/ella/Ud.', 'nosotros', 'vosotros', 'ellos/Uds.'];

  function endingsTable(tenseKey, caption) {
    const endings = REGULAR_ENDINGS[tenseKey];
    if (!endings) return '';
    const meta = TENSE_META[tenseKey];
    const label = caption || (meta ? tenseLabel(meta) : tenseKey);
    let rows = personLabels.map((p, i) => {
      const cells = groups.map(g => {
        const e = endings[g][i];
        return `<td>${e === '—' ? '<span style="color:var(--text3)">—</span>' : '<strong>' + esc(e) + '</strong>'}</td>`;
      }).join('');
      return `<tr><td>${p}</td>${cells}</tr>`;
    }).join('');
    return `<div class="card mb-1">
      <div class="card-title text-sm">${label}</div>
      ${meta ? `<span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">${meta.level}</span>` : ''}
      <div class="conj-table-scroll"><table class="conj-table mt-1">
        <tr><th></th><th>-ar</th><th>-er</th><th>-ir</th></tr>
        ${rows}
      </table></div>
    </div>`;
  }

  let html = '';

  // ── Non-finite forms ──
  html += '<div class="mood-header mood-indicative">Non-Finite Forms</div>';
  html += `<div class="card mb-1">
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th></th><th>-ar</th><th>-er</th><th>-ir</th></tr>
      <tr><td>Past Participle</td><td><strong>-ado</strong></td><td><strong>-ido</strong></td><td><strong>-ido</strong></td></tr>
      <tr><td>Gerund</td><td><strong>-ando</strong></td><td><strong>-iendo</strong></td><td><strong>-iendo</strong></td></tr>
    </table></div>
  </div>`;

  // ── Indicative mood ──
  html += '<div class="mood-header mood-indicative">Indicative</div>';
  const indicativeSimple = ['present', 'preterite', 'imperfect'];
  for (const t of indicativeSimple) html += endingsTable(t);

  // Future & conditional use full infinitive as stem
  html += `<div class="card mb-1">
    <div class="card-title text-sm">${tenseLabel(TENSE_META.future)}</div>
    <span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">A2</span>
    <p class="text-muted text-sm mt-1">Add endings to the <strong>full infinitive</strong> (e.g. hablar + é = hablaré).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th></th><th>Ending</th></tr>
      ${['é','ás','á','emos','éis','án'].map((e,i) => `<tr><td>${personLabels[i]}</td><td><strong>-${e}</strong></td></tr>`).join('')}
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">${tenseLabel(TENSE_META.conditional)}</div>
    <span style="font-size:0.6rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text3);border-radius:3px">B1</span>
    <p class="text-muted text-sm mt-1">Add endings to the <strong>full infinitive</strong> (e.g. hablar + ía = hablaría).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th></th><th>Ending</th></tr>
      ${['ía','ías','ía','íamos','íais','ían'].map((e,i) => `<tr><td>${personLabels[i]}</td><td><strong>-${e}</strong></td></tr>`).join('')}
    </table></div>
  </div>`;

  // Compound tenses
  html += `<div class="card mb-1">
    <div class="card-title text-sm">Compound Tenses (Indicative)</div>
    <p class="text-muted text-sm mt-1">Formed with <strong>haber</strong> (conjugated) + <strong>past participle</strong> (-ado/-ido).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Tense</th><th>Haber form</th><th>Example</th></tr>
      <tr><td>Present Perfect</td><td>he, has, ha, hemos, habéis, han</td><td>he hablado</td></tr>
      <tr><td>Pluperfect</td><td>había, habías, había…</td><td>había comido</td></tr>
      <tr><td>Future Perfect</td><td>habré, habrás, habrá…</td><td>habrá vivido</td></tr>
      <tr><td>Conditional Perfect</td><td>habría, habrías, habría…</td><td>habría dicho</td></tr>
    </table></div>
  </div>`;

  // Progressive
  html += `<div class="card mb-1">
    <div class="card-title text-sm">Progressive Tenses</div>
    <p class="text-muted text-sm mt-1">Formed with <strong>estar</strong> (conjugated) + <strong>gerund</strong> (-ando/-iendo).</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Tense</th><th>Estar form</th><th>Example</th></tr>
      <tr><td>Present Progressive</td><td>estoy, estás, está…</td><td>estoy hablando</td></tr>
      <tr><td>Preterite Progressive</td><td>estuve, estuviste, estuvo…</td><td>estuvo comiendo</td></tr>
      <tr><td>Imperfect Progressive</td><td>estaba, estabas, estaba…</td><td>estaba viviendo</td></tr>
    </table></div>
  </div>`;

  // ── Subjunctive mood ──
  html += '<div class="mood-header mood-subjunctive">Subjunctive</div>';
  html += endingsTable('subjunctive_present');
  if (seFormPref === 'ra' || seFormPref === 'both')
    html += endingsTable('subjunctive_imperfect', tenseLabel(TENSE_META.subjunctive_imperfect) + ' (-ra)');
  if (seFormPref === 'se' || seFormPref === 'both')
    html += endingsTable('subjunctive_imperfect_se', tenseLabel(TENSE_META.subjunctive_imperfect) + ' (-se)');

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Compound Tenses (Subjunctive)</div>
    <p class="text-muted text-sm mt-1">Formed with <strong>haber</strong> (subjunctive) + <strong>past participle</strong>.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Tense</th><th>Haber form</th><th>Example</th></tr>
      <tr><td>Present Perfect Subj.</td><td>haya, hayas, haya…</td><td>haya hablado</td></tr>
      ${seFormPref === 'se'
        ? '<tr><td>Pluperfect Subj.</td><td>hubiese, hubieses, hubiese…</td><td>hubiese dicho</td></tr>'
        : '<tr><td>Pluperfect Subj.</td><td>hubiera, hubieras, hubiera…</td><td>hubiera dicho</td></tr>'}
    </table></div>
  </div>`;

  html += endingsTable('future_subjunctive');

  // ── Imperative mood ──
  html += '<div class="mood-header mood-imperative">Imperative</div>';
  html += endingsTable('imperative_aff');
  html += endingsTable('imperative_neg');

  // ── Key rules ──
  html += '<div class="mood-header" style="border-color:var(--text2)">Key Rules</div>';

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Stem Changes (Boot Pattern)</div>
    <p class="text-muted text-sm mt-1">Affect yo, tú, él/ella, ellos/ellas in present indicative &amp; subjunctive. Nosotros and vosotros keep the regular stem.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Pattern</th><th>Example</th><th>Present yo</th></tr>
      <tr><td>e → ie</td><td>pensar</td><td>pienso</td></tr>
      <tr><td>o → ue</td><td>poder</td><td>puedo</td></tr>
      <tr><td>e → i</td><td>pedir</td><td>pido</td></tr>
      <tr><td>u → ue</td><td>jugar</td><td>juego</td></tr>
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Spelling Changes</div>
    <p class="text-muted text-sm mt-1">Preserve pronunciation when the following vowel changes.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Change</th><th>When</th><th>Example</th></tr>
      <tr><td>c → qu</td><td>-ar verb before e</td><td>buscar → busqué</td></tr>
      <tr><td>g → gu</td><td>-ar verb before e</td><td>pagar → pagué</td></tr>
      <tr><td>z → c</td><td>before e</td><td>empezar → empecé</td></tr>
      <tr><td>g → j</td><td>-er/-ir verb before a, o</td><td>coger → cojo</td></tr>
    </table></div>
  </div>`;

  const futStems = Object.entries(IRREGULAR_FUTURE_STEMS).map(([verb, stem]) =>
    `<tr><td>${esc(verb)}</td><td>${esc(stem)}-</td></tr>`
  ).join('');
  html += `<div class="card mb-1">
    <div class="card-title text-sm">Irregular Future/Conditional Stems</div>
    <p class="text-muted text-sm mt-1">These verbs use a modified stem instead of the full infinitive for future and conditional.</p>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Verb</th><th>Stem</th></tr>
      ${futStems}
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Irregular Past Participles</div>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Verb</th><th>Participle</th></tr>
      ${Object.entries(IRREGULAR_PARTICIPLES).map(([v, p]) => `<tr><td>${esc(v)}</td><td>${esc(p)}</td></tr>`).join('')}
    </table></div>
  </div>`;

  html += `<div class="card mb-1">
    <div class="card-title text-sm">Irregular Gerunds</div>
    <div class="conj-table-scroll"><table class="conj-table mt-1">
      <tr><th>Verb</th><th>Gerund</th></tr>
      ${Object.entries(IRREGULAR_GERUNDS).map(([v, g]) => `<tr><td>${esc(v)}</td><td>${esc(g)}</td></tr>`).join('')}
    </table></div>
  </div>`;

  container.innerHTML = html;
}

// ════════════════════════════════════════
//  PRONUNCIATION GUIDE
// ════════════════════════════════════════

function renderPronunciation() {
  const speakBtn = (text) => `<button class="tts-inline" data-action="speak" data-text="${esc(text)}" aria-label="Listen to ${esc(text)}">&#9654;</button>`;

  let html = '';

  // Vowels
  html += `<div class="card mb-1"><div class="card-title mb-1">Vowels — Vocales</div>
    <p class="text-muted text-sm mb-1">Spanish has 5 pure vowel sounds. Each is always pronounced the same way.</p>`;
  const vowels = [
    ['a', '/a/', 'Like "ah" in "father"', 'casa', 'house'],
    ['e', '/e/', 'Like "e" in "bed" — never silent', 'mesa', 'table'],
    ['i', '/i/', 'Like "ee" in "see"', 'hijo', 'son'],
    ['o', '/o/', 'Like "o" in "go" (but shorter)', 'todo', 'everything'],
    ['u', '/u/', 'Like "oo" in "food"', 'luna', 'moon'],
  ];
  for (const [letter, ipa, desc, ex, en] of vowels) {
    html += `<div class="pron-row">
      <span class="pron-letter">${letter}</span>
      <div style="flex:1"><span class="pron-ipa">${ipa}</span> — ${desc}<br>
        <span class="text-muted text-sm">${esc(ex)} (${en})</span>
      </div>${speakBtn(ex)}
    </div>`;
  }
  html += '</div>';

  // Consonants
  html += `<div class="card mb-1"><div class="card-title mb-1">Consonant Differences — Consonantes</div>
    <p class="text-muted text-sm mb-1">These sounds differ significantly from English.</p>`;
  const cons = [
    ['b / v', '/b/ or /\u03B2/', 'Both pronounced the same! Soft between vowels.', 'vivir', 'to live'],
    ['d', '/d/ or /\u00F0/', 'Soft "th" (like "the") between vowels', 'nada', 'nothing'],
    ['g', '/x/ before e,i', '"h" sound before e/i; hard "g" elsewhere', 'gente', 'people'],
    ['j', '/x/', 'Harsh "h" (like Scottish "loch")', 'joven', 'young'],
    ['ll', '/\u028E/ or /\u029D/', 'Like "y" in "yes" (varies by region)', 'calle', 'street'],
    ['\u00F1', '/\u0272/', 'Like "ny" in "canyon"', 'a\u00F1o', 'year'],
    ['r', '/\u027E/', 'Single tap (like "tt" in American "butter")', 'pero', 'but'],
    ['rr', '/r/', 'Rolled/trilled (multiple taps)', 'perro', 'dog'],
    ['z, c+e/i', '/s/ or /\u03B8/', 'In Spain: "th". In Latin America: "s"', 'zapato', 'shoe'],
  ];
  for (const [letter, ipa, desc, ex, en] of cons) {
    html += `<div class="pron-row">
      <span class="pron-letter" style="font-size:1rem">${letter}</span>
      <div style="flex:1"><span class="pron-ipa">${ipa}</span> — ${desc}<br>
        <span class="text-muted text-sm">${esc(ex)} (${en})</span>
      </div>${speakBtn(ex)}
    </div>`;
  }
  html += '</div>';

  // Stress rules
  html += `<div class="card mb-1"><div class="card-title mb-1">Stress Rules — Acentuaci\u00F3n</div>
    <div style="font-size:0.9rem;line-height:1.7">
      <p><strong>1.</strong> Words ending in a <strong>vowel, -n, or -s</strong>: stress the <em>second-to-last</em> syllable.<br>
        <span class="text-muted text-sm">ha-<strong>BLO</strong>, co-<strong>MEN</strong>, ca-<strong>SA</strong></span> ${speakBtn('hablo')}</p>
      <p><strong>2.</strong> Words ending in any <strong>other consonant</strong>: stress the <em>last</em> syllable.<br>
        <span class="text-muted text-sm">ha-<strong>BLAR</strong>, co-<strong>MER</strong>, ciu-<strong>DAD</strong></span> ${speakBtn('hablar')}</p>
      <p><strong>3.</strong> Written <strong>accent marks</strong> override these rules.<br>
        <span class="text-muted text-sm">ca-<strong>F\u00C9</strong>, <strong>M\u00DA</strong>-si-ca, pl\u00E1-<strong>TA</strong>-no</span> ${speakBtn('caf\u00E9')}</p>
      <p><strong>4.</strong> Accents also <strong>distinguish meaning</strong>:<br>
        <span class="text-muted text-sm">si (if) vs s\u00ED (yes), el (the) vs \u00E9l (he), tu (your) vs t\u00FA (you)</span></p>
    </div>
  </div>`;

  // Diphthongs
  html += `<div class="card mb-1"><div class="card-title mb-1">Diphthongs & Hiatus — Diptongos e hiato</div>
    <div style="font-size:0.9rem;line-height:1.7">
      <p><strong>Strong vowels:</strong> a, e, o &nbsp; <strong>Weak vowels:</strong> i, u</p>
      <p><strong>Strong + weak</strong> = diphthong (one syllable): ai, ei, oi, au, eu<br>
        <span class="text-muted text-sm">bai-le, Eu-ro-pa, cau-sa</span> ${speakBtn('baile')}</p>
      <p><strong>Two strong vowels</strong> = hiatus (two syllables):<br>
        <span class="text-muted text-sm">le-er, ca-er, po-e-ta</span> ${speakBtn('poeta')}</p>
      <p><strong>Accent on weak vowel</strong> breaks diphthong:<br>
        <span class="text-muted text-sm">d\u00ED-a, r\u00ED-o, pa-\u00EDs</span> ${speakBtn('d\u00EDa')}</p>
    </div>
  </div>`;

  // Regional variations
  html += `<div class="card mb-1"><div class="card-title mb-1">Regional Variations — Variaciones regionales</div>
    <div style="font-size:0.9rem;line-height:1.7">
      <p><strong>Seseo</strong> — z and c(e,i) pronounced as /s/<br>
        <span class="text-muted text-sm">Latin America, southern Spain, Canary Islands</span></p>
      <p><strong>Ye\u00EDsmo</strong> — ll and y both pronounced as /\u029D/<br>
        <span class="text-muted text-sm">Most Spanish speakers worldwide</span></p>
      <p><strong>Voseo</strong> — "vos" instead of "t\u00FA" with modified conjugations<br>
        <span class="text-muted text-sm">Argentina, Uruguay, Central America. E.g. "vos habl\u00E1s" instead of "t\u00FA hablas"</span> ${speakBtn('vos habl\u00E1s')}</p>
    </div>
  </div>`;

  document.getElementById('pron-content').innerHTML = html;
}

// ════════════════════════════════════════
//  READING COMPREHENSION
// ════════════════════════════════════════

let readingQueue = [], readingIdx = 0, readingQIdx = 0, readingScore = 0, readingSelected = -1, currentReading = null;
let listenMode = false;

let readingTypeFilter = 'standard';

function renderReadingList(filter) {
  if (typeof READING_DATA === 'undefined') {
    document.getElementById('reading-passages').innerHTML = '<p class="text-muted">Loading...</p>';
    return;
  }
  filter = filter || 'all';

  // Update type filter buttons
  document.querySelectorAll('#reading-type-filters .btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === readingTypeFilter);
  });

  // Update level filter button active states
  document.querySelectorAll('#reading-filters .btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });

  // Select data source based on type filter
  const isSat = readingTypeFilter === 'sat';
  const source = isSat && typeof READING_SAT_DATA !== 'undefined' ? READING_SAT_DATA
    : !isSat ? READING_DATA : [];

  const passages = filter === 'all' ? source : source.filter(p => p.level === filter);
  document.getElementById('reading-passages').innerHTML = passages.map(p => {
    const done = progress.readingMastery && progress.readingMastery[p.id];
    const satBadge = p.sat ? '<span class="sat-badge">SAT</span> ' : '';
    return `<div class="card" data-action="start-reading" data-id="${esc(p.id)}" data-sat="${p.sat ? '1' : ''}">
      <div class="flex" style="justify-content:space-between;align-items:center">
        <div class="card-title">${satBadge}${esc(p.title)}</div>
        <div style="display:flex;gap:0.25rem;align-items:center">
          ${done ? '<span style="color:var(--green)">&#10003;</span>' : ''}
          <span style="font-size:0.65rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text2);border-radius:3px">${p.level}</span>
        </div>
      </div>
      <div class="card-subtitle">${esc(p.titleEn)}</div>
    </div>`;
  }).join('') || '<p class="text-muted">No passages at this level.</p>';
}

function startReading(id) {
  if (typeof READING_DATA === 'undefined') return;
  currentReading = READING_DATA?.find(p => p.id === id)
    || (typeof READING_SAT_DATA !== 'undefined' ? READING_SAT_DATA.find(p => p.id === id) : null);
  if (!currentReading || !currentReading.questions) return;
  readingQIdx = 0; readingScore = 0; readingSelected = -1;
  listenMode = false;
  showScreen('reading');
  document.getElementById('read-title').textContent = currentReading.title;
  document.getElementById('read-level').textContent = currentReading.level;
  document.getElementById('read-text').textContent = currentReading.text;
  document.getElementById('read-text').style.display = '';
  document.getElementById('read-speak').dataset.text = currentReading.text;
  document.getElementById('read-listen-toggle').classList.remove('active');

  // Vocab sidebar
  if (currentReading.vocab && currentReading.vocab.length) {
    document.getElementById('read-vocab').innerHTML = `<div class="card">
      <div class="card-title text-sm" style="color:var(--text2)">Key Vocabulary</div>
      ${currentReading.vocab.map(v => `<div class="stat-row"><span>${esc(v.word)}</span><span class="text-muted">${esc(v.english)}</span></div>`).join('')}
    </div>`;
  } else {
    document.getElementById('read-vocab').innerHTML = '';
  }

  renderReadingQuestion();
}

function renderReadingQuestion() {
  if (!currentReading || readingQIdx >= currentReading.questions.length) {
    // Done
    reviewItem(progress.readingFsrs, progress.readingMastery, currentReading.id,
      readingScore >= currentReading.questions.length * 0.8 ? FSRS_GOOD : FSRS_AGAIN);
    showResults(readingScore, currentReading.questions.length, 'reading', `${t('readingComprehension')}: ${currentReading.title}`);
    return;
  }

  const total = currentReading.questions.length;
  const pct = total > 0 ? (readingQIdx / total * 100) : 0;
  document.getElementById('read-progress').innerHTML = `<div class="quiz-progress-fill" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100" style="width:${pct}%"></div>`;
  const q = currentReading.questions[readingQIdx];
  readingSelected = -1;
  document.getElementById('read-question').textContent = q.prompt;
  document.getElementById('read-options').innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" data-action="answer-reading" data-idx="${i}">${esc(opt)}</button>`
  ).join('');
  document.getElementById('read-submit').style.display = 'none';
  document.getElementById('read-feedback').style.display = 'none';
  document.getElementById('read-next').style.display = 'none';
}

function answerReadingMC(idx) {
  selectMCOption('#read-question-card', idx);
  readingSelected = idx;
  document.getElementById('read-submit').style.display = 'block';
}

function submitReadingMC() {
  if (!currentReading || readingSelected < 0) return;
  const q = currentReading.questions[readingQIdx];
  const correct = processMCSubmit({
    optionsSel: '#read-options .quiz-option',
    isCorrectBtn: btn => parseInt(btn.dataset.idx) === q.correct,
    feedbackId: 'read-feedback', nextBtnId: 'read-next',
    feedbackFn: ok => {
      let html = ok ? `<span class="text-correct">${t('correct')}</span>` :
        `<span class="text-incorrect">${t('incorrectAnswer')} ${esc(q.options[q.correct])}</span>`;
      if (q.explanation) html += `<br><span class="text-muted" style="font-size:0.85rem">${esc(q.explanation)}</span>`;
      return html;
    },
  });
  document.getElementById('read-feedback').setAttribute('role', 'alert');
  if (correct) readingScore++;
  document.getElementById('read-submit').style.display = 'none';
}

function nextReading() { readingQIdx++; renderReadingQuestion(); }

// ════════════════════════════════════════
//  THEMED VOCABULARY
// ════════════════════════════════════════

let currentTheme = null;

function renderThemedVocabList() {
  if (typeof THEMED_VOCAB_DATA === 'undefined') {
    document.getElementById('themed-vocab-list').innerHTML = '<p class="text-muted">Loading...</p>';
    return;
  }
  document.getElementById('themed-vocab-list').innerHTML = THEMED_VOCAB_DATA.map(th => {
    const done = progress.themedVocabDone && progress.themedVocabDone[th.id];
    return `<div class="card" data-action="open-themed-detail" data-id="${esc(th.id)}">
      <div class="flex" style="justify-content:space-between;align-items:center">
        <div class="card-title">${th.icon || ''} ${esc(th.theme)}</div>
        <div style="display:flex;gap:0.25rem;align-items:center">
          ${done ? '<span style="color:var(--green)">&#10003;</span>' : ''}
          <span style="font-size:0.65rem;padding:0.1rem 0.4rem;background:var(--bg3);color:var(--text2);border-radius:3px">${th.level}</span>
        </div>
      </div>
      <div class="card-subtitle">${esc(th.themeEs)}</div>
    </div>`;
  }).join('');
}

function openThemedDetail(id) {
  if (typeof THEMED_VOCAB_DATA === 'undefined') return;
  currentTheme = THEMED_VOCAB_DATA.find(th => th.id === id);
  if (!currentTheme) return;
  showScreen('themed-detail');
  document.getElementById('tv-title').textContent = `${currentTheme.icon || ''} ${currentTheme.theme}`;
  document.getElementById('tv-scenario').textContent = currentTheme.scenario;

  // Dialogue
  if (currentTheme.dialogue && currentTheme.dialogue.length) {
    document.getElementById('tv-dialogue').innerHTML = currentTheme.dialogue.map((d, i) =>
      `<div class="tv-dialogue-line">
        <span class="tv-speaker">${esc(d.speaker)}</span>
        <span>${esc(d.text)}</span>
        <button class="tts-inline" data-action="speak" data-text="${esc(d.text)}" aria-label="Listen to ${esc(d.text)}">&#9654;</button>
      </div>`
    ).join('');
  } else {
    document.getElementById('tv-dialogue').innerHTML = '';
  }

  // Phrases
  document.getElementById('tv-phrases').innerHTML = currentTheme.phrases.map(p =>
    `<div class="phrase-card">
      <div class="phrase-es">${esc(p.spanish)} <button class="tts-inline" data-action="speak" data-text="${esc(p.spanish)}" aria-label="Listen to ${esc(p.spanish)}">&#9654;</button></div>
      <div class="phrase-en">${esc(p.english)}</div>
      ${p.notes ? `<div class="text-muted text-sm">${esc(p.notes)}</div>` : ''}
    </div>`
  ).join('');

  // Vocab
  document.getElementById('tv-vocab').innerHTML = currentTheme.vocab.map(v =>
    `<div class="stat-row">
      ${v.gender ? `<span class="word-gender ${v.gender}" style="font-size:0.6rem;padding:0.05rem 0.25rem">${v.gender === 'f' ? 'la' : 'el'}</span>` : ''}
      <span style="flex:1;margin-left:0.25rem"><strong>${esc(v.word)}</strong></span>
      <span class="text-muted text-sm">${esc(v.english)}</span>
    </div>`
  ).join('');
}

// Themed vocab quiz — powered by createQuizFlow
const themedQuizFlow = createQuizFlow({
  containerId: 'tvq-container',
  nextBtnId: 'tvq-next',
  getCorrectIdx: q => q.correct,
  onCorrect: () => {},
  onIncorrect: () => {},
  getExplanation: q => q.explanation || null,
  onComplete: (score, total) => {
    if (currentTheme) {
      progress.themedVocabDone[currentTheme.id] = true;
      saveProgress();
    }
    showResults(score, total, 'themed-quiz', currentTheme ? currentTheme.theme : 'Themed Vocab');
  },
  renderQuestion: (q, idx, total) => {
    // Update progress bar
    const tvqPct = total > 0 ? (idx / total * 100) : 0;
    const progEl = document.getElementById('tvq-progress');
    if (progEl) progEl.innerHTML = progressBarHTML(idx, total);
    return `
      <div class="card">
        <div class="text-muted text-sm">${idx + 1} / ${total}</div>
        <div class="quiz-question mt-1">${esc(q.prompt)}</div>
        <div class="quiz-options mt-1">
          ${q.options.map((opt, i) => `<button class="quiz-option" data-action="answer-themed-quiz" data-idx="${i}">${esc(opt)}</button>`).join('')}
        </div>
      </div>
      <button class="btn btn-primary btn-block mt-1 mc-submit" data-action="submit-themed-quiz-mc" style="display:none">${tBtn('submit')}</button>
    `;
  },
});

function startThemedQuiz() {
  if (!currentTheme || !currentTheme.quiz || !currentTheme.quiz.length) return;
  showScreen('themed-quiz');
  themedQuizFlow.start([...currentTheme.quiz]);
}
function answerThemedQuizMC(idx) { themedQuizFlow.selectOption(idx); }
function submitThemedQuizMC() { themedQuizFlow.submit(); }
function nextThemedQuiz() { themedQuizFlow.next(); }

// ════════════════════════════════════════
//  CURRICULUM TRACKS
// ════════════════════════════════════════

// ════════════════════════════════════════
//  CEFR CURRICULUM
// ════════════════════════════════════════

const CEFR_DESCRIPTIONS = {
  A1: {
    name: 'Principiante', nameEn: 'Beginner',
    desc: 'Understand and use familiar everyday expressions. Introduce yourself, ask and answer basic personal questions. Interact in a simple way if the other person speaks slowly.',
    conversations: 'Basic greetings, ordering food, asking for directions, introductions, telling time',
  },
  A2: {
    name: 'Elemental', nameEn: 'Elementary',
    desc: 'Understand frequently used expressions (personal info, shopping, local geography, employment). Communicate in simple routine tasks. Describe aspects of your background and immediate environment.',
    conversations: 'Shopping, transport, health, social chat, restaurant ordering, emergencies',
  },
  B1: {
    name: 'Intermedio', nameEn: 'Intermediate',
    desc: 'Understand main points on familiar matters (work, school, leisure). Deal with most situations while travelling. Produce simple connected text. Describe experiences, events, dreams, and briefly give reasons and explanations.',
    conversations: 'Work and meetings, expressing opinions, travel planning, describing experiences, romance',
  },
  B2: {
    name: 'Intermedio Alto', nameEn: 'Upper Intermediate',
    desc: 'Understand main ideas of complex text on both concrete and abstract topics. Interact with fluency and spontaneity. Produce clear, detailed text on a wide range of subjects and explain viewpoints.',
    conversations: 'Debates, nuanced opinion, detailed narratives, hypothetical situations, formal correspondence',
  },
  C1: {
    name: 'Avanzado', nameEn: 'Advanced',
    desc: 'Understand a wide range of demanding, longer texts and recognize implicit meaning. Express ideas fluently and spontaneously. Use language flexibly and effectively for social, academic, and professional purposes.',
    conversations: 'Academic presentations, journalism, diplomacy, complex negotiations, abstract discussions',
  },
  C2: {
    name: 'Maestría', nameEn: 'Mastery',
    desc: 'Understand with ease virtually everything heard or read. Summarize information from different sources, reconstructing arguments coherently. Express yourself spontaneously, very fluently, and precisely, differentiating finer shades of meaning.',
    conversations: 'Literary analysis, philosophical discourse, legal argumentation, simultaneous interpretation, any professional domain',
  },
};

const CEFR_COLORS = { A1: '#4CAF50', A2: '#8BC34A', B1: '#FF9800', B2: '#F44336', C1: '#9C27B0', C2: '#311B92' };

function getCefrContentCounts(lv) {
  const counts = {};
  if (typeof VOCAB_DATA !== 'undefined' && typeof buildVocabIndexes === 'function') {
    buildVocabIndexes();
    counts.vocab = (VOCAB_BY_LEVEL[lv] || []).length;
  }
  if (typeof VERB_DATA !== 'undefined') {
    counts.verbs = VERB_DATA.filter(v => v.level === lv).length;
  }
  if (typeof TENSE_META !== 'undefined') {
    counts.tenses = Object.values(TENSE_META).filter(t => t.level === lv).length;
  }
  if (typeof GRAMMAR_DATA !== 'undefined') {
    counts.grammar = GRAMMAR_DATA.filter(l => l.level === lv).length;
  }
  if (typeof CONVERSATIONS_DATA !== 'undefined') {
    counts.conversations = CONVERSATIONS_DATA.filter(c => c.level === lv).length;
  }
  if (typeof READING_DATA !== 'undefined') {
    counts.reading = READING_DATA.filter(r => r.level === lv).length;
  }
  if (typeof SENTENCE_CONSTRUCTION !== 'undefined') {
    counts.sentences = SENTENCE_CONSTRUCTION.filter(s => s.level === lv).length;
  }
  if (typeof TRANSLATION_DRILLS !== 'undefined') {
    counts.translations = TRANSLATION_DRILLS.filter(t => t.level === lv).length;
  }
  return counts;
}

function renderCurriculumOverview() {
  const el = document.getElementById('curriculum-levels');
  if (!el) return;
  const mastery = computeCefrMastery();
  const masteryMap = {};
  for (const m of mastery) masteryMap[m.level] = m;

  let html = '';
  for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
    const info = CEFR_DESCRIPTIONS[lv];
    const color = CEFR_COLORS[lv];
    const m = masteryMap[lv] || { overall: 0, pillars: [] };
    const counts = getCefrContentCounts(lv);
    const c = cefrColor(m.overall);

    html += `<div class="card mb-1" data-action="open-curriculum-level" data-level="${lv}" style="border-left:4px solid ${color};cursor:pointer">
      <div class="flex justify-between items-center mb-1">
        <div>
          <span style="font-weight:700;font-size:1.1rem;color:${color}">${lv}</span>
          <span class="text-muted" style="margin-left:0.5rem">${info.nameEn}</span>
        </div>
        <div style="text-align:right">
          <div style="font-weight:700;font-size:1.1rem;color:${c}">${m.overall}%</div>
        </div>
      </div>
      <div class="mastery-bar" style="margin-bottom:0.5rem;height:8px">
        <div style="width:${m.overall}%;background:${color}"></div>
      </div>
      <p class="text-muted" style="font-size:0.75rem;margin:0 0 0.4rem">${info.desc}</p>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;font-size:0.65rem;color:var(--text3)">
        ${counts.vocab ? `<span>${counts.vocab} words</span>` : ''}
        ${counts.verbs ? `<span>${counts.verbs} verbs</span>` : ''}
        ${counts.tenses ? `<span>${counts.tenses} tenses</span>` : ''}
        ${counts.grammar ? `<span>${counts.grammar} lessons</span>` : ''}
        ${counts.conversations ? `<span>${counts.conversations} dialogues</span>` : ''}
        ${counts.reading ? `<span>${counts.reading} readings</span>` : ''}
      </div>
    </div>`;
  }
  el.innerHTML = html;
}

function renderCurriculumLevel(lv) {
  if (!lv) return;
  const info = CEFR_DESCRIPTIONS[lv];
  const color = CEFR_COLORS[lv];
  if (!info) return;

  const mastery = computeCefrMastery();
  const m = mastery.find(x => x.level === lv) || { overall: 0, pillars: [] };
  const counts = getCefrContentCounts(lv);
  const c = cefrColor(m.overall);

  // Header
  let headerHtml = `
    <div style="border-left:4px solid ${color};padding-left:0.75rem;margin-bottom:1rem">
      <h2 style="margin:0"><span style="color:${color}">${lv}</span> — ${info.nameEn}</h2>
      <p class="text-muted" style="font-size:0.85rem;margin:0.25rem 0">${info.name}</p>
    </div>
    <div class="card mb-1">
      <div class="flex justify-between items-center mb-1">
        <span style="font-weight:600">Overall Mastery</span>
        <span style="font-weight:700;font-size:1.2rem;color:${c}">${m.overall}%</span>
      </div>
      <div class="mastery-bar" style="height:12px;margin-bottom:0.5rem">
        <div style="width:${m.overall}%;background:${color}"></div>
      </div>
      ${m.pillars.map(p => {
        const pp = p.total ? Math.round(p.pct * 100) : 0;
        const pc = cefrColor(pp);
        return `<div class="stat-row" style="margin-bottom:0.2rem">
          <span class="stat-label" style="font-size:0.8rem">${p.name}</span>
          <div style="flex:1;margin:0 0.5rem;background:var(--bg3);height:6px;border-radius:3px;overflow:hidden">
            <div style="width:${pp}%;height:100%;background:${pc}"></div>
          </div>
          <span style="font-size:0.75rem;color:${pc}">${p.done}/${p.total}</span>
        </div>`;
      }).join('')}
    </div>
    <div class="card mb-1">
      <div class="card-title mb-1" style="font-size:0.85rem">What you can do at ${lv}</div>
      <p style="font-size:0.8rem;margin:0 0 0.4rem">${info.desc}</p>
      <div class="text-muted" style="font-size:0.75rem"><strong>Conversations:</strong> ${info.conversations}</div>
    </div>`;

  document.getElementById('curriculum-level-header').innerHTML = headerHtml;

  // Content sections
  let contentHtml = '';

  // Grammar lessons
  if (typeof GRAMMAR_DATA !== 'undefined') {
    const lessons = GRAMMAR_DATA.filter(l => l.level === lv);
    if (lessons.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Grammar (${lessons.length} lessons)</div>`;
      for (const l of lessons) {
        const done = !!progress.grammarDone?.[l.id];
        const r = getRecallPct(progress.grammarFsrs, l.id);
        const icon = done ? '<span style="color:var(--green)">&#10003;</span>' : '<span style="color:var(--text3)">&#9675;</span>';
        const recall = r !== null ? (() => { const rc = r >= 90 ? 'var(--green)' : r >= 70 ? 'var(--yellow)' : 'var(--red)'; return `<span style="font-size:0.65rem;color:${rc}">${r}%</span>`; })() : '';
        contentHtml += `<div class="stat-row" style="margin-bottom:0.2rem;cursor:pointer" data-action="open-grammar-lesson" data-lesson="${esc(l.id)}">
          <span style="min-width:1.2rem">${icon}</span>
          <span style="flex:1;font-size:0.8rem">${esc(l.titleEn || l.title)}</span>
          ${recall}
        </div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Verb tenses at this level
  if (typeof TENSE_META !== 'undefined') {
    const tenses = Object.entries(TENSE_META).filter(([, m]) => m.level === lv);
    if (tenses.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Verb Tenses (${tenses.length})</div>`;
      for (const [tKey, tMeta] of tenses) {
        // Compute mastery across all verbs for this tense
        let practiced = 0, total = 0;
        if (typeof VERB_DATA !== 'undefined') {
          for (const v of VERB_DATA) {
            for (let p = 0; p < 6; p++) {
              if (tKey.startsWith('imperative') && p === 0) continue;
              total++;
              if (progress.verbMastery?.[`${v.infinitive}:${tKey}:${p}`]) practiced++;
            }
          }
        }
        const pct = total ? Math.round(practiced / total * 100) : 0;
        const pc = cefrColor(pct);
        const icon = pct >= 80 ? '<span style="color:var(--green)">&#10003;</span>' : pct > 0 ? '<span style="color:var(--yellow)">&#9673;</span>' : '<span style="color:var(--text3)">&#9675;</span>';
        contentHtml += `<div class="stat-row" style="margin-bottom:0.2rem">
          <span style="min-width:1.2rem">${icon}</span>
          <span style="flex:1;font-size:0.8rem">${tMeta.labelEn || tMeta.label}</span>
          <span style="font-size:0.65rem;color:${pc}">${pct}%</span>
          <span class="text-muted" style="font-size:0.65rem;min-width:3rem;text-align:right">${practiced}/${total}</span>
        </div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Verbs at this level
  if (typeof VERB_DATA !== 'undefined') {
    const verbs = VERB_DATA.filter(v => v.level === lv);
    if (verbs.length) {
      const learnedVerbs = verbs.filter(v => {
        return Object.keys(progress.verbMastery || {}).some(k => k.startsWith(v.infinitive + ':'));
      });
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Verbs (${learnedVerbs.length}/${verbs.length} practiced)</div>`;
      contentHtml += '<div style="display:flex;flex-wrap:wrap;gap:0.3rem">';
      for (const v of verbs) {
        const practiced = Object.keys(progress.verbMastery || {}).some(k => k.startsWith(v.infinitive + ':'));
        const bg = practiced ? `${color}20` : 'var(--bg3)';
        const fg = practiced ? color : 'var(--text3)';
        contentHtml += `<span style="font-size:0.7rem;padding:0.15rem 0.4rem;background:${bg};color:${fg};border-radius:3px">${esc(v.infinitive)}</span>`;
      }
      contentHtml += '</div></div>';
    }
  }

  // Vocabulary
  if (typeof VOCAB_DATA !== 'undefined' && typeof buildVocabIndexes === 'function') {
    buildVocabIndexes();
    const words = VOCAB_BY_LEVEL[lv] || [];
    if (words.length) {
      const learned = words.filter(w => progress.vocabMastery?.[w.word]).length;
      // Group by category
      const byCat = {};
      for (const w of words) {
        const cat = w.category || 'other';
        (byCat[cat] ??= { total: 0, done: 0 }).total++;
        if (progress.vocabMastery?.[w.word]) byCat[cat].done++;
      }
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Vocabulary (${learned}/${words.length} learned)</div>`;
      const catEntries = Object.entries(byCat).sort((a, b) => b[1].total - a[1].total).slice(0, 15);
      for (const [cat, info] of catEntries) {
        const catPct = Math.round(info.done / info.total * 100);
        const catTitle = typeof VOCAB_CATEGORIES !== 'undefined' && VOCAB_CATEGORIES[cat]
          ? (VOCAB_CATEGORIES[cat].titleEn || VOCAB_CATEGORIES[cat].title)
          : cat;
        contentHtml += `<div class="stat-row" style="margin-bottom:0.15rem">
          <span style="flex:1;font-size:0.75rem">${esc(catTitle)}</span>
          <span class="text-muted" style="font-size:0.65rem">${info.done}/${info.total}</span>
        </div>`;
      }
      if (Object.keys(byCat).length > 15) {
        contentHtml += `<div class="text-muted" style="font-size:0.65rem;margin-top:0.2rem">+${Object.keys(byCat).length - 15} more categories</div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Conversations
  if (typeof CONVERSATIONS_DATA !== 'undefined') {
    const convs = CONVERSATIONS_DATA.filter(c => c.level === lv);
    if (convs.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Conversations (${convs.length})</div>`;
      for (const c of convs) {
        contentHtml += `<div style="font-size:0.8rem;margin-bottom:0.2rem">${c.icon || ''} ${esc(c.titleEn || c.title)}</div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Reading
  if (typeof READING_DATA !== 'undefined') {
    const readings = READING_DATA.filter(r => r.level === lv);
    if (readings.length) {
      contentHtml += `<div class="card mb-1"><div class="card-title mb-1" style="font-size:0.85rem">Reading (${readings.length})</div>`;
      for (const r of readings) {
        const done = !!progress.readingMastery?.[r.id];
        const icon = done ? '<span style="color:var(--green)">&#10003;</span>' : '<span style="color:var(--text3)">&#9675;</span>';
        contentHtml += `<div class="stat-row" style="margin-bottom:0.2rem">
          <span style="min-width:1.2rem">${icon}</span>
          <span style="font-size:0.8rem">${esc(r.titleEn || r.title)}</span>
        </div>`;
      }
      contentHtml += '</div>';
    }
  }

  // Other exercises
  const exerciseTypes = [
    { name: 'Sentence Construction', data: typeof SENTENCE_CONSTRUCTION !== 'undefined' ? SENTENCE_CONSTRUCTION : null, store: 'sentenceMastery' },
    { name: 'Translation Drills', data: typeof TRANSLATION_DRILLS !== 'undefined' ? TRANSLATION_DRILLS : null, store: 'translationMastery' },
    { name: 'Cloze Passages', data: typeof CLOZE_PASSAGES !== 'undefined' ? CLOZE_PASSAGES : null, store: 'clozeMastery' },
    { name: 'Dictation', data: typeof DICTATION_DATA !== 'undefined' ? DICTATION_DATA : null, store: 'dictMastery' },
  ];
  for (const ex of exerciseTypes) {
    if (!ex.data) continue;
    const items = ex.data.filter(i => i.level === lv);
    if (!items.length) continue;
    const done = items.filter(i => progress[ex.store]?.[i.id]).length;
    const icon = done === items.length ? '<span style="color:var(--green)">&#10003;</span>'
      : done > 0 ? '<span style="color:var(--yellow)">&#9673;</span>'
      : '<span style="color:var(--text3)">&#9675;</span>';
    contentHtml += `<div class="stat-row" style="margin-bottom:0.3rem">
      <span style="min-width:1.2rem">${icon}</span>
      <span style="flex:1;font-size:0.8rem">${ex.name}</span>
      <span class="text-muted" style="font-size:0.7rem">${done}/${items.length}</span>
    </div>`;
  }

  // Skills still needed
  const todo = [];
  for (const p of m.pillars) {
    const remaining = p.total - p.done;
    if (remaining > 0) todo.push(`${remaining} more ${p.name.toLowerCase()} items`);
  }
  if (todo.length) {
    contentHtml += `<div class="card mb-1" style="border-left:3px solid var(--yellow)">
      <div class="card-title mb-1" style="font-size:0.85rem">Still needed for ${lv} mastery</div>
      <ul style="margin:0;padding-left:1.2rem;font-size:0.8rem;color:var(--text2)">
        ${todo.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>`;
  }

  document.getElementById('curriculum-level-content').innerHTML = contentHtml;
}

let currentTrack = null;

function renderTrackList() {
  if (typeof CURRICULUM_TRACKS === 'undefined') return;
  const el = document.getElementById('track-list');
  if (!el) return;
  el.innerHTML = CURRICULUM_TRACKS.map(track => {
    const comp = getTrackCompletion(track);
    return `
    <div class="card track-card" data-action="open-track-detail" data-id="${esc(track.id)}" style="border-left:4px solid ${track.color}">
      <div class="flex align-center gap-1 mb-1">
        <span style="font-size:1.5rem">${track.icon}</span>
        <div style="flex:1">
          <div class="card-title">${esc(track.title)} <span class="text-muted" style="font-weight:400">— ${esc(track.titleEn)}</span></div>
          <div class="card-subtitle text-xs">${esc(track.level)} · ${esc(track.grammarFocus)}</div>
        </div>
      </div>
      <div class="text-sm text-muted mb-1">${esc(track.description)}</div>
      <div class="track-progress-wrap">
        <div class="track-progress-bar" style="width:${comp.percent}%;background:${track.color}"></div>
      </div>
      <div class="text-xs text-muted" style="margin-top:0.25rem">${comp.completed}/${comp.total} modules completed</div>
    </div>`;
  }).join('');
}

function openTrackDetail(trackId) {
  if (typeof CURRICULUM_TRACKS === 'undefined') return;
  const track = CURRICULUM_TRACKS.find(t => t.id === trackId);
  if (!track) return;
  currentTrack = track;
  showScreen('track-detail');

  const comp = getTrackCompletion(track);
  document.getElementById('track-header').innerHTML = `
    <div class="flex align-center gap-1 mb-1">
      <span style="font-size:2rem">${track.icon}</span>
      <div style="flex:1">
        <h2 style="margin:0">${esc(track.title)}</h2>
        <div class="text-muted text-sm">${esc(track.titleEn)} · ${esc(track.level)}</div>
      </div>
      <div class="track-completion-ring" style="--pct:${comp.percent};--clr:${track.color}">
        <span>${comp.percent}%</span>
      </div>
    </div>
    <div class="text-sm mb-1">${esc(track.description)}</div>
    <div class="text-xs text-muted mb-2" style="font-style:italic">Grammar focus: ${esc(track.grammarFocus)}</div>
  `;

  const typeLabels = { vocab: 'Vocab', grammar: 'Grammar', themed: 'Scenario', culture: 'Culture', reading: 'Reading', conversation: 'Convo' };
  const cs = getComputedStyle(document.documentElement);
  const typeColors = {
    vocab: cs.getPropertyValue('--green').trim(),
    grammar: cs.getPropertyValue('--yellow').trim(),
    themed: cs.getPropertyValue('--blue').trim(),
    culture: cs.getPropertyValue('--accent').trim(),
    reading: cs.getPropertyValue('--text2').trim(),
    conversation: cs.getPropertyValue('--accent2').trim()
  };

  document.getElementById('track-modules').innerHTML = track.modules.map((mod, i) => {
    const done = isTrackModuleComplete(mod);
    const label = typeLabels[mod.type] || mod.type;
    const color = typeColors[mod.type] || '#666';
    return `
    <div class="track-module-item${done ? ' completed' : ''}" data-action="launch-track-module" data-track-id="${esc(track.id)}" data-module-id="${esc(mod.id)}">
      <div class="track-module-num" style="background:${done ? track.color : 'var(--surface2)'};color:${done ? '#fff' : 'var(--text2)'}">${i + 1}</div>
      <div style="flex:1">
        <div class="text-sm" style="font-weight:500">${esc(mod.title)}</div>
        <div class="text-xs text-muted">${esc(mod.titleEs)}</div>
      </div>
      <span class="module-type-badge" style="background:${color}20;color:${color}">${label}</span>
      ${done ? '<span style="color:var(--correct);font-size:1.1rem">✓</span>' : ''}
    </div>`;
  }).join('');
}

function isTrackModuleComplete(mod) {
  if (!progress) return false;
  switch (mod.type) {
    case 'grammar':
      return !!(progress.grammarDone && progress.grammarDone[mod.ref.grammarId]);
    case 'themed':
      return !!(progress.themedVocabDone && progress.themedVocabDone[mod.ref.themedId]);
    case 'reading':
      return !!(progress.readingMastery && progress.readingMastery[mod.ref.readingId]);
    case 'culture':
      return !!(progress.cultureDone && progress.cultureDone[mod.ref.itemId]);
    case 'vocab': {
      if (!progress.vocabMastery || typeof VOCAB_DATA === 'undefined') return false;
      buildVocabIndexes();
      const cat = mod.ref.category;
      const catWords = VOCAB_BY_CATEGORY[cat] || [];
      const threshold = Math.min(10, catWords.length);
      const learned = catWords.filter(v => progress.vocabMastery[v.word]).length;
      return learned >= threshold;
    }
    case 'conversation':
      return !!(progress.cultureDone && progress.cultureDone[mod.ref.itemId]);
    default:
      return false;
  }
}

function getTrackCompletion(track) {
  const total = track.modules.length;
  const completed = track.modules.filter(m => isTrackModuleComplete(m)).length;
  return { completed, total, percent: total ? Math.round(completed / total * 100) : 0 };
}

function launchTrackModule(trackId, moduleId) {
  if (typeof CURRICULUM_TRACKS === 'undefined') return;
  const track = CURRICULUM_TRACKS.find(t => t.id === trackId);
  if (!track) return;
  const mod = track.modules.find(m => m.id === moduleId);
  if (!mod) return;

  switch (mod.type) {
    case 'grammar':
      openGrammarLesson(mod.ref.grammarId);
      break;
    case 'vocab':
      openVocabCategory(mod.ref.category);
      break;
    case 'themed':
      openThemedDetail(mod.ref.themedId);
      break;
    case 'reading':
      startReading(mod.ref.readingId);
      break;
    case 'culture':
    case 'conversation':
      currentCultureModule = mod.ref.module;
      openCultureItem(mod.ref.itemId);
      break;
  }
}

