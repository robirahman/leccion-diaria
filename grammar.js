const GRAMMAR_LEVELS = {
  A1: { name: 'Principiante', color: '#4CAF50' },
  A2: { name: 'Elemental', color: '#8BC34A' },
  B1: { name: 'Intermedio', color: '#FF9800' },
  B2: { name: 'Intermedio Alto', color: '#F44336' },
  C1: { name: 'Avanzado', color: '#9C27B0' },
  C2: { name: 'Maestría', color: '#311B92' }
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
      { type: "mc", question: "What gender is 'mesa'?", answer: "Feminine", options: ["Masculine","Feminine","Neuter","Both"], explanation: "'Mesa' ends in -a, so it's feminine: la mesa." },
      { type: "mc", question: "What gender is 'problema'?", answer: "Masculine", options: ["Masculine","Feminine","Neuter","It depends"], explanation: "Despite ending in -a, 'problema' is masculine (Greek origin -ma words): el problema." },
      { type: "mc", question: "Which ending typically indicates a feminine noun?", answer: "-ción", options: ["-or","-ción","-ma","-aje"], explanation: "Nouns ending in -ción are feminine: la nación, la educación." },
      { type: "fib", question: "Complete: ___ mano (the hand)", answer: "la", options: null, explanation: "'Mano' is feminine despite ending in -o: la mano." },
      { type: "mc", question: "Which noun is an exception to the -o = masculine rule?", answer: "mano", options: ["libro","mano","gato","vaso"], explanation: "'Mano' is feminine despite ending in -o: la mano." }
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
      { type: "mc", question: "Where do direct object pronouns (lo, la, los, las) go with conjugated verbs?", answer: "Before the verb", options: ["After the verb","Before the verb","Either position","Attached to the verb"], explanation: "Direct object pronouns go before conjugated verbs: Lo compro." },
      { type: "fib", question: "¿Las flores? ___ compré ayer.", answer: "Las", options: null, explanation: "Las flores (feminine plural) → las." },
      { type: "mc", question: "'Quiero verla' — where is the pronoun?", answer: "Attached to the infinitive", options: ["Before quiero","Attached to the infinitive","Between the verbs","After both verbs"], explanation: "Pronouns can attach to infinitives: ver + la = verla." },
      { type: "fib", question: "Ella ___ llama todos los días. (me)", answer: "me", options: null, explanation: "She calls me → Ella me llama." }
    ]
  },
  {
    id: "gram-17", title: "Pronombres de objeto indirecto", titleEn: "Indirect Object Pronouns", level: "A2", order: 17,
    content: `<h3>Indirect Object Pronouns</h3>
<table><tr><th>Person</th><th>Pronoun</th><th>Example</th></tr>
<tr><td>to me</td><td><strong>me</strong></td><td>Me da el libro. (He gives me the book.)</td></tr>
<tr><td>to you (tú)</td><td><strong>te</strong></td><td>Te digo la verdad. (I tell you the truth.)</td></tr>
<tr><td>to him/her/you</td><td><strong>le</strong></td><td>Le escribo una carta. (I write him/her a letter.)</td></tr>
<tr><td>to us</td><td><strong>nos</strong></td><td>Nos enseña español. (She teaches us Spanish.)</td></tr>
<tr><td>to them/you all</td><td><strong>les</strong></td><td>Les compro regalos. (I buy them gifts.)</td></tr></table>
<p>These pronouns indicate <strong>to/for whom</strong> an action is done. Use <em>a + name/pronoun</em> for clarity: <em><strong>Le</strong> doy el libro <strong>a María</strong></em>.</p>`,
    quiz: [
      { type: "fib", question: "___ doy un regalo a mi mamá.", answer: "Le", options: null, explanation: "To her (a mi mamá) → le." },
      { type: "mc", question: "In 'Le doy un libro', what does 'le' tell us?", answer: "To/for whom the action is done", options: ["What is given","To/for whom the action is done","Where it happens","How it is done"], explanation: "Indirect object pronouns tell us to whom or for whom: le = to him/her." },
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
<p>When both an indirect and direct object pronoun appear, the indirect comes first:</p>
<p><strong>Order: indirect + direct + verb</strong></p>
<p><em>Me lo da.</em> (He gives it to me.) — me (indirect) + lo (direct)</p>
<p><strong>Important rule:</strong> When both pronouns start with "l" (le/les + lo/la/los/las), change le/les to <strong>se</strong>:</p>
<p><em>Le lo doy</em> → <strong>Se lo doy.</strong> (I give it to him/her.)</p>
<p>With infinitives and gerunds, pronouns can attach: <em>Quiero dárselo</em> or <em>Se lo quiero dar</em>.</p>`,
    quiz: [
      { type: "mc", question: "'I give it (m.) to her' = ", answer: "Se lo doy", options: ["Le lo doy","Se lo doy","La lo doy","Lo se doy"], explanation: "Le + lo → se lo: Se lo doy." },
      { type: "fib", question: "¿La tarea? ___ ___ entrego mañana. (to you, it)", answer: "Te la", options: null, explanation: "te (to you) + la (it, fem.) = Te la entrego." },
      { type: "mc", question: "Why does 'le lo doy' become 'se lo doy'?", answer: "Two L-pronouns together are hard to pronounce", options: ["It's a grammar error","Two L-pronouns together are hard to pronounce","'Le' doesn't exist","Only in formal speech"], explanation: "When le/les meets lo/la/los/las, le/les changes to se for phonetic ease." },
      { type: "mc", question: "In 'Te lo doy' (I give it to you), which pronoun comes first?", answer: "The indirect (te — to you)", options: ["The direct (lo — it)","The indirect (te — to you)","Either can come first","It depends on the verb"], explanation: "Indirect always comes before direct: me lo, te la, se los." },
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
      { type: "fib", question: "\"For tomorrow, I will have finished the project.\" — Para mañana, yo _____ _____ el proyecto.", answer: "habré terminado", options: null, explanation: "Will have finished = habré terminado (future perfect)." },
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
      { type: "fib", question: "Conozco _____ tu hermano. (personal a)", answer: "a", options: null, explanation: "Personal a is required before specific people as direct objects: Conozco a tu hermano." },
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
  },
  // ===== C1 =====
  {
    id: "gram-43", title: "El subjuntivo pluscuamperfecto", titleEn: "Past Perfect Subjunctive", level: "C1", order: 43,
    content: `<h3>Past Perfect Subjunctive</h3>
<p>Formed with the <strong>imperfect subjunctive of haber</strong> + past participle: <em>hubiera/hubiese hablado</em>.</p>
<p><strong>Uses:</strong></p>
<ul>
<li>Unreal past conditions: <em>Si hubiera sabido, habría venido.</em> (If I had known, I would have come.)</li>
<li>Wishes about the past: <em>Ojalá hubieras estado allí.</em> (I wish you had been there.)</li>
<li>After expressions of emotion about past events: <em>Me alegré de que hubieran llegado a tiempo.</em></li>
</ul>
<p><strong>Two forms:</strong> -ra (hubiera) and -se (hubiese) are interchangeable in most contexts.</p>`,
    quiz: [
      { type: "mc", question: "Complete: Si yo lo _____ (saber), te habría avisado.", answer: "hubiera sabido", options: ["hubiera sabido","habría sabido","haya sabido","sabría"], explanation: "Si + pluperfect subjunctive for unreal past conditions." },
      { type: "fib", question: "Ojalá tú _____ _____ allí. (haber + estar, past perfect subj.)", answer: "hubieras estado", options: null, explanation: "Hubiera/hubieras + past participle for wishes about the past." },
      { type: "mc", question: "Which two forms of the past perfect subjunctive are interchangeable?", answer: "-ra and -se forms", options: ["-ra and -se forms","-ra and -ría forms","-se and -ado forms","-re and -ra forms"], explanation: "Hubiera/hubiese are both valid past perfect subjunctive forms." },
      { type: "fib", question: "Me sorprendió que no _____ _____ (haber + venir, ellos).", answer: "hubieran venido", options: null, explanation: "Past perfect subjunctive after expressions of emotion about past events." },
      { type: "mc", question: "'Si hubiésemos llegado antes, habríamos conseguido entradas.' What does 'hubiésemos llegado' express?", answer: "An unreal past action", options: ["A future possibility","A present habit","An unreal past action","A command"], explanation: "The -se form of the past perfect subjunctive expresses unrealized past actions." }
    ]
  },
  {
    id: "gram-44", title: "Condicionales mixtas", titleEn: "Mixed Conditionals", level: "C1", order: 44,
    content: `<h3>Mixed Conditionals</h3>
<p>Mixed conditionals combine different time frames between the <em>si</em> clause and the main clause.</p>
<p><strong>Type 1 — Past condition → Present result:</strong><br>
<em>Si hubiera estudiado medicina, ahora sería médico.</em> (If I had studied medicine, I would be a doctor now.)</p>
<p><strong>Type 2 — Present condition → Past result:</strong><br>
<em>Si fuera más valiente, habría hablado ayer.</em> (If I were braver, I would have spoken yesterday.)</p>
<p><strong>Type 3 — De + infinitive compound (formal alternative):</strong><br>
<em>De haberlo sabido, no habría venido.</em> (Had I known, I wouldn't have come.)</p>`,
    quiz: [
      { type: "mc", question: "'Si hubiera ahorrado más, ahora tendría una casa.' This is:", answer: "Past condition → present result", options: ["Past condition → present result","Present condition → past result","Future condition → present result","Past condition → past result"], explanation: "Pluperfect subjunctive (past) + conditional (present) = mixed conditional type 1." },
      { type: "fib", question: "Si yo _____ más alto, habría jugado al baloncesto. (ser, imperfect subj.)", answer: "fuera", options: null, explanation: "Present condition (being tall) → past result (would have played)." },
      { type: "mc", question: "'De haberlo sabido' is equivalent to:", answer: "Si lo hubiera sabido", options: ["Si lo sabía","Si lo hubiera sabido","Si lo sepa","Si lo sabrá"], explanation: "De + compound infinitive is a formal alternative to si + pluperfect subjunctive." },
      { type: "fib", question: "De _____ _____ antes, habríamos conseguido mesa. (llegar, compound inf.)", answer: "haber llegado", options: null, explanation: "De haber llegado = Si hubiéramos llegado." },
      { type: "mc", question: "Which combination creates a mixed conditional with present condition → past result?", answer: "Imperfect subjunctive + conditional perfect", options: ["Imperfect subjunctive + conditional perfect","Pluperfect subjunctive + conditional","Present subjunctive + preterite","Imperfect + conditional"], explanation: "Si fuera (present unreal) + habría hecho (past unreal result)." }
    ]
  },
  {
    id: "gram-45", title: "La voz pasiva", titleEn: "Passive Voice", level: "C1", order: 45,
    content: `<h3>Passive Voice</h3>
<p><strong>Ser + participle (passive with agent):</strong><br>
<em>El libro fue escrito por Cervantes.</em> (The book was written by Cervantes.)</p>
<p>The participle agrees in gender and number with the subject: <em>Las cartas fueron enviadas.</em></p>
<p><strong>Se pasiva (passive se, no agent):</strong><br>
<em>Se hablan muchos idiomas aquí.</em> (Many languages are spoken here.)</p>
<p><strong>Estar + participle (resultant state):</strong><br>
<em>La puerta está cerrada.</em> (The door is closed.) — describes the state, not the action.</p>
<p><strong>Key distinction:</strong> Spanish strongly prefers <em>se</em> constructions or active voice over <em>ser</em> passives in everyday speech. <em>Ser</em> passives are more common in formal/written registers.</p>`,
    quiz: [
      { type: "mc", question: "'La carta fue escrita por María.' The participle 'escrita' agrees with:", answer: "la carta (feminine singular)", options: ["María","la carta (feminine singular)","fue","por"], explanation: "In ser-passives, the participle agrees with the subject." },
      { type: "fib", question: "Se _____ muchos idiomas en Suiza. (hablar)", answer: "hablan", options: null, explanation: "Se pasiva: se + verb agrees with the logical subject (idiomas)." },
      { type: "mc", question: "'La puerta está cerrada' expresses:", answer: "A resultant state", options: ["An action in progress","A resultant state","A habitual action","A future event"], explanation: "Estar + participle describes a state resulting from an action." },
      { type: "fib", question: "Los cuadros _____ _____ por Picasso. (ser + pintar, preterite)", answer: "fueron pintados", options: null, explanation: "Ser passive: fueron (preterite of ser) + pintados (agrees with cuadros, masc. pl.)." },
      { type: "mc", question: "Which passive construction is preferred in everyday spoken Spanish?", answer: "Se pasiva", options: ["Ser + participle","Se pasiva","Estar + participle","Haber + participle"], explanation: "Spanish prefers se constructions over ser passives in speech." }
    ]
  },
  {
    id: "gram-46", title: "Nominalizaciones", titleEn: "Nominalizations (lo + adj, el que, lo que)", level: "C1", order: 46,
    content: `<h3>Nominalizations</h3>
<p><strong>Lo + adjective</strong> = "the … thing/part":<br>
<em>Lo bueno es que tenemos tiempo.</em> (The good thing is we have time.)<br>
<em>Lo difícil fue el examen.</em> (The hard part was the exam.)</p>
<p><strong>Lo que</strong> = "what / that which":<br>
<em>Lo que dices es verdad.</em> (What you say is true.)<br>
<em>No entiendo lo que quieres.</em> (I don't understand what you want.)</p>
<p><strong>El/la/los/las que</strong> = "the one(s) who/that":<br>
<em>El que llegue primero gana.</em> (The one who arrives first wins.)<br>
<em>Las que compraste son bonitas.</em> (The ones you bought are pretty.)</p>
<p><strong>Lo + adjective/adverb + que</strong> = emphasizes degree:<br>
<em>No sabes lo cansado que estoy.</em> (You don't know how tired I am.)</p>`,
    quiz: [
      { type: "mc", question: "'Lo bueno es que tenemos tiempo.' What does 'lo bueno' mean?", answer: "The good thing", options: ["The good man","The good thing","Very good","He is good"], explanation: "Lo + adjective creates an abstract noun: 'the [adj] thing/part'." },
      { type: "fib", question: "No entiendo _____ _____ dices. (what you say)", answer: "lo que", options: null, explanation: "Lo que = what / that which." },
      { type: "mc", question: "'El que llegue primero gana.' Why is 'llegue' in subjunctive?", answer: "The person is unknown/hypothetical", options: ["It's a command","The person is unknown/hypothetical","It's in the past","It's a wish"], explanation: "Subjunctive after el que when referring to an unknown/unspecified person." },
      { type: "fib", question: "No sabes _____ difícil _____ es. (how difficult it is)", answer: "lo", options: null, explanation: "Lo + adj + que emphasizes degree: lo difícil que = how difficult." },
      { type: "mc", question: "'Las que compraste son bonitas.' 'Las que' refers to:", answer: "The ones (feminine) that", options: ["The women who","The ones (feminine) that","What you bought","Those pretty things"], explanation: "Las que = the ones (fem.) that — replaces a feminine plural noun." }
    ]
  },
  {
    id: "gram-47", title: "Cláusulas relativas avanzadas", titleEn: "Advanced Relative Clauses", level: "C1", order: 47,
    content: `<h3>Advanced Relative Clauses</h3>
<p><strong>Cuyo/a/os/as</strong> = "whose" (agrees with the possessed noun):<br>
<em>El autor cuya novela leímos es colombiano.</em> (The author whose novel we read is Colombian.)</p>
<p><strong>El cual / la cual / los cuales / las cuales</strong> — formal, used after prepositions:<br>
<em>La empresa para la cual trabajo es internacional.</em></p>
<p><strong>Donde</strong> = "where" (replaces en que/en el que):<br>
<em>La ciudad donde nací es pequeña.</em></p>
<p><strong>Indicative vs. subjunctive in relative clauses:</strong><br>
Indicative for known referents: <em>Busco al profesor que habla francés.</em> (I'm looking for the specific teacher who speaks French.)<br>
Subjunctive for unknown/nonexistent referents: <em>Busco un profesor que hable francés.</em> (I'm looking for any teacher who speaks French.)</p>`,
    quiz: [
      { type: "mc", question: "'El escritor cuya obra es famosa...' 'Cuya' agrees with:", answer: "obra (feminine singular)", options: ["el escritor","cuya","obra (feminine singular)","famosa"], explanation: "Cuyo agrees with the possessed noun, not the possessor." },
      { type: "fib", question: "La empresa para la _____ trabajo es grande. (which, formal)", answer: "cual", options: null, explanation: "El/la cual is the formal relative pronoun used after prepositions." },
      { type: "mc", question: "'Busco un apartamento que tenga balcón.' Why subjunctive?", answer: "The apartment is unspecified/hypothetical", options: ["It's a command","The apartment is unspecified/hypothetical","It's in the past","It expresses certainty"], explanation: "Subjunctive in relative clauses when the antecedent is unknown or nonexistent." },
      { type: "fib", question: "La ciudad _____ nací es pequeña. (where)", answer: "donde", options: null, explanation: "Donde replaces en que / en la que for places." },
      { type: "mc", question: "'Los estudiantes cuyos exámenes aprobé...' 'Cuyos' is:", answer: "Masculine plural, agreeing with 'exámenes'", options: ["Masculine plural, agreeing with 'exámenes'","Masculine plural, agreeing with 'estudiantes'","A verb form","An adverb"], explanation: "Cuyos agrees with the possessed noun (exámenes), not the possessor (estudiantes)." }
    ]
  },
  {
    id: "gram-48", title: "Perífrasis verbales", titleEn: "Verbal Periphrasis", level: "C1", order: 48,
    content: `<h3>Verbal Periphrasis</h3>
<p>Verb combinations where the first verb modifies the meaning of the second.</p>
<p><strong>Aspectual (beginning):</strong> <em>empezar a + inf, ponerse a + inf, echarse a + inf</em><br>
<em>Se puso a llorar.</em> (She started to cry.)</p>
<p><strong>Aspectual (ongoing):</strong> <em>seguir/continuar + gerund, llevar + time + gerund, andar + gerund</em><br>
<em>Llevo dos horas esperando.</em> (I've been waiting for two hours.)</p>
<p><strong>Aspectual (completion):</strong> <em>acabar de + inf, dejar de + inf, terminar de + inf</em><br>
<em>Acabo de llegar.</em> (I just arrived.)</p>
<p><strong>Modal:</strong> <em>tener que + inf, deber + inf, haber de + inf, poder + inf, soler + inf</em><br>
<em>Suelo desayunar a las ocho.</em> (I usually have breakfast at eight.)</p>
<p><strong>Other:</strong> <em>volver a + inf</em> (to do again), <em>ir a + inf</em> (going to), <em>quedar(se) + gerund/participle</em></p>`,
    quiz: [
      { type: "mc", question: "'Llevo tres años viviendo aquí.' This expresses:", answer: "Duration of an ongoing action", options: ["A completed action","Duration of an ongoing action","A future plan","A habitual past action"], explanation: "Llevar + time + gerund = have been doing something for [time]." },
      { type: "fib", question: "_____ de llegar a casa. (I just [arrived])", answer: "Acabo", options: null, explanation: "Acabar de + infinitive = to have just done something." },
      { type: "mc", question: "'Se puso a llorar' means:", answer: "She started to cry", options: ["She stopped crying","She started to cry","She kept crying","She was about to cry"], explanation: "Ponerse a + infinitive = to start doing something (suddenly)." },
      { type: "fib", question: "_____ desayunar a las siete. (I usually, soler)", answer: "Suelo", options: null, explanation: "Soler + infinitive = to usually/tend to do something." },
      { type: "mc", question: "'Volvió a llamar' means:", answer: "He called again", options: ["He returned the call","He called again","He stopped calling","He was calling"], explanation: "Volver a + infinitive = to do something again." }
    ]
  },
  {
    id: "gram-49", title: "Usos avanzados del infinitivo y gerundio", titleEn: "Advanced Infinitive and Gerund Uses", level: "C1", order: 49,
    content: `<h3>Advanced Infinitive and Gerund Uses</h3>
<p><strong>Infinitive as subject:</strong> <em>Viajar es aprender.</em> (To travel is to learn.)</p>
<p><strong>Al + infinitive</strong> = "upon/when doing":<br>
<em>Al salir de casa, empezó a llover.</em> (Upon leaving the house, it started to rain.)</p>
<p><strong>De + infinitive</strong> = conditional meaning:<br>
<em>De haberlo sabido, habría venido.</em> (Had I known, I would have come.)</p>
<p><strong>Gerund restrictions:</strong></p>
<ul>
<li>Cannot modify nouns like adjectives: ✗ <em>*una carta conteniendo información</em> → ✓ <em>una carta que contiene información</em></li>
<li>Exceptions: <em>agua hirviendo</em> (boiling water), <em>ardiendo</em> (burning)</li>
</ul>
<p><strong>Gerund with perception verbs:</strong> <em>La vi saliendo del cine.</em> (I saw her leaving the cinema.)</p>`,
    quiz: [
      { type: "mc", question: "'Al llegar a Madrid, llamó a su madre.' 'Al + infinitive' means:", answer: "Upon/When arriving", options: ["Before arriving","Upon/When arriving","After arriving","Instead of arriving"], explanation: "Al + infinitive = upon/when doing something." },
      { type: "fib", question: "_____ haberlo sabido, no habría venido. (Had I known — de + inf.)", answer: "De", options: null, explanation: "De + compound infinitive = conditional meaning (if I had...)." },
      { type: "mc", question: "Which is INCORRECT use of the gerund in Spanish?", answer: "Una caja conteniendo libros", options: ["Sigo estudiando","La vi saliendo","Una caja conteniendo libros","Llevo horas trabajando"], explanation: "Gerunds cannot modify nouns like adjectives in Spanish (unlike English)." },
      { type: "fib", question: "_____ es vivir. (To dream — infinitive as subject)", answer: "Soñar", options: null, explanation: "Infinitives function as nouns/subjects in Spanish." },
      { type: "mc", question: "'Lo oí cantando.' The gerund here describes:", answer: "The action perceived (him singing)", options: ["The subject's action","The action perceived (him singing)","A noun","A future event"], explanation: "Gerund with perception verbs describes the action being perceived." }
    ]
  },
  {
    id: "gram-50", title: "Diminutivos, aumentativos y peyorativos", titleEn: "Diminutives, Augmentatives, and Pejoratives", level: "C1", order: 50,
    content: `<h3>Diminutives, Augmentatives, and Pejoratives</h3>
<p><strong>Diminutives</strong> (-ito/a, -illo/a, -ico/a): smallness, affection, or softening:<br>
<em>casita</em> (little house), <em>momentito</em> (just a moment), <em>pobrecito</em> (poor little thing)</p>
<p><strong>Regional variations:</strong> -ito (most common), -ico (Aragón, Colombia, Costa Rica), -ín (Asturias)</p>
<p><strong>Augmentatives</strong> (-ón/ona, -azo/a, -ote/a): largeness or intensity:<br>
<em>hombrón</em> (big man), <em>cochazo</em> (great car), <em>grandote</em> (really big)</p>
<p><strong>Pejoratives</strong> (-ucho/a, -ejo/a, -astro/a): negative connotation:<br>
<em>casucha</em> (run-down house), <em>palabreja</em> (strange/ugly word), <em>poetastro</em> (bad poet)</p>
<p><strong>Note:</strong> Some have lexicalized: <em>bolsillo</em> (pocket, from bolsa), <em>sillón</em> (armchair, from silla).</p>`,
    quiz: [
      { type: "mc", question: "'Casita' uses which type of suffix?", answer: "Diminutive", options: ["Diminutive","Augmentative","Pejorative","Superlative"], explanation: "-ita is a diminutive suffix expressing smallness or affection." },
      { type: "fib", question: "Un coche muy impresionante → un coch_____ (augmentative with -azo)", answer: "cochazo", options: null, explanation: "-azo augmentative: cochazo = great/impressive car." },
      { type: "mc", question: "'Casucha' conveys:", answer: "A negative opinion of the house", options: ["A tiny, cute house","A big house","A negative opinion of the house","A formal house"], explanation: "-ucha is a pejorative suffix expressing negative quality." },
      { type: "fib", question: "Espera un moment_____. (just a moment, diminutive)", answer: "momentito", options: null, explanation: "Momentito = just a moment — diminutive softens the request." },
      { type: "mc", question: "'Sillón' (armchair) comes from 'silla' (chair) with suffix -ón. This is:", answer: "A lexicalized augmentative", options: ["A regular augmentative","A lexicalized augmentative","A diminutive","A pejorative"], explanation: "Some augmentatives have become independent words (lexicalized)." }
    ]
  },
  {
    id: "gram-51", title: "El subjuntivo en cláusulas independientes", titleEn: "Subjunctive in Independent Clauses", level: "C1", order: 51,
    content: `<h3>Subjunctive in Independent Clauses</h3>
<p>The subjunctive can appear in main clauses (not just subordinate):</p>
<p><strong>Wishes:</strong> <em>¡Ojalá llueva!</em> (I hope it rains!) / <em>¡Ojalá hubiera llovido!</em> (I wish it had rained!)</p>
<p><strong>Doubt/possibility:</strong> <em>Quizás venga mañana.</em> (Maybe he'll come tomorrow.) / <em>Tal vez sea cierto.</em> (Maybe it's true.)</p>
<p><strong>Exclamatory wishes:</strong> <em>¡Que tengas buen viaje!</em> (Have a good trip!) / <em>¡Que descanses!</em> (Rest well!)</p>
<p><strong>Concessive:</strong> <em>Sea lo que sea…</em> (Whatever it may be…) / <em>Digan lo que digan…</em> (Whatever they say…)</p>
<p><strong>Note on quizás/tal vez:</strong> Indicative can also be used to express greater certainty: <em>Quizás viene mañana.</em> (higher confidence).</p>`,
    quiz: [
      { type: "mc", question: "'¡Ojalá pudiera volar!' expresses:", answer: "An unreal wish about the present", options: ["A command","An unreal wish about the present","A certainty","A past event"], explanation: "Ojalá + imperfect subjunctive = wish about something unlikely/unreal." },
      { type: "fib", question: "¡Que _____ buen viaje! (tener, tú — exclamatory wish)", answer: "tengas", options: null, explanation: "¡Que + subjunctive! for exclamatory wishes." },
      { type: "mc", question: "'Quizás venga mañana' vs. 'Quizás viene mañana.' The subjunctive version expresses:", answer: "More doubt/uncertainty", options: ["More certainty","More doubt/uncertainty","Past tense","A command"], explanation: "Subjunctive after quizás/tal vez expresses greater uncertainty." },
      { type: "fib", question: "_____ lo que sea, no me rindo. (ser, concessive: whatever it may be)", answer: "Sea", options: null, explanation: "Sea lo que sea = whatever it may be — concessive subjunctive." },
      { type: "mc", question: "'Digan lo que digan, seguiré adelante.' This structure is:", answer: "A concessive subjunctive construction", options: ["A conditional","A concessive subjunctive construction","A relative clause","Reported speech"], explanation: "Verb (subj.) + lo que + verb (subj.) = whatever/no matter what." }
    ]
  },
  {
    id: "gram-52", title: "Registro y formalidad", titleEn: "Register and Formality", level: "C1", order: 52,
    content: `<h3>Register and Formality</h3>
<p><strong>Forms of address:</strong></p>
<ul>
<li><strong>Tú</strong> — informal singular (Spain & Latin America)</li>
<li><strong>Usted</strong> — formal singular (verb in 3rd person)</li>
<li><strong>Vos</strong> — informal singular in Argentina, Uruguay, Central America (special conjugations)</li>
<li><strong>Vosotros</strong> — informal plural (Spain only)</li>
<li><strong>Ustedes</strong> — plural in Latin America (all contexts) and formal plural in Spain</li>
</ul>
<p><strong>Voseo conjugations (present):</strong> <em>vos hablás, vos tenés, vos vivís</em></p>
<p><strong>Formal writing markers:</strong> passive voice, subjunctive, longer sentences, discourse connectors.</p>
<p><strong>Informal speech markers:</strong> diminutives, colloquialisms, filler words (<em>pues, bueno, o sea, es que</em>).</p>`,
    quiz: [
      { type: "mc", question: "In Argentina, 'tú tienes' becomes:", answer: "vos tenés", options: ["vos tenés","vos tienes","usted tiene","tú tenéis"], explanation: "Voseo: vos + stressed final syllable (tenés, hablás, vivís)." },
      { type: "fib", question: "In Spain, 'ustedes' is used for _____ plural contexts. (formal/informal)", answer: "formal", options: null, explanation: "In Spain, ustedes is formal plural; vosotros is informal plural." },
      { type: "mc", question: "Which is a marker of informal spoken Spanish?", answer: "Using diminutives and filler words", options: ["Using passive voice","Using diminutives and filler words","Using subjunctive extensively","Using long complex sentences"], explanation: "Informal speech uses diminutives, fillers (bueno, o sea, pues), and colloquialisms." },
      { type: "fib", question: "'Vos _____ muy bien.' (hablar, voseo present)", answer: "hablás", options: null, explanation: "Voseo present: -ás (ar), -és (er), -ís (ir)." },
      { type: "mc", question: "'Vosotros' is used only in:", answer: "Spain", options: ["Argentina","Spain","Mexico","All Spanish-speaking countries"], explanation: "Vosotros is exclusive to Spain for informal plural address." }
    ]
  },
  // ===== C2 =====
  {
    id: "gram-53", title: "El pretérito anterior", titleEn: "Preterite Perfect (Literary Tense)", level: "C2", order: 53,
    content: `<h3>Preterite Perfect (Pretérito Anterior)</h3>
<p>Formed with the <strong>preterite of haber</strong> + past participle: <em>hube hablado, hubiste comido</em>.</p>
<p><strong>Use:</strong> Expresses an action completed immediately before another past action. Found almost exclusively in <strong>literary and formal written</strong> Spanish.</p>
<p><em>Apenas hubo terminado de hablar, se marchó.</em> (As soon as he had finished speaking, he left.)</p>
<p><strong>Trigger words:</strong> <em>apenas, en cuanto, tan pronto como, después de que, cuando</em></p>
<p><strong>In modern Spanish:</strong> This tense is virtually extinct in speech and rare even in writing. It is replaced by the simple preterite or pluperfect: <em>Apenas terminó de hablar, se marchó.</em></p>`,
    quiz: [
      { type: "mc", question: "The pretérito anterior is formed with:", answer: "Preterite of haber + past participle", options: ["Preterite of haber + past participle","Imperfect of haber + past participle","Present of haber + past participle","Preterite of ser + past participle"], explanation: "Hube, hubiste, hubo, hubimos, hubisteis, hubieron + participle." },
      { type: "fib", question: "Apenas _____ terminado, se fue. (haber, él, pretérito anterior)", answer: "hubo", options: null, explanation: "Hubo terminado = he had (just) finished — preterite of haber." },
      { type: "mc", question: "Where is the pretérito anterior primarily found today?", answer: "Literary and formal texts", options: ["Everyday speech","Literary and formal texts","Informal writing","News broadcasts"], explanation: "This tense is virtually extinct in speech, found only in literature." },
      { type: "fib", question: "En cuanto _____ _____ la noticia, salió corriendo. (haber + recibir, ella)", answer: "hubo recibido", options: null, explanation: "Hubo recibido = as soon as she had received." },
      { type: "mc", question: "In modern spoken Spanish, the pretérito anterior is typically replaced by:", answer: "The simple preterite or pluperfect", options: ["The present perfect","The simple preterite or pluperfect","The future perfect","The conditional perfect"], explanation: "Modern Spanish uses preterite or pluperfect instead of this literary tense." }
    ]
  },
  {
    id: "gram-54", title: "El futuro de subjuntivo", titleEn: "Future Subjunctive (Literary/Legal)", level: "C2", order: 54,
    content: `<h3>Future Subjunctive</h3>
<p>An archaic tense surviving in <strong>legal texts, proverbs, and set phrases</strong>.</p>
<p><strong>Formation:</strong> Same stem as imperfect subjunctive (-ra form), but with endings: <em>-re, -res, -re, -remos, -reis, -ren</em>.</p>
<p><em>hablar → hablare, hablares, hablare, habláremos, hablareis, hablaren</em></p>
<p><strong>Legal usage:</strong> <em>Si el acusado no compareciere ante el tribunal…</em> (If the defendant does not appear before the court…)</p>
<p><strong>Proverbs:</strong> <em>Donde fueres, haz lo que vieres.</em> (When in Rome, do as the Romans do. — lit. "Wherever you go, do what you see.")</p>
<p><strong>Set phrases:</strong> <em>sea lo que fuere</em> (be that as it may), <em>venga lo que viniere</em> (come what may).</p>`,
    quiz: [
      { type: "mc", question: "The future subjunctive is primarily found in:", answer: "Legal texts and proverbs", options: ["Everyday conversation","Legal texts and proverbs","News articles","Informal writing"], explanation: "This archaic tense survives mainly in legal language and fixed expressions." },
      { type: "fib", question: "Donde _____, haz lo que vieres. (ir, future subj., tú)", answer: "fueres", options: null, explanation: "Fueres = future subjunctive of ir (wherever you may go)." },
      { type: "mc", question: "The future subjunctive shares its stem with:", answer: "The imperfect subjunctive (-ra form)", options: ["The present subjunctive","The imperfect subjunctive (-ra form)","The future indicative","The conditional"], explanation: "Same stem as -ra form but with -re/-res/-re/-remos/-reis/-ren endings." },
      { type: "fib", question: "Si el contrato no se _____ en el plazo establecido… (cumplir, future subj.)", answer: "cumpliere", options: null, explanation: "Legal language: cumpliere = future subjunctive of cumplir." },
      { type: "mc", question: "'Sea lo que fuere' means:", answer: "Be that as it may", options: ["Whatever happens","Be that as it may","As long as it lasts","If it were so"], explanation: "A set phrase using future subjunctive: sea lo que fuere = be that as it may." }
    ]
  },
  {
    id: "gram-55", title: "Colocación avanzada de clíticos", titleEn: "Advanced Clitic Placement and Climbing", level: "C2", order: 55,
    content: `<h3>Advanced Clitic Placement and Climbing</h3>
<p><strong>Basic rule:</strong> Clitics (me, te, lo, la, le, nos, os, los, las, les, se) attach to conjugated verbs before the verb, and after infinitives, gerunds, and affirmative commands.</p>
<p><strong>Clitic climbing:</strong> With verb chains, clitics can "climb" from the infinitive/gerund to the conjugated verb:<br>
<em>Quiero verlo</em> = <em>Lo quiero ver</em> (I want to see it)</p>
<p><strong>Double clitics order:</strong> se > te/os > me/nos > lo/la/los/las<br>
<em>Se lo dije.</em> (I told it to him.) — le → se before lo/la.</p>
<p><strong>With compound tenses:</strong> Clitics go before haber, never between haber and participle:<br>
<em>Se lo he dicho.</em> ✓ / <em>*He se lo dicho.</em> ✗</p>
<p><strong>Emphasis through clitic doubling:</strong> <em>A María le regalé un libro.</em> (To María, I gave her a book.)</p>`,
    quiz: [
      { type: "mc", question: "'Quiero decírtelo' can also be written as:", answer: "Te lo quiero decir", options: ["Te lo quiero decir","Quiero te lo decir","Lo te quiero decir","Quiero decir te lo"], explanation: "Clitic climbing: clitics move before the conjugated verb, maintaining order." },
      { type: "fib", question: "_____ _____ he explicado muchas veces. (it to you, masc.)", answer: "Te lo", options: null, explanation: "Te (indirect) + lo (direct) before the conjugated verb (he)." },
      { type: "mc", question: "Why does 'le lo' become 'se lo'?", answer: "Le changes to se before lo/la/los/las", options: ["It's a spelling rule","Le changes to se before lo/la/los/las","Se is always used for third person","It's optional"], explanation: "When le/les precedes lo/la/los/las, le/les → se to avoid cacophony." },
      { type: "fib", question: "A María _____ regalé un libro. (clitic doubling, indirect)", answer: "le", options: null, explanation: "Clitic doubling: A + noun requires the redundant indirect object pronoun." },
      { type: "mc", question: "Where do clitics go in compound tenses?", answer: "Before the auxiliary (haber)", options: ["After the participle","Between haber and participle","Before the auxiliary (haber)","After the entire verb phrase"], explanation: "Clitics always precede haber: Se lo he dicho, not *He se lo dicho." }
    ]
  },
  {
    id: "gram-56", title: "Leísmo, laísmo, loísmo", titleEn: "Pronoun Dialectal Variation", level: "C2", order: 56,
    content: `<h3>Leísmo, Laísmo, Loísmo</h3>
<p><strong>Standard system:</strong></p>
<ul>
<li>Direct object: <em>lo/la/los/las</em> — <em>Lo vi.</em> (I saw him/it.)</li>
<li>Indirect object: <em>le/les</em> — <em>Le dije la verdad.</em> (I told him the truth.)</li>
</ul>
<p><strong>Leísmo:</strong> Using <em>le</em> as direct object for masculine persons: <em>Le vi ayer.</em> (I saw him yesterday.) — Accepted by RAE for singular masculine persons. Common in central/northern Spain.</p>
<p><strong>Laísmo:</strong> Using <em>la</em> as indirect object for feminine: <em>*La dije que viniera.</em> (I told her to come.) — Not accepted by RAE. Common in Madrid and Castile.</p>
<p><strong>Loísmo:</strong> Using <em>lo</em> as indirect object: <em>*Lo dije que viniera.</em> — Not accepted by RAE. Rare and stigmatized.</p>
<p><strong>Latin American standard:</strong> Generally follows the etymological (standard) system consistently.</p>`,
    quiz: [
      { type: "mc", question: "'Le vi en la calle' (referring to a man) is an example of:", answer: "Leísmo", options: ["Leísmo","Laísmo","Loísmo","Standard usage"], explanation: "Using le as direct object (instead of lo) for a masculine person = leísmo." },
      { type: "fib", question: "The RAE accepts leísmo for _____ masculine persons only. (singular/plural)", answer: "singular", options: null, explanation: "Leísmo de persona singular masculino is the only tolerated form." },
      { type: "mc", question: "'*La dije la verdad' (to a woman) is an example of:", answer: "Laísmo", options: ["Leísmo","Laísmo","Loísmo","Standard usage"], explanation: "Using la as indirect object = laísmo (not accepted by RAE)." },
      { type: "fib", question: "The standard direct object pronoun for 'him' is _____. (lo/le)", answer: "lo", options: null, explanation: "Standard (etymological) system: lo = direct object masculine." },
      { type: "mc", question: "Which region generally follows the standard pronoun system?", answer: "Latin America", options: ["Central Spain","Madrid","Latin America","Castile"], explanation: "Latin America generally maintains the etymological distinction consistently." }
    ]
  },
  {
    id: "gram-57", title: "Cohesión del discurso", titleEn: "Discourse Cohesion and Analysis", level: "C2", order: 57,
    content: `<h3>Discourse Cohesion and Analysis</h3>
<p><strong>Anáfora</strong> — referring back to something already mentioned:<br>
<em>María llegó tarde. <u>Ella</u> no encontraba las llaves.</em></p>
<p><strong>Catáfora</strong> — referring forward to something not yet mentioned:<br>
<em><u>Lo</u> que te voy a decir es importante.</em></p>
<p><strong>Elipsis</strong> — omitting elements recoverable from context:<br>
<em>Juan compró manzanas y Pedro [compró] naranjas.</em></p>
<p><strong>Thematic progression:</strong></p>
<ul>
<li><strong>Linear:</strong> The rheme of one sentence becomes the theme of the next.</li>
<li><strong>Constant:</strong> The same theme is maintained across sentences.</li>
<li><strong>Derived:</strong> Multiple themes derive from a general hyper-theme.</li>
</ul>
<p><strong>Coherence markers:</strong> <em>en primer lugar, por otro lado, en definitiva, dicho de otro modo, es decir</em></p>`,
    quiz: [
      { type: "mc", question: "'Lo que te voy a decir es importante.' The 'lo' here is an example of:", answer: "Catáfora", options: ["Anáfora","Catáfora","Elipsis","Deixis"], explanation: "Catáfora points forward to information that follows." },
      { type: "fib", question: "Juan come manzanas y Pedro _____ naranjas. (omitted verb — what device?)", answer: "elipsis", options: null, explanation: "Elipsis: the verb 'come' is omitted because it's recoverable from context." },
      { type: "mc", question: "'María llegó tarde. Ella no encontraba las llaves.' 'Ella' is:", answer: "An anaphoric reference", options: ["An anaphoric reference","A cataphoric reference","An ellipsis","A connector"], explanation: "Anáfora refers back to a previously mentioned element (María)." },
      { type: "fib", question: "'_____ _____, quiero agradecer a todos.' (In the first place — discourse marker)", answer: "En primer lugar", options: null, explanation: "En primer lugar = in the first place — a sequencing discourse marker." },
      { type: "mc", question: "'Es decir' is used to:", answer: "Reformulate or clarify", options: ["Contrast ideas","Reformulate or clarify","Add information","Conclude"], explanation: "Es decir = that is to say / in other words — reformulation marker." }
    ]
  },
  {
    id: "gram-58", title: "Matices del subjuntivo", titleEn: "Subjunctive Nuance: Pluperfect vs Imperfect", level: "C2", order: 58,
    content: `<h3>Subjunctive Nuance</h3>
<p><strong>Imperfect subjunctive -ra as conditional:</strong> In formal/literary style, the -ra form can replace the conditional:<br>
<em>Quisiera hablar con usted.</em> = <em>Querría hablar con usted.</em> (I would like to speak with you.)</p>
<p><strong>Imperfect vs. pluperfect subjunctive in si-clauses:</strong></p>
<ul>
<li><em>Si tuviera dinero, viajaría.</em> (present/future unreal — imperfect subj.)</li>
<li><em>Si hubiera tenido dinero, habría viajado.</em> (past unreal — pluperfect subj.)</li>
</ul>
<p><strong>-ra form as pluperfect indicative (literary):</strong><br>
<em>El castillo que construyera Alfonso X…</em> = <em>que había construido</em> (that Alfonso X had built)</p>
<p><strong>Subjunctive in polite requests:</strong><br>
<em>Quisiera un café.</em> (softer than <em>Quiero</em>)<br>
<em>¿Pudiera usted ayudarme?</em> (more formal than <em>podría</em>)</p>`,
    quiz: [
      { type: "mc", question: "'Quisiera hablar con usted' uses the -ra form as:", answer: "A softened conditional / polite request", options: ["Past tense","A softened conditional / polite request","Present subjunctive","Future tense"], explanation: "The -ra form of querer functions as a polite conditional: quisiera = querría." },
      { type: "fib", question: "El castillo que _____ Alfonso X era impresionante. (construir, -ra as pluperfect indicative)", answer: "construyera", options: null, explanation: "Literary use: -ra form as pluperfect indicative (= había construido)." },
      { type: "mc", question: "'Si tuviera' refers to:", answer: "A present/future unreal condition", options: ["A past completed action","A present/future unreal condition","A certain future event","A past unreal condition"], explanation: "Imperfect subjunctive in si-clauses = present or future counterfactual." },
      { type: "fib", question: "Si _____ _____ más tiempo, habría terminado. (haber + tener, pluperfect subj.)", answer: "hubiera tenido", options: null, explanation: "Past unreal condition requires pluperfect subjunctive." },
      { type: "mc", question: "The -ra form replacing the conditional is most common with:", answer: "Querer, poder, deber", options: ["Ser, estar, ir","Querer, poder, deber","Hablar, comer, vivir","Tener, hacer, decir"], explanation: "Quisiera, pudiera, debiera are the most common polite -ra conditional uses." }
    ]
  },
  {
    id: "gram-59", title: "Inversión estilística y estructuras enfáticas", titleEn: "Stylistic Inversion and Emphatic Structures", level: "C2", order: 59,
    content: `<h3>Stylistic Inversion and Emphatic Structures</h3>
<p><strong>Fronting for emphasis:</strong><br>
<em>Cansado estoy de esperar.</em> (Tired I am of waiting.) — adjective fronted for emphasis.</p>
<p><strong>Cleft sentences (perífrasis de relieve):</strong><br>
<em>Fue María quien lo hizo.</em> (It was María who did it.)<br>
<em>Lo que quiero es descansar.</em> (What I want is to rest.)</p>
<p><strong>Topicalization:</strong><br>
<em>A Juan, no lo he visto.</em> (Juan, I haven't seen him.) — topic fronted with redundant pronoun.</p>
<p><strong>Right dislocation:</strong><br>
<em>No lo he visto, a Juan.</em> (I haven't seen him, Juan.) — clarification after the main clause.</p>
<p><strong>Exclamatory inversion:</strong><br>
<em>¡Bien lo sé yo!</em> (Well do I know it!) / <em>¡Mucho me temo que…!</em> (I very much fear that…!)</p>`,
    quiz: [
      { type: "mc", question: "'Fue María quien lo hizo.' This is:", answer: "A cleft sentence for emphasis", options: ["A passive construction","A cleft sentence for emphasis","A relative clause","Reported speech"], explanation: "Fue + noun + quien = cleft sentence emphasizing the agent." },
      { type: "fib", question: "_____ _____ quiero es paz. (What I want — cleft)", answer: "Lo que", options: null, explanation: "Lo que + verb + es = pseudo-cleft for emphasis on the object." },
      { type: "mc", question: "'A Juan, no lo he visto.' The fronted 'A Juan' is an example of:", answer: "Topicalization", options: ["Topicalization","Right dislocation","Cleft sentence","Passive voice"], explanation: "Topicalization: the topic is moved to the front with a redundant pronoun." },
      { type: "fib", question: "Cansado _____ de tanto trabajar. (estar, yo — fronted adjective)", answer: "estoy", options: null, explanation: "Adjective fronting: Cansado estoy = emphatic version of Estoy cansado." },
      { type: "mc", question: "'No lo he visto, a Juan.' Moving 'a Juan' to the end is:", answer: "Right dislocation", options: ["Topicalization","Right dislocation","Fronting","Cleft sentence"], explanation: "Right dislocation clarifies the pronoun reference after the main clause." }
    ]
  },
  {
    id: "gram-60", title: "Construcciones idiomáticas avanzadas", titleEn: "Advanced Idiomatic Constructions", level: "C2", order: 60,
    content: `<h3>Advanced Idiomatic Constructions</h3>
<p><strong>Dar + noun constructions:</strong><br>
<em>dar por hecho</em> (to take for granted), <em>dar a entender</em> (to imply), <em>dar con</em> (to find/come across), <em>dar de sí</em> (to stretch/give)</p>
<p><strong>Hacerse / quedar / quedar(se) constructions:</strong><br>
<em>hacerse con</em> (to get hold of), <em>hacerse el tonto</em> (to play dumb), <em>quedar en</em> (to agree to), <em>quedarse en blanco</em> (to go blank)</p>
<p><strong>Verb + preposition idioms:</strong><br>
<em>contar con</em> (to count on), <em>meterse en</em> (to get involved in), <em>tirar de</em> (to pull / rely on), <em>pasar de</em> (to not care about)</p>
<p><strong>Complex set phrases:</strong><br>
<em>a fin de cuentas</em> (at the end of the day), <em>a raíz de</em> (as a result of), <em>en vista de que</em> (given that), <em>no cabe duda</em> (there is no doubt)</p>`,
    quiz: [
      { type: "mc", question: "'Dar por hecho' means:", answer: "To take for granted", options: ["To finish","To take for granted","To give up","To do a favor"], explanation: "Dar por hecho = to assume / take for granted." },
      { type: "fib", question: "Para no responder, Pedro _____ el tonto. (play dumb — hacerse)", answer: "se hizo", options: null, explanation: "Hacerse el tonto = to play dumb / pretend not to understand." },
      { type: "mc", question: "'Quedar en' means:", answer: "To agree to / arrange", options: ["To stay in","To agree to / arrange","To remain","To be left over"], explanation: "Quedar en = to agree on / arrange (Quedamos en vernos a las cinco)." },
      { type: "fib", question: "A _____ de cuentas, todos somos responsables. (at the end of the day)", answer: "fin", options: null, explanation: "A fin de cuentas = at the end of the day / all things considered." },
      { type: "mc", question: "'No cabe duda de que es cierto.' 'No cabe duda' means:", answer: "There is no doubt", options: ["It doesn't fit","There is no doubt","I don't care","It's not worth it"], explanation: "No cabe duda = there is no doubt / it's unquestionable." }
    ]
  },
  {
    id: "gram-61", title: "Registro académico y literario", titleEn: "Academic and Literary Register", level: "C2", order: 61,
    content: `<h3>Academic and Literary Register</h3>
<p><strong>Formal essay connectors:</strong></p>
<ul>
<li><em>Cabe señalar que…</em> (It is worth noting that…)</li>
<li><em>En lo que respecta a…</em> (With regard to…)</li>
<li><em>A modo de conclusión…</em> (By way of conclusion…)</li>
<li><em>Conviene subrayar que…</em> (It is important to emphasize that…)</li>
<li><em>De lo anteriormente expuesto se deduce que…</em> (From the above it follows that…)</li>
</ul>
<p><strong>Rhetorical devices:</strong></p>
<ul>
<li><strong>Anáfora retórica:</strong> Repetition at the start: <em>Si tú supieras… si tú pudieras… si tú quisieras…</em></li>
<li><strong>Quiasmo:</strong> Inverted parallelism: <em>No vivo para comer, sino como para vivir.</em></li>
<li><strong>Hipérbaton:</strong> Altered word order: <em>Del salón en el ángulo oscuro…</em> (Bécquer)</li>
</ul>
<p><strong>Hedging in academic writing:</strong> <em>parece ser que, podría afirmarse que, cabe la posibilidad de que</em></p>`,
    quiz: [
      { type: "mc", question: "'Cabe señalar que' is used in:", answer: "Formal/academic writing", options: ["Informal conversation","Formal/academic writing","Text messages","Children's books"], explanation: "Cabe señalar que = it is worth noting that — formal register." },
      { type: "fib", question: "En lo que _____ a la economía, los datos son positivos. (with regard to)", answer: "respecta", options: null, explanation: "En lo que respecta a = with regard to / as far as ... is concerned." },
      { type: "mc", question: "'Del salón en el ángulo oscuro' (Bécquer) uses:", answer: "Hipérbaton (altered word order)", options: ["Normal word order","Hipérbaton (altered word order)","Anáfora","Quiasmo"], explanation: "Hipérbaton: standard order would be 'En el ángulo oscuro del salón'." },
      { type: "fib", question: "A modo de _____, podemos afirmar que… (by way of conclusion)", answer: "conclusión", options: null, explanation: "A modo de conclusión = by way of conclusion — formal closing." },
      { type: "mc", question: "'Podría afirmarse que' is an example of:", answer: "Hedging", options: ["A command","Hedging","Emphasis","Narration"], explanation: "Academic hedging softens claims: podría afirmarse = it could be said." }
    ]
  },
  {
    id: "gram-62", title: "Variación dialectal del español", titleEn: "Dialectal Variation Across the Spanish-Speaking World", level: "C2", order: 62,
    content: `<h3>Dialectal Variation</h3>
<p><strong>Phonological variation:</strong></p>
<ul>
<li><strong>Seseo:</strong> /s/ for both <em>s</em> and <em>c/z</em> (Latin America, southern Spain, Canaries)</li>
<li><strong>Ceceo:</strong> /θ/ for both (parts of Andalusia)</li>
<li><strong>Distinción:</strong> /s/ vs. /θ/ (northern/central Spain)</li>
<li><strong>Yeísmo:</strong> Merging <em>ll</em> and <em>y</em> as /ʝ/ (most Spanish speakers today)</li>
<li><strong>Aspiration of /s/:</strong> <em>estos → ehtoh</em> (Caribbean, Andalusia, Chile)</li>
</ul>
<p><strong>Grammatical variation:</strong></p>
<ul>
<li><strong>Voseo</strong> (Río de la Plata, Central America) vs. <strong>tuteo</strong></li>
<li><strong>Ustedes</strong> replacing <strong>vosotros</strong> (Latin America, western Andalusia, Canaries)</li>
<li><strong>Pretérito perfecto</strong> vs. <strong>pretérito indefinido</strong> usage varies by region</li>
</ul>
<p><strong>Lexical variation:</strong> <em>coche/carro/auto</em> (car), <em>ordenador/computadora/computador</em> (computer), <em>apartamento/departamento/piso</em> (apartment)</p>`,
    quiz: [
      { type: "mc", question: "Seseo means pronouncing c/z as:", answer: "/s/ (like 's')", options: ["/θ/ (like 'th')","/s/ (like 's')","/ʃ/ (like 'sh')","/x/ (like 'j')"], explanation: "Seseo: c(e,i) and z are pronounced as /s/, typical of Latin America." },
      { type: "fib", question: "In Argentina, the word for 'car' is typically _____. (coche/carro/auto)", answer: "auto", options: null, explanation: "Auto is the common term in Argentina; coche in Spain; carro in Mexico/Central America." },
      { type: "mc", question: "Yeísmo is the merger of:", answer: "ll and y sounds", options: ["s and z sounds","ll and y sounds","b and v sounds","r and rr sounds"], explanation: "Yeísmo: ll and y both pronounced as /ʝ/ — the most common pattern today." },
      { type: "fib", question: "In Spain, 'apartment' is typically called a _____. (apartamento/piso/departamento)", answer: "piso", options: null, explanation: "Piso (Spain), apartamento/departamento (Latin America)." },
      { type: "mc", question: "Aspiration of /s/ (e.g., 'estos' → 'ehtoh') is common in:", answer: "Caribbean, Andalusia, and Chile", options: ["Northern Spain only","Caribbean, Andalusia, and Chile","All Spanish-speaking countries","Mexico only"], explanation: "S-aspiration is widespread in Caribbean, southern Spain, Chile, and other lowland areas." }
    ]
  },
  // ===== Irregular Verbs =====
  {
    id: "gram-63", title: "Verbos irregulares en presente", titleEn: "Irregular Present Tense Verbs", level: "A1", order: 63,
    content: `<h3>Irregular Present Tense Verbs</h3>
<p>Many of the most common Spanish verbs are irregular in the present tense. Learning their forms is essential because these verbs appear in almost every conversation.</p>

<h4>"Go" Verbs (yo form ends in -go)</h4>
<p>These verbs are irregular only in the <strong>yo</strong> form — all other forms follow normal patterns (with some stem changes).</p>
<table><tr><th></th><th>tener</th><th>hacer</th><th>decir</th><th>venir</th><th>poner</th></tr>
<tr><td><strong>yo</strong></td><td>tengo</td><td>hago</td><td>digo</td><td>vengo</td><td>pongo</td></tr>
<tr><td><strong>tú</strong></td><td>tienes</td><td>haces</td><td>dices</td><td>vienes</td><td>pones</td></tr>
<tr><td><strong>él/ella</strong></td><td>tiene</td><td>hace</td><td>dice</td><td>viene</td><td>pone</td></tr>
<tr><td><strong>nosotros</strong></td><td>tenemos</td><td>hacemos</td><td>decimos</td><td>venimos</td><td>ponemos</td></tr>
<tr><td><strong>vosotros</strong></td><td>tenéis</td><td>hacéis</td><td>decís</td><td>venís</td><td>ponéis</td></tr>
<tr><td><strong>ellos</strong></td><td>tienen</td><td>hacen</td><td>dicen</td><td>vienen</td><td>ponen</td></tr></table>

<h4>"Oy" Verbs (yo form ends in -oy)</h4>
<table><tr><th></th><th>ser</th><th>estar</th><th>ir</th><th>dar</th></tr>
<tr><td><strong>yo</strong></td><td>soy</td><td>estoy</td><td>voy</td><td>doy</td></tr>
<tr><td><strong>tú</strong></td><td>eres</td><td>estás</td><td>vas</td><td>das</td></tr>
<tr><td><strong>él/ella</strong></td><td>es</td><td>está</td><td>va</td><td>da</td></tr>
<tr><td><strong>nosotros</strong></td><td>somos</td><td>estamos</td><td>vamos</td><td>damos</td></tr>
<tr><td><strong>vosotros</strong></td><td>sois</td><td>estáis</td><td>vais</td><td>dais</td></tr>
<tr><td><strong>ellos</strong></td><td>son</td><td>están</td><td>van</td><td>dan</td></tr></table>

<h4>Truly Unique Verbs</h4>
<table><tr><th></th><th>ver</th><th>saber</th><th>conocer</th></tr>
<tr><td><strong>yo</strong></td><td>veo</td><td>sé</td><td>conozco</td></tr>
<tr><td><strong>tú</strong></td><td>ves</td><td>sabes</td><td>conoces</td></tr>
<tr><td><strong>él/ella</strong></td><td>ve</td><td>sabe</td><td>conoce</td></tr>
<tr><td><strong>nosotros</strong></td><td>vemos</td><td>sabemos</td><td>conocemos</td></tr>
<tr><td><strong>vosotros</strong></td><td>veis</td><td>sabéis</td><td>conocéis</td></tr>
<tr><td><strong>ellos</strong></td><td>ven</td><td>saben</td><td>conocen</td></tr></table>
<p><strong>Note:</strong> <em>Conocer</em> represents a large group of <strong>-zco</strong> verbs (also: <em>parecer → parezco</em>, <em>traducir → traduzco</em>, <em>producir → produzco</em>).</p>`,
    quiz: [
      { type: "fib", question: "Yo ___ español. (ser)", answer: "soy", options: null, explanation: "Ser is an 'oy' verb: yo soy." },
      { type: "mc", question: "Which is correct for 'I have'?", answer: "tengo", options: ["tiene","tener","tengo","tenemos"], explanation: "Tener is a 'go' verb: yo tengo." },
      { type: "fib", question: "Ella ___ la verdad. (decir)", answer: "dice", options: null, explanation: "Decir: él/ella dice (stem change e→i plus irregular yo: digo)." },
      { type: "mc", question: "What is the 'yo' form of hacer?", answer: "hago", options: ["haco","hago","hacio","hizo"], explanation: "Hacer is a 'go' verb: yo hago." },
      { type: "fib", question: "Nosotros ___ al parque. (ir)", answer: "vamos", options: null, explanation: "Ir is completely irregular: nosotros vamos." }
    ]
  },
  {
    id: "gram-64", title: "Cambios ortográficos", titleEn: "Spelling-Change Verbs", level: "A2", order: 64,
    content: `<h3>Spelling-Change Verbs</h3>
<p>These verbs change their spelling to <strong>preserve the same pronunciation</strong>. They are not truly irregular — the sounds stay the same, but Spanish spelling rules require different letters before certain vowels.</p>

<h4>Why Do Spelling Changes Happen?</h4>
<p>In Spanish, certain letters change their sound depending on the vowel that follows:</p>
<ul>
<li><strong>c</strong> = /k/ before a, o, u — but /θ/ or /s/ before e, i</li>
<li><strong>g</strong> = /g/ before a, o, u — but /x/ (like "j") before e, i</li>
<li><strong>z</strong> is almost never written before e or i in Spanish</li>
</ul>
<p>So when a conjugation puts a different vowel after the consonant, the spelling must change to keep the original sound.</p>

<h4>Common Spelling Changes</h4>
<table><tr><th>Change</th><th>When</th><th>Example Verb</th><th>Example Form</th></tr>
<tr><td><strong>c → qu</strong></td><td>before e</td><td>buscar</td><td>busqué (preterite), busque (subjunctive)</td></tr>
<tr><td><strong>g → gu</strong></td><td>before e</td><td>pagar</td><td>pagué (preterite), pague (subjunctive)</td></tr>
<tr><td><strong>z → c</strong></td><td>before e</td><td>empezar</td><td>empecé (preterite), empiece (subjunctive)</td></tr>
<tr><td><strong>g → j</strong></td><td>before a, o</td><td>coger</td><td>cojo (present), coja (subjunctive)</td></tr>
<tr><td><strong>gu → gü</strong></td><td>before e</td><td>averiguar</td><td>averigüé (preterite), averigüe (subjunctive)</td></tr>
<tr><td><strong>i → y</strong></td><td>between vowels</td><td>leer</td><td>leyó, leyeron (preterite)</td></tr></table>

<h4>Examples in Context</h4>
<ul>
<li><em>Buscar:</em> Yo busc<strong>o</strong> (present) → Yo bus<strong>qué</strong> (preterite) — keeps the /k/ sound</li>
<li><em>Pagar:</em> Yo pag<strong>o</strong> (present) → Yo pa<strong>gué</strong> (preterite) — keeps the /g/ sound</li>
<li><em>Empezar:</em> Yo empie<strong>zo</strong> (present) → Yo empe<strong>cé</strong> (preterite) — z cannot precede e</li>
<li><em>Coger:</em> Él co<strong>ge</strong> (present) → Yo co<strong>jo</strong> (present) — keeps the /x/ sound before o</li>
<li><em>Leer:</em> Él le<strong>e</strong> (present) → Él le<strong>yó</strong> (preterite) — unstressed i between vowels becomes y</li>
</ul>`,
    quiz: [
      { type: "fib", question: "Yo ___ ayer. (buscar, preterite)", answer: "busqué", options: null, explanation: "Buscar changes c→qu before e to keep the /k/ sound: busqué." },
      { type: "mc", question: "Yo ___ el paquete. (coger, present)", answer: "cojo", options: ["cogo","cojo","coja","cogen"], explanation: "Coger changes g→j before o to keep the /x/ sound: yo cojo." },
      { type: "fib", question: "Ella ___ el libro. (leer, preterite)", answer: "leyó", options: null, explanation: "Leer changes i→y between vowels in the preterite: leyó." },
      { type: "mc", question: "Why does buscar become 'busqué' and not 'buscé'?", answer: "To keep the hard 'k' sound before 'e'", options: ["It's a random exception","To keep the hard 'k' sound before 'e'","Because it's a stem-changing verb","To match the subjunctive"], explanation: "C before e would sound like /s/ or /θ/, so qu is used to preserve the /k/ sound." },
      { type: "fib", question: "Yo ___ temprano. (empezar, preterite)", answer: "empecé", options: null, explanation: "Empezar changes z→c before e: empecé (z almost never appears before e in Spanish)." }
    ]
  },
  {
    id: "gram-65", title: "El imperativo irregular", titleEn: "Irregular Imperatives", level: "B2", order: 65,
    content: `<h3>Irregular Imperatives</h3>
<p>Most Spanish imperatives are formed regularly from the present tense, but <strong>eight verbs</strong> have irregular affirmative <strong>tú</strong> imperatives. These are among the most common verbs, so memorizing them is essential.</p>

<h4>The 8 Irregular Affirmative Tú Imperatives</h4>
<table><tr><th>Infinitive</th><th>Tú (affirmative)</th><th>Example</th></tr>
<tr><td>decir</td><td><strong>di</strong></td><td>¡Di la verdad! (Tell the truth!)</td></tr>
<tr><td>hacer</td><td><strong>haz</strong></td><td>¡Haz la tarea! (Do the homework!)</td></tr>
<tr><td>ir</td><td><strong>ve</strong></td><td>¡Ve a casa! (Go home!)</td></tr>
<tr><td>poner</td><td><strong>pon</strong></td><td>¡Pon la mesa! (Set the table!)</td></tr>
<tr><td>salir</td><td><strong>sal</strong></td><td>¡Sal de aquí! (Get out of here!)</td></tr>
<tr><td>ser</td><td><strong>sé</strong></td><td>¡Sé bueno! (Be good!)</td></tr>
<tr><td>tener</td><td><strong>ten</strong></td><td>¡Ten cuidado! (Be careful!)</td></tr>
<tr><td>venir</td><td><strong>ven</strong></td><td>¡Ven aquí! (Come here!)</td></tr></table>

<p><strong>Mnemonic:</strong> "Vin Diesel has ten weapons: <em>sal, pon, ve, di, haz, sé, ten, ven</em>"</p>

<h4>Negative Imperatives Use the Subjunctive</h4>
<p>All negative tú imperatives use the <strong>present subjunctive</strong> — there are no exceptions:</p>
<table><tr><th>Affirmative (tú)</th><th>Negative (tú)</th></tr>
<tr><td>di</td><td>no <strong>digas</strong></td></tr>
<tr><td>haz</td><td>no <strong>hagas</strong></td></tr>
<tr><td>ve</td><td>no <strong>vayas</strong></td></tr>
<tr><td>pon</td><td>no <strong>pongas</strong></td></tr>
<tr><td>sal</td><td>no <strong>salgas</strong></td></tr>
<tr><td>sé</td><td>no <strong>seas</strong></td></tr>
<tr><td>ten</td><td>no <strong>tengas</strong></td></tr>
<tr><td>ven</td><td>no <strong>vengas</strong></td></tr></table>

<h4>Usted Imperatives</h4>
<p><strong>Usted</strong> imperatives (both affirmative and negative) always use the subjunctive: <em>diga, haga, vaya, ponga, salga, sea, tenga, venga</em>.</p>`,
    quiz: [
      { type: "mc", question: "Tell a friend to come: ¡___!", answer: "Ven", options: ["Viene","Vienes","Ven","Venga"], explanation: "Venir has the irregular tú imperative 'ven'." },
      { type: "fib", question: "___ la tarea ahora. (hacer, tú imperative)", answer: "Haz", options: null, explanation: "Hacer has the irregular tú imperative 'haz'." },
      { type: "mc", question: "Tell a friend NOT to go: ¡No ___!", answer: "vayas", options: ["ve","va","vayas","ves"], explanation: "Negative imperatives always use the subjunctive: no vayas (from ir)." },
      { type: "fib", question: "___ la verdad. (decir, tú imperative)", answer: "Di", options: null, explanation: "Decir has the irregular tú imperative 'di'." },
      { type: "mc", question: "Which is the tú imperative of poner?", answer: "pon", options: ["pone","ponga","pon","pones"], explanation: "Poner has the irregular tú imperative 'pon'." }
    ]
  },
  {
    id: "gram-66", title: "Verbos compuestos irregulares", titleEn: "Compound Irregular Verbs", level: "C1", order: 66,
    content: `<h3>Compound Irregular Verbs</h3>
<p>When a prefix is added to an irregular verb, the compound verb <strong>inherits all the same irregularities</strong> as the base verb. This means that learning one irregular pattern gives you access to many verbs at once.</p>

<h4>Poner → Compound Verbs</h4>
<p><em>disponer, proponer, suponer, componer, imponer</em> — all conjugate like poner:</p>
<table><tr><th>Tense</th><th>poner</th><th>proponer</th><th>disponer</th></tr>
<tr><td>Present (yo)</td><td>pongo</td><td>propongo</td><td>dispongo</td></tr>
<tr><td>Preterite (yo)</td><td>puse</td><td>propuse</td><td>dispuse</td></tr>
<tr><td>Future (yo)</td><td>pondré</td><td>propondré</td><td>dispondré</td></tr></table>

<h4>Venir → Compound Verbs</h4>
<p><em>prevenir, convenir, intervenir</em></p>
<table><tr><th>Tense</th><th>venir</th><th>prevenir</th><th>convenir</th></tr>
<tr><td>Present (yo)</td><td>vengo</td><td>prevengo</td><td>convengo</td></tr>
<tr><td>Preterite (yo)</td><td>vine</td><td>previne</td><td>convine</td></tr>
<tr><td>Future (yo)</td><td>vendré</td><td>prevendré</td><td>convendré</td></tr></table>

<h4>Tener → Compound Verbs</h4>
<p><em>mantener, obtener, contener, sostener</em></p>
<table><tr><th>Tense</th><th>tener</th><th>mantener</th><th>obtener</th></tr>
<tr><td>Present (yo)</td><td>tengo</td><td>mantengo</td><td>obtengo</td></tr>
<tr><td>Preterite (yo)</td><td>tuve</td><td>mantuve</td><td>obtuve</td></tr>
<tr><td>Future (yo)</td><td>tendré</td><td>mantendré</td><td>obtendré</td></tr></table>

<h4>Hacer → Compound Verbs</h4>
<p><em>deshacer, rehacer, satisfacer</em></p>
<table><tr><th>Tense</th><th>hacer</th><th>deshacer</th><th>rehacer</th></tr>
<tr><td>Present (yo)</td><td>hago</td><td>deshago</td><td>rehago</td></tr>
<tr><td>Preterite (yo)</td><td>hice</td><td>deshice</td><td>rehice</td></tr>
<tr><td>Future (yo)</td><td>haré</td><td>desharé</td><td>reharé</td></tr></table>

<h4>Decir → Compound Verbs (with an exception!)</h4>
<p><em>predecir, contradecir</em></p>
<table><tr><th>Tense</th><th>decir</th><th>predecir</th><th>contradecir</th></tr>
<tr><td>Present (yo)</td><td>digo</td><td>predigo</td><td>contradigo</td></tr>
<tr><td>Preterite (yo)</td><td>dije</td><td>predije</td><td>contradije</td></tr>
<tr><td>Future (yo)</td><td><strong>diré</strong></td><td><strong>predeciré</strong></td><td><strong>contradeciré</strong></td></tr></table>
<p><strong>Important exception:</strong> Unlike <em>decir</em> (diré), the compounds <em>predecir</em> and <em>contradecir</em> have a <strong>regular future</strong>: <em>predeciré</em> (NOT *prediré), <em>contradeciré</em> (NOT *contrediré). This is one of the few cases where a compound verb does NOT follow the base verb's pattern.</p>`,
    quiz: [
      { type: "fib", question: "Yo ___ una solución. (proponer, present)", answer: "propongo", options: null, explanation: "Proponer conjugates like poner: yo propongo." },
      { type: "mc", question: "Preterite of mantener (yo):", answer: "mantuve", options: ["mantuvo","mantuve","mantení","mantenió"], explanation: "Mantener conjugates like tener: yo mantuve (like tuve)." },
      { type: "fib", question: "Ellos ___ mañana. (prevenir, future)", answer: "prevendrán", options: null, explanation: "Prevenir conjugates like venir in the future: prevendré, prevendrás, prevendrá, prevendremos, prevendréis, prevendrán." },
      { type: "mc", question: "Future of predecir (yo):", answer: "predeciré", options: ["prediré","predigiré","predeciré","predeceré"], explanation: "Unlike decir (diré), predecir has a REGULAR future: predeciré." },
      { type: "fib", question: "Yo ___ el error. (deshacer, preterite)", answer: "deshice", options: null, explanation: "Deshacer conjugates like hacer: yo deshice (like hice)." }
    ]
  }
];
