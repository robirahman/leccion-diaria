const POETRY_DATA = [
  {
    id: "poetry-neruda",
    spanishName: "Pablo Neruda - Poema 20",
    englishName: "Pablo Neruda - Poem 20",
    icon: "📝",
    tags: ["Chile", "Nobel", "amor", "naturaleza", "siglo XX"],
    level: "B2",
    descEs: "Pablo Neruda (1904-1973) es uno de los poetas más importantes del siglo XX, ganador del Premio Nobel de Literatura en 1971. Nacido en Chile como Neftalí Reyes, adoptó el seudónimo Pablo Neruda. Su obra abarca desde la poesía amorosa de 'Veinte poemas de amor y una canción desesperada' hasta la épica social de 'Canto general'. También fue diplomático y senador. Su Poema 20 es uno de los poemas de amor más conocidos en español.",
    descEn: "Pablo Neruda (1904-1973) is one of the most important poets of the 20th century, winner of the Nobel Prize in Literature in 1971. Born in Chile as Neftalí Reyes, he adopted the pseudonym Pablo Neruda. His work ranges from the love poetry of 'Twenty Love Poems and a Song of Despair' to the social epic of 'Canto General.' He was also a diplomat and senator. His Poem 20 is one of the most famous love poems in Spanish.",
    vocab: [
      { word: "poema", english: "poem" },
      { word: "versos", english: "verses" },
      { word: "noche", english: "night" },
      { word: "estrellada", english: "starry" },
      { word: "alma", english: "soul" },
      { word: "silencio", english: "silence" }
    ],
    quiz: [
      {
        prompt: "¿De qué país era Pablo Neruda?",
        options: ["Argentina", "México", "Chile", "Colombia"],
        correct: 2,
        explanation: "Neruda was born in Parral, Chile in 1904. Chile has produced two Nobel Prize-winning poets: Neruda and Gabriela Mistral."
      },
      {
        prompt: "¿Cuál era el verdadero nombre de Pablo Neruda?",
        options: ["Pablo Reyes", "Neftalí Reyes", "Ricardo Neruda", "Pablo Mistral"],
        correct: 1,
        explanation: "He was born Neftalí Ricardo Reyes Basoalto and adopted the pen name Pablo Neruda as a teenager, possibly inspired by the Czech poet Jan Neruda."
      },
      {
        prompt: "¿En qué año ganó Neruda el Premio Nobel?",
        options: ["1965", "1968", "1971", "1975"],
        correct: 2,
        explanation: "Neruda received the Nobel Prize in Literature in 1971, recognized for 'a poetry that with the action of an elemental force brings alive a continent's destiny and dreams.'"
      }
    ]
  },
  {
    id: "poetry-lorca",
    spanishName: "Federico García Lorca - Romance sonámbulo",
    englishName: "Federico García Lorca - Sleepwalking Ballad",
    icon: "🌙",
    tags: ["España", "Generación del 27", "romance", "Andalucía", "gitano"],
    level: "C1",
    descEs: "Federico García Lorca (1898-1936) fue un poeta y dramaturgo español de la Generación del 27, nacido en Granada. Su 'Romancero gitano' fusiona la tradición popular andaluza con imágenes surrealistas. 'Romance sonámbulo' comienza con los célebres versos 'Verde que te quiero verde. / Verde viento. Verdes ramas.' Lorca fue asesinado al inicio de la Guerra Civil Española, convirtiéndose en símbolo de la libertad artística. También escribió obras teatrales como 'Bodas de sangre' y 'La casa de Bernarda Alba'.",
    descEn: "Federico García Lorca (1898-1936) was a Spanish poet and playwright of the Generation of '27, born in Granada. His 'Romancero Gitano' fuses Andalusian folk tradition with surrealist imagery. 'Romance sonámbulo' begins with the famous verses 'Verde que te quiero verde. / Verde viento. Verdes ramas.' (Green, how I want you green. / Green wind. Green branches.) Lorca was killed at the start of the Spanish Civil War, becoming a symbol of artistic freedom.",
    vocab: [
      { word: "verde", english: "green" },
      { word: "viento", english: "wind" },
      { word: "ramas", english: "branches" },
      { word: "luna", english: "moon" },
      { word: "gitano", english: "Romani/Gypsy" },
      { word: "sueño", english: "dream" }
    ],
    quiz: [
      {
        prompt: "¿De qué ciudad andaluza era Lorca?",
        options: ["Sevilla", "Córdoba", "Granada", "Málaga"],
        correct: 2,
        explanation: "Lorca was born in Fuente Vaqueros near Granada in 1898. The culture and landscapes of Granada and Andalusia deeply shaped his imagery and themes."
      },
      {
        prompt: "¿Qué color domina el 'Romance sonámbulo'?",
        options: ["Rojo", "Azul", "Verde", "Negro"],
        correct: 2,
        explanation: "The poem's famous opening line is 'Verde que te quiero verde' (Green, how I want you green). Green serves as a symbol of longing, death, and the Romani world throughout the poem."
      },
      {
        prompt: "¿A qué generación literaria pertenecía Lorca?",
        options: ["Generación del 98", "Generación del 14", "Generación del 27", "Generación del 36"],
        correct: 2,
        explanation: "The Generation of '27 was a group of avant-garde poets who came together around 1927 to commemorate the 300th anniversary of the death of Luis de Góngora. Other members included Rafael Alberti and Pedro Salinas."
      }
    ]
  },
  {
    id: "poetry-sor-juana",
    spanishName: "Sor Juana Inés de la Cruz - Hombres necios",
    englishName: "Sor Juana Inés de la Cruz - Foolish Men",
    icon: "✝️",
    tags: ["México", "colonial", "feminismo", "barroco", "siglo XVII"],
    level: "C1",
    descEs: "Sor Juana Inés de la Cruz (1648-1695) fue una monja, escritora y poeta mexicana del período barroco, considerada la primera feminista de América. Su poema 'Hombres necios que acusáis' critica la hipocresía masculina: 'Hombres necios que acusáis / a la mujer sin razón, / sin ver que sois la ocasión / de lo mismo que culpáis.' Defendió el derecho de las mujeres a la educación y al conocimiento en su 'Respuesta a Sor Filotea'. Aparece en el billete de doscientos pesos mexicanos.",
    descEn: "Sor Juana Inés de la Cruz (1648-1695) was a Mexican nun, writer, and poet of the Baroque period, considered the first feminist of the Americas. Her poem 'Hombres necios que acusáis' criticizes male hypocrisy: 'Foolish men who accuse / women without reason, / not seeing you are the cause / of the very thing you blame.' She defended women's right to education and knowledge in her 'Response to Sor Filotea.' She appears on the Mexican two-hundred peso bill.",
    vocab: [
      { word: "necio", english: "foolish" },
      { word: "acusar", english: "to accuse" },
      { word: "culpar", english: "to blame" },
      { word: "razón", english: "reason" },
      { word: "monja", english: "nun" },
      { word: "conocimiento", english: "knowledge" }
    ],
    quiz: [
      {
        prompt: "¿En qué siglo vivió Sor Juana Inés de la Cruz?",
        options: ["Siglo XV", "Siglo XVI", "Siglo XVII", "Siglo XVIII"],
        correct: 2,
        explanation: "Sor Juana lived from 1648 to 1695, placing her squarely in the 17th century during the height of the Spanish Baroque period in colonial Mexico (New Spain)."
      },
      {
        prompt: "¿Qué critica su famoso poema 'Hombres necios'?",
        options: ["La religión", "La hipocresía masculina", "La pobreza", "La guerra"],
        correct: 1,
        explanation: "The poem argues that men blame women for the very behavior men themselves provoke, exposing a double standard. This made Sor Juana a pioneering feminist voice centuries before the modern movement."
      },
      {
        prompt: "¿En qué billete mexicano aparece Sor Juana?",
        options: ["Cien pesos", "Doscientos pesos", "Quinientos pesos", "Mil pesos"],
        correct: 1,
        explanation: "Sor Juana's portrait on the 200-peso bill reflects her status as one of Mexico's greatest cultural figures. She is one of the most recognizable faces in Mexican currency."
      }
    ]
  },
  {
    id: "poetry-octavio-paz",
    spanishName: "Octavio Paz - Piedra de sol",
    englishName: "Octavio Paz - Sunstone",
    icon: "☀️",
    tags: ["México", "Nobel", "ensayo", "surrealismo", "siglo XX"],
    level: "C2",
    descEs: "Octavio Paz (1914-1998) fue un poeta y ensayista mexicano, ganador del Premio Nobel de Literatura en 1990. 'Piedra de sol' es su poema más ambicioso, con 584 versos endecasílabos que corresponden al calendario azteca. También escribió 'El laberinto de la soledad', ensayo fundamental sobre la identidad mexicana. Su poesía fusiona tradición mexicana con surrealismo europeo y filosofía oriental. Fue embajador de México en la India.",
    descEn: "Octavio Paz (1914-1998) was a Mexican poet and essayist, winner of the Nobel Prize in Literature in 1990. 'Sunstone' is his most ambitious poem, with 584 hendecasyllabic verses corresponding to the Aztec calendar. He also wrote 'The Labyrinth of Solitude,' a fundamental essay on Mexican identity. His poetry fuses Mexican tradition with European surrealism and Eastern philosophy. He served as Mexico's ambassador to India.",
    vocab: [
      { word: "piedra", english: "stone" },
      { word: "sol", english: "sun" },
      { word: "soledad", english: "solitude" },
      { word: "laberinto", english: "labyrinth" },
      { word: "identidad", english: "identity" },
      { word: "tiempo", english: "time" }
    ],
    quiz: [
      {
        prompt: "¿En qué año ganó Octavio Paz el Nobel de Literatura?",
        options: ["1982", "1987", "1990", "1995"],
        correct: 2,
        explanation: "Paz won the Nobel in 1990, becoming the first (and so far only) Mexican to receive the Nobel Prize in Literature. Gabriel García Márquez (Colombian) had won in 1982."
      },
      {
        prompt: "¿Cuántos versos tiene 'Piedra de sol'?",
        options: ["365", "500", "584", "1000"],
        correct: 2,
        explanation: "The 584 hendecasyllabic verses correspond to the 584-day synodic cycle of Venus in the Aztec calendar, linking the poem's circular structure to pre-Columbian cosmology."
      },
      {
        prompt: "¿Qué ensayo famoso escribió Paz sobre la identidad mexicana?",
        options: ["El arco y la lira", "El laberinto de la soledad", "Los hijos del limo", "Posdata"],
        correct: 1,
        explanation: "'El laberinto de la soledad' (1950) analyzes Mexican identity through history, myth, and psychology. It remains one of the most influential essays ever written about Latin American culture."
      }
    ]
  },
  {
    id: "poetry-borges",
    spanishName: "Jorge Luis Borges - Instantes",
    englishName: "Jorge Luis Borges - Moments",
    icon: "📚",
    tags: ["Argentina", "metafísica", "laberintos", "espejos", "siglo XX"],
    level: "C1",
    descEs: "Jorge Luis Borges (1899-1986) fue un escritor argentino, considerado uno de los autores más importantes de la literatura universal. Aunque es más conocido por sus cuentos como 'El Aleph' y 'Ficciones', su poesía explora temas como el tiempo, los espejos, los laberintos y el infinito. Su estilo combina erudición con imaginación desbordante. A pesar de quedar ciego en su madurez, continuó creando obras maestras dictándolas. Buenos Aires es un tema recurrente en sus poemas.",
    descEn: "Jorge Luis Borges (1899-1986) was an Argentine writer, considered one of the most important authors in world literature. Though best known for his stories like 'The Aleph' and 'Ficciones,' his poetry explores themes such as time, mirrors, labyrinths, and infinity. His style combines erudition with boundless imagination. Despite going blind in his maturity, he continued creating masterpieces by dictating them. Buenos Aires is a recurring theme in his poems.",
    vocab: [
      { word: "espejo", english: "mirror" },
      { word: "laberinto", english: "labyrinth" },
      { word: "infinito", english: "infinite" },
      { word: "ciego", english: "blind" },
      { word: "biblioteca", english: "library" },
      { word: "destino", english: "destiny" }
    ],
    quiz: [
      {
        prompt: "¿De qué país era Jorge Luis Borges?",
        options: ["Uruguay", "Argentina", "Chile", "México"],
        correct: 1,
        explanation: "Borges was born in Buenos Aires in 1899. The city, its neighborhoods (especially the south side), and Argentine culture are recurring subjects throughout his poetry and prose."
      },
      {
        prompt: "¿Qué tema NO es recurrente en la obra de Borges?",
        options: ["Laberintos", "Espejos", "Naturaleza tropical", "El infinito"],
        correct: 2,
        explanation: "Borges was drawn to intellectual and metaphysical themes like labyrinths, mirrors, infinity, and time. Tropical nature is not part of his literary world, which tends toward the abstract and urban."
      },
      {
        prompt: "¿Qué condición física desarrolló Borges en su madurez?",
        options: ["Sordera", "Ceguera", "Parálisis", "Mudez"],
        correct: 1,
        explanation: "Borges inherited a progressive blindness that became total by his mid-fifties. Despite this, he continued to compose and dictate some of his greatest works, including poetry he crafted entirely in his mind."
      }
    ]
  },
  {
    id: "poetry-mistral",
    spanishName: "Gabriela Mistral - Piececitos",
    englishName: "Gabriela Mistral - Little Feet",
    icon: "🏔️",
    tags: ["Chile", "Nobel", "infancia", "maternidad", "educación"],
    level: "B2",
    descEs: "Gabriela Mistral (1889-1957), nacida Lucila Godoy Alcayaga, fue una poeta y educadora chilena, la primera latinoamericana en ganar el Premio Nobel de Literatura (1945). Su poema 'Piececitos' comienza: 'Piececitos de niño, / azulosos de frío, / ¡cómo os ven y no os cubren, / Dios mío!' Su poesía aborda la maternidad, la infancia, la naturaleza y el dolor. También fue cónsul y educadora rural, luchando por la educación de los niños pobres de América Latina.",
    descEn: "Gabriela Mistral (1889-1957), born Lucila Godoy Alcayaga, was a Chilean poet and educator, the first Latin American to win the Nobel Prize in Literature (1945). Her poem 'Piececitos' begins: 'Little feet of children, / blue with cold, / how can they see you and not cover you, / my God!' Her poetry addresses motherhood, childhood, nature, and sorrow. She was also a consul and rural educator, fighting for the education of poor children in Latin America.",
    vocab: [
      { word: "piececitos", english: "little feet" },
      { word: "niño", english: "child" },
      { word: "frío", english: "cold" },
      { word: "ternura", english: "tenderness" },
      { word: "maestra", english: "teacher" },
      { word: "dolor", english: "pain/sorrow" }
    ],
    quiz: [
      {
        prompt: "¿Qué distinción histórica tiene Gabriela Mistral?",
        options: ["Primera mujer Nobel", "Primera latinoamericana Nobel de Literatura", "Primera poeta chilena", "Primera educadora Nobel"],
        correct: 1,
        explanation: "In 1945, Mistral became the first Latin American author to receive the Nobel Prize in Literature, preceding her compatriot Pablo Neruda by 26 years."
      },
      {
        prompt: "¿Cuál era el verdadero nombre de Gabriela Mistral?",
        options: ["Gabriela Reyes", "Lucila Godoy Alcayaga", "María Mistral", "Gabriela Alcayaga"],
        correct: 1,
        explanation: "Born Lucila Godoy Alcayaga, she chose her pen name combining the archangel Gabriel and the mistral wind (a cold wind from southern France), reflecting her spiritual and natural sensibilities."
      },
      {
        prompt: "¿Cuál es uno de los temas principales de su poesía?",
        options: ["La guerra", "La tecnología", "La infancia y la maternidad", "La política"],
        correct: 2,
        explanation: "Mistral's work is deeply rooted in themes of childhood, motherhood, and tenderness, shaped by her career as a rural teacher and her profound empathy for vulnerable children across Latin America."
      }
    ]
  },
  {
    id: "poetry-vallejo",
    spanishName: "César Vallejo - Los heraldos negros",
    englishName: "César Vallejo - The Black Heralds",
    icon: "⚫",
    tags: ["Perú", "vanguardia", "sufrimiento", "existencial", "siglo XX"],
    level: "C1",
    descEs: "César Vallejo (1892-1938) fue un poeta peruano considerado uno de los más grandes innovadores de la poesía en español. Su poema 'Los heraldos negros' comienza: 'Hay golpes en la vida, tan fuertes... ¡Yo no sé! / Golpes como del odio de Dios.' Su obra evoluciona desde el modernismo de 'Los heraldos negros' hasta la experimentación radical de 'Trilce' y el compromiso social de 'Poemas humanos'. Vivió sus últimos años en París, donde murió en la pobreza.",
    descEn: "César Vallejo (1892-1938) was a Peruvian poet considered one of the greatest innovators of poetry in Spanish. His poem 'The Black Heralds' begins: 'There are blows in life, so powerful... I don't know! / Blows like God's hatred.' His work evolves from the modernism of 'The Black Heralds' to the radical experimentation of 'Trilce' and the social commitment of 'Human Poems.' He lived his last years in Paris, where he died in poverty.",
    vocab: [
      { word: "golpe", english: "blow/hit" },
      { word: "odio", english: "hatred" },
      { word: "sufrimiento", english: "suffering" },
      { word: "heraldo", english: "herald" },
      { word: "hueso", english: "bone" },
      { word: "hambre", english: "hunger" }
    ],
    quiz: [
      {
        prompt: "¿De qué país era César Vallejo?",
        options: ["Chile", "Colombia", "Perú", "Ecuador"],
        correct: 2,
        explanation: "Vallejo was born in Santiago de Chuco, a small town in the Andes of Peru. His Andean heritage and experience of poverty profoundly influenced the raw emotional power of his poetry."
      },
      {
        prompt: "¿Cómo se llama su obra más experimental?",
        options: ["Trilce", "Altazor", "Residencia", "Canto"],
        correct: 0,
        explanation: "'Trilce' (1922) broke all conventions of Spanish-language poetry with invented words, fractured syntax, and radical typographic experimentation. 'Altazor' is by the Chilean poet Vicente Huidobro, not Vallejo."
      },
      {
        prompt: "¿En qué ciudad murió Vallejo?",
        options: ["Lima", "Madrid", "París", "Buenos Aires"],
        correct: 2,
        explanation: "Vallejo spent his final years in Paris, where he lived largely in poverty. He died there on April 15, 1938, having eerily predicted in a poem that he would die in Paris on a rainy day."
      }
    ]
  },
  {
    id: "poetry-dario",
    spanishName: "Rubén Darío - Azul",
    englishName: "Rubén Darío - Blue",
    icon: "💎",
    tags: ["Nicaragua", "modernismo", "preciosismo", "renovación", "siglo XIX"],
    level: "C1",
    descEs: "Rubén Darío (1867-1916) fue un poeta nicaragüense considerado el padre del modernismo literario hispanoamericano. Con la publicación de 'Azul...' en 1888 y 'Prosas profanas' en 1896, renovó completamente la poesía en español, introduciendo nuevos ritmos, vocabulario exótico y una musicalidad sin precedentes. De 'Lo fatal' son estos versos: 'Dichoso el árbol, que es apenas sensitivo, / y más la piedra dura, porque esa ya no siente.' Su influencia alcanzó a toda una generación de poetas en España y América.",
    descEn: "Rubén Darío (1867-1916) was a Nicaraguan poet considered the father of Hispanic American literary modernism. With the publication of 'Azul...' in 1888 and 'Prosas Profanas' in 1896, he completely renewed poetry in Spanish, introducing new rhythms, exotic vocabulary, and unprecedented musicality. From 'Lo fatal': 'Happy the tree, barely sentient, / and happier the hard stone, for it no longer feels.' His influence reached an entire generation of poets in Spain and the Americas.",
    vocab: [
      { word: "azul", english: "blue" },
      { word: "cisne", english: "swan" },
      { word: "dichoso", english: "happy/fortunate" },
      { word: "sensitivo", english: "sentient" },
      { word: "ritmo", english: "rhythm" },
      { word: "belleza", english: "beauty" }
    ],
    quiz: [
      {
        prompt: "¿De qué país era Rubén Darío?",
        options: ["Costa Rica", "Honduras", "Nicaragua", "Panamá"],
        correct: 2,
        explanation: "Darío was born in Metapa (now Ciudad Darío), Nicaragua in 1867. He is Nicaragua's most celebrated literary figure and is often called the 'Prince of Castilian Letters.'"
      },
      {
        prompt: "¿Qué movimiento literario fundó Rubén Darío?",
        options: ["Romanticismo", "Realismo", "Modernismo", "Surrealismo"],
        correct: 2,
        explanation: "Modernismo was the first literary movement to originate in Latin America and influence Spain, reversing centuries of cultural flow. It emphasized musicality, exotic imagery, and formal beauty."
      },
      {
        prompt: "¿En qué año se publicó 'Azul...'?",
        options: ["1878", "1888", "1898", "1908"],
        correct: 1,
        explanation: "'Azul...' was published in 1888 in Valparaíso, Chile, where Darío was living at the time. The book marked the birth of the Modernismo movement in Hispanic literature."
      }
    ]
  },
  {
    id: "poetry-machado",
    spanishName: "Antonio Machado - Caminante no hay camino",
    englishName: "Antonio Machado - Traveler There Is No Path",
    icon: "🛤️",
    tags: ["España", "Generación del 98", "Castilla", "filosofía", "camino"],
    level: "B2",
    descEs: "Antonio Machado (1875-1939) fue un poeta español de la Generación del 98. Sus versos más célebres son: 'Caminante, son tus huellas / el camino y nada más; / Caminante, no hay camino, / se hace camino al andar.' Estos versos, del poema 'Proverbios y cantares', expresan una filosofía existencial profunda. Su poesía refleja el paisaje de Castilla, el paso del tiempo y la meditación sobre España. Murió exiliado en Francia tras la Guerra Civil.",
    descEn: "Antonio Machado (1875-1939) was a Spanish poet of the Generation of '98. His most famous verses are: 'Traveler, your footsteps are / the path and nothing more; / Traveler, there is no path, / the path is made by walking.' These verses, from the poem 'Proverbs and Songs,' express a profound existential philosophy. His poetry reflects the landscape of Castile, the passage of time, and meditation on Spain. He died in exile in France after the Civil War.",
    vocab: [
      { word: "caminante", english: "traveler/walker" },
      { word: "huellas", english: "footprints" },
      { word: "camino", english: "path/road" },
      { word: "andar", english: "to walk" },
      { word: "paisaje", english: "landscape" },
      { word: "exilio", english: "exile" }
    ],
    quiz: [
      {
        prompt: "¿A qué generación literaria pertenecía Antonio Machado?",
        options: ["Generación del 27", "Generación del 98", "Generación del 14", "Generación del 50"],
        correct: 1,
        explanation: "The Generation of '98 was a group of writers who responded to Spain's loss of its last colonies (Cuba, Philippines, Puerto Rico) in 1898. They focused on Spanish identity, landscape, and national renewal."
      },
      {
        prompt: "Según Machado, ¿cómo se hace el camino?",
        options: ["Pensando", "Leyendo", "Al andar", "Al soñar"],
        correct: 2,
        explanation: "'Se hace camino al andar' (the path is made by walking) conveys an existential philosophy: life has no predetermined path, and meaning is created through lived experience and action, not by following a map."
      },
      {
        prompt: "¿Qué región de España inspiró gran parte de su poesía?",
        options: ["Andalucía", "Galicia", "Castilla", "Cataluña"],
        correct: 2,
        explanation: "Machado lived and taught in Soria, in the heart of Castile, from 1907 to 1912. The austere, vast Castilian landscape became a central symbol in his poetry, representing both Spain's essence and spiritual solitude."
      }
    ]
  },
  {
    id: "poetry-storni",
    spanishName: "Alfonsina Storni - Tú me quieres blanca",
    englishName: "Alfonsina Storni - You Want Me White",
    icon: "🌊",
    tags: ["Argentina", "feminismo", "mar", "modernismo", "siglo XX"],
    level: "B2",
    descEs: "Alfonsina Storni (1892-1938) fue una poeta argentina de origen suizo, pionera del feminismo en la literatura hispanoamericana. Su poema 'Tú me quieres blanca' desafía las expectativas patriarcales: 'Tú me quieres alba, / me quieres de espumas, / me quieres de nácar.' Storni luchó contra los prejuicios de su época siendo madre soltera y mujer independiente. Diagnosticada con cáncer, se suicidó entrando al mar en Mar del Plata. La canción 'Alfonsina y el mar' inmortalizó su historia.",
    descEn: "Alfonsina Storni (1892-1938) was an Argentine poet of Swiss origin, a pioneer of feminism in Hispanic American literature. Her poem 'You Want Me White' challenges patriarchal expectations: 'You want me dawn-white, / you want me made of foam, / you want me made of mother-of-pearl.' Storni fought against the prejudices of her era as a single mother and independent woman. Diagnosed with cancer, she died by walking into the sea at Mar del Plata. The song 'Alfonsina y el mar' immortalized her story.",
    vocab: [
      { word: "blanca", english: "white" },
      { word: "alba", english: "dawn" },
      { word: "espuma", english: "foam" },
      { word: "nácar", english: "mother-of-pearl" },
      { word: "mar", english: "sea" },
      { word: "libertad", english: "freedom" }
    ],
    quiz: [
      {
        prompt: "¿Qué desafía el poema 'Tú me quieres blanca'?",
        options: ["La religión", "Las expectativas patriarcales", "La monarquía", "La educación"],
        correct: 1,
        explanation: "The poem challenges the impossible standard of purity men demand of women ('white as dawn, made of foam') while not holding themselves to the same standard. It was a bold feminist statement for early 20th-century Argentina."
      },
      {
        prompt: "¿Qué canción inmortalizó la historia de Alfonsina Storni?",
        options: ["Alfonsina y la luna", "Alfonsina y el mar", "Alfonsina y el viento", "Alfonsina y la noche"],
        correct: 1,
        explanation: "'Alfonsina y el mar,' composed by Ariel Ramírez and Félix Luna in 1969, is one of the most beloved songs in Argentine music. It poetically recounts Storni's final walk into the ocean at Mar del Plata."
      },
      {
        prompt: "¿En qué ciudad argentina murió Storni?",
        options: ["Buenos Aires", "Rosario", "Mar del Plata", "Córdoba"],
        correct: 2,
        explanation: "Storni walked into the sea at the beach of La Perla in Mar del Plata on October 25, 1938. The seaside city on the Atlantic coast of Argentina is forever linked with her tragic and iconic final act."
      }
    ]
  }
];
