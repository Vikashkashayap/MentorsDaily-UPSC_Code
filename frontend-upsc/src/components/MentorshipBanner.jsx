import { useState, useEffect } from 'react';

const MentorshipBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50); // Smooth rotation every 50ms

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-1.5 md:py-2 shadow-lg cursor-pointer"
      onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header', '_blank')}
    >
      {/* Sliding Banner Container */}
      <div className="animate-slide-right-to-left">
        <div className="whitespace-nowrap flex">
          {/* First Content */}
          <div className="flex items-center gap-3 px-4 mr-8 flex-shrink-0">
            {/* Text Content */}
            <div className="text-left">
              {/* <div className="flex items-center gap-2 mb-1">
                <p className="text-blue-200 text-xs tracking-widest font-bold uppercase flex items-center gap-1">
                  <span>🎯</span> Free Session
                </p>
                <div className="hidden sm:block w-px h-3 bg-blue-300/40"></div>
                <div className="hidden sm:flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wide uppercase text-blue-200">LIMITED TIME</span>
                </div>
              </div> */}
              <h2 className="text-sm md:text-base lg:text-lg font-bold mb-0.5">
                <span className="bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-lg animate-pulse"
                      style={{
                        letterSpacing: '0.03em',
                        animationDuration: '2s'
                      }}>
                  Book Your Free Mentorship Session Today!
                </span>
              </h2>
              <p className="text-blue-100 text-xs font-bold flex items-center gap-1">
                <span className="text-indigo-300">✨</span> One Conversation Can Change Your Journey!
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-1.5 ml-3">
              <div className="group relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-blue-900 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 border border-yellow-300/30">
                <span className="relative z-10 flex items-center gap-1">
                  Book Now
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Second Content - Duplicate */}
          <div className="flex items-center gap-3 px-4 mr-8 flex-shrink-0">
            {/* Rotating Circle Container */}
           

            {/* Text Content */}
            <div className="text-left">
              {/* <div className="flex items-center gap-2 mb-1">
                <p className="text-blue-200 text-xs tracking-widest font-bold uppercase flex items-center gap-1">
                  <span>🎯</span> Free Session
                </p>
                <div className="hidden sm:block w-px h-3 bg-blue-300/40"></div>
                <div className="hidden sm:flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wide uppercase text-blue-200">LIMITED TIME</span>
                </div>
              </div> */}
              <h2 className="text-sm md:text-base lg:text-lg font-bold mb-0.5">
                <span className="bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-lg animate-pulse"
                      style={{
                        letterSpacing: '0.03em',
                        animationDuration: '2s'
                      }}>
                  Book Your Free Mentorship Session Today!
                </span>
              </h2>
              <p className="text-blue-100 text-xs font-bold flex items-center gap-1">
                <span className="text-indigo-300">✨</span> One Conversation Can Change Your Journey!
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-1.5 ml-3">
              <div className="group relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-blue-900 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 border border-yellow-300/30">
                <span className="relative z-10 flex items-center gap-1">
                  Book Now
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Third Content - Duplicate */}
          <div className="flex items-center gap-3 px-4 mr-8 flex-shrink-0">
            {/* Rotating Circle Container */}
            

            {/* Text Content */}
            <div className="text-left">
              {/* <div className="flex items-center gap-2 mb-1">
                <p className="text-blue-200 text-xs tracking-widest font-bold uppercase flex items-center gap-1">
                  <span>🎯</span> Free Session
                </p>
                <div className="hidden sm:block w-px h-3 bg-blue-300/40"></div>
                <div className="hidden sm:flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wide uppercase text-blue-200">LIMITED TIME</span>
                </div>
              </div> */}
              <h2 className="text-sm md:text-base lg:text-lg font-bold mb-0.5">
                <span className="bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-lg animate-pulse"
                      style={{
                        letterSpacing: '0.03em',
                        animationDuration: '2s'
                      }}>
                  Book Your Free Mentorship Session Today!
                </span>
              </h2>
              <p className="text-blue-100 text-xs font-bold flex items-center gap-1">
                <span className="text-indigo-300">✨</span> One Conversation Can Change Your Journey!
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-1.5 ml-3">
              <div className="group relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-blue-900 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 border border-yellow-300/30">
                <span className="relative z-10 flex items-center gap-1">
                  Book Now
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Fourth Content - Duplicate for seamless loop */}
          <div className="flex items-center gap-3 px-4 mr-8 flex-shrink-0">
            {/* Text Content */}
            <div className="text-left">
              <h2 className="text-sm md:text-base lg:text-lg font-bold mb-0.5">
                <span className="bg-gradient-to-r from-blue-200 via-white to-indigo-200 bg-clip-text text-transparent drop-shadow-lg animate-pulse"
                      style={{
                        letterSpacing: '0.03em',
                        animationDuration: '2s'
                      }}>
                  Book Your Free Mentorship Session Today!
                </span>
              </h2>
              <p className="text-blue-100 text-xs font-bold flex items-center gap-1">
                <span className="text-indigo-300">✨</span> One Conversation Can Change Your Journey!
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-1.5 ml-3">
              <div className="group relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-blue-900 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/40 border border-yellow-300/30">
                <span className="relative z-10 flex items-center gap-1">
                  Book Now
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.12),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        <div className="absolute top-2 left-8 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-3 right-16 w-1.5 h-1.5 bg-indigo-300/60 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute bottom-3 left-1/4 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-1/2 right-8 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 right-1/3 w-1.5 h-1.5 bg-indigo-300/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-3 left-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Close Button */}
      {/* <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 md:top-3 md:right-3 text-white/70 hover:text-white transition-colors duration-200 p-1"
        aria-label="Close banner"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button> */}
    </div>
  );
};

export default MentorshipBanner;
