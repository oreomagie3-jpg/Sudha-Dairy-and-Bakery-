
import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Clock,
  Star,
  Grid,
  CalendarDays,
  Send,
  MessageCircle,
  Instagram,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SudhaLogo } from './Header';

interface Holiday {
  date: number;
  monthIdx: number;
  name: string;
  hindiName: string;
  summary: string;
  gridEmoji: string;
  bgColor: string;
  isFounderBirthday?: boolean;
  instagram?: string;
}

interface MonthStyle {
  en: string;
  hi: string;
  wrapperClass: string;
}

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HOLIDAYS: Holiday[] = [
  { date: 1, monthIdx: 0, name: 'New Year Day', hindiName: 'नव वर्ष', gridEmoji: '🎊', summary: 'Celebrating the start of 2026 with fresh Sudha sweets!', bgColor: 'bg-blue-500' },
  { date: 14, monthIdx: 0, name: 'Makar Sankranti', hindiName: 'मकर संक्रांति', gridEmoji: '🪁', summary: 'The harvest festival. Time for Tilkut and fresh milk preparations.', bgColor: 'bg-orange-500' },
  { date: 26, monthIdx: 0, name: 'Republic Day', hindiName: 'गणतंत्र दिवस', gridEmoji: '🇮🇳', summary: 'Honoring the Constitution of India. Official Holiday.', bgColor: 'bg-indigo-600' },
  
  // Valentine's Week
  { date: 7, monthIdx: 1, name: 'Rose Day', hindiName: 'रोज डे', gridEmoji: '🌹', summary: 'Start the week of love with a rose and Sudha sweets.', bgColor: 'bg-pink-400' },
  { date: 8, monthIdx: 1, name: 'Propose Day', hindiName: 'प्रपोज डे', gridEmoji: '💍', summary: 'Make it special with our gourmet heart-shaped cakes.', bgColor: 'bg-purple-500' },
  { date: 9, monthIdx: 1, name: 'Chocolate Day', hindiName: 'चॉकलेट डे', gridEmoji: '🍫', summary: 'The perfect day for our artisan Sudha chocolate truffles!', bgColor: 'bg-amber-800' },
  { date: 10, monthIdx: 1, name: 'Teddy Day', hindiName: 'टेडी डे', gridEmoji: '🧸', summary: 'Soft gifts and sweet treats for your loved ones.', bgColor: 'bg-orange-400' },
  { date: 11, monthIdx: 1, name: 'Promise Day', hindiName: 'प्रॉमिस डे', gridEmoji: '🤝', summary: 'A promise of purity and freshness from Sudha Dairy.', bgColor: 'bg-blue-400' },
  { date: 12, monthIdx: 1, name: 'Hug Day', hindiName: 'हग डे', gridEmoji: '🫂', summary: 'Warm hugs and warm bakes. Share the love.', bgColor: 'bg-rose-400' },
  { date: 13, monthIdx: 1, name: 'Kiss Day', hindiName: 'किस डे', gridEmoji: '💋', summary: 'Sweetness in every bite of our fresh pastries.', bgColor: 'bg-red-400' },
  { date: 14, monthIdx: 1, name: "Valentine's Day", hindiName: 'वेलेंटाइन डे', gridEmoji: '❤️', summary: 'Grand celebration of love. Order our signature red velvet cakes.', bgColor: 'bg-red-600' },
  
  { 
    date: 25, 
    monthIdx: 1, 
    name: "Virat Goyal's Birthday", 
    hindiName: 'विराट गोयल का जन्मदिन', 
    gridEmoji: '👑', 
    summary: 'Celebrating the visionary founder of Sudha Dairy & Bakers. Send your best wishes!', 
    bgColor: 'bg-amber-600', 
    isFounderBirthday: true,
    instagram: 'virat.goyal25'
  },
  { date: 4, monthIdx: 2, name: 'Holi Festival', hindiName: 'होली उत्सव', gridEmoji: '🎨', summary: 'The grand festival of colors! Order special Gujiya and Lassi.', bgColor: 'bg-pink-500' },
  { date: 15, monthIdx: 7, name: 'Independence Day', hindiName: 'स्वतंत्रता दिवस', gridEmoji: '🇮🇳', summary: 'Celebrating 79 years of freedom. Official Holiday.', bgColor: 'bg-orange-600' },
  { date: 28, monthIdx: 7, name: 'Raksha Bandhan', hindiName: 'रक्षाबंधन', gridEmoji: '🪯', summary: 'The bond of sibling love. Celebrate with Sudha premium cakes.', bgColor: 'bg-pink-400' },
  { date: 2, monthIdx: 9, name: 'Gandhi Jayanti', hindiName: 'गांधी जयंती', gridEmoji: '🕊️', summary: 'Remembering the Father of the Nation. Official Holiday.', bgColor: 'bg-stone-600' },
  { date: 20, monthIdx: 9, name: 'Dussehra', hindiName: 'दशहरा', gridEmoji: '🏹', summary: 'Victory of good over evil. Time for festive gathering and sweets.', bgColor: 'bg-red-500' },
  { date: 8, monthIdx: 10, name: 'Diwali', hindiName: 'दीपावली', gridEmoji: '🪔', summary: 'The Festival of Lights! Spreading joy and artisan Sudha sweets.', bgColor: 'bg-amber-500' },
  { date: 16, monthIdx: 10, name: 'Chhath Puja', hindiName: 'छठ पूजा', gridEmoji: '☀️', summary: 'Bihar\'s great festival honoring the Sun God. Order fresh milk in bulk.', bgColor: 'bg-orange-400' },
  { date: 25, monthIdx: 11, name: 'Christmas', hindiName: 'क्रिसमस', gridEmoji: '🎄', summary: 'Merry Christmas! Enjoy our special holiday plum cakes.', bgColor: 'bg-emerald-600' }
];

