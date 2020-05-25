"""MasterAlgoBackendConfig URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include # url()
from django.views.generic import TemplateView
from django.conf.urls.static import static

from accounts.views import (
    login_view,
    logout_view,
    register_view,
)

from feedbacks.views import (
    home_view, 
    feedback_delete_view,
    feedback_detail_view, 
    feedback_list_view,
    feedback_create_view,
)
urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    path('api/login/', login_view),
    path('api/logout/', logout_view),
    path('api/register/', register_view),
    path('admin/', admin.site.urls),
    path('home', home_view),
    path('api/feedbacks/', include('feedbacks.urls')),
    path('api/profile/', include('profiles.urls')),
    path('api/algorithms/', include('algorithms.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, 
                document_root=settings.STATIC_ROOT)