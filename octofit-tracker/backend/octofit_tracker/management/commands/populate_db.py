from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete all existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League Heroes'
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create Users for Team Marvel
        self.stdout.write('Creating Team Marvel users...')
        marvel_users = [
            User.objects.create(username='ironman', full_name='Tony Stark', email='ironman@marvel.com', fitness_level='Intermediate', team_id=str(team_marvel._id)),
            User.objects.create(username='captainamerica', full_name='Steve Rogers', email='captainamerica@marvel.com', fitness_level='Advanced', team_id=str(team_marvel._id)),
            User.objects.create(username='thor', full_name='Thor Odinson', email='thor@marvel.com', fitness_level='Expert', team_id=str(team_marvel._id)),
            User.objects.create(username='blackwidow', full_name='Natasha Romanoff', email='blackwidow@marvel.com', fitness_level='Advanced', team_id=str(team_marvel._id)),
            User.objects.create(username='hulk', full_name='Bruce Banner', email='hulk@marvel.com', fitness_level='Beginner', team_id=str(team_marvel._id)),
        ]
        
        # Create Users for Team DC
        self.stdout.write('Creating Team DC users...')
        dc_users = [
            User.objects.create(username='superman', full_name='Clark Kent', email='superman@dc.com', fitness_level='Expert', team_id=str(team_dc._id)),
            User.objects.create(username='batman', full_name='Bruce Wayne', email='batman@dc.com', fitness_level='Advanced', team_id=str(team_dc._id)),
            User.objects.create(username='wonderwoman', full_name='Diana Prince', email='wonderwoman@dc.com', fitness_level='Expert', team_id=str(team_dc._id)),
            User.objects.create(username='flash', full_name='Barry Allen', email='flash@dc.com', fitness_level='Intermediate', team_id=str(team_dc._id)),
            User.objects.create(username='aquaman', full_name='Arthur Curry', email='aquaman@dc.com', fitness_level='Advanced', team_id=str(team_dc._id)),
        ]
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} users'))
        
        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Swimming', 'Cycling', 'Weightlifting', 'Yoga', 'Boxing', 'Martial Arts']
        activity_count = 0
        
        for user in all_users:
            # Create 5-10 activities per user
            for i in range(5, 11):
                activity_type = activity_types[i % len(activity_types)]
                duration = 30 + (i * 10)
                calories = duration * 8
                distance = None if activity_type in ['Weightlifting', 'Yoga', 'Boxing', 'Martial Arts'] else (duration / 10.0)
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    calories=calories,
                    distance=distance,
                    date=timezone.now() - timedelta(days=i)
                )
                activity_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activity_count} activities'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for user in all_users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_calories = sum(activity.calories for activity in user_activities)
            total_duration = sum(activity.duration for activity in user_activities)
            total_activities = user_activities.count()
            
            Leaderboard.objects.create(
                user_id=str(user._id),
                team_id=user.team_id,
                total_calories=total_calories,
                total_activities=total_activities,
                total_duration=total_duration
            )
        
        # Update ranks based on total calories
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_calories')
        for rank, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
            entry.save()
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} leaderboard entries'))
        
        # Create Workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            {
                'name': 'Super Soldier Circuit',
                'description': 'High-intensity circuit training inspired by Captain America',
                'category': 'Strength Training',
                'difficulty': 'Advanced',
                'duration': 45,
                'calories_estimate': 450
            },
            {
                'name': 'Asgardian Hammer Workout',
                'description': 'Powerful full-body workout fit for a god',
                'category': 'Strength Training',
                'difficulty': 'Expert',
                'duration': 60,
                'calories_estimate': 600
            },
            {
                'name': 'Speedster Sprint Training',
                'description': 'Lightning-fast interval training',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'duration': 30,
                'calories_estimate': 400
            },
            {
                'name': 'Bat Cave Core',
                'description': 'Intense core strengthening routine',
                'category': 'Core',
                'difficulty': 'Advanced',
                'duration': 25,
                'calories_estimate': 250
            },
            {
                'name': 'Amazonian Warrior Training',
                'description': 'Combat-ready full body conditioning',
                'category': 'Mixed Martial Arts',
                'difficulty': 'Advanced',
                'duration': 50,
                'calories_estimate': 550
            },
            {
                'name': 'Kryptonian Strength',
                'description': 'Maximum strength building program',
                'category': 'Strength Training',
                'difficulty': 'Expert',
                'duration': 55,
                'calories_estimate': 500
            },
            {
                'name': 'Arc Reactor Cardio',
                'description': 'Powered-up cardiovascular workout',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'duration': 35,
                'calories_estimate': 350
            },
            {
                'name': 'Atlantean Aqua Fitness',
                'description': 'Water-based resistance training',
                'category': 'Swimming',
                'difficulty': 'Intermediate',
                'duration': 40,
                'calories_estimate': 420
            },
            {
                'name': 'Gamma Rage HIIT',
                'description': 'Explosive high-intensity interval training',
                'category': 'HIIT',
                'difficulty': 'Advanced',
                'duration': 30,
                'calories_estimate': 450
            },
            {
                'name': 'Widow\'s Flexibility Flow',
                'description': 'Advanced flexibility and mobility routine',
                'category': 'Yoga',
                'difficulty': 'Beginner',
                'duration': 40,
                'calories_estimate': 200
            }
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))
        
        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
