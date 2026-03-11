'use strict';

// ════════════════════════════════════════════════════════════
//  LECCION DIARIA — Dictation Exercise Data
//  30+ hand-authored sentences for listen-and-type practice
//  Supplemented at runtime with phrases from phrases.js
// ════════════════════════════════════════════════════════════

const DICTATION_DATA = [

  // ──────────────────────────────────────────────────────────
  //  A1 — Beginner
  // ──────────────────────────────────────────────────────────

  {
    id: 'dict-a1-01', level: 'A1', topic: 'greetings',
    sentence: '¿Cómo te llamas?',
    english: 'What is your name?',
    notes: "Note the accent on 'Cómo' (question word) and the double L sound.",
  },
  {
    id: 'dict-a1-02', level: 'A1', topic: 'greetings',
    sentence: 'Buenos días, ¿cómo estás?',
    english: 'Good morning, how are you?',
    notes: "Two accented words: 'días' and 'cómo'. Listen for the comma pause.",
  },
  {
    id: 'dict-a1-03', level: 'A1', topic: 'introductions',
    sentence: 'Me llamo María y soy de España.',
    english: 'My name is María and I am from Spain.',
    notes: "'Soy de' means 'I am from' — uses ser for origin.",
  },
  {
    id: 'dict-a1-04', level: 'A1', topic: 'descriptions',
    sentence: 'Mi casa es grande y bonita.',
    english: 'My house is big and pretty.',
    notes: "Adjectives come after the noun: 'casa grande', not 'grande casa'.",
  },
  {
    id: 'dict-a1-05', level: 'A1', topic: 'family',
    sentence: 'Tengo dos hermanos y una hermana.',
    english: 'I have two brothers and one sister.',
    notes: "'Hermanos' (brothers) vs 'hermana' (sister) — listen for the gender ending.",
  },
  {
    id: 'dict-a1-06', level: 'A1', topic: 'daily_life',
    sentence: 'Yo como arroz con pollo.',
    english: 'I eat rice with chicken.',
    notes: "Simple present tense: 'como' (I eat).",
  },

  // ──────────────────────────────────────────────────────────
  //  A2 — Elementary
  // ──────────────────────────────────────────────────────────

  {
    id: 'dict-a2-01', level: 'A2', topic: 'daily_routine',
    sentence: 'Me levanto a las siete de la mañana.',
    english: 'I get up at seven in the morning.',
    notes: "Reflexive verb: 'levantarse'. Listen for 'las siete' (7 o'clock).",
  },
  {
    id: 'dict-a2-02', level: 'A2', topic: 'shopping',
    sentence: '¿Cuánto cuesta esta camisa azul?',
    english: 'How much does this blue shirt cost?',
    notes: "Accent on 'Cuánto'. 'Esta' (this) has no accent — it's a demonstrative adjective.",
  },
  {
    id: 'dict-a2-03', level: 'A2', topic: 'weather',
    sentence: 'Hoy hace mucho calor y no hay nubes.',
    english: 'Today it is very hot and there are no clouds.',
    notes: "'Hace calor' is an impersonal expression. 'Hay' means 'there are'.",
  },
  {
    id: 'dict-a2-04', level: 'A2', topic: 'past_tense',
    sentence: 'Ayer fui al mercado y compré frutas.',
    english: 'Yesterday I went to the market and bought fruits.',
    notes: "Two preterite forms: 'fui' (ir) and 'compré' (comprar). Accent on 'compré'.",
  },
  {
    id: 'dict-a2-05', level: 'A2', topic: 'directions',
    sentence: 'La farmacia está a la derecha del banco.',
    english: 'The pharmacy is to the right of the bank.',
    notes: "'Está' (location) + 'a la derecha de' (to the right of).",
  },
  {
    id: 'dict-a2-06', level: 'A2', topic: 'likes',
    sentence: 'A mi hermana le gustan mucho los gatos.',
    english: 'My sister likes cats a lot.',
    notes: "'Gustar' agrees with 'los gatos' (plural) → 'gustan'. 'Le' is the indirect object.",
  },

  // ──────────────────────────────────────────────────────────
  //  B1 — Intermediate
  // ──────────────────────────────────────────────────────────

  {
    id: 'dict-b1-01', level: 'B1', topic: 'past_tense',
    sentence: 'Cuando era niño, vivía cerca del mar.',
    english: 'When I was a child, I lived near the sea.',
    notes: "Both verbs in imperfect: 'era' (ser) and 'vivía' (vivir) — ongoing past states.",
  },
  {
    id: 'dict-b1-02', level: 'B1', topic: 'subjunctive',
    sentence: 'Espero que tengas un buen día.',
    english: 'I hope you have a good day.',
    notes: "'Esperar que' triggers subjunctive: 'tengas' (not 'tienes').",
  },
  {
    id: 'dict-b1-03', level: 'B1', topic: 'conditional',
    sentence: 'Si pudiera, viajaría por todo el mundo.',
    english: 'If I could, I would travel all over the world.',
    notes: "Si clause: imperfect subjunctive 'pudiera' + conditional 'viajaría'.",
  },
  {
    id: 'dict-b1-04', level: 'B1', topic: 'narration',
    sentence: 'Mientras caminaba por el parque, empezó a llover.',
    english: 'While I was walking through the park, it started to rain.',
    notes: "Imperfect 'caminaba' (background) interrupted by preterite 'empezó' (event).",
  },
  {
    id: 'dict-b1-05', level: 'B1', topic: 'opinions',
    sentence: 'No creo que sea una buena idea.',
    english: "I don't think it's a good idea.",
    notes: "'No creer que' triggers subjunctive: 'sea' (not 'es'). Negative opinion = doubt.",
  },
  {
    id: 'dict-b1-06', level: 'B1', topic: 'reported_speech',
    sentence: 'Mi madre me dijo que estudiara más.',
    english: 'My mother told me to study more.',
    notes: "Reported command: 'dijo que' + imperfect subjunctive 'estudiara'.",
  },

  // ──────────────────────────────────────────────────────────
  //  B2 — Upper Intermediate
  // ──────────────────────────────────────────────────────────

  {
    id: 'dict-b2-01', level: 'B2', topic: 'subjunctive',
    sentence: 'Es necesario que todos participen en la reunión.',
    english: 'It is necessary that everyone participate in the meeting.',
    notes: "'Es necesario que' + subjunctive 'participen'. Impersonal trigger.",
  },
  {
    id: 'dict-b2-02', level: 'B2', topic: 'passive',
    sentence: 'El edificio fue construido en mil novecientos ochenta.',
    english: 'The building was built in 1980.',
    notes: "Passive voice: 'fue construido'. Listen for the full year: 'mil novecientos ochenta'.",
  },
  {
    id: 'dict-b2-03', level: 'B2', topic: 'conditionals',
    sentence: 'Si hubiera sabido la verdad, habría actuado de otra manera.',
    english: 'If I had known the truth, I would have acted differently.',
    notes: "Third conditional: pluperfect subjunctive 'hubiera sabido' + conditional perfect 'habría actuado'.",
  },
  {
    id: 'dict-b2-04', level: 'B2', topic: 'discourse',
    sentence: 'A pesar de las dificultades, logramos terminar el proyecto.',
    english: 'Despite the difficulties, we managed to finish the project.',
    notes: "'A pesar de' (despite) is a concessive connector. 'Logramos' = we managed.",
  },
  {
    id: 'dict-b2-05', level: 'B2', topic: 'relative_clauses',
    sentence: 'La empresa para la que trabajo tiene oficinas en tres países.',
    english: 'The company I work for has offices in three countries.',
    notes: "Relative clause with preposition: 'para la que' (for which). 'Países' has an accent.",
  },

  // ──────────────────────────────────────────────────────────
  //  C1 — Advanced
  // ──────────────────────────────────────────────────────────

  {
    id: 'dict-c1-01', level: 'C1', topic: 'formal',
    sentence: 'Cabe destacar que los resultados superaron las expectativas iniciales.',
    english: 'It is worth noting that the results exceeded the initial expectations.',
    notes: "'Cabe destacar que' is formal register: 'it is worth noting that'.",
  },
  {
    id: 'dict-c1-02', level: 'C1', topic: 'subjunctive',
    sentence: 'Ojalá hubiéramos llegado antes de que cerraran las puertas.',
    english: 'I wish we had arrived before they closed the doors.',
    notes: "'Ojalá' + pluperfect subjunctive for unrealized past wish. 'Antes de que' + subjunctive.",
  },
  {
    id: 'dict-c1-03', level: 'C1', topic: 'discourse',
    sentence: 'No obstante, conviene analizar los datos desde otra perspectiva.',
    english: 'Nevertheless, it is advisable to analyze the data from another perspective.',
    notes: "'No obstante' = nevertheless. 'Conviene' = it is advisable (impersonal).",
  },
  {
    id: 'dict-c1-04', level: 'C1', topic: 'periphrasis',
    sentence: 'Llevamos más de tres horas intentando resolver este problema.',
    english: 'We have been trying to solve this problem for more than three hours.',
    notes: "'Llevar + time + gerund' expresses ongoing duration: 'we have been -ing for X time'.",
  },

  // ──────────────────────────────────────────────────────────
  //  C2 — Mastery
  // ──────────────────────────────────────────────────────────

  {
    id: 'dict-c2-01', level: 'C2', topic: 'literary',
    sentence: 'Diríase que el crepúsculo envolvía la ciudad en un manto de melancolía.',
    english: 'One might say that the twilight enveloped the city in a mantle of melancholy.',
    notes: "'Diríase' is an archaic/literary form of 'se diría'. Listen for 'crepúsculo' (twilight).",
  },
  {
    id: 'dict-c2-02', level: 'C2', topic: 'academic',
    sentence: 'La hipótesis planteada carece de sustento empírico suficiente.',
    english: 'The proposed hypothesis lacks sufficient empirical support.',
    notes: "Academic register: 'carecer de' (to lack), 'sustento empírico' (empirical support).",
  },
  {
    id: 'dict-c2-03', level: 'C2', topic: 'idiomatic',
    sentence: 'Se le fue el santo al cielo y olvidó por completo la cita.',
    english: 'He got completely distracted and forgot the appointment entirely.',
    notes: "'Írsele a uno el santo al cielo' = to completely forget / get distracted. Highly idiomatic.",
  },
  {
    id: 'dict-c2-04', level: 'C2', topic: 'formal',
    sentence: 'En virtud de lo anteriormente expuesto, solicitamos la reconsideración del fallo.',
    english: 'By virtue of the foregoing, we request reconsideration of the ruling.',
    notes: "Legal/formal register: 'en virtud de' (by virtue of), 'lo anteriormente expuesto' (the foregoing).",
  },
  {
    id: 'dict-c1-05', level: 'C1', topic: 'subjunctive',
    sentence: 'Si hubiéramos previsto las consecuencias, habríamos actuado de otra manera.',
    english: 'If we had foreseen the consequences, we would have acted differently.',
    notes: "Pluperfect subjunctive + conditional perfect: 'hubiéramos previsto' + 'habríamos actuado'.",
  },
  {
    id: 'dict-c1-06', level: 'C1', topic: 'discourse',
    sentence: 'En definitiva, los resultados avalan la hipótesis planteada al inicio del estudio.',
    english: 'In short, the results support the hypothesis proposed at the beginning of the study.',
    notes: "Discourse marker 'en definitiva' = in short / ultimately. Formal academic tone.",
  },
  {
    id: 'dict-c1-07', level: 'C1', topic: 'formal',
    sentence: 'Se ruega a los asistentes que mantengan los teléfonos móviles en silencio durante la conferencia.',
    english: 'Attendees are kindly requested to keep their mobile phones on silent during the conference.',
    notes: "Impersonal 'se ruega' + subjunctive 'mantengan'. Formal register.",
  },
  {
    id: 'dict-c1-08', level: 'C1', topic: 'periphrasis',
    sentence: 'Venimos observando un incremento sostenido en la demanda desde hace varios trimestres.',
    english: 'We have been observing a sustained increase in demand for several quarters.',
    notes: "Venir + gerund for ongoing observation: 'venimos observando'.",
  },
  {
    id: 'dict-c1-09', level: 'C1', topic: 'passive',
    sentence: 'Fueron hallados los restos de una civilización hasta entonces desconocida.',
    english: 'The remains of a previously unknown civilization were found.',
    notes: "Passive voice with ser + past participle: 'fueron hallados'.",
  },
  {
    id: 'dict-c1-10', level: 'C1', topic: 'concessive',
    sentence: 'Aun reconociendo sus méritos, no podemos pasar por alto las irregularidades detectadas.',
    english: 'Even acknowledging their merits, we cannot overlook the irregularities detected.',
    notes: "Aun + gerund for concession: 'aun reconociendo' = even acknowledging.",
  },
  {
    id: 'dict-c2-05', level: 'C2', topic: 'literary',
    sentence: 'Hubo de transcurrir una eternidad antes de que el silencio se quebrase.',
    english: 'An eternity had to pass before the silence was broken.',
    notes: "'Haber de' (to have to) + literary subjunctive ending '-ase': 'quebrase'.",
  },
  {
    id: 'dict-c2-06', level: 'C2', topic: 'academic',
    sentence: 'La correlación entre ambas variables no implica necesariamente una relación de causalidad.',
    english: 'The correlation between both variables does not necessarily imply a causal relationship.',
    notes: "Academic distinction between correlation and causation. Formal register.",
  },
  {
    id: 'dict-c2-07', level: 'C2', topic: 'legal',
    sentence: 'Quien incumpliere lo dispuesto en el presente artículo será sancionado conforme a la ley.',
    english: 'Whoever fails to comply with the provisions of this article shall be sanctioned in accordance with the law.',
    notes: "Future subjunctive 'incumpliere' — archaic form preserved in legal language.",
  },
  {
    id: 'dict-c2-08', level: 'C2', topic: 'dialectal',
    sentence: '¡Che, no me digás que todavía no terminaste el laburo!',
    english: "Hey, don't tell me you still haven't finished work!",
    notes: "Rioplatense voseo: 'digás' (vos form). 'Laburo' = trabajo (Argentine slang).",
  },
  {
    id: 'dict-c2-09', level: 'C2', topic: 'literary',
    sentence: 'No bien hubo amanecido, emprendieron la marcha hacia tierras ignotas.',
    english: 'As soon as dawn broke, they set out toward unknown lands.',
    notes: "Preterite anterior 'hubo amanecido' (very literary). 'Ignotas' = unknown (literary).",
  },
  {
    id: 'dict-c2-10', level: 'C2', topic: 'idiomatic',
    sentence: 'Le dio gato por liebre y se quedó tan ancho, como si nada hubiera pasado.',
    english: 'He deceived him and acted as if nothing had happened.',
    notes: "Idiom 'dar gato por liebre' = to deceive / pull a fast one. 'Quedarse tan ancho' = to act unfazed.",
  },
];
