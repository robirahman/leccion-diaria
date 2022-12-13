import pandas as pd


def get_verb() -> str:
    """Get a verb from the database."""
    verb_list = pd.read_csv("verbos regulares.csv", names=["Español", "English"])
    verb = verb_list.sample(1)
    return verb
