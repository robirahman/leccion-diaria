// conversations.js - Spanish Dialogue Practice Database
// 15 role-play conversation scenarios for Spanish learners (A1-B1)

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
      { prompt: 'How do you say "table for two" in Spanish?', options: ['Mesa para dos', 'Dos mesas', 'Tabla para dos', 'Asiento para dos'], correct: 0 },
      { prompt: 'What does "\u00BFY para beber?" mean?', options: ['And to eat?', 'And to drink?', 'And for dessert?', 'And for later?'], correct: 1 },
      { prompt: 'How do you ask for the check?', options: ['La mesa, por favor', 'El men\u00FA, por favor', 'La cuenta, por favor', 'El dinero, por favor'], correct: 2 },
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
      { prompt: 'How do you say "I have a reservation" in Spanish?', options: ['Quiero una habitaci\u00F3n', 'Tengo una reservaci\u00F3n', 'Necesito un hotel', 'Busco una cama'], correct: 1 },
      { prompt: 'What does "habitaci\u00F3n doble" mean?', options: ['Single room', 'Double room', 'Suite', 'Shared room'], correct: 1 },
      { prompt: 'How do you ask "What time is breakfast?"', options: ['\u00BFD\u00F3nde es el desayuno?', '\u00BFCu\u00E1nto cuesta el desayuno?', '\u00BFA qu\u00E9 hora es el desayuno?', '\u00BFQu\u00E9 hay de desayuno?'], correct: 2 },
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
      { prompt: 'How do you ask "Can I try this on?"', options: ['Puedo comprar esto', '\u00BFPuedo probarme esto?', '\u00BFPuedo ver esto?', '\u00BFPuedo tocar esto?'], correct: 1 },
      { prompt: 'What does "Me queda bien" mean?', options: ['I like it', 'It fits me well', 'It looks good', 'I\u2019ll stay here'], correct: 1 },
      { prompt: 'How do you say "How much does it cost?"', options: ['\u00BFCu\u00E1ntos hay?', '\u00BFCu\u00E1ndo cierra?', '\u00BFCu\u00E1nto cuesta?', '\u00BFCu\u00E1l quiere?'], correct: 2 },
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
      { prompt: 'What is "tarjeta de embarque" in English?', options: ['Credit card', 'Boarding pass', 'ID card', 'Travel card'], correct: 1 },
      { prompt: 'How do you say "window seat"?', options: ['Asiento de pasillo', 'Asiento de ventanilla', 'Asiento de frente', 'Asiento de centro'], correct: 1 },
      { prompt: 'What does "facturar" mean in an airport context?', options: ['To invoice', 'To fly', 'To check luggage', 'To board'], correct: 2 },
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
      { prompt: 'How do you say "My head hurts"?', options: ['Tengo cabeza', 'Me duele la cabeza', 'Mi cabeza est\u00E1 mal', 'La cabeza me pasa'], correct: 1 },
      { prompt: 'What does "recetar" mean?', options: ['To rest', 'To prescribe', 'To recover', 'To examine'], correct: 1 },
      { prompt: 'How do you say "since three days ago"?', options: ['En tres d\u00EDas', 'Por tres d\u00EDas', 'Desde hace tres d\u00EDas', 'Hace de tres d\u00EDas'], correct: 2 },
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
      { prompt: 'How do you say "turn left"?', options: ['Siga recto', 'Gire a la izquierda', 'Gire a la derecha', 'Vaya abajo'], correct: 1 },
      { prompt: 'What does "cuadra" mean?', options: ['Square', 'Block', 'Corner', 'Street'], correct: 1 },
      { prompt: 'How do you ask "Is it far from here?"', options: ['\u00BFEst\u00E1 cerca?', '\u00BFEst\u00E1 aqu\u00ED?', '\u00BFEst\u00E1 lejos de aqu\u00ED?', '\u00BFD\u00F3nde queda?'], correct: 2 },
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
      { prompt: 'What does "\u00BFQu\u00E9 le pongo?" mean in a market context?', options: ['What are you wearing?', 'What can I get you?', 'What do you put?', 'Where do I put it?'], correct: 1 },
      { prompt: 'How do you ask the price of strawberries?', options: ['\u00BFCu\u00E1ntas fresas hay?', '\u00BFD\u00F3nde est\u00E1n las fresas?', '\u00BFA cu\u00E1nto est\u00E1n las fresas?', '\u00BFQu\u00E9 son las fresas?'], correct: 2 },
      { prompt: 'What does "medio kilo" mean?', options: ['One kilo', 'Half a kilo', 'Two kilos', 'A quarter kilo'], correct: 1 },
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
      { prompt: 'How do you say "Tell me about yourself"?', options: ['D\u00EDgame su nombre', 'Cu\u00E9nteme sobre usted', 'Pres\u00E9nteme su trabajo', 'H\u00E1bleme de su familia'], correct: 1 },
      { prompt: 'What does "expectativa salarial" mean?', options: ['Work schedule', 'Job title', 'Salary expectation', 'Work experience'], correct: 2 },
      { prompt: 'How do you say "I learn quickly"?', options: ['Trabajo mucho', 'Estudio siempre', 'Aprendo r\u00E1pido', 'Entiendo bien'], correct: 2 },
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
      { prompt: 'How do you say "stomachache"?', options: ['Dolor de garganta', 'Dolor de cabeza', 'Dolor de est\u00F3mago', 'Dolor de espalda'], correct: 2 },
      { prompt: 'What are "efectos secundarios"?', options: ['Main effects', 'Side effects', 'Secondary goals', 'Extra costs'], correct: 1 },
      { prompt: 'What does "tiritas" mean?', options: ['Vitamins', 'Tissues', 'Band-aids', 'Cotton balls'], correct: 2 },
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
      { prompt: 'How do you say "this weekend"?', options: ['Esta semana', 'Este fin de semana', 'El pr\u00F3ximo d\u00EDa', 'Este s\u00E1bado'], correct: 1 },
      { prompt: 'What does "\u00BFQu\u00E9 te parece si...?" mean?', options: ['What do you think about...?', 'How about if...?', 'Do you want to...?', 'Both A and B'], correct: 3 },
      { prompt: 'How do you say "See you Saturday!"?', options: ['Vamos el s\u00E1bado', 'Es s\u00E1bado', '\u00A1Hasta el s\u00E1bado!', 'Quiero el s\u00E1bado'], correct: 2 },
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
      { prompt: 'How do you say "I\u2019d like to open an account"?', options: ['Quiero cerrar una cuenta', 'Me gustar\u00EDa abrir una cuenta', 'Necesito ver mi cuenta', 'Voy a cambiar mi cuenta'], correct: 1 },
      { prompt: 'What does "saldo m\u00EDnimo" mean?', options: ['Maximum balance', 'Minimum balance', 'Final balance', 'Monthly payment'], correct: 1 },
      { prompt: 'What is "comisi\u00F3n" in English?', options: ['Commission only', 'Interest', 'Fee / commission', 'Deposit'], correct: 2 },
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
      { prompt: 'How do you ask "What do you do for work?" informally?', options: ['\u00BFQu\u00E9 haces?', '\u00BFA qu\u00E9 te dedicas?', '\u00BFD\u00F3nde trabajas?', '\u00BFCu\u00E1nto ganas?'], correct: 1 },
      { prompt: 'What does "acabo de llegar" mean?', options: ['I arrived early', 'I just arrived', 'I\u2019m about to arrive', 'I arrived late'], correct: 1 },
      { prompt: 'How do you say "free time"?', options: ['Hora libre', 'D\u00EDa libre', 'Tiempo libre', 'Momento libre'], correct: 2 },
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
      { prompt: 'How do you say "monthly rent"?', options: ['Precio mensual', 'Alquiler mensual', 'Pago del mes', 'Coste de casa'], correct: 1 },
      { prompt: 'What does "mudarse" mean?', options: ['To change clothes', 'To change one\u2019s mind', 'To move house', 'To be quiet'], correct: 2 },
      { prompt: 'What are "gastos de comunidad"?', options: ['Community events', 'Building / community fees', 'Neighborhood taxes', 'Shared groceries'], correct: 1 },
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
      { prompt: 'How do you say "round trip"?', options: ['Solo ida', 'Ida y vuelta', 'Viaje doble', 'Dos billetes'], correct: 1 },
      { prompt: 'What does "and\u00E9n" mean?', options: ['Aisle', 'Platform', 'Terminal', 'Track'], correct: 1 },
      { prompt: 'How do you ask "How long is the trip?"', options: ['\u00BFCu\u00E1nto cuesta el viaje?', '\u00BFCu\u00E1ndo es el viaje?', '\u00BFCu\u00E1nto dura el viaje?', '\u00BFC\u00F3mo es el viaje?'], correct: 2 },
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
      { prompt: 'How do you say "It doesn\u2019t work anymore"?', options: ['No trabaja m\u00E1s', 'Ya no funciona', 'Est\u00E1 roto siempre', 'No sirve nunca'], correct: 1 },
      { prompt: 'What does "garant\u00EDa" mean?', options: ['Guarantee / warranty', 'Insurance', 'Receipt', 'Protection plan'], correct: 0 },
      { prompt: 'What are "d\u00EDas h\u00E1biles"?', options: ['Holidays', 'Calendar days', 'Business days', 'Weekends'], correct: 2 },
    ],
  },

];

// Make available for module systems and browser global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONVERSATIONS_DATA };
}
