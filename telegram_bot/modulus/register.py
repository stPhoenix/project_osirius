from telegram_bot.utils import BotUserHandler, restricted, make_button_list, build_menu
from users.models import Student
from telegram import InlineKeyboardMarkup
from telegram_bot.modulus.base import BaseModule


class Register(BaseModule):
    def setup_destinations(self):
        self.DESTINATIONS = {
            'Register first name': self.register_first_name,
            'Register home language': self.register_home_language,
            'Register current language': self.register_current_language,
            'Create user': self.create_user,
        }

    def register_first_name(self, bot, update, student):
        student.destination = 'Register home language'
        student.temp_data = {'username': update.effective_user.id, 'first_name': update.message.text}
        student.callback_data = [l.name for l in self.langs]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.message.reply_text(text='Okay %s. Now choose your home language' % update.message.text,
                                  reply_markup=reply_markup)

    def register_home_language(self, bot, update, student):
        student.destination = 'Register current language'
        student.temp_data['home_language'] = student.callback_data[int(update.callback_query.data)]
        reply_markup = InlineKeyboardMarkup(build_menu(make_button_list(self, update, student), n_cols=1))
        update.callback_query.message.edit_text(text='Now choose your learn language', reply_markup=reply_markup)

    def register_current_language(self, bot, update, student):
        student.temp_data['current_language'] = student.callback_data[int(update.callback_query.data)]
        self.create_user(bot, update, student)

    def create_user(self, bot, update, student):
        password = Student.objects.make_random_password()
        user = Student.objects.create_user(username=str(student.temp_data['username']),
                                           password=password,
                                           first_name=student.temp_data['first_name'],
                                           home_language=student.temp_data['home_language'],
                                           current_language=student.temp_data['current_language'])
        learn_language = self.langs.get(name=student.temp_data['current_language'])
        learn_language.students.add(user)
        student = BotUserHandler(student=user)
        update.message.edit_text('Your username: %s \n'
                                 'Your password: %s \n'
                                 'You will need it in future web version. So write it somewhere in safe place. \n'
                                 'And DELETE this message for security purposes.'
                                 % (student.student.username, password), reply_markup=None)
        self.dispatch_destination(bot, update, student, 'Update users')