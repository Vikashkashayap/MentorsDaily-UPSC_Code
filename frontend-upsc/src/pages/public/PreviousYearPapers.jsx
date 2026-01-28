import React, { useState, useEffect } from "react";
import { getPublicPreviousYearPapers } from "../../api/previousYearPaperService";

export default function PreviousYearPapers() {
  const [papersData, setPapersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPublicPreviousYearPapers();
      
      // Handle different response structures
      // API returns: { success: true, data: { message: "...", data: [array] } }
      // Service returns: response.data which is { message: "...", data: [array] }
      let papers = [];
      
      if (Array.isArray(response)) {
        papers = response;
      } else if (Array.isArray(response?.data)) {
        // If response.data is directly an array
        papers = response.data;
      } else if (response?.data?.data && Array.isArray(response.data.data)) {
        // If response.data.data is the array (nested structure)
        papers = response.data.data;
      }

      console.log("Fetched papers:", papers); // Debug log
      
      // Transform API data into UI format
      const transformedData = transformPapersData(papers);
      setPapersData(transformedData);
    } catch (err) {
      // Handle 401 or other errors gracefully
      if (err.response?.status === 401) {
        // Backend requires auth, but this is a public page
        // Show empty state instead of error
        console.log("Papers endpoint requires authentication. Showing empty state.");
        setPapersData([]);
        setError(null); // Don't show error for 401 on public page
      } else {
        console.error("Error fetching papers:", err);
        setError("Failed to load previous year papers. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const transformPapersData = (papers) => {
    // Group papers by year
    const papersByYear = {};
    
    papers.forEach((paper) => {
      const year = paper.year;
      if (!papersByYear[year]) {
        papersByYear[year] = {
          year: year,
          prelims: [],
          mains: []
        };
      }

      const paperData = {
        name: paper.paperType,
        url: paper.googleDriveLink
      };

      // Categorize papers based on examType
      if (paper.examType === 'Prelims') {
        papersByYear[year].prelims.push(paperData);
      } else if (paper.examType === 'Mains' || paper.examType === 'Compulsory') {
        // Check if it's a compulsory paper
        if (paper.paperType.includes('Hindi Compulsory') || 
            paper.paperType.includes('English Compulsory')) {
          paperData.type = "compulsory";
        }
        papersByYear[year].mains.push(paperData);
      }
    });

    // Convert to array and sort by year (descending)
    return Object.values(papersByYear).sort((a, b) => b.year - a.year);
  };

  if (loading) {
    return (
      <section
        id="previous-papers"
        className="relative min-h-screen py-16 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.07),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-600">Loading previous year papers...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="previous-papers"
        className="relative min-h-screen py-16 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.07),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-red-200 p-8">
              <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchPapers}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="previous-papers"
      className="relative min-h-screen py-16 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.07),transparent_70%)]"></div>

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            UPSC Previous Year Question Papers
          </span>
          <div className="mt-3 w-32 h-1 mx-auto bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"></div>
        </h1>

        {papersData.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-gray-200 p-8 text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600">No previous year papers available at the moment.</p>
          </div>
        ) : (
          papersData.map((yearData) => (
          <div
            key={yearData.year}
            className="mb-8 bg-white/80 backdrop-blur-md rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition transform duration-300 p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              YEAR - {yearData.year}
            </h2>

            {/* Prelims Section */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Prelims</h3>
              <div className="flex flex-wrap gap-3">
                {yearData.prelims.map((paper) => (
                  <a
                    key={paper.name}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200 hover:from-blue-200 hover:to-blue-100 transition"
                  >
                    {paper.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mains Section */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Mains</h3>
              <div className="flex flex-wrap gap-3">
                {yearData.mains.map((paper) => (
                  <a
                    key={paper.name}
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block px-4 py-2 text-sm font-medium rounded-lg border transition ${
                      paper.type === "compulsory"
                        ? "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                        : "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                    }`}
                  >
                    {paper.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))
        )}
      </div>
    </section>
  );
}
