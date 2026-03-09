'use strict';

// ════════════════════════════════════════
//  SPANISH HOMOPHONE DRILLS
//  4 categories, 22 items
//  Words that sound the same but differ
//  in spelling and meaning
// ════════════════════════════════════════

const HOMOPHONE_CATEGORIES = {
  h_muda: {
    id: 'h_muda',
    label: 'Silent H',
    labelEs: 'H muda',
    description: 'The Spanish H is always silent, creating homophones.',
    descriptionEs: 'La H en español siempre es muda, creando homófonos.',
  },
  b_v: {
    id: 'b_v',
    label: 'B / V Homophones',
    labelEs: 'Homófonos B / V',
    description: 'B and V sound identical in Spanish.',
    descriptionEs: 'B y V suenan igual en español.',
  },
  s_c_z: {
    id: 's_c_z',
    label: 'S / C / Z (seseo)',
    labelEs: 'Seseo: S / C / Z',
    description: 'In most of Latin America, S, C (before e/i), and Z all sound the same.',
    descriptionEs: 'En la mayor parte de Latinoamérica, S, C (antes de e/i) y Z suenan igual.',
    regionalNote: 'These are homophones in seseo regions (most of Latin America). In parts of Spain, they sound different.',
    regionalNoteEs: 'Son homófonos en regiones de seseo (la mayor parte de Latinoamérica). En partes de España suenan diferente.',
  },
  accent_meaning: {
    id: 'accent_meaning',
    label: 'Accent Changes Meaning',
    labelEs: 'La tilde cambia el significado',
    description: 'Word pairs spelled almost identically — only the written accent (tilde) distinguishes them. They sound very similar but have completely different grammatical functions.',
    descriptionEs: 'Pares de palabras que se escriben casi igual — solo la tilde las distingue. Suenan muy parecido pero tienen funciones gramaticales completamente distintas.',
  },
};

