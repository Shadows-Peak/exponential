import re
from profanity import profanity
def check_input(string):
    pattern = r'[^a-zA-Z0-9\s]'  # Matches any character that is not a letter, number, or whitespace
    matches = len(re.findall(pattern, string))
    print(matches)
    valid = profanity.contains_profanity(string)
    if matches < 1 and valid == False:
        return string
    else:
        raise Exception("Issue With User Input")
print(check_input(str("hello")))

