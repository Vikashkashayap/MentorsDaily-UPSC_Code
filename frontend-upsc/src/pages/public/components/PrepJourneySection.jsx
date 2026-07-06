import SectionHeading from "../../../components/ui/SectionHeading";

const STEPS = [
  {
    step: "01",
    title: "Book Free Consultation",
    description: "Talk to our mentors, understand your current level, and get a personalized roadmap — completely free.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: "02",
    title: "Choose Your Program",
    description: "Pick from Integrated Mentorship, Super 5 Batch, or specialized programs tailored to your target year.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "from-emerald-500 to-teal-600",
  },
  {
    step: "03",
    title: "Daily Guided Prep",
    description: "Follow your mentor's plan — daily targets, answer writing, tests, current affairs, and performance tracking.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: "from-purple-500 to-pink-600",
  },
  {
    step: "04",
    title: "Crack UPSC",
    description: "Stay consistent with mentor accountability, mock interviews, and strategic guidance until you succeed.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: "from-amber-500 to-orange-600",
  },
];

const BOOKING_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header";

const PrepJourneySection = () => (
  <section className="py-16 md:py-20 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="How It Works"
        title="Your UPSC Journey"
        highlight="with Us"
        subtitle="A proven 4-step path from confusion to clarity — designed for serious aspirants"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
        <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200" />

        {STEPS.map((item) => (
          <div key={item.step} className="relative group text-center">
            <div className="flex justify-center mb-5">
              <div
                className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-700 shadow-sm">
                  {item.step}
                </span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          Start with a Free Call
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default PrepJourneySection;
