import React, { useState } from 'react';
import { INDICATOR_TOPICS, RSI_DIVERGENCES } from '../data/indicatorsData.ts';
import { DivergenceItem } from '../types.ts';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Eye, 
  Sliders,
  Maximize2,
  Compass,
  Target,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const IndicatorVisualizer: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('rsi-divergence');
  const [selectedDivergenceId, setSelectedDivergenceId] = useState<string>('bullish-divergence');
  const [activeEmaMode, setActiveEmaMode] = useState<'bullish-fan' | 'bearish-fan' | 'bounce'>('bullish-fan');

  const selectedTopic = INDICATOR_TOPICS.find(t => t.id === selectedTopicId) || INDICATOR_TOPICS[0];
  const selectedDivergence = RSI_DIVERGENCES.find(d => d.id === selectedDivergenceId) || RSI_DIVERGENCES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
            <Activity className="w-3.5 h-3.5" />
            TECHNICAL INDICATORS &amp; CONFLUENCE STRATEGIES
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Momentum, Divergence & Trend Indicator Mastery
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            "For the best results of divergence and indicators, always add 2-3 more confluences to your setup (Support & Resistance, Candlestick triggers, Chart Patterns) and check bigger time frames for confirmations."
          </p>
        </div>
      </div>

      {/* Main Indicator Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {INDICATOR_TOPICS.map(topic => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTopicId === topic.id
                ? 'bg-gradient-to-br from-slate-900 to-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
              {topic.category}
            </div>
            <div className="text-xs font-bold truncate">
              {topic.shortName}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Indicator Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {selectedTopic.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Parameters: {selectedTopic.parameters}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-slate-800 text-cyan-400 text-xs font-mono border border-slate-700">
              Institutional Strategy Approved
            </span>
          </div>
        </div>

        {/* RSI Divergence Deep Dive with Interactive 4-Type Simulator */}
        {selectedTopicId === 'rsi-divergence' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  The Four Types of RSI Divergence (Slide Presentation)
                </span>
              </div>

              {/* 4 Divergence Selector Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {RSI_DIVERGENCES.map(div => (
                  <button
                    key={div.id}
                    onClick={() => setSelectedDivergenceId(div.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedDivergenceId === div.id
                        ? div.bias === 'bullish'
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                          : 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="uppercase">{div.category}</span>
                      <span className={`font-bold ${div.bias === 'bullish' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {div.bias.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{div.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Divergence Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-950 p-6 rounded-xl border border-slate-800">
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                    selectedDivergence.bias === 'bullish' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {selectedDivergence.bias} ({selectedDivergence.tradeType})
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{selectedDivergence.name}</h4>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    <strong className="text-amber-400">Price Action:</strong> {selectedDivergence.priceAction}
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    <strong className="text-cyan-400">RSI Indicator:</strong> {selectedDivergence.indicatorAction}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDivergence.interpretation}
                </p>

                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300">
                  <strong>Strategy Confluence:</strong> {selectedDivergence.strategyTip}
                </div>
              </div>

              {/* Right Chart Visualization (matching slide diagrams 3, 5, 7, 9) */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                  <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2 mb-2">
                    <span>Price Chart</span>
                    <span className="text-cyan-400">{selectedDivergence.tradeType.toUpperCase()}</span>
                  </div>

                  {renderDivergenceSvg(selectedDivergenceId)}
                </div>

                <span className="text-[11px] font-mono text-slate-400 mt-2">
                  Technical schematic representation of institutional RSI Divergence
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4EMA Indicator System (Matching 4EMA PDF!) */}
        {selectedTopicId === '4ema-strategy' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-slate-300">EMA 8 (Fast)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-3 h-3 rounded-full bg-teal-400" />
                  <span className="text-slate-300">EMA 12</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-slate-300">EMA 21 (Dynamic Support)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="text-slate-300">EMA 55 (Macro Trend)</span>
                </div>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveEmaMode('bullish-fan')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    activeEmaMode === 'bullish-fan' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bullish Fan
                </button>
                <button
                  onClick={() => setActiveEmaMode('bearish-fan')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    activeEmaMode === 'bearish-fan' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Bearish Alignment
                </button>
                <button
                  onClick={() => setActiveEmaMode('bounce')}
                  className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                    activeEmaMode === 'bounce' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dynamic S/R Bounce
                </button>
              </div>
            </div>

            {/* 4EMA Interactive SVG */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <svg viewBox="0 0 450 200" className="w-full h-60">
                {/* Background grid */}
                <line x1="0" y1="50" x2="450" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2="450" y2="100" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2="450" y2="150" stroke="#1e293b" strokeDasharray="3 3" />

                {activeEmaMode === 'bullish-fan' && (
                  <>
                    {/* EMA 8 Blue */}
                    <path d="M 20 160 Q 150 140 250 80 T 430 25" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
                    {/* EMA 12 Teal */}
                    <path d="M 20 165 Q 150 148 250 95 T 430 45" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
                    {/* EMA 21 Gold */}
                    <path d="M 20 170 Q 150 156 250 115 T 430 75" stroke="#eab308" strokeWidth="3" fill="none" />
                    {/* EMA 55 Coral */}
                    <path d="M 20 178 Q 150 168 250 140 T 430 115" stroke="#f43f5e" strokeWidth="3.5" fill="none" />

                    {/* Price candles riding on top */}
                    <g transform="translate(100, 110)">
                      <rect x="0" y="0" width="8" height="20" fill="#10b981" rx="1" />
                    </g>
                    <g transform="translate(180, 85)">
                      <rect x="0" y="0" width="8" height="30" fill="#10b981" rx="1" />
                    </g>
                    <g transform="translate(260, 50)">
                      <rect x="0" y="0" width="8" height="25" fill="#10b981" rx="1" />
                    </g>
                    <g transform="translate(340, 20)">
                      <rect x="0" y="0" width="8" height="35" fill="#10b981" rx="1" />
                    </g>

                    <rect x="260" y="155" width="160" height="22" fill="#065f46" rx="3" />
                    <text x="340" y="170" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">
                      BULLISH FAN: 8 &gt; 12 &gt; 21 &gt; 55
                    </text>
                  </>
                )}

                {activeEmaMode === 'bearish-fan' && (
                  <>
                    {/* EMA 55 Coral on Top */}
                    <path d="M 20 40 Q 150 50 250 95 T 430 145" stroke="#f43f5e" strokeWidth="3.5" fill="none" />
                    {/* EMA 21 Gold */}
                    <path d="M 20 48 Q 150 62 250 115 T 430 165" stroke="#eab308" strokeWidth="3" fill="none" />
                    {/* EMA 12 Teal */}
                    <path d="M 20 54 Q 150 72 250 135 T 430 180" stroke="#14b8a6" strokeWidth="2.5" fill="none" />
                    {/* EMA 8 Blue */}
                    <path d="M 20 60 Q 150 82 250 150 T 430 192" stroke="#3b82f6" strokeWidth="2.5" fill="none" />

                    <rect x="260" y="25" width="160" height="22" fill="#881337" rx="3" />
                    <text x="340" y="40" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold">
                      BEARISH FAN: 55 &gt; 21 &gt; 12 &gt; 8
                    </text>
                  </>
                )}

                {activeEmaMode === 'bounce' && (
                  <>
                    {/* EMA 21 Support line */}
                    <path d="M 20 150 Q 150 130 250 110 T 430 70" stroke="#eab308" strokeWidth="3" fill="none" />
                    {/* Price pulling back to touch EMA 21 and bouncing */}
                    <path d="M 50 110 L 110 60 L 170 125 L 250 50 L 310 100 L 400 30" stroke="#38bdf8" strokeWidth="2" fill="none" />
                    <circle cx="170" cy="125" r="6" fill="#10b981" />
                    <circle cx="310" cy="100" r="6" fill="#10b981" />

                    <rect x="130" y="145" width="100" height="18" fill="#1e293b" rx="2" stroke="#10b981" />
                    <text x="180" y="157" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">
                      Bounce 1 (Buy)
                    </text>

                    <rect x="270" y="120" width="100" height="18" fill="#1e293b" rx="2" stroke="#10b981" />
                    <text x="320" y="132" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">
                      Bounce 2 (Buy)
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* Actionable Strategy Execution Blueprint: Spot, Enter & Exit */}
        <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Live Execution Blueprint: {selectedTopic.name}
              </h4>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              Standard R:R 1:2.8+
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center gap-1">
                <Compass className="w-3 h-3" />
                1. How to Spot
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Scan for indicator divergence or ribbon fanning aligning with Higher-Timeframe key Support/Resistance. Never trade indicators in isolation.
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-emerald-500/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                2. When to Enter
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Wait for the trigger candlestick (e.g. Pin Bar or Engulfing) to CLOSE confirming the indicator shift. Enter on the open of the subsequent candle.
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-rose-500/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                3. Stop Loss Anchor
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Anchor 2-3 pips + 1.5x ATR spread buffer beyond the structural extreme (e.g. below divergence trough or below 55 EMA baseline).
              </p>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-cyan-500/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase flex items-center gap-1">
                <Target className="w-3 h-3" />
                4. When to Exit
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                TP1 at 1:2 R:R (close 50% & advance SL to Breakeven). TP2: Trail remainder until momentum resets or opposite signal prints.
              </p>
            </div>
          </div>
        </div>

        {/* Indicator Strategy Rules list */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Institutional Technical Strategy Rules:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(selectedTopic.strategyInsights || selectedTopic.institutionalStrategy || []).map((rule, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300 leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-300">
            <strong>Pro Master Tip:</strong> {selectedTopic.proTips}
          </div>
        </div>
      </div>
    </div>
  );
};

function renderDivergenceSvg(id: string) {
  switch (id) {
    case 'bullish-divergence':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-44">
          {/* Price Line (Lower Low) */}
          <text x="20" y="20" fill="#94a3b8" fontSize="9" fontFamily="monospace">PRICE</text>
          <path d="M 30 35 L 75 70 L 120 45 L 180 85 L 240 40" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          {/* Dotted Lower Low trendline */}
          <line x1="75" y1="70" x2="180" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="98" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">Lower Low (LL)</text>

          {/* Divider */}
          <line x1="10" y1="110" x2="310" y2="110" stroke="#334155" strokeDasharray="2 2" />

          {/* RSI Indicator Line (Higher Low) */}
          <text x="20" y="125" fill="#38bdf8" fontSize="9" fontFamily="monospace">RSI (14)</text>
          <path d="M 30 160 L 75 165 L 120 140 L 180 150 L 240 125" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          {/* Dotted Higher Low trendline */}
          <line x1="75" y1="165" x2="180" y2="150" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="176" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Higher Low (HL) ↗</text>

          {/* Reversal Arrow */}
          <path d="M 240 40 L 275 20" stroke="#10b981" strokeWidth="3" fill="none" />
          <polygon points="275,20 262,23 271,33" fill="#10b981" />
        </svg>
      );

    case 'hidden-bullish-divergence':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-44">
          {/* Price Higher Low */}
          <text x="20" y="20" fill="#94a3b8" fontSize="9" fontFamily="monospace">PRICE</text>
          <path d="M 30 80 L 75 90 L 120 40 L 180 65 L 240 25" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <line x1="75" y1="90" x2="180" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="85" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Higher Low (HL) ↗</text>

          <line x1="10" y1="105" x2="310" y2="105" stroke="#334155" strokeDasharray="2 2" />

          {/* RSI Lower Low */}
          <text x="20" y="125" fill="#38bdf8" fontSize="9" fontFamily="monospace">RSI (14)</text>
          <path d="M 30 145 L 75 140 L 120 125 L 180 165 L 240 130" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="75" y1="140" x2="180" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="174" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">Lower Low (LL)</text>

          {/* Continuation Arrow */}
          <path d="M 240 25 L 275 10" stroke="#10b981" strokeWidth="3" fill="none" />
          <polygon points="275,10 262,13 271,23" fill="#10b981" />
        </svg>
      );

    case 'bearish-divergence':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-44">
          {/* Price Higher High */}
          <text x="20" y="20" fill="#94a3b8" fontSize="9" fontFamily="monospace">PRICE</text>
          <path d="M 30 70 L 75 35 L 120 60 L 180 20 L 240 70" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <line x1="75" y1="35" x2="180" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="22" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Higher High (HH)</text>

          <line x1="10" y1="85" x2="310" y2="85" stroke="#334155" strokeDasharray="2 2" />

          {/* RSI Lower High */}
          <text x="20" y="105" fill="#38bdf8" fontSize="9" fontFamily="monospace">RSI (14)</text>
          <path d="M 30 150 L 75 115 L 120 145 L 180 130 L 240 170" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="75" y1="115" x2="180" y2="130" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="118" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">Lower High (LH) ↘</text>

          {/* Reversal Arrow */}
          <path d="M 240 70 L 270 100" stroke="#ef4444" strokeWidth="3" fill="none" />
          <polygon points="270,100 260,88 272,87" fill="#ef4444" />
        </svg>
      );

    case 'hidden-bearish-divergence':
      return (
        <svg viewBox="0 0 320 180" className="w-full h-44">
          {/* Price Lower High */}
          <text x="20" y="20" fill="#94a3b8" fontSize="9" fontFamily="monospace">PRICE</text>
          <path d="M 30 50 L 75 25 L 120 70 L 180 45 L 240 90" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <line x1="75" y1="25" x2="180" y2="45" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="30" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">Lower High (LH)</text>

          <line x1="10" y1="95" x2="310" y2="95" stroke="#334155" strokeDasharray="2 2" />

          {/* RSI Higher High */}
          <text x="20" y="115" fill="#38bdf8" fontSize="9" fontFamily="monospace">RSI (14)</text>
          <path d="M 30 155 L 75 140 L 120 160 L 180 120 L 240 170" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="75" y1="140" x2="180" y2="120" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
          <text x="125" y="140" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Higher High (HH) ↗</text>

          {/* Continuation Arrow */}
          <path d="M 240 90 L 270 125" stroke="#ef4444" strokeWidth="3" fill="none" />
          <polygon points="270,125 260,113 272,112" fill="#ef4444" />
        </svg>
      );

    default:
      return null;
  }
}
