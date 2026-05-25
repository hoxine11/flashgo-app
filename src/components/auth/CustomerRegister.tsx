import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomerRegisterProps {
  lang: 'ar' | 'en';
  onRegisterSuccess: (userData: { name: string; email: string; phone: string }) => void;
  onSwitchToLogin: () => void;
  onBackToRoleSelection: () => void;
}

export default function CustomerRegister({
  lang,
  onRegisterSuccess,
  onSwitchToLogin,
  onBackToRoleSelection
}: CustomerRegisterProps) {
  const isAr = lang === 'ar';
  
  // Registration States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation helpers
  const isLenValid = password.length >= 8;
  const matchConfirm = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setErrorMsg(isAr ? 'يرجى مراجعة وتعبئة كل الخانات' : 'Please fill in all blanks');
      return;
    }
    if (!isLenValid) {
      setErrorMsg(isAr ? 'كلمة المرور يجب أن لا تقل عن 8 خانات' : 'Password must be at least 8 characters');
      return;
    }
    if (!matchConfirm) {
      setErrorMsg(isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }

    setErrorMsg('');
    // Format local Algerian number properly
    const fullPhone = phone.startsWith('+') ? phone : `+213 ${phone}`;
    onRegisterSuccess({
      name: fullName,
      email: email,
      phone: fullPhone
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
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

      {/* Header Info */}
      <h2 className="text-xl font-bold font-sans text-neutral-100 text-center uppercase pt-4">
        {isAr ? 'إنشاء حساب زبون' : 'Create Customer Account'}
      </h2>
      <p className="text-[11px] text-neutral-400 leading-relaxed text-center mt-1.5 mb-6">
        {isAr ? 'أدخل معلوماتك للانضمام إلى شبكة فلاش قو السريعة بالجزائر' : 'Provide your details to register as a client on Flash Go'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase block">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              <User className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder={isAr ? 'مثال: حميد بن شعبان' : 'e.g., Hamid Benchaabane'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase block">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              placeholder="hamid@domain.dz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all"
              required
            />
          </div>
        </div>

        {/* Phone Number with Algeria Code flag */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase block">{isAr ? 'رقم الهاتف الجزائري' : 'Algerian Phone Number'}</label>
          <div className="relative flex items-center">
            {/* Algerian Flag preview */}
            <div className="absolute left-3 flex items-center gap-1 text-xs">
              <span>🇩🇿</span>
              <span className="text-neutral-400 font-mono">+213</span>
            </div>
            <input
              type="tel"
              placeholder="550 12 34 56"
              value={phone}
              onChange={(e) => {
                // Strip +213 if user types it manually
                let val = e.target.value.replace('+213', '').trim();
                setPhone(val);
              }}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-24 pr-4 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
              required
            />
          </div>
          <p className="text-[9px] text-neutral-500 mt-0.5">{isAr ? 'أدخل رقمك بدون الرمز الدولي (الرمز الدولي مضاف تلقائياً)' : 'Input without international code (added automatically)'}</p>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase block">{isAr ? 'كلمة المرور' : 'Password'}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-10 pr-10 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Real-time Validation Check badge */}
          {password.length > 0 && (
            <div className="flex items-center gap-1 text-[9px] font-semibold mt-1">
              <span className={isLenValid ? 'text-emerald-400' : 'text-neutral-550'}>
                {isAr ? '✓ على الأقل 8 خانات' : '✓ Min 8 characters'}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase block">{isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-10 pr-10 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {confirmPassword.length > 0 && (
            <div className="flex items-center gap-1 text-[9px] font-semibold mt-1">
              <span className={matchConfirm ? 'text-emerald-400' : 'text-red-400'}>
                {matchConfirm 
                  ? (isAr ? '✓ متطابقتين بامتياز' : '✓ Passwords match')
                  : (isAr ? '✗ كلمتا المرور لا تتطابقان' : '✗ Passwords do not match')}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-300 text-black font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-400/5 cursor-pointer mt-4"
        >
          <span>{isAr ? 'تسجيل الحساب والمتابعة' : 'Register & Enter'}</span>
          {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        </button>
      </form>

      {/* Switch link */}
      <div className="text-center mt-5 pt-4 border-t border-neutral-850">
        <span className="text-xs text-neutral-500 font-sans">
          {isAr ? 'لديك حساب بالفعل زبون؟' : 'Already have a customer account?'}{' '}
        </span>
        <button
          onClick={onSwitchToLogin}
          className="text-xs font-black text-amber-500 hover:text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
        >
          {isAr ? 'دخول الزبائن' : 'Login'}
        </button>
      </div>
    </motion.div>
  );
}
