import React, { useState } from 'react';
import { VISUAL_QUIZ_QUESTIONS } from '../data/visualQuizData.ts';
import { PatternVisualizer } from './PatternVisualizer.tsx';
import { VisualQuizQuestion } from '../types.ts';
import { playSound } from '../utils/audio.ts';
import confetti from 'canvas-confetti';
import { 
  Eye, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Flame, 
  Sparkles, 
  Lightbulb, 
  Award,
  BookOpen,
  Layers,
  Activity
} from 'lucide-react';

interface VisualPatternQuizProps {
  onAddXp: (amount: number) => void;
  onUpdateQuizStats?: (correct: number, total: number) => void;
  soundEnabled: boolean;
}

export const VisualPatternQuiz: React.FC<VisualPatternQuizProps> = ({
  onAddXp,
  onUpdateQuizStats,
  soundEnabled
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'candlestick' | 'chart-pattern' | 'forex-structure'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);

  // Filter questions
  const filteredQuestions = VISUAL_QUIZ_QUESTIONS.filter(q => {
    if (filterCategory === 'all') return true;
    return q.category === filterCategory;
  });

  const currentQ: VisualQuizQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(option);
    setIsAnswered(true);
    setTotalAnswered(prev => prev + 1);

    const isCorrect = option === currentQ.correctName;

    if (isCorrect) {
      playSound('correct', soundEnabled);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setScore(prev => prev + 1);

      const streakBonus = Math.min(newStreak * 5, 25);
      const xpEarned = 20 + streakBonus;
      onAddXp(xpEarned);

      if (onUpdateQuizStats) onUpdateQuizStats(1, 1);

      if (newStreak > 0 && newStreak % 3 === 0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      playSound('wrong', soundEnabled);
      setStreak(0);
      if (onUpdateQuizStats) onUpdateQuizStats(0, 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);

    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setStreak(0);
    setScore(0);
    setTotalAnswered(0);
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800">
        <p className="text-slate-400">No visual questions available for this filter.</p>
        <button
          onClick={() => setFilterCategory('all')}
          className="mt-4 px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl"
        >
          Reset Filter
        </button>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption === currentQ.correctName;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-cyan-950/70 p-6 rounded-2xl border border-indigo-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <Eye className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Visual Pattern Identification Arena
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Inspect the price action geometry, wicks, and structure with titles concealed. Can you identify the exact candlestick or chart formation like an institutional trader?
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 font-mono text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Streak: {streak}</span>
            </div>
            <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-mono text-xs font-bold">
              <span>Accuracy: {totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0}%</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
          <span className="text-xs font-mono text-slate-400 mr-2">Filter Category:</span>
          {[
            { id: 'all', label: 'All Visuals (26+)', icon: Layers },
            { id: 'candlestick', label: 'Candlestick Identification', icon: BookOpen },
            { id: 'chart-pattern', label: 'Chart Formations', icon: Layers },
            { id: 'forex-structure', label: 'Forex Institutional Setups', icon: Activity },
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = filterCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterCategory(tab.id as any);
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setShowHint(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400'
                    : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flashcard Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Question {currentIndex + 1} of {filteredQuestions.length}</span>
          <span className="uppercase text-[11px] font-bold text-cyan-400 tracking-wider">
            Category: {currentQ.category.replace('-', ' ')} · Difficulty: {currentQ.difficulty}
          </span>
        </div>

        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>

        {/* Visual Inspection Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              Examine the Pattern Schematic:
            </h3>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHint ? 'Hide Clue' : 'Show Tactical Clue'}
            </button>
          </div>

          {/* Hint Dropdown */}
          {showHint && (
            <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-xl text-xs text-amber-200 leading-relaxed font-sans animate-fadeIn">
              <strong className="text-amber-400 font-mono font-semibold mr-1.5">Tactical Clue:</strong>
              {currentQ.hint}
            </div>
          )}

          {/* Render Pure SVG with quizMode enabled to hide text labels */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 p-2">
            <PatternVisualizer 
              svgType={currentQ.svgType} 
              quizMode={!isAnswered} 
              interactive={true}
              className="w-full h-64 sm:h-72"
            />
          </div>
        </div>

        {/* Question Prompt */}
        <div className="text-center py-2">
          <h4 className="text-base sm:text-lg font-bold text-white">
            Which candlestick or chart formation is displayed above?
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Choose the correct technical analysis pattern name to lock in your answer:
          </p>
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentQ.correctName;

            let buttonStyle = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-indigo-500/60 hover:bg-slate-850';

            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20 font-bold';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-500/20 line-through';
              } else {
                buttonStyle = 'bg-slate-950/50 border-slate-850 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-semibold">{option}</span>
                </div>

                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback & Breakdown */}
        {isAnswered && (
          <div className={`p-5 rounded-xl border animate-slideUp space-y-3 ${
            isCurrentCorrect 
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-emerald-300 text-sm">
                      Spot On! That is the {currentQ.correctName}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span className="font-bold text-rose-300 text-sm">
                      Incorrect. The correct answer is: {currentQ.correctName}
                    </span>
                  </>
                )}
              </div>

              {isCurrentCorrect && (
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{20 + Math.min(streak * 5, 25)} XP
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {currentQ.explanation}
            </p>

            {(currentQ.goldenRule || currentQ.institutionalRule) && (
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
                <span className="text-amber-400 font-bold mr-1">Institutional Technical Rule:</span>
                "{currentQ.goldenRule || currentQ.institutionalRule}"
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Next Visual Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer info & Reset */}
        <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
          <span>Best Streak: {bestStreak} | Total Answered: {totalAnswered}</span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Quiz Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
