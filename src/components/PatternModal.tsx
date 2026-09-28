import React, { useState, useRef, useEffect } from 'react';
import { CandlestickPattern, ChartPattern } from '../types.ts';
import { PatternVisualizer } from './PatternVisualizer.tsx';
import { 
  X, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  BookOpen, 
  Target, 
  ShieldAlert, 
  Clock, 
  Check, 
  Sparkles,
  ArrowRight,
  Flame,
  Compass,
  Play
} from 'lucide-react';
import { PatternTradeProofSimulator } from './PatternTradeProofSimulator.tsx';

interface PatternModalProps {
  pattern: CandlestickPattern | ChartPattern | null;
  onClose: () => void;
  isMastered: boolean;
  onToggleMastered: (id: string) => void;
}

export const PatternModal: React.FC<PatternModalProps> = ({
  pattern,
  onClose,
  isMastered,
  onToggleMastered
}) => {
  const [chartView, setChartView] = useState<'proof' | 'diagram'>('proof');
  const [activeTab, setActiveTab] = useState<'blueprint' | 'checklist' | 'quote'>('blueprint');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Ensure pattern modal always opens right at the top/header section
  useEffect(() => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
  }, [pattern]);

  if (!pattern) return null;

  const isCandle = 'characteristics' in pattern;
  const candlePattern = isCandle ? (pattern as CandlestickPattern) : null;
  const chartPattern = !isCandle ? (pattern as ChartPattern) : null;

  const biasBadge = {
    bullish: { text: '▲ BULLISH', bg: 'bg-emerald-500/25 text-emerald-300 border-emerald-400 font-extrabold shadow-sm shadow-emerald-500/20', icon: TrendingUp },
    bearish: { text: '▼ BEARISH', bg: 'bg-rose-500/25 text-rose-300 border-rose-400 font-extrabold shadow-sm shadow-rose-500/20', icon: TrendingDown },
    neutral: { text: '◆ INDECISION / REVERSAL', bg: 'bg-amber-500/25 text-amber-300 border-amber-400 font-extrabold shadow-sm shadow-amber-500/20', icon: Minus },
    either: { text: '◈ BILATERAL / BREAKOUT', bg: 'bg-cyan-500/25 text-cyan-300 border-cyan-400 font-extrabold shadow-sm shadow-cyan-500/20', icon: Sparkles }
  }[pattern.bias];

  const BiasIcon = biasBadge.icon;

  const checklistItems = isCandle
    ? candlePattern!.keyRequirements
    : chartPattern!.criteria;

  const toggleChecklist = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div 
      ref={modalScrollRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${biasBadge.bg}`}>
              <BiasIcon className="w-3.5 h-3.5" />
              {biasBadge.text}
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">
              {pattern.category.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleMastered(pattern.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isMastered 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'text-emerald-400' : 'text-slate-400'}`} />
              {isMastered ? 'Pattern Mastered (+25 XP)' : 'Mark as Mastered'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {pattern.name}
            </h2>
            <p className="text-sm text-cyan-400 font-medium mt-1">
              {pattern.subtitle}
            </p>
          </div>

          {/* Interactive Chart Mode Switcher */}
          <div className="flex items-center justify-between gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 px-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>CHART MODE:</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setChartView('proof')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  chartView === 'proof'
                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Play className="w-3 h-3" />
                <span>🎯 Live Entry & Exit Proof</span>
              </button>
              <button
                onClick={() => setChartView('diagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  chartView === 'diagram'
                    ? 'bg-slate-800 text-white shadow border border-slate-700'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <span>📊 Pattern Anatomy</span>
              </button>
            </div>
          </div>

          {/* Interactive Diagram or Live Trade Proof */}
          <div>
            {chartView === 'proof' ? (
              <PatternTradeProofSimulator pattern={pattern} />
            ) : (
              <PatternVisualizer svgType={pattern.svgType} className="w-full h-64 md:h-72" />
            )}
          </div>

          {/* Segmented Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'blueprint' 
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Trade Blueprint (Entry, SL, Target)
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'checklist' 
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Confluence Checklist ({Object.values(checkedItems).filter(Boolean).length}/{checklistItems.length})
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'quote' 
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Master Curriculum Note
            </button>
          </div>

          {/* Tab 1: Blueprint */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/30 shadow-lg">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                    When To Enter (The Trigger)
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {isCandle ? candlePattern!.entryPoint : chartPattern!.entryPoint}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-emerald-300/90 font-mono">
                    ✓ Rule: Never front-run. Wait for the confirmation candle to CLOSE.
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/30 shadow-lg">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Where To Place Stop Loss
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {isCandle ? candlePattern!.stopLoss : chartPattern!.stopLoss}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-rose-300/90 font-mono">
                    🛡 Buffer: Add 1.5x ATR (or 3-5 pips) beyond the wick for spread protection.
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 shadow-lg">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    When To Exit (Take Profit Targets)
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {isCandle ? candlePattern!.takeProfitTarget : chartPattern!.targetMeasurement}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-cyan-300/90 font-mono">
                    🎯 TP1: Close 50% at 1:2 R:R & move SL to Breakeven (+1 pip buffer).
                  </div>
                </div>
              </div>

              {/* Actionable Decision Matrix: How to Spot & When to Abort */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    How to Spot This High-Probability Opportunity
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Look for this pattern appearing at <strong>Key Confluence Zones</strong>: higher-timeframe Support/Resistance, 50-61.8% Fibonacci retracements, or immediately after a liquidity sweep of equal highs/lows. Do not trade it in choppy sideways consolidation.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase font-mono">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Emergency Exit: When to Abort Before Stop Loss
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    If price enters your trade but fails to generate momentum within 4-5 candles, or if the opposite structural Change of Character (CHOCH) occurs on the 5-minute timeframe, close immediately with minimal drawdown rather than letting full stop loss get hit.
                  </p>
                </div>
              </div>

              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-slate-200">Recommended Timeframes:</span>
                  <span>{chartPattern?.timeframeTip || '15-Minute, 1-Hour, and 4-Hour charts for best clarity. Avoid 1-minute noise.'}</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Target Min: 2.0R to 3.0R
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Verify each criterion before pulling the trigger. Professional traders execute only when all items are checked:
              </p>
              <div className="space-y-2">
                {checklistItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      checkedItems[idx]
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      checkedItems[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-900'
                    }`}>
                      {checkedItems[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Curriculum Quote */}
          {activeTab === 'quote' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border border-cyan-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" />
                  Technical Analysis Curriculum Reference
                </div>
                <p className="text-sm font-mono text-slate-100 italic leading-relaxed">
                  "{pattern.slideNotes}"
                </p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Educational Standard</span>
                  <span className="text-cyan-400 font-semibold">Technical Analysis Mastery</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Key Interpretation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pattern.interpretation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
