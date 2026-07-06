import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { slugify, decodeHtmlEntities, stripHTML } from "../../../utils/seoUtils";
import { fetchCurrentAffairs } from "../../../api/coreService";
import { formatDate } from "../../../utils/dateUtils";
import SectionHeading from "../../../components/ui/SectionHeading";

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
    <section className="w-full py-14 md:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <SectionHeading
            badge="Stay Updated"
            title="Today's"
            highlight="Current Affairs"
            subtitle="Curated daily news analysis for UPSC Prelims & Mains — GS Papers covered"
          />
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="absolute top-0 right-0 p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors disabled:opacity-50 border border-blue-100"
            title="Refresh posts"
            aria-label="Refresh current affairs"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todaysPosts.map((post) => (
            <article
              key={post._id}
              className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100 hover:-translate-y-1"
            >
              {post.thumbnailUrl && (
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/current-affairs/${slugify(post.title || "")}`)}
                >
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {post.paperName && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded-lg shadow">
                      {decodeHtmlEntities(stripHTML(post.paperName))}
                    </span>
                  )}
                  {isDateToday(post.date) && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold bg-blue-600 text-white rounded-lg">
                      Today
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-col flex-1 p-5">
                <h3
                  className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 cursor-pointer transition-colors"
                  onClick={() => navigate(`/current-affairs/${slugify(post.title || "")}`)}
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />

                {post.subject && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {decodeHtmlEntities(stripHTML(post.subject))
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((sub, idx) => (
                        <span
                          key={`${post._id}-sub-${idx}`}
                          className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                        >
                          {sub}
                        </span>
                      ))}
                  </div>
                )}

                {post.description && (
                  <div
                    className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1"
                    dangerouslySetInnerHTML={{ __html: compactHtml(post.description) }}
                  />
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.date)}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    Read more →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/current-affairs')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Current Affairs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodaysCurrentAffairs;