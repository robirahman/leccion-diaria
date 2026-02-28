const SPORTS_DATA = [
  {
    id: "sport-futbol",
    spanishName: "Fútbol",
    englishName: "Soccer/Football",
    icon: "⚽",
    tags: ["mundial", "pasión", "liga", "selección", "gol"],
    descEs: "El fútbol es el deporte más popular en todos los países hispanohablantes. España ganó la Copa del Mundo en 2010, y Argentina la ganó en 2022 con Lionel Messi. La Liga española incluye al Real Madrid y FC Barcelona, cuyo enfrentamiento se llama 'El Clásico'. En Latinoamérica, el fútbol es más que un deporte: es una identidad cultural. La rivalidad entre Boca Juniors y River Plate en Argentina se conoce como el 'Superclásico'. Diego Maradona es considerado un dios del fútbol en Argentina.",
    descEn: "Soccer is the most popular sport in all Spanish-speaking countries. Spain won the World Cup in 2010, and Argentina won it in 2022 with Lionel Messi. The Spanish League includes Real Madrid and FC Barcelona, whose matchup is called 'El Clásico.' In Latin America, soccer is more than a sport: it is a cultural identity. The rivalry between Boca Juniors and River Plate in Argentina is known as the 'Superclásico.' Diego Maradona is considered a god of soccer in Argentina.",
    vocab: [
      { word: "gol", english: "goal" },
      { word: "portero", english: "goalkeeper" },
      { word: "cancha", english: "field/pitch" },
      { word: "árbitro", english: "referee" },
      { word: "selección", english: "national team" },
      { word: "hincha", english: "fan" }
    ],
    quiz: [
      {
        prompt: "¿En qué año ganó España la Copa del Mundo?",
        options: ["2006", "2010", "2014", "2018"],
        correct: 1,
        explanation: "Spain won its first and only FIFA World Cup in 2010, held in South Africa, defeating the Netherlands 1-0 in the final with a goal by Andrés Iniesta."
      },
      {
        prompt: "¿Cómo se llama el enfrentamiento entre Real Madrid y Barcelona?",
        options: ["El Derbi", "El Superclásico", "El Clásico", "La Final"],
        correct: 2,
        explanation: "The match between Real Madrid and FC Barcelona is called 'El Clásico' because it is the classic rivalry of Spanish football. 'El Superclásico' refers to the Argentine rivalry between Boca Juniors and River Plate."
      },
      {
        prompt: "¿Qué significa 'hincha' en el contexto del fútbol?",
        options: ["Jugador", "Entrenador", "Aficionado/fan", "Árbitro"],
        correct: 2,
        explanation: "'Hincha' is the common Spanish word for a sports fan or supporter, originally from Río de la Plata Spanish. It comes from the verb 'hinchar' (to inflate), referring to the person who inflated footballs at early matches."
      }
    ]
  },
  {
    id: "sport-lucha-libre",
    spanishName: "Lucha Libre",
    englishName: "Mexican Wrestling",
    icon: "🤼",
    tags: ["México", "máscara", "espectáculo", "tradición", "héroe"],
    descEs: "La lucha libre mexicana es un espectáculo deportivo y cultural que combina atletismo con teatro. Los luchadores usan máscaras coloridas que representan su identidad y son sagradas: perder la máscara en una 'apuesta de máscara' es la mayor humillación. Los luchadores se dividen en 'técnicos' (héroes) y 'rudos' (villanos). El Santo, el enmascarado de plata, es el luchador más legendario y también protagonizó películas. La Arena México en Ciudad de México es el templo de la lucha libre.",
    descEn: "Mexican lucha libre is a sporting and cultural spectacle combining athleticism with theater. Wrestlers wear colorful masks representing their identity, which are sacred: losing the mask in a 'mask vs. mask match' is the greatest humiliation. Wrestlers are divided into 'técnicos' (heroes) and 'rudos' (villains). El Santo, the silver-masked wrestler, is the most legendary and also starred in films. Arena México in Mexico City is the temple of lucha libre.",
    vocab: [
      { word: "máscara", english: "mask" },
      { word: "luchador", english: "wrestler" },
      { word: "ring", english: "ring" },
      { word: "técnico", english: "hero/good guy" },
      { word: "rudo", english: "villain/bad guy" },
      { word: "llave", english: "hold/lock" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llama el luchador más legendario de México?",
        options: ["Blue Demon", "El Santo", "Mil Máscaras", "El Hijo del Santo"],
        correct: 1,
        explanation: "El Santo (the Saint), known for his iconic silver mask, was the most famous luchador in Mexican history. He starred in over 50 films and became a folk hero symbolizing justice, never removing his mask publicly until shortly before his death in 1984."
      },
      {
        prompt: "¿Cómo se llaman los luchadores 'buenos' en la lucha libre?",
        options: ["Rudos", "Técnicos", "Santos", "Campeones"],
        correct: 1,
        explanation: "In lucha libre, the heroes are called 'técnicos' (technicians) because they traditionally rely on technical wrestling skill, while the villains ('rudos') use dirty tactics and rule-breaking to win."
      },
      {
        prompt: "¿Qué representa la máscara para un luchador?",
        options: ["Solo decoración", "Su identidad sagrada", "Su equipo", "Su país"],
        correct: 1,
        explanation: "A luchador's mask is considered sacred because it embodies their wrestling persona and identity. Losing it in a 'lucha de apuestas' (stakes match) is the ultimate humiliation, forcing the wrestler to reveal their true face permanently."
      }
    ]
  },
  {
    id: "sport-jai-alai",
    spanishName: "Jai Alai (Pelota Vasca)",
    englishName: "Jai Alai (Basque Pelota)",
    icon: "🏑",
    tags: ["País Vasco", "España", "velocidad", "cesta", "frontón"],
    descEs: "El jai alai, también conocido como pelota vasca, es un deporte originario del País Vasco en España. Se juega en un frontón (cancha con paredes) usando una cesta curvada llamada 'cesta-punta' para lanzar y recoger una pelota de goma dura a velocidades de hasta 300 km/h, lo que lo convierte en uno de los deportes de pelota más rápidos del mundo. 'Jai alai' significa 'fiesta alegre' en euskera (lengua vasca). Fue muy popular en Florida, Cuba y Filipinas.",
    descEn: "Jai alai, also known as Basque pelota, is a sport originating from the Basque Country in Spain. It is played in a frontón (walled court) using a curved basket called 'cesta-punta' to throw and catch a hard rubber ball at speeds up to 300 km/h, making it one of the fastest ball sports in the world. 'Jai alai' means 'happy festival' in Euskera (Basque language). It was very popular in Florida, Cuba, and the Philippines.",
    vocab: [
      { word: "frontón", english: "walled court" },
      { word: "pelota", english: "ball" },
      { word: "cesta", english: "basket" },
      { word: "pared", english: "wall" },
      { word: "lanzar", english: "to throw" },
      { word: "velocidad", english: "speed" }
    ],
    quiz: [
      {
        prompt: "¿De qué región es originario el jai alai?",
        options: ["Cataluña", "Andalucía", "País Vasco", "Galicia"],
        correct: 2,
        explanation: "Jai alai originated in the Basque Country (País Vasco), the region straddling northern Spain and southwestern France. The name itself comes from the Basque language (Euskera), not Spanish."
      },
      {
        prompt: "¿Qué significa 'jai alai' en euskera?",
        options: ["Pelota rápida", "Fiesta alegre", "Juego fuerte", "Mano dura"],
        correct: 1,
        explanation: "In Euskera (the Basque language), 'jai' means 'festival' or 'celebration' and 'alai' means 'happy' or 'merry,' so 'jai alai' translates to 'happy festival,' reflecting the festive nature of the sport's origins."
      },
      {
        prompt: "¿A qué velocidad puede llegar la pelota en jai alai?",
        options: ["100 km/h", "200 km/h", "300 km/h", "400 km/h"],
        correct: 2,
        explanation: "The pelota in jai alai can reach speeds up to 300 km/h (about 186 mph), making it one of the fastest ball sports in the world. The curved cesta-punta basket acts like a sling, amplifying the throwing force."
      }
    ]
  },
  {
    id: "sport-tauromaquia",
    spanishName: "Tauromaquia (Historia)",
    englishName: "Bullfighting (History)",
    icon: "🐂",
    tags: ["España", "controversia", "tradición", "historia", "cultura"],
    descEs: "La tauromaquia tiene una historia de más de mil años en la Península Ibérica. La corrida de toros moderna se formalizó en el siglo XVIII con Francisco Romero. Un torero famoso como Manolete (1917-1947) se convirtió en leyenda nacional. La plaza de toros de Las Ventas en Madrid es la más importante del mundo. Hoy, la tauromaquia es muy controvertida: algunos la defienden como patrimonio cultural y otros la consideran maltrato animal. Cataluña la prohibió en 2010.",
    descEn: "Bullfighting has a history of over a thousand years in the Iberian Peninsula. The modern bullfight was formalized in the 18th century with Francisco Romero. A famous bullfighter like Manolete (1917-1947) became a national legend. The Las Ventas bullring in Madrid is the most important in the world. Today, bullfighting is highly controversial: some defend it as cultural heritage while others consider it animal abuse. Catalonia banned it in 2010.",
    vocab: [
      { word: "torero", english: "bullfighter" },
      { word: "plaza de toros", english: "bullring" },
      { word: "capote", english: "cape" },
      { word: "toro", english: "bull" },
      { word: "corrida", english: "bullfight" },
      { word: "ruedo", english: "arena/ring" }
    ],
    quiz: [
      {
        prompt: "¿Cuál es la plaza de toros más importante del mundo?",
        options: ["La Maestranza", "Las Ventas", "La Monumental", "El Coliseo"],
        correct: 1,
        explanation: "Las Ventas in Madrid, officially the Plaza de Toros de Las Ventas, is considered the most important bullring in the world. Performing there is the highest honor for a matador, similar to playing at a sport's most prestigious venue."
      },
      {
        prompt: "¿Qué comunidad española prohibió las corridas de toros en 2010?",
        options: ["País Vasco", "Galicia", "Cataluña", "Canarias"],
        correct: 2,
        explanation: "Catalonia banned bullfighting in 2010 through a vote in its regional parliament, becoming the second Spanish region to do so (after the Canary Islands in 1991). The ban reflected both animal welfare concerns and Catalan cultural identity politics."
      },
      {
        prompt: "¿En qué siglo se formalizó la corrida de toros moderna?",
        options: ["Siglo XVI", "Siglo XVII", "Siglo XVIII", "Siglo XIX"],
        correct: 2,
        explanation: "The modern bullfight was formalized in the 18th century when Francisco Romero from Ronda introduced the use of the muleta (red cape) and established the rules for fighting on foot rather than on horseback, transforming it from a noble equestrian pursuit into the form known today."
      }
    ]
  },
  {
    id: "sport-beisbol",
    spanishName: "Béisbol Caribeño",
    englishName: "Caribbean Baseball",
    icon: "⚾",
    tags: ["Caribe", "Cuba", "República Dominicana", "Venezuela", "profesional"],
    descEs: "El béisbol es el deporte más popular en varios países del Caribe hispanohablante, especialmente Cuba, República Dominicana, Venezuela y Puerto Rico. La República Dominicana ha producido más jugadores de Grandes Ligas per cápita que cualquier otro país. Jugadores como Pedro Martínez, David Ortiz, Sammy Sosa y Roberto Clemente (Puerto Rico) son leyendas. La Serie del Caribe es un torneo anual entre los campeones de las ligas de invierno. En Cuba, el béisbol llegó en la década de 1860.",
    descEn: "Baseball is the most popular sport in several Spanish-speaking Caribbean countries, especially Cuba, the Dominican Republic, Venezuela, and Puerto Rico. The Dominican Republic has produced more Major League players per capita than any other country. Players like Pedro Martínez, David Ortiz, Sammy Sosa, and Roberto Clemente (Puerto Rico) are legends. The Caribbean Series is an annual tournament between winter league champions. In Cuba, baseball arrived in the 1860s.",
    vocab: [
      { word: "bateador", english: "batter" },
      { word: "lanzador", english: "pitcher" },
      { word: "jonrón", english: "home run" },
      { word: "diamante", english: "diamond (field)" },
      { word: "entrada", english: "inning" },
      { word: "receptor", english: "catcher" }
    ],
    quiz: [
      {
        prompt: "¿Qué país caribeño ha producido más jugadores de Grandes Ligas per cápita?",
        options: ["Cuba", "Puerto Rico", "República Dominicana", "Venezuela"],
        correct: 2,
        explanation: "The Dominican Republic has produced more MLB players per capita than any other country, thanks to an extensive network of baseball academies run by MLB teams on the island. Towns like San Pedro de Macorís are famous for producing an extraordinary number of major leaguers."
      },
      {
        prompt: "¿Cómo se dice 'home run' en español?",
        options: ["Carrera", "Jonrón", "Gol", "Punto"],
        correct: 1,
        explanation: "'Jonrón' is a phonetic Spanish adaptation of the English 'home run.' This type of loanword adaptation is common in Caribbean baseball vocabulary, where the sport arrived from the United States in the 19th century."
      },
      {
        prompt: "¿Qué es la Serie del Caribe?",
        options: ["Un campeonato de fútbol", "Un torneo de béisbol entre campeones de ligas de invierno", "Una carrera de yates", "Un festival de música"],
        correct: 1,
        explanation: "The Caribbean Series (Serie del Caribe) is an annual baseball tournament that pits the winter league champions from countries like the Dominican Republic, Venezuela, Mexico, and Puerto Rico against each other. It has been held since 1949."
      }
    ]
  },
  {
    id: "sport-tenis",
    spanishName: "Tenis",
    englishName: "Tennis",
    icon: "🎾",
    tags: ["España", "Rafael Nadal", "tierra batida", "Grand Slam", "campeonato"],
    descEs: "España ha sido una potencia mundial del tenis, especialmente en tierra batida. Rafael Nadal, nacido en Mallorca, es considerado el 'Rey de la Tierra Batida' con catorce títulos de Roland Garros, un récord absoluto. Su rivalidad con Roger Federer y Novak Djokovic definió una era dorada del tenis. Otros tenistas españoles destacados incluyen a Carlos Alcaraz, Arantxa Sánchez Vicario y Garbiñe Muguruza. España también ha ganado la Copa Davis en múltiples ocasiones.",
    descEn: "Spain has been a world tennis powerhouse, especially on clay courts. Rafael Nadal, born in Mallorca, is considered the 'King of Clay' with fourteen Roland Garros titles, an absolute record. His rivalry with Roger Federer and Novak Djokovic defined a golden era of tennis. Other notable Spanish tennis players include Carlos Alcaraz, Arantxa Sánchez Vicario, and Garbiñe Muguruza. Spain has also won the Davis Cup multiple times.",
    vocab: [
      { word: "raqueta", english: "racket" },
      { word: "tierra batida", english: "clay court" },
      { word: "saque", english: "serve" },
      { word: "partido", english: "match" },
      { word: "campeonato", english: "championship" },
      { word: "red", english: "net" }
    ],
    quiz: [
      {
        prompt: "¿Cuántos títulos de Roland Garros ganó Rafael Nadal?",
        options: ["Diez", "Doce", "Catorce", "Dieciséis"],
        correct: 2,
        explanation: "Rafael Nadal won a record fourteen French Open (Roland Garros) titles, far more than any other player in history at a single Grand Slam. His dominance on clay courts earned him the nickname 'the King of Clay.'"
      },
      {
        prompt: "¿De qué isla española es originario Nadal?",
        options: ["Tenerife", "Ibiza", "Mallorca", "Gran Canaria"],
        correct: 2,
        explanation: "Nadal was born and raised in Manacor, a town on the island of Mallorca (Majorca) in the Balearic Islands. He trained there from childhood under his uncle Toni Nadal and has remained closely connected to the island throughout his career."
      },
      {
        prompt: "¿Cómo se le conoce a Nadal en el mundo del tenis?",
        options: ["El Matador", "El Rey de la Tierra Batida", "El Toro", "El Campeón"],
        correct: 1,
        explanation: "Nadal is known as 'El Rey de la Tierra Batida' (the King of Clay) because of his unmatched dominance on clay courts, where his heavy topspin and relentless physicality give him a particular advantage over other players."
      }
    ]
  },
  {
    id: "sport-boxeo",
    spanishName: "Boxeo",
    englishName: "Boxing",
    icon: "🥊",
    tags: ["México", "Puerto Rico", "Panamá", "campeón", "peso"],
    descEs: "El boxeo tiene una tradición profunda en Latinoamérica, especialmente en México, Puerto Rico y Panamá. México ha producido más campeones mundiales de boxeo que casi cualquier otro país, con leyendas como Julio César Chávez (récord de 89-0), Canelo Álvarez y Salvador Sánchez. En Panamá, Roberto Durán, 'Manos de Piedra', es considerado uno de los mejores boxeadores de la historia. Puerto Rico aportó figuras como Tito Trinidad y Miguel Cotto.",
    descEn: "Boxing has a deep tradition in Latin America, especially in Mexico, Puerto Rico, and Panama. Mexico has produced more world boxing champions than almost any other country, with legends like Julio César Chávez (89-0 record), Canelo Álvarez, and Salvador Sánchez. In Panama, Roberto Durán, 'Hands of Stone,' is considered one of the best boxers in history. Puerto Rico contributed figures like Tito Trinidad and Miguel Cotto.",
    vocab: [
      { word: "guantes", english: "gloves" },
      { word: "asalto", english: "round" },
      { word: "nocaut", english: "knockout" },
      { word: "peso", english: "weight class" },
      { word: "cinturón", english: "belt/championship" },
      { word: "pelea", english: "fight" }
    ],
    quiz: [
      {
        prompt: "¿Cuál fue el récord invicto de Julio César Chávez?",
        options: ["70-0", "80-0", "89-0", "95-0"],
        correct: 2,
        explanation: "Julio César Chávez went 89 fights without a loss (89-0) before his first defeat, one of the longest unbeaten streaks in boxing history. He held world titles in three weight classes and is widely regarded as Mexico's greatest boxer."
      },
      {
        prompt: "¿Cuál era el apodo de Roberto Durán?",
        options: ["Manos de Oro", "Manos de Piedra", "El Rayo", "El Terrible"],
        correct: 1,
        explanation: "Roberto Durán was nicknamed 'Manos de Piedra' (Hands of Stone) because of his devastating punching power. The Panamanian legend held world titles in four different weight classes across a career spanning five decades."
      },
      {
        prompt: "¿Qué país latinoamericano ha producido más campeones mundiales de boxeo?",
        options: ["Cuba", "Puerto Rico", "Panamá", "México"],
        correct: 3,
        explanation: "Mexico has produced more world boxing champions than almost any other country in the world. Boxing is deeply embedded in Mexican culture, with a tradition of tough, aggressive fighters across nearly every weight class."
      }
    ]
  },
  {
    id: "sport-ciclismo",
    spanishName: "Ciclismo",
    englishName: "Cycling",
    icon: "🚴",
    tags: ["España", "Colombia", "Vuelta a España", "montaña", "etapa"],
    descEs: "El ciclismo es un deporte muy popular en España y Colombia. La Vuelta a España es una de las tres Grandes Vueltas del ciclismo profesional, junto con el Tour de Francia y el Giro de Italia. España ha producido grandes ciclistas como Miguel Induráin, ganador de cinco Tours de Francia consecutivos (1991-1995), y Alberto Contador. Colombia es famosa por sus escaladores como Nairo Quintana, Egan Bernal (primer colombiano en ganar el Tour) y Rigoberto Urán, formados en las montañas andinas.",
    descEn: "Cycling is a very popular sport in Spain and Colombia. The Vuelta a España is one of the three Grand Tours in professional cycling, alongside the Tour de France and the Giro d'Italia. Spain has produced great cyclists like Miguel Induráin, winner of five consecutive Tours de France (1991-1995), and Alberto Contador. Colombia is famous for its climbers like Nairo Quintana, Egan Bernal (first Colombian to win the Tour), and Rigoberto Urán, trained in the Andean mountains.",
    vocab: [
      { word: "ciclista", english: "cyclist" },
      { word: "etapa", english: "stage" },
      { word: "montaña", english: "mountain" },
      { word: "pelotón", english: "peloton" },
      { word: "maillot", english: "jersey" },
      { word: "escalador", english: "climber" }
    ],
    quiz: [
      {
        prompt: "¿Cuántos Tours de Francia ganó Miguel Induráin?",
        options: ["Tres", "Cuatro", "Cinco", "Seis"],
        correct: 2,
        explanation: "Miguel Induráin won five consecutive Tours de France from 1991 to 1995, a feat of remarkable consistency. His dominance was built on his exceptional time-trialing ability and his capacity to limit losses in the mountains."
      },
      {
        prompt: "¿Quién fue el primer colombiano en ganar el Tour de Francia?",
        options: ["Nairo Quintana", "Rigoberto Urán", "Egan Bernal", "Santiago Botero"],
        correct: 2,
        explanation: "Egan Bernal won the 2019 Tour de France at just 22 years old, becoming the first Colombian and the youngest winner in over a century. His climbing talent was honed growing up training at high altitude in the Colombian Andes."
      },
      {
        prompt: "¿Cómo se llama la vuelta ciclista de España?",
        options: ["Tour de España", "Gran Premio de España", "Vuelta a España", "Ronda de España"],
        correct: 2,
        explanation: "The Vuelta a España (Tour of Spain) is one of cycling's three Grand Tours, alongside the Tour de France and Giro d'Italia. First held in 1935, it typically takes place in late August and September."
      }
    ]
  },
  {
    id: "sport-san-fermin",
    spanishName: "Encierro de San Fermín",
    englishName: "Running of the Bulls",
    icon: "🐃",
    tags: ["España", "Pamplona", "Navarra", "julio", "tradición"],
    descEs: "El encierro de San Fermín es una tradición centenaria de Pamplona, Navarra, que se celebra del 6 al 14 de julio. Cada mañana, seis toros bravos corren por las calles del casco antiguo hacia la plaza de toros, seguidos por cientos de corredores vestidos de blanco con pañuelo y faja rojos. El recorrido de 875 metros dura entre dos y seis minutos. Ernest Hemingway popularizó las fiestas en su novela 'Fiesta' (The Sun Also Rises). El chupinazo marca el inicio de las fiestas.",
    descEn: "The Running of the Bulls at San Fermín is a centuries-old tradition in Pamplona, Navarre, celebrated from July 6 to 14. Each morning, six fighting bulls run through the old town streets to the bullring, followed by hundreds of runners dressed in white with red scarves and sashes. The 875-meter course takes between two and six minutes. Ernest Hemingway popularized the festival in his novel 'The Sun Also Rises.' The chupinazo marks the start of the festivities.",
    vocab: [
      { word: "encierro", english: "bull run" },
      { word: "corredor", english: "runner" },
      { word: "pañuelo", english: "scarf/bandana" },
      { word: "toro bravo", english: "fighting bull" },
      { word: "casco antiguo", english: "old town" },
      { word: "cohete", english: "rocket/firecracker" }
    ],
    quiz: [
      {
        prompt: "¿En qué ciudad se celebra el encierro de San Fermín?",
        options: ["Madrid", "Sevilla", "Pamplona", "Bilbao"],
        correct: 2,
        explanation: "The Running of the Bulls takes place in Pamplona, the capital of the Navarre region in northern Spain. The festival honors San Fermín, the patron saint of Navarre, and has been a tradition since at least the 14th century."
      },
      {
        prompt: "¿De qué color es la vestimenta tradicional de los corredores?",
        options: ["Todo rojo", "Blanco con pañuelo rojo", "Todo negro", "Azul y blanco"],
        correct: 1,
        explanation: "Runners wear all white clothing with a red scarf (pañuelo) around the neck and a red sash (faja) around the waist. The white represents San Fermín and the red symbolizes his martyrdom."
      },
      {
        prompt: "¿Qué escritor famoso popularizó las fiestas de San Fermín?",
        options: ["García Márquez", "Hemingway", "Cervantes", "Borges"],
        correct: 1,
        explanation: "Ernest Hemingway attended the San Fermín festival in 1923 and wrote about it in his 1926 novel 'The Sun Also Rises' (published in Spanish as 'Fiesta'), which brought the event to worldwide attention and made it a major tourist attraction."
      }
    ]
  },
  {
    id: "sport-polo",
    spanishName: "Polo",
    englishName: "Polo",
    icon: "🐴",
    tags: ["Argentina", "caballos", "elite", "campeonato", "gaucho"],
    descEs: "Argentina es la potencia mundial indiscutible del polo, dominando el deporte desde hace más de un siglo. El Abierto Argentino de Polo en el Campo Argentino de Polo en Buenos Aires es el torneo más prestigioso del mundo. Argentina tiene los mejores jugadores, con handicaps de 10 goles (el máximo). La tradición ecuestre gaucha es la base de la excelencia argentina. La familia Heguy y Adolfo Cambiaso, considerado el mejor jugador de todos los tiempos, son figuras icónicas del polo mundial.",
    descEn: "Argentina is the undisputed world power in polo, dominating the sport for over a century. The Argentine Open Polo Championship at the Campo Argentino de Polo in Buenos Aires is the most prestigious tournament in the world. Argentina has the best players, with 10-goal handicaps (the maximum). The gaucho equestrian tradition is the foundation of Argentine excellence. The Heguy family and Adolfo Cambiaso, considered the greatest player of all time, are iconic figures in world polo.",
    vocab: [
      { word: "caballo", english: "horse" },
      { word: "jinete", english: "rider" },
      { word: "taco", english: "mallet" },
      { word: "chukker", english: "period of play" },
      { word: "cancha", english: "field" },
      { word: "gaucho", english: "gaucho/cowboy" }
    ],
    quiz: [
      {
        prompt: "¿Qué país domina el polo mundial?",
        options: ["Inglaterra", "Estados Unidos", "Argentina", "India"],
        correct: 2,
        explanation: "Argentina has dominated world polo for over a century, consistently producing the highest-rated players. This excellence stems from the country's deep gaucho equestrian tradition and the vast pampas grasslands ideal for raising horses."
      },
      {
        prompt: "¿Quién es considerado el mejor jugador de polo de todos los tiempos?",
        options: ["Carlos Gracida", "Adolfo Cambiaso", "Gonzalo Pieres", "Juan Carlos Harriott"],
        correct: 1,
        explanation: "Adolfo Cambiaso, an Argentine player, is widely regarded as the greatest polo player of all time. He has maintained a perfect 10-goal handicap for decades and has won the Argentine Open, the sport's most prestigious event, numerous times."
      },
      {
        prompt: "¿Cuál es el handicap máximo en polo?",
        options: ["5 goles", "8 goles", "10 goles", "12 goles"],
        correct: 2,
        explanation: "The maximum handicap in polo is 10 goals, and only a handful of players in the world hold this rating at any given time. The majority of these top-rated players are Argentine, reflecting the country's dominance of the sport."
      }
    ]
  }
];
