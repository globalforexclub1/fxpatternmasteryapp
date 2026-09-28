import type { QuizQuestion } from '../types.ts';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Candlesticks - Beginner to Advanced
  {
    id: 'q-cs-1',
    topic: 'candlesticks',
    difficulty: 'beginner',
    question: 'In technical analysis, what does a Spinning Top candlestick indicate in the market?',
    options: [
      'Strong institutional continuation in the direction of the trend',
      'Indecision between buyers and sellers, signaling a potential reversal',
      'Guaranteed breakout to new all-time highs',
      'The market is closed for holidays'
    ],
    correctIndex: 1,
    explanation: 'A Spinning Top has a small body with roughly equal long upper and lower shadows, representing indecision and equilibrium between buyers and sellers. When appearing at an extended trend, it signals potential reversal.',
    institutionalRule: 'Spinning Top = Indecision. Interpretation: Reversal.'
  },
  {
    id: 'q-cs-2',
    topic: 'candlesticks',
    difficulty: 'beginner',
    question: 'What is the key characteristic and meaning of a Marubozu candlestick pattern?',
    options: [
      'Long upper wick with tiny body; represents rejection',
      'Long solid body with almost NO shadows/wicks, representing total dominance',
      'A cross with identical open and close price',
      'Three consecutive small green bars'
    ],
    correctIndex: 1,
    explanation: 'Marubozu means "dominance". It features a very long solid body with virtually no upper or lower shadows. If it appears in a downtrend, buyers have turned optimistic and sellers left resistance.',
    institutionalRule: 'Marubozu means dominance. Long body almost no shadows. Interpretation: reversal or continuation of trend.'
  },
  {
    id: 'q-cs-3',
    topic: 'candlesticks',
    difficulty: 'beginner',
    question: 'Under what specific market condition does a Doji candlestick pattern NOT work effectively?',
    options: [
      'In strong trending uptrends',
      'In strong trending downtrends',
      'In a sideways / consolidating market',
      'On 4-hour timeframes'
    ],
    correctIndex: 2,
    explanation: 'As stressed in the slides: "IT DOESN\'T WORK IN SIDEWAY MARKET. Market must be trending." In consolidation, balance is already normal, so a Doji carries zero edge.',
    institutionalRule: 'Doji doesn\'t work when market is consolidating. Market must be trending.'
  },
  {
    id: 'q-cs-4',
    topic: 'candlesticks',
    difficulty: 'beginner',
    question: 'A Hammer candlestick is formed after a downtrend. Does the color of the candle body matter?',
    options: [
      'Yes, it MUST be green to be a valid hammer',
      'Yes, it MUST be red to be a valid hammer',
      'No, it doesn\'t matter if candle is bullish or bearish',
      'It is only valid if it has no body at all'
    ],
    correctIndex: 2,
    explanation: 'Technical curriculum specifically highlights: "Doesn\'t matter if candle is bullish or bearish." The essential criterion is a short body with a long lower wick at least twice its size, found in a downtrend.',
    institutionalRule: 'Found in downtrend. Short body, long lower wick. Bullish reversal. Doesn\'t matter if bullish or bearish.'
  },
  {
    id: 'q-cs-5',
    topic: 'candlesticks',
    difficulty: 'intermediate',
    question: 'What differentiates a Hanging Man from a Hammer pattern since they share the same physical shape?',
    options: [
      'Hammer is found in a downtrend (bullish reversal); Hanging Man is found in an uptrend (bearish reversal)',
      'Hanging Man only appears on cryptocurrency charts',
      'Hammer always has a giant upper wick',
      'Hanging Man is always green while Hammer is always red'
    ],
    correctIndex: 0,
    explanation: 'Both feature short bodies and long lower wicks. However, the Hammer forms at the bottom of a downtrend as a bullish reversal, whereas the Hanging Man forms at the peak of an uptrend as a bearish reversal warning.',
    institutionalRule: 'Hanging Man: Short body, long wicks. Found in UPTREND. Interpretation: Bearish Reversal.'
  },
  {
    id: 'q-cs-6',
    topic: 'candlesticks',
    difficulty: 'intermediate',
    question: 'What are the two mandatory requirements for a valid Bullish Engulfing pattern?',
    options: [
      'Market in sideways chop AND candle must have zero wicks',
      '1) Market must be in a downtrend, 2) The bullish candle must fully engulf the previous bearish candle body',
      'Market in uptrend AND both candles must be green',
      'Needs 3 consecutive bars of identical size'
    ],
    correctIndex: 1,
    explanation: 'From technical analysis core doctrine: "It needs two candlesticks to be valid. The Buyers have turned optimistic. Key requirement is: 1) The market must be in a downtrend, 2) The bullish candle must fully engulf the previous bearish candle."',
    institutionalRule: 'Bullish Engulfing: 2 candle pattern. Found in downtrend. Bullish candle fully engulfs bearish candle.'
  },
  {
    id: 'q-cs-7',
    topic: 'candlesticks',
    difficulty: 'intermediate',
    question: 'In a Morning Star pattern, what is the rule regarding the 2nd (middle) candlestick?',
    options: [
      'The 2nd candle MUST be a giant green Marubozu',
      'The 2nd candle can be bullish or bearish, it doesn\'t matter',
      'The 2nd candle must be larger than the first candle',
      'The 2nd candle must have no wicks whatsoever'
    ],
    correctIndex: 1,
    explanation: 'From the slide on Morning Star: "1st candle must be Bearish, 2nd candle is bearish/bullish doesn\'t matter, 3rd candle must be Bullish. Formed in downtrend."',
    institutionalRule: '2nd candle can be bullish or bearish doesn\'t matter. 3rd candle must close bullish to confirm reversal.'
  },
  {
    id: 'q-cs-8',
    topic: 'candlesticks',
    difficulty: 'advanced',
    question: 'What characterizes the "Three White Soldiers" candlestick pattern?',
    options: [
      'Three consecutive green candles, 2nd bigger than 1st, 3rd with no or small upper shadow, found after downtrend',
      'Three red candles closing below each other in an uptrend',
      'One large green candle followed by two red dojis',
      'Three consecutive spinning tops inside a channel'
    ],
    correctIndex: 0,
    explanation: 'Slide 11 states: "1st candle bullish, 2nd candle bullish, bigger than first candle, 3rd candle bullish with no or small upper shadow. Found after downtrend. Very powerful bullish trend reversal pattern."',
    institutionalRule: 'Three White Soldiers: Very powerful bullish trend reversal after a downtrend.'
  },
  {
    id: 'q-cs-9',
    topic: 'candlesticks',
    difficulty: 'intermediate',
    question: 'In a Bullish Harami pattern, which candle is engulfed?',
    options: [
      'The large red candle fully engulfs the small bullish (green) candle inside its body',
      'The small candle engulfs the huge candle',
      'Both candles must be of exactly equal length',
      'The green candle engulfs a red hammer'
    ],
    correctIndex: 0,
    explanation: 'Slide 15 explicitly notes: "The red candle fully engulfs small bullish candle. Found in downtrend. Interpretation: bullish reversal. Easy to spot."',
    institutionalRule: 'Bullish Harami: Large red mother candle engulfs the small green inside candle in a downtrend.'
  },

  // Chart Patterns
  {
    id: 'q-cp-1',
    topic: 'chart_patterns',
    difficulty: 'beginner',
    question: 'How do you determine the price target for a Symmetrical Triangle breakout?',
    options: [
      'Arbitrary 50 pips above the apex',
      'Target equals the measured vertical height of the base of the triangle projected from the breakout',
      'Always 10% above the highest wick',
      'There is no technical target for triangles'
    ],
    correctIndex: 1,
    explanation: 'As illustrated on slide 17, the target is calculated by measuring the vertical distance between the highest resistance peak and lowest support trough of the triangle base and projecting it from the breakout point.',
    institutionalRule: 'Target = Vertical height of the triangle base projected in the direction of the breakout.'
  },
  {
    id: 'q-cp-2',
    topic: 'chart_patterns',
    difficulty: 'intermediate',
    question: 'What are the structural criteria for an Ascending Triangle in technical analysis?',
    options: [
      'Sloping downward resistance with flat support floor',
      'At least two resistance lines in horizontal sequence (Straight) and at least two parallel [ascending] support lines',
      'Two curved peaks that look like the letter M',
      'A sharp flagpole followed by an upward channel'
    ],
    correctIndex: 1,
    explanation: 'Slide 18 specifies: "Need at least two resistance line in \'Horizontal sequence\' (Straight). Need at least two parallel support lines. Support line towards upside. BULLISH PATTERN. Interpretation: wait for breakout."',
    institutionalRule: 'Ascending Triangle = Horizontal ceiling + Rising ascending support floor. Bullish breakout bias.'
  },
  {
    id: 'q-cp-3',
    topic: 'chart_patterns',
    difficulty: 'intermediate',
    question: 'What best describes a Descending Triangle pattern?',
    options: [
      'A bullish pattern formed exclusively at all-time highs',
      'At least two descending resistance highs towards downside and at least two support levels in a straight horizontal line; Bearish pattern',
      'A pattern with three rising peaks of equal height',
      'A rounded bowl followed by an ascending handle'
    ],
    correctIndex: 1,
    explanation: 'Slide 19 states: "Need at least two lows of the resistance level towards downside. Need at least two support levels \'In a straight line sequence\' (Horizontal). BEARISH PATTERN. Interpretation: wait for breakdown."',
    institutionalRule: 'Descending Triangle: Descending upper line + flat horizontal support. Bearish breakdown bias.'
  },
  {
    id: 'q-cp-4',
    topic: 'chart_patterns',
    difficulty: 'advanced',
    question: 'Which timeframes are specifically recommended for trading the Head & Shoulders pattern?',
    options: [
      '1 minute and 5 minute scalp charts',
      'Always use bigger time frames: 4 hour, the daily chart for best results',
      'Weekly charts only',
      'Timeframes have zero impact on chart pattern reliability'
    ],
    correctIndex: 1,
    explanation: 'Slide 20 clearly instructs: "Always use bigger time frames for this pattern - 4 hour, the daily chart for best results." Slide 21 also adds the 1-hour chart for Inverse H&S.',
    institutionalRule: 'Always use bigger time frames for Head & Shoulders (4h, daily) to avoid false breakdown noise.'
  },
  {
    id: 'q-cp-5',
    topic: 'chart_patterns',
    difficulty: 'beginner',
    question: 'A Double Bottom pattern resembles which letter and indicates what market action upon breaking the neckline?',
    options: [
      'Resembles letter "M", indicates price will crash',
      'Resembles letter "W", indicates bullish rally to the upside upon breaking the neckline',
      'Resembles letter "V", indicates a consolidation channel',
      'Resembles letter "H", indicates a halt in trading'
    ],
    correctIndex: 1,
    explanation: 'Slide 22: "Resembles as the letter \'W\'. Formed at the end of the downtrend. Bullish reversal pattern. Interpretation: upon breaking the neckline, bullish rally to the upside."',
    institutionalRule: 'Double Bottom = "W" formation at the end of downtrend. Bullish rally upon neckline break.'
  },
  {
    id: 'q-cp-6',
    topic: 'chart_patterns',
    difficulty: 'intermediate',
    question: 'Where is the Double Top chart pattern found, and what does it indicate?',
    options: [
      'Found only in downtrends; indicates an explosive pump',
      'BEARISH REVERSAL PATTERN - ONLY FOUND IN UPTREND - INDICATES PRICE IS ABOUT TO DROP',
      'Found anywhere; indicates sideways consolidation',
      'Found in foreign exchange markets only'
    ],
    correctIndex: 1,
    explanation: 'Slide 23 clearly highlights: "DOUBLE TOP: - BEARISH REVERSAL PATTERN - ONLY FOUND IN UPTREND - WHICH INDICATES THAT PRICE IS ABOUT TO DROP."',
    institutionalRule: 'Double Top is ONLY found in an uptrend, signaling an imminent drop once neckline breaks.'
  },
  {
    id: 'q-cp-7',
    topic: 'chart_patterns',
    difficulty: 'intermediate',
    question: 'What is the target for both Bull Flag and Bear Flag chart patterns upon breakout/breakdown?',
    options: [
      'Target would be the size of the flag pole',
      'Target is always double the account size',
      'Target is limited to 10 pips only',
      'Target is measured by the width of the flag channel'
    ],
    correctIndex: 0,
    explanation: 'Slides 24 & 25 state: "Target: Target would be the size of flag pole towards upside [for Bull Flag] / towards downside [for Bear Flag]."',
    institutionalRule: 'Flag target = exact length of the preceding flagpole projected from breakout point.'
  },
  {
    id: 'q-cp-8',
    topic: 'chart_patterns',
    difficulty: 'intermediate',
    question: 'What is the visual structure of a Falling Wedge and what zone is it labeled as in technical analysis?',
    options: [
      'Narrow at the top and wide at the bottom; labeled a selling zone',
      'Widest at the top and becomes narrower as it moves downward with tighter price action; labeled a "Buying zone"',
      'A rectangular box with flat top and bottom',
      'A vertical spike followed by immediate capitulation'
    ],
    correctIndex: 1,
    explanation: 'Slide 27: "Falling wedge is widest at the top and becomes narrower as it moves downward, with tighter price action. Interpretation: wait for breakout, after breakout buy... Buying zone."',
    institutionalRule: 'Falling Wedge = Bullish reversal buying zone as price compresses downward.'
  },
  {
    id: 'q-cp-9',
    topic: 'chart_patterns',
    difficulty: 'intermediate',
    question: 'In a Rising Wedge pattern, what is true about the slope of the support line compared to the resistance line?',
    options: [
      'The support line is steeper than the resistance line, leading to a breakdown selling zone',
      'The support line is completely flat and horizontal',
      'The resistance line slopes downwards while support slopes upwards',
      'Both lines are completely parallel'
    ],
    correctIndex: 0,
    explanation: 'Slide 28 states: "The resistance line is moving in ascending way, while the support line is steeper than resistance line. Interpretation: wait for breakdown & sell. Breakdown, selling zone."',
    institutionalRule: 'Rising Wedge = Support steeper than resistance. Bearish reversal breakdown selling zone.'
  },

  // Trendlines
  {
    id: 'q-tl-1',
    topic: 'trendlines',
    difficulty: 'beginner',
    question: 'How many taps of the price on a trendline are needed for it to be considered a valid trendline?',
    options: [
      'At least 1 tap',
      'At least 2 taps (anything above 2 taps is a plus point)',
      'Exactly 10 taps',
      'Taps do not matter as long as you draw a diagonal line'
    ],
    correctIndex: 1,
    explanation: 'Slide 5 of the Trendlines PDF states in all caps: "TO BE A VALID TRENDLINE WE NEED AT LEAST 2 TAPS OF THE PRICE ON TRENDLINE IN UPTREND OR DOWNTREND, ANYTHING ABOVE 2 TAPS IS PLUS POINT."',
    institutionalRule: 'Minimum 2 taps required to validate a trendline. 3+ taps provides institutional confirmation.'
  },
  {
    id: 'q-tl-2',
    topic: 'trendlines',
    difficulty: 'beginner',
    question: 'In an uptrend, what function does the trendline serve?',
    options: [
      'Trend line acting as resistance above the peaks',
      'Trend line acting as dynamic support below higher lows',
      'It acts as an oscillator centerline',
      'It acts as an indicator of volume only'
    ],
    correctIndex: 1,
    explanation: 'Slide 3 shows an uptrend with the line drawn beneath the rising lows, labeled: "TREND LINE ACTING AS SUPPORT".',
    institutionalRule: 'Uptrend trendline connects higher lows and acts as dynamic support.'
  },
  {
    id: 'q-tl-3',
    topic: 'trendlines',
    difficulty: 'intermediate',
    question: 'What happens when an established trendline is broken according to technical breakout strategy?',
    options: [
      'Nothing, trendlines have no strategic predictive value',
      'Trend-line broken = Trend changed (indicates trend reversal upon breaking out or breaking down)',
      'The broker automatically closes your account',
      'Price will always retrace 100% of the entire move immediately'
    ],
    correctIndex: 1,
    explanation: 'Slide 6 & 7 of the Trendlines PDF explicitly label the charts: "TREND-LINE BROKEN TREND CHANGED" and "TREND-LINE BREAKOUT TREND CHANGED. Trendline shows us about the trend reversal."',
    institutionalRule: 'Trendline breakout or breakdown signals trend reversal and adds confluence to our system.'
  },

  // Indicators - 4EMA & RSI Divergence
  {
    id: 'q-ind-1',
    topic: 'indicators',
    difficulty: 'intermediate',
    question: 'What are the four EMA lengths configured in the 4EMA indicator presented in the guide?',
    options: [
      '10, 20, 50, 200',
      '8 (or 9), 12 (or 13), 21, and 55',
      '5, 15, 30, 60',
      '14, 28, 42, 56'
    ],
    correctIndex: 1,
    explanation: 'Slides 4-6 in the 4EMA PDF show the exact settings dialogue: Length 1 = 8 (or 9), Length 2 = 12 (or 13), Length 3 = 21, Length 4 = 55. This combination tracks immediate, short, intermediate, and macro trend momentum.',
    institutionalRule: '4EMA uses 8, 12, 21, 55 (or 9, 13, 21, 55) as dynamic support, resistance, and trend indicators.'
  },
  {
    id: 'q-ind-2',
    topic: 'indicators',
    difficulty: 'intermediate',
    question: 'What constitutes a Regular Bullish Divergence on the RSI indicator?',
    options: [
      'Price is making a Lower Low while RSI is making a Higher Low',
      'Price is making a Higher High while RSI is making a Higher High',
      'Price is making a Higher High while RSI is making a Lower High',
      'Price is moving sideways while RSI is pegged at 50'
    ],
    correctIndex: 0,
    explanation: 'Slide 3 of the RSI Divergence PDF: "BULLISH DIVERGENCE: Price [Lower Low], Indicator [Higher Low]. Bullish reversal."',
    institutionalRule: 'Regular Bullish Divergence = Price makes Lower Low, RSI makes Higher Low -> Reversal upward.'
  },
  {
    id: 'q-ind-3',
    topic: 'indicators',
    difficulty: 'intermediate',
    question: 'What constitutes a Regular Bearish Divergence on the RSI indicator?',
    options: [
      'Price is making a Lower Low while RSI is making a Lower Low',
      'Price is making a Higher High while RSI is making a Lower High',
      'Price is making a Lower High while RSI is making a Higher High',
      'Price crosses below the 55 EMA'
    ],
    correctIndex: 1,
    explanation: 'Slide 7 of the RSI Divergence PDF: "BEARISH DIVERGENCE: Price [Higher High], Indicator [Lower High]. Bearish reversal."',
    institutionalRule: 'Regular Bearish Divergence = Price makes Higher High, RSI makes Lower High -> Reversal downward.'
  },
  {
    id: 'q-ind-4',
    topic: 'indicators',
    difficulty: 'advanced',
    question: 'What constitutes a Hidden Bullish Divergence, and what does it indicate?',
    options: [
      'Price is making a Higher Low while RSI is making a Lower Low; indicates UPTREND CONTINUATION',
      'Price is making a Lower Low while RSI is making a Higher High; indicates market crash',
      'Price is making a Higher High while RSI is making a Lower Low; indicates complete chaos',
      'RSI is hidden behind the price candles'
    ],
    correctIndex: 0,
    explanation: 'Slide 5 of the RSI Divergence PDF: "HIDDEN BULLISH DIVERGENCE: Price [Higher Low], Indicator [Lower Low]." Unlike regular divergence which signals reversal, hidden divergence signals strong trend continuation.',
    institutionalRule: 'Hidden Bullish Divergence = Price Higher Low, RSI Lower Low -> Uptrend continuation.'
  },
  {
    id: 'q-ind-5',
    topic: 'indicators',
    difficulty: 'advanced',
    question: 'What is the institutional guideline for trading RSI Divergences for highest reliability?',
    options: [
      'Immediately enter market orders the instant RSI touches 30 or 70 without looking at the chart',
      'Add 2-3 more confluences to your setup (e.g. support & resistance, candlesticks, chart patterns) and check bigger timeframes',
      'Only trade divergences on the 1-minute chart with 100x leverage',
      'Ignore all price action and rely solely on the divergence line'
    ],
    correctIndex: 1,
    explanation: 'Slide 11 of the RSI Divergence PDF specifies: "RSI DIVERGENCE STRATEGY: *) For the best results of the divergence add 2-3 more confluence to your setup e.g support and resistance, candlesticks, chart patterns. *) Check bigger time frame for confirmations."',
    institutionalRule: 'Never trade divergence alone. Add 2-3 confluences (S/R, candlesticks, patterns) & check bigger timeframes.'
  },

  // Risk Management & Position Sizing
  {
    id: 'q-rm-1',
    topic: 'risk_management',
    difficulty: 'beginner',
    question: 'What is the famous quote by Bernard Baruch highlighted in the guide?',
    options: [
      '"Greed is good, leverage up to the moon"',
      '"In trading/investing it\'s not about how much you make, but how much you don\'t lose"',
      '"Never use a stop loss because the market will always come back"',
      '"The trend is your friend until the very end"'
    ],
    correctIndex: 1,
    explanation: 'Slide 2 of the Risk Management PDF prominently features Bernard Baruch\'s wisdom: "In trading/investing it\'s not about how much you make, but how much you don\'t lose."',
    institutionalRule: 'Capital preservation is king: It\'s not about how much you make, but how much you don\'t lose.'
  },
  {
    id: 'q-rm-2',
    topic: 'risk_management',
    difficulty: 'beginner',
    question: 'What baseline percentage of your trading capital should you risk per trade in the beginning?',
    options: [
      '10% to 20%',
      '1-2% of the capital per trade',
      '50% on A+ setups',
      'All of it if you feel confident'
    ],
    correctIndex: 1,
    explanation: 'Slides 5 & 8 of the Risk Management PDF state: "Most traders are comfortable risking 1-2 of the capital per trade. 1-2% risk per trade is the baseline to start with... Consistency and patience is the key to success."',
    institutionalRule: 'Always risk 1-2% of your portfolio per trade. Never gamble.'
  },
  {
    id: 'q-rm-3',
    topic: 'risk_management',
    difficulty: 'intermediate',
    question: 'In a 30-trade probability model, what happens if you win only 15 trades (50% accuracy) with a 3R Risk/Reward ratio on a $6,000 portfolio risking 2% ($120) per trade?',
    options: [
      'You break even at $0 net profit',
      'You make $3,600 net profit (Total Profit $5,400 minus Total Loss $1,800)',
      'You lose $1,800 due to commissions',
      'You double your portfolio to $12,000'
    ],
    correctIndex: 1,
    explanation: 'Slide 6 shows the exact math: 15 wins x $360 profit = $5,400. 15 losses x $120 = $1,800. Final outcome = $5,400 - $1,800 = $3,600 still in profit! This demonstrates the immense mathematical power of positive Risk/Reward.',
    institutionalRule: 'With 3R and 50% accuracy, you generate massive profit even while being wrong half the time!'
  },
  {
    id: 'q-rm-4',
    topic: 'risk_management',
    difficulty: 'intermediate',
    question: 'What common misconception about Position Size is critical to dispel?',
    options: [
      'That position size and risk amount are the exact same thing',
      'That stop losses should be set randomly',
      'That leverage changes your stop loss distance',
      'That trading requires a computer'
    ],
    correctIndex: 0,
    explanation: 'Slide 3 of the Position Size Calculation PDF: "COMMON MISCONCEPTIONS FOR NEWBIES: POSITION SIZE AND RISK AMOUNT ARE NOT THE SAME! If Capital is $1000 and risking 1% ($10), it means loss is limited to $10 upon hitting SL. It does NOT mean position size is $10."',
    institutionalRule: 'Position size and risk amount are NOT the same. Risk is what you lose if SL hits.'
  },
  {
    id: 'q-rm-5',
    topic: 'risk_management',
    difficulty: 'advanced',
    question: 'What is the classic mathematical formula for calculating position size?',
    options: [
      'Position Size = Capital x Leverage x 100',
      'Position Size = Capital x Risk% / Stop Loss%',
      'Position Size = Entry Price / Stop Loss Price',
      'Position Size = Risk Amount x Take Profit Target'
    ],
    correctIndex: 1,
    explanation: 'Slide 4 & 5 of the Position Size PDF states: "THE SIMPLEST FORMULA WHICH I USE: CAPITAL X RISK / STOP LOSS. Example: 10000 x 1% / 3.23% = 3095 USD position size."',
    institutionalRule: 'Position Size = (Capital x Risk%) / Stop Loss %.'
  },

  // Psychology
  {
    id: 'q-psy-1',
    topic: 'psychology',
    difficulty: 'beginner',
    question: 'In the risk management boat metaphor, what does Boat A (with life jacket) represent?',
    options: [
      'A trader who uses an expensive Bloomberg terminal',
      'A trader with strict risk management whose account survives series of losses and drawdowns',
      'A boat that never goes into deep waters',
      'A trader who never takes any trades'
    ],
    correctIndex: 1,
    explanation: 'Slide 4 of the Risk Management PDF: "This is how risk management saves us when we face series of loss and drawdown in trading. When the boat sinks the life jacket saves our life, same is the case with risk management."',
    institutionalRule: 'Risk management is your life jacket in the market ocean. Without it, one storm sinks you.'
  },
  {
    id: 'q-psy-2',
    topic: 'psychology',
    difficulty: 'intermediate',
    question: 'Which of the 7 psychological challenges causes traders to refuse to take a loss and move their stop-loss further away?',
    options: [
      'Greed',
      'Fear',
      'Denial',
      'Excitement'
    ],
    correctIndex: 2,
    explanation: 'Denial causes traders to refuse to accept that their analysis was invalidated. Instead of cutting the loss at 1%, they widen or remove their stop loss, frequently resulting in catastrophic account blowouts.',
    institutionalRule: 'Denial destroys accounts. Accept the small statistical loss and protect your capital.'
  },
  {
    id: 'q-psy-3',
    topic: 'psychology',
    difficulty: 'intermediate',
    question: 'How should a professional trader manage excitement and cockiness after a 4-trade winning streak?',
    options: [
      'Immediately double your risk to 5% or 10% because you are "in the zone"',
      'Maintain exact identical 1-2% risk discipline, stay humble, and recognize euphoria is dangerous',
      'Post on social media and tell everyone you cannot fail',
      'Quit trading forever'
    ],
    correctIndex: 1,
    explanation: 'Cockiness leads to oversized positions and sloppiness right at the peak of a winning streak. Professional traders treat winning trades with quiet humility and never increase risk on emotion.',
    institutionalRule: 'Consistency and patience is the key to success. Never let a winning streak breed arrogance.'
  },
  // Market Structure & Smart Money Concepts
  {
    id: 'q-ms-1',
    topic: 'market_structure',
    difficulty: 'beginner',
    question: 'What is the absolute requirement for a valid Break of Structure (BOS) in an uptrend?',
    options: [
      'Price simply touches the previous high with a thin wick',
      'A candlestick must firmly CLOSE its body above the prior swing high on that timeframe',
      'The RSI must be over 80',
      'It must occur during the Asian trading session'
    ],
    correctIndex: 1,
    explanation: 'A valid Break of Structure requires a full candlestick BODY CLOSE beyond the structural swing point. If only a wick pierces the high and quickly pulls back, it is categorized as a liquidity sweep, not a confirmed BOS.',
    institutionalRule: 'Body closes break structure; wicks hunt liquidity. Never confuse the two.'
  },
  {
    id: 'q-ms-2',
    topic: 'market_structure',
    difficulty: 'intermediate',
    question: 'How does a Change of Character (CHOCH) differ from a Break of Structure (BOS)?',
    options: [
      'CHOCH confirms trend continuation; BOS indicates a reversal',
      'BOS confirms trend continuation (Higher High broken in an uptrend), while CHOCH is the first structural signal of a trend reversal (breaking the last Higher Low in an uptrend)',
      'They are completely identical terms with no difference',
      'CHOCH can only occur in crypto markets'
    ],
    correctIndex: 1,
    explanation: 'BOS (Break of Structure) means the current trend is continuing by breaking the previous high in an uptrend or previous low in a downtrend. CHOCH (Change of Character) signals a shift in market regime when the sequence breaks (e.g. price drops below the previous higher low in an uptrend).',
    institutionalRule: 'BOS continues the story; CHOCH turns the page to a new chapter.'
  },
  {
    id: 'q-ms-3',
    topic: 'market_structure',
    difficulty: 'advanced',
    question: 'Why does a Break of Structure (BOS) or CHOCH on a 4-Hour or Daily timeframe carry far more weight than on a 1-Minute chart?',
    options: [
      'Because higher timeframe candles reflect billions of dollars of institutional capital commitments and order book depth, while 1M charts are dominated by algorithmic noise and retail spread fluctuations',
      'Because the broker charges higher fees on 1-minute charts',
      'Because 4-hour charts have greener candles',
      'There is no difference in reliability between timeframes'
    ],
    correctIndex: 0,
    explanation: 'Higher timeframe candles aggregate orders across multiple hours or days, representing genuine capital reallocation by sovereign funds, central banks, and major market makers. Lower timeframes are prone to false breaks caused by micro spread widening and high-frequency algorithms.',
    institutionalRule: 'The higher the timeframe, the deeper the institutional footprint. Always align lower timeframe entries with higher timeframe structure.'
  },
  // Liquidity & Order Book Economics
  {
    id: 'q-liq-1',
    topic: 'liquidity',
    difficulty: 'beginner',
    question: 'In Smart Money Concepts, what does "Liquidity" refer to in the market?',
    options: [
      'How fast money can be withdrawn to your bank account',
      'Resting orders (specifically stop losses and breakout orders) sitting at obvious chart levels like double tops, double bottoms, and trendlines',
      'The amount of cash in the broker\'s corporate account',
      'A chart pattern shaped like a water drop'
    ],
    correctIndex: 1,
    explanation: 'Liquidity refers to the volume of resting orders in the central order book. Retail traders place stop losses at obvious support and resistance levels. These clusters of stop orders represent liquidity pools that institutions require to execute large-volume trades.',
    institutionalRule: 'Liquidity is the fuel that moves the market engine. Price moves from one liquidity pool to the next.'
  },
  {
    id: 'q-liq-2',
    topic: 'liquidity',
    difficulty: 'intermediate',
    question: 'From an economics and order book perspective, why do institutional market makers sweep retail stop losses below double bottoms?',
    options: [
      'Because market makers want to be mean to retail beginners',
      'Because a retail Stop Loss on a BUY position is technically a SELL STOP market order, providing the massive sell volume institutions require to fill their massive BUY orders without slippage',
      'Because the broker wants to keep the spread fees',
      'Because double bottoms are mathematically illegal'
    ],
    correctIndex: 1,
    explanation: 'Institutions trading hundreds of millions of dollars need massive counterparty volume. When retail traders put their stops under double bottoms, they create a dense pool of SELL orders. Smart money pushes price down to trigger those sell stops, providing the exact matching sell liquidity to fill their huge buy positions at discount prices.',
    institutionalRule: 'Institutions need counterparties. If you place your stop where everyone else does, you are providing the fuel for their trade.'
  },
  {
    id: 'q-liq-3',
    topic: 'liquidity',
    difficulty: 'advanced',
    question: 'What is Buy-Side Liquidity (BSL) and where does it reside?',
    options: [
      'It resides below the lowest wick of the previous year',
      'It sits directly above prominent swing highs, double tops, and resistance levels, composed of short sellers\' stop losses and buy-stop breakout orders',
      'It is only found during the Christmas holiday period',
      'It is money held by retail banks in checking accounts'
    ],
    correctIndex: 1,
    explanation: 'Buy-Side Liquidity (BSL) consists of buy orders resting above key price highs. When price sweeps these highs, those buy orders are triggered, providing exit liquidity for institutional long holders taking profit, or entry liquidity for institutional short sellers.',
    institutionalRule: 'Above every equal high lies Buy-Side Liquidity waiting to be consumed.'
  },
  // Stop Loss & Take Profit Engineering
  {
    id: 'q-sltp-1',
    topic: 'risk_management',
    difficulty: 'beginner',
    question: 'Where should a disciplined trader place their Stop Loss according to the Golden Structural Invalidation Rule?',
    options: [
      'Exactly 10 pips away regardless of market conditions',
      'At the exact swing low wick with zero breathing room',
      'Beyond the structural invalidation point plus an ATR spread buffer (1.5x ATR or 3-5 pips) to prevent spread spikes from hunting the position',
      'Traders should never use a stop loss'
    ],
    correctIndex: 2,
    explanation: 'A professional stop loss is placed beyond the structural invalidation point with an added ATR buffer. This accounts for broker spread inflation during high-impact news and volatility, ensuring you are only stopped out when your analysis is genuinely invalidated.',
    institutionalRule: 'Amateurs adjust their stop loss to fit their greed. Professionals adjust their lot size to fit their structural stop loss.'
  },
  {
    id: 'q-sltp-2',
    topic: 'risk_management',
    difficulty: 'intermediate',
    question: 'What is the primary benefit of the Multi-Target Scaling strategy (TP1 at 1:2 R:R and moving SL to breakeven)?',
    options: [
      'It increases broker commissions',
      'It locks in 50% realized profit and renders the remaining position 100% risk-free, eliminating psychological stress',
      'It guarantees you will never have a losing day in your life',
      'It allows you to trade with 100x leverage'
    ],
    correctIndex: 1,
    explanation: 'Closing 50% at TP1 (1:2 R:R) and trailing the Stop Loss to Breakeven secures banked profit and ensures that even in the event of an abrupt macro reversal, the overall trade finishes green. This builds consistent equity curves and protects emotional capital.',
    institutionalRule: 'A winning trade must never be permitted to morph into a red trade once initial structural targets are met.'
  }
];
