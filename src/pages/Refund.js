import React from 'react';
import { motion } from 'framer-motion';

const Refund = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-orange-100">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-serif font-black text-[#2D1B08] mb-8 text-center border-b border-orange-100 pb-6">
            Refund, Return & Cancellation Policy
          </h1>
          
          <div className="space-y-6 text-[#4A3728] leading-relaxed">
            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">1. Return Policy</h2>
            <p>
              Due to the sacred and spiritual nature of our products, we have a strict return policy. Returns are <strong>only possible if you receive a broken or damaged product</strong>. 
            </p>
            <p>
              If you receive a damaged item, you must notify us within 24 hours of delivery by contacting our support team at <strong>+91 7083562087</strong> or emailing <strong>seva@kumbhprasad.app</strong> with unboxing pictures and videos as proof.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">2. Refund Policy</h2>
            <p>
              Refunds will only be processed if the reason for return is accurate and verified by our team (e.g., product arrived broken). 
            </p>
            <p>
              Once your return claim is approved, the refund process will be initiated. The approved refund amount will be credited back to your original payment method within <strong>5-7 working days</strong>.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">3. Cancellation Policy</h2>
            <p>
              Pre-orders can be cancelled before they are dispatched. Once the order has been dispatched from our Nashik facility, it cannot be cancelled. To request a cancellation, please contact our support team immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Refund;
