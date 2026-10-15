import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import type { QuizQuestion } from '../../types/quiz';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.css'
})
export class QuizResultsComponent {
  @Input({ required: true }) questions: QuizQuestion[] = [];
  @Input({ required: true }) answers: Record<string, string[]> = {};
  @Input() hasNextMilestone = false;

  @Output() retake = new EventEmitter<void>();
  @Output() switchToPractice = new EventEmitter<void>();
  @Output() nextMilestone = new EventEmitter<void>();

  get stats() {
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    this.questions.forEach((q) => {
      const selected = this.answers[q.id] || [];
      if (selected.length === 0) {
        unansweredCount++;
      } else {
        const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (
          selected.length === correctOptionIds.length &&
          selected.every((id) => correctOptionIds.includes(id))
        ) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const percentage = this.questions.length > 0 ? Math.round((correctCount / this.questions.length) * 100) : 0;
    return { correctCount, incorrectCount, unansweredCount, percentage };
  }

  get correctCount() { return this.stats.correctCount; }
  get incorrectCount() { return this.stats.incorrectCount; }
  get unansweredCount() { return this.stats.unansweredCount; }
  get percentage() { return this.stats.percentage; }

  get rank() {
    if (this.percentage >= 90) {
      return {
        title: 'Xuất sắc! (Senior Ready)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        desc: 'Bạn đã làm chủ hoàn toàn các thách thức kỹ thuật phức tạp của chặng này!',
      };
    } else if (this.percentage >= 70) {
      return {
        title: 'Khá tốt! (Mid-level Ready)',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10 border-indigo-500/30',
        desc: 'Kiến thức cốt lõi đã vững vàng, chỉ cần rà soát thêm một số bẫy kỹ thuật nâng cao.',
      };
    } else {
      return {
        title: 'Cần ôn luyện thêm! (Junior/Learning)',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        desc: 'Hãy chuyển sang Chế độ Luyện tập để xem chi tiết giải thích và đọc lại tài liệu syllabus.',
      };
    }
  }
}
