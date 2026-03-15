'use strict';

// ════════════════════════════════════════════════════════════
//  SUBJUNCTIVE TRIGGERS
//  Expressions that require the subjunctive mood —
//  organized by category. The subjunctive is one of the
//  hardest aspects of Spanish for English speakers because
//  English has almost entirely lost its subjunctive forms.
// ════════════════════════════════════════════════════════════

const SUBJUNCTIVE_TRIGGER_CATEGORIES = {
  wishes: {
    id: 'wishes',
    label: 'Wishes & Desires',
    labelEs: 'Deseos y voluntad',
    description: 'Expressions of wanting, wishing, hoping, and preferring.',
  },
  emotions: {
    id: 'emotions',
    label: 'Emotions & Feelings',
    labelEs: 'Emociones y sentimientos',
    description: 'Expressions of happiness, sadness, surprise, fear, and other emotions.',
  },
  doubt: {
    id: 'doubt',
    label: 'Doubt & Denial',
    labelEs: 'Duda y negación',
    description: 'Expressions of doubt, disbelief, denial, and uncertainty.',
  },
  impersonal: {
    id: 'impersonal',
    label: 'Impersonal Expressions',
    labelEs: 'Expresiones impersonales',
    description: 'Impersonal constructions with "es" that express judgment, necessity, or possibility.',
  },
  purpose: {
    id: 'purpose',
    label: 'Purpose & Condition',
    labelEs: 'Finalidad y condición',
    description: 'Conjunctions expressing purpose, conditions, and provisions.',
  },
  time: {
    id: 'time',
    label: 'Time (Future Reference)',
    labelEs: 'Tiempo (referencia futura)',
    description: 'Temporal conjunctions that take subjunctive when referring to future/hypothetical events.',
  },
  concession: {
    id: 'concession',
    label: 'Concession & Negation',
    labelEs: 'Concesión y negación',
    description: 'Expressions of concession, exception, and negative conditions.',
  },
  commands: {
    id: 'commands',
    label: 'Commands & Influence',
    labelEs: 'Mandatos e influencia',
    description: 'Verbs of ordering, recommending, suggesting, and influencing.',
  },
};

