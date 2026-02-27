const HISTORY_DATA = [
  {
    id: "history-aztec",
    spanishName: "Imperio Azteca",
    englishName: "Aztec Empire",
    icon: "🦅",
    tags: ["México", "Tenochtitlán", "Moctezuma", "precolombino", "mesoamérica"],
    descEs: "El Imperio Azteca (1325-1521) fue una de las civilizaciones más poderosas de Mesoamérica. Los mexicas fundaron Tenochtitlán en 1325 en una isla del lago de Texcoco, donde vieron la señal profetizada: un águila devorando una serpiente sobre un nopal. Esta imagen aparece hoy en la bandera de México. El imperio se expandió mediante alianzas y conquistas, alcanzando unos 25 millones de habitantes. Tenían un sistema de escritura pictográfica, un calendario de 365 días, mercados enormes como Tlatelolco y templos piramidales. Hernán Cortés conquistó el imperio en 1521.",
    descEn: "The Aztec Empire (1325-1521) was one of the most powerful civilizations in Mesoamerica. The Mexica founded Tenochtitlán in 1325 on an island in Lake Texcoco, where they saw the prophesied sign: an eagle devouring a serpent atop a cactus. This image appears today on Mexico's flag. The empire expanded through alliances and conquests, reaching about 25 million inhabitants. They had a pictographic writing system, a 365-day calendar, enormous markets like Tlatelolco, and pyramid temples. Hernán Cortés conquered the empire in 1521.",
    vocab: [
      { word: "imperio", english: "empire" },
      { word: "águila", english: "eagle" },
      { word: "serpiente", english: "serpent" },
      { word: "templo", english: "temple" },
      { word: "guerrero", english: "warrior" },
      { word: "sacrificio", english: "sacrifice" }
    ],
    quiz: [
      {
        prompt: "¿En qué año fue fundada Tenochtitlán?",
        options: ["1200", "1325", "1400", "1450"],
        correct: 1
      },
      {
        prompt: "¿Qué imagen de la fundación azteca aparece en la bandera mexicana?",
        options: ["Un jaguar sobre una pirámide", "Un águila devorando una serpiente", "Un guerrero con escudo", "Un sol sobre un lago"],
        correct: 1
      },
      {
        prompt: "¿Quién conquistó el Imperio Azteca?",
        options: ["Francisco Pizarro", "Hernán Cortés", "Pedro de Alvarado", "Cristóbal Colón"],
        correct: 1
      }
    ]
  },
  {
    id: "history-inca",
    spanishName: "Imperio Inca",
    englishName: "Inca Empire",
    icon: "🏔️",
    tags: ["Perú", "Cusco", "Andes", "Machu Picchu", "quechua"],
    descEs: "El Imperio Inca, o Tawantinsuyu ('las cuatro regiones'), fue el mayor imperio de la América precolombina. Con capital en Cusco, se extendía desde Colombia hasta Chile. Los incas construyeron una red de caminos de 40.000 kilómetros llamada Qhapaq Ñan, sin usar la rueda. Usaban quipus (cuerdas con nudos) para llevar registros. Machu Picchu, construida por Pachacútec en el siglo XV, es su monumento más famoso. Francisco Pizarro capturó al último emperador, Atahualpa, en Cajamarca en 1532.",
    descEn: "The Inca Empire, or Tawantinsuyu ('the four regions'), was the largest empire in pre-Columbian America. With its capital in Cusco, it stretched from Colombia to Chile. The Incas built a 40,000-kilometer road network called Qhapaq Ñan, without using the wheel. They used quipus (knotted cords) for record-keeping. Machu Picchu, built by Pachacútec in the 15th century, is their most famous monument. Francisco Pizarro captured the last emperor, Atahualpa, in Cajamarca in 1532.",
    vocab: [
      { word: "camino", english: "road/path" },
      { word: "quipu", english: "knotted cord" },
      { word: "emperador", english: "emperor" },
      { word: "fortaleza", english: "fortress" },
      { word: "terrazas", english: "terraces" },
      { word: "piedra", english: "stone" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llamaba el sistema de caminos del Imperio Inca?",
        options: ["Camino Real", "Qhapaq Ñan", "Ruta del Sol", "Sendero Sagrado"],
        correct: 1
      },
      {
        prompt: "¿Qué eran los quipus?",
        options: ["Monedas de oro", "Cuerdas con nudos para registros", "Armas de guerra", "Instrumentos musicales"],
        correct: 1
      },
      {
        prompt: "¿Quién capturó al emperador Atahualpa?",
        options: ["Hernán Cortés", "Pedro de Valdivia", "Francisco Pizarro", "Diego de Almagro"],
        correct: 2
      }
    ]
  },
  {
    id: "history-maya",
    spanishName: "Civilización Maya",
    englishName: "Maya Civilization",
    icon: "🔢",
    tags: ["Guatemala", "México", "Honduras", "matemáticas", "escritura"],
    descEs: "La civilización maya floreció durante más de 3.000 años en Mesoamérica, abarcando los actuales México, Guatemala, Belice, Honduras y El Salvador. Los mayas desarrollaron el único sistema de escritura completo en las Américas precolombinas, un calendario más preciso que el gregoriano, el concepto del cero en matemáticas y una arquitectura monumental con ciudades como Tikal, Palenque y Chichén Itzá. Aunque su período clásico decayó hacia el siglo IX, los mayas nunca desaparecieron: hoy más de seis millones de personas hablan lenguas mayas.",
    descEn: "Maya civilization flourished for over 3,000 years in Mesoamerica, spanning present-day Mexico, Guatemala, Belize, Honduras, and El Salvador. The Maya developed the only complete writing system in the pre-Columbian Americas, a calendar more precise than the Gregorian, the concept of zero in mathematics, and monumental architecture with cities like Tikal, Palenque, and Chichén Itzá. Although their classical period declined around the 9th century, the Maya never disappeared: today over six million people speak Mayan languages.",
    vocab: [
      { word: "pirámide", english: "pyramid" },
      { word: "jeroglífico", english: "hieroglyph" },
      { word: "calendario", english: "calendar" },
      { word: "cero", english: "zero" },
      { word: "ciudad-estado", english: "city-state" },
      { word: "escritura", english: "writing" }
    ],
    quiz: [
      {
        prompt: "¿Qué concepto matemático desarrollaron los mayas que era revolucionario?",
        options: ["La multiplicación", "El cero", "Las fracciones", "La geometría"],
        correct: 1
      },
      {
        prompt: "¿Cuál de estas NO es una ciudad maya?",
        options: ["Tikal", "Palenque", "Tenochtitlán", "Chichén Itzá"],
        correct: 2
      },
      {
        prompt: "¿Cuántas personas hablan lenguas mayas hoy en día?",
        options: ["Ninguna", "Unas mil", "Más de seis millones", "Cien millones"],
        correct: 2
      }
    ]
  },
  {
    id: "history-conquistadores",
    spanishName: "Los Conquistadores Españoles",
    englishName: "The Spanish Conquistadors",
    icon: "⚔️",
    tags: ["España", "conquista", "siglo XVI", "Colón", "colonización"],
    descEs: "Los conquistadores españoles llegaron a América a partir de 1492 con Cristóbal Colón. En pocas décadas, un reducido número de españoles conquistó vastos imperios: Hernán Cortés derrotó al Imperio Azteca (1519-1521) y Francisco Pizarro al Imperio Inca (1532-1533). Las razones de su éxito incluyen armas de fuego, caballos, alianzas con pueblos indígenas enemigos y, sobre todo, las enfermedades europeas como la viruela, que diezmaron a las poblaciones indígenas. La colonización transformó permanentemente las culturas, lenguas y sociedades de las Américas.",
    descEn: "The Spanish conquistadors arrived in the Americas starting in 1492 with Christopher Columbus. In just a few decades, a small number of Spaniards conquered vast empires: Hernán Cortés defeated the Aztec Empire (1519-1521) and Francisco Pizarro the Inca Empire (1532-1533). Reasons for their success include firearms, horses, alliances with enemy indigenous peoples, and above all, European diseases like smallpox, which decimated indigenous populations. Colonization permanently transformed the cultures, languages, and societies of the Americas.",
    vocab: [
      { word: "conquista", english: "conquest" },
      { word: "colonia", english: "colony" },
      { word: "enfermedad", english: "disease" },
      { word: "espada", english: "sword" },
      { word: "caballo", english: "horse" },
      { word: "alianza", english: "alliance" }
    ],
    quiz: [
      {
        prompt: "¿En qué año llegó Colón a América?",
        options: ["1482", "1492", "1502", "1512"],
        correct: 1
      },
      {
        prompt: "¿Cuál fue la causa principal de muerte entre los indígenas durante la conquista?",
        options: ["Las batallas", "El hambre", "Las enfermedades europeas", "La esclavitud"],
        correct: 2
      },
      {
        prompt: "¿Quién conquistó el Imperio Inca?",
        options: ["Hernán Cortés", "Cristóbal Colón", "Francisco Pizarro", "Vasco de Gama"],
        correct: 2
      }
    ]
  },
  {
    id: "history-independencia",
    spanishName: "Movimientos de Independencia",
    englishName: "Independence Movements",
    icon: "🏛️",
    tags: ["latinoamérica", "siglo XIX", "Bolívar", "libertad", "revolución"],
    descEs: "Los movimientos de independencia latinoamericanos se desarrollaron entre 1810 y 1825, inspirados por la Revolución Francesa y la independencia de Estados Unidos. Simón Bolívar, 'El Libertador', lideró la independencia de Venezuela, Colombia, Ecuador, Perú y Bolivia. José de San Martín liberó Argentina, Chile y Perú. En México, el Grito de Dolores del cura Miguel Hidalgo en 1810 inició la lucha. Cada país celebra su independencia en diferentes fechas, pero todos comparten el espíritu de libertad del dominio colonial español.",
    descEn: "Latin American independence movements developed between 1810 and 1825, inspired by the French Revolution and American independence. Simón Bolívar, 'The Liberator,' led the independence of Venezuela, Colombia, Ecuador, Peru, and Bolivia. José de San Martín liberated Argentina, Chile, and Peru. In Mexico, the Grito de Dolores by priest Miguel Hidalgo in 1810 began the struggle. Each country celebrates its independence on different dates, but all share the spirit of freedom from Spanish colonial rule.",
    vocab: [
      { word: "independencia", english: "independence" },
      { word: "libertador", english: "liberator" },
      { word: "grito", english: "shout/cry" },
      { word: "patria", english: "homeland" },
      { word: "colonia", english: "colony" },
      { word: "república", english: "republic" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se le conoce a Simón Bolívar?",
        options: ["El Conquistador", "El Libertador", "El Presidente", "El General"],
        correct: 1
      },
      {
        prompt: "¿Qué evento inició la independencia de México en 1810?",
        options: ["La Batalla de Puebla", "El Grito de Dolores", "El Tratado de Córdoba", "La Noche Triste"],
        correct: 1
      },
      {
        prompt: "¿Quién liberó a Argentina y Chile?",
        options: ["Simón Bolívar", "José de San Martín", "Bernardo O'Higgins", "Antonio José de Sucre"],
        correct: 1
      }
    ]
  },
  {
    id: "history-revolucion-mexicana",
    spanishName: "Revolución Mexicana",
    englishName: "Mexican Revolution",
    icon: "🇲🇽",
    tags: ["México", "1910", "Zapata", "Villa", "tierra"],
    descEs: "La Revolución Mexicana (1910-1920) fue uno de los conflictos armados más importantes del siglo XX en América Latina. Comenzó como una rebelión contra la dictadura de Porfirio Díaz y se convirtió en una guerra civil compleja. Emiliano Zapata luchó por la reforma agraria con el lema 'Tierra y libertad'. Pancho Villa lideró la División del Norte. Francisco Madero inició la revolución con el Plan de San Luis. La Constitución de 1917, una de las más progresistas de su época, fue resultado directo de la revolución.",
    descEn: "The Mexican Revolution (1910-1920) was one of the most important armed conflicts of the 20th century in Latin America. It began as a rebellion against the dictatorship of Porfirio Díaz and became a complex civil war. Emiliano Zapata fought for agrarian reform with the motto 'Tierra y libertad' (Land and liberty). Pancho Villa led the Division of the North. Francisco Madero started the revolution with the Plan de San Luis. The Constitution of 1917, one of the most progressive of its era, was a direct result of the revolution.",
    vocab: [
      { word: "revolución", english: "revolution" },
      { word: "tierra", english: "land" },
      { word: "libertad", english: "liberty/freedom" },
      { word: "campesino", english: "peasant/farmer" },
      { word: "dictadura", english: "dictatorship" },
      { word: "constitución", english: "constitution" }
    ],
    quiz: [
      {
        prompt: "¿Cuál era el lema de Emiliano Zapata?",
        options: ["Viva México", "Tierra y libertad", "Patria o muerte", "Pan y trabajo"],
        correct: 1
      },
      {
        prompt: "¿Contra qué dictador comenzó la Revolución Mexicana?",
        options: ["Santa Anna", "Porfirio Díaz", "Maximiliano", "Huerta"],
        correct: 1
      },
      {
        prompt: "¿En qué año se promulgó la Constitución resultante de la revolución?",
        options: ["1910", "1913", "1917", "1920"],
        correct: 2
      }
    ]
  },
  {
    id: "history-guerra-civil-espanola",
    spanishName: "Guerra Civil Española",
    englishName: "Spanish Civil War",
    icon: "⚔️",
    tags: ["España", "1936", "Franco", "república", "dictadura"],
    descEs: "La Guerra Civil Española (1936-1939) enfrentó al bando republicano (gobierno legítimo, izquierda) contra el bando nacional (sublevados, derecha, liderados por Francisco Franco). El conflicto comenzó con un golpe de estado militar y se convirtió en un campo de pruebas para la Segunda Guerra Mundial: Alemania nazi e Italia fascista apoyaron a Franco, mientras la Unión Soviética apoyó a la República. El bombardeo de Guernica inspiró el famoso cuadro de Picasso. Franco ganó e instauró una dictadura que duró hasta su muerte en 1975.",
    descEn: "The Spanish Civil War (1936-1939) pitted the Republican side (legitimate government, left) against the Nationalist side (rebels, right, led by Francisco Franco). The conflict began with a military coup and became a testing ground for World War II: Nazi Germany and Fascist Italy supported Franco, while the Soviet Union supported the Republic. The bombing of Guernica inspired Picasso's famous painting. Franco won and established a dictatorship that lasted until his death in 1975.",
    vocab: [
      { word: "guerra civil", english: "civil war" },
      { word: "república", english: "republic" },
      { word: "dictadura", english: "dictatorship" },
      { word: "golpe de estado", english: "coup d'état" },
      { word: "bombardeo", english: "bombing" },
      { word: "exilio", english: "exile" }
    ],
    quiz: [
      {
        prompt: "¿En qué años se desarrolló la Guerra Civil Española?",
        options: ["1930-1933", "1936-1939", "1939-1945", "1940-1944"],
        correct: 1
      },
      {
        prompt: "¿Qué famoso cuadro pintó Picasso sobre un bombardeo de la guerra?",
        options: ["Las Meninas", "Guernica", "La Persistencia de la Memoria", "El Grito"],
        correct: 1
      },
      {
        prompt: "¿Hasta qué año duró la dictadura de Franco?",
        options: ["1965", "1970", "1975", "1980"],
        correct: 2
      }
    ]
  },
  {
    id: "history-revolucion-cubana",
    spanishName: "Revolución Cubana",
    englishName: "Cuban Revolution",
    icon: "🇨🇺",
    tags: ["Cuba", "1959", "Fidel Castro", "Che Guevara", "socialismo"],
    descEs: "La Revolución Cubana (1953-1959) derrocó la dictadura de Fulgencio Batista e instaló un gobierno socialista liderado por Fidel Castro. El 26 de julio de 1953, Castro atacó el cuartel Moncada, fracasando pero iniciando el movimiento revolucionario. En 1956, Castro, Ernesto 'Che' Guevara y 80 guerrilleros desembarcaron del yate Granma. Desde la Sierra Maestra organizaron la guerrilla que tomó el poder el 1 de enero de 1959. La revolución transformó Cuba radicalmente: nacionalizó empresas, implementó educación y salud universal, pero también limitó libertades civiles.",
    descEn: "The Cuban Revolution (1953-1959) overthrew the dictatorship of Fulgencio Batista and installed a socialist government led by Fidel Castro. On July 26, 1953, Castro attacked the Moncada Barracks, failing but launching the revolutionary movement. In 1956, Castro, Ernesto 'Che' Guevara, and 80 guerrillas landed from the yacht Granma. From the Sierra Maestra they organized the guerrilla that took power on January 1, 1959. The revolution radically transformed Cuba: nationalized businesses, implemented universal education and healthcare, but also restricted civil liberties.",
    vocab: [
      { word: "revolución", english: "revolution" },
      { word: "guerrilla", english: "guerrilla" },
      { word: "dictadura", english: "dictatorship" },
      { word: "socialismo", english: "socialism" },
      { word: "embargo", english: "embargo" },
      { word: "sierra", english: "mountain range" }
    ],
    quiz: [
      {
        prompt: "¿En qué año triunfó la Revolución Cubana?",
        options: ["1953", "1956", "1959", "1962"],
        correct: 2
      },
      {
        prompt: "¿Cómo se llamaba el yate en el que llegaron los guerrilleros?",
        options: ["Libertad", "Victoria", "Granma", "Sierra"],
        correct: 2
      },
      {
        prompt: "¿A qué dictador derrocó la revolución?",
        options: ["Trujillo", "Somoza", "Batista", "Pinochet"],
        correct: 2
      }
    ]
  },
  {
    id: "history-arte-precolombino",
    spanishName: "Arte Precolombino",
    englishName: "Pre-Columbian Art",
    icon: "🗿",
    tags: ["latinoamérica", "escultura", "cerámica", "oro", "civilización"],
    descEs: "El arte precolombino abarca las creaciones artísticas de las civilizaciones americanas antes de la llegada de Colón. Los olmecas crearon cabezas colosales de basalto. Los mayas pintaron murales detallados en Bonampak y tallaron estelas con jeroglíficos. Los aztecas crearon la Piedra del Sol (calendario azteca) y esculturas monumentales. Los incas dominaron la arquitectura en piedra sin mortero en Machu Picchu y Sacsayhuamán. Los mochicas del Perú crearon cerámicas realistas. Los muiscas de Colombia trabajaron el oro magistralmente, inspirando la leyenda de El Dorado.",
    descEn: "Pre-Columbian art encompasses the artistic creations of American civilizations before Columbus's arrival. The Olmecs created colossal basalt heads. The Maya painted detailed murals in Bonampak and carved stelae with hieroglyphs. The Aztecs created the Sun Stone (Aztec calendar) and monumental sculptures. The Incas mastered mortarless stone architecture at Machu Picchu and Sacsayhuamán. Peru's Moche created realistic ceramics. Colombia's Muisca worked gold masterfully, inspiring the legend of El Dorado.",
    vocab: [
      { word: "escultura", english: "sculpture" },
      { word: "cerámica", english: "ceramics" },
      { word: "mural", english: "mural" },
      { word: "orfebrería", english: "goldwork" },
      { word: "tallado", english: "carving" },
      { word: "arquitectura", english: "architecture" }
    ],
    quiz: [
      {
        prompt: "¿Qué civilización creó las cabezas colosales de basalto?",
        options: ["Azteca", "Maya", "Olmeca", "Tolteca"],
        correct: 2
      },
      {
        prompt: "¿Qué es la Piedra del Sol?",
        options: ["Una joya inca", "El calendario azteca", "Un mural maya", "Una máscara olmeca"],
        correct: 1
      },
      {
        prompt: "¿Qué técnica arquitectónica dominaron los incas?",
        options: ["Uso de cemento", "Piedra sin mortero", "Ladrillos de adobe", "Madera tallada"],
        correct: 1
      }
    ]
  },
  {
    id: "history-latinoamerica-moderna",
    spanishName: "Latinoamérica Moderna",
    englishName: "Modern Latin America",
    icon: "🌎",
    tags: ["siglo XX", "democracia", "economía", "cultura", "globalización"],
    descEs: "La Latinoamérica moderna ha experimentado dictaduras militares, transiciones democráticas y profundas transformaciones sociales. En los años setenta y ochenta, dictaduras gobernaron Argentina, Chile, Brasil y Uruguay. La 'Guerra Sucia' argentina y el régimen de Pinochet en Chile dejaron miles de desaparecidos. Las transiciones democráticas de los años ochenta y noventa trajeron esperanza. Hoy, Latinoamérica es una región diversa con economías emergentes como México, Colombia y Chile, un rico patrimonio cultural y desafíos como la desigualdad, la migración y el cambio climático.",
    descEn: "Modern Latin America has experienced military dictatorships, democratic transitions, and profound social transformations. In the 1970s and 1980s, dictatorships ruled Argentina, Chile, Brazil, and Uruguay. Argentina's 'Dirty War' and Pinochet's regime in Chile left thousands of disappeared. Democratic transitions in the 1980s and 1990s brought hope. Today, Latin America is a diverse region with emerging economies like Mexico, Colombia, and Chile, rich cultural heritage, and challenges like inequality, migration, and climate change.",
    vocab: [
      { word: "democracia", english: "democracy" },
      { word: "desigualdad", english: "inequality" },
      { word: "desaparecidos", english: "disappeared persons" },
      { word: "transición", english: "transition" },
      { word: "derechos humanos", english: "human rights" },
      { word: "migración", english: "migration" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llama el período de represión militar en Argentina?",
        options: ["La Gran Crisis", "La Guerra Sucia", "El Proceso Militar", "La Dictadura Oscura"],
        correct: 1
      },
      {
        prompt: "¿En qué décadas hubo dictaduras militares en el Cono Sur?",
        options: ["Años cincuenta y sesenta", "Años sesenta y setenta", "Años setenta y ochenta", "Años ochenta y noventa"],
        correct: 2
      },
      {
        prompt: "¿Qué dictador gobernó Chile desde 1973 hasta 1990?",
        options: ["Videla", "Stroessner", "Pinochet", "Trujillo"],
        correct: 2
      }
    ]
  }
];
