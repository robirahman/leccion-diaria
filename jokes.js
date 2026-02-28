'use strict';

// ════════════════════════════════════════════════════════════
//  LECCION DIARIA — Jokes / Bromas
//  Linguistically informative Spanish humor:
//  false cognates, puns, wordplay, and cultural comedy
// ════════════════════════════════════════════════════════════

const JOKES_DATA = [

  // ──────────────────────────────────────────────────────────
  //  FALSE COGNATES (Falsos amigos)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-01',
    spanishName: 'Sopa, ropa y mantequilla',
    englishName: 'Soup, Clothes, and Butter',
    icon: '🧈',
    tags: ['false-cognates', 'wordplay'],
    descEs: '<p><em>"Sopa isn\'t soap, ropa isn\'t rope, and butter is meant to kill ya."</em></p><p>Este chiste de clase de español juega con los <strong>falsos amigos</strong> entre inglés y español. "Sopa" suena como "soap" pero significa soup. "Ropa" suena como "rope" pero significa clothing. Y "mantequilla" suena como "meant to kill ya" — ¡y encima tiene colesterol!</p>',
    descEn: '<p><em>"Sopa isn\'t soap, ropa isn\'t rope, and butter is meant to kill ya."</em></p><p>This classic Spanish class joke plays on <strong>false cognates</strong>. "Sopa" sounds like "soap" but means soup. "Ropa" sounds like "rope" but means clothing. And "mantequilla" (butter) sounds like "meant to kill ya" — and it has cholesterol too!</p>',
    vocab: [
      { word: 'sopa', english: 'soup (not soap!)' },
      { word: 'ropa', english: 'clothing (not rope!)' },
      { word: 'mantequilla', english: 'butter' },
      { word: 'falso amigo', english: 'false cognate' },
    ],
    quiz: [
      { prompt: '¿Qué significa "sopa" en inglés?', options: ['soap', 'soup', 'rope', 'sofa'], correct: 1, explanation: '"Sopa" is a classic false cognate: it looks like "soap" but actually means "soup." The Spanish word for soap is "jabón."' },
      { prompt: '¿Qué significa "ropa" en inglés?', options: ['rope', 'robe', 'clothing', 'red'], correct: 2, explanation: '"Ropa" sounds like "rope" but means "clothing" in general. The Spanish word for rope is "cuerda."' },
      { prompt: '"Mantequilla" sounds like...', options: ['man to cure ya', 'meant to kill ya', 'man take a villa', 'meant to chill ya'], correct: 1, explanation: 'The four syllables of "man-te-qui-lla" closely mimic the English phrase "meant to kill ya," making it a popular mnemonic for remembering the word for butter.' },
    ],
  },

  {
    id: 'joke-02',
    spanishName: 'Estoy embarazada',
    englishName: 'The Most Embarrassing False Cognate',
    icon: '😳',
    tags: ['false-cognates'],
    descEs: '<p>Un estudiante de español quiere decir "I\'m embarrassed" y dice: <em>"¡Estoy embarazada!"</em></p><p>Toda la clase se queda en silencio. "Embarazada" no significa embarrassed — ¡significa <strong>pregnant</strong>!</p><p>El falso amigo más famoso del español. La palabra correcta para embarrassed es <strong>"avergonzado/a"</strong>.</p>',
    descEn: '<p>A Spanish student wants to say "I\'m embarrassed" and announces: <em>"¡Estoy embarazada!"</em></p><p>The class goes silent. "Embarazada" doesn\'t mean embarrassed — it means <strong>pregnant</strong>!</p><p>The most famous Spanish false cognate. The correct word for embarrassed is <strong>"avergonzado/a"</strong>.</p>',
    vocab: [
      { word: 'embarazada', english: 'pregnant (NOT embarrassed!)' },
      { word: 'avergonzado/a', english: 'embarrassed' },
      { word: 'vergüenza', english: 'shame, embarrassment' },
    ],
    quiz: [
      { prompt: '¿Qué significa "embarazada"?', options: ['embarrassed', 'pregnant', 'embraced', 'amazed'], correct: 1, explanation: '"Embarazada" is perhaps the most infamous Spanish false cognate. Despite sounding like "embarrassed," it means "pregnant." Both words share a root meaning "to impede," but diverged dramatically in meaning.' },
      { prompt: '¿Cómo se dice "embarrassed" en español?', options: ['embarazado', 'avergonzado', 'embasado', 'abrazado'], correct: 1, explanation: '"Avergonzado/a" comes from "vergüenza" (shame/embarrassment) and is the correct way to say "embarrassed" in Spanish. "Embarazado" would mean "pregnant."' },
    ],
  },

  {
    id: 'joke-03',
    spanishName: 'Una tarta y un pie',
    englishName: 'Pie ≠ Pie',
    icon: '🥧',
    tags: ['false-cognates', 'wordplay'],
    descEs: '<p>En español: <strong>una tarta = a pie</strong> (un pastel)</p><p>En español: <strong>un pie = a foot</strong> (el pie del cuerpo)</p><p>Así que cuando un angloparlante pide "pie" en un restaurante español... ¡podría recibir un pie literal!</p>',
    descEn: '<p>In Spanish: <strong>una tarta = a pie</strong> (the dessert)</p><p>In Spanish: <strong>un pie = a foot</strong> (the body part)</p><p>So when an English speaker orders "pie" in a Spanish restaurant... they might get a literal foot!</p>',
    vocab: [
      { word: 'tarta', english: 'pie, cake' },
      { word: 'pie', english: 'foot (NOT pie!)' },
      { word: 'pastel', english: 'cake, pastry' },
    ],
    quiz: [
      { prompt: '¿Qué significa "pie" en español?', options: ['pie (dessert)', 'foot', 'leg', 'skin'], correct: 1, explanation: 'The Spanish word "pie" (pronounced "pyeh") means "foot," not the dessert. This is a false cognate that trips up many English speakers.' },
      { prompt: '¿Cómo se dice "pie" (el postre) en español?', options: ['pie', 'tarta', 'piel', 'torta'], correct: 1, explanation: '"Tarta" is the standard Spanish word for a pie or cake dessert. "Piel" means "skin" and "torta" can mean cake in some regions or a sandwich in Mexico.' },
    ],
  },

  {
    id: 'joke-04',
    spanishName: 'Éxito, excitado y constipado',
    englishName: 'Three Dangerous False Friends',
    icon: '⚠️',
    tags: ['false-cognates'],
    descEs: '<p>Tres falsos amigos que causan situaciones incómodas:</p><ul><li><strong>"Tengo mucho éxito"</strong> = I have a lot of success (no "exit")</li><li><strong>"Estoy excitado"</strong> = I\'m sexually aroused (no "excited")</li><li><strong>"Estoy constipado"</strong> = I have a cold (no "constipated")</li></ul><p>Imagina a un turista diciendo: <em>"¡Estoy muy excitado y un poco constipado!"</em> 😱</p>',
    descEn: '<p>Three false cognates that cause awkward situations:</p><ul><li><strong>"Tengo mucho éxito"</strong> = I\'m very successful (not "I have an exit")</li><li><strong>"Estoy excitado"</strong> = I\'m sexually aroused (not "I\'m excited")</li><li><strong>"Estoy constipado"</strong> = I have a cold (not "I\'m constipated")</li></ul><p>Imagine a tourist saying: <em>"I\'m very aroused and I have a cold!"</em> when they meant "I\'m excited and constipated!" 😱</p>',
    vocab: [
      { word: 'éxito', english: 'success (NOT exit!)' },
      { word: 'excitado', english: 'sexually aroused (NOT excited!)' },
      { word: 'constipado', english: 'having a cold (NOT constipated!)' },
      { word: 'emocionado', english: 'excited (the safe word)' },
      { word: 'salida', english: 'exit' },
      { word: 'estreñido', english: 'constipated' },
    ],
    quiz: [
      { prompt: '¿Qué significa "éxito"?', options: ['exit', 'success', 'excitement', 'exile'], correct: 1, explanation: '"Éxito" means "success," not "exit." The Spanish word for exit is "salida." "Éxito" comes from the Latin "exitus" (outcome), which evolved toward "successful outcome" in Spanish.' },
      { prompt: '¿Cómo se dice "excited" (sin connotación sexual)?', options: ['excitado', 'exitoso', 'emocionado', 'exigente'], correct: 2, explanation: '"Emocionado" is the safe way to say "excited" in Spanish. "Excitado" has a strong sexual connotation in most Spanish-speaking contexts and should be avoided for general excitement.' },
      { prompt: '¿Qué significa "estoy constipado"?', options: ['I\'m constipated', 'I have a cold', 'I\'m confused', 'I\'m constant'], correct: 1, explanation: '"Constipado" means "having a cold" in Spanish, not "constipated." The Spanish word for constipated is "estreñido." Both come from Latin "constipare" (to crowd together), but diverged in meaning.' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  PHONETIC PUNS (Juegos de palabras fonéticos)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-05',
    spanishName: 'Los calcetines',
    englishName: 'S-O-C-K-S',
    icon: '🧦',
    tags: ['pun', 'phonetics'],
    descEs: '<p>Un angloparlante entra en una tienda en México:</p><p>— <em>Quiero calcetines, por favor.</em><br>— ¿Estos? (señala camisetas)<br>— No, ¡calcetines!<br>— ¿Estos? (señala pantalones)<br>— ¡No! ¡CALCETINES!</p><p>Finalmente el dependiente le muestra calcetines.</p><p>— <em>¡Eso sí que es!</em><br>— Pues si sabía deletrearlo, ¿¡por qué no lo dijo antes?!</p><p><strong>El chiste:</strong> "Eso sí que es" se pronuncia como las letras <strong>S-O-C-K-S</strong> en inglés.</p>',
    descEn: '<p>An English speaker walks into a shop in Mexico:</p><p>— <em>Quiero calcetines, por favor.</em> (I want socks)<br>— These? (points at shirts)<br>— No, socks!<br>— These? (points at pants)<br>— No! SOCKS!</p><p>Finally the clerk shows socks.</p><p>— <em>¡Eso sí que es!</em> (That\'s it!)<br>— If you could spell it, why didn\'t you say so!</p><p><strong>The joke:</strong> "Eso sí que es" is pronounced like the letters <strong>S-O-C-K-S</strong>.</p>',
    vocab: [
      { word: 'calcetines', english: 'socks' },
      { word: 'eso sí que es', english: 'that\'s it! / that\'s the one!' },
      { word: 'deletrear', english: 'to spell' },
      { word: 'dependiente', english: 'shop clerk' },
    ],
    quiz: [
      { prompt: '¿Qué significa "calcetines"?', options: ['calculators', 'socks', 'calendars', 'caps'], correct: 1, explanation: '"Calcetines" means "socks." It comes from "calceta" (stocking), which derives from the Latin "calceus" (shoe). Despite the similar sound, it has no relation to "calculators."' },
      { prompt: '"Eso sí que es" sounds like which English word when spelled out?', options: ['SHOES', 'SOCKS', 'SACKS', 'SIXES'], correct: 1, explanation: 'The phrase "eso sí que es" (that\'s it!) is pronounced roughly "S-O-C-K-S" when you match each syllable to an English letter name: E(s)-O-C(í)-K(e)-S, making it a classic bilingual mnemonic.' },
    ],
  },

  {
    id: 'joke-06',
    spanishName: '¿Cómo se dice...?',
    englishName: 'How Do You Say...?',
    icon: '✈️',
    tags: ['pun', 'phonetics'],
    descEs: '<p>— ¿Cómo se dice "un zapato" en inglés?<br>— A shoe.<br>— ¡Salud! ¿Pero cómo se dice "un zapato"?</p><p><strong>El chiste:</strong> "A shoe" suena como "achoo" (¡achís!), el sonido de un estornudo. Por eso el otro responde "¡Salud!" (bless you).</p>',
    descEn: '<p>— How do you say "un zapato" in English?<br>— A shoe.<br>— Bless you! But how do you say "un zapato"?</p><p><strong>The joke:</strong> "A shoe" sounds like "achoo!" (a sneeze). That\'s why the other person says "¡Salud!" (bless you / gesundheit).</p>',
    vocab: [
      { word: 'zapato', english: 'shoe' },
      { word: 'salud', english: 'health; bless you; cheers' },
      { word: 'estornudo', english: 'sneeze' },
    ],
    quiz: [
      { prompt: '¿Qué significa "zapato"?', options: ['hat', 'jacket', 'shoe', 'sock'], correct: 2, explanation: '"Zapato" means "shoe." The word likely comes from the Turkish "zabata." In the joke, "a shoe" sounds like "achoo," creating the bilingual pun.' },
      { prompt: '¿Cuándo se dice "¡Salud!"?', options: ['When someone sneezes', 'When someone coughs', 'When someone yawns', 'When someone hiccups'], correct: 0, explanation: '"¡Salud!" (literally "health!") is said when someone sneezes, equivalent to "bless you" in English. It is also used as a toast when drinking, like "cheers."' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  GRAMMAR HUMOR (Humor gramatical)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-07',
    spanishName: 'El acento importa',
    englishName: 'Accents Matter',
    icon: '💍',
    tags: ['grammar', 'accents'],
    descEs: '<p>No es lo mismo:</p><ul><li><strong>Mi papá tiene 47 años.</strong> (My dad is 47 years old.)</li><li><strong>Mi papa tiene 47 anos.</strong> (My potato has 47 anuses.)</li></ul><p>¡Los acentos importan! <strong>Papá</strong> (dad) vs <strong>papa</strong> (potato). <strong>Años</strong> (years) vs <strong>anos</strong> (anuses).</p><p>La tilde sobre la ñ no es decoración — ¡cambia completamente el significado!</p>',
    descEn: '<p>These are NOT the same:</p><ul><li><strong>Mi papá tiene 47 años.</strong> (My dad is 47 years old.)</li><li><strong>Mi papa tiene 47 anos.</strong> (My potato has 47 anuses.)</li></ul><p>Accents matter! <strong>Papá</strong> (dad) vs <strong>papa</strong> (potato). <strong>Años</strong> (years) vs <strong>anos</strong> (anuses).</p><p>The tilde over the ñ isn\'t decoration — it completely changes the meaning!</p>',
    vocab: [
      { word: 'papá', english: 'dad' },
      { word: 'papa', english: 'potato' },
      { word: 'año', english: 'year' },
      { word: 'tilde', english: 'accent mark / tilde' },
    ],
    quiz: [
      { prompt: '¿Qué significa "papá" (con acento)?', options: ['potato', 'dad', 'pope', 'papaya'], correct: 1, explanation: 'The accent mark shifts the stress to the second syllable (pa-PA), changing the meaning from "potato" to "dad." Accent marks in Spanish frequently distinguish otherwise identical words.' },
      { prompt: '¿Qué palabra significa "year"?', options: ['ano', 'año', 'anna', 'añil'], correct: 1, explanation: 'The tilde (~) over the N creates the distinct letter "ñ," making "año" (year) completely different from "ano" (anus). The ñ represents a palatal nasal sound unique to Spanish.' },
      { prompt: '¿Qué significa "papa" (sin acento)?', options: ['dad', 'pope', 'potato', 'paper'], correct: 2, explanation: 'Without the accent mark, "papa" (stress on first syllable) means "potato." It can also mean "Pope" when capitalized (el Papa). The accent on "papá" is essential to mean "dad."' },
    ],
  },

  {
    id: 'joke-08',
    spanishName: 'Ser y estar en la cárcel',
    englishName: 'Ser vs Estar in Prison',
    icon: '🔒',
    tags: ['grammar', 'ser-estar'],
    descEs: '<p>Un profesor explica la diferencia entre <strong>ser</strong> y <strong>estar</strong>:</p><p><em>"Si dices \'estoy aburrido\', estás aburrido ahora mismo — es temporal. Si dices \'soy aburrido\'... bueno, siempre eres aburrido."</em></p><p>Otro ejemplo clásico:<br><strong>"Estar en la cárcel"</strong> = You\'re in prison (temporarily)<br><strong>"Ser de la cárcel"</strong> = You belong to the prison... ¡eres parte de ella!</p>',
    descEn: '<p>A teacher explains the ser/estar difference:</p><p><em>"If you say \'estoy aburrido\', you\'re bored right now — it\'s temporary. If you say \'soy aburrido\'... well, you\'re always boring."</em></p><p>Another classic:<br><strong>"Estar en la cárcel"</strong> = You\'re in prison (temporary state)<br><strong>"Ser de la cárcel"</strong> = You belong to the prison... you\'re part of it!</p>',
    vocab: [
      { word: 'aburrido', english: 'bored (estar) / boring (ser)' },
      { word: 'cárcel', english: 'prison, jail' },
      { word: 'temporal', english: 'temporary' },
      { word: 'permanente', english: 'permanent' },
    ],
    quiz: [
      { prompt: '"Estoy aburrido" means...', options: ['I am boring', 'I am bored', 'I am board', 'I am boredom'], correct: 1, explanation: '"Estar + aburrido" describes a temporary state: being bored right now. "Estar" is used for conditions that can change, like emotions, locations, and temporary states.' },
      { prompt: '"Soy aburrido" means...', options: ['I am bored', 'I am boring', 'I am annoyed', 'I am tired'], correct: 1, explanation: '"Ser + aburrido" describes an inherent characteristic: being a boring person by nature. "Ser" is used for permanent qualities, identity, and essential traits.' },
      { prompt: 'Which verb is used for temporary states?', options: ['ser', 'estar', 'haber', 'tener'], correct: 1, explanation: '"Estar" is used for temporary states, emotions, locations, and conditions that can change. "Ser" is for permanent characteristics, identity, origin, and time. This is one of the most fundamental distinctions in Spanish.' },
    ],
  },

  {
    id: 'joke-09',
    spanishName: 'Por y para confusión',
    englishName: 'The Por/Para Nightmare',
    icon: '😵',
    tags: ['grammar', 'por-para'],
    descEs: '<p>Un estudiante pregunta: <em>"Profesor, ¿cuándo uso por y cuándo uso para?"</em></p><p>El profesor: <em>"¡Buena pregunta! Siéntate, que vamos <strong>para</strong> largo."</em></p><p>El estudiante: <em>"Pero ¿<strong>por</strong> qué?"</em></p><p>El profesor: <em>"Exacto, eso también."</em></p><p><strong>Nota lingüística:</strong> "Ir para largo" = to take a long time. "¿Por qué?" = why? El chiste muestra que por y para aparecen naturalmente en cada oración — ¡son inevitables!</p>',
    descEn: '<p>A student asks: <em>"Professor, when do I use por and when do I use para?"</em></p><p>The professor: <em>"Good question! Sit down, this is going to take a while."</em> (vamos <strong>para</strong> largo)</p><p>The student: <em>"But <strong>why</strong>?"</em> (<strong>por</strong> qué)</p><p>The professor: <em>"Exactly, that too."</em></p><p><strong>Linguistic note:</strong> The joke shows that por/para appear naturally in every sentence — they\'re inescapable!</p>',
    vocab: [
      { word: 'ir para largo', english: 'to take a long time' },
      { word: 'por qué', english: 'why' },
      { word: 'porque', english: 'because' },
      { word: 'para', english: 'for (purpose/destination)' },
      { word: 'por', english: 'for (cause/exchange/through)' },
    ],
    quiz: [
      { prompt: '"¿Por qué?" means...', options: ['for what?', 'why?', 'for whom?', 'because'], correct: 1, explanation: '"¿Por qué?" (two words, with accent) means "why?" The "por" here expresses cause/reason. Note the four forms: "por qué" (why?), "porque" (because), "porqué" (the reason), and "por que" (for which).' },
      { prompt: '"Vamos para largo" means...', options: ['Let\'s go far', 'This will take a while', 'We\'re going to be tall', 'Let\'s leave for Long'], correct: 1, explanation: '"Ir para largo" is an idiomatic expression meaning "to take a long time." Here "para" indicates direction or destination in a figurative sense, one of its core uses.' },
    ],
  },

  {
    id: 'joke-10',
    spanishName: 'El subjuntivo no existe',
    englishName: 'The Subjunctive Doesn\'t Exist',
    icon: '👻',
    tags: ['grammar', 'subjunctive'],
    descEs: '<p>— ¿Cuál es el modo verbal más difícil del español?<br>— El subjuntivo.<br>— ¿Y cómo se usa?<br>— Pues... es posible que <strong>sea</strong> difícil... pero dudo que <strong>entiendas</strong>... quiero que lo <strong>practiques</strong>... espero que <strong>aprendas</strong>...<br>— ¡Pero usted lo acaba de usar cuatro veces!<br>— Sí, es que es inevitable. Ojalá <strong>fuera</strong> más fácil.</p><p><strong>Nota:</strong> Cada frase en negrita contiene un subjuntivo activado por un detonante diferente: posibilidad (sea), duda (entiendas), deseo (practiques), esperanza (aprendas), deseo irreal (fuera).</p>',
    descEn: '<p>— What\'s the hardest Spanish verb mood?<br>— The subjunctive.<br>— How do you use it?<br>— Well... it\'s possible that it <strong>is</strong> hard... but I doubt you\'ll <strong>understand</strong>... I want you to <strong>practice</strong> it... I hope you <strong>learn</strong> it...<br>— But you just used it four times!<br>— Yes, it\'s inevitable. I wish it <strong>were</strong> easier.</p><p><strong>Note:</strong> Each bold phrase contains a subjunctive triggered by: possibility (sea), doubt (entiendas), desire (practiques), hope (aprendas), unreal wish (fuera).</p>',
    vocab: [
      { word: 'subjuntivo', english: 'subjunctive mood' },
      { word: 'es posible que', english: 'it\'s possible that (+ subjunctive)' },
      { word: 'dudo que', english: 'I doubt that (+ subjunctive)' },
      { word: 'quiero que', english: 'I want (someone) to (+ subjunctive)' },
      { word: 'ojalá', english: 'I wish / if only (+ subjunctive)' },
    ],
    quiz: [
      { prompt: '"Es posible que sea difícil." What triggers the subjunctive here?', options: ['certainty', 'possibility/doubt', 'command', 'past tense'], correct: 1, explanation: 'Expressions of possibility and doubt (es posible que, quizás, tal vez) trigger the subjunctive because they indicate uncertainty. The indicative is used for statements of fact and certainty.' },
      { prompt: '"Ojalá fuera más fácil." What form is "fuera"?', options: ['present indicative', 'preterite', 'imperfect subjunctive', 'conditional'], correct: 2, explanation: '"Fuera" is the imperfect subjunctive of "ser." "Ojalá" (from Arabic "inshallah") triggers the subjunctive, and the imperfect subjunctive is used here because the wish is contrary to reality (it is not easy).' },
      { prompt: 'Which does NOT trigger the subjunctive?', options: ['quiero que...', 'es cierto que...', 'dudo que...', 'ojalá...'], correct: 1, explanation: '"Es cierto que" (it is certain that) expresses certainty, so it takes the indicative, not the subjunctive. Expressions of desire, doubt, and wishes all require the subjunctive in the subordinate clause.' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  DOUBLE MEANINGS (Doble sentido)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-11',
    spanishName: 'El esposo en el hospital',
    englishName: 'Esposa = Wife AND Handcuffs',
    icon: '👮',
    tags: ['double-meaning', 'vocabulary'],
    descEs: '<p>— Doctor, mi esposa tuvo un accidente, ¿cómo está?<br>— Bueno, le tuvimos que poner las esposas.<br>— ¡¿Cómo?! ¿Está detenida?<br>— No, es que estaba muy agitada y tuvimos que inmovilizarla con esposas... las de metal.</p><p><strong>El chiste:</strong> "Esposa" tiene dos significados: <strong>wife</strong> y <strong>handcuffs</strong> (plural: esposas). La misma palabra latina "sponsa" evolucionó para significar ambas cosas — ¡quizás un comentario sobre el matrimonio!</p>',
    descEn: '<p>— Doctor, my wife had an accident, how is she?<br>— Well, we had to put the "esposas" on her.<br>— What?! She\'s under arrest?!<br>— No, she was very agitated so we had to restrain her with handcuffs.</p><p><strong>The joke:</strong> "Esposa" means both <strong>wife</strong> and <strong>handcuffs</strong>. The same Latin word "sponsa" evolved to mean both — perhaps a commentary on marriage!</p>',
    vocab: [
      { word: 'esposa', english: 'wife' },
      { word: 'esposas', english: 'wives; handcuffs' },
      { word: 'detenida', english: 'detained, under arrest' },
      { word: 'agitada', english: 'agitated, upset' },
    ],
    quiz: [
      { prompt: '¿Qué doble significado tiene "esposas"?', options: ['wives and handcuffs', 'wives and rings', 'sisters and chains', 'mothers and locks'], correct: 0, explanation: '"Esposas" means both "wives" and "handcuffs." Both meanings derive from the Latin "sponsa" (betrothed). The dual meaning is a well-known source of humor in Spanish.' },
      { prompt: '¿Qué significa "detenida"?', options: ['detained', 'sick', 'confused', 'relaxed'], correct: 0, explanation: '"Detenida" means "detained" or "under arrest," from the verb "detener" (to detain/stop). It can also mean simply "stopped," but in a police context it specifically means placed under arrest.' },
    ],
  },

  {
    id: 'joke-12',
    spanishName: 'El banco',
    englishName: 'The Bank or The Bench?',
    icon: '🪑',
    tags: ['double-meaning', 'vocabulary'],
    descEs: '<p>— ¿Dónde pones tu dinero?<br>— En el banco.<br>— ¿En el banco del parque?<br>— No, en el banco donde guardan dinero.<br>— ¡Ah! ¿Y dónde te sientas?<br>— En el banco.<br>— ¿En el banco donde guardan dinero?<br>— ¡No! ¡En el banco del parque!</p><p><strong>Nota:</strong> "Banco" significa <strong>bank</strong> (institución financiera) Y <strong>bench</strong> (asiento). Ambos vienen del germánico "bank" — los primeros banqueros trabajaban literalmente en un banco (mesa) en la calle.</p>',
    descEn: '<p>— Where do you put your money?<br>— At the banco.<br>— On the park bench?<br>— No, at the bank where they keep money.<br>— Ah! And where do you sit?<br>— On the banco.<br>— At the bank where they keep money?<br>— No! On the park bench!</p><p><strong>Note:</strong> "Banco" means both <strong>bank</strong> and <strong>bench</strong>. Both come from Germanic "bank" — the first bankers literally worked on a bench (table) in the street.</p>',
    vocab: [
      { word: 'banco', english: 'bank; bench' },
      { word: 'guardar', english: 'to keep, to store' },
      { word: 'sentarse', english: 'to sit down' },
      { word: 'banquero', english: 'banker' },
    ],
    quiz: [
      { prompt: '¿Qué dos significados tiene "banco"?', options: ['bank and bench', 'white and blank', 'bank and boat', 'bench and branch'], correct: 0, explanation: '"Banco" means both "bank" (financial institution) and "bench" (seat). The connection is historical: early money-lenders conducted business on benches in public markets.' },
      { prompt: '¿De dónde viene la palabra "banco"?', options: ['Latin "bancus"', 'Germanic "bank"', 'Arabic "bunka"', 'Greek "bancos"'], correct: 1, explanation: '"Banco" comes from the Germanic word "bank" (bench/table), which entered Spanish through medieval commerce. The same root gave English both "bank" and "bench."' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  GENDER HUMOR (Humor de género gramatical)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-13',
    spanishName: 'El problema con el género',
    englishName: 'The Gender Problem',
    icon: '🤔',
    tags: ['grammar', 'gender'],
    descEs: '<p>Regla: las palabras que terminan en -a son femeninas.</p><p>Excepciones: el problema, el tema, el sistema, el programa, el idioma, el drama, el clima, el poema, el mapa, el planeta, el día...</p><p>Estudiante: <em>"¿Hay alguna regla que funcione al 100%?"</em><br>Profesor: <em>"Sí: que no hay regla que funcione al 100%."</em></p><p><strong>Nota:</strong> Estas palabras vienen del griego, donde eran neutras (terminaban en -ma). Al pasar al español se quedaron masculinas a pesar de terminar en -a.</p>',
    descEn: '<p>Rule: words ending in -a are feminine.</p><p>Exceptions: el problema, el tema, el sistema, el programa, el idioma, el drama, el clima, el poema, el mapa, el planeta, el día...</p><p>Student: <em>"Is there a rule that works 100% of the time?"</em><br>Teacher: <em>"Yes: that no rule works 100% of the time."</em></p><p><strong>Note:</strong> These words come from Greek, where they were neuter (ending in -ma). When they entered Spanish, they stayed masculine despite ending in -a.</p>',
    vocab: [
      { word: 'el problema', english: 'the problem (masculine!)' },
      { word: 'el tema', english: 'the topic (masculine!)' },
      { word: 'el idioma', english: 'the language (masculine!)' },
      { word: 'el mapa', english: 'the map (masculine!)' },
      { word: 'el día', english: 'the day (masculine!)' },
    ],
    quiz: [
      { prompt: '¿Cuál es el artículo correcto? "___ problema"', options: ['la', 'el', 'una', 'los'], correct: 1, explanation: '"Problema" is masculine despite ending in -a, so it takes the masculine article "el." This applies to many Spanish words of Greek origin ending in -ma: el tema, el sistema, el programa.' },
      { prompt: '¿Por qué "problema" es masculino aunque termina en -a?', options: ['It\'s from Arabic', 'It\'s from Greek (neuter -ma)', 'It\'s irregular', 'It\'s actually feminine'], correct: 1, explanation: 'Words like "problema," "tema," and "sistema" come from Greek neuter nouns ending in -ma. When they entered Spanish (which has no neuter gender), they were assigned masculine gender, keeping their -a ending.' },
      { prompt: '¿Cuál de estas palabras es femenina?', options: ['el mapa', 'el día', 'la mesa', 'el clima'], correct: 2, explanation: '"Mesa" (table) is a standard feminine noun ending in -a. The others are all exceptions: "mapa," "día," and "clima" are masculine despite their -a endings.' },
    ],
  },

  {
    id: 'joke-14',
    spanishName: 'El agua y la águila',
    englishName: 'El Agua is Feminine!',
    icon: '💧',
    tags: ['grammar', 'gender'],
    descEs: '<p>Estudiante: <em>"¿\'El agua\' es masculino?"</em><br>Profesor: <em>"No, es femenino."</em><br>Estudiante: <em>"¿Pero se dice \'el agua\'?"</em><br>Profesor: <em>"Sí, porque \'la agua\' suena feo — dos aes juntas. Pero es \'el agua fría\', no \'el agua frío\'."</em><br>Estudiante: <em>"El español está loco."</em><br>Profesor: <em>"La lengua española está loca. Pero el idioma español está loco."</em><br>Estudiante: 🤯</p><p><strong>Regla:</strong> Las palabras femeninas que empiezan con a- o ha- tónica usan "el" en singular: el agua, el águila, el hambre. Pero siguen siendo femeninas.</p>',
    descEn: '<p>Student: <em>"Is \'el agua\' masculine?"</em><br>Teacher: <em>"No, it\'s feminine."</em><br>Student: <em>"But you say \'el agua\'?"</em><br>Teacher: <em>"Yes, because \'la agua\' sounds bad — two a\'s together. But it\'s \'el agua fría\', not \'el agua frío\'."</em><br>Student: <em>"Spanish is crazy."</em><br>Teacher: <em>"La lengua española está loca. Pero el idioma español está loco."</em><br>Student: 🤯</p><p><strong>Rule:</strong> Feminine nouns starting with stressed a- or ha- use "el" in singular: el agua, el águila, el hambre. But they remain feminine.</p>',
    vocab: [
      { word: 'el agua', english: 'the water (feminine!)' },
      { word: 'el águila', english: 'the eagle (feminine!)' },
      { word: 'el hambre', english: 'the hunger (feminine!)' },
      { word: 'tónica', english: 'stressed (syllable)' },
    ],
    quiz: [
      { prompt: '¿"El agua" es masculino o femenino?', options: ['masculino', 'femenino', 'neutro', 'ambos'], correct: 1, explanation: '"Agua" is feminine. It uses "el" instead of "la" only to avoid the awkward "la agua" (two stressed a-sounds colliding). The adjective remains feminine: "el agua fría," not "el agua frío."' },
      { prompt: '¿Cuál es correcto?', options: ['el agua frío', 'el agua fría', 'la agua fría', 'la agua frío'], correct: 1, explanation: '"El agua fría" is correct. The article "el" is used for phonetic reasons (to avoid "la agua"), but the adjective "fría" stays feminine because "agua" is a feminine noun. In the plural, it reverts to "las aguas."' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  VERB HUMOR (Humor de verbos)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-15',
    spanishName: 'Conjugar "caber"',
    englishName: 'Conjugating "caber" (to fit)',
    icon: '📦',
    tags: ['verbs', 'irregular'],
    descEs: '<p>Profesor: <em>"Conjuga \'caber\' en presente."</em><br>Alumno: <em>"Yo quepo, tú cabes, él cabe..."</em><br>Profesor: <em>"¿Y el futuro?"</em><br>Alumno: <em>"Yo cabré... ¿en serio?"</em><br>Profesor: <em>"Sí."</em><br>Alumno: <em>"¿Y el subjuntivo?"</em><br>Profesor: <em>"Que yo quepa."</em><br>Alumno: <em>"¡Esto no cabe en mi cabeza!"</em><br>Profesor: <em>"Exacto. \'No cabe\'. Bien conjugado."</em></p><p><strong>Nota:</strong> "Caber" es uno de los verbos más irregulares del español. "Quepo" en presente, "cabré" en futuro, "cupe" en pretérito, "quepa" en subjuntivo.</p>',
    descEn: '<p>Teacher: <em>"Conjugate \'caber\' in present tense."</em><br>Student: <em>"Yo quepo, tú cabes, él cabe..."</em><br>Teacher: <em>"And the future?"</em><br>Student: <em>"Yo cabré... seriously?"</em><br>Teacher: <em>"Yes."</em><br>Student: <em>"And the subjunctive?"</em><br>Teacher: <em>"Que yo quepa."</em><br>Student: <em>"This doesn\'t fit in my head!" (¡No cabe en mi cabeza!)</em><br>Teacher: <em>"Exactly. \'No cabe.\' Well conjugated."</em></p><p><strong>Note:</strong> "Caber" (to fit) is one of Spanish\'s most irregular verbs: quepo, cabré, cupe, quepa.</p>',
    vocab: [
      { word: 'caber', english: 'to fit (in a space)' },
      { word: 'quepo', english: 'I fit (present, irregular)' },
      { word: 'cabré', english: 'I will fit (future, irregular stem)' },
      { word: 'cupe', english: 'I fit (preterite, irregular)' },
      { word: 'no cabe duda', english: 'there is no doubt (lit: doubt doesn\'t fit)' },
    ],
    quiz: [
      { prompt: '¿Cuál es la forma correcta? "Yo ___ en el coche."', options: ['cabo', 'quepo', 'capo', 'cupo'], correct: 1, explanation: 'The first-person present of "caber" is the highly irregular "quepo." This stem change (cab- to quep-) only occurs in the yo form, similar to how "saber" becomes "sé" and "poner" becomes "pongo."' },
      { prompt: '¿Cuál es el futuro de "caber"?', options: ['caberé', 'cabré', 'queperé', 'cupré'], correct: 1, explanation: '"Caber" has an irregular future stem: "cabr-" instead of the expected "caber-." This shortened stem pattern is shared by other common verbs like "saber" (sabré), "poder" (podré), and "haber" (habré).' },
    ],
  },

  {
    id: 'joke-16',
    spanishName: 'Haber vs A ver',
    englishName: 'Haber vs A ver',
    icon: '👀',
    tags: ['grammar', 'homophones'],
    descEs: '<p><em>"Haber si nos vemos"</em> ← ¡ERROR!</p><p><em>"A ver si nos vemos"</em> ← ¡Correcto!</p><p>Un español a otro: <em>"¡Que no es \'haber\', es \'a ver\'! ¡\'Haber\' es un verbo, \'a ver\' es una expresión!"</em></p><p>El otro: <em>"Bueno, haber empezado por ahí."</em></p><p>El primero: 😤 <em>"¡¡A VER!! ¡¡No \'haber\'!!"</em></p><p><strong>Nota:</strong> "Haber" = to have (auxiliary). "A ver" = let\'s see. Suenan casi igual pero se escriben diferente. Este error es tan común entre nativos que es un meme.</p>',
    descEn: '<p><em>"Haber si nos vemos"</em> ← WRONG!</p><p><em>"A ver si nos vemos"</em> ← Correct!</p><p>One Spaniard to another: <em>"It\'s not \'haber\', it\'s \'a ver\'! \'Haber\' is a verb, \'a ver\' is an expression!"</em></p><p>The other: <em>"Well, you should have started with that."</em> (uses \'haber\' correctly)</p><p>The first: 😤 <em>"A VER!! Not \'haber\'!!"</em></p><p><strong>Note:</strong> "Haber" = to have (auxiliary). "A ver" = let\'s see. They sound almost identical but are written differently. Even native speakers confuse them constantly — it\'s a meme in Spanish.</p>',
    vocab: [
      { word: 'haber', english: 'to have (auxiliary verb)' },
      { word: 'a ver', english: 'let\'s see' },
      { word: 'haber empezado', english: 'should have started (past infinitive)' },
    ],
    quiz: [
      { prompt: '¿Cuál es correcto?', options: ['Haber si vienes', 'A ver si vienes', 'Aber si vienes', 'Ha ver si vienes'], correct: 1, explanation: '"A ver si vienes" (let\'s see if you come) is correct. "A ver" is the preposition "a" plus the infinitive "ver." "Haber" is the auxiliary verb (to have) and cannot be used here, though this is one of the most common spelling errors among native Spanish speakers.' },
      { prompt: '"Haber" is primarily used as...', options: ['a preposition', 'an auxiliary verb', 'an interjection', 'an adverb'], correct: 1, explanation: '"Haber" is the primary auxiliary verb in Spanish, used to form compound tenses (he comido, había dicho). It also serves as an impersonal verb meaning "there is/are" (hay, hubo, habrá).' },
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  CULTURAL / REGIONAL (Cultural y regional)
  // ──────────────────────────────────────────────────────────

  {
    id: 'joke-17',
    spanishName: 'Coger el autobús',
    englishName: 'Catching the Bus (Carefully)',
    icon: '🚌',
    tags: ['regional', 'vocabulary'],
    descEs: '<p>En España: <em>"Voy a coger el autobús."</em> = I\'m going to catch the bus. Perfectamente normal.</p><p>En Latinoamérica: <em>"Voy a coger el autobús."</em> = 😱😱😱</p><p>En muchos países latinoamericanos, "coger" tiene una connotación sexual muy fuerte. Allí se dice <strong>"tomar"</strong> el autobús.</p><p>Otros verbos seguros: <strong>agarrar</strong> (grab), <strong>tomar</strong> (take), <strong>recoger</strong> (pick up).</p>',
    descEn: '<p>In Spain: <em>"Voy a coger el autobús."</em> = I\'m going to catch the bus. Perfectly normal.</p><p>In Latin America: <em>"Voy a coger el autobús."</em> = 😱😱😱</p><p>In many Latin American countries, "coger" has a very strong sexual connotation. There they say <strong>"tomar"</strong> el autobús.</p><p>Safe alternatives: <strong>agarrar</strong> (grab), <strong>tomar</strong> (take), <strong>recoger</strong> (pick up).</p>',
    vocab: [
      { word: 'coger', english: 'to catch/take (Spain); vulgar (LatAm)' },
      { word: 'tomar', english: 'to take (safe everywhere)' },
      { word: 'agarrar', english: 'to grab, to take' },
      { word: 'recoger', english: 'to pick up, to collect' },
    ],
    quiz: [
      { prompt: 'In Latin America, "coger" is...', options: ['formal', 'normal', 'vulgar', 'archaic'], correct: 2, explanation: 'In most of Latin America, "coger" has a strong vulgar/sexual connotation and should be avoided. In Spain, however, it is a perfectly normal everyday verb meaning "to take" or "to catch." This is one of the biggest regional vocabulary differences in Spanish.' },
      { prompt: 'The safe alternative for "to catch the bus" in all countries is...', options: ['coger el autobús', 'tomar el autobús', 'pegar el autobús', 'meter el autobús'], correct: 1, explanation: '"Tomar el autobús" is universally understood and safe across all Spanish-speaking countries. "Tomar" (to take) is the standard neutral alternative that avoids any regional taboo associated with "coger."' },
    ],
  },

  {
    id: 'joke-18',
    spanishName: 'Hasta y asta',
    englishName: 'Hasta vs Asta',
    icon: '🦌',
    tags: ['homophones', 'vocabulary'],
    descEs: '<p>— ¿Qué le dijo un toro a otro toro?<br>— ¡Hasta mañana!<br>— ¡No! ¡ASTA mañana! ¡Porque somos toros y tenemos astas!</p><p><strong>El chiste:</strong> "Hasta" (until) y "asta" (horn/antler, flagpole) son homófonas en la mayoría de dialectos. Los toros tienen <strong>astas</strong> (cuernos), así que el juego de palabras funciona con ambas grafías.</p>',
    descEn: '<p>— What did one bull say to another?<br>— ¡Hasta mañana! (See you tomorrow!)<br>— No! ¡ASTA mañana! Because we\'re bulls and we have horns!</p><p><strong>The joke:</strong> "Hasta" (until) and "asta" (horn/antler, flagpole) are homophones in most dialects. Bulls have <strong>astas</strong> (horns), so the wordplay works with both spellings.</p>',
    vocab: [
      { word: 'hasta', english: 'until, up to' },
      { word: 'asta', english: 'horn, antler, flagpole' },
      { word: 'toro', english: 'bull' },
      { word: 'cuerno', english: 'horn' },
    ],
    quiz: [
      { prompt: '¿Qué significa "asta" (sin h)?', options: ['until', 'horn/flagpole', 'star', 'toast'], correct: 1, explanation: '"Asta" (without H) means "horn," "antler," or "flagpole." Since the H is silent in Spanish, "asta" and "hasta" are homophones, but they have completely different meanings and spellings.' },
      { prompt: '¿Cuál es correcto para "See you tomorrow"?', options: ['Asta mañana', 'Hasta mañana', 'Asta mayana', 'Hasta manana'], correct: 1, explanation: '"Hasta mañana" is the correct spelling. "Hasta" (with H) means "until," so the phrase literally means "until tomorrow." Note that "mañana" also requires the ñ to distinguish it from "manana," which is not a word.' },
    ],
  },

  {
    id: 'joke-19',
    spanishName: 'Cinco y "sink-o"',
    englishName: 'Cinco de Mayo',
    icon: '🎉',
    tags: ['pun', 'phonetics'],
    descEs: '<p>— ¿Cuál es el día favorito de los platos sucios?<br>— ¡El cinco de mayo!<br>— ¿Por qué?<br>— Porque en inglés "cinco" suena como "sink-o"... ¡y los platos van al sink (fregadero)!</p><p><strong>Nota fonética:</strong> "Cinco" en español se pronuncia /ˈθiŋko/ o /ˈsiŋko/, que suena similar a "sink-o" en inglés. "Sink" = fregadero.</p>',
    descEn: '<p>— What\'s a dirty dish\'s favorite holiday?<br>— Cinco de Mayo!<br>— Why?<br>— Because "cinco" sounds like "sink-o"... and dishes go in the sink!</p><p><strong>Phonetic note:</strong> "Cinco" in Spanish is pronounced /ˈsiŋko/, similar to "sink-o" in English. A perfect bilingual pun.</p>',
    vocab: [
      { word: 'cinco', english: 'five' },
      { word: 'fregadero', english: 'kitchen sink' },
      { word: 'plato', english: 'plate, dish' },
      { word: 'sucio', english: 'dirty' },
    ],
    quiz: [
      { prompt: '¿Qué significa "fregadero"?', options: ['refrigerator', 'kitchen sink', 'dishwasher', 'oven'], correct: 1, explanation: '"Fregadero" means "kitchen sink," from the verb "fregar" (to scrub/wash dishes). The root "fregar" comes from Latin "fricare" (to rub), which also gave English the word "friction."' },
      { prompt: '¿Qué número es "cinco"?', options: ['4', '5', '6', '15'], correct: 1, explanation: '"Cinco" means "five," from Latin "quinque." In the joke, its pronunciation (/siŋko/) sounds like "sink-o" in English, creating the bilingual pun about dishes going in the sink.' },
    ],
  },

  {
    id: 'joke-20',
    spanishName: 'La letra H',
    englishName: 'The Silent Letter',
    icon: '🤫',
    tags: ['phonetics', 'spelling'],
    descEs: '<p>La H en español no se pronuncia. Entonces:</p><p>— ¿Qué le dijo la H a la A?<br>— ¡Sin mí, "hablar" sería "ablar"!<br>— Sí, pero nadie notaría la diferencia.</p><p>Un alumno: <em>"Si la H es muda, ¿por qué existe?"</em><br>Profesor: <em>"Por la misma razón que existe la K en \'know\' en inglés."</em><br>Alumno: <em>"...touché."</em></p><p><strong>Nota:</strong> La H española era aspirada en latín (como la H inglesa). Con el tiempo se enmudeció, pero la ortografía conservó la letra. Hoy solo se pronuncia en préstamos: "hámster", "hacker".</p>',
    descEn: '<p>The H in Spanish is silent. So:</p><p>— What did the H say to the A?<br>— Without me, "hablar" (to speak) would be "ablar"!<br>— Yes, but nobody would notice the difference.</p><p>Student: <em>"If H is silent, why does it exist?"</em><br>Teacher: <em>"For the same reason K exists in \'know\' in English."</em><br>Student: <em>"...touché."</em></p><p><strong>Note:</strong> Spanish H was aspirated in Latin (like English H). Over time it went silent, but spelling kept the letter. Today it\'s only pronounced in loanwords: "hámster", "hacker".</p>',
    vocab: [
      { word: 'muda', english: 'silent, mute' },
      { word: 'hablar', english: 'to speak' },
      { word: 'ortografía', english: 'spelling, orthography' },
      { word: 'pronunciar', english: 'to pronounce' },
    ],
    quiz: [
      { prompt: 'The H in Spanish is generally...', options: ['pronounced like English H', 'silent', 'pronounced like J', 'only in questions'], correct: 1, explanation: 'The Spanish H is silent in nearly all native words. It was once aspirated in Latin (like in English), but lost its sound over centuries while the spelling was preserved. It is only pronounced in loanwords like "hámster" or "hacker."' },
      { prompt: 'Why does Spanish keep the silent H?', options: ['Arabic influence', 'Historical spelling from Latin', 'To distinguish homophones', 'Grammar rules'], correct: 1, explanation: 'Spanish retains the silent H because of historical spelling conventions inherited from Latin. Words like "hablar" (from Latin "fabulare") and "hacer" (from Latin "facere") kept the H to reflect their etymological origins, even after the sound disappeared.' },
    ],
  },
];
