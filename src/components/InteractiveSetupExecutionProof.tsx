import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Sliders,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio.ts';

export interface SetupProofConfig {
  setupId: string;
  name: string;
  bias: 'Bullish' | 'Bearish';
  timeframe: string;
  entryPrice: number;
  stopLossPrice: number;
  tp1Price: number;
  tp2Price: number;
  riskReward: string;
  spottingSummary: string;
  entryTriggerSummary: string;
  stopLossRationale: string;
  tp1Rationale: string;
  tp2Rationale: string;
  candles: Array<{
    x: number;
    open: number;
    high: number;
    low: number;
    close: number;
    isGreen: boolean;
    label?: string;
    stepTrigger?: number;
  }>;
  keyLevels: Array<{
    price: number;
    label: string;
    color: string;
    type: 'spot' | 'entry' | 'sl' | 'tp1' | 'tp2';
  }>;
}

const SETUP_PROOFS: Record<string, SetupProofConfig> = {
  fvg_rebalance: {
    setupId: 'fvg_rebalance',
    name: 'Bullish FVG 50% Consequent Encroachment (CE)',
    bias: 'Bullish',
    timeframe: '15-Minute Forex / Indices',
    entryPrice: 1.0850,
    stopLossPrice: 1.0825,
    tp1Price: 1.0900,
    tp2Price: 1.0940,
    riskReward: '1:3.6 R:R',
    spottingSummary: 'Spot an aggressive 3-candle institutional displacement creating an imbalance between Candle 1 High (1.0830) and Candle 3 Low (1.0870).',
    entryTriggerSummary: 'Wait for price to retrace down into the void and tap the 50% CE level (1.0850). Enter on limit order or 5M bullish pin-bar close.',
    stopLossRationale: 'Anchored at 1.0825 (5 pips below Candle 1 low + 1.5x ATR spread buffer).',
    tp1Rationale: 'TP1 at 1.0900 (1:2 R:R). Close 50% of the position and immediately advance Stop Loss to Breakeven (+1 pip buffer).',
    tp2Rationale: 'TP2 at 1.0940 (Macro Buy-Side Liquidity pool above Asian session highs).',
    candles: [
      { x: 50, open: 1.0815, high: 1.0830, low: 1.0810, close: 1.0828, isGreen: true, label: 'C1 Anchor', stepTrigger: 1 },
      { x: 100, open: 1.0828, high: 1.0880, low: 1.0825, close: 1.0875, isGreen: true, label: 'C2 Surge', stepTrigger: 1 },
      { x: 150, open: 1.0875, high: 1.0895, low: 1.0870, close: 1.0890, isGreen: true, label: 'C3 Extension', stepTrigger: 1 },
      { x: 210, open: 1.0890, high: 1.0892, low: 1.0865, close: 1.0868, isGreen: false, stepTrigger: 2 },
      { x: 260, open: 1.0868, high: 1.0870, low: 1.0850, close: 1.0852, isGreen: false, label: 'Tap 50% CE', stepTrigger: 2 },
      { x: 310, open: 1.0852, high: 1.0865, low: 1.0848, close: 1.0862, isGreen: true, label: '🟢 Entry Trigger', stepTrigger: 2 },
      { x: 360, open: 1.0862, high: 1.0878, low: 1.0858, close: 1.0875, isGreen: true, stepTrigger: 3 },
      { x: 410, open: 1.0875, high: 1.0876, low: 1.0835, close: 1.0860, isGreen: false, label: 'Buffer Tested', stepTrigger: 3 },
      { x: 460, open: 1.0860, high: 1.0902, low: 1.0858, close: 1.0900, isGreen: true, label: '🎯 TP1 Hit', stepTrigger: 4 },
      { x: 510, open: 1.0900, high: 1.0915, low: 1.0892, close: 1.0910, isGreen: true, stepTrigger: 4 },
      { x: 560, open: 1.0910, high: 1.0945, low: 1.0905, close: 1.0940, isGreen: true, label: '🏆 TP2 Hit', stepTrigger: 5 }
    ],
    keyLevels: [
      { price: 1.0870, label: 'FVG Ceiling (C3 Low)', color: '#f59e0b', type: 'spot' },
      { price: 1.0850, label: '🟢 ENTRY: 50% CE Midpoint (1.0850)', color: '#10b981', type: 'entry' },
      { price: 1.0830, label: 'FVG Floor (C1 High)', color: '#f59e0b', type: 'spot' },
      { price: 1.0825, label: '🛑 STOP LOSS: Swing Low + 1.5x ATR (1.0825)', color: '#f43f5e', type: 'sl' },
      { price: 1.0900, label: '🎯 TP1: 1:2 R:R (Scale 50% & SL -> Breakeven)', color: '#38bdf8', type: 'tp1' },
      { price: 1.0940, label: '🏆 TP2: Macro Liquidity Target 1:3.6 R:R', color: '#34d399', type: 'tp2' }
    ]
  },

  bos_pullback: {
    setupId: 'bos_pullback',
    name: 'Break of Structure (BOS) Role-Reversal Retest',
    bias: 'Bullish',
    timeframe: '1-Hour / 15-Minute',
    entryPrice: 152.50,
    stopLossPrice: 151.80,
    tp1Price: 153.90,
    tp2Price: 155.00,
    riskReward: '1:3.5 R:R',
    spottingSummary: 'Price forcefully slices through prior Swing High (152.50) with full candle body close, establishing a confirmed bullish BOS.',
    entryTriggerSummary: 'Wait for price to pull back to the broken swing high (now acting as support). Enter when bullish confirmation pin bar closes.',
    stopLossRationale: 'Anchored 10 pips below the Order Block base at 151.80 (+ ATR buffer).',
    tp1Rationale: 'TP1 at 153.90 (previous impulse peak). Scale 50% off table, move SL to breakeven.',
    tp2Rationale: 'TP2 at 155.00 (Unmitigated 4H Bearish FVG / Institutional Target).',
    candles: [
      { x: 50, open: 151.20, high: 152.50, low: 151.00, close: 152.40, isGreen: true, label: 'Prior High', stepTrigger: 1 },
      { x: 100, open: 152.40, high: 152.45, low: 151.60, close: 151.80, isGreen: false, label: 'Pullback', stepTrigger: 1 },
      { x: 150, open: 151.80, high: 153.80, low: 151.70, close: 153.70, isGreen: true, label: '⚡ BOS Close', stepTrigger: 1 },
      { x: 210, open: 153.70, high: 153.90, low: 153.10, close: 153.20, isGreen: false, stepTrigger: 2 },
      { x: 260, open: 153.20, high: 153.30, low: 152.50, close: 152.55, isGreen: false, label: 'Retest Line', stepTrigger: 2 },
      { x: 310, open: 152.55, high: 152.95, low: 152.45, close: 152.90, isGreen: true, label: '🟢 Entry Trigger', stepTrigger: 2 },
      { x: 360, open: 152.90, high: 153.20, low: 152.30, close: 153.10, isGreen: true, stepTrigger: 3 },
      { x: 410, open: 153.10, high: 153.15, low: 152.00, close: 152.80, isGreen: false, label: 'Buffer Tested', stepTrigger: 3 },
      { x: 460, open: 152.80, high: 154.00, low: 152.70, close: 153.90, isGreen: true, label: '🎯 TP1 Hit', stepTrigger: 4 },
      { x: 510, open: 153.90, high: 154.40, low: 153.70, close: 154.20, isGreen: true, stepTrigger: 4 },
      { x: 560, open: 154.20, high: 155.10, low: 154.00, close: 155.00, isGreen: true, label: '🏆 TP2 Hit', stepTrigger: 5 }
    ],
    keyLevels: [
      { price: 152.50, label: '🟢 ENTRY: Role-Reversal Support (152.50)', color: '#10b981', type: 'entry' },
      { price: 151.80, label: '🛑 STOP LOSS: Below Origin Order Block (151.80)', color: '#f43f5e', type: 'sl' },
      { price: 153.90, label: '🎯 TP1: Previous High (1:2 R:R - Scale 50%)', color: '#38bdf8', type: 'tp1' },
      { price: 155.00, label: '🏆 TP2: 4H Institutional Target (1:3.5 R:R)', color: '#34d399', type: 'tp2' }
    ]
  },

  choch_reversal: {
    setupId: 'choch_reversal',
    name: 'Change of Character (CHOCH) Trend Shift Short',
    bias: 'Bearish',
    timeframe: '15-Minute / 1-Hour',
    entryPrice: 2040.0,
    stopLossPrice: 2052.0,
    tp1Price: 2016.0,
    tp2Price: 1995.0,
    riskReward: '1:3.7 R:R',
    spottingSummary: 'Price fails to print a higher high, then plunges with heavy volume to shatter the last key Higher Low (2035.0), confirming a bearish regime change.',
    entryTriggerSummary: 'Wait for price to retrace upward into the Bearish Supply Order Block (2040.0 - 2045.0). Sell upon bearish engulfing confirmation.',
    stopLossRationale: 'Anchored strictly above the swing high that initiated the CHOCH at 2052.0 (+ ATR buffer).',
    tp1Rationale: 'TP1 at 2016.0 (1:2 R:R). Lock in 50% profit and drag Stop Loss to Breakeven.',
    tp2Rationale: 'TP2 at 1995.0 (Major Sell-Side Liquidity pool resting below daily support).',
    candles: [
      { x: 50, open: 2030, high: 2048, low: 2028, close: 2046, isGreen: true, label: 'High', stepTrigger: 1 },
      { x: 100, open: 2046, high: 2050, low: 2035, close: 2036, isGreen: false, label: 'Key Low', stepTrigger: 1 },
      { x: 150, open: 2036, high: 2047, low: 2035, close: 2045, isGreen: true, label: 'Failure High', stepTrigger: 1 },
      { x: 210, open: 2045, high: 2046, low: 2024, close: 2026, isGreen: false, label: '💥 CHOCH Break', stepTrigger: 1 },
      { x: 260, open: 2026, high: 2041, low: 2025, close: 2040, isGreen: true, label: 'Retest Supply', stepTrigger: 2 },
      { x: 310, open: 2040, high: 2042, low: 2032, close: 2034, isGreen: false, label: '🔴 Entry Trigger', stepTrigger: 2 },
      { x: 360, open: 2034, high: 2036, low: 2024, close: 2025, isGreen: false, stepTrigger: 3 },
      { x: 410, open: 2025, high: 2048, low: 2023, close: 2030, isGreen: true, label: 'Buffer Tested', stepTrigger: 3 },
      { x: 460, open: 2030, high: 2031, low: 2015, close: 2016, isGreen: false, label: '🎯 TP1 Hit', stepTrigger: 4 },
      { x: 510, open: 2016, high: 2020, low: 2005, close: 2008, isGreen: false, stepTrigger: 4 },
      { x: 560, open: 2008, high: 2010, low: 1993, close: 1995, isGreen: false, label: '🏆 TP2 Hit', stepTrigger: 5 }
    ],
    keyLevels: [
      { price: 2040.0, label: '🔴 ENTRY: Bearish Supply Retest (2040.0)', color: '#f43f5e', type: 'entry' },
      { price: 2052.0, label: '🛑 STOP LOSS: Above CHOCH Origin High (2052.0)', color: '#f43f5e', type: 'sl' },
      { price: 2016.0, label: '🎯 TP1: 1:2 R:R (Scale 50% & SL -> Breakeven)', color: '#38bdf8', type: 'tp1' },
      { price: 1995.0, label: '🏆 TP2: Major Sell-Side Liquidity (1995.0)', color: '#34d399', type: 'tp2' }
    ]
  },

  liquidity_sweep: {
    setupId: 'liquidity_sweep',
    name: 'Sell-Side Liquidity (SSL) Judas Swing Long',
    bias: 'Bullish',
    timeframe: '5-Minute / 15-Minute (London/NY Open)',
    entryPrice: 1.2650,
    stopLossPrice: 1.2628,
    tp1Price: 1.2694,
    tp2Price: 1.2740,
    riskReward: '1:4.0 R:R',
    spottingSummary: 'Spot equal lows or clean double bottom where retail traders have accumulated stop losses. Anticipate an engineered sweep.',
    entryTriggerSummary: 'Wait for price to pierce the support line by 8-15 pips, sweep stops, and close back INSIDE the range with a long rejection wick (Pin Bar).',
    stopLossRationale: 'Placed 2 pips below the lowest tip of the sweep wick at 1.2628 (+ 1.5x ATR buffer).',
    tp1Rationale: 'TP1 at 1.2694 (Range equilibrium 50%). Bank 50% and move Stop Loss to Breakeven.',
    tp2Rationale: 'TP2 at 1.2740 (Opposite Buy-Side Liquidity resting above equal highs).',
    candles: [
      { x: 50, open: 1.2680, high: 1.2685, low: 1.2650, close: 1.2655, isGreen: false, label: 'Bottom 1', stepTrigger: 1 },
      { x: 100, open: 1.2655, high: 1.2690, low: 1.2652, close: 1.2685, isGreen: true, label: 'Bouncing', stepTrigger: 1 },
      { x: 150, open: 1.2685, high: 1.2688, low: 1.2650, close: 1.2652, isGreen: false, label: 'Bottom 2 (Stops)', stepTrigger: 1 },
      { x: 210, open: 1.2652, high: 1.2655, low: 1.2630, close: 1.2650, isGreen: true, label: '⚡ Judas Sweep Wick', stepTrigger: 2 },
      { x: 260, open: 1.2650, high: 1.2665, low: 1.2645, close: 1.2662, isGreen: true, label: '🟢 Entry Trigger', stepTrigger: 2 },
      { x: 310, open: 1.2662, high: 1.2678, low: 1.2658, close: 1.2675, isGreen: true, stepTrigger: 3 },
      { x: 360, open: 1.2675, high: 1.2678, low: 1.2638, close: 1.2660, isGreen: false, label: 'Buffer Tested', stepTrigger: 3 },
      { x: 410, open: 1.2660, high: 1.2696, low: 1.2658, close: 1.2694, isGreen: true, label: '🎯 TP1 Hit', stepTrigger: 4 },
      { x: 460, open: 1.2694, high: 1.2715, low: 1.2688, close: 1.2710, isGreen: true, stepTrigger: 4 },
      { x: 510, open: 1.2710, high: 1.2745, low: 1.2705, close: 1.2740, isGreen: true, label: '🏆 TP2 Hit', stepTrigger: 5 }
    ],
    keyLevels: [
      { price: 1.2650, label: 'Equal Lows Support / Sweep Line', color: '#f59e0b', type: 'spot' },
      { price: 1.2650, label: '🟢 ENTRY: Rejection Close Inside Range (1.2650)', color: '#10b981', type: 'entry' },
      { price: 1.2628, label: '🛑 STOP LOSS: Wick Low + 1.5x ATR (1.2628)', color: '#f43f5e', type: 'sl' },
      { price: 1.2694, label: '🎯 TP1: Range Midpoint (1:2 R:R - Scale 50%)', color: '#38bdf8', type: 'tp1' },
      { price: 1.2740, label: '🏆 TP2: Buy-Side Liquidity Pool (1.2740)', color: '#34d399', type: 'tp2' }
    ]
  },

  double_bottom_retest: {
    setupId: 'double_bottom_retest',
    name: 'Double Bottom Neckline Retest Confluence',
    bias: 'Bullish',
    timeframe: '1-Hour / 4-Hour',
    entryPrice: 85.00,
    stopLossPrice: 83.80,
    tp1Price: 87.40,
    tp2Price: 89.80,
    riskReward: '1:4.0 R:R',
    spottingSummary: 'Two distinct swing troughs formed at the exact same horizontal demand floor, with a peak in between defining the neckline at 85.00.',
    entryTriggerSummary: 'Price breaks the neckline, closes above it, and retraces to kiss the neckline from above. Enter on bullish hammer or morning star.',
    stopLossRationale: 'Anchored at 83.80 (below the neckline retest swing and previous resistance shelf + ATR buffer).',
    tp1Rationale: 'TP1 at 87.40 (1:2 R:R). Scale out 50% and shift Stop Loss to Breakeven (+1 pip buffer).',
    tp2Rationale: 'TP2 at 89.80 (Full 100% measured move of the pattern depth projected upward).',
    candles: [
      { x: 50, open: 85.5, high: 85.6, low: 82.5, close: 82.8, isGreen: false, label: 'Trough 1', stepTrigger: 1 },
      { x: 100, open: 82.8, high: 85.0, low: 82.6, close: 84.8, isGreen: true, label: 'Neckline Peak', stepTrigger: 1 },
      { x: 150, open: 84.8, high: 85.0, low: 82.5, close: 82.7, isGreen: false, label: 'Trough 2', stepTrigger: 1 },
      { x: 210, open: 82.7, high: 86.2, low: 82.6, close: 86.0, isGreen: true, label: '⚡ Neckline Break', stepTrigger: 1 },
      { x: 260, open: 86.0, high: 86.1, low: 85.0, close: 85.1, isGreen: false, label: 'Neckline Retest', stepTrigger: 2 },
      { x: 310, open: 85.1, high: 85.6, low: 84.9, close: 85.5, isGreen: true, label: '🟢 Entry Trigger', stepTrigger: 2 },
      { x: 360, open: 85.5, high: 86.0, low: 84.2, close: 85.8, isGreen: true, label: 'Buffer Tested', stepTrigger: 3 },
      { x: 410, open: 85.8, high: 87.5, low: 85.5, close: 87.4, isGreen: true, label: '🎯 TP1 Hit', stepTrigger: 4 },
      { x: 460, open: 87.4, high: 88.5, low: 87.0, close: 88.2, isGreen: true, stepTrigger: 4 },
      { x: 510, open: 88.2, high: 90.0, low: 88.0, close: 89.8, isGreen: true, label: '🏆 TP2 Hit', stepTrigger: 5 }
    ],
    keyLevels: [
      { price: 85.00, label: '🟢 ENTRY: Neckline Retest (85.00)', color: '#10b981', type: 'entry' },
      { price: 83.80, label: '🛑 STOP LOSS: Under Retest Shelf (83.80)', color: '#f43f5e', type: 'sl' },
      { price: 87.40, label: '🎯 TP1: 1:2 R:R (Scale 50% & SL -> Breakeven)', color: '#38bdf8', type: 'tp1' },
      { price: 89.80, label: '🏆 TP2: 100% Measured Move Target (89.80)', color: '#34d399', type: 'tp2' }
    ]
  },

  ema_ribbon_pullback: {
    setupId: 'ema_ribbon_pullback',
    name: '4EMA Ribbon Trend Pullback & RSI Confluence',
    bias: 'Bullish',
    timeframe: '15-Minute / 1-Hour',
    entryPrice: 420.0,
    stopLossPrice: 414.0,
    tp1Price: 432.0,
    tp2Price: 444.0,
    riskReward: '1:4.0 R:R',
    spottingSummary: '4-EMA ribbon (8, 13, 21, 55 EMAs) is fanned out in bullish alignment. RSI (14) resets from overbought back into the 40-50 zone without breaking 40.',
    entryTriggerSummary: 'Price pulls back into the dynamic support zone between the 13 EMA and 21 EMA. Enter when a bullish reversal candle closes above the 8 EMA.',
    stopLossRationale: 'Anchored 2-3 pips below the 55 EMA baseline at 414.0 (+ ATR buffer).',
    tp1Rationale: 'TP1 at 432.0 (previous swing high). Close 50% and move Stop Loss to Breakeven.',
    tp2Rationale: 'TP2 at 444.0 (Ride trend until 8 EMA crosses below 21 EMA).',
    candles: [
      { x: 50, open: 410, high: 425, low: 408, close: 424, isGreen: true, label: 'Trend Surge', stepTrigger: 1 },
      { x: 100, open: 424, high: 430, low: 422, close: 428, isGreen: true, stepTrigger: 1 },
      { x: 150, open: 428, high: 429, low: 422, close: 423, isGreen: false, label: 'Pullback to 13EMA', stepTrigger: 1 },
      { x: 210, open: 423, high: 424, low: 419, close: 420, isGreen: false, label: 'Tap 21EMA', stepTrigger: 2 },
      { x: 260, open: 420, high: 423, low: 419.5, close: 422.5, isGreen: true, label: '🟢 Entry (8EMA Cross)', stepTrigger: 2 },
      { x: 310, open: 422.5, high: 426, low: 421.5, close: 425, isGreen: true, stepTrigger: 3 },
      { x: 360, open: 425, high: 425.5, low: 416, close: 423, isGreen: false, label: 'Buffer Tested', stepTrigger: 3 },
      { x: 410, open: 423, high: 432.5, low: 422, close: 432, isGreen: true, label: '🎯 TP1 Hit', stepTrigger: 4 },
      { x: 460, open: 432, high: 438, low: 430, close: 436, isGreen: true, stepTrigger: 4 },
      { x: 510, open: 436, high: 445, low: 434, close: 444, isGreen: true, label: '🏆 TP2 Hit', stepTrigger: 5 }
    ],
    keyLevels: [
      { price: 420.0, label: '🟢 ENTRY: 21 EMA Bounce + 8 EMA Cross (420.0)', color: '#10b981', type: 'entry' },
      { price: 414.0, label: '🛑 STOP LOSS: Below 55 EMA Baseline (414.0)', color: '#f43f5e', type: 'sl' },
      { price: 432.0, label: '🎯 TP1: Prior Swing High (1:2 R:R - Scale 50%)', color: '#38bdf8', type: 'tp1' },
      { price: 444.0, label: '🏆 TP2: Macro Trend Target (1:4.0 R:R)', color: '#34d399', type: 'tp2' }
    ]
  }
};

