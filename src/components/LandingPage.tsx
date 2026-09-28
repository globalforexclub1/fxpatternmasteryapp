import React from 'react';
import { GlobalForexClubLogo } from './GlobalForexClubLogo.tsx';
import { 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Zap, 
  Compass, 
  Calculator, 
  Brain, 
  Trophy, 
  Award, 
  Globe2, 
  Sparkles, 
  Building2, 
  Mail, 
  Check, 
  Copy,
  ChevronRight,
  Sliders,
  Eye,
  GitCommit,
  AlertTriangle,
  Users,
  Target,
  BarChart3,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onExploreTerminal: () => void;
  onOpenLeadCapture: () => void;
  onSelectTab: (tabId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreTerminal,
  onOpenLeadCapture,
  onSelectTab
}) => {
  const [copiedContact, setCopiedContact] = React.useState<boolean>(false);

  const copyContactDetails = () => {
    const text = `Global Forex Club\nWebsite: https://globalforexclub.co.za\nEmail: info@globalforexclub.co.za\nOffice: ATL Resource Hub, 32 Grosvenor Avenue, Avondale, Atlantis, Cape Town, South Africa`;
    navigator.clipboard.writeText(text);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2500);
  };

  const coreCurriculum = [
    {
      tabId: 'candlesticks',
      title: '14 Candlestick Anatomy & Reversals',
      desc: 'Master Pin Bars, Bullish Engulfing, Morning Stars, Hammers, and Marubozu candles with exact price action invalidation.',
      badge: 'Beginner Phase',
      icon: BookOpen,
      color: 'from-emerald-500/20 to-emerald-950/30 text-emerald-400 border-emerald-500/30'
    },
    {
      tabId: 'chart-patterns',
      title: '12 Institutional Chart Patterns',
      desc: 'Triangles, Head & Shoulders, Double Tops & Bottoms, and Flags with measured move calculations and breakout proof.',
      badge: 'Intermediate Phase',
      icon: Layers,
      color: 'from-cyan-500/20 to-cyan-950/30 text-cyan-400 border-cyan-500/30'
    },
    {
      tabId: 'entry-exit-matrix',
      title: 'When to Enter & Exit Matrix',
      desc: 'Step-by-step 5-stage opportunity scanning framework with exact triggers, order types, and ATR spread buffer rules.',
      badge: 'Execution Protocol',
      icon: Compass,
      color: 'from-indigo-500/20 to-indigo-950/30 text-indigo-400 border-indigo-500/30'
    },
    {
      tabId: 'market-structure',
      title: 'BOS, CHOCH & Fair Value Gaps',
      desc: 'Smart money order flow: Break of Structure, Change of Character, and 50% Consequent Encroachment imbalance fills.',
      badge: 'Advanced Order Flow',
      icon: GitCommit,
      color: 'from-purple-500/20 to-purple-950/30 text-purple-400 border-purple-500/30'
    },
    {
      tabId: 'trade-sim',
      title: 'Live Trade Execution Simulator',
      desc: 'Practice entries and exits with a real-time Hazard Engine warning of spread death traps and leverage mistakes.',
      badge: 'Live Simulation',
      icon: Zap,
      color: 'from-amber-500/20 to-amber-950/30 text-amber-400 border-amber-500/30'
    },
    {
      tabId: 'calculator',
      title: 'Mathematical Position Sizer',
      desc: 'Eliminate account blowups forever. Calculate exact lot size based strictly on 1% to 2% dollar risk models.',
      badge: 'Capital Defense',
      icon: Calculator,
      color: 'from-rose-500/20 to-rose-950/30 text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <div className="space-y-16 animate-fadeIn py-4">
      {/* Top Advisory Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-amber-300 text-xs sm:text-sm flex items-start gap-3 shadow-lg">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-200 font-bold uppercase tracking-wider text-xs font-mono">
            Important Educational Notice: We Are Not Financial Advisors
          </strong>
          <p className="text-amber-300/90 leading-relaxed text-xs">
            FX Pattern Master by Global Forex Club is strictly an educational technical training terminal. We do not provide financial advice, trading signals, or investment management. Any trade suggestions or parameters within the platform are simulated educational scenarios for technical study only.
          </p>
        </div>
      </div>

      {/* HERO SECTION: High-Converting Attention-Grabbing Vehicle */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 p-6 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          
          {/* Official Logo Banner */}
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <GlobalForexClubLogo variant="hero" showSlogan={true} className="mb-2" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Africa's Best FREE Resource for Beginner to Advanced Forex Traders</span>
            </div>
          </div>

          {/* Main Value Proposition Headline */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Stop Losing Money to Signal Scams. Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400">Institutional Price Action</span> for Free.
            </h1>
            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed font-sans">
              From your very first candlestick to advanced Liquidity Sweeps, BOS/CHOCH Market Structures, and strict 1% Position Sizing. Everything you need to trade with institutional discipline—<strong className="text-emerald-400 font-black">100% Absolutely FREE with zero paywalls</strong>.
            </p>
          </div>

          {/* High-Converting Subtle Calls to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreTerminal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Start Free Technical Training Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://globalforexclub.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-cyan-300 font-bold text-sm border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Live FX Mastery Workshops ↗</span>
            </a>
          </div>

          {/* Real Human Forex Trading Visual Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 group shadow-xl bg-slate-950">
              <img
                src="/src/assets/images/forex_traders_masterclass_1790448158481.jpg"
                alt="African forex traders collaborating in an executive trading masterclass in Cape Town"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30 w-max mb-1">
                  Cape Town Masterclass Training
                </span>
                <p className="text-xs text-white font-bold">
                  Real traders learning institutional price action and collaborative floor discipline.
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 group shadow-xl bg-slate-950">
              <img
                src="/src/assets/images/forex_multiscreen_desk_1790448170853.jpg"
                alt="Professional African forex trader analyzing candlestick charts on multi-monitor desk"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/30 w-max mb-1">
                  Multi-Monitor Order Flow Execution
                </span>
                <p className="text-xs text-white font-bold">
                  Professional multi-screen setups dissecting institutional currency pair correlations.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-left">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Curriculum</span>
              <strong className="text-base sm:text-lg font-black text-white">26+ Formations</strong>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Order Flow</span>
              <strong className="text-base sm:text-lg font-black text-cyan-400">BOS &amp; FVG Matrix</strong>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Sim &amp; Radar</span>
              <strong className="text-base sm:text-lg font-black text-emerald-400">Hazard Engine</strong>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Capital Defense</span>
              <strong className="text-base sm:text-lg font-black text-amber-400">1-2% Strict Math</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TARGET MARKET: PROBLEMS IDENTIFIED & HOW GFC SOLVES THEM */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            Built Specifically For You
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why 90% of Retail Traders Blow Accounts — And How We Solve It
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Most beginners lose their capital not because the market is impossible, but because they are sold false dreams and outdated retail strategies. Here is how FX Pattern Master changes the game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Problem vs Solution 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                The Pain Point: Expensive Courses &amp; VIP Signal Scams
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Problem</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Traders in South Africa and across Africa are charged <strong>R3,500 to R15,000+</strong> for basic regurgitated PDF courses, or sucked into shady Telegram signal channels that cause massive drawdowns.
            </p>
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
              <span className="text-xs font-mono font-extrabold text-emerald-400 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                The GFC Solution: 100% Free Open Educational Terminal
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Zero paywalls. Zero subscription fees. Every single candlestick model, geometric chart pattern, and risk calculator is freely accessible 24/7.
              </p>
            </div>
          </div>

          {/* Problem vs Solution 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                The Pain Point: Stop Hunts &amp; False Breakouts
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Problem</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Entering blindly when a candle breaks support/resistance, only to watch the market reverse 5 pips later and trigger your stop loss before running in your desired direction.
            </p>
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
              <span className="text-xs font-mono font-extrabold text-cyan-300 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                The GFC Solution: Smart Money BOS, CHOCH &amp; FVG Retest
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Learn to recognize liquidity sweeps and wait for Fair Value Gap retests at 50% Consequent Encroachment with added ATR spread buffers.
              </p>
            </div>
          </div>

          {/* Problem vs Solution 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                The Pain Point: Emotional Greed &amp; Oversized Lots
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Problem</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Traders pick arbitrary lot sizes (e.g. 0.50 or 1.00 on a $200 account), resulting in immediate margin calls when the broker spread widens during London/NY open.
            </p>
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1">
              <span className="text-xs font-mono font-extrabold text-indigo-300 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                The GFC Solution: Mathematical Position Sizer &amp; Sim Radar
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Calculates exact lot size backwards from your stop loss distance to strictly cap total dollar risk at 1% to 2% of account capital.
              </p>
            </div>
          </div>

          {/* Problem vs Solution 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                The Pain Point: Trading in Isolation Without Mentorship
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Problem</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Staring alone at glowing charts without someone to audit your trading journal, point out psychological blindspots, and guide you in live market conditions.
            </p>
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
              <span className="text-xs font-mono font-extrabold text-purple-300 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                The GFC Solution: Premium Face-to-Face &amp; Live Workshops
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Access Global Forex Club's hands-on physical masterclasses in Cape Town and live interactive execution rooms with veteran floor mentors.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle Call to Action Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white text-xs sm:text-sm block">Want to test your visual recognition speed?</strong>
              <span className="text-xs text-slate-400">Put your chart pattern eye to the test with our interactive flashcard quiz arena.</span>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('visual-quiz')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer shrink-0 transition-all flex items-center gap-2"
          >
            <span>Launch Flashcards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CORE EDUCATIONAL MODULES GRID */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Interactive Technical Modules
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything You Need to Analyze Charts with Institutional Precision
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click on any module below to immediately launch the interactive technical terminal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coreCurriculum.map(item => {
            const Icon = item.icon;
            return (
              <div 
                key={item.tabId}
                onClick={() => onSelectTab(item.tabId)}
                className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border hover:border-cyan-400/80 transition-all cursor-pointer group hover:-translate-y-1 shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform">
                  <span>Open Interactive Module</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REAL HUMANS IN TRAINING & CAPE TOWN WORKSHOP HIGHLIGHT */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold mb-2">
                <Users className="w-4 h-4 text-cyan-300" />
                GLOBAL FOREX CLUB · LIVE WORKSHOP FLOOR
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Face-to-Face &amp; Live Premium FX Mastery Workshops
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Ready to take your trading from self-study theory to live market execution with in-person mentorship? Join our executive workshops in Cape Town or interactive live streams.
              </p>
            </div>

            <a
              href="https://globalforexclub.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer self-start md:self-auto flex items-center gap-2 transition-transform transform hover:scale-[1.02]"
            >
              <span>Visit globalforexclub.co.za</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Photo Gallery: Real Humans in Training */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Real Workshop Training Floor */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between">
              <div className="relative">
                <img
                  src="/src/assets/images/live_workshop_floor_1790448181434.jpg"
                  alt="In-person trading floor workshop with mentor teaching candlestick setups"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover object-center"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30">
                  🏛 In-Person Floor Training
                </span>
              </div>
              <div className="p-5 space-y-2">
                <strong className="text-white text-sm block">Live Trading Floor Masterclasses</strong>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Join fellow disciplined traders in our modern South Africa training rooms. Watch real-time market execution, ask questions directly to floor instructors, and break free from retail bad habits.
                </p>
              </div>
            </div>

            {/* Mobile / Lifestyle Trader */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between">
              <div className="relative">
                <img
                  src="/src/assets/images/mobile_trader_cape_town_1790448193214.jpg"
                  alt="Mobile forex trader analyzing live charts with confidence in Cape Town"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover object-center"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30">
                  📡 Online Live Interactive Streams
                </span>
              </div>
              <div className="p-5 space-y-2">
                <strong className="text-white text-sm block">Remote Mentorship &amp; Live London / NY Sessions</strong>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Can't attend in person? Connect from anywhere in the world to our high-definition interactive live trading streams with real-time liquidity sweep callouts and audio commentary.
                </p>
              </div>
            </div>
          </div>

          {/* Official Contact & Inquiry Bar */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <GlobalForexClubLogo variant="icon" className="w-6 h-6" />
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Global Forex Club Official Desk
                </span>
              </div>
              <div className="text-xs text-slate-300 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 pt-1">
                <a href="https://globalforexclub.co.za" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline font-bold">
                  https://globalforexclub.co.za ↗
                </a>
                <span className="text-slate-600">·</span>
                <a href="mailto:info@globalforexclub.co.za" className="text-emerald-400 hover:underline font-mono">
                  info@globalforexclub.co.za
                </a>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400 font-mono text-[11px]">Avondale, Atlantis, Cape Town</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={copyContactDetails}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                {copiedContact ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedContact ? 'Contact Copied!' : 'Copy Inquiries Info'}</span>
              </button>

              <button
                onClick={onOpenLeadCapture}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Inquire About Workshops</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
