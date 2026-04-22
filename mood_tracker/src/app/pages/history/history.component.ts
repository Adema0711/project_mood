import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService, MoodEntry, MoodStats, MoodFilters, MOODS } from '../../services/mood.service';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

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
  filterIntensityVal = '';
  dateFromVal = '';
  dateToVal = '';

  chart: Chart | null = null;

  moods = [{ key: '', label: 'All', emoji: '', color: '' }, ...MOODS];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.loadData();
  }

  applyFilter() {
    let result = this.all();

    if (this.searchNoteVal.trim()) {
      result = result.filter(e =>
        e.note?.toLowerCase().includes(this.searchNoteVal.toLowerCase())
      );
    }

    this.filtered.set(result);
  }

  clearFilters() {
    this.filterMoodVal = '';
    this.filterIntensityVal = '';
    this.dateFromVal = '';
    this.dateToVal = '';
    this.searchNoteVal = '';
    this.loadData();
  }

  showBanner(message: string) {
    this.deleteMessage = message;

    setTimeout(() => {
      this.deleteMessage = '';
    }, 2200);
  }

  deleteEntry(entry: MoodEntry) {
    if (!entry.id) return;

    const ok = confirm('Delete this mood entry?');
    if (!ok) return;

    this.moodService.deleteMood(entry.id).subscribe({
      next: () => {
        this.showBanner('Entry deleted 🗑');
        this.loadData();
      },
      error: () => {
        this.showBanner('Failed to delete entry');
      }
    });
  }

  getMoodMeta(key: string) {
    return MOODS.find(m => m.key === key);
  }

  backendMoodCounts() {
    const s = this.stats();

    return [
      { key: 'happy', label: 'Happy', emoji: '😄', color: '#f6d860', count: s.happy },
      { key: 'sad', label: 'Sad', emoji: '😢', color: '#60a5fa', count: s.sad },
      { key: 'tired', label: 'Tired', emoji: '😴', color: '#a78bfa', count: s.tired },
      { key: 'angry', label: 'Angry', emoji: '😠', color: '#f87171', count: s.angry },
      { key: 'calm', label: 'Calm', emoji: '😌', color: '#34d399', count: s.calm }
    ].filter(m => m.count > 0);
  }

  createChart() {
    const s = this.stats();

    const labels = ['Happy', 'Sad', 'Tired', 'Angry', 'Calm'];
    const data = [s.happy, s.sad, s.tired, s.angry, s.calm];
    const total = data.reduce((sum, value) => sum + value, 0);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('moodChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Mood count',
            data,
            backgroundColor: [
              '#FFD54F',
              '#64B5F6',
              '#9575CD',
              '#FF7043',
              '#81C784'
            ],
            borderColor: [
              '#FBC02D',
              '#42A5F5',
              '#7E57C2',
              '#F4511E',
              '#66BB6A'
            ],
            borderWidth: 1,
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 35
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = Number(context.raw ?? 0);
                const percent = total ? ((value / total) * 100).toFixed(1) : '0.0';
                return `${value} entries (${percent}%)`;
              }
            }
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: '#444',
            font: {
              weight: 'bold',
              size: 12
            },
            formatter: (value: number) => {
              if (value === 0) return '';
              const percent = total ? ((value / total) * 100).toFixed(1) : '0';
              return `${percent}%`;
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
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

  loadData() {
    const filters: MoodFilters = {
      mood: this.filterMoodVal || undefined,
      intensity: this.filterIntensityVal || undefined,
      date_from: this.dateFromVal || undefined,
      date_to: this.dateToVal || undefined
    };

    this.loading.set(true);
    this.error.set('');

    this.moodService.getHistory(filters).subscribe({
      next: data => {
        this.all.set(data);
        this.applyFilter();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load history');
        this.loading.set(false);
      }
    });

    this.moodService.getStats(filters).subscribe({
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

  shareEntryTelegram(entry: any) {
    const text = this.buildShareText(entry);
    const url = `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  shareEntryWhatsApp(entry: any) {
    const text = this.buildShareText(entry);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  buildShareText(entry: any): string {
    const moodLabel = this.getMoodMeta(entry.mood)?.label || entry.mood;
    const moodEmoji = this.getMoodMeta(entry.mood)?.emoji || '😊';
    const note = entry.note || 'No note';
    const intensity = entry.intensity ?? '-';

    return `✨ Mood update ✨
${moodEmoji} Feeling: ${moodLabel}
🔥 Intensity: ${intensity}/10
📝 Note: ${note}
📊 Shared via MoodTrack`;
  }
}