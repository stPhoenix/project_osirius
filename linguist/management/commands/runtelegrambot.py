from django.core.management.base import BaseCommand, CommandError
from telegram_bot.bot import Bot


class Command(BaseCommand):
    help = 'This command run telegram bot'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        print('Running bot')
        Bot()