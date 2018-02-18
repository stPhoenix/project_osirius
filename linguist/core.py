from linguist.models import Word, GlobalWord, Language, Category
from random import randint
from linguist.utils import LinguistTranslator


class LinguistHQ:
    def __init__(self, student=None):
        self.student = student
        self.langs = Language.objects.all()
        self.global_words = GlobalWord.objects.all()
        if self.student is None:
            raise ValueError("Student can't be None")

    def add_from_global_word(self, word_id=None, alternative_translation=None):
        error = None
        if word_id is None:
            error = 'Please choose word'
            return error
        global_word = self.global_words.get(pk=word_id)
        word = Word(
            name=global_word.name,
            translation=alternative_translation if alternative_translation is not None else global_word.translation,
            language=self.langs.get(name=self.student.current_language),
            student=self.student
        )
        word.save()
        word.category_set.set(global_word.category_set.all())

    def search_word(self, word_name=None, language=None):
        words = self.global_words.filter(name=word_name, language=language)
        global_word_search = False
        google_translate_search = False
        home_language = self.langs.get(name=self.student.home_language)
        if words.count() == 0:
            translator = LinguistTranslator()
            words = translator.translate(text=word_name, src=language.slug, dest=home_language.slug)
            google_translate_search = True if words.text is not None else False
        else:
            global_word_search = True

        return {'global_word_search': global_word_search, 'google_translate_search': google_translate_search,
                'words': words}

    def add_custom_word(self, word_name=None, translation=None, category=None, pronunciation=None):
        error = None
        if word_name is None or translation is None or pronunciation is None:
            error = 'You did not choose word or translation or category'
            return error
        if category is None:
            category = Category.objects.get(name="Default")
        word = Word(
            name=word_name,
            translation=translation,
            language=self.langs.get(name=self.student.current_language),
            student=self.student,
            pronunciation = pronunciation
        )
        word.save()
        word.category_set.add(category)
        word.save()

    def get_all_words(self):
        return self.student.word_set.all()

    def get_viewed_words(self):
        return self.student.word_set.filter(viewed=True, language=self.get(name=self.student.current_language))

    def get_not_viewed_words(self):
        return self.student.word_set.filter(viewed=False, language=self.get(name=self.student.current_language))

    def play_matching(self, reverse=False):
        words = self.student.word_set.filter(language=self.get(name=self.student.current_language))
        words = words.filter(played_match=False) if reverse is False else words.filter(played_reversed_match=False)
        count = words.count()
        if count == 0:
            return 'No words to play matching'
        else:
            word = words[randint(1, count-1)]
            fake_words = [words[randint(1, count-1)] for i in range(0, 3)]
            fake_words.append(word.name)
            return {'words': fake_words, 'answer': word}

    def play_typing(self, reverse=False):
        words = self.student.word_set.filter(language=self.langs.get(name=self.student.current_language))
        words = words.filter(played_typing=False) if reverse is False else words.filter(played_reversed_typing=False)
        count = words.count()
        if count == 0:
            word = 'No word to play typing'
        else:
            word = words[randint(1, count-1)]
        return word
