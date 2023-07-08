from django.core.management.base import BaseCommand, CommandError
from linguist.models import Category
from django.db.models import ObjectDoesNotExist


class Command(BaseCommand):
    help = 'This command create categories for words'

    cats = [
        'Default',
        'Greetings',
        'New Friends',
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
        'Animals',
        'Body',
        'Body Care',
        'Books and Things to Read',
        'Buildings',
        'Business',
        'Calendar',
        'Cars',
        'Celebrations',
        'City',
        'Clothes',
        'Colors',
        'Computers',
        'Eating, Food & Drinks',
        'Gardening and Plants',
        'Geography',
        'Health',
        'Holidays',
        'House',
        'Law',
        'Math',
        'Miscellaneous',
        'Music',
        'Office',
        'Parts',
        'People',
        'School',
        'Science',
        'Seasons',
        'Security',
        'Sports',
        'Time',
        'Tools',
        'Transportation',
        'Travel',
        'Weather',
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