import { Store, GroceryItem, FoodItem, Order, WalletTransaction, UserProfile } from '../types';

export const STORES: Store[] = [
  {
    id: 'carrefour',
    name: 'كارفور',
    nameEn: 'Carrefour',
    logo: '../image/carrefour.png',
    rating: 4.5,
    
  },
  {
    id: 'target',
    name: 'zaki emballage',
    nameEn: 'zaki emballage',
    logo: '../image/zaki.png',
    rating: 4.8,
    
  },
  {
    id: 'marjane',
    name: 'زارا',
    nameEn: 'zara',
    logo: '../image/zara.png',
    rating: 4.6,
    
  }
];

export const GROCERY_ITEMS: GroceryItem[] = [
  // Groceries / مواد غذائية
  {
    id: 'gro_1',
    name: 'حليب كامل الدسم',
    nameEn: 'Full Cream Milk',
    price: 150.00,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '١ لتر',
    unitEn: '1L',
    emoji: '🥛'
  },
  {
    id: 'gro_2',
    name: 'أرز بسمتي فاخر',
    nameEn: 'Premium Basmati Rice',
    price: 900.00,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '٥ كجم',
    unitEn: '5kg',
    emoji: '🍚'
  },
  {
    id: 'gro_3',
    name: 'زيت دوار الشمس',
    nameEn: 'Sunflower Oil',
    price: 400.00,
    category: 'مواد غذائية',
    categoryEn: 'Groceries',
    unit: '١.٥ لتر',
    unitEn: '1.5L',
    emoji: '🍾'
  },
  // Detergents / منظفات
  {
    id: 'gro_4',
    name: 'منظف غسيل سائل',
    nameEn: 'Liquid Detergent',
    price: 850.00,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: '٢.٥ لتر',
    unitEn: '2.5L',
    emoji: '🧼'
  },
  {
    id: 'gro_5',
    name: 'سائل غسيل الأطباق',
    nameEn: 'Dishwashing Liquid',
    price: 250.00,
    category: 'منظفات',
    categoryEn: 'Detergents',
    unit: '١ لتر',
    unitEn: '1L',
    emoji: '🧽'
  },
  // Personal Care / عناية شخصية
  {
    id: 'gro_6',
    name: 'شامبو مغذي للشعر',
    nameEn: 'Nourishing Shampoo',
    price: 420.00,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: '٤٠٠ مل',
    unitEn: '400ml',
    emoji: '🧴'
  },
  {
    id: 'gro_7',
    name: 'معجون أسنان مبيض',
    nameEn: 'Whitening Toothpaste',
    price: 300.00,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: '٧٥ مل',
    unitEn: '75ml',
    emoji: '🪥'
  },
  {
    id: 'gro_8',
    name: 'صابون مرطب طبيعي',
    nameEn: 'Moisturizing Soap',
    price: 180.00,
    category: 'عناية شخصية',
    categoryEn: 'Personal Care',
    unit: '١٢٥ جم',
    unitEn: '125g',
    emoji: '🧼'
  }
];

