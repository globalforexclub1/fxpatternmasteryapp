import React, { useState } from 'react';

interface PatternVisualizerProps {
  svgType: string;
  className?: string;
  interactive?: boolean;
  quizMode?: boolean;
}

export const PatternVisualizer: React.FC<PatternVisualizerProps> = ({
  svgType,
  className = 'w-full h-56',
  interactive = true,
  quizMode = false
}) => {
  const [animated, setAnimated] = useState(true);

  return (
    <div className={`relative flex items-center justify-center bg-slate-900/90 rounded-xl p-4 border border-slate-800/80 overflow-hidden ${className}`}>
      {/* Trading grid backdrop */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} 
      />

      {interactive && !quizMode && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded text-[11px] font-mono text-slate-400 border border-slate-800">
          <button
            onClick={() => setAnimated(!animated)}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            title="Toggle Animation"
          >
            <span className={`w-2 h-2 rounded-full ${animated ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'}`} />
            {animated ? 'Animated' : 'Static'}
          </button>
        </div>
      )}

      {quizMode && (
        <div className="absolute top-2 right-2 z-10 bg-indigo-950/80 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/40">
          VISUAL RECOGNITION
        </div>
      )}

      {/* SVG Diagram Rendering */}
      {renderPatternSvg(svgType, animated, quizMode)}
    </div>
  );
};

