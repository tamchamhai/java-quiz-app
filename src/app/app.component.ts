import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar.component';
import { HeaderComponent } from './components/header.component';
import { QuizCardComponent } from './components/quiz-card.component';
import { QuizResultsComponent } from './components/quiz-results.component';
import { TheoryModalComponent } from './components/theory-modal.component';
import { IconComponent } from './components/icon.component';
import { QuizProgressService } from './services/quiz-progress.service';
import { MILESTONES_DATA } from '../data/milestones-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    QuizCardComponent,
    QuizResultsComponent,
    TheoryModalComponent,
    IconComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly quizService = inject(QuizProgressService);

  readonly isTheoryOpen = signal<boolean>(false);
  readonly mobileMenuOpen = signal<boolean>(false);

  readonly hasNextMilestone = computed(() => {
    if (this.quizService.selectedCategory() !== 'milestone') return false;
    const currentIdx = MILESTONES_DATA.findIndex((m) => m.id === this.quizService.activeId());
    return currentIdx >= 0 && currentIdx < MILESTONES_DATA.length - 1;
  });

  readonly answeredCount = computed(() => {
    const raw = this.quizService.rawQuestions();
    const answers = this.quizService.answers();
    return raw.filter((q) => answers[q.id] && answers[q.id].length > 0).length;
  });

  getQuestionIndex(questionId: string, fallbackIdx: number): number {
    const raw = this.quizService.rawQuestions();
    const idx = raw.findIndex((q) => q.id === questionId);
    return idx !== -1 ? idx : fallbackIdx;
  }

  handleNextMilestone() {
    const currentIdx = MILESTONES_DATA.findIndex((m) => m.id === this.quizService.activeId());
    if (currentIdx >= 0 && currentIdx < MILESTONES_DATA.length - 1) {
      this.quizService.setActiveId(MILESTONES_DATA[currentIdx + 1].id);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  resetFilters() {
    this.quizService.setFilter({ searchQuery: '', status: 'all', difficulty: 'all' });
  }
}

export { AppComponent as App };
