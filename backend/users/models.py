from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver


class MoodEntry(models.Model):
    MOOD_CHOICES = [
        ('happy', 'Happy'),
        ('sad', 'Sad'),
        ('tired', 'Tired'),
        ('angry', 'Angry'),
        ('calm', 'Calm'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mood_entries')
    mood = models.CharField(max_length=20, choices=MOOD_CHOICES)
    note = models.TextField(blank=True)
    intensity = models.IntegerField(default=5)
    music = models.URLField(blank=True)
    movie = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.mood} - {self.created_at:%Y-%m-%d %H:%M}"
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

class MoodRecommendation(models.Model):
    mood_entry = models.ForeignKey(
        MoodEntry,
        on_delete=models.CASCADE,
        related_name='recommendations'
    )
    title = models.CharField(max_length=100)
    recommendation_type = models.CharField(
        max_length=20,
        choices=[
            ('music', 'Music'),
            ('movie', 'Movie'),
            ('activity', 'Activity'),
        ]
    )
    link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.recommendation_type}: {self.title}"


class MoodComment(models.Model):
    mood_entry = models.ForeignKey(
        MoodEntry,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment for mood #{self.mood_entry.id}"
    
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)