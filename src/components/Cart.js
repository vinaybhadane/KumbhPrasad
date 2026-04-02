import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Lock, Sparkles, ChevronRight, Truck } from 'lucide-react';

/**
 * Props:
 * - user: Firebase login state
 * - onCheckout: App.js ka redirection function
 * - cartItems, onUpdateQty, onRemove: Cart state handlers
 */
const Cart = ({ isOpen, setIsOpen, cartItems, onUpdateQty, onRemove, user, onCheckout }) => {
  
  // --- 🧮 Final Math Logic ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const savings = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.qty, 0);
  
  // 🚚 Delivery Logic: ₹40 if subtotal < 100, else FREE
  const deliveryThreshold = 100;
  const deliveryCharge = (subtotal > 0 && subtotal < deliveryThreshold) ? 40 : 0;

  // 🏛️ GST Logic: 5% of subtotal
  const gstRate = 0.05; 
  const gstAmount = Math.round(subtotal * gstRate);
  
  // 💰 Grand Total
  const grandTotal = subtotal + gstAmount + deliveryCharge;

  // Proceed Handler
  const handleProceed = () => {
    setIsOpen(false); // Drawer close
    onCheckout();    // App.js logic trigger
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* 2. Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#FFF9F2] shadow-[-10px_0_50px_rgba(0,0,0,0.2)] z-[201] flex flex-col"
          >
            {/* --- Header Section --- */}
            <div className="p-6 bg-white border-b border-orange-100 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-600 rounded-xl text-white shadow-lg">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-black text-[#2D1B08] tracking-tight uppercase">Pavitra Cart</h2>
                  <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Kumbh Mela 2026</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-orange-50 rounded-full text-slate-400 hover:text-orange-600 transition-all">
                <X size={24} />
              </button>
            </div>

            {/* --- Free Delivery Progress (Nudge) --- */}
            {subtotal > 0 && subtotal < deliveryThreshold && (
              <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-blue-600" />
                  <p className="text-[10px] font-bold text-blue-900 uppercase">
                    Add ₹{deliveryThreshold - subtotal} more for <span className="underline">FREE DELIVERY</span>
                  </p>
                </div>
                <Sparkles size={12} className="text-blue-400 animate-pulse" />
              </div>
            )}

            {/* --- Dynamic Cart Items List --- */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 relative z-10">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white p-4 rounded-2xl border border-orange-50 shadow-sm relative overflow-hidden group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-orange-50 rounded-xl flex-shrink-0 border border-orange-100 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h4 className="font-serif font-black text-[#2D1B08] text-lg leading-tight mb-1">{item.name}</h4>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-black text-[#2D1B08]">₹{item.price}</span>
                          <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="hover:text-orange-600"><Minus size={14} /></button>
                          <span className="text-sm font-black w-4 text-center">{item.qty}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="hover:text-orange-600"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Item */}
                    <button onClick={() => onRemove(item.id)} className="absolute top-2 right-2 p-1.5 text-slate-200 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <ShoppingBag size={80} className="mb-6 text-orange-200" />
                  <p className="font-serif font-bold text-2xl">Cart Khali Hai</p>
                </div>
              )}
            </div>

            {/* --- Order Summary Footer (Premium Billing Section) --- */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-orange-100 space-y-5 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] relative z-10">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                    <span>Moolya (Subtotal)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  {/* Delivery Charge Line */}
                  <div className="flex justify-between text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                    <span>Vitran Shulk (Delivery)</span>
                    <span className={deliveryCharge === 0 ? "text-green-600" : "text-slate-900"}>
                      {deliveryCharge === 0 ? "FREE" : `+ ₹${deliveryCharge}`}
                    </span>
                  </div>

                  {/* GST Line */}
                  <div className="flex justify-between text-slate-400 font-bold text-[11px] uppercase tracking-wider border-b border-dashed border-orange-100 pb-3">
                    <span>GST (5%)</span>
                    <span>+ ₹{gstAmount}</span>
                  </div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Deya Rashi</span>
                      <span className="font-serif font-black text-[#2D1B08] text-xl uppercase tracking-tighter">Grand Total</span>
                    </div>
                    <span className="font-black text-orange-600 text-4xl tracking-tighter">₹{grandTotal}</span>
                  </div>
                </div>

                {/* --- SMART DYNAMIC CHECKOUT BUTTON --- */}
                <div className="space-y-4 pt-2">
                  <motion.button 
                    whileTap={{ scale: 0.96 }}
                    onClick={handleProceed}
                    className="w-full group bg-[#2D1B08] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    {user ? "Confirm Address" : "Login to Checkout"}
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  
                  <div className="flex items-center justify-center gap-3 text-slate-400 text-[9px] font-black uppercase tracking-widest italic">
                    <Lock size={12} className="text-green-600" />
                    Secure SSL Encrypted Payment
                  </div>
                </div>
              </div>
            )}

            {/* Background Mandala */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
               <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[600px] animate-spin-slow" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;