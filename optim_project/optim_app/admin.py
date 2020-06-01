from django.contrib import admin

from optim_app.models import UserFunction, ParameterInfo, OptimizationHistory

admin.site.register([UserFunction, ParameterInfo, OptimizationHistory])
