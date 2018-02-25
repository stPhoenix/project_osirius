from telegram_bot.utils import restricted, make_button_list, build_menu
from telegram import InlineKeyboardMarkup, InlineKeyboardButton
from telegram_bot.modulus.base import BaseModule

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
            'Learn words': 'self.learn_words',
            'Play matching': 'self.play_matching',
            'Play reversed matching': 'self.play_reversed_matching',
            'Play typing': 'self.play_typing',
            'Play reversed typing': 'self.play_reversed_typing',
        }

    def learn_words(self):
        pass