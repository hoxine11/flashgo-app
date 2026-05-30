import {
  Truck,
  Store,
  Utensils,
  Pill,
  ShoppingCart,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
interface Props {
  lang: 'ar' | 'en';
  onNext: (type: string) => void;
  onBack: () => void;
}

export default function BusinessTypeSelection({
  lang,
  onNext,
  onBack,
}: Props) {

  const isAr = lang === 'ar';

  const items = [
    {
      icon: Truck,
      title: 'Delivery Company',
      desc: 'Provide delivery services',
    },
    {
      icon: Store,
      title: 'Store / Shop',
      desc: 'Sell products',
    },
    {
      icon: Utensils,
      title: 'Restaurant',
      desc: 'Food & Beverage',
    },
    {
      icon: Pill,
      title: 'Pharmacy',
      desc: 'Healthcare',
    },
    {
      icon: ShoppingCart,
      title: 'Supermarket',
      desc: 'Groceries',
    },
    {
      icon: MoreHorizontal,
      title: 'Other',
      desc: 'Other business',
    },
  ];
const [selectedType, setSelectedType] = useState('');
  return (
  <div className="p-6 text-white">

    <div className="mb-6">
      <button
        onClick={onBack}
        className="text-white hover:text-amber-400 transition-colors"
      >
        <ArrowLeft size={28} />
      </button>
    </div>

    <h2 className="text-center text-2xl font-bold mb-2">
      {isAr
        ? 'اختيار نوع النشاط'
        : 'Select Business Type'}
    </h2>

      <p className="text-center text-neutral-500 mb-6">
        {isAr
          ? 'اختر النشاط المناسب'
          : 'Choose your business category'}
      </p>

      <div className="grid grid-cols-2 gap-4">

        {items.map((item, i) => {

          const Icon = item.icon;

          return (
           <button
  key={i}
  onClick={() => setSelectedType(item.title)}
  className={`
    rounded-2xl
    p-4
    text-center
    border
    transition-all

    ${
      selectedType === item.title
        ? 'border-amber-400 bg-amber-400/10'
        : 'border-neutral-800 bg-neutral-900'
    }
  `}
>
              <Icon className="mx-auto mb-3 text-amber-400" />

              <div className="font-bold text-sm">
                {item.title}
              </div>

              <div className="text-xs text-neutral-500 mt-2">
                {item.desc}
              </div>

            </button>
          );
        })}
      </div>

      <button
  disabled={!selectedType}
  onClick={() => onNext(selectedType)}
  className={`
    mt-6
    w-full
    py-4
    rounded-xl
    font-bold

    ${
      selectedType
        ? 'bg-amber-400 text-black'
        : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
    }
  `}
>
  {isAr ? 'التالي' : 'Next'}
</button>

    </div>
  );
}