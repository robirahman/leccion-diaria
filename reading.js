'use strict';

// ════════════════════════════════════════════════════════════
//  READING COMPREHENSION — Graded passages with vocabulary
//  31 passages: 5 A1, 5 A2, 5 B1, 4 B2, 6 C1, 6 C2
// ════════════════════════════════════════════════════════════

const READING_DATA = [

  // ─────────────────────────────────────────────────────────
  //  A1  —  Simple present, basic vocabulary (50-80 words)
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

  // ─────────────────────────────────────────────────────────
  //  A2  —  Past tenses introduced, travel/shopping (80-120 words)
  // ─────────────────────────────────────────────────────────

  {
    id: 'read-6',
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
    id: 'read-7',
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
    id: 'read-8',
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
    id: 'read-9',
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
    id: 'read-10',
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
    id: 'read-11',
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
    id: 'read-12',
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
    id: 'read-13',
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
    id: 'read-14',
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
    id: 'read-15',
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
    id: 'read-16',
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
    id: 'read-17',
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
    id: 'read-18',
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
    id: 'read-19',
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
    id: 'read-20',
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
    id: 'read-21',
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
    id: 'read-22',
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
    id: 'read-23',
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
    id: 'read-24',
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
    id: 'read-25',
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
    id: 'read-26',
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
    id: 'read-27',
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
    id: 'read-28',
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
    id: 'read-29',
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
    id: 'read-30',
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
    id: 'read-31',
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
  }

];
