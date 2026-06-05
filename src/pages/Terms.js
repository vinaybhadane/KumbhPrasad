import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-orange-100">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-serif font-black text-[#2D1B08] mb-8 text-center border-b border-orange-100 pb-6">
            Terms and Conditions
          </h1>

          <div className="space-y-6 text-[#4A3728] leading-relaxed">
            <p>Welcome to KumbhPrasad. By using our website and placing an order, you agree to the following terms and conditions.</p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">1. General Information</h2>
            <p>
              These products are being delivered directly from Nashik. This is a registered business, and we are delivering these sacred products to you with utmost devotion (bhakti).
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">2. Product Nature</h2>
            <p>
              Our offerings include sacred items like Godavari Jal and Puja Kits. <strong>Please note that no edible items are included in these packages.</strong>
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">3. Pre-Orders and Deliveries</h2>
            <p>
              Currently, we are accepting pre-orders. You can book your Kumbh Prasad now to secure your offering. The deliveries will commence only after the Maha-Kumbh Mela officially starts in Nashik. We request your patience as these are sacred items requiring proper time for preparation and dispatch during the holy period.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">4. Pricing and Payments</h2>
            <p>
              All prices listed on the website are inclusive of taxes unless stated otherwise. Payments are securely processed through our payment gateway partners. Pre-orders are confirmed only upon successful payment.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">5. Modifications to Service</h2>
            <p>
              We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
