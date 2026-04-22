import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MoodService } from '../../services/mood.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  email = '';
  bio = '';
  saving = false;
  saved = false;
  error = '';

  profileHistory: any[] = [];

  constructor(public auth: AuthService, private moodService: MoodService) {
    this.username = auth.currentUser()?.username ?? '';
    this.email = auth.currentUser()?.email ?? '';
    this.bio = auth.currentUser()?.bio ?? '';
  }

  ngOnInit() {
    this.loadProfileHistory();
  }

  get initials() {
    const u = this.auth.currentUser();
    return u ? u.username.slice(0, 2).toUpperCase() : '??';
  }

  get streak() {
    if (!this.profileHistory.length) return 0;

    const uniqueDates = [...new Set(
      this.profileHistory.map(entry =>
        new Date(entry.createdAt || entry.created_at).toDateString()
      )
    )]
      .map(date => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime());

    if (!uniqueDates.length) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const latest = new Date(uniqueDates[0]);
    latest.setHours(0, 0, 0, 0);

    const diffFromToday = (today.getTime() - latest.getTime()) / 86400000;

    if (diffFromToday > 1) return 0;

    let streak = 1;

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const current = new Date(uniqueDates[i]);
      const next = new Date(uniqueDates[i + 1]);

      current.setHours(0, 0, 0, 0);
      next.setHours(0, 0, 0, 0);

      const diffDays = (current.getTime() - next.getTime()) / 86400000;

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  loadProfileHistory() {
    this.moodService.getHistory().subscribe({
      next: (data: any[]) => {
        this.profileHistory = data || [];
      },
      error: () => {
        this.profileHistory = [];
      }
    });
  }

  saveProfile() {
    this.error = '';
    this.saved = false;

    if (!this.username || !this.email) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.saving = true;

    this.moodService.updateProfile({
      username: this.username,
      email: this.email,
      bio: this.bio
    }).subscribe({
      next: (res: any) => this.onSaved(res),
      error: (err) => {
        this.saving = false;

        if (err?.error?.email) {
          this.error = err.error.email[0];
        } else if (err?.error?.username) {
          this.error = err.error.username[0];
        } else {
          this.error = 'Failed to save profile';
        }
      }
    });
  }

  private onSaved(res: any) {
    const updated = {
      id: res.id,
      username: res.username,
      email: res.email,
      bio: res.bio ?? ''
    };

    localStorage.setItem('current_user', JSON.stringify(updated));
    this.auth.currentUser.set(updated);

    this.username = updated.username;
    this.email = updated.email;
    this.bio = updated.bio ?? '';

    this.saving = false;
    this.saved = true;

    setTimeout(() => this.saved = false, 3000);
  }

  clearHistory() {
    if (!confirm('Delete all mood history?')) return;

    this.moodService.clearHistory().subscribe({
      next: () => {
        this.profileHistory = [];
        alert('History cleared');
      },
      error: () => {
        this.error = 'Failed to clear history';
      }
    });
  }
}