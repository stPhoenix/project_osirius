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


def make_button_list(self, update):
    return [InlineKeyboardButton(l, callback_data=self.students[str(update.effective_user.id)].callback_data.index(l))
            for l in self.students[str(update.effective_user.id)].callback_data]


def restricted(func):
    @wraps(func)
    def wrapped(self, bot, update, *arg, **kwargs):
        try:
            student = Student.objects.get(username=update.effective_user.id)
            try:
                s = self.students[str(update.effective_user.id)]
            except KeyError:
                self.start(bot, update, *arg, **kwargs)
            return func(self, bot, update, *arg, **kwargs)
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
    # Define a few command handlers. These usually take the two arguments bot and
    # update. Error handlers also receive the raised TelegramError object in error.
    DESTINATIONS = {
        'Register': 'self.register',
        'Menu': 'self.menu',
        'Menu_action': 'self.callback_handler',
        'Add_words': 'self.add_words',
        'Add_custom_word':'self.add_custom_word',
        'Add_from_global_word': 'self.add_from_global_word',
        'Search_word': 'self.search_word'
    }

    def __init__(self):

        """Set LinguistHQ and destinations vars for message forwarding."""
        self.students = {}
        self.langs = Language.objects.all()
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

    def start(self, bot, update):
        """Send a message when the command /start is issued."""
        text = None
        try:
            student = Student.objects.get(username=update.effective_user.id)
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
        if self.students[str(update.effective_user.id)].destination == 'Register':
            self.register(bot, update)
        elif self.students[str(update.effective_user.id)].destination == 'Menu':
            self.menu(bot, update)
        else:
            update.message.reply_text('Sorry! I can not understand you.')
            self.menu(bot, update)

    def error(self, bot, update, error):
        """Log Errors caused by Updates."""
        logger.warning('Update "%s" caused error "%s"', update, error)

    @restricted
    def menu(self, bot, update):
        menu_list =[
            '1. Add words',
            '2. Look all your words',
            '3. Learn words',
            '4. Play matching',
            '5. Play reversed matching',
            '6. Play typing',
            '7. Play revers typing',
            '8. Help',
            '9. Settings' ]
        self.students[str(update.effective_user.id)].callback_data = menu_list
        button_list = [InlineKeyboardButton(l, callback_data=self.students[str(update.effective_user.id)].callback_data.index(l)) for l
                       in self.students[str(update.effective_user.id)].callback_data]
        reply_markup = InlineKeyboardMarkup(build_menu(button_list, n_cols=2))
        self.students[str(update.effective_user.id)].destination ='Menu_action'
        update.message.reply_text(text='Menu', reply_markup=reply_markup)

    def register(self, bot, update):
        if self.students[str(update.effective_user.id)].for_register == {}:
            self.students[str(update.effective_user.id)].for_register = {'username': update.effective_user.id,
                                                                         'first_name': update.message.text}
            self.students[str(update.effective_user.id)].callback_data = [l.name for l in self.langs]
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update), n_cols=1))
            update.message.reply_text(text='Okay %s. Now choose your home language' % update.message.text,
                                      reply_markup=reply_markup)
        elif len(self.students[str(update.effective_user.id)].for_register) == 4:
            update.message.edit_text('Alright!')
            password = Student.objects.make_random_password()
            student = Student.objects.create_user(username=str(self.students[str(update.effective_user.id)].for_register['username']),
                                                  password=password,
                                                  first_name=self.students[str(update.effective_user.id)].for_register['first_name'],
                                                  home_language=self.students[str(update.effective_user.id)].for_register['home_language'],
                                                  current_language=self.students[str(update.effective_user.id)].for_register['current_language'])
            learn_language = self.langs.get(name=self.students[str(update.effective_user.id)].for_register['current_language'])
            learn_language.students.add(student)
            self.students[str(update.effective_user.id)] = BotUserHandler(student=student, destination='Menu')
            update.message.reply_text('Your username: %s \n'
                                      'Your password: %s \n'
                                      'You will need it in future web version. So write it somewhere in safe place. \n'
                                      'And DELETE this message for security purposes.'
                                      % (self.students[str(update.effective_user.id)].student.username, password))
            self.menu(bot, update)
        #update.message.reply_text(text

    @restricted
    def callback_handler(self, bot, update):
        data = self.students[str(update.effective_user.id)].callback_data[int(update.callback_query.data)]
        destination = self.students[str(update.effective_user.id)].destination
        for_register = self.students[str(update.effective_user.id)].for_register
        if destination == 'Register' and len(for_register) == 3:
            for_register['current_language'] = data
            update.message = update.callback_query.message
            self.register(bot, update)
        if destination == 'Register' and len(for_register) == 2:
            for_register['home_language'] = data
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update), n_cols=1))
            update.callback_query.message.edit_text(text='Great!')
            update.callback_query.message.reply_text(text='Now choose your learn language', reply_markup=reply_markup)
        if destination == 'Menu_action':
            self.menu_action(bot, update)
        if destination == 'Add_words':
            self.add_words(bot, update)

    @restricted
    def delete(self, bot, update):
        self.students[str(update.effective_user.id)].student.delete()
        update.message.reply_text('User deleted')
    @restricted
    def menu_action(self, bot, update):
        choice = self.students[str(update.effective_user.id)].callback_data[int(update.callback_query.data)]
        update.message = update.callback_query.message
        if choice == '1. Add words':
            self.add_words(bot, update)
        elif choice == '2. Look all your words':
            pass
            #self.look_all_student_words(bot, update)
        elif choice == '3. Learn words':
            pass
            #self.learn_words(bot, update)
        elif choice == '4. Play matching':
            pass
            #self.play_matching(bot, update)
        elif choice == '5. Play reversed matching':
            pass
        elif choice == '6. Play typing':
            pass
            #self.play_typing(bot, update)
        elif choice == '7. Play revers typing':
            pass
        elif choice == '8. Help':
            self.help(bot, update)
        elif choice == '9. Settings':
            pass
            #self.settings(bot, update)
        self.students[str(update.effective_user.id)].callback_data = []
        self.students[str(update.effective_user.id)].destination = 'Menu'

    @restricted
    def add_words(self, bot, update):
        if self.students[str(update.effective_user.id)].destination == 'Add_words':
            choice = self.students[str(update.effective_user.id)].callback_data[int(update.callback_query.data)]
            if choice == 'Add word by typing':
                self.add_custom_word(bot, update)
            elif choice == 'Choose word from presets':
                pass
                #self.add_from_global_word(bot, update)
            self.students[str(update.effective_user.id)].destination = 'Menu'
        else:
            self.students[str(update.effective_user.id)].callback_data = ['Add word by typing', 'Choose word from presets']
            reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update), n_cols=1))
            self.students[str(update.effective_user.id)].destination = 'Add_words'
            update.message.edit_text(text='How do you want to add word?', reply_markup=reply_markup)
        self.students[str(update.effective_user.id)].callback_data = []

    @restricted
    def add_custom_word(self, bot, update):
        if self.students[str(update.effective_user.id)].destination == 'Add_custom_word':
            pass
        else:
            self.students[str(update.effective_user.id)].destination = 'Search_word'
            update.message.reply_text('Enter foreign word')

    @restricted
    def search_word(self, bot, update):
        search_language = self.langs.get(name=self.students[str(update.effective_user.id)].student.current_language)
        result = self.students[str(update.effective_user.id)].HQ.search_word(word_name=update.message.text.strip(),
                                                                             language=search_language)
        if result['global_word_search'] is False and result['google_translate_search'] is False:
            pass
