
import React from 'react';
import { ShoppingCart, Menu, Search, User as UserIcon, Heart, Calendar } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  user: User | null;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  onAuthClick: (mode: 'login' | 'signup') => void;
  onProfileClick: () => void;
  onWishlistClick: () => void;
  onCalendarClick: () => void;
}

export const SudhaLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12 sm:h-14 sm:w-14',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32'
  };

  const generateStarburstPath = (points: number, innerRadius: number, outerRadius: number) => {
    let path = "";
    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      path += (i === 0 ? "M" : "L") + x + "," + y;
    }
    path += "Z";
    return path;
  };

  const points = 80; 
  const starPath = generateStarburstPath(points, 46, 49);

  return (
    <div className={`${dimensions[size]} relative flex items-center justify-center filter drop-shadow-xl select-none flex-shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-in zoom-in duration-700 overflow-visible">
        <defs>
          <radialGradient id="sealGradient" cx="35%" cy="35%" r="65%" fx="35%" fy="35%">
            <stop offset="0%" stopColor="#e53935" />
            <stop offset="70%" stopColor="#b71c1c" />
            <stop offset="100%" stopColor="#800e0e" />
          </radialGradient>
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="#800e0e" d={starPath} transform="translate(0, 1)" />
        <path fill="url(#sealGradient)" d={starPath} stroke="#ffffff33" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="48" fill="url(#shineGradient)" pointerEvents="none" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
        <text x="50" y="51" textAnchor="middle" dominantBaseline="middle" className="hindi-font font-black" style={{ fontSize: '32px', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))', letterSpacing: '1px' }}>
          <tspan fill="#ffeb3b">सु</tspan>
          <tspan fill="#ffffff" dx="1">धा</tspan>
        </text>
      </svg>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount, 
  user,
  onCartClick, 
  onSearchChange, 
  onAuthClick,
  onProfileClick,
  onWishlistClick,
  onCalendarClick
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer group min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <SudhaLogo size="md" />
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl lg:text-2xl font-black text-emerald-900 leading-none group-hover:text-emerald-700 transition-colors truncate tracking-tighter">Dairy & Bakers</h1>
              <p className="hindi-font text-[10px] sm:text-xs text-emerald-600 font-bold tracking-[0.1em] mt-1">डेयरी & बेकर्स</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search fresh milk, gourmet cakes, paneer..."
                className="w-full pl-11 pr-4 py-3 bg-stone-100/50 border border-stone-100 focus:bg-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm transition-all outline-none font-medium"
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-4">
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <button 
                  onClick={onProfileClick}
                  className="flex items-center gap-3 pl-2 pr-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-100 transition-all active:scale-95 group"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left leading-none">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">My Account</p>
                    <p className="text-sm font-black text-slate-900 truncate max-w-[100px]">{user.name.split(' ')[0]}</p>
                  </div>
                </button>
              ) : (
                <>
                  <a href="/login" onClick={(e) => { e.preventDefault(); onAuthClick('login'); }} className="px-4 py-2 text-sm font-black text-slate-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">Log In</a>
                  <a href="/signup" onClick={(e) => { e.preventDefault(); onAuthClick('signup'); }} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-sm font-black shadow-xl shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center uppercase tracking-widest">Sign Up</a>
                </>
              )}
            </div>

            {!user && (
              <a href="/login" onClick={(e) => { e.preventDefault(); onAuthClick('login'); }} className="lg:hidden p-2 text-slate-600 hover:bg-stone-100 rounded-full transition-all">
                <UserIcon className="h-6 w-6" />
              </a>
            )}
            
            {user && (
              <button onClick={onProfileClick} className="lg:hidden p-1 rounded-full border-2 border-emerald-600 active:scale-90 transition-all">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              </button>
            )}

            <div className="w-px h-8 bg-stone-200 mx-1 hidden sm:block"></div>

            <button onClick={onCalendarClick} className="p-2.5 text-slate-600 hover:bg-amber-50 hover:text-amber-600 rounded-full transition-all group" title="2026 Calendar">
              <Calendar className="h-6 w-6" />
            </button>

            <button onClick={onWishlistClick} className="relative p-2.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all group" title="Wishlist">
              <Heart className={`h-6 w-6 transition-all ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">{wishlistCount}</span>}
            </button>

            <button onClick={onCartClick} className="relative p-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-full transition-all group shadow-sm border border-emerald-100" title="Shopping Cart">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">{cartCount}</span>}
            </button>
            
            <button className="md:hidden p-2 text-slate-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