const SUBJUNCTIVE_TRIGGERS_DATA = [

  // ──────────────────────────────────────
  //  WISHES & DESIRES  (8 items)
  // ──────────────────────────────────────

  {
    id: 'subj-1', trigger: 'querer que', category: 'wishes',
    english: 'to want (someone to)',
    example: 'Quiero que vengas a mi fiesta de cumpleaños.',
    exampleEn: 'I want you to come to my birthday party.',
    level: 'A2',
    notes: 'The most basic subjunctive trigger. "Quiero que + subjunctive" when there is a change of subject. "Quiero ir" (same subject) uses infinitive.'
  },
  {
    id: 'subj-2', trigger: 'desear que', category: 'wishes',
    english: 'to wish that',
    example: 'Deseo que todo salga bien en tu operación.',
    exampleEn: 'I wish everything goes well with your surgery.',
    level: 'B1',
    notes: 'More formal than "querer que". Common in well-wishes.'
  },
  {
    id: 'subj-3', trigger: 'esperar que', category: 'wishes',
    english: 'to hope that',
    example: 'Espero que te mejores pronto.',
    exampleEn: 'I hope you get better soon.',
    level: 'A2',
    notes: '"Esperar que" + subjunctive = to hope. Very common in everyday speech.'
  },
  {
    id: 'subj-4', trigger: 'preferir que', category: 'wishes',
    english: 'to prefer that',
    example: 'Prefiero que me digas la verdad.',
    exampleEn: 'I prefer that you tell me the truth.',
    level: 'B1',
    notes: 'Change of subject requires subjunctive. Same subject uses infinitive: "Prefiero ir".'
  },
  {
    id: 'subj-5', trigger: 'necesitar que', category: 'wishes',
    english: 'to need (someone to)',
    example: 'Necesito que me ayudes con la mudanza.',
    exampleEn: 'I need you to help me with the move.',
    level: 'A2',
    notes: 'When the subject changes: subjunctive. Same subject: infinitive ("Necesito dormir").'
  },
  {
    id: 'subj-6', trigger: 'ojalá (que)', category: 'wishes',
    english: 'hopefully / I wish',
    example: 'Ojalá que no llueva mañana.',
    exampleEn: 'Hopefully it won\'t rain tomorrow.',
    level: 'B1',
    notes: 'From Arabic "inshallah". ALWAYS takes subjunctive. Present subj. = hope; imperfect subj. = unlikely wish.'
  },
  {
    id: 'subj-7', trigger: 'pedir que', category: 'wishes',
    english: 'to ask that / to request that',
    example: 'Te pido que tengas paciencia.',
    exampleEn: 'I ask you to be patient.',
    level: 'B1',
    notes: '"Pedir que" + subjunctive. Different from "preguntar" (to ask a question).'
  },
  {
    id: 'subj-8', trigger: 'rogar que', category: 'wishes',
    english: 'to beg / to plead that',
    example: 'Le ruego que me perdone.',
    exampleEn: 'I beg you to forgive me.',
    level: 'B2',
    notes: 'Very formal. Common in official correspondence: "Le rogamos que...".'
  },

  // ──────────────────────────────────────
  //  EMOTIONS & FEELINGS  (8 items)
  // ──────────────────────────────────────

  {
    id: 'subj-9', trigger: 'alegrarse de que', category: 'emotions',
    english: 'to be glad that',
    example: 'Me alegro de que hayas conseguido el trabajo.',
    exampleEn: 'I\'m glad you got the job.',
    level: 'B1',
    notes: 'Reflexive. The "de" is important — "alegrarse de que" (not just "alegrarse que").'
  },
  {
    id: 'subj-10', trigger: 'sentir que', category: 'emotions',
    english: 'to be sorry that / to regret that',
    example: 'Siento que no puedas venir a la boda.',
    exampleEn: 'I\'m sorry you can\'t come to the wedding.',
    level: 'B1',
    notes: '"Sentir que" + subjunctive = to regret/be sorry. Don\'t confuse with "sentir" = to feel.'
  },
  {
    id: 'subj-11', trigger: 'temer que', category: 'emotions',
    english: 'to fear that',
    example: 'Temo que sea demasiado tarde para cambiar de opinión.',
    exampleEn: 'I fear it\'s too late to change your mind.',
    level: 'B2',
    notes: '"Temer que" + subjunctive. More formal than "tener miedo de que".'
  },
  {
    id: 'subj-12', trigger: 'sorprender que', category: 'emotions',
    english: 'to surprise that',
    example: 'Me sorprende que no sepas la respuesta.',
    exampleEn: 'It surprises me that you don\'t know the answer.',
    level: 'B1',
    notes: 'Works like "gustar": "Me sorprende que..." (it surprises me that...).'
  },
  {
    id: 'subj-13', trigger: 'molestar que', category: 'emotions',
    english: 'to bother/annoy that',
    example: 'Me molesta que la gente hable en el cine.',
    exampleEn: 'It bothers me that people talk in the cinema.',
    level: 'B1',
    notes: 'Gustar-type construction. "Me molesta que" + subjunctive.'
  },
  {
    id: 'subj-14', trigger: 'encantar que', category: 'emotions',
    english: 'to love that / to be delighted that',
    example: 'Me encanta que mis hijos lean mucho.',
    exampleEn: 'I love that my children read a lot.',
    level: 'B1',
    notes: 'Gustar-type verb. Subjunctive because it expresses an emotional reaction.'
  },
  {
    id: 'subj-15', trigger: 'tener miedo de que', category: 'emotions',
    english: 'to be afraid that',
    example: 'Tengo miedo de que me despidan.',
    exampleEn: 'I\'m afraid they\'ll fire me.',
    level: 'B1',
    notes: '"Tener miedo de que" + subjunctive. Less formal than "temer que".'
  },
  {
    id: 'subj-16', trigger: 'dar pena que', category: 'emotions',
    english: 'to be sad/a pity that',
    example: 'Me da pena que cierren esa librería.',
    exampleEn: 'It\'s sad that they\'re closing that bookshop.',
    level: 'B2',
    notes: 'Gustar-type construction. "Dar pena" = to sadden / to be a pity.'
  },

  // ──────────────────────────────────────
  //  DOUBT & DENIAL  (7 items)
  // ──────────────────────────────────────

  {
    id: 'subj-17', trigger: 'dudar que', category: 'doubt',
    english: 'to doubt that',
    example: 'Dudo que termine el proyecto a tiempo.',
    exampleEn: 'I doubt he\'ll finish the project on time.',
    level: 'B1',
    notes: '"Dudar que" + subjunctive. But "no dudar que" often takes indicative (certainty).'
  },
  {
    id: 'subj-18', trigger: 'no creer que', category: 'doubt',
    english: 'to not believe that',
    example: 'No creo que sea buena idea.',
    exampleEn: 'I don\'t think it\'s a good idea.',
    level: 'B1',
    notes: 'Negative "creer" → subjunctive. Affirmative "creer que" → indicative ("Creo que es...").'
  },
  {
    id: 'subj-19', trigger: 'no pensar que', category: 'doubt',
    english: 'to not think that',
    example: 'No pienso que tengas razón.',
    exampleEn: 'I don\'t think you\'re right.',
    level: 'B1',
    notes: 'Like "no creer que": negative → subjunctive, affirmative → indicative.'
  },
  {
    id: 'subj-20', trigger: 'negar que', category: 'doubt',
    english: 'to deny that',
    example: 'Niega que haya cometido el error.',
    exampleEn: 'He denies having made the mistake.',
    level: 'B2',
    notes: '"Negar que" + subjunctive. Expresses denial of reality.'
  },
  {
    id: 'subj-21', trigger: 'no estar seguro de que', category: 'doubt',
    english: 'to not be sure that',
    example: 'No estoy seguro de que eso sea verdad.',
    exampleEn: 'I\'m not sure that\'s true.',
    level: 'B1',
    notes: 'Negative → subjunctive. "Estoy seguro de que" (affirmative) → indicative.'
  },
  {
    id: 'subj-22', trigger: 'no parecer que', category: 'doubt',
    english: 'to not seem that',
    example: 'No parece que vayan a llegar a tiempo.',
    exampleEn: 'It doesn\'t seem like they\'re going to arrive on time.',
    level: 'B2',
    notes: 'Negated "parecer" triggers subjunctive. Affirmative usually takes indicative.'
  },
  {
    id: 'subj-23', trigger: 'puede que', category: 'doubt',
    english: 'it\'s possible that / maybe',
    example: 'Puede que llueva esta tarde.',
    exampleEn: 'It might rain this afternoon.',
    level: 'B1',
    notes: '"Puede que" ALWAYS takes subjunctive. Synonymous with "quizás" or "tal vez".'
  },

  // ──────────────────────────────────────
  //  IMPERSONAL EXPRESSIONS  (10 items)
  // ──────────────────────────────────────

  {
    id: 'subj-24', trigger: 'es importante que', category: 'impersonal',
    english: 'it\'s important that',
    example: 'Es importante que llegues a tiempo a la entrevista.',
    exampleEn: 'It\'s important that you arrive on time for the interview.',
    level: 'A2',
    notes: 'One of the first subjunctive triggers students learn. Very high frequency.'
  },
  {
    id: 'subj-25', trigger: 'es necesario que', category: 'impersonal',
    english: 'it\'s necessary that',
    example: 'Es necesario que todos participen en la reunión.',
    exampleEn: 'It\'s necessary that everyone participates in the meeting.',
    level: 'B1',
    notes: 'Expresses necessity/obligation. "Es necesario" + infinitive when no specific subject.'
  },
  {
    id: 'subj-26', trigger: 'es posible que', category: 'impersonal',
    english: 'it\'s possible that',
    example: 'Es posible que cambiemos de planes.',
    exampleEn: 'It\'s possible that we\'ll change plans.',
    level: 'B1',
    notes: 'Expresses possibility (not certainty) → subjunctive.'
  },
  {
    id: 'subj-27', trigger: 'es mejor que', category: 'impersonal',
    english: 'it\'s better that',
    example: 'Es mejor que hables con ella directamente.',
    exampleEn: 'It\'s better that you talk to her directly.',
    level: 'A2',
    notes: 'Very common for giving advice. "Es mejor" + infinitive when general.'
  },
  {
    id: 'subj-28', trigger: 'es probable que', category: 'impersonal',
    english: 'it\'s probable that',
    example: 'Es probable que nieve mañana.',
    exampleEn: 'It\'s likely that it will snow tomorrow.',
    level: 'B1',
    notes: 'Despite "probable" meaning likely, it still takes subjunctive because it\'s not a certainty.'
  },
  {
    id: 'subj-29', trigger: 'es una lástima que', category: 'impersonal',
    english: 'it\'s a shame that',
    example: 'Es una lástima que no puedas quedarte más tiempo.',
    exampleEn: 'It\'s a shame you can\'t stay longer.',
    level: 'B1',
    notes: 'Emotional judgment → subjunctive.'
  },
  {
    id: 'subj-30', trigger: 'es raro que', category: 'impersonal',
    english: 'it\'s strange that',
    example: 'Es raro que no haya llamado todavía.',
    exampleEn: 'It\'s strange that he hasn\'t called yet.',
    level: 'B1',
    notes: 'Expresses surprise/judgment about a situation.'
  },
  {
    id: 'subj-31', trigger: 'es ridículo que', category: 'impersonal',
    english: 'it\'s ridiculous that',
    example: 'Es ridículo que cobren tanto por un café.',
    exampleEn: 'It\'s ridiculous that they charge so much for a coffee.',
    level: 'B2',
    notes: 'Emotional judgment → subjunctive.'
  },
  {
    id: 'subj-32', trigger: 'es imprescindible que', category: 'impersonal',
    english: 'it\'s essential that',
    example: 'Es imprescindible que todos respeten las normas.',
    exampleEn: 'It\'s essential that everyone respects the rules.',
    level: 'B2',
    notes: 'Stronger than "es necesario que". Formal register.'
  },
  {
    id: 'subj-33', trigger: 'es lógico que', category: 'impersonal',
    english: 'it\'s logical that',
    example: 'Es lógico que estés cansado después de correr diez kilómetros.',
    exampleEn: 'It\'s logical that you\'re tired after running ten kilometers.',
    level: 'B2',
    notes: 'Even though it expresses logic, it\'s a subjective judgment → subjunctive.'
  },

  // ──────────────────────────────────────
  //  PURPOSE & CONDITION  (6 items)
  // ──────────────────────────────────────

  {
    id: 'subj-34', trigger: 'para que', category: 'purpose',
    english: 'so that / in order that',
    example: 'Te lo explico para que lo entiendas.',
    exampleEn: 'I\'m explaining it so that you understand.',
    level: 'B1',
    notes: '"Para que" ALWAYS requires subjunctive. Same subject → "para" + infinitive.'
  },
  {
    id: 'subj-35', trigger: 'a fin de que', category: 'purpose',
    english: 'in order that',
    example: 'Habló despacio a fin de que todos comprendieran.',
    exampleEn: 'He spoke slowly so that everyone would understand.',
    level: 'B2',
    notes: 'More formal synonym of "para que". Always + subjunctive.'
  },
  {
    id: 'subj-36', trigger: 'con tal de que', category: 'purpose',
    english: 'provided that / as long as',
    example: 'Puedes ir a la fiesta con tal de que vuelvas antes de medianoche.',
    exampleEn: 'You can go to the party as long as you come back before midnight.',
    level: 'B2',
    notes: 'Always takes subjunctive. Sets a condition for permission or possibility.'
  },
  {
    id: 'subj-37', trigger: 'a condición de que', category: 'purpose',
    english: 'on the condition that',
    example: 'Acepté el trabajo a condición de que me permitieran trabajar desde casa.',
    exampleEn: 'I accepted the job on the condition that they let me work from home.',
    level: 'B2',
    notes: 'Formal. Always takes subjunctive.'
  },
  {
    id: 'subj-38', trigger: 'en caso de que', category: 'purpose',
    english: 'in case (that)',
    example: 'Lleva un paraguas en caso de que llueva.',
    exampleEn: 'Take an umbrella in case it rains.',
    level: 'B1',
    notes: 'Always takes subjunctive because it refers to a hypothetical situation.'
  },
  {
    id: 'subj-39', trigger: 'siempre que', category: 'purpose',
    english: 'as long as / whenever',
    example: 'Puedes usar mi coche siempre que lo cuides.',
    exampleEn: 'You can use my car as long as you take care of it.',
    level: 'B2',
    notes: 'Subjunctive when it means "provided that". Indicative when it means "whenever" (habitual).'
  },

  // ──────────────────────────────────────
  //  TIME (FUTURE REFERENCE)  (7 items)
  // ──────────────────────────────────────

  {
    id: 'subj-40', trigger: 'cuando (future)', category: 'time',
    english: 'when (future)',
    example: 'Cuando llegues a casa, llámame.',
    exampleEn: 'When you get home, call me.',
    level: 'B1',
    notes: 'Subjunctive when referring to a FUTURE event. Indicative for past/habitual: "Cuando llego a casa, descanso."'
  },
  {
    id: 'subj-41', trigger: 'antes de que', category: 'time',
    english: 'before',
    example: 'Quiero terminar antes de que oscurezca.',
    exampleEn: 'I want to finish before it gets dark.',
    level: 'B1',
    notes: '"Antes de que" ALWAYS takes subjunctive, even referring to the past. Same subject → "antes de" + infinitive.'
  },
  {
    id: 'subj-42', trigger: 'después de que', category: 'time',
    english: 'after',
    example: 'Después de que termines la tarea, puedes jugar.',
    exampleEn: 'After you finish your homework, you can play.',
    level: 'B1',
    notes: 'Subjunctive when future. Past events can take indicative: "Después de que llegó...".'
  },
  {
    id: 'subj-43', trigger: 'hasta que', category: 'time',
    english: 'until',
    example: 'No me iré hasta que me des una respuesta.',
    exampleEn: 'I won\'t leave until you give me an answer.',
    level: 'B1',
    notes: 'Subjunctive when the event hasn\'t happened yet. Indicative for completed past events.'
  },
  {
    id: 'subj-44', trigger: 'en cuanto', category: 'time',
    english: 'as soon as',
    example: 'En cuanto sepa algo, te aviso.',
    exampleEn: 'As soon as I know something, I\'ll let you know.',
    level: 'B1',
    notes: 'Subjunctive for future events. Indicative for past: "En cuanto lo supe, te llamé."'
  },
  {
    id: 'subj-45', trigger: 'mientras (que) (future)', category: 'time',
    english: 'while / as long as',
    example: 'Mientras estés aquí, puedes usar la piscina.',
    exampleEn: 'While you\'re here, you can use the pool.',
    level: 'B2',
    notes: 'Subjunctive when future or hypothetical. Indicative for ongoing/habitual actions.'
  },
  {
    id: 'subj-46', trigger: 'tan pronto como', category: 'time',
    english: 'as soon as',
    example: 'Tan pronto como llegue el paquete, te llamo.',
    exampleEn: 'As soon as the package arrives, I\'ll call you.',
    level: 'B2',
    notes: 'Synonym of "en cuanto". Same subjunctive/indicative rules apply.'
  },

  // ──────────────────────────────────────
  //  CONCESSION & NEGATION  (7 items)
  // ──────────────────────────────────────

  {
    id: 'subj-47', trigger: 'aunque (uncertainty)', category: 'concession',
    english: 'even if / although (uncertain)',
    example: 'Aunque llueva, iremos a la playa.',
    exampleEn: 'Even if it rains, we\'ll go to the beach.',
    level: 'B1',
    notes: 'Subjunctive when expressing doubt/hypothetical. Indicative when stating a fact: "Aunque llueve, vamos" (although it IS raining).'
  },
  {
    id: 'subj-48', trigger: 'a menos que', category: 'concession',
    english: 'unless',
    example: 'No iré a menos que me invites.',
    exampleEn: 'I won\'t go unless you invite me.',
    level: 'B1',
    notes: '"A menos que" ALWAYS takes subjunctive.'
  },
  {
    id: 'subj-49', trigger: 'sin que', category: 'concession',
    english: 'without (someone doing)',
    example: 'Salió de la casa sin que nadie lo viera.',
    exampleEn: 'He left the house without anyone seeing him.',
    level: 'B1',
    notes: '"Sin que" always takes subjunctive when there is a change of subject. Same subject → "sin" + infinitive.'
  },
  {
    id: 'subj-50', trigger: 'a no ser que', category: 'concession',
    english: 'unless',
    example: 'Llegaremos tarde, a no ser que salgamos ahora mismo.',
    exampleEn: 'We\'ll be late, unless we leave right now.',
    level: 'B2',
    notes: 'Synonym of "a menos que". Always + subjunctive.'
  },
  {
    id: 'subj-51', trigger: 'por mucho que', category: 'concession',
    english: 'no matter how much',
    example: 'Por mucho que estudie, no consigo aprobar.',
    exampleEn: 'No matter how much I study, I can\'t pass.',
    level: 'B2',
    notes: 'Subjunctive with hypothetical/future. Indicative for established fact.'
  },
  {
    id: 'subj-52', trigger: 'por más que', category: 'concession',
    english: 'no matter how much',
    example: 'Por más que lo intentes, no lo lograrás solo.',
    exampleEn: 'No matter how much you try, you won\'t manage it alone.',
    level: 'B2',
    notes: 'Similar to "por mucho que". Common in both speech and writing.'
  },
  {
    id: 'subj-53', trigger: 'como si', category: 'concession',
    english: 'as if',
    example: 'Habla como si supiera de todo.',
    exampleEn: 'He talks as if he knew everything.',
    level: 'B2',
    notes: '"Como si" ALWAYS takes imperfect or pluperfect subjunctive, never present subjunctive.'
  },

  // ──────────────────────────────────────
  //  COMMANDS & INFLUENCE  (5 items)
  // ──────────────────────────────────────

  {
    id: 'subj-54', trigger: 'recomendar que', category: 'commands',
    english: 'to recommend that',
    example: 'Te recomiendo que pruebes la paella.',
    exampleEn: 'I recommend that you try the paella.',
    level: 'B1',
    notes: 'Verb of influence → subjunctive in the subordinate clause.'
  },
  {
    id: 'subj-55', trigger: 'sugerir que', category: 'commands',
    english: 'to suggest that',
    example: 'Sugiero que busquemos otra solución.',
    exampleEn: 'I suggest we look for another solution.',
    level: 'B1',
    notes: 'Stem-changing verb (e→ie). "Sugerir que" + subjunctive.'
  },
  {
    id: 'subj-56', trigger: 'ordenar que', category: 'commands',
    english: 'to order that',
    example: 'El juez ordenó que se cerrara el caso.',
    exampleEn: 'The judge ordered the case to be closed.',
    level: 'B2',
    notes: 'Formal/legal context. Verb of command → subjunctive.'
  },
  {
    id: 'subj-57', trigger: 'prohibir que', category: 'commands',
    english: 'to prohibit / to forbid that',
    example: 'El médico le prohibió que comiera sal.',
    exampleEn: 'The doctor forbade him from eating salt.',
    level: 'B1',
    notes: '"Prohibir que" + subjunctive. Also: "prohibir" + infinitive.'
  },
  {
    id: 'subj-58', trigger: 'aconsejar que', category: 'commands',
    english: 'to advise that',
    example: 'Te aconsejo que no vayas solo por la noche.',
    exampleEn: 'I advise you not to go alone at night.',
    level: 'B1',
    notes: 'Verb of influence. Common in everyday advice-giving.'
  },
];

