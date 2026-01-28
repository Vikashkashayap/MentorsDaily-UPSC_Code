import { useState, useEffect } from 'react';
import { getAllPreviousYearPapers, deletePreviousYearPaper, updatePreviousYearPaper } from '../../api/previousYearPaperService';
import { dataHandler } from '../../utils/dataHandler';
import { useTheme } from '../../contexts/ThemeContext';

const PreviousYearPapersList = () => {
  const { isDark } = useTheme();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filter, setFilter] = useState({ examType: '', year: '' });

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    setLoading(true);
    const result = await dataHandler.handleApiCall(
      () => getAllPreviousYearPapers(),
      {
        showSuccessMessage: false,
        showErrorMessage: true,
        errorMessage: "Error fetching previous year papers."
      }
    );

    if (result.status === "success") {
      // Handle both response structures: result.data.data or result.data (if it's already an array)
      const papersData = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result.data?.data)
        ? result.data.data
        : [];
      setPapers(papersData);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this paper?')) {
      return;
    }

    const result = await dataHandler.handleApiCall(
      () => deletePreviousYearPaper(id),
      {
        successMessage: "Paper deleted successfully!",
        errorMessage: "Error deleting paper."
      }
    );

    if (result.status === "success") {
      fetchPapers();
    }
  };

  const handleEdit = (paper) => {
    setEditingId(paper._id || paper.id);
    setEditFormData({
      year: paper.year,
      examName: paper.examName,
      examType: paper.examType,
      paperType: paper.paperType,
      googleDriveLink: paper.googleDriveLink || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleUpdate = async (id) => {
    const result = await dataHandler.handleApiCall(
      () => updatePreviousYearPaper(id, editFormData),
      {
        successMessage: "Paper updated successfully!",
        errorMessage: "Error updating paper."
      }
    );

    if (result.status === "success") {
      setEditingId(null);
      setEditFormData({});
      fetchPapers();
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredPapers = papers.filter(paper => {
    if (filter.examType && paper.examType !== filter.examType) return false;
    if (filter.year && paper.year.toString() !== filter.year) return false;
    return true;
  });

  const uniqueYears = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a);
  const uniqueExamTypes = [...new Set(papers.map(p => p.examType))];

  if (loading) {
    return (
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className={`ml-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Loading papers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border`}>
        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Filter by Exam Type
              </label>
              <select
                value={filter.examType}
                onChange={(e) => setFilter(prev => ({ ...prev, examType: e.target.value }))}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">All Types</option>
                {uniqueExamTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Filter by Year
              </label>
              <select
                value={filter.year}
                onChange={(e) => setFilter(prev => ({ ...prev, year: e.target.value }))}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilter({ examType: '', year: '' })}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Papers List */}
        <div className="p-6">
          {filteredPapers.length === 0 ? (
            <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="mx-auto h-12 w-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No papers found. {papers.length === 0 ? 'Create your first paper!' : 'Try adjusting your filters.'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPapers.map((paper) => (
                <div
                  key={paper._id || paper.id}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-gray-50 border-gray-200'
                  } transition-all hover:shadow-md`}
                >
                  {editingId === (paper._id || paper.id) ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Year
                          </label>
                          <input
                            type="number"
                            name="year"
                            value={editFormData.year}
                            onChange={handleEditChange}
                            className={`w-full px-3 py-2 rounded border ${
                              isDark
                                ? 'bg-gray-800 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Exam Type
                          </label>
                          <select
                            name="examType"
                            value={editFormData.examType}
                            onChange={handleEditChange}
                            className={`w-full px-3 py-2 rounded border ${
                              isDark
                                ? 'bg-gray-800 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            <option value="Prelims">Prelims</option>
                            <option value="Mains">Mains</option>
                            <option value="Compulsory">Compulsory</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Exam Name
                          </label>
                          <input
                            type="text"
                            name="examName"
                            value={editFormData.examName}
                            onChange={handleEditChange}
                            className={`w-full px-3 py-2 rounded border ${
                              isDark
                                ? 'bg-gray-800 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Paper Type
                          </label>
                          <input
                            type="text"
                            name="paperType"
                            value={editFormData.paperType}
                            onChange={handleEditChange}
                            className={`w-full px-3 py-2 rounded border ${
                              isDark
                                ? 'bg-gray-800 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                            Google Drive Link
                          </label>
                          <input
                            type="url"
                            name="googleDriveLink"
                            value={editFormData.googleDriveLink}
                            onChange={handleEditChange}
                            className={`w-full px-3 py-2 rounded border ${
                              isDark
                                ? 'bg-gray-800 border-gray-600 text-white'
                                : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={handleCancelEdit}
                          className={`px-4 py-2 rounded ${
                            isDark
                              ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          } transition-colors`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdate(paper._id || paper.id)}
                          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            paper.examType === 'Prelims'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : paper.examType === 'Mains'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          }`}>
                            {paper.examType}
                          </span>
                          <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {paper.year}
                          </span>
                        </div>
                        <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {paper.examName}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                          {paper.paperType}
                        </p>
                        {paper.googleDriveLink && (
                          <a
                            href={paper.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Paper
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(paper)}
                          className={`p-2 rounded ${
                            isDark
                              ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          } transition-colors`}
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(paper._id || paper.id)}
                          className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousYearPapersList;

