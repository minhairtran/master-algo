
from django.urls import path

from .views import algorithms_list_view

urlpatterns = [
    path('', algorithms_list_view),
]