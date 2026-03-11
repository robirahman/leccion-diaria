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

  // ─────────────────────────────────────────────────────────
  //  C1 ADVANCED  (5 passages)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-19', level: 'C1', topic: 'subjunctive',
    title: 'El debate sobre la educación', titleEn: 'The Debate on Education',
    passage: 'Si el gobierno {1} invertido más en educación, los resultados {2} sido diferentes. Los expertos dudan de que la reforma {3} los problemas de fondo. Habría sido preferible que se {4} consultado a los docentes antes de que se {5} la ley. Es imprescindible que las autoridades {6} en cuenta la diversidad regional. No es que el sistema anterior {7} perfecto, sino que los cambios se implementaron sin que nadie {8} las consecuencias.',
    blanks: [
      { id: 1, answer: 'hubiera',    acceptable: ['hubiese'], explanation: 'Pluperfect subjunctive in a past contrary-to-fact si-clause: si hubiera invertido.' },
      { id: 2, answer: 'habrían',    acceptable: ['habrian', 'hubieran', 'hubiesen'], explanation: 'Conditional perfect in the result clause of an unreal past condition. Colloquially the pluperfect subjunctive also appears.' },
      { id: 3, answer: 'resuelva',   acceptable: [], explanation: 'Present subjunctive after "dudan de que" — doubt about present/future.' },
      { id: 4, answer: 'hubiera',    acceptable: ['hubiese'], explanation: 'Pluperfect subjunctive after "habría sido preferible que" — unrealized past preference.' },
      { id: 5, answer: 'aprobara',   acceptable: ['aprobase'], explanation: 'Imperfect subjunctive after "antes de que" — always requires subjunctive, past context.' },
      { id: 6, answer: 'tengan',     acceptable: [], explanation: 'Present subjunctive after "es imprescindible que" — impersonal necessity.' },
      { id: 7, answer: 'fuera',      acceptable: ['fuese'], explanation: 'Imperfect subjunctive in "no es que … fuera" — negated assertion with subjunctive.' },
      { id: 8, answer: 'midiera',    acceptable: ['midiese'], explanation: 'Imperfect subjunctive after "sin que" — always subjunctive, past narrative.' },
    ]
  },
  {
    id: 'cloze-20', level: 'C1', topic: 'passive_voice',
    title: 'Avances científicos', titleEn: 'Scientific Advances',
    passage: 'El nuevo fármaco {1} desarrollado por un equipo internacional. Se {2} que los resultados preliminares son prometedores. La vacuna fue {3} a más de diez mil voluntarios. Se {4} publicado los datos en una revista de prestigio. Los efectos secundarios no {5} sido confirmados todavía. Se {6} nuevas pruebas el próximo trimestre. La comunidad científica espera que se {7} los hallazgos de forma independiente.',
    blanks: [
      { id: 1, answer: 'fue',          acceptable: [], explanation: 'Passive voice with ser: el fármaco fue desarrollado (preterite passive).' },
      { id: 2, answer: 'estima',       acceptable: ['considera'], explanation: 'Impersonal se + third person singular: se estima que (it is estimated that).' },
      { id: 3, answer: 'administrada', acceptable: [], explanation: 'Past participle agreeing with feminine subject in ser-passive: fue administrada.' },
      { id: 4, answer: 'han',          acceptable: [], explanation: 'Passive se with present perfect: se han publicado los datos (the data have been published).' },
      { id: 5, answer: 'han',          acceptable: [], explanation: 'Ser-passive present perfect: no han sido confirmados.' },
      { id: 6, answer: 'realizarán',   acceptable: ['realizaran'], explanation: 'Impersonal/passive se with future: se realizarán nuevas pruebas.' },
      { id: 7, answer: 'verifiquen',   acceptable: [], explanation: 'Present subjunctive after "espera que se" — hope + passive se construction.' },
    ]
  },
  {
    id: 'cloze-21', level: 'C1', topic: 'nominalizations',
    title: 'Análisis económico', titleEn: 'Economic Analysis',
    passage: '{1} preocupante es que la inflación siga subiendo. {2} que invierten en tecnología obtienen mejores resultados. La {3} de los recursos ha sido desigual. {4} difícil de aceptar es la pérdida de poder adquisitivo. Los analistas afirman que {5} de la crisis dependerá de las políticas fiscales. {6} proponen recortes no consideran el impacto social. Es fundamental el {7} de los mercados emergentes. {8} más urgente sería reformar el sistema tributario.',
    blanks: [
      { id: 1, answer: 'Lo',            acceptable: [], explanation: 'Lo + adjective as nominalization: lo preocupante (the worrying thing).' },
      { id: 2, answer: 'Los que',       acceptable: ['Quienes'], explanation: 'Los que / Quienes as nominalized relative: those who invest.' },
      { id: 3, answer: 'distribución',  acceptable: ['distribucion'], explanation: 'Nominalization from distribuir: the distribution of resources.' },
      { id: 4, answer: 'Lo',            acceptable: [], explanation: 'Lo + adjective nominalization: lo difícil de aceptar (the hard thing to accept).' },
      { id: 5, answer: 'la salida',     acceptable: [], explanation: 'Nominalized expression: la salida de la crisis (the way out of the crisis).' },
      { id: 6, answer: 'Quienes',       acceptable: ['Los que'], explanation: 'Quienes / Los que as subject: those who propose cuts.' },
      { id: 7, answer: 'fortalecimiento', acceptable: [], explanation: 'Nominalization from fortalecer: el fortalecimiento (the strengthening).' },
      { id: 8, answer: 'Lo',            acceptable: [], explanation: 'Lo + adjective: lo más urgente (the most urgent thing).' },
    ]
  },
  {
    id: 'cloze-22', level: 'C1', topic: 'periphrasis',
    title: 'La vida moderna', titleEn: 'Modern Life',
    passage: 'María {1} trabajando en la misma empresa desde hace diez años. El mes pasado se {2} a buscar un nuevo empleo. Aunque {3} de fumar hace tiempo, a veces siente la tentación. Sus hijos {4} a pedirle que descanse más. Ella {5} por aceptar un puesto con menos presión. En cuanto {6} a tener tiempo libre, piensa viajar. El estrés {7} afectando su salud desde hace meses. Sus amigos le dicen que {8} a pensar en sí misma.',
    blanks: [
      { id: 1, answer: 'lleva',     acceptable: [], explanation: 'Llevar + gerund: ongoing action with duration — lleva trabajando (has been working).' },
      { id: 2, answer: 'puso',      acceptable: [], explanation: 'Ponerse a + infinitive: beginning of action — se puso a buscar (she started looking).' },
      { id: 3, answer: 'dejó',      acceptable: ['dejo'], explanation: 'Dejar de + infinitive: cessation — dejó de fumar (she quit smoking).' },
      { id: 4, answer: 'vuelven',   acceptable: [], explanation: 'Volver a + infinitive: repetition — vuelven a pedirle (they ask her again).' },
      { id: 5, answer: 'acabó',     acceptable: ['acabo', 'terminó', 'termino'], explanation: 'Acabar por + infinitive: eventual outcome — acabó por aceptar (she ended up accepting).' },
      { id: 6, answer: 'vuelva',    acceptable: [], explanation: 'Volver a + infinitive with subjunctive after "en cuanto" — future trigger.' },
      { id: 7, answer: 'viene',     acceptable: [], explanation: 'Venir + gerund: progressive accumulation — viene afectando (has been increasingly affecting).' },
      { id: 8, answer: 'tiene',     acceptable: [], explanation: 'Tener que + infinitive: obligation — tiene que pensar (she has to think). The "que" follows in the passage.' },
    ]
  },
  {
    id: 'cloze-23', level: 'C1', topic: 'conditional',
    title: 'Decisiones políticas', titleEn: 'Political Decisions',
    passage: 'Si el parlamento {1} la propuesta ayer, hoy {2} más estabilidad. Los ciudadanos habrían preferido que se {3} un referéndum. De haber {4} otra opción, el presidente no habría firmado el decreto. Si se invirtiera más en sanidad, {5} menos desigualdad. En caso de que {6} nuevas protestas, el gobierno tendría que negociar. Yo que tú, {7} la posición de la oposición. Si bien la economía {8} mejorado, queda mucho por hacer.',
    blanks: [
      { id: 1, answer: 'hubiera aprobado',   acceptable: ['hubiese aprobado'], explanation: 'Pluperfect subjunctive in past unreal si-clause.' },
      { id: 2, answer: 'habría',             acceptable: ['habria'], explanation: 'Conditional in result clause of mixed conditional (past cause → present result): hoy habría más estabilidad.' },
      { id: 3, answer: 'convocara',          acceptable: ['convocase'], explanation: 'Imperfect subjunctive after "habrían preferido que" — past unrealized wish.' },
      { id: 4, answer: 'tenido',             acceptable: [], explanation: 'De haber + past participle: alternative to si-clause for past unreal — de haber tenido.' },
      { id: 5, answer: 'habría',             acceptable: ['habria'], explanation: 'Standard conditional result clause: si se invirtiera … habría menos desigualdad.' },
      { id: 6, answer: 'hubiera',            acceptable: ['hubiese', 'haya'], explanation: 'Subjunctive after "en caso de que" — always requires subjunctive.' },
      { id: 7, answer: 'reconsideraría',     acceptable: ['reconsideraria'], explanation: 'Conditional after "yo que tú" — colloquial conditional advice structure.' },
      { id: 8, answer: 'ha',                 acceptable: [], explanation: 'Indicative after "si bien" — concessive clause stating a fact, not a hypothesis.' },
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C2 MASTERY  (4 passages)
  // ─────────────────────────────────────────────────────────

  {
    id: 'cloze-24', level: 'C2', topic: 'literary',
    title: 'Realismo mágico', titleEn: 'Magical Realism',
    passage: 'Apenas {1} terminado de llover, el anciano salió a la calle. Jamás {2} visto cosa semejante: del cielo {3} mariposas amarillas. Tan absorto {4} el pueblo que nadie {5} palabra. No bien {6} el sol, las mariposas se desvanecieron. Mucho se {7} después sobre aquel prodigio; nunca {8} nadie dar una explicación racional. Dijérase que la naturaleza misma {9} querido recordarles que lo imposible no es sino lo todavía no comprendido.',
    blanks: [
      { id: 1, answer: 'hubo',          acceptable: [], explanation: 'Preterite anterior (pretérito anterior): apenas hubo terminado — literary tense for immediate anteriority.' },
      { id: 2, answer: 'habían',        acceptable: ['habian'], explanation: 'Pluperfect indicative: jamás habían visto — background experience before the main event.' },
      { id: 3, answer: 'caían',         acceptable: ['caian'], explanation: 'Imperfect for ongoing descriptive scene: del cielo caían mariposas.' },
      { id: 4, answer: 'estaba',        acceptable: [], explanation: 'Stylistic inversion with tan … que: tan absorto estaba el pueblo — literary word order.' },
      { id: 5, answer: 'pronunció',     acceptable: ['pronuncio'], explanation: 'Preterite in the result of the correlative tan … que construction.' },
      { id: 6, answer: 'asomó',         acceptable: ['asomo'], explanation: 'Preterite after "no bien" — literary temporal connector meaning "as soon as".' },
      { id: 7, answer: 'habló',         acceptable: ['hablo'], explanation: 'Impersonal se + preterite: se habló (people talked / it was talked about).' },
      { id: 8, answer: 'pudo',          acceptable: [], explanation: 'Preterite of poder with negative: nunca pudo nadie — stylistic subject-verb inversion.' },
      { id: 9, answer: 'hubiera',       acceptable: ['hubiese'], explanation: 'Imperfect subjunctive after "dijérase que" — literary fixed expression (as if to say).' },
    ]
  },
  {
    id: 'cloze-25', level: 'C2', topic: 'academic',
    title: 'Lingüística aplicada', titleEn: 'Applied Linguistics',
    passage: 'El presente estudio {1} analizar la interferencia pragmática en hablantes bilingües. {2} lo anterior, se hace necesario revisar las teorías previas. Cabe {3} que los datos recabados no son extrapolables a todos los contextos. {4} se ha señalado en la literatura, la competencia comunicativa trasciende lo meramente gramatical. Los resultados, {5} provisionales, sugieren una correlación significativa. No {6}, quedan por resolver diversas cuestiones metodológicas. Habida {7} de las limitaciones muestrales, se propone ampliar el corpus. Es menester que futuras investigaciones {8} estas hipótesis con muestras más amplias.',
    blanks: [
      { id: 1, answer: 'pretende',      acceptable: [], explanation: 'Academic register: el estudio pretende (the study aims to) — formal purpose statement.' },
      { id: 2, answer: 'Dado',          acceptable: [], explanation: 'Discourse cohesion marker: dado lo anterior (given the above) — academic connector.' },
      { id: 3, answer: 'señalar',       acceptable: ['destacar'], explanation: 'Cabe + infinitive: academic hedging expression — cabe señalar (it is worth noting).' },
      { id: 4, answer: 'Tal como',      acceptable: ['Como', 'Según'], explanation: 'Academic discourse marker: tal como se ha señalado (as has been noted).' },
      { id: 5, answer: 'si bien',       acceptable: ['aunque'], explanation: 'Concessive connector in academic register: si bien provisionales (although provisional).' },
      { id: 6, answer: 'obstante',      acceptable: [], explanation: 'No obstante: formal adversative connector (nevertheless).' },
      { id: 7, answer: 'cuenta',        acceptable: [], explanation: 'Habida cuenta de: fixed academic/legal expression meaning "taking into account".' },
      { id: 8, answer: 'corroboren',    acceptable: ['verifiquen', 'confirmen'], explanation: 'Present subjunctive after "es menester que" — formal impersonal necessity.' },
    ]
  },
  {
    id: 'cloze-26', level: 'C2', topic: 'legal',
    title: 'Derecho internacional', titleEn: 'International Law',
    passage: 'Si un Estado {1} sus obligaciones bajo el tratado, será sometido a arbitraje. Quien {2} los términos del acuerdo deberá indemnizar a la parte afectada. Donde {3} conflicto entre normas, prevalecerá la de rango superior. Sea {4} fuere el resultado de la mediación, las partes quedan obligadas a acatar la resolución. Cualquiera que {5} la jurisdicción competente, el procedimiento se regirá por el derecho internacional. Los signatarios se comprometen a que se {6} las disposiciones en un plazo no mayor de seis meses. {7} cuenta de lo estipulado en el artículo tercero, no se admitirán reservas unilaterales. En caso de que se {8} la cláusula de salvaguarda, el tratado quedará sin efecto.',
    blanks: [
      { id: 1, answer: 'incumpliere',     acceptable: ['incumpliera', 'incumpliese'], explanation: 'Future subjunctive (legal register): si incumpliere — archaic form preserved in legal/formal Spanish.' },
      { id: 2, answer: 'contraviniese',   acceptable: ['contraviniere', 'contraviniera'], explanation: 'Imperfect or future subjunctive after "quien" in legal register — whoever should contravene.' },
      { id: 3, answer: 'hubiere',         acceptable: ['hubiera', 'hubiese'], explanation: 'Future subjunctive in legal conditional: donde hubiere conflicto (where there be conflict).' },
      { id: 4, answer: 'cual',            acceptable: [], explanation: 'Fixed legal expression: sea cual fuere — whatever it may be (concessive formula).' },
      { id: 5, answer: 'fuere',           acceptable: ['fuera', 'fuese', 'sea'], explanation: 'Future subjunctive: cualquiera que fuere — legal style for "whichever may be".' },
      { id: 6, answer: 'implementen',     acceptable: ['apliquen'], explanation: 'Present subjunctive after "se comprometen a que" — commitment to future action.' },
      { id: 7, answer: 'Habida',          acceptable: [], explanation: 'Habida cuenta de: fixed legal/formal expression meaning "in consideration of".' },
      { id: 8, answer: 'invocara',        acceptable: ['invocase', 'invocare'], explanation: 'Imperfect subjunctive after "en caso de que" — hypothetical legal scenario.' },
    ]
  },
  {
    id: 'cloze-27', level: 'C2', topic: 'dialectal',
    title: 'Variación lingüística', titleEn: 'Linguistic Variation',
    passage: 'En el Río de la Plata, los hablantes {1} "vos" en lugar de "tú". Mientras que en España se {2} el pretérito perfecto para acciones recientes, en Hispanoamérica {3} preferirse el indefinido. Lo que en Madrid llaman "{4}", en México se conoce como "computadora". No es que una variante {5} más correcta que otra, sino que cada dialecto responde a su propia evolución. Si se {6} con detenimiento la fonética del español andino, se apreciarían rasgos del contacto con el quechua. El voseo, lejos de ser un {7}, constituye una forma legítima y arraigada. Convendría que los manuales de enseñanza {8} esta riqueza dialectal en lugar de imponer un único modelo.',
    blanks: [
      { id: 1, answer: 'emplean',       acceptable: ['usan', 'utilizan'], explanation: 'Present indicative: factual statement about Rioplatense usage of vos.' },
      { id: 2, answer: 'emplea',        acceptable: ['usa', 'utiliza'], explanation: 'Impersonal se + singular: se emplea el pretérito perfecto — describing Peninsular Spanish usage.' },
      { id: 3, answer: 'suele',         acceptable: [], explanation: 'Soler + infinitive: habitual periphrasis — suele preferirse (it tends to be preferred).' },
      { id: 4, answer: 'ordenador',     acceptable: [], explanation: 'Dialectal vocabulary: "ordenador" is the Peninsular Spanish term for computer.' },
      { id: 5, answer: 'sea',           acceptable: [], explanation: 'Present subjunctive after "no es que" — negated assertion requires subjunctive.' },
      { id: 6, answer: 'analizara',     acceptable: ['analizase'], explanation: 'Imperfect subjunctive in si-clause: si se analizara — hypothetical condition.' },
      { id: 7, answer: 'vulgarismo',    acceptable: ['error'], explanation: 'Appropriate noun: vulgarismo (vulgarism) — the passage argues voseo is not a substandard form.' },
      { id: 8, answer: 'reflejaran',    acceptable: ['reflejasen', 'reflejen'], explanation: 'Imperfect subjunctive after "convendría que" — conditional wish about textbooks.' },
    ]
  },
];
