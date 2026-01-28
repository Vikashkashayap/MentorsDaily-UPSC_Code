import { useState, useMemo } from 'react';
import { createPreviousYearPaper } from '../../api/previousYearPaperService';
import { dataHandler } from '../../utils/dataHandler';
import { useTheme } from '../../contexts/ThemeContext';

const BulkUploadPreviousYearPapers = () => {
  const { isDark } = useTheme();
  const [year, setYear] = useState(new Date().getFullYear());
  const [examName, setExamName] = useState('UPSC Civil Services Examination');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});

  // Define all papers with their configurations - reactive to year changes
  const papers = useMemo(() => [
    // Prelims
    {
      id: 'prelims-gs',
      examType: 'Prelims',
      paperType: `UPSC PRELIMS GS ${year}`,
      label: `UPSC PRELIMS (GS) ${year}`,
      color: 'blue',
      category: 'Prelims'
    },
    {
      id: 'prelims-csat',
      examType: 'Prelims',
      paperType: `UPSC PRELIMS CSAT ${year}`,
      label: `UPSC PRELIMS (CSAT) ${year}`,
      color: 'blue',
      category: 'Prelims'
    },
    // Mains GS Papers
    {
      id: 'mains-gs1',
      examType: 'Mains',
      paperType: `UPSC MAINS GS I ${year}`,
      label: `UPSC MAINS GS I ${year}`,
      color: 'green',
      category: 'Mains'
    },
    {
      id: 'mains-gs2',
      examType: 'Mains',
      paperType: `UPSC MAINS GS II ${year}`,
      label: `UPSC MAINS GS II ${year}`,
      color: 'green',
      category: 'Mains'
    },
    {
      id: 'mains-gs3',
      examType: 'Mains',
      paperType: `UPSC MAINS GS III ${year}`,
      label: `UPSC MAINS GS III ${year}`,
      color: 'green',
      category: 'Mains'
    },
    {
      id: 'mains-gs4',
      examType: 'Mains',
      paperType: `UPSC MAINS GS IV ${year}`,
      label: `UPSC MAINS GS IV ${year}`,
      color: 'green',
      category: 'Mains'
    },
    {
      id: 'mains-essay',
      examType: 'Mains',
      paperType: `UPSC MAINS ESSAY ${year}`,
      label: `UPSC MAINS ESSAY ${year}`,
      color: 'green',
      category: 'Mains'
    },
    // Compulsory Papers
    {
      id: 'hindi-compulsory',
      examType: 'Compulsory',
      paperType: 'Hindi Compulsory Mains',
      label: 'Hindi Compulsory Mains',
      color: 'red',
      category: 'Mains'
    },
    {
      id: 'english-compulsory',
      examType: 'Compulsory',
      paperType: 'English Compulsory Mains',
      label: 'English Compulsory Mains',
      color: 'red',
      category: 'Mains'
    }
  ], [year]);

  // Initialize form data for all papers
  const [formData, setFormData] = useState(() => {
    const currentYear = new Date().getFullYear();
    const initial = {};
    const initialPapers = [
      { id: 'prelims-gs', examType: 'Prelims', paperType: `UPSC PRELIMS GS ${currentYear}` },
      { id: 'prelims-csat', examType: 'Prelims', paperType: `UPSC PRELIMS CSAT ${currentYear}` },
      { id: 'mains-gs1', examType: 'Mains', paperType: `UPSC MAINS GS I ${currentYear}` },
      { id: 'mains-gs2', examType: 'Mains', paperType: `UPSC MAINS GS II ${currentYear}` },
      { id: 'mains-gs3', examType: 'Mains', paperType: `UPSC MAINS GS III ${currentYear}` },
      { id: 'mains-gs4', examType: 'Mains', paperType: `UPSC MAINS GS IV ${currentYear}` },
      { id: 'mains-essay', examType: 'Mains', paperType: `UPSC MAINS ESSAY ${currentYear}` },
      { id: 'hindi-compulsory', examType: 'Compulsory', paperType: 'Hindi Compulsory Mains' },
      { id: 'english-compulsory', examType: 'Compulsory', paperType: 'English Compulsory Mains' }
    ];
    initialPapers.forEach(paper => {
      initial[paper.id] = {
        googleDriveLink: '',
        paperType: paper.paperType,
        examType: paper.examType
      };
    });
    return initial;
  });

  // Update paper types when year changes
  const handleYearChange = (newYear) => {
    setYear(newYear);
    setFormData(prev => {
      const updated = { ...prev };
      const oldYear = year.toString();
      const newYearStr = newYear.toString();
      
      // Update paper types that contain the year
      Object.keys(updated).forEach(key => {
        if (updated[key].paperType && updated[key].paperType.includes(oldYear)) {
          updated[key] = {
            ...updated[key],
            paperType: updated[key].paperType.replace(oldYear, newYearStr)
          };
        }
      });
      return updated;
    });
  };

  const handleLinkChange = (paperId, value) => {
    setFormData(prev => ({
      ...prev,
      [paperId]: {
        ...prev[paperId],
        googleDriveLink: value
      }
    }));
    // Clear status when user starts typing
    if (uploadStatus[paperId]) {
      setUploadStatus(prev => {
        const updated = { ...prev };
        delete updated[paperId];
        return updated;
      });
    }
  };

  const validateUrl = (url) => {
    if (!url || url.trim() === '') return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all URLs
    const errors = {};
    papers.forEach(paper => {
      const link = formData[paper.id]?.googleDriveLink || '';
      if (link.trim() && !validateUrl(link)) {
        errors[paper.id] = 'Invalid URL';
      }
    });

    if (Object.keys(errors).length > 0) {
      setUploadStatus(errors);
      return;
    }

    // Filter papers that have links
    const papersToUpload = papers.filter(paper => {
      const link = formData[paper.id]?.googleDriveLink || '';
      return link.trim() !== '';
    });

    if (papersToUpload.length === 0) {
      dataHandler.handleApiCall(
        () => Promise.reject(new Error('Please add at least one Google Drive link')),
        {
          showSuccessMessage: false,
          errorMessage: 'Please add at least one Google Drive link to upload papers.'
        }
      );
      return;
    }

    setIsSubmitting(true);
    setUploadStatus({});

    const results = {
      success: [],
      failed: []
    };

    // Upload all papers
    for (const paper of papersToUpload) {
      const paperData = formData[paper.id];
      const payload = {
        year: parseInt(year),
        examName: examName.trim(),
        examType: paper.examType,
        paperType: paper.paperType, // Use from papers array to ensure correct year
        googleDriveLink: paperData.googleDriveLink.trim()
      };

      const result = await dataHandler.handleApiCall(
        () => createPreviousYearPaper(payload),
        {
          showSuccessMessage: false,
          showErrorMessage: false,
          successMessage: '',
          errorMessage: ''
        }
      );

      if (result.status === 'success') {
        results.success.push(paper.label);
        setUploadStatus(prev => ({
          ...prev,
          [paper.id]: { status: 'success', message: 'Uploaded successfully' }
        }));
      } else {
        results.failed.push(paper.label);
        setUploadStatus(prev => ({
          ...prev,
          [paper.id]: { status: 'error', message: result.message || 'Upload failed' }
        }));
      }
    }

    setIsSubmitting(false);

    // Show summary message
    if (results.success.length > 0 && results.failed.length === 0) {
      dataHandler.handleApiCall(
        () => Promise.resolve({ data: { message: `Successfully uploaded ${results.success.length} paper(s)!` } }),
        {
          successMessage: `Successfully uploaded ${results.success.length} paper(s)!`,
          errorMessage: ''
        }
      );
    } else if (results.failed.length > 0) {
      dataHandler.handleApiCall(
        () => Promise.reject(new Error(`Failed to upload ${results.failed.length} paper(s)`)),
        {
          showSuccessMessage: false,
          errorMessage: `Successfully uploaded ${results.success.length} paper(s). Failed to upload ${results.failed.length} paper(s).`
        }
      );
    }
  };

  const handleReset = () => {
    const currentYear = new Date().getFullYear();
    const reset = {};
    papers.forEach(paper => {
      let paperType = paper.paperType;
      // Only replace year if it exists in the paperType
      if (paperType.includes(year.toString())) {
        paperType = paperType.replace(year.toString(), currentYear.toString());
      }
      reset[paper.id] = {
        googleDriveLink: '',
        paperType: paperType,
        examType: paper.examType
      };
    });
    setFormData(reset);
    setYear(currentYear);
    setUploadStatus({});
  };

  const getColorClasses = (color) => {
    if (color === 'blue') {
      return {
        bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
        border: isDark ? 'border-blue-700' : 'border-blue-200',
        text: isDark ? 'text-blue-300' : 'text-blue-700',
        hover: isDark ? 'hover:bg-blue-900/50' : 'hover:bg-blue-100'
      };
    } else if (color === 'green') {
      return {
        bg: isDark ? 'bg-green-900/30' : 'bg-green-50',
        border: isDark ? 'border-green-700' : 'border-green-200',
        text: isDark ? 'text-green-300' : 'text-green-700',
        hover: isDark ? 'hover:bg-green-900/50' : 'hover:bg-green-100'
      };
    } else if (color === 'red') {
      return {
        bg: isDark ? 'bg-red-900/30' : 'bg-red-50',
        border: isDark ? 'border-red-700' : 'border-red-200',
        text: isDark ? 'text-red-300' : 'text-red-700',
        hover: isDark ? 'hover:bg-red-900/50' : 'hover:bg-red-100'
      };
    }
  };

  const prelimsPapers = papers.filter(p => p.category === 'Prelims');
  const mainsPapers = papers.filter(p => p.category === 'Mains');

  return (
    <div className={isDark ? 'dark' : ''}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Year and Exam Name Selection */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Year *
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => handleYearChange(parseInt(e.target.value) || new Date().getFullYear())}
                min="1900"
                max={new Date().getFullYear() + 1}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                } transition-colors duration-200`}
                placeholder="e.g., 2025"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Exam Name *
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                } transition-colors duration-200`}
                placeholder="e.g., UPSC Civil Services Examination"
              />
            </div>
          </div>
        </div>

        {/* Papers Upload Section */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border`}>
          {/* Prelims Section */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Prelims
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prelimsPapers.map((paper) => {
                const colors = getColorClasses(paper.color);
                const status = uploadStatus[paper.id];
                return (
                  <div key={paper.id} className="space-y-2">
                    <button
                      type="button"
                      className={`w-full px-4 py-3 rounded-lg border-2 text-left font-medium transition-all duration-200 ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}`}
                    >
                      {paper.label}
                    </button>
                    <input
                      type="url"
                      value={formData[paper.id]?.googleDriveLink || ''}
                      onChange={(e) => handleLinkChange(paper.id, e.target.value)}
                      placeholder="Enter Google Drive Link"
                      className={`w-full px-4 py-2 rounded-lg border text-sm ${
                        status?.status === 'error'
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : status?.status === 'success'
                          ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                          : isDark
                          ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                      } transition-colors duration-200`}
                      disabled={isSubmitting}
                    />
                    {status && (
                      <p className={`text-xs ${
                        status.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {status.message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mains Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Mains
            </h3>
            <div className="space-y-4">
              {/* GS Papers Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mainsPapers.filter(p => p.color === 'green').map((paper) => {
                  const colors = getColorClasses(paper.color);
                  const status = uploadStatus[paper.id];
                  return (
                    <div key={paper.id} className="space-y-2">
                      <button
                        type="button"
                        className={`w-full px-4 py-3 rounded-lg border-2 text-left font-medium transition-all duration-200 ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}`}
                      >
                        {paper.label}
                      </button>
                      <input
                        type="url"
                        value={formData[paper.id]?.googleDriveLink || ''}
                        onChange={(e) => handleLinkChange(paper.id, e.target.value)}
                        placeholder="Enter Google Drive Link"
                        className={`w-full px-4 py-2 rounded-lg border text-sm ${
                          status?.status === 'error'
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : status?.status === 'success'
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                        } transition-colors duration-200`}
                        disabled={isSubmitting}
                      />
                      {status && (
                        <p className={`text-xs ${
                          status.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {status.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Compulsory Papers Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mainsPapers.filter(p => p.color === 'red').map((paper) => {
                  const colors = getColorClasses(paper.color);
                  const status = uploadStatus[paper.id];
                  return (
                    <div key={paper.id} className="space-y-2">
                      <button
                        type="button"
                        className={`w-full px-4 py-3 rounded-lg border-2 text-left font-medium transition-all duration-200 ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}`}
                      >
                        {paper.label}
                      </button>
                      <input
                        type="url"
                        value={formData[paper.id]?.googleDriveLink || ''}
                        onChange={(e) => handleLinkChange(paper.id, e.target.value)}
                        placeholder="Enter Google Drive Link"
                        className={`w-full px-4 py-2 rounded-lg border text-sm ${
                          status?.status === 'error'
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : status?.status === 'success'
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : isDark
                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
                        } transition-colors duration-200`}
                        disabled={isSubmitting}
                      />
                      {status && (
                        <p className={`text-xs ${
                          status.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {status.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg p-6 border`}>
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isDark
                  ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-colors duration-200 flex items-center ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload All Papers'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BulkUploadPreviousYearPapers;

