import React, { useState, useMemo, useRef } from 'react';
import { GlobalForexClubLogo } from './GlobalForexClubLogo.tsx';
import { MILESTONE_BADGES, LEVEL_THRESHOLDS } from '../data/badgesData.ts';
import { UserProgress } from '../types.ts';
import { 
  downloadCertificatePdf, 
  downloadCertificatePng 
} from '../utils/certificateGenerator.ts';
import { 
  Award, 
  Trophy, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Printer, 
  ShieldCheck, 
  Flame, 
  Layers, 
  ChevronRight,
  Download,
  FileDown,
  Image,
  Loader2,
  Check,
  Copy,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';

interface ProgressTrackerProps {
  progress: UserProgress;
  userName: string;
  setUserName: (name: string) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  userName,
  setUserName
}) => {
  const [showCertificate, setShowCertificate] = useState<boolean>(true);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const currentLevelInfo = LEVEL_THRESHOLDS.find(l => l.level === progress.level) || LEVEL_THRESHOLDS[0];
  const nextLevelInfo = LEVEL_THRESHOLDS.find(l => l.level === progress.level + 1);

  const xpProgressPercent = nextLevelInfo
    ? Math.min(100, Math.max(0, ((progress.xp - currentLevelInfo.minXp) / (nextLevelInfo.minXp - currentLevelInfo.minXp)) * 100))
    : 100;

  const totalCandles = 14;
  const totalChartPatterns = 12;
  const candleMasteryPercent = Math.min(100, Math.round((progress.masteredPatterns.length / (totalCandles + totalChartPatterns)) * 100));

  // Generate deterministic serial certificate code
  const certSerialId = useMemo(() => {
    const raw = `${userName || 'TRADER'}-${progress.xp}-${progress.level}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const cleanHash = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0').slice(0, 6);
    return `GFXC-FXPM-2026-${cleanHash}`;
  }, [userName, progress.xp, progress.level]);

  const issueDateFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }, []);

  const certData = useMemo(() => ({
    userName: (userName || '').trim() || 'Dedicated Market Trader',
    rankTitle: currentLevelInfo.title,
    level: progress.level,
    xp: progress.xp,
    masteredPatternsCount: progress.masteredPatterns.length,
    serialId: certSerialId,
    issueDate: issueDateFormatted
  }), [userName, currentLevelInfo.title, progress.level, progress.xp, progress.masteredPatterns.length, certSerialId, issueDateFormatted]);

  const copyCertId = () => {
    navigator.clipboard?.writeText(certSerialId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  // High-Resolution 300 DPI PDF Generator & Exporter
  const downloadPdf = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsExportingPdf(true);
    setStatusMessage('Generating 300 DPI Official PDF Certificate...');

    try {
      await downloadCertificatePdf(certData);
      setStatusMessage('Official Certificate PDF successfully downloaded!');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err) {
      console.error('PDF export failed:', err);
      setStatusMessage('PDF download encountered an issue — saving high-res PNG image instead.');
      try {
        downloadCertificatePng(certData);
      } catch (pngErr) {
        console.error('Image fallback failed:', pngErr);
      }
      setTimeout(() => setStatusMessage(null), 4500);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // High-Resolution PNG Image Exporter
  const downloadPng = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsExportingPng(true);
    setStatusMessage('Generating 300 DPI PNG Certificate Image...');

    try {
      downloadCertificatePng(certData);
      setStatusMessage('Certificate Image (PNG) successfully saved!');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err) {
      console.error('PNG export failed:', err);
      setStatusMessage('Failed to generate PNG image.');
      setTimeout(() => setStatusMessage(null), 4500);
    } finally {
      setIsExportingPng(false);
    }
  };

  // Dedicated Print Function with Direct PDF Fallback for sandboxed iframes
  const handlePrint = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setStatusMessage('Opening print dialog / generating printable document...');

    try {
      window.print();
    } catch (err) {
      console.warn('window.print restricted by browser:', err);
    }

    // Always trigger direct PDF download as well so sandboxed iframe users (where print() is silently dropped by browser security) still receive their official certificate immediately!
    setTimeout(() => {
      downloadCertificatePdf(certData);
      setStatusMessage('Your official printable PDF certificate is downloaded!');
      setTimeout(() => setStatusMessage(null), 5000);
    }, 300);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/50 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              GAMIFIED TRADER JOURNEY · FX PATTERN MASTER ACADEMY
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Milestones & Technical Trader Rank
            </h2>
            <p className="text-slate-300 text-sm">
              Level up as you study candlestick patterns, master chart structures, and ace the technical quizzes.
            </p>
          </div>

          {/* Big Rank Badge */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center text-xl font-bold text-black shadow-lg">
              L{progress.level}
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400">CURRENT RANK</div>
              <div className="text-base font-bold text-white">{currentLevelInfo.title}</div>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300">
              Experience Points: <strong className="text-white font-bold">{progress.xp} XP</strong>
            </span>
            <span className="text-cyan-400">
              {nextLevelInfo ? `${nextLevelInfo.minXp - progress.xp} XP to Level ${progress.level + 1}` : 'Max Level Achieved!'}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${xpProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>PATTERNS MASTERED</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {progress.masteredPatterns.length} <span className="text-sm font-sans text-slate-400">/ 26 Total</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${(progress.masteredPatterns.length / 26) * 100}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>QUIZ ACCURACY</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {progress.quizzesTaken > 0 ? Math.round((progress.quizzesPassed / progress.quizzesTaken) * 100) : 0}%
          </div>
          <div className="text-xs text-slate-400">
            {progress.quizzesPassed} correct out of {progress.quizzesTaken} answered
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>BADGES UNLOCKED</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {progress.badges.length} <span className="text-sm font-sans text-slate-400">/ {MILESTONE_BADGES.length}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500" style={{ width: `${(progress.badges.length / MILESTONE_BADGES.length) * 100}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>STUDY STREAK</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">
            {progress.streakDays} Day{progress.streakDays > 1 ? 's' : ''}
          </div>
          <div className="text-xs text-emerald-400">
            🔥 Consistent daily practice
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Milestone Badges & Honors
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock badges by engaging with the full course syllabus.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            {progress.badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MILESTONE_BADGES.map(badge => {
            const isUnlocked = progress.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-slate-800/60 border border-slate-700'
                  }`}>
                    {isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{badge.name}</h4>
                      {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">{badge.description}</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px] font-mono">
                      <span className="text-cyan-400">+{badge.xpReward} XP</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-500">{badge.criteria}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FX Pattern Master Official Certificate Generator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              OFFICIAL ACCREDITATION
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              FX Pattern Master Certificate of Technical Analysis Mastery
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Personalized institutional credential proving your technical candlestick, chart pattern, and risk sizing proficiency.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={downloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-60"
              title="Generate and download official PDF certificate"
            >
              {isExportingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <FileDown className="w-4 h-4 text-slate-950" />
              )}
              <span>{isExportingPdf ? 'Exporting PDF...' : 'Download PDF Certificate'}</span>
            </button>

            <button
              type="button"
              onClick={downloadPng}
              disabled={isExportingPng}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer disabled:opacity-60"
              title="Save high-resolution PNG image"
            >
              {isExportingPng ? (
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              ) : (
                <Image className="w-4 h-4 text-cyan-400" />
              )}
              <span>Save Image (PNG)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs border border-slate-700 transition-all cursor-pointer"
              title="Print certificate"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Certificate</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowCertificate(prev => !prev);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-200 hover:text-white font-semibold text-xs border border-slate-800 transition-all cursor-pointer shadow-sm"
              title={showCertificate ? 'Hide certificate preview' : 'Show certificate preview'}
            >
              {showCertificate ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hide Preview</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Show Preview</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs font-mono flex items-center justify-between gap-3 animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2.5">
              {isExportingPdf || isExportingPng ? (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>{statusMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {showCertificate && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Toolbar: Name customization & Action buttons */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <label className="text-xs font-mono text-slate-400 whitespace-nowrap">Recipient Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Trader Name"
                  className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={downloadPdf}
                  disabled={isExportingPdf}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer disabled:opacity-60"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5 text-slate-950" />
                  )}
                  <span>{isExportingPdf ? 'Exporting PDF...' : 'Download Official PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={downloadPng}
                  disabled={isExportingPng}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isExportingPng ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  ) : (
                    <Image className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>Save Image (PNG)</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>

            {/* Certificate Preview Frame (Printable & Exportable) */}
            <div 
              id="printable-certificate"
              ref={certificateRef}
              className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[#050814] border-4 border-[#F5A623] shadow-2xl relative overflow-hidden text-center space-y-7 selection:bg-amber-500/20"
            >
              {/* Inner Decorative Golden Border */}
              <div className="absolute inset-2 sm:inset-3 border border-[#F5A623]/35 rounded-2xl pointer-events-none" />
              <div className="absolute inset-3 sm:inset-4 border border-[#F5A623]/20 rounded-xl pointer-events-none" />

              {/* Watermark Emblem in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
                <GlobalForexClubLogo variant="icon" className="w-[500px] h-[500px]" />
              </div>

              {/* Header: Official Global Forex Club Brand Lockup */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
                <GlobalForexClubLogo variant="compact" showSlogan={true} className="scale-110 sm:scale-125 my-1" />
                <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] text-[#F5A623] uppercase pt-2">
                  INSTITUTIONAL TECHNICAL ANALYSIS &amp; CAPITAL DEFENSE ACADEMY
                </div>
              </div>

              {/* Certificate Title */}
              <div className="relative z-10 space-y-1.5">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide uppercase font-['Orbitron',sans-serif] drop-shadow-md">
                  Certificate of Technical Mastery
                </h2>
                <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-[#F5A623] to-transparent" />
                <p className="text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-widest pt-1">
                  This official academic credential certifies that
                </p>
              </div>

              {/* Recipient Name Plaque */}
              <div className="relative z-10 py-1">
                <div className="inline-block px-8 sm:px-14 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border-b-2 border-t border-[#F5A623]/60 shadow-lg shadow-amber-500/5">
                  <div className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-cyan-300 tracking-tight font-serif">
                    {userName || 'Dedicated Market Trader'}
                  </div>
                </div>
              </div>

              {/* Verified Proficiency Description */}
              <p className="relative z-10 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
                Has successfully demonstrated rigorous institutional proficiency in identifying 14 Japanese Candlestick Reversals, 12 Chart Formations, Dynamic Trendline Confluences, Fair Value Gaps (FVG), BOS &amp; CHOCH Market Structures, and Capital Defense with Strict 1-2% Position Size Risk Management.
              </p>

              {/* Official Credential Pills */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
                <span className="px-3.5 py-1.5 bg-slate-950/90 border border-emerald-500/40 rounded-full text-[11px] sm:text-xs font-mono font-bold text-emerald-400 shadow-sm">
                  Rank: Level {progress.level} · {currentLevelInfo.title}
                </span>
                <span className="px-3.5 py-1.5 bg-slate-950/90 border border-amber-500/40 rounded-full text-[11px] sm:text-xs font-mono font-bold text-amber-400 shadow-sm">
                  Verified XP: {progress.xp} Points
                </span>
                <span className="px-3.5 py-1.5 bg-slate-950/90 border border-cyan-500/40 rounded-full text-[11px] sm:text-xs font-mono font-bold text-cyan-400 shadow-sm">
                  Mastery: {progress.masteredPatterns.length}/26 Formations
                </span>
                <span className="px-3.5 py-1.5 bg-slate-950/90 border border-purple-500/40 rounded-full text-[11px] sm:text-xs font-mono font-bold text-purple-300 shadow-sm">
                  1-2% Capital Defense Protocol: Verified
                </span>
              </div>

              {/* Signatures, Medallion Seal & Verification Section */}
              <div className="relative z-10 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-3xl mx-auto">
                {/* Academic Sign-off */}
                <div className="space-y-1 text-center md:text-left">
                  <div className="font-['Caveat',cursive] text-2xl sm:text-3xl text-amber-300 font-bold leading-none">
                    Academic Board
                  </div>
                  <div className="border-t border-slate-700/80 pt-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    FX Pattern Master Academy Board
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Global Forex Club Curriculum
                  </div>
                </div>

                {/* Golden Verification Seal Medallion */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 p-0.5 shadow-xl shadow-amber-500/20 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#050814] flex flex-col items-center justify-center p-1 border border-amber-300/40">
                        <GlobalForexClubLogo variant="icon" className="w-7 h-7 sm:w-8 sm:h-8" />
                        <span className="text-[7px] sm:text-[8px] font-mono font-black text-amber-400 uppercase tracking-widest mt-0.5">
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider mt-1.5">
                    Official Gold Standard Seal
                  </span>
                </div>

                {/* Verification Date & Serial ID */}
                <div className="space-y-1 text-center md:text-right">
                  <div className="text-xs sm:text-sm font-mono font-bold text-cyan-400">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="border-t border-slate-700/80 pt-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Issue Date &amp; Serial ID
                  </div>
                  <button
                    onClick={copyCertId}
                    className="inline-flex items-center gap-1.5 text-[10px] text-amber-400 hover:text-amber-300 font-mono cursor-pointer transition-colors"
                    title="Click to copy Certificate ID"
                  >
                    <span>{certSerialId}</span>
                    {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Format: 300 DPI High-Resolution PDF &amp; PNG Ready</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={downloadPdf}
                  disabled={isExportingPdf}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <FileDown className="w-4 h-4 text-slate-950" />
                  )}
                  <span>{isExportingPdf ? 'Exporting PDF...' : 'Download Official PDF (Instant)'}</span>
                </button>

                <button
                  type="button"
                  onClick={downloadPng}
                  disabled={isExportingPng}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer border border-slate-700 disabled:opacity-60"
                >
                  {isExportingPng ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  ) : (
                    <Image className="w-4 h-4 text-cyan-400" />
                  )}
                  <span>Save Image (PNG)</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer border border-slate-700"
                >
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
