import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { ProductCard } from '../../components/business/ProductCard';
import { Product } from '../../types';
import { Plus, Package, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BusinessProducts: React.FC = () => {
  const { products, updateProduct, setActiveTab } = useBusiness();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // States for the inline Edit Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editCategory, setEditCategory] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStock, setEditStock] = useState<Product['stock']>('In Stock');

  const categories = ['All', 'Food', 'Drinks', 'Desserts', 'Offers'];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditCategory(product.category);
    setEditDesc(product.description);
    setEditStock(product.stock);
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editName,
      price: editPrice,
      category: editCategory,
      description: editDesc,
      stock: editStock
    });

    closeEditModal();
  };

  return (
    <div id="products-view-wrapper" className="space-y-5 pb-24">
      {/* 1. Header with Add Trigger */}
      <div id="products-header-row" className="flex justify-between items-center bg-zinc-950/60 py-2">
        <div>
          <h1 id="products-main-heading" className="text-xl font-bold font-sans text-zinc-100">Products</h1>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Control catalog pricing, stock and visibility</p>
        </div>
        
        <button
          id="btn-goto-add-product"
          onClick={() => setActiveTab('addProduct')}
          className="flex items-center gap-1 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-400/5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5px]" />
          Add Product
        </button>
      </div>

      {/* 2. Horizontal category filters */}
      <div id="categories-slider-nav" className="overflow-x-auto -mx-4 px-4 scrollbar-none pb-1 flex gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = cat === 'All'
            ? products.length
            : products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

          return (
            <button
              id={`cat-btn-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-sans tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-455 border border-zinc-900 hover:text-zinc-200'
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

      {/* 3. Products interactive listing */}
      <div id="products-list-grid" className="space-y-3.5 pt-1">
        <AnimatePresence mode="popLayout animate-fadeIn">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
              />
            ))
          ) : (
            <div id="products-blank-panel" className="text-center py-16 px-6 bg-zinc-900 border border-zinc-900 rounded-2xl flex flex-col items-center">
              <div className="w-12 h-12 bg-zinc-950 rounded-full flex items-center justify-center text-zinc-650 border border-zinc-850 mb-3">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-zinc-300 font-bold text-sm font-sans">No products registered</h3>
              <p className="text-zinc-550 text-xs mt-1 max-w-xs font-sans">
                Wait! There are no items registered in the &quot;{selectedCategory}&quot; category list yet.
              </p>
              <button
                id="btn-trigger-add-empty"
                onClick={() => setActiveTab('addProduct')}
                className="mt-4 bg-zinc-800 text-amber-400 font-semibold text-xs px-4 py-2 rounded-xl hover:bg-zinc-750 transition-colors cursor-pointer border border-zinc-750"
              >
                Register First Product
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Inline Edit Modal overlay */}
      <AnimatePresence>
        {editingProduct && (
          <div id="edit-product-modal" className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              id="edit-modal-cube"
              className="bg-zinc-950 border border-zinc-850 rounded-t-3xl max-w-md w-full p-6 pb-8 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div id="edit-header" className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 font-sans">Edit Product</h3>
                  <p className="text-[10px] text-zinc-500 font-sans">ID: {editingProduct.id}</p>
                </div>
                <button
                  id="btn-close-edit-modal"
                  type="button"
                  onClick={closeEditModal}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form id="edit-product-form" onSubmit={handleSaveEdit} className="space-y-4 text-left font-sans text-xs">
                {/* Image overview thumbnail */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-850">
                  <img src={editingProduct.image} alt={editingProduct.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <span className="text-[10px] text-zinc-505 block">Thumbnail Preview</span>
                    <span className="text-zinc-400 text-xs italic">Asset locked during quick edit</span>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">Product Name</label>
                  <input
                    id="edit-prod-name"
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                {/* Grid for Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">Price (DA)</label>
                    <input
                      id="edit-prod-price"
                      type="number"
                      required
                      min="0"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  {/* Stock level */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">Stock Status</label>
                    <select
                      id="edit-prod-stock"
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value as Product['stock'])}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400 font-sans"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5 pb-1">
                  <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">Category</label>
                  <select
                    id="edit-prod-category"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400 font-sans"
                  >
                    <option value="Food">Food</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Offers">Offers</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">Description</label>
                  <textarea
                    id="edit-prod-desc"
                    required
                    rows={2}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400 placeholder-zinc-550 resize-none font-sans"
                  />
                </div>

                {/* Save button */}
                <div className="pt-2 flex gap-3">
                  <button
                    id="btn-cancel-edit"
                    type="button"
                    onClick={closeEditModal}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 py-3 rounded-xl font-bold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-save-edit"
                    type="submit"
                    className="flex-1 bg-amber-400 hover:bg-amber-500 text-black py-3 rounded-xl font-bold font-sans cursor-pointer transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
