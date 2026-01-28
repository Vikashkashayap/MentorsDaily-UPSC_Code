import { Link } from 'react-router-dom';


const faqs = [
  {
    q: 'What makes MentorsDaily different from other UPSC platforms?',
    a: 'We blend structured mentorship with emotional support, personalized planning, and real human feedback — going far beyond conventional coaching.'
  },
  {
    q: 'How does the Mentorship Program work?',
    a: "Once enrolled, you're assigned a personal mentor who monitors your progress, plans weekly goals, evaluates your answers, and provides one-on-one guidance via calls and chats."
  },
  {
    q: 'Is this program suitable for working professionals or beginners?',
    a: "Absolutely! We create personalized study plans based on your daily schedule, whether you're a full-time aspirant or juggling work with prep."
  },
  {
    q: 'What if I need emotional support or motivation during prep?',
    a: 'UPSC prep is not just academic — it is emotional too. Our mentors and advisors are trained to provide support, motivation, and counseling whenever you feel stuck or overwhelmed.'
  },
  {
    q: 'Is there any demo or trial available?',
    a: 'You can book a free mentorship call to understand how our programs work and if they align with your needs before enrolling.'
  },
  {
    q: 'How often do I receive feedback on my answers?',
    a: 'In our Copy Evaluation Program and Daily Answer Writing, you receive mentor-signed feedback within 48–72 working hours (for 1–5 questions). Full-length tests may take 5–7 days.'
  }
];

const FaqItem = ({ item, index }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-3">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mt-1">
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-snug mb-3">
              {item.q}
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">{item.a}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <section id="faq" className="w-full max-w-7xl mx-auto px-2 py-16 md:py-24 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Clear answers to help you decide faster. If you still have questions, book a
          free mentorship call — we are happy to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {faqs.map((item, idx) => (
          <FaqItem key={idx} item={item} index={idx} />
        ))}
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative mt-20">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 shadow-xl p-12 text-center transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Still have{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                questions?
              </span>
            </h3>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Get personalized answers from our mentors in a free one-on-one session.
              We'll help you plan the right UPSC strategy for your preparation journey.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold text-xl px-12 py-5 shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              🚀 Book Your Free Mentorship Session
            </a>
          </div>
        </div>

        {/* Soft background glow */}
        <div className="absolute inset-0 -z-10 flex justify-center">
          <div className="w-[600px] h-[300px] bg-blue-500/10 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
