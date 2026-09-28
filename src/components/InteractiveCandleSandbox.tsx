import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Flame, Info, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react';

export const InteractiveCandleSandbox: React.FC = () => {
  const [open, setOpen] = useState<number>(50);
  const [close, setClose] = useState<number>(80);
  const [high, setHigh] = useState<number>(90);
  const [low, setLow] = useState<number>(20);

  // Live Lifecycle Animation State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [animPhase, setAnimPhase] = useState<string>('Ready');

  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      // Phase 1: Open
      setAnimPhase('Phase 1: Session Opens at 1.0820');
      setOpen(45);
      setClose(45);
      setHigh(46);
      setLow(44);

      timer = setTimeout(() => {
        // Phase 2: Sellers dump price down
        setAnimPhase('Phase 2: Sellers Dump Price (Lower Wick Forms)');
        setLow(15);
        setClose(22);
        setHigh(48);

        timer = setTimeout(() => {
          // Phase 3: Buyers aggressively absorb and push to the high
          setAnimPhase('Phase 3: Institutional Buyers Absorb & Rally to High');
          setHigh(92);
          setClose(88);

          timer = setTimeout(() => {
            // Phase 4: Final candle close
            setAnimPhase('Phase 4: Candle Closes as Bullish Hammer/Pin Bar!');
            setClose(78);
            setIsSimulating(false);
          }, 1800);
        }, 1800);
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [isSimulating]);

  const isBullish = close >= open;
  const bodyTop = Math.max(open, close);
  const bodyBottom = Math.min(open, close);
  const bodyHeight = Math.max(1, bodyTop - bodyBottom);
  const upperWickHeight = high - bodyTop;
  const lowerWickHeight = bodyBottom - low;
  const totalRange = Math.max(1, high - low);

  // Pattern detection logic based on institutional candlestick criteria
  let detectedPattern = 'Standard Candle';
  let patternBias = isBullish ? 'Bullish' : 'Bearish';
  let patternAnalysisNotes = 'A standard directional candlestick showing normal session volatility.';

  if (bodyHeight <= 3 && upperWickHeight > 15 && lowerWickHeight > 15) {
    detectedPattern = 'Classic Doji';
    patternBias = 'Indecision / Reversal';
    patternAnalysisNotes = 'Long shadows, no body. Confusion between buyers and sellers. Does not work in sideway market; market must be trending!';
  } else if (bodyHeight <= 3 && upperWickHeight > 25 && lowerWickHeight <= 5) {
    detectedPattern = 'Gravestone Doji';
    patternBias = 'Bearish Reversal';
    patternAnalysisNotes = 'Long upper shadow with open/close at low. Buyers rejected at the highs.';
  } else if (bodyHeight <= 3 && lowerWickHeight > 25 && upperWickHeight <= 5) {
    detectedPattern = 'Dragonfly Doji';
    patternBias = 'Bullish Reversal';
    patternAnalysisNotes = 'Long lower shadow with open/close at high. Aggressive buyer defense at lows.';
  } else if (lowerWickHeight >= bodyHeight * 2 && upperWickHeight <= 6) {
    detectedPattern = 'Hammer / Hanging Man';
    patternBias = isBullish ? 'Bullish (if in downtrend)' : 'Bearish (if in uptrend)';
    patternAnalysisNotes = 'Short body, long lower wick. Found in downtrend = Hammer (Bullish Reversal). Found in uptrend = Hanging Man (Bearish Reversal). Color doesn\'t matter!';
  } else if (upperWickHeight >= bodyHeight * 2 && lowerWickHeight <= 6) {
    detectedPattern = 'Shooting Star';
    patternBias = 'Bearish Reversal';
    patternAnalysisNotes = 'Short body, long upper wick. Found in uptrends. Buyers exhausted at resistance.';
  } else if (bodyHeight > 70 && upperWickHeight <= 4 && lowerWickHeight <= 4) {
    detectedPattern = 'Marubozu';
    patternBias = isBullish ? 'Bullish Dominance' : 'Bearish Dominance';
    patternAnalysisNotes = 'Long body almost no shadows! Marubozu means dominance. Signals trend reversal or continuation.';
  } else if (bodyHeight < 20 && upperWickHeight > 20 && lowerWickHeight > 20) {
    detectedPattern = 'Spinning Top';
    patternBias = 'Indecision';
    patternAnalysisNotes = 'Small central body with long wicks. Indecision between buyers and sellers; potential reversal.';
  }

  const applyPreset = (pOpen: number, pClose: number, pHigh: number, pLow: number) => {
    setOpen(pOpen);
    setClose(pClose);
    setHigh(pHigh);
    setLow(pLow);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Interactive Candlestick Laboratory & Real-Time Classifier
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tweak High, Low, Open, and Close sliders to see how candlestick anatomy and psychology form dynamically.
          </p>
        </div>

        {/* Quick Presets & Lifecycle Simulator */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="px-3 py-1.5 text-xs font-mono font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:brightness-110 text-white rounded-lg shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isSimulating ? 'Playing Formation...' : '▶ Animate Candle Lifecycle'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400 mr-1">Presets:</span>
            <button
              onClick={() => applyPreset(25, 30, 32, 5)}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              Hammer
            </button>
            <button
              onClick={() => applyPreset(70, 75, 95, 68)}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              Shooting Star
            </button>
            <button
              onClick={() => applyPreset(10, 88, 90, 8)}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-300 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              Marubozu
            </button>
            <button
              onClick={() => applyPreset(50, 50, 85, 15)}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              Classic Doji
            </button>
            <button
              onClick={() => applyPreset(45, 55, 80, 20)}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              Spinning Top
            </button>
          </div>
        </div>
      </div>

      {isSimulating && (
        <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300 animate-pulse">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{animPhase}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive SVG Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-950 p-6 rounded-xl border border-slate-800 relative min-h-[300px]">
          {/* Chart Grid Lines */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />

          {/* Dynamic High-Contrast Directional Indicator */}
          <div className="z-10 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider border shadow-md ${
              isBullish 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-emerald-500/20' 
                : 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-rose-500/20'
            }`}>
              {isBullish ? '▲ VIBRANT BULLISH CANDLE (BUY PRESSURE)' : '▼ VIBRANT BEARISH CANDLE (SELL PRESSURE)'}
            </span>
          </div>

          {/* Candlestick SVG */}
          <svg viewBox="0 0 200 240" className="w-52 h-64 z-10 overflow-visible">
            {/* Upper Wick */}
            <line
              x1="100"
              y1={240 - high * 2.2}
              x2="100"
              y2={240 - bodyTop * 2.2}
              stroke={isBullish ? '#00E676' : '#FF1744'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Lower Wick */}
            <line
              x1="100"
              y1={240 - bodyBottom * 2.2}
              x2="100"
              y2={240 - low * 2.2}
              stroke={isBullish ? '#00E676' : '#FF1744'}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Real Body */}
            <rect
              x="75"
              y={240 - bodyTop * 2.2}
              width="50"
              height={Math.max(4, (bodyTop - bodyBottom) * 2.2)}
              fill={isBullish ? '#00E676' : '#FF1744'}
              stroke={isBullish ? '#00FF88' : '#FF5252'}
              strokeWidth="2"
              rx="4"
              className={isBullish ? 'glow-bullish' : 'glow-bearish'}
            />

            {/* Live Ticking Price Line */}
            <line
              x1="0"
              y1={240 - close * 2.2}
              x2="200"
              y2={240 - close * 2.2}
              stroke={isBullish ? '#00E676' : '#FF1744'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="animate-pulse"
            />
            <circle
              cx="100"
              cy={240 - close * 2.2}
              r="4.5"
              fill={isBullish ? '#00FF88' : '#FF5252'}
              className="animate-ping"
            />

            {/* Price Labels on Canvas */}
            <text x="140" y={240 - high * 2.2 + 4} fill="#cbd5e1" fontSize="10" fontFamily="monospace" fontWeight="bold">
              High: {high}
            </text>
            <text x="140" y={240 - open * 2.2 + 4} fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Open: {open}
            </text>
            <text x="140" y={240 - close * 2.2 + 4} fill={isBullish ? '#00E676' : '#FF1744'} fontSize="10" fontFamily="monospace" fontWeight="extrabold">
              Close: {close}
            </text>
            <text x="140" y={240 - low * 2.2 + 4} fill="#cbd5e1" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Low: {low}
            </text>
          </svg>

          {/* Quick status bar */}
          <div className="z-10 mt-4 flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">Body: <strong className="text-white">{bodyHeight} pts</strong></span>
            <span className="text-slate-400">Upper Wick: <strong className="text-white">{upperWickHeight} pts</strong></span>
            <span className="text-slate-400">Lower Wick: <strong className="text-white">{lowerWickHeight} pts</strong></span>
          </div>
        </div>

        {/* Sliders & Classifier Output */}
        <div className="lg:col-span-6 space-y-4">
          {/* Classification Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Identified Pattern</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                patternBias.includes('Bullish') ? 'bg-emerald-500/20 text-emerald-300' :
                patternBias.includes('Bearish') ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {patternBias}
              </span>
            </div>
            <h4 className="text-xl font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              {detectedPattern}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {patternAnalysisNotes}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">High Price:</span>
                <span className="font-mono text-cyan-400">{high}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={high}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHigh(val);
                  if (open > val) setOpen(val);
                  if (close > val) setClose(val);
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Open Price:</span>
                <span className="font-mono text-cyan-400">{open}</span>
              </div>
              <input
                type="range"
                min={low}
                max={high}
                value={open}
                onChange={(e) => setOpen(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Close Price:</span>
                <span className="font-mono text-cyan-400">{close}</span>
              </div>
              <input
                type="range"
                min={low}
                max={high}
                value={close}
                onChange={(e) => setClose(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Low Price:</span>
                <span className="font-mono text-cyan-400">{low}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={low}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLow(val);
                  if (open < val) setOpen(val);
                  if (close < val) setClose(val);
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
