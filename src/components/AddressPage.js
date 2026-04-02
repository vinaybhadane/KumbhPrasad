import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, User, Home, Building2, 
  Navigation2, CheckCircle2, ChevronRight, ArrowLeft, Mail, IndianRupee 
} from 'lucide-react';

const AddressPage = ({ onProceedToPayment, onBack, cartItems = [] }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', // Razorpay needs this for receipts
    mobile: '',
    address: '',
    landmark: '',
    city: '',
    pincode: '',
    state: ''
  });

  const [errors, setErrors] = useState({});

  // --- 🧮 Summary Calculations ---
  const summary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const gst = Math.round(subtotal * 0.05);
    const delivery = (subtotal > 0 && subtotal < 100) ? 40 : 0;
    return { subtotal, gst, delivery, total: subtotal + gst + delivery };
  }, [cartItems]);

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Pura naam daalein";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Sahi email id daalein";
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "10-digit mobile number daalein";
    if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) newErrors.pincode = "Sahi Pincode daalein";
    if (!formData.address.trim()) newErrors.address = "Pata likhna zaroori hai";
    if (!formData.city.trim()) newErrors.city = "Shahar ka naam daalein";
    if (!formData.state) newErrors.state = "Rajya chunein";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 🛡️ Error Fix: Safe execution check
      if (typeof onProceedToPayment === 'function') {
        onProceedToPayment(formData);
      } else {
        console.error("Critical: onProceedToPayment prop is missing from App.js!");
        alert("Takniki error: Payment logic load nahi ho pa raha.");
      }
    }
  };

  const inputStyle = (field) => `
    w-full bg-orange-50/40 border ${errors[field] ? 'border-red-400' : 'border-orange-100'} 
    rounded-2xl px-12 py-4 text-[#2D1B08] font-bold text-sm focus:outline-none focus:border-orange-500 
    transition-all placeholder:text-slate-400 shadow-sm
  `;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 bg-[#FFF9F2] flex flex-col items-center">
      
      <motion.button 
        whileHover={{ x: -5 }}
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-orange-700 font-black text-xs uppercase tracking-widest self-start max-w-5xl mx-auto w-full"
      >
        <ArrowLeft size={16} /> Wapas Cart mein Jayein
      </motion.button>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* --- LEFT: Address Form (2/3 width) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-orange-100 overflow-hidden"
        >
          <div className="bg-orange-600 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif font-black tracking-tight">Vitran Pata</h2>
              <p className="text-orange-100 text-[10px] font-bold uppercase tracking-[0.2em]">Kahan bhejna hai prashad?</p>
            </div>
            <MapPin size={28} />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-orange-400" size={18} />
                <input type="text" placeholder="Full Name" className={inputStyle('fullName')} value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                {errors.fullName && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.fullName}</p>}
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-orange-400" size={18} />
                <input type="email" placeholder="Email Address" className={inputStyle('email')} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.email}</p>}
              </div>
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-4 text-orange-400" size={18} />
              <input type="tel" placeholder="Mobile Number" maxLength={10} className={inputStyle('mobile')} value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
              {errors.mobile && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.mobile}</p>}
            </div>

            <div className="relative">
              <Home className="absolute left-4 top-4 text-orange-400" size={18} />
              <textarea placeholder="Complete Address" className={`${inputStyle('address')} h-28 resize-none`} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              {errors.address && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <Navigation2 className="absolute left-4 top-4 text-orange-400" size={18} />
                <input type="text" placeholder="City" className={inputStyle('city')} value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                {errors.city && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.city}</p>}
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-orange-400" size={18} />
                <input type="text" placeholder="Pincode" maxLength={6} className={inputStyle('pincode')} value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                {errors.pincode && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.pincode}</p>}
              </div>
            </div>

            <div className="relative">
              <Building2 className="absolute left-4 top-4 text-orange-400" size={18} />
              <select className={inputStyle('state')} value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}>
                <option value="">Select State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-[10px] text-red-500 mt-1 ml-2 font-bold">{errors.state}</p>}
            </div>

            <button type="submit" className="hidden lg:flex w-full bg-[#2D1B08] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-orange-600 transition-all items-center justify-center gap-4">
              Proceed to Payment <ChevronRight size={18} />
            </button>
          </form>
        </motion.div>

        {/* --- RIGHT: Order Summary (1/3 width) --- */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-orange-100"
          >
            <h3 className="text-xl font-serif font-black text-[#2D1B08] mb-6 flex items-center gap-2">
              <IndianRupee size={20} className="text-orange-600" /> Bill Summary
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>₹{summary.subtotal}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Delivery</span>
                <span className={summary.delivery === 0 ? "text-green-600" : ""}>{summary.delivery === 0 ? "FREE" : `₹${summary.delivery}`}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-dashed border-orange-100 pb-4">
                <span>GST (5%)</span>
                <span>₹{summary.gst}</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-sm font-black text-[#2D1B08] uppercase">Total</span>
                <span className="text-3xl font-black text-orange-600 tracking-tighter">₹{summary.total}</span>
              </div>
            </div>

            {/* Mobile-visible button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-[#2D1B08] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-4"
            >
              Pay Now <ChevronRight size={18} />
            </button>
          </motion.div>

          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-[9px] font-black text-orange-800 leading-relaxed uppercase">
              Secure 256-bit Encrypted Transaction. Aapki puja, hamari zimmedari.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;