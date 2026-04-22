import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';


export interface MoodStats {
  happy: number;
  sad: number;
  tired: number;
  angry: number;
  calm: number;
  total: number;
}

export interface MoodFilters {
  mood?: string;
  intensity?: string;
  date_from?: string;
  date_to?: string;
}

export interface MoodEntry {
  id?: number;
  mood: string;       
  emoji: string;
  note: string;
  color: string;
  intensity?: number;
  music?: string;
  movie?: string;
  tips?: string[];
  createdAt?: string;
}

interface ApiMoodEntry {
  id?: number;
  mood: string;       
  note: string;
  intensity?: number;
  music?: string;
  movie?: string;
  created_at?: string;
}

export const MOODS = [
  { key: 'радостно',  label: 'Happy', emoji: '😄', color: '#f6d860', bg: 'rgba(246,216,96,0.12)' },
  { key: 'грустно',   label: 'Sad',   emoji: '😢', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  { key: 'устал',     label: 'Tired', emoji: '😴', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { key: 'злюсь',     label: 'Angry', emoji: '😠', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  { key: 'спокойно',  label: 'Calm',  emoji: '😌', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
];

const RECS: Record<string, Partial<MoodEntry>> = {
  радостно: {
    music: 'https://open.spotify.com/playlist/3dnXGas4EgEYxlphPZT6zF?si=7d17e57ca2a8445a',
    movie: 'https://www.imdb.com/title/tt2096673/',
    tips: [
      'Share some positivity with your friends 🌞',
      'Do something nice for someone 💌',
      'Capture this moment!',
      'Continue the day with a smile 😁'
    ]
  },
  грустно: {
    music: 'https://open.spotify.com/playlist/37i9dQZF1EIg85EO6f7KwU?si=519db17a5ffc4c85',
    movie: 'https://www.imdb.com/title/tt1675434/',
    tips: [
      'Listen to your favorite music 🎧',
      'Call a friend ☎️',
      'Go for a walk 🌳',
      'Watch something inspiring ✨'
    ]
  },
  устал: {
    music: 'https://open.spotify.com/playlist/0Lo31VIQiOvkX8NL1TEiXa?si=e47c15e021864192',
    movie: 'https://www.imdb.com/title/tt2948372/',
    tips: [
      'Take a break and drink some water 💧',
      'Close your eyes for a couple of minutes 💤',
      'Just do nothing - thats okay 😎',
      'Get some fresh air 🌿'
    ]
  },
  злюсь: {
    music: 'https://open.spotify.com/playlist/2ixTs55cUKl0UoCNHd8JcO?si=a982139b85e74c92',
    movie: 'https://www.imdb.com/title/tt0108052/',
    tips: [
      'Take 10 deep breaths 🌬️',
      'Write down whats making you angry ✍️',
      'Go for a brisk walk 🚶',
      'Talk to someone you trust 💬'
    ]
  },
  спокойно: {
    music: 'https://open.spotify.com/playlist/37i9dQZF1EIfTmpqlGn32s?si=63e669f1abda408b',
    movie: 'https://www.imdb.com/title/tt0317219/',
    tips: [
      'Meditate for 5 minutes 🧘',
      'Read a book 📖',
      'Engage in creative activities 🎨',
      'Enjoy some quiet time ☕'
    ]
  },
};

@Injectable({ providedIn: 'root' })
export class MoodService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth/moods/';

  private uiToApiMood: Record<string, string> = {
    'радостно': 'happy',
    'грустно': 'sad',
    'устал': 'tired',
    'злюсь': 'angry',
    'спокойно': 'calm',
  };

  private apiToUiMood: Record<string, string> = {
    'happy': 'радостно',
    'sad': 'грустно',
    'tired': 'устал',
    'angry': 'злюсь',
    'calm': 'спокойно',
  };

  private buildParams(filters?: MoodFilters): HttpParams {
    let params = new HttpParams();

    if (!filters) return params;

    if (filters.mood) {
      const apiMood = this.uiToApiMood[filters.mood] ?? filters.mood;
      params = params.set('mood', apiMood);
    }

    if (filters.intensity) {
      params = params.set('intensity', filters.intensity);
    }

    if (filters.date_from) {
      params = params.set('date_from', filters.date_from);
    }

    if (filters.date_to) {
      params = params.set('date_to', filters.date_to);
    }

    return params;
  }

  constructor(private http: HttpClient) {}

  getStats(filters?: MoodFilters) {
    return this.http.get<MoodStats>('http://127.0.0.1:8000/api/auth/moods/stats/', {
      params: this.buildParams(filters)
    });
  }

  getRecommendation(mood: string): MoodEntry {
    const meta = MOODS.find(m => m.key === mood)!;
    const rec = RECS[mood] ?? {};
    const tips = rec.tips ? [...rec.tips].sort(() => Math.random() - 0.5).slice(0, 3) : [];

    return {
      mood,
      emoji: meta.emoji,
      color: meta.color,
      note: '',
      intensity: 5,
      music: rec.music,
      movie: rec.movie,
      tips
    };
  }

  saveMood(entry: MoodEntry) {
    const apiMood = this.uiToApiMood[entry.mood] ?? entry.mood;

    return this.http.post<ApiMoodEntry>(this.apiUrl, {
      mood: apiMood,
      note: entry.note,
      intensity: entry.intensity ?? 5,
      music: entry.music ?? '',
      movie: entry.movie ?? ''
    }).pipe(
      map(apiEntry => this.fromApi(apiEntry))
    );
  }

  getHistory(filters?: MoodFilters) {
    return this.http.get<ApiMoodEntry[]>(this.apiUrl, {
      params: this.buildParams(filters)
    }).pipe(
      map(entries => entries.map(entry => this.fromApi(entry))),
      catchError(() => of(this.getLocalHistory()))
    );
  }

  deleteMood(id: number) {
    return this.http.delete(`${this.apiUrl}${id}/`).pipe(
      catchError(() => of(null))
    );
  }

  updateProfile(data: { username: string; email: string; bio: string }) {
    return this.http.patch('http://127.0.0.1:8000/api/auth/profile/', data).pipe(
      catchError(err => { throw err; })
    );
  }

  clearHistory() {
    return this.http.delete('http://127.0.0.1:8000/api/auth/moods/clear/');
  }

  saveLocal(entry: MoodEntry) {
    const hist = this.getLocalHistory();
    const e = { ...entry, id: Date.now(), createdAt: new Date().toISOString() };
    hist.unshift(e);
    localStorage.setItem('mood_history', JSON.stringify(hist.slice(0, 50)));
    return e;
  }

  getLocalHistory(): MoodEntry[] {
    const s = localStorage.getItem('mood_history');
    return s ? JSON.parse(s) : [];
  }

  deleteLocal(id: number) {
    const hist = this.getLocalHistory().filter(e => e.id !== id);
    localStorage.setItem('mood_history', JSON.stringify(hist));
  }

  private fromApi(entry: ApiMoodEntry): MoodEntry {
    const uiMood = this.apiToUiMood[entry.mood] ?? entry.mood;
    const meta = MOODS.find(m => m.key === uiMood);

    return {
      id: entry.id,
      mood: uiMood,
      emoji: meta?.emoji ?? '🙂',
      color: meta?.color ?? '#999999',
      note: entry.note ?? '',
      intensity: entry.intensity ?? 5,
      music: entry.music ?? '',
      movie: entry.movie ?? '',
      tips: RECS[uiMood]?.tips ? [...RECS[uiMood]!.tips!] : [],
      createdAt: entry.created_at
    };
  }
}