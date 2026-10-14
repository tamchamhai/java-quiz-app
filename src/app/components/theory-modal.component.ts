import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import type { Milestone, ModuleCategory } from '../../types/quiz';

@Component({
  selector: 'app-theory-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <app-icon name="book-open" className="w-5 h-5" />
              </div>
              <div>
                <span class="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                  {{ isMilestone ? 'Giáo Án Thực Chiến Ticket Station' : 'Chuyên Đề Roadmap' }}
                </span>
                <h3 class="text-lg font-bold text-white">
                  {{ category.title }}
                </h3>
              </div>
            </div>

            <button
              (click)="close.emit()"
              class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <app-icon name="x" className="w-5 h-5" />
            </button>
          </div>

          <!-- Content body -->
          <div class="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
            <!-- Method section -->
            @if (isMilestone) {
              <div class="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <div class="flex items-center gap-2 text-indigo-300 font-bold mb-1">
                  <app-icon name="flame" className="w-4 h-4 text-amber-400" />
                  <span>Phương Pháp Thực Chiến: "Đọc 20% – Phá 30% – Xây 50%"</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">
                  {{ asMilestone.description }}
                </p>
              </div>
            }

            <!-- Reference doc path -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Vị trí tài liệu trong dự án
              </h4>
              <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-400 break-all flex items-center justify-between gap-2">
                <span>
                  C:\\__project_fullstack\\ticket-station-app\\java-knownledge\\roadmap\\{{ isMilestone ? asMilestone.referenceDoc : asModule.folderPath }}
                </span>
              </div>
            </div>

            <!-- Key Topics Covered -->
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Các bài học trọng tâm cần nắm
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                @for (q of category.questions; track q.id; let idx = $index) {
                  <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-md bg-slate-800 text-slate-400 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {{ idx + 1 }}
                    </span>
                    <div class="min-w-0">
                      <p class="text-xs font-medium text-slate-200 line-clamp-2">
                        {{ q.title }}
                      </p>
                      <div class="flex items-center gap-1.5 mt-1">
                        @for (t of q.tags.slice(0, 2); track t) {
                          <span class="text-[10px] text-slate-500 font-mono">
                            #{{ t }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
            <button
              (click)="close.emit()"
              class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Đã hiểu, quay lại làm bài
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class TheoryModalComponent {
  @Input() isOpen = false;
  @Input({ required: true }) category!: Milestone | ModuleCategory;
  @Output() close = new EventEmitter<void>();

  get isMilestone(): boolean {
    return 'learningRatio' in this.category;
  }

  get asMilestone(): Milestone {
    return this.category as Milestone;
  }

  get asModule(): ModuleCategory {
    return this.category as ModuleCategory;
  }
}

