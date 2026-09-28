import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Zap, 
  HelpCircle, 
  Check, 
  RotateCcw,
  Sliders,
  DollarSign,
  AlertTriangle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio.ts';
import { InteractiveSetupExecutionProof } from './InteractiveSetupExecutionProof.tsx';

interface SetupBlueprint {
  id: string;
  name: string;
  category: 'Structure' | 'Imbalance' | 'Liquidity' | 'Chart Pattern' | 'Indicator';
  bias: 'Bullish' | 'Bearish' | 'Bilateral';
  timeframe: string;
  opportunitySpotting: {
    prerequisite: string;
    chartClues: string[];
    bestSessions: string;
  };
  whenToEnter: {
    exactTrigger: string;
    orderType: string;
    confirmationRule: string;
    doNotEnterIf: string;
  };
  whenToExit: {
    takeProfit1: string;
    takeProfit2: string;
    stopLossLocation: string;
    stopLossBuffer: string;
    earlyAbortCondition: string;
  };
  institutionalRule: string;
}

const SETUPS: SetupBlueprint[] = [
  {
    id: 'fvg_rebalance',
    name: 'Fair Value Gap (FVG) Consequent Encroachment (CE)',
    category: 'Imbalance',
    bias: 'Bullish',
    timeframe: '15-Minute / 1-Hour',
    opportunitySpotting: {
      prerequisite: 'Market is in a confirmed higher-timeframe uptrend. An energetic impulse rally displaced price, creating a 3-candle imbalance.',
      chartClues: [
        'Candle 1 high and Candle 3 low do NOT overlap, leaving an open void.',
        'The FVG sits in the "Discount Zone" (below 50% equilibrium of the impulse leg).',
        'Volume indicator or displacement confirms institutional aggression.'
      ],
      bestSessions: 'London Open (08:00 - 11:00 GMT) or New York Open (13:30 - 16:30 GMT)'
    },
    whenToEnter: {
      exactTrigger: 'Wait for price to pull back into the FVG box and tap the 50% Consequent Encroachment (CE) midpoint line.',
      orderType: 'Buy Limit at 50% CE, or Market Order upon bullish rejection candle.',
      confirmationRule: 'For conservative traders: Enter when a 5M or 15M candle wicks into the gap and CLOSES outside the FVG with a green body.',
      doNotEnterIf: 'Do NOT enter if price cuts cleanly through the FVG and closes a candle body below the low of Candle 1. That inverts the gap into bearish resistance!'
    },
    whenToExit: {
      takeProfit1: 'TP1 at the recent Swing High that formed before the pullback (1:2 R:R). Close 50% of the position and move SL to Breakeven (+1 pip buffer).',
      takeProfit2: 'TP2 at the next major Buy-Side Liquidity (BSL) pool or higher-timeframe resistance (1:3 to 1:5 R:R).',
      stopLossLocation: 'Placed strictly 2-3 pips below the LOW of Candle 1 (the start of the imbalance move).',
      stopLossBuffer: 'Add 1.5x ATR (or 3-5 pips for Forex, 15 pts for NAS100) below the wick to withstand spread spikes.',
      earlyAbortCondition: 'If price touches the FVG and stalls for 5+ candles without any bounce, or if a 5M bearish CHOCH occurs, close at Breakeven or tiny loss.'
    },
    institutionalRule: 'The 50% Consequent Encroachment is the institutional sweet spot. Never chase the displacement; wait for price to pay its debt.'
  },
  {
    id: 'bos_pullback',
    name: 'Break of Structure (BOS) Role-Reversal Retest',
    category: 'Structure',
    bias: 'Bullish',
    timeframe: '1-Hour / 4-Hour',
    opportunitySpotting: {
      prerequisite: 'Price has printed a clear new Higher High (HH) with a full candle body close beyond previous resistance.',
      chartClues: [
        'Previous swing resistance has now flipped into potential support (Role Reversal).',
        'A fresh Bullish Order Block was created at the origin of the breakout.',
        'The pullback approaches the level with slowing momentum (smaller candles, lower volume).'
      ],
      bestSessions: 'Overlap of London and New York sessions'
    },
    whenToEnter: {
      exactTrigger: 'Wait for the retest of the broken swing level or the upper boundary of the unmitigated Order Block.',
      orderType: 'Limit Order or Market Order on confirmation.',
      confirmationRule: 'Wait for a Bullish Engulfing or Hammer candle to close on the trading timeframe after touching the retest zone.',
      doNotEnterIf: 'Never buy while the breakout candle is still expanding upward (FOMO). Never enter if the retest plunges below the Higher Low that started the breakout.'
    },
    whenToExit: {
      takeProfit1: 'TP1 at 1:2 Risk-Reward ratio or at the newly created Swing High. Take 50% profit off the table and move SL to Breakeven.',
      takeProfit2: 'TP2 at external higher-timeframe resistance. Trail the stop loss behind each subsequent Higher Low as long as BOS continues.',
      stopLossLocation: 'Placed 2-3 pips below the Higher Low wick that created the BOS impulse.',
      stopLossBuffer: 'Add 1.5x ATR spread buffer below the swing low wick.',
      earlyAbortCondition: 'If the retest fails to produce upside momentum within 4 candles, or if price closes below the broken resistance, exit early.'
    },
    institutionalRule: 'The breakout is the announcement; the retest is the invitation. Only fools RSVP to the announcement.'
  },
  {
    id: 'choch_reversal',
    name: 'Change of Character (CHOCH) Trend Shift Short',
    category: 'Structure',
    bias: 'Bearish',
    timeframe: '15-Minute / 1-Hour',
    opportunitySpotting: {
      prerequisite: 'An uptrend has reached a major daily resistance or swept Buy-Side Liquidity. Price then fails to push higher and crashes below the last Higher Low.',
      chartClues: [
        'Failure Swing: Buyers fail to print a higher high.',
        'Violent displacement candle closes with a full body below the last valid Higher Low.',
        'A Bearish Order Block and Bearish FVG are left behind at the top.'
      ],
      bestSessions: 'New York Open or London Open'
    },
    whenToEnter: {
      exactTrigger: 'Wait for price to pull back upwards (at least 50% Fibonacci retracement) into the newly created Bearish Order Block or Bearish FVG.',
      orderType: 'Sell Limit at the base of the Bearish Order Block, or Market Sell on bearish rejection.',
      confirmationRule: 'Enter when a Shooting Star, Bearish Pin Bar, or Bearish Engulfing candle CLOSES inside the supply zone.',
      doNotEnterIf: 'Do NOT sell in panic at the very bottom of the CHOCH drop. Do NOT enter if the pullback rallies aggressively and closes above the high that created the CHOCH.'
    },
    whenToExit: {
      takeProfit1: 'TP1 at the first internal swing low / demand pool. Bank 50% profit and immediately shift Stop Loss to Breakeven (+1 pip buffer).',
      takeProfit2: 'TP2 at major Sell-Side Liquidity (SSL) resting below previous range lows.',
      stopLossLocation: 'Placed strictly 2-3 pips + ATR spread buffer ABOVE the peak of the Bearish Order Block.',
      stopLossBuffer: 'Spread + 1.5x ATR above the high.',
      earlyAbortCondition: 'If price hovers inside the supply zone and forms a bullish micro-structure shift, exit with small loss.'
    },
    institutionalRule: 'CHOCH tells you the king is dead. Don\'t fight the new regime; sell the first retest into premium supply.'
  },
  {
    id: 'liquidity_sweep',
    name: 'Sell-Side Liquidity (SSL) Sweep & Judas Swing Long',
    category: 'Liquidity',
    bias: 'Bullish',
    timeframe: '5-Minute / 15-Minute',
    opportunitySpotting: {
      prerequisite: 'Price has created clean, obvious Equal Lows (Double Bottom) where retail traders have clustered stop losses.',
      chartClues: [
        'A sharp, high-speed spike pierces 5-15 pips below the equal lows right at session open (Judas Swing).',
        'The candle fails to close below the level — it snaps back aggressively, leaving a long lower shadow (wick).',
        'Large tick volume spike on the sweep candle indicates institutional accumulation.'
      ],
      bestSessions: 'London Open (08:00 GMT) or NY Session 13:30 GMT'
    },
    whenToEnter: {
      exactTrigger: 'Enter on the close of the rejection candle that sweeps the liquidity and snaps back inside the range.',
      orderType: 'Market Order upon candle close or Buy Stop above the high of the sweep candle.',
      confirmationRule: 'Candle body must close ABOVE the swept low level. A long wick must be clearly visible.',
      doNotEnterIf: 'Do NOT buy if the candle closes with a thick red body below the level (that is a true breakdown, not a sweep).'
    },
    whenToExit: {
      takeProfit1: 'TP1 at the midpoint (50% equilibrium) of the trading range. Take 50% profit and move Stop Loss to Breakeven.',
      takeProfit2: 'TP2 at the Buy-Side Liquidity (BSL) resting above the equal highs at the top of the range.',
      stopLossLocation: 'Placed strictly 2-3 pips below the lowest tip of the sweep wick.',
      stopLossBuffer: 'Add 1.5x ATR below the wick tip.',
      earlyAbortCondition: 'If price revisits and violates the lowest tip of the sweep wick, the setup is dead — cut loss immediately.'
    },
    institutionalRule: 'Retail stops are the fuel tanks of smart money. When the stops get swept, hop aboard the rocket before it clears the launchpad.'
  },
  {
    id: 'double_bottom_retest',
    name: 'Double Bottom Neckline Breakout & Retest',
    category: 'Chart Pattern',
    bias: 'Bullish',
    timeframe: '1-Hour / 4-Hour',
    opportunitySpotting: {
      prerequisite: 'Market has been in an extended downtrend and prints two roughly equal troughs with a central peak (neckline).',
      chartClues: [
        'Trough 2 shows diminishing selling pressure or bullish RSI divergence.',
        'Displacement breakout candle closes firmly above the horizontal neckline.',
        'Volume expands on the breakout.'
      ],
      bestSessions: 'London / NY Overlap'
    },
    whenToEnter: {
      exactTrigger: 'Wait for price to retrace and tap the broken neckline from above (testing prior resistance as new support).',
      orderType: 'Buy Limit on neckline or Market Buy upon bullish confirmation candle.',
      confirmationRule: 'Look for a Bullish Pin Bar or Piercing Line closing green at the neckline.',
      doNotEnterIf: 'Do NOT buy at the bottom of the second trough before the neckline has broken. Do NOT buy if price falls back deep inside the pattern.'
    },
    whenToExit: {
      takeProfit1: 'TP1 at 1:2 R:R. Scale 50% out and move Stop Loss to Breakeven (+1 pip buffer).',
      takeProfit2: 'TP2 at the Measured Move: distance from lowest trough to neckline, projected upward from breakout point.',
      stopLossLocation: 'Placed 2-3 pips below the lowest wick of the neckline retest candle (or below the central peak).',
      stopLossBuffer: '1.5x ATR below the retest wick.',
      earlyAbortCondition: 'If candle body closes back below the neckline, the breakout has failed — exit immediately.'
    },
    institutionalRule: 'A double bottom is only a pattern when the neckline breaks. Until then, it is merely wishful thinking.'
  },
  {
    id: 'ema_ribbon_pullback',
    name: '4EMA Ribbon Trend Pullback & RSI Confluence',
    category: 'Indicator',
    bias: 'Bullish',
    timeframe: '15-Minute / 1-Hour',
    opportunitySpotting: {
      prerequisite: 'The 4-EMA ribbon (8, 13, 21, 55 EMAs) is fanned out in perfect bullish alignment (8 > 13 > 21 > 55) with steep slope.',
      chartClues: [
        'Price pulls back gently into the dynamic support zone between the 13 EMA and 21 EMA.',
        'RSI (14) resets from overbought back into the 40-50 zone without breaking below 40.',
        'Candle bodies shrink as they touch the 21 EMA.'
      ],
      bestSessions: 'London or New York trend continuation phases'
    },
    whenToEnter: {
      exactTrigger: 'Enter when price touches the 13/21 EMA ribbon and prints a bullish rejection candle closing above the 8 EMA.',
      orderType: 'Market Buy on 8 EMA cross or Buy Stop above the trigger candle.',
      confirmationRule: 'RSI must curl upward above 50 on the trigger candle.',
      doNotEnterIf: 'Do NOT enter if the 8 EMA crosses below the 21 EMA, or if price closes below the 55 EMA baseline.'
    },
    whenToExit: {
      takeProfit1: 'TP1 at previous swing high (1:2 R:R). Bank 50% profit and move Stop Loss to Breakeven.',
      takeProfit2: 'TP2: Ride the trend until the 8 EMA crosses below the 21 EMA on the trading timeframe.',
      stopLossLocation: 'Placed 2-3 pips below the 55 EMA baseline or below the most recent pullback swing low.',
      stopLossBuffer: '1.5x ATR below the 55 EMA line.',
      earlyAbortCondition: 'If a candle body closes firmly below the 55 EMA, trend momentum has reversed — exit immediately.'
    },
    institutionalRule: 'The EMA ribbon is the spine of the trend. Buy the dips to the spine, but cut instantly if the spine breaks.'
  }
];

