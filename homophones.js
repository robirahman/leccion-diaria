'use strict';

// ════════════════════════════════════════
//  SPANISH HOMOPHONE DRILLS
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
];
