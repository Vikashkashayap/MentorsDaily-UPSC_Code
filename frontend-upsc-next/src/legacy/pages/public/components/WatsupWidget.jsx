import React from "react";

export default function WatsupWidget() {
  const phoneNumber = "918766233193"; // +91 87662 33193
  const prefilledText = encodeURIComponent(
    "Hello Mentors Daily! I have a query regarding UPSC mentorship ."
  );
  const waLink = `https://wa.me/${phoneNumber}?text=${prefilledText}`;

  return (
    <div className="fixed z-50 bottom-6 right-6">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp about UPSC mentorship"
        className="group relative inline-flex items-center justify-center"
      >
        {/* Tooltip with arrow */}
        <span className="absolute -top-12 right-0 translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
          Any query? Chat with us
          <span className="absolute bottom-[-5px] right-3 w-2 h-2 rotate-45 bg-gray-900"></span>
        </span>

        {/* Outer Ping effect (double ring) */}
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-green-400 opacity-20 animate-ping"></span>
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-green-500 opacity-10 animate-ping delay-200"></span>

        {/* Main Floating Button */}
        <span
          className="relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full 
          bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
          text-white shadow-xl shadow-green-500/40 transition-transform duration-300 transform hover:scale-110 backdrop-blur-md"
        >
          {/* WhatsApp SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="h-7 w-7 sm:h-8 sm:w-8"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M19.11 17.32a5.54 5.54 0 0 1-2.46-.67a10.3 10.3 0 0 1-1.83-1.19a10.86 10.86 0 0 1-1.63-1.6a5.37 5.37 0 0 1-.91-1.61a2.27 2.27 0 0 1 .07-2c.12-.27.27-.54.46-.78a1 1 0 0 1 1.3-.29l1.6.92a1 1 0 0 1 .46 1.23c-.08.21-.17.41-.28.61c-.19.34-.39.69-.23 1.06a6.56 6.56 0 0 0 2.31 2.41c.47.29.83.24 1.19 0c.19-.14.38-.28.57-.43a1 1 0 0 1 1.23 0l1.4 1.09a1 1 0 0 1 .2 1.36a6.54 6.54 0 0 1-1.85 1.61a2.21 2.21 0 0 1-1.11.29Z"
            />
            <path
              fill="currentColor"
              d="M14.76 3A11.76 11.76 0 0 0 4.82 20.2L3 28.74a1 1 0 0 0 1.18 1.18l8.54-1.81A11.76 11.76 0 1 0 14.76 3m0 21.5a9.74 9.74 0 0 1-4.66-1.2a1 1 0 0 0-.6-.1l-5.76 1.22l1.22-5.76a1 1 0 0 0-.1-.6a9.76 9.76 0 1 1 9.9 6.44"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
