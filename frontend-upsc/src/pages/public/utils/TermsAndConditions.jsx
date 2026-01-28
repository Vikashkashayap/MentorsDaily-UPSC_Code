import React from "react";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Animations */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-10 top-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(34,197,94,0.3), transparent 60%)",
          }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-20 bottom-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(253,224,71,0.3), transparent 60%)",
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome to MentorsDaily. Please read these terms carefully before
            using our website and services.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
        >
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">1. General Use</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing MentorsDaily, you agree to comply with these Terms.
              The platform and its features may change or update at any time
              without notice. Continued use means acceptance of such changes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              2. Content & Ownership
            </h2>
            <p className="text-gray-300 leading-relaxed">
              All text, videos, and materials are owned by MentorsDaily or our
              partners. You may not copy, sell, or redistribute our content
              without permission.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              3. Registration & Payment
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Users must provide accurate details during registration. All
              payments must be made through authorized methods and are subject
              to our refund policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              4. Privacy & Communication
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We respect your privacy and handle data according to our Privacy
              Policy. By using our platform, you agree to receive updates via
              email or SMS.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              5. Conduct & Restrictions
            </h2>
            <p className="text-gray-300 leading-relaxed">
              You agree not to misuse the platform, upload harmful content, or
              violate intellectual property rights. We may suspend accounts for
              inappropriate use.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              6. Disclaimer & Liability
            </h2>
            <p className="text-gray-300 leading-relaxed">
              MentorsDaily is not liable for interruptions or user performance
              outcomes. The platform is provided "as is" without warranties of
              any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              For any questions, reach us at{" "}
              <span className="text-yellow-400">contact@mentorsdaily.com</span>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
