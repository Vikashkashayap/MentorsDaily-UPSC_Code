import { useState, useEffect } from 'react';

const AIStudentDashboardBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const marqueeItems = [
    "🔹 AI Mains Copy Evaluation",
    "🔹 Prelims & Mains Analytics",
    "🔹 Smart Answer Writing Feedback",
    "🔹 24×7 AI Mentor Support",
    "🔹 Personalized UPSC Study Dashboard"
  ];

  if (!isVisible) return null;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 shadow-2xl shadow-blue-900/30 transition-all duration-700 ease-out transform ${
        isAnimated ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #1e40af 50%, #3730a3 75%, #581c87 100%)',
        boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25), 0 0 0 1px rgba(147, 51, 234, 0.1) inset'
      }}
      role="banner"
      aria-label="AI-Powered Student Dashboard Announcement"
    >
      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_40%)] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(99,102,241,0.1),transparent_40%)] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(147,51,234,0.08),transparent_50%)] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        {/* Additional geometric patterns */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(56,189,248,0.05)_0deg,rgba(139,92,246,0.03)_120deg,rgba(168,85,247,0.05)_240deg)] animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0">
        {/* Geometric particles */}
        <div className="absolute top-3 left-8 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-pulse shadow-lg shadow-cyan-400/30" style={{ animationDuration: '2s' }}></div>
        <div className="absolute top-6 right-16 w-1 h-1 bg-indigo-300/60 rounded-full animate-ping shadow-md shadow-indigo-300/40" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute bottom-4 left-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce shadow-lg shadow-blue-400/30" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 right-8 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse shadow-md shadow-purple-300/40"></div>

        {/* Star particles */}
        <div className="absolute top-4 left-1/3 text-cyan-300/80 text-xs animate-ping font-bold" style={{ animationDuration: '2.8s' }}>✨</div>
        <div className="absolute bottom-3 right-1/3 text-blue-300/70 text-xs animate-ping font-bold" style={{ animationDuration: '3.2s' }}>⭐</div>
        <div className="absolute top-2 right-1/4 text-indigo-300/60 text-xs animate-pulse font-bold" style={{ animationDuration: '4s' }}>✦</div>

        {/* Additional subtle effects */}
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse" style={{ animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-0.5 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-ping" style={{ animationDuration: '2.2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-2 md:py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">
          {/* Left side - Main content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Main heading */}
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-black mb-1 leading-tight">
              <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-xl animate-pulse"
                    style={{ animationDuration: '3s' }}>
                MentorsDaily brings AI-Powered UPSC Student Dashboard
              </span>
              <span className="inline-block ml-1 text-xl md:text-2xl lg:text-3xl animate-bounce" style={{ animationDuration: '2s' }}>🚀</span>
            </h1>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white text-xs font-bold uppercase tracking-wide shadow-lg shadow-orange-500/30 animate-pulse mb-1">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              Coming Soon
            </div>

            {/* Subheading */}
            <p className="text-slate-200 text-xs md:text-sm font-medium mb-2 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Smart copy evaluation • Personalized feedback • AI mentor guidance • Progress tracking
            </p>

            {/* CTA Button */}
            {/* <div className="flex justify-center lg:justify-start">
              <button
                onClick={() => {
                  // Scroll to courses section or handle dashboard navigation
                  document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative inline-flex items-center justify-center px-6 py-3 text-sm md:text-base font-bold text-slate-900 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/40 border-2 border-cyan-300/30 transform hover:-translate-y-0.5"
                aria-label="Explore AI-Powered Student Dashboard"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Dashboard
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div> */}
          </div>

          {/* Right side - Feature highlight */}
          <div className="flex-shrink-0 hidden lg:flex flex-col items-center text-center">
            <div className="text-3xl mb-1 animate-bounce" style={{ animationDuration: '2.5s' }}>🤖</div>
            <div className="text-cyan-200 font-semibold text-xs uppercase tracking-wide">AI-Powered</div>
            <div className="text-blue-200 font-medium text-xs">Smart Learning</div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative z-10 border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="overflow-hidden py-1.5">
          <div
            className="flex animate-marquee hover:pause-marquee whitespace-nowrap"
            style={{
              animation: 'marquee 20s linear infinite'
            }}
            onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
          >
            {/* Duplicate items for seamless loop */}
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={index}
                className="inline-block mx-3 text-cyan-200 font-medium text-xs whitespace-nowrap"
                aria-hidden={index >= marqueeItems.length ? 'true' : 'false'}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-800 via-slate-800/80 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-800 via-slate-800/80 to-transparent pointer-events-none"></div>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 md:top-4 md:right-4 text-slate-300/70 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-slate-700/30"
        aria-label="Close announcement banner"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Custom CSS for marquee animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0%); }
          }

          .animate-marquee {
            animation: marquee 25s linear infinite;
          }

          .pause-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
};

export default AIStudentDashboardBanner;
