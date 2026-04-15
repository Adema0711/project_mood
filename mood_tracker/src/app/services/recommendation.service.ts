import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private data = {
    радостно: {
      message: 'У тебя супер настроение 😄',
      color: '#fff7b2',
      music: '[open.spotify.com](https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH)',
      movie: '[imdb.com](https://www.imdb.com/title/tt2096673/)',
      tips: [
        'Поделись позитивом с друзьями 🌞',
        'Сделай приятное кому-то 💌',
        'Продолжай день с улыбкой 😁',
        'Запиши этот момент — он важен!'
      ]
    },
    грустно: {
      message: 'Не грусти 💙 Все пройдёт!',
      color: '#c3e2ff',
      music: '[open.spotify.com](https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b)',
      movie: '[imdb.com](https://www.imdb.com/title/tt1675434/)',
      tips: [
        'Послушай любимую музыку 🎧',
        'Позвони другу ☎️',
        'Сходи на прогулку 🌳',
        'Посмотри что-то вдохновляющее ✨'
      ]
    },
    устал: {
      message: 'Пора немного расслабиться 😌',
      color: '#dcdcdc',
      music: '[open.spotify.com](https://open.spotify.com/playlist/37i9dQZF1DX2UgsUIg75Vg)',
      movie: '[imdb.com](https://www.imdb.com/title/tt2948372/)',
      tips: [
        'Сделай паузу и попей воды 💧',
        'Закрой глаза на пару минут 💤',
        'Просто ничего не делай — это ок 😎',
        'Погуляй или подыши свежим воздухом 🌿'
      ]
    }
  };

  getRecommendation(mood: string) {
    const rec = this.data[mood as keyof typeof this.data];
    if (!rec) return null;
    const shuffled = [...rec.tips].sort(() => Math.random() - 0.5);
    return { ...rec, tips: shuffled.slice(0, 2) };
  }
}


