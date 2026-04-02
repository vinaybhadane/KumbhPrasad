import React from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Flame, Sparkles, ShieldCheck } from 'lucide-react';

const LoginPage = () => {

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Logged In:", result.user);
      // Login ke baad redirect logic yahan aayega
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFF9F2] relative overflow-hidden px-6">
      
      {/* Background Decorative Mandalas */}
      <div className="absolute top-[-10%] left-[-10%] opacity-[0.03] pointer-events-none">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[500px]" />
      </div>
      <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] pointer-events-none">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[500px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(234,88,12,0.1)] border border-orange-100 p-8 md:p-12 text-center relative z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="p-4 bg-orange-600 rounded-2xl shadow-lg shadow-orange-200">
            <Flame size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-black text-[#2D1B08] tracking-tighter">
              KUMBH<span className="text-orange-600">PRASHAD</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 mt-1">
              Shubh Aagman • Nashik 2026
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Prashad Seva mein Login Karein</h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
            Apne Google account ka upyog karke surakshit roop se login karein aur apna Pavitra Prashad track karein.
          </p>
        </div>

        {/* --- TRADITIONAL GOOGLE LOGIN BUTTON --- */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 bg-white border border-slate-300 rounded-lg px-4 py-3 hover:bg-slate-50 hover:shadow-md transition-all duration-300 group active:scale-[0.98]"
        >
          {/* Google Standard G Icon */}
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-slate-700 font-bold text-sm tracking-tight">
            Sign in with Google
          </span>
        </button>

        {/* Security Badges */}
        <div className="mt-12 pt-8 border-t border-orange-50 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <ShieldCheck size={14} className="text-green-500" />
            100% Secure & Verified Authentication
          </div>
          <div className="flex items-center gap-2 text-orange-800/40 font-black text-[9px] uppercase tracking-widest">
            <Sparkles size={12} /> Pure Devotion Guaranteed
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;