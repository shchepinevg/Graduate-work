import os
import subprocess

from optim_project.settings import BASE_DIR

from optim_app.models import UserFunction, OptimizationInfo

myGA = [3, 3, 2, 20, 40, 0.2, 0.75, 0.1, 2, 0.45, 0, 0.2]
myCE = [3, 40, 0.55, 0.9, 0]
myDE = [40, 0.2]

info_data = {
    "user_function": 38,
    "is_function": 1,
    "optimization_meth": "GA",
    "N": 150,
    "min_or_max": 1,
    "isRecommend": 1,
    "parameters": myGA,
    "param_func": [
        {
            "name": "x1",
            "discrete_continuous": 1,
            "lower_bound": -500,
            "upper_bound": 500,
        },
        {
            "name": "x2",
            "discrete_continuous": 1,
            "lower_bound": -500,
            "upper_bound": 500,
        }
    ]
}

info_data2 = {
    "user_function": 38,
    "is_function": 2,
    "optimization_meth": "GA",
    "meta_optim_meth": "CE",
    "N": 50,
    "meta_N": 120,
    "k": 1,
    "min_or_max": 1,
    "isRecommend": 2,
    "meta_param_optim": myCE,
    "param_func": [
        {
            "name": "x1",
            "discrete_continuous": 1,
            "lower_bound": -500,
            "upper_bound": 500,
        },
        {
            "name": "x2",
            "discrete_continuous": 1,
            "lower_bound": -500,
            "upper_bound": 500,
        }
    ]
}

class ToR:
    def __init__(self, info):
        self.info = info
        self.optim_info = OptimizationInfo.objects.filter(id=self.info["optim_info"]).values()
        self.optim_info = self.optim_info[0]
        self.param_func = [{"name": e.name,
                            "discrete_continuous": e.discrete_continuous,
                            "lower_bound": e.lower_bound,
                            "upper_bound": e.upper_bound}
                           for e in UserFunction.objects.get(id=self.info["user_function"]).param.all()]


    def get_optimMeth(self):
        # !!! How get dict in dict
        if self.info["coordinates"]["is_function"] == 1:
            str_optim = "{} {} {} {}".format(str(self.info["coordinates"]["is_function"]), self.optim_info["optimization_meth"],
                                       str(self.optim_info["N"]), str(self.optim_info["min_or_max"]))
            return str_optim
        elif self.info["coordinates"]["is_function"] == 2:
            str_optim = "{} {} {} {} {} {} {}".format(str(self.info["coordinates"]["is_function"]),
                                                self.optim_info["optimization_meth"],
                                                self.info["meta_optim_meth"], str(self.optim_info["N"]),
                                                str(self.info["meta_N"]), str(self.info["k"]),
                                                str(self.optim_info["min_or_max"]))
            return str_optim

    def get_paramMeth(self):
        if self.info["coordinates"]["isRecommend"] == 1:
            return "1"
        elif self.info["coordinates"]["isRecommend"] == 2:
            str_param = "2 "
            params = []
            if self.info["coordinates"]["is_function"] == 1:
                params = self.optim_info["parameters"]
            elif self.info["coordinates"]["is_function"] == 2:
                params = self.info["meta_param_optim"]

            params = " ".join(str(e) for e in params)
            str_param += params

            return str_param


    def get_path(self):
        path_to_dir = UserFunction.objects.get(id=self.info["user_function"]).hash
        relative_path = UserFunction.objects.get(id=self.info["user_function"]).relative_path

        path = os.path.join("optim_app\\userfunctions", path_to_dir, relative_path)

        return path

    def get_paramFunc(self):
        str_param = ""
        for param in self.param_func:
            str_param += "{} {} {} {} ".format(param["name"],
                                               str(param["discrete_continuous"]),
                                               str(param["lower_bound"]),
                                               str(param["upper_bound"]))
        str_param = str_param[:-1]

        return str_param

    def start_R(self):
        str1 = self.get_optimMeth()
        str2 = self.get_paramMeth()
        path = self.get_path()
        param_func = self.get_paramFunc()

        args = [str1, str2, path, param_func]
        path_to_file = os.path.join(BASE_DIR, 'optim_app\\R\\Controller.R')
        cmd = ["Rscript", path_to_file] + args
        res = subprocess.check_output(cmd, universal_newlines=True)

        # Parse result
        res = res[5:len(res)-2]
        res = res.split()
        res = [float(e) for e in res]

        coordinates = res[:-1]
        value = res[-1]

        return coordinates, value
