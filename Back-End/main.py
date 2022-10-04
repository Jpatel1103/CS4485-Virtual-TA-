# import libraries
#from flask import Flask, render_template, request
import nltk # natural language toolkit
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy # for array management
import tflearn
import tensorflow as tf
import random
import json
import pickle

# TERMINOLOGY
# stemming: getting the root of the word, dropping extra characters
# tokenization: taking set of text and break into individual words or sentences
# bag of words: all of the words in a pattern

with open("intents.json") as file:
    data = json.load(file)  # load and store the json data in variable data

# print(data["intents"]) debug to print the .json file

try:
    # if you update to intents.json file add an 'x' in this try, so it doesn't open up old pickle data
    with open("data.pickle", "rb") as f:    # rb = read bits
        words, classes, training, output = pickle.load(f)    # saving words, classes, etc into pickle file

except:
    words = []
    classes = []
    docs_x = [] # list of patterns
    docs_y = [] # list for what tag a word is a part of

    for intent in data["intents"]:              # loops through the intents file's dictionaries
        for pattern in intent["patterns"]:      # doing something specific with the patterns (stemming)
            wrds = nltk.word_tokenize(pattern)  # returns list with all the words
            words.extend(wrds)                  # want to put all of tokenized words into words list
            docs_x.append(wrds)                 # add the pattern of words to docs
            docs_y.append(intent["tag"])        # what intent/tag the pattern is a part of

        if intent["tag"] not in classes:
            classes.append(intent["tag"])

    # stemming words and removing duplicates
    words = [stemmer.stem(w.lower()) for w in words if w != "?"]    # convert words into lowercase
    words = sorted(list(set(words)))    # removes duplicates using set(words)

    classes = sorted(classes)

    training = []
    output = []
    out_empty = [0 for _ in range(len(classes))] # we will have an output list which will be the length
                                                # of all the classes we have
    """
    our output are the different tags: greeting, help
    ex; [0,0,0,1] is the list
    "hi" "bye" "help" "officehours"
    this means that the tag "officehours" is the tag which is associated with the output
    """

    # create bag of words
    for x, doc in enumerate(docs_x):
        bag = []
        wrds = [stemmer.stem(w) for w in doc]    # stem all of the words in our pattern

        """
        go through all the words from our wrds list now that all the words are stemmed
        and put either a 1 or a 0 in our bag of words depending on if its in the main
        word list
        """
        for w in words:
            if w in wrds:
                bag.append(1)   # this means the word exists in the current pattern
            else:
                bag.append(0)   # this word does not exist in the current pattern

        output_row = out_empty[:]
        output_row[classes.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)
        # at this point we will have a training list which will have the bag of words
        # output of list of 0's and 1's

    # convert training data and output lists into numpy arrays
    training = numpy.array(training)
    output = numpy.array(output)

    with open("data.pickle", "wb") as f:    # wb = write bits
        pickle.dump((words, classes, training, output), f)    # write all those variables into pickle file

# model
#tensorflow.reset_default_graph()
tf.compat.v1.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8) # hidden layers to help out with probability
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

#training the model
model = tflearn.DNN(net)

try:
    model.load("model.tflearn")
except:
    # pass training data to the model
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True) # num times it will see the data
    model.save("model.tflearn")

# turn sentence input from user into a bag of words
def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]    # create blank bag of words list
    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se: # the current word we are looking at in the enumerate words list = word in the sentence
                bag[i] = 1

    return numpy.array(bag)

# asks user for sentence and will provide response
def chat():
    print("Start talking with the bot (type quit to stop)")
    while True:
        inp = input("You: ")    # to show that you type to bot
        if inp.lower() == "quit":
            break

        results = model.predict([bag_of_words(inp, words)])[0]
        #print(results)
        results_index = numpy.argmax(results)   # gives us the index of the greatest value in our list
        tag = classes[results_index] # gives us the label with the highest probability value
        #print(tag)  # shows the tag which the bot thinks the response is assoc. with
        if results[results_index] > 0.7:    # if the probability > 70%
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    responses = tg['responses']

            print(random.choice(responses)) # bot will get a random response from the given tag
        else:   # probability < 70%
            print("I don't quite understand, try again.")

chat()

# create Flask app
# app = Flask(__name__)

