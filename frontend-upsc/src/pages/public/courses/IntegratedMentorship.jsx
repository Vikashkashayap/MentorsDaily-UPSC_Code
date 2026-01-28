import React, { useState } from "react";
import Form from "../components/Form";

// Prelims Content Component
function PrelimsContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/prelims.png"
          alt="Prelims Features"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

// Mains Content Component
function MainsContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/mains.png"
          alt="Mains Features"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

// Interview Content Component
function InterviewContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/interview.png"
          alt="Interview Features"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

// Mentorship Content Component
function MentorshipContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/mentorships.png"
          alt="Mentorship Features"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export default function IMPPage() {
  const [activeTab, setActiveTab] = useState("prelims");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (light background with form) */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 py-12 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Top Heading Only */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a3da7] leading-tight">
              MentorsDaily's Integrated Mentorship Program (IMP)[2026-27]
            </h1>
          </div>

          {/* Below: content + form */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            {/* Left: Copy */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-[#1a3da7] mb-2">
                The IMP Program by MentorsDaily
              </h3>
              <p className="text-base md:text-lg font-semibold mb-4">
                <span className="text-red-600">
                  24 Months | Integrated Mentorship Program | Designed to Crack
                  UPSC CSE 2026
                </span>
              </p>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  When we started building{" "}
                  <strong>IMP – the Integrated Mentorship Program</strong>, we
                  weren’t chasing trends. We were listening to students.
                </p>
                <p>
                  In a world full of mass-produced coaching and templated plans,
                  we saw something missing: <strong>real understanding</strong>.
                  Each student learns differently. Each one carries their own
                  pace, fears, and strengths.
                </p>
                <p>
                  IMP was born out of the belief that UPSC preparation should be
                  as personal as the dream itself. We don’t offer shortcuts. We
                  offer handholding. Like a child learning to walk—supported,
                  understood, and never rushed.
                </p>
                <p className="font-semibold text-gray-800">
                  This isn’t just mentorship.{" "}
                  <em>
                    It’s your journey, your way—with someone truly walking
                    beside you.
                  </em>
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className=" p-0 sm:p-2">
              <Form />
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Image Section (below Hero) */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-0 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-[#1a3da7] mb-6">
            What’s really standing between you and your best attempt?
          </h2>
          <img
            src="/images/best-attemp.png"
            alt="What's really standing between you and your best attempt?"
            className="w-full h-auto mx-auto rounded-none sm:rounded-xl shadow-none sm:shadow-lg max-w-none md:max-w-5xl"
          />
        </div>
      </section>

      {/* IMP Program Structure Tabs */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            What is included in the IMP Program?
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center bg-gray-100 rounded-lg p-1 gap-2">
              {[
                { id: "prelims", label: "Prelims" },
                { id: "mains", label: "Mains" },
                { id: "interview", label: "Interview" },
                { id: "mentorship", label: "Mentorship" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px] flex justify-center">
            {activeTab === "prelims" && <PrelimsContent />}
            {activeTab === "mains" && <MainsContent />}
            {activeTab === "interview" && <InterviewContent />}
            {activeTab === "mentorship" && <MentorshipContent />}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get Started with Learning!
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Take the first step toward your UPSC Dreams with expert-led courses
            and personalized mentorship.
          </p>
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get the Course
          </button>
        </div>
      </section>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <Form onClose={() => setShowRegistrationForm(false)} />
      )}
    </div>
  );
}
