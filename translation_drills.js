'use strict';

// ════════════════════════════════════════════════════════════
//  TRANSLATION DRILLS — English → Spanish translation practice
//  60+ items across A1-C2
// ════════════════════════════════════════════════════════════

const TRANSLATION_DRILLS = [

  // ─────────────────────────────────────────────────────────
  //  A1 — Greetings, introductions, basic descriptions (8)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-1', level: 'A1', topic: 'greetings',
    english: 'How are you?',
    primary: '¿Cómo estás?',
    acceptable: ['¿Cómo está usted?', '¿Cómo está?', '¿Qué tal?', '¿Cómo estás tú?'],
    keyWords: ['cómo', 'estás'],
    explanation: "'¿Cómo estás?' is informal (tú). '¿Cómo está usted?' is formal. '¿Qué tal?' is colloquial."
  },
  {
    id: 'tr-2', level: 'A1', topic: 'introductions',
    english: 'My name is María.',
    primary: 'Me llamo María.',
    acceptable: ['Mi nombre es María.', 'Soy María.', 'Yo me llamo María.', 'Yo soy María.'],
    keyWords: ['llamo', 'María'],
    explanation: "'Me llamo' (I call myself) is the most natural way. 'Mi nombre es' is more formal. 'Soy' is also common."
  },
  {
    id: 'tr-3', level: 'A1', topic: 'descriptions',
    english: 'The house is big and white.',
    primary: 'La casa es grande y blanca.',
    acceptable: ['La casa es blanca y grande.'],
    keyWords: ['casa', 'grande', 'blanca'],
    explanation: "Adjectives agree in gender: blanca (feminine) matches casa. Grande does not change for gender."
  },
  {
    id: 'tr-4', level: 'A1', topic: 'present_tense',
    english: 'I speak Spanish and English.',
    primary: 'Hablo español e inglés.',
    acceptable: ['Yo hablo español e inglés.', 'Hablo inglés y español.', 'Yo hablo inglés y español.'],
    keyWords: ['hablo', 'español', 'inglés'],
    explanation: "Note: 'y' changes to 'e' before words starting with 'i-' or 'hi-'. Subject pronoun 'yo' is optional."
  },
  {
    id: 'tr-5', level: 'A1', topic: 'descriptions',
    english: 'There are three cats in the garden.',
    primary: 'Hay tres gatos en el jardín.',
    acceptable: ['En el jardín hay tres gatos.', 'Hay tres gatos en el jardin.'],
    keyWords: ['hay', 'tres', 'gatos'],
    explanation: "'Hay' means 'there is/there are' — it does not change for singular or plural."
  },
  {
    id: 'tr-6', level: 'A1', topic: 'greetings',
    english: 'Good morning, how is everything?',
    primary: 'Buenos días, ¿cómo va todo?',
    acceptable: ['Buenos días, ¿qué tal todo?', 'Buenos días, ¿cómo está todo?', 'Buen día, ¿cómo va todo?'],
    keyWords: ['buenos', 'días'],
    explanation: "'Buenos días' is the standard morning greeting. 'Buen día' is used in some Latin American countries."
  },
  {
    id: 'tr-7', level: 'A1', topic: 'present_tense',
    english: 'She lives in Barcelona.',
    primary: 'Ella vive en Barcelona.',
    acceptable: ['Vive en Barcelona.'],
    keyWords: ['vive', 'Barcelona'],
    explanation: "Vivir conjugated: vive (third person singular). The subject pronoun 'ella' is optional."
  },
  {
    id: 'tr-8', level: 'A1', topic: 'introductions',
    english: 'I am twenty years old.',
    primary: 'Tengo veinte años.',
    acceptable: ['Yo tengo veinte años.', 'Tengo 20 años.', 'Yo tengo 20 años.'],
    keyWords: ['tengo', 'veinte', 'años'],
    explanation: "Spanish uses 'tener' (to have), not 'ser' (to be), for age: literally 'I have twenty years.'"
  },

  // ─────────────────────────────────────────────────────────
  //  A2 — Past tense, daily routines, gustar (8)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-9', level: 'A2', topic: 'past_tense',
    english: 'Yesterday I ate at a restaurant.',
    primary: 'Ayer comí en un restaurante.',
    acceptable: ['Ayer yo comí en un restaurante.', 'Comí en un restaurante ayer.', 'Yo comí en un restaurante ayer.'],
    keyWords: ['ayer', 'comí', 'restaurante'],
    explanation: "Preterite tense of 'comer': comí. 'Ayer' (yesterday) signals a completed past action."
  },
  {
    id: 'tr-10', level: 'A2', topic: 'gustar',
    english: 'I like the food.',
    primary: 'Me gusta la comida.',
    acceptable: ['La comida me gusta.', 'A mí me gusta la comida.'],
    keyWords: ['me', 'gusta', 'comida'],
    explanation: "Gustar literally means 'to please': 'the food pleases me.' Use 'gusta' for singular nouns."
  },
  {
    id: 'tr-11', level: 'A2', topic: 'daily_routines',
    english: 'I wake up at seven and take a shower.',
    primary: 'Me despierto a las siete y me ducho.',
    acceptable: ['Me despierto a las 7 y me ducho.', 'Yo me despierto a las siete y me ducho.', 'Me levanto a las siete y me ducho.'],
    keyWords: ['despierto', 'siete', 'ducho'],
    explanation: "Reflexive verbs: despertarse (to wake up), ducharse (to shower). 'Me levanto' (I get up) is also valid."
  },
  {
    id: 'tr-12', level: 'A2', topic: 'past_tense',
    english: 'We went to the beach last summer.',
    primary: 'Fuimos a la playa el verano pasado.',
    acceptable: ['Nosotros fuimos a la playa el verano pasado.', 'El verano pasado fuimos a la playa.', 'El verano pasado, nosotros fuimos a la playa.'],
    keyWords: ['fuimos', 'playa', 'verano'],
    explanation: "Ir in the preterite: fuimos (we went). 'El verano pasado' = last summer."
  },
  {
    id: 'tr-13', level: 'A2', topic: 'gustar',
    english: 'They like to travel.',
    primary: 'Les gusta viajar.',
    acceptable: ['A ellos les gusta viajar.', 'A ellas les gusta viajar.', 'Les encanta viajar.'],
    keyWords: ['les', 'gusta', 'viajar'],
    explanation: "'Les gusta' for third person plural. Use 'gusta' (not 'gustan') with infinitives."
  },
  {
    id: 'tr-14', level: 'A2', topic: 'directions',
    english: 'Turn right and go straight ahead.',
    primary: 'Gira a la derecha y sigue recto.',
    acceptable: ['Gire a la derecha y siga recto.', 'Dobla a la derecha y sigue derecho.', 'Gira a la derecha y sigue derecho.', 'Doble a la derecha y siga derecho.'],
    keyWords: ['derecha', 'recto'],
    explanation: "'Gira' (tú) vs 'gire' (usted). 'Recto' and 'derecho' both mean 'straight ahead.'"
  },
  {
    id: 'tr-15', level: 'A2', topic: 'past_tense',
    english: 'She bought a new dress.',
    primary: 'Ella compró un vestido nuevo.',
    acceptable: ['Compró un vestido nuevo.', 'Se compró un vestido nuevo.', 'Ella se compró un vestido nuevo.'],
    keyWords: ['compró', 'vestido', 'nuevo'],
    explanation: "Preterite of comprar: compró. Adding 'se' (se compró) emphasizes personal benefit."
  },
  {
    id: 'tr-16', level: 'A2', topic: 'daily_routines',
    english: 'On weekends I usually read and cook.',
    primary: 'Los fines de semana suelo leer y cocinar.',
    acceptable: ['Los fines de semana normalmente leo y cocino.', 'En los fines de semana suelo leer y cocinar.', 'Normalmente los fines de semana leo y cocino.'],
    keyWords: ['fines de semana', 'leer', 'cocinar'],
    explanation: "'Soler + infinitive' means 'to usually do something.' 'Normalmente' + present tense also works."
  },

  // ─────────────────────────────────────────────────────────
  //  B1 — Subjunctive triggers, conditionals, por/para (8)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-17', level: 'B1', topic: 'subjunctive',
    english: 'I hope you feel better.',
    primary: 'Espero que te sientas mejor.',
    acceptable: ['Ojalá te sientas mejor.', 'Espero que te mejores.', 'Ojalá que te sientas mejor.'],
    keyWords: ['espero', 'sientas', 'mejor'],
    explanation: "'Espero que' triggers the subjunctive: sentirse → te sientas. 'Ojalá' also works."
  },
  {
    id: 'tr-18', level: 'B1', topic: 'conditionals',
    english: 'If I had money, I would travel the world.',
    primary: 'Si tuviera dinero, viajaría por el mundo.',
    acceptable: ['Si tuviese dinero, viajaría por el mundo.', 'Si yo tuviera dinero, viajaría por el mundo.', 'Si tuviera dinero, recorrería el mundo.', 'Viajaría por el mundo si tuviera dinero.'],
    keyWords: ['tuviera', 'viajaría', 'mundo'],
    explanation: "Contrary-to-fact conditional: si + imperfect subjunctive, conditional. Both -ra and -se forms are valid."
  },
  {
    id: 'tr-19', level: 'B1', topic: 'por_para',
    english: 'This gift is for you.',
    primary: 'Este regalo es para ti.',
    acceptable: ['Este regalo es para usted.'],
    keyWords: ['regalo', 'para', 'ti'],
    explanation: "'Para' for recipient/destination of something. Note the prepositional pronoun 'ti' (not 'tú')."
  },
  {
    id: 'tr-20', level: 'B1', topic: 'por_para',
    english: 'Thank you for helping me.',
    primary: 'Gracias por ayudarme.',
    acceptable: ['Te agradezco por ayudarme.', 'Muchas gracias por ayudarme.', 'Gracias por haberme ayudado.'],
    keyWords: ['gracias', 'por', 'ayudarme'],
    explanation: "'Por' for reason/cause: gracias por (thanks because of/for)."
  },
  {
    id: 'tr-21', level: 'B1', topic: 'subjunctive',
    english: 'I doubt that he knows the answer.',
    primary: 'Dudo que sepa la respuesta.',
    acceptable: ['Dudo que él sepa la respuesta.', 'Yo dudo que sepa la respuesta.', 'Yo dudo que él sepa la respuesta.'],
    keyWords: ['dudo', 'sepa', 'respuesta'],
    explanation: "'Dudar que' triggers subjunctive: saber → sepa."
  },
  {
    id: 'tr-22', level: 'B1', topic: 'comparisons',
    english: 'She is taller than her brother.',
    primary: 'Ella es más alta que su hermano.',
    acceptable: ['Es más alta que su hermano.'],
    keyWords: ['más', 'alta', 'hermano'],
    explanation: "Comparatives: más + adjective + que. 'Alta' agrees with feminine subject."
  },
  {
    id: 'tr-23', level: 'B1', topic: 'conditionals',
    english: 'If it rains, we will stay home.',
    primary: 'Si llueve, nos quedaremos en casa.',
    acceptable: ['Si llueve, nos quedamos en casa.', 'Nos quedaremos en casa si llueve.', 'Si llueve, vamos a quedarnos en casa.'],
    keyWords: ['llueve', 'quedaremos', 'casa'],
    explanation: "Real conditional: si + present indicative + future. Present tense in the result clause is also natural in spoken Spanish."
  },
  {
    id: 'tr-24', level: 'B1', topic: 'comparisons',
    english: 'This is the best restaurant in the city.',
    primary: 'Este es el mejor restaurante de la ciudad.',
    acceptable: ['Es el mejor restaurante de la ciudad.', 'Este es el mejor restaurante en la ciudad.'],
    keyWords: ['mejor', 'restaurante', 'ciudad'],
    explanation: "Superlative: el mejor (the best). Use 'de' (not 'en') for 'in' with superlatives."
  },

  // ─────────────────────────────────────────────────────────
  //  B2 — Complex subjunctive, reported speech, passive, idioms (8)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-25', level: 'B2', topic: 'subjunctive',
    english: 'I was looking for a hotel that had a pool.',
    primary: 'Buscaba un hotel que tuviera piscina.',
    acceptable: ['Buscaba un hotel que tuviese piscina.', 'Estaba buscando un hotel que tuviera piscina.', 'Yo buscaba un hotel que tuviera piscina.', 'Buscaba un hotel que tuviese una piscina.'],
    keyWords: ['buscaba', 'tuviera', 'piscina'],
    explanation: "Imperfect subjunctive after an indefinite antecedent in the past: un hotel que tuviera."
  },
  {
    id: 'tr-26', level: 'B2', topic: 'reported_speech',
    english: 'She told me that she would come tomorrow.',
    primary: 'Me dijo que vendría mañana.',
    acceptable: ['Ella me dijo que vendría mañana.', 'Me dijo que iba a venir mañana.'],
    keyWords: ['dijo', 'vendría', 'mañana'],
    explanation: "Reported speech: direct 'vendré' → reported 'vendría' (conditional replaces future)."
  },
  {
    id: 'tr-27', level: 'B2', topic: 'passive_voice',
    english: 'The book was written by García Márquez.',
    primary: 'El libro fue escrito por García Márquez.',
    acceptable: ['El libro lo escribió García Márquez.', 'García Márquez escribió el libro.'],
    keyWords: ['libro', 'escrito', 'García Márquez'],
    explanation: "Passive: ser + past participle + por. Active restructuring is often preferred in Spanish."
  },
  {
    id: 'tr-28', level: 'B2', topic: 'idioms',
    english: 'It costs an arm and a leg.',
    primary: 'Cuesta un ojo de la cara.',
    acceptable: ['Cuesta un riñón.', 'Sale carísimo.', 'Cuesta un dineral.'],
    keyWords: ['cuesta', 'ojo'],
    explanation: "Idiom: 'cuesta un ojo de la cara' (it costs an eye from the face). 'Un riñón' (a kidney) is also common."
  },
  {
    id: 'tr-29', level: 'B2', topic: 'subjunctive',
    english: 'He asked me to close the door.',
    primary: 'Me pidió que cerrara la puerta.',
    acceptable: ['Me pidió que cerrase la puerta.', 'Él me pidió que cerrara la puerta.', 'Él me pidió que cerrase la puerta.'],
    keyWords: ['pidió', 'cerrara', 'puerta'],
    explanation: "'Pedir que' triggers subjunctive. In past context: imperfect subjunctive (cerrara/cerrase)."
  },
  {
    id: 'tr-30', level: 'B2', topic: 'passive_voice',
    english: 'Spanish is spoken in twenty countries.',
    primary: 'Se habla español en veinte países.',
    acceptable: ['El español se habla en veinte países.', 'El español es hablado en veinte países.', 'Se habla español en 20 países.'],
    keyWords: ['se', 'habla', 'español', 'países'],
    explanation: "Passive 'se': 'se habla español' is the most natural form. The 'ser + participle' passive sounds more formal."
  },
  {
    id: 'tr-31', level: 'B2', topic: 'reported_speech',
    english: 'They said they had already finished.',
    primary: 'Dijeron que ya habían terminado.',
    acceptable: ['Ellos dijeron que ya habían terminado.', 'Dijeron que ya habían acabado.', 'Ellos dijeron que ya habían acabado.'],
    keyWords: ['dijeron', 'habían', 'terminado'],
    explanation: "Reported speech with pluperfect: 'hemos terminado' → 'habían terminado.'"
  },
  {
    id: 'tr-32', level: 'B2', topic: 'idioms',
    english: 'He let the cat out of the bag.',
    primary: 'Se fue de la lengua.',
    acceptable: ['Se le escapó el secreto.', 'Metió la pata.', 'Soltó la sopa.'],
    keyWords: ['lengua'],
    explanation: "'Irse de la lengua' = to let a secret slip. 'Soltar la sopa' is used in Latin America."
  },

  // ─────────────────────────────────────────────────────────
  //  C1 — Literary register, nuanced subjunctive, formal (6)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-33', level: 'C1', topic: 'subjunctive',
    english: 'Had I known, I would not have gone.',
    primary: 'De haberlo sabido, no habría ido.',
    acceptable: ['Si lo hubiera sabido, no habría ido.', 'Si lo hubiese sabido, no habría ido.', 'De haberlo sabido, no hubiese ido.', 'Si hubiera sabido, no habría ido.'],
    keyWords: ['sabido', 'habría', 'ido'],
    explanation: "'De + infinitive compound' is an elegant alternative to 'si + pluperfect subjunctive' for past contrary-to-fact."
  },
  {
    id: 'tr-34', level: 'C1', topic: 'formal_writing',
    english: 'It should be noted that the results are preliminary.',
    primary: 'Cabe señalar que los resultados son preliminares.',
    acceptable: ['Es de notar que los resultados son preliminares.', 'Hay que señalar que los resultados son preliminares.', 'Conviene señalar que los resultados son preliminares.'],
    keyWords: ['cabe', 'señalar', 'resultados', 'preliminares'],
    explanation: "'Cabe señalar' is a formal/academic expression meaning 'it is worth noting.' 'Conviene señalar' is equally formal."
  },
  {
    id: 'tr-35', level: 'C1', topic: 'literary',
    english: 'No matter how hard he tried, he could not forget her.',
    primary: 'Por más que lo intentara, no podía olvidarla.',
    acceptable: ['Por mucho que lo intentara, no podía olvidarla.', 'Por más que lo intentase, no podía olvidarla.', 'Aunque lo intentara con todas sus fuerzas, no podía olvidarla.'],
    keyWords: ['por más que', 'intentara', 'olvidarla'],
    explanation: "'Por más que' + subjunctive expresses 'no matter how much.' The imperfect subjunctive sets the past context."
  },
  {
    id: 'tr-36', level: 'C1', topic: 'subjunctive',
    english: 'I would have preferred that they had told me the truth.',
    primary: 'Habría preferido que me hubieran dicho la verdad.',
    acceptable: ['Habría preferido que me hubiesen dicho la verdad.', 'Hubiera preferido que me dijeran la verdad.', 'Hubiese preferido que me dijesen la verdad.'],
    keyWords: ['preferido', 'hubieran', 'dicho', 'verdad'],
    explanation: "Conditional perfect + pluperfect subjunctive: complex past contrary-to-fact with embedded wish."
  },
  {
    id: 'tr-37', level: 'C1', topic: 'formal_writing',
    english: 'The aforementioned study suggests that further research is needed.',
    primary: 'El estudio mencionado sugiere que se necesita más investigación.',
    acceptable: ['Dicho estudio sugiere que se requiere más investigación.', 'El citado estudio sugiere que hace falta más investigación.', 'El estudio antes mencionado sugiere que se necesitan más investigaciones.'],
    keyWords: ['estudio', 'sugiere', 'investigación'],
    explanation: "'Dicho' and 'mencionado' both translate 'aforementioned.' 'Se necesita' uses impersonal 'se.'"
  },
  {
    id: 'tr-38', level: 'C1', topic: 'literary',
    english: 'Rarely does one find such generosity.',
    primary: 'Rara vez se encuentra tanta generosidad.',
    acceptable: ['Pocas veces se encuentra tanta generosidad.', 'Es raro encontrar tanta generosidad.', 'Difícilmente se halla tal generosidad.'],
    keyWords: ['rara vez', 'generosidad'],
    explanation: "'Rara vez' inverts emphasis. Unlike English, Spanish does not require subject-verb inversion after negative adverbs."
  },

  // ─────────────────────────────────────────────────────────
  //  C2 — Highly idiomatic, dialectal, academic (5)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-39', level: 'C2', topic: 'idiomatic',
    english: 'He was beating around the bush and never got to the point.',
    primary: 'Se andaba por las ramas y nunca fue al grano.',
    acceptable: ['Se fue por las ramas y nunca llegó al grano.', 'Andaba con rodeos y nunca fue al grano.', 'Se iba por las ramas y nunca llegó al punto.'],
    keyWords: ['ramas', 'grano'],
    explanation: "'Andarse/irse por las ramas' = to beat around the bush. 'Ir al grano' = to get to the point."
  },
  {
    id: 'tr-40', level: 'C2', topic: 'dialectal',
    english: 'Come on, guys, let\'s get going!',
    primary: '¡Venga, chicos, vámonos!',
    acceptable: ['¡Dale, chicos, vámonos!', '¡Ándale, muchachos, vámonos!', '¡Órale, muchachos, vámonos!', '¡Venga, tíos, vámonos!'],
    keyWords: ['vámonos'],
    explanation: "'Venga' is Spain-Spanish; 'dale' is River Plate; 'ándale/órale' is Mexican. 'Tíos' is colloquial in Spain for 'guys.'"
  },
  {
    id: 'tr-41', level: 'C2', topic: 'academic',
    english: 'Notwithstanding the limitations, the findings are consistent with the hypothesis.',
    primary: 'No obstante las limitaciones, los hallazgos son consistentes con la hipótesis.',
    acceptable: ['A pesar de las limitaciones, los hallazgos son consistentes con la hipótesis.', 'Pese a las limitaciones, los resultados son coherentes con la hipótesis.', 'No obstante las limitaciones, los resultados concuerdan con la hipótesis.'],
    keyWords: ['no obstante', 'hallazgos', 'hipótesis'],
    explanation: "'No obstante' and 'pese a' are formal connectors for 'notwithstanding.' 'Hallazgos' is academic for 'findings.'"
  },
  {
    id: 'tr-42', level: 'C2', topic: 'idiomatic',
    english: 'She is the spitting image of her mother.',
    primary: 'Es el vivo retrato de su madre.',
    acceptable: ['Es clavada a su madre.', 'Es igualita a su madre.', 'Es la viva imagen de su madre.', 'Se parece muchísimo a su madre.'],
    keyWords: ['vivo', 'retrato', 'madre'],
    explanation: "'El vivo retrato' (the living portrait) is the classic idiom. 'Clavada' (nailed) is colloquial."
  },
  {
    id: 'tr-43', level: 'C2', topic: 'academic',
    english: 'The data, albeit inconclusive, point to a correlation between both variables.',
    primary: 'Los datos, si bien no son concluyentes, apuntan a una correlación entre ambas variables.',
    acceptable: ['Los datos, aunque no concluyentes, señalan una correlación entre ambas variables.', 'Si bien los datos no son concluyentes, apuntan a una correlación entre las dos variables.', 'Aunque los datos no son concluyentes, apuntan a una correlación entre ambas variables.'],
    keyWords: ['datos', 'concluyentes', 'correlación', 'variables'],
    explanation: "'Si bien' is a formal equivalent of 'although/albeit.' 'Ambas' (both, feminine) agrees with 'variables.'"
  },

  // ─────────────────────────────────────────────────────────
  //  Additional items to ensure breadth (tr-44 onward)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-44', level: 'A1', topic: 'present_tense',
    english: 'Where is the bathroom?',
    primary: '¿Dónde está el baño?',
    acceptable: ['¿Dónde queda el baño?', '¿Dónde se encuentra el baño?'],
    keyWords: ['dónde', 'está', 'baño'],
    explanation: "'¿Dónde está?' is standard. '¿Dónde queda?' is common in Latin America for fixed locations."
  },
  {
    id: 'tr-45', level: 'A2', topic: 'past_tense',
    english: 'When I was a child, I played in the park every day.',
    primary: 'Cuando era niño, jugaba en el parque todos los días.',
    acceptable: ['De niño, jugaba en el parque todos los días.', 'Cuando era niña, jugaba en el parque todos los días.', 'De pequeño, jugaba en el parque cada día.'],
    keyWords: ['era', 'jugaba', 'parque'],
    explanation: "Imperfect tense for habitual past actions: era (background), jugaba (repeated action)."
  },
  {
    id: 'tr-46', level: 'B1', topic: 'por_para',
    english: 'I studied for three hours to pass the exam.',
    primary: 'Estudié por tres horas para aprobar el examen.',
    acceptable: ['Estudié durante tres horas para aprobar el examen.', 'Estudié tres horas para pasar el examen.', 'Estudié por tres horas para pasar el examen.'],
    keyWords: ['estudié', 'por', 'para', 'examen'],
    explanation: "'Por' for duration (for three hours) and 'para' for purpose (in order to pass). 'Durante' also works for duration."
  },
  {
    id: 'tr-47', level: 'B2', topic: 'subjunctive',
    english: 'It is unlikely that they will arrive on time.',
    primary: 'Es poco probable que lleguen a tiempo.',
    acceptable: ['No es probable que lleguen a tiempo.', 'Es improbable que lleguen a tiempo.', 'Dudo que lleguen a tiempo.'],
    keyWords: ['probable', 'lleguen', 'tiempo'],
    explanation: "'Es poco probable que' expresses doubt/uncertainty, triggering the subjunctive: llegar → lleguen."
  },
  {
    id: 'tr-48', level: 'C1', topic: 'literary',
    english: 'Were it not for his help, we would have failed.',
    primary: 'De no ser por su ayuda, habríamos fracasado.',
    acceptable: ['Si no fuera por su ayuda, habríamos fracasado.', 'Si no hubiera sido por su ayuda, habríamos fracasado.', 'A no ser por su ayuda, habríamos fracasado.'],
    keyWords: ['ayuda', 'habríamos', 'fracasado'],
    explanation: "'De no ser por' is an elegant construction for 'were it not for.' It avoids the heavier si-clause structure."
  },

  // ─────────────────────────────────────────────────────────
  //  C1 — Additional advanced entries (tr-49 to tr-56)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-49', level: 'C1', topic: 'subjunctive',
    english: 'I wish they had consulted us before making the decision.',
    primary: 'Ojalá nos hubieran consultado antes de tomar la decisión.',
    acceptable: ['Ojalá nos hubiesen consultado antes de tomar la decisión.', 'Ojalá que nos hubieran consultado antes de tomar la decisión.', 'Desearía que nos hubieran consultado antes de tomar la decisión.'],
    keyWords: ['ojalá', 'hubieran', 'consultado', 'decisión'],
    explanation: "'Ojalá' + pluperfect subjunctive expresses an unfulfilled wish about the past. Both '-ra' and '-se' endings are valid."
  },
  {
    id: 'tr-50', level: 'C1', topic: 'formal_writing',
    english: 'As stated in the previous report, the situation requires immediate action.',
    primary: 'Tal y como se indicó en el informe anterior, la situación requiere medidas inmediatas.',
    acceptable: ['Como se señaló en el informe anterior, la situación requiere medidas inmediatas.', 'Según se indicó en el informe previo, la situación requiere acción inmediata.', 'De acuerdo con lo indicado en el informe anterior, la situación exige medidas inmediatas.'],
    keyWords: ['indicó', 'informe', 'requiere', 'medidas'],
    explanation: "'Tal y como se indicó' is a formal discourse marker for referencing prior statements. 'Medidas' is preferred over 'acción' in formal registers."
  },
  {
    id: 'tr-51', level: 'C1', topic: 'literary',
    english: 'No sooner had the sun set than the city came alive.',
    primary: 'Apenas se hubo puesto el sol, la ciudad cobró vida.',
    acceptable: ['Apenas se puso el sol, la ciudad cobró vida.', 'Nada más ponerse el sol, la ciudad cobró vida.', 'En cuanto se puso el sol, la ciudad cobró vida.'],
    keyWords: ['apenas', 'hubo', 'puesto', 'cobró', 'vida'],
    explanation: "'Apenas + pretérito anterior' (se hubo puesto) is a literary tense expressing immediate succession. In modern usage the simple preterite often replaces it."
  },
  {
    id: 'tr-52', level: 'C1', topic: 'subjunctive',
    english: 'It is imperative that all parties reach an agreement before the deadline.',
    primary: 'Es imperativo que todas las partes lleguen a un acuerdo antes del plazo.',
    acceptable: ['Es imprescindible que todas las partes alcancen un acuerdo antes del plazo.', 'Resulta imperativo que todas las partes lleguen a un acuerdo antes de la fecha límite.', 'Es necesario que todas las partes lleguen a un acuerdo antes del plazo.'],
    keyWords: ['imperativo', 'partes', 'lleguen', 'acuerdo', 'plazo'],
    explanation: "'Es imperativo que' triggers the present subjunctive: llegar → lleguen. 'Plazo' and 'fecha límite' both work for 'deadline.'"
  },
  {
    id: 'tr-53', level: 'C1', topic: 'formal_writing',
    english: 'Despite the evidence to the contrary, the defendant maintained his innocence.',
    primary: 'Pese a las pruebas en su contra, el acusado mantuvo su inocencia.',
    acceptable: ['A pesar de las pruebas en su contra, el acusado mantuvo su inocencia.', 'Pese a la evidencia en contrario, el acusado sostuvo su inocencia.', 'No obstante las pruebas en su contra, el acusado mantuvo su inocencia.'],
    keyWords: ['pese', 'pruebas', 'acusado', 'mantuvo', 'inocencia'],
    explanation: "'Pese a' is a formal synonym of 'a pesar de' (despite). 'Mantener' and 'sostener' both convey 'maintained' in this legal context."
  },
  {
    id: 'tr-54', level: 'C1', topic: 'literary',
    english: 'The landscape stretched before us as if painted by a master.',
    primary: 'El paisaje se extendía ante nosotros como si lo hubiera pintado un maestro.',
    acceptable: ['El paisaje se extendía ante nosotros como si hubiese sido pintado por un maestro.', 'El paisaje se desplegaba ante nosotros cual si lo hubiera pintado un maestro.', 'Ante nosotros se extendía el paisaje como si lo hubiera pintado un maestro.'],
    keyWords: ['paisaje', 'extendía', 'como si', 'hubiera', 'pintado'],
    explanation: "'Como si' always triggers the subjunctive: here the pluperfect subjunctive (hubiera pintado) for a past hypothetical comparison."
  },
  {
    id: 'tr-55', level: 'C1', topic: 'periphrasis',
    english: 'They have been trying to solve this problem for months.',
    primary: 'Llevan meses intentando resolver este problema.',
    acceptable: ['Llevan meses tratando de resolver este problema.', 'Hace meses que intentan resolver este problema.', 'Llevan meses intentando solucionar este problema.'],
    keyWords: ['llevan', 'meses', 'intentando', 'resolver'],
    explanation: "'Llevar + time + gerund' is the Spanish periphrasis for 'have been doing something for.' It is far more natural than translating with present perfect continuous."
  },
  {
    id: 'tr-56', level: 'C1', topic: 'formal_writing',
    english: 'In light of recent events, the committee has decided to postpone the hearing.',
    primary: 'A la luz de los recientes acontecimientos, el comité ha decidido aplazar la audiencia.',
    acceptable: ['En vista de los recientes acontecimientos, el comité ha decidido posponer la audiencia.', 'A la luz de los últimos sucesos, el comité ha resuelto aplazar la audiencia.', 'Habida cuenta de los recientes acontecimientos, el comité ha decidido aplazar la audiencia.'],
    keyWords: ['a la luz', 'acontecimientos', 'comité', 'aplazar', 'audiencia'],
    explanation: "'A la luz de' is a formal phrase meaning 'in light of.' 'Aplazar' and 'posponer' both mean 'to postpone'; 'aplazar' is slightly more formal."
  },

  // ─────────────────────────────────────────────────────────
  //  C2 — Additional mastery-level entries (tr-57 to tr-63)
  // ─────────────────────────────────────────────────────────

  {
    id: 'tr-57', level: 'C2', topic: 'idiomatic',
    english: 'He went from bad to worse after losing his job.',
    primary: 'Fue de Guatemala a Guatepeor después de perder el empleo.',
    acceptable: ['Fue de mal en peor después de perder el empleo.', 'Todo fue cuesta abajo después de perder el trabajo.', 'Las cosas fueron de Guatemala a Guatepeor tras perder el empleo.'],
    keyWords: ['Guatemala', 'Guatepeor', 'perder', 'empleo'],
    explanation: "'De Guatemala a Guatepeor' is a uniquely Spanish wordplay idiom (Guatemala → Guate-peor, 'worse'). 'De mal en peor' is the standard non-idiomatic equivalent."
  },
  {
    id: 'tr-58', level: 'C2', topic: 'academic',
    english: 'The aforementioned paradigm shift has rendered previous models obsolete.',
    primary: 'El susodicho cambio de paradigma ha dejado obsoletos los modelos anteriores.',
    acceptable: ['El mencionado cambio de paradigma ha vuelto obsoletos los modelos anteriores.', 'Dicho cambio de paradigma ha dejado obsoletos los modelos previos.', 'El referido cambio de paradigma ha convertido en obsoletos los modelos anteriores.'],
    keyWords: ['susodicho', 'paradigma', 'obsoletos', 'modelos'],
    explanation: "'Susodicho' (aforementioned) is a highly formal/legalistic term. 'Dejar obsoleto' is the natural rendering of 'render obsolete.'"
  },
  {
    id: 'tr-59', level: 'C2', topic: 'dialectal',
    english: 'The kids were running around the park all afternoon.',
    primary: 'Los pibes estuvieron correteando por el parque toda la tarde.',
    acceptable: ['Los chamos estuvieron correteando por el parque toda la tarde.', 'Los chamacos anduvieron correteando por el parque toda la tarde.', 'Los niños estuvieron correteando por el parque toda la tarde.'],
    keyWords: ['pibes', 'correteando', 'parque', 'tarde'],
    explanation: "'Pibes' is Rioplatense (Argentina/Uruguay) for 'kids.' 'Chamos' is Venezuelan, 'chamacos' is Mexican. The voseo register is implied in the dialectal choice."
  },
  {
    id: 'tr-60', level: 'C2', topic: 'literary',
    english: 'Scarcely had he uttered those words when silence fell upon the room.',
    primary: 'Apenas hubo pronunciado aquellas palabras, el silencio se apoderó de la sala.',
    acceptable: ['Apenas hubo pronunciado aquellas palabras, un silencio se cernió sobre la sala.', 'No bien hubo pronunciado aquellas palabras, el silencio cayó sobre la sala.', 'Apenas pronunció aquellas palabras, el silencio se adueñó de la sala.'],
    keyWords: ['apenas', 'hubo', 'pronunciado', 'silencio', 'apoderó'],
    explanation: "The pretérito anterior (hubo pronunciado) is a literary tense expressing an action immediately before another past action. It is virtually extinct in spoken Spanish."
  },
  {
    id: 'tr-61', level: 'C2', topic: 'legal',
    english: 'Whoever may violate these provisions shall be subject to the penalties herein established.',
    primary: 'Quien contraviniere estas disposiciones quedará sujeto a las sanciones aquí establecidas.',
    acceptable: ['Quien contraviniere las presentes disposiciones quedará sujeto a las sanciones aquí previstas.', 'Quienquiera que contravenga estas disposiciones quedará sujeto a las sanciones aquí establecidas.', 'Todo aquel que contraviniere estas disposiciones será objeto de las sanciones aquí establecidas.'],
    keyWords: ['contraviniere', 'disposiciones', 'sujeto', 'sanciones', 'establecidas'],
    explanation: "The future subjunctive (contraviniere) survives almost exclusively in legal and legislative texts. It conveys a hypothetical future condition with formal gravity."
  },
  {
    id: 'tr-62', level: 'C2', topic: 'idiomatic',
    english: 'She always beats around the bush when you ask her directly.',
    primary: 'Siempre se anda por las ramas cuando le preguntas directamente.',
    acceptable: ['Siempre se va por las ramas cuando le preguntas directamente.', 'Siempre anda con rodeos cuando le haces una pregunta directa.', 'Siempre se anda con evasivas cuando le preguntas de frente.'],
    keyWords: ['anda', 'ramas', 'preguntas', 'directamente'],
    explanation: "'Andarse por las ramas' (to walk among the branches) means to avoid getting to the point. 'Andar con rodeos' (to go in detours) is a close synonym."
  },
  {
    id: 'tr-63', level: 'C2', topic: 'academic',
    english: 'The empirical evidence, albeit limited, corroborates the initial hypothesis.',
    primary: 'La evidencia empírica, si bien limitada, corrobora la hipótesis inicial.',
    acceptable: ['Los datos empíricos, aunque limitados, corroboran la hipótesis inicial.', 'La evidencia empírica, pese a ser limitada, corrobora la hipótesis inicial.', 'La evidencia empírica, aun siendo limitada, confirma la hipótesis inicial.'],
    keyWords: ['evidencia', 'empírica', 'limitada', 'corrobora', 'hipótesis'],
    explanation: "'Si bien' is a formal concessive connector equivalent to 'albeit/although.' 'Corroborar' is the academic standard for 'to corroborate/confirm.'"
  },
];
