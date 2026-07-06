import { useState } from 'react';

const BOOKING_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header';

const MentorshipBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => window.open(BOOKING_URL, '_blank')}
            className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-left group min-w-0"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-yellow-400/20 border border-yellow-300/30 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide text-yellow-200 flex-shrink-0">
              <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
              Free Session
            </span>
            <span className="text-sm sm:text-[15px] font-semibold text-white/95 group-hover:text-white transition-colors truncate">
              Book your free 1-on-1 UPSC mentorship call — limited slots available
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-yellow-300 group-hover:gap-2 transition-all flex-shrink-0">
              Book Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="flex-shrink-0 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss announcement"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipBanner;
