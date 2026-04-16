import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MoodService, MOODS } from '../../services/mood.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username = '';
  email = '';
  bio = '';
  saving = false;
  saved = false;
  error = '';

  get initials() {
    const u = this.auth.currentUser();
    return u ? u.username.slice(0, 2).toUpperCase() : '??';
  }

  get totalEntries() { return this.moodService.getLocalHistory().length; }

  get dominantMood() {
    const hist = this.moodService.getLocalHistory();
    if (!hist.length) return null;
    const counts: Record<string, number> = {};
    hist.forEach(e => { counts[e.mood] = (counts[e.mood] || 0) + 1; });
    const key = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return MOODS.find(m => m.key === key);
  }

  get streak() {
    const hist = this.moodService.getLocalHistory();
    if (!hist.length) return 0;
    let s = 1;
    const dates = hist.map(e => new Date(e.createdAt!).toDateString());
    const unique = [...new Set(dates)];
    for (let i = 0; i < unique.length - 1; i++) {
      const diff = (new Date(unique[i]).getTime() - new Date(unique[i + 1]).getTime()) / 86400000;
      if (diff <= 1) s++; else break;
    }
    return s;
  }

  constructor(public auth: AuthService, private moodService: MoodService) {
    this.username = auth.currentUser()?.username ?? '';
    this.email = auth.currentUser()?.email ?? '';
  }

  saveProfile() {
    this.error = '';
    if (!this.username || !this.email) { this.error = 'Please fill in all fields'; return; }
    this.saving = true;

    this.moodService.updateProfile({ username: this.username, email: this.email, bio: this.bio }).subscribe({
      next: () => this.onSaved(),
      error: () => this.onSaved()
    });
  }

  private onSaved() {
    const user = this.auth.currentUser();
    if (user) {
      const updated = { ...user, username: this.username, email: this.email };
      localStorage.setItem('current_user', JSON.stringify(updated));
      this.auth.currentUser.set(updated);
    }
    this.saving = false;
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }

  clearHistory() {
    if (!confirm('Delete all mood history?')) return;
    localStorage.removeItem('mood_history');
    alert('History cleared');
  }
}