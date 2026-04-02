import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  XCircle, AlertTriangle, RefreshCcw, 
  Headphones, Home, Info, ShieldCheck 
} from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-6 flex flex-col items-center justify-center font-sans">
      {/* Background Mandala Watermark */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center overflow-hidden">
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="mandala" className="w-[900px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-red-50 overflow-hidden relative z-10"
      >
        {/* Warning Header */}
        <div className="bg-red-50 p-8 flex flex-col items-center text-center border-b border-red-100">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ repeat: Infinity, duration: 0.5, repeatType: 'reverse' }}
            className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4"
          >
            <XCircle size={32} className="text-red-600" />
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-serif font-black text-red-900 uppercase tracking-tight">
            Payment Unsuccessful
          </h1>
          <p className="text-red-600/70 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Transaction Interrupted or Cancelled
          </p>
        </div>

        <div className="p-8 md:p-12">
          {/* Refund Assurance Box */}
          <div className="bg-orange-50 rounded-3xl p-6 border border-orange-100 mb-8 flex items-start gap-4 shadow-sm">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-orange-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-black text-[#2D1B08] text-sm uppercase tracking-tight">Your Money is Safe</h4>
              <p className="text-[11px] text-orange-900 font-medium leading-relaxed mt-1">
                If the amount has been deducted from your bank account, please do not worry. It will be automatically refunded to your original payment method within **3-5 working days**.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Reasons Section */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-500" /> Common Reasons
              </h4>
              <ul className="text-[12px] font-bold text-slate-600 space-y-2">
                <li className="flex items-center gap-2">• Bank server downtime</li>
                <li className="flex items-center gap-2">• Incorrect OTP or Security Pin</li>
                <li className="flex items-center gap-2">• Interrupted internet connection</li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Headphones size={14} className="text-orange-600" /> Need Assistance?
              </h4>
              <p className="text-[12px] font-medium text-slate-600 leading-relaxed">
                If the payment status is 'Pending' in your bank app, please avoid placing a new order and contact our support helpline immediately.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/checkout')}
              className="flex-1 bg-[#2D1B08] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl hover:bg-orange-600 transition-all"
            >
              <RefreshCcw size={18} /> Retry Payment
            </motion.button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
            >
              <Home size={18} /> Back to Home
            </motion.button>
          </div>
        </div>

        {/* Bottom Status Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
           <div className="flex items-center justify-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
             <Info size={12} /> Ref. ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
           </div>
        </div>
      </motion.div>

      <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">
        KumbhPrashad • Secure Payment Gateway
      </p>
    </div>
  );
};

export default PaymentFailed;