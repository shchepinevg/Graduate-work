from rest_framework import serializers

from optim_app.models import (
    UserFunction,
    ParameterInfo,
    OptimizationFunction,
    OptimizationParameters,
    OptimizationInfo
)

# Serializers for working with user functions
class UserFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFunction
        fields = '__all__'

class ParameterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParameterInfo
        fields = '__all__'

class UF_ParamInfo_Serializer(serializers.ModelSerializer):
    param = ParameterInfoSerializer(many=True)

    class Meta:
        model = UserFunction
        fields = ('id', 'user', 'hash', 'name', 'relative_path', 'param',)

###############################

# Serializers for working with optimization running

# For create
class OptimizationInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptimizationInfo
        fields = "__all__"

class OptimizationFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptimizationFunction
        fields = ('__all__')

class OptimizationParametersSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptimizationParameters
        fields = '__all__'
###

# For get
class Optim_Func_Serializer(serializers.ModelSerializer):
    optim_info = OptimizationInfoSerializer(read_only=True)

    class Meta:
        model = OptimizationFunction
        fields = ('id', 'user_function', 'optim_info', 'value')

class Optim_Param_Serializer(serializers.ModelSerializer):
    optim_info = OptimizationInfoSerializer(read_only=True)

    class Meta:
        model = OptimizationParameters
        fields = ('id', 'user_function', 'optim_info', 'meta_optim_meth', 'meta_N', 'meta_param_optim', 'k', 'value')
###

###############################
