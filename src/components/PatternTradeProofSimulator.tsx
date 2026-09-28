import React, { useState, useEffect } from 'react';
import { CandlestickPattern, ChartPattern } from '../types.ts';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio.ts';

interface Props {
  pattern: CandlestickPattern | ChartPattern;
}

export const PatternTradeProofSimulator: React.FC<Props> = ({ pattern }) => {
  const isBullish = pattern.bias === 'bullish';
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const targetText = 'takeProfitTarget' in pattern 
    ? (pattern as CandlestickPattern).takeProfitTarget 
    : (pattern as ChartPattern).targetMeasurement;

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setStep(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
            playSound('correct', true);
            return 5;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleRestart = () => {
    setStep(1);
    setIsPlaying(true);
  };

  // Coordinated levels based on bias
  const entryY = isBullish ? 160 : 120;
  const slY = isBullish ? 220 : 60;
  const tp1Y = isBullish ? 100 : 180;
  const tp2Y = isBullish ? 50 : 230;

  return (
    <div className="bg-slate-950 rounded-2xl border border-cyan-500/40 p-5 space-y-4 shadow-xl">
      {/* Title bar & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-500/30 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              LIVE EXECUTION PROOF & REPLAY
            </span>
            <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
              isBullish ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {isBullish ? 'LONG EXECUTION (1:3.2 R:R)' : 'SHORT EXECUTION (1:3.2 R:R)'}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white mt-1">
            Visual Entry, Stop Loss, and Exit Target Proof: {pattern.name}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Replay' : 'Play Trade Replay'}</span>
          </button>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* 5-Step Timeline Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {[
          { num: 1, label: '1. Spot Confluence' },
          { num: 2, label: '2. Entry Fill' },
          { num: 3, label: '3. Stop Buffer' },
          { num: 4, label: '4. TP1 + Breakeven' },
          { num: 5, label: '5. TP2 Reached' }
        ].map(st => (
          <button
            key={st.num}
            onClick={() => {
              setStep(st.num);
              setIsPlaying(false);
            }}
            className={`px-2 py-1.5 rounded-lg text-left text-[11px] font-mono transition-all cursor-pointer border ${
              step === st.num
                ? 'bg-cyan-950/70 border-cyan-500/80 text-cyan-300 font-bold shadow'
                : step > st.num
                ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900/50 border-slate-800 text-slate-500'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Interactive SVG Chart Canvas */}
      <div className="relative bg-slate-900/90 rounded-xl border border-slate-800/90 p-2 overflow-hidden">
        {/* Status Callout Badge */}
        <div className="absolute top-2 left-3 z-10">
          <span className="px-2.5 py-1 rounded bg-slate-950/90 text-[10px] font-mono text-cyan-300 border border-cyan-500/30 shadow backdrop-blur-md">
            {step === 1 && `🔍 SPOTTING: Look for ${pattern.name} at key support/resistance`}
            {step === 2 && `🟢 WHEN TO ENTER: ${pattern.entryPoint}`}
            {step === 3 && `🛑 STOP LOSS ANCHOR: ${pattern.stopLoss} + 1.5x ATR spread buffer`}
            {step === 4 && `🎯 TAKE PROFIT 1 HIT: Close 50% & advance Stop Loss to Breakeven`}
            {step === 5 && `🏆 TAKE PROFIT 2 HIT: ${targetText || 'Final Target Reached +3.2R'}`}
          </span>
        </div>

        <svg viewBox="0 0 540 280" className="w-full h-56 md:h-64">
          {/* Subtle Grid */}
          <defs>
            <pattern id="pat-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pat-grid)" />

          {/* SPOTTING CONFLUENCE BOX */}
          <rect 
            x="30" 
            y={isBullish ? 210 : 40} 
            width="480" 
            height="35" 
            fill={isBullish ? '#065f46' : '#881337'} 
            opacity="0.25" 
            stroke={isBullish ? '#00E676' : '#FF1744'} 
            strokeDasharray="3 3"
            strokeWidth="0.8"
          />
          <text 
            x="35" 
            y={isBullish ? 232 : 62} 
            fill={isBullish ? '#34d399' : '#fb7185'} 
            fontSize="9.5" 
            fontFamily="monospace" 
            fontWeight="bold"
          >
            🔍 CONFLUENCE ZONE (Key Level / Support & Resistance Floor)
          </text>

          {/* STOP LOSS LINE */}
          <g className="transition-all duration-300">
            <line 
              x1="30" 
              y1={slY} 
              x2="510" 
              y2={slY} 
              stroke="#FF1744" 
              strokeWidth="2" 
              strokeDasharray="3 3" 
              opacity={step >= 3 ? 1 : 0.3}
            />
            <rect x="35" y={slY - 9} width="220" height="18" rx="3" fill="#020617" stroke="#FF1744" strokeWidth="0.8" />
            <text x="40" y={slY + 3} fill="#FF1744" fontSize="9" fontFamily="monospace" fontWeight="bold">
              🛑 STOP LOSS (Structure + ATR Buffer)
            </text>
          </g>

          {/* ENTRY LINE */}
          <g className="transition-all duration-300">
            <line 
              x1="30" 
              y1={entryY} 
              x2="510" 
              y2={entryY} 
              stroke="#00E676" 
              strokeWidth="2.2" 
              strokeDasharray="4 2"
              opacity={step >= 2 ? 1 : 0.3}
            />
            <rect x="35" y={entryY - 9} width="230" height="18" rx="3" fill="#020617" stroke="#00E676" strokeWidth="0.8" />
            <text x="40" y={entryY + 3} fill="#00E676" fontSize="9" fontFamily="monospace" fontWeight="bold">
              🟢 EXACT ENTRY TRIGGER (Candle Close)
            </text>
          </g>

          {/* BREAKEVEN LINE at Step 4 & 5 */}
          {step >= 4 && (
            <g className="animate-fadeIn">
              <line x1="280" y1={entryY} x2="510" y2={entryY} stroke="#38bdf8" strokeWidth="2.5" />
              <rect x="310" y={entryY - 9} width="195" height="18" rx="3" fill="#0369a1" />
              <text x="316" y={entryY + 3} fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                🛡️ SL TO BREAKEVEN (+1 pip buffer)
              </text>
            </g>
          )}

          {/* TAKE PROFIT 1 LINE */}
          <g className="transition-all duration-300">
            <line 
              x1="30" 
              y1={tp1Y} 
              x2="510" 
              y2={tp1Y} 
              stroke="#38bdf8" 
              strokeWidth="1.8" 
              strokeDasharray="2 2"
              opacity={step >= 4 ? 1 : 0.3}
            />
            <rect x="35" y={tp1Y - 9} width="210" height="18" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="0.8" />
            <text x="40" y={tp1Y + 3} fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
              🎯 TP1 (1:2 R:R - Scale 50% Profit)
            </text>
          </g>

          {/* TAKE PROFIT 2 LINE */}
          <g className="transition-all duration-300">
            <line 
              x1="30" 
              y1={tp2Y} 
              x2="510" 
              y2={tp2Y} 
              stroke="#34d399" 
              strokeWidth="2" 
              strokeDasharray="2 2"
              opacity={step >= 5 ? 1 : 0.3}
            />
            <rect x="35" y={tp2Y - 9} width="220" height="18" rx="3" fill="#020617" stroke="#34d399" strokeWidth="0.8" />
            <text x="40" y={tp2Y + 3} fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">
              🏆 TP2 (Macro Target - 1:3.2 R:R)
            </text>
          </g>

          {/* Candlestick sequence illustrating execution */}
          {/* Candle 1: Setup formation */}
          <line x1="80" y1={isBullish ? 230 : 50} x2="80" y2={isBullish ? 180 : 100} stroke={isBullish ? '#FF1744' : '#00E676'} strokeWidth="2" />
          <rect x="72" y={isBullish ? 190 : 65} width="16" height="30" rx="2" fill={isBullish ? '#FF1744' : '#00E676'} />

          {/* Candle 2: The Pattern (e.g. Hammer / Pin Bar) */}
          <line x1="140" y1={isBullish ? 240 : 40} x2="140" y2={isBullish ? 170 : 110} stroke={isBullish ? '#00E676' : '#FF1744'} strokeWidth="2" />
          <rect x="132" y={isBullish ? 175 : 85} width="16" height="20" rx="2" fill={isBullish ? '#00E676' : '#FF1744'} className="glow-bullish" />
          <text x="140" y={isBullish ? 255 : 35} fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            {pattern.name.split(' ')[0]}
          </text>

          {/* Candle 3: Trigger Candle */}
          {step >= 2 && (
            <g className="animate-fadeIn">
              <line x1="200" y1={isBullish ? 200 : 80} x2="200" y2={isBullish ? 155 : 125} stroke={isBullish ? '#00E676' : '#FF1744'} strokeWidth="2" />
              <rect x="192" y={isBullish ? 160 : 90} width="16" height="32" rx="2" fill={isBullish ? '#00E676' : '#FF1744'} />
              <text x="200" y={isBullish ? 148 : 138} fill="#00E676" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                Trigger Fill
              </text>
            </g>
          )}

          {/* Candle 4: Buffer Retest (Testing ATR margin without hitting SL) */}
          {step >= 3 && (
            <g className="animate-fadeIn">
              <line x1="260" y1={isBullish ? 212 : 68} x2="260" y2={isBullish ? 162 : 118} stroke={isBullish ? '#FF1744' : '#00E676'} strokeWidth="2" />
              <rect x="252" y={isBullish ? 170 : 80} width="16" height="24" rx="2" fill={isBullish ? '#FF1744' : '#00E676'} />
              <text x="260" y={isBullish ? 225 : 55} fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                Buffer Safe
              </text>
            </g>
          )}

          {/* Candle 5: Surge to TP1 */}
          {step >= 4 && (
            <g className="animate-fadeIn">
              <line x1="320" y1={isBullish ? 170 : 110} x2="320" y2={isBullish ? 95 : 185} stroke={isBullish ? '#00E676' : '#FF1744'} strokeWidth="2" />
              <rect x="312" y={isBullish ? 100 : 120} width="16" height="60" rx="2" fill={isBullish ? '#00E676' : '#FF1744'} />
              <text x="320" y={isBullish ? 88 : 198} fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                🎯 TP1 Hit
              </text>
            </g>
          )}

          {/* Candle 6: Expansion to TP2 */}
          {step >= 5 && (
            <g className="animate-fadeIn">
              <line x1="380" y1={isBullish ? 105 : 175} x2="380" y2={isBullish ? 45 : 235} stroke={isBullish ? '#00E676' : '#FF1744'} strokeWidth="2" />
              <rect x="372" y={isBullish ? 48 : 180} width="16" height="50" rx="2" fill={isBullish ? '#00E676' : '#FF1744'} className="glow-bullish" />
              <text x="380" y={isBullish ? 38 : 248} fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                🏆 TP2 Target Hit!
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Practical Execution Guidance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/20 space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">When To Enter</span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {pattern.entryPoint}
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-rose-500/20 space-y-1">
          <span className="text-[10px] font-mono font-bold text-rose-400 uppercase block">Where Stop Loss Sits</span>
          <p className="text-slate-300 font-medium leading-relaxed">
            {pattern.stopLoss} (plus 1.5x ATR spread buffer).
          </p>
        </div>

        <div className="p-3 bg-slate-900 rounded-xl border border-cyan-500/20 space-y-1">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block">When To Exit</span>
          <p className="text-slate-300 font-medium leading-relaxed">
            TP1: 1:2 R:R (bank 50% & SL to breakeven). TP2: {targetText || 'Previous macro swing'}.
          </p>
        </div>
      </div>
    </div>
  );
};
