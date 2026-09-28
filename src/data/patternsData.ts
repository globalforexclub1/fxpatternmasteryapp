import type { CandlestickPattern, ChartPattern } from '../types.ts';

export const CANDLESTICK_PATTERNS: CandlestickPattern[] = [
  {
    id: 'spinning-top',
    name: 'Spinning Top Candlestick',
    category: 'single-candle',
    bias: 'neutral',
    subtitle: 'Market Indecision & Potential Reversal Alert',
    characteristics: [
      'Small real body situated centrally between shadows',
      'Long upper shadow and long lower shadow of roughly equal length',
      'Can appear as Bullish (Green) or Bearish (Red) Spinning Top'
    ],
    interpretation: 'Indecision between buyers and sellers. Interpretation: Reversal when appearing at the end of an extended trend.',
    foundIn: 'any',
    keyRequirements: [
      'Market must be in an established trend prior to formation',
      'Small real body relative to long upper & lower wicks',
      'Needs confirmation candle in the reversal direction'
    ],
    entryPoint: 'Enter on the break of the spinning top high (for bullish reversal) or low (for bearish reversal) confirmed by the next candle.',
    stopLoss: 'Placed just beyond the opposite extreme wick (above high for short, below low for long).',
    takeProfitTarget: 'Next major key support or resistance level or a minimum 2R risk/reward ratio.',
    slideNotes: 'Indecision. Interpretation: reversal. Shows equilibrium where neither bulls nor bears could maintain dominance.',
    difficulty: 'beginner',
    svgType: 'spinning-top'
  },
  {
    id: 'marubozu',
    name: 'Marubozu Candlestick Pattern',
    category: 'single-candle',
    bias: 'either',
    subtitle: 'Total Market Dominance & Strong Momentum',
    characteristics: [
      'Extremely long solid body with almost NO shadows/wicks',
      'Bullish Marubozu opens at low and closes at high',
      'Bearish Marubozu opens at high and closes at low',
      'Marubozu literally translates to "dominance"'
    ],
    interpretation: 'Marubozu means dominance. Long body almost no shadows. Interpretation: reversal or continuation of trend.',
    foundIn: 'any',
    keyRequirements: [
      'Very long body with virtually zero wicks',
      'If in downtrend and Marubozu appears: buyers are optimistic and sellers have left resistance -> Trend is about to change',
      'If in downtrend and Bearish MB appears: continuation is about to happen (and vice-versa in uptrend)'
    ],
    entryPoint: 'Enter immediately upon candle close or on a brief 25%-38.2% Fibonacci retracement of the Marubozu body.',
    stopLoss: 'Below the low of the Bullish Marubozu (for buys) or above the high of the Bearish Marubozu (for sells).',
    takeProfitTarget: 'Measured move of at least the Marubozu height or key structural zone (minimum 2R-3R).',
    slideNotes: 'If market is in downtrend and marubozo appears, buyers are optimistic and sellers have left resistance. A trend is about to change. If in downtrend and MB appears, continuation is about to happen. And vice versa.',
    difficulty: 'beginner',
    svgType: 'marubozu'
  },
  {
    id: 'doji',
    name: 'Doji Candlestick Pattern',
    category: 'single-candle',
    bias: 'neutral',
    subtitle: 'Classic, Gravestone & Dragonfly Doji Variants',
    characteristics: [
      'Long shadows, virtually NO body (Open price equals or almost equals Close price)',
      '3 Major Types: 1) Typical Classic Doji, 2) Gravestone Doji (long upper shadow), 3) Dragonfly Doji (long lower shadow)',
      'Confusion and balance of power between buyers and sellers'
    ],
    interpretation: 'Long shadows, no body. Confusion between buyers and sellers. Interpretation: Trend Reversal. IT DOES NOT WORK IN SIDEWAYS MARKET.',
    foundIn: 'any',
    keyRequirements: [
      'Market must be actively TRENDING! Does not work when market is consolidating',
      'Typical = war between buyers and sellers where neither side could win',
      'Must wait for next candle close confirmation before trade entry'
    ],
    entryPoint: 'Wait for confirmation candle breaking the Doji high (bullish) or Doji low (bearish). Dragonfly enters long; Gravestone enters short.',
    stopLoss: 'Beyond the extreme wick of the Doji (above high for Gravestone, below low for Dragonfly).',
    takeProfitTarget: 'Next major horizontal structure or trendline confluence (2R+ target).',
    slideNotes: 'Typical = war against buyers and sellers. They do not know what or not to do. Doesn\'t work when market is consolidating. Market must be trending.',
    difficulty: 'beginner',
    svgType: 'doji'
  },
  {
    id: 'hammer',
    name: 'Hammer Candlestick Pattern',
    category: 'single-candle',
    bias: 'bullish',
    subtitle: 'Powerful Bullish Reversal at Trend Bottoms',
    characteristics: [
      'Short compact body near the top of the price range',
      'Long lower wick at least 2 to 3 times the size of the body',
      'Virtually no upper shadow',
      'Does not matter whether candle is bullish (green) or bearish (red)'
    ],
    interpretation: 'Short body, long lower wick. FOUND IN DOWNTREND. Interpretation: BULLISH REVERSAL. Doesn\'t matter if candle is bullish or bearish.',
    foundIn: 'downtrend',
    keyRequirements: [
      'Must be preceded by a clear, sustained downtrend',
      'Lower shadow must be at least twice as long as the real body',
      'Shows sellers pushed price hard down, but aggressive buyers stepped in and rejected the lows'
    ],
    entryPoint: 'Buy on the break of the hammer high, or enter on the open of the subsequent confirmation bullish candle.',
    stopLoss: 'Placed 2-5 pips below the lowest wick of the hammer.',
    takeProfitTarget: 'Previous swing high, key resistance level, or 2R-3R target.',
    slideNotes: 'Short body, Long lower wick. FOUND IN DOWNTREND. Interpretation: BULLISH REVERSAL. Doesn\'t matter if candle is bullish or bearish.',
    difficulty: 'beginner',
    svgType: 'hammer'
  },
  {
    id: 'hanging-man',
    name: 'Hanging Man Candlestick Pattern',
    category: 'single-candle',
    bias: 'bearish',
    subtitle: 'Warning Signal at the Top of an Uptrend',
    characteristics: [
      'Short body near the top of the range with long lower wick',
      'FOUND IN UPTREND (identical physical appearance to hammer, but opposite location)',
      'Can be green or red (red has slightly higher bearish conviction)'
    ],
    interpretation: 'SHORT BODY, LONG WICKS. FOUND IN UPTREND. Interpretation: BEARISH REVERSAL.',
    foundIn: 'uptrend',
    keyRequirements: [
      'Must form at the peak of a defined uptrend or resistance level',
      'Long lower wick demonstrates that heavy selling pressure entered the market during the session',
      'Requires a bearish confirmation candle closing below the hanging man body'
    ],
    entryPoint: 'Enter short once the low of the Hanging Man is violated by the subsequent candle.',
    stopLoss: 'Placed safely above the high of the Hanging Man.',
    takeProfitTarget: 'Support level, rising trendline, or 2.5R target.',
    slideNotes: 'SHORT BODY, LONG WICKS. FOUND IN UPTREND. Interpretation: BEARISH REVERSAL.',
    difficulty: 'beginner',
    svgType: 'hanging-man'
  },
  {
    id: 'shooting-star',
    name: 'Shooting Star Candlestick Pattern',
    category: 'single-candle',
    bias: 'bearish',
    subtitle: 'Bullish Rejection at Major Resistance Peaks',
    characteristics: [
      'Short body near the bottom of the range',
      'Long upper wick at least 2 times the length of the body',
      'Very little to no lower shadow',
      'FOUND IN UPTRENDS'
    ],
    interpretation: 'SHORT BODY, LONG WICKS. FOUND IN UPTRENDS. Interpretation: BEARISHTREND REVERSAL.',
    foundIn: 'uptrend',
    keyRequirements: [
      'Occurs at the end of an uptrend',
      'Buyers tried to push price up, but sellers completely overwhelmed them and forced price back down to the open',
      'Confirmed by subsequent red candle'
    ],
    entryPoint: 'Sell short on breakdown beneath the Shooting Star low.',
    stopLoss: 'Placed 1-2 ATR or just above the high of the long upper wick.',
    takeProfitTarget: 'Previous swing lows, dynamic 21/55 EMA support, or 3R target.',
    slideNotes: 'SHORT BODY, LONG WICKS. FOUND IN UPTRENDS. Interpretation: BEARISHTREND REVERSAL.',
    difficulty: 'beginner',
    svgType: 'shooting-star'
  },
  {
    id: 'bullish-engulfing',
    name: 'Bullish Engulfing Candlestick',
    category: 'dual-candle',
    bias: 'bullish',
    subtitle: 'Bulls Overwhelm Bears in 2-Candle Reversal',
    characteristics: [
      '2 candlestick pattern',
      'First candle is bearish (red)',
      'Second candle is a large bullish (green) candle whose real body completely engulfs the prior bearish body',
      'Found in a downtrend'
    ],
    interpretation: '2 candle stick pattern. The bullish candle fully engulfs bearish candle. Found in downtrend. Interpretation: beginning of bullish trend.',
    foundIn: 'downtrend',
    keyRequirements: [
      'It needs two candlesticks to be valid',
      '1) The market must be in a downtrend',
      '2) The bullish candle must fully engulf the previous bearish candle body',
      'The buyers have turned optimistic and taken command of the market'
    ],
    entryPoint: 'Enter long on the close of the engulfing candle or on a retest of its 50% midpoint.',
    stopLoss: 'Placed right below the lowest point of the 2-candle structure.',
    takeProfitTarget: 'Next resistance level or previous lower high in the downtrend (target 3R+).',
    slideNotes: 'It Needs two Candlesticks to be valid. The Buyers have turned optimistic. Key requirement is: 1) Market must be in a downtrend, 2) Bullish candle must fully engulf the previous bearish candle.',
    difficulty: 'intermediate',
    svgType: 'bullish-engulfing'
  },
  {
    id: 'bearish-engulfing',
    name: 'Bearish Engulfing Candlestick Pattern',
    category: 'dual-candle',
    bias: 'bearish',
    subtitle: 'Sellers Seize Total Control at Trend Peaks',
    characteristics: [
      '2 candle stick pattern',
      'The first candle is bullish (green), the second one is bearish (red)',
      'The red candle completely engulfs the real body of the first green candle',
      'Found in an uptrend'
    ],
    interpretation: '2 candle stick pattern. The first candle is bullish, the second one is bearish. Found in uptrend. Interpretation: beginning of bearish trend.',
    foundIn: 'uptrend',
    keyRequirements: [
      'Market must be in an established uptrend',
      'Bearish candle opens at or above prior close and closes well below prior open',
      'High volume on the engulfing candle adds substantial confluence'
    ],
    entryPoint: 'Enter short on the close of the bearish engulfing candle.',
    stopLoss: 'Above the highest wick of the 2-candle formation.',
    takeProfitTarget: 'Next major horizontal support zone or key trendline.',
    slideNotes: '2 candle stick pattern. The first candle is bullish, the second one is bearish. Found in uptrend. Interpretation: beginning of bearish trend.',
    difficulty: 'intermediate',
    svgType: 'bearish-engulfing'
  },
  {
    id: 'three-white-soldiers',
    name: 'Three White Soldiers Candlestick',
    category: 'triple-candle',
    bias: 'bullish',
    subtitle: 'Unstoppable 3-Bar Bullish Trend Reversal',
    characteristics: [
      '3 candle stick pattern',
      '1st candle is bullish',
      '2nd candle is bullish and bigger than the first candle',
      '3rd candle is bullish, with no or small upper shadow (strong close near high)',
      'Found after a downtrend'
    ],
    interpretation: '3 candle stick pattern. Found after downtrend. Interpretation: Very powerful bullish trend reversal pattern.',
    foundIn: 'downtrend',
    keyRequirements: [
      'All three consecutive candles must be strong green/bullish candles',
      'Each candle opens within or near the previous candle\'s real body and closes at a new high',
      'Third candle must demonstrate strong conviction with minimal upper shadow'
    ],
    entryPoint: 'Enter long on the close of the 3rd soldier or on a pullback towards the high of the 2nd candle.',
    stopLoss: 'Below the low of the 1st soldier or below the base of the reversal structure.',
    takeProfitTarget: 'Major resistance levels; this pattern often initiates prolonged multi-week upward trends.',
    slideNotes: '1st candle bullish, 2nd candle bullish, bigger than first candle, 3rd candle bullish, with no or small upper shadow. Found after downtrend. Interpretation: Very powerful bullish trend reversal pattern.',
    difficulty: 'intermediate',
    svgType: 'three-white-soldiers'
  },
  {
    id: 'three-black-crows',
    name: 'Three Black Crows Candlestick',
    category: 'triple-candle',
    bias: 'bearish',
    subtitle: 'Relentless 3-Bar Bearish Trend Reversal',
    characteristics: [
      '3 candle stick pattern',
      '1st candle is bearish',
      '2nd candle is bearish and bigger than the first candle',
      '3rd big bearish candle with small or no lower wick',
      'Found in an uptrend'
    ],
    interpretation: '3 candle stick pattern. Found in uptrend. Interpretation: Bearish trend reversal.',
    foundIn: 'uptrend',
    keyRequirements: [
      'Three consecutive large red candles at the top of an uptrend',
      'Each candle opens within the body of the previous candle and closes at a new low',
      'Small or non-existent lower shadows show aggressive selling right into the close'
    ],
    entryPoint: 'Enter short upon close of the 3rd crow or on a small retracement into candle #2 body.',
    stopLoss: 'Placed safely above the high of the 1st crow.',
    takeProfitTarget: 'Major support levels or multi-target scaling (2R, 3R, 5R).',
    slideNotes: '1st candle is bearish, 2nd candle is bearish and bigger than first candle. 3rd big bearish candle with small or no lower wick. Found in uptrend. Interpretation: Bearish trend reversal.',
    difficulty: 'intermediate',
    svgType: 'three-black-crows'
  },
  {
    id: 'morning-star',
    name: 'Morning Star Candlestick',
    category: 'triple-candle',
    bias: 'bullish',
    subtitle: 'Premier 3-Candle Bottom Reversal Signal',
    characteristics: [
      '3 candlestick pattern',
      '1st candle must be Bearish (large red body)',
      '2nd candle is small (bearish/bullish doesn\'t matter, showing indecision/star)',
      '3rd candle must be Bullish (closes deeply inside the first candle body)',
      'Formed in a downtrend'
    ],
    interpretation: 'Formed in downtrend. Interpretation: Bullish reversal candle, Beginning of new trend. 2nd candle can be bullish or bearish doesn\'t matter.',
    foundIn: 'downtrend',
    keyRequirements: [
      'Clear preceding downtrend',
      'First candle is solid bearish confirming existing downtrend momentum',
      'Second candle shows exhaustion of selling pressure (small body, color irrelevant)',
      'Third candle surges upward, penetrating at least 50% into the first candle body'
    ],
    entryPoint: 'Buy at the close of the 3rd bullish candle.',
    stopLoss: 'Just below the lowest point of the middle star candle.',
    takeProfitTarget: 'Previous swing highs or major trendline resistance (3R+).',
    slideNotes: '1st candle must be Bearish, 2nd candle is bearish/bullish doesn\'t matter, 3rd candle must be Bullish. Formed in downtrend. Interpretation: Bullish reversal candle, Beginning of new trend.',
    difficulty: 'intermediate',
    svgType: 'morning-star'
  },
  {
    id: 'evening-star',
    name: 'Evening Star Candlestick',
    category: 'triple-candle',
    bias: 'bearish',
    subtitle: 'Premier 3-Candle Top Reversal Signal',
    characteristics: [
      '3 candlestick pattern',
      '1st candle must be Bullish (strong green body)',
      '2nd candle is small (bearish/bullish doesn\'t matter, showing exhaustion at the peak)',
      '3rd candle must be Bearish (closes deeply into the first candle body)',
      'Formed in an uptrend'
    ],
    interpretation: 'Formed in Uptrend. Interpretation: Bearish reversal candle, Beginning of new trend.',
    foundIn: 'uptrend',
    keyRequirements: [
      'Forms at the crest of an uptrend',
      'Middle candle represents hesitation and momentum loss (color doesn\'t matter)',
      'Third candle must close significantly below the midpoint of the first bullish candle'
    ],
    entryPoint: 'Enter short upon the close of the 3rd candle.',
    stopLoss: 'Above the peak of the middle candle.',
    takeProfitTarget: 'Support confluence, key swing low, or 3R target.',
    slideNotes: '1st candle must be Bullish, 2nd candle is bearish/bullish doesn\'t matter, 3rd candle must be Bearish. Formed in Uptrend. Interpretation: Bearish reversal candle, Beginning of new trend.',
    difficulty: 'intermediate',
    svgType: 'evening-star'
  },
  {
    id: 'bullish-harami',
    name: 'Bullish Harami',
    category: 'dual-candle',
    bias: 'bullish',
    subtitle: 'Inside Bar Reversal at Trend Bottom ("Easy to Spot")',
    characteristics: [
      '2 candle stick pattern',
      'The large red candle fully encloses/engulfs the small bullish (green) candle inside its body',
      'Found in a downtrend',
      'Easy to spot'
    ],
    interpretation: '2 candle stick pattern. The red candle fully engulfs small bullish candle. Found in downtrend. Interpretation: bullish reversal. Easy to spot.',
    foundIn: 'downtrend',
    keyRequirements: [
      'Must follow a preceding downtrend',
      'The small green candle is completely contained within the vertical range of the preceding red candle body',
      'Signals immediate contraction in volatility and sudden pause in selling force'
    ],
    entryPoint: 'Buy when price breaks above the high of the small baby candle (or the mother candle high for extra safety).',
    stopLoss: 'Below the low of the large mother red candle.',
    takeProfitTarget: 'Next resistance level (target 2R-3R).',
    slideNotes: 'The red candle fully engulfs small bullish candle. Found in downtrend. Interpretation: bullish reversal. Easy to spot.',
    difficulty: 'intermediate',
    svgType: 'bullish-harami'
  },
  {
    id: 'bearish-harami',
    name: 'Bearish Harami',
    category: 'dual-candle',
    bias: 'bearish',
    subtitle: 'Inside Bar Reversal at Trend Top ("Easy to Spot")',
    characteristics: [
      '2 candle stick pattern',
      'The large green candle fully encloses/engulfs the small bearish (red) candle inside its body',
      'Found in an uptrend',
      'Easy to spot'
    ],
    interpretation: '2 candle stick pattern. The green candle fully engulfs small bearish candle. Found in uptrend. Interpretation: bearish reversal. Easy to spot.',
    foundIn: 'uptrend',
    keyRequirements: [
      'Must occur after an extended uptrend',
      'The small red candle body is entirely inside the boundaries of the preceding tall green candle body',
      'Shows buyers have lost their buying power at resistance'
    ],
    entryPoint: 'Sell short when price breaks below the low of the small red inside candle.',
    stopLoss: 'Above the high of the large green mother candle.',
    takeProfitTarget: 'First support zone, 4EMA dynamic support, or 2.5R target.',
    slideNotes: 'The green candle fully engulfs small bearish candle. Found in uptrend. Interpretation: bearish reversal. Easy to spot.',
    difficulty: 'intermediate',
    svgType: 'bearish-harami'
  }
];

