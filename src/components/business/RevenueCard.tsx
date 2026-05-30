import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { TrendingUp, DollarSign } from 'lucide-react';

export const RevenueCard: React.FC = () => {
  const { stats } = useBusiness();

  return (
    <div 
      id="revenue-card" 
      className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/10"
    >
      {/* Decorative ambient bubble glows */}
      <div id="glow-1" className="absolute -right-12 -top-12 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div id="glow-2" className="absolute -left-16 -bottom-16 w-32 h-32 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />

      <div id="revenue-header" className="flex justify-between items-start">
        <div>
          <span id="revenue-title" className="text-xs uppercase font-sans tracking-widest font-semibold text-amber-950/70">
            Today's Revenue
          </span>
          <h2 id="revenue-amount" className="text-3xl font-bold tracking-tight font-sans mt-1">
            {stats.todayRevenue.toLocaleString()} <span className="text-lg font-medium">DA</span>
          </h2>
        </div>
        <div id="revenue-trend-badge" className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/15 text-xs font-semibold font-sans">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+15.4%</span>
        </div>
      </div>

      {/* Sparkline Graph */}
      <div id="revenue-sparkline" className="mt-6 h-14 flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M 0 25 C 10 18, 20 28, 30 15 C 40 5, 50 25, 60 12 C 70 2, 80 18, 90 8 C 95 3, 100 5, 100 5"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 0 25 C 10 18, 20 28, 30 15 C 40 5, 50 25, 60 12 C 70 2, 80 18, 90 8 C 95 3, 100 5, 100 5 L 100 30 L 0 30 Z"
            fill="url(#gradient)"
          />
        </svg>
      </div>

      <div id="revenue-footer" className="mt-2.5 flex justify-between items-center text-[11px] font-sans text-amber-950/65 font-medium">
        <span>Payout status validated</span>
        <span>Updated real-time</span>
      </div>
    </div>
  );
};
