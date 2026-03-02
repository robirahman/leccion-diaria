'use strict';

// ════════════════════════════════════════════════════════════
//  SAT-STYLE READING COMPREHENSION — Longer passages with
//  diverse question types: main idea, inference, vocab-in-context,
//  detail, purpose, evidence
//  18 passages: 3 per CEFR level (A1–C2)
// ════════════════════════════════════════════════════════════

const READING_SAT_DATA = [

  // ─────────────────────────────────────────────────────────
  //  A1  —  Simple present, basic vocabulary (100-150 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'sat-1',
    level: 'A1',
    title: 'El mercado del pueblo',
    titleEn: 'The Town Market',
    sat: true,
    text: 'Todos los sábados, mi abuela y yo vamos al mercado del pueblo. El mercado es muy grande y tiene muchos puestos. En un puesto venden frutas frescas: manzanas rojas, plátanos amarillos y naranjas dulces. En otro puesto hay verduras: tomates, lechugas y zanahorias. Mi abuela siempre compra pan fresco en la panadería del mercado. El pan está muy caliente por la mañana. También compramos queso blanco y jamón. A mí me gusta mucho el puesto de dulces, pero mi abuela dice que primero necesitamos la comida importante. Al final, siempre me compra un helado de chocolate. El mercado cierra a las dos de la tarde.',
    vocab: [
      { word: 'puestos', english: 'stalls / stands' },
      { word: 'frescas', english: 'fresh' },
      { word: 'dulces', english: 'sweets / candies' },
      { word: 'caliente', english: 'hot / warm' },
      { word: 'cierra', english: 'closes' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea principal del texto?',
        type: 'main-idea',
        options: ['La abuela cocina mucho', 'La visita semanal al mercado del pueblo', 'El niño no quiere ir al mercado', 'El mercado está cerrado'],
        correct: 1,
        explanation: 'The passage describes the weekly Saturday visit to the town market with grandmother.'
      },
      {
        prompt: '¿Qué frutas se mencionan en el texto?',
        type: 'detail',
        options: ['Fresas, uvas y peras', 'Manzanas, plátanos y naranjas', 'Mangos, piñas y cocos', 'Sandías, melones y limones'],
        correct: 1,
        explanation: 'The text specifically lists "manzanas rojas, plátanos amarillos y naranjas dulces".'
      },
      {
        prompt: 'En el texto, ¿qué significa "frescas" cuando habla de frutas?',
        type: 'vocab-in-context',
        options: ['Frías como hielo', 'Recién recogidas, en buen estado', 'De color verde', 'Muy grandes'],
        correct: 1,
        explanation: '"Frescas" here means recently picked/in good condition, describing the quality of the fruit.'
      },
      {
        prompt: '¿Qué podemos concluir sobre la relación entre el niño y su abuela?',
        type: 'inference',
        options: ['No se llevan bien', 'Tienen una relación cercana y cariñosa', 'La abuela es muy estricta', 'El niño va solo al mercado'],
        correct: 1,
        explanation: 'They go together every Saturday, and grandma always buys an ice cream at the end, suggesting a warm relationship.'
      },
      {
        prompt: '¿A qué hora cierra el mercado?',
        type: 'detail',
        options: ['A las doce', 'A las dos de la tarde', 'A las cinco', 'A las diez de la mañana'],
        correct: 1,
        explanation: 'The text states "El mercado cierra a las dos de la tarde".'
      }
    ]
  },

  {
    id: 'sat-2',
    level: 'A1',
    title: 'Mi mejor amigo',
    titleEn: 'My Best Friend',
    sat: true,
    text: 'Carlos es mi mejor amigo. Vivimos en la misma calle y vamos a la misma escuela. Carlos tiene doce años, igual que yo. Él es alto y tiene el pelo negro. Le gusta mucho el fútbol y juega todos los días después de la escuela. Yo prefiero leer libros, pero también juego fútbol con Carlos los viernes. Su familia es de Colombia y su mamá cocina comida colombiana muy rica. Mi comida favorita de su casa son las arepas. Los fines de semana jugamos videojuegos en su casa o vamos al parque. Carlos es muy divertido y siempre me hace reír. Somos amigos desde los cinco años.',
    vocab: [
      { word: 'calle', english: 'street' },
      { word: 'igual que', english: 'same as' },
      { word: 'divertido', english: 'funny / fun' },
      { word: 'reír', english: 'to laugh' },
      { word: 'desde', english: 'since' }
    ],
    questions: [
      {
        prompt: '¿Cuál es el tema principal del texto?',
        type: 'main-idea',
        options: ['La escuela es aburrida', 'La amistad entre el narrador y Carlos', 'La comida colombiana', 'Los videojuegos son divertidos'],
        correct: 1,
        explanation: 'The passage is primarily about the narrator\'s best friendship with Carlos.'
      },
      {
        prompt: '¿De dónde es la familia de Carlos?',
        type: 'detail',
        options: ['México', 'España', 'Colombia', 'Argentina'],
        correct: 2,
        explanation: 'The text says "Su familia es de Colombia".'
      },
      {
        prompt: 'En el texto, ¿qué significa "divertido"?',
        type: 'vocab-in-context',
        options: ['Inteligente', 'Que hace reír, gracioso', 'Tranquilo', 'Deportista'],
        correct: 1,
        explanation: '"Divertido" means funny/fun, and the context confirms it: "siempre me hace reír".'
      },
      {
        prompt: '¿Cuánto tiempo llevan siendo amigos?',
        type: 'detail',
        options: ['Un año', 'Tres años', 'Cinco años', 'Siete años'],
        correct: 3,
        explanation: 'They are 12 now and have been friends "desde los cinco años" = 7 years.'
      },
      {
        prompt: '¿Qué podemos inferir sobre el narrador?',
        type: 'inference',
        options: ['No le gusta el deporte', 'Es más intelectual que deportista', 'Es colombiano', 'No tiene más amigos'],
        correct: 1,
        explanation: 'The narrator says "Yo prefiero leer libros" but still plays football sometimes, suggesting more intellectual interests.'
      }
    ]
  },

  {
    id: 'sat-3',
    level: 'A1',
    title: 'Un día de lluvia',
    titleEn: 'A Rainy Day',
    sat: true,
    text: 'Hoy es lunes y llueve mucho. No puedo ir al parque porque hay mucha agua en las calles. Me quedo en casa con mi hermana pequeña, Lucía. Lucía tiene seis años y le gusta pintar. Ella pinta un arcoíris con muchos colores: rojo, azul, amarillo y verde. Yo dibujo un gato negro porque me gustan los gatos. Mi mamá prepara chocolate caliente para nosotros. El chocolate está delicioso. Después, leemos un cuento juntos. El cuento es sobre un dragón que vive en las montañas. Lucía tiene miedo del dragón, pero yo le digo que es un dragón bueno. Por la tarde, la lluvia para y sale el sol. Vemos un arcoíris real por la ventana. Lucía está muy contenta porque es igual que su pintura.',
    vocab: [
      { word: 'llueve', english: 'it rains' },
      { word: 'arcoíris', english: 'rainbow' },
      { word: 'cuento', english: 'story / tale' },
      { word: 'miedo', english: 'fear / afraid' },
      { word: 'ventana', english: 'window' }
    ],
    questions: [
      {
        prompt: '¿Qué resume mejor el texto?',
        type: 'main-idea',
        options: ['Un día aburrido sin nada que hacer', 'Actividades divertidas en casa durante un día lluvioso', 'La hermana del narrador está triste', 'El narrador va al parque con lluvia'],
        correct: 1,
        explanation: 'The passage describes enjoyable indoor activities during a rainy day: painting, hot chocolate, reading a story.'
      },
      {
        prompt: '¿Qué pinta Lucía?',
        type: 'detail',
        options: ['Un gato', 'Un dragón', 'Un arcoíris', 'La lluvia'],
        correct: 2,
        explanation: 'The text says "Ella pinta un arcoíris con muchos colores".'
      },
      {
        prompt: 'En el texto, ¿qué significa "para" en "la lluvia para"?',
        type: 'vocab-in-context',
        options: ['Continúa', 'Se detiene', 'Aumenta', 'Es para alguien'],
        correct: 1,
        explanation: '"Para" here is the verb "parar" (to stop), meaning the rain stops.'
      },
      {
        prompt: '¿Por qué está contenta Lucía al final?',
        type: 'inference',
        options: ['Porque el cuento termina bien', 'Porque ve un arcoíris real como su pintura', 'Porque puede ir al parque', 'Porque su mamá le da más chocolate'],
        correct: 1,
        explanation: 'Lucía is happy because the real rainbow matches her painting: "es igual que su pintura".'
      },
      {
        prompt: '¿Cuántos años tiene Lucía?',
        type: 'detail',
        options: ['Cuatro', 'Cinco', 'Seis', 'Siete'],
        correct: 2,
        explanation: 'The text says "Lucía tiene seis años".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  A2  —  Past tenses, expanded vocabulary (150-200 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'sat-4',
    level: 'A2',
    title: 'Las vacaciones en la playa',
    titleEn: 'Beach Vacation',
    sat: true,
    text: 'El verano pasado, mi familia y yo fuimos de vacaciones a la costa de Málaga. Viajamos en coche durante cinco horas. Cuando llegamos, el hotel estaba cerca de la playa. La primera mañana, fuimos a nadar al mar. El agua estaba fría, pero el sol calentaba mucho. Mi hermano construyó un castillo de arena muy grande. Por la tarde, paseamos por el paseo marítimo y comimos helados. El segundo día visitamos un pueblo blanco en las montañas. Las casas tenían flores en los balcones y las calles eran muy estrechas. Compramos recuerdos y probamos gazpacho, una sopa fría típica de Andalucía. El último día no queríamos irnos. Mi madre sacó muchas fotos para recordar el viaje. Fue la mejor semana del verano. Espero volver el próximo año.',
    vocab: [
      { word: 'costa', english: 'coast' },
      { word: 'castillo de arena', english: 'sand castle' },
      { word: 'paseo marítimo', english: 'boardwalk / promenade' },
      { word: 'estrechas', english: 'narrow' },
      { word: 'recuerdos', english: 'souvenirs / memories' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea central del texto?',
        type: 'main-idea',
        options: ['Los problemas de viajar en coche', 'Una semana de vacaciones familiar en la costa', 'La historia de Málaga', 'Recetas de comida andaluza'],
        correct: 1,
        explanation: 'The passage describes a family\'s week-long beach vacation in Málaga.'
      },
      {
        prompt: '¿Cuánto duró el viaje en coche?',
        type: 'detail',
        options: ['Tres horas', 'Cuatro horas', 'Cinco horas', 'Seis horas'],
        correct: 2,
        explanation: 'The text says "Viajamos en coche durante cinco horas".'
      },
      {
        prompt: 'En el texto, ¿qué significa "estrechas" al describir las calles?',
        type: 'vocab-in-context',
        options: ['Largas', 'Angostas, con poco espacio', 'Bonitas', 'Empinadas'],
        correct: 1,
        explanation: '"Estrechas" means narrow, describing the tight streets of the mountain village.'
      },
      {
        prompt: '¿Qué podemos inferir sobre cómo se sintió la familia?',
        type: 'inference',
        options: ['Estaban aburridos', 'Fue una experiencia muy positiva y memorable', 'Prefieren la montaña', 'No quieren repetir el viaje'],
        correct: 1,
        explanation: '"No queríamos irnos", "la mejor semana", and "espero volver" all indicate they greatly enjoyed it.'
      },
      {
        prompt: '¿Qué es el gazpacho según el texto?',
        type: 'detail',
        options: ['Un plato de carne', 'Una sopa fría típica de Andalucía', 'Un postre de frutas', 'Una bebida caliente'],
        correct: 1,
        explanation: 'The text defines gazpacho as "una sopa fría típica de Andalucía".'
      }
    ]
  },

  {
    id: 'sat-5',
    level: 'A2',
    title: 'La tienda de la esquina',
    titleEn: 'The Corner Shop',
    sat: true,
    text: 'En mi barrio hay una tienda pequeña en la esquina. El dueño se llama don Manuel y tiene setenta años. Abrió la tienda hace cuarenta años, cuando era joven. Don Manuel conoce a todos los vecinos por su nombre. La tienda vende de todo: pan, leche, fruta, productos de limpieza y periódicos. No es tan barata como el supermercado grande, pero la gente del barrio prefiere comprar aquí porque don Manuel es muy amable. Siempre da un caramelo a los niños y habla con los ancianos que viven solos. El año pasado, un supermercado nuevo abrió cerca, y muchas personas empezaron a ir allí. Don Manuel se preocupó, pero sus clientes fieles siguieron comprando en su tienda. Su hija quiere ayudarle a vender productos por internet para ganar más clientes.',
    vocab: [
      { word: 'dueño', english: 'owner' },
      { word: 'vecinos', english: 'neighbors' },
      { word: 'amable', english: 'kind / friendly' },
      { word: 'ancianos', english: 'elderly people' },
      { word: 'fieles', english: 'loyal / faithful' }
    ],
    questions: [
      {
        prompt: '¿Cuál es el tema principal del texto?',
        type: 'main-idea',
        options: ['La competencia entre supermercados', 'La historia de una tienda de barrio y su dueño', 'Los precios de los alimentos', 'Internet y el comercio'],
        correct: 1,
        explanation: 'The passage centers on don Manuel\'s corner shop and its role in the neighborhood.'
      },
      {
        prompt: '¿Hace cuántos años abrió la tienda don Manuel?',
        type: 'detail',
        options: ['Veinte', 'Treinta', 'Cuarenta', 'Cincuenta'],
        correct: 2,
        explanation: 'The text says "Abrió la tienda hace cuarenta años".'
      },
      {
        prompt: 'En el texto, ¿qué significa "fieles" al hablar de los clientes?',
        type: 'vocab-in-context',
        options: ['Ricos', 'Jóvenes', 'Leales, que no cambian', 'Que compran mucho'],
        correct: 2,
        explanation: '"Fieles" means loyal/faithful — customers who stayed despite the new supermarket.'
      },
      {
        prompt: '¿Por qué la gente prefiere la tienda de don Manuel al supermercado?',
        type: 'inference',
        options: ['Porque es más barata', 'Porque tiene más productos', 'Por la relación personal y la amabilidad', 'Porque está más lejos'],
        correct: 2,
        explanation: 'Despite higher prices, people prefer it because don Manuel is "muy amable" and knows everyone by name.'
      },
      {
        prompt: '¿Qué solución propone la hija de don Manuel?',
        type: 'detail',
        options: ['Cerrar la tienda', 'Bajar los precios', 'Vender productos por internet', 'Abrir otra tienda'],
        correct: 2,
        explanation: 'The text says "Su hija quiere ayudarle a vender productos por internet".'
      }
    ]
  },

  {
    id: 'sat-6',
    level: 'A2',
    title: 'El perro perdido',
    titleEn: 'The Lost Dog',
    sat: true,
    text: 'Ayer, cuando volvía del colegio, encontré un perro pequeño en el parque. Estaba solo y parecía asustado. Tenía un collar azul pero no tenía placa con nombre ni teléfono. Le di un poco de mi bocadillo y el perro movió la cola contento. Lo llevé a casa y mis padres me dejaron quedármelo hasta encontrar al dueño. Le pusimos agua y comida. Mi padre hizo carteles con la foto del perro y los pegó en el barrio. También publicó un mensaje en las redes sociales. Dos días después, una señora llamó por teléfono. Era su perro, se llamaba Coco y se había escapado del jardín. La señora vino a buscarlo y Coco saltó de alegría cuando la vio. La señora nos dio las gracias y un pastel de chocolate. Yo estaba triste porque me encantaba Coco, pero estaba contento de que volviera a su hogar.',
    vocab: [
      { word: 'asustado', english: 'scared' },
      { word: 'collar', english: 'collar' },
      { word: 'carteles', english: 'posters / signs' },
      { word: 'redes sociales', english: 'social media' },
      { word: 'hogar', english: 'home' }
    ],
    questions: [
      {
        prompt: '¿De qué trata principalmente el texto?',
        type: 'main-idea',
        options: ['Un niño que quiere un perro', 'Cómo encontraron y devolvieron un perro perdido', 'Los peligros de los parques', 'Las redes sociales son útiles'],
        correct: 1,
        explanation: 'The passage tells the story of finding a lost dog and reuniting it with its owner.'
      },
      {
        prompt: '¿Cómo encontraron al dueño del perro?',
        type: 'detail',
        options: ['El perro volvió solo', 'Pusieron carteles y publicaron en redes sociales', 'Fueron a la policía', 'Preguntaron en las tiendas'],
        correct: 1,
        explanation: 'The father "hizo carteles" and "publicó un mensaje en las redes sociales".'
      },
      {
        prompt: 'En el texto, ¿qué significa "asustado"?',
        type: 'vocab-in-context',
        options: ['Hambriento', 'Con miedo', 'Enfermo', 'Cansado'],
        correct: 1,
        explanation: '"Asustado" means scared/frightened, describing the dog\'s fearful state when found alone.'
      },
      {
        prompt: '¿Cómo se sentía el narrador al final?',
        type: 'inference',
        options: ['Solo triste', 'Solo contento', 'Triste y contento a la vez', 'Indiferente'],
        correct: 2,
        explanation: 'The narrator says "estaba triste porque me encantaba Coco, pero estaba contento de que volviera a su hogar".'
      },
      {
        prompt: '¿Cómo se escapó el perro?',
        type: 'detail',
        options: ['De un coche', 'De una tienda de mascotas', 'Del jardín de su dueña', 'Del parque'],
        correct: 2,
        explanation: 'The owner says the dog "se había escapado del jardín".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  B1  —  More complex narratives (200-300 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'sat-7',
    level: 'B1',
    title: 'El café de la abuela',
    titleEn: 'Grandmother\'s Café',
    sat: true,
    text: 'Mi abuela Elena abrió un pequeño café en el centro de Buenos Aires en 1975. En aquella época, los cafés eran lugares importantes donde la gente se reunía para hablar de política, literatura y arte. El café de mi abuela se llamaba "El Rincón" y era conocido por sus medialunas y su café con leche. Durante los años difíciles de la dictadura, "El Rincón" se convirtió en un refugio silencioso. Los artistas y escritores se sentaban en las mesas del fondo, hablando en voz baja. Mi abuela nunca preguntaba de qué hablaban; solo servía café y sonreía. Cuando llegó la democracia en 1983, el café celebró con una fiesta que duró toda la noche. Hoy, "El Rincón" cumple cincuenta años. Mi madre lo dirige ahora, pero la receta de las medialunas es la misma de mi abuela. Los turistas vienen a sacar fotos y los vecinos siguen viniendo cada mañana. En las paredes hay fotos antiguas de los clientes originales. Mi abuela dice que un buen café no solo vende bebidas: crea una comunidad. A sus noventa años, todavía viene todos los martes a sentarse en su mesa favorita junto a la ventana.',
    vocab: [
      { word: 'se reunía', english: 'used to meet / gather' },
      { word: 'refugio', english: 'refuge / shelter' },
      { word: 'dictadura', english: 'dictatorship' },
      { word: 'dirige', english: 'manages / runs' },
      { word: 'comunidad', english: 'community' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea principal del texto?',
        type: 'main-idea',
        options: ['La historia de Buenos Aires', 'Un café familiar que ha sido importante durante décadas', 'Las mejores recetas de medialunas', 'La dictadura argentina'],
        correct: 1,
        explanation: 'The passage traces the 50-year history of a family café and its role in the community.'
      },
      {
        prompt: '¿En qué año abrió el café?',
        type: 'detail',
        options: ['1970', '1975', '1980', '1983'],
        correct: 1,
        explanation: 'The text states the café opened "en 1975".'
      },
      {
        prompt: 'En el texto, ¿qué significa "refugio" al describir el café durante la dictadura?',
        type: 'vocab-in-context',
        options: ['Un restaurante famoso', 'Un lugar seguro donde la gente se sentía protegida', 'Un negocio exitoso', 'Un edificio antiguo'],
        correct: 1,
        explanation: '"Refugio" means refuge/shelter — a safe place where artists and writers could gather during dangerous times.'
      },
      {
        prompt: '¿Qué podemos inferir sobre la abuela Elena?',
        type: 'inference',
        options: ['Era una activista política', 'Valoraba a las personas y protegía discretamente a sus clientes', 'No entendía lo que pasaba en el país', 'Quería vender el café'],
        correct: 1,
        explanation: 'She "nunca preguntaba" and "solo servía café y sonreía" — quietly protecting her patrons without prying.'
      },
      {
        prompt: '¿Quién dirige el café ahora?',
        type: 'detail',
        options: ['La abuela Elena', 'La madre del narrador', 'El narrador', 'Un extraño'],
        correct: 1,
        explanation: 'The text says "Mi madre lo dirige ahora".'
      },
      {
        prompt: 'Según la abuela, ¿cuál es la función de un buen café?',
        type: 'inference',
        options: ['Ganar mucho dinero', 'Vender las mejores bebidas', 'Crear una comunidad', 'Atraer turistas'],
        correct: 2,
        explanation: 'The grandmother says "un buen café no solo vende bebidas: crea una comunidad".'
      }
    ]
  },

  {
    id: 'sat-8',
    level: 'B1',
    title: 'El voluntariado',
    titleEn: 'Volunteering',
    sat: true,
    text: 'Cuando cumplí dieciséis años, decidí hacer voluntariado en un comedor social de mi ciudad. Al principio, tenía dudas. No conocía a nadie y me daba vergüenza hablar con desconocidos. El primer día, una mujer mayor me enseñó a servir la sopa sin derramarla. Se llamaba Rosa y llevaba diez años como voluntaria. Me dijo: "Aquí todos llegamos nerviosos el primer día." Poco a poco, empecé a conocer a las personas que venían a comer. Había familias con niños, ancianos solos y jóvenes sin trabajo. Cada uno tenía una historia diferente. Un señor llamado Andrés me contó que había sido profesor de música antes de perder su empleo. A veces tocaba la guitarra después de comer y todos aplaudían. Lo que más me sorprendió fue que el comedor no era un lugar triste. Había conversación, risas y solidaridad. Las personas se ayudaban entre sí. Después de seis meses, ya no era solo un voluntario: me sentía parte de esa comunidad. Aprendí que ayudar a otros también me ayudaba a mí. Ahora estudio trabajo social en la universidad.',
    vocab: [
      { word: 'comedor social', english: 'soup kitchen' },
      { word: 'vergüenza', english: 'embarrassment / shame' },
      { word: 'derramarla', english: 'to spill it' },
      { word: 'solidaridad', english: 'solidarity' },
      { word: 'empleo', english: 'job / employment' }
    ],
    questions: [
      {
        prompt: '¿Cuál es el tema central del texto?',
        type: 'main-idea',
        options: ['Los problemas económicos del país', 'La transformación personal a través del voluntariado', 'Cómo cocinar en un comedor social', 'La universidad y los estudios sociales'],
        correct: 1,
        explanation: 'The passage describes how volunteering transformed the narrator\'s perspective and life direction.'
      },
      {
        prompt: '¿Quién era Andrés?',
        type: 'detail',
        options: ['El director del comedor', 'Un voluntario veterano', 'Un antiguo profesor de música que perdió su empleo', 'Un estudiante universitario'],
        correct: 2,
        explanation: 'The text says Andrés "había sido profesor de música antes de perder su empleo".'
      },
      {
        prompt: 'En el texto, ¿qué significa "vergüenza" en el contexto del narrador?',
        type: 'vocab-in-context',
        options: ['Miedo físico', 'Incomodidad por la situación social nueva', 'Tristeza profunda', 'Enojo'],
        correct: 1,
        explanation: '"Vergüenza" here refers to social embarrassment/shyness about talking to strangers.'
      },
      {
        prompt: '¿Qué sorprendió al narrador sobre el comedor?',
        type: 'inference',
        options: ['La comida era mala', 'El lugar era alegre a pesar de las dificultades', 'Había pocos voluntarios', 'Las personas no hablaban'],
        correct: 1,
        explanation: '"Lo que más me sorprendió fue que el comedor no era un lugar triste" — there was conversation, laughter, solidarity.'
      },
      {
        prompt: '¿Cómo influyó la experiencia en la vida del narrador?',
        type: 'inference',
        options: ['Dejó de ser voluntario', 'Decidió estudiar trabajo social', 'Se mudó a otra ciudad', 'Empezó a tocar la guitarra'],
        correct: 1,
        explanation: 'The experience led the narrator to study social work: "Ahora estudio trabajo social en la universidad".'
      }
    ]
  },

  {
    id: 'sat-9',
    level: 'B1',
    title: 'La librería de segunda mano',
    titleEn: 'The Second-Hand Bookshop',
    sat: true,
    text: 'Hay una librería de segunda mano en una calle tranquila del centro. Se llama "Páginas Vividas" y huele a papel viejo y madera. El dueño, Ignacio, rescata libros que la gente quiere tirar. "Cada libro merece un segundo lector," dice siempre. La librería no está ordenada de forma normal. No hay secciones de novela, poesía o historia. En su lugar, Ignacio organiza los libros por emociones: "Para días de lluvia," "Cuando necesitas reír," "Para entender el mundo." Los clientes entran curiosos y siempre encuentran algo inesperado. Muchos libros tienen notas escritas por sus dueños anteriores: subrayados, comentarios en los márgenes, flores secas entre las páginas. Ignacio dice que esas marcas son parte de la historia del libro. Los precios son muy bajos porque el objetivo no es ganar dinero, sino que los libros encuentren nuevos hogares. Los sábados por la tarde, Ignacio organiza un club de lectura donde cualquiera puede participar sin necesidad de comprar nada. Algunos clientes traen galletas y café. Es uno de los últimos lugares de la ciudad donde la gente se desconecta del teléfono y simplemente habla sobre historias.',
    vocab: [
      { word: 'rescata', english: 'rescues / saves' },
      { word: 'merece', english: 'deserves' },
      { word: 'inesperado', english: 'unexpected' },
      { word: 'márgenes', english: 'margins' },
      { word: 'se desconecta', english: 'disconnects' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea principal del texto?',
        type: 'main-idea',
        options: ['Cómo ganar dinero vendiendo libros viejos', 'Una librería única que valora los libros y la comunidad', 'Los problemas de las librerías modernas', 'Un club de lectura para niños'],
        correct: 1,
        explanation: 'The passage describes a unique bookshop that prioritizes books finding new readers and building community.'
      },
      {
        prompt: '¿Cómo organiza Ignacio los libros?',
        type: 'detail',
        options: ['Por autor', 'Por género literario', 'Por emociones', 'Por precio'],
        correct: 2,
        explanation: 'The text says Ignacio organizes books "por emociones" with labels like "Para días de lluvia".'
      },
      {
        prompt: 'En el texto, ¿qué significa "rescata" al hablar de los libros?',
        type: 'vocab-in-context',
        options: ['Los vende más caros', 'Los salva de ser desechados', 'Los traduce a otros idiomas', 'Los digitaliza'],
        correct: 1,
        explanation: '"Rescata" means rescues/saves — he saves books that people want to throw away.'
      },
      {
        prompt: '¿Por qué son bajos los precios?',
        type: 'inference',
        options: ['Porque los libros están en mal estado', 'Porque el objetivo es que los libros encuentren nuevos lectores', 'Porque nadie quiere comprar libros usados', 'Porque Ignacio es rico'],
        correct: 1,
        explanation: '"El objetivo no es ganar dinero, sino que los libros encuentren nuevos hogares."'
      },
      {
        prompt: '¿Qué hacen los clientes en el club de lectura del sábado?',
        type: 'detail',
        options: ['Compran libros a mitad de precio', 'Hablan sobre historias sin necesidad de comprar', 'Leen en silencio', 'Escriben sus propios libros'],
        correct: 1,
        explanation: 'The text says anyone can participate "sin necesidad de comprar nada" and people discuss stories.'
      },
      {
        prompt: '¿Qué tienen de especial las notas en los libros para Ignacio?',
        type: 'inference',
        options: ['Son errores de los lectores', 'Son parte de la historia del libro', 'Reducen el valor del libro', 'Necesitan ser borradas'],
        correct: 1,
        explanation: 'Ignacio says "esas marcas son parte de la historia del libro" — they add value, not diminish it.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  B2  —  Complex arguments and opinions (300-400 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'sat-10',
    level: 'B2',
    title: 'El debate del teletrabajo',
    titleEn: 'The Remote Work Debate',
    sat: true,
    text: 'La pandemia de 2020 transformó radicalmente la forma en que millones de personas trabajan. Lo que comenzó como una medida de emergencia se convirtió en un experimento social a gran escala. Tres años después, el debate sobre el teletrabajo sigue dividiendo a empresas y trabajadores. Los defensores del trabajo remoto señalan beneficios claros: eliminación del tiempo de desplazamiento, mayor flexibilidad para organizar la vida personal y, según varios estudios, un aumento de la productividad en tareas que requieren concentración. Para muchas personas, especialmente aquellas con responsabilidades familiares, la posibilidad de trabajar desde casa ha supuesto una mejora significativa en su calidad de vida. Sin embargo, los críticos advierten sobre riesgos menos evidentes. El aislamiento social puede afectar la salud mental de los trabajadores. La frontera entre vida laboral y personal se difumina cuando la oficina está en el salón de casa. Además, las oportunidades de aprendizaje informal — esas conversaciones espontáneas junto a la máquina de café — desaparecen en el entorno virtual. Algunas empresas han optado por modelos híbridos que combinan días presenciales con días remotos. Esta solución intermedia intenta equilibrar las ventajas de ambos sistemas, aunque también genera sus propios desafíos logísticos. Lo que parece indiscutible es que el concepto de "oficina" ha cambiado para siempre. La pregunta ya no es si el teletrabajo funciona, sino cómo diseñar sistemas laborales que maximicen la productividad sin sacrificar el bienestar humano.',
    vocab: [
      { word: 'desplazamiento', english: 'commute' },
      { word: 'productividad', english: 'productivity' },
      { word: 'se difumina', english: 'blurs / fades' },
      { word: 'presenciales', english: 'in-person' },
      { word: 'bienestar', english: 'well-being' }
    ],
    questions: [
      {
        prompt: '¿Cuál es el propósito principal del texto?',
        type: 'purpose',
        options: ['Convencer a los lectores de trabajar desde casa', 'Presentar argumentos de ambos lados del debate sobre teletrabajo', 'Criticar a las empresas que obligan a volver a la oficina', 'Describir cómo fue la pandemia'],
        correct: 1,
        explanation: 'The text presents both pros and cons of remote work in a balanced way.'
      },
      {
        prompt: '¿Qué riesgo del teletrabajo menciona el texto?',
        type: 'detail',
        options: ['Reducción del salario', 'Pérdida de empleo', 'Aislamiento social y difuminación de límites personales', 'Problemas con la tecnología'],
        correct: 2,
        explanation: 'The text mentions "aislamiento social" and "la frontera entre vida laboral y personal se difumina".'
      },
      {
        prompt: 'En el texto, ¿qué significa "se difumina" al hablar de la frontera trabajo-vida?',
        type: 'vocab-in-context',
        options: ['Se hace más clara', 'Se vuelve borrosa, pierde definición', 'Desaparece completamente', 'Se fortalece'],
        correct: 1,
        explanation: '"Se difumina" means it blurs/fades — the boundary becomes unclear.'
      },
      {
        prompt: '¿Qué se puede inferir sobre la posición del autor?',
        type: 'inference',
        options: ['Está totalmente a favor del teletrabajo', 'Cree que solo la oficina funciona', 'Adopta una postura equilibrada reconociendo ventajas y desventajas', 'No tiene opinión sobre el tema'],
        correct: 2,
        explanation: 'The author presents both sides and concludes by asking how to balance productivity and well-being.'
      },
      {
        prompt: '¿Qué son las "conversaciones espontáneas junto a la máquina de café"?',
        type: 'evidence',
        options: ['Un beneficio del teletrabajo', 'Un ejemplo de aprendizaje informal que se pierde con el teletrabajo', 'Un problema de las oficinas tradicionales', 'Una pérdida de tiempo laboral'],
        correct: 1,
        explanation: 'These spontaneous conversations are cited as an example of "oportunidades de aprendizaje informal" lost in remote work.'
      },
      {
        prompt: 'Según el texto, ¿cuál es la pregunta clave actualmente?',
        type: 'main-idea',
        options: ['¿Funciona el teletrabajo?', '¿Cómo diseñar sistemas que equilibren productividad y bienestar?', '¿Deberían cerrar las oficinas?', '¿Es mejor el modelo híbrido?'],
        correct: 1,
        explanation: 'The text concludes: "La pregunta ya no es si el teletrabajo funciona, sino cómo diseñar sistemas laborales que maximicen la productividad sin sacrificar el bienestar humano."'
      }
    ]
  },

  {
    id: 'sat-11',
    level: 'B2',
    title: 'La migración de las mariposas monarca',
    titleEn: 'The Monarch Butterfly Migration',
    sat: true,
    text: 'Cada otoño, millones de mariposas monarca emprenden uno de los viajes más extraordinarios del reino animal. Desde el sur de Canadá y el norte de Estados Unidos, estas frágiles criaturas recorren hasta 4.500 kilómetros para llegar a los bosques de oyamel en las montañas de Michoacán, México. Lo que hace esta migración particularmente asombrosa es que ninguna mariposa individual completa el viaje de ida y vuelta. El ciclo migratorio abarca cuatro generaciones. Las mariposas que parten de México en primavera mueren en el camino, pero sus descendientes continúan el viaje hacia el norte, reproduciéndose y muriendo en sucesivas generaciones. Solo la cuarta generación, llamada "generación Matusalén," vive lo suficiente para realizar el viaje completo de regreso a México. Los científicos aún no comprenden totalmente cómo estas mariposas, que nunca han estado en México, encuentran los mismos árboles que utilizaron sus bisabuelos. Se cree que combinan una brújula solar con un reloj biológico interno y posiblemente un sentido magnético. Sin embargo, este milagro natural está amenazado. La deforestación en los bosques mexicanos, el uso masivo de herbicidas que eliminan las plantas de algodoncillo — el único alimento de las larvas — y el cambio climático están reduciendo drásticamente las poblaciones. En los últimos veinte años, la cantidad de mariposas que llegan a México ha disminuido un 80 por ciento.',
    vocab: [
      { word: 'emprenden', english: 'undertake / embark on' },
      { word: 'frágiles', english: 'fragile' },
      { word: 'descendientes', english: 'descendants' },
      { word: 'brújula', english: 'compass' },
      { word: 'algodoncillo', english: 'milkweed' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea principal del texto?',
        type: 'main-idea',
        options: ['México tiene bosques hermosos', 'La extraordinaria migración de las monarcas y las amenazas que enfrenta', 'Los científicos estudian las mariposas', 'Los herbicidas son malos para el medio ambiente'],
        correct: 1,
        explanation: 'The passage describes both the amazing migration and the threats to it.'
      },
      {
        prompt: '¿Cuántas generaciones necesita el ciclo migratorio?',
        type: 'detail',
        options: ['Dos', 'Tres', 'Cuatro', 'Cinco'],
        correct: 2,
        explanation: 'The text states "El ciclo migratorio abarca cuatro generaciones".'
      },
      {
        prompt: 'En el texto, ¿qué significa "frágiles" al describir las mariposas?',
        type: 'vocab-in-context',
        options: ['Rápidas', 'Delicadas y fácilmente dañadas', 'Coloridas', 'Pequeñas'],
        correct: 1,
        explanation: '"Frágiles" means fragile/delicate, emphasizing the remarkable nature of such small creatures making such a long journey.'
      },
      {
        prompt: '¿Cuál es el propósito del autor al mencionar la disminución del 80%?',
        type: 'purpose',
        options: ['Dar un dato curioso', 'Mostrar la gravedad de la amenaza con evidencia concreta', 'Criticar a los científicos', 'Explicar la migración'],
        correct: 1,
        explanation: 'The statistic serves as concrete evidence of the severity of the threat to monarch populations.'
      },
      {
        prompt: '¿Por qué es especial la "generación Matusalén"?',
        type: 'detail',
        options: ['Es la más grande', 'Vive lo suficiente para completar el viaje de regreso a México', 'Tiene colores diferentes', 'No necesita comer'],
        correct: 1,
        explanation: 'The "Methuselah generation" is the only one that "vive lo suficiente para realizar el viaje completo de regreso".'
      },
      {
        prompt: '¿Qué misterio científico destaca el texto?',
        type: 'inference',
        options: ['Por qué las mariposas son monarca', 'Cómo mariposas que nunca estuvieron en México encuentran los mismos árboles', 'Cuántos kilómetros vuelan al día', 'Por qué tienen colores naranjas'],
        correct: 1,
        explanation: 'Scientists don\'t fully understand how butterflies "que nunca han estado en México, encuentran los mismos árboles que utilizaron sus bisabuelos".'
      }
    ]
  },

  {
    id: 'sat-12',
    level: 'B2',
    title: 'Arquitectura sostenible',
    titleEn: 'Sustainable Architecture',
    sat: true,
    text: 'Durante siglos, la arquitectura ha respondido a dos preguntas fundamentales: ¿cómo construir edificios que sean funcionales y cómo hacerlos estéticamente atractivos? En el siglo XXI, una tercera pregunta se ha vuelto igualmente urgente: ¿cómo construir sin destruir el planeta? La arquitectura sostenible propone respuestas innovadoras. Un ejemplo destacado es el edificio Bosco Verticale en Milán, Italia. Sus dos torres residenciales albergan más de 900 árboles y 20.000 plantas en sus balcones, creando un ecosistema vertical que absorbe CO2, produce oxígeno y regula la temperatura interior de forma natural. Sin embargo, la sostenibilidad arquitectónica va más allá de plantar árboles en fachadas. Implica repensar los materiales de construcción, favoreciendo opciones como la madera certificada, el bambú o el hormigón reciclado. También significa diseñar edificios que aprovechen la luz natural, capturen agua de lluvia y generen su propia energía mediante paneles solares. Paradójicamente, muchas de estas "innovaciones" recuperan principios que las culturas antiguas ya conocían. Las casas de adobe del suroeste americano, las construcciones de bambú del sudeste asiático o los patios interiores de la arquitectura árabe son ejemplos de diseño que trabaja con la naturaleza, no contra ella. El desafío actual no es solo técnico sino económico: hacer que la construcción sostenible sea accesible para todos, no solo un lujo para los más privilegiados.',
    vocab: [
      { word: 'albergan', english: 'house / shelter' },
      { word: 'fachadas', english: 'facades' },
      { word: 'hormigón', english: 'concrete' },
      { word: 'capturar', english: 'to capture' },
      { word: 'lujo', english: 'luxury' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la tesis principal del texto?',
        type: 'main-idea',
        options: ['Los edificios modernos son feos', 'La arquitectura debe encontrar formas de construir sin dañar el medio ambiente', 'Milán tiene la mejor arquitectura del mundo', 'Solo los ricos pueden vivir en edificios sostenibles'],
        correct: 1,
        explanation: 'The passage argues that architecture must address environmental sustainability as a core concern.'
      },
      {
        prompt: '¿Qué ejemplo concreto de arquitectura sostenible se menciona?',
        type: 'detail',
        options: ['La Torre Eiffel', 'El Bosco Verticale en Milán', 'La Casa Blanca', 'Las pirámides de Egipto'],
        correct: 1,
        explanation: 'The text uses "el edificio Bosco Verticale en Milán" as a key example.'
      },
      {
        prompt: 'En el texto, ¿qué significa "albergan" al hablar de las torres?',
        type: 'vocab-in-context',
        options: ['Destruyen', 'Contienen y dan espacio a', 'Bloquean', 'Necesitan'],
        correct: 1,
        explanation: '"Albergan" means they house/contain — the towers contain 900+ trees.'
      },
      {
        prompt: '¿Por qué dice el autor que es "paradójico" que muchas innovaciones recuperen principios antiguos?',
        type: 'purpose',
        options: ['Porque lo antiguo siempre es mejor', 'Porque lo que llamamos innovación ya existía en culturas pasadas', 'Porque los arquitectos no estudian historia', 'Porque la tecnología moderna no funciona'],
        correct: 1,
        explanation: 'The paradox is that modern "innovations" are actually rediscoveries of ancient building wisdom.'
      },
      {
        prompt: '¿Cuál es el desafío económico mencionado?',
        type: 'detail',
        options: ['Hacer que los edificios sean más grandes', 'Hacer la construcción sostenible accesible para todos', 'Reducir el precio de los paneles solares', 'Pagar a los arquitectos más dinero'],
        correct: 1,
        explanation: 'The challenge is "hacer que la construcción sostenible sea accesible para todos, no solo un lujo".'
      },
      {
        prompt: '¿Qué ejemplos de arquitectura antigua sostenible se citan?',
        type: 'evidence',
        options: ['Castillos medievales y catedrales góticas', 'Casas de adobe, construcciones de bambú y patios árabes', 'Puentes romanos y acueductos', 'Templos griegos y coliseos'],
        correct: 1,
        explanation: 'The text cites "casas de adobe del suroeste americano, las construcciones de bambú del sudeste asiático o los patios interiores de la arquitectura árabe".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C1  —  Abstract and nuanced topics (350-500 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'sat-13',
    level: 'C1',
    title: 'La paradoja de la elección',
    titleEn: 'The Paradox of Choice',
    sat: true,
    text: 'En las sociedades contemporáneas, la libertad de elección se considera un valor fundamental. Cuantas más opciones tengamos, supuestamente más libres y felices seremos. Sin embargo, investigaciones en psicología del comportamiento sugieren que esta relación no es tan lineal como parece. El psicólogo Barry Schwartz, en su influyente obra "La paradoja de la elección," argumenta que el exceso de opciones puede producir parálisis decisional, insatisfacción crónica y ansiedad. Un experimento clásico ilustra este fenómeno. En un supermercado, los investigadores instalaron un puesto de degustación de mermeladas. Cuando ofrecieron veinticuatro variedades, muchas personas se detenían a probar, pero solo el 3% realizaba una compra. Cuando redujeron la selección a seis variedades, las ventas se multiplicaron por diez. La abundancia de opciones no facilitó la decisión; la complicó hasta el punto de la inacción. Este fenómeno se extiende a decisiones mucho más trascendentes. Los jóvenes contemporáneos enfrentan un abanico de posibilidades vitales sin precedentes: carreras, ciudades, estilos de vida, relaciones. Paradójicamente, esta abundancia de opciones no siempre se traduce en mayor satisfacción. El miedo a elegir "mal" — a perderse una alternativa mejor — genera lo que los psicólogos denominan FOMO: fear of missing out. Schwartz distingue entre "maximizadores," personas que buscan obsesivamente la mejor opción posible, y "satisficers," quienes eligen la primera opción que cumple sus criterios básicos. Sus estudios revelan que los maximizadores, a pesar de tomar decisiones objetivamente superiores, tienden a experimentar mayor arrepentimiento y menor satisfacción que los satisficers. La implicación práctica es contraintuitiva: limitar deliberadamente nuestras opciones puede aumentar nuestro bienestar. Establecer criterios claros antes de decidir, aceptar que "suficientemente bueno" suele ser suficiente, y resistir la tentación de comparar constantemente nuestra elección con las alternativas descartadas son estrategias que la investigación respalda como caminos hacia decisiones más satisfactorias.',
    vocab: [
      { word: 'parálisis decisional', english: 'decision paralysis' },
      { word: 'trascendentes', english: 'significant / momentous' },
      { word: 'abanico', english: 'range / spectrum' },
      { word: 'arrepentimiento', english: 'regret' },
      { word: 'contraintuitiva', english: 'counterintuitive' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la tesis central del texto?',
        type: 'main-idea',
        options: ['Necesitamos más opciones en la vida', 'El exceso de opciones puede reducir la satisfacción y dificultar la toma de decisiones', 'Las mermeladas son difíciles de elegir', 'Los psicólogos no entienden las decisiones humanas'],
        correct: 1,
        explanation: 'The text argues that too many choices can lead to decision paralysis, anxiety, and less satisfaction.'
      },
      {
        prompt: '¿Qué demostró el experimento de las mermeladas?',
        type: 'detail',
        options: ['La gente prefiere variedades nuevas', 'Más opciones llevan a menos compras', 'Las mermeladas caras se venden más', 'Seis variedades es muy poco'],
        correct: 1,
        explanation: 'With 24 varieties only 3% bought; with 6, sales multiplied by ten.'
      },
      {
        prompt: 'En el texto, ¿qué significa "contraintuitiva"?',
        type: 'vocab-in-context',
        options: ['Muy lógica', 'Opuesta a lo que se esperaría normalmente', 'Basada en la intuición', 'Incorrecta científicamente'],
        correct: 1,
        explanation: '"Contraintuitiva" means counterintuitive — opposite to what one would normally expect.'
      },
      {
        prompt: '¿Cuál es el propósito del autor al incluir el concepto de FOMO?',
        type: 'purpose',
        options: ['Criticar a los jóvenes', 'Ilustrar cómo la abundancia de opciones genera ansiedad', 'Promover las redes sociales', 'Explicar un término de moda'],
        correct: 1,
        explanation: 'FOMO is used to illustrate how abundance of options creates anxiety about missing better alternatives.'
      },
      {
        prompt: '¿Qué diferencia hay entre maximizadores y satisficers?',
        type: 'detail',
        options: ['Los maximizadores son más felices', 'Los satisficers eligen cualquier cosa sin pensar', 'Los maximizadores buscan la mejor opción; los satisficers aceptan una opción suficientemente buena', 'No hay diferencia real'],
        correct: 2,
        explanation: 'Maximizers obsessively seek the best; satisficers choose the first option meeting their basic criteria.'
      },
      {
        prompt: '¿Qué evidencia usa el autor para respaldar que limitar opciones mejora el bienestar?',
        type: 'evidence',
        options: ['Datos económicos de supermercados', 'Los estudios de Schwartz muestran que los maximizadores experimentan más arrepentimiento', 'Testimonios de personas felices', 'Estadísticas gubernamentales'],
        correct: 1,
        explanation: 'Schwartz\'s studies showing maximizers experience more regret despite objectively better decisions.'
      }
    ]
  },

  {
    id: 'sat-14',
    level: 'C1',
    title: 'El bilingüismo y el cerebro',
    titleEn: 'Bilingualism and the Brain',
    sat: true,
    text: 'Durante décadas, el bilingüismo fue visto con sospecha. Se creía que hablar dos idiomas confundía a los niños, retrasaba su desarrollo lingüístico y creaba "mentes divididas." Investigaciones recientes han demostrado que esta percepción estaba profundamente equivocada. Lejos de ser un obstáculo, el bilingüismo constituye un ejercicio cognitivo que fortalece el cerebro de maneras sorprendentes. Los estudios de neuroimagen revelan que el cerebro bilingüe presenta mayor densidad de materia gris en regiones asociadas con el control ejecutivo: la capacidad de concentrarse, alternar entre tareas y filtrar información irrelevante. Cada vez que un hablante bilingüe selecciona un idioma y suprime el otro, activa un sistema de control que funciona como un entrenamiento mental constante. Esta "gimnasia cerebral" tiene consecuencias que trascienden el ámbito lingüístico. Los bilingües tienden a mostrar mayor flexibilidad cognitiva, mejor capacidad de resolución de problemas y superiores habilidades de multitarea. Quizás el hallazgo más significativo proviene de la investigación sobre el envejecimiento. Varios estudios longitudinales han encontrado que el bilingüismo puede retrasar la aparición de síntomas de demencia entre cuatro y cinco años, independientemente del nivel educativo, los ingresos o la salud física del individuo. No obstante, es importante matizar estos hallazgos. Los beneficios cognitivos del bilingüismo no son automáticos ni uniformes. Dependen del grado de uso activo de ambas lenguas, del contexto en que se emplean y de la edad de adquisición. Un bilingüe que utiliza ambos idiomas diariamente en contextos variados obtiene mayores beneficios que quien aprendió un segundo idioma pero rara vez lo practica. Lo que la ciencia confirma inequívocamente es que el cerebro humano está diseñado para manejar múltiples lenguas, y que hacerlo no solo es posible sino beneficioso.',
    vocab: [
      { word: 'sospecha', english: 'suspicion' },
      { word: 'densidad', english: 'density' },
      { word: 'suprime', english: 'suppresses' },
      { word: 'trascienden', english: 'transcend / go beyond' },
      { word: 'matizar', english: 'to nuance / qualify' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea central del texto?',
        type: 'main-idea',
        options: ['El bilingüismo es peligroso para los niños', 'El bilingüismo fortalece el cerebro y tiene beneficios cognitivos significativos', 'Aprender idiomas es fácil para todos', 'Solo los niños pueden ser bilingües'],
        correct: 1,
        explanation: 'The text argues that bilingualism strengthens the brain and provides significant cognitive benefits.'
      },
      {
        prompt: '¿Cuántos años puede retrasar el bilingüismo los síntomas de demencia?',
        type: 'detail',
        options: ['1-2 años', '2-3 años', '4-5 años', '7-8 años'],
        correct: 2,
        explanation: 'The text states bilingualism can delay dementia symptoms "entre cuatro y cinco años".'
      },
      {
        prompt: 'En el texto, ¿qué significa "matizar" estos hallazgos?',
        type: 'vocab-in-context',
        options: ['Negar los resultados', 'Añadir detalles y precisiones que evitan generalizaciones', 'Exagerar los beneficios', 'Traducir los estudios'],
        correct: 1,
        explanation: '"Matizar" means to nuance/qualify — adding important details to prevent oversimplification.'
      },
      {
        prompt: '¿Cuál es el propósito del autor al mencionar la creencia antigua sobre el bilingüismo?',
        type: 'purpose',
        options: ['Para defender esa creencia', 'Para contrastar con la evidencia científica actual y mostrar cuánto ha cambiado la comprensión', 'Para criticar a los investigadores del pasado', 'Para confundir al lector'],
        correct: 1,
        explanation: 'The old belief serves as contrast to show how dramatically scientific understanding has changed.'
      },
      {
        prompt: '¿Qué condición es necesaria para obtener los máximos beneficios del bilingüismo?',
        type: 'inference',
        options: ['Aprender ambos idiomas de niño', 'Usar ambos idiomas activamente y en contextos variados', 'Tener un alto nivel educativo', 'Vivir en un país bilingüe'],
        correct: 1,
        explanation: 'A bilingual who "utiliza ambos idiomas diariamente en contextos variados obtiene mayores beneficios".'
      },
      {
        prompt: '¿Qué analogía usa el texto para describir el efecto del bilingüismo en el cerebro?',
        type: 'evidence',
        options: ['Un diccionario mental', 'Gimnasia cerebral / entrenamiento mental', 'Un ordenador con dos procesadores', 'Una biblioteca de idiomas'],
        correct: 1,
        explanation: 'The text calls it "gimnasia cerebral" and "entrenamiento mental constante".'
      }
    ]
  },

  {
    id: 'sat-15',
    level: 'C1',
    title: 'La economía circular',
    titleEn: 'The Circular Economy',
    sat: true,
    text: 'El modelo económico que ha dominado la era industrial sigue una lógica lineal: extraer materias primas, fabricar productos, consumirlos y desecharlos. Este esquema de "usar y tirar" ha generado una crisis medioambiental sin precedentes. Solo en 2022, la humanidad produjo más de 2.000 millones de toneladas de residuos sólidos. Ante esta realidad, la economía circular propone un cambio de paradigma radical: diseñar sistemas en los que los residuos no existan. En una economía circular, cada producto se concibe desde su diseño para ser reparado, reutilizado, remanufacturado o, en último término, reciclado de manera que sus materiales vuelvan al ciclo productivo. La naturaleza, donde los desechos de un organismo son el alimento de otro, es el modelo a seguir. Empresas pioneras ya implementan estos principios. Algunos fabricantes de ropa ofrecen servicios de reparación gratuita y programas de devolución que transforman prendas viejas en nuevos tejidos. En la industria electrónica, compañías diseñan productos modulares cuyos componentes pueden reemplazarse individualmente, prolongando drásticamente la vida útil del dispositivo. Sin embargo, la transición hacia una economía circular enfrenta obstáculos considerables. El actual sistema de precios no refleja los costes medioambientales reales de la producción lineal, lo que hace que los productos desechables resulten artificialmente baratos. Además, cambiar los hábitos de consumo de millones de personas requiere no solo incentivos económicos sino una transformación cultural profunda. Los críticos más escépticos señalan que la economía circular, en su forma actual, puede convertirse en una versión sofisticada del greenwashing: una narrativa tranquilizadora que permite a las empresas proyectar una imagen responsable sin cuestionar fundamentalmente el imperativo del crecimiento ilimitado.',
    vocab: [
      { word: 'paradigma', english: 'paradigm' },
      { word: 'residuos', english: 'waste' },
      { word: 'remanufacturado', english: 'remanufactured' },
      { word: 'modulares', english: 'modular' },
      { word: 'greenwashing', english: 'greenwashing' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea principal del texto?',
        type: 'main-idea',
        options: ['El reciclaje resuelve todos los problemas medioambientales', 'La economía circular propone eliminar residuos rediseñando los sistemas productivos', 'Las empresas no se preocupan por el medio ambiente', 'La naturaleza destruye todos los residuos'],
        correct: 1,
        explanation: 'The text presents the circular economy as a paradigm shift: designing systems where waste doesn\'t exist.'
      },
      {
        prompt: '¿Por qué los productos desechables parecen baratos?',
        type: 'detail',
        options: ['Porque se fabrican con materiales de baja calidad', 'Porque el sistema de precios no refleja los costes medioambientales reales', 'Porque hay mucha competencia', 'Porque los gobiernos los subvencionan'],
        correct: 1,
        explanation: '"El actual sistema de precios no refleja los costes medioambientales reales de la producción lineal."'
      },
      {
        prompt: 'En el texto, ¿qué significa "paradigma" en "cambio de paradigma"?',
        type: 'vocab-in-context',
        options: ['Un tipo de producto', 'Un modelo fundamental de pensamiento o marco conceptual', 'Una ley del gobierno', 'Un precio de mercado'],
        correct: 1,
        explanation: '"Paradigma" means a fundamental model/framework — a "cambio de paradigma" is a fundamental shift in thinking.'
      },
      {
        prompt: '¿Cuál es el propósito del autor al mencionar la naturaleza como modelo?',
        type: 'purpose',
        options: ['Sugerir que debemos vivir como animales', 'Mostrar que los ciclos sin residuos ya existen en la naturaleza, legitimando el concepto', 'Criticar la industria forestal', 'Explicar la biología'],
        correct: 1,
        explanation: 'Nature, where waste becomes food for other organisms, is cited to show that zero-waste cycles already work.'
      },
      {
        prompt: '¿Qué crítica se menciona sobre la economía circular?',
        type: 'detail',
        options: ['Es demasiado cara', 'Podría ser una forma sofisticada de greenwashing que no cuestiona el crecimiento ilimitado', 'No funciona en la práctica', 'Los consumidores la rechazan'],
        correct: 1,
        explanation: 'Critics worry it could become "una versión sofisticada del greenwashing" without questioning unlimited growth.'
      },
      {
        prompt: '¿Qué evidencia ofrecen los ejemplos de industria mencionados?',
        type: 'evidence',
        options: ['Que solo las grandes empresas pueden ser circulares', 'Que ya existen aplicaciones prácticas: reparación de ropa y productos electrónicos modulares', 'Que la tecnología es el único camino', 'Que la economía circular es solo teoría'],
        correct: 1,
        explanation: 'The clothing repair/return programs and modular electronics demonstrate practical circular economy applications.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C2  —  Sophisticated analysis (400-500 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'sat-16',
    level: 'C2',
    title: 'El mito de la objetividad periodística',
    titleEn: 'The Myth of Journalistic Objectivity',
    sat: true,
    text: 'La noción de que el periodismo puede o debe ser "objetivo" es, quizás, una de las ficciones más persistentes y contraproducentes del discurso mediático contemporáneo. Surgida en el contexto del periodismo estadounidense de principios del siglo XX como reacción frente al sensacionalismo de la prensa amarilla, la doctrina de la objetividad se erigió como ideal profesional: los hechos debían hablar por sí mismos, y el periodista debía limitarse a transmitirlos sin interpretación ni sesgo. Sin embargo, esta premisa ignora una realidad epistemológica fundamental: todo acto de comunicación implica selección, y toda selección refleja valores. El periodista que decide qué historia cubrir y cuál ignorar, qué fuentes consultar y cuáles descartar, qué detalles incluir y cuáles omitir, está inevitablemente ejerciendo un juicio que no es neutral. Como señaló la periodista Christiane Amanpour, la objetividad mal entendida puede convertirse en un instrumento de desinformación cuando otorga el mismo peso a la evidencia científica y a la pseudociencia, al testimonio documentado y a la teoría conspirativa. La trampa reside en confundir objetividad con equidistancia. Presentar "ambos lados" de un debate no constituye periodismo riguroso cuando uno de esos lados carece de sustento empírico. El cambio climático, la eficacia de las vacunas o la esfericidad de la Tierra no son "debates" en los que existan dos posiciones legítimamente equiparables. Esto no significa que el periodismo deba abandonar toda aspiración de rigor. Existe una diferencia crucial entre la objetividad — un ideal inalcanzable que pretende la ausencia de perspectiva — y la honestidad intelectual: la transparencia sobre los propios sesgos, el compromiso con la verificación de hechos, la disposición a corregir errores y la búsqueda de la complejidad frente a la simplificación. Modelos periodísticos emergentes, como el periodismo de soluciones o el periodismo de datos, demuestran que es posible ser riguroso y a la vez asumir una perspectiva explícita. La cuestión no es si el periodismo tiene un punto de vista — inevitablemente lo tiene —, sino si ese punto de vista está informado por evidencia, orientado hacia el bien público y dispuesto a someterse al escrutinio crítico.',
    vocab: [
      { word: 'contraproducentes', english: 'counterproductive' },
      { word: 'epistemológica', english: 'epistemological' },
      { word: 'sesgo', english: 'bias' },
      { word: 'equidistancia', english: 'equidistance / false balance' },
      { word: 'escrutinio', english: 'scrutiny' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la tesis central del texto?',
        type: 'main-idea',
        options: ['El periodismo debe ser totalmente objetivo', 'La objetividad periodística es un ideal inalcanzable; lo importante es la honestidad intelectual y el rigor', 'Los periodistas mienten deliberadamente', 'Las noticias son todas falsas'],
        correct: 1,
        explanation: 'The text argues objectivity is unachievable and should be replaced by intellectual honesty and rigor.'
      },
      {
        prompt: '¿Qué ejemplo usa el autor para ilustrar el peligro de la "equidistancia"?',
        type: 'evidence',
        options: ['La política internacional', 'Dar igual peso a ciencia y pseudociencia sobre cambio climático o vacunas', 'Los errores tipográficos en los periódicos', 'Las redes sociales'],
        correct: 1,
        explanation: 'The text cites climate change and vaccine efficacy as cases where false balance between science and pseudoscience is harmful.'
      },
      {
        prompt: 'En el texto, ¿qué significa "sesgo"?',
        type: 'vocab-in-context',
        options: ['Error ortográfico', 'Tendencia o inclinación que distorsiona la neutralidad', 'Tipo de artículo periodístico', 'Un método de investigación'],
        correct: 1,
        explanation: '"Sesgo" means bias — a tendency or inclination that distorts neutrality.'
      },
      {
        prompt: '¿Cuál es el propósito del autor al citar a Christiane Amanpour?',
        type: 'purpose',
        options: ['Mostrar que los periodistas famosos son objetivos', 'Apoyar con autoridad profesional la idea de que la falsa objetividad puede desinformar', 'Criticar a otros periodistas', 'Explicar la historia del periodismo'],
        correct: 1,
        explanation: 'Amanpour\'s authority supports the argument that misunderstood objectivity can become "un instrumento de desinformación".'
      },
      {
        prompt: '¿Qué distinción fundamental establece el texto?',
        type: 'inference',
        options: ['Entre periodismo digital y periodismo impreso', 'Entre objetividad (ideal imposible) y honestidad intelectual (práctica alcanzable)', 'Entre periodistas buenos y malos', 'Entre noticias nacionales e internacionales'],
        correct: 1,
        explanation: 'The key distinction is between objectivity (unachievable ideal) and intellectual honesty (achievable practice).'
      },
      {
        prompt: 'Según el texto, ¿qué hace riguroso al periodismo?',
        type: 'detail',
        options: ['No tener nunca una opinión', 'Transparencia sobre sesgos, verificación de hechos y disposición a corregir errores', 'Escribir artículos muy largos', 'Citar a muchas fuentes sin analizarlas'],
        correct: 1,
        explanation: 'Rigor involves "transparencia sobre los propios sesgos, el compromiso con la verificación de hechos, la disposición a corregir errores".'
      }
    ]
  },

  {
    id: 'sat-17',
    level: 'C2',
    title: 'Memoria colectiva y olvido',
    titleEn: 'Collective Memory and Forgetting',
    sat: true,
    text: 'Las sociedades, al igual que los individuos, recuerdan selectivamente. La memoria colectiva — ese repertorio compartido de narrativas, símbolos y conmemoraciones que una comunidad utiliza para interpretar su pasado — no es un registro fiel de los acontecimientos sino una construcción activa que responde a las necesidades del presente. El sociólogo Maurice Halbwachs, pionero en el estudio de la memoria colectiva, argumentó que recordar es siempre un acto social: nuestros recuerdos personales están enmarcados por los grupos a los que pertenecemos y las narrativas que estos comparten. Esta naturaleza constructiva de la memoria tiene implicaciones profundas. Las naciones seleccionan episodios heroicos para sus relatos fundacionales y relegan al olvido aquellos que contradicen la imagen que desean proyectar. España tardó décadas en abordar institucionalmente la memoria de la Guerra Civil y la dictadura franquista. Japón ha sido criticado por la forma en que sus textos escolares tratan la ocupación de China. Estados Unidos sigue debatiendo cómo representar la esclavitud y el genocidio de los pueblos indígenas en sus monumentos y currícula. Sin embargo, el olvido no es únicamente un acto de omisión culpable. El filósofo Paul Ricœur distinguió entre "olvido destructivo" — la supresión deliberada de la memoria de las víctimas — y "olvido fundacional," el proceso mediante el cual una sociedad acepta dejar atrás ciertos conflictos para posibilitar la convivencia. Las amnistías posconflicto, por ejemplo, representan formas institucionalizadas de olvido fundacional, cuya ética sigue siendo ferozmente debatida. La tensión entre memoria y olvido se ha intensificado en la era digital. Internet promete un archivo universal donde nada se pierde, pero esta hiperacumulación plantea nuevas preguntas: ¿tiene un individuo derecho al olvido cuando su pasado queda perpetuamente accesible mediante un buscador? ¿Es la preservación total necesariamente beneficiosa para una sociedad, o necesitan las culturas, como los individuos, la capacidad de olvidar para renovarse? Lo que resulta innegable es que el control sobre qué se recuerda y qué se olvida constituye una de las formas más sutiles y poderosas de poder.',
    vocab: [
      { word: 'conmemoraciones', english: 'commemorations' },
      { word: 'relegan', english: 'relegate / consign' },
      { word: 'supresión', english: 'suppression' },
      { word: 'amnistías', english: 'amnesties' },
      { word: 'perpetuamente', english: 'perpetually' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la tesis principal del texto?',
        type: 'main-idea',
        options: ['Los países deberían olvidar el pasado', 'La memoria colectiva es una construcción selectiva influida por el poder y las necesidades del presente', 'Internet resuelve el problema del olvido', 'Solo los historiadores pueden recordar correctamente'],
        correct: 1,
        explanation: 'The text argues collective memory is an active, selective construction shaped by present needs and power.'
      },
      {
        prompt: '¿Qué ejemplos nacionales de olvido selectivo menciona el texto?',
        type: 'detail',
        options: ['Francia, Alemania y Rusia', 'España, Japón y Estados Unidos', 'Brasil, Argentina y Chile', 'India, China y Australia'],
        correct: 1,
        explanation: 'The text cites Spain (Civil War), Japan (occupation of China), and the US (slavery, indigenous genocide).'
      },
      {
        prompt: 'En el texto, ¿qué significa "relegan" al hablar de episodios históricos?',
        type: 'vocab-in-context',
        options: ['Celebran con monumentos', 'Los apartan y envían al olvido deliberadamente', 'Los estudian con detalle', 'Los reinterpretan positivamente'],
        correct: 1,
        explanation: '"Relegan" means to relegate/consign — deliberately pushing episodes into forgetting.'
      },
      {
        prompt: '¿Cuál es el propósito del autor al distinguir entre dos tipos de olvido?',
        type: 'purpose',
        options: ['Para justificar siempre el olvido', 'Para mostrar que el olvido tiene dimensiones morales complejas, no es simplemente bueno o malo', 'Para criticar a Paul Ricœur', 'Para defender las amnistías'],
        correct: 1,
        explanation: 'The distinction shows forgetting has nuanced moral dimensions — it can be harmful or necessary.'
      },
      {
        prompt: '¿Qué nueva tensión introduce la era digital?',
        type: 'inference',
        options: ['Internet destruye los recuerdos', 'La preservación total de información plantea si el olvido es necesario para la renovación', 'Los ordenadores no pueden guardar toda la información', 'Las redes sociales mejoran la memoria'],
        correct: 1,
        explanation: 'The digital era raises whether total preservation is beneficial or if cultures, like individuals, need to forget to renew.'
      },
      {
        prompt: 'Según el texto, ¿qué constituye una forma sutil de poder?',
        type: 'evidence',
        options: ['El dinero', 'El control sobre qué se recuerda y qué se olvida', 'La tecnología digital', 'La educación universitaria'],
        correct: 1,
        explanation: 'The text concludes: "el control sobre qué se recuerda y qué se olvida constituye una de las formas más sutiles y poderosas de poder."'
      }
    ]
  },

  {
    id: 'sat-18',
    level: 'C2',
    title: 'La inteligencia artificial y la creatividad',
    titleEn: 'Artificial Intelligence and Creativity',
    sat: true,
    text: 'Cuando un sistema de inteligencia artificial genera un poema que conmueve a sus lectores, una composición musical que resulta indistinguible de una pieza de Bach o una pintura que se vende por miles de dólares en una subasta, surge inevitablemente la pregunta: ¿puede una máquina ser genuinamente creativa? La respuesta depende, por supuesto, de cómo definamos creatividad. Si la entendemos como la capacidad de producir resultados novedosos y valiosos, los sistemas de IA actuales ya satisfacen esta definición de manera funcional. Modelos generativos entrenados con vastos corpus de datos pueden combinar patrones de formas que ningún ser humano habría concebido. Sin embargo, críticos como el filósofo John Searle argumentarían que la producción de resultados superficialmente creativos no equivale a creatividad genuina. Para Searle, la creatividad requiere comprensión, intencionalidad y conciencia — cualidades que los sistemas de IA, por sofisticados que sean, fundamentalmente carecen. Un algoritmo que genera poesía no comprende el significado de las palabras que produce; simplemente calcula probabilidades estadísticas sobre secuencias de tokens. La analogía sería la de un calígrafo extraordinariamente hábil que reproduce textos en un idioma que desconoce: la ejecución puede ser impecable, pero no hay comprensión detrás de la forma. Esta perspectiva, no obstante, presupone que sabemos qué es la conciencia y cómo se relaciona con la creatividad — supuestos que la neurociencia está lejos de confirmar. Quizás la pregunta más productiva no sea si las máquinas pueden ser creativas en un sentido humano, sino cómo la IA está transformando nuestra comprensión de lo que significa crear. Históricamente, hemos asociado la creatividad con el genio individual, la inspiración misteriosa y la expresión de una subjetividad única. La existencia de máquinas capaces de producir resultados estéticamente convincentes nos obliga a reconsiderar estas suposiciones. ¿Es la creatividad un proceso o un producto? ¿Reside en la intención del creador o en el efecto sobre el receptor? ¿Es posible que lo que denominamos creatividad sea, al menos parcialmente, un fenómeno computacional: la recombinación de elementos existentes según reglas que aún no comprendemos del todo, tanto en cerebros biológicos como en procesadores de silicio?',
    vocab: [
      { word: 'conmueve', english: 'moves (emotionally)' },
      { word: 'intencionalidad', english: 'intentionality' },
      { word: 'corpus', english: 'corpus / body of data' },
      { word: 'presupone', english: 'presupposes' },
      { word: 'subjetividad', english: 'subjectivity' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la pregunta central que plantea el texto?',
        type: 'main-idea',
        options: ['¿Reemplazará la IA a los artistas?', '¿Puede la IA ser genuinamente creativa y qué implica esto para nuestra comprensión de la creatividad?', '¿Es la IA mejor que los humanos?', '¿Deberíamos prohibir la IA en el arte?'],
        correct: 1,
        explanation: 'The text explores whether AI can be genuinely creative and how this challenges our understanding of creativity.'
      },
      {
        prompt: '¿Qué argumento presenta John Searle?',
        type: 'detail',
        options: ['La IA es más creativa que los humanos', 'La creatividad requiere comprensión e intencionalidad, cualidades que la IA carece', 'La IA debería usarse solo en ciencia', 'La creatividad no existe realmente'],
        correct: 1,
        explanation: 'Searle argues creativity requires "comprensión, intencionalidad y conciencia — cualidades que los sistemas de IA fundamentalmente carecen".'
      },
      {
        prompt: 'En el texto, ¿qué significa "presupone"?',
        type: 'vocab-in-context',
        options: ['Demuestra definitivamente', 'Da por sentado algo que aún no está probado', 'Rechaza una idea', 'Inventa una teoría'],
        correct: 1,
        explanation: '"Presupone" means to presuppose — to assume something that hasn\'t been proven.'
      },
      {
        prompt: '¿Cuál es el propósito de la analogía del calígrafo?',
        type: 'purpose',
        options: ['Mostrar que la caligrafía es un arte', 'Ilustrar que la ejecución perfecta sin comprensión no equivale a verdadera creatividad', 'Criticar a los calígrafos', 'Explicar cómo funciona la IA técnicamente'],
        correct: 1,
        explanation: 'The calligrapher who copies text in an unknown language illustrates flawless execution without understanding.'
      },
      {
        prompt: '¿Qué sugiere el texto al final sobre la naturaleza de la creatividad?',
        type: 'inference',
        options: ['La creatividad es exclusivamente humana', 'La creatividad podría ser parcialmente un fenómeno computacional de recombinación', 'La IA nunca será creativa', 'La creatividad no puede ser definida'],
        correct: 1,
        explanation: 'The text asks if creativity might be "un fenómeno computacional: la recombinación de elementos existentes según reglas" in both biological and silicon processors.'
      },
      {
        prompt: '¿Qué debilidad identifica el autor en la postura de Searle?',
        type: 'evidence',
        options: ['Searle no es filósofo', 'Presupone que sabemos qué es la conciencia, algo que la neurociencia no ha confirmado', 'Searle nunca ha usado una computadora', 'La postura de Searle es demasiado favorable a la IA'],
        correct: 1,
        explanation: 'The author notes Searle\'s view "presupone que sabemos qué es la conciencia — supuestos que la neurociencia está lejos de confirmar".'
      }
    ]
  },
];
