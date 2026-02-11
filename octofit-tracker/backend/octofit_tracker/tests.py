from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            team_id="team123"
        )
    
    def test_user_creation(self):
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")
        self.assertEqual(str(self.user), "Test User")


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            description="A test team"
        )
    
    def test_team_creation(self):
        self.assertEqual(self.team.name, "Test Team")
        self.assertEqual(self.team.description, "A test team")
        self.assertEqual(str(self.team), "Test Team")


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id="user123",
            activity_type="Running",
            duration=30,
            calories=300,
            distance=5.0,
            date=datetime.now()
        )
    
    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, "Running")
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories, 300)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            user_id="user123",
            team_id="team123",
            total_calories=1000,
            total_activities=10,
            total_duration=300,
            rank=1
        )
    
    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.total_calories, 1000)
        self.assertEqual(self.leaderboard.total_activities, 10)
        self.assertEqual(self.leaderboard.rank, 1)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name="Morning Run",
            description="A morning running workout",
            category="Cardio",
            difficulty="Medium",
            duration=30,
            calories_estimate=300
        )
    
    def test_workout_creation(self):
        self.assertEqual(self.workout.name, "Morning Run")
        self.assertEqual(self.workout.category, "Cardio")
        self.assertEqual(self.workout.difficulty, "Medium")
        self.assertEqual(str(self.workout), "Morning Run")


class APIEndpointsTest(APITestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
    
    def test_users_endpoint(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_teams_endpoint(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_activities_endpoint(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_leaderboard_endpoint(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_workouts_endpoint(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
