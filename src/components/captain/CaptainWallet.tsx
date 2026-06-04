import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, DollarSign, Award, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap } from 'lucide-react';

interface CaptainWalletProps {
  lang: 'ar' | 'en';
  earnings: { today: number; completedCount: number; balance: number };
}

export default function CaptainWallet({ lang, earnings }: CaptainWalletProps) {
  const isAr = lang === 'ar';
  const [activeRange, setActiveRange] = useState<'day' | 'week' | 'month'>('day');

  // Realistic mock stats
  const weeklyEarnings = earnings.today + 12400;
  const monthlyEarnings = earnings.today + 48200;

  // Simulate withdrawal click
  const handleWithdrawalRequest = () => {
    if (earnings.balance < 1000) {
      alert(
        isAr 
          ? 'عذراً! الحد الأدنى لسحب رصيد محفظة  برنت هو ١٠٠٠ دج.' 
          : 'Minimum withdrawal threshold is 1000 DA.'
      );
      return;
    }
    alert(
      isAr 
        ? `تم تقديم طلب سحب رصيد بقيمة ${earnings.balance} دج بنجاح إلى حساب البريد الجاري CCP الخاص بك. ستتم المعالجة خلال ٢٤ ساعة.` 
        : `Withdrawal request for ${earnings.balance} DA submitted to your Algerian Mail CCP bank account.`
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Dynamic range toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-neutral-950 p-4 rounded-3xl border border-neutral-850">
        <div>
          <h2 className="text-base font-black text-white">{isAr ? 'محفظة أرباح العامل' : 'Earnings Dashboard'}</h2>
          <p className="text-[10px] text-neutral-450 mt-1">{isAr ? 'تابع عوائدك اليومية، الحوافز، ومؤشرات الأداء' : 'Track your courier earnings, loyalty tips and active bonuses'}</p>
        </div>

        <div className="flex gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-stretch sm:self-auto">
          <button 
            onClick={() => setActiveRange('day')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${activeRange === 'day' ? 'bg-amber-400 text-black shadow' : 'text-neutral-400 hover:text-white bg-transparent border-none'}`}
          >
            {isAr ? 'اليوم' : 'Today'}
          </button>
          <button 
            onClick={() => setActiveRange('week')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${activeRange === 'week' ? 'bg-amber-400 text-black shadow' : 'text-neutral-400 hover:text-white bg-transparent border-none'}`}
          >
            {isAr ? 'هذا الأسبوع' : 'This Week'}
          </button>
          <button 
            onClick={() => setActiveRange('month')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${activeRange === 'month' ? 'bg-amber-400 text-black shadow' : 'text-neutral-400 hover:text-white bg-transparent border-none'}`}
          >
            {isAr ? 'هذا الشهر' : 'This Month'}
          </button>
        </div>
      </div>

      {/* Main Earnings details banner with dynamic amounts */}
      <div className="bg-gradient-to-tr from-neutral-950 to-neutral-900 border border-neutral-850 p-6 rounded-3xl relative overflow-hidden text-center space-y-4 shadow-xl">
        <div className="absolute top-4 right-4 bg-amber-400/10 text-amber-400 p-2.5 rounded-2xl border border-amber-400/20">
          <TrendingUp className="h-5 w-5" />
        </div>

        <span className="text-[11px] font-black text-neutral-400 tracking-wider uppercase block">
          {activeRange === 'day' && (isAr ? 'أرباح اليوم الفعلية من التوصيل' : 'TODAY COUPON REVENUE')}
          {activeRange === 'week' && (isAr ? 'مجموع أرباح هذا الأسبوع الجاري' : 'WEEKLY CUMULATED REVENUE')}
          {activeRange === 'month' && (isAr ? 'مجموع أرباح الشهر الحالي' : 'MONTHLY CUMULATED REVENUE')}
        </span>

        <h1 className="text-3xl md:text-5xl font-black font-mono text-white tracking-tight">
          {activeRange === 'day' && `${earnings.today} `}
          {activeRange === 'week' && `${weeklyEarnings} `}
          {activeRange === 'month' && `${monthlyEarnings} `}
          <span className="text-sm md:text-lg font-sans font-extrabold text-amber-400">{isAr ? 'دينار جزائري (دج)' : 'DA'}</span>
        </h1>

        <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-850 max-w-sm mx-auto flex justify-between items-center text-xs font-medium text-neutral-450 px-4">
          <span>{isAr ? 'رصيدك الحالي بالمحفظة:' : 'My Ledger Wallet:'}</span>
          <span className="text-emerald-400 font-mono font-black">{earnings.balance} DA</span>
        </div>

        {/* Action buttons: Withdrawal simulation */}
        <div className="pt-2">
          <button
            onClick={handleWithdrawalRequest}
            className="bg-amber-400 hover:bg-amber-300 text-black px-8 py-3 rounded-2xl text-xs font-black shadow-lg shadow-amber-400/15 cursor-pointer transition-all active:scale-[0.98] inline-flex items-center gap-2"
          >
            <span>{isAr ? 'تقديم طلب سحب الرصيد كاش' : 'Withdraw Earnings to CCP'}</span>
            <ArrowUpRight className="h-4 w-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Charts / Performance placeholder with high-fidelity bars representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Animated Charts placeholder Block */}
        <div className="bg-neutral-950 p-5 rounded-3xl border border-neutral-850 space-y-4">
          <span className="text-[10px] text-neutral-500 font-mono tracking-wider font-bold uppercase block">
            {isAr ? 'تقرير وتوزيع عوائدك اليومية' : 'HOURLY INCOME WEIGHT MATRIX'}
          </span>

          {/* Sizable visual bars graph representation */}
          <div className="h-40 flex items-end justify-between px-2 pt-6 pb-2 border-b border-neutral-900 font-mono">
            {[
              { label: '08:00', val: '25%', money: '200' },
              { label: '11:00', val: '55%', money: '450' },
              { label: '14:00', val: '95%', money: '800' },
              { label: '17:00', val: '75%', money: '600' },
              { label: '20:00', val: '40%', money: '350' },
              { label: '23:00', val: '65%', money: '500' }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 w-8 group">
                {/* Tooltip on hover */}
                <span className="text-[7px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-all font-mono">
                  {bar.money}
                </span>
                <div 
                  className="w-4 bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-sm"
                  style={{ height: bar.val }}
                />
                <span className="text-[8px] text-neutral-550 h-3">{bar.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
            <span>{isAr ? 'متوسط الساعات الأكثر ربحية' : 'Peak hours: 12:00 - 15:00'}</span>
            <span className="text-amber-400 font-bold">⭐ {isAr ? 'حافز أوقات الذروة نشط' : 'Peak bonuses active'}</span>
          </div>
        </div>

        {/* Side Performance / Bonus target blocks */}
        <div className="bg-neutral-950 p-5 rounded-3xl border border-neutral-850 space-y-4">
          <span className="text-[10px] text-neutral-500 font-mono tracking-wider font-bold uppercase block">
            {isAr ? 'مؤشرات التقييم ومكافآت الحوافز' : 'ACTIVE BOUNTY MILESTONES'}
          </span>

          <div className="space-y-3.5 pt-1">
            {/* Row 1 */}
            <div className="flex justify-between items-start gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-800 text-amber-400 rounded-xl">
                <Award className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold text-neutral-200">
                  <span>{isAr ? 'هدف إنجاز ١٠ طلبات باليوم' : 'Complete 10 daily deliveries'}</span>
                  <span className="text-amber-400 font-mono text-[11px] font-black">+1,000 DA</span>
                </div>
                {/* Simulated bar progress */}
                <div className="w-full bg-neutral-900 rounded-full h-1 my-1.5">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(earnings.completedCount / 10) * 100}%` }} />
                </div>
                <span className="text-[9px] text-neutral-500 font-mono font-bold block">
                  {earnings.completedCount} / 10 {isAr ? 'مشاوير منجزة' : 'done'}
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between items-start gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-800 text-emerald-450 rounded-xl">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold text-neutral-200">
                  <span>{isAr ? 'حافز الالتزام وقبول الرحلات' : 'Acceptance Streak Maintainer'}</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-black">{isAr ? 'مفعل' : '98% Active'}</span>
                </div>
                <p className="text-[9px] text-neutral-500 leading-relaxed mt-1">
                  {isAr 
                    ? 'الاستمرار فوق نسبة قبول رحلات ٩٠٪ يمنحك علاوة إضافية قيمتها ١٠٪ على كل توصيلة.' 
                    : 'Maintain acceptance rates above 90% for a massive 10% flat multiplier bonus.'}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