export const OpportunityFinderMatrix: React.FC = () => {
  const [selectedSetupId, setSelectedSetupId] = useState<string>('fvg_rebalance');
  const [activeChecklist, setActiveChecklist] = useState<Record<string, boolean>>({});

  const currentSetup = SETUPS.find(s => s.id === selectedSetupId) || SETUPS[0];

  // Pre-Trade Quality Checklist items
  const checkItems = [
    { id: 'c1', label: 'Higher Timeframe Trend aligns with trade direction (4H / Daily)' },
    { id: 'c2', label: 'Setup occurs at a Key Confluence Zone (Key Support/Resistance, FVG, or Liquidity Pool)' },
    { id: 'c3', label: 'Wait for confirmation candle to CLOSE (No blind front-running)' },
    { id: 'c4', label: 'Stop Loss sits behind structural invalidation anchor + 1.5x ATR buffer' },
    { id: 'c5', label: 'Risk is mathematically capped at 1% of account equity (Position Sized correctly)' },
    { id: 'c6', label: 'Take Profit 1 offers at least 1:2 Risk-to-Reward ratio' }
  ];

  const toggleCheckItem = (id: string) => {
    setActiveChecklist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      const count = Object.values(next).filter(Boolean).length;
      if (count === checkItems.length) {
        playSound('correct', true);
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const checkedCount = Object.values(activeChecklist).filter(Boolean).length;
  const qualityGrade = 
    checkedCount === 6 ? { text: 'A+ PERFECT SETUP', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40' } :
    checkedCount >= 4 ? { text: 'B ACCEPTABLE SETUP', color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40' } :
    { text: 'C LOW QUALITY - DO NOT EXECUTE', color: 'text-rose-400 bg-rose-500/20 border-rose-500/40' };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 p-6 md:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            THE TRADER'S MASTER BLUEPRINT
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How to Spot Opportunities & When to Enter / Exit
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Stop guessing in live market conditions. This terminal answers the two definitive questions of trading: <strong className="text-cyan-400">"How do I spot high-probability setups?"</strong> and <strong className="text-emerald-400">"When should I consider entering and exiting?"</strong>
          </p>
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2.5 mt-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Educational Disclaimer:</strong> We are <em>NOT</em> financial advisors. All trade parameters, triggers, and levels presented here are educational suggestions and simulated considerations for technical study, not direct investment instructions.
            </span>
          </div>
        </div>
      </div>

      {/* The 5-Step Macro Opportunity Scanning Process */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Zap className="w-5 h-5" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
            The 5-Step Top-Down Market Opportunity Scan
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Educational routine: Consider this structured 5-step analytical checklist before evaluating potential setups on Forex, Currencies, Indices, or Commodities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {[
            { step: '1', title: 'Macro Bias Scan', desc: 'Identify 4H/Daily trend. Are we printing BOS (Higher Highs) or CHOCH (Lower Lows)? Trade only in the direction of macro order flow.' },
            { step: '2', title: 'Mark Liquidity', desc: 'Highlight Equal Highs (BSL) and Equal Lows (SSL). Where are retail stop losses sitting right now? That is the market\'s magnet.' },
            { step: '3', title: 'Find Imbalances', desc: 'Locate unmitigated Fair Value Gaps (FVG) and Order Blocks (OB). These are the institutional discounted entry zones.' },
            { step: '4', title: 'Precision Trigger', desc: 'Wait for price to tap the zone and print the confirmation candle (e.g. Pin Bar or Engulfing). Never market enter prematurely.' },
            { step: '5', title: 'Execute & Exit Plan', desc: 'Calculate lot size backwards based on 1% risk. Set SL behind structural anchor + ATR buffer. Target 1:2 R:R (TP1) & trail to Breakeven.' }
          ].map(s => (
            <div key={s.step} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow">
                {s.step}
              </div>
              <h4 className="text-xs font-bold text-white">{s.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Selector & Execution Playbook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Setup Selector Menu */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
            <span>Select Market Setup</span>
            <span className="text-cyan-400 font-bold">{SETUPS.length} Models</span>
          </div>

          <div className="space-y-2">
            {SETUPS.map(setup => {
              const isSelected = setup.id === selectedSetupId;
              return (
                <button
                  key={setup.id}
                  onClick={() => setSelectedSetupId(setup.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/60 to-indigo-950/60 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {setup.category}
                    </span>
                    <span className={`text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded ${
                      setup.bias === 'Bullish' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      setup.bias === 'Bearish' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {setup.bias}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{setup.name}</h4>
                  <span className="text-[11px] text-slate-400 font-mono">Timeframe: {setup.timeframe}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Execution Blueprint */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            {/* Setup Title Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30 uppercase">
                    {currentSetup.category} MODEL
                  </span>
                  <span className="text-xs font-mono text-slate-400">Timeframe: {currentSetup.timeframe}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">{currentSetup.name}</h2>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-300">
                <span className="font-bold block uppercase text-[10px] text-slate-400">Best Trading Session:</span>
                {currentSetup.opportunitySpotting.bestSessions}
              </div>
            </div>

            {/* VISUAL TRADE EXECUTION PROOF & ANIMATED CHART REPLAY */}
            <InteractiveSetupExecutionProof 
              activeSetupId={selectedSetupId} 
              onSetupChange={setSelectedSetupId} 
            />

            {/* SECTION 1: HOW TO SPOT THE OPPORTUNITY */}
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Compass className="w-4 h-4" />
                1. How to Spot This Opportunity on Live Charts
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong>Prerequisite:</strong> {currentSetup.opportunitySpotting.prerequisite}
              </p>
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Key Chart Clues:</span>
                <ul className="space-y-1">
                  {currentSetup.opportunitySpotting.chartClues.map((clue, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">▸</span>
                      <span>{clue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SECTION 2 & 3: WHEN TO ENTER vs WHEN TO EXIT (GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WHEN TO ENTER */}
              <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <ArrowRight className="w-4 h-4" />
                  2. When Exactly to Enter (The Trigger)
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-200 block font-mono">Exact Entry Point:</strong>
                    <p className="text-slate-300 leading-relaxed">{currentSetup.whenToEnter.exactTrigger}</p>
                  </div>
                  <div>
                    <strong className="text-slate-200 block font-mono">Order Type:</strong>
                    <p className="text-cyan-300 font-mono">{currentSetup.whenToEnter.orderType}</p>
                  </div>
                  <div>
                    <strong className="text-slate-200 block font-mono">Confirmation Candle Rule:</strong>
                    <p className="text-slate-300 leading-relaxed">{currentSetup.whenToEnter.confirmationRule}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px]">
                    <strong>⚠️ DO NOT ENTER IF:</strong> {currentSetup.whenToEnter.doNotEnterIf}
                  </div>
                </div>
              </div>

              {/* WHEN TO EXIT */}
              <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <Target className="w-4 h-4" />
                  3. When Exactly to Exit (Profit & Protection)
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-emerald-400 block font-mono">Take Profit 1 (Scale 50% & Breakeven):</strong>
                    <p className="text-slate-300 leading-relaxed">{currentSetup.whenToExit.takeProfit1}</p>
                  </div>
                  <div>
                    <strong className="text-cyan-400 block font-mono">Take Profit 2 (Macro Runner Target):</strong>
                    <p className="text-slate-300 leading-relaxed">{currentSetup.whenToExit.takeProfit2}</p>
                  </div>
                  <div>
                    <strong className="text-rose-400 block font-mono">Stop Loss Location & Buffer:</strong>
                    <p className="text-slate-300 leading-relaxed">{currentSetup.whenToExit.stopLossLocation}</p>
                    <span className="text-[11px] text-amber-300 font-mono block mt-1">Buffer: {currentSetup.whenToExit.stopLossBuffer}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                    <strong>🚨 EMERGENCY EARLY EXIT:</strong> {currentSetup.whenToExit.earlyAbortCondition}
                  </div>
                </div>
              </div>
            </div>

            {/* Master Technical Execution Principle */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-slate-950 border border-indigo-500/30 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs text-slate-200">
                <strong className="text-cyan-400 block font-mono uppercase text-[10px]">Institutional Execution Principle</strong>
                "{currentSetup.institutionalRule}"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Trade Quality Checklist Tool */}
      <div className="bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PRE-FLIGHT TRADE QUALITY AUDITOR
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Should I Take This Trade Right Now?
            </h3>
            <p className="text-xs text-slate-400">
              Run through this 6-point checklist before entering any live market order. Professional traders execute ONLY when at least 5 points are verified.
            </p>
          </div>

          {/* Quality Badge */}
          <div className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 shadow-lg ${qualityGrade.color}`}>
            <Sparkles className="w-4 h-4" />
            <span>{qualityGrade.text} ({checkedCount}/6)</span>
          </div>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checkItems.map(item => {
            const isChecked = !!activeChecklist[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheckItem(item.id)}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-500/60 text-white shadow-sm'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                  isChecked ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-700 bg-slate-900'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium leading-relaxed">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveChecklist({})}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Auditor</span>
          </button>
          <span className="text-xs text-slate-500 font-mono">
            {checkedCount === 6 ? '✓ Ready for live execution with strict 1% risk.' : '⚠️ Do not trade yet. Missing key confluences.'}
          </span>
        </div>
      </div>
    </div>
  );
};
