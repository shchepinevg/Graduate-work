import random as rn
from hashlib import md5

def get_path(file_name):
    rn.seed()
    salt = str(rn.randint(1000, 999999))

    str_to_hash = file_name + salt
    hash_str = md5(str_to_hash.encode()).hexdigest()
    path = '/userfunctions/' + hash_str[:2] + '/' + hash_str[2:4] + '/'
    new_file_name = hash_str[4:]

    return path, new_file_name

