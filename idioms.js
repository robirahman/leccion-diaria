const IDIOMS_DATA = [
  {
    id: "idiom-01",
    spanish: "Estar en las nubes",
    literal: "To be in the clouds",
    meaning: "To be daydreaming or absent-minded; not paying attention.",
    example: "El profesor le hizo una pregunta, pero Juan estaba en las nubes y no escuchó nada.",
    exampleEn: "The teacher asked him a question, but Juan had his head in the clouds and didn't hear anything.",
    category: "weather",
    level: "A2",
    quiz: [
      {
        prompt: "¿Qué significa 'estar en las nubes'?",
        options: ["Estar muy alto", "Estar distraído o soñando despierto", "Estar triste", "Estar volando en avión"],
        correct: 1,
        explanation: "The idiom uses clouds as a metaphor for mental distance — someone whose mind has drifted away from the present moment, like their thoughts have floated up into the sky."
      },
      {
        prompt: "¿Cuál es un equivalente en inglés de 'estar en las nubes'?",
        options: ["To be on cloud nine", "To have one's head in the clouds", "To be under the weather", "To be walking on air"],
        correct: 1,
        explanation: "While 'on cloud nine' means to be extremely happy, 'head in the clouds' shares the same imagery and meaning as the Spanish idiom — being absent-minded or lost in thought."
      },
      {
        prompt: "Si alguien 'está en las nubes' durante una clase, ¿qué está haciendo?",
        options: ["Tomando apuntes", "No prestando atención", "Haciendo preguntas", "Mirando por la ventana al cielo"],
        correct: 1,
        explanation: "The idiom specifically refers to not paying attention because one's mind is elsewhere, not literally looking at the sky — it describes a mental state of distraction."
      }
    ]
  },
  {
    id: "idiom-02",
    spanish: "Costar un ojo de la cara",
    literal: "To cost an eye from the face",
    meaning: "To be very expensive.",
    example: "Ese coche nuevo le costó un ojo de la cara, pero estaba muy ilusionado.",
    exampleEn: "That new car cost him an arm and a leg, but he was very excited.",
    category: "body",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'costar un ojo de la cara'?",
        options: ["Costar muy poco", "Ser muy caro", "Causar dolor", "Ser difícil de encontrar"],
        correct: 1,
        explanation: "The idiom exaggerates the price of something by comparing it to losing an eye — one of the most valuable parts of the body — to emphasize that the cost is extremely high."
      },
      {
        prompt: "¿Cuál sería el equivalente más cercano en inglés?",
        options: ["To cost an arm and a leg", "To break the bank", "To pay through the nose", "To be dirt cheap"],
        correct: 0,
        explanation: "Both 'costar un ojo de la cara' and 'to cost an arm and a leg' use body parts as a metaphor for extreme expense, though Spanish uses an eye while English uses limbs."
      },
      {
        prompt: "¿Qué parte del cuerpo se menciona en esta expresión?",
        options: ["La mano", "El ojo", "La pierna", "El brazo"],
        correct: 1,
        explanation: "The idiom literally says something costs 'an eye from the face' (un ojo de la cara), using the loss of an eye to represent an exorbitant price."
      }
    ]
  },
  {
    id: "idiom-03",
    spanish: "Meter la pata",
    literal: "To put the paw in",
    meaning: "To make a blunder or embarrassing mistake.",
    example: "Metí la pata cuando le pregunté por su esposo; resulta que se divorciaron hace un mes.",
    exampleEn: "I put my foot in it when I asked about her husband; turns out they divorced a month ago.",
    category: "animals",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'meter la pata'?",
        options: ["Poner el pie en un charco", "Cometer un error vergonzoso", "Caminar descalzo", "Pisar a alguien"],
        correct: 1,
        explanation: "The idiom comes from the image of an animal clumsily stepping where it shouldn't — 'pata' means an animal's paw or leg, so it evokes an awkward, unintentional blunder."
      },
      {
        prompt: "¿En qué situación se diría 'metí la pata'?",
        options: ["Cuando ganas un premio", "Cuando dices algo inapropiado sin querer", "Cuando cocinas algo delicioso", "Cuando llegas temprano"],
        correct: 1,
        explanation: "This idiom is specifically used for social blunders — saying or doing something embarrassing by accident, especially when the mistake causes awkwardness for others."
      },
      {
        prompt: "¿Qué significa 'pata' en esta expresión?",
        options: ["Zapato", "Pierna de un animal", "Mano", "Sombrero"],
        correct: 1,
        explanation: "'Pata' specifically refers to an animal's foot or leg, distinguishing it from 'pie' (human foot) or 'pierna' (human leg), which gives the idiom its humorous, clumsy imagery."
      }
    ]
  },
  {
    id: "idiom-04",
    spanish: "Tener mariposas en el estómago",
    literal: "To have butterflies in the stomach",
    meaning: "To feel nervous or excited, especially about love.",
    example: "Cada vez que la ve, tiene mariposas en el estómago.",
    exampleEn: "Every time he sees her, he gets butterflies in his stomach.",
    category: "animals",
    level: "A2",
    quiz: [
      {
        prompt: "¿Qué significa 'tener mariposas en el estómago'?",
        options: ["Tener hambre", "Sentir nervios o emoción", "Estar enfermo del estómago", "Estar muy tranquilo"],
        correct: 1,
        explanation: "The fluttering sensation of nervousness or excitement in one's stomach is compared to butterflies moving around inside — this idiom exists almost identically in both Spanish and English."
      },
      {
        prompt: "¿Con qué sentimiento se asocia más esta expresión?",
        options: ["Ira", "Enamoramiento", "Aburrimiento", "Tristeza"],
        correct: 1,
        explanation: "While the idiom can describe any nervous excitement, it is most commonly associated with romantic feelings — the giddy, anxious sensation of being attracted to someone."
      },
      {
        prompt: "¿Es esta expresión casi idéntica en inglés y español?",
        options: ["Sí, ambas usan mariposas en el estómago", "No, en inglés se usan pájaros", "No, en inglés se usan abejas", "No, no existe en inglés"],
        correct: 0,
        explanation: "This is one of the rare idioms that translates almost word-for-word between Spanish and English: 'tener mariposas en el estómago' = 'to have butterflies in the stomach.'"
      }
    ]
  },
  {
    id: "idiom-05",
    spanish: "Ser pan comido",
    literal: "To be eaten bread",
    meaning: "To be very easy; a piece of cake.",
    example: "El examen de matemáticas fue pan comido; lo terminé en diez minutos.",
    exampleEn: "The math exam was a piece of cake; I finished it in ten minutes.",
    category: "food",
    level: "A2",
    quiz: [
      {
        prompt: "¿Qué significa 'ser pan comido'?",
        options: ["Ser delicioso", "Ser muy fácil", "Estar pasado de moda", "Ser caro"],
        correct: 1,
        explanation: "The image of bread already eaten suggests something so easy it's already done — eating bread requires no effort, so the idiom conveys that a task is effortless."
      },
      {
        prompt: "¿Cuál es el equivalente en inglés de 'ser pan comido'?",
        options: ["To be toast", "To be a piece of cake", "To be bread and butter", "To be half-baked"],
        correct: 1,
        explanation: "Both languages use food metaphors for easiness, but Spanish uses bread (pan) while English uses cake — both everyday foods that are simple to consume."
      },
      {
        prompt: "Si un examen 'fue pan comido', ¿cómo fue?",
        options: ["Imposible", "Muy difícil", "Muy fácil", "Regular"],
        correct: 2,
        explanation: "When someone says a task was 'pan comido,' they mean it required minimal effort — they completed it quickly and without difficulty."
      }
    ]
  },
  {
    id: "idiom-06",
    spanish: "No tener pelos en la lengua",
    literal: "To not have hairs on the tongue",
    meaning: "To speak one's mind freely; to be very blunt and outspoken.",
    example: "Mi abuela no tiene pelos en la lengua; siempre dice exactamente lo que piensa.",
    exampleEn: "My grandmother doesn't mince words; she always says exactly what she thinks.",
    category: "body",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'no tener pelos en la lengua'?",
        options: ["Hablar muy rápido", "Decir lo que uno piensa sin filtro", "No poder hablar", "Mentir constantemente"],
        correct: 1,
        explanation: "The idiom imagines that hairs on the tongue would impede speech — someone without them speaks freely and bluntly, with nothing holding back their words."
      },
      {
        prompt: "¿Cuál es un equivalente en inglés?",
        options: ["To bite one's tongue", "To not mince words", "To have a frog in one's throat", "To speak in tongues"],
        correct: 1,
        explanation: "'Not mincing words' means speaking directly without softening the message, just as 'no tener pelos en la lengua' describes someone who says exactly what they think without hesitation."
      },
      {
        prompt: "Si alguien 'no tiene pelos en la lengua', ¿cómo es esa persona?",
        options: ["Tímida", "Directa y sincera", "Mentirosa", "Callada"],
        correct: 1,
        explanation: "This idiom describes a personality trait — the person is characteristically frank and outspoken, someone who consistently says what they think regardless of social conventions."
      }
    ]
  },
  {
    id: "idiom-07",
    spanish: "Estar como una cabra",
    literal: "To be like a goat",
    meaning: "To be crazy or eccentric.",
    example: "Mi vecino sale a correr a las cinco de la mañana en invierno. ¡Está como una cabra!",
    exampleEn: "My neighbor goes running at five in the morning in winter. He's totally nuts!",
    category: "animals",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'estar como una cabra'?",
        options: ["Estar muy sano", "Estar loco o ser excéntrico", "Estar hambriento", "Estar perdido"],
        correct: 1,
        explanation: "Goats are known for their erratic, unpredictable behavior — jumping, climbing, and moving in seemingly random ways — which is why Spanish uses them as a metaphor for craziness."
      },
      {
        prompt: "¿Por qué se asocia la cabra con la locura?",
        options: ["Porque las cabras son peligrosas", "Porque las cabras tienen un comportamiento errático e impredecible", "Porque las cabras son muy inteligentes", "Porque las cabras hacen mucho ruido"],
        correct: 1,
        explanation: "Goats leap unexpectedly, climb improbable surfaces, and behave unpredictably, making them a natural cultural symbol for eccentric or irrational behavior."
      },
      {
        prompt: "¿Cuál sería un equivalente informal en inglés?",
        options: ["To be stubborn as a mule", "To be nutty as a fruitcake", "To be strong as an ox", "To be quiet as a mouse"],
        correct: 1,
        explanation: "Both expressions use humorous comparisons to describe someone who is crazy or eccentric — Spanish uses a goat while English commonly uses food imagery like 'nutty as a fruitcake.'"
      }
    ]
  },
  {
    id: "idiom-08",
    spanish: "Ponerse las pilas",
    literal: "To put in one's batteries",
    meaning: "To get one's act together; to start working harder.",
    example: "Si no te pones las pilas, vas a reprobar el curso.",
    exampleEn: "If you don't get your act together, you're going to fail the course.",
    category: "emotions",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'ponerse las pilas'?",
        options: ["Comprar baterías", "Empezar a esforzarse más", "Irse a dormir", "Dejar de trabajar"],
        correct: 1,
        explanation: "The idiom compares a person to a device that needs batteries — 'putting in your batteries' means energizing yourself and starting to work harder or pay more attention."
      },
      {
        prompt: "¿En qué contexto se usa típicamente 'ponerse las pilas'?",
        options: ["Cuando alguien está celebrando", "Cuando alguien necesita mejorar su rendimiento", "Cuando alguien está cocinando", "Cuando alguien está de vacaciones"],
        correct: 1,
        explanation: "This expression is typically used as encouragement or a warning when someone is underperforming — at school, work, or in any situation requiring more effort."
      },
      {
        prompt: "¿Qué son 'pilas' en esta expresión?",
        options: ["Montones de ropa", "Baterías", "Pilares", "Pastillas"],
        correct: 1,
        explanation: "'Pilas' means batteries in Spanish — the metaphor is that you need to recharge yourself like inserting fresh batteries into a device to make it work properly."
      }
    ]
  },
  {
    id: "idiom-09",
    spanish: "Dar en el clavo",
    literal: "To hit the nail",
    meaning: "To be exactly right; to hit the nail on the head.",
    example: "Cuando dijiste que el problema era el motor, diste en el clavo.",
    exampleEn: "When you said the problem was the engine, you hit the nail on the head.",
    category: "emotions",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'dar en el clavo'?",
        options: ["Golpear algo con un martillo", "Acertar exactamente", "Cometer un error grave", "Construir algo nuevo"],
        correct: 1,
        explanation: "Just as hitting a nail precisely on its head requires skill and accuracy, the idiom means getting something exactly right — identifying the correct answer or cause."
      },
      {
        prompt: "¿Cuál es el equivalente directo en inglés?",
        options: ["To nail it down", "To hit the nail on the head", "To hammer the point", "To drive it home"],
        correct: 1,
        explanation: "This is one of the closest direct translations between Spanish and English idioms — both use the image of precisely hitting a nail to mean being exactly right about something."
      },
      {
        prompt: "Si alguien 'da en el clavo', ¿qué ha hecho?",
        options: ["Ha destruido algo", "Ha encontrado la respuesta correcta", "Ha perdido el tiempo", "Ha empeorado la situación"],
        correct: 1,
        explanation: "The person has accurately identified the truth, cause, or solution — their observation or guess was precisely correct."
      }
    ]
  },
  {
    id: "idiom-10",
    spanish: "Estar hasta las narices",
    literal: "To be up to the nostrils",
    meaning: "To be fed up; to have had enough of something.",
    example: "Estoy hasta las narices de su actitud negativa.",
    exampleEn: "I'm fed up with his negative attitude.",
    category: "body",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'estar hasta las narices'?",
        options: ["Estar resfriado", "Estar harto de algo", "Estar muy contento", "Estar sorprendido"],
        correct: 1,
        explanation: "The idiom imagines being submerged in something unpleasant up to the nostrils — the very last point before you can no longer breathe — representing the limit of one's patience."
      },
      {
        prompt: "¿Qué parte del cuerpo se usa en esta expresión?",
        options: ["Los ojos", "Las orejas", "Las narices", "La boca"],
        correct: 2,
        explanation: "The idiom uses 'narices' (nostrils/nose), suggesting a level just below drowning — you're so fed up that the problem has risen almost above your ability to tolerate it."
      },
      {
        prompt: "¿Qué emoción expresa alguien que 'está hasta las narices'?",
        options: ["Alegría", "Frustración e irritación", "Miedo", "Amor"],
        correct: 1,
        explanation: "This expression conveys strong frustration and exasperation — the person has reached their breaking point with a situation, person, or repeated annoyance."
      }
    ]
  },
  {
    id: "idiom-11",
    spanish: "Ir viento en popa",
    literal: "To go with wind at the stern",
    meaning: "To go very well; to be going smoothly and successfully.",
    example: "El negocio va viento en popa; hemos triplicado las ventas este año.",
    exampleEn: "The business is going great guns; we've tripled sales this year.",
    category: "weather",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'ir viento en popa'?",
        options: ["Navegar en un barco", "Ir muy bien, con éxito", "Ir muy rápido", "Tener mal tiempo"],
        correct: 1,
        explanation: "The idiom comes from sailing — when wind blows at the stern (popa), the ship moves forward at full speed with no resistance, symbolizing smooth and successful progress."
      },
      {
        prompt: "¿De dónde viene esta expresión?",
        options: ["De la aviación", "De la navegación marítima", "De la agricultura", "De la minería"],
        correct: 1,
        explanation: "The term 'popa' (stern) is a nautical word — the idiom originates from sailing, where wind at the stern was the most favorable condition for a ship's voyage."
      },
      {
        prompt: "Si un negocio 'va viento en popa', ¿cómo le va?",
        options: ["Está fracasando", "Está estancado", "Está teniendo mucho éxito", "Está a punto de cerrar"],
        correct: 2,
        explanation: "The business is thriving and progressing smoothly — like a ship with a perfect tailwind, everything is moving forward without obstacles."
      }
    ]
  },
  {
    id: "idiom-12",
    spanish: "Tomar el pelo",
    literal: "To take the hair",
    meaning: "To pull someone's leg; to joke with or tease someone.",
    example: "¿Me estás tomando el pelo? ¡No puede ser verdad!",
    exampleEn: "Are you pulling my leg? That can't be true!",
    category: "body",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'tomar el pelo'?",
        options: ["Cortar el cabello", "Bromear o burlarse de alguien", "Peinar a alguien", "Saludar a alguien"],
        correct: 1,
        explanation: "The idiom likely originated from the old practice of pulling someone's beard or hair as a sign of disrespect or mockery — today it means to tease, joke with, or deceive someone in a playful way."
      },
      {
        prompt: "¿Cuál es el equivalente más cercano en inglés?",
        options: ["To let your hair down", "To pull someone's leg", "To split hairs", "To tear your hair out"],
        correct: 1,
        explanation: "Both 'tomar el pelo' and 'pull someone's leg' mean to joke with or deceive someone playfully — interestingly, Spanish uses hair while English uses a leg."
      },
      {
        prompt: "Si alguien te dice '¿Me estás tomando el pelo?', ¿qué siente?",
        options: ["Gratitud", "Incredulidad ante lo que le dicen", "Dolor físico", "Hambre"],
        correct: 1,
        explanation: "When someone asks this question, they find what they're hearing hard to believe — they suspect the other person might be joking or not telling the truth."
      }
    ]
  },
  {
    id: "idiom-13",
    spanish: "Ser la oveja negra",
    literal: "To be the black sheep",
    meaning: "To be the outcast or the odd one out in a group or family.",
    example: "En una familia de abogados, él es la oveja negra porque quiso ser artista.",
    exampleEn: "In a family of lawyers, he's the black sheep because he wanted to be an artist.",
    category: "animals",
    level: "A2",
    quiz: [
      {
        prompt: "¿Qué significa 'ser la oveja negra'?",
        options: ["Ser el mejor de la familia", "Ser el que no encaja o es diferente en un grupo", "Ser el más trabajador", "Ser el más joven"],
        correct: 1,
        explanation: "In a flock of white sheep, a black sheep stands out as different — the idiom describes someone who doesn't conform to their family's or group's expectations or norms."
      },
      {
        prompt: "¿Existe esta misma expresión en inglés?",
        options: ["No, es exclusiva del español", "Sí, se dice 'black sheep' en inglés también", "Solo en francés", "Solo en italiano"],
        correct: 1,
        explanation: "This is one of the idioms shared across many European languages — 'black sheep' in English carries the exact same meaning, reflecting shared agricultural heritage."
      },
      {
        prompt: "¿Por qué la oveja negra era indeseada históricamente?",
        options: ["Porque daba menos leche", "Porque su lana negra no podía teñirse y valía menos", "Porque era más pequeña", "Porque era más agresiva"],
        correct: 1,
        explanation: "Historically, black wool could not be dyed other colors like white wool could, making it less commercially valuable — so a black sheep was literally worth less to shepherds."
      }
    ]
  },
  {
    id: "idiom-14",
    spanish: "Echar agua al mar",
    literal: "To throw water into the sea",
    meaning: "To do something pointless or futile.",
    example: "Darle consejos a él es como echar agua al mar; nunca escucha.",
    exampleEn: "Giving him advice is like pouring water into the sea; he never listens.",
    category: "weather",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'echar agua al mar'?",
        options: ["Hacer algo productivo", "Hacer algo inútil o sin sentido", "Nadar en el océano", "Desperdiciar agua potable"],
        correct: 1,
        explanation: "Adding water to the ocean makes no perceptible difference — the idiom captures the futility of an action that has zero meaningful impact on the situation."
      },
      {
        prompt: "¿En qué situación usarías 'echar agua al mar'?",
        options: ["Al dar consejos a alguien que nunca escucha", "Al ganar la lotería", "Al terminar un proyecto exitoso", "Al empezar un trabajo nuevo"],
        correct: 0,
        explanation: "The idiom is used when your efforts are wasted because they cannot change the outcome — like advising someone who never listens, the effort produces no result."
      },
      {
        prompt: "¿Cuál es la idea central de esta expresión?",
        options: ["La importancia del agua", "La futilidad de una acción", "La belleza del mar", "La generosidad"],
        correct: 1,
        explanation: "The core concept is absolute futility — the action is so meaningless relative to the scale of the problem that it makes no difference whatsoever."
      }
    ]
  },
  {
    id: "idiom-15",
    spanish: "Estar con el agua al cuello",
    literal: "To be with water up to the neck",
    meaning: "To be in deep trouble, especially financial.",
    example: "Con tantas deudas, están con el agua al cuello.",
    exampleEn: "With so many debts, they're in over their heads.",
    category: "weather",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'estar con el agua al cuello'?",
        options: ["Estar nadando", "Estar en una situación muy difícil", "Estar tomando un baño", "Estar llorando mucho"],
        correct: 1,
        explanation: "The image of water reaching your neck suggests you're about to drown — it represents being overwhelmed by problems, especially debts or obligations, with very little margin left."
      },
      {
        prompt: "¿Con qué tipo de problemas se asocia más esta expresión?",
        options: ["Problemas de salud", "Problemas financieros", "Problemas sentimentales", "Problemas de tráfico"],
        correct: 1,
        explanation: "While the idiom can describe any desperate situation, it is most commonly used for financial difficulties — debts, overdue payments, or economic crises that threaten to overwhelm someone."
      },
      {
        prompt: "¿Cuál es un equivalente en inglés?",
        options: ["To be in hot water", "To be in over one's head", "To be in deep water", "Todas las anteriores son similares"],
        correct: 3,
        explanation: "English has several water-based idioms for trouble: 'in hot water' (in trouble), 'in over one's head' (overwhelmed), and 'in deep water' (in serious difficulty) all capture aspects of the Spanish expression."
      }
    ]
  },
  {
    id: "idiom-16",
    spanish: "Dar calabazas",
    literal: "To give pumpkins",
    meaning: "To reject someone romantically; to turn someone down.",
    example: "Le pidió que saliera con él, pero ella le dio calabazas.",
    exampleEn: "He asked her out, but she turned him down.",
    category: "food",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'dar calabazas'?",
        options: ["Regalar comida", "Rechazar a alguien románticamente", "Cocinar calabazas", "Dar un premio"],
        correct: 1,
        explanation: "This idiom has ancient roots — in some traditions, offering pumpkins or gourds was a symbolic way of rejecting a suitor, as pumpkins were considered a consolation food rather than a desirable gift."
      },
      {
        prompt: "¿En qué contexto se usa principalmente 'dar calabazas'?",
        options: ["En la cocina", "En situaciones románticas", "En el trabajo", "En la escuela"],
        correct: 1,
        explanation: "The expression is primarily used in romantic contexts — when someone is rejected after asking for a date, proposing, or expressing romantic interest."
      },
      {
        prompt: "Si alguien 'te da calabazas', ¿qué te han hecho?",
        options: ["Te han invitado a cenar", "Te han rechazado", "Te han regalado algo", "Te han elogiado"],
        correct: 1,
        explanation: "You've been turned down or rejected — the person has declined your romantic advances, leaving you with 'pumpkins' instead of the affection you sought."
      }
    ]
  },
  {
    id: "idiom-17",
    spanish: "Ponerse rojo como un tomate",
    literal: "To turn red as a tomato",
    meaning: "To blush intensely from embarrassment.",
    example: "Cuando la profesora lo elogió delante de todos, se puso rojo como un tomate.",
    exampleEn: "When the teacher praised him in front of everyone, he turned red as a beet.",
    category: "food",
    level: "A2",
    quiz: [
      {
        prompt: "¿Qué significa 'ponerse rojo como un tomate'?",
        options: ["Tener una quemadura solar", "Sonrojarse mucho por vergüenza", "Estar muy enojado", "Tener fiebre"],
        correct: 1,
        explanation: "The tomato comparison emphasizes the intensity of the blushing — when embarrassed, blood rushes to the face making it bright red, like the vivid color of a ripe tomato."
      },
      {
        prompt: "¿Qué fruta o verdura se usa en la versión en inglés?",
        options: ["Un tomate también", "Una remolacha (beet)", "Una manzana", "Una fresa"],
        correct: 1,
        explanation: "English typically says 'red as a beet' (or 'beetroot' in British English) rather than 'red as a tomato' — different cultures chose different red foods for the same comparison."
      },
      {
        prompt: "¿Qué emoción causa que alguien 'se ponga rojo como un tomate'?",
        options: ["Felicidad", "Vergüenza", "Tristeza", "Miedo"],
        correct: 1,
        explanation: "The primary emotion is embarrassment (vergüenza) — the involuntary blushing response that occurs when someone feels self-conscious or exposed in a social situation."
      }
    ]
  },
  {
    id: "idiom-18",
    spanish: "Tener mala leche",
    literal: "To have bad milk",
    meaning: "To be bad-tempered or to have bad intentions.",
    example: "No le hables ahora; tiene muy mala leche hoy.",
    exampleEn: "Don't talk to him now; he's in a really bad mood today.",
    category: "food",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'tener mala leche'?",
        options: ["Ser intolerante a la lactosa", "Tener mal genio o malas intenciones", "Cocinar mal", "Estar enfermo"],
        correct: 1,
        explanation: "This idiom likely originates from the old belief that a baby's character was shaped by the quality of its wet nurse's milk — 'bad milk' meant the child would develop a bad temperament."
      },
      {
        prompt: "¿'Tener mala leche' se refiere solo al mal humor temporal?",
        options: ["Sí, solo mal humor pasajero", "No, también puede significar tener malas intenciones", "Solo se refiere a la comida", "Solo se usa con niños"],
        correct: 1,
        explanation: "The expression has two related meanings: it can describe someone in a temporarily bad mood, or it can describe someone who is fundamentally mean-spirited or acts with malicious intent."
      },
      {
        prompt: "¿Cuál es el origen probable de esta expresión?",
        options: ["La industria lechera", "La creencia de que la leche materna influía en el carácter del bebé", "Un poema famoso", "Una novela de Cervantes"],
        correct: 1,
        explanation: "The idiom traces back to the medieval belief that a wet nurse's milk could transmit personality traits to the baby — bad milk would produce a bad-tempered child."
      }
    ]
  },
  {
    id: "idiom-19",
    spanish: "Estar hecho polvo",
    literal: "To be made into dust",
    meaning: "To be exhausted or emotionally devastated.",
    example: "Después de correr el maratón, estaba hecho polvo.",
    exampleEn: "After running the marathon, I was completely wiped out.",
    category: "emotions",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'estar hecho polvo'?",
        options: ["Estar muy sucio", "Estar agotado física o emocionalmente", "Estar muy delgado", "Estar desaparecido"],
        correct: 1,
        explanation: "The image of being reduced to dust conveys total depletion — your body or spirit feels so worn down that it's as if you've been ground into powder, with nothing left."
      },
      {
        prompt: "¿Puede 'estar hecho polvo' referirse tanto al cansancio físico como al emocional?",
        options: ["Solo al cansancio físico", "Solo al emocional", "Sí, a ambos", "A ninguno, se refiere a limpieza"],
        correct: 2,
        explanation: "The idiom is versatile — it can describe physical exhaustion (after a marathon) or emotional devastation (after a breakup or loss), or both simultaneously."
      },
      {
        prompt: "¿Cuál sería un equivalente informal en inglés?",
        options: ["To be on top of the world", "To be wiped out / shattered", "To be in one piece", "To be in good shape"],
        correct: 1,
        explanation: "English equivalents like 'wiped out,' 'shattered,' or 'wrecked' convey the same sense of total depletion — being so exhausted or devastated that one feels broken or destroyed."
      }
    ]
  },
  {
    id: "idiom-20",
    spanish: "Quedarse de piedra",
    literal: "To remain as stone",
    meaning: "To be shocked or stunned; frozen in disbelief.",
    example: "Cuando me dijeron que había ganado el premio, me quedé de piedra.",
    exampleEn: "When they told me I had won the prize, I was stunned.",
    category: "emotions",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'quedarse de piedra'?",
        options: ["Volverse muy fuerte", "Quedarse paralizado por la sorpresa", "Sentarse en una roca", "Estar muy tranquilo"],
        correct: 1,
        explanation: "When shocked, people often freeze in place momentarily — the idiom compares this involuntary paralysis to being turned to stone, completely unable to move or react."
      },
      {
        prompt: "¿'Quedarse de piedra' expresa una sorpresa positiva o negativa?",
        options: ["Solo positiva", "Solo negativa", "Puede ser ambas", "Ninguna, no es sorpresa"],
        correct: 2,
        explanation: "The idiom describes the shock itself, not its quality — you can be turned to stone by wonderful news (winning a prize) or terrible news (an unexpected loss) alike."
      },
      {
        prompt: "¿Cuál es un equivalente en inglés?",
        options: ["To be stone cold", "To be petrified / stunned", "To have a heart of stone", "To be stoned"],
        correct: 1,
        explanation: "English 'petrified' literally means 'turned to stone' (from Latin petra), sharing the exact same metaphor as the Spanish idiom for being frozen with shock."
      }
    ]
  },
  {
    id: "idiom-21",
    spanish: "Llover sobre mojado",
    literal: "To rain on what's already wet",
    meaning: "To add problems to an already bad situation; when it rains, it pours.",
    example: "Primero perdió el trabajo y ahora se le rompió el coche. Llueve sobre mojado.",
    exampleEn: "First he lost his job and now his car broke down. When it rains, it pours.",
    category: "weather",
    level: "B2",
    quiz: [
      {
        prompt: "¿Qué significa 'llover sobre mojado'?",
        options: ["Que llueve mucho", "Que los problemas se acumulan sobre una situación ya mala", "Que el clima está mejorando", "Que hay inundaciones"],
        correct: 1,
        explanation: "Rain falling on already-wet ground makes the flooding worse — the idiom captures how new problems hitting an already bad situation make everything more overwhelming."
      },
      {
        prompt: "¿Cuál es el equivalente más cercano en inglés?",
        options: ["It never rains but it pours", "Every cloud has a silver lining", "Raining cats and dogs", "Under the weather"],
        correct: 0,
        explanation: "'It never rains but it pours' expresses the same idea: misfortunes tend to come in clusters, and when things go wrong, they tend to go very wrong all at once."
      },
      {
        prompt: "¿En qué situación se diría 'llueve sobre mojado'?",
        options: ["Cuando todo va bien", "Cuando una mala racha empeora aún más", "Cuando empieza a llover", "Cuando alguien está triste sin razón"],
        correct: 1,
        explanation: "The expression is used when someone already dealing with difficulties gets hit by yet another problem — the accumulation of misfortunes on top of an existing bad situation."
      }
    ]
  },
  {
    id: "idiom-22",
    spanish: "Ser un gallina",
    literal: "To be a hen",
    meaning: "To be a coward.",
    example: "No seas gallina y tírate del trampolín.",
    exampleEn: "Don't be a chicken and jump off the diving board.",
    category: "animals",
    level: "A2",
    quiz: [
      {
        prompt: "¿Qué significa 'ser un gallina'?",
        options: ["Ser madrugador", "Ser cobarde", "Ser muy ruidoso", "Ser trabajador"],
        correct: 1,
        explanation: "Hens are associated with timid, flighty behavior — they scatter at the slightest perceived threat, making them a cross-cultural symbol of cowardice in both Spanish and English."
      },
      {
        prompt: "¿Por qué se usa 'un gallina' con artículo masculino si 'gallina' es femenino?",
        options: ["Es un error gramatical", "Porque al usarse como insulto para una persona, el artículo concuerda con el género de la persona", "Porque gallina es palabra masculina", "No se usa con artículo masculino"],
        correct: 1,
        explanation: "When 'gallina' is used as a noun describing a person (not the animal), the article matches the person's gender — 'un gallina' for a man, 'una gallina' for a woman. This is a common pattern with animal-based insults in Spanish."
      },
      {
        prompt: "¿Cuál es el equivalente directo en inglés?",
        options: ["To be a chicken", "To be a scaredy-cat", "To be a sitting duck", "To be an early bird"],
        correct: 0,
        explanation: "English 'chicken' as slang for coward uses the same bird family metaphor — both cultures associate the timid, easily startled behavior of poultry with cowardice."
      }
    ]
  },
  {
    id: "idiom-23",
    spanish: "Dormir a pierna suelta",
    literal: "To sleep with loose leg",
    meaning: "To sleep very deeply and soundly.",
    example: "Después del viaje tan largo, dormí a pierna suelta toda la noche.",
    exampleEn: "After such a long trip, I slept like a log all night.",
    category: "body",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'dormir a pierna suelta'?",
        options: ["Dormir con las piernas estiradas", "Dormir muy profundamente", "No poder dormir", "Dormir poco tiempo"],
        correct: 1,
        explanation: "The 'loose leg' imagery suggests complete relaxation — when you sleep so deeply that your limbs go completely limp and relaxed, without any tension or restlessness."
      },
      {
        prompt: "¿De dónde viene posiblemente esta expresión?",
        options: ["De los prisioneros que dormían con grilletes, y cuando se los quitaban dormían mejor", "De los bailarines", "De los deportistas", "De los médicos"],
        correct: 0,
        explanation: "One theory traces the idiom to prisoners who slept with shackles on their legs — on the rare occasions the chains were removed ('pierna suelta'), they could finally sleep deeply and comfortably."
      },
      {
        prompt: "¿Cuál es el equivalente en inglés?",
        options: ["To sleep on it", "To sleep like a log", "To lose sleep", "To sleep with one eye open"],
        correct: 1,
        explanation: "English uses 'sleep like a log' (motionless and heavy like a piece of wood) to convey the same idea of deep, undisturbed sleep that 'dormir a pierna suelta' expresses."
      }
    ]
  },
  {
    id: "idiom-24",
    spanish: "Importar un pepino",
    literal: "To matter a cucumber",
    meaning: "To not care at all about something.",
    example: "Lo que piensen los demás me importa un pepino.",
    exampleEn: "I couldn't care less about what others think.",
    category: "food",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'importar un pepino'?",
        options: ["Que algo es muy importante", "Que algo no importa nada", "Que algo es saludable", "Que algo es delicioso"],
        correct: 1,
        explanation: "In Spanish, small or cheap items are used to represent worthlessness — a cucumber (pepino) represents something of so little value that the speaker is saying the matter is completely insignificant to them."
      },
      {
        prompt: "¿Qué otros alimentos se usan en expresiones similares en español?",
        options: ["Un pimiento, un bledo, un rábano", "Una manzana, un plátano, una naranja", "Un filete, un jamón, un queso", "Un chocolate, un café, un té"],
        correct: 0,
        explanation: "Spanish has many parallel expressions using cheap vegetables: 'importar un pimiento' (a pepper), 'importar un bledo' (an amaranth), 'importar un rábano' (a radish) — all humble foods representing worthlessness."
      },
      {
        prompt: "Si algo 'te importa un pepino', ¿cómo te sientes al respecto?",
        options: ["Muy preocupado", "Completamente indiferente", "Muy emocionado", "Bastante interesado"],
        correct: 1,
        explanation: "Total indifference — the expression is emphatic, meaning you have absolutely zero interest in or concern about the matter being discussed."
      }
    ]
  },
  {
    id: "idiom-25",
    spanish: "Verlo todo negro",
    literal: "To see everything black",
    meaning: "To be pessimistic; to see everything in a negative way.",
    example: "Desde que perdió su trabajo, lo ve todo negro.",
    exampleEn: "Since he lost his job, he sees everything in a negative light.",
    category: "emotions",
    level: "B1",
    quiz: [
      {
        prompt: "¿Qué significa 'verlo todo negro'?",
        options: ["No poder ver bien", "Ser pesimista", "Preferir el color negro", "Estar ciego"],
        correct: 1,
        explanation: "Black is culturally associated with darkness, gloom, and negativity — seeing everything as black means perceiving only the worst possible outcomes, unable to find any hope or positivity."
      },
      {
        prompt: "¿Cuál es un equivalente en inglés?",
        options: ["To see through rose-colored glasses", "To see the glass as half empty", "To have a black eye", "To be in the dark"],
        correct: 1,
        explanation: "'Seeing the glass as half empty' captures the same pessimistic worldview — focusing on what's lacking rather than what's present, always expecting the worst outcome."
      },
      {
        prompt: "¿Qué estado emocional describe 'verlo todo negro'?",
        options: ["Optimismo", "Pesimismo y desesperanza", "Enojo", "Confusión"],
        correct: 1,
        explanation: "The idiom describes a persistent state of pessimism and hopelessness — the person's negative emotional state colors their entire perception of reality, making everything seem bleak."
      }
    ]
  }
];
