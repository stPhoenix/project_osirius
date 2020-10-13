from django.test import TestCase
from news.models import Article
from linguist.models import Category, Language, GlobalWord, Word
from users.models import Student
from linguist.core import LinguistHQ
from telegram_bot.bot import Bot
from telegram_bot.utils import BotUserHandler
from django.db.models import ObjectDoesNotExist


bot = "Bot"
context = None

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


class TestTelegramBotCore(TestCase):
    def setUp(self):
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user()
        prep.create_global_words()
        self.bot = Bot(test=True)
        self.update = Update()

    def change_id(self):
        self.update.effective_user.id = 11

    def restore_id(self):
        self.update.effective_user.id = 42

    def test_start(self):
        self.bot.start(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Welcome test user. Type anything or /menu to show variants!')
        self.change_id()
        self.bot.start(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Welcome stranger!' \
                                                        'If you have account on web site type /link ' \
                                                        'If you new one type /register')
        self.restore_id()

    def test_register(self):
        self.change_id()
        self.bot.students['11'] = BotUserHandler()
        self.bot.register(self.update, context)
        self.assertEqual(self.update.message.test_text, 'To start learning tell a little bit more about yourself.' \
                                                        'What is your name?')
        self.assertEqual(self.bot.students['11'].destination, 'Register first name')
        self.restore_id()

    def test_link_telegram(self):
        self.change_id()
        self.bot.students['11'] = BotUserHandler()
        self.bot.link_telegram(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Enter your username:')
        self.assertEqual(self.bot.students['11'].destination, 'Take username')
        self.restore_id()

    def test_help(self):
        self.bot.help(self.update, context, None)
        self.assertEqual(self.update.message.test_text, 'Have any questions? Write it to saintdevs@gmail.com')

    def test_echo(self):
        self.bot.echo(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Welcome test user. Type anything or /menu to show variants!')

        self.bot.students['42'].destination = 'Help'
        self.bot.echo(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Have any questions? Write it to saintdevs@gmail.com')

        self.bot.students['42'].destination = 'jjhsdf'
        self.bot.echo(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Menu[You can always go back to /menu]')

    def test_menu(self):
        self.bot.students['42'] = BotUserHandler()
        self.bot.menu(self.update, context, self.bot.students['42'])
        self.assertEqual(self.update.message.test_text, 'Menu[You can always go back to /menu]')
        menu_list = [
            'Add words',
            'My words',
            'Learn words',
            'Play matching',
            'Play reversed matching',
            'Play typing',
            'Play reversed typing',
            'Help',
            'Change learn language',
            'Add more learn language',
        ]
        self.assertEqual(self.bot.students['42'].callback_data, menu_list)

    def test_callback_handler(self):
        self.bot.students['42'] = BotUserHandler()
        self.bot.students['42'].destination = 'Help'

        self.bot.callback_handler(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Have any questions? Write it to saintdevs@gmail.com')

        self.bot.students['42'].destination = 'jjhsdf'
        self.bot.callback_handler(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Menu[You can always go back to /menu]')

    def test_delete(self):
        self.bot.start(self.update, context)
        self.bot.delete(self.update, context)
        self.assertEqual(self.update.message.test_text, 'User deleted')
        with self.assertRaises(ObjectDoesNotExist):
            Student.objects.get(username="test_user")
        Preparations().create_user()

    def test_menu_action(self):
        self.bot.start(self.update, context)
        self.bot.students['42'].callback_data = ['Help']
        self.bot.menu_action(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Have any questions? Write it to saintdevs@gmail.com')

        self.bot.students['42'].callback_data = ['dsfsd']
        self.bot.menu_action(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Menu[You can always go back to /menu]')

    def test_change_learn_language(self):
        self.bot.start(self.update, context)
        self.bot.change_learn_language(self.update, context)
        self.assertEqual(self.update.callback_query.message.test_text, 'Choose your learn language[You can always go back to /menu]')

    def test_add_more_learn_language(self):
        self.bot.start(self.update, context)
        self.bot.add_more_learn_language(self.update, context)
        self.assertEqual(self.update.callback_query.message.test_text, 'Choose your new learn language[You can always go back to /menu]')

    def test_change_language(self):
        self.bot.start(self.update, context)
        self.bot.students['42'].callback_data = ['English', 'Japanese']
        self.bot.change_language(self.update, context)
        self.assertEqual(self.update.message.test_text, 'Alright! Good luck![You can always go back to /menu]')