import os
import random as rn
import patoolib

from hashlib import md5

from django.core.files.storage import FileSystemStorage
from optim_project.settings import BASE_DIR


class ServiceToCreate:
    def __init__(self, data):
        self.data = data
        self.path, self.path2 = self.get_path_via_hash(data["name"])

    def save_to_file_sys(self):
        FULL_PATH_TO_FILE = os.path.join(BASE_DIR, 'optim_app\\userfunctions', self.path)
        PATH_TO_FILE = os.path.join("userfunctions", self.path)

        fss = FileSystemStorage(location=FULL_PATH_TO_FILE)
        fss.save(self.data["hash"].name, self.data["hash"])

        os.mkdir(os.path.join(PATH_TO_FILE, self.path2))
        patoolib.extract_archive(os.path.join(FULL_PATH_TO_FILE, self.data["hash"].name),
                                 outdir=os.path.join(FULL_PATH_TO_FILE, self.path2))

        os.remove(os.path.join(PATH_TO_FILE, self.data["hash"].name))

    def get_path_to_request(self):
        return os.path.join(self.path, self.path2)


    def get_path_via_hash(self, some_str):
        rn.seed()
        salt = str(rn.randint(1000, 999999))

        str_to_hash = some_str + salt
        hash_str = md5(str_to_hash.encode()).hexdigest()
        path = hash_str[:2] + '\\' + hash_str[2:4]
        new_file_name = hash_str[4:]

        return path, new_file_name

class ServiceToDelete:
    def __init__(self, path):
        self.path = path

    def del_dir(self):
        pass