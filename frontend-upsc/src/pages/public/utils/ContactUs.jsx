import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success"); // "success" or "error"

  // Auto-hide popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbx-JPT0yAVbfs_TOvIOcjMXCzZvB-ai9E39bLBIKG0YuFRadDK_PcVSzdfgCiEKekcA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      setStatus("✅ Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Show success popup
      setPopupMessage("Form submitted successfully!");
      setPopupType("success");
      setShowPopup(true);
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setStatus("❌ Failed to send. Please try again.");
      console.error(err);
      setIsSubmitting(false);
      // Show error popup
      setPopupMessage("Failed to send. Please try again.");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  const contactInfo = [
    {
      title: "Visit Our Office",
      description: "B-69, Block B, Noida Sector 2, Noida, Uttar Pradesh 201301",
      icon: "📍",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      title: "Call Us",
      description: "+91 8766233193",
      icon: "📞",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Email Us",
      description: "contact@mentorsdaily.com",
      icon: "✉️",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/mentorsdaily",
      icon: "💼",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/@MentorsDaily_",
      icon: "🐦",
      color: "from-sky-500 to-blue-500",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/mentorsdaily",
      icon: "📷",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/mentorsdaily",
      icon: "👥",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Telegram",
      url: "https://t.me/mentorsdaily",
      icon: "✈️",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@MentorsDailyOfficial",
      icon: "📺",
      color: "from-red-600 to-red-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our UPSC mentorship programs? We're here to help you succeed in your civil services journey.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center"
                  >
                    <div className="text-green-400 text-4xl mb-4">✅</div>
                    <h3 className="text-green-400 text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white transition-all"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="mentorship">Mentorship Program</option>
                          <option value="course">Course Information</option>
                          <option value="support">Test Series</option>
                          <option value="support">Counselling</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white placeholder-gray-400 transition-all resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className={`${info.bgColor} ${info.borderColor} border rounded-2xl p-6 hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-3xl bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
                        <p className="text-gray-300">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`bg-gradient-to-br ${social.color} p-4 rounded-xl text-center hover:shadow-lg transition-all`}
                    >
                      <div className="text-2xl mb-2">{social.icon}</div>
                      <div className="text-white text-sm font-medium">{social.name}</div>
                    </motion.a>
                  ))}
                </div>
              </motion.div> */}

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {[
                    { icon: "🏆", text: "1200+ Successful Selections", color: "text-yellow-400" },
                    { icon: "⭐", text: "98% Student Satisfaction Rate", color: "text-green-400" },
                    { icon: "🛡️", text: "24/7 Expert Support", color: "text-blue-400" },
                    { icon: "📚", text: "Comprehensive Study Materials", color: "text-purple-400" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className={`${item.color} font-medium`}>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`max-w-sm p-4 rounded-lg shadow-lg border-l-4 ${
              popupType === "success"
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-red-50 border-red-400 text-red-800"
            }`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {popupType === "success" ? (
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{popupMessage}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    onClick={() => setShowPopup(false)}
                    className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      popupType === "success"
                        ? "text-green-500 hover:bg-green-100 focus:ring-green-600"
                        : "text-red-500 hover:bg-red-100 focus:ring-red-600"
                    }`}
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
