// PhoneSimulator.tsx
import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Wallet,
  User,
  MapPin,
  X,
  Bike,
  Zap,
  LogIn,
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';

// Customer Components
import AppHome from './AppHome';
import CategoryRide from './CategoryRide';
import CategoryParcel from './CategoryParcel';
import CategoryGrocery from './CategoryGrocery';
import CategoryFood from './CategoryFood';
import AppOrders from './AppOrders';
import AppWallet from './AppWallet';
import AppAccount from './AppAccount';
import BusinessApp from '../BusinessApp';
// Auth Components
import CustomerLogin from './auth/CustomerLogin';
import CustomerRegister from './auth/CustomerRegister';
import BusinessAuth from './auth/BusinessAuth';

import CaptainLogin from './auth/CaptainLogin';
import CaptainRegister from './auth/CaptainRegister';
import BusinessTypeSelection from './auth/BusinessTypeSelection';
import WaitingApproval from './auth/WaitingApproval';
import ChooseAccountType from './auth/ChooseAccountType';
import BusinessVerification from './auth/BusinessVerification';
// Captain Components
import CaptainDashboard from './captain/CaptainDashboard';
import CaptainOrders from './captain/CaptainOrders';
import CaptainWallet from './captain/CaptainWallet';
import CaptainProfile from './captain/CaptainProfile';
import BusinessContract from './auth/BusinessContract';
import CaptainContract from './auth/CaptainContract';
// Types
import {
  SimulatorTab,
  CategoryType,
  Order,
  WalletTransaction,
  UserProfile,
} from '../types';
import CaptainPreferences from './captain/CaptainPreferences';


interface PhoneSimulatorProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;

  user: UserProfile;
  setUser: (user: UserProfile) => void;

  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;

  transactions: WalletTransaction[];
  setTransactions: React.Dispatch<
    React.SetStateAction<WalletTransaction[]>
  >;
}

