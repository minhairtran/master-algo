from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import (
    UserSerializer
)
from rest_framework.decorators import api_view, permission_classes

# def login_view(request, *args, **kwargs):
#     print(request.POST)
#     form = AuthenticationForm(request, data=request.POST or None)
#     if form.is_valid():
#         user_ = form.get_user()
#         login(request, user_)
#         return redirect("/home")
#     context = {
#         "form": form,
#         "btn_label": "Login",
#         "title": "Login"
#     }
#     return render(request, "accounts/auth.html", context)


# @api_view(['POST'])
# def login_view(request, *args, **kwargs):
#     form = AuthenticationForm(request, data=request.POST or None)
#     print("asdasd", request)
#     if form.is_valid():
#         user_ = form.get_user()
#         login(request, user_)
#         qs = User.objects.filter(id=user_.id)
#         obj = qs.first()
#         serializer = UserSerializer(obj)
#         return Response(serializer.data, status=201)
#     return Response({}, status=400)

@api_view(['POST', 'GET'])
def login_view(request, *args, **kwargs):
    username = request.data.get("username")
    password = request.data.get("password")
    if username and password:
            # Test username/password combination
        user = authenticate(username=username, password=password)
            # Found a match
        if user is not None and user.is_active:
                # User is active
                # Officially log the user in
            login(request, user)
            qs = User.objects.filter(id=user.id)
            obj = qs.first()
            serializer = UserSerializer(obj)
            return Response(serializer.data, status=201)
        return Response({}, status=400)
    return Response({}, status=400)


@permission_classes([IsAuthenticated])
def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/api/login")
    context = {
        "form": None,
        "description": "Are you sure you want to logout?",
        "btn_label": "Click to Confirm",
        "title": "Logout"
    }
    return render(request, "accounts/auth.html", context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        login(request, user)
        return redirect("/home")
    context = {
        "form": form,
        "btn_label": "Register",
        "title": "Register"
    }
    return render(request, "accounts/auth.html", context)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail_view(request, user_id, *args, **kwargs):
    qs = User.objects.filter(id=user_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = UserSerializer(obj)
    return Response(serializer.data, status=200)
