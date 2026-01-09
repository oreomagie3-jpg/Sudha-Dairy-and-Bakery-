
import React, { useState, useEffect } from 'react';
import { X, Timer, Sparkles, Star, Calendar, Heart, PartyPopper, Cake, Settings, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CountdownEvent } from '../types';

interface CountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CountdownEvent[];
  onSetNew: () => void;
}

const CountdownModal: React.FC<CountdownModalProps> = ({ isOpen, onClose, events, onSetNew }) => {
  const [activeEvent, setActiveEvent] = useState<CountdownEvent>(events[0]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!activeEvent && events.length > 0) {
      setActiveEvent(events[0]);
    }
  }, [events, activeEvent]);

  useEffect(() => {
    if (!isOpen || !activeEvent) return;

    // Trigger celebratory effect
    const colors = activeEvent.category === 'Birthday' ? ['#f59e0b', '#059669', '#ffffff'] :
                   activeEvent.category === 'Anniversary' ? ['#ef4444', '#f87171', '#ffffff'] :
                   ['#3b82f6', '#10b981', '#ffffff'];

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors
    });

    const targetDate = new Date(activeEvent.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, activeEvent]);

  if (!isOpen) return null;

  // Added className parameter to support different sizes without React.cloneElement to avoid type errors
  const getCategoryIcon = (category: string, className: string = "h-6 w-6") => {
    switch (category) {
      case 'Birthday': return <Cake className={className} />;
      case 'Anniversary': return <Heart className={`${className} fill-current`} />;
      case 'Festival': return <Sparkles className={className} />;
      default: return <Timer className={className} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Birthday': return 'bg-amber-400 text-amber-900';
      case 'Anniversary': return 'bg-rose-500 text-white';
      case 'Festival': return 'bg-indigo-500 text-white';
      default: return 'bg-emerald-500 text-white';
    }
  };

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-14 sm:w-20 h-20 sm:h-28 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-emerald-100 overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-stone-50 border-b border-stone-100" />
          <span className="relative z-10 text-2xl sm:text-4xl font-black text-emerald-900 tabular-nums">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-3 text-[8px] sm:text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/95 backdrop-blur-2xl animate-in fade-in duration-500"
        onClick={onClose} 
      />
      
      {/* Purity Wave Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)] animate-pulse" />
      </div>

      <div className="relative w-full max-w-6xl h-[90vh] flex flex-col sm:flex-row gap-8 animate-in zoom-in-95 duration-500 p-4">
        
        {/* Featured Selection Header/Timer (Left Side Desktop, Top Mobile) */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 sm:-top-16 sm:right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md border border-white/20 z-20"
          >
            <X className="h-6 w-6" />
          </button>

          {activeEvent && (
            <div className="w-full animate-in slide-in-from-left duration-700">
              <div className={`${getCategoryColor(activeEvent.category)} w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12 transition-all duration-500 border-4 border-white/20`}>
                {getCategoryIcon(activeEvent.category)}
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                {activeEvent.name}
              </h2>
              <div className="flex items-center justify-center gap-3 text-emerald-400 font-bold mb-10">
                 <div className="h-px w-10 bg-emerald-500/30" />
                 <span className="uppercase tracking-[0.2em] text-[12px] text-white font-black flex items-center gap-2">
                   <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                   Shared By {activeEvent.createdBy}
                 </span>
                 <div className="h-px w-10 bg-emerald-500/30" />
              </div>

              <div className="flex justify-center gap-4 sm:gap-8 mb-16">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <TimeUnit value={timeLeft.seconds} label="Secs" />
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="bg-white/5 px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
                   <p className="text-white text-[12px] uppercase tracking-[0.3em] font-black flex items-center gap-3">
                     <Calendar className="h-4 w-4 text-emerald-400" />
                     {new Date(activeEvent.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                   </p>
                </div>
                <button 
                  onClick={onClose}
                  className="group flex items-center gap-3 bg-white text-emerald-900 px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Celebrate Together
                  <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: All Community Countdowns */}
        <div className="w-full sm:w-[420px] bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/20 flex flex-col overflow-hidden shadow-2xl relative">
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-2xl">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg tracking-tight">Community Hub</h3>
                <p className="text-[10px] text-emerald-400/60 uppercase tracking-[0.2em] font-black">Online Celebrations</p>
              </div>
            </div>
            <button 
              onClick={onSetNew}
              className="p-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl transition-all shadow-xl active:scale-90 border border-emerald-400 group"
              title="Post Your Event"
            >
              <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveEvent(event)}
                className={`w-full text-left p-5 rounded-[2.5rem] transition-all group border relative overflow-hidden ${
                  activeEvent?.id === event.id 
                    ? 'bg-white/20 border-white/30 shadow-2xl scale-[1.02]' 
                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                }`}
              >
                {activeEvent?.id === event.id && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-emerald-400" />
                )}
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getCategoryColor(event.category)} shadow-lg border-2 border-white/20`}>
                    {/* Fixed React.cloneElement type error by passing className directly to the refactored getCategoryIcon */}
                    {getCategoryIcon(event.category, 'h-5 w-5')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-black text-base truncate tracking-tight">{event.name}</h4>
                    <p className="text-white/40 text-[10px] font-bold mt-1 truncate uppercase tracking-[0.15em] flex items-center gap-2">
                       By {event.createdBy}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                       <span className="text-emerald-400 text-[11px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                         {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                       </span>
                       {activeEvent?.id !== event.id && (
                        <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-white transition-all group-hover:translate-x-1" />
                       )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-8 bg-white/5 border-t border-white/10 text-center">
             <p className="hindi-font text-emerald-400 font-bold text-sm mb-1">एक साथ मिलकर खुशियां मनाएं ✨</p>
             <p className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-black">Sudha Purity Hub</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownModal;
