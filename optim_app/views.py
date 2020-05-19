from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView

from optim_app.models import UserFunction
from optim_app.serializer import UserFunctionSerializer, UFNameSerializer
from optim_app.service import ServiceToCreateDir, ServiceToDeleteDir


class UserFunctionListView(ListAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

class UserFunctionCreateView(CreateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def create(self, request, *args, **kwargs):
        request.data._mutable = True

        stc = ServiceToCreateDir(request.data)
        request.data["hash"] = stc.save_directory()

        request.data._mutable = False

        return super().create(request, *args, **kwargs)

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

class UFListNameView(ListAPIView):
    serializer_class = UFNameSerializer
    queryset = UserFunction.objects.all()

    def get_queryset(self):
        query = UserFunction.objects.filter(user=self.kwargs["pk"])
        return query

