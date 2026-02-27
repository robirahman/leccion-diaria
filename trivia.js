const TRIVIA_DATA = [
  {
    id: "trivia-01",
    category: "geografía",
    prompt: "¿Cuál es el país más grande de habla hispana por superficie?",
    options: ["México", "Colombia", "Argentina", "Perú"],
    correct: 2
  },
  {
    id: "trivia-02",
    category: "geografía",
    prompt: "¿Cuál es el río más largo de Sudamérica?",
    options: ["Orinoco", "Paraná", "Amazonas", "Magdalena"],
    correct: 2
  },
  {
    id: "trivia-03",
    category: "geografía",
    prompt: "¿En qué país se encuentra el lago Titicaca?",
    options: ["Chile y Argentina", "Perú y Bolivia", "Ecuador y Colombia", "Paraguay y Brasil"],
    correct: 1
  },
  {
    id: "trivia-04",
    category: "geografía",
    prompt: "¿Cuál es la capital de Colombia?",
    options: ["Medellín", "Cartagena", "Cali", "Bogotá"],
    correct: 3
  },
  {
    id: "trivia-05",
    category: "geografía",
    prompt: "¿En qué océano están las Islas Galápagos?",
    options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
    correct: 2
  },
  {
    id: "trivia-06",
    category: "geografía",
    prompt: "¿Cuál es el desierto más seco del mundo, ubicado en Chile?",
    options: ["Desierto de Sonora", "Desierto de Sechura", "Desierto de Atacama", "Desierto de Nazca"],
    correct: 2
  },
  {
    id: "trivia-07",
    category: "cultura",
    prompt: "¿Quién pintó el mural 'Sueño de una tarde dominical en la Alameda Central'?",
    options: ["Frida Kahlo", "David Alfaro Siqueiros", "Diego Rivera", "José Clemente Orozco"],
    correct: 2
  },
  {
    id: "trivia-08",
    category: "cultura",
    prompt: "¿Qué escritor colombiano escribió 'Cien años de soledad'?",
    options: ["Pablo Neruda", "Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar"],
    correct: 1
  },
  {
    id: "trivia-09",
    category: "cultura",
    prompt: "¿Qué artista mexicana es famosa por sus autorretratos y su unibrow?",
    options: ["Remedios Varo", "Leonora Carrington", "Frida Kahlo", "María Izquierdo"],
    correct: 2
  },
  {
    id: "trivia-10",
    category: "cultura",
    prompt: "¿Qué significa 'siesta' en la cultura española?",
    options: ["Una comida ligera", "Un descanso después del almuerzo", "Un baile tradicional", "Una bebida caliente"],
    correct: 1
  },
  {
    id: "trivia-11",
    category: "cultura",
    prompt: "¿Quién es el autor de 'Don Quijote de la Mancha'?",
    options: ["Lope de Vega", "Miguel de Cervantes", "Francisco de Quevedo", "Calderón de la Barca"],
    correct: 1
  },
  {
    id: "trivia-12",
    category: "cultura",
    prompt: "¿Qué pintor español es famoso por su período azul y período rosa?",
    options: ["Salvador Dalí", "Joan Miró", "Francisco de Goya", "Pablo Picasso"],
    correct: 3
  },
  {
    id: "trivia-13",
    category: "personas famosas",
    prompt: "¿De qué país era Simón Bolívar?",
    options: ["Colombia", "Venezuela", "Ecuador", "Perú"],
    correct: 1
  },
  {
    id: "trivia-14",
    category: "personas famosas",
    prompt: "¿Quién fue la primera mujer en ganar el Premio Nobel de Literatura en Latinoamérica?",
    options: ["Isabel Allende", "Gabriela Mistral", "Sor Juana Inés de la Cruz", "Alfonsina Storni"],
    correct: 1
  },
  {
    id: "trivia-15",
    category: "personas famosas",
    prompt: "¿De qué país era el revolucionario Che Guevara?",
    options: ["Cuba", "Argentina", "Bolivia", "México"],
    correct: 1
  },
  {
    id: "trivia-16",
    category: "personas famosas",
    prompt: "¿Qué arquitecto español diseñó la Sagrada Familia en Barcelona?",
    options: ["Santiago Calatrava", "Antoni Gaudí", "Rafael Moneo", "Ricardo Bofill"],
    correct: 1
  },
  {
    id: "trivia-17",
    category: "personas famosas",
    prompt: "¿Quién fue Eva Perón?",
    options: ["Una cantante de tango", "Primera dama de Argentina", "Una poetisa chilena", "Una pintora mexicana"],
    correct: 1
  },
  {
    id: "trivia-18",
    category: "idioma",
    prompt: "¿Cuántos países tienen el español como idioma oficial?",
    options: ["15", "18", "20", "23"],
    correct: 2
  },
  {
    id: "trivia-19",
    category: "idioma",
    prompt: "¿Qué lengua indígena dio al español palabras como 'chocolate', 'tomate' y 'aguacate'?",
    options: ["Quechua", "Maya", "Náhuatl", "Guaraní"],
    correct: 2
  },
  {
    id: "trivia-20",
    category: "idioma",
    prompt: "¿En qué país hispanohablante se usa 'vos' en lugar de 'tú'?",
    options: ["México", "España", "Argentina", "Cuba"],
    correct: 2
  },
  {
    id: "trivia-21",
    category: "idioma",
    prompt: "¿Cuál es la única letra que existe en español pero no en otros idiomas romances?",
    options: ["Ñ", "Ll", "Ch", "Rr"],
    correct: 0
  },
  {
    id: "trivia-22",
    category: "historia",
    prompt: "¿En qué año llegó Cristóbal Colón a América?",
    options: ["1482", "1492", "1502", "1512"],
    correct: 1
  },
  {
    id: "trivia-23",
    category: "historia",
    prompt: "¿Qué civilización construyó Machu Picchu?",
    options: ["Azteca", "Maya", "Inca", "Olmeca"],
    correct: 2
  },
  {
    id: "trivia-24",
    category: "historia",
    prompt: "¿Cómo se llamaba la capital del Imperio Azteca?",
    options: ["Teotihuacán", "Tenochtitlán", "Tlatelolco", "Tula"],
    correct: 1
  },
  {
    id: "trivia-25",
    category: "gastronomía",
    prompt: "¿De qué país es originario el ceviche como plato nacional?",
    options: ["Ecuador", "Chile", "Perú", "México"],
    correct: 2
  },
  {
    id: "trivia-26",
    category: "gastronomía",
    prompt: "¿Qué ingrediente principal tiene la paella valenciana?",
    options: ["Pasta", "Patatas", "Arroz", "Quinoa"],
    correct: 2
  },
  {
    id: "trivia-27",
    category: "gastronomía",
    prompt: "¿De qué fruto se hace el guacamole?",
    options: ["Mango", "Plátano", "Aguacate", "Papaya"],
    correct: 2
  },
  {
    id: "trivia-28",
    category: "gastronomía",
    prompt: "¿En qué país se originó el tequila?",
    options: ["Colombia", "México", "España", "Perú"],
    correct: 1
  },
  {
    id: "trivia-29",
    category: "deportes",
    prompt: "¿Cuántas Copas del Mundo de fútbol ha ganado Argentina?",
    options: ["Una", "Dos", "Tres", "Cuatro"],
    correct: 2
  },
  {
    id: "trivia-30",
    category: "deportes",
    prompt: "¿De qué isla española es Rafael Nadal?",
    options: ["Ibiza", "Tenerife", "Mallorca", "Menorca"],
    correct: 2
  },
  {
    id: "trivia-31",
    category: "geografía",
    prompt: "¿Cuál es el país más pequeño de Centroamérica?",
    options: ["Belice", "El Salvador", "Costa Rica", "Panamá"],
    correct: 1
  },
  {
    id: "trivia-32",
    category: "cultura",
    prompt: "¿Qué significa 'quinceañera' en la cultura latinoamericana?",
    options: ["Una boda", "La celebración de los 15 años de una chica", "Un festival religioso", "Una graduación"],
    correct: 1
  },
  {
    id: "trivia-33",
    category: "personas famosas",
    prompt: "¿Qué pintor español es conocido por sus relojes derretidos?",
    options: ["Pablo Picasso", "Joan Miró", "Salvador Dalí", "El Greco"],
    correct: 2
  },
  {
    id: "trivia-34",
    category: "historia",
    prompt: "¿Qué tratado dividió el Nuevo Mundo entre España y Portugal?",
    options: ["Tratado de Versalles", "Tratado de Tordesillas", "Tratado de Utrecht", "Tratado de París"],
    correct: 1
  },
  {
    id: "trivia-35",
    category: "geografía",
    prompt: "¿Cuál es la montaña más alta de España?",
    options: ["Mulhacén", "Aneto", "Teide", "Picos de Europa"],
    correct: 2
  }
];
