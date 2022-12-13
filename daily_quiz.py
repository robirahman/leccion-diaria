import random
from util import get_verb, conjugate


def daily_quiz():
    """Quiz the user on the conjugation of a verb."""
    # Select a tense
    tenses = ["present", "preterite", "imperfect", "future"]
    tense = random.choice(tenses)

    # Select a verb
    verb = get_verb()
    verb_english = verb["English"]
    verb_spanish = verb["Español"]

    # Select a person
    persons = [
        "yo",
        "tú",
        "él/ella/usted",
        "nosotros",
        "vosotros",
        "ellos/ellas/ustedes",
    ]
    persons_english = {
        "yo": "first person",
        "tú": "second person singular informal",
        "él/ella/usted": "third person singular or second person singular formal",
        "nosotros": "first person plural",
        "vosotros": "second person plural informal",
        "ellos/ellas/ustedes": "third person plural or second person plural formal",
    }
    person = random.choice(persons)
    person_english = persons_english[person]

    # Get the conjugation of the verb in the tense and person
    conjugated_verb = conjugate(verb_spanish, tense, person)

    # Print out special characters
    print("¡Bienvenidos a la clase de español! á, é, í, ó, ú, ü, ñ")

    # Ask the user to conjugate the verb in the tense and person
    response = input(f'Conjugate "{verb_english}" in the {tense} tense and {person_english}: ')

    # Check if the user's response is correct
    correct = response == conjugated_verb

    # If the user's response is correct, congratulate them
    if correct:
        print("Correct!")

    # If the user's response is incorrect, tell them the correct answer
    if not correct:
        print(f"Incorrect. The answer is {conjugated_verb}.")

    # Record the score for that verb
    pass  # raise NotImplementedError

    # Ask if the user wants to play again
    play_again = input("Play again? (y/n): ")

    # If the user wants to play again, play again
    if play_again == "y":
        daily_quiz()
    else:
        print("¡Hasta luego!")
        return


if __name__ == "__main__":
    daily_quiz()
