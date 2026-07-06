import SectionHeading from '../../../components/ui/SectionHeading';

const testimonials = [
  {
    name: 'Shiva Prasad',
    badge: 'IMP 2026',
    location: 'Bangalore',
    initials: 'SP',
    text: 'Before enrolling in Mentors Daily I thought I was in right direction and path, but they made me understand that I was in right path and in wrong direction. It\'s the place where aspirants are created by them rather than making...',
    rating: 5,
  },
  {
    name: 'Pawan Singh',
    badge: 'IMP 2027',
    location: 'Jaipur',
    initials: 'PS',
    text: 'Mentors Daily is an excellent platform for learning and guidance. They told me from time to time what to study and how to study and they are always ready to solve the doubts.',
    rating: 5,
  },
  {
    name: 'Avira Banerjee',
    badge: 'IMP 2028',
    location: 'SRCC, DU',
    initials: 'AB',
    text: 'It\'s just been a month that I\'ve started studying here, and the best thing about the institute is the way the teachers emphasis on conceptual clarity and make the topics very easy to understand.',
    rating: 5,
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        fill={i < count ? '#F59E0B' : '#E5E7EB'}
        className="h-4 w-4"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="Success Stories from Our"
          highlight="Aspirants"
          subtitle="Hear from successful candidates who achieved their goals with Mentors Daily"
        />

        <div className="flex flex-wrap justify-center gap-6 mb-12 -mt-4">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '1200+', label: 'Happy Aspirants' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-5 py-3 bg-amber-50 border border-amber-100 rounded-xl"
            >
              <div className="text-2xl font-bold text-amber-600">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="relative flex flex-col rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600" />

              <div className="flex items-center justify-between mb-4 pt-2">
                <Stars count={t.rating} />
                <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 text-xs font-bold">
                  {t.badge}
                </span>
              </div>

              <blockquote className="text-gray-600 text-[15px] leading-relaxed flex-1 mb-6">
                <span className="text-3xl text-blue-200 font-serif leading-none mr-1">"</span>
                {t.text}
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-bold shadow-md">
                  {t.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
