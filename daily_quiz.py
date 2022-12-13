import random
from util import get_verb

def daily_quiz():
    """Quiz the user on the conjugation of a verb."""
    # Select a tense
    tenses = ["Presente", "Preterito", "Imperfecto", "Futuro"]
    tense = random.choice(tenses)

    # Select a verb
    verb = get_verb()

    # Get the verb stem and ending
    stem, ending = verb["English"][:-2], verb["English"][-2:]

    # Get the conjugation of the verb in the tense
    raise NotImplementedError

    # Ask the user to conjugate the verb in the tense
    response = input(f"Conjugate {verb['Español']} in the {tense} tense: ")

    # Check if the user's response is correct
    raise NotImplementedError

    # If the user's response is correct, congratulate them
    raise NotImplementedError

    # If the user's response is incorrect, tell them the correct answer
    raise NotImplementedError

    # Record the score for that verb
    raise NotImplementedError
