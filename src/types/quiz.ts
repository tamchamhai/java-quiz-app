export type QuestionType = 'single' | 'multiple';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  milestoneId: string;
  moduleId?: string;
  title: string;
  codeSnippet?: string;
  language?: string;
  options: QuestionOption[];
  explanation: string;
  referencePath?: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Milestone {
  id: string;
  orderNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  targetDurationMinutes: number;
  learningRatio: string; // e.g. "Đọc 20% - Phá 30% - Xây 50%"
  referenceDoc: string;
  questions: QuizQuestion[];
}

export interface ModuleCategory {
  id: string;
  code: string;
  title: string;
  name: string;
  iconName: string;
  description: string;
  folderPath: string;
  questions: QuizQuestion[];
}

export type QuizMode = 'practice' | 'exam';

export interface UserAnswerRecord {
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  answeredAt: number;
}

export interface MilestoneProgress {
  milestoneId: string;
  completed: boolean;
  score: number;
  totalQuestions: number;
  lastAttemptAt?: number;
  answers: Record<string, string[]>;
}

export interface QuizFilter {
  searchQuery: string;
  status: 'all' | 'unanswered' | 'bookmarked' | 'incorrect';
  difficulty?: 'all' | 'easy' | 'medium' | 'hard';
}

