import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { QuizProgressService } from '../services/quiz-progress.service';
import { MILESTONES_DATA } from '../../data/milestones-data';
import { MODULE_CATEGORIES } from '../../data/modules-data';
import type { Milestone, ModuleCategory, SubTopic, QuizQuestion } from '../../types/quiz';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <aside class="w-80 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none">
      <!-- Brand Header -->
      <div class="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
          <app-icon name="terminal" className="w-5 h-5" />
        </div>
        <div>
          <h1 class="text-base font-bold text-white leading-tight flex items-center gap-1.5">
            Java Ticket Quiz
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">
              Angular SSR
            </span>
          </h1>
          <p class="text-xs text-slate-400 truncate">Hệ thống trắc nghiệm kiến thức</p>
        </div>
      </div>

      <!-- Mode Navigation Tabs -->
      <div class="p-3 border-b border-slate-800 bg-slate-900/50">
        <div class="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80">
          <button
            (click)="onSelectCategory('milestone')"
            [class]="quizService.selectedCategory() === 'milestone'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'"
            class="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            <app-icon name="graduation-cap" className="w-3.5 h-3.5" />
            <span>6 Chặng Thực Chiến</span>
          </button>

          <button
            (click)="onSelectCategory('module')"
            [class]="quizService.selectedCategory() === 'module'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'"
            class="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md text-xs font-semibold transition-all cursor-pointer"
          >
            <app-icon name="book-open" className="w-3.5 h-3.5" />
            <span>12 Chuyên Đề</span>
          </button>
        </div>
      </div>

      <!-- Nav List with custom scrollbar -->
      <div class="flex-1 overflow-y-auto p-3 space-y-1.5">
        @if (quizService.selectedCategory() === 'milestone') {
          <div>
            <div class="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Lộ Trình Ticket Station</span>
              <span class="text-[10px] text-indigo-400 lowercase font-mono">6 milestones</span>
            </div>

            <div class="space-y-1 mt-1">
              @for (milestone of milestones; track milestone.id) {
                @let stats = getStats(milestone.questions);
                @let isActive = quizService.activeId() === milestone.id;

                <button
                  (click)="onSelectMilestone(milestone.id)"
                  [class]="isActive
                    ? 'bg-gradient-to-r from-indigo-950/80 to-slate-850 border-indigo-500/40 text-white shadow-md shadow-indigo-950/40'
                    : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'"
                  class="w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group relative border cursor-pointer"
                >
                  <!-- Order icon badge -->
                  <div
                    [class]="isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : stats.isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'"
                    class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold transition-colors"
                  >
                    @if (stats.isCompleted) {
                      <app-icon name="check-circle-2" className="w-4 h-4 text-emerald-400" />
                    } @else {
                      <app-icon [name]="milestone.iconName" className="w-4 h-4" />
                    }
                  </div>

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1 mb-1">
                      <span
                        [class]="isActive ? 'text-indigo-300 font-bold' : 'text-slate-200'"
                        class="text-xs font-semibold truncate"
                      >
                        {{ milestone.shortTitle }}
                      </span>
                      <app-icon
                        name="chevron-right"
                        [className]="'w-3.5 h-3.5 shrink-0 transition-transform ' + (isActive ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100')"
                      />
                    </div>

                    <div class="flex items-center justify-between text-[11px] text-slate-400">
                      <span class="flex items-center gap-1 font-mono">
                        {{ stats.answered }}/{{ stats.total }} câu
                      </span>
                      @if (stats.answered > 0) {
                        <span
                          [class]="stats.percentage >= 80 ? 'text-emerald-400' : stats.percentage >= 50 ? 'text-amber-400' : 'text-rose-400'"
                          class="font-semibold"
                        >
                          {{ stats.percentage }}% đúng
                        </span>
                      }
                    </div>

                    <!-- Mini Progress Bar -->
                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        [class]="stats.percentage >= 80 ? 'bg-emerald-500' : stats.percentage >= 50 ? 'bg-amber-500' : 'bg-indigo-500'"
                        class="h-full transition-all duration-300"
                        [style.width.%]="stats.total > 0 ? (stats.answered / stats.total) * 100 : 0"
                      ></div>
                    </div>
                  </div>
                </button>
              }
            </div>
          </div>
        } @else {
          <div>
            <div class="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>12 Chuyên Đề Roadmap</span>
              <span class="text-[10px] text-indigo-400 lowercase font-mono">12 topics</span>
            </div>

            <div class="space-y-1 mt-1">
              @for (mod of moduleCategories; track mod.id) {
                @let hasSubTopics = !!(mod.subTopics && mod.subTopics.length > 0);
                @let hasActiveSub = isSubActiveForMod(mod);
                @let isCurrentActive = quizService.activeId() === mod.id || hasActiveSub;
                @let isExpanded = isModExpanded(mod.id) || hasActiveSub;
                @let stats = getStats(mod.questions);

                <div class="rounded-xl overflow-hidden">
                  <button
                    (click)="handleModuleClick(mod)"
                    [class]="isCurrentActive
                      ? 'bg-slate-800/90 border-slate-700 text-white shadow-md shadow-black/40'
                      : 'border-transparent text-slate-300 hover:bg-slate-800/50 hover:text-white'"
                    class="w-full text-left p-3 transition-all flex items-center gap-3 group border rounded-xl cursor-pointer"
                  >
                    <!-- Left Chevron down/right icon -->
                    @if (hasSubTopics) {
                      <app-icon
                        name="chevron-down"
                        [className]="'w-4 h-4 shrink-0 transition-transform duration-200 ' + (isExpanded ? 'text-slate-300' : '-rotate-90 text-slate-500')"
                      />
                    } @else {
                      <app-icon
                        name="chevron-right"
                        [className]="'w-4 h-4 shrink-0 transition-transform duration-200 ' + (isCurrentActive ? 'text-indigo-400 rotate-90' : 'text-slate-500 group-hover:text-slate-300')"
                      />
                    }

                    <!-- Middle: MODULE Code (upper) + Module Name (lower bold) -->
                    <div class="flex-1 min-w-0 pr-1">
                      <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5 font-mono">
                        MODULE {{ mod.code }}
                      </div>
                      <div
                        [class]="isCurrentActive ? 'text-slate-100 font-extrabold' : 'text-slate-100 group-hover:text-white'"
                        class="text-sm font-bold tracking-tight truncate leading-snug transition-colors"
                      >
                        {{ mod.name }}
                      </div>
                    </div>

                    <!-- Right: Circular progress / status ring -->
                    <div class="shrink-0 flex items-center justify-center">
                      @if (stats.isCompleted) {
                        <app-icon name="check-circle-2" className="w-5 h-5 text-emerald-400" />
                      } @else if (stats.answered > 0) {
                        <div class="relative w-5 h-5 flex items-center justify-center">
                          <svg class="w-5 h-5 -rotate-90" viewBox="0 0 24 24">
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              class="stroke-slate-800 fill-none stroke-[2.5]"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              class="stroke-teal-500 fill-none stroke-[2.5] transition-all duration-300"
                              [attr.stroke-dasharray]="circleCircumference"
                              [attr.stroke-dashoffset]="getCircleDashOffset(stats.answered, stats.total)"
                              stroke-linecap="round"
                            />
                          </svg>
                          <span class="absolute text-[8px] font-mono text-teal-300 font-bold">
                            {{ stats.answered }}
                          </span>
                        </div>
                      } @else {
                        <div class="w-5 h-5 rounded-full border-2 border-slate-700/90 group-hover:border-slate-500 transition-colors"></div>
                      }
                    </div>
                  </button>

                  <!-- Sub-topics list -->
                  @if (hasSubTopics && isExpanded) {
                    <div class="mt-0.5 space-y-0.5 border-t border-slate-800/40">
                      @for (sub of mod.subTopics!; track sub.id) {
                        @let isSubActive = quizService.activeId() === sub.id;
                        @let subStats = getStats(sub.questions);

                        <button
                          (click)="onSelectSubTopic(sub.id)"
                          [class]="isSubActive
                            ? 'bg-[#0c2622] border-r-2 border-[#14b8a6]'
                            : 'hover:bg-slate-800/40'"
                          class="w-full text-left py-2.5 px-3 transition-all flex items-start gap-3 group relative cursor-pointer"
                        >
                          <!-- Left Circle indicator -->
                          <div class="shrink-0 mt-0.5">
                            @if (subStats.isCompleted) {
                              <app-icon name="check-circle-2" className="w-4 h-4 text-emerald-400" />
                            } @else if (isSubActive) {
                              <div class="w-4 h-4 rounded-full border-2 border-[#2dd4bf] flex items-center justify-center">
                                <div class="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]"></div>
                              </div>
                            } @else {
                              <div class="w-4 h-4 rounded-full border-2 border-slate-700 group-hover:border-slate-500 transition-colors"></div>
                            }
                          </div>

                          <!-- Title and Duration -->
                          <div class="flex-1 min-w-0">
                            <p
                              [class]="isSubActive ? 'text-[#2dd4bf] font-medium' : 'text-slate-300 group-hover:text-slate-100'"
                              class="text-[13px] leading-snug line-clamp-2"
                            >
                              {{ sub.title }}
                            </p>
                            <span
                              [class]="isSubActive ? 'text-teal-400/80 font-medium' : 'text-slate-500'"
                              class="text-[11px] block mt-1"
                            >
                              {{ sub.readDuration }}
                            </span>
                          </div>
                        </button>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Bottom Overall Statistics Card -->
      <div class="p-3 border-t border-slate-800 bg-slate-950/80">
        <div class="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-semibold text-slate-400">Tiến độ tổng thể</span>
            <span class="text-xs font-bold text-indigo-400 font-mono">
              {{ quizService.overallStats().answeredCount }}/{{ quizService.overallStats().totalQuestions }}
              ({{ overallProgressPercentage() }}%)
            </span>
          </div>

          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              class="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
              [style.width.%]="overallProgressPercentage()"
            ></div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-center text-[11px]">
            <div class="bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/50">
              <p class="text-slate-400 text-[10px]">Độ chính xác</p>
              <p class="font-bold text-emerald-400 text-xs">{{ quizService.overallStats().accuracy }}%</p>
            </div>
            <div class="bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/50">
              <p class="text-slate-400 text-[10px]">Đã đánh dấu</p>
              <p class="font-bold text-amber-400 text-xs">{{ quizService.overallStats().totalBookmarks }} câu</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  readonly quizService = inject(QuizProgressService);
  @Output() navigate = new EventEmitter<void>();

  readonly milestones = MILESTONES_DATA;
  readonly moduleCategories = MODULE_CATEGORIES;

  readonly expandedModuleIds = signal<string[]>(['module-02']);
  readonly circleCircumference = 2 * Math.PI * 9;

  getStats(questions: QuizQuestion[]) {
    return this.quizService.getCategoryStats(questions);
  }

  isSubActiveForMod(mod: ModuleCategory): boolean {
    const active = this.quizService.activeId();
    return Boolean(mod.subTopics?.some((s) => s.id === active));
  }

  isModExpanded(modId: string): boolean {
    return this.expandedModuleIds().includes(modId);
  }

  getCircleDashOffset(answered: number, total: number): number {
    const ratio = total > 0 ? answered / total : 0;
    return this.circleCircumference * (1 - ratio);
  }

  overallProgressPercentage(): number {
    const stats = this.quizService.overallStats();
    return stats.totalQuestions > 0 ? Math.round((stats.answeredCount / stats.totalQuestions) * 100) : 0;
  }

  onSelectCategory(cat: 'milestone' | 'module') {
    this.quizService.setSelectedCategory(cat);
    if (cat === 'milestone') {
      this.quizService.setActiveId(MILESTONES_DATA[0].id);
    } else {
      this.quizService.setActiveId(MODULE_CATEGORIES[0].id);
    }
    this.navigate.emit();
  }

  onSelectMilestone(id: string) {
    this.quizService.setActiveId(id);
    this.navigate.emit();
  }

  handleModuleClick(mod: ModuleCategory) {
    const hasSubTopics = Boolean(mod.subTopics && mod.subTopics.length > 0);
    const hasActiveSub = this.isSubActiveForMod(mod);

    if (hasSubTopics) {
      this.expandedModuleIds.update((prev) =>
        prev.includes(mod.id) ? prev.filter((id) => id !== mod.id) : [...prev, mod.id]
      );
      if (!hasActiveSub) {
        this.quizService.setActiveId(mod.subTopics![0].id);
        this.navigate.emit();
      }
    } else {
      this.quizService.setActiveId(mod.id);
      this.navigate.emit();
    }
  }

  onSelectSubTopic(subId: string) {
    this.quizService.setActiveId(subId);
    this.navigate.emit();
  }
}

