import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
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

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Mentors Daily is a comprehensive platform for UPSC aspirants, providing expert mentorship, 
              quality study materials, and personalized guidance to help you succeed in your civil services journey.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-gray-700/50">
            {/* Three Column Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-green-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-4">Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To become India's leading UPSC mentorship platform by providing the most interactive 
                  learning experience and validated content, helping students make informed decisions 
                  about their civil services career.
                </p>
              </motion.div>

              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  Mentors Daily has been created to fulfill a vision of empowering UPSC aspirants with 
                  comprehensive knowledge, expert mentorship, and strategic guidance so they can make 
                  wiser decisions while pursuing their civil services career.
                </p>
              </motion.div>

              {/* Belief Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Belief</h3>
                <p className="text-gray-300 leading-relaxed">
                  We believe that collaboration between experienced mentors and dedicated aspirants is 
                  the future of UPSC preparation. We have brought together students and expert mentors 
                  from across the country to create a supportive learning community.
                </p>
              </motion.div>
            </div>

            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12"
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Students can use Mentors Daily as their one-stop destination to access comprehensive 
                UPSC preparation resources, including expert mentorship programs, current affairs analysis, 
                answer writing practice, test series, and interactive study tools to simplify the entire 
                preparation process.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With Mentors Daily, you'll never miss important deadlines - be the first to know about 
                exam notifications, result announcements, application forms, and admit card release dates 
                for all UPSC examinations. Our platform ensures you stay ahead in your preparation journey.
              </p>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-12"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Mentors Daily?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: "🏆", title: "1200+ Successful Selections", desc: "Proven track record of success" },
                  { icon: "⭐", title: "98% Student Satisfaction", desc: "Highly rated mentorship programs" },
                  { icon: "🛡️", title: "24/7 Expert Support", desc: "Round-the-clock guidance available" },
                  { icon: "📚", title: "Comprehensive Materials", desc: "Complete study resources and tools" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                    className="text-center p-4 bg-white/5 rounded-xl border border-gray-600/30 hover:border-green-500/30 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partnership Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-8 border border-green-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Partner With Us</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Mentors Daily offers integrated partnership and collaboration programs to reach our 
                highly engaged audience of UPSC aspirants and education stakeholders. 
                <span className="text-green-400 font-semibold"> To partner with us, contact us </span> 
                and let's work together to empower the next generation of civil servants.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/contact-us"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Contact Us
                </motion.a>
                <motion.a
                  href="/MentorshipCourses"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-gray-600 hover:border-green-500 transition-all"
                >
                  View Programs
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
