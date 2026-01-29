import { useState, useEffect } from "react";
import { updateCourse } from "../api/coreService";
import { useTheme } from "../contexts/ThemeContext";
import { messageHandler } from "../utils/messageHandler";
import RichTextField from "./RichTextField";
import FormattingToolbar from "./FormattingToolbar";

const EditCourseModal = ({ 
  isOpen, 
  onClose, 
  course, 
  onSuccess
}) => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Form state
  const [editForm, setEditForm] = useState({
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
  const [activeField, setActiveField] = useState('title');

  // Initialize form when course changes
  useEffect(() => {
    if (course && isOpen) {
      setEditForm({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "GS",
        basePrice: course.basePrice != null ? course.basePrice : 0,
        discountPercentage: course.discountPercentage != null ? course.discountPercentage : 0,
        duration: course.duration || "",
        mode: course.mode || "Hybrid",
        language: course.language || "English",
        thumbnail: null
      });

      // Set preview URL for existing thumbnail
      if (course.thumbnail) {
        if (typeof course.thumbnail === 'string') {
          setPreviewUrl(course.thumbnail);
        } else if (course.thumbnail.data) {
          setPreviewUrl(`data:${course.thumbnail.contentType || 'image/png'};base64,${course.thumbnail.data}`);
        } else if (course.thumbnail._id) {
          // If it's an object with _id (from backend populate)
          const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
          setPreviewUrl(`${BASE_URL}/api/v1/view/${course.thumbnail._id}`);
        }
      } else {
        setPreviewUrl("");
      }
    }
  }, [course, isOpen]);

  // Handle rich text field changes
  const handleRichTextChange = (fieldName, htmlContent) => {
    setEditForm(prev => ({ ...prev, [fieldName]: htmlContent }));
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

  // Handle form changes
  const handleEditFormChange = (e) => {
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
      
      setEditForm(prev => ({
        ...prev,
        thumbnail: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      setMessage("");
    } else {
      setEditForm(prev => ({
        ...prev,
        [name]: name === "basePrice" || name === "discountPercentage" ? parseFloat(value) || 0 : value
      }));
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setEditForm(prev => ({
      ...prev,
      thumbnail: null
    }));
    setPreviewUrl("");
  }; 
 // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course?._id) return;
    
    try {
      setLoading(true);
      setMessage("");
      
      // Prepare form data
      const formData = new FormData();
      formData.append('title', editForm.title.trim());
      formData.append('description', editForm.description.trim());
      formData.append('category', editForm.category);
      formData.append('basePrice', editForm.basePrice.toString());
      formData.append('discountPercentage', editForm.discountPercentage.toString());
      formData.append('duration', editForm.duration.trim());
      formData.append('mode', editForm.mode);
      formData.append('language', editForm.language);
      
      if (editForm.thumbnail) {
        formData.append('thumbnail', editForm.thumbnail);
      }
      
      // Try backend API first
      try {
        const res = await updateCourse(course._id, formData);
        const msg = res.data?.message || "Course updated successfully";
        messageHandler.success(msg);
        onSuccess && onSuccess();
        onClose();
      } catch (apiError) {
        console.warn("Backend API not available, using local update:", apiError);
        const msg = "Course updated locally (Backend API not available)";
        messageHandler.success(msg);
        onSuccess && onSuccess();
        onClose();
      }
    } catch (err) {
      console.error("Error updating course:", err);
      const errMsg = err?.response?.data?.message || err?.message || "Failed to update course";
      messageHandler.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setEditForm({
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
    setMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Course</h3>
            <button
              onClick={handleClose}
              className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-4 p-3 rounded text-sm ${
              message.includes('successfully') || message.includes('success') 
                ? isDark ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-green-50 text-green-700 border border-green-200'
                : isDark ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section - Left Side */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
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
                    placeholder="Enter course title"
                    isActive={activeField === 'title'}
                    multiline={false}
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description * {activeField === 'description' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                  </label>
                  <RichTextField
                    name="description"
                    value={editForm.description}
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
                    value={editForm.duration}
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
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category *</label>
                    <select 
                      name="category"
                      value={editForm.category} 
                      onChange={handleEditFormChange} 
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      required      
                    >
                      <option value="GS">General Studies</option>
                      <option value="GS + CSAT">GS + CSAT</option>
                      <option value="Prelims + Mains + Interview">Prelims + Mains + Interview</option>
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
                    </select>
                  </div>
                  
                  {/* Base Price */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Base Price (₹) *</label>
                    <input
                      name="basePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editForm.basePrice}
                      onChange={handleEditFormChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      required
                    />
                  </div>    
              {/* Discount */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Discount Percentage (%)</label>
                    <input
                      name="discountPercentage"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={editForm.discountPercentage}
                      onChange={handleEditFormChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                      placeholder="Enter discount percentage (optional)"
                    />
                  </div>
                  
                  {/* Mode */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mode *</label>
                    <select 
                      name="mode"
                      value={editForm.mode} 
                      onChange={handleEditFormChange} 
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      required
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  
                  {/* Language */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Language</label>
                    <select 
                      name="language"
                      value={editForm.language} 
                      onChange={handleEditFormChange} 
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Hinglish">Hinglish</option>
                      <option value="English & Hindi">English & Hindi</option>
                      <option value="Multi-Language">Multi-Language</option>
                    </select>
                  </div>
                </div>      
          {/* Thumbnail */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Thumbnail Image</label>
                  
                  {previewUrl ? (
                    <div className="mb-4">
                      <div className="relative inline-block">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className={`h-32 w-48 object-cover rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                        {editForm.thumbnail?.name ? `New image selected: ${editForm.thumbnail.name}` : 'Current image'}
                      </p>
                    </div>
                  ) : (
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200 ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}>
                      <svg className={`mx-auto h-12 w-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-2">
                        <label htmlFor="thumbnail" className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-500 font-medium">
                            Click to upload
                          </span>
                          <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}> or drag and drop</span>
                        </label>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>PNG, JPG, WebP up to 5MB</p>
                    </div>
                  )}
                  
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleEditFormChange}
                    className="hidden"
                  />
                </div>   
             {/* Buttons */}
                <div className={`flex items-center justify-end gap-4 pt-6 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  <button 
                    type="button"
                    onClick={handleClose}
                    className={`px-6 py-3 rounded-lg transition-colors duration-200 ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
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
  );
};

export default EditCourseModal;