import React from 'react';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';
import type { QuizQuestion } from '../types/quiz';

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: Record<string, string[]>;
  onRetake: () => void;
  onSwitchToPractice: () => void;
  onNextMilestone?: () => void;
  hasNextMilestone: boolean;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  answers,
  onRetake,
  onSwitchToPractice,
  onNextMilestone,
  hasNextMilestone,
}) => {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach((q) => {
    const selected = answers[q.id] || [];
    if (selected.length === 0) {
      unansweredCount++;
    } else {
      const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
      if (
        selected.length === correctOptionIds.length &&
        selected.every((id) => correctOptionIds.includes(id))
      ) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  const getRankBadge = () => {
    if (percentage >= 90) {
      return {
        title: 'Xuất sắc! (Senior Ready)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        desc: 'Bạn đã làm chủ hoàn toàn các thách thức kỹ thuật phức tạp của chặng này!',
      };
    } else if (percentage >= 70) {
      return {
        title: 'Khá tốt! (Mid-level Ready)',
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10 border-indigo-500/30',
        desc: 'Kiến thức cốt lõi đã vững vàng, chỉ cần rà soát thêm một số bẫy kỹ thuật nâng cao.',
      };
    } else {
      return {
        title: 'Cần ôn luyện thêm! (Junior/Learning)',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        desc: 'Hãy chuyển sang Chế độ Luyện tập để xem chi tiết giải thích và đọc lại tài liệu syllabus.',
      };
    }
  };

  const rank = getRankBadge();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-2xl mb-8">
      {/* Trophy Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-400 shadow-xl shadow-amber-500/10">
          <Trophy className="w-12 h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Kết Quả Kiểm Tra Trắc Nghiệm
        </h2>
        <div
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${rank.bg} ${rank.color}`}
        >
          {rank.title}
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          {rank.desc}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 font-medium">Điểm số</p>
          <p className="text-3xl font-extrabold text-white mt-1 font-mono">{percentage}%</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 font-medium">Số câu đúng</p>
          <p className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
            {correctCount}/{questions.length}
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 font-medium">Số câu sai</p>
          <p className="text-3xl font-extrabold text-rose-400 mt-1 font-mono">{incorrectCount}</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 font-medium">Chưa trả lời</p>
          <p className="text-3xl font-extrabold text-slate-500 mt-1 font-mono">{unansweredCount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Làm lại đề thi</span>
        </button>

        <button
          onClick={onSwitchToPractice}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Xem lại lời giải chi tiết</span>
        </button>

        {hasNextMilestone && onNextMilestone && (
          <button
            onClick={onNextMilestone}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <span>Sang chặng kế tiếp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

