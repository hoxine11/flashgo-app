import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bike, Zap, Check, X, Shield, MapPin, DollarSign, Award, Bell, Navigation, 
  Map, Activity, Play, AlertCircle, ShoppingBag, Eye 
} from 'lucide-react';

interface CaptainDashboardProps {
  lang: 'ar' | 'en';
  onLogout: () => void;
  captainData: { name: string; phone: string; wilaya: string; model: string } | null;
  earnings: { today: number; completedCount: number; balance: number };
  setEarnings: React.Dispatch<React.SetStateAction<{ today: number; completedCount: number; balance: number }>>;
}

interface SimulatedRequest {
  id: string;
  type: 'food' | 'parcel' | 'grocery' | 'ride';
  storeName: string;
  storeNameEn: string;
  pickup: string;
  pickupEn: string;
  delivery: string;
  deliveryEn: string;
  distance: string;
  fee: number;
}

const MOCK_INCOMING_REQUESTS: SimulatedRequest[] = [
  {
    id: 'REQ-491',
    type: 'food',
    storeName: 'برجر تشيز برينس - ديدوش مراد',
    storeNameEn: 'Burger Cheese Prince - Didouche Mourad',
    pickup: 'مطعم برجر برينس - ديدوش مراد',
    pickupEn: 'Burger Prince - Didouche Mourad',
    delivery: 'ساحة أودان - الجزائر الوسطى',
    deliveryEn: 'Audin Square - Algiers Center',
    distance: '1.2 km',
    fee: 400
  },
  {
    id: 'REQ-108',
    type: 'parcel',
    storeName: 'توصيل مستندات عاجل',
    storeNameEn: 'Urgent Document Dispatch',
    pickup: 'مكتب البريد المركزي، الجزائر وسط',
    pickupEn: 'Grande Poste, Algiers Center',
    delivery: 'حي حيدرة - ساحة القدس',
    deliveryEn: 'Hydra District - Jerusalem Square',
    distance: '4.8 km',
    fee: 650
  },
  {
    id: 'REQ-551',
    type: 'grocery',
    storeName: 'مستلزمات من ميني ماركت ديدوش',
    storeNameEn: 'Mini Market Didouche Supplies',
    pickup: 'ميني ماركت ديدوش',
    pickupEn: 'Didouche Mini Market',
    delivery: 'المرادية - حي البساتين',
    deliveryEn: 'El Mouradia - District Orchards',
    distance: '2.5 km',
    fee: 350
  }
];

