import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Bike, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface CaptainLoginProps {
  lang: 'ar' | 'en';
  onLoginSuccess: (phone: string) => void;
  onSwitchToRegister: () => void;
  onBackToRoleSelection: () => void;
}

export default function CaptainLogin({
  lang,
  onLoginSuccess,
  onSwitchToRegister,
  onBackToRoleSelection
}: CaptainLoginProps) {
  const isAr = lang === 'ar';
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      setErrorMsg(isAr ? 'يرجى تسجيل رقم الهاتف وكلمة المرور للدخول' : 'Please input both phone and password');
      return;
    }
    setErrorMsg('');
    const fullPhone = phone.startsWith('+') ? phone : `+213 ${phone}`;
    onLoginSuccess(fullPhone);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-6 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Absolute Back Icon */}
      <button
        onClick={onBackToRoleSelection}
        className="absolute top-6 left-6 right-auto dir-left:right-6 dir-right:left-6 text-neutral-400 hover:text-amber-400 p-2 rounded-xl bg-neutral-950/50 hover:bg-neutral-800 transition-all cursor-pointer"
        title={isAr ? 'رجوع' : 'Back'}
      >
        {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>

      {/* Premium Motorcycle themed design header */}
      <div className="text-center pt-8 pb-6 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-md scale-110"></div>
          <div className="relative bg-gradient-to-tr from-amber-400 to-amber-500 text-black p-4 rounded-2xl shadow-xl border border-amber-300">
            <Bike className="h-8 w-8 stroke-[1.8] animate-pulse" />
          </div>
        </div>
        <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 mb-2">
          {isAr ? 'بوابة كابتن فلاش' : 'FLASH CAPTAIN PORTAL'}
        </span>
        <h2 className="text-xl font-black text-neutral-100 italic uppercase">
          {isAr ? 'دخول عامل التوصيل' : 'Driver Login'}
        </h2>
        <p className="text-[11px] text-neutral-450 mt-1 leading-relaxed">
          {isAr ? 'أهلاً بك كابتن! سجل دخولك لاستلام الطلبات وبدء الكسب والعمل فوراً' : 'Welcome captain! Deliver packages, carry out trips and maximize earnings'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-xl text-xs font-bold leading-none">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Phone number */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase block">
            {isAr ? 'رقم الهاتف للكابتن' : 'Captain Phone Number'}
          </label>
          <div className="relative flex items-center">
            {/* Algerian Flag preview */}
            <div className="absolute left-3.5 flex items-center gap-1 text-xs">
              <span>🇩🇿</span>
              <span className="text-neutral-500 font-mono">+213</span>
            </div>
            <input
              type="tel"
              placeholder="550 12 34 56"
              value={phone}
              onChange={(e) => {
                let val = e.target.value.replace('+213', '').trim();
                setPhone(val);
              }}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-24 pr-4 py-3 rounded-xl text-xs font-mono outline-none focus:border-amber-400 transition-all focus:ring-2 focus:ring-amber-400/10"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase block">
              {isAr ? 'كلمة المرور' : 'Password'}
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-4 pr-11 py-3 rounded-xl text-xs font-mono outline-none focus:border-amber-400 transition-all focus:ring-2 focus:ring-amber-400/10"
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

        {/* Start Working Now Button */}
        {/* Login Button */}
<button
  type="submit"
  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black py-3 rounded-xl text-xs font-black shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
>
  <span>{isAr ? 'تسجيل الدخول' : 'Login'}</span>
  {isAr ? (
    <ArrowLeft className="h-4 w-4" />
  ) : (
    <ArrowRight className="h-4 w-4" />
  )}
</button>

{/* Divider */}
<div className="flex items-center gap-3 my-5">
  <div className="flex-1 h-px bg-neutral-800"></div>

  <span className="text-xs text-neutral-500 font-semibold">
    OR
  </span>

  <div className="flex-1 h-px bg-neutral-800"></div>
</div>

{/* Google Login */}
<button
  type="button"
  onClick={() =>
    onLoginSuccess('+213 555 00 00 00')
  }
  className="
    w-full
    bg-neutral-950
    border
    border-neutral-700
    hover:border-neutral-500
    rounded-xl
    py-3
    flex
    items-center
    justify-center
    gap-3
    transition-all
    cursor-pointer
  "
>
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google"
    className="w-5 h-5"
  />

  <span className="font-bold text-white">
    {isAr
      ? 'المتابعة بواسطة Google'
      : 'Continue with Google'}
  </span>
</button>
      </form>

      {/* Redirect anchor to Captain Register */}
      <div className="text-center mt-6 pt-4 border-t border-neutral-850">
        <span className="text-xs text-neutral-500">
          {isAr ? 'تريد الانضمام ككابتن دراجة ذكي؟' : 'Want to join as a smart bike captain?'}{' '}
        </span>
        <button
          onClick={onSwitchToRegister}
          className="text-xs font-extrabold text-amber-500 hover:text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
        >
          {isAr ? 'سجل معنا ككابتن دراجة الآن' : 'Register Here'}
        </button>
      </div>
    </motion.div>
  );
}
