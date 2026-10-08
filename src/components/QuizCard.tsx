import React, { useState } from 'react';
import { 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Code2, 
  Lightbulb, 
  FileText
} from 'lucide-react';
import type { QuizQuestion, QuizMode } from '../types/quiz';

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
  selectedOptionIds: string[];
  isBookmarked: boolean;
  mode: QuizMode;
  examSubmitted: boolean;
  onSelectOption: (optionId: string) => void;
  onToggleBookmark: () => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  index,
  selectedOptionIds,
  isBookmarked,
  mode,
  examSubmitted,
  onSelectOption,
  onToggleBookmark,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const isAnswered = selectedOptionIds.length > 0;

  // In practice mode or after exam submission, we reveal the answer
  const showFeedback = mode === 'practice' ? isAnswered : examSubmitted;

  const correctOptionIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
  const isFullyCorrect =
    isAnswered &&
    selectedOptionIds.length === correctOptionIds.length &&
    selectedOptionIds.every((id) => correctOptionIds.includes(id));

  const handleCopyCode = () => {
    if (question.codeSnippet) {
      navigator.clipboard.writeText(question.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'easy':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Cơ bản
          </span>
        );
      case 'hard':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Nâng cao
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Trung bình
          </span>
        );
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        showFeedback
          ? isFullyCorrect
            ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
            : 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-950/20'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700/80 shadow-md'
      }`}
    >
      {/* Question Header */}
      <div className="p-5 pb-3 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-xs">
            {index + 1}
          </span>
          {getDifficultyBadge(question.difficulty)}
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>

        <button
          onClick={onToggleBookmark}
          className={`p-1.5 rounded-lg border transition-all ${
            isBookmarked
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              : 'text-slate-500 hover:text-slate-300 border-transparent hover:bg-slate-800'
          }`}
          title={isBookmarked ? 'Bỏ đánh dấu' : 'Ghim câu hỏi cần ôn lại'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Question Title */}
      <div className="px-5 py-2">
        <h3 className="text-base font-semibold text-slate-100 leading-relaxed">
          {question.title}
        </h3>
      </div>

      {/* Code Snippet Box if available */}
      {question.codeSnippet && (
        <div className="px-5 py-2">
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 font-mono text-xs">
            <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{question.language ? `${question.language.toUpperCase()} Snippet` : 'Code / Config Snippet'}</span>
              </span>
              <button
                onClick={handleCopyCode}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Chép mã</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-indigo-200/90 leading-normal">
              <code>{question.codeSnippet}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Options List */}
      <div className="p-5 pt-3 space-y-2.5">
        {question.options.map((opt, optIdx) => {
          const isSelected = selectedOptionIds.includes(opt.id);
          const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

          let optionStyle =
            'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-300';
          let letterStyle = 'bg-slate-800 text-slate-400 border-slate-700';

          if (showFeedback) {
            if (opt.isCorrect) {
              optionStyle =
                'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 font-medium shadow-sm';
              letterStyle = 'bg-emerald-600 text-white border-emerald-500';
            } else if (isSelected && !opt.isCorrect) {
              optionStyle =
                'bg-rose-950/40 border-rose-500/50 text-rose-200 font-medium';
              letterStyle = 'bg-rose-600 text-white border-rose-500';
            } else {
              optionStyle = 'opacity-60 border-slate-850 bg-slate-950/30 text-slate-400';
            }
          } else if (isSelected) {
            optionStyle =
              'bg-indigo-950/60 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/50';
            letterStyle = 'bg-indigo-600 text-white border-indigo-400';
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-150 cursor-pointer ${optionStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-lg border font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${letterStyle}`}
              >
                {optionLetter}
              </span>

              <div className="flex-1 text-sm leading-relaxed">
                <span>{opt.text}</span>
              </div>

              {showFeedback && (
                <div className="shrink-0 mt-0.5">
                  {opt.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box (when revealed) */}
      {showFeedback && (
        <div className="px-5 pb-5">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Giải thích chuyên sâu & phân tích bản chất</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {question.explanation}
            </p>

            {question.referencePath && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-indigo-400 font-mono">
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Tài liệu: java-knownledge/roadmap/{question.referencePath}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

