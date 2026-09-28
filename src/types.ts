export const TYPES_VERSION = '1.0.0';

export type PatternBias = 'bullish' | 'bearish' | 'neutral' | 'either';

export type PatternCategory = 'single-candle' | 'dual-candle' | 'triple-candle' | 'reversal-chart' | 'continuation-chart' | 'bilateral-chart';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CandlestickPattern {
  id: string;
  name: string;
  category: 'single-candle' | 'dual-candle' | 'triple-candle';
  bias: PatternBias;
  subtitle: string;
  characteristics: string[];
  interpretation: string;
  foundIn: 'downtrend' | 'uptrend' | 'any';
  keyRequirements: string[];
  entryPoint: string;
  stopLoss: string;
  takeProfitTarget: string;
  slideNotes: string;
  difficulty: DifficultyLevel;
  svgType: string;
  testedCount?: number;
}

export interface ChartPattern {
  id: string;
  name: string;
  category: 'reversal-chart' | 'continuation-chart' | 'bilateral-chart';
  bias: PatternBias;
  subtitle: string;
  criteria: string[];
  interpretation: string;
  formedIn: string;
  targetMeasurement: string;
  entryPoint: string;
  stopLoss: string;
  timeframeTip: string;
  slideNotes: string;
  difficulty: DifficultyLevel;
  svgType: string;
}

export interface DivergenceItem {
  id: string;
  name: string;
  bias: 'bullish' | 'bearish';
  category: 'regular' | 'hidden';
  priceAction: string;
  indicatorAction: string;
  interpretation: string;
  tradeType: 'reversal' | 'continuation';
  strategyTip: string;
}

export interface IndicatorTopic {
  id: string;
  name: string;
  shortName: string;
  category: 'momentum' | 'trend' | 'structure' | 'volatility';
  overview: string;
  parameters: string;
  keySignals: {
    bullish: string;
    bearish: string;
  };
  strategyInsights?: string[];
  institutionalStrategy?: string[];
  proTips: string;
  divergences?: DivergenceItem[];
}

export interface QuizQuestion {
  id: string;
  topic: 'candlesticks' | 'chart_patterns' | 'trendlines' | 'indicators' | 'risk_management' | 'psychology' | 'market_structure' | 'liquidity';
  difficulty: DifficultyLevel;
  question: string;
  patternId?: string;
  svgSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  goldenRule?: string;
  institutionalRule?: string;
}

export interface PositionCalculationParams {
  capital: number;
  riskPercentage: number;
  entryPrice: number;
  stopLossPrice: number;
  takeProfitPrice: number;
  assetType: 'crypto' | 'forex' | 'stocks';
  leverage: number;
}

export interface PositionCalculationResult {
  riskAmountUsd: number;
  stopLossDistancePercent: number;
  positionSizeUsd: number;
  positionUnits: number;
  takeProfitDistancePercent: number;
  potentialProfitUsd: number;
  riskRewardRatio: number;
  marginRequiredUsd: number;
  isLong: boolean;
  isValid: boolean;
  validationError?: string;
  effectiveFormulaUsed: string;
}

export interface UserBadge {
  id: string;
  name: string;
  title?: string;
  description: string;
  icon: string;
  xpReward: number;
  criteria: string;
  conditionDescription?: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  badges: string[];
  masteredPatterns: string[];
  streakDays: number;
  quizzesTaken: number;
  quizzesPassed: number;
  lastActiveDate: string;
}

export interface UserProgressState {
  xp: number;
  level: number;
  streakDays: number;
  studiedPatterns: string[];
  masteredIndicators: string[];
  completedQuizIds: string[];
  quizScores: Record<string, number>;
  calculationsPerformed: number;
  unlockedBadges: string[];
}

export interface VisualQuizQuestion {
  id: string;
  svgType: string;
  category: 'candlestick' | 'chart-pattern' | 'forex-structure';
  correctName: string;
  options: string[];
  hint: string;
  explanation: string;
  goldenRule?: string;
  institutionalRule?: string;
  bias: PatternBias;
  difficulty: DifficultyLevel;
}

export interface ForexSessionInfo {
  id: string;
  name: string;
  city: string;
  timeGmt: string;
  volatility: 'low' | 'moderate' | 'high' | 'peak';
  activePairs: string[];
  characteristics: string[];
  sessionRule: string;
}

export interface ForexPairProfile {
  symbol: string;
  name: string;
  category: 'major' | 'cross' | 'emerging';
  typicalSpreadPips: number;
  pipDigits: number;
  baseAsset: string;
  quoteAsset: string;
  description: string;
  marketInsight: string;
}

export interface LeadRegistration {
  id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  country: string;
  plan: 'free_demo' | 'full_academy' | 'face_to_face' | 'live_stream' | 'both';
  paymentReference?: string;
  status: 'pending' | 'active';
  createdAt: string;
}

export interface CandleDataPoint {
  index: number;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  annotation?: string;
}

export interface TradeSimulatorScenario {
  id: string;
  title: string;
  pair: string;
  assetType: 'forex' | 'gold' | 'indices';
  timeframe: string;
  session: string;
  setupName: string;
  recommendedBias: 'long' | 'short';
  context: string;
  confluences: string[];
  currentPrice: number;
  defaultEntry: number;
  defaultStopLoss: number;
  defaultTakeProfit: number;
  spreadPips: number;
  pipFactor: number;
  pipDecimals: number;
  initialCandles: CandleDataPoint[];
  forwardCandles: CandleDataPoint[];
  riskWarnings: string[];
  debriefSuccess: string;
  debriefFailure: string;
}
