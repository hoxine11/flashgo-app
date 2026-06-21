import { ArrowLeft,ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface Props {
  lang: 'ar' | 'en';
  onContinue: (types: string[]) => void;
  onBack: () => void;
}

export default function CaptainPreferences({
  lang,
  onContinue,
  onBack
}: Props) {

  const isAr = lang === 'ar';

  const [selected, setSelected] = useState<string[]>([]);

const options = [
  {
    id: 'food',
    image: '/image/food-removebg-preview.png',
    title: isAr
      ? 'توصيل الطعام'
      : 'Food Delivery'
  },

  {
    id: 'parcel',
    image: '/image/torod-removebg-preview.png',
    title: isAr
      ? 'توصيل الطرود'
      : 'Parcel Delivery'
  },

  {
    id: 'grocery',
    image: '/image/alimentation-removebg-preview.png',
    title: isAr
      ? 'التسوق للزبون'
      : 'Grocery Shopping'
  },

  {
    id: 'ride',
    image: '/image/zabon-removebg-preview.png',
    title: isAr
      ? 'نقل الزبائن'
      : 'Ride Service'
  }
];

  const toggleType = (id: string) => {

    if (selected.includes(id)) {
      setSelected(
        selected.filter(x => x !== id)
      );
    } else {
      setSelected([...selected, id]);
    }

  };

  return (
    <div className="p-6 text-white">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="
      p-2
      rounded-xl
      bg-neutral-900
      hover:bg-neutral-800
      transition-all
    "
        >
          {isAr ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            <ArrowLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      <h1 className="text-2xl font-black text-center mb-2">
        {isAr
          ? 'اختر أنواع التوصيل'
          : 'Choose Delivery Types'}
      </h1>

      <p className="text-center text-neutral-500 mb-8">
        {isAr
          ? 'ستظهر لك الطلبات حسب اختياراتك'
          : 'Orders will be prioritized based on your preferences'}
      </p>

      <div className="grid grid-cols-2 gap-4">

        {options.map((item) => (

          <button
            key={item.id}
            onClick={() =>
              toggleType(item.id)
            }
            className={`
              p-5
              rounded-3xl
              transition-all

              ${selected.includes(item.id)
                ? 'bg-amber-400 text-black'
                : 'bg-neutral-950'
              }
            `}
          >

            <div className="flex justify-center mb-4">

              <img
                src={item.image}
                alt={item.title}
                className="
      w-20
      h-20
      object-contain
    "
              />

            </div>

            <div className="font-bold">
              {item.title}
            </div>

          </button>

        ))}

      </div>

      <button
        disabled={selected.length === 0}
        onClick={() =>
          onContinue(selected)
        }
        className={`
          mt-8
          w-full
          py-4
          rounded-2xl
          font-black

          ${selected.length
            ? 'bg-amber-400 text-black'
            : 'bg-neutral-800 text-neutral-500'
          }
        `}
      >
        {isAr ? 'متابعة' : 'Continue'}
      </button>

    </div>
  );
}