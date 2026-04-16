import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoodService, MoodEntry, MOODS } from '../../services/mood.service';

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

  filterMoodVal = '';
  searchNoteVal = '';
  deleteMessage = '';

  moods = [{ key: '', label: 'All', emoji: '', color: '' }, ...MOODS];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.moodService.getHistory().subscribe({
      next: data => {
        const local = this.moodService.getLocalHistory();
        const merged = [...data, ...local].filter(
          (v, i, a) => a.findIndex(x => x.id === v.id) === i
        );

        const finalData = merged.length ? merged : local;

        this.all.set(finalData);
        this.filtered.set(finalData);
        this.loading.set(false);
      },
      error: () => {
        const local = this.moodService.getLocalHistory();
        this.all.set(local);
        this.filtered.set(local);
        this.loading.set(false);
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
      next: () => {},
      error: () => {}
    });

    this.moodService.deleteLocal(entry.id);

    this.all.update(arr => arr.filter(e => e.id !== entry.id));
    this.filtered.update(arr => arr.filter(e => e.id !== entry.id));

    this.deleteMessage = 'Entry deleted';
    setTimeout(() => {
      this.deleteMessage = '';
    }, 2000);
  }

  getMoodMeta(key: string) {
    return MOODS.find(m => m.key === key);
  }

  moodCounts() {
    return MOODS.map(m => ({
      ...m,
      count: this.all().filter(e => e.mood === m.key).length
    })).filter(m => m.count > 0);
  }

  getIntensityLabel(value?: number): string {
    const intensity = value ?? 5;

    if (intensity <= 3) return 'Low';
    if (intensity <= 7) return 'Medium';
    return 'High';
  }
}