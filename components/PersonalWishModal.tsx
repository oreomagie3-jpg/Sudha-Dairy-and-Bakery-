
import React, { useState } from 'react';
import { X, Send, Heart, User, MessageCircle } from 'lucide-react';

interface PersonalWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (senderName: string, message: string) => void;
  recipientName: string;
}

const PersonalWishModal: React.FC<PersonalWishModalProps> = ({ isOpen, onClose, onSubmit, recipientName }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;
    onSubmit(senderName, message);
    setSenderName('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-emerald-50">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full text-stone-400 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-rose-100 w-12 h-12 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-4 shadow-sm">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Send a Sweet Wish</h3>
            <p className="text-sm text-slate-500 mt-1">To <span className="text-emerald-600 font-bold">{recipientName}</span> 🍰</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-stone-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                required
                placeholder="Your Name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium"
              />
            </div>

            <div className="relative group">
              <MessageCircle className="absolute left-4 top-3.5 h-4 w-4 text-stone-400 group-focus-within:text-emerald-500 transition-colors" />
              <textarea 
                required
                placeholder="Write your personal message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium h-24 resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              Send Wish ✨
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalWishModal;
