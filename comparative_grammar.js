'use strict';

// ════════════════════════════════════════════════════════════
//  COMPARATIVE GRAMMAR — Contrastive notes for
//  English-speaking learners of Spanish.
//  Each entry highlights a structural difference
//  between the two languages, with examples and
//  common traps (false friends / false assumptions).
// ════════════════════════════════════════════════════════════

const COMPARATIVE_GRAMMAR_DATA = [

  // ──────────────────────────────────────
  //  A1-A2 — Foundational contrasts
  // ──────────────────────────────────────

  {
    id: 'cg-1',
    title: 'Ser vs Estar',
    titleEn: 'Ser vs Estar — Two Verbs for "To Be"',
    level: 'A1',
    content: `<h3>Ser vs Estar</h3>
<p>English has one verb "to be." Spanish has two: <strong>ser</strong> and <strong>estar</strong>. Choosing the wrong one can change the meaning entirely.</p>
<p><strong>Ser</strong> — identity, origin, profession, material, time, inherent characteristics:</p>
<ul>
<li><em>Soy profesor</em> — I am a teacher (profession)</li>
<li><em>Es de madera</em> — It's made of wood (material)</li>
<li><em>Son las tres</em> — It's three o'clock (time)</li>
</ul>
<p><strong>Estar</strong> — location, temporary states, emotions, results of actions:</p>
<ul>
<li><em>Estoy en casa</em> — I'm at home (location)</li>
<li><em>Está cansado</em> — He's tired (temporary state)</li>
<li><em>La puerta está abierta</em> — The door is open (result)</li>
</ul>
<p><strong>Key insight:</strong> Some adjectives change meaning depending on the verb:</p>
<ul>
<li><em>Es aburrido</em> — He is boring (inherent trait) vs <em>Está aburrido</em> — He is bored (current state)</li>
<li><em>Es listo</em> — He is clever vs <em>Está listo</em> — He is ready</li>
<li><em>Es rico</em> — He is rich vs <em>Está rico</em> — It tastes delicious</li>
</ul>`,
    examples: [
      { spanish: 'María es guapa.', english: 'María is pretty (inherent).', note: 'Ser = characteristic trait' },
      { spanish: 'María está guapa hoy.', english: 'María looks pretty today.', note: 'Estar = current appearance, implies extra effort' },
      { spanish: 'La sopa es buena.', english: 'Soup is good (in general).', note: 'Ser = general quality' },
      { spanish: 'La sopa está buena.', english: 'This soup tastes good (right now).', note: 'Estar = current perception' },
    ],
    falseAmigos: [
      { spanish: 'Está muerto', english: 'He is dead', trap: 'Death is permanent, but Spanish uses "estar" because it\'s the result of dying (an action/change of state).' },
      { spanish: 'Es joven / Está joven', english: 'He is young / He looks young', trap: '"Es joven" = factually young. "Está joven" = looks young for their age.' },
    ]
  },
  {
    id: 'cg-2',
    title: 'El género gramatical',
    titleEn: 'Grammatical Gender — Everything Has a Sex',
    level: 'A1',
    content: `<h3>Grammatical Gender</h3>
<p>Every Spanish noun is either <strong>masculine</strong> or <strong>feminine</strong>. There is no neuter. This affects articles, adjectives, and pronouns.</p>
<p><strong>General patterns:</strong></p>
<ul>
<li>Nouns ending in <strong>-o</strong> are usually masculine: <em>el libro, el gato</em></li>
<li>Nouns ending in <strong>-a</strong> are usually feminine: <em>la mesa, la casa</em></li>
<li>Nouns ending in <strong>-ción, -sión, -dad, -tad</strong> are feminine: <em>la nación, la ciudad</em></li>
<li>Nouns ending in <strong>-ma</strong> (Greek origin) are masculine: <em>el problema, el tema, el sistema</em></li>
</ul>
<p><strong>Why it matters:</strong> All modifiers must agree: <em>la casa <strong>blanca</strong></em> (not blanco), <em>el coche <strong>rojo</strong></em> (not roja).</p>
<p><strong>English has no equivalent.</strong> Gender is grammatical, not biological — a table (la mesa) is not literally female.</p>`,
    examples: [
      { spanish: 'El mapa es grande.', english: 'The map is big.', note: '"Mapa" ends in -a but is masculine. Exception!' },
      { spanish: 'La mano está fría.', english: 'The hand is cold.', note: '"Mano" ends in -o but is feminine. Major exception!' },
      { spanish: 'El agua está limpia.', english: 'The water is clean.', note: '"Agua" is feminine but uses "el" to avoid the "la a-" sound clash. Adjective stays feminine.' },
    ],
    falseAmigos: [
      { spanish: 'el problema', english: 'the problem', trap: 'Looks feminine (-a ending) but is masculine. Greek -ma words are masculine.' },
      { spanish: 'la radio', english: 'the radio', trap: 'Short for "la radiodifusión." Often confused because it ends in -o.' },
    ]
  },
  {
    id: 'cg-3',
    title: 'La "a" personal',
    titleEn: 'The Personal "A" — Marking Human Objects',
    level: 'A2',
    content: `<h3>The Personal "A"</h3>
<p>In Spanish, when the direct object of a verb is a <strong>specific person</strong> (or personified entity), you must place <strong>"a"</strong> before it. English has no equivalent.</p>
<p><strong>With personal "a":</strong></p>
<ul>
<li><em>Veo <strong>a</strong> María</em> — I see María</li>
<li><em>Llamo <strong>a</strong> mi madre</em> — I call my mother</li>
<li><em>Busco <strong>a</strong> mi perro</em> — I'm looking for my dog (specific, beloved pet)</li>
</ul>
<p><strong>Without personal "a":</strong></p>
<ul>
<li><em>Veo la casa</em> — I see the house (not a person)</li>
<li><em>Busco un médico</em> — I'm looking for a doctor (any doctor, not specific)</li>
</ul>
<p><strong>Key rule:</strong> Also used with indefinite pronouns referring to people: <em>No conozco <strong>a</strong> nadie</em>, <em>¿<strong>A</strong> quién buscas?</em></p>`,
    examples: [
      { spanish: 'Quiero a mis hijos.', english: 'I love my children.', note: 'Personal a with loved ones' },
      { spanish: 'Quiero un café.', english: 'I want a coffee.', note: 'No personal a — coffee is not a person' },
      { spanish: 'Necesito un profesor.', english: 'I need a teacher (any teacher).', note: 'No personal a — nonspecific person' },
      { spanish: 'Necesito a mi profesor.', english: 'I need my teacher (a specific one).', note: 'Personal a — specific person' },
    ],
    falseAmigos: [
      { spanish: 'Conozco a Madrid.', english: 'I know Madrid.', trap: 'Cities sometimes get the personal a because they are treated as unique entities.' },
    ]
  },
  {
    id: 'cg-4',
    title: 'El orden de las palabras',
    titleEn: 'Word Order — Adjectives After Nouns',
    level: 'A1',
    content: `<h3>Word Order Differences</h3>
<p>Spanish word order is more flexible than English, but the default position for <strong>adjectives</strong> is different.</p>
<p><strong>English:</strong> adjective BEFORE noun → "a red car"</p>
<p><strong>Spanish:</strong> adjective AFTER noun → "un coche <strong>rojo</strong>"</p>
<p><strong>Exceptions (adjectives before the noun):</strong></p>
<ul>
<li>Quantity: <em><strong>muchos</strong> libros, <strong>tres</strong> gatos</em></li>
<li>Common short adjectives: <em><strong>buen</strong> hombre, <strong>gran</strong> ciudad</em></li>
<li>Emphasis or literary style: <em>la <strong>hermosa</strong> princesa</em></li>
</ul>
<p><strong>Meaning changes with position:</strong></p>
<ul>
<li><em>Un hombre <strong>grande</strong></em> — a big man (physical size)</li>
<li><em>Un <strong>gran</strong> hombre</em> — a great man (character)</li>
<li><em>Un amigo <strong>viejo</strong></em> — an elderly friend</li>
<li><em>Un <strong>viejo</strong> amigo</em> — an old friend (longtime)</li>
</ul>`,
    examples: [
      { spanish: 'Es una mujer inteligente.', english: 'She is an intelligent woman.', note: 'Default: adjective after noun' },
      { spanish: 'Es mi única oportunidad.', english: 'It\'s my only opportunity.', note: '"Único" goes before the noun' },
      { spanish: 'El pobre hombre perdió todo.', english: 'The poor (unfortunate) man lost everything.', note: 'Before = unfortunate' },
      { spanish: 'El hombre pobre no puede pagar.', english: 'The poor (not wealthy) man can\'t pay.', note: 'After = lacking money' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-5',
    title: 'Los verbos reflexivos',
    titleEn: 'Reflexive Verbs — Things You Do to Yourself',
    level: 'A2',
    content: `<h3>Reflexive Verbs</h3>
<p>Spanish uses reflexive verbs far more than English. Many daily activities that in English are simply transitive become reflexive in Spanish.</p>
<p><strong>Pattern:</strong> reflexive pronoun (me, te, se, nos, os, se) + verb</p>
<ul>
<li><em><strong>Me</strong> levanto</em> — I get up (literally: I raise myself)</li>
<li><em><strong>Te</strong> duchas</em> — You shower (literally: you shower yourself)</li>
<li><em><strong>Se</strong> viste</em> — He/She gets dressed</li>
</ul>
<p><strong>Why English speakers struggle:</strong> In English, "I wash" is fine. In Spanish, "Yo lavo" means "I wash (something else)." To wash yourself, you must say "Me lavo."</p>
<p><strong>Body parts:</strong> Spanish uses the definite article (not possessive) with body parts: <em>Me lavo <strong>las</strong> manos</em> (I wash my hands), NOT "me lavo mis manos."</p>`,
    examples: [
      { spanish: 'Me pongo la chaqueta.', english: 'I put on my jacket.', note: 'Reflexive + definite article (not possessive)' },
      { spanish: 'Se llama Ana.', english: 'Her name is Ana.', note: 'Literally: "She calls herself Ana"' },
      { spanish: 'Nos divertimos mucho.', english: 'We had a lot of fun.', note: '"Divertirse" = to enjoy oneself' },
      { spanish: 'Se fue sin despedirse.', english: 'He left without saying goodbye.', note: '"Irse" = to leave (more emphatic than "ir")' },
    ],
    falseAmigos: [
      { spanish: 'Se murió', english: 'He died', trap: '"Morirse" (reflexive) is more common in speech than "morir." Not literally "he killed himself."' },
    ]
  },
  {
    id: 'cg-6',
    title: 'Gustar y verbos similares',
    titleEn: 'Gustar — "To Be Pleasing To" (Not "To Like")',
    level: 'A2',
    content: `<h3>Gustar and Similar Verbs</h3>
<p>One of the most counterintuitive structures for English speakers. In English, the person who likes is the subject. In Spanish, the thing that is liked is the subject.</p>
<p><strong>English:</strong> I like chocolate → Subject (I) + verb + object</p>
<p><strong>Spanish:</strong> Me gusta el chocolate → Indirect object (me) + verb + subject (el chocolate)</p>
<p>Literally: "Chocolate is pleasing to me."</p>
<p><strong>Singular vs plural:</strong></p>
<ul>
<li><em>Me gust<strong>a</strong> el café</em> — I like coffee (singular thing)</li>
<li><em>Me gust<strong>an</strong> los perros</em> — I like dogs (plural things)</li>
</ul>
<p><strong>Other verbs that work like gustar:</strong></p>
<ul>
<li><em>encantar</em> (to love), <em>molestar</em> (to bother), <em>importar</em> (to matter), <em>faltar</em> (to lack/need), <em>doler</em> (to hurt), <em>interesar</em> (to interest), <em>parecer</em> (to seem), <em>quedar</em> (to remain/have left)</li>
</ul>`,
    examples: [
      { spanish: 'Me duele la cabeza.', english: 'My head hurts.', note: 'Literally: "The head hurts to me." Subject = la cabeza' },
      { spanish: 'Nos faltan dos sillas.', english: 'We\'re missing two chairs.', note: '"Faltan" is plural because "sillas" is the subject' },
      { spanish: '¿Te importa si abro la ventana?', english: 'Do you mind if I open the window?', note: 'Literally: "Does it matter to you...?"' },
      { spanish: 'A mi madre le encantan las flores.', english: 'My mother loves flowers.', note: '"A mi madre" clarifies who "le" refers to' },
    ],
    falseAmigos: [
      { spanish: 'Me gusta María.', english: 'I like María / I\'m attracted to María.', trap: 'With people, "gustar" often implies romantic attraction, not just liking. Use "caer bien" for platonic: "Me cae bien María."' },
    ]
  },
  {
    id: 'cg-7',
    title: 'La doble negación',
    titleEn: 'Double Negatives — Correct in Spanish!',
    level: 'A2',
    content: `<h3>Double Negatives</h3>
<p>In English, double negatives are considered incorrect ("I don't know nothing" → wrong). In Spanish, they are <strong>required</strong>.</p>
<p><strong>Rule:</strong> If a negative word comes AFTER the verb, you MUST also use "no" before the verb.</p>
<ul>
<li><em><strong>No</strong> sé <strong>nada</strong></em> — I don't know anything (literally: "I don't know nothing")</li>
<li><em><strong>No</strong> hay <strong>nadie</strong></em> — There isn't anyone (literally: "There isn't nobody")</li>
<li><em><strong>No</strong> voy <strong>nunca</strong></em> — I never go (literally: "I don't go never")</li>
</ul>
<p><strong>But:</strong> If the negative word comes BEFORE the verb, "no" is not used:</p>
<ul>
<li><em><strong>Nada</strong> sé</em> — I know nothing</li>
<li><em><strong>Nadie</strong> vino</em> — Nobody came</li>
<li><em><strong>Nunca</strong> voy</em> — I never go</li>
</ul>`,
    examples: [
      { spanish: 'No quiero ni café ni té.', english: 'I don\'t want coffee or tea.', note: '"Ni...ni" = neither...nor. Requires "no" before verb.' },
      { spanish: 'No lo he visto tampoco.', english: 'I haven\'t seen it either.', note: '"Tampoco" = neither/either. Triple negative is fine!' },
      { spanish: 'No viene ningún alumno.', english: 'No student is coming.', note: '"Ningún" = no/none. Double negative required.' },
    ],
    falseAmigos: [
      { spanish: 'No tiene nada de nada.', english: 'He has absolutely nothing.', trap: 'Triple negatives are emphatic and perfectly correct. English speakers often try to avoid them.' },
    ]
  },

  // ──────────────────────────────────────
  //  B1-B2 — Intermediate contrasts
  // ──────────────────────────────────────

  {
    id: 'cg-8',
    title: 'Por vs Para',
    titleEn: 'Por vs Para — Two Words for Many English Prepositions',
    level: 'B1',
    content: `<h3>Por vs Para</h3>
<p>Both can translate as "for" in English, but they serve very different functions.</p>
<p><strong>PARA</strong> — destination, purpose, deadline, recipient, comparison:</p>
<ul>
<li>Purpose: <em>Estudio <strong>para</strong> aprender</em> — I study to learn</li>
<li>Recipient: <em>Es <strong>para</strong> ti</em> — It's for you</li>
<li>Destination: <em>Salgo <strong>para</strong> Madrid</em> — I'm leaving for Madrid</li>
<li>Deadline: <em>Es <strong>para</strong> mañana</em> — It's due tomorrow</li>
<li>Comparison: <em>Habla bien <strong>para</strong> ser extranjero</em> — He speaks well for a foreigner</li>
</ul>
<p><strong>POR</strong> — cause/reason, exchange, duration, through, on behalf of, means:</p>
<ul>
<li>Cause: <em>Lo hice <strong>por</strong> ti</em> — I did it because of you</li>
<li>Exchange: <em>Pagué diez euros <strong>por</strong> el libro</em> — I paid ten euros for the book</li>
<li>Through: <em>Caminé <strong>por</strong> el parque</em> — I walked through the park</li>
<li>Duration: <em>Viví allí <strong>por</strong> dos años</em> — I lived there for two years</li>
<li>Means: <em><strong>Por</strong> correo electrónico</em> — By email</li>
</ul>
<p><strong>Key contrast:</strong> "Lo hice <strong>para</strong> ti" (I did it for you / intended for you) vs "Lo hice <strong>por</strong> ti" (I did it because of you / on your behalf).</p>`,
    examples: [
      { spanish: 'Gracias por todo.', english: 'Thanks for everything.', note: 'Cause/reason → por' },
      { spanish: 'Hay una carta para ti.', english: 'There\'s a letter for you.', note: 'Recipient → para' },
      { spanish: 'Trabajo por la noche.', english: 'I work at night.', note: 'Time of day → por' },
      { spanish: 'Trabajo para una empresa grande.', english: 'I work for a big company.', note: 'Employer/purpose → para' },
    ],
    falseAmigos: [
      { spanish: 'estar por / estar para', english: 'about to / on the verge of', trap: '"Estar por" = to be in favor of, or (Latin America) about to. "Estar para" = to be about to, to be in the mood for.' },
    ]
  },
  {
    id: 'cg-9',
    title: 'Pretérito vs Imperfecto',
    titleEn: 'Preterite vs Imperfect — Two Past Tenses',
    level: 'B1',
    content: `<h3>Preterite vs Imperfect</h3>
<p>English mostly has one simple past tense ("I went"). Spanish has two, and choosing between them is essential for clear narration.</p>
<p><strong>Preterite (pretérito indefinido)</strong> — completed actions with a clear beginning/end:</p>
<ul>
<li><em>Ayer <strong>comí</strong> pizza</em> — Yesterday I ate pizza (once, done)</li>
<li><em><strong>Viví</strong> en Madrid dos años</em> — I lived in Madrid for two years (finished period)</li>
</ul>
<p><strong>Imperfect (pretérito imperfecto)</strong> — ongoing, habitual, or background descriptions in the past:</p>
<ul>
<li><em>Cuando era niño, <strong>comía</strong> mucha pizza</em> — When I was a child, I used to eat a lot of pizza</li>
<li><em><strong>Hacía</strong> sol y los pájaros <strong>cantaban</strong></em> — It was sunny and the birds were singing (background)</li>
</ul>
<p><strong>Together in narration:</strong> The imperfect sets the scene; the preterite advances the plot.</p>
<p><em><strong>Dormía</strong> (imperfect: background) cuando <strong>sonó</strong> (preterite: interrupting event) el teléfono.</em></p>`,
    examples: [
      { spanish: 'Conocí a Juan en 2015.', english: 'I met Juan in 2015.', note: 'Preterite: first meeting, a one-time event' },
      { spanish: 'Conocía a Juan desde niño.', english: 'I knew Juan since childhood.', note: 'Imperfect: ongoing state of knowing' },
      { spanish: 'La fiesta fue divertida.', english: 'The party was fun.', note: 'Preterite: completed evaluation of the whole event' },
      { spanish: 'La fiesta era divertida cuando llegó la policía.', english: 'The party was (being) fun when the police arrived.', note: 'Imperfect: ongoing scene; preterite: sudden interruption' },
    ],
    falseAmigos: [
      { spanish: 'Sabía / Supe', english: 'I knew / I found out', trap: '"Saber" in preterite changes meaning: "supe" = I found out (discovered). "Sabía" = I knew (ongoing knowledge).' },
      { spanish: 'Podía / Pude', english: 'I could / I managed to', trap: '"Poder" in preterite: "pude" = I managed to (succeeded). "Podía" = I could (had the ability).' },
    ]
  },
  {
    id: 'cg-10',
    title: 'Tú vs Usted',
    titleEn: 'Tú vs Usted — Formal and Informal "You"',
    level: 'A1',
    content: `<h3>Tú vs Usted</h3>
<p>English has only "you." Spanish distinguishes between informal <strong>tú</strong> and formal <strong>usted</strong> (and in Latin America, <strong>vos</strong> in some countries).</p>
<p><strong>Tú</strong> — friends, family, children, peers, informal contexts:</p>
<ul><li><em>¿Cómo estás?</em> — How are you? (informal)</li></ul>
<p><strong>Usted (Ud.)</strong> — strangers, elders, professional contexts, showing respect:</p>
<ul><li><em>¿Cómo está usted?</em> — How are you? (formal)</li></ul>
<p><strong>Key difference from English:</strong> Using the wrong register can be offensive. Using "tú" with a stranger in Spain can seem rude; using "usted" with a friend can seem cold or distant.</p>
<p><strong>In Latin America:</strong> "Vos" replaces "tú" in Argentina, Uruguay, and parts of Central America. It has its own verb forms: <em>Vos tenés</em> instead of <em>Tú tienes</em>.</p>
<p><strong>Plural:</strong> Spain distinguishes <strong>vosotros</strong> (informal) and <strong>ustedes</strong> (formal). Latin America uses <strong>ustedes</strong> for both.</p>`,
    examples: [
      { spanish: '¿Tienes hora?', english: 'Do you have the time? (informal)', note: 'Tú form — asking a peer' },
      { spanish: '¿Tiene usted hora?', english: 'Do you have the time? (formal)', note: 'Usted form — asking a stranger politely' },
      { spanish: '¿De dónde sos vos?', english: 'Where are you from? (voseo)', note: 'Argentine/Uruguayan "vos" form' },
    ],
    falseAmigos: [
      { spanish: 'tutear', english: 'to address as tú', trap: '"¿Nos tuteamos?" = Shall we use tú with each other? A common invitation to drop formality.' },
    ]
  },
  {
    id: 'cg-11',
    title: 'El subjuntivo',
    titleEn: 'The Subjunctive — A Mood English Has (Almost) Lost',
    level: 'B1',
    content: `<h3>The Subjunctive Mood</h3>
<p>The subjunctive is perhaps the most challenging aspect of Spanish grammar for English speakers because English has almost entirely lost it.</p>
<p><strong>The few English subjunctives:</strong></p>
<ul>
<li>"I suggest that he <strong>be</strong> careful" (not "is")</li>
<li>"If I <strong>were</strong> you" (not "was")</li>
<li>"God <strong>save</strong> the King" (not "saves")</li>
</ul>
<p><strong>In Spanish, the subjunctive is alive and essential.</strong> It appears after expressions of:</p>
<ul>
<li><strong>Wishes:</strong> <em>Quiero que <strong>vengas</strong></em></li>
<li><strong>Emotions:</strong> <em>Me alegra que <strong>estés</strong> aquí</em></li>
<li><strong>Doubt:</strong> <em>Dudo que <strong>sepa</strong> la respuesta</em></li>
<li><strong>Impersonal judgments:</strong> <em>Es necesario que <strong>estudies</strong></em></li>
<li><strong>Future uncertainty:</strong> <em>Cuando <strong>llegues</strong>, llámame</em></li>
</ul>
<p><strong>Key insight:</strong> The subjunctive is not a tense (when) but a mood (attitude). It expresses subjectivity — wishes, doubts, emotions, hypotheticals — rather than objective facts.</p>`,
    examples: [
      { spanish: 'Espero que todo vaya bien.', english: 'I hope everything goes well.', note: 'Wish → subjunctive' },
      { spanish: 'Busco a alguien que hable francés.', english: 'I\'m looking for someone who speaks French.', note: 'Unknown/hypothetical person → subjunctive' },
      { spanish: 'Busco a la persona que habla francés.', english: 'I\'m looking for the person who speaks French.', note: 'Known/specific person → indicative' },
    ],
    falseAmigos: [
      { spanish: 'Ojalá que llueva.', english: 'I hope it rains.', trap: '"Ojalá" (from Arabic) ALWAYS triggers subjunctive. With imperfect subjunctive ("Ojalá lloviera"), it means an unlikely wish.' },
    ]
  },
  {
    id: 'cg-12',
    title: 'Los falsos amigos',
    titleEn: 'False Cognates — Words That Look Like English but Aren\'t',
    level: 'A2',
    content: `<h3>False Cognates (Falsos Amigos)</h3>
<p>Because English borrowed many words from Latin and French (as did Spanish), many words look similar but have <strong>completely different meanings</strong>. These are traps.</p>
<p><strong>The most dangerous false friends:</strong></p>
<table>
<tr><th>Spanish</th><th>Looks like</th><th>Actually means</th></tr>
<tr><td>embarazada</td><td>embarrassed</td><td>pregnant</td></tr>
<tr><td>constipado</td><td>constipated</td><td>having a cold</td></tr>
<tr><td>éxito</td><td>exit</td><td>success</td></tr>
<tr><td>actual</td><td>actual</td><td>current/present</td></tr>
<tr><td>realizar</td><td>to realize</td><td>to carry out/accomplish</td></tr>
<tr><td>sensible</td><td>sensible</td><td>sensitive</td></tr>
<tr><td>soportar</td><td>to support</td><td>to tolerate/bear</td></tr>
<tr><td>asistir</td><td>to assist</td><td>to attend</td></tr>
</table>`,
    examples: [
      { spanish: 'Estoy embarazada.', english: 'I\'m pregnant.', note: 'NOT "I\'m embarrassed" (which is "estoy avergonzada")' },
      { spanish: 'El éxito del proyecto.', english: 'The success of the project.', note: 'NOT "the exit" (which is "la salida")' },
      { spanish: 'La situación actual.', english: 'The current situation.', note: 'NOT "the actual situation" (which is "la situación real")' },
      { spanish: 'No soporto el ruido.', english: 'I can\'t stand the noise.', note: 'NOT "I don\'t support" (which is "no apoyo")' },
    ],
    falseAmigos: [
      { spanish: 'embarazada', english: 'pregnant', trap: 'Saying "Estoy embarazada" when you mean "I\'m embarrassed" is a famously humiliating mistake — making it self-fulfilling!' },
      { spanish: 'preservativo', english: 'condom', trap: 'Not "preservative" (which is "conservante"). Asking for "preservativos" in a food store will get strange looks.' },
      { spanish: 'librería', english: 'bookshop', trap: 'Not "library" (which is "biblioteca"). A librería sells books; a biblioteca lends them.' },
    ]
  },
  {
    id: 'cg-13',
    title: 'El pronombre sujeto es opcional',
    titleEn: 'Subject Pronouns Are Optional — The Verb Says It All',
    level: 'A1',
    content: `<h3>Subject Pronoun Dropping</h3>
<p>In English, you must always say "I go," "she eats," "we play." In Spanish, subject pronouns are <strong>usually omitted</strong> because the verb ending already tells you who the subject is.</p>
<p><strong>Spanish verb endings encode the subject:</strong></p>
<ul>
<li><em><strong>Hablo</strong></em> — I speak (the -o ending = yo)</li>
<li><em><strong>Hablas</strong></em> — You speak (the -as ending = tú)</li>
<li><em><strong>Hablamos</strong></em> — We speak (the -amos ending = nosotros)</li>
</ul>
<p><strong>When to USE the pronoun:</strong></p>
<ul>
<li>Emphasis: <em><strong>Yo</strong> no fui</em> — I didn't do it (emphasis: it wasn't ME)</li>
<li>Clarity: <em><strong>Ella</strong> habla francés</em> — She speaks French (clarifying who)</li>
<li>Contrast: <em><strong>Tú</strong> estudias y <strong>él</strong> trabaja</em></li>
</ul>
<p><strong>Common mistake:</strong> English speakers overuse pronouns in Spanish, which sounds unnatural and overly emphatic.</p>`,
    examples: [
      { spanish: 'Tengo hambre.', english: 'I\'m hungry.', note: 'No "yo" needed — the -o ending is enough' },
      { spanish: 'Yo tengo hambre y tú no.', english: 'I\'m hungry and you\'re not.', note: 'Pronouns for contrast/emphasis' },
      { spanish: '¿Quiere un café?', english: 'Do you want a coffee?', note: 'No "usted" needed — the verb form is clear' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-14',
    title: 'Haber vs Tener',
    titleEn: 'Haber vs Tener — "Have" Is Not Always "Tener"',
    level: 'A2',
    content: `<h3>Haber vs Tener</h3>
<p>English uses "have" for possession AND as an auxiliary. Spanish splits these into two different verbs.</p>
<p><strong>Tener</strong> — to have (possession):</p>
<ul>
<li><em><strong>Tengo</strong> un coche</em> — I have a car</li>
<li><em><strong>Tiene</strong> tres hijos</em> — She has three children</li>
</ul>
<p><strong>Haber</strong> — auxiliary verb (perfect tenses) and existential "there is/are":</p>
<ul>
<li><em><strong>He</strong> comido</em> — I have eaten</li>
<li><em><strong>Hay</strong> un problema</em> — There is a problem</li>
</ul>
<p><strong>Common English speaker mistake:</strong> Using "tengo" as an auxiliary: "Tengo comido" ✗ → "He comido" ✓</p>
<p><strong>Tener + noun</strong> where English uses "to be + adjective":</p>
<ul>
<li><em>Tengo hambre</em> — I'm hungry (I "have hunger")</li>
<li><em>Tengo frío</em> — I'm cold (I "have cold")</li>
<li><em>Tengo miedo</em> — I'm scared (I "have fear")</li>
<li><em>Tengo razón</em> — I'm right (I "have reason")</li>
</ul>`,
    examples: [
      { spanish: 'Hay mucha gente.', english: 'There are a lot of people.', note: '"Hay" is invariable — always singular even with plural nouns' },
      { spanish: 'Tengo 30 años.', english: 'I am 30 years old.', note: 'Spanish uses "tener" for age, not "ser"' },
      { spanish: 'He vivido aquí cinco años.', english: 'I have lived here for five years.', note: '"Haber" as auxiliary for present perfect' },
    ],
    falseAmigos: [
      { spanish: 'Tengo calor', english: 'I\'m hot (temperature)', trap: '"Estoy caliente" means "I\'m horny" in most dialects, NOT "I\'m hot." Use "Tengo calor" for temperature.' },
    ]
  },
  {
    id: 'cg-15',
    title: 'Pretérito perfecto vs Pretérito indefinido',
    titleEn: 'Present Perfect vs Simple Past — A Regional Divide',
    level: 'B1',
    content: `<h3>Present Perfect vs Simple Past</h3>
<p>In English, "I have eaten" (present perfect) and "I ate" (simple past) are clearly different. In Spanish, it depends on where you are.</p>
<p><strong>Spain:</strong> Uses present perfect (he comido) for recent/today's events:</p>
<ul>
<li><em>Hoy <strong>he comido</strong> paella</em> — Today I've eaten paella</li>
<li><em>Ayer <strong>comí</strong> pizza</em> — Yesterday I ate pizza</li>
</ul>
<p><strong>Latin America:</strong> Uses simple past (comí) for almost everything:</p>
<ul>
<li><em>Hoy <strong>comí</strong> paella</em> — Today I ate paella</li>
<li><em>Ayer <strong>comí</strong> pizza</em> — Yesterday I ate pizza</li>
</ul>
<p><strong>Key insight:</strong> Neither is wrong. If learning Peninsular Spanish, master the present perfect for recent events. If learning Latin American Spanish, the simple past covers more ground.</p>`,
    examples: [
      { spanish: '¿Has visto la nueva película? (Spain)', english: 'Have you seen the new movie?', note: 'Present perfect — common in Spain for recent events' },
      { spanish: '¿Viste la nueva película? (Latin America)', english: 'Did you see the new movie?', note: 'Simple past — standard in Latin America' },
      { spanish: 'Nunca he estado en Japón.', english: 'I\'ve never been to Japan.', note: 'Both regions use present perfect for life experience with "nunca"' },
    ],
    falseAmigos: []
  },

  // ──────────────────────────────────────
  //  B2-C1 — Advanced contrasts
  // ──────────────────────────────────────

  {
    id: 'cg-16',
    title: 'Indicativo vs Subjuntivo en cláusulas relativas',
    titleEn: 'Indicative vs Subjunctive in Relative Clauses',
    level: 'B2',
    content: `<h3>Mood in Relative Clauses</h3>
<p>In English, relative clauses always use indicative: "I'm looking for someone who speaks French." In Spanish, the mood depends on whether the antecedent is known/real or unknown/hypothetical.</p>
<p><strong>Indicative</strong> — the person/thing exists and is known:</p>
<ul>
<li><em>Tengo un amigo que <strong>habla</strong> chino</em> — I have a friend who speaks Chinese (he exists)</li>
</ul>
<p><strong>Subjunctive</strong> — the person/thing is unknown, uncertain, or doesn't exist:</p>
<ul>
<li><em>Busco un amigo que <strong>hable</strong> chino</em> — I'm looking for a friend who speaks Chinese (haven't found one yet)</li>
<li><em>No hay nadie que <strong>sepa</strong> la respuesta</em> — There's no one who knows the answer</li>
</ul>
<p><strong>Why it matters:</strong> This distinction doesn't exist in English and is a hallmark of intermediate-to-advanced Spanish.</p>`,
    examples: [
      { spanish: 'Necesito un médico que hable inglés.', english: 'I need a doctor who speaks English.', note: 'Subjunctive — looking for an unknown person' },
      { spanish: 'Conozco un médico que habla inglés.', english: 'I know a doctor who speaks English.', note: 'Indicative — referring to a specific known person' },
      { spanish: 'No hay nada que puedas hacer.', english: 'There\'s nothing you can do.', note: 'Subjunctive after negative antecedent' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-17',
    title: 'Verbos de cambio',
    titleEn: 'Verbs of Change — Five Ways to Say "To Become"',
    level: 'B2',
    content: `<h3>Verbs of Change (Become)</h3>
<p>English has "to become" for almost all changes. Spanish has at least five different verbs, each for a different type of change.</p>
<ul>
<li><strong>Ponerse</strong> — temporary emotional/physical changes: <em>Se puso rojo</em> (He turned red/blushed)</li>
<li><strong>Volverse</strong> — lasting personality/character changes: <em>Se volvió loco</em> (He went crazy)</li>
<li><strong>Hacerse</strong> — deliberate/gradual changes: <em>Se hizo médico</em> (He became a doctor)</li>
<li><strong>Convertirse en</strong> — fundamental transformations: <em>Se convirtió en un monstruo</em> (He turned into a monster)</li>
<li><strong>Llegar a ser</strong> — achieved status after effort: <em>Llegó a ser presidente</em> (He became president)</li>
</ul>
<p><strong>English speakers' mistake:</strong> Using only one of these for all situations.</p>`,
    examples: [
      { spanish: 'Me puse nervioso antes del examen.', english: 'I got nervous before the exam.', note: 'Ponerse — temporary emotional state' },
      { spanish: 'Se hizo rico con su empresa.', english: 'He became rich with his company.', note: 'Hacerse — gradual change, sometimes deliberate' },
      { spanish: 'Con los años se volvió más amable.', english: 'Over the years he became kinder.', note: 'Volverse — lasting personality change' },
      { spanish: 'El agua se convirtió en vino.', english: 'The water turned into wine.', note: 'Convertirse en — complete transformation' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-18',
    title: 'Quedar(se) y sus múltiples significados',
    titleEn: 'Quedar(se) — One Verb, Many Meanings',
    level: 'B1',
    content: `<h3>Quedar vs Quedarse</h3>
<p>English speakers struggle with this verb because it has no single English equivalent. Context determines everything.</p>
<p><strong>Quedar (non-reflexive):</strong></p>
<ul>
<li><em>Quedan dos manzanas</em> — There are two apples left</li>
<li><em>Quedamos a las cinco</em> — We arranged to meet at five</li>
<li><em>El vestido te queda bien</em> — The dress suits/fits you</li>
<li><em>Queda lejos</em> — It's far (located far)</li>
</ul>
<p><strong>Quedarse (reflexive):</strong></p>
<ul>
<li><em>Me quedé en casa</em> — I stayed home</li>
<li><em>Se quedó dormido</em> — He fell asleep</li>
<li><em>Se quedó sorprendido</em> — He was (left) surprised</li>
<li><em>Quédate con el cambio</em> — Keep the change</li>
</ul>`,
    examples: [
      { spanish: '¿Cuánto queda para llegar?', english: 'How much further is it?', note: 'Quedar = to remain (distance/time)' },
      { spanish: '¿Quedamos mañana?', english: 'Shall we meet up tomorrow?', note: 'Quedar = to arrange to meet (very common in Spain)' },
      { spanish: 'Se quedó sin palabras.', english: 'He was left speechless.', note: 'Quedarse + sin = to be left without' },
      { spanish: 'Ese color te queda genial.', english: 'That color looks great on you.', note: 'Quedar = to look (clothing/style)' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-19',
    title: 'Condicional e hipótesis',
    titleEn: 'Conditionals — "If" Clauses Work Differently',
    level: 'B2',
    content: `<h3>Conditional Sentences</h3>
<p>English and Spanish both have conditional structures, but Spanish uses the subjunctive where English uses indicative or would.</p>
<p><strong>Type 1 — Real/possible (present/future):</strong></p>
<ul>
<li>English: If I have time, I <strong>will</strong> go.</li>
<li>Spanish: Si <strong>tengo</strong> tiempo, <strong>iré</strong>. (indicative + future)</li>
</ul>
<p><strong>Type 2 — Unlikely/hypothetical (present):</strong></p>
<ul>
<li>English: If I had time, I <strong>would</strong> go.</li>
<li>Spanish: Si <strong>tuviera</strong> tiempo, <strong>iría</strong>. (imperfect subjunctive + conditional)</li>
</ul>
<p><strong>Type 3 — Impossible/past:</strong></p>
<ul>
<li>English: If I had had time, I <strong>would have</strong> gone.</li>
<li>Spanish: Si <strong>hubiera tenido</strong> tiempo, <strong>habría ido</strong>. (pluperfect subjunctive + conditional perfect)</li>
</ul>
<p><strong>Key rule:</strong> NEVER use the conditional after "si" in Spanish. "Si tendría" is always wrong (a common learner error).</p>`,
    examples: [
      { spanish: 'Si llueve, no salgo.', english: 'If it rains, I won\'t go out.', note: 'Type 1: present indicative in both clauses' },
      { spanish: 'Si fuera rico, viajaría por el mundo.', english: 'If I were rich, I would travel the world.', note: 'Type 2: imperfect subjunctive + conditional' },
      { spanish: 'Si hubiera estudiado más, habría aprobado.', english: 'If I had studied more, I would have passed.', note: 'Type 3: pluperfect subjunctive + conditional perfect' },
    ],
    falseAmigos: [
      { spanish: 'Si tendría...', english: '(WRONG)', trap: 'NEVER put conditional after "si." This is perhaps the most common grammar error, even among some native speakers in certain regions.' },
    ]
  },
  {
    id: 'cg-20',
    title: 'La voz pasiva y alternativas',
    titleEn: 'Passive Voice — Spanish Prefers Alternatives',
    level: 'B2',
    content: `<h3>Passive Voice</h3>
<p>English uses the passive frequently: "The book was written by Cervantes." Spanish has a passive form but <strong>strongly prefers alternatives</strong>.</p>
<p><strong>True passive (ser + past participle):</strong></p>
<ul><li><em>El libro <strong>fue escrito</strong> por Cervantes</em> — grammatically correct but sounds formal/literary</li></ul>
<p><strong>Preferred alternative — pasiva refleja (se + verb):</strong></p>
<ul>
<li><em><strong>Se venden</strong> pisos</em> — Apartments for sale (literally: "Apartments sell themselves")</li>
<li><em><strong>Se habla</strong> español</em> — Spanish is spoken (here)</li>
<li><em>Aquí <strong>se come</strong> bien</em> — The food is good here / You eat well here</li>
</ul>
<p><strong>Also common — impersonal active:</strong></p>
<ul><li><em>La policía <strong>detuvo</strong> al ladrón</em> — The police arrested the thief (active, not "the thief was arrested")</li></ul>
<p><strong>English speakers' mistake:</strong> Overusing "ser + participle" which sounds stilted in everyday Spanish.</p>`,
    examples: [
      { spanish: 'Se necesitan camareros.', english: 'Waiters needed.', note: 'Pasiva refleja — natural and common' },
      { spanish: 'Fueron detenidos por la policía.', english: 'They were arrested by the police.', note: 'True passive — only in formal/news register' },
      { spanish: 'Se dice que va a nevar.', english: 'They say it\'s going to snow.', note: 'Impersonal "se" — very common' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-21',
    title: 'Los tiempos del pasado: un mapa completo',
    titleEn: 'Past Tenses Map — Five Ways to Talk About the Past',
    level: 'B2',
    content: `<h3>The Full Past Tense System</h3>
<p>English essentially has two past forms (simple past and past perfect). Spanish has <strong>five</strong> indicative past tenses, each with a specific function.</p>
<ol>
<li><strong>Pretérito indefinido</strong> (hablé) — completed past actions</li>
<li><strong>Pretérito imperfecto</strong> (hablaba) — habitual/ongoing past, descriptions</li>
<li><strong>Pretérito perfecto</strong> (he hablado) — recent past with present relevance</li>
<li><strong>Pretérito pluscuamperfecto</strong> (había hablado) — past before another past</li>
<li><strong>Pretérito anterior</strong> (hube hablado) — immediately before another past (literary, rare)</li>
</ol>
<p><strong>Plus subjunctive past tenses:</strong></p>
<ul>
<li><strong>Imperfecto de subjuntivo</strong> (hablara/hablase) — hypotheticals, wishes</li>
<li><strong>Pluscuamperfecto de subjuntivo</strong> (hubiera hablado) — unrealized past</li>
</ul>`,
    examples: [
      { spanish: 'Cuando llegué, ya se había ido.', english: 'When I arrived, he had already left.', note: 'Pluperfect (había ido) for the earlier past event' },
      { spanish: 'De niño, jugaba en ese parque.', english: 'As a child, I used to play in that park.', note: 'Imperfect for habitual past actions' },
      { spanish: 'Esta semana he trabajado mucho.', english: 'This week I\'ve worked a lot.', note: 'Present perfect — the week is still ongoing' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-22',
    title: 'Leísmo, laísmo y loísmo',
    titleEn: 'Le/La/Lo — Regional Pronoun Variation',
    level: 'B2',
    content: `<h3>Direct and Indirect Object Pronouns</h3>
<p>In standard Spanish, the system is:</p>
<ul>
<li><strong>Direct object:</strong> lo/la (him/her/it), los/las (them)</li>
<li><strong>Indirect object:</strong> le (to him/her), les (to them)</li>
</ul>
<p><strong>Leísmo:</strong> Using "le" as a direct object for masculine persons: <em>"<strong>Le</strong> vi en la calle"</em> instead of <em>"<strong>Lo</strong> vi."</em> This is accepted by the RAE for singular masculine persons and is standard in central Spain.</p>
<p><strong>Laísmo:</strong> Using "la" as indirect object: <em>"<strong>La</strong> dije que no"</em> instead of <em>"<strong>Le</strong> dije que no."</em> This is NOT accepted by the RAE but is common in parts of Castile.</p>
<p><strong>Loísmo:</strong> Using "lo" as indirect object. Considered incorrect everywhere.</p>
<p><strong>For learners:</strong> Learn the standard system. Be aware that you will hear "leísmo" frequently in Spain.</p>`,
    examples: [
      { spanish: 'Lo vi ayer. (standard)', english: 'I saw him yesterday.', note: 'Standard: "lo" for masculine direct object' },
      { spanish: 'Le vi ayer. (leísmo)', english: 'I saw him yesterday.', note: 'Leísmo: "le" for masculine person direct object. Accepted in Spain.' },
      { spanish: 'Le di el libro a María.', english: 'I gave the book to María.', note: '"Le" as indirect object — correct everywhere' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-23',
    title: 'Saber vs Conocer',
    titleEn: 'Saber vs Conocer — Two Verbs for "To Know"',
    level: 'A2',
    content: `<h3>Saber vs Conocer</h3>
<p>English has one verb "to know." Spanish distinguishes between two types of knowledge.</p>
<p><strong>Saber</strong> — facts, information, skills (how to do something):</p>
<ul>
<li><em><strong>Sé</strong> la respuesta</em> — I know the answer</li>
<li><em><strong>Sabe</strong> nadar</em> — He knows how to swim</li>
<li><em>No <strong>sé</strong> dónde está</em> — I don't know where it is</li>
</ul>
<p><strong>Conocer</strong> — people, places, familiarity through experience:</p>
<ul>
<li><em><strong>Conozco</strong> a María</em> — I know María (personally)</li>
<li><em><strong>Conoce</strong> Madrid muy bien</em> — She knows Madrid very well (has been there)</li>
<li><em>No <strong>conozco</strong> ese restaurante</em> — I don't know that restaurant (haven't been)</li>
</ul>
<p><strong>Quick test:</strong> Can you replace "know" with "am familiar with"? → conocer. Can you replace it with "am aware of the fact that"? → saber.</p>`,
    examples: [
      { spanish: '¿Sabes dónde vive?', english: 'Do you know where he lives?', note: 'Saber — factual information' },
      { spanish: '¿Conoces a mi hermano?', english: 'Do you know my brother?', note: 'Conocer — personal acquaintance' },
      { spanish: 'No sabía que estabas aquí.', english: 'I didn\'t know you were here.', note: 'Saber — awareness of a fact' },
      { spanish: 'Quiero conocer Japón.', english: 'I want to visit/get to know Japan.', note: 'Conocer — experience a place' },
    ],
    falseAmigos: [
      { spanish: 'Supe la verdad.', english: 'I found out the truth.', trap: '"Saber" in preterite = to find out (not just "I knew"). The meaning shifts with tense.' },
    ]
  },
  {
    id: 'cg-24',
    title: 'El futuro y sus usos especiales',
    titleEn: 'The Future Tense — Not Just for the Future',
    level: 'B1',
    content: `<h3>Special Uses of the Future Tense</h3>
<p>Like English, Spanish uses the future tense for upcoming events. But it also uses it for something English handles differently: <strong>speculation and probability</strong>.</p>
<p><strong>Future of probability (present):</strong></p>
<ul>
<li><em>¿Qué hora <strong>será</strong>?</em> — What time could it be? / I wonder what time it is</li>
<li><em><strong>Tendrá</strong> unos treinta años</em> — He's probably about thirty</li>
<li><em>¿Quién <strong>será</strong> a esta hora?</em> — Who could that be at this hour?</li>
</ul>
<p><strong>Conditional of probability (past):</strong></p>
<ul>
<li><em><strong>Serían</strong> las tres cuando llegó</em> — It was probably around three when he arrived</li>
<li><em><strong>Tendría</strong> unos veinte años</em> — He was probably about twenty</li>
</ul>
<p><strong>English equivalent:</strong> "must be," "probably," "I wonder" — NOT a separate tense.</p>
<p><strong>Note:</strong> In everyday speech, "ir a + infinitive" is often used instead of the future tense: <em>Voy a comer</em> (I'm going to eat) is more common than <em>Comeré</em>.</p>`,
    examples: [
      { spanish: 'Estará en su oficina.', english: 'He\'s probably in his office.', note: 'Future of probability — speculation about the present' },
      { spanish: '¿Será verdad?', english: 'Can it be true? / I wonder if it\'s true.', note: 'Future of probability — expressing doubt' },
      { spanish: 'Habrá unas cien personas.', english: 'There are probably about a hundred people.', note: 'Future of probability — approximate quantity' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-25',
    title: 'Oraciones de relativo con preposición',
    titleEn: 'Relative Clauses with Prepositions — No Dangling Allowed',
    level: 'B2',
    content: `<h3>Prepositions in Relative Clauses</h3>
<p>In English, prepositions can be "stranded" at the end of a relative clause: "The person <strong>I was talking to</strong>." In Spanish, the preposition <strong>must</strong> come before the relative pronoun.</p>
<p><strong>English (informal):</strong> The city <strong>I live in</strong>.</p>
<p><strong>English (formal):</strong> The city <strong>in which</strong> I live.</p>
<p><strong>Spanish (only option):</strong> La ciudad <strong>en la que</strong> vivo. / La ciudad <strong>donde</strong> vivo.</p>
<p><strong>More examples:</strong></p>
<ul>
<li><em>La persona <strong>con la que</strong> hablé</em> — The person I spoke with</li>
<li><em>El tema <strong>del que</strong> hablamos</em> — The topic we talked about</li>
<li><em>La razón <strong>por la que</strong> vino</em> — The reason he came</li>
</ul>
<p><strong>Note:</strong> After a preposition, use "el/la que" (not just "que"): <em>La chica <strong>con la que</strong> salgo</em>, not "con que salgo."</p>`,
    examples: [
      { spanish: 'La silla en la que estás sentado.', english: 'The chair you\'re sitting on.', note: 'Preposition "en" must precede "la que"' },
      { spanish: 'Las personas con las que trabajo.', english: 'The people I work with.', note: 'Preposition "con" precedes "las que"' },
      { spanish: 'El país del que vengo.', english: 'The country I come from.', note: '"De" + "el que" = "del que"' },
    ],
    falseAmigos: []
  },
  {
    id: 'cg-26',
    title: 'El gerundio: diferencias con el inglés',
    titleEn: 'The Gerund — Not an All-Purpose "-ing"',
    level: 'B2',
    content: `<h3>The Gerund (Gerundio)</h3>
<p>English uses "-ing" forms everywhere: as nouns ("Swimming is fun"), adjectives ("a running man"), and verbs ("I am running"). Spanish uses the gerundio (-ando/-iendo) ONLY for ongoing actions. It cannot be a noun or adjective.</p>
<p><strong>Correct uses of the Spanish gerundio:</strong></p>
<ul>
<li>Progressive tenses: <em>Estoy <strong>comiendo</strong></em> — I am eating</li>
<li>Simultaneous action: <em>Entró <strong>cantando</strong></em> — He entered singing</li>
<li>Cause/means: <em><strong>Estudiando</strong> mucho, aprobé</em> — By studying a lot, I passed</li>
</ul>
<p><strong>Where English uses "-ing" but Spanish does NOT use gerundio:</strong></p>
<ul>
<li>Subject: "Swimming is fun" → <em><strong>Nadar</strong> es divertido</em> (infinitive)</li>
<li>After prepositions: "before leaving" → <em>antes de <strong>salir</strong></em> (infinitive)</li>
<li>As adjective: "boiling water" → <em>agua <strong>hirviente</strong></em> (adjective, not gerund)</li>
</ul>`,
    examples: [
      { spanish: 'Me gusta bailar.', english: 'I like dancing.', note: 'Infinitive as object — NOT "me gusta bailando"' },
      { spanish: 'Después de comer, descansamos.', english: 'After eating, we rest.', note: 'Infinitive after preposition — NOT "después de comiendo"' },
      { spanish: 'Estaba leyendo cuando sonó el teléfono.', english: 'I was reading when the phone rang.', note: 'Progressive — correct use of gerundio' },
    ],
    falseAmigos: [
      { spanish: 'una caja conteniendo libros', english: '(INCORRECT)', trap: 'Using the gerundio as an adjective is a common anglicism. Correct: "una caja que contiene libros."' },
    ]
  },
  {
    id: 'cg-27',
    title: 'Diferencias dialectales clave',
    titleEn: 'Key Dialect Differences — Spain vs Latin America',
    level: 'B1',
    content: `<h3>Major Dialect Differences</h3>
<p>Spanish is spoken across 20+ countries. While mutually intelligible, there are key differences learners should know.</p>
<p><strong>Pronunciation:</strong></p>
<ul>
<li><strong>Seseo</strong> (Latin America): "c" before e/i and "z" → [s]. <em>Cerveza</em> = [ser-VE-sa]</li>
<li><strong>Distinción</strong> (most of Spain): "c/z" → [θ] (like English "th"). <em>Cerveza</em> = [ther-VE-tha]</li>
</ul>
<p><strong>Grammar:</strong></p>
<ul>
<li><strong>Vosotros</strong> (Spain only): <em>Vosotros <strong>tenéis</strong></em> — You all have</li>
<li><strong>Ustedes</strong> (Latin America): <em>Ustedes <strong>tienen</strong></em> — You all have</li>
<li><strong>Voseo</strong> (Argentina, Uruguay, Central America): <em>Vos <strong>tenés</strong></em></li>
</ul>
<p><strong>Vocabulary:</strong></p>
<ul>
<li>Car: <em>coche</em> (Spain) / <em>carro</em> (Latin America) / <em>auto</em> (Argentina)</li>
<li>Computer: <em>ordenador</em> (Spain) / <em>computadora</em> (Latin America)</li>
<li>Apartment: <em>piso</em> (Spain) / <em>departamento</em> (Latin America)</li>
<li>Bus: <em>autobús</em> (Spain) / <em>camión</em> (Mexico) / <em>guagua</em> (Caribbean) / <em>colectivo</em> (Argentina)</li>
</ul>`,
    examples: [
      { spanish: '¿Habéis comido? (Spain)', english: 'Have you all eaten?', note: 'Vosotros form — not used in Latin America' },
      { spanish: '¿Han comido? (Latin America)', english: 'Have you all eaten?', note: 'Ustedes form — used for all plural "you"' },
      { spanish: 'Coger el autobús (Spain)', english: 'To catch the bus', note: 'WARNING: "coger" is vulgar in Latin America. Use "tomar" instead.' },
    ],
    falseAmigos: [
      { spanish: 'coger (Spain vs Latin America)', english: 'to catch / to grab', trap: 'In Spain, "coger" means to catch/grab/take. In much of Latin America, it\'s vulgar slang for sex. Use "tomar" or "agarrar" to be safe.' },
    ]
  },
];
