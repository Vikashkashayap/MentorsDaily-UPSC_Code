import SectionHeading from '../../../components/ui/SectionHeading';

const features = [
  {
    title: 'Personalised Learning',
    description: 'Get custom-tailored learning plans that match your unique learning style and goals.',
    gradient: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/30',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    premium: false,
  },
  {
    title: 'Strategic Guidance',
    description: 'Learn from qualified and experienced mentors committed to your long term goals.',
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/30',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    premium: true,
  },
  {
    title: 'Master Consistency',
    description: 'Stay disciplined and on track through performance tracking and personalised strategies.',
    gradient: 'from-purple-500 to-pink-600',
    shadow: 'shadow-purple-500/30',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    premium: false,
  },
  {
    title: 'Proven Success',
    description: "Beat the pressure with India's only personalised test and answer writing series.",
    gradient: 'from-orange-500 to-red-600',
    shadow: 'shadow-orange-500/30',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    premium: true,
  },
];

const WhyMentorsDaily = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Premium Features"
          title="Why Choose"
          highlight="MentorsDaily?"
          subtitle="We combine expert mentorship with personalized strategies to help you achieve your UPSC dreams"
        />

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative flex flex-col text-center p-6 pt-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                feature.premium
                  ? 'bg-gradient-to-b from-blue-50/80 to-white border-2 border-blue-100 hover:border-blue-200 shadow-md hover:shadow-lg'
                  : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {feature.premium && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-block bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                    Premium
                  </span>
                </div>
              )}

              <div className="flex justify-center mb-5">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMentorsDaily;
