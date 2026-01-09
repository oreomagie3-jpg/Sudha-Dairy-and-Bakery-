
import React, { useState } from 'react';
import { Gift, Cake, Heart, Sparkles, Instagram, Users, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayCustomer, PersonalWish } from '../types';
import PersonalWishModal from './PersonalWishModal';
import WishesWallModal from './WishesWallModal';

interface BirthdaySectionProps {
  birthdays: BirthdayCustomer[];
  onWish: (id: string, wish: PersonalWish) => void;
  onQuickWish?: (id: string) => void;
}

const BirthdaySection: React.FC<BirthdaySectionProps> = ({ birthdays, onWish, onQuickWish }) => {
  const [localWishedIds, setLocalWishedIds] = useState<Set<string>>(new Set());
  const [wishingCustomerId, setWishingCustomerId] = useState<string | null>(null);
  const [viewingWishesId, setViewingWishesId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleWishClick = (id: string) => {
    if (localWishedIds.has(id)) return;
    setWishingCustomerId(id);
  };

  const handleQuickWishClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (localWishedIds.has(id)) return;
    
    setLocalWishedIds(prev => new Set([...prev, id]));
    if (onQuickWish) onQuickWish(id);

    // Confetti effect from the click point
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#ef4444', '#f59e0b', '#059669'],
      scalar: 1.2
    });

    // Flying hearts effect
    const heartShape = (confetti as any).shapeFromText({ text: '❤️', scalar: 3 });
    confetti({
      particleCount: 15,
      shapes: [heartShape],
      origin: { x, y: y + 0.1 },
      scalar: 3,
      gravity: 0.5,
      drift: 0,
      ticks: 150,
      startVelocity: 30
    });
  };

  const handleWishSubmit = (senderName: string, message: string) => {
    if (!wishingCustomerId) return;
    
    const id = wishingCustomerId;
    const personalWish: PersonalWish = { senderName, message };
    
    setLocalWishedIds(prev => new Set([...prev, id]));
    onWish(id, personalWish);
    setWishingCustomerId(null);
    
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#059669', '#f59e0b', '#ef4444', '#3b82f6']
    });
  };

  if (birthdays.length === 0) return null;

  const displayedBirthdays = showAll ? birthdays : birthdays.slice(0, 4);
  const activeCustomerForWishing = birthdays.find(b => b.id === wishingCustomerId);
  const activeCustomerForViewing = birthdays.find(b => b.id === viewingWishesId);

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-500">
        {displayedBirthdays.map((customer) => (
          <div 
            key={customer.id} 
            className="relative bg-white rounded-[2rem] p-4 sm:p-5 border border-stone-100 shadow-xl shadow-stone-200/30 overflow-hidden group hover:shadow-2xl transition-all flex flex-col"
          >
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex flex-col items-center text-center relative z-10 flex-1">
              <div className="relative mb-4">
                <div 
                  className="w-20 h-20 rounded-full border-4 border-emerald-50 overflow-hidden bg-stone-100 shadow-inner cursor-pointer hover:ring-4 hover:ring-amber-200 transition-all"
                  onClick={() => setViewingWishesId(customer.id)}
                >
                  <img src={customer.photo} alt={customer.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-500 p-1.5 rounded-full border-2 border-white shadow-lg">
                  <Gift className="h-3.5 w-3.5 text-white" />
                </div>

                {/* Quick Wish Button Overlay */}
                {!localWishedIds.has(customer.id) && (
                  <button 
                    onClick={(e) => handleQuickWishClick(e, customer.id)}
                    className="absolute -top-1 -right-1 bg-white p-2 rounded-full shadow-lg text-rose-500 hover:scale-110 active:scale-90 transition-all border border-rose-50 animate-pulse"
                    title="Quick Wish"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                )}
              </div>

              <div className="min-w-0 mb-4">
                <h3 
                  className="text-lg font-black text-slate-900 truncate cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={() => setViewingWishesId(customer.id)}
                >
                  {customer.name}
                </h3>
                
                {customer.instagram && (
                  <div 
                    className="flex items-center justify-center gap-1 text-[10px] text-pink-600 font-black mb-2 hover:underline cursor-pointer" 
                    onClick={() => window.open(`https://instagram.com/${customer.instagram?.replace('@', '')}`, '_blank')}
                  >
                    <Instagram className="h-2.5 w-2.5" />
                    <span>@{customer.instagram.replace('@', '')}</span>
                  </div>
                )}

                <p className="text-slate-500 text-xs leading-relaxed italic line-clamp-2 px-2">"{customer.wish}"</p>
              </div>

              <div className="mt-auto w-full">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <button 
                    onClick={() => setViewingWishesId(customer.id)}
                    className="flex items-center gap-1.5 text-amber-600 font-black text-[10px] uppercase tracking-wider hover:bg-amber-50 rounded-lg px-2.5 py-1.5 transition-all group/count border border-transparent hover:border-amber-100"
                  >
                    <Users className="h-3.5 w-3.5 group-hover/count:scale-110 transition-transform" />
                    <span className="text-sm">{customer.wishCount}</span> Wishes
                  </button>
                </div>
                
                <button 
                  onClick={() => handleWishClick(customer.id)}
                  disabled={localWishedIds.has(customer.id)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-black transition-all active:scale-95 ${
                    localWishedIds.has(customer.id)
                      ? 'bg-emerald-50 text-emerald-600 cursor-default'
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700'
                  }`}
                >
                  {localWishedIds.has(customer.id) ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Wished! 🥳
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 fill-current" />
                      Wish Them
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {birthdays.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3 bg-white border border-stone-200 text-emerald-600 rounded-full font-black text-sm shadow-lg shadow-stone-100 hover:bg-emerald-50 hover:border-emerald-100 transition-all group"
          >
            <span className="hindi-font">{showAll ? 'कम दिखाएं' : 'और अधिक'}</span>
            <span className="ml-1 uppercase tracking-widest text-[10px]">({showAll ? 'Less' : 'More'})</span>
            {showAll ? (
              <ChevronUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>
      )}

      <PersonalWishModal 
        isOpen={wishingCustomerId !== null}
        onClose={() => setWishingCustomerId(null)}
        onSubmit={handleWishSubmit}
        recipientName={activeCustomerForWishing?.name || ''}
      />

      <WishesWallModal 
        isOpen={viewingWishesId !== null}
        onClose={() => setViewingWishesId(null)}
        customer={activeCustomerForViewing || null}
      />
    </div>
  );
};

export default BirthdaySection;
