const MUSIC_DATA = [
  {
    id: "music-reggaeton",
    spanishName: "Reggaetón",
    englishName: "Reggaeton",
    icon: "🎤",
    tags: ["Puerto Rico", "urbano", "baile", "latino", "moderno"],
    descEs: "El reggaetón es un género musical que nació en Puerto Rico en los años noventa, fusionando reggae en español, hip hop y música caribeña. Se caracteriza por el ritmo 'dembow', derivado del dancehall jamaicano. Artistas como Daddy Yankee, Bad Bunny y J Balvin lo han llevado a la fama mundial. La canción 'Gasolina' de Daddy Yankee (2004) fue clave en su expansión internacional. Hoy es uno de los géneros más escuchados del planeta.",
    descEn: "Reggaeton is a music genre born in Puerto Rico in the 1990s, fusing Spanish-language reggae, hip hop, and Caribbean music. It is characterized by the 'dembow' rhythm, derived from Jamaican dancehall. Artists like Daddy Yankee, Bad Bunny, and J Balvin have brought it to worldwide fame. Daddy Yankee's song 'Gasolina' (2004) was key in its international expansion. Today it is one of the most listened-to genres on the planet.",
    vocab: [
      { word: "ritmo", english: "rhythm" },
      { word: "canción", english: "song" },
      { word: "bailar", english: "to dance" },
      { word: "cantante", english: "singer" },
      { word: "éxito", english: "hit/success" },
      { word: "letra", english: "lyrics" }
    ],
    quiz: [
      {
        prompt: "¿En qué país nació el reggaetón?",
        options: ["Colombia", "Cuba", "Puerto Rico", "República Dominicana"],
        correct: 2
      },
      {
        prompt: "¿Cómo se llama el ritmo característico del reggaetón?",
        options: ["Cumbia", "Dembow", "Son", "Merengue"],
        correct: 1
      },
      {
        prompt: "¿Qué canción de Daddy Yankee fue clave en la expansión internacional del reggaetón?",
        options: ["Despacito", "Gasolina", "Lo Que Pasó Pasó", "Rompe"],
        correct: 1
      }
    ]
  },
  {
    id: "music-salsa",
    spanishName: "Salsa",
    englishName: "Salsa",
    icon: "💃",
    tags: ["Cuba", "Puerto Rico", "Nueva York", "baile", "trompeta"],
    descEs: "La salsa es un género musical y estilo de baile que se desarrolló en Nueva York en los años sesenta y setenta, con raíces en el son cubano, la guaracha y el jazz. El sello discográfico Fania Records fue fundamental en su difusión. Artistas como Celia Cruz, Héctor Lavoe, Rubén Blades y Willie Colón son leyendas del género. Celia Cruz, la 'Reina de la Salsa', popularizó su famoso grito '¡Azúcar!'.",
    descEn: "Salsa is a music genre and dance style that developed in New York in the 1960s and 1970s, with roots in Cuban son, guaracha, and jazz. The Fania Records label was fundamental in its spread. Artists like Celia Cruz, Héctor Lavoe, Rubén Blades, and Willie Colón are legends of the genre. Celia Cruz, the 'Queen of Salsa,' popularized her famous shout '¡Azúcar!' (Sugar!).",
    vocab: [
      { word: "trompeta", english: "trumpet" },
      { word: "clave", english: "clave (rhythm pattern)" },
      { word: "orquesta", english: "orchestra" },
      { word: "sonero", english: "salsa singer" },
      { word: "timbal", english: "timbale drum" },
      { word: "congas", english: "conga drums" }
    ],
    quiz: [
      {
        prompt: "¿En qué ciudad se desarrolló la salsa como género?",
        options: ["La Habana", "San Juan", "Nueva York", "Cali"],
        correct: 2
      },
      {
        prompt: "¿Cuál era el famoso grito de Celia Cruz?",
        options: ["¡Fuego!", "¡Azúcar!", "¡Sabor!", "¡Wepa!"],
        correct: 1
      },
      {
        prompt: "¿Qué sello discográfico fue fundamental para la salsa?",
        options: ["Motown", "Fania Records", "Sony Latin", "Discos Fuentes"],
        correct: 1
      }
    ]
  },
  {
    id: "music-flamenco",
    spanishName: "Flamenco",
    englishName: "Flamenco",
    icon: "🎸",
    tags: ["España", "Andalucía", "guitarra", "cante", "Patrimonio"],
    descEs: "El flamenco es un arte que combina cante (voz), toque (guitarra) y baile, originario de Andalucía, España. Fue declarado Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2010. Sus raíces están en la cultura gitana, árabe, judía y andaluza. Los palos (estilos) incluyen soleá, bulerías, alegrías y seguiriyas. Artistas legendarios incluyen a Paco de Lucía, Camarón de la Isla y Carmen Amaya.",
    descEn: "Flamenco is an art form combining cante (singing), toque (guitar), and baile (dance), originating from Andalusia, Spain. It was declared Intangible Cultural Heritage of Humanity by UNESCO in 2010. Its roots lie in Romani, Arab, Jewish, and Andalusian culture. The palos (styles) include soleá, bulerías, alegrías, and seguiriyas. Legendary artists include Paco de Lucía, Camarón de la Isla, and Carmen Amaya.",
    vocab: [
      { word: "cante", english: "flamenco singing" },
      { word: "toque", english: "guitar playing" },
      { word: "baile", english: "dance" },
      { word: "palmas", english: "handclaps" },
      { word: "zapateado", english: "footwork" },
      { word: "duende", english: "soulful emotion" }
    ],
    quiz: [
      {
        prompt: "¿De qué región de España es originario el flamenco?",
        options: ["Cataluña", "Galicia", "Andalucía", "Castilla"],
        correct: 2
      },
      {
        prompt: "¿Qué significa 'duende' en el contexto del flamenco?",
        options: ["Un instrumento", "Una emoción profunda del alma", "Un tipo de baile", "Un ritmo rápido"],
        correct: 1
      },
      {
        prompt: "¿En qué año declaró la UNESCO al flamenco Patrimonio Inmaterial?",
        options: ["2005", "2008", "2010", "2015"],
        correct: 2
      }
    ]
  },
  {
    id: "music-mariachi",
    spanishName: "Mariachi",
    englishName: "Mariachi",
    icon: "🎺",
    tags: ["México", "Jalisco", "trompeta", "tradición", "serenata"],
    descEs: "El mariachi es una expresión musical tradicional de México, originaria del estado de Jalisco, declarada Patrimonio Cultural Inmaterial por la UNESCO en 2011. Un conjunto típico incluye violines, trompetas, guitarrón, vihuela y guitarra. Los mariachis visten el traje de charro y son esenciales en celebraciones como bodas, quinceañeras y serenatas. La Plaza Garibaldi en Ciudad de México es el lugar más famoso para contratar mariachis.",
    descEn: "Mariachi is a traditional Mexican musical expression, originating from the state of Jalisco, declared Intangible Cultural Heritage by UNESCO in 2011. A typical ensemble includes violins, trumpets, guitarrón, vihuela, and guitar. Mariachis wear the charro suit and are essential at celebrations like weddings, quinceañeras, and serenades. Plaza Garibaldi in Mexico City is the most famous place to hire mariachis.",
    vocab: [
      { word: "serenata", english: "serenade" },
      { word: "traje de charro", english: "charro suit" },
      { word: "guitarrón", english: "large bass guitar" },
      { word: "violín", english: "violin" },
      { word: "vihuela", english: "vihuela (small guitar)" },
      { word: "ranchera", english: "ranchera song" }
    ],
    quiz: [
      {
        prompt: "¿De qué estado mexicano es originario el mariachi?",
        options: ["Oaxaca", "Veracruz", "Jalisco", "Guerrero"],
        correct: 2
      },
      {
        prompt: "¿Cómo se llama la famosa plaza de mariachis en Ciudad de México?",
        options: ["Plaza del Zócalo", "Plaza Garibaldi", "Plaza de la Constitución", "Plaza Hidalgo"],
        correct: 1
      },
      {
        prompt: "¿Qué instrumento de cuerda grave es típico del mariachi?",
        options: ["Contrabajo", "Violonchelo", "Guitarrón", "Bajo eléctrico"],
        correct: 2
      }
    ]
  },
  {
    id: "music-bachata",
    spanishName: "Bachata",
    englishName: "Bachata",
    icon: "🎵",
    tags: ["República Dominicana", "guitarra", "romántico", "baile", "Patrimonio"],
    descEs: "La bachata es un género musical y baile originario de la República Dominicana, declarado Patrimonio Inmaterial de la Humanidad por la UNESCO en 2019. Nació en los barrios marginales en los años sesenta como 'música de amargue' (música de amargura). Se caracteriza por la guitarra requinto, el bongó y las letras románticas o de desamor. Juan Luis Guerra y Romeo Santos la han popularizado internacionalmente.",
    descEn: "Bachata is a music genre and dance originating from the Dominican Republic, declared Intangible Cultural Heritage of Humanity by UNESCO in 2019. It was born in marginalized neighborhoods in the 1960s as 'música de amargue' (music of bitterness). It is characterized by the requinto guitar, bongo, and romantic or heartbreak lyrics. Juan Luis Guerra and Romeo Santos have popularized it internationally.",
    vocab: [
      { word: "amargue", english: "bitterness/heartache" },
      { word: "desamor", english: "heartbreak" },
      { word: "guitarra", english: "guitar" },
      { word: "bongó", english: "bongo drum" },
      { word: "romántico", english: "romantic" },
      { word: "pareja", english: "couple/partner" }
    ],
    quiz: [
      {
        prompt: "¿De qué país es originaria la bachata?",
        options: ["Cuba", "Puerto Rico", "República Dominicana", "Colombia"],
        correct: 2
      },
      {
        prompt: "¿Qué significa 'música de amargue'?",
        options: ["Música alegre", "Música de amargura", "Música rápida", "Música religiosa"],
        correct: 1
      },
      {
        prompt: "¿En qué año declaró la UNESCO a la bachata Patrimonio Inmaterial?",
        options: ["2010", "2015", "2019", "2022"],
        correct: 2
      }
    ]
  },
  {
    id: "music-cumbia",
    spanishName: "Cumbia",
    englishName: "Cumbia",
    icon: "🥁",
    tags: ["Colombia", "baile", "tambor", "popular", "latinoamérica"],
    descEs: "La cumbia es un género musical y baile folclórico nacido en la costa caribeña de Colombia, producto de la fusión entre ritmos africanos, melodías indígenas y elementos españoles. Se caracteriza por los tambores (llamador, alegre y tambora), las gaitas colombianas y las maracas. Desde Colombia se extendió a toda Latinoamérica, generando variantes como la cumbia argentina, mexicana y peruana, cada una con su estilo propio.",
    descEn: "Cumbia is a folk music genre and dance born on the Caribbean coast of Colombia, a product of the fusion of African rhythms, indigenous melodies, and Spanish elements. It is characterized by drums (llamador, alegre, and tambora), Colombian gaitas, and maracas. From Colombia it spread throughout Latin America, generating variants like Argentine, Mexican, and Peruvian cumbia, each with its own style.",
    vocab: [
      { word: "tambor", english: "drum" },
      { word: "gaita", english: "Colombian flute" },
      { word: "maracas", english: "maracas" },
      { word: "folclórico", english: "folk/folkloric" },
      { word: "pollera", english: "traditional skirt" },
      { word: "compás", english: "beat/time" }
    ],
    quiz: [
      {
        prompt: "¿En qué costa de Colombia nació la cumbia?",
        options: ["Costa del Pacífico", "Costa Caribeña", "Costa del sur", "Interior del país"],
        correct: 1
      },
      {
        prompt: "¿Qué tres culturas se fusionaron para crear la cumbia?",
        options: ["Europea, asiática y africana", "Africana, indígena y española", "Indígena, francesa y africana", "Española, portuguesa y africana"],
        correct: 1
      },
      {
        prompt: "¿Qué instrumento de viento es típico de la cumbia colombiana?",
        options: ["Flauta traversa", "Clarinete", "Gaita colombiana", "Trompeta"],
        correct: 2
      }
    ]
  },
  {
    id: "music-rock-espanol",
    spanishName: "Rock en Español",
    englishName: "Rock in Spanish",
    icon: "🎸",
    tags: ["latinoamérica", "España", "alternativo", "protesta", "década de los ochenta"],
    descEs: "El rock en español surgió con fuerza en los años ochenta en países como Argentina, México y España. En Argentina, Soda Stereo liderado por Gustavo Cerati se convirtió en la banda más influyente del rock latinoamericano. En México, Maná, Café Tacvba y Molotov definieron distintas vertientes. En España, Héroes del Silencio y El Último de la Fila marcaron la época. El rock en español fue voz de protesta contra dictaduras y desigualdad social.",
    descEn: "Rock in Spanish emerged forcefully in the 1980s in countries like Argentina, Mexico, and Spain. In Argentina, Soda Stereo led by Gustavo Cerati became the most influential band in Latin American rock. In Mexico, Maná, Café Tacvba, and Molotov defined different branches. In Spain, Héroes del Silencio and El Último de la Fila marked the era. Rock in Spanish was a voice of protest against dictatorships and social inequality.",
    vocab: [
      { word: "banda", english: "band" },
      { word: "batería", english: "drums" },
      { word: "bajo", english: "bass guitar" },
      { word: "gira", english: "tour" },
      { word: "protesta", english: "protest" },
      { word: "disco", english: "album" }
    ],
    quiz: [
      {
        prompt: "¿Quién fue el líder de Soda Stereo?",
        options: ["Fito Páez", "Charly García", "Gustavo Cerati", "Andrés Calamaro"],
        correct: 2
      },
      {
        prompt: "¿En qué década surgió con fuerza el rock en español?",
        options: ["Años sesenta", "Años setenta", "Años ochenta", "Años noventa"],
        correct: 2
      },
      {
        prompt: "¿Contra qué fue a menudo voz de protesta el rock en español?",
        options: ["La globalización", "Las dictaduras", "La tecnología", "La religión"],
        correct: 1
      }
    ]
  },
  {
    id: "music-bossa-nova",
    spanishName: "Bossa Nova",
    englishName: "Bossa Nova",
    icon: "🎶",
    tags: ["Brasil", "jazz", "suave", "guitarra", "Río de Janeiro"],
    descEs: "La bossa nova es un género musical brasileño que surgió a finales de los años cincuenta en Río de Janeiro. Aunque es de origen portugués, su influencia en la música hispana es enorme. Fusiona samba con jazz y se caracteriza por armonías sofisticadas y un ritmo suave. 'Garota de Ipanema' de Tom Jobim y Vinícius de Moraes es una de las canciones más grabadas del mundo. Su estilo influyó en artistas de toda Latinoamérica.",
    descEn: "Bossa nova is a Brazilian music genre that emerged in the late 1950s in Rio de Janeiro. Although Portuguese in origin, its influence on Hispanic music is enormous. It fuses samba with jazz and is characterized by sophisticated harmonies and a smooth rhythm. 'The Girl from Ipanema' by Tom Jobim and Vinícius de Moraes is one of the most recorded songs in the world. Its style influenced artists across all of Latin America.",
    vocab: [
      { word: "suave", english: "smooth/soft" },
      { word: "armonía", english: "harmony" },
      { word: "acorde", english: "chord" },
      { word: "melodía", english: "melody" },
      { word: "compositor", english: "composer" },
      { word: "influencia", english: "influence" }
    ],
    quiz: [
      {
        prompt: "¿En qué ciudad brasileña surgió la bossa nova?",
        options: ["São Paulo", "Salvador", "Río de Janeiro", "Brasilia"],
        correct: 2
      },
      {
        prompt: "¿Qué dos géneros musicales fusiona la bossa nova?",
        options: ["Rock y jazz", "Samba y jazz", "Reggae y samba", "Folk y blues"],
        correct: 1
      },
      {
        prompt: "¿Cuál es una de las canciones más famosas de la bossa nova?",
        options: ["Bésame Mucho", "Garota de Ipanema", "La Bamba", "Guantanamera"],
        correct: 1
      }
    ]
  },
  {
    id: "music-bolero",
    spanishName: "Bolero",
    englishName: "Bolero",
    icon: "🎙️",
    tags: ["Cuba", "México", "romántico", "guitarra", "clásico"],
    descEs: "El bolero es un género musical romántico que nació en Cuba a finales del siglo XIX. 'Tristezas' de José Pepe Sánchez (1883) es considerado el primer bolero. Se extendió por toda Latinoamérica, especialmente México, donde el Trío Los Panchos se convirtió en su máximo exponente. Se caracteriza por letras poéticas de amor y desamor, acompañadas de guitarras y voces suaves. Artistas como Agustín Lara y Luis Miguel mantuvieron vivo el género.",
    descEn: "Bolero is a romantic music genre born in Cuba in the late 19th century. 'Tristezas' by José Pepe Sánchez (1883) is considered the first bolero. It spread throughout Latin America, especially Mexico, where Trío Los Panchos became its greatest exponent. It is characterized by poetic lyrics about love and heartbreak, accompanied by guitars and soft voices. Artists like Agustín Lara and Luis Miguel kept the genre alive.",
    vocab: [
      { word: "amor", english: "love" },
      { word: "corazón", english: "heart" },
      { word: "voz", english: "voice" },
      { word: "sentimiento", english: "feeling" },
      { word: "serenata", english: "serenade" },
      { word: "trova", english: "troubadour song" }
    ],
    quiz: [
      {
        prompt: "¿En qué país nació el bolero?",
        options: ["México", "Cuba", "España", "Puerto Rico"],
        correct: 1
      },
      {
        prompt: "¿Qué trío mexicano es el máximo exponente del bolero?",
        options: ["Los Tigres del Norte", "Los Panchos", "Los Bukis", "Los Ángeles Negros"],
        correct: 1
      },
      {
        prompt: "¿Cuál es considerado el primer bolero de la historia?",
        options: ["Bésame Mucho", "Solamente una vez", "Tristezas", "Perfidia"],
        correct: 2
      }
    ]
  },
  {
    id: "music-tango",
    spanishName: "Tango",
    englishName: "Tango",
    icon: "🕺",
    tags: ["Argentina", "Uruguay", "Buenos Aires", "bandoneón", "Patrimonio"],
    descEs: "El tango es un género musical y baile nacido a finales del siglo XIX en los barrios portuarios de Buenos Aires y Montevideo. Fue declarado Patrimonio Cultural Inmaterial por la UNESCO en 2009. Se caracteriza por el bandoneón, el violín y el piano. Carlos Gardel es considerado la voz del tango, y Astor Piazzolla revolucionó el género con el 'tango nuevo'. Las letras, escritas en lunfardo (jerga rioplatense), narran historias de amor, nostalgia y vida urbana.",
    descEn: "Tango is a music genre and dance born in the late 19th century in the port neighborhoods of Buenos Aires and Montevideo. It was declared Intangible Cultural Heritage by UNESCO in 2009. It is characterized by the bandoneón, violin, and piano. Carlos Gardel is considered the voice of tango, and Astor Piazzolla revolutionized the genre with 'tango nuevo.' The lyrics, written in lunfardo (River Plate slang), tell stories of love, nostalgia, and urban life.",
    vocab: [
      { word: "bandoneón", english: "bandoneón (concertina)" },
      { word: "milonga", english: "tango dance event" },
      { word: "arrabal", english: "slum/outskirts" },
      { word: "lunfardo", english: "Buenos Aires slang" },
      { word: "nostalgia", english: "nostalgia" },
      { word: "abrazo", english: "embrace" }
    ],
    quiz: [
      {
        prompt: "¿Quién es considerado la voz del tango?",
        options: ["Astor Piazzolla", "Carlos Gardel", "Aníbal Troilo", "Osvaldo Pugliese"],
        correct: 1
      },
      {
        prompt: "¿Qué es el 'lunfardo' mencionado en las letras del tango?",
        options: ["Un instrumento", "Un baile", "Jerga rioplatense", "Un barrio de Buenos Aires"],
        correct: 2
      },
      {
        prompt: "¿Qué instrumento es el más emblemático del tango?",
        options: ["Guitarra", "Acordeón", "Bandoneón", "Flauta"],
        correct: 2
      }
    ]
  }
];
