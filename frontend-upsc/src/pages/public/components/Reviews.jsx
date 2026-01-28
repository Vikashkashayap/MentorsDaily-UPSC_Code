import { useState } from "react";

const testimonials = [
  {
    name: "Shivam Singh",
    text: "Focused. Disciplined. Effective. Mentors Daily helped me cut through distractions and focus on what truly matters. The regular planning sessions and timely nudges kept me on track without feeling overwhelmed. It's a simple yet powerful system that delivers results.",
    rating: 5,
  },
  {
    name: "Shweta Singh",
    text: "Balancing work and studies felt impossible—until I found Mentors Daily. Juggling a full-time job with exam prep left me exhausted and unfocused. I kept falling behind. Mentors Daily gave me structure, support, and most importantly—belief. The mentors understood my challenges, and the small daily wins brought back my confidence. It's more than a platform; it's a lifeline for working aspirants like me.",
    rating: 5,
  },
  {
    name: "Bulbul Singh",
    text: "Mentors Daily is a dedicated and reliable platform for IAS aspirants and students. Their personalized guidance, expert counselling, and consistent motivation make a real difference in shaping careers. A trustworthy mentor for every serious student!",
    rating: 5,
  },
  {
    name: "Nidhi Rajput",
    text: "Consistency made easy. Joining Mentors Daily brought structure to my preparation. The daily plans and motivating environment pushed me to study even on tough days. It's the kind of support every aspirant needs.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    highlight: true,
    text: "As a student of Mentors Daily I am going to write a whole paragraph in review because I loved the way mentor here is engaged with the students and have benefited me and my peers. Best platform for Personalized Mentorship especially for UPSC preparation.\n\nI have been in touch with the Govind sir (My mentor) who have always keep motivating me in the exam journey; the schedules that they provide is really designed keeping the need of the student which I think is the best part. I am able to give tests as per my schedule. And post test discussion is also very unique as the Mentor sit by side and highlights the shortcomings and suggest measures to improve it. Also the answer evaluation is best and the reviews given is Also best.\n\nThank-you Mentors Daily for supporting me in this journey of mine",
    rating: 5,
  },
  {
    name: "Ripu Daman Singh",
    text: "Mentors Daily has truly boosted my preparation. The structured routine, daily targets, and supportive mentors keep me consistent and focused. It's more than just a study group—it's a disciplined and motivating environment every serious aspirant should experience.",
    rating: 5,
  },
];

const Stars = ({ count = 5, highlighted = false }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={i < count ? (highlighted ? "#ffffff" : "#F59E0B") : (highlighted ? "rgba(255,255,255,0.3)" : "#E5E7EB")}
        className="h-5 w-5"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Reviews = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={t.name}
            className={`relative rounded-2xl p-6 shadow-lg border ${
              t.highlight
                ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white ring-2 ring-blue-500 ring-opacity-50"
                : "bg-white text-gray-800 border-gray-100"
            } overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
            onClick={() => toggleExpand(index)}
          >
            {t.highlight && (
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                  Featured
                </div>
              </div>
            )}

            <div className="absolute bottom-0 right-0 opacity-10">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="fill-current"
              >
                <path d="M25,25a30,30,0,1,0,50,50,30,30,0,1,0-50-50Z" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-start mb-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ${
                    t.highlight ? "bg-blue-500" : "bg-blue-100"
                  } mr-4 shadow-sm`}
                >
                  <span
                    className={`text-lg font-bold ${
                      t.highlight ? "text-white" : "text-blue-700"
                    }`}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      t.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t.name}
                  </h3>
                  <Stars count={t.rating} highlighted={t.highlight} />
                </div>
              </div>

              {expandedCard === index ? (
                <p
                  className={`text-sm leading-6 mb-4 whitespace-pre-line transition-all duration-300 ${
                    t.highlight ? "text-blue-50" : "text-gray-700"
                  }`}
                >
                  {t.text}
                </p>
              ) : (
                <p
                  className={`text-sm leading-6 mb-4 line-clamp-4 transition-all duration-300 ${
                    t.highlight ? "text-blue-50" : "text-gray-700"
                  }`}
                >
                  {t.text}
                </p>
              )}

              <div
                className={`text-xs font-medium ${
                  t.highlight ? "text-blue-200" : "text-gray-500"
                }`}
              >
                {expandedCard === index
                  ? "Click to collapse"
                  : "Click to read full review"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;