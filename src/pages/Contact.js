import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, MapPin, Send, CheckCircle2, 
  MessageSquare, User, Smartphone, Sparkles, Navigation 
} from 'lucide-react';
// Firebase Imports
import { db } from '../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // --- 🚀 FIREBASE LOGIC ---
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp()
      });

      setStatus('success');
      setFormData({ name: '', mobile: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error saving message: ", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = "w-full bg-white/50 border border-orange-100 rounded-2xl px-12 py-4 text-[#2D1B08] font-bold text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-400";

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-6 overflow-hidden relative selection:bg-orange-500 selection:text-white font-sans">
      
      {/* Background Decorative Mandala */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none translate-x-1/3 -translate-y-1/4">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[800px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                Sampark Karein • Reach Out
             </span>
             <h1 className="text-5xl md:text-7xl font-serif font-black text-[#2D1B08] leading-tight mb-6">
                Connect With <br /> <span className="text-orange-500 italic">The Divine Seva</span>
             </h1>
             <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                Have questions about Maha-Kumbh Prasad? Our team in Nashik is ready to assist you.
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
             <motion.div 
               initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
               className="bg-[#2D1B08] p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl"
             >
                <div className="relative z-10">
                  <h3 className="text-2xl font-serif font-bold mb-10 border-b border-white/10 pb-6">Nashik Headquarters</h3>
                  <div className="space-y-8">
                    {/* Location */}
                    <div className="flex items-start gap-5">
                       <div className="p-3.5 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/20"><MapPin size={22}/></div>
                       <div>
                         <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-1">Our Pavitra Sthan</p>
                         <p className="font-bold text-base text-orange-50 leading-relaxed">Panchavati, Near Ram Kund,<br/> Nashik, Maharashtra - 422003</p>
                       </div>
                    </div>
                    
                    {/* Email */}
                    <div className="flex items-start gap-5">
                       <div className="p-3.5 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/20"><Mail size={22}/></div>
                       <div>
                         <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-1">Email Support</p>
                         <p className="font-bold text-lg text-orange-50">seva@kumbhprashad.com</p>
                       </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                   <Navigation size={250} className="-mr-16 -mt-16" />
                </div>
             </motion.div>

             {/* Quick Badge */}
             <div className="bg-orange-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-200 flex items-center gap-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                   <Sparkles className="text-yellow-300" size={28} />
                </div>
                <div>
                   <h4 className="text-lg font-bold uppercase tracking-tighter leading-none">Global Delivery</h4>
                   <p className="text-[11px] font-medium text-orange-100 mt-1 uppercase tracking-widest">Nashik to the India</p>
                </div>
             </div>
          </div>

          {/* Right Side: The Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgba(45,27,8,0.06)] border border-orange-50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-4 top-4 text-orange-400" size={18} />
                  <input 
                    type="text" required placeholder="Full Name" className={inputClass}
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                {/* Mobile Number */}
                <div className="relative">
                  <Smartphone className="absolute left-4 top-4 text-orange-400" size={18} />
                  <input 
                    type="tel" required placeholder="Mobile Number" className={inputClass}
                    value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-orange-400" size={18} />
                <input 
                  type="email" required placeholder="Email Address" className={inputClass}
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-orange-400" size={18} />
                <textarea 
                  required placeholder="How can we help you? (Your message...)"
                  className={`${inputClass} h-44 resize-none pt-4`}
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all flex items-center justify-center gap-4 ${
                  status === 'success' ? 'bg-green-600 text-white' : 'bg-[#2D1B08] text-white hover:bg-orange-600 active:scale-[0.98]'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div key="loading" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <Sparkles size={20} />
                    </motion.div>
                  ) : status === 'success' ? (
                    <motion.div key="success" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <CheckCircle2 size={20} /> MESSAGE SENT SUCCESSFULLY!
                    </motion.div>
                  ) : (
                    <motion.div key="idle" className="flex items-center gap-2">
                      SEND MESSAGE <Send size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;