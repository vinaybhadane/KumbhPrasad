import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { 
  ShoppingCart, Menu, X, Sparkles, 
  Home, ShoppingBag, Info, PhoneCall, LogOut, User, ChevronDown 
} from 'lucide-react';

import bgImage from '../assets/background-optimized.jpg';
import logoImage from '../assets/klogo-160.webp';
import Cart from './Cart'; 

const Navbar = ({ cartCount, cartItems = [], onUpdateQty, onRemove, user, onLoginClick, onLogout, onCheckout }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsProfileOpen(false);
    if (isProfileOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen]);

  const menuItems = [
    { name: 'Home', to: '/', icon: <Home size={22} /> },
    { name: 'Prasad Store', to: '/store', icon: <ShoppingBag size={22} /> },
    { name: 'About Us', to: '/about', icon: <Info size={22} /> },
    { name: 'Contact Us', to: '/contact', icon: <PhoneCall size={22} /> },
  ];

  return (
    <header className="relative w-full">
      <div 
        className="absolute inset-0 h-[100px] md:h-[120px] bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600/60 via-orange-500/20 to-transparent" />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 md:px-12 py-4 md:py-6 ${
          isScrolled 
            ? 'bg-[#2D1B08]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(45,27,8,0.4)]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            <div className="relative flex items-center justify-center w-12 h-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 rounded-full border-dashed border-orange-400/40"
              />
              <img src={logoImage} alt="KumbhPrasad logo" className="relative w-11 h-11 rounded-xl object-contain bg-white/95 shadow-xl p-1.5" width="44" height="44" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif font-black text-white drop-shadow-md leading-none">
                KUMBH<span className="text-yellow-400">PRASAD</span>
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles size={10} className="text-yellow-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-200">
                  Nashik 2026
                </span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden lg:flex items-center gap-3">
            {menuItems.map((item) => (
              <motion.li key={item.name} whileHover={{ y: -2 }}>
                <Link 
                  to={item.to} 
                  className="px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] text-white/90 hover:text-white bg-white/10 backdrop-blur-md border border-white/15 hover:bg-orange-600 hover:border-orange-600 transition-all duration-200"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3">

            {/* 🛒 CART BUTTON — Prominent with background */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-orange-900/30 border border-orange-500"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-[#2D1B08] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

            {/* SMART AUTH DROPDOWN */}
            {user ? (
              <div className="relative hidden md:block" onClick={(e) => e.stopPropagation()}>
                <motion.div 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-1.5 pr-3.5 rounded-2xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
                >
                  <img src={user.photoURL || logoImage} alt="profile" className="w-8 h-8 rounded-xl border-2 border-orange-500 object-cover" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">
                    {(user.displayName || 'Devotee').split(' ')[0]}
                  </span>
                  <ChevronDown size={13} className={`text-orange-300 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </motion.div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-orange-50 overflow-hidden py-2"
                    >
                      <Link 
                        to="/profile" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-[11px] font-black text-slate-700 uppercase tracking-widest hover:bg-orange-50 hover:text-orange-600 transition-all"
                      >
                        <User size={16} /> View Profile
                      </Link>
                      <button 
                        onClick={() => { onLogout(); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 transition-all border-t border-slate-50"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onLoginClick}
                className="hidden sm:block px-6 py-2.5 rounded-xl font-black text-[11px] tracking-[0.15em] bg-white text-orange-600 hover:bg-orange-50 transition-all shadow-xl uppercase"
              >
                Login
              </motion.button>
            )}

            <motion.button 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setIsOpen(true)} 
              className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#FFF9F2] flex flex-col lg:hidden"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-6 bg-[#2D1B08] border-b border-orange-900/50">
              {user ? (
                <div className="flex items-center gap-3">
                  <img src={user.photoURL || logoImage} alt="user" className="w-12 h-12 rounded-xl border-2 border-orange-500 object-cover" />
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white uppercase">Jai Ho, {(user.displayName || 'Devotee').split(' ')[0]}</span>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-[10px] font-bold text-orange-400 uppercase">View Profile</Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img src={logoImage} alt="KumbhPrasad logo" className="w-10 h-10 rounded-lg object-contain bg-orange-50 p-1" width="40" height="40" />
                  <span className="font-serif font-black text-xl text-white uppercase tracking-tighter">Kumbh Menu</span>
                </div>
              )}
              <motion.button whileTap={{ rotate: 90 }} onClick={() => setIsOpen(false)} className="p-2 bg-white/10 text-white rounded-full">
                <X size={26} />
              </motion.button>
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col gap-2 p-6 overflow-y-auto flex-grow">
              {menuItems.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <Link 
                    to={item.to} 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-orange-50 hover:bg-orange-50 transition-all group shadow-sm"
                  >
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">{item.icon}</div>
                    <span className="text-lg font-bold text-slate-800 tracking-tight">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 bg-white border-t border-orange-100 space-y-3">
               {/* 🛒 Cart Button - Mobile - Prominent */}
               <button 
                onClick={() => { setIsOpen(false); setIsCartOpen(true); }} 
                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 shadow-lg shadow-orange-200 relative"
               >
                  <ShoppingCart size={18} /> My Pavitra Cart
                  {cartCount > 0 && (
                    <span className="absolute top-2 right-16 bg-yellow-400 text-[#2D1B08] text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">
                      {cartCount}
                    </span>
                  )}
               </button>
               
               {user ? (
                 <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 border border-red-100">
                    <LogOut size={18} /> Logout Account
                 </button>
               ) : (
                 <button onClick={() => { setIsOpen(false); onLoginClick(); }} className="w-full bg-[#2D1B08] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg">
                    Login with Google
                 </button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cartItems={cartItems} 
        onUpdateQty={onUpdateQty} 
        onRemove={onRemove} 
        user={user}
        onCheckout={onCheckout}
      />
    </header>
  );
};

export default Navbar;
