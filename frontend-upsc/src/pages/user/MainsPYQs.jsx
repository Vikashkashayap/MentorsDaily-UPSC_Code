import React from "react";

export default function MainsPYQs() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mains Previous Year Questions</h1>
          <p className="text-gray-600 mt-2">Practice with UPSC Mains questions from previous years</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Mains PYQs Coming Soon</h3>
          <p className="text-gray-600 mb-6">We're working on bringing you comprehensive Mains PYQs</p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}