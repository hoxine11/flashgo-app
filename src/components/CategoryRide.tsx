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
        src="/image/maps-removebg-preview.png"
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
       
{/* Destination Field */}
<div className="relative">

  <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden focus-within:border-emerald-400/50 transition-all">

    <MapPin className="h-4 w-4 text-emerald-400 absolute start-4" />

    <input
      type="text"
      value={destination}
      onChange={(e) => {
        setDestination(e.target.value);
        setShowDestDropdown(true);
      }}
      placeholder={
        isAr
          ? 'إلى أين تريد الذهاب؟'
          : 'Where to?'
      }
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

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(

          (position) => {

            const lat =
              position.coords.latitude;

            const lng =
              position.coords.longitude;

            setDestination(
              `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
            );

            window.open(
              `https://www.google.com/maps?q=${lat},${lng}`,
              '_blank'
            );

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
        src="/image/maps-removebg-preview.png"
        alt="Maps"
        className="w-6 h-6 object-contain"
      />
    </button>

  </div>

  {/* DESTINATION SUGGESTIONS */}
  {showDestDropdown &&
    destination.length > 0 && (

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

      {DESTINATION_LOCATIONS_AR
        .filter((loc) =>
          loc.name
            .toLowerCase()
            .includes(destination.toLowerCase())
        )
        .map((opt) => (

          <button
            key={opt.name}
            onClick={() => {

              setDestination(opt.name);

              setDestinationEn(opt.nameEn);

              setShowDestDropdown(false);

              handleSelectDest(opt);

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

            <div className="flex-1">

              <p className="text-sm text-white font-medium">
                {isAr
                  ? opt.name
                  : opt.nameEn}
              </p>

              <p className="text-[11px] text-amber-400 font-mono">
                {opt.cost} DA
              </p>

            </div>

          </button>

      ))}

    </div>

  )}

</div>


       
{/* Delivery Speed Options */}
<div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-3">

  <div className="flex items-center gap-2 mb-3">
    <Sparkles className="h-4 w-4 text-amber-400" />

    <span className="text-xs font-bold text-neutral-200">
      {isAr
        ? 'نوع التوصيل'
        : 'Delivery Type'}
    </span>
  </div>

  <div className="space-y-2">

    {/* NORMAL */}
    <div
      onClick={() => {
        setServiceTier('eco');

        const selectedDestObj =
          DESTINATION_LOCATIONS_AR.find(
            d => d.name === destination
          );

        const baseCost =
          selectedDestObj
            ? selectedDestObj.cost
            : 25;

        setCost(baseCost);
      }}
      className={`
        flex
        items-center
        justify-between
        px-4
        py-3
        rounded-2xl
        border
        cursor-pointer
        transition-all
        ${
          serviceTier === 'eco'
            ? 'border-amber-400/50 bg-amber-400/10'
            : 'border-neutral-800 bg-neutral-950'
        }
      `}
    >

      <div className="flex items-center gap-3">

        
<img
  src="/image/fast-removebg-preview.png"
  alt="Urgent Delivery"
  className="
    w-14
    h-14
    object-contain
    drop-shadow-[0_0_12px_rgba(239,68,68,0.35)]
  "
/>



        <div>
          <p className="text-sm font-bold text-white">
            {isAr
              ? 'توصيل عادي'
              : 'Normal Delivery'}
          </p>

          <p className="text-[11px] text-neutral-500">
            {isAr
              ? 'توصيل اقتصادي'
              : 'Affordable ride'}
          </p>
        </div>

      </div>

      <span className="text-xs font-bold text-amber-400">
        1x
      </span>

    </div>

    {/* URGENT */}
    <div
      onClick={() => {

        setServiceTier('vip');

        const selectedDestObj =
          DESTINATION_LOCATIONS_AR.find(
            d => d.name === destination
          );

        const baseCost =
          selectedDestObj
            ? selectedDestObj.cost
            : 25;

        setCost(
          Math.round(baseCost * 1.5)
        );

      }}
      className={`
        flex
        items-center
        justify-between
        px-4
        py-3
        rounded-2xl
        border
        cursor-pointer
        transition-all
        ${
          serviceTier === 'vip'
            ? 'border-red-500/50 bg-red-500/10'
            : 'border-neutral-800 bg-neutral-950'
        }
      `}
    >

      <div className="flex items-center gap-3">

       
<img
  src="/image/normal-removebg-preview.png"
  alt="Normal Delivery"
  className="
    w-14
    h-14
    object-contain
    drop-shadow-[0_0_10px_rgba(250,204,21,0.25)]
  "
/>


        <div>
          <p className="text-sm font-bold text-white">
            {isAr
              ? 'توصيل مستعجل'
              : 'Urgent Delivery'}
          </p>

          <p className="text-[11px] text-neutral-500">
            {isAr
              ? 'أولوية وسرعة أكبر'
              : 'Priority fast delivery'}
          </p>
        </div>

      </div>

      <span className="text-xs font-bold text-red-400">
        1.5x
      </span>

    </div>

  </div>

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