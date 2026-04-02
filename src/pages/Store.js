import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Flame, ShieldCheck, MapPin, Clock, ArrowRight, Droplets, Gift, Tag, CheckCircle2 } from 'lucide-react';

// Assets
import bgImagePaper from '../assets/ancient-paper-texture.jpg';
import imgKumbhPrashad from '../assets/kumbh-prashad.png'; 
import imgGodavariJal from '../assets/godavari-jal.png';
import imgDivineKit from '../assets/divine-kit.png';

const ProductSection = ({ onAddToCart }) => {
  // Feedback state: item ID store karega jo abhi add hua hai
  const [addedId, setAddedId] = useState(null);

  const products = [
    { 
      id: 1, 
      name: 'KumbhPrashad', 
      image: imgKumbhPrashad,
      desc: 'Maha-Kumbh special sanctified offering. Pure, traditional, and filled with divine energy.', 
      originalPrice: 201,
      price: 51, 
      icon: <Flame size={18} />, 
      badge: 'Bestseller' 
    },
    { 
      id: 2, 
      name: 'Godavari Jal', 
      image: imgGodavariJal,
      desc: 'Authentic Pavitra Jal collected from Ram Kund during auspicious Brahma-Muhurta.', 
      originalPrice: 151,
      price: 101, 
      icon: <Droplets size={18} />, 
      badge: 'Most Sacred' 
    },
    { 
      id: 3, 
      name: 'Kumbh Divine Kit', 
      image: imgDivineKit,
      desc: 'Complete spiritual collection: Siddh Jal, Mandir Model, Rudraksh, Prashad, etc.', 
      originalPrice: 901,
      price: 501, 
      icon: <Gift size={18} />, 
      badge: 'Ultimate Blessing' 
    }
  ];

  const handleAddClick = (item) => {
    // 1. Icon hatao (Cookie crash se bachne ke liye)
    const { icon, ...simpleProductData } = item;
    onAddToCart(simpleProductData);

    // 2. Feedback dikhao
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000); // 2 sec baad normal kar do
  };

  return (
    <section 
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImagePaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* --- ✨ ADVANCED BLENDING LAYERS ✨ --- */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FFF9F2] via-[#FFF9F2]/80 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FFF9F2] via-[#FFF9F2]/80 to-transparent z-10" />

      {/* Subtle Mandala Background Animation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center"
      >
          <img src="https://www.transparenttextures.com/patterns/mandala.png" alt="pattern" className="w-[800px]" />
      </motion.div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 flex flex-col items-center">
        
        {/* Heading Section */}
        <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-serif font-black text-[#2D1B08] leading-tight mb-4"
            >
              Pavitra Prasadam <br />
              <span className="relative inline-block mt-4">
                <span className="absolute inset-0 bg-white/80 backdrop-blur-md -rotate-1 rounded-2xl scale-110 shadow-sm border border-orange-100"></span>
                <span className="relative text-orange-600 italic px-6">Collection</span>
              </span>
            </motion.h2>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="mt-10 flex items-center gap-3 bg-red-600 text-white px-6 py-2 rounded-full shadow-lg shadow-red-200 inline-flex mx-auto"
            >
              <Tag size={16} className="animate-bounce" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                Limited Maha-Kumbh Offer • Order Now!
              </span>
            </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-20">
          {products.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -12 }}
              className="relative group bg-white/95 backdrop-blur-sm rounded-[2.5rem] border border-orange-100 shadow-[0_20px_50px_rgba(234,88,12,0.08)] flex flex-col overflow-hidden transition-all duration-500 hover:shadow-orange-200"
            >
              {/* Product Image Section */}
              <div className="relative w-full h-72 overflow-hidden bg-orange-50/30">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain p-8 z-10 relative"
                />
                
                {/* Decorative Divine Glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-4 right-6 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg shadow-md uppercase tracking-tighter z-20">
                    SAVING
                </div>
                <div className="absolute top-4 left-6 z-30">
                   <div className="relative flex items-center gap-2 bg-orange-600 text-white px-4 py-1.5 rounded-full shadow-lg text-[10px] font-black uppercase tracking-widest">
                     <Clock size={12} className="animate-pulse" />
                     {item.badge}
                   </div>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                    <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">{item.icon}</span>
                    <h3 className="text-2xl font-serif font-black text-[#2D1B08]">{item.name}</h3>
                </div>

                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 flex-grow">{item.desc}</p>

                <div className="grid grid-cols-2 gap-2 border-y border-slate-50 py-6 mb-8">
                    <div className="flex items-center gap-2 text-slate-500">
                        <ShieldCheck size={14} className="text-orange-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#4A3728]">Lab Tested</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                        <MapPin size={14} className="text-orange-500" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#4A3728]">Ram Kund</span>
                    </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest line-through decoration-red-500 decoration-2 mb-1">
                        ₹{item.originalPrice}
                    </span>
                    <span className="text-4xl font-serif font-black text-[#2D1B08] tracking-tighter">
                        ₹{item.price}
                    </span>
                  </div>
                  
                  {/* Dynamic Feedback Button */}
                  <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddClick(item)}
                      className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest transition-all shadow-xl min-w-[140px] justify-center ${
                        addedId === item.id 
                        ? 'bg-green-600 text-white shadow-green-200' 
                        : 'bg-[#2D1B08] text-white hover:bg-orange-600 shadow-orange-100'
                      }`}
                  >
                      {addedId === item.id ? (
                        <>PRASHAD ADDED! <CheckCircle2 size={16} /></>
                      ) : (
                        <>PRE-ORDER <ShoppingCart size={16} /></>
                      )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Action */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center"
        >
          <button className="group relative px-14 py-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(234,88,12,0.3)]">
            <span className="relative z-10 flex items-center gap-4 text-white font-black text-sm uppercase tracking-[0.2em]">
              Explore Full Collection
              <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
            </span>
          </button>
          <p className="mt-8 text-[#4A3728] text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
            * Limited Stocks Remaining • Order Now
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;