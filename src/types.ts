export type SimulatorTab = 'home' | 'orders' | 'order-now' | 'wallet' | 'account';

export type CategoryType = 'ride' | 'parcel' | 'grocery' | 'food';

export interface LocationCoordinates {
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
}

export type OrderStatus = 'pending' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  category: CategoryType;
  status: OrderStatus;
  pickupAddress: string;
  pickupAddressEn: string;
  deliveryAddress: string;
  deliveryAddressEn: string;
  cost: number;
  date: string;
  items?: OrderItem[];
  storeName?: string;
  storeNameEn?: string;
  progress: number; // 0 to 100
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  eta?: string; // Estimated arrival time in text
}

export interface Store {
  id: string;
  name: string;
  nameEn: string;
  logo: string; // Tailwind bg color or emoji / symbol
  rating: number;
  deliveryTime: string;
  deliveryTimeEn: string;
  featuredProduct?: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: string;
  categoryEn: string;
  unit: string;
  unitEn: string;
  emoji: string;
}

export interface FoodItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: 'burger' | 'pizza' | 'grills' | 'sweets';
  rating: number;
  emoji: string;
  description: string;
  descriptionEn: string;
  restaurantId: string;
}

export interface WalletTransaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  title: string;
  titleEn: string;
  date: string;
}

export interface UserProfile {
  name: string;
  nameEn: string;
  phone: string;
  email: string;
  balance: number;
  loyaltyPoints: number;
  language: 'ar' | 'en';
}
