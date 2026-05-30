import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Wallet, AlertCircle, ArrowUpRight, ArrowDownLeft, Check, Compass, Users2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BusinessWallet: React.FC = () => {
  const { wallet, withdrawFunds } = useBusiness();
  const [method, setMethod] = useState<'BaridiMob' | 'CCP' | 'Bank Transfer'>('BaridiMob');
  const [amountInput, setAmountInput] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  
  // feedback status states
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    setSuccessText('');

    const parsedAmount = Number(amountInput);
    if (!amountInput || isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorText('Please specify a valid positive amount.');
      return;
    }

    if (parsedAmount > wallet.balance) {
      setErrorText('Insufficient funds in your FlashGo balance.');
      return;
    }

    if (!accountDetails.trim()) {
      setErrorText(`Account specifications for ${method} payout is mandatory.`);
      return;
    }

    // Call state context
    const res = withdrawFunds(parsedAmount, method, accountDetails);
    if (res.success) {
      setSuccessText(`Payout request of ${parsedAmount.toLocaleString()} DA registered successfully via ${method}!`);
      setAmountInput('');
      setAccountDetails('');
    } else {
      setErrorText(res.error || 'An error occurred during withdrawal.');
    }
  };

  return (
    <div id="wallet-view-wrapper" className="space-y-5 pb-24 text-left">
      {/* Page Title */}
      <div>
        <h1 id="wallet-main-title" className="text-xl font-bold font-sans text-zinc-105">Wallet</h1>
        <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Withdraw earnings, check logs and link bank details</p>
      </div>

      {/* 1. Golden Available Balance card */}
      <div 
        id="balance-card" 
        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/10"
      >
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-950/70 font-sans">
          Available Balance
        </span>
        
        <h2 id="balance-amount" className="text-3xl font-extrabold tracking-tight mt-1 mb-4 font-sans">
          {wallet.balance.toLocaleString()} <span className="text-xl font-medium">DA</span>
        </h2>
        
        {/* Quick action info badge */}
        <div className="bg-black/15 py-2 px-3.5 rounded-xl flex items-center justify-between text-xs font-medium font-sans">
          <span className="text-amber-950/80">Withdraw processing times</span>
          <span className="font-bold underline text-black">Instant 24-48h</span>
        </div>
      </div>

      {/* 2. Standard Withdraw form trigger */}
      <div id="withdraw-form-wrapper" className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850/80">
        <h3 className="text-sm font-bold text-zinc-200 font-sans mb-3.5 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-amber-400" />
          Request Payout
        </h3>

        <form id="payout-submission-form" onSubmit={handleWithdrawSubmit} className="space-y-4 font-sans text-xs">
          {/* Method selector tabs */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 font-sans">
              Withdrawal Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['BaridiMob', 'CCP', 'Bank Transfer'] as const).map((ch) => {
                const isSelected = method === ch;
                return (
                  <button
                    id={`payout-ch-${ch.replace(' ', '')}`}
                    key={ch}
                    type="button"
                    onClick={() => {
                      setMethod(ch);
                      setErrorText('');
                      setSuccessText('');
                    }}
                    className={`py-2 px-2.5 rounded-xl text-[10px] font-bold tracking-wide border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-black border-transparent shadow shadow-amber-400/5'
                        : 'bg-zinc-950/70 text-zinc-450 border-zinc-855 hover:text-zinc-200'
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount and RIP Account Details inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 font-sans">
                Amount (DA)
              </label>
              <input
                id="withdraw-amount-input"
                type="number"
                placeholder="e.g. 25000"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full bg-zinc-950/50 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 font-sans">
                {method === 'BaridiMob' ? 'RIP Number (16 Digits)' : method === 'CCP' ? 'CCP Account + Key' : 'IBAN Account Details'}
              </label>
              <input
                id="withdraw-details-input"
                type="text"
                placeholder={method === 'BaridiMob' ? '007999990012345678' : method === 'CCP' ? 'e.g. 123456 Key 18' : 'e.g. DZ95 0010 0000 1234 5678'}
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                className="w-full bg-zinc-950/50 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Feedback response notifications */}
          {errorText && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] leading-relaxed flex items-start gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorText}</span>
            </div>
          )}

          {successText && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] leading-relaxed flex items-start gap-1.5">
              <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[3px]" />
              <span>{successText}</span>
            </div>
          )}

          <button
            id="btn-trigger-withdrawal-submit"
            type="submit"
            className="w-full bg-zinc-800 hover:bg-zinc-750 text-amber-500 hover:text-amber-400 text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer border border-zinc-750/70"
          >
            Confirm Withdrawal Request
          </button>
        </form>
      </div>

      {/* 3. Recent Transactions List (Interactive Feed) */}
      <div id="transactions-feed-panel" className="space-y-3.5">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-zinc-200 font-sans">
            Recent Activities
          </h3>
          <button
            id="toggle-history-exp"
            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
            className="text-[11px] font-bold text-amber-400 font-sans hover:underline cursor-pointer"
          >
            {isHistoryExpanded ? 'Show Minimalist' : 'Withdrawal History'}
          </button>
        </div>

        <div id="transactions-board" className="space-y-2.5">
          {wallet.transactions
            .slice(0, isHistoryExpanded ? undefined : 4)
            .map((tx) => {
              const isCredit = tx.type === 'credit';
              const isRefund = tx.status === 'Refund';
              const isPayoutPending = tx.status === 'Pending Payout';

              return (
                <div 
                  id={`transaction-item-${tx.id}`}
                  key={tx.id} 
                  className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-900 hover:border-zinc-850 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isRefund 
                        ? 'bg-red-500/10 text-red-400' 
                        : isPayoutPending 
                        ? 'bg-amber-500/15 text-amber-400' 
                        : isCredit 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {isPayoutPending ? (
                        <ArrowDownLeft className="w-4 h-4 stroke-[2.5px]" />
                      ) : isRefund ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5px]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-250 font-sans leading-tight">
                        {tx.description}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-sans block mt-0.5">
                        {tx.date} • {tx.id}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-bold font-mono tracking-tight block ${
                      isCredit && !isRefund ? 'text-green-400' : 'text-zinc-205'
                    }`}>
                      {isCredit ? '+' : '-'}{tx.amount.toLocaleString()} DA
                    </span>
                    <span className={`text-[9px] font-sans font-semibold inline-block mt-0.5 rounded px-1.5 py-0.5 ${
                      tx.status === 'Received'
                        ? 'bg-green-500/10 text-green-400'
                        : tx.status === 'Pending Payout'
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {tx.status}
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
