import { ArrowLeft, MapPin, Wallet } from 'lucide-react';

interface GroceryConfirmOrderProps {
  lang: 'ar' | 'en';
  data: any;
  onBack: () => void;
  onConfirm: () => void;
}

export default function GroceryConfirmOrder({
  lang,
  data,
  onBack,
  onConfirm,
}: GroceryConfirmOrderProps) {
  const isAr = lang === 'ar';

  const itemsCount =
    data?.items?.length || 0;

  const budget =
    Number(data?.budget || 0);

  const serviceFee = 150;
  const deliveryFee = 100;

  const total =
    budget + serviceFee + deliveryFee;

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white p-4"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft />
        </button>

        <h1 className="flex-1 text-center text-xl font-black">
          {isAr
            ? 'تأكيد الطلب'
            : 'Confirm Order'}
        </h1>
      </div>

      {/* Summary */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-4">
        <h3 className="font-bold mb-4 text-amber-400">
          {isAr
            ? 'ملخص الطلب'
            : 'Order Summary'}
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>
              {isAr
                ? 'عدد العناصر'
                : 'Items Count'}
            </span>

            <span>{itemsCount}</span>
          </div>

          <div className="flex justify-between">
            <span>
              {isAr
                ? 'الميزانية المتوقعة'
                : 'Expected Budget'}
            </span>

            <span>{budget} دج</span>
          </div>

          <div className="flex justify-between">
            <span>
              {isAr
                ? 'رسوم الخدمة'
                : 'Service Fee'}
            </span>

            <span>{serviceFee} دج</span>
          </div>

          <div className="flex justify-between">
            <span>
              {isAr
                ? 'رسوم التوصيل'
                : 'Delivery Fee'}
            </span>

            <span>{deliveryFee} دج</span>
          </div>

          <div className="border-t border-neutral-800 pt-3 flex justify-between font-black text-green-400">
            <span>
              {isAr
                ? 'الإجمالي المتوقع'
                : 'Estimated Total'}
            </span>

            <span>{total} دج</span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin
            size={18}
            className="text-amber-400"
          />

          <h3 className="font-bold">
            {isAr
              ? 'عنوان التسليم'
              : 'Delivery Address'}
          </h3>
        </div>

        <p className="text-sm text-neutral-300">
          {isAr
            ? 'الجزائر العاصمة'
            : 'Algiers'}
        </p>
      </div>

      {/* Payment */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Wallet
            size={18}
            className="text-amber-400"
          />

          <h3 className="font-bold">
            {isAr
              ? 'طريقة الدفع'
              : 'Payment Method'}
          </h3>
        </div>

        <p className="text-sm text-neutral-300">
          {isAr
            ? 'الدفع عند الاستلام'
            : 'Cash On Delivery'}
        </p>
      </div>

      {/* Notes */}
      {data?.notes && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 mb-6">
          <h3 className="font-bold mb-2">
            {isAr
              ? 'ملاحظات إضافية'
              : 'Additional Notes'}
          </h3>

          <p className="text-sm text-neutral-300">
            {data.notes}
          </p>
        </div>
      )}

      {/* Confirm */}
      <button
        onClick={onConfirm}
        className="
          w-full
          bg-amber-400
          text-black
          py-4
          rounded-2xl
          font-black
        "
      >
        {isAr
          ? 'تأكيد الطلب'
          : 'Confirm Order'}
      </button>
    </div>
  );
}