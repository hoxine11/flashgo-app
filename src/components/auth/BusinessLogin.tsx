import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Building2, Store, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface BusinessLoginProps {
  lang: 'ar' | 'en';
  type: 'company' | 'store';
  onLoginSuccess: (data: { name: string; type: 'company' | 'store'; emailOrPhone: string }) => void;
  onSwitchToRegister: () => void;
  onBackToRoleSelection: () => void;
}

export default function BusinessLogin({
  lang,
  type,
  onLoginSuccess,
  onSwitchToRegister,
  onBackToRoleSelection
}: BusinessLoginProps) {
  const isAr = lang === 'ar';
  const isCompany = type === 'company';
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      setErrorMsg(isAr ? 'يرجى ملء جميع الحقول المطلوبة لتسجيل الدخول الفوري' : 'Please fill in all coordinates to login');
      return;
    }
    setErrorMsg('');
    const mockBusinessName = isCompany 
      ? (isAr ? 'شركة فلاش اللوجيستيكية الجزائرية' : 'Algiers Express Shipping Co.')
      : (isAr ? 'متجر ومطعم أكلات فلاش الشريك' : 'Gourmet Oasis Algiers');
      
    onLoginSuccess({
      name: mockBusinessName,
      type: type,
      emailOrPhone: emailOrPhone
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-md mx-auto p-5 bg-[#050505] text-white flex flex-col justify-between"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Back button and title */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <button
          onClick={onBackToRoleSelection}
          className="p-2 rounded-xl bg-[#111111] border border-neutral-900 text-neutral-400 hover:text-white transition-all cursor-pointer"
        >
          {isAr ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
        </button>
        <div>
          <h2 className="text-base font-black text-neutral-100 uppercase tracking-wide">
            {isCompany 
              ? (isAr ? 'دخول الشركاء والمؤسسات' : 'Corporate Partner Login')
              : (isAr ? 'بوابة دخول المتاجر والمطاعم' : 'Merchant Store Login')}
          </h2>
          <p className="text-[10px] text-neutral-400">
            {isAr 
              ? 'يرجى تعبئة البريد التجاري ورقم الخدمة للاستمرار' 
              : 'Sign in to access your partner analytics & dashboard'}
          </p>
        </div>
      </div>

      {/* Hero Visual Icon Badge */}
      <div className="text-center py-4 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-tr from-amber-400 to-amber-500 text-black p-4 rounded-2xl shadow-xl shadow-amber-400/10">
            {isCompany ? <Building2 className="h-7 w-7" /> : <Store className="h-7 w-7" />}
          </div>
        </div>
        <span className="text-[10px] bg-[#111111] border border-neutral-900 text-amber-400 px-3 py-1 rounded-full font-mono font-extrabold tracking-widest mt-4 uppercase">
          ⚡ {isCompany ? 'FLASH GO CORP' : 'FLASH GO MERCHANT'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/25 p-2.5 rounded-xl text-[10px] text-red-400 font-bold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Email or phone coords */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wide text-neutral-450 block font-bold">
            {isAr ? 'البريد الإلكتروني التجاري للعمل' : 'Business Email / Phone'}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder={isAr ? 'your-corp-email@flashgo.dz' : 'partner@flashgo.dz'}
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 pl-11 pr-3.5 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-sans"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex justify-between items-center pb-0.5">
            <label className="text-[10px] uppercase tracking-wide text-neutral-450 block font-bold">
              {isAr ? 'كلمة المرور الآمنة' : 'Secure Password'}
            </label>
            <button
              type="button"
              onClick={() => alert(isAr ? 'يرجى التواصل مع مسؤول الفرع لاستعادة الحساب!' : 'Please contact Flash Admin Support to recover security credential!')}
              className="text-[9px] text-amber-400 hover:underline font-bold bg-transparent border-none cursor-pointer"
            >
              {isAr ? 'نسيتها؟' : 'Forgot?'}
            </button>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 pl-11 pr-11 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500 hover:text-amber-400 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember / Keep alive */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-[10px] text-neutral-400 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-neutral-950 border-neutral-900 text-amber-400 focus:ring-0 w-3.5 h-3.5 accent-amber-400"
            />
            <span>{isAr ? 'تذكر بيانات الشريك على هذا المتصفح' : 'Remember business session'}</span>
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black py-2.5 rounded-xl text-xs font-black shadow-lg shadow-amber-400/10 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
        >
          <span>{isAr ? 'دخول فوري لوحة التحكم' : 'Login Dashboard'}</span>
          {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      {/* Register switch anchor */}
      <div className="text-center mt-6 pt-4 border-t border-neutral-900">
        <span className="text-[10px] text-neutral-500 font-sans">
          {isCompany 
            ? (isAr ? 'هل أنت شريك جديد لم يسجل السجل التجاري؟' : 'New corporate partner?') 
            : (isAr ? 'لم تسجل متجرك أو مطعمك في فلاش غو بعد؟' : 'Not registered merchant partner yet?')
          }{' '}
        </span>
        <button
          onClick={onSwitchToRegister}
          className="text-[10px] font-black text-amber-500 hover:text-amber-450 hover:underline bg-transparent border-none cursor-pointer"
        >
          {isAr ? 'أطلق نشاطك الآن' : 'Onboard Now'}
        </button>
      </div>
    </motion.div>
  );
}
