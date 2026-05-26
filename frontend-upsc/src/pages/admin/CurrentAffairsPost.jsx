import { useState, useEffect } from 'react';
import { createCurrentAffair } from '../../api/coreService';
import { dataHandler } from '../../utils/dataHandler';
import { messageHandler } from '../../utils/messageHandler';
import { useTheme } from '../../contexts/ThemeContext';
import RichTextField from '../../components/RichTextField';
import FormattingToolbar from '../../components/FormattingToolbar';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_THUMB_BYTES = 10 * 1024 * 1024;

const CurrentAffairForm = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    source: '',
    paperName: '',
    subject: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState('title');

  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [thumbnailPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      messageHandler.error('Please choose a JPEG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > MAX_THUMB_BYTES) {
      messageHandler.error('Image must be under 10 MB.');
      return;
    }
    setThumbnailFile(file);
    setThumbnailPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const cleanHtmlFragments = (html = "") => {
    if (!html) return "";
    try {
      return html
        .replace(/<!--\s*StartFragment\s*-->/gi, '')
        .replace(/<!--\s*EndFragment\s*-->/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();
    } catch {
      return html;
    }
  };

  const handleRichTextChange = (fieldName, htmlContent) => {
    const cleanedContent = cleanHtmlFragments(htmlContent);
    setFormData(prev => ({ ...prev, [fieldName]: cleanedContent }));
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      'title': 'Title',
      'paperName': 'Paper Name',
      'subject': 'Subject',
      'source': 'Source URL',
      'description': 'Description',
      'content': 'Content'
    };
    return labels[fieldName] || fieldName;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleaned = {
      title: cleanHtmlFragments(formData.title),
      description: cleanHtmlFragments(formData.description),
      content: cleanHtmlFragments(formData.content),
      paperName: cleanHtmlFragments(formData.paperName),
      subject: cleanHtmlFragments(formData.subject),
      source: cleanHtmlFragments(formData.source),
      date: formData.date,
    };

    const fd = new FormData();
    fd.append('title', cleaned.title);
    fd.append('description', cleaned.description);
    fd.append('content', cleaned.content);
    fd.append('paperName', cleaned.paperName);
    fd.append('subject', cleaned.subject);
    fd.append('source', cleaned.source);
    if (cleaned.date) fd.append('date', cleaned.date);
    if (thumbnailFile) fd.append('thumbnail', thumbnailFile);

    const result = await dataHandler.handleApiCall(
      () => createCurrentAffair(fd),
      {
        successMessage: "Current affair created successfully!",
        errorMessage: "Error creating current affair. Please try again."
      }
    );

    if (result.status === "success") {
      setFormData({
        title: '',
        description: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        source: '',
        paperName: '',
        subject: ''
      });
      clearThumbnail();
      setActiveField('title');
    }

    setIsSubmitting(false);
  };

  const inputClass = `w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border`}>
              <form onSubmit={handleSubmit} className="space-y-6">

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Thumbnail image (uploads to S3)
                    </label>
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      JPEG, PNG, WebP or GIF — optional; stored as a public URL after upload.
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleThumbnailFile}
                      className={inputClass}
                    />
                    {thumbnailPreview && (
                      <div className="mt-3 relative inline-block">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="max-h-40 rounded-lg border border-gray-200 dark:border-gray-600 object-cover"
                        />
                        <button
                          type="button"
                          onClick={clearThumbnail}
                          className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Remove image
                        </button>
                      </div>
                    )}
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
