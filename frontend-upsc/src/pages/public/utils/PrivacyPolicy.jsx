import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-10 top-10 w-80 h-80 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(34,197,94,0.3), transparent 60%)",
          }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-20 bottom-20 w-72 h-72 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(253,224,71,0.3), transparent 60%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-sm text-gray-400 mb-4">Last Updated: December 2024</p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how MentorsDaily
            collects, uses, and protects your information.
          </p>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-gray-700/50"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We collect basic details such as name, email, phone, and payment
              info for registration, along with non-personal data like device type,
              IP address, and browsing activity.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Information</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Your information helps us improve services, process payments,
              communicate updates, and ensure a safe learning experience.
              We never sell your personal data.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies & Tracking</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies to enhance usability and analyze traffic. You can
              manage or disable cookies through your browser settings.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Protection</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We apply encryption and secure servers to protect your data.
              However, no online system can guarantee 100% security.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              You may access, update, or delete your personal data anytime by
              contacting us. You can also unsubscribe from marketing emails.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Links</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our site may include links to external websites. We’re not
              responsible for their content or privacy policies.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. Policy Updates</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may update this policy periodically. Continued use of our
              services means you accept the revised version.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              📧 <strong>Email:</strong> contact@mentorsdaily.com <br />
              📞 <strong>Phone:</strong> +91 8766233193 <br />
              📍 <strong>Address:</strong> B-69, Block B, Sector 2, Noida, UP 201301
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
