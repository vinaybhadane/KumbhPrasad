import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, MapPin, Flame, Sparkles, ArrowUp, ChevronRight 
} from 'lucide-react';

// Assets
import bgPaper from '../assets/ancient-paper-texture.jpg';

const Footer = ({ user }) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic for conditional redirecting (Track Order)
  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const footerLinks = [
    { name: 'Home', to: '/' },
    { name: 'Prashad Store', to: '/store' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact Us', to: '/contact' },
  ];

  return (
    <footer className="relative w-full bg-[#FFF9F2] pt-24 overflow-hidden border-t border-orange-100">
      
      {/* --- 1. Temple Style Decorative Top Border --- */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-orange-600 to-transparent opacity-50" />
      
      {/* --- 2. Main content Grid --- */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 pb-20 relative z-10">
        
        {/* Column 1: Brand Essence (Cleaned - No Social Icons) */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-600 rounded-2xl shadow-xl shadow-orange-200">
              <Flame size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-black tracking-tighter text-[#2D1B08] leading-none">
                KUMBH<span className="text-orange-600">PRASHAD</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400 mt-1">Nashik Se Dwar Tak</span>
            </div>
          </div>
          
          <p className="text-[#4A3728] text-sm leading-relaxed font-medium italic opacity-80 max-w-sm">
            "Spreading the divine essence of Nashik’s holy ghats and the Maha-Kumbh 2026 to seekers worldwide with absolute shradha and purity."
          </p>

          {/* 🚀 FIXED: Social Icons Section Removed */}
        </div>

        {/* Column 2: Pavitra Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-xs font-black text-[#2D1B08] mb-10 uppercase tracking-[0.3em] flex items-center gap-2">
            <Sparkles size={14} className="text-orange-500" /> Quick Links
          </h4>
          <ul className="grid grid-cols-1 gap-5">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.to} 
                  className="text-[#4A3728] text-sm font-bold hover:text-orange-600 transition-all flex items-center justify-between group max-w-[200px]"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 transition-transform" />
                    {link.name}
                  </span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
            {/* Conditional Track Order Link */}
            <li>
              <button 
                onClick={handleTrackOrder}
                className="text-[#4A3728] text-sm font-bold hover:text-orange-600 transition-all flex items-center justify-between group w-full max-w-[200px] text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full group-hover:scale-150 transition-transform" />
                  Track Order
                </span>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Reach Us (Clean) */}
        <div className="flex flex-col">
          <h4 className="text-xs font-black text-[#2D1B08] mb-10 uppercase tracking-[0.3em] flex items-center gap-2">
            <MapPin size={14} className="text-orange-500" /> Sacred Nashik
          </h4>
          <div className="space-y-8">
            <div className="flex gap-5 items-start text-[#4A3728]">
              <div className="p-3 bg-white border border-orange-100 rounded-xl shadow-sm">
                <MapPin className="text-orange-600" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest mb-1">Our Pavitra Sthan</span>
                <span className="text-sm font-bold leading-relaxed">
                  Near Ram Kund, Panchavati, <br /> Nashik, MH - 422003
                </span>
              </div>
            </div>

            <div className="flex gap-5 items-center text-[#4A3728]">
              <div className="p-3 bg-white border border-orange-100 rounded-xl shadow-sm">
                <Mail className="text-orange-600" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest mb-1">Email Seva</span>
                <span className="text-sm font-bold text-orange-700 underline underline-offset-4 decoration-orange-200 font-sans">
                  bhakti@kumbhprashad.com
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- 3. Bottom Bar --- */}
      <div className="relative bg-[#2D1B08] py-10 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
             <p className="text-orange-200/60 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-center md:text-left">
               © 2026 KUMBHPRASHAD • MADE WITH PURE BHAKTI IN NASHIK
             </p>
             <p className="text-white/20 text-[8px] font-black tracking-[0.4em] uppercase">
               Authorized Maha-Kumbh 2026 Seva Provider
             </p>
          </div>
          
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-2 text-white/50 text-[9px] font-black uppercase tracking-[0.3em] hover:text-orange-400 transition-colors"
          >
            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-orange-600 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all">
              <ArrowUp size={20} className="text-white" />
            </div>
            Back to Top
          </motion.button>
        </div>

        {/* Backdrop Decorative Mandala Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex justify-center items-center">
           <img 
            src="https://www.transparenttextures.com/patterns/mandala.png" 
            alt="mandala pattern" 
            className="w-64 invert"
           />
        </div>
      </div>
    </footer>
  );
};

export default Footer;