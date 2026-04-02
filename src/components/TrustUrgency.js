import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Clock, ShieldCheck, TrendingUp, Flame } from 'lucide-react';

const TrustUrgency = () => {
  return (
    <section className="relative w-full bg-[#FFF9F2] py-16 md:py-24 z-30 overflow-hidden">
      
      {/* 1. Subtle Blending Borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* --- LEFT: Social Proof & Real-time Stats --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:w-1/2">
            
            {/* High Demand Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-orange-100 w-fit px-4 py-2 rounded-full border border-orange-200"
            >
              <TrendingUp size={16} className="text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-800">
                High Demand in Nashik
              </span>
            </motion.div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#2D1B08] leading-[1.1]">
              Join <span className="text-orange-600 italic">12,450+ Devotees</span> <br /> 
              Already Pre-Ordered.
            </h2>
            
            <p className="text-[#4A3728] font-semibold text-base md:text-lg max-w-lg leading-relaxed">
              The queue at Ram Kund is growing rapidly. Secure your sacred blessings before the window closes.
            </p>

            {/* Stats - Grid layout for mobile consistency */}
            <div className="grid grid-cols-3 w-full max-w-md gap-4 mt-4 py-6 border-y border-orange-200/50 lg:border-none">
               <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl md:text-3xl font-black text-orange-600">98%</span>
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">Feedback</span>
               </div>
               <div className="flex flex-col items-center lg:items-start border-x border-orange-200 px-2 lg:border-none lg:px-0">
                  <span className="text-2xl md:text-3xl font-black text-orange-600">24/7</span>
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">Support</span>
               </div>
               <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl md:text-3xl font-black text-orange-600">Direct</span>
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">From Ghat</span>
               </div>
            </div>
          </div>

          {/* --- RIGHT: Urgency Card (Responsive Card) --- */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[460px] bg-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_30px_70px_rgba(234,88,12,0.15)] border border-orange-100 relative overflow-hidden"
          >
            {/* Live Indicator Bar */}
            <div className="flex justify-between items-center mb-8 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live Status</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Users size={16} />
                <span className="text-xs font-bold">45+ Viewing Now</span>
              </div>
            </div>

            {/* Urgency Progress Section */}
            <div className="space-y-5 mb-10">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pre-Order Status</span>
                  <span className="text-sm font-black text-[#2D1B08] uppercase tracking-tighter">Slots Filling Fast</span>
                </div>
                <span className="text-3xl font-black text-orange-600">84%</span>
              </div>
              
              <div className="w-full h-5 bg-orange-50 rounded-full overflow-hidden p-1 border border-orange-100 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-full relative shadow-lg"
                >
                   <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                </motion.div>
              </div>
              
              <p className="text-[10px] text-center text-orange-800/60 font-bold uppercase tracking-[0.1em] bg-orange-50 py-2 rounded-lg border border-orange-100/50">
                ⚠️ Last 156 slots remaining for priority delivery
              </p>
            </div>

            {/* CTA Button */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-full group bg-[#2D1B08] text-white py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-all hover:bg-orange-600 shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3"
            >
              Skip the Queue
              <Zap size={18} className="text-yellow-400 fill-yellow-400 group-hover:scale-125 transition-transform" />
            </motion.button>

            {/* Verified Footer */}
            <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col items-center gap-3">
               <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-green-600" /> 
                  100% Pavitra & Verified Booking
               </div>
            </div>

            {/* Mandala Pattern for Premium Feel */}
            <div className="absolute -bottom-12 -right-12 opacity-[0.04] pointer-events-none">
              <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-56 rotate-45" />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default TrustUrgency;