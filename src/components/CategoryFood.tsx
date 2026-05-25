import { useState } from 'react';
import { ArrowLeft, Search, Plus, Minus, ShoppingCart, ArrowRight, Heart, Timer, Star } from 'lucide-react';
import { FOOD_ITEMS } from '../data/mockData';
import { Order, UserProfile, FoodItem } from '../types';

interface CategoryFoodProps {
  lang: 'ar' | 'en';
  onBack: () => void;
  onSubmitOrder: (order: Partial<Order>) => void;
  user: UserProfile;
}

const RESTAURANTS = [
  { id: 'pizza-house', name: 'بيتزا هاوس', nameEn: 'Pizza House', logo: '🍕', rating: 4.6, time: '٣٠ - ٤٠ دقيقة', timeEn: '30-40 min', banner: 'bg-red-950/20' },
  { id: 'burger-prince', name: 'برجر برينس', nameEn: 'Burger Prince', logo: '🍔', rating: 4.7, time: '٢٥ - ٣٥ دقيقة', timeEn: '25-35 min', banner: 'bg-amber-950/20' },
  { id: 'traditional-grills', name: 'مشويات البلد القديمة', nameEn: 'Traditional Grills', logo: '🍢', rating: 4.8, time: '٣٥ - ٤٥ دقيقة', timeEn: '35-45 min', banner: 'bg-orange-950/20' },
  { id: 'sweet-palace', name: 'قصر الحلويات والتشيز كيك', nameEn: 'Sweet Palace', logo: '🍩', rating: 4.5, time: '١٥ - ٢٥ دقيقة', timeEn: '15-25 min', banner: 'bg-pink-950/20' },
];

