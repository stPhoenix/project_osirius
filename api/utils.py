from rest_framework.views import APIView
from linguist.core import LinguistHQ


class LinguistInitializer(APIView):
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
        self.words = words


class Play:
    def __init__(self, words, answer):
        self.words = words
        self.answer = answer