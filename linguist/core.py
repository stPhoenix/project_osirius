from linguist.models import Word, GlobalWord, Language, Category
from users.models import Student
from random import randint


class LinguistHQ:
    def __init__(self, student_id=None):
        self.student = Student.objects.get(pk=student_id)
        if self.student is None:
            raise ValueError("Student can't be None")

    def add_from_global_word(self, word_id=None, alternative_translation=None):
        error = None
        if word_id is None:
            error = 'Please choose word'
            return error
        global_word = GlobalWord.objects.get(pk=int(word_id))
        word = Word(
            name=global_word.name,
            translation=alternative_translation if alternative_translation is not None else global_word.translation,
            language=self.student.current_language,
            student=self.student,
            category=global_word.category
        )
        word.save()

    def search_word(self, word_name=None, language=None):
        words = GlobalWord.objects.filter(name=word_name, language=language)
        global_word_search = False
        google_translate = False
        if words is None:
            pass    # TODO Implement google translate
        else:
            global_word_search = True

            return {'global_word_search': global_word_search, 'google_translate': google_translate,
                    'words': words}

    def add_custom_word(self, word_name=None, translation=None, category=None):
        error = None
        if word_name is None or translation is None:
            error = 'You did not choose word or translation or category'
            return error
        if category is None:
            category = Category.objects.get(name="Default")
        word = Word(
            name=word_name,
            translation=translation,
            language=Language.objeects.get(name=self.student.current_language),
            student=self.student
        )
        word.save()
        word.category_set.add(category)
        word.save()

    def get_all_words(self):
        return self.student.word_set.all()

    def get_viewed_words(self):
        return self.student.word_set.filter(viewed=True, language=Language.objects.get(name=self.student.current_language))

    def get_not_viewed_words(self):
        return self.student.word_set.filter(viewed=False, language=Language.objects.get(name=self.student.current_language))

    def play_matching(self, reverse=False):
        words = self.student.word_set.filter(language=Language.objects.get(name=self.student.current_language))
        words = words.filter(played_match=False) if reverse is False else words.filter(played_reversed_match=True)
        word = words[randint(1, words.count())]
        fake_words = map(words[randint(1, words.count())] in range(0, 3))
        fake_words.append(word.name)
        return {'words': fake_words, 'answer': word}

    def play_typing(self, reverse=False):
        words = self.student.word_set.filter(language=Language.objects.get(name=self.student.current_language))
        words = words.filter(played_typing=False) if reverse is False else words.filter(played_reversed_typing=True)
        word = words[randint(1, words.count())]
        return word
