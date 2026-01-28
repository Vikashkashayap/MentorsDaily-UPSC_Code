import { useState } from 'react';
import { createCurrentAffair } from '../../api/coreService';
import { dataHandler } from '../../utils/dataHandler';
import { useTheme } from '../../contexts/ThemeContext';
import RichTextEditor from '../../components/RichTextEditor';
import RichTextField from '../../components/RichTextField';
import FormattingToolbar from '../../components/FormattingToolbar';

const CurrentAffairForm = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    source: '',
    thumbnailUrl: '',
    paperName: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState('title'); // Currently focused field

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  // Clean HTML comment fragments (like StartFragment/EndFragment from Word)
  const cleanHtmlFragments = (html = "") => {
    if (!html) return "";
    try {
      return html
        // Remove HTML comment fragments from Word/Office
        .replace(/<!--\s*StartFragment\s*-->/gi, '')
        .replace(/<!--\s*EndFragment\s*-->/gi, '')
        // Remove other common HTML comment patterns
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();
    } catch {
      return html;
    }
  };

  const handleRichTextChange = (fieldName, htmlContent) => {
    // Clean HTML fragments before saving
    const cleanedContent = cleanHtmlFragments(htmlContent);
    setFormData(prev => ({ ...prev, [fieldName]: cleanedContent }));
  };

  const getCurrentFieldValue = () => {
    return formData[activeField] || '';
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      'title': 'Title',
      'paperName': 'Paper Name',
      'subject': 'Subject',
      'thumbnailUrl': 'Thumbnail URL',
      'source': 'Source URL',
      'description': 'Description',
      'content': 'Content'
    };
    return labels[fieldName] || fieldName;
  };

  // Create a new current affair
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Clean all HTML fields before submitting
    const cleanedFormData = {
      ...formData,
      title: cleanHtmlFragments(formData.title),
      description: cleanHtmlFragments(formData.description),
      content: cleanHtmlFragments(formData.content),
      paperName: cleanHtmlFragments(formData.paperName),
      subject: cleanHtmlFragments(formData.subject),
      thumbnailUrl: cleanHtmlFragments(formData.thumbnailUrl),
      source: cleanHtmlFragments(formData.source)
    };

    const result = await dataHandler.handleApiCall(
      () => createCurrentAffair(cleanedFormData),
      {
        successMessage: "Current affair created successfully!",
        errorMessage: "Error creating current affair. Please try again."
      }
    );

    if (result.status === "success") {
      // Reset form
      setFormData({
        title: '',
        description: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        source: '',
        thumbnailUrl: '',
        paperName: '',
        subject: ''
      });
      setActiveField('title');
    }

    setIsSubmitting(false);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section - Left Side */}
          <div className="lg:col-span-2">
            <div className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title */}
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Title * {activeField === 'title' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                  </label>
                  <RichTextField
                    name="title"
                    value={formData.title}
                    onChange={handleRichTextChange}
                    onFocus={handleFieldFocus}
                    placeholder="Enter title"
                    isActive={activeField === 'title'}
                    multiline={false}
                  />
                </div>

                {/* Paper Name & Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Paper Name {activeField === 'paperName' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                    </label>
                    <RichTextField
                      name="paperName"
                      value={formData.paperName}
                      onChange={handleRichTextChange}
                      onFocus={handleFieldFocus}
                      placeholder="Enter paper name (e.g., GS 1, GS 2)"
                      isActive={activeField === 'paperName'}
                      multiline={false}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Subject {activeField === 'subject' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                    </label>
                    <RichTextField
                      name="subject"
                      value={formData.subject}
                      onChange={handleRichTextChange}
                      onFocus={handleFieldFocus}
                      placeholder="Enter subject (e.g., History, Polity)"
                      isActive={activeField === 'subject'}
                      multiline={false}
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                </div>

                {/* Thumbnail URL & Source URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Thumbnail URL {activeField === 'thumbnailUrl' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                    </label>
                    <RichTextField
                      name="thumbnailUrl"
                      value={formData.thumbnailUrl}
                      onChange={handleRichTextChange}
                      onFocus={handleFieldFocus}
                      placeholder="https://example.com/image.jpg"
                      isActive={activeField === 'thumbnailUrl'}
                      multiline={false}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Source URL {activeField === 'source' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                    </label>
                    <RichTextField
                      name="source"
                      value={formData.source}
                      onChange={handleRichTextChange}
                      onFocus={handleFieldFocus}
                      placeholder="https://example.com"
                      isActive={activeField === 'source'}
                      multiline={false}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Description {activeField === 'description' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                  </label>
                  <RichTextField
                    name="description"
                    value={formData.description}
                    onChange={handleRichTextChange}
                    onFocus={handleFieldFocus}
                    placeholder="Enter a brief description"
                    isActive={activeField === 'description'}
                    multiline={true}
                    rows={4}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Content {activeField === 'content' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                  </label>
                  <RichTextField
                    name="content"
                    value={formData.content}
                    onChange={handleRichTextChange}
                    onFocus={handleFieldFocus}
                    placeholder="Enter the full content"
                    isActive={activeField === 'content'}
                    multiline={true}
                    rows={6}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-2'} disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : 'Create Current Affair'}
                </button>
              </form>
            </div>
          </div>

          {/* Formatting Toolbar - Right Side */}
          <div className="lg:col-span-1">
            <FormattingToolbar 
              activeField={activeField}
              getFieldLabel={getFieldLabel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairForm;