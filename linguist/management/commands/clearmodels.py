from django.core.management.base import BaseCommand, CommandError
from linguist.models import Category, Word, GlobalWord, Language
from users.models import Student


class Command(BaseCommand):
    help = 'This command clear data in models: Category, Word, GlobalWord, Language, Student'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        Category.objects.all().delete()
        Word.objects.all().delete()
        GlobalWord.objects.all().delete()
        Language.objects.all().delete()
        Student.objects.all().delete()
        print('Done')