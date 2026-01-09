
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am Sudha Sahayak, your personal dairy and bakery guide. How can I brighten your day?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await geminiService.getChatResponse(messages, userText);
    
    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that. Could you try rephrasing?" }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <div className="w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-emerald-100 animate-in slide-in-from-bottom-6 duration-500">
          {/* Header */}
          <div className="bg-emerald-600 p-5 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                <Sparkles className="h-5 w-5 text-amber-300 fill-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-lg">Sudha Sahayak</h3>
                <p className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-black">Powered by Purity</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow-lg' 
                    : 'bg-white border border-stone-200 text-slate-800 shadow-sm rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 p-4 rounded-3xl rounded-tl-none shadow-sm flex gap-1.5 items-center">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 bg-white border-t border-stone-100 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about cakes, milk, or health..."
              className="flex-1 bg-stone-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder:text-stone-400 font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-100 active:scale-90"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-5 rounded-full shadow-[0_20px_50px_rgba(5,150,105,0.3)] hover:scale-110 transition-all flex items-center gap-3 group ring-4 ring-emerald-50/50"
        >
          <Sparkles className="h-6 w-6 text-amber-300 fill-amber-300" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black text-sm pr-2">
            Talk to Sahayak
          </span>
        </button>
      )}
    </div>
  );
};

export default AIChat;
