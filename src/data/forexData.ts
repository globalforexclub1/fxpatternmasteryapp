import { ForexSessionInfo, ForexPairProfile } from '../types.ts';

export interface ForexInstitutionalPattern {
  id: string;
  name: string;
  bias: 'bullish' | 'bearish' | 'either';
  subtitle: string;
  category: 'candlestick' | 'structure' | 'liquidity';
  svgType: string;
  description: string;
  institutionalLogic: string;
  entryRule: string;
  stopLossRule: string;
  targetRule: string;
  institutionalNote: string;
  characteristics: string[];
}

export const FOREX_SESSIONS: ForexSessionInfo[] = [
  {
    id: 'asian',
    name: 'Asian Session (Tokyo & Sydney)',
    city: 'Tokyo / Sydney',
    timeGmt: '00:00 - 08:00 GMT',
    volatility: 'low',
    activePairs: ['USD/JPY', 'AUD/USD', 'NZD/USD', 'EUR/JPY'],
    characteristics: [
      'Accounts for ~18% of global daily forex turnover',
      'Typically consolidates into tight horizontal ranges (Asian Range)',
      'Institutions often use this low volatility period to build initial positions',
      'Highs and Lows of this session commonly serve as liquidity benchmarks for London & NY'
    ],
    sessionRule: 'Educational suggestion: Interbank desks frequently treat Asian High/Low as liquidity targets. It is often prudent to avoid trading range breakouts during the Asian session without high-impact catalysts.'
  },
  {
    id: 'london',
    name: 'London Open & Session',
    city: 'London / Frankfurt',
    timeGmt: '08:00 - 16:00 GMT',
    volatility: 'high',
    activePairs: ['EUR/USD', 'GBP/USD', 'EUR/GBP', 'GBP/JPY', 'USD/ZAR'],
    characteristics: [
      'Accounts for over 38% of all global foreign exchange volume',
      'London Open (07:00-09:00 GMT) creates the classic liquidity sweep (initial false move)',
      'Establishes the true high or low of the daily trading candle in ~70% of days',
      'Tightest spreads and highest institutional market depth'
    ],
    sessionRule: 'Educational suggestion: Observe how London often tests the Asian session extreme, prints a reversal rejection candle, and then sets the primary directional trend for study.'
  },
  {
    id: 'new-york',
    name: 'New York Session',
    city: 'New York',
    timeGmt: '13:00 - 21:00 GMT',
    volatility: 'high',
    activePairs: ['EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CAD', 'XAU/USD'],
    characteristics: [
      'Second highest volume hub (~19% of global forex volume)',
      'US economic data releases (NFP, CPI, Fed FOMC, Retail Sales) hit between 12:30-14:00 GMT',
      'Heavy institutional rebalancing by major commercial banks and funds'
    ],
    sessionRule: 'Educational suggestion: It is considered prudent risk practice to avoid new entries immediately surrounding tier-1 US economic releases due to potential spread widening and slippage.'
  },
  {
    id: 'overlap',
    name: 'London / New York Overlap (The Peak Window)',
    city: 'London + New York',
    timeGmt: '13:00 - 16:00 GMT',
    volatility: 'peak',
    activePairs: ['EUR/USD', 'GBP/USD', 'XAU/USD', 'USD/ZAR', 'USD/JPY'],
    characteristics: [
      'The single most liquid and volatile window in global forex (>55% of global turnover)',
      'Optimal window for studying trend continuation and momentum models',
      'Narrowest spreads across major global currency pairs'
    ],
    sessionRule: 'Educational suggestion: High volume and liquidity during this 3-hour overlap make technical setups more consistent for academic observation.'
  },
  {
    id: 'rollover',
    name: 'Daily Bank Rollover & Swap Window',
    city: 'Global Settlement',
    timeGmt: '21:00 - 22:00 GMT (5:00 PM EST)',
    volatility: 'low',
    activePairs: ['ALL PAIRS (Spread Spikes)'],
    characteristics: [
      'Interbank desks reset settlement dates and swap financing is calculated',
      'Liquidity temporarily reduces on electronic order books',
      'Spreads on emerging market pairs like USD/ZAR can widen significantly; major pairs also widen'
    ],
    sessionRule: 'Educational warning: Tight stops are vulnerable to widened bid/ask spreads during rollover hours without actual price displacement.'
  }
];

