import React from 'react';
import { Order } from '../../types';
import { useBusiness } from '../../context/BusinessContext';
import { Phone, MapPin, Clock, Check, Play, Square, X, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { updateOrderStatus } = useBusiness();

  // Status-based color mapping for badges
  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20';
      case 'Preparing':
        return 'bg-blue-400/10 text-blue-400 ring-1 ring-blue-400/20';
      case 'Ready':
        return 'bg-purple-400/10 text-purple-400 ring-1 ring-purple-400/20';
      case 'Delivered':
        return 'bg-green-400/10 text-green-400 ring-1 ring-green-400/20';
      case 'Cancelled':
        return 'bg-red-400/10 text-red-400 ring-1 ring-red-400/20';
      default:
        return 'bg-zinc-850 text-zinc-400';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      id={`order-card-${order.id}`}
      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850/80 mb-4 hover:border-zinc-800 transition-all duration-200"
    >
      {/* Card Header: Order Number & Time */}
      <div id={`order-header-${order.id}`} className="flex justify-between items-center pb-3 border-b border-zinc-850">
        <div>
          <span id={`order-id-${order.id}`} className="text-sm font-bold font-mono text-zinc-100">
            {order.id}
          </span>
          <span className="mx-2 text-zinc-650">•</span>
          <span id={`order-time-${order.id}`} className="text-xs text-zinc-400 font-sans inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-500" />
            {order.createdAt}
          </span>
        </div>
        
        <span 
          id={`order-status-${order.id}`}
          className={`px-3 py-1 text-xs font-semibold rounded-full font-sans tracking-wide ${getStatusStyle(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      {/* Customer Info */}
      <div id={`order-customer-details-${order.id}`} className="py-3.5 space-y-2 text-sm font-sans">
        <div id={`customer-name-row-${order.id}`} className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-amber-400">
            {order.customerName.charAt(0)}
          </div>
          <span className="font-semibold text-zinc-200">{order.customerName}</span>
        </div>
        
        <div id={`customer-phone-row-${order.id}`} className="flex items-center gap-2 text-xs text-zinc-400 ml-1">
          <Phone className="w-3.5 h-3.5 text-zinc-500" />
          <a href={`tel:${order.phone}`} className="hover:text-amber-400 hover:underline">{order.phone}</a>
        </div>
        
        <div id={`customer-address-row-${order.id}`} className="flex items-center gap-2 text-xs text-zinc-400 ml-1">
          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          <span>{order.address}</span>
        </div>
      </div>

      {/* Order Items */}
      <div id={`order-items-wrapper-${order.id}`} className="py-3 px-3.5 rounded-xl bg-zinc-950/50 border border-zinc-900/60 my-2">
        <h4 className="text-[10px] tracking-wider uppercase text-zinc-500 font-bold mb-1.5 font-sans">Items</h4>
        <div className="space-y-1.5">
          {order.items.map((item, index) => (
            <div id={`order-item-${order.id}-${index}`} key={index} className="flex justify-between items-center text-xs text-zinc-300 font-sans">
              <span>
                <span className="font-bold text-amber-500 font-mono mr-1.5">{item.quantity}x</span>
                <span>{item.name}</span>
              </span>
              <span className="font-mono text-zinc-400">{item.price.toLocaleString()} DA</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center border-t border-zinc-900 mt-2.5 pt-2.5">
          <span className="text-xs text-zinc-400 font-sans">Total Amount</span>
          <span id={`order-total-${order.id}`} className="text-sm font-bold font-sans text-amber-400">
            {order.total.toLocaleString()} DA
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div id={`order-actions-row-${order.id}`} className="flex gap-2.5 mt-4">
        {order.status === 'Pending' && (
          <>
            <button
              id={`btn-accept-${order.id}`}
              onClick={() => updateOrderStatus(order.id, 'Preparing')}
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-black text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Accept Order
            </button>
            <button
              id={`btn-cancel-${order.id}`}
              onClick={() => updateOrderStatus(order.id, 'Cancelled')}
              className="bg-zinc-800 hover:bg-red-500/10 hover:text-red-400 text-zinc-400 text-xs font-medium py-2.5 p-3 rounded-xl transition-colors duration-150 cursor-pointer flex items-center justify-center"
              title="Cancel Order"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {order.status === 'Preparing' && (
          <>
            <button
              id={`btn-ready-${order.id}`}
              onClick={() => updateOrderStatus(order.id, 'Ready')}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
            >
              <Check className="w-4 h-4 stroke-[3px]" />
              Mark Ready
            </button>
            <button
              id={`btn-cancel-prep-${order.id}`}
              onClick={() => updateOrderStatus(order.id, 'Cancelled')}
              className="bg-zinc-800 hover:bg-red-500/10 hover:text-red-400 text-zinc-400 text-xs py-2.5 p-3 rounded-xl transition-colors duration-150 cursor-pointer"
              title="Cancel Order"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {order.status === 'Ready' && (
          <button
            id={`btn-delivery-${order.id}`}
            onClick={() => updateOrderStatus(order.id, 'Delivered')}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-green-500/10"
          >
            <Check className="w-4 h-4 stroke-[3px]" />
            Mark Delivered
          </button>
        )}

        {(order.status === 'Delivered' || order.status === 'Cancelled') && (
          <div className="w-full flex justify-between items-center text-xs text-zinc-500 px-1 italic">
            <span>Order completed & logged.</span>
            <button 
              id={`btn-reset-${order.id}`}
              onClick={() => updateOrderStatus(order.id, 'Pending')}
              className="text-[10px] text-zinc-400 capitalize underline not-italic hover:text-amber-400 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              Reset State
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
