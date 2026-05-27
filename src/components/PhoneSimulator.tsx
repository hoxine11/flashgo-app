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

// Auth Components
import CustomerLogin from './auth/CustomerLogin';
import CustomerRegister from './auth/CustomerRegister';

import CaptainLogin from './auth/CaptainLogin';
import CaptainRegister from './auth/CaptainRegister';

import WaitingApproval from './auth/WaitingApproval';
import ChooseAccountType from './auth/ChooseAccountType';


// Captain Components
import CaptainDashboard from './captain/CaptainDashboard';
import CaptainOrders from './captain/CaptainOrders';
import CaptainWallet from './captain/CaptainWallet';
import CaptainProfile from './captain/CaptainProfile';

// Types
import {
  SimulatorTab,
  CategoryType,
  Order,
  WalletTransaction,
  UserProfile,
} from '../types';

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
    useState<'customer' | 'captain' | null>(null);


  const [authState, setAuthState] =
    useState<
      | 'welcome'
      | 'choose-role'
      | 'customer-login'
      | 'customer-register'
      | 'captain-login'
      | 'captain-register'
      | 'captain-waiting'
      | 'company-auth'
      | 'store-auth'
      | 'authenticated'
    >('welcome');



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
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setCurrentRole(null);
    setAuthState('welcome');
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
    // WELCOME SCREEN
    // =========================

    if (
      authState === 'welcome'
    ) {
      return (
        <div className="w-full max-w-lg mx-auto p-6 text-center space-y-6">

          {/* Logo */}
          <div className="flex flex-col items-center">

            <div className="bg-gradient-to-tr from-amber-400 to-yellow-300 text-black p-4 rounded-3xl shadow-xl">
              <Bike className="h-10 w-10" />
            </div>

            <h1 className="text-4xl font-black italic mt-4">
              Flash
              <span className="text-amber-400">
                Go
              </span>
            </h1>

            <p className="text-neutral-500 text-sm mt-2">
              {isAr
                ? 'منصة التوصيل الأسرع'
                : 'Premium Delivery Platform'}
            </p>

          </div>

          {/* Roles */}

          <button
            onClick={() =>
              setAuthState('choose-role')
            }
            className="
    w-full
    bg-amber-400
    hover:bg-amber-500
    text-black
    font-black
    py-4
    rounded-2xl
    transition-all
  "
          >
            {isAr
              ? 'ابدأ الآن'
              : 'Get Started'}
          </button>


          {/* Login */}
          <div className="flex justify-center gap-4 text-sm">

            <button
              onClick={() =>
                setAuthState(
                  'customer-login'
                )
              }
              className="text-neutral-400 hover:text-amber-400"
            >
              {isAr
                ? 'دخول الزبون'
                : 'Customer Login'}
            </button>

            <button
              onClick={() =>
                setAuthState(
                  'captain-login'
                )
              }
              className="text-neutral-400 hover:text-amber-400"
            >
              {isAr
                ? 'دخول عامل التوصيل'
                : 'Driver Login'}
            </button>

          </div>
        </div>
      );
    }

    // =========================
    // CUSTOMER LOGIN
    // =========================


    if (authState === 'choose-role') {
  return (
    <ChooseAccountType
      lang={lang}

      onBack={() =>
        setAuthState('welcome')
      }

      onSelect={(type) => {

        if (type === 'customer') {

          setCurrentRole('customer');

          setAuthState('customer-login');

        }

        else if (type === 'driver') {

          setCurrentRole('captain');

          setAuthState('captain-login');

        }

        else if (type === 'company') {

          setAuthState('company-auth');

        }

        else if (type === 'store') {

          setAuthState('store-auth');

        }

      }}
    />
  );
}



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
            setAuthState('welcome')
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
            setAuthState('authenticated');
          }}

          onSwitchToRegister={() =>
            setAuthState('captain-register')
          }

          onBackToRoleSelection={() =>
            setAuthState('welcome')
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

            setAuthState('captain-waiting');
          }}

          onSwitchToLogin={() =>
            setAuthState('captain-login')
          }

          onBackToRoleSelection={() =>
            setAuthState('welcome')
          }
        />
      );
    }

    // =========================
    // WAITING APPROVAL
    // =========================

    if (authState === 'captain-waiting') {
      return (
        <WaitingApproval
          lang={lang}
          captainData={captainData}

          onInstantApprove={() => {

            setCurrentRole('captain');

            setAuthState('authenticated');
          }}

          onBackToLogin={() =>
            setAuthState('captain-login')
          }
        />
      );
    }

    // =========================
    // AUTHENTICATED
    // =========================

    if (
      authState === 'authenticated'
    ) {

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
                earnings={
                  captainEarnings
                }
                setEarnings={
                  setCaptainEarnings
                }
                onLogout={
                  handleLogout
                }
              />
            );

          case 'orders':
            return (
              <CaptainOrders
                lang={lang}
              />
            );

          case 'wallet':
            return (
              <CaptainWallet
                lang={lang}
                earnings={
                  captainEarnings
                }
              />
            );

          case 'profile':
            return (
              <CaptainProfile
                lang={lang}
                captainData={
                  captainData
                }
                onLogout={
                  handleLogout
                }
                langToggle={() =>
                  setLang(
                    isAr
                      ? 'en'
                      : 'ar'
                  )
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
            onBack={() =>
              setActiveCategory(null)
            }
            onSubmitOrder={
              handleCreateOrder
            }
            user={user}
          />
        );
      }

      if (activeCategory === 'parcel') {
        return (
          <CategoryParcel
            lang={lang}
            onBack={() =>
              setActiveCategory(null)
            }
            onSubmitOrder={
              handleCreateOrder
            }
            user={user}
          />
        );
      }

      if (activeCategory === 'food') {
        return (
          <CategoryFood
            lang={lang}
            onBack={() =>
              setActiveCategory(null)
            }
            onSubmitOrder={
              handleCreateOrder
            }
            user={user}
          />
        );
      }

      if (
        activeCategory === 'grocery'
      ) {
        return (
          <CategoryGrocery
            lang={lang}
            onBack={() =>
              setActiveCategory(null)
            }
            onSubmitOrder={
              handleCreateOrder
            }
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
              transactions={
                transactions
              }
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
            Flash
            <span className="text-amber-400">
              Go
            </span>
          </h1>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Switch Role */}
          {authState ===
            'authenticated' && (
              <button
                onClick={() => {
                  setCurrentRole(
                    currentRole ===
                      'customer'
                      ? 'captain'
                      : 'customer'
                  );
                }}
                className="bg-neutral-800 text-amber-400 px-3 py-2 rounded-xl text-xs font-black"
              >
                ♻️
                {currentRole ===
                  'customer'
                  ? 'Driver'
                  : 'Client'}
              </button>
            )}

          {/* Language */}
          <button
            onClick={() =>
              setLang(
                isAr ? 'en' : 'ar'
              )
            }
            className="bg-neutral-800 px-3 py-2 rounded-xl text-xs font-bold"
          >
            🌐
            {isAr ? 'EN' : 'AR'}
          </button>

        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 p-4">

        <AnimatePresence mode="wait">

          <motion.div
            key={
              authState +
              currentRole +
              activeTab
            }
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.2,
            }}
            className="w-full h-full"
          >
            {renderContent()}
          </motion.div>

        </AnimatePresence>

      </main>

      {/* CUSTOMER MOBILE NAVBAR */}

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
                  setShowDirectOrderDrawer(
                    !showDirectOrderDrawer
                  );
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