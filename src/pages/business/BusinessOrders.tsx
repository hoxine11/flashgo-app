import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { OrderCard } from '../../components/business/OrderCard';
import { OrderStatus } from '../../types';
import { Search, ShoppingCart, SlidersHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BusinessOrders: React.FC = () => {
  const { orders } = useBusiness();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<OrderStatus | 'All'>('All');

  // Order filters
  const tabs: (OrderStatus | 'All')[] = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter((order) => {
    // 1. Filter by status
    if (selectedTab !== 'All' && order.status !== selectedTab) {
      return false;
    }
    
    // 2. Filter by search query
    const query = searchTerm.toLowerCase();
    const matchesId = order.id.toLowerCase().includes(query);
    const matchesCustomer = order.customerName.toLowerCase().includes(query);
    const matchesPhone = order.phone.includes(query);
    const matchesAddress = order.address.toLowerCase().includes(query);
    const matchesItem = order.items.some(item => item.name.toLowerCase().includes(query));

    return matchesId || matchesCustomer || matchesPhone || matchesAddress || matchesItem;
  });

  return (
    <div id="orders-view-wrapper" className="space-y-4 pb-24">
      {/* Search Header Bar */}
      <div id="orders-search-header" className="space-y-3.5">
        <div>
          <h1 id="orders-main-title" className="text-xl font-bold font-sans text-zinc-100">Orders</h1>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Accept, prepare, and supervise flash deliveries</p>
        </div>

        {/* Search input field & Filter button */}
        <div className="flex gap-2.5">
          <div id="search-input-wrapper" className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-550" />
            <input
              id="search-orders"
              type="text"
              placeholder="Search order ID, client or items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-850 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors font-sans"
            />
          </div>
          <button
            id="btn-filter-settings"
            className="p-3 bg-zinc-900 border border-zinc-850 rounded-xl hover:bg-zinc-805 transition-colors text-zinc-300 hover:text-amber-400 cursor-pointer"
            title="Filter options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally scrolling Status Tabs */}
      <div id="orders-tabs-slider" className="overflow-x-auto -mx-4 px-4 scrollbar-none pb-1.5 flex gap-2">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab;
          const count = tab === 'All' 
            ? orders.length 
            : orders.filter((o) => o.status === tab).length;

          return (
            <button
              id={`tab-btn-${tab}`}
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-sans tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/10'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-855 hover:text-zinc-200'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                isActive ? 'bg-black/15 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Orders List Canvas */}
      <div id="orders-list-canvas" className="pt-2">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="orders-empty-state"
              className="py-12 px-6 text-center rounded-2xl bg-zinc-90 w-full border border-zinc-900/60 flex flex-col items-center justify-center space-y-3"
            >
              <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-600 border border-zinc-850">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-zinc-300 font-bold text-sm font-sans">No matching entries</h3>
                <p className="text-zinc-550 text-xs font-sans mt-1 max-w-xs mx-auto">
                  {searchTerm 
                    ? `No current values registered matching "${searchTerm}". Try matching a different name.`
                    : `There are currently no orders in the queue categorized as ${selectedTab}.`}
                </p>
              </div>
              {searchTerm && (
                <button
                  id="btn-clear-order-search"
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-amber-400 font-semibold underline hover:text-amber-500 cursor-pointer"
                >
                  Clear Search Query
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
