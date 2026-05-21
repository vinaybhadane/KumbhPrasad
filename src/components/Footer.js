import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail, MapPin, Sparkles, ArrowUp, ChevronRight, Phone, Instagram, Youtube
} from 'lucide-react';

import logoImage from '../assets/klogo-160.webp';

const Footer = ({ user }) => {
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleTrackOrder = (e) => {
    e.preventDefault();
    navigate(user ? '/profile' : '/login');
  };

  const footerLinks = [
    { name: 'Home', to: '/' },
    { name: 'Prasad Store', to: '/store' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact Us', to: '/contact' },
  ];

  const certBadges = [
    { icon: '🕉️', label: 'Vedic Certified' },
    { icon: '🔒', label: 'SSL Secure' },
    { icon: '🚚', label: 'Pan-India Delivery' },
  ];

  return (
    <footer className="relative w-full bg-[#FFF9F2] pt-20 overflow-hidden border-t border-orange-100">
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40" />

      {/* Certification badges row */}
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {certBadges.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl border border-orange-50 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
            >
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[11px] font-black text-[#2D1B08] uppercase tracking-wider">{b.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14 pb-16 relative z-10">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="KumbhPrasad logo" className="w-14 h-14 rounded-2xl object-contain bg-white shadow-xl shadow-orange-200/50 p-2 border border-orange-100" width="56" height="56" loading="lazy" />
            <div>
              <span className="text-2xl font-serif font-black tracking-tighter text-[#2D1B08] leading-none block">
                KUMBH<span className="text-orange-600">PRASAD</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-400">Nashik Se Dwar Tak</span>
            </div>
          </div>

          <p className="text-[#4A3728] text-sm leading-relaxed font-medium italic opacity-70 max-w-xs">
            "Spreading the divine essence of Nashik's holy ghats and the Maha-Kumbh 2026 to seekers worldwide."
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Follow Us</span>
            {[
              { Icon: Instagram, color: 'hover:bg-pink-600', href: '#' },
              { Icon: Youtube, color: 'hover:bg-red-600', href: '#' },
            ].map(({ Icon, color, href }, i) => (
              <a 
                key={i} 
                href={href}
                className={`w-9 h-9 bg-white border border-orange-100 rounded-xl flex items-center justify-center text-slate-400 ${color} hover:text-white hover:border-transparent transition-all shadow-sm`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h4 className="text-xs font-black text-[#2D1B08] mb-8 uppercase tracking-[0.3em] flex items-center gap-2">
            <Sparkles size={13} className="text-orange-500" /> Quick Links
          </h4>
          <ul className="space-y-4">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="text-[#4A3728] text-sm font-semibold hover:text-orange-600 transition-all flex items-center justify-between group max-w-[200px]"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full group-hover:scale-150 group-hover:bg-orange-600 transition-all" />
                    {link.name}
                  </span>
                  <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-400" />
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleTrackOrder}
                className="text-[#4A3728] text-sm font-semibold hover:text-orange-600 transition-all flex items-center justify-between group w-full max-w-[200px] text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full group-hover:scale-150 transition-transform" />
                  Track Order
                </span>
                <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-400" />
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col">
          <h4 className="text-xs font-black text-[#2D1B08] mb-8 uppercase tracking-[0.3em] flex items-center gap-2">
            <MapPin size={13} className="text-orange-500" /> Sacred Nashik
          </h4>
          <div className="space-y-6">
            <div className="flex gap-4 items-start text-[#4A3728]">
              <div className="p-2.5 bg-white border border-orange-100 rounded-xl shadow-sm shrink-0 mt-0.5">
                <MapPin className="text-orange-600" size={18} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest block mb-1">Our Pavitra Sthan</span>
                <span className="text-sm font-semibold leading-relaxed">
                  Near Ram Kund, Panchavati, <br /> Nashik, MH - 422003
                </span>
              </div>
            </div>

            <div className="flex gap-4 items-center text-[#4A3728]">
              <div className="p-2.5 bg-white border border-orange-100 rounded-xl shadow-sm shrink-0">
                <Mail className="text-orange-600" size={18} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest block mb-1">Email Seva</span>
                <a href="mailto:seva@kumbhprasad.app" className="text-sm font-semibold text-orange-700 hover:text-orange-600 underline underline-offset-4 decoration-orange-200">
                  seva@kumbhprasad.app
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center text-[#4A3728]">
              <div className="p-2.5 bg-white border border-orange-100 rounded-xl shadow-sm shrink-0">
                <Phone className="text-orange-600" size={18} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest block mb-1">WhatsApp Support</span>
                <span className="text-sm font-semibold">24/7 Seva Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative bg-[#2D1B08] py-8 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-orange-200/50 text-[10px] font-bold tracking-[0.25em] uppercase">
              © 2026 KumbhPrasad • Made with Pure Bhakti in Nashik
            </p>
            <p className="text-white/20 text-[8px] font-black tracking-[0.4em] uppercase mt-1">
              Authorized Maha-Kumbh 2026 Seva Provider
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 text-white/50 text-[9px] font-black uppercase tracking-[0.3em] hover:text-orange-400 transition-colors"
          >
            <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-orange-600 group-hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all">
              <ArrowUp size={18} className="text-white" />
            </div>
            Back to Top
          </motion.button>
        </div>

        {/* Mandala watermark */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden flex justify-center items-center">
          <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="" className="w-72 invert" loading="lazy" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
