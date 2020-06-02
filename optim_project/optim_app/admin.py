from django.contrib import admin

from optim_app.models import UserFunction, ParameterInfo

admin.site.register([UserFunction, ParameterInfo])
