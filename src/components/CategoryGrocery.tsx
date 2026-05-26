import { useState } from 'react';
import { ArrowLeft, Search, ShoppingBag, Plus, Minus, ArrowRight, Store as StoreIcon, HelpCircle } from 'lucide-react';
import { GROCERY_ITEMS, STORES } from '../data/mockData';
import { Order, UserProfile, GroceryItem } from '../types';

interface CategoryGroceryProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onSubmitOrder: (order: Partial<Order>) => void;
  user: UserProfile;
}

export default function CategoryGrocery({ lang, onBack, onSubmitOrder, user }: CategoryGroceryProps) {
  const isAr = lang === 'ar';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState('target'); // Target as default from design
  const [selectedCategory, setSelectedCategory] = useState<string>(isAr ? 'مواد غذائية' : 'Groceries');

  // Cart state: Record of item_id -> quantity
  const [cart, setCart] = useState<Record<string, number>>({});

  // Filters
  const activeStore = STORES.find(s => s.id === selectedStoreId) || STORES[1];

  const handleAddToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveFromCart = (id: string) => {
    if (!cart[id]) return;
    setCart(prev => {
      const updated = { ...prev };
      if (updated[id] === 1) {
        delete updated[id];
      } else {
        updated[id]--;
      }
      return updated;
    });
  };

  // Search filter and category filter

  const filteredProducts = GROCERY_ITEMS.filter(prod => {

    const query = searchQuery.toLowerCase();

    const store = STORES.find(
      s => s.id === prod.storeId
    );

    const matchesSearch =
      searchQuery.trim() === '' ||

      prod.name.toLowerCase().includes(query) ||
      prod.nameEn.toLowerCase().includes(query) ||

      store?.name.toLowerCase().includes(query) ||
      store?.nameEn.toLowerCase().includes(query);

    const matchesCategory =
      isAr
        ? prod.category === selectedCategory
        : prod.categoryEn.toLowerCase() ===
        selectedCategory.toLowerCase();

    const matchesStore =
      prod.storeId === selectedStoreId;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStore
    );

  });



  // Calculate cart amounts
  const cartItemCount = (Object.values(cart) as number[]).reduce((sum, q) => sum + q, 0);
  const cartSubtotal = (Object.entries(cart) as [string, number][]).reduce((sum, [id, qty]) => {
    const prod = GROCERY_ITEMS.find(p => p.id === id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);
  const deliveryFee = cartItemCount > 0 ? 120 : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Checkout submit order
  const handleCheckout = () => {
    if (cartItemCount === 0) return;

    const itemsList = Object.entries(cart).map(([id, qty]: [string, number]) => {
      const prod = GROCERY_ITEMS.find(p => p.id === id)!;
      return {
        id: prod.id,
        name: prod.name,
        nameEn: prod.nameEn,
        price: prod.price,
        quantity: qty
      };
    });

    const newOrder: Partial<Order> = {
      category: 'grocery',
      pickupAddress: `${activeStore.name} - فرع العليا`,
      pickupAddressEn: `${activeStore.nameEn} Hypermarket - Olaya branch`,
      deliveryAddress: isAr ? 'موقعي الحالي (برج الفيصلية)' : 'My Current Location (Faisaliah Tower)',
      deliveryAddressEn: 'My Current Location (Faisaliah Tower)',
      cost: cartTotal,
      storeName: activeStore.name,
      storeNameEn: activeStore.nameEn,
      items: itemsList,
    };

    onSubmitOrder(newOrder);
  };

  const groceryCategories = isAr
    ? ['مواد غذائية', 'منظفات', 'عناية شخصية']
    : ['Groceries', 'Detergents', 'Personal Care'];

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-neutral-950/90 backdrop-blur-md px-4 py-3 border-b border-neutral-800 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onBack} className="p-1 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer">
          <ArrowLeft className={`h-5 w-5 ${isAr ? '' : 'rotate-180'}`} />
        </button>
        <div className="text-center flex-1">
          <h3 className="font-bold text-sm tracking-tight text-white">
            {isAr ? 'قضاء الحاجيات' : 'Grocery Errands'}
          </h3>
          <p className="text-[10px] text-amber-400">
            {isAr ? 'نشتري لك ما تحتاجه ونوصله لبابك' : 'We purchase and deliver your shopping lists'}
          </p>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto pb-24 px-3 space-y-4 pt-2">
        {/* Grocery Banner */}
        <div className="relative mt-3 h-40 w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">

          {/* Image */}
          <img
            src="/image/alimentation.png"
            alt="Grocery Banner"
            className="
      w-full
      h-full
      object-cover
      object-center
      brightness-90
      contrast-110
      saturate-110
    "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Text */}
          <div className="absolute bottom-4 left-4 right-4 z-10">

            <h2 className="text-lg font-black text-white drop-shadow-lg">
              {isAr ? 'تسوق براحتك 🛒' : 'Smart Grocery Shopping 🛒'}
            </h2>

            <p className="text-[11px] text-neutral-200 mt-1">
              {isAr
                ? 'نوصل مشترياتك بسرعة حتى لباب دارك'
                : 'Fast delivery for groceries & essentials'}
            </p>

          </div>

        </div>
        {/* Search Bar matching design */}
        <div className="relative">
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن منتج أو متجر تجاري...' : 'Search for soap, milk, store item...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pr-10 pl-3 text-xs outline-none text-neutral-200 placeholder-neutral-500 focus:border-amber-400/50"
          />
        </div>

        {/* Stores Carousel "اختر المتجر" */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-neutral-200">{isAr ? 'اختر المتجر' : 'Selected Store'}</span>
            <span className="text-[10px] text-amber-500 font-semibold cursor-pointer">{isAr ? 'عرض الكل' : 'View All'}</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {STORES.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  setSelectedStoreId(st.id);
                  // Preserve correct initial categories translation
                  setSelectedCategory(isAr ? 'مواد غذائية' : 'Groceries');
                }}
                className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${selectedStoreId === st.id ? 'bg-neutral-900 border-amber-400/80 shadow-md shadow-amber-400/5' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800'}`}
              >
                <div className="h-12 w-12 overflow-hidden rounded-xl bg-white flex items-center justify-center">

                  <img
                    src={st.logo}
                    alt={st.name}
                    className="
      w-full
      h-full
      object-cover
     
    "
                  />

                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-neutral-200">{isAr ? st.name : st.nameEn}</span>
                  <span className="text-[9px] text-amber-400 font-medium font-sans">★ {st.rating} • {isAr ? st.deliveryTime : st.deliveryTimeEn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Toggler Tabs */}
        <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl">
          {groceryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 py-1.5 rounded-lg text-center text-xs font-medium cursor-pointer transition-all ${selectedCategory === cat ? 'bg-amber-400 text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="space-y-2.5">
          <div className="px-1 text-[11px] text-neutral-450 uppercase tracking-wider font-semibold">
            {isAr ? `منتجات متوفرة في ${activeStore.name}` : `Products available in ${activeStore.nameEn}`}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 bg-neutral-900/50 rounded-2xl border border-neutral-800 text-neutral-500 text-xs">
              {isAr ? 'لا توجد نتائج مطابقة، جرب كلمة أخرى!' : 'No matching products. Try another word!'}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {filteredProducts.map((prod) => {
                const qtyInCart = cart[prod.id] || 0;
                return (
                  <div
                    key={prod.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col justify-between hover:border-neutral-750 transition-all group"
                  >
                    <div className="relative">
                      {/* Product Emoji */}
                      <div className="bg-neutral-950 rounded-lg h-20 flex items-center justify-center text-3xl mb-2 border border-neutral-850 group-hover:scale-105 duration-300">

                        <img
                          src={prod.image}
                          alt={isAr ? prod.name : prod.nameEn}
                          className="
    w-full
    h-full
    object-cover
    rounded-lg
  "
                        />

                      </div>
                      {/* Badge if item in cart */}
                      {qtyInCart > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black font-black text-[9px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-neutral-900">
                          {qtyInCart}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-neutral-500 font-mono font-bold block">
                        {isAr ? prod.unit : prod.unitEn}
                      </span>
                      <h5 className="text-xs font-bold text-neutral-100 line-clamp-1">{isAr ? prod.name : prod.nameEn}</h5>
                      <span className="text-xs font-extrabold text-amber-400 font-mono block">
                        {prod.price.toFixed(0)} {isAr ? 'دج' : 'DA'}
                      </span>
                    </div>

                    {/* Cart operations */}
                    <div className="mt-3 flex gap-1.5">
                      {qtyInCart > 0 ? (
                        <>
                          <button
                            onClick={() => handleRemoveFromCart(prod.id)}
                            className="bg-neutral-800 hover:bg-neutral-700 p-1.5 rounded-lg text-white transition-colors cursor-pointer flex-1 flex justify-center"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleAddToCart(prod.id)}
                            className="bg-amber-400 hover:bg-amber-500 p-1.5 rounded-lg text-black transition-colors cursor-pointer flex-1 flex justify-center"
                          >
                            <Plus className="h-3 w-3 stroke-[3]" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(prod.id)}
                          className="bg-neutral-850 hover:bg-neutral-800 text-neutral-200 border border-neutral-800/80 px-2 py-1.5 rounded-lg w-full text-[10px] font-bold transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                        >
                          <ShoppingBag className="h-3 w-3 text-amber-400" />
                          <span>{isAr ? 'أضف للسلة' : 'Add to Cart'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Cart Overlay */}
      {cartItemCount > 0 && (
        <div className="absolute bottom-[58px] inset-x-3 bg-amber-400 rounded-2xl p-3 shadow-2xl z-40 text-black flex items-center justify-between border border-amber-300">
          <div className="flex items-center gap-2.5">
            <div className="bg-black text-white h-7 w-7 rounded-lg flex items-center justify-center font-black text-xs">
              {cartItemCount}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-tight uppercase opacity-70">
                {isAr ? 'مشترياتك الحالية' : 'Shopping List total'}
              </span>
              <span className="text-sm font-black font-mono leading-none">
                {cartTotal.toFixed(0)} {isAr ? 'دج' : 'DA'} <span className="text-[9px] font-normal opacity-70">({isAr ? 'شاملاً التوصيل' : 'incl. delivery fee'})</span>
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-black hover:bg-neutral-900 text-white font-black text-xs tracking-tight rounded-xl px-4 py-2 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <span>{isAr ? 'ابدأ التسوق' : 'Order Now'}</span>
            <ArrowRight className={`h-3.5 w-3.5 stroke-[2.5] ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}
