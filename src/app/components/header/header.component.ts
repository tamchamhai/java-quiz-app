import { Component, Output, EventEmitter, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { QuizProgressService } from '../../services/quiz-progress.service';
import type { Milestone, ModuleCategory } from '../../../types/quiz';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly quizService = inject(QuizProgressService);
  @Output() openTheory = new EventEmitter<void>();

  get currentCategory(): Milestone | ModuleCategory {
    return this.quizService.currentCategoryData();
  }

  get isMilestone(): boolean {
    return 'learningRatio' in this.currentCategory;
  }

  get asMilestone(): Milestone {
    return this.currentCategory as Milestone;
  }

  get asModule(): ModuleCategory {
    return this.currentCategory as ModuleCategory;
  }

  readonly totalQuestions = computed(() => this.quizService.rawQuestions().length);

  readonly answeredCount = computed(() => {
    const raw = this.quizService.rawQuestions();
    const answers = this.quizService.answers();
    return raw.filter((q) => answers[q.id] && answers[q.id].length > 0).length;
  });

  readonly formattedTime = computed(() => {
    const seconds = this.quizService.examTimeRemaining();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  });

  startExam() {
    if (this.quizService.mode() !== 'exam') {
      this.quizService.startExam();
    }
  }

  setStatusFilter(status: 'all' | 'unanswered' | 'bookmarked' | 'incorrect') {
    this.quizService.setFilter((prev) => ({ ...prev, status }));
  }

  onSearchChange(searchQuery: string) {
    this.quizService.setFilter((prev) => ({ ...prev, searchQuery }));
  }
}
