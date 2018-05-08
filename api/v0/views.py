from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet, ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from news.models import Article
from linguist.models import Category, GlobalWord, Language, Word
from api.serializers import ArticleSerializer, CategorySerializer, GlobalWordSerializer, LanguageSerializer,\
                            CustomWordSerializer, SearchWordResultSerializer, WordSerializer
from linguist.core import LinguistHQ
from api.utils import SearchWordResult
from api.permissions import IsOwnerOrReadOnly


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
        category = Category.objects.get(name=self.kwargs['category'])
        return GlobalWord.objects.filter(category=category,
                                         language=current_language,
                                         translate_language=home_language)


class Langs(ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class GlobalWordAdd(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def post(self, request, format=None, pk=None):
        student = request.user
        linguist = LinguistHQ(student)
        global_word = get_object_or_404(GlobalWord.objects.all(),pk=pk)
        linguist.add_from_global_word(global_word)
        return Response({'Result': 'Word added'}, status=status.HTTP_201_CREATED)


class CustomWordAdd(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        student = self.request.user
        linguist = LinguistHQ(student)
        serializer = CustomWordSerializer(request.data)
        serializer.is_valid(raise_exception=True)
        word = serializer.save()
        category = Category.objects.get(name=word.category)
        linguist.add_custom_word(word_name=word.word_name,
                                 translation=word.translation,
                                 pronunciation=word.pronunciation,
                                 category=category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SearchWord(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        student = request.user
        linguist = LinguistHQ(student)
        word = request.data['word']
        search_result = SearchWordResult(**linguist.search_word(word))
        serializer = SearchWordResultSerializer(search_result)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserWords(ModelViewSet):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    serializer_class = WordSerializer

    def create(self, request, *args, **kwargs):
        return Response({'message': 'you can not create words from here'}, status=status.HTTP_403_FORBIDDEN)

    def get_queryset(self):
        student = self.request.user
        linguist = LinguistHQ(student)
        return linguist.get_words()

    @action(detail=False, permission_classes=(IsAuthenticated, IsOwnerOrReadOnly))
    def learned(self, request):
        student = request.user
        linguist = LinguistHQ(student)
        words = linguist.get_all_learned_words()
        page = self.paginate_queryset(words)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(words, many=True)
        return Response(serializer.data)

    @action(method=['post'], detail=True, permission_classes=(IsAuthenticated, IsOwnerOrReadOnly))
    def learn_again(self, request, pk=None):
        student = request.user
        linguist = LinguistHQ(student)
        queryset = Word.objects.all()
        word = get_object_or_404(queryset, pk=pk)
        linguist.learn_again(word)
        return Response(status=status.HTTP_202_ACCEPTED)


class LearnAndPlay(ViewSet):
    @action(permission_classes=(IsAuthenticated, ))
    def learn(self, request):
        pass