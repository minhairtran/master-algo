
import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .forms import FeedbackForm
from .models import Feedback
from .serializers import (
    FeedbackSerializer, 
    FeedbackCreateSerializer
)

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, "pages/home.html", context={"username": username}, status=200)


@api_view(['POST']) # http method the client == POST
# @authentication_classes([SessionAuthentication, MyCustomAuth])
@permission_classes([IsAuthenticated]) # REST API course
def feedback_create_view(request, *args, **kwargs):
    serializer = FeedbackCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def feedback_detail_view(request, feedback_id, *args, **kwargs):
    qs = Feedback.objects.filter(id=feedback_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = FeedbackSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def feedback_delete_view(request, feedback_id, *args, **kwargs):
    qs = Feedback.objects.filter(id=feedback_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this feedback"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Feedback removed"}, status=200)


@api_view(['GET'])
def feedback_list_view(request, *args, **kwargs):
    qs = Feedback.objects.all()
    serializer = FeedbackSerializer(qs, many=True)
    return Response(serializer.data, status=200)
