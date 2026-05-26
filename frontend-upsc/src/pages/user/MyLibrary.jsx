import React from "react";

export default function MyLibrary() {
  const libraryItems = [
    {
      id: 1,
      title: "Indian Polity - Laxmikant",
      type: "Book",
      subject: "Polity",
      progress: 75,
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "History of Modern India",
      type: "PDF",
      subject: "History",
      progress: 60,
      lastAccessed: "1 week ago"
    },
    {
      id: 3,
      title: "Economic Survey 2024",
      type: "Document",
      subject: "Economy",
      progress: 30,
      lastAccessed: "3 days ago"
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
          <p className="text-gray-600 mt-2">Your personal collection of study materials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  {item.type}
                </span>
                <span className="text-sm text-gray-500">{item.lastAccessed}</span>
              </div>
              <h3 
                className="text-lg font-semibold text-gray-900 mb-2 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p className="text-gray-600 text-sm mb-4">Subject: {item.subject}</p>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Continue Reading
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}