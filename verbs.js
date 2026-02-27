// =============================================================================
// verbs.js - Spanish Verb Database
// =============================================================================
// Contains 200+ verbs organized by type:
//   - 100 regular verbs (from verbos regulares.csv)
//   - 20  irregular verbs
//   - 22  stem-changing verbs
//   - 11  reflexive verbs (some also stem-changing)
//   - 25  C1 verbs (advanced)
//   - 15  C2 verbs (mastery)
//
// Fields:
//   infinitive  - Spanish infinitive form
//   english     - English translation(s)
//   type        - 'regular' | 'irregular' | 'stem-changing' | 'reflexive'
//   group       - 'ar' | 'er' | 'ir'
//   stemChange  - null | 'e>ie' | 'o>ue' | 'e>i' | 'u>ue'
//   level       - CEFR level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
//   frequency   - Frequency rank (lower = more common)
// =============================================================================

const VERB_DATA = [

  // ---------------------------------------------------------------------------
  // IRREGULAR VERBS (20)
  // ---------------------------------------------------------------------------
  { infinitive: 'ser', english: 'to be (inherent)', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 1 },
  { infinitive: 'estar', english: 'to be (condition/location)', type: 'irregular', group: 'ar', stemChange: null, level: 'A1', frequency: 2 },
  { infinitive: 'ir', english: 'to go', type: 'irregular', group: 'ir', stemChange: null, level: 'A1', frequency: 3 },
  { infinitive: 'haber', english: 'to have (auxiliary)', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 4 },
  { infinitive: 'tener', english: 'to have, possess', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 5 },
  { infinitive: 'hacer', english: 'to do, make', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 6 },
  { infinitive: 'poder', english: 'to be able to, can', type: 'irregular', group: 'er', stemChange: 'o>ue', level: 'A1', frequency: 7 },
  { infinitive: 'decir', english: 'to say, tell', type: 'irregular', group: 'ir', stemChange: 'e>i', level: 'A1', frequency: 8 },
  { infinitive: 'querer', english: 'to want, love', type: 'irregular', group: 'er', stemChange: 'e>ie', level: 'A1', frequency: 9 },
  { infinitive: 'venir', english: 'to come', type: 'irregular', group: 'ir', stemChange: 'e>ie', level: 'A1', frequency: 10 },
  { infinitive: 'dar', english: 'to give', type: 'irregular', group: 'ar', stemChange: null, level: 'A1', frequency: 11 },
  { infinitive: 'ver', english: 'to see', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 12 },
  { infinitive: 'saber', english: 'to know (facts)', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 13 },
  { infinitive: 'poner', english: 'to put, place, set', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 14 },
  { infinitive: 'salir', english: 'to leave, go out', type: 'irregular', group: 'ir', stemChange: null, level: 'A1', frequency: 16 },
  { infinitive: 'traer', english: 'to bring, carry', type: 'irregular', group: 'er', stemChange: null, level: 'A2', frequency: 30 },
  { infinitive: 'caer', english: 'to fall', type: 'irregular', group: 'er', stemChange: null, level: 'A2', frequency: 35 },
  { infinitive: 'oír', english: 'to hear', type: 'irregular', group: 'ir', stemChange: null, level: 'A2', frequency: 28 },
  { infinitive: 'conocer', english: 'to know (people/places), be familiar with', type: 'irregular', group: 'er', stemChange: null, level: 'A1', frequency: 17 },
  { infinitive: 'conducir', english: 'to drive, conduct', type: 'irregular', group: 'ir', stemChange: null, level: 'B1', frequency: 55 },

  // ---------------------------------------------------------------------------
  // STEM-CHANGING VERBS (22)
  // ---------------------------------------------------------------------------
  // e > ie
  { infinitive: 'pensar', english: 'to think', type: 'stem-changing', group: 'ar', stemChange: 'e>ie', level: 'A2', frequency: 18 },
  { infinitive: 'entender', english: 'to understand', type: 'stem-changing', group: 'er', stemChange: 'e>ie', level: 'A2', frequency: 22 },
  { infinitive: 'perder', english: 'to lose', type: 'stem-changing', group: 'er', stemChange: 'e>ie', level: 'A2', frequency: 25 },
  { infinitive: 'cerrar', english: 'to close, shut', type: 'stem-changing', group: 'ar', stemChange: 'e>ie', level: 'A1', frequency: 33 },
  { infinitive: 'empezar', english: 'to begin, start', type: 'stem-changing', group: 'ar', stemChange: 'e>ie', level: 'A1', frequency: 19 },
  { infinitive: 'preferir', english: 'to prefer', type: 'stem-changing', group: 'ir', stemChange: 'e>ie', level: 'A2', frequency: 40 },
  { infinitive: 'sentir', english: 'to feel, regret', type: 'stem-changing', group: 'ir', stemChange: 'e>ie', level: 'A2', frequency: 26 },
  { infinitive: 'mentir', english: 'to lie (tell a lie)', type: 'stem-changing', group: 'ir', stemChange: 'e>ie', level: 'B1', frequency: 65 },

  // o > ue
  { infinitive: 'dormir', english: 'to sleep', type: 'stem-changing', group: 'ir', stemChange: 'o>ue', level: 'A1', frequency: 31 },
  { infinitive: 'morir', english: 'to die', type: 'stem-changing', group: 'ir', stemChange: 'o>ue', level: 'A2', frequency: 36 },
  { infinitive: 'volver', english: 'to return, come back', type: 'stem-changing', group: 'er', stemChange: 'o>ue', level: 'A2', frequency: 20 },
  { infinitive: 'contar', english: 'to count, tell (a story)', type: 'stem-changing', group: 'ar', stemChange: 'o>ue', level: 'A2', frequency: 27 },
  { infinitive: 'encontrar', english: 'to find, encounter', type: 'stem-changing', group: 'ar', stemChange: 'o>ue', level: 'A2', frequency: 21 },
  { infinitive: 'recordar', english: 'to remember, remind', type: 'stem-changing', group: 'ar', stemChange: 'o>ue', level: 'A2', frequency: 29 },

  // u > ue
  { infinitive: 'jugar', english: 'to play (a game/sport)', type: 'stem-changing', group: 'ar', stemChange: 'u>ue', level: 'A1', frequency: 32 },

  // e > i
  { infinitive: 'pedir', english: 'to ask for, request, order', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'A2', frequency: 23 },
  { infinitive: 'seguir', english: 'to follow, continue', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'A2', frequency: 24 },
  { infinitive: 'repetir', english: 'to repeat', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'A2', frequency: 42 },
  { infinitive: 'servir', english: 'to serve', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'A2', frequency: 38 },
  { infinitive: 'vestir', english: 'to dress, wear', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'A2', frequency: 45 },
  { infinitive: 'conseguir', english: 'to get, obtain, achieve', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'B1', frequency: 39 },
  { infinitive: 'elegir', english: 'to choose, select', type: 'stem-changing', group: 'ir', stemChange: 'e>i', level: 'B1', frequency: 52 },

  // ---------------------------------------------------------------------------
  // REFLEXIVE VERBS (11)
  // ---------------------------------------------------------------------------
  { infinitive: 'levantarse', english: 'to get up, stand up', type: 'reflexive', group: 'ar', stemChange: null, level: 'A1', frequency: 34 },
  { infinitive: 'acostarse', english: 'to go to bed, lie down', type: 'reflexive', group: 'ar', stemChange: 'o>ue', level: 'A2', frequency: 44 },
  { infinitive: 'vestirse', english: 'to get dressed', type: 'reflexive', group: 'ir', stemChange: 'e>i', level: 'A2', frequency: 46 },
  { infinitive: 'sentarse', english: 'to sit down', type: 'reflexive', group: 'ar', stemChange: 'e>ie', level: 'A1', frequency: 37 },
  { infinitive: 'llamarse', english: 'to be called, call oneself', type: 'reflexive', group: 'ar', stemChange: null, level: 'A1', frequency: 15 },
  { infinitive: 'ducharse', english: 'to take a shower', type: 'reflexive', group: 'ar', stemChange: null, level: 'A1', frequency: 47 },
  { infinitive: 'despertarse', english: 'to wake up', type: 'reflexive', group: 'ar', stemChange: 'e>ie', level: 'A2', frequency: 43 },
  { infinitive: 'dormirse', english: 'to fall asleep', type: 'reflexive', group: 'ir', stemChange: 'o>ue', level: 'A2', frequency: 48 },
  { infinitive: 'irse', english: 'to leave, go away', type: 'reflexive', group: 'ir', stemChange: null, level: 'A2', frequency: 41 },
  { infinitive: 'quedarse', english: 'to stay, remain', type: 'reflexive', group: 'ar', stemChange: null, level: 'A2', frequency: 49 },
  { infinitive: 'sentirse', english: 'to feel (emotion/health)', type: 'reflexive', group: 'ir', stemChange: 'e>ie', level: 'A2', frequency: 50 },

  // ---------------------------------------------------------------------------
  // REGULAR VERBS (100) - from verbos regulares.csv
  // ---------------------------------------------------------------------------
  // -AR verbs (regular)
  { infinitive: 'pasar', english: 'to pass, to spend (time), to happen', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 51 },
  { infinitive: 'quedar', english: 'to stay, remain', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 53 },
  { infinitive: 'hablar', english: 'to speak', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 54 },
  { infinitive: 'llevar', english: 'to carry, bring', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 56 },
  { infinitive: 'dejar', english: 'to leave, abandon, to let, allow', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 57 },
  { infinitive: 'llamar', english: 'to call, to name', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 58 },
  { infinitive: 'tomar', english: 'to take, drink', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 59 },
  { infinitive: 'tratar', english: 'to treat, handle', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 60 },
  { infinitive: 'mirar', english: 'to watch, look at', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 61 },
  { infinitive: 'esperar', english: 'to wait for, to hope', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 62 },
  { infinitive: 'entrar', english: 'to enter, go in, come in', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 63 },
  { infinitive: 'trabajar', english: 'to work', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 64 },
  { infinitive: 'necesitar', english: 'to need, require', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 66 },
  { infinitive: 'resultar', english: 'to turn out (to be)', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 67 },
  { infinitive: 'cambiar', english: 'to change', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 68 },
  { infinitive: 'presentar', english: 'to introduce', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 69 },
  { infinitive: 'crear', english: 'to create, to make', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 70 },
  { infinitive: 'considerar', english: 'to consider', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 71 },
  { infinitive: 'acabar', english: 'to finish, end', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 72 },
  { infinitive: 'ganar', english: 'to win, gain, earn, get, acquire', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 73 },
  { infinitive: 'formar', english: 'to form, shape, fashion, make', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 74 },
  { infinitive: 'aceptar', english: 'to accept, approve, to agree to', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 75 },
  { infinitive: 'lograr', english: 'to get, obtain, to achieve, attain', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 76 },
  { infinitive: 'preguntar', english: 'to ask, inquire', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 77 },
  { infinitive: 'estudiar', english: 'to study', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 78 },
  { infinitive: 'ayudar', english: 'to help', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 79 },
  { infinitive: 'gustar', english: 'to please, be pleasing', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 80 },
  { infinitive: 'escuchar', english: 'to listen, hear', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 81 },
  { infinitive: 'cumplir', english: 'to fulfil, carry out', type: 'regular', group: 'ir', stemChange: null, level: 'B1', frequency: 82 },
  { infinitive: 'levantar', english: 'to raise, to lift', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 83 },
  { infinitive: 'intentar', english: 'to try, attempt', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 84 },
  { infinitive: 'usar', english: 'to use', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 85 },
  { infinitive: 'olvidar', english: 'to forget', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 86 },
  { infinitive: 'ocupar', english: 'to occupy', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 87 },
  { infinitive: 'fijar', english: 'to fix, fasten, secure', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 88 },
  { infinitive: 'comprar', english: 'to buy, purchase', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 89 },
  { infinitive: 'evitar', english: 'to avoid, to prevent', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 90 },
  { infinitive: 'interesar', english: 'to interest, be of interest (to)', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 91 },
  { infinitive: 'echar', english: 'to throw, cast, fling', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 92 },
  { infinitive: 'importar', english: 'to import, to be important', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 93 },
  { infinitive: 'observar', english: 'to observe', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 94 },
  { infinitive: 'imaginar', english: 'to imagine', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 95 },
  { infinitive: 'desarrollar', english: 'to develop, expand, to unroll, unwind, to unfold', type: 'regular', group: 'ar', stemChange: null, level: 'B2', frequency: 96 },
  { infinitive: 'señalar', english: 'to point out, indicate, to signal', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 97 },
  { infinitive: 'preparar', english: 'to prepare, get (something) ready', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 98 },
  { infinitive: 'faltar', english: 'to lack, be lacking, be missing', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 99 },
  { infinitive: 'acompañar', english: 'to accompany', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 100 },
  { infinitive: 'desear', english: 'to desire, want, wish', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 101 },
  { infinitive: 'enseñar', english: 'to teach, instruct, train, educate', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 102 },
  { infinitive: 'representar', english: 'to represent', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 103 },
  { infinitive: 'mandar', english: 'to order (give an order), to send', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 104 },
  { infinitive: 'asegurar', english: 'to assure, secure, insure', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 105 },
  { infinitive: 'matar', english: 'to kill, slaughter', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 106 },
  { infinitive: 'guardar', english: 'to guard, protect, to keep', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 107 },
  { infinitive: 'iniciar', english: 'to initiate, begin, start', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 108 },
  { infinitive: 'bajar', english: 'to lower, go down, descend, download', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 109 },
  { infinitive: 'notar', english: 'to note, notice, observe', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 110 },
  { infinitive: 'pretender', english: 'to attempt', type: 'regular', group: 'er', stemChange: null, level: 'B2', frequency: 111 },
  { infinitive: 'cortar', english: 'to cut', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 112 },
  { infinitive: 'aprovechar', english: 'to take advantage of', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 113 },
  { infinitive: 'apoyar', english: 'to support, hold up, to back', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 114 },
  { infinitive: 'aumentar', english: 'to increase, add to, rise', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 115 },
  { infinitive: 'abandonar', english: 'to abandon, leave behind, desert, to quit, give up', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 116 },
  { infinitive: 'quitar', english: 'to remove, take away', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 117 },
  { infinitive: 'conservar', english: 'to preserve, conserve, to keep, retain', type: 'regular', group: 'ar', stemChange: null, level: 'B2', frequency: 118 },
  { infinitive: 'anunciar', english: 'to announce', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 119 },
  { infinitive: 'comentar', english: 'to comment on', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 120 },
  { infinitive: 'participar', english: 'to participate, to share in, to inform', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 121 },
  { infinitive: 'escapar', english: 'to escape', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 122 },
  { infinitive: 'tirar', english: 'to throw, to shoot, to throw away, to pull', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 123 },
  { infinitive: 'contestar', english: 'to answer', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 124 },
  { infinitive: 'preocupar', english: 'to worry', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 125 },
  { infinitive: 'prestar', english: 'to lend', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 126 },
  { infinitive: 'pesar', english: 'to weigh, to weigh down', type: 'regular', group: 'ar', stemChange: null, level: 'B1', frequency: 127 },
  { infinitive: 'viajar', english: 'to travel, journey', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 128 },

  // -ER verbs (regular)
  { infinitive: 'deber', english: 'to owe, must, should, ought to', type: 'regular', group: 'er', stemChange: null, level: 'A1', frequency: 129 },
  { infinitive: 'comer', english: 'to eat', type: 'regular', group: 'er', stemChange: null, level: 'A1', frequency: 130 },
  { infinitive: 'correr', english: 'to run', type: 'regular', group: 'er', stemChange: null, level: 'A1', frequency: 131 },
  { infinitive: 'comprender', english: 'to understand, comprehend', type: 'regular', group: 'er', stemChange: null, level: 'A2', frequency: 132 },
  { infinitive: 'responder', english: 'to respond, answer, reply to', type: 'regular', group: 'er', stemChange: null, level: 'A2', frequency: 133 },
  { infinitive: 'meter', english: 'to put (in), place, insert', type: 'regular', group: 'er', stemChange: null, level: 'B1', frequency: 134 },
  { infinitive: 'corresponder', english: 'to correspond with', type: 'regular', group: 'er', stemChange: null, level: 'B2', frequency: 135 },
  { infinitive: 'depender', english: 'to depend', type: 'regular', group: 'er', stemChange: null, level: 'B1', frequency: 136 },
  { infinitive: 'vender', english: 'to sell', type: 'regular', group: 'er', stemChange: null, level: 'A2', frequency: 137 },
  { infinitive: 'aprender', english: 'to learn', type: 'regular', group: 'er', stemChange: null, level: 'A1', frequency: 138 },

  // -IR verbs (regular)
  { infinitive: 'vivir', english: 'to live', type: 'regular', group: 'ir', stemChange: null, level: 'A1', frequency: 139 },
  { infinitive: 'existir', english: 'to exist', type: 'regular', group: 'ir', stemChange: null, level: 'B1', frequency: 140 },
  { infinitive: 'ocurrir', english: 'to occur, happen', type: 'regular', group: 'ir', stemChange: null, level: 'A2', frequency: 141 },
  { infinitive: 'recibir', english: 'to receive, to welcome, greet', type: 'regular', group: 'ir', stemChange: null, level: 'A2', frequency: 142 },
  { infinitive: 'terminar', english: 'to finish, end', type: 'regular', group: 'ar', stemChange: null, level: 'A1', frequency: 143 },
  { infinitive: 'permitir', english: 'to permit, allow', type: 'regular', group: 'ir', stemChange: null, level: 'A2', frequency: 144 },
  { infinitive: 'partir', english: 'to divide, to leave', type: 'regular', group: 'ir', stemChange: null, level: 'B1', frequency: 145 },
  { infinitive: 'decidir', english: 'to decide, settle, resolve', type: 'regular', group: 'ir', stemChange: null, level: 'A2', frequency: 146 },
  { infinitive: 'suceder', english: 'to happen, to succeed, follow', type: 'regular', group: 'er', stemChange: null, level: 'B1', frequency: 147 },
  { infinitive: 'subir', english: 'to go up, rise, move up, climb, raise up', type: 'regular', group: 'ir', stemChange: null, level: 'A2', frequency: 148 },
  { infinitive: 'sufrir', english: 'to suffer, to undergo, experience', type: 'regular', group: 'ir', stemChange: null, level: 'B1', frequency: 149 },
  { infinitive: 'compartir', english: 'to share, to divide (up)', type: 'regular', group: 'ir', stemChange: null, level: 'A2', frequency: 150 },
  { infinitive: 'consistir', english: 'to consist', type: 'regular', group: 'ir', stemChange: null, level: 'B2', frequency: 151 },
  { infinitive: 'funcionar', english: 'to function, to run', type: 'regular', group: 'ar', stemChange: null, level: 'A2', frequency: 152 },
  { infinitive: 'insistir', english: 'to insist', type: 'regular', group: 'ir', stemChange: null, level: 'B1', frequency: 153 },

  // ---------------------------------------------------------------------------
  // C1 VERBS — Advanced (25)
  // ---------------------------------------------------------------------------
  { infinitive: 'abarcar', english: 'to encompass, to cover', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 170 },
  { infinitive: 'abordar', english: 'to address, tackle', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 171 },
  { infinitive: 'acudir', english: 'to attend, go to', type: 'regular', group: 'ir', stemChange: null, level: 'C1', frequency: 172 },
  { infinitive: 'agotar', english: 'to exhaust, deplete', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 173 },
  { infinitive: 'alcanzar', english: 'to reach, achieve', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 174 },
  { infinitive: 'aportar', english: 'to contribute', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 175 },
  { infinitive: 'carecer', english: 'to lack', type: 'regular', group: 'er', stemChange: null, level: 'C1', frequency: 176 },
  { infinitive: 'conllevar', english: 'to entail', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 177 },
  { infinitive: 'desempeñar', english: 'to perform, carry out', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 178 },
  { infinitive: 'destacar', english: 'to stand out, highlight', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 179 },
  { infinitive: 'disponer', english: 'to arrange, have available', type: 'irregular', group: 'er', stemChange: null, level: 'C1', frequency: 180 },
  { infinitive: 'ejercer', english: 'to practice, exercise (a profession)', type: 'regular', group: 'er', stemChange: null, level: 'C1', frequency: 181 },
  { infinitive: 'emprender', english: 'to undertake', type: 'regular', group: 'er', stemChange: null, level: 'C1', frequency: 182 },
  { infinitive: 'enfrentar', english: 'to face, confront', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 183 },
  { infinitive: 'fomentar', english: 'to promote, foster', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 184 },
  { infinitive: 'generar', english: 'to generate', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 185 },
  { infinitive: 'impulsar', english: 'to drive, boost', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 186 },
  { infinitive: 'otorgar', english: 'to grant, award', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 187 },
  { infinitive: 'percibir', english: 'to perceive', type: 'regular', group: 'ir', stemChange: null, level: 'C1', frequency: 188 },
  { infinitive: 'plantear', english: 'to raise, propose', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 189 },
  { infinitive: 'prevenir', english: 'to prevent', type: 'irregular', group: 'ir', stemChange: null, level: 'C1', frequency: 190 },
  { infinitive: 'promover', english: 'to promote', type: 'stem-changing', group: 'er', stemChange: 'o>ue', level: 'C1', frequency: 191 },
  { infinitive: 'proporcionar', english: 'to provide', type: 'regular', group: 'ar', stemChange: null, level: 'C1', frequency: 192 },
  { infinitive: 'surgir', english: 'to arise, emerge', type: 'regular', group: 'ir', stemChange: null, level: 'C1', frequency: 193 },
  { infinitive: 'suponer', english: 'to suppose, assume', type: 'irregular', group: 'er', stemChange: null, level: 'C1', frequency: 194 },

  // ---------------------------------------------------------------------------
  // C2 VERBS — Mastery (15)
  // ---------------------------------------------------------------------------
  { infinitive: 'acaecer', english: 'to occur, happen (literary)', type: 'regular', group: 'er', stemChange: null, level: 'C2', frequency: 200 },
  { infinitive: 'atañer', english: 'to concern, pertain to', type: 'regular', group: 'er', stemChange: null, level: 'C2', frequency: 201 },
  { infinitive: 'cernirse', english: 'to loom, hover', type: 'stem-changing', group: 'ir', stemChange: 'e>ie', level: 'C2', frequency: 202 },
  { infinitive: 'deparar', english: 'to provide, hold in store', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 203 },
  { infinitive: 'desdeñar', english: 'to scorn, disdain', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 204 },
  { infinitive: 'dilucidar', english: 'to elucidate', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 205 },
  { infinitive: 'esgrimir', english: 'to wield, brandish', type: 'regular', group: 'ir', stemChange: null, level: 'C2', frequency: 206 },
  { infinitive: 'menoscabar', english: 'to diminish, undermine', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 207 },
  { infinitive: 'ostentar', english: 'to hold, display', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 208 },
  { infinitive: 'prorrumpir', english: 'to burst out', type: 'regular', group: 'ir', stemChange: null, level: 'C2', frequency: 209 },
  { infinitive: 'soslayar', english: 'to avoid, sidestep', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 210 },
  { infinitive: 'subyacer', english: 'to underlie', type: 'irregular', group: 'er', stemChange: null, level: 'C2', frequency: 211 },
  { infinitive: 'versar', english: 'to deal with, be about', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 212 },
  { infinitive: 'yacer', english: 'to lie, rest', type: 'irregular', group: 'er', stemChange: null, level: 'C2', frequency: 213 },
  { infinitive: 'zanjar', english: 'to settle, resolve', type: 'regular', group: 'ar', stemChange: null, level: 'C2', frequency: 214 },
];

