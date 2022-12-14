import pandas as pd

verb_endings = {
    "present": {
        "ar": {
            "yo": "o",
            "tú": "as",
            "él/ella/usted": "a",
            "nosotros": "amos",
            "vosotros": "áis",
            "ellos/ellas/ustedes": "an"
        },
        "er": {
            "yo": "o",
            "tú": "es",
            "él/ella/usted": "e",
            "nosotros": "emos",
            "vosotros": "éis",
            "ellos/ellas/ustedes": "en"
        },
        "ir": {
            "yo": "o",
            "tú": "es",
            "él/ella/usted": "e",
            "nosotros": "imos",
            "vosotros": "ís",
            "ellos/ellas/ustedes": "en"
        },
    },
    "preterite": {
        "ar": {
            "yo": "é",
            "tú": "aste",
            "él/ella/usted": "ó",
            "nosotros": "amos",
            "vosotros": "asteis",
            "ellos/ellas/ustedes": "aron"
        },
        "er": {
            "yo": "í",
            "tú": "iste",
            "él/ella/usted": "ió",
            "nosotros": "imos",
            "vosotros": "isteis",
            "ellos/ellas/ustedes": "ieron"
        },
        "ir": {
            "yo": "í",
            "tú": "iste",
            "él/ella/usted": "ió",
            "nosotros": "imos",
            "vosotros": "isteis",
            "ellos/ellas/ustedes": "ieron"
        },
    },
    "imperfect": {
        "ar": {
            "yo": "aba",
            "tú": "abas",
            "él/ella/usted": "aba",
            "nosotros": "ábamos",
            "vosotros": "abais",
            "ellos/ellas/ustedes": "aban"
        },
        "er": {
            "yo": "ía",
            "tú": "ías",
            "él/ella/usted": "ía",
            "nosotros": "íamos",
            "vosotros": "íais",
            "ellos/ellas/ustedes": "ían"
        },
        "ir": {
            "yo": "ía",
            "tú": "ías",
            "él/ella/usted": "ía",
            "nosotros": "íamos",
            "vosotros": "íais",
            "ellos/ellas/ustedes": "ían"
        },
    },
    "future": {
        "ar": {
            "yo": "aré",
            "tú": "arás",
            "él/ella/usted": "ará",
            "nosotros": "aremos",
            "vosotros": "aréis",
            "ellos/ellas/ustedes": "arán"
        },
        "er": {
            "yo": "eré",
            "tú": "erás",
            "él/ella/usted": "erá",
            "nosotros": "eremos",
            "vosotros": "eréis",
            "ellos/ellas/ustedes": "erán"
        },
        "ir": {
            "yo": "iré",
            "tú": "irás",
            "él/ella/usted": "irá",
            "nosotros": "iremos",
            "vosotros": "iréis",
            "ellos/ellas/ustedes": "irán"
        },
    },
    "conditional": {
        "ar": {
            "yo": "aría",
            "tú": "arías",
            "él/ella/usted": "aría",
            "nosotros": "aríamos",
            "vosotros": "aríais",
            "ellos/ellas/ustedes": "arían"
        },
        "er": {
            "yo": "ería",
            "tú": "erías",
            "él/ella/usted": "ería",
            "nosotros": "eríamos",
            "vosotros": "eríais",
            "ellos/ellas/ustedes": "erían"
        },
        "ir": {
            "yo": "iría",
            "tú": "irías",
            "él/ella/usted": "iría",
            "nosotros": "iríamos",
            "vosotros": "iríais",
            "ellos/ellas/ustedes": "irían"
        }
    },
    "subjunctive": {
        "ar": {
            "yo": "e",
            "tú": "es",
            "él/ella/usted": "e",
            "nosotros": "emos",
            "vosotros": "éis",
            "ellos/ellas/ustedes": "en"
        },
        "er": {
            "yo": "a",
            "tú": "as",
            "él/ella/usted": "a",
            "nosotros": "amos",
            "vosotros": "áis",
            "ellos/ellas/ustedes": "an"
        },
        "ir": {
            "yo": "a",
            "tú": "as",
            "él/ella/usted": "a",
            "nosotros": "amos",
            "vosotros": "áis",
            "ellos/ellas/ustedes": "an"
        }
    },
}


def get_verb() -> str:
    """Get a verb from the database."""
    verb_list = pd.read_csv("verbos regulares.csv", names=["Español", "English"])
    verb = verb_list.sample(1).iloc[0]
    return verb


def conjugate(verb: str, tense: str, person: str) -> str:
    """Conjugate a verb in a tense and person."""

    # split verb into stem and ending
    stem, ending = verb[:-2], verb[-2:]

    # conjugate verb ending
    conjugated_ending = verb_endings[tense][ending][person]

    return stem + conjugated_ending
