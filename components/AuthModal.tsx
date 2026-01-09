
import React, { useState } from 'react';
import { X, Lock, User, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { SudhaLogo } from './Header';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser: UserType = {
        name: formData.name || (mode === 'login' ? 'Vikas Mali' : 'New Member'),
        mobile: formData.mobile || '7976024396',
        ordersCount: mode === 'login' ? 12 : 0,
        joinDate: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name || formData.mobile}`
      };
      
      setIsLoading(false);
      onAuthSuccess(mockUser);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(6,78,59,0.3)] overflow-hidden animate-in zoom-in-95 duration-500 border border-emerald-50">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2.5 hover:bg-stone-100 rounded-full text-stone-400 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <SudhaLogo size="lg" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {mode === 'login' ? 'Welcome Back!' : 'Join the Family'}
            </h2>
            <p className="hindi-font text-emerald-600 font-bold mt-2">
              {mode === 'login' ? 'सुधा डेयरी में आपका स्वागत है' : 'आज ही सुधा परिवार से जुड़ें'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-stone-100 p-1.5 rounded-[1.25rem] mb-10">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${mode === 'login' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${mode === 'signup' ? 'bg-white text-emerald-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-4 h-5 w-5 text-stone-400" />
                <input 
                  type="text" 
                  required
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
                />
              </div>
            )}

            <div className="relative">
              <Phone className="absolute left-4 top-4 h-5 w-5 text-stone-400" />
              <input 
                type="tel" 
                required
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 h-5 w-5 text-stone-400" />
              <input 
                type="password" 
                required
                placeholder="Secure Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
              />
            </div>

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs font-black text-emerald-600 hover:text-emerald-700 tracking-wide uppercase">Forgot Password?</button>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4.5 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95 text-lg disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Access Account' : 'Register Now'}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-6 text-stone-400 font-black tracking-[0.2em]">Social Access</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-3 py-4 border border-stone-100 rounded-[1.25rem] hover:bg-stone-50 transition-all active:scale-95 group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
              <span className="text-sm font-black text-slate-700">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-3 py-4 border border-stone-100 rounded-[1.25rem] hover:bg-stone-50 transition-all active:scale-95 group">
              <Phone className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-black text-slate-700">SMS OTP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
