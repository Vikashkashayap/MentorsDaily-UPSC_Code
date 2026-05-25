import React from "react";

export default function PrelimsPYQs() {
  const pyqs = [
    {
      id: 1,
      year: 2023,
      subject: "General Studies",
      questions: 100,
      duration: "120 minutes",
      difficulty: "Medium"
    },
    {
      id: 2,
      year: 2022,
      subject: "General Studies",
      questions: 100,
      duration: "120 minutes",
      difficulty: "Hard"
    },
    {
      id: 3,
      year: 2021,
      subject: "General Studies",
      questions: 100,
      duration: "120 minutes",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Prelims Previous Year Questions</h1>
          <p className="text-gray-600 mt-2">Practice with actual UPSC Prelims questions from previous years</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pyqs.map((pyq) => (
            <div key={pyq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">UPSC Prelims {pyq.year}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  pyq.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  pyq.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {pyq.difficulty}
                </span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{pyq.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{pyq.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{pyq.duration}</span>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Start Practice
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}