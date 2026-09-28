export interface EmotionalChallenge {
  id: string;
  name: string;
  color: string;
  iconName: string;
  symptoms: string[];
  destructiveImpact: string;
  conquerProtocol: string[];
  institutionalRule: string;
}

export const BERNARD_BARUCH_QUOTE = {
  quote: "In trading/investing it's not about how much you make, but how much you don't lose.",
  author: "Bernard Baruch",
  lesson: "Capital preservation is the absolute priority of every successful trader. Once your capital is gone, you are out of the game."
};

export const BOAT_METAPHOR = {
  boatA: {
    title: "Boat A — Equipped with Life Jacket",
    subtitle: "Trader with Strict Risk Management (1-2% Per Trade)",
    description: "When the unexpected storm hits and consecutive losses occur, the life jacket keeps you afloat. Your account drawdown is shallow, your mind remains calm, and you survive to catch the next massive winning wave.",
    badge: "Survival & Longevity"
  },
  boatB: {
    title: "Boat B — No Life Jacket",
    subtitle: "Trader with No Stop Loss or Excessive Position Sizing",
    description: "One single unexpected wick, flash crash, or emotional revenge trade sinks the boat entirely. Years of accumulated profits and initial capital vanish in minutes.",
    badge: "Total Account Blowout"
  },
  question: "YOUR CHOICE: BOAT A OR BOAT B?",
  takeaway: "Managing the risk is the single most important thing in trading. Just like the boat, when the boat sinks, the life jacket saves our life—same is the case with risk management."
};