export const FOREX_PAIRS: ForexPairProfile[] = [
  {
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar ("Fiber")',
    category: 'major',
    typicalSpreadPips: 0.8,
    pipDigits: 4,
    baseAsset: 'EUR',
    quoteAsset: 'USD',
    description: 'The world\'s most liquid currency pair. Represents the two largest economic blocs.',
    marketInsight: 'Respects technical support, resistance, 4EMA ribbons, and fair value gaps cleanly. Standard lot (1.0) = $10.00 per pip.'
  },
  {
    symbol: 'GBP/USD',
    name: 'British Pound / US Dollar ("Cable")',
    category: 'major',
    typicalSpreadPips: 1.2,
    pipDigits: 4,
    baseAsset: 'GBP',
    quoteAsset: 'USD',
    description: 'Volatile major with wide daily Average True Range (ATR 80-120 pips).',
    marketInsight: 'Frequently experiences deep liquidity sweeps before reversals. Educational models suggest wider stop buffers than on EUR/USD.'
  },
  {
    symbol: 'USD/JPY',
    name: 'US Dollar / Japanese Yen ("Ninja")',
    category: 'major',
    typicalSpreadPips: 1.0,
    pipDigits: 2,
    baseAsset: 'USD',
    quoteAsset: 'JPY',
    description: 'Major safe-haven barometer. Very sensitive to US Treasury yields and central bank policy.',
    marketInsight: 'Pip is measured at the 2nd decimal place (0.01). Clear trending tendencies during Asian and early NY sessions.'
  },
  {
    symbol: 'GBP/JPY',
    name: 'British Pound / Japanese Yen ("The Cross")',
    category: 'cross',
    typicalSpreadPips: 1.8,
    pipDigits: 2,
    baseAsset: 'GBP',
    quoteAsset: 'JPY',
    description: 'High volatility cross pair (ATR 120-200 pips). High movement potential and high risk.',
    marketInsight: 'Due to elevated volatility, educational risk models suggest strictly reduced lot sizes and wider structural invalidation levels.'
  },
  {
    symbol: 'XAU/USD',
    name: 'Gold / US Dollar',
    category: 'major',
    typicalSpreadPips: 2.5,
    pipDigits: 2,
    baseAsset: 'XAU (100 oz)',
    quoteAsset: 'USD',
    description: 'The premier global monetary commodity and safe-haven asset. Clean technical trend adherence.',
    marketInsight: 'Each $1.00 move on 1.0 standard lot = $100.00 P&L. Risk models recommend conservative lot sizing and waiting for clear candlestick confirmation.'
  },
  {
    symbol: 'USD/ZAR',
    name: 'US Dollar / South African Rand (Emerging Markets FX)',
    category: 'emerging',
    typicalSpreadPips: 28.0,
    pipDigits: 4,
    baseAsset: 'USD',
    quoteAsset: 'ZAR',
    description: 'Key benchmark currency pair for African emerging market trade and institutional capital flows.',
    marketInsight: 'Highly sensitive to commodity cycles (Gold, Platinum), South African Reserve Bank (SARB) policy, and global USD risk sentiment. Typical broker spreads are wider (20-40 pips). Scalping stops are statistically vulnerable.'
  }
];

export const FOREX_INSTITUTIONAL_PATTERNS: ForexInstitutionalPattern[] = [
  {
    id: 'pin-bar',
    name: 'Forex Pin Bar (Rejection Wick / Liquidity Rejection)',
    bias: 'either',
    subtitle: 'Price Action Rejection & Liquidity Absorption Model',
    category: 'candlestick',
    svgType: 'pin-bar',
    description: 'A single candlestick characterized by a long tail/wick (at least 2/3 of the entire candle length) and a compact body situated at one extreme end.',
    institutionalLogic: 'Price tests liquidity pools beyond key swing highs or lows, where resting limit orders absorb aggressive market orders, snapping price back within range.',
    entryRule: 'Educational suggestion: Observe entry on the break of the candle nose or a 50% retracement of the long rejection shadow.',
    stopLossRule: 'Suggested risk anchor: 5-10 pips plus ATR buffer beyond the extreme tip of the rejection wick.',
    targetRule: 'Suggested target: Opposite liquidity pool or major support/resistance boundary (e.g. 1:2.5+ R:R model).',
    institutionalNote: 'A Pin Bar isolated in mid-range has lower probability; when aligned with dynamic 21 EMA or session extremes, technical confluence is significantly higher.',
    characteristics: [
      'Tail/wick spans at least 66% (two-thirds) of total candle range',
      'Small real body situated at the opposing extreme tip',
      'The wick protrudes visibly beyond surrounding price structure',
      'Volume expansion during rejection indicates strong absorption'
    ]
  },
  {
    id: 'tweezer-tops-bottoms',
    name: 'Tweezer Tops & Tweezer Bottoms',
    bias: 'either',
    subtitle: 'Dual-Candle Matching Extremes Rejection',
    category: 'candlestick',
    svgType: 'tweezer-tops-bottoms',
    description: 'A two-candle reversal formation where two consecutive candles reach identical highs (Tweezer Top) or identical lows (Tweezer Bottom) with prominent rejection shadows.',
    institutionalLogic: 'Indicates a well-defended price ceiling or floor. Price tested the level twice and failed to hold beyond it, suggesting potential trend exhaustion.',
    entryRule: 'Educational suggestion: Consider entry upon the confirmed close of the second candle validating rejection.',
    stopLossRule: 'Suggested risk anchor: Placed beyond the matching highs (Tops) or lows (Bottoms).',
    targetRule: 'Suggested target: Next support zone or 2EMA dynamic baseline.',
    institutionalNote: 'Effective for study on 1H and 4H timeframes at key psychological round numbers (e.g., 1.0800 on EUR/USD or 18.00 on USD/ZAR).',
    characteristics: [
      'Two consecutive candles with matching or nearly matching extremes',
      'First candle follows current trend; second candle displays counter-pressure',
      'Matching wicks highlight buyer or seller barrier'
    ]
  },
  {
    id: 'inside-bar',
    name: 'Inside Bar (Volatility Contraction & Expansion)',
    bias: 'either',
    subtitle: 'Consolidation Preceding Directional Expansion',
    category: 'candlestick',
    svgType: 'inside-bar',
    description: 'A two-candle formation where the entire range of the second candle is engulfed within the range of the preceding "Mother Bar".',
    institutionalLogic: 'Reflects temporary equilibrium and volatility compression before market participants trigger an expansion impulse.',
    entryRule: 'Educational suggestion: Observe breakout above Mother Bar high or breakdown below Mother Bar low.',
    stopLossRule: 'Suggested risk anchor: Placed at the opposite boundary or midpoint of the Mother Bar.',
    targetRule: 'Suggested target: Measure the vertical height of the Mother Bar and project from the breakout point.',
    institutionalNote: 'On daily charts of major pairs or equities, an inside bar breakout often introduces multi-session directional follow-through.',
    characteristics: [
      'Second candle high is lower than Mother Bar high',
      'Second candle low is higher than Mother Bar low',
      'Signals pause before potential trend continuation or reversal'
    ]
  },
  {
    id: 'fair-value-gap',
    name: 'Fair Value Gap (FVG / Imbalance)',
    bias: 'either',
    subtitle: '3-Candle Institutional Liquidity Imbalance',
    category: 'structure',
    svgType: 'fair-value-gap',
    description: 'A 3-candle sequence where Candle 2 displaces with such momentum that Candle 1\'s extreme does not touch Candle 3\'s extreme, leaving an unfilled price pocket.',
    institutionalLogic: 'Aggressive order flow created a one-sided liquidity vacuum. Algorithmic delivery models frequently re-auction price back to fill this gap before continuing.',
    entryRule: 'Educational suggestion: Watch for potential retests at the boundary or 50% Consequent Encroachment (CE) of the gap.',
    stopLossRule: 'Suggested risk anchor: Positioned just beyond the outer boundary of Candle 1.',
    targetRule: 'Suggested target: Prior swing high/low liquidity.',
    institutionalNote: 'FVGs frequently act as dynamic support/resistance pockets where price exhibits quick rejection reactions.',
    characteristics: [
      'Candle 1: Preceding structural candle',
      'Candle 2: Wide-range displacement candle',
      'Candle 3: Leaves open vertical space between Candle 1 and Candle 3 wicks'
    ]
  },
  {
    id: 'liquidity-sweep',
    name: 'Liquidity Sweep (False Breakout Rejection)',
    bias: 'either',
    subtitle: 'Stop-Hunt Mechanism Above Equal Highs or Range Boundaries',
    category: 'liquidity',
    svgType: 'liquidity-sweep',
    description: 'Price briefly pierces above obvious swing highs or below swing lows to trigger resting breakout orders, then promptly re-enters the prior trading range.',
    institutionalLogic: 'Large market participants require counterpart liquidity to execute sizable positions. Piercing obvious levels triggers stop-loss orders that provide that required counter-liquidity.',
    entryRule: 'Educational suggestion: Observe entry when price closes back inside the previous boundary after sweeping liquidity.',
    stopLossRule: 'Suggested risk anchor: Placed beyond the extreme sweep wick tip.',
    targetRule: 'Suggested target: The opposing boundary of the trading range.',
    institutionalNote: 'Frequently observed around session opens (such as London Open 07:00-08:30 GMT) across major currency pairs.',
    characteristics: [
      'Briefly breaches a prominent level by several pips',
      'Fails to establish accepted value outside the range',
      'Leaves a pronounced wick demonstrating rejection of the breakout'
    ]
  },
  {
    id: 'order-block',
    name: 'Order Block (OB / Institutional Footprint)',
    bias: 'either',
    subtitle: 'Origin Candle of an Aggressive Market Displacement',
    category: 'structure',
    svgType: 'order-block',
    description: 'The last opposing candle before a strong directional price run that breaks structure.',
    institutionalLogic: 'Substantial buying or selling entered the market at this level. When price returns, institutional orders may defend the origin zone.',
    entryRule: 'Educational suggestion: Monitor for potential entries upon retest of the Order Block body or 50% midpoint.',
    stopLossRule: 'Suggested risk anchor: Placed beyond the extreme wick of the Order Block candle.',
    targetRule: 'Suggested target: Opposing swing liquidity or higher timeframe structural levels.',
    institutionalNote: 'Order Blocks illustrate why support and resistance operate as zones rather than single razor-thin lines.',
    characteristics: [
      'Precedes a strong displacement that creates an FVG or breaks market structure',
      'Shows elevated volume signature confirming institutional participation',
      'Acts as a potential high-probability reaction zone on the initial return test'
    ]
  },
  {
    id: 'quasimodo',
    name: 'Quasimodo Pattern (Structural Reversal Model)',
    bias: 'either',
    subtitle: 'Asymmetrical Structural Shift Pattern',
    category: 'structure',
    svgType: 'quasimodo',
    description: 'In a Bearish QM: Price makes High (Left Shoulder), Low, Higher High (Head), then breaks structure to a Lower Low. Entry is observed on the return to the Left Shoulder level.',
    institutionalLogic: 'The Higher High induces breakout participants before the market reverses aggressively, breaking structure. The return to the Left Shoulder level offers a re-entry zone with well-defined risk.',
    entryRule: 'Educational suggestion: Watch for reaction at the horizontal level of the Left Shoulder.',
    stopLossRule: 'Suggested risk anchor: Placed above the highest peak (Head) or with a defined buffer above the Left Shoulder.',
    targetRule: 'Suggested target: The newly formed structural low and subsequent liquidity levels.',
    institutionalNote: 'Quasimodo models often present favorable theoretical risk-to-reward ratios due to the proximity of the structural invalidation point.',
    characteristics: [
      'Sequence: High -> Low -> Higher High -> Lower Low (Break of Structure)',
      'Entry is studied on the return retest of the Left Shoulder plane',
      'Provides a disciplined, asymmetric risk model for study'
    ]
  }
];

