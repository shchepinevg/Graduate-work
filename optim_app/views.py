from rest_framework.generics import CreateAPIView, ListAPIView

from optim_app.models import UserFunction
from optim_app.serializer import UserFunctionSerializer
from optim_app.service import ServiceToCreate


class UserFunctionListView(ListAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

class UserFunctionCreateView(CreateAPIView):
    serializer_class = UserFunctionSerializer
    queryset = UserFunction.objects.all()

    def create(self, request, *args, **kwargs):
        request.data._mutable = True

        stc = ServiceToCreate(request)
        stc.save_to_file_sys()
        request.data["hash"] = stc.get_path_to_request()

        request.data._mutable = False

        return super().create(request, *args, **kwargs)