export default function CategoryFood({ lang, onBack, onSubmitOrder, user }: CategoryFoodProps) {
  const isAr = lang === 'ar';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'burger' | 'pizza' | 'grills' | 'sweets'>('burger');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeRestaurantId, setActiveRestaurantId] = useState<string>('burger-prince');

  // Cart: item_id -> quantity
  const [cart, setCart] = useState<Record<string, number>>({});

  const handleAddToCart = (id: string, restaurantId: string) => {
    // If cart has items from another restaurant, confirm or just shift restaurant
    const hasOtherRestItems = Object.keys(cart).some(cartItemId => {
      const foodItem = FOOD_ITEMS.find(f => f.id === cartItemId);
      return foodItem && foodItem.restaurantId !== restaurantId;
    });

    if (hasOtherRestItems) {
      // Automatic clear cart from other restaurant for simple appler UX
      setCart({ [id]: 1 });
      setActiveRestaurantId(restaurantId);
    } else {
      setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setActiveRestaurantId(restaurantId);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => {
      const updated = { ...prev };
      if (!updated[id]) return prev;
      if (updated[id] === 1) {
        delete updated[id];
      } else {
        updated[id]--;
      }
      return updated;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Base list
  const currentRestaurant = RESTAURANTS.find(r => r.id === activeRestaurantId) || RESTAURANTS[1];

  // Filtering
  const filteredFood = FOOD_ITEMS.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (searchQuery.trim() === '') return true;

    const query = searchQuery.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(query) || item.nameEn.toLowerCase().includes(query);
    const descMatch = item.description.toLowerCase().includes(query) || item.descriptionEn.toLowerCase().includes(query);
    return nameMatch || descMatch;
  });

  // Calculations
  const cartItemCount = (Object.values(cart) as number[]).reduce((sum, q) => sum + q, 0);
  const cartSubtotal = (Object.entries(cart) as [string, number][]).reduce((sum, [id, qty]) => {
    const food = FOOD_ITEMS.find(f => f.id === id);
    return sum + (food ? food.price * qty : 0);
  }, 0);
  const deliveryTax = cartItemCount > 0 ? 100.00 : 0.00;
  const cartTotal = cartSubtotal + deliveryTax;

  // Food Category Selector Row (Burger, Pizza, Grills, Sweets)
  const categoryTabs = [
    { id: 'burger', name: 'برجر', nameEn: 'Burgers', emoji: '🍔' },
    { id: 'pizza', name: 'بيتزا', nameEn: 'Pizza', emoji: '🍕' },
    { id: 'grills', name: 'مشويات', nameEn: 'Grills', emoji: '🍢' },
    { id: 'sweets', name: 'حلويات', nameEn: 'Sweets', emoji: '🍰' },
  ] as const;

  const handleCheckout = () => {
    if (cartItemCount === 0) return;

    const itemsList = Object.entries(cart).map(([id, qty]: [string, number]) => {
      const foodItem = FOOD_ITEMS.find(f => f.id === id)!;
      return {
        id: foodItem.id,
        name: foodItem.name,
        nameEn: foodItem.nameEn,
        price: foodItem.price,
        quantity: qty
      };
    });

    const targetRestaurant = RESTAURANTS.find(r => r.id === activeRestaurantId) || RESTAURANTS[1];

    const newOrder: Partial<Order> = {
      category: 'food',
      pickupAddress: `${targetRestaurant.name} - فرع وسط البلد`,
      pickupAddressEn: `${targetRestaurant.nameEn} Restaurant - Downtown`,
      deliveryAddress: isAr ? 'موقعي الحالي (برج الفيصلية)' : 'My Current Location (Faisaliah Tower)',
      deliveryAddressEn: 'My Current Location (Faisaliah Tower)',
      cost: cartTotal,
      storeName: targetRestaurant.name,
      storeNameEn: targetRestaurant.nameEn,
      items: itemsList,
    };

    onSubmitOrder(newOrder);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 text-white font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-neutral-950/90 backdrop-blur-md px-4 py-3 border-b border-neutral-800 flex items-center justify-between sticky top-0 z-30">
        <button onClick={onBack} className="p-1 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer">
          <ArrowLeft className={`h-5 w-5 ${isAr ? '' : 'rotate-180'}`} />
        </button>
        <div className="text-center flex-1">
          <h3 className="font-bold text-sm tracking-tight text-white">
            {isAr ? 'توصيل الأكل' : 'Food Delivery'}
          </h3>
          <p className="text-[10px] text-amber-400">
            {isAr ? 'أطيب الأطباق والوجبات الساخنة لديك' : 'Craving gourmet or local cuisines fast'}
          </p>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto pb-24 px-3 space-y-4 pt-2">
        {/* Food Banner */}
<div className="relative mt-3 h-40 w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950">

  {/* Image */}
  <img
    src="../image/food.png"
    alt="Food Banner"
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

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

  {/* Content */}
  <div className="absolute bottom-4 left-4 right-4 z-10">
    <h2 className="text-lg font-black text-white drop-shadow-lg">
      {isAr ? 'اطلب وجبتك الآن 🍔' : 'Order Your Favorite Meal 🍔'}
    </h2>

    <p className="text-[11px] text-neutral-200 mt-1">
      {isAr
        ? 'توصيل سريع، ساخن، ولذيذ حتى لباب دارك'
        : 'Fast delivery, hot meals & premium taste'}
    </p>
  </div>

</div>
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-500" />
          </div>
          <input
            type="text"
            placeholder={isAr ? 'ابحث عن مطعم أو وجبة معينة...' : 'Search pizza, burger, sweets...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pr-10 pl-3 text-xs outline-none text-neutral-200 placeholder-neutral-550 focus:border-amber-400/50"
          />
        </div>

        {/* Nearby Restaurants "المطاعم القريبة" matching style */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-neutral-200">{isAr ? 'المطاعم القريبة' : 'Nearby Restaurants'}</span>
            <span className="text-[10px] text-amber-500 font-semibold cursor-pointer">{isAr ? 'عرض الكل' : 'View All'}</span>
          </div>

          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {RESTAURANTS.map((rest) => (
              <div
                key={rest.id}
                onClick={() => {
                  setActiveRestaurantId(rest.id);
                  // Auto-switch categories to product in that restaurant for nicer user testing flows
                  if (rest.id === 'pizza-house') setSelectedCategory('pizza');
                  if (rest.id === 'burger-prince') setSelectedCategory('burger');
                  if (rest.id === 'traditional-grills') setSelectedCategory('grills');
                  if (rest.id === 'sweet-palace') setSelectedCategory('sweets');
                }}
                className={`flex-shrink-0 w-36 rounded-xl border p-2.5 cursor-pointer transition-all ${activeRestaurantId === rest.id ? 'bg-neutral-900 border-amber-400' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800'}`}
              >
                <div className={`h-11 rounded-lg ${rest.banner} flex items-center justify-center text-2xl border border-neutral-800/10 mb-2`}>
                  {rest.logo}
                </div>
                <h4 className="text-[11px] font-bold text-neutral-100 line-clamp-1 truncate">{isAr ? rest.name : rest.nameEn}</h4>
                
                <div className="flex items-center justify-between text-[9px] text-neutral-450 mt-1 font-sans">
                  <div className="flex items-center gap-0.5 font-bold text-neutral-300">
                    <Star className="h-2.5 w-2.5 text-amber-400 fill-current" />
                    <span>{rest.rating}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Timer className="h-2.5 w-2.5 text-neutral-500" />
                    <span className="truncate">{isAr ? rest.time : rest.timeEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food Categories (Grid with nice icons) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-neutral-250 px-1 block">{isAr ? 'تصنيفات الأكل من المنيو' : 'Menu Food Categories'}</span>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-900 rounded-xl">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 rounded-lg text-center flex flex-col items-center justify-center transition-all cursor-pointer ${selectedCategory === cat.id ? 'bg-amber-400 text-black shadow' : 'text-neutral-400 hover:text-white'}`}
              >
                <span className="text-sm">{cat.emoji}</span>
                <span className={`text-[9px] font-bold mt-0.5 ${selectedCategory === cat.id ? 'text-black' : 'text-neutral-400'}`}>
                  {isAr ? cat.name : cat.nameEn}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Food Items menu query list */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-neutral-450 font-bold uppercase tracking-wide">
              {isAr ? 'الأطباق والخيارات المتوفرة' : 'Available Dishes OrderNow'}
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">
              🍴 {filteredFood.length} {isAr ? 'أطباق' : 'dishes'}
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredFood.map((item) => {
              const qtyInCart = cart[item.id] || 0;
              const isFav = favorites.includes(item.id);
              
              return (
                <div
                  key={item.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex gap-3 hover:border-neutral-750 transition-all relative group"
                >
                  {/* Photo Emoji placeholder */}
                  <div className="relative flex-shrink-0 bg-neutral-950 h-20 w-20 rounded-lg flex items-center justify-center text-3xl border border-neutral-850">
                    <span>{item.emoji}</span>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-1 right-1 p-1 bg-neutral-900/80 rounded-full border border-neutral-800/25 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Heart className={`h-3 w-3 ${isFav ? 'text-red-500 fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Descriptions block */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-neutral-100">{isAr ? item.name : item.nameEn}</h4>
                      </div>
                      <p className="text-[10px] text-neutral-450 leading-relaxed line-clamp-2 mt-0.5 font-sans">
                        {isAr ? item.description : item.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <span className="text-xs font-extrabold text-amber-400 font-mono">
                        {item.price.toFixed(0)} {isAr ? 'دج' : 'DA'}
                      </span>

                      {/* Add Buttons */}
                      <div className="flex items-center gap-1.5">
                        {qtyInCart > 0 ? (
                          <div className="flex items-center bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-neutral-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs px-2 font-bold font-mono text-neutral-250">
                              {qtyInCart}
                            </span>
                            <button
                              onClick={() => handleAddToCart(item.id, item.restaurantId)}
                              className="text-amber-400 hover:text-amber-500 p-1 rounded transition-colors cursor-pointer"
                            >
                              <Plus className="h-3 w-3 stroke-[3]" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item.id, item.restaurantId)}
                            className="bg-amber-400 hover:bg-amber-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tight transition-all active:scale-95 cursor-pointer"
                          >
                            <span>{isAr ? 'إضافة' : 'Add Item'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart bottom CTA */}
      {cartItemCount > 0 && (
        <div className="absolute bottom-[58px] inset-x-3 bg-amber-400 rounded-2xl p-3 shadow-2xl z-40 text-black flex items-center justify-between border border-amber-300">
          <div className="flex items-center gap-2.5">
            <div className="bg-black text-white h-7 w-7 rounded-lg flex items-center justify-center font-black text-xs">
              {cartItemCount}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold tracking-tight opacity-70 uppercase">
                {isAr ? `من مطعم ${currentRestaurant.name}` : `From ${currentRestaurant.nameEn}`}
              </span>
              <span className="text-sm font-black font-mono leading-none mt-0.5">
                {cartTotal.toFixed(0)} {isAr ? 'دج' : 'DA'}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="bg-black hover:bg-neutral-900 text-white font-black text-xs rounded-xl px-4 py-2 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <span>{isAr ? 'استعرض المطاعم والطلب' : 'Place Food Order'}</span>
            <ArrowRight className={`h-3.5 w-3.5 stroke-[2.5] ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}
