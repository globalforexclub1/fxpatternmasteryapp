import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'hero';
  className?: string;
  showSlogan?: boolean;
}

/**
 * Iconic Global Forex Club Circular Candlestick Emblem ("O")
 * Exactly matches the attached official logo:
 * - Solid Golden-Yellow circular ring
 * - Left Bearish Red Candlestick
 * - Center Small Red Candlestick (Lower Dip)
 * - Right Bullish Green Candlestick (Tall)
 */
export const CandlestickCircleEmblem: React.FC<{
  className?: string;
  size?: string;
}> = ({ className = '', size = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${size} ${className} shrink-0 drop-shadow-md`}
    aria-label="Global Forex Club Candlestick Emblem"
  >
    {/* Dark Inner Core */}
    <circle cx="50" cy="50" r="46" fill="#000000" />

    {/* Outer Golden-Yellow Ring */}
    <circle
      cx="50"
      cy="50"
      r="42"
      stroke="#F5A623"
      strokeWidth="8"
      fill="#000000"
    />

    {/* 1. Left Bearish Red Candlestick */}
    <line
      x1="34"
      y1="24"
      x2="34"
      y2="40"
      stroke="#E52525"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect
      x="28"
      y="40"
      width="12"
      height="26"
      rx="1.5"
      fill="#E52525"
    />
    <line
      x1="34"
      y1="66"
      x2="34"
      y2="78"
      stroke="#E52525"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* 2. Center Small Red Candlestick (Lower Dip) */}
    <line
      x1="50"
      y1="52"
      x2="50"
      y2="58"
      stroke="#E52525"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="46.5"
      y="58"
      width="7"
      height="9"
      rx="1"
      fill="#E52525"
    />
    <line
      x1="50"
      y1="67"
      x2="50"
      y2="76"
      stroke="#E52525"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* 3. Right Bullish Green Candlestick (Tall) */}
    <line
      x1="66"
      y1="18"
      x2="66"
      y2="34"
      stroke="#00C853"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect
      x="60"
      y="34"
      width="12"
      height="30"
      rx="1.5"
      fill="#00C853"
    />
    <line
      x1="66"
      y1="64"
      x2="66"
      y2="76"
      stroke="#00C853"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const GlobalForexClubLogo: React.FC<LogoProps> = ({
  variant = 'compact',
  className = '',
  showSlogan = true
}) => {
  // 1. Icon Only Variant
  if (variant === 'icon') {
    return <CandlestickCircleEmblem className={className} size="w-9 h-9" />;
  }

  // 2. Compact Variant (For Sticky Navigation Header, Dialogs & Certificate)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
        {/* Candlestick Emblem */}
        <CandlestickCircleEmblem size="w-8 h-8 sm:w-9 sm:h-9" />

        <div className="flex flex-col justify-center min-w-0">
          {/* Main Brand Typography */}
          <div className="flex items-baseline leading-none font-black tracking-tight text-sm sm:text-base font-['Orbitron',sans-serif]">
            <span className="text-white drop-shadow-sm font-black mr-1">Global</span>
            <span className="text-[#F5A623] drop-shadow-sm font-black">Forex</span>
            <span className="text-white drop-shadow-sm font-black ml-1">Club</span>
          </div>

          {/* Elegant Handwritten Script Slogan */}
          {showSlogan && (
            <div className="text-[11px] sm:text-[12px] text-[#F5A623] font-['Caveat',cursive] font-bold tracking-wide leading-none mt-1 whitespace-nowrap hidden min-[360px]:block">
              with you every pip of the trade
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Hero & Full Variant (Faithfully replicates the attached GFXC logo artwork)
  // Line 1: Global (Pure White)
  // Line 2: F[O]rex (Golden Yellow with Candlestick O-Ring) Club (Pure White)
  // Line 3: with you every pip of the trade (Golden Yellow Cursive Script)
  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      <div className="font-['Orbitron',sans-serif] tracking-tight leading-none drop-shadow-2xl">
        {/* LINE 1: "Global" in White */}
        <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-white text-left pl-1 sm:pl-2 mb-1.5 sm:mb-2.5">
          Global
        </div>

        {/* LINE 2: "F" + [O-Candlestick-Emblem] + "rex" + "Club" */}
        <div className="flex items-center text-4xl sm:text-6xl lg:text-7xl font-black">
          <span className="text-[#F5A623]">F</span>

          {/* The Circular Candlestick Emblem ("O") */}
          <div className="inline-flex items-center justify-center mx-1 sm:mx-2">
            <CandlestickCircleEmblem size="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
          </div>

          <span className="text-[#F5A623]">rex</span>
          <span className="text-white ml-2 sm:ml-4">Club</span>
        </div>
      </div>

      {/* LINE 3: "with you every pip of the trade" in Gold Cursive Calligraphy */}
      {showSlogan && (
        <div className="text-[#F5A623] font-['Caveat',cursive] font-bold text-xl sm:text-3xl lg:text-4xl tracking-wider mt-3 sm:mt-4 drop-shadow-md">
          with you every pip of the trade
        </div>
      )}
    </div>
  );
};
