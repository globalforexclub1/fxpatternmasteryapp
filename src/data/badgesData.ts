import type { UserBadge } from '../types.ts';

export const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Novice Chart Observer', minXp: 0, icon: 'Eye' },
  { level: 2, title: 'Candlestick Scout', minXp: 100, icon: 'Flame' },
  { level: 3, title: 'Classical Chart Architect', minXp: 250, icon: 'Triangle' },
  { level: 4, title: 'Confluence Master', minXp: 500, icon: 'Crosshair' },
  { level: 5, title: 'Market Operator', minXp: 900, icon: 'ShieldCheck' },
  { level: 6, title: 'Institutional Elite', minXp: 1500, icon: 'Crown' }
];

export const MILESTONE_BADGES: UserBadge[] = [
  {
    id: 'first-steps',
    name: 'First Steps in Technicals',
    title: 'First Steps in Technicals',
    description: 'Began the trading mastery journey by learning candlestick basics.',
    icon: '🌱',
    xpReward: 25,
    criteria: 'Study your first candlestick pattern'
  },
  {
    id: 'candlestick-scholar',
    name: 'Candlestick Scholar',
    title: 'Candlestick Scholar',
    description: 'Explored single, dual, and triple Japanese candlestick reversal structures.',
    icon: '🕯️',
    xpReward: 50,
    criteria: 'Master at least 5 candlestick patterns'
  },
  {
    id: 'chart-architect',
    name: 'Classical Chart Architect',
    title: 'Classical Chart Architect',
    description: 'Mastered triangles, flags, head & shoulders, and wedges.',
    icon: '📐',
    xpReward: 75,
    criteria: 'Master at least 6 chart patterns'
  },
  {
    id: 'trendline-sniper',
    name: 'Trendline Sniper',
    title: 'Trendline Sniper',
    description: 'Validated the "Rule of Two" taps and parallel price channels.',
    icon: '🎯',
    xpReward: 50,
    criteria: 'Complete the Trendlines Masterclass module'
  },
  {
    id: 'divergence-decoder',
    name: 'Divergence Decoder',
    title: 'Divergence Decoder',
    description: 'Identified all 4 types of Regular and Hidden RSI Divergences.',
    icon: '⚡',
    xpReward: 60,
    criteria: 'Study the 4 RSI Divergence types'
  },
  {
    id: 'ema-commander',
    name: '4EMA Commander',
    title: '4EMA Commander',
    description: 'Learned the 8, 12, 21, and 55 EMA alignment and dynamic support/resistance.',
    icon: '🌊',
    xpReward: 50,
    criteria: 'Complete the 4EMA Trend Indicator study'
  },
  {
    id: 'math-tactician',
    name: 'Precision Position Sizer',
    title: 'Precision Position Sizer',
    description: 'Applied the 1-2% capital preservation formula: (Capital × Risk%) / Stop Loss%.',
    icon: '🧮',
    xpReward: 50,
    criteria: 'Calculate position size in the Position Calculator'
  },
  {
    id: 'boat-a-captain',
    name: 'Boat A Life Jacket Captain',
    title: 'Boat A Life Jacket Captain',
    description: 'Internalized Bernard Baruch\'s wisdom and simulated positive 30-trade expectancy.',
    icon: '🛟',
    xpReward: 50,
    criteria: 'Run the 30-Trade Positive Expectancy simulator'
  },
  {
    id: 'zen-trader',
    name: 'Zen Mindset Auditor',
    title: 'Zen Mindset Auditor',
    description: 'Conquered the 7 deadly trading emotions and passed the pre-trade checklist.',
    icon: '🧘',
    xpReward: 50,
    criteria: 'Pass the Pre-Trade Psychological Audit'
  },
  {
    id: 'quiz-ace',
    name: 'Technical Analysis Ace',
    title: 'Technical Analysis Ace',
    description: 'Demonstrated superior knowledge across all curriculum topics in the Quiz Arena.',
    icon: '🏆',
    xpReward: 100,
    criteria: 'Score 5 correct answers in the Quiz Arena'
  }
];

export const TRADER_LEVELS = LEVEL_THRESHOLDS;
