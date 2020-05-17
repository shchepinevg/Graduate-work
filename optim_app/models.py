from django.contrib.auth.models import User
from django.db import models

class UserFunction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    hash = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name
