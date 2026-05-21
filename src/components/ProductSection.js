import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Flame, ShieldCheck, MapPin, Clock, ArrowRight, Droplets, Gift, Tag, CheckCircle2, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import bgImagePaper from '../assets/ancient-paper-texture-optimized.jpg';
import imgKumbhPrashad from '../assets/kumbh-prashad-optimized.webp'; 
import imgGodavariJal from '../assets/godavari-jal-optimized.webp';
import imgDivineKit from '../assets/divine-kit-optimized.webp';

const products = [
  { 
    id: 1, 
    name: 'KumbhPrasad', 
    image: imgKumbhPrashad,
    desc: 'Maha-Kumbh special sanctified offering. Pure, traditional, and filled with divine energy.', 
    originalPrice: 201,
    price: 51, 
    icon: <Flame size={18} />, 
    badge: 'Bestseller',
    badgeColor: 'from-orange-500 to-red-500',
    savings: '75% OFF',
    reviews: 4218,
    rating: 4.9,
  },
  { 
    id: 2, 
    name: 'Godavari Jal', 
    image: imgGodavariJal,
    desc: 'Authentic Pavitra Jal collected from Ram Kund during auspicious Brahma-Muhurta.', 
    originalPrice: 151,
    price: 101, 
    icon: <Droplets size={18} />, 
    badge: 'Most Sacred',
    badgeColor: 'from-blue-500 to-cyan-500',
    savings: '33% OFF',
    reviews: 3104,
    rating: 4.8,
  },
  { 
    id: 3, 
    name: 'Kumbh Divine Kit', 
    image: imgDivineKit,
    desc: 'Complete spiritual collection: Siddh Jal, Mandir Model, Rudraksh, Prasad, and more.', 
    originalPrice: 901,
    price: 501, 
    icon: <Gift size={18} />, 
    badge: 'Ultimate',
    badgeColor: 'from-purple-500 to-pink-500',
    savings: '44% OFF',
    reviews: 1856,
    rating: 5.0,
  }
];

const ProductCard = ({ item, i, onAddToCart }) => {
  const [addedId, setAddedId] = useState(null);

  const handleAddClick = () => {
    const { icon, ...simpleProductData } = item;
    onAddToCart(simpleProductData);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2200);
  };

  const isAdded = addedId === item.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.15, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="relative group bg-white rounded-[2rem] border border-orange-100/80 shadow-[0_8px_40px_rgba(234,88,12,0.07)] flex flex-col overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(234,88,12,0.15)] hover:border-orange-200"
    >
      {/* Savings Badge */}
      <div className="absolute top-4 right-4 z-30 bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-xl shadow-lg uppercase tracking-wider">
        {item.savings}
      </div>

      {/* Badge */}
      <div className="absolute top-4 left-4 z-30">
        <div className={`flex items-center gap-1.5 bg-gradient-to-r ${item.badgeColor} text-white px-3 py-1.5 rounded-full shadow-lg text-[9px] font-black uppercase tracking-widest`}>
          <Clock size={10} className="animate-pulse" />
          {item.badge}
        </div>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-orange-50/60 to-amber-50/40">
        <motion.img 
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
          width="320"
          height="208"
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-contain p-4 z-10 relative transition-transform"
        />
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow">
        {/* Title */}
        <div className="flex items-center gap-3 mb-3">
          <span className="p-2 bg-orange-100 text-orange-600 rounded-xl">{item.icon}</span>
          <h3 className="text-xl font-serif font-black text-[#2D1B08]">{item.name}</h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} size={11} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-[11px] font-black text-slate-400">{item.rating} ({item.reviews.toLocaleString()})</span>
        </div>

        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{item.desc}</p>

        {/* Trust chips */}
        <div className="flex gap-2 mb-6">
          <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-green-100">
            <ShieldCheck size={11} /> Lab Tested
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border border-blue-100">
            <MapPin size={11} /> Ram Kund
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 line-through decoration-red-400 decoration-2">
              ₹{item.originalPrice}
            </span>
            <span className="text-3xl font-serif font-black text-[#2D1B08] tracking-tighter leading-none">
              ₹{item.price}
            </span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={handleAddClick}
            className={`relative flex items-center gap-2 px-5 py-3.5 rounded-2xl font-black text-[11px] tracking-wider transition-all min-w-[130px] justify-center overflow-hidden ${
              isAdded 
              ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
              : 'bg-[#2D1B08] text-white hover:bg-orange-600 shadow-lg shadow-orange-900/20'
            }`}
          >
            {/* Shine on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-600" />
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 uppercase"
                >
                  Added! <CheckCircle2 size={15} />
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 uppercase"
                >
                  Pre-Order <ShoppingCart size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductSection = ({ onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <section 
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImagePaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Blend overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFF9F2] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FFF9F2] to-transparent z-10" />
      <div className="absolute inset-0 bg-white/40" />

      {/* Rotating mandala */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0 flex items-center justify-center"
      >
        <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[900px]" />
      </motion.div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-100 px-5 py-2 rounded-full text-orange-700 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-orange-200"
          >
            <Zap size={12} className="text-orange-600" />
            Exclusive Pre-Order Collection
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-[#2D1B08] leading-tight mb-4"
          >
            Pavitra Prasadam{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-50 -rotate-1 rounded-xl scale-110 border border-orange-200/50" />
              <span className="relative text-orange-600 italic px-4">Collection</span>
            </span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-3 bg-red-600 text-white px-6 py-2.5 rounded-full shadow-lg shadow-red-200"
          >
            <Tag size={14} className="animate-bounce" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              Limited Maha-Kumbh Offer • Order Now!
            </span>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          {products.map((item, i) => (
            <ProductCard key={item.id} item={item} i={i} onAddToCart={onAddToCart} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button 
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/store')} 
            className="group relative px-14 py-5 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(234,88,12,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-4 text-white font-black text-sm uppercase tracking-[0.2em]">
              Explore Full Collection
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
          <p className="mt-6 text-[#4A3728] text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
            * Limited Stocks Remaining • Order Now
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
