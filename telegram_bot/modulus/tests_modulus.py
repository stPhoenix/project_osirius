from django.test import TestCase
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
    message_text = 'Thank you'

    def reply_text(self, text, **kwargs):
        self.test_text = text
        print(self.test_text)

    def edit_text(self, text, **kwargs):
        self.test_text = text
        print(self.test_text)

    @property
    def text(self):
        return self.message_text


class Update:

    def __init__(self):
        self.mock_data = MockData()
        self.mock_data.message = MockData()
        self.message = self.mock_data
        self.effective_user = self.mock_data
        self.callback_query = self.mock_data


class TestAddwords(TestCase):
    def setUp(self):
        self.prep = Preparations()
        self.prep.create_cats()
        self.prep.create_langs()
        self.prep.create_global_words()
        self.prep.create_user()
        self.update = Update()
        self.bot = Bot(test=True)
        self.bot.start(bot, self.update)
        self.student = self.bot.students['42']

    def test_add_words(self):
        self.student.destination = 'Add words'
        self.bot.echo(bot, self.update)
        self.assertEqual(self.update.message.test_text, 'How do you want to add word?[You can always go back to /menu]')
        # self.assertEqual(self.update.message.test_text, '[You can always go back to /menu]')

    def test_add_words_option(self):
        self.student.destination = 'Add words option'
        self.student.callback_data = ['Add word by typing']
        self.update.callback_query.data = '0'
        self.bot.echo(bot, self.update)
        self.assertEqual(self.update.message.test_text, 'Enter foreign word[You can always go back to /menu]')

        self.student.destination = 'Add words option'
        self.student.callback_data = ['Choose word from presets']
        self.bot.echo(bot, self.update)
        self.assertEqual(self.update.message.test_text, 'Choose category[You can always go back to /menu]')

    def test_add_custom_word(self):
        self.student.destination = 'Add custom word'
        self.student.temp_data = {'word_name': 'おはよう', 'translation': 'good morning', 'pronunciation': 'ohayo'}
        self.student.callback_data = ['Default']
        self.update.callback_query.data = '0'
        self.bot.echo(bot, self.update)
        self.assertEqual(self.update.message.test_text, 'Word has been added[You can always go back to /menu]')

    def test_add_word_translation(self):
        self.student.destination = 'Add word translation'
        self.bot.echo(bot, self.update)

        self.assertEqual(self.student.temp_data['translation'], self.update.message.text)
        self.assertEqual(self.update.message.test_text, 'Now choose category.[You can always go back to /menu]')