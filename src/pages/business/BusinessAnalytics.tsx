import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { AreaChart, TrendingUp, Users, ShoppingBag, BadgeCheck, DollarSign, Award, ChevronDown } from 'lucide-react';

export const BusinessAnalytics: React.FC = () => {
  const { products } = useBusiness();
  const [period, setPeriod] = useState<'This Week' | 'This Month' | 'This Year'>('This Month');

  // Hardcoded gorgeous high-fidelity statistics to reflect mockup
  const totalRevenue = '850,000';
  const ordersCount = 245;
  const customersCount = 198;
  const completedCount = 230;

  const monthCoordinates = [
    { label: '1', val: 30 },
    { label: '8', val: 74 },
    { label: '15', val: 62 },
    { label: '22', val: 88 },
    { label: '30', val: 110 }
  ];

  return (
    <div id="analytics-view-wrapper" className="space-y-5 pb-24 text-left">
      {/* Page Header */}
      <div className="flex justify-between items-center bg-zinc-950/60 py-2">
        <div>
          <h1 id="analytics-main-title" className="text-xl font-bold font-sans text-zinc-101">Analytics</h1>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Audit payouts, order statistics and customer satisfaction</p>
        </div>

        {/* Period dropdown */}
        <div className="relative">
          <select
            id="select-analytics-period"
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="appearance-none bg-zinc-900 border border-zinc-850 py-2 pl-3.5 pr-8 rounded-xl text-xs font-bold text-zinc-300 font-sans focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
          >
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 1. Golden analytics master summary card */}
      <div 
        id="analytics-revenue-master" 
        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/10"
      >
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-950/70 font-sans">
          Total Revenue
        </span>
        
        <div className="flex justify-between items-end mt-1">
          <h2 id="total-revenue-value" className="text-3xl font-extrabold tracking-tight font-sans">
            {totalRevenue} <span className="text-lg font-medium">DA</span>
          </h2>
          {/* Spark columns to look identical to mockup graphic */}
          <div className="flex items-end gap-1.5 h-12 pb-1 bg-black/5 px-2.5 py-1.5 rounded-lg border border-black/5">
            <span className="w-1.5 h-4 bg-amber-950/20 rounded-sm" />
            <span className="w-1.5 h-6 bg-amber-950/30 rounded-sm" />
            <span className="w-1.5 h-9 bg-amber-950/50 rounded-sm" />
            <span className="w-1.5 h-7 bg-amber-950/45 rounded-sm" />
            <span className="w-1.5 h-10 bg-black rounded-sm" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs font-medium text-amber-950/75 border-t border-black/10 pt-3">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-black" />
            +15% vs last month
          </span>
          <span className="italic">Data synced Live</span>
        </div>
      </div>

      {/* 2. Bento micro stats grid */}
      <div id="bento-grid" className="grid grid-cols-3 gap-3">
        <div id="bento-orders" className="p-3.5 rounded-xl bg-zinc-90 w-full bg-zinc-900 border border-zinc-900/60 text-center">
          <span className="text-[10px] text-zinc-500 font-bold tracking-wide block uppercase font-sans">Orders</span>
          <span className="text-lg font-extrabold text-zinc-200 block font-sans mt-1">{ordersCount}</span>
        </div>

        <div id="bento-customers" className="p-3.5 rounded-xl bg-zinc-90 w-full bg-zinc-900 border border-zinc-900/60 text-center">
          <span className="text-[10px] text-zinc-500 font-bold tracking-wide block uppercase font-sans">Customers</span>
          <span className="text-lg font-extrabold text-zinc-200 block font-sans mt-1">{customersCount}</span>
        </div>

        <div id="bento-completed" className="p-3.5 rounded-xl bg-zinc-90 w-full bg-zinc-900 border border-zinc-900/60 text-center">
          <span className="text-[10px] text-zinc-500 font-bold tracking-wide block uppercase font-sans">Completed</span>
          <span className="text-lg font-extrabold text-green-400 block font-sans mt-1">{completedCount}</span>
        </div>
      </div>

      {/* 3. Monthly Revenue curve chart */}
      <div id="analytics-chart-panel" className="p-5 rounded-2xl bg-zinc-905 bg-zinc-900 border border-zinc-850/80">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-200">Revenue Curve Chart</h3>
            <span className="text-[10px] text-zinc-500 font-sans">Chronological sales progression overview</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">120K Max</span>
        </div>

        {/* SVG Custom Line Chart mimicking the precise curvature in coordinates of mockup */}
        <div className="relative h-32 w-full pt-2">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="border-b border-zinc-400 w-full h-0" />
            <div className="border-b border-zinc-400 w-full h-0" />
            <div className="border-b border-zinc-400 w-full h-0" />
            <div className="border-b border-zinc-400 w-full h-0" />
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Curved Path */}
            <path
              d="M 5 35 Q 25 15 45 28 T 85 8 T 95 5"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Gradient filled area */}
            <path
              d="M 5 35 Q 25 15 45 28 T 85 8 T 95 5 L 95 40 L 5 40 Z"
              fill="url(#glowGrad)"
            />
            {/* Dots */}
            <circle cx="5" cy="35" r="1.5" fill="black" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="27" cy="21" r="1.5" fill="black" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="49" cy="27" r="1.5" fill="black" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="73" cy="11" r="1.5" fill="black" stroke="#FBBF24" strokeWidth="1" />
            <circle cx="95" cy="5" r="1.8" fill="#FBBF24" className="animate-pulse" />
          </svg>
        </div>

        {/* Days label axis mapping */}
        <div className="flex justify-between items-center px-1 pt-3.5 text-zinc-550 text-[10px] font-bold font-sans">
          <span>Day 1</span>
          <span>Day 8</span>
          <span>Day 15</span>
          <span>Day 22</span>
          <span>Day 30</span>
        </div>
      </div>

      {/* 4. Best Selling Products list table */}
      <div id="analytics-best-sellers">
        <h3 className="text-sm font-bold font-sans text-zinc-200 mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          Best Selling Products
        </h3>

        <div className="space-y-2.5">
          {products.slice(0, 3).map((prod) => {
            const orderCount = prod.id === 'P-1' ? 120 : prod.id === 'P-2' ? 98 : 210;
            const revenueSum = prod.id === 'P-1' ? '24,000' : prod.id === 'P-2' ? '19,600' : '10,500';

            return (
              <div 
                id={`analytics-top-prod-${prod.id}`}
                key={prod.id} 
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-90 w-full bg-zinc-900 border border-zinc-900 hover:border-zinc-850/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-10 h-10 object-cover rounded-lg bg-zinc-950 border border-zinc-850"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 font-sans leading-tight">{prod.name}</h4>
                    <span className="text-[10px] text-zinc-550 font-sans block mt-0.5">{orderCount} units sold</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold font-sans text-amber-400 block">
                    {revenueSum} DA
                  </span>
                  <span className="text-[9px] text-zinc-500 font-sans font-semibold inline-flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    +12% monthly growth
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
