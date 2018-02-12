from django.core.management.base import BaseCommand, CommandError
from linguist.models import Category


class Command(BaseCommand):
    help = 'This command create categories for words'

    cats = [
        'Default',
        'Greetings',
            ]

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for c in self.cats:
            category = Category(name = c)
            category.save()
            print('Added %s' % c)
        print('Done')