from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from news.models import Article
from linguist.models import Category, GlobalWord, Language
from api.serializers import ArticleSerializer, CategorySerializer, GlobalWordSerializer, LanguageSerializer
from linguist.core import LinguistHQ


class News(ListAPIView):
    queryset = Article.objects.order_by('-pub_date')
    serializer_class = ArticleSerializer


class NewsDetail(RetrieveAPIView):
    queryset = Article.objects.all()
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

    def post(self, request, format=None):
        student = self.request.user
        linguist = LinguistHQ(student)
        for pk in request.POST.items():
            global_word = GlobalWord.objects.get(pk=pk)
            linguist.add_from_global_word(global_word)
        return Response({'Result': 'Words added'})


class CustomWordAdd(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        student = self.request.user
        linguist = LinguistHQ(student)
        for word in request.POST.items():
            pass
