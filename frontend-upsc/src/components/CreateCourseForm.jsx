import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { createCourse } from "../api/coreService";
import { messageHandler } from "../utils/messageHandler";
import RichTextField from "./RichTextField";
import FormattingToolbar from "./FormattingToolbar";
import { useTheme } from "../contexts/ThemeContext";

const CreateCourseForm = ({ 
  onSuccess, 
  onCancel, 
  isModal = false,
  title = "Create New Course"
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "GS",
    basePrice: 0,
    discountPercentage: 0,
    duration: "",
    mode: "Hybrid",
    language: "English",
    thumbnail: null
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeField, setActiveField] = useState('title');
  const { isDark } = useTheme();

  // Handle rich text field changes
  const handleRichTextChange = (fieldName, htmlContent) => {
    setForm(prev => ({ ...prev, [fieldName]: htmlContent }));
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      'title': 'Course Title',
      'description': 'Course Description',
      'duration': 'Duration'
    };
    return labels[fieldName] || fieldName;
  };

  // Handle form changes including file upload
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "thumbnail" && files && files[0]) {
      const file = files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024;
      
      if (!validTypes.includes(file.type)) {
        messageHandler.error("Please upload a valid image (JPEG, JPG, PNG, WebP)");
        return;
      }
      
      if (file.size > maxSize) {
        messageHandler.error("Image size should be less than 5MB");
        return;
      }
      
      setForm(prev => ({
        ...prev,
        thumbnail: file
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({
        ...prev,
        [name]:
          name === "basePrice" || name === "discountPercentage"
            ? parseFloat(value) || 0
            : value
      }));
    }
  };

  const handleRemoveImage = () => {
    setForm(prev => ({
      ...prev,
      thumbnail: null
    }));
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('description', form.description.trim());
      formData.append('category', form.category);
      formData.append('basePrice', form.basePrice.toString());
      formData.append('discountPercentage', form.discountPercentage.toString());
      formData.append('duration', form.duration.trim());
      formData.append('mode', form.mode);
      formData.append('language', form.language);
      if (form.thumbnail) {
        formData.append('thumbnail', form.thumbnail);
      }
      const res = await createCourse(formData);
      const msg = res.data?.message || "Course created successfully";
      messageHandler.success(msg);
      
      // Reset form
      setForm({
        title: "",
        description: "",
        category: "GS",
        basePrice: 0,
        discountPercentage: 0,
        duration: "",
        mode: "Hybrid",
        language: "English",
        thumbnail: null
      });
      setPreviewUrl("");
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error creating course:", err);
      const errMsg = err?.response?.data?.message || err?.message || "Failed to create course";
      messageHandler.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewSubmit = (e) => {
    // Prevent double submit
    setShowPreview(false);
    setTimeout(() => {
      handleSubmit(e);
    }, 0);
  };

  const formContent = (
    <div className={isDark ? 'dark' : ''}>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section - Left Side */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Title */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Course Title * {activeField === 'title' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                </label>
                <RichTextField
                  name="title"
                  value={form.title}
                  onChange={handleRichTextChange}
                  onFocus={handleFieldFocus}
                  placeholder="Enter course title"
                  isActive={activeField === 'title'}
                  multiline={false}
                />
              </div>

              {/* Course Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description * {activeField === 'description' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                </label>
                <RichTextField
                  name="description"
                  value={form.description}
                  onChange={handleRichTextChange}
                  onFocus={handleFieldFocus}
                  placeholder="Enter course description"
                  isActive={activeField === 'description'}
                  multiline={true}
                  rows={4}
                />
              </div>

              {/* Duration */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Duration {activeField === 'duration' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                </label>
                <RichTextField
                  name="duration"
                  value={form.duration}
                  onChange={handleRichTextChange}
                  onFocus={handleFieldFocus}
                  placeholder="e.g., 6 months, 1 year"
                  isActive={activeField === 'duration'}
                  multiline={false}
                />
              </div>

              {/* Course Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="GS">General Studies</option>
                    <option value="GS + CSAT">GS + CSAT</option>
                    <option value="Prelims + Mains + Interview">Prelims + Mains + Interview</option>
                    <option value="Prelims + Mains">Prelims + Mains</option>
                    <option value="Prelims">Prelims</option>
                    <option value="Mains">Mains</option>
                    <option value="Interview">Interview</option>
                    <option value="Essay">Essay</option>
                    <option value="Ethics">Ethics</option>
                    <option value="Optional">Optional</option>
                    <option value="Current Affairs">Current Affairs</option>
                    <option value="Test Series">Test Series</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="Counselling">Counselling</option>
                    <option value="UPSC">UPSC</option>
                  </select>
                </div>
                
                {/* Base Price */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="basePrice"
                    value={form.basePrice}
                    onChange={handleFormChange}
                    required
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter course base price"
                  />
                </div>
                
                {/* Discount Percentage */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    name="discountPercentage"
                    value={form.discountPercentage}
                    onChange={handleFormChange}
                    max="100"
                    step="1"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter discount percentage (optional)"
                  />
                </div>
                
                {/* Mode */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Mode *
                  </label>
                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                
                {/* Language */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Language *
                  </label>
                  <select
                    name="language"
                    value={form.language}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Hinglish">Hinglish</option>
                    <option value="English & Hindi">English & Hindi</option>
                    <option value="English & Hinglish">English & Hinglish</option>
                    <option value="Hindi & Hinglish">Hindi & Hinglish</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Odia">Odia</option>
                    <option value="Assamese">Assamese</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Sanskrit">Sanskrit</option>
                    <option value="Multi-Language">Multi-Language</option>
                  </select>
                </div>
              </div>

              {/* Course Thumbnail */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Course Thumbnail
                </label>
                <div className="space-y-4">
                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Course thumbnail preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {/* File Input */}
                  <div>
                    <input
                      type="file"
                      name="thumbnail"
                      onChange={handleFormChange}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                        isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Upload a course thumbnail (JPEG, JPG, PNG, WebP). Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className={`flex flex-wrap items-center justify-end gap-3 pt-6 border-t ${
                isDark ? 'border-gray-600' : 'border-gray-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 border ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600' 
                      : 'bg-neutral-100 hover:bg-neutral-200 text-gray-700 border-gray-300'
                  }`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' 
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || showPreview}
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
                >
                  {loading ? "Creating..." : "Create Course"}
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
  );

  // Preview Modal Content
  const showDiscount = form.discountPercentage > 0;
  const computedSellingPrice = showDiscount && form.basePrice > 0 ? Math.round(form.basePrice * (1 - form.discountPercentage/100)) : form.basePrice;

  const previewContent = (
    <div className="fixed inset-0 bg-white bg-opacity-100 z-[100] flex items-center justify-center">
      <div className="relative w-full max-w-7xl max-w-[92vw] mx-auto bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] border-2 border-blue-200 px-0 py-0 animate-fadeIn">
        <button
          onClick={() => setShowPreview(false)}
          className="absolute top-4 right-6 z-50 text-gray-500 hover:text-red-600 px-4 py-2 text-3xl font-bold focus:outline-none transition-colors"
        >
          &times;
        </button>
        <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12 space-y-10 max-h-[85vh] overflow-y-auto">
          {previewUrl && (
            <div className="mb-10 mx-auto flex items-center justify-center">
              <img src={previewUrl} alt="thumbnail preview" className="rounded-xl h-52 w-auto border shadow-xl mx-auto" />
            </div>
          )}
          <div>
            <h2 
              className="text-3xl font-bold mb-2 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: form.title }}
            />
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mr-2">{form.category}</span>
            <span 
              className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium ml-2 prose max-w-none prose-xs"
              dangerouslySetInnerHTML={{ __html: form.mode }}
            />
            <span 
              className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium ml-2 prose max-w-none prose-xs"
              dangerouslySetInnerHTML={{ __html: form.language }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <div className="prose max-w-none mt-1" dangerouslySetInnerHTML={{ __html: form.description }} />
          </div>
          <div className="flex gap-8 flex-wrap text-xl">
            <div className="font-semibold ">Base Price: <span className="font-normal">₹{form.basePrice}</span></div>
            {showDiscount && (
              <div className="font-semibold text-green-800">Discount: <span className="font-normal">{form.discountPercentage}%</span></div>
            )}
            <div className="font-semibold ">Final Price: <span className="font-bold text-blue-800">₹{computedSellingPrice}</span></div>
            <div>
              <b>Duration:</b> 
              <span 
                className="prose max-w-none prose-sm inline"
                dangerouslySetInnerHTML={{ __html: form.duration }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-6 border-t mt-8 border-gray-200">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePreviewSubmit}
              disabled={loading}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <>
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[90] p-4">
            {previewContent}
          </div>
        )}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`sticky top-0 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 rounded-t-xl`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
                <button
                  onClick={onCancel}
                  className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-200`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {formContent}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[90] p-4">
          {previewContent}
        </div>
      )}
      <div className="w-full">
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-16 z-40 backdrop-blur-sm`}>
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Fill in the details to add a new course</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          {formContent}
        </div>
      </div>
    </>
  );
};

export default CreateCourseForm;
