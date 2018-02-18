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
    def wrapped(self, bot, update, student=None, *arg, **kwargs):
        try:
            s = self.users.get(username=update.effective_user.id)
            try:
                student = self.students[str(update.effective_user.id)]
                logger.warning('WRAPPER DESTINATION: %s' % student.destination)
                return func(self, bot, update, student, *arg, **kwargs)
            except KeyError:
                self.start(bot, update, *arg, **kwargs)
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


class Bot:
    def __init__(self):

        """Set LinguistHQ and destinations vars for message forwarding."""
        self.users = Student.objects.all()
        self.students = {}
        self.langs = Language.objects.all()
        self.categories = Category.objects.all()

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
            'Register first name': self.register_first_name,
            'Register home language': self.register_home_language,
            'Register current language': self.register_current_language,
            'Create user': self.create_user,
            'Menu': self.menu,
            'Menu_action': self.menu_action,
            'Add words': self.add_words,
            'Add words option': self.add_words_option,
            'Look all your words': 'self.look_all_student_words',
            'Learn words': 'self.learn_words',
            'Play matching': 'self.play_matching',
            'Play reversed matching': 'self.play_reversed_matching',
            'Play typing': 'self.play_typing',
            'Play reversed typing': 'self.play_reversed_typing',
            'Help': self.help,
            'Settings': 'self.settings',
            'Add word by typing': self.add_word_by_typing,
            'Choose word from presets': 'self.choose_from_presets',
            'Search word': self.search_word,
            'Add word translation': self.add_word_translation,
            'Add custom word': self.add_custom_word,
            'Translation option': self.translation_option,
            'Add word category': self.add_word_category,
        }

    def start(self, bot, update):
        """Send a message when the command /start is issued."""
        text = None
        try:
            student = self.users.get(username=update.effective_user.id)
            try:
                self.students[student.username].destination
            except KeyError:
                self.students[str(update.effective_user.id)] = BotUserHandler(student=student)
                self.students[str(update.effective_user.id)].destination = 'Menu'
            text = 'Welcome %s. Type anything or /menu to show variants!'\
                   % self.students[student.username].student.first_name
        except ObjectDoesNotExist:
            text = 'Welcome stranger!' \
                   'To start learning tell a little bit more about yourself.' \
                   'What is your name?'
            self.students[str(update.effective_user.id)] = BotUserHandler()
            self.students[str(update.effective_user.id)].destination = 'Register first name'
        finally:
            update.message.reply_text(text)

    def help(self, bot, update):
        """Send a message when the command /help is issued."""
        update.message.reply_text('Help!')

    def echo(self, bot, update):
        """Forward the user message."""
        try:
            student = self.students[str(update.effective_user.id)]
        except KeyError:
            self.start()
        logger.warning('ECHO DESTINATION: %s' % student.destination)
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
        student.destination = 'Menu_action'
        update.message.reply_text(text='Menu', reply_markup=reply_markup)

    def register_first_name(self, bot, update, student):
        student.destination = 'Register home language'
        student.temp_data = {'username': update.effective_user.id, 'first_name': update.message.text}
        student.callback_data = [l.name for l in self.langs]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.reply_text(text='Okay %s. Now choose your home language' % update.message.text,
                                  reply_markup=reply_markup)

    def register_home_language(self, bot, update, student):
        student.destination = 'Register current language'
        student.temp_data['home_language'] = student.callback_data[int(update.callback_query.data)]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.callback_query.message.edit_text(text='Now choose your learn language', reply_markup=reply_markup)

    def register_current_language(self, bot, update, student):
        student.temp_data['current_language'] = student.callback_data[int(update.callback_query.data)]
        self.create_user(bot, update, student)

    def create_user(self, bot, update, student):
        password = Student.objects.make_random_password()
        user = Student.objects.create_user(username=str(student.temp_data['username']),
                                           password=password,
                                           first_name=student.temp_data['first_name'],
                                           home_language=student.temp_data['home_language'],
                                           current_language=student.temp_data['current_language'])
        learn_language = self.langs.get(name=student.temp_data['current_language'])
        learn_language.students.add(user)
        # TODO: Do something with not updating student
        student = BotUserHandler(student=user)
        update.message.edit_text('Your username: %s \n'
                                 'Your password: %s \n'
                                 'You will need it in future web version. So write it somewhere in safe place. \n'
                                 'And DELETE this message for security purposes.'
                                 % (student.student.username, password), reply_markup=None)
        student.destination = 'Menu'
        self.menu(bot, update, student)

    def callback_handler(self, bot, update):
        student = self.students[str(update.effective_user.id)]
        update.message = update.callback_query.message
        logger.warning('CALLBACK HANDLER DESTINATION: %s' % student.destination)
        try:
            self.DESTINATIONS[student.destination](bot, update, student)
        except KeyError:
            logger.warning('KEY ERROR in destinations: %s' % student.destination)
            update.message.reply_text('Sorry! Something went wrong.')
            self.menu(bot, update)

    @restricted
    def delete(self, bot, update, student):
        student.student.delete()
        update.message.reply_text('User deleted')

    @restricted
    def menu_action(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        logger.warning('MENU ACTION DESTINATION: %s' % student.destination)
        try:
            self.DESTINATIONS[choice](bot, update, student)
        except KeyError:
            update.message.reply_text('Sorry! Something went wrong.')
            student.destination = 'Menu'
            student.callback_data = []
            self.menu(bot, update)

    @restricted
    def add_words(self, bot, update, student):
        student.callback_data = ['Add word by typing', 'Choose word from presets']
        student.destination = 'Add words option'
        logger.warning('ADD WORDS ELSE ENTERED. DESTINATION: %s' % student.destination)
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.edit_text(text='How do you want to add word?', reply_markup=reply_markup)

    @restricted
    def add_words_option(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        logger.warning('CHOICE %s' % choice)
        student.destination = choice
        self.DESTINATIONS[choice](bot, update, student)

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
        student.destination = 'Add word category'
        student.temp_data['translation'] = update.message.text.strip()
        self.add_word_category(bot, update, student)

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
            student.destination = 'Add word category'
            self.add_word_category(bot, update, student)