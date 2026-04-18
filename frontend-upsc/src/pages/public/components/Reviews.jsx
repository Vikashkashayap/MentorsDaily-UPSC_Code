const testimonials = [

  {
    name: "Shiva Prasad",
    badge: "IMP 2026",
    location: "Bangalore",
    initials: "SP",
    text: "\"Before enrolling in Mentors Daily I thought I was in right direction and path, but they made me understand that I was in right path and in wrong direction. It's the place where aspirants are created by them rather than making...\"",
    rating: 5,
  },
  {
    name: "Pawan Singh",
    badge: "IMP 2027",
    location: "Jaipur",
    initials: "PS",
    text: "\"Mentors Daily is an an excellent platform for learning and guidance. They told me from time to time what to study and how to study and they are always ready to solve the doubts.\"",
    rating: 5,
  },
  {
    name: "Avira Banerjee",
    badge: "IMP 2028",
    location: "SRCC, DU",
    initials: "AB",
    text: "\"It’s just been a month that I’ve started studying here, and the best thing about the institute is the way the teachers emphasis on conceptual clarity and make the topics very easy to understand.\"",
    rating: 5,
  },
  
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={i < count ? "#F59E0B" : "#E5E7EB"}
        className="h-5 w-5"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Success Stories from Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Aspirants
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hear from successful candidates who achieved their goals with Mentors Daily
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="relative rounded-2xl p-6 shadow-md border border-blue-100 bg-white text-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 min-h-[420px]"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div className="relative z-10 pt-3 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl leading-none text-blue-100 font-serif">"</div>
                <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">
                  {t.badge}
                </span>
              </div>

              <Stars count={t.rating} />

              <p className="text-gray-600 text-lg italic leading-8 mt-3 mb-7">
                {t.text}
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-700 text-white text-sm font-semibold">
                  {t.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 leading-5">{t.name}</h3>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="text-amber-600">◉</span>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;