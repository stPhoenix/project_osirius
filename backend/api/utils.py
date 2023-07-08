from linguist.core import LinguistHQ
from linguist.models import GlobalWord
from googletrans.models import Translated


class LinguistInitializer:
    def initial(self, request, *args, **kwargs):
        super(LinguistInitializer, self).initial(request, *args, **kwargs)
        student = request.user
        self.linguist = LinguistHQ(student)


class CustomWord:
    def __init__(self, category, word_name, translation, pronunciation):
        self.category = category
        self.word_name = word_name
        self.translation = translation
        self.pronunciation = pronunciation


class SearchWordResult:
    def __init__(self, global_word_search, google_translate_search, words):
        self.global_word_search = global_word_search
        self.google_translate_search = google_translate_search
        if isinstance(words, Translated):
            self.words = [{'name': words.origin, 'translation': words.text, 'pronunciation': words.pronunciation}]
        else:
            self.words = [{'id': word.pk, 'name': word.name, 'translation': word.translation, 'category': word.category_set.all()[0].name} for word in words]


class Play:
    def __init__(self, words, answer):
        self.words = words
        self.answer = answer