const HOMOPHONES = [

  // ──────────────────────────────────────
  //  SILENT H  (4 sets)
  // ──────────────────────────────────────

  // A1
  {
    id: 'hom-1',
    category: 'h_muda',
    level: 'A1',
    words: [
      { word: 'hola', meaning: 'hello', meaningEs: 'saludo informal', pos: 'interjection' },
      { word: 'ola', meaning: 'wave', meaningEs: 'onda en el mar', pos: 'noun' },
    ],
    pronunciation: '/ˈo.la/',
    tip: 'The H in "hola" is silent. Both words sound exactly the same.',
    tipEs: 'La H de "hola" es muda. Ambas palabras suenan exactamente igual.',
    examples: [
      { sentence: '¡___! ¿Cómo estás?', answer: 'Hola', english: 'Hello! How are you?' },
      { sentence: 'La ___ del mar era enorme.', answer: 'ola', english: 'The ocean wave was enormous.' },
    ],
  },
  {
    id: 'hom-2',
    category: 'h_muda',
    level: 'A1',
    words: [
      { word: 'hay', meaning: 'there is / there are', meaningEs: 'forma impersonal de haber', pos: 'verb' },
      { word: '¡ay!', meaning: 'ouch! / oh!', meaningEs: 'exclamación de dolor o sorpresa', pos: 'interjection' },
    ],
    pronunciation: '/ai/',
    tip: '"Hay" (there is) starts with a silent H. "¡Ay!" is an exclamation of pain or surprise.',
    tipEs: '"Hay" (haber impersonal) empieza con H muda. "¡Ay!" es una exclamación de dolor o sorpresa.',
    examples: [
      { sentence: '___ muchos libros en la estantería.', answer: 'Hay', english: 'There are many books on the shelf.' },
      { sentence: '¡___! Me picó una abeja.', answer: 'Ay', english: 'Ouch! A bee stung me.' },
    ],
  },

  // A2
  {
    id: 'hom-3',
    category: 'h_muda',
    level: 'A2',
    words: [
      { word: 'echo', meaning: 'I throw / I pour', meaningEs: 'primera persona de echar', pos: 'verb' },
      { word: 'hecho', meaning: 'fact / done / made', meaningEs: 'participio de hacer / sustantivo', pos: 'noun/participle' },
    ],
    pronunciation: '/ˈe.tʃo/',
    tip: '"Echo" is from echar (to throw/pour). "Hecho" is from hacer (to do/make) or means "fact".',
    tipEs: '"Echo" es de echar. "Hecho" es de hacer o significa "dato verificable".',
    examples: [
      { sentence: 'Yo siempre le ___ azúcar al café.', answer: 'echo', english: 'I always add sugar to my coffee.' },
      { sentence: 'El trabajo ya está ___.', answer: 'hecho', english: 'The work is already done.' },
      { sentence: 'Es un ___ conocido por todos.', answer: 'hecho', english: 'It is a fact known by everyone.' },
    ],
  },
  {
    id: 'hom-4',
    category: 'h_muda',
    level: 'A2',
    words: [
      { word: 'a ver', meaning: "let's see", meaningEs: 'expresión para examinar algo', pos: 'phrase' },
      { word: 'haber', meaning: 'to have (auxiliary) / to exist', meaningEs: 'verbo auxiliar o existencial', pos: 'verb' },
    ],
    pronunciation: '/a.ˈbeɾ/',
    tip: '"A ver" means "let\'s see" (two words). "Haber" is the auxiliary verb (to have) or means "to exist".',
    tipEs: '"A ver" se usa para examinar algo. "Haber" es el verbo auxiliar o existencial.',
    examples: [
      { sentence: '___, ¿qué tienes ahí?', answer: 'A ver', english: "Let's see, what do you have there?" },
      { sentence: 'Debe ___ una solución mejor.', answer: 'haber', english: 'There must be a better solution.' },
    ],
  },

  // ──────────────────────────────────────
  //  B / V HOMOPHONES  (4 sets)
  // ──────────────────────────────────────

  // B1
  {
    id: 'hom-5',
    category: 'b_v',
    level: 'B1',
    words: [
      { word: 'bello', meaning: 'beautiful', meaningEs: 'hermoso', pos: 'adjective' },
      { word: 'vello', meaning: 'body hair / fuzz', meaningEs: 'pelo fino del cuerpo', pos: 'noun' },
    ],
    pronunciation: '/ˈbe.ʝo/',
    tip: 'B and V are pronounced identically in Spanish. "Bello" (with B) means beautiful; "vello" (with V) means body hair.',
    tipEs: 'B y V se pronuncian igual en español. "Bello" (con B) significa hermoso; "vello" (con V) significa pelo fino.',
    examples: [
      { sentence: 'El paisaje es muy ___.', answer: 'bello', english: 'The landscape is very beautiful.' },
      { sentence: 'El ___ de los brazos es casi invisible.', answer: 'vello', english: 'The arm hair is almost invisible.' },
    ],
  },
  {
    id: 'hom-6',
    category: 'b_v',
    level: 'B1',
    words: [
      { word: 'tubo', meaning: 'tube / pipe', meaningEs: 'cilindro hueco', pos: 'noun' },
      { word: 'tuvo', meaning: 'he/she had', meaningEs: 'pretérito de tener', pos: 'verb' },
    ],
    pronunciation: '/ˈtu.bo/',
    tip: '"Tubo" (with B) is a tube or pipe. "Tuvo" (with V) is the preterite of tener (to have).',
    tipEs: '"Tubo" (con B) es un cilindro. "Tuvo" (con V) es el pretérito de tener.',
    examples: [
      { sentence: 'El agua pasa por el ___.', answer: 'tubo', english: 'The water goes through the tube.' },
      { sentence: 'Ella ___ mucha suerte ayer.', answer: 'tuvo', english: 'She had a lot of luck yesterday.' },
    ],
  },
  {
    id: 'hom-7',
    category: 'b_v',
    level: 'B1',
    words: [
      { word: 'hierba', meaning: 'grass / herb', meaningEs: 'planta verde / hierba aromática', pos: 'noun' },
      { word: 'hierva', meaning: 'boil (subjunctive)', meaningEs: 'subjuntivo de hervir', pos: 'verb' },
    ],
    pronunciation: '/ˈʝeɾ.ba/',
    tip: '"Hierba" (with B) is grass or herb. "Hierva" (with V) is the subjunctive of hervir (to boil).',
    tipEs: '"Hierba" (con B) es vegetación. "Hierva" (con V) es el subjuntivo de hervir.',
    examples: [
      { sentence: 'El jardín tiene ___ fresca.', answer: 'hierba', english: 'The garden has fresh grass.' },
      { sentence: 'Espera a que el agua ___.', answer: 'hierva', english: 'Wait for the water to boil.' },
    ],
  },
  {
    id: 'hom-8',
    category: 'b_v',
    level: 'B1',
    words: [
      { word: 'vaya', meaning: 'go (subjunctive) / wow', meaningEs: 'subjuntivo de ir / exclamación', pos: 'verb/interjection' },
      { word: 'valla', meaning: 'fence / billboard', meaningEs: 'cerca / cartel publicitario', pos: 'noun' },
      { word: 'baya', meaning: 'berry', meaningEs: 'fruto pequeño y carnoso', pos: 'noun' },
    ],
    pronunciation: '/ˈba.ʝa/',
    tip: 'All three sound identical due to the B/V merger and ll/y equivalence (yeísmo). Context determines spelling.',
    tipEs: 'Las tres suenan igual por la equivalencia b/v y ll/y (yeísmo). El contexto determina la escritura.',
    examples: [
      { sentence: 'No creo que ___ a llover hoy.', answer: 'vaya', english: "I don't think it's going to rain today." },
      { sentence: '¡___! ¡Qué sorpresa!', answer: 'Vaya', english: 'Wow! What a surprise!' },
      { sentence: 'El perro saltó la ___.', answer: 'valla', english: 'The dog jumped the fence.' },
      { sentence: 'Encontré una ___ silvestre en el bosque.', answer: 'baya', english: 'I found a wild berry in the forest.' },
    ],
  },

  // ──────────────────────────────────────
  //  S / C / Z — SESEO  (2 sets)
  // ──────────────────────────────────────

  // B2
  {
    id: 'hom-9',
    category: 's_c_z',
    level: 'B2',
    words: [
      { word: 'cierra', meaning: 'closes / close (command)', meaningEs: 'tercera persona o imperativo de cerrar', pos: 'verb' },
      { word: 'sierra', meaning: 'mountain range / saw', meaningEs: 'cadena de montañas / herramienta de corte', pos: 'noun' },
    ],
    pronunciation: '/ˈsje.ra/',
    tip: '"Cierra" is from cerrar (to close). "Sierra" is a mountain range or a saw. In seseo regions, both sound the same.',
    tipEs: '"Cierra" es de cerrar. "Sierra" es una cadena montañosa o herramienta. En zonas de seseo, suenan igual.',
    regionalNote: 'Homophones in seseo regions (Latin America, southern Spain). In central/northern Spain, "cierra" has /θ/ and "sierra" has /s/.',
    regionalNoteEs: 'Homófonos en zonas de seseo. En el centro y norte de España, "cierra" tiene /θ/ y "sierra" tiene /s/.',
    examples: [
      { sentence: '___ la puerta, por favor.', answer: 'Cierra', english: 'Close the door, please.' },
      { sentence: 'Fuimos a esquiar a la ___.', answer: 'sierra', english: 'We went skiing in the mountains.' },
    ],
  },
  {
    id: 'hom-10',
    category: 's_c_z',
    level: 'B2',
    words: [
      { word: 'asta', meaning: 'horn / flagpole', meaningEs: 'cuerno / palo de bandera', pos: 'noun' },
      { word: 'hasta', meaning: 'until / up to', meaningEs: 'preposición de límite', pos: 'preposition' },
    ],
    pronunciation: '/ˈas.ta/',
    tip: '"Asta" (no H) is a horn or flagpole. "Hasta" (with silent H) means "until" or "up to".',
    tipEs: '"Asta" (sin H) es un cuerno o mástil. "Hasta" (con H muda) es una preposición de límite.',
    examples: [
      { sentence: 'La bandera ondea en el ___.', answer: 'asta', english: 'The flag waves on the flagpole.' },
      { sentence: 'Trabajé ___ las diez de la noche.', answer: 'hasta', english: 'I worked until ten at night.' },
    ],
  },

  // ──────────────────────────────────────
  //  ACCENT CHANGES MEANING  (12 sets)
  // ──────────────────────────────────────

  // A1
  {
    id: 'hom-11',
    category: 'accent_meaning',
    level: 'A1',
    words: [
      { word: 'el', meaning: 'the (masculine article)', meaningEs: 'artículo definido masculino', pos: 'article' },
      { word: 'él', meaning: 'he, him', meaningEs: 'pronombre personal de tercera persona', pos: 'pronoun' },
    ],
    pronunciation: '/el/',
    tip: '"El" is the masculine article (the). "Él" with an accent is the pronoun "he/him".',
    tipEs: '"El" es el artículo masculino. "Él" con tilde es el pronombre personal.',
    examples: [
      { sentence: '___ libro es nuevo.', answer: 'El', english: 'The book is new.' },
      { sentence: '___ es mi mejor amigo.', answer: 'Él', english: 'He is my best friend.' },
    ],
  },
  {
    id: 'hom-12',
    category: 'accent_meaning',
    level: 'A1',
    words: [
      { word: 'tu', meaning: 'your (informal possessive)', meaningEs: 'posesivo informal de segunda persona', pos: 'adjective' },
      { word: 'tú', meaning: 'you (subject pronoun)', meaningEs: 'pronombre personal de segunda persona', pos: 'pronoun' },
    ],
    pronunciation: '/tu/',
    tip: '"Tu" without accent is possessive "your". "Tú" with accent is the subject pronoun "you".',
    tipEs: '"Tu" sin tilde es posesivo. "Tú" con tilde es pronombre personal.',
    examples: [
      { sentence: '___ casa es muy bonita.', answer: 'Tu', english: 'Your house is very pretty.' },
      { sentence: '___ eres muy amable.', answer: 'Tú', english: 'You are very kind.' },
    ],
  },
  {
    id: 'hom-13',
    category: 'accent_meaning',
    level: 'A1',
    words: [
      { word: 'mi', meaning: 'my (possessive)', meaningEs: 'posesivo de primera persona', pos: 'adjective' },
      { word: 'mí', meaning: 'me (prepositional pronoun)', meaningEs: 'pronombre preposicional de primera persona', pos: 'pronoun' },
    ],
    pronunciation: '/mi/',
    tip: '"Mi" without accent is possessive "my". "Mí" with accent is used after prepositions: "para mí", "a mí".',
    tipEs: '"Mi" sin tilde es posesivo. "Mí" con tilde va después de preposiciones: "para mí", "a mí".',
    examples: [
      { sentence: '___ gato duerme mucho.', answer: 'Mi', english: 'My cat sleeps a lot.' },
      { sentence: 'Este regalo es para ___.', answer: 'mí', english: 'This gift is for me.' },
    ],
  },
  {
    id: 'hom-14',
    category: 'accent_meaning',
    level: 'A1',
    words: [
      { word: 'si', meaning: 'if (conjunction)', meaningEs: 'conjunción condicional', pos: 'conjunction' },
      { word: 'sí', meaning: 'yes; oneself (reflexive)', meaningEs: 'afirmación; pronombre reflexivo', pos: 'adverb' },
    ],
    pronunciation: '/si/',
    tip: '"Si" without accent means "if". "Sí" with accent means "yes" or reflexive "oneself" (e.g., "para sí mismo").',
    tipEs: '"Si" sin tilde significa "si condicional". "Sí" con tilde es afirmación o pronombre reflexivo.',
    examples: [
      { sentence: '___ llueve, no vamos al parque.', answer: 'Si', english: 'If it rains, we\'re not going to the park.' },
      { sentence: '___,  quiero ir contigo.', answer: 'Sí', english: 'Yes, I want to go with you.' },
    ],
  },

  // A2
  {
    id: 'hom-15',
    category: 'accent_meaning',
    level: 'A2',
    words: [
      { word: 'de', meaning: 'of, from (preposition)', meaningEs: 'preposición de origen o pertenencia', pos: 'preposition' },
      { word: 'dé', meaning: 'give (subjunctive/imperative of dar)', meaningEs: 'subjuntivo/imperativo de dar', pos: 'verb' },
    ],
    pronunciation: '/de/',
    tip: '"De" is the preposition "of/from". "Dé" with accent is the subjunctive or command form of "dar" (to give).',
    tipEs: '"De" es preposición. "Dé" con tilde es el subjuntivo o imperativo de "dar".',
    examples: [
      { sentence: 'La casa ___ mi abuela es grande.', answer: 'de', english: 'My grandmother\'s house is big.' },
      { sentence: 'Espero que me ___ una oportunidad.', answer: 'dé', english: 'I hope he gives me an opportunity.' },
    ],
  },
  {
    id: 'hom-16',
    category: 'accent_meaning',
    level: 'A2',
    words: [
      { word: 'se', meaning: 'reflexive pronoun (himself, herself, itself)', meaningEs: 'pronombre reflexivo de tercera persona', pos: 'pronoun' },
      { word: 'sé', meaning: 'I know (saber); be! (ser imperative)', meaningEs: 'primera persona de saber; imperativo de ser', pos: 'verb' },
    ],
    pronunciation: '/se/',
    tip: '"Se" is the reflexive pronoun. "Sé" means "I know" (from saber) or "be!" (imperative of ser).',
    tipEs: '"Se" es pronombre reflexivo. "Sé" es primera persona de saber o imperativo de ser.',
    examples: [
      { sentence: 'Ella ___ levanta temprano.', answer: 'se', english: 'She gets up early.' },
      { sentence: 'No ___ la respuesta.', answer: 'sé', english: 'I don\'t know the answer.' },
      { sentence: '___ amable con todos.', answer: 'Sé', english: 'Be kind to everyone.' },
    ],
  },
  {
    id: 'hom-17',
    category: 'accent_meaning',
    level: 'A2',
    words: [
      { word: 'mas', meaning: 'but (literary synonym for pero)', meaningEs: 'conjunción adversativa literaria (sinónimo de pero)', pos: 'conjunction' },
      { word: 'más', meaning: 'more', meaningEs: 'adverbio de cantidad', pos: 'adverb' },
    ],
    pronunciation: '/mas/',
    tip: '"Mas" without accent is a literary/formal word for "but" (rarely used in speech). "Más" with accent means "more".',
    tipEs: '"Mas" sin tilde es sinónimo literario de "pero". "Más" con tilde significa "more".',
    examples: [
      { sentence: 'Lo intenté, ___ no pude.', answer: 'mas', english: 'I tried, but I couldn\'t.' },
      { sentence: 'Quiero ___ café, por favor.', answer: 'más', english: 'I want more coffee, please.' },
    ],
  },
  {
    id: 'hom-18',
    category: 'accent_meaning',
    level: 'A2',
    words: [
      { word: 'te', meaning: 'you (object/reflexive pronoun)', meaningEs: 'pronombre de objeto o reflexivo de segunda persona', pos: 'pronoun' },
      { word: 'té', meaning: 'tea', meaningEs: 'bebida caliente de hojas', pos: 'noun' },
    ],
    pronunciation: '/te/',
    tip: '"Te" is the object/reflexive pronoun "you" (e.g., "te quiero"). "Té" with accent is the drink "tea".',
    tipEs: '"Te" es pronombre de objeto o reflexivo. "Té" con tilde es la bebida.',
    examples: [
      { sentence: '___ quiero mucho.', answer: 'Te', english: 'I love you very much.' },
      { sentence: '¿Quieres una taza de ___?', answer: 'té', english: 'Do you want a cup of tea?' },
    ],
  },
  {
    id: 'hom-19',
    category: 'accent_meaning',
    level: 'A2',
    words: [
      { word: 'aun', meaning: 'even, including', meaningEs: 'incluso, hasta', pos: 'adverb' },
      { word: 'aún', meaning: 'still, yet', meaningEs: 'todavía', pos: 'adverb' },
    ],
    pronunciation: '/a.ˈun/',
    tip: '"Aun" (one syllable, means "even/including") vs "aún" (two syllables, means "still/yet"). This pair also differs in stress.',
    tipEs: '"Aun" (una sílaba, significa "incluso") vs "aún" (dos sílabas, significa "todavía"). Este par también difiere en acentuación.',
    examples: [
      { sentence: '___ los expertos se equivocan a veces.', answer: 'Aun', english: 'Even experts make mistakes sometimes.' },
      { sentence: '___ no ha llegado el paquete.', answer: 'Aún', english: 'The package hasn\'t arrived yet.' },
    ],
  },
  {
    id: 'hom-20',
    category: 'accent_meaning',
    level: 'A2',
    words: [
      { word: 'que', meaning: 'that (conjunction/relative pronoun)', meaningEs: 'conjunción o pronombre relativo', pos: 'conjunction' },
      { word: 'qué', meaning: 'what, how (interrogative/exclamatory)', meaningEs: 'pronombre interrogativo o exclamativo', pos: 'pronoun' },
    ],
    pronunciation: '/ke/',
    tip: '"Que" without accent is a conjunction ("creo que...") or relative pronoun. "Qué" with accent is used in questions and exclamations.',
    tipEs: '"Que" sin tilde es conjunción o relativo. "Qué" con tilde se usa en preguntas y exclamaciones.',
    examples: [
      { sentence: 'Creo ___ tienes razón.', answer: 'que', english: 'I think that you\'re right.' },
      { sentence: '¡___ bonito día!', answer: 'Qué', english: 'What a beautiful day!' },
    ],
  },

  // B1
  {
    id: 'hom-21',
    category: 'accent_meaning',
    level: 'B1',
    words: [
      { word: 'como', meaning: 'like, as; I eat (from comer)', meaningEs: 'comparación; primera persona de comer', pos: 'conjunction/verb' },
      { word: 'cómo', meaning: 'how (interrogative/exclamatory)', meaningEs: 'adverbio interrogativo o exclamativo', pos: 'adverb' },
    ],
    pronunciation: '/ˈko.mo/',
    tip: '"Como" without accent means "like/as" or "I eat". "Cómo" with accent is used in questions and exclamations: "¿Cómo estás?"',
    tipEs: '"Como" sin tilde es comparación o primera persona de comer. "Cómo" con tilde es interrogativo o exclamativo.',
    examples: [
      { sentence: 'Cocino ___ mi mamá.', answer: 'como', english: 'I cook like my mom.' },
      { sentence: '¿___ se llama tu perro?', answer: 'Cómo', english: 'What is your dog\'s name?' },
    ],
  },
  {
    id: 'hom-22',
    category: 'accent_meaning',
    level: 'B1',
    words: [
      { word: 'donde', meaning: 'where (relative adverb)', meaningEs: 'adverbio relativo de lugar', pos: 'adverb' },
      { word: 'dónde', meaning: 'where (interrogative)', meaningEs: 'adverbio interrogativo de lugar', pos: 'adverb' },
    ],
    pronunciation: '/ˈdon.de/',
    tip: '"Donde" without accent is a relative adverb ("la ciudad donde nací"). "Dónde" with accent is for questions: "¿Dónde estás?"',
    tipEs: '"Donde" sin tilde es relativo ("la ciudad donde nací"). "Dónde" con tilde es interrogativo: "¿Dónde estás?"',
    examples: [
      { sentence: 'La ciudad ___ nací es pequeña.', answer: 'donde', english: 'The city where I was born is small.' },
      { sentence: '¿___ está el baño?', answer: 'Dónde', english: 'Where is the bathroom?' },
    ],
  },
];
