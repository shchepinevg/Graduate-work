import os

from django.core.files.storage import FileSystemStorage
from rest_framework.generics import CreateAPIView

from optim_app.hash import get_path
from optim_app.serializer import UserFunctionSerializer
from optim_project.settings import BASE_DIR


class UserFunctionCreateView(CreateAPIView):
    serializer_class = UserFunctionSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs["context"] = self.get_serializer_context()
        draft_request_data = self.request.data.copy()

        path, file_name = get_path(draft_request_data.get("name_func"))
        fss = FileSystemStorage(location=os.path.join(BASE_DIR, path))
        fss.save(file_name, draft_request_data.get("user_func"))

        # Проверить
        draft_request_data["func_file"] = path
        kwargs["data"] = draft_request_data

        return serializer_class(*args, **kwargs)

