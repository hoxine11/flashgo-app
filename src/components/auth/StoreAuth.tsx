import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Store, Plus, Trash2, Edit2, CheckCircle2, ShoppingBag, Eye, LogOut, Heart, Search, HelpCircle, Package, Shirt, Pizza, Coffee, Columns } from 'lucide-react';

interface StoreAuthProps {
  lang: 'ar' | 'en';
  onBackToSelection: () => void;
  onSuccess: (storeData: { name: string; category: string; phone: string }) => void;
  onSwitchToLogin?: () => void;
}

interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: string;
  categoryEn: string;
  image: string;
  inStock: boolean;
}

export default function StoreAuth({ lang, onBackToSelection, onSuccess, onSwitchToLogin }: StoreAuthProps) {
  const isAr = lang === 'ar';

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Registration, 2: Category select, 3: Product management Dashboard Mock
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('restaurant');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Initial Product Catalog for store manager dashboard simulation
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', name: 'برجر كلاسيك لحم مشوي', nameEn: 'Grilled Classic Beef Burger', price: 650, category: 'مأكولات', categoryEn: 'Foods', image: '🍔', inStock: true },
    { id: 'p2', name: 'بيتزا دجاج رويال حجم عائلي', nameEn: 'Royal Chicken Pizza Family', price: 950, category: 'مأكولات', categoryEn: 'Foods', image: '🍕', inStock: true },
    { id: 'p3', name: 'بطاطا مقلية مقرمشة سبايسي', nameEn: 'Crispy French Fries Spicy', price: 250, category: 'مقبلات', categoryEn: 'Sides', image: '🍟', inStock: true },
    { id: 'p4', name: 'مشروب غازي كوكا كولا مثلج', nameEn: 'Ice Cola Drink Can', price: 120, category: 'مشروبات', categoryEn: 'Beverages', image: '🥤', inStock: false },
  ]);

  // Form states for creating new products
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdEmoji, setNewProdEmoji] = useState('🍔');

  const STORE_TYPES = [
    { id: 'grocery', title: isAr ? 'مواد تغذية وبقالة' : 'Grocery Market', icon: ShoppingBag, color: 'text-amber-400 bg-amber-500/10', emoji: '🥦' },
    { id: 'restaurant', title: isAr ? 'مطعم وجبات سريعة' : 'Restaurant Partner', icon: Pizza, color: 'text-yellow-400 bg-yellow-400/10', emoji: '🍔' },
    { id: 'fashion', title: isAr ? 'ملابس وأزياء وموضة' : 'Fashion & Retail', icon: Shirt, color: 'text-orange-400 bg-orange-400/10', emoji: '👚' },
    { id: 'packaging', title: isAr ? 'مستلزمات شحن وتعبئة' : 'Packaging & Boxes', icon: Package, color: 'text-yellow-500 bg-yellow-500/10', emoji: '📦' },
    { id: 'pharmacy', title: isAr ? 'صيدلية ومستحضرات طبية' : 'Pharmacy', icon: Coffee, color: 'text-red-400 bg-red-400/10', emoji: '💊' }
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !phone || !email || !password) {
      setErrorMsg(isAr ? 'برجاء تعبئة كافة حقول الشريك التجاري' : 'Please fill out all store coordinates');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleSelectCategory = (catId: string) => {
    setStoreCategory(catId);
    setStep(3); // transition to live product listing manager dashboard
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName && !newProdNameEn) return;

    const added: Product = {
      id: `p_${Date.now()}`,
      name: newProdName || newProdNameEn,
      nameEn: newProdNameEn || newProdName,
      price: Number(newProdPrice) || 300,
      category: isAr ? 'منتجات إضافية' : 'Custom Additions',
      categoryEn: 'Custom Additions',
      image: newProdEmoji,
      inStock: true
    };

    setProducts(prev => [added, ...prev]);
    setNewProdName('');
    setNewProdNameEn('');
    setNewProdPrice('');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleToggleStock = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    }));
  };

  const handleSaveAndExit = () => {
    onSuccess({
      name: storeName || 'Fast Restaurant Partner',
      category: storeCategory,
      phone: phone
    });
  };

  return (
    <div className="w-full text-white bg-[#050505] p-5 rounded-3xl" dir={isAr ? 'rtl' : 'ltr'}>
      
      <AnimatePresence mode="wait">
        
        {/* Step 1: Store Registration Coordinates (Screen 8 mapping) */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-400/10 text-amber-400 flex items-center justify-center rounded-2xl mx-auto border border-amber-400/20 mb-2">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-black text-base">{isAr ? 'بوابة تسجيل متجر / مطعم فلاش' : 'Store Registration'}</h3>
              <p className="text-[10px] text-neutral-400">{isAr ? 'أطلق مبيعاتك وسهّل توصيل طلبيتك لجميع المستخدمين' : 'Register as a store or restaurant partner with Flash'}</p>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-xl text-[10px] font-bold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleStep1Submit} className="space-y-3.5">
              {/* Store Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide text-neutral-450 block">{isAr ? 'اسم المتجر أو العلامة التجارية' : 'Store / Restaurant Name'}</label>
                <input
                  type="text"
                  placeholder={isAr ? 'مثال: برجر هاوس ياسمين' : 'e.g., Yasmin Burger House'}
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 px-3.5 py-2 rounded-xl text-xs outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Store Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide text-neutral-450 block">{isAr ? 'رقم الاتصال المباشر (الجزائر)' : 'Store Phone'}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-[10px] font-mono text-neutral-500 font-bold">🇩🇿 +213</span>
                  <input
                    type="tel"
                    placeholder="550 82 92 12"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 pl-20 pr-3.5 py-2 rounded-xl text-xs outline-none focus:border-amber-400 font-mono"
                    required
                  />
                </div>
              </div>

              {/* Store Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide text-neutral-450 block">{isAr ? 'البريد الإلكتروني التجاري' : 'Business Email'}</label>
                <input
                  type="email"
                  placeholder="contact@store.dz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 px-3.5 py-2 rounded-xl text-xs outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Store Password */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wide text-neutral-450 block">{isAr ? 'كلمة المرور' : 'Password'}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-900 text-neutral-200 pl-10 pr-3.5 py-2 rounded-xl text-xs outline-none focus:border-amber-400 font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-3 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={onBackToSelection}
                  className="flex-1 bg-[#111111] border border-neutral-900 text-xs py-2.5 rounded-xl font-bold"
                >
                  {isAr ? 'رجوع' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-400 text-black text-xs py-2.5 rounded-xl font-black flex items-center justify-center gap-1 hover:bg-amber-300"
                >
                  <span>{isAr ? 'التالي' : 'Next'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>

              {onSwitchToLogin && (
                <div className="text-center pt-4 border-t border-neutral-900 mt-4">
                  <span className="text-[10px] text-neutral-550 font-sans">
                    {isAr ? 'لديك حساب متجر بالفعل؟' : "Already have a merchant shop?"}{' '}
                  </span>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[10px] font-black text-amber-500 hover:text-amber-400 hover:underline bg-transparent border-none cursor-pointer"
                  >
                    {isAr ? 'تسجيل الدخول' : 'Login'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        )}

        {/* Step 2: Store Category Selector (Grocery, Restaurant, Fashion, Packaging, Pharmacy) */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            <div className="text-center">
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-widest">{isAr ? 'اختيار فئة المتجر' : 'Category Select'}</span>
              <h3 className="font-extrabold text-white text-base mt-0.5">{isAr ? 'اختر تصنيف نشاط محلّك التجاري' : 'Establish Store Category'}</h3>
              <p className="text-[10px] text-neutral-450">{isAr ? 'سيظهر متجرك في هذا القسم من التطبيق فور تفعيل حسابكم' : 'Where customers will discover your listings in the app'}</p>
            </div>

            <div className="space-y-2.5">
              {STORE_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    onClick={() => handleSelectCategory(type.id)}
                    className="flex items-center justify-between p-3.5 bg-[#111111] hover:bg-neutral-900 border border-neutral-900 hover:border-amber-400/40 rounded-2xl cursor-pointer transition-all active:scale-99 group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${type.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-neutral-200 group-hover:text-amber-400 transition-colors">{type.title}</span>
                    </div>
                    <span className="text-xl">{type.emoji}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-[#111111] border border-neutral-900 text-xs py-2.5 rounded-xl font-bold"
            >
              {isAr ? 'الرجوع ومراجعة البيانات' : 'Back to details'}
            </button>
          </motion.div>
        )}

        {/* Step 3: Product Management Mock UI Panel (Dashboard Simulation) */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* Store Top Dashboard Header Bar */}
            <div className="p-3 bg-[#111111] border border-neutral-900 rounded-2xl flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[9px] font-bold font-mono text-emerald-400">● {isAr ? 'متصل ومحقق' : 'VERIFIED PARTNER'}</span>
                <h3 className="font-black text-xs text-neutral-100">{storeName || 'My Snack Shop'}</h3>
                <p className="text-[9px] text-neutral-400 font-mono capitalize">⚡ Category: {storeCategory}</p>
              </div>

              {/* Open/Close Simulator Toggle Switch */}
              <button
                onClick={() => setIsStoreOpen(!isStoreOpen)}
                className={`px-3 py-1 rounded-full text-[9px] font-black transition-all ${isStoreOpen ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30' : 'bg-red-400/10 text-red-400 border border-red-400/30'}`}
              >
                {isStoreOpen ? (isAr ? 'المتجر مفتوح 🟢' : 'Accepting orders 🟢') : (isAr ? 'المتجر مغلق 🔴' : 'Closed 🔴')}
              </button>
            </div>

            {/* Product Addition Quick Form */}
            <form onSubmit={handleAddProduct} className="p-3 bg-neutral-950 border border-neutral-900 rounded-2xl space-y-2.5">
              <span className="text-[10px] uppercase tracking-wide font-black text-amber-400 block pb-1 border-b border-neutral-900">
                ➕ {isAr ? 'إدراج منتج أو وجبة جديدة' : 'Add New Item & Price'}
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={isAr ? 'اسم المنتج بالعربية' : 'Item Name (Arabic)'}
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="bg-[#111111] border border-neutral-900 text-neutral-200 px-2.5 py-1.5 rounded-lg text-[10.5px] outline-none"
                />
                <input
                  type="text"
                  placeholder={isAr ? 'الاسم بالإنجليزية' : 'Item Name (English)'}
                  value={newProdNameEn}
                  onChange={(e) => setNewProdNameEn(e.target.value)}
                  className="bg-[#111111] border border-neutral-900 text-neutral-200 px-2.5 py-1.5 rounded-lg text-[10.5px] outline-none"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={isAr ? 'السعر (دج)' : 'Price DA'}
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="bg-[#111111] border border-neutral-900 text-neutral-200 px-2.5 py-1.5 rounded-lg text-[10.5px] outline-none flex-1 font-mono"
                  required
                />
                
                {/* Visual Emojis grid selector */}
                <select
                  value={newProdEmoji}
                  onChange={(e) => setNewProdEmoji(e.target.value)}
                  className="bg-[#111111] border border-neutral-900 text-neutral-200 px-2.5 py-1.5 rounded-lg text-[10.5px] font-sans"
                >
                  <option value="🍔">🍔 Burger</option>
                  <option value="🍕">🍕 Pizza</option>
                  <option value="🥤">🥤 Drink</option>
                  <option value="🍦">🍦 Dessert</option>
                  <option value="🥦">🥦 Veggie</option>
                  <option value="💊">💊 Pharma</option>
                  <option value="👚">👚 Cloth</option>
                </select>

                <button
                  type="submit"
                  className="bg-amber-400 text-black px-4 py-1.5 rounded-lg font-black text-[11px] hover:bg-amber-300 transition-colors shrink-0"
                >
                  {isAr ? 'إضافة' : 'Insert'}
                </button>
              </div>
            </form>

            {/* Live mockup product catalog table */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <span className="text-[10px] text-neutral-500 font-bold block px-1">
                📦 {isAr ? 'قائمة المنتجات النشطة بالمنيو' : 'Active Storefront Inventory'} ({products.length})
              </span>

              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 bg-[#111111] border border-neutral-900 rounded-xl text-xs gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl bg-neutral-950 p-1.5 rounded-lg shrink-0">{p.image}</span>
                    <div className="min-w-0">
                      <h5 className="font-bold text-neutral-200 truncate text-[11px]">{isAr ? p.name : p.nameEn}</h5>
                      <p className="text-[10px] text-amber-500 font-mono font-bold tracking-tight">{p.price} {isAr ? 'دج' : 'DA'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Stock switch checkbox */}
                    <button
                      type="button"
                      onClick={() => handleToggleStock(p.id)}
                      className={`px-2 py-0.5 rounded text-[8px] font-bold ${p.inStock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}
                    >
                      {p.inStock ? (isAr ? 'جاهز' : 'In Stock') : (isAr ? 'نفذ' : 'Sold Out')}
                    </button>

                    {/* Delete item button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-1 rounded bg-neutral-950 hover:bg-neutral-800 text-neutral-500 hover:text-red-400 transition-colors"
                      title={isAr ? 'حذف' : 'Remove'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Master Onboarding completion button */}
            <div className="pt-2 border-t border-neutral-900 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-neutral-950 border border-neutral-900 text-xs py-2 px-3 rounded-xl text-neutral-400 font-bold font-sans"
              >
                {isAr ? 'تغيير الفئة' : 'Category'}
              </button>
              
              <button
                onClick={handleSaveAndExit}
                className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black py-2.5 rounded-xl text-xs font-black hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-400/10 flex items-center justify-center gap-1.5"
              >
                <span>🔥 {isAr ? 'حفظ المنيو وتفعيل المتجر' : 'Publish Catalog'}</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
