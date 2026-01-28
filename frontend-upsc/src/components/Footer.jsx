// src/components/Footer.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/mentorsdaily",
      label: "LinkedIn",
      icon: (
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.98 0h3.83v2.18h.05c.53-1.01 1.82-2.07 3.75-2.07 4.01 0 4.75 2.64 4.75 6.07V24h-4v-7.6c0-1.81-.03-4.14-2.52-4.14-2.53 0-2.92 1.98-2.92 4.02V24h-3.92V8z" />
      ),
      gradient: "from-blue-600 to-blue-800",
    },
    {
      href: "https://twitter.com/@MentorsDaily_",
      label: "X (Twitter)",
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      ),
      gradient: "from-gray-800 to-gray-900",
    },
    {
      href: "https://www.instagram.com/mentorsdaily",
      label: "Instagram",
      icon: (
        <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm5.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
      ),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      href: "https://www.facebook.com/mentorsdaily",
      label: "Facebook",
      icon: (
        <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 5.01 3.66 9.16 8.44 9.95v-7.04H7.9v-2.91h2.41V9.41c0-2.38 1.42-3.7 3.6-3.7 1.04 0 2.12.19 2.12.19v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.91h-2.22v7.04c4.78-.79 8.44-4.94 8.44-9.95z" />
      ),
      gradient: "from-blue-500 to-blue-700",
    },
    {
      href: "https://t.me/MentorsDailyOfficial",
      label: "Telegram",
      icon: (
        <path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.55-1.1.55l.4-5.65 10.67-9.66c.45-.4-.1-.62-.69-.22L6.79 13.08 1.52 11.6c-1.18-.37-1.19-1.16.26-1.75l21.26-8.2c.98-.43 1.84.24 1.53 1.73z" />
      ),
      gradient: "from-blue-400 to-blue-600",
    },
    {
      href: "https://www.youtube.com/@MentorsDailyOfficial",
      label: "YouTube",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
      gradient: "from-red-600 to-red-800",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden  bg-gradient-to-b from-[#0b0f0e] via-[#0f1413] to-[#121818] text-gray-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
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
          className="absolute left-10 top-10 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(34,197,94,0.08), transparent 60%)",
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
          className="absolute right-20 bottom-20 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(253,224,71,0.06), transparent 60%)",
          }}
        />
        
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid gap-8 lg:grid-cols-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <a href="/" className="inline-flex items-center group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="/Logo/logo.png"
                alt="MentorsDaily"
                width={160}
                height={60}
                className="h-10 w-auto drop-shadow-lg"
              />
            </a>
            <p className="text-gray-400 mt-4 text-lg leading-relaxed max-w-md">
              Empowering UPSC aspirants through personalized mentorship, structured guidance, 
              and comprehensive support systems for success.
            </p>
            
            {/* Newsletter Subscription */}
            {/* <div className="mt-6">
              <h4 className="font-semibold text-white mb-3 text-lg">Stay Updated</h4>
              <AnimatePresence>
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center text-green-400">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Thank you for subscribing!
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubscribe}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                      required
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                      Subscribe
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div> */}
          </motion.div>

          {/* Links Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg uppercase tracking-wider bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { name: "About Us", href: "/about-us", icon: "👥" },
                  { name: "Mentorship Courses", href: "/MentorshipCourses", icon: "📚" },
                  { name: "UPSC Answer Evaluation", href: "/", icon: "✍️" },
                  { name: "UPSC Blog", href: "/preparation-blogs", icon: "📝" },
                  { name: "Contact Us", href: "/contact-us", icon: "📞" },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors group"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="group-hover:text-white transition-colors">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg uppercase tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Resources
              </h4>
              <div className="space-y-3">
                {[
                  { name: "UPSC Mentorship", href: "/integrated-mentorship", icon: "🎯" },
                  { name: "UPPCS Mentorship", href: "/uppcs-mentorship", icon: "🏛️" },
                  // { name: "Study Materials", href: "/", icon: "📖" },
                  // { name: "Test Series", href: "/", icon: "📊" },
                  { name: "Success Stories", href: "/success-stories", icon: "🏆" },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="group-hover:text-white transition-colors">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg uppercase tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Support
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Privacy Policy", href: "/privacy-policy", icon: "🔒" },
                  { name: "Terms & Conditions", href: "/terms-and-conditions", icon: "📋" },
                  { name: "Refund & Cancellation", href: "/refund-cancellation", icon: "💳" },
                  { name: "Careers", href: "/careers", icon: "💼" },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="group-hover:text-white transition-colors">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Section - Contact & Social */}
        <div className="grid lg:grid-cols-2 gap-8 py-8 border-t border-b border-gray-800/50">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h4 className="font-bold text-white text-xl">Get in Touch</h4>
            <div className="grid gap-4">
              {[
                {
                  title: "Visit Our Office",
                  text: "B-69, Block B, Noida Sector 2, Noida, Uttar Pradesh 201301",
                  href: "https://maps.google.com",
                  icon: "📍",
                  color: "text-orange-400",
                },
                {
                  title: "Call Us",
                  text: "+91 8766233193",
                  href: "tel:+918766233193",
                  icon: "📞",
                  color: "text-green-400",
                },
                {
                  title: "Email Us",
                  text: "contact@mentorsdaily.com",
                  href: "mailto:contact@mentorsdaily.com",
                  icon: "✉️",
                  color: "text-yellow-400",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className={`text-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">{item.title}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-gray-400">{item.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h4 className="font-bold text-white text-xl">Follow Our Journey</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                  }}
                  onHoverStart={() => setHoveredSocial(social.label)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className={`relative p-3 rounded-2xl bg-gradient-to-br ${social.gradient} shadow-lg hover:shadow-xl transition-all duration-300 group`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    {social.icon}
                  </svg>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredSocial === social.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded-md text-xs whitespace-nowrap"
                      >
                        {social.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { text: "1200+ Selections", icon: "🏆" },
                { text: "98% Satisfaction", icon: "⭐" },
                { text: "24/7 Support", icon: "🛡️" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2 bg-gray-800/30 px-3 py-2 rounded-lg"
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm text-gray-300">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
        >
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              Sempiternity Technologies .
            </span> All rights reserved.
          </div>

          {/* Additional Links */}
          {/* <div className="flex flex-wrap gap-6 text-sm">
            {[
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Cookie Policy", href: "/cookies" },
              { name: "Sitemap", href: "/sitemap" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div> */}

          {/* Scroll to Top */}
         
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <span className="text-gray-400">Back to Top</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button> */}
        </motion.div>
      </div>
    </footer>
  );
} 