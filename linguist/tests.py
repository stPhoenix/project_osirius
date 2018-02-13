from django.test import TestCase
from users.models import Student
from linguist.models import Language, GlobalWord, Word
from linguist.core import LinguistHQ
# Create your tests here.


class TestLinguistHQ(TestCase):
    def setUp(self):
        self.user = Student.objects.create_user(
            username='jacob', email='jacob@mail.com', password='top_secret')
        self.user.current_language = 'Japanese'
        self.user.save()
        self.client.login(username='jacob', password='top_secret')
        self.home_language = Language.objects.create(slug='en', name='English')
        self.home_language.save()
        self.current_language = Language.objects.create(slug='ja', name='Japanese')
        self.current_language.save()
        self.user.language_set().add(self.current_language)
        self.user.save()
        self.global_word = GlobalWord.objects.create(name='ありがとう', translation='thank you', language=self.current_language)
        self.global_word.save()
        words = [
            ('おはよう', 'hello'),
            ('すみません', 'excuse me'),
            ('いっただきます', 'good meal'),
            ('よん', 'four'),
            ('さようなら', 'good bye'),
        ]
        for word in words:
            w = Word.objects.create(
                name=word[0],
                translation=[1],
                language=self.current_language,
                student=self.user
            )
            w.save()

    def test_init(self):
        l_hq = LinguistHQ(student_id=self.user.pk)
        self.assertIsInstance(l_hq.student, Student)
        with self.assertRaises(ValueError):
            l_hq = LinguistHQ(student_id=9124124)

    def test_add_global_word(self):
        l_hq = LinguistHQ(student_id=self.user.pk)
        l_hq.add_from_global_word(word_id=self.global_word.pk, alternative_translation=None)
        word = self.user.word_set.filter(name=self.global_word.name, language=self.current_language)
        self.assertEqual(self.global_word.name, word[0].name)
        word[0].delete()
        # Let's test alternative arg
        l_hq.add_from_global_word(word_id=self.global_word.pk, alternative_translation='Alternative')
        word2=self.user.word_set.filter(name=self.global_word.name, language=self.current_language)
        self.assertEqual(self.global_word.translation, word[0].translation)

    def test_search_word(self):
        l_hq = LinguistHQ(student_id=self.user.pk)
        words = l_hq.search_word('ありがとう', self.current_language)
        self.assertEqual(words['words'][0].translation, 'thank you')
