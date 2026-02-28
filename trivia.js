const TRIVIA_DATA = [
  {
    id: "trivia-01",
    category: "geografía",
    prompt: "¿Cuál es el país más grande de habla hispana por superficie?",
    options: ["México", "Colombia", "Argentina", "Perú"],
    correct: 2,
    explanation: "Argentina covers about 2.78 million km², making it the largest Spanish-speaking country by area and the eighth largest country in the world."
  },
  {
    id: "trivia-02",
    category: "geografía",
    prompt: "¿Cuál es el río más largo de Sudamérica?",
    options: ["Orinoco", "Paraná", "Amazonas", "Magdalena"],
    correct: 2,
    explanation: "The Amazon River stretches roughly 6,400 km, making it the longest river in South America and one of the longest in the world. It also carries more water than any other river on Earth."
  },
  {
    id: "trivia-03",
    category: "geografía",
    prompt: "¿En qué país se encuentra el lago Titicaca?",
    options: ["Chile y Argentina", "Perú y Bolivia", "Ecuador y Colombia", "Paraguay y Brasil"],
    correct: 1,
    explanation: "Lake Titicaca sits on the border between Peru and Bolivia in the Andes mountains. At about 3,812 meters above sea level, it is the highest navigable lake in the world."
  },
  {
    id: "trivia-04",
    category: "geografía",
    prompt: "¿Cuál es la capital de Colombia?",
    options: ["Medellín", "Cartagena", "Cali", "Bogotá"],
    correct: 3,
    explanation: "Bogotá has been the capital of Colombia since the country's independence. Situated at about 2,640 meters in the Andes, it is one of the highest capital cities in the world."
  },
  {
    id: "trivia-05",
    category: "geografía",
    prompt: "¿En qué océano están las Islas Galápagos?",
    options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
    correct: 2,
    explanation: "The Galápagos Islands lie in the Pacific Ocean about 1,000 km west of Ecuador. Charles Darwin's observations there helped shape his theory of evolution by natural selection."
  },
  {
    id: "trivia-06",
    category: "geografía",
    prompt: "¿Cuál es el desierto más seco del mundo, ubicado en Chile?",
    options: ["Desierto de Sonora", "Desierto de Sechura", "Desierto de Atacama", "Desierto de Nazca"],
    correct: 2,
    explanation: "The Atacama Desert in northern Chile is considered the driest non-polar desert on Earth. Some weather stations there have never recorded a single drop of rain."
  },
  {
    id: "trivia-07",
    category: "cultura",
    prompt: "¿Quién pintó el mural 'Sueño de una tarde dominical en la Alameda Central'?",
    options: ["Frida Kahlo", "David Alfaro Siqueiros", "Diego Rivera", "José Clemente Orozco"],
    correct: 2,
    explanation: "Diego Rivera painted this famous mural in 1947 for the Hotel del Prado in Mexico City. It depicts key figures from Mexican history strolling through Alameda Central park."
  },
  {
    id: "trivia-08",
    category: "cultura",
    prompt: "¿Qué escritor colombiano escribió 'Cien años de soledad'?",
    options: ["Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar"],
    correct: 1,
    explanation: "Gabriel García Márquez published 'Cien años de soledad' in 1967, a landmark of magical realism. He won the Nobel Prize in Literature in 1982, largely on the strength of this novel."
  },
  {
    id: "trivia-09",
    category: "cultura",
    prompt: "¿Qué artista mexicana es famosa por sus autorretratos y su unibrow?",
    options: ["Remedios Varo", "Leonora Carrington", "Frida Kahlo", "María Izquierdo"],
    correct: 2,
    explanation: "Frida Kahlo deliberately emphasized features like her unibrow in her self-portraits as acts of defiance against conventional beauty standards. About 55 of her 143 paintings are self-portraits."
  },
  {
    id: "trivia-10",
    category: "cultura",
    prompt: "¿Qué significa 'siesta' en la cultura española?",
    options: ["Una comida ligera", "Un descanso después del almuerzo", "Un baile tradicional", "Una bebida caliente"],
    correct: 1,
    explanation: "The siesta is a short nap taken after the midday meal, a tradition rooted in Spain's hot climate. The word comes from the Latin 'hora sexta' (the sixth hour), referring to noon."
  },
  {
    id: "trivia-11",
    category: "cultura",
    prompt: "¿Quién es el autor de 'Don Quijote de la Mancha'?",
    options: ["Lope de Vega", "Miguel de Cervantes", "Francisco de Quevedo", "Calderón de la Barca"],
    correct: 1,
    explanation: "Miguel de Cervantes published the first part of 'Don Quijote' in 1605. It is widely considered the first modern novel and one of the greatest works of fiction ever written."
  },
  {
    id: "trivia-12",
    category: "cultura",
    prompt: "¿Qué pintor español es famoso por su período azul y período rosa?",
    options: ["Salvador Dalí", "Joan Miró", "Francisco de Goya", "Pablo Picasso"],
    correct: 3,
    explanation: "Picasso's Blue Period (1901-1904) used somber blue tones to depict poverty and isolation, while his Rose Period (1904-1906) shifted to warmer pinks and featured circus performers."
  },
  {
    id: "trivia-13",
    category: "personas famosas",
    prompt: "¿De qué país era Simón Bolívar?",
    options: ["Colombia", "Venezuela", "Ecuador", "Perú"],
    correct: 1,
    explanation: "Simón Bolívar was born in Caracas, Venezuela in 1783. Known as 'El Libertador,' he led independence movements that freed Venezuela, Colombia, Ecuador, Peru, and Bolivia from Spanish rule."
  },
  {
    id: "trivia-14",
    category: "personas famosas",
    prompt: "¿Quién fue la primera mujer en ganar el Premio Nobel de Literatura en Latinoamérica?",
    options: ["Isabel Allende", "Gabriela Mistral", "Sor Juana Inés de la Cruz", "Alfonsina Storni"],
    correct: 1,
    explanation: "Chilean poet Gabriela Mistral won the Nobel Prize in Literature in 1945, becoming the first Latin American author of any gender to receive the honor. Her poetry often explored themes of love, loss, and childhood."
  },
  {
    id: "trivia-15",
    category: "personas famosas",
    prompt: "¿De qué país era el revolucionario Che Guevara?",
    options: ["Cuba", "Argentina", "Bolivia", "México"],
    correct: 1,
    explanation: "Ernesto 'Che' Guevara was born in Rosario, Argentina in 1928. Although closely associated with the Cuban Revolution, he was Argentine by birth and citizenship."
  },
  {
    id: "trivia-16",
    category: "personas famosas",
    prompt: "¿Qué arquitecto español diseñó la Sagrada Familia en Barcelona?",
    options: ["Santiago Calatrava", "Antoni Gaudí", "Rafael Moneo", "Ricardo Bofill"],
    correct: 1,
    explanation: "Antoni Gaudí took over the Sagrada Familia project in 1883 and devoted 43 years to it until his death in 1926. The basilica, famous for its organic Art Nouveau forms, is still under construction."
  },
  {
    id: "trivia-17",
    category: "personas famosas",
    prompt: "¿Quién fue Eva Perón?",
    options: ["Una cantante de tango", "Primera dama de Argentina", "Una poetisa chilena", "Una pintora mexicana"],
    correct: 1,
    explanation: "Eva Perón was the First Lady of Argentina from 1946 until her death in 1952. She championed labor rights and women's suffrage, becoming an iconic and beloved figure in Argentine history."
  },
  {
    id: "trivia-18",
    category: "idioma",
    prompt: "¿Cuántos países tienen el español como idioma oficial?",
    options: ["15", "18", "20", "23"],
    correct: 2,
    explanation: "Spanish is the official language in 20 countries: 18 in the Americas (from Mexico to Argentina), plus Spain and Equatorial Guinea in Africa."
  },
  {
    id: "trivia-19",
    category: "idioma",
    prompt: "¿Qué lengua indígena dio al español palabras como 'chocolate', 'tomate' y 'aguacate'?",
    options: ["Quechua", "Maya", "Náhuatl", "Guaraní"],
    correct: 2,
    explanation: "Náhuatl was the language of the Aztec Empire. Many everyday Spanish (and English) food words — chocolate (xocolātl), tomate (tomatl), and aguacate (ahuacatl) — come directly from Náhuatl."
  },
  {
    id: "trivia-20",
    category: "idioma",
    prompt: "¿En qué país hispanohablante se usa 'vos' en lugar de 'tú'?",
    options: ["México", "España", "Argentina", "Cuba"],
    correct: 2,
    explanation: "Argentina is the most well-known 'voseo' country, where 'vos' replaces 'tú' in everyday speech. This comes with its own verb conjugations, such as 'vos tenés' instead of 'tú tienes.'"
  },
  {
    id: "trivia-21",
    category: "idioma",
    prompt: "¿Cuál es la única letra que existe en español pero no en otros idiomas romances?",
    options: ["Ñ", "Ll", "Ch", "Rr"],
    correct: 0,
    explanation: "The letter Ñ evolved from a medieval scribal shorthand where a small 'n' was written above another 'n' to represent the double-n sound. It is a distinct letter in the Spanish alphabet, not found in French, Italian, or Portuguese alphabets."
  },
  {
    id: "trivia-22",
    category: "historia",
    prompt: "¿En qué año llegó Cristóbal Colón a América?",
    options: ["1482", "1492", "1502", "1512"],
    correct: 1,
    explanation: "Columbus reached the Bahamas on October 12, 1492, after sailing west from Spain under the sponsorship of Queen Isabella I and King Ferdinand II. This date is commemorated across the Americas."
  },
  {
    id: "trivia-23",
    category: "historia",
    prompt: "¿Qué civilización construyó Machu Picchu?",
    options: ["Azteca", "Maya", "Inca", "Olmeca"],
    correct: 2,
    explanation: "The Inca built Machu Picchu around 1450 CE as an estate for Emperor Pachacuti. Hidden high in the Andes at about 2,430 meters, it was never found by Spanish conquistadors."
  },
  {
    id: "trivia-24",
    category: "historia",
    prompt: "¿Cómo se llamaba la capital del Imperio Azteca?",
    options: ["Teotihuacán", "Tenochtitlán", "Tlatelolco", "Tula"],
    correct: 1,
    explanation: "Tenochtitlán was founded in 1325 on an island in Lake Texcoco. When the Spanish conquered it in 1521, they built Mexico City directly on top of its ruins."
  },
  {
    id: "trivia-25",
    category: "gastronomía",
    prompt: "¿De qué país es originario el ceviche como plato nacional?",
    options: ["Ecuador", "Chile", "Perú", "México"],
    correct: 2,
    explanation: "Peru claims ceviche as its national dish, with evidence of fish marinated in citrus juices dating back to pre-Columbian times. The acid in lime juice 'cooks' the raw fish by denaturing its proteins."
  },
  {
    id: "trivia-26",
    category: "gastronomía",
    prompt: "¿Qué ingrediente principal tiene la paella valenciana?",
    options: ["Pasta", "Patatas", "Arroz", "Quinoa"],
    correct: 2,
    explanation: "Rice is the base of paella, which originated in the Valencia region of Spain. The dish gets its name from the wide, shallow pan (paella) in which the rice is cooked."
  },
  {
    id: "trivia-27",
    category: "gastronomía",
    prompt: "¿De qué fruto se hace el guacamole?",
    options: ["Mango", "Plátano", "Aguacate", "Papaya"],
    correct: 2,
    explanation: "Guacamole is made from mashed avocado (aguacate). The word comes from the Náhuatl 'ahuacamolli,' combining 'ahuacatl' (avocado) and 'molli' (sauce)."
  },
  {
    id: "trivia-28",
    category: "gastronomía",
    prompt: "¿En qué país se originó el tequila?",
    options: ["Colombia", "México", "España", "Perú"],
    correct: 1,
    explanation: "Tequila is produced from the blue agave plant, primarily in the area surrounding the city of Tequila in the Mexican state of Jalisco. By law, true tequila can only be made in certain regions of Mexico."
  },
  {
    id: "trivia-29",
    category: "deportes",
    prompt: "¿Cuántas Copas del Mundo de fútbol ha ganado Argentina?",
    options: ["Una", "Dos", "Tres", "Cuatro"],
    correct: 2,
    explanation: "Argentina has won three FIFA World Cups: in 1978 (at home), 1986 (led by Maradona), and 2022 in Qatar (led by Messi). The 2022 victory was especially celebrated as Messi's crowning achievement."
  },
  {
    id: "trivia-30",
    category: "deportes",
    prompt: "¿De qué isla española es Rafael Nadal?",
    options: ["Ibiza", "Tenerife", "Mallorca", "Menorca"],
    correct: 2,
    explanation: "Rafael Nadal was born in Manacor, Mallorca, the largest of Spain's Balearic Islands. He trained at his uncle Toni's academy there and maintained Mallorca as his home throughout his career."
  },
  {
    id: "trivia-31",
    category: "geografía",
    prompt: "¿Cuál es el país más pequeño de Centroamérica?",
    options: ["Belice", "El Salvador", "Costa Rica", "Panamá"],
    correct: 1,
    explanation: "El Salvador covers just 21,041 km², making it the smallest country in Central America. Despite its small size, it is the most densely populated nation in the region."
  },
  {
    id: "trivia-32",
    category: "cultura",
    prompt: "¿Qué significa 'quinceañera' en la cultura latinoamericana?",
    options: ["Una boda", "La celebración de los 15 años de una chica", "Un festival religioso", "Una graduación"],
    correct: 1,
    explanation: "The quinceañera marks a girl's 15th birthday and her symbolic transition from childhood to womanhood. Rooted in both indigenous and Catholic traditions, it typically includes a Mass, a formal party, and a waltz."
  },
  {
    id: "trivia-33",
    category: "personas famosas",
    prompt: "¿Qué pintor español es conocido por sus relojes derretidos?",
    options: ["Pablo Picasso", "Joan Miró", "Salvador Dalí", "El Greco"],
    correct: 2,
    explanation: "Salvador Dalí's 1931 painting 'The Persistence of Memory' features melting clocks draped over a barren landscape. A leading figure of Surrealism, Dalí said the melting watches were inspired by the sight of melting Camembert cheese."
  },
  {
    id: "trivia-34",
    category: "historia",
    prompt: "¿Qué tratado dividió el Nuevo Mundo entre España y Portugal?",
    options: ["Tratado de Versalles", "Tratado de Tordesillas", "Tratado de Utrecht", "Tratado de París"],
    correct: 1,
    explanation: "The Treaty of Tordesillas was signed in 1494, drawing a line through the Atlantic that gave Spain lands to the west and Portugal lands to the east. This is why Brazil speaks Portuguese while most of the rest of Latin America speaks Spanish."
  },
  {
    id: "trivia-35",
    category: "geografía",
    prompt: "¿Cuál es la montaña más alta de España?",
    options: ["Mulhacén", "Aneto", "Teide", "Picos de Europa"],
    correct: 2,
    explanation: "Mount Teide on Tenerife in the Canary Islands stands at 3,715 meters, making it the highest point in Spain and the highest peak in the Atlantic islands. Mulhacén (3,479 m) is the highest on the Iberian Peninsula."
  }
];
