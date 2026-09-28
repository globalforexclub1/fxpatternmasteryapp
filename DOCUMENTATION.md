# PatternMaster Pro — Complete Application Specification & Architecture Guide

> **Document Purpose:** This document is the master engineering specification and curriculum blueprint for **PatternMaster Pro: Technical Analysis & Capital Defense Academy**. If you need to recreate this application from scratch on any AI platform (Claude, ChatGPT, Cursor, Windsurf, v0, Bolt, or Gemini), this document contains all requirements, component architectures, data schemas, mathematical formulas, UX flows, and implementation details.

---

## 1. Executive Summary & Vision

- **Application Name:** PatternMaster Pro
- **Tagline:** Institutional Technical Analysis & Capital Defense Academy
- **Curriculum Author & Presentation Architecture:** Charlton Nicholas
- **Core Mission:** Provide retail, forex, and equities traders with an institutional-grade, zero-slop interactive training platform. The app bridges the gap between static textbook chart theory and live market execution by answering the 4 foundational questions on every single setup:
  1. **How to Spot:** HTF market structure, liquidity sweeps, and confluence zones.
  2. **When to Enter:** Exact confirmation candle close, limit order blocks, or break-and-retest triggers.
  3. **Where to Anchor Stop Loss:** Structural invalidation points with 1.5x ATR spread buffers.
  4. **When to Exit:** Structured partials (TP1 at 1:2 R:R to lock 50% and move to Breakeven; TP2 at macro liquidity pools).

---

## 2. Technology Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime / Bundler** | Vite 8 + React 19 + TypeScript | Lightning-fast HMR, strict type safety, modern React SPA |
| **Styling** | Tailwind CSS v4 (`@import "tailwindcss";`) | Institutional dark theme (`bg-slate-950`, emerald green, rose red, cyan accents) |
| **Icons** | Lucide React (`lucide-react`) | Professional, clean vector icons |
| **Audio Engine** | Web Audio API (Native browser synthesizer) | Zero-asset, zero-latency gamification sound effects |
| **FX & Celebrations** | `canvas-confetti` | Particle bursts for level-ups, badge unlocks, and certificates |
| **Full-Stack / Server** | Express 4 + Node.js (`server.ts`, `tsx`) | Optional server-side proxy routes and SSR capability |
| **State Persistence** | React Hooks + LocalStorage | Offline-first progress, XP, badges, and quiz tracking |

---

## 3. Directory & File Structure

