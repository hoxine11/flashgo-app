/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BusinessProvider, useBusiness } from './context/BusinessContext';
import { BottomNavigation } from './components/business/BottomNavigation';
import { BusinessHome } from './pages/business/BusinessHome';
import { BusinessOrders } from './pages/business/BusinessOrders';
import { BusinessProducts } from './pages/business/BusinessProducts';
import { AddProduct } from './pages/business/AddProduct';
import { BusinessWallet } from './pages/business/BusinessWallet';
import { BusinessProfile } from './pages/business/BusinessProfile';
import { BusinessAnalytics } from './pages/business/BusinessAnalytics';
import { BusinessNotifications } from './pages/business/BusinessNotifications';

interface BusinessAppProps {
  onLogout: () => void;
}


// Inner App content that has access to BusinessContext
interface AppContentProps {
  onLogout: () => void;
}

function AppContent({
  onLogout,
}: AppContentProps) {
  const {
    activeTab,
    setActiveTab,
    simulateIncomingOrder,
    notifications,
    business,
    stats
  } = useBusiness();

  const [currentTime, setCurrentTime] = useState('');
  const [showSimulatedBanner, setShowSimulatedBanner] = useState(false);
  const [latestClientName, setLatestClientName] = useState('');

  // Clock updates for the mobile status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter out any newly received orders to trigger a gorgeous high-fidelity banner floating inside the simulated phone
  useEffect(() => {
    const unreadNewOrders = notifications.filter(n => n.type === 'New Order' && !n.read);
    if (unreadNewOrders.length > 0) {
      const mostRecent = unreadNewOrders[0];
      setLatestClientName(mostRecent.title);
      setShowSimulatedBanner(true);

      // Auto dismiss after 4 seconds
      const timeout = setTimeout(() => {
        setShowSimulatedBanner(false);
      }, 4500);
      return () => clearTimeout(timeout);
    }
  }, [notifications]);

  // Render active layout based on context tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <BusinessHome />;
      case 'orders':
        return <BusinessOrders />;
      case 'products':
        return <BusinessProducts />;
      case 'addProduct':
        return <AddProduct />;
      case 'wallet':
        return <BusinessWallet />;
      case 'profile':
        return (
          <BusinessProfile
            onLogout={onLogout}
          />
        );
      case 'analytics':
        return <BusinessAnalytics />;
      case 'notifications':
        return <BusinessNotifications />;
      default:
        return <BusinessHome />;
    }
  };

  const triggerMockOrder = () => {
    simulateIncomingOrder();
  };

  return (
    <div className="h-full bg-black text-white">

      {renderTabContent()}

      <BottomNavigation />

    </div>
  );
}

export default function BusinessApp({
  onLogout,
}: BusinessAppProps) {
  return (
    <BusinessProvider>
      <AppContent onLogout={onLogout} />
    </BusinessProvider>
  );
}
