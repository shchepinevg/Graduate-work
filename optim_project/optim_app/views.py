from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView

from optim_app.models import UserFunction, OptimizationHistory

from optim_app.serializer import (
    UserFunctionSerializer,
    UF_ParamInfo_Serializer,
    OptimHistorySerializer
)

from optim_app.service import ServiceToCreateDir, ServiceToDeleteDir



class UFUpdateNameView(UpdateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

class UserFunctionDestroyView(DestroyAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def destroy(self, request, *args, **kwargs):
        path_to_del = UserFunction.objects.get(id=kwargs["pk"]).hash

        std = ServiceToDeleteDir(path_to_del)
        std.del_directory()

        return super().destroy(request, *args, **kwargs)

# FINAL

class UserFunctionCreateView(CreateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def create(self, request, *args, **kwargs):
        request.data._mutable = True

        stc = ServiceToCreateDir(request.data)
        request.data["hash"] = stc.save_directory()

        request.data._mutable = False

        return super().create(request, *args, **kwargs)

class UserFunctionListView(ListAPIView):
    serializer_class = UF_ParamInfo_Serializer
    queryset = UserFunction.objects.all()

    def get_queryset(self):
        query = UserFunction.objects.filter(user=self.kwargs["pk"])
        return query

class OptimHistoryListView(ListAPIView):
    serializer_class = OptimHistorySerializer
    queryset = OptimizationHistory.objects.all()

    def get_queryset(self):
        query = OptimizationHistory.objects.filter(user_function=self.kwargs["pk"])
        return query

class OptimizationCreateView(CreateAPIView):
    serializer_class = OptimHistorySerializer
    queryset = OptimizationHistory.objects.all()

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

