import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react';

interface GroceryItemsFormProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onNext: (data: any) => void;
}

export default function GroceryItemsForm({
  lang,
  onBack,
  onNext,
}: GroceryItemsFormProps) {

  const isAr = lang === 'ar';

  const [items, setItems] = useState([
    {
      name: '',
      quantity: 1,
    },
  ]);

  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');

  const addItem = () => {
    setItems([
      ...items,
      {
        name: '',
        quantity: 1,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(
      items.filter((_, i) => i !== index)
    );
  };

  const updateItem = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setItems(updated);
  };

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
            ? 'عامل مشتريات شخصي'
            : 'Personal Shopper'}
        </h1>

      </div>

      {/* Items */}

      <div className="space-y-3">

        {items.map((item, index) => (

          <div
            key={index}
            className="
              bg-neutral-900
              border
              border-neutral-800
              rounded-2xl
              p-3
            "
          >

            <div className="flex gap-2 items-center">

              <input
                value={item.name}
                onChange={(e) =>
                  updateItem(
                    index,
                    'name',
                    e.target.value
                  )
                }
                placeholder={
                  isAr
                    ? 'اسم المنتج'
                    : 'Product Name'
                }
                className="
                  flex-1
                  bg-neutral-950
                  border
                  border-neutral-800
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                "
              />

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    'quantity',
                    Number(e.target.value)
                  )
                }
                className="
                  w-20
                  bg-neutral-950
                  border
                  border-neutral-800
                  rounded-xl
                  px-2
                  py-2
                  text-center
                "
              />

              <button
                onClick={() =>
                  removeItem(index)
                }
                className="
                  p-2
                  text-red-400
                "
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Add Item */}

      <button
        onClick={addItem}
        className="
          mt-4
          w-full
          border
          border-dashed
          border-amber-400
          rounded-2xl
          py-3
          flex
          justify-center
          items-center
          gap-2
          text-amber-400
          font-bold
        "
      >
        <Plus size={18} />

        {isAr
          ? 'إضافة عنصر'
          : 'Add Item'}
      </button>

      {/* Budget */}

      <div className="mt-6">

        <label className="block mb-2 font-bold">
          {isAr
            ? 'الميزانية المتوقعة'
            : 'Expected Budget'}
        </label>

        <input
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
          className="
            w-full
            bg-neutral-900
            border
            border-neutral-800
            rounded-xl
            p-3
          "
        />

      </div>

      {/* Notes */}

      <div className="mt-4">

        <label className="block mb-2 font-bold">
          {isAr
            ? 'ملاحظات إضافية'
            : 'Additional Notes'}
        </label>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="
            w-full
            bg-neutral-900
            border
            border-neutral-800
            rounded-xl
            p-3
          "
        />

      </div>

      {/* Next */}

      <button
        onClick={() =>
          onNext({
            items,
            budget,
            notes,
          })
        }
        className="
          mt-6
          w-full
          bg-amber-400
          text-black
          py-4
          rounded-2xl
          font-black
        "
      >
        {isAr ? 'التالي' : 'Next'}
      </button>

    </div>
  );
}