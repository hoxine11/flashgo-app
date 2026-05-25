import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, ShieldAlert, Sparkles, Send, FileCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface WaitingApprovalProps {
  lang: 'ar' | 'en';
  captainData: { name: string; phone: string; wilaya: string; model: string } | null;
  onInstantApprove: () => void;
  onBackToLogin: () => void;
}

export default function WaitingApproval({
  lang,
  captainData,
  onInstantApprove,
  onBackToLogin
}: WaitingApprovalProps) {
  const isAr = lang === 'ar';
  
  // Custom timeline active steps
  const [eta, setEta] = useState(isAr ? 'ساعة و ٤٥ دقيقة' : '1 hr 45 mins');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-md mx-auto p-6 bg-neutral-900 border border-neutral-850 rounded-3xl shadow-2xl relative text-center text-neutral-200"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Decorative gradient aura */}
      <div className="absolute inset-x-0 -top-12 h-36 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

      {/* Large animated clock representation */}
      <div className="relative inline-block my-6">
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl scale-125 animate-pulse" />
        <div className="relative w-20 h-20 rounded-full bg-neutral-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-2xl">
          <Clock className="h-10 w-10 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-neutral-950 p-1 rounded-full ring-4 ring-neutral-900">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <span className="text-[10px] text-amber-400 font-extrabold tracking-widest uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/15">
        {isAr ? 'التحقق التلقائي جاري حالياً' : 'LIVE AUTOMATED VERIFICATION'}
      </span>

      <h2 className="text-xl font-black text-white mt-4">
        {isAr ? 'طلب الانضمام قيد المراجعة والتدقيق' : 'Documents Under Review'}
      </h2>
      <p className="text-xs text-neutral-450 mt-2 leading-relaxed">
        {isAr 
          ? `مرحباً كابتن ${captainData?.name || 'الجديد'}! تم استلام مستندات دراجتك (${captainData?.model || 'المسجلة'}) وتجري مراجعتها وتطابق صورك الشخصية آلياً.`
          : `Hello Captain ${captainData?.name || 'candidate'}! We successfully received registration details for vehicle: ${captainData?.model || 'Smart motorcycle'}.`}
      </p>

      {/* Wilaya badge & Phone badge */}
      <div className="my-4 bg-neutral-950 p-3 rounded-2xl border border-neutral-850 text-left flex justify-between items-center text-[11px] font-semibold text-neutral-300">
        <span>📍 {captainData?.wilaya || (isAr ? 'الجزائر العاصمة' : 'Algiers')}</span>
        <span>📞 {captainData?.phone || '+213 550 12 34 56'}</span>
      </div>

      {/* Realistic status timeline blocks */}
      <div className="space-y-4 my-6 text-right">
        <h4 className="text-xs font-black text-neutral-400 tracking-wider uppercase mb-2 text-center">
          {isAr ? 'خريطة حالة التسجيل' : 'Onboarding Status Timeline'}
        </h4>

        {/* Step 1: Profile Created */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
            ✓
          </div>
          <div>
            <h6 className="text-xs font-bold text-neutral-200">{isAr ? 'تم بناء الملف وتلقي الطلب' : 'Fleet Profile Created'}</h6>
            <p className="text-[10px] text-neutral-500">{isAr ? 'تسليم البيانات والتحقق من التنسيق' : 'Data successfully pushed to system'}</p>
          </div>
        </div>

        {/* Step 2: Under Admin Verification */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-amber-400/25 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5 animate-pulse">
            ●
          </div>
          <div>
            <h6 className="text-xs font-bold text-amber-400">{isAr ? 'تدقيق مستندات الدراجة ورخصة السياقة' : 'Verification Bench Testing'}</h6>
            <p className="text-[10px] text-neutral-500">{isAr ? 'أوراق الدراجة، رخصة القيادة، الفحص الجنائي' : 'Comparing selfie hashes with national ID biometric record'}</p>
          </div>
        </div>

        {/* Step 3: Approval Pending */}
        <div className="flex items-start gap-3 opacity-40">
          <div className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-600 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">
            3
          </div>
          <div>
            <h6 className="text-xs font-bold text-neutral-400">{isAr ? 'تنشيط لوحة تحكم الكابتن الذكية' : 'Unlocking Fleet Dashboard'}</h6>
            <p className="text-[10px] text-neutral-550">{isAr ? 'بدء استقبال الطلبات المجاورة مباشرة بالجزائر' : 'Receive nearby deliveries immediately'}</p>
          </div>
        </div>
      </div>

      {/* Estimated time display */}
      <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-850/80 text-[11px] font-mono text-neutral-450 my-4 flex justify-between items-center px-4">
        <span>{isAr ? 'الوقت المتوقع للتفعيل' : 'Est. Activation Window'}</span>
        <span className="text-amber-400 font-extrabold">{eta}</span>
      </div>

      {/* Fast Simulated Approval button to unlock the Captain Dashboard */}
      <button
        onClick={onInstantApprove}
        className="w-full bg-gradient-to-tr from-amber-400 to-amber-500 text-neutral-950 font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/10 cursor-pointer animate-pulse"
      >
        <FileCheck className="h-4 w-4 stroke-[2.5]" />
        <span>{isAr ? 'موافقة فورية سريعة كمسؤول (للتجربة)' : 'Fast Approve Now (Test Simulation)'}</span>
      </button>

      {/* Return to role selection */}
      <button
        onClick={onBackToLogin}
        className="text-xs text-neutral-500 hover:text-amber-400 mt-5 block mx-auto underline transition-all font-semibold"
      >
        {isAr ? 'العودة لصفحة الدخول' : 'Go back to login screen'}
      </button>
    </motion.div>
  );
}
