import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCurrentAffairs } from "../../../api/coreService";
import { slugify, decodeHtmlEntities, stripHTML } from "../../../utils/seoUtils";
import SEOHead from "../../../components/SEO/SEOHead";


export default function CurrentAffairsDropdown() {
  const navigate = useNavigate();
  const location = useLocation();
  const [affairs, setAffairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [modalPost, setModalPost] = useState(null);
  const [selectedGSPapers, setSelectedGSPapers] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 12;


  // When filters change, reset to page 1
  const handleFilterChange = () => {
    setPage(1);
  };
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    handleFilterChange();
  };
  
  const setGsCombo = (comboArray) => {
    setSelectedGSPapers(comboArray);
    handleFilterChange();
  };

  

  // Compact long HTML by reducing default margins/line heights of p, ul, li
  const compactHtml = (html = "") => {
    try {
      let out = html
        .replace(/<p(?![^>]*style=)/gi, '<p style="margin:4px 0; line-height:1.45"')
        .replace(/<ul(?![^>]*style=)/gi, '<ul style="margin:8px 0; padding-left:20px; line-height:1.5; list-style-type:disc"')
        .replace(/<ol(?![^>]*style=)/gi, '<ol style="margin:8px 0; padding-left:20px; line-height:1.5; list-style-type:decimal"')
        .replace(/<li(?![^>]*style=)/gi, '<li style="margin:4px 0; line-height:1.5; display:list-item"')
        .replace(/<table(?![^>]*style=)/gi, '<table style="border-collapse:collapse; width:100%; margin:16px 0; border:1px solid #ddd"')
        .replace(/<tbody(?![^>]*style=)/gi, '<tbody')
        .replace(/<tr(?![^>]*style=)/gi, '<tr')
        .replace(/<th(?![^>]*style=)/gi, '<th style="border:1px solid #ddd; padding:8px 12px; background-color:#f2f2f2; font-weight:bold; text-align:left"')
        .replace(/<td(?![^>]*style=)/gi, '<td style="border:1px solid #ddd; padding:8px 12px"');
      return out;
    } catch {
      return html;
    }
  };
  


  useEffect(() => {
    const loadAffairs = async () => {
      try {
        setLoading(true);
        setError(null);
        setMessage("");
        
        const params = {
          page: page,
          limit: LIMIT,
        };
        if (selectedDate) {
          params.startDate = selectedDate;
          params.endDate = selectedDate;
        }
        if (selectedGSPapers.length > 0) {
          params.paperName = selectedGSPapers.join(',');
        }


        const res = await fetchCurrentAffairs(params);
        
        const newAffairs = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setAffairs(newAffairs);
        setHasNextPage(newAffairs.length === LIMIT);
        
        // Calculate total pages if total count is available
        if (res.data?.totalCount) {
          setTotalPages(Math.ceil(res.data.totalCount / LIMIT));
        } else {
          setTotalPages(page + (newAffairs.length === LIMIT ? 1 : 0));
        }
        
        const msg = res.data?.message || "";
        setMessage(msg);
        if (msg) {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2500);
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load current affairs"
        );
        setHasNextPage(false);
      } finally {
        setLoading(false);
      }
    };
    loadAffairs();
  }, [page, selectedDate, selectedGSPapers]);


  const filteredAffairs = useMemo(() => {
    let result = affairs;
    // Date filter
    if (selectedDate) {
      const target = new Date(selectedDate);
      result = result.filter((item) => {
        if (!item?.date) return false;
        const d = new Date(item.date);
        return (
          d.getUTCFullYear() === target.getUTCFullYear() &&
          d.getUTCMonth() === target.getUTCMonth() &&
          d.getUTCDate() === target.getUTCDate()
        );
      });
    }
    // GS filter (OR across selected papers). Empty selection means all
    if (selectedGSPapers.length === 0) return result;
    return result.filter((item) => {
      const paperName = String(item?.paperName || "");
      const digits = Array.from(new Set((paperName.match(/\d/g) || [])));
      const itemGsKeys = digits.map((n) => `GS${n}`);
      return itemGsKeys.some((k) => selectedGSPapers.includes(k));
    });
  }, [affairs, selectedDate, selectedGSPapers]);


  const isComboChecked = (comboArray) => {
    if (comboArray.length === 0) return selectedGSPapers.length === 0; // all
    return (
      comboArray.length === selectedGSPapers.length &&
      comboArray.every((k) => selectedGSPapers.includes(k))
    );
  };


  const clearAllFilters = () => {
    setSelectedDate("");
    setSelectedGSPapers([]);
    handleFilterChange();
  };


  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    try {
      return new Date(selectedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);


  const handleCardClick = (item) => {
    const s = slugify(item.title || "");
    navigate(`/currentAffairs/${s}`);
  };


  if (loading && page === 1)
    return (
      <div className="p-6 text-center text-gray-600">
        Loading current affairs...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-medium">{error}</div>
    );


  return (
    <div className="relative min-h-screen w-full py-3 px-3 sm:py-6 sm:px-6 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <SEOHead pathname={location.pathname} />
      
      <style jsx>{`
        .current-affairs-content ul {
          list-style-type: disc !important;
          margin: 8px 0 !important;
          padding-left: 20px !important;
        }
        .current-affairs-content ol {
          list-style-type: decimal !important;
          margin: 8px 0 !important;
          padding-left: 20px !important;
        }
        .current-affairs-content li {
          display: list-item !important;
          margin: 4px 0 !important;
          line-height: 1.5 !important;
        }
        .current-affairs-content ul ul {
          list-style-type: circle !important;
        }
        .current-affairs-content ul ul ul {
          list-style-type: square !important;
        }
      `}</style>
      
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>


      <div className="relative max-w-[1920px] mx-auto">
        {showToast && message && (
          <div className="fixed top-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in">
            {message}
          </div>
        )}

        {/* Clean Title Section */}
        <div className="mb-6 lg:mb-8 bg-white rounded-xl shadow-md border border-gray-200 p-4 lg:p-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight text-center">
            Daily Current Affairs for UPSC Exam - Latest News  Analysis
          </h1>
        </div>

        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-between font-medium text-gray-700 text-sm"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filters
              {(selectedGSPapers.length > 0 || selectedDate) && (
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>


        <div className="flex gap-4 lg:gap-6 min-h-[70vh]">
          <aside className={`${showMobileFilters ? 'block fixed top-0 inset-x-0 z-40 bg-white p-3 overflow-y-auto shadow-lg' : 'hidden'} lg:block lg:relative lg:w-72 lg:flex-shrink-0 lg:shadow-none`}>
            
            <div className={`lg:sticky lg:top-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 lg:p-4 border border-gray-200 flex flex-col lg:max-h-[85vh]`}>
              
              {showMobileFilters && (
                <div className="flex-shrink-0 flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filters
                  </h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">Filter by Date</h3>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {selectedDate && (
                    <button
                      onClick={() => { setSelectedDate(""); handleFilterChange(); }}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Clear date
                    </button>
                  )}
                </div>


                {/* GS Papers Filter */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">GS Papers</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-gray-100 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 has-[:checked]:text-blue-900 transition-colors duration-200 cursor-pointer">
                      <input type="radio" name="gs-combo" checked={isComboChecked([])} onChange={() => setGsCombo([])} className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
                      <span className="text-xs font-medium">All Papers</span>
                    </label>
                    
                    {[
                      { value: ["GS1"], label: "GS1" },
                      { value: ["GS2"], label: "GS2" },
                      { value: ["GS3"], label: "GS3" },
                      { value: ["GS4"], label: "GS4" },
                      { value: ["GS1","GS2"], label: "GS1 + GS2" },
                      { value: ["GS1","GS3"], label: "GS1 + GS3" },
                      { value: ["GS1","GS4"], label: "GS1 + GS4" },
                      { value: ["GS2","GS3"], label: "GS2 + GS3" },
                      { value: ["GS2","GS4"], label: "GS2 + GS4" },
                      { value: ["GS3","GS4"], label: "GS3 + GS4" },
                    ].map((combo) => (
                      <label key={combo.label} className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-gray-100 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 has-[:checked]:text-blue-900 transition-colors duration-200 cursor-pointer">
                        <input type="radio" name="gs-combo" checked={isComboChecked(combo.value)} onChange={() => setGsCombo(combo.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs font-medium">{combo.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- Action Buttons Footer --- */}
              <div className="flex-shrink-0 pt-4 mt-auto border-t border-gray-200">
                <div className="space-y-2">
                  <button onClick={clearAllFilters} className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    Clear All Filters
                  </button>

                  {showMobileFilters && (
                    <button onClick={() => setShowMobileFilters(false)} className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs transition-colors">
                      Close Filters
                    </button>
                  )}
                </div>

                <div className="hidden lg:block pt-4 mt-2 space-y-2">
                  <div className="text-xs text-center text-gray-600 font-medium mb-2">Page {page} of {totalPages}</div>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={loading || page <= 1} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Previous Page
                  </button>
                  <button onClick={() => setPage(p => p + 1)} disabled={loading || !hasNextPage || page >= totalPages} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs transition-colors bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:cursor-not-allowed">
                    Next Page
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </aside>


          <main className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              {selectedDate && (
                <div className="bg-white rounded-lg shadow-sm p-2 lg:p-3 border border-gray-200">
                  <h2 className="text-xs lg:text-sm font-semibold text-gray-800">
                    Showing posts for{" "}
                    <span className="text-blue-600">{formattedSelectedDate}</span>{" "}
                    — {filteredAffairs.length}{" "}
                    {filteredAffairs.length === 1 ? "post" : "posts"}
                  </h2>
                </div>
              )}
              
              <div className="flex items-center gap-2 ml-auto">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={loading || page <= 1} 
                  className="px-3 lg:px-4 py-1.5 lg:py-2 border rounded-lg bg-white border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Prev</span>
                </button>
                
                <span className="text-xs font-semibold px-2 lg:px-3 py-1.5 rounded-lg border min-w-[60px] text-center bg-blue-50 border-blue-200 text-blue-800 lg:bg-white lg:border-gray-200 lg:text-gray-700">
                  {page} / {totalPages}
                </span>
                
                <button 
                  onClick={() => setPage(p => p + 1)} 
                  disabled={loading || !hasNextPage || page >= totalPages} 
                  className="px-3 lg:px-4 py-1.5 lg:py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-colors flex items-center gap-1 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 lg:bg-white lg:text-gray-700 lg:border-gray-300 lg:hover:bg-gray-50"
                >
                  <span className="hidden sm:inline">Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>


            {filteredAffairs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 text-center border border-gray-200 min-h-[50vh] flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 lg:h-12 lg:w-12 mx-auto text-gray-400 mb-2 lg:mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm lg:text-base font-semibold text-gray-700 mb-1">No posts found</h3>
                <p className="text-gray-500 text-xs lg:text-sm">
                  Try adjusting your filters or going to a previous page.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4" itemScope itemType="https://schema.org/ItemList">
                  {filteredAffairs.map((item, index) => (
                    <article
                      key={item._id}
                      onClick={() => handleCardClick(item)}
                      className="group relative bg-white rounded-lg lg:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 flex flex-col hover:-translate-y-1 cursor-pointer h-full min-h-0 hover:border-blue-300 hover:shadow-blue-200/50"
                      itemScope
                      itemType="https://schema.org/Article"
                    >
                      <div className="relative h-28 sm:h-32 lg:h-36">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title || "Current Affairs Article"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            itemProp="image"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center border-b border-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3a2 2 0 012-2h2a2 2 0 012 2m-6 5v6m4-3l-4 4-4-4" />
                            </svg>
                          </div>
                        )}
                        {item.paperName && (
                          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow">
                            {decodeHtmlEntities(stripHTML(item.paperName))}
                          </span>
                        )}
                      </div>


                      <div className="p-2 lg:p-3 flex-1 flex flex-col min-h-0">
                        <h3 
                          className="text-xs lg:text-sm font-bold text-gray-900 group-hover:text-blue-700 line-clamp-2 mb-1.5 lg:mb-2 leading-tight prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        
                        {item.subject && (
                          <div className="flex flex-wrap gap-1 mb-1.5 lg:mb-2">
                            {decodeHtmlEntities(stripHTML(item.subject))
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .slice(0, 1) 
                              .map((sub, idx) => (
                                <span
                                  key={`${item._id}-sub-${idx}`}
                                  className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-800 rounded border border-blue-200"
                                >
                                  📖 {sub}
                                </span>
                              ))}
                            {decodeHtmlEntities(stripHTML(item.subject)).split(',').length > 1 && (
                              <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded border border-gray-200">
                                +{decodeHtmlEntities(stripHTML(item.subject)).split(',').length - 1}
                              </span>
                            )}
                          </div>
                        )}


                        <div 
                          className="text-[10px] lg:text-xs text-gray-600 line-clamp-2 mb-2 lg:mb-3 flex-1 prose max-w-none prose-sm"
                          dangerouslySetInnerHTML={{ __html: item.description || '' }}
                        />


                        <div className="flex items-center justify-between text-[10px] lg:text-xs text-gray-500 border-t border-blue-50 pt-1.5 lg:pt-2 mt-auto">
                          <span className="flex items-center space-x-1 font-medium">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002-2z"
                              />
                            </svg>
                            <time itemProp="datePublished" dateTime={item.date ? new Date(item.date).toISOString() : ''}>
                              {item.date ? (() => { 
                                const d = new Date(item.date); 
                                const day = String(d.getDate()).padStart(2, '0'); 
                                const month = String(d.getMonth() + 1).padStart(2, '0'); 
                                const year = d.getFullYear(); 
                                return `${day}/${month}/${year}`; 
                              })() : '-'}
                            </time>
                          </span>
                          <span className="text-blue-600 font-semibold text-[10px] lg:text-xs group-hover:text-blue-800 transition-colors">
                            Read →
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}