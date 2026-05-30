
import {
  User,
  Bike,

  ChevronRight,
  ArrowLeft,
  Briefcase,
} from 'lucide-react';

interface ChooseAccountTypeProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onSelect: (
    type:
      | 'customer'
      | 'driver'
      | 'business'
  ) => void;
}

export default function ChooseAccountType({
  lang,
  onBack,
  onSelect,
}: ChooseAccountTypeProps) {

  const isAr = lang === 'ar';

  const accountTypes = [
    {
      id: 'customer',
      icon: User,
      titleAr: 'زبون',
      titleEn: 'Customer',
      descAr:
        'اطلب توصيل، طعام، طرود وأكثر',
      descEn:
        'Book rides, order food, send parcels and more',
    },

    {
      id: 'driver',
      icon: Bike,
      titleAr: 'عامل توصيل',
      titleEn: 'Driver',
      descAr:
        'قد مع Flash Go واربح المال',
      descEn:
        'Drive with Flash Go and earn money',
    },

    {
      id: 'business',
      icon: Briefcase,

      titleAr: 'مؤسسة',

      titleEn: 'Business',

      descAr:
        'مطعم، متجر، صيدلية، سوبرماركت أو شركة توصيل',

      descEn:
        'Restaurant, Store, Pharmacy, Supermarket or Delivery Company',
    },
  ];

  return (
    <div
      className="
        min-h-screen
        bg-[#050505]
        text-white
        flex
        items-center
        justify-center
        px-5
        py-10
      "
      dir={isAr ? 'rtl' : 'ltr'}
    >

      <div
        className="
          w-full
          max-w-md
          bg-black
          border
          border-neutral-800
          rounded-[32px]
          p-6
          shadow-2xl
        "
      >

        {/* HEADER */}



        {/* TITLE */}

        <div className="mb-8 text-center">

          <h1
            className="
              text-3xl
              font-black
              mb-2
            "
          >
            {isAr
              ? 'اختر نوع الحساب'
              : 'Choose Account Type'}
          </h1>

          <p
            className="
              text-neutral-400
              text-sm
            "
          >
            {isAr
              ? 'اختر الخيار الذي يناسبك'
              : 'Select the option that describes you best'}
          </p>

        </div>

        {/* OPTIONS */}

        <div className="space-y-4">

          {accountTypes.map((item) => {

            const Icon = item.icon;

            return (

              <button
                key={item.id}
                onClick={() =>
                  onSelect(item.id as any)
                }
                className="
                  w-full
                  bg-neutral-950
                  border
                  border-neutral-800
                  rounded-2xl
                  p-5
                  flex
                  items-center
                  justify-between
                  hover:border-amber-400
                  hover:bg-neutral-900
                  transition-all
                  duration-300
                  active:scale-[0.98]
                  group
                "
              >

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-amber-400/10
                      flex
                      items-center
                      justify-center
                      border
                      border-amber-400/20
                    "
                  >
                    <Icon
                      className="
                        w-7
                        h-7
                        text-amber-400
                      "
                    />
                  </div>

                  <div className="text-left">

                    <h3
                      className="
                        text-lg
                        font-bold
                        mb-1
                      "
                    >
                      {isAr
                        ? item.titleAr
                        : item.titleEn}
                    </h3>

                    <p
                      className="
                        text-xs
                        text-neutral-400
                        max-w-[180px]
                        leading-relaxed
                      "
                    >
                      {isAr
                        ? item.descAr
                        : item.descEn}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <ChevronRight
                  className="
                    w-5
                    h-5
                    text-neutral-500
                    group-hover:text-amber-400
                    transition-all
                  "
                />

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}
