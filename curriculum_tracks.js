// ═══════════════════════════════════════════════════════════
//  CURRICULUM TRACKS — Structured learning paths
//  Ordered by difficulty: Travel → Romance → History →
//  Science → Law → Philosophy
// ═══════════════════════════════════════════════════════════

const CURRICULUM_TRACKS = [
  // ─── Track 1: Travel (A1–A2) ───────────────────────────
  {
    id: 'track-travel',
    order: 1,
    title: 'El Viajero',
    titleEn: 'The Traveler',
    icon: '✈️',
    level: 'A1–A2',
    color: '#4CAF50',
    grammarFocus: 'Present tense, basic questions, articles',
    description: 'Everything you need for your first trip to a Spanish-speaking country — greetings, ordering food, getting around, and exploring cities.',
    descriptionEs: 'Todo lo que necesitas para tu primer viaje a un país hispanohablante — saludos, pedir comida, moverse y explorar ciudades.',
    modules: [
      { id: 'travel-m1', title: 'Greetings & Basics', titleEs: 'Saludos y lo básico', type: 'vocab', ref: { category: 'greetings' } },
      { id: 'travel-m2', title: 'Present Tense: -ar Verbs', titleEs: 'Presente: verbos -ar', type: 'grammar', ref: { grammarId: 'gram-8' } },
      { id: 'travel-m3', title: 'Present Tense: -er/-ir Verbs', titleEs: 'Presente: verbos -er/-ir', type: 'grammar', ref: { grammarId: 'gram-9' } },
      { id: 'travel-m4', title: 'At the Airport', titleEs: 'En el aeropuerto', type: 'themed', ref: { themedId: 'theme-airport' } },
      { id: 'travel-m5', title: 'At the Restaurant', titleEs: 'En el restaurante', type: 'themed', ref: { themedId: 'theme-restaurant' } },
      { id: 'travel-m6', title: 'Restaurant Conversation', titleEs: 'Conversación en restaurante', type: 'conversation', ref: { module: 'conversations', itemId: 'restaurant-1' } },
      { id: 'travel-m7', title: 'Question Words', titleEs: 'Palabras interrogativas', type: 'grammar', ref: { grammarId: 'gram-12' } },
      { id: 'travel-m8', title: 'At the Hotel', titleEs: 'En el hotel', type: 'themed', ref: { themedId: 'theme-hotel' } },
      { id: 'travel-m9', title: 'Travel Vocabulary', titleEs: 'Vocabulario de viajes', type: 'vocab', ref: { category: 'travel' } },
      { id: 'travel-m10', title: 'At the Train Station', titleEs: 'En la estación de tren', type: 'themed', ref: { themedId: 'theme-train-station' } },
      { id: 'travel-m11', title: 'Mexico City', titleEs: 'Ciudad de México', type: 'culture', ref: { module: 'travel', itemId: 'travel-mexico-city' } },
      { id: 'travel-m12', title: 'Buenos Aires', titleEs: 'Buenos Aires', type: 'culture', ref: { module: 'travel', itemId: 'travel-buenos-aires' } },
      { id: 'travel-m13', title: 'Reading: A Trip to Barcelona', titleEs: 'Lectura: Un viaje a Barcelona', type: 'reading', ref: { readingId: 'read-6' } },
    ]
  },

  // ─── Track 2: Romance (A1–B1) ──────────────────────────
  {
    id: 'track-romance',
    order: 2,
    title: 'Corazón',
    titleEn: 'Heart',
    icon: '❤️',
    level: 'A1–B1',
    color: '#E91E63',
    grammarFocus: 'Ser vs. estar, adjective agreement, gustar, reflexive verbs',
    description: 'Express your feelings, describe people, talk about relationships, and immerse yourself in the passion of Spanish-speaking culture.',
    descriptionEs: 'Expresa tus sentimientos, describe personas, habla de relaciones y sumérgete en la pasión de la cultura hispana.',
    modules: [
      { id: 'romance-m1', title: 'Family Vocabulary', titleEs: 'Vocabulario de familia', type: 'vocab', ref: { category: 'family' } },
      { id: 'romance-m2', title: 'Ser vs. Estar', titleEs: 'Ser vs. Estar', type: 'grammar', ref: { grammarId: 'gram-7' } },
      { id: 'romance-m3', title: 'Adjective Agreement', titleEs: 'Concordancia de adjetivos', type: 'grammar', ref: { grammarId: 'gram-10' } },
      { id: 'romance-m4', title: 'Emotions & Feelings', titleEs: 'Emociones y sentimientos', type: 'vocab', ref: { category: 'emotions' } },
      { id: 'romance-m5', title: 'Reflexive Verbs', titleEs: 'Verbos reflexivos', type: 'grammar', ref: { grammarId: 'gram-14' } },
      { id: 'romance-m6', title: 'Gustar & Similar Verbs', titleEs: 'Gustar y verbos similares', type: 'grammar', ref: { grammarId: 'gram-15' } },
      { id: 'romance-m7', title: 'Making Plans', titleEs: 'Haciendo planes', type: 'conversation', ref: { module: 'conversations', itemId: 'planes-1' } },
      { id: 'romance-m8', title: 'A Date', titleEs: 'Una cita', type: 'conversation', ref: { module: 'conversations', itemId: 'cita-1' } },
      { id: 'romance-m9', title: 'Bolero Music', titleEs: 'El bolero', type: 'culture', ref: { module: 'music', itemId: 'music-bolero' } },
      { id: 'romance-m10', title: 'Pablo Neruda', titleEs: 'Pablo Neruda', type: 'culture', ref: { module: 'poetry', itemId: 'poetry-neruda' } },
      { id: 'romance-m11', title: 'Reading: The Birthday Party', titleEs: 'Lectura: La fiesta de cumpleaños', type: 'reading', ref: { readingId: 'read-8' } },
      { id: 'romance-m12', title: 'Día de los Muertos', titleEs: 'Día de los Muertos', type: 'culture', ref: { module: 'festivals', itemId: 'festival-dia-muertos' } },
    ]
  },

  // ─── Track 3: History (A2–B2) ──────────────────────────
  {
    id: 'track-history',
    order: 3,
    title: 'Crónicas',
    titleEn: 'Chronicles',
    icon: '📜',
    level: 'A2–B2',
    color: '#795548',
    grammarFocus: 'Preterite, imperfect, preterite vs. imperfect',
    description: 'Narrate the past — from ancient civilizations to modern revolutions. Master the past tenses through the lens of history.',
    descriptionEs: 'Narra el pasado — desde civilizaciones antiguas hasta revoluciones modernas. Domina los tiempos pasados a través de la historia.',
    modules: [
      { id: 'history-m1', title: 'Society & Politics Vocabulary', titleEs: 'Vocabulario de sociedad y política', type: 'vocab', ref: { category: 'society' } },
      { id: 'history-m2', title: 'Preterite Tense (Regular)', titleEs: 'El pretérito regular', type: 'grammar', ref: { grammarId: 'gram-18' } },
      { id: 'history-m3', title: 'The Aztec Empire', titleEs: 'El Imperio Azteca', type: 'culture', ref: { module: 'history', itemId: 'history-aztec' } },
      { id: 'history-m4', title: 'Preterite Tense (Irregular)', titleEs: 'El pretérito irregular', type: 'grammar', ref: { grammarId: 'gram-19' } },
      { id: 'history-m5', title: 'The Inca Empire', titleEs: 'El Imperio Inca', type: 'culture', ref: { module: 'history', itemId: 'history-inca' } },
      { id: 'history-m6', title: 'Imperfect Tense', titleEs: 'El imperfecto', type: 'grammar', ref: { grammarId: 'gram-20' } },
      { id: 'history-m7', title: 'Maya Civilization', titleEs: 'La civilización maya', type: 'culture', ref: { module: 'history', itemId: 'history-maya' } },
      { id: 'history-m8', title: 'Preterite vs. Imperfect', titleEs: 'Pretérito vs. imperfecto', type: 'grammar', ref: { grammarId: 'gram-21' } },
      { id: 'history-m9', title: 'Independence Movements', titleEs: 'Movimientos de independencia', type: 'culture', ref: { module: 'history', itemId: 'history-independencia' } },
      { id: 'history-m10', title: 'Mexican Revolution', titleEs: 'La Revolución Mexicana', type: 'culture', ref: { module: 'history', itemId: 'history-revolucion-mexicana' } },
      { id: 'history-m11', title: 'Literary Vocabulary', titleEs: 'Vocabulario literario', type: 'vocab', ref: { category: 'literary' } },
      { id: 'history-m12', title: 'Reading: Argentine Tango', titleEs: 'Lectura: El tango argentino', type: 'reading', ref: { readingId: 'read-11' } },
      { id: 'history-m13', title: 'At the Market', titleEs: 'En el mercado', type: 'conversation', ref: { module: 'conversations', itemId: 'mercado-1' } },
    ]
  },

  // ─── Track 4: Science (B1–B2) ──────────────────────────
  {
    id: 'track-science',
    order: 4,
    title: 'Descubrimientos',
    titleEn: 'Discoveries',
    icon: '🔬',
    level: 'B1–B2',
    color: '#2196F3',
    grammarFocus: 'Future tense, present perfect, passive voice',
    description: 'Discuss science, technology, health, and the environment. Learn to describe processes and make predictions in Spanish.',
    descriptionEs: 'Habla de ciencia, tecnología, salud y medio ambiente. Aprende a describir procesos y hacer predicciones en español.',
    modules: [
      { id: 'science-m1', title: 'Scientific Vocabulary', titleEs: 'Vocabulario científico', type: 'vocab', ref: { category: 'scientific' } },
      { id: 'science-m2', title: 'Future Simple Tense', titleEs: 'El futuro simple', type: 'grammar', ref: { grammarId: 'gram-23' } },
      { id: 'science-m3', title: 'Technology Vocabulary', titleEs: 'Vocabulario de tecnología', type: 'vocab', ref: { category: 'technology' } },
      { id: 'science-m4', title: 'Present Perfect', titleEs: 'El pretérito perfecto', type: 'grammar', ref: { grammarId: 'gram-31' } },
      { id: 'science-m5', title: 'At the Doctor\'s Office', titleEs: 'En el consultorio médico', type: 'themed', ref: { themedId: 'theme-doctor' } },
      { id: 'science-m6', title: 'At the Pharmacy', titleEs: 'En la farmacia', type: 'themed', ref: { themedId: 'theme-pharmacy' } },
      { id: 'science-m7', title: 'Passive Voice', titleEs: 'La voz pasiva', type: 'grammar', ref: { grammarId: 'gram-32' } },
      { id: 'science-m8', title: 'Nature & Environment', titleEs: 'Naturaleza y medio ambiente', type: 'vocab', ref: { category: 'nature' } },
      { id: 'science-m9', title: 'Environment Vocabulary', titleEs: 'Vocabulario ambiental', type: 'vocab', ref: { category: 'environment' } },
      { id: 'science-m10', title: 'Pharmacy Conversation', titleEs: 'Conversación en la farmacia', type: 'conversation', ref: { module: 'conversations', itemId: 'farmacia-1' } },
      { id: 'science-m11', title: 'Galápagos Islands', titleEs: 'Las Islas Galápagos', type: 'culture', ref: { module: 'travel', itemId: 'travel-galapagos' } },
      { id: 'science-m12', title: 'Reading: AI and Employment', titleEs: 'Lectura: La IA y el empleo', type: 'reading', ref: { readingId: 'read-16' } },
      { id: 'science-m13', title: 'Reading: Climate Change in Latin America', titleEs: 'Lectura: El cambio climático', type: 'reading', ref: { readingId: 'read-19' } },
    ]
  },

  // ─── Track 5: Law (B1–C1) ─────────────────────────────
  {
    id: 'track-law',
    order: 5,
    title: 'La Ley',
    titleEn: 'The Law',
    icon: '⚖️',
    level: 'B1–C1',
    color: '#607D8B',
    grammarFocus: 'Conditional, commands, register & formality',
    description: 'Navigate formal and professional Spanish — legal terminology, business settings, debates, and formal register.',
    descriptionEs: 'Navega el español formal y profesional — terminología legal, entornos de negocios, debates y registro formal.',
    modules: [
      { id: 'law-m1', title: 'Legal & Political Vocabulary', titleEs: 'Vocabulario legal y político', type: 'vocab', ref: { category: 'legal' } },
      { id: 'law-m2', title: 'Conditional Tense', titleEs: 'El condicional', type: 'grammar', ref: { grammarId: 'gram-24' } },
      { id: 'law-m3', title: 'Business Vocabulary', titleEs: 'Vocabulario de negocios', type: 'vocab', ref: { category: 'business' } },
      { id: 'law-m4', title: 'Commands (Imperative)', titleEs: 'Los mandatos', type: 'grammar', ref: { grammarId: 'gram-27' } },
      { id: 'law-m5', title: 'Job Interview', titleEs: 'Entrevista de trabajo', type: 'conversation', ref: { module: 'conversations', itemId: 'entrevista-1' } },
      { id: 'law-m6', title: 'At the Bank', titleEs: 'En el banco', type: 'themed', ref: { themedId: 'theme-bank' } },
      { id: 'law-m7', title: 'Register & Formality', titleEs: 'Registro y formalidad', type: 'grammar', ref: { grammarId: 'gram-52' } },
      { id: 'law-m8', title: 'Spanish Civil War', titleEs: 'La Guerra Civil Española', type: 'culture', ref: { module: 'history', itemId: 'history-guerra-civil-espanola' } },
      { id: 'law-m9', title: 'Cuban Revolution', titleEs: 'La Revolución Cubana', type: 'culture', ref: { module: 'history', itemId: 'history-revolucion-cubana' } },
      { id: 'law-m10', title: 'Resolving a Problem', titleEs: 'Resolviendo un problema', type: 'conversation', ref: { module: 'conversations', itemId: 'queja-1' } },
      { id: 'law-m11', title: 'Reading: Historical Memory in Spain', titleEs: 'Lectura: La memoria histórica', type: 'reading', ref: { readingId: 'read-20' } },
      { id: 'law-m12', title: 'Political Debate', titleEs: 'Debate político', type: 'conversation', ref: { module: 'conversations', itemId: 'debate-politico-c1' } },
      { id: 'law-m13', title: 'Legal Negotiation', titleEs: 'Negociación legal', type: 'conversation', ref: { module: 'conversations', itemId: 'negociacion-legal-c2' } },
    ]
  },

  // ─── Track 6: Philosophy (B2–C2) ──────────────────────
  {
    id: 'track-philosophy',
    order: 6,
    title: 'El Pensador',
    titleEn: 'The Thinker',
    icon: '🤔',
    level: 'B2–C2',
    color: '#9C27B0',
    grammarFocus: 'Subjunctive, si-clauses, mixed conditionals',
    description: 'Explore abstract thought — hypotheticals, arguments, literary analysis, and philosophical debate in Spanish.',
    descriptionEs: 'Explora el pensamiento abstracto — hipótesis, argumentos, análisis literario y debate filosófico en español.',
    modules: [
      { id: 'philosophy-m1', title: 'Philosophy & Ethics Vocabulary', titleEs: 'Vocabulario de filosofía y ética', type: 'vocab', ref: { category: 'philosophy' } },
      { id: 'philosophy-m2', title: 'Present Subjunctive', titleEs: 'El subjuntivo presente', type: 'grammar', ref: { grammarId: 'gram-25' } },
      { id: 'philosophy-m3', title: 'Subjunctive Triggers (WEIRDO)', titleEs: 'Usos del subjuntivo', type: 'grammar', ref: { grammarId: 'gram-26' } },
      { id: 'philosophy-m4', title: 'Abstract Concepts Vocabulary', titleEs: 'Vocabulario de conceptos abstractos', type: 'vocab', ref: { category: 'abstract' } },
      { id: 'philosophy-m5', title: 'Imperfect Subjunctive', titleEs: 'El subjuntivo imperfecto', type: 'grammar', ref: { grammarId: 'gram-33' } },
      { id: 'philosophy-m6', title: 'Si Clauses (Conditionals)', titleEs: 'Las cláusulas con si', type: 'grammar', ref: { grammarId: 'gram-34' } },
      { id: 'philosophy-m7', title: 'Pre-Columbian Art', titleEs: 'Arte precolombino', type: 'culture', ref: { module: 'history', itemId: 'history-arte-precolombino' } },
      { id: 'philosophy-m8', title: 'Octavio Paz', titleEs: 'Octavio Paz', type: 'culture', ref: { module: 'poetry', itemId: 'poetry-octavio-paz' } },
      { id: 'philosophy-m9', title: 'Mixed Conditionals', titleEs: 'Condicionales mixtas', type: 'grammar', ref: { grammarId: 'gram-44' } },
      { id: 'philosophy-m10', title: 'University Debate', titleEs: 'Debate universitario', type: 'conversation', ref: { module: 'conversations', itemId: 'debate-universitario-c1' } },
      { id: 'philosophy-m11', title: 'Reading: Magical Realism', titleEs: 'Lectura: El realismo mágico', type: 'reading', ref: { readingId: 'read-21' } },
      { id: 'philosophy-m12', title: 'Reading: Borges and Infinity', titleEs: 'Lectura: Borges y el infinito', type: 'reading', ref: { readingId: 'read-23' } },
      { id: 'philosophy-m13', title: 'Philosophical Discussion', titleEs: 'Tertulia filosófica', type: 'conversation', ref: { module: 'conversations', itemId: 'tertulia-filosofica-c2' } },
    ]
  }
];
