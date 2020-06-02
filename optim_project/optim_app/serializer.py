from rest_framework import serializers

from optim_app.models import UserFunction, ParameterInfo, OptimizationFunction, OptimizationParameters


class ParameterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParameterInfo
        fields = '__all__'

class UserFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFunction
        fields = '__all__'

class UF_ParamInfo_Serializer(serializers.ModelSerializer):
    param = ParameterInfoSerializer(many=True)

    class Meta:
        model = UserFunction
        fields = ('id', 'user', 'hash', 'name', 'relative_path', 'param',)

class OptimizationFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptimizationFunction
        fields = '__all__'

class OptimizationParametersSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptimizationParameters
        fields = '__all__'



