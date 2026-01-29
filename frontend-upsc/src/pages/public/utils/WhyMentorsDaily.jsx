const features = [
  {
    title: "Personalised Learning",
    description: "Get custom-tailored learning plans that match your unique learning style and goals.",
    icon: (
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    ),
    premium: false,
  },
  {
    title: "Strategic Guidance",
    description: "Learn from qualified and experienced mentors committed to your long term goals.",
    icon: (
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    ),
    premium: true,
  },
  {
    title: "Master Consistency",
    description: "Stay disciplined and on track through performance tracking and personalised strategies.",
    icon: (
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
    premium: false,
  },
  {
    title: "Proven Success",
    description: "Beat the pressure with India's only personalised test and answer writing series.",
    icon: (
      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    ),
    premium: true,
  },
];

const WhyMentorsDaily = () => {
  return (
    <section className="w-full px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 md:py-28 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/30">
              PREMIUM FEATURES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MentorsDaily?
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"></span>
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We combine expert mentorship with personalized strategies to help you achieve your UPSC dreams
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={`group relative text-center p-8 rounded-3xl transition-all duration-500 transform hover:-translate-y-3 ${
                feature.premium 
                  ? 'bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 border-2 border-blue-200/50 hover:border-blue-400 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20' 
                  : 'bg-white border border-gray-200/80 hover:border-gray-300 shadow-lg hover:shadow-2xl'
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Premium Badge */}
              {feature.premium && (
                <div className="absolute -top-3 right-4 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full blur-sm opacity-75 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      PREMIUM
                    </div>
                  </div>
                </div>
              )}

              {/* Glow effect on hover for premium */}
              {feature.premium && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/0 via-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:via-blue-400/5 group-hover:to-indigo-400/10 transition-all duration-500 pointer-events-none"></div>
              )}

              <div className="flex justify-center mb-6 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
              </div>
              
              <h3 className={`text-xl md:text-2xl font-bold mb-4 relative z-10 transition-colors duration-300 ${
                feature.premium 
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent' 
                  : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-sm md:text-base relative z-10">
                {feature.description}
              </p>

              {/* Decorative corner accent for premium */}
              {feature.premium && (
                <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden rounded-tl-3xl">
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-t-blue-500/20 border-r-[20px] border-r-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default WhyMentorsDaily;