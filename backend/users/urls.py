from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView, ProfileView, MoodListCreateView, MoodDeleteView, MoodStatsView
from .views import ClearHistoryView
from .views import mood_stats_fbv, mood_recommendations_fbv
from .views import LogoutView, MoodUpdateView
from .views import mood_stats_fbv, mood_recommendations_fbv, mood_comments_fbv

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),

    path('moods/', MoodListCreateView.as_view(), name='moods'),
    path('moods/<int:pk>/', MoodDeleteView.as_view(), name='mood_delete'),
    path('moods/stats/', MoodStatsView.as_view(), name='mood_stats'),
    path('moods/clear/', ClearHistoryView.as_view(), name='clear_history'),
    path('moods/stats-fbv/', mood_stats_fbv, name='mood-stats-fbv'),
    path('moods/<int:mood_id>/recommendations/', mood_recommendations_fbv, name='mood-recommendations-fbv'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('moods/<int:pk>/update/', MoodUpdateView.as_view(), name='mood-update'),
    path('moods/<int:mood_id>/comments/', mood_comments_fbv, name='mood-comments-fbv'),
]