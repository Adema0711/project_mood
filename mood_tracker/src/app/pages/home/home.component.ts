import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoodService, MoodEntry, MOODS } from '../../services/mood.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  moods = MOODS;
  selectedMood = '';
  currentRec: MoodEntry | null = null;
  note = '';
  intensity = 5;
  savedMsg = '';
  errorMsg = '';
  loading = false;

  get greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good day';
    return 'Good evening';
  }

  get today() { return new Date(); }

  constructor(public auth: AuthService, private moodService: MoodService) {}

  chooseMood(moodKey: string) {
    this.selectedMood = moodKey;
    this.currentRec = this.moodService.getRecommendation(moodKey);
    this.savedMsg = '';
    this.errorMsg = '';
  }

  refreshTips() {
    if (!this.selectedMood) return;
    this.currentRec = this.moodService.getRecommendation(this.selectedMood);
  }

  saveMood() {
    if (!this.selectedMood) { this.errorMsg = 'Please select a mood!'; return; }
    const entry: MoodEntry = { ...this.currentRec!, note: this.note, mood: this.selectedMood };
    this.loading = true;
    this.errorMsg = '';

    this.moodService.saveMood(entry).subscribe({
      next: () => {
        this.moodService.saveLocal(entry);
        this.savedMsg = 'Mood saved! ✅';
        this.loading = false;
        this.note = '';
        setTimeout(() => this.savedMsg = '', 3000);
      },
      error: () => {
        this.moodService.saveLocal(entry);
        this.savedMsg = 'Saved locally ✅';
        this.loading = false;
        this.note = '';
        setTimeout(() => this.savedMsg = '', 3000);
      }
    });
  }

  clearSelection() {
    this.selectedMood = '';
    this.currentRec = null;
    this.note = '';
    this.errorMsg = '';
    this.savedMsg = '';
  }

  getMoodMeta(key: string) {
    return this.moods.find(m => m.key === key);
  }
}