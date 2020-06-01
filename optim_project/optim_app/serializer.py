from rest_framework import serializers

from optim_app.models import UserFunction, ParameterInfo, OptimizationHistory


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
        fields = ('id', 'user', 'name', 'relative_path', 'param',)

class OptimHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OptimizationHistory
        fields = '__all__'




