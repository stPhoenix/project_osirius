from django.core.management.base import BaseCommand, CommandError
from linguist.models import Language


class Command(BaseCommand):
    help = 'This command create languages for learning'

    langs = [
        ('af', 'Afrikaans'),
        ('sq', 'Albanian'),
        ('ar', 'Arabic'),
        ('be', 'Belarusian'),
        ('bg', 'Bulgarian'),
        ('ca', 'Catalan'),
        ('zh-CN', 'Chinese_simplified'),
        ('zh-TW', 'Chinese_traditional'),
        ('hr', 'Croatian'),
        ('cs', 'Czech'),
        ('da', 'Canish'),
        ('nl', 'Dutch'),
        ('en', 'English'),
        ('eo', 'Esperanto'),
        ('et', 'Estonian'),
        ('tl', 'Filipino'),
        ('fi', 'Finnish'),
        ('fr', 'French'),
        ('gl', 'Galician'),
        ('de', 'German'),
        ('el', 'Greek'),
        ('iw', 'Hebrew'),
        ('hi', 'Hindi'),
        ('hu', 'Hungarian'),
        ('is', 'Icelandic'),
        ('id', 'Indonesian'),
        ('ga', 'Irish'),
        ('it', 'Italian'),
        ('ja', 'Japanese'),
        ('ko', 'Korean'),
        ('la', 'Latin'),
        ('lv', 'Latvian'),
        ('lt', 'Lithuanian'),
        ('mk', 'Macedonian'),
        ('ms', 'Malay'),
        ('mt', 'Maltese'),
        ('no', 'Norwegian'),
        ('fa', 'Persian'),
        ('pl', 'Polish'),
        ('pt', 'Portuguese'),
        ('ro', 'Romanian'),
        ('ru', 'Russian'),
        ('sr', 'Serbian'),
        ('sk', 'Slovak'),
        ('sl', 'Slovenian'),
        ('es', 'Spanish'),
        ('sw', 'Swahili'),
        ('sv', 'Swedish'),
        ('th', 'Thai'),
        ('tr', 'Turkish'),
        ('uk', 'Ukrainian'),
        ('vi', 'Vietnamese'),
        ('cy', 'Welsh'),
        ('yi', 'Yiddish'), ]

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        for l in self.langs:
            language = Language(slug=l[0], name=l[1])
            language.save()
            print('Added %s' % l[0])
        print('Done')