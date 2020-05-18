from rest_framework import serializers

from optim_app.models import UserFunction


class UserFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFunction
        fields = ('__all__')

