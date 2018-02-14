from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
from decouple import config
from users.models import Student
from django.db.models import ObjectDoesNotExist
from linguist.core import LinguistHQ
# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)


class Bot:
    # Define a few command handlers. These usually take the two arguments bot and
    # update. Error handlers also receive the raised TelegramError object in error.

    def __init__(self):

        """Set LinguistHQ and destinations vars for message forwarding."""
        self.HQ = None
        self.destination = None
        self.student = None

        """Start the bot."""
        updater = Updater(config('TELEGRAM_TOKEN'))

        dp = updater.dispatcher

        dp.add_handler(CommandHandler("start", self.start))
        dp.add_handler(CommandHandler("help", self.help))

        dp.add_handler(MessageHandler(Filters.text, self.echo))

        dp.add_error_handler(self.error)

        updater.start_polling()

        updater.idle()

    def start(self, bot, update):
        """Send a message when the command /start is issued."""
        text = None
        try:
            self.student = Student.objects.get(username=update.message.from_user.id)
            self.HQ = LinguistHQ(self.student)
            text = 'Welcome %s!' % self.student.first_name
        except ObjectDoesNotExist:
            text = 'Welcome stranger!' \
                   'To start learning tell a little bit more about yourself.' \
                   'What is your name?'
            self.destination = 'Register'
        finally:
            update.message.reply_text(text)

    def help(self, bot, update):
        """Send a message when the command /help is issued."""
        update.message.reply_text('Help!')

    def echo(self, bot, update):
        """Echo the user message."""
        if self.destination == 'Register':
            self.register(bot, update)
        else:
            update.message.reply_text('Sorry! I can not understand you.')

    def error(self, bot, update, error):
        """Log Errors caused by Updates."""
        logger.warning('Update "%s" caused error "%s"', update, error)

    def menu(self, bot, update):
        update.message.reply_text(
            '1. Add words' \
            '2. Look all your words' \
            '3. Learn words' \
            '4. Play matching' \
            '5. Play reversed matching' \
            '6. Play typing' \
            '7. Play revers typing' \
            '8. Settings' \
            '9. Help' )

    def register(self, bot, update):
        pass