import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Printer, Home, Package, MapPin, 
  CreditCard, Sparkles, Calendar, ArrowRight, IndianRupee 
} from 'lucide-react';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef();

  // App.js se order data receive karna
  const { order } = location.state || {};

  // Agar user direct is page par aaye bina order ke, toh redirect kar do
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF9F2]">
        <p className="font-serif text-xl text-orange-800">Kshama karein, koi raseed nahi mili.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-orange-600 font-bold underline">Home par jayein</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-28 pb-20 px-4 md:px-6 flex flex-col items-center">
      {/* Background Decorative Mandala */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none overflow-hidden flex items-center justify-center">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="mandala" className="w-[1000px] animate-spin-slow" />
      </div>

      {/* --- ✨ SUCCESS BADGE --- */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8 relative z-10"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-900/10 border-4 border-white">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-black text-[#2D1B08] tracking-tight">JAI HO! BOOKING CONFIRMED</h1>
        <div className="flex items-center justify-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mt-2">
          <Sparkles size={14} /> Aapka Pre-Order Safal Hua <Sparkles size={14} />
        </div>
      </motion.div>

      {/* --- 📜 THE SACRED RECEIPT CARD --- */}
      <motion.div 
        ref={receiptRef}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-3xl w-full bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(45,27,8,0.1)] border border-orange-100 overflow-hidden relative z-10 print:shadow-none print:border-none"
      >
        {/* Top Decorative Header */}
        <div className="h-3 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 w-full" />
        
        <div className="p-6 md:p-12">
          {/* Header: Queue & Order ID */}
          <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-orange-50">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aapka Queue Number</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-serif font-black text-orange-600">#{order.queueNumber}</span>
                <span className="text-xs font-bold text-orange-800/60 leading-none">Prashad-Vahini</span>
              </div>
            </div>
            <div className="text-left md:text-right space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order ID</span>
              <p className="text-sm font-bold text-slate-800 uppercase tracking-tighter">{order.paymentId?.replace('pay_', 'KBH-') || 'KBH-OFFLINE'}</p>
              <p className="text-[10px] text-slate-400 font-bold">{new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}</p>
            </div>
          </div>

          {/* Delivery Promise Banner */}
          <div className="my-8 bg-orange-50 rounded-3xl p-6 border border-orange-100 flex items-start gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-orange-600 shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <h4 className="font-black text-[#2D1B08] text-sm uppercase tracking-tight">Kumbh Mela 2026 Seva Delivery</h4>
              <p className="text-[11px] text-orange-800 font-medium leading-relaxed mt-1">
                Bhai, aapka order Nashik Maha-Kumbh 2026 ke shubh aarambh (Pratham Shahi Snan) ke din dispatch kiya jayega. Hum aapko WhatsApp par update bhejte rahenge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Col: Customer Details */}
            <div className="space-y-6">
              <div>
                <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  <MapPin size={14} className="text-orange-600" /> Delivery Address
                </h4>
                <div className="text-sm font-bold text-slate-700 space-y-1 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <p className="text-lg text-[#2D1B08] font-black mb-1">{order.address.fullName}</p>
                  <p className="leading-relaxed opacity-80">{order.address.address}</p>
                  <p className="opacity-80">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                  <p className="pt-2 flex items-center gap-2 text-orange-600">
                    <span className="text-[10px] text-slate-400">Contact:</span> {order.address.mobile}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Bill Summary */}
            <div className="space-y-6">
              <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                <Package size={14} className="text-orange-600" /> Order Summary
              </h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-600">{item.qty}x {item.name}</span>
                    <span className="text-[#2D1B08]">₹{item.price * item.qty}</span>
                  </div>
                ))}
                
                <div className="pt-4 mt-4 border-t-2 border-dashed border-orange-100 space-y-2">
                   <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
                     <span>Shulk (Total)</span>
                     <span>₹{order.totalAmount}</span>
                   </div>
                   <div className="flex justify-between items-center pt-2">
                     <span className="text-xs font-black text-[#2D1B08] uppercase tracking-tighter">Paid via Razorpay</span>
                     <div className="flex items-center gap-1 text-green-600">
                       <CreditCard size={14} />
                       <span className="text-[10px] font-black uppercase">Success</span>
                     </div>
                   </div>
                   <div className="flex justify-between items-end pt-4">
                     <span className="text-sm font-serif font-black text-orange-600">TOTAL PAID</span>
                     <span className="text-4xl font-black text-[#2D1B08] tracking-tighter italic">₹{order.totalAmount}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-[#2D1B08] p-4 text-center">
           <p className="text-orange-200 text-[9px] font-black uppercase tracking-[0.4em]">
             KumbhPrashad • Pure Nashik Tradition • 2026
           </p>
        </div>
      </motion.div>

      {/* --- 🚀 ACTION BUTTONS --- */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 w-full max-w-3xl relative z-10">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-orange-600 text-orange-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-all shadow-lg"
        >
          <Printer size={18} /> Print Receipt
        </motion.button>
        
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex-1 flex items-center justify-center gap-3 bg-orange-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2D1B08] transition-all shadow-xl shadow-orange-900/20"
        >
          <Home size={18} /> Back to Home <ArrowRight size={18} />
        </motion.button>
      </div>

      <p className="mt-8 text-slate-400 text-[10px] font-bold text-center leading-relaxed">
        Aapka pre-order number record kar liya gaya hai. <br />
        Jai Godavari Maiya! Jai Nashik!
      </p>
    </div>
  );
};

export default SuccessPage;