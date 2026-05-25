import { useState } from 'react';
import { User, Shield, Info, MapPin, Sparkles, LogOut, Check, Languages, Award, Percent } from 'lucide-react';
import { UserProfile } from '../types';

interface AppAccountProps {
  lang: 'ar' | 'en';
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  setLang: (lang: 'ar' | 'en') => void;
}

export default function AppAccount({ lang, user, onUpdateUser, setLang }: AppAccountProps) {
  const isAr = lang === 'ar';

  // Local inputs
  const [userName, setUserName] = useState(isAr ? user.name : user.nameEn);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const handleSave = () => {
    onUpdateUser({
      name: isAr ? userName : user.name,
      nameEn: isAr ? user.nameEn : userName,
      phone,
      email
    });

    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-neutral-900/95 backdrop-blur-md px-4 py-3 border-b border-neutral-800 text-center sticky top-0 z-15">
        <h3 className="font-bold text-sm tracking-tight text-white">
          {isAr ? 'حسابي وبياناتي الشخصية' : 'Account & Profile Details'}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Profile Stats Overview */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-amber-400 text-black flex items-center justify-center text-3xl font-bold ring-4 ring-neutral-850">
            🦁
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-neutral-100 flex items-center gap-1.5">
              <span>{isAr ? user.name : user.nameEn}</span>
              <span className="bg-amber-400 text-[8px] text-black font-black uppercase px-1.5 py-0.5 rounded-full">VIP Silver</span>
            </h4>
            <span className="text-[10px] text-neutral-400 font-mono leading-none">{user.email}</span>
            <div className="flex gap-3 text-[9px] text-amber-400 mt-1.5 font-bold uppercase tracking-wider">
              <span>🚀 12 {isAr ? 'رحلة' : 'Completed trips'}</span>
              <span>•</span>
              <span>🏆 {user.loyaltyPoints} {isAr ? 'نقطة' : 'Points'}</span>
            </div>
          </div>
        </div>

        {/* Input parameters edit form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-3">
          <h5 className="text-xs font-bold text-neutral-350 border-b border-neutral-850 pb-2 flex items-center gap-1">
            <User className="h-4 w-4 text-amber-400" />
            <span>{isAr ? 'تعديل البيانات الأساسية' : 'Edit Basic Profiles'}</span>
          </h5>

          {/* Name input */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 font-bold block">{isAr ? 'الاسم بالكامل' : 'Full Name'}</span>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-neutral-200 outline-none focus:border-amber-400/50"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 font-bold block">{isAr ? 'رقم الجوال الفعال' : 'Active Mobile Phone'}</span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-neutral-200 outline-none focus:border-amber-400/50 font-mono"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 font-bold block">{isAr ? 'البريد الإلكتروني الموثق' : 'Verified Email'}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-850 rounded-lg p-2 text-xs text-neutral-200 outline-none focus:border-amber-400/50 font-mono"
            />
          </div>

          {showSavedMsg && (
            <div className="bg-emerald-500/10 text-emerald-400 text-center py-2 text-[10px] font-bold rounded-lg border border-emerald-500/20">
              ✔️ {isAr ? 'تم حفظ التعديلات بنجاح' : 'Changes updated successfully!'}
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full bg-amber-400 text-black font-black text-xs py-2 rounded-lg hover:bg-amber-500 transition-colors active:scale-95 cursor-pointer"
          >
            {isAr ? 'حفظ البيانات' : 'Save Changes'}
          </button>
        </div>

        {/* Configurations Parameters inside screen */}
        <div className="bg-neutral-905 border border-neutral-850 rounded-xl p-3.5 space-y-3">
          <h5 className="text-xs font-bold text-neutral-350 flex items-center gap-1">
            <Languages className="h-4 w-4 text-amber-400" />
            <span>{isAr ? 'إعدادات اللغة والمظهر' : 'Language & Display Modes'}</span>
          </h5>

          {/* AR vs EN buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setLang('ar');
                onUpdateUser({ language: 'ar' });
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${isAr ? 'bg-amber-400 text-black border-amber-400' : 'bg-neutral-950 text-neutral-400 border-neutral-850'}`}
            >
              العربية (RTL)
            </button>
            <button
              onClick={() => {
                setLang('en');
                onUpdateUser({ language: 'en' });
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${!isAr ? 'bg-amber-400 text-black border-amber-400' : 'bg-neutral-950 text-neutral-400 border-neutral-850'}`}
            >
              English
            </button>
          </div>
        </div>

        {/* Benefits Loyalty info widgets */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-2.5">
          <h5 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5 border-b border-neutral-850 pb-2">
            <Award className="h-4 w-4 text-amber-500" />
            <span>{isAr ? 'أوسمة الولاء والمكافآت' : 'Loyalty Benefits & Multipliers'}</span>
          </h5>

          <div className="space-y-2 text-xs">
            {/* Level */}
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-400">{isAr ? 'مستوى النقاط' : 'Tier Progress Badge'}</span>
              <span className="font-bold text-amber-400">{isAr ? 'الأسد الفضي' : 'Silver Warrior'}</span>
            </div>
            {/* Discount active */}
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-400">{isAr ? 'تخفيض كود العضوية' : 'Membership Coupon Code'}</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Percent className="h-3 w-3" />
                <span>30% OFF</span>
              </span>
            </div>
            {/* Safety index */}
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-neutral-400">{isAr ? 'مؤشر أمان العمليات' : 'Data Integrity Shield'}</span>
              <span className="font-bold text-blue-400">100% SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
