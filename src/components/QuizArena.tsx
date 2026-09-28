import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData.ts';
import { QuizQuestion } from '../types.ts';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio.ts';

interface QuizArenaProps {
  onAddXp: (amount: number) => void;
  onUpdateQuizStats: (correct: number, total: number) => void;
  soundEnabled?: boolean;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  onAddXp,
  onUpdateQuizStats,
  soundEnabled = true
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [sessionTotal, setSessionTotal] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filter questions
  const filteredQuestions = QUIZ_QUESTIONS.filter(q => {
    if (selectedTopic !== 'all' && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    setSessionTotal(prev => prev + 1);

    if (isCorrect) {
      playSound('correct', soundEnabled);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setSessionScore(prev => prev + 1);

      // Calculate XP with streak multiplier
      const earnedXp = 20 + Math.min(newStreak * 5, 30);
      onAddXp(earnedXp);
      onUpdateQuizStats(1, 1);

      if (newStreak % 5 === 0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      playSound('wrong', soundEnabled);
      setStreak(0);
      onUpdateQuizStats(0, 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      playSound('levelup', soundEnabled);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizFinished(false);
    setStreak(0);
    setSessionScore(0);
    setSessionTotal(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              THEORY &amp; STRATEGY ARENA · FX PATTERN MASTER
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Test Your Technical Acumen & Market Economics
            </h2>
            <p className="text-slate-300 text-sm">
              Validate your mastery of candlestick rules, chart patterns, Break of Structure (BOS), CHOCH, institutional liquidity hunting, position sizing math, and trade psychology.
            </p>
          </div>

          {/* Streak & Score pill */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-950 rounded-xl border border-amber-500/40 flex items-center gap-2 text-amber-400 font-mono text-sm font-bold shadow-lg">
              <Flame className="w-4 h-4 animate-bounce text-amber-400" />
              <span>Streak: {streak} 🔥</span>
            </div>
            <div className="px-4 py-2 bg-slate-950 rounded-xl border border-cyan-500/40 flex items-center gap-2 text-cyan-400 font-mono text-sm font-bold shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Score: {sessionScore}/{sessionTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
        {/* Topic Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-slate-400 mr-1">Topic:</span>
          {[
            { id: 'all', label: 'All Topics' },
            { id: 'candlesticks', label: 'Candlesticks' },
            { id: 'chart_patterns', label: 'Chart Patterns' },
            { id: 'market_structure', label: 'BOS & CHOCH' },
            { id: 'liquidity', label: 'Liquidity & Order Book' },
            { id: 'trendlines', label: 'Trendlines' },
            { id: 'indicators', label: 'Indicators & RSI' },
            { id: 'risk_management', label: 'Risk & SL/TP' },
            { id: 'psychology', label: 'Psychology' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopic(t.id);
                handleRestartQuiz();
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedTopic === t.id
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-slate-400 mr-1">Level:</span>
          {['all', 'beginner', 'intermediate', 'advanced'].map(d => (
            <button
              key={d}
              onClick={() => {
                setSelectedDifficulty(d);
                handleRestartQuiz();
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors capitalize cursor-pointer ${
                selectedDifficulty === d
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Body */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 space-y-3">
          <p>No questions found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSelectedTopic('all');
              setSelectedDifficulty('all');
            }}
            className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : quizFinished ? (
        /* Finished State */
        <div className="p-8 md:p-12 text-center bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-8 h-8 text-black" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">
              Quiz Completed! Outstanding Effort!
            </h3>
            <p className="text-sm text-slate-300">
              You scored <strong className="text-emerald-400 font-mono">{sessionScore}</strong> out of <strong className="text-white font-mono">{sessionTotal}</strong> questions correctly ({((sessionScore / (sessionTotal || 1)) * 100).toFixed(0)}%).
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz Set
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          {/* Question Metadata */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-slate-600">·</span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono capitalize bg-slate-800 text-slate-300">
                {currentQuestion.difficulty}
              </span>
            </div>

            <span className="text-xs font-mono text-slate-500 uppercase">
              Topic: {currentQuestion.topic.replace('-', ' ')}
            </span>
          </div>

          {/* Question text */}
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQuestion.correctIndex;

              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-850';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Shows once answered) */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                Institutional Technical Explanation
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>
              {(currentQuestion.goldenRule || currentQuestion.institutionalRule) && (
                <div className="text-[11px] font-mono text-amber-300/90 pt-1">
                  Reference: "{currentQuestion.goldenRule || currentQuestion.institutionalRule}"
                </div>
              )}
            </div>
          )}

          {/* Footer Controls */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <span>{currentIndex < filteredQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