const MONTH_STYLES: MonthStyle[] = [
  { en: 'January', hi: 'जनवरी', wrapperClass: 'from-blue-500 to-indigo-600' },
  { en: 'February', hi: 'फरवरी', wrapperClass: 'from-rose-500 to-red-600' },
  { en: 'March', hi: 'मार्च', wrapperClass: 'from-emerald-400 to-teal-600' },
  { en: 'April', hi: 'अप्रैल', wrapperClass: 'from-amber-400 to-orange-500' },
  { en: 'May', hi: 'मई', wrapperClass: 'from-indigo-400 to-purple-600' },
  { en: 'June', hi: 'जून', wrapperClass: 'from-teal-400 to-emerald-600' },
  { en: 'July', hi: 'जुलाई', wrapperClass: 'from-cyan-400 to-blue-600' },
  { en: 'August', hi: 'अगस्त', wrapperClass: 'from-orange-400 to-red-600' },
  { en: 'September', hi: 'सितंबर', wrapperClass: 'from-purple-400 to-fuchsia-600' },
  { en: 'October', hi: 'अक्टूबर', wrapperClass: 'from-fuchsia-400 to-pink-600' },
  { en: 'November', hi: 'नवंबर', wrapperClass: 'from-slate-500 to-slate-700' },
  { en: 'December', hi: 'दिसंबर', wrapperClass: 'from-sky-400 to-blue-600' }
];

