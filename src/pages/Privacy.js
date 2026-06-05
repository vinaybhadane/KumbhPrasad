import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-orange-100">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-serif font-black text-[#2D1B08] mb-8 text-center border-b border-orange-100 pb-6">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-[#4A3728] leading-relaxed">
            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">1. Information We Collect</h2>
            <p>
              When you use KumbhPrasad, we collect information you provide directly to us, such as when you create or modify your account, place an order, contact customer support, or otherwise communicate with us. This information may include: name, email address, phone number, shipping address, and payment information.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">2. How We Use Information</h2>
            <p>
              We use the information we collect to process your pre-orders and deliveries during the Maha-Kumbh, send you related information including order confirmations and updates, respond to your comments and questions, and provide customer service.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as necessary to process payments, fulfill your orders, or as required by law.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">4. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-xl font-bold text-[#2D1B08] mt-8 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <strong>seva@kumbhprasad.app</strong> or call us at <strong>+91 7083562087</strong>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
