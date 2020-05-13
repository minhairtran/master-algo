from django.contrib import admin

# Register your models here.
from .models import Feedback

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user']
    search_fields = ['content', 'user__username', 'user__email']
    class Meta:
        model = Feedback

admin.site.register(Feedback, FeedbackAdmin)