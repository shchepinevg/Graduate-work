from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, RetrieveDestroyAPIView

from optim_app.models import UserFunction
from optim_app.serializer import UserFunctionSerializer
from optim_app.service import ServiceToCreate, ServiceToDelete


class UserFunctionListView(ListAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

class UserFunctionCreateView(CreateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def create(self, request, *args, **kwargs):
        request.data._mutable = True

        stc = ServiceToCreate(request.data)
        stc.save_to_file_sys()
        request.data["hash"] = stc.get_path_to_request()

        request.data._mutable = False

        return super().create(request, *args, **kwargs)

class UserFunctionDestroyView(DestroyAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()


    def destroy(self, request, *args, **kwargs):
        path_to_del = UserFunction.objects.get(id=kwargs["pk"]).hash

        std = ServiceToDelete(path_to_del)
        std.del_dir()

        return super().destroy(request, *args, **kwargs)
