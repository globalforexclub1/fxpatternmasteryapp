import React, { useState, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Layers, 
  Maximize2, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Compass,
  Play
} from 'lucide-react';

export const TrendlineMasterclass: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'uptrend' | 'downtrend' | 'breakout' | 'channels' | 'rectangles'>('rules');
  const [simulatedTaps, setSimulatedTaps] = useState<number>(2);
  const [showTradeLevels, setShowTradeLevels] = useState<boolean>(true);
  const subTabsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            TECHNICAL ANALYSIS &amp; PRICE ACTION MASTERY
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How to Use Trendlines & Price Channels
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            "Trendline is a simple straight line, yet one of the most powerful tools used by professional traders around the world. It shows the market trend, provides dynamic support/resistance, and triggers high-probability confluence reversals upon breakout."
          </p>
        </div>
      </div>

      {/* Interactive Sub-Navigation */}
      <div ref={subTabsRef} className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        {[
          { id: 'rules', label: '1. Validation Rule (2+ Taps)' },
          { id: 'uptrend', label: '2. Uptrend Dynamic Support' },
          { id: 'downtrend', label: '3. Downtrend Dynamic Resistance' },
          { id: 'breakout', label: '4. Breakout & Trend Reversals' },
          { id: 'channels', label: '5. Price Channels' },
          { id: 'rectangles', label: '6. S/R Rectangle Box (Bonus)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              if (subTabsRef.current) {
                const rect = subTabsRef.current.getBoundingClientRect();
                if (rect.top < 70) {
                  window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: 'instant' });
                }
              }
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Panes */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              The "Rule of Two" Taps for Trendline Validation
            </h3>
            
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/60 font-mono text-xs text-amber-300 leading-relaxed">
              "TO BE A VALID TRENDLINE WE NEED AT LEAST 2 TAPS OF THE PRICE ON TRENDLINE IN UPTREND OR DOWNTREND, ANYTHING ABOVE 2 TAPS IS PLUS POINT."
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Anyone can connect any arbitrary two points on a chart, but for institutions to recognize the line as a legitimate dynamic boundary, you must observe at least 2 clean rejections. When price touches the line for a 3rd or 4th time, confluence multiplies significantly.
            </p>

            {/* Interactive Tap Simulator */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Current Touches on Trendline:</span>
                <span className="font-mono text-cyan-400 font-bold">{simulatedTaps} Taps</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(t => (
                  <button
                    key={t}
                    onClick={() => setSimulatedTaps(t)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      simulatedTaps === t
                        ? t >= 2 
                          ? 'bg-emerald-500 text-black border-emerald-400 shadow-lg' 
                          : 'bg-rose-500 text-white border-rose-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {t} {t === 1 ? 'Tap' : 'Taps'}
                  </button>
                ))}
              </div>

              <div className="mt-3 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 bg-slate-900 border border-slate-800">
                {simulatedTaps < 2 ? (
                  <span className="text-rose-400">
                    ❌ Invalid Trendline: 1 tap is merely a single isolated pivot. Cannot form a valid line.
                  </span>
                ) : simulatedTaps === 2 ? (
                  <span className="text-cyan-400">
                    ✅ Valid Baseline Trendline: Meets the standard minimum 2-tap threshold.
                  </span>
                ) : (
                  <span className="text-emerald-400">
                    🔥 Institutional Strength ({simulatedTaps} taps): "Anything above 2 taps is plus point!"
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Visual SVG from Slide 5 */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
            <svg viewBox="0 0 320 200" className="w-full h-52">
              {/* Uptrend 2 Taps */}
              <line x1="30" y1="180" x2="150" y2="60" stroke="#10b981" strokeWidth="3" />
              <path d="M 15 130 L 30 180 L 60 110 L 90 120 L 120 40 L 150 60" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <circle cx="30" cy="180" r="4" fill="#10b981" />
              <circle cx="90" cy="120" r="4" fill="#10b981" />
              <rect x="25" y="145" width="105" height="18" fill="#991b1b" rx="2" />
              <text x="77" y="157" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">AT LEAST 2 TAPS ON TRENDLINE</text>

              {/* Downtrend 2 Taps */}
              <line x1="170" y1="60" x2="290" y2="180" stroke="#f43f5e" strokeWidth="3" />
              <path d="M 155 110 L 170 60 L 200 130 L 230 120 L 260 190 L 290 180" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <circle cx="170" cy="60" r="4" fill="#f43f5e" />
              <circle cx="230" cy="120" r="4" fill="#f43f5e" />
              <rect x="180" y="75" width="105" height="18" fill="#991b1b" rx="2" />
              <text x="232" y="87" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">AT LEAST 2 TAPS ON TRENDLINE</text>
            </svg>
            <span className="text-[11px] font-mono text-slate-400 mt-2">Diagram matching Slide 5</span>
          </div>
        </div>
      )}

      {activeTab === 'uptrend' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  UPTREND MECHANICS
                </span>
                <button
                  onClick={() => setShowTradeLevels(!showTradeLevels)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-mono font-bold cursor-pointer"
                >
                  {showTradeLevels ? 'Hide Trade Geometry' : 'Show Entry & Exit Levels'}
                </button>
              </div>
              <h3 className="text-xl font-bold text-white">Trend Line Acting as Dynamic Support</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In an uptrend, the market makes Higher Highs (HH) and Higher Lows (HL). The trendline is drawn strictly connecting sequential Higher Lows, providing a high-probability bounce entry zone.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>How to Spot:</strong> Look for at least 2 prior taps confirming the line. Anticipate a high-probability 3rd bounce touch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>When to Enter:</strong> Enter Long upon a bullish rejection candle (Hammer or Bullish Engulfing) closing above the trendline.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center relative overflow-hidden">
              <svg viewBox="0 0 340 220" className="w-full h-60">
                {/* Ascending Support Line */}
                <line x1="40" y1="190" x2="300" y2="50" stroke="#000000" strokeWidth="5" />
                <line x1="40" y1="190" x2="300" y2="50" stroke="#10b981" strokeWidth="2.5" />

                {/* Zig Zag price */}
                <path d="M 20 170 L 40 190 L 80 90 L 120 145 L 170 65 L 210 105 L 260 35 L 300 55" stroke="#38bdf8" strokeWidth="2" fill="none" />

                {/* Touch Circles */}
                <circle cx="40" cy="190" r="5" fill="#10b981" />
                <circle cx="120" cy="145" r="5" fill="#10b981" />
                <circle cx="210" cy="105" r="6" fill="#10b981" className="animate-ping" />
                <circle cx="210" cy="105" r="5" fill="#10b981" />

                {showTradeLevels && (
                  <>
                    {/* Take Profit 2 Target */}
                    <line x1="140" y1="35" x2="320" y2="35" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
                    <rect x="220" y="24" width="100" height="15" rx="3" fill="#020617" stroke="#34d399" strokeWidth="0.8" />
                    <text x="224" y="35" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">🏆 TP2: Macro Swing</text>

                    {/* Take Profit 1 Target */}
                    <line x1="140" y1="65" x2="320" y2="65" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <rect x="220" y="54" width="100" height="15" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="0.8" />
                    <text x="224" y="65" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">🎯 TP1: Prior High (1:2)</text>

                    {/* Entry Trigger Level */}
                    <line x1="140" y1="100" x2="320" y2="100" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                    <rect x="220" y="89" width="100" height="15" rx="3" fill="#020617" stroke="#10b981" strokeWidth="0.8" />
                    <text x="224" y="100" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold">🟢 ENTRY: 3rd Touch</text>

                    {/* Stop Loss Level */}
                    <line x1="140" y1="130" x2="320" y2="130" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 2" />
                    <rect x="220" y="119" width="100" height="15" rx="3" fill="#020617" stroke="#f43f5e" strokeWidth="0.8" />
                    <text x="224" y="130" fill="#f43f5e" fontSize="8" fontFamily="monospace" fontWeight="bold">🛑 SL: Below Line+ATR</text>
                  </>
                )}

                <rect x="70" y="155" width="180" height="20" fill="#065f46" rx="3" stroke="#10b981" strokeWidth="0.8" />
                <text x="160" y="168" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">
                  TREND LINE ACTING AS DYNAMIC SUPPORT
                </text>
              </svg>
              <span className="text-[11px] font-mono text-slate-400 mt-1">Interactive Uptrend Bounce Execution Geometry</span>
            </div>
          </div>

          {/* Action Blueprint Bar for Trendline Bounce */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-1">
              <span className="font-bold text-emerald-400 uppercase font-mono block">🟢 When to Enter</span>
              <p className="text-slate-300">Wait for the 3rd touch. Execute market buy when a bullish pin bar or engulfing candle closes above the trendline.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-1">
              <span className="font-bold text-rose-400 uppercase font-mono block">🛑 Stop Loss Placement</span>
              <p className="text-slate-300">Place Stop Loss 3-5 pips + 1.5x ATR buffer strictly below the bounce wick and the trendline itself.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs space-y-1">
              <span className="font-bold text-cyan-400 uppercase font-mono block">🎯 When to Exit</span>
              <p className="text-slate-300">TP1 at previous swing high (1:2 R:R). Scale 50% out and advance SL to Breakeven (+1 pip buffer). Target upper channel for TP2.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'downtrend' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                  DOWNTREND MECHANICS
                </span>
                <button
                  onClick={() => setShowTradeLevels(!showTradeLevels)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-mono font-bold cursor-pointer"
                >
                  {showTradeLevels ? 'Hide Trade Geometry' : 'Show Entry & Exit Levels'}
                </button>
              </div>
              <h3 className="text-xl font-bold text-white">Trend Line Acting as Dynamic Resistance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In a downtrend, price prints Lower Highs (LH) and Lower Lows (LL). The trendline connects the falling Lower Highs, acting as an impenetrable ceiling to short against.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>How to Spot:</strong> Connect at least 2 Lower High peaks. Wait for price to rally back to touch the descending line.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>When to Enter:</strong> Sell Short when a bearish reversal candle (Shooting Star, Bearish Engulfing) rejects the line.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center relative overflow-hidden">
              <svg viewBox="0 0 340 220" className="w-full h-60">
                {/* Descending Resistance Line */}
                <line x1="40" y1="40" x2="300" y2="180" stroke="#000000" strokeWidth="5" />
                <line x1="40" y1="40" x2="300" y2="180" stroke="#f43f5e" strokeWidth="2.5" />

                {/* Zig Zag price */}
                <path d="M 20 60 L 40 40 L 80 140 L 120 85 L 170 170 L 200 125 L 250 205 L 290 175" stroke="#38bdf8" strokeWidth="2" fill="none" />

                {/* Touch Circles */}
                <circle cx="40" cy="40" r="5" fill="#f43f5e" />
                <circle cx="120" cy="85" r="5" fill="#f43f5e" />
                <circle cx="200" cy="125" r="6" fill="#f43f5e" className="animate-ping" />
                <circle cx="200" cy="125" r="5" fill="#f43f5e" />

                {showTradeLevels && (
                  <>
                    {/* Stop Loss Level */}
                    <line x1="130" y1="95" x2="310" y2="95" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 2" />
                    <rect x="210" y="84" width="105" height="15" rx="3" fill="#020617" stroke="#f43f5e" strokeWidth="0.8" />
                    <text x="214" y="95" fill="#f43f5e" fontSize="8" fontFamily="monospace" fontWeight="bold">🛑 SL: Above Line+ATR</text>

                    {/* Entry Trigger Level */}
                    <line x1="130" y1="130" x2="310" y2="130" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                    <rect x="210" y="119" width="105" height="15" rx="3" fill="#020617" stroke="#f43f5e" strokeWidth="0.8" />
                    <text x="214" y="130" fill="#f43f5e" fontSize="8" fontFamily="monospace" fontWeight="bold">🔴 ENTRY: Short Bounce</text>

                    {/* Take Profit 1 Target */}
                    <line x1="130" y1="170" x2="310" y2="170" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                    <rect x="210" y="159" width="105" height="15" rx="3" fill="#020617" stroke="#38bdf8" strokeWidth="0.8" />
                    <text x="214" y="170" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">🎯 TP1: Prior Low (1:2)</text>

                    {/* Take Profit 2 Target */}
                    <line x1="130" y1="205" x2="310" y2="205" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
                    <rect x="210" y="194" width="105" height="15" rx="3" fill="#020617" stroke="#34d399" strokeWidth="0.8" />
                    <text x="214" y="205" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">🏆 TP2: Macro Low Target</text>
                  </>
                )}

                <rect x="70" y="15" width="200" height="20" fill="#881337" rx="3" stroke="#f43f5e" strokeWidth="0.8" />
                <text x="170" y="28" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="800">
                  TREND LINE ACTING AS DYNAMIC RESISTANCE
                </text>
              </svg>
              <span className="text-[11px] font-mono text-slate-400 mt-1">Interactive Downtrend Resistance Short Geometry</span>
            </div>
          </div>

          {/* Action Blueprint Bar for Downtrend Short */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-1">
              <span className="font-bold text-rose-400 uppercase font-mono block">🔴 When to Enter Short</span>
              <p className="text-slate-300">Wait for price to tap the descending trendline. Enter market short when a shooting star or bearish engulfing candle closes below the line.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-1">
              <span className="font-bold text-rose-400 uppercase font-mono block">🛑 Stop Loss Placement</span>
              <p className="text-slate-300">Anchor Stop Loss 3-5 pips + 1.5x ATR buffer strictly above the rejection high and the trendline ceiling.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs space-y-1">
              <span className="font-bold text-cyan-400 uppercase font-mono block">🎯 When to Exit</span>
              <p className="text-slate-300">TP1 at previous swing low (1:2 R:R). Bank 50% profit and drag Stop Loss to Breakeven (+1 pip buffer). Target channel base for TP2.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'breakout' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Trendline Broken = Trend Changed</h3>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/60 font-mono text-xs text-cyan-300">
              "TRENDLINE SHOWS US ABOUT THE TREND REVERSAL, UPON BREAKING OUT OR BREAKING DOWN. IT GIVES BUYING/SELLING INDICATION. ADDS MORE CONFLUENCE TO OUR TRADING SYSTEM."
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When an uptrend support line is violated by a decisive candle close, the uptrend is officially broken and a downtrend begins. Conversely, when a descending resistance line is broken out to the upside, a new bullish trend takes over.
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
            <svg viewBox="0 0 340 200" className="w-full h-56">
              {/* Ascending trend line broken */}
              <line x1="30" y1="160" x2="190" y2="70" stroke="#ffffff" strokeWidth="2.5" />
              {/* Broken extension */}
              <line x1="190" y1="70" x2="240" y2="40" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

              {/* Bullish candles leading up */}
              <path d="M 30 160 L 60 120 L 75 135 L 110 95 L 125 110 L 170 60 L 190 70" stroke="#10b981" strokeWidth="2" fill="none" />
              {/* Breakdown plunge */}
              <path d="M 190 70 L 210 110 L 230 95 L 260 160 L 290 180" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* Red callout bubble matching Slide 6 */}
              <rect x="150" y="48" width="170" height="20" fill="#dc2626" rx="4" />
              <text x="235" y="61" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="800">
                TREND-LINE BROKEN TREND CHANGED
              </text>
            </svg>
            <span className="text-[11px] font-mono text-slate-400 mt-1">Diagram matching Slide 6 & 7</span>
          </div>
        </div>
      )}

      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">Parallel Price Channels</h3>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/60 font-mono text-xs text-emerald-300">
              "PRICE CHANNEL CAN BE MADE WITH TRENDLINES WHICH HELPS US IN BUYING AND SELLING."
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              By drawing a line parallel to your primary trendline, you create a channel that bounds the swings of price action:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
                <strong>Upper Channel Line:</strong> Acts as resistance. Take profit or scale out of longs.
              </div>
              <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-500/30 text-cyan-300">
                <strong>Lower Channel Line:</strong> Acts as support. High-probability buy entries with tight stop loss below the channel.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
            <svg viewBox="0 0 340 200" className="w-full h-56">
              {/* Upper Resistance line */}
              <line x1="30" y1="120" x2="310" y2="40" stroke="#f43f5e" strokeWidth="2" />
              {/* Lower Support line */}
              <line x1="30" y1="170" x2="310" y2="90" stroke="#10b981" strokeWidth="2" />

              {/* Price bouncing between channel */}
              <path d="M 30 170 L 60 115 L 90 155 L 130 95 L 170 135 L 210 75 L 250 110 L 280 50 L 300 20" stroke="#38bdf8" strokeWidth="2" fill="none" />

              {/* Callout markers matching Slide 9 */}
              <rect x="70" y="65" width="100" height="18" fill="#dc2626" rx="3" />
              <text x="120" y="77" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Acting as resistance</text>

              <rect x="160" y="145" width="90" height="18" fill="#dc2626" rx="3" />
              <text x="205" y="157" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Acting as support</text>
            </svg>
            <span className="text-[11px] font-mono text-slate-400 mt-1">Diagram matching Slide 9</span>
          </div>
        </div>
      )}

      {activeTab === 'rectangles' && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
            SLIDE 29 BONUS TOPIC
          </div>
          <h3 className="text-xl font-bold text-white">
            Drawing Support & Resistance with Rectangle Boxes
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Why do novice traders constantly get stopped out on horizontal support/resistance lines? Because they use single 1-pixel thin lines! Institutional algorithms intentionally trigger stop runs by wicking beyond single price points.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-rose-400">❌ Thin Line Flaw</h4>
              <p className="text-xs text-slate-400">
                A single line ignores wick variation. When price wicks 10 pips below your line, you get faked out into panic selling right before price rallies.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400">✅ Institutional Rectangle Box Zone</h4>
              <p className="text-xs text-slate-400">
                Draw a box encompassing both the candle bodies and the lowest wick extremes. This defines a <strong>Zone of Liquidity</strong> where you wait for reversal confirmation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
