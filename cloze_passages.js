'use strict';

// ════════════════════════════════════════════════════════════
//  CLOZE PASSAGES — Fill-in-the-blank grammar in context
//  18+ multi-sentence passages across 6 topic areas
// ════════════════════════════════════════════════════════════

const CLOZE_PASSAGES = [

  // ─────────────────────────────────────────────────────────
  //  SER vs ESTAR  (3 passages, A2-B1)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-1', level: 'A2', topic: 'ser_estar',
    title: 'En el restaurante', titleEn: 'At the Restaurant',
    passage: 'Mi amigo Juan {1} de México, pero ahora {2} en España. El restaurante donde trabajamos {3} muy bonito y siempre {4} lleno de gente los viernes. Juan {5} un chef increíble.',
    blanks: [
      { id: 1, answer: 'es',   acceptable: [], explanation: 'SER for origin: Juan es de México.' },
      { id: 2, answer: 'está', acceptable: ['esta'], explanation: 'ESTAR for current location: está en España.' },
      { id: 3, answer: 'es',   acceptable: [], explanation: 'SER for inherent characteristic of the restaurant.' },
      { id: 4, answer: 'está', acceptable: ['esta'], explanation: 'ESTAR for a resulting condition: está lleno (it gets full).' },
      { id: 5, answer: 'es',   acceptable: [], explanation: 'SER for profession/identity: es un chef.' },
    ]
  },
  {
    id: 'cloze-2', level: 'A2', topic: 'ser_estar',
    title: 'Mi nueva compañera', titleEn: 'My New Roommate',
    passage: 'Mi compañera de piso {1} alemana, pero habla español muy bien. Hoy {2} un poco triste porque {3} lejos de su familia. Nuestra casa {4} cerca del centro y {5} bastante grande.',
    blanks: [
      { id: 1, answer: 'es',   acceptable: [], explanation: 'SER for nationality: es alemana.' },
      { id: 2, answer: 'está', acceptable: ['esta'], explanation: 'ESTAR for temporary emotional state: está triste.' },
      { id: 3, answer: 'está', acceptable: ['esta'], explanation: 'ESTAR for location: está lejos de su familia.' },
      { id: 4, answer: 'está', acceptable: ['esta'], explanation: 'ESTAR for location of the house: está cerca del centro.' },
      { id: 5, answer: 'es',   acceptable: [], explanation: 'SER for inherent quality of the house: es grande.' },
    ]
  },
  {
    id: 'cloze-3', level: 'B1', topic: 'ser_estar',
    title: 'La entrevista de trabajo', titleEn: 'The Job Interview',
    passage: 'La oficina {1} en el quinto piso. Yo {2} nervioso porque la entrevista {3} a las diez. La directora {4} muy profesional y el ambiente {5} agradable, aunque hoy todos {6} un poco estresados por un proyecto.',
    blanks: [
      { id: 1, answer: 'está', acceptable: ['esta'], explanation: 'ESTAR for physical location: the office is on the fifth floor.' },
      { id: 2, answer: 'estoy', acceptable: [], explanation: 'ESTAR for temporary emotional state: I am nervous.' },
      { id: 3, answer: 'es',   acceptable: [], explanation: 'SER for scheduled events: the interview is at ten.' },
      { id: 4, answer: 'es',   acceptable: [], explanation: 'SER for inherent personality trait: she is professional.' },
      { id: 5, answer: 'es',   acceptable: [], explanation: 'SER for the general character of the environment.' },
      { id: 6, answer: 'están', acceptable: ['estan'], explanation: 'ESTAR for temporary condition: they are stressed today.' },
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  PRETERITE vs IMPERFECT  (3 passages, B1-B2)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-4', level: 'B1', topic: 'preterite_imperfect',
    title: 'Un día en la playa', titleEn: 'A Day at the Beach',
    passage: 'Cuando {1} pequeño, mi familia siempre {2} a la playa en verano. Un día, mi hermano {3} un cangrejo enorme. Nosotros {4} mucho miedo, pero mi padre lo {5} al agua con calma.',
    blanks: [
      { id: 1, answer: 'era',       acceptable: [], explanation: 'Imperfect: ongoing background state in the past (I was young).' },
      { id: 2, answer: 'iba',       acceptable: [], explanation: 'Imperfect: habitual repeated action (we used to go).' },
      { id: 3, answer: 'encontró',  acceptable: ['encontro'], explanation: 'Preterite: single completed event that interrupts the narrative.' },
      { id: 4, answer: 'teníamos',  acceptable: ['teniamos'], explanation: 'Imperfect: describes an emotional state during the scene.' },
      { id: 5, answer: 'devolvió',  acceptable: ['devolvio'], explanation: 'Preterite: completed action (he returned it to the water).' },
    ]
  },
  {
    id: 'cloze-5', level: 'B1', topic: 'preterite_imperfect',
    title: 'La tormenta', titleEn: 'The Storm',
    passage: '{1} las ocho de la noche y {2} mucho. De repente, un rayo {3} cerca de la casa y todas las luces se {4}. Mi madre {5} velas mientras nosotros {6} debajo de las mantas.',
    blanks: [
      { id: 1, answer: 'Eran',      acceptable: [], explanation: 'Imperfect: telling time in the past (it was eight o\'clock).' },
      { id: 2, answer: 'llovía',    acceptable: ['llovia'], explanation: 'Imperfect: ongoing weather as background description.' },
      { id: 3, answer: 'cayó',      acceptable: ['cayo'], explanation: 'Preterite: sudden completed event (a bolt struck).' },
      { id: 4, answer: 'apagaron',  acceptable: [], explanation: 'Preterite: sudden completed event (the lights went out).' },
      { id: 5, answer: 'buscó',     acceptable: ['busco'], explanation: 'Preterite: completed action in response to the event.' },
      { id: 6, answer: 'esperábamos', acceptable: ['esperabamos'], explanation: 'Imperfect: ongoing action happening simultaneously.' },
    ]
  },
  {
    id: 'cloze-6', level: 'B2', topic: 'preterite_imperfect',
    title: 'El viaje a Granada', titleEn: 'The Trip to Granada',
    passage: 'Aquel verano yo {1} mucho viajar a Granada. Cuando por fin {2}, la ciudad me {3}. Las calles {4} llenas de música y la Alhambra {5} más impresionante de lo que {6}.',
    blanks: [
      { id: 1, answer: 'quería',    acceptable: ['queria'], explanation: 'Imperfect: ongoing desire as background (I wanted to travel).' },
      { id: 2, answer: 'llegué',    acceptable: ['llegue'], explanation: 'Preterite: completed event (when I finally arrived).' },
      { id: 3, answer: 'encantó',   acceptable: ['encanto'], explanation: 'Preterite: reaction at a specific moment (it charmed me).' },
      { id: 4, answer: 'estaban',   acceptable: [], explanation: 'Imperfect: description of the scene (the streets were full).' },
      { id: 5, answer: 'era',       acceptable: [], explanation: 'Imperfect: description of a characteristic (the Alhambra was impressive).' },
      { id: 6, answer: 'imaginaba', acceptable: [], explanation: 'Imperfect: ongoing past mental state (what I had imagined).' },
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  SUBJUNCTIVE  (3 passages, B1-B2)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-7', level: 'B1', topic: 'subjunctive',
    title: 'Consejos de mi madre', titleEn: 'My Mother\'s Advice',
    passage: 'Mi madre siempre quiere que yo {1} más verduras. También espera que {2} ejercicio todos los días. No cree que {3} suficiente con caminar al trabajo, y me pide que {4} al gimnasio.',
    blanks: [
      { id: 1, answer: 'coma',    acceptable: [], explanation: 'Subjunctive after "quiere que" — wish/desire for someone else.' },
      { id: 2, answer: 'haga',    acceptable: [], explanation: 'Subjunctive after "espera que" — hope/expectation.' },
      { id: 3, answer: 'sea',     acceptable: [], explanation: 'Subjunctive after "no cree que" — negated belief triggers subjunctive.' },
      { id: 4, answer: 'vaya',    acceptable: [], explanation: 'Subjunctive after "me pide que" — request directed at someone.' },
    ]
  },
  {
    id: 'cloze-8', level: 'B2', topic: 'subjunctive',
    title: 'Buscando apartamento', titleEn: 'Looking for an Apartment',
    passage: 'Necesito un apartamento que {1} cerca del metro y que no {2} demasiado. Dudo que {3} algo barato en este barrio. Ojalá {4} suerte, porque es importante que me {5} antes del mes que viene.',
    blanks: [
      { id: 1, answer: 'esté',    acceptable: ['este'], explanation: 'Subjunctive after indefinite antecedent — looking for something that may not exist.' },
      { id: 2, answer: 'cueste',  acceptable: [], explanation: 'Subjunctive continuing the description of an unknown apartment.' },
      { id: 3, answer: 'haya',    acceptable: [], explanation: 'Subjunctive after "dudo que" — doubt triggers subjunctive.' },
      { id: 4, answer: 'tenga',   acceptable: [], explanation: 'Subjunctive after "ojalá" — expression of wish.' },
      { id: 5, answer: 'mude',    acceptable: [], explanation: 'Subjunctive after "es importante que" — impersonal expression of necessity.' },
    ]
  },
  {
    id: 'cloze-9', level: 'B2', topic: 'subjunctive',
    title: 'El jefe exigente', titleEn: 'The Demanding Boss',
    passage: 'Mi jefe insiste en que todos {1} puntuales. No le gusta que nadie {2} el teléfono en las reuniones. Es posible que nos {3} un aumento si el proyecto {4} bien. Esperamos que {5} justo con todos.',
    blanks: [
      { id: 1, answer: 'seamos',    acceptable: [], explanation: 'Subjunctive after "insiste en que" — demand/insistence.' },
      { id: 2, answer: 'use',       acceptable: [], explanation: 'Subjunctive after "no le gusta que" — emotional reaction about others\' actions.' },
      { id: 3, answer: 'dé',        acceptable: ['de'], explanation: 'Subjunctive after "es posible que" — possibility.' },
      { id: 4, answer: 'sale',      acceptable: [], explanation: 'Indicative after "si" in a real/likely condition — NOT subjunctive.' },
      { id: 5, answer: 'sea',       acceptable: [], explanation: 'Subjunctive after "esperamos que" — hope/wish.' },
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  PRONOUNS  (3 passages, A2-B1)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-10', level: 'A2', topic: 'pronouns',
    title: 'El regalo de cumpleaños', titleEn: 'The Birthday Gift',
    passage: 'Mañana es el cumpleaños de Ana. Quiero comprar{1} un libro. A ella {2} gusta mucho leer. Voy a dar{3} el regalo en la fiesta. Ella no {4} sabe todavía.',
    blanks: [
      { id: 1, answer: 'le',  acceptable: [], explanation: 'Indirect object pronoun: comprarle (to buy for her).' },
      { id: 2, answer: 'le',  acceptable: [], explanation: 'Indirect object pronoun with gustar: a ella le gusta.' },
      { id: 3, answer: 'le',  acceptable: [], explanation: 'Indirect object pronoun attached to infinitive: darle (to give to her).' },
      { id: 4, answer: 'lo',  acceptable: [], explanation: 'Direct object pronoun: no lo sabe (she doesn\'t know it).' },
    ]
  },
  {
    id: 'cloze-11', level: 'B1', topic: 'pronouns',
    title: 'En la tienda de ropa', titleEn: 'At the Clothing Store',
    passage: 'Vi una camiseta bonita y {1} compré. Después encontré unos zapatos, pero no {2} compré porque eran caros. La dependienta {3} ofreció un descuento, pero {4} dije que no. Al final, {5} llevé solo la camiseta.',
    blanks: [
      { id: 1, answer: 'la',  acceptable: [], explanation: 'Direct object pronoun for feminine singular: la camiseta → la compré.' },
      { id: 2, answer: 'los', acceptable: [], explanation: 'Direct object pronoun for masculine plural: los zapatos → no los compré.' },
      { id: 3, answer: 'me',  acceptable: [], explanation: 'Indirect object pronoun: she offered me a discount.' },
      { id: 4, answer: 'le',  acceptable: [], explanation: 'Indirect object pronoun: I told her no (le dije).' },
      { id: 5, answer: 'me',  acceptable: [], explanation: 'Reflexive/pronoun with llevarse: me llevé (I took with me).' },
    ]
  },
  {
    id: 'cloze-12', level: 'B1', topic: 'pronouns',
    title: 'La mudanza', titleEn: 'The Move',
    passage: 'Mis padres {1} ayudaron con la mudanza. Las cajas pesadas, mi hermano {2} subió al camión. A mi madre {3} preocupaba el piano, así que {4} {5} llevamos con mucho cuidado entre todos.',
    blanks: [
      { id: 1, answer: 'me',    acceptable: [], explanation: 'Direct object pronoun: they helped me.' },
      { id: 2, answer: 'las',   acceptable: [], explanation: 'Direct object pronoun for feminine plural: las cajas → las subió.' },
      { id: 3, answer: 'le',    acceptable: [], explanation: 'Indirect object pronoun with preocupar: a mi madre le preocupaba.' },
      { id: 4, answer: 'se',    acceptable: [], explanation: 'When le/les precedes lo/la/los/las, le → se (se lo llevamos).' },
      { id: 5, answer: 'lo',    acceptable: [], explanation: 'Direct object pronoun for masculine singular: el piano → lo llevamos.' },
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  PREPOSITIONS  (3 passages, B1-B2)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-13', level: 'B1', topic: 'prepositions',
    title: 'Un paseo por la ciudad', titleEn: 'A Walk Through the City',
    passage: 'Salimos {1} casa temprano y caminamos {2} el parque. Pasamos {3} la catedral y seguimos {4} el río. El paseo fue perfecto {5} relajarnos después de una semana difícil.',
    blanks: [
      { id: 1, answer: 'de',   acceptable: [], explanation: 'Salir de: to leave from a place.' },
      { id: 2, answer: 'por',  acceptable: [], explanation: 'Por for movement through a place: caminamos por el parque.' },
      { id: 3, answer: 'por',  acceptable: [], explanation: 'Por for passing by/through: pasamos por la catedral.' },
      { id: 4, answer: 'por',  acceptable: [], explanation: 'Por for along: seguimos por el río (along the river).' },
      { id: 5, answer: 'para', acceptable: [], explanation: 'Para for purpose: perfecto para relajarnos (in order to relax).' },
    ]
  },
  {
    id: 'cloze-14', level: 'B1', topic: 'prepositions',
    title: 'El viaje de negocios', titleEn: 'The Business Trip',
    passage: 'Viajo {1} Madrid {2} una reunión importante. El vuelo sale {3} las siete de la mañana. Trabajo {4} una empresa de tecnología y este proyecto es {5} un cliente nuevo. Estaré allí {6} tres días.',
    blanks: [
      { id: 1, answer: 'a',    acceptable: [], explanation: 'A for destination: viajo a Madrid.' },
      { id: 2, answer: 'para', acceptable: [], explanation: 'Para for purpose: para una reunión (for a meeting).' },
      { id: 3, answer: 'a',    acceptable: [], explanation: 'A with specific times: a las siete.' },
      { id: 4, answer: 'para', acceptable: ['en'], explanation: 'Para for employer: trabajo para una empresa. (En is also used regionally.)' },
      { id: 5, answer: 'para', acceptable: [], explanation: 'Para for intended recipient: es para un cliente.' },
      { id: 6, answer: 'por',  acceptable: [], explanation: 'Por for duration: por tres días (for three days).' },
    ]
  },
  {
    id: 'cloze-15', level: 'B2', topic: 'prepositions',
    title: 'La clase de español', titleEn: 'The Spanish Class',
    passage: 'Me inscribí {1} un curso {2} español avanzado. El profesor insiste {3} que practiquemos todos los días. Estoy interesado {4} la literatura y sueño {5} poder leer a Borges sin diccionario.',
    blanks: [
      { id: 1, answer: 'en',   acceptable: [], explanation: 'Inscribirse en: to enroll in.' },
      { id: 2, answer: 'de',   acceptable: [], explanation: 'De for specifying type: un curso de español.' },
      { id: 3, answer: 'en',   acceptable: [], explanation: 'Insistir en: to insist on (fixed verb + preposition).' },
      { id: 4, answer: 'en',   acceptable: [], explanation: 'Interesado en: interested in (fixed adjective + preposition).' },
      { id: 5, answer: 'con',  acceptable: [], explanation: 'Soñar con: to dream of/about (fixed verb + preposition).' },
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  MIXED GRAMMAR  (3 passages, B2-C1)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-16', level: 'B2', topic: 'mixed',
    title: 'Recuerdos de la abuela', titleEn: 'Grandmother\'s Memories',
    passage: 'Mi abuela siempre {1} que de joven {2} una mujer muy aventurera. Cuando {3} veinte años, {4} sola a Argentina. Quería que sus hijos {5} valientes como ella. A mí {6} encantaba escuchar{7} historias.',
    blanks: [
      { id: 1, answer: 'decía',     acceptable: ['decia'], explanation: 'Imperfect: habitual action (she always used to say).' },
      { id: 2, answer: 'era',       acceptable: [], explanation: 'Imperfect: description in the past (she was adventurous).' },
      { id: 3, answer: 'tenía',     acceptable: ['tenia'], explanation: 'Imperfect: age as background information (she was twenty).' },
      { id: 4, answer: 'viajó',     acceptable: ['viajo'], explanation: 'Preterite: completed single event (she traveled to Argentina).' },
      { id: 5, answer: 'fueran',    acceptable: [], explanation: 'Imperfect subjunctive after "quería que" — past wish for others.' },
      { id: 6, answer: 'me',        acceptable: [], explanation: 'Indirect object pronoun with encantar: a mí me encantaba.' },
      { id: 7, answer: 'sus',       acceptable: [], explanation: 'Possessive adjective: escuchar sus historias (to listen to her stories).' },
    ]
  },
  {
    id: 'cloze-17', level: 'B2', topic: 'mixed',
    title: 'El nuevo trabajo', titleEn: 'The New Job',
    passage: 'Ayer {1} mi primer día en la oficina. Mi jefa, que {2} muy simpática, me {3} a todo el equipo. Me pidió que {4} un informe {5} el viernes. Espero que todo {6} bien esta semana.',
    blanks: [
      { id: 1, answer: 'fue',       acceptable: [], explanation: 'Preterite: completed event (yesterday was my first day).' },
      { id: 2, answer: 'es',        acceptable: [], explanation: 'Present indicative: inherent trait (she is friendly) — not past tense because it is still true.' },
      { id: 3, answer: 'presentó',  acceptable: ['presento'], explanation: 'Preterite: completed action (she introduced me).' },
      { id: 4, answer: 'preparara', acceptable: ['preparase'], explanation: 'Imperfect subjunctive after "me pidió que" — past request.' },
      { id: 5, answer: 'para',      acceptable: [], explanation: 'Para for deadline: para el viernes (by Friday).' },
      { id: 6, answer: 'vaya',      acceptable: ['salga'], explanation: 'Present subjunctive after "espero que" — hope about the future.' },
    ]
  },
  {
    id: 'cloze-18', level: 'C1', topic: 'mixed',
    title: 'Reflexiones sobre el idioma', titleEn: 'Reflections on Language',
    passage: 'Si yo {1} elegir cualquier época para vivir, {2} el Siglo de Oro. No hay ningún escritor moderno que {3} {4} Cervantes. Es una lástima que muchos jóvenes no {5} interés {6} la literatura clásica. Aunque {7} difícil, merece la pena que se {8} en las escuelas.',
    blanks: [
      { id: 1, answer: 'pudiera',   acceptable: ['pudiese'], explanation: 'Imperfect subjunctive in hypothetical si-clause (contrary to fact).' },
      { id: 2, answer: 'elegiría',  acceptable: ['eligiría', 'eligiria', 'elegiria'], explanation: 'Conditional in the result clause of a hypothetical.' },
      { id: 3, answer: 'supere',    acceptable: [], explanation: 'Present subjunctive after negative antecedent: no hay nadie que + subjunctive.' },
      { id: 4, answer: 'a',         acceptable: [], explanation: 'Personal "a" before a proper noun used as direct object: supere a Cervantes.' },
      { id: 5, answer: 'tengan',    acceptable: [], explanation: 'Present subjunctive after "es una lástima que" — emotional reaction.' },
      { id: 6, answer: 'por',       acceptable: ['en'], explanation: 'Interés por/en: interest in (both prepositions are accepted).' },
      { id: 7, answer: 'sea',       acceptable: [], explanation: 'Subjunctive in concessive clause: aunque sea difícil (even though it may be).' },
      { id: 8, answer: 'enseñe',    acceptable: [], explanation: 'Subjunctive after "merece la pena que" — impersonal value judgment.' },
    ]
  },
];
