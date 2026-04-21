import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService, MoodEntry, MoodStats, MOODS } from '../../services/mood.service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  all = signal<MoodEntry[]>([]);
  filtered = signal<MoodEntry[]>([]);
  loading = signal(true);
  error = signal('');

  stats = signal<MoodStats>({
    happy: 0,
    sad: 0,
    tired: 0,
    angry: 0,
    calm: 0,
    total: 0
  });

  filterMoodVal = '';
  searchNoteVal = '';
  deleteMessage = '';

  chart: Chart | null = null;

  moods = [{ key: '', label: 'All', emoji: '', color: '' }, ...MOODS];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.moodService.getHistory().subscribe({
      next: data => {
        this.all.set(data);
        this.filtered.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load history');
        this.loading.set(false);
      }
    });

    this.moodService.getStats().subscribe({
      next: data => {
        this.stats.set(data);

        setTimeout(() => {
          this.createChart();
        }, 100);
      },
      error: () => {
        console.error('Failed to load stats');
      }
    });
  }

  applyFilter() {
    let result = this.all();

    if (this.filterMoodVal) {
      result = result.filter(e => e.mood === this.filterMoodVal);
    }

    if (this.searchNoteVal.trim()) {
      result = result.filter(e =>
        e.note?.toLowerCase().includes(this.searchNoteVal.toLowerCase())
      );
    }

    this.filtered.set(result);
  }

  clearFilters() {
    this.filterMoodVal = '';
    this.searchNoteVal = '';
    this.filtered.set(this.all());
  }

  deleteEntry(entry: MoodEntry) {
    if (!entry.id) return;

    const ok = confirm('Delete this mood entry?');
    if (!ok) return;

    this.moodService.deleteMood(entry.id).subscribe({
      next: () => {
        this.all.update(arr => arr.filter(e => e.id !== entry.id));
        this.filtered.update(arr => arr.filter(e => e.id !== entry.id));

        this.deleteMessage = 'Entry deleted';
        setTimeout(() => {
          this.deleteMessage = '';
        }, 2000);

        this.moodService.getStats().subscribe({
          next: data => {
            this.stats.set(data);
            this.createChart();
          }
        });
      },
      error: () => {
        this.deleteMessage = 'Failed to delete';
      }
    });
  }

  getMoodMeta(key: string) {
    return MOODS.find(m => m.key === key);
  }

  backendMoodCounts() {
    const s = this.stats();

    return [
      { key: 'радостно', label: 'Happy', emoji: '😄', color: '#f6d860', count: s.happy },
      { key: 'грустно', label: 'Sad', emoji: '😢', color: '#60a5fa', count: s.sad },
      { key: 'устал', label: 'Tired', emoji: '😴', color: '#a78bfa', count: s.tired },
      { key: 'злюсь', label: 'Angry', emoji: '😠', color: '#f87171', count: s.angry },
      { key: 'спокойно', label: 'Calm', emoji: '😌', color: '#34d399', count: s.calm },
    ].filter(m => m.count > 0);
  }

  createChart() {
    const s = this.stats();

    const data = [
      s.happy,
      s.sad,
      s.tired,
      s.angry,
      s.calm
    ];

    const labels = ['Happy', 'Sad', 'Tired', 'Angry', 'Calm'];

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('moodChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              '#fdd554', 
              '#64B5F6', 
              '#9575CD', 
              '#FF7043', 
              '#81C784'  
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  getIntensityLabel(value?: number): string {
    const intensity = value ?? 5;

    if (intensity <= 3) return 'Low';
    if (intensity <= 7) return 'Medium';
    return 'High';
  }
}