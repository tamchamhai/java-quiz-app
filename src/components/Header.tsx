import React from 'react';
import { 
  Timer, 
  RotateCcw, 
  Send, 
  Search, 
  Bookmark, 
  BookOpen,
  Sparkles,
  Flame
} from 'lucide-react';
import type { QuizMode, QuizFilter, Milestone, ModuleCategory } from '../types/quiz';

interface HeaderProps {
  currentCategory: Milestone | ModuleCategory;
  mode: QuizMode;
  setMode: (mode: QuizMode) => void;
  examTimeRemaining: number;
  isTimerRunning?: boolean;
  examSubmitted: boolean;
  filter: QuizFilter;
  setFilter: React.Dispatch<React.SetStateAction<QuizFilter>>;
  onSubmitExam: () => void;
  onStartExam: () => void;
  onResetProgress: () => void;
  onOpenTheory: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  mode,
  setMode,
  examTimeRemaining,
  examSubmitted,
  filter,
  setFilter,
  onSubmitExam,
  onStartExam,
  onResetProgress,
  onOpenTheory,
  answeredCount,
  totalQuestions,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isMilestone = 'learningRatio' in currentCategory;

  return (
    <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-20 px-6 py-4">
      {/* Top row: Title and Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {isMilestone ? (currentCategory as Milestone).shortTitle : (currentCategory as ModuleCategory).code}
            </span>
            {isMilestone && (
              <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                {(currentCategory as Milestone).learningRatio}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {currentCategory.title}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
            {currentCategory.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Mode Switcher */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setMode('practice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === 'practice'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Luyện tập</span>
            </button>

            <button
              onClick={() => {
                if (mode !== 'exam') {
                  onStartExam();
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === 'exam'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Thi thử</span>
            </button>
          </div>

          {/* Exam Timer & Submit buttons */}
          {mode === 'exam' ? (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                  examTimeRemaining < 180
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-slate-800/80 text-amber-400 border-slate-700'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{formatTime(examTimeRemaining)}</span>
              </div>

              {!examSubmitted ? (
                <button
                  onClick={onSubmitExam}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Nộp bài</span>
                </button>
              ) : (
                <button
                  onClick={onStartExam}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại đề này</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onResetProgress}
              title="Xóa kết quả và làm lại chặng này"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Theory button */}
          <button
            onClick={onOpenTheory}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 font-semibold text-xs flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Giáo trình liên quan</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Search & Filter Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/60">
        {/* Filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilter((prev) => ({ ...prev, status: 'all' }))}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filter.status === 'all'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            Tất cả ({totalQuestions})
          </button>

          <button
            onClick={() => setFilter((prev) => ({ ...prev, status: 'unanswered' }))}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filter.status === 'unanswered'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            Chưa làm ({totalQuestions - answeredCount})
          </button>

          <button
            onClick={() => setFilter((prev) => ({ ...prev, status: 'bookmarked' }))}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              filter.status === 'bookmarked'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Đã ghim sao</span>
          </button>

          {mode === 'practice' && (
            <button
              onClick={() => setFilter((prev) => ({ ...prev, status: 'incorrect' }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filter.status === 'incorrect'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
              }`}
            >
              Cần ôn lại (Sai)
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi, từ khóa..."
            value={filter.searchQuery}
            onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>
    </header>
  );
};

