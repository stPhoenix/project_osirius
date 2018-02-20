from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup
from telegram_bot.modulus.base import BaseModule

import logging
# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.WARNING)

logger = logging.getLogger(__name__)


class AddWords(BaseModule):
    def __init__(self, langs, dispatch_destination, users, students, **kwargs):
        super(AddWords, self).__init__(langs, dispatch_destination, users, students)
        self.categories = kwargs['categories']
        self.global_words = kwargs['global_words']

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Add words': self.add_words,
            'Add words option': self.add_words_option,
            'Add word by typing': self.add_word_by_typing,
            'Choose word from presets': self.choose_from_presets,
            'Search word': self.search_word,
            'Add word translation': self.add_word_translation,
            'Add custom word': self.add_custom_word,
            'Translation option': self.translation_option,
            'Add word category': self.add_word_category,
            'Show category words': self.show_category_words,
            'Add from global word': self.add_from_global_word,
        }

    @restricted
    def add_words(self, bot, update, student):
        student.callback_data = ['Add word by typing', 'Choose word from presets']
        student.destination = 'Add words option'
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.edit_text(text='How do you want to add word?', reply_markup=reply_markup)

    @restricted
    def add_words_option(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        self.dispatch_destination(bot, update, student, choice)

    @restricted
    def add_custom_word(self, bot, update, student):
        word_name = student.temp_data['word_name']
        translation = student.temp_data['translation']
        pronunciation = student.temp_data['pronunciation']
        category = self.categories.get(name=student.callback_data[int(update.callback_query.data)])
        result = student.HQ.add_custom_word(word_name=word_name,
                                            translation=translation,
                                            category=category,
                                            pronunciation=pronunciation)
        answer = None
        if result is None:
            answer = 'Word has been added'
        else:
            answer = result
        update.message.edit_text(text=answer)

    @restricted
    def add_word_by_typing(self, bot, update, student):
        student.destination = 'Search word'
        update.message.edit_text('Enter foreign word')

    def add_word_translation(self, bot, update, student):
        student.temp_data['translation'] = update.message.text.strip()
        self.dispatch_destination(bot, update, student, 'Add word category')

    def add_word_category(self, bot, update, student):
        student.destination = 'Add custom word'
        student.callback_data = [c.name for c in self.categories]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.reply_text(text='Now choose category.', reply_markup=reply_markup)

    @restricted
    def search_word(self, bot, update, student):
        result = student.HQ.search_word(word_name=update.message.text.strip())
        if result['global_word_search'] is False and result['google_translate_search'] is False:
            student.temp_data['word_name'] = update.message.text.strip()
            student.destination = 'Add word translation'
            update.message.reply_text(text='Sorry. Could not find any translation. Enter your translation:')
        if result['google_translate_search'] is True:
            student.temp_data['word_name'] = result['words'].origin
            student.temp_data['translation'] = result['words'].text
            student.temp_data['pronunciation'] = result['words'].pronunciation
            student.callback_data = ['Yes', 'No']
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=2))
            student.destination = 'Translation option'
            update.message.reply_text(text='Found with internet search \n'
                                           'Word [%s] \n Pronunciation [%s]\n Translation [%s]' %
                                           (result['words'].origin, result['words'].pronunciation,
                                            result['words'].text))
            update.message.reply_text(text='Add custom word translation?', reply_markup=reply_markup)
        if result['global_word_search'] is True:
            # TODO: Add multiple search results
            update.message.reply_text(text='Found in data base search \n'
                                           'Word [%s] \n Pronunciation [%s]\n Translation [%s] \n Category [%s]' %
                                           (result['words'][0].name, result['words'][0].pronunciation,
                                            result['words'][0].translation, result['words'][0].category_set))
            student.HQ.add_from_global_word(global_word=result['words'][0])
            update.message.reply_text('Word(s) added')
            self.dispatch_destination(bot, update, student, 'Menu')

    @restricted
    def translation_option(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        if choice == 'Yes':
            student.destination = 'Add word translation'
            update.message.edit_text(text='Enter your translation:')
        elif choice == 'No':
            update.message.delete()
            self.dispatch_destination(bot, update, student, 'Add word category')
    @restricted
    def choose_from_presets(self, bot, update, student):
        student.callback_data = [c.name for c in self.categories]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        student.destination = 'Show category words'
        update.message.edit_text(text='Choose category', reply_markup=reply_markup)

    @restricted
    def show_category_words(self, bot, update, student):
        category = student.callback_data[int(update.callback_query.data)]
        category = self.categories.get(name=category)
        category_language = self.langs.get(name=student.student.current_language)
        category_words = self.global_words.filter(category=category, language=category_language)
        student.callback_data = [w.name for w in category_words]
        student.callback_data.insert(0, 'Add all')
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        student.destination = 'Add from global word'
        student.temp_data = {'category': category, 'words': category_words}
        update.message.edit_text(text='Choose word', reply_markup=reply_markup)

    @restricted
    def add_from_global_word(self, bot, update, student):
        word_name = student.callback_data[int(update.callback_query.data)]
        if word_name == 'Add all':
            for word in student.temp_data['words']:
                student.HQ.add_from_global_word(global_word=word)
        else:
            word = student.temp_data['words'].get(name=word_name)
            student.HQ.add_from_global_word(global_word=word)
        update.message.edit_text('Word(s) added')
        self.dispatch_destination(bot, update, student, 'Menu')