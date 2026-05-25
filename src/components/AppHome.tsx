import { Zap, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { UserProfile, CategoryType } from '../types';

interface AppHomeProps {
  lang: 'ar' | 'en';
  user: UserProfile;
  onSelectCategory: (category: CategoryType) => void;
  onSelectPromo: () => void;
}

export default function AppHome({ lang, user, onSelectCategory, onSelectPromo }: AppHomeProps) {
  const isAr = lang === 'ar';

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Scrollable Container */}
<div className="flex-1 p-3.5 space-y-4 overflow-hidden">        
        {/* User Greeting Panel block */}
        <div className="flex items-center justify-between pb-1">
          <div className="space-y-1 text-left">
            <h3 className="text-sm text-neutral-450 flex items-center gap-1.5 font-medium">
              <span>{isAr ? 'مرحباً' : 'Welcome back,'}</span>
              <span className="font-extrabold text-neutral-100">{isAr ? user.name : user.nameEn}</span>
              <span>👋</span>
            </h3>
            <h2 className="text-lg font-black tracking-tight text-white leading-none">
              {isAr ? 'ماذا تريد اليوم؟' : 'What do you need today?'}
            </h2>
          </div>
          
        </div>

        {/* Categories Grid as shown exactly in design screenshots */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          
          {/* Card 1: Passenger / Client delivery "توصيل الزبون" */}
          <div
  onClick={() => onSelectCategory('ride')}
  className="bg-[#1f1f22] border border-[#2c2c31] hover:border-[#3a3a40] rounded-[22px] p-4 min-h-[185px] flex flex-col items-center justify-between transition-all duration-300 group cursor-pointer"
>
  <div className="w-full flex justify-start">
    <span className="text-[10px] uppercase font-black text-amber-300 font-mono tracking-wide bg-[#2a2a2f] px-2 py-1 rounded-md">
      GO RIDE
    </span>
  </div>

  <div className="flex justify-center items-center flex-1 group-hover:scale-105 transition-all duration-300">
    <img
      src="../image/zabon-removebg-preview.png"
      alt="ride"
      className="w-24 h-24 object-contain"
    />
  </div>

  <div className="text-center space-y-1">
    <h4 className="font-extrabold text-xl text-white leading-none">
      {isAr ? 'توصيل الزبون' : 'Ride Hailing'}
    </h4>

    <p className="text-[11px] text-neutral-400 leading-tight">
      {isAr ? 'نوصلك إلى وجهتك بأمان' : 'Fast & safe rides'}
    </p>
  </div>
</div>

          {/* Card 2: Parcel Cargo Delivery "توصيل الطرود" */}
          <div
  onClick={() => onSelectCategory('parcel')}
  className="bg-[#1f1f22] border border-[#2c2c31] hover:border-[#3a3a40] rounded-[22px] p-4 min-h-[185px] flex flex-col items-center justify-between transition-all duration-300 group cursor-pointer"
>
  <div className="w-full flex justify-start">
    <span className="text-[10px] uppercase font-black text-neutral-300 font-mono tracking-wide bg-[#2a2a2f] px-2 py-1 rounded-md">
      LOGISTICS
    </span>
  </div>

  <div className="flex justify-center items-center flex-1 group-hover:scale-105 transition-all duration-300">
    <img
      src="../image/torod-removebg-preview.png"
      alt="parcel"
      className="w-24 h-24 object-contain"
    />
  </div>

  <div className="text-center space-y-1">
    <h4 className="font-extrabold text-xl text-white leading-none">
      {isAr ? 'توصيل الطرود' : 'Parcel Delivery'}
    </h4>

    <p className="text-[11px] text-neutral-400 leading-tight">
      {isAr ? 'أرسل طرودك بسرعة وأمان' : 'Fast parcel shipping'}
    </p>
  </div>
</div>

          {/* Card 3: Errands Helper / Mall shopping "قضاء الحاجيات" */}
          <div
  onClick={() => onSelectCategory('grocery')}
  className="bg-[#1f1f22] border border-[#2c2c31] hover:border-[#3a3a40] rounded-[22px] p-4 min-h-[185px] flex flex-col items-center justify-between transition-all duration-300 group cursor-pointer"
>
  <div className="w-full flex justify-start">
    <span className="text-[10px] uppercase font-black text-neutral-300 font-mono tracking-wide bg-[#2a2a2f] px-2 py-1 rounded-md">
      MARKET
    </span>
  </div>

  <div className="flex justify-center items-center flex-1 group-hover:scale-105 transition-all duration-300">
    <img
      src="../image/alimentation-removebg-preview.png"
      alt="grocery"
      className="w-24 h-24 object-contain"
    />
  </div>

  <div className="text-center space-y-1">
    <h4 className="font-extrabold text-xl text-white leading-none">
      {isAr ? 'قضاء الحاجيات' : 'Grocery Shopping'}
    </h4>

    <p className="text-[11px] text-neutral-400 leading-tight">
      {isAr ? 'نشتري لك كل احتياجاتك' : 'Buy your daily needs'}
    </p>
  </div>
</div>

          {/* Card 4: Delicious Hot Meal Dispatch "توصيل الأكل" */}
          {/* Card */}
<div
  onClick={() => onSelectCategory('food')}
  className="bg-[#1f1f22] border border-[#2c2c31] hover:border-[#3a3a40] rounded-[22px] p-4 min-h-[185px] flex flex-col items-center justify-between transition-all duration-300 group cursor-pointer"
>
  
  {/* Top Badge */}
  <div className="w-full flex justify-start">
    <span className="text-[10px] uppercase font-black text-neutral-300 font-mono tracking-wide bg-[#2a2a2f] px-2 py-1 rounded-md">
      FOOD
    </span>
  </div>

  {/* Center Image */}
  <div className="flex justify-center items-center flex-1 group-hover:scale-105 transition-all duration-300">
    <img
      src="../image/food-removebg-preview.png"
      alt="food"
      className="w-24 h-24 object-contain"
    />
  </div>

  {/* Bottom Text */}
  <div className="text-center space-y-1">
    <h4 className="font-extrabold text-xl text-white leading-none">
      {isAr ? 'توصيل الأكل' : 'Food Delivery'}
    </h4>

    <p className="text-[11px] text-neutral-400 leading-tight">
      {isAr ? 'اطلب أطباقك المفضلة' : 'Order your favorite meals'}
    </p>
  </div>
</div>
        </div>

        {/* Exclusive promo banner matching bottom section of image screenshots */}
        <div className="bg-gradient-to-tr from-neutral-900 via-neutral-900 to-amber-500/10 border border-amber-500/25 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden shadow-inner mt-2">
          
          {/* Glowing element */}
          <div className="absolute top-0 right-0 h-16 w-16 bg-amber-400/10 blur-xl rounded-full"></div>

          <div className="space-y-1.5 flex-1 relative z-10 text-left">
            <span className="bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg h-fit inline-block">
              {isAr ? 'عروض حصرية اليوم' : 'Exclusive Deals Only'}
            </span>
            <h3 className="text-sm font-black text-white leading-snug">
              {isAr ? 'خصومات فلاش حصرية كبرى تصل إلى %30' : 'Flash Special discounts up to 30% OFF'}
            </h3>
            <p className="text-[9px] text-neutral-400 leading-normal block">
              {isAr ? 'على جميع خدمات التوصيل ومشاوير التاكسي السريع' : 'Applies to ride hailing, food orders & courier runs'}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10">
            {/* Realistic stylized Gift Box item */}
            <div className="relative h-12 w-12 flex items-center justify-center text-4xl animate-wiggle">
              📦
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[13px] text-amber-400 font-mono leading-none">%</div>
            </div>
            <button
              onClick={onSelectPromo}
              className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-[9px] px-2.5 py-1.5 rounded-lg shadow-md hover:shadow-amber-400/10 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
            >
              <span>{isAr ? 'عرض العروض' : 'Claim Now'}</span>
              <ArrowRight className={`h-2.5 w-2.5 stroke-[3.5] ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Platform Slogan / App Value indicators inside phone */}
<div className="flex flex-col h-full overflow-hidden bg-neutral-950 text-white font-sans">
            <div className="bg-neutral-900/40 rounded-xl border border-neutral-850 p-2.5 flex items-center gap-2">
            <span className="text-amber-400">🛡️</span>
            <div>
              <span className="font-extrabold text-neutral-200 block">{isAr ? 'رحلة مؤمنة بالكامل' : '100% Insured Trip'}</span>
              <span className="text-[8px] text-neutral-500 leading-none">{isAr ? 'تأمين فلاش غو المعتمد' : 'Coverage on all packages'}</span>
            </div>
          </div>
          <div className="bg-neutral-900/40 rounded-xl border border-neutral-850 p-2.5 flex items-center gap-2">
            <span className="text-amber-400">🗺️</span>
            <div>
              <span className="font-extrabold text-neutral-200 block">{isAr ? 'تتبع مباشر لعامل التوصيل' : 'Realtime Track'}</span>
              <span className="text-[8px] text-neutral-500 leading-none">{isAr ? 'مستقبلي بخرائط غوغل' : 'Precision coordinates'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
