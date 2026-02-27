const TRAVEL_DATA = [
  {
    id: "travel-mexico-city",
    spanishName: "Ciudad de México",
    englishName: "Mexico City",
    icon: "🏛️",
    tags: ["México", "capital", "historia", "gastronomía", "cultura"],
    descEs: "Ciudad de México, también conocida como CDMX, es la capital de México y una de las ciudades más grandes del mundo con más de 21 millones de habitantes en su área metropolitana. Construida sobre las ruinas de Tenochtitlán, la capital azteca, combina historia prehispánica, colonial y moderna. El Zócalo es una de las plazas más grandes del mundo. El Museo Nacional de Antropología es imprescindible. Sus colonias como Roma, Condesa y Coyoacán ofrecen gastronomía, arte y vida nocturna extraordinarias. Xochimilco, con sus trajineras coloridas, es Patrimonio de la Humanidad.",
    descEn: "Mexico City, also known as CDMX, is the capital of Mexico and one of the largest cities in the world with over 21 million inhabitants in its metropolitan area. Built on the ruins of Tenochtitlán, the Aztec capital, it combines pre-Hispanic, colonial, and modern history. The Zócalo is one of the largest squares in the world. The National Museum of Anthropology is a must-visit. Its neighborhoods like Roma, Condesa, and Coyoacán offer extraordinary gastronomy, art, and nightlife. Xochimilco, with its colorful boats, is a World Heritage Site.",
    vocab: [
      { word: "capital", english: "capital city" },
      { word: "museo", english: "museum" },
      { word: "plaza", english: "square/plaza" },
      { word: "colonia", english: "neighborhood" },
      { word: "trajinera", english: "colorful boat" },
      { word: "catedral", english: "cathedral" }
    ],
    quiz: [
      {
        prompt: "¿Sobre qué ciudad antigua fue construida Ciudad de México?",
        options: ["Tula", "Tenochtitlán", "Palenque", "Cholula"],
        correct: 1
      },
      {
        prompt: "¿Cómo se llama la plaza principal de Ciudad de México?",
        options: ["Plaza Mayor", "El Zócalo", "Plaza de la Constitución", "Plaza Central"],
        correct: 1
      },
      {
        prompt: "¿Qué sitio Patrimonio de la Humanidad tiene trajineras coloridas?",
        options: ["Chapultepec", "Coyoacán", "Xochimilco", "Teotihuacán"],
        correct: 2
      }
    ]
  },
  {
    id: "travel-barcelona",
    spanishName: "Barcelona",
    englishName: "Barcelona",
    icon: "⛪",
    tags: ["España", "Cataluña", "Gaudí", "Mediterráneo", "arquitectura"],
    descEs: "Barcelona es la capital de Cataluña y la segunda ciudad más grande de España. Es famosa por la arquitectura modernista de Antoni Gaudí, incluyendo la Sagrada Familia (en construcción desde 1882), el Parque Güell y la Casa Batlló. Las Ramblas son su paseo más famoso, que lleva hasta el mercado de La Boquería. El Barrio Gótico tiene calles medievales laberínticas. Barcelona combina playa mediterránea con cultura urbana, una gastronomía excepcional y la pasión por el FC Barcelona. Es una ciudad bilingüe donde se habla catalán y castellano.",
    descEn: "Barcelona is the capital of Catalonia and Spain's second-largest city. It is famous for the modernist architecture of Antoni Gaudí, including the Sagrada Familia (under construction since 1882), Park Güell, and Casa Batlló. Las Ramblas is its most famous promenade, leading to La Boquería market. The Gothic Quarter has labyrinthine medieval streets. Barcelona combines Mediterranean beach with urban culture, exceptional gastronomy, and passion for FC Barcelona. It is a bilingual city where Catalan and Spanish are spoken.",
    vocab: [
      { word: "iglesia", english: "church" },
      { word: "arquitectura", english: "architecture" },
      { word: "paseo", english: "promenade/walk" },
      { word: "mercado", english: "market" },
      { word: "playa", english: "beach" },
      { word: "barrio", english: "neighborhood/quarter" }
    ],
    quiz: [
      {
        prompt: "¿Quién diseñó la Sagrada Familia?",
        options: ["Pablo Picasso", "Antoni Gaudí", "Salvador Dalí", "Joan Miró"],
        correct: 1
      },
      {
        prompt: "¿Desde qué año está en construcción la Sagrada Familia?",
        options: ["1850", "1872", "1882", "1902"],
        correct: 2
      },
      {
        prompt: "¿Qué dos lenguas se hablan en Barcelona?",
        options: ["Español y portugués", "Catalán y castellano", "Gallego y castellano", "Vasco y castellano"],
        correct: 1
      }
    ]
  },
  {
    id: "travel-buenos-aires",
    spanishName: "Buenos Aires",
    englishName: "Buenos Aires",
    icon: "🕺",
    tags: ["Argentina", "tango", "Europa", "carne", "cultura"],
    descEs: "Buenos Aires, capital de Argentina, es conocida como el 'París de Sudamérica' por su arquitectura europea, amplios bulevares y rica vida cultural. El barrio de San Telmo es famoso por sus milongas (salones de tango) y mercados de antigüedades. La Boca, con sus casas coloridas de Caminito, es icónico. Puerto Madero es la zona moderna. El cementerio de Recoleta alberga la tumba de Eva Perón. La gastronomía porteña destaca por sus asados, empanadas y alfajores. El Teatro Colón es uno de los mejores teatros de ópera del mundo.",
    descEn: "Buenos Aires, capital of Argentina, is known as the 'Paris of South America' for its European architecture, wide boulevards, and rich cultural life. The San Telmo neighborhood is famous for its milongas (tango halls) and antique markets. La Boca, with its colorful Caminito houses, is iconic. Puerto Madero is the modern area. Recoleta Cemetery houses Eva Perón's tomb. Porteño gastronomy stands out for its asados, empanadas, and alfajores. Teatro Colón is one of the best opera houses in the world.",
    vocab: [
      { word: "porteño", english: "from Buenos Aires" },
      { word: "milonga", english: "tango dance hall" },
      { word: "asado", english: "barbecue" },
      { word: "bulevar", english: "boulevard" },
      { word: "cementerio", english: "cemetery" },
      { word: "antigüedades", english: "antiques" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se conoce a Buenos Aires?",
        options: ["La Ciudad de la Furia", "El París de Sudamérica", "La Gran Manzana del Sur", "La Ciudad del Tango"],
        correct: 1
      },
      {
        prompt: "¿Qué barrio es famoso por sus casas coloridas?",
        options: ["San Telmo", "Palermo", "La Boca", "Recoleta"],
        correct: 2
      },
      {
        prompt: "¿Quién está enterrada en el cementerio de Recoleta?",
        options: ["Gabriela Mistral", "Eva Perón", "Frida Kahlo", "Isabel Allende"],
        correct: 1
      }
    ]
  },
  {
    id: "travel-machu-picchu",
    spanishName: "Machu Picchu",
    englishName: "Machu Picchu",
    icon: "🏔️",
    tags: ["Perú", "inca", "montaña", "Patrimonio", "maravilla"],
    descEs: "Machu Picchu es una ciudadela inca del siglo XV ubicada a 2.430 metros de altura en los Andes peruanos, cerca de Cusco. Fue construida por el emperador Pachacútec y abandonada durante la conquista española. Permaneció oculta al mundo exterior hasta 1911, cuando el explorador Hiram Bingham la dio a conocer internacionalmente. Es Patrimonio de la Humanidad y una de las Nuevas Siete Maravillas del Mundo. Se puede llegar por tren desde Ollantaytambo o caminando el Camino Inca de cuatro días.",
    descEn: "Machu Picchu is a 15th-century Inca citadel located at 2,430 meters altitude in the Peruvian Andes, near Cusco. It was built by Emperor Pachacútec and abandoned during the Spanish conquest. It remained hidden from the outside world until 1911, when explorer Hiram Bingham brought it to international attention. It is a World Heritage Site and one of the New Seven Wonders of the World. It can be reached by train from Ollantaytambo or by hiking the four-day Inca Trail.",
    vocab: [
      { word: "ciudadela", english: "citadel" },
      { word: "ruinas", english: "ruins" },
      { word: "altura", english: "altitude/height" },
      { word: "montaña", english: "mountain" },
      { word: "sendero", english: "trail/path" },
      { word: "terraza", english: "terrace" }
    ],
    quiz: [
      {
        prompt: "¿Qué emperador inca construyó Machu Picchu?",
        options: ["Atahualpa", "Huayna Cápac", "Pachacútec", "Túpac Inca"],
        correct: 2
      },
      {
        prompt: "¿En qué año fue dada a conocer internacionalmente?",
        options: ["1892", "1901", "1911", "1924"],
        correct: 2
      },
      {
        prompt: "¿Cuántos días dura la caminata del Camino Inca?",
        options: ["Dos", "Tres", "Cuatro", "Cinco"],
        correct: 2
      }
    ]
  },
  {
    id: "travel-havana",
    spanishName: "La Habana",
    englishName: "Havana",
    icon: "🚗",
    tags: ["Cuba", "colonial", "música", "coches antiguos", "malecón"],
    descEs: "La Habana, capital de Cuba, es una ciudad detenida en el tiempo donde coches americanos clásicos de los años cincuenta recorren calles con edificios coloniales. La Habana Vieja, Patrimonio de la Humanidad, tiene plazas coloniales como la Plaza de la Catedral y la Plaza Vieja. El Malecón, un paseo marítimo de ocho kilómetros, es el alma de la ciudad. La música suena en cada esquina: son, salsa, bolero y jazz. El Tropicana es el cabaret más famoso del Caribe. Los habanos (puros) y el ron son símbolos de Cuba.",
    descEn: "Havana, capital of Cuba, is a city frozen in time where classic American cars from the 1950s drive through streets with colonial buildings. Old Havana, a World Heritage Site, has colonial squares like Plaza de la Catedral and Plaza Vieja. The Malecón, a five-mile seaside promenade, is the soul of the city. Music sounds on every corner: son, salsa, bolero, and jazz. Tropicana is the Caribbean's most famous cabaret. Havana cigars and rum are symbols of Cuba.",
    vocab: [
      { word: "coche clásico", english: "classic car" },
      { word: "malecón", english: "seaside promenade" },
      { word: "puro/habano", english: "cigar" },
      { word: "ron", english: "rum" },
      { word: "plaza", english: "square" },
      { word: "colonial", english: "colonial" }
    ],
    quiz: [
      {
        prompt: "¿De qué década son los coches clásicos que circulan por La Habana?",
        options: ["Años cuarenta", "Años cincuenta", "Años sesenta", "Años setenta"],
        correct: 1
      },
      {
        prompt: "¿Cómo se llama el famoso paseo marítimo de La Habana?",
        options: ["La Rambla", "El Paseo", "El Malecón", "La Costanera"],
        correct: 2
      },
      {
        prompt: "¿Qué parte de La Habana es Patrimonio de la Humanidad?",
        options: ["El Vedado", "Miramar", "La Habana Vieja", "Centro Habana"],
        correct: 2
      }
    ]
  },
  {
    id: "travel-cartagena",
    spanishName: "Cartagena de Indias",
    englishName: "Cartagena de Indias",
    icon: "🏰",
    tags: ["Colombia", "colonial", "Caribe", "murallas", "Patrimonio"],
    descEs: "Cartagena de Indias es una joya colonial en la costa caribeña de Colombia, declarada Patrimonio de la Humanidad. Su centro histórico amurallado, con calles empedradas, balcones con buganvilias y casonas coloniales coloridas, es uno de los mejor conservados de América. El Castillo de San Felipe de Barajas es la mayor fortaleza española en el Nuevo Mundo. Gabriel García Márquez vivió aquí y la ciudad inspiró varias de sus novelas. Las islas del Rosario, a una hora en barco, ofrecen playas paradisíacas.",
    descEn: "Cartagena de Indias is a colonial gem on Colombia's Caribbean coast, declared a World Heritage Site. Its walled historic center, with cobblestone streets, balconies with bougainvillea, and colorful colonial mansions, is one of the best preserved in the Americas. The Castillo de San Felipe de Barajas is the largest Spanish fortress in the New World. Gabriel García Márquez lived here and the city inspired several of his novels. The Rosario Islands, an hour by boat, offer paradise beaches.",
    vocab: [
      { word: "muralla", english: "wall/rampart" },
      { word: "fortaleza", english: "fortress" },
      { word: "balcón", english: "balcony" },
      { word: "empedrado", english: "cobblestone" },
      { word: "isla", english: "island" },
      { word: "casona", english: "mansion" }
    ],
    quiz: [
      {
        prompt: "¿Qué escritor famoso vivió en Cartagena?",
        options: ["Pablo Neruda", "Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges"],
        correct: 2
      },
      {
        prompt: "¿Cómo se llama la fortaleza más grande de Cartagena?",
        options: ["El Morro", "San Felipe de Barajas", "San Cristóbal", "La Popa"],
        correct: 1
      },
      {
        prompt: "¿Qué islas cercanas ofrecen playas paradisíacas?",
        options: ["Islas del Rosario", "Islas San Bernardo", "Islas Galápagos", "Islas Baleares"],
        correct: 0
      }
    ]
  },
  {
    id: "travel-cusco",
    spanishName: "Cusco",
    englishName: "Cusco",
    icon: "🌄",
    tags: ["Perú", "inca", "colonial", "montaña", "ombligo del mundo"],
    descEs: "Cusco fue la capital del Imperio Inca y es conocida como el 'ombligo del mundo' (qosqo en quechua). A 3.400 metros de altura, la ciudad combina ruinas incas con arquitectura colonial española. Los muros incas de piedra perfectamente tallada, como la famosa Piedra de los Doce Ángulos, sostienen iglesias y casonas coloniales. La Plaza de Armas fue el centro ceremonial inca. Sacsayhuamán, con piedras de hasta 120 toneladas, domina la ciudad. Cusco es la puerta de entrada a Machu Picchu y al Valle Sagrado de los Incas.",
    descEn: "Cusco was the capital of the Inca Empire and is known as the 'navel of the world' (qosqo in Quechua). At 3,400 meters altitude, the city combines Inca ruins with Spanish colonial architecture. The perfectly carved Inca stone walls, like the famous Twelve-Angle Stone, support colonial churches and mansions. The Plaza de Armas was the Inca ceremonial center. Sacsayhuamán, with stones weighing up to 120 tons, overlooks the city. Cusco is the gateway to Machu Picchu and the Sacred Valley of the Incas.",
    vocab: [
      { word: "piedra", english: "stone" },
      { word: "muro", english: "wall" },
      { word: "altura", english: "altitude" },
      { word: "valle", english: "valley" },
      { word: "sagrado", english: "sacred" },
      { word: "inca", english: "Inca" }
    ],
    quiz: [
      {
        prompt: "¿Qué significa 'Cusco' en quechua?",
        options: ["Ciudad sagrada", "Ombligo del mundo", "Tierra alta", "Hogar del sol"],
        correct: 1
      },
      {
        prompt: "¿Cuántos ángulos tiene la famosa piedra inca de Cusco?",
        options: ["Ocho", "Diez", "Doce", "Catorce"],
        correct: 2
      },
      {
        prompt: "¿A qué altitud se encuentra Cusco?",
        options: ["2.400 metros", "3.000 metros", "3.400 metros", "4.000 metros"],
        correct: 2
      }
    ]
  },
  {
    id: "travel-galapagos",
    spanishName: "Islas Galápagos",
    englishName: "Galápagos Islands",
    icon: "🐢",
    tags: ["Ecuador", "naturaleza", "Darwin", "animales", "Patrimonio"],
    descEs: "Las Islas Galápagos son un archipiélago volcánico en el Océano Pacífico, perteneciente a Ecuador, situado a unos mil kilómetros de la costa. Fueron el primer sitio declarado Patrimonio de la Humanidad por la UNESCO en 1978. Charles Darwin visitó las islas en 1835, y sus observaciones de la fauna fueron fundamentales para su teoría de la evolución. Las islas albergan especies únicas como las tortugas gigantes, las iguanas marinas, los piqueros de patas azules y los pinzones de Darwin. El 97% del archipiélago es parque nacional.",
    descEn: "The Galápagos Islands are a volcanic archipelago in the Pacific Ocean, belonging to Ecuador, located about a thousand kilometers from the coast. They were the first site declared a World Heritage Site by UNESCO in 1978. Charles Darwin visited the islands in 1835, and his observations of the fauna were fundamental to his theory of evolution. The islands are home to unique species like giant tortoises, marine iguanas, blue-footed boobies, and Darwin's finches. 97% of the archipelago is a national park.",
    vocab: [
      { word: "isla", english: "island" },
      { word: "tortuga", english: "tortoise/turtle" },
      { word: "volcán", english: "volcano" },
      { word: "evolución", english: "evolution" },
      { word: "especie", english: "species" },
      { word: "archipiélago", english: "archipelago" }
    ],
    quiz: [
      {
        prompt: "¿A qué país pertenecen las Islas Galápagos?",
        options: ["Colombia", "Perú", "Ecuador", "Chile"],
        correct: 2
      },
      {
        prompt: "¿En qué año visitó Darwin las Galápagos?",
        options: ["1820", "1835", "1850", "1870"],
        correct: 1
      },
      {
        prompt: "¿Qué porcentaje del archipiélago es parque nacional?",
        options: ["50%", "75%", "90%", "97%"],
        correct: 3
      }
    ]
  },
  {
    id: "travel-sevilla",
    spanishName: "Sevilla",
    englishName: "Seville",
    icon: "🌞",
    tags: ["España", "Andalucía", "flamenco", "Feria", "Giralda"],
    descEs: "Sevilla es la capital de Andalucía y una de las ciudades más bellas de España. La Giralda, antiguo minarete convertido en campanario de la catedral, es su símbolo. La catedral de Sevilla es la más grande del mundo en estilo gótico. El Real Alcázar, palacio mudéjar, fue escenario de Juego de Tronos. El barrio de Triana es cuna del flamenco. La Plaza de España, construida para la Exposición Iberoamericana de 1929, es espectacular. Sevilla es famosa por su Semana Santa y su Feria de Abril. Las tapas sevillanas son una institución cultural.",
    descEn: "Seville is the capital of Andalusia and one of Spain's most beautiful cities. The Giralda, a former minaret turned cathedral bell tower, is its symbol. Seville's cathedral is the largest Gothic cathedral in the world. The Real Alcázar, a Mudéjar palace, was a filming location for Game of Thrones. The Triana neighborhood is the cradle of flamenco. The Plaza de España, built for the 1929 Ibero-American Exposition, is spectacular. Seville is famous for its Holy Week and April Fair. Sevillian tapas are a cultural institution.",
    vocab: [
      { word: "catedral", english: "cathedral" },
      { word: "palacio", english: "palace" },
      { word: "campanario", english: "bell tower" },
      { word: "barrio", english: "neighborhood" },
      { word: "tapas", english: "small dishes" },
      { word: "azulejos", english: "decorative tiles" }
    ],
    quiz: [
      {
        prompt: "¿Qué era originalmente la Giralda de Sevilla?",
        options: ["Una torre de vigilancia", "Un minarete", "Un faro", "Una torre del reloj"],
        correct: 1
      },
      {
        prompt: "¿Qué barrio de Sevilla es cuna del flamenco?",
        options: ["Santa Cruz", "Macarena", "Triana", "Alameda"],
        correct: 2
      },
      {
        prompt: "¿Qué serie de televisión se filmó en el Real Alcázar?",
        options: ["Breaking Bad", "The Crown", "Juego de Tronos", "Narcos"],
        correct: 2
      }
    ]
  },
  {
    id: "travel-oaxaca",
    spanishName: "Oaxaca",
    englishName: "Oaxaca",
    icon: "🎨",
    tags: ["México", "indígena", "gastronomía", "mezcal", "artesanía"],
    descEs: "Oaxaca es un estado y ciudad en el sur de México, considerado la capital gastronómica y cultural del país. Su cocina incluye siete moles diferentes, chapulines (saltamontes), tlayudas y tamales oaxaqueños. Es la cuna del mezcal artesanal. La ciudad colonial es Patrimonio de la Humanidad con edificios de cantera verde. Monte Albán, la antigua capital zapoteca, domina el valle. Oaxaca tiene la mayor diversidad indígena de México con 16 grupos étnicos. La Guelaguetza y el Día de los Muertos son sus festividades más famosas.",
    descEn: "Oaxaca is a state and city in southern Mexico, considered the gastronomic and cultural capital of the country. Its cuisine includes seven different moles, chapulines (grasshoppers), tlayudas, and Oaxacan tamales. It is the birthplace of artisanal mezcal. The colonial city is a World Heritage Site with green quarry stone buildings. Monte Albán, the ancient Zapotec capital, overlooks the valley. Oaxaca has the greatest indigenous diversity in Mexico with 16 ethnic groups. The Guelaguetza and Day of the Dead are its most famous festivities.",
    vocab: [
      { word: "mole", english: "mole (complex sauce)" },
      { word: "mezcal", english: "mezcal" },
      { word: "artesanía", english: "handicraft" },
      { word: "mercado", english: "market" },
      { word: "chapulín", english: "grasshopper" },
      { word: "cantera", english: "quarry stone" }
    ],
    quiz: [
      {
        prompt: "¿Cuántos tipos de mole tiene la cocina oaxaqueña?",
        options: ["Tres", "Cinco", "Siete", "Nueve"],
        correct: 2
      },
      {
        prompt: "¿Qué antigua ciudad zapoteca se encuentra cerca de Oaxaca?",
        options: ["Teotihuacán", "Mitla", "Monte Albán", "Palenque"],
        correct: 2
      },
      {
        prompt: "¿Cuántos grupos étnicos indígenas tiene Oaxaca?",
        options: ["Ocho", "Doce", "Dieciséis", "Veinte"],
        correct: 2
      }
    ]
  }
];
