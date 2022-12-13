import pandas as pd


def get_verb() -> str:
    """Get a verb from the database."""
    verb_list = pd.read_csv("verbos regulares.csv", names=["Español", "English"])
    verb = verb_list.sample(1).iloc[0]
    return verb


def conjugate(verb: str, tense: str, person: str) -> str:
    """Conjugate a verb in a tense and person."""

    # split verb into stem and ending
    stem, ending = verb[:-2], verb[-2:]

    endings_dict = {
        "ar": {
            "present": {
                "yo": "o",
                "tú": "as",
                "él/ella/usted": "a",
                "nosotros": "amos",
                "vosotros": "áis",
                "ellos/ellas/ustedes": "an"
            },
            "preterite": {
                "yo": "é",
                "tú": "aste",
                "él/ella/usted": "ó",
                "nosotros": "amos",
                "vosotros": "asteis",
                "ellos/ellas/ustedes": "aron"
            },
            "imperfect": {
                "yo": "aba",
                "tú": "abas",
                "él/ella/usted": "aba",
                "nosotros": "ábamos",
                "vosotros": "abais",
                "ellos/ellas/ustedes": "aban"
            },
            "future": {
                "yo": "aré",
                "tú": "arás",
                "él/ella/usted": "ará",
                "nosotros": "aremos",
                "vosotros": "aréis",
                "ellos/ellas/ustedes": "arán"
            }
        },
        "er": {
            "present": {
                "yo": "o",
                "tú": "es",
                "él/ella/usted": "e",
                "nosotros": "emos",
                "vosotros": "éis",
                "ellos/ellas/ustedes": "en"
            },
            "preterite": {
                "yo": "í",
                "tú": "iste",
                "él/ella/usted": "ió",
                "nosotros": "imos",
                "vosotros": "isteis",
                "ellos/ellas/ustedes": "ieron"
            },
            "imperfect": {
                "yo": "ía",
                "tú": "ías",
                "él/ella/usted": "ía",
                "nosotros": "íamos",
                "vosotros": "íais",
                "ellos/ellas/ustedes": "ían"
            },
            "future": {
                "yo": "eré",
                "tú": "erás",
                "él/ella/usted": "erá",
                "nosotros": "eremos",
                "vosotros": "eréis",
                "ellos/ellas/ustedes": "erán"
            }
        },
        "ir": {
            "present": {
                "yo": "o",
                "tú": "es",
                "él/ella/usted": "e",
                "nosotros": "imos",
                "vosotros": "ís",
                "ellos/ellas/ustedes": "en"
            },
            "preterite": {
                "yo": "í",
                "tú": "iste",
                "él/ella/usted": "ió",
                "nosotros": "imos",
                "vosotros": "isteis",
                "ellos/ellas/ustedes": "ieron"
            },
            "imperfect": {
                "yo": "ía",
                "tú": "ías",
                "él/ella/usted": "ía",
                "nosotros": "íamos",
                "vosotros": "íais",
                "ellos/ellas/ustedes": "ían"
            },
            "future": {
                "yo": "iré",
                "tú": "irás",
                "él/ella/usted": "irá",
                "nosotros": "iremos",
                "vosotros": "iréis",
                "ellos/ellas/ustedes": "irán"
            }
        }
    }

    conjugated_ending = endings_dict[ending][tense][person]

    return stem + conjugated_ending