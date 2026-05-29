
import { useState } from 'react';
import { Store, ArrowLeft } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en';
  mode: 'login' | 'register';
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
  onSwitchToLogin?: () => void;
  onSwitchToRegister?: () => void;
  onBackToRoleSelection?: () => void;
}

export default function StoreAuth({
  lang,
  mode,
  onLoginSuccess,
  onRegisterSuccess,
  onSwitchToLogin,
  onSwitchToRegister,
  onBackToRoleSelection,
}: Props) {

  const isAr = lang === 'ar';

  const [storeName, setStoreName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="p-6 text-white min-h-screen bg-black">

      {/* BACK BUTTON */}

      <button
        onClick={onBackToRoleSelection}
        className="mb-6 text-white"
      >
        <ArrowLeft />
      </button>

      {/* ICON */}

      <div className="flex justify-center mb-6">

        <div className="bg-amber-400 p-5 rounded-full">

          <Store className="h-8 w-8 text-black" />

        </div>

      </div>

      {/* TITLE */}

      <h2 className="text-center text-2xl font-bold mb-2">

        {mode === 'register'
          ? (isAr
              ? 'تسجيل متجر / مطعم'
              : 'Store / Restaurant Registration')
          : (isAr
              ? 'دخول المتجر'
              : 'Store Login')}

      </h2>

      <p className="text-center text-neutral-500 mb-8">

        {mode === 'register'
          ? (isAr
              ? 'انضم إلى منصة FlashGo'
              : 'Join FlashGo Platform')
          : (isAr
              ? 'سجل الدخول إلى حسابك'
              : 'Login to your account')}

      </p>

      {/* FORM */}

      <div className="space-y-4">

        {mode === 'register' && (
          <>
            <input
              type="text"
              placeholder={
                isAr
                  ? 'اسم المتجر أو المطعم'
                  : 'Store / Restaurant Name'
              }
              value={storeName}
              onChange={(e) =>
                setStoreName(e.target.value)
              }
              className="
                w-full
                bg-neutral-900
                border
                border-neutral-800
                p-4
                rounded-xl
                outline-none
              "
            />

            <select
              value={businessType}
              onChange={(e) =>
                setBusinessType(e.target.value)
              }
              className="
                w-full
                bg-neutral-900
                border
                border-neutral-800
                p-4
                rounded-xl
                outline-none
              "
            >
              <option value="">
                {isAr
                  ? 'اختر نوع النشاط'
                  : 'Select Business Type'}
              </option>

              <option value="restaurant">
                Restaurant
              </option>

              <option value="store">
                Store
              </option>

              <option value="pharmacy">
                Pharmacy
              </option>

              <option value="supermarket">
                Supermarket
              </option>

              <option value="bakery">
                Bakery
              </option>

            </select>

            <input
              type="tel"
              placeholder={
                isAr
                  ? 'رقم الهاتف'
                  : 'Phone Number'
              }
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="
                w-full
                bg-neutral-900
                border
                border-neutral-800
                p-4
                rounded-xl
                outline-none
              "
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            bg-neutral-900
            border
            border-neutral-800
            p-4
            rounded-xl
            outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            bg-neutral-900
            border
            border-neutral-800
            p-4
            rounded-xl
            outline-none
          "
        />

        {/* BUTTON */}

        <button
          onClick={() => {

            if (mode === 'register') {

              onRegisterSuccess?.();

            } else {

              onLoginSuccess?.();

            }

          }}
          className="
            w-full
            bg-amber-400
            hover:bg-amber-500
            text-black
            font-bold
            py-4
            rounded-xl
            transition-all
          "
        >
          {mode === 'register'
            ? (isAr ? 'التالي' : 'Next')
            : (isAr ? 'دخول' : 'Login')}
        </button>

        {/* SWITCH */}

        {mode === 'login' ? (

          <button
            onClick={onSwitchToRegister}
            className="
              w-full
              text-amber-400
              text-sm
            "
          >
            {isAr
              ? 'إنشاء حساب متجر'
              : 'Create Store Account'}
          </button>

        ) : (

          <button
            onClick={onSwitchToLogin}
            className="
              w-full
              text-amber-400
              text-sm
            "
          >
            {isAr
              ? 'لديك حساب؟ تسجيل الدخول'
              : 'Already have an account? Login'}
          </button>

        )}

      </div>

    </div>
  );
}
