"""osirius URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from rest_framework.routers import SimpleRouter
from api.v0.views import *


router = SimpleRouter()
router.register(r'news', News)
router.register(r'user/words', UserWords, base_name='word')
router.register(r'play', LearnAndPlay, base_name='word')
urlpatterns = [
    path('cats/', Cats.as_view(), name='cats'),
    path('cats/words/', WordsByCat.as_view(), name='cats-words'),
    path('langs/', Langs.as_view(), name='langs'),
    path('add/global/<int:pk>/', GlobalWordAdd.as_view(),name='add_global'),
    path('add/custom/<int:pk>/', CustomWordAdd.as_view(), name='add_custom'),
    path('search/word/', SearchWord.as_view(), name='search_word')
]
urlpatterns += router.urls
