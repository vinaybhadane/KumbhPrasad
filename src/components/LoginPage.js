import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Sparkles, ShieldCheck } from 'lucide-react';
import logoImage from '../assets/klogo-160.webp';

const LoginPage = ({ onBack }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // ✅ Login ke baad automatically home par bhejo
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFF9F2] relative overflow-hidden px-6">
      
      {/* Background Decorative Mandalas */}
      <div className="absolute top-[-10%] left-[-10%] opacity-[0.03] pointer-events-none">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[500px] animate-spin-slow" />
      </div>
      <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] pointer-events-none">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[500px] animate-spin-slow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(234,88,12,0.12)] border border-orange-100 p-8 md:p-12 text-center relative z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-200/40 rounded-2xl blur-xl" />
            <img 
              src={logoImage} 
              alt="KumbhPrasad logo" 
              className="relative w-20 h-20 rounded-2xl object-contain bg-orange-50 p-2 shadow-xl shadow-orange-200/60 border border-orange-100" 
              width="80" height="80" 
            />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-black text-[#2D1B08] tracking-tighter">
              KUMBH<span className="text-orange-600">PRASAD</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mt-1">
              Shubh Aagman • Nashik 2026
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Prasad Seva mein Login Karein</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed px-2">
            Apne Google account se surakshit roop se login karein aur apna Pavitra Prasad pre-order karein.
          </p>
        </div>

        {/* Google Login Button */}
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(234,88,12,0.15)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 bg-white border border-slate-200 rounded-2xl px-4 py-4 hover:border-orange-200 transition-all duration-300 shadow-sm"
        >
          {/* Google G Icon */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-slate-700 font-bold text-sm tracking-tight">
            Sign in with Google
          </span>
        </motion.button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-orange-50" />
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Secure Login</span>
          <div className="flex-1 h-px bg-orange-50" />
        </div>

        {/* Trust badges */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <ShieldCheck size={13} className="text-green-500" />
            100% Secure & Verified Authentication
          </div>
          <div className="flex items-center gap-2 text-orange-800/40 font-black text-[9px] uppercase tracking-widest">
            <Sparkles size={11} /> Pure Devotion Guaranteed
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
