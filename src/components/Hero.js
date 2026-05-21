import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ShieldCheck, MapPin, Sparkles, Clock, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/background-optimized.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 600], [0, 180]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const trustBadges = [
    { icon: <ShieldCheck />, title: "Secure Booking", desc: "Priority Delivery" },
    { icon: <MapPin />, title: "Nashik Origin", desc: "Authentic Ram Kund" },
    { icon: <Sparkles />, title: "Siddh Jaap", desc: "Mantra Sanctified" }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FFF9F2] pt-28 md:pt-36 pb-16">
      
      {/* 1. Parallax Background */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Multi-layer overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F2]/30 via-transparent to-[#FFF9F2]" />

        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(#EA580C 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
        />

        {/* Bottom blend */}
        <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#FFF9F2] via-[#FFF9F2]/90 to-transparent z-10" />
      </motion.div>

      {/* 2. Main Content */}
      <motion.div style={{ opacity }} className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2.5 rounded-full border border-orange-200 shadow-md"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-[11px] font-black text-orange-800 uppercase tracking-[0.2em]">
            12,450+ Devotees Trust Us
          </span>
          <Sparkles size={13} className="text-orange-500" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-[#2D1B08] leading-[1.05] mb-8"
        >
          Nashik Kumbh Ka{' '}
          <br />
          <span className="relative inline-block mt-4">
            <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-50 -rotate-1 rounded-2xl scale-110 shadow-lg border border-orange-200/50" />
            <span className="relative text-orange-600 italic px-8">
              Pavitra Prasad
            </span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl text-lg md:text-xl text-[#4A3728] font-medium leading-relaxed mb-10"
        >
          Bring the essence of{' '}
          <span className="text-orange-600 font-bold underline decoration-orange-200 underline-offset-4">Divine Blessings</span>{' '}
          from Nashik to your home with{' '}
          <span className="text-[#2D1B08] font-bold">100% Shuddhta.</span>
        </motion.p>
        
        {/* Urgency Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-12 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-7 py-3 rounded-full border border-orange-200 shadow-sm"
        >
          <Clock size={16} className="text-red-500 animate-pulse" />
          <span className="text-xs font-black text-orange-800 uppercase tracking-[0.2em]">
            Limited Pre-Order Batch — 2026 Special
          </span>
          <span className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider">
            84% Full
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.button 
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/store')} 
            className="group relative px-12 py-5 bg-orange-600 rounded-2xl shadow-[0_20px_50px_rgba(234,88,12,0.4)] overflow-hidden"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest">
              Book Your Pre-Order
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/store')} 
            className="px-12 py-5 rounded-2xl border-2 border-[#2D1B08] text-[#2D1B08] font-black hover:bg-[#2D1B08] hover:text-white transition-all text-sm uppercase tracking-widest bg-white/60 backdrop-blur-sm"
          >
            Explore Menu
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-orange-200/60 pt-10 w-full"
        >
          {trustBadges.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className="flex items-center justify-center gap-4 group cursor-default"
            >
              <div className="text-white bg-gradient-to-br from-orange-500 to-red-600 p-3.5 rounded-2xl shadow-lg group-hover:shadow-orange-200 group-hover:scale-110 transition-all duration-400">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-black tracking-wider text-[#2D1B08] uppercase leading-none mb-1">{item.title}</p>
                <p className="text-[10px] text-orange-700/60 font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-600/60">Scroll</span>
        <ChevronDown className="text-orange-600" size={28} />
      </motion.div>
    </section>
  );
};

export default Hero;
