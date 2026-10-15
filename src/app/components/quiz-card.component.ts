import { Component, Input, Output, EventEmitter, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from './icon.component';
import type { QuizQuestion, QuizMode } from '../../types/quiz';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css'
})
export class QuizCardComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @Input({ required: true }) question!: QuizQuestion;
  @Input({ required: true }) index!: number;
  @Input() selectedOptionIds: string[] = [];
  @Input() isBookmarked = false;
  @Input() mode: QuizMode = 'practice';
  @Input() examSubmitted = false;

  @Output() selectOption = new EventEmitter<string>();
  @Output() toggleBookmark = new EventEmitter<void>();

  copiedCode = false;

  get isAnswered(): boolean {
    return this.selectedOptionIds.length > 0;
  }

  get showFeedback(): boolean {
    return this.mode === 'practice' ? this.isAnswered : this.examSubmitted;
  }

  get correctOptionIds(): string[] {
    return this.question.options.filter((o) => o.isCorrect).map((o) => o.id);
  }

  get isFullyCorrect(): boolean {
    return (
      this.isAnswered &&
      this.selectedOptionIds.length === this.correctOptionIds.length &&
      this.selectedOptionIds.every((id) => this.correctOptionIds.includes(id))
    );
  }

  get containerClass(): string {
    if (this.showFeedback) {
      return this.isFullyCorrect
        ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
        : 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20';
    }
    return 'bg-slate-900/70 border-slate-800 hover:border-slate-700/80 shadow-md';
  }

  isOptionSelected(optionId: string): boolean {
    return this.selectedOptionIds.includes(optionId);
  }

  getOptionLetter(idx: number): string {
    return String.fromCharCode(65 + idx);
  }

  getOptionCardClass(optId: string, isCorrect: boolean): string {
    const isSelected = this.isOptionSelected(optId);

    if (this.showFeedback) {
      if (isCorrect) {
        return 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-medium shadow-sm';
      } else if (isSelected && !isCorrect) {
        return 'bg-rose-950/40 border-rose-500/50 text-rose-200 font-medium';
      } else {
        return 'opacity-60 border-slate-850 bg-slate-950/30 text-slate-400';
      }
    } else if (isSelected) {
      return 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50';
    }
    return 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300';
  }

  getOptionLetterClass(optId: string, isCorrect: boolean): string {
    const isSelected = this.isOptionSelected(optId);

    if (this.showFeedback) {
      if (isCorrect) {
        return 'bg-emerald-600 text-white border-emerald-500';
      } else if (isSelected && !isCorrect) {
        return 'bg-rose-600 text-white border-rose-500';
      }
      return 'bg-slate-800 text-slate-400 border-slate-700';
    } else if (isSelected) {
      return 'bg-indigo-600 text-white border-indigo-400';
    }
    return 'bg-slate-800 text-slate-400 border-slate-700';
  }

  handleCopyCode() {
    if (this.isBrowser && this.question.codeSnippet) {
      navigator.clipboard.writeText(this.question.codeSnippet).then(() => {
        this.copiedCode = true;
        setTimeout(() => (this.copiedCode = false), 2000);
      });
    }
  }
}
