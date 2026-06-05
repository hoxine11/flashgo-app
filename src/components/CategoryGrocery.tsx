import { useState } from 'react';

import GroceryServiceSelection from './GroceryServiceSelection';
import GroceryItemsForm from './GroceryItemsForm';
import GroceryConfirmOrder from './GroceryConfirmOrder';
import CategoryGrocerys from './CategoryGroceryStore';
export default function CategoryGrocery({
  lang,
  onSubmitOrder,
  onBack,
   user,
}: any) {

  const [step, setStep] = useState(1);

  const [serviceType, setServiceType] = useState<
    'store' | 'personal'
  >('personal');

  const [orderData, setOrderData] = useState<any>(null);
console.log(
  "STEP:",
  step,
  "SERVICE:",
  serviceType
);
  // STEP 1
  if (step === 1) {
    return (
      <GroceryServiceSelection
  lang={lang}
  onBack={onBack}
  onNext={(type) => {
    setServiceType(type);
    setStep(2);
  }}
/>
    );
  }

  if (step === 2 && serviceType === 'store') {
    return (
      <CategoryGrocerys
        lang={lang}
        user={user}
        onBack={() => setStep(1)}
        onSubmitOrder={onSubmitOrder}
      />
    );
  }

if (step === 2 && serviceType === 'personal') {
  return (
    <GroceryItemsForm
      lang={lang}
      onBack={() => setStep(1)}
      onNext={(data) => {
        setOrderData(data);
        setStep(3);
      }}
    />
  );
}

  
  if (step === 3) {
    return (
      <GroceryConfirmOrder
        lang={lang}
        data={orderData}
        onBack={() => setStep(2)}
        onConfirm={() => {

          onSubmitOrder({
            category: 'grocery',
            cost: Number(
              orderData?.budget || 0
            ),
          });

        }}
      />
    );
  }

  return null;
}