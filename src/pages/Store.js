import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Flame, ShieldCheck, MapPin, Clock, Droplets, Gift, CheckCircle2, Star, Filter, Search } from 'lucide-react';

// Assets
import bgImagePaper from '../assets/ancient-paper-texture-optimized.jpg';
import imgKumbhPrashad from '../assets/kumbh-prashad-optimized.webp'; 
import imgGodavariJal from '../assets/godavari-jal-optimized.webp';
import imgDivineKit from '../assets/divine-kit-optimized.webp';

const allProducts = [
  { 
    id: 1, name: 'KumbhPrasad', image: imgKumbhPrashad,
    desc: 'Maha-Kumbh special sanctified offering. Pure, traditional, and filled with divine energy.', 
    originalPrice: 201, price: 51, badge: 'Bestseller', savings: '75% OFF',
    badgeColor: 'from-orange-500 to-red-500', icon: <Flame size={18} />,
    category: 'prasad', rating: 4.9, reviews: 4218,
  },
  { 
    id: 2, name: 'Godavari Jal', image: imgGodavariJal,
    desc: 'Authentic Pavitra Jal collected from Ram Kund during auspicious Brahma-Muhurta.', 
    originalPrice: 151, price: 101, badge: 'Most Sacred', savings: '33% OFF',
    badgeColor: 'from-blue-500 to-cyan-500', icon: <Droplets size={18} />,
    category: 'jal', rating: 4.8, reviews: 3104,
  },
  { 
    id: 3, name: 'Kumbh Divine Kit', image: imgDivineKit,
    desc: 'Complete spiritual collection: Siddh Jal, Mandir Model, Rudraksh, Prasad, and more.', 
    originalPrice: 901, price: 501, badge: 'Ultimate', savings: '44% OFF',
    badgeColor: 'from-purple-500 to-pink-500', icon: <Gift size={18} />,
    category: 'kit', rating: 5.0, reviews: 1856,
  }
];

const Store = ({ onAddToCart }) => {
  const [addedId, setAddedId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClick = (item) => {
    const { icon, ...simpleProductData } = item;
    onAddToCart(simpleProductData);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2200);
  };

  return (
    <section 
      className="relative w-full min-h-screen pt-32 pb-24 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImagePaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/50" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFF9F2] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FFF9F2] to-transparent z-10" />

      <div className="relative z-20 max-w-[1400px] mx-auto px-6">
        
        {/* Page Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-orange-100 px-5 py-2 rounded-full text-orange-700 font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-orange-200"
          >
            <ShieldCheck size={12} /> Authorized Maha-Kumbh 2026 Store
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-[#2D1B08] leading-tight mb-4"
          >
            Pavitra Prasadam{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-50 -rotate-1 rounded-xl scale-110 border border-orange-200/50" />
              <span className="relative text-orange-600 italic px-4">Store</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-[#4A3728] font-medium text-base md:text-lg leading-relaxed mb-8"
          >
            Handpicked sacred offerings from the holy ghats of Nashik. Every item is freshly prepared and sanctified by Vedic scholars.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
            <input 
              type="text"
              placeholder="Search prasad, jal, kit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-orange-100 rounded-2xl text-sm font-semibold text-[#2D1B08] placeholder:text-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 shadow-sm transition-all"
            />
          </motion.div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[#4A3728]">
            <Filter size={14} className="text-orange-500" />
            <span className="text-sm font-bold">{filtered.length} Sacred Items</span>
          </div>
          <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider animate-pulse">
            ⚠️ Limited Stock • Order Now
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group bg-white rounded-[2rem] border border-orange-100 shadow-[0_8px_40px_rgba(234,88,12,0.07)] flex flex-col overflow-hidden hover:shadow-[0_20px_60px_rgba(234,88,12,0.15)] hover:border-orange-200 transition-all duration-400"
              >
                {/* Savings */}
                <div className="absolute top-4 right-4 z-30 bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-xl shadow uppercase tracking-wide">
                  {item.savings}
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4 z-30">
                  <div className={`flex items-center gap-1.5 bg-gradient-to-r ${item.badgeColor} text-white px-3 py-1.5 rounded-full shadow text-[9px] font-black uppercase tracking-widest`}>
                    <Clock size={10} className="animate-pulse" /> {item.badge}
                  </div>
                </div>

                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-orange-50/60 to-amber-50/40">
                  <motion.img 
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.4 }}
                    loading="eager"
                    width="320" height="208"
                    src={item.image} alt={item.name} 
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-orange-100 text-orange-600 rounded-xl">{item.icon}</span>
                    <h2 className="text-xl font-serif font-black text-[#2D1B08]">{item.name}</h2>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={11} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-slate-400">{item.rating} ({item.reviews.toLocaleString()})</span>
                  </div>

                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5 flex-grow">{item.desc}</p>

                  <div className="flex gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-[9px] font-black border border-green-100">
                      <ShieldCheck size={11} /> Lab Tested
                    </div>
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[9px] font-black border border-blue-100">
                      <MapPin size={11} /> Ram Kund
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 line-through decoration-red-400 decoration-2 block">₹{item.originalPrice}</span>
                      <span className="text-3xl font-serif font-black text-[#2D1B08] tracking-tighter">₹{item.price}</span>
                    </div>
                    
                    <motion.button 
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleAddClick(item)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-[11px] tracking-wider transition-all shadow-lg min-w-[120px] justify-center uppercase ${
                        addedId === item.id 
                        ? 'bg-green-600 text-white shadow-green-200' 
                        : 'bg-[#2D1B08] text-white hover:bg-orange-600 shadow-orange-900/15'
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {addedId === item.id ? (
                          <motion.span key="added" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                            Added! <CheckCircle2 size={15} />
                          </motion.span>
                        ) : (
                          <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                            Pre-Order <ShoppingCart size={15} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 opacity-50">
            <Search size={60} className="mx-auto mb-4 text-orange-200" />
            <p className="font-serif font-bold text-xl text-[#2D1B08]">No items found</p>
            <button onClick={() => setSearch('')} className="mt-4 text-orange-600 font-bold text-sm underline">Clear search</button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Store;