// =============================================================================
// Utility: look up a verb by infinitive
// =============================================================================
function findVerb(infinitive) {
  return VERB_DATA.find(v => v.infinitive === infinitive) || null;
}

// =============================================================================
// Utility: filter verbs by type, group, level, etc.
// =============================================================================
function filterVerbs({ type, group, level, stemChange, maxFrequency } = {}) {
  return VERB_DATA.filter(v => {
    if (type && v.type !== type) return false;
    if (group && v.group !== group) return false;
    if (level && v.level !== level) return false;
    if (stemChange && v.stemChange !== stemChange) return false;
    if (maxFrequency && v.frequency > maxFrequency) return false;
    return true;
  });
}

// =============================================================================
// Utility: get verbs sorted by frequency (most common first)
// =============================================================================
function getVerbsByFrequency(limit) {
  const sorted = [...VERB_DATA].sort((a, b) => a.frequency - b.frequency);
  return limit ? sorted.slice(0, limit) : sorted;
}

// =============================================================================
// Utility: get the bare stem of a reflexive verb for conjugation
// =============================================================================
function getReflexiveStem(infinitive) {
  if (!infinitive.endsWith('se')) return null;
  return infinitive.slice(0, -2);
}

// =============================================================================
// Summary stats (for debugging / display)
// =============================================================================
const VERB_STATS = {
  total: VERB_DATA.length,
  regular: VERB_DATA.filter(v => v.type === 'regular').length,
  irregular: VERB_DATA.filter(v => v.type === 'irregular').length,
  stemChanging: VERB_DATA.filter(v => v.type === 'stem-changing').length,
  reflexive: VERB_DATA.filter(v => v.type === 'reflexive').length,
  byGroup: {
    ar: VERB_DATA.filter(v => v.group === 'ar').length,
    er: VERB_DATA.filter(v => v.group === 'er').length,
    ir: VERB_DATA.filter(v => v.group === 'ir').length,
  },
  byLevel: {
    A1: VERB_DATA.filter(v => v.level === 'A1').length,
    A2: VERB_DATA.filter(v => v.level === 'A2').length,
    B1: VERB_DATA.filter(v => v.level === 'B1').length,
    B2: VERB_DATA.filter(v => v.level === 'B2').length,
    C1: VERB_DATA.filter(v => v.level === 'C1').length,
    C2: VERB_DATA.filter(v => v.level === 'C2').length,
  },
};
