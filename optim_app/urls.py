from django.urls import path

from optim_app.views import UserFunctionCreateView, UserFunctionListView, UserFunctionDestroyView

urlpatterns = [
    path('create/', UserFunctionCreateView.as_view()),
    path('get/', UserFunctionListView.as_view()),
    path('delete/<int:pk>', UserFunctionDestroyView.as_view())
]
