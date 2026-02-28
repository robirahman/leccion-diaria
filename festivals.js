const FESTIVALS_DATA = [
  {
    id: "festival-dia-muertos",
    spanishName: "Día de los Muertos",
    englishName: "Day of the Dead",
    icon: "💀",
    tags: ["México", "noviembre", "ofrenda", "calavera", "Patrimonio"],
    descEs: "El Día de los Muertos se celebra el 1 y 2 de noviembre en México y fue declarado Patrimonio Cultural Inmaterial por la UNESCO en 2008. Es una celebración donde los vivos honran a los difuntos con ofrendas que incluyen comida favorita, flores de cempasúchil, velas, pan de muerto y calaveras de azúcar. Se cree que los muertos regresan a visitar a sus familias durante estos días. La celebración mezcla tradiciones prehispánicas con el catolicismo. No es una festividad triste, sino una celebración alegre de la vida y la memoria.",
    descEn: "Day of the Dead is celebrated on November 1 and 2 in Mexico and was declared Intangible Cultural Heritage by UNESCO in 2008. It is a celebration where the living honor the deceased with offerings that include favorite foods, marigold flowers, candles, bread of the dead, and sugar skulls. It is believed that the dead return to visit their families during these days. The celebration blends pre-Hispanic traditions with Catholicism. It is not a sad festivity but a joyful celebration of life and memory.",
    vocab: [
      { word: "ofrenda", english: "offering/altar" },
      { word: "calavera", english: "skull" },
      { word: "cempasúchil", english: "marigold" },
      { word: "difunto", english: "deceased" },
      { word: "pan de muerto", english: "bread of the dead" },
      { word: "vela", english: "candle" }
    ],
    quiz: [
      {
        prompt: "¿En qué fechas se celebra el Día de los Muertos?",
        options: ["31 de octubre", "1 y 2 de noviembre", "2 de noviembre solamente", "1 de noviembre solamente"],
        correct: 1,
        explanation: "November 1 (All Saints' Day) honors deceased children, while November 2 (All Souls' Day) honors deceased adults. Both days together form the full Día de los Muertos celebration."
      },
      {
        prompt: "¿Qué flor es símbolo del Día de los Muertos?",
        options: ["Rosa", "Girasol", "Cempasúchil", "Clavel"],
        correct: 2,
        explanation: "The cempasúchil (marigold) is believed to guide the spirits of the dead back to their families with its bright orange color and strong scent. It has been used in Mexican death rituals since pre-Hispanic times."
      },
      {
        prompt: "¿Qué organización declaró esta fiesta Patrimonio Cultural Inmaterial?",
        options: ["OEA", "ONU", "UNESCO", "UNICEF"],
        correct: 2,
        explanation: "UNESCO (the United Nations Educational, Scientific and Cultural Organization) designated Día de los Muertos as Intangible Cultural Heritage in 2008, recognizing its significance as a living cultural tradition."
      }
    ]
  },
  {
    id: "festival-tomatina",
    spanishName: "La Tomatina",
    englishName: "La Tomatina (Tomato Festival)",
    icon: "🍅",
    tags: ["España", "Buñol", "agosto", "tomates", "fiesta"],
    descEs: "La Tomatina es una fiesta que se celebra el último miércoles de agosto en Buñol, Valencia, España. Miles de personas se lanzan más de 120 toneladas de tomates maduros durante una hora. La fiesta comenzó en 1945 cuando unos jóvenes iniciaron una pelea con tomates de un puesto del mercado. La batalla comienza cuando alguien logra trepar un poste engrasado para alcanzar un jamón en la cima. Después de la pelea, los camiones de bomberos limpian las calles. Es una de las fiestas más peculiares del mundo.",
    descEn: "La Tomatina is a festival held on the last Wednesday of August in Buñol, Valencia, Spain. Thousands of people throw over 120 tons of ripe tomatoes at each other for one hour. The festival began in 1945 when some young people started a fight with tomatoes from a market stand. The battle begins when someone manages to climb a greased pole to reach a ham at the top. After the fight, fire trucks clean the streets. It is one of the most peculiar festivals in the world.",
    vocab: [
      { word: "tomate", english: "tomato" },
      { word: "lanzar", english: "to throw" },
      { word: "batalla", english: "battle" },
      { word: "maduro", english: "ripe" },
      { word: "calle", english: "street" },
      { word: "fiesta", english: "party/festival" }
    ],
    quiz: [
      {
        prompt: "¿En qué pueblo español se celebra La Tomatina?",
        options: ["Valencia", "Buñol", "Alicante", "Castellón"],
        correct: 1,
        explanation: "Buñol is a small town of about 9,000 people in the Valencia province. Although Valencia is the nearby major city, the festival itself takes place specifically in Buñol's town center."
      },
      {
        prompt: "¿Cuántas toneladas de tomates se usan aproximadamente?",
        options: ["50", "80", "120", "200"],
        correct: 2,
        explanation: "Over 120 metric tons of overripe tomatoes are trucked in specifically for the event. These are low-quality tomatoes not suitable for sale, so the festival does not waste edible produce."
      },
      {
        prompt: "¿Qué señal marca el inicio de la batalla de tomates?",
        options: ["Un cañón", "Alguien alcanza un jamón en un poste", "Una campana", "Un cohete"],
        correct: 1,
        explanation: "A ham is placed at the top of a tall, greased wooden pole (palo jabón). The tomato fight officially begins only after someone successfully climbs the slippery pole and retrieves the ham."
      }
    ]
  },
  {
    id: "festival-feria-abril",
    spanishName: "Feria de Abril",
    englishName: "April Fair",
    icon: "💃",
    tags: ["España", "Sevilla", "flamenco", "caballos", "casetas"],
    descEs: "La Feria de Abril se celebra en Sevilla, España, dos semanas después de Semana Santa. Durante seis días, más de mil casetas (carpas decoradas) llenan el recinto ferial donde las familias comen, beben, cantan y bailan sevillanas. Las mujeres visten el traje de flamenca con lunares y los hombres montan a caballo o llevan traje corto. La portada, una estructura iluminada diferente cada año, marca la entrada. El farolillo y la manzanilla son símbolos de la feria. Es la fiesta más importante de Sevilla.",
    descEn: "The April Fair is held in Seville, Spain, two weeks after Easter. For six days, more than a thousand casetas (decorated tents) fill the fairgrounds where families eat, drink, sing, and dance sevillanas. Women wear the flamenca dress with polka dots and men ride horses or wear the short suit. The portada, a differently illuminated structure each year, marks the entrance. Paper lanterns and manzanilla sherry are symbols of the fair. It is Seville's most important celebration.",
    vocab: [
      { word: "caseta", english: "tent/booth" },
      { word: "sevillanas", english: "Sevillian dance" },
      { word: "traje de flamenca", english: "flamenco dress" },
      { word: "lunares", english: "polka dots" },
      { word: "caballo", english: "horse" },
      { word: "farolillo", english: "paper lantern" }
    ],
    quiz: [
      {
        prompt: "¿En qué ciudad se celebra la Feria de Abril?",
        options: ["Madrid", "Granada", "Sevilla", "Córdoba"],
        correct: 2,
        explanation: "The Feria de Abril is Seville's signature celebration and one of Andalusia's most iconic events. It originated in 1847 as a livestock fair and evolved into the massive cultural festival it is today."
      },
      {
        prompt: "¿Qué baile es típico de la Feria de Abril?",
        options: ["Flamenco puro", "Sevillanas", "Salsa", "Pasodoble"],
        correct: 1,
        explanation: "Sevillanas are a specific folk dance style from Seville, distinct from flamenco puro. They are danced in pairs with four structured parts (coplas) and are considered more accessible than traditional flamenco."
      },
      {
        prompt: "¿Cuándo se celebra la Feria de Abril?",
        options: ["En abril siempre", "Dos semanas después de Semana Santa", "El primer fin de semana de abril", "En mayo"],
        correct: 1,
        explanation: "Despite its name ('April Fair'), the Feria's dates shift each year because they are tied to the date of Easter. When Easter falls late, the Feria can actually take place in May."
      }
    ]
  },
  {
    id: "festival-carnaval-barranquilla",
    spanishName: "Carnaval de Barranquilla",
    englishName: "Barranquilla Carnival",
    icon: "🎭",
    tags: ["Colombia", "carnaval", "Patrimonio", "danza", "música"],
    descEs: "El Carnaval de Barranquilla es la fiesta folclórica y cultural más grande de Colombia, declarada Patrimonio Cultural Inmaterial por la UNESCO en 2003. Se celebra cuatro días antes del Miércoles de Ceniza con desfiles, danzas, música y disfraces. La Batalla de Flores abre el carnaval con carrozas decoradas. Personajes como la Marimonda, el Congo y el Garabato son icónicos. La cumbia, el mapalé y el son de negro son los ritmos protagonistas. El carnaval termina con el 'entierro de Joselito Carnaval'.",
    descEn: "The Barranquilla Carnival is the largest folk and cultural festival in Colombia, declared Intangible Cultural Heritage by UNESCO in 2003. It is celebrated four days before Ash Wednesday with parades, dances, music, and costumes. The Batalla de Flores (Battle of Flowers) opens the carnival with decorated floats. Characters like the Marimonda, the Congo, and the Garabato are iconic. Cumbia, mapalé, and son de negro are the featured rhythms. The carnival ends with the 'burial of Joselito Carnaval.'",
    vocab: [
      { word: "disfraz", english: "costume" },
      { word: "desfile", english: "parade" },
      { word: "carroza", english: "float" },
      { word: "máscara", english: "mask" },
      { word: "comparsa", english: "dance troupe" },
      { word: "entierro", english: "burial" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llama el desfile que abre el Carnaval de Barranquilla?",
        options: ["Gran Parada", "Batalla de Flores", "Desfile de Comparsas", "Marcha Real"],
        correct: 1,
        explanation: "The Batalla de Flores (Battle of Flowers) is the opening parade on Saturday, featuring elaborately decorated floats. It dates back to 1903 and sets the tone for the four days of celebration."
      },
      {
        prompt: "¿En qué año declaró la UNESCO al Carnaval de Barranquilla Patrimonio?",
        options: ["2000", "2003", "2005", "2010"],
        correct: 1,
        explanation: "UNESCO recognized the Barranquilla Carnival in 2003 as a Masterpiece of the Oral and Intangible Heritage of Humanity, acknowledging its unique blend of Indigenous, African, and European cultural traditions."
      },
      {
        prompt: "¿Cómo termina el Carnaval de Barranquilla?",
        options: ["Con fuegos artificiales", "Con el entierro de Joselito Carnaval", "Con un concierto", "Con una misa"],
        correct: 1,
        explanation: "Joselito Carnaval is a symbolic character who represents the spirit of the festival. His mock funeral on the final day (Tuesday) is a humorous and emotional farewell, with participants pretending to mourn the end of the festivities."
      }
    ]
  },
  {
    id: "festival-san-fermin",
    spanishName: "San Fermín",
    englishName: "San Fermín Festival",
    icon: "🐂",
    tags: ["España", "Pamplona", "julio", "encierro", "toros"],
    descEs: "Las fiestas de San Fermín se celebran en Pamplona, Navarra, del 6 al 14 de julio. Comienzan con el 'chupinazo', un cohete lanzado desde el balcón del ayuntamiento, mientras la multitud grita '¡Pamploneses, viva San Fermín!'. Lo más famoso es el encierro, la carrera de toros por las calles cada mañana. Pero las fiestas incluyen también procesiones religiosas, conciertos, gigantes y cabezudos, y fuegos artificiales. Los participantes visten de blanco con pañuelo y faja rojos. El 'Pobre de mí' cierra las fiestas con tristeza.",
    descEn: "The San Fermín festival is celebrated in Pamplona, Navarre, from July 6 to 14. It begins with the 'chupinazo,' a rocket launched from the city hall balcony while the crowd shouts 'Pamploneses, long live San Fermín!' The most famous event is the encierro, the running of bulls through the streets each morning. But the festival also includes religious processions, concerts, giants and big-heads, and fireworks. Participants dress in white with red scarves and sashes. 'Pobre de mí' (Poor me) closes the festival with sadness.",
    vocab: [
      { word: "chupinazo", english: "opening rocket" },
      { word: "encierro", english: "bull run" },
      { word: "pañuelo", english: "scarf" },
      { word: "gigantes", english: "giants (figures)" },
      { word: "ayuntamiento", english: "city hall" },
      { word: "cohete", english: "rocket" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llama el acto que abre las fiestas de San Fermín?",
        options: ["El encierro", "El chupinazo", "La corrida", "El pasacalles"],
        correct: 1,
        explanation: "The chupinazo is a rocket (cohete) fired from the balcony of Pamplona's city hall at noon on July 6. The moment it launches, the crowd erupts and the nine-day festival officially begins."
      },
      {
        prompt: "¿Cuántos días duran las fiestas de San Fermín?",
        options: ["Cinco", "Siete", "Nueve", "Diez"],
        correct: 2,
        explanation: "The festival runs from July 6 through July 14, making it nine full days. The encierro (bull run) takes place every morning at 8:00 AM during this period."
      },
      {
        prompt: "¿Cómo se llama el acto que cierra las fiestas?",
        options: ["El adiós", "Pobre de mí", "Hasta luego", "El final"],
        correct: 1,
        explanation: "At midnight on July 14, crowds gather in the town square singing 'Pobre de mí, pobre de mí, que se han acabado las fiestas de San Fermín' (Poor me, the festival is over), holding candles in a bittersweet farewell."
      }
    ]
  },
  {
    id: "festival-inti-raymi",
    spanishName: "Inti Raymi",
    englishName: "Festival of the Sun",
    icon: "☀️",
    tags: ["Perú", "inca", "solsticio", "Cusco", "sol"],
    descEs: "El Inti Raymi es la 'Fiesta del Sol' de origen inca, celebrada el 24 de junio en Cusco, Perú, durante el solsticio de invierno del hemisferio sur. Era la celebración más importante del Imperio Inca, dedicada al dios sol Inti. Fue prohibida por los españoles en 1572 y restaurada en 1944. La ceremonia se recrea en Sacsayhuamán con actores que representan al Sapa Inca realizando rituales y ofrendas. Miles de turistas y peruanos asisten cada año para presenciar esta conexión con el pasado ancestral.",
    descEn: "Inti Raymi is the 'Festival of the Sun' of Inca origin, celebrated on June 24 in Cusco, Peru, during the winter solstice of the southern hemisphere. It was the most important celebration of the Inca Empire, dedicated to the sun god Inti. It was banned by the Spanish in 1572 and restored in 1944. The ceremony is recreated at Sacsayhuamán with actors representing the Sapa Inca performing rituals and offerings. Thousands of tourists and Peruvians attend each year to witness this connection to the ancestral past.",
    vocab: [
      { word: "sol", english: "sun" },
      { word: "solsticio", english: "solstice" },
      { word: "imperio", english: "empire" },
      { word: "ritual", english: "ritual" },
      { word: "ofrenda", english: "offering" },
      { word: "ancestral", english: "ancestral" }
    ],
    quiz: [
      {
        prompt: "¿A qué dios inca está dedicado el Inti Raymi?",
        options: ["Pachamama", "Viracocha", "Inti", "Quilla"],
        correct: 2,
        explanation: "Inti means 'sun' in Quechua and was the most revered deity of the Inca Empire. The Incas considered themselves 'children of the sun,' and the Sapa Inca was believed to be Inti's direct descendant."
      },
      {
        prompt: "¿En qué lugar de Cusco se realiza la ceremonia principal?",
        options: ["Machu Picchu", "Plaza de Armas", "Sacsayhuamán", "Ollantaytambo"],
        correct: 2,
        explanation: "Sacsayhuaman is an enormous Inca stone fortress overlooking Cusco. Its massive stone walls and open esplanade make it the perfect stage for recreating the grand imperial ceremony as it was performed in Inca times."
      },
      {
        prompt: "¿En qué año se restauró la celebración del Inti Raymi?",
        options: ["1920", "1933", "1944", "1960"],
        correct: 2,
        explanation: "After being banned by the Spanish in 1572, the ceremony was revived in 1944 by Peruvian actor and intellectual Faustino Espinoza Navarro, based on the chronicles of Inca Garcilaso de la Vega."
      }
    ]
  },
  {
    id: "festival-las-fallas",
    spanishName: "Las Fallas",
    englishName: "Las Fallas (The Fires)",
    icon: "🔥",
    tags: ["España", "Valencia", "marzo", "fuego", "arte"],
    descEs: "Las Fallas de Valencia se celebran del 15 al 19 de marzo, culminando en la Nit del Foc (Noche del Fuego). Durante meses, artistas construyen enormes figuras satíricas de cartón piedra y madera llamadas 'fallas' o 'ninots'. El 19 de marzo, festividad de San José, todas las fallas se queman en la 'cremà', excepto el 'ninot indultat' (ninot perdonado), elegido por votación popular. La mascletà, una potente serie de petardos, retumba cada día a las 14:00 en la Plaza del Ayuntamiento. Las Fallas fueron declaradas Patrimonio UNESCO en 2016.",
    descEn: "Las Fallas of Valencia is celebrated from March 15 to 19, culminating in the Nit del Foc (Night of Fire). For months, artists build enormous satirical figures from papier-mâché and wood called 'fallas' or 'ninots.' On March 19, the feast of San José, all fallas are burned in the 'cremà,' except the 'ninot indultat' (pardoned figure), chosen by popular vote. The mascletà, a powerful series of firecrackers, rumbles every day at 2:00 PM in the City Hall Square. Las Fallas was declared UNESCO Heritage in 2016.",
    vocab: [
      { word: "fuego", english: "fire" },
      { word: "quemar", english: "to burn" },
      { word: "figura", english: "figure" },
      { word: "petardo", english: "firecracker" },
      { word: "artista", english: "artist" },
      { word: "sátira", english: "satire" }
    ],
    quiz: [
      {
        prompt: "¿Qué pasa con las fallas el 19 de marzo?",
        options: ["Se guardan en un museo", "Se queman", "Se venden", "Se regalan"],
        correct: 1,
        explanation: "The 'cremà' (burning) on March 19 — the feast of San José, patron saint of carpenters — is the climax of the festival. Burning the figures symbolizes purification and renewal, letting go of the old to welcome spring."
      },
      {
        prompt: "¿Qué es el 'ninot indultat'?",
        options: ["El artista ganador", "La falla más grande", "La única figura que no se quema", "El juez del concurso"],
        correct: 2,
        explanation: "Each year the public votes to 'pardon' (indultar) one ninot from the flames. This saved figure is preserved in the Museo Fallero in Valencia, creating a unique historical collection dating back to 1934."
      },
      {
        prompt: "¿Qué es la 'mascletà'?",
        options: ["Un baile", "Una comida", "Una serie de petardos", "Una procesión"],
        correct: 2,
        explanation: "The mascletà is a daytime firecracker display focused on rhythm and noise rather than visual effects. It takes place every day at 2:00 PM in the Plaza del Ayuntamiento and is felt as much as heard, with the ground shaking from the explosions."
      }
    ]
  },
  {
    id: "festival-guelaguetza",
    spanishName: "Guelaguetza",
    englishName: "Guelaguetza",
    icon: "🌺",
    tags: ["México", "Oaxaca", "indígena", "danza", "julio"],
    descEs: "La Guelaguetza es una fiesta indígena que se celebra en Oaxaca, México, los dos últimos lunes de julio. El nombre viene del zapoteco y significa 'ofrenda' o 'intercambio recíproco de regalos'. Delegaciones de las ocho regiones de Oaxaca presentan sus danzas tradicionales, música y trajes típicos en el anfiteatro del Cerro del Fortín. Después de cada presentación, los bailarines lanzan regalos al público: frutas, pan, artesanías y mezcal. Es una de las celebraciones indígenas más grandes de México.",
    descEn: "The Guelaguetza is an indigenous festival celebrated in Oaxaca, Mexico, on the last two Mondays of July. The name comes from Zapotec and means 'offering' or 'reciprocal exchange of gifts.' Delegations from the eight regions of Oaxaca present their traditional dances, music, and typical costumes at the amphitheater on Cerro del Fortín. After each performance, dancers throw gifts to the audience: fruits, bread, crafts, and mezcal. It is one of the largest indigenous celebrations in Mexico.",
    vocab: [
      { word: "ofrenda", english: "offering" },
      { word: "danza", english: "dance" },
      { word: "traje típico", english: "traditional costume" },
      { word: "artesanía", english: "craft/handicraft" },
      { word: "mezcal", english: "mezcal" },
      { word: "intercambio", english: "exchange" }
    ],
    quiz: [
      {
        prompt: "¿Qué significa 'Guelaguetza' en zapoteco?",
        options: ["Fiesta grande", "Ofrenda o intercambio recíproco", "Danza sagrada", "Cosecha buena"],
        correct: 1,
        explanation: "The Zapotec word 'guelaguetza' refers to a system of reciprocal giving deeply rooted in indigenous Oaxacan culture. Communities exchange gifts, labor, and support — a practice that predates Spanish colonization and still governs social relations today."
      },
      {
        prompt: "¿En qué estado mexicano se celebra la Guelaguetza?",
        options: ["Chiapas", "Guerrero", "Oaxaca", "Puebla"],
        correct: 2,
        explanation: "Oaxaca is one of Mexico's most ethnically diverse states, home to 16 indigenous groups including Zapotecs and Mixtecs. The Guelaguetza showcases this diversity by bringing together delegations from all eight of Oaxaca's cultural regions."
      },
      {
        prompt: "¿Qué hacen los bailarines después de cada presentación?",
        options: ["Cantan una canción", "Lanzan regalos al público", "Hacen una oración", "Saludan al gobernador"],
        correct: 1,
        explanation: "Throwing gifts to the audience embodies the festival's core meaning of reciprocal exchange. Dancers toss regional products like pineapples, mezcal, bread, and handmade crafts as a way of sharing their community's bounty."
      }
    ]
  },
  {
    id: "festival-semana-santa",
    spanishName: "Semana Santa",
    englishName: "Holy Week",
    icon: "✝️",
    tags: ["España", "latinoamérica", "religión", "procesión", "primavera"],
    descEs: "La Semana Santa es la celebración religiosa más importante del mundo hispanohablante, conmemorando la pasión, muerte y resurrección de Jesucristo. En España, especialmente en Sevilla, Málaga y Valladolid, las cofradías sacan procesiones con impresionantes pasos (plataformas con esculturas religiosas) cargados por costaleros. En Antigua Guatemala, se crean alfombras de aserrín de colores en las calles. En cada país la celebración tiene características únicas, pero todas comparten la profunda devoción y la solemnidad.",
    descEn: "Holy Week is the most important religious celebration in the Spanish-speaking world, commemorating the passion, death, and resurrection of Jesus Christ. In Spain, especially in Seville, Málaga, and Valladolid, brotherhoods carry out processions with impressive pasos (platforms with religious sculptures) carried by costaleros. In Antigua Guatemala, colored sawdust carpets are created on the streets. Each country's celebration has unique characteristics, but all share deep devotion and solemnity.",
    vocab: [
      { word: "procesión", english: "procession" },
      { word: "cofradía", english: "brotherhood" },
      { word: "paso", english: "float/platform" },
      { word: "costalero", english: "float bearer" },
      { word: "resurrección", english: "resurrection" },
      { word: "devoción", english: "devotion" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llaman los que cargan los pasos en Semana Santa en España?",
        options: ["Portadores", "Costaleros", "Nazarenos", "Cofrades"],
        correct: 1,
        explanation: "Costaleros carry the enormous pasos (floats) on their necks and shoulders, hidden beneath the platform. The name comes from 'costal' (sack), referring to the padded cloth they wear on their necks for protection."
      },
      {
        prompt: "¿Qué se crea en las calles de Antigua Guatemala durante Semana Santa?",
        options: ["Murales", "Alfombras de aserrín de colores", "Fuentes de agua", "Arcos de flores"],
        correct: 1,
        explanation: "These elaborate carpets are made from dyed sawdust, flowers, fruits, and vegetables, laid out by hand along the procession route. They take hours to create but are destroyed in minutes as the processions walk over them, symbolizing the transience of life."
      },
      {
        prompt: "¿Qué ciudad española es más famosa por su Semana Santa?",
        options: ["Madrid", "Barcelona", "Sevilla", "Bilbao"],
        correct: 2,
        explanation: "Seville's Semana Santa is world-renowned for its dramatic processions organized by over 60 cofradías (brotherhoods), some dating back to the 14th century. It draws hundreds of thousands of visitors and is considered the most elaborate Holy Week celebration in Spain."
      }
    ]
  },
  {
    id: "festival-dia-reyes",
    spanishName: "Día de los Reyes Magos",
    englishName: "Three Kings' Day / Epiphany",
    icon: "👑",
    tags: ["España", "latinoamérica", "enero", "regalos", "niños"],
    descEs: "El Día de los Reyes Magos se celebra el 6 de enero en España y Latinoamérica. Melchor, Gaspar y Baltasar son los tres reyes que, según la tradición cristiana, llevaron regalos al niño Jesús. En España, la noche del 5 de enero se celebra la Cabalgata de Reyes, un desfile donde los reyes lanzan caramelos desde carrozas. Los niños dejan sus zapatos con paja y agua para los camellos, y al despertar encuentran regalos. Se come el Roscón de Reyes, un bizcocho con una figurita y un haba escondidas dentro.",
    descEn: "Three Kings' Day is celebrated on January 6 in Spain and Latin America. Melchor, Gaspar, and Baltasar are the three kings who, according to Christian tradition, brought gifts to baby Jesus. In Spain, on the evening of January 5, the Cabalgata de Reyes (Kings' Parade) is held, where the kings throw candy from floats. Children leave their shoes with straw and water for the camels, and upon waking find gifts. The Roscón de Reyes is eaten, a cake with a figurine and a bean hidden inside.",
    vocab: [
      { word: "reyes magos", english: "three wise kings" },
      { word: "regalos", english: "gifts" },
      { word: "cabalgata", english: "parade" },
      { word: "caramelos", english: "candy" },
      { word: "zapatos", english: "shoes" },
      { word: "roscón", english: "ring-shaped cake" }
    ],
    quiz: [
      {
        prompt: "¿Qué fecha se celebra el Día de los Reyes?",
        options: ["25 de diciembre", "1 de enero", "6 de enero", "2 de febrero"],
        correct: 2,
        explanation: "January 6 corresponds to the Christian feast of Epiphany, which commemorates the visit of the Three Wise Men to the baby Jesus. In most Spanish-speaking countries, this date — not December 25 — is traditionally the main gift-giving day for children."
      },
      {
        prompt: "¿Qué dejan los niños españoles para los camellos de los Reyes?",
        options: ["Galletas", "Leche", "Paja y agua", "Zanahorias"],
        correct: 2,
        explanation: "Children leave straw and water for the camels that the Three Kings ride, similar to how American children leave cookies for Santa. It teaches generosity by having children think of the animals that carried the kings on their long journey."
      },
      {
        prompt: "¿Qué se esconde dentro del Roscón de Reyes?",
        options: ["Una moneda y un anillo", "Una figurita y un haba", "Un mensaje y una llave", "Un caramelo y un dado"],
        correct: 1,
        explanation: "The person who finds the small figurine in their slice is 'crowned' king or queen for the day, while the person who gets the dried bean (haba) traditionally has to pay for the roscón — adding a playful element to the family gathering."
      }
    ]
  }
];
