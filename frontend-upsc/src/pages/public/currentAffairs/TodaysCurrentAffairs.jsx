import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slugify, decodeHtmlEntities, stripHTML } from "../../../utils/seoUtils";
import { fetchCurrentAffairs } from "../../../api/coreService";
import { formatDate } from "../../../utils/dateUtils";

const TodaysCurrentAffairs = () => {
  const navigate = useNavigate();
  const [todaysPosts, setTodaysPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Helper function to check if a date is today
  const isDateToday = (someDate) => {
    if (!someDate) return false;
    const today = new Date();
    const dateToCompare = new Date(someDate);
    return (
      dateToCompare.getDate() === today.getDate() &&
      dateToCompare.getMonth() === today.getMonth() &&
      dateToCompare.getFullYear() === today.getFullYear()
    );
  };

  const fetchTodaysPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 4);

      const toDate = endDate.toISOString().split("T")[0];
      const fromDate = startDate.toISOString().split("T")[0];

      const response = await fetchCurrentAffairs({ from: fromDate, to: toDate });
      const affairsInRange = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      const recentPosts = affairsInRange
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setTodaysPosts(recentPosts);

    } catch (err)
    {
      setError("Failed to load recent current affairs");
      console.error("Error fetching recent posts:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTodaysPosts();
  }, []);

  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    fetchTodaysPosts(true);
  };

  const compactHtml = (html = "") => {
    try {
      return html
        .replace(/<p(?![^>]*style=)/gi, '<p style="margin:4px 0; line-height:1.45"')
        .replace(/<ul(?![^>]*style=)/gi, '<ul style="margin:8px 0; padding-left:20px; line-height:1.5; list-style-type:disc"')
        .replace(/<ol(?![^>]*style=)/gi, '<ol style="margin:8px 0; padding-left:20px; line-height:1.5; list-style-type:decimal"')
        .replace(/<li(?![^>]*style=)/gi, '<li style="margin:4px 0; line-height:1.5; display:list-item"')
        .replace(/<table(?![^>]*style=)/gi, '<table style="border-collapse:collapse; width:100%; margin:16px 0; border:1px solid #ddd"')
        .replace(/<tbody(?![^>]*style=)/gi, '<tbody')
        .replace(/<tr(?![^>]*style=)/gi, '<tr')
        .replace(/<th(?![^>]*style=)/gi, '<th style="border:1px solid #ddd; padding:8px 12px; background-color:#f2f2f2; font-weight:bold; text-align:left"')
        .replace(/<td(?![^>]*style=)/gi, '<td style="border:1px solid #ddd; padding:8px 12px"');
    } catch {
      return html;
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Today's Current Affairs
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="bg-blue-100 h-40 w-full"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-blue-100 rounded w-3/4"></div>
                  <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                  <div className="h-3 bg-blue-100 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 bg-red-50 py-6 rounded-xl">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (todaysPosts.length === 0) {
    return (
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Today's Current Affairs
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="text-center text-gray-600 bg-white py-8 rounded-xl shadow-sm">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-lg font-medium mb-2">No recent current affairs available</p>
            <p className="text-sm text-gray-500">Check back later for new updates</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Today's Current Affairs
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200 disabled:opacity-50"
                title="Refresh posts"
              >
                <svg
                  className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {todaysPosts.map((post) => (
            <article
              key={post._id}
              className="w-full md:max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              {post.thumbnailUrl && (
                <div className="relative cursor-pointer" onClick={() => navigate(`/currentAffairs/${slugify(post.title || "")}`)}>
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  {post.paperName && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow">
                      {decodeHtmlEntities(stripHTML(post.paperName))}
                    </span>
                  )}
                </div>
              )}

              <div className="p-5">
                <h3
                  className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-700 cursor-pointer prose max-w-none"
                  onClick={() => navigate(`/currentAffairs/${slugify(post.title || "")}`)}
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />

                {post.subject && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {decodeHtmlEntities(stripHTML(post.subject))
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((sub, idx) => (
                        <span
                          key={`${post._id}-sub-${idx}`}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md"
                        >
                          📖 {sub}
                        </span>
                      ))}
                  </div>
                )}

                {post.description && (
                  <div
                    className="text-sm text-gray-600 mb-3 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: compactHtml(post.description)
                    }}
                  />
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <span className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {formatDate(post.date)}
                    </span>
                  </span>

                  {isDateToday(post.date) && (
                    <span className="text-blue-600 font-medium">
                      Today
                    </span>
                  )}

                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/currentAffairs')}
            className="relative z-10 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Current Affairs
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysCurrentAffairs;