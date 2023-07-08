from django.test import TestCase, Client
from news.models import Article
from linguist.models import Category, Language, GlobalWord, Word
from users.models import Student
from linguist.core import LinguistHQ
from web.models import Feedback


api_url = '/api/v0'
token = ''


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

    def create_user(self, client):
        global token
        user = Student.objects.create_user(username='test_user',
                                           password='1234567890qwerty',
                                           first_name='test user',
                                           home_language='English',
                                           current_language='Japanese',
                                           telegram='432432432')
        user.save()
        learn_lang = Language.objects.get(name='Japanese')
        learn_lang.students.add(user)
        auth = client.post('/api/auth/login/',{'username': 'test_user', 'password': '1234567890qwerty'})
        token = 'TOKEN %s' % auth.json()['key']

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


class TestNews(TestCase):
    def setUp(self):
        Preparations().create_news()

    def test_news(self):
        response = self.client.get(api_url+'/news/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'test title')
        self.assertContains(response, 'Article text')


class TestCats(TestCase):
    def setUp(self):
        Preparations().create_cats()

    def test_cats(self):
        response = self.client.get(api_url+'/cats/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'Default')


class TestLangs(TestCase):
    def setUp(self):
        Preparations().create_langs()

    def test_langs(self):
        response = self.client.get(api_url+'/langs/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'English')
        self.assertContains(response, 'Japanese')


class TestWordsByCats(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user(self.client)
        prep.create_global_words()
        self.client = Client(**{'HTTP_AUTHORIZATION':token})

    def test_wordsbycats(self):
        pk = str(Category.objects.get(name='Default').pk)
        response = self.client.get(api_url+'/cats/'+pk+'/words/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'Thank you')
        self.assertContains(response, 'ありがとう')
        
        
class TestGlobalWordAdd(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user(self.client)
        prep.create_global_words()
        self.client = Client(**{'HTTP_AUTHORIZATION': token})
    
    def test_globalwordadd(self):
        pk = Category.objects.get(name='Default').pk
        response = self.client.post(api_url+'/add/global/', {'pk':pk})
        self.assertTrue(response.status_code == 201, response.status_code)
        self.assertTrue('Word added' in response.content.decode())
        

class TestCustomWordAdd(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user(self.client)
        self.client = Client(**{'HTTP_AUTHORIZATION': token})

    def test_customwordadd(self):
        response = self.client.post(api_url+'/add/custom/', {'word_name':'ありがとう',
                                                             'translation':'Thank you',
                                                             'pronunciation':'Arigato',
                                                             'category':'Default'})
        self.assertTrue(response.status_code == 201, response.status_code)
        self.assertTrue('ありがとう' in response.content.decode())
        self.assertTrue('Thank you' in response.content.decode())


class TestUserWords(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user(self.client)
        prep.create_global_words()
        prep.create_user_words()
        self.client = Client(**{'HTTP_AUTHORIZATION': token})

    def test_get_userwords(self):
        response = self.client.get(api_url+'/user/words/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'ありがとう')
        self.assertContains(response, 'Thank you')

    def test_delete_userwords(self):
        response = self.client.delete(api_url+'/user/words/'+get_user_word_pk()+'/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'word deleted')

    def test_get_learnedwords(self):
        response = self.client.get(api_url+'/user/words/learned/')
        self.assertTrue(response.status_code == 200, response.status_code)

    def test_learn_again(self):
        response = self.client.post(api_url+'/user/words/'+get_user_word_pk()+'/learn_again/')
        self.assertTrue(response.status_code == 202, response.status_code)


class TestLearnAndPlay(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user(self.client)
        prep.create_global_words()
        prep.create_user_words()
        self.client = Client(**{'HTTP_AUTHORIZATION': token})

    def test_get_learn(self):
        response = self.client.get(api_url+'/play/learn/')
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'ありがとう')

    def test_post_learn(self):
        response = self.client.get(api_url + '/play/learn/', {'pk': get_user_word_pk(), 'learned': True})
        self.assertTrue(response.status_code == 200, response.status_code)

    def test_get_matching(self):
        response = self.client.get(api_url+'/play/matching/',{'reverse': False})
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'ありがとう')

    def test_post_matching(self):
        pk = get_user_word_pk()
        response = self.client.post(api_url+'/play/matching/',{'word': pk, 'answer': pk, 'reverse': False})
        self.assertTrue(response.status_code == 200, response.status_code)

    def test_get_typing(self):
        response = self.client.get(api_url + '/play/typing/', {'reverse': False})
        self.assertTrue(response.status_code == 200, response.status_code)
        self.assertContains(response, 'ありがとう')

    def test_post_typing(self):
        pk = get_user_word_pk()
        response = self.client.post(api_url + '/play/typing/', {'word': pk, 'answer': 'ありがとう', 'reverse': False})
        self.assertTrue(response.status_code == 200, response.status_code)


class TestSearchWord(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_cats()
        prep.create_user(self.client)
        prep.create_global_words()
        prep.create_user_words()
        self.client = Client(**{'HTTP_AUTHORIZATION': token})

    def test_searchword(self):
        response = self.client.post(api_url+'/search/word/', {'word': 'ありがとう'})
        self.assertTrue(response.status_code == 200)
        self.assertContains(response, 'Thank you')


class TestDeleteUser(TestCase):
    def setUp(self):
        global token
        prep = Preparations()
        prep.create_langs()
        prep.create_user(self.client)
        self.client = Client(**{'HTTP_AUTHORIZATION': token})

    def test_delete_user(self):
        user = Student.objects.get(username='test_user')
        response = self.client.delete(api_url+'/user/delete/'+str(user.pk)+'/')
        self.assertTrue(response.status_code == 204, response.status_code)
        self.assertTrue(len(Student.objects.all()) == 0)


class TestSendFeedback:
    def test_send_feedback(self):
        response = self.client.post(api_url + '/feedback/', {'name': 'John', 'email': 'john@mail.com', 'text':'Hello'})
        self.assertTrue(response.status_code == 201)