```text
/
├── index.html                      # App entry point with custom dark theme & meta tags
├── package.json                    # Dependencies & scripts (dev, build, start, lint)
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite config with React plugin
├── metadata.json                   # App title, description, and permissions
├── server.ts                       # Express backend proxy / development server
├── src/
│   ├── main.tsx                    # React root render
│   ├── App.tsx                     # Main layout, tab router, gamification state & toasts
│   ├── index.css                   # Global styles & Tailwind CSS v4 imports
│   ├── types.ts                    # TypeScript types and data contracts
│   ├── utils/
│   │   └── audio.ts                # Web Audio API sound synthesizer (zero external mp3s)
│   ├── data/
│   │   ├── patternsData.ts         # 14 Candlestick + 12 Chart patterns database
│   │   ├── marketStructureData.ts  # BOS, CHOCH, FVG, Order Block playbooks
│   │   ├── indicatorsData.ts       # 4EMA Ribbon & RSI Divergence datasets
│   │   ├── forexData.ts            # Forex pairs, emerging markets, pip formulas, market sessions
│   │   ├── psychologyData.ts       # Retail failure autopsy, cognitive biases, rules
│   │   ├── quizData.ts             # 50+ multiple-choice exam questions
│   │   ├── visualQuizData.ts       # Chart pattern visual recognition tests
│   │   ├── simulatorScenariosData.ts # Interactive scenario decision trees
│   │   └── badgesData.ts           # 12 gamified milestone achievements
│   └── components/
│       ├── Navbar.tsx              # Grouped institutional navigation bar with level & sound toggle
│       ├── LandingPage.tsx         # High-converting academy overview & banking presentation
│       ├── LeadCapturePage.tsx     # Student lead capture, Capitec payments, & admin vault
│       ├── PatternCard.tsx         # Pattern thumbnail card with SVG preview & mastery toggle
│       ├── PatternModal.tsx        # Pattern deep-dive modal with anatomy & live trade proof
│       ├── PatternTradeProofSimulator.tsx # Animated SVG trade execution replayer
│       ├── InteractiveSetupExecutionProof.tsx # Multi-step BOS/CHOCH/FVG replay engine & terminal
│       ├── OpportunityFinderMatrix.tsx # Instant cheat-sheet for How to Spot, Enter, SL & Exit
│       ├── MarketStructureMastery.tsx # SMC playbook: BOS, CHOCH, FVG, Order Blocks, Liquidity
│       ├── InteractiveCandleSandbox.tsx # Dynamic OHLC slider sandbox with real-time recognition
│       ├── TrendlineMasterclass.tsx# Dynamic support/resistance & 3rd touch geometry
│       ├── IndicatorVisualizer.tsx # 4EMA ribbon fanning & RSI divergence strategy lab
│       ├── PositionCalculator.tsx  # 1-2% position size, pip value & risk calculator
│       ├── ForexMastery.tsx        # Forex pip formulas, trading sessions & institutional FX
│       ├── TradeSimulator.tsx      # Step-by-step scenario trader with R:R outcome tracker
│       ├── VisualPatternQuiz.tsx   # Chart pattern identification arena
│       ├── QuizArena.tsx           # Comprehensive multi-topic timed exam
│       ├── PsychologyHub.tsx       # Mindset defense, trader burnout & emotional autopsy
│       └── ProgressTracker.tsx     # XP stats, badge locker & printable Graduate Certificate
```

---

## 4. Master Navigation & Feature Tabs (12 Modules)

### Tab 1: Candlestick Patterns (`candlesticks`)
- **Curriculum:** 14 Japanese Candlestick Reversals from Charlton Nicholas.
  - *Single Candle:* Hammer, Inverted Hammer, Hanging Man, Shooting Star, Dragonfly Doji, Gravestone Doji, Marubozu.
  - *Dual Candle:* Bullish Engulfing, Bearish Engulfing, Tweezer Bottom, Tweezer Top, Piercing Line, Dark Cloud Cover.
  - *Triple Candle:* Morning Star, Evening Star, Three White Soldiers, Three Black Crows.
- **Features:**
  - Dynamic Search + Filter by Bias (Bullish, Bearish, Neutral/Indecision) and Difficulty.
  - Mastered toggle (check off patterns, rewards +25 XP).
  - Modal with **Pattern Anatomy** (Criteria, Interpretation, Entry, Stop Loss, Target) and **Interactive Trade Simulator**.

### Tab 2: Chart Formations (`chart-patterns`)
- **Curriculum:** 12 Institutional Chart Formations.
  - *Reversals:* Double Bottom, Double Top, Inverse Head & Shoulders, Head & Shoulders, Triple Bottom, Triple Top.
  - *Continuations:* Bull Flag, Bear Flag, Ascending Triangle, Descending Triangle, Bullish Pennant, Bearish Pennant.
  - *Bilateral:* Symmetrical Triangle, Falling Wedge, Rising Wedge.
- **Features:** Measured move projection guidelines, breakout volume confirmation checklist, timeframe alignment rules.

### Tab 3: Opportunity Finder & Execution Matrix (`entry-exit-matrix`)
- **Function:** Instant interactive master matrix comparing:
  - *Setup Type:* Trendline Bounce, Bull/Bear Flag, Liquidity Sweep Reversal, BOS/CHOCH Retest, RSI Divergence, Order Block / FVG.
  - *How to Spot:* Confluence checklist.
  - *When to Enter:* Trigger candle close or limit order.
  - *Stop Loss Placement:* 1.5x ATR structural buffer.
  - *Exit Target:* TP1 (1:2 R:R partial + Breakeven) and TP2 (Macro liquidity).

