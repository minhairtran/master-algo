from django.contrib.auth import get_user_model
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Feedback
# Create your tests here.
User = get_user_model()

class FeedbackTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='cfe', password='somepassword')
        self.userb = User.objects.create_user(username='cfe-2', password='somepassword2')
        Feedback.objects.create(content="my first feedback", 
            user=self.user)
        Feedback.objects.create(content="my first feedback", 
            user=self.user)
        Feedback.objects.create(content="my first feedback", 
            user=self.userb)
        self.currentCount = Feedback.objects.all().count()

    def test_feedback_created(self):
        feedback_obj = Feedback.objects.create(content="my second feedback", 
            user=self.user)
        self.assertEqual(feedback_obj.id, 4)
        self.assertEqual(feedback_obj.user, self.user)
    
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client
    
    def test_feedback_list(self):
        client = self.get_client()
        response = client.get("/api/feedbacks/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
    
    def test_feedback_create_api_view(self):
        request_data = {"content": "This is my test feedback"}
        client = self.get_client()
        response = client.post("/api/feedbacks/create/", request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_feedback_id = response_data.get("id")
        self.assertEqual(self.currentCount + 1, new_feedback_id)
    
    def test_feedback_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/feedbacks/1/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        _id = data.get("id")
        self.assertEqual(_id, 1)

    def test_feedback_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/feedbacks/1/delete/")
        self.assertEqual(response.status_code, 200)
        client = self.get_client()
        response = client.delete("/api/feedbacks/1/delete/")
        self.assertEqual(response.status_code, 404)
        response_incorrect_owner = client.delete("/api/feedbacks/3/delete/")
        self.assertEqual(response_incorrect_owner.status_code, 401)