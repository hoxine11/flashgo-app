import flashgo from '../image/flashgo.png';
interface LandingHeroProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

export default function LandingHero({ lang, setLang }: LandingHeroProps) {
  const isAr = lang === 'ar';

  return (
    <div className="flex flex-col text-white max-w-xl h-full justify-between py-6">
      {/* Header Info & Language Toggler */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">

          {/* Logo Image */}
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-2xl ring-2 ring-amber-400/20 bg-black">

            <img
              src={flashgo}
              alt="Flash Go Logo"
              className="
        w-full
        h-full
        object-cover
        object-center
        scale-110
      "
            />

          </div>

          {/* Text */}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white leading-none">
              Flash <span className="text-amber-400">Go</span>
            </h1>

            <p className="text-xs text-neutral-400 mt-1 font-medium">
              ⚡ Delivery & Transit Solution
            </p>
          </div>

        </div>

        <button
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-xs text-amber-300 border border-amber-300/20 rounded-xl px-3.5 py-2 transition-all duration-300 font-medium active:scale-95 cursor-pointer"
        >
          <Languages className="h-4 w-4" />
          <span>{isAr ? 'English' : 'العربية (RTL)'}</span>
        </button>
      </div>

      {/* Hero Body */}
      <div className="space-y-6 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400/20 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Bike className="h-3.5 w-3.5 animate-bounce" />
          <span>{isAr ? 'أسرع خدمة توصيل متكاملة' : 'Fastest Integrated Delivery Service'}</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-none text-white font-sans">
            {isAr ? (
              <>
                فلاش غو: <span className="text-amber-400 text-glow">سرعة، أمان، راحة</span>
              </>
            ) : (
              <>
                Flash Go: <span className="text-amber-400 text-glow">Speed, Security, Comfort</span>
              </>
            )}
          </h2>
          <p className="text-neutral-300 text-sm md:text-md leading-relaxed">
            {isAr
              ? 'تطبيق فلاش غو هو بوابتك المفضلة لتوصيل الطلبات والمشاوير والطرود وقضاء الحاجيات في ثوانٍ معدودة. استكشف شاشات التطبيق التفاعلية على محاكي الجوال واطلب الآن فوراً!'
              : 'Flash Go app is your premium gateway for instant deliveries, passenger rides, parcel logistics, and micro grocery shopping in seconds. Interact with the fully interactive phone simulator on the right!'}
          </p>
        </div>

        {/* Features list directly from design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Fast Delivery */}
          <div className="flex gap-3 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-amber-400/30 transition-all duration-300 group">
            <div className="flex-shrink-0 bg-amber-400/10 text-amber-400 p-2.5 rounded-lg h-fit group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
              <Zap className="h-5 w-5 fill-current md:transform group-hover:scale-110 duration-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-100 mb-1">
                {isAr ? 'توصيل سريع' : 'Fast Delivery'}
              </h4>
              <p className="text-xs text-neutral-400 leading-normal">
                {isAr ? 'نوصل طلبك في أسرع وقت وبضمان الوقت المحدد.' : 'We deliver your order in the fastest time and safe conditions.'}
              </p>
            </div>
          </div>

          {/* Secure */}
          <div className="flex gap-3 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-amber-400/30 transition-all duration-300 group">
            <div className="flex-shrink-0 bg-amber-400/10 text-amber-400 p-2.5 rounded-lg h-fit group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
              <ShieldCheck className="h-5 w-5 group-hover:scale-110 duration-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-100 mb-1">
                {isAr ? 'أمان تام' : 'Total Security'}
              </h4>
              <p className="text-xs text-neutral-400 leading-normal">
                {isAr ? 'نعتني بطلبك كأنه لنا، ونوفر حماية كاملة مع تأمين شحنتك.' : 'We care for your order as if it is ours, securing your valuable freight.'}
              </p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex gap-3 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-amber-400/30 transition-all duration-300 group">
            <div className="flex-shrink-0 bg-amber-400/10 text-amber-400 p-2.5 rounded-lg h-fit group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
              <Headphones className="h-5 w-5 group-hover:scale-110 duration-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-100 mb-1">
                {isAr ? 'دعم ٢٤/٧' : '24/7 Support'}
              </h4>
              <p className="text-xs text-neutral-400 leading-normal">
                {isAr ? 'نحن هنا لخدمتك دائماً وعلى مدار الساعة لحل أي طارئ.' : 'We are always here for your service round the clock to solve any queries.'}
              </p>
            </div>
          </div>

          {/* Live Tracking */}
          <div className="flex gap-3 bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl hover:border-amber-400/30 transition-all duration-300 group">
            <div className="flex-shrink-0 bg-amber-400/10 text-amber-400 p-2.5 rounded-lg h-fit group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
              <MapPin className="h-5 w-5 group-hover:scale-110 duration-300" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-100 mb-1">
                {isAr ? 'تتبع مباشر بخرائط ذكية' : 'Live Smart Map Tracking'}
              </h4>
              <p className="text-xs text-neutral-400 leading-normal">
                {isAr ? 'تابع موقع الكابتن خطوة بخطوة ولحظة بلحظة حتى وصوله.' : 'Track the captain\'s route step-by-step and minute-by-minute live.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Instructions / Developer metadata */}
      <div className="border-t border-neutral-800 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <div>
          <span>{isAr ? 'تم تصميم التطوير للهواتف والمتصفحات وبشكل تفاعلي كامل.' : 'Design adapted visually and fully interactive on Phone and Browser.'}</span>
        </div>
        <div className="flex gap-4">
          <span className="font-mono">v1.1.0</span>
          <span>⚡ Flash Go Inc.</span>
        </div>
      </div>
    </div>
  );
}
