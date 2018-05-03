from telegram_bot.utils import BotUserHandler
from telegram_bot.modulus.base import BaseModule
from django.contrib.auth import authenticate


class TelegramLinker(BaseModule):
    def setup_destinations(self):
        """
        Destinations is an array with pairs of key value where :
        key used in bot message handlers
        value used to start the function to respond to user message
        """
        self.DESTINATIONS = {
            'Take username': self.take_username,
            'Take password': self.take_password,
        }

    def take_username(self, bot, update, student):
        student.destination = 'Take password'
        student.temp_data['username'] = update.message.text
        update.message.reply_text('Enter your password:')

    def take_password(self, bot, update, student):
        user = authenticate(username=student.temp_data['username'], password=update.message.text)
        if user is not None:
            user.telegram = update.effective_user.id
            user.save()
            self.students[str(update.effective_user.id)] = BotUserHandler(user)
            text = "Succes! Type /menu"
        else:
            text = "Failure! Type /start to try again"
        update.message.reply_text(text)