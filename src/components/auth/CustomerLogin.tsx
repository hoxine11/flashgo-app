import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Zap } from 'lucide-react';


import { motion, AnimatePresence } from 'framer-motion';

 
interface CustomerLoginProps {
  lang: 'ar' | 'en';
  onLoginSuccess: (email: string) => void;
  onSwitchToRegister: () => void;
  onBackToRoleSelection: () => void;
}

export default function CustomerLogin({
  lang,
  onLoginSuccess,
  onSwitchToRegister,
  onBackToRoleSelection
}: CustomerLoginProps) {
  const isAr = lang === 'ar';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg(isAr ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }
    setErrorMsg('');
    onLoginSuccess(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-6 bg-neutral-900 border border-neutral-850 rounded-3xl shadow-2xl relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Back button */}
      <button
        onClick={onBackToRoleSelection}
        className="absolute top-6 left-6 right-auto dir-left:right-6 dir-right:left-6 text-neutral-400 hover:text-amber-400 p-2 rounded-xl bg-neutral-950/50 hover:bg-neutral-800 transition-all cursor-pointer"
        title={isAr ? 'رجوع' : 'Back'}
      >
        {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>

      {/* Hero Visual Brand inside Login */}
      <div className="text-center pt-8 pb-6 flex flex-col items-center">
        <div className="bg-gradient-to-tr from-amber-400 to-amber-300 text-black p-3.5 rounded-2xl shadow-xl shadow-amber-400/10 ring-4 ring-amber-400/5 mb-4 animate-bounce">
          <Zap className="h-7 w-7 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl font-black text-white italic tracking-wide uppercase">
          FLASH <span className="text-amber-400">GO</span>
        </h2>
        <p className="text-xs text-neutral-450 mt-1">
          {isAr ? 'سجل دخولك لتجربة توصيل كالبرق بالجزائر' : 'Sign in for ultra-fast Algerian deliveries'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-bold font-sans">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase block">
            {isAr ? 'البريد الإلكتروني' : 'Email address'}
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              placeholder={isAr ? 'your.email@example.com' : 'your.email@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-neutral-200 pl-11 pr-4 py-3 rounded-xl text-xs font-medium outline-none transition-all focus:ring-2 focus:ring-amber-400/10"
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
            <button
              type="button"
              onClick={() => alert(isAr ? 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.' : 'Password recovery process simulated!')}
              className="text-[11px] font-semibold text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
            >
              {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
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
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 text-neutral-200 pl-11 pr-11 py-3 rounded-xl text-xs outline-none transition-all focus:ring-2 focus:ring-amber-400/10"
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

        {/* Remember me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-neutral-950 border-neutral-850 text-amber-400 focus:ring-0 w-3.5 h-3.5"
            />
            <span>{isAr ? 'تذكرني على هذا الجهاز' : 'Remember me'}</span>
          </label>
        </div>

        {/* Login trigger with Amber glow */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black py-3 rounded-xl text-xs font-black shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
        >
          <span>{isAr ? 'تسجيل الدخول' : 'Login'}</span>
          {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      {/* Anchor switch */}
      <div className="text-center mt-6 pt-4 border-t border-neutral-850">
        <span className="text-xs text-neutral-500 font-sans">
          {isAr ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
        </span>
        <button
          onClick={onSwitchToRegister}
          className="text-xs font-extrabold text-amber-500 hover:text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
        >
          {isAr ? 'أنشئ حساباً زبوناً الآن' : 'Sign Up'}
        </button>
      </div>
    </motion.div>
  );
}
