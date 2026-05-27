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
      className={`fixed z-50 right-0 top-1/2 -translate-y-1/2 max-w-[40px] transition-all duration-500 ${
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
          <div className="relative bg-gradient-to-b from-blue-600 via-blue-700 to-blue-600 text-white font-semibold px-2 py-2.5 rounded-t-md shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700">
            <span className="relative z-10 flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] font-medium whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                Enquire Now
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 transition-transform group-hover:translate-y-0.5"
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-md"></div>
          </div>

          {/* Arrow Pointer extending from bottom */}
          <div className="relative flex items-center">
            <svg
              width="32"
              height="10"
              viewBox="0 0 44 14"
              className="text-blue-600"
              fill="currentColor"
              style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.15))' }}
            >
              <path d="M0 0 L22 14 L44 0 Z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

