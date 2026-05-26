import React, { useState, useEffect } from "react";

export default function EnquiryWidget({ onClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed z-50 right-0 top-1/2 -translate-y-1/2 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <button
        onClick={onClick}
        aria-label="Open enquiry form"
        className="group relative flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {/* Main Button Container with Arrow */}
        <div className="relative flex flex-col items-center">
          {/* Button Body */}
          <div className="relative bg-gradient-to-b from-blue-600 via-blue-700 to-blue-600 text-white font-semibold px-3 sm:px-4 py-4 sm:py-5 rounded-t-lg sm:rounded-t-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700">
            <span className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-2.5">
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                Enquire Now
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg sm:rounded-t-xl"></div>
          </div>

          {/* Arrow Pointer extending from bottom */}
          <div className="relative flex items-center">
            <svg
              width="44"
              height="14"
              viewBox="0 0 44 14"
              className="text-blue-600"
              fill="currentColor"
              style={{ filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.2))' }}
            >
              <path d="M0 0 L22 14 L44 0 Z" />
            </svg>
          </div>
        </div>

        {/* Pulse animation ring for attention */}
        <div className="absolute inset-0 rounded-t-lg sm:rounded-t-xl border-2 border-blue-400 opacity-0 group-hover:opacity-100 animate-ping"></div>
      </button>
    </div>
  );
}

