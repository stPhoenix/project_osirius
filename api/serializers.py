from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from linguist.models import Language, GlobalWord, Word
from django.contrib.auth import get_user_model

# Get the UserModel
UserModel = get_user_model()


class GlobalWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalWord
        fields = ('__all__',)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('__all__',)


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('name', 'slug')

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class OsiriusRegisterSerializer(RegisterSerializer):
    home_language = serializers.CharField()
    current_language = serializers.CharField()
    first_name = serializers.CharField()

    def validate_home_language(self, home_language):
        # TODO: Check language in list
        return home_language

    def validate_current_language(self, current_language):
        # TODO: Check language in list
        return current_language

    def validate_first_name(self, first_name):
        if len(first_name) < 1:
            raise serializers.ValidationError(
                _("First name can't be empty."))
        return first_name

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'home_language': self.validated_data.get('home_language', ''),
            'current_language': self.validated_data.get('current_language', ''),
            'first_name': self.validated_data.get('first_language', ''),
        }

    def custom_signup(self, request, user):
        user.first_name = self.cleaned_data['first_name']
        user.home_language = self.cleaned_data['home_language']
        user.current_language = self.cleaned_data['current_language']
        user.save()
        learn_language = Language.objects.all().get(name=self.cleaned_data['current_language'])
        learn_language.students.add(user)


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    learn_languages = LanguageSerializer(many=True)

    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'learn_languages', 'current_language')