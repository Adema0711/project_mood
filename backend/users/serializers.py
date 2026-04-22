from django.contrib.auth.models import User
from rest_framework import serializers
from .models import MoodEntry, UserProfile, MoodRecommendation, MoodComment



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class MoodStatsSerializer(serializers.Serializer):
    total_entries = serializers.IntegerField()
    average_intensity = serializers.FloatField()
    most_common_mood = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    bio = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio']

    def get_bio(self, obj):
        profile = getattr(obj, 'profile', None)
        return profile.bio if profile else ''

class UpdateProfileSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'bio']

    def validate_email(self, value):
        qs = User.objects.filter(email=value).exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def validate_username(self, value):
        qs = User.objects.filter(username=value).exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError("User with this username already exists.")
        return value

    def update(self, instance, validated_data):
        bio = validated_data.pop('bio', None)

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile, created = UserProfile.objects.get_or_create(user=instance)

        if bio is not None:
            profile.bio = bio

        profile.save()
        return instance


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("User with this username already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MoodEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodEntry
        fields = ['id', 'mood', 'note', 'intensity', 'music', 'movie', 'created_at']
        read_only_fields = ['id', 'created_at']

class MoodRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodRecommendation
        fields = '__all__'


class MoodCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodComment
        fields = ['id', 'mood_entry', 'text', 'created_at']
        read_only_fields = ['id', 'created_at', 'mood_entry']

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()