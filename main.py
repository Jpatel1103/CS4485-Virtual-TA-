#the program takes the messages from the user and try to reply in sense of a bot
#as of now the code does only basic answering
#if the bot doesn't understand it states to rephrase the sentence
import re
import random

def message_probability(user_message, recognised_words, single_response=False, words=[]):
    message_accuracy = 0
    required_words = True

    for word in user_message:
        if word in recognised_words:
            message_accuracy += 1

    percentage = float(message_accuracy) / float(len(recognised_words))

    for word in words:
        if word not in user_message:
            required_words = False
            break

    if required_words or single_response:
        return int(percentage * 100)
    else:
        return 0

def check_all_messages(message):
    best_match = {}

    def response(bot_response, list_of_words, single_response=False, required_words=[]):
        nonlocal best_match
        best_match[bot_response] = message_probability(message, list_of_words, single_response, required_words)

    # Responses -------------------------------------------------------------------------------------------------------
    response('Hello! How can I assist you today', ['hello', 'hi', 'hey', 'sup', 'heya'], single_response=True)
    response('I\'m doing fine, and you?', ['how', 'are', 'you', 'doing'], required_words=['how','doing'])
    response('You\'re welcome!', ['thankyou', 'thanks'], single_response=True)
    response('Have a great day', ['bye', 'bye!','see ya'], single_response=True)
    response('Great! any other question?', ['i', 'understood ', 'it', 'now'], required_words=[ 'understood'])

    # Longer responses which is writtien in Stringbelow
    response(detailed, ['what', 'can','i','do','whom','should','i','contact'], required_words=['i','contact'])


    match = max(best_match, key=best_match.get)
    return unknown() if best_match[match] < 1 else match


def get_response(user_input):
    split_message = re.split(r'\s+|[,;?!.-]\s*', user_input.lower())
    response = check_all_messages(split_message)
    return response

def unknown():
    response = ["sorry, I cannot understand you ",
                "I can try you help you with this, can you rephrase what you typed",
                "What do you mean?"][
        random.randrange(3)]
    return response

detailed = "Can you please visit your grader during office hour or email your grader to solve your problem"

while True:
    print('Bot: ' + get_response(input('You: ')))

