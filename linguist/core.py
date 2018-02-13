from linguist.models import Word, GlobalWord, Category
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

    def add_custom_word(self, word_name=None, translation=None, category_id=None):
        if word_name is None or translation is None or category_id is None:
            raise ValueError("Word can not be None")
        category = Category.objects.get(pk=category_id)
        word = Word(
            name=word_name,
            translation=translation,
            language=self.student.current_language,
            student=self.student,
            category=category
        )
        word.save()

    def get_all_words(self):
        return self.student.word__set().all()

    def get_viewed_words(self):
        return self.student.word__set().filter(viewed=False, current_language=self.student.current_language)

    def set_viewed_word_status(self, word_id=None, status=False):
        if word_id is None:
            raise ValueError("Word id can not be None")
        word = Word.objects.get(pk=int(word_id))
        word.viewed = status
        word.save()

    def play_matching(self):
        words = self.student.word__set().all()
        word = words[randint(1, words.count())]
        fake_words = map(words[randint(1, words.count())] in range(0, 3))
        fake_words.append(word.name)
        return {'words': fake_words, 'answer': word}

    def set_played_matching_word_status(self, word_id=None, status=False, reverse=False):
        if word_id is None:
            raise ValueError("Word id can not be None")
        word = Word.objects.get(pk=int(word_id))
        if reverse is False:
            word.played_match = status
        else:
            word.played_reversed_match = status
        word.save()

    def play_typing(self):
        words = self.student.word__set().all()
        word = words[randint(1, words.count())]
        return word

    def set_played_typing_word_status(self, word_id=None, status=False, reverse=False):
        if word_id is None:
            raise ValueError("Word id can not be None")
        word = Word.objects.get(pk=int(word_id))
        if reverse is False:
            word.played_typing = status
        else:
            word.played_reversed_typing = status
        word.save()