export const CHART_PATTERNS: ChartPattern[] = [
  {
    id: 'symmetrical-triangle',
    name: 'Symmetrical Triangle',
    category: 'bilateral-chart',
    bias: 'either',
    subtitle: 'Bilateral Breakout Structure with Measured Move Target',
    criteria: [
      'Need at least two lows of the resistance level to the downside (descending upper trendline)',
      'Need at least two highs of the support level to the upside (ascending lower trendline)',
      'Found in uptrend and downtrend',
      'Can be bullish or bearish'
    ],
    interpretation: 'Can be bullish or bearish. Interpretation: wait for breakout / breakdown.',
    formedIn: 'Formed in both uptrends and downtrends as volatility coils',
    targetMeasurement: 'Target: Measured vertical height of the widest part (base) of the triangle, projected from the breakout point.',
    entryPoint: 'Wait for a confirmed candle close outside the triangle trendline (breakout above resistance or breakdown below support).',
    stopLoss: 'Placed just inside the triangle structure opposite the breakout boundary, or beneath the most recent swing pivot.',
    timeframeTip: 'Works effectively across 1h, 4h, and daily charts. Wait for clear breakout volume confirmation.',
    slideNotes: 'Need at least two lows of the resistance level to the downside. Need at least two highs of the support level to the upside. Found in uptrend and downtrend. Can be bullish or bearish. Interpretation: wait for breakout / breakdown.',
    difficulty: 'intermediate',
    svgType: 'symmetrical-triangle'
  },
  {
    id: 'ascending-triangle',
    name: 'Ascending Triangle',
    category: 'continuation-chart',
    bias: 'bullish',
    subtitle: 'High-Probability Bullish Accumulation Structure',
    criteria: [
      'Need at least two resistance lines in "Horizontal sequence" (Straight horizontal resistance ceiling)',
      'Need at least two parallel [ascending] support lines (Support line towards upside / higher lows)',
      'Formed in downtrend, uptrend',
      '"BULLISH PATTERN"'
    ],
    interpretation: 'Formed in downtrend, uptrend. "BULLISH PATTERN". Interpretation: wait for breakout.',
    formedIn: 'Both uptrend (continuation) and downtrend (bottom reversal)',
    targetMeasurement: 'Target: Height of the vertical base of the triangle projected upward from the horizontal breakout line.',
    entryPoint: 'Enter upon candle close breaking above the horizontal resistance ceiling, or on a confirmed retest of that broken resistance turned support.',
    stopLoss: 'Placed below the most recent ascending swing low inside the triangle.',
    timeframeTip: '4h and daily timeframes produce very clean moves with minimal false breakouts.',
    slideNotes: 'Need at least two resistance line in "Horizontal sequence" (Straight). Need at least two parallel support lines. Support line towards upside. Formed in downtrend, uptrend. "BULLISH PATTERN". Interpretation: wait for breakout.',
    difficulty: 'intermediate',
    svgType: 'ascending-triangle'
  },
  {
    id: 'descending-triangle',
    name: 'Descending Triangle',
    category: 'continuation-chart',
    bias: 'bearish',
    subtitle: 'High-Probability Bearish Distribution Structure',
    criteria: [
      'Need at least two lows of the resistance level towards downside (descending upper trendline)',
      'Need at least two support levels "In a straight line sequence" (Horizontal straight support floor)',
      'Formed in downtrend, uptrend',
      '"BEARISH PATTERN"'
    ],
    interpretation: 'Formed in downtrend, uptrend. "BEARISH PATTERN". Interpretation: wait for breakdown.',
    formedIn: 'Downtrends (continuation) and uptrends (top reversal)',
    targetMeasurement: 'Target: Vertical height of the triangle base projected downward from the horizontal breakdown line.',
    entryPoint: 'Enter short once price closes decisively below the horizontal support line, or on a retest of the broken floor.',
    stopLoss: 'Placed above the most recent lower swing high along the descending resistance line.',
    timeframeTip: 'Wait for breakdown candle close to avoid wick fakeouts.',
    slideNotes: 'Need at least two lows of the resistance level towards downside. Need at least two support levels "In a straight line sequence" (Horizontal). Formed in downtrend, uptrend. "BEARISH PATTERN". Interpretation: wait for breakdown.',
    difficulty: 'intermediate',
    svgType: 'descending-triangle'
  },
  {
    id: 'head-and-shoulders',
    name: 'Head & Shoulders Pattern',
    category: 'reversal-chart',
    bias: 'bearish',
    subtitle: 'Classic Major Top Reversal ("Price Will Free Fall")',
    criteria: [
      'Consist of Left shoulder, Head (highest peak), Right shoulder',
      'Neckline is formed connecting the reaction troughs between the shoulders',
      'BEARISH REVERSAL PATTERN. FOUND IN UPTRENDS',
      'Always use bigger time frames for this pattern: 4 hour, the daily chart for best results'
    ],
    interpretation: 'BEARISH REVERSAL PATTERN. FOUND IN UPTRENDS. Interpretation: Neckline gets broken the price will free fall. Always use bigger time frames: 4 hour, daily chart for best results.',
    formedIn: 'Uptrends at market tops',
    targetMeasurement: 'Target: Measured distance from the peak of the Head vertically to the Neckline, projected downward from the neckline break point.',
    entryPoint: 'Enter short upon candle close breaking below the Neckline, or on the subsequent pullback/retest of the broken Neckline.',
    stopLoss: 'Placed above the peak of the Right Shoulder.',
    timeframeTip: '4 hour and Daily charts give the most reliable signals. Avoid 1m/5m noise.',
    slideNotes: 'Consist of Left shoulder, Head, Right shoulder. Neckline is formed connecting shoulders. BEARISH REVERSAL PATTERN. FOUND IN UPTRENDS. Interpretation: Neckline gets break the price will free fall. Always use bigger time frames for this pattern - 4 hour, the daily chart for best results.',
    difficulty: 'advanced',
    svgType: 'head-and-shoulders'
  },
  {
    id: 'inverse-head-and-shoulders',
    name: 'Inverse Head & Shoulders Pattern',
    category: 'reversal-chart',
    bias: 'bullish',
    subtitle: 'Major Bottom Reversal ("Price Will Rally Upside")',
    criteria: [
      'Consist of Left shoulder, Head (lowest trough), Right shoulder',
      'Neckline is formed connecting the reaction peaks',
      'BULLISH REVERSAL PATTERN. FOUND IN DOWNTRENDS',
      'Always use bigger time frames: 4 hour, 1 hour, daily chart for best results'
    ],
    interpretation: 'BULLISH REVERSAL PATTERN. FOUND IN DOWNTRENDS. Interpretation: Neckline gets broken the price will rally upside. Always use bigger time frames: 4 hour, 1 hour, the daily chart.',
    formedIn: 'Downtrends at major market bottoms',
    targetMeasurement: 'Target: Measured distance from the lowest trough of the Head up to the Neckline, projected vertically upward from the breakout point.',
    entryPoint: 'Enter long on the breakout candle close above the Neckline or on a retest of the broken Neckline.',
    stopLoss: 'Placed just below the low of the Right Shoulder.',
    timeframeTip: 'Use 4 hour, 1 hour, or daily charts as stressed in the slide presentation.',
    slideNotes: 'Consist of Left shoulder, Head, Right shoulder. Neckline is formed connecting shoulders. BULLISH REVERSAL PATTERN. FOUND IN DOWNTRENDS. Interpretation: Neckline gets break the price will rally upside. Always use bigger time frames for this pattern - 4 hour, 1 hour, the daily chart for best results.',
    difficulty: 'advanced',
    svgType: 'inverse-head-and-shoulders'
  },
  {
    id: 'double-bottom',
    name: 'Double Bottom Chart Pattern',
    category: 'reversal-chart',
    bias: 'bullish',
    subtitle: 'Classic "W" Pattern at Trend Exhaustion',
    criteria: [
      'Identify two bottoms: price makes new low, slightly pushes upside, then makes second low of almost the same length',
      'Resembles as the letter "W"',
      'Formed at the end of the downtrend',
      'Bullish reversal pattern'
    ],
    interpretation: 'Formed at the end of the downtrend. Bullish reversal pattern. Interpretation: upon breaking the neckline, bullish rally to the upside.',
    formedIn: 'End of a sustained downtrend',
    targetMeasurement: 'Target: Vertical distance between the bottoms and the neckline projected upward from the neckline breakout.',
    entryPoint: 'Enter long upon candle close breaking above the Neckline (central peak of the W).',
    stopLoss: 'Placed below the midpoint of the right bottom or below the bottoms.',
    timeframeTip: 'Look for RSI bullish divergence between the First Bottom and Second Bottom for huge win-rate confluence!',
    slideNotes: 'Identify two bottoms, price makes new low then slightly pushes upside then makes new low of almost the same length. Resembles as the letter "W". Formed at the end of the downtrend. Bullish reversal pattern. Interpretation: upon breaking the neckline, bullish rally to the upside.',
    difficulty: 'intermediate',
    svgType: 'double-bottom'
  },
  {
    id: 'double-top',
    name: 'Double Top Chart Pattern',
    category: 'reversal-chart',
    bias: 'bearish',
    subtitle: 'Classic "M" Pattern ("Price Is About to Drop")',
    criteria: [
      'First top followed by reaction pullback and second top at almost identical price level',
      'Neckline established at the central swing low',
      'BEARISH REVERSAL PATTERN - ONLY FOUND IN UPTREND',
      'Indicates that price is about to drop'
    ],
    interpretation: 'DOUBLE TOP: - BEARISH REVERSAL PATTERN - ONLY FOUND IN UPTREND - WHICH INDICATES THAT PRICE IS ABOUT TO DROP.',
    formedIn: 'Only found at the climax of an uptrend',
    targetMeasurement: 'Target: Measured distance from peaks to neckline projected downward from the neckline break.',
    entryPoint: 'Enter short when price breaks and closes below the Neckline.',
    stopLoss: 'Above the neckline resistance or above the second top peak.',
    timeframeTip: 'Check for bearish RSI divergence on the second top to confirm institutional distribution.',
    slideNotes: 'DOUBLE TOP CHART PATTERN: - BEARISH REVERSAL PATTERN - ONLY FOUND IN UPTREND - WHICH INDICATES THAT PRICE IS ABOUT TO DROP.',
    difficulty: 'intermediate',
    svgType: 'double-top'
  },
  {
    id: 'bull-flag',
    name: 'Bull Flag Chart Pattern',
    category: 'continuation-chart',
    bias: 'bullish',
    subtitle: 'Flagpole Explosion followed by Downward Sloping Consolidation',
    criteria: [
      'Continuation Pattern that occurs in an uptrend',
      'Sharp, energetic upward impulse (Flag pole)',
      'Parallel orderly consolidation channel sloping downward or sideways against the trend',
      'Upon the breakout, take entry'
    ],
    interpretation: 'Continuation Pattern. Occurs in uptrend. Interpretation: Indicates continuation of uptrend. Upon the breakout, take entry.',
    formedIn: 'Strong uptrends',
    targetMeasurement: 'Target: Target would be the size of the flag pole towards upside (projected from the breakout low).',
    entryPoint: 'Enter long on the breakout candle close above the upper resistance channel of the flag.',
    stopLoss: 'Below the lowest point of the flag consolidation channel.',
    timeframeTip: 'Flag consolidation should not retrace more than 38.2% to 50% of the flagpole.',
    slideNotes: 'Continuation Pattern. Occurs in uptrend. Interpretation: Indicates continuation of uptrend. Upon the breakout, take entry. Target: Target would be the size of flag pole towards upside.',
    difficulty: 'intermediate',
    svgType: 'bull-flag'
  },
  {
    id: 'bear-flag',
    name: 'Bear Flag Chart Pattern',
    category: 'continuation-chart',
    bias: 'bearish',
    subtitle: 'Flagpole Dump followed by Sloping Upward Consolidation',
    criteria: [
      'Continuation Pattern that occurs in a downtrend',
      'Sharp downward plunge (Flag pole)',
      'Orderly upward-sloping consolidation channel (counter-trend bear flag)',
      'Upon the breakdown, take entry'
    ],
    interpretation: 'Continuation Pattern. Occurs in downtrend. Interpretation: Indicates continuation of downtrend. Upon the breakdown, take entry.',
    formedIn: 'Aggressive downtrends',
    targetMeasurement: 'Target: Target would be the size of flag pole towards downside (projected from the breakdown point).',
    entryPoint: 'Enter short upon candle close breaking down below the lower channel boundary of the flag.',
    stopLoss: 'Placed above the highest pivot inside the flag channel.',
    timeframeTip: 'Volume typically declines during flag formation and explodes on the breakdown.',
    slideNotes: 'Continuation Pattern. Occurs in downtrend. Interpretation: Indicates continuation of downtrend. Upon the breakdown, take entry. Target: Target would be the size of flag pole towards downside.',
    difficulty: 'intermediate',
    svgType: 'bear-flag'
  },
  {
    id: 'cup-and-handle',
    name: 'Cup & Handle Chart Pattern',
    category: 'continuation-chart',
    bias: 'bullish',
    subtitle: 'Rounded Bottom Accumulation with Handle Breakout',
    criteria: [
      'Structure like the "cup looks like rounded bottom and is followed by the handle"',
      'Uptrend lead-in with rounded base',
      'Small handle pullback forming a slight downward flag or drift',
      'Bullish reversal / continuation pattern'
    ],
    interpretation: 'Bullish pattern. Interpretation: wait for the breakout, take entry. Target would be the length of the cup to neckline.',
    formedIn: 'Uptrends or major bottom transitions',
    targetMeasurement: 'Target: Target would be the vertical depth/length of the cup from rim to bottom, projected upward from the neckline breakout.',
    entryPoint: 'Take entry upon breakout candle close above the horizontal Neckline rim.',
    stopLoss: 'Placed just below the lowest point of the handle.',
    timeframeTip: 'Cups that form over weeks or months on 4h / Daily charts have very high accuracy.',
    slideNotes: 'Structure like the "cup looks like rounded bottom and is followed by the handle". Bullish reversal pattern. Interpretation: wait for the breakout, take entry. Target would be the length of the cup to neckline.',
    difficulty: 'advanced',
    svgType: 'cup-and-handle'
  },
  {
    id: 'falling-wedge',
    name: 'Falling Wedge Chart Pattern',
    category: 'reversal-chart',
    bias: 'bullish',
    subtitle: 'Coiling Buying Zone with Explosive Upside Breakout',
    criteria: [
      'BULLISH CHART PATTERN, BULLISH REVERSAL',
      'Found in uptrend and downtrend',
      'Falling wedge is widest at the top and becomes narrower as it moves downward, with tighter price action',
      'Both resistance and support trendlines slope downwards, with resistance converging towards support'
    ],
    interpretation: 'BULLISH CHART PATTERN, BULLISH REVERSAL. Found in uptrend. Falling wedge is widest at top and becomes narrower as it moves downward with tighter price action. Interpretation: wait for breakout, after breakout buy, targets would be resistance levels of the wedge. Buying zone.',
    formedIn: 'Downtrends (reversal) and uptrends (continuation pullback)',
    targetMeasurement: 'Target: Targets would be the upper resistance levels and the widest point at the top of the wedge.',
    entryPoint: 'Buy once price breaks out above the falling upper resistance trendline.',
    stopLoss: 'Below the lowest support point inside the narrow wedge apex.',
    timeframeTip: 'Highlighted in technical curriculum as a premier "Buying Zone" when volume expands on breakout.',
    slideNotes: 'BULLISH CHART PATTERN, BULLISH REVERSAL. Found in uptrend. Falling wedge is widest at the top and becomes narrower as it moves downward, with tighter price action. Interpretation: wait for breakout, after breakout buy, targets would be the resistance levels of the wedge. Buying zone.',
    difficulty: 'intermediate',
    svgType: 'falling-wedge'
  },
  {
    id: 'rising-wedge',
    name: 'Rising Wedge Chart Pattern',
    category: 'reversal-chart',
    bias: 'bearish',
    subtitle: 'Narrowing Buying Climax Leading to Sharp Breakdown',
    criteria: [
      'BEARISH CHART PATTERN, BEARISH REVERSAL',
      'The resistance line is moving in ascending way, while the support line is steeper than resistance line',
      'Can be found in uptrend, downtrend',
      'Interpretation: wait for breakdown & sell. Breakdown, selling zone.'
    ],
    interpretation: 'BEARISH CHART PATTERN, BEARISH REVERSAL. The resistance line is moving in ascending way, while the support line is steeper than resistance line. Can be found in uptrend, downtrend. Interpretation: wait for breakdown & sell.',
    formedIn: 'Uptrends (reversal) and downtrend bear market rallies (continuation)',
    targetMeasurement: 'Target: Measured distance of the base of the wedge projected downwards from breakdown point.',
    entryPoint: 'Sell short on the decisive breakdown below the ascending support line.',
    stopLoss: 'Above the highest apex high inside the wedge.',
    timeframeTip: 'Highlighted in technical curriculum as an institutional "Selling Zone" where exhaustion triggers sharp drops.',
    slideNotes: 'BEARISH CHART PATTERN, BEARISH REVERSAL. The resistance line is moving in ascending way, while the support line is steeper than resistance line. Can be found in uptrend, downtrend. Interpretation: wait for breakdown & sell.',
    difficulty: 'intermediate',
    svgType: 'rising-wedge'
  }
];
