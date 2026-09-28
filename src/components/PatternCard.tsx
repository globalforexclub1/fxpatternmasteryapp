import React from 'react';
import { CandlestickPattern, ChartPattern } from '../types.ts';
import { PatternVisualizer } from './PatternVisualizer.tsx';
import { CheckCircle2, TrendingUp, TrendingDown, Minus, Sparkles, ArrowUpRight } from 'lucide-react';

interface PatternCardProps {
  pattern: CandlestickPattern | ChartPattern;
  onSelect: (pattern: CandlestickPattern | ChartPattern) => void;
  isMastered: boolean;
  onToggleMastered: (id: string, e: React.MouseEvent) => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  onSelect,
  isMastered,
  onToggleMastered
}) => {
  const biasBadge = {
    bullish: { text: '▲ BULLISH', bg: 'text-emerald-300 bg-emerald-500/25 border-emerald-400 font-black shadow-md shadow-emerald-500/20', icon: TrendingUp },
    bearish: { text: '▼ BEARISH', bg: 'text-rose-300 bg-rose-500/25 border-rose-400 font-black shadow-md shadow-rose-500/20', icon: TrendingDown },
    neutral: { text: '◆ REVERSAL', bg: 'text-amber-300 bg-amber-500/25 border-amber-400 font-black shadow-md shadow-amber-500/20', icon: Minus },
    either: { text: '◈ BILATERAL', bg: 'text-cyan-300 bg-cyan-500/25 border-cyan-400 font-black shadow-md shadow-cyan-500/20', icon: Sparkles }
  }[pattern.bias];

  const BiasIcon = biasBadge.icon;

  return (
    <div 
      onClick={() => onSelect(pattern)}
      className="group relative flex flex-col bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer"
    >
      {/* Visual Preview */}
      <div className="relative">
        <PatternVisualizer svgType={pattern.svgType} className="h-44 w-full" interactive={false} />

        {/* Mastered Badge */}
        <button
          onClick={(e) => onToggleMastered(pattern.id, e)}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full backdrop-blur-md transition-all ${
            isMastered 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-sm' 
              : 'bg-slate-950/70 text-slate-500 hover:text-slate-300 border border-slate-800'
          }`}
          title={isMastered ? 'Mastered (+25 XP)' : 'Mark as Mastered'}
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>

        {/* Bias Pill */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${biasBadge.bg}`}>
            <BiasIcon className="w-3 h-3" />
            {biasBadge.text}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-mono uppercase tracking-wider">{pattern.category.replace('-', ' ')}</span>
            <span className={`capitalize font-medium ${
              pattern.difficulty === 'beginner' ? 'text-emerald-400' :
              pattern.difficulty === 'intermediate' ? 'text-cyan-400' : 'text-purple-400'
            }`}>
              {pattern.difficulty}
            </span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
            {pattern.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {pattern.interpretation}
          </p>

          {/* Quick Entry & Exit Snippet */}
          <div className="mt-2.5 bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 text-[11px] space-y-1 font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400 truncate">
              <span className="font-bold text-[10px] uppercase bg-emerald-500/10 px-1 rounded border border-emerald-500/20 shrink-0">Enter</span>
              <span className="text-slate-300 truncate">{pattern.entryPoint}</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-400 truncate">
              <span className="font-bold text-[10px] uppercase bg-rose-500/10 px-1 rounded border border-rose-500/20 shrink-0">Exit SL</span>
              <span className="text-slate-300 truncate">{pattern.stopLoss}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
          <span>Study Blueprint</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
