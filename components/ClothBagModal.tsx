
import React, { useState, useRef } from 'react';
import { X, ShoppingBag, Leaf, CheckCircle2, Store, Truck, Bike, Wallet, Banknote, ArrowLeft, ArrowRight, Sparkles, ReceiptText, User, Phone, MapPin, PartyPopper, Trophy, QrCode, Copy, ImageIcon, Upload, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClothBagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalConfirm: (deliveryMethod: 'pickup' | 'delivery', paymentMethod: 'cash' | 'online', customerDetails: CustomerDetails, screenshot: string | null) => void;
}

interface CustomerDetails {
  name: string;
  mobile: string;
  address: string;
}

type ModalStep = 'promise' | 'delivery' | 'details' | 'payment' | 'qr-payment' | 'success';

const SHOP_ADDRESS = "Sudha Dairy & Bakers: Opposite BSNL Tower, Rayala Chauraha Main";
const PAYMENT_MOBILE = "79760 24396";
const MERCHANT_NAME = "VIKAS MALI";
const UPI_ID = "BHARATPE.8A0B1Q0M6S89813@fbpe";
// Dynamically generate a high-quality QR code based on the provided BharatPe details
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&mc=0000&mode=02&purpose=00`;

const ClothBagModal: React.FC<ClothBagModalProps> = ({ isOpen, onClose, onFinalConfirm }) => {
  const [step, setStep] = useState<ModalStep>('promise');
  const [selectedDelivery, setSelectedDelivery] = useState<'pickup' | 'delivery' | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'online' | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    mobile: '',
    address: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleGotIt = () => {
    setStep('delivery');
  };

  const handleDeliverySelection = (method: 'pickup' | 'delivery') => {
    setSelectedDelivery(method);
    setCustomerDetails(prev => ({
      ...prev,
      address: method === 'pickup' ? SHOP_ADDRESS : ''
    }));
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerDetails.name && customerDetails.mobile && customerDetails.address) {
      setStep('payment');
    }
  };

  const triggerBigCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    const count = 200;
    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        origin: { y: 0.7 }
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handlePaymentSelection = (paymentMethod: 'cash' | 'online') => {
    setSelectedPayment(paymentMethod);
    if (paymentMethod === 'online') {
      setStep('qr-payment');
    } else {
      setStep('success');
      triggerBigCelebration();
    }
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmPaid = () => {
    setStep('success');
    triggerBigCelebration();
  };

  const handleFinish = () => {
    if (selectedDelivery && selectedPayment) {
      onFinalConfirm(selectedDelivery, selectedPayment, customerDetails, paymentScreenshot);
    }
    setTimeout(() => {
      setStep('promise');
      setSelectedDelivery(null);
      setSelectedPayment(null);
      setPaymentScreenshot(null);
      setCustomerDetails({ name: '', mobile: '', address: '' });
    }, 500);
  };

  const isDetailsValid = customerDetails.name.trim() !== '' && 
                        customerDetails.mobile.trim().length >= 10 && 
                        customerDetails.address.trim() !== '';

  // Only require screenshot for home delivery + online payment
  const isPaidDisabled = selectedDelivery === 'delivery' && !paymentScreenshot;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md animate-in fade-in duration-500"
        onClick={step === 'success' ? handleFinish : onClose} 
      />
      
      <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-emerald-100 p-8 sm:p-12 text-center min-h-[600px] flex flex-col justify-center">
        {/* Background Decorative Circles */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#059669_0%,_transparent_70%)]" />
        </div>

        {/* Top Actions */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
          {(step !== 'promise' && step !== 'success') ? (
            <button 
              onClick={() => {
                if (step === 'delivery') setStep('promise');
                if (step === 'details') setStep('delivery');
                if (step === 'payment') setStep('details');
                if (step === 'qr-payment') setStep('payment');
              }}
              className="p-2.5 hover:bg-stone-100 rounded-full text-stone-400 transition-colors flex items-center gap-1 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </button>
          ) : <div />}
          
          <button 
            onClick={step === 'success' ? handleFinish : onClose}
            className="p-2.5 hover:bg-stone-100 rounded-full text-stone-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative z-10 mt-4">
          {step === 'promise' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-inner border border-emerald-100 animate-bounce">
                <ShoppingBag className="h-10 w-10" />
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <Leaf className="h-3 w-3" />
                Eco-Sudha Initiative
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Green Message! 🌱</h2>
              
              <div className="space-y-4 mb-10">
                <p className="hindi-font text-emerald-700 font-bold text-xl leading-relaxed">
                  सुधा का संदेश: हमेशा कपड़े या कागज का थैला साथ रखें, पॉलीथीन का नहीं!
                </p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  "Please always carry a <span className="text-emerald-600 font-bold">cloth or paper bag</span> with you and <span className="text-rose-500 font-bold">not a polythene bag</span>. Let's keep our environment as pure as our milk."
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleGotIt}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 text-lg"
                >
                  I Promise to be Green!
                  <CheckCircle2 className="h-5 w-5" />
                </button>
                <p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Helping Bihar stay clean</p>
              </div>
            </div>
          )}

          {step === 'delivery' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-600 mx-auto mb-6 shadow-inner border border-amber-100">
                <Bike className="h-8 w-8" />
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Delivery Choice</h2>
              <p className="hindi-font text-emerald-600 font-bold text-lg mb-8">आप अपना ऑर्डर कैसे प्राप्त करना चाहेंगे?</p>
              
              <div className="grid gap-4">
                <button 
                  onClick={() => handleDeliverySelection('pickup')}
                  className="flex items-center gap-6 p-6 bg-stone-50 hover:bg-white hover:shadow-xl hover:border-emerald-200 border border-stone-100 rounded-[2rem] transition-all group text-left"
                >
                  <div className="bg-emerald-100 p-4 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Store className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">Self Pickup</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">आउटलेट से लें</p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDeliverySelection('delivery')}
                  className="flex items-center gap-6 p-6 bg-stone-50 hover:bg-white hover:shadow-xl hover:border-emerald-200 border border-stone-100 rounded-[2rem] transition-all group text-left"
                >
                  <div className="bg-amber-100 p-4 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">Home Delivery</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">घर पर मंगवाएं</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-left">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 shadow-inner border border-blue-100">
                  <User className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Contact Details</h2>
                <p className="hindi-font text-emerald-600 font-bold text-sm">कृपया अपनी जानकारी दें ✨</p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-4 h-4 w-4 text-stone-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all font-medium"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-4 h-4 w-4 text-stone-400" />
                  <input 
                    type="tel" 
                    required
                    placeholder="Mobile Number"
                    className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all font-medium"
                    value={customerDetails.mobile}
                    onChange={(e) => setCustomerDetails({...customerDetails, mobile: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-4 w-4 text-stone-400" />
                  {selectedDelivery === 'pickup' ? (
                    <div className="w-full pl-12 pr-4 py-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-sm transition-all font-bold text-emerald-800">
                      <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-0.5">Pickup Location</p>
                      {SHOP_ADDRESS}
                    </div>
                  ) : (
                    <textarea 
                      required
                      placeholder="Full Delivery Address"
                      className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl text-sm outline-none transition-all border font-medium h-24 resize-none"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    />
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={!isDetailsValid}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:active:scale-100 text-white py-4 rounded-2xl font-black shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 active:scale-95 text-lg mt-6"
                >
                  Continue to Payment
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}

          {step === 'payment' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-inner border border-emerald-100">
                <Wallet className="h-8 w-8" />
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Payment Option</h2>
              <p className="hindi-font text-emerald-600 font-bold text-lg mb-8">भुगतान का तरीका चुनें</p>
              
              <div className="grid gap-4">
                <button 
                  onClick={() => handlePaymentSelection('cash')}
                  className="flex items-center gap-6 p-6 bg-stone-50 hover:bg-white hover:shadow-xl hover:border-emerald-200 border border-stone-100 rounded-[2rem] transition-all group text-left"
                >
                  <div className="bg-emerald-100 p-4 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Banknote className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">
                      {selectedDelivery === 'pickup' ? 'Pay at Counter' : 'Cash on Delivery'}
                    </h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">नकद भुगतान</p>
                  </div>
                </button>

                <button 
                  onClick={() => handlePaymentSelection('online')}
                  className="flex items-center gap-6 p-6 bg-stone-50 hover:bg-white hover:shadow-xl hover:border-emerald-200 border border-stone-100 rounded-[2rem] transition-all group text-left"
                >
                  <div className="bg-amber-100 p-4 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">Online Payment</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-0.5">UPI / कार्ड / नेट बैंकिंग</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 'qr-payment' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 h-full overflow-y-auto pr-1">
              <div className="mb-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Scan to Pay</h2>
                <p className="hindi-font text-emerald-600 font-bold text-sm">भुगतान करने के लिए स्कैन करें ✨</p>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">Paying to: {MERCHANT_NAME}</p>
              </div>

              <div className="bg-white p-3 rounded-[2rem] border-4 border-stone-50 shadow-inner mb-4 mx-auto w-fit relative group">
                <img 
                  src={QR_CODE_URL} 
                  alt="Payment QR Code" 
                  className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                />
                <div className="absolute inset-0 border-4 border-dashed border-emerald-500/10 rounded-[2rem] pointer-events-none group-hover:border-emerald-500/30 transition-all" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                      <Phone className="h-3 w-3" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">Mobile Number</p>
                      <p className="font-black text-slate-900 text-sm leading-none">{PAYMENT_MOBILE}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(PAYMENT_MOBILE)}
                    className="p-2 hover:bg-white hover:shadow-md rounded-xl text-stone-400 hover:text-emerald-600 transition-all"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                      <QrCode className="h-3 w-3" />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest leading-none mb-1">UPI ID</p>
                      <p className="font-black text-slate-900 text-[10px] leading-none">{UPI_ID}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(UPI_ID)}
                    className="p-2 hover:bg-white hover:shadow-md rounded-xl text-stone-400 hover:text-emerald-600 transition-all"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>

                {/* Screenshot Upload Section */}
                <div className="mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                  <p className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.1em] mb-3 text-left flex items-center gap-2">
                    <Camera className="h-3 w-3" />
                    Upload Payment Screenshot
                  </p>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-video rounded-xl border-2 border-dashed border-emerald-200 hover:border-emerald-400 transition-all cursor-pointer flex flex-col items-center justify-center bg-white overflow-hidden group shadow-sm"
                  >
                    {paymentScreenshot ? (
                      <img src={paymentScreenshot} alt="Payment Proof" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="h-6 w-6 text-emerald-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-black text-emerald-600/70 uppercase tracking-widest">
                          {selectedDelivery === 'delivery' ? 'Click to upload proof (Required)' : 'Upload screenshot (Optional)'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleScreenshotChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {selectedDelivery === 'delivery' && !paymentScreenshot && (
                    <p className="text-[9px] text-rose-500 font-bold mt-2 text-left">* Required for Home Delivery verification</p>
                  )}
                </div>
              </div>

              <button 
                onClick={handleConfirmPaid}
                disabled={isPaidDisabled}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 disabled:text-stone-400 text-white py-4 rounded-[1.25rem] font-black shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95 text-lg"
              >
                I have Paid the Amount
                <CheckCircle2 className="h-5 w-5" />
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-200 border-4 border-white animate-bounce">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <div className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-xl text-white shadow-lg rotate-12">
                   <PartyPopper className="h-5 w-5" />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-amber-500 p-2 rounded-xl text-white shadow-lg -rotate-12">
                   <Trophy className="h-5 w-5" />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Congratulations! 🎊</h2>
                <h3 className="text-xl font-bold text-emerald-600 mb-2">Order Confirmed! 🎉</h3>
                <p className="hindi-font text-emerald-700/70 font-bold text-lg">आपका ऑर्डर सफलतापूर्वक प्राप्त हुआ!</p>
              </div>
              
              <div className="bg-stone-50 rounded-[2.5rem] border border-stone-100 p-8 mb-10 text-left space-y-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 relative z-10">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <ReceiptText className="h-3 w-3" /> Booking Summary
                  </span>
                  <span className="animate-pulse">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </span>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <User className="h-3 w-3" /> Customer
                    </span>
                    <span className="text-sm font-black text-slate-900">{customerDetails.name}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Phone className="h-3 w-3" /> Contact
                    </span>
                    <span className="text-sm font-black text-slate-900">{customerDetails.mobile}</span>
                  </div>
                  <div className="flex justify-between items-start pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Bike className="h-3 w-3" /> Method
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      {selectedDelivery === 'pickup' ? 'Self Pickup' : 'Home Delivery'}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                      <Wallet className="h-3 w-3" /> Payment
                    </span>
                    <span className="text-xs font-black text-slate-700 bg-white border border-stone-200 px-3 py-1 rounded-full shadow-sm">
                      {selectedPayment === 'cash' ? (selectedDelivery === 'pickup' ? 'Pay at Counter' : 'Cash on Delivery') : 'Online Payment'}
                    </span>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-stone-100 flex gap-3">
                    <MapPin className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                    <p className="text-xs font-medium text-slate-500 italic leading-relaxed">
                      "{customerDetails.address}"
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleFinish}
                className="w-full bg-slate-900 hover:bg-black text-white py-6 rounded-[2rem] font-black shadow-2xl transition-all active:scale-95 text-lg flex items-center justify-center gap-3 group"
              >
                Continue Shopping
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="mt-6 text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Verified Pure by Sudha Dairy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothBagModal;
