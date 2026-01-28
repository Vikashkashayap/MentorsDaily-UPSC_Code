import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Calendar, Eye } from 'lucide-react';
import { 
  getPreparationBlogs, 
  createPreparationBlog, 
  updatePreparationBlog, 
  deletePreparationBlog 
} from '../../api/coreService';
import { dataHandler } from '../../utils/dataHandler';
import RichTextField from '../../components/RichTextField';
import FormattingToolbar from '../../components/FormattingToolbar';

const ManagePreparationBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [activeField, setActiveField] = useState('title');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Team MentorsDaily',
    category: '',
    slug: '',
    image: null,
  });

  // Helper function to strip HTML tags and get plain text
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Helper function to generate slug from text
  const generateSlug = (text) => {
    if (!text) return '';
    const plainText = stripHtml(text);
    return plainText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Get blog slug for navigation (use existing slug, generate from title, or fallback to ID)
  const getBlogSlug = (blog) => {
    if (blog.slug && blog.slug.trim() && blog.slug !== 'undefined') {
      return blog.slug;
    }
    const generatedSlug = generateSlug(blog.title);
    if (generatedSlug && generatedSlug.trim()) {
      return generatedSlug;
    }
    // Fallback to ID if no slug can be generated
    return blog._id;
  };

  // Handle view blog - open in new tab
  const handleViewBlog = (blog) => {
    const slug = getBlogSlug(blog);
    const url = `/preparation-blog/${slug}`;
    window.open(url, '_blank');
  };

  // Auto-generate slug from title when title changes
  const handleTitleChange = (fieldName, htmlContent) => {
    setFormData(prev => {
      const newData = { ...prev, [fieldName]: htmlContent };
      // Auto-generate slug if it's empty or if user hasn't manually edited it
      if (fieldName === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        newData.slug = generateSlug(htmlContent);
      }
      return newData;
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getPreparationBlogs();
      
      // Response structure: { success: true, data: { message: "...", data: [...] } }
      const blogsData = response?.data?.data || response?.data || [];
      
      // Ensure it's always an array
      const blogsArray = Array.isArray(blogsData) ? blogsData : [];
      setBlogs(blogsArray);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      content: '',
      author: 'Team MentorsDaily',
      category: '',
      slug: '',
      image: null,
    });
    setActiveField('title');
    setShowModal(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      author: blog.author || blog.user?.name || 'Team MentorsDaily',
      category: blog.category || '',
      slug: blog.slug || generateSlug(blog.title || ''),
      image: null,
    });
    setActiveField('title');
    setShowModal(true);
  };

  const handleRichTextChange = (fieldName, htmlContent) => {
    setFormData(prev => ({ ...prev, [fieldName]: htmlContent }));
  };

  const handleFieldFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleDelete = (id) => {
    setBlogToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    const result = await dataHandler.handleApiCall(
      () => deletePreparationBlog(blogToDelete),
      {
        successMessage: 'Blog deleted successfully',
        errorMessage: 'Failed to delete blog'
      }
    );

    if (result.status === 'success') {
      fetchBlogs();
    }

    setShowDeleteConfirm(false);
    setBlogToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setBlogToDelete(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure slug is present - generate from title if empty
    let finalSlug = formData.slug?.trim();
    if (!finalSlug) {
      finalSlug = generateSlug(formData.title);
      if (!finalSlug) {
        alert('Slug is required. Please enter a URL-friendly slug or ensure the title is valid.');
        return;
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    if (formData.author) formDataToSend.append('author', formData.author);
    if (formData.category) formDataToSend.append('category', formData.category);
    formDataToSend.append('slug', finalSlug);
    
    if (formData.image) {
      formDataToSend.append('file', formData.image);
    }

    const result = await dataHandler.handleApiCall(
      () => editingBlog 
        ? updatePreparationBlog(editingBlog._id, formDataToSend)
        : createPreparationBlog(formDataToSend),
      {
        successMessage: editingBlog ? 'Blog updated successfully' : 'Blog created successfully',
        errorMessage: editingBlog ? 'Failed to update blog' : 'Failed to create blog'
      }
    );

    if (result.status === 'success') {
      setShowModal(false);
      fetchBlogs();
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Preparation Blogs</h1>
        <p className="text-gray-600">Create, edit, and manage UPSC preparation blogs</p>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Create Blog</span>
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Total Blogs</p>
          <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <p className="text-gray-600 text-sm">Filtered Results</p>
          <p className="text-2xl font-bold text-blue-600">{filteredBlogs.length}</p>
        </div>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No blogs found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-2 border-blue-200"
            >
              {/* Category Badge */}
              {blog.category && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                    {blog.category}
                  </span>
                </div>
              )}

              {/* Thumbnail */}
              <div className="h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {blog.file?._id ? (
                  blog.file.contentType?.startsWith('image/') ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/api/v1/download/${blog.file._id}`}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="text-white text-4xl font-bold">
                      {blog.title.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                  {stripHtml(blog.title)}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {stripHtml(blog.content)}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <span className="font-medium">{blog.author || blog.user?.name || 'N/A'}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewBlog(blog)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    title="View Blog (opens in new tab)"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Delete Blog
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 sticky top-0 bg-white z-10 border-b border-gray-200 rounded-t-xl">
              <h2 className="text-2xl font-bold mb-4">
                {editingBlog ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              
              <div className="flex gap-6 mt-4">
                {/* Left Side - Form Fields */}
                <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <RichTextField
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    onFocus={handleFieldFocus}
                    placeholder="Enter blog title"
                    multiline={false}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <RichTextField
                    name="content"
                    value={formData.content}
                    onChange={handleRichTextChange}
                    onFocus={handleFieldFocus}
                    placeholder="Enter blog content with multiple paragraphs..."
                    multiline={true}
                    rows={20}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use the formatting toolbar on the right to add headings, lists, colors, etc.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    onFocus={() => handleFieldFocus('slug')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="url-friendly-slug"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly identifier (e.g., "upsc-100-days-preparation-plan")
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    onFocus={() => handleFieldFocus('category')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., General, Prelims, Mains"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    onFocus={() => handleFieldFocus('author')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {editingBlog?.image && (
                    <p className="text-sm text-gray-500 mt-1">Current image will be replaced if you upload a new one</p>
                  )}
                </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        {editingBlog ? 'Update' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Side - Formatting Toolbar */}
                <div className="w-80 flex-shrink-0">
                  <div className="sticky top-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Formatting Tools</h3>
                    <FormattingToolbar 
                      activeField={activeField}
                      fieldValue={formData[activeField] || ''}
                      onFormat={handleRichTextChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePreparationBlogs;
