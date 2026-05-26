import { useState } from 'react';
import { createPreviousYearPaper, getExamTypes } from '../../api/previousYearPaperService';
import { dataHandler } from '../../utils/dataHandler';
import { useTheme } from '../../contexts/ThemeContext';

const CreatePreviousYearPaperForm = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    examName: '',
    examType: 'Prelims',
    paperType: '',
    googleDriveLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const examTypes = getExamTypes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }

    if (!formData.examName || formData.examName.trim() === '') {
      newErrors.examName = 'Exam name is required';
    }

    if (!formData.examType) {
      newErrors.examType = 'Exam type is required';
    }

    if (!formData.paperType || formData.paperType.trim() === '') {
      newErrors.paperType = 'Paper type is required';
    }

    // Google Drive link is optional, but if provided, should be a valid URL
    if (formData.googleDriveLink && formData.googleDriveLink.trim() !== '') {
      try {
        new URL(formData.googleDriveLink);
      } catch (e) {
        newErrors.googleDriveLink = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      year: parseInt(formData.year),
      examName: formData.examName.trim(),
      examType: formData.examType,
      paperType: formData.paperType.trim(),
      ...(formData.googleDriveLink.trim() && { googleDriveLink: formData.googleDriveLink.trim() })
    };

    const result = await dataHandler.handleApiCall(
      () => createPreviousYearPaper(payload),
      {
        successMessage: "Previous year paper created successfully!",
        errorMessage: "Error creating previous year paper. Please try again."
      }
    );

    if (result.status === "success") {
      // Reset form
      setFormData({
        year: new Date().getFullYear(),
        examName: '',
        examType: 'Prelims',
        paperType: '',
        googleDriveLink: ''
      });
      setErrors({});
    }

    setIsSubmitting(false);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Year */}
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear() + 1}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.year
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              } transition-colors duration-200`}
              placeholder="e.g., 2024"
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-500">{errors.year}</p>
            )}
          </div>

          {/* Exam Type */}
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Exam Type *
            </label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.examType
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              } transition-colors duration-200`}
            >
              {examTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.examType && (
              <p className="mt-1 text-sm text-red-500">{errors.examType}</p>
            )}
          </div>

          {/* Exam Name */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Exam Name *
            </label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.examName
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              } transition-colors duration-200`}
              placeholder="e.g., UPSC Civil Services Examination"
            />
            {errors.examName && (
              <p className="mt-1 text-sm text-red-500">{errors.examName}</p>
            )}
          </div>

          {/* Paper Type */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Paper Type *
            </label>
            <input
              type="text"
              name="paperType"
              value={formData.paperType}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.paperType
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              } transition-colors duration-200`}
              placeholder="e.g., UPSC PRELIMS GS 2025"
            />
            {errors.paperType && (
              <p className="mt-1 text-sm text-red-500">{errors.paperType}</p>
            )}
          </div>

          {/* Google Drive Link */}
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Google Drive Link (Optional)
            </label>
            <input
              type="url"
              name="googleDriveLink"
              value={formData.googleDriveLink}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.googleDriveLink
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              } transition-colors duration-200`}
              placeholder="https://drive.google.com/..."
            />
            {errors.googleDriveLink && (
              <p className="mt-1 text-sm text-red-500">{errors.googleDriveLink}</p>
            )}
            <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Optional: Add a Google Drive link to the paper document
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => {
              setFormData({
                year: new Date().getFullYear(),
                examName: '',
                examType: 'Prelims',
                paperType: '',
                googleDriveLink: ''
              });
              setErrors({});
            }}
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
                Creating...
              </>
            ) : (
              'Create Paper'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePreviousYearPaperForm;

