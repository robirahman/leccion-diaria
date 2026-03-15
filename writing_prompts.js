'use strict';

// ════════════════════════════════════════════════════════════
//  WRITING PROMPTS — Free-form writing exercises
//  with guided self-assessment checklists.
//  Levels A1-C2 with target vocab & grammar focus.
// ════════════════════════════════════════════════════════════

const WRITING_PROMPTS_DATA = [

  // ──────────────────────────────────────
  //  A1 — Basic descriptions & personal info  (6 items)
  // ──────────────────────────────────────

  {
    id: 'wp-1', level: 'A1',
    prompt: 'Describe a tu familia. ¿Cuántas personas hay? ¿Cómo se llaman? ¿Cómo son?',
    promptEn: 'Describe your family. How many people are there? What are their names? What are they like?',
    targetVocab: ['familia', 'hermano/a', 'padre', 'madre', 'alto/a', 'bajo/a', 'simpático/a', 'mayor', 'menor'],
    targetGrammar: 'ser/estar, possessive adjectives (mi, tu, su), gender/number agreement',
    sampleResponse: 'Mi familia es pequeña. Somos cuatro personas: mi padre, mi madre, mi hermana y yo. Mi padre se llama Carlos. Es alto y tiene el pelo negro. Mi madre se llama Ana. Es simpática y muy trabajadora. Mi hermana se llama Lucía. Es menor que yo. Tiene diez años. Es divertida y le gusta jugar.',
    sampleResponseEn: 'My family is small. There are four of us: my father, my mother, my sister, and me. My father is called Carlos. He is tall and has black hair. My mother is called Ana. She is friendly and very hard-working. My sister is called Lucía. She is younger than me. She is ten years old. She is funny and likes to play.',
    selfCheckItems: [
      'Did I use "ser" for permanent characteristics (es alto, es simpática)?',
      'Do my adjectives agree in gender and number (hermana pequeña, not pequeño)?',
      'Did I use possessive adjectives correctly (mi padre, mi madre)?',
      'Did I include at least 3 family members?',
      'Did I describe physical or personality traits for each person?'
    ]
  },
  {
    id: 'wp-2', level: 'A1',
    prompt: 'Describe tu casa o tu apartamento. ¿Cuántas habitaciones tiene? ¿Qué hay en cada habitación?',
    promptEn: 'Describe your house or apartment. How many rooms does it have? What is in each room?',
    targetVocab: ['casa', 'habitación', 'cocina', 'baño', 'dormitorio', 'salón', 'mesa', 'silla', 'cama', 'grande', 'pequeño'],
    targetGrammar: 'hay (there is/are), estar for location, articles (el/la/un/una)',
    sampleResponse: 'Vivo en un apartamento pequeño. Tiene tres habitaciones: un dormitorio, un salón y una cocina. En el dormitorio hay una cama grande y un armario. En el salón hay un sofá, una mesa y una televisión. La cocina es pequeña pero tiene todo lo necesario. También hay un baño con una ducha.',
    sampleResponseEn: 'I live in a small apartment. It has three rooms: a bedroom, a living room, and a kitchen. In the bedroom there is a big bed and a wardrobe. In the living room there is a sofa, a table, and a television. The kitchen is small but has everything needed. There is also a bathroom with a shower.',
    selfCheckItems: [
      'Did I use "hay" for stating what exists in each room?',
      'Did I use the correct articles (un/una, el/la)?',
      'Do my adjectives match the gender of the noun (cocina pequeña)?',
      'Did I describe at least 3 rooms?',
      'Did I use "en" for locations (en el dormitorio)?'
    ]
  },
  {
    id: 'wp-3', level: 'A1',
    prompt: '¿Qué te gusta comer y beber? Describe tus comidas favoritas.',
    promptEn: 'What do you like to eat and drink? Describe your favorite foods.',
    targetVocab: ['comer', 'beber', 'desayuno', 'almuerzo', 'cena', 'fruta', 'carne', 'pescado', 'arroz', 'agua', 'café'],
    targetGrammar: 'gustar (me gusta/n), indefinite articles, basic food vocabulary',
    sampleResponse: 'Me gusta mucho la comida española. Para el desayuno, me gusta tomar un café con leche y una tostada. Para el almuerzo, me gusta comer arroz con pollo. No me gusta el pescado. Para la cena, prefiero algo ligero, como una ensalada o una sopa. Me encantan las frutas, especialmente las naranjas y las fresas.',
    sampleResponseEn: 'I really like Spanish food. For breakfast, I like to have a coffee with milk and toast. For lunch, I like to eat rice with chicken. I don\'t like fish. For dinner, I prefer something light, like a salad or soup. I love fruits, especially oranges and strawberries.',
    selfCheckItems: [
      'Did I use "me gusta" + singular noun / "me gustan" + plural noun correctly?',
      'Did I mention at least two meals of the day?',
      'Did I include both things I like and things I don\'t like?',
      'Did I use "para" to indicate the meal (para el desayuno)?',
      'Did I use correct articles with food items?'
    ]
  },
  {
    id: 'wp-4', level: 'A1',
    prompt: 'Escribe sobre tu mejor amigo o amiga. ¿Cómo es? ¿Qué les gusta hacer juntos?',
    promptEn: 'Write about your best friend. What are they like? What do you like to do together?',
    targetVocab: ['amigo/a', 'juntos', 'divertido/a', 'inteligente', 'jugar', 'hablar', 'ir', 'gustar'],
    targetGrammar: 'ser for descriptions, present tense regular verbs, "nos gusta" (we like)',
    sampleResponse: 'Mi mejor amiga se llama Sara. Es alta y tiene el pelo rubio. Es muy divertida e inteligente. Nos conocemos desde el colegio. Nos gusta ir al cine juntas y también nos gusta pasear por el parque. Sara habla tres idiomas. Los fines de semana, a veces cocinamos juntas en su casa.',
    sampleResponseEn: 'My best friend is called Sara. She is tall and has blonde hair. She is very funny and intelligent. We\'ve known each other since school. We like going to the cinema together and we also like walking in the park. Sara speaks three languages. On weekends, sometimes we cook together at her house.',
    selfCheckItems: [
      'Did I describe physical appearance and personality?',
      'Did I use "ser" for characteristics (es divertida)?',
      'Did I mention shared activities?',
      'Did I use "nos gusta" for things we both like?',
      'Did I conjugate the verbs correctly for the subjects?'
    ]
  },
  {
    id: 'wp-5', level: 'A1',
    prompt: '¿Qué haces los fines de semana normalmente? Escribe sobre un fin de semana típico.',
    promptEn: 'What do you normally do on weekends? Write about a typical weekend.',
    targetVocab: ['sábado', 'domingo', 'mañana', 'tarde', 'noche', 'dormir', 'salir', 'visitar', 'leer', 'descansar'],
    targetGrammar: 'present tense for routines, time expressions, frequency adverbs (siempre, a veces, nunca)',
    sampleResponse: 'Los sábados por la mañana, siempre duermo hasta tarde. Después desayuno tranquilamente y leo el periódico. Por la tarde, a veces salgo con mis amigos o voy de compras. Los domingos son más tranquilos. Por la mañana, visito a mis padres y comemos juntos. Por la tarde, descanso en casa y veo una película.',
    sampleResponseEn: 'On Saturday mornings, I always sleep in. Then I have a leisurely breakfast and read the newspaper. In the afternoon, I sometimes go out with friends or go shopping. Sundays are quieter. In the morning, I visit my parents and we eat together. In the afternoon, I rest at home and watch a movie.',
    selfCheckItems: [
      'Did I use time expressions (por la mañana, por la tarde)?',
      'Did I include frequency adverbs (siempre, a veces)?',
      'Did I distinguish between Saturday and Sunday activities?',
      'Did I conjugate present tense verbs correctly?',
      'Did I mention at least 4 different activities?'
    ]
  },
  {
    id: 'wp-6', level: 'A1',
    prompt: 'Describe el tiempo en tu ciudad en las cuatro estaciones del año.',
    promptEn: 'Describe the weather in your city in the four seasons of the year.',
    targetVocab: ['primavera', 'verano', 'otoño', 'invierno', 'calor', 'frío', 'lluvia', 'sol', 'nieve', 'viento'],
    targetGrammar: 'hacer + weather (hace calor, hace frío), hay + noun (hay sol), llover/nevar',
    sampleResponse: 'Vivo en Madrid. En primavera hace buen tiempo. No hace mucho calor ni mucho frío. En verano hace mucho calor, a veces más de cuarenta grados. En otoño llueve bastante y hace viento. Las hojas de los árboles cambian de color. En invierno hace frío pero no nieva mucho en Madrid.',
    sampleResponseEn: 'I live in Madrid. In spring the weather is nice. It\'s not too hot or too cold. In summer it\'s very hot, sometimes over forty degrees. In autumn it rains quite a bit and it\'s windy. The leaves on the trees change color. In winter it\'s cold but it doesn\'t snow much in Madrid.',
    selfCheckItems: [
      'Did I use "hace" for weather (hace calor, hace frío, hace viento)?',
      'Did I mention all four seasons?',
      'Did I use "llueve" and "nieva" (impersonal verbs) correctly?',
      'Did I include temperature or degree descriptions?',
      'Did I use "en" + season (en primavera, en verano)?'
    ]
  },

  // ──────────────────────────────────────
  //  A2 — Daily life, past events, preferences  (6 items)
  // ──────────────────────────────────────

  {
    id: 'wp-7', level: 'A2',
    prompt: 'Escribe sobre tu rutina diaria. ¿A qué hora te levantas? ¿Qué haces antes de salir de casa?',
    promptEn: 'Write about your daily routine. What time do you get up? What do you do before leaving the house?',
    targetVocab: ['levantarse', 'ducharse', 'vestirse', 'desayunar', 'cepillarse', 'peinarse', 'acostarse'],
    targetGrammar: 'reflexive verbs, time expressions (a las siete, por la mañana), sequencing words (primero, luego, después)',
    sampleResponse: 'Me levanto a las siete de la mañana. Primero me ducho y me lavo el pelo. Después me visto y me peino. Luego desayuno en la cocina. Normalmente tomo un café con tostadas. Me cepillo los dientes y salgo de casa a las ocho. Voy al trabajo en metro. Por la noche, ceno a las nueve y me acuesto a las once.',
    sampleResponseEn: 'I get up at seven in the morning. First I take a shower and wash my hair. Then I get dressed and do my hair. Next I have breakfast in the kitchen. I usually have coffee with toast. I brush my teeth and leave the house at eight. I go to work by metro. In the evening, I have dinner at nine and go to bed at eleven.',
    selfCheckItems: [
      'Did I use reflexive verbs correctly (me levanto, me ducho)?',
      'Did I include time expressions (a las siete, por la mañana)?',
      'Did I use sequencing words (primero, luego, después)?',
      'Did I cover morning, afternoon, and evening?',
      'Are the reflexive pronouns correct for the subject (me, te, se)?'
    ]
  },
  {
    id: 'wp-8', level: 'A2',
    prompt: '¿Qué hiciste el fin de semana pasado? Cuenta tus actividades.',
    promptEn: 'What did you do last weekend? Describe your activities.',
    targetVocab: ['pasado', 'ayer', 'el sábado', 'fui', 'comí', 'vi', 'jugué', 'compré'],
    targetGrammar: 'preterite tense (regular and common irregulars: fui, hice, vi), time markers (el sábado pasado, ayer)',
    sampleResponse: 'El fin de semana pasado lo pasé muy bien. El sábado por la mañana fui al mercado y compré frutas y verduras frescas. Después cociné una paella para mis amigos. Por la tarde jugamos a las cartas y tomamos café. El domingo fui al cine y vi una película de ciencia ficción. Me gustó mucho. Por la noche cené en un restaurante italiano.',
    sampleResponseEn: 'Last weekend I had a great time. On Saturday morning I went to the market and bought fresh fruits and vegetables. Then I cooked a paella for my friends. In the afternoon we played cards and had coffee. On Sunday I went to the cinema and saw a science fiction movie. I liked it a lot. In the evening I had dinner at an Italian restaurant.',
    selfCheckItems: [
      'Did I use the preterite tense consistently (fui, compré, vi)?',
      'Did I include time markers (el sábado, por la mañana)?',
      'Did I use irregular preterite forms correctly (fui, hice, vi)?',
      'Did I narrate events in chronological order?',
      'Did I mention activities for both Saturday and Sunday?'
    ]
  },
  {
    id: 'wp-9', level: 'A2',
    prompt: 'Describe tu ciudad o pueblo. ¿Qué lugares hay? ¿Qué se puede hacer allí?',
    promptEn: 'Describe your city or town. What places are there? What can you do there?',
    targetVocab: ['plaza', 'parque', 'museo', 'restaurante', 'iglesia', 'mercado', 'bonito', 'tranquilo', 'moderno'],
    targetGrammar: 'hay + places, estar for location, se puede + infinitive, comparatives',
    sampleResponse: 'Vivo en Valencia, una ciudad muy bonita en el este de España. Hay muchos parques y museos. La Ciudad de las Artes y las Ciencias es un lugar moderno y muy famoso. En el centro hay una plaza grande donde la gente pasea por las tardes. Se puede comer paella en muchos restaurantes. La playa está muy cerca del centro. Valencia es más pequeña que Madrid pero tiene más sol.',
    sampleResponseEn: 'I live in Valencia, a very beautiful city in eastern Spain. There are many parks and museums. The City of Arts and Sciences is a modern and very famous place. In the center there is a large square where people walk in the evenings. You can eat paella at many restaurants. The beach is very close to the center. Valencia is smaller than Madrid but has more sun.',
    selfCheckItems: [
      'Did I use "hay" to describe what exists in the city?',
      'Did I use "estar" for location (la playa está cerca)?',
      'Did I use "se puede" for things you can do?',
      'Did I include adjectives describing the city?',
      'Did I use at least one comparison (más... que)?'
    ]
  },
  {
    id: 'wp-10', level: 'A2',
    prompt: 'Escribe un correo electrónico a un amigo invitándolo a hacer algo este fin de semana.',
    promptEn: 'Write an email to a friend inviting them to do something this weekend.',
    targetVocab: ['querido/a', 'invitar', 'plan', 'quedar', 'recoger', 'genial', 'espero', 'abrazo'],
    targetGrammar: 'informal register (tú), ir a + infinitive (future plans), question formation',
    sampleResponse: '¡Hola, Marta!\n\n¿Qué tal? Te escribo porque tengo un plan genial para este sábado. Van a abrir un restaurante mexicano nuevo cerca de mi casa y quiero ir a probarlo. ¿Te gustaría venir conmigo? Podemos quedar a las dos de la tarde. Si quieres, te recojo en tu casa.\n\nDespués de comer, podemos ir a pasear por el parque o tomar un helado. ¿Qué te parece?\n\nEspero tu respuesta.\n\n¡Un abrazo!\nCarlos',
    sampleResponseEn: 'Hi Marta!\n\nHow are you? I\'m writing because I have a great plan for this Saturday. They\'re opening a new Mexican restaurant near my house and I want to go try it. Would you like to come with me? We can meet at two in the afternoon. If you want, I\'ll pick you up at your house.\n\nAfter eating, we can go for a walk in the park or get ice cream. What do you think?\n\nI hope to hear from you.\n\nA hug!\nCarlos',
    selfCheckItems: [
      'Did I use an appropriate greeting and sign-off?',
      'Did I clearly state the invitation and plan?',
      'Did I suggest a time and place?',
      'Did I use "ir a" + infinitive for future plans?',
      'Did I ask questions to engage the reader (¿Te gustaría...? ¿Qué te parece?)?'
    ]
  },
  {
    id: 'wp-11', level: 'A2',
    prompt: 'Describe a una persona que admiras. ¿Quién es? ¿Por qué la admiras? ¿Cómo es físicamente y de personalidad?',
    promptEn: 'Describe a person you admire. Who are they? Why do you admire them? What do they look like and what is their personality like?',
    targetVocab: ['admirar', 'valiente', 'generoso/a', 'trabajador/a', 'amable', 'pelo', 'ojos', 'porque'],
    targetGrammar: 'ser vs estar, physical descriptions (tener + body parts), porque + reason',
    sampleResponse: 'La persona que más admiro es mi abuela. Se llama Carmen y tiene setenta y ocho años. Es una mujer baja con el pelo blanco y los ojos marrones. Siempre está sonriendo. La admiro porque es muy valiente y generosa. Cuando era joven, trabajó mucho para sacar adelante a su familia. Siempre ayuda a los demás y nunca se queja. Es la persona más amable que conozco.',
    sampleResponseEn: 'The person I most admire is my grandmother. Her name is Carmen and she is seventy-eight years old. She is a short woman with white hair and brown eyes. She is always smiling. I admire her because she is very brave and generous. When she was young, she worked hard to support her family. She always helps others and never complains. She is the kindest person I know.',
    selfCheckItems: [
      'Did I use "ser" for permanent traits and "estar" for states/conditions?',
      'Did I use "tener" for physical features (tiene el pelo, tiene los ojos)?',
      'Did I give reasons with "porque"?',
      'Did I include both physical and personality descriptions?',
      'Did I use the superlative (la persona más... que conozco)?'
    ]
  },
  {
    id: 'wp-12', level: 'A2',
    prompt: '¿Cuál es tu pasatiempo favorito? ¿Desde cuándo lo practicas? ¿Por qué te gusta?',
    promptEn: 'What is your favorite hobby? How long have you been doing it? Why do you like it?',
    targetVocab: ['pasatiempo', 'practicar', 'disfrutar', 'relajarse', 'aprender', 'desde', 'porque', 'cuando'],
    targetGrammar: 'present tense for habits, desde hace (for duration), porque (giving reasons)',
    sampleResponse: 'Mi pasatiempo favorito es tocar la guitarra. Empecé a tocar cuando tenía doce años, así que practico desde hace más de quince años. Me gusta porque me relaja después de un día largo de trabajo. Normalmente toco por las tardes, una hora más o menos. Me gusta tocar canciones de rock y flamenco. A veces toco con mis amigos en un grupo. Espero seguir mejorando y algún día tocar en un concierto.',
    sampleResponseEn: 'My favorite hobby is playing guitar. I started playing when I was twelve years old, so I\'ve been practicing for more than fifteen years. I like it because it relaxes me after a long day of work. I usually play in the evenings, about an hour. I like playing rock and flamenco songs. Sometimes I play with my friends in a band. I hope to keep improving and someday play at a concert.',
    selfCheckItems: [
      'Did I use "desde hace" for duration correctly?',
      'Did I explain WHY I enjoy the hobby?',
      'Did I include how often or when I do this activity?',
      'Did I use the present tense for habitual actions?',
      'Did I mention any future hopes or goals related to the hobby?'
    ]
  },

  // ──────────────────────────────────────
  //  B1 — Narration, comparison, opinion  (6 items)
  // ──────────────────────────────────────

  {
    id: 'wp-13', level: 'B1',
    prompt: 'Compara dos ciudades que has visitado. ¿Cuáles son las diferencias y similitudes?',
    promptEn: 'Compare two cities you have visited. What are the differences and similarities?',
    targetVocab: ['comparar', 'mientras que', 'en cambio', 'ambos', 'sin embargo', 'más... que', 'tan... como'],
    targetGrammar: 'comparatives (más/menos... que, tan... como), preterite vs imperfect, contrast connectors',
    sampleResponse: 'He visitado Barcelona y Lisboa y son ciudades muy diferentes. Barcelona es más grande y más turística que Lisboa. Tiene playas bonitas y una arquitectura impresionante, como la Sagrada Familia. Lisboa, en cambio, es más tranquila y tiene un ambiente más relajado. Ambas ciudades están junto al mar y tienen una gastronomía excelente. Sin embargo, mientras que en Barcelona la comida es más cara, en Lisboa los restaurantes son más asequibles. Visité Barcelona en verano y hacía mucho calor. Cuando fui a Lisboa, era primavera y el clima era perfecto.',
    sampleResponseEn: 'I have visited Barcelona and Lisbon and they are very different cities. Barcelona is bigger and more touristy than Lisbon. It has beautiful beaches and impressive architecture, like the Sagrada Familia. Lisbon, on the other hand, is quieter and has a more relaxed atmosphere. Both cities are by the sea and have excellent cuisine. However, while food is more expensive in Barcelona, restaurants are more affordable in Lisbon. I visited Barcelona in summer and it was very hot. When I went to Lisbon, it was spring and the weather was perfect.',
    selfCheckItems: [
      'Did I use comparatives correctly (más... que, menos... que, tan... como)?',
      'Did I use contrast connectors (en cambio, sin embargo, mientras que)?',
      'Did I include both differences and similarities?',
      'Did I use preterite for completed actions and imperfect for descriptions?',
      'Did I describe specific aspects (food, weather, atmosphere, sights)?'
    ]
  },
  {
    id: 'wp-14', level: 'B1',
    prompt: 'Cuenta una anécdota interesante o divertida que te haya pasado. ¿Qué ocurrió? ¿Cómo te sentiste?',
    promptEn: 'Tell an interesting or funny anecdote that happened to you. What happened? How did you feel?',
    targetVocab: ['de repente', 'resulta que', 'al final', 'por suerte', 'me di cuenta', 'no podía creer'],
    targetGrammar: 'preterite vs imperfect (narration), sequencing expressions, emotional reactions',
    sampleResponse: 'Una vez, cuando tenía veinte años, fui de viaje a Italia con mis amigos. Estábamos en Roma y buscábamos nuestro hotel. Hacía mucho calor y estábamos cansados. Le pregunté a un hombre por la dirección y me contestó en español perfecto. Resulta que era de mi misma ciudad. No podía creerlo. Nos invitó a tomar un café y nos explicó los mejores lugares para visitar. Al final, fue la mejor parte del viaje. Por suerte, todavía somos amigos.',
    sampleResponseEn: 'Once, when I was twenty, I went on a trip to Italy with my friends. We were in Rome looking for our hotel. It was very hot and we were tired. I asked a man for directions and he answered me in perfect Spanish. It turns out he was from my same city. I couldn\'t believe it. He invited us for coffee and told us about the best places to visit. In the end, it was the best part of the trip. Luckily, we\'re still friends.',
    selfCheckItems: [
      'Did I use the imperfect for background descriptions (estábamos, hacía)?',
      'Did I use the preterite for main events (fui, pregunté, contestó)?',
      'Did I include narrative expressions (de repente, resulta que, al final)?',
      'Did I describe my feelings and reactions?',
      'Does the story have a clear beginning, middle, and end?'
    ]
  },
  {
    id: 'wp-15', level: 'B1',
    prompt: 'Escribe sobre un problema medioambiental que te preocupe. ¿Cuál es el problema? ¿Qué soluciones propones?',
    promptEn: 'Write about an environmental problem that concerns you. What is the problem? What solutions do you propose?',
    targetVocab: ['medio ambiente', 'contaminación', 'reciclar', 'energía', 'reducir', 'proteger', 'cambio climático'],
    targetGrammar: 'present subjunctive (es importante que, es necesario que), conditional (deberíamos), opinion expressions',
    sampleResponse: 'Uno de los problemas que más me preocupa es la contaminación del plástico en los océanos. Cada año, millones de toneladas de plástico terminan en el mar y afectan a los animales marinos. Creo que es necesario que los gobiernos prohíban los plásticos de un solo uso. También es importante que cada persona recicle más y use bolsas reutilizables. Deberíamos reducir nuestro consumo de productos con envases plásticos. Si todos hacemos un pequeño esfuerzo, podemos mejorar la situación.',
    sampleResponseEn: 'One of the problems that concerns me most is plastic pollution in the oceans. Each year, millions of tons of plastic end up in the sea and affect marine animals. I think it\'s necessary that governments ban single-use plastics. It\'s also important that each person recycles more and uses reusable bags. We should reduce our consumption of products with plastic packaging. If we all make a small effort, we can improve the situation.',
    selfCheckItems: [
      'Did I use "es importante/necesario que" + subjunctive?',
      'Did I clearly state the problem?',
      'Did I propose at least two solutions?',
      'Did I use opinion expressions (creo que, me preocupa)?',
      'Did I use the conditional for suggestions (deberíamos)?'
    ]
  },
  {
    id: 'wp-16', level: 'B1',
    prompt: 'Describe tu experiencia aprendiendo español. ¿Cuándo empezaste? ¿Qué ha sido lo más difícil? ¿Y lo más divertido?',
    promptEn: 'Describe your experience learning Spanish. When did you start? What has been the hardest part? And the most fun?',
    targetVocab: ['aprender', 'difícil', 'fácil', 'mejorar', 'practicar', 'pronunciación', 'gramática', 'vocabulario'],
    targetGrammar: 'present perfect (he aprendido, ha sido), preterite (empecé), superlatives (lo más difícil)',
    sampleResponse: 'Empecé a aprender español hace tres años porque quería viajar a Latinoamérica. Al principio, lo más difícil fue la pronunciación de la "rr" y la diferencia entre ser y estar. He mejorado mucho, pero todavía me cuesta usar el subjuntivo. Lo más divertido ha sido hablar con hablantes nativos y entender canciones en español. He aprendido mucho vocabulario viendo series españolas. Creo que lo mejor de aprender un idioma es descubrir una nueva cultura.',
    sampleResponseEn: 'I started learning Spanish three years ago because I wanted to travel to Latin America. At first, the hardest thing was the pronunciation of "rr" and the difference between ser and estar. I have improved a lot, but I still struggle with the subjunctive. The most fun thing has been talking to native speakers and understanding songs in Spanish. I have learned a lot of vocabulary watching Spanish series. I think the best thing about learning a language is discovering a new culture.',
    selfCheckItems: [
      'Did I use the present perfect for experiences up to now (he aprendido, ha sido)?',
      'Did I use the preterite for the start point (empecé)?',
      'Did I use superlatives (lo más difícil, lo más divertido)?',
      'Did I include specific examples of challenges and enjoyable moments?',
      'Did I use "todavía" or "aún" for things still in progress?'
    ]
  },
  {
    id: 'wp-17', level: 'B1',
    prompt: 'Si pudieras vivir en cualquier época de la historia, ¿cuál elegirías? ¿Por qué?',
    promptEn: 'If you could live in any era of history, which would you choose? Why?',
    targetVocab: ['época', 'siglo', 'elegir', 'descubrimiento', 'inventar', 'vivir', 'imaginar', 'fascinante'],
    targetGrammar: 'conditional (viviría, elegiría), imperfect subjunctive (si pudiera), reason clauses',
    sampleResponse: 'Si pudiera vivir en cualquier época, elegiría el Renacimiento en Italia, en el siglo XV. Me fascina ese periodo porque fue una época de grandes descubrimientos artísticos y científicos. Me gustaría conocer a Leonardo da Vinci y ver cómo pintaba. También me encantaría pasear por Florencia y ver la ciudad en su momento de mayor esplendor. Sin embargo, no me gustaría vivir sin la medicina moderna. Por eso, si fuera posible, llevaría una maleta con antibióticos.',
    sampleResponseEn: 'If I could live in any era, I would choose the Renaissance in Italy, in the 15th century. That period fascinates me because it was an era of great artistic and scientific discoveries. I would like to meet Leonardo da Vinci and see how he painted. I would also love to walk through Florence and see the city at its greatest splendor. However, I wouldn\'t like to live without modern medicine. That\'s why, if it were possible, I would bring a suitcase with antibiotics.',
    selfCheckItems: [
      'Did I use "si + imperfect subjunctive, conditional" correctly?',
      'Did I use the conditional for hypothetical wishes (me gustaría, elegiría)?',
      'Did I explain WHY I chose that era?',
      'Did I mention both positive and negative aspects?',
      'Did I use connecting words to structure my argument?'
    ]
  },
  {
    id: 'wp-18', level: 'B1',
    prompt: 'Escribe una reseña de una película o serie que hayas visto recientemente. ¿La recomendarías?',
    promptEn: 'Write a review of a movie or series you have seen recently. Would you recommend it?',
    targetVocab: ['película', 'serie', 'trama', 'personaje', 'actuación', 'recomendar', 'impresionante', 'aburrido'],
    targetGrammar: 'present perfect (he visto), conditional (recomendaría), opinion structures, adjective agreement',
    sampleResponse: 'Hace poco he visto la serie "La Casa de Papel" y me ha encantado. La trama es muy emocionante: un grupo de ladrones planea el atraco perfecto a la Fábrica Nacional de Moneda. Los personajes son complejos e interesantes. Mi favorito es el Profesor, que es muy inteligente y siempre tiene un plan B. La actuación de todos los actores es impresionante. Lo único negativo es que algunas partes son un poco lentas. En general, la recomendaría a cualquier persona que disfrute de series de acción y suspense.',
    sampleResponseEn: 'I recently watched the series "Money Heist" and I loved it. The plot is very exciting: a group of thieves plans the perfect heist of the Royal Mint. The characters are complex and interesting. My favorite is the Professor, who is very intelligent and always has a plan B. The acting by all the actors is impressive. The only negative thing is that some parts are a bit slow. Overall, I would recommend it to anyone who enjoys action and suspense series.',
    selfCheckItems: [
      'Did I use the present perfect for recent events (he visto, me ha encantado)?',
      'Did I describe the plot without too many spoilers?',
      'Did I include both positive and negative aspects?',
      'Did I use opinion expressions (me ha encantado, lo único negativo)?',
      'Did I use the conditional for the recommendation (recomendaría)?'
    ]
  },

  // ──────────────────────────────────────
  //  B2 — Formal writing, argumentation  (6 items)
  // ──────────────────────────────────────

  {
    id: 'wp-19', level: 'B2',
    prompt: 'Escribe una carta de queja formal a un hotel donde tuviste una mala experiencia durante tu estancia.',
    promptEn: 'Write a formal complaint letter to a hotel where you had a bad experience during your stay.',
    targetVocab: ['estimado/a', 'reclamación', 'decepcionante', 'inaceptable', 'exigir', 'compensación', 'atentamente'],
    targetGrammar: 'formal register (usted), subjunctive in formal requests (le ruego que), passive constructions',
    sampleResponse: 'Estimado Director del Hotel Miramar:\n\nMe dirijo a usted para expresar mi profunda insatisfacción con el servicio recibido durante mi estancia del 5 al 8 de marzo. En primer lugar, la habitación no estaba limpia cuando llegué. Había toallas sucias en el baño y las sábanas no habían sido cambiadas. Además, el aire acondicionado no funcionaba y, a pesar de que llamé a recepción tres veces, nadie vino a repararlo.\n\nLe ruego que tome las medidas necesarias para que esta situación no se repita. Asimismo, le solicito una compensación por las molestias causadas, ya sea una devolución parcial del importe o una estancia gratuita.\n\nQuedo a la espera de su respuesta.\n\nAtentamente,\nMaría González',
    sampleResponseEn: 'Dear Director of Hotel Miramar:\n\nI am writing to express my deep dissatisfaction with the service received during my stay from March 5 to 8. Firstly, the room was not clean when I arrived. There were dirty towels in the bathroom and the sheets had not been changed. Furthermore, the air conditioning was not working and, despite calling reception three times, no one came to repair it.\n\nI request that you take the necessary measures so that this situation does not happen again. I also request compensation for the inconvenience caused, whether a partial refund or a complimentary stay.\n\nI look forward to your response.\n\nSincerely,\nMaría González',
    selfCheckItems: [
      'Did I use formal register throughout (usted, not tú)?',
      'Did I use formal opening and closing (Estimado..., Atentamente)?',
      'Did I use the subjunctive in formal requests (le ruego que tome)?',
      'Did I clearly state the problems and the desired resolution?',
      'Did I use formal connectors (en primer lugar, además, asimismo)?'
    ]
  },
  {
    id: 'wp-20', level: 'B2',
    prompt: '¿Debería ser obligatorio aprender un segundo idioma en la escuela? Argumenta tu opinión.',
    promptEn: 'Should learning a second language be mandatory in school? Argue your opinion.',
    targetVocab: ['obligatorio', 'bilingüe', 'capacidad', 'cognitivo', 'globalización', 'herramienta', 'en mi opinión'],
    targetGrammar: 'subjunctive in opinion clauses, conditional for hypotheticals, argumentative connectors (por un lado, por otro lado)',
    sampleResponse: 'En mi opinión, aprender un segundo idioma debería ser obligatorio en todas las escuelas. Hay varias razones que apoyan esta postura.\n\nPor un lado, los estudios demuestran que el aprendizaje de idiomas mejora las capacidades cognitivas de los niños. Les ayuda a desarrollar la memoria, la concentración y la capacidad de resolver problemas. Por otro lado, en un mundo cada vez más globalizado, hablar más de un idioma es una herramienta fundamental para el futuro profesional.\n\nAlgunos argumentan que no todos los estudiantes tienen aptitudes para los idiomas. Sin embargo, no creo que eso sea razón suficiente para eliminar la asignatura. También hay alumnos que no tienen facilidad para las matemáticas, y nadie sugiere que se eliminen.\n\nEn conclusión, los beneficios de aprender un idioma superan con creces las dificultades. Es fundamental que los gobiernos inviertan en una educación bilingüe de calidad.',
    sampleResponseEn: 'In my opinion, learning a second language should be mandatory in all schools. There are several reasons that support this position.\n\nOn the one hand, studies show that language learning improves children\'s cognitive abilities. It helps them develop memory, concentration, and problem-solving skills. On the other hand, in an increasingly globalized world, speaking more than one language is an essential tool for one\'s professional future.\n\nSome argue that not all students have an aptitude for languages. However, I don\'t believe that is sufficient reason to eliminate the subject. There are also students who don\'t find math easy, and nobody suggests eliminating that.\n\nIn conclusion, the benefits of learning a language far outweigh the difficulties. It is essential that governments invest in quality bilingual education.',
    selfCheckItems: [
      'Did I clearly state my opinion in the introduction?',
      'Did I use argumentative connectors (por un lado, por otro lado, sin embargo)?',
      'Did I address a counterargument and refute it?',
      'Did I use the subjunctive where required (no creo que sea, es fundamental que inviertan)?',
      'Did I write a clear conclusion that summarizes my position?'
    ]
  },
  {
    id: 'wp-21', level: 'B2',
    prompt: 'Describe una situación en tu vida en la que tuviste que tomar una decisión difícil. ¿Qué pasó? ¿Qué harías diferente?',
    promptEn: 'Describe a situation in your life where you had to make a difficult decision. What happened? What would you do differently?',
    targetVocab: ['decisión', 'arrepentirse', 'consecuencia', 'valorar', 'reflexionar', 'a pesar de'],
    targetGrammar: 'preterite/imperfect narration, conditional perfect (habría hecho), pluperfect (había decidido)',
    sampleResponse: 'Hace unos años, me ofrecieron un trabajo muy bueno en otra ciudad. El sueldo era excelente y las oportunidades de crecimiento eran enormes. Sin embargo, significaba dejar a mi familia y a mis amigos. Estuve semanas reflexionando. Finalmente, decidí quedarme porque mi madre estaba enferma y la necesitaba.\n\nA veces me pregunto qué habría pasado si hubiera aceptado. Quizás habría avanzado más en mi carrera profesional. Sin embargo, no me arrepiento de mi decisión. Pude estar con mi madre durante un momento difícil y eso no tiene precio. Si pudiera volver atrás, tomaría la misma decisión, aunque habría intentado negociar la posibilidad de trabajar a distancia.',
    sampleResponseEn: 'A few years ago, I was offered a very good job in another city. The salary was excellent and the growth opportunities were enormous. However, it meant leaving my family and friends. I spent weeks reflecting. Finally, I decided to stay because my mother was ill and she needed me.\n\nSometimes I wonder what would have happened if I had accepted. Perhaps I would have advanced more in my professional career. However, I don\'t regret my decision. I was able to be with my mother during a difficult time and that is priceless. If I could go back, I would make the same decision, although I would have tried to negotiate the possibility of remote work.',
    selfCheckItems: [
      'Did I use preterite for completed actions and imperfect for background?',
      'Did I use the conditional perfect (habría pasado, habría aceptado)?',
      'Did I use the pluperfect subjunctive (si hubiera aceptado)?',
      'Did I reflect on what I would do differently?',
      'Did I include emotional reactions and reasoning?'
    ]
  },
  {
    id: 'wp-22', level: 'B2',
    prompt: '¿Cómo ha cambiado la tecnología la forma en que nos comunicamos? ¿Es un cambio positivo o negativo?',
    promptEn: 'How has technology changed the way we communicate? Is it a positive or negative change?',
    targetVocab: ['redes sociales', 'comunicación', 'inmediato', 'aislamiento', 'herramienta', 'generación', 'brecha digital'],
    targetGrammar: 'present perfect for changes, passive voice, concessive clauses (aunque, si bien)',
    sampleResponse: 'La tecnología ha transformado radicalmente la forma en que nos comunicamos. En las últimas dos décadas, hemos pasado de las cartas y las llamadas telefónicas a los mensajes instantáneos y las videollamadas.\n\nPor una parte, estos avances han hecho posible que personas de distintos continentes se comuniquen en tiempo real. Las redes sociales han permitido reconectar con amigos de la infancia y crear comunidades globales. Si bien esto es positivo, también ha generado problemas.\n\nPor otra parte, la comunicación digital ha reducido la calidad de nuestras interacciones. Muchas personas prefieren enviar un mensaje antes que llamar por teléfono. Además, las redes sociales pueden crear una sensación de aislamiento, aunque parezca contradictorio.\n\nEn mi opinión, la tecnología es una herramienta neutra. Depende de nosotros usarla de manera responsable y no dejar que sustituya el contacto humano real.',
    sampleResponseEn: 'Technology has radically transformed the way we communicate. In the last two decades, we have gone from letters and phone calls to instant messages and video calls.\n\nOn the one hand, these advances have made it possible for people on different continents to communicate in real time. Social media has allowed us to reconnect with childhood friends and create global communities. While this is positive, it has also generated problems.\n\nOn the other hand, digital communication has reduced the quality of our interactions. Many people prefer sending a message rather than making a phone call. Moreover, social media can create a sense of isolation, even though it may seem contradictory.\n\nIn my opinion, technology is a neutral tool. It\'s up to us to use it responsibly and not let it replace real human contact.',
    selfCheckItems: [
      'Did I use the present perfect for recent changes (ha transformado, hemos pasado)?',
      'Did I present both positive and negative aspects?',
      'Did I use concessive clauses (si bien, aunque)?',
      'Did I include specific examples (redes sociales, videollamadas)?',
      'Did I state a clear personal conclusion?'
    ]
  },
  {
    id: 'wp-23', level: 'B2',
    prompt: 'Escribe sobre las ventajas y desventajas de trabajar desde casa frente a trabajar en una oficina.',
    promptEn: 'Write about the advantages and disadvantages of working from home versus working in an office.',
    targetVocab: ['teletrabajo', 'productividad', 'flexibilidad', 'conciliación', 'distracciones', 'colaboración'],
    targetGrammar: 'comparative structures, subjunctive after value judgments, conditional for recommendations',
    sampleResponse: 'El teletrabajo se ha convertido en una realidad para millones de personas. Aunque tiene muchas ventajas, también presenta desafíos importantes.\n\nEntre las ventajas, destaca la flexibilidad horaria. El trabajador puede organizar su día de manera más eficiente y no necesita perder tiempo en desplazamientos. Además, es más fácil que consiga una mejor conciliación entre la vida laboral y personal.\n\nSin embargo, trabajar desde casa puede generar aislamiento social. Es posible que los empleados se sientan desconectados de sus compañeros. Las distracciones del hogar también pueden reducir la productividad, y la línea entre el trabajo y la vida personal se difumina.\n\nYo recomendaría un modelo híbrido: algunos días en la oficina para fomentar la colaboración y otros en casa para concentrarse. De esta manera, se combinarían lo mejor de ambos mundos.',
    sampleResponseEn: 'Remote work has become a reality for millions of people. Although it has many advantages, it also presents significant challenges.\n\nAmong the advantages, schedule flexibility stands out. Workers can organize their day more efficiently and don\'t need to waste time commuting. Additionally, it\'s easier for them to achieve a better work-life balance.\n\nHowever, working from home can create social isolation. Employees may feel disconnected from their colleagues. Home distractions can also reduce productivity, and the line between work and personal life becomes blurred.\n\nI would recommend a hybrid model: some days in the office to encourage collaboration and others at home to focus. This way, the best of both worlds would be combined.',
    selfCheckItems: [
      'Did I present advantages and disadvantages in a balanced way?',
      'Did I use subjunctive after impersonal expressions (es posible que se sientan)?',
      'Did I use the conditional for recommendations (recomendaría)?',
      'Did I use formal connectors (entre las ventajas, sin embargo, de esta manera)?',
      'Did I provide a clear personal conclusion or recommendation?'
    ]
  },
  {
    id: 'wp-24', level: 'B2',
    prompt: 'Escribe sobre una tradición o costumbre de un país hispanohablante que te parezca interesante.',
    promptEn: 'Write about a tradition or custom from a Spanish-speaking country that you find interesting.',
    targetVocab: ['tradición', 'costumbre', 'celebración', 'ancestral', 'patrimonio', 'festejo', 'arraigado'],
    targetGrammar: 'passive voice (se celebra), relative clauses (que, donde, cuando), present for describing customs',
    sampleResponse: 'Una tradición que me fascina es el Día de los Muertos en México, que se celebra el 1 y el 2 de noviembre. A diferencia de lo que podría pensarse, no es una celebración triste sino alegre. Las familias mexicanas honran a sus seres queridos fallecidos creando altares coloridos, llamados ofrendas, que se decoran con flores de cempasúchil, velas, fotografías y la comida favorita del difunto.\n\nEsta tradición tiene raíces prehispánicas que se remontan a las civilizaciones azteca y maya. Cuando los españoles llegaron, se fusionó con las tradiciones católicas del Día de Todos los Santos.\n\nLo que más me llama la atención es la actitud hacia la muerte: en lugar de temerla, se acepta como parte natural de la vida. Es una tradición que fue declarada Patrimonio Cultural Inmaterial por la UNESCO, lo cual demuestra su valor universal.',
    sampleResponseEn: 'A tradition that fascinates me is the Day of the Dead in Mexico, which is celebrated on November 1st and 2nd. Unlike what one might think, it\'s not a sad celebration but a joyful one. Mexican families honor their deceased loved ones by creating colorful altars, called ofrendas, decorated with marigolds, candles, photographs, and the deceased\'s favorite food.\n\nThis tradition has pre-Hispanic roots that go back to the Aztec and Maya civilizations. When the Spanish arrived, it merged with the Catholic traditions of All Saints\' Day.\n\nWhat strikes me most is the attitude towards death: instead of fearing it, it is accepted as a natural part of life. It is a tradition that was declared Intangible Cultural Heritage by UNESCO, which demonstrates its universal value.',
    selfCheckItems: [
      'Did I use "se celebra" and other passive constructions?',
      'Did I use relative clauses (que se celebra, que se decoran)?',
      'Did I include historical context?',
      'Did I explain why this tradition is interesting to me personally?',
      'Did I use the present tense for describing ongoing customs?'
    ]
  },

  // ──────────────────────────────────────
  //  C1 — Advanced argumentation & nuanced writing  (5 items)
  // ──────────────────────────────────────

  {
    id: 'wp-25', level: 'C1',
    prompt: '¿Es posible separar la obra artística de la conducta personal del artista? Argumenta a favor o en contra.',
    promptEn: 'Is it possible to separate the artistic work from the personal conduct of the artist? Argue for or against.',
    targetVocab: ['ética', 'estética', 'separar', 'juzgar', 'contribución', 'legado', 'polémico', 'dilema'],
    targetGrammar: 'advanced subjunctive uses, complex conditionals, concessive structures, rhetorical questions',
    sampleResponse: 'La cuestión de si es posible — o deseable — separar la obra artística de la conducta moral de su creador constituye uno de los dilemas culturales más complejos de nuestra época.\n\nQuienes defienden la separación argumentan que el valor estético de una obra es independiente de quien la creó. Si rechazáramos toda obra cuyo autor hubiera tenido una conducta reprobable, perderíamos una parte significativa del patrimonio cultural de la humanidad. ¿Deberíamos dejar de escuchar la música de Wagner por sus ideas antisemitas? ¿Tendríamos que retirar los cuadros de Caravaggio de los museos por haber cometido un asesinato?\n\nNo obstante, los críticos de esta postura señalan que consumir la obra de alguien implica, en cierta medida, financiarlo y legitimarlo. Es difícil que un espectador disfrute plenamente de una película si sabe que su director ha cometido abusos.\n\nPersonalmente, considero que no existe una respuesta universal. Cada caso requiere un análisis particular que tenga en cuenta la gravedad de los actos, la relación entre la obra y la conducta, y el contexto histórico. Lo que sí creo imprescindible es que no utilicemos el talento como excusa para ignorar el sufrimiento de las víctimas.',
    sampleResponseEn: 'The question of whether it is possible — or desirable — to separate artistic work from the moral conduct of its creator constitutes one of the most complex cultural dilemmas of our time.\n\nThose who defend separation argue that the aesthetic value of a work is independent of who created it. If we were to reject every work whose author had reprehensible conduct, we would lose a significant part of humanity\'s cultural heritage. Should we stop listening to Wagner\'s music because of his antisemitic ideas? Should we remove Caravaggio\'s paintings from museums because he committed murder?\n\nHowever, critics of this position point out that consuming someone\'s work implies, to a certain extent, financing and legitimizing them. It\'s hard for a viewer to fully enjoy a film if they know its director has committed abuse.\n\nPersonally, I believe there is no universal answer. Each case requires a particular analysis that takes into account the severity of the acts, the relationship between the work and the conduct, and the historical context. What I do believe essential is that we not use talent as an excuse to ignore the suffering of victims.',
    selfCheckItems: [
      'Did I present multiple perspectives before stating my opinion?',
      'Did I use complex subjunctive structures (si rechazáramos, hubiera tenido)?',
      'Did I use rhetorical questions effectively?',
      'Did I use advanced connectors (no obstante, en cierta medida, lo que sí creo)?',
      'Did I avoid an oversimplified binary answer?',
      'Did I maintain a formal, academic register throughout?'
    ]
  },
  {
    id: 'wp-26', level: 'C1',
    prompt: '¿Deberían los países ricos tener la obligación legal de acoger a refugiados? Desarrolla tu argumento.',
    promptEn: 'Should wealthy countries be legally obligated to take in refugees? Develop your argument.',
    targetVocab: ['refugiado', 'asilo', 'obligación', 'solidaridad', 'soberanía', 'derecho', 'humanitario', 'integración'],
    targetGrammar: 'subjunctive in subordinate clauses, passive and impersonal constructions, complex sentence structures',
    sampleResponse: 'La crisis migratoria global nos obliga a replantearnos los límites de la solidaridad internacional. La pregunta de si los países ricos deberían estar legalmente obligados a acoger refugiados no admite respuestas simples.\n\nDesde una perspectiva humanitaria, es indiscutible que las naciones con más recursos tienen una responsabilidad moral hacia quienes huyen de la guerra y la persecución. La Convención de Ginebra de 1951 ya establece el derecho al asilo, aunque su aplicación sea desigual. No se puede tolerar que personas mueran en el Mediterráneo mientras los países europeos debaten cuotas.\n\nAhora bien, quienes se oponen a una obligación legal argumentan que cada Estado tiene derecho a gestionar su soberanía y sus fronteras. Sostienen que una acogida masiva sin planificación podría generar tensiones sociales y económicas que, a la larga, perjudicarían tanto a los refugiados como a la población local.\n\nCreo firmemente que debería existir un mecanismo vinculante de reparto proporcional, siempre que se garanticen los recursos necesarios para una integración digna. No es aceptable que unos pocos países asuman toda la carga mientras otros miran hacia otro lado.',
    sampleResponseEn: 'The global migration crisis forces us to rethink the limits of international solidarity. The question of whether wealthy countries should be legally obligated to take in refugees does not admit simple answers.\n\nFrom a humanitarian perspective, it is indisputable that nations with more resources have a moral responsibility towards those fleeing war and persecution. The 1951 Geneva Convention already establishes the right to asylum, even though its application is uneven. We cannot tolerate people dying in the Mediterranean while European countries debate quotas.\n\nThat said, those who oppose a legal obligation argue that every state has the right to manage its sovereignty and borders. They maintain that mass reception without planning could generate social and economic tensions that, in the long run, would harm both refugees and the local population.\n\nI firmly believe that a binding proportional distribution mechanism should exist, provided that the necessary resources for dignified integration are guaranteed. It is not acceptable that a few countries bear the entire burden while others look the other way.',
    selfCheckItems: [
      'Did I use subjunctive in subordinate clauses (aunque su aplicación sea, siempre que se garanticen)?',
      'Did I use impersonal constructions (no se puede tolerar, es indiscutible que)?',
      'Did I present both sides of the argument before stating my position?',
      'Did I use formal and academic vocabulary throughout?',
      'Did I include specific references (Convención de Ginebra)?',
      'Did I use advanced discourse markers (ahora bien, a la larga, siempre que)?'
    ]
  },
  {
    id: 'wp-27', level: 'C1',
    prompt: 'Analiza cómo las redes sociales han influido en los movimientos sociales y políticos del siglo XXI.',
    promptEn: 'Analyze how social media has influenced social and political movements in the 21st century.',
    targetVocab: ['movilización', 'viralizar', 'censura', 'desinformación', 'transparencia', 'activismo', 'hashtag', 'polarización'],
    targetGrammar: 'perfect tenses, passive voice, nominal clauses, cause-consequence structures',
    sampleResponse: 'Las redes sociales han redefinido la forma en que los ciudadanos se organizan, protestan y exigen cambios. Lo que antes requería semanas de planificación puede ahora movilizar a miles de personas en cuestión de horas.\n\nEl ejemplo más paradigmático fue la Primavera Árabe de 2011, donde plataformas como Twitter y Facebook desempeñaron un papel crucial en la coordinación de las protestas. De manera similar, movimientos como #MeToo y Black Lives Matter demostraron que un hashtag puede convertirse en catalizador de un cambio social profundo.\n\nSin embargo, sería ingenuo ignorar las sombras de esta revolución digital. Las mismas herramientas que facilitan la movilización ciudadana también han sido utilizadas para difundir desinformación, manipular elecciones y polarizar a la sociedad. Los algoritmos, diseñados para maximizar la interacción, tienden a crear cámaras de eco que refuerzan los sesgos preexistentes de los usuarios.\n\nEn definitiva, las redes sociales han democratizado el acceso a la información y han dado voz a quienes antes no la tenían. No obstante, es imprescindible que la sociedad desarrolle un pensamiento crítico que le permita navegar esta nueva realidad sin caer en la manipulación.',
    sampleResponseEn: 'Social media has redefined the way citizens organize, protest, and demand change. What previously required weeks of planning can now mobilize thousands of people in a matter of hours.\n\nThe most paradigmatic example was the Arab Spring of 2011, where platforms like Twitter and Facebook played a crucial role in coordinating protests. Similarly, movements like #MeToo and Black Lives Matter showed that a hashtag can become a catalyst for profound social change.\n\nHowever, it would be naive to ignore the shadows of this digital revolution. The same tools that facilitate citizen mobilization have also been used to spread disinformation, manipulate elections, and polarize society. Algorithms, designed to maximize engagement, tend to create echo chambers that reinforce users\' pre-existing biases.\n\nUltimately, social media has democratized access to information and given voice to those who previously had none. Nevertheless, it is essential that society develops critical thinking that allows it to navigate this new reality without falling prey to manipulation.',
    selfCheckItems: [
      'Did I use perfect tenses appropriately (han redefinido, han sido utilizadas)?',
      'Did I use passive constructions (han sido utilizadas, diseñados para)?',
      'Did I provide specific historical examples?',
      'Did I analyze both positive and negative effects?',
      'Did I use advanced cause-consequence structures?',
      'Did I reach a nuanced conclusion that avoids oversimplification?'
    ]
  },
  {
    id: 'wp-28', level: 'C1',
    prompt: 'Escribe un ensayo sobre la importancia de preservar las lenguas minoritarias en peligro de extinción.',
    promptEn: 'Write an essay on the importance of preserving minority languages in danger of extinction.',
    targetVocab: ['lengua', 'extinción', 'patrimonio', 'diversidad', 'identidad', 'globalización', 'revitalización', 'transmisión'],
    targetGrammar: 'subjunctive in adjectival clauses, nominal clauses, complex conditional structures',
    sampleResponse: 'Cada dos semanas muere una lengua en el mundo. Con ella desaparece un sistema único de pensamiento, una cosmovisión y siglos de conocimiento acumulado. La preservación de las lenguas minoritarias no es un capricho nostálgico sino una necesidad cultural y científica.\n\nCada lengua que desaparece se lleva consigo conocimientos que no existen en ningún otro idioma. Las lenguas indígenas de la Amazonía, por ejemplo, contienen un saber botánico y ecológico que la ciencia occidental apenas comienza a descubrir. No hay traducción posible que capture con exactitud conceptos que solo existen en una lengua determinada.\n\nQuienes argumentan que la homogeneización lingüística es inevitable e incluso deseable ignoran que la diversidad lingüística, al igual que la biodiversidad, fortalece la resiliencia de las sociedades. Una humanidad que hablara un único idioma sería intelectualmente más pobre.\n\nPara que la revitalización lingüística tenga éxito, es fundamental que las comunidades hablantes participen activamente en el proceso. No basta con que los lingüistas documenten gramáticas y diccionarios si no se crean las condiciones sociales y económicas que permitan a los hablantes transmitir su lengua a las nuevas generaciones.',
    sampleResponseEn: 'Every two weeks a language dies somewhere in the world. With it disappears a unique system of thought, a worldview, and centuries of accumulated knowledge. The preservation of minority languages is not a nostalgic whim but a cultural and scientific necessity.\n\nEvery language that disappears takes with it knowledge that exists in no other language. The indigenous languages of the Amazon, for example, contain botanical and ecological knowledge that Western science is only beginning to discover. There is no possible translation that can accurately capture concepts that only exist in a given language.\n\nThose who argue that linguistic homogenization is inevitable and even desirable ignore that linguistic diversity, like biodiversity, strengthens the resilience of societies. A humanity that spoke a single language would be intellectually poorer.\n\nFor linguistic revitalization to succeed, it is essential that the speaking communities actively participate in the process. It is not enough for linguists to document grammars and dictionaries if the social and economic conditions are not created to allow speakers to transmit their language to new generations.',
    selfCheckItems: [
      'Did I use subjunctive in adjectival clauses (que hablara, que permitan)?',
      'Did I use complex conditional structures (para que... tenga éxito)?',
      'Did I support my arguments with specific examples?',
      'Did I use a variety of clause types (nominal, adjectival, adverbial)?',
      'Did I address potential counterarguments?',
      'Did I maintain cohesion with advanced discourse markers?'
    ]
  },
  {
    id: 'wp-29', level: 'C1',
    prompt: '¿Puede la inteligencia artificial reemplazar la creatividad humana? Reflexiona sobre el futuro del arte y la literatura.',
    promptEn: 'Can artificial intelligence replace human creativity? Reflect on the future of art and literature.',
    targetVocab: ['inteligencia artificial', 'creatividad', 'algoritmo', 'originalidad', 'consciencia', 'empatía', 'automatización'],
    targetGrammar: 'future perfect, conditional perfect, complex hypotheticals, philosophical vocabulary',
    sampleResponse: 'La inteligencia artificial ya es capaz de componer música, pintar cuadros y escribir poemas que, a primera vista, resultan indistinguibles de los creados por humanos. Esto plantea una pregunta filosófica de enorme calado: ¿qué es la creatividad y puede existir sin consciencia?\n\nLos defensores de la IA señalan que estas herramientas pueden analizar millones de obras y generar combinaciones que ningún ser humano habría imaginado. En cierto sentido, la IA ya ha ampliado los límites de lo posible en el arte.\n\nSin embargo, hay una diferencia fundamental entre generar patrones novedosos y crear con intención. Cuando un poeta escribe sobre la pérdida, lo hace desde la experiencia del dolor. Una IA puede imitar los recursos estilísticos de la poesía elegíaca, pero carece de la vivencia que da autenticidad a esas palabras. El arte más conmovedor nace de la vulnerabilidad humana, algo que ningún algoritmo puede replicar.\n\nProbablemente, en las próximas décadas habremos normalizado la colaboración entre humanos e IA. El verdadero peligro no es que la IA reemplace a los artistas, sino que una sociedad fascinada por la eficiencia deje de valorar el proceso creativo imperfecto, desordenado y profundamente humano que define al arte genuino.',
    sampleResponseEn: 'Artificial intelligence is already capable of composing music, painting pictures, and writing poems that, at first glance, are indistinguishable from those created by humans. This raises a philosophical question of enormous depth: what is creativity and can it exist without consciousness?\n\nAI advocates point out that these tools can analyze millions of works and generate combinations that no human being would have imagined. In a sense, AI has already expanded the boundaries of what is possible in art.\n\nHowever, there is a fundamental difference between generating novel patterns and creating with intention. When a poet writes about loss, they do so from the experience of pain. An AI can imitate the stylistic devices of elegiac poetry, but it lacks the lived experience that gives authenticity to those words. The most moving art is born from human vulnerability, something no algorithm can replicate.\n\nIn the coming decades, we will probably have normalized collaboration between humans and AI. The real danger is not that AI will replace artists, but that a society fascinated by efficiency will stop valuing the imperfect, messy, and profoundly human creative process that defines genuine art.',
    selfCheckItems: [
      'Did I use the future perfect (habremos normalizado)?',
      'Did I use conditional perfect for hypotheticals (habría imaginado)?',
      'Did I present a nuanced, non-binary argument?',
      'Did I use philosophical and abstract vocabulary accurately?',
      'Did I include concrete examples to illustrate abstract points?',
      'Did I avoid clichés and offer original insights?'
    ]
  },

  // ──────────────────────────────────────
  //  C2 — Mastery-level writing  (3 items)
  // ──────────────────────────────────────

  {
    id: 'wp-30', level: 'C2',
    prompt: 'Escribe una reflexión sobre el concepto de "patria" en el mundo contemporáneo. ¿Tiene sentido el nacionalismo en la era de la globalización?',
    promptEn: 'Write a reflection on the concept of "homeland" in the contemporary world. Does nationalism make sense in the era of globalization?',
    targetVocab: ['patria', 'identidad', 'arraigo', 'cosmopolita', 'fronteras', 'pertenencia', 'diáspora', 'soberanía'],
    targetGrammar: 'all subjunctive tenses, literary register, rhetorical devices, complex periodic sentences',
    sampleResponse: 'El concepto de patria — esa amalgama de tierra, lengua, memoria y mito — se resiste a la obsolescencia que muchos le auguran. En un mundo donde las mercancías cruzan fronteras con más facilidad que las personas, donde un adolescente de Bogotá consume la misma cultura audiovisual que otro de Berlín, cabría suponer que el sentimiento nacional se habría diluido. Y sin embargo, lejos de desaparecer, el nacionalismo experimenta un resurgimiento que desconcierta a quienes creyeron en el fin de la historia.\n\n¿Qué es lo que nos ata a un lugar? No puede ser únicamente la geografía, pues hay patrias portátiles que viajan en la memoria de los exiliados: la cadencia de un acento, el sabor de un guiso de la infancia, la melancolía de una canción que nadie más conoce. Quizá la patria sea, ante todo, un relato compartido — y como todo relato, susceptible de ser reescrito.\n\nEl peligro no reside en sentir apego por un lugar, sino en convertir ese apego en exclusión. Si la patria se define por lo que excluye — por la lengua que prohíbe, por la frontera que levanta, por el otro al que demoniza —, entonces se convierte en cárcel. Pero si se entiende como un punto de partida, como el primer círculo de una solidaridad que se expande hasta abrazar la humanidad entera, entonces quizá merezca la pena preservarla.\n\nA fin de cuentas, no se trata de elegir entre patria y humanidad, sino de comprender que la una no debería anular a la otra.',
    sampleResponseEn: 'The concept of homeland — that amalgam of land, language, memory, and myth — resists the obsolescence many predict for it. In a world where goods cross borders more easily than people, where a teenager in Bogotá consumes the same audiovisual culture as one in Berlin, one might suppose that national sentiment would have diluted. And yet, far from disappearing, nationalism experiences a resurgence that bewilders those who believed in the end of history.\n\nWhat is it that binds us to a place? It cannot be geography alone, for there are portable homelands that travel in the memory of exiles: the cadence of an accent, the flavor of a childhood stew, the melancholy of a song no one else knows. Perhaps homeland is, above all, a shared narrative — and like all narratives, susceptible to being rewritten.\n\nThe danger lies not in feeling attachment to a place, but in turning that attachment into exclusion. If homeland is defined by what it excludes — by the language it forbids, by the border it raises, by the other it demonizes — then it becomes a prison. But if it is understood as a starting point, as the first circle of a solidarity that expands to embrace all humanity, then perhaps it is worth preserving.\n\nUltimately, it is not about choosing between homeland and humanity, but understanding that one should not cancel out the other.',
    selfCheckItems: [
      'Did I use a variety of subjunctive tenses (present, imperfect, pluperfect)?',
      'Did I employ rhetorical devices (rhetorical questions, metaphor, parallelism)?',
      'Did I maintain a literary/essayistic register throughout?',
      'Did I build a complex argument with nuanced reasoning?',
      'Did I use periodic sentences and varied sentence structures?',
      'Is my prose original and not reliant on clichés?'
    ]
  },
  {
    id: 'wp-31', level: 'C2',
    prompt: 'Escribe un microrrelato (ficción breve de 150-200 palabras) con un giro inesperado al final.',
    promptEn: 'Write a flash fiction piece (150-200 words) with an unexpected twist at the end.',
    targetVocab: ['suspenso', 'desenlace', 'narrativa', 'protagonista', 'metáfora', 'ambigüedad'],
    targetGrammar: 'literary past tenses, free indirect speech, descriptive language, varied sentence rhythm',
    sampleResponse: 'El último paciente\n\nEl doctor Vidal cerró la puerta del consultorio y se dejó caer en la silla. Había sido un día largo. Miró el reloj: las nueve de la noche. Solo quedaba un paciente.\n\nEntró un hombre joven, pálido, con los ojos hundidos. Se sentó sin decir nada.\n\n— ¿En qué puedo ayudarle? — preguntó el doctor.\n\nEl hombre lo miró fijamente.\n\n— No puedo dormir. Llevo semanas sin dormir. Cada vez que cierro los ojos, veo la cara de un hombre que me mira desde la oscuridad. Tiene los ojos vacíos. Sonríe, pero su sonrisa no tiene nada de humano.\n\nEl doctor Vidal asintió, tomando notas.\n\n— ¿Podría describir a ese hombre?\n\n— Alto. Delgado. Pelo canoso. Lleva una bata blanca.\n\nEl doctor dejó de escribir.\n\n— Tiene una cicatriz — continuó el paciente, señalando su propia frente — justo aquí.\n\nInstintivamente, el doctor Vidal se llevó la mano a la frente. Sus dedos encontraron la cicatriz.',
    sampleResponseEn: 'The Last Patient\n\nDr. Vidal closed the office door and collapsed into his chair. It had been a long day. He looked at the clock: nine at night. Only one patient left.\n\nA young man entered, pale, with sunken eyes. He sat down without saying a word.\n\n"How can I help you?" asked the doctor.\n\nThe man stared at him.\n\n"I can\'t sleep. I haven\'t slept in weeks. Every time I close my eyes, I see the face of a man watching me from the darkness. He has empty eyes. He smiles, but his smile has nothing human about it."\n\nDr. Vidal nodded, taking notes.\n\n"Could you describe this man?"\n\n"Tall. Thin. Gray hair. He wears a white coat."\n\nThe doctor stopped writing.\n\n"He has a scar," the patient continued, pointing to his own forehead, "right here."\n\nInstinctively, Dr. Vidal raised his hand to his forehead. His fingers found the scar.',
    selfCheckItems: [
      'Did I use the literary past tenses effectively (preterite for actions, imperfect for descriptions)?',
      'Did I build suspense through pacing and detail?',
      'Did I use dialogue correctly with em dashes (— raya)?',
      'Does the twist feel earned, not forced?',
      'Did I use varied sentence lengths for rhythm?',
      'Did I show rather than tell (the doctor touching his scar instead of stating the realization)?'
    ]
  },
  {
    id: 'wp-32', level: 'C2',
    prompt: 'Analiza cómo el lenguaje moldea nuestra percepción de la realidad, usando ejemplos del español y del inglés.',
    promptEn: 'Analyze how language shapes our perception of reality, using examples from Spanish and English.',
    targetVocab: ['percepción', 'cosmovisión', 'relativismo', 'categorización', 'matiz', 'hipótesis de Sapir-Whorf', 'cognición'],
    targetGrammar: 'all advanced structures, academic register, complex argumentation, meta-linguistic awareness',
    sampleResponse: 'La hipótesis de Sapir-Whorf postula que la lengua que hablamos no se limita a describir la realidad, sino que, en cierta medida, la construye. Sin entrar en la versión fuerte del determinismo lingüístico — que la lengua determina el pensamiento —, la versión débil ofrece evidencias fascinantes de cómo las estructuras gramaticales influyen en nuestra percepción.\n\nConsideremos el caso de ser y estar. Para un hispanohablante, existe una distinción cognitiva entre "es aburrido" (he is boring — rasgo permanente) y "está aburrido" (he is bored — estado temporal) que el inglés no codifica gramaticalmente con el verbo "to be". Esta distinción obliga al hablante de español a categorizar cada atributo como esencial o circunstancial, una operación mental que el anglohablante no necesita realizar.\n\nOtro ejemplo revelador es el género gramatical. Investigaciones recientes sugieren que los hablantes de lenguas con género gramatical tienden a asociar cualidades diferentes a los objetos según su género lingüístico. En español, "puente" es masculino; en alemán, "Brücke" es femenino. Los estudios muestran que los hispanohablantes tienden a describir los puentes con adjetivos estereotípicamente masculinos, mientras que los germanohablantes usan adjetivos asociados a lo femenino.\n\nSin embargo, sería reduccionista concluir que estamos prisioneros de nuestra lengua materna. La capacidad de aprender idiomas nos permite, precisamente, acceder a categorías conceptuales que nuestra primera lengua no contempla. Quien aprende español descubre que la realidad tiene más matices temporales de los que el inglés permite expresar; quien aprende inglés desde el español descubre la libertad de un mundo sin género gramatical obligatorio.\n\nEn última instancia, cada lengua es un prisma: no inventa la luz, pero sí la descompone en colores diferentes.',
    sampleResponseEn: 'The Sapir-Whorf hypothesis posits that the language we speak is not limited to describing reality but, to a certain extent, constructs it. Without entering the strong version of linguistic determinism — that language determines thought — the weak version offers fascinating evidence of how grammatical structures influence our perception.\n\nConsider the case of ser and estar. For a Spanish speaker, there exists a cognitive distinction between "es aburrido" (he is boring — permanent trait) and "está aburrido" (he is bored — temporary state) that English does not encode grammatically with the verb "to be." This distinction forces the Spanish speaker to categorize each attribute as essential or circumstantial, a mental operation the English speaker need not perform.\n\nAnother revealing example is grammatical gender. Recent research suggests that speakers of languages with grammatical gender tend to associate different qualities with objects depending on their linguistic gender. In Spanish, "puente" (bridge) is masculine; in German, "Brücke" is feminine. Studies show that Spanish speakers tend to describe bridges with stereotypically masculine adjectives, while German speakers use adjectives associated with the feminine.\n\nHowever, it would be reductive to conclude that we are prisoners of our mother tongue. The ability to learn languages allows us, precisely, to access conceptual categories that our first language does not contemplate. Those who learn Spanish discover that reality has more temporal nuances than English allows one to express; those who learn English from Spanish discover the freedom of a world without obligatory grammatical gender.\n\nUltimately, each language is a prism: it does not invent the light, but it does break it down into different colors.',
    selfCheckItems: [
      'Did I reference relevant linguistic theory (Sapir-Whorf)?',
      'Did I provide concrete contrastive examples between Spanish and English?',
      'Did I use all advanced grammatical structures with precision?',
      'Did I maintain an academic register while keeping the prose engaging?',
      'Did I use meta-linguistic awareness (analyzing language using language)?',
      'Did I arrive at an original and memorable conclusion?',
      'Did I avoid dogmatic positions and acknowledge complexity?'
    ]
  },
];
