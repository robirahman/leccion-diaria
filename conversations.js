// conversations.js - Spanish Dialogue Practice Database
// 21 role-play conversation scenarios for Spanish learners (A1-C2)

const CONVERSATIONS_DATA = [

  // ============================================================
  // 1. EN EL RESTAURANTE (A1)
  // ============================================================
  {
    id: 'restaurant-1',
    title: 'En el Restaurante',
    titleEn: 'At the Restaurant',
    icon: '\uD83C\uDF7D\uFE0F',
    desc: 'Order food and drinks at a Spanish restaurant',
    level: 'A1',
    speakers: [
      { name: 'Mesero', nameEn: 'Waiter', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: '\u00A1Buenas tardes! Bienvenido. \u00BFMesa para cu\u00E1ntos?', english: 'Good afternoon! Welcome. Table for how many?' },
      { speaker: 1, spanish: 'Para dos, por favor.', english: 'For two, please.' },
      { speaker: 0, spanish: 'Muy bien. S\u00EDganme, por favor. Aqu\u00ED tienen el men\u00FA.', english: 'Very well. Follow me, please. Here is the menu.' },
      { speaker: 1, spanish: 'Gracias. \u00BFQu\u00E9 me recomienda?', english: 'Thank you. What do you recommend?' },
      { speaker: 0, spanish: 'El plato del d\u00EDa es paella. Est\u00E1 muy rica.', english: 'The dish of the day is paella. It\u2019s very delicious.' },
      { speaker: 1, spanish: 'Perfecto. Quiero la paella, por favor.', english: 'Perfect. I\u2019d like the paella, please.' },
      { speaker: 0, spanish: '\u00BFY para beber?', english: 'And to drink?' },
      { speaker: 1, spanish: 'Un agua con gas y un vino tinto.', english: 'A sparkling water and a red wine.' },
      { speaker: 0, spanish: '\u00BFDesean alg\u00FAn postre?', english: 'Would you like any dessert?' },
      { speaker: 1, spanish: 'S\u00ED, el flan de la casa, por favor.', english: 'Yes, the house flan, please.' },
      { speaker: 0, spanish: 'En seguida se lo traigo. \u00BFAlgo m\u00E1s?', english: 'I\u2019ll bring it right away. Anything else?' },
      { speaker: 1, spanish: 'No, eso es todo. \u00BFMe puede traer la cuenta?', english: 'No, that\u2019s everything. Can you bring me the check?' },
    ],
    vocab: [
      { word: 'mesero', english: 'waiter' },
      { word: 'men\u00FA', english: 'menu' },
      { word: 'recomendar', english: 'to recommend' },
      { word: 'plato del d\u00EDa', english: 'dish of the day' },
      { word: 'la cuenta', english: 'the check / the bill' },
      { word: 'postre', english: 'dessert' },
      { word: 'beber', english: 'to drink' },
    ],
    quiz: [
      { prompt: 'How do you say "table for two" in Spanish?', options: ['Mesa para dos', 'Dos mesas', 'Tabla para dos', 'Asiento para dos'], correct: 0 , explanation: "\"Mesa\" means table (furniture), while \"tabla\" means board or plank. In restaurants, you always use \"mesa para\" followed by the number of guests to request seating." },
      { prompt: 'What does "\u00BFY para beber?" mean?', options: ['And to eat?', 'And to drink?', 'And for dessert?', 'And for later?'], correct: 1 , explanation: "\"Beber\" is the Spanish verb meaning \"to drink.\" Waiters commonly ask this after taking your food order to find out what beverages you would like." },
      { prompt: 'How do you ask for the check?', options: ['La mesa, por favor', 'El men\u00FA, por favor', 'La cuenta, por favor', 'El dinero, por favor'], correct: 2 , explanation: "\"La cuenta\" literally means \"the account\" and is the standard way to request the bill in Spanish-speaking restaurants. Saying \"el dinero\" (the money) would be too blunt and unnatural." },
    ],
  },

  // ============================================================
  // 2. EN EL HOTEL (A1)
  // ============================================================
  {
    id: 'hotel-1',
    title: 'En el Hotel',
    titleEn: 'At the Hotel',
    icon: '\uD83C\uDFE8',
    desc: 'Check into a hotel and ask about amenities',
    level: 'A1',
    speakers: [
      { name: 'Recepcionista', nameEn: 'Receptionist', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: '\u00A1Buenas noches! Bienvenido al Hotel Sol. \u00BFEn qu\u00E9 puedo ayudarle?', english: 'Good evening! Welcome to Hotel Sol. How can I help you?' },
      { speaker: 1, spanish: 'Buenas noches. Tengo una reservaci\u00F3n a nombre de Garc\u00EDa.', english: 'Good evening. I have a reservation under the name Garc\u00EDa.' },
      { speaker: 0, spanish: 'D\u00E9jeme verificar. S\u00ED, una habitaci\u00F3n doble por tres noches. \u00BFCorrecto?', english: 'Let me check. Yes, a double room for three nights. Correct?' },
      { speaker: 1, spanish: 'S\u00ED, correcto. \u00BFLa habitaci\u00F3n tiene vista al mar?', english: 'Yes, correct. Does the room have a sea view?' },
      { speaker: 0, spanish: 'S\u00ED, est\u00E1 en el quinto piso con una vista hermosa.', english: 'Yes, it\u2019s on the fifth floor with a beautiful view.' },
      { speaker: 1, spanish: '\u00BFA qu\u00E9 hora es el desayuno?', english: 'What time is breakfast?' },
      { speaker: 0, spanish: 'El desayuno es de siete a diez de la ma\u00F1ana en el primer piso.', english: 'Breakfast is from seven to ten in the morning on the first floor.' },
      { speaker: 1, spanish: '\u00BFHay wifi gratuito?', english: 'Is there free wifi?' },
      { speaker: 0, spanish: 'S\u00ED, la contrase\u00F1a est\u00E1 en la tarjeta de la habitaci\u00F3n.', english: 'Yes, the password is on the room card.' },
      { speaker: 1, spanish: 'Perfecto. \u00BFD\u00F3nde est\u00E1 el ascensor?', english: 'Perfect. Where is the elevator?' },
      { speaker: 0, spanish: 'Al fondo del pasillo, a la derecha. Aqu\u00ED tiene su llave.', english: 'At the end of the hallway, on the right. Here is your key.' },
      { speaker: 1, spanish: 'Muchas gracias. Muy amable.', english: 'Thank you very much. Very kind.' },
    ],
    vocab: [
      { word: 'reservaci\u00F3n', english: 'reservation' },
      { word: 'habitaci\u00F3n', english: 'room' },
      { word: 'desayuno', english: 'breakfast' },
      { word: 'ascensor', english: 'elevator' },
      { word: 'llave', english: 'key' },
      { word: 'piso', english: 'floor / story' },
      { word: 'contrase\u00F1a', english: 'password' },
    ],
    quiz: [
      { prompt: 'How do you say "I have a reservation" in Spanish?', options: ['Quiero una habitaci\u00F3n', 'Tengo una reservaci\u00F3n', 'Necesito un hotel', 'Busco una cama'], correct: 1 , explanation: "\"Tener una reservación\" uses the verb \"tener\" (to have) and is the standard phrase for confirming a booking at hotels, restaurants, or other venues." },
      { prompt: 'What does "habitaci\u00F3n doble" mean?', options: ['Single room', 'Double room', 'Suite', 'Shared room'], correct: 1 , explanation: "\"Habitación\" means room and \"doble\" means double, referring to a room with a double bed or two single beds. A single room would be \"habitación individual.\"" },
      { prompt: 'How do you ask "What time is breakfast?"', options: ['\u00BFD\u00F3nde es el desayuno?', '\u00BFCu\u00E1nto cuesta el desayuno?', '\u00BFA qu\u00E9 hora es el desayuno?', '\u00BFQu\u00E9 hay de desayuno?'], correct: 2 , explanation: "The construction \"¿A qué hora es...?\" is the standard way to ask about scheduled times in Spanish. \"¿Dónde\" asks where, and \"¿Cuánto cuesta\" asks about cost." },
    ],
  },

  // ============================================================
  // 3. EN LA TIENDA (A1)
  // ============================================================
  {
    id: 'tienda-1',
    title: 'En la Tienda',
    titleEn: 'At the Clothing Store',
    icon: '\uD83D\uDC57',
    desc: 'Shop for clothes and ask about sizes and prices',
    level: 'A1',
    speakers: [
      { name: 'Vendedora', nameEn: 'Saleswoman', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: '\u00A1Hola! \u00BFLe puedo ayudar en algo?', english: 'Hello! Can I help you with something?' },
      { speaker: 1, spanish: 'S\u00ED, estoy buscando una camisa.', english: 'Yes, I\u2019m looking for a shirt.' },
      { speaker: 0, spanish: '\u00BFDe qu\u00E9 color la busca?', english: 'What color are you looking for?' },
      { speaker: 1, spanish: 'Azul o blanca. \u00BFQu\u00E9 tallas tienen?', english: 'Blue or white. What sizes do you have?' },
      { speaker: 0, spanish: 'Tenemos todas las tallas. \u00BFCu\u00E1l es la suya?', english: 'We have all sizes. What\u2019s yours?' },
      { speaker: 1, spanish: 'Mediana. \u00BFPuedo probarme esta?', english: 'Medium. Can I try this one on?' },
      { speaker: 0, spanish: 'Claro, los probadores est\u00E1n al fondo a la izquierda.', english: 'Of course, the fitting rooms are in the back on the left.' },
      { speaker: 1, spanish: 'Me queda bien. \u00BFCu\u00E1nto cuesta?', english: 'It fits me well. How much does it cost?' },
      { speaker: 0, spanish: 'Cuesta treinta euros. Pero hoy hay un descuento del veinte por ciento.', english: 'It costs thirty euros. But today there is a twenty percent discount.' },
      { speaker: 1, spanish: '\u00A1Qu\u00E9 bien! Me la llevo. \u00BFAceptan tarjeta?', english: 'Great! I\u2019ll take it. Do you accept card?' },
      { speaker: 0, spanish: 'S\u00ED, por supuesto. \u00BFNecesita una bolsa?', english: 'Yes, of course. Do you need a bag?' },
      { speaker: 1, spanish: 'S\u00ED, por favor. Gracias.', english: 'Yes, please. Thank you.' },
    ],
    vocab: [
      { word: 'camisa', english: 'shirt' },
      { word: 'talla', english: 'size (clothing)' },
      { word: 'probarse', english: 'to try on' },
      { word: 'descuento', english: 'discount' },
      { word: 'probador', english: 'fitting room' },
      { word: 'bolsa', english: 'bag' },
      { word: 'tarjeta', english: 'card' },
    ],
    quiz: [
      { prompt: 'How do you ask "Can I try this on?"', options: ['Puedo comprar esto', '\u00BFPuedo probarme esto?', '\u00BFPuedo ver esto?', '\u00BFPuedo tocar esto?'], correct: 1 , explanation: "\"Probarse\" is the reflexive verb meaning to try on clothing. The reflexive \"me\" is essential because you are trying something on yourself, distinguishing it from \"probar\" (to try/taste)." },
      { prompt: 'What does "Me queda bien" mean?', options: ['I like it', 'It fits me well', 'It looks good', 'I\u2019ll stay here'], correct: 1 , explanation: "\"Quedar\" when used with clothing means \"to fit.\" The indirect object pronoun \"me\" indicates it fits the speaker, making this a key phrase for clothes shopping in Spanish." },
      { prompt: 'How do you say "How much does it cost?"', options: ['\u00BFCu\u00E1ntos hay?', '\u00BFCu\u00E1ndo cierra?', '\u00BFCu\u00E1nto cuesta?', '\u00BFCu\u00E1l quiere?'], correct: 2 , explanation: "\"¿Cuánto cuesta?\" uses the interrogative \"cuánto\" (how much) with \"costar\" (to cost). \"¿Cuántos?\" asks how many, \"¿Cuándo?\" asks when, and \"¿Cuál?\" asks which." },
    ],
  },

  // ============================================================
  // 4. EN EL AEROPUERTO (A2)
  // ============================================================
  {
    id: 'aeropuerto-1',
    title: 'En el Aeropuerto',
    titleEn: 'At the Airport',
    icon: '\u2708\uFE0F',
    desc: 'Navigate the airport: check-in, boarding, and customs',
    level: 'A2',
    speakers: [
      { name: 'Agente', nameEn: 'Agent', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos d\u00EDas. Su pasaporte y tarjeta de embarque, por favor.', english: 'Good morning. Your passport and boarding pass, please.' },
      { speaker: 1, spanish: 'Aqu\u00ED tiene. Tengo un vuelo a Madrid a las tres.', english: 'Here you go. I have a flight to Madrid at three.' },
      { speaker: 0, spanish: '\u00BFCu\u00E1ntas maletas va a facturar?', english: 'How many bags are you going to check?' },
      { speaker: 1, spanish: 'Una maleta para facturar y un equipaje de mano.', english: 'One bag to check and one carry-on.' },
      { speaker: 0, spanish: 'Ponga la maleta en la b\u00E1scula, por favor. \u00BFPrefiere asiento de ventanilla o de pasillo?', english: 'Put the bag on the scale, please. Do you prefer a window or aisle seat?' },
      { speaker: 1, spanish: 'De ventanilla, por favor.', english: 'Window, please.' },
      { speaker: 0, spanish: 'Su puerta de embarque es la B12. El embarque comienza a las dos y media.', english: 'Your boarding gate is B12. Boarding begins at two thirty.' },
      { speaker: 1, spanish: '\u00BFD\u00F3nde est\u00E1 el control de seguridad?', english: 'Where is the security checkpoint?' },
      { speaker: 0, spanish: 'Siga recto y luego a la derecha. No olvide sacar los l\u00EDquidos de su bolsa.', english: 'Go straight and then to the right. Don\u2019t forget to take the liquids out of your bag.' },
      { speaker: 1, spanish: '\u00BFMi vuelo tiene alguna demora?', english: 'Does my flight have any delay?' },
      { speaker: 0, spanish: 'No, todo est\u00E1 a tiempo. \u00A1Buen viaje!', english: 'No, everything is on time. Have a good trip!' },
      { speaker: 1, spanish: '\u00A1Muchas gracias!', english: 'Thank you very much!' },
    ],
    vocab: [
      { word: 'pasaporte', english: 'passport' },
      { word: 'tarjeta de embarque', english: 'boarding pass' },
      { word: 'maleta', english: 'suitcase' },
      { word: 'facturar', english: 'to check (luggage)' },
      { word: 'ventanilla', english: 'window (seat)' },
      { word: 'puerta de embarque', english: 'boarding gate' },
      { word: 'demora', english: 'delay' },
      { word: 'equipaje de mano', english: 'carry-on luggage' },
    ],
    quiz: [
      { prompt: 'What is "tarjeta de embarque" in English?', options: ['Credit card', 'Boarding pass', 'ID card', 'Travel card'], correct: 1 , explanation: "\"Tarjeta\" means card and \"embarque\" comes from \"embarcar\" (to board). Together they form the compound noun for the document you need to board a plane." },
      { prompt: 'How do you say "window seat"?', options: ['Asiento de pasillo', 'Asiento de ventanilla', 'Asiento de frente', 'Asiento de centro'], correct: 1 , explanation: "\"Ventanilla\" is the diminutive of \"ventana\" (window) and specifically refers to small windows like those on planes. \"Pasillo\" means aisle, so \"asiento de pasillo\" is an aisle seat." },
      { prompt: 'What does "facturar" mean in an airport context?', options: ['To invoice', 'To fly', 'To check luggage', 'To board'], correct: 2 , explanation: "While \"facturar\" can mean \"to invoice\" in business Spanish, at the airport it specifically means to check in luggage. Context changes the meaning of many Spanish verbs." },
    ],
  },

  // ============================================================
  // 5. EN EL M\u00C9DICO (A2)
  // ============================================================
  {
    id: 'medico-1',
    title: 'En el M\u00E9dico',
    titleEn: 'At the Doctor\u2019s Office',
    icon: '\uD83E\uDE7A',
    desc: 'Describe symptoms and understand medical advice',
    level: 'A2',
    speakers: [
      { name: 'Doctora', nameEn: 'Doctor', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos d\u00EDas. \u00BFQu\u00E9 le pasa? \u00BFC\u00F3mo se siente?', english: 'Good morning. What\u2019s wrong? How do you feel?' },
      { speaker: 1, spanish: 'Me siento muy mal. Me duele la cabeza y tengo fiebre.', english: 'I feel very bad. My head hurts and I have a fever.' },
      { speaker: 0, spanish: '\u00BFDesde cu\u00E1ndo tiene estos s\u00EDntomas?', english: 'Since when have you had these symptoms?' },
      { speaker: 1, spanish: 'Desde hace tres d\u00EDas. Tambi\u00E9n me duele la garganta.', english: 'For three days. My throat also hurts.' },
      { speaker: 0, spanish: 'Voy a tomarle la temperatura. Abra la boca, por favor.', english: 'I\u2019m going to take your temperature. Open your mouth, please.' },
      { speaker: 1, spanish: '\u00BFEs algo grave, doctora?', english: 'Is it something serious, doctor?' },
      { speaker: 0, spanish: 'No se preocupe. Tiene una gripe com\u00FAn. Necesita descansar mucho.', english: 'Don\u2019t worry. You have a common flu. You need to rest a lot.' },
      { speaker: 1, spanish: '\u00BFNecesito tomar alg\u00FAn medicamento?', english: 'Do I need to take any medication?' },
      { speaker: 0, spanish: 'S\u00ED, le voy a recetar un antibi\u00F3tico y un jarabe para la tos.', english: 'Yes, I\u2019m going to prescribe an antibiotic and a cough syrup.' },
      { speaker: 1, spanish: '\u00BFCada cu\u00E1nto debo tomarlo?', english: 'How often should I take it?' },
      { speaker: 0, spanish: 'El antibi\u00F3tico cada ocho horas y el jarabe tres veces al d\u00EDa. Tome mucho l\u00EDquido.', english: 'The antibiotic every eight hours and the syrup three times a day. Drink lots of fluids.' },
      { speaker: 1, spanish: 'Entendido. Muchas gracias, doctora.', english: 'Understood. Thank you very much, doctor.' },
    ],
    vocab: [
      { word: 'fiebre', english: 'fever' },
      { word: 's\u00EDntoma', english: 'symptom' },
      { word: 'garganta', english: 'throat' },
      { word: 'gripe', english: 'flu' },
      { word: 'recetar', english: 'to prescribe' },
      { word: 'medicamento', english: 'medication' },
      { word: 'jarabe', english: 'syrup' },
      { word: 'descansar', english: 'to rest' },
    ],
    quiz: [
      { prompt: 'How do you say "My head hurts"?', options: ['Tengo cabeza', 'Me duele la cabeza', 'Mi cabeza est\u00E1 mal', 'La cabeza me pasa'], correct: 1 , explanation: "Spanish uses \"me duele + body part\" (literally \"it hurts to me\") with an indirect object pronoun, rather than the possessive construction English uses (\"my head hurts\")." },
      { prompt: 'What does "recetar" mean?', options: ['To rest', 'To prescribe', 'To recover', 'To examine'], correct: 1 , explanation: "\"Recetar\" comes from \"receta\" (prescription) and means to prescribe medication. It is used exclusively in medical contexts, unlike \"descansar\" (to rest) or \"examinar\" (to examine)." },
      { prompt: 'How do you say "since three days ago"?', options: ['En tres d\u00EDas', 'Por tres d\u00EDas', 'Desde hace tres d\u00EDas', 'Hace de tres d\u00EDas'], correct: 2 , explanation: "\"Desde hace + time period\" is a fixed Spanish construction expressing duration from a past point to the present. \"Desde\" means since, and \"hace\" indicates elapsed time." },
    ],
  },

  // ============================================================
  // 6. PIDIENDO DIRECCIONES (A1)
  // ============================================================
  {
    id: 'direcciones-1',
    title: 'Pidiendo Direcciones',
    titleEn: 'Asking for Directions',
    icon: '\uD83D\uDDFA\uFE0F',
    desc: 'Ask for and understand directions on the street',
    level: 'A1',
    speakers: [
      { name: 'Peatona', nameEn: 'Pedestrian', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 1, spanish: 'Disculpe, \u00BFsabe d\u00F3nde est\u00E1 la estaci\u00F3n de metro m\u00E1s cercana?', english: 'Excuse me, do you know where the nearest metro station is?' },
      { speaker: 0, spanish: 'S\u00ED, claro. Siga recto por esta calle dos cuadras.', english: 'Yes, of course. Go straight on this street for two blocks.' },
      { speaker: 1, spanish: '\u00BFY despu\u00E9s?', english: 'And then?' },
      { speaker: 0, spanish: 'Despu\u00E9s gire a la izquierda en la esquina. Va a ver una plaza grande.', english: 'Then turn left at the corner. You will see a big plaza.' },
      { speaker: 1, spanish: '\u00BFLa estaci\u00F3n est\u00E1 en la plaza?', english: 'Is the station in the plaza?' },
      { speaker: 0, spanish: 'S\u00ED, la entrada est\u00E1 justo enfrente de la iglesia.', english: 'Yes, the entrance is right in front of the church.' },
      { speaker: 1, spanish: '\u00BFEst\u00E1 lejos de aqu\u00ED?', english: 'Is it far from here?' },
      { speaker: 0, spanish: 'No, est\u00E1 a unos cinco minutos caminando.', english: 'No, it\u2019s about a five-minute walk.' },
      { speaker: 1, spanish: '\u00BFTambi\u00E9n hay una parada de autob\u00FAs por aqu\u00ED?', english: 'Is there also a bus stop around here?' },
      { speaker: 0, spanish: 'S\u00ED, hay una en la siguiente calle, a la derecha.', english: 'Yes, there is one on the next street, on the right.' },
      { speaker: 1, spanish: 'Muchas gracias por su ayuda.', english: 'Thank you very much for your help.' },
      { speaker: 0, spanish: 'De nada. \u00A1Que tenga buen d\u00EDa!', english: 'You\u2019re welcome. Have a nice day!' },
    ],
    vocab: [
      { word: 'recto', english: 'straight' },
      { word: 'cuadra', english: 'block' },
      { word: 'esquina', english: 'corner' },
      { word: 'girar', english: 'to turn' },
      { word: 'enfrente de', english: 'in front of' },
      { word: 'parada de autob\u00FAs', english: 'bus stop' },
      { word: 'cerca / lejos', english: 'near / far' },
    ],
    quiz: [
      { prompt: 'How do you say "turn left"?', options: ['Siga recto', 'Gire a la izquierda', 'Gire a la derecha', 'Vaya abajo'], correct: 1 , explanation: "\"Girar\" means to turn, and \"a la izquierda\" means to the left. In directions, Spanish uses \"a la\" before \"izquierda\" or \"derecha.\" \"Siga recto\" means go straight." },
      { prompt: 'What does "cuadra" mean?', options: ['Square', 'Block', 'Corner', 'Street'], correct: 1 , explanation: "\"Cuadra\" means a city block and is commonly used in Latin America when giving directions. In Spain, \"manzana\" is more frequently used for the same meaning." },
      { prompt: 'How do you ask "Is it far from here?"', options: ['\u00BFEst\u00E1 cerca?', '\u00BFEst\u00E1 aqu\u00ED?', '\u00BFEst\u00E1 lejos de aqu\u00ED?', '\u00BFD\u00F3nde queda?'], correct: 2 , explanation: "\"Lejos de aquí\" means \"far from here,\" combining the adverb \"lejos\" (far) with the preposition \"de\" and \"aquí\" (here). Its opposite is \"cerca de aquí\" (near here)." },
    ],
  },

  // ============================================================
  // 7. EN EL MERCADO (A2)
  // ============================================================
  {
    id: 'mercado-1',
    title: 'En el Mercado',
    titleEn: 'At the Market',
    icon: '\uD83E\uDD51',
    desc: 'Buy fresh produce and bargain at an open-air market',
    level: 'A2',
    speakers: [
      { name: 'Vendedor', nameEn: 'Vendor', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: '\u00A1Buenos d\u00EDas! \u00BFQu\u00E9 le pongo?', english: 'Good morning! What can I get you?' },
      { speaker: 1, spanish: 'Buenos d\u00EDas. Quiero un kilo de tomates, por favor.', english: 'Good morning. I\u2019d like a kilo of tomatoes, please.' },
      { speaker: 0, spanish: 'Estos est\u00E1n muy frescos, reci\u00E9n llegados de la huerta. \u00BFAlgo m\u00E1s?', english: 'These are very fresh, just arrived from the farm. Anything else?' },
      { speaker: 1, spanish: 'S\u00ED, \u00BFa cu\u00E1nto est\u00E1n las fresas?', english: 'Yes, how much are the strawberries?' },
      { speaker: 0, spanish: 'Las fresas est\u00E1n a tres euros la caja.', english: 'The strawberries are three euros per box.' },
      { speaker: 1, spanish: '\u00BFMe puede dar dos cajas? Y tambi\u00E9n medio kilo de cebollas.', english: 'Can you give me two boxes? And also half a kilo of onions.' },
      { speaker: 0, spanish: 'Por supuesto. \u00BFQuiere probar las aceitunas? Tenemos una variedad nueva.', english: 'Of course. Would you like to try the olives? We have a new variety.' },
      { speaker: 1, spanish: '\u00A1Mmm, est\u00E1n deliciosas! P\u00F3ngame un cuarto de kilo.', english: 'Mmm, they\u2019re delicious! Give me a quarter kilo.' },
      { speaker: 0, spanish: '\u00BFNecesita algo m\u00E1s?', english: 'Do you need anything else?' },
      { speaker: 1, spanish: 'No, eso es todo. \u00BFCu\u00E1nto es en total?', english: 'No, that\u2019s all. How much is it in total?' },
      { speaker: 0, spanish: 'Son diez euros con cincuenta c\u00E9ntimos.', english: 'That\u2019s ten euros and fifty cents.' },
      { speaker: 1, spanish: 'Aqu\u00ED tiene. \u00A1Hasta la pr\u00F3xima!', english: 'Here you go. Until next time!' },
    ],
    vocab: [
      { word: 'fresco', english: 'fresh' },
      { word: 'kilo', english: 'kilogram' },
      { word: 'fresas', english: 'strawberries' },
      { word: 'cebollas', english: 'onions' },
      { word: 'aceitunas', english: 'olives' },
      { word: 'probar', english: 'to try / to taste' },
      { word: 'en total', english: 'in total' },
    ],
    quiz: [
      { prompt: 'What does "\u00BFQu\u00E9 le pongo?" mean in a market context?', options: ['What are you wearing?', 'What can I get you?', 'What do you put?', 'Where do I put it?'], correct: 1 , explanation: "\"Poner\" literally means \"to put,\" but at a market \"¿Qué le pongo?\" idiomatically means \"What can I get you?\" It refers to what the vendor will put in your bag." },
      { prompt: 'How do you ask the price of strawberries?', options: ['\u00BFCu\u00E1ntas fresas hay?', '\u00BFD\u00F3nde est\u00E1n las fresas?', '\u00BFA cu\u00E1nto est\u00E1n las fresas?', '\u00BFQu\u00E9 son las fresas?'], correct: 2 , explanation: "\"¿A cuánto están?\" is the idiomatic way to ask prices at a market, using \"estar\" because prices are temporary states. \"¿Cuánto cuesta?\" also works but sounds more formal." },
      { prompt: 'What does "medio kilo" mean?', options: ['One kilo', 'Half a kilo', 'Two kilos', 'A quarter kilo'], correct: 1 , explanation: "\"Medio\" means half in Spanish. Market quantities are typically measured in kilos, with \"medio kilo\" (500g) and \"un cuarto de kilo\" (250g) being common amounts to request." },
    ],
  },

  // ============================================================
  // 8. UNA ENTREVISTA DE TRABAJO (B1)
  // ============================================================
  {
    id: 'entrevista-1',
    title: 'Una Entrevista de Trabajo',
    titleEn: 'A Job Interview',
    icon: '\uD83D\uDCBC',
    desc: 'Attend a job interview and talk about your experience',
    level: 'B1',
    speakers: [
      { name: 'Entrevistadora', nameEn: 'Interviewer', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos d\u00EDas, bienvenido. Tome asiento, por favor. Cu\u00E9nteme un poco sobre usted.', english: 'Good morning, welcome. Please have a seat. Tell me a bit about yourself.' },
      { speaker: 1, spanish: 'Buenos d\u00EDas. Soy ingeniero de software con cinco a\u00F1os de experiencia.', english: 'Good morning. I\u2019m a software engineer with five years of experience.' },
      { speaker: 0, spanish: '\u00BFPor qu\u00E9 le interesa trabajar en nuestra empresa?', english: 'Why are you interested in working at our company?' },
      { speaker: 1, spanish: 'Me interesa porque tienen proyectos innovadores y valoro el trabajo en equipo.', english: 'I\u2019m interested because you have innovative projects and I value teamwork.' },
      { speaker: 0, spanish: '\u00BFCu\u00E1les son sus fortalezas principales?', english: 'What are your main strengths?' },
      { speaker: 1, spanish: 'Soy muy organizado, aprendo r\u00E1pido y me comunico bien con los equipos.', english: 'I\u2019m very organized, I learn quickly, and I communicate well with teams.' },
      { speaker: 0, spanish: '\u00BFTiene experiencia trabajando con clientes internacionales?', english: 'Do you have experience working with international clients?' },
      { speaker: 1, spanish: 'S\u00ED, en mi trabajo anterior gestionaba proyectos con clientes en Am\u00E9rica Latina.', english: 'Yes, in my previous job I managed projects with clients in Latin America.' },
      { speaker: 0, spanish: '\u00BFCu\u00E1l es su expectativa salarial?', english: 'What is your salary expectation?' },
      { speaker: 1, spanish: 'Busco un salario competitivo acorde con el mercado, alrededor de cuarenta mil euros anuales.', english: 'I\u2019m looking for a competitive salary in line with the market, around forty thousand euros annually.' },
      { speaker: 0, spanish: 'Muy bien. \u00BFTiene alguna pregunta para nosotros?', english: 'Very well. Do you have any questions for us?' },
      { speaker: 1, spanish: 'S\u00ED, \u00BFcu\u00E1les son las oportunidades de crecimiento profesional en la empresa?', english: 'Yes, what are the opportunities for professional growth at the company?' },
    ],
    vocab: [
      { word: 'entrevista', english: 'interview' },
      { word: 'experiencia', english: 'experience' },
      { word: 'fortalezas', english: 'strengths' },
      { word: 'expectativa salarial', english: 'salary expectation' },
      { word: 'trabajo en equipo', english: 'teamwork' },
      { word: 'crecimiento profesional', english: 'professional growth' },
      { word: 'gestionar', english: 'to manage' },
    ],
    quiz: [
      { prompt: 'How do you say "Tell me about yourself"?', options: ['D\u00EDgame su nombre', 'Cu\u00E9nteme sobre usted', 'Pres\u00E9nteme su trabajo', 'H\u00E1bleme de su familia'], correct: 1 , explanation: "\"Contar\" means to tell or narrate, and \"cuénteme\" is its formal imperative (usted) form. \"Sobre usted\" means about you (formal). This is a standard opening question in Spanish job interviews." },
      { prompt: 'What does "expectativa salarial" mean?', options: ['Work schedule', 'Job title', 'Salary expectation', 'Work experience'], correct: 2 , explanation: "\"Expectativa\" means expectation and \"salarial\" is the adjective form of \"salario\" (salary). This compound noun is standard HR vocabulary used in professional contexts across the Spanish-speaking world." },
      { prompt: 'How do you say "I learn quickly"?', options: ['Trabajo mucho', 'Estudio siempre', 'Aprendo r\u00E1pido', 'Entiendo bien'], correct: 2 , explanation: "\"Aprender\" means to learn, and \"rápido\" serves as an adverb meaning quickly here. This is a concise, natural way to express a personal strength in a Spanish job interview." },
    ],
  },

  // ============================================================
  // 9. EN LA FARMACIA (A2)
  // ============================================================
  {
    id: 'farmacia-1',
    title: 'En la Farmacia',
    titleEn: 'At the Pharmacy',
    icon: '\uD83D\uDC8A',
    desc: 'Buy medicine and ask for health advice',
    level: 'A2',
    speakers: [
      { name: 'Farmac\u00E9utico', nameEn: 'Pharmacist', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenas tardes. \u00BFEn qu\u00E9 puedo ayudarle?', english: 'Good afternoon. How can I help you?' },
      { speaker: 1, spanish: 'Buenas tardes. Necesito algo para el dolor de est\u00F3mago.', english: 'Good afternoon. I need something for a stomachache.' },
      { speaker: 0, spanish: '\u00BFDesde cu\u00E1ndo le duele? \u00BFHa comido algo en mal estado?', english: 'Since when does it hurt? Have you eaten something spoiled?' },
      { speaker: 1, spanish: 'Me empez\u00F3 a doler anoche. Creo que com\u00ED algo que me cay\u00F3 mal.', english: 'It started hurting last night. I think I ate something that didn\u2019t agree with me.' },
      { speaker: 0, spanish: 'Le recomiendo estas pastillas. Tome una cada ocho horas despu\u00E9s de comer.', english: 'I recommend these pills. Take one every eight hours after eating.' },
      { speaker: 1, spanish: '\u00BFTienen efectos secundarios?', english: 'Do they have side effects?' },
      { speaker: 0, spanish: 'Pueden causar un poco de sue\u00F1o. Evite conducir si se siente somnoliento.', english: 'They can cause a bit of drowsiness. Avoid driving if you feel sleepy.' },
      { speaker: 1, spanish: 'Entendido. Tambi\u00E9n necesito crema solar y tiritas.', english: 'Understood. I also need sunscreen and band-aids.' },
      { speaker: 0, spanish: 'Aqu\u00ED tiene la crema de factor cincuenta y las tiritas. \u00BFAlgo m\u00E1s?', english: 'Here is the SPF fifty sunscreen and the band-aids. Anything else?' },
      { speaker: 1, spanish: '\u00BFTiene alg\u00FAn repelente de insectos?', english: 'Do you have any insect repellent?' },
      { speaker: 0, spanish: 'S\u00ED, este es muy bueno. Son quince euros con todo.', english: 'Yes, this one is very good. It\u2019s fifteen euros for everything.' },
      { speaker: 1, spanish: 'Perfecto. Aqu\u00ED tiene. \u00A1Gracias por los consejos!', english: 'Perfect. Here you go. Thanks for the advice!' },
    ],
    vocab: [
      { word: 'pastillas', english: 'pills / tablets' },
      { word: 'dolor de est\u00F3mago', english: 'stomachache' },
      { word: 'efectos secundarios', english: 'side effects' },
      { word: 'crema solar', english: 'sunscreen' },
      { word: 'tiritas', english: 'band-aids' },
      { word: 'receta', english: 'prescription' },
      { word: 'caer mal', english: 'to not agree with (food)' },
    ],
    quiz: [
      { prompt: 'How do you say "stomachache"?', options: ['Dolor de garganta', 'Dolor de cabeza', 'Dolor de est\u00F3mago', 'Dolor de espalda'], correct: 2 , explanation: "\"Dolor de + body part\" is the standard Spanish construction for expressing pain. \"Estómago\" means stomach, \"cabeza\" means head, \"garganta\" means throat, and \"espalda\" means back." },
      { prompt: 'What are "efectos secundarios"?', options: ['Main effects', 'Side effects', 'Secondary goals', 'Extra costs'], correct: 1 , explanation: "\"Secundario\" means secondary and \"efecto\" means effect. Together they form the medical term for side effects, an important concept when discussing medication with a pharmacist or doctor." },
      { prompt: 'What does "tiritas" mean?', options: ['Vitamins', 'Tissues', 'Band-aids', 'Cotton balls'], correct: 2 , explanation: "\"Tiritas\" is the common Spanish word for adhesive bandages (band-aids). The word comes from the brand name Tirita, similar to how English speakers use \"Band-Aid\" as a generic term." },
    ],
  },

  // ============================================================
  // 10. HACIENDO PLANES (A2)
  // ============================================================
  {
    id: 'planes-1',
    title: 'Haciendo Planes',
    titleEn: 'Making Plans with Friends',
    icon: '\uD83C\uDF89',
    desc: 'Make plans to go out with a friend this weekend',
    level: 'A2',
    speakers: [
      { name: 'Carlos', nameEn: 'Carlos', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: '\u00A1Oye! \u00BFQu\u00E9 vas a hacer este fin de semana?', english: 'Hey! What are you going to do this weekend?' },
      { speaker: 1, spanish: 'Todav\u00EDa no tengo planes. \u00BFPor qu\u00E9? \u00BFTienes alguna idea?', english: 'I don\u2019t have plans yet. Why? Do you have any ideas?' },
      { speaker: 0, spanish: '\u00BFQu\u00E9 te parece si vamos al cine el s\u00E1bado?', english: 'How about we go to the movies on Saturday?' },
      { speaker: 1, spanish: '\u00A1Me encanta la idea! \u00BFQu\u00E9 pel\u00EDcula quieres ver?', english: 'I love the idea! What movie do you want to see?' },
      { speaker: 0, spanish: 'Hay una nueva pel\u00EDcula de acci\u00F3n. Dicen que es muy buena.', english: 'There\u2019s a new action movie. They say it\u2019s very good.' },
      { speaker: 1, spanish: 'Genial. \u00BFA qu\u00E9 hora es la funci\u00F3n?', english: 'Great. What time is the showing?' },
      { speaker: 0, spanish: 'Hay una a las siete y otra a las nueve y media. \u00BFCu\u00E1l prefieres?', english: 'There\u2019s one at seven and another at nine thirty. Which do you prefer?' },
      { speaker: 1, spanish: 'Prefiero la de las siete. As\u00ED despu\u00E9s podemos ir a cenar.', english: 'I prefer the one at seven. That way we can go to dinner afterwards.' },
      { speaker: 0, spanish: '\u00A1Buena idea! Conozco un restaurante mexicano nuevo que est\u00E1 muy cerca.', english: 'Good idea! I know a new Mexican restaurant that\u2019s very close.' },
      { speaker: 1, spanish: '\u00A1Perfecto! \u00BFNos vemos en la entrada del cine a las seis y media?', english: 'Perfect! Shall we meet at the cinema entrance at six thirty?' },
      { speaker: 0, spanish: 'Hecho. Yo compro las entradas por internet. \u00A1Nos vemos el s\u00E1bado!', english: 'Done. I\u2019ll buy the tickets online. See you Saturday!' },
      { speaker: 1, spanish: '\u00A1Genial! \u00A1Hasta el s\u00E1bado!', english: 'Great! See you Saturday!' },
    ],
    vocab: [
      { word: 'fin de semana', english: 'weekend' },
      { word: 'pel\u00EDcula', english: 'movie / film' },
      { word: 'funci\u00F3n', english: 'showing / screening' },
      { word: 'entrada', english: 'ticket / entrance' },
      { word: 'cenar', english: 'to have dinner' },
      { word: 'quedar / verse', english: 'to meet up' },
      { word: 'hecho', english: 'done / deal' },
    ],
    quiz: [
      { prompt: 'How do you say "this weekend"?', options: ['Esta semana', 'Este fin de semana', 'El pr\u00F3ximo d\u00EDa', 'Este s\u00E1bado'], correct: 1 , explanation: "\"Fin de semana\" literally means \"end of week\" and is the standard Spanish term for weekend. The demonstrative \"este\" (this) precedes it to indicate the upcoming weekend." },
      { prompt: 'What does "\u00BFQu\u00E9 te parece si...?" mean?', options: ['What do you think about...?', 'How about if...?', 'Do you want to...?', 'Both A and B'], correct: 3 , explanation: "This expression can be translated as both \"What do you think about...?\" and \"How about if...?\" It is a versatile way to make suggestions in informal Spanish, so both A and B are correct." },
      { prompt: 'How do you say "See you Saturday!"?', options: ['Vamos el s\u00E1bado', 'Es s\u00E1bado', '\u00A1Hasta el s\u00E1bado!', 'Quiero el s\u00E1bado'], correct: 2 , explanation: "\"Hasta\" means \"until\" and is used in farewell expressions. \"¡Hasta el sábado!\" literally means \"until Saturday\" and is the natural way to say goodbye when you plan to meet on that day." },
    ],
  },

  // ============================================================
  // 11. EN EL BANCO (B1)
  // ============================================================
  {
    id: 'banco-1',
    title: 'En el Banco',
    titleEn: 'At the Bank',
    icon: '\uD83C\uDFE6',
    desc: 'Open an account and handle banking transactions',
    level: 'B1',
    speakers: [
      { name: 'Empleada', nameEn: 'Bank Employee', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos d\u00EDas. \u00BFEn qu\u00E9 puedo ayudarle hoy?', english: 'Good morning. How can I help you today?' },
      { speaker: 1, spanish: 'Buenos d\u00EDas. Me gustar\u00EDa abrir una cuenta corriente.', english: 'Good morning. I\u2019d like to open a checking account.' },
      { speaker: 0, spanish: 'Por supuesto. \u00BFTiene su documento de identidad y un comprobante de domicilio?', english: 'Of course. Do you have your ID and a proof of address?' },
      { speaker: 1, spanish: 'S\u00ED, aqu\u00ED tiene mi pasaporte y un recibo de electricidad.', english: 'Yes, here is my passport and an electricity bill.' },
      { speaker: 0, spanish: 'Perfecto. \u00BFDesea una tarjeta de d\u00E9bito tambi\u00E9n?', english: 'Perfect. Would you also like a debit card?' },
      { speaker: 1, spanish: 'S\u00ED, por favor. \u00BFCu\u00E1nto tiempo tarda en llegar?', english: 'Yes, please. How long does it take to arrive?' },
      { speaker: 0, spanish: 'La tarjeta llega en una semana. Mientras tanto, puede usar la banca en l\u00EDnea.', english: 'The card arrives in one week. In the meantime, you can use online banking.' },
      { speaker: 1, spanish: '\u00BFCu\u00E1l es la comisi\u00F3n mensual de la cuenta?', english: 'What is the monthly fee for the account?' },
      { speaker: 0, spanish: 'La cuenta b\u00E1sica no tiene comisi\u00F3n si mantiene un saldo m\u00EDnimo de quinientos euros.', english: 'The basic account has no fee if you maintain a minimum balance of five hundred euros.' },
      { speaker: 1, spanish: '\u00BFPuedo hacer transferencias internacionales?', english: 'Can I make international transfers?' },
      { speaker: 0, spanish: 'S\u00ED, las transferencias internacionales tienen una comisi\u00F3n de quince euros.', english: 'Yes, international transfers have a fee of fifteen euros.' },
      { speaker: 1, spanish: 'Entendido. Quiero abrir la cuenta, por favor.', english: 'Understood. I want to open the account, please.' },
    ],
    vocab: [
      { word: 'cuenta corriente', english: 'checking account' },
      { word: 'tarjeta de d\u00E9bito', english: 'debit card' },
      { word: 'comisi\u00F3n', english: 'fee / commission' },
      { word: 'saldo', english: 'balance' },
      { word: 'transferencia', english: 'transfer' },
      { word: 'comprobante de domicilio', english: 'proof of address' },
      { word: 'banca en l\u00EDnea', english: 'online banking' },
    ],
    quiz: [
      { prompt: 'How do you say "I\u2019d like to open an account"?', options: ['Quiero cerrar una cuenta', 'Me gustar\u00EDa abrir una cuenta', 'Necesito ver mi cuenta', 'Voy a cambiar mi cuenta'], correct: 1 , explanation: "\"Me gustaría\" (I would like) is the conditional form of \"gustar\" and is more polite than \"quiero\" (I want). \"Abrir\" means to open, and its opposite \"cerrar\" means to close." },
      { prompt: 'What does "saldo m\u00EDnimo" mean?', options: ['Maximum balance', 'Minimum balance', 'Final balance', 'Monthly payment'], correct: 1 , explanation: "\"Saldo\" means balance (the amount of money in an account) and \"mínimo\" means minimum. Banks often require maintaining a minimum balance to waive monthly maintenance fees." },
      { prompt: 'What is "comisi\u00F3n" in English?', options: ['Commission only', 'Interest', 'Fee / commission', 'Deposit'], correct: 2 , explanation: "\"Comisión\" has a broader meaning than just commission; in banking it commonly refers to any fee or service charge, including account maintenance fees, transfer fees, and ATM charges." },
    ],
  },

  // ============================================================
  // 12. UNA CITA (B1)
  // ============================================================
  {
    id: 'cita-1',
    title: 'Una Cita',
    titleEn: 'A Date',
    icon: '\u2764\uFE0F',
    desc: 'Have a conversation on a first date at a caf\u00E9',
    level: 'B1',
    speakers: [
      { name: 'Luc\u00EDa', nameEn: 'Luc\u00EDa', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 1, spanish: '\u00A1Hola, Luc\u00EDa! Qu\u00E9 alegr\u00EDa verte. Est\u00E1s muy guapa.', english: 'Hi, Luc\u00EDa! How nice to see you. You look very pretty.' },
      { speaker: 0, spanish: '\u00A1Gracias! T\u00FA tambi\u00E9n te ves muy bien. \u00BFLlevabas mucho tiempo esperando?', english: 'Thanks! You also look very nice. Had you been waiting long?' },
      { speaker: 1, spanish: 'No, acabo de llegar. \u00BFQuieres pedir algo?', english: 'No, I just arrived. Do you want to order something?' },
      { speaker: 0, spanish: 'S\u00ED, quiero un caf\u00E9 con leche. \u00BFY t\u00FA?', english: 'Yes, I want a caf\u00E9 con leche. And you?' },
      { speaker: 1, spanish: 'Yo voy a pedir un zumo de naranja. Bueno, cu\u00E9ntame, \u00BFa qu\u00E9 te dedicas?', english: 'I\u2019m going to order an orange juice. So, tell me, what do you do for work?' },
      { speaker: 0, spanish: 'Soy dise\u00F1adora gr\u00E1fica. Me encanta mi trabajo. \u00BFY t\u00FA?', english: 'I\u2019m a graphic designer. I love my job. And you?' },
      { speaker: 1, spanish: 'Soy profesor de historia. \u00BFQu\u00E9 haces en tu tiempo libre?', english: 'I\u2019m a history teacher. What do you do in your free time?' },
      { speaker: 0, spanish: 'Me gusta pintar, leer y hacer senderismo. \u00BFY a ti?', english: 'I like painting, reading, and hiking. What about you?' },
      { speaker: 1, spanish: 'A m\u00ED me gusta cocinar y tocar la guitarra. Tambi\u00E9n me encanta viajar.', english: 'I like cooking and playing guitar. I also love traveling.' },
      { speaker: 0, spanish: '\u00A1Qu\u00E9 interesante! \u00BFCu\u00E1l ha sido tu viaje favorito?', english: 'How interesting! What has been your favorite trip?' },
      { speaker: 1, spanish: 'Un viaje a Colombia. La gente era incre\u00EDble y la comida deliciosa.', english: 'A trip to Colombia. The people were amazing and the food was delicious.' },
      { speaker: 0, spanish: '\u00A1Me encantar\u00EDa conocer Colombia! Tenemos que hablar m\u00E1s de eso. \u00BFQuieres dar un paseo despu\u00E9s?', english: 'I\u2019d love to visit Colombia! We should talk more about that. Want to take a walk afterwards?' },
    ],
    vocab: [
      { word: 'cita', english: 'date / appointment' },
      { word: 'dedicarse a', english: 'to do for a living' },
      { word: 'tiempo libre', english: 'free time' },
      { word: 'senderismo', english: 'hiking' },
      { word: 'viajar', english: 'to travel' },
      { word: 'dar un paseo', english: 'to take a walk' },
      { word: 'acabo de llegar', english: 'I just arrived' },
    ],
    quiz: [
      { prompt: 'How do you ask "What do you do for work?" informally?', options: ['\u00BFQu\u00E9 haces?', '\u00BFA qu\u00E9 te dedicas?', '\u00BFD\u00F3nde trabajas?', '\u00BFCu\u00E1nto ganas?'], correct: 1 , explanation: "\"Dedicarse a\" literally means \"to dedicate oneself to\" and is the most natural way to ask about someone's profession in Spanish. \"¿Dónde trabajas?\" asks where you work, not what you do." },
      { prompt: 'What does "acabo de llegar" mean?', options: ['I arrived early', 'I just arrived', 'I\u2019m about to arrive', 'I arrived late'], correct: 1 , explanation: "\"Acabar de + infinitive\" is a fixed construction meaning \"to have just done something.\" It expresses the immediate past, making \"acabo de llegar\" mean \"I arrived just moments ago.\"" },
      { prompt: 'How do you say "free time"?', options: ['Hora libre', 'D\u00EDa libre', 'Tiempo libre', 'Momento libre'], correct: 2 , explanation: "\"Tiempo libre\" is a fixed collocation in Spanish for leisure time. While \"hora libre\" exists (meaning a free period in a schedule), \"tiempo libre\" is the correct general term." },
    ],
  },

  // ============================================================
  // 13. ALQUILANDO UN APARTAMENTO (B1)
  // ============================================================
  {
    id: 'apartamento-1',
    title: 'Alquilando un Apartamento',
    titleEn: 'Renting an Apartment',
    icon: '\uD83C\uDFE0',
    desc: 'Visit an apartment and negotiate rental terms',
    level: 'B1',
    speakers: [
      { name: 'Propietaria', nameEn: 'Landlord', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Bienvenido. Este es el apartamento. Tiene dos dormitorios y un ba\u00F1o.', english: 'Welcome. This is the apartment. It has two bedrooms and one bathroom.' },
      { speaker: 1, spanish: 'Es muy luminoso. \u00BFCu\u00E1ntos metros cuadrados tiene?', english: 'It\u2019s very bright. How many square meters does it have?' },
      { speaker: 0, spanish: 'Tiene setenta metros cuadrados. La cocina es nueva y est\u00E1 totalmente equipada.', english: 'It has seventy square meters. The kitchen is new and fully equipped.' },
      { speaker: 1, spanish: '\u00BFEl alquiler incluye los gastos de comunidad?', english: 'Does the rent include the community fees?' },
      { speaker: 0, spanish: 'S\u00ED, incluye comunidad y agua. La electricidad y el gas son aparte.', english: 'Yes, it includes community fees and water. Electricity and gas are separate.' },
      { speaker: 1, spanish: '\u00BFCu\u00E1nto es el alquiler mensual?', english: 'How much is the monthly rent?' },
      { speaker: 0, spanish: 'Son ochocientos euros al mes. Y se pide un dep\u00F3sito de dos meses.', english: 'It\u2019s eight hundred euros per month. And a two-month deposit is required.' },
      { speaker: 1, spanish: '\u00BFSe permite tener mascotas?', english: 'Are pets allowed?' },
      { speaker: 0, spanish: 'S\u00ED, siempre que no sean animales grandes. \u00BFTiene alguna mascota?', english: 'Yes, as long as they\u2019re not large animals. Do you have any pets?' },
      { speaker: 1, spanish: 'Tengo un gato peque\u00F1o. \u00BFCu\u00E1l es la duraci\u00F3n m\u00EDnima del contrato?', english: 'I have a small cat. What is the minimum length of the contract?' },
      { speaker: 0, spanish: 'El contrato m\u00EDnimo es de un a\u00F1o, renovable autom\u00E1ticamente.', english: 'The minimum contract is one year, automatically renewable.' },
      { speaker: 1, spanish: 'Me interesa mucho. \u00BFCu\u00E1ndo podr\u00EDa mudarme?', english: 'I\u2019m very interested. When could I move in?' },
    ],
    vocab: [
      { word: 'alquiler', english: 'rent' },
      { word: 'dep\u00F3sito', english: 'deposit' },
      { word: 'gastos de comunidad', english: 'community / building fees' },
      { word: 'dormitorio', english: 'bedroom' },
      { word: 'contrato', english: 'contract / lease' },
      { word: 'mudarse', english: 'to move (house)' },
      { word: 'mascota', english: 'pet' },
      { word: 'metros cuadrados', english: 'square meters' },
    ],
    quiz: [
      { prompt: 'How do you say "monthly rent"?', options: ['Precio mensual', 'Alquiler mensual', 'Pago del mes', 'Coste de casa'], correct: 1 , explanation: "\"Alquiler\" specifically means rent (the payment for using a property) and \"mensual\" means monthly. This is the standard real estate term used in rental agreements across Spanish-speaking countries." },
      { prompt: 'What does "mudarse" mean?', options: ['To change clothes', 'To change one\u2019s mind', 'To move house', 'To be quiet'], correct: 2 , explanation: "\"Mudarse\" is a reflexive verb meaning to move house or relocate. Without the reflexive pronoun, \"mudar\" can mean to change or shed, so the reflexive form is essential for the housing meaning." },
      { prompt: 'What are "gastos de comunidad"?', options: ['Community events', 'Building / community fees', 'Neighborhood taxes', 'Shared groceries'], correct: 1 , explanation: "\"Gastos de comunidad\" are shared building maintenance fees paid by apartment owners or tenants, covering things like elevator maintenance, stairway cleaning, and building insurance." },
    ],
  },

  // ============================================================
  // 14. EN LA ESTACI\u00D3N DE TREN (A2)
  // ============================================================
  {
    id: 'tren-1',
    title: 'En la Estaci\u00F3n de Tren',
    titleEn: 'At the Train Station',
    icon: '\uD83D\uDE86',
    desc: 'Buy train tickets and ask about schedules',
    level: 'A2',
    speakers: [
      { name: 'Taquillera', nameEn: 'Ticket Agent', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 1, spanish: 'Buenos d\u00EDas. Quiero un billete a Barcelona, por favor.', english: 'Good morning. I\u2019d like a ticket to Barcelona, please.' },
      { speaker: 0, spanish: '\u00BFSolo ida o ida y vuelta?', english: 'One way or round trip?' },
      { speaker: 1, spanish: 'Ida y vuelta. \u00BFCu\u00E1nto cuesta?', english: 'Round trip. How much does it cost?' },
      { speaker: 0, spanish: 'El billete de ida y vuelta cuesta cuarenta y cinco euros. \u00BFPara qu\u00E9 fecha?', english: 'The round trip ticket costs forty-five euros. For what date?' },
      { speaker: 1, spanish: 'Para este viernes. \u00BFA qu\u00E9 hora sale el primer tren?', english: 'For this Friday. What time does the first train leave?' },
      { speaker: 0, spanish: 'El primero sale a las seis y cuarto. Tambi\u00E9n hay uno a las ocho y otro a las diez.', english: 'The first one leaves at six fifteen. There\u2019s also one at eight and another at ten.' },
      { speaker: 1, spanish: 'El de las ocho est\u00E1 bien. \u00BFCu\u00E1nto dura el viaje?', english: 'The eight o\u2019clock one is fine. How long is the trip?' },
      { speaker: 0, spanish: 'El trayecto dura aproximadamente dos horas y media.', english: 'The journey takes approximately two and a half hours.' },
      { speaker: 1, spanish: '\u00BFDe qu\u00E9 and\u00E9n sale?', english: 'Which platform does it leave from?' },
      { speaker: 0, spanish: 'Sale del and\u00E9n n\u00FAmero cinco. Puede consultar las pantallas de informaci\u00F3n.', english: 'It leaves from platform number five. You can check the information screens.' },
      { speaker: 1, spanish: 'Perfecto. \u00BFPuedo elegir asiento?', english: 'Perfect. Can I choose a seat?' },
      { speaker: 0, spanish: 'S\u00ED, le he asignado el asiento doce A, junto a la ventanilla. \u00A1Buen viaje!', english: 'Yes, I\u2019ve assigned you seat twelve A, next to the window. Have a good trip!' },
    ],
    vocab: [
      { word: 'billete', english: 'ticket' },
      { word: 'ida y vuelta', english: 'round trip' },
      { word: 'and\u00E9n', english: 'platform' },
      { word: 'trayecto', english: 'journey / route' },
      { word: 'horario', english: 'schedule / timetable' },
      { word: 'salir', english: 'to leave / to depart' },
      { word: 'asiento', english: 'seat' },
    ],
    quiz: [
      { prompt: 'How do you say "round trip"?', options: ['Solo ida', 'Ida y vuelta', 'Viaje doble', 'Dos billetes'], correct: 1 , explanation: "\"Ida\" means going (one way) and \"vuelta\" means return. Together, \"ida y vuelta\" is the standard phrase for a round-trip ticket, while \"solo ida\" means one way only." },
      { prompt: 'What does "and\u00E9n" mean?', options: ['Aisle', 'Platform', 'Terminal', 'Track'], correct: 1 , explanation: "\"Andén\" specifically refers to a train platform where passengers wait and board. It is distinct from \"vía\" (track) and \"terminal\" (terminal building)." },
      { prompt: 'How do you ask "How long is the trip?"', options: ['\u00BFCu\u00E1nto cuesta el viaje?', '\u00BFCu\u00E1ndo es el viaje?', '\u00BFCu\u00E1nto dura el viaje?', '\u00BFC\u00F3mo es el viaje?'], correct: 2 , explanation: "\"Durar\" means to last or take (in terms of time), so \"¿Cuánto dura?\" asks about duration. \"¿Cuánto cuesta?\" asks about cost, and \"¿Cuándo?\" asks when." },
    ],
  },

  // ============================================================
  // 15. RESOLVIENDO UN PROBLEMA (B1)
  // ============================================================
  {
    id: 'queja-1',
    title: 'Resolviendo un Problema',
    titleEn: 'Resolving a Complaint',
    icon: '\uD83D\uDCDE',
    desc: 'File a complaint and negotiate a resolution',
    level: 'B1',
    speakers: [
      { name: 'Agente de Servicio', nameEn: 'Service Agent', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Servicio al cliente, buenas tardes. \u00BFEn qu\u00E9 puedo ayudarle?', english: 'Customer service, good afternoon. How can I help you?' },
      { speaker: 1, spanish: 'Buenas tardes. Compr\u00E9 un port\u00E1til en su tienda hace una semana y ya no funciona.', english: 'Good afternoon. I bought a laptop at your store a week ago and it no longer works.' },
      { speaker: 0, spanish: 'Lamento mucho escuchar eso. \u00BFPuede describir el problema?', english: 'I\u2019m very sorry to hear that. Can you describe the problem?' },
      { speaker: 1, spanish: 'La pantalla se queda en negro cuando lo enciendo y hace un ruido extra\u00F1o.', english: 'The screen stays black when I turn it on and it makes a strange noise.' },
      { speaker: 0, spanish: '\u00BFTiene el recibo de compra y la garant\u00EDa?', english: 'Do you have the receipt and the warranty?' },
      { speaker: 1, spanish: 'S\u00ED, tengo ambos. La garant\u00EDa es de un a\u00F1o. Quiero una soluci\u00F3n r\u00E1pida.', english: 'Yes, I have both. The warranty is for one year. I want a quick solution.' },
      { speaker: 0, spanish: 'Entiendo su frustraci\u00F3n. Tenemos dos opciones: reparar el equipo o cambiarlo por uno nuevo.', english: 'I understand your frustration. We have two options: repair the device or exchange it for a new one.' },
      { speaker: 1, spanish: 'Prefiero que me lo cambien por uno nuevo. No quiero un equipo reparado.', english: 'I\u2019d prefer you exchange it for a new one. I don\u2019t want a repaired device.' },
      { speaker: 0, spanish: 'De acuerdo. Puede traer el port\u00E1til a la tienda con el recibo y le damos uno nuevo.', english: 'Agreed. You can bring the laptop to the store with the receipt and we\u2019ll give you a new one.' },
      { speaker: 1, spanish: '\u00BFCu\u00E1nto tiempo tardar\u00E1 el cambio?', english: 'How long will the exchange take?' },
      { speaker: 0, spanish: 'El cambio es inmediato si tenemos el modelo en stock. Si no, tardar\u00E1 unos tres d\u00EDas h\u00E1biles.', english: 'The exchange is immediate if we have the model in stock. If not, it will take about three business days.' },
      { speaker: 1, spanish: 'Perfecto. Pasar\u00E9 ma\u00F1ana por la ma\u00F1ana. Muchas gracias por su ayuda.', english: 'Perfect. I\u2019ll come by tomorrow morning. Thank you very much for your help.' },
    ],
    vocab: [
      { word: 'queja', english: 'complaint' },
      { word: 'garant\u00EDa', english: 'warranty / guarantee' },
      { word: 'recibo', english: 'receipt' },
      { word: 'devoluci\u00F3n', english: 'return / refund' },
      { word: 'reparar', english: 'to repair' },
      { word: 'cambiar', english: 'to exchange / to change' },
      { word: 'd\u00EDas h\u00E1biles', english: 'business days' },
      { word: 'funcionar', english: 'to work / to function' },
    ],
    quiz: [
      { prompt: 'How do you say "It doesn\u2019t work anymore"?', options: ['No trabaja m\u00E1s', 'Ya no funciona', 'Est\u00E1 roto siempre', 'No sirve nunca'], correct: 1 , explanation: "\"Ya no funciona\" combines \"ya no\" (no longer) with \"funcionar\" (to function/work for devices and machines). Spanish distinguishes between \"funcionar\" for machines and \"trabajar\" for people." },
      { prompt: 'What does "garant\u00EDa" mean?', options: ['Guarantee / warranty', 'Insurance', 'Receipt', 'Protection plan'], correct: 0 , explanation: "\"Garantía\" means warranty or guarantee, referring to a manufacturer's promise to repair or replace a defective product within a specified period. It comes from \"garantizar\" (to guarantee)." },
      { prompt: 'What are "d\u00EDas h\u00E1biles"?', options: ['Holidays', 'Calendar days', 'Business days', 'Weekends'], correct: 2 , explanation: "\"Hábil\" means capable or working, and \"días hábiles\" specifically means business days (Monday through Friday, excluding holidays), as opposed to \"días naturales\" (calendar days)." },
    ],
  },

  // ============================================================
  // 16. LA ENTREVISTA DE TRABAJO (C1)
  // ============================================================
  {
    id: 'entrevista-c1',
    title: 'La Entrevista de Trabajo',
    titleEn: 'The Job Interview',
    icon: '\uD83D\uDCBC',
    desc: 'Navigate a professional job interview with confidence',
    level: 'C1',
    speakers: [
      { name: 'Entrevistadora', nameEn: 'Interviewer', role: 'npc' },
      { name: 'Candidato/a', nameEn: 'Candidate', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos d\u00EDas. Tome asiento, por favor. Hemos revisado su curr\u00EDculum y nos ha parecido muy interesante su trayectoria.', english: 'Good morning. Please have a seat. We have reviewed your CV and found your career path very interesting.' },
      { speaker: 1, spanish: 'Muchas gracias. Es un placer estar aqu\u00ED. Llevo varios a\u00F1os desarroll\u00E1ndome en este sector y creo que puedo aportar mucho a su equipo.', english: 'Thank you very much. It is a pleasure to be here. I have been developing in this sector for several years and I believe I can contribute a great deal to your team.' },
      { speaker: 0, spanish: '\u00BFPodr\u00EDa describirnos cu\u00E1les considera que son sus principales fortalezas profesionales?', english: 'Could you describe what you consider to be your main professional strengths?' },
      { speaker: 1, spanish: 'Destaco por mi capacidad de liderazgo y mi habilidad para gestionar equipos multidisciplinares bajo presi\u00F3n.', english: 'I stand out for my leadership capacity and my ability to manage multidisciplinary teams under pressure.' },
      { speaker: 0, spanish: '\u00BFY en cuanto a \u00E1reas de mejora? \u00BFQu\u00E9 aspectos considera que podr\u00EDa perfeccionar?', english: 'And regarding areas for improvement? What aspects do you think you could refine?' },
      { speaker: 1, spanish: 'A veces tiendo a ser demasiado exigente conmigo mismo, lo cual me lleva a dedicar m\u00E1s horas de las necesarias a cada proyecto.', english: 'Sometimes I tend to be too demanding of myself, which leads me to dedicate more hours than necessary to each project.' },
      { speaker: 0, spanish: 'El puesto requiere disponibilidad para viajar y dominio de ingl\u00E9s y portugu\u00E9s. \u00BFCumple con esos requisitos?', english: 'The position requires availability to travel and fluency in English and Portuguese. Do you meet those requirements?' },
      { speaker: 1, spanish: 'Por supuesto. Tengo amplia experiencia internacional y manejo ambos idiomas con fluidez. He trabajado dos a\u00F1os en Brasil.', english: 'Of course. I have extensive international experience and I handle both languages fluently. I worked two years in Brazil.' },
      { speaker: 0, spanish: '\u00BFQu\u00E9 expectativas salariales tiene para este puesto?', english: 'What salary expectations do you have for this position?' },
      { speaker: 1, spanish: 'Teniendo en cuenta mi experiencia y las responsabilidades del puesto, considero que una banda salarial de entre cincuenta y sesenta mil euros anuales ser\u00EDa adecuada.', english: 'Taking into account my experience and the responsibilities of the position, I consider a salary range between fifty and sixty thousand euros per year to be appropriate.' },
      { speaker: 0, spanish: '\u00BFPor qu\u00E9 quiere dejar su puesto actual? Entendemos que lleva cinco a\u00F1os en su empresa.', english: 'Why do you want to leave your current position? We understand you have been at your company for five years.' },
      { speaker: 1, spanish: 'Busco un nuevo reto profesional que me permita crecer. He alcanzado el techo de desarrollo en mi empresa actual y necesito nuevos est\u00EDmulos.', english: 'I am looking for a new professional challenge that allows me to grow. I have reached the development ceiling at my current company and need new stimuli.' },
      { speaker: 0, spanish: 'Muy bien. Le comunicaremos nuestra decisi\u00F3n en un plazo m\u00E1ximo de diez d\u00EDas h\u00E1biles. \u00BFTiene alguna pregunta?', english: 'Very well. We will communicate our decision within a maximum period of ten business days. Do you have any questions?' },
      { speaker: 1, spanish: 'S\u00ED. \u00BFPodr\u00EDa indicarme cu\u00E1les son las posibilidades de promoci\u00F3n interna y el plan de formaci\u00F3n continua?', english: 'Yes. Could you tell me what the internal promotion opportunities and the continuing education plan are?' },
    ],
    vocab: [
      { word: 'trayectoria', english: 'career path / trajectory' },
      { word: 'curr\u00EDculum', english: 'CV / resume' },
      { word: 'fortalezas', english: 'strengths' },
      { word: 'expectativas salariales', english: 'salary expectations' },
      { word: 'banda salarial', english: 'salary range' },
      { word: 'promoci\u00F3n interna', english: 'internal promotion' },
      { word: 'formaci\u00F3n continua', english: 'continuing education' },
      { word: 'equipo multidisciplinar', english: 'multidisciplinary team' },
    ],
    quiz: [
      { prompt: 'What does "trayectoria profesional" mean?', options: ['Job title', 'Professional career path', 'Work schedule', 'Business trip'], correct: 1 , explanation: "\"Trayectoria\" comes from trajectory and refers to the path or progression of a career over time. It emphasizes the journey and professional development, not just a current job title." },
      { prompt: 'How do you say "salary expectations" in Spanish?', options: ['Salario esperado', 'Expectativas salariales', 'Sueldo previsto', 'Pago anticipado'], correct: 1 , explanation: "\"Expectativas salariales\" uses the plural noun \"expectativas\" (expectations) with the adjective \"salariales\" (salary-related). This is formal HR vocabulary commonly used in professional interview settings." },
      { prompt: 'What does "He alcanzado el techo de desarrollo" mean?', options: ['I have reached the top floor', 'I have hit the development ceiling', 'I have finished development', 'I have built the roof'], correct: 1 , explanation: "\"Techo\" literally means ceiling or roof and metaphorically represents an upper limit. \"Alcanzar el techo de desarrollo\" means reaching the point where no further professional growth is possible at one's current company." },
    ],
  },

  // ============================================================
  // 17. DEBATE EN CLASE UNIVERSITARIA (C1)
  // ============================================================
  {
    id: 'debate-universitario-c1',
    title: 'Debate en Clase Universitaria',
    titleEn: 'University Class Debate',
    icon: '\uD83C\uDF93',
    desc: 'Participate in a structured academic debate on social media',
    level: 'C1',
    speakers: [
      { name: 'Profesora', nameEn: 'Professor', role: 'npc' },
      { name: 'Estudiante 1', nameEn: 'Student 1', role: 'player' },
      { name: 'Estudiante 2', nameEn: 'Student 2', role: 'npc' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Hoy debatiremos sobre el impacto de las redes sociales en la democracia. \u00BFQui\u00E9n quiere abrir el debate?', english: 'Today we will debate the impact of social media on democracy. Who wants to open the debate?' },
      { speaker: 1, spanish: 'Yo quisiera empezar. A mi modo de ver, las redes sociales han democratizado el acceso a la informaci\u00F3n de manera sin precedentes.', english: 'I would like to start. In my view, social media has democratized access to information in an unprecedented way.' },
      { speaker: 2, spanish: 'Discrepo respetuosamente. Si bien han ampliado el acceso, tambi\u00E9n han facilitado la propagaci\u00F3n de desinformaci\u00F3n a gran escala.', english: 'I respectfully disagree. While they have broadened access, they have also facilitated the spread of disinformation on a large scale.' },
      { speaker: 1, spanish: 'Reconozco que la desinformaci\u00F3n es un problema, pero eso no invalida el hecho de que millones de personas ahora tienen voz.', english: 'I acknowledge that disinformation is a problem, but that does not invalidate the fact that millions of people now have a voice.' },
      { speaker: 2, spanish: 'Habr\u00EDa que matizar qu\u00E9 entendemos por "tener voz". \u00BFDe qu\u00E9 sirve tener voz si los algoritmos deciden qu\u00E9 se escucha?', english: 'We should clarify what we mean by "having a voice." What good is having a voice if algorithms decide what gets heard?' },
      { speaker: 0, spanish: 'Excelente punto. Estamos tocando la cuesti\u00F3n de los filtros burbuja. \u00BFPodr\u00EDan desarrollar esa idea?', english: 'Excellent point. We are touching on the issue of filter bubbles. Could you develop that idea?' },
      { speaker: 1, spanish: 'Es cierto que los algoritmos crean c\u00E1maras de eco, pero el usuario tiene la responsabilidad de diversificar sus fuentes.', english: 'It is true that algorithms create echo chambers, but the user has the responsibility to diversify their sources.' },
      { speaker: 2, spanish: 'Eso es trasladar la responsabilidad al individuo cuando el problema es estructural. Las plataformas priorizan el contenido polarizante porque genera m\u00E1s interacci\u00F3n.', english: 'That is shifting the responsibility to the individual when the problem is structural. Platforms prioritize polarizing content because it generates more engagement.' },
      { speaker: 1, spanish: 'Dicho esto, cabe se\u00F1alar que tambi\u00E9n han surgido movimientos sociales leg\u00EDtimos gracias a estas plataformas, como la Primavera \u00C1rabe.', english: 'That said, it should be noted that legitimate social movements have also emerged thanks to these platforms, such as the Arab Spring.' },
      { speaker: 2, spanish: 'No niego eso, pero son casos excepcionales. El uso cotidiano de las redes tiende m\u00E1s a la trivializaci\u00F3n del discurso p\u00FAblico.', english: 'I do not deny that, but those are exceptional cases. The everyday use of social media tends more toward the trivialization of public discourse.' },
      { speaker: 0, spanish: 'Estamos llegando al quid de la cuesti\u00F3n: \u00BFes la tecnolog\u00EDa neutral o inherentemente sesgada?', english: 'We are getting to the crux of the matter: is technology neutral or inherently biased?' },
      { speaker: 1, spanish: 'La tecnolog\u00EDa en s\u00ED es neutral; son los modelos de negocio los que generan los incentivos perversos.', english: 'Technology itself is neutral; it is the business models that create the perverse incentives.' },
      { speaker: 2, spanish: 'Ah\u00ED s\u00ED coincidimos. El problema no es la herramienta, sino qui\u00E9n la controla y con qu\u00E9 fines.', english: 'There we do agree. The problem is not the tool, but who controls it and for what purposes.' },
      { speaker: 0, spanish: 'Muy bien. En resumidas cuentas, ambos coinciden en que se necesita regulaci\u00F3n, aunque difieren en el grado. Excelente debate.', english: 'Very well. In short, you both agree that regulation is needed, although you differ on the degree. Excellent debate.' },
    ],
    vocab: [
      { word: 'redes sociales', english: 'social media / social networks' },
      { word: 'desinformaci\u00F3n', english: 'disinformation / misinformation' },
      { word: 'c\u00E1mara de eco', english: 'echo chamber' },
      { word: 'filtro burbuja', english: 'filter bubble' },
      { word: 'polarizante', english: 'polarizing' },
      { word: 'discurso p\u00FAblico', english: 'public discourse' },
      { word: 'incentivos perversos', english: 'perverse incentives' },
    ],
    quiz: [
      { prompt: 'What does "c\u00E1mara de eco" mean?', options: ['Sound studio', 'Echo chamber', 'Music room', 'Loud speaker'], correct: 1 , explanation: "\"Cámara\" means chamber and \"eco\" means echo. An echo chamber describes an environment where people only encounter beliefs reinforcing their own, a key concept in media literacy and political discourse." },
      { prompt: 'How do you say "I respectfully disagree" in Spanish?', options: ['No estoy de acuerdo', 'Discrepo respetuosamente', 'Me opongo totalmente', 'No me gusta su idea'], correct: 1 , explanation: "\"Discrepar\" is a formal verb meaning to disagree or dissent, more elevated than \"no estar de acuerdo.\" Adding \"respetuosamente\" (respectfully) makes it appropriate for academic or professional debate." },
      { prompt: 'What does "El quid de la cuesti\u00F3n" mean?', options: ['The end of the question', 'The crux of the matter', 'A difficult question', 'The first question'], correct: 1 , explanation: "\"Quid\" comes from Latin meaning \"what\" or \"the essential point.\" This expression identifies the core or crux of a matter, similar to the English phrase \"the heart of the issue.\"" },
    ],
  },

  // ============================================================
  // 18. DEBATE POL\u00CDTICO (C1)
  // ============================================================
  {
    id: 'debate-politico-c1',
    title: 'Debate Pol\u00EDtico',
    titleEn: 'Political Debate',
    icon: '\uD83C\uDFDB\uFE0F',
    desc: 'Follow a political debate between two candidates',
    level: 'C1',
    speakers: [
      { name: 'Moderadora', nameEn: 'Moderator', role: 'npc' },
      { name: 'Candidato A', nameEn: 'Candidate A', role: 'player' },
      { name: 'Candidato B', nameEn: 'Candidate B', role: 'npc' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenas noches. Bienvenidos al debate electoral. El primer tema es la pol\u00EDtica econ\u00F3mica. Candidato A, tiene la palabra.', english: 'Good evening. Welcome to the electoral debate. The first topic is economic policy. Candidate A, you have the floor.' },
      { speaker: 1, spanish: 'Gracias. Nuestra propuesta se centra en la reducci\u00F3n de la presi\u00F3n fiscal sobre las pymes para impulsar el empleo.', english: 'Thank you. Our proposal focuses on reducing the tax burden on small businesses to boost employment.' },
      { speaker: 2, spanish: 'Con todo respeto, esa pol\u00EDtica ya se implement\u00F3 en la legislatura anterior y los resultados fueron decepcionantes.', english: 'With all due respect, that policy was already implemented in the previous term and the results were disappointing.' },
      { speaker: 1, spanish: 'Perm\u00EDtame puntualizar que las circunstancias econ\u00F3micas eran completamente distintas. Estamos ante un contexto diferente.', english: 'Allow me to clarify that the economic circumstances were completely different. We are facing a different context.' },
      { speaker: 2, spanish: 'Lo que los ciudadanos necesitan es una inversi\u00F3n decidida en servicios p\u00FAblicos, no m\u00E1s recortes fiscales que beneficien a unos pocos.', english: 'What citizens need is a decisive investment in public services, not more tax cuts that benefit a few.' },
      { speaker: 1, spanish: 'No comparto esa visi\u00F3n simplista. Las pymes representan el setenta por ciento del empleo. Apoyarlas es apoyar a toda la sociedad.', english: 'I do not share that simplistic view. Small businesses represent seventy percent of employment. Supporting them is supporting all of society.' },
      { speaker: 0, spanish: 'Pasemos al segundo tema: la transici\u00F3n energ\u00E9tica. Candidato B, su turno.', english: 'Let us move to the second topic: the energy transition. Candidate B, your turn.' },
      { speaker: 2, spanish: 'Proponemos alcanzar la neutralidad de carbono para 2040 mediante una transformaci\u00F3n profunda del modelo productivo.', english: 'We propose achieving carbon neutrality by 2040 through a profound transformation of the production model.' },
      { speaker: 1, spanish: 'Es un objetivo loable, pero irrealizable sin un plan de financiaci\u00F3n concreto. \u00BFDe d\u00F3nde saldr\u00E1n los recursos?', english: 'It is a commendable goal, but unrealizable without a concrete financing plan. Where will the resources come from?' },
      { speaker: 2, spanish: 'De una reforma fiscal progresiva y de fondos europeos. Los n\u00FAmeros est\u00E1n en nuestro programa electoral.', english: 'From a progressive tax reform and European funds. The numbers are in our electoral program.' },
      { speaker: 1, spanish: 'A mi modo de ver, la transici\u00F3n debe ser gradual para no destruir empleo en sectores tradicionales.', english: 'In my view, the transition must be gradual so as not to destroy employment in traditional sectors.' },
      { speaker: 2, spanish: 'La gradualidad es una excusa para la inacci\u00F3n. El cambio clim\u00E1tico no espera a nuestros plazos pol\u00EDticos.', english: 'Gradualism is an excuse for inaction. Climate change does not wait for our political timelines.' },
      { speaker: 0, spanish: 'Tiempo agotado. Cada candidato tiene treinta segundos para un mensaje final.', english: 'Time is up. Each candidate has thirty seconds for a closing message.' },
      { speaker: 1, spanish: 'En resumidas cuentas, proponemos un modelo equilibrado que combine crecimiento econ\u00F3mico con responsabilidad social.', english: 'In short, we propose a balanced model that combines economic growth with social responsibility.' },
    ],
    vocab: [
      { word: 'presi\u00F3n fiscal', english: 'tax burden / tax pressure' },
      { word: 'pymes', english: 'small and medium businesses (SMEs)' },
      { word: 'legislatura', english: 'legislative term / administration' },
      { word: 'neutralidad de carbono', english: 'carbon neutrality' },
      { word: 'reforma fiscal', english: 'tax reform' },
      { word: 'transici\u00F3n energ\u00E9tica', english: 'energy transition' },
      { word: 'programa electoral', english: 'electoral program / platform' },
    ],
    quiz: [
      { prompt: 'What does "presi\u00F3n fiscal" mean?', options: ['Fiscal pressure / tax burden', 'Financial crisis', 'Government spending', 'Budget deficit'], correct: 0 , explanation: "\"Presión\" means pressure and \"fiscal\" relates to taxes and the treasury. Together they describe the overall tax burden on individuals or businesses, a central concept in economic policy discussions." },
      { prompt: 'What are "pymes" in English?', options: ['Large corporations', 'Government agencies', 'Small and medium enterprises', 'Non-profit organizations'], correct: 2 , explanation: "\"Pymes\" is an acronym for \"Pequeñas y Medianas Empresas\" (Small and Medium Enterprises). They form the backbone of employment in most Spanish-speaking economies." },
      { prompt: 'How do you say "Allow me to clarify" in formal Spanish?', options: ['D\u00E9jeme hablar', 'Perm\u00EDtame puntualizar', 'Quiero decir algo', 'Escuche por favor'], correct: 1 , explanation: "\"Permitir\" means to allow, and \"puntualizar\" means to clarify or specify a point precisely. This polished expression is used in debates and professional settings to introduce a correction or nuance." },
    ],
  },

  // ============================================================
  // 19. TERTULIA FILOS\u00D3FICA (C2)
  // ============================================================
  {
    id: 'tertulia-filosofica-c2',
    title: 'Tertulia Filos\u00F3fica',
    titleEn: 'Philosophical Discussion',
    icon: '\uD83E\uDD14',
    desc: 'Engage in a sophisticated philosophical discussion',
    level: 'C2',
    speakers: [
      { name: 'Fil\u00F3sofa', nameEn: 'Philosopher', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
      { name: 'Colega', nameEn: 'Colleague', role: 'npc' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Retomemos donde lo dejamos la semana pasada. \u00BFHasta qu\u00E9 punto la conciencia individual est\u00E1 condicionada por las estructuras sociales?', english: 'Let us pick up where we left off last week. To what extent is individual consciousness conditioned by social structures?' },
      { speaker: 1, spanish: 'Desde una perspectiva fenomenol\u00F3gica, la conciencia siempre es conciencia de algo, y ese "algo" est\u00E1 inevitablemente mediado por lo social.', english: 'From a phenomenological perspective, consciousness is always consciousness of something, and that "something" is inevitably mediated by the social.' },
      { speaker: 2, spanish: 'Sin embargo, reducir la conciencia a un mero reflejo de lo social ser\u00EDa caer en un determinismo que niega la agencia del sujeto.', english: 'However, reducing consciousness to a mere reflection of the social would be falling into a determinism that denies the agency of the subject.' },
      { speaker: 1, spanish: 'No estoy planteando un determinismo estricto. M\u00E1s bien sugiero que la libertad del sujeto se ejerce dentro de un marco de posibilidades socialmente constituido.', english: 'I am not proposing a strict determinism. Rather, I am suggesting that the freedom of the subject is exercised within a framework of socially constituted possibilities.' },
      { speaker: 0, spanish: 'Ah\u00ED entronca con la noci\u00F3n sartreana de que estamos "condenados a ser libres", pero dentro de una situaci\u00F3n concreta.', english: 'That connects with the Sartrean notion that we are "condemned to be free," but within a concrete situation.' },
      { speaker: 2, spanish: 'El problema es que Sartre subestim\u00F3 el peso de las estructuras inconscientes. Ah\u00ED es donde Bourdieu resulta m\u00E1s esclarecedor con su concepto de habitus.', english: 'The problem is that Sartre underestimated the weight of unconscious structures. That is where Bourdieu is more illuminating with his concept of habitus.' },
      { speaker: 1, spanish: 'El habitus es un concepto valios\u00EDsimo, pero \u00BFno corremos el riesgo de reificar las estructuras y anular al sujeto en el proceso?', english: 'Habitus is a most valuable concept, but do we not run the risk of reifying structures and nullifying the subject in the process?' },
      { speaker: 0, spanish: 'Esa tensi\u00F3n entre estructura y agencia es, quiz\u00E1s, irresoluble. Pero su irresolubilidad es precisamente lo que la hace filos\u00F3ficamente productiva.', english: 'That tension between structure and agency is, perhaps, irresolvable. But its irresolvability is precisely what makes it philosophically productive.' },
      { speaker: 2, spanish: 'Convendr\u00EDa tambi\u00E9n incorporar la dimensi\u00F3n temporal. La conciencia no es est\u00E1tica; se constituye en un devenir hist\u00F3rico.', english: 'It would also be worth incorporating the temporal dimension. Consciousness is not static; it is constituted in a historical becoming.' },
      { speaker: 1, spanish: 'Exacto. Y ah\u00ED la hermen\u00E9utica gadameriana nos ofrece herramientas: comprendemos siempre desde un horizonte hist\u00F3ricamente situado.', english: 'Exactly. And there Gadamerian hermeneutics offers us tools: we always understand from a historically situated horizon.' },
      { speaker: 0, spanish: 'Lo cual nos lleva a cuestionar la posibilidad misma de un conocimiento objetivo desvinculado del sujeto cognoscente.', english: 'Which leads us to question the very possibility of objective knowledge detached from the knowing subject.' },
      { speaker: 2, spanish: 'Eso ser\u00EDa abrazar un relativismo epistemol\u00F3gico radical, y no estoy seguro de que sea deseable.', english: 'That would be embracing a radical epistemological relativism, and I am not sure that is desirable.' },
      { speaker: 1, spanish: 'No necesariamente relativismo. Podemos sostener que el conocimiento es perspectivista sin renunciar a criterios de validez intersubjetiva.', english: 'Not necessarily relativism. We can maintain that knowledge is perspectival without renouncing criteria of intersubjective validity.' },
      { speaker: 0, spanish: 'Brillante. Dejemos aqu\u00ED esta apor\u00EDa para retomarla la pr\u00F3xima semana con textos de Habermas sobre la raz\u00F3n comunicativa.', english: 'Brilliant. Let us leave this aporia here and revisit it next week with texts by Habermas on communicative reason.' },
    ],
    vocab: [
      { word: 'fenomenol\u00F3gica', english: 'phenomenological' },
      { word: 'agencia del sujeto', english: 'agency of the subject' },
      { word: 'habitus', english: 'habitus (Bourdieu\u2019s concept of ingrained habits)' },
      { word: 'reificar', english: 'to reify (treat abstraction as concrete)' },
      { word: 'hermen\u00E9utica', english: 'hermeneutics (theory of interpretation)' },
      { word: 'relativismo epistemol\u00F3gico', english: 'epistemological relativism' },
      { word: 'apor\u00EDa', english: 'aporia (philosophical impasse)' },
      { word: 'intersubjetiva', english: 'intersubjective' },
    ],
    quiz: [
      { prompt: 'What does "agencia del sujeto" mean?', options: ['Travel agency', 'Government agency', 'Agency of the subject', 'Subject matter'], correct: 2 , explanation: "In philosophy, \"agencia\" refers to the capacity of an individual (\"sujeto\") to act independently and make free choices. It is unrelated to the everyday meaning of agency as a business or organization." },
      { prompt: 'What is "habitus" in Bourdieu\u2019s philosophy?', options: ['A bad habit', 'Ingrained dispositions shaped by social structures', 'A type of habitat', 'A religious practice'], correct: 1 , explanation: "In Pierre Bourdieu's sociology, \"habitus\" refers to deeply ingrained habits, skills, and dispositions that individuals acquire through their social environment, explaining how social structures shape behavior without strict determinism." },
      { prompt: 'What does "apor\u00EDa" mean?', options: ['An opening', 'A philosophical impasse or puzzle', 'A type of argument', 'A conclusion'], correct: 1 , explanation: "\"Aporía\" comes from Greek meaning \"without passage.\" In philosophy, it refers to a state of puzzlement or an irresolvable internal contradiction that is nonetheless productive for critical thinking." },
    ],
  },

  // ============================================================
  // 20. NEGOCIACI\u00D3N LEGAL (C2)
  // ============================================================
  {
    id: 'negociacion-legal-c2',
    title: 'Negociaci\u00F3n Legal',
    titleEn: 'Legal Negotiation',
    icon: '\u2696\uFE0F',
    desc: 'Navigate a sophisticated legal negotiation between firms',
    level: 'C2',
    speakers: [
      { name: 'Abogada Parte A', nameEn: 'Lawyer Party A', role: 'npc' },
      { name: 'Abogado Parte B', nameEn: 'Lawyer Party B', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos d\u00EDas. Agradecemos que hayan accedido a esta reuni\u00F3n de mediaci\u00F3n antes de recurrir a la v\u00EDa judicial.', english: 'Good morning. We appreciate that you have agreed to this mediation meeting before resorting to legal proceedings.' },
      { speaker: 1, spanish: 'Nuestro cliente siempre ha estado dispuesto al di\u00E1logo, siempre y cuando se respeten sus derechos contractuales.', english: 'Our client has always been open to dialogue, as long as their contractual rights are respected.' },
      { speaker: 0, spanish: 'Entendemos su postura. Sin embargo, la cl\u00E1usula de indemnizaci\u00F3n que invocan admite una interpretaci\u00F3n distinta seg\u00FAn la jurisprudencia reciente.', english: 'We understand your position. However, the indemnification clause you invoke admits a different interpretation according to recent case law.' },
      { speaker: 1, spanish: 'Con el debido respeto, la jurisprudencia que citan es de un tribunal inferior y ha sido recurrida. No sienta precedente firme.', english: 'With due respect, the case law you cite is from a lower court and has been appealed. It does not set firm precedent.' },
      { speaker: 0, spanish: 'Sea como fuere, un litigio prolongado no beneficia a ninguna de las partes. Le planteo la siguiente alternativa: una compensaci\u00F3n parcial.', english: 'Be that as it may, prolonged litigation benefits neither party. I present the following alternative: partial compensation.' },
      { speaker: 1, spanish: '\u00BFDe qu\u00E9 cuant\u00EDa estamos hablando? Necesitar\u00EDamos ciertas garant\u00EDas de que se ejecutar\u00E1 en plazo.', english: 'What amount are we talking about? We would need certain guarantees that it will be executed on time.' },
      { speaker: 0, spanish: 'Proponemos el sesenta por ciento de la indemnizaci\u00F3n reclamada, pagadero en tres plazos trimestrales.', english: 'We propose sixty percent of the claimed indemnification, payable in three quarterly installments.' },
      { speaker: 1, spanish: 'Es insuficiente. Nuestro cliente sufri\u00F3 un lucro cesante considerable. No aceptar\u00EDamos menos del ochenta por ciento.', english: 'That is insufficient. Our client suffered considerable lost profits. We would not accept less than eighty percent.' },
      { speaker: 0, spanish: 'El lucro cesante que alegan no est\u00E1 plenamente documentado. Estamos siendo generosos con esa oferta.', english: 'The lost profits you allege are not fully documented. We are being generous with that offer.' },
      { speaker: 1, spanish: 'Tenemos informes periciales que lo acreditan. Nos reservamos el derecho de presentarlos ante el tribunal si no hay acuerdo.', english: 'We have expert reports that substantiate it. We reserve the right to present them before the court if there is no agreement.' },
      { speaker: 0, spanish: 'Hagamos una contrapropuesta: setenta y cinco por ciento, a cambio de una cl\u00E1usula de confidencialidad y renuncia a futuras reclamaciones.', english: 'Let us make a counterproposal: seventy-five percent, in exchange for a confidentiality clause and waiver of future claims.' },
      { speaker: 1, spanish: 'La confidencialidad es aceptable. La renuncia a futuras reclamaciones, solo si se circunscribe a los hechos objeto de esta mediaci\u00F3n.', english: 'Confidentiality is acceptable. The waiver of future claims, only if it is limited to the facts that are the subject of this mediation.' },
      { speaker: 0, spanish: 'De acuerdo. Bajo estas premisas, creo que podemos redactar un acuerdo satisfactorio para ambas partes.', english: 'Agreed. Under these premises, I believe we can draft an agreement satisfactory to both parties.' },
      { speaker: 1, spanish: 'Nuestro departamento jur\u00EDdico revisar\u00E1 el borrador. Si todo est\u00E1 en orden, procederemos a la firma en un plazo de setenta y dos horas.', english: 'Our legal department will review the draft. If everything is in order, we will proceed to sign within seventy-two hours.' },
    ],
    vocab: [
      { word: 'mediaci\u00F3n', english: 'mediation' },
      { word: 'cl\u00E1usula de indemnizaci\u00F3n', english: 'indemnification clause' },
      { word: 'jurisprudencia', english: 'case law / jurisprudence' },
      { word: 'lucro cesante', english: 'lost profits / loss of earnings' },
      { word: 'informes periciales', english: 'expert reports' },
      { word: 'cl\u00E1usula de confidencialidad', english: 'confidentiality clause / NDA' },
      { word: 'renuncia a reclamaciones', english: 'waiver of claims' },
      { word: 'borrador', english: 'draft (document)' },
    ],
    quiz: [
      { prompt: 'What does "lucro cesante" mean?', options: ['Profit margin', 'Lost profits / loss of earnings', 'Net income', 'Tax deduction'], correct: 1 , explanation: "\"Lucro\" means profit and \"cesante\" means ceasing. This legal term refers to income or profits lost due to another party's breach or wrongful action, and is a key concept in damages claims." },
      { prompt: 'What is "jurisprudencia"?', options: ['Legal advice', 'Case law / jurisprudence', 'A jury', 'Legal fees'], correct: 1 , explanation: "\"Jurisprudencia\" refers to the body of court decisions that interpret law and serve as precedent for future cases. It is a cornerstone of legal argumentation in civil and common law systems." },
      { prompt: 'What does "Nos reservamos el derecho de..." mean?', options: ['We give up the right to...', 'We reserve the right to...', 'We demand the right to...', 'We share the right to...'], correct: 1 , explanation: "\"Reservarse\" means to keep or retain for oneself, and \"derecho\" means right. This formal legal phrase indicates that a party is preserving their option to take future action without committing to it now." },
    ],
  },

  // ============================================================
  // 21. SEMINARIO DE AN\u00C1LISIS LITERARIO (C2)
  // ============================================================
  {
    id: 'seminario-literario-c2',
    title: 'Seminario de An\u00E1lisis Literario',
    titleEn: 'Literary Analysis Seminar',
    icon: '\uD83D\uDCDA',
    desc: 'Discuss a novel in a graduate-level literary seminar',
    level: 'C2',
    speakers: [
      { name: 'Catedr\u00E1tico', nameEn: 'Professor', role: 'npc' },
      { name: 'T\u00FA', nameEn: 'You', role: 'player' },
      { name: 'Compa\u00F1era', nameEn: 'Classmate', role: 'npc' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Hoy analizaremos "Pedro P\u00E1ramo" de Juan Rulfo. Es una obra que trasciende su \u00E9poca. \u00BFQu\u00E9 les pareci\u00F3 la estructura narrativa?', english: 'Today we will analyze "Pedro P\u00E1ramo" by Juan Rulfo. It is a work that transcends its era. What did you think of the narrative structure?' },
      { speaker: 1, spanish: 'Lo que m\u00E1s me impact\u00F3 fue la fragmentaci\u00F3n temporal. El autor emplea un recurso narrativo innovador al disolver las fronteras entre vivos y muertos.', english: 'What struck me most was the temporal fragmentation. The author employs an innovative narrative device by dissolving the boundaries between the living and the dead.' },
      { speaker: 2, spanish: 'Coincido. Adem\u00E1s, el narrador no es del todo fiable. Juan Preciado llega a Comala buscando a su padre, pero lo que encuentra es un pueblo de fantasmas y ecos.', english: 'I agree. Furthermore, the narrator is not entirely reliable. Juan Preciado arrives in Comala looking for his father, but what he finds is a town of ghosts and echoes.' },
      { speaker: 0, spanish: 'Excelente observaci\u00F3n. \u00BFY qu\u00E9 papel desempe\u00F1a el paisaje en la construcci\u00F3n del sentido?', english: 'Excellent observation. And what role does the landscape play in the construction of meaning?' },
      { speaker: 1, spanish: 'El paisaje \u00E1rido y desolado funciona como met\u00E1fora central de la muerte y el abandono. Comala es a la vez un lugar f\u00EDsico y un estado del alma.', english: 'The arid, desolate landscape functions as a central metaphor for death and abandonment. Comala is both a physical place and a state of the soul.' },
      { speaker: 2, spanish: 'Subyace tambi\u00E9n una cr\u00EDtica social en el texto. Pedro P\u00E1ramo encarna el caciquismo que devast\u00F3 el M\u00E9xico rural.', english: 'There is also an underlying social critique in the text. Pedro P\u00E1ramo embodies the political bossism that devastated rural Mexico.' },
      { speaker: 0, spanish: '\u00BFDir\u00EDan que se percibe una influencia del realismo m\u00E1gico, o es algo distinto?', english: 'Would you say that an influence of magical realism is perceived, or is it something different?' },
      { speaker: 1, spanish: 'Yo dir\u00EDa que Rulfo precede al realismo m\u00E1gico y lo trasciende. Su prosa destaca por una austeridad l\u00E9xica que contrasta con la exuberancia de Garc\u00EDa M\u00E1rquez.', english: 'I would say that Rulfo precedes magical realism and transcends it. His prose stands out for a lexical austerity that contrasts with the exuberance of Garc\u00EDa M\u00E1rquez.' },
      { speaker: 2, spanish: 'El estilo oscila entre lo l\u00EDrico y lo prosaico. Hay pasajes de una belleza desgarradora junto a di\u00E1logos de una crudeza absoluta.', english: 'The style oscillates between the lyrical and the prosaic. There are passages of heartbreaking beauty alongside dialogues of absolute rawness.' },
      { speaker: 0, spanish: 'Hablemos del desenlace. \u00BFPor qu\u00E9 resulta tan ambiguo?', english: 'Let us talk about the ending. Why is it so ambiguous?' },
      { speaker: 1, spanish: 'Porque la muerte de Pedro P\u00E1ramo no es un cierre sino una disoluci\u00F3n. Se desmorona "como si fuera un mont\u00F3n de piedras". El simbolismo de ese pasaje es notable.', english: 'Because Pedro P\u00E1ramo\u2019s death is not a closure but a dissolution. He crumbles "as if he were a pile of stones." The symbolism of that passage is notable.' },
      { speaker: 2, spanish: 'La intertextualidad tambi\u00E9n enriquece la lectura. Hay ecos de la "Divina Comedia" en el descenso de Juan Preciado a ese infierno mexicano.', english: 'Intertextuality also enriches the reading. There are echoes of the "Divine Comedy" in Juan Preciado\u2019s descent into that Mexican inferno.' },
      { speaker: 0, spanish: 'Hay una tensi\u00F3n constante entre lo individual y lo colectivo. \u00BFEs Pedro P\u00E1ramo un individuo o la encarnaci\u00F3n de un sistema?', english: 'There is a constant tension between the individual and the collective. Is Pedro P\u00E1ramo an individual or the embodiment of a system?' },
      { speaker: 1, spanish: 'Ambas cosas a la vez, y ah\u00ED radica la grandeza de la obra. El personaje experimenta una transformaci\u00F3n profunda que espeja la del pa\u00EDs entero.', english: 'Both at the same time, and therein lies the greatness of the work. The character undergoes a profound transformation that mirrors that of the entire country.' },
      { speaker: 0, spanish: 'Magistral an\u00E1lisis. Quedan abiertas varias l\u00EDneas de investigaci\u00F3n. Para la pr\u00F3xima sesi\u00F3n, lean "El llano en llamas" y comparen la t\u00E9cnica narrativa.', english: 'Masterful analysis. Several lines of research remain open. For the next session, read "El llano en llamas" and compare the narrative technique.' },
    ],
    vocab: [
      { word: 'fragmentaci\u00F3n temporal', english: 'temporal fragmentation' },
      { word: 'caciquismo', english: 'political bossism / strongman rule' },
      { word: 'austeridad l\u00E9xica', english: 'lexical austerity' },
      { word: 'intertextualidad', english: 'intertextuality' },
      { word: 'desenlace', english: 'ending / denouement' },
      { word: 'met\u00E1fora central', english: 'central metaphor' },
      { word: 'narrador no fiable', english: 'unreliable narrator' },
    ],
    quiz: [
      { prompt: 'What does "caciquismo" refer to?', options: ['A literary genre', 'Political bossism / strongman rule', 'A type of dance', 'Agricultural practice'], correct: 1 , explanation: "\"Caciquismo\" derives from \"cacique\" (indigenous chief) and describes a system of political bossism where local strongmen wield disproportionate power, particularly associated with rural Latin America and 19th-century Spain." },
      { prompt: 'What is "intertextualidad"?', options: ['Translating between languages', 'References and connections between literary works', 'Writing in multiple genres', 'A type of footnote'], correct: 1 , explanation: "\"Intertextualidad\" describes the relationship between texts where one work references, echoes, or builds upon another. It enriches literary meaning through cross-textual connections and allusions." },
      { prompt: 'What does "desenlace" mean in literary analysis?', options: ['Introduction', 'Climax', 'Ending / denouement', 'Setting'], correct: 2 , explanation: "\"Desenlace\" comes from \"desenlazar\" (to untie) and refers to the resolution or denouement of a narrative, where plot threads are resolved and the story reaches its conclusion." },
    ],
  },

  // ============================================================
  // 22. DEBATE MEDIOAMBIENTAL (C1)
  // ============================================================
  {
    id: 'debate-medioambiental-c1',
    title: 'Debate Medioambiental',
    titleEn: 'Environmental Policy Debate',
    icon: '🌿',
    desc: 'Debate urban environmental policy with a city councilwoman',
    level: 'C1',
    speakers: [
      { name: 'Concejala Reyes', nameEn: 'Councilwoman Reyes', role: 'npc' },
      { name: 'Tú', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenas tardes. Antes de que entremos en materia, quisiera subrayar que el ayuntamiento ha aprobado un plan de reducción de emisiones de carbono del treinta por ciento para 2030. ¿Considera usted que esa meta es suficiente?', english: 'Good afternoon. Before we get into the matter, I would like to emphasize that the city council has approved a plan to reduce carbon emissions by thirty percent by 2030. Do you consider that target sufficient?' },
      { speaker: 1, spanish: 'Con todo respeto, concejala, considero que se queda corto. Los informes del IPCC sugieren que necesitamos reducciones del cincuenta por ciento para evitar los escenarios más catastróficos. Deberíamos ser más ambiciosos.', english: 'With all due respect, councilwoman, I believe it falls short. IPCC reports suggest we need fifty percent reductions to avoid the most catastrophic scenarios. We should be more ambitious.' },
      { speaker: 0, spanish: 'Entiendo su postura, pero debemos equilibrar la sostenibilidad con la viabilidad económica. Una transición demasiado abrupta podría perjudicar a los sectores industriales que sostienen el empleo en nuestra ciudad.', english: 'I understand your position, but we must balance sustainability with economic viability. A transition that is too abrupt could harm the industrial sectors that sustain employment in our city.' },
      { speaker: 1, spanish: 'Precisamente ahí discrepo. La inversión en energías renovables no destruye empleo, sino que lo transforma. Alemania ha demostrado que la transición energética puede ser un motor económico si se gestiona adecuadamente.', english: 'That is precisely where I disagree. Investment in renewable energy does not destroy jobs; rather, it transforms them. Germany has shown that the energy transition can be an economic driver if managed properly.' },
      { speaker: 0, spanish: 'Es un argumento válido, aunque no del todo extrapolable a nuestro contexto. Nuestro tejido industrial es muy distinto al alemán. ¿Qué medidas concretas propondría usted para la planificación urbana?', english: 'That is a valid argument, though not entirely applicable to our context. Our industrial fabric is very different from Germany\'s. What concrete measures would you propose for urban planning?' },
      { speaker: 1, spanish: 'En primer lugar, habría que ampliar la red de carriles bici y restringir el tráfico privado en el centro. En segundo lugar, propondría incentivos fiscales para la rehabilitación energética de edificios antiguos.', english: 'First of all, the bicycle lane network should be expanded and private traffic restricted in the city center. Secondly, I would propose tax incentives for the energy renovation of old buildings.' },
      { speaker: 0, spanish: 'La restricción del tráfico es una cuestión políticamente delicada. Hemos recibido fuertes críticas de las asociaciones de comerciantes que temen una caída de ventas.', english: 'Traffic restriction is a politically sensitive issue. We have received strong criticism from merchant associations that fear a drop in sales.' },
      { speaker: 1, spanish: 'Sin embargo, los datos de ciudades como Pontevedra y Barcelona demuestran que la peatonalización incrementa el comercio local a medio plazo. El miedo al cambio no debería paralizar la acción política.', english: 'However, data from cities like Pontevedra and Barcelona show that pedestrianization increases local commerce in the medium term. Fear of change should not paralyze political action.' },
      { speaker: 0, spanish: 'Tiene razón en que los datos respaldan esa tesis. No obstante, ¿cómo abordamos la cuestión de las emisiones industriales, que representan el cuarenta por ciento de nuestra huella de carbono?', english: 'You are right that the data supports that thesis. However, how do we address the issue of industrial emissions, which represent forty percent of our carbon footprint?' },
      { speaker: 1, spanish: 'Propondría establecer un sistema de auditorías ambientales obligatorias y sanciones progresivas para las empresas que excedan los límites de emisión. Además, se podrían crear fondos de ayuda para que las pymes adopten tecnologías limpias.', english: 'I would propose establishing a system of mandatory environmental audits and progressive penalties for companies that exceed emission limits. Additionally, aid funds could be created to help SMEs adopt clean technologies.' },
      { speaker: 0, spanish: 'Es una propuesta razonable. Reconozco que debemos acelerar el ritmo. ¿Estaría dispuesto a participar en la comisión de medio ambiente para asesorarnos en la elaboración de estas políticas?', english: 'That is a reasonable proposal. I acknowledge that we need to accelerate the pace. Would you be willing to participate in the environmental committee to advise us in developing these policies?' },
      { speaker: 1, spanish: 'Por supuesto. Creo firmemente en que la colaboración entre la sociedad civil y las instituciones es la única vía para lograr una transición ecológica justa y eficaz. Cuente con mi compromiso.', english: 'Of course. I firmly believe that collaboration between civil society and institutions is the only way to achieve a just and effective ecological transition. Count on my commitment.' },
    ],
    vocab: [
      { word: 'emisiones de carbono', english: 'carbon emissions' },
      { word: 'sostenibilidad', english: 'sustainability' },
      { word: 'viabilidad económica', english: 'economic viability' },
      { word: 'planificación urbana', english: 'urban planning' },
      { word: 'peatonalización', english: 'pedestrianization' },
      { word: 'huella de carbono', english: 'carbon footprint' },
      { word: 'auditoría ambiental', english: 'environmental audit' },
      { word: 'transición ecológica', english: 'ecological transition' },
    ],
    quiz: [
      { prompt: 'What does "viabilidad económica" mean?', options: ['Economic crisis', 'Economic viability', 'Economic development', 'Economic inequality'], correct: 1, explanation: "\"Viabilidad\" comes from \"viable\" (feasible/viable) and refers to the quality of being economically practical or achievable. It is commonly used in policy debates to weigh environmental goals against economic realities." },
      { prompt: 'What does "peatonalización" refer to?', options: ['Building highways', 'Pedestrianization of streets', 'Public transport expansion', 'Parking construction'], correct: 1, explanation: "\"Peatonalización\" derives from \"peatón\" (pedestrian) and refers to the process of converting streets into pedestrian-only zones, a key urban planning strategy for reducing emissions and improving city livability." },
      { prompt: 'What is a "huella de carbono"?', options: ['A carbon tax', 'A carbon footprint', 'A carbon credit', 'A carbon filter'], correct: 1, explanation: "\"Huella de carbono\" literally translates to \"carbon footprint\" and measures the total greenhouse gas emissions caused by an individual, organization, or city. \"Huella\" means footprint or trace." },
    ],
  },

  // ============================================================
  // 23. CONSULTA MÉDICA (C1)
  // ============================================================
  {
    id: 'consulta-medica-c1',
    title: 'Consulta Médica Especializada',
    titleEn: 'Specialist Medical Consultation',
    icon: '🏥',
    desc: 'Describe complex symptoms to a specialist and discuss treatment options',
    level: 'C1',
    speakers: [
      { name: 'Dra. Navarro', nameEn: 'Dr. Navarro', role: 'npc' },
      { name: 'Tú', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Buenos días. Soy la doctora Navarro, especialista en neurología. He revisado el informe de su médico de cabecera. Cuénteme, ¿cuándo comenzaron los síntomas exactamente?', english: 'Good morning. I am Dr. Navarro, a neurology specialist. I have reviewed the report from your general practitioner. Tell me, when exactly did the symptoms begin?' },
      { speaker: 1, spanish: 'Hace aproximadamente tres meses empecé a notar un hormigueo persistente en las extremidades superiores, sobre todo al despertar. Al principio lo atribuí al estrés, pero ha ido en aumento.', english: 'Approximately three months ago I began to notice a persistent tingling in my upper extremities, especially upon waking. At first I attributed it to stress, but it has been increasing.' },
      { speaker: 0, spanish: '¿El hormigueo se localiza en alguna zona específica de las manos o se extiende por todo el brazo? ¿Ha notado pérdida de fuerza o dificultad para agarrar objetos?', english: 'Is the tingling localized in a specific area of the hands, or does it extend throughout the entire arm? Have you noticed any loss of strength or difficulty gripping objects?' },
      { speaker: 1, spanish: 'Se concentra principalmente en los dedos índice, corazón y pulgar de ambas manos. En cuanto a la fuerza, sí he notado que se me caen objetos con más frecuencia de lo habitual, especialmente por las mañanas.', english: 'It is concentrated mainly in the index, middle, and thumb fingers of both hands. As for strength, yes, I have noticed that I drop objects more frequently than usual, especially in the mornings.' },
      { speaker: 0, spanish: 'Entiendo. La distribución que describe es bastante indicativa. ¿Tiene usted antecedentes familiares de enfermedades neurológicas o autoinmunes?', english: 'I see. The distribution you describe is quite indicative. Do you have any family history of neurological or autoimmune diseases?' },
      { speaker: 1, spanish: 'Mi madre fue diagnosticada con artritis reumatoide a los cincuenta años, y un tío paterno padeció esclerosis múltiple. ¿Podría haber un componente hereditario?', english: 'My mother was diagnosed with rheumatoid arthritis at fifty, and a paternal uncle suffered from multiple sclerosis. Could there be a hereditary component?' },
      { speaker: 0, spanish: 'Los antecedentes autoinmunes familiares son relevantes, aunque no determinantes. Voy a solicitar una electromiografía y una resonancia magnética cervical para descartar un síndrome del túnel carpiano bilateral o una posible radiculopatía cervical.', english: 'The family autoimmune history is relevant, though not determinative. I am going to request an electromyography and a cervical MRI to rule out bilateral carpal tunnel syndrome or a possible cervical radiculopathy.' },
      { speaker: 1, spanish: '¿En qué consiste la electromiografía? Le confieso que me genera cierta aprensión someterme a pruebas invasivas.', english: 'What does the electromyography involve? I confess that I feel some apprehension about undergoing invasive tests.' },
      { speaker: 0, spanish: 'Es comprensible. La electromiografía mide la actividad eléctrica de los músculos y los nervios mediante pequeños impulsos. Puede resultar levemente molesta, pero no es dolorosa en sentido estricto y es fundamental para un diagnóstico preciso.', english: 'That is understandable. The electromyography measures the electrical activity of the muscles and nerves through small impulses. It may be slightly uncomfortable, but it is not painful in the strict sense, and it is essential for an accurate diagnosis.' },
      { speaker: 1, spanish: 'De acuerdo. ¿Y mientras esperamos los resultados, hay algo que pueda hacer para aliviar las molestias? El hormigueo nocturno me impide conciliar el sueño adecuadamente.', english: 'All right. And while we wait for the results, is there anything I can do to relieve the discomfort? The nighttime tingling prevents me from falling asleep properly.' },
      { speaker: 0, spanish: 'Le recetaré un antiinflamatorio no esteroideo y una férula nocturna para mantener las muñecas en posición neutra. Además, le recomiendo evitar movimientos repetitivos y aplicar frío local cuando sienta las molestias más intensas.', english: 'I will prescribe a nonsteroidal anti-inflammatory and a nighttime splint to keep the wrists in a neutral position. Additionally, I recommend avoiding repetitive movements and applying local cold when you feel the discomfort more intensely.' },
      { speaker: 1, spanish: 'Perfecto, doctora. Agradezco mucho su exhaustividad. ¿Cuándo debería volver para revisar los resultados y valorar el siguiente paso del tratamiento?', english: 'Perfect, doctor. I greatly appreciate your thoroughness. When should I return to review the results and assess the next step in the treatment?' },
    ],
    vocab: [
      { word: 'hormigueo', english: 'tingling / pins and needles' },
      { word: 'extremidades superiores', english: 'upper extremities / arms' },
      { word: 'antecedentes familiares', english: 'family medical history' },
      { word: 'electromiografía', english: 'electromyography (EMG)' },
      { word: 'radiculopatía cervical', english: 'cervical radiculopathy' },
      { word: 'férula nocturna', english: 'nighttime splint' },
      { word: 'antiinflamatorio no esteroideo', english: 'nonsteroidal anti-inflammatory (NSAID)' },
      { word: 'conciliar el sueño', english: 'to fall asleep' },
    ],
    quiz: [
      { prompt: 'What does "hormigueo" mean?', options: ['Swelling', 'Bruising', 'Tingling / pins and needles', 'Itching'], correct: 2, explanation: "\"Hormigueo\" derives from \"hormiga\" (ant) and describes the sensation of tingling or pins and needles, as if ants were crawling on the skin. It is a key term in neurological consultations." },
      { prompt: 'What are "antecedentes familiares"?', options: ['Family traditions', 'Family medical history', 'Previous treatments', 'Genetic mutations'], correct: 1, explanation: "\"Antecedentes familiares\" literally means \"family antecedents\" and refers to the medical history of a patient's blood relatives. Doctors ask about them to identify hereditary risk factors." },
      { prompt: 'What is a "férula nocturna"?', options: ['A sleeping pill', 'A nighttime splint', 'A type of bandage', 'A heating pad'], correct: 1, explanation: "\"Férula\" means splint or brace, and \"nocturna\" means nighttime. A \"férula nocturna\" is a device worn while sleeping to immobilize a joint in a neutral position, commonly used for carpal tunnel syndrome." },
    ],
  },

  // ============================================================
  // 24. TERTULIA LITERARIA (C2)
  // ============================================================
  {
    id: 'tertulia-literaria-c2',
    title: 'Tertulia Literaria',
    titleEn: 'Literary Salon Discussion',
    icon: '🎭',
    desc: 'Discuss narrative technique and literary tradition with a literary critic',
    level: 'C2',
    speakers: [
      { name: 'Crítico Mendoza', nameEn: 'Critic Mendoza', role: 'npc' },
      { name: 'Tú', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'He leído su última novela con sumo detenimiento. Me parece que hay una tensión deliberada entre la voz narrativa y la estructura fragmentaria. ¿Pretendía usted socavar la linealidad del relato convencional?', english: 'I have read your latest novel with great care. It seems to me there is a deliberate tension between the narrative voice and the fragmentary structure. Did you intend to undermine the linearity of the conventional narrative?' },
      { speaker: 1, spanish: 'En efecto. Me interesaba explorar cómo la memoria no opera de manera cronológica, sino por constelaciones de imágenes y afectos. El hilo argumental, si es que lo hay, se subordina a esa lógica emocional.', english: 'Indeed. I was interested in exploring how memory does not operate chronologically but through constellations of images and affects. The plot thread, if there is one, is subordinated to that emotional logic.' },
      { speaker: 0, spanish: 'Percibo ecos de Proust en ese planteamiento, aunque tamizados por una sensibilidad inequívocamente latinoamericana. ¿Reconoce usted esa filiación o le resulta reduccionista?', english: 'I perceive echoes of Proust in that approach, though filtered through an unmistakably Latin American sensibility. Do you acknowledge that affiliation, or do you find it reductive?' },
      { speaker: 1, spanish: 'Toda filiación es a la vez justa e insuficiente. Proust está ahí, sin duda, pero también lo están María Luisa Bombal y Felisberto Hernández. Mi genealogía literaria es más mestiza de lo que parece a simple vista.', english: 'Every affiliation is at once fair and insufficient. Proust is there, without a doubt, but so are María Luisa Bombal and Felisberto Hernández. My literary genealogy is more hybrid than it appears at first glance.' },
      { speaker: 0, spanish: 'Fascinante. Hay un pasaje en el capítulo séptimo donde el protagonista se desdobla en una suerte de alter ego onírico. ¿Podríamos hablar de una poética del doble?', english: 'Fascinating. There is a passage in the seventh chapter where the protagonist splits into a sort of dreamlike alter ego. Could we speak of a poetics of the double?' },
      { speaker: 1, spanish: 'Más que del doble, yo hablaría de una poética del espejismo. El personaje no se duplica; se difumina. La identidad en mi narrativa es siempre provisional, una construcción que se deshace en cuanto uno la examina de cerca.', english: 'Rather than of the double, I would speak of a poetics of the mirage. The character does not duplicate; he blurs. Identity in my narrative is always provisional, a construction that unravels the moment one examines it closely.' },
      { speaker: 0, spanish: 'Esa noción conecta con ciertos postulados del posmodernismo: la muerte del sujeto unitario, la desconfianza hacia las grandes narrativas. ¿Se considera usted un escritor posmoderno?', english: 'That notion connects with certain postmodernist postulates: the death of the unitary subject, the distrust of grand narratives. Do you consider yourself a postmodern writer?' },
      { speaker: 1, spanish: 'Las etiquetas me producen una incomodidad casi física. Diría que bebo de esas aguas sin ahogarme en ellas. Mi escritura aspira a desbordar las categorías, no a confirmarlas. Si hay posmodernismo, es un posmodernismo a regañadientes.', english: 'Labels make me feel an almost physical discomfort. I would say I drink from those waters without drowning in them. My writing aspires to overflow categories, not to confirm them. If there is postmodernism, it is a reluctant postmodernism.' },
      { speaker: 0, spanish: 'Hablando de desbordar categorías, su uso del lenguaje es particularmente llamativo. Hay neologismos, rupturas sintácticas, incluso pasajes que rozan la prosa poética. ¿Hasta qué punto es eso una estrategia consciente?', english: 'Speaking of overflowing categories, your use of language is particularly striking. There are neologisms, syntactic ruptures, even passages that border on prose poetry. To what extent is that a conscious strategy?' },
      { speaker: 1, spanish: 'Es consciente en la medida en que reviso obsesivamente cada frase, pero no parte de un programa teórico previo. Escribo al oído, como un músico que afina su instrumento en busca de un timbre que aún no existe. La lengua es materia viva, y yo intento dejarla respirar.', english: 'It is conscious insofar as I obsessively revise every sentence, but it does not stem from a prior theoretical program. I write by ear, like a musician tuning an instrument in search of a timbre that does not yet exist. Language is living matter, and I try to let it breathe.' },
      { speaker: 0, spanish: 'Permítame abordar el desenlace, que me dejó deliberadamente insatisfecho. El protagonista desaparece sin resolución alguna. ¿Es una provocación al lector o una declaración de principios narrativos?', english: 'Allow me to address the ending, which left me deliberately unsatisfied. The protagonist vanishes without any resolution. Is it a provocation to the reader or a declaration of narrative principles?' },
      { speaker: 1, spanish: 'Ambas cosas, y ninguna. Quise que el lector experimentase la misma incertidumbre que el personaje. Cerrar la historia habría sido traicionarla. A veces la honestidad narrativa exige dejar las heridas abiertas.', english: 'Both, and neither. I wanted the reader to experience the same uncertainty as the character. Closing the story would have been to betray it. Sometimes narrative honesty demands leaving the wounds open.' },
      { speaker: 0, spanish: 'Hay quienes le reprocharán esa apertura radical. La crítica convencional sigue anclada en la expectativa del cierre aristotélico.', english: 'There will be those who reproach you for that radical openness. Conventional criticism remains anchored in the expectation of Aristotelian closure.' },
      { speaker: 1, spanish: 'Que me lo reprochen. La literatura que vale la pena siempre incomoda. Prefiero un lector desconcertado que piensa a un lector satisfecho que olvida. Al fin y al cabo, la buena literatura no da respuestas; formula las preguntas que nadie se atrevía a hacer.', english: 'Let them reproach me. Literature that is worthwhile always unsettles. I prefer a bewildered reader who thinks to a satisfied reader who forgets. After all, good literature does not give answers; it formulates the questions no one dared to ask.' },
    ],
    vocab: [
      { word: 'socavar', english: 'to undermine / to subvert' },
      { word: 'filiación', english: 'affiliation / lineage' },
      { word: 'poética del espejismo', english: 'poetics of the mirage' },
      { word: 'neologismo', english: 'neologism (newly coined word)' },
      { word: 'ruptura sintáctica', english: 'syntactic rupture / break' },
      { word: 'a regañadientes', english: 'reluctantly / grudgingly' },
      { word: 'desenlace', english: 'ending / denouement' },
      { word: 'prosa poética', english: 'prose poetry' },
    ],
    quiz: [
      { prompt: 'What does "socavar" mean?', options: ['To build upon', 'To undermine / subvert', 'To celebrate', 'To describe'], correct: 1, explanation: "\"Socavar\" literally means to dig underneath (\"so-\" under + \"cavar\" to dig) and figuratively means to undermine or subvert. In literary criticism it often describes how a text challenges or destabilizes conventional structures." },
      { prompt: 'What does the expression "a regañadientes" mean?', options: ['Enthusiastically', 'Reluctantly / grudgingly', 'Intellectually', 'Poetically'], correct: 1, explanation: "\"A regañadientes\" literally evokes someone gritting their teeth (\"regañar\" + \"dientes\") and means doing something reluctantly or grudgingly. It is a highly idiomatic expression common in elevated Spanish." },
      { prompt: 'What is a "neologismo"?', options: ['An ancient word', 'A grammatical error', 'A newly coined word', 'A foreign loanword'], correct: 2, explanation: "\"Neologismo\" comes from Greek \"neo-\" (new) and \"logos\" (word). It refers to a newly created word or expression, or an existing word used with a new meaning. Writers often create neologisms to expand the expressive capacity of language." },
    ],
  },

  // ============================================================
  // 25. MEDIACIÓN DIPLOMÁTICA (C2)
  // ============================================================
  {
    id: 'mediacion-diplomatica-c2',
    title: 'Mediación Diplomática',
    titleEn: 'Diplomatic Mediation',
    icon: '🕊️',
    desc: 'Negotiate a treaty in ultra-formal diplomatic register with an ambassador',
    level: 'C2',
    speakers: [
      { name: 'Embajador Castillo', nameEn: 'Ambassador Castillo', role: 'npc' },
      { name: 'Tú', nameEn: 'You', role: 'player' },
    ],
    dialogue: [
      { speaker: 0, spanish: 'Excelentísimo señor ministro, permítame expresarle mi gratitud por acceder a esta reunión extraordinaria. Las circunstancias que nos convocan revisten una gravedad que no admite dilación alguna.', english: 'Most Excellent Minister, allow me to express my gratitude for agreeing to this extraordinary meeting. The circumstances that bring us together are of a gravity that admits no delay whatsoever.' },
      { speaker: 1, spanish: 'El agradecimiento es mutuo, señor embajador. Mi gobierno comparte plenamente la urgencia que usted señala. Confiamos en que el diálogo constructivo nos permita alcanzar un acuerdo que preserve los intereses legítimos de ambas naciones.', english: 'The gratitude is mutual, Mr. Ambassador. My government fully shares the urgency you point out. We trust that constructive dialogue will allow us to reach an agreement that preserves the legitimate interests of both nations.' },
      { speaker: 0, spanish: 'Como punto de partida, mi gobierno desea reiterar su adhesión inquebrantable a los principios del derecho internacional y a la resolución pacífica de controversias. Dicho esto, la cuestión fronteriza exige una renegociación del tratado vigente.', english: 'As a starting point, my government wishes to reiterate its unwavering adherence to the principles of international law and the peaceful resolution of disputes. That said, the border issue demands a renegotiation of the current treaty.' },
      { speaker: 1, spanish: 'Tomamos nota de su posición. No obstante, quisiera matizar que cualquier renegociación ha de respetar el acervo jurídico acumulado y los precedentes sentados por el Tribunal Internacional de Justicia.', english: 'We take note of your position. Nevertheless, I would like to clarify that any renegotiation must respect the accumulated body of law and the precedents set by the International Court of Justice.' },
      { speaker: 0, spanish: 'Naturalmente. Nuestro propósito no es socavar el marco jurídico existente, sino actualizarlo a la luz de las nuevas realidades geopolíticas. Proponemos la creación de una comisión bilateral paritaria que examine las cláusulas susceptibles de revisión.', english: 'Naturally. Our purpose is not to undermine the existing legal framework but to update it in light of new geopolitical realities. We propose the creation of a bilateral commission with equal representation to examine the clauses subject to revision.' },
      { speaker: 1, spanish: 'La propuesta nos parece razonable en principio, siempre y cuando dicha comisión opere bajo la supervisión de un mediador designado de común acuerdo, preferiblemente bajo los auspicios de las Naciones Unidas.', english: 'The proposal seems reasonable to us in principle, provided that said commission operates under the supervision of a mutually agreed-upon mediator, preferably under the auspices of the United Nations.' },
      { speaker: 0, spanish: 'Aceptamos la figura del mediador. Sin embargo, insistimos en que el calendario de negociaciones no se prolongue indefinidamente. Propondríamos un plazo máximo de dieciocho meses para la conclusión de las deliberaciones.', english: 'We accept the figure of the mediator. However, we insist that the negotiation timeline not be extended indefinitely. We would propose a maximum period of eighteen months for the conclusion of deliberations.' },
      { speaker: 1, spanish: 'Dieciocho meses es un plazo ambicioso dada la complejidad de los asuntos en cuestión. Mi delegación estaría dispuesta a aceptarlo únicamente si se establecen cláusulas de salvaguardia que permitan prorrogar las negociaciones en caso de fuerza mayor.', english: 'Eighteen months is an ambitious timeframe given the complexity of the matters at hand. My delegation would be willing to accept it only if safeguard clauses are established that allow for an extension of negotiations in cases of force majeure.' },
      { speaker: 0, spanish: 'Concedemos ese punto. Permítame ahora abordar la cuestión de los recursos naturales compartidos. Es imperativo que el nuevo acuerdo contemple mecanismos equitativos de explotación y distribución de los recursos hídricos transfronterizos.', english: 'We concede that point. Allow me now to address the question of shared natural resources. It is imperative that the new agreement include equitable mechanisms for the exploitation and distribution of transboundary water resources.' },
      { speaker: 1, spanish: 'Coincidimos plenamente en esa necesidad. Nuestra propuesta incluye la creación de una autoridad conjunta de gestión hídrica, dotada de competencias vinculantes y financiada proporcionalmente por ambos estados.', english: 'We fully agree on that need. Our proposal includes the creation of a joint water management authority, endowed with binding powers and funded proportionally by both states.' },
      { speaker: 0, spanish: 'Es una propuesta constructiva. Quedaría pendiente definir los mecanismos de resolución de conflictos dentro de dicha autoridad. ¿Contemplaría su gobierno la inclusión de un arbitraje internacional obligatorio?', english: 'That is a constructive proposal. It would remain to define the conflict resolution mechanisms within said authority. Would your government consider the inclusion of mandatory international arbitration?' },
      { speaker: 1, spanish: 'El arbitraje internacional obligatorio es aceptable, siempre que ambas partes conserven el derecho de apelación ante la Corte Internacional de Justicia. La soberanía jurisdiccional de nuestros respectivos estados no debe verse menoscabada.', english: 'Mandatory international arbitration is acceptable, provided that both parties retain the right of appeal before the International Court of Justice. The jurisdictional sovereignty of our respective states must not be diminished.' },
      { speaker: 0, spanish: 'Entendido. Creo que hemos sentado las bases para un protocolo de entendimiento. Propongo que nuestros equipos jurídicos redacten un borrador de memorándum que recoja los puntos aquí acordados antes de la próxima sesión plenaria.', english: 'Understood. I believe we have laid the groundwork for a protocol of understanding. I propose that our legal teams draft a memorandum outline that captures the points agreed upon here before the next plenary session.' },
      { speaker: 1, spanish: 'Convenido. Instruiré a mi equipo para que se ponga en contacto con el suyo a la mayor brevedad. Permítame concluir reafirmando la voluntad inequívoca de mi gobierno de alcanzar un acuerdo duradero, fundamentado en la equidad y el respeto mutuo.', english: 'Agreed. I will instruct my team to contact yours at the earliest opportunity. Allow me to conclude by reaffirming the unequivocal will of my government to reach a lasting agreement, grounded in equity and mutual respect.' },
    ],
    vocab: [
      { word: 'adhesión inquebrantable', english: 'unwavering adherence' },
      { word: 'acervo jurídico', english: 'accumulated body of law / legal heritage' },
      { word: 'cláusula de salvaguardia', english: 'safeguard clause' },
      { word: 'fuerza mayor', english: 'force majeure / unforeseeable circumstances' },
      { word: 'recursos hídricos transfronterizos', english: 'transboundary water resources' },
      { word: 'competencias vinculantes', english: 'binding powers / authority' },
      { word: 'soberanía jurisdiccional', english: 'jurisdictional sovereignty' },
      { word: 'memorándum de entendimiento', english: 'memorandum of understanding' },
    ],
    quiz: [
      { prompt: 'What does "acervo jurídico" mean?', options: ['A legal dispute', 'Accumulated body of law / legal heritage', 'A court ruling', 'A legal representative'], correct: 1, explanation: "\"Acervo\" means a body of accumulated assets or heritage, and \"jurídico\" means legal. Together, \"acervo jurídico\" refers to the totality of laws, treaties, and legal precedents that form a legal tradition or framework." },
      { prompt: 'What is a "cláusula de salvaguardia"?', options: ['A penalty clause', 'A confidentiality agreement', 'A safeguard clause', 'A termination clause'], correct: 2, explanation: "\"Salvaguardia\" means safeguard or protection. A \"cláusula de salvaguardia\" is a contractual or treaty provision that protects parties against unforeseen circumstances, allowing for flexibility in exceptional situations." },
      { prompt: 'What does "competencias vinculantes" mean?', options: ['Competitive advantages', 'Binding powers / authority', 'Voluntary guidelines', 'Advisory opinions'], correct: 1, explanation: "\"Competencias\" here means powers or authority (not competitions), and \"vinculantes\" means binding (from \"vincular,\" to bind). Together they describe powers that produce legally obligatory results that parties must comply with." },
    ],
  },

];

// Make available for module systems and browser global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONVERSATIONS_DATA };
}
