from django.db import models
from users.models import Student
# Create your models here.


class Language(models.Model):
    slug = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    students = models.ManyToManyField(Student)


class GlobalWord(models.Model):
    name = models.CharField(max_length=100)
    translation = models.CharField(max_length=100)
    pronunciation = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)


class Word(models.Model):
    name = models.CharField(max_length=100)
    translation = models.CharField(max_length=100)
    pronunciation = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    viewed = models.BooleanField(default=False)
    played_match = models.BooleanField(default=False)
    played_reversed_match = models.BooleanField(default=False)
    played_typing = models.BooleanField(default=False)
    played_reversed_typing = models.BooleanField(default=False)


class Category(models.Model):
    name = models.CharField(max_length=50, default='Default')
    word = models.ManyToManyField(Word)
    global_word = models.ManyToManyField(GlobalWord)
