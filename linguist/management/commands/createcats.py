from django.core.management.base import BaseCommand, CommandError
from linguist.models import Category
from django.db.models import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'This command create categories for words'

    cats = [
        'Default',
        'Greetings',
        'New friends',
        'Countries',
        'Majors',
        'Occupations',
        'Family',
        'Numbers',
        'Words that point',
        'Food',
        'Things',
        'Places',
        'Money matter',
        'Expressions',
            ]

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for c in self.cats:
            try:
                Category.objects.get(name=c)
            except ObjectDoesNotExist:
                category = Category(name=c)
                category.save()
                print('Added %s' % c)
        print('Done')