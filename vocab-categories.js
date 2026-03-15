const VOCAB_CATEGORIES = {
  "greetings": {
    "title": "Saludos",
    "titleEn": "Greetings",
    "icon": "👋"
  },
  "family": {
    "title": "Familia",
    "titleEn": "Family",
    "icon": "👨‍👩‍👧‍👦"
  },
  "food": {
    "title": "Comida",
    "titleEn": "Food",
    "icon": "🍽️"
  },
  "animals": {
    "title": "Animales",
    "titleEn": "Animals",
    "icon": "🐾"
  },
  "places": {
    "title": "Lugares",
    "titleEn": "Places",
    "icon": "🏘️"
  },
  "body": {
    "title": "Cuerpo",
    "titleEn": "Body",
    "icon": "🦴"
  },
  "clothing": {
    "title": "Ropa",
    "titleEn": "Clothing",
    "icon": "👕"
  },
  "professions": {
    "title": "Profesiones",
    "titleEn": "Professions",
    "icon": "👷"
  },
  "nature": {
    "title": "Naturaleza",
    "titleEn": "Nature",
    "icon": "🌿"
  },
  "emotions": {
    "title": "Emociones",
    "titleEn": "Emotions",
    "icon": "😊"
  },
  "colors": {
    "title": "Colores",
    "titleEn": "Colors",
    "icon": "🎨"
  },
  "numbers": {
    "title": "Números",
    "titleEn": "Numbers",
    "icon": "🔢"
  },
  "time": {
    "title": "Tiempo",
    "titleEn": "Time",
    "icon": "🕐"
  },
  "weather": {
    "title": "Clima",
    "titleEn": "Weather",
    "icon": "🌤️"
  },
  "travel": {
    "title": "Viajes",
    "titleEn": "Travel",
    "icon": "✈️"
  },
  "technology": {
    "title": "Tecnología",
    "titleEn": "Technology",
    "icon": "💻"
  },
  "house": {
    "title": "Hogar",
    "titleEn": "House",
    "icon": "🏠"
  },
  "school": {
    "title": "Escuela",
    "titleEn": "School",
    "icon": "📚"
  },
  "health": {
    "title": "Salud",
    "titleEn": "Health",
    "icon": "🏥"
  },
  "sports": {
    "title": "Deportes",
    "titleEn": "Sports",
    "icon": "⚽"
  },
  "adjectives": {
    "title": "Adjetivos generales",
    "titleEn": "General Adjectives",
    "icon": "📝"
  },
  "adverbs": {
    "title": "Adverbios generales",
    "titleEn": "General Adverbs",
    "icon": "⏩"
  },
  "prepositions": {
    "title": "Preposiciones",
    "titleEn": "Prepositions",
    "icon": "↔️"
  },
  "conjunctions": {
    "title": "Conjunciones",
    "titleEn": "Conjunctions",
    "icon": "🔗"
  },
  "pronouns": {
    "title": "Pronombres",
    "titleEn": "Pronouns",
    "icon": "👤"
  },
  "academic": {
    "title": "Académico",
    "titleEn": "Academic",
    "icon": "🎓"
  },
  "business": {
    "title": "Negocios",
    "titleEn": "Business",
    "icon": "💼"
  },
  "abstract": {
    "title": "Abstracto",
    "titleEn": "Abstract Concepts",
    "icon": "💭"
  },
  "legal": {
    "title": "Legal",
    "titleEn": "Legal/Political",
    "icon": "⚖️"
  },
  "literary": {
    "title": "Literario",
    "titleEn": "Literary",
    "icon": "🖋️"
  },
  "scientific": {
    "title": "Científico",
    "titleEn": "Scientific",
    "icon": "🔬"
  },
  "colloquial": {
    "title": "Coloquial",
    "titleEn": "Colloquial/Idiomatic",
    "icon": "🗣️"
  },
  "philosophy": {
    "title": "Filosofía",
    "titleEn": "Philosophy/Ethics",
    "icon": "🤔"
  },
  "verbs": {
    "title": "Verbos generales",
    "titleEn": "General Verbs",
    "icon": "⚡"
  },
  "society": {
    "title": "Sociedad",
    "titleEn": "Society",
    "icon": "🏛️"
  },
  "work": {
    "title": "Trabajo",
    "titleEn": "Work",
    "icon": "💼"
  },
  "media": {
    "title": "Medios",
    "titleEn": "Media & Communication",
    "icon": "📰"
  },
  "environment": {
    "title": "Medio Ambiente",
    "titleEn": "Environment",
    "icon": "🌍"
  },
  "medicine": {
    "title": "Medicina",
    "titleEn": "Medicine",
    "icon": "🩺"
  },
  "cooking": {
    "title": "Cocina",
    "titleEn": "Cooking",
    "icon": "🍳"
  },
  "music_arts": {
    "title": "Artes",
    "titleEn": "Music & Arts",
    "icon": "🎭"
  },
  "geography": {
    "title": "Geografía",
    "titleEn": "Geography",
    "icon": "🗺️"
  },
  "economics": {
    "title": "Economía",
    "titleEn": "Economics",
    "icon": "📈"
  },
  "military": {
    "title": "Militar",
    "titleEn": "Military",
    "icon": "🎖️"
  },
  "architecture": {
    "title": "Arquitectura",
    "titleEn": "Architecture",
    "icon": "🏗️"
  },
  "fashion": {
    "title": "Moda",
    "titleEn": "Fashion",
    "icon": "👗"
  },
  "religion": {
    "title": "Religión",
    "titleEn": "Religion",
    "icon": "🕊️"
  },
  "psychology": {
    "title": "Psicología",
    "titleEn": "Psychology",
    "icon": "🧠"
  },
  "transportation": {
    "title": "Transporte",
    "titleEn": "Transportation",
    "icon": "🚗"
  },
  "agriculture": {
    "title": "Agricultura",
    "titleEn": "Agriculture",
    "icon": "🌾"
  },
  "marine": {
    "title": "Náutico",
    "titleEn": "Maritime",
    "icon": "⚓"
  }
};
