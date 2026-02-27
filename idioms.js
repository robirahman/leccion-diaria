const IDIOMS_DATA = [
  {
    id: "idiom-01",
    spanish: "Estar en las nubes",
    literal: "To be in the clouds",
    meaning: "To be daydreaming or absent-minded; not paying attention.",
    example: "El profesor le hizo una pregunta, pero Juan estaba en las nubes y no escuchó nada.",
    exampleEn: "The teacher asked him a question, but Juan had his head in the clouds and didn't hear anything.",
    category: "weather"
  },
  {
    id: "idiom-02",
    spanish: "Costar un ojo de la cara",
    literal: "To cost an eye from the face",
    meaning: "To be very expensive.",
    example: "Ese coche nuevo le costó un ojo de la cara, pero estaba muy ilusionado.",
    exampleEn: "That new car cost him an arm and a leg, but he was very excited.",
    category: "body"
  },
  {
    id: "idiom-03",
    spanish: "Meter la pata",
    literal: "To put the paw in",
    meaning: "To make a blunder or embarrassing mistake.",
    example: "Metí la pata cuando le pregunté por su esposo; resulta que se divorciaron hace un mes.",
    exampleEn: "I put my foot in it when I asked about her husband; turns out they divorced a month ago.",
    category: "animals"
  },
  {
    id: "idiom-04",
    spanish: "Tener mariposas en el estómago",
    literal: "To have butterflies in the stomach",
    meaning: "To feel nervous or excited, especially about love.",
    example: "Cada vez que la ve, tiene mariposas en el estómago.",
    exampleEn: "Every time he sees her, he gets butterflies in his stomach.",
    category: "animals"
  },
  {
    id: "idiom-05",
    spanish: "Ser pan comido",
    literal: "To be eaten bread",
    meaning: "To be very easy; a piece of cake.",
    example: "El examen de matemáticas fue pan comido; lo terminé en diez minutos.",
    exampleEn: "The math exam was a piece of cake; I finished it in ten minutes.",
    category: "food"
  },
  {
    id: "idiom-06",
    spanish: "No tener pelos en la lengua",
    literal: "To not have hairs on the tongue",
    meaning: "To speak one's mind freely; to be very blunt and outspoken.",
    example: "Mi abuela no tiene pelos en la lengua; siempre dice exactamente lo que piensa.",
    exampleEn: "My grandmother doesn't mince words; she always says exactly what she thinks.",
    category: "body"
  },
  {
    id: "idiom-07",
    spanish: "Estar como una cabra",
    literal: "To be like a goat",
    meaning: "To be crazy or eccentric.",
    example: "Mi vecino sale a correr a las cinco de la mañana en invierno. ¡Está como una cabra!",
    exampleEn: "My neighbor goes running at five in the morning in winter. He's totally nuts!",
    category: "animals"
  },
  {
    id: "idiom-08",
    spanish: "Ponerse las pilas",
    literal: "To put in one's batteries",
    meaning: "To get one's act together; to start working harder.",
    example: "Si no te pones las pilas, vas a reprobar el curso.",
    exampleEn: "If you don't get your act together, you're going to fail the course.",
    category: "emotions"
  },
  {
    id: "idiom-09",
    spanish: "Dar en el clavo",
    literal: "To hit the nail",
    meaning: "To be exactly right; to hit the nail on the head.",
    example: "Cuando dijiste que el problema era el motor, diste en el clavo.",
    exampleEn: "When you said the problem was the engine, you hit the nail on the head.",
    category: "emotions"
  },
  {
    id: "idiom-10",
    spanish: "Estar hasta las narices",
    literal: "To be up to the nostrils",
    meaning: "To be fed up; to have had enough of something.",
    example: "Estoy hasta las narices de su actitud negativa.",
    exampleEn: "I'm fed up with his negative attitude.",
    category: "body"
  },
  {
    id: "idiom-11",
    spanish: "Ir viento en popa",
    literal: "To go with wind at the stern",
    meaning: "To go very well; to be going smoothly and successfully.",
    example: "El negocio va viento en popa; hemos triplicado las ventas este año.",
    exampleEn: "The business is going great guns; we've tripled sales this year.",
    category: "weather"
  },
  {
    id: "idiom-12",
    spanish: "Tomar el pelo",
    literal: "To take the hair",
    meaning: "To pull someone's leg; to joke with or tease someone.",
    example: "¿Me estás tomando el pelo? ¡No puede ser verdad!",
    exampleEn: "Are you pulling my leg? That can't be true!",
    category: "body"
  },
  {
    id: "idiom-13",
    spanish: "Ser la oveja negra",
    literal: "To be the black sheep",
    meaning: "To be the outcast or the odd one out in a group or family.",
    example: "En una familia de abogados, él es la oveja negra porque quiso ser artista.",
    exampleEn: "In a family of lawyers, he's the black sheep because he wanted to be an artist.",
    category: "animals"
  },
  {
    id: "idiom-14",
    spanish: "Echar agua al mar",
    literal: "To throw water into the sea",
    meaning: "To do something pointless or futile.",
    example: "Darle consejos a él es como echar agua al mar; nunca escucha.",
    exampleEn: "Giving him advice is like pouring water into the sea; he never listens.",
    category: "weather"
  },
  {
    id: "idiom-15",
    spanish: "Estar con el agua al cuello",
    literal: "To be with water up to the neck",
    meaning: "To be in deep trouble, especially financial.",
    example: "Con tantas deudas, están con el agua al cuello.",
    exampleEn: "With so many debts, they're in over their heads.",
    category: "weather"
  },
  {
    id: "idiom-16",
    spanish: "Dar calabazas",
    literal: "To give pumpkins",
    meaning: "To reject someone romantically; to turn someone down.",
    example: "Le pidió que saliera con él, pero ella le dio calabazas.",
    exampleEn: "He asked her out, but she turned him down.",
    category: "food"
  },
  {
    id: "idiom-17",
    spanish: "Ponerse rojo como un tomate",
    literal: "To turn red as a tomato",
    meaning: "To blush intensely from embarrassment.",
    example: "Cuando la profesora lo elogió delante de todos, se puso rojo como un tomate.",
    exampleEn: "When the teacher praised him in front of everyone, he turned red as a beet.",
    category: "food"
  },
  {
    id: "idiom-18",
    spanish: "Tener mala leche",
    literal: "To have bad milk",
    meaning: "To be bad-tempered or to have bad intentions.",
    example: "No le hables ahora; tiene muy mala leche hoy.",
    exampleEn: "Don't talk to him now; he's in a really bad mood today.",
    category: "food"
  },
  {
    id: "idiom-19",
    spanish: "Estar hecho polvo",
    literal: "To be made into dust",
    meaning: "To be exhausted or emotionally devastated.",
    example: "Después de correr el maratón, estaba hecho polvo.",
    exampleEn: "After running the marathon, I was completely wiped out.",
    category: "emotions"
  },
  {
    id: "idiom-20",
    spanish: "Quedarse de piedra",
    literal: "To remain as stone",
    meaning: "To be shocked or stunned; frozen in disbelief.",
    example: "Cuando me dijeron que había ganado el premio, me quedé de piedra.",
    exampleEn: "When they told me I had won the prize, I was stunned.",
    category: "emotions"
  },
  {
    id: "idiom-21",
    spanish: "Llover sobre mojado",
    literal: "To rain on what's already wet",
    meaning: "To add problems to an already bad situation; when it rains, it pours.",
    example: "Primero perdió el trabajo y ahora se le rompió el coche. Llueve sobre mojado.",
    exampleEn: "First he lost his job and now his car broke down. When it rains, it pours.",
    category: "weather"
  },
  {
    id: "idiom-22",
    spanish: "Ser un gallina",
    literal: "To be a hen",
    meaning: "To be a coward.",
    example: "No seas gallina y tírate del trampolín.",
    exampleEn: "Don't be a chicken and jump off the diving board.",
    category: "animals"
  },
  {
    id: "idiom-23",
    spanish: "Dormir a pierna suelta",
    literal: "To sleep with loose leg",
    meaning: "To sleep very deeply and soundly.",
    example: "Después del viaje tan largo, dormí a pierna suelta toda la noche.",
    exampleEn: "After such a long trip, I slept like a log all night.",
    category: "body"
  },
  {
    id: "idiom-24",
    spanish: "Importar un pepino",
    literal: "To matter a cucumber",
    meaning: "To not care at all about something.",
    example: "Lo que piensen los demás me importa un pepino.",
    exampleEn: "I couldn't care less about what others think.",
    category: "food"
  },
  {
    id: "idiom-25",
    spanish: "Verlo todo negro",
    literal: "To see everything black",
    meaning: "To be pessimistic; to see everything in a negative way.",
    example: "Desde que perdió su trabajo, lo ve todo negro.",
    exampleEn: "Since he lost his job, he sees everything in a negative light.",
    category: "emotions"
  }
];
