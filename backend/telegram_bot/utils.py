from functools import wraps
from django.db.models import ObjectDoesNotExist
from linguist.core import LinguistHQ
from telegram import InlineKeyboardButton
import logging

logger = logging.getLogger(__name__)


def build_menu(buttons, n_cols, header_buttons=None, footer_buttons=None):
    menu = [buttons[i:i + n_cols] for i in range(0, len(buttons), n_cols)]
    if header_buttons:
        menu.insert(0, header_buttons)
    if footer_buttons:
        menu.append(footer_buttons)
    return menu


def make_button_list(self, update, student):
    callback_data = student.callback_data
    return [InlineKeyboardButton(l, callback_data=callback_data.index(l)) for l in callback_data]


def restricted(func):
    """
    Helper function to check weather user is registered and have telegram  or not
    """
    @wraps(func)
    def wrapped(self, update, context, student=None, *arg, **kwargs):
        try:
            s = self.users.get(telegram=update.effective_user.id)
            try:
                student = self.students[str(update.effective_user.id)]
                return func(self, update, context, student, *arg, **kwargs)
            except KeyError:
                self.start(update, context, *arg, **kwargs)
        except ObjectDoesNotExist as e:
            update.message.reply_text('Sorry! To access this command you need to be registered.'
                                      'Print /start')
            logger.error(e)
            return
    return wrapped


class BotUserHandler:
    def __init__(self, student=None):
        # Register case:
        self.HQ = LinguistHQ(student=student) if student is not None else None
        self.destination = None
        self.student = student
        self.temp_data = {}
        self.callback_data = {}
