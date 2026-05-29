import {
  Truck,
  Store,
  Utensils,
  Pill,
  ShoppingCart,
  MoreHorizontal
} from 'lucide-react';

interface Props {
  lang: 'ar' | 'en';
  onNext: () => void;
}

export default function BusinessTypeSelection({
  lang,
  onNext,
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

  return (
    <div className="p-6 text-white">

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
              className="
                bg-neutral-900
                border
                border-neutral-800
                rounded-2xl
                p-4
                text-center
                hover:border-amber-400
              "
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
        onClick={onNext}
        className="
          mt-6
          w-full
          bg-amber-400
          text-black
          py-4
          rounded-xl
          font-bold
        "
      >
        {isAr ? 'التالي' : 'Next'}
      </button>

    </div>
  );
}