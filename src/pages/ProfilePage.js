import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { 
  User, Package, MapPin, Clock, ChevronRight, 
  ShoppingBag, LogOut, Calendar, Star, ShieldCheck, Sparkles, List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- 🛰️ FETCH USER ORDERS FROM FIRESTORE ---
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FFF9F2]">
        <p className="font-serif font-bold text-orange-800 text-xl text-center px-6">
          Kripaya profile dekhne ke liye login karein.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 👤 LEFT SIDE: USER CARD --- */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] shadow-xl border border-orange-100 overflow-hidden"
          >
            <div className="h-24 bg-gradient-to-r from-orange-600 to-red-600" />
            <div className="px-8 pb-8">
              <div className="relative -mt-12 mb-4">
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg mx-auto object-cover"
                />
                <div className="absolute bottom-0 right-1/3 translate-x-4 p-1.5 bg-green-500 rounded-full border-2 border-white shadow-sm">
                  <Star size={12} className="text-white fill-current" />
                </div>
              </div>
              
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-serif font-black text-[#2D1B08]">{user.displayName}</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user.email}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-orange-50 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <ShieldCheck size={20} className="text-orange-600" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Status</p>
                    <p className="text-xs font-bold text-orange-900">Verified Yajman</p>
                  </div>
                </div>
                
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-3 py-4 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          <div className="bg-[#2D1B08] p-6 rounded-[2rem] text-white overflow-hidden relative">
            <Sparkles className="absolute -right-4 -top-4 opacity-20" size={80} />
            <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-2">Kumbh 2026</p>
            <h3 className="text-lg font-serif font-bold leading-tight">Aapki bhakti hamara saubhagya hai.</h3>
          </div>
        </div>

        {/* --- 📦 RIGHT SIDE: ORDERS LIST --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-serif font-black text-[#2D1B08] flex items-center gap-3">
              <Package className="text-orange-600" /> My Orders
            </h2>
            <span className="bg-white px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 border border-orange-100 uppercase tracking-widest">
              Total: {orders.length}
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20 gap-4 opacity-50">
              <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
              <p className="font-bold text-xs uppercase tracking-widest text-orange-800">Fetching sacred records...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[2rem] shadow-sm border border-orange-100 p-6 md:p-8 hover:shadow-xl hover:shadow-orange-900/5 transition-all group"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 border-b border-orange-50 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-600 rounded-2xl text-white shadow-lg shadow-orange-900/20">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Queue Number</p>
                        <p className="text-2xl font-serif font-black text-orange-600 leading-none">#{order.queueNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:text-right">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Paid</p>
                        <p className="text-xl font-black text-[#2D1B08] leading-none">₹{order.totalAmount}</p>
                      </div>
                      <div className="bg-green-50 px-4 py-2 rounded-xl text-[10px] font-black text-green-600 uppercase tracking-widest border border-green-100">
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* --- ✨ NEW: ORDER CONTENTS (Item Titles) --- */}
                  <div className="mb-8 p-5 bg-orange-50/30 rounded-2xl border border-orange-100/50">
                    <div className="flex items-center gap-2 mb-3 text-orange-800">
                      <List size={14} className="font-bold" />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Ordered Items</h4>
                    </div>
                    <div className="space-y-2">
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm font-bold text-[#2D1B08]">{item.name}</span>
                          <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">Qty: {item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Tracker */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} className="text-orange-600" /> Delivery Status
                      </p>
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                        Starts: October 2026
                      </p>
                    </div>
                    <div className="relative h-2 bg-orange-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '25%' }} 
                        className="absolute h-full bg-orange-600 rounded-full shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                      />
                    </div>
                    <div className="flex justify-between mt-3 px-1 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                      <span className="text-orange-600">Pre-Ordered</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>

                  {/* Order Details Footer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FFF9F2]/50 p-5 rounded-2xl border border-orange-50">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-orange-400 mt-0.5" />
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        {order.address.fullName}, {order.address.city}, {order.address.pincode}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-orange-400 mt-0.5" />
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        Ordered on {order.timestamp?.toDate().toLocaleDateString('en-IN', { dateStyle: 'long' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-orange-100 p-20 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={40} className="text-orange-200" />
              </div>
              <h3 className="text-xl font-serif font-black text-[#2D1B08]">Abhi koi order nahi mila</h3>
              <p className="text-sm text-slate-400 font-medium mt-2 mb-8">Pavitra Nashik ka prashad grahan karne ke liye store par jayein.</p>
              <button 
                onClick={() => navigate('/store')}
                className="bg-[#2D1B08] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-600 transition-all"
              >
                Go to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;