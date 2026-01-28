import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/coreService.js";
import { dataHandler } from "../../utils/dataHandler";
import { messageHandler } from "../../utils/messageHandler";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "GS",
    price: 0,
    duration: "",
    mode: "Online",
    startDate: "",
    endDate: "",
    language: "English",
    thumbnail: null
  });

  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
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
      
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);

    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }));
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.category || 
        formData.price <= 0 || !formData.duration.trim()) {
      messageHandler.error("Please fill all required fields.");
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('category', formData.category);
      submitData.append('price', formData.price.toString());
      submitData.append('duration', formData.duration.trim());
      submitData.append('mode', formData.mode);
      submitData.append('language', formData.language);
      
      if (formData.startDate) {
        submitData.append('startDate', formData.startDate);
      }
      
      if (formData.endDate) {
        submitData.append('endDate', formData.endDate);
      }
      if (formData.thumbnail) {
        submitData.append('thumbnail', formData.thumbnail);
      }
      for (let [key, value] of submitData.entries()) {
        // console.log(key, value);
      }

      const result = await dataHandler.handleApiCall(
        () => createCourse(submitData),
        {
          successMessage: "Course created successfully!",
          errorMessage: "Error creating course. Please try again."
        }
      );

      if (result.status === "success") {
        setFormData({
          title: "",
          description: "",
          category: "GS",
          price: 0,
          duration: "",
          mode: "Online",
          startDate: "",
          endDate: "",
          language: "English",
          thumbnail: null
        });
        setPreviewUrl("");
        messageHandler.success("Course created successfully!");
        
        // Optional: Redirect after success
        // setTimeout(() => navigate('/courses'), 2000);
      }
      
    } catch (error) {
      console.error('Submit error:', error);
      messageHandler.error(error.message || "Error creating course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Create New Course</h2>
            <p className="text-gray-600 mt-1">Add a new course to your platform</p>
          </div>
          

          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter course title"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a detailed course description..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., 3 months, 60 hours"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                  Mode
                </label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
              <div className="md:col-span-2">
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                </label>
                
                {previewUrl ? (
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="h-32 w-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Image selected: {formData.thumbnail?.name}
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-2">
                      <label htmlFor="thumbnail" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                          Click to upload
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG, WebP up to 5MB
                    </p>
                  </div>
                )}
                
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png, image/webp"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors duration-200 flex items-center ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Fields marked with * are required.</p>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;