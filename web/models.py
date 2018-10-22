from django.db import models

# Create your models here.


class Feedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    date = models.DateField(auto_now_add=True)
    text = models.TextField()

    def __str__(self):
        return str(self.date) + " " + self.name + " " + self.email