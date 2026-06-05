import FeaturesSection from './featuresection';
import { useState } from 'react';
import {
  Store,
  ShoppingCart,
  Check,
  ArrowLeft
} from 'lucide-react';

interface GroceryServiceSelectionProps {
  lang: 'ar' | 'en';
  onNext: (type: 'store' | 'personal') => void;
  onBack: () => void;
}

export default function GroceryServiceSelection({
  lang,
  onNext,
  onBack,
}: GroceryServiceSelectionProps) {
  const isAr = lang === 'ar';

  const [selectedType, setSelectedType] = useState<
    'store' | 'personal'
  >('personal');

  return (
    <div
      className="flex flex-col min-h-screen bg-neutral-950 text-white p-4"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      {/* Header */}
<div className="flex items-center mb-6">

  <button
    onClick={onBack}
    className="
      p-2
      rounded-xl
      bg-transparent
    
      hover:border-amber-400
      transition
    "
  >
    <ArrowLeft
      className={`h-5 w-5 ${
        isAr ? '' : 'rotate-180'
      }`}
    />
  </button>

  <div className="flex-1 text-center">
    <h1 className="text-xl font-black text-white">
      {isAr
        ? 'خدمة قضاء الحاجيات بالنيابة'
        : 'Personal Shopping Service'}
    </h1>

    <p className="text-xs text-neutral-400 mt-1">
      {isAr
        ? 'أرسل قائمتك وسنتكفل بشرائها وتوصيلها إليك'
        : 'Send your shopping list and we will buy and deliver it'}
    </p>
  </div>

  <div className="w-10" />
</div>

      {/* Option 1 */}
      <div
        onClick={() => setSelectedType('store')}
        className={`relative p-4 rounded-2xl border cursor-pointer transition-all mb-4 ${selectedType === 'store'
            ? 'border-amber-400 bg-amber-400/10'
            : 'border-neutral-800 bg-neutral-900'
          }`}
      >
        {selectedType === 'store' && (
          <div className="absolute top-3 left-3">
            <Check className="h-5 w-5 text-amber-400" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <Store className="h-10 w-10 text-amber-400" />

          <div>
            <h3 className="font-bold">
              {isAr
                ? 'الطلب من متجر'
                : 'Order From Store'}
            </h3>

            <p className="text-xs text-neutral-400">
              {isAr
                ? 'اختر متجراً من قائمتنا واطلب حاجياتك'
                : 'Choose a store and order products'}
            </p>
          </div>
        </div>
      </div>

      {/* Option 2 */}
      <div
        onClick={() => setSelectedType('personal')}
        className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${selectedType === 'personal'
            ? 'border-amber-400 bg-amber-400/10'
            : 'border-neutral-800 bg-neutral-900'
          }`}
      >
        {selectedType === 'personal' && (
          <div className="absolute top-3 left-3">
            <Check className="h-5 w-5 text-amber-400" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <ShoppingCart className="h-10 w-10 text-amber-400" />

          <div>
            <h3 className="font-bold">
              {isAr
                ? 'عامل مشتريات شخصي'
                : 'Personal Shopper'}
            </h3>

            <p className="text-xs text-neutral-400">
              {isAr
                ? 'أرسل قائمتك وسيتكفل عاملنا بشرائها'
                : 'Our shopper will buy everything for you'}
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
    {/* Features */}
<div className="mt-6">
  <FeaturesSection />
</div>
      {/* Next Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={() => {
            console.log("BUTTON CLICKED");
            console.log(selectedType);

            onNext(selectedType);
          }}
          className="w-full bg-amber-400 text-black py-4 rounded-xl font-black"
        >
          {isAr ? 'التالي' : 'Next'}
        </button>
      </div>
    </div>
  );
}