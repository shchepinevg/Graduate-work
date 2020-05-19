from django.urls import path

from optim_app.views import UserFunctionCreateView, UserFunctionListView, UserFunctionDestroyView, UFListNameView, \
    UFUpdateNameView

urlpatterns = [
    path('create/', UserFunctionCreateView.as_view()),
    path('get/all/', UserFunctionListView.as_view()),
    path('delete/<int:pk>', UserFunctionDestroyView.as_view()),
    path('get/names/<int:pk>', UFListNameView.as_view()),
    path('update/name/<int:pk>', UFUpdateNameView.as_view()),
]
