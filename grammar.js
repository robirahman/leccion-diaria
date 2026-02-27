const GRAMMAR_LEVELS = {
  A1: { name: 'Principiante', color: '#4CAF50' },
  A2: { name: 'Elemental', color: '#8BC34A' },
  B1: { name: 'Intermedio', color: '#FF9800' },
  B2: { name: 'Intermedio Alto', color: '#F44336' }
};

const GRAMMAR_DATA = [
  // ===== A1 =====
  {
    id: "gram-1", title: "El género de los sustantivos", titleEn: "Noun Gender", level: "A1", order: 1,
    content: `<h3>Masculine and Feminine Nouns</h3>
<p>In Spanish, every noun has a gender: <strong>masculino</strong> or <strong>femenino</strong>. There is no neuter gender.</p>
<p><strong>General rules:</strong></p>
<ul>
<li>Most nouns ending in <strong>-o</strong> are masculine: <em>el libro</em> (the book), <em>el gato</em> (the cat)</li>
<li>Most nouns ending in <strong>-a</strong> are feminine: <em>la mesa</em> (the table), <em>la casa</em> (the house)</li>
<li>Nouns ending in <strong>-ción, -sión, -dad, -tad</strong> are feminine: <em>la nación</em>, <em>la ciudad</em>, <em>la libertad</em></li>
<li>Nouns ending in <strong>-ma</strong> (Greek origin) are often masculine: <em>el problema</em>, <em>el tema</em>, <em>el sistema</em></li>
</ul>
<p><strong>Common exceptions:</strong> <em>la mano</em> (the hand) is feminine despite ending in -o. <em>El día</em> (the day) is masculine despite ending in -a.</p>`,
    quiz: [
      { type: "mc", question: "What gender is 'la mesa'?", answer: "Feminine", options: ["Masculine","Feminine","Neuter","Both"], explanation: "'Mesa' ends in -a and uses 'la', so it's feminine." },
      { type: "mc", question: "What gender is 'el problema'?", answer: "Masculine", options: ["Masculine","Feminine","Neuter","It depends"], explanation: "Despite ending in -a, 'problema' is masculine (Greek origin -ma words)." },
      { type: "mc", question: "Which ending typically indicates a feminine noun?", answer: "-ción", options: ["-or","-ción","-ma","-aje"], explanation: "Nouns ending in -ción are feminine: la nación, la educación." },
      { type: "fib", question: "Complete: ___ mano (the hand)", answer: "la", options: null, explanation: "'Mano' is feminine despite ending in -o: la mano." },
      { type: "mc", question: "Which is an exception to the -o = masculine rule?", answer: "la mano", options: ["el libro","la mano","el gato","el vaso"], explanation: "'La mano' is feminine despite ending in -o." }
    ]
  },
  {
    id: "gram-2", title: "Los artículos definidos", titleEn: "Definite Articles", level: "A1", order: 2,
    content: `<h3>The Definite Articles: el, la, los, las</h3>
<p>Spanish has four definite articles (equivalent to "the" in English):</p>
<table><tr><th></th><th>Singular</th><th>Plural</th></tr>
<tr><td><strong>Masculine</strong></td><td>el</td><td>los</td></tr>
<tr><td><strong>Feminine</strong></td><td>la</td><td>las</td></tr></table>
<p><strong>Examples:</strong> <em>el libro → los libros</em> (the book → the books), <em>la casa → las casas</em> (the house → the houses).</p>
<p>Spanish uses definite articles more than English: with general concepts (<em>Me gusta <strong>el</strong> chocolate</em>), days of the week (<em><strong>el</strong> lunes</em>), titles (<em><strong>el</strong> señor García</em>), and body parts (<em>Me duele <strong>la</strong> cabeza</em>).</p>`,
    quiz: [
      { type: "fib", question: "___ libros están en la mesa. (The books)", answer: "Los", options: null, explanation: "'Libros' is masculine plural, so we use 'los'." },
      { type: "mc", question: "Which article goes with 'chicas'?", answer: "las", options: ["el","la","los","las"], explanation: "'Chicas' is feminine plural → las chicas." },
      { type: "fib", question: "Me gusta ___ música. (I like music.)", answer: "la", options: null, explanation: "General concepts use the definite article: la música." },
      { type: "mc", question: "How do you say 'on Monday' in Spanish?", answer: "el lunes", options: ["en lunes","lunes","el lunes","un lunes"], explanation: "Days of the week use 'el': el lunes." },
      { type: "mc", question: "What is the plural of 'el perro'?", answer: "los perros", options: ["las perros","los perros","el perros","les perros"], explanation: "Masculine singular 'el' becomes 'los' in plural." }
    ]
  },
  {
    id: "gram-3", title: "Los artículos indefinidos", titleEn: "Indefinite Articles", level: "A1", order: 3,
    content: `<h3>Indefinite Articles: un, una, unos, unas</h3>
<table><tr><th></th><th>Singular</th><th>Plural</th></tr>
<tr><td><strong>Masculine</strong></td><td>un</td><td>unos</td></tr>
<tr><td><strong>Feminine</strong></td><td>una</td><td>unas</td></tr></table>
<p><strong>Examples:</strong> <em>un libro</em> (a book), <em>una casa</em> (a house), <em>unos amigos</em> (some friends), <em>unas flores</em> (some flowers).</p>
<p>Unlike English, Spanish omits the indefinite article with professions after ser: <em>Soy <strong>profesor</strong></em> (I am a teacher). But if modified: <em>Soy <strong>un buen</strong> profesor</em>.</p>`,
    quiz: [
      { type: "fib", question: "Necesito ___ libro. (I need a book.)", answer: "un", options: null, explanation: "'Libro' is masculine singular → un libro." },
      { type: "mc", question: "How do you say 'some flowers'?", answer: "unas flores", options: ["unos flores","unas flores","una flores","las flores"], explanation: "'Flores' is feminine plural → unas flores." },
      { type: "mc", question: "Which is correct: 'Soy profesor' or 'Soy un profesor'?", answer: "Soy profesor", options: ["Soy profesor","Soy un profesor","Soy el profesor","Both are always correct"], explanation: "With unmodified professions after ser, omit the article." },
      { type: "fib", question: "Hay ___ chicas en la clase. (There are some girls.)", answer: "unas", options: null, explanation: "'Chicas' is feminine plural → unas chicas." },
      { type: "mc", question: "What is the masculine plural indefinite article?", answer: "unos", options: ["un","unas","unos","los"], explanation: "Masculine plural indefinite = unos." }
    ]
  },
  {
    id: "gram-4", title: "Los pronombres personales", titleEn: "Subject Pronouns", level: "A1", order: 4,
    content: `<h3>Subject Pronouns</h3>
<table><tr><th>Person</th><th>Singular</th><th>Plural</th></tr>
<tr><td>1st</td><td><strong>yo</strong> (I)</td><td><strong>nosotros/as</strong> (we)</td></tr>
<tr><td>2nd informal</td><td><strong>tú</strong> (you)</td><td><strong>vosotros/as</strong> (you all, Spain)</td></tr>
<tr><td>2nd formal</td><td><strong>usted (Ud.)</strong></td><td><strong>ustedes (Uds.)</strong></td></tr>
<tr><td>3rd</td><td><strong>él/ella</strong> (he/she)</td><td><strong>ellos/ellas</strong> (they)</td></tr></table>
<p>In Latin America, <strong>ustedes</strong> is used for both formal and informal "you all" (vosotros is not used). Subject pronouns are often omitted because the verb ending indicates the subject: <em>Hablo español</em> = I speak Spanish.</p>`,
    quiz: [
      { type: "mc", question: "What is the formal 'you' in Spanish?", answer: "usted", options: ["tú","usted","vos","él"], explanation: "Usted is the formal second person pronoun." },
      { type: "mc", question: "In Latin America, 'you all' is:", answer: "ustedes", options: ["vosotros","ustedes","ellos","nosotros"], explanation: "Latin America uses 'ustedes' for all plural 'you' forms." },
      { type: "mc", question: "Why are subject pronouns often omitted in Spanish?", answer: "The verb ending shows the subject", options: ["It's rude to use them","They're optional in writing only","The verb ending shows the subject","Only in questions"], explanation: "Verb conjugations indicate the subject, so pronouns are often dropped." },
      { type: "fib", question: "___ somos estudiantes. (We are students.)", answer: "Nosotros", options: null, explanation: "First person plural = nosotros." },
      { type: "mc", question: "'Vosotros' is used primarily in:", answer: "Spain", options: ["Mexico","Argentina","Spain","Colombia"], explanation: "Vosotros is used in Spain; Latin America uses ustedes." }
    ]
  },
  {
    id: "gram-5", title: "El verbo ser", titleEn: "The Verb Ser (to be)", level: "A1", order: 5,
    content: `<h3>Ser — To Be (Identity, Origin, Characteristics)</h3>
<table><tr><th>Pronoun</th><th>Ser</th><th>Example</th></tr>
<tr><td>yo</td><td><strong>soy</strong></td><td>Soy mexicano. (I am Mexican.)</td></tr>
<tr><td>tú</td><td><strong>eres</strong></td><td>Eres inteligente. (You are smart.)</td></tr>
<tr><td>él/ella/Ud.</td><td><strong>es</strong></td><td>Ella es doctora. (She is a doctor.)</td></tr>
<tr><td>nosotros</td><td><strong>somos</strong></td><td>Somos amigos. (We are friends.)</td></tr>
<tr><td>ellos/Uds.</td><td><strong>son</strong></td><td>Son de España. (They are from Spain.)</td></tr></table>
<p>Use <strong>ser</strong> for: identity, origin, profession, nationality, physical descriptions, personality, time, dates, possession, and material.</p>
<p>Mnemonic: <strong>DOCTOR</strong> — Description, Occupation, Characteristic, Time, Origin, Relationship.</p>`,
    quiz: [
      { type: "fib", question: "Yo ___ estudiante. (I am a student.)", answer: "soy", options: null, explanation: "Yo + ser = soy." },
      { type: "mc", question: "'Ellos ___ de Argentina.' Fill in with ser.", answer: "son", options: ["es","somos","son","soy"], explanation: "Ellos + ser = son." },
      { type: "fib", question: "María ___ profesora. (María is a teacher.)", answer: "es", options: null, explanation: "Ella/María + ser = es." },
      { type: "mc", question: "Which use is correct for ser?", answer: "Nationality", options: ["Location","Mood","Nationality","Health"], explanation: "Ser is used for nationality: Soy español." },
      { type: "fib", question: "Nosotros ___ amigos. (We are friends.)", answer: "somos", options: null, explanation: "Nosotros + ser = somos." }
    ]
  },
  {
    id: "gram-6", title: "El verbo estar", titleEn: "The Verb Estar (to be)", level: "A1", order: 6,
    content: `<h3>Estar — To Be (State, Location, Condition)</h3>
<table><tr><th>Pronoun</th><th>Estar</th><th>Example</th></tr>
<tr><td>yo</td><td><strong>estoy</strong></td><td>Estoy cansado. (I am tired.)</td></tr>
<tr><td>tú</td><td><strong>estás</strong></td><td>¿Estás bien? (Are you okay?)</td></tr>
<tr><td>él/ella/Ud.</td><td><strong>está</strong></td><td>Está en casa. (He/she is at home.)</td></tr>
<tr><td>nosotros</td><td><strong>estamos</strong></td><td>Estamos contentos. (We are happy.)</td></tr>
<tr><td>ellos/Uds.</td><td><strong>están</strong></td><td>Están en Madrid. (They are in Madrid.)</td></tr></table>
<p>Use <strong>estar</strong> for: location, emotions, temporary states, conditions, progressive tenses (estar + gerund), and results of actions.</p>
<p>Mnemonic: <strong>PLACE</strong> — Position, Location, Action (progressive), Condition, Emotion.</p>`,
    quiz: [
      { type: "fib", question: "¿Dónde ___ el baño? (Where is the bathroom?)", answer: "está", options: null, explanation: "Location uses estar: ¿Dónde está?" },
      { type: "mc", question: "'Nosotros ___ cansados.' Fill in.", answer: "estamos", options: ["somos","estamos","están","estoy"], explanation: "Temporary state (tired) + nosotros = estamos." },
      { type: "fib", question: "Yo ___ feliz hoy. (I am happy today.)", answer: "estoy", options: null, explanation: "Temporary emotion uses estar: estoy feliz." },
      { type: "mc", question: "Which situation uses estar?", answer: "Telling where something is located", options: ["Telling time","Telling where something is located","Describing nationality","Stating profession"], explanation: "Estar is used for location." },
      { type: "fib", question: "Ellos ___ en la escuela. (They are at school.)", answer: "están", options: null, explanation: "Location + ellos = están." }
    ]
  },
  {
    id: "gram-7", title: "Ser vs. Estar", titleEn: "Ser vs. Estar", level: "A1", order: 7,
    content: `<h3>When to Use Ser vs. Estar</h3>
<p>Both mean "to be" but are used in very different contexts:</p>
<table><tr><th>Ser (permanent/inherent)</th><th>Estar (temporary/state)</th></tr>
<tr><td>Es alto. (He is tall.)</td><td>Está enfermo. (He is sick.)</td></tr>
<tr><td>Es inteligente. (She is smart.)</td><td>Está contenta. (She is happy.)</td></tr>
<tr><td>Son de México. (They're from Mexico.)</td><td>Están en México. (They're in Mexico.)</td></tr></table>
<p><strong>Meaning changes:</strong> Some adjectives change meaning with ser vs. estar:</p>
<ul>
<li><em>ser aburrido</em> = to be boring / <em>estar aburrido</em> = to be bored</li>
<li><em>ser listo</em> = to be clever / <em>estar listo</em> = to be ready</li>
<li><em>ser malo</em> = to be bad (person) / <em>estar malo</em> = to be sick</li>
</ul>`,
    quiz: [
      { type: "mc", question: "'La sopa ___ caliente.' (The soup is hot.)", answer: "está", options: ["es","está","son","están"], explanation: "Temperature is a temporary state → estar." },
      { type: "mc", question: "'Estar aburrido' means:", answer: "To be bored", options: ["To be boring","To be bored","To be tired","To be sad"], explanation: "Estar aburrido = bored (state). Ser aburrido = boring (characteristic)." },
      { type: "fib", question: "Mi hermana ___ alta. (My sister is tall.)", answer: "es", options: null, explanation: "Physical description (permanent trait) uses ser." },
      { type: "mc", question: "Origin uses which verb?", answer: "ser", options: ["ser","estar","both","neither"], explanation: "Origin always uses ser: Soy de Chile." },
      { type: "fib", question: "La puerta ___ abierta. (The door is open.)", answer: "está", options: null, explanation: "Result of an action (opened) uses estar." }
    ]
  },
  {
    id: "gram-8", title: "Presente: verbos regulares -ar", titleEn: "Present Tense: Regular -ar Verbs", level: "A1", order: 8,
    content: `<h3>Present Tense: -ar Verbs</h3>
<p>To conjugate regular -ar verbs, remove the -ar ending and add:</p>
<table><tr><th>Pronoun</th><th>Ending</th><th>hablar (to speak)</th></tr>
<tr><td>yo</td><td>-o</td><td>hablo</td></tr>
<tr><td>tú</td><td>-as</td><td>hablas</td></tr>
<tr><td>él/ella/Ud.</td><td>-a</td><td>habla</td></tr>
<tr><td>nosotros</td><td>-amos</td><td>hablamos</td></tr>
<tr><td>vosotros</td><td>-áis</td><td>habláis</td></tr>
<tr><td>ellos/Uds.</td><td>-an</td><td>hablan</td></tr></table>
<p>Common -ar verbs: <em>hablar</em> (speak), <em>estudiar</em> (study), <em>trabajar</em> (work), <em>caminar</em> (walk), <em>cocinar</em> (cook), <em>bailar</em> (dance), <em>comprar</em> (buy), <em>viajar</em> (travel).</p>`,
    quiz: [
      { type: "fib", question: "Yo _____ español. (hablar)", answer: "hablo", options: null, explanation: "Yo + hablar → hablo (-o ending)." },
      { type: "fib", question: "Ella _____ mucho. (estudiar)", answer: "estudia", options: null, explanation: "Ella + estudiar → estudia (-a ending)." },
      { type: "mc", question: "What is the 'nosotros' ending for -ar verbs?", answer: "-amos", options: ["-emos","-amos","-imos","-imos"], explanation: "Nosotros -ar ending is -amos." },
      { type: "fib", question: "Ellos _____ en la oficina. (trabajar)", answer: "trabajan", options: null, explanation: "Ellos + trabajar → trabajan (-an ending)." },
      { type: "mc", question: "Conjugate: tú + bailar", answer: "bailas", options: ["bailo","bailas","baila","bailan"], explanation: "Tú + -ar verb → -as ending: bailas." }
    ]
  },
  {
    id: "gram-9", title: "Presente: verbos regulares -er/-ir", titleEn: "Present Tense: Regular -er/-ir Verbs", level: "A1", order: 9,
    content: `<h3>Present Tense: -er and -ir Verbs</h3>
<table><tr><th>Pronoun</th><th>-er (comer)</th><th>-ir (vivir)</th></tr>
<tr><td>yo</td><td>como</td><td>vivo</td></tr>
<tr><td>tú</td><td>comes</td><td>vives</td></tr>
<tr><td>él/ella/Ud.</td><td>come</td><td>vive</td></tr>
<tr><td>nosotros</td><td>comemos</td><td>vivimos</td></tr>
<tr><td>vosotros</td><td>coméis</td><td>vivís</td></tr>
<tr><td>ellos/Uds.</td><td>comen</td><td>viven</td></tr></table>
<p>Notice: -er and -ir verbs share the same endings except for <strong>nosotros</strong> (-emos vs. -imos) and <strong>vosotros</strong> (-éis vs. -ís).</p>
<p>Common -er verbs: <em>comer</em> (eat), <em>beber</em> (drink), <em>leer</em> (read), <em>correr</em> (run), <em>aprender</em> (learn).</p>
<p>Common -ir verbs: <em>vivir</em> (live), <em>escribir</em> (write), <em>abrir</em> (open), <em>decidir</em> (decide), <em>recibir</em> (receive).</p>`,
    quiz: [
      { type: "fib", question: "Nosotros _____ en la cafetería. (comer)", answer: "comemos", options: null, explanation: "Nosotros + comer → comemos." },
      { type: "fib", question: "Tú _____ en Madrid. (vivir)", answer: "vives", options: null, explanation: "Tú + vivir → vives." },
      { type: "mc", question: "Where do -er and -ir endings differ?", answer: "nosotros and vosotros", options: ["yo and tú","él and ellos","nosotros and vosotros","All forms"], explanation: "They differ only in nosotros (-emos/-imos) and vosotros (-éis/-ís)." },
      { type: "fib", question: "Ella _____ muchos libros. (leer)", answer: "lee", options: null, explanation: "Ella + leer → lee." },
      { type: "mc", question: "Conjugate: ellos + escribir", answer: "escriben", options: ["escribo","escribes","escribe","escriben"], explanation: "Ellos + escribir → escriben." }
    ]
  },
  {
    id: "gram-10", title: "La concordancia de adjetivos", titleEn: "Adjective Agreement", level: "A1", order: 10,
    content: `<h3>Adjective Agreement</h3>
<p>In Spanish, adjectives must agree with the noun in <strong>gender</strong> and <strong>number</strong>:</p>
<table><tr><th></th><th>Masc. Sing.</th><th>Fem. Sing.</th><th>Masc. Pl.</th><th>Fem. Pl.</th></tr>
<tr><td>-o/-a</td><td>alto</td><td>alta</td><td>altos</td><td>altas</td></tr>
<tr><td>-e (no change)</td><td>grande</td><td>grande</td><td>grandes</td><td>grandes</td></tr>
<tr><td>consonant</td><td>difícil</td><td>difícil</td><td>difíciles</td><td>difíciles</td></tr></table>
<p>Adjectives usually go <strong>after</strong> the noun: <em>un libro <strong>interesante</strong></em>, <em>una casa <strong>grande</strong></em>. Some common adjectives go before: <em>bueno, malo, grande, pequeño, joven, viejo</em>.</p>
<p><strong>Note:</strong> bueno → buen, malo → mal, grande → gran (before singular nouns).</p>`,
    quiz: [
      { type: "fib", question: "Las chicas son _____ (alto)", answer: "altas", options: null, explanation: "Feminine plural: altas." },
      { type: "mc", question: "Where do most adjectives go in Spanish?", answer: "After the noun", options: ["Before the noun","After the noun","Either position","It varies by tense"], explanation: "Most adjectives follow the noun: un coche rojo." },
      { type: "fib", question: "Es un _____ día. (good)", answer: "buen", options: null, explanation: "Bueno shortens to 'buen' before a masculine singular noun." },
      { type: "mc", question: "'Una ciudad grande' — does 'grande' change for feminine?", answer: "No, -e adjectives don't change gender", options: ["Yes, it becomes 'granda'","No, -e adjectives don't change gender","Yes, it becomes 'grandes'","Only in plural"], explanation: "Adjectives ending in -e are the same for masculine and feminine." },
      { type: "fib", question: "Los exámenes son _____ (difícil)", answer: "difíciles", options: null, explanation: "Consonant-ending adjective + plural: add -es → difíciles." }
    ]
  },
  {
    id: "gram-11", title: "Los adjetivos posesivos", titleEn: "Possessive Adjectives", level: "A1", order: 11,
    content: `<h3>Possessive Adjectives</h3>
<table><tr><th>English</th><th>Before noun</th><th>Examples</th></tr>
<tr><td>my</td><td><strong>mi / mis</strong></td><td>mi libro, mis libros</td></tr>
<tr><td>your (tú)</td><td><strong>tu / tus</strong></td><td>tu casa, tus amigos</td></tr>
<tr><td>his/her/your (Ud.)</td><td><strong>su / sus</strong></td><td>su perro, sus perros</td></tr>
<tr><td>our</td><td><strong>nuestro/a/os/as</strong></td><td>nuestro coche, nuestra casa</td></tr>
<tr><td>your (vosotros)</td><td><strong>vuestro/a/os/as</strong></td><td>vuestro libro</td></tr>
<tr><td>their/your (Uds.)</td><td><strong>su / sus</strong></td><td>su casa, sus casas</td></tr></table>
<p>Note: <em>mi, tu, su</em> agree only in number (not gender). <em>Nuestro</em> and <em>vuestro</em> agree in both gender and number.</p>
<p>To clarify ambiguous <em>su</em>: <em>su libro</em> → <em>el libro <strong>de él / de ella / de usted</strong></em>.</p>`,
    quiz: [
      { type: "fib", question: "_____ hermanos son altos. (My)", answer: "Mis", options: null, explanation: "My + plural = mis." },
      { type: "mc", question: "How do you say 'our house'?", answer: "nuestra casa", options: ["nuestro casa","nuestra casa","nuestros casa","nuestras casa"], explanation: "'Casa' is feminine → nuestra casa." },
      { type: "fib", question: "¿Dónde está _____ coche? (your, informal)", answer: "tu", options: null, explanation: "Your (tú) + singular = tu." },
      { type: "mc", question: "'Su' can mean all EXCEPT:", answer: "my", options: ["his","her","your (formal)","my"], explanation: "'Su' means his/her/your(formal)/their, but NOT my." },
      { type: "fib", question: "_____ padres viven en Colombia. (Our)", answer: "Nuestros", options: null, explanation: "Our + masculine plural = nuestros." }
    ]
  },
  {
    id: "gram-12", title: "Las palabras interrogativas", titleEn: "Question Words", level: "A1", order: 12,
    content: `<h3>Question Words (Palabras Interrogativas)</h3>
<ul>
<li><strong>¿Qué?</strong> — What? <em>¿Qué quieres?</em> (What do you want?)</li>
<li><strong>¿Quién? / ¿Quiénes?</strong> — Who? <em>¿Quién es ella?</em></li>
<li><strong>¿Dónde?</strong> — Where? <em>¿Dónde vives?</em></li>
<li><strong>¿Cuándo?</strong> — When? <em>¿Cuándo es la fiesta?</em></li>
<li><strong>¿Por qué?</strong> — Why? <em>¿Por qué estudias español?</em></li>
<li><strong>¿Cómo?</strong> — How? <em>¿Cómo estás?</em></li>
<li><strong>¿Cuánto/a/os/as?</strong> — How much/many? <em>¿Cuántos años tienes?</em></li>
<li><strong>¿Cuál? / ¿Cuáles?</strong> — Which? <em>¿Cuál es tu nombre?</em></li>
</ul>
<p>All question words have <strong>accent marks</strong>. Spanish questions use inverted question marks: <strong>¿...?</strong></p>`,
    quiz: [
      { type: "mc", question: "How do you ask 'Where do you live?'", answer: "¿Dónde vives?", options: ["¿Qué vives?","¿Dónde vives?","¿Cuándo vives?","¿Cómo vives?"], explanation: "Where = ¿Dónde?" },
      { type: "fib", question: "¿_____ es tu nombre? (What)", answer: "Cuál", options: null, explanation: "For names, use ¿Cuál? (not ¿Qué?): ¿Cuál es tu nombre?" },
      { type: "mc", question: "¿_____ años tienes? (How many)", answer: "Cuántos", options: ["Cuándo","Cuántos","Cuáles","Cómo"], explanation: "How many = ¿Cuántos?" },
      { type: "fib", question: "¿_____ estudias español? (Why)", answer: "Por qué", options: null, explanation: "Why = ¿Por qué? (two words, with accent)." },
      { type: "mc", question: "What is special about Spanish questions?", answer: "They use inverted question marks ¿...?", options: ["They always use 'es que'","They use inverted question marks ¿...?","They must start with a verb","Subject always comes first"], explanation: "Spanish uses ¿ at the beginning and ? at the end of questions." }
    ]
  },
  // ===== A2 =====
  {
    id: "gram-13", title: "Verbos con cambio de raíz", titleEn: "Stem-Changing Verbs", level: "A2", order: 13,
    content: `<h3>Stem-Changing Verbs (Present Tense)</h3>
<p>Some verbs change their stem vowel in all forms except <strong>nosotros</strong> and <strong>vosotros</strong> (the "boot" pattern).</p>
<p><strong>e → ie:</strong> pensar (to think) → pienso, piensas, piensa, pensamos, pensáis, piensan</p>
<p><strong>o → ue:</strong> poder (to be able) → puedo, puedes, puede, podemos, podéis, pueden</p>
<p><strong>e → i:</strong> pedir (to ask for) → pido, pides, pide, pedimos, pedís, piden</p>
<p><strong>u → ue:</strong> jugar (to play) → juego, juegas, juega, jugamos, jugáis, juegan</p>
<p>Common stem-changers: <em>querer</em> (e→ie), <em>dormir</em> (o→ue), <em>servir</em> (e→i), <em>volver</em> (o→ue), <em>entender</em> (e→ie).</p>`,
    quiz: [
      { type: "fib", question: "Yo _____ ir al cine. (querer)", answer: "quiero", options: null, explanation: "Querer is e→ie: quiero." },
      { type: "mc", question: "Why don't nosotros forms stem-change?", answer: "The stem change only happens in stressed syllables", options: ["It's an exception","The stem change only happens in stressed syllables","Nosotros uses a different conjugation","It does change"], explanation: "The change occurs when the stem vowel is stressed (not in nosotros/vosotros)." },
      { type: "fib", question: "Ellos _____ bien. (dormir)", answer: "duermen", options: null, explanation: "Dormir is o→ue: duermen." },
      { type: "mc", question: "What type of stem change does 'pedir' have?", answer: "e → i", options: ["e → ie","o → ue","e → i","u → ue"], explanation: "Pedir changes e → i: pido, pides, pide..." },
      { type: "fib", question: "Nosotros _____ a las 8. (volver)", answer: "volvemos", options: null, explanation: "Nosotros doesn't stem-change: volvemos (not vuelvemos)." }
    ]
  },
  {
    id: "gram-14", title: "Los verbos reflexivos", titleEn: "Reflexive Verbs", level: "A2", order: 14,
    content: `<h3>Reflexive Verbs</h3>
<p>Reflexive verbs indicate the subject performs the action on itself. They use reflexive pronouns:</p>
<table><tr><th>Pronoun</th><th>Reflexive</th><th>levantarse (to get up)</th></tr>
<tr><td>yo</td><td>me</td><td>me levanto</td></tr>
<tr><td>tú</td><td>te</td><td>te levantas</td></tr>
<tr><td>él/ella/Ud.</td><td>se</td><td>se levanta</td></tr>
<tr><td>nosotros</td><td>nos</td><td>nos levantamos</td></tr>
<tr><td>ellos/Uds.</td><td>se</td><td>se levantan</td></tr></table>
<p>Common reflexive verbs: <em>despertarse</em> (wake up), <em>ducharse</em> (shower), <em>vestirse</em> (get dressed), <em>acostarse</em> (go to bed), <em>sentirse</em> (feel), <em>llamarse</em> (be called).</p>`,
    quiz: [
      { type: "fib", question: "Yo ___ llamo Ana. (llamarse)", answer: "me", options: null, explanation: "Yo → me: Me llamo Ana." },
      { type: "mc", question: "Which is correct for 'She showers'?", answer: "Se ducha", options: ["Ella ducha","Se ducha","Me ducha","Te ducha"], explanation: "Ella + reflexive = se ducha." },
      { type: "fib", question: "Nosotros ___ despertamos a las 7. (despertarse)", answer: "nos", options: null, explanation: "Nosotros → nos: Nos despertamos." },
      { type: "mc", question: "What makes a verb reflexive?", answer: "The subject acts on itself", options: ["It's irregular","The subject acts on itself","It's in past tense","It has two objects"], explanation: "Reflexive means the action reflects back on the subject." },
      { type: "fib", question: "Ellos ___ acuestan tarde. (acostarse)", answer: "se", options: null, explanation: "Ellos → se: Se acuestan." }
    ]
  },
  {
    id: "gram-15", title: "Gustar y verbos similares", titleEn: "Gustar and Similar Verbs", level: "A2", order: 15,
    content: `<h3>Gustar (to like) and Similar Verbs</h3>
<p>Gustar literally means "to please." The thing liked is the subject:</p>
<table><tr><th>English</th><th>Spanish</th><th>Literal</th></tr>
<tr><td>I like coffee</td><td><strong>Me gusta</strong> el café</td><td>Coffee pleases me</td></tr>
<tr><td>I like books</td><td><strong>Me gustan</strong> los libros</td><td>Books please me</td></tr></table>
<p>Indirect object pronouns: <em>me, te, le, nos, les</em>. Use <strong>gusta</strong> + singular/infinitive, <strong>gustan</strong> + plural.</p>
<p>Similar verbs: <em>encantar</em> (love), <em>interesar</em> (interest), <em>molestar</em> (bother), <em>importar</em> (matter), <em>faltar</em> (lack), <em>doler</em> (hurt).</p>`,
    quiz: [
      { type: "mc", question: "'I like dogs' in Spanish is:", answer: "Me gustan los perros", options: ["Me gusta los perros","Yo gusto los perros","Me gustan los perros","Yo gustan los perros"], explanation: "Plural noun → gustan: Me gustan los perros." },
      { type: "fib", question: "A ella ___ gusta bailar.", answer: "le", options: null, explanation: "A ella → le: Le gusta bailar." },
      { type: "mc", question: "Why do we say 'me gusta' not 'yo gusto'?", answer: "The thing liked is the grammatical subject", options: ["It's an irregular verb","The thing liked is the grammatical subject","'Yo' is never used with gustar","It's a reflexive verb"], explanation: "In gustar constructions, what you like is the subject that 'pleases' you." },
      { type: "fib", question: "Nos _____ las películas de terror. (encantar)", answer: "encantan", options: null, explanation: "Plural subject (películas) → encantan." },
      { type: "mc", question: "'Me gusta' vs 'me gustan' depends on:", answer: "Whether what you like is singular or plural", options: ["The person who likes","Whether what you like is singular or plural","The tense","Formal vs informal"], explanation: "Gusta for singular/infinitive, gustan for plural things." }
    ]
  },
  {
    id: "gram-16", title: "Pronombres de objeto directo", titleEn: "Direct Object Pronouns", level: "A2", order: 16,
    content: `<h3>Direct Object Pronouns</h3>
<table><tr><th>Person</th><th>Pronoun</th><th>Example</th></tr>
<tr><td>me</td><td><strong>me</strong></td><td>Ella me ve. (She sees me.)</td></tr>
<tr><td>you (tú)</td><td><strong>te</strong></td><td>Te llamo mañana. (I'll call you.)</td></tr>
<tr><td>him/it (masc.)</td><td><strong>lo</strong></td><td>Lo compro. (I buy it.)</td></tr>
<tr><td>her/it (fem.)</td><td><strong>la</strong></td><td>La veo. (I see her.)</td></tr>
<tr><td>us</td><td><strong>nos</strong></td><td>Nos invitan. (They invite us.)</td></tr>
<tr><td>them (masc.)</td><td><strong>los</strong></td><td>Los necesito. (I need them.)</td></tr>
<tr><td>them (fem.)</td><td><strong>las</strong></td><td>Las conozco. (I know them.)</td></tr></table>
<p>Placement: <strong>before</strong> conjugated verbs, or <strong>attached</strong> to infinitives/gerunds: <em>Quiero <strong>verlo</strong></em> = <em><strong>Lo</strong> quiero ver</em>.</p>`,
    quiz: [
      { type: "fib", question: "¿El libro? ___ leo cada noche. (I read it)", answer: "Lo", options: null, explanation: "El libro (masculine) → lo: Lo leo." },
      { type: "mc", question: "Where do DOPs go with conjugated verbs?", answer: "Before the verb", options: ["After the verb","Before the verb","Either position","Attached to the verb"], explanation: "DOPs go before conjugated verbs: Lo compro." },
      { type: "fib", question: "¿Las flores? ___ compré ayer.", answer: "Las", options: null, explanation: "Las flores (feminine plural) → las." },
      { type: "mc", question: "'Quiero verla' — where is the pronoun?", answer: "Attached to the infinitive", options: ["Before quiero","Attached to the infinitive","Between the verbs","After both verbs"], explanation: "Pronouns can attach to infinitives: ver + la = verla." },
      { type: "fib", question: "Ella ___ llama todos los días. (me)", answer: "me", options: null, explanation: "She calls me → Ella me llama." }
    ]
  },
  {
    id: "gram-17", title: "Pronombres de objeto indirecto", titleEn: "Indirect Object Pronouns", level: "A2", order: 17,
    content: `<h3>Indirect Object Pronouns</h3>
<table><tr><th>Person</th><th>IOP</th><th>Example</th></tr>
<tr><td>to me</td><td><strong>me</strong></td><td>Me da el libro. (He gives me the book.)</td></tr>
<tr><td>to you (tú)</td><td><strong>te</strong></td><td>Te digo la verdad. (I tell you the truth.)</td></tr>
<tr><td>to him/her/you</td><td><strong>le</strong></td><td>Le escribo una carta. (I write him/her a letter.)</td></tr>
<tr><td>to us</td><td><strong>nos</strong></td><td>Nos enseña español. (She teaches us Spanish.)</td></tr>
<tr><td>to them/you all</td><td><strong>les</strong></td><td>Les compro regalos. (I buy them gifts.)</td></tr></table>
<p>IOPs indicate to/for whom an action is done. Use <em>a + name/pronoun</em> for clarity: <em><strong>Le</strong> doy el libro <strong>a María</strong></em>.</p>`,
    quiz: [
      { type: "fib", question: "___ doy un regalo a mi mamá.", answer: "Le", options: null, explanation: "To her (a mi mamá) → le." },
      { type: "mc", question: "IOPs answer which question?", answer: "To/for whom?", options: ["What?","To/for whom?","Where?","How?"], explanation: "Indirect objects answer 'to whom' or 'for whom'." },
      { type: "fib", question: "El profesor ___ explica la lección. (to us)", answer: "nos", options: null, explanation: "To us → nos." },
      { type: "mc", question: "Why add 'a María' if we already have 'le'?", answer: "To clarify who 'le' refers to", options: ["It's required grammar","To clarify who 'le' refers to","For emphasis only","It's optional decoration"], explanation: "'Le' is ambiguous (him/her/you), so 'a + person' clarifies." },
      { type: "fib", question: "¿___ puedes prestar tu carro? (to me)", answer: "Me", options: null, explanation: "To me → me: ¿Me puedes prestar?" }
    ]
  },
  {
    id: "gram-18", title: "El pretérito regular", titleEn: "Preterite Tense (Regular)", level: "A2", order: 18,
    content: `<h3>Preterite: Completed Past Actions</h3>
<table><tr><th>Pronoun</th><th>-ar (hablar)</th><th>-er/-ir (comer/vivir)</th></tr>
<tr><td>yo</td><td>hablé</td><td>comí / viví</td></tr>
<tr><td>tú</td><td>hablaste</td><td>comiste / viviste</td></tr>
<tr><td>él/ella/Ud.</td><td>habló</td><td>comió / vivió</td></tr>
<tr><td>nosotros</td><td>hablamos</td><td>comimos / vivimos</td></tr>
<tr><td>ellos/Uds.</td><td>hablaron</td><td>comieron / vivieron</td></tr></table>
<p>The preterite expresses completed actions: <em>Ayer <strong>hablé</strong> con Juan</em> (Yesterday I spoke with Juan).</p>
<p>Trigger words: <em>ayer, anoche, la semana pasada, el año pasado, una vez, de repente</em>.</p>`,
    quiz: [
      { type: "fib", question: "Ayer yo _____ con mi amigo. (hablar)", answer: "hablé", options: null, explanation: "Yo + hablar in preterite → hablé." },
      { type: "mc", question: "Preterite is used for:", answer: "Completed actions in the past", options: ["Ongoing past actions","Completed actions in the past","Habitual past actions","Future plans"], explanation: "Preterite = completed, finished past actions." },
      { type: "fib", question: "Ellos _____ toda la pizza. (comer)", answer: "comieron", options: null, explanation: "Ellos + comer preterite → comieron." },
      { type: "mc", question: "Which word signals preterite?", answer: "ayer", options: ["siempre","ayer","normalmente","cada día"], explanation: "Ayer (yesterday) signals a completed past action." },
      { type: "fib", question: "Tú _____ en esa casa. (vivir)", answer: "viviste", options: null, explanation: "Tú + vivir preterite → viviste." }
    ]
  },
  {
    id: "gram-19", title: "El pretérito irregular", titleEn: "Preterite Tense (Irregular)", level: "A2", order: 19,
    content: `<h3>Irregular Preterite Verbs</h3>
<p>Key irregular verbs have special stems and share endings: <strong>-e, -iste, -o, -imos, -ieron</strong> (no accents!).</p>
<table><tr><th>Verb</th><th>Stem</th><th>yo</th><th>él</th><th>ellos</th></tr>
<tr><td>tener</td><td>tuv-</td><td>tuve</td><td>tuvo</td><td>tuvieron</td></tr>
<tr><td>estar</td><td>estuv-</td><td>estuve</td><td>estuvo</td><td>estuvieron</td></tr>
<tr><td>hacer</td><td>hic-/hiz-</td><td>hice</td><td>hizo</td><td>hicieron</td></tr>
<tr><td>ir/ser</td><td>fu-</td><td>fui</td><td>fue</td><td>fueron</td></tr>
<tr><td>decir</td><td>dij-</td><td>dije</td><td>dijo</td><td>dijeron</td></tr>
<tr><td>poder</td><td>pud-</td><td>pude</td><td>pudo</td><td>pudieron</td></tr></table>
<p><strong>Ir</strong> and <strong>ser</strong> share the same preterite forms. Context clarifies meaning.</p>`,
    quiz: [
      { type: "fib", question: "Ayer yo _____ a la tienda. (ir)", answer: "fui", options: null, explanation: "Yo + ir preterite → fui." },
      { type: "mc", question: "What's unusual about ir and ser in preterite?", answer: "They have identical forms", options: ["They're regular","They have identical forms","They aren't used in preterite","They only conjugate in yo form"], explanation: "Ir and ser share the same preterite: fui, fuiste, fue, fuimos, fueron." },
      { type: "fib", question: "Ella _____ la tarea anoche. (hacer)", answer: "hizo", options: null, explanation: "Ella + hacer preterite → hizo (c→z before o)." },
      { type: "mc", question: "What do irregular preterite forms share?", answer: "Special stems with unaccented endings", options: ["Regular endings with accents","Special stems with unaccented endings","Only the yo form is irregular","Double consonants"], explanation: "Irregular preterites share the endings -e, -iste, -o, -imos, -ieron (no accents)." },
      { type: "fib", question: "Nosotros no _____ ir. (poder)", answer: "pudimos", options: null, explanation: "Nosotros + poder preterite → pudimos." }
    ]
  },
  {
    id: "gram-20", title: "El imperfecto", titleEn: "Imperfect Tense", level: "A2", order: 20,
    content: `<h3>Imperfect Tense</h3>
<table><tr><th>Pronoun</th><th>-ar (hablar)</th><th>-er/-ir (comer/vivir)</th></tr>
<tr><td>yo</td><td>hablaba</td><td>comía / vivía</td></tr>
<tr><td>tú</td><td>hablabas</td><td>comías / vivías</td></tr>
<tr><td>él/ella</td><td>hablaba</td><td>comía / vivía</td></tr>
<tr><td>nosotros</td><td>hablábamos</td><td>comíamos / vivíamos</td></tr>
<tr><td>ellos</td><td>hablaban</td><td>comían / vivían</td></tr></table>
<p>Only 3 verbs are irregular: <strong>ir</strong> (iba, ibas...), <strong>ser</strong> (era, eras...), <strong>ver</strong> (veía, veías...).</p>
<p>Use imperfect for: habitual actions (<em>Siempre comía allí</em>), descriptions (<em>Era alto</em>), age (<em>Tenía 10 años</em>), time (<em>Eran las 3</em>), ongoing actions (<em>Llovía cuando salí</em>).</p>`,
    quiz: [
      { type: "fib", question: "De niño, yo _____ mucho. (jugar)", answer: "jugaba", options: null, explanation: "Habitual past + yo + -ar → jugaba." },
      { type: "mc", question: "How many irregular imperfect verbs are there?", answer: "Three (ir, ser, ver)", options: ["None","Three (ir, ser, ver)","Ten","Same as preterite"], explanation: "Only ir (iba), ser (era), and ver (veía) are irregular." },
      { type: "fib", question: "Ella _____ 15 años cuando se mudó. (tener)", answer: "tenía", options: null, explanation: "Age in the past uses imperfect: tenía." },
      { type: "mc", question: "Which trigger word signals imperfect?", answer: "siempre", options: ["ayer","siempre","una vez","de repente"], explanation: "Siempre (always) signals habitual action → imperfect." },
      { type: "fib", question: "Nosotros _____ a la escuela cada día. (ir)", answer: "íbamos", options: null, explanation: "Ir imperfect nosotros → íbamos." }
    ]
  },
  {
    id: "gram-21", title: "Pretérito vs. imperfecto", titleEn: "Preterite vs. Imperfect", level: "A2", order: 21,
    content: `<h3>Preterite vs. Imperfect</h3>
<table><tr><th>Pretérito (completed)</th><th>Imperfecto (ongoing/habitual)</th></tr>
<tr><td>Single completed event</td><td>Habitual/repeated action</td></tr>
<tr><td>Specific time frame</td><td>No defined endpoint</td></tr>
<tr><td><em>Comí a las 3.</em></td><td><em>Comía a las 3 todos los días.</em></td></tr>
<tr><td><em>Llovió ayer.</em></td><td><em>Llovía cuando salí.</em></td></tr></table>
<p>Often used together: the imperfect sets the scene, the preterite interrupts:</p>
<p><em><strong>Dormía</strong> (imperfect) cuando <strong>sonó</strong> (preterite) el teléfono.</em> — I was sleeping when the phone rang.</p>`,
    quiz: [
      { type: "mc", question: "'Mientras yo estudiaba, mi mamá llegó.' Which is preterite?", answer: "llegó", options: ["estudiaba","llegó","Both","Neither"], explanation: "Llegó is the interrupting completed action (preterite)." },
      { type: "mc", question: "For describing what someone looked like, use:", answer: "Imperfect", options: ["Preterite","Imperfect","Either","Present"], explanation: "Descriptions in the past use imperfect: Era alto y tenía ojos verdes." },
      { type: "fib", question: "Ayer _____ a las 10 de la noche. (llegar, yo)", answer: "llegué", options: null, explanation: "Specific completed action yesterday → preterite: llegué." },
      { type: "mc", question: "'Siempre comía arroz de niño' uses imperfect because:", answer: "It was a habitual action", options: ["It happened once","It was a habitual action","It has a specific end time","The speaker is uncertain"], explanation: "Habitual past actions use imperfect." },
      { type: "fib", question: "_____ las 8 cuando empezó la película. (ser)", answer: "Eran", options: null, explanation: "Time in the past → imperfect: Eran las 8." }
    ]
  },
  {
    id: "gram-22", title: "Comparativos y superlativos", titleEn: "Comparatives and Superlatives", level: "A2", order: 22,
    content: `<h3>Comparatives and Superlatives</h3>
<p><strong>Comparatives:</strong></p>
<ul>
<li>More than: <strong>más + adj + que</strong> — <em>Juan es <strong>más alto que</strong> Pedro.</em></li>
<li>Less than: <strong>menos + adj + que</strong> — <em>Es <strong>menos caro que</strong> el otro.</em></li>
<li>As...as: <strong>tan + adj + como</strong> — <em>Es <strong>tan grande como</strong> mi casa.</em></li>
</ul>
<p><strong>Irregular comparatives:</strong> bueno → <strong>mejor</strong>, malo → <strong>peor</strong>, grande → <strong>mayor</strong> (age), pequeño → <strong>menor</strong> (age).</p>
<p><strong>Superlatives:</strong> el/la/los/las + más/menos + adj: <em>Es <strong>el más alto</strong> de la clase.</em></p>`,
    quiz: [
      { type: "fib", question: "María es _____ alta que Ana. (more)", answer: "más", options: null, explanation: "More + adjective + than = más + adj + que." },
      { type: "mc", question: "The irregular comparative of 'bueno' is:", answer: "mejor", options: ["más bueno","mejor","más bien","buenísimo"], explanation: "Bueno → mejor (better), not 'más bueno'." },
      { type: "fib", question: "Pedro es tan inteligente _____ su hermana.", answer: "como", options: null, explanation: "As...as = tan + adj + como." },
      { type: "mc", question: "How do you say 'the tallest in the class'?", answer: "el más alto de la clase", options: ["el más alto de la clase","el más alto que la clase","el alto más de la clase","más el alto de la clase"], explanation: "Superlative: el/la + más + adj + de." },
      { type: "fib", question: "Mi hermano es _____ que yo. (older)", answer: "mayor", options: null, explanation: "For age: grande → mayor (older)." }
    ]
  },
  // ===== B1 =====
  {
    id: "gram-23", title: "El futuro simple", titleEn: "Simple Future Tense", level: "B1", order: 23,
    content: `<h3>Simple Future Tense</h3>
<p>Add endings to the <strong>full infinitive</strong>:</p>
<table><tr><th>Pronoun</th><th>Ending</th><th>hablar</th></tr>
<tr><td>yo</td><td>-é</td><td>hablaré</td></tr>
<tr><td>tú</td><td>-ás</td><td>hablarás</td></tr>
<tr><td>él/ella</td><td>-á</td><td>hablará</td></tr>
<tr><td>nosotros</td><td>-emos</td><td>hablaremos</td></tr>
<tr><td>ellos</td><td>-án</td><td>hablarán</td></tr></table>
<p><strong>Irregular stems</strong> (same endings): tener → <em>tendr-</em>, poder → <em>podr-</em>, saber → <em>sabr-</em>, hacer → <em>har-</em>, decir → <em>dir-</em>, salir → <em>saldr-</em>, venir → <em>vendr-</em>, poner → <em>pondr-</em>, querer → <em>querr-</em>, haber → <em>habr-</em>.</p>
<p>The future also expresses probability in the present: <em>¿Dónde estará Juan?</em> (Where could Juan be?)</p>`,
    quiz: [
      { type: "fib", question: "Mañana yo _____ temprano. (salir)", answer: "saldré", options: null, explanation: "Salir has irregular stem saldr-: saldré." },
      { type: "mc", question: "Future tense endings are added to:", answer: "The full infinitive", options: ["The stem only","The full infinitive","The present tense form","The past participle"], explanation: "Future endings attach to the complete infinitive (or irregular stem)." },
      { type: "fib", question: "Ellos _____ la verdad. (saber)", answer: "sabrán", options: null, explanation: "Saber → sabr- + -án = sabrán." },
      { type: "mc", question: "'¿Qué hora será?' expresses:", answer: "Probability/wondering in the present", options: ["A question about the future","Probability/wondering in the present","A past event","A command"], explanation: "Future of probability: 'I wonder what time it is.'" },
      { type: "fib", question: "Nosotros _____ una fiesta. (hacer)", answer: "haremos", options: null, explanation: "Hacer → har- + -emos = haremos." }
    ]
  },
  {
    id: "gram-24", title: "El condicional", titleEn: "Conditional Tense", level: "B1", order: 24,
    content: `<h3>Conditional Tense (would)</h3>
<p>Same stems as future (regular = infinitive, irregular = same irregular stems), different endings:</p>
<table><tr><th>Pronoun</th><th>Ending</th><th>hablar</th></tr>
<tr><td>yo</td><td>-ía</td><td>hablaría</td></tr>
<tr><td>tú</td><td>-ías</td><td>hablarías</td></tr>
<tr><td>él/ella</td><td>-ía</td><td>hablaría</td></tr>
<tr><td>nosotros</td><td>-íamos</td><td>hablaríamos</td></tr>
<tr><td>ellos</td><td>-ían</td><td>hablarían</td></tr></table>
<p>Uses: polite requests (<em>¿Podrías ayudarme?</em>), hypothetical situations (<em>Yo viajaría a España</em>), advice (<em>Yo que tú, estudiaría más</em>), probability in the past (<em>Serían las 3</em> = It was probably 3).</p>`,
    quiz: [
      { type: "fib", question: "Yo _____ a España. (viajar - would)", answer: "viajaría", options: null, explanation: "Viajar + -ía = viajaría." },
      { type: "mc", question: "Conditional uses the same irregular stems as:", answer: "Future tense", options: ["Preterite","Imperfect","Future tense","Subjunctive"], explanation: "Conditional and future share the same stems." },
      { type: "fib", question: "¿_____ abrir la ventana? (poder - could you?)", answer: "Podrías", options: null, explanation: "Poder → podr- + -ías = Podrías (polite request)." },
      { type: "mc", question: "'Dijo que vendría' means:", answer: "He said he would come", options: ["He said he came","He said he would come","He says he will come","He would say he comes"], explanation: "Conditional for 'would' in reported speech." },
      { type: "fib", question: "Nosotros _____ más. (estudiar - would)", answer: "estudiaríamos", options: null, explanation: "Estudiar + -íamos = estudiaríamos." }
    ]
  },
  {
    id: "gram-25", title: "El subjuntivo presente", titleEn: "Present Subjunctive Formation", level: "B1", order: 25,
    content: `<h3>Present Subjunctive</h3>
<p>Formation: start from the <strong>yo present indicative</strong>, drop the -o, add opposite endings:</p>
<table><tr><th>Pronoun</th><th>-ar (hablar → habl-)</th><th>-er/-ir (comer → com-)</th></tr>
<tr><td>yo</td><td>hable</td><td>coma</td></tr>
<tr><td>tú</td><td>hables</td><td>comas</td></tr>
<tr><td>él/ella</td><td>hable</td><td>coma</td></tr>
<tr><td>nosotros</td><td>hablemos</td><td>comamos</td></tr>
<tr><td>ellos</td><td>hablen</td><td>coman</td></tr></table>
<p>"Opposite" means -ar verbs get -er endings and vice versa. Irregular yo forms carry through: <em>tener → tengo → tenga, poner → pongo → ponga</em>.</p>
<p>Completely irregular: <em>ser → sea</em>, <em>ir → vaya</em>, <em>haber → haya</em>, <em>saber → sepa</em>, <em>dar → dé</em>, <em>estar → esté</em>.</p>`,
    quiz: [
      { type: "fib", question: "Quiero que tú _____ español. (hablar, subjunctive)", answer: "hables", options: null, explanation: "Hablar → habl- + -es = hables." },
      { type: "mc", question: "Subjunctive of 'tener' (yo) is:", answer: "tenga", options: ["tiene","tenga","tena","tengo"], explanation: "Tengo → teng- + -a = tenga." },
      { type: "fib", question: "Es importante que ellos _____ la verdad. (saber)", answer: "sepan", options: null, explanation: "Saber is irregular in subjunctive: sepan." },
      { type: "mc", question: "The 'opposite ending' rule means:", answer: "-ar verbs get -e endings, -er/-ir get -a endings", options: ["-ar verbs get -a endings","-ar verbs get -e endings, -er/-ir get -a endings","All verbs get -a endings","Endings are reversed"], explanation: "-ar → -e, -es, -e, -emos, -en; -er/-ir → -a, -as, -a, -amos, -an." },
      { type: "fib", question: "Espero que ella _____ bien. (estar)", answer: "esté", options: null, explanation: "Estar is irregular in subjunctive: esté." }
    ]
  },
  {
    id: "gram-26", title: "Usos del subjuntivo (WEIRDO)", titleEn: "Subjunctive Triggers (WEIRDO)", level: "B1", order: 26,
    content: `<h3>When to Use the Subjunctive: WEIRDO</h3>
<p>The subjunctive is used in dependent clauses after certain triggers. Remember <strong>WEIRDO</strong>:</p>
<ul>
<li><strong>W</strong>ishes/Wants: <em>Quiero que <strong>vengas</strong>.</em> (I want you to come.)</li>
<li><strong>E</strong>motions: <em>Me alegra que <strong>estés</strong> aquí.</em> (I'm glad you're here.)</li>
<li><strong>I</strong>mpersonal expressions: <em>Es necesario que <strong>estudies</strong>.</em></li>
<li><strong>R</strong>ecommendations/Requests: <em>Te sugiero que <strong>vayas</strong>.</em></li>
<li><strong>D</strong>oubt/Denial: <em>Dudo que <strong>sea</strong> verdad.</em></li>
<li><strong>O</strong>jalá (I hope): <em>Ojalá que <strong>llueva</strong>.</em></li>
</ul>
<p>Key requirement: the subject of the main clause must be <strong>different</strong> from the subordinate clause. Same subject → infinitive: <em>Quiero <strong>ir</strong></em> (not *quiero que yo vaya).</p>`,
    quiz: [
      { type: "mc", question: "Which triggers the subjunctive?", answer: "Quiero que...", options: ["Creo que...","Sé que...","Quiero que...","Es verdad que..."], explanation: "Wishes (Quiero que...) trigger subjunctive." },
      { type: "fib", question: "Es importante que nosotros _____ bien. (comer)", answer: "comamos", options: null, explanation: "Impersonal expression triggers subjunctive: comamos." },
      { type: "mc", question: "When do we use infinitive instead of subjunctive?", answer: "When the subject is the same in both clauses", options: ["In formal speech","When the subject is the same in both clauses","With all negative sentences","In the past tense"], explanation: "Same subject = infinitive: Quiero ir (not *quiero que yo vaya)." },
      { type: "fib", question: "Dudo que él _____ la respuesta. (saber)", answer: "sepa", options: null, explanation: "Doubt triggers subjunctive: Dudo que sepa." },
      { type: "mc", question: "What does WEIRDO stand for?", answer: "Wishes, Emotions, Impersonal, Recommendations, Doubt, Ojalá", options: ["Wishes, Emotions, Impersonal, Recommendations, Doubt, Ojalá","Words, Expressions, Ideas, Rules, Definitions, Orders","Will, Emotions, Intentions, Reality, Dreams, Opinions","None of the above"], explanation: "WEIRDO = Wishes, Emotions, Impersonal expressions, Recommendations, Doubt, Ojalá." }
    ]
  },
  {
    id: "gram-27", title: "Los mandatos (imperativo)", titleEn: "Commands (Imperative)", level: "B1", order: 27,
    content: `<h3>Commands / Imperative</h3>
<p><strong>Tú affirmative:</strong> Use the él/ella present indicative form: <em>habla, come, escribe</em>. Irregulars: <em>di, haz, ve, pon, sal, sé, ten, ven</em>.</p>
<p><strong>Tú negative:</strong> no + tú subjunctive: <em>no hables, no comas, no escribas</em>.</p>
<p><strong>Usted:</strong> Use subjunctive (both affirmative and negative): <em>hable / no hable, coma / no coma</em>.</p>
<p><strong>Ustedes:</strong> Use subjunctive: <em>hablen / no hablen</em>.</p>
<p>Pronoun placement: attached to affirmative commands (<em>¡Dímelo!</em>), before negative commands (<em>¡No me lo digas!</em>).</p>`,
    quiz: [
      { type: "mc", question: "Affirmative tú command of 'hablar':", answer: "habla", options: ["hablas","habla","hable","hables"], explanation: "Tú affirmative = él present indicative form: habla." },
      { type: "fib", question: "¡No _____ eso! (decir, tú negative)", answer: "digas", options: null, explanation: "Negative tú = no + subjunctive: no digas." },
      { type: "mc", question: "Which is an irregular tú command?", answer: "haz (hacer)", options: ["hace","hazes","haz (hacer)","haga"], explanation: "Hacer → haz (irregular tú affirmative)." },
      { type: "fib", question: "_____, por favor. (venir, usted)", answer: "Venga", options: null, explanation: "Usted commands use subjunctive: venga." },
      { type: "mc", question: "Where do pronouns go in negative commands?", answer: "Before the verb", options: ["After the verb","Before the verb","Attached to the end","Either position"], explanation: "Negative: No me digas. Affirmative: Dime." }
    ]
  },
  {
    id: "gram-28", title: "Por vs. Para", titleEn: "Por vs. Para", level: "B1", order: 28,
    content: `<h3>Por vs. Para</h3>
<p><strong>Por</strong> (cause, exchange, duration, through):</p>
<ul>
<li>Cause/reason: <em>Lo hago <strong>por</strong> ti.</em> (I do it because of you.)</li>
<li>Exchange: <em>Pagué 10 dólares <strong>por</strong> el libro.</em></li>
<li>Duration: <em>Estudié <strong>por</strong> dos horas.</em></li>
<li>Movement through: <em>Caminé <strong>por</strong> el parque.</em></li>
</ul>
<p><strong>Para</strong> (purpose, destination, deadline, recipient):</p>
<ul>
<li>Purpose: <em>Estudio <strong>para</strong> aprender.</em> (I study to learn.)</li>
<li>Destination: <em>Salgo <strong>para</strong> Madrid.</em></li>
<li>Deadline: <em>Es <strong>para</strong> mañana.</em></li>
<li>Recipient: <em>El regalo es <strong>para</strong> ti.</em></li>
</ul>`,
    quiz: [
      { type: "fib", question: "El regalo es _____ mi mamá. (for/recipient)", answer: "para", options: null, explanation: "Recipient = para: para mi mamá." },
      { type: "mc", question: "'Pagué $20 ___ el libro.' Which one?", answer: "por", options: ["por","para","Both work","Neither"], explanation: "Exchange/payment = por." },
      { type: "fib", question: "Caminé _____ el parque. (through)", answer: "por", options: null, explanation: "Movement through = por." },
      { type: "mc", question: "'Estudio ___ ser doctor' uses:", answer: "para (purpose)", options: ["por (cause)","para (purpose)","por (duration)","para (destination)"], explanation: "Purpose/goal = para: para ser doctor." },
      { type: "fib", question: "La tarea es _____ el viernes. (deadline)", answer: "para", options: null, explanation: "Deadline = para: para el viernes." }
    ]
  },
  {
    id: "gram-29", title: "Los pronombres relativos", titleEn: "Relative Pronouns", level: "B1", order: 29,
    content: `<h3>Relative Pronouns</h3>
<ul>
<li><strong>que</strong> — that/which/who (most common): <em>El libro <strong>que</strong> leo es bueno.</em></li>
<li><strong>quien/quienes</strong> — who/whom (after prepositions, with people): <em>La mujer con <strong>quien</strong> hablé...</em></li>
<li><strong>donde</strong> — where: <em>La ciudad <strong>donde</strong> nací...</em></li>
<li><strong>lo que</strong> — what/that which: <em>No entiendo <strong>lo que</strong> dices.</em></li>
<li><strong>el/la/los/las que</strong> — the one(s) that: <em><strong>Los que</strong> estudian aprenden.</em></li>
<li><strong>cuyo/a/os/as</strong> — whose: <em>El autor <strong>cuyo</strong> libro leí...</em></li>
</ul>`,
    quiz: [
      { type: "fib", question: "La persona _____ llamó no dejó mensaje.", answer: "que", options: null, explanation: "Who/that (subject) = que." },
      { type: "mc", question: "'No entiendo ___ dices.' Fill in:", answer: "lo que", options: ["que","lo que","quien","cual"], explanation: "What (abstract) = lo que." },
      { type: "fib", question: "La ciudad _____ nací es pequeña.", answer: "donde", options: null, explanation: "Where (relative) = donde." },
      { type: "mc", question: "After a preposition with people, use:", answer: "quien", options: ["que","quien","cual","donde"], explanation: "After prepositions with people: con quien, para quien." },
      { type: "fib", question: "El profesor _____ clase tomo es excelente. (whose)", answer: "cuya", options: null, explanation: "'Clase' is feminine → cuya (agrees with possessed noun)." }
    ]
  },
  {
    id: "gram-30", title: "Pronombres de doble objeto", titleEn: "Double Object Pronouns", level: "B1", order: 30,
    content: `<h3>Double Object Pronouns</h3>
<p>When both indirect (IOP) and direct (DOP) object pronouns appear, IOP comes first:</p>
<p><strong>Order: IOP + DOP + verb</strong></p>
<p><em>Me lo da.</em> (He gives it to me.) — me (IOP) + lo (DOP)</p>
<p><strong>Important rule:</strong> When both pronouns start with "l" (le/les + lo/la/los/las), change le/les to <strong>se</strong>:</p>
<p><em>Le lo doy</em> → <strong>Se lo doy.</strong> (I give it to him/her.)</p>
<p>With infinitives and gerunds, pronouns can attach: <em>Quiero dárselo</em> or <em>Se lo quiero dar</em>.</p>`,
    quiz: [
      { type: "mc", question: "'I give it (m.) to her' = ", answer: "Se lo doy", options: ["Le lo doy","Se lo doy","La lo doy","Lo se doy"], explanation: "Le + lo → se lo: Se lo doy." },
      { type: "fib", question: "¿La tarea? ___ ___ entrego mañana. (to you, it)", answer: "Te la", options: null, explanation: "IOP (te) + DOP (la) = Te la entrego." },
      { type: "mc", question: "Why does 'le lo' become 'se lo'?", answer: "Two L-pronouns together are hard to pronounce", options: ["It's a grammar error","Two L-pronouns together are hard to pronounce","'Le' doesn't exist","Only in formal speech"], explanation: "When IOP (le/les) meets DOP (lo/la/los/las), le/les → se for phonetic ease." },
      { type: "mc", question: "What is the correct order?", answer: "IOP before DOP", options: ["DOP before IOP","IOP before DOP","Either order","Alphabetical"], explanation: "Always IOP + DOP: me lo, te la, se los." },
      { type: "fib", question: "¿Los libros? ___ ___ presté ayer. (to them, them)", answer: "Se los", options: null, explanation: "Les + los → se los: Se los presté." }
    ]
  },
  {
    id: "gram-31", title: "El participio pasado y el pretérito perfecto", titleEn: "Past Participles and Present Perfect", level: "B1", order: 31,
    content: `<h3>Present Perfect (Pretérito Perfecto)</h3>
<p><strong>Formation:</strong> haber (present) + past participle</p>
<table><tr><th>Pronoun</th><th>haber</th><th>Example</th></tr>
<tr><td>yo</td><td>he</td><td>He comido. (I have eaten.)</td></tr>
<tr><td>tú</td><td>has</td><td>Has estudiado.</td></tr>
<tr><td>él/ella</td><td>ha</td><td>Ha llegado.</td></tr>
<tr><td>nosotros</td><td>hemos</td><td>Hemos viajado.</td></tr>
<tr><td>ellos</td><td>han</td><td>Han salido.</td></tr></table>
<p><strong>Past participles:</strong> -ar → -ado, -er/-ir → -ido. Irregulars: dicho (decir), hecho (hacer), visto (ver), escrito (escribir), puesto (poner), abierto (abrir), muerto (morir), vuelto (volver), roto (romper), cubierto (cubrir).</p>`,
    quiz: [
      { type: "fib", question: "Yo _____ comido. (have)", answer: "he", options: null, explanation: "Yo + haber present = he." },
      { type: "mc", question: "Past participle of 'escribir':", answer: "escrito", options: ["escribido","escrito","escribo","escribiído"], explanation: "Escribir has an irregular participle: escrito." },
      { type: "fib", question: "Ellos _____ _____ muchos países. (have visited)", answer: "han visitado", options: null, explanation: "Han (ellos) + visitado = han visitado." },
      { type: "mc", question: "Past participle of 'hacer':", answer: "hecho", options: ["hacido","hacedo","hecho","hacido"], explanation: "Hacer → hecho (irregular)." },
      { type: "fib", question: "¿Has _____ la puerta? (abrir)", answer: "abierto", options: null, explanation: "Abrir → abierto (irregular participle)." }
    ]
  },
  {
    id: "gram-32", title: "La voz pasiva", titleEn: "Passive Voice", level: "B1", order: 32,
    content: `<h3>Passive Voice</h3>
<p><strong>Ser + past participle</strong> (+ por + agent):</p>
<p><em>El libro <strong>fue escrito por</strong> Cervantes.</em> (The book was written by Cervantes.)</p>
<p>The participle agrees in gender/number with the subject: <em>Las cartas <strong>fueron escritas</strong>.</em></p>
<p><strong>Pasiva refleja</strong> (more common in Spanish): <strong>se + verb</strong>:</p>
<p><em><strong>Se habla</strong> español aquí.</em> (Spanish is spoken here.)</p>
<p><em><strong>Se venden</strong> coches.</em> (Cars are sold.)</p>
<p>The pasiva refleja is preferred in everyday speech. The ser passive is more formal/literary.</p>`,
    quiz: [
      { type: "fib", question: "La casa fue _____ en 1990. (construir)", answer: "construida", options: null, explanation: "Feminine subject → construida (participle agrees)." },
      { type: "mc", question: "'Se habla español' is an example of:", answer: "Pasiva refleja", options: ["Active voice","Ser passive","Pasiva refleja","Imperative"], explanation: "Se + verb = pasiva refleja (reflexive passive)." },
      { type: "fib", question: "Aquí ___ venden libros.", answer: "se", options: null, explanation: "Pasiva refleja: Se venden libros." },
      { type: "mc", question: "In ser passive, the participle must:", answer: "Agree with the subject in gender and number", options: ["Stay in masculine singular","Agree with the subject in gender and number","Always end in -ado","Match the agent"], explanation: "Las cartas fueron escritas (fem. plural agreement)." },
      { type: "fib", question: "El cuadro fue _____ por Picasso. (pintar)", answer: "pintado", options: null, explanation: "Masculine subject → pintado." }
    ]
  },
  // ===== B2 =====
  {
    id: "gram-33", title: "El subjuntivo imperfecto", titleEn: "Imperfect Subjunctive", level: "B2", order: 33,
    content: `<h3>Imperfect Subjunctive</h3>
<p>Formation: Take the <strong>ellos preterite</strong> form, drop <strong>-ron</strong>, add endings:</p>
<table><tr><th>Pronoun</th><th>-ra form</th><th>-se form</th></tr>
<tr><td>yo</td><td>hablara</td><td>hablase</td></tr>
<tr><td>tú</td><td>hablaras</td><td>hablases</td></tr>
<tr><td>él/ella</td><td>hablara</td><td>hablase</td></tr>
<tr><td>nosotros</td><td>habláramos</td><td>hablásemos</td></tr>
<tr><td>ellos</td><td>hablaran</td><td>hablasen</td></tr></table>
<p>The <strong>-ra</strong> form is more common in Latin America, <strong>-se</strong> in Spain. Both are correct.</p>
<p>Used when the main verb is in a past tense: <em>Quería que <strong>vinieras</strong>.</em> (I wanted you to come.)</p>`,
    quiz: [
      { type: "fib", question: "Quería que tú _____ más. (estudiar)", answer: "estudiaras", options: null, explanation: "Past trigger + subjunctive = imperfect subjunctive: estudiaras." },
      { type: "mc", question: "Imperfect subjunctive is formed from:", answer: "Ellos preterite minus -ron", options: ["Yo present minus -o","Infinitive plus endings","Ellos preterite minus -ron","Imperfect indicative"], explanation: "Take ellos preterite (hablaron), drop -ron (habla-), add -ra/-se endings." },
      { type: "fib", question: "Si yo _____ rico, viajaría. (ser)", answer: "fuera", options: null, explanation: "Ser ellos preterite: fueron → fuer- → fuera." },
      { type: "mc", question: "Which form is more common in Latin America?", answer: "-ra form", options: ["-ra form","-se form","Both equally","Neither"], explanation: "The -ra form is preferred in Latin America." },
      { type: "fib", question: "Era necesario que ellos _____. (venir)", answer: "vinieran", options: null, explanation: "Venir → vinieron → vinier- → vinieran." }
    ]
  },
  {
    id: "gram-34", title: "Las cláusulas con si", titleEn: "Si Clauses (Conditionals)", level: "B2", order: 34,
    content: `<h3>Si Clauses (If Clauses)</h3>
<p><strong>Type 1 — Real/possible:</strong> Si + present indicative, + present/future/command</p>
<p><em>Si <strong>llueve</strong>, <strong>me quedo</strong> en casa.</em> (If it rains, I stay home.)</p>
<p><strong>Type 2 — Hypothetical/contrary to fact:</strong> Si + imperfect subjunctive, + conditional</p>
<p><em>Si <strong>tuviera</strong> dinero, <strong>viajaría</strong> a España.</em> (If I had money, I would travel to Spain.)</p>
<p><strong>Type 3 — Past contrary to fact:</strong> Si + pluperfect subjunctive, + conditional perfect</p>
<p><em>Si <strong>hubiera estudiado</strong>, <strong>habría aprobado</strong>.</em> (If I had studied, I would have passed.)</p>
<p><strong>Never use present subjunctive after si!</strong> *Si tenga → incorrect.</p>`,
    quiz: [
      { type: "fib", question: "Si yo _____ tiempo, iría contigo. (tener)", answer: "tuviera", options: null, explanation: "Hypothetical si clause = imperfect subjunctive: tuviera." },
      { type: "mc", question: "Which is NEVER used after 'si'?", answer: "Present subjunctive", options: ["Present indicative","Imperfect subjunctive","Present subjunctive","Pluperfect subjunctive"], explanation: "Never: *Si tenga. Use present indicative or imperfect/pluperfect subjunctive." },
      { type: "fib", question: "Si llueve, ___ quedo en casa. (I stay)", answer: "me", options: null, explanation: "Real condition: Si llueve, me quedo en casa." },
      { type: "mc", question: "'Si hubiera sabido, habría ido' is:", answer: "Type 3 — past contrary to fact", options: ["Type 1 — real","Type 2 — hypothetical","Type 3 — past contrary to fact","Not a valid si clause"], explanation: "Pluperfect subjunctive + conditional perfect = past unreal." },
      { type: "fib", question: "Si _____ más, habría aprobado. (estudiar, pluperfect subj.)", answer: "hubiera estudiado", options: null, explanation: "Past contrary to fact: Si hubiera estudiado..." }
    ]
  },
  {
    id: "gram-35", title: "Subjuntivo en cláusulas adjetivas", titleEn: "Subjunctive in Adjective Clauses", level: "B2", order: 35,
    content: `<h3>Subjunctive in Adjective Clauses</h3>
<p>Use subjunctive when the adjective clause describes something <strong>unknown, nonexistent, or hypothetical</strong>:</p>
<ul>
<li><em>Busco un hotel que <strong>tenga</strong> piscina.</em> (I'm looking for a hotel that has a pool.) — not sure it exists</li>
<li><em>Conozco un hotel que <strong>tiene</strong> piscina.</em> (I know a hotel that has a pool.) — it exists</li>
<li><em>No hay nadie que <strong>sepa</strong> la respuesta.</em> (There's nobody who knows the answer.)</li>
</ul>
<p><strong>Key triggers:</strong> buscar (algo que...), necesitar (algo que...), no hay nadie que..., no conozco a nadie que..., ¿hay alguien que...?</p>`,
    quiz: [
      { type: "mc", question: "'Busco una casa que ___ grande.' Which verb form?", answer: "sea (subjunctive)", options: ["es (indicative)","sea (subjunctive)","será (future)","era (imperfect)"], explanation: "Unknown/hypothetical referent → subjunctive: que sea grande." },
      { type: "fib", question: "No conozco a nadie que _____ japonés. (hablar)", answer: "hable", options: null, explanation: "Nonexistent referent → subjunctive: que hable." },
      { type: "mc", question: "'Tengo un amigo que habla chino' uses indicative because:", answer: "The friend exists and is known", options: ["It's in present tense","The friend exists and is known","'Tener' requires indicative","It's a positive sentence"], explanation: "Known, existing referent → indicative." },
      { type: "fib", question: "¿Hay alguien que _____ cocinar? (saber)", answer: "sepa", options: null, explanation: "Uncertain existence (question) → subjunctive: que sepa." },
      { type: "mc", question: "Indicative vs subjunctive in adjective clauses depends on:", answer: "Whether the referent is known to exist", options: ["The tense of the main verb","Whether the referent is known to exist","Whether the sentence is positive","The formality level"], explanation: "Known/existing → indicative. Unknown/hypothetical → subjunctive." }
    ]
  },
  {
    id: "gram-36", title: "Subjuntivo en cláusulas adverbiales", titleEn: "Subjunctive in Adverbial Clauses", level: "B2", order: 36,
    content: `<h3>Subjunctive in Adverbial Clauses</h3>
<p><strong>Always subjunctive</strong> (ESCAPA): <em>en caso de que, sin que, con tal de que, a menos que, para que, antes de que</em>.</p>
<p><em>Te llamo <strong>antes de que</strong> salgas.</em> (I'll call you before you leave.)</p>
<p><strong>Subjunctive or indicative</strong> depending on whether action is future/habitual:</p>
<ul>
<li><em>Cuando <strong>llegue</strong> (subj.), te llamo.</em> (When I arrive [future], I'll call.)</li>
<li><em>Cuando <strong>llego</strong> (ind.), siempre te llamo.</em> (When I arrive [habitual], I always call.)</li>
</ul>
<p>Other conjunctions in this group: <em>aunque, después de que, hasta que, tan pronto como, mientras</em>.</p>`,
    quiz: [
      { type: "fib", question: "Te ayudo para que _____ el examen. (pasar)", answer: "pases", options: null, explanation: "'Para que' always takes subjunctive: pases." },
      { type: "mc", question: "'Cuando llegue' vs 'Cuando llego' — which refers to the future?", answer: "Cuando llegue (subjunctive)", options: ["Cuando llego","Cuando llegue (subjunctive)","Both","Neither"], explanation: "Future reference after cuando → subjunctive: cuando llegue." },
      { type: "fib", question: "No salgas sin que yo lo _____. (saber)", answer: "sepa", options: null, explanation: "'Sin que' always takes subjunctive: sepa." },
      { type: "mc", question: "Which conjunction ALWAYS requires subjunctive?", answer: "antes de que", options: ["cuando","porque","antes de que","donde"], explanation: "'Antes de que' (before) always takes subjunctive." },
      { type: "fib", question: "Cuando _____ a casa, descansaré. (llegar, yo)", answer: "llegue", options: null, explanation: "Future action after cuando → subjunctive: llegue." }
    ]
  },
  {
    id: "gram-37", title: "El pluscuamperfecto", titleEn: "Past Perfect (Pluperfect)", level: "B2", order: 37,
    content: `<h3>Pluperfect (Past Perfect)</h3>
<p><strong>Formation:</strong> haber (imperfect) + past participle</p>
<table><tr><th>Pronoun</th><th>haber</th><th>Example</th></tr>
<tr><td>yo</td><td>había</td><td>Había comido. (I had eaten.)</td></tr>
<tr><td>tú</td><td>habías</td><td>Habías estudiado.</td></tr>
<tr><td>él/ella</td><td>había</td><td>Había llegado.</td></tr>
<tr><td>nosotros</td><td>habíamos</td><td>Habíamos viajado.</td></tr>
<tr><td>ellos</td><td>habían</td><td>Habían salido.</td></tr></table>
<p>Expresses an action completed <strong>before</strong> another past action:</p>
<p><em>Cuando llegué, ella ya <strong>había salido</strong>.</em> (When I arrived, she had already left.)</p>`,
    quiz: [
      { type: "fib", question: "Yo ya _____ _____ cuando llamaste. (comer)", answer: "había comido", options: null, explanation: "Had eaten = había comido." },
      { type: "mc", question: "Pluperfect uses haber in which tense?", answer: "Imperfect", options: ["Present","Preterite","Imperfect","Future"], explanation: "Pluperfect = imperfect of haber + participle." },
      { type: "fib", question: "Ellos nunca _____ _____ a México. (viajar)", answer: "habían viajado", options: null, explanation: "They had never traveled = habían viajado." },
      { type: "mc", question: "When is the pluperfect used?", answer: "For an action before another past action", options: ["For recent past","For an action before another past action","For ongoing past","For future in the past"], explanation: "Pluperfect = 'had done' — before another past event." },
      { type: "fib", question: "¿Ya _____ _____ la película? (ver, tú)", answer: "habías visto", options: null, explanation: "Had you seen = habías visto." }
    ]
  },
  {
    id: "gram-38", title: "Futuro perfecto y condicional perfecto", titleEn: "Future Perfect and Conditional Perfect", level: "B2", order: 38,
    content: `<h3>Future Perfect and Conditional Perfect</h3>
<p><strong>Future perfect:</strong> haber (future) + participle — an action that <em>will have</em> been completed:</p>
<p><em>Para las 5, <strong>habré terminado</strong>.</em> (By 5, I will have finished.)</p>
<p>Also for probability in the past: <em><strong>Habrá llegado</strong> a las 3.</em> (He probably arrived at 3.)</p>
<p><strong>Conditional perfect:</strong> haber (conditional) + participle — <em>would have</em>:</p>
<p><em>Yo <strong>habría ido</strong>, pero no pude.</em> (I would have gone, but I couldn't.)</p>
<p>Used in Type 3 si clauses: <em>Si hubiera sabido, <strong>habría llamado</strong>.</em></p>`,
    quiz: [
      { type: "fib", question: "Para mañana, yo _____ _____ el proyecto. (terminar)", answer: "habré terminado", options: null, explanation: "Will have finished = habré terminado." },
      { type: "mc", question: "'Habría ido' means:", answer: "I would have gone", options: ["I will have gone","I would have gone","I had gone","I will go"], explanation: "Conditional perfect = would have: habría ido." },
      { type: "fib", question: "Si hubiera podido, _____ _____ contigo. (ir)", answer: "habría ido", options: null, explanation: "Would have gone = habría ido." },
      { type: "mc", question: "'Habrán llegado ya' expresses:", answer: "Probability (They've probably arrived)", options: ["Certainty","Probability (They've probably arrived)","A command","A wish"], explanation: "Future perfect for past probability: they've probably arrived." },
      { type: "fib", question: "Ella _____ _____ si la hubieras invitado. (venir)", answer: "habría venido", options: null, explanation: "She would have come = habría venido." }
    ]
  },
  {
    id: "gram-39", title: "El estilo indirecto", titleEn: "Reported Speech", level: "B2", order: 39,
    content: `<h3>Reported Speech (Estilo Indirecto)</h3>
<p>When reporting what someone said, tenses shift back:</p>
<table><tr><th>Direct</th><th>Reported</th></tr>
<tr><td>Present → </td><td>Imperfect</td></tr>
<tr><td>Preterite → </td><td>Pluperfect</td></tr>
<tr><td>Future → </td><td>Conditional</td></tr>
<tr><td>Present perfect → </td><td>Pluperfect</td></tr></table>
<p><em>"Tengo hambre" → Dijo que <strong>tenía</strong> hambre.</em></p>
<p><em>"Iré mañana" → Dijo que <strong>iría</strong> al día siguiente.</em></p>
<p>Time/place words also change: <em>hoy → ese día, mañana → al día siguiente, aquí → allí, esto → eso</em>.</p>`,
    quiz: [
      { type: "mc", question: "'Dijo: Tengo frío' → reported:", answer: "Dijo que tenía frío", options: ["Dijo que tiene frío","Dijo que tenía frío","Dijo que tuvo frío","Dijo que tendría frío"], explanation: "Present → imperfect: tengo → tenía." },
      { type: "fib", question: "'Estudiaré mañana' → Dijo que _____ al día siguiente.", answer: "estudiaría", options: null, explanation: "Future → conditional: estudiaré → estudiaría." },
      { type: "mc", question: "In reported speech, 'hoy' becomes:", answer: "ese día", options: ["hoy","mañana","ese día","ayer"], explanation: "Hoy → ese día in reported speech." },
      { type: "fib", question: "'He comido' → Dijo que _____ _____.", answer: "había comido", options: null, explanation: "Present perfect → pluperfect: he comido → había comido." },
      { type: "mc", question: "If the reporting verb is present tense ('dice que'), do tenses shift?", answer: "No, they stay the same", options: ["Yes, always","No, they stay the same","Only future shifts","Only past shifts"], explanation: "If the main verb is present (dice), no tense shift needed." }
    ]
  },
  {
    id: "gram-40", title: "Usos avanzados de se", titleEn: "Advanced Uses of Se", level: "B2", order: 40,
    content: `<h3>Advanced Uses of Se</h3>
<p><strong>Se</strong> has multiple functions in Spanish:</p>
<ul>
<li><strong>Reflexive:</strong> <em>Ella <strong>se</strong> lava.</em> (She washes herself.)</li>
<li><strong>Reciprocal:</strong> <em>Ellos <strong>se</strong> quieren.</em> (They love each other.)</li>
<li><strong>Impersonal:</strong> <em><strong>Se</strong> dice que...</em> (It is said that... / People say...)</li>
<li><strong>Passive (pasiva refleja):</strong> <em><strong>Se</strong> venden casas.</em> (Houses are sold.)</li>
<li><strong>Accidental:</strong> <em><strong>Se</strong> me cayó el vaso.</em> (I dropped the glass — accidentally.)</li>
<li><strong>Replacement for le/les:</strong> <em><strong>Se</strong> lo di.</em> (I gave it to him/her.)</li>
</ul>
<p>The accidental se (<em>se me, se te, se le</em>) removes blame: <em>Se me olvidó</em> = It slipped my mind (not "I forgot").</p>`,
    quiz: [
      { type: "mc", question: "'Se venden libros' — what type of se?", answer: "Passive (pasiva refleja)", options: ["Reflexive","Reciprocal","Passive (pasiva refleja)","Accidental"], explanation: "Se + verb + noun (subject) = pasiva refleja." },
      { type: "fib", question: "_____ me cayó el teléfono. (accidental)", answer: "Se", options: null, explanation: "Accidental se: Se me cayó (it fell on me / I dropped it)." },
      { type: "mc", question: "'Se dice que va a llover' — what type of se?", answer: "Impersonal", options: ["Reflexive","Impersonal","Passive","Accidental"], explanation: "Se dice = it is said / people say (impersonal)." },
      { type: "mc", question: "'Se quieren mucho' means:", answer: "They love each other", options: ["They love themselves","They love each other","People love","One is loved"], explanation: "With plural subject: se = each other (reciprocal)." },
      { type: "fib", question: "_____ me olvidó la cita. (accidental se)", answer: "Se", options: null, explanation: "Accidental: Se me olvidó (it slipped my mind)." }
    ]
  },
  {
    id: "gram-41", title: "Las preposiciones", titleEn: "Prepositions (a, de, en, con)", level: "B2", order: 41,
    content: `<h3>Key Prepositions</h3>
<p><strong>A:</strong> direction/destination (<em>Voy <strong>a</strong> Madrid</em>), personal a (<em>Veo <strong>a</strong> María</em>), time (<em><strong>a</strong> las 3</em>), after ir/venir/llegar.</p>
<p><strong>De:</strong> origin (<em>Soy <strong>de</strong> Chile</em>), possession (<em>el libro <strong>de</strong> Juan</em>), material (<em><strong>de</strong> madera</em>), time (<em><strong>de</strong> noche</em>).</p>
<p><strong>En:</strong> location (<em>Estoy <strong>en</strong> casa</em>), transport (<em><strong>en</strong> avión</em>), time period (<em><strong>en</strong> enero</em>), manner (<em><strong>en</strong> voz alta</em>).</p>
<p><strong>Con:</strong> accompaniment (<em>Voy <strong>con</strong> María</em>), instrument (<em>cortar <strong>con</strong> tijeras</em>). Special: <em>conmigo, contigo, consigo</em>.</p>
<p><strong>Personal a:</strong> Required before direct objects that are specific people: <em>Conozco <strong>a</strong> tu hermano.</em></p>`,
    quiz: [
      { type: "fib", question: "Voy _____ la escuela. (to)", answer: "a", options: null, explanation: "Direction/destination: a la escuela." },
      { type: "mc", question: "Why do we say 'Veo a María' but 'Veo la mesa'?", answer: "Personal a is required before people as direct objects", options: ["María is a proper noun","Personal a is required before people as direct objects","'A' means 'the' here","It's optional"], explanation: "Personal a is used before specific people as direct objects." },
      { type: "fib", question: "El reloj es _____ oro. (made of)", answer: "de", options: null, explanation: "Material: de oro (made of gold)." },
      { type: "mc", question: "'Voy contigo' means:", answer: "I'm going with you", options: ["I'm going with me","I'm going with you","I'm going with him","I'm going alone"], explanation: "Con + ti = contigo (with you)." },
      { type: "fib", question: "Viajamos _____ avión. (by)", answer: "en", options: null, explanation: "Means of transport: en avión." }
    ]
  },
  {
    id: "gram-42", title: "Conectores del discurso", titleEn: "Discourse Connectors", level: "B2", order: 42,
    content: `<h3>Discourse Connectors</h3>
<p><strong>Adding information:</strong> <em>además</em> (moreover), <em>también</em> (also), <em>incluso</em> (even), <em>aparte de</em> (apart from).</p>
<p><strong>Contrasting:</strong> <em>sin embargo</em> (however), <em>no obstante</em> (nevertheless), <em>en cambio</em> (on the other hand), <em>aunque</em> (although), <em>a pesar de</em> (despite).</p>
<p><strong>Cause/effect:</strong> <em>porque</em> (because), <em>por eso</em> (therefore), <em>ya que</em> (since), <em>así que</em> (so), <em>como resultado</em> (as a result).</p>
<p><strong>Sequencing:</strong> <em>primero</em> (first), <em>luego/después</em> (then), <em>finalmente</em> (finally), <em>en primer lugar</em> (firstly), <em>por último</em> (lastly).</p>
<p><strong>Concluding:</strong> <em>en conclusión</em>, <em>en resumen</em> (in summary), <em>en definitiva</em> (ultimately).</p>`,
    quiz: [
      { type: "mc", question: "'Sin embargo' means:", answer: "However", options: ["Because","However","Also","Finally"], explanation: "Sin embargo = however/nevertheless." },
      { type: "fib", question: "No tengo dinero; _____ _____, no puedo ir. (therefore)", answer: "por eso", options: null, explanation: "Por eso = therefore/that's why." },
      { type: "mc", question: "Which connector adds information?", answer: "además", options: ["sin embargo","además","por eso","aunque"], explanation: "Además = moreover/in addition." },
      { type: "fib", question: "_____ de que llueve, hace frío. (despite/apart from)", answer: "Aparte", options: null, explanation: "Aparte de = apart from / besides the fact that." },
      { type: "mc", question: "'Ya que estás aquí, ayúdame' — 'ya que' means:", answer: "Since", options: ["Already","Since","Even though","When"], explanation: "Ya que = since/given that." }
    ]
  }
];
