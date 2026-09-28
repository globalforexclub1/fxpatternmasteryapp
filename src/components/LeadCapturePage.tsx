import React, { useState, useEffect } from 'react';
import { GlobalForexClubLogo } from './GlobalForexClubLogo.tsx';
import { 
  Building2, 
  Mail, 
  Phone, 
  User, 
  CheckCircle2, 
  Copy, 
  Check, 
  Send, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Globe2,
  Calendar,
  ExternalLink,
  Users,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LeadRegistration } from '../types.ts';

interface LeadCapturePageProps {
  onSuccessEnter: (studentName: string, studentEmail: string) => void;
  onClose?: () => void;
}

export const LeadCapturePage: React.FC<LeadCapturePageProps> = ({
  onSuccessEnter,
  onClose
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'inquire' | 'info' | 'community'>('inquire');
  
  // Workshop Inquiry State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [preferredFormat, setPreferredFormat] = useState<'face_to_face' | 'live_stream' | 'both'>('face_to_face');
  const [cityLocation, setCityLocation] = useState<string>('Cape Town, South Africa');
  const [experienceLevel, setExperienceLevel] = useState<string>('Intermediate (Trading 6-12 months)');
  const [message, setMessage] = useState<string>('');

  // Status & Confirmation
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Generate Inquiry Reference ID
  const [generatedRef] = useState<string>(() => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `GFC-WS-${randomNum}`;
  });

  const handleCopyWebsite = () => {
    navigator.clipboard.writeText('https://globalforexclub.co.za');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@globalforexclub.co.za');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !contactNumber.trim()) {
      alert('Please fill in your Full Name, Email, and WhatsApp / Contact Number.');
      return;
    }

    try {
      const saved = localStorage.getItem('gfc_workshop_inquiries');
      const inquiries = saved ? JSON.parse(saved) : [];
      const newEntry: LeadRegistration = {
        id: generatedRef,
        fullName: fullName.trim(),
        email: email.trim(),
        contactNumber: contactNumber.trim(),
        country: cityLocation,
        plan: preferredFormat,
        paymentReference: '100% Free App User Inquiry',
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('gfc_workshop_inquiries', JSON.stringify([newEntry, ...inquiries]));
    } catch {}

    setIsSubmitted(true);
    confetti({ particleCount: 70, spread: 65 });

    // Open mail client addressed to info@globalforexclub.co.za
    const subject = encodeURIComponent(`[Workshop Inquiry] ${fullName.trim()} - Premium FX Mastery (${generatedRef})`);
    const body = encodeURIComponent(
      `Hello Global Forex Club Team,\n\n` +
      `I am interested in attending your upcoming Premium FX Mastery Workshops:\n\n` +
      `Full Name: ${fullName.trim()}\n` +
      `Email Address: ${email.trim()}\n` +
      `WhatsApp / Phone: ${contactNumber.trim()}\n` +
      `Location: ${cityLocation}\n` +
      `Workshop Format: ${preferredFormat === 'face_to_face' ? 'Face-to-Face Physical (Cape Town)' : preferredFormat === 'live_stream' ? 'Interactive Live Stream Online' : 'Both (In-Person & Live Stream)'}\n` +
      `Trading Experience: ${experienceLevel}\n` +
      `Notes / Questions: ${message.trim() || 'Please send schedule and venue details.'}\n\n` +
      `Sent via FX Pattern Master Technical Terminal.`
    );
    window.location.href = `mailto:info@globalforexclub.co.za?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6 text-slate-200 animate-fadeIn">
      {/* 100% Free Notification & Workshop Promotion Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/40 p-6 shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <GlobalForexClubLogo variant="compact" showSlogan={true} />
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs font-mono font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                100% ABSOLUTELY FREE PLATFORM
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
                Africa's Best Free FX Hub
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Face-to-Face &amp; Live Premium FX Mastery Workshops
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every tool, chart pattern, and trade simulator on this app is <strong className="text-emerald-400">100% Free</strong>. If you want intensive hands-on trading mentorship, attend our live in-person Cape Town workshops or online masterclasses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="https://globalforexclub.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-transform transform hover:scale-[1.02] cursor-pointer"
            >
              <span>globalforexclub.co.za</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onSuccessEnter(fullName || 'Trader', email)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Enter Free Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Segmented Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('inquire')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'inquire'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Workshop Inquiry &amp; Seat Reservation</span>
        </button>

        <button
          onClick={() => setActiveSubTab('info')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'info'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>About Premium FX Mastery</span>
        </button>

        <button
          onClick={() => setActiveSubTab('community')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'community'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>Official Contacts &amp; Desk</span>
        </button>
      </div>

      {/* TAB 1: WORKSHOP INQUIRY FORM */}
      {activeSubTab === 'inquire' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            {!isSubmitted ? (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    Reserve Your Seat or Inquire for Upcoming Dates
                  </h3>
                  <p className="text-xs text-slate-400">
                    Submit your details and our desk will connect with you via WhatsApp or Email regarding upcoming workshop venues, live stream access, and curriculum schedules.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sipho Dlamini"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sipho@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp / Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+27 82 123 4567"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>City / Location</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cape Town, Atlantis, JHB"
                      value={cityLocation}
                      onChange={(e) => setCityLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    Preferred Workshop Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreferredFormat('face_to_face')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        preferredFormat === 'face_to_face'
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">🏛 Face-to-Face</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">In-Person Floor Training (Cape Town)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreferredFormat('live_stream')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        preferredFormat === 'live_stream'
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">📡 Live Stream</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Interactive Online Room with Q&amp;A</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreferredFormat('both')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        preferredFormat === 'both'
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">✨ Hybrid / Either</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Notify me for both options</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    Questions / Comments (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your trading journey or specific questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to info@globalforexclub.co.za</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSuccessEnter(fullName || 'Trader', email)}
                    className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition-colors cursor-pointer"
                  >
                    Enter Free Terminal Now
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5 text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-white">
                    Thank You, {fullName}! Inquiry Dispatched.
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been compiled for <strong className="text-emerald-400">info@globalforexclub.co.za</strong>. Our workshop coordinators will contact you via WhatsApp or Email shortly.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reference:</span>
                    <span className="text-cyan-400 font-bold">{generatedRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preferred Format:</span>
                    <span className="text-white capitalize">{preferredFormat.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white">{cityLocation}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => onSuccessEnter(fullName, email)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    Launch 100% Free Terminal Now
                  </button>

                  <a
                    href="https://globalforexclub.co.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column: What You Get In Workshops */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              {/* Live Workshop Floor Visual */}
              <div className="rounded-xl overflow-hidden border border-slate-800 relative group">
                <img
                  src="/src/assets/images/live_workshop_floor_1790448181434.jpg"
                  alt="In-person Cape Town trading masterclass with mentor"
                  referrerPolicy="no-referrer"
                  className="w-full h-40 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-3">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    🏛 Cape Town Floor Training &amp; Live Stream
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                Why Attend Live Workshops?
              </span>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-white block font-semibold">Live Market Floor Action</strong>
                    <span className="text-slate-400 leading-relaxed">
                      Watch seasoned traders trade London &amp; New York sessions live with algorithmic order flow.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-white block font-semibold">Live Psychological De-biasing</strong>
                    <span className="text-slate-400 leading-relaxed">
                      Eliminate fear, greed, revenge trading, and over-leveraging with personalized coaching.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-white block font-semibold">Exclusive Trader Network</strong>
                    <span className="text-slate-400 leading-relaxed">
                      Connect with disciplined institutional peers in Cape Town and across Southern Africa.
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Website & Email links */}
              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Official Portal:</span>
                  <a 
                    href="https://globalforexclub.co.za" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    globalforexclub.co.za ↗
                  </a>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Inquiry Email:</span>
                  <a 
                    href="mailto:info@globalforexclub.co.za" 
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    info@globalforexclub.co.za
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WORKSHOP DETAILS */}
      {activeSubTab === 'info' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Curriculum Overview
            </span>
            <h3 className="text-2xl font-black text-white">
              The Premium FX Mastery Workshop Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed for serious forex traders seeking institutional execution standards, real-time liquidity analysis, and capital defense protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-2">
                <Compass className="w-4 h-4" />
                1. Institutional Order Flow &amp; Liquidity Sweeps
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deconstruct how central banks, tier-1 liquidity providers, and algorithms accumulate orders by hunting retail stops. Learn to wait for the sweep and trade in harmony with smart money.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="text-sm font-bold text-cyan-400 font-mono flex items-center gap-2">
                <Zap className="w-4 h-4" />
                2. Live Execution &amp; Timing Triggers
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Execute live during peak volatility sessions (London Open 07:00 GMT and New York Open 12:00 GMT). Master entry confirmation triggers, ATR buffer safety margins, and scale-out mechanics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="text-sm font-bold text-indigo-400 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                3. Mathematical Capital Defense Framework
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Eradicate account blowups permanently. Master strict 1% to 2% dollar risk formulas, position sizing mathematics, and dynamic stop loss to breakeven rules at 1:2 Risk/Reward.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h4 className="text-sm font-bold text-purple-400 font-mono flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                4. Hands-on Trade Plan Audit
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every attendee receives an objective audit of their trading journal, risk parameters, and emotional discipline patterns from veteran Global Forex Club mentors.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-slate-400 block font-mono">Ready to get schedule &amp; registration details?</span>
              <strong className="text-white text-sm">Visit https://globalforexclub.co.za or email info@globalforexclub.co.za</strong>
            </div>

            <a
              href="https://globalforexclub.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <span>Visit globalforexclub.co.za</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL CONTACTS & DESK */}
      {activeSubTab === 'community' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Official Channels
            </span>
            <h3 className="text-2xl font-black text-white">
              Connect With Global Forex Club
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We welcome questions, workshop seat inquiries, and technical feedback from our community of forex traders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Official Portal</strong>
                  <span className="text-xs text-slate-400">Main website &amp; workshop calendar</span>
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-400 font-bold truncate">https://globalforexclub.co.za</span>
                <button
                  onClick={handleCopyWebsite}
                  className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-mono cursor-pointer shrink-0 ml-2"
                >
                  {copiedLink ? 'Copied' : 'Copy'}
                </button>
              </div>
              <a
                href="https://globalforexclub.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Visit Portal ↗</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block text-sm">Email Inquiries</strong>
                  <span className="text-xs text-slate-400">Direct response desk</span>
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-xs font-mono text-emerald-400 font-bold truncate">info@globalforexclub.co.za</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-mono cursor-pointer shrink-0 ml-2"
                >
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
              <a
                href="mailto:info@globalforexclub.co.za"
                className="w-full py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Compose Email ↗</span>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Physical Training Office &amp; Resource Hub:</span>
            </div>
            <p className="leading-relaxed">
              ATL Resource Hub, 32 Grosvenor Avenue, Avondale, Atlantis, Cape Town, South Africa
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
