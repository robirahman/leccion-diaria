const RECIPES_DATA = [
  {
    id: "recipe-paella",
    spanishName: "Paella Valenciana",
    englishName: "Valencian Paella",
    icon: "🥘",
    tags: ["España", "arroz", "mariscos", "Valencia", "tradicional"],
    descEs: "La paella es el plato más emblemático de la cocina española, originario de Valencia. Se prepara con arroz, azafrán, verduras y, según la variante, mariscos, pollo o conejo. Se cocina en una sartén ancha y poco profunda llamada 'paellera' sobre fuego abierto. El socarrat, la capa crujiente de arroz en el fondo, es considerado la mejor parte del plato.",
    descEn: "Paella is the most iconic dish in Spanish cuisine, originating from Valencia. It is prepared with rice, saffron, vegetables, and depending on the variant, seafood, chicken, or rabbit. It is cooked in a wide, shallow pan called a 'paellera' over an open flame. The socarrat, the crispy layer of rice at the bottom, is considered the best part of the dish.",
    vocab: [
      { word: "arroz", english: "rice" },
      { word: "azafrán", english: "saffron" },
      { word: "mariscos", english: "seafood" },
      { word: "sartén", english: "pan/skillet" },
      { word: "caldo", english: "broth" },
      { word: "guisantes", english: "peas" },
      { word: "mejillones", english: "mussels" }
    ],
    quiz: [
      {
        prompt: "¿De qué región de España es originaria la paella?",
        options: ["Andalucía", "Cataluña", "Valencia", "Galicia"],
        correct: 2
      },
      {
        prompt: "¿Qué especia le da el color amarillo a la paella?",
        options: ["Pimentón", "Cúrcuma", "Comino", "Azafrán"],
        correct: 3
      },
      {
        prompt: "¿Cómo se llama la capa crujiente de arroz en el fondo de la paella?",
        options: ["Sofrito", "Socarrat", "Picada", "Refrito"],
        correct: 1
      }
    ]
  },
  {
    id: "recipe-tacos-al-pastor",
    spanishName: "Tacos al Pastor",
    englishName: "Shepherd-Style Tacos",
    icon: "🌮",
    tags: ["México", "carne", "callejero", "cerdo", "piña"],
    descEs: "Los tacos al pastor son uno de los platillos más populares de la cocina mexicana callejera. Se preparan con carne de cerdo marinada en una mezcla de chiles secos, especias y achiote, luego se apila en un trompo vertical similar al shawarma. La carne se rebana finamente y se sirve en tortillas de maíz con piña, cebolla, cilantro y salsa verde.",
    descEn: "Tacos al pastor are one of the most popular dishes in Mexican street food. They are prepared with pork marinated in a mixture of dried chiles, spices, and achiote, then stacked on a vertical spit similar to shawarma. The meat is thinly sliced and served on corn tortillas with pineapple, onion, cilantro, and green salsa.",
    vocab: [
      { word: "cerdo", english: "pork" },
      { word: "tortilla de maíz", english: "corn tortilla" },
      { word: "piña", english: "pineapple" },
      { word: "cilantro", english: "cilantro/coriander" },
      { word: "cebolla", english: "onion" },
      { word: "salsa verde", english: "green sauce" },
      { word: "trompo", english: "vertical spit" }
    ],
    quiz: [
      {
        prompt: "¿Qué tipo de carne se usa en los tacos al pastor?",
        options: ["Res", "Pollo", "Cerdo", "Cordero"],
        correct: 2
      },
      {
        prompt: "¿Qué fruta se añade tradicionalmente a los tacos al pastor?",
        options: ["Mango", "Piña", "Papaya", "Limón"],
        correct: 1
      },
      {
        prompt: "¿De qué cocina se inspiró el método de cocción del trompo?",
        options: ["Italiana", "China", "Libanesa", "Francesa"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-empanadas",
    spanishName: "Empanadas",
    englishName: "Stuffed Pastries",
    icon: "🥟",
    tags: ["Argentina", "masa", "relleno", "horno", "latinoamérica"],
    descEs: "Las empanadas son pasteles rellenos que se encuentran en toda Latinoamérica y España. En Argentina, las empanadas son especialmente populares y cada provincia tiene su propia variante. La masa se rellena con carne picada, pollo, jamón y queso, o verduras, y se puede hornear o freír. El repulgue, el plegado decorativo del borde, indica el tipo de relleno.",
    descEn: "Empanadas are stuffed pastries found throughout Latin America and Spain. In Argentina, empanadas are especially popular and each province has its own variant. The dough is filled with ground meat, chicken, ham and cheese, or vegetables, and can be baked or fried. The repulgue, the decorative edge folding, indicates the type of filling.",
    vocab: [
      { word: "masa", english: "dough" },
      { word: "relleno", english: "filling" },
      { word: "hornear", english: "to bake" },
      { word: "freír", english: "to fry" },
      { word: "carne picada", english: "ground meat" },
      { word: "aceitunas", english: "olives" },
      { word: "huevo duro", english: "hard-boiled egg" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se llama el plegado decorativo del borde de la empanada?",
        options: ["Cierre", "Repulgue", "Trenza", "Sello"],
        correct: 1
      },
      {
        prompt: "¿En qué país las empanadas varían según la provincia?",
        options: ["México", "Colombia", "Argentina", "Chile"],
        correct: 2
      },
      {
        prompt: "¿Cuáles son las dos formas principales de cocinar empanadas?",
        options: ["Hervir y asar", "Hornear y freír", "Guisar y asar", "Hervir y hornear"],
        correct: 1
      }
    ]
  },
  {
    id: "recipe-ceviche",
    spanishName: "Ceviche",
    englishName: "Ceviche",
    icon: "🐟",
    tags: ["Perú", "mariscos", "limón", "fresco", "crudo"],
    descEs: "El ceviche es el plato nacional del Perú, declarado Patrimonio Cultural de la Nación. Consiste en pescado fresco cortado en trozos y marinado en jugo de limón, lo que 'cocina' el pescado mediante un proceso de desnaturalización. Se sazona con ají, cebolla morada, cilantro y sal. Se sirve con camote, choclo y lechuga. El líquido resultante se llama 'leche de tigre'.",
    descEn: "Ceviche is the national dish of Peru, declared Cultural Heritage of the Nation. It consists of fresh fish cut into pieces and marinated in lime juice, which 'cooks' the fish through a denaturation process. It is seasoned with chili pepper, red onion, cilantro, and salt. It is served with sweet potato, corn, and lettuce. The resulting liquid is called 'leche de tigre' (tiger's milk).",
    vocab: [
      { word: "pescado", english: "fish" },
      { word: "limón", english: "lime/lemon" },
      { word: "cebolla morada", english: "red onion" },
      { word: "camote", english: "sweet potato" },
      { word: "ají", english: "chili pepper" },
      { word: "choclo", english: "corn (Andean)" },
      { word: "marinar", english: "to marinate" }
    ],
    quiz: [
      {
        prompt: "¿De qué país es plato nacional el ceviche?",
        options: ["Ecuador", "Chile", "Perú", "Colombia"],
        correct: 2
      },
      {
        prompt: "¿Cómo se llama el líquido del ceviche?",
        options: ["Jugo de mar", "Leche de tigre", "Agua de limón", "Caldo frío"],
        correct: 1
      },
      {
        prompt: "¿Qué ingrediente 'cocina' el pescado en el ceviche?",
        options: ["Vinagre", "Sal", "Jugo de limón", "Aceite"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-arroz-con-pollo",
    spanishName: "Arroz con Pollo",
    englishName: "Rice with Chicken",
    icon: "🍗",
    tags: ["latinoamérica", "arroz", "pollo", "familiar", "reconfortante"],
    descEs: "El arroz con pollo es un plato fundamental de la cocina latinoamericana, con variaciones en casi todos los países hispanohablantes. Se prepara dorando piezas de pollo, luego cocinándolas con arroz, sofrito de cebolla, ajo, pimientos y tomate, y caldo. Según el país se le añaden ingredientes como cerveza, culantro, arvejas, zanahorias o aceitunas. Es un plato familiar por excelencia.",
    descEn: "Rice with chicken is a fundamental dish in Latin American cuisine, with variations in almost every Spanish-speaking country. It is prepared by browning chicken pieces, then cooking them with rice, a sofrito of onion, garlic, peppers, and tomato, and broth. Depending on the country, ingredients such as beer, culantro, peas, carrots, or olives are added. It is the quintessential family dish.",
    vocab: [
      { word: "pollo", english: "chicken" },
      { word: "sofrito", english: "sautéed base" },
      { word: "ajo", english: "garlic" },
      { word: "pimiento", english: "bell pepper" },
      { word: "dorar", english: "to brown/sear" },
      { word: "arvejas", english: "peas" },
      { word: "zanahoria", english: "carrot" }
    ],
    quiz: [
      {
        prompt: "¿Qué es un 'sofrito' en la cocina latinoamericana?",
        options: ["Un postre frito", "Una base de vegetales salteados", "Un tipo de sopa", "Una salsa picante"],
        correct: 1
      },
      {
        prompt: "¿Cuál es el primer paso para preparar el pollo en este plato?",
        options: ["Hervirlo", "Dorarlo", "Marinarlo", "Asarlo"],
        correct: 1
      },
      {
        prompt: "¿En cuántos países hispanohablantes se prepara alguna versión de arroz con pollo?",
        options: ["Solo en España", "Solo en el Caribe", "En casi todos", "Solo en Sudamérica"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-churros",
    spanishName: "Churros",
    englishName: "Churros",
    icon: "🍩",
    tags: ["España", "México", "postre", "desayuno", "frito"],
    descEs: "Los churros son una masa frita alargada y estriada, popular en España y toda Latinoamérica. En España, los churros se sirven tradicionalmente para el desayuno o la merienda, acompañados de una taza de chocolate espeso para mojar. En México, los churros suelen ser más gruesos y se rellenan con cajeta, chocolate o crema. La masa se hace con harina, agua y sal, y se fríe en aceite caliente.",
    descEn: "Churros are elongated, ridged fried dough, popular in Spain and throughout Latin America. In Spain, churros are traditionally served for breakfast or afternoon snack, accompanied by a cup of thick chocolate for dipping. In Mexico, churros tend to be thicker and are filled with cajeta, chocolate, or cream. The dough is made with flour, water, and salt, and fried in hot oil.",
    vocab: [
      { word: "harina", english: "flour" },
      { word: "azúcar", english: "sugar" },
      { word: "canela", english: "cinnamon" },
      { word: "chocolate", english: "chocolate" },
      { word: "aceite", english: "oil" },
      { word: "merienda", english: "afternoon snack" },
      { word: "masa", english: "dough" }
    ],
    quiz: [
      {
        prompt: "¿Con qué se acompañan tradicionalmente los churros en España?",
        options: ["Café con leche", "Chocolate espeso", "Mermelada", "Miel"],
        correct: 1
      },
      {
        prompt: "¿Qué es la 'cajeta' que se usa para rellenar churros en México?",
        options: ["Crema de vainilla", "Dulce de leche de cabra", "Mermelada de fresa", "Salsa de caramelo"],
        correct: 1
      },
      {
        prompt: "¿En qué momento del día se comen los churros tradicionalmente en España?",
        options: ["Almuerzo", "Cena", "Desayuno o merienda", "Medianoche"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-guacamole",
    spanishName: "Guacamole",
    englishName: "Guacamole",
    icon: "🥑",
    tags: ["México", "aguacate", "salsa", "azteca", "fresco"],
    descEs: "El guacamole es una salsa mexicana de origen azteca cuyo nombre proviene del náhuatl 'ahuacamolli' (salsa de aguacate). Se prepara machacando aguacates maduros y mezclándolos con cebolla picada, tomate, cilantro, chile serrano, jugo de limón y sal. Es un acompañamiento esencial de la cocina mexicana, servido con totopos, tacos y otros platillos. El aguacate es originario de Mesoamérica.",
    descEn: "Guacamole is a Mexican sauce of Aztec origin whose name comes from the Nahuatl 'ahuacamolli' (avocado sauce). It is prepared by mashing ripe avocados and mixing them with chopped onion, tomato, cilantro, serrano chile, lime juice, and salt. It is an essential accompaniment in Mexican cuisine, served with tortilla chips, tacos, and other dishes. The avocado is native to Mesoamerica.",
    vocab: [
      { word: "aguacate", english: "avocado" },
      { word: "machacar", english: "to mash" },
      { word: "picar", english: "to chop" },
      { word: "tomate", english: "tomato" },
      { word: "totopos", english: "tortilla chips" },
      { word: "chile", english: "chili pepper" },
      { word: "maduro", english: "ripe" }
    ],
    quiz: [
      {
        prompt: "¿De qué lengua indígena proviene la palabra 'guacamole'?",
        options: ["Maya", "Quechua", "Náhuatl", "Zapoteco"],
        correct: 2
      },
      {
        prompt: "¿Cuál es el ingrediente principal del guacamole?",
        options: ["Tomate", "Aguacate", "Chile", "Cebolla"],
        correct: 1
      },
      {
        prompt: "¿De qué región es originario el aguacate?",
        options: ["Sudamérica", "Asia", "Mesoamérica", "África"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-tortilla-espanola",
    spanishName: "Tortilla Española",
    englishName: "Spanish Omelette",
    icon: "🍳",
    tags: ["España", "huevos", "patatas", "tapas", "clásico"],
    descEs: "La tortilla española, también llamada tortilla de patatas, es uno de los platos más queridos de España. Se elabora con huevos batidos, patatas cortadas en rodajas finas y fritas lentamente en aceite de oliva, y opcionalmente cebolla. La mezcla se cuaja en la sartén y se da la vuelta con un plato para cocinar ambos lados. El gran debate español es si la tortilla debe llevar cebolla o no. Se sirve como tapa, pincho o plato principal.",
    descEn: "The Spanish omelette, also called tortilla de patatas, is one of Spain's most beloved dishes. It is made with beaten eggs, potatoes sliced thin and slowly fried in olive oil, and optionally onion. The mixture is set in the pan and flipped with a plate to cook both sides. The great Spanish debate is whether the tortilla should include onion or not. It is served as a tapa, pincho, or main dish.",
    vocab: [
      { word: "huevos", english: "eggs" },
      { word: "patatas", english: "potatoes" },
      { word: "aceite de oliva", english: "olive oil" },
      { word: "batir", english: "to beat/whisk" },
      { word: "cuajar", english: "to set/curdle" },
      { word: "rodajas", english: "slices" },
      { word: "dar la vuelta", english: "to flip" }
    ],
    quiz: [
      {
        prompt: "¿Cuál es el gran debate sobre la tortilla española?",
        options: ["Si se usa aceite o mantequilla", "Si lleva cebolla o no", "Si se sirve fría o caliente", "Si se usa patata o boniato"],
        correct: 1
      },
      {
        prompt: "¿Cómo se da la vuelta a la tortilla en la sartén?",
        options: ["Con una espátula", "Lanzándola al aire", "Con un plato", "Con dos sartenes"],
        correct: 2
      },
      {
        prompt: "¿Qué tipo de aceite se usa tradicionalmente?",
        options: ["Aceite de girasol", "Aceite de coco", "Aceite de oliva", "Mantequilla"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-flan",
    spanishName: "Flan",
    englishName: "Caramel Custard",
    icon: "🍮",
    tags: ["España", "latinoamérica", "postre", "caramelo", "huevos"],
    descEs: "El flan es un postre de natillas con caramelo presente en toda la cocina hispana. Se prepara con huevos, leche, azúcar y vainilla, cocinado a baño maría en el horno. El molde se recubre primero con caramelo líquido que, al enfriar, forma una salsa dorada que baña el flan al desmoldarlo. En México se hace con leche condensada y queso crema. En Cuba se prepara con leche evaporada. Cada país tiene su versión única.",
    descEn: "Flan is a caramel custard dessert found throughout Hispanic cuisine. It is prepared with eggs, milk, sugar, and vanilla, cooked in a water bath in the oven. The mold is first coated with liquid caramel that, when cooled, forms a golden sauce that covers the flan when unmolded. In Mexico it is made with condensed milk and cream cheese. In Cuba it is prepared with evaporated milk. Each country has its unique version.",
    vocab: [
      { word: "caramelo", english: "caramel" },
      { word: "natillas", english: "custard" },
      { word: "leche condensada", english: "condensed milk" },
      { word: "baño maría", english: "water bath" },
      { word: "vainilla", english: "vanilla" },
      { word: "desmoldar", english: "to unmold" },
      { word: "molde", english: "mold" }
    ],
    quiz: [
      {
        prompt: "¿Cómo se cocina el flan en el horno?",
        options: ["Directamente en la bandeja", "A baño maría", "En papel aluminio", "A fuego directo"],
        correct: 1
      },
      {
        prompt: "¿Qué ingrediente especial se usa en el flan mexicano?",
        options: ["Chocolate", "Queso crema", "Coco", "Frutas"],
        correct: 1
      },
      {
        prompt: "¿Qué forma la salsa dorada del flan?",
        options: ["Miel", "Azúcar glass", "Caramelo líquido", "Mermelada"],
        correct: 2
      }
    ]
  },
  {
    id: "recipe-pupusas",
    spanishName: "Pupusas",
    englishName: "Pupusas",
    icon: "🫓",
    tags: ["El Salvador", "maíz", "queso", "frijoles", "tradicional"],
    descEs: "Las pupusas son el plato nacional de El Salvador y se celebran el segundo domingo de noviembre en el Día Nacional de la Pupusa. Son tortillas gruesas de masa de maíz rellenas de queso, frijoles refritos, chicharrón (cerdo molido) o loroco (una flor comestible centroamericana). Se cocinan en una plancha o comal y se sirven con curtido (ensalada de repollo fermentado) y salsa de tomate. Su origen es precolombino.",
    descEn: "Pupusas are the national dish of El Salvador and are celebrated on the second Sunday of November on National Pupusa Day. They are thick corn dough tortillas filled with cheese, refried beans, chicharrón (ground pork), or loroco (an edible Central American flower). They are cooked on a griddle or comal and served with curtido (fermented cabbage salad) and tomato sauce. Their origin is pre-Columbian.",
    vocab: [
      { word: "masa de maíz", english: "corn dough" },
      { word: "queso", english: "cheese" },
      { word: "frijoles refritos", english: "refried beans" },
      { word: "chicharrón", english: "ground pork" },
      { word: "curtido", english: "pickled cabbage slaw" },
      { word: "comal", english: "griddle" },
      { word: "loroco", english: "loroco flower" }
    ],
    quiz: [
      {
        prompt: "¿De qué país son plato nacional las pupusas?",
        options: ["Honduras", "Guatemala", "El Salvador", "Nicaragua"],
        correct: 2
      },
      {
        prompt: "¿Qué es el 'curtido' que acompaña las pupusas?",
        options: ["Una salsa picante", "Ensalada de repollo fermentado", "Crema agria", "Guacamole"],
        correct: 1
      },
      {
        prompt: "¿Qué es el 'loroco' usado como relleno?",
        options: ["Un queso especial", "Un tipo de frijol", "Una flor comestible", "Una hierba aromática"],
        correct: 2
      }
    ]
  }
];
