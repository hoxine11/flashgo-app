import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Building2, Phone, Mail, Lock, Check, CheckCircle2, UploadCloud, FileText, Landmark, Camera, AlertCircle, Sparkles } from 'lucide-react';

interface CompanyAuthProps {
  lang: 'ar' | 'en';
  onBackToSelection: () => void;
  onSuccess: (companyData: { name: string; type: string; phone: string }) => void;
  onSwitchToLogin?: () => void;
}

export default function CompanyAuth({ lang, onBackToSelection, onSuccess, onSwitchToLogin }: CompanyAuthProps) {
  const isAr = lang === 'ar';

  // Step 1: Registration fields
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Reg Form, 2: Type select, 3: Document uploads, 4: Pending success
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('delivery');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Step 2 categories
  const businessCategories = [
    { id: 'delivery', title: isAr ? 'شركة توصيل وشحن' : 'Delivery Company', desc: isAr ? 'توفير خدمات التوصيل للجمهور والشركات' : 'Provide courier services', emoji: '📦' },
    { id: 'store', title: isAr ? 'متجر مستقل / بقالة' : 'Store / Shop', desc: isAr ? 'بيع السلع والمنتجات المباشرة للمستهلكين' : 'Sell products to customers', emoji: '🛍️' },
    { id: 'restaurant', title: isAr ? 'مطعم ومأكولات' : 'Restaurant', desc: isAr ? 'تحضير الوجبات والمشروبات وتوصيلها' : 'Food & beverages industry', emoji: '🍕' },
    { id: 'pharmacy', title: isAr ? 'صيدلية وعناية طبية' : 'Pharmacy', desc: isAr ? 'توزيع الأدوية ومستحضرات الرعاية الطبية' : 'Healthcare & medicines', emoji: '💊' },
    { id: 'supermarket', title: isAr ? 'سوبرماركت / غنائيات' : 'Supermarket', desc: isAr ? 'بقالة عامة ومقاضي يومية وطلبيات' : 'Groceries & daily household needs', emoji: '🛒' },
    { id: 'other', title: isAr ? 'نشاط تجاري آخر' : 'Other Business', desc: isAr ? 'أنواع خدمات تجارية مخصصة للشركات' : 'Other specialized business lines', emoji: '💼' }
  ];

  // Step 3 uploads
  const [uploads, setUploads] = useState({
    commercialRegister: false, // السجل التجاري
    taxId: false, // الرقم الضريبي
    businessLicense: false, // رخصة النشاط
    storePhoto: false // صورة اللوحة والواجهة
  });

  const handleToggleUpload = (key: keyof typeof uploads) => {
    setUploads(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!companyName || !phone || !email || !password) {
      setErrorMsg(isAr ? 'برجاء تعبئة كافة الحقول المطلوبة' : 'Please fill all fields');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg(isAr ? 'يجب الموافقة على الشروط والأحكام للاستمرار' : 'Please agree to terms & conditions');
      return;
    }
    setStep(2);
  };

  const handleSelectCategory = (catId: string) => {
    setCompanyType(catId);
    setStep(3);
  };

  const handleStep3Submit = () => {
    const uploadedCount = Object.values(uploads).filter(Boolean).length;
    if (uploadedCount < 3) {
      setErrorMsg(
        isAr 
          ? 'يرجى تحميل ما لا يقل عن ٣ وثائق محاكاة للاستمرار بالفحص الفوري لحساب الشركة' 
          : 'Please simulate raising at least 3 documents to guarantee auto approval!'
      );
      return;
    }
    setErrorMsg('');
    setStep(4);
  };

  const handleFinishAndActivate = () => {
    onSuccess({
      name: companyName || 'Flash Partner Inc',
      type: companyType,
      phone: phone.startsWith('+') ? phone : `+213 ${phone}`
    });
  };

  return (
    <div className="w-full text-white bg-[#050505] p-5 rounded-3xl" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Step Indicator Dot Line */}
      <div className="flex justify-between items-center mb-5 bg-[#111111] px-4 py-2.5 rounded-xl border border-neutral-900 text-xs">
        <span className="font-bold text-amber-400">
          🏢 {isAr ? 'تأهيل حساب شريك أعمال فلاش' : 'Corporate Hub Onboarding'}
        </span>
        <div className="flex items-center gap-1">
          <span className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-neutral-800'}`} />
          <span className={`h-1 w-3 rounded ${step >= 2 ? 'bg-amber-400' : 'bg-neutral-800'}`} />
          <span className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-amber-400' : 'bg-neutral-800'}`} />
          <span className={`h-1 w-3 rounded ${step >= 4 ? 'bg-amber-400' : 'bg-neutral-800'}`} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* Step 1: Corporate Registration Form */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-400/10 text-amber-400 flex items-center justify-center rounded-2xl mx-auto border border-amber-400/20 mb-2">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base">{isAr ? 'تسجيل الشركة / أعمال' : 'Company Registration'}</h3>
              <p className="text-[10px] text-neutral-400">{isAr ? 'أنشئ حساب الأعمال لإطلاق مبيعاتك وأسطول شحناتك' : 'Register your corporate account with Flash Go'}</p>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/25 p-2.5 rounded-xl text-[10px] text-red-400 flex items-start gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleStep1Submit} className="space-y-3.5 pt-1">
              {/* Company Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wide text-neutral-450 block font-bold">{isAr ? 'اسم الشركة / المؤسسة التجاري' : 'Company Name'}</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={isAr ? 'مثال: شركة النقل السريع الجزائرية' : 'e.g., Algiers Logistics Fast'}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-sans"
                    required
                  />
                </div>
              </div>

              {/* Phone Algerian */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wide text-neutral-450 block font-bold">{isAr ? 'رقم هاتف الشركة (الجزائر)' : 'Business Phone Number'}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[10px] font-mono text-neutral-500 font-bold">🇩🇿 +213</span>
                  <input
                    type="tel"
                    placeholder="550 25 35 45"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 pl-20 pr-3 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wide text-neutral-450 block font-bold">{isAr ? 'البريد الإلكتروني للعمل' : 'Business Email Address'}</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="partner@flashgo.dz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-sans"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wide text-neutral-450 block font-bold">{isAr ? 'كلمة المرور الآمنة' : 'Secure Corporate Password'}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none focus:border-amber-400 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* Agreement checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="company-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="accent-amber-400 h-3.5 w-3.5 cursor-pointer rounded"
                />
                <label htmlFor="company-terms" className="text-[9px] text-neutral-400 cursor-pointer select-none">
                  {isAr ? 'أوافق على اتفاقية استخدام شركاء فلاش وبنود الحماية واللوجيستيات م الموثقة.' : 'I agree to the Terms & Conditions and Corporate Fleet Privacy Policy.'}
                </label>
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={onBackToSelection}
                  className="flex-1 bg-neutral-950 border border-neutral-900 text-xs py-2.5 rounded-xl font-bold hover:bg-neutral-900"
                >
                  {isAr ? 'رجوع' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-400 text-black text-xs py-2.5 rounded-xl font-black flex items-center justify-center gap-1.5 hover:bg-amber-300"
                >
                  <span>{isAr ? 'التالي' : 'Next'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              {onSwitchToLogin && (
                <div className="text-center pt-4 border-t border-neutral-900 mt-4">
                  <span className="text-[10px] text-neutral-550 font-sans">
                    {isAr ? 'لديك حساب شركة بالفعل؟' : 'Already have a corporate account?'}{' '}
                  </span>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[10px] font-black text-amber-500 hover:text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
                  >
                    {isAr ? 'تسجيل الدخول' : 'Login'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* Step 2: Business Type selection cards (Screen 7 mapping) */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">{isAr ? 'الخطوة ٢/٤' : 'Step 2 of 4'}</span>
              <h3 className="font-black text-base mt-1">{isAr ? 'حدد تصنيف ونوع الشركة والمؤسسة' : 'Select Business Type'}</h3>
              <p className="text-[10px] text-neutral-400">{isAr ? 'اختر الفئة الأقرب لطبيعة معاملاتك لتهيئة حسابك المخصص' : 'Choose the category that fits your company best'}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {businessCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className="bg-[#111111] hover:bg-neutral-900 border border-neutral-900 hover:border-amber-400/50 p-3 rounded-xl cursor-pointer text-center space-y-1.5 transition-all active:scale-97"
                >
                  <span className="text-2xl block">{cat.emoji}</span>
                  <h4 className="text-[11px] font-black text-neutral-200">{cat.title}</h4>
                  <p className="text-[8px] text-neutral-500 truncate">{cat.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-[#111111] border border-neutral-900 text-xs py-2.5 rounded-xl font-bold mt-2"
            >
              {isAr ? 'الرجوع للبيانات' : 'Back to details'}
            </button>
          </motion.div>
        )}

        {/* Step 3: Business Verification Document Uploads (Screen 9 mapping) */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">{isAr ? 'الخطوة ٣/٤' : 'Step 3 of 4'}</span>
              <h3 className="font-black text-base mt-1">{isAr ? 'التحقق وتقديم مستندات السجل' : 'Business Verification'}</h3>
              <p className="text-[10px] text-neutral-400">{isAr ? 'برجاء رفع الأوراق الثبوتية لمحاكاة التدقيق وفحص الترخيص' : 'Please upload your official business registration documents'}</p>
            </div>

            <div className="bg-amber-400/10 border border-amber-400/20 text-[9px] text-amber-400 p-2.5 rounded-xl leading-relaxed text-center">
              💡 {isAr ? 'انقر على الكروت أدناه لمحاكاة تحميل الوثائق وتنشيط اللون الأخضر' : 'Click the cards to simulate uploading documents instantly.'}
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-xl text-[10px] font-bold">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              {/* Document 1: Commercial Register */}
              <div
                onClick={() => handleToggleUpload('commercialRegister')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${uploads.commercialRegister ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#111111]/80 border-dashed border-neutral-850 hover:border-amber-400/50'}`}
              >
                {uploads.commercialRegister ? <CheckCircle2 className="h-5 w-5 mb-1" /> : <FileText className="h-5 w-5 text-neutral-500 mb-1" />}
                <span className="text-[10px] font-bold block">{isAr ? 'السجل التجاري' : 'Commercial Register'}</span>
                <span className="text-[8px] text-neutral-650 shrink-0">{uploads.commercialRegister ? 'تم التحميل ✓' : 'انقر للتحميل'}</span>
              </div>

              {/* Document 2: Tax ID (NIF) */}
              <div
                onClick={() => handleToggleUpload('taxId')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${uploads.taxId ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#111111]/80 border-dashed border-neutral-850 hover:border-amber-400/50'}`}
              >
                {uploads.taxId ? <CheckCircle2 className="h-5 w-5 mb-1" /> : <Landmark className="h-5 w-5 text-neutral-500 mb-1" />}
                <span className="text-[10px] font-bold block">{isAr ? 'الرقم الضريبي (NIF)' : 'Tax ID Number'}</span>
                <span className="text-[8px] text-neutral-650 shrink-0">{uploads.taxId ? 'تم التحميل ✓' : 'انقر للتحميل'}</span>
              </div>

              {/* Document 3: Business license */}
              <div
                onClick={() => handleToggleUpload('businessLicense')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${uploads.businessLicense ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#111111]/80 border-dashed border-neutral-850 hover:border-amber-400/50'}`}
              >
                {uploads.businessLicense ? <CheckCircle2 className="h-5 w-5 mb-1" /> : <FileText className="h-5 w-5 text-neutral-500 mb-1" />}
                <span className="text-[10px] font-bold block">{isAr ? 'رخصة النشاط وعقودها' : 'Business License'}</span>
                <span className="text-[8px] text-neutral-650 shrink-0">{uploads.businessLicense ? 'تم التحميل ✓' : 'انقر للتحميل'}</span>
              </div>

              {/* Document 4: Store / Facility photo */}
              <div
                onClick={() => handleToggleUpload('storePhoto')}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${uploads.storePhoto ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-[#111111]/80 border-dashed border-neutral-850 hover:border-amber-400/50'}`}
              >
                {uploads.storePhoto ? <CheckCircle2 className="h-5 w-5 mb-1" /> : <Camera className="h-5 w-5 text-neutral-500 mb-1" />}
                <span className="text-[10px] font-bold block">{isAr ? 'صورة المقر / واجهة المحل' : 'Business Photo'}</span>
                <span className="text-[8px] text-neutral-650 shrink-0">{uploads.storePhoto ? 'تم التحميل ✓' : 'انقر للتصوير'}</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-neutral-950 border border-neutral-900 text-xs py-2.5 rounded-xl font-bold font-sans"
              >
                {isAr ? 'تغيير الفئة' : 'Change Type'}
              </button>
              <button
                onClick={handleStep3Submit}
                className="flex-1 bg-amber-400 text-black text-xs py-2.5 rounded-xl font-black font-sans hover:bg-amber-300"
              >
                {isAr ? 'التالي وفحص الأوراق' : 'Verify & Next'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Verification Pending screen / Account success (Screen 10 mapping) */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5 text-center py-6"
          >
            {/* Awesome Animated Success Clipboard checklist badge */}
            <div className="relative w-20 h-20 mx-auto">
              {/* Outer soft glow ring */}
              <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute inset-0 border border-amber-400/20 rounded-full" />
              <div className="relative w-20 h-20 bg-gradient-to-tr from-amber-400 to-amber-500 text-black rounded-full flex items-center justify-center shadow-lg">
                <Check className="h-10 w-10 stroke-[3.5] animate-bounce" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold font-sans tracking-tight text-white">{isAr ? 'شكراً لك!' : 'Thank You!'}</h2>
              <span className="inline-flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-black uppercase">
                ⚙️ {isAr ? 'الحساب تحت المراجعة والدراسة' : 'ACCOUNT UNDER REVIEW'}
              </span>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                {isAr 
                  ? 'طلب انضمام شركتك فلاش قيد الدراسة الفورية. السجل التجاري والبيانات الضريبية تخضع للتفتيش الآلي المسرّع.'
                  : 'Your business registration is pending and is under automated review. We will notify you once verified.'}
              </p>
            </div>

            {/* Custom Approver Fast Simulation Controls (to pass verification and enter the dashboard immediately) */}
            <div className="bg-[#111111] p-3.5 rounded-2xl border border-neutral-900 mx-auto max-w-sm text-left space-y-2.5">
              <span className="text-[9px] font-mono font-bold text-amber-450 uppercase tracking-widest block text-center">
                🚀 FAST-TRACK ADMINISTRATOR SIMULATION
              </span>
              <p className="text-[9px] text-neutral-450 text-center leading-normal">
                {isAr 
                  ? 'بصفتك مختبرًا، انقر أدناه للموافقة على الأوراق والمستندات الثبوتية فوراً.' 
                  : 'As a tester, click the instant approval simulation trigger to immediately activate account.'}
              </p>
              <button
                onClick={handleFinishAndActivate}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-[10.5px] font-black py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10"
              >
                <span>⚡ {isAr ? 'الموافقة الفورية وتنشيط الشريك' : 'Instant Master Approval & Enter'}</span>
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-neutral-500 hover:text-neutral-400 text-xs hover:underline pt-2 block mx-auto bg-transparent border-none cursor-pointer font-bold"
            >
              {isAr ? 'الرجوع ومراجعة البيانات المرفوعة' : 'Back to registration details'}
            </button>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