export const FOOD_ITEMS: FoodItem[] = [
  // Burgers
  {
    id: 'food_1',
    name: 'برجر تشيز برنس كلاسيك',
    nameEn: 'Cheese Prince Classic Burger',
    price: 750.00,
    category: 'burger',
    rating: 4.8,
    image: '../image/burgerfood.jpg',
    description: 'شريحة لحم بقري مشوية على اللهب مع الجبن السويسري المذاب، الخس، البصل والصلصة الخاصة للبرنس.',
    descriptionEn: 'Flame-grilled premium beef patty served with melted Swiss cheese, fresh lettuce, onion, and special Prince sauce.',
    restaurantId: 'burger-prince'
  },
  {
    id: 'food_2',
    name: 'برجر دجاج مقرمش سبايسي',
    nameEn: 'Spicy Crispy Chicken Burger',
    price: 680.00,
    category: 'burger',
    rating: 4.6,
    emoji: '🍗',
    description: 'صدر دجاج مقرمش ومتبل بخلطة حارة، مغطى بصلصة المايونيز والجبن السلايس والخس المقرمش.',
    descriptionEn: 'Crispy marinated chicken breast in spicy batter, topped with light mayonnaise, sliced cheese, and fresh lettuce.',
    restaurantId: 'burger-prince'
  },
  // Pizza
  {
    id: 'food_3',
    name: 'بيتزا مارغريتا إيطالية',
    nameEn: 'Italian Margherita Pizza',
    price: 800.00,
    category: 'pizza',
    rating: 4.7,
    emoji: '🍕',
    description: 'عجينة بيتزا إيطالية رقيقة مغطاة بصلصة الطماطم الغنية، جبن الموزاريلا الفاخر، رذاذ من زيت الزيتون وريحان طازج.',
    descriptionEn: 'Thin-crust light Italian pizza dough topped with rich tomato sauce, premium mozzarella, olive oil drizzle, and fresh basil.',
    restaurantId: 'pizza-house'
  },
  {
    id: 'food_4',
    name: 'بيتزا سوبر سوبريم بيبيروني',
    nameEn: 'Super Supreme Pepperoni Pizza',
    price: 1100.00,
    category: 'pizza',
    rating: 4.9,
    emoji: '🍕',
    description: 'بيتزا غنية بقطع البيبيروني البقري ولحم المفروم، فلفل أخضر، فطر، زيتون أسود وجبن الموزاريلا السائح.',
    descriptionEn: 'Loaded pizza topped with beef pepperoni slices, ground beef, green peppers, mushrooms, black olives, and premium mozzarella cheese.',
    restaurantId: 'pizza-house'
  },
  // Grills
  {
    id: 'food_5',
    name: 'كباب مشوي على الفحم',
    nameEn: 'Charcoal Grilled Kebab',
    price: 1200.00,
    category: 'grills',
    rating: 4.9,
    emoji: '🍢',
    description: 'ثلاثة أشياخ من الكباب البلدي بالبهارات الشرقية المشوية على الفحم، تقدم مع الأرز والصلصة الحارة والخضروات المشوية.',
    descriptionEn: 'Three skewers of spiced premium beef kebab grilled on charcoal coals, served with aromatic rice, spicy chutney, and grilled veggies.',
    restaurantId: 'traditional-grills'
  },
  {
    id: 'food_6',
    name: 'شيش طاووق متبل بامتياز',
    nameEn: 'Marinated Shish Tawook',
    price: 950.00,
    category: 'grills',
    rating: 4.7,
    emoji: '🍢',
    description: 'أقراص صدر الدجاج الشهية المتبلة بالثوم والليمون والخل مشوية ببطء، تقدم مع صوص الثومية والخبز اللبناني والبطاطس.',
    descriptionEn: 'Satisfying cubed tender chicken breasts marinated in garlic, lemon juice, and red spices, slowly grilled and served with garlic dip, bread, and fries.',
    restaurantId: 'traditional-grills'
  },
  // Sweets
  {
    id: 'food_7',
    name: 'تشيز كيك سان سيباستيان',
    nameEn: 'San Sebastian Cheesecake',
    price: 550.00,
    category: 'sweets',
    rating: 4.8,
    emoji: '🍰',
    description: 'قطعة غنية ومحمرة خارجياً، كريمية من الداخل وذات ملمس فائق النعومة، مغطاة بأرقى أنواع الشوكولاتة البلجيكية الساخنة.',
    descriptionEn: 'Decadent baked crustless cheesecake with a caramelized top and super creamy melt-in-the-mouth center, drizzled with premium Belgian hot chocolate.',
    restaurantId: 'sweet-palace'
  },
  {
    id: 'food_8',
    name: 'كنافة نابلسية بالجبن الساخن',
    nameEn: 'Nabulsi Kunafa with Hot Cheese',
    price: 450.00,
    category: 'sweets',
    rating: 4.9,
    emoji: '🍯',
    description: 'كنافة مقرمشة ساخنة ومغطاة بالفستق الحلبي والشيرة، تحتوي بداخلها على طبقة سميكة من جبن العكاوي السائح والمالح المتوازن.',
    descriptionEn: 'Crispy warm stringy semolina pastry heavily coats in ground pistachios and sweet syrup, containing a thick layer of melted, balanced Akkawi cheese.',
    restaurantId: 'sweet-palace'
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'أحمد',
  nameEn: 'Ahmed',
  phone: '+213 550 12 34 56',
  email: 'ahmed.delivery@flashgo.com',
  balance: 5500.00,
  loyaltyPoints: 1240,
  language: 'ar',
};

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_1',
    type: 'incoming',
    amount: 2500.00,
    title: 'شحن رصيد المحفظة - الذهبية',
    titleEn: 'Wallet Recharge - Edahabia Card',
    date: '٢٠٢٦-٠٥-٢٠',
  },
  {
    id: 'tx_2',
    type: 'outgoing',
    amount: 750.00,
    title: 'طلب توصيل الأكل #FG-9382',
    titleEn: 'Food Delivery Order #FG-9382',
    date: '٢٠٢٦-٠٥-١٩',
  },
  {
    id: 'tx_3',
    type: 'outgoing',
    amount: 400.00,
    title: 'رحلة توصيل مشوار #FG-8219',
    titleEn: 'Ride Hailing Trip #FG-8219',
    date: '٢0٢6-05-18',
  },
  {
    id: 'tx_4',
    type: 'incoming',
    amount: 500.00,
    title: 'هدية مكافأة الولاء',
    titleEn: 'Loyalty Reward Gift',
    date: '٢٠٢٦-٠٥-١٥',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FG-9382',
    category: 'food',
    status: 'delivered',
    pickupAddress: 'مطعم برجر برينس - ديدوش مراد',
    pickupAddressEn: 'Burger Prince - Didouche Mourad',
    deliveryAddress: 'ساحة أودان - الجزائر الوسطى',
    deliveryAddressEn: 'Audin Square - Algiers Center',
    cost: 750.00,
    date: '٢٠٢٦-٠5-١٩',
    storeName: 'برجر برينس',
    storeNameEn: 'Burger Prince',
    progress: 100,
    items: [
      { id: 'food_1', name: 'برجر تشيز برنس كلاسيك', nameEn: 'Cheese Prince Classic Burger', price: 750, quantity: 1 }
    ]
  },
  {
    id: 'FG-8219',
    category: 'ride',
    status: 'delivered',
    pickupAddress: 'مطار هواري بومدين الدولي',
    pickupAddressEn: 'Houari Boumediene International Airport',
    deliveryAddress: 'حي حيدرة - ساحة القدس',
    deliveryAddressEn: 'Hydra District - Jerusalem Square',
    cost: 400.00,
    date: '٢٠٢٦-٠٥-١٨',
    progress: 100,
  }
];
