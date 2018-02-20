from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup
from telegram_bot.modulus.base import BaseModule

import logging
# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.WARNING)

logger = logging.getLogger(__name__)


class ViewWords(BaseModule):
    def __init__(self, langs, dispatch_destination, users, students, **kwargs):
        super(ViewWords, self).__init__(langs, dispatch_destination, users, students)

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Look all your words': self.look_all_student_words,
            'View category words': self.view_category_words,
            'Delete word': self.delete_word,
            'Change translation': self.change_translation,
            'My words': self.my_words,
            'Look learned words': self.look_learned_words,
            'Manage word': self.manage_word,
        }

    @restricted
    def my_words(self, bot, update, student):
        pass

    @restricted
    def look_all_student_words(self,bot, update, student):
        pass

    @restricted
    def look_learned_words(self, bot, update, student):
        pass

    @restricted
    def view_category_words(self, bot, update, student):
        pass

    @restricted
    def manage_word(self, bot, update, student):
        pass

    @restricted
    def delete_word(self, bot, update, student):
        pass

    @restricted
    def change_translation(self, bot, update, student):
        pass

    @restricted
    def learn_again(self, bot, update, student):
        pass