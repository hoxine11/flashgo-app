import { useState } from 'react';
import { Building2, ArrowLeft } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en';
  mode: 'login' | 'register';
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
  onSwitchToLogin?: () => void;
  onSwitchToRegister?: () => void;
  onBackToRoleSelection?: () => void;
}

export default function CompanyAuth({
  lang,
  mode,
  onLoginSuccess,
  onRegisterSuccess,
  onSwitchToLogin,
  onSwitchToRegister,
  onBackToRoleSelection,
}: Props) {
  const isAr = lang === 'ar';

  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="p-6 text-white">

      <button
        onClick={onBackToRoleSelection}
        className="mb-6"
      >
        <ArrowLeft />
      </button>

      <div className="flex justify-center mb-6">
        <div className="bg-amber-400 p-4 rounded-full">
          <Building2 className="text-black" />
        </div>
      </div>

      <h2 className="text-center text-2xl font-bold mb-6">
        {mode === 'register'
          ? (isAr ? 'تسجيل شركة' : 'Company Registration')
          : (isAr ? 'دخول الشركة' : 'Company Login')}
      </h2>

      <div className="space-y-4">

        {mode === 'register' && (
          <>
            <input
              className="w-full bg-neutral-900 p-3 rounded-xl"
              placeholder={isAr ? 'اسم الشركة' : 'Company Name'}
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
            />

           

            <input
              className="w-full bg-neutral-900 p-3 rounded-xl"
              placeholder={isAr ? 'رقم الهاتف' : 'Phone'}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </>
        )}

        <input
          className="w-full bg-neutral-900 p-3 rounded-xl"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full bg-neutral-900 p-3 rounded-xl"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={() => {
            if (mode === 'register') {
              onRegisterSuccess?.();
            } else {
              onLoginSuccess?.();
            }
          }}
          className="w-full bg-amber-400 text-black py-3 rounded-xl font-bold"
        >
          {mode === 'register'
            ? (isAr ? 'التالي' : 'Next')
            : (isAr ? 'دخول' : 'Login')}
        </button>

        {mode === 'login' ? (
          <button
            onClick={onSwitchToRegister}
            className="w-full text-amber-400"
          >
            {isAr
              ? 'إنشاء حساب شركة'
              : 'Create Company Account'}
          </button>
        ) : (
          <button
            onClick={onSwitchToLogin}
            className="w-full text-amber-400"
          >
            {isAr
              ? 'لديك حساب؟ دخول'
              : 'Already have account? Login'}
          </button>
        )}
      </div>
    </div>
  );
}