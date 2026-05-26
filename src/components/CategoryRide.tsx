import { useState } from 'react';
import { ArrowLeft, MapPin, ChevronDown, Check, Sparkles } from 'lucide-react';
import { Order, UserProfile } from '../types';

interface CategoryRideProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onSubmitOrder: (order: Partial<Order>) => void;
  user: UserProfile;
}

const PRESET_LOCATIONS_AR = [
  { name: 'موقعي الحالي (ديدوش مراد)', lat: 36.7624, lng: 3.0560 },
  { name: 'مطار هواري بومدين الدولي', lat: 36.6917, lng: 3.2155 },
  { name: 'مقام الشهيد، المدنية', lat: 36.7431, lng: 3.0641 },
  { name: 'حديقة التسلية بن عكنون', lat: 36.7324, lng: 3.0189 },
];

const PRESET_LOCATIONS_EN = [
  { name: 'My Current Location (Didouche Mourad)', lat: 36.7624, lng: 3.0560 },
  { name: 'Houari Boumediene International Airport', lat: 36.6917, lng: 3.2155 },
  { name: 'Martyrs\' Memorial, El Madania', lat: 36.7431, lng: 3.0641 },
  { name: 'Ben Aknoun Amusement Park', lat: 36.7324, lng: 3.0189 },
];

const DESTINATION_LOCATIONS_AR = [
  { name: 'رياض الفتح - المدنية', nameEn: 'Riad El Feth - El Madania', cost: 350 },
  { name: 'حي حيدرة - ساحة القدس', nameEn: 'Hydra District - Jerusalem Square', cost: 280 },
  { name: 'باب الزوار - المركز التجاري', nameEn: 'Bab Ezzouar - Commercial Center', cost: 500 },
  { name: 'وسط المدينة - البريد المركزي', nameEn: 'Downtown - Grande Poste', cost: 400 },
];