### Tab 4: Market Structure Mastery (`market-structure`)
- **Smart Money Concepts (SMC):**
  - **BOS (Break of Structure):** Trend continuation mechanics.
  - **CHOCH (Change of Character):** Early market trend reversal warning.
  - **FVG (Fair Value Gap / Imbalance):** 3-candle imbalance fill zones.
  - **Order Blocks (OB):** Institutional footprint where banks stacked orders.
  - **Liquidity Sweeps / BSL & SSL:** Buy-Side and Sell-Side liquidity grabs triggering false breakouts before real moves.
- **Embedded Proof Simulator:** Interactive SVG animation allowing users to click through each stage of a live trade.

### Tab 5: Candlestick Sandbox (`candle-lab`)
- **Function:** Dynamic OHLC (Open, High, Low, Close) slider engine.
- **Real-Time Detection:** Users drag sliders for Open, High, Low, and Close. The mathematical engine evaluates wick ratios, body percentages, and color in real time to classify the candle (e.g., "Hammer detected: Lower shadow is 2.8x the real body with minimal upper wick").

### Tab 6: Trendline Masterclass (`trendlines`)
- **Curriculum:**
  - Ascending Trendlines (Dynamic Support).
  - Descending Trendlines (Dynamic Resistance).
  - Break & Retest Mechanics (Polarity Flip: Old support becomes new resistance).
- **Interactive Trade Geometry:** Visual toggle revealing exact 3rd touch entries, Stop Loss buffers, and TP1/TP2 channel boundaries.

### Tab 7: Indicator Visualizer (`indicators`)
- **Strategies:**
  - **4EMA Ribbon (8, 13, 21, 55 EMAs):** Trend alignment, fanning momentum, and dynamic pullback entries.
  - **RSI Divergences:** Regular Bullish (Reversal), Regular Bearish (Reversal), Hidden Bullish (Continuation), Hidden Bearish (Continuation).
- **Execution Blueprint:** 4-pillar playbook cards under every indicator detailing Spotting, Entry Candle, SL Anchor, and Target.

### Tab 8: Position Calculator (`calculator`)
- **Core Formula:** Charlton Nicholas 1-2% Account Capital Preservation Rule.
- **Inputs:** Account Balance ($), Risk % (0.5% - 5%), Asset Class (Forex, Crypto, Equities), Entry Price, Stop Loss, Take Profit, Leverage.
- **Outputs:** Max Dollar Risk, Exact Position Size, Stop Distance %, Risk-to-Reward Ratio, Pip Value, Expected P&L at TP1 and TP2.

### Tab 9: Institutional Forex Pro Mastery (`forex-mastery`)
- **Forex Calculations:** Standard, Mini, and Micro lot sizing formulas; pip value calculations based on base vs. quote currency.
- **Market Sessions:** Asian (Tokyo), London, and New York overlap visualizer with peak liquidity timeframes.
- **Emerging Markets & Majors:** Currency pair profiles, spread dynamics, and institutional order block execution.

### Tab 10: Interactive Trade Simulator (`trade-sim`)
- **Scenarios:** 10+ real-world market chart situations.
- **User Actions:** **BUY (Long)**, **SELL (Short)**, or **PASS (No Trade)**.
- **Scoring:** Immediate feedback comparing the user's decision to institutional rules, logging P&L (+3.2R, -1.0R, or Capital Preserved) and awarding XP.

### Tab 11: Visual Pattern Quiz & Quiz Arena (`visual-quiz` & `quiz`)
- **Visual Quiz:** Pure chart pattern identification from SVGs without text hints.
- **Quiz Arena:** 50+ multiple-choice technical analysis questions covering candlesticks, market structure, risk management, and psychology.

### Tab 12: Trading Psychology & Milestones (`psychology` & `milestones`)
- **Psychology Hub:** 90% retail failure autopsy (Over-leveraging, Revenge trading, Moving Stop Losses, FOMO). Includes an interactive self-assessment quiz.
- **Progress Tracker:** Level badge grid (Level 1 Novice to Level 6 Institutional Master), XP progression bar, and a personalized printable **Certificate of Technical Analysis Mastery**.

