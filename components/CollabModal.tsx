
import React, { useState } from 'react';
import { X, Handshake, User, Phone, Briefcase, MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CollabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CollabModal: React.FC<CollabModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Franchise',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#059669', '#3b82f6', '#f59e0b']
    });

    // Reset after some time if they want to submit another
    setTimeout(() => {
      // Logic for keeping the success state or closing
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose} 
      />
      
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.3)] overflow-hidden animate-in zoom-in-95 duration-500 border border-stone-100 flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2.5 hover:bg-stone-100 rounded-full text-stone-400 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex-1 overflow-y-auto p-8 sm:p-12 scrollbar-hide">
          {isSubmitted ? (
            <div className="text-center py-12 animate-in zoom-in-90 duration-500">
              <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-inner">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Request Received!</h2>
              <p className="text-slate-500 leading-relaxed mb-10">
                Our team will reach out to you within 48 hours to discuss this collaboration. 
                Thank you for choosing <span className="text-emerald-600 font-black">Sudha</span>!
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-black transition-all active:scale-95"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <div className="bg-blue-600 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-2xl shadow-blue-200">
                  <Handshake className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Partner with Us</h2>
                <p className="hindi-font text-blue-600 font-bold mt-2 tracking-wide">सुधा के साथ नए सफर की शुरुआत करें ✨</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="relative group">
                  <User className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="Your Full Name / Business Owner"
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-2xl text-sm outline-none transition-all border font-medium"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="tel" 
                    required
                    placeholder="Contact Number (WhatsApp Preferred)"
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-2xl text-sm outline-none transition-all border font-medium"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="relative group">
                  <Briefcase className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-blue-500 transition-colors" />
                  <select 
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-2xl text-sm outline-none transition-all border font-black text-slate-700 appearance-none"
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="Franchise">Franchise Inquiry (नया आउटलेट)</option>
                    <option value="Supplier">Bulk Supply (दूध और बेकरी)</option>
                    <option value="Marketing">Marketing/Events (सहयोग)</option>
                    <option value="Other">Other Business Interest</option>
                  </select>
                </div>

                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-blue-500 transition-colors" />
                  <textarea 
                    placeholder="Tell us about your proposal..."
                    className="w-full pl-12 pr-4 py-4 bg-stone-50 border-stone-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-2xl text-sm outline-none transition-all border font-medium h-32 resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] font-black shadow-2xl shadow-blue-100 transition-all flex items-center justify-center gap-3 mt-4 active:scale-95 text-lg"
                >
                  Send Proposal
                  <Send className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-10 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                <div className="flex items-center gap-3 text-blue-800 font-black text-sm mb-2">
                  <Sparkles className="h-4 w-4" />
                  Why Collab with Sudha?
                </div>
                <p className="text-blue-700/60 text-[11px] leading-relaxed">
                  Join a legacy of purity that reaches millions. We offer robust support, 
                  verified supply chains, and a brand name that stands for quality in every Bihar home.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollabModal;
