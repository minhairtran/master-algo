from django.conf import settings
from django.db import models
from profiles.models import Profile

User = settings.AUTH_USER_MODEL

# Create your models here.

class Feedback(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="feedbacks") # many users can many tweets
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-id']