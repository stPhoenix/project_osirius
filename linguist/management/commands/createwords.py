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
        for key, value in words.items():
            lang = Language.objects.get(slug=value['language'])
            try:
                GlobalWord.objects.get(name=key, translation=value, language=lang)
            except ObjectDoesNotExist:
                category = Category.objects.get(name=value['category'])
                word = GlobalWord(name=key, translation=value, language=lang)
                word.save()
                word.category_set.add(category)