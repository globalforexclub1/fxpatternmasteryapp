import React, { useState, useEffect, useRef } from 'react';
import { 
  MARKET_STRUCTURE_CONCEPTS, 
  SL_TP_MASTER_RULES, 
  STRUCTURE_QUIZ_QUESTIONS,
  MarketConcept 
} from '../data/marketStructureData.ts';
import { 
  GitCommit, 
  RefreshCw, 
  Coins, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Target, 
  DollarSign, 
  Zap,
  Info,
  ChevronRight,
  BookOpen,
  Sliders,
  Check,
  Compass,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio.ts';
import { OpportunityFinderMatrix } from './OpportunityFinderMatrix.tsx';

interface MarketStructureMasteryProps {
  onAddXp: (amount: number) => void;
  soundEnabled?: boolean;
}

const ConceptExecutionPlaybook: React.FC<{ concept: MarketConcept }> = ({ concept }) => {
  const { entryExitPlaybook } = concept;
  if (!entryExitPlaybook) return null;
  return (
    <div className="bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
              Action Blueprint: How & When to Trade {concept.shortTitle}
            </h3>
            <p className="text-xs text-slate-400">
              Precise entry triggers, structural stop placement, and profit taking formulas.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          Institutional Technical Playbook
        </span>
      </div>

      {/* Spotting the opportunity */}
      <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase font-mono">
          <Compass className="w-3.5 h-3.5" />
          How to Spot This Opportunity Ahead of Time
        </div>
        <ul className="space-y-1">
          {entryExitPlaybook.howToSpotOpportunity.map((item, idx) => (
            <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
              <span className="text-cyan-400 font-bold shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* When to Enter & When to Exit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WHEN TO ENTER */}
        <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
            <ArrowRight className="w-4 h-4" />
            When Exactly to Enter (The Trigger)
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <strong className="text-slate-200 block font-mono">Ideal Trigger:</strong>
              <p className="text-slate-300 leading-relaxed">{entryExitPlaybook.whenToEnter.idealTrigger}</p>
            </div>
            <div>
              <strong className="text-slate-200 block font-mono">Confirmation Candle:</strong>
              <p className="text-slate-300 leading-relaxed">{entryExitPlaybook.whenToEnter.confirmationCandle}</p>
            </div>
            <div>
              <strong className="text-slate-200 block font-mono">Limit Strategy:</strong>
              <p className="text-cyan-300 font-mono">{entryExitPlaybook.whenToEnter.limitOrderStrategy}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
              <strong>⚠️ DO NOT ENTER IF:</strong> {entryExitPlaybook.whenToEnter.invalidBeforeEntryIf}
            </div>
          </div>
        </div>

        {/* WHEN TO EXIT */}
        <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono">
            <Target className="w-4 h-4" />
            When Exactly to Exit (Profit & Loss Boundaries)
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <strong className="text-emerald-400 block font-mono">Take Profit 1 (Scale 50% & Breakeven):</strong>
              <p className="text-slate-300 leading-relaxed">{entryExitPlaybook.whenToExit.takeProfit1}</p>
            </div>
            <div>
              <strong className="text-cyan-400 block font-mono">Take Profit 2 (Macro Runner Target):</strong>
              <p className="text-slate-300 leading-relaxed">{entryExitPlaybook.whenToExit.takeProfit2}</p>
            </div>
            <div>
              <strong className="text-rose-400 block font-mono">Stop Loss Invalidation Anchor:</strong>
              <p className="text-slate-300 leading-relaxed">{entryExitPlaybook.whenToExit.stopLossPlacement}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
              <strong>🚨 EMERGENCY EARLY EXIT:</strong> {entryExitPlaybook.whenToExit.earlyExitWarning}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MarketStructureMastery: React.FC<MarketStructureMasteryProps> = ({
  onAddXp,
  soundEnabled = true
}) => {
  const [activeTab, setActiveTab] = useState<'bos' | 'choch' | 'fvg' | 'liquidity' | 'matrix' | 'sltp_guide' | 'structure_quiz'>('bos');
  const navPillsRef = useRef<HTMLDivElement>(null);

  // Animation Step States for BOS, CHOCH, and Liquidity
  const [animStep, setAnimStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // SL/TP Interactive Simulation State
  const [slStrategy, setSlStrategy] = useState<'tight_rookie' | 'pro_structural'>('pro_structural');
  const [spreadSize, setSpreadSize] = useState<number>(2.5); // pips
  const [simOutcome, setSimOutcome] = useState<'idle' | 'stopped_out' | 'tp_hit'>('idle');

  // Quiz State
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizDone, setQuizDone] = useState<boolean>(false);

  // Auto-play interval for animations
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setAnimStep(prev => (prev >= 4 ? 1 : prev + 1));
      }, 3200);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleRestartAnim = () => {
    setAnimStep(1);
    setIsPlaying(true);
  };

  const currentConcept = MARKET_STRUCTURE_CONCEPTS[activeTab] || MARKET_STRUCTURE_CONCEPTS['bos'];

  // Handle Quiz Submission
  const handleQuizAnswer = (optionIdx: number) => {
    if (isQuizAnswered) return;
    setSelectedQuizOption(optionIdx);
    setIsQuizAnswered(true);

    const q = STRUCTURE_QUIZ_QUESTIONS[quizIdx];
    const isCorrect = optionIdx === q.correctIndex;
    if (isCorrect) {
      playSound('correct', soundEnabled);
      setQuizScore(prev => prev + 1);
      onAddXp(25);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx < STRUCTURE_QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(prev => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizAnswered(false);
    } else {
      setQuizDone(true);
      if (quizScore >= 3) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setSelectedQuizOption(null);
    setIsQuizAnswered(false);
    setQuizScore(0);
    setQuizDone(false);
  };

  // Run SL/TP simulation
  const runSlTpSimulation = () => {
    setSimOutcome('idle');
    playSound('click', soundEnabled);
    setTimeout(() => {
      if (slStrategy === 'tight_rookie') {
        // Tight stop gets hunted by spread & noise!
        setSimOutcome('stopped_out');
        playSound('wrong', soundEnabled);
      } else {
        // Pro stop survives the spread noise and hits full Take Profit!
        setSimOutcome('tp_hit');
        playSound('correct', soundEnabled);
        confetti({ particleCount: 50, spread: 60 });
        onAddXp(30);
      }
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 md:p-8 rounded-2xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Smart Money Concepts & Order Book Economics
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Market Structure, BOS, CHOCH & Liquidity
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Demystify how central banks and institutional algorithms drive financial markets. Master Break of Structure (BOS), Change of Character (CHOCH), retail liquidity traps, and animated Stop Loss & Take Profit geometry.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <div className="px-4 py-2 bg-slate-950/80 rounded-xl border border-indigo-500/30 flex items-center gap-2.5">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white">Trend Verification: BOS</span>
            </div>
            <div className="px-4 py-2 bg-slate-950/80 rounded-xl border border-rose-500/30 flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono font-bold text-white">Trend Shift: CHOCH</span>
            </div>
            <div className="px-4 py-2 bg-slate-950/80 rounded-xl border border-amber-500/30 flex items-center gap-2.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white">Market Fuel: Liquidity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div ref={navPillsRef} className="flex flex-wrap items-center gap-2 p-2 bg-slate-900/90 rounded-2xl border border-slate-800">
        {[
          { id: 'bos', label: '1. Break of Structure (BOS)', icon: GitCommit, color: 'text-cyan-400' },
          { id: 'choch', label: '2. Change of Character (CHOCH)', icon: RefreshCw, color: 'text-rose-400' },
          { id: 'fvg', label: '3. Fair Value Gaps (FVG)', icon: Layers, color: 'text-amber-400' },
          { id: 'liquidity', label: '4. Liquidity & Stop Hunts', icon: Coins, color: 'text-emerald-400' },
          { id: 'matrix', label: '5. When to Enter & Exit Blueprint', icon: Compass, color: 'text-cyan-400' },
          { id: 'sltp_guide', label: '6. SL & TP Geometry Guide', icon: Target, color: 'text-indigo-400' },
          { id: 'structure_quiz', label: '7. Knowledge Check', icon: ShieldAlert, color: 'text-purple-400' }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as any);
                setAnimStep(1);
                setIsPlaying(true);
                if (navPillsRef.current) {
                  const rect = navPillsRef.current.getBoundingClientRect();
                  if (rect.top < 70) {
                    window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'instant' });
                  }
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : t.color}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BREAK OF STRUCTURE (BOS) */}
      {activeTab === 'bos' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Animated Chart Canvas */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/30">
                    ANIMATED STEP {animStep}/4
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    Bullish Break of Structure (BOS) Evolution
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Observe how institutional volume dispatches price cleanly through the swing high with a firm body close.
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={handleRestartAnim}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Restart</span>
                </button>
              </div>
            </div>

            {/* SVG Animated Chart Viewport */}
            <div className="w-full h-80 bg-slate-950 rounded-xl border border-slate-800/80 relative overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 600 240" className="w-full h-full">
                <defs>
                  <linearGradient id="bosLineGlow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="demandZone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="60" x2="600" y2="600" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2="600" y2="180" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Base Swing High Reference Line */}
                <line x1="120" y1="110" x2="580" y2="110" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 4" />
                <text x="130" y="103" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  SWING HIGH REFERENCE LEVEL (1.0850)
                </text>

                {/* CANDLE 1 & 2: Prior Swing High Formation (Always Visible) */}
                {/* Candle 1 (Green) */}
                <line x1="80" y1="160" x2="80" y2="120" stroke="#10b981" strokeWidth="2" />
                <rect x="73" y="130" width="14" height="25" fill="#10b981" rx="2" />
                {/* Candle 2 - The Swing High Peak (Green into Red) */}
                <line x1="120" y1="110" x2="120" y2="165" stroke="#10b981" strokeWidth="2" />
                <rect x="113" y="118" width="14" height="35" fill="#10b981" rx="2" />
                <text x="110" y="95" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  High (HH)
                </text>

                {/* Candle 3 & 4: Pullback to form Higher Low (HL) */}
                <line x1="160" y1="135" x2="160" y2="185" stroke="#ef4444" strokeWidth="2" />
                <rect x="153" y="145" width="14" height="30" fill="#ef4444" rx="2" />
                <line x1="200" y1="160" x2="200" y2="200" stroke="#ef4444" strokeWidth="2" />
                <rect x="193" y="165" width="14" height="25" fill="#ef4444" rx="2" />
                <text x="200" y="218" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Higher Low (HL)
                </text>

                {/* Demand Zone / Order Block at Higher Low */}
                <rect x="180" y="165" width="380" height="35" fill="url(#demandZone)" rx="4" />
                <text x="320" y="187" fill="#10b981" fontSize="9" fontFamily="monospace" opacity="0.8">
                  Institutional Demand Zone / Discount OB
                </text>

                {/* STEP 2: Impulse Leg Re-approaches High */}
                {animStep >= 2 && (
                  <g className="animate-fadeIn">
                    <line x1="240" y1="130" x2="240" y2="180" stroke="#10b981" strokeWidth="2" />
                    <rect x="233" y="135" width="14" height="35" fill="#10b981" rx="2" />
                    <line x1="280" y1="108" x2="280" y2="155" stroke="#10b981" strokeWidth="2" />
                    <rect x="273" y="112" width="14" height="35" fill="#10b981" rx="2" />
                  </g>
                )}

                {/* STEP 3: THE DISPLACEMENT BREAK OF STRUCTURE (BOS) */}
                {animStep >= 3 && (
                  <g className="animate-fadeIn">
                    {/* Giant Bullish Displacement Candle closing ABOVE line */}
                    <line x1="330" y1="50" x2="330" y2="130" stroke="#10b981" strokeWidth="3" />
                    <rect x="320" y="55" width="20" height="60" fill="#10b981" stroke="#34d399" strokeWidth="2" rx="3" />
                    
                    {/* BOS Stamp Marker */}
                    <rect x="348" y="70" width="120" height="24" fill="#0284c7" rx="6" />
                    <text x="408" y="86" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      VALID BOS (Close)
                    </text>
                    <line x1="335" y1="82" x2="348" y2="82" stroke="#0284c7" strokeWidth="2" />

                    {/* Checkmark indicator */}
                    <circle cx="330" cy="40" r="8" fill="#10b981" />
                    <text x="330" y="44" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">✓</text>
                  </g>
                )}

                {/* STEP 4: Retracement to Institutional Order Block & Entry Confirmation */}
                {animStep >= 4 && (
                  <g className="animate-fadeIn">
                    {/* Higher High print */}
                    <line x1="375" y1="42" x2="375" y2="90" stroke="#10b981" strokeWidth="2" />
                    <rect x="368" y="48" width="14" height="30" fill="#10b981" rx="2" />
                    <text x="375" y="32" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      New Higher High (HH)
                    </text>

                    {/* Retracement candles */}
                    <line x1="420" y1="55" x2="420" y2="105" stroke="#ef4444" strokeWidth="2" />
                    <rect x="413" y="65" width="14" height="30" fill="#ef4444" rx="2" />

                    {/* Pullback into Prior Broken Resistance / Demand Flip */}
                    <line x1="460" y1="95" x2="460" y2="135" stroke="#10b981" strokeWidth="2" />
                    <rect x="453" y="102" width="14" height="20" fill="#10b981" rx="2" />

                    {/* Target Entry Arrow */}
                    <circle cx="460" cy="112" r="10" fill="#06b6d4" className="animate-ping" />
                    <circle cx="460" cy="112" r="8" fill="#06b6d4" />
                    <text x="495" y="116" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      PRO RETEST ENTRY
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Step Description Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {[
                { step: 1, title: 'Establish Structure', desc: 'Identify previous Swing High and Higher Low. Mark the reference line.' },
                { step: 2, title: 'Institutional Expansion', desc: 'Price approaches previous high with strong momentum candles.' },
                { step: 3, title: 'Confirmed BOS (Close)', desc: 'Candle BODY closes cleanly above the swing high line. NOT just a wick!' },
                { step: 4, title: 'Discount Retest Entry', desc: 'Wait for price to pull back to the demand zone before executing the trade.' }
              ].map(s => (
                <div
                  key={s.step}
                  onClick={() => {
                    setAnimStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    animStep === s.step
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      animStep === s.step ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {s.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Dive Breakdown: Beginner Explanation & Advanced Terminology */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Beginner Explanation */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Beginner Plain-English Analogy</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentConcept.beginnerExplanation}
              </p>
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 space-y-1">
                <span className="font-bold uppercase tracking-wider block font-mono">Master Rule of Thumb</span>
                <p>"{currentConcept.institutionalGoldenRule}"</p>
              </div>
            </div>

            {/* Advanced Terminology Deconstructed */}
            <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Zap className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Institutional Smart Money Terminology Deconstructed</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentConcept.advancedTerminology.map((term, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-300 font-mono">{term.term}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{term.definition}</p>
                    <div className="pt-2 border-t border-slate-800/60 text-[11px] text-amber-300/90 italic">
                      💡 Metaphor: {term.plainEnglishMetaphor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Economics of BOS: Why does it happen? */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 md:p-8 rounded-2xl border border-indigo-500/20 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                ECONOMIC ROOT CAUSE ANALYSIS
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {currentConcept.economicPerspective.heading}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                  1. Central Order Book & Imbalance Dynamics
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentConcept.economicPerspective.coreMechanism}
                </p>
                <div className="pt-2 text-xs text-slate-400">
                  {currentConcept.economicPerspective.orderBookDynamics}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
                  2. Institutional Behavior & The Retail Trap
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentConcept.economicPerspective.institutionalBehavior}
                </p>
                <div className="pt-2 text-xs text-amber-300/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  ⚠️ Trap Exposed: {currentConcept.economicPerspective.retailTrapExposed}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                How to Successfully Identify BOS on Live Charts
              </h4>
              <ul className="space-y-2">
                {currentConcept.howToIdentifyChecklist.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precision Entry & Exit Blueprint for BOS */}
            <div className="lg:col-span-3">
              <ConceptExecutionPlaybook concept={MARKET_STRUCTURE_CONCEPTS['bos']} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHANGE OF CHARACTER (CHOCH) */}
      {activeTab === 'choch' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Animated Chart Canvas for CHOCH */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-xs font-mono font-bold border border-rose-500/30">
                    ANIMATED STEP {animStep}/4
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    Bearish Change of Character (CHOCH) Evolution
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Watch how the market transitions from an uptrend into a downtrend by shattering the last key Higher Low.
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={handleRestartAnim}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Restart</span>
                </button>
              </div>
            </div>

            {/* SVG Animated Chart Viewport for CHOCH */}
            <div className="w-full h-80 bg-slate-950 rounded-xl border border-slate-800/80 relative overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 600 240" className="w-full h-full">
                <defs>
                  <linearGradient id="chochSupplyZone" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                <line x1="0" y1="60" x2="600" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2="600" y2="180" stroke="#1e293b" strokeDasharray="3 3" />

                {/* CRITICAL REFERENCE LINE: Last Higher Low */}
                <line x1="160" y1="150" x2="580" y2="150" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 4" />
                <text x="170" y="165" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  LAST KEY HIGHER LOW (INVALIDATION LINE)
                </text>

                {/* PHASE 1: Previous Uptrend Leg */}
                {/* Swing 1 */}
                <line x1="80" y1="140" x2="80" y2="90" stroke="#10b981" strokeWidth="2" />
                <rect x="73" y="100" width="14" height="35" fill="#10b981" rx="2" />
                {/* Last Valid Higher Low (HL) */}
                <line x1="140" y1="120" x2="140" y2="150" stroke="#ef4444" strokeWidth="2" />
                <rect x="133" y="125" width="14" height="22" fill="#ef4444" rx="2" />
                <text x="140" y="170" fill="#10b981" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Higher Low
                </text>

                {/* The Final Exhaustion High */}
                <line x1="200" y1="60" x2="200" y2="135" stroke="#10b981" strokeWidth="2" />
                <rect x="193" y="70" width="14" height="50" fill="#10b981" rx="2" />
                <text x="200" y="50" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Final High (HH)
                </text>

                {/* PHASE 2: Weak Rally / Failure to make new HH */}
                {animStep >= 2 && (
                  <g className="animate-fadeIn">
                    <line x1="250" y1="75" x2="250" y2="120" stroke="#ef4444" strokeWidth="2" />
                    <rect x="243" y="85" width="14" height="30" fill="#ef4444" rx="2" />
                    <line x1="290" y1="78" x2="290" y2="115" stroke="#10b981" strokeWidth="2" />
                    <rect x="283" y="82" width="14" height="20" fill="#10b981" rx="2" />
                    <text x="290" y="68" fill="#f59e0b" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Lower High (Failure)
                    </text>
                  </g>
                )}

                {/* PHASE 3: THE CHOCH BREAKDOWN (Violating the Last HL) */}
                {animStep >= 3 && (
                  <g className="animate-fadeIn">
                    {/* Heavy Bearish Displacement Candle crashing through line */}
                    <line x1="350" y1="90" x2="350" y2="210" stroke="#ef4444" strokeWidth="3" />
                    <rect x="340" y="110" width="20" height="90" fill="#ef4444" stroke="#f87171" strokeWidth="2" rx="3" />

                    {/* CHOCH Stamp */}
                    <rect x="375" y="138" width="130" height="24" fill="#dc2626" rx="6" />
                    <text x="440" y="154" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      BEARISH CHOCH ⚡
                    </text>
                    <line x1="360" y1="150" x2="375" y2="150" stroke="#dc2626" strokeWidth="2" />

                    {/* Supply Zone / Bearish Order Block created by the drop */}
                    <rect x="320" y="75" width="260" height="35" fill="url(#chochSupplyZone)" rx="4" />
                    <text x="420" y="96" fill="#ef4444" fontSize="9" fontFamily="monospace">
                      Bearish Premium Supply Zone (Order Block)
                    </text>
                  </g>
                )}

                {/* PHASE 4: Retest into Bearish Supply & Downward Continuation */}
                {animStep >= 4 && (
                  <g className="animate-fadeIn">
                    {/* Retracement candle into supply zone */}
                    <line x1="430" y1="80" x2="430" y2="170" stroke="#10b981" strokeWidth="2" />
                    <rect x="423" y="85" width="14" height="30" fill="#10b981" rx="2" />

                    {/* Institutional Short Entry Point */}
                    <circle cx="430" cy="85" r="10" fill="#ef4444" className="animate-ping" />
                    <circle cx="430" cy="85" r="8" fill="#ef4444" />
                    <text x="455" y="78" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      PRO SHORT ENTRY
                    </text>

                    {/* Subsequent collapse */}
                    <line x1="500" y1="95" x2="500" y2="225" stroke="#ef4444" strokeWidth="2" />
                    <rect x="493" y="120" width="14" height="95" fill="#ef4444" rx="2" />
                    <text x="500" y="235" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      Lower Low (LL)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Step Description Cards for CHOCH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {[
                { step: 1, title: 'Mark Last Higher Low', desc: 'Find the lowest point of the pullback that created the highest peak.' },
                { step: 2, title: 'Failure Swing Prints', desc: 'Bulls fail to push to a new high, showing exhaustion and seller absorption.' },
                { step: 3, title: 'CHOCH Breakdown', desc: 'Displacement candle aggressively CLOSES below the last Higher Low.' },
                { step: 4, title: 'Retest Bearish Supply', desc: 'Wait for price to retrace to the newly minted Order Block to execute short.' }
              ].map(s => (
                <div
                  key={s.step}
                  onClick={() => {
                    setAnimStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    animStep === s.step
                      ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      animStep === s.step ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {s.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Dive Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Beginner Plain-English Analogy</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {MARKET_STRUCTURE_CONCEPTS['choch'].beginnerExplanation}
              </p>
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                <span className="font-bold uppercase tracking-wider block font-mono">Master Golden Rule</span>
                <p>"{MARKET_STRUCTURE_CONCEPTS['choch'].institutionalGoldenRule}"</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400">
                <Zap className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Institutional Smart Money Terminology Deconstructed</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MARKET_STRUCTURE_CONCEPTS['choch'].advancedTerminology.map((term, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-bold text-rose-300 font-mono">{term.term}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{term.definition}</p>
                    <div className="pt-2 border-t border-slate-800/60 text-[11px] text-amber-300/90 italic">
                      💡 Metaphor: {term.plainEnglishMetaphor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Economics of CHOCH */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 p-6 md:p-8 rounded-2xl border border-rose-500/20 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                ECONOMIC ROOT CAUSE: DISTRIBUTION & REGIME CHANGE
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {MARKET_STRUCTURE_CONCEPTS['choch'].economicPerspective.heading}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
                  The Wyckoff Markup-to-Distribution Shift
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {MARKET_STRUCTURE_CONCEPTS['choch'].economicPerspective.coreMechanism}
                </p>
                <div className="pt-2 text-xs text-slate-400">
                  {MARKET_STRUCTURE_CONCEPTS['choch'].economicPerspective.orderBookDynamics}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
                  How Retail "Dip-Buyers" Become Exit Liquidity
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {MARKET_STRUCTURE_CONCEPTS['choch'].economicPerspective.institutionalBehavior}
                </p>
                <div className="pt-2 text-xs text-amber-300/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  ⚠️ Trap Exposed: {MARKET_STRUCTURE_CONCEPTS['choch'].economicPerspective.retailTrapExposed}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                How to Successfully Identify CHOCH on Live Charts
              </h4>
              <ul className="space-y-2">
                {MARKET_STRUCTURE_CONCEPTS['choch'].howToIdentifyChecklist.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precision Entry & Exit Blueprint for CHOCH */}
            <div className="lg:col-span-3">
              <ConceptExecutionPlaybook concept={MARKET_STRUCTURE_CONCEPTS['choch']} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAIR VALUE GAPS (FVG) & IMBALANCE */}
      {activeTab === 'fvg' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Animated Chart Canvas for FVG */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                    ANIMATED STEP {animStep}/4
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    Bullish Fair Value Gap (FVG) & 50% CE Rebalance
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Observe how an institutional displacement leaves an inefficient 3-candle void, and how price acts like a magnet to rebalance the 50% Consequent Encroachment (CE).
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={handleRestartAnim}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Restart</span>
                </button>
              </div>
            </div>

            {/* SVG Canvas */}
            <div className="relative">
              <svg viewBox="0 0 800 320" className="w-full h-72 md:h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                <defs>
                  <pattern id="grid-fvg-dyn" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.4" />
                  </pattern>
                  <linearGradient id="fvg-zone-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-fvg-dyn)" />

                {/* Price Axis Labels */}
                <g opacity="0.5" fontSize="10" fontFamily="monospace" fill="#94a3b8">
                  <text x="740" y="65">1.0890</text>
                  <text x="740" y="115">1.0870 (C3 Low)</text>
                  <text x="740" y="150">1.0850 (50% CE)</text>
                  <text x="740" y="185">1.0830 (C1 High)</text>
                  <text x="740" y="250">1.0800</text>
                </g>

                {/* Step 1: Candle 1 */}
                <g>
                  <line x1="140" y1="180" x2="140" y2="260" stroke="#10b981" strokeWidth="2" />
                  <rect x="125" y="200" width="30" height="50" rx="2" fill="#10b981" />
                  <text x="140" y="275" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">Candle 1</text>
                  <line x1="140" y1="180" x2="720" y2="180" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <text x="160" y="176" fill="#fbbf24" fontSize="10" fontFamily="monospace">Candle 1 Upper Wick (1.0830)</text>
                </g>

                {/* Step 2: Candle 2 (Displacement) */}
                {animStep >= 2 && (
                  <g className="animate-fadeIn">
                    <line x1="240" y1="85" x2="240" y2="215" stroke="#10b981" strokeWidth="2.5" />
                    <rect x="222" y="95" width="36" height="110" rx="3" fill="#10b981" />
                    <text x="240" y="275" fill="#10b981" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">Candle 2 (Displacement)</text>
                    <rect x="270" y="125" width="135" height="22" rx="4" fill="#047857" opacity="0.85" />
                    <text x="276" y="140" fill="#ecfdf5" fontSize="10" fontFamily="monospace" fontWeight="bold">⚡ High-Volume Surge</text>
                  </g>
                )}

                {/* Step 3: Candle 3 & Fair Value Gap Box */}
                {animStep >= 3 && (
                  <g className="animate-fadeIn">
                    <line x1="340" y1="65" x2="340" y2="120" stroke="#10b981" strokeWidth="2" />
                    <rect x="325" y="75" width="30" height="35" rx="2" fill="#10b981" />
                    <text x="340" y="275" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">Candle 3</text>
                    <line x1="340" y1="120" x2="720" y2="120" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <text x="360" y="116" fill="#fbbf24" fontSize="10" fontFamily="monospace">Candle 3 Lower Wick (1.0870)</text>

                    {/* The FVG Shaded Void Box */}
                    <rect x="140" y="120" width="560" height="60" fill="url(#fvg-zone-grad)" stroke="#f59e0b" strokeWidth="1.5" rx="4" strokeDasharray="4 4" />
                    
                    {/* 50% Consequent Encroachment (CE) Line */}
                    <line x1="140" y1="150" x2="700" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
                    <rect x="420" y="140" width="180" height="20" rx="3" fill="#0284c7" opacity="0.9" />
                    <text x="425" y="154" fill="#f0f9ff" fontSize="10" fontFamily="monospace" fontWeight="bold">50% CE Equilibrium (1.0850)</text>

                    <rect x="150" y="125" width="135" height="18" rx="3" fill="#b45309" opacity="0.9" />
                    <text x="155" y="138" fill="#fef3c7" fontSize="10" fontFamily="monospace" fontWeight="bold">FAIR VALUE GAP (FVG)</text>
                  </g>
                )}

                {/* Step 4: The Retest & Precision Entry */}
                {animStep >= 4 && (
                  <g className="animate-fadeIn">
                    {/* Retest Candle (Red Pullback dropping into 50% CE) */}
                    <line x1="490" y1="95" x2="490" y2="155" stroke="#f43f5e" strokeWidth="2" />
                    <rect x="475" y="105" width="30" height="35" rx="2" fill="#f43f5e" />

                    {/* Entry Signal Hammer / Pin Bar bouncing off 50% CE */}
                    <line x1="550" y1="75" x2="550" y2="152" stroke="#10b981" strokeWidth="2.5" />
                    <rect x="535" y="80" width="30" height="25" rx="2" fill="#10b981" />
                    
                    {/* Entry Marker Pointer */}
                    <circle cx="550" cy="150" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
                    <circle cx="550" cy="150" r="5" fill="#10b981" />
                    
                    {/* Callout Box */}
                    <g transform="translate(570, 125)">
                      <rect width="185" height="58" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="10" y="18" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold">🟢 PRO LIMIT ENTRY</text>
                      <text x="10" y="34" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Filled @ 50% CE (1.0850)</text>
                      <text x="10" y="48" fill="#6ee7b7" fontSize="9" fontFamily="monospace">SL: 1.0825 | TP: 1.0920 (1:3R)</text>
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Step-by-Step Evolution Guide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {[
                { step: 1, title: 'Step 1: Anchor Candle', desc: 'Candle 1 marks the upper boundary of the initial auction phase with its highest wick.' },
                { step: 2, title: 'Step 2: Institutional Blast', desc: 'Candle 2 forms a massive green body. The speed is so aggressive that no sell limit orders get matched.' },
                { step: 3, title: 'Step 3: FVG Box Identified', desc: 'Candle 3 moves higher. The empty space between Candle 1 high and Candle 3 low is the Fair Value Gap.' },
                { step: 4, title: 'Step 4: 50% CE Rebalance', desc: 'Price acts like a magnet, returning to fill the 50% CE line where institutional limit buy orders are triggered.' }
              ].map(s => (
                <div
                  key={s.step}
                  onClick={() => {
                    setAnimStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    animStep === s.step
                      ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      animStep === s.step ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {s.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Dive Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <BookOpen className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Beginner Metaphor
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {MARKET_STRUCTURE_CONCEPTS['fvg'].beginnerExplanation}
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/20 text-xs font-mono text-amber-300">
                Golden Rule: "{MARKET_STRUCTURE_CONCEPTS['fvg'].institutionalGoldenRule}"
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Info className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  Institutional Terminology Deconstructed
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {MARKET_STRUCTURE_CONCEPTS['fvg'].advancedTerminology.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-xs font-bold text-white font-mono block text-cyan-300">
                      {item.term}
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.definition}</p>
                    <div className="text-[10px] text-slate-400 font-mono italic pt-1 border-t border-slate-800">
                      Metaphor: {item.plainEnglishMetaphor}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Economic Explanation */}
            <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  {MARKET_STRUCTURE_CONCEPTS['fvg'].economicPerspective.heading}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 font-mono uppercase">Algorithmic Delivery</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {MARKET_STRUCTURE_CONCEPTS['fvg'].economicPerspective.coreMechanism}
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    {MARKET_STRUCTURE_CONCEPTS['fvg'].economicPerspective.orderBookDynamics}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-rose-400 font-mono uppercase">Retail Trap</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {MARKET_STRUCTURE_CONCEPTS['fvg'].economicPerspective.institutionalBehavior}
                  </p>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                    ⚠️ Trap: {MARKET_STRUCTURE_CONCEPTS['fvg'].economicPerspective.retailTrapExposed}
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                How to Successfully Identify FVGs on Live Charts
              </h4>
              <ul className="space-y-2">
                {MARKET_STRUCTURE_CONCEPTS['fvg'].howToIdentifyChecklist.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precision Entry & Exit Blueprint for FVG */}
            <div className="lg:col-span-3">
              <ConceptExecutionPlaybook concept={MARKET_STRUCTURE_CONCEPTS['fvg']} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIQUIDITY CONCEPTS & STOP HUNTING ECONOMICS */}
      {activeTab === 'liquidity' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Animated Chart Canvas for Liquidity Sweep */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
                    ANIMATED STEP {animStep}/4
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    Anatomy of a Sell-Side Liquidity (SSL) Stop Hunt
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Observe how market makers engineer a double bottom to attract retail stop losses, sweep them, and launch higher.
                </p>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={handleRestartAnim}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Restart</span>
                </button>
              </div>
            </div>

            {/* SVG Animated Chart Viewport for Liquidity Sweep */}
            <div className="w-full h-80 bg-slate-950 rounded-xl border border-slate-800/80 relative overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 600 240" className="w-full h-full">
                <defs>
                  <linearGradient id="sslPoolGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Grid */}
                <line x1="0" y1="60" x2="600" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2="600" y2="180" stroke="#1e293b" strokeDasharray="3 3" />

                {/* OBVIOUS SUPPORT LINE: Equal Lows */}
                <line x1="60" y1="160" x2="580" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
                <text x="70" y="152" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  RETAIL DOUBLE BOTTOM SUPPORT (1.0800)
                </text>

                {/* LIQUIDITY POOL SHADED BOX (Resting Sell Stops) */}
                <rect x="60" y="162" width="520" height="40" fill="url(#sslPoolGlow)" rx="4" />
                <text x="300" y="185" fill="#f59e0b" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.9">
                  SELL-SIDE LIQUIDITY (SSL) POOL · RETAIL STOP LOSSES (SELL ORDERS)
                </text>

                {/* Bottom 1 */}
                <line x1="120" y1="110" x2="120" y2="160" stroke="#ef4444" strokeWidth="2" />
                <rect x="113" y="125" width="14" height="35" fill="#ef4444" rx="2" />
                <circle cx="120" cy="160" r="4" fill="#f59e0b" />
                <text x="120" y="145" fill="#e2e8f0" fontSize="9" textAnchor="middle">Low 1</text>

                {/* Bounce */}
                <line x1="170" y1="90" x2="170" y2="145" stroke="#10b981" strokeWidth="2" />
                <rect x="163" y="95" width="14" height="40" fill="#10b981" rx="2" />

                {/* Bottom 2 (Engineered Equal Lows) */}
                <line x1="220" y1="105" x2="220" y2="160" stroke="#ef4444" strokeWidth="2" />
                <rect x="213" y="120" width="14" height="40" fill="#ef4444" rx="2" />
                <circle cx="220" cy="160" r="4" fill="#f59e0b" />
                <text x="220" y="145" fill="#e2e8f0" fontSize="9" textAnchor="middle">Low 2</text>

                {/* STEP 2: The Bait - Small bounce to entice retail buyers */}
                {animStep >= 2 && (
                  <g className="animate-fadeIn">
                    <line x1="260" y1="125" x2="260" y2="160" stroke="#10b981" strokeWidth="2" />
                    <rect x="253" y="130" width="14" height="25" fill="#10b981" rx="2" />
                    <text x="260" y="118" fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                      Retail Buys Support
                    </text>
                  </g>
                )}

                {/* STEP 3: THE LIQUIDITY SWEEP (JUDAS SWING / PIN BAR) */}
                {animStep >= 3 && (
                  <g className="animate-fadeIn">
                    {/* The Long Wick Piercing the Low and Snapping Back */}
                    <line x1="310" y1="115" x2="310" y2="215" stroke="#38bdf8" strokeWidth="3" />
                    {/* Tiny green body at the top of the wick */}
                    <rect x="302" y="125" width="16" height="20" fill="#10b981" stroke="#38bdf8" strokeWidth="2" rx="2" />

                    {/* Skull / Stop Out Icon */}
                    <circle cx="310" cy="215" r="7" fill="#ef4444" className="animate-ping" />
                    <circle cx="310" cy="215" r="5" fill="#ef4444" />

                    {/* Sweep Callout */}
                    <rect x="330" y="195" width="180" height="28" fill="#78350f" rx="6" />
                    <text x="420" y="213" fill="#fde68a" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      ⚡ 10-PIP SWEEP (STOPS TRIGGERED)
                    </text>
                  </g>
                )}

                {/* STEP 4: Institutional Moonshot Displacement */}
                {animStep >= 4 && (
                  <g className="animate-fadeIn">
                    {/* Big Institutional Green Candles */}
                    <line x1="360" y1="65" x2="360" y2="135" stroke="#10b981" strokeWidth="3" />
                    <rect x="350" y="70" width="20" height="60" fill="#10b981" rx="3" />

                    <line x1="410" y1="20" x2="410" y2="80" stroke="#10b981" strokeWidth="3" />
                    <rect x="400" y="25" width="20" height="50" fill="#10b981" rx="3" />

                    {/* Take Profit at Opposing High */}
                    <line x1="400" y1="25" x2="570" y2="25" stroke="#10b981" strokeDasharray="3 3" />
                    <text x="490" y="18" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      BUY-SIDE TARGET (BSL)
                    </text>

                    {/* Pro entry callout */}
                    <circle cx="310" cy="135" r="8" fill="#06b6d4" />
                    <text x="310" y="105" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      ENTER ON SWEEP REJECTION
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {[
                { step: 1, title: 'Engineered Equal Lows', desc: 'Price bounces twice at the exact same level to look like solid support.' },
                { step: 2, title: 'Retail Sets Stop Losses', desc: 'Retail traders buy support and put their stops 2-5 pips below the line.' },
                { step: 3, title: 'The Liquidity Sweep', desc: 'Institutional algorithms spike price down to trigger all sell stops in 1 tick.' },
                { step: 4, title: 'Institutional Rally', desc: 'Having accumulated massive sell liquidity into their buy orders, price flies.' }
              ].map(s => (
                <div
                  key={s.step}
                  onClick={() => {
                    setAnimStep(s.step);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    animStep === s.step
                      ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      animStep === s.step ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {s.step}
                    </span>
                    <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Economics Section */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 p-6 md:p-8 rounded-2xl border border-amber-500/20 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                THE ECONOMIC LAW OF COUNTERPARTY LIQUIDITY
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {MARKET_STRUCTURE_CONCEPTS['liquidity'].economicPerspective.heading}
              </h3>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 font-mono">
                The Revelation: Your Stop Loss is Technically a Market Order!
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {MARKET_STRUCTURE_CONCEPTS['liquidity'].economicPerspective.orderBookDynamics}
              </p>
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-amber-200">
                <strong>Why Bank Algorithms Run Stops:</strong> {MARKET_STRUCTURE_CONCEPTS['liquidity'].economicPerspective.institutionalBehavior}
              </div>
            </div>

            {/* Checklist */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                How to Successfully Trade Liquidity Sweeps
              </h4>
              <ul className="space-y-2">
                {MARKET_STRUCTURE_CONCEPTS['liquidity'].howToIdentifyChecklist.map((item, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precision Entry & Exit Blueprint for Liquidity */}
            <div className="lg:col-span-3">
              <ConceptExecutionPlaybook concept={MARKET_STRUCTURE_CONCEPTS['liquidity']} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: OPPORTUNITY FINDER & WHEN TO ENTER/EXIT MASTER MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-8 animate-fadeIn">
          <OpportunityFinderMatrix />
        </div>
      )}

      {/* TAB 6: ANIMATED STOP LOSS & TAKE PROFIT MASTER GUIDE */}
      {activeTab === 'sltp_guide' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive SL/TP Placement Simulator */}
          <div className="bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                  <Target className="w-3.5 h-3.5" />
                  INTERACTIVE PLACEMENT TERMINAL
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Stop Loss & Take Profit Geometry Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Test the difference between an amateur "tight stop" vs a professional "structural stop with ATR spread buffer".
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      setSlStrategy('tight_rookie');
                      setSimOutcome('idle');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slStrategy === 'tight_rookie'
                        ? 'bg-rose-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Amateur Tight SL (3 pips)
                  </button>
                  <button
                    onClick={() => {
                      setSlStrategy('pro_structural');
                      setSimOutcome('idle');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      slStrategy === 'pro_structural'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Pro Structural SL + ATR Buffer
                  </button>
                </div>

                <button
                  onClick={runSlTpSimulation}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 text-white text-xs font-bold font-mono shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Market Run</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="w-full h-88 bg-slate-950 rounded-xl border border-slate-800/80 relative overflow-hidden p-4 flex flex-col justify-between">
              <svg viewBox="0 0 600 220" className="w-full h-full">
                {/* Zones */}
                {/* Take Profit Zone (Green) */}
                <rect x="0" y="20" width="600" height="50" fill="#10b981" fillOpacity="0.08" />
                <line x1="0" y1="40" x2="600" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <text x="20" y="34" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  TAKE PROFIT (TP1 @ 1:2 R:R - Internal High)
                </text>

                {/* Entry Level (Cyan) */}
                <line x1="0" y1="100" x2="600" y2="100" stroke="#06b6d4" strokeWidth="2" />
                <text x="20" y="94" fill="#06b6d4" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  ENTRY PRICE (1.0820)
                </text>

                {/* Swing Low Reference Wick */}
                <line x1="120" y1="100" x2="120" y2="150" stroke="#ef4444" strokeWidth="2" />
                <rect x="113" y="110" width="14" height="30" fill="#ef4444" rx="2" />
                <circle cx="120" cy="150" r="4" fill="#f59e0b" />
                <text x="135" y="153" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                  Swing Low Wick (1.0805)
                </text>

                {/* Amateur Tight SL Line */}
                {slStrategy === 'tight_rookie' && (
                  <g>
                    <line x1="0" y1="152" x2="600" y2="152" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="350" y="146" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      ❌ ROOKIE STOP LOSS (1.0803 - Only 2 pips from wick!)
                    </text>
                    {/* Spread noise shaded band */}
                    <rect x="0" y="145" width="600" height="15" fill="#ef4444" fillOpacity="0.15" />
                    <text x="20" y="166" fill="#f87171" fontSize="9" fontFamily="monospace">
                      BROKER SPREAD NOISE ZONE (Wicks easily hunt this stop)
                    </text>
                  </g>
                )}

                {/* Pro Structural SL Line */}
                {slStrategy === 'pro_structural' && (
                  <g>
                    <line x1="0" y1="185" x2="600" y2="185" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="300" y="180" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      ✓ PRO STRUCTURAL SL (1.0792 - Swing Low - 1.5x ATR Buffer)
                    </text>
                    <rect x="0" y="150" width="600" height="35" fill="#06b6d4" fillOpacity="0.08" />
                    <text x="20" y="172" fill="#38bdf8" fontSize="9" fontFamily="monospace">
                      SAFETY BUFFER ZONE (Safe from broker spread spikes)
                    </text>
                  </g>
                )}

                {/* Price Wave Simulation Animation */}
                {simOutcome === 'idle' && (
                  <path
                    d="M 120 100 Q 180 130, 220 155 T 320 110"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                )}

                {simOutcome === 'stopped_out' && (
                  <g className="animate-fadeIn">
                    {/* Path that dips down into Rookie SL and stops out */}
                    <path
                      d="M 120 100 Q 180 140, 220 156 T 300 80 T 400 40"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                    <circle cx="220" cy="156" r="8" fill="#ef4444" className="animate-ping" />
                    <circle cx="220" cy="156" r="6" fill="#ef4444" />
                    <text x="235" y="150" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      STOPPED OUT BY NOISE! (-1%)
                    </text>
                    {/* Notice it then rallied to TP anyway! */}
                    <text x="380" y="60" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                      (Then rallies to TP without you!)
                    </text>
                  </g>
                )}

                {simOutcome === 'tp_hit' && (
                  <g className="animate-fadeIn">
                    {/* Path that dips harmlessly into the buffer zone, reverses and hits TP */}
                    <path
                      d="M 120 100 Q 180 140, 220 156 T 320 100 T 450 40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <circle cx="220" cy="156" r="5" fill="#38bdf8" />
                    <text x="235" y="170" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      Buffer Protected Position!
                    </text>

                    {/* TP HIT FLAG */}
                    <circle cx="450" cy="40" r="8" fill="#10b981" className="animate-ping" />
                    <circle cx="450" cy="40" r="6" fill="#10b981" />
                    <text x="465" y="44" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      FULL TAKE PROFIT HIT! (+2.5%)
                    </text>
                  </g>
                )}
              </svg>

              {/* Status Banner */}
              <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">
                  Current Setting: <strong className={slStrategy === 'pro_structural' ? 'text-emerald-400' : 'text-rose-400'}>
                    {slStrategy === 'pro_structural' ? 'Structural + 1.5x ATR Buffer' : 'Amateur Tight SL (No Buffer)'}
                  </strong>
                </span>
                <span className="text-slate-400">
                  Result: {simOutcome === 'idle' ? 'Ready to simulate' : simOutcome === 'tp_hit' ? '🎯 FULL TP ACHIEVED' : '💥 STOPPED OUT BY SPREAD SPIKE'}
                </span>
              </div>
            </div>

            {/* Master Institutional Rules for SL and TP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SL_TP_MASTER_RULES.map(rule => (
                <div key={rule.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {rule.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-amber-400 font-mono font-bold">Rule</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{rule.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{rule.summary}</p>

                  <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="text-rose-400">
                      <strong className="font-mono">Rookie Mistake:</strong> {rule.badPractice}
                    </div>
                    <div className="text-emerald-400">
                      <strong className="font-mono">Professional Execution:</strong> {rule.bestPractice}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] font-mono text-cyan-300">
                    "{rule.institutionalWisdom}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: STRUCTURE KNOWLEDGE CHECK */}
      {activeTab === 'structure_quiz' && (
        <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
          {!quizDone ? (
            <div className="bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    QUESTION {quizIdx + 1} OF {STRUCTURE_QUIZ_QUESTIONS.length}
                  </span>
                  <h3 className="text-base font-bold text-white">Structure & Economics Knowledge Test</h3>
                </div>
                <div className="text-xs font-mono text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-amber-500/30 font-bold">
                  Score: {quizScore}/{quizIdx + (isQuizAnswered ? 1 : 0)}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <p className="text-sm md:text-base font-semibold text-white leading-relaxed">
                  {STRUCTURE_QUIZ_QUESTIONS[quizIdx].question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {STRUCTURE_QUIZ_QUESTIONS[quizIdx].options.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrectAnswer = idx === STRUCTURE_QUIZ_QUESTIONS[quizIdx].correctIndex;
                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isQuizAnswered) {
                    if (isCorrectAnswer) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={isQuizAnswered}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm font-sans flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-xs text-slate-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isQuizAnswered && (
                        <div>
                          {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                          {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-400" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isQuizAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4" />
                    Master Technical Breakdown
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {STRUCTURE_QUIZ_QUESTIONS[quizIdx].explanation}
                  </p>
                  <div className="text-[11px] font-mono text-amber-300/90 pt-1">
                    Rule: "{STRUCTURE_QUIZ_QUESTIONS[quizIdx].institutionalRule}"
                  </div>
                </div>
              )}

              {/* Next Button */}
              {isQuizAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuiz}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs font-bold font-mono shadow-lg hover:brightness-110 cursor-pointer transition-all"
                  >
                    <span>{quizIdx < STRUCTURE_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results */
            <div className="bg-slate-900/90 p-8 md:p-12 text-center rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white">Structure & Economics Check Complete!</h3>
                <p className="text-sm text-slate-300">
                  You scored <strong className="text-emerald-400 font-mono">{quizScore}</strong> out of <strong className="text-white font-mono">{STRUCTURE_QUIZ_QUESTIONS.length}</strong> ({((quizScore / STRUCTURE_QUIZ_QUESTIONS.length) * 100).toFixed(0)}%).
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold font-mono shadow-lg hover:brightness-110 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Knowledge Check</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
