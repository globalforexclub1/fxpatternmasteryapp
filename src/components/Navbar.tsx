import React, { useState, useRef, useEffect } from 'react';
import { GlobalForexClubLogo } from './GlobalForexClubLogo.tsx';
import { 
  TrendingUp, 
  BookOpen, 
  Calculator, 
  Brain, 
  Trophy, 
  Award, 
  Activity, 
  Volume2, 
  VolumeX, 
  Flame, 
  Menu, 
  X, 
  Layers, 
  Sliders, 
  Globe2, 
  Zap, 
  Eye, 
  GitCommit, 
  Compass,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Home,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserProgress } from '../types.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenEnrollment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  soundEnabled,
  setSoundEnabled,
  onOpenEnrollment
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key or desktop viewport resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Centralized navigation handler ensuring the page always opens at the top/header
  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  // Grouped Navigation Clusters
  const navGroups = [
    {
      id: 'patterns-group',
      label: 'Patterns',
      icon: BookOpen,
      items: [
        { id: 'candlesticks', label: '14 Candlesticks', desc: 'Pin bars, engulfing, & dojis', icon: BookOpen },
        { id: 'chart-patterns', label: '12 Chart Patterns', desc: 'Triangles, H&S, & wedges', icon: Layers },
        { id: 'candle-lab', label: 'Candle Lab Sandbox', desc: 'Interactive wick & body tuner', icon: Sliders },
        { id: 'trendlines', label: 'Trendlines & Zones', desc: 'Channel bounces & breakouts', icon: TrendingUp }
      ]
    },
    {
      id: 'execution-group',
      label: 'Execution',
      icon: Compass,
      items: [
        { id: 'entry-exit-matrix', label: 'When to Enter & Exit', desc: 'Opportunity matrix & triggers', icon: Compass },
        { id: 'market-structure', label: 'BOS, CHOCH & FVG', desc: 'Order flow & imbalance fills', icon: GitCommit },
        { id: 'forex-mastery', label: 'Institutional FX Pro', desc: 'Sessions, pips & liquidity', icon: Globe2 },
        { id: 'indicators', label: '4EMA & RSI Divergence', desc: 'Dynamic ribbons & resets', icon: Activity }
      ]
    },
    {
      id: 'practice-group',
      label: 'Practice & Sim',
      icon: Zap,
      items: [
        { id: 'trade-sim', label: 'Trade Simulator', desc: 'Live execution & hazard radar', icon: Zap },
        { id: 'visual-quiz', label: 'Visual Flashcards', desc: 'Speed visual recognition', icon: Eye },
        { id: 'quiz', label: 'Theory Arena', desc: 'Mastery certification quizzes', icon: Trophy }
      ]
    },
    {
      id: 'defense-group',
      label: 'Capital Defense',
      icon: Calculator,
      items: [
        { id: 'calculator', label: 'Position Sizer', desc: 'Strict 1-2% dollar risk math', icon: Calculator },
        { id: 'psychology', label: 'Trading Psychology', desc: 'Discipline & emotion defense', icon: Brain },
        { id: 'milestones', label: 'Rank & Milestones', desc: 'Badges & official credentials', icon: Award }
      ]
    }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine active group for highlight
  const getActiveGroup = () => {
    for (const group of navGroups) {
      if (group.items.some(item => item.id === activeTab)) {
        return group.id;
      }
    }
    return null;
  };

  const activeGroupId = getActiveGroup();

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Global Forex Club Identity */}
          <div 
            onClick={() => handleNavigate('landing')}
            className="flex items-center gap-2 cursor-pointer group shrink-0 hover:opacity-95 transition-opacity"
            title="Global Forex Club — FX Pattern Master"
          >
            <GlobalForexClubLogo variant="compact" showSlogan={true} />
          </div>

          {/* Desktop Categorized Navigation (Clean, Uncrowded Dropdowns) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* Landing Page Home Link */}
            <button
              onClick={() => handleNavigate('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'landing'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            {/* Categorized Dropdown Clusters */}
            {navGroups.map(group => {
              const Icon = group.icon;
              const isGroupActive = activeGroupId === group.id;
              const isOpen = openDropdown === group.id;

              return (
                <div key={group.id} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : group.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isGroupActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isGroupActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
                  </button>

                  {/* Dropdown Menu Box */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn space-y-1">
                      <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-slate-500 border-b border-slate-800/80 mb-1">
                        {group.label} Curriculum
                      </div>
                      {group.items.map(subItem => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeTab === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleNavigate(subItem.id)}
                            className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                              isSubActive
                                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                                : 'hover:bg-slate-800/80 text-slate-300'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isSubActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950 text-slate-400'}`}>
                              <SubIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-xs font-bold block truncate">{subItem.label}</span>
                              <span className="text-[10px] text-slate-400 block truncate">{subItem.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 100% Free Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% FREE</span>
            </div>

            {/* Live Workshops Promotion CTA (Desktop/Tablet) */}
            <button
              onClick={onOpenEnrollment}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all cursor-pointer shrink-0"
              title="Global Forex Club Premium Workshops"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              <span>Live Workshops</span>
            </button>

            {/* Level & XP Pill */}
            <div 
              onClick={() => handleNavigate('milestones')}
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-850 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono transition-all cursor-pointer shrink-0"
              title="Milestones & XP Rank"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-black text-[10px] flex items-center justify-center">
                {progress.level}
              </div>
              <span className="text-slate-300 font-bold hidden xl:inline">{progress.xp} XP</span>
              <div className="flex items-center gap-0.5 text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-[11px]">{progress.streakDays}d</span>
              </div>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                soundEnabled 
                  ? 'bg-slate-900 text-emerald-400 border-slate-800 hover:bg-slate-850' 
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
              aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border cursor-pointer shrink-0 transition-colors ${
                mobileMenuOpen 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' 
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 top-16 bg-black/75 backdrop-blur-sm z-30 lg:hidden animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Slide-Down Grouped Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 shadow-2xl z-40 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain animate-fadeIn">
            <div className="px-3.5 sm:px-6 py-4 space-y-4">
              
              {/* Top Quick Profile & Overview Strip */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavigate('landing')}
                  className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeTab === 'landing'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block font-bold truncate">Overview</span>
                    <span className="text-[10px] text-slate-400 font-normal truncate block">Academy Home</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavigate('milestones')}
                  className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    activeTab === 'milestones'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    {progress.level}
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block font-bold truncate">Level {progress.level}</span>
                    <span className="text-[10px] text-amber-400 font-mono truncate block">{progress.streakDays}d streak · {progress.xp} XP</span>
                  </div>
                </button>
              </div>

              {/* Categorized Menu Groups */}
              <div className="space-y-4">
                {navGroups.map(group => {
                  const GroupIcon = group.icon;
                  const isGroupActive = group.items.some(i => i.id === activeTab);
                  return (
                    <div key={group.id} className="space-y-1.5">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <GroupIcon className={`w-3.5 h-3.5 ${isGroupActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                          <span>{group.label}</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-500 border border-slate-800">
                          {group.items.length} Modules
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {group.items.map(item => {
                          const ItemIcon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavigate(item.id)}
                              className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer text-left border min-h-[48px] ${
                                isActive
                                  ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                                  : 'bg-slate-900/60 hover:bg-slate-850 text-slate-300 border-slate-800/80 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                                <div className={`p-1.5 sm:p-2 rounded-xl shrink-0 ${
                                  isActive 
                                    ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-sm' 
                                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                                }`}>
                                  <ItemIcon className="w-4 h-4" />
                                </div>
                                <div className="overflow-hidden">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold truncate block">{item.label}</span>
                                    {isActive && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 block truncate font-sans">
                                    {item.desc}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions & Support in Mobile Drawer */}
              <div className="pt-3 border-t border-slate-800/90 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnrollment();
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                  <span>Inquire About Cape Town Live Workshops</span>
                </button>

                <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-bold text-emerald-400">100% Free Terminal Resources</span>
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{soundEnabled ? 'Audio On' : 'Audio Off'}</span>
                    </button>
                  </div>
                  <a 
                    href="https://globalforexclub.co.za" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-cyan-400 hover:underline font-bold"
                  >
                    Premium FX Mastery Workshops · globalforexclub.co.za ↗
                  </a>
                  <a 
                    href="mailto:info@globalforexclub.co.za" 
                    className="block text-slate-300 hover:text-white truncate"
                  >
                    Inquiries: info@globalforexclub.co.za
                  </a>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 cursor-pointer transition-colors"
                >
                  Close Menu
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};
