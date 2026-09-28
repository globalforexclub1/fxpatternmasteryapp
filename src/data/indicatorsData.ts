import type { IndicatorTopic, DivergenceItem } from '../types.ts';

export const RSI_DIVERGENCES: DivergenceItem[] = [
  {
    id: 'bullish-divergence',
    name: 'Regular Bullish Divergence',
    bias: 'bullish',
    category: 'regular',
    priceAction: 'Price is making a LOWER LOW (LL)',
    indicatorAction: 'RSI is making a HIGHER LOW (HL)',
    interpretation: 'Sellers are losing downward momentum despite pushing a new low. Powerful BULLISH REVERSAL imminent.',
    tradeType: 'reversal',
    strategyTip: 'Look for this pattern around key horizontal support or at the bottom of a falling wedge. Confirm with a bullish hammer or engulfing candle.'
  },
  {
    id: 'hidden-bullish-divergence',
    name: 'Hidden Bullish Divergence',
    bias: 'bullish',
    category: 'hidden',
    priceAction: 'Price is making a HIGHER LOW (HL)',
    indicatorAction: 'RSI is making a LOWER LOW (LL)',
    interpretation: 'Price remains resilient while the indicator completely resets oversold. Indicates STRONG UPTREND CONTINUATION.',
    tradeType: 'continuation',
    strategyTip: 'Occurs during shallow pullbacks in strong uptrends. Look for price bouncing off the 21 or 55 EMA while RSI resets.'
  },
  {
    id: 'bearish-divergence',
    name: 'Regular Bearish Divergence',
    bias: 'bearish',
    category: 'regular',
    priceAction: 'Price is making a HIGHER HIGH (HH)',
    indicatorAction: 'RSI is making a LOWER HIGH (LH)',
    interpretation: 'Buyers are exhausted; buying momentum is dying out despite the higher price print. BEARISH REVERSAL incoming.',
    tradeType: 'reversal',
    strategyTip: 'Commonly spotted on the second peak of a Double Top or Head & Shoulders head. Short when price breaks minor trendline.'
  },
  {
    id: 'hidden-bearish-divergence',
    name: 'Hidden Bearish Divergence',
    bias: 'bearish',
    category: 'hidden',
    priceAction: 'Price is making a LOWER HIGH (LH)',
    indicatorAction: 'RSI is making a HIGHER HIGH (HH)',
    interpretation: 'RSI surges overbought while price struggles to make any progress. Confirms aggressive DOWNTREND CONTINUATION.',
    tradeType: 'continuation',
    strategyTip: 'Occurs on weak rallies in a bear market. Sell short when price taps the descending trendline or 55 EMA resistance.'
  }
];

