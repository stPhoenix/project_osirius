from django.test import TestCase
from news.models import Article
from linguist.models import Category, Language, GlobalWord, Word
from users.models import Student
from linguist.core import LinguistHQ
from telegram_bot.bot import Bot
from telegram_bot.utils import BotUserHandler
from django.db.models import ObjectDoesNotExist


bot = "Bot"


def get_user_word_pk():
    user = Student.objects.get(username='test_user')
    pk = str(Word.objects.filter(student=user)[0].pk)
    return pk


class Preparations():
    def create_news(self):
        for i in range(5):
            article = Article.objects.create(title="test title", text="Article text")
            article.save()

    def create_cats(self):
        Category.objects.create().save()

    def create_langs(self):
        en = Language.objects.create(name='English', slug='en')
        en.save()
        ja = Language.objects.create(name='Japanese', slug='ja')
        ja.save()

    def create_user(self):
        global token
        user = Student.objects.create_user(username='test_user',
                                           password='1234567890qwerty',
                                           first_name='test user',
                                           home_language='English',
                                           current_language='Japanese',
                                           telegram='42')
        user.save()
        learn_lang = Language.objects.get(name='Japanese')
        learn_lang.students.add(user)

    def create_global_words(self):
        lang = Language.objects.get(name='Japanese')
        translate_lang = Language.objects.get(name='English')
        category = Category.objects.get(name='Default')
        for i in range(10):
            word = GlobalWord.objects.create(name='ありがとう',
                                             translation='Thank you',
                                             language=lang,
                                             translate_language=translate_lang)
            word.save()
            word.category_set.add(category)

    def create_user_words(self):
        user = Student.objects.get(username='test_user')
        hq = LinguistHQ(user)
        word = GlobalWord.objects.filter(name='ありがとう')[1]
        for i in range(10):
            hq.add_from_global_word(word)


class MockData:
    id = 42
    test_text = ''
    message = None
    data = '0'

    def reply_text(self, text, **kwargs):
        self.test_text = text

    def edit_text(self, text, **kwargs):
        self.test_text = text


class Update:

    def __init__(self):
        self.mock_data = MockData()
        self.mock_data.message = MockData()
        self.message = self.mock_data
        self.effective_user = self.mock_data
        self.callback_query = self.mock_data