function renderPatternSvg(type: string, animated: boolean, quizMode = false) {
  const animClass = animated ? 'transition-all duration-700' : '';

  switch (type) {
    case 'spinning-top':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Guidelines */}
          <line x1="20" y1="100" x2="340" y2="100" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          
          {/* Bullish Spinning Top */}
          <g className={animClass}>
            <text x="90" y="24" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">Bullish Spinning Top</text>
            <text x="90" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">High</text>
            <line x1="90" y1="48" x2="90" y2="152" stroke="#00E676" strokeWidth="2.5" />
            <rect x="70" y="90" width="40" height="20" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="120" y="94" fill="#00E676" fontSize="9" fontFamily="monospace">Close</text>
            <text x="120" y="112" fill="#94a3b8" fontSize="9" fontFamily="monospace">Open</text>
            <text x="90" y="166" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">Low</text>
          </g>

          {/* Bearish Spinning Top */}
          <g className={animClass}>
            <text x="260" y="24" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">Bearish Spinning Top</text>
            <text x="260" y="44" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">High</text>
            <line x1="260" y1="48" x2="260" y2="152" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="240" y="90" width="40" height="20" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="290" y="94" fill="#94a3b8" fontSize="9" fontFamily="monospace">Open</text>
            <text x="290" y="112" fill="#FF1744" fontSize="9" fontFamily="monospace">Close</text>
            <text x="260" y="166" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">Low</text>
          </g>

          {/* Slide Quote label */}
          <rect x="110" y="174" width="140" height="20" fill="#0f172a" rx="4" stroke="#334155" />
          <text x="180" y="188" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="600">Indecision · Reversal</text>
        </svg>
      );

    case 'marubozu':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Header */}
          <rect x="90" y="10" width="180" height="22" fill="#1e293b" rx="4" stroke="#0ea5e9" />
          <text x="180" y="25" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="700">MARUBOZU = DOMINANCE</text>

          {/* Bullish Marubozu */}
          <g className={animClass}>
            <text x="90" y="52" textAnchor="middle" fill="#00E676" fontSize="11" fontWeight="600">Bullish Marubozu</text>
            <text x="90" y="66" textAnchor="middle" fill="#00E676" fontSize="10" fontFamily="monospace">Close (High)</text>
            <rect x="65" y="70" width="50" height="100" fill="#00E676" rx="3" className={animated ? 'glow-bullish' : ''} />
            <text x="90" y="184" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Open (Low)</text>
          </g>

          {/* Bearish Marubozu */}
          <g className={animClass}>
            <text x="260" y="52" textAnchor="middle" fill="#FF1744" fontSize="11" fontWeight="600">Bearish Marubozu</text>
            <text x="260" y="66" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Open (High)</text>
            <rect x="235" y="70" width="50" height="100" fill="#FF1744" rx="3" className={animated ? 'glow-bearish' : ''} />
            <text x="260" y="184" textAnchor="middle" fill="#FF1744" fontSize="10" fontFamily="monospace">Close (Low)</text>
          </g>

          <text x="180" y="125" textAnchor="middle" fill="#64748b" fontSize="9">Almost NO Shadows/Wicks</text>
        </svg>
      );

    case 'doji':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Banner */}
          <rect x="20" y="8" width="320" height="22" fill="#991b1b" rx="4" />
          <text x="180" y="23" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">LONG SHADOWS, NO BODY · CONFUSION</text>

          {/* Classic Doji */}
          <g transform="translate(45, 40)">
            <text x="35" y="14" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">Classic Doji</text>
            <line x1="35" y1="25" x2="35" y2="125" stroke="#f59e0b" strokeWidth="2.5" />
            <line x1="15" y1="75" x2="55" y2="75" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <text x="35" y="142" textAnchor="middle" fill="#94a3b8" fontSize="9">War: Buyers/Sellers</text>
          </g>

          {/* Gravestone Doji */}
          <g transform="translate(145, 40)">
            <text x="35" y="14" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="600">Gravestone</text>
            <line x1="35" y1="25" x2="35" y2="115" stroke="#FF1744" strokeWidth="2.5" />
            <line x1="15" y1="115" x2="55" y2="115" stroke="#FF1744" strokeWidth="4" strokeLinecap="round" />
            <text x="35" y="142" textAnchor="middle" fill="#FF1744" fontSize="9">Bearish Reversal</text>
          </g>

          {/* Dragonfly Doji */}
          <g transform="translate(245, 40)">
            <text x="35" y="14" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="600">Dragonfly</text>
            <line x1="35" y1="35" x2="35" y2="125" stroke="#00E676" strokeWidth="2.5" />
            <line x1="15" y1="35" x2="55" y2="35" stroke="#00E676" strokeWidth="4" strokeLinecap="round" />
            <text x="35" y="142" textAnchor="middle" fill="#00E676" fontSize="9">Bullish Reversal</text>
          </g>

          <text x="180" y="192" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="600">
            ⚠️ IT DOESN'T WORK IN SIDEWAY MARKET. MARKET MUST BE TRENDING.
          </text>
        </svg>
      );

    case 'hammer':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Prior Downtrend line */}
          <path d="M 30 50 L 65 75 L 50 85 L 90 120" stroke="#FF1744" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="50" y="42" fill="#FF1744" fontSize="10" fontWeight="600">Downtrend</text>

          {/* Bullish Hammer */}
          <g transform="translate(110, 50)" className={animClass}>
            <text x="30" y="14" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="600">Green Hammer</text>
            <line x1="30" y1="28" x2="30" y2="110" stroke="#00E676" strokeWidth="2.5" />
            <rect x="15" y="28" width="30" height="24" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="30" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">Long Lower Wick</text>
          </g>

          {/* Bearish Hammer */}
          <g transform="translate(200, 50)" className={animClass}>
            <text x="30" y="14" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="600">Red Hammer</text>
            <line x1="30" y1="28" x2="30" y2="110" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="15" y="28" width="30" height="24" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="30" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8">Color Doesn't Matter</text>
          </g>

          {/* Reversal Arrow */}
          <path d="M 265 110 L 300 70 L 330 40" stroke="#00E676" strokeWidth="3" fill="none" markerEnd="url(#arrow-green)" />
          <text x="300" y="120" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="700">Bullish Reversal ↗</text>

          <text x="180" y="188" textAnchor="middle" fill="#38bdf8" fontSize="9">
            Short body · Long lower wick (2x-3x body) · Found in Downtrend
          </text>
        </svg>
      );

    case 'hanging-man':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Prior Uptrend */}
          <path d="M 30 140 L 70 110 L 60 95 L 105 60" stroke="#00E676" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="60" y="152" fill="#00E676" fontSize="10" fontWeight="600">Uptrend</text>

          {/* Hanging Man Red */}
          <g transform="translate(130, 40)" className={animClass}>
            <line x1="25" y1="20" x2="25" y2="105" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="10" y="20" width="30" height="22" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="25" y="12" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="600">Peak</text>
          </g>

          {/* Hanging Man Green */}
          <g transform="translate(195, 40)" className={animClass}>
            <line x1="25" y1="20" x2="25" y2="105" stroke="#00E676" strokeWidth="2.5" />
            <rect x="10" y="20" width="30" height="22" fill="#00E676" rx="2" />
          </g>

          {/* Bearish Reversal arrow */}
          <path d="M 255 65 L 290 100 L 325 145" stroke="#FF1744" strokeWidth="3" fill="none" />
          <text x="290" y="165" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="700">Bearish Reversal ↘</text>

          <rect x="60" y="172" width="240" height="20" fill="#1e293b" rx="4" />
          <text x="180" y="186" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">
            SHORT BODY, LONG WICKS · FOUND IN UPTREND
          </text>
        </svg>
      );

    case 'shooting-star':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Uptrend zig-zag */}
          <path d="M 25 150 L 50 120 L 40 105 L 75 80 L 65 70 L 105 45" stroke="#00E676" strokeWidth="2" fill="none" />
          <text x="50" y="165" fill="#00E676" fontSize="10" fontWeight="600">Uptrend</text>

          {/* Shooting Star Green & Red */}
          <g transform="translate(125, 30)">
            <line x1="20" y1="15" x2="20" y2="90" stroke="#00E676" strokeWidth="2.5" />
            <rect x="8" y="70" width="24" height="20" fill="#00E676" rx="2" />
            <text x="20" y="10" textAnchor="middle" fill="#64748b" fontSize="8">High</text>
          </g>
          <g transform="translate(175, 30)">
            <line x1="20" y1="15" x2="20" y2="90" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="8" y="70" width="24" height="20" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
          </g>

          {/* Slide Blue Breakdown Path (matching slide 8!) */}
          <path d="M 215 80 L 235 115 L 255 95 L 285 135 L 305 115 L 325 165" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <polygon points="325,165 315,158 328,153" fill="#38bdf8" />
          <text x="280" y="85" fill="#FF1744" fontSize="10" fontWeight="700">Bearish Trend Reversal</text>

          <text x="180" y="188" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Short Body, Long Upper Wick (Rejection) · Found in Uptrends
          </text>
        </svg>
      );

    case 'bullish-engulfing':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Downtrend indicator */}
          <path d="M 40 40 L 75 75 L 65 90 L 105 120" stroke="#FF1744" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="65" y="32" fill="#FF1744" fontSize="10" fontWeight="600">1) Downtrend</text>

          {/* Candle 1: Bearish Red */}
          <g transform="translate(130, 80)">
            <line x1="20" y1="5" x2="20" y2="70" stroke="#FF1744" strokeWidth="2" />
            <rect x="5" y="18" width="30" height="38" fill="#FF1744" rx="2" />
            <text x="20" y="12" textAnchor="middle" fill="#94a3b8" fontSize="8">Open</text>
            <text x="20" y="68" textAnchor="middle" fill="#FF1744" fontSize="8">Close</text>
          </g>

          {/* Candle 2: Bullish Green Engulfing */}
          <g transform="translate(185, 45)">
            <line x1="25" y1="5" x2="25" y2="125" stroke="#00E676" strokeWidth="2.5" />
            <rect x="5" y="15" width="40" height="100" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="52" y="30" fill="#00E676" fontSize="9" fontWeight="700">Close</text>
            <text x="52" y="112" fill="#94a3b8" fontSize="9">Open</text>
          </g>

          {/* Reversal Arrow */}
          <path d="M 255 85 L 290 55 L 325 25" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="325,25 312,28 322,38" fill="#00E676" />
          <text x="290" y="110" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="700">Beginning of Bullish Trend</text>

          <text x="180" y="188" textAnchor="middle" fill="#38bdf8" fontSize="9">
            2 Candlestick Pattern · Green candle fully engulfs red candle body
          </text>
        </svg>
      );

    case 'bearish-engulfing':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Uptrend indicator */}
          <path d="M 35 140 L 70 105 L 60 90 L 100 60" stroke="#00E676" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="60" y="155" fill="#00E676" fontSize="10" fontWeight="600">1) Uptrend</text>

          {/* Candle 1: Bullish Green */}
          <g transform="translate(130, 65)">
            <line x1="20" y1="5" x2="20" y2="70" stroke="#00E676" strokeWidth="2" />
            <rect x="5" y="15" width="30" height="40" fill="#00E676" rx="2" />
            <text x="20" y="10" textAnchor="middle" fill="#00E676" fontSize="8">Close</text>
            <text x="20" y="68" textAnchor="middle" fill="#94a3b8" fontSize="8">Open</text>
          </g>

          {/* Candle 2: Bearish Red Engulfing */}
          <g transform="translate(185, 35)">
            <line x1="25" y1="5" x2="25" y2="135" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="5" y="15" width="40" height="105" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="52" y="30" fill="#94a3b8" fontSize="9">Open</text>
            <text x="52" y="118" fill="#FF1744" fontSize="9" fontWeight="700">Close</text>
          </g>

          {/* Breakdown Arrow */}
          <path d="M 255 95 L 290 125 L 325 155" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="325,155 315,142 327,140" fill="#FF1744" />
          <text x="290" y="75" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="700">Beginning of Bearish Trend</text>

          <text x="180" y="188" textAnchor="middle" fill="#94a3b8" fontSize="9">
            2 Candlestick Pattern · Red candle fully engulfs prior green candle body
          </text>
        </svg>
      );

    case 'three-white-soldiers':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Downtrend leading */}
          <path d="M 25 35 L 55 70 L 45 85 L 75 125" stroke="#FF1744" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="45" y="25" fill="#FF1744" fontSize="9">Downtrend</text>

          {/* Soldier 1 */}
          <g transform="translate(100, 105)">
            <line x1="16" y1="4" x2="16" y2="60" stroke="#00E676" strokeWidth="2" />
            <rect x="4" y="12" width="24" height="36" fill="#00E676" rx="2" />
            <text x="16" y="8" textAnchor="middle" fill="#94a3b8" fontSize="8">1st</text>
          </g>

          {/* Soldier 2 */}
          <g transform="translate(150, 70)">
            <line x1="18" y1="4" x2="18" y2="78" stroke="#00E676" strokeWidth="2.5" />
            <rect x="4" y="10" width="28" height="55" fill="#00E676" rx="2" />
            <text x="18" y="6" textAnchor="middle" fill="#94a3b8" fontSize="8">2nd (Bigger)</text>
          </g>

          {/* Soldier 3 */}
          <g transform="translate(205, 30)">
            <line x1="20" y1="6" x2="20" y2="95" stroke="#00E676" strokeWidth="2.5" />
            <rect x="4" y="6" width="32" height="75" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="20" y="0" textAnchor="middle" fill="#00E676" fontSize="8" fontWeight="700">3rd (No Upper Wick)</text>
          </g>

          {/* Massive rally arrow */}
          <path d="M 260 70 L 300 40 L 335 15" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="335,15 322,18 332,28" fill="#00E676" />
          <text x="300" y="95" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="700">Very Powerful Bullish</text>
          <text x="300" y="110" textAnchor="middle" fill="#00E676" fontSize="9">Reversal Pattern</text>

          <text x="180" y="190" textAnchor="middle" fill="#38bdf8" fontSize="9">
            3 consecutive strong bullish candles with higher opens & closes
          </text>
        </svg>
      );

    case 'three-black-crows':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Uptrend leading */}
          <path d="M 25 150 L 55 110 L 45 95 L 80 50" stroke="#00E676" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="50" y="165" fill="#00E676" fontSize="9">Uptrend</text>

          {/* Crow 1 */}
          <g transform="translate(105, 40)">
            <line x1="16" y1="4" x2="16" y2="60" stroke="#FF1744" strokeWidth="2" />
            <rect x="4" y="12" width="24" height="36" fill="#FF1744" rx="2" />
            <text x="16" y="8" textAnchor="middle" fill="#94a3b8" fontSize="8">1st</text>
          </g>

          {/* Crow 2 */}
          <g transform="translate(155, 70)">
            <line x1="18" y1="4" x2="18" y2="78" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="4" y="10" width="28" height="55" fill="#FF1744" rx="2" />
            <text x="18" y="6" textAnchor="middle" fill="#94a3b8" fontSize="8">2nd (Bigger)</text>
          </g>

          {/* Crow 3 */}
          <g transform="translate(210, 105)">
            <line x1="20" y1="6" x2="20" y2="75" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="4" y="6" width="32" height="68" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="20" y="86" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="700">3rd (No Lower Wick)</text>
          </g>

          {/* Plunge arrow */}
          <path d="M 265 110 L 305 145 L 335 175" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="335,175 324,162 334,160" fill="#FF1744" />
          <text x="300" y="75" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="700">Bearish Trend</text>
          <text x="300" y="90" textAnchor="middle" fill="#FF1744" fontSize="9">Reversal</text>

          <text x="180" y="190" textAnchor="middle" fill="#cbd5e1" fontSize="9">
            3 consecutive big bearish candles opening inside prior body and closing lower
          </text>
        </svg>
      );

    case 'morning-star':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Downtrend indicator */}
          <path d="M 30 30 L 60 60 L 50 75 L 85 105" stroke="#FF1744" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          
          {/* 1st: Tall Bearish */}
          <g transform="translate(100, 50)">
            <line x1="20" y1="5" x2="20" y2="95" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="5" y="15" width="30" height="70" fill="#FF1744" rx="2" />
            <text x="20" y="8" textAnchor="middle" fill="#FF1744" fontSize="8">1: Bearish</text>
          </g>

          {/* 2nd: Star (can be red or green) */}
          <g transform="translate(160, 115)">
            <line x1="16" y1="4" x2="16" y2="40" stroke="#f59e0b" strokeWidth="2" />
            <rect x="4" y="12" width="24" height="16" fill="#FF1744" rx="2" />
            <text x="16" y="44" textAnchor="middle" fill="#94a3b8" fontSize="8">2: Star</text>
          </g>

          {/* 3rd: Bullish Green surging >50% */}
          <g transform="translate(210, 60)">
            <line x1="20" y1="5" x2="20" y2="95" stroke="#00E676" strokeWidth="2.5" />
            <rect x="5" y="10" width="30" height="75" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="20" y="4" textAnchor="middle" fill="#00E676" fontSize="8">3: Bullish</text>
          </g>

          {/* 50% retracement line */}
          <line x1="135" y1="85" x2="215" y2="85" stroke="#38bdf8" strokeDasharray="2 2" strokeWidth="1.5" />
          <text x="175" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8">&gt; 50% body</text>

          {/* Reversal Arrow */}
          <path d="M 260 70 L 295 40 L 330 15" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="330,15 317,18 327,28" fill="#00E676" />
          <text x="295" y="105" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="700">Beginning of New Trend</text>

          <text x="180" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Formed in downtrend · 2nd candle color doesn't matter · 3rd must be strong Bullish
          </text>
        </svg>
      );

    case 'evening-star':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Uptrend indicator */}
          <path d="M 30 150 L 60 120 L 50 105 L 85 75" stroke="#00E676" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          
          {/* 1st: Bullish Green */}
          <g transform="translate(100, 65)">
            <line x1="20" y1="5" x2="20" y2="95" stroke="#00E676" strokeWidth="2.5" />
            <rect x="5" y="10" width="30" height="75" fill="#00E676" rx="2" />
            <text x="20" y="96" textAnchor="middle" fill="#00E676" fontSize="8">1: Bullish</text>
          </g>

          {/* 2nd: Star at Peak */}
          <g transform="translate(160, 30)">
            <line x1="16" y1="4" x2="16" y2="40" stroke="#f59e0b" strokeWidth="2" />
            <rect x="4" y="12" width="24" height="16" fill="#00E676" rx="2" />
            <text x="16" y="8" textAnchor="middle" fill="#94a3b8" fontSize="8">2: Peak Star</text>
          </g>

          {/* 3rd: Bearish Red */}
          <g transform="translate(210, 65)">
            <line x1="20" y1="5" x2="20" y2="95" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="5" y="15" width="30" height="70" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="20" y="96" textAnchor="middle" fill="#FF1744" fontSize="8">3: Bearish</text>
          </g>

          {/* Breakdown Arrow */}
          <path d="M 260 110 L 295 140 L 330 170" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="330,170 318,158 329,155" fill="#FF1744" />
          <text x="295" y="75" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="700">Bearish Reversal Candle</text>
          <text x="295" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">Beginning of new trend</text>

          <text x="180" y="190" textAnchor="middle" fill="#38bdf8" fontSize="9">
            Formed in Uptrend · 2nd candle color doesn't matter · 3rd must be strong Bearish
          </text>
        </svg>
      );

    case 'bullish-harami':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Downtrend */}
          <path d="M 35 35 L 75 75 L 65 90 L 105 125" stroke="#FF1744" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="65" y="28" fill="#FF1744" fontSize="9">Downtrend</text>

          {/* Large Mother Red Candle */}
          <g transform="translate(130, 45)">
            <line x1="22" y1="5" x2="22" y2="120" stroke="#FF1744" strokeWidth="2.5" />
            <rect x="5" y="15" width="35" height="95" fill="#FF1744" rx="3" />
            <text x="22" y="10" textAnchor="middle" fill="#FF1744" fontSize="8">Mother</text>
          </g>

          {/* Small Inside Baby Green Candle */}
          <g transform="translate(195, 75)">
            <line x1="16" y1="4" x2="16" y2="55" stroke="#00E676" strokeWidth="2" />
            <rect x="4" y="12" width="24" height="32" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="16" y="8" textAnchor="middle" fill="#00E676" fontSize="8">Inside</text>
          </g>

          {/* Range bounds dotted lines */}
          <line x1="165" y1="60" x2="225" y2="60" stroke="#475569" strokeDasharray="2 2" />
          <line x1="165" y1="140" x2="225" y2="140" stroke="#475569" strokeDasharray="2 2" />

          {/* Upside break */}
          <path d="M 245 80 L 285 50 L 325 25" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="325,25 312,28 322,38" fill="#00E676" />
          <text x="285" y="105" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="700">Bullish Reversal</text>
          <text x="285" y="120" textAnchor="middle" fill="#38bdf8" fontSize="9">"Easy to Spot"</text>

          <text x="180" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">
            The red candle fully engulfs small bullish candle · Found in downtrend
          </text>
        </svg>
      );

    case 'bearish-harami':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Uptrend */}
          <path d="M 35 145 L 75 105 L 65 90 L 105 55" stroke="#00E676" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          <text x="65" y="160" fill="#00E676" fontSize="9">Uptrend</text>

          {/* Large Mother Green Candle */}
          <g transform="translate(130, 45)">
            <line x1="22" y1="5" x2="22" y2="120" stroke="#00E676" strokeWidth="2.5" />
            <rect x="5" y="15" width="35" height="95" fill="#00E676" rx="3" />
            <text x="22" y="10" textAnchor="middle" fill="#00E676" fontSize="8">Mother</text>
          </g>

          {/* Small Inside Baby Red Candle */}
          <g transform="translate(195, 75)">
            <line x1="16" y1="4" x2="16" y2="55" stroke="#FF1744" strokeWidth="2" />
            <rect x="4" y="12" width="24" height="32" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="16" y="8" textAnchor="middle" fill="#FF1744" fontSize="8">Inside</text>
          </g>

          {/* Range bounds dotted lines */}
          <line x1="165" y1="60" x2="225" y2="60" stroke="#475569" strokeDasharray="2 2" />
          <line x1="165" y1="140" x2="225" y2="140" stroke="#475569" strokeDasharray="2 2" />

          {/* Downside break */}
          <path d="M 245 95 L 285 125 L 325 155" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="325,155 315,142 327,140" fill="#FF1744" />
          <text x="285" y="75" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="700">Bearish Reversal</text>
          <text x="285" y="90" textAnchor="middle" fill="#38bdf8" fontSize="9">"Easy to Spot"</text>

          <text x="180" y="190" textAnchor="middle" fill="#94a3b8" fontSize="9">
            The green candle fully engulfs small bearish candle · Found in uptrend
          </text>
        </svg>
      );

    // ==================== CHART PATTERNS ====================

    case 'symmetrical-triangle':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Inbound Trend */}
          <path d="M 20 160 L 60 90" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Triangle Structure: Descending Resistance & Ascending Support */}
          <line x1="60" y1="90" x2="240" y2="115" stroke="#FF1744" strokeWidth="2.5" />
          <line x1="90" y1="150" x2="240" y2="115" stroke="#00E676" strokeWidth="2.5" />

          {/* Price Oscillations inside */}
          <path d="M 60 90 L 90 150 L 130 100 L 160 140 L 195 107 L 220 128 L 245 108" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Breakout Path */}
          <path d="M 245 108 L 275 65" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="275,65 262,68 272,78" fill="#00E676" />

          {/* Target Projection Bar (matching slide 17!) */}
          <rect x="60" y="90" width="8" height="60" fill="#38bdf8" opacity="0.4" />
          <line x1="60" y1="90" x2="68" y2="90" stroke="#38bdf8" strokeWidth="2" />
          <line x1="60" y1="150" x2="68" y2="150" stroke="#38bdf8" strokeWidth="2" />
          <text x="64" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">Base</text>

          {/* Projected Target at Breakout */}
          <rect x="270" y="35" width="8" height="60" fill="#38bdf8" opacity="0.6" />
          <text x="310" y="65" fill="#FF1744" fontSize="11" fontWeight="800" fontFamily="sans-serif">TARGET</text>

          {/* Annotation from slide */}
          <text x="180" y="185" textAnchor="middle" fill="#cbd5e1" fontSize="9">
            Need ≥2 resistance lows & ≥2 support highs · Wait for breakout / breakdown
          </text>
        </svg>
      );

    case 'ascending-triangle':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Horizontal Straight Resistance */}
          <line x1="50" y1="75" x2="250" y2="75" stroke="#FF1744" strokeWidth="3" />
          <text x="150" y="65" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="700">Horizontal Resistance (Straight)</text>

          {/* Ascending Support Line */}
          <line x1="50" y1="165" x2="250" y2="75" stroke="#00E676" strokeWidth="2.5" />
          <text x="135" y="160" fill="#00E676" fontSize="9" fontWeight="600">Ascending Support Line ↗</text>

          {/* Price action bouncing inside */}
          <path d="M 25 150 L 50 165 L 85 75 L 125 135 L 165 75 L 205 105 L 240 75" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Breakout arrow */}
          <path d="M 240 75 L 270 35 L 300 20" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="300,20 287,23 297,33" fill="#00E676" />

          {/* Target Projection Bar (matching slide 18!) */}
          <rect x="85" y="75" width="8" height="90" fill="#38bdf8" opacity="0.3" />
          <rect x="270" y="20" width="8" height="90" fill="#38bdf8" opacity="0.6" />
          <text x="290" y="65" fill="#38bdf8" fontSize="9" fontWeight="700">Target Height</text>

          <text x="180" y="188" textAnchor="middle" fill="#00E676" fontSize="9" fontWeight="700">
            "BULLISH PATTERN" · Wait for breakout · At least 2 horizontal resistance touches
          </text>
        </svg>
      );

    case 'descending-triangle':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Descending Resistance line */}
          <line x1="50" y1="60" x2="250" y2="145" stroke="#FF1744" strokeWidth="2.5" />
          <text x="145" y="85" fill="#FF1744" fontSize="9" fontWeight="600">Resistance towards downside ↘</text>

          {/* Horizontal Straight Support */}
          <line x1="50" y1="145" x2="270" y2="145" stroke="#00E676" strokeWidth="3" />
          <text x="120" y="165" textAnchor="middle" fill="#00E676" fontSize="9" fontWeight="700">Straight Support Line</text>

          {/* Price bouncing inside */}
          <path d="M 25 50 L 50 60 L 85 145 L 125 90 L 165 145 L 205 120 L 245 145" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Breakdown arrow */}
          <path d="M 245 145 L 270 180 L 290 195" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="290,195 282,183 294,182" fill="#FF1744" />

          {/* Target Bar (matching slide 19!) */}
          <rect x="85" y="60" width="8" height="85" fill="#38bdf8" opacity="0.3" />
          <rect x="265" y="145" width="8" height="85" fill="#38bdf8" opacity="0.6" />
          <text x="290" y="170" fill="#FF1744" fontSize="9" fontWeight="700">Target</text>

          <text x="180" y="30" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="700">
            "BEARISH PATTERN" · Wait for breakdown · At least 2 support floor levels
          </text>
        </svg>
      );

    case 'head-and-shoulders':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Shaded peaks matching slide 20! */}
          {/* Left shoulder */}
          <polygon points="65,140 105,75 145,140" fill="#FF1744" opacity="0.3" />
          <text x="105" y="70" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="700">Left Shoulder</text>

          {/* Head (Highest Peak) */}
          <polygon points="125,140 180,35 235,140" fill="#FF1744" opacity="0.5" />
          <text x="180" y="28" textAnchor="middle" fill="#FF1744" fontSize="11" fontWeight="800">Head</text>

          {/* Right Shoulder */}
          <polygon points="215,140 255,75 295,140" fill="#FF1744" opacity="0.3" />
          <text x="255" y="70" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="700">Right Shoulder</text>

          {/* Neckline */}
          <line x1="50" y1="140" x2="330" y2="140" stroke="#0ea5e9" strokeWidth="3" />
          <rect x="155" y="148" width="50" height="18" fill="#0ea5e9" rx="3" />
          <text x="180" y="161" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">Neckline</text>

          {/* Free fall arrow */}
          <path d="M 295 140 L 320 175" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="320,175 310,163 322,162" fill="#FF1744" />
          <text x="315" y="130" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="700">Free Fall</text>

          <text x="180" y="188" textAnchor="middle" fill="#38bdf8" fontSize="9">
            BEARISH REVERSAL · Found in Uptrends · Bigger timeframes (4h, Daily) recommended
          </text>
        </svg>
      );

    case 'inverse-head-and-shoulders':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Shaded inverted peaks matching slide 21! */}
          {/* Inverted Left shoulder */}
          <polygon points="65,70 105,135 145,70" fill="#38bdf8" opacity="0.3" />
          <text x="105" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">Left Shoulder</text>

          {/* Head (Lowest trough) */}
          <polygon points="125,70 180,175 235,70" fill="#38bdf8" opacity="0.5" />
          <text x="180" y="190" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800">Head</text>

          {/* Inverted Right Shoulder */}
          <polygon points="215,70 255,135 295,70" fill="#38bdf8" opacity="0.3" />
          <text x="255" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="700">Right Shoulder</text>

          {/* Neckline */}
          <line x1="50" y1="70" x2="330" y2="70" stroke="#00E676" strokeWidth="3" />
          <rect x="155" y="44" width="50" height="18" fill="#00E676" rx="3" />
          <text x="180" y="57" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">Neckline</text>

          {/* Rally Upside Arrow */}
          <path d="M 295 70 L 325 25" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="325,25 312,28 322,38" fill="#00E676" />
          <text x="315" y="85" textAnchor="middle" fill="#00E676" fontSize="8" fontWeight="700">Rally Upside</text>

          <text x="180" y="24" textAnchor="middle" fill="#00E676" fontSize="9">
            BULLISH REVERSAL · Found in Downtrends · 4h, 1h, Daily charts for best results
          </text>
        </svg>
      );

    case 'double-bottom':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Prior Downtrend */}
          <line x1="20" y1="50" x2="70" y2="150" stroke="#FF1744" strokeWidth="2.5" />

          {/* 'W' formation path matching slide 22! */}
          <path d="M 70 150 L 155 85 L 240 150 L 320 60" stroke="#FF1744" strokeWidth="2.5" fill="none" />
          <polygon points="320,60 307,63 317,73" fill="#FF1744" />

          {/* Neckline */}
          <line x1="100" y1="85" x2="280" y2="85" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="3 3" />
          <rect x="135" y="70" width="45" height="16" fill="#0ea5e9" rx="2" />
          <text x="157" y="82" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Neckline</text>

          {/* Bottom Markers */}
          <rect x="45" y="158" width="55" height="18" fill="#dc2626" rx="3" />
          <text x="72" y="171" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">1st Bottom</text>

          <rect x="215" y="158" width="55" height="18" fill="#dc2626" rx="3" />
          <text x="242" y="171" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">2nd Bottom</text>

          {/* Measured Height Arrow */}
          <line x1="155" y1="85" x2="155" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="240" y1="85" x2="240" y2="20" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />
          <text x="280" y="45" fill="#00E676" fontSize="9" fontWeight="700">Bullish Rally ↗</text>

          <text x="180" y="192" textAnchor="middle" fill="#38bdf8" fontSize="9">
            Resembles letter "W" · Formed at end of downtrend · Bullish reversal on neckline break
          </text>
        </svg>
      );

    case 'double-top':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Prior Uptrend */}
          <line x1="30" y1="160" x2="80" y2="55" stroke="#00E676" strokeWidth="2.5" />
          <text x="45" y="130" fill="#00E676" fontSize="9" fontWeight="700">Uptrend</text>

          {/* 'M' formation */}
          <path d="M 80 55 L 160 125 L 240 55 L 320 160" stroke="#FF1744" strokeWidth="2.5" fill="none" />
          <polygon points="320,160 310,148 322,147" fill="#FF1744" />

          {/* Neckline */}
          <line x1="100" y1="125" x2="280" y2="125" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="3 3" />
          <rect x="138" y="128" width="45" height="16" fill="#0ea5e9" rx="2" />
          <text x="160" y="140" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Neckline</text>

          {/* Top Markers */}
          <rect x="58" y="32" width="48" height="18" fill="#dc2626" rx="3" />
          <text x="82" y="45" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">First Top</text>

          <rect x="218" y="32" width="55" height="18" fill="#dc2626" rx="3" />
          <text x="245" y="45" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Second Top</text>

          <text x="290" y="105" fill="#FF1744" fontSize="9" fontWeight="700">Price Drops ↘</text>

          <text x="180" y="188" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="700">
            BEARISH REVERSAL PATTERN · ONLY FOUND IN UPTREND · Resembles letter "M"
          </text>
        </svg>
      );

    case 'bull-flag':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Uptrend Flag Pole */}
          <line x1="30" y1="170" x2="105" y2="60" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <rect x="40" y="110" width="48" height="16" fill="#000000" rx="2" stroke="#64748b" />
          <text x="64" y="122" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Flag Pole</text>

          {/* Downward sloping parallel channel */}
          <line x1="105" y1="60" x2="230" y2="110" stroke="#00E676" strokeWidth="2.5" />
          <line x1="90" y1="105" x2="215" y2="155" stroke="#00E676" strokeWidth="2.5" />

          {/* Zig-zag consolidation */}
          <path d="M 105 60 L 125 120 L 155 80 L 180 140 L 210 100 L 225 108" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Entry point circle */}
          <circle cx="218" cy="105" r="4" fill="#38bdf8" />
          <rect x="200" y="68" width="52" height="18" fill="#000000" rx="2" stroke="#38bdf8" />
          <text x="226" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="700">Entry Point</text>

          {/* Breakout target arrow matching flagpole */}
          <line x1="225" y1="108" x2="300" y2="20" stroke="#00E676" strokeWidth="3.5" />
          <polygon points="300,20 287,24 296,34" fill="#00E676" />
          <text x="290" y="60" fill="#00E676" fontSize="9" fontWeight="700">Target = Pole Size</text>

          <text x="180" y="188" textAnchor="middle" fill="#cbd5e1" fontSize="9">
            Continuation Pattern · Occurs in Uptrend · Breakout entry triggers explosive continuation
          </text>
        </svg>
      );

    case 'bear-flag':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Downtrend Flag Pole */}
          <line x1="30" y1="30" x2="105" y2="140" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <rect x="40" y="75" width="48" height="16" fill="#000000" rx="2" stroke="#64748b" />
          <text x="64" y="87" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Flag Pole</text>

          {/* Upward sloping parallel channel */}
          <line x1="90" y1="150" x2="215" y2="90" stroke="#FF1744" strokeWidth="2.5" />
          <line x1="105" y1="105" x2="230" y2="45" stroke="#FF1744" strokeWidth="2.5" />

          {/* Zig-zag inside */}
          <path d="M 105 140 L 125 75 L 155 120 L 185 60 L 210 100 L 220 92" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Breakdown entry point */}
          <circle cx="218" cy="90" r="4" fill="#FF1744" />
          <rect x="200" y="115" width="52" height="18" fill="#000000" rx="2" stroke="#FF1744" />
          <text x="226" y="128" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="700">Entry Point</text>

          {/* Breakdown target arrow */}
          <line x1="220" y1="92" x2="295" y2="185" stroke="#FF1744" strokeWidth="3.5" />
          <polygon points="295,185 285,173 297,172" fill="#FF1744" />
          <text x="290" y="145" fill="#FF1744" fontSize="9" fontWeight="700">Target = Pole</text>

          <text x="180" y="188" textAnchor="middle" fill="#cbd5e1" fontSize="9">
            Continuation Pattern · Occurs in Downtrend · Upon breakdown take entry
          </text>
        </svg>
      );

    case 'cup-and-handle':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Horizontal Neckline */}
          <line x1="40" y1="65" x2="290" y2="65" stroke="#0ea5e9" strokeWidth="2.5" />
          <rect x="150" y="48" width="45" height="16" fill="#0ea5e9" rx="2" />
          <text x="172" y="60" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Neckline</text>

          {/* Inbound Uptrend */}
          <path d="M 25 140 L 50 100 L 40 90 L 65 65" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Rounded Cup */}
          <path d="M 65 65 Q 135 180 205 65" stroke="#ffffff" strokeWidth="3" fill="none" />
          <rect x="125" y="165" width="30" height="16" fill="#000000" rx="2" stroke="#64748b" />
          <text x="140" y="177" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Cup</text>

          {/* Handle */}
          <path d="M 205 65 Q 235 115 255 65" stroke="#ffffff" strokeWidth="3" fill="none" />
          <rect x="220" y="112" width="35" height="16" fill="#000000" rx="2" stroke="#64748b" />
          <text x="237" y="124" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Handle</text>

          {/* Measured depth */}
          <line x1="135" y1="65" x2="135" y2="155" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />

          {/* Breakout Arrow */}
          <path d="M 255 65 L 285 30 L 315 15" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="315,15 302,18 312,28" fill="#00E676" />
          <text x="290" y="85" fill="#00E676" fontSize="9" fontWeight="700">Target = Cup Length</text>

          <text x="180" y="192" textAnchor="middle" fill="#cbd5e1" fontSize="9">
            Structure: rounded bottom cup followed by handle · Wait for breakout, take entry
          </text>
        </svg>
      );

    case 'falling-wedge':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Falling converging boundaries */}
          <line x1="60" y1="50" x2="250" y2="140" stroke="#FF1744" strokeWidth="2.5" />
          <text x="145" y="65" fill="#FF1744" fontSize="9" fontWeight="600">Resistance ↘</text>

          <line x1="40" y1="120" x2="250" y2="160" stroke="#00E676" strokeWidth="2.5" />
          <text x="120" y="165" fill="#00E676" fontSize="9" fontWeight="600">Support ↘</text>

          {/* Price oscillation narrowing */}
          <path d="M 25 150 L 60 50 L 100 135 L 140 85 L 180 148 L 220 120 L 240 155" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Breakout & Buying Zone (matching slide 27!) */}
          <path d="M 240 135 L 280 90 L 320 60" stroke="#00E676" strokeWidth="3" fill="none" />
          <polygon points="320,60 307,63 317,73" fill="#00E676" />

          <rect x="250" y="130" width="70" height="20" fill="#000000" rx="3" stroke="#00E676" />
          <text x="285" y="144" textAnchor="middle" fill="#00E676" fontSize="9" fontWeight="800">Buying Zone</text>

          <text x="180" y="188" textAnchor="middle" fill="#38bdf8" fontSize="9">
            BULLISH REVERSAL · Widest at top, becomes narrower downward · Targets = upper resistance levels
          </text>
        </svg>
      );

    case 'rising-wedge':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Prior Downtrend */}
          <path d="M 25 35 L 60 145" stroke="#FF1744" strokeWidth="2" fill="none" />
          <text x="35" y="25" fill="#FF1744" fontSize="9">Downtrend</text>

          {/* Ascending boundaries: Support is steeper than resistance (matching slide 28!) */}
          <line x1="60" y1="145" x2="250" y2="55" stroke="#00E676" strokeWidth="2.5" />
          <text x="130" y="135" fill="#00E676" fontSize="8">Support (Steeper) ↗</text>

          <line x1="85" y1="110" x2="250" y2="45" stroke="#FF1744" strokeWidth="2" />
          <text x="160" y="65" fill="#FF1744" fontSize="8">Resistance ↗</text>

          {/* Price oscillation coiling */}
          <path d="M 60 145 L 85 110 L 120 125 L 155 85 L 195 100 L 235 60 L 245 75" stroke="#38bdf8" strokeWidth="2" fill="none" />

          {/* Breakdown & Selling Zone */}
          <path d="M 245 75 L 280 120 L 315 165" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="315,165 305,152 317,150" fill="#FF1744" />

          <rect x="250" y="45" width="80" height="20" fill="#000000" rx="3" stroke="#FF1744" />
          <text x="290" y="59" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="800">Selling Zone</text>

          <text x="180" y="188" textAnchor="middle" fill="#FF1744" fontSize="9">
            BEARISH REVERSAL · Support steeper than resistance · Interpretation: wait for breakdown & sell
          </text>
        </svg>
      );

    case 'pin-bar':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Key Support and Resistance Lines */}
          <line x1="30" y1="140" x2="160" y2="140" stroke="#00E676" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="200" y1="60" x2="330" y2="60" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Bullish Pin Bar */}
          <g className={animClass}>
            {!quizMode && <text x="95" y="24" textAnchor="middle" fill="#00E676" fontSize="11" fontWeight="700">Bullish Pin Bar</text>}
            {/* Long lower rejection wick */}
            <line x1="95" y1="52" x2="95" y2="165" stroke="#00E676" strokeWidth="2.5" />
            {/* Small real body at the top */}
            <rect x="80" y="52" width="30" height="20" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
            <text x="135" y="65" fill="#00E676" fontSize="9" fontFamily="monospace">Nose (Entry)</text>
            <text x="95" y="180" textAnchor="middle" fill="#64748b" fontSize="8">Rejection Tail (&gt;66%)</text>
          </g>

          {/* Bearish Pin Bar */}
          <g className={animClass}>
            {!quizMode && <text x="265" y="24" textAnchor="middle" fill="#FF1744" fontSize="11" fontWeight="700">Bearish Pin Bar</text>}
            {/* Long upper rejection wick */}
            <line x1="265" y1="35" x2="265" y2="148" stroke="#FF1744" strokeWidth="2.5" />
            {/* Small real body at bottom */}
            <rect x="250" y="128" width="30" height="20" fill="#FF1744" rx="2" className={animated ? 'glow-bearish' : ''} />
            <text x="210" y="140" fill="#FF1744" fontSize="9" fontFamily="monospace">Entry</text>
            <text x="265" y="20" textAnchor="middle" fill="#64748b" fontSize="8">Liquidity Wick (&gt;66%)</text>
          </g>

          {!quizMode && (
            <text x="180" y="194" textAnchor="middle" fill="#38bdf8" fontSize="9">
              FOREX PIN BAR · Massive Rejection Wick · Probes Liquidity & Snaps Back
            </text>
          )}
        </svg>
      );

    case 'tweezer-tops-bottoms':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Tweezer Tops */}
          <g transform="translate(10, 10)">
            <line x1="30" y1="40" x2="140" y2="40" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="85" y="32" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="bold">Identical Highs (Resistance)</text>
            {/* Candle 1 (Green) */}
            <line x1="65" y1="40" x2="65" y2="130" stroke="#00E676" strokeWidth="2" />
            <rect x="52" y="60" width="26" height="55" fill="#00E676" rx="2" />
            {/* Candle 2 (Red - matching high wick) */}
            <line x1="105" y1="40" x2="105" y2="135" stroke="#FF1744" strokeWidth="2" />
            <rect x="92" y="60" width="26" height="60" fill="#FF1744" rx="2" />
            {!quizMode && <text x="85" y="152" textAnchor="middle" fill="#FF1744" fontSize="10" fontWeight="bold">Tweezer Tops (Bearish)</text>}
          </g>

          {/* Tweezer Bottoms */}
          <g transform="translate(190, 10)">
            <line x1="30" y1="130" x2="140" y2="130" stroke="#00E676" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="85" y="145" textAnchor="middle" fill="#00E676" fontSize="8" fontWeight="bold">Identical Lows (Support)</text>
            {/* Candle 1 (Red) */}
            <line x1="65" y1="50" x2="65" y2="130" stroke="#FF1744" strokeWidth="2" />
            <rect x="52" y="60" width="26" height="55" fill="#FF1744" rx="2" />
            {/* Candle 2 (Green - matching low wick) */}
            <line x1="105" y1="45" x2="105" y2="130" stroke="#00E676" strokeWidth="2" />
            <rect x="92" y="55" width="26" height="60" fill="#00E676" rx="2" />
            {!quizMode && <text x="85" y="25" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="bold">Tweezer Bottoms (Bullish)</text>}
          </g>

          {!quizMode && (
            <text x="180" y="192" textAnchor="middle" fill="#94a3b8" fontSize="9">
              Equal-Length Rejection Wicks at Key Liquidity Level
            </text>
          )}
        </svg>
      );

    case 'inside-bar':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Mother Bar High and Low Bounds */}
          <line x1="50" y1="35" x2="280" y2="35" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="300" y="38" fill="#f59e0b" fontSize="8" fontFamily="monospace">Mother High</text>

          <line x1="50" y1="165" x2="280" y2="165" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="300" y="168" fill="#f59e0b" fontSize="8" fontFamily="monospace">Mother Low</text>

          {/* Candle 1: Mother Bar */}
          <g transform="translate(100, 0)">
            <line x1="30" y1="35" x2="30" y2="165" stroke="#00E676" strokeWidth="2.5" />
            <rect x="12" y="55" width="36" height="90" fill="#00E676" rx="2" />
            <text x="30" y="180" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">Mother Bar</text>
          </g>

          {/* Candle 2: Inside Bar (completely enveloped inside Mother Bar) */}
          <g transform="translate(180, 0)">
            <line x1="30" y1="60" x2="30" y2="140" stroke="#FF1744" strokeWidth="2" />
            <rect x="18" y="75" width="24" height="50" fill="#FF1744" rx="2" />
            <text x="30" y="180" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="600">Inside Bar</text>
          </g>

          {/* Volatility compression indicator bracket */}
          <path d="M 235 60 L 245 60 L 245 100 L 255 100 L 245 100 L 245 140 L 235 140" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
          <text x="260" y="104" fill="#0ea5e9" fontSize="8">Contraction</text>

          {!quizMode && (
            <text x="180" y="20" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
              INSIDE BAR · Volatility Squeeze Preceding Explosive Breakout
            </text>
          )}
        </svg>
      );

    case 'fair-value-gap':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Candle 1 (Preceding Base Candle) */}
          <g transform="translate(60, 0)">
            <text x="20" y="24" textAnchor="middle" fill="#64748b" fontSize="9">Candle 1</text>
            <line x1="20" y1="80" x2="20" y2="160" stroke="#00E676" strokeWidth="2" />
            <rect x="8" y="100" width="24" height="45" fill="#00E676" rx="2" />
            {/* Candle 1 High Line */}
            <line x1="20" y1="80" x2="260" y2="80" stroke="#00E676" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Candle 2 (Displacement Surge) */}
          <g transform="translate(130, 0)">
            <text x="25" y="24" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Displacement</text>
            <line x1="25" y1="28" x2="25" y2="120" stroke="#00E676" strokeWidth="2.5" />
            <rect x="8" y="35" width="34" height="75" fill="#00E676" rx="2" className={animated ? 'glow-bullish' : ''} />
          </g>

          {/* Candle 3 (Leaving Open Gap) */}
          <g transform="translate(200, 0)">
            <text x="20" y="24" textAnchor="middle" fill="#64748b" fontSize="9">Candle 3</text>
            <line x1="20" y1="20" x2="20" y2="60" stroke="#00E676" strokeWidth="2" />
            <rect x="8" y="25" width="24" height="28" fill="#00E676" rx="2" />
            {/* Candle 3 Low Line */}
            <line x1="20" y1="60" x2="90" y2="60" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Shaded FVG Zone (between Candle 1 High and Candle 3 Low) */}
          <rect x="75" y="60" width="165" height="20" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" rx="3" />
          {/* Consequent Encroachment (50% midpoint) */}
          <line x1="75" y1="70" x2="240" y2="70" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />

          {/* Price Retest Arrow */}
          <path d="M 260 40 L 260 68" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="265" y="73" fill="#f59e0b" fontSize="8" fontWeight="bold">50% CE Retest</text>

          <rect x="85" y="165" width="190" height="22" fill="#0f172a" rx="4" stroke="#0284c7" />
          <text x="180" y="180" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
            {quizMode ? '3-CANDLE IMBALANCE VOID' : 'FAIR VALUE GAP (FVG) · INSTITUTIONAL VOID'}
          </text>
        </svg>
      );

    case 'liquidity-sweep':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Equal Highs / Resistance Plane */}
          <line x1="40" y1="90" x2="320" y2="90" stroke="#FF1744" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="50" y="82" fill="#FF1744" fontSize="9" fontWeight="bold">Equal Highs / Buy-Stops Pool</text>

          {/* Swing 1 High */}
          <path d="M 60 140 L 90 90 L 120 135" stroke="#94a3b8" strokeWidth="2" fill="none" />
          {/* Swing 2 High */}
          <path d="M 120 135 L 160 90 L 200 130" stroke="#94a3b8" strokeWidth="2" fill="none" />

          {/* The Sweep / Judas Swing Spike */}
          <path d="M 200 130 L 235 45" stroke="#FF1744" strokeWidth="2.5" fill="none" />
          <circle cx="235" cy="45" r="4" fill="#FF1744" className={animated ? 'animate-ping' : ''} />
          <text x="235" y="32" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="bold">STOP HUNT SPIKE</text>

          {/* Aggressive Dump back inside */}
          <path d="M 235 45 L 255 105 L 290 170" stroke="#FF1744" strokeWidth="3" fill="none" />
          <polygon points="290,170 282,158 294,156" fill="#FF1744" />

          <rect x="230" y="110" width="100" height="20" fill="#1e1b4b" rx="3" stroke="#818cf8" />
          <text x="280" y="124" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontWeight="bold">Real Trend Direction</text>

          {!quizMode && (
            <text x="180" y="192" textAnchor="middle" fill="#38bdf8" fontSize="9">
              LIQUIDITY SWEEP (JUDAS SWING) · Traps Breakout Retailers
            </text>
          )}
        </svg>
      );

    case 'order-block':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Prior Downtrend */}
          <path d="M 40 50 L 80 110" stroke="#64748b" strokeWidth="1.5" />

          {/* Order Block Candle (Last Down Candle) */}
          <g transform="translate(85, 90)">
            <line x1="15" y1="0" x2="15" y2="60" stroke="#FF1744" strokeWidth="2" />
            <rect x="5" y="12" width="20" height="36" fill="#FF1744" rx="2" />
            <text x="15" y="75" textAnchor="middle" fill="#FF1744" fontSize="8">Last Red Candle</text>
          </g>

          {/* High-Velocity Impulse Rally */}
          <path d="M 115 110 L 155 40 L 195 30" stroke="#00E676" strokeWidth="3" fill="none" />
          <text x="155" y="24" fill="#00E676" fontSize="8" fontWeight="bold">BOS (Break of Structure)</text>

          {/* Order Block Zone Shading */}
          <rect x="90" y="102" width="180" height="36" fill="#00E676" fillOpacity="0.2" stroke="#00E676" strokeDasharray="3 3" rx="3" />
          <text x="200" y="124" fill="#00E676" fontSize="9" fontWeight="bold">Institutional Order Block (OB)</text>

          {/* Pullback into OB and bounce */}
          <path d="M 195 30 L 235 110 L 275 60 L 315 20" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <circle cx="235" cy="110" r="4" fill="#00E676" />
          <text x="235" y="152" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Bounce Entry</text>

          {!quizMode && (
            <text x="180" y="190" textAnchor="middle" fill="#38bdf8" fontSize="9">
              ORDER BLOCK (OB) · Institutional Entry Footprint Retested
            </text>
          )}
        </svg>
      );

    case 'quasimodo':
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          {/* Left Shoulder Horizontal Line */}
          <line x1="60" y1="80" x2="310" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="60" y="70" fill="#f59e0b" fontSize="8" fontWeight="bold">Left Shoulder Level (Entry Plane)</text>

          {/* Quasimodo Path: High -> Low -> Higher High -> Lower Low -> Retest */}
          <path d="M 40 120 L 80 80 L 120 125 L 170 35 L 230 160 L 275 80 L 320 170" stroke="#FF1744" strokeWidth="2.5" fill="none" />

          {/* Points */}
          <circle cx="80" cy="80" r="4" fill="#f59e0b" />
          <text x="80" y="96" textAnchor="middle" fill="#cbd5e1" fontSize="8">High (LS)</text>

          <circle cx="120" cy="125" r="4" fill="#64748b" />
          <text x="120" y="140" textAnchor="middle" fill="#64748b" fontSize="8">Low</text>

          <circle cx="170" cy="35" r="5" fill="#FF1744" />
          <text x="170" y="24" textAnchor="middle" fill="#FF1744" fontSize="9" fontWeight="bold">Head (HH)</text>

          <circle cx="230" cy="160" r="4" fill="#FF1744" />
          <text x="230" y="175" textAnchor="middle" fill="#FF1744" fontSize="8" fontWeight="bold">Lower Low (BOS)</text>

          {/* Entry Trigger Circle */}
          <circle cx="275" cy="80" r="6" fill="#00E676" className={animated ? 'animate-ping' : ''} />
          <circle cx="275" cy="80" r="4" fill="#00E676" />
          <text x="275" y="68" textAnchor="middle" fill="#00E676" fontSize="9" fontWeight="bold">SELL ENTRY (QM)</text>

          {!quizMode && (
            <text x="180" y="195" textAnchor="middle" fill="#38bdf8" fontSize="9">
              QUASIMODO (QM) · Higher High into Lower Low · Sniper Asymmetric R:R
            </text>
          )}
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 360 200" className="w-full h-full max-h-52">
          <rect x="50" y="40" width="260" height="120" fill="#1e293b" rx="8" />
          <text x="180" y="105" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="600">
            {type.toUpperCase().replace('-', ' ')}
          </text>
        </svg>
      );
  }
}
