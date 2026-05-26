import React from "react";
import { motion } from "framer-motion";

export default function Careers() {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSczkuM5BQmxILioIJGSRMzOq-RI4qopdMKh3kJmSZAnS5_w8A/viewform?usp=header";

  const handleApplyClick = () => {
    window.open(googleFormUrl, "_blank", "noopener,noreferrer");
  };

  const benefits = [
    { icon: "💼", title: "Competitive Salary", desc: "Attractive compensation packages" },
    { icon: "📈", title: "Career Growth", desc: "Opportunities for professional development" },
    { icon: "🎓", title: "Learning & Development", desc: "Continuous skill enhancement programs" },
    { icon: "⚖️", title: "Work-Life Balance", desc: "Flexible working arrangements" },
    { icon: "🤝", title: "Collaborative Environment", desc: "Work with passionate professionals" },
    { icon: "🏆", title: "Impactful Work", desc: "Make a difference in students' lives" },
  ];

  const openPositions = [
    {
      title: "Content Developer",
      department: "Content Team",
      description: "Create engaging educational content for UPSC aspirants",
    },
    {
      title: "Mentor",
      department: "Mentorship Team",
      description: "Guide and mentor UPSC aspirants in their preparation journey",
    },
    {
      title: "Business Development Associate / Sales Counselor",
      department: "Business Development Team",
      description: "Drive business growth by connecting with students and helping them choose the right mentorship programs",
    },
    {
      title: "Video Editor",
      department: "Content Team",
      description: "Create and edit engaging video content for educational courses and promotional materials",
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing Team",
      description: "Drive growth and engagement through strategic digital marketing initiatives across various platforms",
    },
    {
      title: "Graphics Designer",
      department: "Design Team",
      description: "Design visually appealing graphics, infographics, and marketing materials for our platform",
    },
    {
      title: "Software Developer",
      department: "Technology Team",
      description: "Build and enhance our platform to serve students better",
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

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Be part of a mission to empower UPSC aspirants and shape the future of civil services preparation. 
              We're looking for passionate individuals who want to make a difference.
            </p>
            <motion.button
              onClick={handleApplyClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-lg"
            >
              <span className="mr-2">📝</span>
              Apply Now
            </motion.button>
          </motion.div>

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-gray-700/50">
            {/* Why Join Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Why Join Mentors Daily?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-green-500/30 transition-all duration-300"
                  >
                    <div className="text-4xl mb-3">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Open Positions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Open Positions
              </h2>
              <div className="space-y-4">
                {openPositions.map((position, index) => (
                  <motion.div
                    key={position.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-green-500/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{position.title}</h3>
                        <p className="text-green-400 text-sm mb-2">{position.department}</p>
                        <p className="text-gray-400">{position.description}</p>
                      </div>
                      <motion.button
                        onClick={handleApplyClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-8 border border-green-500/20 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Make an Impact?</h3>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
                If you don't see a position that matches your skills, we'd still love to hear from you! 
                We're always looking for talented individuals who share our passion for education and student success.
              </p>
              <motion.button
                onClick={handleApplyClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-lg"
              >
                <span className="mr-2">📝</span>
                Fill Application Form
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

