from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, DestroyAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet, ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from news.models import Article
from linguist.models import Category, GlobalWord, Language, Word
from api.serializers import ArticleSerializer, CategorySerializer, GlobalWordSerializer, LanguageSerializer,\
                            CustomWordSerializer, SearchWordResultSerializer, WordSerializer, PlaySerializer,\
                            UserDetailsSerializer, FeedbackSerializer
from api.utils import SearchWordResult, LinguistInitializer, Play
from api.permissions import IsOwnerOrReadOnly, IsCanDeleteSelf
from random import randint
from users.models import Student
from web.models import Feedback


class News(ReadOnlyModelViewSet):
    queryset = Article.objects.order_by('-pub_date')
    serializer_class = ArticleSerializer


class Cats(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class WordsByCat(ListAPIView):
    serializer_class = GlobalWordSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        student= self.request.user
        home_language = Language.objects.get(name=student.home_language)
        current_language = Language.objects.get(name=student.current_language)
        category = Category.objects.get(pk=self.kwargs['pk'])
        return GlobalWord.objects.filter(category=category,
                                         language=current_language,
                                         translate_language=home_language)


class Langs(ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class GlobalWordAdd(LinguistInitializer, APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None):
        global_word = get_object_or_404(GlobalWord.objects.all(), pk=request.data['pk'])
        self.linguist.add_from_global_word(global_word)
        return Response({'Result': 'Word added'}, status=status.HTTP_201_CREATED)


class CustomWordAdd(LinguistInitializer, APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        serializer = CustomWordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        word = serializer.save()
        category = Category.objects.get(name=word.category)
        self.linguist.add_custom_word(word_name=word.word_name,
                                      translation=word.translation,
                                      pronunciation=word.pronunciation,
                                      category=category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SearchWord(LinguistInitializer, APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        word = request.data['word']
        search_result = SearchWordResult(**self.linguist.search_word(word))
        serializer = SearchWordResultSerializer(search_result)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserWords(LinguistInitializer, ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = WordSerializer

    def create(self, request, *args, **kwargs):
        return Response({'message': 'you can not create words from here'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        word = self.get_object()
        self.linguist.delete_word(word)
        return Response({'message': 'word deleted'}, status=status.HTTP_200_OK)

    def get_queryset(self):
        return self.linguist.get_words()

    @action(detail=False, permission_classes=(IsAuthenticated, IsOwnerOrReadOnly))
    def learned(self, request):
        words = self.linguist.get_all_learned_words()
        page = self.paginate_queryset(words)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(words, many=True)
        return Response(serializer.data)

    @action(methods=['post'], detail=True, permission_classes=(IsAuthenticated,IsOwnerOrReadOnly ))
    def learn_again(self, request, pk):
        word = self.get_object()
        self.linguist.learn_again(word)
        return Response(status=status.HTTP_202_ACCEPTED)


class LearnAndPlay(LinguistInitializer, ViewSet):

    def get_queryset(self):
        return Word.objects.all()

    def get_object(self):
        query_set = self.get_queryset()
        obj = get_object_or_404(query_set, pk=self.request.data['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    @action(methods=['get', 'post'], detail=False, permission_classes=(IsAuthenticated, IsOwnerOrReadOnly))
    def learn(self, request):
        if request.method == 'GET':
            return self.get_learn(request)
        elif request.method == 'POST':
            return self.post_learn(request)

    def get_learn(self, request):
        words = self.linguist.learn_word()
        if words.count() == 0:
            return Response({'no words to learn'},status=status.HTTP_404_NOT_FOUND)
        if words.count() == 1:
            word = words[0]
        else:
            word = words[randint(0, words.count() - 1)]
        serializer = WordSerializer(word)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post_learn(self, request, **kwargs):
        word = self.get_object()
        self.linguist.update_viewed_field(word, bool(request.data['learned']))
        return Response(status=status.HTTP_200_OK)

    @action(methods=['get', 'post'], detail=False, permission_classes=(IsAuthenticated, IsOwnerOrReadOnly))
    def matching(self, request, reverse=False):
        if request.method == 'GET':
            return self.get_matching(request, request.query_params['reverse'])
        elif request.method == 'POST':
            return self.post_matching(request)

    def get_matching(self, request, reverse):
        play = self.linguist.play_matching(bool(reverse))
        if play != 'No words to play matching':
            data = Play(**play)
            serializer = PlaySerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response('No words to play matching', status=status.HTTP_404_NOT_FOUND)

    def post_matching(self, request):
        word = get_object_or_404(self.get_queryset(), pk=request.data['word'])
        self.check_object_permissions(request, word)
        answer = get_object_or_404(self.get_queryset(), pk=request.data['answer'])
        self.linguist.update_match_field(word, (word == answer), bool(request.data['reverse']))
        return Response(status=status.HTTP_200_OK)

    def check_answer(self, word, answer):
        w = word.lower().replace(' ', '')
        a = answer.lower().replace(' ', '')
        return w == a

    @action(methods=['get', 'post'], detail=False, permission_classes=(IsAuthenticated, IsOwnerOrReadOnly))
    def typing(self, request):
        if request.method == 'GET':
            return self.get_typing(request, request.query_params['reverse'])
        elif request.method == 'POST':
            return self.post_typing(request)

    def get_typing(self, request, reverse):
        word = self.linguist.play_typing(bool(reverse))
        if word == 'No word to play typing':
            return Response({'No word to play typing'}, status=status.HTTP_404_NOT_FOUND)
        else:
            data = Play([word], word)
            serializer = PlaySerializer(data)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post_typing(self, request):
        word = get_object_or_404(self.get_queryset(), pk=request.data['word'])
        self.check_object_permissions(request, word)
        answer = request.data['answer']
        name = word.name if bool(request.data['reverse']) is True else word.translation
        self.linguist.update_typing_field(word, self.check_answer(name, answer), bool(request.data['reverse']))
        return Response(status=status.HTTP_200_OK)


class DeleteUser(DestroyAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = (IsAuthenticated, IsCanDeleteSelf)
    queryset = Student.objects.all()


class SendFeedback(CreateAPIView):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()