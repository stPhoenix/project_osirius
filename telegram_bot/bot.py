from telegram import InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler
import logging
from decouple import config
from users.models import Student
from django.db.models import ObjectDoesNotExist
from linguist.models import Language, Category, GlobalWord
from telegram_bot.utils import BotUserHandler, restricted, make_button_list, build_menu
from telegram_bot.modulus.register import Register
from telegram_bot.modulus.addwords import AddWords
from telegram_bot.modulus.viewwords import ViewWords
from telegram_bot.modulus.learnwords import LearnWords
from telegram_bot.modulus.telegramlinker import TelegramLinker

logger = logging.getLogger(__name__)


class Bot:
    def __init__(self, test=False):
        """Set LinguistHQ and destinations vars for message forwarding."""
        self.users = Student.objects.all()
        self.students = {}
        self.langs = Language.objects.all()
        self.categories = Category.objects.all()
        self.global_words = GlobalWord.objects.all()

        self.menu_text = '[You can always go back to /menu]'
        self.setup_destinations()
        """Start the bot."""
        updater = Updater(token=config('TELEGRAM_TOKEN'), workers=2)

        dp = updater.dispatcher

        dp.add_handler(CommandHandler("start", self.start))
        dp.add_handler(CommandHandler("help", self.help))
        dp.add_handler(CommandHandler("menu", self.menu))
        dp.add_handler(CommandHandler("delete", self.delete))
        dp.add_handler(CommandHandler("link", self.link_telegram))
        dp.add_handler(CommandHandler("regiter", self.register))

        dp.add_handler(MessageHandler(Filters.text, self.echo))

        dp.add_handler(CallbackQueryHandler(self.callback_handler))

        dp.add_error_handler(self.error)

        if not test:
            updater.start_polling(poll_interval=1)
            updater.idle()

    def setup_destinations(self):
        """
        Destinations is an array with pairs of key value where :
        key used in bot message handlers
        value used to start the function to respond to user message
        """
        self.DESTINATIONS = {
            'Menu': self.menu,
            'Menu_action': self.menu_action,
            'Help': self.help,
            'Change learn language': self.change_learn_language,
            'Add more learn language': self.add_more_learn_language,
            'Change language': self.change_language,
        }
        class_args = {
            'langs': self.langs,
            'dispatch_destination': self.dispatch_destination,
            'students': self.students,
            'menu_text': self.menu_text,
            'categories': self.categories,
            'global_words': self.global_words,
            'users': self.users,
        }
        self.registration = Register(**class_args)
        self.addwords = AddWords(**class_args)
        self.viewwords = ViewWords(**class_args)
        self.learnwords = LearnWords(**class_args)
        self.telegramlinker = TelegramLinker(**class_args)
        self.DESTINATIONS = dict(**self.DESTINATIONS,
                                 **self.registration.get_destinations(),
                                 **self.addwords.get_destinations(),
                                 **self.viewwords.get_destinations(),
                                 **self.learnwords.get_destinations(),
                                 **self.telegramlinker.get_destinations())

    def dispatch_destination(self, bot, update, student, destination):
        """
        Helper function to forward messages by there destination param
        :param bot: telegram.ext.Dispatcher.bot
        :param update: telegram.Update
        :param student: users.models.Student
        :param destination: a key in self.DESTINATIONS to forward message
        """
        student.destination = destination
        self.echo(bot, update)

    def start(self, bot, update):
        """Send a message when the command /start is issued."""
        text = None
        try:
            student = self.users.get(telegram=update.effective_user.id)
            try:
                self.students[str(student.telegram)].destination
            except KeyError:
                self.students[str(update.effective_user.id)] = BotUserHandler(student=student)
                self.students[str(update.effective_user.id)].destination = 'Menu'
            text = 'Welcome %s. Type anything or /menu to show variants!'\
                   % self.students[str(student.telegram)].student.first_name
        except ObjectDoesNotExist:
            text = 'Welcome stranger!' \
                   'If you have account on web site type /link ' \
                   'If you new one type /register'
            self.students[str(update.effective_user.id)] = BotUserHandler()
        finally:
            update.message.reply_text(text)

    def register(self, bot, update):
        text = 'To start learning tell a little bit more about yourself.' \
               'What is your name?'
        self.students[str(update.effective_user.id)].destination = 'Register first name'
        update.message.reply_text(text)

    def link_telegram(self, bot, update):
        self.students[str(update.effective_user.id)].destination = 'Take username'
        update.message.reply_text('Enter your username:')

    def help(self, bot, update, student):
        """Send a message when the command /help is issued."""
        update.message.reply_text('Have any questions? Write it to saintdevs@gmail.com')

    def echo(self, bot, update):
        """Forward the user message."""
        try:
            student = self.students[str(update.effective_user.id)]
        except KeyError:
            self.start(bot, update)
            return
        try:
            self.DESTINATIONS[student.destination](bot, update, student)
        except KeyError:
            update.message.reply_text('Sorry! I can not understand you.')
            self.dispatch_destination(bot, update, student, 'Menu')

    def error(self, bot, update, error):
        """Log Errors caused by Updates."""
        logger.warning('Update "%s" caused error "%s"', update, error)

    @restricted
    def menu(self, bot, update, student):
        """
         Display bot menu
        :param bot: telegram.ext.Dispatcher.bot
        :param update: telegram.Update
        :param student: users.models.Student
        """
        menu_list =[
            'Add words',
            'My words',
            'Learn words',
            'Play matching',
            'Play reversed matching',
            'Play typing',
            'Play reversed typing',
            'Help',
            'Change learn language',
            'Add more learn language',
        ]
        student.callback_data = menu_list
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=2))
        student.destination = 'Menu_action'
        update.message.reply_text(text='Menu'+self.menu_text, reply_markup=reply_markup)

    def callback_handler(self, bot, update):
        """
        Handle buttons click in telegram InlineButton for example
        :param bot: telegram.ext.Dispatcher.bot
        :param update: telegram.Update
        """
        student = self.students[str(update.effective_user.id)]
        update.message = update.callback_query.message
        try:
            self.dispatch_destination(bot, update, student, student.destination)
        except KeyError:
            logger.error('KEY ERROR in destinations: %s' % student.destination)
            update.message.reply_text('Sorry! Something went wrong.')
            self.dispatch_destination(bot, update, student, 'Menu')

    @restricted
    def delete(self, bot, update, student):
        """ Delete user if exists"""
        student.student.delete()
        update.message.reply_text('User deleted')

    @restricted
    def menu_action(self, bot, update, student):
        """Handle selected menu option"""
        choice = student.callback_data[int(update.callback_query.data)]
        try:
            self.dispatch_destination(bot, update, student, choice)
        except KeyError:
            update.message.reply_text('Sorry! Something went wrong.'+self.menu_text)
            student.callback_data = []
            self.dispatch_destination(bot, update, student, 'Menu')

    @restricted
    def change_learn_language(self, bot, update, student):
        """
        Change student current learn language from list of all student learn languages
        :param bot: telegram.ext.Dispatcher.bot
        :param update: telegram.Update
        :param student: users.models.Student
        """
        student.destination = 'Change language'
        cats = student.student.language_set.all()
        student.callback_data = [c.name for c in cats]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.callback_query.message.edit_text('Choose your learn language'+self.menu_text, reply_markup=reply_markup)

    @restricted
    def add_more_learn_language(self, bot, update, student):
        """
        Adding new learn language for student from list
        :param bot: telegram.ext.Dispatcher.bot
        :param update: telegram.Update
        :param student: users.models.Student
        """
        student.destination = 'Change language'
        student.callback_data = [l.name for l in self.langs]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.callback_query.message.edit_text('Choose your new learn language'+self.menu_text,
                                                reply_markup=reply_markup)

    @restricted
    def change_language(self, bot, update, student):
        """
        Proccessing user selected option from self.change_learn_language and self.add_more_learn_language
        :param bot: telegram.ext.Dispatcher.bot
        :param update: telegram.Update
        :param student: users.models.Student
        """
        choice = student.callback_data[int(update.callback_query.data)]
        language = self.langs.get(name=choice)
        if language not in student.student.language_set.all():
            language.students.add(student.student)
        student.student.learn_language = choice
        update.message.edit_text('Alright! Good luck!'+self.menu_text)
