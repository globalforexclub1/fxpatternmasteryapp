import { TradeSimulatorScenario } from '../types.ts';

export const TRADE_SIMULATOR_SCENARIOS: TradeSimulatorScenario[] = [
  {
    id: 'sc-eurusd-pinbar',
    title: 'EUR/USD London Open Pin Bar Rejection at Daily Resistance',
    pair: 'EUR/USD',
    assetType: 'forex',
    timeframe: 'M15',
    session: 'London Open (08:15 GMT)',
    setupName: 'Forex Pin Bar + Key Level Liquidity Sweep',
    recommendedBias: 'short',
    context: 'Price consolidated during the Asian session between 1.0815 and 1.0845. At the London open (07:30 GMT), smart money pushed price past 1.0855 to sweep buy-stops. A massive Bearish Pin Bar printed with an 18-pip upper rejection wick at Daily Resistance 1.0860.',
    confluences: [
      'Bearish Pin Bar formed at Key Daily Horizontal Resistance (1.0860)',
      'Asian session high swept (Judas Swing liquidity trap)',
      'RSI regular bearish divergence on M15 timeframe',
      'Institutional 4EMA (8 & 12 EMA) rolling over downward'
    ],
    currentPrice: 1.0838,
    defaultEntry: 1.0838,
    defaultStopLoss: 1.0862,
    defaultTakeProfit: 1.0782,
    spreadPips: 1.0,
    pipFactor: 10000,
    pipDecimals: 4,
    riskWarnings: [
      'London session volatility is high. Ensure your Stop Loss is placed at least 5 pips above the rejection wick (1.0862).',
      'Never risk more than 1% to 2% of your total account capital on this trade.',
      'Watch out for the US session open at 13:30 GMT which may trigger fresh volatility if news is pending.'
    ],
    initialCandles: [
      { index: 1, time: '06:00', open: 1.0820, high: 1.0830, low: 1.0818, close: 1.0825, annotation: 'Asian Range' },
      { index: 2, time: '06:30', open: 1.0825, high: 1.0835, low: 1.0822, close: 1.0832 },
      { index: 3, time: '07:00', open: 1.0832, high: 1.0842, low: 1.0828, close: 1.0840 },
      { index: 4, time: '07:30', open: 1.0840, high: 1.0858, low: 1.0836, close: 1.0852, annotation: 'London Judas Push' },
      { index: 5, time: '08:00', open: 1.0852, high: 1.0861, low: 1.0835, close: 1.0838, annotation: 'Bearish Pin Bar Rejection' }
    ],
    forwardCandles: [
      { index: 6, time: '08:15', open: 1.0838, high: 1.0843, low: 1.0828, close: 1.0830, annotation: 'Follow-through down' },
      { index: 7, time: '08:30', open: 1.0830, high: 1.0834, low: 1.0818, close: 1.0820, annotation: 'Bears dominating' },
      { index: 8, time: '08:45', open: 1.0820, high: 1.0824, low: 1.0810, close: 1.0812, annotation: 'Asian Low broken' },
      { index: 9, time: '09:00', open: 1.0812, high: 1.0815, low: 1.0798, close: 1.0801, annotation: '1.0800 tested' },
      { index: 10, time: '09:15', open: 1.0801, high: 1.0805, low: 1.0780, close: 1.0782, annotation: 'Take Profit Hit! (+56 pips)' }
    ],
    debriefSuccess: 'Excellent Execution! You recognized the London Open liquidity sweep and traded in alignment with institutional order flow. By placing your stop loss beyond the Pin Bar wick, you kept your risk precisely controlled while capturing a 1:2.3 Risk/Reward payout.',
    debriefFailure: 'Stop Loss Hit or Overleveraged! Common mistakes in this setup include: (1) Placing your Stop Loss too tight inside the Asian range where normal spread knocked you out, or (2) Entering long trying to chase the fake London breakout.'
  },
  {
    id: 'sc-gold-head-and-shoulders',
    title: 'XAU/USD (Gold) Head & Shoulders Breakdown & Retest',
    pair: 'XAU/USD',
    assetType: 'gold',
    timeframe: 'H1',
    session: 'New York Session (14:00 GMT)',
    setupName: 'H&S Neckline Breakdown + Resistance Flip',
    recommendedBias: 'short',
    context: 'Gold printed an institutional Head & Shoulders pattern on the H1 timeframe at the $2,670 resistance area. Price broke below the $2,648 neckline with heavy volume. Current price is retesting the broken neckline as newly confirmed resistance.',
    confluences: [
      'Head at $2,672, Left Shoulder at $2,658, Right Shoulder at $2,659',
      'Neckline broken cleanly with large red bearish Marubozu candle',
      'Neckline retested with upper rejection wick',
      'Target measurement = $2,648 neckline minus ($2,672 - $2,648 = $24 depth) -> Target $2,615'
    ],
    currentPrice: 2648.50,
    defaultEntry: 2648.50,
    defaultStopLoss: 2661.00,
    defaultTakeProfit: 2616.00,
    spreadPips: 2.5,
    pipFactor: 10,
    pipDecimals: 2,
    riskWarnings: [
      'CRITICAL GOLD WARNING: 1.0 standard lot of Gold moves $100 per $1.00 change in price. A $12.50 stop loss on 1.0 lot is a $1,250 risk! Conservative lot sizing according to the strict 1-2% position sizing formula is suggested.',
      'Gold is hyper-sensitive to US 10-Year Bond Yields and Federal Reserve speaker headlines.',
      'Check spread: Gold spread expands during low liquidity and market open.'
    ],
    initialCandles: [
      { index: 1, time: '09:00', open: 2645, high: 2658, low: 2644, close: 2657, annotation: 'Left Shoulder' },
      { index: 2, time: '10:00', open: 2657, high: 2672, low: 2654, close: 2668, annotation: 'Head (Top)' },
      { index: 3, time: '11:00', open: 2668, high: 2669, low: 2647, close: 2649, annotation: 'Drop to Neckline' },
      { index: 4, time: '12:00', open: 2649, high: 2659, low: 2648, close: 2658, annotation: 'Right Shoulder' },
      { index: 5, time: '13:00', open: 2658, high: 2658, low: 2644, close: 2645, annotation: 'Neckline Breakdown' },
      { index: 6, time: '14:00', open: 2645, high: 2650, low: 2644, close: 2648.5, annotation: 'Neckline Retest Entry' }
    ],
    forwardCandles: [
      { index: 7, time: '15:00', open: 2648.5, high: 2651, low: 2638, close: 2640, annotation: 'Selling pressure resumes' },
      { index: 8, time: '16:00', open: 2640, high: 2642, low: 2628, close: 2630, annotation: 'Institutional dump' },
      { index: 9, time: '17:00', open: 2630, high: 2632, low: 2621, close: 2624, annotation: 'Approaching target' },
      { index: 10, time: '18:00', open: 2624, high: 2625, low: 2614, close: 2616, annotation: 'Take Profit Hit! (+$32.50 drop)' }
    ],
    debriefSuccess: 'Masterful Gold Trade! You respected the classic Head & Shoulders neckline retest rule: "wait for breakdown & sell". Most importantly, you managed your position size on a volatile commodity like Gold without taking reckless dollar drawdown.',
    debriefFailure: 'Gold Volatility Trap! If you were stopped out, check whether your lot size was too large, or if you placed your stop loss too tight right on top of the neckline rather than above the Right Shoulder buffer ($2,661).'
  },
  {
    id: 'sc-usdzar-double-bottom',
    title: 'USD/ZAR (Emerging Markets FX) Double Bottom "W" Breakout',
    pair: 'USD/ZAR',
    assetType: 'forex',
    timeframe: 'H1',
    session: 'London & Emerging Markets Session (09:00 SAST / 07:00 GMT)',
    setupName: 'Double Bottom W-Pattern + Neckline Expansion',
    recommendedBias: 'long',
    context: 'USD/ZAR consolidated at 17.6500 after a sharp 3-day decline, forming Bottom 1 at 17.6520 and Bottom 2 at 17.6580 (the classic "W" formation). Price is currently breaking out above the central Neckline at 17.8200 with expanding trade volume.',
    confluences: [
      'Double Bottom "W" pattern formed after extended downtrend',
      'Both bottoms held the institutional 17.65 round psychological support',
      'Neckline broken with a clean 1H Bullish Marubozu expansion candle',
      'Target measured move: 17.8200 - 17.6500 = +0.1700 (1,700 pips) projected to 17.9900 - 18.0000'
    ],
    currentPrice: 17.8250,
    defaultEntry: 17.8250,
    defaultStopLoss: 17.7100,
    defaultTakeProfit: 18.0500,
    spreadPips: 28.0,
    pipFactor: 10000,
    pipDecimals: 4,
    riskWarnings: [
      'CRITICAL EMERGING MARKET RISK WARNING: USD/ZAR has typical spreads of 25 to 35 pips! Micro 10-pip stop losses are statistically prone to premature trigger. A suggested 90-120 pip buffer helps clear market noise.',
      'Beware of the 21:00-22:00 GMT bank rollover where USD/ZAR spreads can blow out to 150+ pips.',
      'Central bank interest rate announcements or mining commodity headlines cause sudden multi-hundred pip swings.'
    ],
    initialCandles: [
      { index: 1, time: '04:00', open: 17.72, high: 17.74, low: 17.652, close: 17.665, annotation: 'Bottom 1 (Trough)' },
      { index: 2, time: '05:00', open: 17.665, high: 17.82, low: 17.66, close: 17.81, annotation: 'Neckline Rally' },
      { index: 3, time: '06:00', open: 17.81, high: 17.815, low: 17.658, close: 17.67, annotation: 'Bottom 2 (Retest)' },
      { index: 4, time: '07:00', open: 17.67, high: 17.76, low: 17.668, close: 17.75, annotation: 'Bullish bounce' },
      { index: 5, time: '08:00', open: 17.75, high: 17.83, low: 17.74, close: 17.825, annotation: 'W-Neckline Breakout!' }
    ],
    forwardCandles: [
      { index: 6, time: '09:00', open: 17.825, high: 17.89, low: 17.81, close: 17.87, annotation: 'Buyers surging' },
      { index: 7, time: '10:00', open: 17.87, high: 17.94, low: 17.86, close: 17.93, annotation: 'Strong momentum' },
      { index: 8, time: '11:00', open: 17.93, high: 17.99, low: 17.91, close: 17.98, annotation: 'Psychological 18.00 test' },
      { index: 9, time: '12:00', open: 17.98, high: 18.06, low: 17.97, close: 18.05, annotation: 'Take Profit Hit! (+2,250 pips)' }
    ],
    debriefSuccess: 'Outstanding Emerging Markets Trade! You applied the classic Double Bottom "W" breakout model to USD/ZAR. Crucially, you factored in the wider ZAR spread and gave your stop loss adequate breathing room beneath the breakout consolidation.',
    debriefFailure: 'Spread Premature Stop-Out! On USD/ZAR, if your stop loss was placed tighter than 80 pips, broker bid/ask spread triggered your stop before the rally kicked off. Educational principle: Wide spread demands proportionate stop distance and smaller lot size.'
  },
  {
    id: 'sc-gbpjpy-4ema-bounce',
    title: 'GBP/JPY 4EMA Fan Alignment & Bull Flag Breakout',
    pair: 'GBP/JPY',
    assetType: 'forex',
    timeframe: 'M30',
    session: 'London / NY Overlap (13:30 GMT)',
    setupName: '4EMA Trend Bounce + Bull Flag',
    recommendedBias: 'long',
    context: 'GBP/JPY ("The Cross") is in a strong uptrend. The 4EMA fan (8 blue, 12 cyan, 21 yellow, 55 coral) is fanned out and sloping upward. Price formed a textbook Bull Flag consolidation channel directly onto the 21 EMA dynamic support and is now printing an energetic green breakout candle.',
    confluences: [
      'All 4 EMAs fanned out in bullish sequence (8 > 12 > 21 > 55)',
      'Price pulled back and respected the 21 EMA as dynamic support',
      'Orderly downward-sloping Bull Flag consolidation completed',
      'Target = length of the flagpole (120 pips) projected upward'
    ],
    currentPrice: 196.40,
    defaultEntry: 196.40,
    defaultStopLoss: 195.65,
    defaultTakeProfit: 198.10,
    spreadPips: 1.8,
    pipFactor: 100,
    pipDecimals: 2,
    riskWarnings: [
      'GBP/JPY is known for its wide 180-pip daily average range. Oversized lots can cause sudden drawdown.',
      'Always calculate your risk in dollars ($) using the strict position sizing formula before executing.',
      'Stop loss should sit safely below the 21 EMA and flag low (195.65).'
    ],
    initialCandles: [
      { index: 1, time: '11:00', open: 195.20, high: 196.60, low: 195.10, close: 196.50, annotation: 'Flagpole Surge' },
      { index: 2, time: '11:30', open: 196.50, high: 196.55, low: 196.10, close: 196.15, annotation: 'Flag channel down' },
      { index: 3, time: '12:00', open: 196.15, high: 196.25, low: 195.85, close: 195.90, annotation: '21 EMA test' },
      { index: 4, time: '12:30', open: 195.90, high: 196.05, low: 195.80, close: 196.00, annotation: 'Lower wick bounce' },
      { index: 5, time: '13:00', open: 196.00, high: 196.45, low: 195.95, close: 196.40, annotation: 'Flag Breakout Candle!' }
    ],
    forwardCandles: [
      { index: 6, time: '13:30', open: 196.40, high: 196.95, low: 196.35, close: 196.90, annotation: 'Overlap surge' },
      { index: 7, time: '14:00', open: 196.90, high: 197.45, low: 196.80, close: 197.40, annotation: 'Strong momentum' },
      { index: 8, time: '14:30', open: 197.40, high: 197.80, low: 197.30, close: 197.75, annotation: 'Trending hard' },
      { index: 9, time: '15:00', open: 197.75, high: 198.15, low: 197.65, close: 198.10, annotation: 'Take Profit Hit! (+170 pips)' }
    ],
    debriefSuccess: 'Flawless 4EMA Strategy Execution! You combined 4EMA dynamic trend alignment with the Bull Flag continuation pattern. The 21 EMA provided the high-probability springboard, delivering +170 pips with exceptional discipline.',
    debriefFailure: 'Violated GBP/JPY Risk Parameters! Did you enter with too large of a lot size or exit in panic during the initial retest? Remember that volatile pairs require disciplined emotional control and strict adherence to predetermined stops.'
  },
  {
    id: 'sc-eurgbp-fair-value-gap',
    title: 'EUR/GBP Institutional Fair Value Gap (FVG) Tap & Mitigation',
    pair: 'EUR/GBP',
    assetType: 'forex',
    timeframe: 'H1',
    session: 'London Session (10:00 GMT)',
    setupName: 'Bullish Fair Value Gap (FVG) + 50% CE Fill',
    recommendedBias: 'long',
    context: 'Following a sharp upward impulse, a clear 3-candle imbalance (Bullish FVG) was formed between 0.8525 (Candle 1 high) and 0.8550 (Candle 3 low). Price is currently dipping into the 50% Consequent Encroachment (0.8537) of this imbalance zone.',
    confluences: [
      'Clear Bullish Fair Value Gap with open void between wicks',
      'Price returning to mitigate institutional imbalance during London session',
      'Higher timeframe (H4) trend is in strong upward alignment',
      'Stop loss protected below Candle 1 swing low (0.8518)'
    ],
    currentPrice: 0.8538,
    defaultEntry: 0.8538,
    defaultStopLoss: 0.8518,
    defaultTakeProfit: 0.8590,
    spreadPips: 1.2,
    pipFactor: 10000,
    pipDecimals: 4,
    riskWarnings: [
      'EUR/GBP is a low ATR pair (average 40-60 pips per day). Target expectations should be realistic.',
      'High pip value: 1.0 standard lot of EUR/GBP pays in British Pounds (~$12.50+ USD per pip).',
      'Confirm candle rejection inside the FVG before entering.'
    ],
    initialCandles: [
      { index: 1, time: '06:00', open: 0.8510, high: 0.8525, low: 0.8505, close: 0.8522, annotation: 'Candle 1 Base' },
      { index: 2, time: '07:00', open: 0.8522, high: 0.8570, low: 0.8520, close: 0.8565, annotation: 'Candle 2 (Displacement)' },
      { index: 3, time: '08:00', open: 0.8565, high: 0.8580, low: 0.8550, close: 0.8575, annotation: 'Candle 3 (FVG Open)' },
      { index: 4, time: '09:00', open: 0.8575, high: 0.8578, low: 0.8542, close: 0.8545, annotation: 'Retracing into FVG' },
      { index: 5, time: '10:00', open: 0.8545, high: 0.8546, low: 0.8535, close: 0.8538, annotation: '50% FVG Tap (Entry)' }
    ],
    forwardCandles: [
      { index: 6, time: '11:00', open: 0.8538, high: 0.8555, low: 0.8536, close: 0.8552, annotation: 'Institutional buy reaction' },
      { index: 7, time: '12:00', open: 0.8552, high: 0.8568, low: 0.8548, close: 0.8565, annotation: 'Moving higher' },
      { index: 8, time: '13:00', open: 0.8565, high: 0.8582, low: 0.8560, close: 0.8579, annotation: 'Testing old highs' },
      { index: 9, time: '14:00', open: 0.8579, high: 0.8595, low: 0.8575, close: 0.8590, annotation: 'Take Profit Hit! (+52 pips)' }
    ],
    debriefSuccess: 'Precision Smart Money Execution! You understood that markets seek efficiency. The algorithms dipped into the Fair Value Gap to re-balance liquidity, offering a high-probability springboard with +52 pips gained on a 20-pip risk.',
    debriefFailure: 'Imbalance Misunderstanding! If stopped out, check whether the FVG was truly unfilled, or if the overall daily trend was heavily bearish against this trade setup.'
  }
];
