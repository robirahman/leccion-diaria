const MOVIES_DATA = [
  {
    id: "movie-laberinto-fauno",
    spanishName: "El Laberinto del Fauno",
    englishName: "Pan's Labyrinth",
    icon: "🌀",
    tags: ["España", "México", "fantasía", "guerra civil", "Guillermo del Toro"],
    descEs: "El Laberinto del Fauno (2006) es una película de Guillermo del Toro ambientada en la España de 1944, durante la posguerra civil. Ofelia, una niña de trece años, descubre un laberinto mágico y al fauno Pan, quien le dice que es la princesa de un reino subterráneo. Debe completar tres tareas peligrosas mientras su padrastro, un cruel capitán franquista, persigue guerrilleros. La película mezcla fantasía oscura con la brutal realidad de la dictadura.",
    descEn: "Pan's Labyrinth (2006) is a film by Guillermo del Toro set in 1944 Spain, during the post-civil war era. Ofelia, a thirteen-year-old girl, discovers a magical labyrinth and the faun Pan, who tells her she is the princess of an underground kingdom. She must complete three dangerous tasks while her stepfather, a cruel Francoist captain, hunts guerrillas. The film blends dark fantasy with the brutal reality of the dictatorship.",
    vocab: [
      { word: "laberinto", english: "labyrinth" },
      { word: "hada", english: "fairy" },
      { word: "desobedecer", english: "to disobey" },
      { word: "guerra", english: "war" },
      { word: "valentía", english: "bravery" },
      { word: "reino", english: "kingdom" }
    ],
    quiz: [
      {
        prompt: "¿Quién dirigió El Laberinto del Fauno?",
        options: ["Alfonso Cuarón", "Alejandro González Iñárritu", "Guillermo del Toro", "Pedro Almodóvar"],
        correct: 2,
        explanation: "Guillermo del Toro wrote and directed Pan's Labyrinth (2006). The film is one of his signature works blending dark fantasy with historical drama, earning him widespread international acclaim before his later Oscar win for The Shape of Water."
      },
      {
        prompt: "¿En qué año está ambientada la película?",
        options: ["1936", "1939", "1944", "1950"],
        correct: 2,
        explanation: "The film is set in 1944, five years after the Spanish Civil War ended in 1939. This post-war period under Franco's dictatorship is crucial to the plot, as Ofelia's stepfather is a Francoist captain fighting remaining Republican guerrillas."
      },
      {
        prompt: "¿Cuántas tareas debe completar Ofelia?",
        options: ["Una", "Dos", "Tres", "Cuatro"],
        correct: 2,
        explanation: "The faun Pan tells Ofelia she must complete three tasks to prove she is the reborn princess of the underground realm. The number three is a classic fairy-tale motif, and each task tests her courage and moral character in increasingly dangerous ways."
      }
    ]
  },
  {
    id: "movie-roma",
    spanishName: "Roma",
    englishName: "Roma",
    icon: "🎬",
    tags: ["México", "drama", "Alfonso Cuarón", "blanco y negro", "autobiográfico"],
    descEs: "Roma (2018) es una película autobiográfica de Alfonso Cuarón que retrata la vida de Cleo, una trabajadora doméstica indígena en la colonia Roma de Ciudad de México, durante los años setenta. Filmada en blanco y negro, la película explora temas de clase social, género y raza en México. Ganó el León de Oro en Venecia y tres premios Óscar, incluyendo Mejor Director. Es un homenaje a las mujeres que criaron al director.",
    descEn: "Roma (2018) is an autobiographical film by Alfonso Cuarón portraying the life of Cleo, an indigenous domestic worker in the Roma neighborhood of Mexico City, during the 1970s. Filmed in black and white, the movie explores themes of social class, gender, and race in Mexico. It won the Golden Lion at Venice and three Academy Awards, including Best Director. It is a tribute to the women who raised the director.",
    vocab: [
      { word: "empleada doméstica", english: "domestic worker" },
      { word: "colonia", english: "neighborhood" },
      { word: "clase social", english: "social class" },
      { word: "homenaje", english: "tribute/homage" },
      { word: "crianza", english: "upbringing" },
      { word: "terremoto", english: "earthquake" }
    ],
    quiz: [
      {
        prompt: "¿En qué barrio de Ciudad de México está ambientada la película?",
        options: ["Coyoacán", "Roma", "Condesa", "Polanco"],
        correct: 1,
        explanation: "The film is set in the Colonia Roma neighborhood of Mexico City, which also gives the movie its title. Cuarón grew up in this middle-class neighborhood in the 1970s, and the film is a semi-autobiographical portrait of his childhood."
      },
      {
        prompt: "¿En qué formato visual está filmada Roma?",
        options: ["Color saturado", "Sepia", "Blanco y negro", "Formato cuadrado a color"],
        correct: 2,
        explanation: "Cuarón chose to shoot Roma in black and white to evoke the look and feel of his childhood memories. The monochrome cinematography by Cuarón himself won the Academy Award for Best Cinematography, making him the first director to win that award for his own film."
      },
      {
        prompt: "¿Quién es Cleo en la película?",
        options: ["La madre de familia", "La hija mayor", "Una trabajadora doméstica", "Una profesora"],
        correct: 2,
        explanation: "Cleo is an indigenous Mixtec domestic worker employed by a middle-class family. The character is based on Liboria 'Libo' Rodriguez, the real-life nanny who helped raise Cuarón, and the film is dedicated to her."
      }
    ]
  },
  {
    id: "movie-todo-sobre-mi-madre",
    spanishName: "Todo sobre mi madre",
    englishName: "All About My Mother",
    icon: "🎭",
    tags: ["España", "Pedro Almodóvar", "drama", "Óscar", "mujeres"],
    descEs: "Todo sobre mi madre (1999) de Pedro Almodóvar cuenta la historia de Manuela, una enfermera cuyo hijo muere atropellado tras intentar conseguir un autógrafo de la actriz Huma Rojo. Manuela viaja a Barcelona para encontrar al padre de su hijo y se rodea de un grupo de mujeres extraordinarias. La película ganó el Óscar a Mejor Película Extranjera y es considerada la obra maestra de Almodóvar, celebrando la fortaleza femenina.",
    descEn: "All About My Mother (1999) by Pedro Almodóvar tells the story of Manuela, a nurse whose son is killed by a car after trying to get an autograph from actress Huma Rojo. Manuela travels to Barcelona to find her son's father and surrounds herself with a group of extraordinary women. The film won the Oscar for Best Foreign Film and is considered Almodóvar's masterpiece, celebrating female strength.",
    vocab: [
      { word: "enfermera", english: "nurse" },
      { word: "actriz", english: "actress" },
      { word: "fortaleza", english: "strength/resilience" },
      { word: "pérdida", english: "loss" },
      { word: "búsqueda", english: "search" },
      { word: "solidaridad", english: "solidarity" }
    ],
    quiz: [
      {
        prompt: "¿A qué ciudad viaja Manuela en la película?",
        options: ["Madrid", "Sevilla", "Barcelona", "Valencia"],
        correct: 2,
        explanation: "Manuela travels from Madrid to Barcelona to find her son's father. Barcelona serves as the backdrop for her new life, where she connects with a community of resilient women including a pregnant nun and a transgender sex worker."
      },
      {
        prompt: "¿Qué premio internacional ganó esta película?",
        options: ["Palma de Oro", "Óscar a Mejor Película Extranjera", "Oso de Oro", "BAFTA"],
        correct: 1,
        explanation: "All About My Mother won the Academy Award for Best Foreign Language Film in 2000. It was Almodovar's first Oscar and cemented his status as one of the most important filmmakers in world cinema."
      },
      {
        prompt: "¿Cuál es la profesión de Manuela?",
        options: ["Actriz", "Profesora", "Enfermera", "Escritora"],
        correct: 2,
        explanation: "Manuela works as a nurse and organ transplant coordinator at a Madrid hospital. Her medical background is central to the plot, as the film opens with a scene about organ donation that foreshadows her son's tragic death."
      }
    ]
  },
  {
    id: "movie-diarios-motocicleta",
    spanishName: "Diarios de motocicleta",
    englishName: "The Motorcycle Diaries",
    icon: "🏍️",
    tags: ["Argentina", "biografía", "viaje", "Che Guevara", "Sudamérica"],
    descEs: "Diarios de motocicleta (2004) narra el viaje real que Ernesto Guevara y su amigo Alberto Granado hicieron por Sudamérica en 1952, antes de que Ernesto se convirtiera en el 'Che'. Viajando en una motocicleta Norton 500 llamada 'La Poderosa', recorren Argentina, Chile, Perú, Colombia y Venezuela. El viaje les abre los ojos a la pobreza y la injusticia, transformando al joven estudiante de medicina en un revolucionario.",
    descEn: "The Motorcycle Diaries (2004) narrates the real journey that Ernesto Guevara and his friend Alberto Granado took across South America in 1952, before Ernesto became 'Che.' Traveling on a Norton 500 motorcycle called 'La Poderosa' (The Mighty One), they cross Argentina, Chile, Peru, Colombia, and Venezuela. The journey opens their eyes to poverty and injustice, transforming the young medical student into a revolutionary.",
    vocab: [
      { word: "viaje", english: "journey/trip" },
      { word: "motocicleta", english: "motorcycle" },
      { word: "pobreza", english: "poverty" },
      { word: "injusticia", english: "injustice" },
      { word: "revolución", english: "revolution" },
      { word: "descubrimiento", english: "discovery" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llamaba la motocicleta del viaje?",
        options: ["La Veloz", "La Poderosa", "La Valiente", "La Libertad"],
        correct: 1,
        explanation: "The Norton 500 motorcycle was nicknamed 'La Poderosa' (The Mighty One), an ironic name since it broke down repeatedly during the trip. It finally gave out in Chile, forcing the pair to continue by hitchhiking, bus, and raft."
      },
      {
        prompt: "¿Qué estudiaba Ernesto Guevara durante el viaje?",
        options: ["Derecho", "Filosofía", "Medicina", "Ingeniería"],
        correct: 2,
        explanation: "Ernesto Guevara was a 23-year-old medical student at the University of Buenos Aires when he embarked on the journey. His medical training shaped how he viewed the poverty and disease he encountered, particularly at a leper colony in Peru."
      },
      {
        prompt: "¿En qué año se realizó el viaje real?",
        options: ["1948", "1950", "1952", "1955"],
        correct: 2,
        explanation: "The real journey took place in 1952, when Guevara was not yet the revolutionary figure known as 'Che.' The trip across South America exposed him to widespread poverty and inequality, which he documented in his travel diary that later became the book the film is based on."
      }
    ]
  },
  {
    id: "movie-y-tu-mama-tambien",
    spanishName: "Y tu mamá también",
    englishName: "And Your Mother Too",
    icon: "🚗",
    tags: ["México", "Alfonso Cuarón", "road movie", "juventud", "drama"],
    descEs: "Y tu mamá también (2001) de Alfonso Cuarón sigue a dos adolescentes mexicanos, Julio y Tenoch, que invitan a Luisa, una mujer española mayor, a un viaje por carretera hacia una playa ficticia llamada 'Boca del Cielo'. Durante el viaje, se revelan secretos, tensiones de clase social y la realidad del México contemporáneo. La película fue un fenómeno cultural que rompió tabúes del cine mexicano y lanzó las carreras internacionales de Gael García Bernal y Diego Luna.",
    descEn: "And Your Mother Too (2001) by Alfonso Cuarón follows two Mexican teenagers, Julio and Tenoch, who invite Luisa, an older Spanish woman, on a road trip to a fictional beach called 'Boca del Cielo' (Heaven's Mouth). During the journey, secrets are revealed, class tensions surface, and the reality of contemporary Mexico unfolds. The film was a cultural phenomenon that broke taboos in Mexican cinema and launched the international careers of Gael García Bernal and Diego Luna.",
    vocab: [
      { word: "carretera", english: "road/highway" },
      { word: "playa", english: "beach" },
      { word: "adolescente", english: "teenager" },
      { word: "secreto", english: "secret" },
      { word: "juventud", english: "youth" },
      { word: "amistad", english: "friendship" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llama la playa ficticia del viaje?",
        options: ["Playa del Carmen", "Boca del Cielo", "Puerto Escondido", "Costa Azul"],
        correct: 1,
        explanation: "'Boca del Cielo' (Heaven's Mouth) is a fictional beach that the characters invent on the spot to impress Luisa. The name is symbolic -- the destination itself is an illusion, and the real journey is about self-discovery and confronting uncomfortable truths."
      },
      {
        prompt: "¿Qué actores protagonizan la película?",
        options: ["Bardem y Banderas", "García Bernal y Luna", "del Toro y Peña", "Bernal y Cantinflas"],
        correct: 1,
        explanation: "Gael Garcia Bernal and Diego Luna, real-life childhood friends, play the two teenage protagonists. Their natural chemistry and friendship translated authentically on screen, and the film launched both actors into international stardom."
      },
      {
        prompt: "¿De qué nacionalidad es el personaje de Luisa?",
        options: ["Mexicana", "Argentina", "Española", "Francesa"],
        correct: 2,
        explanation: "Luisa is a Spanish woman living in Mexico, played by Spanish actress Maribel Verdu. Her outsider perspective allows her to observe Mexican class dynamics between the two boys -- Julio from a working-class family and Tenoch from a wealthy political family."
      }
    ]
  },
  {
    id: "movie-secreto-ojos",
    spanishName: "El secreto de sus ojos",
    englishName: "The Secret in Their Eyes",
    icon: "👁️",
    tags: ["Argentina", "thriller", "Óscar", "justicia", "amor"],
    descEs: "El secreto de sus ojos (2009) es un thriller argentino dirigido por Juan José Campanella que ganó el Óscar a Mejor Película Extranjera. Benjamín Espósito, un oficial de justicia jubilado, decide escribir una novela sobre un caso de asesinato sin resolver de 1974 que lo obsesionó durante décadas. La película entrelaza la investigación criminal con una historia de amor no correspondido y reflexiona sobre la memoria, la justicia y la pasión en la Argentina de los años setenta.",
    descEn: "The Secret in Their Eyes (2009) is an Argentine thriller directed by Juan José Campanella that won the Oscar for Best Foreign Film. Benjamín Espósito, a retired judicial officer, decides to write a novel about an unsolved 1974 murder case that obsessed him for decades. The film interweaves the criminal investigation with a story of unrequited love and reflects on memory, justice, and passion in 1970s Argentina.",
    vocab: [
      { word: "justicia", english: "justice" },
      { word: "asesinato", english: "murder" },
      { word: "investigación", english: "investigation" },
      { word: "recuerdo", english: "memory/remembrance" },
      { word: "culpable", english: "guilty" },
      { word: "pasión", english: "passion" }
    ],
    quiz: [
      {
        prompt: "¿Qué premio ganó El secreto de sus ojos?",
        options: ["Palma de Oro", "Óscar a Mejor Película Extranjera", "Goya", "BAFTA"],
        correct: 1,
        explanation: "The Secret in Their Eyes won the Academy Award for Best Foreign Language Film in 2010, making it only the second Argentine film ever to win an Oscar. Its success led to an American remake in 2015 starring Julia Roberts and Nicole Kidman."
      },
      {
        prompt: "¿Qué decide escribir Benjamín Espósito?",
        options: ["Sus memorias", "Un poema", "Una novela", "Un guion"],
        correct: 2,
        explanation: "After retiring, Esposito decides to write a novel based on the 1974 murder case that haunted him for decades. The act of writing forces him to revisit not only the unsolved crime but also his unspoken feelings for his former colleague Irene."
      },
      {
        prompt: "¿En qué década está ambientado el caso criminal de la película?",
        options: ["Años sesenta", "Años setenta", "Años ochenta", "Años noventa"],
        correct: 1,
        explanation: "The murder case takes place in the 1970s, a turbulent period in Argentine history leading up to the military dictatorship (1976-1983). The political instability of that era is directly woven into the plot, as government corruption obstructs justice."
      }
    ]
  },
  {
    id: "movie-relatos-salvajes",
    spanishName: "Relatos salvajes",
    englishName: "Wild Tales",
    icon: "💥",
    tags: ["Argentina", "comedia negra", "antología", "venganza", "caos"],
    descEs: "Relatos salvajes (2014) de Damián Szifron es una antología de seis cortometrajes que exploran la violencia, la venganza y la pérdida de control. Cada historia muestra a personas comunes llevadas al límite por situaciones injustas o absurdas. La película fue nominada al Óscar y se convirtió en la película argentina más taquillera de la historia. Con humor negro brillante, reflexiona sobre la desigualdad, la burocracia y los impulsos más oscuros del ser humano.",
    descEn: "Wild Tales (2014) by Damián Szifron is an anthology of six short films that explore violence, revenge, and loss of control. Each story shows ordinary people pushed to the limit by unfair or absurd situations. The film was nominated for an Oscar and became the highest-grossing Argentine film in history. With brilliant dark humor, it reflects on inequality, bureaucracy, and humanity's darkest impulses.",
    vocab: [
      { word: "venganza", english: "revenge" },
      { word: "salvaje", english: "wild/savage" },
      { word: "injusticia", english: "injustice" },
      { word: "descontrol", english: "loss of control" },
      { word: "burocracia", english: "bureaucracy" },
      { word: "impulso", english: "impulse" }
    ],
    quiz: [
      {
        prompt: "¿Cuántas historias cortas componen Relatos salvajes?",
        options: ["Cuatro", "Cinco", "Seis", "Siete"],
        correct: 2,
        explanation: "Wild Tales is an anthology of six self-contained short films, each exploring what happens when ordinary people are pushed past their breaking point. The segments range from road rage to a wedding gone wrong, united by the theme of explosive human reactions to injustice."
      },
      {
        prompt: "¿Qué tipo de humor caracteriza a la película?",
        options: ["Humor blanco", "Humor negro", "Humor absurdo", "Humor romántico"],
        correct: 1,
        explanation: "The film uses dark humor (humor negro) to explore themes of violence, revenge, and societal frustration. By making audiences laugh at extreme situations, Szifron highlights how thin the line is between civilized behavior and savage impulse."
      },
      {
        prompt: "¿Qué récord logró esta película en Argentina?",
        options: ["Mayor presupuesto", "Más premios", "Más taquillera de la historia", "Más larga"],
        correct: 2,
        explanation: "Wild Tales became the highest-grossing Argentine film in history, with over 3.5 million tickets sold domestically. Produced by Pedro Almodovar's company El Deseo, it was also nominated for the Academy Award for Best Foreign Language Film."
      }
    ]
  },
  {
    id: "movie-coco",
    spanishName: "Coco",
    englishName: "Coco",
    icon: "💀",
    tags: ["México", "animación", "Día de los Muertos", "familia", "Pixar"],
    descEs: "Coco (2017) es una película animada de Pixar/Disney que celebra la tradición mexicana del Día de los Muertos. Miguel, un niño que sueña con ser músico a pesar de la prohibición de su familia, cruza accidentalmente al Mundo de los Muertos. Allí conoce a sus antepasados y descubre un secreto familiar. La película fue elogiada por su respetuosa representación de la cultura mexicana y ganó el Óscar a Mejor Película Animada. 'Recuérdame' se convirtió en un himno generacional.",
    descEn: "Coco (2017) is a Pixar/Disney animated film celebrating the Mexican tradition of Día de los Muertos. Miguel, a boy who dreams of being a musician despite his family's ban on music, accidentally crosses into the Land of the Dead. There he meets his ancestors and discovers a family secret. The film was praised for its respectful representation of Mexican culture and won the Oscar for Best Animated Film. 'Remember Me' became a generational anthem.",
    vocab: [
      { word: "antepasados", english: "ancestors" },
      { word: "ofrenda", english: "altar/offering" },
      { word: "calavera", english: "skull" },
      { word: "bendición", english: "blessing" },
      { word: "recuerdo", english: "memory" },
      { word: "músico", english: "musician" }
    ],
    quiz: [
      {
        prompt: "¿Qué tradición mexicana celebra la película Coco?",
        options: ["Navidad", "Día de los Muertos", "Semana Santa", "Quinceañera"],
        correct: 1,
        explanation: "Coco centers on Dia de los Muertos (Day of the Dead), celebrated on November 1-2 in Mexico. This tradition honors deceased loved ones with ofrendas (altars), marigold flowers, and their favorite foods -- the belief being that the dead can visit the living on this day."
      },
      {
        prompt: "¿Cuál es el sueño de Miguel?",
        options: ["Ser pintor", "Ser músico", "Ser chef", "Ser escritor"],
        correct: 1,
        explanation: "Miguel dreams of becoming a musician like his idol Ernesto de la Cruz, but his family has banned music for generations after a musician ancestor abandoned them. This conflict between family loyalty and personal passion drives the entire story."
      },
      {
        prompt: "¿Cómo se llama la canción principal de la película?",
        options: ["Recuérdame", "No me olvides", "Mi familia", "El mundo de los muertos"],
        correct: 0,
        explanation: "'Recuerdame' (Remember Me) won the Academy Award for Best Original Song. Written in two versions -- a flashy performance number and a tender lullaby -- the song embodies the film's central message that loved ones live on as long as we remember them."
      }
    ]
  },
  {
    id: "movie-volver",
    spanishName: "Volver",
    englishName: "Volver (To Return)",
    icon: "🌹",
    tags: ["España", "Pedro Almodóvar", "Penélope Cruz", "familia", "mujeres"],
    descEs: "Volver (2006) de Pedro Almodóvar es una comedia dramática que sigue a Raimunda, interpretada por Penélope Cruz, una mujer de La Mancha que vive en Madrid. Cuando su madre, supuestamente muerta, reaparece, Raimunda debe enfrentar secretos familiares del pasado mientras lidia con un crimen en el presente. La película es un homenaje a las mujeres de La Mancha, al cine clásico español y al tango que le da título. Cruz ganó el premio a Mejor Actriz en Cannes.",
    descEn: "Volver (2006) by Pedro Almodóvar is a comedy-drama following Raimunda, played by Penélope Cruz, a woman from La Mancha living in Madrid. When her supposedly dead mother reappears, Raimunda must face family secrets from the past while dealing with a crime in the present. The film is a tribute to the women of La Mancha, classic Spanish cinema, and the tango that gives it its title. Cruz won Best Actress at Cannes.",
    vocab: [
      { word: "volver", english: "to return" },
      { word: "madre", english: "mother" },
      { word: "fantasma", english: "ghost" },
      { word: "secreto", english: "secret" },
      { word: "pueblo", english: "village/town" },
      { word: "enterrar", english: "to bury" }
    ],
    quiz: [
      {
        prompt: "¿Quién interpreta a Raimunda en Volver?",
        options: ["Carmen Maura", "Penélope Cruz", "Victoria Abril", "Rossy de Palma"],
        correct: 1,
        explanation: "Penelope Cruz plays Raimunda in one of her most acclaimed Spanish-language roles. Cruz has been a frequent collaborator of Almodovar since the 1990s, and her performance in Volver earned her first major international award recognition."
      },
      {
        prompt: "¿De qué región española es originaria Raimunda?",
        options: ["Andalucía", "Galicia", "La Mancha", "Cataluña"],
        correct: 2,
        explanation: "Raimunda is from La Mancha, the rural region in central Spain also famous as the setting of Don Quixote. Almodovar himself grew up in La Mancha, and the film is his personal tribute to the strong, resilient women of that region."
      },
      {
        prompt: "¿Qué premio ganó Penélope Cruz por esta película?",
        options: ["Óscar", "Goya", "Mejor Actriz en Cannes", "Globo de Oro"],
        correct: 2,
        explanation: "Cruz won the Best Actress award at the 2006 Cannes Film Festival for her role as Raimunda. The award was shared with five other actresses from the film's ensemble cast, reflecting Almodovar's focus on collective female strength."
      }
    ]
  },
  {
    id: "movie-amores-perros",
    spanishName: "Amores perros",
    englishName: "Love's a Bitch",
    icon: "🐕",
    tags: ["México", "Iñárritu", "drama", "crudo", "interconectado"],
    descEs: "Amores perros (2000) de Alejandro González Iñárritu es una película compuesta por tres historias interconectadas por un accidente automovilístico en Ciudad de México. La primera sigue a Octavio, un joven que usa a su perro en peleas clandestinas. La segunda a Daniel, un editor que abandona a su familia por una modelo. La tercera a El Chivo, un exguerrillero convertido en asesino a sueldo. La película inauguró el 'Nuevo Cine Mexicano' y lanzó la carrera internacional de Iñárritu y Gael García Bernal.",
    descEn: "Amores Perros (2000) by Alejandro González Iñárritu is a film composed of three stories interconnected by a car accident in Mexico City. The first follows Octavio, a young man who uses his dog in clandestine fights. The second follows Daniel, an editor who abandons his family for a model. The third follows El Chivo, a former guerrilla turned hitman. The film inaugurated the 'New Mexican Cinema' and launched the international careers of Iñárritu and Gael García Bernal.",
    vocab: [
      { word: "accidente", english: "accident" },
      { word: "perro", english: "dog" },
      { word: "destino", english: "fate/destiny" },
      { word: "traición", english: "betrayal" },
      { word: "violencia", english: "violence" },
      { word: "redención", english: "redemption" }
    ],
    quiz: [
      {
        prompt: "¿Qué evento conecta las tres historias de la película?",
        options: ["Un terremoto", "Un accidente de coche", "Un robo", "Un incendio"],
        correct: 1,
        explanation: "A violent car crash in Mexico City is the pivotal event that links all three storylines. This narrative structure -- multiple stories connected by a single incident -- became Inarritu's signature technique, which he later used in 21 Grams and Babel."
      },
      {
        prompt: "¿Quién dirigió Amores perros?",
        options: ["Alfonso Cuarón", "Guillermo del Toro", "Alejandro González Iñárritu", "Carlos Reygadas"],
        correct: 2,
        explanation: "Amores Perros was Alejandro Gonzalez Inarritu's feature film debut. It launched his career alongside screenwriter Guillermo Arriaga, and Inarritu went on to win consecutive Best Director Oscars for Birdman (2014) and The Revenant (2015)."
      },
      {
        prompt: "¿Qué movimiento cinematográfico inauguró esta película?",
        options: ["Cine de oro mexicano", "Nuevo Cine Mexicano", "Realismo mágico", "Cine independiente"],
        correct: 1,
        explanation: "Amores Perros is widely considered the film that launched the 'Nuevo Cine Mexicano' (New Mexican Cinema) movement around 2000. Along with Y Tu Mama Tambien and other films, it brought international attention to a new generation of Mexican filmmakers including Inarritu, Cuaron, and del Toro."
      }
    ]
  }
];
