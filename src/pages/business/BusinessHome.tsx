import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { RevenueCard } from '../../components/business/RevenueCard';
import { StatsCard } from '../../components/business/StatsCard';
import { OrderCard } from '../../components/business/OrderCard';
import { ShoppingBag, Clock, CheckCircle, XCircle, Bell, ChevronRight, TrendingUp } from 'lucide-react';

export const BusinessHome: React.FC = () => {
  const { 
    business, 
    updateBusiness, 
    stats, 
    products, 
    orders, 
    setActiveTab, 
    notifications 
  } = useBusiness();

  // Highlight count of unread alerts
  const unreadAlerts = notifications.filter(n => !n.read).length;

  // Toggle active status globally
  const toggleStoreStatus = () => {
    updateBusiness({
      status: business.status === 'Active' ? 'Offline' : 'Active'
    });
  };

  // Render recent 2 pending/active orders
  const activeIncomingOrders = orders
    .filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled')
    .slice(0, 2);

  // Curated weekly sales breakdown
  const weeklySales = [
    { day: 'Mon', revenue: '52K' },
    { day: 'Tue', revenue: '64K' },
    { day: 'Wed', revenue: '48K' },
    { day: 'Thu', revenue: '71K' },
    { day: 'Fri', revenue: '92K', highlight: true },
    { day: 'Sat', revenue: '85K' },
    { day: 'Sun', revenue: '78K' }
  ];

  return (
    <div id="home-view-wrapper" className="space-y-6 pb-24">
      {/* 1. Header Area: Business Info & Logo */}
      <div id="home-header-block" className="flex justify-between items-center bg-zinc-950/60 pb-3 pt-2">
        <div className="flex items-center gap-3">
          <div id="shop-logo-outline" className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-[1.5px] shadow-md shadow-amber-400/5">
            <img 
              id="shop-logo"
              src={business.logo} 
              alt={business.name} 
              className="w-full h-full object-cover rounded-[10px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 id="shop-name-title" className="text-base font-bold font-sans text-zinc-100 flex items-center gap-1.5 leading-none">
              {business.name}
            </h1>
            <span id="shop-type-badge" className="text-[11px] font-sans text-zinc-400 mt-1 block">
              {business.type}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Active status pill */}
          <button
            id="status-toggle-pill"
            onClick={toggleStoreStatus}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
              business.status === 'Active'
                ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                : 'bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700/50'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              business.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'
            }`} />
            {business.status}
          </button>

          {/* Alerts Bell */}
          <button
            id="alerts-bell-btn"
            onClick={() => setActiveTab('notifications')}
            className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4 text-zinc-300" />
            {unreadAlerts > 0 && (
              <span id="unread-alerts-badge" className="absolute -top-1 -right-1 bg-red-500 text-white font-sans text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-zinc-950">
                {unreadAlerts}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Today's Revenue Master Card */}
      <div id="featured-revenue-wrapper">
        <RevenueCard />
      </div>

      {/* 3. Small Metrics Cards Grid */}
      <div id="metrics-grid" className="grid grid-cols-2 gap-3.5">
        <StatsCard
          id="stat-orders-today"
          title="Orders Today"
          value={stats.ordersToday}
          icon={<ShoppingBag className="w-4 h-4 text-amber-400" />}
          onClick={() => setActiveTab('orders')}
        />
        
        <StatsCard
          id="stat-pending-orders"
          title="Pending Orders"
          value={stats.pendingOrdersCount}
          icon={<Clock className="w-4 h-4 text-amber-400" />}
          iconBgColor="bg-amber-400/10 animate-pulse"
          textColor="text-amber-400"
          onClick={() => setActiveTab('orders')}
        />

        <StatsCard
          id="stat-completed-orders"
          title="Completed"
          value={stats.completedOrdersCount}
          icon={<CheckCircle className="w-4 h-4 text-green-400" />}
          iconBgColor="bg-green-500/10"
        />

        <StatsCard
          id="stat-cancelled-orders"
          title="Cancelled"
          value={stats.cancelledOrdersCount}
          icon={<XCircle className="w-4 h-4 text-red-400" />}
          iconBgColor="bg-red-500/10"
        />
      </div>

      {/* 4. Weekly Revenue Graphic Trend Chart */}
      <div id="weekly-chart-wrapper" className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850/80">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-bold font-sans text-zinc-200">Revenue Overview</h3>
            <span className="text-[10px] text-zinc-500 font-sans">Compare weekly progressive results</span>
          </div>
          <span className="text-[10px] bg-zinc-800 text-zinc-300 font-semibold px-2.5 py-1 rounded-lg font-sans">
            This Week
          </span>
        </div>

        {/* CSS Flex-driven Bar and Line Graph simulation to match screen layout */}
        <div id="chart-bars-flex" className="h-28 flex items-end justify-between px-1 border-b border-zinc-800 pb-2">
          {weeklySales.map((sales, index) => {
            const barHeights = ['40%', '65%', '45%', '75%', '95%', '85%', '80%'];
            return (
              <div id={`chart-item-${index}`} key={sales.day} className="flex flex-col items-center gap-1.5 w-8 group">
                {/* Simulated Revenue tag on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute mb-14 bg-zinc-950 border border-zinc-800 text-zinc-100 font-sans px-2 py-0.5 rounded text-[9px] pointer-events-none shadow-md z-10">
                  {sales.revenue} DA
                </div>
                
                {/* Bar */}
                <div 
                  id={`chart-bar-${index}`}
                  style={{ height: barHeights[index] }} 
                  className={`w-3.5 rounded-t-md transition-all duration-300 ${
                    sales.highlight 
                      ? 'bg-gradient-to-t from-amber-500 to-yellow-400 shadow-md shadow-amber-500/20' 
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Horizontal Days tag alignment */}
        <div id="chart-days-axis" className="flex justify-between px-1.5 pt-2 text-[10px] font-semibold text-zinc-500 font-sans">
          {weeklySales.map((sales) => (
            <span key={sales.day} className={sales.highlight ? 'text-amber-400' : ''}>
              {sales.day}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Top Selling Products Section */}
      <div id="top-products-wrapper">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold font-sans text-zinc-200">Top Products</h3>
          <button 
            id="see-all-products-link"
            onClick={() => setActiveTab('products')}
            className="text-[11px] font-semibold font-sans text-amber-400 flex items-center gap-0.5 cursor-pointer hover:underline"
          >
            See All
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div id="top-products-items" className="space-y-2.5">
          {products.slice(0, 3).map((prod) => {
            // Realistic pre-calculated totals to resemble mockup look
            const orderCount = prod.id === 'P-1' ? 120 : prod.id === 'P-2' ? 98 : 210;
            const revenueSum = prod.id === 'P-1' ? '24,000' : prod.id === 'P-2' ? '19,600' : '10,500';

            return (
              <div 
                id={`top-prod-${prod.id}`}
                key={prod.id} 
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-900 hover:border-zinc-850 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-10 h-10 object-cover rounded-lg bg-zinc-950 border border-zinc-850"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-200 truncate font-sans">{prod.name}</h4>
                    <span className="text-[10px] text-zinc-500 font-sans block mt-0.5">{orderCount} orders</span>
                  </div>
                </div>
                
                <span className="text-xs font-bold font-sans text-amber-400">
                  {revenueSum} DA
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Recent Active Incoming Orders Section */}
      {activeIncomingOrders.length > 0 && (
        <div id="recent-incoming-orders-wrapper">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold font-sans text-zinc-200">Active Incoming Duties</h3>
            <span className="text-[10px] text-zinc-500 font-sans">Actions required</span>
          </div>
          <div className="space-y-3">
            {activeIncomingOrders.map((ord) => (
              <OrderCard key={ord.id} order={ord} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
