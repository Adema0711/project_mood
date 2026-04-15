import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mood-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mood-input.component.html',
  styleUrls: ['./mood-input.component.css']
})
export class MoodInputComponent {
  mood = '';

  @Output() moodChange = new EventEmitter<string>();

  onSubmit() {
    this.moodChange.emit(this.mood);
  }
}

