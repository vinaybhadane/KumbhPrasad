import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, query, orderBy, limit, getDocs, 
  startAfter, limitToLast, endBefore, doc, updateDoc 
} from 'firebase/firestore';
import { 
  Package, IndianRupee, ChevronLeft, ChevronRight, List
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [page, setPage] = useState(1);
  
  // --- ✨ Naya State Stats ke liye ---
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalCount: 0
  });

  // --- 📊 SARE ORDERS KA TOTAL CALCULATE KARNA ---
  const fetchStats = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      let revenue = 0;
      querySnapshot.forEach((doc) => {
        // totalAmount ko plus karna
        revenue += (doc.data().totalAmount || 0);
      });
      setStats({
        totalRevenue: revenue,
        totalCount: querySnapshot.size
      });
    } catch (error) {
      console.error("Stats fetch error:", error);
    }
  };

  // --- 🛰️ FETCH ORDERS FOR TABLE ---
  const fetchOrders = async (direction = 'initial') => {
    setLoading(true);
    try {
      let q;
      const ordersCol = collection(db, "orders");

      if (direction === 'next' && lastVisible) {
        q = query(ordersCol, orderBy("timestamp", "desc"), startAfter(lastVisible), limit(10));
      } else if (direction === 'prev' && firstVisible) {
        q = query(ordersCol, orderBy("timestamp", "desc"), endBefore(firstVisible), limitToLast(10));
      } else {
        q = query(ordersCol, orderBy("timestamp", "desc"), limit(10));
      }

      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setOrders(ordersData);
      setFirstVisible(snapshot.docs[0]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Admin fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchOrders(); 
    fetchStats(); // Stats ko bhi load karo
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      alert("Status update fail ho gaya!");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pre-Ordered': return 'bg-blue-100 text-blue-600';
      case 'Shipped': return 'bg-orange-100 text-orange-600';
      case 'Out for Delivery': return 'bg-yellow-100 text-yellow-700';
      case 'Delivered': return 'bg-green-100 text-green-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-10 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* --- HEADER & REAL-TIME STATS --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-serif font-black text-slate-900 uppercase tracking-tight">Kumbh Admin Control</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Management Portal v1.0</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            {/* Live Orders Card */}
            <div className="flex-1 md:w-48 bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm">
               <div className="flex justify-between items-center mb-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase">Total Orders</p>
                 <Package size={14} className="text-orange-600" />
               </div>
               <p className="text-2xl font-black text-slate-900">{stats.totalCount}</p>
            </div>

            {/* Total Sales Card */}
            <div className="flex-1 md:w-60 bg-[#2D1B08] p-5 rounded-[2rem] shadow-xl shadow-orange-900/20">
               <div className="flex justify-between items-center mb-1">
                 <p className="text-[10px] font-black text-orange-300/50 uppercase">Total Revenue</p>
                 <IndianRupee size={14} className="text-orange-400" />
               </div>
               <p className="text-2xl font-black text-white">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* --- ORDERS TABLE --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Queue/ID</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Items</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="5" className="py-20 text-center text-xs font-bold text-slate-400 animate-pulse">Loading Sacred Records...</td></tr>
                ) : orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="text-lg font-serif font-black text-orange-600">#{order.queueNumber}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{order.id.slice(0,10)}...</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">{order.customerName}</p>
                      <p className="text-[10px] font-medium text-slate-500">{order.address.city}, {order.address.pincode}</p>
                      <p className="text-[10px] font-bold text-orange-600 mt-1">{order.mobile}</p>
                    </td>
                    <td className="px-8 py-6 text-[11px] font-bold text-slate-600">
                      <div className="bg-orange-50/50 p-2 rounded-lg border border-orange-100/50">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex gap-2">
                            <span>{item.qty}x</span>
                            <span className="text-slate-900 truncate max-w-[150px]">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900">₹{order.totalAmount}</p>
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-tighter bg-green-50 px-2 py-0.5 rounded">Paid</span>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer ${getStatusColor(order.status)}`}
                      >
                        <option value="Pre-Ordered">Pre-Ordered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION FOOTER --- */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Page <span className="text-slate-900">{page}</span>
            </p>
            <div className="flex gap-2">
              <button 
                disabled={page === 1 || loading}
                onClick={() => { fetchOrders('prev'); setPage(p => p - 1); }}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-orange-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                disabled={orders.length < 10 || loading}
                onClick={() => { fetchOrders('next'); setPage(p => p + 1); }}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-orange-600 hover:text-white disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;