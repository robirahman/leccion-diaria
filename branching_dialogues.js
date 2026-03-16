// branching_dialogues.js — Interactive branching dialogue scenarios
// 6 scenarios across CEFR levels (A1-B2) with player choices affecting conversation flow
'use strict';

const BRANCHING_DIALOGUES = [

  // ════════════════════════════════════════
  // 1. A1: AT THE CAFE
  // ════════════════════════════════════════
  {
    id: 'bd-1',
    title: 'En la cafetería',
    titleEn: 'At the café',
    icon: '\u2615',
    level: 'A1',
    desc: 'Order a coffee and make small talk',
    speakers: [
      { name: 'Barista', role: 'npc' },
      { name: 'Tú', role: 'player' }
    ],
    nodes: [
      { id: 'start', speaker: 0, spanish: '¡Hola! Bienvenido. ¿Qué le puedo servir?', english: 'Hi! Welcome. What can I get you?', next: 'choice1' },
      { id: 'choice1', speaker: 1, choices: [
        { spanish: 'Un café con leche, por favor.', english: 'A coffee with milk, please.', feedback: '¡Perfecto! Very natural ordering. "Café con leche" is the most popular order in Spain.', next: 'resp1a' },
        { spanish: 'Quiero un café solo.', english: 'I want a black coffee.', feedback: 'Good! "Café solo" means black coffee — an espresso without milk.', next: 'resp1b' },
        { spanish: 'No sé... ¿Qué me recomienda?', english: "I don't know... What do you recommend?", feedback: 'Great question! Asking for recommendations is very useful when traveling.', next: 'resp1c' },
      ]},
      { id: 'resp1a', speaker: 0, spanish: '¡Buena elección! ¿Grande o pequeño?', english: 'Good choice! Large or small?', next: 'choice2a' },
      { id: 'choice2a', speaker: 1, choices: [
        { spanish: 'Grande, por favor.', english: 'Large, please.', feedback: 'Simple and clear! "Por favor" is always appreciated.', next: 'resp2' },
        { spanish: 'Pequeño está bien.', english: 'Small is fine.', feedback: '"Está bien" means "it\'s fine" — very versatile phrase!', next: 'resp2' },
      ]},
      { id: 'resp1b', speaker: 0, spanish: 'Muy bien. ¿Lo quiere para tomar aquí o para llevar?', english: 'Very well. Do you want it for here or to go?', next: 'choice2b' },
      { id: 'choice2b', speaker: 1, choices: [
        { spanish: 'Para tomar aquí, gracias.', english: 'For here, thanks.', feedback: '"Para tomar aquí" is the standard phrase for dining in.', next: 'resp2' },
        { spanish: 'Para llevar, por favor.', english: 'To go, please.', feedback: '"Para llevar" literally means "to carry" — used for takeout.', next: 'resp2' },
      ]},
      { id: 'resp1c', speaker: 0, spanish: 'Nuestro chocolate caliente es muy popular. ¿Le gustaría probarlo?', english: 'Our hot chocolate is very popular. Would you like to try it?', next: 'choice2c' },
      { id: 'choice2c', speaker: 1, choices: [
        { spanish: '¡Sí, suena delicioso!', english: 'Yes, that sounds delicious!', feedback: '"Suena delicioso" — "sounds delicious" is a great way to express enthusiasm!', next: 'resp2' },
        { spanish: 'Prefiero un té, por favor.', english: 'I prefer a tea, please.', feedback: '"Prefiero" (I prefer) is a polite way to make a different choice.', next: 'resp2' },
      ]},
      { id: 'resp2', speaker: 0, spanish: 'Perfecto. ¿Desea algo más? Tenemos churros frescos.', english: 'Perfect. Would you like anything else? We have fresh churros.', next: 'choice3' },
      { id: 'choice3', speaker: 1, choices: [
        { spanish: '¡Sí! Unos churros, por favor.', english: 'Yes! Some churros, please.', feedback: 'Churros con chocolate is a classic Spanish treat!', next: 'resp3a' },
        { spanish: 'No, gracias. Eso es todo.', english: 'No, thank you. That\'s all.', feedback: '"Eso es todo" — a clean way to finish your order.', next: 'resp3b' },
      ]},
      { id: 'resp3a', speaker: 0, spanish: '¡Excelente! Son dos euros con cincuenta. ¿Paga con tarjeta o en efectivo?', english: 'Excellent! That\'s two euros fifty. Card or cash?', next: 'choice4' },
      { id: 'resp3b', speaker: 0, spanish: 'Muy bien. Son uno con ochenta. ¿Paga con tarjeta o en efectivo?', english: 'Very well. That\'s one eighty. Card or cash?', next: 'choice4' },
      { id: 'choice4', speaker: 1, choices: [
        { spanish: 'Con tarjeta, por favor.', english: 'Card, please.', feedback: '"Con tarjeta" — card payments are common everywhere now!', next: 'end1' },
        { spanish: 'En efectivo. Aquí tiene.', english: 'Cash. Here you go.', feedback: '"Aquí tiene" literally means "here you have" — used when handing something over.', next: 'end1' },
      ]},
      { id: 'end1', speaker: 0, spanish: '¡Gracias! Su pedido estará listo en un momento. ¡Que lo disfrute!', english: 'Thanks! Your order will be ready in a moment. Enjoy!' },
    ],
    vocab: [
      { word: 'café con leche', english: 'coffee with milk' },
      { word: 'café solo', english: 'black coffee (espresso)' },
      { word: 'para llevar', english: 'to go / takeout' },
      { word: 'churros', english: 'churros (fried dough pastry)' },
      { word: 'en efectivo', english: 'in cash' },
      { word: 'tarjeta', english: 'card' },
      { word: 'recomendar', english: 'to recommend' },
    ]
  },

  // ════════════════════════════════════════
  // 2. A2: AT THE MARKET
  // ════════════════════════════════════════
  {
    id: 'bd-2',
    title: 'En el mercado',
    titleEn: 'At the market',
    icon: '\uD83C\uDF4E',
    level: 'A2',
    desc: 'Buy fruit, ask prices, and bargain',
    speakers: [
      { name: 'Vendedor', role: 'npc' },
      { name: 'Tú', role: 'player' }
    ],
    nodes: [
      { id: 'start', speaker: 0, spanish: '¡Buenos días! Tenemos frutas muy frescas hoy. ¿Qué le gustaría?', english: 'Good morning! We have very fresh fruit today. What would you like?', next: 'choice1' },
      { id: 'choice1', speaker: 1, choices: [
        { spanish: '¿Cuánto cuestan las naranjas?', english: 'How much do the oranges cost?', feedback: '"¿Cuánto cuestan?" is essential for market shopping. Use "cuestan" (plural) for multiple items.', next: 'resp1a' },
        { spanish: 'Quiero medio kilo de fresas, por favor.', english: 'I want half a kilo of strawberries, please.', feedback: '"Medio kilo" — in Spain and Latin America, produce is sold by the kilo!', next: 'resp1b' },
        { spanish: '¿Qué tiene de temporada?', english: 'What do you have in season?', feedback: '"De temporada" means "in season" — a smart question that shows market savvy!', next: 'resp1c' },
      ]},
      { id: 'resp1a', speaker: 0, spanish: 'Las naranjas están a dos euros el kilo. Son de Valencia, muy dulces.', english: 'The oranges are two euros per kilo. They\'re from Valencia, very sweet.', next: 'choice2a' },
      { id: 'choice2a', speaker: 1, choices: [
        { spanish: 'Deme un kilo, por favor.', english: 'Give me one kilo, please.', feedback: '"Deme" is the formal command of "dar" (to give) — very natural at markets.', next: 'resp2' },
        { spanish: '¿No puede hacer un mejor precio? Llevo dos kilos.', english: 'Can\'t you give a better price? I\'ll take two kilos.', feedback: 'Bargaining! "¿No puede hacer un mejor precio?" is a polite way to haggle.', next: 'resp2bargain' },
      ]},
      { id: 'resp1b', speaker: 0, spanish: 'Aquí tiene. ¿Quiere algo más? Las mangos también están muy buenos.', english: 'Here you go. Want anything else? The mangoes are also very good.', next: 'choice2b' },
      { id: 'choice2b', speaker: 1, choices: [
        { spanish: 'Sí, póngame dos mangos también.', english: 'Yes, put me two mangoes as well.', feedback: '"Póngame" (put me) is commonly used at markets — "póngame dos de esos" (put me two of those).', next: 'resp2' },
        { spanish: '¿Están maduros?', english: 'Are they ripe?', feedback: '"Maduros" means ripe — important when buying fruit!', next: 'resp2mango' },
      ]},
      { id: 'resp1c', speaker: 0, spanish: 'Ahora tenemos sandías, melocotones y cerezas. Todo recién llegado.', english: 'Right now we have watermelons, peaches, and cherries. All just arrived.', next: 'choice2c' },
      { id: 'choice2c', speaker: 1, choices: [
        { spanish: 'Deme un kilo de melocotones y medio de cerezas.', english: 'Give me a kilo of peaches and half of cherries.', feedback: 'Great ordering! You can omit "kilo" the second time — it\'s understood.', next: 'resp2' },
        { spanish: '¿Puedo probar una cereza?', english: 'Can I try a cherry?', feedback: '"¿Puedo probar?" (Can I try?) — it\'s common to taste samples at markets!', next: 'resp2taste' },
      ]},
      { id: 'resp2bargain', speaker: 0, spanish: 'Bueno, por dos kilos se los dejo a tres euros con cincuenta. Es buen precio.', english: 'Well, for two kilos I\'ll leave them at three fifty. It\'s a good price.', next: 'choice3' },
      { id: 'resp2mango', speaker: 0, spanish: 'Sí, están perfectos para comer hoy. Mire, toque este.', english: 'Yes, they\'re perfect to eat today. Look, touch this one.', next: 'choice3mango' },
      { id: 'choice3mango', speaker: 1, choices: [
        { spanish: 'Perfecto, me llevo dos.', english: 'Perfect, I\'ll take two.', feedback: '"Me llevo" (I\'ll take) is the standard way to say you\'re buying something.', next: 'resp2' },
        { spanish: 'Mejor déjelo, gracias.', english: 'Better leave it, thanks.', feedback: '"Mejor déjelo" is a polite way to decline. No pressure at good markets!', next: 'resp2' },
      ]},
      { id: 'resp2taste', speaker: 0, spanish: '¡Claro! Tome, pruebe. Están dulcísimas este año.', english: 'Of course! Here, try. They\'re super sweet this year.', next: 'choice3taste' },
      { id: 'choice3taste', speaker: 1, choices: [
        { spanish: '¡Riquísimas! Deme un kilo.', english: 'Delicious! Give me a kilo.', feedback: '"Riquísimas" — the superlative form! Adding "-ísimo/a" intensifies any adjective.', next: 'resp2' },
        { spanish: 'Están buenas, pero hoy solo llevo melocotones.', english: 'They\'re good, but today I\'ll just take peaches.', feedback: 'Polite and decisive — "solo llevo" (I\'m just taking) keeps it simple.', next: 'resp2' },
      ]},
      { id: 'resp2', speaker: 0, spanish: '¿Algo más? También tenemos verduras frescas.', english: 'Anything else? We also have fresh vegetables.', next: 'choice3' },
      { id: 'choice3', speaker: 1, choices: [
        { spanish: 'No, eso es todo. ¿Cuánto es en total?', english: 'No, that\'s all. How much is it in total?', feedback: '"¿Cuánto es en total?" — essential market phrase!', next: 'end1' },
        { spanish: '¿Tiene tomates de la zona?', english: 'Do you have local tomatoes?', feedback: '"De la zona" means local/from the area — shows you value local produce!', next: 'resp3local' },
      ]},
      { id: 'resp3local', speaker: 0, spanish: 'Sí, estos son de aquí. Están a uno con cincuenta el kilo.', english: 'Yes, these are from here. They\'re one fifty per kilo.', next: 'choice4local' },
      { id: 'choice4local', speaker: 1, choices: [
        { spanish: 'Perfecto, deme un kilo. Eso es todo.', english: 'Perfect, give me a kilo. That\'s all.', feedback: 'Nice addition to your bag! Local tomatoes in Spain are incredible.', next: 'end1' },
      ]},
      { id: 'end1', speaker: 0, spanish: 'Muy bien. Son cinco euros con veinte. ¡Muchas gracias y que tenga buen día!', english: 'Very well. That\'s five euros twenty. Thank you very much and have a nice day!' },
    ],
    vocab: [
      { word: '¿cuánto cuesta?', english: 'how much does it cost?' },
      { word: 'medio kilo', english: 'half a kilo' },
      { word: 'de temporada', english: 'in season' },
      { word: 'maduro', english: 'ripe' },
      { word: 'probar', english: 'to try / to taste' },
      { word: 'me llevo', english: 'I\'ll take (buying)' },
      { word: 'verduras', english: 'vegetables' },
    ]
  },

  // ════════════════════════════════════════
  // 3. B1: JOB INTERVIEW
  // ════════════════════════════════════════
  {
    id: 'bd-3',
    title: 'Entrevista de trabajo',
    titleEn: 'Job interview',
    icon: '\uD83D\uDCBC',
    level: 'B1',
    desc: 'Answer questions about experience and ask about the role',
    speakers: [
      { name: 'Entrevistadora', role: 'npc' },
      { name: 'Tú', role: 'player' }
    ],
    nodes: [
      { id: 'start', speaker: 0, spanish: 'Buenos días. Siéntese, por favor. Gracias por venir. Cuénteme un poco sobre usted.', english: 'Good morning. Please sit down. Thank you for coming. Tell me a little about yourself.', next: 'choice1' },
      { id: 'choice1', speaker: 1, choices: [
        { spanish: 'Tengo cinco años de experiencia en marketing digital y me apasiona la comunicación creativa.', english: 'I have five years of experience in digital marketing and I\'m passionate about creative communication.', feedback: 'Excellent! You used "me apasiona" — a strong way to express passion professionally.', next: 'resp1a' },
        { spanish: 'Soy recién graduado, pero hice prácticas en una empresa similar durante seis meses.', english: 'I\'m a recent graduate, but I did an internship at a similar company for six months.', feedback: '"Recién graduado" and "hacer prácticas" are key job-hunting vocabulary!', next: 'resp1b' },
        { spanish: 'Trabajo actualmente en ventas, pero busco un cambio hacia gestión de proyectos.', english: 'I currently work in sales, but I\'m looking for a change towards project management.', feedback: '"Busco un cambio" — clearly expressing career goals shows self-awareness.', next: 'resp1c' },
      ]},
      { id: 'resp1a', speaker: 0, spanish: 'Interesante. ¿Por qué quiere cambiar de empresa?', english: 'Interesting. Why do you want to change companies?', next: 'choice2' },
      { id: 'resp1b', speaker: 0, spanish: 'Bien. Las prácticas son muy valiosas. ¿Qué aprendió durante esa experiencia?', english: 'Good. Internships are very valuable. What did you learn during that experience?', next: 'choice2b' },
      { id: 'resp1c', speaker: 0, spanish: 'Entiendo. ¿Qué habilidades de ventas cree que son útiles para la gestión de proyectos?', english: 'I understand. What sales skills do you think are useful for project management?', next: 'choice2c' },
      { id: 'choice2', speaker: 1, choices: [
        { spanish: 'Busco nuevos desafíos y oportunidades de crecimiento profesional.', english: 'I\'m looking for new challenges and opportunities for professional growth.', feedback: '"Desafíos" and "crecimiento profesional" — polished interview vocabulary!', next: 'resp2' },
        { spanish: 'Me interesa mucho el sector en el que trabaja su empresa.', english: 'I\'m very interested in the sector your company works in.', feedback: '"Me interesa" shows genuine interest without being over-the-top.', next: 'resp2' },
      ]},
      { id: 'choice2b', speaker: 1, choices: [
        { spanish: 'Aprendí a trabajar en equipo y a gestionar plazos ajustados.', english: 'I learned to work in a team and manage tight deadlines.', feedback: '"Plazos ajustados" (tight deadlines) — great professional vocabulary!', next: 'resp2' },
        { spanish: 'Desarrollé habilidades en análisis de datos y presentaciones.', english: 'I developed skills in data analysis and presentations.', feedback: '"Desarrollé habilidades" — perfect way to describe skills gained during an internship.', next: 'resp2' },
      ]},
      { id: 'choice2c', speaker: 1, choices: [
        { spanish: 'La comunicación con clientes y la negociación son fundamentales en ambos campos.', english: 'Client communication and negotiation are fundamental in both fields.', feedback: 'Excellent connection! Showing transferable skills is key in career changes.', next: 'resp2' },
        { spanish: 'En ventas aprendí a priorizar tareas y cumplir objetivos bajo presión.', english: 'In sales I learned to prioritize tasks and meet objectives under pressure.', feedback: '"Cumplir objetivos bajo presión" — demonstrates resilience and results orientation.', next: 'resp2' },
      ]},
      { id: 'resp2', speaker: 0, spanish: 'Muy bien. ¿Cuál considera que es su mayor fortaleza?', english: 'Very well. What do you consider to be your greatest strength?', next: 'choice3' },
      { id: 'choice3', speaker: 1, choices: [
        { spanish: 'Soy muy organizado y me adapto fácilmente a los cambios.', english: 'I\'m very organized and I adapt easily to changes.', feedback: '"Adaptarse a los cambios" — flexibility is highly valued in modern workplaces!', next: 'resp3' },
        { spanish: 'Tengo facilidad para resolver problemas y trabajar bajo presión.', english: 'I have a knack for solving problems and working under pressure.', feedback: '"Tener facilidad para" means having a natural ability for something — elegant phrasing!', next: 'resp3' },
      ]},
      { id: 'resp3', speaker: 0, spanish: 'Perfecto. ¿Tiene alguna pregunta sobre el puesto?', english: 'Perfect. Do you have any questions about the position?', next: 'choice4' },
      { id: 'choice4', speaker: 1, choices: [
        { spanish: '¿Cómo es un día típico en este puesto?', english: 'What is a typical day like in this position?', feedback: 'Smart question! It shows genuine interest in the daily reality of the job.', next: 'end1' },
        { spanish: '¿Hay oportunidades de formación y desarrollo profesional?', english: 'Are there training and professional development opportunities?', feedback: '"Formación y desarrollo profesional" — shows you think long-term about your career.', next: 'end1' },
        { spanish: '¿Cuándo podrían darme una respuesta?', english: 'When could you give me an answer?', feedback: '"¿Cuándo podrían...?" uses the conditional — polite and professional.', next: 'end1' },
      ]},
      { id: 'end1', speaker: 0, spanish: 'Buena pregunta. Le informaremos la próxima semana. Ha sido un placer conocerle. ¡Mucha suerte!', english: 'Good question. We\'ll inform you next week. It\'s been a pleasure meeting you. Good luck!' },
    ],
    vocab: [
      { word: 'entrevista de trabajo', english: 'job interview' },
      { word: 'experiencia', english: 'experience' },
      { word: 'habilidades', english: 'skills' },
      { word: 'fortaleza', english: 'strength' },
      { word: 'crecimiento profesional', english: 'professional growth' },
      { word: 'el puesto', english: 'the position / the job' },
      { word: 'formación', english: 'training' },
    ]
  },

  // ════════════════════════════════════════
  // 4. B1: DOCTOR'S VISIT
  // ════════════════════════════════════════
  {
    id: 'bd-4',
    title: 'En el consultorio médico',
    titleEn: "Doctor's visit",
    icon: '\uD83C\uDFE5',
    level: 'B1',
    desc: 'Describe symptoms and understand instructions',
    speakers: [
      { name: 'Doctora', role: 'npc' },
      { name: 'Tú', role: 'player' }
    ],
    nodes: [
      { id: 'start', speaker: 0, spanish: 'Buenos días. Soy la doctora Martínez. ¿Qué le trae por aquí hoy?', english: 'Good morning. I\'m Dr. Martínez. What brings you here today?', next: 'choice1' },
      { id: 'choice1', speaker: 1, choices: [
        { spanish: 'Me duele mucho la garganta y tengo fiebre desde ayer.', english: 'My throat hurts a lot and I\'ve had a fever since yesterday.', feedback: '"Me duele" + body part is the key structure for expressing pain. "Desde ayer" adds important timeline info.', next: 'resp1a' },
        { spanish: 'Llevo tres días con dolor de cabeza y mareos.', english: 'I\'ve had a headache and dizziness for three days.', feedback: '"Llevo + time + con" is a natural way to express duration of symptoms. Very native-sounding!', next: 'resp1b' },
        { spanish: 'Me caí y me duele mucho la muñeca. No puedo moverla bien.', english: 'I fell and my wrist hurts a lot. I can\'t move it well.', feedback: 'Clear description of an injury! "No puedo + infinitive" explains your limitations.', next: 'resp1c' },
      ]},
      { id: 'resp1a', speaker: 0, spanish: 'Vamos a ver. Abra la boca, por favor. Hmm, tiene la garganta muy inflamada. ¿Ha tenido tos?', english: 'Let\'s see. Open your mouth, please. Hmm, your throat is very inflamed. Have you had a cough?', next: 'choice2a' },
      { id: 'choice2a', speaker: 1, choices: [
        { spanish: 'Sí, especialmente por la noche. No puedo dormir bien.', english: 'Yes, especially at night. I can\'t sleep well.', feedback: '"Especialmente por la noche" — adding when symptoms worsen helps the doctor diagnose.', next: 'resp2throat' },
        { spanish: 'Un poco, pero lo que más me molesta es el dolor al tragar.', english: 'A little, but what bothers me most is the pain when swallowing.', feedback: '"Lo que más me molesta" (what bothers me most) — excellent for prioritizing symptoms!', next: 'resp2throat' },
      ]},
      { id: 'resp1b', speaker: 0, spanish: 'Entiendo. ¿El dolor es constante o va y viene? ¿Dónde exactamente le duele?', english: 'I understand. Is the pain constant or does it come and go? Where exactly does it hurt?', next: 'choice2b' },
      { id: 'choice2b', speaker: 1, choices: [
        { spanish: 'Es un dolor constante aquí, en la frente. Y me siento muy cansado.', english: 'It\'s a constant pain here, in the forehead. And I feel very tired.', feedback: '"Dolor constante" vs "dolor que va y viene" — knowing these phrases helps describe symptoms precisely.', next: 'resp2head' },
        { spanish: 'Va y viene, pero los mareos son peores por la mañana.', english: 'It comes and goes, but the dizziness is worse in the morning.', feedback: '"Va y viene" is a common idiomatic expression for intermittent symptoms.', next: 'resp2head' },
      ]},
      { id: 'resp1c', speaker: 0, spanish: 'Déjeme examinar. ¿Puede mover los dedos? ¿Hay hinchazón?', english: 'Let me examine. Can you move your fingers? Is there swelling?', next: 'choice2c' },
      { id: 'choice2c', speaker: 1, choices: [
        { spanish: 'Los dedos sí puedo moverlos, pero la muñeca está hinchada.', english: 'I can move my fingers, but my wrist is swollen.', feedback: 'Good detail! "Hinchado/a" (swollen) is essential medical vocabulary.', next: 'resp2wrist' },
        { spanish: 'Me duele mucho cuando intento girar la mano.', english: 'It hurts a lot when I try to turn my hand.', feedback: '"Cuando intento + infinitive" — describes pain triggers clearly.', next: 'resp2wrist' },
      ]},
      { id: 'resp2throat', speaker: 0, spanish: 'Parece una faringitis. Le voy a recetar un antibiótico. Tome una pastilla cada ocho horas durante siete días.', english: 'It looks like pharyngitis. I\'m going to prescribe an antibiotic. Take one pill every eight hours for seven days.', next: 'choice3' },
      { id: 'resp2head', speaker: 0, spanish: 'Voy a tomarle la tensión. También le pediré unos análisis de sangre. Mientras tanto, descanse y beba mucha agua.', english: 'I\'m going to take your blood pressure. I\'ll also order some blood tests. Meanwhile, rest and drink a lot of water.', next: 'choice3' },
      { id: 'resp2wrist', speaker: 0, spanish: 'Necesitamos una radiografía para descartar una fractura. Mientras tanto, no mueva la muñeca y póngase hielo.', english: 'We need an X-ray to rule out a fracture. Meanwhile, don\'t move your wrist and apply ice.', next: 'choice3' },
      { id: 'choice3', speaker: 1, choices: [
        { spanish: '¿Tiene algún efecto secundario la medicina?', english: 'Does the medicine have any side effects?', feedback: '"Efectos secundarios" (side effects) — important to ask about with any prescription!', next: 'end1' },
        { spanish: '¿Necesito volver para otra consulta?', english: 'Do I need to come back for another appointment?', feedback: '"Otra consulta" (another appointment) — responsible follow-up question!', next: 'end1' },
      ]},
      { id: 'end1', speaker: 0, spanish: 'Si no mejora en una semana, vuelva a verme. Aquí tiene la receta. ¡Cuídese mucho!', english: 'If you don\'t improve in a week, come back to see me. Here is the prescription. Take good care of yourself!' },
    ],
    vocab: [
      { word: 'me duele', english: 'it hurts me' },
      { word: 'la garganta', english: 'the throat' },
      { word: 'fiebre', english: 'fever' },
      { word: 'mareos', english: 'dizziness' },
      { word: 'recetar', english: 'to prescribe' },
      { word: 'radiografía', english: 'X-ray' },
      { word: 'efectos secundarios', english: 'side effects' },
    ]
  },

  // ════════════════════════════════════════
  // 5. B2: APARTMENT HUNTING
  // ════════════════════════════════════════
  {
    id: 'bd-5',
    title: 'Buscando piso',
    titleEn: 'Apartment hunting',
    icon: '\uD83C\uDFE0',
    level: 'B2',
    desc: 'Discuss terms, negotiate rent, ask about the neighborhood',
    speakers: [
      { name: 'Propietario', role: 'npc' },
      { name: 'Tú', role: 'player' }
    ],
    nodes: [
      { id: 'start', speaker: 0, spanish: 'Buenas tardes. Pase, le enseño el piso. Tiene dos habitaciones, un baño y una cocina americana. ¿Qué le parece?', english: 'Good afternoon. Come in, I\'ll show you the apartment. It has two bedrooms, one bathroom, and an open kitchen. What do you think?', next: 'choice1' },
      { id: 'choice1', speaker: 1, choices: [
        { spanish: 'Es bastante luminoso. ¿Cuánto es el alquiler mensual?', english: 'It\'s quite bright. How much is the monthly rent?', feedback: '"Alquiler mensual" — essential vocabulary for apartment hunting. "Luminoso" shows you notice qualities!', next: 'resp1a' },
        { spanish: 'Me gusta la distribución. ¿Están incluidos los gastos de comunidad?', english: 'I like the layout. Are the community fees included?', feedback: '"Gastos de comunidad" (HOA/community fees) — very savvy question that shows you know how renting works in Spain!', next: 'resp1b' },
        { spanish: 'Está bien, pero me preocupa el ruido. ¿La zona es tranquila?', english: 'It\'s nice, but I\'m worried about noise. Is the area quiet?', feedback: '"Me preocupa" (I\'m worried about) — perfect for expressing concerns diplomatically.', next: 'resp1c' },
      ]},
      { id: 'resp1a', speaker: 0, spanish: 'El alquiler es de novecientos euros al mes, más gastos. Se pide un mes de fianza.', english: 'The rent is nine hundred euros per month, plus expenses. One month\'s deposit is required.', next: 'choice2' },
      { id: 'resp1b', speaker: 0, spanish: 'Los gastos de comunidad son ochenta euros y no están incluidos en el alquiler de novecientos. Pero el agua sí está incluida.', english: 'The community fees are eighty euros and are not included in the nine hundred rent. But water is included.', next: 'choice2' },
      { id: 'resp1c', speaker: 0, spanish: 'Es una zona residencial muy tranquila. No hay bares cerca. El alquiler es novecientos euros al mes.', english: 'It\'s a very quiet residential area. There are no bars nearby. The rent is nine hundred euros per month.', next: 'choice2' },
      { id: 'choice2', speaker: 1, choices: [
        { spanish: 'Novecientos me parece un poco alto. ¿Habría posibilidad de negociar el precio si firmo por un año?', english: 'Nine hundred seems a bit high to me. Would there be a possibility of negotiating the price if I sign for a year?', feedback: '"¿Habría posibilidad de...?" uses the conditional — very diplomatic for negotiations!', next: 'resp2a' },
        { spanish: 'Entiendo. ¿El piso tiene calefacción central o individual?', english: 'I see. Does the apartment have central or individual heating?', feedback: '"Calefacción central/individual" — knowing utility terminology avoids costly surprises!', next: 'resp2b' },
      ]},
      { id: 'resp2a', speaker: 0, spanish: 'Bueno, si firma un contrato de un año, podría dejárselo en ochocientos cincuenta. Es lo mínimo.', english: 'Well, if you sign a one-year contract, I could let you have it for eight hundred fifty. That\'s the minimum.', next: 'choice3' },
      { id: 'resp2b', speaker: 0, spanish: 'Es calefacción individual de gas natural. Así controla su propio consumo. En invierno suele ser unos setenta euros al mes.', english: 'It\'s individual natural gas heating. So you control your own consumption. In winter it\'s usually about seventy euros per month.', next: 'choice3' },
      { id: 'choice3', speaker: 1, choices: [
        { spanish: '¿Cómo es la comunicación con el transporte público? Necesito llegar al centro fácilmente.', english: 'How is the public transport connection? I need to get to the center easily.', feedback: '"Comunicación con el transporte público" — practical question showing long-term thinking.', next: 'resp3' },
        { spanish: '¿Se permite tener mascotas? Tengo un gato.', english: 'Are pets allowed? I have a cat.', feedback: '"¿Se permite...?" (Is it allowed?) — the passive "se" construction is very formal and appropriate here.', next: 'resp3pet' },
      ]},
      { id: 'resp3', speaker: 0, spanish: 'La parada de metro está a cinco minutos andando y hay tres líneas de autobús. Es muy bien comunicado.', english: 'The metro stop is a five-minute walk and there are three bus lines. It\'s very well connected.', next: 'choice4' },
      { id: 'resp3pet', speaker: 0, spanish: 'Sí, se admiten mascotas pequeñas. Solo pido que mantenga el piso en buen estado. La parada de metro está a cinco minutos.', english: 'Yes, small pets are allowed. I just ask that you keep the apartment in good condition. The metro stop is five minutes away.', next: 'choice4' },
      { id: 'choice4', speaker: 1, choices: [
        { spanish: 'Me interesa mucho. ¿Cuándo podría mudarme?', english: 'I\'m very interested. When could I move in?', feedback: '"Mudarme" (to move in) — essential verb for housing conversations!', next: 'end1' },
        { spanish: 'Necesito pensarlo. ¿Puedo confirmarle antes del viernes?', english: 'I need to think about it. Can I confirm with you before Friday?', feedback: '"Necesito pensarlo" is honest and professional — never rush big decisions!', next: 'end1think' },
      ]},
      { id: 'end1', speaker: 0, spanish: '¡Estupendo! Podría entrar el primero del mes que viene. Tráigame los documentos y firmamos el contrato.', english: 'Great! You could move in on the first of next month. Bring me the documents and we\'ll sign the contract.' },
      { id: 'end1think', speaker: 0, spanish: 'Por supuesto, tómese su tiempo. Pero le aviso que hay otros interesados. Mi número está en el anuncio. ¡Hasta luego!', english: 'Of course, take your time. But I should let you know there are other interested parties. My number is on the listing. See you later!' },
    ],
    vocab: [
      { word: 'alquiler', english: 'rent' },
      { word: 'fianza', english: 'deposit' },
      { word: 'gastos de comunidad', english: 'community/HOA fees' },
      { word: 'calefacción', english: 'heating' },
      { word: 'mudarse', english: 'to move (house)' },
      { word: 'contrato', english: 'contract' },
      { word: 'propietario', english: 'owner / landlord' },
    ]
  },

  // ════════════════════════════════════════
  // 6. B2: RESOLVING A COMPLAINT
  // ════════════════════════════════════════
  {
    id: 'bd-6',
    title: 'Devolviendo un producto',
    titleEn: 'Resolving a complaint',
    icon: '\uD83D\uDED2',
    level: 'B2',
    desc: 'Return a product at a store and explain the problem',
    speakers: [
      { name: 'Dependiente', role: 'npc' },
      { name: 'Tú', role: 'player' }
    ],
    nodes: [
      { id: 'start', speaker: 0, spanish: 'Buenas tardes. ¿En qué puedo ayudarle?', english: 'Good afternoon. How can I help you?', next: 'choice1' },
      { id: 'choice1', speaker: 1, choices: [
        { spanish: 'Compré este portátil hace una semana y la pantalla tiene un defecto. Me gustaría devolverlo.', english: 'I bought this laptop a week ago and the screen has a defect. I\'d like to return it.', feedback: '"Me gustaría" (I would like) is much more polite than "quiero" for complaints. Professional tone!', next: 'resp1a' },
        { spanish: 'Quiero hacer una reclamación. Este producto no funciona como debería.', english: 'I want to file a complaint. This product doesn\'t work as it should.', feedback: '"Hacer una reclamación" (file a complaint) — the formal term. "Como debería" (as it should) is subjunctive!', next: 'resp1b' },
        { spanish: 'Perdone, compré esto en línea y me llegó dañado. ¿Puedo hacer un cambio aquí?', english: 'Excuse me, I bought this online and it arrived damaged. Can I make an exchange here?', feedback: '"Me llegó dañado" — using indirect object pronouns makes this sound very natural.', next: 'resp1c' },
      ]},
      { id: 'resp1a', speaker: 0, spanish: '¿Tiene el recibo de compra y la caja original?', english: 'Do you have the receipt and the original box?', next: 'choice2a' },
      { id: 'choice2a', speaker: 1, choices: [
        { spanish: 'Sí, aquí tiene todo. También conservo la garantía.', english: 'Yes, here is everything. I also kept the warranty.', feedback: '"Conservar la garantía" — always a good idea! "Garantía" is your best friend for returns.', next: 'resp2' },
        { spanish: 'Tengo el recibo pero no la caja. ¿Es un problema?', english: 'I have the receipt but not the box. Is that a problem?', feedback: 'Honest and direct — important to be upfront about what you have and don\'t have.', next: 'resp2nobox' },
      ]},
      { id: 'resp1b', speaker: 0, spanish: 'Lamento mucho las molestias. ¿Podría explicarme exactamente cuál es el problema?', english: 'I\'m very sorry for the inconvenience. Could you explain exactly what the problem is?', next: 'choice2b' },
      { id: 'choice2b', speaker: 1, choices: [
        { spanish: 'La batería no dura ni dos horas y el vendedor me aseguró que duraría ocho.', english: 'The battery doesn\'t even last two hours and the salesperson assured me it would last eight.', feedback: '"El vendedor me aseguró que..." — using the reported speech structure clearly conveys the issue.', next: 'resp2' },
        { spanish: 'El producto vino incompleto. Faltan piezas que aparecen en la descripción.', english: 'The product came incomplete. There are missing pieces that appear in the description.', feedback: '"Vino incompleto" and "faltan piezas" — precise complaint vocabulary!', next: 'resp2' },
      ]},
      { id: 'resp1c', speaker: 0, spanish: 'Sí, puede hacer el cambio en tienda. ¿Tiene el número de pedido?', english: 'Yes, you can make the exchange in store. Do you have the order number?', next: 'choice2c' },
      { id: 'choice2c', speaker: 1, choices: [
        { spanish: 'Sí, aquí lo tengo en el correo de confirmación.', english: 'Yes, I have it here in the confirmation email.', feedback: '"Correo de confirmación" — good to have digital records ready for exchanges!', next: 'resp2' },
        { spanish: 'Creo que sí. Déjeme buscarlo en mi teléfono.', english: 'I think so. Let me look for it on my phone.', feedback: '"Déjeme buscarlo" — a natural, polite way to ask for a moment.', next: 'resp2' },
      ]},
      { id: 'resp2nobox', speaker: 0, spanish: 'Sin la caja original, no podemos hacer una devolución completa, pero sí podemos ofrecerle una tarjeta de regalo por el valor del producto.', english: 'Without the original box, we can\'t do a full return, but we can offer you a gift card for the product\'s value.', next: 'choice3alt' },
      { id: 'choice3alt', speaker: 1, choices: [
        { spanish: 'Preferiría que me devuelvan el dinero. ¿No hay otra opción?', english: 'I would prefer a refund. Isn\'t there another option?', feedback: '"Preferiría que + subjunctive" — advanced grammar showing polite insistence!', next: 'resp3escalate' },
        { spanish: 'Está bien, acepto la tarjeta de regalo. ¿Por cuánto sería?', english: 'That\'s fine, I\'ll accept the gift card. How much would it be for?', feedback: 'Sometimes compromise is the best approach! "¿Por cuánto sería?" ensures clarity.', next: 'end1' },
      ]},
      { id: 'resp3escalate', speaker: 0, spanish: 'Déjeme consultar con el gerente. Un momento, por favor.', english: 'Let me check with the manager. One moment, please.', next: 'resp3manager' },
      { id: 'resp3manager', speaker: 0, spanish: 'El gerente dice que, dado que el producto tiene un defecto, podemos hacer una excepción y devolverle el dinero.', english: 'The manager says that, given the product has a defect, we can make an exception and give you a refund.', next: 'choice4' },
      { id: 'resp2', speaker: 0, spanish: 'Perfecto. Puedo ofrecerle tres opciones: devolución completa, cambio por otro producto, o reparación en garantía.', english: 'Perfect. I can offer you three options: full return, exchange for another product, or warranty repair.', next: 'choice3' },
      { id: 'choice3', speaker: 1, choices: [
        { spanish: 'Prefiero la devolución completa. No quiero arriesgarme a tener el mismo problema.', english: 'I prefer a full return. I don\'t want to risk having the same problem.', feedback: '"Arriesgarme a" (to risk) — expresses caution. Smart consumer choice!', next: 'choice4' },
        { spanish: '¿Podrían cambiármelo por otro modelo? Este me gustaba pero el defecto es inaceptable.', english: 'Could you exchange it for another model? I liked this one but the defect is unacceptable.', feedback: '"Cambiármelo" combines the indirect and direct object pronouns — advanced but natural!', next: 'choice4' },
      ]},
      { id: 'choice4', speaker: 1, choices: [
        { spanish: 'Muchas gracias por la solución. ¿Cuánto tardarán en procesarlo?', english: 'Thank you very much for the solution. How long will it take to process?', feedback: '"¿Cuánto tardarán en + infinitive?" — perfect for asking about processing time.', next: 'end1' },
        { spanish: '¿Me podrían dar un comprobante de la devolución por escrito?', english: 'Could you give me a written receipt of the return?', feedback: '"Comprobante por escrito" — always get things in writing! Wise consumer habit.', next: 'end1' },
      ]},
      { id: 'end1', speaker: 0, spanish: 'Por supuesto. Aquí tiene su comprobante. Lamento las molestias. Esperamos verle de nuevo. ¡Que tenga buen día!', english: 'Of course. Here is your receipt. I apologize for the inconvenience. We hope to see you again. Have a good day!' },
    ],
    vocab: [
      { word: 'devolución', english: 'return (of product)' },
      { word: 'recibo', english: 'receipt' },
      { word: 'garantía', english: 'warranty' },
      { word: 'reclamación', english: 'complaint / claim' },
      { word: 'reembolso', english: 'refund' },
      { word: 'comprobante', english: 'proof / receipt' },
      { word: 'gerente', english: 'manager' },
    ]
  },

];
