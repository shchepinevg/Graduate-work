from django.urls import path

from optim_app.views import (
    UserFunctionCreateView,
    UserFunctionListView,
    UserFunctionDestroyView,
    ParameterInfoCreateView,
    OptimizationParametersCreateView,
    OptimizationInfoCreateView,
    OptimizationFunctionCreateView,
    OptimizationFunctionListView,
    OptimizationParametersListView,
)

urlpatterns = [
    path('create/function', UserFunctionCreateView.as_view()),
    path('create/parameters', ParameterInfoCreateView.as_view()),
    path('get/functions/<int:pk>', UserFunctionListView.as_view()),
    path('delete/function/<int:pk>', UserFunctionDestroyView.as_view()),


    path('create/optim-info', OptimizationInfoCreateView.as_view()),
    path('create/optim-func', OptimizationFunctionCreateView.as_view()),
    path('create/optim-param', OptimizationParametersCreateView.as_view()),

    path('get/optim-func', OptimizationFunctionListView.as_view()),
    path('get/optim-param', OptimizationParametersListView.as_view())
]

