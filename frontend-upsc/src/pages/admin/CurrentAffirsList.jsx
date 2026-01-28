import { useEffect, useState } from "react";
import RichTextField from "../../components/RichTextField";
import FormattingToolbar from "../../components/FormattingToolbar";
import {
  fetchCurrentAffairs,
  updateCurrentAffair,
  deleteCurrentAffair,
} from "../../api/coreService";
import { messageHandler } from "../../utils/messageHandler";
import { useTheme } from "../../contexts/ThemeContext";
import { decodeHtmlEntities } from "../../utils/seoUtils";
import { formatDate } from "../../utils/dateUtils";

export default function CurrentAffirsList() {
  const { isDark } = useTheme();
  const [affairs, setAffairs] = useState([]);

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

  // Helper function to strip HTML tags and get plain text
  const stripHtmlTags = (html) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Handle card click to view details
  const handleViewDetails = (affair) => {
    setViewAffair(affair);
    setShowDetailsModal(true);
  };
  const [affairsMeta, setAffairsMeta] = useState({ page: 1, limit: 10 });
  const [hasNextPage, setHasNextPage] = useState(true);
  const [affairsLoading, setAffairsLoading] = useState(false);
  const [editAffairId, setEditAffairId] = useState(null);
  const [viewAffair, setViewAffair] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeField, setActiveField] = useState('title');
  const [editForm, setEditForm] = useState({
    title: "",
    paperName: "",
    subject: "",
    description: "",
    content: "",
    date: "",
    source: "",
    thumbnailUrl: "",
  });

  // Handle rich text field changes
  const handleRichTextChange = (fieldName, htmlContent) => {
    // Clean HTML fragments before saving
    const cleanedContent = cleanHtmlFragments(htmlContent);
    setEditForm(prev => ({ ...prev, [fieldName]: cleanedContent }));
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      'title': 'Title',
      'paperName': 'Paper Name',
      'subject': 'Subject',
      'description': 'Description',
      'content': 'Content',
      'source': 'Source URL',
      'thumbnailUrl': 'Thumbnail URL'
    };
    return labels[fieldName] || fieldName;
  };

  const loadAffairs = async (page = 1) => {
    try {
      setAffairsLoading(true);
      const limit = affairsMeta.limit;
      const res = await fetchCurrentAffairs({ page, limit });
      const newAffairs = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
      setAffairs(newAffairs);
      setAffairsMeta((prevMeta) => ({ ...prevMeta, page }));
      setHasNextPage(newAffairs.length === limit);

      if (res.data?.message) {
        messageHandler.info(res.data.message);
      }
    } catch (e) {
      const errMsg =
        e?.response?.data?.message || "Failed to load current affairs";
      setHasNextPage(false);
      messageHandler.error(errMsg);
    } finally {
      setAffairsLoading(false);
    }
  };

  useEffect(() => {
    loadAffairs(1);
  }, []);

  const startEditAffair = (affair) => {
    setEditAffairId(affair._id);
    setEditForm({
      title: affair.title || "",
      paperName: affair.paperName || "",
      subject: affair.subject || "",
      description: affair.description || "",
      content: affair.content || "",
      date: affair.date ? String(affair.date).slice(0, 10) : "",
      source: affair.source || "",
      thumbnailUrl: affair.thumbnailUrl || "",
    });
    setActiveField('title');
  };

  const handleDescriptionChange = (htmlContent) => {
    setEditForm((prev) => ({
      ...prev,
      description: htmlContent,
    }));
  };

  const handleContentChange = (htmlContent) => {
    setEditForm((prev) => ({
      ...prev,
      content: htmlContent,
    }));
  };

  // Update a current affair
  const submitEditAffair = async (e) => {
    e.preventDefault();
    if (!editAffairId) return;
    try {
      // Clean all HTML fields before submitting
      const cleanedFormData = {
        ...editForm,
        title: cleanHtmlFragments(editForm.title),
        description: cleanHtmlFragments(editForm.description),
        content: cleanHtmlFragments(editForm.content),
        paperName: cleanHtmlFragments(editForm.paperName),
        subject: cleanHtmlFragments(editForm.subject),
        thumbnailUrl: cleanHtmlFragments(editForm.thumbnailUrl),
        source: cleanHtmlFragments(editForm.source)
      };
      const res = await updateCurrentAffair(editAffairId, cleanedFormData);
      const msg = res.data?.message || "Current affair updated successfully";
      messageHandler.success(msg);
      setEditAffairId(null);
      await loadAffairs(affairsMeta.page);
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || "Failed to update current affair";
      messageHandler.error(errMsg);
    }
  };

  // Delete a current affair
  const removeAffair = async (id) => {
    try {
      const res = await deleteCurrentAffair(id);
      const msg = res.data?.message || "Current affair deleted successfully";
      messageHandler.success(msg);
      await loadAffairs(affairsMeta.page);
    } catch (err) {
      const errMsg =
        err?.response?.data?.message || "Failed to delete current affair";
      messageHandler.error(errMsg);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm p-6 border`}>
      {/* Header / Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Manage Current Affairs
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadAffairs(affairsMeta.page - 1)}
            disabled={affairsLoading || affairsMeta.page <= 1}
            className={`px-3 py-1.5 border rounded disabled:opacity-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Prev
          </button>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Page {affairsMeta.page}</span>
          <button
            onClick={() => loadAffairs(affairsMeta.page + 1)}
            disabled={affairsLoading || !hasNextPage}
            className={`px-3 py-1.5 border rounded disabled:opacity-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* {message && (
        <div className="mb-4 p-3 rounded bg-blue-50 text-blue-800 text-sm">{message}</div>
      )} */}

      {/* List / Cards */}
      {affairsLoading ? (
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</p>
      ) : affairs.length === 0 ? (
        <div className={`text-center py-12 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg border border-dashed ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
          <svg
            className={`mx-auto h-10 w-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            No current affairs found. Try adding new ones from the post page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {affairs.map((item) => (
            <div
              key={item._id}
              onClick={() => handleViewDetails(item)}
              className={`group relative cursor-pointer ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Paper Name Ribbon */}
              {item.paperName && (
                <div className="absolute -top-2 -left-2 z-20">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-none shadow-lg text-xs font-bold uppercase transform -rotate-1">
                    {decodeHtmlEntities(item.paperName)}
                  </div>
                </div>
              )}

              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-gray-600 to-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} flex items-center justify-center`}>
                    <div className={`${isDark ? 'text-gray-400' : 'text-blue-400'}`}>
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h4 
                  className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 line-clamp-2 leading-tight prose max-w-none ${isDark ? 'prose-invert' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />

                {/* Description */}
                {item.description && (
                  <div 
                    className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3 leading-relaxed prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}

                {/* Date and Source */}
                <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  {item.source && (
                    <a
                      href={item.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center gap-1 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Source
                    </a>
                  )}
                </div>

                {/* Subject Tag */}
                {item.subject && (
                  <div className="mb-4">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${isDark ? 'bg-purple-900/30 text-purple-300 border border-purple-800/50' : 'bg-purple-100 text-purple-800 border border-purple-200'}`} title={decodeHtmlEntities(item.subject)}>
                      <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="truncate">{truncateText(decodeHtmlEntities(item.subject), 35)}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditAffair(item);
                    }}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2 ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAffair(item._id);
                    }}
                    className="flex-1 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editAffairId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Edit Current Affair
                </h3>
                <button
                  onClick={() => setEditAffairId(null)}
                  className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section - Left Side */}
                <div className="lg:col-span-2">
                  <form onSubmit={submitEditAffair} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Title * {activeField === 'title' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                      </label>
                      <RichTextField
                        name="title"
                        value={editForm.title}
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
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Paper Name {activeField === 'paperName' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                        </label>
                        <RichTextField
                          name="paperName"
                          value={editForm.paperName}
                          onChange={handleRichTextChange}
                          onFocus={handleFieldFocus}
                          placeholder="Enter paper name"
                          isActive={activeField === 'paperName'}
                          multiline={false}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Subject {activeField === 'subject' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                        </label>
                        <RichTextField
                          name="subject"
                          value={editForm.subject}
                          onChange={handleRichTextChange}
                          onFocus={handleFieldFocus}
                          placeholder="Enter subject"
                          isActive={activeField === 'subject'}
                          multiline={false}
                        />
                      </div>
                    </div>
                    {/* Description */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Description {activeField === 'description' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                      </label>
                      <RichTextField
                        name="description"
                        value={editForm.description}
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
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Content {activeField === 'content' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                      </label>
                      <RichTextField
                        name="content"
                        value={editForm.content}
                        onChange={handleRichTextChange}
                        onFocus={handleFieldFocus}
                        placeholder="Enter the full content"
                        isActive={activeField === 'content'}
                        multiline={true}
                        rows={6}
                      />
                    </div>

                    {/* Date & URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                          className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Source URL {activeField === 'source' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                        </label>
                        <RichTextField
                          name="source"
                          value={editForm.source}
                          onChange={handleRichTextChange}
                          onFocus={handleFieldFocus}
                          placeholder="Enter source URL"
                          isActive={activeField === 'source'}
                          multiline={false}
                        />
                      </div>
                    </div>

                    {/* Thumbnail URL */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Thumbnail URL {activeField === 'thumbnailUrl' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                      </label>
                      <RichTextField
                        name="thumbnailUrl"
                        value={editForm.thumbnailUrl}
                        onChange={handleRichTextChange}
                        onFocus={handleFieldFocus}
                        placeholder="Enter thumbnail URL"
                        isActive={activeField === 'thumbnailUrl'}
                        multiline={false}
                      />
                    </div>

                    {/* Form Actions */}
                    <div className={`flex items-center justify-end gap-3 pt-6 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                      <button
                        type="button"
                        onClick={() => setEditAffairId(null)}
                        className={`px-6 py-3 rounded-lg transition-colors duration-200 ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
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
        </div>
      )}
      {/* Details Modal */}
      {showDetailsModal && viewAffair && (
        <div className="fixed top-0 left-0 md:left-64 right-0 bottom-0 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl w-full max-w-md sm:max-w-3xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto mx-auto`}>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {viewAffair.paperName && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold uppercase">
                      {decodeHtmlEntities(viewAffair.paperName)}
                    </div>
                  )}
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Current Affair Details
                  </h3>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Thumbnail */}
                {viewAffair.thumbnailUrl && (
                  <div className="w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={viewAffair.thumbnailUrl}
                      alt={viewAffair.title}
                      className="w-full h-auto object-contain max-h-96"
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <h1 
                    className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 prose max-w-none ${isDark ? 'prose-invert' : ''}`}
                    dangerouslySetInnerHTML={{ __html: viewAffair.title }}
                  />
                </div>

                {/* Meta Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {viewAffair.subject && (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Subject</span>
                      </div>
                      <div 
                        className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} font-semibold prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                      >
                        {decodeHtmlEntities(viewAffair.subject)}
                      </div>
                    </div>
                  )}

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Date</span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      {formatDate(viewAffair.date, { month: 'long' })}
                    </p>
                  </div>

                  {viewAffair.source && (
                    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Source</span>
                      </div>
                      <a
                        href={viewAffair.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-semibold hover:underline`}
                      >
                        View Original Article
                      </a>
                    </div>
                  )}
                </div>

                {/* Description */}
                {viewAffair.description && (
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>Description</h3>
                    <div
                      className={`prose max-w-none ${isDark ? 'prose-invert' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{ __html: cleanHtmlFragments(viewAffair.description) }}
                    />
                  </div>
                )}

                {/* Content */}
                {viewAffair.content && (
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>Full Content</h3>
                    <div
                      className={`prose max-w-none ${isDark ? 'prose-invert' : ''} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{ __html: cleanHtmlFragments(viewAffair.content) }}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className={`flex items-center justify-end gap-3 pt-6 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      startEditAffair(viewAffair);
                    }}
                    className={`px-6 py-3 rounded-lg transition-colors duration-200 ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}