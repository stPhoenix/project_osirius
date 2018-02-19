from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup
from telegram_bot.modulus.base import BaseModule


class AddWords(BaseModule):
    def setup_destinations(self):
        self.DESTINATIONS = {
            'Add words': self.add_words,
            'Add words option': self.add_words_option,
            'Add word by typing': self.add_word_by_typing,
            'Choose word from presets': 'self.choose_from_presets',
            'Search word': self.search_word,
            'Add word translation': self.add_word_translation,
            'Add custom word': self.add_custom_word,
            'Translation option': self.translation_option,
            'Add word category': self.add_word_category,
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
        elif result['google_translate_search'] is True:
            student.temp_data['word_name'] = result['words'].origin
            student.temp_data['translation'] = result['words'].text
            student.temp_data['pronunciation'] = result['words'].pronunciation
            student.callback_data = ['Yes', 'No']
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=2))
            student.destination = 'Translation option'
            update.message.reply_text(text='Word [%s] Pronunciation [%s] Translation [%s]' %
                                           (result['words'].origin, result['words'].pronunciation,
                                            result['words'].text))
            update.message.reply_text(text='Add custom word translation?', reply_markup=reply_markup)

    @restricted
    def translation_option(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        if choice == 'Yes':
            student.destination = 'Add word translation'
            update.message.edit_text(text='Enter your translation:')
        elif choice == 'No':
            update.message.delete()
            self.dispatch_destination(bot, update, student, 'Add word category')