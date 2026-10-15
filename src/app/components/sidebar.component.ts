import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { QuizProgressService } from '../services/quiz-progress.service';
import { MILESTONES_DATA } from '../../data/milestones-data';
import { MODULE_CATEGORIES } from '../../data/modules-data';
import type { ModuleCategory, QuizQuestion } from '../../types/quiz';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
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
