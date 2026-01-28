import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SuccessStories() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Shivam Singh",
      initials: "SS",
      rating: 5,
      excerpt: "Focused. Disciplined. Effective. Mentors Daily helped me cut through distractions and focus on what truly matters. The regular planning sessions and timely nudges kept me on track without feeling overwhelmed. It's a simple...",
      fullReview: "Focused. Disciplined. Effective. Mentors Daily helped me cut through distractions and focus on what truly matters. The regular planning sessions and timely nudges kept me on track without feeling overwhelmed. It's a simple yet powerful approach that transformed my preparation journey. The mentors understood my strengths and weaknesses, providing personalized guidance that made all the difference.",
      avatarColor: "bg-blue-500",
      featured: false,
    },
    {
      id: 2,
      name: "Shweta Singh",
      initials: "SS",
      rating: 5,
      excerpt: "Balancing work and studies felt impossible—until I found Mentors Daily. Juggling a full-time job with exam prep left me exhausted and unfocused. I kept falling behind. Mentors Daily gave me structure, support, and...",
      fullReview: "Balancing work and studies felt impossible—until I found Mentors Daily. Juggling a full-time job with exam prep left me exhausted and unfocused. I kept falling behind. Mentors Daily gave me structure, support, and most importantly, hope. Their flexible scheduling and understanding mentors helped me create a sustainable study plan that worked with my job commitments. Today, I'm proud to say I cleared the exam in my first attempt!",
      avatarColor: "bg-green-500",
      featured: false,
    },
    {
      id: 3,
      name: "Bulbul Singh",
      initials: "BS",
      rating: 5,
      excerpt: "Mentors Daily is a dedicated and reliable platform for IAS aspirants and students. Their personalized guidance, expert counselling, and consistent motivation make a real difference in shaping careers. A trustworthy mento...",
      fullReview: "Mentors Daily is a dedicated and reliable platform for IAS aspirants and students. Their personalized guidance, expert counselling, and consistent motivation make a real difference in shaping careers. A trustworthy mentor who genuinely cares about your success. The comprehensive study materials and regular doubt-clearing sessions were game-changers for my preparation.",
      avatarColor: "bg-purple-500",
      featured: false,
    },
    {
      id: 4,
      name: "Nidhi Rajput",
      initials: "NR",
      rating: 5,
      excerpt: "Consistency made easy. Joining Mentors Daily brought structure to my preparation. The daily plans and...",
      fullReview: "Consistency made easy. Joining Mentors Daily brought structure to my preparation. The daily plans and systematic approach helped me stay consistent throughout my journey. The mentors were always available to guide and motivate me during difficult times. Their expertise in current affairs and answer writing techniques gave me the edge I needed to succeed.",
      avatarColor: "bg-orange-500",
      featured: false,
    },
    {
      id: 5,
      name: "Vikram Singh",
      initials: "VS",
      rating: 4,
      excerpt: "As a student of Mentors Daily I am going to write a whole paragraph in review because I loved the way...",
      fullReview: "As a student of Mentors Daily I am going to write a whole paragraph in review because I loved the way they approach teaching. The personalized attention, regular feedback, and strategic guidance helped me understand the exam pattern better. The mentors not only taught me the subjects but also instilled confidence in me. The mock tests and answer evaluation sessions were particularly helpful in improving my performance.",
      avatarColor: "bg-indigo-500",
      featured: true,
    },
    {
      id: 6,
      name: "Ripu Daman Singh",
      initials: "RDS",
      rating: 5,
      excerpt: "Mentors Daily has truly boosted my preparation. The structured routine, daily targets, and supportive mentors...",
      fullReview: "Mentors Daily has truly boosted my preparation. The structured routine, daily targets, and supportive mentors helped me stay focused and motivated throughout my journey. The comprehensive study plan and regular assessments kept me on track. I'm grateful for the personalized guidance that helped me clear the exam with a good rank.",
      avatarColor: "bg-pink-500",
      featured: false,
    },
  ];

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-900">Success Stories from Our </span>
              <span className="text-blue-600">Aspirants</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from successful candidates who achieved their goals with Mentors Daily.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer ${
                  testimonial.featured ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => openModal(testimonial)}
              >
                {testimonial.featured && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {testimonial.excerpt}
                </p>
                
                <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  Click to read full review
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Full Review */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full ${selectedTestimonial.avatarColor} flex items-center justify-center text-white font-bold text-xl`}>
                    {selectedTestimonial.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-xl">{selectedTestimonial.name}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedTestimonial.fullReview}
                </p>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
