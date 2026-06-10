import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, User, Phone, Tag, Lock, UploadCloud, CheckCircle2, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface CaptainRegisterProps {
  lang: 'ar' | 'en';
  onRegisterSuccess: (captainData: { name: string; phone: string; wilaya: string; model: string }) => void;
  onSwitchToLogin: () => void;
  onBackToRoleSelection: () => void;
}

const ALGERIAN_WILAYAS = [
  { code: '16', name: 'الجزائر (Algiers)', nameEn: 'Algiers' },
  { code: '31', name: 'وهران (Oran)', nameEn: 'Oran' },
  { code: '25', name: 'قسنطينة (Constantine)', nameEn: 'Constantine' },
  { code: '23', name: 'عنابة (Annaba)', nameEn: 'Annaba' },
  { code: '19', name: 'سطيف (Sétif)', nameEn: 'Sétif' },
  { code: '09', name: 'البليدة (Blida)', nameEn: 'Blida' },
  { code: '35', name: 'بومرداس (Boumerdès)', nameEn: 'Boumerdès' },
  { code: '15', name: 'تيزي وزو (Tizi Ouzou)', nameEn: 'Tizi Ouzou' }
];

export default function CaptainRegister({
  lang,
  onRegisterSuccess,
  onSwitchToLogin,
  onBackToRoleSelection
}: CaptainRegisterProps) {
  const isAr = lang === 'ar';

  // State Management
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('16'); // default Algiers
  const [vehicleType, setVehicleType] = useState('motorcycle');
  const [motorcycleModel, setMotorcycleModel] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Upload Simulation state
  const [uploads, setUploads] = useState({
    license: false,
    nationalId: false,
    papers: false,
    selfie: false
  });

  const handleSimulateUpload = (key: keyof typeof uploads) => {
    setUploads(prev => ({
      ...prev,
      [key]: !prev[key] // toggle simulated state
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !phone || !motorcycleModel || !password) {
      setErrorMsg(isAr ? 'يرجى ملء جميع الحقول لمعلومات الكبتن' : 'Please fill out all captain details');
      return;
    }

    // Require at least 2 documents uploaded for complete realistic flow
    const checkUploadsCount = Object.values(uploads).filter(Boolean).length;
    if (checkUploadsCount < 3) {
      setErrorMsg(
        isAr 
          ? 'يرجى تحميل الوثائق المطلوبة (٣ على الأقل): رخصة السياقة، بطاقة التعريف، بطاقة الدراجة، أو الصورة الشخصية.' 
          : 'Please upload at least 3 required documents to submit registration for verification.'
      );
      return;
    }

    const fullPhone = phone.startsWith('+') ? phone : `+213 ${phone}`;
    const selectedWilayaObj = ALGERIAN_WILAYAS.find(w => w.code === wilaya);
    const wilayaLabel = selectedWilayaObj ? (isAr ? selectedWilayaObj.name : selectedWilayaObj.nameEn) : 'Algiers';

    onRegisterSuccess({
      name: fullName,
      phone: fullPhone,
      wilaya: wilayaLabel,
      model: motorcycleModel
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-lg mx-auto p-6 bg-neutral-900 border border-neutral-850 rounded-3xl shadow-2xl relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Back button */}
      <button
        onClick={onBackToRoleSelection}
        className="absolute top-6 left-6 right-auto dir-left:right-6 dir-right:left-6 text-neutral-400 hover:text-amber-400 p-2 rounded-xl bg-neutral-950/50 hover:bg-neutral-800 transition-all cursor-pointer z-10"
        title={isAr ? 'رجوع' : 'Back'}
      >
        {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>

      {/* Main Form Title */}
      
      <p className="text-[11px] text-neutral-400 text-center leading-relaxed mt-1.5 mb-6">
        {isAr ? 'سجل بياناتك ومستنداتك للحصول على تصريح العمل الفوري وتنشيط حسابك' : 'Submit your documents for quick automated review and real-time dashboard activation'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/25 text-red-400 p-3 rounded-xl text-xs font-bold font-sans flex items-start gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Informative alert */}
        <div className="bg-amber-400/10 border border-amber-400/15 p-3 rounded-xl text-[10px] text-amber-400 leading-relaxed">
          💡 {isAr 
            ? 'انقر على مربعات الملفات بالأسفل لمحاكاة تحميل الوثائق قبل تقديم طلبك .' 
            : 'Click on the document cards below to simulate raising papers for quick auto-approval.'}
        </div>

        {/* Section Title */}
        <div className="border-b border-neutral-800 pb-1.5">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
            {isAr ? '١. البيانات الشخصية ومعداتك' : '1. Captain Information'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Captain Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-neutral-450 uppercase block">{isAr ? 'الاسم واللقب' : 'Full Name'}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <User className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder={isAr ? 'مثال: سمير بلماضي' : 'e.g., Samir Belmadi'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-9 pr-4 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all"
                required
              />
            </div>
          </div>

          {/* Captain Phone Number */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-neutral-450 uppercase block">{isAr ? 'رقم الهاتف (الجزائر)' : 'Phone Number'}</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center gap-1 text-[10px]">
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
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-20 pr-4 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
                required
              />
            </div>
          </div>

          {/* Wilaya Selection */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-neutral-450 uppercase block">{isAr ? 'الولاية الجزائية الحالية' : 'Current Wilaya'}</label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all"
            >
              {ALGERIAN_WILAYAS.map(w => (
                <option key={w.code} value={w.code} className="bg-neutral-900 text-neutral-200">
                  {w.code} - {isAr ? w.name : w.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Type selection */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-neutral-450 uppercase block">{isAr ? 'وسيلة النقل للتوصيل' : 'Delivery vehicle'}</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all"
            >
              <option value="motorcycle" className="bg-neutral-900">{isAr ? 'دراجة نارية (موصى بها)' : 'Motorcycle (Recommended)'}</option>
              <option value="car" className="bg-neutral-900">{isAr ? 'سيارة ركاب سريعة' : 'Sedan/Car'}</option>
              <option value="scooter" className="bg-neutral-900">{isAr ? 'دراجة سكوتر خفيفة' : 'Light Scooter'}</option>
            </select>
          </div>

          {/* Vehicle model details */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-neutral-450 uppercase block">
              {isAr ? 'نوع وموديل الدراجة / رقم اللوحة' : 'Vehicle Make, Model & Plate details'}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <Tag className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder={isAr ? 'مثال: Honda SH 150 - لوحة 123456-116-16' : 'e.g., Honda SH 150 - Plate 123456-116-16'}
                value={motorcycleModel}
                onChange={(e) => setMotorcycleModel(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all"
                required
              />
            </div>
          </div>

          {/* Password secure */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] font-bold text-neutral-450 uppercase block">{isAr ? 'كلمة سر حساب العامل' : 'Driver Password'}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <Lock className="h-3.5 w-3.5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-neutral-200 pl-9 pr-10 py-2.5 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
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
          </div>
        </div>

        {/* Uploads Section Title */}
        <div className="border-b border-neutral-800 pb-1.5 pt-2">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
            {isAr ? '٢. الوثائق والمستندات الرسمية الممسوحة' : '2. Required Verification Handshakes'}
          </span>
        </div>

        {/* 2x2 Grid card uploads simulation */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Card 1: Driving License */}
          <div 
            onClick={() => handleSimulateUpload('license')}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none h-24 ${uploads.license ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 scale-[1.02]' : 'bg-neutral-950/80 border-dashed border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900'}`}
          >
            {uploads.license ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mb-1 animate-ping-once" />
                <span className="text-[10px] font-black">{isAr ? 'تم تحميل رخصتكم' : 'License Raised ✓'}</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-5 w-5 text-neutral-500 mb-1" />
                <span className="text-[10px] font-bold text-neutral-300">{isAr ? 'رخصة السياقة' : 'Driving License'}</span>
                <span className="text-[8px] text-neutral-600 mt-1">{isAr ? 'انقر لتحميل صالحة' : 'Upload front & back'}</span>
              </>
            )}
          </div>

          {/* Card 2: National ID card */}
          <div 
            onClick={() => handleSimulateUpload('nationalId')}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none h-24 ${uploads.nationalId ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 scale-[1.02]' : 'bg-neutral-950/80 border-dashed border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900'}`}
          >
            {uploads.nationalId ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mb-1" />
                <span className="text-[10px] font-black">{isAr ? 'تمت بطاقة هويتكم' : 'National ID Raised ✓'}</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-5 w-5 text-neutral-500 mb-1" />
                <span className="text-[10px] font-bold text-neutral-300">{isAr ? 'بطاقة التعريف الوطنية' : 'National ID Card'}</span>
                <span className="text-[8px] text-neutral-600 mt-1">{isAr ? 'ممسوحة بصيغة واضحة' : 'JPEG / PNG file'}</span>
              </>
            )}
          </div>

          {/* Card 3: Bike registration papers */}
          <div 
            onClick={() => handleSimulateUpload('papers')}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none h-24 ${uploads.papers ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 scale-[1.02]' : 'bg-neutral-950/80 border-dashed border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900'}`}
          >
            {uploads.papers ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mb-1" />
                <span className="text-[10px] font-black">{isAr ? 'تم تحميل أوراق الدراجة' : 'Papers Logged ✓'}</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-5 w-5 text-neutral-500 mb-1" />
                <span className="text-[10px] font-bold text-neutral-300">{isAr ? 'البطاقة الرمادية / الأوراق' : 'Motorcycle Papers'}</span>
                <span className="text-[8px] text-neutral-600 mt-1">{isAr ? 'أوراق ملكية الدراجة' : 'Grey card details'}</span>
              </>
            )}
          </div>

          {/* Card 4: Selfie Photo verification */}
          <div 
            onClick={() => handleSimulateUpload('selfie')}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none h-24 ${uploads.selfie ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 scale-[1.02]' : 'bg-neutral-950/80 border-dashed border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900'}`}
          >
            {uploads.selfie ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mb-1" />
                <span className="text-[10px] font-black">{isAr ? 'تمت بورتري السيلفي' : 'Selfie Logged ✓'}</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-5 w-5 text-neutral-500 mb-1" />
                <span className="text-[10px] font-bold text-neutral-300">{isAr ? 'صورة شخصية سيلفي' : 'Selfie Verification'}</span>
                <span className="text-[8px] text-neutral-600 mt-1">{isAr ? 'صورة وجهك للكاشف' : 'With high-contrast background'}</span>
              </>
            )}
          </div>
        </div>

        {/* Submission Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black py-3 rounded-xl text-xs shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-6"
        >
          <span>{isAr ? 'إرسال طلب الانضمام  ' : 'Submit Fleet Request'}</span>
          {isAr ? <ChevronRight className="h-4 w-4 shrink-0 rotate-180" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
        </button>
      </form>

      {/* Already registered */}
      <div className="text-center mt-5 pt-4 border-t border-neutral-850">
        <span className="text-xs text-neutral-500">
          {isAr ? 'مسجل بالفعل بقاعدة البيانات كعامل توصيل؟' : 'Already have a driver account?'}{' '}
        </span>
        <button
          onClick={onSwitchToLogin}
          className="text-xs font-black text-amber-500 hover:text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
        >
          {isAr ? 'تسجيل الدخول ' : ' Login'}
        </button>
      </div>
    </motion.div>
  );
}
