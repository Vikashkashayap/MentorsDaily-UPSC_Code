import React, { useState, useEffect } from 'react';
// Use coreService.js for all current affairs API calls
import { fetchCurrentAffairs, getAvailableSubjects } from '../../api/coreService';
import { decodeHtmlEntities, stripHTML } from '../../utils/seoUtils';

const CurrentAffairsDashboard = () => {
  const [affairs, setAffairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    q: '',
    subject: ''
  });
  const [meta, setMeta] = useState({});
  const [message, setMessage] = useState("");
  const subjects = getAvailableSubjects();

  useEffect(() => {
    loadAffairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Fetch current affairs list
  const loadAffairs = async () => {
    try {
      setLoading(true);
      setMessage("");
      // API call to fetch current affairs
      const response = await fetchCurrentAffairs(filters);
      setAffairs(response.data);
      setMeta(response.meta);
      if (response.message) setMessage(response.message);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to load current affairs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading current affairs...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Current Affairs Dashboard</h2>
      {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 text-sm">{message}</div>
      )}
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:grid md:grid-cols-12 md:gap-4">
          <div className="md:col-span-5">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search current affairs..."
              value={filters.q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Filter by Subject</label>
            <select
              id="subject"
              value={filters.subject}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3 flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Current Affairs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {affairs.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No current affairs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          affairs.map(affair => (
            <div key={affair._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {affair.thumbnailUrl && (
                <img
                  src={affair.thumbnailUrl}
                  alt={affair.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h3
                  className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: affair.title }}
                />
                <div
                  className="text-gray-600 mb-4 line-clamp-3 prose max-w-none prose-sm"
                  dangerouslySetInnerHTML={{ __html: affair.description }}
                />
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-3">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(affair.date).toLocaleDateString()}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {decodeHtmlEntities(stripHTML(affair.subjectOther || affair.subject || ""))}
                  </span>
                </div>
                {affair.source && (
                  <a
                    href={affair.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      {meta.pages > 1 && (
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              disabled={filters.page === 1}
              onClick={() => handlePageChange(filters.page - 1)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={filters.page === meta.pages}
              onClick={() => handlePageChange(filters.page + 1)}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(filters.page - 1) * filters.limit + 1}</span> to{' '}
                <span className="font-medium">{Math.min(filters.page * filters.limit, meta.total)}</span> of{' '}
                <span className="font-medium">{meta.total}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  disabled={filters.page === 1}
                  onClick={() => handlePageChange(filters.page - 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* Page numbers - simplified for demo */}
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Page {filters.page} of {meta.pages}
                </span>
                <button
                  disabled={filters.page === meta.pages}
                  onClick={() => handlePageChange(filters.page + 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentAffairsDashboard;