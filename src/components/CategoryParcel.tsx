import { useState } from 'react';

import {
  ArrowLeft,
  MapPin,
  Sparkles,
  Check,
  Package,
  Weight,
  HelpCircle,
  Camera,
  Upload,
} from 'lucide-react';

import { Order, UserProfile } from '../types';

interface CategoryParcelProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onSubmitOrder: (order: Partial<Order>) => void;
  user: UserProfile;
}

const PARCEL_TYPES = [{ id: 'document', name: 'وثائق ومستندات', nameEn: 'Documents & Papers', image: '../image/image.png', cost: 150, }, { id: 'box', name: 'صندوق أو كرتون طرد', nameEn: 'Regular Box/Parcel', image: '../image/torod.png', cost: 250, }, { id: 'fragile', name: 'مواد قابلة للكسر', nameEn: 'Fragile Glassware/Device', image: '../image/vers.png', cost: 350, }, { id: 'food', name: 'مأكولات جاهزة مجمدة', nameEn: 'Food/Meal Shipment', image: '../image/glasson.jpg', cost: 200, },];


export default function CategoryParcel({ lang, onBack, onSubmitOrder, user }: CategoryParcelProps) {
  const isAr = lang === 'ar';

  // State
  const [pickupAddr, setPickupAddr] = useState('');
  const [deliveryAddr, setDeliveryAddr] = useState('');
  const [parcelType, setParcelType] = useState('box');
  const [weight, setWeight] = useState(2); // standard 2kg
  const [notes, setNotes] = useState('');

  const [parcelPhoto, setParcelPhoto] =
    useState<string | null>(null);


  const [pickupFocused, setPickupFocused] = useState(false);
  const [deliveryFocused, setDeliveryFocused] = useState(false);

  const selectedTypeObj = PARCEL_TYPES.find(p => p.id === parcelType) || PARCEL_TYPES[1];

  // Calculate price dynamically
  const calculatePrice = () => {
    if (!pickupAddr || !deliveryAddr) return 0;
    const baseCost = selectedTypeObj.cost;
    const weightSurcharge = Math.max(0, (weight - 2) * 30); // 30 DA per kg over 2kg
    return Math.round(baseCost + weightSurcharge);
  };

  const cost = calculatePrice();

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setParcelPhoto(imageUrl);
  };


  const handleOrder = () => {
    if (!pickupAddr || !deliveryAddr) {
      alert(isAr ? 'الرجاء تعبئة عنوان الاستلام وعنوان التسليم!' : 'Please specify both pickup and delivery addresses!');
      return;
    }

    const newOrder: Partial<Order> = {
      category: 'parcel',
      pickupAddress: pickupAddr,
      pickupAddressEn: pickupAddr,
      deliveryAddress: deliveryAddr,
      deliveryAddressEn: deliveryAddr,
      cost: cost || 25,
      storeName: `خدمة شحن ${selectedTypeObj.name}`,
      storeNameEn: `Parcel Courier: ${selectedTypeObj.nameEn}`,
    };

    onSubmitOrder(newOrder);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-neutral-900/80 backdrop-blur-md px-4 py-3 border-b border-neutral-800 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onBack} className="p-1 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer">
          <ArrowLeft className={`h-5 w-5 ${isAr ? '' : 'rotate-180'}`} />
        </button>
        <div className="text-center flex-1">
          <h3 className="font-bold text-sm tracking-tight text-white">
            {isAr ? 'توصيل الطرود' : 'Parcel Delivery'}
          </h3>
          <p className="text-[10px] text-amber-400">
            {isAr ? 'نوصل طرودك بسرعة وأمان' : 'Send envelopes & packages instantly'}
          </p>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto pb-4 space-y-4 px-3">
        {/* Animated Cargo Box Illustration */}
        <div className="mt-2 h-36 rounded-2xl border border-neutral-800 relative overflow-hidden bg-neutral-950">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950"></div>

          {/* Image */}
          <img
            src="/image/torod.png"
            alt="Parcel Box"
            className="
      w-full
      h-full
      object-contain
      object-center
      p-2
      brightness-95
      contrast-110
      saturate-105
    "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

          {/* Top indicators */}
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300"></span>
          </div>

        </div>

        {/* Form addresses inputs */}
        <div className="space-y-3">
          {/* Pickup address input */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 relative">
            <label className="text-[10px] text-neutral-400 font-medium block mb-1">
              {isAr ? 'عنوان الاستلام' : 'Pickup Address'}
            </label>
            <div className={`flex items-center gap-2 bg-neutral-950 px-2.5 py-2 rounded-lg border transition-colors ${pickupFocused ? 'border-amber-400/50' : 'border-neutral-800'}`}>
              <MapPin className="h-4 w-4 text-amber-500" />
              <input
                type="text"
                placeholder={isAr ? 'أدخل عنوان الاستلام بالتفصيل' : 'Enter specific pickup address'}
                value={pickupAddr}
                onChange={(e) => setPickupAddr(e.target.value)}
                onFocus={() => setPickupFocused(true)}
                onBlur={() => setPickupFocused(false)}
                className="bg-transparent text-xs text-neutral-200 outline-none w-full placeholder-neutral-550 border-none p-0 focus:ring-0"
              />
            </div>
            {/* Presets buttons */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setPickupAddr(isAr ? 'برج المملكة - العليا' : 'Kingdom Center Tower, Al Olaya')}
                className="text-[9px] bg-neutral-950 px-2 py-1 text-amber-400 border border-neutral-800 rounded hover:bg-neutral-800/20 active:scale-95 transition-transform"
              >
                📍 {isAr ? 'موقعي الحالي' : 'My Current Location'}
              </button>
            </div>
          </div>

          {/* Delivery address input */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3">
            <label className="text-[10px] text-neutral-400 font-medium block mb-1">
              {isAr ? 'عنوان التسليم' : 'Delivery Destination Address'}
            </label>
            <div className={`flex items-center gap-2 bg-neutral-950 px-2.5 py-2 rounded-lg border transition-colors ${deliveryFocused ? 'border-amber-400/50' : 'border-neutral-800'}`}>
              <MapPin className="h-4 w-4 text-emerald-500" />
              <input
                type="text"
                placeholder={isAr ? 'أدخل عنوان ومستلم الطرد' : 'Enter shipping destination and contact name'}
                value={deliveryAddr}
                onChange={(e) => setDeliveryAddr(e.target.value)}
                onFocus={() => setDeliveryFocused(true)}
                onBlur={() => setDeliveryFocused(false)}
                className="bg-transparent text-xs text-neutral-200 outline-none w-full placeholder-neutral-550 border-none p-0 focus:ring-0"
              />
            </div>
            {/* Presets */}
            <div className="flex gap-2 mt-1.5">
              <button
                onClick={() => setDeliveryAddr(isAr ? 'مكتب البريد المركزي، الجزائر وسط' : 'Grande Poste, Algiers Center')}
                className="text-[9px] bg-neutral-950 px-2 py-0.5 text-neutral-400 border border-neutral-800 rounded hover:bg-neutral-800/20 transition-all font-mono"
              >
                + {isAr ? 'البريد المركزي' : 'Grande Poste'}
              </button>
              <button
                onClick={() => setDeliveryAddr(isAr ? 'مستشفى مصطفى باشا الجامعي' : 'Mustapha Pacha Hospital')}
                className="text-[9px] bg-neutral-950 px-2 py-0.5 text-neutral-400 border border-neutral-800 rounded hover:bg-neutral-800/20 transition-all font-mono"
              >
                + {isAr ? 'مستشفى مصطفى باشا' : 'Mustapha Pacha'}
              </button>
            </div>
          </div>
        </div>

        {/* Parcel Details selection */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold pb-1.5 border-b border-neutral-800/30">
            <Package className="h-4 w-4 text-amber-400" />
            <span>{isAr ? 'نوع وتفاصيل الشحنة' : 'Shipment Type & Features'}</span>
          </div>

          {/* Grid types */}
          <div className="grid grid-cols-2 gap-2">
            {PARCEL_TYPES.map((type) => (
              <div
                key={type.id}
                onClick={() => setParcelType(type.id)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center relative ${parcelType === type.id ? 'bg-amber-400/10 border-amber-400' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
              >
                <img src={type.image} alt={type.name} className=" h-14 w-14 object-contain " />
                <span className="text-[10px] font-bold text-neutral-200">{isAr ? type.name : type.nameEn}</span>
                {parcelType === type.id && (
                  <span className="absolute top-1 right-1 bg-amber-400 text-black p-0.5 rounded-full">
                    <Check className="h-2 w-2 stroke-[4]" />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Parcel Photo Upload */}

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-xs font-semibold">

              <Camera className="h-4 w-4 text-amber-400" />

              <span>
                {isAr
                  ? 'صورة الطرد'
                  : 'Parcel Photo'}
              </span>

            </div>

            <label
              className="
      border-2
      border-dashed
      border-neutral-700
      hover:border-amber-400/50
      rounded-2xl
      p-4
      flex
      flex-col
      items-center
      justify-center
      gap-3
      bg-neutral-950
      cursor-pointer
      transition-all
    "
            >

              {parcelPhoto ? (

                <img
                  src={parcelPhoto}
                  alt="Parcel"
                  className="
          w-full
          h-40
          object-cover
          rounded-xl
        "
                />

              ) : (

                <>
                  <div
                    className="
            w-14
            h-14
            rounded-full
            bg-amber-400/10
            flex
            items-center
            justify-center
          "
                  >
                    <Upload className="h-6 w-6 text-amber-400" />
                  </div>

                  <div className="text-center">

                    <p className="text-sm font-bold text-white">

                      {isAr
                        ? 'التقط أو ارفع صورة للطرد'
                        : 'Take or Upload Parcel Photo'}

                    </p>

                    <p className="text-[10px] text-neutral-500 mt-1">

                      {isAr
                        ? 'لضمان سلامة عملية التوصيل'
                        : 'Helps drivers identify your shipment'}

                    </p>

                  </div>
                </>

              )}

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />

            </label>

          </div>

          {/* Weight slider with custom indicator */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1">
                <Weight className="h-3.5 w-3.5 text-neutral-500" />
                <span>{isAr ? 'الوزن التقريبي' : 'Approximate Weight'}</span>
              </div>
              <span className="font-bold text-amber-400 font-mono">{weight} {isAr ? 'كجم' : 'kg'}</span>
            </div>

            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-amber-400 bg-neutral-950 h-2 rounded-lg cursor-pointer appearance-none outline-none"
            />
            <div className="flex justify-between text-[8px] text-neutral-500 font-mono">
              <span>1kg</span>
              <span>5kg</span>
              <span>10kg</span>
              <span>15kg</span>
              <span>20kg (Max)</span>
            </div>
          </div>

          {/* Notes (Melahazat) */}
          <div className="space-y-1">
            <label className="text-[10px] text-neutral-400 font-medium">{isAr ? 'ملاحظات وتوجيهات للكابتن طرود' : 'Agent Courier Notes'}</label>
            <textarea
              rows={2}
              placeholder={isAr ? 'مثال: يرجى الاتصال بالمستلم عند الوصول، الطرد هش وقابل للكسر...' : 'Ex: Handle with care, ring doorbell, call receiver...'}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 rounded-lg w-full text-xs p-2 outline-none text-neutral-200 focus:border-amber-400/50 resize-none font-sans"
            />
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-neutral-900 border-t border-neutral-800 p-4 sticky bottom-0 z-20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-neutral-400">{isAr ? 'التسعيرة الكلية بناءً على الوزن' : 'Allocated Cargo Rate'}</span>
            <span className="text-lg font-black text-amber-400 font-mono">
              {pickupAddr && deliveryAddr ? `${cost} ${isAr ? 'دج' : 'DA'}` : `--`}
            </span>
          </div>
          <div className="text-[10px] text-neutral-450 border border-neutral-800 rounded px-2 py-0.5 bg-neutral-950 font-mono">
            {isAr ? 'تأمين مجاني فلاش' : 'Free Cargo Shield'}
          </div>
        </div>

        <button
          onClick={handleOrder}
          disabled={!pickupAddr || !deliveryAddr}
          className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase cursor-pointer transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 ${pickupAddr && deliveryAddr ? 'bg-amber-400 hover:bg-amber-500 text-black shadow-md shadow-amber-400/10' : 'bg-neutral-850 text-neutral-600 border border-neutral-800 cursor-not-allowed'}`}
        >
          <span>{isAr ? 'تأكيد طلب الشحن' : 'Confirm Parcel Shipment'}</span>
        </button>
      </div>
    </div>
  );
}
