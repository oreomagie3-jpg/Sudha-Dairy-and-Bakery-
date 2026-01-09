
import React, { useState, useRef } from 'react';
import { X, User, Camera, Instagram, Send, Cake, PartyPopper, Upload, Image as ImageIcon } from 'lucide-react';
import { BirthdayCustomer } from '../types';

interface BirthdayFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Added 'personalWishes' to the Omit list to match the data being submitted and the handler in App.tsx
  onSubmit: (data: Omit<BirthdayCustomer, 'id' | 'wishCount' | 'postedAt' | 'personalWishes'>) => void;
}

const BirthdayFormModal: React.FC<BirthdayFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    instagram: '',
    wish: 'Celebrating my special day with Sudha Dairy & Bakers! 🍰✨'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for local storage/demo
        alert("Please select an image smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    // Default avatar if no photo provided
    const photo = formData.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`;
    
    // The submitted object now matches the updated onSubmit type (omitting personalWishes)
    onSubmit({
      ...formData,
      photo
    });
    onClose();
    setFormData({ name: '', photo: '', instagram: '', wish: 'Celebrating my special day with Sudha Dairy & Bakers! 🍰✨' });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md animate-in fade-in duration-500"
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
          <div className="text-center mb-10 relative">
            {/* Cute Decorative Emojis */}
            <span className="absolute -top-4 left-0 text-2xl animate-bounce">🎈</span>
            <span className="absolute -top-4 right-0 text-2xl animate-bounce delay-150">🎁</span>
            
            <div className="bg-amber-100 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-amber-600 font-black text-2xl mx-auto mb-6 shadow-xl shadow-amber-50">
              <Cake className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Party Time! 🥳</h2>
            <p className="hindi-font text-emerald-600 font-bold mt-2">अपना जन्मदिन प्रोफाइल अपडेट करें ✨</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Photo Upload Section */}
            <div className="flex flex-col items-center gap-4 mb-2">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-32 h-32 rounded-full border-4 border-dashed border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-center bg-stone-50 overflow-hidden group shadow-inner"
              >
                {formData.photo ? (
                  <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Camera className="h-8 w-8 text-stone-300 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Upload Photo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center">Click circle to choose image 📸</p>
            </div>

            <div className="relative group">
              <User className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                required
                placeholder="Your Beautiful Name 👤"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
              />
            </div>

            <div className="relative group">
              <Instagram className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-pink-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Instagram Username (Optional) 📱"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-50 rounded-2xl text-sm outline-none transition-all border font-medium"
              />
            </div>

            <div className="relative">
              <textarea 
                placeholder="A sweet wish for yourself! ✍️"
                value={formData.wish}
                onChange={(e) => setFormData({...formData, wish: e.target.value})}
                className="w-full p-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium h-24 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4.5 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95 text-lg"
            >
              Start Celebrating!
              <PartyPopper className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthdayFormModal;
