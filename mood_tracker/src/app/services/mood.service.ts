import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export interface MoodEntry {
  id?: number;
  mood: string;
  emoji: string;
  note: string;
  color: string;
  music?: string;
  movie?: string;
  tips?: string[];
  createdAt?: string;
}

export const MOODS = [
  { key: 'радостно',  label: 'Happy',  emoji: '😄', color: '#f6d860', bg: 'rgba(246,216,96,0.12)' },
  { key: 'грустно',  label: 'Sad',   emoji: '😢', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)' },
  { key: 'устал',    label: 'Tired',     emoji: '😴', color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  { key: 'злюсь',    label: 'Angry',     emoji: '😠', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  { key: 'спокойно', label: 'Calm',  emoji: '😌', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
];

const RECS: Record<string, Partial<MoodEntry>> = {
  радостно: { music: 'https://open.spotify.com/playlist/3dnXGas4EgEYxlphPZT6zF?si=7d17e57ca2a8445a', movie: 'https://www.imdb.com/title/tt2096673/', tips: ['Share some positivity with your friends 🌞','Do something nice for someone 💌','Capture this moment!','Continue the day with a smile 😁'] },
  грустно:  { music: 'https://open.spotify.com/playlist/37i9dQZF1EIg85EO6f7KwU?si=519db17a5ffc4c85', movie: 'https://www.imdb.com/title/tt1675434/', tips: ['Listen to your favorite music 🎧', 'Call a friend ☎️', 'Go for a walk 🌳', 'Watch something inspiring ✨'] },
  устал:    { music: 'https://open.spotify.com/playlist/0Lo31VIQiOvkX8NL1TEiXa?si=e47c15e021864192', movie: 'https://www.imdb.com/title/tt2948372/', tips: ['Take a break and drink some water 💧', 'Close your eyes for a couple of minutes 💤', 'Just do nothing - thats okay 😎', 'Get some fresh air 🌿'] },
  злюсь:    { music: 'https://open.spotify.com/playlist/2ixTs55cUKl0UoCNHd8JcO?si=a982139b85e74c92', movie: 'https://www.imdb.com/title/tt0108052/', tips: ['Take 10 deep breaths 🌬️','Write down whats making you angry ✍️','Go for a brisk walk 🚶','Talk to someone you trust 💬'] },
  спокойно: { music: 'https://open.spotify.com/playlist/37i9dQZF1EIfTmpqlGn32s?si=63e669f1abda408b', movie: 'https://www.imdb.com/title/tt0317219/', tips: ['Meditate for 5 minutes 🧘', 'Read a book 📖', 'Engage in creative activities 🎨', 'Enjoy some quiet time ☕'] },
};

@Injectable({ providedIn: 'root' })
export class MoodService {
  private apiUrl = 'https://api.moodtracker.demo/v1';

  constructor(private http: HttpClient) {}

  getRecommendation(mood: string): MoodEntry {
    const meta = MOODS.find(m => m.key === mood)!;
    const rec = RECS[mood] ?? {};
    const tips = rec.tips ? [...rec.tips].sort(() => Math.random() - 0.5).slice(0, 3) : [];
    return { mood, emoji: meta.emoji, color: meta.color, note: '', music: rec.music, movie: rec.movie, tips };
  }

  saveMood(entry: MoodEntry) {
    return this.http.post<MoodEntry>(`${this.apiUrl}/moods`, entry).pipe(
      catchError(() => of(entry))
    );
  }

  getHistory() {
    return this.http.get<MoodEntry[]>(`${this.apiUrl}/moods`).pipe(
      catchError(() => of(this.getLocalHistory()))
    );
  }

  deleteMood(id: number) {
    return this.http.delete(`${this.apiUrl}/moods/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  updateProfile(data: { username: string; email: string; bio: string }) {
    return this.http.patch(`${this.apiUrl}/users/me`, data).pipe(
      catchError(err => { throw err; })
    );
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
}