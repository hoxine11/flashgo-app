import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { NotificationCategory, NotificationItem } from '../../types';
import { Bell, ShoppingBag, Truck, CheckCircle2, Wallet, Megaphone, Settings, CheckCheck, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BusinessNotifications: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useBusiness();
  const [selectedFilter, setSelectedFilter] = useState<NotificationCategory>('All');

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedFilter === 'All') return true;
    return notif.category === selectedFilter;
  });

  // Icon mapping based on notification type
  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'New Order':
        return (
          <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        );
      case 'Driver Assigned':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'Order Delivered':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
      case 'Payment Received':
        return (
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
        );
      case 'Promotion':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
        );
      case 'System Update':
        return (
          <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-305 flex items-center justify-center shrink-0">
            <Settings className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-zinc-850 text-zinc-400 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div id="notifications-view-wrapper" className="space-y-4 pb-24 text-left font-sans">
      {/* Page Title with Mark all action */}
      <div className="flex justify-between items-center bg-zinc-950/60 py-2">
        <div>
          <h1 id="notifications-main-title" className="text-xl font-bold text-zinc-100">Notifications</h1>
          <p className="text-[11px] text-zinc-400 mt-0.5">Track dispatcher handoffs and electronic balance adjustments</p>
        </div>

        {notifications.some(n => !n.read) && (
          <button
            id="btn-mark-all-read"
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-500 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 stroke-[2.5px]" />
            Mark all read
          </button>
        )}
      </div>

      {/* category segment slider selection */}
      <div id="notifications-category-filter" className="overflow-x-auto -mx-4 px-4 scrollbar-none pb-1.5 flex gap-2">
        {(['All', 'Orders', 'System', 'Payments'] as NotificationCategory[]).map((cat) => {
          const isActive = selectedFilter === cat;
          const count = cat === 'All'
            ? notifications.length
            : notifications.filter((n) => n.category === cat).length;

          return (
            <button
              id={`notif-tab-${cat}`}
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/5'
                  : 'bg-zinc-90 w-full bg-zinc-900 text-zinc-400 border border-zinc-900 hover:text-zinc-200'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                isActive ? 'bg-black/15 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* notifications stack visual listing */}
      <div id="notifications-stack" className="space-y-3 pt-1">
        <AnimatePresence mode="popLayout animate-fadeIn">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                id={`notif-item-${notif.id}`}
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`p-4 rounded-xl bg-zinc-90 w-full bg-zinc-900 border transition-all cursor-pointer flex items-start gap-3.5 ${
                  notif.read ? 'border-zinc-900/60 opacity-60' : 'border-zinc-850 hover:border-zinc-800'
                }`}
              >
                {/* Type Icon */}
                {getNotificationIcon(notif.type)}

                {/* Body Details */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className={`text-xs font-bold leading-tight truncate ${
                      notif.read ? 'text-zinc-300' : 'text-zinc-100'
                    }`}>
                      {notif.title}
                    </h4>
                    
                    {/* Unread circle glow indicator */}
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1 animate-ping" />
                    )}
                  </div>
                  
                  <p className="text-[10.5px] text-zinc-400 leading-normal mt-1 block">
                    {notif.description}
                  </p>
                  
                  <span className="text-[9px] text-zinc-500 font-mono inline-block mt-2 font-medium">
                    {notif.time}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div id="notifications-empty" className="py-16 px-6 text-center rounded-2xl bg-zinc-90 w-full border border-zinc-900/40 flex flex-col items-center">
              <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-650 border border-zinc-850 mb-3 animate-pulse">
                <ShieldCheck className="w-5 h-5 text-zinc-502" />
              </div>
              <h3 className="text-zinc-350 font-bold text-sm">Inbox Fully Cleared</h3>
              <p className="text-zinc-550 text-xs mt-1 font-sans">
                No active announcements registered under category &quot;{selectedFilter}&quot;. Sleep easy!
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
