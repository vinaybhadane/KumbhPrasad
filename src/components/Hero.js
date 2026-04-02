import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ShieldCheck, MapPin, Sparkles, Clock, ArrowRight } from 'lucide-react';
import bgImage from '../assets/background.jpg';

const Hero = () => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FFF9F2] pt-32 md:pt-44 pb-20">
      
      {/* 1. Cinematic Background with Blending Layers */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        
        {/* Saffron & Light Overlays */}
        <div className="absolute inset-0 bg-orange-500/10" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/60 via-transparent to-[#FFF9F2]" />

        {/* --- ✨ BOTTOM BLENDING LAYERS (NEW) ✨ --- */}
        {/* BOTTOM BLEND: Hero image ko niche ke section se merge karne ke liye */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#FFF9F2] via-[#FFF9F2]/80 to-transparent z-10" />
        
        {/* BOTTOM FEATHER: Subtle blur effect on the bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-32 backdrop-blur-[1px] pointer-events-none z-10" 
             style={{ maskImage: 'linear-gradient(to top, black, transparent)' }} />
        
        {/* Subtle Decorative Mandala Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/mandala.png')` }} 
        />
      </motion.div>

      {/* 2. Content Section */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        
        {/* --- Hero Heading with White Highlight --- */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl lg:text-9xl font-serif font-black text-[#2D1B08] leading-[1.1] mb-10"
        >
          Nashik Kumbh Ka <br />
          <span className="relative inline-block mt-6">
            <span className="absolute inset-0 bg-white/75 backdrop-blur-md -rotate-1 rounded-2xl scale-110 shadow-sm border border-orange-100"></span>
            <span className="relative text-orange-600 italic px-8">
              Pavitra Prashad
            </span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl text-lg md:text-2xl text-[#4A3728] font-semibold leading-relaxed mb-12"
        >
          Bring the essence of <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">Divine Blessings</span> from 
          Nashik to your home with <span className="text-orange-800">100% Shuddhta.</span>
        </motion.p>
        
        {/* Limited Stock Info Badge */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.9 }}
           className="mb-14 px-8 py-3 bg-white/90 backdrop-blur-sm rounded-full text-orange-800 text-xs md:text-sm font-black tracking-widest uppercase flex items-center gap-3 border border-orange-200 shadow-sm"
        >
          <Clock size={18} className="text-orange-600 animate-pulse" />
          Limited Pre-Order Batch • 2026 Special
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <button className="group relative px-14 py-6 bg-orange-600 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(234,88,12,0.4)]">
            <span className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest">
              Book Your Pre-Order
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>

          <button className="px-14 py-6 rounded-2xl border-2 border-orange-600 text-orange-600 font-black hover:bg-orange-600 hover:text-white transition-all text-sm uppercase tracking-widest bg-white/50 backdrop-blur-sm">
            Explore Menu
          </button>
        </motion.div>

        {/* Trust Badges Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 border-t border-orange-200 pt-12 w-full"
        >
          {[
            { icon: <ShieldCheck />, title: "Secure Booking", desc: "Priority Delivery" },
            { icon: <MapPin />, title: "Nashik Origin", desc: "Authentic Ram Kund" },
            { icon: <Sparkles />, title: "Siddh Jaap", desc: "Mantra Sanctified" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-5 group cursor-default">
              <div className="text-white bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl shadow-lg group-hover:rotate-12 transition-all duration-500">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-black tracking-widest text-[#2D1B08] uppercase leading-none mb-1">{item.title}</p>
                <p className="text-[10px] text-orange-800/60 font-bold uppercase tracking-widest">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown className="text-orange-600" size={32} />
      </motion.div>

    </section>
  );
};

export default Hero;