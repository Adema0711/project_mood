from django.db import models
from django.contrib.auth.models import User


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