export const FOREX_HAZARDS_AND_RULES = [
  {
    title: 'The Spread & Slippage Factor',
    severity: 'critical',
    rule: 'Educational rule: Always factor the bid-ask spread into simulated entries and stop placements.',
    explanation: 'Market buy orders execute at the Ask (higher) price, and short stop-losses trigger when the Ask touches the order level. On pairs with wider spreads such as USD/ZAR (20-40 pips), ignoring the spread often leads to premature invalidation.',
    actionItem: 'Educational guideline: Consider keeping stop distance at least 3x the average pair spread to absorb market noise.'
  },
  {
    title: 'High-Impact Economic News Releases',
    severity: 'critical',
    rule: 'Educational rule: High-impact economic announcements introduce extreme volatility and spread expansion.',
    explanation: 'During events like US Non-Farm Payrolls, CPI, or central bank interest rate decisions, liquidity providers may widen quotes temporarily. Slippage can occur where orders fill away from the specified level.',
    actionItem: 'Educational guideline: Review economic calendars and consider avoiding active market exposure during tier-1 data releases.'
  },
  {
    title: 'Leverage & Position Sizing Discipline',
    severity: 'critical',
    rule: 'Educational rule: Calculate lot sizing strictly from dollar risk, never from maximum margin.',
    explanation: 'Brokers offer high leverage (1:100 to 1:500). High leverage increases risk proportionally. An oversized lot on a small balance can cause rapid capital depletion on normal market fluctuations.',
    actionItem: 'Educational guideline: Apply the 1% to 2% capital preservation formula: Capital ($) × Risk% / Stop Distance ($).'
  },
  {
    title: 'The Daily Bank Rollover Spread Expansion',
    severity: 'warning',
    rule: 'Educational rule: Be aware of widened spreads during the 21:00-22:00 GMT bank rollover window.',
    explanation: 'Between the New York close and Asian open, liquidity drops as daily swaps are settled. Spreads widen automatically across currency pairs.',
    actionItem: 'Educational guideline: Allow for spread buffer adjustments if holding swing setups through the daily rollover.'
  },
  {
    title: 'Emotional Defense & Psychological Capital',
    severity: 'warning',
    rule: 'Educational rule: Preserve mental capital and avoid impulsive revenge trades after losses.',
    explanation: 'Losses are an inherent aspect of technical analysis probability. Experiencing emotional frustration often leads to over-sizing or deviating from a structured trading plan.',
    actionItem: 'Educational guideline: Take a structured break after consecutive adverse outcomes to reset objectivity.'
  }
];

