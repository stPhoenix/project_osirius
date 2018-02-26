from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup, InlineKeyboardButton
from telegram_bot.modulus.base import BaseModule
from random import randint

import logging
# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.WARNING)

logger = logging.getLogger(__name__)


class LearnWords(BaseModule):
    def __init__(self, langs, dispatch_destination, users, students, **kwargs):
        super(LearnWords, self).__init__(langs, dispatch_destination, users, students)
        self.categories = kwargs['categories']

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Learn words': self.learn_words,
            'Learn word status': self.learn_word_status,
            'Play matching': self.play_matching,
            'Play matching result': self.play_matching_result,
            'Play reversed matching': self.play_reversed_matching,
            'Play reversed matching result': self.play_reversed_matching_result,
            'Play typing': self.play_typing,
            'Play typing result': self.play_typing_result,
            'Play reversed typing': self.play_reversed_typing,
            'Play reversed typing result': self.play_reversed_typing_result,
        }

    @restricted
    def learn_words(self, bot, update, student):
        student.destination = 'Learn word status'
        words = student.HQ.get_words()
        word = words[randint(0, words.count()-1)]
        student.temp_data = {'word': word}
        button_list = [InlineKeyboardButton(text='Learned', callback_data='1'),
                       InlineKeyboardButton(text='Not learned', callback_data='0')]
        reply_markup = InlineKeyboardMarkup(build_menu(button_list, n_cols=2))
        update.message.edit_text(text='Word [%s]\nPronunciation [%s]\nTranslation [%s]' %
                                       (word.name, word.pronunciation, word.translation),
                                 reply_markup=reply_markup)

    @restricted
    def learn_word_status(self, bot, update, student):
        choice = int(update.callback_query.data)
        word = student.temp_data['word']
        if choice == 1:
            student.HQ.update_viewed_field(word=word, viewed=True)
        self.dispatch_destination(bot, update, student, 'Learn words')

    @restricted
    def play_matching(self, bot, update, student):
        reverse = False if student.destination == 'Play matching' else True
        game = student.HQ.play_matching(reverse=reverse)
        if game == 'No words to play matching':
            update.message.edit_text(text='No words to play matching')
            self.dispatch_destination(bot, update, student, 'Menu')
        else:
            student.temp_data = {'answer': game['answer']}
            if reverse is False:
                student.destination = 'Play matching result'
                student.callback_data = [word.translation for word in game['words']]
                text = game['answer'].name
            else:
                student.destination = 'Play reversed matching result'
                student.callback_data = [word.name for word in game['words']]
                text = game['answer'].translation
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
            update.message.edit_text(text=text, reply_markup=reply_markup)

    @restricted
    def play_matching_result(self, bot, update, student):
        answer = student.callback_data[int(update.callback_query.data)]
        word = student.temp_data['answer']
        reverse = False
        if student.destination == 'Play matching result':
            text = 'Right' if answer == word.translation else 'Wrong: %s' % word.translation
            student.destination = 'Play matching'
        else:
            reverse = True
            text = 'Right' if answer == word.name else 'Wrong: %s' % word.name
            student.destination = 'Play reversed matching'
        student.HQ.update_match_field(word, reverse)
        student.callback_data = ['Next']
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.edit_text(text=text, reply_markup=reply_markup)

    @restricted
    def play_reversed_matching(self, bot, update, student):
        self.play_matching(bot, update, student)

    @restricted
    def play_reversed_matching_result(self, bot, update, student):
        self.play_matching_result(bot, update, student)

    @restricted
    def play_typing(self, bot, update, student):
        reverse = False if student.destination == 'Play typing' else True
        game = student.HQ.play_typing(reverse=reverse)
        if game == 'No word to play typing':
            update.message.edit_text(text='No word to play typing')
            self.dispatch_destination(bot, update, student, 'Menu')
        else:
            student.temp_data = {'answer': game}
            if reverse is False:
                student.destination = 'Play typing result'
                text = game.name
            else:
                student.destination = 'Play reversed typing result'
                text = game.translation
            update.message.edit_text(text=text)

    @restricted
    def play_typing_result(self, bot, update, student):
        answer = update.message.text.strip(' ')
        word = student.temp_data['answer']
        reverse = False
        if student.destination == 'Play typing result':
            text = 'Right' if answer == word.translation else 'Wrong: %s' % word.translation
            student.destination = 'Play typing'
        else:
            reverse = True
            text = 'Right' if answer == word.name else 'Wrong: %s' % word.name
            student.destination = 'Play reversed typing'
        student.HQ.update_typing_field(word, reverse)
        student.callback_data = ['Next']
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.reply_text(text=text, reply_markup=reply_markup)

    @restricted
    def play_reversed_typing(self, bot, update, student):
        self.play_typing(bot, update, student)

    @restricted
    def play_reversed_typing_result(self, bot, update, student):
        self.play_typing_result(bot, update, student)