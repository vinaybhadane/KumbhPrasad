import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrustUrgency = () => {
  const navigate = useNavigate();
  // Simulated live visitor count
  const [viewers, setViewers] = useState(45);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(30, Math.min(80, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '98%', label: 'Positive Feedback' },
    { value: '24/7', label: 'Support' },
    { value: 'Direct', label: 'From Ghat' },
  ];

  return (
    <section className="relative w-full bg-[#FFF9F2] py-16 md:py-24 z-30 overflow-hidden">
      
      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent" />

      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: `radial-gradient(#EA580C 0.8px, transparent 0.8px)`, backgroundSize: '24px 24px' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT: Social Proof */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full lg:w-1/2">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 bg-orange-100 w-fit px-4 py-2 rounded-full border border-orange-200"
            >
              <TrendingUp size={14} className="text-orange-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-800">
                High Demand in Nashik
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-[#2D1B08] leading-[1.1]"
            >
              Join{' '}
              <span className="text-orange-600 italic">12,450+ Devotees</span>{' '}
              <br />
              Already Pre-Ordered.
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#4A3728] font-medium text-base md:text-lg max-w-lg leading-relaxed"
            >
              The queue at Ram Kund is growing rapidly. Secure your sacred blessings before the window closes.
            </motion.p>

            {/* Stats row */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 w-full max-w-sm gap-4 py-6 border-y border-orange-100"
            >
              {stats.map((stat, i) => (
                <div key={i} className={`flex flex-col items-center lg:items-start ${i === 1 ? 'border-x border-orange-100 px-2' : ''}`}>
                  <span className="text-2xl md:text-3xl font-black text-orange-600">{stat.value}</span>
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03, x: 4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/store')}
              className="hidden lg:flex items-center gap-3 text-orange-600 font-black text-sm uppercase tracking-wider hover:gap-5 transition-all"
            >
              Explore Sacred Collection <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* RIGHT: Urgency Card */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[460px] bg-white p-7 md:p-10 rounded-[2.5rem] shadow-[0_30px_70px_rgba(234,88,12,0.12)] border border-orange-100/80 relative overflow-hidden"
          >
            {/* Live pulse indicator */}
            <div className="flex justify-between items-center mb-8 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                </div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live Status</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Users size={15} />
                <motion.span 
                  key={viewers}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-bold"
                >
                  {viewers}+ Viewing Now
                </motion.span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pre-Order Status</span>
                  <span className="text-sm font-black text-[#2D1B08] uppercase tracking-tight">Slots Filling Fast!</span>
                </div>
                <span className="text-4xl font-black text-orange-600">84%</span>
              </div>
              
              <div className="w-full h-4 bg-orange-50 rounded-full overflow-hidden border border-orange-100 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-full relative shadow-sm"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse rounded-full" />
                </motion.div>
              </div>
              
              <div className="flex items-center justify-center gap-2 bg-orange-50 py-2.5 rounded-xl border border-orange-100">
                <span className="text-lg">⚠️</span>
                <p className="text-[10px] font-black text-orange-800 uppercase tracking-[0.1em]">
                  Last 156 slots remaining for priority delivery
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/store')}
              className="w-full group bg-[#2D1B08] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-orange-600 shadow-[0_15px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3"
            >
              Skip the Queue
              <Zap size={18} className="text-yellow-400 fill-yellow-400 group-hover:scale-125 transition-transform" />
            </motion.button>

            {/* Trust footer */}
            <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck size={13} className="text-green-600" /> 
              100% Pavitra & Verified Booking
            </div>

            {/* Decorative mandala */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.04] pointer-events-none">
              <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-48 rotate-45" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustUrgency;
