
from django.urls import path

from .views import (
    login_view, logout_view, register_view, user_detail_view
)
'''
CLIENT
Base ENDPOINT /api/feedback/
'''
urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('user/<int:user_id>/', user_detail_view)
]