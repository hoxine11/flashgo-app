import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRightLeft, Calendar, User, MapPin, Bike, CheckCircle2, XCircle } from 'lucide-react';

interface CaptainOrdersProps {
  lang: 'ar' | 'en';
}

interface CaptainOrder {
  id: string;
  customerName: string;
  customerNameEn: string;
  type: 'food' | 'grocery' | 'parcel';
  status: 'active' | 'completed' | 'cancelled';
  pickup: string;
  pickupEn: string;
  delivery: string;
  deliveryEn: string;
  distance: string;
  price: number;
  date: string;
}

const INITIAL_CAPTAIN_ORDERS: CaptainOrder[] = [
  {
    id: 'FL-9912',
    customerName: 'كمال مراد',
    customerNameEn: 'Kamel Mourad',
    type: 'food',
    status: 'completed',
    pickup: 'مطعم برجر برينس - ديدوش مراد',
    pickupEn: 'Burger Prince - Didouche Mourad',
    delivery: 'ساحة أودان - الجزائر الوسطى',
    deliveryEn: 'Audin Square - Algiers Center',
    distance: '1.2 km',
    price: 400,
    date: '٢٠٢٦-٠٥-٢٥ ١٤:٣٠'
  },
  {
    id: 'FL-8821',
    customerName: 'فاطمة الزهراء',
    customerNameEn: 'Fatima Zohra',
    type: 'parcel',
    status: 'completed',
    pickup: 'مستشفى مصطفى باشا الجامعي',
    pickupEn: 'Mustapha Pacha Hospital',
    delivery: 'سيدي يحيى - حيدرة',
    deliveryEn: 'Sidi Yahia - Hydra',
    distance: '5.2 km',
    price: 750,
    date: '٢٠٢٦-٠٥-٢٤ ١١:١٥'
  },
  {
    id: 'FL-2104',
    customerName: 'ياسين بلعيدي',
    customerNameEn: 'Yacine Belaidi',
    type: 'grocery',
    status: 'completed',
    pickup: 'سوبرماركت النجمة - سعيد حمدين',
    pickupEn: 'Ennadma Supermarket - Said Hamdine',
    delivery: 'بئر مراد رايس - حي زونكا',
    deliveryEn: 'Bir Mourad Rais - Zonca',
    distance: '3.1 km',
    price: 450,
    date: '٢٠٢٦-٠٥-٢٤ ١٨:٤٥'
  },
  {
    id: 'FL-1940',
    customerName: 'سفيان سليماني',
    customerNameEn: 'Sofiane Slimani',
    type: 'food',
    status: 'cancelled',
    pickup: 'مطعم البيتزا العصري - الأبيار',
    pickupEn: 'Modern Pizza Restaurant - El Biar',
    delivery: 'باب الواد - شارع العربي بن مهيدي',
    deliveryEn: 'Bab El Oued - Larbi Ben M\'hidi',
    distance: '6.0 km',
    price: 900,
    date: '٢٠٢٦-٠٥-٢٣ ٠٩:٠٠'
  }
];

