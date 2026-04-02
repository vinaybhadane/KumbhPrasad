import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Firebase Imports
import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  doc, 
  runTransaction, 
  serverTimestamp 
} from 'firebase/firestore';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustUrgency from './components/TrustUrgency';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import AddressPage from './components/AddressPage';

// Pages
import Store from './pages/Store';
import About from './pages/About';
import Contact from './pages/Contact';
import SuccessPage from './pages/SuccessPage';
import PaymentFailed from './pages/PaymentFailed';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage'; // ✨ Admin Page Import

// --- 🍪 COOKIE HELPERS ---
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    try {
      return JSON.parse(decodeURIComponent(parts.pop().split(';').shift()));
    } catch (e) { return null; }
  }
  return null;
};

const MainApp = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [isRedirectingToCheckout, setIsRedirectingToCheckout] = useState(false);
  const navigate = useNavigate();

  // Admin Email Constant
  const ADMIN_EMAIL = "vinaybhadane06@gmail.com";

  // --- 🛠️ RAZORPAY SCRIPT LOADER ---
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- 🔐 AUTHENTICATION TRACKER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
      
      if (currentUser && isRedirectingToCheckout) {
        navigate('/checkout');
        setIsRedirectingToCheckout(false);
      }
    });
    return () => unsubscribe();
  }, [isRedirectingToCheckout, navigate]);

  // --- 🛒 CART LOGIC ---
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevItems.map((item) => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) => 
      prevItems
        .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (user) navigate('/checkout');
    else {
      setIsRedirectingToCheckout(true);
      navigate('/login');
    }
  };

  // --- 💳 PAYMENT LOGIC ---
  const handleRazorpayPayment = async (addressDetails) => {
    const res = await loadRazorpayScript();
    if (!res) return alert("Razorpay SDK load nahi ho paya.");

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const gstAmount = Math.round(subtotal * 0.05);
    const deliveryCharge = (subtotal > 0 && subtotal < 100) ? 40 : 0;
    const totalAmount = subtotal + gstAmount + deliveryCharge;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
      amount: totalAmount * 100, 
      currency: "INR",
      name: "KUMBH PRASHAD",
      description: "Sacred Pre-Order Booking",
      handler: async function (response) {
        try {
          const counterRef = doc(db, "metadata", "orderStats");
          let finalQueueNumber = 18544;

          await runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            if (!counterDoc.exists()) transaction.set(counterRef, { lastQueueNumber: 18544 });
            else {
              const newQueue = counterDoc.data().lastQueueNumber + 1;
              transaction.update(counterRef, { lastQueueNumber: newQueue });
              finalQueueNumber = newQueue;
            }
          });

          const orderData = {
            userId: user.uid,
            customerName: addressDetails.fullName,
            email: addressDetails.email || user.email,
            mobile: addressDetails.mobile,
            address: addressDetails,
            items: cartItems,
            totalAmount: totalAmount,
            paymentId: response.razorpay_payment_id,
            queueNumber: finalQueueNumber,
            status: "Pre-Ordered",
            timestamp: serverTimestamp()
          };

          const docRef = await addDoc(collection(db, "orders"), orderData);
          setCartItems([]);
          document.cookie = "kumbhCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate('/success', { state: { order: { ...orderData, orderId: docRef.id } } });

        } catch (error) { navigate('/failed'); }
      },
      prefill: { name: addressDetails.fullName, email: user.email, contact: addressDetails.mobile },
      theme: { color: "#EA580C" },
      modal: { ondismiss: function() { navigate('/failed'); } }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => navigate('/failed'));
    rzp.open();
  };

  // --- 🔄 COOKIE PERSISTENCE ---
  useEffect(() => {
    const savedCart = getCookie('kumbhCart');
    if (savedCart) setCartItems(savedCart);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) setCookie('kumbhCart', cartItems, 1);
    else document.cookie = "kumbhCart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, [cartItems]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  if (loading) return (
    <div className="h-screen bg-[#FFF9F2] flex flex-col items-center justify-center font-serif text-orange-600">
      <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="animate-pulse font-black uppercase tracking-widest text-[10px]">Jai Godavari...</p>
    </div>
  );

  return (
    <div className="relative bg-[#FFF9F2] min-h-screen overflow-x-hidden font-sans">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)} 
        cartItems={cartItems}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
        user={user}
        onLoginClick={() => {
          setIsRedirectingToCheckout(false);
          navigate('/login');
        }}
        onLogout={handleLogout}
        onCheckout={handleCheckout}
      />

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<main><Hero /><TrustUrgency /><ProductSection onAddToCart={addToCart} /><Footer /></main>} />
        <Route path="/store" element={<><Store onAddToCart={addToCart} /><Footer /></>} />
        <Route path="/about" element={<><About /><Footer /></>} />
        <Route path="/contact" element={<><Contact /><Footer /></>} />
        <Route path="/login" element={<LoginPage onBack={() => navigate('/')} />} />

        {/* --- 🛡️ PROTECTED ROUTES (Logged-in Only) --- */}
        
        <Route path="/profile" element={
          user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
        } />

        <Route path="/checkout" element={
          user ? (
            <AddressPage 
              onProceedToPayment={handleRazorpayPayment} 
              onBack={() => navigate('/')}
              cartItems={cartItems} 
            />
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/success" element={user ? <SuccessPage /> : <Navigate to="/login" />} />
        <Route path="/failed" element={user ? <PaymentFailed /> : <Navigate to="/login" />} />

        {/* --- 👑 ADMIN ROUTE (Specific Email Only) --- */}
        <Route path="/admin" element={
          (user && user.email === ADMIN_EMAIL) ? (
            <AdminPage />
          ) : user ? (
            <Navigate to="/profile" /> // Logged in but not Admin
          ) : (
            <Navigate to="/login" />   // Not logged in
          )
        } />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;