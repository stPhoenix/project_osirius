from django.test import TestCase
from users.models import Student
from linguist.models import Language, GlobalWord, Word, Category
from linguist.core import LinguistHQ
from django.db.models import ObjectDoesNotExist
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
        self.user.language_set.add(self.current_language)
        self.user.save()
        self.global_word = GlobalWord.objects.create(name='ありがとう', translation='thank you', language=self.current_language)
        self.global_word.save()
        self.category = Category.objects.create(name='Default')
        self.category.save()
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
            w.category_set.add(self.category)
            w.save()
        for word in self.user.word_set.all()[:2]:
            word.viewed = True
            word.save()

    def test_init(self):
        l_hq = LinguistHQ(student=self.user)
        self.assertIsInstance(l_hq.student, Student)
        # Let's test non existing student check
        with self.assertRaises(ValueError):
            l_hq = LinguistHQ()

    def test_add_global_word(self):
        l_hq = LinguistHQ(student=self.user)
        l_hq.add_from_global_word(word_id=self.global_word.pk, alternative_translation=None)
        word = self.user.word_set.filter(name=self.global_word.name, language=self.current_language)
        self.assertEqual(self.global_word.name, word[0].name)
        word[0].delete()
        # Let's test alternative arg
        l_hq.add_from_global_word(word_id=self.global_word.pk, alternative_translation='Alternative')
        word2 = self.user.word_set.filter(name=self.global_word.name, language=self.current_language)
        self.assertEqual('Alternative', word2[0].translation)
        # Let's check if returning error
        error = l_hq.add_from_global_word()
        self.assertEqual(error, 'Please choose word')

    def test_search_word(self):
        l_hq = LinguistHQ(student=self.user)
        words = l_hq.search_word('ありがとう', self.current_language)
        self.assertEqual(words['words'][0].translation, 'thank you')

    def test_add_custom_word(self):
        l_hq = LinguistHQ(student=self.user)
        l_hq.add_custom_word( word_name='あいさつ', translation='Greetings')
        word = self.user.word_set.filter(name='あいさつ', language=Language.objects.get(name=self.user.current_language))
        self.assertEqual(word[0].name, 'あいさつ')
        # Let's test error
        error = l_hq.add_custom_word()
        self.assertEqual(error, 'You did not choose word or translation or category')

    def test_get_all_words(self):
        l_hq = LinguistHQ(student=self.user)
        self.assertEqual(l_hq.get_all_words()[1], self.user.word_set.all()[1])

    def test_get_viewed_words(self):
        l_hq = LinguistHQ(student=self.user)
        words = self.user.word_set.filter(viewed=True,
                                          language=Language.objects.get(name=self.user.current_language))
        self.assertEqual(l_hq.get_viewed_words()[1], words[1])

    def test_get_not_viewed_words(self):
        l_hq = LinguistHQ(student=self.user)
        words = self.user.word_set.filter(viewed=False,
                                          language=Language.objects.get(name=self.user.current_language))
        self.assertEqual(l_hq.get_not_viewed_words()[1], words[1])

    def test_play_matching(self):
        l_hq = LinguistHQ(student=self.user)
        words = l_hq.play_matching()
        self.assertIn(words['answer'], self.user.word_set.all())
        # Let's test reverse case
        words = l_hq.play_matching(reverse=True)
        self.assertIn(words['answer'], self.user.word_set.all())
        # Let's test when all words played
        for w in self.user.word_set.all():
            w.played_match = True
            w.save()
        error = l_hq.play_matching()
        self.assertEqual(error, 'No words to play matching')

    def test_play_typing(self):
        l_hq = LinguistHQ(student=self.user)
        word = l_hq.play_typing()
        self.assertIn(word, self.user.word_set.all())
        # Let's test reverse case
        word = l_hq.play_typing(reverse=True)
        self.assertIn(word, self.user.word_set.all())
        # Let's test when all words played
        for w in self.user.word_set.all():
            w.played_typing = True
            w.save()
        error = l_hq.play_typing()
        self.assertEqual(error, 'No word to play typing')
