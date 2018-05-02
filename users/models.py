from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Student(AbstractUser):
    last_visit = models.DateTimeField(auto_now_add=True)
    home_language = models.CharField(max_length=10, default='English')
    current_language = models.CharField(max_length=10, default='English')
    telegram = models.IntegerField(default=0)