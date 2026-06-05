const features = [
  {
    text: 'شراء من أي مكان تريده',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#d4a017" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    text: 'تواصل مع العامل عند الحاجة',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#d4a017" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.56 21 3 13.44 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
  },
  {
    text: 'صور للمنتجات قبل الشراء',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#d4a017" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    text: 'توصيل سريع وآمن',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#d4a017" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <div
      className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5"
      dir="rtl"
      style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}
    >
      {/* Title */}
      <h3 className="text-center text-sm font-black text-white mb-5 tracking-wide">
        مميزات الخدمة
      </h3>

      {/* Feature List */}
      <div className="flex flex-col gap-0">
        {features.map((f, i) => (
          <div key={i}>
            <div className="flex items-center justify-end gap-3 py-3">
              {/* Text */}
              <span className="text-sm font-semibold text-neutral-200 text-right">
                {f.text}
              </span>

              {/* Icon circle */}
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(212,160,23,0.08)',
                  border: '1.5px solid rgba(212,160,23,0.4)',
                  boxShadow: '0 0 10px rgba(212,160,23,0.1)',
                }}
              >
                {f.icon}
              </div>
            </div>

            {/* Divider — not after last item */}
            {i < features.length - 1 && (
              <div className="h-px bg-neutral-800" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}