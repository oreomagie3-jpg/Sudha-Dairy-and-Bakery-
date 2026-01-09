
import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onConfirm: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onConfirm }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onConfirm();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md animate-in slide-in-from-right duration-500">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-[3rem] overflow-hidden">
            
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Your Harvest</h2>
                  <p className="hindi-font text-emerald-600 font-bold text-xs">ताज़ा आर्डर सूची ✨</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-stone-400 active:scale-90 border border-transparent hover:border-stone-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-20">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center mb-6">
                    <ShoppingBag className="h-8 w-8 text-stone-300" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Your bag is empty</h3>
                  <p className="text-sm mt-1">Start adding fresh items!</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="group relative flex items-center gap-5 p-4 bg-stone-50 rounded-[2rem] border border-stone-100 hover:bg-white hover:shadow-xl transition-all">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-slate-900 truncate tracking-tight">{item.name}</h4>
                      <p className="text-emerald-600 text-[11px] font-black uppercase tracking-widest mt-1">₹{item.price} / {item.unit}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-100 shadow-sm">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-stone-50 rounded-lg transition-colors text-slate-400 hover:text-emerald-600"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-black text-sm text-emerald-900 w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-stone-50 rounded-lg transition-colors text-slate-400 hover:text-emerald-600"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-3 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-8 bg-white border-t border-stone-100 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 text-xs font-black uppercase tracking-widest">Subtotal</span>
                    <span className="font-black text-slate-900">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-400 text-xs font-black uppercase tracking-widest">Delivery Charge</span>
                    <span className="text-emerald-600 font-black text-xs uppercase">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-lg font-black text-slate-900">Total Amount</span>
                    <span className="text-2xl font-black text-emerald-600">₹{totalPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:active:scale-100 group"
                >
                  {isCheckingOut ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Confirm Harvest Order
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-center mt-6 text-[10px] text-stone-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                   <Sparkles className="h-3 w-3 text-emerald-400" />
                   Pure Quality Verified
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