const Watermark: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col items-center justify-center select-none">
      <div className="flex flex-wrap gap-24 -rotate-12 w-[160%] h-[160%] items-center justify-center opacity-[0.04]">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="hindi-font font-black text-5xl whitespace-nowrap tracking-widest">
            सुधा डेयरी & बेकर्स
          </div>
        ))}
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <div className="opacity-[0.22] scale-150 grayscale brightness-200 contrast-200">
          <SudhaLogo size="xl" />
        </div>
        <div className="opacity-[0.12] text-center">
          <p className="hindi-font font-black text-6xl text-white tracking-[0.2em] drop-shadow-2xl">सुधा</p>
          <p className="text-[12px] font-black text-white uppercase tracking-[1em] mt-2">Authenticated</p>
        </div>
      </div>
    </div>
  );
};

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(new Date().getMonth());
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [isYearView, setIsYearView] = useState(false);
  const [wishMessage, setWishMessage] = useState('');
  const [isWishSent, setIsWishSent] = useState(false);

  if (!isOpen) return null;

  const activeStyle = MONTH_STYLES[currentMonthIdx];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const triggerHolidayEffect = (holiday: Holiday) => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 150, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    // "Fly in the air" effect using the holiday's own emoji
    const emojiShape = (confetti as any).shapeFromText({ text: holiday.gridEmoji, scalar: 3.5 });
    
    // Multiple fountains of emojis
    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(60 * particleRatio),
        shapes: [emojiShape],
        scalar: 3.5,
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.5, y: 0.8 } });
    fire(0.2, { spread: 60, origin: { x: 0.5, y: 0.8 } });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 4, origin: { x: 0.5, y: 0.8 } });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 2.5, origin: { x: 0.5, y: 0.8 } });
    fire(0.1, { spread: 120, startVelocity: 45, origin: { x: 0.5, y: 0.8 } });

    // Side bursts
    confetti({
      ...defaults,
      particleCount: 20,
      shapes: [emojiShape],
      origin: { x: 0, y: 0.6 },
      angle: 60,
      spread: 55,
      startVelocity: 60,
      scalar: 3,
    });
    confetti({
      ...defaults,
      particleCount: 20,
      shapes: [emojiShape],
      origin: { x: 1, y: 0.6 },
      angle: 120,
      spread: 55,
      startVelocity: 60,
      scalar: 3,
    });

    // Specific themed background color confetti
    if (holiday.name === 'Holi Festival' || holiday.gridEmoji === '🎨') {
      const colors = ['#ec4899', '#ef4444', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        
        confetti({
          ...defaults,
          particleCount: 50,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: colors,
          startVelocity: 30,
        });
        confetti({
          ...defaults,
          particleCount: 50,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: colors,
          startVelocity: 30,
        });
      }, 250);
    } else if (['❤️', '🌹', '💋', '🫂', '💍'].includes(holiday.gridEmoji)) {
      const heart = (confetti as any).shapeFromPath({ path: 'M167 10c-75 0-75 79-75 79c0 45 45 88 100 125c55-37 100-80 100-125c0 0 0-79-75-79c-35 0-47 21-50 30c-3-9-15-30-50-30z' });
      confetti({
        shapes: [heart],
        particleCount: 60,
        scalar: 2.5,
        colors: ['#ff0000', '#ff69b4', '#ff1493'],
        origin: { y: 0.6 }
      });
    } else if (holiday.gridEmoji === '🇮🇳') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#128807']
      });
    } else if (['🪔', '☀️'].includes(holiday.gridEmoji)) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFFFFF']
      });
    } else if (holiday.isFounderBirthday) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff']
      });
    }
  };

  const handleHolidaySelect = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setIsWishSent(false);
    triggerHolidayEffect(holiday);
  };

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth(2026, currentMonthIdx);
  const firstDayIndex = days[0].getDay();
  const currentMonthHolidays = HOLIDAYS.filter(h => h.monthIdx === currentMonthIdx).sort((a, b) => a.date - b.date);

  const navigateMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentMonthIdx((prev) => (prev === 11 ? 0 : prev + 1));
    } else {
      setCurrentMonthIdx((prev) => (prev === 0 ? 11 : prev - 1));
    }
    setSelectedHoliday(null);
    setIsWishSent(false);
    setWishMessage('');
  };

  const selectMonthFromYear = (idx: number) => {
    setCurrentMonthIdx(idx);
    setIsYearView(false);
  };

  const handleSendFounderWish = () => {
    if (!wishMessage.trim()) return;
    setIsWishSent(true);
    const founderBday = HOLIDAYS.find(h => h.isFounderBirthday);
    if (founderBday) triggerHolidayEffect(founderBday);
    setWishMessage('');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      
      <div className={`relative w-full max-w-5xl h-[90vh] bg-gradient-to-br ${isYearView ? 'from-emerald-800 to-emerald-950' : activeStyle.wrapperClass} rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 transition-colors duration-700`}>
        
        <Watermark />

        {/* Header */}
        <div className="p-8 sm:p-10 flex items-center justify-between text-white relative z-20">
          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/20 shadow-lg">
              {isYearView ? <Grid className="h-6 w-6" /> : <CalendarIcon className="h-6 w-6" />}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-xl">
                {isYearView ? 'Year 2026 Overview' : `${activeStyle.en} 2026`}
              </h2>
              <p className="hindi-font text-white/80 font-bold drop-shadow-lg">
                {isYearView ? '२०२६ वार्षिक दृश्य' : `${activeStyle.hi} २०२६`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isYearView && (
              <>
                <button 
                  onClick={() => setIsYearView(true)} 
                  className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-white/10 backdrop-blur-md shadow-lg"
                >
                  <Grid className="h-4 w-4" />
                  Full Year
                </button>
                <button onClick={() => navigateMonth('prev')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 backdrop-blur-md shadow-md"><ChevronLeft /></button>
                <button onClick={() => navigateMonth('next')} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 backdrop-blur-md shadow-md"><ChevronRight /></button>
              </>
            )}
            {isYearView && (
              <button 
                onClick={() => setIsYearView(false)} 
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all font-black text-xs uppercase tracking-widest border border-white/10 backdrop-blur-md shadow-lg"
              >
                <CalendarDays className="h-4 w-4" />
                Back to Detail
              </button>
            )}
            <button onClick={onClose} className="ml-4 p-3 bg-black/20 hover:bg-black/40 rounded-2xl transition-all border border-white/10 backdrop-blur-md shadow-md"><X /></button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white/10 backdrop-blur-xl m-4 sm:m-8 rounded-[2.5rem] flex flex-col overflow-hidden border border-white/20 shadow-inner relative z-10">
          
          {isYearView ? (
            /* Year Grid View */
            <div className="flex-1 overflow-y-auto p-10 scrollbar-hide animate-in fade-in duration-500">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MONTH_STYLES.map((style, idx) => {
                  const holidaysInMonth = HOLIDAYS.filter(h => h.monthIdx === idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => selectMonthFromYear(idx)}
                      className={`group relative h-48 rounded-[2rem] p-6 text-left transition-all hover:scale-105 active:scale-95 bg-gradient-to-br ${style.wrapperClass} border border-white/20 shadow-lg`}
                    >
                      <div className="relative z-10">
                        <h4 className="text-xl font-black text-white leading-tight drop-shadow-sm">{style.en}</h4>
                        <p className="hindi-font text-white/70 font-bold text-sm drop-shadow-sm">{style.hi}</p>
                        
                        <div className="mt-8 flex flex-wrap gap-1.5">
                          {holidaysInMonth.map((h, hIdx) => (
                            <span 
                              key={hIdx} 
                              onClick={(e) => { e.stopPropagation(); handleHolidaySelect(h); }}
                              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm shadow-sm backdrop-blur-sm border border-white/10 hover:bg-white/40 hover:scale-150 hover:rotate-12 transition-all active:scale-90" 
                              title={h.name}
                            >
                              {h.gridEmoji}
                            </span>
                          ))}
                          {holidaysInMonth.length === 0 && (
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Purity Daily</span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="absolute bottom-6 right-6 h-5 w-5 text-white/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Monthly Detail View */
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-hide animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Calendar Grid */}
                <div className="bg-white/10 rounded-[2.5rem] p-8 border border-white/10 shadow-lg relative overflow-hidden backdrop-blur-md">
                   <div className="absolute top-4 right-4 text-[8px] font-black text-white/10 uppercase tracking-[0.5em] select-none pointer-events-none">Sudha Authenticated Profile</div>
                  <div className="grid grid-cols-7 gap-3 mb-8">
                    {daysOfWeek.map(d => (
                      <div key={d} className="text-[11px] font-black text-white/40 text-center uppercase tracking-[0.3em]">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-3">
                    {Array.from({ length: firstDayIndex }).map((_, i) => <div key={i} />)}
                    {days.map(day => {
                      const dateNum = day.getDate();
                      const holiday = HOLIDAYS.find(h => h.date === dateNum && h.monthIdx === currentMonthIdx);
                      return (
                        <button
                          key={dateNum}
                          onClick={() => holiday && handleHolidaySelect(holiday)}
                          className={`aspect-square flex items-center justify-center rounded-2xl text-lg font-black transition-all relative group
                            ${holiday ? `${holiday.bgColor} text-white shadow-xl scale-110 z-10 hover:scale-125 active:scale-95 ring-2 ring-white/30` : 'text-white/80 hover:bg-white/10 border border-transparent hover:border-white/10'}`}
                        >
                          {holiday ? holiday.gridEmoji : dateNum}
                          {holiday && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-sm"></span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Info Panel */}
                <div className="flex flex-col gap-6">
                  <div className="bg-white/15 rounded-[2.5rem] p-8 flex-1 border border-white/10 shadow-xl backdrop-blur-md">
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-4 tracking-tight">
                      <Sparkles className="h-6 w-6 text-amber-300 fill-amber-300" />
                      {activeStyle.en} Highlights
                    </h3>
                    
                    <div className="space-y-4">
                      {currentMonthHolidays.length > 0 ? (
                        currentMonthHolidays.map((h) => (
                          <button
                            key={h.date}
                            onClick={() => handleHolidaySelect(h)}
                            className="w-full flex items-center gap-5 p-5 bg-white/5 hover:bg-white/15 rounded-3xl border border-white/5 transition-all text-left group hover:-translate-y-1 shadow-sm"
                          >
                            <div className={`w-14 h-14 ${h.bgColor} rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-white/20 group-hover:scale-125 group-hover:rotate-12 transition-transform`}>{h.gridEmoji}</div>
                            <div className="flex-1">
                              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{h.date} {activeStyle.en}</p>
                              <h4 className="text-white font-black text-lg">{h.name}</h4>
                            </div>
                            <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-white transition-all group-hover:translate-x-1" />
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-20 opacity-30 flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-white flex items-center justify-center mb-6">
                            <Clock className="h-8 w-8 text-white" />
                          </div>
                          <p className="text-white text-lg font-black tracking-tight">Enjoy the Sudha Freshness!</p>
                          <p className="text-white/50 text-[10px] uppercase tracking-widest mt-2">Purity in every drop</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selected Holiday Detail View Card */}
                  {selectedHoliday && (
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-6 duration-500 border border-white relative overflow-hidden group z-20">
                      <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:scale-150 transition-transform duration-1000">
                        <SudhaLogo size="xl" />
                      </div>
                      
                      <div className="flex items-start justify-between mb-6 relative z-10">
                        <div 
                          className={`w-16 h-16 ${selectedHoliday.bgColor} rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl border-4 border-white cursor-pointer hover:scale-125 hover:rotate-12 active:scale-95 transition-all`}
                          onClick={() => triggerHolidayEffect(selectedHoliday)}
                        >
                          {selectedHoliday.gridEmoji}
                        </div>
                        <button 
                          onClick={() => setSelectedHoliday(null)} 
                          className="p-2.5 hover:bg-stone-100 rounded-full transition-colors text-stone-400"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="mb-4">
                          <h4 className="text-2xl font-black text-slate-900 leading-tight mb-1">{selectedHoliday.name}</h4>
                          <p className="hindi-font text-emerald-600 font-bold text-lg">{selectedHoliday.hindiName}</p>
                          
                          {selectedHoliday.instagram && (
                            <a 
                              href={`https://instagram.com/${selectedHoliday.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-xl text-xs font-black border border-pink-100 hover:bg-pink-100 transition-colors"
                            >
                              <Instagram className="h-3.5 w-3.5" />
                              @{selectedHoliday.instagram.replace('@', '')}
                            </a>
                          )}
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 italic font-medium">"{selectedHoliday.summary}"</p>
                        
                        {selectedHoliday.isFounderBirthday ? (
                          <div className="mt-4">
                            {isWishSent ? (
                              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 font-black text-center animate-in zoom-in-95">
                                <Sparkles className="h-5 w-5 mx-auto mb-2 text-amber-500" />
                                Your message has been sent to Virat Goyal! ✨
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="relative">
                                  <MessageCircle className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
                                  <input 
                                    type="text" 
                                    placeholder="Type your birthday wish here..."
                                    value={wishMessage}
                                    onChange={(e) => setWishMessage(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium shadow-inner"
                                  />
                                </div>
                                <button 
                                  onClick={handleSendFounderWish}
                                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-100 transition-all active:scale-95"
                                >
                                  Send Birthday Wish <Send className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div 
                            className="flex items-center gap-3 text-[11px] font-black text-emerald-700 bg-emerald-50 px-5 py-2.5 rounded-full uppercase tracking-[0.1em] w-fit border border-emerald-100 shadow-sm cursor-pointer hover:bg-emerald-100 hover:scale-105 transition-all"
                            onClick={() => triggerHolidayEffect(selectedHoliday)}
                          >
                            <Star className="h-4 w-4 fill-current animate-pulse" />
                            Launch Icons! ✨
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 pb-10 flex items-center justify-between text-white/50 text-[11px] font-black uppercase tracking-[0.4em] relative z-20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
            Bihar's Pride • सुधा डेयरी
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
              <Camera className="h-3 w-3 group-hover:scale-110 transition-transform" />
              <span>Screenshot Ready</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <span>2026 Official Digital Calendar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
