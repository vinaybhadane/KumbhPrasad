import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Lock, Sparkles, ChevronRight, Truck, Gift } from 'lucide-react';

const Cart = ({ isOpen, setIsOpen, cartItems, onUpdateQty, onRemove, user, onCheckout }) => {
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryThreshold = 100;
  const deliveryCharge = (subtotal > 0 && subtotal < deliveryThreshold) ? 40 : 0;
  const gstRate = 0.05; 
  const gstAmount = Math.round(subtotal * gstRate);
  const grandTotal = subtotal + gstAmount + deliveryCharge;

  const handleProceed = () => {
    setIsOpen(false);
    onCheckout();
  };

  const freeDeliveryProgress = Math.min((subtotal / deliveryThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#2D1B08]/70 backdrop-blur-sm z-[200]"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-[#FFF9F2] shadow-[-20px_0_60px_rgba(0,0,0,0.15)] z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white border-b border-orange-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white shadow-md">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="text-base font-serif font-black text-[#2D1B08] uppercase leading-none">Pavitra Cart</h2>
                  <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} • Kumbh 2026
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-orange-50 rounded-full text-slate-400 hover:text-orange-600 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Delivery Progress Bar */}
            {subtotal > 0 && (
              <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 shrink-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-blue-600" />
                    <p className="text-[9px] font-bold text-blue-900 uppercase tracking-wider">
                      {subtotal >= deliveryThreshold 
                        ? '🎉 Free Delivery Unlocked!' 
                        : `₹${deliveryThreshold - subtotal} more for FREE Delivery`
                      }
                    </p>
                  </div>
                  <Sparkles size={10} className="text-blue-400 animate-pulse" />
                </div>
                <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${freeDeliveryProgress}%` }}
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Cart Items — scrollable */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="flex gap-3 bg-white p-3 rounded-2xl border border-orange-50 shadow-sm"
                  >
                    {/* Image — fixed small size */}
                    <div className="w-14 h-14 shrink-0 bg-orange-50 rounded-xl border border-orange-100 overflow-hidden flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 object-contain"
                        style={{ maxWidth: '48px', maxHeight: '48px' }}
                        width="48" 
                        height="48" 
                        loading="lazy" 
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow min-w-0">
                      {/* Name + Price row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-serif font-black text-[#2D1B08] text-sm leading-tight truncate flex-1">{item.name}</h4>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-black text-orange-600 block">₹{item.price * item.qty}</span>
                          <span className="text-[9px] text-slate-400 line-through">₹{item.originalPrice}</span>
                        </div>
                      </div>

                      {/* Qty Control + Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)} 
                            className="w-7 h-7 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors text-slate-400"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-7 text-xs font-black text-center text-[#2D1B08]">{item.qty}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)} 
                            className="w-7 h-7 flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors text-slate-400"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400">× ₹{item.price} ea</span>
                          <button 
                            onClick={() => onRemove(item.id)} 
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-16 opacity-50">
                  <ShoppingBag size={60} className="mb-4 text-orange-200" />
                  <p className="font-serif font-bold text-lg text-[#2D1B08]">Cart Khali Hai</p>
                  <p className="text-sm text-slate-400 mt-1 font-medium">Sacred items add karein!</p>
                </div>
              )}
            </div>

            {/* Order Summary Footer */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-orange-100 px-5 py-4 space-y-3 shadow-[0_-10px_30px_rgba(0,0,0,0.04)] shrink-0">
                
                {/* Bill lines */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                    <span>Subtotal</span><span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                    <span>Delivery</span>
                    <span className={deliveryCharge === 0 ? "text-green-600 font-black" : ""}>
                      {deliveryCharge === 0 ? "FREE 🎉" : `+ ₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-bold text-[11px] uppercase tracking-wider border-b border-dashed border-orange-100 pb-2">
                    <span>GST (5%)</span><span>+ ₹{gstAmount}</span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="font-serif font-black text-[#2D1B08] text-base uppercase">Total</span>
                    <span className="font-black text-orange-600 text-2xl tracking-tighter">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleProceed}
                  className="w-full group bg-gradient-to-r from-[#2D1B08] to-orange-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2"
                >
                  {user ? "Confirm Address" : "Login to Checkout"}
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <div className="flex items-center justify-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                  <Lock size={10} className="text-green-600" />
                  256-bit SSL Secure Payment
                </div>

                {/* Promo strip */}
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl border border-orange-100">
                  <Gift size={13} className="text-orange-500 shrink-0" />
                  <p className="text-[9px] font-black text-orange-800 uppercase tracking-wide">
                    Kumbh 2026 Special Packaging FREE with every order!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
