from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup, InlineKeyboardButton
from telegram_bot.modulus.base import BaseModule


class ViewWords(BaseModule):

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Look all your words': self.look_all_student_words,
            'View category words': self.view_category_words,
            'Delete word': self.delete_word,
            'Change translation': self.change_translation,
            'My words': self.my_words,
            'Look learned words': self.look_learned_words,
            'Manage word': self.manage_word,
            'My words option': self.my_words_option,
            'Update word translation': self.update_word_translation,
            'Learn again': self.learn_again,

        }

    @restricted
    def my_words(self, bot, update, student):
        student.callback_data = ['Look all your words', 'Look learned words']
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=2))
        student.destination = 'My words option'
        update.message.edit_text(text='My words'+self.menu_text, reply_markup=reply_markup)

    @restricted
    def my_words_option(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        student.destination = choice
        student.callback_data = student.HQ.get_student_categories()
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.edit_text(text='Now choose category.'+self.menu_text, reply_markup=reply_markup)

    def look_words(self, bot, update, student, func):
        category_name = student.callback_data[int(update.callback_query.data)]
        category =  self.categories.get(name=category_name)
        student.temp_data = {'words': func(category)}
        update.message.edit_text(text=category.name + self.menu_text)
        self.dispatch_destination(bot, update, student, 'View category words')

    @restricted
    def look_all_student_words(self, bot, update, student):
        self.look_words(bot, update, student, student.HQ.get_all_words)

    @restricted
    def look_learned_words(self, bot, update, student):
        self.look_words(bot, update, student, student.HQ.get_learned_words)

    @restricted
    def view_category_words(self, bot, update, student):
        student.destination = 'Manage word'
        student.callback_data = ['Change translation', 'Learn again', 'Delete word']
        for word in student.temp_data['words']:
            button_list = [InlineKeyboardButton(text='Change translation', callback_data='0,'+str(word.pk)),
                           InlineKeyboardButton(text='Delete', callback_data='2,'+str(word.pk))]
            if word.viewed and word.played_match and word.played_reversed_match and word.played_typing\
                    and word.played_reversed_typing is True:
                button_list.insert(1, InlineKeyboardButton(text='Learn again', callback_data='1,'+str(word.pk)))
            reply_markup = InlineKeyboardMarkup(build_menu(button_list, n_cols=3))
            update.message.reply_text(text='Word [%s] \n Pronunciation [%s]\n Translation [%s] \n' %
                                           (word.name, word.pronunciation, word.translation),
                                      reply_markup=reply_markup)

    @restricted
    def manage_word(self, bot, update, student):
        variants = update.callback_query.data.split(',')
        word = int(variants[1])
        go = student.callback_data[int(variants[0])]
        student.temp_data['word'] = student.temp_data['words'].get(pk=word)
        self.dispatch_destination(bot, update, student, go)

    @restricted
    def delete_word(self, bot, update, student):
        student.HQ.delete_word(student.temp_data['word'])
        update.message.edit_text('Word deleted')
        student.destination = 'Manage word'

    @restricted
    def change_translation(self, bot, update, student):
        student.destination = 'Update word translation'
        update.message.edit_text(text='Enter your translation:'+self.menu_text)

    def update_word_translation(self, bot, update, student):
        student.HQ.update_word_translation(student.temp_data['word'], update.message.text.strip(' '))
        update.message.reply_text('Word translation updated'+self.menu_text)

    @restricted
    def learn_again(self, bot, update, student):
        student.destination = 'Manage word'
        student.HQ.update_viewed_field(student.temp_data['word'], False)
        student.HQ.update_match_field(student.temp_data['word'], False, False)
        student.HQ.update_match_field(student.temp_data['word'], False, True)
        student.HQ.update_typing_field(student.temp_data['word'], False, False)
        student.HQ.update_typing_field(student.temp_data['word'], False, True)
        update.message.edit_text('Word changed state to learn'+self.menu_text)