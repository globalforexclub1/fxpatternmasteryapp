import React, { useState } from 'react';
import { 
  FOREX_SESSIONS, 
  FOREX_PAIRS, 
  FOREX_INSTITUTIONAL_PATTERNS, 
  FOREX_HAZARDS_AND_RULES,
  ForexInstitutionalPattern
} from '../data/forexData.ts';
import { PatternVisualizer } from './PatternVisualizer.tsx';
import { 
  Globe2, 
  Clock, 
  ShieldAlert, 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const ForexMastery: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<ForexInstitutionalPattern>(
    FOREX_INSTITUTIONAL_PATTERNS[0]
  );
  const [activeSessionTab, setActiveSessionTab] = useState<string>('london');
  
  // Pip Calculator State
  const [selectedPairSymbol, setSelectedPairSymbol] = useState<string>('EUR/USD');
  const [calcLotSize, setCalcLotSize] = useState<number>(1.0);
  const [calcPipMovement, setCalcPipMovement] = useState<number>(30);
  const [calcSpreadPips, setCalcSpreadPips] = useState<number>(1.2);

  const activePair = FOREX_PAIRS.find(p => p.symbol === selectedPairSymbol) || FOREX_PAIRS[0];

  // Dynamic Pip calculation
  // Standard Lot = 100,000 units. For EUR/USD, 1 pip = $10.00.
  // For USD/ZAR, 1 pip = ~0.55 USD per 1.0 lot. For Gold, 1 pip ($0.10) = $10 or $1 = $100.
  let pipValuePerLot = 10.0;
  if (selectedPairSymbol === 'USD/ZAR') pipValuePerLot = 0.55;
  if (selectedPairSymbol === 'XAU/USD') pipValuePerLot = 10.0; // 0.10 movement on 100oz = $10

  const totalProfitLossUsd = calcLotSize * calcPipMovement * pipValuePerLot;
  const spreadCostUsd = calcLotSize * calcSpreadPips * pipValuePerLot;

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            Global Forex & Emerging Markets Academy
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Forex Market Dynamics & Institutional Price Action
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            In foreign exchange and emerging market currency pairs, liquidity sweeps, session timing, and spread factors dictate a significant portion of price delivery. Study the visual architecture used by professional interbank desks with educational discipline.
          </p>
        </div>
      </div>

      {/* SECTION 1: THE 4 MAJOR FOREX SESSIONS & VOLATILITY CLOCK */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Forex Sessions & The Institutional Clock</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">24/5 Global Interbank Market</span>
        </div>

        {/* Session Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {FOREX_SESSIONS.map(session => {
            const isSelected = activeSessionTab === session.id;
            return (
              <button
                key={session.id}
                onClick={() => setActiveSessionTab(session.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    session.volatility === 'peak' ? 'bg-amber-400 animate-ping' :
                    session.volatility === 'high' ? 'bg-emerald-400' : 'bg-slate-500'
                  }`} />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    {session.volatility}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{session.name.split(' (')[0]}</div>
                <div className="text-[10px] font-mono text-slate-500">{session.timeGmt}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Session Deep Dive Card */}
        {(() => {
          const currentSession = FOREX_SESSIONS.find(s => s.id === activeSessionTab) || FOREX_SESSIONS[1];
          return (
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{currentSession.name}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">
                      {currentSession.city}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{currentSession.timeGmt}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Prime Active Pairs:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentSession.activePairs.map((p, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[11px] font-mono font-bold bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 rounded">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider block">Session Behavioral DNA:</span>
                  <ul className="space-y-2 text-slate-300">
                    {currentSession.characteristics.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">▸</span>
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-xl space-y-2">
                  <span className="font-mono text-amber-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Interbank Educational Note:
                  </span>
                  <p className="text-amber-200/90 leading-relaxed font-sans">
                    {currentSession.sessionRule}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 2: INSTITUTIONAL FOREX PATTERN SCHEMATICS & VISUALS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">Forex Institutional Patterns & Smart Money Setups</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Order Blocks · FVGs · Pin Bars · Quasimodo</span>
        </div>

        {/* Pattern Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {FOREX_INSTITUTIONAL_PATTERNS.map(pat => {
            const isSelected = selectedPattern.id === pat.id;
            return (
              <button
                key={pat.id}
                onClick={() => setSelectedPattern(pat)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-1 font-bold">
                  {pat.category}
                </div>
                <div className="text-xs font-bold truncate">{pat.name.split(' (')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Pattern Showcase with Crisp SVG Visualizer */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                  {selectedPattern.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Bias: <strong className="text-slate-200 uppercase">{selectedPattern.bias}</strong>
                </span>
              </div>
              <h4 className="text-xl font-black text-white">{selectedPattern.name}</h4>
              <p className="text-xs font-mono text-cyan-400 mt-0.5">{selectedPattern.subtitle}</p>
            </div>
          </div>

          {/* SVG Visualizer Diagram */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 p-2">
            <PatternVisualizer 
              svgType={selectedPattern.svgType}
              className="w-full h-64 sm:h-72"
              interactive={true}
              quizMode={false}
            />
          </div>

          {/* 3-Column Technical Execution Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-amber-400 block font-mono font-semibold uppercase tracking-wider">
                Institutional Rationale:
              </strong>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedPattern.institutionalLogic}
              </p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <strong className="text-emerald-400 block font-mono font-semibold uppercase tracking-wider">
                Entry &amp; Stop Loss Protocol:
              </strong>
              <div className="space-y-1.5 text-slate-300 font-sans">
                <div>
                  <span className="font-mono text-emerald-300 font-bold">Entry: </span>
                  {selectedPattern.entryRule}
                </div>
                <div>
                  <span className="font-mono text-rose-300 font-bold">Stop Loss: </span>
                  {selectedPattern.stopLossRule}
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-500/40 space-y-2">
              <strong className="text-indigo-300 block font-mono font-semibold uppercase tracking-wider">
                Institutional Analysis Note:
              </strong>
              <p className="text-slate-300 leading-relaxed font-sans">
                {selectedPattern.institutionalNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: EMERGING MARKETS & MAJOR CURRENCY PAIR DYNAMICS + SPREAD MATRIX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Currency Pair Archetypes & Emerging Market Dynamics</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Majors, Beast Crosses & USD/ZAR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOREX_PAIRS.map(pair => (
            <div 
              key={pair.symbol}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                pair.symbol === 'USD/ZAR' 
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-500/5' 
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-white">{pair.symbol}</span>
                  <div className="text-xs text-slate-400">{pair.name}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    Spread: ~{pair.typicalSpreadPips} pips
                  </span>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5 uppercase">
                    {pair.category}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {pair.description}
              </p>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-sans space-y-1">
                <span className="font-mono text-amber-400 font-bold block">Market Insight:</span>
                <p className="leading-relaxed">{pair.marketInsight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: INTERACTIVE FOREX LOT SIZE & SPREAD CALCULATOR */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <Calculator className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-lg font-bold text-white">Forex Lot Size, Pip Value & Spread Impact Calculator</h3>
            <p className="text-xs text-slate-400">Calculate exact dollar return, spread friction, and required margin before risking capital.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Pair Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Currency Pair:</label>
            <select
              value={selectedPairSymbol}
              onChange={(e) => {
                const pair = FOREX_PAIRS.find(p => p.symbol === e.target.value);
                setSelectedPairSymbol(e.target.value);
                if (pair) setCalcSpreadPips(pair.typicalSpreadPips);
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            >
              {FOREX_PAIRS.map(p => (
                <option key={p.symbol} value={p.symbol}>{p.symbol} ({p.name})</option>
              ))}
            </select>
          </div>

          {/* Lot Size */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Lot Size (Standard = 1.0):</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="0.01"
                max="10"
                value={calcLotSize}
                onChange={(e) => setCalcLotSize(parseFloat(e.target.value) || 0.01)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex gap-1 mt-1">
              {[0.01, 0.1, 1.0].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCalcLotSize(val)}
                  className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                >
                  {val === 0.01 ? 'Micro' : val === 0.1 ? 'Mini' : 'Std (1.0)'}
                </button>
              ))}
            </div>
          </div>

          {/* Pip Move */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Target Move (Pips):</label>
            <input
              type="number"
              min="1"
              max="500"
              value={calcPipMovement}
              onChange={(e) => setCalcPipMovement(parseFloat(e.target.value) || 1)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Spread */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400">Broker Spread (Pips):</label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="50"
              value={calcSpreadPips}
              onChange={(e) => setCalcSpreadPips(parseFloat(e.target.value) || 0.1)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Calculation Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Gross Profit / Loss:</span>
            <div className="text-xl font-black text-emerald-400 font-mono">
              ${totalProfitLossUsd.toFixed(2)} USD
            </div>
            <span className="text-[10px] text-slate-500">Based on {calcPipMovement} pips at ${pipValuePerLot} / pip per lot</span>
          </div>

          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Broker Spread Cost (Entry Drag):</span>
            <div className="text-xl font-black text-rose-400 font-mono">
              -${spreadCostUsd.toFixed(2)} USD
            </div>
            <span className="text-[10px] text-slate-500">Immediate deduction upon opening market order</span>
          </div>

          <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-500/40 space-y-1">
            <span className="text-[11px] font-mono text-emerald-400 uppercase">Net Realized Expectancy:</span>
            <div className="text-xl font-black text-emerald-300 font-mono">
              +${(totalProfitLossUsd - spreadCostUsd).toFixed(2)} USD
            </div>
            <span className="text-[10px] text-emerald-400/80">Net after paying broker bid-ask spread</span>
          </div>
        </div>
      </div>

      {/* SECTION 5: THE 5 FATAL HAZARDS OF FOREX TRADING */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-xl font-bold text-white">The 5 Fatal Forex Hazards & Capital Defense Rules</h3>
          </div>
          <span className="text-xs font-mono text-rose-400 font-bold uppercase">Account Survival Protocol</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOREX_HAZARDS_AND_RULES.map((hazard, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border space-y-3 ${
                hazard.severity === 'critical'
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-mono text-xs font-bold">
                    {idx + 1}
                  </span>
                  {hazard.title}
                </h4>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  hazard.severity === 'critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {hazard.severity}
                </span>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-amber-300 block mb-1 font-mono">{hazard.rule}</strong>
                <p>{hazard.explanation}</p>
              </div>

              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Defense Action: {hazard.actionItem}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