---

## 5. Mathematical Models & Financial Formulas

### 5.1 Charlton Nicholas 1-2% Risk Formula
$$\text{Risk Amount (\USD)} = \text{Account Capital} \times \left(\frac{\text{Risk Percentage}}{100}\right)$$

### 5.2 Position Sizing Formula
$$\text{Position Size (Units)} = \frac{\text{Risk Amount (\USD)}}{|\text{Entry Price} - \text{Stop Loss Price}|}$$

### 5.3 Risk-to-Reward Ratio (R:R)
$$\text{R:R Ratio} = \frac{|\text{Take Profit Price} - \text{Entry Price}|}{|\text{Entry Price} - \text{Stop Loss Price}|}$$
*Institutional Rule: Never execute trades below 1:2.0 R:R.*

### 5.4 Forex Pip Value Calculation
- **For pairs where USD is the quote currency (e.g., EUR/USD, GBP/USD):**
  $$\text{Pip Value} = \text{Lot Size} \times 0.0001 = 100,000 \times 0.0001 = \$10.00/\text{pip (Standard Lot)}$$
- **For JPY pairs (e.g., USD/JPY):**
  $$\text{Pip Value} = \frac{100,000 \times 0.01}{\text{USD/JPY Exchange Rate}}$$

### 5.5 Stop Loss Structural Margin (ATR Buffer)
$$\text{Long Stop Loss} = \text{Structural Swing Low} - (1.5 \times \text{ATR}_{14})$$
$$\text{Short Stop Loss} = \text{Structural Swing High} + (1.5 \times \text{ATR}_{14})$$

---

## 6. Gamification, Level Curve & Audio Synthesizer

### 6.1 Level Progression Table
| Level | Title | XP Required |
| :--- | :--- | :--- |
| **Level 1** | Chart Observer | 0 XP |
| **Level 2** | Price Action Apprentice | 100 XP |
| **Level 3** | Pattern Technician | 250 XP |
| **Level 4** | Market Structure Specialist | 500 XP |
| **Level 5** | Capital Defense Master | 900 XP |
| **Level 6** | Institutional Graduate | 1,500+ XP |

### 6.2 Native Web Audio Synthesizer (`src/utils/audio.ts`)
Zero external MP3 dependencies. Uses browser native oscillators:
- **Click:** Sine oscillator, 440Hz ramping to 880Hz over 50ms.
- **Correct:** Dual tone C5 (523.25Hz) to E5 (659.25Hz) over 180ms.
- **Wrong:** Low buzz, 180Hz ramping down to 110Hz over 250ms.
- **Level Up:** Major triad arpeggio (C5 -> E5 -> G5 -> C6).
- **Badge:** Fanfare sequence with resonant gain decay.

---

## 7. Instructions to Recreate on Any AI Platform

To recreate this application in a single prompt or multi-turn sequence on any AI code generator:

1. **Initialize Project:**
   ```bash
   npm create vite@latest patternmaster -- --template react-ts
   cd patternmaster
   npm install lucide-react canvas-confetti @tailwindcss/vite tailwindcss
   npm install -D @types/canvas-confetti
   ```
2. **Configure Tailwind CSS v4:**
   In `src/index.css`:
   ```css
   @import "tailwindcss";
   ```
3. **Copy Data Sets:**
   Port `src/data/*.ts` files ensuring each pattern contains `id`, `name`, `bias`, `characteristics`, `entryPoint`, `stopLoss`, `takeProfitTarget`, and `svgType`.
4. **Build SVG Candlestick Generator:**
   Create modular SVG components rendering candlestick bodies, wicks, trendlines, and dashed entry/exit horizontal target lines.
5. **Implement State Persistence:**
   Save `UserProgress` into `localStorage` under `'patternmaster_progress'`.
6. **Verify Compilation:**
   Ensure zero TypeScript warnings with `tsc --noEmit`.
