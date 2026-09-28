import React, { useState, useEffect, useRef } from 'react';
import { TRADE_SIMULATOR_SCENARIOS } from '../data/simulatorScenariosData.ts';
import { TradeSimulatorScenario, CandleDataPoint } from '../types.ts';
import { playSound } from '../utils/audio.ts';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Sliders, 
  Zap, 
  Sparkles, 
  Info, 
  Clock, 
  Flame,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface TradeSimulatorProps {
  onAddXp: (amount: number) => void;
  soundEnabled: boolean;
}

export const TradeSimulator: React.FC<TradeSimulatorProps> = ({
  onAddXp,
  soundEnabled
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    TRADE_SIMULATOR_SCENARIOS[0].id
  );

  const activeScenario: TradeSimulatorScenario = 
    TRADE_SIMULATOR_SCENARIOS.find(s => s.id === selectedScenarioId) || 
    TRADE_SIMULATOR_SCENARIOS[0];

  // User Trade Parameters
  const [accountCapital, setAccountCapital] = useState<number>(10000);
  const [tradeDirection, setTradeDirection] = useState<'long' | 'short'>(
    activeScenario.recommendedBias
  );
  const [lotSize, setLotSize] = useState<number>(0.5);
  const [entryPrice, setEntryPrice] = useState<number>(activeScenario.defaultEntry);
  const [stopLossPrice, setStopLossPrice] = useState<number>(activeScenario.defaultStopLoss);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(activeScenario.defaultTakeProfit);

  // Simulation Playback State
  const [simState, setSimState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentCandleIndex, setCurrentCandleIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [tradeOutcome, setTradeOutcome] = useState<'win' | 'loss' | null>(null);
  const [realizedPnlUsd, setRealizedPnlUsd] = useState<number>(0);
  const [realizedPnlPips, setRealizedPnlPips] = useState<number>(0);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize when scenario changes
  useEffect(() => {
    setTradeDirection(activeScenario.recommendedBias);
    setEntryPrice(activeScenario.defaultEntry);
    setStopLossPrice(activeScenario.defaultStopLoss);
    setTakeProfitPrice(activeScenario.defaultTakeProfit);
    resetSimulation();
  }, [selectedScenarioId]);

  const resetSimulation = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setSimState('idle');
    setCurrentCandleIndex(0);
    setIsPlayingAuto(false);
    setTradeOutcome(null);
    setRealizedPnlUsd(0);
    setRealizedPnlPips(0);
  };

  // Calculations
  const pipMultiplier = activeScenario.pipFactor;
  const isLong = tradeDirection === 'long';

  const stopLossDistancePips = isLong
    ? (entryPrice - stopLossPrice) * pipMultiplier
    : (stopLossPrice - entryPrice) * pipMultiplier;

  const takeProfitDistancePips = isLong
    ? (takeProfitPrice - entryPrice) * pipMultiplier
    : (entryPrice - takeProfitPrice) * pipMultiplier;

  // Pip value in USD for selected pair
  let pipValuePerLot = 10.0;
  if (activeScenario.pair === 'USD/ZAR') pipValuePerLot = 0.55;
  if (activeScenario.pair === 'XAU/USD') pipValuePerLot = 10.0; // 0.10 gold move = $10

  const dollarRisk = Math.max(0, stopLossDistancePips * lotSize * pipValuePerLot);
  const riskPercentage = (dollarRisk / accountCapital) * 100;
  const dollarPotentialReward = Math.max(0, takeProfitDistancePips * lotSize * pipValuePerLot);
  const riskRewardRatio = stopLossDistancePips > 0 ? (takeProfitDistancePips / stopLossDistancePips) : 0;
  const spreadCostUsd = activeScenario.spreadPips * lotSize * pipValuePerLot;

  // Active Candle Series for Chart Display
  const revealedForwardCandles = activeScenario.forwardCandles.slice(0, currentCandleIndex);
  const allDisplayedCandles: CandleDataPoint[] = [
    ...activeScenario.initialCandles,
    ...revealedForwardCandles
  ];

  const latestCandle = allDisplayedCandles[allDisplayedCandles.length - 1];
  const currentMarketPrice = latestCandle ? latestCandle.close : entryPrice;

  // Floating P&L during simulation
  const floatingPips = isLong
    ? (currentMarketPrice - entryPrice) * pipMultiplier
    : (entryPrice - currentMarketPrice) * pipMultiplier;

  const floatingPnlUsd = floatingPips * lotSize * pipValuePerLot - spreadCostUsd;

  // Next Candle Step
  const stepForwardCandle = (auto = false) => {
    if (currentCandleIndex >= activeScenario.forwardCandles.length) {
      finishTradeSimulation();
      return;
    }

    const nextIndex = currentCandleIndex + 1;
    setCurrentCandleIndex(nextIndex);

    const candle = activeScenario.forwardCandles[nextIndex - 1];
    
    // Check if TP or SL is hit
    let finished = false;
    if (isLong) {
      if (candle.high >= takeProfitPrice) {
        finishTradeSimulation('win', takeProfitDistancePips, dollarPotentialReward - spreadCostUsd);
        finished = true;
      } else if (candle.low <= stopLossPrice) {
        finishTradeSimulation('loss', -stopLossDistancePips, -dollarRisk - spreadCostUsd);
        finished = true;
      }
    } else {
      if (candle.low <= takeProfitPrice) {
        finishTradeSimulation('win', takeProfitDistancePips, dollarPotentialReward - spreadCostUsd);
        finished = true;
      } else if (candle.high >= stopLossPrice) {
        finishTradeSimulation('loss', -stopLossDistancePips, -dollarRisk - spreadCostUsd);
        finished = true;
      }
    }

    if (!finished && nextIndex === activeScenario.forwardCandles.length) {
      const finalPips = isLong
        ? (candle.close - entryPrice) * pipMultiplier
        : (entryPrice - candle.close) * pipMultiplier;
      const finalUsd = finalPips * lotSize * pipValuePerLot - spreadCostUsd;
      finishTradeSimulation(finalUsd >= 0 ? 'win' : 'loss', finalPips, finalUsd);
    }
  };

  const finishTradeSimulation = (outcome?: 'win' | 'loss', pips = 0, pnl = 0) => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    setIsPlayingAuto(false);
    setSimState('completed');

    const finalOutcome = outcome || (floatingPnlUsd >= 0 ? 'win' : 'loss');
    setTradeOutcome(finalOutcome);
    setRealizedPnlPips(pips || floatingPips);
    setRealizedPnlUsd(pnl || floatingPnlUsd);

    if (finalOutcome === 'win') {
      playSound('correct', soundEnabled);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      onAddXp(50);
    } else {
      playSound('wrong', soundEnabled);
      onAddXp(20); // Capital preservation audit reward
    }
  };

  const handleStartTrade = () => {
    setSimState('running');
    setCurrentCandleIndex(0);
    setIsPlayingAuto(true);
  };

  // Autoplay effect
  useEffect(() => {
    if (isPlayingAuto && simState === 'running') {
      autoPlayTimerRef.current = setInterval(() => {
        stepForwardCandle(true);
      }, 1400);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlayingAuto, simState, currentCandleIndex]);

  // Chart Min and Max
  const prices = allDisplayedCandles.flatMap(c => [c.high, c.low, entryPrice, stopLossPrice, takeProfitPrice]);
  const minPrice = Math.min(...prices) * 0.9985;
  const maxPrice = Math.max(...prices) * 1.0015;
  const priceRange = maxPrice - minPrice || 1;

  const getYCoord = (price: number) => {
    return 240 - ((price - minPrice) / priceRange) * 200;
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              Live Trade Execution Simulator &amp; Risk Guard
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Interactive Trading Station &amp; Hazard Radar
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step into the shoes of an institutional forex prop desk trader. Execute market orders on simulated market setups, configure lot sizes, and let the real-time Hazard Engine check for spread death traps, over-leveraging, and news slippage.
            </p>
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-300">
              ⚠️ <strong>Non-Advisory Notice:</strong> This simulator is strictly for educational simulation and training. We are not financial advisors. No real funds or financial advice are involved.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
            {/* Visual Desk Photo */}
            <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-slate-800 relative shadow-lg bg-slate-950">
              <img
                src="/src/assets/images/forex_multiscreen_desk_1790448170853.jpg"
                alt="African forex prop trader on multi-monitor desk"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-2">
                <span className="text-[9px] font-mono text-cyan-300 font-bold bg-slate-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  Prop Desk Station
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs space-y-1 w-full sm:w-auto">
              <span className="text-slate-400 block">Account Equity:</span>
              <div className="text-2xl font-black text-emerald-400">
                ${(accountCapital + (simState === 'completed' ? realizedPnlUsd : 0)).toLocaleString()} USD
              </div>
              <span className="text-[10px] text-slate-500">Virtual Training Capital</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
          Select Practice Scenario:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {TRADE_SIMULATOR_SCENARIOS.map(sc => {
            const isSelected = selectedScenarioId === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-600/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-white">{sc.pair}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                    sc.recommendedBias === 'long' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {sc.recommendedBias}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-300 line-clamp-1">{sc.setupName}</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">{sc.session}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Chart on Left, Order Ticket & Risk Guard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT (7 cols): INTERACTIVE SVG CHART & PLAYBACK */}
        <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white">{activeScenario.pair}</span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {activeScenario.timeframe} · {activeScenario.session}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activeScenario.title}</p>
            </div>

            {/* Live P&L Counter during simulation */}
            {simState !== 'idle' && (
              <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Live Floating P&L:</span>
                  <span className={`font-bold text-sm ${floatingPnlUsd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {floatingPnlUsd >= 0 ? '+' : ''}${floatingPnlUsd.toFixed(2)} ({floatingPips.toFixed(1)} pips)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Candlestick Color Key Legend */}
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-sm shadow-emerald-500/20">
                ▲ GREEN = BULLISH (BUYERS)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-400 shadow-sm shadow-rose-500/20">
                ▼ RED = BEARISH (SELLERS)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Vibrant High-Contrast Chart Engine
            </span>
          </div>

          {/* SVG Candlestick Chart */}
          <div className="relative w-full h-72 sm:h-80 bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden">
            {/* Grid Backdrop */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }}
            />

            <svg viewBox="0 0 540 260" className="w-full h-full">
              {/* Order Lines: Entry, Stop Loss, Take Profit */}
              {/* Take Profit Line (Green Dotted) */}
              <line 
                x1="20" 
                y1={getYCoord(takeProfitPrice)} 
                x2="520" 
                y2={getYCoord(takeProfitPrice)} 
                stroke="#00E676" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
              />
              <text x="515" y={getYCoord(takeProfitPrice) - 4} textAnchor="end" fill="#00E676" fontSize="9" fontFamily="monospace" fontWeight="extrabold">
                TP: {takeProfitPrice.toFixed(activeScenario.pipDecimals)} (+{takeProfitDistancePips.toFixed(0)}p)
              </text>

              {/* Entry Line (Cyan Solid) */}
              <line 
                x1="20" 
                y1={getYCoord(entryPrice)} 
                x2="520" 
                y2={getYCoord(entryPrice)} 
                stroke="#38bdf8" 
                strokeWidth="1.5" 
              />
              <text x="515" y={getYCoord(entryPrice) - 4} textAnchor="end" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ENTRY: {entryPrice.toFixed(activeScenario.pipDecimals)}
              </text>

              {/* Stop Loss Line (Red Dashed) */}
              <line 
                x1="20" 
                y1={getYCoord(stopLossPrice)} 
                x2="520" 
                y2={getYCoord(stopLossPrice)} 
                stroke="#FF1744" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
              />
              <text x="515" y={getYCoord(stopLossPrice) + 12} textAnchor="end" fill="#FF1744" fontSize="9" fontFamily="monospace" fontWeight="extrabold">
                SL: {stopLossPrice.toFixed(activeScenario.pipDecimals)} (-{stopLossDistancePips.toFixed(0)}p)
              </text>

              {/* Candlesticks Rendering */}
              {allDisplayedCandles.map((c, idx) => {
                const totalCount = activeScenario.initialCandles.length + activeScenario.forwardCandles.length;
                const slotWidth = 480 / totalCount;
                const candleX = 40 + idx * slotWidth;
                const isBull = c.close >= c.open;
                const color = isBull ? '#00E676' : '#FF1744';
                const strokeColor = isBull ? '#00FF88' : '#FF5252';

                const highY = getYCoord(c.high);
                const lowY = getYCoord(c.low);
                const openY = getYCoord(c.open);
                const closeY = getYCoord(c.close);

                const bodyTop = Math.min(openY, closeY);
                const bodyHeight = Math.max(3, Math.abs(closeY - openY));

                const isCurrentSimCandle = idx === allDisplayedCandles.length - 1 && simState === 'running';

                return (
                  <g key={c.index}>
                    {/* Wick */}
                    <line x1={candleX} y1={highY} x2={candleX} y2={lowY} stroke={color} strokeWidth="2" strokeLinecap="round" />
                    {/* Body */}
                    <rect 
                      x={candleX - 6} 
                      y={bodyTop} 
                      width="12" 
                      height={bodyHeight} 
                      fill={color} 
                      stroke={strokeColor}
                      strokeWidth="1.2"
                      rx="1.5" 
                      className={isCurrentSimCandle ? (isBull ? 'glow-bullish' : 'glow-bearish') : ''}
                    />
                    {/* Annotation if present */}
                    {c.annotation && (
                      <text 
                        x={candleX} 
                        y={isBull ? lowY + 14 : highY - 8} 
                        textAnchor="middle" 
                        fill="#cbd5e1" 
                        fontSize="8" 
                        fontFamily="monospace"
                      >
                        {c.annotation}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* In-chart playback watermark status */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-500">
              Candle: {allDisplayedCandles.length} / {activeScenario.initialCandles.length + activeScenario.forwardCandles.length}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {simState === 'idle' && (
                <button
                  onClick={handleStartTrade}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Execute Order &amp; Play Simulation</span>
                </button>
              )}

              {simState === 'running' && (
                <>
                  <button
                    onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlayingAuto ? 'Pause Playback' : 'Auto Play'}</span>
                  </button>

                  <button
                    onClick={() => stepForwardCandle(false)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Candle</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {simState === 'completed' && (
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset &amp; Retry Scenario</span>
                </button>
              )}
            </div>

            <span className="text-xs font-mono text-slate-400">
              Spread Friction: <strong className="text-rose-400">-${spreadCostUsd.toFixed(2)}</strong> ({activeScenario.spreadPips} pips)
            </span>
          </div>

          {/* Outcome Debriefing Modal / Box */}
          {simState === 'completed' && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-slideUp ${
              tradeOutcome === 'win' 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {tradeOutcome === 'win' ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      <span className="text-base font-black text-emerald-300">
                        TARGET REACHED! (+{realizedPnlPips.toFixed(1)} Pips / +${realizedPnlUsd.toFixed(2)} USD)
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-6 h-6 text-rose-400" />
                      <span className="text-base font-black text-rose-300">
                        STOP LOSS HIT (-{Math.abs(realizedPnlPips).toFixed(1)} Pips / -${Math.abs(realizedPnlUsd).toFixed(2)} USD)
                      </span>
                    </>
                  )}
                </div>

                <span className="text-xs font-mono font-bold bg-slate-900 px-3 py-1 rounded-md text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{tradeOutcome === 'win' ? 50 : 20} XP
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {tradeOutcome === 'win' ? activeScenario.debriefSuccess : activeScenario.debriefFailure}
              </p>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300">
                <strong className="text-amber-400 mr-1.5">Trade Execution Debrief Doctrine:</strong>
                "A winning trade with bad risk management is a dangerous habit. A stopped-out trade with strict 1% risk discipline is a professional victory."
              </div>
            </div>
          )}

          {/* Scenario Context & Confluences */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              Market Context &amp; Confluences:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">{activeScenario.context}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-slate-400">
              {activeScenario.confluences.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-emerald-400 font-bold shrink-0">✔</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT (5 cols): ORDER TICKET TERMINAL & DYNAMIC HAZARD RADAR */}
        <div className="lg:col-span-5 space-y-5">
          {/* Order Ticket Form */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Order Placement Ticket
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Market Execution</span>
            </div>

            {/* Direction Toggle: BUY (Long) vs SELL (Short) */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTradeDirection('long')}
                className={`py-2.5 rounded-xl font-mono text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  tradeDirection === 'long'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                BUY / LONG
              </button>

              <button
                type="button"
                onClick={() => setTradeDirection('short')}
                className={`py-2.5 rounded-xl font-mono text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  tradeDirection === 'short'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                SELL / SHORT
              </button>
            </div>

            {/* Account Capital Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400">Account Capital ($ USD):</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1000, 5000, 10000, 50000].map(cap => (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setAccountCapital(cap)}
                    className={`py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                      accountCapital === cap
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    ${cap.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Lot Size Slider & Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Lot Size (Contracts):</span>
                <span className="text-cyan-400 font-bold">{lotSize} Lots</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="3.0"
                step="0.01"
                value={lotSize}
                onChange={(e) => setLotSize(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.01 (Micro)</span>
                <span>0.1 (Mini)</span>
                <span>1.0 (Standard)</span>
                <span>3.0 (Heavy)</span>
              </div>
            </div>

            {/* Order Price Inputs: Entry, SL, TP */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400">Entry Price:</label>
                <input
                  type="number"
                  step="any"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-rose-400">Stop Loss:</label>
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-rose-500/50 rounded-lg px-2.5 py-1.5 text-xs font-mono text-rose-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-emerald-400">Take Profit:</label>
                <input
                  type="number"
                  step="any"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-emerald-500/50 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Risk & Reward Math Metrics */}
            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Risked Amount:</span>
                <span className={`font-bold ${riskPercentage > 2 ? 'text-rose-400 font-black' : 'text-slate-200'}`}>
                  ${dollarRisk.toFixed(2)} ({riskPercentage.toFixed(2)}% Capital)
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Potential Reward:</span>
                <span className="text-emerald-400 font-bold">
                  +${dollarPotentialReward.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-800 pt-1.5">
                <span className="text-slate-400">Risk : Reward Ratio:</span>
                <span className={`font-bold ${riskRewardRatio >= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  1 : {riskRewardRatio.toFixed(2)} R
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC INSTITUTIONAL HAZARD RADAR (Crucial User Requirement!) */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Institutional Safety &amp; Hazard Radar
              </h3>
            </div>

            {/* Hazard 1: Over-leveraging (> 2% risk) */}
            {riskPercentage > 2 ? (
              <div className="p-3 bg-rose-950/40 border border-rose-500 rounded-xl text-xs text-rose-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-300 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  ACCOUNT BLOW HAZARD: Risking {riskPercentage.toFixed(1)}%!
                </div>
                <p className="text-[11px] leading-relaxed">
                  Capital Defense Rule Violation! Never risk more than 1% to 2% of capital per trade. Two consecutive losses at this lot size will cause devastating psychological panic.
                </p>
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Capital Defense Passed: Risking {riskPercentage.toFixed(2)}% (Strictly under 2%).</span>
              </div>
            )}

            {/* Hazard 2: Stop Loss Too Tight (Noise / Spread Death) */}
            {stopLossDistancePips < activeScenario.spreadPips * 3 ? (
              <div className="p-3 bg-amber-950/40 border border-amber-500 rounded-xl text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  SPREAD DEATH HAZARD: Stop Loss Too Tight!
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your stop loss is only {stopLossDistancePips.toFixed(1)} pips away while broker spread is {activeScenario.spreadPips} pips. Normal bid/ask oscillation will wipe you out before the pattern triggers.
                </p>
              </div>
            ) : null}

            {/* Hazard 3: Poor Risk-to-Reward (< 1:1.5) */}
            {riskRewardRatio < 1.5 && stopLossDistancePips > 0 ? (
              <div className="p-3 bg-amber-950/40 border border-amber-500 rounded-xl text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300 font-mono">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  UNFAVORABLE ASYMMETRY: R:R is 1:{riskRewardRatio.toFixed(1)}
                </div>
                <p className="text-[11px] leading-relaxed">
                  Positive expectancy requires aiming for at least 1:2 or 1:3 R/R. Taking sub-1:1.5 trades requires an unsustainable win rate to remain profitable.
                </p>
              </div>
            ) : null}

            {/* Scenario-Specific Precaution Checklist */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Session Precautions for {activeScenario.pair}:
              </span>
              {activeScenario.riskWarnings.map((w, idx) => (
                <div key={idx} className="p-2 bg-slate-900 rounded-lg text-[11px] text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">⚠️</span>
                  <span className="leading-relaxed">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
