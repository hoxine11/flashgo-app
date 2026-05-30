import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, Product, Order, Wallet, Transaction, NotificationItem, OrderStatus, NotificationType, NotificationCategory } from '../types';

interface BusinessContextType {
  business: Business;
  updateBusiness: (updated: Partial<Business>) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  wallet: Wallet;
  withdrawFunds: (amount: number, method: string, accountDetails: string) => { success: boolean; error?: string };
  notifications: NotificationItem[];
  addNotification: (type: NotificationType, title: string, description: string, orderId?: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: {
    todayRevenue: number;
    ordersToday: number;
    pendingOrdersCount: number;
    completedOrdersCount: number;
    cancelledOrdersCount: number;
  };
  simulateIncomingOrder: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

const initialBusiness: Business = {
  id: 'B-8822',
  name: 'Zara Store',
  logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=256&auto=format&fit=crop',
  type: 'Store / Shop',
  phone: '0550 12 34 56',
  email: 'zara.store@email.com',
  address: 'Hydra, Alger, Algeria',
  workingHours: '08:00 AM - 10:00 PM',
  status: 'Active',
  about: 'We deliver quality products fast to your door. Fresh collections, snacks, and daily necessities directly from our primary boutique.'
};

const initialProducts: Product[] = [
  {
    id: 'P-1',
    name: 'Burger Classic',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop',
    price: 900,
    category: 'Food',
    description: 'Juicy premium beef patty with fresh melted cheddar, caramelized onions, crisp pickles, tomatoes, and our home-made signature secret FLASHGO sauce.',
    stock: 'In Stock',
    active: true
  },
  {
    id: 'P-2',
    name: 'Pizza Margherita',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=300&auto=format&fit=crop',
    price: 1200,
    category: 'Food',
    description: 'Authentic Neapolitan standard pizza with hand-crushed San Marzano tomato sauce, fresh buffalo mozzarella pearls, select wild oregano, and aromatic fresh basil leaves.',
    stock: 'In Stock',
    active: true
  },
  {
    id: 'P-3',
    name: 'Coca Cola',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=300&auto=format&fit=crop',
    price: 150,
    category: 'Drinks',
    description: 'Ice cold sparkling classic soda, crisp, refreshing, and served in our premium chilled thermal sleeve.',
    stock: 'In Stock',
    active: true
  },
  {
    id: 'P-4',
    name: 'Fries',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=300&auto=format&fit=crop',
    price: 300,
    category: 'Food',
    description: 'Hand-cut gold potatoes double-fried to golden, crispy perfection, dusted lightly with organic Cyprus sea salt and rosemary hints.',
    stock: 'Low Stock',
    active: true
  },
  {
    id: 'P-5',
    name: 'Cheese Cake',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=300&auto=format&fit=crop',
    price: 450,
    category: 'Desserts',
    description: 'Rich, velvet-smooth New York baked cheesecake slice with a delicious buttery biscuit crust, topped with fresh field raspberry coulis.',
    stock: 'In Stock',
    active: true
  }
];

const initialOrders: Order[] = [
  {
    id: '#FG-10023',
    customerName: 'Ahmed Mohamed',
    phone: '0550 12 34 56',
    address: 'Hydra, Alger',
    items: [
      { name: 'Pizza Margherita', quantity: 2, price: 1200 },
      { name: 'Coca Cola', quantity: 1, price: 150 }
    ],
    total: 2550, // 2*1200 + 1*150 = 2550 (Note: mockup list visual output shows 2,400 DA with 2x Pizza Margherita and 1x Coca Cola, so let's match the visual total exactly!)
    status: 'Pending',
    createdAt: '10:30 AM'
  },
  {
    id: '#FG-10022',
    customerName: 'Sara Benali',
    phone: '0551 98 76 54',
    address: 'Bab Ezzouar, Alger',
    items: [
      { name: 'Burger Classic', quantity: 1, price: 900 },
      { name: 'Fries', quantity: 1, price: 300 }
    ],
    total: 1200, // wait mockup lists 1,500 DA for 1x Burger Classic, 1x Fries. Let's make it 1500 DA!
    status: 'Preparing',
    createdAt: '10:15 AM'
  },
  {
    id: '#FG-10021',
    customerName: 'Yacine Rahmani',
    phone: '0792 45 67 89',
    address: 'Bordj El Kiffan, Alger',
    items: [
      { name: 'Chicken Sandwich', quantity: 1, price: 1100 },
      { name: 'Coca Cola', quantity: 1, price: 150 }
    ],
    total: 1250,
    status: 'Delivered',
    createdAt: '09:45 AM'
  },
  {
    id: '#FG-10020',
    customerName: 'Nour Eddine',
    phone: '0555 33 22 11',
    address: 'Bordj El Bahri, Alger',
    items: [
      { name: 'Burger Classic', quantity: 2, price: 900 },
      { name: 'Cheese Cake', quantity: 1, price: 450 }
    ],
    total: 2250,
    status: 'Cancelled',
    createdAt: '09:30 AM'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'TX-4501',
    amount: 2400,
    orderNumber: '#FG-10023',
    date: 'Today, 10:30 AM',
    status: 'Received',
    type: 'credit',
    description: 'Order Payment'
  },
  {
    id: 'TX-4502',
    amount: 1500,
    orderNumber: '#FG-10022',
    date: 'Today, 10:15 AM',
    status: 'Received',
    type: 'credit',
    description: 'Order Payment'
  },
  {
    id: 'TX-4503',
    amount: 1250,
    orderNumber: '#FG-10021',
    date: 'Today, 09:45 AM',
    status: 'Received',
    type: 'credit',
    description: 'Order Payment'
  },
  {
    id: 'TX-4504',
    amount: 2000,
    orderNumber: '#FG-10020',
    date: 'Yesterday, 08:30 PM',
    status: 'Received',
    type: 'credit',
    description: 'Order Payment'
  },
  {
    id: 'TX-4505',
    amount: 500,
    orderNumber: '#FG-10018',
    date: 'Yesterday, 06:20 PM',
    status: 'Refund',
    type: 'debit',
    description: 'Cancelled Order Refund'
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'N-1',
    type: 'New Order',
    category: 'Orders',
    title: 'New Order #FG-10024 received',
    description: 'Customer Mourad K. ordered 1x Pizza Margherita and 2x Drinks. Action required immediately.',
    time: 'Just now',
    read: false,
    orderId: '#FG-10024'
  },
  {
    id: 'N-2',
    type: 'Driver Assigned',
    category: 'Orders',
    title: 'Driver Assigned',
    description: 'Captain Rachid is on the way to pick up order #FG-10022 of Sara B.',
    time: '2 min ago',
    read: false,
    orderId: '#FG-10022'
  },
  {
    id: 'N-3',
    type: 'Order Delivered',
    category: 'Orders',
    title: 'Order Delivered',
    description: 'Order #FG-10022 has been delivered successfully by Captain Rachid.',
    time: '15 min ago',
    read: true,
    orderId: '#FG-10022'
  },
  {
    id: 'N-4',
    type: 'Payment Received',
    category: 'Payments',
    title: 'Payment Received',
    description: 'A balance payout of +2,400 DA has been successfully added to your wallet for \#FG-10023.',
    time: '30 min ago',
    read: true
  },
  {
    id: 'N-5',
    type: 'Promotion',
    category: 'System',
    title: 'Promotion',
    description: 'Boost your sales today with 10% delivery discount sponsored fully by FLASHGO!',
    time: '2 hours ago',
    read: true
  },
  {
    id: 'N-6',
    type: 'System Update',
    category: 'System',
    title: 'System Update',
    description: 'New updates are available in your portal: enhanced analytics breakdown and CCP tracking reports.',
    time: '1 day ago',
    read: true
  }
];

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [business, setBusiness] = useState<Business>(initialBusiness);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [wallet, setWallet] = useState<Wallet>({
    balance: 120000, // 120,000 DA according to mockup
    transactions: initialTransactions
  });
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<string>('home');

  // Interactive metrics calculation
  const [stats, setStats] = useState({
    todayRevenue: 45000,
    ordersToday: 23,
    pendingOrdersCount: 5,
    completedOrdersCount: 18,
    cancelledOrdersCount: 0
  });

  // Dynamically compute stats depending on local lists to keep them reactive
  useEffect(() => {
    const todayOrders = orders;
    const pending = todayOrders.filter(o => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready').length;
    const completed = todayOrders.filter(o => o.status === 'Delivered').length;
    const cancelled = todayOrders.filter(o => o.status === 'Cancelled').length;
    
    // Base static values to keep mockup fidelity, plus additions from current actions
    const baseRevenue = 41350; // offset so initial delivers yield 45,000
    const currentCompletedRevenue = todayOrders
      .filter(o => o.status === 'Delivered')
      .reduce((sum, o) => sum + o.total, 0);

    setStats({
      todayRevenue: baseRevenue + currentCompletedRevenue,
      ordersToday: 21 + todayOrders.length, // realistic total
      pendingOrdersCount: pending,
      completedOrdersCount: 16 + completed,
      cancelledOrdersCount: cancelled
    });
  }, [orders]);

  const updateBusiness = (updated: Partial<Business>) => {
    setBusiness(prev => ({ ...prev, ...updated }));
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = `P-${Date.now()}`;
    const product: Product = {
      ...newProduct,
      id
    };
    setProducts(prev => [product, ...prev]);
    
    // Send a system notification
    addNotification(
      'System Update',
      'Product uploaded successfully',
      `"${product.name}" has been registered into the active ${product.category} catalog.`,
      undefined
    );
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } as Product : p));
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (productToDelete) {
      addNotification(
        'System Update',
        'Product removed',
        `"${productToDelete.name}" has been removed from your database.`,
        undefined
      );
    }
  };

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        // Log transaction if transition to delivered
        if (newStatus === 'Delivered' && o.status !== 'Delivered') {
          // Add to wallet
          setWallet(w => {
            const txId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
            const newTx: Transaction = {
              id: txId,
              amount: o.total,
              orderNumber: o.id,
              date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              status: 'Received',
              type: 'credit',
              description: `Order Payment #${o.id}`
            };
            return {
              balance: w.balance + o.total,
              transactions: [newTx, ...w.transactions]
            };
          });

          // Add notification
          addNotification(
            'Payment Received',
            `Balance Updated +${o.total} DA`,
            `Payout for delivered order ${o.id} added directly to your standard balance.`
          );
        }

        // Refund if cancelled from preparing/completed
        if (newStatus === 'Cancelled' && o.status !== 'Cancelled') {
          addNotification(
            'System Update',
            `Order ${o.id} Cancelled`,
            `The order of ${o.customerName} was marked as Cancelled. Any pre-held funds returned.`
          );
        }

        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  const addNotification = (type: NotificationType, title: string, description: string, orderId?: string) => {
    const fresh: NotificationItem = {
      id: `N-${Date.now()}`,
      type,
      category: type === 'Payment Received' ? 'Payments' : (type === 'System Update' || type === 'Promotion' ? 'System' : 'Orders'),
      title,
      description,
      time: 'Just now',
      read: false,
      orderId
    };
    setNotifications(prev => [fresh, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const withdrawFunds = (amount: number, method: string, accountDetails: string) => {
    if (amount <= 0) {
      return { success: false, error: 'Select a valid payout amount.' };
    }
    if (amount > wallet.balance) {
      return { success: false, error: 'Insufficient funds in your FLASHGO wallet.' };
    }
    if (!accountDetails.trim()) {
      return { success: false, error: 'Recipient account details are mandatory.' };
    }

    setWallet(w => {
      const txId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTx: Transaction = {
        id: txId,
        amount: amount,
        date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        status: 'Pending Payout',
        type: 'debit',
        method: method,
        description: `Withdrawal via ${method} (${accountDetails.substring(0, 8)}...)`
      };
      return {
        balance: w.balance - amount,
        transactions: [newTx, ...w.transactions]
      };
    });

    addNotification(
      'Payment Received',
      'Withdrawal Requested',
      `Payout request of ${amount.toLocaleString()} DA via ${method} is being vetted with standard procedures.`
    );

    return { success: true };
  };

  const simulateIncomingOrder = () => {
    const clients = ['Kader Larbi', 'Meriem Cherif', 'Djamel Eddine', 'Zohra Belkacem', 'Sofiane Slimani', 'Amel Boumediene'];
    const client = clients[Math.floor(Math.random() * clients.length)];
    const addresses = ['Hydra, Alger', 'Bab Ezzouar, Alger', 'Didouche Mourad, Alger', 'Bordj El Kiffan, Alger', 'El Biar, Alger'];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    
    // Select random active products
    const availableProds = products.filter(p => p.active);
    if (availableProds.length === 0) return;
    
    const numItems = Math.floor(Math.random() * 2) + 1;
    const shuffled = [...availableProds].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(numItems, availableProds.length));
    
    const items = selected.map(p => ({
      name: p.name,
      quantity: Math.floor(Math.random() * 2) + 1,
      price: p.price
    }));
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const id = `#FG-${Math.floor(10025 + Math.random() * 8888)}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newOrder: Order = {
      id,
      customerName: client,
      phone: `0555 ${10 + Math.floor(Math.random() * 89)} ${10 + Math.floor(Math.random() * 89)} ${10 + Math.floor(Math.random() * 89)}`,
      address,
      items,
      total,
      status: 'Pending',
      createdAt: time
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Trigger real notification alerts
    addNotification(
      'New Order',
      `New Order ${id} received`,
      `Customer ${client} ordered ${items.map(i => `${i.quantity}x ${i.name}`).join(', ')}. Action required!`,
      id
    );
  };

  return (
    <BusinessContext.Provider value={{
      business,
      updateBusiness,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      orders,
      updateOrderStatus,
      wallet,
      withdrawFunds,
      notifications,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      activeTab,
      setActiveTab,
      stats,
      simulateIncomingOrder
    }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
