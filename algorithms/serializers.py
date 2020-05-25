from rest_framework import serializers
from .models import Algorithms

class AlgorithmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Algorithms
        fields = ['id', 'title', 'subtitle', 'description', 'image']