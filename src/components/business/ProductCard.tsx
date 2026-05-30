import React, { useState } from 'react';
import { Product } from '../../types';
import { useBusiness } from '../../context/BusinessContext';
import { Trash2, Edit3, CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const { updateProduct, deleteProduct } = useBusiness();

  // Color mapping based on stock state
  const getStockBadge = (stock: Product['stock']) => {
    switch (stock) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] bg-green-500/10 text-green-400 font-semibold px-2 py-0.5 rounded-md">
            <CheckCircle className="w-2.5 h-2.5" />
            In Stock
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] bg-yellow-500/10 text-yellow-500 font-semibold px-2 py-0.5 rounded-md">
            <AlertTriangle className="w-2.5 h-2.5 font-bold" />
            Low Stock
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] bg-red-400/10 text-red-400 font-semibold px-2 py-0.5 rounded-md">
            <AlertTriangle className="w-2.5 h-2.5" />
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  const toggleProductActive = () => {
    updateProduct(product.id, { active: !product.active });
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className={`p-4 rounded-2xl bg-zinc-900 border transition-all duration-200 ${
        product.active ? 'border-zinc-850 hover:border-zinc-800' : 'border-zinc-900/60 opacity-60'
      }`}
    >
      <div id={`product-content-row-${product.id}`} className="flex gap-4">
        {/* Product image */}
        <div id={`product-img-wrapper-${product.id}`} className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-805">
          <img
            id={`product-img-${product.id}`}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {!product.active && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <EyeOff className="w-4 h-4 text-zinc-400" />
            </div>
          )}
        </div>

        {/* Product standard meta */}
        <div id={`product-meta-${product.id}`} className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-1">
            <h4 id={`product-name-${product.id}`} className="text-sm font-bold font-sans text-zinc-100 truncate">
              {product.name}
            </h4>
            
            {/* Status indicators */}
            <div className="flex items-center gap-1.5 shrink-0">
              {getStockBadge(product.stock)}
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                product.active ? 'bg-amber-400/10 text-amber-400' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {product.active ? 'Active' : 'Disabled'}
              </span>
            </div>
          </div>

          <p id={`product-category-${product.id}`} className="text-[11px] font-sans text-zinc-400 mt-0.5 font-medium">
            Category • {product.category}
          </p>

          <p id={`product-desc-${product.id}`} className="text-[10px] font-sans text-zinc-500 mt-1 truncate">
            {product.description}
          </p>

          <div className="flex items-end justify-between mt-2 pt-1 border-t border-zinc-900">
            <span id={`product-price-${product.id}`} className="text-sm font-bold font-sans text-amber-400">
              {product.price.toLocaleString()} DA
            </span>

            <div className="flex items-center gap-2">
              {/* Toggle switch */}
              <button
                id={`btn-toggle-active-${product.id}`}
                onClick={toggleProductActive}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  product.active ? 'bg-amber-400/10 text-amber-400 hover:bg-amber-400/20' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-750'
                }`}
                title={product.active ? 'Disable catalog availability' : 'Enable catalog availability'}
              >
                {product.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              {/* Edit button */}
              <button
                id={`btn-edit-${product.id}`}
                onClick={() => onEdit(product)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 transition-colors cursor-pointer"
                title="Edit Product details"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              {/* Delete button */}
              <button
                id={`btn-delete-${product.id}`}
                onClick={() => deleteProduct(product.id)}
                className="p-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors cursor-pointer ml-1"
                title="Delete Product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
