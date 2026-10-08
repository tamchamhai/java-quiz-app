import { useState, useEffect, useMemo, useCallback } from 'react';
import { MILESTONES_DATA } from '../data/milestones-data';
import { MODULE_CATEGORIES } from '../data/modules-data';
import type { QuizMode, QuizFilter, QuizQuestion } from '../types/quiz';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'ticket_station_quiz_progress_v1';
const BOOKMARKS_KEY = 'ticket_station_quiz_bookmarks_v1';

interface StoredProgress {
  answers: Record<string, string[]>;
}

export function useQuizProgress() {
  const [selectedCategory, setSelectedCategory] = useState<'milestone' | 'module'>('milestone');
  const [activeId, setActiveId] = useState<string>('milestone-1');
  const [mode, setMode] = useState<QuizMode>('practice');
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(900); // 15 mins default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [filter, setFilter] = useState<QuizFilter>({
    searchQuery: '',
    status: 'all',
    difficulty: 'all',
  });

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed: StoredProgress = JSON.parse(savedProgress);
        if (parsed.answers) setAnswers(parsed.answers);
      }
      const savedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (savedBookmarks) {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      }
    } catch (e) {
      console.error('Failed to load quiz progress', e);
    }
  }, []);

  // Save progress on answer change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers }));
    } catch (e) {
      console.error('Failed to save answers', e);
    }
  }, [answers]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  // Current questions pool
  const currentCategoryData = useMemo(() => {
    if (selectedCategory === 'milestone') {
      return MILESTONES_DATA.find((m) => m.id === activeId) || MILESTONES_DATA[0];
    } else {
      return MODULE_CATEGORIES.find((m) => m.id === activeId) || MODULE_CATEGORIES[0];
    }
  }, [selectedCategory, activeId]);

  const rawQuestions: QuizQuestion[] = useMemo(() => {
    return currentCategoryData.questions || [];
  }, [currentCategoryData]);

  // Timer countdown for exam mode
  useEffect(() => {
    let interval: number | undefined;
    if (mode === 'exam' && isTimerRunning && !examSubmitted && examTimeRemaining > 0) {
      interval = window.setInterval(() => {
        setExamTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setExamSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mode, isTimerRunning, examSubmitted, examTimeRemaining]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return rawQuestions.filter((q) => {
      // Search query
      if (filter.searchQuery.trim()) {
        const qText = (q.title + ' ' + q.explanation + ' ' + q.tags.join(' ')).toLowerCase();
        if (!qText.includes(filter.searchQuery.toLowerCase().trim())) {
          return false;
        }
      }

      // Difficulty
      if (filter.difficulty && filter.difficulty !== 'all') {
        if (q.difficulty !== filter.difficulty) return false;
      }

      // Status
      const selected = answers[q.id] || [];
      const isAnswered = selected.length > 0;
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      const isCorrect =
        isAnswered &&
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id));

      if (filter.status === 'unanswered' && isAnswered) return false;
      if (filter.status === 'bookmarked' && !bookmarkedIds.includes(q.id)) return false;
      if (filter.status === 'incorrect' && (!isAnswered || isCorrect)) return false;

      return true;
    });
  }, [rawQuestions, filter, answers, bookmarkedIds]);

  const handleSelectOption = useCallback(
    (questionId: string, optionId: string, isMultiple = false) => {
      setAnswers((prev) => {
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
    },
    []
  );

  const toggleBookmark = useCallback((questionId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  }, []);

  const resetCurrentProgress = useCallback(() => {
    setAnswers((prev) => {
      const next = { ...prev };
      rawQuestions.forEach((q) => {
        delete next[q.id];
      });
      return next;
    });
    setExamSubmitted(false);
    setExamTimeRemaining(900);
    setIsTimerRunning(false);
  }, [rawQuestions]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const submitExam = useCallback(() => {
    setExamSubmitted(true);
    setIsTimerRunning(false);

    // Calculate score
    let correctCount = 0;
    rawQuestions.forEach((q) => {
      const selected = answers[q.id] || [];
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      if (
        selected.length > 0 &&
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id))
      ) {
        correctCount++;
      }
    });

    const percentage = rawQuestions.length > 0 ? (correctCount / rawQuestions.length) * 100 : 0;
    if (percentage >= 80) {
      triggerConfetti();
    }
  }, [rawQuestions, answers]);

  const startExam = useCallback(() => {
    setMode('exam');
    setExamSubmitted(false);
    setExamTimeRemaining(rawQuestions.length * 90); // 1.5 min per question
    setIsTimerRunning(true);
  }, [rawQuestions]);

  // Overall Statistics
  const overallStats = useMemo(() => {
    const allQuestions = [
      ...MILESTONES_DATA.flatMap((m) => m.questions),
      ...MODULE_CATEGORIES.flatMap((m) => m.questions),
    ];

    let answeredCount = 0;
    let correctCount = 0;

    allQuestions.forEach((q) => {
      const selected = answers[q.id];
      if (selected && selected.length > 0) {
        answeredCount++;
        const correctIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        if (
          selected.length === correctIds.length &&
          selected.every((id) => correctIds.includes(id))
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
      totalBookmarks: bookmarkedIds.length,
    };
  }, [answers, bookmarkedIds]);

  const getCategoryStats = useCallback(
    (questions: QuizQuestion[]) => {
      let answered = 0;
      let correct = 0;
      questions.forEach((q) => {
        const selected = answers[q.id];
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
    },
    [answers]
  );

  return {
    selectedCategory,
    setSelectedCategory,
    activeId,
    setActiveId,
    mode,
    setMode,
    answers,
    bookmarkedIds,
    examSubmitted,
    examTimeRemaining,
    isTimerRunning,
    filter,
    setFilter,
    currentCategoryData,
    rawQuestions,
    filteredQuestions,
    handleSelectOption,
    toggleBookmark,
    resetCurrentProgress,
    submitExam,
    startExam,
    overallStats,
    getCategoryStats,
  };
}
