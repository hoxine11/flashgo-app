import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { UploadProductImage } from '../../components/business/UploadProductImage';
import { ChevronLeft, Save, Sparkles } from 'lucide-react';

export const AddProduct: React.FC = () => {
  const { addProduct, setActiveTab } = useState(''); // wait, useBusiness has addProduct and setActiveTab, wait! Let me use useBusiness correctly:
  const { addProduct: contextAddProduct, setActiveTab: contextSetActiveTab } = useBusiness();

  // Local Form state fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300'); // default burger template initially
  const [isActive, setIsActive] = useState(true);

  const [formError, setFormError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Please enter a valid positive price amount.');
      return;
    }
    if (!description.trim()) {
      setFormError('A brief product description is highly recommended.');
      return;
    }
    if (!image) {
      setFormError('Please choose or upload a product photo first.');
      return;
    }

    // Call addProduct from context
    contextAddProduct({
      name,
      price: numPrice,
      category,
      description,
      image,
      stock: 'In Stock',
      active: isActive
    });

    // Take them straight back to the Products inventory tab to see it!
    contextSetActiveTab('products');
  };

  return (
    <div id="add-product-wrapper" className="space-y-5 pb-24 text-left">
      {/* Back button and page title header */}
      <div id="add-product-header" className="flex items-center gap-2 bg-zinc-950/60 py-2">
        <button
          id="btn-back-to-products"
          onClick={() => contextSetActiveTab('products')}
          className="p-2 bg-zinc-900 border border-zinc-850 rounded-xl hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
          title="Back to products list"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 id="add-product-title" className="text-xl font-bold font-sans text-zinc-100">Add Product</h1>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Register new items to your digital shop front</p>
        </div>
      </div>

      <form id="add-product-form" onSubmit={handleSave} className="space-y-4 font-sans text-xs">
        {/* Large Product Image Upload Area */}
        <UploadProductImage imageValue={image} onChangeValue={setImage} />

        {formError && (
          <div id="form-error-div" className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-sans text-[11px] font-medium leading-normal animate-pulse">
            ⚠️ {formError}
          </div>
        )}

        {/* Product Name Field */}
        <div id="field-product-name" className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">
            Product Name
          </label>
          <input
            id="input-product-name"
            type="text"
            required
            placeholder="e.g. Burger Classic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-4 text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-amber-400 transition-colors font-sans text-xs"
          />
        </div>

        {/* Pricing & Category in row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div id="field-product-price" className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">
              Price (DA)
            </label>
            <input
              id="input-product-price"
              type="number"
              required
              min="0"
              placeholder="e.g. 900"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-4 text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-amber-400 transition-colors font-mono text-xs"
            />
          </div>

          {/* Category SELECT */}
          <div id="field-product-category" className="space-y-1.5">
            <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">
              Category
            </label>
            <select
              id="select-product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-4 text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors font-sans text-xs"
            >
              <option value="Food">Food</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Offers">Offers</option>
            </select>
          </div>
        </div>

        {/* Description Field */}
        <div id="field-product-desc" className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase font-sans">
            Description
          </label>
          <textarea
            id="textarea-product-desc"
            required
            rows={3}
            placeholder="Describe your product taste, size and raw ingredients..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-850 rounded-xl py-3 px-4 text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-amber-400 transition-colors resize-none font-sans text-xs leading-relaxed"
          />
        </div>

        {/* Availability Active Switch */}
        <div id="field-product-availability" className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-850/60">
          <div>
            <span className="font-bold text-zinc-200 font-sans block">Instant Shop Availability</span>
            <span className="text-[10px] text-zinc-500 font-sans block mt-1">If enabled, clients can buy this product immediately</span>
          </div>
          
          <button
            id="toggle-availability-switch"
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isActive ? 'bg-amber-400' : 'bg-zinc-800'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-zinc-950 shadow ring-0 transition duration-200 ease-in-out ${
                isActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Save Product Submit Action */}
        <button
          id="btn-submit-product"
          type="submit"
          className="w-full bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-amber-500/5 cursor-pointer flex items-center justify-center gap-2 mt-4"
        >
          <Save className="w-4 h-4 stroke-[2.5px]" />
          Save Product
        </button>
      </form>
    </div>
  );
};
