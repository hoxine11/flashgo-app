import React from 'react';
import { motion } from 'motion/react';
import { User, Phone, Globe, LogOut, ShieldAlert, Award, FileText, CheckCircle, ArrowRight, Settings, Info, Tag, MapPin } from 'lucide-react';

interface CaptainProfileProps {
  lang: 'ar' | 'en';
  onLogout: () => void;
  langToggle: () => void;
  captainData: { name: string; phone: string; wilaya: string; model: string } | null;
}

export default function CaptainProfile({
  lang,
  onLogout,
  langToggle,
  captainData
}: CaptainProfileProps) {
  const isAr = lang === 'ar';

  return (
    <div className="p-4 md:p-6 space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Banner Display card containing Avatar and Quick rating */}
      <div className="bg-neutral-950 p-6 rounded-3xl border border-neutral-850/80 text-center relative overflow-hidden flex flex-col items-center">
        {/* Decorative dynamic aura */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-amber-400/5 to-transparent pointer-events-none" />

        {/* Profile Avatar representation */}
        <div className="relative inline-block mb-3">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-amber-400/80 flex items-center justify-center text-amber-400 text-2xl font-black">
            {captainData?.name ? captainData.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="absolute bottom-0 right-0 bg-emerald-400 text-black p-0.5 rounded-full ring-2 ring-neutral-950 text-[8px] font-black uppercase">
            Active
          </span>
        </div>

        <h3 className="text-base font-black text-white">
          {captainData?.name || (isAr ? 'أحمد العاصمي' : 'Ahmed Al-Assemi')}
        </h3>
        <span className="text-[10px] text-neutral-450 font-mono block mt-1">
          ID: #CAP-93820 | {isAr ? 'كابتن موثق فلاش قو' : 'Verified Flash Fleet Captain'}
        </span>

        {/* Rating and Points display */}
        <div className="flex gap-4 mt-4 w-full justify-center">
          <div className="bg-neutral-900 border border-neutral-850 px-4 py-1.5 rounded-xl text-xs">
            <span className="text-amber-400 font-black">⭐ 4.90</span>
            <span className="text-[9px] text-neutral-500 block">{isAr ? 'تقييم الزبائن' : 'Rating'}</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-850 px-4 py-1.5 rounded-xl text-xs">
            <span className="text-white font-black">542</span>
            <span className="text-[9px] text-neutral-500 block">{isAr ? 'رحلات مكتملة' : 'Trips Done'}</span>
          </div>
        </div>
      </div>

      {/* Grid containing personal and vehicle info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Personal Details */}
        <div className="bg-neutral-950 p-5 rounded-3xl border border-neutral-850 space-y-4">
          <span className="text-[10px] text-neutral-500 font-mono tracking-widest font-bold uppercase block">
            {isAr ? 'البيانات الشخصية والولاية' : 'Personal Records'}
          </span>

          <div className="space-y-3 text-xs leading-none">
            {/* Name */}
            <div className="flex justify-between items-center py-2.5 border-b border-neutral-900">
              <span className="text-neutral-500 font-bold">{isAr ? 'الاسم واللقب:' : 'Full Name:'}</span>
              <span className="text-neutral-200 font-bold">{captainData?.name || (isAr ? 'أحمد العاصمي' : 'Ahmed Al-Assemi')}</span>
            </div>

            {/* Phone */}
            <div className="flex justify-between items-center py-2.5 border-b border-neutral-900">
              <span className="text-neutral-500 font-bold">{isAr ? 'رقم الهاتف:' : 'Telephone:'}</span>
              <span className="text-neutral-200 font-mono font-bold">{captainData?.phone || '+213 550 12 34 56'}</span>
            </div>

            {/* Wilaya / Province */}
            <div className="flex justify-between items-center py-2.5">
              <span className="text-neutral-500 font-bold">{isAr ? 'الولاية الحالية:' : 'Current Wilaya:'}</span>
              <span className="text-amber-400 font-bold">{captainData?.wilaya || (isAr ? 'الجزائر العاصمة' : 'Algiers')}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="bg-neutral-950 p-5 rounded-3xl border border-neutral-850 space-y-4">
          <span className="text-[10px] text-neutral-500 font-mono tracking-widest font-bold uppercase block">
            {isAr ? 'تفاصيل معدات الدراجة ونوعها' : 'Registered Equipment'}
          </span>

          <div className="space-y-3 text-xs leading-none">
            {/* Vehicle mode */}
            <div className="flex justify-between items-center py-2.5 border-b border-neutral-900">
              <span className="text-neutral-500 font-bold">{isAr ? 'نوع وسيلة النقل:' : 'Vehicle Type:'}</span>
              <span className="text-neutral-200 font-bold">{isAr ? 'دراجة نارية سريعة' : 'Courier Motorcycle'}</span>
            </div>

            {/* Model Make */}
            <div className="flex justify-between items-center py-2.5 border-b border-neutral-900">
              <span className="text-neutral-500 font-bold">{isAr ? 'موديل الدراجة:' : 'Bike Model:'}</span>
              <span className="text-amber-400 font-bold font-mono">{captainData?.model || 'Honda SH 150'}</span>
            </div>

            {/* Plate details */}
            <div className="flex justify-between items-center py-2.5">
              <span className="text-neutral-500 font-bold">{isAr ? 'رقم اللوحة المرخصة:' : 'Certified Plate:'}</span>
              <span className="text-neutral-200 font-mono font-bold">123456-116-16</span>
            </div>
          </div>
        </div>

      </div>

      {/* Verified Documents state preview Block */}
      <div className="bg-neutral-950 p-5 rounded-3xl border border-neutral-850 space-y-4">
        <span className="text-[10px] text-neutral-500 font-mono tracking-widest font-bold uppercase block">
          {isAr ? 'الوثائق الرسمية التي تم التحقق من سلامتها' : 'Official Verification Badges Logged'}
        </span>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: isAr ? 'رخصة السياقة' : 'Driving License', key: 'license' },
            { label: isAr ? 'بطاقة التعريف الوطنية' : 'National ID Card', key: 'id' },
            { label: isAr ? 'البطاقة الرمادية' : 'Grey card papers', key: 'grey' },
            { label: isAr ? 'السيلفي الجغرافي كابتن' : 'Selfie Face Hash', key: 'selfie' },
          ].map((doc, idx) => (
            <div key={idx} className="bg-neutral-900 p-3 rounded-2xl border border-neutral-850/80 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-200 block">{doc.label}</span>
                <span className="text-[8px] text-emerald-400 font-mono font-black uppercase">Verified ✓</span>
              </div>
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Control settings and language toggler / Logout */}
      <div className="bg-neutral-950 p-4.5 rounded-3xl border border-neutral-850 space-y-3 text-xs font-semibold">
        
        {/* Language switch */}
        <button
          onClick={langToggle}
          className="w-full flex justify-between items-center py-2.5 text-neutral-300 hover:text-white bg-transparent border-none cursor-pointer outline-none"
        >
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-amber-400" />
            <span>{isAr ? 'Language (English)' : 'اللغة العربية (Arabic)'}</span>
          </span>
          <span className="text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-450 px-2 py-0.5 rounded-lg">
            {lang === 'ar' ? 'English' : 'عربي'}
          </span>
        </button>

        {/* Info panel */}
        <div className="flex justify-between items-center py-2.5 text-neutral-500 border-t border-neutral-900">
          <span className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>{isAr ? 'إصدار التطبيق ومستوى الأمان' : 'App Version & Security'}</span>
          </span>
          <span className="font-mono text-[10px]">v1.4.0 (Production-MADA)</span>
        </div>

        {/* Global Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/15 text-red-400 border border-red-500/20 py-3 rounded-2xl text-xs font-black cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 mt-3"
        >
          <LogOut className="h-4 w-4" />
          <span>{isAr ? 'قطع الاتصال وتسجيل الخروج' : 'Log Out Captain Profile'}</span>
        </button>

      </div>

    </div>
  );
}
