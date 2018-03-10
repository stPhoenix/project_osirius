from django.core.management.base import BaseCommand, CommandError
from linguist.models import Category, GlobalWord, Language
from django.db.models import ObjectDoesNotExist
from linguist.management.commands.words.japanese import ja_words


class Command(BaseCommand):
    help = 'This command create categories for words'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        self.add_words(ja_words)
        print('Done')

    def add_words(self, words):
        for word in words:
            lang = Language.objects.get(slug=word['language'])
            print('CATEGORY: %s' % word['category'])
            try:
                GlobalWord.objects.get(name=word['name'], translation=word['translation'], language=lang)
            except ObjectDoesNotExist:
                category = Category.objects.get(name=word['category'])
                word = GlobalWord(name=word['name'],
                                  translation=word['translation'],
                                  pronunciation=word['pronunciation'],
                                  language=lang)
                word.save()
                word.category_set.add(category)