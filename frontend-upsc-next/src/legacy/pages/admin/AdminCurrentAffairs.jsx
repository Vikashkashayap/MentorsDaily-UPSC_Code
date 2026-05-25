import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import CurrentAffairForm from "./CurrentAffairsPost";
import CurrentAffirsList from "./CurrentAffirsList";

export default function AdminCurrentAffairs() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-10 backdrop-blur-sm`}>
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Current Affairs Management</h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Create and manage current affairs posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "manage"
                ? isDark
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 text-white"
                : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manage Posts
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "create"
                ? isDark
                  ? "bg-green-600 text-white"
                  : "bg-green-600 text-white"
                : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Create Post
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "manage" && <CurrentAffirsList />}
        
        {activeTab === "create" && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border`}>
            <CurrentAffairForm />
          </div>
        )}
      </div>
    </div>
  );
}