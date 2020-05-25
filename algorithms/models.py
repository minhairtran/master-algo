from django.db import models

# Create your models here.

class Algorithms(models.Model):
    title = models.CharField(max_length=45)
    subtitle = models.CharField(max_length=45, blank=True)
    description = models.CharField(max_length=150)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.title
    