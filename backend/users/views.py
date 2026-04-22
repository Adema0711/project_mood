from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import MoodEntry, MoodRecommendation, MoodComment
from django.db.models import Count, Avg
from django.utils.dateparse import parse_date

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import (
    RegisterSerializer,
    UpdateProfileSerializer,
    MoodEntrySerializer,
    LoginSerializer,
    MoodStatsSerializer,
    MoodRecommendationSerializer,
    MoodCommentSerializer,
    LogoutSerializer,
    UserSerializer,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mood_stats_fbv(request):
    moods = MoodEntry.objects.filter(user=request.user)

    total_entries = moods.count()
    average_intensity = moods.aggregate(avg=Avg('intensity'))['avg'] or 0

    most_common = (
        moods.values('mood')
        .annotate(count=Count('mood'))
        .order_by('-count')
        .first()
    )

    data = {
        'total_entries': total_entries,
        'average_intensity': round(average_intensity, 2),
        'most_common_mood': most_common['mood'] if most_common else 'No data'
    }

    serializer = MoodStatsSerializer(data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mood_recommendations_fbv(request, mood_id):
    recommendations = MoodRecommendation.objects.filter(
        mood_entry__id=mood_id,
        mood_entry__user=request.user
    )
    serializer = MoodRecommendationSerializer(recommendations, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def mood_comments_fbv(request, mood_id):
    try:
        mood_entry = MoodEntry.objects.get(id=mood_id, user=request.user)
    except MoodEntry.DoesNotExist:
        return Response({'detail': 'Mood entry not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        comments = MoodComment.objects.filter(mood_entry=mood_entry).order_by('-created_at')
        serializer = MoodCommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MoodCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(mood_entry=mood_entry)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

def apply_mood_filters(queryset, request):
    mood = request.query_params.get('mood')
    intensity = request.query_params.get('intensity')
    date_from = request.query_params.get('date_from')
    date_to = request.query_params.get('date_to')

    if mood:
        queryset = queryset.filter(mood=mood)

    if intensity == 'low':
        queryset = queryset.filter(intensity__lte=3)
    elif intensity == 'medium':
        queryset = queryset.filter(intensity__gte=4, intensity__lte=7)
    elif intensity == 'high':
        queryset = queryset.filter(intensity__gte=8)

    if date_from:
        parsed_from = parse_date(date_from)
        if parsed_from:
            queryset = queryset.filter(created_at__date__gte=parsed_from)

    if date_to:
        parsed_to = parse_date(date_to)
        if parsed_to:
            queryset = queryset.filter(created_at__date__lte=parsed_to)

    return queryset
    

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)

            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'detail': 'Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'detail': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.check_password(password):
            return Response(
                {'detail': 'Invalid credentials.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        serializer = UpdateProfileSerializer(request.user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(request.user).data)

        return Response(serializer.errors, status=400)
    

class ClearHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        MoodEntry.objects.filter(user=request.user).delete()
        return Response({'message': 'History cleared'})

class MoodListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        moods = MoodEntry.objects.filter(user=request.user).order_by('-created_at')
        moods = apply_mood_filters(moods, request)

        serializer = MoodEntrySerializer(moods, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MoodEntrySerializer(data=request.data)

        if serializer.is_valid():
            mood_entry = serializer.save(user=request.user)

            recommendations_map = {
                'happy': [
                    {
                        'title': 'Go for a walk',
                        'recommendation_type': 'activity',
                        'link': ''
                    },
                    {
                        'title': 'Watch a comedy movie',
                        'recommendation_type': 'movie',
                        'link': ''
                    },
                ],
                'sad': [
                    {
                        'title': 'Listen to relaxing music',
                        'recommendation_type': 'music',
                        'link': ''
                    },
                    {
                        'title': 'Write down your thoughts',
                        'recommendation_type': 'activity',
                        'link': ''
                    },
                ],
                'tired': [
                    {
                        'title': 'Take a short rest',
                        'recommendation_type': 'activity',
                        'link': ''
                    },
                    {
                        'title': 'Listen to calm instrumental music',
                        'recommendation_type': 'music',
                        'link': ''
                    },
                ],
                'angry': [
                    {
                        'title': 'Do breathing exercises',
                        'recommendation_type': 'activity',
                        'link': ''
                    },
                    {
                        'title': 'Go for a short walk',
                        'recommendation_type': 'activity',
                        'link': ''
                    },
                ],
                'calm': [
                    {
                        'title': 'Watch a peaceful movie',
                        'recommendation_type': 'movie',
                        'link': ''
                    },
                    {
                        'title': 'Read a book with tea',
                        'recommendation_type': 'activity',
                        'link': ''
                    },
                ],
            }

            mood_value = mood_entry.mood
            recommendations = recommendations_map.get(mood_value, [])

            for item in recommendations:
                MoodRecommendation.objects.create(
                    mood_entry=mood_entry,
                    title=item['title'],
                    recommendation_type=item['recommendation_type'],
                    link=item['link']
                )

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MoodDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            mood = MoodEntry.objects.get(pk=pk, user=request.user)
        except MoodEntry.DoesNotExist:
            return Response(
                {'detail': 'Mood entry not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        mood.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class MoodStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        moods = MoodEntry.objects.filter(user=request.user)
        moods = apply_mood_filters(moods, request)

        stats_qs = (
            moods.values('mood')
            .annotate(count=Count('id'))
            .order_by()
        )

        stats = {
            'happy': 0,
            'sad': 0,
            'tired': 0,
            'angry': 0,
            'calm': 0,
            'total': moods.count(),
        }

        for item in stats_qs:
            stats[item['mood']] = item['count']

        return Response(stats)
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"error": "Invalid or expired refresh token"}, status=status.HTTP_400_BAD_REQUEST)
        

class MoodUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            mood_entry = MoodEntry.objects.get(pk=pk, user=request.user)
        except MoodEntry.DoesNotExist:
            return Response({"error": "Mood entry not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MoodEntrySerializer(mood_entry, data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        try:
            mood_entry = MoodEntry.objects.get(pk=pk, user=request.user)
        except MoodEntry.DoesNotExist:
            return Response({"error": "Mood entry not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MoodEntrySerializer(mood_entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)