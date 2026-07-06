import { useState } from 'react';
import SectionHeading from '../../../components/ui/SectionHeading';

const BOOKING_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header';

const faqs = [
  {
    q: 'What makes MentorsDaily different from other UPSC platforms?',
    a: 'We blend structured mentorship with emotional support, personalized planning, and real human feedback — going far beyond conventional coaching.',
  },
  {
    q: 'How does the Mentorship Program work?',
    a: "Once enrolled, you're assigned a personal mentor who monitors your progress, plans weekly goals, evaluates your answers, and provides one-on-one guidance via calls and chats.",
  },
  {
    q: 'Is this program suitable for working professionals or beginners?',
    a: "Absolutely! We create personalized study plans based on your daily schedule, whether you're a full-time aspirant or juggling work with prep.",
  },
  {
    q: 'What if I need emotional support or motivation during prep?',
    a: 'UPSC prep is not just academic — it is emotional too. Our mentors and advisors are trained to provide support, motivation, and counseling whenever you feel stuck or overwhelmed.',
  },
  {
    q: 'Is there any demo or trial available?',
    a: 'You can book a free mentorship call to understand how our programs work and if they align with your needs before enrolling.',
  },
  {
    q: 'How often do I receive feedback on my answers?',
    a: 'In our Copy Evaluation Program and Daily Answer Writing, you receive mentor-signed feedback within 48–72 working hours (for 1–5 questions). Full-length tests may take 5–7 days.',
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section id="faq" className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Got Questions?"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Clear answers to help you decide faster. If you still have questions, book a free mentorship call — we are happy to help."
        />

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition-colors duration-200 ${
                  isOpen
                    ? 'border-blue-200 bg-white shadow-md shadow-blue-500/5'
                    : 'border-gray-200 bg-white hover:border-blue-100'
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-start gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mt-0.5 text-white text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="flex-1 min-w-0 font-semibold text-gray-900 text-base md:text-lg leading-snug pr-2">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? 'bg-blue-600 text-white rotate-180'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-5 pb-5 pl-14 sm:pl-[4.25rem] animate-fade-in"
                  >
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base border-l-2 border-blue-300 pl-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-14">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-lg p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Still have{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                questions?
              </span>
            </h3>
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-lg mx-auto">
              Get personalized answers from our mentors in a free one-on-one session.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg px-8 py-4 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Your Free Mentorship Session
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
