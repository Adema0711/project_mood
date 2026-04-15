import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationService } from './services/recommendation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  moods = ['радостно', 'грустно', 'устал'];
  selectedMood = '';
  rec: any = null;
  moodStats: { [key: string]: number } = {}; // счётчик

  constructor(private recService: RecommendationService, private renderer: Renderer2) {
    this.loadStats();
  }

  chooseMood(mood: string) {
    this.selectedMood = mood;
    this.rec = this.recService.getRecommendation(mood);
    this.updateStats(mood);

    if (this.rec?.color) {
      this.renderer.setStyle(document.body, 'backgroundColor', this.rec.color);
    }
  }

  refreshTips() {
    if (this.selectedMood) {
      this.rec = this.recService.getRecommendation(this.selectedMood);
    }
  }

  private updateStats(mood: string) {
    this.moodStats[mood] = (this.moodStats[mood] || 0) + 1;
    localStorage.setItem('moodStats', JSON.stringify(this.moodStats));
  }

  private loadStats() {
    const stored = localStorage.getItem('moodStats');
    this.moodStats = stored ? JSON.parse(stored) : {};
  }
}