export default function PhoneSimulator({
  lang,
  setLang,
  user,
  setUser,
  orders,
  setOrders,
  transactions,
  setTransactions,
}: PhoneSimulatorProps) {
  const isAr = lang === 'ar';

  // =========================
  // ROLE & AUTH STATES
  // =========================

  const [currentRole, setCurrentRole] =
    useState<'customer' | 'captain' | 'business' | null>(null);

  // ✅ Starts at 'choose-role' directly — splash screen handles 'welcome'
  const [authState, setAuthState] =
    useState<
      | 'choose-role'
      | 'customer-login'
      | 'customer-register'
      | 'captain-login'
      | 'captain-register'
      | 'captain-waiting'
      | 'business-login'
      | 'business-register'
      | 'business-type'
      | 'business-verification'
      | 'business-contract'
      | 'captain-contract'
      | 'waiting-approval'
      | 'captain-preferences'
      | 'authenticated'
    >('choose-role');

  // =========================
  // CUSTOMER STATES
  // =========================

  const [activeTab, setActiveTab] =
    useState<SimulatorTab>('home');

  const [activeCategory, setActiveCategory] =
    useState<CategoryType | null>(null);

  const [showPromoModal, setShowPromoModal] =
    useState(false);

  const [showDirectOrderDrawer, setShowDirectOrderDrawer] =
    useState(false);

  // =========================
  // CAPTAIN STATES
  // =========================

  const [captainData, setCaptainData] = useState({
    name: 'حمزة بن يوسف',
    phone: '+213 550 12 34 56',
    wilaya: 'الجزائر العاصمة',
    model: 'Peugeot Tweet 125cc',
  });
  const [captainPreferences, setCaptainPreferences] = useState<string[]>([]);
  const [captainActiveTab, setCaptainActiveTab] =
    useState<
      'dashboard' | 'orders' | 'wallet' | 'profile'
    >('dashboard');

  const [captainEarnings, setCaptainEarnings] =
    useState({
      today: 1850,
      completedCount: 4,
      balance: 6200,
    });

  // =========================
  // LOGOUT — goes back to choose-role
  // =========================

  const handleLogout = () => {
    setCurrentRole(null);
    setAuthState('choose-role');
  };

  // =========================
  // ORDER CREATION
  // =========================

  const handleCreateOrder = (
    partial: Partial<Order>
  ) => {
    const isAffordable =
      user.balance >= (partial.cost || 0);

    if (!isAffordable) {
      alert(
        isAr
          ? 'الرصيد غير كافي'
          : 'Insufficient balance'
      );

      setActiveTab('wallet');
      return;
    }

    const randId = `FG-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const now = new Date();

    const newOrder: Order = {
      id: randId,
      category: partial.category || 'ride',
      status: 'pending',

      pickupAddress:
        partial.pickupAddress || '',

      pickupAddressEn:
        partial.pickupAddressEn || '',

      deliveryAddress:
        partial.deliveryAddress || '',

      deliveryAddressEn:
        partial.deliveryAddressEn || '',

      cost: partial.cost || 20,

      date: now.toISOString().split('T')[0],

      progress: 10,

      driverName: isAr
        ? 'رياض بن يوسف'
        : 'Riad Benyoussef',

      eta: isAr ? '١٠ دقائق' : '10 mins',
    };

    setOrders((prev) => [newOrder, ...prev]);

    setUser({
      ...user,
      balance: user.balance - newOrder.cost,
    });

    setActiveCategory(null);
    setActiveTab('orders');
  };

  // =========================
  // RENDER CONTENT
  // =========================

  const renderContent = () => {

    // =========================
    // CHOOSE ROLE
    // =========================

    if (authState === 'choose-role') {
      return (
        <ChooseAccountType
          lang={lang}
          onBack={() => setAuthState('choose-role')} // no-op, splash is gone
          onSelect={(type) => {
            if (type === 'customer') {
              setCurrentRole('customer');
              setAuthState('customer-login');
            } else if (type === 'driver') {
              setCurrentRole('captain');
              setAuthState('captain-login');
            } else if (type === 'business') {
              setCurrentRole('business');
              setAuthState('business-login');
            }
          }}
        />
      );
    }

    // =========================
    // CUSTOMER LOGIN
    // =========================

    if (authState === 'customer-login') {
      return (
        <CustomerLogin
          lang={lang}
          onLoginSuccess={() => {
            setCurrentRole('customer');
            setAuthState('authenticated');
          }}
          onSwitchToRegister={() =>
            setAuthState('customer-register')
          }
          onBackToRoleSelection={() =>
            setAuthState('choose-role')
          }
        />
      );
    }

    // =========================
    // CUSTOMER REGISTER
    // =========================

    if (authState === 'customer-register') {
      return (
        <CustomerRegister
          lang={lang}
          onRegisterSuccess={() => {
            setCurrentRole('customer');
            setAuthState('authenticated');
          }}
          onSwitchToLogin={() =>
            setAuthState('customer-login')
          }
          onBackToRoleSelection={() =>
            setAuthState('choose-role')
          }
        />
      );
    }

    // =========================
    // CAPTAIN LOGIN
    // =========================

    if (authState === 'captain-login') {
      return (
        <CaptainLogin
          lang={lang}
          onLoginSuccess={() => {
            setCurrentRole('captain');
            setAuthState('captain-preferences');
          }}
          onSwitchToRegister={() =>
            setAuthState('captain-register')
          }
          onBackToRoleSelection={() =>
            setAuthState('choose-role')
          }
        />
      );
    }

    // =========================
    // CAPTAIN REGISTER
    // =========================

    if (authState === 'captain-register') {
      return (
        <CaptainRegister
          lang={lang}
          onRegisterSuccess={(data) => {
            setCaptainData(data);
            setAuthState('captain-contract');
          }}
          onSwitchToLogin={() =>
            setAuthState('captain-login')
          }
          onBackToRoleSelection={() =>
            setAuthState('choose-role')
          }
        />
      );
    }
    if (authState === 'captain-preferences') {
      return (
        <CaptainPreferences
          lang={lang}
          onBack={() => setAuthState('captain-login')}
          onContinue={(types) => {
            setCaptainPreferences(types);
            setAuthState('authenticated');
          }}
        />
      );
    }
    if (authState === 'business-login') {
      return (
        <BusinessAuth
          lang={lang}
          mode="login"
          onLoginSuccess={() => {
            setCurrentRole('business');
            setAuthState('authenticated');
          }}
          onSwitchToRegister={() =>
            setAuthState('business-register')
          }
          onBackToRoleSelection={() =>
            setAuthState('choose-role')
          }
        />
      );
    }
    if (authState === 'business-register') {
      return (
        <BusinessAuth
          lang={lang}
          mode="register"
          onRegisterSuccess={() => {
            setAuthState('business-type');
          }}
          onSwitchToLogin={() =>
            setAuthState('business-login')
          }
          onBackToRoleSelection={() =>
            setAuthState('choose-role')
          }
        />
      );
    }
    if (authState === 'business-type') {
      return (
        <BusinessTypeSelection
          lang={lang}
          onBack={() =>
            setAuthState('business-register')
          }
          onNext={(type) => {

            console.log(type);

            setAuthState(
              'business-verification'
            );

          }}
        />
      );
    }
    if (authState === 'business-verification') {
      return (
        <BusinessVerification
          lang={lang}
          onBack={() =>
            setAuthState('business-type')
          }
          onSubmit={() =>
            setAuthState('business-contract')
          }
        />
      );
    }
    // =========================
    // WAITING APPROVAL
    // =========================

    if (authState === 'waiting-approval') {
      return (
        <WaitingApproval
          lang={lang}
          onBackHome={() =>
            setAuthState('choose-role')
          }
        />
      );
    }
    if (authState === 'business-contract') {
      return (
        <BusinessContract
          lang={lang}
          onBack={() =>
            setAuthState('business-verification')
          }
          onSubmit={() =>
            setAuthState('waiting-approval')
          }
        />
      );
    }
    if (authState === 'captain-contract') {
      return (
        <CaptainContract
          lang={lang}
          onBack={() =>
            setAuthState('captain-register')
          }
          onSubmit={() =>
            setAuthState('waiting-approval')
          }
        />
      );
    }
    // =========================
    // AUTHENTICATED
    // =========================

    if (authState === 'authenticated') {
      if (currentRole === 'business') {
        return <BusinessApp onLogout={handleLogout} />;
      }
      // =====================
      // CAPTAIN MODE
      // =====================

      if (currentRole === 'captain') {
        switch (captainActiveTab) {
          case 'dashboard':
            return (
              <CaptainDashboard
                lang={lang}
                captainData={captainData}
                earnings={captainEarnings}
                setEarnings={setCaptainEarnings}
                onLogout={handleLogout}
              />
            );
          case 'orders':
            return <CaptainOrders lang={lang} />;
          case 'wallet':
            return (
              <CaptainWallet
                lang={lang}
                earnings={captainEarnings}
              />
            );
          case 'profile':
            return (
              <CaptainProfile
                lang={lang}
                captainData={captainData}
                onLogout={handleLogout}
                langToggle={() =>
                  setLang(isAr ? 'en' : 'ar')
                }
              />
            );
        }
      }

      // =====================
      // CUSTOMER MODE
      // =====================

      if (activeCategory === 'ride') {
        return (
          <CategoryRide
            lang={lang}
            onBack={() => setActiveCategory(null)}
            onSubmitOrder={handleCreateOrder}
            user={user}
          />
        );
      }

      if (activeCategory === 'parcel') {
        return (
          <CategoryParcel
            lang={lang}
            onBack={() => setActiveCategory(null)}
            onSubmitOrder={handleCreateOrder}
            user={user}
          />
        );
      }

      if (activeCategory === 'food') {
        return (
          <CategoryFood
            lang={lang}
            onBack={() => setActiveCategory(null)}
            onSubmitOrder={handleCreateOrder}
            user={user}
          />
        );
      }

      if (activeCategory === 'grocery') {
        return (
          <CategoryGrocery
            lang={lang}
            onBack={() => setActiveCategory(null)}
            onSubmitOrder={handleCreateOrder}
            user={user}
          />
        );
      }

      switch (activeTab) {
        case 'home':
          return (
            <AppHome
              lang={lang}
              user={user}
              onSelectCategory={(cat) =>
                setActiveCategory(cat)
              }
              onSelectPromo={() =>
                setShowPromoModal(true)
              }
            />
          );
        case 'orders':
          return (
            <AppOrders
              lang={lang}
              orders={orders}
              onCancelOrder={() => { }}
            />
          );
        case 'wallet':
          return (
            <AppWallet
              lang={lang}
              transactions={transactions}
              user={user}
              onAddFunds={() => { }}
            />
          );
        case 'account':
          return (
            <AppAccount
              lang={lang}
              user={user}
              onUpdateUser={() => { }}
              setLang={setLang}
              onLogout={handleLogout}
            />
          );
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-black text-white flex flex-col"
      dir={isAr ? 'rtl' : 'ltr'}
    >

      {/* HEADER */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-5 py-4 flex items-center justify-between sticky top-0 z-50">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-amber-400 to-yellow-300 text-black p-2 rounded-xl">
            <Zap className="h-5 w-5" />
          </div>
          <h1 className="font-black text-xl italic">
            Flash<span className="text-amber-400">Go</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Switch Role */}
          {authState === 'authenticated' && (
            <button
              onClick={() => {
                setCurrentRole(
                  currentRole === 'customer' ? 'captain' : 'customer'
                );
              }}
              className="bg-neutral-800 text-amber-400 px-3 py-2 rounded-xl text-xs font-black"
            >
              ♻️{currentRole === 'customer' ? 'Driver' : 'Client'}
            </button>
          )}

          {/* Language */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="bg-neutral-800 px-3 py-2 rounded-xl text-xs font-bold"
          >
            🌐{isAr ? 'EN' : 'AR'}
          </button>

        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={authState + currentRole + activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* CUSTOMER MOBILE NAVBAR */}
      {authState === 'authenticated' &&
        currentRole === 'captain' && (

          <div className="md:hidden bg-neutral-900/95 sticky bottom-0 border-t border-neutral-800 h-16 flex items-center justify-between px-4 z-40 pb-2 rounded-t-2xl">

            <button
              onClick={() =>
                setCaptainActiveTab('dashboard')
              }
              className={`flex flex-col items-center flex-1 ${captainActiveTab === 'dashboard'
                ? 'text-amber-400'
                : 'text-neutral-500'
                }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-[9px]">
                Dashboard
              </span>
            </button>

            <button
              onClick={() =>
                setCaptainActiveTab('orders')
              }
              className={`flex flex-col items-center flex-1 ${captainActiveTab === 'orders'
                ? 'text-amber-400'
                : 'text-neutral-500'
                }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-[9px]">
                Orders
              </span>
            </button>

            <button
              onClick={() =>
                setCaptainActiveTab('wallet')
              }
              className={`flex flex-col items-center flex-1 ${captainActiveTab === 'wallet'
                ? 'text-amber-400'
                : 'text-neutral-500'
                }`}
            >
              <Wallet className="h-5 w-5" />
              <span className="text-[9px]">
                Wallet
              </span>
            </button>

            <button
              onClick={() =>
                setCaptainActiveTab('profile')
              }
              className={`flex flex-col items-center flex-1 ${captainActiveTab === 'profile'
                ? 'text-amber-400'
                : 'text-neutral-500'
                }`}
            >
              <User className="h-5 w-5" />
              <span className="text-[9px]">
                Profile
              </span>
            </button>

          </div>

        )}
      {authState === 'authenticated' &&
        currentRole === 'customer' && (
          <div className="md:hidden bg-neutral-900/95 sticky bottom-0 border-t border-neutral-800 h-16 flex items-center justify-between px-4 z-40 pb-2 rounded-t-2xl">

            {/* HOME */}
            <button
              onClick={() => {
                setActiveTab('home');
                setShowDirectOrderDrawer(false);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'home'
                ? 'text-amber-400 scale-105'
                : 'text-neutral-500'
                }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-[9px] font-bold mt-1">
                {isAr ? 'الرئيسية' : 'Home'}
              </span>
            </button>

            {/* ORDERS */}
            <button
              onClick={() => {
                setActiveTab('orders');
                setShowDirectOrderDrawer(false);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'orders'
                ? 'text-amber-400 scale-105'
                : 'text-neutral-500'
                }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-[9px] font-bold mt-1">
                {isAr ? 'طلباتي' : 'Orders'}
              </span>
            </button>

            {/* CENTER BUTTON */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <button
                onClick={() => {
                  setShowDirectOrderDrawer(!showDirectOrderDrawer);
                }}
                className="absolute -top-6 w-14 h-14 bg-amber-400 text-black rounded-full flex items-center justify-center shadow-lg shadow-amber-400/25 border-4 border-neutral-950"
              >
                <Bike className="h-6 w-6 stroke-[2.5]" />
              </button>
              <span className="text-[9px] font-bold text-amber-400 mt-8">
                {isAr ? 'اطلب الآن' : 'Order'}
              </span>
            </div>

            {/* WALLET */}
            <button
              onClick={() => {
                setActiveTab('wallet');
                setShowDirectOrderDrawer(false);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'wallet'
                ? 'text-amber-400 scale-105'
                : 'text-neutral-500'
                }`}
            >
              <Wallet className="h-5 w-5" />
              <span className="text-[9px] font-bold mt-1">
                {isAr ? 'المحفظة' : 'Wallet'}
              </span>
            </button>

            {/* ACCOUNT */}
            <button
              onClick={() => {
                setActiveTab('account');
                setShowDirectOrderDrawer(false);
              }}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${activeTab === 'account'
                ? 'text-amber-400 scale-105'
                : 'text-neutral-500'
                }`}
            >
              <User className="h-5 w-5" />
              <span className="text-[9px] font-bold mt-1">
                {isAr ? 'الحساب' : 'Account'}
              </span>
            </button>

          </div>
        )}

    </div>
  );
}