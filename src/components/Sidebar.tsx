import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Terminal, 
  ChevronRight,
  Database,
  Lock,
  Send,
  Server,
  ShieldCheck,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { MILESTONES_DATA } from '../data/milestones-data';
import { MODULE_CATEGORIES } from '../data/modules-data';
import type { Milestone, ModuleCategory } from '../types/quiz';

interface SidebarProps {
  selectedCategory: 'milestone' | 'module';
  setSelectedCategory: (cat: 'milestone' | 'module') => void;
  activeId: string;
  setActiveId: (id: string) => void;
  getCategoryStats: (questions: any[]) => {
    total: number;
    answered: number;
    correct: number;
    isCompleted: boolean;
    percentage: number;
  };
  overallStats: {
    totalQuestions: number;
    answeredCount: number;
    correctCount: number;
    accuracy: number;
    totalBookmarks: number;
  };
  onFilterBookmarks?: () => void;
}

const MILESTONE_ICONS: Record<string, React.ReactNode> = {
  Database: <Database className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Lock: <Lock className="w-4 h-4" />,
  Send: <Send className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
};

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  activeId,
  setActiveId,
  getCategoryStats,
  overallStats,
}) => {
  return (
    <aside className="w-80 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white leading-tight flex items-center gap-1.5">
            Java Ticket Quiz
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">
              v1.0
            </span>
          </h1>
          <p className="text-xs text-slate-400 truncate">Hệ thống trắc nghiệm kiến thức</p>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/50">
        <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80">
          <button
            onClick={() => {
              setSelectedCategory('milestone');
              setActiveId(MILESTONES_DATA[0].id);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md text-xs font-semibold transition-all ${
              selectedCategory === 'milestone'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>6 Chặng Thực Chiến</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategory('module');
              setActiveId(MODULE_CATEGORIES[0].id);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-md text-xs font-semibold transition-all ${
              selectedCategory === 'module'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>12 Chuyên Đề</span>
          </button>
        </div>
      </div>

      {/* Nav List with custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {selectedCategory === 'milestone' ? (
          <div>
            <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Lộ Trình Ticket Station</span>
              <span className="text-[10px] text-indigo-400 lowercase font-mono">6 milestones</span>
            </div>

            <div className="space-y-1 mt-1">
              {MILESTONES_DATA.map((milestone: Milestone) => {
                const stats = getCategoryStats(milestone.questions);
                const isActive = activeId === milestone.id;

                return (
                  <button
                    key={milestone.id}
                    onClick={() => setActiveId(milestone.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group relative border ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-950/80 to-slate-850 border-indigo-500/40 text-white shadow-md shadow-indigo-950/40'
                        : 'border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                  >
                    {/* Order icon badge */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : stats.isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                      }`}
                    >
                      {stats.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        MILESTONE_ICONS[milestone.iconName] || milestone.orderNumber
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isActive ? 'text-indigo-300 font-bold' : 'text-slate-200'
                          }`}
                        >
                          {milestone.shortTitle}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isActive ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 font-mono">
                          {stats.answered}/{stats.total} câu
                        </span>
                        {stats.answered > 0 && (
                          <span
                            className={`font-semibold ${
                              stats.percentage >= 80
                                ? 'text-emerald-400'
                                : stats.percentage >= 50
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }`}
                          >
                            {stats.percentage}% đúng
                          </span>
                        )}
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className={`h-full transition-all duration-300 ${
                            stats.percentage >= 80
                              ? 'bg-emerald-500'
                              : stats.percentage >= 50
                              ? 'bg-amber-500'
                              : 'bg-indigo-500'
                          }`}
                          style={{
                            width: `${stats.total > 0 ? (stats.answered / stats.total) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className="px-2 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>12 Chuyên Đề Roadmap</span>
              <span className="text-[10px] text-indigo-400 lowercase font-mono">12 topics</span>
            </div>

            <div className="space-y-1 mt-1">
              {MODULE_CATEGORIES.map((mod: ModuleCategory) => {
                const stats = getCategoryStats(mod.questions);
                const isActive = activeId === mod.id;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveId(mod.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 group border ${
                      isActive
                        ? 'bg-indigo-950/70 border-indigo-500/40 text-white'
                        : 'border-transparent text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md font-mono text-[11px] font-bold flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mod.code}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate text-slate-200">
                        {mod.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {stats.answered}/{stats.total} câu
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Overall Statistics Card */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80">
        <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400">Tiến độ tổng thể</span>
            <span className="text-xs font-bold text-indigo-400">
              {overallStats.answeredCount}/{overallStats.totalQuestions} ({Math.round(
                overallStats.totalQuestions > 0
                  ? (overallStats.answeredCount / overallStats.totalQuestions) * 100
                  : 0
              )}%)
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
              style={{
                width: `${
                  overallStats.totalQuestions > 0
                    ? (overallStats.answeredCount / overallStats.totalQuestions) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
            <div className="bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/50">
              <p className="text-slate-400 text-[10px]">Độ chính xác</p>
              <p className="font-bold text-emerald-400 text-xs">{overallStats.accuracy}%</p>
            </div>
            <div className="bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/50">
              <p className="text-slate-400 text-[10px]">Đã đánh dấu</p>
              <p className="font-bold text-amber-400 text-xs">{overallStats.totalBookmarks} câu</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

