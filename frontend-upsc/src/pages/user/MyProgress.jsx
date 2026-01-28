import React from "react";

export default function MyProgress() {
  const progressData = {
    prelims: { completed: 65, total: 100 },
    mains: { completed: 45, total: 100 },
    currentAffairs: { completed: 80, total: 100 }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
          <p className="text-gray-600 mt-2">Track your learning journey and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prelims Preparation</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{progressData.prelims.completed}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressData.prelims.completed}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {progressData.prelims.completed} out of {progressData.prelims.total} topics completed
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mains Preparation</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{progressData.mains.completed}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressData.mains.completed}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {progressData.mains.completed} out of {progressData.mains.total} topics completed
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Affairs</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{progressData.currentAffairs.completed}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressData.currentAffairs.completed}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {progressData.currentAffairs.completed} out of {progressData.currentAffairs.total} topics completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}