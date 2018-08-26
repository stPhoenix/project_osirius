from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from linguist.models import Language, GlobalWord, Word, Category
from django.contrib.auth import get_user_model
from news.models import Article
from api.utils import CustomWord

# Get the UserModel
UserModel = get_user_model()


class SearchWordResultSerializer(serializers.Serializer):
    global_word_search = serializers.BooleanField()
    google_translate_search = serializers.BooleanField()
    words = serializers.ListField(child=serializers.DictField())


class CustomWordSerializer(serializers.Serializer):
    category = serializers.CharField(required=True)
    word_name = serializers.CharField(required=True)
    translation = serializers.CharField(required=True)
    pronunciation = serializers.CharField()

    def create(self, validated_data):
        return CustomWord(**validated_data)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('pk', 'name')

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class GlobalWordSerializer(serializers.ModelSerializer):
    category_set = CategorySerializer(many=True)
    class Meta:
        model = GlobalWord
        fields = '__all__'

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class WordSerializer(serializers.ModelSerializer):
    category_set = CategorySerializer(many=True)

    class Meta:
        model = Word
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('name', 'slug')

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass


class PlaySerializer(serializers.Serializer):
    words = serializers.ListField(child=WordSerializer())
    answer = WordSerializer()


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
            'first_name': self.validated_data.get('first_name', ''),
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
    language_set = LanguageSerializer(many=True)

    class Meta:
        model = UserModel
        fields = ('pk', 'username', 'email', 'first_name', 'language_set', 'current_language', 'terms_check')

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first = validated_data.get('first_name', instance.first_name)
        instance.home_language = validated_data.get('home_language', instance.home_language)
        instance.current_language = validated_data.get('current_language', instance.current_language)
        instance.save()
        recieved_langs = [l['name'] for l in validated_data.get('language_set')]
        old_langs = [l.name for l in instance.language_set.all()]
        delete_langs = set(old_langs).difference(recieved_langs)
        add_langs = set(recieved_langs).difference(old_langs)
        for lang in delete_langs:
            del_lang = Language.objects.get(name=lang)
            del_lang.students.remove(instance)

        for lang in add_langs:
            add_lang = Language.objects.get(name=lang)
            add_lang.students.add(instance)

        return instance