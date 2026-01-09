
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import CartSidebar from './components/CartSidebar';
import AIChat from './components/AIChat';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import CalendarModal from './components/CalendarModal';
import BirthdaySection from './components/BirthdaySection';
import BirthdayFormModal from './components/BirthdayFormModal';
import CountdownModal from './components/CountdownModal';
import SetCountdownModal from './components/SetCountdownModal';
import ClothBagModal from './components/ClothBagModal';
import { Product, CartItem, Category, BirthdayCustomer, PersonalWish, CountdownEvent, User } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import { Search, Timer, PartyPopper, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBirthdayFormOpen, setIsBirthdayFormOpen] = useState(false);
  const [isCountdownOpen, setIsCountdownOpen] = useState(false);
  const [isSetCountdownOpen, setIsSetCountdownOpen] = useState(false);
  const [isClothBagModalOpen, setIsClothBagModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Community Countdown Events
  const [countdownEvents, setCountdownEvents] = useState<CountdownEvent[]>([
    {
      id: 'c1',
      name: "Virat Goyal's Birthday",
      date: '2026-02-25T00:00:00',
      category: 'Birthday',
      createdBy: 'Sudha Admin'
    },
    {
      id: 'c2',
      name: "Holi Mahotsav",
      date: '2026-03-04T00:00:00',
      category: 'Festival',
      createdBy: 'Rajesh Kumar'
    },
    {
      id: 'c3',
      name: "25th Anniversary",
      date: '2026-05-12T00:00:00',
      category: 'Anniversary',
      createdBy: 'Meena & Sunil'
    }
  ]);

  const [activeCategory, setActiveCategory] = useState<Category | 'All' | 'Wishlist'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Initial mock birthdays
  const [birthdays, setBirthdays] = useState<BirthdayCustomer[]>([
    {
      id: 'bday-1',
      name: 'Aditi Sharma',
      photo: 'https://i.pravatar.cc/150?u=aditi',
      instagram: '@aditi_celebrates',
      wish: 'Waiting for my Sudha Chocolate Cake! 🎂',
      wishCount: 12,
      personalWishes: [
        { senderName: 'Rahul', message: 'Happy Birthday Aditi! Have a blast.' },
        { senderName: 'Priya', message: 'Enjoy the Sudha treats!' }
      ],
      postedAt: new Date().toISOString()
    },
    {
      id: 'bday-2',
      name: 'Vikram Kumar',
      photo: 'https://i.pravatar.cc/150?u=vikram',
      instagram: '@vikram_vlogs',
      wish: 'Birthday morning with Sudha Lassi is the best! 🥤',
      wishCount: 8,
      personalWishes: [
        { senderName: 'Sneha', message: 'Many many happy returns of the day!' }
      ],
      postedAt: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    setIsProductsLoading(true);
    const timer = setTimeout(() => {
      setIsProductsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = 
        activeCategory === 'All' || 
        (activeCategory === 'Wishlist' && wishlist.has(p.id)) ||
        p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.hindiName.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, wishlist]);

  const totalWishes = useMemo(() => {
    return birthdays.reduce((sum, b) => sum + b.wishCount, 0);
  }, [birthdays]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing?.quantity === 1) {
        return prev.filter(item => item.id !== product.id);
      }
      return prev.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleWish = (id: string, personalWish: PersonalWish) => {
    setBirthdays(prev => prev.map(b => 
      b.id === id 
        ? { 
            ...b, 
            wishCount: b.wishCount + 1, 
            personalWishes: [...b.personalWishes, personalWish] 
          } 
        : b
    ));
  };

  const handleQuickWish = (id: string) => {
    setBirthdays(prev => prev.map(b => 
      b.id === id ? { ...b, wishCount: b.wishCount + 1 } : b
    ));
  };

  const handleCelebrateTotalWishes = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#10b981']
    });
  };

  const handleBirthdaySubmit = (data: Omit<BirthdayCustomer, 'id' | 'wishCount' | 'postedAt' | 'personalWishes'>) => {
    const newBirthday: BirthdayCustomer = {
      ...data,
      id: `bday-${Date.now()}`,
      wishCount: 0,
      personalWishes: [],
      postedAt: new Date().toISOString()
    };
    setBirthdays(prev => [newBirthday, ...prev]);
  };

  const handleSetCountdown = (event: Omit<CountdownEvent, 'id'>) => {
    const newEvent: CountdownEvent = {
      ...event,
      id: `cd-${Date.now()}`
    };
    setCountdownEvents(prev => [newEvent, ...prev]);
    setIsCountdownOpen(true);
  };

  const handleOrderConfirm = () => {
    setIsCartOpen(false);
    setIsClothBagModalOpen(true);
  };

  const handleFinalOrderPlace = (method: 'pickup' | 'delivery', payment: 'cash' | 'online', details: any) => {
    setCartItems([]);
    setIsClothBagModalOpen(false);
    setActiveCategory('All');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (user) {
      setUser(prev => prev ? { ...prev, ordersCount: prev.ordersCount + 1 } : null);
    }
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setIsAuthOpen(false);
    setIsProfileOpen(true); // Open profile immediately after login/signup
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#059669', '#3b82f6', '#ffffff']
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 pb-20 sm:pb-0">
      <Header 
        cartCount={totalCartItems} 
        wishlistCount={wishlist.size}
        user={user}
        onCartClick={() => setIsCartOpen(true)} 
        onSearchChange={setSearchQuery}
        onAuthClick={(mode) => { setAuthMode(mode); setIsAuthOpen(true); }}
        onProfileClick={() => setIsProfileOpen(true)}
        onWishlistClick={() => setActiveCategory('Wishlist')}
        onCalendarClick={() => setIsCalendarOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Today's Celebrations */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
             <div className="flex flex-col">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Today's Celebrations</h2>
                <p className="hindi-font text-emerald-600 font-bold text-sm">हमारे खास ग्राहकों का जन्मदिन ✨</p>
             </div>
             
             <div className="flex items-center gap-3">
               <button 
                onClick={handleCelebrateTotalWishes}
                className="hidden md:flex items-center gap-2.5 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-black shadow-sm border border-emerald-100 hover:bg-emerald-100 transition-all active:scale-95 group"
               >
                 <Heart className="h-4 w-4 fill-emerald-600 group-hover:scale-125 transition-transform" />
                 <span className="text-sm">{totalWishes}</span>
               </button>

               <button 
                onClick={() => setIsCountdownOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 border border-emerald-500 relative group"
               >
                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                 <Timer className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                 Countdown Hub
               </button>

               <button 
                onClick={() => setIsBirthdayFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-amber-100 transition-all active:scale-95 border border-amber-400"
               >
                 <PartyPopper className="h-4 w-4" />
                 Add My Birthday
               </button>
             </div>
          </div>
          <BirthdaySection birthdays={birthdays} onWish={handleWish} onQuickWish={handleQuickWish} />
        </div>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-8 py-4 rounded-[1.5rem] font-black text-sm whitespace-nowrap transition-all ${
                activeCategory === 'All' 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 translate-y-[-2px]' 
                  : 'bg-white text-slate-600 hover:bg-emerald-50 border border-stone-200'
              }`}
            >
              All Items
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name as Category)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 translate-y-[-2px]' 
                    : 'bg-white text-slate-600 hover:bg-emerald-50 border border-stone-200'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isProductsLoading ? (
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.has(product.id)}
                quantityInCart={cartItems.find(item => item.id === product.id)?.quantity || 0}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onBuyNow={handleBuyNow}
                onToggleWishlist={toggleWishlist}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <Search className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-800">No products found</h3>
              <p className="text-slate-500 text-sm mt-2">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={(id, delta) => {
          setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
        }}
        onRemove={(id) => setCartItems(prev => prev.filter(item => id !== item.id))}
        onConfirm={handleOrderConfirm}
      />

      <AIChat />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
        onAuthSuccess={handleAuthSuccess}
      />

      <UserProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
      />

      <BirthdayFormModal 
        isOpen={isBirthdayFormOpen} 
        onClose={() => setIsBirthdayFormOpen(false)} 
        onSubmit={handleBirthdaySubmit}
      />

      <CountdownModal 
        isOpen={isCountdownOpen} 
        onClose={() => setIsCountdownOpen(false)}
        events={countdownEvents}
        onSetNew={() => setIsSetCountdownOpen(true)}
      />

      <SetCountdownModal
        isOpen={isSetCountdownOpen}
        onClose={() => setIsSetCountdownOpen(false)}
        onSubmit={handleSetCountdown}
      />

      <ClothBagModal 
        isOpen={isClothBagModalOpen}
        onClose={() => setIsClothBagModalOpen(false)}
        onFinalConfirm={handleFinalOrderPlace}
      />
    </div>
  );
};

export default App;
