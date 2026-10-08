import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { QuizCard } from './components/QuizCard';
import { QuizResults } from './components/QuizResults';
import { TheoryModal } from './components/TheoryModal';
import { useQuizProgress } from './hooks/useQuizProgress';
import { MILESTONES_DATA } from './data/milestones-data';
import { 
  CheckCircle2, 
  SearchX, 
  Menu
} from 'lucide-react';

export function App() {
  const {
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
  } = useQuizProgress();

  const [isTheoryOpen, setIsTheoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Milestone navigation
  const currentMilestoneIndex = MILESTONES_DATA.findIndex((m) => m.id === activeId);
  const hasNextMilestone =
    selectedCategory === 'milestone' && currentMilestoneIndex < MILESTONES_DATA.length - 1;

  const handleNextMilestone = () => {
    if (hasNextMilestone) {
      setActiveId(MILESTONES_DATA[currentMilestoneIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const answeredCountForCurrent = rawQuestions.filter(
    (q) => answers[q.id] && answers[q.id].length > 0
  ).length;

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={(cat) => {
            setSelectedCategory(cat);
            setMobileMenuOpen(false);
          }}
          activeId={activeId}
          setActiveId={(id) => {
            setActiveId(id);
            setMobileMenuOpen(false);
          }}
          getCategoryStats={getCategoryStats}
          overallStats={overallStats}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Mobile Header Bar */}
        <div className="lg:hidden p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-indigo-400">Java Ticket Station Quiz</span>
          <div className="w-9" />
        </div>

        {/* Desktop Sticky Header */}
        <Header
          currentCategory={currentCategoryData}
          mode={mode}
          setMode={setMode}
          examTimeRemaining={examTimeRemaining}
          isTimerRunning={isTimerRunning}
          examSubmitted={examSubmitted}
          filter={filter}
          setFilter={setFilter}
          onSubmitExam={submitExam}
          onStartExam={startExam}
          onResetProgress={resetCurrentProgress}
          onOpenTheory={() => setIsTheoryOpen(true)}
          answeredCount={answeredCountForCurrent}
          totalQuestions={rawQuestions.length}
        />

        {/* Scrollable Questions Container */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6 pb-24">
          {/* Exam Results Scorecard if submitted */}
          {mode === 'exam' && examSubmitted && (
            <QuizResults
              questions={rawQuestions}
              answers={answers}
              onRetake={startExam}
              onSwitchToPractice={() => setMode('practice')}
              onNextMilestone={handleNextMilestone}
              hasNextMilestone={hasNextMilestone}
            />
          )}

          {/* Questions List */}
          {filteredQuestions.length > 0 ? (
            <div className="space-y-6">
              {filteredQuestions.map((q, idx) => {
                const questionIndex = rawQuestions.findIndex((rq) => rq.id === q.id);
                return (
                  <QuizCard
                    key={q.id}
                    question={q}
                    index={questionIndex !== -1 ? questionIndex : idx}
                    selectedOptionIds={answers[q.id] || []}
                    isBookmarked={bookmarkedIds.includes(q.id)}
                    mode={mode}
                    examSubmitted={examSubmitted}
                    onSelectOption={(optionId) => handleSelectOption(q.id, optionId)}
                    onToggleBookmark={() => toggleBookmark(q.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 max-w-md mx-auto my-12">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/60 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                Không tìm thấy câu hỏi phù hợp
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Hãy thử đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc đang chọn.
              </p>
              <button
                onClick={() => setFilter({ searchQuery: '', status: 'all', difficulty: 'all' })}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}

          {/* Quick Submit Floating Bar in Exam Mode if not submitted */}
          {mode === 'exam' && !examSubmitted && (
            <div className="sticky bottom-6 left-0 right-0 z-20 flex justify-center">
              <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-2xl shadow-2xl flex items-center gap-4">
                <span className="text-xs text-slate-300 font-mono">
                  Đã trả lời: <strong className="text-emerald-400">{answeredCountForCurrent}</strong>/
                  {rawQuestions.length} câu
                </span>
                <button
                  onClick={submitExam}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài thi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Theory & Syllabus Reference Modal */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
        category={currentCategoryData}
      />
    </div>
  );
}

export default App;
