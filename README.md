# Mood Tracker

## Project Description
Mood Tracker is a full-stack web application built with Angular and Django REST Framework.  
It allows users to register, log in, track their mood, view mood history, filter entries, update profile information, and receive personalized recommendations based on their mood.

## Group Members
- Ayaulym
- Adema
- Gulzhamal

## Technologies Used

### Frontend
- Angular
- TypeScript
- HTML
- CSS
- HttpClient
- Angular Routing

### Backend
- Django
- Django REST Framework
- JWT Authentication
- SQLite
- django-cors-headers

## Main Features
- User registration and login
- JWT authentication with interceptor
- Logout functionality
- User profile update
- Create, view, update, and delete mood entries (CRUD)
- Mood history filtering by mood, intensity, and date
- Mood statistics
- Automatically generated mood recommendations
- Comments for mood entries

## Database Models
- MoodEntry
- UserProfile
- MoodRecommendation
- MoodComment

## API Endpoints

### Auth
- `POST /api/register/`
- `POST /api/login/`
- `POST /api/logout/`
- `POST /api/token/refresh/`

### Profile
- `GET /api/profile/`
- `PATCH /api/profile/`

### Mood Entries
- `GET /api/moods/`
- `POST /api/moods/`
- `DELETE /api/moods/<id>/`
- `PUT /api/moods/<id>/update/`
- `PATCH /api/moods/<id>/update/`

### Extra Endpoints
- `GET /api/moods/stats/`
- `GET /api/moods/stats-fbv/`
- `DELETE /api/moods/clear/`
- `GET /api/moods/<id>/recommendations/`
- `GET /api/moods/<id>/comments/`
- `POST /api/moods/<id>/comments/`

## How to Run the Backend
```bash
cd backend
python manage.py migrate
python manage.py runserver