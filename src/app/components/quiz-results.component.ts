import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import type { QuizQuestion } from '../../types/quiz';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl mb-8">
      <!-- Trophy Header -->
      <div class="text-center space-y-3 mb-8">
        <div class="inline-flex p-4 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/10">
          <app-icon name="trophy" className="w-12 h-12" />
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Kết Quả Kiểm Tra Trắc Nghiệm
        </h2>
        <div
          [class]="rank.bg + ' ' + rank.color"
          class="inline-block px-4 py-1.5 rounded-full text-xs font-bold border"
        >
          {{ rank.title }}
        </div>
        <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          {{ rank.desc }}
        </p>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p class="text-[11px] text-slate-400 font-medium">Điểm số</p>
          <p class="text-3xl font-extrabold text-white mt-1 font-mono">{{ percentage }}%</p>
        </div>

        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p class="text-[11px] text-slate-400 font-medium">Số câu đúng</p>
          <p class="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
            {{ correctCount }}/{{ questions.length }}
          </p>
        </div>

        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p class="text-[11px] text-slate-400 font-medium">Số câu sai</p>
          <p class="text-3xl font-extrabold text-rose-400 mt-1 font-mono">{{ incorrectCount }}</p>
        </div>

        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p class="text-[11px] text-slate-400 font-medium">Chưa trả lời</p>
          <p class="text-3xl font-extrabold text-slate-500 mt-1 font-mono">{{ unansweredCount }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          (click)="retake.emit()"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
        >
          <app-icon name="rotate-ccw" className="w-4 h-4" />
          <span>Làm lại đề thi</span>
        </button>

        <button
          (click)="switchToPractice.emit()"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <app-icon name="book-open" className="w-4 h-4" />
          <span>Xem lại lời giải chi tiết</span>
        </button>

        @if (hasNextMilestone) {
          <button
            (click)="nextMilestone.emit()"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <span>Sang chặng kế tiếp</span>
            <app-icon name="arrow-right" className="w-4 h-4" />
          </button>
        }
      </div>
    </div>
  `
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

