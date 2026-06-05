import React from 'react';
import { motion } from 'framer-motion';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-orange-100">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-serif font-black text-[#2D1B08] mb-8 text-center border-b border-orange-100 pb-6">
            Shipping and Delivery Policy
          </h1>
          
          <div className="space-y-6 text-[#4A3728] leading-relaxed">
            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">1. Delivery Schedule</h2>
            <p>
              Currently, we are running a pre-order campaign. All bookings made now will be dispatched <strong>only after the Maha-Kumbh Mela officially starts in Nashik</strong>. We take great care in collecting and sanctifying the offerings, which requires time during the auspicious days.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">2. Shipping Operations</h2>
            <p>
              All our products are sourced and shipped directly from our headquarters in Nashik, Maharashtra. We partner with reliable courier services to ensure your sacred items reach you safely and respectfully across India.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">3. Tracking Your Order</h2>
            <p>
              Once the Kumbh Mela commences and your order is dispatched, you will receive an email and an SMS notification containing your tracking number. You can use this number to monitor your package's journey from Nashik to your doorstep.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">4. Shipping Charges</h2>
            <p>
              Shipping and handling charges are calculated based on your location and the weight of your package. The exact shipping fee will be displayed at checkout before you finalize your pre-order. Free shipping may be available for specific promotional orders or order values.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
