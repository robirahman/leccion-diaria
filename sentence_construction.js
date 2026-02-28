'use strict';

const SENTENCE_CONSTRUCTION = [

  // ============================================================
  //  A1 — basic_word_order  (10 items)
  // ============================================================

  {
    id: 'sc-1',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'I eat an apple.',
    sentence: 'Yo como una manzana.',
    words: ['una', 'Yo', 'manzana.', 'como'],
    acceptable: ['Como una manzana.'],
    hint: 'Spanish follows Subject-Verb-Object order, just like English.',
    distractors: []
  },
  {
    id: 'sc-2',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'Maria is a teacher.',
    sentence: 'María es profesora.',
    words: ['profesora.', 'María', 'es'],
    acceptable: ['Es profesora María.'],
    hint: 'Use "ser" for professions. No article is needed before the profession.',
    distractors: []
  },
  {
    id: 'sc-3',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'The big house is white.',
    sentence: 'La casa grande es blanca.',
    words: ['es', 'casa', 'La', 'blanca.', 'grande'],
    acceptable: [],
    hint: 'Adjectives usually come after the noun in Spanish: "casa grande", not "grande casa".',
    distractors: []
  },
  {
    id: 'sc-4',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'What is your name?',
    sentence: '¿Cómo te llamas?',
    words: ['te', '¿Cómo', 'llamas?'],
    acceptable: [],
    hint: '"¿Cómo te llamas?" literally means "How do you call yourself?"',
    distractors: []
  },
  {
    id: 'sc-5',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'I do not have siblings.',
    sentence: 'No tengo hermanos.',
    words: ['hermanos.', 'No', 'tengo'],
    acceptable: ['Yo no tengo hermanos.'],
    hint: '"No" goes directly before the verb to negate it.',
    distractors: []
  },
  {
    id: 'sc-6',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'We live in a small apartment.',
    sentence: 'Nosotros vivimos en un apartamento pequeño.',
    words: ['un', 'vivimos', 'pequeño.', 'Nosotros', 'apartamento', 'en'],
    acceptable: ['Vivimos en un apartamento pequeño.'],
    hint: 'The adjective "pequeño" goes after the noun "apartamento".',
    distractors: []
  },
  {
    id: 'sc-7',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'The children are happy.',
    sentence: 'Los niños están contentos.',
    words: ['están', 'Los', 'contentos.', 'niños'],
    acceptable: [],
    hint: 'Use "estar" for emotions and temporary states.',
    distractors: []
  },
  {
    id: 'sc-8',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'Where is the bathroom?',
    sentence: '¿Dónde está el baño?',
    words: ['el', 'está', '¿Dónde', 'baño?'],
    acceptable: [],
    hint: 'Questions start with the question word, then the verb.',
    distractors: []
  },
  {
    id: 'sc-9',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'My mother cooks very well.',
    sentence: 'Mi madre cocina muy bien.',
    words: ['cocina', 'Mi', 'bien.', 'muy', 'madre'],
    acceptable: [],
    hint: 'Adverbs like "muy bien" come after the verb.',
    distractors: []
  },
  {
    id: 'sc-10',
    level: 'A1',
    topic: 'basic_word_order',
    english: 'I want a glass of water, please.',
    sentence: 'Quiero un vaso de agua, por favor.',
    words: ['un', 'Quiero', 'agua,', 'favor.', 'por', 'de', 'vaso'],
    acceptable: ['Yo quiero un vaso de agua, por favor.'],
    hint: '"Un vaso de agua" means "a glass of water". "Por favor" goes at the end.',
    distractors: []
  },

  // ============================================================
  //  A2 — pronouns  (8 items)
  // ============================================================

  {
    id: 'sc-11',
    level: 'A2',
    topic: 'pronouns',
    english: 'I want it.',
    sentence: 'Lo quiero.',
    words: ['quiero.', 'Lo'],
    acceptable: ['Yo lo quiero.'],
    hint: 'Direct object pronouns go before conjugated verbs.',
    distractors: []
  },
  {
    id: 'sc-12',
    level: 'A2',
    topic: 'pronouns',
    english: 'I give him the book.',
    sentence: 'Le doy el libro.',
    words: ['el', 'Le', 'libro.', 'doy'],
    acceptable: ['Yo le doy el libro.'],
    hint: '"Le" is the indirect object pronoun meaning "to him/her".',
    distractors: []
  },
  {
    id: 'sc-13',
    level: 'A2',
    topic: 'pronouns',
    english: 'I get up early.',
    sentence: 'Me levanto temprano.',
    words: ['temprano.', 'Me', 'levanto'],
    acceptable: ['Yo me levanto temprano.'],
    hint: 'Reflexive pronouns go before the conjugated verb.',
    distractors: []
  },
  {
    id: 'sc-14',
    level: 'A2',
    topic: 'pronouns',
    english: 'I give it to you.',
    sentence: 'Te lo doy.',
    words: ['doy.', 'lo', 'Te'],
    acceptable: ['Yo te lo doy.'],
    hint: 'When two object pronouns appear, indirect goes before direct: te lo.',
    distractors: []
  },
  {
    id: 'sc-15',
    level: 'A2',
    topic: 'pronouns',
    english: 'I like chocolate.',
    sentence: 'Me gusta el chocolate.',
    words: ['el', 'gusta', 'Me', 'chocolate.'],
    acceptable: ['El chocolate me gusta.', 'A mí me gusta el chocolate.'],
    hint: '"Gustar" works backwards: the thing liked is the subject. "Me gusta" = "it pleases me".',
    distractors: []
  },
  {
    id: 'sc-16',
    level: 'A2',
    topic: 'pronouns',
    english: 'She washes her hands every day.',
    sentence: 'Ella se lava las manos todos los días.',
    words: ['se', 'las', 'Ella', 'los', 'lava', 'días.', 'manos', 'todos'],
    acceptable: ['Se lava las manos todos los días.'],
    hint: 'Reflexive verbs use possessive-less body parts: "se lava las manos", not "sus manos".',
    distractors: []
  },
  {
    id: 'sc-17',
    level: 'A2',
    topic: 'pronouns',
    english: 'We like the beaches a lot.',
    sentence: 'Nos gustan mucho las playas.',
    words: ['las', 'mucho', 'gustan', 'Nos', 'playas.'],
    acceptable: ['Las playas nos gustan mucho.', 'A nosotros nos gustan mucho las playas.'],
    hint: '"Gustar" is plural here because "las playas" is the subject.',
    distractors: []
  },
  {
    id: 'sc-18',
    level: 'A2',
    topic: 'pronouns',
    english: 'Can you tell me where the station is?',
    sentence: '¿Puede decirme dónde está la estación?',
    words: ['dónde', '¿Puede', 'la', 'decirme', 'está', 'estación?'],
    acceptable: ['¿Me puede decir dónde está la estación?'],
    hint: 'Pronouns can attach to the infinitive: "decirme" = "decir + me".',
    distractors: []
  },

  // ============================================================
  //  B1 — complex_sentences  (9 items)
  // ============================================================

  {
    id: 'sc-19',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'I want you to come to the party.',
    sentence: 'Quiero que vengas a la fiesta.',
    words: ['a', 'que', 'la', 'Quiero', 'fiesta.', 'vengas'],
    acceptable: [],
    hint: '"Querer que" triggers the subjunctive: "vengas", not "vienes".',
    distractors: []
  },
  {
    id: 'sc-20',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'The woman who lives here is my neighbor.',
    sentence: 'La mujer que vive aquí es mi vecina.',
    words: ['es', 'que', 'mi', 'aquí', 'La', 'vive', 'mujer', 'vecina.'],
    acceptable: [],
    hint: '"Que" introduces a relative clause describing "la mujer".',
    distractors: []
  },
  {
    id: 'sc-21',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'Madrid is bigger than Barcelona.',
    sentence: 'Madrid es más grande que Barcelona.',
    words: ['que', 'más', 'es', 'Madrid', 'Barcelona.', 'grande'],
    acceptable: [],
    hint: 'Comparatives use "más + adjective + que".',
    distractors: []
  },
  {
    id: 'sc-22',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'When I arrived, they had already left.',
    sentence: 'Cuando llegué, ya habían salido.',
    words: ['ya', 'habían', 'Cuando', 'salido.', 'llegué,'],
    acceptable: ['Ya habían salido cuando llegué.'],
    hint: '"Habían salido" is the pluperfect tense — an action completed before another past action.',
    distractors: []
  },
  {
    id: 'sc-23',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'If I had money, I would travel.',
    sentence: 'Si tuviera dinero, viajaría.',
    words: ['viajaría.', 'dinero,', 'Si', 'tuviera'],
    acceptable: ['Viajaría si tuviera dinero.', 'Si yo tuviera dinero, viajaría.'],
    hint: '"Si + imperfect subjunctive + conditional" expresses hypothetical situations.',
    distractors: []
  },
  {
    id: 'sc-24',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'I hope it does not rain tomorrow.',
    sentence: 'Espero que no llueva mañana.',
    words: ['que', 'llueva', 'no', 'Espero', 'mañana.'],
    acceptable: ['Espero que mañana no llueva.'],
    hint: '"Esperar que" triggers the subjunctive. "Llueva" is the subjunctive of "llover".',
    distractors: []
  },
  {
    id: 'sc-25',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'We have been living here for five years.',
    sentence: 'Llevamos cinco años viviendo aquí.',
    words: ['viviendo', 'cinco', 'Llevamos', 'aquí.', 'años'],
    acceptable: ['Hace cinco años que vivimos aquí.'],
    hint: '"Llevar + time + gerund" expresses duration of an ongoing action.',
    distractors: []
  },
  {
    id: 'sc-26',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'Although it is cold, I am going to go out.',
    sentence: 'Aunque hace frío, voy a salir.',
    words: ['hace', 'a', 'Aunque', 'salir.', 'voy', 'frío,'],
    acceptable: ['Voy a salir aunque hace frío.', 'Aunque haga frío, voy a salir.'],
    hint: '"Aunque" means "although". It can take indicative (fact) or subjunctive (possibility).',
    distractors: []
  },
  {
    id: 'sc-27',
    level: 'B1',
    topic: 'complex_sentences',
    english: 'The book that you lent me is very interesting.',
    sentence: 'El libro que me prestaste es muy interesante.',
    words: ['me', 'es', 'que', 'El', 'muy', 'prestaste', 'interesante.', 'libro'],
    acceptable: [],
    hint: '"Que me prestaste" is a relative clause. The pronoun "me" stays with "prestaste".',
    distractors: []
  },

  // ============================================================
  //  B2 — advanced_structures  (7 items)
  // ============================================================

  {
    id: 'sc-28',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'The book was written by Cervantes.',
    sentence: 'El libro fue escrito por Cervantes.',
    words: ['fue', 'El', 'Cervantes.', 'por', 'escrito', 'libro'],
    acceptable: [],
    hint: 'Passive voice: "ser + past participle + por + agent".',
    distractors: []
  },
  {
    id: 'sc-29',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'I want to give it to him.',
    sentence: 'Se lo quiero dar.',
    words: ['dar.', 'Se', 'lo', 'quiero'],
    acceptable: ['Quiero dárselo.'],
    hint: 'Clitic pronouns can go before the conjugated verb or attach to the infinitive.',
    distractors: []
  },
  {
    id: 'sc-30',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'It seems fine to me.',
    sentence: 'A mí me parece bien.',
    words: ['me', 'mí', 'A', 'bien.', 'parece'],
    acceptable: ['Me parece bien a mí.', 'Me parece bien.'],
    hint: '"A mí" adds emphasis to the indirect object pronoun "me".',
    distractors: []
  },
  {
    id: 'sc-31',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'Nobody came to the meeting.',
    sentence: 'No vino nadie a la reunión.',
    words: ['a', 'la', 'No', 'nadie', 'vino', 'reunión.'],
    acceptable: ['Nadie vino a la reunión.'],
    hint: 'Spanish uses double negation: "No vino nadie". If "nadie" comes first, drop "no".',
    distractors: []
  },
  {
    id: 'sc-32',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'Had I known, I would not have gone.',
    sentence: 'De haberlo sabido, no habría ido.',
    words: ['no', 'sabido,', 'haberlo', 'De', 'ido.', 'habría'],
    acceptable: ['No habría ido de haberlo sabido.', 'Si lo hubiera sabido, no habría ido.'],
    hint: '"De haberlo sabido" is a formal alternative to "Si lo hubiera sabido".',
    distractors: []
  },
  {
    id: 'sc-33',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'Spanish is spoken here.',
    sentence: 'Aquí se habla español.',
    words: ['se', 'español.', 'Aquí', 'habla'],
    acceptable: ['Se habla español aquí.'],
    hint: '"Se + verb" forms an impersonal or passive construction.',
    distractors: []
  },
  {
    id: 'sc-34',
    level: 'B2',
    topic: 'advanced_structures',
    english: 'Not only does he speak Spanish, but he also writes poetry.',
    sentence: 'No solo habla español, sino que también escribe poesía.',
    words: ['habla', 'que', 'escribe', 'No', 'solo', 'también', 'español,', 'sino', 'poesía.'],
    acceptable: [],
    hint: '"No solo... sino que también..." means "not only... but also...".',
    distractors: []
  },

  // ============================================================
  //  C1 — nuanced_order  (7 items)
  // ============================================================

  {
    id: 'sc-35',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'It was at that moment that I understood everything.',
    sentence: 'Fue en ese momento cuando lo entendí todo.',
    words: ['ese', 'en', 'cuando', 'Fue', 'todo.', 'entendí', 'lo', 'momento'],
    acceptable: ['En ese momento fue cuando lo entendí todo.'],
    hint: '"Fue... cuando..." is a cleft sentence that emphasizes the time.',
    distractors: ['entonces']
  },
  {
    id: 'sc-36',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'What surprised me was his calmness.',
    sentence: 'Lo que me sorprendió fue su tranquilidad.',
    words: ['me', 'que', 'fue', 'Lo', 'su', 'sorprendió', 'tranquilidad.'],
    acceptable: ['Su tranquilidad fue lo que me sorprendió.'],
    hint: '"Lo que" creates a nominalizing clause: "that which". The fronted clause adds emphasis.',
    distractors: ['la']
  },
  {
    id: 'sc-37',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'However much you insist, I will not change my mind.',
    sentence: 'Por mucho que insistas, no cambiaré de opinión.',
    words: ['que', 'de', 'mucho', 'no', 'Por', 'opinión.', 'insistas,', 'cambiaré'],
    acceptable: ['No cambiaré de opinión por mucho que insistas.'],
    hint: '"Por mucho que + subjunctive" expresses concession: "however much...".',
    distractors: ['nunca']
  },
  {
    id: 'sc-38',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'Rarely have I seen such a beautiful sunset.',
    sentence: 'Pocas veces he visto un atardecer tan hermoso.',
    words: ['tan', 'veces', 'he', 'un', 'Pocas', 'hermoso.', 'visto', 'atardecer'],
    acceptable: ['He visto pocas veces un atardecer tan hermoso.'],
    hint: 'Fronting "pocas veces" creates a more literary, emphatic tone.',
    distractors: ['muy']
  },
  {
    id: 'sc-39',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'It is essential that all citizens participate in the elections.',
    sentence: 'Es imprescindible que todos los ciudadanos participen en las elecciones.',
    words: ['que', 'los', 'en', 'Es', 'las', 'todos', 'participen', 'imprescindible', 'ciudadanos', 'elecciones.'],
    acceptable: ['Que todos los ciudadanos participen en las elecciones es imprescindible.'],
    hint: '"Es imprescindible que + subjunctive" expresses a strong necessity.',
    distractors: ['deben']
  },
  {
    id: 'sc-40',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'The more I study, the less I feel I know.',
    sentence: 'Cuanto más estudio, menos siento que sé.',
    words: ['que', 'más', 'menos', 'Cuanto', 'sé.', 'estudio,', 'siento'],
    acceptable: [],
    hint: '"Cuanto más... menos..." is a correlative structure: "the more... the less...".',
    distractors: ['mucho']
  },
  {
    id: 'sc-41',
    level: 'C1',
    topic: 'nuanced_order',
    english: 'Were it not for your help, I would not have finished on time.',
    sentence: 'De no ser por tu ayuda, no habría terminado a tiempo.',
    words: ['tu', 'no', 'a', 'ser', 'De', 'tiempo.', 'por', 'no', 'habría', 'terminado', 'ayuda,'],
    acceptable: ['No habría terminado a tiempo de no ser por tu ayuda.'],
    hint: '"De no ser por" is a formal conditional meaning "were it not for".',
    distractors: ['sin']
  }
];
