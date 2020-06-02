from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView

from optim_app.models import (
    UserFunction,
    ParameterInfo,
    OptimizationFunction,
    OptimizationParameters
)

from optim_app.serializer import (
    UserFunctionSerializer,
    UF_ParamInfo_Serializer,
    ParameterInfoSerializer,
    OptimizationFunctionSerializer,
    OptimizationParametersSerializer
)

from optim_app.service import ServiceToCreateDir, ServiceToDeleteDir



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

class OptimizationFunctionView(ListAPIView):
    serializer_class = OptimizationFunctionSerializer
    queryset = OptimizationFunction.objects.all()

    def get_queryset(self):
        query = OptimizationFunction.objects.filter(user_function=self.kwargs["pk"], is_function=True)
        return query

class OptimizationParametersView(ListAPIView):
    serializer_class = OptimizationParametersSerializer
    queryset = OptimizationParameters.objects.all()

class OptimizationFunctionCreateView(CreateAPIView):
    serializer_class = OptimizationFunctionSerializer
    queryset = OptimizationFunction.objects.all()

class OptimizationParametersCreateView(CreateAPIView):
    serializer_class = OptimizationParametersSerializer
    queryset = OptimizationParameters.objects.all()

class UserFunctionDestroyView(DestroyAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def destroy(self, request, *args, **kwargs):
        path_to_del = UserFunction.objects.get(id=kwargs["pk"]).hash

        std = ServiceToDeleteDir(path_to_del)
        std.del_directory()

        return super().destroy(request, *args, **kwargs)



class UFUpdateNameView(UpdateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()