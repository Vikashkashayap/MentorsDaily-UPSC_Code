import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  getAllFreeResources,
  createFreeResource,
  updateFreeResource,
  deleteFreeResource,
  getAvailableCategories,
  getDifficultyLevels,
  getCategorySubcategories,
  getSubcategoriesForCategory
} from '../../api/freeResourceService';
import { showSuccess, showError } from '../../utils/messageHandler';
import { useTheme } from '../../contexts/ThemeContext';
import RichTextField from '../../components/RichTextField';
import FormattingToolbar from '../../components/FormattingToolbar';
import DataTable from '../../components/DataTable';

export default function ManageFreeResources() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileSize: '',
    category: '',
    subcategory: '',
    categories: [],
    difficulty: 'Intermediate'
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeField, setActiveField] = useState('title');
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, resourceId: null, resourceTitle: '' });
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchResources();
    }
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await getAllFreeResources();
      // Handle different response structures
      const resourcesData = response?.data?.data || response?.data || [];
      setResources(Array.isArray(resourcesData) ? resourcesData : []);

      // Show backend success message
      if (response?.data?.message) {
        showSuccess(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to fetch resources';
      showError(errorMessage);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (resource = null) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        title: resource.title,
        description: resource.description,
        fileSize: resource.fileSize,
        category: resource.category || (resource.categories && resource.categories[0]) || '',
        subcategory: resource.subcategory || '',
        categories: resource.categories || [],
        difficulty: resource.difficulty
      });
    } else {
      setEditingResource(null);
      setFormData({
        title: '',
        description: '',
        fileSize: '',
        category: '',
        subcategory: '',
        categories: [],
        difficulty: 'Intermediate'
      });
    }
    setFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      fileSize: '',
      category: '',
      subcategory: '',
      categories: [],
      difficulty: 'Intermediate'
    });
    setFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (fieldName, htmlContent) => {
    setFormData(prev => ({ ...prev, [fieldName]: htmlContent }));
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: selectedCategory,
      subcategory: '', // Reset subcategory when category changes
      categories: selectedCategory ? [selectedCategory] : []
    }));
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      subcategory: selectedSubcategory
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Auto-fill file size
      const sizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      setFormData(prev => ({ ...prev, fileSize: `${sizeInMB} MB` }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      showError('Please fill all required fields (Title, Description, and Category)');
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('fileSize', formData.fileSize);
      data.append('category', formData.category);
      if (formData.subcategory) {
        data.append('subcategory', formData.subcategory);
      }
      data.append('categories', JSON.stringify(formData.categories));
      data.append('difficulty', formData.difficulty);

      if (file) {
        data.append('file', file);
      }

      let response;
      if (editingResource) {
        response = await updateFreeResource(editingResource._id, data);
      } else {
        response = await createFreeResource(data);
      }

      // Show backend message
      if (response?.data?.message) {
        showSuccess(response.data.message);
      } else {
        showSuccess(`Resource ${editingResource ? 'updated' : 'created'} successfully!`);
      }

      await fetchResources();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving resource:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to save resource';
      showError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (resource) => {
    setDeleteConfirm({
      show: true,
      resourceId: resource._id,
      resourceTitle: resource.title
    });
  };

  const handleDeleteConfirm = async () => {
    const { resourceId } = deleteConfirm;

    try {
      const response = await deleteFreeResource(resourceId);

      if (response?.data?.message) {
        showSuccess(response.data.message);
      } else {
        showSuccess('Resource deleted successfully!');
      }

      await fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to delete resource';
      showError(errorMessage);
    } finally {
      setDeleteConfirm({ show: false, resourceId: null, resourceTitle: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, resourceId: null, resourceTitle: '' });
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Manage Free Resources
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Upload and manage study materials for students
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Resource
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading resources...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className={`hidden lg:block ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border`}>
            <DataTable
              columns={[
                {
                  header: 'Title',
                  accessor: 'title',
                  render: (resource) => (
                    <div>
                      <div
                        className={`text-sm font-medium ${isDark ? 'text-white [&_*]:!text-white' : 'text-gray-900'} prose max-w-none prose-sm line-clamp-1`}
                        dangerouslySetInnerHTML={{ __html: resource.title }}
                      />
                      <div
                        className={`text-sm ${isDark ? 'text-gray-300 [&_*]:!text-gray-300' : 'text-gray-500'} truncate max-w-xs prose prose-sm mt-1`}
                        dangerouslySetInnerHTML={{ __html: resource.description }}
                      />
                    </div>
                  )
                },
                {
                  header: 'Category',
                  accessor: 'category',
                  render: (resource) => (
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {resource.category || (resource.categories && resource.categories[0]) || 'N/A'}
                      </span>
                      {resource.subcategory && (
                        <span className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                          {resource.subcategory}
                        </span>
                      )}
                    </div>
                  )
                },
                { header: 'Difficulty', accessor: 'difficulty' },
                { header: 'Size', accessor: 'fileSize' },
                {
                  header: 'Downloads',
                  accessor: 'downloadCount',
                  render: (resource) => resource.downloadCount || 0
                },
                {
                  header: 'Actions',
                  accessor: '_id',
                  headerClassName: 'text-right',
                  cellClassName: 'text-right',
                  render: (resource) => (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/free-resource/${resource._id}`)}
                        className="text-green-600 hover:text-green-900"
                        title="View Details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.642 0 8.578 2.51 9.964 6.678.07.214.07.43 0 .644C20.578 16.49 16.64 19 12 19c-4.642 0-8.578-2.51-9.964-6.678zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleOpenModal(resource)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(resource)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )
                }
              ]}
              data={resources}
              maxHeight="600px"
              emptyMessage="No resources found. Click 'Add Resource' to create one."
              stickyHeader={true}
            />
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {resources.length === 0 ? (
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No resources found. Click "Add Resource" to create one.
              </div>
            ) : (
              resources.map((resource) => (
                <div key={resource._id} className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-4`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0 pr-3">
                      <h3
                        className={`text-base md:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} prose max-w-none prose-sm line-clamp-2`}
                        dangerouslySetInnerHTML={{ __html: resource.title }}
                      />
                      <p
                        className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1 line-clamp-2 prose max-w-none prose-sm`}
                        dangerouslySetInnerHTML={{ __html: resource.description }}
                      />
                    </div>
                    <span className={`flex-shrink-0 ml-2 px-2 py-1 text-xs rounded whitespace-nowrap ${resource.difficulty === 'Beginner' ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                      resource.difficulty === 'Intermediate' ? (isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                        (isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                      }`}>
                      {resource.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                      {resource.category || (resource.categories && resource.categories[0]) || 'N/A'}
                    </span>
                    {resource.subcategory && (
                      <span className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                        {resource.subcategory}
                      </span>
                    )}
                  </div>

                  <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3 pb-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span>Size: {resource.fileSize}</span>
                    <span>Downloads: {resource.downloadCount || 0}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    <button
                      onClick={() => navigate(`/free-resource/${resource._id}`)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isDark
                        ? 'text-green-400 border border-green-700 hover:bg-green-900/30'
                        : 'text-green-600 border border-green-600 hover:bg-green-50'
                        }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.642 0 8.578 2.51 9.964 6.678.07.214.07.43 0 .644C20.578 16.49 16.64 19 12 19c-4.642 0-8.578-2.51-9.964-6.678zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => handleOpenModal(resource)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isDark
                        ? 'text-blue-400 border border-blue-700 hover:bg-blue-900/30'
                        : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                        }`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(resource)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isDark
                        ? 'text-red-400 border border-red-700 hover:bg-red-900/30'
                        : 'text-red-600 border border-red-600 hover:bg-red-50'
                        }`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border-2 max-w-6xl w-full my-8 max-h-[95vh] overflow-y-auto`}>
            <div className={`flex justify-between items-center p-4 md:p-6 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} sticky top-0 z-10`}>
              <h2 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <button onClick={handleCloseModal} className={`${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
              {/* Form Section */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Title * {activeField === 'title' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                    </label>
                    <RichTextField
                      name="title"
                      value={formData.title}
                      onChange={handleRichTextChange}
                      onFocus={handleFieldFocus}
                      placeholder="Enter resource title"
                      isActive={activeField === 'title'}
                      multiline={false}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Description * {activeField === 'description' && <span className="text-blue-500 text-xs">(Active in Editor)</span>}
                    </label>
                    <RichTextField
                      name="description"
                      value={formData.description}
                      onChange={handleRichTextChange}
                      onFocus={handleFieldFocus}
                      placeholder="Enter detailed resource description with formatting"
                      isActive={activeField === 'description'}
                      multiline={true}
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      File <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>(Optional)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose File
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                        />
                      </label>
                      {file && <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{file.name}</span>}
                      {editingResource && !file && (
                        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Current file will be kept if not changed
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                      You can add resource with just description, file upload is optional
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      File Size <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="fileSize"
                      value={formData.fileSize}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.5 MB (auto-filled if file selected)"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      required
                    >
                      <option value="">Select a category</option>
                      {getAvailableCategories().map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {formData.category && getSubcategoriesForCategory(formData.category).length > 0 && (
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        Subcategory <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>(Optional)</span>
                      </label>
                      <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleSubcategoryChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                      >
                        <option value="">Select a subcategory (Optional)</option>
                        {getSubcategoriesForCategory(formData.category).map(subcat => (
                          <option key={subcat} value={subcat}>{subcat}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Difficulty Level
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                    >
                      {getDifficultyLevels().map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className={`w-full sm:w-auto px-6 py-2 border rounded-lg transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      {submitting ? 'Saving...' : editingResource ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Formatting Toolbar Sidebar */}
              <div className="lg:col-span-1">
                <div className={`sticky top-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg p-4 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                    Text Formatting
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    Currently editing: <span className="font-medium text-blue-500">{activeField === 'title' ? 'Title' : 'Description'}</span>
                  </p>
                  <FormattingToolbar
                    activeField={activeField}
                    currentValue={formData[activeField] || ''}
                    onFormat={handleRichTextChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20">
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-2xl border-2 max-w-md w-full p-6 animate-fadeIn`}>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <svg className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>

            <h3 className={`text-xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Delete Resource?
            </h3>

            <p className={`text-center mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Are you sure you want to delete this resource? This action cannot be undone.
            </p>

            <div
              className={`p-3 rounded-lg mb-6 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border`}
            >
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Resource:
              </p>
              <div
                className={`text-sm mt-1 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: deleteConfirm.resourceTitle }}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
