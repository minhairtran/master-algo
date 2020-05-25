from profiles.serializers import PublicProfileSerializer
from django.conf import settings
from rest_framework import serializers
from .models import Feedback

MAX_FEEDBACK_LENGTH = settings.MAX_FEEDBACK_LENGTH

class FeedbackCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'content']
    
    def validate_content(self, value):
        if len(value) > MAX_FEEDBACK_LENGTH:
            raise serializers.ValidationError("This feedback is too long")
        return value



class FeedbackSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    class Meta:
        model = Feedback
        fields = ['id', 'content', 'timestamp', 'user']