export default function CaptainOrders({ lang }: CaptainOrdersProps) {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('completed');

  // Filter lists
  const filteredOrders = INITIAL_CAPTAIN_ORDERS.filter(o => o.status === activeTab);

  return (
    <div className="p-4 md:p-6 space-y-6" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Visual Header */}
      <div className="flex justify-between items-center bg-neutral-950 p-4.5 rounded-3xl border border-neutral-850">
        <div>
          <h2 className="text-lg font-black text-white">{isAr ? 'سجلات طلبات الكابتن' : 'My Completed Flights'}</h2>
          <span className="text-[10px] text-neutral-450 leading-none block mt-1">
            {isAr ? 'قائمة كامل مشاويرك وطلبيات التوصيل بالدراجة النارية' : 'Review historical trips, distances and earnings log'}
          </span>
        </div>
        <div className="bg-amber-400/10 text-amber-400 h-9 px-3 rounded-xl border border-amber-400/20 text-xs font-mono font-bold flex items-center justify-center">
          {filteredOrders.length} {isAr ? 'سجلات' : 'Flights'}
        </div>
      </div>

      {/* Tabs Filters */}
      <div className="flex gap-2 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-900">
        
        {/* Active Tab button */}
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 text-center py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${activeTab === 'active' ? 'bg-neutral-900 border border-neutral-850 text-amber-400 shadow' : 'text-neutral-500 hover:text-neutral-300 bg-transparent border-none'}`}
        >
          {isAr ? 'النشطة حالياً' : 'Active'}
        </button>

        {/* Completed Tab button */}
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 text-center py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${activeTab === 'completed' ? 'bg-neutral-900 border border-neutral-850 text-emerald-400 shadow' : 'text-neutral-500 hover:text-neutral-300 bg-transparent border-none'}`}
        >
          {isAr ? 'المكتملة بنجاح' : 'Completed'}
        </button>

        {/* Cancelled Tab button */}
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 text-center py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${activeTab === 'cancelled' ? 'bg-neutral-900 border border-neutral-850 text-red-400 shadow' : 'text-neutral-500 hover:text-neutral-300 bg-transparent border-none'}`}
        >
          {isAr ? 'الملغاة' : 'Cancelled'}
        </button>
      </div>

      {/* Grid showing Orders */}
      <div className="space-y-3.5">
        {filteredOrders.length === 0 ? (
          <div className="bg-neutral-950 p-12 text-center rounded-3xl border border-neutral-850">
            <span className="text-4xl block mb-2">📦</span>
            <h4 className="text-xs font-bold text-neutral-400">{isAr ? `لا توجد مشاوير ${activeTab === 'active' ? 'نشطة' : activeTab === 'completed' ? 'مكتملة' : 'ملغاة'} حالياً` : `No ${activeTab} trips found`}</h4>
            <p className="text-[10px] text-neutral-550 mt-1">{isAr ? 'طلبيات الرادار الجديد تظهر بالصفحة الرئيسية للوحة التحكم كابتن' : 'New dispatch orders pop up in real time inside the radar'}</p>
          </div>
        ) : (
          filteredOrders.map(ord => (
            <motion.div
              key={ord.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-950 p-4 rounded-2xl border border-neutral-850 hover:border-neutral-800 transition-all space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl text-[10px] font-bold ${ord.type === 'food' ? 'bg-amber-400/10 text-amber-400' : ord.type === 'grocery' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-pink-500/10 text-pink-400'}`}>
                    {ord.type === 'food' && '🍔 Fast Food'}
                    {ord.type === 'grocery' && '🛒 Grocery'}
                    {ord.type === 'parcel' && '📄 Parcel'}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-neutral-100 font-mono tracking-wider">{ord.id}</h4>
                    <span className="text-[9px] text-neutral-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      <span>{ord.date}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-amber-400 font-mono">{ord.price} DA</span>
                  <span className="text-[9px] text-neutral-500 block">{isAr ? 'صافي الكابتن' : 'Earned'}</span>
                </div>
              </div>

              {/* Path Routing details */}
              <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-900 text-[11px] space-y-2 mt-1 font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-neutral-400 truncate w-full">
                    {isAr ? `من: ${ord.pickup}` : `From: ${ord.pickupEn}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-t border-neutral-950 pt-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span className="text-neutral-400 truncate w-full">
                    {isAr ? `إلى: ${ord.delivery}` : `To: ${ord.deliveryEn}`}
                  </span>
                </div>
              </div>

              {/* Customer footer detail */}
              <div className="flex justify-between items-center text-[10px] text-neutral-450 border-t border-neutral-900 pt-2.5 px-0.5">
                <div className="flex items-center gap-1 font-semibold">
                  <User className="h-3.5 w-3.5 text-neutral-550" />
                  <span>{isAr ? `الزبون: ${ord.customerName}` : `Client: ${ord.customerNameEn}`}</span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <span>🚀 {isAr ? 'احسب المسافة:' : 'Distance:'}</span>
                  <span className="text-neutral-200 font-bold">{ord.distance}</span>
                </div>
              </div>

            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
