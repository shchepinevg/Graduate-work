from django.urls import path

from optim_app.views import UserFunctionCreateView, UserFunctionListView

urlpatterns = [
    path('create/', UserFunctionCreateView.as_view()),
    path('get/', UserFunctionListView.as_view())
]
