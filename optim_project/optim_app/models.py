from django.contrib.auth.models import User
from django.db import models
from django.contrib.postgres.fields import JSONField

class UserFunction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    hash = models.CharField(max_length=64, unique=True)
    relative_path = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name

class ParameterInfo(models.Model):
    user_function = models.ForeignKey(UserFunction, related_name="param", on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    discrete_continuous = models.BooleanField()
    lower_bound = models.FloatField()
    upper_bound = models.FloatField()

    def __str__(self):
        return self.name

class OptimizationHistory(models.Model):
    user_function = models.ForeignKey(UserFunction, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    min_or_max = models.FloatField()
    param_info = JSONField()

    def __str__(self):
        return self.name