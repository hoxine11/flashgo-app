
export const STORES: Store[] = [
  {
    id: 'carrefour',
    name: 'كارفور',
    nameEn: 'Carrefour',
    logo: '/image/carrefour.png',
    rating: 4.7,
  },
  {
    id: 'zaki',
    name: 'زكي للتغليف',
    nameEn: 'Zaki Emballage',
    logo: '/image/zaki.png',
    rating: 4.8,
  },
  {
    id: 'zara',
    name: 'زارا',
    nameEn: 'Zara',
    logo: '/image/zara.png',
    rating: 4.6,
  }
];

export const GROCERY_ITEMS: GroceryItem[] = [

  // =========================================
  // CARREFOUR PRODUCTS
  // =========================================

  {
    id: 'car_1',
    name: 'حليب كامل الدسم',
    nameEn: 'Full Cream Milk',
    price: 150,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '1L',
    unitEn: '1L',
    image: '/image/milk.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_2',
    name: 'أرز بسمتي',
    nameEn: 'Basmati Rice',
    price: 950,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '5KG',
    unitEn: '5KG',
    image: '/image/rice.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_3',
    name: 'كوكا كولا',
    nameEn: 'Coca Cola',
    price: 120,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '1L',
    unitEn: '1L',
    image: '/image/coca.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_4',
    name: 'رقائق البطاطس',
    nameEn: 'Potato Chips',
    price: 180,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '150g',
    unitEn: '150g',
    image: '/image/chips.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_5',
    name: 'مياه معدنية',
    nameEn: 'Mineral Water',
    price: 70,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '1.5L',
    unitEn: '1.5L',
    image: '/image/water.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_6',
    name: 'شوكولاتة',
    nameEn: 'Chocolate',
    price: 250,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '100g',
    unitEn: '100g',
    image: '/image/choco.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_7',
    name: 'قهوة',
    nameEn: 'Coffee',
    price: 650,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '250g',
    unitEn: '250g',
    image: '/image/coffee.png',
    storeId: 'carrefour'
  },

  {
    id: 'car_8',
    name: 'سكر أبيض',
    nameEn: 'White Sugar',
    price: 140,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '1KG',
    unitEn: '1KG',
    image: '/image/sugar.png',
    storeId: 'carrefour'
  },

  // =========================================
  // ZARA PRODUCTS
  // =========================================

  {
    id: 'zara_1',
    name: 'حذاء رياضي أبيض',
    nameEn: 'White Sneakers',
    price: 8500,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: '42',
    unitEn: '42',
    image: '/image/shoes1.png',
    storeId: 'zara'
  },

  {
    id: 'zara_2',
    name: 'هودي أسود',
    nameEn: 'Black Hoodie',
    price: 6200,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: 'XL',
    unitEn: 'XL',
    image: '/image/hoodie.png',
    storeId: 'zara'
  },

  {
    id: 'zara_3',
    name: 'جينز أزرق',
    nameEn: 'Blue Jeans',
    price: 7200,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: '32',
    unitEn: '32',
    image: '/image/jeans.png',
    storeId: 'zara'
  },

  {
    id: 'zara_4',
    name: 'تيشيرت أبيض',
    nameEn: 'White T-Shirt',
    price: 3200,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: 'L',
    unitEn: 'L',
    image: '/image/tshirt.png',
    storeId: 'zara'
  },

  {
    id: 'zara_5',
    name: 'حقيبة يد',
    nameEn: 'Hand Bag',
    price: 9800,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: '1pc',
    unitEn: '1pc',
    image: '/image/bag.png',
    storeId: 'zara'
  },

  // =========================================
  // ZAKI EMBALLAGE PRODUCTS
  // =========================================

  {
    id: 'zak_1',
    name: 'كرتون تغليف',
    nameEn: 'Packaging Box',
    price: 300,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: 'Large',
    unitEn: 'Large',
    image: '/image/box.png',
    storeId: 'zaki'
  },

  {
    id: 'zak_2',
    name: 'ورق فقاعات',
    nameEn: 'Bubble Wrap',
    price: 450,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: '5m',
    unitEn: '5m',
    image: '/image/bubble.png',
    storeId: 'zaki'
  },

  {
    id: 'zak_3',
    name: 'شريط لاصق',
    nameEn: 'Adhesive Tape',
    price: 120,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: '1pc',
    unitEn: '1pc',
    image: '/image/tape.png',
    storeId: 'zaki'
  },

  {
    id: 'zak_4',
    name: 'أكياس تغليف',
    nameEn: 'Packaging Bags',
    price: 250,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: '20pcs',
    unitEn: '20pcs',
    image: '/image/bags.png',
    storeId: 'zaki'
  },

  {
    id: 'zak_5',
    name: 'ملصقات هش',
    nameEn: 'Fragile Stickers',
    price: 180,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: '10pcs',
    unitEn: '10pcs',
    image: '/image/sticker.png',
    storeId: 'zaki'
  }

];

export const INITIAL_USER = {
  id: 'usr_1',
  name: 'Hocine Baslimane',
  email: 'hocine@email.com',
  phone: '+213555000000',
  walletBalance: 12500,
  loyaltyPoints: 240,
};

export const INITIAL_ORDERS = [];

export const INITIAL_TRANSACTIONS = [];
