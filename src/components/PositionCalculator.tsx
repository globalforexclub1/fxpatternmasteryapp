import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  DollarSign, 
  Percent, 
  ShieldCheck, 
  Target, 
  Zap, 
  Check, 
  BarChart3,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { PositionCalculationResult } from '../types.ts';

export const PositionCalculator: React.FC = () => {
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long');
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [entryPrice, setEntryPrice] = useState<number>(14650);
  const [stopLossPrice, setStopLossPrice] = useState<number>(14177);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(15596); // ~2R target
  const [leverage, setLeverage] = useState<number>(1);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // 30-Trade Expectancy Simulator State
  const [simCapital, setSimCapital] = useState<number>(6000);
  const [simRiskPercent, setSimRiskPercent] = useState<number>(1);
  const [simWinRate, setSimWinRate] = useState<number>(50);
  const [simRiskReward, setSimRiskReward] = useState<number>(3); // 3R

  // Calculation computation
  const riskAmountUSD = (accountBalance * riskPercent) / 100;
  
  let stopLossPercent = 0;
  if (entryPrice > 0) {
    if (tradeType === 'long') {
      stopLossPercent = ((entryPrice - stopLossPrice) / entryPrice) * 100;
    } else {
      stopLossPercent = ((stopLossPrice - entryPrice) / entryPrice) * 100;
    }
  }

  const isValidSL = stopLossPercent > 0;
  const positionSizeUSD = isValidSL ? (riskAmountUSD / (stopLossPercent / 100)) : 0;
  const unitAmount = entryPrice > 0 ? positionSizeUSD / entryPrice : 0;
  const requiredMargin = leverage > 0 ? positionSizeUSD / leverage : positionSizeUSD;

  let takeProfitPercent = 0;
  if (entryPrice > 0) {
    if (tradeType === 'long') {
      takeProfitPercent = ((takeProfitPrice - entryPrice) / entryPrice) * 100;
    } else {
      takeProfitPercent = ((entryPrice - takeProfitPrice) / entryPrice) * 100;
    }
  }

  const rewardRiskRatio = (stopLossPercent > 0 && takeProfitPercent > 0)
    ? takeProfitPercent / stopLossPercent
    : 0;

  const profitTargetUSD = (positionSizeUSD * (takeProfitPercent / 100));

  // Preset slide loader
  const loadSlideExample = () => {
    setTradeType('long');
    setAccountBalance(10000);
    setRiskPercent(1);
    setEntryPrice(14650);
    setStopLossPrice(14177);
    setTakeProfitPrice(15596);
    setLeverage(1);
  };

  // Expectancy calculation (30 trades)
  const totalTrades = 30;
  const winCount = Math.round((totalTrades * simWinRate) / 100);
  const lossCount = totalTrades - winCount;
  const riskPerTradeUSD = (simCapital * simRiskPercent) / 100;
  const profitPerWinUSD = riskPerTradeUSD * simRiskReward;

  const grossProfit = winCount * profitPerWinUSD;
  const grossLoss = lossCount * riskPerTradeUSD;
  const netProfitUSD = grossProfit - grossLoss;
  const returnOnAccount = (netProfitUSD / simCapital) * 100;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            RISK MANAGEMENT PROTOCOL & CAPITAL PRESERVATION
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Institutional Position Size & Risk Calculator
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            "Position Size = (Capital × Risk%) / Stop Loss%. Professional trading is a game of mathematical defense. Protecting your capital allows positive expectancy to compound effortlessly over time."
          </p>
          <div className="pt-2">
            <button
              onClick={loadSlideExample}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Load Standard Benchmark Example ($10k Capital, 1% Risk, 3.23% SL → $3,095 Size)
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Trade Parameters
            </h3>

            {/* Long / Short Toggle */}
            <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => {
                  setTradeType('long');
                  if (stopLossPrice >= entryPrice) setStopLossPrice(entryPrice * 0.97);
                  if (takeProfitPrice <= entryPrice) setTakeProfitPrice(entryPrice * 1.06);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded cursor-pointer transition-all ${
                  tradeType === 'long'
                    ? 'bg-emerald-500 text-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                LONG
              </button>
              <button
                onClick={() => {
                  setTradeType('short');
                  if (stopLossPrice <= entryPrice) setStopLossPrice(entryPrice * 1.03);
                  if (takeProfitPrice >= entryPrice) setTakeProfitPrice(entryPrice * 0.94);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded cursor-pointer transition-all ${
                  tradeType === 'short'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                SHORT
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Account Capital */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Total Account Capital ($ USD)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Math.max(1, Number(e.target.value)))}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-white font-mono text-sm focus:outline-none transition-colors"
                  placeholder="10000"
                />
              </div>
            </div>

            {/* Risk Percentage */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Risk Per Trade (% of Capital)
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setRiskPercent(1)}
                    className={`px-2 py-0.5 text-[11px] rounded font-mono font-bold cursor-pointer ${
                      riskPercent === 1 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    1% (Recommended)
                  </button>
                  <button
                    onClick={() => setRiskPercent(2)}
                    className={`px-2 py-0.5 text-[11px] rounded font-mono font-bold cursor-pointer ${
                      riskPercent === 2 ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    2% (Max)
                  </button>
                </div>
              </div>
              <div className="relative">
                <Percent className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Math.max(0.1, Number(e.target.value)))}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-white font-mono text-sm focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Risk Amount: <strong className="text-rose-400 font-mono">${riskAmountUSD.toFixed(2)} USD</strong>
              </p>
            </div>

            {/* Entry Price & Stop Loss Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Entry Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Math.max(0.0001, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-white font-mono text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Stop Loss Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Math.max(0.0001, Number(e.target.value)))}
                  className={`w-full px-3 py-2.5 bg-slate-950 border rounded-xl font-mono text-sm focus:outline-none ${
                    isValidSL ? 'border-slate-800 focus:border-rose-500 text-white' : 'border-rose-500 text-rose-300'
                  }`}
                />
              </div>
            </div>

            {/* Take Profit Price */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Take Profit Price ($)
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const dist = Math.abs(entryPrice - stopLossPrice);
                      const target = tradeType === 'long' ? entryPrice + (dist * 2) : entryPrice - (dist * 2);
                      setTakeProfitPrice(Number(target.toFixed(2)));
                    }}
                    className="px-2 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded font-mono cursor-pointer"
                  >
                    Set 2R
                  </button>
                  <button
                    onClick={() => {
                      const dist = Math.abs(entryPrice - stopLossPrice);
                      const target = tradeType === 'long' ? entryPrice + (dist * 3) : entryPrice - (dist * 3);
                      setTakeProfitPrice(Number(target.toFixed(2)));
                    }}
                    className="px-2 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded font-mono cursor-pointer"
                  >
                    Set 3R
                  </button>
                </div>
              </div>
              <input
                type="number"
                step="any"
                value={takeProfitPrice}
                onChange={(e) => setTakeProfitPrice(Math.max(0.0001, Number(e.target.value)))}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl text-white font-mono text-sm focus:outline-none"
              />
            </div>

            {/* Leverage selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Account Leverage
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 5, 10, 20, 50].map((lev) => (
                  <button
                    key={lev}
                    onClick={() => setLeverage(lev)}
                    className={`py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      leverage === lev
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lev}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Output & Analytics */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-4">
              <Target className="w-5 h-5 text-cyan-400" />
              Calculated Execution Sizing
            </h3>

            {!isValidSL ? (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-300 leading-relaxed">
                  {tradeType === 'long' 
                    ? 'In a LONG position, Stop Loss must be BELOW Entry Price!'
                    : 'In a SHORT position, Stop Loss must be ABOVE Entry Price!'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Hero Position Size Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>RECOMMENDED POSITION SIZE</span>
                    <span className="text-emerald-400 font-bold">Capital Defense Formula</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    ${positionSizeUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm font-sans text-slate-400">USD</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400">
                    Units / Contracts: <strong>{unitAmount.toFixed(4)} Units</strong> @ ${entryPrice.toLocaleString()}
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400">Stop Loss Distance</span>
                    <div className="text-base font-bold text-rose-400 font-mono">
                      {stopLossPercent.toFixed(2)}%
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Loss: -${riskAmountUSD.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400">Take Profit Distance</span>
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      {takeProfitPercent.toFixed(2)}%
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Reward: +${profitTargetUSD.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400">Risk : Reward Ratio</span>
                    <div className={`text-base font-bold font-mono ${
                      rewardRiskRatio >= 2 ? 'text-emerald-400' : rewardRiskRatio >= 1 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      1 : {rewardRiskRatio.toFixed(2)} R
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {rewardRiskRatio >= 2 ? '✅ Excellent R:R' : '⚠️ Below 2R threshold'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400">Required Margin ({leverage}x)</span>
                    <div className="text-base font-bold text-white font-mono">
                      ${requiredMargin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Capital locked in trade
                    </span>
                  </div>
                </div>

                {/* Mathematical proof breakdown */}
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                  <div className="text-cyan-400 font-bold">Calculation Verification:</div>
                  <div>Risk Capital: ${accountBalance.toLocaleString()} × {riskPercent}% = ${riskAmountUSD.toFixed(2)}</div>
                  <div>Formula: ${riskAmountUSD.toFixed(2)} / {(stopLossPercent / 100).toFixed(4)} = ${positionSizeUSD.toFixed(2)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 30-Trade Positive Expectancy Simulator (Matching Slide 6 & 7!) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold mb-1">
              <Zap className="w-3.5 h-3.5" />
              SLIDE 6 & 7 PROVEN CASE STUDY
            </div>
            <h3 className="text-xl font-bold text-white">
              The 30-Trade Positive Expectancy Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              "With just a 50% win rate and 1:3 R/R, you generate +30% profit in 30 trades even if half of your trades fail!"
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSimCapital(6000);
                setSimRiskPercent(1);
                setSimWinRate(50);
                setSimRiskReward(3);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-mono rounded-lg border border-slate-700 cursor-pointer transition-colors"
            >
              Load Slide 7 ($6k / 3R / 50%)
            </button>
            <button
              onClick={() => {
                setSimCapital(6000);
                setSimRiskPercent(1);
                setSimWinRate(50);
                setSimRiskReward(2);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-emerald-300 font-mono rounded-lg border border-slate-700 cursor-pointer transition-colors"
            >
              Load Slide 6 ($6k / 2R / 50%)
            </button>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Starting Capital ($)</label>
            <input
              type="number"
              value={simCapital}
              onChange={(e) => setSimCapital(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Risk Per Trade (%)</label>
            <input
              type="number"
              step="0.5"
              value={simRiskPercent}
              onChange={(e) => setSimRiskPercent(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Win Rate ({simWinRate}%)</label>
            <input
              type="range"
              min="30"
              max="80"
              value={simWinRate}
              onChange={(e) => setSimWinRate(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer mt-1"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Risk to Reward (1 : {simRiskReward} R)</label>
            <input
              type="range"
              min="1.5"
              max="5"
              step="0.5"
              value={simRiskReward}
              onChange={(e) => setSimRiskReward(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer mt-1"
            />
          </div>
        </div>

        {/* Simulation Results Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Total Simulated Trades</span>
            <div className="text-xl font-bold text-white font-mono mt-1">
              30 Trades
            </div>
            <span className="text-[11px] text-slate-400">
              {winCount} Wins / {lossCount} Losses
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Gross Wins Revenue</span>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              +${grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-slate-400">
              {winCount} × ${profitPerWinUSD.toFixed(0)} ({simRiskReward}R)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Gross Losses</span>
            <div className="text-xl font-bold text-rose-400 font-mono mt-1">
              -${grossLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-slate-400">
              {lossCount} × ${riskPerTradeUSD.toFixed(0)} (1R)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 to-emerald-950/60 border border-emerald-500/50">
            <span className="text-xs text-emerald-300 font-semibold">Net Profit Outcome</span>
            <div className="text-2xl font-extrabold text-white font-mono mt-1">
              +${netProfitUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-emerald-400 font-mono font-bold">
              +{returnOnAccount.toFixed(1)}% Account Growth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
