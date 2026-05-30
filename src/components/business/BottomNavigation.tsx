import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Home, ClipboardList, Package, Wallet, User } from 'lucide-react';
import { motion } from 'motion/react';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab, orders, notifications } = useBusiness();

  // Highlight unread notifications, or pending orders count on badges
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: ClipboardList, badge: pendingCount > 0 ? pendingCount : undefined },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div 
      id="bottom-navigation-container" 
      className="absolute bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-zinc-850 px-4 py-2 pb-6 backdrop-blur-lg"
    >
      <div id="bottom-navigation-grid" className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              id={`nav-btn-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 w-16 transition-colors duration-200 cursor-pointer"
            >
              <div id={`nav-icon-container-${item.id}`} className="relative p-1">
                <Icon 
                  id={`nav-icon-${item.id}`}
                  style={{ strokeWidth: isActive ? 2.5 : 2 }}
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isActive ? 'text-amber-400 scale-110' : 'text-zinc-400 hover:text-zinc-200'
                  }`} 
                />
                
                {/* Simulated notification badge */}
                {item.badge !== undefined && (
                  <span 
                    id={`nav-badge-${item.id}`}
                    className="absolute -top-1 -right-2 bg-red-500 text-white font-sans text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-zinc-950 animate-pulse"
                  >
                    {item.badge}
                  </span>
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    id="nav-bubble-indicator"
                    className="absolute inset-0 bg-amber-400/10 rounded-full -z-10 scale-150"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
              
              <span 
                id={`nav-label-${item.id}`}
                className={`text-[10px] mt-1.5 font-sans tracking-wide transition-colors ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-zinc-500 hover:text-zinc-350'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
