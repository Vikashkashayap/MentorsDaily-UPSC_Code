import { useEffect, useState } from "react";

// Scholarship Announcement Component
const ScholarshipAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const getNextSunday = (date) => {
      const day = date.getDay();
      const daysUntilSunday = day === 0 ? 7 : 7 - day; // If it's Sunday, get next Sunday
      const nextSunday = new Date(date);
      nextSunday.setDate(date.getDate() + daysUntilSunday);
      nextSunday.setHours(10, 0, 0, 0); // Set to 10:00 AM
      return nextSunday;
    };

    const getFollowingSunday = (sundayDate) => {
      const followingSunday = new Date(sundayDate);
      followingSunday.setDate(sundayDate.getDate() + 7);
      return followingSunday;
    };

    const updateCountdown = () => {
      const now = new Date();
      const nextSunday = getNextSunday(now);
      const followingSunday = getFollowingSunday(nextSunday);
      
      // Check if we're past the first Sunday, use the second Sunday
      const targetDate = now > nextSunday ? followingSunday : nextSunday;
      
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white overflow-hidden shadow-xl py-3 md:py-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(255,255,255,0.12),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-10 w-2 h-2 bg-blue-200/40 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-8 right-20 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-indigo-200/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
        <div className="absolute top-6 left-1/3 text-yellow-200/70 text-xs animate-ping" style={{ animationDuration: '2s' }}>✨</div>
        <div className="absolute bottom-4 right-1/3 text-blue-200/60 text-xs animate-ping" style={{ animationDuration: '3s' }}>✨</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          {/* Left side - Main content */}
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            {/* Graduation Cap Icon */}
            <div className="flex-shrink-0">
              <div className="text-3xl md:text-4xl animate-bounce" style={{ animationDuration: '2s' }}>🎓</div>
            </div>

            {/* Text Content */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-blue-200 text-xs tracking-widest font-bold uppercase flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  LIMITED TIME
                </p>
                <div className="hidden md:block w-px h-3 bg-blue-300/40"></div>
                <div className="hidden md:flex items-center gap-1">
                  <span className="text-xs font-semibold text-blue-100">Scholarship Test</span>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1">
                <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-xl" 
                      style={{ letterSpacing: '0.05em' }}>
                  Udaan – UPSC Scholarship Test
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <p className="text-yellow-100 font-bold flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  Coming Sunday - Test Starts In:
                </p>
              </div>
              {/* Countdown Timer Boxes */}
              <div className="flex items-center gap-1 my-1">
                <div className="bg-yellow-400/90 backdrop-blur-sm rounded px-2 py-1 min-w-[45px] text-center">
                  <div className="text-lg font-black text-blue-900">{timeLeft.days}</div>
                  <div className="text-[9px] text-blue-800 font-bold">Days</div>
                </div>
                <div className="text-yellow-200 font-bold text-sm">:</div>
                <div className="bg-yellow-400/90 backdrop-blur-sm rounded px-2 py-1 min-w-[45px] text-center">
                  <div className="text-lg font-black text-blue-900">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-[9px] text-blue-800 font-bold">Hours</div>
                </div>
                <div className="text-yellow-200 font-bold text-sm">:</div>
                <div className="bg-yellow-400/90 backdrop-blur-sm rounded px-2 py-1 min-w-[45px] text-center">
                  <div className="text-lg font-black text-blue-900">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-[9px] text-blue-800 font-bold">Mins</div>
                </div>
                <div className="text-yellow-200 font-bold text-sm">:</div>
                <div className="bg-yellow-400/90 backdrop-blur-sm rounded px-2 py-1 min-w-[45px] text-center">
                  <div className="text-lg font-black text-blue-900">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-[9px] text-blue-800 font-bold">Secs</div>
                </div>
              </div>
              {/* Time and Mode Info */}
              <div className="flex items-center gap-3 text-xs mt-1">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-white">10:00 AM – 11:00 AM</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-bold text-white">Online Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://docs.google.com/forms/d/1nztXJE1qYeLPSSuH5ZodP_z5TkfW8yTVSoanLiD4EN8/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-black text-blue-900 bg-gradient-to-r from-white via-blue-50 to-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-400/50 border-2 border-white/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register Now 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <div className="hidden lg:flex flex-col items-start text-xs leading-tight">
              <span className="text-blue-200 font-semibold">Up to</span>
              <span className="text-yellow-300 font-extrabold animate-pulse">100% Scholarship</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship rewards bar - Horizontal scroll on mobile */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-2">
        <div className="flex items-center gap-2 md:gap-3 text-xs overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 flex-shrink-0">
            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            <span className="font-bold text-yellow-100 whitespace-nowrap">AIR 1: 100% Scholarship</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20 flex-shrink-0"></div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg flex-shrink-0">
            <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
            <span className="font-semibold text-white/90 whitespace-nowrap">AIR 2-5: 70% Scholarship</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20 flex-shrink-0"></div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg flex-shrink-0">
            <div className="w-2 h-2 bg-blue-200 rounded-full"></div>
            <span className="font-semibold text-white/90 whitespace-nowrap">AIR 6-10: 50% Scholarship</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20 flex-shrink-0"></div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg flex-shrink-0">
            <div className="w-2 h-2 bg-white/70 rounded-full"></div>
            <span className="font-semibold text-white/90 whitespace-nowrap">AIR 11-50: 25% Scholarship</span>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-2 right-2 md:top-3 md:right-3 text-white/70 hover:text-white transition-colors duration-200 p-1"
        aria-label="Close banner"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default ScholarshipAnnouncement;
