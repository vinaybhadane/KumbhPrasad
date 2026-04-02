import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Flame, Truck, Sparkles, Navigation, Anchor, ShieldCheck 
} from 'lucide-react';

// Assets
import bgPaper from '../assets/ancient-paper-texture.jpg';
import nashikGhat from '../assets/background.jpg'; 

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <MapPin className="text-orange-600" size={28} />,
      title: "The Heart of Nashik",
      desc: "We are rooted in the sacred land of Panchavati, where Lord Ram once resided and the holy Godavari flows with eternal grace."
    },
    {
      icon: <Flame className="text-orange-600" size={28} />,
      title: "Divine Sanctity",
      desc: "Every offering is prepared with absolute devotion, following traditional Vedic rituals and authentic mantra chanting."
    },
    {
      icon: <Truck className="text-orange-600" size={28} />,
      title: "To Your Doorstep",
      desc: "The divinity of Maha-Kumbh is no longer distant. We ensure a secure and sacred journey for your Prasad, straight to your home."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F2] overflow-hidden selection:bg-orange-500 selection:text-white font-sans">
      
      {/* --- 1. CINEMATIC HERO SECTION (White Effect Removed) --- */}
      <section className="relative h-[75vh] flex items-center justify-center bg-[#1A1005] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={nashikGhat} 
            alt="Sacred Nashik Ghats" 
            className="w-full h-full object-cover grayscale-[30%] sepia-[10%] brightness-[70%]" 
          />
          {/* --- 🚀 FIX: Darker Overlays to kill the 'White Effect' --- */}
          <div className="absolute inset-0 bg-black/50" /> 
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B08]/90 via-[#2D1B08]/30 to-[#2D1B08]/90" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-orange-400 font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-4 block drop-shadow-md">
              Culture • Tradition • Faith
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-black text-white leading-tight mb-8">
              From the Ghats of Nashik <br /> 
              <span className="text-orange-500 italic">To Your Threshold</span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-orange-200/80 font-bold uppercase tracking-widest text-[10px]">
              <Navigation size={14} className="text-orange-500" /> 
              Simhastha Kumbh Mela 2026 Special Initiative
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. OUR STORY --- */}
      <section 
        className="relative py-32 px-6 md:px-12 flex justify-center text-center"
        style={{ backgroundImage: `url(${bgPaper})`, backgroundSize: 'cover' }}
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 px-5 py-2.5 rounded-full text-orange-700 font-black text-[10px] uppercase tracking-widest overflow-hidden relative">
              <Sparkles size={14} /> Our Sacred Journey
              <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30" />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-serif font-black text-[#2D1B08] leading-tight">
              A Journey of Faith, <br />
              {/* --- SOFT DIVINE SHADOW --- */}
              <span 
                className="text-orange-600"
                style={{ 
                  textShadow: '2px 2px 8px rgba(234, 88, 12, 0.2)', 
                  display: 'inline-block',
                  marginTop: '10px'
                }}
              >
                Delivered with Devotion.
              </span>
            </h2>

            <div className="space-y-6 pt-6">
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                  In this hallowed land of Nashik, where every ripple of the Godavari echoes with ancient hymns, 
                  **KumbhPrashad** was born. We are more than just a service; we are a sacred bridge 
                  connecting your heart to the divine vibrations of the Maha-Kumbh.
                </p>
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                  We believe that distance should never be a barrier to receiving blessings. Driven by 
                  unwavering faith, we have pledged to deliver the sanctified offerings of Nashik's 
                  most revered temples directly to your home.
                </p>
            </div>
          </motion.div>

          {/* Simple Trust Badge */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="pt-10 flex justify-center">
            <div className="bg-white p-8 rounded-3xl border border-orange-100 shadow-xl inline-flex items-center gap-4">
               <div className="p-3 bg-orange-600 rounded-2xl text-white"><ShieldCheck size={32} /></div>
               <div className="text-left">
                  <h4 className="font-black text-[#2D1B08] uppercase text-sm tracking-widest leading-none mb-1">100% Authentic</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase font-sans">Sanctified by Nashik Vedic Scholars</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. OUR VALUES --- */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-12 rounded-[3rem] bg-[#FFF9F2] border border-orange-50 hover:border-orange-200 transition-all group text-center"
              >
                <div className="p-5 bg-white rounded-2xl shadow-sm mb-8 inline-block group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-serif font-black text-[#2D1B08] mb-4">{v.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4">
          <Anchor size={600} className="text-orange-900" />
        </div>
      </section>

      {/* --- 4. FINAL CALL TO ACTION (Redirects Added) --- */}
      <section className="py-28 px-6 text-center bg-[#2D1B08] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#ea580c 0.5px, transparent 0.5px)`, backgroundSize: '20px 20px' }} />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight">
              Your Devotion, <br />
              <span className="text-orange-500">Our Sacred Promise.</span>
            </h2>
            <p className="text-orange-100/40 font-black uppercase tracking-[0.4em] text-[10px] mt-8 font-sans">
              KumbhPrashad • Pure Devotion Delivered
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
            {/* 🚀 STORE REDIRECT */}
            <button 
              onClick={() => navigate('/store')} 
              className="px-14 py-6 bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-900/50 hover:bg-orange-500 transition-all active:scale-95"
            >
              Receive the Blessing
            </button>
            
            {/* 🚀 CONTACT REDIRECT */}
            <button 
              onClick={() => navigate('/contact')} 
              className="px-14 py-6 bg-white/5 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Connect With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;