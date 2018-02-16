from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler
import logging
from decouple import config
from users.models import Student
from django.db.models import ObjectDoesNotExist
from linguist.core import LinguistHQ
from linguist.models import Language, Category
from functools import wraps
# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.WARNING)

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
    @wraps(func)
    def wrapped(self, bot, update, student, *arg, **kwargs):
        try:
            student = self.users.get(username=update.effective_user.id)
            try:
                s = self.students[str(update.effective_user.id)]
            except KeyError:
                self.start(bot, update, *arg, **kwargs)
            return func(self, bot, update, s, *arg, **kwargs)
        except ObjectDoesNotExist:
            update.message.reply_text('Sorry! To access this command you need to be registered.'
                                      'Print /start')
            return
    return wrapped


class BotUserHandler:
    def __init__(self, student=None, for_register={}, callback_data=[], destination=None):
        # Register case:
        self.HQ = LinguistHQ(student=student) if student is not None else None
        self.destination = destination
        self.student = student
        self.for_register = for_register
        self.callback_data = callback_data


class Bot:
    def __init__(self):

        """Set LinguistHQ and destinations vars for message forwarding."""
        self.users = Student.objects.all()
        self.students = {}
        self.langs = Language.objects.all()

        self.setup_destinations()
        # Helper for unregistered users
        """Start the bot."""
        updater = Updater(config('TELEGRAM_TOKEN'))

        dp = updater.dispatcher

        dp.add_handler(CommandHandler("start", self.start))
        dp.add_handler(CommandHandler("help", self.help))
        dp.add_handler(CommandHandler("menu", self.menu))
        dp.add_handler(CommandHandler("delete", self.delete))

        dp.add_handler(MessageHandler(Filters.text, self.echo))

        dp.add_handler(CallbackQueryHandler(self.callback_handler))

        dp.add_error_handler(self.error)

        updater.start_polling()

        updater.idle()

    def setup_destinations(self):
        self.DESTINATIONS = {
            'Register': self.register,
            'Menu': self.menu,
            'Menu_action': self.menu_action,
            'Add words': self.add_words,
            'Add words option': self.add_words,
            'Look all your words': 'self.look_all_student_words',
            'Learn words': 'self.lean_words',
            'Play matching': 'self.play_matching',
            'Play reversed matching': 'self.play_reversed_matching',
            'Play typing': 'self.play_typing',
            'Play reversed typing': 'self.play_reversed_typing',
            'Help': self.help,
            'Settings': 'self.settings',
            'Add word by typing': self.add_custom_word,
            'Choose word from presets': 'self.choose_from_presets',
            'Search word': self.search_word
        }

    def start(self, bot, update):
        """Send a message when the command /start is issued."""
        text = None
        try:
            student = self.users.get(username=update.effective_user.id)
            try:
                self.students[student.username].destination
            except KeyError:
                self.students[str(update.effective_user.id)] = BotUserHandler(student=student, destination='Menu')
            text = 'Welcome %s. Type anything or /menu to show variants!'\
                   % self.students[student.username].student.first_name
        except ObjectDoesNotExist:
            text = 'Welcome stranger!' \
                   'To start learning tell a little bit more about yourself.' \
                   'What is your name?'
            self.students[str(update.effective_user.id)] = BotUserHandler(destination='Register')
        finally:
            update.message.reply_text(text)

    def help(self, bot, update):
        """Send a message when the command /help is issued."""
        update.message.reply_text('Help!')

    def echo(self, bot, update):
        """Forward the user message."""
        student = self.students[str(update.effective_user.id)]
        try:
            self.DESTINATIONS[student.destination](bot, update, student)
        except KeyError:
            update.message.reply_text('Sorry! I can not understand you.')
            self.menu(bot, update)

    def error(self, bot, update, error):
        """Log Errors caused by Updates."""
        logger.warning('Update "%s" caused error "%s"', update, error)

    @restricted
    def menu(self, bot, update, student):
        menu_list =[
            'Add words',
            'Look all your words',
            'Learn words',
            'Play matching',
            'Play reversed matching',
            'Play typing',
            'Play reversed typing',
            'Help',
            'Settings' ]
        student.callback_data = menu_list
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=2))
        student.destination ='Menu_action'
        update.message.reply_text(text='Menu', reply_markup=reply_markup)

    def register(self, bot, update):
        student = self.students[str(update.effective_user.id)]
        if student.for_register == {}:
            student.for_register = {'username': update.effective_user.id, 'first_name': update.message.text}
            student.callback_data = [l.name for l in self.langs]
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
            update.message.reply_text(text='Okay %s. Now choose your home language' % update.message.text,
                                      reply_markup=reply_markup)
        if len(student.for_register) == 4:
            update.message.edit_text('Alright!')
            password = Student.objects.make_random_password()
            user = Student.objects.create_user(username=str(student.for_register['username']),
                                                  password=password,
                                                  first_name=student.for_register['first_name'],
                                                  home_language=student.for_register['home_language'],
                                                  current_language=student.for_register['current_language'])
            learn_language = self.langs.get(name=student.for_register['current_language'])
            learn_language.students.add(user)
            student = BotUserHandler(student=user, destination='Menu')
            update.message.reply_text('Your username: %s \n'
                                      'Your password: %s \n'
                                      'You will need it in future web version. So write it somewhere in safe place. \n'
                                      'And DELETE this message for security purposes.'
                                      % student.student.username, password)
            self.menu(bot, update)
        if len(student.for_register) == 3:
            student.for_register['current_language'] = student.callback_data
            self.register(bot, update)
        if len(student.for_register) == 2:
            student.for_register['home_language'] = student.callback_data
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
            update.callback_query.message.edit_text(text='Great!')
            update.callback_query.message.reply_text(text='Now choose your learn language', reply_markup=reply_markup)

    @restricted
    def callback_handler(self, bot, update, student):
        update.message = update.callback_query.message
        try:
            self.DESTINATIONS[student.destination](bot, update, student)
        except KeyError:
            update.message.reply_text('Sorry! Something went wrong.')
            self.menu(bot, update)

    @restricted
    def delete(self, bot, update, student):
        student.student.delete()
        update.message.reply_text('User deleted')

    @restricted
    def menu_action(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        try:
            self.DESTINATIONS[choice](bot, update, student)
        except KeyError:
            update.message.reply_text('Sorry! Something went wrong.')
            self.menu(bot, update)
        student.destination = 'Menu'
        student.callback_data = []

    @restricted
    def add_words(self, bot, update, student):
        if student.destination == 'Add words option':
            choice = student.callback_data[int(update.callback_query.data)]
            self.DESTINATIONS[choice](bot, update, student)
        elif student.destination == 'Add words':
            student.callback_data = ['Add word by typing', 'Choose word from presets']
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
            student.destination = 'Add words'
            update.message.edit_text(text='How do you want to add word?', reply_markup=reply_markup)

    @restricted
    def add_custom_word(self, bot, update, student):
        if student.destination == 'Add custom word':
            pass
        elif student.destination == 'Add word by typing':
            student.destination = 'Search word'
            update.message.reply_text('Enter foreign word')

    @restricted
    def search_word(self, bot, update, student):
        if student.destination == 'Search word':
            search_language = self.langs.get(name=student.student.current_language)
            result = student.HQ.search_word(word_name=update.message.text.strip(), language=search_language)
            if result['global_word_search'] is False and result['google_translate_search'] is False:
                # TODO: Word_add_category func
                update.message.edit_text(text='Sorry. Could not find any translation. Enter your translation:')