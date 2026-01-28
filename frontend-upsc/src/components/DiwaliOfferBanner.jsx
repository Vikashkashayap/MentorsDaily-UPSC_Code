import { useState, useEffect } from 'react';

const DiwaliOfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-800 py-3 md:py-4 shadow-xl">
      {/* Animated Background Pattern - More Dynamic */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(249,115,22,0.12),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(217,70,239,0.1),transparent_50%)]"></div>
      </div>

      {/* Animated particles - More festive */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-10 w-2.5 h-2.5 bg-orange-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-20 w-2 h-2 bg-yellow-300/60 rounded-full animate-ping" style={{ animationDuration: '1.5s' }}></div>
        <div className="absolute bottom-6 left-1/4 w-2 h-2 bg-pink-400/50 rounded-full animate-bounce" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-1/3 w-2 h-2 bg-orange-300/50 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-6 left-1/3 w-1.5 h-1.5 bg-pink-300/50 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      </div>

      {/* Fireworks Decorations - More vibrant */}
      <div className="absolute top-2 left-4 md:left-8 animate-pulse">
        <svg width="38" height="38" viewBox="0 0 60 60" className="text-orange-400/70">
          <circle cx="30" cy="30" r="3" fill="currentColor" />
          <line x1="30" y1="30" x2="30" y2="10" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="45" y2="15" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="45" y2="45" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="30" y2="50" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="15" y2="45" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="15" y2="15" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="30" cy="10" r="2.5" fill="currentColor" />
          <circle cx="45" cy="15" r="2.5" fill="currentColor" />
          <circle cx="50" cy="30" r="2.5" fill="currentColor" />
          <circle cx="45" cy="45" r="2.5" fill="currentColor" />
          <circle cx="30" cy="50" r="2.5" fill="currentColor" />
          <circle cx="15" cy="45" r="2.5" fill="currentColor" />
          <circle cx="10" cy="30" r="2.5" fill="currentColor" />
          <circle cx="15" cy="15" r="2.5" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute top-2 right-4 md:right-8 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <svg width="38" height="38" viewBox="0 0 60 60" className="text-pink-400/60">
          <circle cx="30" cy="30" r="3" fill="currentColor" />
          <line x1="30" y1="30" x2="30" y2="10" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="45" y2="15" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="45" y2="45" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="30" y2="50" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="15" y2="45" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="10" y2="30" stroke="currentColor" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="15" y2="15" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="30" cy="10" r="2.5" fill="currentColor" />
          <circle cx="45" cy="15" r="2.5" fill="currentColor" />
          <circle cx="50" cy="30" r="2.5" fill="currentColor" />
          <circle cx="45" cy="45" r="2.5" fill="currentColor" />
          <circle cx="30" cy="50" r="2.5" fill="currentColor" />
          <circle cx="15" cy="45" r="2.5" fill="currentColor" />
          <circle cx="10" cy="30" r="2.5" fill="currentColor" />
          <circle cx="15" cy="15" r="2.5" fill="currentColor" />
        </svg>
      </div>

      {/* Additional scattered stars - More festive emojis */}
      <div className="absolute top-1/3 left-1/6 text-orange-300 text-sm animate-ping" style={{ animationDuration: '1.8s' }}>✨</div>
      <div className="absolute top-2/3 right-1/6 text-yellow-300 text-sm animate-ping" style={{ animationDuration: '2.2s' }}>🎆</div>
      <div className="absolute bottom-1/4 left-1/3 text-pink-300/70 text-xs animate-bounce" style={{ animationDuration: '2.8s' }}>✨</div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
          {/* Left side - Diya and Main Text */}
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            {/* Diya Icon - Bigger and more prominent */}
            <div className="flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 50 50" className="text-orange-400 animate-bounce" style={{ animationDuration: '2s' }}>
                <ellipse cx="25" cy="35" rx="20" ry="8" fill="currentColor" opacity="0.7" />
                <path d="M 15 35 Q 15 25 25 25 Q 35 25 35 35 Z" fill="currentColor" />
                <ellipse cx="25" cy="25" rx="10" ry="3" fill="#FB923C" />
                <path d="M 23 25 Q 23 15 25 10 Q 27 15 27 25 Z" fill="#F97316" opacity="0.9" />
                <ellipse cx="25" cy="10" rx="3" ry="5" fill="#FDE047" opacity="0.95" />
                <path d="M 24 8 Q 23 5 25 2 Q 27 5 26 8 Z" fill="#FEF9C3" opacity="0.9" />
              </svg>
            </div>

            {/* Text Content */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-orange-200 text-xs tracking-widest font-bold uppercase flex items-center gap-1">
                  <span>🪔</span> Happy Diwali Aspirants..
                </p>
                <div className="hidden md:block w-px h-3 bg-orange-300/40"></div>
                <div className="hidden md:flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wide uppercase text-orange-200">LIMITED TIME</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-1">
                <span className="bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-xl animate-pulse" 
                      style={{ 
                        letterSpacing: '0.08em',
                        animationDuration: '2s'
                      }}>
                   DIWALI OFFER
                </span>
              </h2>
              <p className="text-orange-100 text-xs md:text-sm font-bold flex items-center gap-1">
                <span className="text-yellow-300">🎉</span> UPTO 25% OFF ON ALL COURSES
              </p>
            </div>
          </div>

          {/* Right side - CTA Button */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => {
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-black text-purple-900 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 border-2 border-yellow-300/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Grab Offer Now 
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <div className="hidden lg:flex flex-col items-start text-xs leading-tight">
              <span className="text-orange-200 font-bold animate-pulse flex items-center gap-1">
                ✨ Don't Miss Out!
              </span>
              <span className="text-yellow-300 font-semibold">Limited Period</span>
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
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

export default DiwaliOfferBanner;

