from django.core.management.base import BaseCommand, CommandError
from linguist.models import Category, GlobalWord, Language


class Command(BaseCommand):
    help = 'This command create categories for words'

    greetings_words = {
        'あいさつ': 'Greetings',
        'おはよう': 'good morning',
        'ありがとう': 'Thank you',
        'すみません': 'Excuse me',
        'いいえ': 'No, not at all',
    }
    newfriends_words = {
        'あたらしいともだち': 'New Friends',
        'あの': 'um',
        'いま': 'now',
        'えいご': 'English(language)',
        'ええ': 'yes',
        'がくせい': 'student',
    }

    countries_words = {
        'アメリカ': 'U.S.A.',
        'イギリス': 'Britian',
        'オーストラリア': 'Australia',
        'かんこく': 'Korea',
        'スウェーデン': 'Sweden',
        'ちゅうごく': 'China'
    }

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        lang = Language.objects.get(slug='ja')
        category = Category.objects.all()
        self.add_words(self.greetings_words, category.get(name='Greetings'), lang)
        self.add_words(self.newfriends_words, category.get(name='New friends'), lang)
        self.add_words(self.countries_words, category.get(name='Countries'), lang)
        print('Done')

    def add_words(self, words, category, language):
        for key, value in words.items():
            word = GlobalWord(name=key, translation=value, language=language)
            word.save()
            word.category_set.add(category)