export default function CategoryRide({ lang, onBack, onSubmitOrder, user }: CategoryRideProps) {
  const isAr = lang === 'ar';

  const [pickup, setPickup] = useState(isAr ? PRESET_LOCATIONS_AR[0].name : PRESET_LOCATIONS_EN[0].name);
  const [destination, setDestination] = useState('');
  const [destinationEn, setDestinationEn] = useState('');
  const [cost, setCost] = useState(25);
  const [serviceTier, setServiceTier] = useState<'eco' | 'comfort' | 'vip'>('eco');
  const [showPickupDropdown, setShowPickupDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const pickupOptions = isAr ? PRESET_LOCATIONS_AR : PRESET_LOCATIONS_EN;

  const handleSelectDest = (dest: typeof DESTINATION_LOCATIONS_AR[0]) => {
    setDestination(dest.name);
    setDestinationEn(dest.nameEn);
    const baseCost = dest.cost;
    let multiplier = 1;
    if (serviceTier === 'comfort') multiplier = 1.35;
    if (serviceTier === 'vip') multiplier = 1.85;
    setCost(Math.round(baseCost * multiplier));
    setShowDestDropdown(false);
  };

  const handleTierChange = (tier: 'eco' | 'comfort' | 'vip') => {
    setServiceTier(tier);
    const selectedDestObj = DESTINATION_LOCATIONS_AR.find(d => d.name === destination);
    const baseCost = selectedDestObj ? selectedDestObj.cost : 25;
    let multiplier = 1;
    if (tier === 'comfort') multiplier = 1.35;
    if (tier === 'vip') multiplier = 1.85;
    setCost(Math.round(baseCost * multiplier));
  };

  const handleOrder = () => {
    if (!destination) {
      alert(isAr ? 'الرجاء اختيار الوجهة أولاً!' : 'Please pick a destination first!');
      return;
    }
    onSubmitOrder({
      category: 'ride',
      pickupAddress: pickup,
      pickupAddressEn: isAr ? 'My Current Location' : pickup,
      deliveryAddress: destination,
      deliveryAddressEn: destinationEn || destination,
      cost,
      storeName: serviceTier === 'vip' ? 'Flash VIP Luxury' : serviceTier === 'comfort' ? 'Flash Comfort' : 'Flash Eco',
      storeNameEn: serviceTier === 'vip' ? 'Flash VIP' : serviceTier === 'comfort' ? 'Flash Premium' : 'Flash Eco',
    });
  };

  return (
    <div className="flex flex-col h-full text-white bg-neutral-950 font-sans" dir={isAr ? 'rtl' : 'ltr'}>

      {/* Hero Image — full bleed, no header bar */}
      <div className="relative w-full h-52 flex-shrink-0 overflow-hidden">
        <img
          src="/image/rider.png"
          alt="Ride"
          className="w-full h-full object-cover object-[center_25%] brightness-75"
        />
        {/* Dark gradient bottom fade into form area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-neutral-950" />

        {/* Back button overlaid on image */}
        <button
          onClick={onBack}
          className="absolute top-4 start-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className={`h-4 w-4 text-white ${isAr ? 'rotate-180' : ''}`} />
        </button>

        {/* Title overlaid bottom-left of image */}
        <div className="absolute bottom-4 start-4">
          <h3 className="font-black text-base text-white leading-tight">
            {isAr ? 'توصيل الزبون' : 'Ride Hailing'}
          </h3>
          <p className="text-[10px] text-amber-400 font-medium">
            {isAr ? 'نوصلك إلى وجهتك بأمان وسرعة' : 'Safe & fast rides across Algiers'}
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4 space-y-3">

      
{/* Pickup Field */}
<div className="relative">

  <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden focus-within:border-amber-400/50 transition-all">

    <MapPin className="h-4 w-4 text-amber-400 absolute start-4" />

    <input
      type="text"
      value={pickup}
      onChange={(e) => {
        setPickup(e.target.value);
        setShowPickupDropdown(true);
      }}
      placeholder={isAr ? 'أدخل نقطة الانطلاق' : 'Enter pickup location'}
      className="
        w-full
        bg-transparent
        text-sm
        text-white
        placeholder:text-neutral-500
        py-4
        ps-11
        pe-16
        outline-none
      "
    />

    {/* MAP BUTTON */}
    <button
     

onClick={() => {

  if (!navigator.geolocation) {

    alert(
      isAr
        ? 'المتصفح لا يدعم GPS'
        : 'Geolocation is not supported'
    );

    return;
  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('LAT:', lat);
      console.log('LNG:', lng);

      // PUT LOCATION INSIDE INPUT

      setPickup(
        `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      );

      // OPEN GOOGLE MAPS

      window.open(
        `https://www.google.com/maps?q=${lat},${lng}`,
        '_blank'
      );

    },

    (error) => {

      console.error(error);

      alert(
        isAr
          ? 'فشل الوصول للموقع'
          : 'Failed to get location'
      );

    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }

  );

}}




      className="
        absolute
        end-2
        w-10
        h-10
        rounded-xl
        bg-neutral-800
        hover:bg-neutral-700
        flex
        items-center
        justify-center
        transition-all
      "
    >
      <img
        src="/image/maps.png"
        alt="Maps"
        className="w-6 h-6 object-contain"
      />
    </button>

  </div>

  {/* SUGGESTIONS */}
  {showPickupDropdown && pickup.length > 0 && (

    <div className="
      absolute
      inset-x-0
      top-full
      mt-2
      bg-neutral-900
      border
      border-neutral-800
      rounded-2xl
      overflow-hidden
      z-50
      shadow-2xl
    ">

      {pickupOptions
        .filter((loc) =>
          loc.name
            .toLowerCase()
            .includes(pickup.toLowerCase())
        )
        .map((opt) => (

          <button
            key={opt.name}
            onClick={() => {
              setPickup(opt.name);
              setShowPickupDropdown(false);
            }}
            className="
              w-full
              px-4
              py-3
              flex
              items-center
              gap-3
              hover:bg-neutral-800
              transition-all
              text-left
            "
          >

            <MapPin className="h-4 w-4 text-neutral-500" />

            <div>
              <p className="text-sm text-white font-medium">
                {opt.name}
              </p>

              <p className="text-[11px] text-neutral-500">
                Alger, Algeria
              </p>
            </div>

          </button>

      ))}

    </div>

  )}

</div>


        {/* Destination Field */}
        <div className="relative">
          <div
            onClick={() => { setShowDestDropdown(!showDestDropdown); setShowPickupDropdown(false); }}
            className={`flex items-center gap-3 bg-neutral-900 border px-4 py-3.5 rounded-2xl cursor-pointer transition-all ${destination ? 'border-emerald-500/40' : 'border-neutral-800 hover:border-amber-400/40'}`}
          >
            <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-neutral-500 mb-0.5">
                {isAr ? 'إلى أين تريد الذهاب؟' : 'Where to?'}
              </p>
              <p className={`text-xs font-semibold truncate ${destination ? 'text-neutral-100' : 'text-neutral-500'}`}>
                {destination ? (isAr ? destination : destinationEn) : (isAr ? 'اختر الوجهة' : 'Select destination')}
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 text-neutral-500 flex-shrink-0 transition-transform ${showDestDropdown ? 'rotate-180' : ''}`} />
          </div>

          {showDestDropdown && (
            <div className="absolute inset-x-0 top-full mt-1 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-30 overflow-hidden">
              {DESTINATION_LOCATIONS_AR.map((opt) => (
                <div
                  key={opt.name}
                  onClick={() => handleSelectDest(opt)}
                  className="px-4 py-3 hover:bg-neutral-800 transition-colors cursor-pointer flex items-center justify-between border-b border-neutral-800/50 last:border-0"
                >
                  <div>
                    <p className="text-xs font-semibold text-neutral-100">{isAr ? opt.name : opt.nameEn}</p>
                    <p className="text-[10px] text-amber-400 font-mono mt-0.5">{opt.cost} {isAr ? 'دج' : 'DA'}</p>
                  </div>
                  {destination === opt.name && <Check className="h-3.5 w-3.5 text-amber-400" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Tier Accordion */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-neutral-800/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-semibold text-neutral-200">
                {isAr ? 'خيارات إضافية' : 'Service options'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Show selected tier label */}
              <span className="text-[10px] text-amber-400 font-mono font-bold">
                {serviceTier === 'eco' ? (isAr ? 'اقتصادي' : 'Eco') : serviceTier === 'comfort' ? (isAr ? 'كومفورت' : 'Comfort') : (isAr ? 'VIP' : 'VIP')}
              </span>
              <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ${showOptions ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {showOptions && (
            <div className="px-3 pb-3 space-y-2 border-t border-neutral-800">
              {[
                { key: 'eco', emoji: '🛵', label: isAr ? 'فلاش اقتصادي' : 'Flash Eco', sub: isAr ? 'دراجة سريعة' : 'Fast bike', mult: '1x' },
                { key: 'comfort', emoji: '🚗', label: isAr ? 'فلاش كومفورت' : 'Flash Comfort', sub: isAr ? 'سيارة مكيفة' : 'AC car', mult: '1.35x' },
                { key: 'vip', emoji: '👑', label: isAr ? 'فلاش VIP' : 'Flash VIP', sub: isAr ? 'رحلة فاخرة' : 'Luxury ride', mult: '1.85x' },
              ].map((tier) => (
                <div
                  key={tier.key}
                  onClick={() => handleTierChange(tier.key as 'eco' | 'comfort' | 'vip')}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all mt-2 ${serviceTier === tier.key ? 'bg-amber-400/10 border-amber-400/40' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{tier.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-neutral-100">{tier.label}</p>
                      <p className="text-[10px] text-neutral-400">{tier.sub}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">{tier.mult}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="px-4 pb-5 pt-3 bg-neutral-950 border-t border-neutral-800/60 flex-shrink-0">
        {/* Cost + wallet row */}
        {destination && (
          <div className="flex items-center justify-between mb-3 px-1">
            <div>
              <p className="text-[10px] text-neutral-500">{isAr ? 'التكلفة الإجمالية' : 'Total cost'}</p>
              <p className="text-xl font-black text-amber-400 font-mono">{cost} <span className="text-sm">{isAr ? 'دج' : 'DA'}</span></p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-neutral-500">{isAr ? 'رصيد المحفظة' : 'Wallet balance'}</p>
              <p className="text-sm font-bold text-neutral-300 font-mono">{user.balance} <span className="text-xs">{isAr ? 'دج' : 'DA'}</span></p>
            </div>
          </div>
        )}

        <button
          onClick={handleOrder}
          disabled={!destination}
          className={`w-full py-4 rounded-2xl font-black text-sm cursor-pointer transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 ${
            destination
              ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-400/20'
              : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
          }`}
        >
          {isAr ? 'تأكيد الطلب' : 'Confirm Ride'}
        </button>
      </div>
    </div>
  );
}