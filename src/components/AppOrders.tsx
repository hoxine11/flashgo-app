import { motion } from 'motion/react';
import { Package, Bike, CheckCircle, RefreshCw, Star, MapPin, Compass, Search } from 'lucide-react';
import { Order } from '../types';

interface AppOrdersProps {
  lang: 'ar' | 'en';
  orders: Order[];
  onCancelOrder?: (id: string) => void;
}

export default function AppOrders({ lang, orders, onCancelOrder }: AppOrdersProps) {
  const isAr = lang === 'ar';

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />;
      case 'accepted': return <Package className="h-4 w-4 text-yellow-400" />;
      case 'in_transit': return <Bike className="h-4 w-4 text-sky-400 animate-bounce" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default: return <Package className="h-4 w-4 text-neutral-400" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    if (isAr) {
      switch (status) {
        case 'pending': return 'جاري البحث عن كابتن...';
        case 'accepted': return 'تم قبول الطلب وتجهيزه';
        case 'in_transit': return 'الكابتن في الطريق إليك 🛵';
        case 'delivered': return 'تم التسليم بنجاح، شكراً لك!';
        case 'cancelled': return 'تم إلغاء الطلب';
        default: return 'قيد التنفيذ';
      }
    } else {
      switch (status) {
        case 'pending': return 'Finding nearest courier...';
        case 'accepted': return 'Order accepted & preparing';
        case 'in_transit': return 'Courier is in transit 🛵';
        case 'delivered': return 'Successfully delivered!';
        case 'cancelled': return 'Cancelled';
        default: return 'In progress';
      }
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-neutral-900/90 backdrop-blur-md px-4 py-3 border-b border-neutral-800 flex items-center justify-between sticky top-0 z-15">
        <h3 className="font-bold text-sm tracking-tight text-white w-full text-center">
          {isAr ? 'طلباتي ومتابعة الشحنات' : 'My Orders & Tracking'}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Active Orders Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-neutral-400 px-1 border-r-2 border-amber-400 pr-1.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>{isAr ? 'رحلات وطلبات جارية' : 'Active Orders Now'}</span>
          </h4>

          {activeOrders.length === 0 ? (
            <div className="text-center py-6 bg-neutral-900/50 rounded-xl border border-neutral-800 text-neutral-500 text-xs">
              {isAr ? 'لا توجد طلبات جارية حالياً. اذهب للرئيسية واطلب!' : 'No current active trips. Go to home and request a service!'}
            </div>
          ) : (
            activeOrders.map((ord) => (
              <div key={ord.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 space-y-3.5 shadow-lg relative overflow-hidden">
                {/* Visual Top Glow bar based on status */}
                <div className={`absolute top-0 inset-x-0 h-1 ${ord.status === 'in_transit' ? 'bg-sky-400' : 'bg-amber-400'}`} />

                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {ord.category === 'ride' ? '🚕' : ord.category === 'parcel' ? '📦' : ord.category === 'grocery' ? '🛒' : '🍔'}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-neutral-100 uppercase font-mono">
                        {ord.id}
                      </h5>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        {isAr ? ord.storeName : ord.storeNameEn}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400 font-mono">
                    {ord.cost} {isAr ? 'دج' : 'DA'}
                  </span>
                </div>

                {/* Target progress tracker */}
                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-850 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400 font-medium">
                      {isAr ? 'حالة الطلب الحالية' : 'Current progress log'}
                    </span>
                    <span className="font-bold text-amber-400 font-sans flex items-center gap-1">
                      {getStatusIcon(ord.status)}
                      <span>{getStatusText(ord.status)}</span>
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="relative w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${ord.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
                    <span>{isAr ? 'تم الإرسال' : 'Submitted'}</span>
                    <span>{isAr ? 'تم القبول' : 'Accepted'}</span>
                    <span>{isAr ? 'في الطريق' : 'In Transit'}</span>
                    <span>{isAr ? 'وصل الكابتن' : 'Arrived'}</span>
                  </div>
                </div>

                {/* Addresses */}
                <div className="text-[11px] space-y-2 border-t border-neutral-850/50 pt-2 text-neutral-300 font-sans">
                  <div className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">●</span>
                    <div>
                      <span className="text-[10px] text-neutral-500 block leading-tight">{isAr ? 'نقطة الانطلاق / المتجر' : 'Startup Address'}</span>
                      <span className="font-medium line-clamp-1">{isAr ? ord.pickupAddress : ord.pickupAddressEn}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">●</span>
                    <div>
                      <span className="text-[10px] text-neutral-500 block leading-tight">{isAr ? 'وجهة التوصيل' : 'Delivery Destination'}</span>
                      <span className="font-medium line-clamp-1">{isAr ? ord.deliveryAddress : ord.deliveryAddressEn}</span>
                    </div>
                  </div>
                </div>

                {/* Courier Info / Captain assigned */}
                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-400 text-black h-8 w-8 rounded-full flex items-center justify-center text-md font-bold text-center">
                      🧑‍✈️
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-neutral-500 block leading-none">{isAr ? 'الكابتن المخصص' : 'Courier Pilot'}</span>
                      <span className="text-xs font-bold text-neutral-200 mt-1 block">{ord.driverName || (isAr ? 'حمزة بن يوسف' : 'Hamza Benyoussef')}</span>
                    </div>
                  </div>

                  <div className="text-right font-mono flex flex-col items-end">
                    <span className="text-[9px] text-neutral-500 leading-none">{isAr ? 'الوصول المتوقع' : 'Estimated Time'}</span>
                    <span className="text-xs font-bold text-amber-400 mt-1 block">{ord.eta || '12 min'}</span>
                  </div>
                </div>

                {/* Actions */}
                {ord.status === 'pending' && onCancelOrder && (
                  <button
                    onClick={() => onCancelOrder(ord.id)}
                    className="w-full text-center text-xs py-2 bg-neutral-950 border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer rounded-lg transition-colors font-medium active:scale-95"
                  >
                    {isAr ? 'إلغاء الطلب فوراً' : 'Cancel Request Immediately'}
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Previous History Section */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-neutral-400 px-1 border-r-2 border-neutral-700 pr-1.5 font-sans">
            {isAr ? 'سجل الطلبات السابقة' : 'Past Order Histories'}
          </h4>

          {pastOrders.map((ord) => (
            <div key={ord.id} className="bg-neutral-900/60 border border-neutral-850 rounded-xl p-3 flex justify-between items-center text-xs opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {ord.category === 'ride' ? '🚕' : ord.category === 'parcel' ? '📦' : ord.category === 'grocery' ? '🛒' : '🍔'}
                </span>
                <div>
                  <h5 className="font-bold text-neutral-250 uppercase font-mono">{ord.id}</h5>
                  <span className="text-[9px] text-neutral-500 block leading-normal mt-0.5">
                    {isAr ? ord.storeName : ord.storeNameEn} • {ord.date}
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="font-bold text-neutral-200 font-mono">
                  {ord.cost} {isAr ? 'دج' : 'DA'}
                </span>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full mt-1 uppercase ${ord.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-neutral-500 border border-neutral-700'}`}>
                  {isAr ? (ord.status === 'delivered' ? 'مكتمل' : 'ملغي') : ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
