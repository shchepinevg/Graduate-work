import os
import random as rn

from hashlib import md5

from django.core.files.storage import FileSystemStorage
from optim_project.settings import BASE_DIR


class ServiceToCreate:
    def __init__(self, request):
        self.request = request
        self.path, self.file_name = self.get_path_via_hash(request.data["name"])

    def save_to_file_sys(self):
        path_to_file = os.path.join(BASE_DIR, 'optim_app\\userfunctions', self.path)

        fss = FileSystemStorage(location=path_to_file)
        fss.save(self.request.data["hash"].name, self.request.data["hash"])
        os.rename(os.path.join("userfunctions", self.path, self.request.data["hash"].name),
                  os.path.join("userfunctions", self.path, self.file_name + os.path.splitext(self.request.data["hash"].name)[1]))

    def get_path_to_request(self):
        return os.path.join(self.path, self.file_name + os.path.splitext(self.request.data["hash"].name)[1])


    def get_path_via_hash(self, some_str):
        rn.seed()
        salt = str(rn.randint(1000, 999999))

        str_to_hash = some_str + salt
        hash_str = md5(str_to_hash.encode()).hexdigest()
        path = hash_str[:2] + '\\' + hash_str[2:4]
        new_file_name = hash_str[4:]

        return path, new_file_name
