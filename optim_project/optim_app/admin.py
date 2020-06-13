from django.contrib import admin

from optim_app.models import (
    UserFunction,
    ParameterInfo,
    OptimizationFunction,
    OptimizationParameters,
    OptimizationInfo
)

admin.site.register([UserFunction, ParameterInfo, OptimizationFunction, OptimizationParameters, OptimizationInfo])
