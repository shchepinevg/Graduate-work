from django.urls import path

from optim_app.views import (
    UserFunctionCreateView,
    UserFunctionListView,
    UserFunctionDestroyView,
    UFUpdateNameView,
    ParameterInfoCreateView,
    OptimizationFunctionView,
    OptimizationParametersView,
    OptimizationFunctionCreateView,
    OptimizationParametersCreateView,
)

urlpatterns = [
    path('create/function', UserFunctionCreateView.as_view()),
    path('create/parameters', ParameterInfoCreateView.as_view()),

    path('get-functions/<int:pk>', UserFunctionListView.as_view()),
    path('optim-func/<int:pk>', OptimizationFunctionView.as_view()),
    path('optim-param/<int:pk>', OptimizationParametersView.as_view()),

    path('create/optim-func', OptimizationFunctionCreateView.as_view()),
    path('create/optim-param', OptimizationParametersCreateView.as_view()),

    path('delete/functions/<int:pk>', UserFunctionDestroyView.as_view()),
    path('update/name/<int:pk>', UFUpdateNameView.as_view()),
]