export default function CaptainDashboard({
  lang,
  onLogout,
  captainData,
  earnings,
  setEarnings
}: CaptainDashboardProps) {
  const isAr = lang === 'ar';
  
  // Status hooks
  const [isOnline, setIsOnline] = useState(true);
  const [incomingRequest, setIncomingRequest] = useState<SimulatedRequest | null>(null);
  const [countdown, setCountdown] = useState(15);
  const [activeDelivery, setActiveDelivery] = useState<SimulatedRequest | null>(null);
  const [deliveryStep, setDeliveryStep] = useState<'accepted' | 'arrived_pickup' | 'on_the_way' | 'delivered'>('accepted');

  // Generate simulated requests
  useEffect(() => {
    if (!isOnline || incomingRequest || activeDelivery) return;

    // Trigger a simulated incoming request after 5 seconds of being online
    const triggerIn = setTimeout(() => {
      const idx = Math.floor(Math.random() * MOCK_INCOMING_REQUESTS.length);
      setIncomingRequest(MOCK_INCOMING_REQUESTS[idx]);
      setCountdown(15);
    }, 5000);

    return () => clearTimeout(triggerIn);
  }, [isOnline, incomingRequest, activeDelivery]);

  // Handle live countdown
  useEffect(() => {
    if (!incomingRequest) return;
    if (countdown <= 0) {
      setIncomingRequest(null);
      return;
    }

    const interval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [incomingRequest, countdown]);

  const handleAcceptRequest = () => {
    if (!incomingRequest) return;
    setActiveDelivery(incomingRequest);
    setIncomingRequest(null);
    setDeliveryStep('accepted');
  };

  const handleRejectRequest = () => {
    setIncomingRequest(null);
  };

  const handleProgressDelivery = () => {
    if (!activeDelivery) return;

    if (deliveryStep === 'accepted') {
      setDeliveryStep('arrived_pickup');
    } else if (deliveryStep === 'arrived_pickup') {
      setDeliveryStep('on_the_way');
    } else if (deliveryStep === 'on_the_way') {
      // Delivered successfully! Add money
      const rewardedFee = activeDelivery.fee;
      setEarnings(prev => ({
        today: prev.today + rewardedFee,
        completedCount: prev.completedCount + 1,
        balance: prev.balance + rewardedFee
      }));

      // Finish Order alert
      alert(
        isAr 
          ? `أحسنتم يا كابتن المجهود عظيم! تم تفريغ الطلب بنجاح. أضيف إلى رصيدك اليومي +${rewardedFee} دج` 
          : `Amazing job captain! Package successfully delivered. Earned +${rewardedFee} DA.`
      );

      // Clean active delivery
      setActiveDelivery(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Top Banner with name and online toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-950 p-4 rounded-3xl border border-neutral-850/80">
        <div className="flex items-center gap-3">
          <div className="p-3.5 bg-amber-400 text-black rounded-2xl shadow-lg ring-4 ring-amber-400/10">
            <Bike className="h-6 w-6 stroke-[2.3]" />
          </div>
          <div>
            <h3 className="font-black text-white text-base">
              {isAr ? `مرحباً بك، كابتن ${captainData?.name || 'أحمد'}!` : `Welcome back, Captain ${captainData?.name || 'Ahmed'}!`}
            </h3>
            <span className="text-[10px] text-neutral-450 font-mono block">
              {isAr ? `دراجة: ${captainData?.model || 'Honda SH 150'} | الولاية: ${captainData?.wilaya || 'الجزائر العاصمة'}` : `Vehicle: ${captainData?.model || 'Honda SH 150'} | Province: ${captainData?.wilaya || 'Algiers'}`}
            </span>
          </div>
        </div>

        {/* Live status toggle banner */}
        <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-2xl w-full sm:w-auto justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs font-black">
              {isAr ? (isOnline ? 'أنت متصل الآن (متاح)' : 'أنت غير متصل (مغلق)') : (isOnline ? 'ONLINE & ACTIVE' : 'OFFLINE')}
            </span>
          </div>
          <button
            onClick={() => {
              setIsOnline(!isOnline);
              setIncomingRequest(null);
            }}
            className={`cursor-pointer px-4.5 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all ${isOnline ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' : 'bg-emerald-400 text-black hover:bg-emerald-300'}`}
          >
            {isAr ? (isOnline ? 'قطع الاتصال' : 'بدء العمل الآن') : (isOnline ? 'Go Offline' : 'Go Online')}
          </button>
        </div>
      </div>

      {/* Metrics Stat block */}
      <div className="grid grid-cols-3 gap-3">
        
        {/* Today Earnings */}
        <div className="bg-neutral-950 p-4 border border-neutral-850 rounded-2xl relative overflow-hidden">
          <div className="absolute top-2 right-2 text-neutral-800"><DollarSign className="h-7 w-7 opacity-20" /></div>
          <span className="text-[9px] text-neutral-450 font-bold block uppercase">{isAr ? 'أرباح اليوم كاش' : 'Today Earnings'}</span>
          <h2 className="text-lg md:text-2xl font-black font-mono text-amber-400 tracking-tight mt-1">
            {earnings.today} <span className="text-[9px] font-sans font-bold">{isAr ? 'دج' : 'DA'}</span>
          </h2>
          <span className="text-[8px] text-emerald-400 block font-semibold mt-0.5">⏱ 100% {isAr ? 'مدفوع' : 'Settled'}</span>
        </div>

        {/* Completed deliveries counter */}
        <div className="bg-neutral-950 p-4 border border-neutral-850 rounded-2xl relative overflow-hidden">
          <span className="text-[9px] text-neutral-450 font-bold block uppercase">{isAr ? 'المكتملة اليوم' : 'Trips Done'}</span>
          <h2 className="text-lg md:text-2xl font-black font-mono text-white tracking-tight mt-1">
            {earnings.completedCount} <span className="text-[9px] font-sans font-bold">{isAr ? 'رحلات' : 'Orders'}</span>
          </h2>
          <span className="text-[8px] text-amber-400 block font-semibold mt-0.5">⭐ 4.9 {isAr ? 'تقييم كابتن' : 'Avg Rating'}</span>
        </div>

        {/* Stored fleet current balance */}
        <div className="bg-neutral-950 p-4 border border-neutral-850 rounded-2xl relative overflow-hidden">
          <span className="text-[9px] text-neutral-450 font-bold block uppercase">{isAr ? 'الرصيد الكلي بالمحفظة' : 'My Fleet Ledger'}</span>
          <h2 className="text-lg md:text-2xl font-black font-mono text-emerald-400 tracking-tight mt-1">
            {earnings.balance} <span className="text-[9px] font-sans font-bold">{isAr ? 'دج' : 'DA'}</span>
          </h2>
          <span className="text-[8px] text-neutral-450 block font-medium mt-0.5">{isAr ? 'متاح للسحب' : 'Ready to withdraw'}</span>
        </div>
      </div>

      {/* Main Working area with online/offline panels */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        
        {/* Large Dashboard control view panel (Col span 3) */}
        <div className="lg:col-span-3 space-y-4">
          
          <AnimatePresence mode="wait">
            
            {/* 1. Offline Immersive Board */}
            {!isOnline && (
              <motion.div
                key="offline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-neutral-950/80 border border-neutral-850 p-8 rounded-3xl text-center space-y-4 h-64 flex flex-col items-center justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <Activity className="h-6 w-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-neutral-200 text-sm">{isAr ? 'أنت غير متصل الآن' : 'You are currently offline'}</h4>
                  <p className="text-[10px] text-neutral-450 mt-1 max-w-sm mx-auto">
                    {isAr 
                      ? 'قم بمطابقة زر الاتصال بالأعلى وتفعيله لبدء دمج طلبات التوصيل بالدراجة النارية بالقرب منك في الجزائر العاصمة.' 
                      : 'Please toggle the online/active button above to begin scanning for deliveries inside Riyadh or Algiers.'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* 2. Incoming Dispatch Radar request card details */}
            {isOnline && incomingRequest && (
              <motion.div
                key="incoming"
                initial={{ transform: 'scale(0.95)', opacity: 0 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                exit={{ transform: 'scale(0.95)', opacity: 0 }}
                className="bg-neutral-900 border-2 border-amber-400 p-5 rounded-3xl relative overflow-hidden shadow-2xl space-y-4"
              >
                {/* Alert Top */}
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-amber-400 text-neutral-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[9px] blink font-mono uppercase">
                    🚨 {isAr ? 'طلب توصيل عاجل جديد' : 'URGENT TASK ON RADER'}
                  </span>
                  <div className="text-amber-400 font-mono font-black text-xs flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded-xl">
                    <span>{isAr ? 'العد التنازلي:' : 'Timeout:'}</span>
                    <span className="animate-pulse text-sm">{countdown}s</span>
                  </div>
                </div>

                <div className="flex justify-between items-start pt-1.5">
                  <div>
                    <h4 className="text-base font-black text-white">
                      {isAr ? incomingRequest.storeName : incomingRequest.storeNameEn}
                    </h4>
                    <span className="text-[10px] text-neutral-450 font-semibold">{isAr ? 'نوع التوصيل: مستندات وقصاصات أكل فلاش' : 'Direct express messenger delivery link'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-500 block">{isAr ? 'صافي ربحك الفوري' : 'Est. Captain payout'}</span>
                    <span className="text-lg font-black text-amber-400 font-mono">{incomingRequest.fee} DA</span>
                  </div>
                </div>

                {/* Path Map icons */}
                <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-850 space-y-2.5 text-xs text-neutral-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 bg-amber-400 text-neutral-950 rounded-full flex items-center justify-center font-bold text-[8px]">A</span>
                    <span className="text-neutral-300 truncate">{isAr ? incomingRequest.pickup : incomingRequest.pickupEn}</span>
                  </div>
                  <div className="flex items-center gap-2 border-t border-neutral-900 pt-2.5">
                    <span className="h-3 w-3 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-[8px]">B</span>
                    <span className="text-neutral-300 truncate">{isAr ? incomingRequest.delivery : incomingRequest.deliveryEn}</span>
                  </div>
                </div>

                {/* Subinfo */}
                <div className="flex justify-between text-[11px] font-semibold text-neutral-400 px-1">
                  <span>🚀 {isAr ? 'مسافة الطريق:' : 'Route distance:'} <span className="text-neutral-200 font-mono">{incomingRequest.distance}</span></span>
                  <span>⏱ {isAr ? 'الزمن المقدر للتسليم:' : 'Est. trip time:'} <span className="text-neutral-200 font-mono">15 {isAr ? 'دقيقة' : 'mins'}</span></span>
                </div>

                {/* Accept/Reject Control trigger actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={handleRejectRequest}
                    className="bg-neutral-950 hover:bg-neutral-850/80 text-neutral-400 border border-neutral-800 py-3 rounded-2xl text-[11px] font-bold cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    <X className="h-4 w-4" />
                    <span>{isAr ? 'تخطي وتجاهل' : 'Pass & Reject'}</span>
                  </button>

                  <button 
                    onClick={handleAcceptRequest}
                    className="bg-amber-400 hover:bg-amber-300 text-black py-3 rounded-2xl text-[11px] font-black cursor-pointer shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>{isAr ? 'قبول وبدء التوصيل' : 'Accept Job'}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 3. Empty Scan online Board */}
            {isOnline && !incomingRequest && !activeDelivery && (
              <motion.div
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-neutral-950 p-6 rounded-3xl border border-neutral-850 text-center space-y-4 h-64 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-400 animate-pulse bg-amber-400/5">
                    <Navigation className="h-5 w-5 animate-bounce" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-neutral-200 text-xs">
                    {isAr ? 'جاري الفحص ومسح الخريطة بالقرب منك...' : 'Scanning for nearby deliveries...'}
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-1 max-w-xs mx-auto">
                    {isAr 
                      ? 'موقعك الجغرافي نشط وحاسوب فلاش قو يقوم بمطابقة طلبات الطعام والطرود بالجزائر العاصمة خلال دقائق.' 
                      : 'GPS location verified. Scanning for food/grocery/parcel demands close to your coordinates.'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* 4. Active Delivery Progress panel */}
            {activeDelivery && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 border-2 border-emerald-500/80 p-5 rounded-3xl shadow-xl space-y-4"
              >
                <div className="flex justify-between items-center pb-2.5 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">{isAr ? 'المهمة الجارية نشطة' : 'ACTIVE DISPATCH ON SITE'}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono font-bold tracking-wider">{activeDelivery.id}</span>
                </div>

                <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-850">
                  <h4 className="text-sm font-black text-neutral-100">{isAr ? activeDelivery.storeName : activeDelivery.storeNameEn}</h4>
                  <div className="flex justify-between items-center mt-2.5 text-xs text-neutral-450 font-mono">
                    <span>{isAr ? 'الربح عند الإنجاز:' : 'Net profit:'} <span className="text-amber-400 font-bold">{activeDelivery.fee} DA</span></span>
                    <span>🏎 {isAr ? 'المسافة:' : 'Distance:'} <span className="text-white font-bold">{activeDelivery.distance}</span></span>
                  </div>
                </div>

                {/* Progress Tracking Bar Visual */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400">
                    <span>{isAr ? 'المترقب التالي للرحلة:' : 'Milestone status:'}</span>
                    <span className="text-emerald-400 font-extrabold font-mono uppercase">
                      {deliveryStep === 'accepted' && (isAr ? 'في الطريق للمتجر' : 'Heading to pickup')}
                      {deliveryStep === 'arrived_pickup' && (isAr ? 'وصلت واستبلمت الطرد' : 'Package obtained')}
                      {deliveryStep === 'on_the_way' && (isAr ? 'في الطريق للزبون' : 'In transit to client')}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-850">
                    <div 
                      className="bg-emerald-400 h-full transition-all duration-500"
                      style={{
                        width: 
                          deliveryStep === 'accepted' ? '25%' :
                          deliveryStep === 'arrived_pickup' ? '50%' :
                          deliveryStep === 'on_the_way' ? '80%' : '100%'
                      }}
                    />
                  </div>
                </div>

                {/* Path directions visually representation */}
                <div className="bg-neutral-950/90 rounded-2xl p-3.5 border border-neutral-850 text-xs space-y-3 font-mono">
                  <div className="opacity-80">
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-bold block">{isAr ? 'خطوة ١: متجر الاستلام' : 'Step 1: Pickup point'}</span>
                    <span className="text-neutral-200 block mt-0.5 truncate">{isAr ? activeDelivery.pickup : activeDelivery.pickupEn}</span>
                  </div>
                  <div className="border-t border-neutral-900 pt-2.5">
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-bold block">{isAr ? 'خطوة ٢: عنوان زبون فلاش قو' : 'Step 2: Drop off client address'}</span>
                    <span className="text-neutral-200 block mt-0.5 truncate">{isAr ? activeDelivery.delivery : activeDelivery.deliveryEn}</span>
                  </div>
                </div>

                {/* Confirm Progression Button */}
                <button
                  onClick={handleProgressDelivery}
                  className="w-full bg-emerald-450 hover:bg-emerald-400 text-neutral-950 font-black py-3 rounded-2xl text-xs transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-emerald-400/10 flex items-center justify-center gap-1.5"
                >
                  <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                  <span>
                    {deliveryStep === 'accepted' && (isAr ? 'لقد وصلت للمتجر لبدء الشحن' : 'Mark as Arrived at Pickup')}
                    {deliveryStep === 'arrived_pickup' && (isAr ? 'استلمت الأغراض والطرود بنجاح' : 'Confirm Package Picked Up')}
                    {deliveryStep === 'on_the_way' && (isAr ? 'تم تسليم الأمانة للزبون كاش' : 'Confirm Order Delivered')}
                  </span>
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Mini Smart Grid map visualization (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-neutral-950 p-4 border border-neutral-850 rounded-3xl space-y-3">
            <span className="text-[10px] text-neutral-500 font-mono tracking-widest font-bold uppercase block">
              {isAr ? 'تظليل ذكي · خريطة رادار كابتن' : 'SMART GPS ALTERS RADAR'}
            </span>

            {/* Smart simulated canvas map container */}
            <div className="h-48 bg-neutral-900 rounded-2xl border border-neutral-800 relative z-10 overflow-hidden flex items-center justify-center">
              
              {/* Fake grid lines matching Riyhad or Algiers visual map details */}
              <div className="absolute inset-0 z-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              
              {/* Dynamic paths representation */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20">
                <path d="M 20,40 L 120,80 L 220,50 L 320,180" fill="none" stroke="#facc15" strokeWidth="3" strokeDasharray="5" />
                <path d="M 60,190 L 180,120 L 280,140" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="3" />
              </svg>

              {/* Pin representations */}
              <div className="absolute top-[20%] left-[30%] z-20 flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-amber-400 animate-ping absolute"></div>
                <div className="h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-neutral-950 relative shadow shadow-amber-500/50"></div>
                <span className="text-[7px] font-bold bg-neutral-950/90 text-neutral-300 font-mono px-1 rounded border border-neutral-800 mt-1 uppercase scale-90">Pickup</span>
              </div>

              <div className="absolute bottom-[30%] right-[25%] z-20 flex flex-col items-center">
                <div className="h-3.5 w-3.5 rounded-full bg-indigo-500 border-2 border-neutral-950 relative shadow shadow-indigo-500/50"></div>
                <span className="text-[7px] font-bold bg-neutral-950/90 text-neutral-300 font-mono px-1 rounded border border-neutral-800 mt-1 uppercase scale-90">Client</span>
              </div>

              {/* Scooter/bike icon navigating map */}
              <motion.div 
                className="absolute z-30 flex flex-col items-center"
                animate={{
                  x: activeDelivery ? [10, 60, -20, 10] : [0, 40, 20, 0],
                  y: activeDelivery ? [-10, 30, 10, -10] : [0, -10, 10, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: activeDelivery ? 12 : 25,
                  ease: "linear"
                }}
              >
                <div className="p-1 px-1.5 bg-neutral-950 text-amber-400 rounded-lg border border-amber-400/40 shadow-xl flex items-center gap-1">
                  <span className="text-[10px]">🏍</span>
                  <span className="text-[7px] font-extrabold font-mono text-neutral-200">YOU</span>
                </div>
              </motion.div>

              <div className="absolute bottom-2 left-2 bg-neutral-950/95 px-2.5 py-1 text-[8px] font-mono text-neutral-450 border border-neutral-850 rounded-lg shadow-md">
                ALGIERS CENTRE TRACKER ACTIVE
              </div>
            </div>

            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-between text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'عقود التأمين فلاش قو' : 'Insurance fully active'}</span>
              </span>
              <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/15 font-mono">
                {isAr ? 'مؤمن بالكامل' : 'PROTECTED'}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
