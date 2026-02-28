'use strict';

const THEMED_VOCAB_DATA = [
  // ─────────────────────────────────────────────
  // 1. AIRPORT
  // ─────────────────────────────────────────────
  {
    id: 'theme-airport',
    theme: 'At the Airport',
    themeEs: 'En el aeropuerto',
    icon: '✈️',
    level: 'A2',
    scenario: 'You are checking in for a flight to Barcelona. You need to check your luggage, get your boarding pass, and find your gate.',
    scenarioEs: 'Estás facturando para un vuelo a Barcelona. Necesitas facturar tu equipaje, obtener tu tarjeta de embarque y encontrar tu puerta de embarque.',
    phrases: [
      { spanish: '¿Dónde está la puerta de embarque?', english: 'Where is the boarding gate?', notes: 'puerta de embarque = boarding gate' },
      { spanish: 'Quisiera un asiento de ventanilla.', english: 'I would like a window seat.', notes: 'ventanilla = window (in transport context)' },
      { spanish: '¿Cuántas maletas puedo facturar?', english: 'How many suitcases can I check?', notes: 'facturar = to check (luggage)' },
      { spanish: 'Mi vuelo tiene una escala en Madrid.', english: 'My flight has a layover in Madrid.', notes: 'escala = layover / stopover' },
      { spanish: '¿A qué hora comienza el embarque?', english: 'What time does boarding begin?', notes: 'embarque = boarding' },
      { spanish: 'Tengo solo equipaje de mano.', english: 'I only have carry-on luggage.', notes: 'equipaje de mano = carry-on luggage' },
      { spanish: '¿Dónde puedo recoger mi equipaje?', english: 'Where can I pick up my luggage?', notes: 'recoger = to pick up / collect' },
      { spanish: 'Necesito declarar algo en la aduana.', english: 'I need to declare something at customs.', notes: 'aduana = customs' },
      { spanish: '¿Se ha retrasado el vuelo?', english: 'Has the flight been delayed?', notes: 'retrasarse = to be delayed' },
      { spanish: 'Por favor, ¿me indica dónde está el control de seguridad?', english: 'Please, can you tell me where the security checkpoint is?', notes: 'control de seguridad = security checkpoint' }
    ],
    vocab: [
      { word: 'el pasaporte', english: 'passport', gender: 'm' },
      { word: 'la tarjeta de embarque', english: 'boarding pass', gender: 'f' },
      { word: 'la maleta', english: 'suitcase', gender: 'f' },
      { word: 'el equipaje de mano', english: 'carry-on luggage', gender: 'm' },
      { word: 'el vuelo', english: 'flight', gender: 'm' },
      { word: 'la puerta de embarque', english: 'boarding gate', gender: 'f' },
      { word: 'el asiento', english: 'seat', gender: 'm' },
      { word: 'la escala', english: 'layover', gender: 'f' },
      { word: 'el retraso', english: 'delay', gender: 'm' },
      { word: 'la aduana', english: 'customs', gender: 'f' },
      { word: 'el cinturón de seguridad', english: 'seatbelt', gender: 'm' },
      { word: 'la azafata', english: 'flight attendant (f)', gender: 'f' },
      { word: 'el piloto', english: 'pilot', gender: 'm' },
      { word: 'la pista', english: 'runway', gender: 'f' },
      { word: 'el aterrizaje', english: 'landing', gender: 'm' }
    ],
    dialogue: [
      { speaker: 'Agente', text: 'Buenos días. ¿Me permite su pasaporte y su reserva?' },
      { speaker: 'Viajero', text: 'Sí, aquí tiene. Tengo una reserva para el vuelo IB3210 a Barcelona.' },
      { speaker: 'Agente', text: '¿Va a facturar alguna maleta?' },
      { speaker: 'Viajero', text: 'Sí, una maleta grande. Y llevo una mochila como equipaje de mano.' },
      { speaker: 'Agente', text: '¿Prefiere asiento de ventanilla o de pasillo?' },
      { speaker: 'Viajero', text: 'De ventanilla, por favor.' },
      { speaker: 'Agente', text: 'Muy bien. Aquí tiene su tarjeta de embarque. La puerta de embarque es la B12.' },
      { speaker: 'Viajero', text: '¿A qué hora empieza el embarque?' },
      { speaker: 'Agente', text: 'El embarque comienza a las diez y media. Tiene tiempo para pasar por el control de seguridad.' },
      { speaker: 'Viajero', text: 'Muchas gracias. ¿El vuelo sale a tiempo?' }
    ],
    quiz: [
      { prompt: '¿Cómo se dice "boarding pass" en español?', options: ['billete de avión', 'tarjeta de embarque', 'pasaporte', 'equipaje de mano'], correct: 1, explanation: '"Tarjeta de embarque" is the boarding pass. "Billete de avión" is the flight ticket.' },
      { prompt: '¿Qué significa "facturar el equipaje"?', options: ['to lose luggage', 'to carry luggage', 'to check luggage', 'to buy luggage'], correct: 2, explanation: '"Facturar" in an airport context means to check your luggage at the counter.' },
      { prompt: '¿Qué es una "escala"?', options: ['a staircase', 'a layover', 'a runway', 'a terminal'], correct: 1, explanation: 'In air travel, "escala" means a layover or stopover between flights.' },
      { prompt: 'You want a window seat. What do you say?', options: ['Quiero un asiento de pasillo.', 'Quisiera un asiento de ventanilla.', 'Prefiero un asiento del medio.', 'Necesito un asiento de emergencia.'], correct: 1, explanation: '"Ventanilla" is the window seat. "Pasillo" is the aisle seat.' },
      { prompt: '¿Dónde se recoge el equipaje facturado?', options: ['en la puerta de embarque', 'en la cinta de equipajes', 'en el control de seguridad', 'en la aduana'], correct: 1, explanation: 'Checked luggage is collected at "la cinta de equipajes" (the baggage carousel).' }
    ]
  },

  // ─────────────────────────────────────────────
  // 2. RESTAURANT
  // ─────────────────────────────────────────────
  {
    id: 'theme-restaurant',
    theme: 'At the Restaurant',
    themeEs: 'En el restaurante',
    icon: '🍽️',
    level: 'A1',
    scenario: 'You are dining at a restaurant in Seville. You need to get a table, read the menu, order food and drinks, and pay the bill.',
    scenarioEs: 'Estás cenando en un restaurante en Sevilla. Necesitas conseguir una mesa, leer el menú, pedir comida y bebidas, y pagar la cuenta.',
    phrases: [
      { spanish: '¿Tienen una mesa para dos?', english: 'Do you have a table for two?', notes: 'Common opening when arriving at a restaurant' },
      { spanish: '¿Nos puede traer la carta, por favor?', english: 'Can you bring us the menu, please?', notes: 'la carta = the menu (also el menú)' },
      { spanish: '¿Cuál es el plato del día?', english: 'What is the dish of the day?', notes: 'plato del día = daily special' },
      { spanish: 'Para mí, el filete de ternera poco hecho.', english: 'For me, the beef steak, rare.', notes: 'poco hecho = rare; al punto = medium; bien hecho = well done' },
      { spanish: 'Soy alérgico a los frutos secos.', english: 'I am allergic to nuts.', notes: 'alérgico/a a = allergic to; frutos secos = nuts' },
      { spanish: '¿Este plato lleva gluten?', english: 'Does this dish contain gluten?', notes: 'llevar = to contain (ingredients context)' },
      { spanish: '¿Nos trae la cuenta, por favor?', english: 'Can you bring us the check, please?', notes: 'la cuenta = the bill / check' },
      { spanish: '¿Está incluida la propina?', english: 'Is the tip included?', notes: 'la propina = the tip; less common in Spain than in USA' },
      { spanish: '¿Puedo pagar con tarjeta?', english: 'Can I pay by card?', notes: 'tarjeta = card (credit/debit)' },
      { spanish: 'De beber, una jarra de agua, por favor.', english: 'To drink, a pitcher of water, please.', notes: 'jarra = pitcher; vaso = glass' },
      { spanish: '¿Me recomienda algo de la carta?', english: 'Can you recommend something from the menu?', notes: 'recomendar = to recommend' }
    ],
    vocab: [
      { word: 'la carta', english: 'menu', gender: 'f' },
      { word: 'el plato', english: 'dish / plate', gender: 'm' },
      { word: 'la cuenta', english: 'bill / check', gender: 'f' },
      { word: 'la propina', english: 'tip', gender: 'f' },
      { word: 'el primer plato', english: 'first course / starter', gender: 'm' },
      { word: 'el segundo plato', english: 'main course', gender: 'm' },
      { word: 'el postre', english: 'dessert', gender: 'm' },
      { word: 'la bebida', english: 'drink', gender: 'f' },
      { word: 'el camarero', english: 'waiter', gender: 'm' },
      { word: 'la camarera', english: 'waitress', gender: 'f' },
      { word: 'el tenedor', english: 'fork', gender: 'm' },
      { word: 'el cuchillo', english: 'knife', gender: 'm' },
      { word: 'la cuchara', english: 'spoon', gender: 'f' },
      { word: 'la servilleta', english: 'napkin', gender: 'f' },
      { word: 'el vaso', english: 'glass', gender: 'm' }
    ],
    dialogue: [
      { speaker: 'Camarero', text: 'Buenas noches. ¿Tienen reserva?' },
      { speaker: 'Cliente', text: 'No, no tenemos reserva. ¿Hay una mesa libre para dos?' },
      { speaker: 'Camarero', text: 'Sí, síganme, por favor. Aquí tienen la carta.' },
      { speaker: 'Cliente', text: 'Gracias. ¿Cuál es el plato del día?' },
      { speaker: 'Camarero', text: 'Hoy tenemos paella de marisco como plato del día.' },
      { speaker: 'Cliente', text: 'Suena bien. Yo quiero la paella. Y mi amigo, ¿qué quieres?' },
      { speaker: 'Amigo', text: 'Para mí, una ensalada mixta de primero y el pollo al ajillo de segundo.' },
      { speaker: 'Camarero', text: '¿Y de beber?' },
      { speaker: 'Cliente', text: 'Una botella de vino tinto de la casa y una jarra de agua, por favor.' },
      { speaker: 'Camarero', text: 'Perfecto. Enseguida les traigo las bebidas.' }
    ],
    quiz: [
      { prompt: '¿Cómo se pide la cuenta en un restaurante?', options: ['¿Nos trae el menú?', '¿Nos trae la cuenta, por favor?', '¿Tiene una mesa libre?', '¿Cuál es el plato del día?'], correct: 1, explanation: '"La cuenta" is the bill. You say "¿Nos trae la cuenta, por favor?" to ask for the check.' },
      { prompt: '¿Qué significa "plato del día"?', options: ['plate of the day', 'dish of the day / daily special', 'main course', 'dessert menu'], correct: 1, explanation: '"Plato del día" is the daily special, usually a set menu at a fixed price.' },
      { prompt: 'How do you say you are allergic to shellfish?', options: ['Soy alérgico al gluten.', 'Soy alérgico al marisco.', 'No me gusta el marisco.', 'Soy vegetariano.'], correct: 1, explanation: '"Soy alérgico/a al marisco" means "I am allergic to shellfish."' },
      { prompt: '¿Qué es "la propina"?', options: ['the menu', 'the waiter', 'the tip', 'the dish'], correct: 2, explanation: '"La propina" is the tip left for the server. Tipping is less common in Spain than in the US.' },
      { prompt: 'You want a medium steak. What do you say?', options: ['El filete poco hecho.', 'El filete al punto.', 'El filete bien hecho.', 'El filete crudo.'], correct: 1, explanation: '"Al punto" means medium. "Poco hecho" is rare and "bien hecho" is well done.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 3. DOCTOR'S OFFICE
  // ─────────────────────────────────────────────
  {
    id: 'theme-doctor',
    theme: 'At the Doctor\'s Office',
    themeEs: 'En la consulta del médico',
    icon: '🩺',
    level: 'B1',
    scenario: 'You are feeling unwell and visit a doctor\'s office in Mexico City. You need to describe your symptoms, answer questions about your medical history, and understand a prescription.',
    scenarioEs: 'No te sientes bien y visitas una consulta médica en la Ciudad de México. Necesitas describir tus síntomas, responder preguntas sobre tu historial médico y entender una receta.',
    phrases: [
      { spanish: 'Tengo cita con el doctor Ramírez a las diez.', english: 'I have an appointment with Dr. Ramírez at ten.', notes: 'cita = appointment' },
      { spanish: 'Me duele mucho la cabeza desde hace tres días.', english: 'I\'ve had a bad headache for three days.', notes: 'doler = to hurt; desde hace = for (duration)' },
      { spanish: 'Tengo fiebre y escalofríos.', english: 'I have a fever and chills.', notes: 'fiebre = fever; escalofríos = chills' },
      { spanish: 'Soy alérgico a la penicilina.', english: 'I am allergic to penicillin.', notes: 'Important to mention drug allergies' },
      { spanish: '¿Necesito hacerme análisis de sangre?', english: 'Do I need to get a blood test?', notes: 'análisis de sangre = blood test' },
      { spanish: '¿Cada cuántas horas debo tomar la medicina?', english: 'How often should I take the medicine?', notes: 'cada cuántas horas = how many hours apart' },
      { spanish: 'Tengo un dolor agudo en el pecho.', english: 'I have a sharp pain in my chest.', notes: 'dolor agudo = sharp pain; pecho = chest' },
      { spanish: '¿Es contagioso?', english: 'Is it contagious?', notes: 'contagioso = contagious' },
      { spanish: 'Estoy tomando medicamentos para la presión arterial.', english: 'I am taking medication for blood pressure.', notes: 'presión arterial = blood pressure' },
      { spanish: '¿Necesito una receta para comprar este medicamento?', english: 'Do I need a prescription to buy this medication?', notes: 'receta = prescription' },
      { spanish: 'Me mareo cuando me levanto rápido.', english: 'I get dizzy when I stand up quickly.', notes: 'marearse = to feel dizzy; levantarse = to stand up' },
      { spanish: '¿Tiene efectos secundarios este tratamiento?', english: 'Does this treatment have side effects?', notes: 'efectos secundarios = side effects' }
    ],
    vocab: [
      { word: 'el síntoma', english: 'symptom', gender: 'm' },
      { word: 'la receta', english: 'prescription', gender: 'f' },
      { word: 'la fiebre', english: 'fever', gender: 'f' },
      { word: 'el dolor', english: 'pain', gender: 'm' },
      { word: 'la consulta', english: 'doctor\'s office / appointment', gender: 'f' },
      { word: 'el diagnóstico', english: 'diagnosis', gender: 'm' },
      { word: 'la tos', english: 'cough', gender: 'f' },
      { word: 'el resfriado', english: 'cold (illness)', gender: 'm' },
      { word: 'la gripe', english: 'flu', gender: 'f' },
      { word: 'el análisis de sangre', english: 'blood test', gender: 'm' },
      { word: 'la presión arterial', english: 'blood pressure', gender: 'f' },
      { word: 'el tratamiento', english: 'treatment', gender: 'm' },
      { word: 'la alergia', english: 'allergy', gender: 'f' },
      { word: 'el historial médico', english: 'medical history', gender: 'm' },
      { word: 'la enfermedad', english: 'illness / disease', gender: 'f' }
    ],
    dialogue: [
      { speaker: 'Recepcionista', text: 'Buenos días. ¿Tiene cita?' },
      { speaker: 'Paciente', text: 'Sí, tengo cita con la doctora Martínez a las once.' },
      { speaker: 'Doctora', text: 'Pase, por favor. Siéntese. ¿Qué le ocurre?' },
      { speaker: 'Paciente', text: 'Doctora, llevo tres días con mucha tos, fiebre y dolor de garganta.' },
      { speaker: 'Doctora', text: '¿Ha tomado algo para la fiebre?' },
      { speaker: 'Paciente', text: 'Sí, he tomado paracetamol, pero la fiebre vuelve por la noche.' },
      { speaker: 'Doctora', text: '¿Es alérgico a algún medicamento?' },
      { speaker: 'Paciente', text: 'Sí, soy alérgico a la penicilina.' },
      { speaker: 'Doctora', text: 'De acuerdo. Voy a auscultarle. Respire profundamente, por favor.' },
      { speaker: 'Paciente', text: '¿Es algo grave, doctora?' }
    ],
    quiz: [
      { prompt: '¿Cómo se dice "I have a headache" en español?', options: ['Tengo dolor de espalda.', 'Me duele la cabeza.', 'Tengo tos.', 'Me duele el estómago.'], correct: 1, explanation: '"Me duele la cabeza" literally means "my head hurts me." You can also say "tengo dolor de cabeza."' },
      { prompt: '¿Qué es una "receta médica"?', options: ['a recipe', 'a prescription', 'a medical bill', 'a diagnosis'], correct: 1, explanation: '"Receta" means both recipe and prescription. In a medical context, it is a prescription.' },
      { prompt: '¿Qué significa "desde hace tres días"?', options: ['three days ago', 'for three days', 'in three days', 'until three days'], correct: 1, explanation: '"Desde hace" + time duration means "for" a period of time, indicating something that started and continues.' },
      { prompt: 'The doctor says "Respire profundamente." What should you do?', options: ['Hold your breath', 'Breathe deeply', 'Open your mouth', 'Lie down'], correct: 1, explanation: '"Respire profundamente" means "breathe deeply," a common instruction during a chest examination.' },
      { prompt: '¿Qué son "efectos secundarios"?', options: ['secondary effects', 'side effects', 'allergic reactions', 'symptoms'], correct: 1, explanation: '"Efectos secundarios" are side effects of a medication or treatment.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 4. HOTEL
  // ─────────────────────────────────────────────
  {
    id: 'theme-hotel',
    theme: 'At the Hotel',
    themeEs: 'En el hotel',
    icon: '🏨',
    level: 'A2',
    scenario: 'You are checking into a hotel in Buenos Aires for a week-long stay. You need to confirm your reservation, handle room issues, and use the hotel amenities.',
    scenarioEs: 'Estás registrándote en un hotel en Buenos Aires para una estadía de una semana. Necesitas confirmar tu reserva, resolver problemas con la habitación y usar las instalaciones del hotel.',
    phrases: [
      { spanish: 'Tengo una reserva a nombre de García.', english: 'I have a reservation under the name García.', notes: 'a nombre de = under the name of' },
      { spanish: '¿A qué hora es el check-out?', english: 'What time is checkout?', notes: 'Also: ¿A qué hora hay que dejar la habitación?' },
      { spanish: '¿Está incluido el desayuno?', english: 'Is breakfast included?', notes: 'incluido = included' },
      { spanish: 'El aire acondicionado no funciona.', english: 'The air conditioning doesn\'t work.', notes: 'no funciona = doesn\'t work' },
      { spanish: '¿Tienen servicio de habitaciones?', english: 'Do you have room service?', notes: 'servicio de habitaciones = room service' },
      { spanish: 'Necesito una habitación doble con baño privado.', english: 'I need a double room with a private bathroom.', notes: 'habitación doble = double room; baño privado = private bathroom' },
      { spanish: '¿Dónde puedo aparcar el coche?', english: 'Where can I park the car?', notes: 'aparcar = to park; also estacionar in Latin America' },
      { spanish: '¿Me puede dar una toalla extra?', english: 'Can you give me an extra towel?', notes: 'toalla = towel' },
      { spanish: 'Quisiera pedir un taxi para mañana a las ocho.', english: 'I would like to request a taxi for tomorrow at eight.', notes: 'pedir = to request / order' },
      { spanish: '¿Tienen conexión wifi gratuita?', english: 'Do you have free wifi?', notes: 'gratuita = free (no charge); also gratis' },
      { spanish: '¿Me puede guardar las maletas hasta la tarde?', english: 'Can you store my suitcases until the afternoon?', notes: 'guardar = to keep / store' }
    ],
    vocab: [
      { word: 'la habitación', english: 'room', gender: 'f' },
      { word: 'la reserva', english: 'reservation', gender: 'f' },
      { word: 'la llave', english: 'key', gender: 'f' },
      { word: 'la tarjeta magnética', english: 'key card', gender: 'f' },
      { word: 'el ascensor', english: 'elevator', gender: 'm' },
      { word: 'la recepción', english: 'front desk / reception', gender: 'f' },
      { word: 'el recepcionista', english: 'receptionist', gender: 'm' },
      { word: 'la planta', english: 'floor (level)', gender: 'f' },
      { word: 'el desayuno', english: 'breakfast', gender: 'm' },
      { word: 'la piscina', english: 'swimming pool', gender: 'f' },
      { word: 'la toalla', english: 'towel', gender: 'f' },
      { word: 'la sábana', english: 'bedsheet', gender: 'f' },
      { word: 'la caja fuerte', english: 'safe (security box)', gender: 'f' },
      { word: 'el aparcamiento', english: 'parking lot', gender: 'm' },
      { word: 'la queja', english: 'complaint', gender: 'f' }
    ],
    dialogue: [
      { speaker: 'Recepcionista', text: 'Buenas tardes. Bienvenido al Hotel Libertador. ¿En qué puedo ayudarle?' },
      { speaker: 'Huésped', text: 'Buenas tardes. Tengo una reserva para cinco noches a nombre de Martín López.' },
      { speaker: 'Recepcionista', text: 'Déjeme comprobar... Sí, una habitación doble con vista al jardín. ¿Me permite su documento de identidad?' },
      { speaker: 'Huésped', text: 'Aquí tiene mi pasaporte. ¿Está incluido el desayuno?' },
      { speaker: 'Recepcionista', text: 'Sí, el desayuno se sirve de siete a diez en el restaurante de la primera planta.' },
      { speaker: 'Huésped', text: '¿Tienen piscina?' },
      { speaker: 'Recepcionista', text: 'Sí, la piscina está en la azotea. Está abierta de nueve a veinte horas.' },
      { speaker: 'Huésped', text: '¿Y el wifi es gratuito?' },
      { speaker: 'Recepcionista', text: 'Sí, la contraseña está en la tarjeta que le dejo junto a la llave. Su habitación es la 405, cuarta planta.' },
      { speaker: 'Huésped', text: 'Perfecto, muchas gracias.' }
    ],
    quiz: [
      { prompt: 'How do you say "The air conditioning doesn\'t work"?', options: ['El ascensor no funciona.', 'La calefacción no funciona.', 'El aire acondicionado no funciona.', 'La ducha no funciona.'], correct: 2, explanation: '"El aire acondicionado no funciona" is the correct phrase. "No funciona" means "doesn\'t work."' },
      { prompt: '¿Qué es una "tarjeta magnética" en un hotel?', options: ['a credit card', 'a key card', 'a membership card', 'a business card'], correct: 1, explanation: '"Tarjeta magnética" is a key card used to open hotel room doors.' },
      { prompt: '¿Cómo se dice "front desk"?', options: ['la habitación', 'la recepción', 'la planta baja', 'la entrada'], correct: 1, explanation: '"La recepción" is the front desk or reception area of a hotel.' },
      { prompt: 'You want a room with a sea view. What do you ask for?', options: ['una habitación con vista al mar', 'una habitación con balcón', 'una habitación doble', 'una habitación interior'], correct: 0, explanation: '"Vista al mar" means sea view. "Vista al jardín" is garden view, "vista a la calle" is street view.' },
      { prompt: '¿Qué significa "¿Me puede guardar las maletas?"?', options: ['Can you carry my bags?', 'Can you store my suitcases?', 'Can you find my luggage?', 'Can you open my suitcase?'], correct: 1, explanation: '"Guardar" means to keep or store. This is useful when you check out but your flight is later.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 5. SHOPPING
  // ─────────────────────────────────────────────
  {
    id: 'theme-shopping',
    theme: 'Shopping for Clothes',
    themeEs: 'De compras en una tienda de ropa',
    icon: '🛍️',
    level: 'A1',
    scenario: 'You are shopping for clothes in a store in Madrid. You need to find the right size, try things on, ask about prices, and possibly make a return.',
    scenarioEs: 'Estás comprando ropa en una tienda en Madrid. Necesitas encontrar la talla correcta, probarte cosas, preguntar por los precios y posiblemente hacer una devolución.',
    phrases: [
      { spanish: '¿Tienen esta camiseta en talla mediana?', english: 'Do you have this T-shirt in medium?', notes: 'talla = size (clothing)' },
      { spanish: '¿Dónde están los probadores?', english: 'Where are the fitting rooms?', notes: 'probador = fitting room' },
      { spanish: '¿Cuánto cuesta este vestido?', english: 'How much does this dress cost?', notes: 'costar = to cost; ¿Cuánto cuesta? = How much?' },
      { spanish: 'Me queda grande. ¿Tiene una talla menos?', english: 'It\'s too big on me. Do you have one size smaller?', notes: 'quedar grande = to be too big; una talla menos = one size smaller' },
      { spanish: '¿Están de rebajas estos pantalones?', english: 'Are these pants on sale?', notes: 'rebajas = sales / discounts' },
      { spanish: 'Me lo llevo.', english: 'I\'ll take it.', notes: 'Literally: I\'ll take it with me. Common way to say you want to buy something.' },
      { spanish: '¿Puedo devolver esto si no me queda bien?', english: 'Can I return this if it doesn\'t fit?', notes: 'devolver = to return (an item)' },
      { spanish: '¿Tienen este modelo en otro color?', english: 'Do you have this style in another color?', notes: 'modelo = style / model' },
      { spanish: '¿Aceptan tarjeta de crédito?', english: 'Do you accept credit cards?', notes: 'aceptar = to accept' },
      { spanish: 'Solo estoy mirando, gracias.', english: 'I\'m just looking, thanks.', notes: 'Common reply when a salesperson approaches you' }
    ],
    vocab: [
      { word: 'la talla', english: 'size (clothing)', gender: 'f' },
      { word: 'el probador', english: 'fitting room', gender: 'm' },
      { word: 'la camiseta', english: 'T-shirt', gender: 'f' },
      { word: 'el pantalón', english: 'pants / trousers', gender: 'm' },
      { word: 'el vestido', english: 'dress', gender: 'm' },
      { word: 'la falda', english: 'skirt', gender: 'f' },
      { word: 'los zapatos', english: 'shoes', gender: 'm' },
      { word: 'la chaqueta', english: 'jacket', gender: 'f' },
      { word: 'las rebajas', english: 'sales / discounts', gender: 'f' },
      { word: 'el precio', english: 'price', gender: 'm' },
      { word: 'la devolución', english: 'return (of an item)', gender: 'f' },
      { word: 'el recibo', english: 'receipt', gender: 'm' },
      { word: 'el algodón', english: 'cotton', gender: 'm' },
      { word: 'la lana', english: 'wool', gender: 'f' },
      { word: 'el escaparate', english: 'shop window', gender: 'm' }
    ],
    dialogue: [
      { speaker: 'Dependienta', text: 'Hola, buenas tardes. ¿Le puedo ayudar en algo?' },
      { speaker: 'Cliente', text: 'Sí, estoy buscando una chaqueta de invierno.' },
      { speaker: 'Dependienta', text: '¿Qué talla usa?' },
      { speaker: 'Cliente', text: 'La mediana, normalmente.' },
      { speaker: 'Dependienta', text: 'Mire, tenemos estas chaquetas. Esta azul es de lana y esta negra es de algodón.' },
      { speaker: 'Cliente', text: '¿Cuánto cuesta la azul?' },
      { speaker: 'Dependienta', text: 'Cuesta setenta y nueve euros. Pero hoy está rebajada a cincuenta y nueve.' },
      { speaker: 'Cliente', text: '¿Puedo probármela?' },
      { speaker: 'Dependienta', text: 'Claro, los probadores están al fondo a la derecha.' },
      { speaker: 'Cliente', text: 'Me queda perfecta. Me la llevo.' }
    ],
    quiz: [
      { prompt: '¿Cómo se dice "fitting room" en español?', options: ['la tienda', 'el probador', 'el vestidor', 'la entrada'], correct: 1, explanation: '"El probador" is the fitting room. It comes from "probar" (to try).' },
      { prompt: 'The shirt is too small. What do you say?', options: ['Me queda grande.', 'Me queda pequeña.', 'Me queda bien.', 'Me queda perfecta.'], correct: 1, explanation: '"Me queda pequeña" means it fits too small. "Quedar" is used for how clothes fit.' },
      { prompt: '¿Qué significa "las rebajas"?', options: ['the returns', 'the prices', 'the sales / discounts', 'the receipts'], correct: 2, explanation: '"Las rebajas" are sales or discounts, common in January and July in Spain.' },
      { prompt: 'You decide to buy something. What do you say?', options: ['Solo estoy mirando.', 'No me gusta.', 'Me lo llevo.', 'Me queda mal.'], correct: 2, explanation: '"Me lo llevo" (I\'ll take it) is the standard phrase when you decide to buy something.' },
      { prompt: '¿Qué es "el recibo"?', options: ['the receipt', 'the return', 'the discount', 'the price tag'], correct: 0, explanation: '"El recibo" is the receipt. Keep it if you might need to make a return (una devolución).' }
    ]
  },

  // ─────────────────────────────────────────────
  // 6. BANK
  // ─────────────────────────────────────────────
  {
    id: 'theme-bank',
    theme: 'At the Bank',
    themeEs: 'En el banco',
    icon: '🏦',
    level: 'B1',
    scenario: 'You have moved to Spain and need to open a bank account. You also need to understand exchange rates, make transfers, and resolve an issue with your ATM card.',
    scenarioEs: 'Te has mudado a España y necesitas abrir una cuenta bancaria. También necesitas entender los tipos de cambio, hacer transferencias y resolver un problema con tu tarjeta del cajero.',
    phrases: [
      { spanish: 'Quisiera abrir una cuenta corriente.', english: 'I would like to open a checking account.', notes: 'cuenta corriente = checking account; cuenta de ahorro = savings account' },
      { spanish: '¿Cuál es el tipo de cambio del dólar al euro?', english: 'What is the exchange rate from dollars to euros?', notes: 'tipo de cambio = exchange rate' },
      { spanish: 'Necesito hacer una transferencia internacional.', english: 'I need to make an international transfer.', notes: 'transferencia = transfer' },
      { spanish: 'El cajero automático se ha tragado mi tarjeta.', english: 'The ATM swallowed my card.', notes: 'tragarse = to swallow; cajero automático = ATM' },
      { spanish: '¿Qué documentos necesito para abrir una cuenta?', english: 'What documents do I need to open an account?', notes: 'Common: pasaporte, NIE, certificado de empadronamiento' },
      { spanish: '¿Cuánto cobran de comisión por la transferencia?', english: 'How much is the commission for the transfer?', notes: 'comisión = commission / fee; cobrar = to charge' },
      { spanish: 'Quiero ingresar este cheque en mi cuenta.', english: 'I want to deposit this check into my account.', notes: 'ingresar = to deposit; also: depositar' },
      { spanish: 'Me han cobrado dos veces por la misma compra.', english: 'I\'ve been charged twice for the same purchase.', notes: 'cobrar dos veces = to charge twice' },
      { spanish: '¿Puedo domiciliar el pago del alquiler?', english: 'Can I set up a direct debit for the rent?', notes: 'domiciliar = to set up direct debit; alquiler = rent' },
      { spanish: 'Necesito un extracto bancario de los últimos tres meses.', english: 'I need a bank statement for the last three months.', notes: 'extracto bancario = bank statement' },
      { spanish: '¿Cuál es el número IBAN de mi cuenta?', english: 'What is my account IBAN number?', notes: 'IBAN is used throughout Europe for transfers' }
    ],
    vocab: [
      { word: 'la cuenta corriente', english: 'checking account', gender: 'f' },
      { word: 'la cuenta de ahorro', english: 'savings account', gender: 'f' },
      { word: 'el cajero automático', english: 'ATM', gender: 'm' },
      { word: 'la tarjeta de débito', english: 'debit card', gender: 'f' },
      { word: 'la tarjeta de crédito', english: 'credit card', gender: 'f' },
      { word: 'la transferencia', english: 'transfer', gender: 'f' },
      { word: 'el tipo de cambio', english: 'exchange rate', gender: 'm' },
      { word: 'la comisión', english: 'commission / fee', gender: 'f' },
      { word: 'el préstamo', english: 'loan', gender: 'm' },
      { word: 'la hipoteca', english: 'mortgage', gender: 'f' },
      { word: 'el extracto bancario', english: 'bank statement', gender: 'm' },
      { word: 'el saldo', english: 'balance (account)', gender: 'm' },
      { word: 'el ingreso', english: 'deposit', gender: 'm' },
      { word: 'la sucursal', english: 'branch (office)', gender: 'f' },
      { word: 'el interés', english: 'interest (rate)', gender: 'm' }
    ],
    dialogue: [
      { speaker: 'Empleado', text: 'Buenos días. ¿En qué puedo ayudarle?' },
      { speaker: 'Cliente', text: 'Buenos días. Acabo de mudarme a España y necesito abrir una cuenta corriente.' },
      { speaker: 'Empleado', text: '¿Tiene usted el NIE y un certificado de empadronamiento?' },
      { speaker: 'Cliente', text: 'Sí, tengo ambos documentos. Aquí los tiene.' },
      { speaker: 'Empleado', text: 'Perfecto. ¿Desea también una tarjeta de débito?' },
      { speaker: 'Cliente', text: 'Sí, por favor. ¿Tiene comisiones de mantenimiento la cuenta?' },
      { speaker: 'Empleado', text: 'Si domicilia su nómina, no tiene comisiones. Si no, son seis euros al mes.' },
      { speaker: 'Cliente', text: 'Entiendo. También necesito hacer una transferencia desde mi cuenta en Estados Unidos.' },
      { speaker: 'Empleado', text: 'Para transferencias internacionales hay una comisión de quince euros. ¿Desea hacerla ahora?' },
      { speaker: 'Cliente', text: 'Sí, por favor. ¿Cuánto tarda en llegar?' }
    ],
    quiz: [
      { prompt: '¿Cómo se dice "ATM" en español?', options: ['el banco automático', 'la máquina de dinero', 'el cajero automático', 'la caja fuerte'], correct: 2, explanation: '"Cajero automático" is the ATM. "Cajero" alone can also mean the cashier or the ATM.' },
      { prompt: '¿Qué es el "tipo de cambio"?', options: ['a type of change', 'the exchange rate', 'a bank transfer', 'the interest rate'], correct: 1, explanation: '"Tipo de cambio" is the exchange rate between currencies.' },
      { prompt: 'You need a bank statement. What do you ask for?', options: ['un extracto bancario', 'un certificado bancario', 'un documento bancario', 'un informe bancario'], correct: 0, explanation: '"Extracto bancario" is the bank statement showing your recent transactions.' },
      { prompt: '¿Qué significa "domiciliar un pago"?', options: ['to pay at home', 'to make a payment', 'to set up a direct debit', 'to cancel a payment'], correct: 2, explanation: '"Domiciliar" means to set up an automatic direct debit payment from your account.' },
      { prompt: '¿Qué es "el saldo" de una cuenta?', options: ['the salary', 'the balance', 'the interest', 'the fee'], correct: 1, explanation: '"El saldo" is the account balance, the amount of money currently in the account.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 7. POST OFFICE
  // ─────────────────────────────────────────────
  {
    id: 'theme-post-office',
    theme: 'At the Post Office',
    themeEs: 'En la oficina de correos',
    icon: '📮',
    level: 'A2',
    scenario: 'You need to send a package to your family back home and buy stamps for some postcards. You also want to track a package you are expecting.',
    scenarioEs: 'Necesitas enviar un paquete a tu familia y comprar sellos para algunas postales. También quieres rastrear un paquete que estás esperando.',
    phrases: [
      { spanish: 'Quiero enviar este paquete a Estados Unidos.', english: 'I want to send this package to the United States.', notes: 'enviar = to send; paquete = package' },
      { spanish: '¿Cuánto cuesta enviar una carta certificada?', english: 'How much does it cost to send a certified letter?', notes: 'carta certificada = certified / registered letter' },
      { spanish: '¿Cuánto tarda en llegar por correo ordinario?', english: 'How long does it take to arrive by regular mail?', notes: 'correo ordinario = regular mail; correo urgente = express mail' },
      { spanish: 'Necesito cinco sellos para postales a Europa.', english: 'I need five stamps for postcards to Europe.', notes: 'sello = stamp; postal = postcard' },
      { spanish: '¿Puedo asegurar el paquete?', english: 'Can I insure the package?', notes: 'asegurar = to insure' },
      { spanish: '¿Tiene un número de seguimiento?', english: 'Does it have a tracking number?', notes: 'número de seguimiento = tracking number' },
      { spanish: 'Necesito un sobre acolchado grande.', english: 'I need a large padded envelope.', notes: 'sobre acolchado = padded envelope' },
      { spanish: '¿Tengo que rellenar un formulario de aduanas?', english: 'Do I need to fill out a customs form?', notes: 'rellenar = to fill out; formulario = form' },
      { spanish: '¿Dónde puedo comprar una caja para el envío?', english: 'Where can I buy a box for shipping?', notes: 'caja = box; envío = shipment' },
      { spanish: 'Quiero enviar esto por correo urgente.', english: 'I want to send this by express mail.', notes: 'correo urgente = express / priority mail' }
    ],
    vocab: [
      { word: 'el paquete', english: 'package', gender: 'm' },
      { word: 'la carta', english: 'letter', gender: 'f' },
      { word: 'el sello', english: 'stamp', gender: 'm' },
      { word: 'la postal', english: 'postcard', gender: 'f' },
      { word: 'el sobre', english: 'envelope', gender: 'm' },
      { word: 'el buzón', english: 'mailbox', gender: 'm' },
      { word: 'el cartero', english: 'mail carrier', gender: 'm' },
      { word: 'el envío', english: 'shipment / sending', gender: 'm' },
      { word: 'el remitente', english: 'sender', gender: 'm' },
      { word: 'el destinatario', english: 'recipient', gender: 'm' },
      { word: 'la dirección', english: 'address', gender: 'f' },
      { word: 'el código postal', english: 'zip code', gender: 'm' },
      { word: 'el correo certificado', english: 'certified mail', gender: 'm' },
      { word: 'la balanza', english: 'scale', gender: 'f' },
      { word: 'la ventanilla', english: 'counter window', gender: 'f' }
    ],
    dialogue: [
      { speaker: 'Empleado', text: 'Siguiente. Buenos días, ¿qué desea?' },
      { speaker: 'Cliente', text: 'Buenos días. Quiero enviar este paquete a Estados Unidos.' },
      { speaker: 'Empleado', text: 'Vamos a pesarlo primero. Pesa un kilo y doscientos gramos. ¿Correo ordinario o urgente?' },
      { speaker: 'Cliente', text: '¿Cuánto cuesta cada opción y cuánto tarda?' },
      { speaker: 'Empleado', text: 'El ordinario cuesta doce euros y tarda entre diez y quince días. El urgente cuesta veinticuatro euros y tarda entre tres y cinco días.' },
      { speaker: 'Cliente', text: 'Prefiero el urgente. ¿Puedo asegurar el paquete?' },
      { speaker: 'Empleado', text: 'Sí, el seguro cuesta tres euros más. Necesita rellenar este formulario de aduanas.' },
      { speaker: 'Cliente', text: 'De acuerdo. También necesito tres sellos para postales a Francia.' },
      { speaker: 'Empleado', text: 'Son un euro y cincuenta céntimos cada uno. ¿Algo más?' },
      { speaker: 'Cliente', text: 'No, eso es todo. ¿Me da el número de seguimiento?' }
    ],
    quiz: [
      { prompt: '¿Cómo se dice "stamp" en español?', options: ['la estampilla', 'el sello', 'la marca', 'el timbre'], correct: 1, explanation: '"El sello" is the standard word for stamp in Spain. In Latin America, "la estampilla" or "la estampa" is also used.' },
      { prompt: '¿Qué es el "remitente"?', options: ['the recipient', 'the sender', 'the mail carrier', 'the post office clerk'], correct: 1, explanation: '"El remitente" is the sender. "El destinatario" is the recipient.' },
      { prompt: 'You want to track a package. What do you ask for?', options: ['el número de referencia', 'el número de seguimiento', 'el código postal', 'el número de serie'], correct: 1, explanation: '"Número de seguimiento" is the tracking number for a shipment.' },
      { prompt: '¿Qué significa "correo urgente"?', options: ['certified mail', 'express / priority mail', 'regular mail', 'overnight mail'], correct: 1, explanation: '"Correo urgente" is express or priority mail, faster than "correo ordinario" (regular mail).' },
      { prompt: '¿Para qué sirve "la balanza" en correos?', options: ['to open packages', 'to weigh packages', 'to seal envelopes', 'to print labels'], correct: 1, explanation: '"La balanza" is the scale used to weigh letters and packages to determine the shipping cost.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 8. PHARMACY
  // ─────────────────────────────────────────────
  {
    id: 'theme-pharmacy',
    theme: 'At the Pharmacy',
    themeEs: 'En la farmacia',
    icon: '💊',
    level: 'A2',
    scenario: 'You have a cold and need to buy some over-the-counter medication. You also need to fill a prescription from your doctor and ask about proper dosage.',
    scenarioEs: 'Tienes un resfriado y necesitas comprar medicamentos sin receta. También necesitas surtir una receta de tu médico y preguntar sobre la dosis adecuada.',
    phrases: [
      { spanish: '¿Tiene algo para el dolor de cabeza?', english: 'Do you have something for a headache?', notes: 'dolor de cabeza = headache' },
      { spanish: 'Necesito algo para la tos seca.', english: 'I need something for a dry cough.', notes: 'tos seca = dry cough; tos con flema = productive cough' },
      { spanish: '¿Se puede comprar sin receta?', english: 'Can you buy it without a prescription?', notes: 'sin receta = without a prescription' },
      { spanish: '¿Cada cuántas horas debo tomarlo?', english: 'How often should I take it?', notes: 'cada cuántas horas = how many hours apart' },
      { spanish: '¿Tiene algún efecto secundario?', english: 'Does it have any side effects?', notes: 'efecto secundario = side effect' },
      { spanish: 'Aquí tiene la receta del médico.', english: 'Here is the doctor\'s prescription.', notes: 'receta = prescription' },
      { spanish: '¿Tienen protector solar de factor cincuenta?', english: 'Do you have SPF 50 sunscreen?', notes: 'protector solar = sunscreen; factor = SPF' },
      { spanish: 'Necesito tiritas y alcohol para desinfectar.', english: 'I need band-aids and rubbing alcohol.', notes: 'tiritas = band-aids (Spain); curitas (Latin America)' },
      { spanish: '¿Este jarabe produce somnolencia?', english: 'Does this syrup cause drowsiness?', notes: 'jarabe = syrup; somnolencia = drowsiness' },
      { spanish: '¿Dónde hay una farmacia de guardia?', english: 'Where is there an on-duty pharmacy?', notes: 'farmacia de guardia = on-duty pharmacy (open nights/holidays)' }
    ],
    vocab: [
      { word: 'la farmacia', english: 'pharmacy', gender: 'f' },
      { word: 'el medicamento', english: 'medication', gender: 'm' },
      { word: 'la pastilla', english: 'pill / tablet', gender: 'f' },
      { word: 'el jarabe', english: 'syrup', gender: 'm' },
      { word: 'la pomada', english: 'ointment / cream', gender: 'f' },
      { word: 'las gotas', english: 'drops', gender: 'f' },
      { word: 'la tirita', english: 'band-aid', gender: 'f' },
      { word: 'la receta', english: 'prescription', gender: 'f' },
      { word: 'la dosis', english: 'dose / dosage', gender: 'f' },
      { word: 'el analgésico', english: 'painkiller', gender: 'm' },
      { word: 'el antigripal', english: 'flu medicine', gender: 'm' },
      { word: 'el antihistamínico', english: 'antihistamine', gender: 'm' },
      { word: 'el termómetro', english: 'thermometer', gender: 'm' },
      { word: 'el prospecto', english: 'leaflet / package insert', gender: 'm' },
      { word: 'la alergia', english: 'allergy', gender: 'f' }
    ],
    dialogue: [
      { speaker: 'Farmacéutico', text: 'Hola, buenas tardes. ¿En qué puedo ayudarle?' },
      { speaker: 'Cliente', text: 'Buenas tardes. Llevo unos días con mucho resfriado y tos. ¿Me puede recomendar algo?' },
      { speaker: 'Farmacéutico', text: '¿Tiene fiebre también?' },
      { speaker: 'Cliente', text: 'Sí, un poco. Treinta y ocho grados esta mañana.' },
      { speaker: 'Farmacéutico', text: 'Le recomiendo este antigripal. Viene en sobres. Se toma uno cada ocho horas disuelto en agua caliente.' },
      { speaker: 'Cliente', text: '¿Tiene algún efecto secundario?' },
      { speaker: 'Farmacéutico', text: 'Puede producir algo de somnolencia. No conduzca después de tomarlo.' },
      { speaker: 'Cliente', text: 'Entendido. También tengo esta receta del médico para un antibiótico.' },
      { speaker: 'Farmacéutico', text: 'Sí, lo tenemos. Son dos pastillas al día, una por la mañana y otra por la noche, durante siete días. Tómelo con las comidas.' },
      { speaker: 'Cliente', text: '¿Cuánto es todo?' }
    ],
    quiz: [
      { prompt: '¿Qué es una "farmacia de guardia"?', options: ['a hospital pharmacy', 'a pharmacy with a security guard', 'an on-duty pharmacy open at night or on holidays', 'a cheap pharmacy'], correct: 2, explanation: '"Farmacia de guardia" is a pharmacy that stays open outside normal hours, at night, and on holidays. They rotate in each neighborhood.' },
      { prompt: '¿Cómo se dice "pill" en español?', options: ['la pomada', 'la pastilla', 'la gota', 'la tirita'], correct: 1, explanation: '"La pastilla" is a pill or tablet. "La pomada" is an ointment, "las gotas" are drops.' },
      { prompt: 'The pharmacist says "No conduzca después de tomarlo." What does this mean?', options: ['Don\'t eat after taking it.', 'Don\'t drive after taking it.', 'Don\'t sleep after taking it.', 'Don\'t exercise after taking it.'], correct: 1, explanation: '"Conducir" means to drive. Medications that cause drowsiness often have this warning.' },
      { prompt: '¿Qué es "el prospecto"?', options: ['the prescription', 'the package insert / leaflet', 'the receipt', 'the dosage'], correct: 1, explanation: '"El prospecto" is the informational leaflet that comes inside the medication box.' },
      { prompt: 'You need something for allergies. What do you ask for?', options: ['un analgésico', 'un antigripal', 'un antihistamínico', 'un antibiótico'], correct: 2, explanation: '"Un antihistamínico" is an antihistamine, used to treat allergy symptoms.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 9. TRAIN STATION
  // ─────────────────────────────────────────────
  {
    id: 'theme-train-station',
    theme: 'At the Train Station',
    themeEs: 'En la estación de tren',
    icon: '🚆',
    level: 'A2',
    scenario: 'You are at the train station in Madrid, planning to take a high-speed train to Seville. You need to buy a ticket, find your platform, and deal with a delay.',
    scenarioEs: 'Estás en la estación de tren en Madrid y quieres tomar un tren de alta velocidad a Sevilla. Necesitas comprar un billete, encontrar tu andén y lidiar con un retraso.',
    phrases: [
      { spanish: 'Quiero un billete de ida y vuelta a Sevilla.', english: 'I want a round-trip ticket to Seville.', notes: 'ida y vuelta = round trip; solo ida = one way' },
      { spanish: '¿De qué andén sale el tren?', english: 'Which platform does the train leave from?', notes: 'andén = platform' },
      { spanish: '¿El tren lleva retraso?', english: 'Is the train delayed?', notes: 'llevar retraso = to be running late' },
      { spanish: '¿Hay que hacer transbordo?', english: 'Do I have to transfer?', notes: 'transbordo = transfer (between trains)' },
      { spanish: '¿A qué hora sale el próximo tren a Barcelona?', english: 'What time does the next train to Barcelona leave?', notes: 'próximo = next' },
      { spanish: '¿Este asiento está libre?', english: 'Is this seat free?', notes: 'libre = free / available' },
      { spanish: 'He perdido el tren. ¿Puedo cambiar mi billete?', english: 'I missed the train. Can I change my ticket?', notes: 'perder el tren = to miss the train' },
      { spanish: '¿El tren tiene vagón cafetería?', english: 'Does the train have a dining car?', notes: 'vagón cafetería = dining car' },
      { spanish: 'Prefiero un asiento junto a la ventana en clase turista.', english: 'I prefer a window seat in economy class.', notes: 'clase turista = economy; clase preferente = first class' },
      { spanish: '¿Dónde está la consigna de equipajes?', english: 'Where is the luggage storage?', notes: 'consigna = luggage storage / lockers' }
    ],
    vocab: [
      { word: 'el billete', english: 'ticket', gender: 'm' },
      { word: 'el andén', english: 'platform', gender: 'm' },
      { word: 'la vía', english: 'track', gender: 'f' },
      { word: 'el vagón', english: 'train car / carriage', gender: 'm' },
      { word: 'el horario', english: 'schedule / timetable', gender: 'm' },
      { word: 'el retraso', english: 'delay', gender: 'm' },
      { word: 'el transbordo', english: 'transfer', gender: 'm' },
      { word: 'la taquilla', english: 'ticket office', gender: 'f' },
      { word: 'la salida', english: 'departure', gender: 'f' },
      { word: 'la llegada', english: 'arrival', gender: 'f' },
      { word: 'el revisor', english: 'ticket inspector', gender: 'm' },
      { word: 'la consigna', english: 'luggage storage', gender: 'f' },
      { word: 'el abono', english: 'season pass', gender: 'm' },
      { word: 'el asiento reservado', english: 'reserved seat', gender: 'm' },
      { word: 'la estación', english: 'station', gender: 'f' }
    ],
    dialogue: [
      { speaker: 'Viajero', text: 'Buenos días. Quiero un billete para Sevilla, por favor.' },
      { speaker: 'Taquillera', text: '¿Solo ida o ida y vuelta?' },
      { speaker: 'Viajero', text: 'Ida y vuelta. La ida para hoy y la vuelta para el domingo.' },
      { speaker: 'Taquillera', text: '¿Clase turista o preferente?' },
      { speaker: 'Viajero', text: 'Turista, por favor. ¿A qué hora sale el próximo tren?' },
      { speaker: 'Taquillera', text: 'El próximo AVE sale a las doce y cuarto del andén número tres.' },
      { speaker: 'Viajero', text: '¿Cuánto tarda en llegar a Sevilla?' },
      { speaker: 'Taquillera', text: 'Dos horas y media aproximadamente. Llega a las catorce cuarenta y cinco.' },
      { speaker: 'Viajero', text: '¿El tren es directo o hay que hacer transbordo?' },
      { speaker: 'Taquillera', text: 'Es directo. Aquí tiene su billete. El precio es sesenta y dos euros.' }
    ],
    quiz: [
      { prompt: '¿Cómo se dice "round-trip ticket" en español?', options: ['billete de solo ida', 'billete de ida y vuelta', 'billete de primera clase', 'billete reservado'], correct: 1, explanation: '"Ida y vuelta" means round trip. "Solo ida" is one way.' },
      { prompt: '¿Qué es "el andén"?', options: ['the ticket office', 'the platform', 'the train car', 'the exit'], correct: 1, explanation: '"El andén" is the platform where you board the train.' },
      { prompt: '¿Qué hace "el revisor" en el tren?', options: ['drives the train', 'serves food', 'checks tickets', 'announces stations'], correct: 2, explanation: '"El revisor" is the ticket inspector who checks that passengers have valid tickets.' },
      { prompt: 'Your train is delayed. How do you ask about it?', options: ['¿El tren está roto?', '¿El tren lleva retraso?', '¿El tren ha salido?', '¿Dónde está el tren?'], correct: 1, explanation: '"Llevar retraso" is the standard expression for running late. It literally means "to carry a delay."' },
      { prompt: '¿Qué es "la consigna"?', options: ['a password', 'the lost and found', 'luggage storage / lockers', 'the information desk'], correct: 2, explanation: '"La consigna" is luggage storage, where you can leave your bags for a fee while you explore the city.' }
    ]
  },

  // ─────────────────────────────────────────────
  // 10. EMERGENCY
  // ─────────────────────────────────────────────
  {
    id: 'theme-emergency',
    theme: 'Emergencies',
    themeEs: 'Emergencias',
    icon: '🚨',
    level: 'B1',
    scenario: 'You find yourself in different emergency situations in a Spanish-speaking country: reporting a theft to the police, calling for medical help, and dealing with a fire or lost documents.',
    scenarioEs: 'Te encuentras en diferentes situaciones de emergencia en un país hispanohablante: denunciando un robo a la policía, pidiendo ayuda médica y lidiando con un incendio o documentos perdidos.',
    phrases: [
      { spanish: '¡Llame a una ambulancia, por favor!', english: 'Call an ambulance, please!', notes: 'Formal imperative (usted); ambulancia = ambulance' },
      { spanish: 'Me han robado la cartera.', english: 'My wallet has been stolen.', notes: 'robar = to steal / rob; cartera = wallet' },
      { spanish: 'Necesito poner una denuncia.', english: 'I need to file a police report.', notes: 'poner una denuncia = to file a report' },
      { spanish: '¡Socorro! ¡Hay un incendio!', english: 'Help! There is a fire!', notes: 'socorro = help (urgent); incendio = fire (destructive)' },
      { spanish: 'He perdido mi pasaporte. ¿Dónde está el consulado?', english: 'I\'ve lost my passport. Where is the consulate?', notes: 'consulado = consulate' },
      { spanish: 'Alguien necesita ayuda médica urgente.', english: 'Someone needs urgent medical help.', notes: 'ayuda médica = medical help' },
      { spanish: '¿Dónde está la comisaría de policía más cercana?', english: 'Where is the nearest police station?', notes: 'comisaría = police station; más cercana = nearest' },
      { spanish: 'Me he caído y creo que me he roto el brazo.', english: 'I fell and I think I broke my arm.', notes: 'caerse = to fall; romperse = to break (body part)' },
      { spanish: 'El número de emergencias es el 112.', english: 'The emergency number is 112.', notes: '112 is the general emergency number in Spain and the EU' },
      { spanish: 'Necesito hablar con alguien que hable inglés.', english: 'I need to speak with someone who speaks English.', notes: 'Useful when your Spanish is not sufficient for the situation' },
      { spanish: 'Ha habido un accidente de tráfico.', english: 'There has been a traffic accident.', notes: 'accidente de tráfico = traffic accident' },
      { spanish: '¿Me puede ayudar? Es una emergencia.', english: 'Can you help me? It\'s an emergency.', notes: 'Always useful as an opening line' }
    ],
    vocab: [
      { word: 'la emergencia', english: 'emergency', gender: 'f' },
      { word: 'la ambulancia', english: 'ambulance', gender: 'f' },
      { word: 'los bomberos', english: 'firefighters', gender: 'm' },
      { word: 'la policía', english: 'police', gender: 'f' },
      { word: 'la comisaría', english: 'police station', gender: 'f' },
      { word: 'el robo', english: 'theft / robbery', gender: 'm' },
      { word: 'la denuncia', english: 'police report', gender: 'f' },
      { word: 'el incendio', english: 'fire (destructive)', gender: 'm' },
      { word: 'el accidente', english: 'accident', gender: 'm' },
      { word: 'la herida', english: 'wound / injury', gender: 'f' },
      { word: 'el testigo', english: 'witness', gender: 'm' },
      { word: 'el ladrón', english: 'thief', gender: 'm' },
      { word: 'el consulado', english: 'consulate', gender: 'm' },
      { word: 'el seguro de viaje', english: 'travel insurance', gender: 'm' },
      { word: 'la salida de emergencia', english: 'emergency exit', gender: 'f' }
    ],
    dialogue: [
      { speaker: 'Policía', text: 'Buenas tardes. ¿En qué puedo ayudarle?' },
      { speaker: 'Turista', text: 'Buenas tardes. Quiero poner una denuncia. Me han robado el bolso.' },
      { speaker: 'Policía', text: '¿Cuándo y dónde ocurrió el robo?' },
      { speaker: 'Turista', text: 'Hace una hora, en el metro, en la línea tres.' },
      { speaker: 'Policía', text: '¿Puede describir lo que pasó?' },
      { speaker: 'Turista', text: 'Estaba en el vagón y alguien me quitó el bolso de la mano cuando se abrieron las puertas.' },
      { speaker: 'Policía', text: '¿Recuerda cómo era la persona?' },
      { speaker: 'Turista', text: 'Era un hombre joven, alto, con una camiseta gris. Fue todo muy rápido.' },
      { speaker: 'Policía', text: '¿Qué llevaba dentro del bolso?' },
      { speaker: 'Turista', text: 'Mi cartera con dinero y tarjetas, el teléfono móvil y las llaves del hotel.' }
    ],
    quiz: [
      { prompt: '¿Cuál es el número de emergencias en España?', options: ['911', '112', '999', '100'], correct: 1, explanation: '112 is the general emergency number in Spain and across the European Union, equivalent to 911 in the US.' },
      { prompt: '¿Cómo se dice "I need to file a police report"?', options: ['Necesito llamar a la policía.', 'Necesito poner una denuncia.', 'Necesito un abogado.', 'Necesito ir a la comisaría.'], correct: 1, explanation: '"Poner una denuncia" is the standard expression for filing a police report in Spain.' },
      { prompt: '¿Qué son "los bomberos"?', options: ['the police', 'the paramedics', 'the firefighters', 'the security guards'], correct: 2, explanation: '"Los bomberos" are the firefighters. Despite the name, they fight fires rather than set them ("bomba" here refers to the water pump).' },
      { prompt: 'Someone is hurt. How do you call for help?', options: ['¡Perdón!', '¡Ayuda! ¡Llamen a una ambulancia!', '¡Hola! ¿Qué tal?', '¡Cuidado con el coche!'], correct: 1, explanation: '"¡Ayuda!" or "¡Socorro!" means help. "Llamen a una ambulancia" means "call an ambulance" (plural command).' },
      { prompt: '¿Qué es "el seguro de viaje"?', options: ['a safe in the hotel', 'travel insurance', 'a seatbelt', 'a safety deposit box'], correct: 1, explanation: '"El seguro de viaje" is travel insurance. "Seguro" can mean insurance, safe (adjective), or sure.' }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { THEMED_VOCAB_DATA };
}
