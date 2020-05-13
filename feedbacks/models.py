from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

# Create your models here.

class Feedback(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE) # many users can many tweets
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']