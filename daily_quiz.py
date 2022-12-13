import random
from util import get_verb


def daily_quiz():
    """Quiz the user on the conjugation of a verb."""
    # Select a tense
    tenses = ["present", "preterite", "imperfect", "future"]
    tense = random.choice(tenses)

    # Select a verb
    verb = get_verb()

    # Select a person
    persons = [
        "first person",  # yo
        "second person singular informal",  # tú
        "third person singular or second person singular formal",  # él/ella/usted
        "first person plural",  # nosotros
        "second person plural informal",  # vosotros
        "third person plural or second person plural formal"  # ellos/ellas/ustedes
    ]
    person = random.choice(persons)

    # Get the verb stem and ending
    stem, ending = verb["English"][:-2], verb["English"][-2:]

    # Get the conjugation of the verb in the tense and person
    raise NotImplementedError

    # Ask the user to conjugate the verb in the tense and person
    response = input(f"Conjugate {verb['English']} in the {tense} tense and {person}: ")

    # Check if the user's response is correct
    raise NotImplementedError

    # If the user's response is correct, congratulate them
    raise NotImplementedError

    # If the user's response is incorrect, tell them the correct answer
    raise NotImplementedError

    # Record the score for that verb
    raise NotImplementedError
