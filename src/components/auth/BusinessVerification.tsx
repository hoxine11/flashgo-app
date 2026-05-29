import {
  FileText,
  Building2,
  Image,
  Plus,
} from 'lucide-react';

interface Props {
  lang: 'ar' | 'en';
  onSubmit: () => void;
}

export default function BusinessVerification({
  lang,
  onSubmit,
}: Props) {

  const isAr = lang === 'ar';

  const documents = [
    {
      title: isAr
        ? 'السجل التجاري'
        : 'Commercial Register',
      icon: FileText,
    },
    {
      title: isAr
        ? 'الرقم الجبائي'
        : 'Tax Identification Number',
      icon: Building2,
    },
    {
      title: isAr
        ? 'رخصة النشاط'
        : 'Business License',
      icon: FileText,
    },
    {
      title: isAr
        ? 'صورة المؤسسة'
        : 'Store / Restaurant Photo',
      icon: Image,
    },
  ];

  return (
    <div className="p-6 text-white">

      <h2 className="text-center text-2xl font-bold mb-2">
        {isAr
          ? 'التحقق من المؤسسة'
          : 'Business Verification'}
      </h2>

      <p className="text-center text-neutral-500 mb-6">
        {isAr
          ? 'قم برفع الوثائق المطلوبة'
          : 'Upload your business documents'}
      </p>

      <div className="space-y-4">

        {documents.map((doc, index) => {

          const Icon = doc.icon;

          return (
            <div
              key={index}
              className="
                bg-neutral-900
                border
                border-neutral-800
                rounded-xl
                p-4
                flex
                justify-between
                items-center
              "
            >
              <div className="flex items-center gap-3">

                <Icon className="text-amber-400" />

                <div>
                  <div className="font-semibold">
                    {doc.title}
                  </div>

                  <div className="text-xs text-neutral-500">
                    Upload Image
                  </div>
                </div>

              </div>

              <button
                className="
                  h-10
                  w-10
                  rounded-full
                  bg-amber-400
                  text-black
                  flex
                  items-center
                  justify-center
                "
              >
                <Plus size={18} />
              </button>

            </div>
          );
        })}

      </div>

      <button
        onClick={onSubmit}
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
        {isAr ? 'إرسال' : 'Submit'}
      </button>

    </div>
  );
}