interface Props {
  activeSetupId?: string;
  onSetupChange?: (id: string) => void;
}

export const InteractiveSetupExecutionProof: React.FC<Props> = ({
  activeSetupId = 'fvg_rebalance',
  onSetupChange
}) => {
  const [currentId, setCurrentId] = useState<string>(activeSetupId);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (activeSetupId && activeSetupId !== currentId) {
      setCurrentId(activeSetupId);
      setCurrentStep(1);
    }
  }, [activeSetupId]);

  const config = SETUP_PROOFS[currentId] || SETUP_PROOFS['fvg_rebalance'];

  // Auto-play trade simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            playSound('correct', soundEnabled);
            return 5;
          }
          return prev + 1;
        });
      }, 2600);
    }
    return () => clearInterval(timer);
  }, [isPlaying, soundEnabled]);

  const handleSelectSetup = (id: string) => {
    setCurrentId(id);
    setCurrentStep(1);
    setIsPlaying(false);
    if (onSetupChange) onSetupChange(id);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setIsPlaying(true);
  };

  // Compute coordinate scalers for SVG chart
  const minPrice = Math.min(config.stopLossPrice, ...config.candles.map(c => c.low)) - (config.entryPrice * 0.003);
  const maxPrice = Math.max(config.tp2Price, ...config.candles.map(c => c.high)) + (config.entryPrice * 0.003);
  const priceRange = maxPrice - minPrice;

  const getY = (price: number) => {
    const norm = (price - minPrice) / (priceRange || 1);
    return 270 - norm * 210; // SVG height is 300
  };

  // Filter visible candles based on currentStep
  const visibleCandles = config.candles.filter(c => (c.stepTrigger || 1) <= currentStep);

  return (
    <div className="bg-slate-900/95 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              INTERACTIVE TRADE EXECUTION PROOF
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
              {config.riskReward}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
            {config.name}
          </h3>
          <p className="text-xs text-slate-400">
            Real-time graphical demonstration of where to spot the setup, the exact entry trigger, stop loss buffer, and profit targets.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
              isPlaying 
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20' 
                : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 text-white shadow-emerald-600/20'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Simulation' : 'Play Live Simulation'}</span>
          </button>
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Restart Trade Simulation"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Setup Model Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {Object.values(SETUP_PROOFS).map(s => (
          <button
            key={s.setupId}
            onClick={() => handleSelectSetup(s.setupId)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
              currentId === s.setupId
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow'
                : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {s.name.split('(')[0]}
          </button>
        ))}
      </div>

      {/* 5-Step Timeline Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { step: 1, label: '1. Spotting Zone', desc: 'Scan & Mark Level' },
          { step: 2, label: '2. Entry Trigger', desc: 'Confirm & Fill Order' },
          { step: 3, label: '3. Stop Loss Buffer', desc: 'Anchor Invalidation' },
          { step: 4, label: '4. Exit TP1 (1:2 R:R)', desc: 'Bank 50% & SL->BE' },
          { step: 5, label: '5. Exit TP2 (Macro)', desc: 'Harvest Runner' },
        ].map(item => {
          const isActive = currentStep === item.step;
          const isPassed = currentStep > item.step;
          return (
            <button
              key={item.step}
              onClick={() => {
                setCurrentStep(item.step);
                setIsPlaying(false);
              }}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isActive 
                  ? 'bg-cyan-950/50 border-cyan-500/70 shadow-lg shadow-cyan-500/10' 
                  : isPassed
                  ? 'bg-slate-950/80 border-emerald-500/40 text-slate-300'
                  : 'bg-slate-950/50 border-slate-800/80 text-slate-500 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                <span className={isActive ? 'text-cyan-400' : isPassed ? 'text-emerald-400' : 'text-slate-400'}>
                  Step {item.step}
                </span>
                {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className="text-xs font-bold text-white mt-0.5 truncate">{item.label}</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">{item.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Candlestick SVG Chart Viewport */}
      <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
        {/* Step Indicator Banner */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-slate-900/90 text-[11px] font-mono font-bold text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow">
            STATUS: {
              currentStep === 1 ? '🔍 1. SPOTTING CONFLUENCE & LEVEL' :
              currentStep === 2 ? '🟢 2. ENTRY TRIGGER EXECUTED' :
              currentStep === 3 ? '🛡️ 3. STOP LOSS ANCHORED (BUFFER SAFE)' :
              currentStep === 4 ? '🎯 4. TAKE PROFIT 1 HIT (50% SECURED + BE)' :
              '🏆 5. TAKE PROFIT 2 HIT (TRADE COMPLETE)'
            }
          </span>
        </div>

        {/* Live Risk:Reward Badge */}
        <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
          <div className="px-3 py-1 rounded bg-slate-900/90 text-xs font-mono text-emerald-400 border border-emerald-500/30 font-bold backdrop-blur-md">
            RR: {config.riskReward}
          </div>
        </div>

        {/* The SVG Canvas */}
        <svg viewBox="0 0 650 300" className="w-full h-72 md:h-80 overflow-hidden">
          {/* Grid Background */}
          <defs>
            <pattern id="proof-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.7" opacity="0.4" />
            </pattern>
            {/* Green gradient for Take Profit Zone */}
            <linearGradient id="tp-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            {/* Red gradient for Stop Loss Hazard Zone */}
            <linearGradient id="sl-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#proof-grid)" />

          {/* Zones */}
          {/* TP2 Target Zone Box */}
          {currentStep >= 1 && (
            <rect 
              x="40" 
              y={getY(config.tp2Price)} 
              width="570" 
              height={Math.max(10, Math.abs(getY(config.tp1Price) - getY(config.tp2Price)))} 
              fill="url(#tp-grad)" 
              stroke="#10b981" 
              strokeWidth="0.8" 
              strokeDasharray="2 2"
              opacity="0.6"
            />
          )}

          {/* Stop Loss Hazard Zone Box */}
          {currentStep >= 1 && (
            <rect 
              x="40" 
              y={getY(config.entryPrice)} 
              width="570" 
              height={Math.max(10, Math.abs(getY(config.stopLossPrice) - getY(config.entryPrice)))} 
              fill="url(#sl-grad)" 
              stroke="#f43f5e" 
              strokeWidth="0.8" 
              strokeDasharray="2 2"
              opacity="0.4"
            />
          )}

          {/* Key Horizontal Price Lines */}
          {config.keyLevels.map((lvl, idx) => {
            const y = getY(lvl.price);
            const isEntry = lvl.type === 'entry';
            const isSL = lvl.type === 'sl';
            const isTP1 = lvl.type === 'tp1';
            const isTP2 = lvl.type === 'tp2';

            return (
              <g key={idx} className="transition-all duration-500">
                <line 
                  x1="40" 
                  y1={y} 
                  x2="610" 
                  y2={y} 
                  stroke={lvl.color} 
                  strokeWidth={isEntry ? 2.2 : isSL ? 2 : 1.5} 
                  strokeDasharray={isEntry ? '4 2' : isSL ? '3 3' : '2 2'}
                  opacity={
                    (isEntry && currentStep >= 2) || (isSL && currentStep >= 3) || (isTP1 && currentStep >= 4) || (isTP2 && currentStep >= 5) || lvl.type === 'spot'
                      ? 1 
                      : 0.3
                  }
                />
                <rect 
                  x="45" 
                  y={y - 10} 
                  width={lvl.label.length * 5.8 + 14} 
                  height="18" 
                  rx="3" 
                  fill="#020617" 
                  stroke={lvl.color} 
                  strokeWidth="1"
                  opacity="0.95"
                />
                <text 
                  x="52" 
                  y={y + 3} 
                  fill={lvl.color} 
                  fontSize="9.5" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                >
                  {lvl.label}
                </text>
              </g>
            );
          })}

          {/* Dynamic Breakeven Indicator at Step 4 & 5 */}
          {currentStep >= 4 && (
            <g className="animate-fadeIn">
              <line 
                x1="40" 
                y1={getY(config.entryPrice)} 
                x2="610" 
                y2={getY(config.entryPrice)} 
                stroke="#38bdf8" 
                strokeWidth="2" 
                strokeDasharray="1 1"
              />
              <rect x="420" y={getY(config.entryPrice) - 11} width="190" height="20" rx="4" fill="#0369a1" />
              <text x="428" y={getY(config.entryPrice) + 3} fill="#f0f9ff" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                🛡️ SL ADVANCED TO BREAKEVEN (+1 pip)
              </text>
            </g>
          )}

          {/* Render Candlesticks */}
          {visibleCandles.map((c, i) => {
            const openY = getY(c.open);
            const closeY = getY(c.close);
            const highY = getY(c.high);
            const lowY = getY(c.low);
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(3, Math.abs(closeY - openY));
            const candleColor = c.isGreen ? '#00E676' : '#FF1744';
            const strokeColor = c.isGreen ? '#00FF88' : '#FF5252';
            const isLast = i === visibleCandles.length - 1;

            return (
              <g key={i} className="animate-fadeIn">
                {/* Wicks */}
                <line x1={c.x} y1={highY} x2={c.x} y2={lowY} stroke={candleColor} strokeWidth="2.2" strokeLinecap="round" />
                {/* Body */}
                <rect 
                  x={c.x - 10} 
                  y={bodyTop} 
                  width="20" 
                  height={bodyHeight} 
                  rx="2" 
                  fill={candleColor}
                  stroke={strokeColor}
                  strokeWidth="1.2"
                  className={isLast ? (c.isGreen ? 'glow-bullish' : 'glow-bearish') : ''}
                />

                {/* Candle Badge Label */}
                {c.label && (
                  <g transform={`translate(${c.x}, ${lowY + 16})`}>
                    <rect x="-42" y="0" width="84" height="15" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                    <text x="0" y="11" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      {c.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Step 2 Trigger Marker Indicator */}
          {currentStep >= 2 && (
            <g transform="translate(310, 80)" className="animate-bounce">
              <circle cx="0" cy="0" r="14" fill="#059669" opacity="0.4" className="animate-ping" />
              <circle cx="0" cy="0" r="10" fill="#10b981" />
              <text x="0" y="3.5" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                BUY
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Actionable Phase Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SPOTTING */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase">
            <Compass className="w-3.5 h-3.5" />
            1. How to Spot
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {config.spottingSummary}
          </p>
        </div>

        {/* WHEN TO ENTER */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
            <ArrowRight className="w-3.5 h-3.5" />
            2. When to Enter
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {config.entryTriggerSummary}
          </p>
        </div>

        {/* STOP LOSS */}
        <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            3. Where to Anchor SL
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {config.stopLossRationale}
          </p>
        </div>

        {/* WHEN TO EXIT */}
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase">
            <Target className="w-3.5 h-3.5" />
            4. When to Exit (TP1 & TP2)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>TP1:</strong> {config.tp1Rationale}
          </p>
          <p className="text-[11px] text-emerald-400 pt-1 border-t border-slate-800">
            <strong>TP2:</strong> {config.tp2Rationale}
          </p>
        </div>
      </div>

      {/* Simulated Live Broker Execution Log */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-bold uppercase text-[10px] text-cyan-400">Order Execution Audit Trail</span>
          <span className="text-[10px]">Broker Fill Engine: Zero Slippage Mode</span>
        </div>
        <div className="space-y-1 text-[11px]">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-slate-600">[09:30:00]</span>
            <span>🔍 Opportunity Detected: Price approaching key discount level {config.entryPrice}.</span>
          </div>
          {currentStep >= 2 && (
            <div className="flex items-center gap-2 text-emerald-400 animate-fadeIn">
              <span className="text-slate-600">[09:45:00]</span>
              <span>🟢 BUY LIMIT EXECUTED: Position size 2.0 Lots @ {config.entryPrice}. Initial SL locked @ {config.stopLossPrice}.</span>
            </div>
          )}
          {currentStep >= 3 && (
            <div className="flex items-center gap-2 text-amber-300 animate-fadeIn">
              <span className="text-slate-600">[10:15:00]</span>
              <span>🛡️ Pullback Test: Price dipped into hazard zone but rejected cleanly. 1.5x ATR buffer saved position from premature stop-out.</span>
            </div>
          )}
          {currentStep >= 4 && (
            <div className="flex items-center gap-2 text-cyan-300 animate-fadeIn">
              <span className="text-slate-600">[11:00:00]</span>
              <span>🎯 TAKE PROFIT 1 HIT @ {config.tp1Price}: 50% Position Closed ($200 realized). Stop Loss advanced to Breakeven (+1 pip buffer). TRADE IS NOW RISK-FREE.</span>
            </div>
          )}
          {currentStep >= 5 && (
            <div className="flex items-center gap-2 text-emerald-300 font-bold animate-fadeIn">
              <span className="text-slate-600">[12:30:00]</span>
              <span>🏆 TAKE PROFIT 2 HIT @ {config.tp2Price}: Remaining 50% Position Closed ($360 realized). Total Profit: +$560 (+{config.riskReward}).</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
