from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView, ProfileView, MoodListCreateView, MoodDeleteView, MoodStatsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),

    path('moods/', MoodListCreateView.as_view(), name='moods'),
    path('moods/<int:pk>/', MoodDeleteView.as_view(), name='mood_delete'),
    path('moods/stats/', MoodStatsView.as_view(), name='mood_stats'),
    path('moods/clear/', ClearHistoryView.as_view()),

]