
import React, { useState } from 'react';
import { X, Calendar, Sparkles, Heart, Cake, Star, Send, PartyPopper, User } from 'lucide-react';
import { CountdownEvent, CountdownCategory } from '../types';

interface SetCountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<CountdownEvent, 'id'>) => void;
}

const SetCountdownModal: React.FC<SetCountdownModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    category: 'Birthday' as CountdownCategory,
    createdBy: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.createdBy) return;
    
    // Ensure date has time if not provided
    const dateStr = formData.date.includes('T') ? formData.date : `${formData.date}T00:00:00`;
    
    onSubmit({
      ...formData,
      date: dateStr
    });
    onClose();
    // Reset form
    setFormData({ name: '', date: '', category: 'Birthday', createdBy: '' });
  };

  const categories: { type: CountdownCategory; icon: React.ReactNode; label: string; color: string }[] = [
    { type: 'Birthday', icon: <Cake className="h-5 w-5" />, label: 'Birthday', color: 'text-amber-500 bg-amber-50' },
    { type: 'Anniversary', icon: <Heart className="h-5 w-5" />, label: 'Anniversary', color: 'text-rose-500 bg-rose-50' },
    { type: 'Festival', icon: <Sparkles className="h-5 w-5" />, label: 'Festival', color: 'text-indigo-500 bg-indigo-50' },
    { type: 'Special', icon: <Star className="h-5 w-5" />, label: 'Special Day', color: 'text-emerald-500 bg-emerald-50' }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-emerald-50">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2.5 hover:bg-stone-100 rounded-full text-stone-400 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="bg-emerald-100 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-emerald-600 font-black text-2xl mx-auto mb-6 shadow-xl shadow-emerald-50">
              <PartyPopper className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Set Celebration</h2>
            <p className="hindi-font text-emerald-600 font-bold mt-2">अपना खास दिन चुनें ✨</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Category Picker */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.type })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    formData.category === cat.type 
                      ? 'border-emerald-500 ring-4 ring-emerald-50' 
                      : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    formData.category === cat.type ? 'text-emerald-900' : 'text-slate-500'
                  }`}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name (Creator)"
                  value={formData.createdBy}
                  onChange={(e) => setFormData({...formData, createdBy: e.target.value})}
                  className="w-full pl-14 pr-6 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
                />
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  required
                  placeholder="Event Name (e.g., Mom's Birthday)"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
                />
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full pl-14 pr-6 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-black text-slate-700"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95 text-lg"
            >
              Start Countdown
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetCountdownModal;
