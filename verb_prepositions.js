'use strict';

// ════════════════════════════════════════════════════════════
//  VERB + PREPOSITION COMBINATIONS
//  A major pain point for English-speaking learners —
//  Spanish verbs often require different prepositions
//  than their English equivalents (or none at all).
// ════════════════════════════════════════════════════════════

const VERB_PREPOSITIONS_DATA = [

  // ──────────────────────────────────────
  //  VERB + EN  (11 items)
  // ──────────────────────────────────────

  {
    id: 'vp-1', verb: 'pensar', preposition: 'en',
    english: 'to think about',
    example: 'Siempre pienso en ti cuando escucho esa canción.',
    exampleEn: 'I always think about you when I hear that song.',
    level: 'A2',
    notes: 'English uses "about" but Spanish uses "en". "Pensar de" means "to have an opinion about".'
  },
  {
    id: 'vp-2', verb: 'consistir', preposition: 'en',
    english: 'to consist of',
    example: 'El examen consiste en tres partes: lectura, escritura y gramática.',
    exampleEn: 'The exam consists of three parts: reading, writing, and grammar.',
    level: 'B1',
    notes: 'English uses "of" but Spanish uses "en".'
  },
  {
    id: 'vp-3', verb: 'insistir', preposition: 'en',
    english: 'to insist on',
    example: 'Mi madre insiste en que limpie mi cuarto todos los días.',
    exampleEn: 'My mother insists on me cleaning my room every day.',
    level: 'B1',
    notes: 'Followed by "en que" + subjunctive when there is a change of subject.'
  },
  {
    id: 'vp-4', verb: 'confiar', preposition: 'en',
    english: 'to trust / to rely on',
    example: 'Confío en ti para terminar el proyecto a tiempo.',
    exampleEn: 'I trust you to finish the project on time.',
    level: 'B1',
    notes: 'English uses no preposition for "trust" but Spanish requires "en".'
  },
  {
    id: 'vp-5', verb: 'fijarse', preposition: 'en',
    english: 'to notice / to pay attention to',
    example: '¿Te fijaste en el vestido que llevaba María?',
    exampleEn: 'Did you notice the dress María was wearing?',
    level: 'B1',
    notes: 'Reflexive verb. "Fijarse en" = to notice; "fijar" (non-reflexive) = to fix/set.'
  },
  {
    id: 'vp-6', verb: 'convertirse', preposition: 'en',
    english: 'to become / to turn into',
    example: 'La oruga se convierte en mariposa.',
    exampleEn: 'The caterpillar turns into a butterfly.',
    level: 'B1',
    notes: 'Implies a fundamental transformation. Compare with "hacerse" and "ponerse".'
  },
  {
    id: 'vp-7', verb: 'tardar', preposition: 'en',
    english: 'to take time to / to be late in',
    example: 'Tardé dos horas en llegar al aeropuerto.',
    exampleEn: 'It took me two hours to get to the airport.',
    level: 'B1',
    notes: '"Tardar en" + infinitive. Different from English "it takes" construction.'
  },
  {
    id: 'vp-8', verb: 'quedar', preposition: 'en',
    english: 'to agree on / to arrange',
    example: 'Quedamos en vernos el viernes a las ocho.',
    exampleEn: 'We agreed to meet on Friday at eight.',
    level: 'B1',
    notes: '"Quedar en" = to agree/arrange. Different from "quedar" alone (to remain/stay).'
  },
  {
    id: 'vp-9', verb: 'influir', preposition: 'en',
    english: 'to influence',
    example: 'El clima influye en el estado de ánimo de las personas.',
    exampleEn: 'The weather influences people\'s mood.',
    level: 'B2',
    notes: 'English uses no preposition but Spanish requires "en".'
  },
  {
    id: 'vp-10', verb: 'empeñarse', preposition: 'en',
    english: 'to insist on / to be determined to',
    example: 'Se empeña en hacerlo todo solo.',
    exampleEn: 'He insists on doing everything himself.',
    level: 'B2',
    notes: 'Reflexive. Stronger than "insistir en" — implies stubbornness.'
  },
  {
    id: 'vp-11', verb: 'especializarse', preposition: 'en',
    english: 'to specialize in',
    example: 'Mi hermana se especializa en derecho internacional.',
    exampleEn: 'My sister specializes in international law.',
    level: 'B2',
    notes: 'Same preposition as English — one of the easier ones!'
  },

  // ──────────────────────────────────────
  //  VERB + DE  (14 items)
  // ──────────────────────────────────────

  {
    id: 'vp-12', verb: 'depender', preposition: 'de',
    english: 'to depend on',
    example: 'Tu nota depende de cuánto estudies.',
    exampleEn: 'Your grade depends on how much you study.',
    level: 'A2',
    notes: 'English uses "on" but Spanish uses "de". Very common combination.'
  },
  {
    id: 'vp-13', verb: 'tratar', preposition: 'de',
    english: 'to try to',
    example: 'Traté de llamarte pero no contestaste.',
    exampleEn: 'I tried to call you but you didn\'t answer.',
    level: 'A2',
    notes: '"Tratar de" + infinitive = to try to. "Tratar" alone can mean "to treat".'
  },
  {
    id: 'vp-14', verb: 'dejar', preposition: 'de',
    english: 'to stop / to quit',
    example: 'Dejé de fumar hace tres años.',
    exampleEn: 'I stopped smoking three years ago.',
    level: 'A2',
    notes: '"Dejar de" + infinitive = to stop doing. "Dejar" alone = to leave/let.'
  },
  {
    id: 'vp-15', verb: 'acabar', preposition: 'de',
    english: 'to have just (done something)',
    example: 'Acabo de llegar a casa.',
    exampleEn: 'I have just arrived home.',
    level: 'A2',
    notes: '"Acabar de" + infinitive in present tense = to have just done. Very useful construction.'
  },
  {
    id: 'vp-16', verb: 'enamorarse', preposition: 'de',
    english: 'to fall in love with',
    example: 'Se enamoró de ella la primera vez que la vio.',
    exampleEn: 'He fell in love with her the first time he saw her.',
    level: 'A2',
    notes: 'Reflexive verb. English uses "with" but Spanish uses "de".'
  },
  {
    id: 'vp-17', verb: 'acordarse', preposition: 'de',
    english: 'to remember',
    example: '¿Te acuerdas de aquella vez que fuimos a la playa?',
    exampleEn: 'Do you remember that time we went to the beach?',
    level: 'A2',
    notes: 'Reflexive. "Acordarse de" = to remember. "Recordar" (no preposition) also means to remember.'
  },
  {
    id: 'vp-18', verb: 'olvidarse', preposition: 'de',
    english: 'to forget about',
    example: 'Me olvidé de comprar leche.',
    exampleEn: 'I forgot to buy milk.',
    level: 'A2',
    notes: 'Reflexive. "Olvidarse de" requires the preposition. "Olvidar" (non-reflexive) does not.'
  },
  {
    id: 'vp-19', verb: 'quejarse', preposition: 'de',
    english: 'to complain about',
    example: 'Siempre se queja de todo.',
    exampleEn: 'He always complains about everything.',
    level: 'B1',
    notes: 'Reflexive verb. English "about" → Spanish "de".'
  },
  {
    id: 'vp-20', verb: 'reírse', preposition: 'de',
    english: 'to laugh at',
    example: 'No te rías de mí, estoy hablando en serio.',
    exampleEn: 'Don\'t laugh at me, I\'m being serious.',
    level: 'B1',
    notes: 'Reflexive. English "at" → Spanish "de".'
  },
  {
    id: 'vp-21', verb: 'disfrutar', preposition: 'de',
    english: 'to enjoy',
    example: 'Disfruta de cada momento de la vida.',
    exampleEn: 'Enjoy every moment of life.',
    level: 'B1',
    notes: '"Disfrutar de" is the traditional form, though "disfrutar" without "de" is increasingly common.'
  },
  {
    id: 'vp-22', verb: 'darse cuenta', preposition: 'de',
    english: 'to realize',
    example: 'No me di cuenta de que estabas ahí.',
    exampleEn: 'I didn\'t realize you were there.',
    level: 'B1',
    notes: 'Fixed expression: "darse cuenta de que". The "de" is required (not "dequeísmo").'
  },
  {
    id: 'vp-23', verb: 'arrepentirse', preposition: 'de',
    english: 'to regret',
    example: 'No me arrepiento de nada.',
    exampleEn: 'I don\'t regret anything.',
    level: 'B2',
    notes: 'Reflexive. English needs no preposition, Spanish requires "de".'
  },
  {
    id: 'vp-24', verb: 'carecer', preposition: 'de',
    english: 'to lack',
    example: 'El informe carece de datos suficientes.',
    exampleEn: 'The report lacks sufficient data.',
    level: 'C1',
    notes: 'Formal register. English uses no preposition; Spanish requires "de".'
  },
  {
    id: 'vp-25', verb: 'abstenerse', preposition: 'de',
    english: 'to refrain from',
    example: 'Se abstuvo de hacer comentarios sobre el caso.',
    exampleEn: 'He refrained from commenting on the case.',
    level: 'C1',
    notes: 'Reflexive. Formal register. English uses "from", Spanish uses "de".'
  },

  // ──────────────────────────────────────
  //  VERB + A  (15 items)
  // ──────────────────────────────────────

  {
    id: 'vp-26', verb: 'empezar / comenzar', preposition: 'a',
    english: 'to start to / to begin to',
    example: 'Empecé a estudiar español el año pasado.',
    exampleEn: 'I started studying Spanish last year.',
    level: 'A2',
    notes: 'Both "empezar a" and "comenzar a" work the same way. + infinitive.'
  },
  {
    id: 'vp-27', verb: 'aprender', preposition: 'a',
    english: 'to learn to',
    example: 'Mi hija está aprendiendo a nadar.',
    exampleEn: 'My daughter is learning to swim.',
    level: 'A2',
    notes: '"Aprender a" + infinitive. The "a" is required before the infinitive.'
  },
  {
    id: 'vp-28', verb: 'ayudar', preposition: 'a',
    english: 'to help to',
    example: 'Te ayudo a llevar las bolsas.',
    exampleEn: 'I\'ll help you carry the bags.',
    level: 'A2',
    notes: '"Ayudar a" + infinitive. Also "ayudar a alguien" (to help someone — personal a).'
  },
  {
    id: 'vp-29', verb: 'invitar', preposition: 'a',
    english: 'to invite to',
    example: 'Nos invitaron a cenar en su casa.',
    exampleEn: 'They invited us to have dinner at their house.',
    level: 'A2',
    notes: '"Invitar a" + infinitive or "invitar a" + noun (event).'
  },
  {
    id: 'vp-30', verb: 'ir', preposition: 'a',
    english: 'to go to / to be going to',
    example: 'Voy a viajar a México el próximo mes.',
    exampleEn: 'I\'m going to travel to Mexico next month.',
    level: 'A1',
    notes: '"Ir a" + infinitive = near future (going to). Also "ir a" + place.'
  },
  {
    id: 'vp-31', verb: 'volver', preposition: 'a',
    english: 'to do again',
    example: 'Volvió a llamarme a las diez de la noche.',
    exampleEn: 'He called me again at ten at night.',
    level: 'A2',
    notes: '"Volver a" + infinitive = to do something again. Very useful construction.'
  },
  {
    id: 'vp-32', verb: 'enseñar', preposition: 'a',
    english: 'to teach to',
    example: 'Mi abuelo me enseñó a jugar al ajedrez.',
    exampleEn: 'My grandfather taught me to play chess.',
    level: 'A2',
    notes: '"Enseñar a" + infinitive = to teach (how) to do something.'
  },
  {
    id: 'vp-33', verb: 'llegar', preposition: 'a',
    english: 'to arrive at / to manage to',
    example: 'Llegamos a un acuerdo después de varias horas.',
    exampleEn: 'We reached an agreement after several hours.',
    level: 'B1',
    notes: '"Llegar a" + place = to arrive at. "Llegar a" + infinitive = to manage to.'
  },
  {
    id: 'vp-34', verb: 'atreverse', preposition: 'a',
    english: 'to dare to',
    example: 'No me atrevo a decirle la verdad.',
    exampleEn: 'I don\'t dare tell him the truth.',
    level: 'B1',
    notes: 'Reflexive. "Atreverse a" + infinitive.'
  },
  {
    id: 'vp-35', verb: 'dedicarse', preposition: 'a',
    english: 'to devote oneself to / to do for a living',
    example: '¿A qué te dedicas? — Me dedico a la enseñanza.',
    exampleEn: 'What do you do for a living? — I\'m a teacher.',
    level: 'B1',
    notes: 'Reflexive. "¿A qué te dedicas?" is a common way to ask someone\'s profession.'
  },
  {
    id: 'vp-36', verb: 'ponerse', preposition: 'a',
    english: 'to start to (suddenly)',
    example: 'De repente se puso a llover.',
    exampleEn: 'Suddenly it started to rain.',
    level: 'B1',
    notes: '"Ponerse a" implies a sudden or abrupt beginning, unlike "empezar a".'
  },
  {
    id: 'vp-37', verb: 'negarse', preposition: 'a',
    english: 'to refuse to',
    example: 'Se negó a firmar el contrato.',
    exampleEn: 'He refused to sign the contract.',
    level: 'B1',
    notes: 'Reflexive. "Negarse a" + infinitive.'
  },
  {
    id: 'vp-38', verb: 'acostumbrarse', preposition: 'a',
    english: 'to get used to',
    example: 'Todavía no me acostumbro al frío de aquí.',
    exampleEn: 'I still haven\'t gotten used to the cold here.',
    level: 'B1',
    notes: 'Reflexive. Can be followed by infinitive or noun. "Al" = "a" + "el".'
  },
  {
    id: 'vp-39', verb: 'contribuir', preposition: 'a',
    english: 'to contribute to',
    example: 'Todos debemos contribuir a mejorar la sociedad.',
    exampleEn: 'We should all contribute to improving society.',
    level: 'B2',
    notes: 'Same preposition mapping as English — contribuir a = contribute to.'
  },
  {
    id: 'vp-40', verb: 'aspirar', preposition: 'a',
    english: 'to aspire to',
    example: 'Aspira a ser la mejor cirujana del país.',
    exampleEn: 'She aspires to be the best surgeon in the country.',
    level: 'B2',
    notes: '"Aspirar a" + infinitive or noun.'
  },

  // ──────────────────────────────────────
  //  VERB + CON  (8 items)
  // ──────────────────────────────────────

  {
    id: 'vp-41', verb: 'soñar', preposition: 'con',
    english: 'to dream about / of',
    example: 'Anoche soñé con que volaba sobre las montañas.',
    exampleEn: 'Last night I dreamed about flying over the mountains.',
    level: 'A2',
    notes: 'English uses "about/of" but Spanish uses "con" (with).'
  },
  {
    id: 'vp-42', verb: 'contar', preposition: 'con',
    english: 'to count on / to rely on',
    example: 'Puedes contar conmigo para lo que necesites.',
    exampleEn: 'You can count on me for whatever you need.',
    level: 'B1',
    notes: '"Contar con" = to count on. "Contar" alone = to count/to tell.'
  },
  {
    id: 'vp-43', verb: 'encontrarse', preposition: 'con',
    english: 'to run into / to meet up with',
    example: 'Me encontré con Ana en el supermercado.',
    exampleEn: 'I ran into Ana at the supermarket.',
    level: 'B1',
    notes: 'Reflexive. "Encontrarse con" = to bump into. "Encontrar" alone = to find.'
  },
  {
    id: 'vp-44', verb: 'casarse', preposition: 'con',
    english: 'to marry / to get married to',
    example: 'Se casó con su mejor amigo.',
    exampleEn: 'She married her best friend.',
    level: 'A2',
    notes: 'Reflexive. English says "marry someone" (no preposition) but Spanish requires "con".'
  },
  {
    id: 'vp-45', verb: 'quedarse', preposition: 'con',
    english: 'to keep / to hold onto',
    example: 'Quédate con el cambio.',
    exampleEn: 'Keep the change.',
    level: 'B1',
    notes: 'Reflexive. "Quedarse con" = to keep. Different from "quedar en" (to agree).'
  },
  {
    id: 'vp-46', verb: 'amenazar', preposition: 'con',
    english: 'to threaten to / to threaten with',
    example: 'Me amenazó con llamar a la policía.',
    exampleEn: 'He threatened to call the police.',
    level: 'B2',
    notes: '"Amenazar con" + infinitive or noun.'
  },
  {
    id: 'vp-47', verb: 'cumplir', preposition: 'con',
    english: 'to comply with / to fulfill',
    example: 'La empresa no cumplió con sus obligaciones.',
    exampleEn: 'The company didn\'t fulfill its obligations.',
    level: 'B2',
    notes: '"Cumplir con" = to comply with/fulfill. "Cumplir" alone = to turn (age)/to fulfill.'
  },
  {
    id: 'vp-48', verb: 'tropezar', preposition: 'con',
    english: 'to trip over / to stumble upon',
    example: 'Tropecé con una piedra y me caí.',
    exampleEn: 'I tripped over a stone and fell.',
    level: 'B2',
    notes: 'Can be literal (trip over) or figurative (stumble upon something).'
  },

  // ──────────────────────────────────────
  //  VERB + POR  (7 items)
  // ──────────────────────────────────────

  {
    id: 'vp-49', verb: 'preocuparse', preposition: 'por',
    english: 'to worry about',
    example: 'No te preocupes por el dinero, yo invito.',
    exampleEn: 'Don\'t worry about the money, my treat.',
    level: 'A2',
    notes: 'Reflexive. English "about" → Spanish "por".'
  },
  {
    id: 'vp-50', verb: 'interesarse', preposition: 'por',
    english: 'to be interested in',
    example: 'Se interesa mucho por la historia de España.',
    exampleEn: 'He\'s very interested in the history of Spain.',
    level: 'B1',
    notes: 'Reflexive. English "in" → Spanish "por". Also valid: "interesarse en".'
  },
  {
    id: 'vp-51', verb: 'disculparse', preposition: 'por',
    english: 'to apologize for',
    example: 'Se disculpó por llegar tarde.',
    exampleEn: 'She apologized for arriving late.',
    level: 'B1',
    notes: 'Reflexive. "Disculparse por" + infinitive or noun.'
  },
  {
    id: 'vp-52', verb: 'optar', preposition: 'por',
    english: 'to opt for / to choose',
    example: 'Optaron por la solución más económica.',
    exampleEn: 'They opted for the cheapest solution.',
    level: 'B2',
    notes: '"Optar por" + infinitive or noun.'
  },
  {
    id: 'vp-53', verb: 'luchar', preposition: 'por',
    english: 'to fight for',
    example: 'Lucharon por la libertad de su pueblo.',
    exampleEn: 'They fought for the freedom of their people.',
    level: 'B2',
    notes: '"Luchar por" = to fight for. "Luchar contra" = to fight against.'
  },
  {
    id: 'vp-54', verb: 'felicitar', preposition: 'por',
    english: 'to congratulate on',
    example: 'Te felicito por tu ascenso.',
    exampleEn: 'I congratulate you on your promotion.',
    level: 'B1',
    notes: 'English "on" → Spanish "por".'
  },
  {
    id: 'vp-55', verb: 'esforzarse', preposition: 'por',
    english: 'to make an effort to / to strive to',
    example: 'Se esfuerza por sacar buenas notas.',
    exampleEn: 'She makes an effort to get good grades.',
    level: 'B2',
    notes: 'Reflexive. "Esforzarse por" + infinitive. Also valid: "esforzarse en".'
  },

  // ──────────────────────────────────────
  //  VERB + PARA  (3 items)
  // ──────────────────────────────────────

  {
    id: 'vp-56', verb: 'servir', preposition: 'para',
    english: 'to be useful for / to serve to',
    example: 'Este cuchillo no sirve para cortar pan.',
    exampleEn: 'This knife is no good for cutting bread.',
    level: 'A2',
    notes: '"Servir para" + infinitive or noun = to be useful for.'
  },
  {
    id: 'vp-57', verb: 'prepararse', preposition: 'para',
    english: 'to prepare for',
    example: 'Me estoy preparando para el examen final.',
    exampleEn: 'I\'m preparing for the final exam.',
    level: 'B1',
    notes: 'Reflexive. Same preposition logic as English.'
  },
  {
    id: 'vp-58', verb: 'bastar', preposition: 'para',
    english: 'to be enough to',
    example: 'Un solo error basta para perderlo todo.',
    exampleEn: 'A single mistake is enough to lose everything.',
    level: 'B2',
    notes: '"Bastar para" + infinitive. Often used impersonally.'
  },

  // ──────────────────────────────────────
  //  NO PREPOSITION (where English uses one) (5 items)
  // ──────────────────────────────────────

  {
    id: 'vp-59', verb: 'buscar', preposition: '—',
    english: 'to look for',
    example: 'Estoy buscando mis llaves.',
    exampleEn: 'I\'m looking for my keys.',
    level: 'A1',
    notes: 'NO preposition! English says "look FOR" but Spanish uses no preposition: "buscar algo".'
  },
  {
    id: 'vp-60', verb: 'esperar', preposition: '—',
    english: 'to wait for / to hope for',
    example: 'Te espero en la entrada del cine.',
    exampleEn: 'I\'ll wait for you at the cinema entrance.',
    level: 'A1',
    notes: 'NO preposition! English says "wait FOR" but Spanish uses no preposition: "esperar algo/a alguien".'
  },
  {
    id: 'vp-61', verb: 'pedir', preposition: '—',
    english: 'to ask for',
    example: 'Pedí una cerveza y unas tapas.',
    exampleEn: 'I asked for a beer and some tapas.',
    level: 'A1',
    notes: 'NO preposition! English says "ask FOR" but Spanish uses no preposition. "Pedir algo a alguien".'
  },
  {
    id: 'vp-62', verb: 'escuchar', preposition: '—',
    english: 'to listen to',
    example: 'Me encanta escuchar música clásica.',
    exampleEn: 'I love listening to classical music.',
    level: 'A1',
    notes: 'NO preposition! English says "listen TO" but Spanish uses no preposition.'
  },
  {
    id: 'vp-63', verb: 'mirar', preposition: '—',
    english: 'to look at',
    example: 'Mira las estrellas, ¡qué bonitas!',
    exampleEn: 'Look at the stars, how beautiful!',
    level: 'A1',
    notes: 'NO preposition! English says "look AT" but Spanish uses no preposition.'
  },
];