const SUBJUNCTIVE_TRIGGERS_QUIZ = [
  {
    id: 'stq-1',
    question: 'Complete with indicative or subjunctive: "Es importante que tú ___ (estudiar) todos los días."',
    answer: 'estudies',
    options: ['estudias', 'estudies', 'estudiar', 'estudiaste'],
    explanation: '"Es importante que" triggers the subjunctive. "Estudies" is the present subjunctive of "estudiar" for tú.'
  },
  {
    id: 'stq-2',
    question: 'Which sentence requires the subjunctive?',
    answer: 'Dudo que venga.',
    options: ['Creo que viene.', 'Sé que viene.', 'Dudo que venga.', 'Es verdad que viene.'],
    explanation: '"Dudar que" expresses doubt, which triggers the subjunctive. The others express certainty → indicative.'
  },
  {
    id: 'stq-3',
    question: '"Cuando ___ (llegar) a Madrid, visitaré el Prado." — Which form is correct?',
    answer: 'llegue',
    options: ['llego', 'llegue', 'llegaré', 'llegué'],
    explanation: '"Cuando" + future reference requires subjunctive. "Llegue" is the present subjunctive.'
  },
  {
    id: 'stq-4',
    question: '"Aunque ___ (llover), saldré a correr." — The speaker is unsure if it will rain. Which form?',
    answer: 'llueva',
    options: ['llueve', 'llueva', 'llovió', 'lloverá'],
    explanation: '"Aunque" + uncertainty/hypothetical → subjunctive. If it were a known fact, indicative: "Aunque llueve...".'
  },
  {
    id: 'stq-5',
    question: 'Which conjunction ALWAYS requires the subjunctive?',
    answer: 'antes de que',
    options: ['porque', 'antes de que', 'después de que', 'cuando'],
    explanation: '"Antes de que" always takes subjunctive, even in the past. "Después de que", "cuando", and "porque" can take indicative.'
  },
  {
    id: 'stq-6',
    question: '"Me alegro de que tú ___ (estar) aquí." — Choose the correct form.',
    answer: 'estés',
    options: ['estás', 'estés', 'estar', 'estuvieras'],
    explanation: '"Alegrarse de que" expresses emotion → subjunctive. "Estés" is present subjunctive of "estar".'
  },
  {
    id: 'stq-7',
    question: 'Why does "Creo que viene" use indicative, but "No creo que venga" uses subjunctive?',
    answer: 'Negation introduces doubt, which triggers the subjunctive.',
    options: [
      'Negation introduces doubt, which triggers the subjunctive.',
      'It\'s a different verb tense, not a different mood.',
      'Both sentences actually use the subjunctive.',
      '"Creer" is an exception and never triggers subjunctive.'
    ],
    explanation: 'Affirmative "creer que" expresses belief (certainty → indicative). Negative "no creer que" introduces doubt → subjunctive.'
  },
];
