import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFreeResources, getAvailableCategories, getDifficultyLevels, getCategorySubcategories, getSubcategoriesForCategory } from '../../api/freeResourceService';

export default function FreeStudyMaterials() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [level, setLevel] = useState('');

  const categories = ['All', ...getAvailableCategories()];
  const levels = ['All', ...getDifficultyLevels()];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResources();
    }, searchQuery ? 500 : 0);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, activeSubcategory, level]);

  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategory('');
  }, [activeCategory]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (activeCategory && activeCategory !== 'All') filters.category = activeCategory;
      if (activeSubcategory && activeSubcategory !== 'All') filters.subcategory = activeSubcategory;
      if (level && level !== 'All') filters.difficulty = level;
      if (searchQuery.trim()) filters.search = searchQuery.trim();

      const response = await getAllFreeResources(filters);
      const resourcesData = response?.data?.data || response?.data || [];
      setResources(Array.isArray(resourcesData) ? resourcesData : []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResources([]);
      
    } finally {
      setLoading(false);
    }
  };

  const handleView = (resource) => {
    navigate(`/free-resource/${resource._id}`);
  };

  const handleDownload = (resource) => {
    if (resource.fileId?._id) {
      const downloadUrl = `${import.meta.env.VITE_API_URL}/api/v1/download/${resource.fileId._id}`;
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(700px_300px_at_20%_-20%,rgba(59,130,246,0.15),transparent),radial-gradient(700px_300px_at_80%_-20%,rgba(16,185,129,0.15),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                Free UPSC Study Materials
              </h1>
              <p className="mt-2 text-slate-600 max-w-2xl">
                Curated resources from our Mentorship program — concise, exam-oriented and
                updated. Filter by category, level, or search directly.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 text-sm text-slate-600">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  100% Free
                </span>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                  Mentorship Quality
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, PYQs, NCERTs, topics..."
                className="w-full md:w-[640px] rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 py-3 pl-11 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === 'All' ? '' : cat)}
              className={
                'px-3 py-1.5 rounded-full text-sm border transition-colors ' +
                ((cat === 'All' && !activeCategory) || activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300')
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory && getSubcategoriesForCategory(activeCategory).length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 md:gap-3">
            <span className="text-sm text-slate-600 font-medium self-center">Subcategory:</span>
            <button
              onClick={() => setActiveSubcategory('')}
              className={
                'px-3 py-1.5 rounded-full text-sm border transition-colors ' +
                (!activeSubcategory
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300')
              }
            >
              All
            </button>
            {getSubcategoriesForCategory(activeCategory).map((subcat) => (
              <button
                key={subcat}
                onClick={() => setActiveSubcategory(subcat)}
                className={
                  'px-3 py-1.5 rounded-full text-sm border transition-colors ' +
                  (activeSubcategory === subcat
                    ? 'bg-green-600 text-white border-green-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300')
                }
              >
                {subcat}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((l) => (
              <option key={l} value={l === 'All' ? '' : l}>
                {l}
              </option>
            ))}
          </select>
          <div className="text-xs text-slate-500 ml-auto">
            {loading ? 'Loading...' : `Showing ${resources.length} resources`}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-6 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="p-8 border border-dashed border-slate-200 rounded-xl bg-white text-center text-slate-600">
            No materials match your filters. Try clearing filters or changing the search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((resource) => (
              <article
                key={resource._id}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 
                    className="text-lg font-semibold text-slate-900 leading-snug prose max-w-none prose-sm"
                    dangerouslySetInnerHTML={{ __html: resource.title }}
                  />
                  <span className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border ${
                    resource.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                    resource.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    {resource.difficulty}
                  </span>
                </div>
                <p 
                  className="mt-2 text-sm text-slate-600 min-h-[44px] line-clamp-2 prose max-w-none prose-sm"
                  dangerouslySetInnerHTML={{ __html: resource.description }}
                />
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="px-2 py-1 text-xs rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    {resource.category || (resource.categories && resource.categories[0]) || 'N/A'}
                  </span>
                  {resource.subcategory && (
                    <span className="px-2 py-1 text-xs rounded-md bg-green-50 text-green-700 border border-green-100">
                      {resource.subcategory}
                    </span>
                  )}
                  {resource.fileSize && (
                    <span className="px-2 py-1 text-xs rounded-md bg-slate-50 text-slate-700 border border-slate-100">
                      {resource.fileSize}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleView(resource)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.642 0 8.578 2.51 9.964 6.678.07.214.07.43 0 .644C20.578 16.49 16.64 19 12 19c-4.642 0-8.578-2.51-9.964-6.678zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5m0 0l5-5m-5 5V3M5 21h14" />
                    </svg>
                    Download
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Preparation Blogs CTA */}
        <div className="mt-10">
          <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                  📚 Preparation Blogs & Expert Tips
                </h3>
                <p className="text-slate-700 mt-1">
                  Read expert insights, strategies, and preparation tips from successful UPSC aspirants.
                </p>
              </div>
              <a
                href="/preparation-blogs" 
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
              >
                Read Blogs
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-emerald-50 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                  Want guided prep with accountability?
                </h3>
                <p className="text-slate-700 mt-1">
                  Explore Mentors Daily Mentorship – structured plans, answer reviews, and weekly check-ins.
                </p>
              </div>
              <a
                href="/integrated-mentorship" 
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              >
                Know More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