const VERB_PREPOSITIONS_QUIZ = [
  {
    id: 'vpq-1',
    question: 'Complete: Siempre sueño ___ viajar a Japón.',
    answer: 'con',
    options: ['con', 'en', 'de', 'por'],
    explanation: '"Soñar con" = to dream about/of. English uses "about" but Spanish uses "con" (with).'
  },
  {
    id: 'vpq-2',
    question: 'Complete: Dejé ___ comer carne hace un año.',
    answer: 'de',
    options: ['de', 'a', 'en', 'por'],
    explanation: '"Dejar de" + infinitive = to stop doing something.'
  },
  {
    id: 'vpq-3',
    question: 'Complete: Estoy buscando ___ mis gafas.',
    answer: '(nothing)',
    options: ['(nothing)', 'por', 'para', 'a'],
    explanation: '"Buscar" takes NO preposition in Spanish, unlike English "look for".'
  },
  {
    id: 'vpq-4',
    question: 'Complete: Me enamoré ___ ella en la universidad.',
    answer: 'de',
    options: ['de', 'con', 'a', 'en'],
    explanation: '"Enamorarse de" = to fall in love with. English uses "with" but Spanish uses "de".'
  },
  {
    id: 'vpq-5',
    question: 'Complete: Voy ___ empezar un curso nuevo.',
    answer: 'a',
    options: ['a', 'de', 'en', 'por'],
    explanation: '"Ir a" + infinitive = the near future tense (going to do something).'
  },
];
