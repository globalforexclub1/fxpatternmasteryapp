import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { CANDLESTICK_PATTERNS, CHART_PATTERNS } from './src/data/patternsData.ts';
import { INDICATOR_TOPICS, RSI_DIVERGENCES } from './src/data/indicatorsData.ts';
import { QUIZ_QUESTIONS } from './src/data/quizData.ts';
import { EMOTIONAL_CHALLENGES, BERNARD_BARUCH_QUOTE, BOAT_METAPHOR } from './src/data/psychologyData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'PatternMaster Pro - Technical Analysis Mastery',
    instructor: 'Charlton Nicholas',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/patterns', (req: Request, res: Response) => {
  const { type, bias, difficulty } = req.query;
  
  let candlesticks = [...CANDLESTICK_PATTERNS];
  let chartPatterns = [...CHART_PATTERNS];

  if (bias && typeof bias === 'string') {
    candlesticks = candlesticks.filter(p => p.bias === bias || p.bias === 'either');
    chartPatterns = chartPatterns.filter(p => p.bias === bias || p.bias === 'either');
  }

  if (difficulty && typeof difficulty === 'string') {
    candlesticks = candlesticks.filter(p => p.difficulty === difficulty);
    chartPatterns = chartPatterns.filter(p => p.difficulty === difficulty);
  }

  if (type === 'candlesticks') {
    return res.json({ candlesticks, total: candlesticks.length });
  }
  if (type === 'charts') {
    return res.json({ chartPatterns, total: chartPatterns.length });
  }

  return res.json({
    candlesticks,
    chartPatterns,
    totalCandlesticks: candlesticks.length,
    totalChartPatterns: chartPatterns.length,
    totalPatterns: candlesticks.length + chartPatterns.length
  });
});

// Position Size Calculator Endpoint
// Formula from Charlton Nicholas slides: Position Size = (Capital * Risk%) / Stop Loss%
app.post('/api/calculate-position', (req: Request, res: Response) => {
  try {
    const {
      capital = 10000,
      riskPercentage = 1,
      entryPrice = 14650,
      stopLossPrice = 14177,
      takeProfitPrice = 16500,
      assetType = 'crypto',
      leverage = 1
    } = req.body;

    const numCapital = Number(capital);
    const numRiskPct = Number(riskPercentage);
    const numEntry = Number(entryPrice);
    const numSL = Number(stopLossPrice);
    const numTP = Number(takeProfitPrice);
    const numLev = Number(leverage) || 1;

    if (numCapital <= 0 || numRiskPct <= 0 || numEntry <= 0 || numSL <= 0) {
      return res.status(400).json({
        error: 'Invalid input numbers. Capital, risk percentage, entry price, and stop loss price must be positive numbers.'
      });
    }

    if (numEntry === numSL) {
      return res.status(400).json({
        error: 'Entry price and Stop Loss price cannot be identical.'
      });
    }

    const isLong = numEntry > numSL;
    const stopLossDistance = Math.abs(numEntry - numSL);
    const stopLossDistancePercent = (stopLossDistance / numEntry) * 100;
    const riskAmountUsd = (numCapital * numRiskPct) / 100;

    // Formula from slides: Capital x Risk% / Stop Loss%
    // e.g., 10000 * 1% / 3.23% = 3095.97 USD
    const positionSizeUsd = (numCapital * (numRiskPct / 100)) / (stopLossDistancePercent / 100);
    const positionUnits = positionSizeUsd / numEntry;

    let takeProfitDistancePercent = 0;
    let potentialProfitUsd = 0;
    let riskRewardRatio = 0;

    if (numTP > 0) {
      const tpDistance = Math.abs(numTP - numEntry);
      takeProfitDistancePercent = (tpDistance / numEntry) * 100;
      potentialProfitUsd = (positionSizeUsd * takeProfitDistancePercent) / 100;
      riskRewardRatio = Number((tpDistance / stopLossDistance).toFixed(2));
    }

    const marginRequiredUsd = positionSizeUsd / numLev;

    return res.json({
      success: true,
      data: {
        riskAmountUsd: Number(riskAmountUsd.toFixed(2)),
        stopLossDistancePercent: Number(stopLossDistancePercent.toFixed(2)),
        positionSizeUsd: Number(positionSizeUsd.toFixed(2)),
        positionUnits: Number(positionUnits.toFixed(4)),
        takeProfitDistancePercent: Number(takeProfitDistancePercent.toFixed(2)),
        potentialProfitUsd: Number(potentialProfitUsd.toFixed(2)),
        riskRewardRatio,
        marginRequiredUsd: Number(marginRequiredUsd.toFixed(2)),
        isLong,
        leverage: numLev,
        assetType,
        charltonSlideFormula: 'Capital x Risk% / Stop Loss%',
        calculationBreakdown: `${numCapital} x ${numRiskPct}% / ${stopLossDistancePercent.toFixed(2)}% = $${positionSizeUsd.toFixed(2)} USD`
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Calculation error' });
  }
});

// Quiz Questions Endpoint
app.get('/api/quiz', (req: Request, res: Response) => {
  const { topic, difficulty, count } = req.query;

  let filtered = [...QUIZ_QUESTIONS];

  if (topic && typeof topic === 'string' && topic !== 'all') {
    filtered = filtered.filter(q => q.topic === topic);
  }

  if (difficulty && typeof difficulty === 'string' && difficulty !== 'all') {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }

  const requestedCount = count ? Math.min(Number(count), filtered.length) : filtered.length;
  // Shuffle questions
  const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, requestedCount);

  return res.json({
    questions: shuffled,
    totalAvailable: filtered.length
  });
});

// Indicators & Psychology Endpoints
app.get('/api/indicators', (_req: Request, res: Response) => {
  return res.json({
    topics: INDICATOR_TOPICS,
    divergences: RSI_DIVERGENCES
  });
});

app.get('/api/psychology', (_req: Request, res: Response) => {
  return res.json({
    quote: BERNARD_BARUCH_QUOTE,
    boatMetaphor: BOAT_METAPHOR,
    challenges: EMOTIONAL_CHALLENGES
  });
});

// Serve static assets in production
const distPath = path.join(__dirname, 'dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Only listen if executed directly and not inside Vite dev server or tests
const isDirectExecution = process.argv[1] && (
  process.argv[1].endsWith('server.ts') || 
  process.argv[1].endsWith('server.js')
);

if (process.env.NODE_ENV !== 'test' && !process.env.VITE_DEV_SERVER && isDirectExecution) {
  app.listen(PORT, () => {
    console.log(`PatternMaster Pro server listening on port ${PORT}`);
  });
}

export default app;
