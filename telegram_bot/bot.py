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
# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.WARNING)

logger = logging.getLogger(__name__)


class Bot:
    def __init__(self):

        """Set LinguistHQ and destinations vars for message forwarding."""
        self.users = Student.objects.all()
        self.students = {}
        self.langs = Language.objects.all()
        self.categories = Category.objects.all()
        self.global_words = GlobalWord.objects.all()

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
            'Menu': self.menu,
            'Menu_action': self.menu_action,
            'Learn words': 'self.learn_words',
            'Play matching': 'self.play_matching',
            'Play reversed matching': 'self.play_reversed_matching',
            'Play typing': 'self.play_typing',
            'Play reversed typing': 'self.play_reversed_typing',
            'Help': self.help,
            'Settings': 'self.settings',
            'Update users': self.update_users,
        }
        self.register = Register(self.langs, self.dispatch_destination, self.users, self.students)
        self.DESTINATIONS = dict(**self.DESTINATIONS, **self.register.get_destinations())
        self.addwords = AddWords(self.langs, self.dispatch_destination, self.users, self.students,
                                 categories=self.categories, global_words=self.global_words)
        self.DESTINATIONS = dict(**self.DESTINATIONS, **self.addwords.get_destinations())
        self.viewwords = ViewWords(self.langs, self.dispatch_destination, self.users, self.students,
                                 categories=self.categories)
        self.DESTINATIONS = dict(**self.DESTINATIONS, **self.viewwords.get_destinations())

    def dispatch_destination(self, bot, update, student, destination):
        student.destination = destination
        self.echo(bot, update)

    def update_users(self, bot, update, student):
        self.users = Student.objects.all()
        self.dispatch_destination(bot, update, student, 'Menu')

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
            self.dispatch_destination(bot, update, student, 'Menu')

    def error(self, bot, update, error):
        """Log Errors caused by Updates."""
        logger.warning('Update "%s" caused error "%s"', update, error)

    @restricted
    def menu(self, bot, update, student):
        menu_list =[
            'Add words',
            'My words',
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

    def callback_handler(self, bot, update):
        student = self.students[str(update.effective_user.id)]
        update.message = update.callback_query.message
        logger.warning('CALLBACK HANDLER DESTINATION: %s' % student.destination)
        try:
            self.DESTINATIONS[student.destination](bot, update, student)
        except KeyError:
            logger.warning('KEY ERROR in destinations: %s' % student.destination)
            update.message.reply_text('Sorry! Something went wrong.')
            self.dispatch_destination(bot, update, student, 'Menu')

    @restricted
    def delete(self, bot, update, student):
        student.student.delete()
        update.message.reply_text(bot, update, student, 'User deleted')

    @restricted
    def menu_action(self, bot, update, student):
        choice = student.callback_data[int(update.callback_query.data)]
        logger.warning('MENU ACTION DESTINATION: %s' % student.destination)
        try:
            self.DESTINATIONS[choice](bot, update, student)
        except KeyError:
            update.message.reply_text('Sorry! Something went wrong.')
            student.callback_data = []
            self.dispatch_destination(bot, update, student, 'Menu')