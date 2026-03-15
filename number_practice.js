'use strict';

// ════════════════════════════════════════════════════════════
//  NUMBER PRACTICE — Cardinal numbers, ordinals, and
//  telling time in Spanish.
// ════════════════════════════════════════════════════════════

const NUMBER_PRACTICE_DATA = {

  // ── Cardinal Numbers ─────────────────────────────────────
  CARDINAL_NUMBERS: [
    { num: 0, es: 'cero' },
    { num: 1, es: 'uno', note: 'un before masc. noun, una before fem.' },
    { num: 2, es: 'dos' },
    { num: 3, es: 'tres' },
    { num: 4, es: 'cuatro' },
    { num: 5, es: 'cinco' },
    { num: 6, es: 'seis' },
    { num: 7, es: 'siete' },
    { num: 8, es: 'ocho' },
    { num: 9, es: 'nueve' },
    { num: 10, es: 'diez' },
    { num: 11, es: 'once' },
    { num: 12, es: 'doce' },
    { num: 13, es: 'trece' },
    { num: 14, es: 'catorce' },
    { num: 15, es: 'quince' },
    { num: 16, es: 'dieciséis' },
    { num: 17, es: 'diecisiete' },
    { num: 18, es: 'dieciocho' },
    { num: 19, es: 'diecinueve' },
    { num: 20, es: 'veinte' },
    { num: 21, es: 'veintiuno', note: 'veintiún before masc. noun' },
    { num: 22, es: 'veintidós' },
    { num: 23, es: 'veintitrés' },
    { num: 24, es: 'veinticuatro' },
    { num: 25, es: 'veinticinco' },
    { num: 26, es: 'veintiséis' },
    { num: 27, es: 'veintisiete' },
    { num: 28, es: 'veintiocho' },
    { num: 29, es: 'veintinueve' },
    { num: 30, es: 'treinta' },
    { num: 31, es: 'treinta y uno', note: 'treinta y un before masc. noun' },
    { num: 40, es: 'cuarenta' },
    { num: 50, es: 'cincuenta' },
    { num: 60, es: 'sesenta' },
    { num: 70, es: 'setenta' },
    { num: 80, es: 'ochenta' },
    { num: 90, es: 'noventa' },
    { num: 100, es: 'cien', note: 'cien when exactly 100; ciento when followed by more' },
    { num: 101, es: 'ciento uno' },
    { num: 200, es: 'doscientos', note: 'doscientas for fem. (doscientas personas)' },
    { num: 300, es: 'trescientos' },
    { num: 400, es: 'cuatrocientos' },
    { num: 500, es: 'quinientos', note: 'Irregular: not cincocientos' },
    { num: 600, es: 'seiscientos' },
    { num: 700, es: 'setecientos', note: 'Irregular: not sietecientos' },
    { num: 800, es: 'ochocientos' },
    { num: 900, es: 'novecientos', note: 'Irregular: not nuevecientos' },
    { num: 1000, es: 'mil', note: 'Never "un mil" — just "mil"' },
    { num: 2000, es: 'dos mil' },
    { num: 10000, es: 'diez mil' },
    { num: 100000, es: 'cien mil' },
    { num: 1000000, es: 'un millón', note: 'un millón de + noun' },
    { num: 2000000, es: 'dos millones', note: 'millones de + noun' },
  ],

  // ── Ordinal Numbers ──────────────────────────────────────
  ORDINAL_NUMBERS: [
    { num: 1, es: 'primero', note: 'primer before masc. noun' },
    { num: 2, es: 'segundo' },
    { num: 3, es: 'tercero', note: 'tercer before masc. noun' },
    { num: 4, es: 'cuarto' },
    { num: 5, es: 'quinto' },
    { num: 6, es: 'sexto' },
    { num: 7, es: 'séptimo' },
    { num: 8, es: 'octavo' },
    { num: 9, es: 'noveno' },
    { num: 10, es: 'décimo' },
  ],

  // ── Rules & Tips ─────────────────────────────────────────
  rules: [
    {
      id: 'nr-1',
      title: 'Gender agreement with hundreds',
      rule: 'Hundreds (200–999) agree in gender: doscientos libros, doscientas páginas.',
      examples: ['Hay trescientas personas.', 'Costó quinientos euros.']
    },
    {
      id: 'nr-2',
      title: 'Cien vs ciento',
      rule: '"Cien" when exactly 100 or before mil/millones. "Ciento" when followed by 1–99.',
      examples: ['Cien personas.', 'Ciento veinte personas.', 'Cien mil euros.']
    },
    {
      id: 'nr-3',
      title: 'Periods and commas are swapped',
      rule: 'Spanish uses periods for thousands and commas for decimals: 1.000 = one thousand, 3,5 = three point five.',
      examples: ['El precio es 1.250,99 €.', 'La población es 47.000.000.']
    },
    {
      id: 'nr-4',
      title: 'Uno shortening',
      rule: '"Uno" becomes "un" before masculine nouns, "una" before feminine. Same for veintiuno → veintiún.',
      examples: ['Tengo un libro.', 'Veintiún años.', 'Treinta y una páginas.']
    },
    {
      id: 'nr-5',
      title: 'Ordinals above 10th',
      rule: 'Above décimo (10th), Spanish rarely uses ordinal forms. Instead, use cardinal numbers after the noun: "el siglo veintiuno" (the 21st century), "el piso quince" (the 15th floor).',
      examples: ['Carlos V (Carlos Quinto).', 'El siglo XXI (veintiuno).', 'La planta 12 (doce).']
    },
    {
      id: 'nr-6',
      title: 'Millón is a noun',
      rule: '"Millón" acts as a noun and requires "de" before another noun: "un millón de dólares." Mil does not: "mil dólares."',
      examples: ['Dos millones de personas.', 'Tres mil estudiantes.']
    },
  ],

  // ── Time Telling ─────────────────────────────────────────
  TIME_EXPRESSIONS: [
    { time: '1:00', es: 'Es la una.', note: 'Singular "es la" only for 1 o\'clock' },
    { time: '2:00', es: 'Son las dos.', note: 'Plural "son las" for all others' },
    { time: '3:15', es: 'Son las tres y cuarto.', alt: 'Son las tres y quince.' },
    { time: '4:30', es: 'Son las cuatro y media.', alt: 'Son las cuatro y treinta.' },
    { time: '5:45', es: 'Son las seis menos cuarto.', alt: 'Son las cinco y cuarenta y cinco.', note: '"Menos cuarto" = quarter to next hour' },
    { time: '6:10', es: 'Son las seis y diez.' },
    { time: '7:50', es: 'Son las ocho menos diez.', alt: 'Son las siete y cincuenta.' },
    { time: '12:00', es: 'Son las doce.', note: 'Es mediodía (noon) / Es medianoche (midnight)' },
    { time: '1:30 PM', es: 'Es la una y media de la tarde.' },
    { time: '8:00 AM', es: 'Son las ocho de la mañana.' },
    { time: '10:00 PM', es: 'Son las diez de la noche.' },
  ],

  // ── Quiz items ───────────────────────────────────────────
  quizItems: [
    { type: 'toSpanish', prompt: '47', answer: 'cuarenta y siete', level: 'A1' },
    { type: 'toSpanish', prompt: '156', answer: 'ciento cincuenta y seis', level: 'A1' },
    { type: 'toSpanish', prompt: '573', answer: 'quinientos setenta y tres', level: 'A2' },
    { type: 'toSpanish', prompt: '1984', answer: 'mil novecientos ochenta y cuatro', level: 'A2' },
    { type: 'toSpanish', prompt: '21', answer: 'veintiuno', level: 'A1' },
    { type: 'toSpanish', prompt: '16', answer: 'dieciséis', level: 'A1' },
    { type: 'toSpanish', prompt: '100', answer: 'cien', level: 'A1' },
    { type: 'toSpanish', prompt: '101', answer: 'ciento uno', level: 'A1' },
    { type: 'toSpanish', prompt: '700', answer: 'setecientos', level: 'A2' },
    { type: 'toSpanish', prompt: '1000000', answer: 'un millón', level: 'A2' },
    { type: 'toNumber', prompt: 'ochocientos treinta y dos', answer: '832', level: 'A2' },
    { type: 'toNumber', prompt: 'tres mil quinientos', answer: '3500', level: 'A2' },
    { type: 'toNumber', prompt: 'diecinueve', answer: '19', level: 'A1' },
    { type: 'toNumber', prompt: 'setenta y ocho', answer: '78', level: 'A1' },
    { type: 'toNumber', prompt: 'novecientos noventa y nueve', answer: '999', level: 'A2' },
    { type: 'ordinal', prompt: '3rd', answer: 'tercero', level: 'A1' },
    { type: 'ordinal', prompt: '5th', answer: 'quinto', level: 'A1' },
    { type: 'ordinal', prompt: '7th', answer: 'séptimo', level: 'A2' },
    { type: 'ordinal', prompt: '1st (before masc. noun)', answer: 'primer', level: 'A2' },
    { type: 'ordinal', prompt: '10th', answer: 'décimo', level: 'A2' },
    { type: 'time', prompt: '3:30', answer: 'Son las tres y media.', level: 'A1' },
    { type: 'time', prompt: '1:00', answer: 'Es la una.', level: 'A1' },
    { type: 'time', prompt: '6:45', answer: 'Son las siete menos cuarto.', alt: 'Son las seis y cuarenta y cinco.', level: 'A2' },
    { type: 'time', prompt: '9:15 PM', answer: 'Son las nueve y cuarto de la noche.', level: 'A2' },
    { type: 'time', prompt: '12:00 (noon)', answer: 'Es mediodía.', alt: 'Son las doce.', level: 'A1' },
    { type: 'context', prompt: 'Hay ___ (200) estudiantes en la escuela.', answer: 'doscientos', level: 'A2', note: 'Masculine agreement' },
    { type: 'context', prompt: 'Hay ___ (200) personas.', answer: 'doscientas', level: 'A2', note: 'Feminine agreement' },
    { type: 'context', prompt: 'El ___ (1st) día de clase.', answer: 'primer', level: 'A2', note: 'Shortened before masc. noun' },
    { type: 'context', prompt: 'Costó ___ (500) euros.', answer: 'quinientos', level: 'A2', note: 'Irregular form' },
    { type: 'context', prompt: 'Viven ___ (1,000,000) de personas aquí.', answer: 'un millón', level: 'B1', note: 'Millón + de' },
  ],
};

// Make available globally (browser) or for testing (Node)
if (typeof window !== 'undefined') {
  window.NUMBER_PRACTICE_DATA = NUMBER_PRACTICE_DATA;
}
