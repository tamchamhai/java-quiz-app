import { Component, Input, Output, EventEmitter, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from './icon.component';
import type { QuizQuestion, QuizMode } from '../../types/quiz';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div
      [class]="containerClass"
      class="rounded-2xl border transition-all duration-200 overflow-hidden"
    >
      <!-- Question Header -->
      <div class="p-5 pb-3 flex items-start justify-between gap-4">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-xs">
            {{ index + 1 }}
          </span>

          @switch (question.difficulty) {
            @case ('easy') {
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Cơ bản
              </span>
            }
            @case ('hard') {
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Nâng cao
              </span>
            }
            @default {
              <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Trung bình
              </span>
            }
          }

          @for (tag of question.tags; track tag) {
            <span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/50">
              #{{ tag }}
            </span>
          }
        </div>

        <button
          (click)="toggleBookmark.emit()"
          [class]="isBookmarked
            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            : 'text-slate-500 hover:text-slate-300 border-transparent hover:bg-slate-800'"
          class="p-1.5 rounded-lg border transition-all cursor-pointer"
          [title]="isBookmarked ? 'Bỏ đánh dấu' : 'Ghim câu hỏi cần ôn lại'"
        >
          <app-icon name="bookmark" className="w-4 h-4 fill-current" />
        </button>
      </div>

      <!-- Question Title -->
      <div class="px-5 py-2">
        <h3 class="text-base font-semibold text-slate-100 leading-relaxed">
          {{ question.title }}
        </h3>
      </div>

      <!-- Code Snippet Box if available -->
      @if (question.codeSnippet) {
        <div class="px-5 py-2">
          <div class="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 font-mono text-xs">
            <div class="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
              <span class="text-[11px] text-slate-400 flex items-center gap-1.5">
                <app-icon name="code-2" className="w-3.5 h-3.5 text-indigo-400" />
                <span>{{ question.language ? (question.language.toUpperCase() + ' Snippet') : 'Code / Config Snippet' }}</span>
              </span>
              <button
                (click)="handleCopyCode()"
                class="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                @if (copiedCode) {
                  <app-icon name="check" className="w-3.5 h-3.5 text-emerald-400" />
                  <span class="text-emerald-400">Đã chép</span>
                } @else {
                  <app-icon name="copy" className="w-3.5 h-3.5" />
                  <span>Chép mã</span>
                }
              </button>
            </div>
            <pre class="p-4 overflow-x-auto text-indigo-200/90 leading-normal"><code>{{ question.codeSnippet }}</code></pre>
          </div>
        </div>
      }

      <!-- Options List -->
      <div class="p-5 pt-3 space-y-2.5">
        @for (opt of question.options; track opt.id; let optIdx = $index) {
          <button
            (click)="selectOption.emit(opt.id)"
            [class]="getOptionCardClass(opt.id, opt.isCorrect)"
            class="w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-150 cursor-pointer"
          >
            <span
              [class]="getOptionLetterClass(opt.id, opt.isCorrect)"
              class="w-6 h-6 rounded-lg border font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
            >
              {{ getOptionLetter(optIdx) }}
            </span>

            <div class="flex-1 text-sm leading-relaxed">
              <span>{{ opt.text }}</span>
            </div>

            @if (showFeedback) {
              <div class="shrink-0 mt-0.5">
                @if (opt.isCorrect) {
                  <app-icon name="check-circle-2" className="w-5 h-5 text-emerald-400" />
                } @else if (isOptionSelected(opt.id)) {
                  <app-icon name="x-circle" className="w-5 h-5 text-rose-400" />
                }
              </div>
            }
          </button>
        }
      </div>

      <!-- Explanation Box (when revealed) -->
      @if (showFeedback) {
        <div class="px-5 pb-5">
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div class="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wide">
              <app-icon name="lightbulb" className="w-4 h-4 text-amber-400" />
              <span>Giải thích chuyên sâu & phân tích bản chất</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed font-normal whitespace-pre-line">
              {{ question.explanation }}
            </p>

            @if (question.referencePath) {
              <div class="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-indigo-400 font-mono">
                <app-icon name="file-text" className="w-3.5 h-3.5 shrink-0" />
                <span class="truncate">Tài liệu: java-knownledge/roadmap/{{ question.referencePath }}</span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
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

