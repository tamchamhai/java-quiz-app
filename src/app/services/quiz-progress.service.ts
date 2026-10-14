import { Injectable, signal, computed, effect, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MILESTONES_DATA } from '../../data/milestones-data';
import { MODULE_CATEGORIES } from '../../data/modules-data';
import type { QuizMode, QuizFilter, QuizQuestion, Milestone, ModuleCategory } from '../../types/quiz';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'ticket_station_quiz_progress_v1';
const BOOKMARKS_KEY = 'ticket_station_quiz_bookmarks_v1';

interface StoredProgress {
  answers: Record<string, string[]>;
}

@Injectable({
  providedIn: 'root'
})
export class QuizProgressService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private timerInterval: any = null;

  // State Signals
  readonly selectedCategory = signal<'milestone' | 'module'>('milestone');
  readonly activeId = signal<string>('milestone-1');
  readonly mode = signal<QuizMode>('practice');
  readonly answers = signal<Record<string, string[]>>({});
  readonly bookmarkedIds = signal<string[]>([]);
  readonly examSubmitted = signal<boolean>(false);
  readonly examTimeRemaining = signal<number>(900);
  readonly isTimerRunning = signal<boolean>(false);
  readonly filter = signal<QuizFilter>({
    searchQuery: '',
    status: 'all',
    difficulty: 'all',
  });

  // Computed: current category
  readonly currentCategoryData = computed<Milestone | ModuleCategory>(() => {
    const cat = this.selectedCategory();
    const id = this.activeId();

    if (cat === 'milestone') {
      return MILESTONES_DATA.find((m) => m.id === id) || MILESTONES_DATA[0];
    } else {
      const directMatch = MODULE_CATEGORIES.find((m) => m.id === id);
      if (directMatch) return directMatch;

      for (const mod of MODULE_CATEGORIES) {
        if (mod.subTopics) {
          const sub = mod.subTopics.find((s) => s.id === id);
          if (sub) {
            return {
              id: sub.id,
              code: mod.code,
              name: sub.title,
              title: `${mod.code}.${sub.orderNumber} ${sub.title}`,
              iconName: mod.iconName,
              description: sub.description || `${mod.name} - ${sub.title} (${sub.readDuration})`,
              folderPath: mod.folderPath,
              questions: sub.questions,
            };
          }
        }
      }

      return MODULE_CATEGORIES[0];
    }
  });

  // Computed: raw questions pool
  readonly rawQuestions = computed<QuizQuestion[]>(() => {
    return this.currentCategoryData().questions || [];
  });

  // Computed: filtered questions
  readonly filteredQuestions = computed<QuizQuestion[]>(() => {
    const questions = this.rawQuestions();
    const f = this.filter();
    const userAnswers = this.answers();
    const bookmarks = this.bookmarkedIds();

    return questions.filter((q) => {
      // Search query
      if (f.searchQuery.trim()) {
        const qText = (q.title + ' ' + q.explanation + ' ' + q.tags.join(' ')).toLowerCase();
        if (!qText.includes(f.searchQuery.toLowerCase().trim())) {
          return false;
        }
      }

      // Difficulty
      if (f.difficulty && f.difficulty !== 'all') {
        if (q.difficulty !== f.difficulty) return false;
      }

      // Status
      const selected = userAnswers[q.id] || [];
      const isAnswered = selected.length > 0;
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      const isCorrect =
        isAnswered &&
        selected.length === correctOptionIds.length &&
        selected.every((optId) => correctOptionIds.includes(optId));

      if (f.status === 'unanswered' && isAnswered) return false;
      if (f.status === 'bookmarked' && !bookmarks.includes(q.id)) return false;
      if (f.status === 'incorrect' && (!isAnswered || isCorrect)) return false;

      return true;
    });
  });

  // Computed: overall stats across entire app
  readonly overallStats = computed(() => {
    const userAnswers = this.answers();
    const bookmarks = this.bookmarkedIds();

    const allQuestions = [
      ...MILESTONES_DATA.flatMap((m) => m.questions),
      ...MODULE_CATEGORIES.flatMap((m) => m.questions),
    ];

    let answeredCount = 0;
    let correctCount = 0;

    allQuestions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected && selected.length > 0) {
        answeredCount++;
        const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (
          selected.length === correctIds.length &&
          selected.every((optId) => correctIds.includes(optId))
        ) {
          correctCount++;
        }
      }
    });

    return {
      totalQuestions: allQuestions.length,
      answeredCount,
      correctCount,
      accuracy: answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0,
      totalBookmarks: bookmarks.length,
    };
  });

  constructor() {
    // SSR Safe LocalStorage loading
    if (this.isBrowser) {
      try {
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
          const parsed: StoredProgress = JSON.parse(savedProgress);
          if (parsed.answers) this.answers.set(parsed.answers);
        }
        const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
        if (savedBookmarks) {
          this.bookmarkedIds.set(JSON.parse(savedBookmarks));
        }
      } catch (e) {
        console.error('Failed to load quiz progress from localStorage', e);
      }

      // Persistence effects
      effect(() => {
        const answersState = this.answers();
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers: answersState }));
        } catch (e) {
          console.error('Failed to save answers', e);
        }
      });

      effect(() => {
        const bookmarks = this.bookmarkedIds();
        try {
          localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
        } catch (e) {
          console.error('Failed to save bookmarks', e);
        }
      });
    }
  }

  setSelectedCategory(cat: 'milestone' | 'module') {
    this.selectedCategory.set(cat);
  }

  setActiveId(id: string) {
    this.activeId.set(id);
  }

  setMode(mode: QuizMode) {
    this.mode.set(mode);
    if (mode === 'practice') {
      this.stopTimer();
    }
  }

  setFilter(filterOrFn: QuizFilter | ((prev: QuizFilter) => QuizFilter)) {
    if (typeof filterOrFn === 'function') {
      this.filter.update(filterOrFn);
    } else {
      this.filter.set(filterOrFn);
    }
  }

  handleSelectOption(questionId: string, optionId: string, isMultiple = false) {
    this.answers.update((prev) => {
      const currentSelected = prev[questionId] || [];
      let updated: string[];
      if (isMultiple) {
        if (currentSelected.includes(optionId)) {
          updated = currentSelected.filter((id) => id !== optionId);
        } else {
          updated = [...currentSelected, optionId];
        }
      } else {
        updated = [optionId];
      }
      return { ...prev, [questionId]: updated };
    });
  }

  toggleBookmark(questionId: string) {
    this.bookmarkedIds.update((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  }

  resetCurrentProgress() {
    const raw = this.rawQuestions();
    this.answers.update((prev) => {
      const next = { ...prev };
      raw.forEach((q) => {
        delete next[q.id];
      });
      return next;
    });
    this.examSubmitted.set(false);
    this.examTimeRemaining.set(900);
    this.stopTimer();
  }

  startExam() {
    this.mode.set('exam');
    this.examSubmitted.set(false);
    const duration = Math.max(this.rawQuestions().length * 90, 300); // 1.5 min per question, min 5 min
    this.examTimeRemaining.set(duration);
    this.isTimerRunning.set(true);
    this.startTimer();
  }

  submitExam() {
    this.examSubmitted.set(true);
    this.stopTimer();

    // Calculate score
    const raw = this.rawQuestions();
    const userAnswers = this.answers();
    let correctCount = 0;

    raw.forEach((q) => {
      const selected = userAnswers[q.id] || [];
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      if (
        selected.length > 0 &&
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id))
      ) {
        correctCount++;
      }
    });

    const percentage = raw.length > 0 ? (correctCount / raw.length) * 100 : 0;
    if (percentage >= 80) {
      this.triggerConfetti();
    }
  }

  private startTimer() {
    this.stopTimer();
    if (!this.isBrowser) return;

    this.timerInterval = setInterval(() => {
      const remaining = this.examTimeRemaining();
      if (remaining <= 1) {
        this.examTimeRemaining.set(0);
        this.submitExam();
      } else {
        this.examTimeRemaining.set(remaining - 1);
      }
    }, 1000);
  }

  private stopTimer() {
    this.isTimerRunning.set(false);
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  triggerConfetti() {
    if (!this.isBrowser) return;
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  }

  getCategoryStats(questions: QuizQuestion[]) {
    const userAnswers = this.answers();
    let answered = 0;
    let correct = 0;

    questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected && selected.length > 0) {
        answered++;
        const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (
          selected.length === correctIds.length &&
          selected.every((id) => correctIds.includes(id))
        ) {
          correct++;
        }
      }
    });

    return {
      total: questions.length,
      answered,
      correct,
      isCompleted: answered === questions.length && questions.length > 0,
      percentage: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0,
    };
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}

