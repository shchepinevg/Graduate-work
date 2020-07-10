from django.contrib.auth.models import User
from django.test import TestCase

from optim_app.models import UserFunction


class UserFunctionTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user_obj = User.objects.create(username="test_user")
        UserFunction.objects.create(user=user_obj, name="TestFunc", hash="a7\\20\\14a67ff5700bc759efa8acb8b90f", relative_path="TestFunc.exe")

    def test_name_label(self):
        user_func = UserFunction.objects.get(id=1)
        name = user_func._meta.get_field('name').verbose_name
        self.assertEquals(name, 'name')

    def test_hash_label(self):
        user_func = UserFunction.objects.get(id=1)
        hash = user_func._meta.get_field('hash').verbose_name
        self.assertEquals(hash, 'hash')

    def test_relative_path_label(self):
        user_func = UserFunction.objects.get(id=1)
        relative_path = user_func._meta.get_field('relative_path').verbose_name
        self.assertEquals(relative_path, 'relative path')

    def test_name_max_length(self):
        user_func = UserFunction.objects.get(id=1)
        max_length = user_func._meta.get_field('name').max_length
        self.assertEquals(max_length, 64)

    def test_hash_max_length(self):
        user_func = UserFunction.objects.get(id=1)
        max_length = user_func._meta.get_field('hash').max_length
        self.assertEquals(max_length, 64)

    def test_relative_path_max_length(self):
        user_func = UserFunction.objects.get(id=1)
        max_length = user_func._meta.get_field('relative_path').max_length
        self.assertEquals(max_length, 100)
