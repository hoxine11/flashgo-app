import { useState } from 'react';
import { CreditCard, ArrowDownLeft, ArrowUpRight, Plus, Check, Wallet, Smartphone, ShieldCheck } from 'lucide-react';
import { WalletTransaction, UserProfile } from '../types';

interface AppWalletProps {
  lang: 'ar' | 'en';
  transactions: WalletTransaction[];
  user: UserProfile;
  onAddFunds: (amount: number) => void;
}

export default function AppWallet({ lang, transactions, user, onAddFunds }: AppWalletProps) {
  const isAr = lang === 'ar';
  
  // State
  const [refillAmount, setRefillAmount] = useState(1000);
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9382');
  const [customRefillInput, setCustomRefillInput] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const presets = [500, 1000, 2000, 5000];

  const handleRefill = () => {
    const finalAmount = customRefillInput ? parseFloat(customRefillInput) : refillAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert(isAr ? 'الرجاء إدخال مبلغ صحيح!' : 'Please enter a valid recharge amount!');
      return;
    }

    onAddFunds(finalAmount);
    setSuccessMsg(true);
    setCustomRefillInput('');
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-neutral-900/95 backdrop-blur-md px-4 py-3 border-b border-neutral-800 text-center sticky top-0 z-15">
        <h3 className="font-bold text-sm tracking-tight text-white">
          {isAr ? 'المحفظة والمدفوعات فلاش' : 'Wallet & Ledger payments'}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Balance Card Block */}
        <div className="bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-350 text-black rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 text-black/10 scale-150 transform rotate-12 pointer-events-none">
            <Wallet className="h-28 w-28 stroke-[1.5]" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-black/70 font-bold uppercase tracking-wider">{isAr ? 'الرصيد المتاح حالياً' : 'Total Available Balance'}</span>
            <span className="text-[8px] uppercase tracking-widest bg-black text-amber-400 px-2 py-0.5 rounded-full font-black">Flash Pay</span>
          </div>

          <div className="mt-2.5 space-y-1">
            <h2 className="text-3xl font-black font-mono">
              {user.balance.toFixed(0)} <span className="text-sm font-bold font-sans">{isAr ? 'دج' : 'DA'}</span>
            </h2>
            <div className="flex items-center gap-2 text-black/80 text-[10px] pt-1">
              <span>⭐️ {user.loyaltyPoints} {isAr ? 'نقطة ولاء' : 'Loyalty Points'}</span>
              <span>•</span>
              <span className="underline decoration-dotted cursor-pointer">{isAr ? 'استرجاع مكافآت' : 'Redeem rewards'}</span>
            </div>
          </div>
        </div>

        {/* Refill Topup Section */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3.5 space-y-3">
          <h4 className="text-xs font-bold text-neutral-250 flex items-center gap-1.5 border-b border-neutral-850 pb-2">
            <CreditCard className="h-4 w-4 text-amber-400" />
            <span>{isAr ? 'شحن رصيد المحفظة الفوري' : 'Recharge Wallet Instantly'}</span>
          </h4>

          {/* Amount Presets */}
          <div className="grid grid-cols-4 gap-1.5">
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setRefillAmount(amt);
                  setCustomRefillInput('');
                }}
                className={`py-2 text-xs font-bold rounded-lg font-mono border transition-all cursor-pointer ${refillAmount === amt && !customRefillInput ? 'bg-amber-400 text-black border-amber-400 shadow' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-750 text-neutral-300'}`}
              >
                +{amt}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-2 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-neutral-500 font-bold">{isAr ? 'مبلغ مخصص' : 'Custom'}</span>
            <input
              type="number"
              placeholder={isAr ? 'أدخل مبلغ الشحن' : 'Enter amount'}
              value={customRefillInput}
              onChange={(e) => {
                setCustomRefillInput(e.target.value);
                setRefillAmount(0);
              }}
              className="bg-transparent text-xs outline-none text-neutral-200 border-none p-0 focus:ring-0 flex-1 text-center font-black font-mono"
            />
            <span className="text-[10px] text-amber-400 font-bold">{isAr ? 'دج' : 'DA'}</span>
          </div>

          {/* Simulated Card input */}
          <div className="space-y-1">
            <label className="text-[9px] text-neutral-500 font-semibold block">{isAr ? 'بطاقة الدفع المخزنة المشفّرة' : 'Stored Payment Card'}</label>
            <div className="flex items-center justify-between bg-neutral-950 px-2.5 py-1.5 rounded-lg border border-neutral-850 text-neutral-300">
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span>💳</span>
                <span>{cardNumber}</span>
              </div>
              <button 
                onClick={() => {
                  const val = prompt(isAr ? 'أدخل رقم بطاقة الذهبية أو بنكية CIB جديدة' : 'Type new Edahabia/CIB details');
                  if (val) setCardNumber(`•••• •••• •••• ${val.slice(-4)}`);
                }}
                className="text-[9px] text-amber-400 underline font-semibold cursor-pointer"
              >
                {isAr ? 'تغيير' : 'Change'}
              </button>
            </div>
          </div>

          {successMsg ? (
            <div className="bg-emerald-500/15 text-emerald-400 rounded-lg p-2.5 text-center text-[10px] font-bold border border-emerald-500/30 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 animate-bounce" />
              <span>{isAr ? 'تم شحن المحفظة بنجاح، رصيدك تحدّث!' : 'Wallet recharged successfully! Check balance.'}</span>
            </div>
          ) : (
            <button
              onClick={handleRefill}
              className="w-full bg-neutral-200 hover:bg-white text-black py-2.5 rounded-xl font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 stroke-[3]" />
              <span>
                {isAr ? ` شحن رصيد ${customRefillInput || refillAmount} دج` : `Top up ${customRefillInput || refillAmount} DA`}
              </span>
            </button>
          )}
        </div>

        {/* Ledger logs */}
        <div className="space-y-2.5 pt-1">
          <h4 className="text-xs font-bold text-neutral-405 border-r border-neutral-700 pr-1.5 font-sans">
            {isAr ? 'سجل العمليات والمدفوعات' : 'Payment Transaction Logbook'}
          </h4>

          {transactions.map((tx) => (
            <div key={tx.id} className="bg-neutral-900/60 border border-neutral-850 rounded-xl p-3 flex justify-between items-center text-xs hover:border-neutral-800 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg flex items-center justify-center ${tx.type === 'incoming' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {tx.type === 'incoming' ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                </div>
                <div className="text-left">
                  <span className="font-bold text-neutral-200 block">{isAr ? tx.title : tx.titleEn}</span>
                  <span className="text-[9px] text-neutral-500 block leading-none mt-1 font-mono">{tx.date}</span>
                </div>
              </div>

              <span className={`font-mono font-bold ${tx.type === 'incoming' ? 'text-emerald-400' : 'text-neutral-300'}`}>
                {tx.type === 'incoming' ? '+' : '-'}{tx.amount.toFixed(0)} {isAr ? 'دج' : 'DA'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
