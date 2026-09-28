import React, { useState } from 'react';
import { EMOTIONAL_CHALLENGES, BERNARD_BARUCH_QUOTE, BOAT_METAPHOR } from '../data/psychologyData.ts';
import { 
  HeartHandshake, 
  LifeBuoy, 
  Anchor, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  HelpCircle,
  Quote,
  Zap,
  Award
} from 'lucide-react';
import { playSound } from '../utils/audio.ts';

interface PsychologyHubProps {
  onEarnBadge?: (badgeId: string) => void;
  onAddXp?: (amount: number) => void;
}

export const PsychologyHub: React.FC<PsychologyHubProps> = ({ onEarnBadge, onAddXp }) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('fear');
  const [activeBoat, setActiveBoat] = useState<'a' | 'b'>('a');
  
  // Checklist questions
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  const checklistQuestions = [
    "I have clearly calculated my Stop Loss and Maximum 1-2% Risk before clicking buy/sell.",
    "I am not chasing a green candle out of FOMO (Fear of Missing Out).",
    "I have at least 2-3 confluences (Trendline, Chart Pattern, Candlestick, or RSI Divergence).",
    "If this trade hits Stop Loss, I will remain calm and accept it as a normal business expense.",
    "I am fully detached from this trade's dollar outcome and executing strictly by the rules."
  ];

  const toggleAnswer = (idx: number) => {
    const updated = { ...answers, [idx]: !answers[idx] };
    setAnswers(updated);

    const allChecked = checklistQuestions.every((_, i) => updated[i]);
    if (allChecked && !checklistCompleted) {
      setChecklistCompleted(true);
      playSound('badge');
      if (onEarnBadge) onEarnBadge('zen-trader');
      if (onAddXp) onAddXp(50);
    }
  };

  const selectedChallenge = EMOTIONAL_CHALLENGES.find(c => c.id === selectedChallengeId) || EMOTIONAL_CHALLENGES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Bernard Baruch Quote Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 p-8 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden">
        <Quote className="absolute right-6 -bottom-6 w-36 h-36 text-purple-500/10 pointer-events-none" />
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            TRADING PSYCHOLOGY & CAPITAL PRESERVATION
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            "{BERNARD_BARUCH_QUOTE.quote}"
          </h2>
          <p className="text-sm font-mono text-purple-300">
            — {BERNARD_BARUCH_QUOTE.author} <span className="text-slate-400">({BERNARD_BARUCH_QUOTE.lesson})</span>
          </p>
        </div>
      </div>

      {/* The Two Boats Interactive Metaphor */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Anchor className="w-5 h-5 text-cyan-400" />
              The Metaphor of the Two Boats: Risk Management at Sea
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare the fate of a disciplined trader with proper risk vs an overleveraged gambler.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveBoat('a')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeBoat === 'a' ? 'bg-emerald-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Boat A: With Life Jacket (1-2% Risk)
            </button>
            <button
              onClick={() => setActiveBoat('b')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeBoat === 'b' ? 'bg-rose-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Boat B: No Life Jacket (Gambler)
            </button>
          </div>
        </div>

        {/* Boat Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            {activeBoat === 'a' ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <LifeBuoy className="w-4 h-4 text-emerald-400" />
                  {BOAT_METAPHOR.boatA.title}
                </div>
                <h4 className="text-xl font-extrabold text-white">
                  Survival and Steady Ocean Navigation
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {BOAT_METAPHOR.boatA.description}
                </p>
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-mono">
                  {BOAT_METAPHOR.boatA.subtitle}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  {BOAT_METAPHOR.boatB.title}
                </div>
                <h4 className="text-xl font-extrabold text-white">
                  Sudden and Inevitable Shipwreck
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {BOAT_METAPHOR.boatB.description}
                </p>
                <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-mono">
                  {BOAT_METAPHOR.boatB.subtitle}
                </div>
              </div>
            )}
          </div>

          {/* Animated Boat Scene SVG */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
            <svg viewBox="0 0 320 200" className="w-full h-48">
              {/* Sky */}
              <rect x="0" y="0" width="320" height="130" fill="#090d16" />
              {/* Moon / Storm cloud */}
              {activeBoat === 'a' ? (
                <circle cx="270" cy="40" r="16" fill="#fbbf24" opacity="0.8" />
              ) : (
                <path d="M 230 40 Q 250 20 280 40 Q 300 30 300 50 Q 300 65 250 65 Z" fill="#475569" />
              )}

              {/* Water Waves */}
              <path d="M 0 130 Q 40 120 80 130 T 160 130 T 240 130 T 320 130 L 320 200 L 0 200 Z" fill="#0f172a" />
              <path d="M 0 145 Q 40 135 80 145 T 160 145 T 240 145 T 320 145 L 320 200 L 0 200 Z" fill="#0284c7" opacity="0.3" />

              {/* Boat Graphic */}
              {activeBoat === 'a' ? (
                <g transform="translate(110, 85)">
                  {/* Boat hull */}
                  <path d="M 10 35 L 90 35 L 75 55 L 25 55 Z" fill="#10b981" />
                  {/* Sail */}
                  <polygon points="50,5 50,33 80,33" fill="#ffffff" />
                  <line x1="50" y1="5" x2="50" y2="35" stroke="#ffffff" strokeWidth="2" />
                  {/* Life buoy on boat */}
                  <circle cx="50" cy="45" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="50" y="68" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Boat A: Safe Sailing</text>
                </g>
              ) : (
                <g transform="translate(110, 95) rotate(35, 50, 45)">
                  {/* Sinking Boat hull */}
                  <path d="M 10 35 L 90 35 L 75 55 L 25 55 Z" fill="#ef4444" />
                  {/* Broken Sail */}
                  <polygon points="50,5 40,33 80,33" fill="#94a3b8" />
                  <line x1="50" y1="5" x2="45" y2="35" stroke="#94a3b8" strokeWidth="2" />
                  <text x="50" y="70" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Boat B: Sinking Fast</text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* The 7 Emotional Challenges */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-400" />
            The 7 Deadly Emotional Traps in Trading
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Identify your psychological leaks and apply structured antidote protocols.
          </p>
        </div>

        {/* Emotion Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {EMOTIONAL_CHALLENGES.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedChallengeId(item.id)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                selectedChallengeId === item.id
                  ? 'bg-gradient-to-b from-slate-900 to-rose-950/50 border-rose-500 text-white shadow-lg ring-1 ring-rose-500'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1">⚡</div>
              <div className="text-xs font-bold truncate">{item.name}</div>
            </button>
          ))}
        </div>

        {/* Selected Challenge Detail Card */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h4 className="text-lg font-bold text-white">{selectedChallenge.name}</h4>
            </div>
            <span className="text-xs font-mono text-rose-400 uppercase tracking-wider">
              High Account Hazard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-amber-400 block font-semibold">Destructive Impact:</strong>
              <p className="text-slate-300 leading-relaxed">{selectedChallenge.destructiveImpact}</p>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-400 block font-semibold">Common Symptoms:</strong>
              <ul className="text-slate-300 list-disc list-inside space-y-1">
                {selectedChallenge.symptoms.map((s, idx) => (
                  <li key={idx} className="truncate">{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-emerald-950/30 rounded-xl border border-emerald-500/40 space-y-1">
              <strong className="text-emerald-400 block font-semibold">Antidote Protocol:</strong>
              <p className="text-emerald-200 leading-relaxed font-mono">{selectedChallenge.institutionalRule}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Trade Emotional Readiness Checklist */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Pre-Trade Emotional Readiness Audit
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Confirm all 5 checkpoints before entering any trade to prevent emotional sabotage.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-emerald-400">
              Score: {Object.values(answers).filter(Boolean).length} / {checklistQuestions.length}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {checklistQuestions.map((q, idx) => (
            <div
              key={idx}
              onClick={() => toggleAnswer(idx)}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                answers[idx]
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                answers[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-900'
              }`}>
                {answers[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-medium leading-relaxed">{q}</span>
            </div>
          ))}
        </div>

        {checklistCompleted && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/50 border border-emerald-500/50 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-300">Zen Trader Milestone Unlocked! (+50 XP)</h4>
                <p className="text-xs text-slate-300">You have completed the Pre-Trade Psychological Readiness Audit.</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500 text-black text-xs font-bold font-mono">
              APPROVED TO TRADE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
