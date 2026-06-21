import { ArrowLeft, FileText, Upload } from 'lucide-react';
import { useState } from 'react';

interface BusinessContractProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onSubmit: () => void;
}

export default function BusinessContract({
  lang,
  onBack,
  onSubmit,
}: BusinessContractProps) {
  const isAr = lang === 'ar';

  const [contractFile, setContractFile] =
    useState<File | null>(null);

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white p-5"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="
            w-10
            h-10
            rounded-xl
            bg-neutral-900
            flex
            items-center
            justify-center
          "
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-xl font-black">
            {isAr
              ? 'عقد الشراكة'
              : 'Partnership Contract'}
          </h1>

          <p className="text-xs text-neutral-500">
            {isAr
              ? 'تحميل وتوقيع عقد الشراكة مع FlashGo'
              : 'Download and sign the FlashGo partnership agreement'}
          </p>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-neutral-800
          mb-5
        "
      >
        <iframe
          src="/image/contracts/business-contract.pdf"
          className="w-full h-[500px]"
          title="Business Contract"
        />
      </div>

      {/* Download */}
      <a
        href="/image/contracts/business-contract.pdf"
        download
        className="
          flex
          items-center
          justify-center
          gap-2
          bg-neutral-900
          border
          border-neutral-800
          rounded-xl
          py-3
          mb-5
          hover:border-amber-400
          transition-all
        "
      >
        <FileText size={18} />

        <span>
          {isAr
            ? 'تحميل العقد'
            : 'Download Contract'}
        </span>
      </a>

      {/* Upload */}
      <div
        className="
          bg-neutral-900
          border
          border-neutral-800
          rounded-2xl
          p-4
          mb-5
        "
      >
        <label className="font-bold block mb-3">
          {isAr
            ? 'رفع العقد الموقع'
            : 'Upload Signed Contract'}
        </label>

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) =>
            setContractFile(
              e.target.files?.[0] || null
            )
          }
          className="w-full"
        />

        {contractFile && (
          <div className="mt-3 text-emerald-400 text-sm">
            ✓ {contractFile.name}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        disabled={!contractFile}
        onClick={onSubmit}
        className={`
          w-full
          py-4
          rounded-2xl
          font-black
          transition-all
          ${
            contractFile
              ? 'bg-amber-400 text-black'
              : 'bg-neutral-800 text-neutral-500'
          }
        `}
      >
        <div className="flex items-center justify-center gap-2">
          <Upload size={18} />

          <span>
            {isAr
              ? 'إرسال العقد الموقع'
              : 'Send Signed Contract'}
          </span>
        </div>
      </button>
    </div>
  );
}