export const INDICATOR_TOPICS: IndicatorTopic[] = [
  {
    id: 'rsi-divergence',
    name: 'Relative Strength Index (R.S.I) & Divergence',
    shortName: 'RSI & Divergence',
    category: 'momentum',
    overview: 'RSI measures the speed and change of price movements on an oscillator scale from 0 to 100. Overbought is traditionally marked at 70 and Oversold at 30. Its greatest superpower is Divergence detection.',
    parameters: 'Period: 14 (Close). Overbought: 70, Oversold: 30, Neutral Centerline: 50.',
    keySignals: {
      bullish: 'RSI crosses up out of oversold (<30), breaks above 50 midline, or forms Bullish Divergence (Price Lower Low, RSI Higher Low).',
      bearish: 'RSI drops down out of overbought (>70), breaks below 50 midline, or forms Bearish Divergence (Price Higher High, RSI Lower High).'
    },
    institutionalStrategy: [
      'For the best results of divergence, always add 2-3 more confluences to your setup (e.g. Support & Resistance, Candlestick triggers, Chart Patterns).',
      'Check bigger time frames (4h, Daily) for reliable confirmation before executing on lower timeframes.',
      'Never trade divergence in isolation—wait for price structure to confirm the momentum shift.'
    ],
    proTips: 'Hidden divergence is often more reliable than regular divergence because it trades WITH the prevailing larger trend rather than trying to catch a falling knife.',
    divergences: RSI_DIVERGENCES
  },
  {
    id: '4ema-strategy',
    name: '4EMA Indicator & Trend Strategy',
    shortName: '4EMA Indicator',
    category: 'trend',
    overview: 'The 4EMA system uses four specific Exponential Moving Averages to show whether market trend is bullish or bearish, provide precise entry and exit signals, and act as dynamic support and resistance.',
    parameters: 'Length 1: 8 (or 9) [Blue], Length 2: 12 (or 13) [Teal], Length 3: 21 [Gold], Length 4: 55 [Red/Coral].',
    keySignals: {
      bullish: 'Bullish Alignment / Fan: 8 > 12 > 21 > 55 with all lines angling upward. Pullbacks into the 21 or 55 EMA act as dynamic support buying zones.',
      bearish: 'Bearish Alignment: 8 < 12 < 21 < 55 with lines angling downward. Rallies into the 21 or 55 EMA act as dynamic resistance selling zones.'
    },
    institutionalStrategy: [
      'Shows whether market trend is Bullish or Bearish at a single glance.',
      'Acts as dynamic Support (in uptrend) and Resistance (in downtrend).',
      'When all 4 EMAs expand and fan out, the trend is at maximum velocity. Do NOT trade against a fully fanned 4EMA sequence.',
      'Fast crossover (8 crossing over 12/21) provides early warning; 21 crossing 55 confirms systemic macro trend change.'
    ],
    proTips: 'When price compresses inside all four converging EMAs, the market is coiling for a massive breakout. Wait for candles to break out and the 4EMAs to fan apart.'
  },
  {
    id: 'trendlines-price-action',
    name: 'Trendlines & Price Channels Mastery',
    shortName: 'Trendline Strategy',
    category: 'structure',
    overview: 'Trendlines are simple straight lines yet one of the most powerful tools used by professional traders worldwide. They map the market trend and establish ascending/descending support and resistance.',
    parameters: 'Rule of Two: Minimum 2 valid taps of price on trendline required. Anything above 2 taps is a huge plus point.',
    keySignals: {
      bullish: 'Uptrend line acting as dynamic support on pullbacks. Breakout above a descending trendline signals a trend change to the upside.',
      bearish: 'Downtrend line acting as dynamic resistance on rallies. Breakdown below an ascending trendline signals a trend change to the downside.'
    },
    institutionalStrategy: [
      'Trendlines show us the market trend (Uptrend vs Downtrend).',
      'To be a valid trendline we need at least 2 taps of the price on trendline; 3+ taps confirms institutional backing.',
      'Trendline shows us trend reversal upon breaking out or breaking down (Trend-line broken, trend changed).',
      'Parallel trendlines construct Price Channels which guide systematic buying at the channel support and selling at the channel resistance.'
    ],
    proTips: 'Draw your trendlines connecting candle bodies or extreme wicks consistently. When a steep trendline breaks, price often performs a retest before continuing the reversal.'
  },
  {
    id: 'support-resistance-boxes',
    name: 'Support & Resistance (Rectangle Box Method)',
    shortName: 'S/R Rectangle Zones',
    category: 'structure',
    overview: 'Support and resistance are zones where buying or selling pressure overwhelms the market. Professional traders draw them using rectangle boxes rather than single thin lines to accommodate wick variance and liquidity wicks.',
    parameters: 'Zone box height typically covers the distance between candle closing bodies and wick extremes.',
    keySignals: {
      bullish: 'Price touches support zone with a bullish rejection candle (e.g. Hammer, Bullish Engulfing). Previous resistance flipped into new support.',
      bearish: 'Price reaches resistance zone with a bearish rejection candle (e.g. Shooting Star, Bearish Engulfing). Previous support broken and retested as resistance.'
    },
    institutionalStrategy: [
      'Always use rectangle boxes to capture the entire zone of interest instead of a single brittle horizontal line.',
      'Role Reversal (Support becomes Resistance, Resistance becomes Support) is the single highest-probability setup in price action.',
      'Look for confluence: combine a horizontal rectangle zone with a trendline tap and a candlestick trigger for top-tier execution.'
    ],
    proTips: 'The more times a support or resistance level is tested, the WEAKER it actually becomes because the pending limit orders are getting depleted!'
  },
  {
    id: 'macd-indicator',
    name: 'MACD (Moving Average Convergence Divergence)',
    shortName: 'MACD Indicator',
    category: 'momentum',
    overview: 'MACD is a trend-following momentum indicator showing the relationship between two exponential moving averages of a security’s price, accompanied by a signal line and histogram.',
    parameters: 'Fast Length: 12, Slow Length: 26, Signal Smoothing: 9 (EMA).',
    keySignals: {
      bullish: 'MACD line crosses above the Signal line below the zero line, followed by histogram turning positive.',
      bearish: 'MACD line crosses below the Signal line above the zero line, followed by histogram turning negative.'
    },
    institutionalStrategy: [
      'Use the Zero Line as the macro trend filter: only take long trades when MACD is above zero, and short trades when below zero.',
      'Look for MACD line divergence mirroring RSI divergence for double momentum confluence.'
    ],
    proTips: 'Histogram peak contraction often gives an entry signal 1 to 2 candles earlier than the actual line crossover.'
  },
  {
    id: 'stochastic-indicator',
    name: 'Stochastic Oscillator',
    shortName: 'Stochastic',
    category: 'momentum',
    overview: 'Stochastic compares a particular closing price to a range of its prices over a certain period of time. Highly sensitive to rapid cyclical reversals.',
    parameters: '%K Length: 14, %D Smoothing: 3, %D Smooth: 3. Upper Band: 80, Lower Band: 20.',
    keySignals: {
      bullish: '%K crosses above %D from within the oversold region (<20).',
      bearish: '%K crosses below %D from within the overbought region (>80).'
    },
    institutionalStrategy: [
      'Avoid trading against a strong 4EMA trend even if Stochastic stays overbought or oversold for extended periods.',
      'Best used to time the exact entry pullback inside an existing higher-timeframe trend.'
    ],
    proTips: 'Look for Stochastic hooks: when %K sharply bends and pierces through %D inside the extreme band, execution probability surges.'
  },
  {
    id: 'parabolic-sar',
    name: 'Parabolic S.A.R Indicator (Stop & Reverse)',
    shortName: 'Parabolic SAR',
    category: 'trend',
    overview: 'Parabolic SAR plots trailing dots above or below price bars to determine market direction and establish dynamic trailing stop-loss points.',
    parameters: 'Start Step: 0.02, Increment: 0.02, Maximum: 0.2.',
    keySignals: {
      bullish: 'SAR dots flip underneath candles, indicating an upward trend acceleration.',
      bearish: 'SAR dots flip above candles, indicating downward trend momentum.'
    },
    institutionalStrategy: [
      'Use Parabolic SAR as a mechanical trailing stop-loss to lock in profit during explosive flag or breakout moves.',
      'Never use Parabolic SAR during sideways consolidations; it will produce choppy whipsaws.'
    ],
    proTips: 'When a trade is in profit by more than 2R, shift your stop loss to the latest Parabolic SAR dot to let winners run.'
  }
];
