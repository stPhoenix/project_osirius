from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup, InlineKeyboardButton
from telegram_bot.modulus.base import BaseModule
from random import randint
import logging

logger = logging.getLogger(__name__)


class LearnWords(BaseModule):

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
    def learn_words(self, update, context, student):
        student.destination = 'Learn word status'
        words = student.HQ.learn_word()
        if words.count() == 0:
            update.message.edit_text(text='No words to learn')
            return
        if words.count() == 1:
            word = words[0]
        else:
            word = words[randint(0, words.count() - 1)]
        student.temp_data = {'word': word}
        button_list = [InlineKeyboardButton(text='Learned', callback_data='1'),
                       InlineKeyboardButton(text='Not learned', callback_data='0')]
        reply_markup = InlineKeyboardMarkup(build_menu(button_list, n_cols=2))
        text = 'Word [%s]\nPronunciation [%s]\nTranslation [%s]\n' % (word.name, word.pronunciation, word.translation)
        update.message.edit_text(text=text+self.menu_text,
                                 reply_markup=reply_markup)

    @restricted
    def learn_word_status(self, update, context, student):
        choice = int(update.callback_query.data)
        word = student.temp_data['word']
        if choice == 1:
            student.HQ.update_viewed_field(word=word, viewed=True)
        self.dispatch_destination(update, context, student, 'Learn words')

    @restricted
    def play_matching(self, update, context, student):
        reverse = False if student.destination == 'Play matching' else True
        game = student.HQ.play_matching(reverse=reverse)
        if game == 'No words to play matching':
            update.message.edit_text(text='No words to play matching')
            self.dispatch_destination(update, context, student, 'Menu')
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
            # Todo Improve button length
            update.message.edit_text(text=text+self.menu_text, reply_markup=reply_markup)

    @restricted
    def play_matching_result(self, update, context, student):
        answer = student.callback_data[int(update.callback_query.data)]
        word = student.temp_data['answer']
        reverse = False
        learned = False
        if student.destination == 'Play matching result':
            learned = self.check_answer(word.translation, answer)
            student.destination = 'Play matching'
        else:
            reverse = True
            learned = self.check_answer(word.name, answer)
            student.destination = 'Play reversed matching'
        student.HQ.update_match_field(word, learned['update'], reverse)
        student.callback_data = ['Next']
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.edit_text(text=learned['text']+self.menu_text, reply_markup=reply_markup)

    def check_answer(self, word, answer):
        w = word.lower().replace(' ', '')
        a = answer.lower().replace(' ', '')
        if w == a:
            return {'text': 'Right', 'update': True}
        else:
            return {'text': 'Wrong: %s' % word, 'update': False}

    @restricted
    def play_reversed_matching(self, update, context, student):
        self.play_matching(update, context, student)

    @restricted
    def play_reversed_matching_result(self, update, context, student):
        self.play_matching_result(update, context, student)

    @restricted
    def play_typing(self, update, context, student):
        reverse = False if student.destination == 'Play typing' else True
        game = student.HQ.play_typing(reverse=reverse)
        if game == 'No word to play typing':
            update.message.edit_text(text='No word to play typing')
            self.dispatch_destination(update, context, student, 'Menu')
        else:
            student.temp_data = {'answer': game}
            if reverse is False:
                student.destination = 'Play typing result'
                text = game.name
            else:
                student.destination = 'Play reversed typing result'
                text = game.translation
            update.message.edit_text(text=text+self.menu_text)

    @restricted
    def play_typing_result(self, update, context, student):
        answer = update.message.text.strip(' ')
        word = student.temp_data['answer']
        reverse = False
        learned = False
        if student.destination == 'Play typing result':
            learned = self.check_answer(word.translation, answer)
            student.destination = 'Play typing'
        else:
            reverse = True
            learned = self.check_answer(word.name, answer)
            student.destination = 'Play reversed typing'
        student.HQ.update_typing_field(word, learned['update'], reverse)
        student.callback_data = ['Next']
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.reply_text(text=learned['text']+self.menu_text, reply_markup=reply_markup)

    @restricted
    def play_reversed_typing(self, update, context, student):
        self.play_typing(update, context, student)

    @restricted
    def play_reversed_typing_result(self, update, context, student):
        self.play_typing_result(update, context, student)