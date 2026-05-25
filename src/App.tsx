import { useState, useEffect } from 'react';
import PhoneSimulator from './components/PhoneSimulator';
import SplashScreen from './components/SplashScreen';

import { Order, WalletTransaction, UserProfile } from './types';
import { INITIAL_USER, INITIAL_ORDERS, INITIAL_TRANSACTIONS } from './data/mockData';
import { Zap, ShieldCheck, MapPin, Headphones } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isAr = lang === 'ar';

  if (showSplash) {
    return <SplashScreen lang={lang} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0c0c0c] text-white relative overflow-x-hidden font-sans flex flex-col justify-between" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Absolute Ambient Background Lights resembling Riyhad's high-contrast night coordinates */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-[150px]" />
        
        {/* Subtle Diagonal Grid Map path lines inside background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bg-grid-app" width="45" height="45" patternUnits="userSpaceOnUse">
              <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-grid-app)" />
        </svg>
      </div>

      {/* Main Container Wrapper */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 z-10 flex flex-col justify-center min-h-[85vh]">
        <PhoneSimulator
          lang={lang}
          setLang={setLang}
          user={user}
          setUser={setUser}
          orders={orders}
          setOrders={setOrders}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </main>

      {/* Bottom Horizontal Features Row - matching the bottom row of visual screenshots in design */}
      
    </div>
  );
}
