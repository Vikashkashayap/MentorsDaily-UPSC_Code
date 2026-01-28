import React from "react";

export default function MyTests() {
  const tests = [
    {
      id: 1,
      name: "Mock Test 1 - General Studies",
      subject: "General Studies",
      score: 78,
      totalQuestions: 100,
      completedAt: "2024-01-15",
      status: "Completed"
    },
    {
      id: 2,
      name: "Mock Test 2 - Current Affairs",
      subject: "Current Affairs",
      score: 85,
      totalQuestions: 50,
      completedAt: "2024-01-14",
      status: "Completed"
    },
    {
      id: 3,
      name: "Mock Test 3 - History",
      subject: "History",
      score: null,
      totalQuestions: 75,
      completedAt: null,
      status: "In Progress"
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tests</h1>
          <p className="text-gray-600 mt-2">Track your test performance and progress</p>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                  <p className="text-gray-600">{test.subject} • {test.totalQuestions} questions</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded ${
                  test.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  test.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {test.status}
                </span>
              </div>

              {test.score !== null && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Score</span>
                    <span>{test.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${test.score}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {test.completedAt ? `Completed on ${test.completedAt}` : 'Not completed'}
                </span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {test.status === 'Completed' ? 'Review' : 'Continue'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}