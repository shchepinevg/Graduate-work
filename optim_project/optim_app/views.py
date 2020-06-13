from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView

from optim_app.models import (
    UserFunction,
    ParameterInfo,
    OptimizationFunction,
    OptimizationParameters,
    OptimizationInfo
)

from optim_app.serializer import (
    UserFunctionSerializer,
    UF_ParamInfo_Serializer,
    ParameterInfoSerializer,
    OptimizationFunctionSerializer,
    OptimizationParametersSerializer,
    OptimizationInfoSerializer,
    Optim_Func_Serializer,
    Optim_Param_Serializer
)

from optim_app.service import ServiceToCreateDir, ServiceToDeleteDir


# Views for working with user functions
class UserFunctionCreateView(CreateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def create(self, request, *args, **kwargs):
        request.data._mutable = True

        stc = ServiceToCreateDir(request.data)
        request.data["hash"] = stc.save_directory()

        request.data._mutable = False

        return super().create(request, *args, **kwargs)

class ParameterInfoCreateView(CreateAPIView):
    serializer_class = ParameterInfoSerializer
    queryset = ParameterInfo.objects.all()

class UserFunctionListView(ListAPIView):
    serializer_class = UF_ParamInfo_Serializer
    queryset = UserFunction.objects.all()

    def get_queryset(self):
        query = UserFunction.objects.filter(user=self.kwargs["pk"])
        return query

class UserFunctionDestroyView(DestroyAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def destroy(self, request, *args, **kwargs):
        path_to_del = UserFunction.objects.get(id=kwargs["pk"]).hash

        std = ServiceToDeleteDir(path_to_del)
        std.del_directory()

        return super().destroy(request, *args, **kwargs)

##############################

# Views for working with optimization running

# For create
class OptimizationInfoCreateView(CreateAPIView):
    serializer_class = OptimizationInfoSerializer
    queryset = OptimizationInfo.objects.all()

class OptimizationFunctionCreateView(CreateAPIView):
    serializer_class = OptimizationFunctionSerializer
    queryset = OptimizationFunction.objects.all()

    def create(self, request, *args, **kwargs):
        request.data._mutable = True

        request.data._mutable = False

        return super().create(request, *args, **kwargs)

class OptimizationParametersCreateView(CreateAPIView):
    serializer_class = OptimizationParametersSerializer
    queryset = OptimizationParameters.objects.all()

###

# For get
class OptimizationFunctionListView(ListAPIView):
    serializer_class = Optim_Func_Serializer
    queryset = OptimizationFunction.objects.all()

class OptimizationParametersListView(ListAPIView):
    serializer_class = Optim_Param_Serializer
    queryset = OptimizationParameters.objects.all()

###

##############################