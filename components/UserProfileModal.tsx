
import React from 'react';
import { X, LogOut, Package, Star, Calendar, Settings, ChevronRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLogout: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-emerald-50">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2.5 hover:bg-stone-100 rounded-full text-stone-400 transition-colors z-20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header/Cover */}
          <div className="bg-emerald-600 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[2.5rem] border-4 border-white mx-auto mb-4 overflow-hidden shadow-2xl bg-white">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">{user.name}</h2>
              <p className="text-emerald-100/70 text-sm font-bold mt-1">{user.mobile}</p>
              
              <div className="inline-flex items-center gap-2 mt-4 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                <ShieldCheck className="h-3 w-3" />
                Verified Sudha Member
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-stone-50/30">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                <div className="p-3 bg-emerald-50 rounded-2xl w-fit mb-3">
                  <Package className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{user.ordersCount}</div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">Total Orders</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                <div className="p-3 bg-amber-50 rounded-2xl w-fit mb-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">2026</div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">Joined Year</div>
              </div>
            </div>

            {/* Menu */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-5 bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-black text-slate-900 block">My Harvest History</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">Manage previous orders</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-emerald-600 transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-5 bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                    <Star className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-black text-slate-900 block">Sudha Rewards</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">You have 450 points</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-emerald-600 transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-5 bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-stone-50 rounded-xl text-stone-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="font-black text-slate-900 block">Account Settings</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">Profile, Privacy & Security</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-stone-300 group-hover:text-emerald-600 transition-colors" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-stone-100 bg-white">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 py-5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-[1.5rem] font-black transition-all active:scale-95"
            >
              <LogOut className="h-5 w-5" />
              Logout from Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
