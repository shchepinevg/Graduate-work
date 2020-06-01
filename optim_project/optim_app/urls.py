from django.urls import path

from optim_app.views import (
    UserFunctionCreateView,
    UserFunctionListView,
    UserFunctionDestroyView,
    UFUpdateNameView, OptimHistoryListView,
)

urlpatterns = [
    path('create/', UserFunctionCreateView.as_view()),
    path('get-functions/<int:pk>', UserFunctionListView.as_view()),
    path('get-optimization-history/<int:pk>', OptimHistoryListView.as_view()),


    path('delete/<int:pk>', UserFunctionDestroyView.as_view()),
    path('update/name/<int:pk>', UFUpdateNameView.as_view()),
]
