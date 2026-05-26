import React from 'react';

export default function BudgetSurvey() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Budget & Survey</h1>
          <p className="text-gray-600">Comprehensive budget analysis and economic survey resources</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Coming Soon</h2>
          <p className="text-blue-600">We're working hard to bring you detailed budget analysis, economic survey insights, and comprehensive financial data. Stay tuned for updates!</p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-500 mb-4">Get notified when we launch</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Notify Me
            </button>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            This page will feature Union Budget analysis, Economic Survey highlights, and key financial insights for UPSC preparation.
          </p>
        </div>
      </div>
    </div>
  );
}
