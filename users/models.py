from django.db import models
from django.contrib.auth.models import AbstractUser
from linguist.models import Language
# Create your models here.


class Student(AbstractUser):
    home_language = models.ForeignKey(Language, on_delete=models.CASCADE)
    learn_languages = models.ManyToManyField(Language)
    current_language = models.ForeignKey(Language, on_delete=models.CASCADE)
    last_visit = models.DateTimeField(auto_now_add=True)