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
  moods = [{ key: '', label: 'All', emoji: '', color: '' }, ...MOODS];

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.moodService.getHistory().subscribe({
      next: data => {
        const local = this.moodService.getLocalHistory();
        const merged = [...data, ...local].filter((v, i, a) => a.findIndex(x => x.id === v.id) === i);
        this.all.set(merged.length ? merged : local);
        this.filtered.set(this.all());
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
    if (this.filterMoodVal) result = result.filter(e => e.mood === this.filterMoodVal);
    if (this.searchNoteVal) result = result.filter(e => e.note?.toLowerCase().includes(this.searchNoteVal.toLowerCase()));
    this.filtered.set(result);
  }

  clearFilters() {
    this.filterMoodVal = '';
    this.searchNoteVal = '';
    this.filtered.set(this.all());
  }

  deleteEntry(entry: MoodEntry) {
    if (!entry.id) return;
    this.moodService.deleteMood(entry.id).subscribe();
    this.moodService.deleteLocal(entry.id);
    this.all.update(arr => arr.filter(e => e.id !== entry.id));
    this.filtered.update(arr => arr.filter(e => e.id !== entry.id));
  }

  getMoodMeta(key: string) { return MOODS.find(m => m.key === key); }

  moodCounts() {
    return MOODS.map(m => ({
      ...m,
      count: this.all().filter(e => e.mood === m.key).length
    })).filter(m => m.count > 0);
  }
}