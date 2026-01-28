import { motion } from "framer-motion";

export default function RefundCancellation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-10 top-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.3), transparent 60%)",
          }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-20 bottom-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(253,224,71,0.3), transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              Refund and Cancellation Policy
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At MentorsDaily, we strive to ensure a transparent and user-friendly experience.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-gray-700/50 shadow-2xl"
        >
          {/* Refund Policy Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700">
              Refund Policy
            </h2>

            {/* Non-Refundable Nature */}
            <div className="bg-red-500/10 border-l-4 border-red-400 rounded-r-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-red-400 mb-4">Non-Refundable Nature of Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">●</span>
                  <span>Refunds will not be offered for any purchased course, class, or material.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">●</span>
                  <span>We encourage users to explore free resources, demo videos, or trial content available on our platform or YouTube channel before making a purchase.</span>
                </li>
              </ul>
            </div>

            {/* Duplicate Payments */}
            <div className="bg-green-500/10 border-l-4 border-green-400 rounded-r-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">Exceptions for Duplicate Payments</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">●</span>
                  <span>Refunds will be processed only in cases where payment has been made more than once for the same course.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">●</span>
                  <span>In such cases, the refund will be credited to the original payment method within seven (7) working days from the confirmation of the claim.</span>
                </li>
              </ul>
            </div>

            {/* No Refund for Dissatisfaction */}
            <div className="bg-yellow-500/10 border-l-4 border-yellow-400 rounded-r-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">No Refund for Post-Purchase Dissatisfaction</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">●</span>
                  <span>Refunds will not be granted if users decide they do not like the course after purchase.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cancellation Policy Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700">
              Cancellation Policy
            </h2>

            {/* Right to Cancel */}
            <div className="bg-blue-500/10 border-l-4 border-blue-400 rounded-r-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Right to Cancel Orders</h3>
              <p className="text-gray-300 mb-4">
                MentorsDaily reserves the right to cancel any order at its discretion under the following circumstances:
              </p>
              <ul className="space-y-3 text-gray-300 ml-4">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">■</span>
                  <span>If we are unable to deliver the order satisfactorily.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">■</span>
                  <span>If the user is found to be violating our Terms of Use, such as attempting to exploit the system or misuse our services.</span>
                </li>
              </ul>
            </div>

            {/* Communication */}
            <div className="bg-purple-500/10 border-l-4 border-purple-400 rounded-r-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Communication of Cancellations</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">●</span>
                  <span>In case of order cancellations, MentorsDaily will ensure prompt communication and processing of any applicable refund, if eligible, within a reasonable timeframe.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-8 mt-8">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">Need Help?</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              For any questions regarding refunds, cancellations, or payment issues, please contact us:
            </p>
            <div className="text-gray-300 space-y-2">
              <p className="flex items-center">
                <span className="font-semibold text-white mr-2">Email:</span>
                <a href="mailto:contact@mentorsdaily.com" className="text-green-400 hover:text-green-300 transition-colors">
                  contact@mentorsdaily.com
                </a>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-white mr-2">Phone:</span>
                <a href="tel:+918766233193" className="text-green-400 hover:text-green-300 transition-colors">
                  +91 8766233193
                </a>
              </p>
              <p className="flex items-start">
                <span className="font-semibold text-white mr-2">Address:</span>
                <span>B-69, Block B, Noida Sector 2, Noida, Uttar Pradesh 201301</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
