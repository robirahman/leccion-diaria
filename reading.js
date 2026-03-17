'use strict';

// ════════════════════════════════════════════════════════════
//  READING COMPREHENSION — Graded passages with vocabulary
//  56 passages: 10 A1, 10 A2, 10 B1, 9 B2, 9 C1, 8 C2
// ════════════════════════════════════════════════════════════

const READING_DATA = [

  // ─────────────────────────────────────────────────────────
  //  A1  —  Simple present, basic vocabulary (50-80 words) — 10 passages
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-1',
    level: 'A1',
    title: 'Mi familia',
    titleEn: 'My Family',
    text: 'Me llamo María. Tengo una familia grande. Mi padre se llama Juan y mi madre se llama Ana. Tengo dos hermanos: Pedro y Luis. Pedro tiene quince años y Luis tiene diez años. También tenemos un perro. Se llama Toby. Vivimos en una casa blanca cerca del parque. Los domingos comemos juntos en casa. Mi madre cocina muy bien. Me gusta mucho mi familia.',
    vocab: [
      { word: 'familia', english: 'family' },
      { word: 'hermanos', english: 'brothers / siblings' },
      { word: 'vivimos', english: 'we live' },
      { word: 'juntos', english: 'together' },
      { word: 'cocina', english: 'she cooks' }
    ],
    questions: [
      {
        prompt: '¿Cómo se llama la madre de María?',
        options: ['Juan', 'Ana', 'Pedro', 'Toby'],
        correct: 1,
        explanation: 'The text says "mi madre se llama Ana".'
      },
      {
        prompt: '¿Cuántos hermanos tiene María?',
        options: ['Uno', 'Dos', 'Tres', 'Cuatro'],
        correct: 1,
        explanation: 'María says "tengo dos hermanos: Pedro y Luis".'
      },
      {
        prompt: '¿Qué mascota tiene la familia?',
        options: ['Un gato', 'Un pájaro', 'Un perro', 'Un pez'],
        correct: 2,
        explanation: 'The text mentions "tenemos un perro. Se llama Toby".'
      },
      {
        prompt: '¿Cuántos años tiene Luis?',
        options: ['Cinco', 'Diez', 'Quince', 'Veinte'],
        correct: 1,
        explanation: 'The text says "Luis tiene diez años".'
      }
    ]
  },

  {
    id: 'read-2',
    level: 'A1',
    title: 'Mi día',
    titleEn: 'My Day',
    text: 'Todos los días me levanto a las siete de la mañana. Primero me ducho y después desayuno café con tostadas. Voy al trabajo en autobús. Trabajo en una oficina de nueve a cinco. A mediodía como un bocadillo en el parque. Por la tarde vuelvo a casa y ceno con mi esposa. Antes de dormir leo un libro. Me acuesto a las once.',
    vocab: [
      { word: 'me levanto', english: 'I get up' },
      { word: 'desayuno', english: 'I have breakfast' },
      { word: 'mediodía', english: 'midday / noon' },
      { word: 'bocadillo', english: 'sandwich' },
      { word: 'me acuesto', english: 'I go to bed' }
    ],
    questions: [
      {
        prompt: '¿A qué hora se levanta?',
        options: ['A las seis', 'A las siete', 'A las ocho', 'A las nueve'],
        correct: 1,
        explanation: 'The text says "me levanto a las siete de la mañana".'
      },
      {
        prompt: '¿Cómo va al trabajo?',
        options: ['En coche', 'En bicicleta', 'En autobús', 'A pie'],
        correct: 2,
        explanation: 'The text says "voy al trabajo en autobús".'
      },
      {
        prompt: '¿Qué hace antes de dormir?',
        options: ['Ve la televisión', 'Lee un libro', 'Escucha música', 'Cocina'],
        correct: 1,
        explanation: 'The text says "antes de dormir leo un libro".'
      },
      {
        prompt: '¿Dónde come a mediodía?',
        options: ['En la oficina', 'En un restaurante', 'En el parque', 'En casa'],
        correct: 2,
        explanation: 'The text says "como un bocadillo en el parque".'
      }
    ]
  },

  {
    id: 'read-3',
    level: 'A1',
    title: 'En el supermercado',
    titleEn: 'At the Supermarket',
    text: 'Hoy voy al supermercado. Necesito comprar comida para la semana. Primero busco fruta: manzanas, plátanos y naranjas. Después voy a la sección de carne y compro pollo. También necesito leche, huevos y pan. El supermercado es grande y tiene muchos productos. Pago en la caja con mi tarjeta. La cuenta es veinte euros. Vuelvo a casa con las bolsas.',
    vocab: [
      { word: 'supermercado', english: 'supermarket' },
      { word: 'comprar', english: 'to buy' },
      { word: 'fruta', english: 'fruit' },
      { word: 'caja', english: 'checkout / register' },
      { word: 'bolsas', english: 'bags' }
    ],
    questions: [
      {
        prompt: '¿Qué fruta compra?',
        options: [
          'Fresas y uvas',
          'Manzanas, plátanos y naranjas',
          'Solo manzanas',
          'Peras y melocotones'
        ],
        correct: 1,
        explanation: 'The text lists "manzanas, plátanos y naranjas".'
      },
      {
        prompt: '¿Qué tipo de carne compra?',
        options: ['Cerdo', 'Ternera', 'Pollo', 'Pescado'],
        correct: 2,
        explanation: 'The text says "compro pollo".'
      },
      {
        prompt: '¿Cuánto paga?',
        options: ['Diez euros', 'Quince euros', 'Veinte euros', 'Treinta euros'],
        correct: 2,
        explanation: 'The text says "la cuenta es veinte euros".'
      },
      {
        prompt: '¿Cómo paga?',
        options: ['Con dinero', 'Con tarjeta', 'Con cheque', 'No paga'],
        correct: 1,
        explanation: 'The text says "pago en la caja con mi tarjeta".'
      }
    ]
  },

  {
    id: 'read-4',
    level: 'A1',
    title: 'Mi clase de español',
    titleEn: 'My Spanish Class',
    text: 'Estudio español en una escuela del centro de la ciudad. Mi profesora se llama Carmen. Ella es de Sevilla y es muy simpática. En la clase somos ocho estudiantes de diferentes países. Tenemos clase los lunes y los miércoles de seis a ocho de la tarde. Practicamos gramática, vocabulario y conversación. Me gusta mucho hablar en español con mis compañeros.',
    vocab: [
      { word: 'escuela', english: 'school' },
      { word: 'profesora', english: 'teacher (female)' },
      { word: 'simpática', english: 'friendly / nice' },
      { word: 'diferentes', english: 'different' },
      { word: 'compañeros', english: 'classmates' }
    ],
    questions: [
      {
        prompt: '¿De dónde es la profesora?',
        options: ['De Madrid', 'De Barcelona', 'De Sevilla', 'De Valencia'],
        correct: 2,
        explanation: 'The text says "ella es de Sevilla".'
      },
      {
        prompt: '¿Cuántos estudiantes hay en la clase?',
        options: ['Cinco', 'Seis', 'Ocho', 'Diez'],
        correct: 2,
        explanation: 'The text says "en la clase somos ocho estudiantes".'
      },
      {
        prompt: '¿Qué días tienen clase?',
        options: [
          'Martes y jueves',
          'Lunes y miércoles',
          'Lunes y viernes',
          'Todos los días'
        ],
        correct: 1,
        explanation: 'The text says "los lunes y los miércoles".'
      },
      {
        prompt: '¿Qué practican en clase?',
        options: [
          'Solo gramática',
          'Solo conversación',
          'Gramática, vocabulario y conversación',
          'Lectura y escritura'
        ],
        correct: 2,
        explanation: 'The text says "practicamos gramática, vocabulario y conversación".'
      }
    ]
  },

  {
    id: 'read-5',
    level: 'A1',
    title: 'Mi casa',
    titleEn: 'My House',
    text: 'Vivo en un apartamento pequeño pero bonito. Tiene tres habitaciones: un dormitorio, un salón y una cocina. El baño es pequeño. Mi habitación favorita es el salón porque tiene una ventana muy grande. Desde la ventana veo la calle y los árboles. Tengo un sofá azul y una mesa para comer. En la cocina hay una nevera y un horno. Me gusta mucho mi casa.',
    vocab: [
      { word: 'apartamento', english: 'apartment' },
      { word: 'habitaciones', english: 'rooms' },
      { word: 'salón', english: 'living room' },
      { word: 'ventana', english: 'window' },
      { word: 'nevera', english: 'refrigerator' }
    ],
    questions: [
      {
        prompt: '¿Cuántas habitaciones tiene el apartamento?',
        options: ['Dos', 'Tres', 'Cuatro', 'Cinco'],
        correct: 1,
        explanation: 'The text says "tiene tres habitaciones".'
      },
      {
        prompt: '¿Cuál es su habitación favorita?',
        options: ['El dormitorio', 'La cocina', 'El salón', 'El baño'],
        correct: 2,
        explanation: 'The text says "mi habitación favorita es el salón".'
      },
      {
        prompt: '¿Por qué le gusta el salón?',
        options: [
          'Porque es grande',
          'Porque tiene una ventana muy grande',
          'Porque tiene televisión',
          'Porque es nuevo'
        ],
        correct: 1,
        explanation: 'The text says "porque tiene una ventana muy grande".'
      },
      {
        prompt: '¿De qué color es el sofá?',
        options: ['Rojo', 'Verde', 'Azul', 'Blanco'],
        correct: 2,
        explanation: 'The text says "tengo un sofá azul".'
      }
    ]
  },

  {
    id: 'read-6',
    level: 'A1',
    title: 'La familia de Carlos',
    titleEn: 'Carlos\'s Family',
    text: 'Carlos tiene una familia pequeña. Su madre se llama Rosa y es profesora. Su padre se llama Miguel y es doctor. Carlos tiene una hermana menor. Ella se llama Sofía y tiene seis años. Los sábados la familia va al parque. Carlos y Sofía juegan juntos y están muy contentos.',
    vocab: [
      { word: 'menor', english: 'younger' },
      { word: 'profesora', english: 'teacher (female)' },
      { word: 'sábados', english: 'Saturdays' },
      { word: 'juegan', english: 'they play' },
      { word: 'contentos', english: 'happy' }
    ],
    questions: [
      {
        prompt: '¿Cuál es el trabajo de la madre de Carlos?',
        options: ['Doctora', 'Profesora', 'Enfermera', 'Abogada'],
        correct: 1,
        explanation: 'The text says "su madre se llama Rosa y es profesora".'
      },
      {
        prompt: '¿Cuántos años tiene Sofía?',
        options: ['Cuatro', 'Cinco', 'Seis', 'Siete'],
        correct: 2,
        explanation: 'The text says "tiene seis años".'
      },
      {
        prompt: '¿Adónde va la familia los sábados?',
        options: ['Al cine', 'A la playa', 'Al parque', 'Al centro comercial'],
        correct: 2,
        explanation: 'The text says "los sábados la familia va al parque".'
      }
    ]
  },

  {
    id: 'read-7',
    level: 'A1',
    title: 'Por la mañana',
    titleEn: 'In the Morning',
    text: 'Elena se despierta a las seis y media. Primero se lava la cara y se cepilla los dientes. Después desayuna cereal con leche y un jugo de naranja. A las siete y media sale de casa. Camina a la escuela porque está cerca. Las clases empiezan a las ocho. Elena siempre llega temprano.',
    vocab: [
      { word: 'se despierta', english: 'she wakes up' },
      { word: 'se cepilla', english: 'she brushes' },
      { word: 'desayuna', english: 'she has breakfast' },
      { word: 'camina', english: 'she walks' },
      { word: 'temprano', english: 'early' }
    ],
    questions: [
      {
        prompt: '¿A qué hora se despierta Elena?',
        options: ['A las seis', 'A las seis y media', 'A las siete', 'A las siete y media'],
        correct: 1,
        explanation: 'The text says "se despierta a las seis y media".'
      },
      {
        prompt: '¿Cómo va Elena a la escuela?',
        options: ['En autobús', 'En coche', 'Camina', 'En bicicleta'],
        correct: 2,
        explanation: 'The text says "camina a la escuela porque está cerca".'
      },
      {
        prompt: '¿Qué desayuna Elena?',
        options: ['Tostadas con café', 'Cereal con leche y jugo de naranja', 'Huevos y pan', 'Fruta y yogur'],
        correct: 1,
        explanation: 'The text says "desayuna cereal con leche y un jugo de naranja".'
      }
    ]
  },

  {
    id: 'read-8',
    level: 'A1',
    title: 'La comida favorita',
    titleEn: 'Favorite Food',
    text: 'A Pablo le gusta mucho la comida. Su comida favorita es la pizza. Los viernes su familia pide pizza para cenar. A su hermana le gustan las ensaladas. Su madre prepara una ensalada grande con tomate, lechuga y queso. El padre de Pablo bebe agua con la cena. Después de cenar todos comen helado de chocolate.',
    vocab: [
      { word: 'comida', english: 'food / meal' },
      { word: 'pide', english: 'orders' },
      { word: 'cenar', english: 'to have dinner' },
      { word: 'ensalada', english: 'salad' },
      { word: 'helado', english: 'ice cream' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la comida favorita de Pablo?',
        options: ['La ensalada', 'La pizza', 'El helado', 'La pasta'],
        correct: 1,
        explanation: 'The text says "su comida favorita es la pizza".'
      },
      {
        prompt: '¿Qué día pide pizza la familia?',
        options: ['Los lunes', 'Los miércoles', 'Los viernes', 'Los domingos'],
        correct: 2,
        explanation: 'The text says "los viernes su familia pide pizza para cenar".'
      },
      {
        prompt: '¿Qué comen todos después de cenar?',
        options: ['Fruta', 'Galletas', 'Pastel', 'Helado de chocolate'],
        correct: 3,
        explanation: 'The text says "después de cenar todos comen helado de chocolate".'
      }
    ]
  },

  {
    id: 'read-9',
    level: 'A1',
    title: 'En la escuela',
    titleEn: 'At School',
    text: 'Marta es estudiante. Tiene doce años y está en la escuela secundaria. Su clase favorita es matemáticas porque le gustan mucho los números. También estudia ciencias, historia y español. Su profesor de historia es muy divertido. Marta tiene muchos amigos en la escuela. En el recreo hablan y juegan en el patio.',
    vocab: [
      { word: 'estudiante', english: 'student' },
      { word: 'escuela secundaria', english: 'secondary school' },
      { word: 'divertido', english: 'fun / funny' },
      { word: 'recreo', english: 'recess / break' },
      { word: 'patio', english: 'yard / playground' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la clase favorita de Marta?',
        options: ['Ciencias', 'Historia', 'Matemáticas', 'Español'],
        correct: 2,
        explanation: 'The text says "su clase favorita es matemáticas".'
      },
      {
        prompt: '¿Cuántos años tiene Marta?',
        options: ['Diez', 'Once', 'Doce', 'Trece'],
        correct: 2,
        explanation: 'The text says "tiene doce años".'
      },
      {
        prompt: '¿Qué hacen Marta y sus amigos en el recreo?',
        options: ['Estudian', 'Comen', 'Hablan y juegan en el patio', 'Leen libros'],
        correct: 2,
        explanation: 'The text says "en el recreo hablan y juegan en el patio".'
      }
    ]
  },

  {
    id: 'read-10',
    level: 'A1',
    title: 'Los pasatiempos de Ana',
    titleEn: 'Ana\'s Hobbies',
    text: 'Ana tiene muchos pasatiempos. Le gusta dibujar y pintar. Los fines de semana dibuja en su cuaderno. También le gusta escuchar música. Su cantante favorita es Shakira. Por las tardes Ana monta en bicicleta con su amiga Laura. A veces leen libros juntas en la biblioteca. Ana está contenta porque tiene tiempo libre para hacer cosas divertidas.',
    vocab: [
      { word: 'pasatiempos', english: 'hobbies' },
      { word: 'dibujar', english: 'to draw' },
      { word: 'cuaderno', english: 'notebook' },
      { word: 'monta en bicicleta', english: 'she rides a bicycle' },
      { word: 'biblioteca', english: 'library' }
    ],
    questions: [
      {
        prompt: '¿Qué le gusta hacer a Ana?',
        options: ['Cocinar y bailar', 'Dibujar y pintar', 'Cantar y nadar', 'Correr y saltar'],
        correct: 1,
        explanation: 'The text says "le gusta dibujar y pintar".'
      },
      {
        prompt: '¿Quién es la cantante favorita de Ana?',
        options: ['Rosalía', 'Shakira', 'Selena', 'Gloria Estefan'],
        correct: 1,
        explanation: 'The text says "su cantante favorita es Shakira".'
      },
      {
        prompt: '¿Qué hacen Ana y Laura a veces en la biblioteca?',
        options: ['Estudian español', 'Usan la computadora', 'Leen libros', 'Dibujan'],
        correct: 2,
        explanation: 'The text says "a veces leen libros juntas en la biblioteca".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  A2  —  Past tenses introduced, travel/shopping (80-120 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-11',
    level: 'A2',
    title: 'Un viaje a Barcelona',
    titleEn: 'A Trip to Barcelona',
    text: 'El verano pasado fui a Barcelona con mis amigos. Viajamos en tren desde Madrid y el viaje duró tres horas. Llegamos por la tarde y fuimos directamente al hotel. Al día siguiente visitamos la Sagrada Familia. Es una iglesia muy impresionante y enorme. Después paseamos por las Ramblas y comimos paella en un restaurante cerca del mar. Por la noche fuimos a un bar y escuchamos música en vivo. Barcelona es una ciudad muy bonita y quiero volver pronto.',
    vocab: [
      { word: 'verano pasado', english: 'last summer' },
      { word: 'viaje', english: 'trip / journey' },
      { word: 'duró', english: 'it lasted' },
      { word: 'impresionante', english: 'impressive' },
      { word: 'volver', english: 'to return' }
    ],
    questions: [
      {
        prompt: '¿Cómo viajaron a Barcelona?',
        options: ['En avión', 'En coche', 'En tren', 'En autobús'],
        correct: 2,
        explanation: 'The text says "viajamos en tren desde Madrid".'
      },
      {
        prompt: '¿Cuánto duró el viaje?',
        options: ['Una hora', 'Dos horas', 'Tres horas', 'Cuatro horas'],
        correct: 2,
        explanation: 'The text says "el viaje duró tres horas".'
      },
      {
        prompt: '¿Qué comieron en el restaurante?',
        options: ['Tapas', 'Tortilla', 'Paella', 'Bocadillos'],
        correct: 2,
        explanation: 'The text says "comimos paella en un restaurante".'
      },
      {
        prompt: '¿Qué monumento visitaron?',
        options: ['El Parque Güell', 'La Sagrada Familia', 'El Camp Nou', 'La Pedrera'],
        correct: 1,
        explanation: 'The text says "visitamos la Sagrada Familia".'
      },
      {
        prompt: '¿Quiere volver a Barcelona?',
        options: [
          'No, no le gustó',
          'Sí, quiere volver pronto',
          'No sabe',
          'Solo si es barato'
        ],
        correct: 1,
        explanation: 'The text ends with "quiero volver pronto".'
      }
    ]
  },

  {
    id: 'read-12',
    level: 'A2',
    title: 'De compras',
    titleEn: 'Shopping',
    text: 'Ayer fui de compras al centro comercial porque necesitaba ropa nueva para el invierno. Primero entré en una tienda de ropa y me probé varios abrigos. Al final compré uno negro que costó cincuenta euros. También encontré unas botas marrones muy bonitas, pero eran demasiado caras. Después fui a otra tienda y compré dos camisetas en oferta. Solo pagué diez euros por las dos. Estuve en el centro comercial toda la tarde. Cuando volví a casa estaba muy cansada pero contenta con mis compras.',
    vocab: [
      { word: 'centro comercial', english: 'shopping mall' },
      { word: 'abrigo', english: 'coat' },
      { word: 'botas', english: 'boots' },
      { word: 'en oferta', english: 'on sale' },
      { word: 'cansada', english: 'tired (female)' }
    ],
    questions: [
      {
        prompt: '¿Por qué fue de compras?',
        options: [
          'Porque era su cumpleaños',
          'Necesitaba ropa de invierno',
          'Quería comprar un regalo',
          'No tenía nada que hacer'
        ],
        correct: 1,
        explanation: 'The text says "necesitaba ropa nueva para el invierno".'
      },
      {
        prompt: '¿Cuánto costó el abrigo?',
        options: ['Diez euros', 'Treinta euros', 'Cincuenta euros', 'Cien euros'],
        correct: 2,
        explanation: 'The text says "costó cincuenta euros".'
      },
      {
        prompt: '¿Por qué no compró las botas?',
        options: [
          'Eran feas',
          'No había su talla',
          'Eran demasiado caras',
          'No le gustaba el color'
        ],
        correct: 2,
        explanation: 'The text says "eran demasiado caras".'
      },
      {
        prompt: '¿Cómo se sentía al volver a casa?',
        options: [
          'Triste y enfadada',
          'Cansada pero contenta',
          'Con hambre',
          'Aburrida'
        ],
        correct: 1,
        explanation: 'The text says "estaba muy cansada pero contenta con mis compras".'
      }
    ]
  },

  {
    id: 'read-13',
    level: 'A2',
    title: 'La fiesta de cumpleaños',
    titleEn: 'The Birthday Party',
    text: 'El sábado pasado fue el cumpleaños de mi amiga Laura. Ella cumplió treinta años. Organizamos una fiesta sorpresa en su casa. Yo preparé una tarta de chocolate y Miguel compró las bebidas. Invitamos a veinte personas. Cuando Laura llegó a casa, todos gritamos "¡Sorpresa!" y ella se puso muy contenta. Bailamos y cantamos toda la noche. Laura recibió muchos regalos bonitos. Yo le regalé un libro de cocina porque a ella le encanta cocinar. La fiesta terminó a las dos de la mañana.',
    vocab: [
      { word: 'cumpleaños', english: 'birthday' },
      { word: 'sorpresa', english: 'surprise' },
      { word: 'tarta', english: 'cake' },
      { word: 'regalos', english: 'gifts / presents' },
      { word: 'terminó', english: 'it ended / finished' }
    ],
    questions: [
      {
        prompt: '¿Cuántos años cumplió Laura?',
        options: ['Veinticinco', 'Veintiocho', 'Treinta', 'Treinta y cinco'],
        correct: 2,
        explanation: 'The text says "cumplió treinta años".'
      },
      {
        prompt: '¿Quién preparó la tarta?',
        options: ['Laura', 'Miguel', 'El narrador', 'La madre de Laura'],
        correct: 2,
        explanation: 'The narrator says "yo preparé una tarta de chocolate".'
      },
      {
        prompt: '¿Qué regalo recibió Laura del narrador?',
        options: [
          'Un vestido',
          'Un libro de cocina',
          'Un perfume',
          'Una planta'
        ],
        correct: 1,
        explanation: 'The text says "yo le regalé un libro de cocina".'
      },
      {
        prompt: '¿A qué hora terminó la fiesta?',
        options: [
          'A medianoche',
          'A la una',
          'A las dos de la mañana',
          'A las tres de la mañana'
        ],
        correct: 2,
        explanation: 'The text says "la fiesta terminó a las dos de la mañana".'
      }
    ]
  },

  {
    id: 'read-14',
    level: 'A2',
    title: 'Mi pasatiempo favorito',
    titleEn: 'My Favorite Hobby',
    text: 'Me llamo Carlos y mi pasatiempo favorito es la fotografía. Empecé a hacer fotos hace dos años cuando mi padre me regaló una cámara. Normalmente salgo los fines de semana al campo o a la playa para hacer fotos de la naturaleza. Me gustan mucho los paisajes y los animales. El mes pasado participé en un concurso de fotografía y gané el segundo premio. Fue una experiencia muy emocionante. Ahora quiero estudiar fotografía profesional. Publico mis mejores fotos en internet y muchas personas las ven.',
    vocab: [
      { word: 'pasatiempo', english: 'hobby / pastime' },
      { word: 'cámara', english: 'camera' },
      { word: 'naturaleza', english: 'nature' },
      { word: 'concurso', english: 'competition / contest' },
      { word: 'premio', english: 'prize' }
    ],
    questions: [
      {
        prompt: '¿Cuándo empezó Carlos a hacer fotos?',
        options: [
          'Hace un año',
          'Hace dos años',
          'Hace cinco años',
          'Cuando era niño'
        ],
        correct: 1,
        explanation: 'The text says "empecé a hacer fotos hace dos años".'
      },
      {
        prompt: '¿Quién le regaló la cámara?',
        options: ['Su madre', 'Su padre', 'Un amigo', 'La compró él'],
        correct: 1,
        explanation: 'The text says "mi padre me regaló una cámara".'
      },
      {
        prompt: '¿Qué premio ganó en el concurso?',
        options: ['El primer premio', 'El segundo premio', 'El tercer premio', 'Ningún premio'],
        correct: 1,
        explanation: 'The text says "gané el segundo premio".'
      },
      {
        prompt: '¿Qué quiere estudiar Carlos?',
        options: [
          'Biología',
          'Arte',
          'Fotografía profesional',
          'Diseño gráfico'
        ],
        correct: 2,
        explanation: 'The text says "quiero estudiar fotografía profesional".'
      }
    ]
  },

  {
    id: 'read-15',
    level: 'A2',
    title: 'Una visita al médico',
    titleEn: 'A Visit to the Doctor',
    text: 'La semana pasada me sentí muy mal. Me dolía la cabeza, tenía fiebre y no podía dormir bien. Después de tres días así, decidí ir al médico. La doctora García me examinó y me dijo que tenía gripe. Me recetó unas pastillas y me dijo que necesitaba descansar mucho y beber agua. También me recomendó no ir al trabajo durante una semana. Seguí sus consejos y poco a poco me sentí mejor. Ahora ya estoy bien y puedo hacer vida normal otra vez. Es importante ir al médico cuando estamos enfermos.',
    vocab: [
      { word: 'me dolía', english: 'it was hurting me' },
      { word: 'fiebre', english: 'fever' },
      { word: 'gripe', english: 'flu' },
      { word: 'recetó', english: 'she prescribed' },
      { word: 'descansar', english: 'to rest' }
    ],
    questions: [
      {
        prompt: '¿Qué síntomas tenía?',
        options: [
          'Dolor de estómago',
          'Dolor de cabeza y fiebre',
          'Tos y dolor de garganta',
          'Dolor de espalda'
        ],
        correct: 1,
        explanation: 'The text says "me dolía la cabeza, tenía fiebre y no podía dormir".'
      },
      {
        prompt: '¿Qué enfermedad tenía?',
        options: ['Un resfriado', 'Gripe', 'Alergia', 'Covid'],
        correct: 1,
        explanation: 'The text says "me dijo que tenía gripe".'
      },
      {
        prompt: '¿Cuánto tiempo tardó en ir al médico?',
        options: ['Un día', 'Dos días', 'Tres días', 'Una semana'],
        correct: 2,
        explanation: 'The text says "después de tres días así, decidí ir al médico".'
      },
      {
        prompt: '¿Qué le recomendó la doctora?',
        options: [
          'Hacer ejercicio',
          'Descansar y beber agua',
          'Comer mucho',
          'Tomar vitaminas'
        ],
        correct: 1,
        explanation: 'The text says "necesitaba descansar mucho y beber agua".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  B1  —  Mixed tenses, opinions, culture (120-160 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-16',
    level: 'B1',
    title: 'El tango argentino',
    titleEn: 'Argentine Tango',
    text: 'El tango nació en Buenos Aires a finales del siglo XIX. Al principio era la música de los barrios pobres, donde los inmigrantes europeos se mezclaban con la población local. Con el tiempo, el tango se convirtió en un símbolo de la identidad argentina. Carlos Gardel, considerado el rey del tango, llevó esta música al mundo entero en los años treinta. Hoy en día, el tango sigue siendo muy popular. Muchos turistas viajan a Buenos Aires para aprender a bailarlo en las milongas, que son los salones de baile tradicionales. En 2009, la UNESCO declaró el tango Patrimonio Cultural Inmaterial de la Humanidad. Para los argentinos, el tango no es solo un baile: es una forma de expresar emociones profundas como la nostalgia y el amor.',
    vocab: [
      { word: 'nació', english: 'was born / originated' },
      { word: 'se mezclaban', english: 'mixed together' },
      { word: 'se convirtió', english: 'it became' },
      { word: 'milongas', english: 'tango dance halls' },
      { word: 'nostalgia', english: 'nostalgia / longing' }
    ],
    questions: [
      {
        prompt: '¿Dónde nació el tango?',
        options: ['En Montevideo', 'En Buenos Aires', 'En Madrid', 'En La Habana'],
        correct: 1,
        explanation: 'The text says "el tango nació en Buenos Aires".'
      },
      {
        prompt: '¿Quién es considerado el rey del tango?',
        options: ['Astor Piazzolla', 'Carlos Gardel', 'Lionel Messi', 'Jorge Luis Borges'],
        correct: 1,
        explanation: 'The text says "Carlos Gardel, considerado el rey del tango".'
      },
      {
        prompt: '¿Qué son las milongas?',
        options: [
          'Canciones populares',
          'Instrumentos musicales',
          'Salones de baile tradicionales',
          'Barrios de Buenos Aires'
        ],
        correct: 2,
        explanation: 'The text defines milongas as "los salones de baile tradicionales".'
      },
      {
        prompt: '¿Qué hizo la UNESCO en 2009?',
        options: [
          'Prohibió el tango',
          'Creó un museo del tango',
          'Declaró el tango Patrimonio Cultural Inmaterial',
          'Organizó un festival de tango'
        ],
        correct: 2,
        explanation: 'The text says the UNESCO "declaró el tango Patrimonio Cultural Inmaterial de la Humanidad".'
      },
      {
        prompt: 'Según el texto, ¿qué representa el tango para los argentinos?',
        options: [
          'Solo un baile divertido',
          'Una forma de expresar emociones profundas',
          'Un negocio turístico',
          'Una tradición antigua sin importancia'
        ],
        correct: 1,
        explanation: 'The text says it is "una forma de expresar emociones profundas como la nostalgia y el amor".'
      }
    ]
  },

  {
    id: 'read-17',
    level: 'B1',
    title: 'La comida rápida y la salud',
    titleEn: 'Fast Food and Health',
    text: 'En los últimos años, la comida rápida se ha hecho muy popular en muchos países hispanohablantes. Cada vez hay más restaurantes de hamburguesas y pizzerías en las ciudades grandes. Algunos expertos creen que esto está cambiando los hábitos alimenticios de la población, especialmente de los jóvenes. La dieta mediterránea, que incluye aceite de oliva, pescado, frutas y verduras, ha sido siempre la base de la alimentación en España. Sin embargo, muchos jóvenes prefieren comer comida rápida porque es barata y conveniente. Los médicos advierten que comer demasiada comida rápida puede causar problemas de salud como la obesidad y las enfermedades del corazón. Por eso, muchos colegios están empezando a ofrecer clases de nutrición para enseñar a los niños la importancia de una dieta equilibrada.',
    vocab: [
      { word: 'hábitos alimenticios', english: 'eating habits' },
      { word: 'aceite de oliva', english: 'olive oil' },
      { word: 'advierten', english: 'they warn' },
      { word: 'obesidad', english: 'obesity' },
      { word: 'equilibrada', english: 'balanced' }
    ],
    questions: [
      {
        prompt: '¿Qué incluye la dieta mediterránea?',
        options: [
          'Hamburguesas y pizza',
          'Aceite de oliva, pescado, frutas y verduras',
          'Solo carne y arroz',
          'Comida rápida y refrescos'
        ],
        correct: 1,
        explanation: 'The text says the Mediterranean diet "incluye aceite de oliva, pescado, frutas y verduras".'
      },
      {
        prompt: '¿Por qué prefieren los jóvenes la comida rápida?',
        options: [
          'Porque es más sana',
          'Porque es más sabrosa',
          'Porque es barata y conveniente',
          'Porque sus padres la compran'
        ],
        correct: 2,
        explanation: 'The text says young people prefer it "porque es barata y conveniente".'
      },
      {
        prompt: '¿Qué están haciendo algunos colegios?',
        options: [
          'Prohibiendo la comida rápida',
          'Ofreciendo clases de nutrición',
          'Cerrando las cafeterías',
          'Cocinando comida mediterránea'
        ],
        correct: 1,
        explanation: 'The text says "muchos colegios están empezando a ofrecer clases de nutrición".'
      },
      {
        prompt: '¿Cuál es la idea principal del texto?',
        options: [
          'La comida española es la mejor del mundo',
          'La comida rápida está cambiando los hábitos y afectando la salud',
          'Los restaurantes de comida rápida son baratos',
          'Los médicos no saben nada de nutrición'
        ],
        correct: 1,
        explanation: 'The main idea is that fast food is changing eating habits and doctors warn about health consequences.'
      }
    ]
  },

  {
    id: 'read-18',
    level: 'B1',
    title: 'Trabajar desde casa',
    titleEn: 'Working from Home',
    text: 'Desde la pandemia, el teletrabajo se ha convertido en algo normal para millones de personas. Muchas empresas españolas han descubierto que sus empleados pueden ser igual de productivos trabajando desde casa. Sin embargo, no todo el mundo está de acuerdo. Algunos trabajadores dicen que echan de menos el contacto con sus compañeros y que les resulta difícil separar la vida personal de la profesional. Otros, en cambio, prefieren trabajar desde casa porque ahorran tiempo en el transporte y pueden pasar más tiempo con su familia. Las empresas también se benefician porque necesitan oficinas más pequeñas. Muchos expertos opinan que el futuro será un modelo híbrido, en el que los empleados trabajen algunos días en la oficina y otros desde casa. Lo que está claro es que la forma de trabajar ha cambiado para siempre.',
    vocab: [
      { word: 'teletrabajo', english: 'remote work / telework' },
      { word: 'productivos', english: 'productive' },
      { word: 'echan de menos', english: 'they miss' },
      { word: 'ahorran', english: 'they save' },
      { word: 'modelo híbrido', english: 'hybrid model' }
    ],
    questions: [
      {
        prompt: '¿Qué evento impulsó el teletrabajo?',
        options: [
          'Una nueva ley',
          'La pandemia',
          'Una huelga',
          'El cambio climático'
        ],
        correct: 1,
        explanation: 'The text says "desde la pandemia, el teletrabajo se ha convertido en algo normal".'
      },
      {
        prompt: '¿Qué echan de menos algunos trabajadores?',
        options: [
          'El sueldo',
          'La comida de la oficina',
          'El contacto con sus compañeros',
          'Las vacaciones'
        ],
        correct: 2,
        explanation: 'The text says "echan de menos el contacto con sus compañeros".'
      },
      {
        prompt: '¿Qué ventaja tiene el teletrabajo para las empresas?',
        options: [
          'Los empleados trabajan más horas',
          'No necesitan pagar sueldos',
          'Necesitan oficinas más pequeñas',
          'No necesitan ordenadores'
        ],
        correct: 2,
        explanation: 'The text says "las empresas también se benefician porque necesitan oficinas más pequeñas".'
      },
      {
        prompt: '¿Qué predicen los expertos sobre el futuro?',
        options: [
          'Todos trabajarán en oficinas',
          'Todos trabajarán desde casa',
          'Un modelo híbrido',
          'Las oficinas desaparecerán'
        ],
        correct: 2,
        explanation: 'The text says "el futuro será un modelo híbrido".'
      }
    ]
  },

  {
    id: 'read-19',
    level: 'B1',
    title: 'El Camino de Santiago',
    titleEn: 'The Way of Saint James',
    text: 'El Camino de Santiago es una ruta de peregrinación que termina en la catedral de Santiago de Compostela, en el noroeste de España. Cada año, miles de personas de todo el mundo recorren esta ruta a pie, en bicicleta o incluso a caballo. La ruta más popular, el Camino Francés, tiene casi ochocientos kilómetros y empieza en la frontera con Francia. Los peregrinos suelen caminar entre veinticinco y treinta kilómetros al día y duermen en albergues. Aunque históricamente era una peregrinación religiosa, hoy muchas personas lo hacen por razones diferentes: algunos buscan una experiencia deportiva, otros quieren desconectar de la rutina diaria, y muchos simplemente quieren conocer gente nueva y disfrutar del paisaje español. Al llegar a Santiago, los peregrinos reciben la Compostela, un certificado oficial.',
    vocab: [
      { word: 'peregrinación', english: 'pilgrimage' },
      { word: 'recorren', english: 'they travel / walk' },
      { word: 'frontera', english: 'border' },
      { word: 'albergues', english: 'hostels / shelters' },
      { word: 'desconectar', english: 'to disconnect / unwind' }
    ],
    questions: [
      {
        prompt: '¿Dónde termina el Camino de Santiago?',
        options: [
          'En Madrid',
          'En Barcelona',
          'En Santiago de Compostela',
          'En Francia'
        ],
        correct: 2,
        explanation: 'The text says it "termina en la catedral de Santiago de Compostela".'
      },
      {
        prompt: '¿Cuántos kilómetros tiene el Camino Francés?',
        options: [
          'Unos doscientos',
          'Unos quinientos',
          'Casi ochocientos',
          'Más de mil'
        ],
        correct: 2,
        explanation: 'The text says it "tiene casi ochocientos kilómetros".'
      },
      {
        prompt: '¿Qué reciben los peregrinos al llegar a Santiago?',
        options: [
          'Un trofeo',
          'Dinero',
          'La Compostela',
          'Una medalla de oro'
        ],
        correct: 2,
        explanation: 'The text says "los peregrinos reciben la Compostela, un certificado oficial".'
      },
      {
        prompt: '¿Por qué hacen el Camino las personas hoy en día?',
        options: [
          'Solo por religión',
          'Solo por deporte',
          'Por razones diversas: deporte, desconectar, conocer gente',
          'Porque es obligatorio'
        ],
        correct: 2,
        explanation: 'The text lists multiple reasons: sport, disconnecting from routine, meeting new people, and enjoying the scenery.'
      }
    ]
  },

  {
    id: 'read-20',
    level: 'B1',
    title: 'Las redes sociales',
    titleEn: 'Social Media',
    text: 'Las redes sociales han transformado la manera en que nos comunicamos. En España, más del ochenta por ciento de los jóvenes entre dieciocho y treinta años las usan todos los días. Plataformas como Instagram y TikTok son especialmente populares entre los adolescentes. Por un lado, las redes sociales permiten mantener el contacto con amigos y familiares que viven lejos. También son útiles para buscar información y seguir las noticias. Por otro lado, algunos psicólogos están preocupados porque pasan demasiado tiempo frente a la pantalla. Estudios recientes muestran que el uso excesivo de redes sociales puede causar ansiedad y problemas de autoestima, sobre todo cuando los jóvenes se comparan constantemente con otras personas. Varios países europeos están debatiendo nuevas leyes para regular el acceso de los menores a estas plataformas.',
    vocab: [
      { word: 'redes sociales', english: 'social media / social networks' },
      { word: 'pantalla', english: 'screen' },
      { word: 'autoestima', english: 'self-esteem' },
      { word: 'se comparan', english: 'they compare themselves' },
      { word: 'menores', english: 'minors / young people' }
    ],
    questions: [
      {
        prompt: '¿Qué porcentaje de jóvenes españoles usan redes sociales cada día?',
        options: [
          'Más del cincuenta por ciento',
          'Más del sesenta por ciento',
          'Más del ochenta por ciento',
          'El cien por ciento'
        ],
        correct: 2,
        explanation: 'The text says "más del ochenta por ciento de los jóvenes" use them daily.'
      },
      {
        prompt: '¿Qué problemas puede causar el uso excesivo de redes sociales?',
        options: [
          'Problemas de vista',
          'Ansiedad y problemas de autoestima',
          'Dolor de cabeza',
          'Problemas económicos'
        ],
        correct: 1,
        explanation: 'The text says it "puede causar ansiedad y problemas de autoestima".'
      },
      {
        prompt: '¿Qué ventaja tienen las redes sociales según el texto?',
        options: [
          'Ayudan a ganar dinero',
          'Permiten mantener el contacto con personas que viven lejos',
          'Son buenas para la salud',
          'Ayudan a estudiar mejor'
        ],
        correct: 1,
        explanation: 'The text says they "permiten mantener el contacto con amigos y familiares que viven lejos".'
      },
      {
        prompt: '¿Qué están debatiendo algunos países europeos?',
        options: [
          'Prohibir internet',
          'Crear redes sociales propias',
          'Nuevas leyes para regular el acceso de menores',
          'Cerrar todas las plataformas'
        ],
        correct: 2,
        explanation: 'The text says countries are "debatiendo nuevas leyes para regular el acceso de los menores".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  B2  —  Complex sentences, subjunctive, abstract (160-200 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-21',
    level: 'B2',
    title: 'La inteligencia artificial y el empleo',
    titleEn: 'Artificial Intelligence and Employment',
    text: 'La inteligencia artificial está revolucionando el mercado laboral a un ritmo sin precedentes. Aunque muchos temen que la automatización destruya millones de empleos, otros expertos sostienen que también creará nuevas profesiones que hoy ni siquiera podemos imaginar. Es probable que los trabajos más afectados sean aquellos que implican tareas repetitivas, como la introducción de datos o la atención al cliente básica. Sin embargo, las profesiones que requieren creatividad, empatía y pensamiento crítico seguirán siendo fundamentalmente humanas. Lo que preocupa a los sociólogos no es solo la pérdida de empleos, sino el aumento de la desigualdad entre quienes sepan adaptarse a las nuevas tecnologías y quienes no tengan acceso a la formación necesaria. Para que la transición sea justa, los gobiernos deberían invertir en programas de reciclaje profesional y garantizar que los beneficios de la inteligencia artificial se distribuyan de manera equitativa en toda la sociedad.',
    vocab: [
      { word: 'mercado laboral', english: 'job market / labor market' },
      { word: 'sin precedentes', english: 'unprecedented' },
      { word: 'desigualdad', english: 'inequality' },
      { word: 'reciclaje profesional', english: 'professional retraining' },
      { word: 'equitativa', english: 'equitable / fair' }
    ],
    questions: [
      {
        prompt: '¿Qué tipo de trabajos serán más afectados según el texto?',
        options: [
          'Los creativos',
          'Los que implican tareas repetitivas',
          'Los que requieren empatía',
          'Los de pensamiento crítico'
        ],
        correct: 1,
        explanation: 'The text says "los trabajos más afectados sean aquellos que implican tareas repetitivas".'
      },
      {
        prompt: '¿Qué preocupa a los sociólogos?',
        options: [
          'Que los robots sean peligrosos',
          'El aumento de la desigualdad',
          'La falta de tecnología',
          'Que no haya suficientes programadores'
        ],
        correct: 1,
        explanation: 'The text says what worries them is "el aumento de la desigualdad" between those who can adapt and those who cannot.'
      },
      {
        prompt: '¿Qué deberían hacer los gobiernos según el texto?',
        options: [
          'Prohibir la inteligencia artificial',
          'Ignorar el problema',
          'Invertir en reciclaje profesional y distribuir los beneficios equitativamente',
          'Crear más empleos en fábricas'
        ],
        correct: 2,
        explanation: 'The text says governments "deberían invertir en programas de reciclaje profesional y garantizar que los beneficios se distribuyan de manera equitativa".'
      },
      {
        prompt: '¿Cuál es la postura del texto respecto a la IA?',
        options: [
          'Completamente a favor',
          'Completamente en contra',
          'Equilibrada: reconoce riesgos y oportunidades',
          'Indiferente'
        ],
        correct: 2,
        explanation: 'The text presents both fears about job loss and optimism about new professions, advocating for a fair transition.'
      }
    ]
  },

  {
    id: 'read-22',
    level: 'B2',
    title: 'Frida Kahlo: arte y dolor',
    titleEn: 'Frida Kahlo: Art and Pain',
    text: 'Frida Kahlo es una de las artistas más reconocidas del siglo XX, pero su camino hacia la fama no fue fácil. A los dieciocho años sufrió un gravísimo accidente de autobús que la dejó con lesiones permanentes en la columna vertebral y la pelvis. Durante su larga recuperación, empezó a pintar autorretratos que reflejaban tanto su dolor físico como su mundo interior. Su obra se caracteriza por una mezcla única de simbolismo, surrealismo y elementos de la cultura popular mexicana. Aunque durante mucho tiempo fue conocida principalmente como la esposa del muralista Diego Rivera, hoy se reconoce que su contribución artística fue independiente y profundamente original. Sus pinturas exploran temas universales como la identidad, el sufrimiento y la resistencia. Es significativo que Frida haya dicho una vez: "Pinto mi propia realidad." Actualmente, su imagen trasciende el mundo del arte y se ha convertido en un símbolo feminista y de orgullo cultural mexicano.',
    vocab: [
      { word: 'lesiones', english: 'injuries' },
      { word: 'columna vertebral', english: 'spine' },
      { word: 'autorretratos', english: 'self-portraits' },
      { word: 'sufrimiento', english: 'suffering' },
      { word: 'trasciende', english: 'transcends / goes beyond' }
    ],
    questions: [
      {
        prompt: '¿Qué evento cambió la vida de Frida a los dieciocho años?',
        options: [
          'Su matrimonio con Diego Rivera',
          'Un accidente de autobús',
          'Un viaje a Europa',
          'La muerte de su padre'
        ],
        correct: 1,
        explanation: 'The text says "a los dieciocho años sufrió un gravísimo accidente de autobús".'
      },
      {
        prompt: '¿Qué caracteriza la obra de Frida Kahlo?',
        options: [
          'Paisajes realistas',
          'Retratos de personas famosas',
          'Simbolismo, surrealismo y cultura popular mexicana',
          'Arte abstracto moderno'
        ],
        correct: 2,
        explanation: 'The text says her work "se caracteriza por una mezcla única de simbolismo, surrealismo y elementos de la cultura popular mexicana".'
      },
      {
        prompt: '¿Qué significa la cita "Pinto mi propia realidad"?',
        options: [
          'Que solo pintaba cosas reales',
          'Que su arte reflejaba su experiencia personal',
          'Que no le gustaba la fantasía',
          'Que copiaba el estilo de otros artistas'
        ],
        correct: 1,
        explanation: 'In context, the quote means her art was deeply personal, reflecting her own lived experience and inner world.'
      },
      {
        prompt: '¿En qué se ha convertido la imagen de Frida hoy en día?',
        options: [
          'En un producto comercial sin significado',
          'En un símbolo feminista y de orgullo cultural mexicano',
          'En un recuerdo del pasado',
          'En un ejemplo de arte europeo'
        ],
        correct: 1,
        explanation: 'The text says "se ha convertido en un símbolo feminista y de orgullo cultural mexicano".'
      },
      {
        prompt: '¿Qué se puede inferir sobre la relación artística entre Frida y Diego Rivera?',
        options: [
          'Ella era mejor artista que él',
          'Él la ayudó a pintar',
          'Su contribución fue independiente de la de Rivera',
          'Pintaban juntos'
        ],
        correct: 2,
        explanation: 'The text says "hoy se reconoce que su contribución artística fue independiente y profundamente original".'
      }
    ]
  },

  {
    id: 'read-23',
    level: 'B2',
    title: 'El bilingüismo en España',
    titleEn: 'Bilingualism in Spain',
    text: 'España es un país con una extraordinaria diversidad lingüística. Además del castellano, lengua oficial del Estado, existen otras lenguas cooficiales en diversas comunidades autónomas: el catalán en Cataluña, las Islas Baleares y la Comunidad Valenciana; el gallego en Galicia; y el euskera en el País Vasco y parte de Navarra. Esta riqueza lingüística es a menudo motivo de orgullo, pero también genera debates políticos intensos. Hay quienes defienden que la educación debería realizarse exclusivamente en castellano para garantizar la igualdad de oportunidades, mientras que otros consideran fundamental que los niños aprendan en su lengua materna regional para preservar la identidad cultural. Lo cierto es que los estudios demuestran que el bilingüismo ofrece ventajas cognitivas significativas, como una mayor flexibilidad mental y mejores habilidades para resolver problemas. El desafío está en encontrar un equilibrio que respete tanto la diversidad como la cohesión social del país.',
    vocab: [
      { word: 'cooficiales', english: 'co-official' },
      { word: 'comunidades autónomas', english: 'autonomous regions' },
      { word: 'lengua materna', english: 'mother tongue' },
      { word: 'preservar', english: 'to preserve' },
      { word: 'cohesión', english: 'cohesion / unity' }
    ],
    questions: [
      {
        prompt: '¿Cuántas lenguas cooficiales se mencionan en el texto?',
        options: ['Dos', 'Tres', 'Cuatro', 'Cinco'],
        correct: 1,
        explanation: 'The text mentions three co-official languages: catalán, gallego, and euskera.'
      },
      {
        prompt: '¿Dónde se habla euskera?',
        options: [
          'En Cataluña y Baleares',
          'En Galicia',
          'En el País Vasco y parte de Navarra',
          'En la Comunidad Valenciana'
        ],
        correct: 2,
        explanation: 'The text says "el euskera en el País Vasco y parte de Navarra".'
      },
      {
        prompt: '¿Qué ventajas ofrece el bilingüismo según los estudios?',
        options: [
          'Mejores notas en el colegio',
          'Mayor flexibilidad mental y mejores habilidades para resolver problemas',
          'Más oportunidades de trabajo',
          'Mejor pronunciación'
        ],
        correct: 1,
        explanation: 'The text says bilingualism offers "mayor flexibilidad mental y mejores habilidades para resolver problemas".'
      },
      {
        prompt: '¿Cuál es el desafío principal según el texto?',
        options: [
          'Eliminar las lenguas regionales',
          'Enseñar solo castellano',
          'Encontrar un equilibrio entre diversidad y cohesión social',
          'Que todos hablen inglés'
        ],
        correct: 2,
        explanation: 'The text concludes that the challenge is "encontrar un equilibrio que respete tanto la diversidad como la cohesión social".'
      }
    ]
  },

  {
    id: 'read-24',
    level: 'B2',
    title: 'El cambio climático y Latinoamérica',
    titleEn: 'Climate Change and Latin America',
    text: 'América Latina es una de las regiones más vulnerables al cambio climático, a pesar de que contribuye relativamente poco a las emisiones globales de gases de efecto invernadero. El aumento de las temperaturas está provocando el deshielo acelerado de los glaciares andinos, lo cual amenaza el suministro de agua dulce de millones de personas. En la Amazonía, la deforestación y las sequías cada vez más frecuentes están debilitando la capacidad del bosque tropical para absorber dióxido de carbono. Los fenómenos meteorológicos extremos, como huracanes más potentes en el Caribe y lluvias torrenciales en Centroamérica, afectan desproporcionadamente a las comunidades más pobres. Es imprescindible que los gobiernos latinoamericanos adopten políticas de adaptación que protejan a estas poblaciones vulnerables. Algunos países, como Costa Rica, ya están liderando iniciativas de energía renovable y conservación de bosques, demostrando que es posible combinar el desarrollo económico con la sostenibilidad ambiental.',
    vocab: [
      { word: 'emisiones', english: 'emissions' },
      { word: 'deshielo', english: 'melting / thawing' },
      { word: 'sequías', english: 'droughts' },
      { word: 'imprescindible', english: 'essential / indispensable' },
      { word: 'sostenibilidad', english: 'sustainability' }
    ],
    questions: [
      {
        prompt: '¿Por qué se están derritiendo los glaciares andinos?',
        options: [
          'Por la contaminación del agua',
          'Por el aumento de las temperaturas',
          'Por la deforestación',
          'Por la actividad volcánica'
        ],
        correct: 1,
        explanation: 'The text says "el aumento de las temperaturas está provocando el deshielo acelerado de los glaciares".'
      },
      {
        prompt: '¿Qué está debilitando la Amazonía?',
        options: [
          'La minería y la agricultura',
          'La deforestación y las sequías',
          'Los huracanes',
          'La urbanización'
        ],
        correct: 1,
        explanation: 'The text says "la deforestación y las sequías cada vez más frecuentes están debilitando" the rainforest.'
      },
      {
        prompt: '¿Qué país se menciona como ejemplo positivo?',
        options: ['Brasil', 'México', 'Colombia', 'Costa Rica'],
        correct: 3,
        explanation: 'The text says "Costa Rica ya está liderando iniciativas de energía renovable y conservación de bosques".'
      },
      {
        prompt: '¿Cuál es la paradoja que plantea el texto sobre Latinoamérica?',
        options: [
          'Tiene muchos recursos pero es pobre',
          'Es muy vulnerable al cambio climático pero contribuye poco a las emisiones',
          'Tiene bosques pero no los usa',
          'Es grande pero tiene poca población'
        ],
        correct: 1,
        explanation: 'The text highlights that Latin America "es una de las regiones más vulnerables" despite contributing "relativamente poco a las emisiones globales".'
      },
      {
        prompt: '¿Qué significa "imprescindible" en el contexto del texto?',
        options: [
          'Opcional',
          'Imposible',
          'Absolutamente necesario',
          'Interesante'
        ],
        correct: 2,
        explanation: 'In context, "imprescindible" means essential or absolutely necessary — the governments must adopt adaptation policies.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C1  —  Nuanced arguments, formal register (200-250 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-25',
    level: 'C1',
    title: 'La memoria histórica en España',
    titleEn: 'Historical Memory in Spain',
    text: 'La cuestión de la memoria histórica sigue siendo uno de los temas más delicados y divisivos de la sociedad española contemporánea. Tras la muerte de Franco en 1975, la llamada Transición democrática se fundamentó en un pacto tácito de silencio sobre los crímenes cometidos durante la Guerra Civil y la posterior dictadura. Durante décadas, este acuerdo no escrito permitió una convivencia relativamente pacífica, pero dejó sin resolver heridas profundas en miles de familias. La Ley de Memoria Histórica de 2007, y su actualización en 2022 con la Ley de Memoria Democrática, intentaron abordar este vacío exigiendo la localización de fosas comunes y la retirada de símbolos franquistas de los espacios públicos. Los defensores de estas leyes argumentan que no puede haber verdadera reconciliación sin justicia ni reconocimiento de las víctimas. Los detractores, por su parte, consideran que reabrir el pasado amenaza la convivencia y que sería más prudente mirar hacia el futuro. Lo que resulta innegable es que cualquier democracia madura debe ser capaz de examinar su historia con honestidad, por incómodo que resulte, pues la amnesia colectiva rara vez conduce a una paz duradera.',
    vocab: [
      { word: 'pacto tácito', english: 'tacit / unspoken agreement' },
      { word: 'fosas comunes', english: 'mass graves' },
      { word: 'reconciliación', english: 'reconciliation' },
      { word: 'detractores', english: 'critics / opponents' },
      { word: 'amnesia colectiva', english: 'collective amnesia / forgetting' }
    ],
    questions: [
      {
        prompt: '¿En qué se basó la Transición democrática española?',
        options: [
          'En un juicio a los responsables',
          'En un pacto tácito de silencio',
          'En una constitución nueva',
          'En la intervención internacional'
        ],
        correct: 1,
        explanation: 'The text says the transition "se fundamentó en un pacto tácito de silencio sobre los crímenes cometidos".'
      },
      {
        prompt: '¿Qué exige la Ley de Memoria Histórica?',
        options: [
          'Juzgar a los responsables vivos',
          'Localizar fosas comunes y retirar símbolos franquistas',
          'Cerrar los archivos del franquismo',
          'Construir monumentos nuevos'
        ],
        correct: 1,
        explanation: 'The text says the law demands "la localización de fosas comunes y la retirada de símbolos franquistas".'
      },
      {
        prompt: '¿Qué argumento usan los detractores de estas leyes?',
        options: [
          'Que son inconstitucionales',
          'Que cuestan demasiado dinero',
          'Que reabrir el pasado amenaza la convivencia',
          'Que Franco fue un buen líder'
        ],
        correct: 2,
        explanation: 'The text says detractors "consideran que reabrir el pasado amenaza la convivencia".'
      },
      {
        prompt: '¿Cuál es la conclusión del autor?',
        options: [
          'Es mejor olvidar el pasado',
          'La Transición fue perfecta',
          'Una democracia madura debe examinar su historia con honestidad',
          'Las leyes de memoria son innecesarias'
        ],
        correct: 2,
        explanation: 'The text concludes that "cualquier democracia madura debe ser capaz de examinar su historia con honestidad".'
      },
      {
        prompt: '¿Qué implica la expresión "amnesia colectiva" en el contexto del texto?',
        options: [
          'Una enfermedad mental de la población',
          'La decisión deliberada de una sociedad de no confrontar su pasado',
          'La pérdida de archivos históricos',
          'La ignorancia de los jóvenes sobre la historia'
        ],
        correct: 1,
        explanation: 'In context, "amnesia colectiva" refers to society\'s deliberate avoidance of confronting uncomfortable historical truths, which the author argues rarely leads to lasting peace.'
      }
    ]
  },

  {
    id: 'read-26',
    level: 'C1',
    title: 'El realismo mágico latinoamericano',
    titleEn: 'Latin American Magical Realism',
    text: 'El realismo mágico constituye una de las aportaciones más singulares de la literatura latinoamericana al panorama mundial. Aunque a menudo se atribuye su origen exclusivamente a Gabriel García Márquez y su obra cumbre "Cien años de soledad", lo cierto es que este movimiento tiene raíces mucho más profundas que se remontan a las tradiciones orales indígenas y a la cosmovisión de los pueblos precolombinos, donde lo sobrenatural y lo cotidiano coexistían sin contradicción alguna. Lo que distingue al realismo mágico de la fantasía convencional es precisamente su tratamiento de lo extraordinario: los acontecimientos mágicos se narran con la misma naturalidad y minuciosidad que los hechos ordinarios, sin que los personajes muestren sorpresa ni los cuestionen. Esta técnica narrativa no es un mero recurso estético, sino que refleja una forma genuina de percibir la realidad arraigada en la experiencia cultural latinoamericana. Autores como Juan Rulfo, Alejo Carpentier e Isabel Allende han enriquecido esta tradición con perspectivas diversas. Resulta significativo que este estilo haya ejercido una influencia profunda en escritores de otros continentes, desde Salman Rushdie hasta Haruki Murakami, lo que demuestra su alcance universal.',
    vocab: [
      { word: 'aportaciones', english: 'contributions' },
      { word: 'cosmovisión', english: 'worldview' },
      { word: 'minuciosidad', english: 'meticulousness / thoroughness' },
      { word: 'arraigada', english: 'rooted / ingrained' },
      { word: 'alcance', english: 'reach / scope' }
    ],
    questions: [
      {
        prompt: '¿Cuáles son las verdaderas raíces del realismo mágico según el texto?',
        options: [
          'La literatura europea del siglo XIX',
          'Las tradiciones orales indígenas y la cosmovisión precolombina',
          'La obra de García Márquez exclusivamente',
          'El surrealismo francés'
        ],
        correct: 1,
        explanation: 'The text says its roots "se remontan a las tradiciones orales indígenas y a la cosmovisión de los pueblos precolombinos".'
      },
      {
        prompt: '¿Qué distingue al realismo mágico de la fantasía convencional?',
        options: [
          'Usa más magia',
          'Los acontecimientos mágicos se narran con naturalidad, sin que los personajes se sorprendan',
          'Tiene finales felices',
          'Se desarrolla en mundos imaginarios'
        ],
        correct: 1,
        explanation: 'The text says what distinguishes it is that "los acontecimientos mágicos se narran con la misma naturalidad" and characters do not question them.'
      },
      {
        prompt: '¿Qué función cumple el realismo mágico según el autor?',
        options: [
          'Es solo un recurso decorativo',
          'Sirve para entretener a los niños',
          'Refleja una forma genuina de percibir la realidad en la cultura latinoamericana',
          'Critica la religión católica'
        ],
        correct: 2,
        explanation: 'The text says this technique "refleja una forma genuina de percibir la realidad arraigada en la experiencia cultural latinoamericana".'
      },
      {
        prompt: '¿Qué demuestra la influencia del realismo mágico en escritores de otros continentes?',
        options: [
          'Que la literatura latinoamericana es mejor',
          'Su alcance universal',
          'Que otros escritores copian a García Márquez',
          'Que todos los escritores usan magia'
        ],
        correct: 1,
        explanation: 'The text says this influence "demuestra su alcance universal".'
      },
      {
        prompt: '¿Qué significa "arraigada" en el contexto del texto?',
        options: [
          'Eliminada',
          'Profundamente establecida y conectada',
          'Reciente',
          'Superficial'
        ],
        correct: 1,
        explanation: '"Arraigada" means deeply rooted or ingrained — the magical realist perception of reality is deeply embedded in Latin American cultural experience.'
      }
    ]
  },

  {
    id: 'read-27',
    level: 'C1',
    title: 'La economía informal en Latinoamérica',
    titleEn: 'The Informal Economy in Latin America',
    text: 'La economía informal representa aproximadamente el cuarenta por ciento del PIB de América Latina, una cifra que pone de manifiesto la magnitud de un fenómeno que afecta a más de ciento treinta millones de trabajadores en la región. Lejos de ser simplemente una anomalía del subdesarrollo, la informalidad constituye un complejo entramado de actividades económicas que van desde la venta ambulante hasta pequeños talleres manufactureros no registrados. Las causas son múltiples y están profundamente interrelacionadas: una regulación laboral excesivamente rígida que desincentiva la contratación formal, sistemas tributarios percibidos como injustos, barreras burocráticas para la creación de empresas y, fundamentalmente, una desigualdad estructural que empuja a amplios sectores de la población hacia la subsistencia. Los intentos de formalización mediante incentivos fiscales y simplificación administrativa han tenido resultados desiguales. Mientras que países como Chile y Uruguay han logrado avances significativos, otros se enfrentan a una informalidad arraigada que se perpetúa de generación en generación. Lo que parece claro es que cualquier estrategia efectiva debe ir más allá de la mera persecución punitiva y abordar las causas estructurales que originan el problema, ofreciendo al mismo tiempo protección social a quienes trabajan en condiciones precarias.',
    vocab: [
      { word: 'PIB', english: 'GDP (Gross Domestic Product)' },
      { word: 'entramado', english: 'web / network / framework' },
      { word: 'desincentiva', english: 'discourages / disincentivizes' },
      { word: 'tributarios', english: 'tax-related' },
      { word: 'punitiva', english: 'punitive / focused on punishment' }
    ],
    questions: [
      {
        prompt: '¿Qué porcentaje del PIB latinoamericano representa la economía informal?',
        options: [
          'El veinte por ciento',
          'El treinta por ciento',
          'El cuarenta por ciento',
          'El cincuenta por ciento'
        ],
        correct: 2,
        explanation: 'The text says the informal economy "representa aproximadamente el cuarenta por ciento del PIB".'
      },
      {
        prompt: '¿Cuál de las siguientes NO se menciona como causa de la informalidad?',
        options: [
          'Regulación laboral rígida',
          'Sistemas tributarios injustos',
          'La falta de educación',
          'Barreras burocráticas'
        ],
        correct: 2,
        explanation: 'The text mentions rigid regulations, unfair tax systems, bureaucratic barriers, and structural inequality, but does not specifically list lack of education.'
      },
      {
        prompt: '¿Qué países han logrado avances en la formalización?',
        options: [
          'Brasil y Argentina',
          'México y Colombia',
          'Chile y Uruguay',
          'Perú y Bolivia'
        ],
        correct: 2,
        explanation: 'The text says "Chile y Uruguay han logrado avances significativos".'
      },
      {
        prompt: '¿Qué enfoque recomienda el texto para combatir la informalidad?',
        options: [
          'Mayor vigilancia policial',
          'Abordar las causas estructurales y ofrecer protección social',
          'Eliminar todos los impuestos',
          'Cerrar los negocios informales'
        ],
        correct: 1,
        explanation: 'The text says effective strategy must "abordar las causas estructurales" and offer "protección social a quienes trabajan en condiciones precarias".'
      },
      {
        prompt: '¿Qué implica el texto al decir que la informalidad no es "simplemente una anomalía del subdesarrollo"?',
        options: [
          'Que es algo positivo',
          'Que es un fenómeno más complejo con causas sistémicas múltiples',
          'Que desaparecerá con el desarrollo',
          'Que solo existe en países pobres'
        ],
        correct: 1,
        explanation: 'By rejecting the simple "anomaly" framing, the author signals that informality is a complex, systemic phenomenon with deep structural roots, not just a side effect of underdevelopment.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C2  —  Literary/academic, idiomatic, subtle (250-300 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-28',
    level: 'C2',
    title: 'Borges y los espejos del infinito',
    titleEn: 'Borges and the Mirrors of Infinity',
    text: 'La obra de Jorge Luis Borges constituye un laberinto intelectual en el que cada corredor desemboca, paradójicamente, en el mismo punto de partida. Sus relatos, aparentemente sencillos en su factura, encierran abismos filosóficos que han seducido por igual a lectores, matemáticos y filósofos. En "La biblioteca de Babel", Borges concibió un universo compuesto por hexágonos interminables que albergan todos los libros posibles: cada combinación concebible de letras ya existe en algún estante, lo cual convierte la búsqueda de sentido en una empresa simultáneamente fútil y sublime. Esta metáfora no solo anticipa las reflexiones contemporáneas sobre la sobrecarga informativa, sino que plantea una cuestión ontológica medular: si toda verdad ya está escrita en algún lugar, ¿qué papel le queda al pensamiento original? El genio borgeano radica en su capacidad para transformar paradojas abstractas en narraciones hipnóticas. Sus espejos, esos objetos que tanto le perturbaban y fascinaban, funcionan como emblema de toda su poética: reflejan la realidad multiplicándola hasta el vértigo. Borges desconfiaba de los espejos porque, según confesó, "multiplican el número de los hombres", sugiriendo que la reproducción infinita de la imagen disuelve la singularidad del ser. En última instancia, la escritura borgeana nos confronta con los límites mismos del lenguaje y la cognición humana, recordándonos que quizá habitemos una ficción más vasta de lo que nuestra presunción racionalista está dispuesta a admitir.',
    vocab: [
      { word: 'desemboca', english: 'leads to / opens onto' },
      { word: 'factura', english: 'craftsmanship / construction (literary)' },
      { word: 'fútil', english: 'futile / pointless' },
      { word: 'medular', english: 'core / fundamental' },
      { word: 'vértigo', english: 'vertigo / dizziness' }
    ],
    questions: [
      {
        prompt: '¿Por qué la búsqueda de sentido en "La biblioteca de Babel" es "simultáneamente fútil y sublime"?',
        options: [
          'Porque la biblioteca está vacía',
          'Porque todas las combinaciones posibles ya existen, haciendo la búsqueda inútil pero también magnífica en su alcance',
          'Porque nadie puede leer todos los libros',
          'Porque los libros están en idiomas desconocidos'
        ],
        correct: 1,
        explanation: 'Since every possible text already exists, searching for meaning is futile (it is already there somewhere) yet sublime in its infinite scope.'
      },
      {
        prompt: '¿Qué cuestión ontológica plantea la metáfora de la biblioteca?',
        options: [
          'Si los libros son importantes',
          'Si las bibliotecas deben ser públicas',
          'Qué papel le queda al pensamiento original si toda verdad ya está escrita',
          'Si es posible leer todos los libros del mundo'
        ],
        correct: 2,
        explanation: 'The text poses the question: "si toda verdad ya está escrita en algún lugar, ¿qué papel le queda al pensamiento original?"'
      },
      {
        prompt: '¿Por qué desconfiaba Borges de los espejos?',
        options: [
          'Porque le daban miedo los fantasmas',
          'Porque no le gustaba su apariencia',
          'Porque la multiplicación infinita de la imagen disuelve la singularidad del ser',
          'Porque eran símbolos de vanidad'
        ],
        correct: 2,
        explanation: 'Borges distrusted mirrors because they "multiplican el número de los hombres" — infinite reproduction dissolves the uniqueness of being.'
      },
      {
        prompt: '¿Qué sugiere la frase final sobre la "ficción más vasta"?',
        options: [
          'Que la literatura es mejor que la realidad',
          'Que quizá nuestra realidad misma sea una construcción ficcional más amplia de lo que aceptamos racionalmente',
          'Que Borges escribía ficción',
          'Que debemos leer más novelas'
        ],
        correct: 1,
        explanation: 'The closing suggests that we may inhabit a fiction larger than our rationalist assumptions allow us to acknowledge — a quintessentially Borgesian idea about the constructed nature of reality.'
      },
      {
        prompt: '¿Qué significa "factura" tal como se usa en el texto?',
        options: [
          'Una cuenta o recibo comercial',
          'La calidad artesanal o construcción formal de una obra literaria',
          'Un defecto de fabricación',
          'El precio de un libro'
        ],
        correct: 1,
        explanation: 'Here "factura" is used in its literary sense meaning craftsmanship or formal construction, not the commercial meaning of "invoice".'
      }
    ]
  },

  {
    id: 'read-29',
    level: 'C2',
    title: 'La crisis de las democracias liberales',
    titleEn: 'The Crisis of Liberal Democracies',
    text: 'Resulta tentador atribuir el deterioro de las democracias liberales a causas coyunturales —la irrupción de las redes sociales, el auge del populismo, la polarización mediática—, pero un análisis más riguroso revela fisuras estructurales que se han ido gestando a lo largo de décadas. La promesa implícita del contrato social democrático —que cada generación viviría mejor que la anterior— se ha quebrado para amplios sectores de la población que perciben, no sin razón, que las élites políticas y económicas operan en un circuito cerrado ajeno a sus preocupaciones. Esta fractura entre representantes y representados no es meramente retórica; se manifiesta en datos concretos de desigualdad creciente, precarización laboral y erosión de los servicios públicos. El fenómeno es particularmente agudo en el mundo hispanohablante, donde la fragilidad institucional se combina con herencias coloniales no resueltas y una desconfianza endémica hacia el Estado. Lo paradójico es que quienes más sufren las deficiencias del sistema democrático son a menudo quienes se ven seducidos por propuestas autoritarias que prometen soluciones expeditas a problemas complejos. Cabría preguntarse si la democracia, tal como la hemos concebido, no necesita reinventarse radicalmente para sobrevivir: no basta con celebrar elecciones periódicas si los mecanismos de participación ciudadana se reducen a depositar una papeleta cada cuatro años. La regeneración democrática exige una redistribución efectiva del poder, una transparencia institucional genuina y, sobre todo, la reconstrucción de un horizonte de expectativas compartido.',
    vocab: [
      { word: 'coyunturales', english: 'circumstantial / situational' },
      { word: 'se ha quebrado', english: 'has broken / shattered' },
      { word: 'precarización', english: 'increasing precariousness / instability' },
      { word: 'endémica', english: 'endemic / deeply ingrained' },
      { word: 'expeditas', english: 'expedient / quick' }
    ],
    questions: [
      {
        prompt: '¿Qué "promesa implícita" del contrato social se ha roto según el texto?',
        options: [
          'La promesa de libertad de expresión',
          'La promesa de que cada generación viviría mejor que la anterior',
          'La promesa de igualdad ante la ley',
          'La promesa de paz internacional'
        ],
        correct: 1,
        explanation: 'The text identifies the broken promise as "que cada generación viviría mejor que la anterior".'
      },
      {
        prompt: '¿Por qué es "paradójico" que los más afectados apoyen propuestas autoritarias?',
        options: [
          'Porque son más inteligentes',
          'Porque las propuestas autoritarias debilitarían aún más las protecciones democráticas que necesitan',
          'Porque no votan',
          'Porque no entienden la política'
        ],
        correct: 1,
        explanation: 'The paradox is that those suffering most from democratic deficiencies turn to authoritarian proposals that would likely worsen their situation by further eroding democratic protections.'
      },
      {
        prompt: '¿Qué distingue al mundo hispanohablante en este contexto?',
        options: [
          'Mayor estabilidad económica',
          'La combinación de fragilidad institucional, herencias coloniales y desconfianza hacia el Estado',
          'Una democracia más fuerte',
          'Menor desigualdad'
        ],
        correct: 1,
        explanation: 'The text says the Spanish-speaking world combines "fragilidad institucional con herencias coloniales no resueltas y una desconfianza endémica hacia el Estado".'
      },
      {
        prompt: '¿Qué critica el autor sobre la democracia actual?',
        options: [
          'Que hay demasiadas elecciones',
          'Que los partidos políticos son innecesarios',
          'Que la participación se reduce a votar cada cuatro años, lo cual es insuficiente',
          'Que la democracia es un sistema obsoleto'
        ],
        correct: 2,
        explanation: 'The author argues "no basta con celebrar elecciones periódicas si los mecanismos de participación ciudadana se reducen a depositar una papeleta cada cuatro años".'
      },
      {
        prompt: '¿Qué implica la expresión "circuito cerrado" referida a las élites?',
        options: [
          'Que trabajan en lugares seguros',
          'Que operan de manera aislada y autorreferencial, desconectadas de la ciudadanía',
          'Que usan circuitos electrónicos',
          'Que son un grupo pequeño'
        ],
        correct: 1,
        explanation: '"Circuito cerrado" metaphorically implies that political and economic elites operate in a self-contained, self-referential loop disconnected from the concerns of ordinary citizens.'
      }
    ]
  },

  {
    id: 'read-30',
    level: 'C2',
    title: 'La soledad contemporánea',
    titleEn: 'Contemporary Loneliness',
    text: 'Vivimos en la época más hiperconectada de la historia y, sin embargo, nunca antes la soledad había constituido un problema de salud pública de semejante envergadura. Esta aparente contradicción encierra una verdad incómoda sobre la naturaleza de los vínculos humanos en la modernidad tardía: la proliferación de conexiones digitales no equivale a la profundidad del encuentro genuino. El filósofo surcoreano Byung-Chul Han ha señalado que la sociedad contemporánea padece lo que él denomina "cansancio del yo", un agotamiento derivado de la autoexplotación constante a la que nos somete el imperativo de la productividad y la autooptimización perpetua. En este contexto, el otro deja de ser un interlocutor con quien construir sentido compartido y se convierte en un espejo que valida o amenaza nuestra frágil identidad digital. Las consecuencias son mensurables: la Organización Mundial de la Salud ha equiparado los efectos de la soledad crónica con los del tabaquismo, asociándola a un incremento del veintiséis por ciento en la mortalidad prematura. En el ámbito hispanohablante, donde tradicionalmente las redes familiares y comunitarias han actuado como amortiguadores sociales, la urbanización acelerada y la atomización de los hogares están erosionando estas estructuras protectoras. Quizá la pregunta más pertinente no sea cómo combatir la soledad con más tecnología, sino cómo recuperar la capacidad de estar verdaderamente presentes ante el otro, lo cual requiere una vulnerabilidad que nuestra cultura del rendimiento ha convertido en anatema.',
    vocab: [
      { word: 'envergadura', english: 'magnitude / scope' },
      { word: 'autoexplotación', english: 'self-exploitation' },
      { word: 'mensurables', english: 'measurable' },
      { word: 'amortiguadores', english: 'buffers / shock absorbers' },
      { word: 'anatema', english: 'anathema / something reviled' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la "aparente contradicción" que menciona el texto?',
        options: [
          'Que la tecnología es buena y mala a la vez',
          'Que estamos más conectados que nunca pero más solos que nunca',
          'Que los jóvenes no usan el teléfono para llamar',
          'Que la soledad es una enfermedad nueva'
        ],
        correct: 1,
        explanation: 'The paradox is being in "la época más hiperconectada de la historia" while loneliness has become an unprecedented public health crisis.'
      },
      {
        prompt: '¿Qué es el "cansancio del yo" según Byung-Chul Han?',
        options: [
          'El aburrimiento existencial',
          'Un agotamiento causado por la autoexplotación y el imperativo de productividad constante',
          'La falta de sueño por usar el móvil',
          'La depresión clínica'
        ],
        correct: 1,
        explanation: 'The text defines it as "un agotamiento derivado de la autoexplotación constante a la que nos somete el imperativo de la productividad y la autooptimización perpetua".'
      },
      {
        prompt: '¿Con qué compara la OMS los efectos de la soledad crónica?',
        options: [
          'Con la obesidad',
          'Con el alcoholismo',
          'Con el tabaquismo',
          'Con la contaminación'
        ],
        correct: 2,
        explanation: 'The text says the WHO "ha equiparado los efectos de la soledad crónica con los del tabaquismo".'
      },
      {
        prompt: '¿Qué función han cumplido tradicionalmente las redes familiares en el mundo hispanohablante?',
        options: [
          'Han generado dependencia',
          'Han actuado como amortiguadores sociales contra la soledad',
          'Han impedido la modernización',
          'Han sido la causa de la soledad'
        ],
        correct: 1,
        explanation: 'The text says "las redes familiares y comunitarias han actuado como amortiguadores sociales" in Hispanic cultures.'
      },
      {
        prompt: '¿Qué significa que la vulnerabilidad se ha convertido en "anatema"?',
        options: [
          'Que la vulnerabilidad es una enfermedad',
          'Que mostrarse vulnerable es considerado algo positivo',
          'Que la cultura del rendimiento ha hecho que la vulnerabilidad sea profundamente rechazada',
          'Que las personas vulnerables son más fuertes'
        ],
        correct: 2,
        explanation: '"Anatema" means something deeply reviled or rejected. The performance-driven culture has made genuine vulnerability — which is necessary for authentic human connection — into something people actively avoid and reject.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C1  —  Additional passages (200-250 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-31',
    level: 'C1',
    title: 'La arquitectura sostenible en Latinoamérica',
    titleEn: 'Sustainable Architecture in Latin America',
    text: 'En las últimas décadas, Latinoamérica se ha convertido en un laboratorio vivo de arquitectura sostenible. Arquitectos de México, Colombia, Chile y Brasil han empezado a recuperar técnicas constructivas autóctonas —como el uso de adobe, bambú y techos verdes— y a fusionarlas con tecnologías contemporáneas de eficiencia energética. El resultado es una corriente arquitectónica que no solo reduce la huella ecológica de los edificios, sino que también revaloriza el patrimonio cultural de las comunidades indígenas y rurales. En Oaxaca, por ejemplo, cooperativas de arquitectos jóvenes construyen viviendas con materiales vernáculos que regulan la temperatura interior sin necesidad de climatización artificial. En Medellín, los llamados "edificios verdes" incorporan jardines verticales y sistemas de captación de agua lluvia que disminuyen el consumo hídrico hasta en un cuarenta por ciento. No obstante, la sostenibilidad en la construcción enfrenta obstáculos significativos: la falta de normativas claras, el encarecimiento de ciertos materiales ecológicos y la resistencia de promotores inmobiliarios que priorizan la rentabilidad a corto plazo. Para que este movimiento alcance una escala transformadora, será imprescindible que los gobiernos establezcan incentivos fiscales y que las universidades integren la sostenibilidad como eje transversal en los programas de ingeniería y diseño. Solo así la arquitectura dejará de ser parte del problema climático para convertirse en parte de la solución.',
    vocab: [
      { word: 'sostenibilidad', english: 'sustainability' },
      { word: 'autóctono', english: 'indigenous / native' },
      { word: 'huella ecológica', english: 'ecological footprint' },
      { word: 'materiales vernáculos', english: 'vernacular / local materials' },
      { word: 'eficiencia energética', english: 'energy efficiency' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la idea principal del texto?',
        options: [
          'Que Latinoamérica tiene los mejores arquitectos del mundo',
          'Que la arquitectura sostenible en Latinoamérica combina técnicas ancestrales con tecnología moderna para reducir el impacto ambiental',
          'Que los materiales indígenas son superiores a los modernos',
          'Que los gobiernos latinoamericanos apoyan plenamente la arquitectura verde'
        ],
        correct: 1,
        explanation: 'The text argues that Latin American architects are fusing indigenous building techniques with modern sustainability technology to reduce the ecological footprint of buildings.'
      },
      {
        prompt: '¿Qué ejemplo concreto se da sobre Medellín?',
        options: [
          'Que se construyen casas de adobe',
          'Que los edificios verdes incorporan jardines verticales y sistemas de captación de agua lluvia',
          'Que hay cooperativas de arquitectos jóvenes',
          'Que se usa bambú en todas las construcciones'
        ],
        correct: 1,
        explanation: 'The text specifically mentions that in Medellín, "green buildings" incorporate vertical gardens and rainwater collection systems that reduce water consumption by up to forty percent.'
      },
      {
        prompt: '¿Qué significa "materiales vernáculos" en el contexto del texto?',
        options: [
          'Materiales importados de Europa',
          'Materiales de construcción muy caros',
          'Materiales locales y tradicionales de la región',
          'Materiales sintéticos modernos'
        ],
        correct: 2,
        explanation: 'In context, "materiales vernáculos" refers to local, traditional building materials like adobe and bamboo that naturally regulate interior temperature.'
      },
      {
        prompt: '¿Cuál de los siguientes NO se menciona como obstáculo para la arquitectura sostenible?',
        options: [
          'La falta de normativas claras',
          'La escasez de mano de obra cualificada',
          'El encarecimiento de ciertos materiales ecológicos',
          'La resistencia de promotores inmobiliarios'
        ],
        correct: 1,
        explanation: 'The text mentions lack of clear regulations, cost of ecological materials, and developer resistance, but never mentions a shortage of skilled labor.'
      },
      {
        prompt: '¿Qué se puede inferir sobre la postura del autor?',
        options: [
          'Es pesimista sobre el futuro de la arquitectura sostenible',
          'Considera que la arquitectura sostenible es una moda pasajera',
          'Es cautelosamente optimista, reconociendo avances pero también desafíos pendientes',
          'Cree que solo los gobiernos pueden resolver el problema climático'
        ],
        correct: 2,
        explanation: 'The author highlights promising examples but also acknowledges significant obstacles, concluding with a conditional statement about what is needed for the movement to achieve transformative scale — a cautiously optimistic stance.'
      }
    ]
  },

  {
    id: 'read-32',
    level: 'C1',
    title: 'El fenómeno de la posverdad',
    titleEn: 'The Post-Truth Phenomenon',
    text: 'El término "posverdad" fue elegido palabra del año en 2016 por el diccionario Oxford, y desde entonces no ha dejado de ganar relevancia. Se define como la circunstancia en la que los hechos objetivos tienen menos influencia en la opinión pública que las apelaciones a la emoción y las creencias personales. En la era digital, las redes sociales actúan como amplificadores de la desinformación: los algoritmos priorizan el contenido que genera mayor interacción, lo cual favorece los titulares sensacionalistas y las noticias falsas frente al análisis riguroso. Este mecanismo crea las llamadas "cámaras de eco", espacios virtuales donde los usuarios solo reciben información que confirma sus ideas previas, reforzando así el sesgo de confirmación. El resultado es una sociedad cada vez más polarizada, en la que el diálogo constructivo se vuelve casi imposible. Algunos expertos sostienen que la solución pasa por fomentar el pensamiento crítico desde la educación primaria, enseñando a los ciudadanos a verificar fuentes, contrastar datos y distinguir entre opinión y hecho. Otros abogan por una regulación más estricta de las plataformas digitales, obligándolas a etiquetar contenido no verificado y a reducir la viralización de la desinformación. Lo cierto es que, en un mundo donde cualquier persona puede difundir información a escala global con un solo clic, la responsabilidad individual y colectiva frente a la verdad se ha convertido en uno de los grandes desafíos de nuestro tiempo.',
    vocab: [
      { word: 'posverdad', english: 'post-truth' },
      { word: 'sesgo de confirmación', english: 'confirmation bias' },
      { word: 'desinformación', english: 'disinformation / misinformation' },
      { word: 'cámara de eco', english: 'echo chamber' },
      { word: 'pensamiento crítico', english: 'critical thinking' }
    ],
    questions: [
      {
        prompt: '¿Cómo define el texto la "posverdad"?',
        options: [
          'Como la mentira deliberada de los medios de comunicación',
          'Como la circunstancia en que los hechos objetivos influyen menos que las emociones y creencias personales',
          'Como la ausencia total de verdad en la política',
          'Como un fenómeno exclusivo de las redes sociales'
        ],
        correct: 1,
        explanation: 'The text defines post-truth as the circumstance where "los hechos objetivos tienen menos influencia en la opinión pública que las apelaciones a la emoción y las creencias personales".'
      },
      {
        prompt: '¿Qué papel desempeñan los algoritmos de redes sociales según el texto?',
        options: [
          'Filtran y eliminan las noticias falsas',
          'Promueven el pensamiento crítico entre los usuarios',
          'Priorizan contenido que genera más interacción, favoreciendo el sensacionalismo',
          'Son neutrales y no afectan la información que vemos'
        ],
        correct: 2,
        explanation: 'The text explains that algorithms prioritize content that generates more engagement, which favors sensationalist headlines and fake news over rigorous analysis.'
      },
      {
        prompt: '¿Qué es una "cámara de eco" según el contexto?',
        options: [
          'Un estudio de grabación de sonido',
          'Un tipo de red social nueva',
          'Un espacio virtual donde solo se recibe información que confirma las ideas previas del usuario',
          'Un programa educativo para verificar noticias'
        ],
        correct: 2,
        explanation: 'In context, echo chambers are virtual spaces "donde los usuarios solo reciben información que confirma sus ideas previas", reinforcing confirmation bias.'
      },
      {
        prompt: '¿Cuál de las siguientes soluciones NO se menciona en el texto?',
        options: [
          'Fomentar el pensamiento crítico desde la educación primaria',
          'Prohibir completamente las redes sociales',
          'Regular más estrictamente las plataformas digitales',
          'Enseñar a verificar fuentes y contrastar datos'
        ],
        correct: 1,
        explanation: 'The text mentions promoting critical thinking, regulating platforms, and teaching source verification, but never suggests banning social media entirely.'
      },
      {
        prompt: '¿Qué se puede inferir sobre la visión del autor acerca de la responsabilidad frente a la desinformación?',
        options: [
          'Que es únicamente responsabilidad de los gobiernos',
          'Que la responsabilidad recae solo en las empresas tecnológicas',
          'Que es tanto individual como colectiva, y requiere múltiples enfoques simultáneos',
          'Que no hay solución posible al problema'
        ],
        correct: 2,
        explanation: 'The author concludes by emphasizing "la responsabilidad individual y colectiva" and presents multiple complementary approaches (education, regulation), suggesting a multifaceted solution is needed.'
      }
    ]
  },

  {
    id: 'read-33',
    level: 'C1',
    title: 'La economía circular',
    titleEn: 'The Circular Economy',
    text: 'Durante más de un siglo, el modelo económico predominante ha seguido un esquema lineal: extraer, producir, usar y desechar. Este paradigma, que impulsó la industrialización y el crecimiento del siglo XX, se revela hoy insostenible ante la evidencia del agotamiento de los recursos naturales y la acumulación de residuos que superan la capacidad de absorción del planeta. Frente a esta realidad, la economía circular propone un cambio de paradigma radical: diseñar productos pensando en su ciclo de vida completo, de modo que los materiales puedan ser reutilizados, reparados o reciclados indefinidamente. Uno de los blancos principales de este modelo es la obsolescencia programada, esa práctica mediante la cual los fabricantes diseñan productos con una vida útil artificialmente limitada para estimular el consumo. La economía circular desafía esta lógica al promover la durabilidad, la modularidad y la reparabilidad como valores esenciales de la cadena de valor. Países como Países Bajos, Finlandia y Francia ya han implementado legislaciones que obligan a las empresas a informar sobre la durabilidad de sus productos y a facilitar el acceso a piezas de repuesto. En Latinoamérica, iniciativas comunitarias de reutilización y cooperativas de recicladores están demostrando que la circularidad no es solo una teoría académica, sino una práctica viable que genera empleo y reduce la contaminación. Sin embargo, la transición hacia una economía verdaderamente circular exige repensar no solo la producción, sino también los hábitos de consumo de toda la sociedad.',
    vocab: [
      { word: 'economía circular', english: 'circular economy' },
      { word: 'obsolescencia programada', english: 'planned obsolescence' },
      { word: 'residuos', english: 'waste / residues' },
      { word: 'reutilización', english: 'reuse' },
      { word: 'cadena de valor', english: 'value chain' }
    ],
    questions: [
      {
        prompt: '¿Cuál es el esquema del modelo económico lineal según el texto?',
        options: [
          'Diseñar, reutilizar, reciclar y reparar',
          'Extraer, producir, usar y desechar',
          'Producir, vender, comprar y almacenar',
          'Investigar, desarrollar, distribuir y reciclar'
        ],
        correct: 1,
        explanation: 'The text explicitly states the linear model follows the scheme: "extraer, producir, usar y desechar".'
      },
      {
        prompt: '¿Qué es la "obsolescencia programada"?',
        options: [
          'Un programa gubernamental para renovar productos viejos',
          'La práctica de diseñar productos con una vida útil artificialmente limitada',
          'Un sistema de reciclaje automatizado',
          'La caducidad natural de los materiales'
        ],
        correct: 1,
        explanation: 'The text defines it as "esa práctica mediante la cual los fabricantes diseñan productos con una vida útil artificialmente limitada para estimular el consumo".'
      },
      {
        prompt: '¿Qué países se mencionan como ejemplos de legislación a favor de la economía circular?',
        options: [
          'Alemania, España y Portugal',
          'Países Bajos, Finlandia y Francia',
          'México, Colombia y Chile',
          'Estados Unidos, Canadá y Japón'
        ],
        correct: 1,
        explanation: 'The text mentions "Países Bajos, Finlandia y Francia" as countries that have implemented legislation requiring companies to report on product durability.'
      },
      {
        prompt: '¿Qué valores promueve la economía circular en la cadena de valor?',
        options: [
          'Velocidad, bajo costo y producción masiva',
          'Innovación, competitividad y exportación',
          'Durabilidad, modularidad y reparabilidad',
          'Estética, funcionalidad y precio'
        ],
        correct: 2,
        explanation: 'The text states the circular economy promotes "la durabilidad, la modularidad y la reparabilidad como valores esenciales de la cadena de valor".'
      },
      {
        prompt: '¿Qué se puede inferir sobre la posición del autor respecto a la transición hacia la economía circular?',
        options: [
          'Que es imposible de lograr en la práctica',
          'Que depende exclusivamente de los gobiernos',
          'Que requiere cambios tanto en la producción como en los hábitos de consumo de toda la sociedad',
          'Que ya se ha completado en Europa'
        ],
        correct: 2,
        explanation: 'The final sentence makes clear the transition "exige repensar no solo la producción, sino también los hábitos de consumo de toda la sociedad", indicating systemic change on both the supply and demand sides.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C2  —  Additional passages (250-300 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-34',
    level: 'C2',
    title: 'El Quijote como espejo de la modernidad',
    titleEn: 'Don Quixote as a Mirror of Modernity',
    text: 'Cuatro siglos después de su publicación, "El ingenioso hidalgo don Quijote de la Mancha" sigue interpelando al lector contemporáneo con una vigencia que trasciende la mera curiosidad anticuaria. Cervantes no escribió simplemente una parodia de los libros de caballerías; inauguró, acaso sin proponérselo, la novela moderna y sus procedimientos más audaces: la metaficción, el perspectivismo narrativo, el desdoblamiento del yo. Cuando don Quijote y Sancho descubren, en la segunda parte, que sus aventuras ya han sido publicadas y que otros personajes los reconocen por haberlas leído, asistimos a un vértigo autorreferencial que anticipa experimentos literarios del siglo XX como los de Borges, Pirandello o Unamuno. La genialidad de Cervantes reside también en la ambigüedad moral de su protagonista: ¿es don Quijote un loco que confunde la realidad con la ficción, o un visionario que se niega a aceptar un mundo desprovisto de ideales? Esta pregunta sobre la verosimilitud —sobre los límites entre lo real y lo imaginado— resuena con particular intensidad en nuestra era de realidades virtuales y relatos construidos. El desdoblamiento entre Quijote y Sancho, entre idealismo y pragmatismo, entre locura y cordura, configura un espejo en el que cada generación proyecta sus propias contradicciones. La trascendencia del Quijote no se agota en su condición de obra literaria; funciona como una metáfora epistemológica sobre cómo construimos sentido en un universo que se resiste a ofrecerlo. Leer el Quijote hoy no es un ejercicio de erudición, sino un acto de autoconocimiento: en su locura luminosa seguimos reconociéndonos, incapaces aún de resolver el dilema entre el mundo como es y el mundo como debería ser.',
    vocab: [
      { word: 'metaficción', english: 'metafiction (fiction that self-consciously addresses its own nature)' },
      { word: 'desdoblamiento', english: 'doubling / splitting (of the self or narrative)' },
      { word: 'verosimilitud', english: 'verisimilitude / plausibility' },
      { word: 'parodia', english: 'parody' },
      { word: 'trascendencia', english: 'transcendence / lasting significance' }
    ],
    questions: [
      {
        prompt: '¿Por qué afirma el autor que Cervantes inauguró la novela moderna?',
        options: [
          'Porque escribió la novela más larga de su época',
          'Porque introdujo procedimientos como la metaficción, el perspectivismo narrativo y el desdoblamiento del yo',
          'Porque fue el primer autor en escribir en castellano',
          'Porque criticó directamente a la monarquía española'
        ],
        correct: 1,
        explanation: 'The text credits Cervantes with inaugurating the modern novel through techniques like "la metaficción, el perspectivismo narrativo, el desdoblamiento del yo".'
      },
      {
        prompt: '¿Qué momento de la novela se cita como ejemplo de "vértigo autorreferencial"?',
        options: [
          'La batalla contra los molinos de viento',
          'La muerte de don Quijote al final de la novela',
          'Cuando Quijote y Sancho descubren que sus aventuras ya han sido publicadas y otros personajes los reconocen',
          'La primera salida de don Quijote de su aldea'
        ],
        correct: 2,
        explanation: 'The text highlights the moment in Part Two when Quixote and Sancho discover their adventures have been published and other characters recognize them from having read the book — a self-referential vertigo anticipating 20th-century metafiction.'
      },
      {
        prompt: '¿Qué función cumple el Quijote según la expresión "metáfora epistemológica"?',
        options: [
          'Enseña gramática castellana a través de metáforas',
          'Funciona como una reflexión sobre cómo construimos sentido y conocimiento en un mundo que no lo ofrece espontáneamente',
          'Demuestra que la epistemología es una rama de la literatura',
          'Prueba que las metáforas son la base de todo conocimiento científico'
        ],
        correct: 1,
        explanation: 'The text says the Quixote works as "una metáfora epistemológica sobre cómo construimos sentido en un universo que se resiste a ofrecerlo" — a reflection on how we create meaning in a world that does not readily provide it.'
      },
      {
        prompt: '¿Qué ambigüedad moral del protagonista destaca el autor?',
        options: [
          'Si don Quijote es héroe o villano',
          'Si don Quijote es un loco que confunde realidad y ficción, o un visionario que rechaza un mundo sin ideales',
          'Si don Quijote es español o de otra nacionalidad',
          'Si Sancho es más inteligente que don Quijote'
        ],
        correct: 1,
        explanation: 'The text poses the central ambiguity: "¿es don Quijote un loco que confunde la realidad con la ficción, o un visionario que se niega a aceptar un mundo desprovisto de ideales?"'
      },
      {
        prompt: '¿Qué conexión establece el autor entre el Quijote y la era contemporánea?',
        options: [
          'Que las novelas de caballerías han vuelto a estar de moda',
          'Que la inteligencia artificial se basa en el Quijote',
          'Que la cuestión de los límites entre lo real y lo imaginado resuena en la era de realidades virtuales y relatos construidos',
          'Que los jóvenes leen más el Quijote que nunca'
        ],
        correct: 2,
        explanation: 'The author argues that the question of verisimilitude — the boundary between real and imagined — "resuena con particular intensidad en nuestra era de realidades virtuales y relatos construidos".'
      }
    ]
  },

  {
    id: 'read-35',
    level: 'C2',
    title: 'Neurolingüística y bilingüismo',
    titleEn: 'Neurolinguistics and Bilingualism',
    text: 'La investigación neurolingüística de las últimas dos décadas ha transformado radicalmente nuestra comprensión del cerebro bilingüe. Lejos de la concepción tradicional que consideraba el bilingüismo como una suerte de interferencia cognitiva —un lastre que retardaba el desarrollo lingüístico—, los estudios actuales revelan que gestionar dos sistemas lingüísticos simultáneamente confiere ventajas cognitivas mensurables. El cerebro bilingüe exhibe una mayor neuroplasticidad, es decir, una capacidad superior para reorganizar sus conexiones neuronales en respuesta a nuevas demandas. Este fenómeno se manifiesta de manera particularmente notable en el córtex prefrontal, región asociada con las funciones ejecutivas: la planificación, la inhibición de respuestas automáticas y la alternancia atencional. Precisamente, la alternancia de códigos —el acto de cambiar fluidamente entre dos lenguas dentro de una misma conversación o incluso de una misma oración— constituye un ejercicio cognitivo que fortalece estas funciones ejecutivas de manera análoga a como el entrenamiento físico fortalece la musculatura. No obstante, la competencia lingüística del bilingüe no es un fenómeno monolítico. El procesamiento cognitivo varía significativamente según la edad de adquisición de la segunda lengua, el contexto de uso, el grado de exposición y la distancia tipológica entre los idiomas involucrados. Un hispanohablante que adquiere el portugués experimentará patrones de interferencia lingüística cualitativamente distintos de los que enfrenta al aprender el mandarín. Investigaciones recientes sugieren, además, que el bilingüismo sostenido a lo largo de la vida podría retrasar la aparición de síntomas de deterioro cognitivo asociados con el envejecimiento, lo que abre perspectivas prometedoras tanto para la política educativa como para la neurología clínica.',
    vocab: [
      { word: 'neuroplasticidad', english: 'neuroplasticity (the brain\'s ability to reorganize neural connections)' },
      { word: 'alternancia de códigos', english: 'code-switching (switching between languages)' },
      { word: 'competencia lingüística', english: 'linguistic competence' },
      { word: 'procesamiento cognitivo', english: 'cognitive processing' },
      { word: 'interferencia lingüística', english: 'linguistic interference (transfer between languages)' }
    ],
    questions: [
      {
        prompt: '¿Cuál era la concepción tradicional del bilingüismo que el texto refuta?',
        options: [
          'Que el bilingüismo era una ventaja económica',
          'Que gestionar dos lenguas constituía una interferencia cognitiva que retardaba el desarrollo lingüístico',
          'Que los bilingües eran más inteligentes que los monolingües',
          'Que el bilingüismo solo era posible en la infancia'
        ],
        correct: 1,
        explanation: 'The text states that the traditional view considered bilingualism "una suerte de interferencia cognitiva — un lastre que retardaba el desarrollo lingüístico", which current research contradicts.'
      },
      {
        prompt: '¿Qué analogía utiliza el autor para explicar el efecto de la alternancia de códigos?',
        options: [
          'Lo compara con un ordenador que ejecuta dos programas',
          'Lo compara con un músico que toca dos instrumentos',
          'Lo compara con el entrenamiento físico que fortalece la musculatura',
          'Lo compara con un equilibrista que mantiene el balance'
        ],
        correct: 2,
        explanation: 'The text says code-switching strengthens executive functions "de manera análoga a como el entrenamiento físico fortalece la musculatura".'
      },
      {
        prompt: '¿Qué región del cerebro se asocia particularmente con las ventajas del bilingüismo?',
        options: [
          'El hipocampo',
          'El cerebelo',
          'El córtex prefrontal',
          'El lóbulo temporal'
        ],
        correct: 2,
        explanation: 'The text specifies that neuroplasticity is particularly notable "en el córtex prefrontal, región asociada con las funciones ejecutivas".'
      },
      {
        prompt: '¿Por qué menciona el autor el ejemplo de un hispanohablante que aprende portugués versus mandarín?',
        options: [
          'Para demostrar que el portugués es más fácil que el mandarín',
          'Para ilustrar que la distancia tipológica entre idiomas afecta los patrones de interferencia lingüística',
          'Para recomendar qué idioma deberían aprender los hispanohablantes',
          'Para probar que solo se pueden aprender lenguas cercanas'
        ],
        correct: 1,
        explanation: 'The example illustrates how "la distancia tipológica entre los idiomas involucrados" produces qualitatively different patterns of linguistic interference, showing that bilingual processing is not uniform.'
      },
      {
        prompt: '¿Qué implicación práctica sugieren las investigaciones recientes sobre bilingüismo y envejecimiento?',
        options: [
          'Que los bilingües nunca desarrollan enfermedades cerebrales',
          'Que aprender idiomas en la vejez es imposible',
          'Que el bilingüismo sostenido podría retrasar síntomas de deterioro cognitivo, con implicaciones para la política educativa y la neurología clínica',
          'Que solo el bilingüismo infantil protege contra el deterioro'
        ],
        correct: 2,
        explanation: 'The text concludes that sustained bilingualism "podría retrasar la aparición de síntomas de deterioro cognitivo asociados con el envejecimiento", opening promising perspectives for both educational policy and clinical neurology.'
      }
    ]
  },

  {
    id: 'read-36',
    level: 'C2',
    title: 'El exilio republicano español',
    titleEn: 'The Spanish Republican Exile',
    text: 'Tras la caída de la Segunda República en 1939, cerca de medio millón de españoles cruzaron la frontera francesa en lo que constituyó uno de los mayores éxodos políticos del siglo XX. Aquella diáspora, compuesta por intelectuales, artistas, científicos, maestros y obreros, transformó irreversiblemente el panorama cultural de los países que les brindaron acogida, muy especialmente México, donde el presidente Lázaro Cárdenas abrió las puertas a miles de refugiados con una generosidad que la historia aún no ha terminado de reconocer. El patrimonio intelectual que los exiliados aportaron a su nueva patria fue extraordinario: fundaron editoriales como el Fondo de Cultura Económica y Siglo XXI, revitalizaron universidades, crearon centros de investigación y enriquecieron la vida artística y literaria mexicana con figuras como Luis Buñuel, Remedios Varo, Luis Cernuda y Emilio Prados. No obstante, el exilio no fue únicamente una historia de logros profesionales; fue también una experiencia marcada por el desarraigo, la nostalgia incurable de una patria perdida y la dolorosa conciencia de que el regreso —cuando finalmente fue posible tras la muerte de Franco— significaba volver a un país irreconocible que había seguido su curso sin ellos. Muchos exiliados vivieron suspendidos entre dos identidades, sin pertenecer ya plenamente a ningún lugar. Esta condición de extranjería perpetua generó una literatura del exilio de hondura excepcional, en la que autores como Max Aub y María Zambrano exploraron la fractura entre memoria e identidad, entre el país recordado y el país real. El exilio republicano nos recuerda que toda diáspora es, simultáneamente, una pérdida irreparable para la nación que expulsa y un don involuntario para la que recibe.',
    vocab: [
      { word: 'exilio', english: 'exile' },
      { word: 'diáspora', english: 'diaspora (mass dispersion of a people)' },
      { word: 'acogida', english: 'reception / welcome / shelter' },
      { word: 'patrimonio intelectual', english: 'intellectual heritage / legacy' },
      { word: 'desarraigo', english: 'uprooting / rootlessness' }
    ],
    questions: [
      {
        prompt: '¿Qué papel desempeñó México en el exilio republicano según el texto?',
        options: [
          'Rechazó a los exiliados por razones políticas',
          'Aceptó solo a los intelectuales y rechazó a los obreros',
          'Bajo la presidencia de Lázaro Cárdenas, acogió generosamente a miles de refugiados',
          'Ofreció asilo temporal pero luego los deportó'
        ],
        correct: 2,
        explanation: 'The text states that President Lázaro Cárdenas "abrió las puertas a miles de refugiados con una generosidad que la historia aún no ha terminado de reconocer".'
      },
      {
        prompt: '¿Qué significa que muchos exiliados vivieron "suspendidos entre dos identidades"?',
        options: [
          'Que tenían doble nacionalidad legal',
          'Que no pertenecían plenamente ni a España ni a su país de acogida, atrapados entre la memoria del origen y la realidad del destierro',
          'Que cambiaban frecuentemente de nombre',
          'Que hablaban dos idiomas con la misma fluidez'
        ],
        correct: 1,
        explanation: 'The text describes exiles as living between two identities, "sin pertenecer ya plenamente a ningún lugar" — a condition of perpetual foreignness between the remembered homeland and the adopted country.'
      },
      {
        prompt: '¿Por qué el regreso a España tras la muerte de Franco no resolvió el desarraigo?',
        options: [
          'Porque el gobierno español les prohibió regresar',
          'Porque ya no hablaban español correctamente',
          'Porque España se había convertido en un país irreconocible que había seguido su curso sin ellos',
          'Porque México no les permitió salir'
        ],
        correct: 2,
        explanation: 'The text explains that returning meant "volver a un país irreconocible que había seguido su curso sin ellos" — Spain had changed beyond recognition during the decades of exile.'
      },
      {
        prompt: '¿Cuál es la paradoja central que plantea la frase final del texto?',
        options: [
          'Que los exiliados eran más felices fuera de España',
          'Que toda diáspora es simultáneamente una pérdida irreparable para el país que expulsa y un don involuntario para el que recibe',
          'Que México se benefició más que España de la Guerra Civil',
          'Que el exilio produce mejor literatura que la vida en la patria'
        ],
        correct: 1,
        explanation: 'The closing paradox is that "toda diáspora es, simultáneamente, una pérdida irreparable para la nación que expulsa y un don involuntario para la que recibe" — diaspora simultaneously represents loss and gift.'
      },
      {
        prompt: '¿Qué exploraron autores como Max Aub y María Zambrano en la literatura del exilio?',
        options: [
          'Las ventajas económicas de vivir en México',
          'La superioridad cultural de España sobre Latinoamérica',
          'La fractura entre memoria e identidad, entre el país recordado y el país real',
          'Las diferencias lingüísticas entre el español peninsular y el mexicano'
        ],
        correct: 2,
        explanation: 'The text states these authors "exploraron la fractura entre memoria e identidad, entre el país recordado y el país real" — the rupture between remembered and actual homeland that defined the exile experience.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  B1  —  Additional passages: past tenses, subjunctive basics (120-160 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-37',
    level: 'B1',
    title: 'Un viaje inesperado a Portugal',
    titleEn: 'An Unexpected Trip to Portugal',
    text: 'El verano pasado, mis amigos y yo decidimos viajar a Portugal sin planificar nada. Cuando llegamos a Lisboa, no teníamos reserva de hotel, así que caminamos por las calles del barrio de Alfama buscando alojamiento. Un señor mayor nos recomendó una pensión pequeña que estaba escondida en una calle estrecha. El lugar era sencillo pero acogedor, y desde la ventana se veía el río Tajo. Durante los tres días que pasamos allí, visitamos monumentos históricos, probamos la gastronomía local y escuchamos fado en un bar tradicional. Fue una de las mejores experiencias de mi vida porque aprendimos que a veces los mejores viajes son los que no se planifican. Ojalá pudiéramos volver el próximo verano.',
    vocab: [
      { word: 'alojamiento', english: 'accommodation / lodging' },
      { word: 'acogedor', english: 'cozy / welcoming' },
      { word: 'gastronomía', english: 'gastronomy / cuisine' },
      { word: 'fado', english: 'fado (traditional Portuguese music)' },
      { word: 'planificar', english: 'to plan' }
    ],
    questions: [
      {
        prompt: '¿Por qué caminaron por las calles de Alfama?',
        options: [
          'Porque querían hacer turismo',
          'Porque no tenían reserva de hotel',
          'Porque les gustaba caminar',
          'Porque estaban perdidos'
        ],
        correct: 1,
        explanation: 'The text says "no teníamos reserva de hotel, así que caminamos por las calles del barrio de Alfama buscando alojamiento".'
      },
      {
        prompt: '¿Qué se veía desde la ventana de la pensión?',
        options: ['El océano Atlántico', 'El río Tajo', 'La Torre de Belém', 'Un parque grande'],
        correct: 1,
        explanation: 'The text says "desde la ventana se veía el río Tajo".'
      },
      {
        prompt: '¿Cuál es la lección principal del viaje según el narrador?',
        options: [
          'Que hay que reservar hotel siempre',
          'Que Portugal es un país bonito',
          'Que los mejores viajes son los que no se planifican',
          'Que viajar con amigos es divertido'
        ],
        correct: 2,
        explanation: 'The narrator concludes that "a veces los mejores viajes son los que no se planifican".'
      }
    ]
  },

  {
    id: 'read-38',
    level: 'B1',
    title: 'Noticias del terremoto',
    titleEn: 'Earthquake News',
    text: 'Ayer por la noche, un terremoto de magnitud 5,4 sacudió la costa sur del país. Los habitantes de la zona sintieron un fuerte temblor que duró aproximadamente treinta segundos. Muchas personas salieron de sus casas corriendo y se reunieron en las plazas públicas. Afortunadamente, no hubo víctimas mortales, aunque varios edificios antiguos sufrieron daños importantes. Los equipos de emergencia trabajaron toda la noche para evaluar la situación. El gobierno anunció que enviaría ayuda económica a las familias afectadas. Los expertos explicaron que era probable que hubiera réplicas durante los próximos días y recomendaron que la población mantuviera la calma y siguiera las instrucciones de las autoridades.',
    vocab: [
      { word: 'terremoto', english: 'earthquake' },
      { word: 'temblor', english: 'tremor / shaking' },
      { word: 'víctimas mortales', english: 'fatalities / deaths' },
      { word: 'réplicas', english: 'aftershocks' },
      { word: 'autoridades', english: 'authorities' }
    ],
    questions: [
      {
        prompt: '¿Cuánto duró el temblor?',
        options: ['Diez segundos', 'Treinta segundos', 'Un minuto', 'Cinco minutos'],
        correct: 1,
        explanation: 'The text says the tremor "duró aproximadamente treinta segundos".'
      },
      {
        prompt: '¿Qué hizo el gobierno después del terremoto?',
        options: [
          'Evacuó la ciudad',
          'Anunció que enviaría ayuda económica',
          'Cerró las escuelas',
          'Pidió ayuda internacional'
        ],
        correct: 1,
        explanation: 'The text says "el gobierno anunció que enviaría ayuda económica a las familias afectadas".'
      },
      {
        prompt: '¿Qué recomendaron los expertos a la población?',
        options: [
          'Que abandonaran la zona inmediatamente',
          'Que mantuviera la calma y siguiera las instrucciones',
          'Que repararan sus casas',
          'Que compraran provisiones'
        ],
        correct: 1,
        explanation: 'The experts "recomendaron que la población mantuviera la calma y siguiera las instrucciones de las autoridades".'
      }
    ]
  },

  {
    id: 'read-39',
    level: 'B1',
    title: 'La historia de mi abuela',
    titleEn: 'My Grandmother\'s Story',
    text: 'Mi abuela siempre nos contaba historias de su juventud. Cuando era joven, vivía en un pueblo pequeño donde no había electricidad ni agua corriente. Se levantaba antes del amanecer para ayudar a su madre con las tareas del hogar. A los dieciséis años se mudó a la ciudad para trabajar en una fábrica de textiles. Al principio se sentía muy sola porque no conocía a nadie, pero poco a poco hizo amigos entre sus compañeras de trabajo. Conoció a mi abuelo en una fiesta del pueblo y se casaron dos años después. Siempre decía que aquellos tiempos fueron difíciles pero que la hicieron más fuerte. Ojalá yo tuviera la misma valentía que ella tuvo.',
    vocab: [
      { word: 'juventud', english: 'youth' },
      { word: 'amanecer', english: 'dawn / sunrise' },
      { word: 'fábrica', english: 'factory' },
      { word: 'compañeras', english: 'colleagues / co-workers (female)' },
      { word: 'valentía', english: 'courage / bravery' }
    ],
    questions: [
      {
        prompt: '¿Cómo era el pueblo donde vivía la abuela?',
        options: [
          'Grande y moderno',
          'Pequeño, sin electricidad ni agua corriente',
          'Costero y turístico',
          'Industrial y ruidoso'
        ],
        correct: 1,
        explanation: 'The text says she "vivía en un pueblo pequeño donde no había electricidad ni agua corriente".'
      },
      {
        prompt: '¿Por qué se mudó a la ciudad?',
        options: [
          'Para estudiar en la universidad',
          'Para trabajar en una fábrica de textiles',
          'Para casarse con el abuelo',
          'Porque su pueblo fue destruido'
        ],
        correct: 1,
        explanation: 'The text says "se mudó a la ciudad para trabajar en una fábrica de textiles".'
      },
      {
        prompt: '¿Dónde conoció al abuelo?',
        options: [
          'En la fábrica',
          'En la ciudad',
          'En una fiesta del pueblo',
          'En el colegio'
        ],
        correct: 2,
        explanation: 'The text says "conoció a mi abuelo en una fiesta del pueblo".'
      }
    ]
  },

  {
    id: 'read-40',
    level: 'B1',
    title: 'Cambiar de carrera profesional',
    titleEn: 'Changing Careers',
    text: 'Después de trabajar diez años como contable, Laura decidió que quería cambiar de profesión. Siempre le había interesado la cocina, así que se inscribió en una escuela de gastronomía. Sus amigos pensaban que estaba loca porque tenía un trabajo estable y bien pagado. Sin embargo, Laura sentía que le faltaba pasión en su vida profesional. Durante el primer año de estudios, trabajaba de día y estudiaba de noche. Fue muy agotador, pero no se arrepintió en ningún momento. Cuando terminó sus estudios, abrió un pequeño restaurante en su barrio. Al principio el negocio fue lento, pero después de que un crítico gastronómico escribiera una reseña positiva, los clientes empezaron a llegar. Hoy Laura dice que es la decisión más importante que ha tomado.',
    vocab: [
      { word: 'contable', english: 'accountant' },
      { word: 'inscribirse', english: 'to enroll / sign up' },
      { word: 'agotador', english: 'exhausting' },
      { word: 'arrepentirse', english: 'to regret' },
      { word: 'reseña', english: 'review' }
    ],
    questions: [
      {
        prompt: '¿Qué hacía Laura antes de cambiar de profesión?',
        options: ['Era profesora', 'Era contable', 'Era cocinera', 'Era periodista'],
        correct: 1,
        explanation: 'The text says she worked "como contable" for ten years.'
      },
      {
        prompt: '¿Qué opinaban sus amigos sobre su decisión?',
        options: [
          'Que era una buena idea',
          'Que estaba loca',
          'Que deberían acompañarla',
          'No les importaba'
        ],
        correct: 1,
        explanation: 'The text says "sus amigos pensaban que estaba loca porque tenía un trabajo estable y bien pagado".'
      },
      {
        prompt: '¿Qué ayudó a que el restaurante tuviera éxito?',
        options: [
          'La publicidad en televisión',
          'Una reseña positiva de un crítico gastronómico',
          'La ubicación del restaurante',
          'Los precios bajos'
        ],
        correct: 1,
        explanation: 'The text says that "después de que un crítico gastronómico escribiera una reseña positiva, los clientes empezaron a llegar".'
      }
    ]
  },

  {
    id: 'read-41',
    level: 'B1',
    title: 'El problema del insomnio',
    titleEn: 'The Problem of Insomnia',
    text: 'Desde hacía varios meses, Carlos no podía dormir bien. Se acostaba cansado pero no conseguía conciliar el sueño hasta las tres de la madrugada. Durante el día se sentía agotado y le costaba concentrarse en el trabajo. Un compañero le sugirió que fuera al médico. El doctor le explicó que el estrés laboral era probablemente la causa de su insomnio y le recomendó que hiciera ejercicio regularmente y que evitara las pantallas antes de dormir. También le aconsejó que tomara infusiones de valeriana en lugar de pastillas para dormir. Carlos siguió todas las recomendaciones y, después de unas semanas, empezó a notar una mejora significativa. Ahora duerme siete horas cada noche y se despierta con más energía.',
    vocab: [
      { word: 'insomnio', english: 'insomnia' },
      { word: 'conciliar el sueño', english: 'to fall asleep' },
      { word: 'madrugada', english: 'early morning hours (1-5 AM)' },
      { word: 'estrés laboral', english: 'work-related stress' },
      { word: 'infusiones', english: 'herbal teas / infusions' }
    ],
    questions: [
      {
        prompt: '¿Cuál era el problema principal de Carlos?',
        options: [
          'Trabajaba demasiado',
          'No podía dormir bien',
          'Tenía dolor de cabeza',
          'No le gustaba su trabajo'
        ],
        correct: 1,
        explanation: 'The text says "Carlos no podía dormir bien" and describes his insomnia.'
      },
      {
        prompt: '¿Qué le recomendó el médico?',
        options: [
          'Que cambiara de trabajo',
          'Que tomara pastillas para dormir',
          'Que hiciera ejercicio y evitara pantallas antes de dormir',
          'Que se fuera de vacaciones'
        ],
        correct: 2,
        explanation: 'The doctor recommended "que hiciera ejercicio regularmente y que evitara las pantallas antes de dormir".'
      },
      {
        prompt: '¿Cuál fue el resultado después de seguir las recomendaciones?',
        options: [
          'No mejoró nada',
          'Tuvo que tomar medicamentos',
          'Empezó a dormir siete horas y se despertaba con más energía',
          'Dejó su trabajo'
        ],
        correct: 2,
        explanation: 'The text says "ahora duerme siete horas cada noche y se despierta con más energía".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  B2  —  Additional passages: subjunctive, conditionals, complex clauses (160-200 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-42',
    level: 'B2',
    title: '¿Es necesaria la universidad?',
    titleEn: 'Is University Necessary?',
    text: 'En los últimos años se ha intensificado el debate sobre si la educación universitaria sigue siendo imprescindible para alcanzar el éxito profesional. Quienes defienden la formación académica tradicional argumentan que la universidad no solo proporciona conocimientos técnicos, sino que también desarrolla el pensamiento crítico y amplía la visión del mundo. No obstante, cada vez son más las voces que cuestionan este modelo, señalando que muchos de los emprendedores más exitosos del mundo —desde Steve Jobs hasta Amancio Ortega— nunca completaron una carrera universitaria. Los defensores de las rutas alternativas sostienen que la formación autodidacta, los cursos en línea y la experiencia práctica pueden ser igualmente valiosos, siempre y cuando el individuo posea la disciplina necesaria. Si los gobiernos invirtieran más en formación profesional y en programas de aprendizaje, quizá se reduciría la brecha entre lo que enseña la academia y lo que demanda el mercado laboral. Lo que resulta innegable es que la respuesta no es universal: depende del campo profesional, del contexto socioeconómico y, sobre todo, de las metas personales de cada individuo.',
    vocab: [
      { word: 'imprescindible', english: 'essential / indispensable' },
      { word: 'emprendedores', english: 'entrepreneurs' },
      { word: 'autodidacta', english: 'self-taught' },
      { word: 'brecha', english: 'gap' },
      { word: 'metas', english: 'goals / objectives' }
    ],
    questions: [
      {
        prompt: '¿Qué argumentan los defensores de la universidad?',
        options: [
          'Que es la única forma de ganar dinero',
          'Que desarrolla el pensamiento crítico y amplía la visión del mundo',
          'Que todos los emprendedores fueron universitarios',
          'Que los cursos en línea no sirven'
        ],
        correct: 1,
        explanation: 'The text says defenders argue the university "desarrolla el pensamiento crítico y amplía la visión del mundo".'
      },
      {
        prompt: '¿Qué ejemplo usan quienes cuestionan el modelo universitario?',
        options: [
          'Que los universitarios ganan menos dinero',
          'Que muchos emprendedores exitosos no completaron una carrera universitaria',
          'Que las universidades son demasiado caras',
          'Que los profesores no están cualificados'
        ],
        correct: 1,
        explanation: 'The text mentions that "muchos de los emprendedores más exitosos del mundo nunca completaron una carrera universitaria".'
      },
      {
        prompt: '¿Qué sugiere el texto que deberían hacer los gobiernos?',
        options: [
          'Cerrar universidades',
          'Invertir más en formación profesional y programas de aprendizaje',
          'Obligar a todos a ir a la universidad',
          'Subir las tasas universitarias'
        ],
        correct: 1,
        explanation: 'The text suggests "si los gobiernos invirtieran más en formación profesional y en programas de aprendizaje" the gap could be reduced.'
      },
      {
        prompt: '¿Cuál es la conclusión del texto?',
        options: [
          'La universidad es siempre necesaria',
          'La universidad nunca es necesaria',
          'La respuesta depende del campo, el contexto y las metas personales',
          'Solo los ricos deberían ir a la universidad'
        ],
        correct: 2,
        explanation: 'The text concludes that "la respuesta no es universal: depende del campo profesional, del contexto socioeconómico y de las metas personales".'
      }
    ]
  },

  {
    id: 'read-43',
    level: 'B2',
    title: 'El Día de los Muertos: más allá del folclore',
    titleEn: 'Day of the Dead: Beyond Folklore',
    text: 'El Día de los Muertos, celebrado el primero y el dos de noviembre en México, es mucho más que una festividad pintoresca: constituye una cosmovisión profunda sobre la relación entre la vida y la muerte. Mientras que en muchas culturas occidentales la muerte es tratada como un tema tabú que debe ser evitado, la tradición mexicana la abraza con naturalidad e incluso con humor. Las familias construyen altares —conocidos como ofrendas— decorados con flores de cempasúchil, velas, fotografías y los alimentos favoritos del difunto, con la creencia de que las almas regresan durante esas noches para compartir con los vivos. Esta celebración, que fue declarada Patrimonio Cultural Inmaterial por la UNESCO en 2003, tiene raíces que se remontan a las civilizaciones prehispánicas, aunque fue transformada por la influencia del catolicismo español. Si se analizara esta tradición únicamente desde una perspectiva turística, se perdería su esencia más profunda: la idea de que la muerte no es el final, sino una continuación del vínculo afectivo que une a las generaciones. En los últimos años, la globalización ha popularizado esta festividad fuera de México, lo cual genera un debate legítimo sobre la línea entre apreciación cultural y apropiación.',
    vocab: [
      { word: 'cosmovisión', english: 'worldview' },
      { word: 'cempasúchil', english: 'marigold (the traditional flower)' },
      { word: 'difunto', english: 'deceased person' },
      { word: 'prehispánicas', english: 'pre-Hispanic / pre-Columbian' },
      { word: 'apropiación', english: 'appropriation' }
    ],
    questions: [
      {
        prompt: '¿Cómo se diferencia la actitud mexicana ante la muerte de la occidental?',
        options: [
          'Los mexicanos tienen miedo de la muerte',
          'Las culturas occidentales celebran la muerte más que México',
          'La tradición mexicana abraza la muerte con naturalidad, mientras que en Occidente es tabú',
          'No hay ninguna diferencia'
        ],
        correct: 2,
        explanation: 'The text contrasts Western cultures where death "es tratada como un tema tabú" with the Mexican tradition that "la abraza con naturalidad e incluso con humor".'
      },
      {
        prompt: '¿Cuál es el origen de esta celebración?',
        options: [
          'Es completamente católica',
          'Fue inventada por la UNESCO',
          'Tiene raíces prehispánicas transformadas por el catolicismo español',
          'Es una tradición moderna del siglo XX'
        ],
        correct: 2,
        explanation: 'The text says it "tiene raíces que se remontan a las civilizaciones prehispánicas, aunque fue transformada por la influencia del catolicismo español".'
      },
      {
        prompt: '¿Cuál es la esencia profunda de la tradición según el texto?',
        options: [
          'Que la muerte es algo divertido',
          'Que la muerte no es el final, sino una continuación del vínculo afectivo',
          'Que los muertos pueden comer',
          'Que las flores tienen poderes mágicos'
        ],
        correct: 1,
        explanation: 'The text says the deepest meaning is "la idea de que la muerte no es el final, sino una continuación del vínculo afectivo que une a las generaciones".'
      },
      {
        prompt: '¿Qué debate genera la globalización de esta festividad?',
        options: [
          'Si México debería prohibir la celebración',
          'Si los extranjeros pueden participar',
          'La línea entre apreciación cultural y apropiación',
          'Si la UNESCO debería retirar su reconocimiento'
        ],
        correct: 2,
        explanation: 'The text mentions "un debate legítimo sobre la línea entre apreciación cultural y apropiación".'
      }
    ]
  },

  {
    id: 'read-44',
    level: 'B2',
    title: 'Tecnología y soledad en la era digital',
    titleEn: 'Technology and Loneliness in the Digital Age',
    text: 'Resulta paradójico que en una época en la que estamos más conectados que nunca, los índices de soledad hayan alcanzado niveles alarmantes en todo el mundo. Las redes sociales, que fueron diseñadas para acercarnos, han acabado por crear una ilusión de conexión que, en muchos casos, sustituye las relaciones profundas por interacciones superficiales. Diversos estudios han demostrado que las personas que pasan más de tres horas diarias en redes sociales tienen un riesgo significativamente mayor de experimentar ansiedad y depresión. Si bien es cierto que la tecnología ha facilitado que mantengamos el contacto con personas que viven lejos, también ha erosionado nuestra capacidad para tolerar la soledad constructiva —ese tiempo a solas que tradicionalmente se dedicaba a la reflexión y al autoconocimiento—. Los psicólogos advierten de que, si no se tomaran medidas, esta tendencia podría convertirse en una crisis de salud pública. No se trata de demonizar la tecnología, sino de aprender a utilizarla de manera consciente, estableciendo límites claros y priorizando las relaciones que verdaderamente nos nutren emocionalmente.',
    vocab: [
      { word: 'paradójico', english: 'paradoxical' },
      { word: 'índices', english: 'rates / levels' },
      { word: 'erosionado', english: 'eroded' },
      { word: 'autoconocimiento', english: 'self-knowledge / self-awareness' },
      { word: 'demonizar', english: 'to demonize' }
    ],
    questions: [
      {
        prompt: '¿Cuál es la paradoja central que plantea el texto?',
        options: [
          'Que la tecnología es cara pero todos la usan',
          'Que estamos más conectados que nunca pero los niveles de soledad son alarmantes',
          'Que las redes sociales son populares pero aburridas',
          'Que los jóvenes prefieren la tecnología pero los mayores no'
        ],
        correct: 1,
        explanation: 'The text opens with the paradox that "en una época en la que estamos más conectados que nunca, los índices de soledad hayan alcanzado niveles alarmantes".'
      },
      {
        prompt: '¿Qué han demostrado los estudios sobre el uso excesivo de redes sociales?',
        options: [
          'Que mejora la productividad',
          'Que no tiene ningún efecto',
          'Que aumenta el riesgo de ansiedad y depresión',
          'Que fortalece las amistades'
        ],
        correct: 2,
        explanation: 'Studies show that heavy social media users "tienen un riesgo significativamente mayor de experimentar ansiedad y depresión".'
      },
      {
        prompt: '¿Qué es la "soledad constructiva" según el texto?',
        options: [
          'Vivir solo en una casa grande',
          'No tener amigos en las redes sociales',
          'Tiempo a solas dedicado a la reflexión y al autoconocimiento',
          'Trabajar desde casa sin compañeros'
        ],
        correct: 2,
        explanation: 'The text defines it as "ese tiempo a solas que tradicionalmente se dedicaba a la reflexión y al autoconocimiento".'
      }
    ]
  },

  {
    id: 'read-45',
    level: 'B2',
    title: 'La desertificación del Mediterráneo',
    titleEn: 'Desertification of the Mediterranean',
    text: 'El sur de Europa se enfrenta a una amenaza medioambiental que rara vez recibe la atención que merece: la desertificación progresiva de amplias zonas del Mediterráneo. España, que ya es el país más árido de Europa, podría ver cómo un tercio de su territorio se convierte en desierto antes de que termine este siglo si no se adoptan medidas urgentes. Las causas son múltiples: el cambio climático ha provocado un aumento de las temperaturas y una disminución de las precipitaciones, pero la actividad humana —la sobreexplotación de acuíferos, la agricultura intensiva y la urbanización descontrolada— ha acelerado el proceso de manera dramática. Las consecuencias no son únicamente medioambientales; afectan directamente a la economía agrícola, al suministro de agua potable y a la biodiversidad. Si se hubiera actuado con mayor decisión hace dos décadas, la situación actual sería menos grave. Organizaciones como la FAO proponen soluciones que incluyen la reforestación con especies autóctonas, la modernización de los sistemas de riego y la implementación de políticas de uso sostenible del suelo. Sin embargo, mientras los beneficios de estas medidas se manifiestan a largo plazo, los costes políticos de implementarlas son inmediatos, lo que explica la reluctancia de muchos gobiernos a actuar.',
    vocab: [
      { word: 'desertificación', english: 'desertification' },
      { word: 'acuíferos', english: 'aquifers (underground water sources)' },
      { word: 'precipitaciones', english: 'rainfall / precipitation' },
      { word: 'reforestación', english: 'reforestation' },
      { word: 'autóctonas', english: 'native / indigenous (species)' }
    ],
    questions: [
      {
        prompt: '¿Qué porcentaje del territorio español podría convertirse en desierto?',
        options: ['Un cuarto', 'Un tercio', 'La mitad', 'Dos tercios'],
        correct: 1,
        explanation: 'The text says "un tercio de su territorio se convierte en desierto" if urgent measures are not taken.'
      },
      {
        prompt: '¿Qué actividades humanas aceleran la desertificación?',
        options: [
          'El turismo y la pesca',
          'La sobreexplotación de acuíferos, la agricultura intensiva y la urbanización',
          'La minería y la industria pesada',
          'El transporte aéreo y marítimo'
        ],
        correct: 1,
        explanation: 'The text lists "la sobreexplotación de acuíferos, la agricultura intensiva y la urbanización descontrolada" as human causes.'
      },
      {
        prompt: '¿Por qué muchos gobiernos son reluctantes a actuar?',
        options: [
          'Porque no creen en el cambio climático',
          'Porque los beneficios son a largo plazo pero los costes políticos son inmediatos',
          'Porque no tienen dinero suficiente',
          'Porque la tecnología necesaria no existe todavía'
        ],
        correct: 1,
        explanation: 'The text explains that "los beneficios de estas medidas se manifiestan a largo plazo" but "los costes políticos de implementarlas son inmediatos".'
      },
      {
        prompt: '¿Qué expresa la frase "si se hubiera actuado con mayor decisión hace dos décadas"?',
        options: [
          'Que se actuó correctamente en el pasado',
          'Que no se hizo lo suficiente y ahora la situación es peor',
          'Que la desertificación es un fenómeno reciente',
          'Que los gobiernos anteriores fueron más eficaces'
        ],
        correct: 1,
        explanation: 'The past subjunctive conditional expresses a counterfactual — insufficient action was taken, and the current situation would be less severe if more had been done.'
      }
    ]
  },

  {
    id: 'read-46',
    level: 'B2',
    title: 'La caída del Muro de Berlín',
    titleEn: 'The Fall of the Berlin Wall',
    text: 'La noche del 9 de noviembre de 1989, miles de berlineses se congregaron frente al Muro que había dividido su ciudad durante veintiocho años. Lo que comenzó como una confusa conferencia de prensa en la que un funcionario de Alemania Oriental anunció, aparentemente por error, la apertura inmediata de las fronteras, se convirtió en uno de los acontecimientos más trascendentales del siglo XX. Los guardias fronterizos, desbordados por la multitud y sin instrucciones claras, optaron por abrir los puestos de control. Las imágenes de familias que fueron separadas durante décadas abrazándose bajo los focos de las cámaras dieron la vuelta al mundo. Si bien la caída del Muro fue celebrada como el triunfo de la libertad, sus consecuencias resultaron más complejas de lo que muchos habían anticipado. La reunificación alemana, formalizada en octubre de 1990, supuso un enorme desafío económico y social: las desigualdades entre el este y el oeste tardaron décadas en reducirse, y algunas persisten todavía. Los historiadores coinciden en que aquel acontecimiento no habría sido posible sin las reformas de Gorbachov en la Unión Soviética ni sin el movimiento pacifista que había cobrado fuerza en toda Europa del Este.',
    vocab: [
      { word: 'congregaron', english: 'gathered / congregated' },
      { word: 'trascendentales', english: 'momentous / transcendental' },
      { word: 'desbordados', english: 'overwhelmed' },
      { word: 'reunificación', english: 'reunification' },
      { word: 'pacifista', english: 'pacifist / peace (movement)' }
    ],
    questions: [
      {
        prompt: '¿Qué desencadenó la apertura del Muro?',
        options: [
          'Una orden directa del gobierno soviético',
          'Una confusa conferencia de prensa que anunció la apertura de fronteras',
          'Una revolución violenta',
          'Una votación popular'
        ],
        correct: 1,
        explanation: 'The text says it began with "una confusa conferencia de prensa en la que un funcionario de Alemania Oriental anunció, aparentemente por error, la apertura inmediata de las fronteras".'
      },
      {
        prompt: '¿Qué complicaciones trajo la reunificación?',
        options: [
          'Una guerra civil entre el este y el oeste',
          'La intervención de la OTAN',
          'Desigualdades económicas y sociales entre el este y el oeste',
          'El rechazo de la población a la unificación'
        ],
        correct: 2,
        explanation: 'The text says "las desigualdades entre el este y el oeste tardaron décadas en reducirse, y algunas persisten todavía".'
      },
      {
        prompt: '¿Qué factores hicieron posible la caída del Muro según los historiadores?',
        options: [
          'La presión militar de Estados Unidos',
          'Las reformas de Gorbachov y el movimiento pacifista en Europa del Este',
          'La crisis económica mundial',
          'La intervención de la ONU'
        ],
        correct: 1,
        explanation: 'The text says it "no habría sido posible sin las reformas de Gorbachov en la Unión Soviética ni sin el movimiento pacifista que había cobrado fuerza en toda Europa del Este".'
      },
      {
        prompt: '¿Qué tipo de estructura gramatical utiliza "no habría sido posible sin"?',
        options: [
          'Futuro simple',
          'Condicional compuesto para expresar una hipótesis sobre el pasado',
          'Pretérito perfecto',
          'Imperativo negativo'
        ],
        correct: 1,
        explanation: 'The conditional perfect "no habría sido posible" expresses a counterfactual hypothesis about the past — what would not have been possible without certain conditions.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C1  —  Additional passages: advanced subjunctive, literary devices (200-250 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-47',
    level: 'C1',
    title: 'La crítica literaria ante la autoficción',
    titleEn: 'Literary Criticism and Autofiction',
    text: 'La autoficción —ese género híbrido en el que el autor se convierte en protagonista de una narración que oscila deliberadamente entre lo vivido y lo inventado— ha generado una de las polémicas más estimulantes de la crítica literaria contemporánea. Desde que Serge Doubrovsky acuñara el término en 1977, la frontera entre autobiografía y novela se ha ido difuminando hasta resultar casi irreconocible en obras como las de Karl Ove Knausgård o, en el ámbito hispanohablante, Javier Cercas y Fernando Aramburu. Los detractores de la autoficción la consideran un ejercicio de narcisismo disfrazado de literatura, una claudicación de la imaginación ante la facilidad de lo testimonial. Sostienen que, al refugiarse en la propia experiencia, el autor renuncia a la empresa más noble de la ficción: trascender lo individual para alcanzar lo universal. Sus defensores, en cambio, argumentan que toda ficción es, en última instancia, autobiográfica, y que la honestidad radical de exponer la propia vulnerabilidad constituye un acto de valentía literaria, no de pereza creativa. Lo que quizá resulte más interesante es que este debate revela una tensión más profunda: la ansiedad de una cultura que, saturada de relatos construidos en las redes sociales, busca desesperadamente alguna forma de autenticidad, aunque sea consciente de que toda narración —incluida la del yo— implica necesariamente una selección, una distorsión, una ficción. Que el lector nunca pueda estar seguro de dónde termina la verdad y comienza la invención no es una debilidad del género, sino precisamente su mayor logro estético.',
    vocab: [
      { word: 'autoficción', english: 'autofiction (fictionalized autobiography)' },
      { word: 'acuñar', english: 'to coin (a term)' },
      { word: 'claudicación', english: 'capitulation / surrender' },
      { word: 'vulnerabilidad', english: 'vulnerability' },
      { word: 'distorsión', english: 'distortion' }
    ],
    questions: [
      {
        prompt: '¿Quién acuñó el término "autoficción"?',
        options: ['Karl Ove Knausgård', 'Javier Cercas', 'Serge Doubrovsky', 'Fernando Aramburu'],
        correct: 2,
        explanation: 'The text says "Serge Doubrovsky acuñara el término en 1977".'
      },
      {
        prompt: '¿Qué critican los detractores de la autoficción?',
        options: [
          'Que es demasiado difícil de leer',
          'Que es un narcisismo disfrazado de literatura y una renuncia a la imaginación',
          'Que no vende suficientes libros',
          'Que plagia la vida de otras personas'
        ],
        correct: 1,
        explanation: 'Critics see it as "un ejercicio de narcisismo disfrazado de literatura, una claudicación de la imaginación ante la facilidad de lo testimonial".'
      },
      {
        prompt: '¿Qué tensión cultural más profunda revela este debate según el autor?',
        options: [
          'La competencia entre editoriales por vender más',
          'La ansiedad de una cultura saturada de relatos construidos que busca autenticidad',
          'La rivalidad entre escritores europeos y latinoamericanos',
          'La crisis del sistema educativo'
        ],
        correct: 1,
        explanation: 'The text says the debate reveals "la ansiedad de una cultura que, saturada de relatos construidos en las redes sociales, busca desesperadamente alguna forma de autenticidad".'
      },
      {
        prompt: '¿Por qué la ambigüedad entre verdad e invención es considerada un logro?',
        options: [
          'Porque confunde a los críticos literarios',
          'Porque permite vender el libro como ficción y como autobiografía',
          'Porque la incertidumbre del lector sobre dónde termina la verdad es el mayor logro estético del género',
          'Porque así el autor evita demandas legales'
        ],
        correct: 2,
        explanation: 'The text concludes that the reader\'s inability to distinguish truth from invention "no es una debilidad del género, sino precisamente su mayor logro estético".'
      }
    ]
  },

  {
    id: 'read-48',
    level: 'C1',
    title: 'La libertad y sus paradojas',
    titleEn: 'Freedom and Its Paradoxes',
    text: 'Pocos conceptos han sido tan invocados y, simultáneamente, tan mal comprendidos como el de libertad. La filosofía occidental ha oscilado entre dos concepciones fundamentales: la libertad negativa —la ausencia de coacción externa, el derecho a que nadie interfiera en nuestras decisiones— y la libertad positiva —la capacidad real de autogobernarse y realizar el propio proyecto vital—. Isaiah Berlin advirtió en su célebre ensayo que la segunda concepción, por seductora que pareciera, contenía un germen peligroso: si alguien puede determinar cuál es el "verdadero yo" que debe ser liberado, se abre la puerta al paternalismo e incluso al totalitarismo. Sin embargo, reducir la libertad a la mera ausencia de interferencia tampoco resulta satisfactorio, pues ignora las condiciones materiales sin las cuales la autonomía deviene ilusoria. ¿De qué le sirve la libertad de expresión a quien carece de educación para articular sus ideas? ¿Qué libertad de elección tiene quien nace en la miseria más absoluta? Estas preguntas, que atraviesan siglos de pensamiento político, adquieren una urgencia renovada en un mundo donde las desigualdades se han profundizado y donde nuevas formas de control —algorítmico, informático, biopolítico— operan de maneras tan sutiles que ni siquiera son percibidas como restricciones. Quizá la tarea filosófica más apremiante de nuestro tiempo sea reconciliar ambas dimensiones de la libertad, asumiendo que ninguna sociedad verdaderamente libre puede existir mientras sus miembros carezcan tanto de protección frente a la coerción como de las condiciones materiales para ejercer una autonomía genuina.',
    vocab: [
      { word: 'coacción', english: 'coercion / compulsion' },
      { word: 'paternalismo', english: 'paternalism' },
      { word: 'deviene', english: 'becomes (formal)' },
      { word: 'algorítmico', english: 'algorithmic' },
      { word: 'apremiante', english: 'pressing / urgent' }
    ],
    questions: [
      {
        prompt: '¿Cuáles son las dos concepciones de libertad que distingue el texto?',
        options: [
          'Libertad económica y libertad política',
          'Libertad negativa (ausencia de coacción) y libertad positiva (capacidad de autogobernarse)',
          'Libertad individual y libertad colectiva',
          'Libertad de expresión y libertad de movimiento'
        ],
        correct: 1,
        explanation: 'The text distinguishes "libertad negativa — la ausencia de coacción externa" from "libertad positiva — la capacidad real de autogobernarse".'
      },
      {
        prompt: '¿Qué peligro identificó Isaiah Berlin en la libertad positiva?',
        options: [
          'Que genera anarquía',
          'Que conduce al individualismo extremo',
          'Que si alguien determina cuál es el "verdadero yo", se abre la puerta al paternalismo y al totalitarismo',
          'Que es demasiado cara de implementar'
        ],
        correct: 2,
        explanation: 'Berlin warned that if someone can determine the "true self" that must be liberated, "se abre la puerta al paternalismo e incluso al totalitarismo".'
      },
      {
        prompt: '¿Qué nuevas formas de control menciona el texto?',
        options: [
          'Control militar y religioso',
          'Control algorítmico, informático y biopolítico',
          'Control familiar y educativo',
          'Control económico y laboral'
        ],
        correct: 1,
        explanation: 'The text mentions "nuevas formas de control — algorítmico, informático, biopolítico — que operan de maneras tan sutiles que ni siquiera son percibidas como restricciones".'
      },
      {
        prompt: '¿Cuál es la tarea filosófica que propone el texto?',
        options: [
          'Elegir entre libertad negativa o positiva',
          'Eliminar todas las formas de gobierno',
          'Reconciliar ambas dimensiones asegurando protección frente a la coerción y condiciones materiales para la autonomía',
          'Crear una nueva definición de libertad'
        ],
        correct: 2,
        explanation: 'The text proposes reconciling both dimensions, ensuring "protección frente a la coerción" and "condiciones materiales para ejercer una autonomía genuina".'
      }
    ]
  },

  {
    id: 'read-49',
    level: 'C1',
    title: 'El principio de incertidumbre y sus implicaciones filosóficas',
    titleEn: 'The Uncertainty Principle and Its Philosophical Implications',
    text: 'Cuando Werner Heisenberg formuló el principio de incertidumbre en 1927, no solo revolucionó la física cuántica sino que desestabilizó los cimientos mismos de la epistemología occidental. La idea de que resulta imposible determinar simultáneamente, con precisión arbitraria, la posición y el momento de una partícula subatómica no era meramente un problema técnico de medición; revelaba un límite ontológico fundamental: la naturaleza, en su nivel más básico, se resiste a ser completamente conocida. Este descubrimiento asestó un golpe devastador al determinismo laplaciano, esa visión del universo como un reloj perfecto en el que, conocidas las condiciones iniciales, todo el futuro sería predecible. Las interpretaciones filosóficas del principio han sido diversas y, con frecuencia, abusivas. Algunos han pretendido utilizarlo para justificar el libre albedrío, argumentando que si la materia es indeterminada, la mente también podría serlo. Otros lo han invocado para legitimar el relativismo epistemológico, como si la incertidumbre cuántica demostrase que toda verdad es relativa. Ambas extrapolaciones cometen el error de trasladar un fenómeno del mundo subatómico al ámbito macroscópico sin las debidas cautelas. Lo que sí resulta legítimo afirmar es que Heisenberg nos obligó a repensar la relación entre el observador y lo observado, anticipando debates que décadas después resonarían en campos tan dispares como la sociología del conocimiento y la teoría literaria. La física cuántica no nos dice que la verdad no exista; nos recuerda, con una humildad que la filosofía haría bien en emular, que nuestro acceso a ella siempre será parcial e inevitablemente mediado por nuestros instrumentos de observación.',
    vocab: [
      { word: 'epistemología', english: 'epistemology (theory of knowledge)' },
      { word: 'ontológico', english: 'ontological (relating to the nature of being)' },
      { word: 'determinismo', english: 'determinism' },
      { word: 'libre albedrío', english: 'free will' },
      { word: 'extrapolaciones', english: 'extrapolations' }
    ],
    questions: [
      {
        prompt: '¿Qué estableció el principio de incertidumbre de Heisenberg?',
        options: [
          'Que toda medición es errónea',
          'Que es imposible determinar simultáneamente con precisión la posición y el momento de una partícula',
          'Que el universo es completamente aleatorio',
          'Que la física clásica es incorrecta'
        ],
        correct: 1,
        explanation: 'The text says it is impossible to determine simultaneously "con precisión arbitraria, la posición y el momento de una partícula subatómica".'
      },
      {
        prompt: '¿Por qué el autor considera "abusivas" algunas interpretaciones filosóficas?',
        options: [
          'Porque contradicen a Einstein',
          'Porque trasladan un fenómeno subatómico al ámbito macroscópico sin cautelas adecuadas',
          'Porque son demasiado complicadas',
          'Porque ignoran la historia de la física'
        ],
        correct: 1,
        explanation: 'The text says these extrapolations "cometen el error de trasladar un fenómeno del mundo subatómico al ámbito macroscópico sin las debidas cautelas".'
      },
      {
        prompt: '¿Qué contribución legítima atribuye el autor a Heisenberg?',
        options: [
          'Demostrar que la verdad no existe',
          'Inventar la computación cuántica',
          'Obligarnos a repensar la relación entre el observador y lo observado',
          'Refutar completamente la filosofía clásica'
        ],
        correct: 2,
        explanation: 'The text says Heisenberg\'s legitimate contribution was to force us to "repensar la relación entre el observador y lo observado".'
      },
      {
        prompt: '¿Cuál es el mensaje final del texto sobre la verdad?',
        options: [
          'Que la verdad no existe',
          'Que la verdad es completamente relativa',
          'Que nuestro acceso a la verdad siempre será parcial y mediado por nuestros instrumentos',
          'Que solo la física puede descubrir la verdad'
        ],
        correct: 2,
        explanation: 'The text concludes that quantum physics "nos recuerda que nuestro acceso a ella siempre será parcial e inevitablemente mediado por nuestros instrumentos de observación".'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  C2  —  Additional passages: sophisticated language, register shifts (250-300 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-50',
    level: 'C2',
    title: 'La erosión del discurso público',
    titleEn: 'The Erosion of Public Discourse',
    text: 'Cabría preguntarse si el deterioro del discurso público que presenciamos constituye un fenómeno genuinamente nuevo o si, por el contrario, cada generación ha tenido la impresión de que el debate político se degradaba irremisiblemente. Lo cierto es que existen elementos estructurales inéditos que distinguen la coyuntura actual de cualquier precedente histórico. La economía de la atención —ese modelo en el que la indignación y la polarización son las mercancías más rentables— ha convertido la esfera pública en un circo donde la estridencia desplaza sistemáticamente al matiz. Los algoritmos de las plataformas digitales, optimizados para maximizar el tiempo de permanencia, privilegian el contenido que genera reacciones emocionales intensas, con independencia de su veracidad o de su contribución al bien común. Este mecanismo ha producido lo que algunos teóricos denominan "cámaras de eco epistémicas": burbujas informativas en las que los ciudadanos ya no discrepan sobre las soluciones a problemas compartidos, sino sobre los hechos mismos. Si un interlocutor no acepta la premisa de que la tierra es redonda, difícilmente podremos debatir sobre política medioambiental. La consecuencia más perniciosa de esta dinámica no es, como suele afirmarse, la proliferación de información falsa —que, después de todo, ha existido siempre—, sino la erosión de la categoría misma de verdad compartida. Cuando el escepticismo saludable degenera en un cinismo epistemológico generalizado, cuando cada dato es descartado como propaganda y cada experto como cómplice de una conspiración, la democracia deliberativa pierde la condición de posibilidad que la sustenta: un mínimo acuerdo sobre la realidad a partir del cual negociar las discrepancias. Restaurar ese suelo común exigirá algo más que regulación tecnológica o alfabetización mediática; requerirá, acaso, una transformación cultural profunda que restituya el valor de la honestidad intelectual y la disposición a ser persuadido por argumentos mejores que los propios.',
    vocab: [
      { word: 'irremisiblemente', english: 'irremediably / irreversibly' },
      { word: 'estridencia', english: 'stridency / shrillness' },
      { word: 'veracidad', english: 'veracity / truthfulness' },
      { word: 'perniciosa', english: 'pernicious / harmful' },
      { word: 'restituya', english: 'restore (subjunctive)' }
    ],
    questions: [
      {
        prompt: '¿Qué distingue la situación actual de precedentes históricos según el texto?',
        options: [
          'Que los políticos son peores que antes',
          'Que la economía de la atención convierte la indignación y la polarización en mercancías rentables',
          'Que la gente lee menos periódicos',
          'Que hay más partidos políticos que nunca'
        ],
        correct: 1,
        explanation: 'The text identifies "la economía de la atención — ese modelo en el que la indignación y la polarización son las mercancías más rentables" as the structurally unprecedented element.'
      },
      {
        prompt: '¿Qué son las "cámaras de eco epistémicas"?',
        options: [
          'Estudios de grabación para podcasts políticos',
          'Burbujas informativas donde los ciudadanos ya no discrepan sobre soluciones sino sobre los hechos mismos',
          'Departamentos de universidades dedicados a la epistemología',
          'Programas de televisión donde se repiten las mismas noticias'
        ],
        correct: 1,
        explanation: 'The text defines them as "burbujas informativas en las que los ciudadanos ya no discrepan sobre las soluciones a problemas compartidos, sino sobre los hechos mismos".'
      },
      {
        prompt: '¿Cuál es la consecuencia más perniciosa según el autor?',
        options: [
          'La proliferación de noticias falsas',
          'La polarización política',
          'La erosión de la categoría misma de verdad compartida',
          'La pérdida de lectores de prensa tradicional'
        ],
        correct: 2,
        explanation: 'The text says the most pernicious consequence is not false information but "la erosión de la categoría misma de verdad compartida".'
      },
      {
        prompt: '¿Qué condición de posibilidad de la democracia deliberativa se ve amenazada?',
        options: [
          'El derecho al voto',
          'La separación de poderes',
          'Un mínimo acuerdo sobre la realidad a partir del cual negociar las discrepancias',
          'La libertad de prensa'
        ],
        correct: 2,
        explanation: 'The text says democracy loses "la condición de posibilidad que la sustenta: un mínimo acuerdo sobre la realidad a partir del cual negociar las discrepancias".'
      }
    ]
  },

  {
    id: 'read-51',
    level: 'C2',
    title: 'Borges y la disolución del autor',
    titleEn: 'Borges and the Dissolution of the Author',
    text: 'En "Pierre Menard, autor del Quijote", Borges ejecuta una de las operaciones intelectuales más vertiginosas de la literatura universal: demostrar que un texto idéntico, reproducido palabra por palabra, se convierte en una obra radicalmente distinta cuando cambian las circunstancias de su enunciación. El cuento, publicado en 1939, narra los esfuerzos de un oscuro escritor francés por escribir —no copiar ni transcribir, sino escribir de nuevo, desde su propia experiencia— varios capítulos del Quijote. El resultado es, letra a letra, indistinguible del original cervantino, y sin embargo, argumenta el narrador borgiano con una ironía devastadora, infinitamente más rico. Donde Cervantes escribía con la naturalidad de un hombre de su tiempo, Menard escribe contra la corriente de tres siglos de historia literaria, lo cual dota a cada frase de una complejidad hermenéutica insospechada. Este relato, que superficialmente podría parecer un divertimento erudito, anticipa con décadas de antelación las tesis que Roland Barthes formalizaría en "La muerte del autor" y que Michel Foucault exploraría en "¿Qué es un autor?". La provocación borgiana consiste en llevar al absurdo lógico una verdad incómoda: que el significado de un texto no reside exclusivamente en la intención de quien lo escribe, sino en la red de lecturas, convenciones y contextos que lo envuelven. Cada relectura es, en sentido estricto, una reescritura. Si aceptamos esta premisa —y resulta difícil refutarla sin caer en ingenuidades hermenéuticas—, la figura del autor como origen y garante del sentido se disuelve en favor de una concepción del texto como artefacto vivo, perpetuamente resignificado por cada nuevo lector. Lo que Borges intuyó con la elegancia de una paradoja, la teoría literaria del siglo XX tardaría décadas en articular con el aparato conceptual de la semiótica y el posestructuralismo. Acaso sea esta la mayor virtud de Borges: haber convertido las ideas más complejas en ficciones tan breves y cristalinas que parecen, como los mejores trucos de magia, absurdamente sencillas.',
    vocab: [
      { word: 'enunciación', english: 'enunciation / utterance (the act of producing discourse)' },
      { word: 'hermenéutica', english: 'hermeneutics (theory of interpretation)' },
      { word: 'semiótica', english: 'semiotics (study of signs and meaning)' },
      { word: 'posestructuralismo', english: 'post-structuralism' },
      { word: 'resignificado', english: 'resignified / given new meaning' }
    ],
    questions: [
      {
        prompt: '¿Qué hace Pierre Menard en el cuento de Borges?',
        options: [
          'Traduce el Quijote al francés',
          'Escribe de nuevo, desde su propia experiencia, capítulos del Quijote idénticos al original',
          'Publica una edición crítica del Quijote',
          'Plagia el Quijote y lo presenta como propio'
        ],
        correct: 1,
        explanation: 'The text says Menard attempts to "escribir de nuevo, desde su propia experiencia" chapters of the Quixote, producing text "letra a letra, indistinguible del original cervantino".'
      },
      {
        prompt: '¿Por qué el texto de Menard sería "infinitamente más rico" que el de Cervantes?',
        options: [
          'Porque Menard era un mejor escritor',
          'Porque usa un español más moderno',
          'Porque Menard escribe contra la corriente de tres siglos de historia literaria, dotando cada frase de complejidad hermenéutica',
          'Porque incluye notas a pie de página'
        ],
        correct: 2,
        explanation: 'The text explains that Menard "escribe contra la corriente de tres siglos de historia literaria, lo cual dota a cada frase de una complejidad hermenéutica insospechada".'
      },
      {
        prompt: '¿Qué tesis posteriores anticipa este cuento según el autor del texto?',
        options: [
          'Las teorías de Noam Chomsky sobre gramática generativa',
          'Las ideas de Barthes en "La muerte del autor" y de Foucault en "¿Qué es un autor?"',
          'Las propuestas del realismo mágico latinoamericano',
          'Las teorías marxistas de la literatura'
        ],
        correct: 1,
        explanation: 'The text says the story "anticipa con décadas de antelación las tesis que Roland Barthes formalizaría en \'La muerte del autor\' y que Michel Foucault exploraría en \'¿Qué es un autor?\'".'
      },
      {
        prompt: '¿Cuál es la "verdad incómoda" que Borges lleva al absurdo lógico?',
        options: [
          'Que todos los escritores copian de otros',
          'Que la literatura no tiene valor',
          'Que el significado de un texto no reside exclusivamente en la intención del autor sino en la red de lecturas, convenciones y contextos',
          'Que el español del siglo XVII es superior al moderno'
        ],
        correct: 2,
        explanation: 'The "uncomfortable truth" is that "el significado de un texto no reside exclusivamente en la intención de quien lo escribe, sino en la red de lecturas, convenciones y contextos que lo envuelven".'
      }
    ]
  },

  {
    id: 'read-52',
    level: 'A2',
    title: 'Mi rutina diaria',
    titleEn: 'My Daily Routine',
    text: 'Todos los días me despierto a las siete de la mañana. Primero me ducho y después desayuno café con tostadas. Salgo de casa a las ocho y camino hasta la parada del autobús. Trabajo en una oficina en el centro de la ciudad. Normalmente almuerzo con mis compañeros en la cafetería. Por la tarde vuelvo a casa y hago la compra en el supermercado. Preparo la cena y como mientras veo las noticias en la televisión. Antes de dormir leo un poco. Los fines de semana mi rutina es diferente porque me levanto más tarde y salgo con mis amigos.',
    vocab: [
      { word: 'me despierto', english: 'I wake up' },
      { word: 'tostadas', english: 'toast' },
      { word: 'parada del autobús', english: 'bus stop' },
      { word: 'almuerzo', english: 'I have lunch' },
      { word: 'hago la compra', english: 'I do the shopping' }
    ],
    questions: [
      {
        prompt: '¿A qué hora se despierta?',
        options: ['A las seis', 'A las siete', 'A las ocho', 'A las nueve'],
        correct: 1,
        explanation: 'The text says "me despierto a las siete de la mañana".'
      },
      {
        prompt: '¿Cómo va al trabajo?',
        options: ['En coche', 'En metro', 'En autobús', 'En bicicleta'],
        correct: 2,
        explanation: 'The text says "camino hasta la parada del autobús".'
      },
      {
        prompt: '¿Dónde almuerza normalmente?',
        options: ['En un restaurante', 'En su casa', 'En la cafetería', 'En el parque'],
        correct: 2,
        explanation: 'The text says "almuerzo con mis compañeros en la cafetería".'
      },
      {
        prompt: '¿Qué hace antes de dormir?',
        options: ['Ve la televisión', 'Lee un poco', 'Escucha música', 'Hace ejercicio'],
        correct: 1,
        explanation: 'The text says "antes de dormir leo un poco".'
      }
    ]
  },

  {
    id: 'read-53',
    level: 'A2',
    title: 'El fin de semana pasado',
    titleEn: 'Last Weekend',
    text: 'El sábado pasado me levanté tarde porque no tenía que trabajar. Desayuné tranquilamente y después llamé a mi amiga Laura. Quedamos a las doce en el parque del centro. Hacía buen tiempo y había mucha gente paseando. Caminamos un rato y luego fuimos a comer a una pizzería nueva. La pizza estaba deliciosa y el camarero fue muy amable. Por la tarde fuimos al cine y vimos una película de comedia. Nos reímos mucho. El domingo descansé en casa, lavé la ropa y preparé las cosas para la semana. Fue un fin de semana muy agradable.',
    vocab: [
      { word: 'quedamos', english: 'we arranged to meet' },
      { word: 'hacía buen tiempo', english: 'the weather was nice' },
      { word: 'pizzería', english: 'pizza restaurant' },
      { word: 'camarero', english: 'waiter' },
      { word: 'agradable', english: 'pleasant / enjoyable' }
    ],
    questions: [
      {
        prompt: '¿Por qué se levantó tarde el sábado?',
        options: ['Estaba enfermo', 'No tenía que trabajar', 'Se acostó muy tarde', 'No escuchó el despertador'],
        correct: 1,
        explanation: 'The text says "me levanté tarde porque no tenía que trabajar".'
      },
      {
        prompt: '¿Dónde quedaron con Laura?',
        options: ['En su casa', 'En la pizzería', 'En el parque del centro', 'En el cine'],
        correct: 2,
        explanation: 'The text says "quedamos a las doce en el parque del centro".'
      },
      {
        prompt: '¿Qué tipo de película vieron?',
        options: ['De acción', 'De terror', 'De comedia', 'De ciencia ficción'],
        correct: 2,
        explanation: 'The text says "vimos una película de comedia".'
      },
      {
        prompt: '¿Qué hizo el domingo?',
        options: ['Salió con amigos', 'Fue al cine otra vez', 'Descansó en casa y lavó la ropa', 'Fue de compras'],
        correct: 2,
        explanation: 'The text says "el domingo descansé en casa, lavé la ropa y preparé las cosas para la semana".'
      }
    ]
  },

  {
    id: 'read-54',
    level: 'A2',
    title: 'Una carta a un amigo',
    titleEn: 'A Letter to a Friend',
    text: 'Querido Miguel: Te escribo desde mi nueva ciudad. El mes pasado me mudé a Valencia por trabajo. Al principio estaba un poco nervioso porque no conocía a nadie. Pero mis vecinos son muy simpáticos y me ayudaron con la mudanza. Vivo en un piso pequeño cerca de la playa. Todos los días después del trabajo paseo por la orilla del mar. El clima aquí es fantástico, siempre hace sol. Ya encontré un gimnasio cerca de casa y voy tres veces por semana. Echo de menos a mi familia y a mis amigos, pero estoy contento con el cambio. Espero tu visita pronto. Un abrazo, Carlos.',
    vocab: [
      { word: 'me mudé', english: 'I moved (house)' },
      { word: 'vecinos', english: 'neighbors' },
      { word: 'mudanza', english: 'move / moving (house)' },
      { word: 'orilla del mar', english: 'seashore' },
      { word: 'echo de menos', english: 'I miss' }
    ],
    questions: [
      {
        prompt: '¿Por qué se mudó Carlos a Valencia?',
        options: ['Por estudios', 'Por trabajo', 'Por su familia', 'Por el clima'],
        correct: 1,
        explanation: 'The text says "me mudé a Valencia por trabajo".'
      },
      {
        prompt: '¿Cómo son los vecinos de Carlos?',
        options: ['Antipáticos', 'Ruidosos', 'Simpáticos', 'Tímidos'],
        correct: 2,
        explanation: 'The text says "mis vecinos son muy simpáticos y me ayudaron con la mudanza".'
      },
      {
        prompt: '¿Qué hace Carlos después del trabajo?',
        options: ['Va al gimnasio', 'Pasea por la orilla del mar', 'Llama a su familia', 'Estudia español'],
        correct: 1,
        explanation: 'The text says "todos los días después del trabajo paseo por la orilla del mar".'
      },
      {
        prompt: '¿Con qué frecuencia va al gimnasio?',
        options: ['Todos los días', 'Dos veces por semana', 'Tres veces por semana', 'Los fines de semana'],
        correct: 2,
        explanation: 'The text says "voy tres veces por semana".'
      }
    ]
  },

  {
    id: 'read-55',
    level: 'A2',
    title: 'Mi restaurante favorito',
    titleEn: 'My Favorite Restaurant',
    text: 'Mi restaurante favorito se llama "Casa Antonio" y está en una calle tranquila del centro. Lo descubrí hace dos años cuando un compañero de trabajo me lo recomendó. El dueño se llama Antonio y siempre recibe a los clientes con una sonrisa. La comida es casera y muy sabrosa. Mi plato favorito es el pollo al horno con patatas. También tienen postres increíbles, especialmente la tarta de chocolate. Los precios son bastante razonables para la calidad de la comida. Normalmente voy los viernes por la noche con mi pareja. Siempre reservamos mesa porque el restaurante se llena rápido.',
    vocab: [
      { word: 'dueño', english: 'owner' },
      { word: 'casera', english: 'homemade' },
      { word: 'sabrosa', english: 'tasty / flavorful' },
      { word: 'pollo al horno', english: 'roast chicken' },
      { word: 'reservamos mesa', english: 'we book a table' }
    ],
    questions: [
      {
        prompt: '¿Cómo descubrió el restaurante?',
        options: ['Lo vio en internet', 'Un compañero se lo recomendó', 'Lo encontró caminando', 'Un amigo lo llevó'],
        correct: 1,
        explanation: 'The text says "un compañero de trabajo me lo recomendó".'
      },
      {
        prompt: '¿Cuál es su plato favorito?',
        options: ['Paella', 'Tarta de chocolate', 'Pollo al horno con patatas', 'Ensalada'],
        correct: 2,
        explanation: 'The text says "mi plato favorito es el pollo al horno con patatas".'
      },
      {
        prompt: '¿Cuándo va normalmente al restaurante?',
        options: ['Los sábados al mediodía', 'Los domingos por la tarde', 'Los viernes por la noche', 'Todos los días'],
        correct: 2,
        explanation: 'The text says "normalmente voy los viernes por la noche".'
      },
      {
        prompt: '¿Por qué reservan mesa?',
        options: ['Porque es muy caro', 'Porque está lejos', 'Porque el restaurante se llena rápido', 'Porque Antonio se lo pide'],
        correct: 2,
        explanation: 'The text says "siempre reservamos mesa porque el restaurante se llena rápido".'
      }
    ]
  },

  {
    id: 'read-56',
    level: 'A2',
    title: 'El mercado del pueblo',
    titleEn: 'The Town Market',
    text: 'Todos los sábados por la mañana hay un mercado en la plaza principal de mi pueblo. Los vendedores llegan muy temprano para preparar sus puestos. Hay frutas, verduras, quesos, pan recién hecho y también ropa y artesanías. A mí me gusta ir pronto porque hay más variedad y todo está más fresco. Siempre compro tomates, naranjas y un pan grande para toda la semana. La señora que vende queso me conoce y a veces me da una muestra para probar. El ambiente del mercado es muy alegre, la gente habla, ríe y saluda a sus vecinos. Es una tradición que me encanta de vivir en un pueblo pequeño.',
    vocab: [
      { word: 'puestos', english: 'stalls / stands' },
      { word: 'artesanías', english: 'handicrafts' },
      { word: 'variedad', english: 'variety' },
      { word: 'muestra', english: 'sample' },
      { word: 'ambiente', english: 'atmosphere' }
    ],
    questions: [
      {
        prompt: '¿Cuándo hay mercado en el pueblo?',
        options: ['Los domingos', 'Los sábados por la mañana', 'Todos los días', 'Los viernes por la tarde'],
        correct: 1,
        explanation: 'The text says "todos los sábados por la mañana hay un mercado".'
      },
      {
        prompt: '¿Por qué le gusta ir pronto al mercado?',
        options: ['Porque hay menos gente', 'Porque es más barato', 'Porque hay más variedad y todo está más fresco', 'Porque la señora del queso solo está por la mañana'],
        correct: 2,
        explanation: 'The text says "me gusta ir pronto porque hay más variedad y todo está más fresco".'
      },
      {
        prompt: '¿Qué compra siempre en el mercado?',
        options: ['Queso y pan', 'Ropa y artesanías', 'Tomates, naranjas y pan', 'Frutas y verduras variadas'],
        correct: 2,
        explanation: 'The text says "siempre compro tomates, naranjas y un pan grande".'
      },
      {
        prompt: '¿Qué hace la señora que vende queso?',
        options: ['Le da un descuento', 'Le guarda los mejores quesos', 'Le da una muestra para probar', 'Le recomienda recetas'],
        correct: 2,
        explanation: 'The text says "a veces me da una muestra para probar".'
      }
    ]
  }

];
