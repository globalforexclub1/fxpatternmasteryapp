import React, { useState, useEffect } from 'react';
import { GlobalForexClubLogo } from './components/GlobalForexClubLogo.tsx';
import { Navbar } from './components/Navbar.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { LeadCapturePage } from './components/LeadCapturePage.tsx';
import { PatternCard } from './components/PatternCard.tsx';
import { PatternModal } from './components/PatternModal.tsx';
import { InteractiveCandleSandbox } from './components/InteractiveCandleSandbox.tsx';
import { TrendlineMasterclass } from './components/TrendlineMasterclass.tsx';
import { IndicatorVisualizer } from './components/IndicatorVisualizer.tsx';
import { PositionCalculator } from './components/PositionCalculator.tsx';
import { PsychologyHub } from './components/PsychologyHub.tsx';
import { QuizArena } from './components/QuizArena.tsx';
import { VisualPatternQuiz } from './components/VisualPatternQuiz.tsx';
import { ForexMastery } from './components/ForexMastery.tsx';
import { TradeSimulator } from './components/TradeSimulator.tsx';
import { MarketStructureMastery } from './components/MarketStructureMastery.tsx';
import { OpportunityFinderMatrix } from './components/OpportunityFinderMatrix.tsx';
import { ProgressTracker } from './components/ProgressTracker.tsx';
import { CANDLESTICK_PATTERNS, CHART_PATTERNS } from './data/patternsData.ts';
import { CandlestickPattern, ChartPattern, UserProgress } from './types.ts';
import { playSound } from './utils/audio.ts';
import confetti from 'canvas-confetti';
import { 
  Search, 
  BookOpen, 
  Layers, 
  Sparkles,
  X,
  CreditCard,
  Building2,
  Mail,
  ShieldAlert
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('FX Pattern Master Trader');
  const [selectedPattern, setSelectedPattern] = useState<CandlestickPattern | ChartPattern | null>(null);
  const [showLeadModal, setShowLeadModal] = useState<boolean>(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [biasFilter, setBiasFilter] = useState<'all' | 'bullish' | 'bearish' | 'neutral' | 'either'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Gamification Progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('patternmaster_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      xp: 120,
      level: 2,
      badges: ['first-steps'],
      masteredPatterns: ['hammer', 'bullish-engulfing'],
      streakDays: 3,
      quizzesTaken: 4,
      quizzesPassed: 4,
      lastActiveDate: new Date().toISOString()
    };
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const leadModalRef = React.useRef<HTMLDivElement>(null);

  // Set history scrollRestoration to manual to prevent browser from retaining previous scroll offsets
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Centralized tab navigation function that ensures the target page always opens at the top/header section
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  // Scroll window to top whenever activeTab changes from any source or component
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const rId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(rId);
  }, [activeTab]);

  // Ensure enrollment modal container opens at top when shown
  useEffect(() => {
    if (showLeadModal && leadModalRef.current) {
      leadModalRef.current.scrollTop = 0;
    }
  }, [showLeadModal]);

  useEffect(() => {
    localStorage.setItem('patternmaster_progress', JSON.stringify(progress));
  }, [progress]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addXp = (amount: number) => {
    setProgress(prev => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      if (newXp >= 1500) newLevel = 6;
      else if (newXp >= 900) newLevel = 5;
      else if (newXp >= 500) newLevel = 4;
      else if (newXp >= 250) newLevel = 3;
      else if (newXp >= 100) newLevel = 2;

      if (newLevel > prev.level) {
        playSound('levelup', soundEnabled);
        confetti({ particleCount: 70, spread: 60 });
        showToast(`🎉 Level Up! You reached Level ${newLevel}!`);
      } else {
        showToast(`+${amount} XP Gained!`);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  const earnBadge = (badgeId: string) => {
    if (progress.badges.includes(badgeId)) return;
    setProgress(prev => ({
      ...prev,
      badges: [...prev.badges, badgeId]
    }));
    playSound('badge', soundEnabled);
    showToast(`🏆 New Milestone Badge Unlocked!`);
  };

  const toggleMasteredPattern = (patternId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isAlreadyMastered = progress.masteredPatterns.includes(patternId);

    if (isAlreadyMastered) {
      setProgress(prev => ({
        ...prev,
        masteredPatterns: prev.masteredPatterns.filter(id => id !== patternId)
      }));
    } else {
      setProgress(prev => ({
        ...prev,
        masteredPatterns: [...prev.masteredPatterns, patternId]
      }));
      playSound('correct', soundEnabled);
      addXp(25);
      showToast(`Mastered Pattern! +25 XP`);
    }
  };

  const updateQuizStats = (correct: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizzesTaken: prev.quizzesTaken + total,
      quizzesPassed: prev.quizzesPassed + correct
    }));
  };

  // Filtered Candlestick patterns
  const filteredCandles = CANDLESTICK_PATTERNS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBias = biasFilter === 'all' || p.bias === biasFilter;
    const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesBias && matchesDifficulty;
  });

  // Filtered Chart patterns
  const filteredCharts = CHART_PATTERNS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBias = biasFilter === 'all' || p.bias === biasFilter;
    const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesBias && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        progress={progress}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenEnrollment={() => setShowLeadModal(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* VIEW 0: LANDING PAGE */}
        {activeTab === 'landing' && (
          <LandingPage
            onExploreTerminal={() => handleTabChange('candlesticks')}
            onOpenLeadCapture={() => setShowLeadModal(true)}
            onSelectTab={(tabId) => handleTabChange(tabId)}
          />
        )}

        {/* VIEW: LEAD CAPTURE & PAYMENT PAGE */}
        {activeTab === 'lead-capture' && (
          <LeadCapturePage
            onSuccessEnter={(name) => {
              if (name) setUserName(name);
              handleTabChange('candlesticks');
              showToast(`Welcome to FX Pattern Master, ${name}!`);
            }}
          />
        )}

        {/* VIEW 1: CANDLESTICK PATTERNS */}
        {activeTab === 'candlesticks' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  14 JAPANESE CANDLESTICK REVERSALS
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Master Candlestick Anatomy &amp; Reversals
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every candlestick tells a psychological story between buyers and sellers. Identify rejections, engulfing dominance, and multi-candle clusters with complete precision.
                </p>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[240px] max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Candlesticks (e.g. Hammer, Engulfing, Doji)..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              {/* Bias Filters */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Bias:</span>
                {[
                  { id: 'all', label: 'All' },
                  { id: 'bullish', label: 'Bullish' },
                  { id: 'bearish', label: 'Bearish' },
                  { id: 'neutral', label: 'Reversal/Indecision' }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBiasFilter(b.id as any)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      biasFilter === b.id
                        ? 'bg-cyan-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCandles.map(pattern => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  onSelect={(p) => setSelectedPattern(p)}
                  isMastered={progress.masteredPatterns.includes(pattern.id)}
                  onToggleMastered={toggleMasteredPattern}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: CHART PATTERNS */}
        {activeTab === 'chart-patterns' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  12 INSTITUTIONAL CHART PATTERNS
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  High-Probability Chart Formations
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Triangles, Head &amp; Shoulders, Double Tops/Bottoms, and Flags. Learn exact measured moves, breakout confirmation, and timeframe execution rules.
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="relative flex-1 min-w-[240px] max-w-md">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Chart Patterns (e.g. Triangle, Flag, Wedge)..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Patterns' },
                  { id: 'bullish', label: 'Bullish' },
                  { id: 'bearish', label: 'Bearish' },
                  { id: 'either', label: 'Bilateral / Symmetrical' }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBiasFilter(b.id as any)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      biasFilter === b.id
                        ? 'bg-cyan-600 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Pattern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCharts.map(pattern => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  onSelect={(p) => setSelectedPattern(p)}
                  isMastered={progress.masteredPatterns.includes(pattern.id)}
                  onToggleMastered={toggleMasteredPattern}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW: OPPORTUNITY FINDER & WHEN TO ENTER/EXIT MATRIX */}
        {activeTab === 'entry-exit-matrix' && <OpportunityFinderMatrix />}

        {/* VIEW 3: INSTITUTIONAL FOREX PRO MASTERY */}
        {activeTab === 'forex-mastery' && <ForexMastery />}

        {/* VIEW 4: INTERACTIVE TRADE SIMULATOR */}
        {activeTab === 'trade-sim' && (
          <TradeSimulator onAddXp={addXp} soundEnabled={soundEnabled} />
        )}

        {/* VIEW 5: DEDICATED VISUAL PATTERN RECOGNITION QUIZ */}
        {activeTab === 'visual-quiz' && (
          <VisualPatternQuiz
            onAddXp={addXp}
            onUpdateQuizStats={updateQuizStats}
            soundEnabled={soundEnabled}
          />
        )}

        {/* VIEW 6: MARKET STRUCTURE, BOS, CHOCH & LIQUIDITY */}
        {activeTab === 'market-structure' && (
          <MarketStructureMastery
            onAddXp={addXp}
            soundEnabled={soundEnabled}
          />
        )}

        {/* VIEW 7: CANDLESTICK LAB (SANDBOX) */}
        {activeTab === 'candle-lab' && <InteractiveCandleSandbox />}

        {/* VIEW 8: TRENDLINES & PRICE ACTION */}
        {activeTab === 'trendlines' && <TrendlineMasterclass />}

        {/* VIEW 9: INDICATORS & 4EMA */}
        {activeTab === 'indicators' && <IndicatorVisualizer />}

        {/* VIEW 10: POSITION CALCULATOR */}
        {activeTab === 'calculator' && <PositionCalculator />}

        {/* VIEW 11: TRADING PSYCHOLOGY */}
        {activeTab === 'psychology' && (
          <PsychologyHub onEarnBadge={earnBadge} onAddXp={addXp} />
        )}

        {/* VIEW 12: QUIZ ARENA */}
        {activeTab === 'quiz' && (
          <QuizArena
            onAddXp={addXp}
            onUpdateQuizStats={updateQuizStats}
            soundEnabled={soundEnabled}
          />
        )}

        {/* VIEW 13: PROGRESS & MILESTONES */}
        {activeTab === 'milestones' && (
          <ProgressTracker
            progress={progress}
            userName={userName}
            setUserName={setUserName}
          />
        )}
      </main>

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <PatternModal
          pattern={selectedPattern}
          onClose={() => setSelectedPattern(null)}
          isMastered={progress.masteredPatterns.includes(selectedPattern.id)}
          onToggleMastered={toggleMasteredPattern}
        />
      )}

      {/* Enrollment & Payment Modal */}
      {showLeadModal && (
        <div 
          ref={leadModalRef}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
        >
          <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <LeadCapturePage
              onSuccessEnter={(name) => {
                if (name) setUserName(name);
                setShowLeadModal(false);
                handleTabChange('candlesticks');
                showToast(`Welcome to FX Pattern Master, ${name}!`);
              }}
              onClose={() => setShowLeadModal(false)}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/50 text-white px-4 py-3 rounded-xl shadow-2xl shadow-cyan-500/10 flex items-center gap-3 animate-slideUp">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500 space-y-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex justify-center pb-1">
            <div 
              onClick={() => handleTabChange('landing')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              title="Return to top overview"
            >
              <GlobalForexClubLogo variant="compact" showSlogan={true} />
            </div>
          </div>

          <p className="font-bold text-slate-300 text-sm tracking-tight">
            FX Pattern Master — Institutional Technical Analysis &amp; Capital Defense Academy
          </p>

          {/* Quick Curriculum Navigation Links (All Open at Header/Top) */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] font-mono py-1.5 text-slate-400">
            <button onClick={() => handleTabChange('landing')} className="hover:text-cyan-400 transition-colors cursor-pointer">Overview</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('candlesticks')} className="hover:text-emerald-400 transition-colors cursor-pointer">14 Candlesticks</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('chart-patterns')} className="hover:text-cyan-400 transition-colors cursor-pointer">12 Chart Patterns</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('entry-exit-matrix')} className="hover:text-indigo-400 transition-colors cursor-pointer">When to Enter &amp; Exit</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('market-structure')} className="hover:text-purple-400 transition-colors cursor-pointer">BOS &amp; Order Flow</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('trade-sim')} className="hover:text-amber-400 transition-colors cursor-pointer">Trade Simulator</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('calculator')} className="hover:text-rose-400 transition-colors cursor-pointer">Position Sizer</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('visual-quiz')} className="hover:text-cyan-400 transition-colors cursor-pointer">Visual Quiz</button>
            <span className="text-slate-700">·</span>
            <button onClick={() => handleTabChange('milestones')} className="hover:text-emerald-400 transition-colors cursor-pointer">Trader Rank &amp; XP</button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-400 inline" />
              <span>Office: ATL Resource Hub, 32 Grosvenor Avenue, Avondale, Atlantis, Cape Town, South Africa</span>
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-cyan-400 inline" />
              <span>Admin: info@globalforexclub.co.za</span>
            </span>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-[11px] font-mono text-slate-300 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-emerald-400 font-bold">Africa's Best 100% FREE Resource</span>
            <span className="text-slate-600">·</span>
            <a href="https://globalforexclub.co.za" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-bold">
              Premium FX Mastery Workshops: globalforexclub.co.za ↗
            </a>
            <span className="text-slate-600">·</span>
            <a href="mailto:info@globalforexclub.co.za" className="text-emerald-400 hover:underline">
              info@globalforexclub.co.za
            </a>
          </div>

          <div className="space-y-0.5 pt-1">
            <p className="text-slate-400 text-xs">
              Educational Curriculum &amp; Presentation Architecture by <strong className="text-slate-200">Global Forex Club</strong>. All Rights Reserved. 100% Free Open Technical Resource.
            </p>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider">
              App designed by C.J.Nicholas
            </p>
          </div>

          <p className="text-[11px] text-slate-600 max-w-3xl mx-auto leading-relaxed pt-1">
            <strong>Important Regulatory Notice:</strong> We are NOT financial advisors. All educational content, candlestick formations, chart patterns, market structures, simulators, and mathematical calculators within FX Pattern Master are provided strictly for educational and simulation purposes. None of our material constitutes financial, investment, or trading advice. Trading forex and leveraged financial assets carries high risk of capital loss. Always adhere to strict 1-2% position size risk management.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
