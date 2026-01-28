
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { messageHandler } from "../../../utils/messageHandler";

export default function ContactForm({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Hide success message when user starts typing again
    if (showSuccessMessage) {
      setShowSuccessMessage(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
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

      // Show success message on form
      setShowSuccessMessage(true);

      // Show success toast
      messageHandler.success("Form successfully submitted!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      // Close the form after a delay (increased to show success message)
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      messageHandler.error("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-2 sm:p-4">
      <div className="relative w-full max-w-6xl mx-auto bg-white h-auto max-h-[98vh] sm:max-h-[95vh] flex flex-col lg:flex-row shadow-2xl rounded-lg sm:rounded-lg overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 p-2 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full shadow-lg hover:bg-gray-50"
          aria-label="Close"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Section - Features */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 p-8 lg:p-10 flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="text-2xl lg:text-3xl font-bold">
                <span className="text-red-600">Mentors</span>
                <span className="text-[#1a3da7]">Daily</span>
              </div>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a3da7] mb-6 leading-tight">
              How MentorsDaily supports your journey?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {/* Personalized Guidance */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#1a3da7] leading-tight">Daily 1:1 Personalised Mentorship</p>
            </div>

            {/* Study Materials */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804v12.392A7.962 7.962 0 0110.5 14c-1.669 0-3.218.51-4.5 1.385V4.804z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#1a3da7] leading-tight">Study Materials</p>
            </div>

            {/* Expert Mentors */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#1a3da7] leading-tight">Psychologist Support & Personality Development</p>
            </div>

            {/* Test Series */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#1a3da7] leading-tight">Test Series & Answer Evaluation</p>
            </div>

            {/* Answer Evaluation */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#1a3da7] leading-tight">24*7 Mentor Support</p>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-[#1a3da7] leading-tight">Progress Tracking & Personalised Feedback</p>
            </div>
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 bg-white overflow-y-auto">
          <div className="w-full max-w-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1a3da7] mb-1">Register Now for free Session!</h2>
            <p className="text-gray-600 mb-4 sm:mb-5 text-xs sm:text-sm md:text-base">Start Your UPSC Preparation with MentorsDaily</p>

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-green-50 border-l-4 border-green-500 rounded-lg shadow-sm animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs sm:text-sm font-semibold text-green-700">
                    Form successfully submitted! Thank you for registering.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1.5 text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a3da7] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="w-full px-3 py-2.5 sm:px-4 rounded-lg border-2 border-gray-300 focus:border-[#1a3da7] focus:outline-none focus:ring-2 focus:ring-[#1a3da7]/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1.5 text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a3da7] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className="w-full px-3 py-2.5 sm:px-4 rounded-lg border-2 border-gray-300 focus:border-[#1a3da7] focus:outline-none focus:ring-2 focus:ring-[#1a3da7]/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1.5 text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a3da7] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full px-3 py-2.5 sm:px-4 rounded-lg border-2 border-gray-300 focus:border-[#1a3da7] focus:outline-none focus:ring-2 focus:ring-[#1a3da7]/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-1.5 text-xs sm:text-sm">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a3da7] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full px-3 py-2.5 sm:px-4 rounded-lg border-2 border-gray-300 focus:border-[#1a3da7] focus:outline-none focus:ring-2 focus:ring-[#1a3da7]/20 transition-all text-sm sm:text-base"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a3da7] text-white font-semibold py-2.5 sm:py-3 rounded-lg shadow-lg hover:bg-[#15308a] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base mt-2 sm:mt-3"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
