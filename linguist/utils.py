from googletrans import Translator
from googletrans.models import Translated


# Actually I need to modify only one function to return origin pronunciation
class LinguistTranslator(Translator):
    def translate(self, text, dest='en', src='auto'):
        dest = dest.lower().split('_', 1)[0]
        src = src.lower().split('_', 1)[0]

        origin = text
        data = self._translate(text, dest, src)

        # this code will be updated when the format is changed. / Googletrans Author note
        translated = ''.join([d[0] if d[0] else '' for d in data[0]])

        pron = 'No pronunciation'
        if data[0][1][-1]is not None:
            pron = data[0][1][-1]

        return Translated(src=src, dest=dest, origin=origin, text=translated, pronunciation=pron)