export const EMOTIONAL_CHALLENGES: EmotionalChallenge[] = [
  {
    id: 'greed',
    name: 'Greed',
    color: '#10b981',
    iconName: 'Coins',
    symptoms: [
      'Overleveraging your position beyond the 1-2% risk rule',
      'Refusing to take partial profits at designated resistance targets because "it might go higher"',
      'FOMO (Fear Of Missing Out) entering trades late after a parabolic green candle'
    ],
    destructiveImpact: 'Turns winning trades into devastating losses when market swiftly reverses. Wipes out weeks of discipline in a single day.',
    conquerProtocol: [
      'Strictly cap capital risk to 1-2% per trade, calculated before placing the order.',
      'Always pre-determine Take Profit (TP) orders and scale out mechanically.',
      'Accept that there will ALWAYS be another trade setup tomorrow.'
    ],
    institutionalRule: 'Never gamble. Our main job as a professional trader is to manage risk, not predict miracles.'
  },
  {
    id: 'fear',
    name: 'Fear',
    color: '#3b82f6',
    iconName: 'ShieldAlert',
    symptoms: [
      'Freezing and failing to execute an A+ setup that meets every single confluence rule',
      'Closing winning trades prematurely for pennies out of terror that the market will reverse',
      'Constantly moving stop loss to breakeven too early, suffocating normal market breathing'
    ],
    destructiveImpact: 'Destroys your Risk/Reward ratio. You take 0.5R on your winners while absorbing full 1R losses, causing inevitable negative expectancy.',
    conquerProtocol: [
      'Size down until the monetary dollar risk is an amount you can lose without feeling any physiological distress.',
      'Treat each trade as merely 1 out of a batch of 30 trades (the 30-trade probability mindset).',
      'Let the market hit either Stop Loss or Take Profit—no manual tinkering.'
    ],
    institutionalRule: 'Fear vanishes when your position size is mathematically small enough that a loss does not threaten your lifestyle.'
  },
  {
    id: 'denial',
    name: 'Denial',
    color: '#f59e0b',
    iconName: 'EyeOff',
    symptoms: [
      'Refusing to admit your trade thesis was invalidated by price action',
      'Widening or removing your stop loss when price moves against you',
      'Hoping and praying for a turnaround instead of accepting the statistical loss'
    ],
    destructiveImpact: 'A standard 1% loss mutates into a catastrophic 20%-50% drawdown that cripples both capital and confidence.',
    conquerProtocol: [
      'Acknowledge that taking a stop loss is simply the cost of doing business, like electricity for a storefront.',
      'Never move a stop loss further away under any circumstance—hard mechanical rule.',
      'If the technical pattern breaks down, the trade is dead. Exit immediately.'
    ],
    institutionalRule: 'The market does not know or care about your opinion. Respect the chart, cut the loss.'
  },
  {
    id: 'panic',
    name: 'Panic',
    color: '#ef4444',
    iconName: 'Flame',
    symptoms: [
      'Frantically hitting market buy/sell buttons during sudden volatility spikes or fakeouts',
      'Immediate revenge trading to make back money lost on the previous trade',
      'Rapidly switching timeframes from 4h to 1m in desperation'
    ],
    destructiveImpact: 'Execution at worst possible prices (slippage and spread), resulting in a cascade of rapid-fire losses.',
    conquerProtocol: [
      'When stopped out, institute a mandatory 30-minute "Step Away" rule away from your monitors.',
      'Remember that fakeouts are normal institutional liquidity sweeps (like the fakeout shown in slide 12).',
      'Never execute market orders in high volatility—wait for candle close confirmation.'
    ],
    institutionalRule: 'Panic occurs when you enter without a plan. If you have predefined entry, SL, and TP, panic has no room to exist.'
  },
  {
    id: 'depression',
    name: 'Depression & Despair',
    color: '#8b5cf6',
    iconName: 'CloudRain',
    symptoms: [
      'Feeling hopeless or stupid after a series of 3-4 consecutive losing trades',
      'Believing the market is personally rigged against you',
      'Loss of sleep, irritability, and dreading opening your charting software'
    ],
    destructiveImpact: 'Emotional burnout leading to either total abandonment of trading or reckless "all-in" gambles to recover.',
    conquerProtocol: [
      'Review the 30-Trade Math (slide 6-7): Even with 50% losses (15 losses), a 3R system yields $3,600 net profit on $6,000 capital!',
      'Understand that clusters of losses are statistically inevitable even in a 70% win-rate system.',
      'Take a 3-day trading hiatus. Recharge with nature, exercise, and mental clarity (slide 18-19).'
    ],
    institutionalRule: 'A losing trade does not define you as a trader. Your adherence to discipline defines you.'
  },
  {
    id: 'excitement',
    name: 'Excitement & Cockiness',
    color: '#ec4899',
    iconName: 'Zap',
    symptoms: [
      'Feeling invincible after 3 or 4 consecutive winning trades',
      'Bragging and doubling your risk from 1% to 5% or 10% because "you can\'t lose"',
      'Taking sloppy setups that do not meet your strict confluence checklist'
    ],
    destructiveImpact: 'Euphoria is the prelude to account blowouts. The oversized trade inevitably loses, wiping out all previous profits.',
    conquerProtocol: [
      'Treat winning trades with quiet humility; the market gave you what you planned for, nothing more.',
      'Maintain exact identical 1-2% risk sizing regardless of whether you just won 5 trades in a row.',
      'Recognize that euphoria is just as dangerous as panic.'
    ],
    institutionalRule: 'Consistency and patience is the key to success. Never let a winning streak make you arrogant.'
  },
  {
    id: 'anxiety',
    name: 'Anxiety',
    color: '#06b6d4',
    iconName: 'Activity',
    symptoms: [
      'Constantly checking your phone every 2 minutes while at dinner or in bed',
      'Physical tension, rapid heartbeat, and sweating during active trades',
      'Second-guessing every minor tick against your position'
    ],
    destructiveImpact: 'Severe mental fatigue, poor health, and impulsive interference with perfectly sound trading setups.',
    conquerProtocol: [
      'Shift your trading to higher timeframes (4-Hour and Daily) where price unfolds smoothly over hours, not seconds.',
      'Set alerts at your key levels and close the charting software (Set and Forget execution).',
      'Practice deep breathing and mental calm (slides 18-19: calmness and clarity under the tree or mountain).'
    ],
    institutionalRule: 'If an open trade makes your heart race, your position size is too big. Cut it in half.'
  }
];

export const PRE_TRADE_PSYCHOLOGY_CHECKLIST = [
  { id: 'c1', label: 'Am I calm, composed, and free from emotional desperation?', weight: 20 },
  { id: 'c2', label: 'Is my maximum dollar risk strictly calculated to 1-2% of my total capital?', weight: 20 },
  { id: 'c3', label: 'Do I have an exact predefined Stop Loss and Take Profit already planned?', weight: 20 },
  { id: 'c4', label: 'Am I trading a verified pattern with 2-3 confluences (S/R, Trendline, 4EMA/RSI)?', weight: 20 },
  { id: 'c5', label: 'Am I fully comfortable losing this specific dollar amount if the trade fails?', weight: 20 }
];
