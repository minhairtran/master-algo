from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Algorithms
from .serializers import AlgorithmSerializer
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
def algorithms_list_view(request, *args, **kwargs):
    qs = Algorithms.objects.all()
    serializer = AlgorithmSerializer(qs, many=True)
    return Response(serializer.data, status=200)