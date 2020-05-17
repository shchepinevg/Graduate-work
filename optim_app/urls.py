from django.urls import path

from optim_app.views import UserFunctionCreateView

urlpatterns = [
    path('create/', UserFunctionCreateView.as_view())
]
