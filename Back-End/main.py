"""" utilize the python chatterbot library
    to generate our chatbot for basic
    english conversations
"""
from chatterbot import chatbot

from chatterbot.trainers import ChatterbotCorpusTrainer

#name the chatbot
chatbot = Chatbot('Virtual-TA')

#create new trainer for chatbot
trainer = ChatterBotCorpusTrainer(chatbot)

#train bot using mutliple pre-built corpus
trainer.train("chatterbot.corpus.english.greetings",
              "chatterbot.corpus.english.conversations")


