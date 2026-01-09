
import React from 'react';
import { X, Heart, MessageCircle, PartyPopper, Sparkles, Instagram } from 'lucide-react';
import { BirthdayCustomer } from '../types';

interface WishesWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: BirthdayCustomer | null;
}

const WishesWallModal: React.FC<WishesWallModalProps> = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-emerald-50 max-h-[85vh] flex flex-col">
        {/* Header Section */}
        <div className="p-8 sm:p-10 border-b border-stone-100 bg-emerald-50/50">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-2.5 hover:bg-white rounded-full text-stone-400 transition-colors z-10 shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-[2rem] border-4 border-white overflow-hidden shadow-xl">
                <img src={customer.photo} alt={customer.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-amber-500 p-2 rounded-xl text-white shadow-lg rotate-12">
                <PartyPopper className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-black text-slate-900 leading-tight">{customer.name}'s</h3>
              
              {/* Instagram Handle in Header */}
              {customer.instagram && (
                <a 
                  href={`https://instagram.com/${customer.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-pink-600 font-bold text-sm mb-2 hover:underline"
                >
                  <Instagram className="h-4 w-4" />
                  @{customer.instagram.replace('@', '')}
                </a>
              )}

              <div className="flex items-center gap-2">
                 <h4 className="text-2xl font-black text-emerald-600 tracking-tight">Wall of Wishes 🎈</h4>
              </div>
              <p className="hindi-font text-emerald-700/60 font-bold text-sm mt-1">ढेर सारा प्यार और शुभकामनाएं ✨</p>
            </div>
          </div>
        </div>

        {/* Wishes List */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-10 space-y-6 bg-stone-50/30">
          {customer.personalWishes.length === 0 ? (
            <div className="text-center py-20 opacity-40">
              <MessageCircle className="h-12 w-12 mx-auto mb-4" />
              <p className="font-bold">No personal wishes yet.</p>
              <p className="text-xs">Be the first to wish them! ✨</p>
            </div>
          ) : (
            customer.personalWishes.map((pw, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-md transition-all group relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute -top-4 -right-4 bg-emerald-50 p-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <Sparkles className="h-4 w-4 text-emerald-300" />
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-100 h-8 w-8 rounded-full flex items-center justify-center text-emerald-700 font-black text-xs">
                    {pw.senderName.charAt(0)}
                  </div>
                  <span className="font-black text-slate-900 text-sm tracking-tight">{pw.senderName}</span>
                  <div className="h-1 w-1 rounded-full bg-slate-200" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Wished</span>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed italic relative z-10">
                  "{pw.message}"
                </p>
                
                <div className="mt-4 flex justify-end">
                   <Heart className="h-4 w-4 text-rose-200 fill-rose-100" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-emerald-600 text-white text-center">
           <p className="text-xs font-black uppercase tracking-[0.2em]">Celebrate with Purity • Sudha Dairy & Bakers</p>
        </div>
      </div>
    </div>
  );
};

export default WishesWallModal;
