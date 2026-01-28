import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, User, Search, ArrowRight } from 'lucide-react';
import { getPreparationBlogs } from '../../api/coreService';

const PreparationBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Helper function to strip HTML tags
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

  // Get slug for blog (use existing slug or generate from title)
  const getBlogSlug = (blog) => {
    if (blog.slug && blog.slug.trim()) {
      return blog.slug;
    }
    // Generate slug from title as fallback
    return generateSlug(blog.title) || blog._id;
  };

  // Handle blog click with validation
  const handleBlogClick = (blog) => {
    const slug = getBlogSlug(blog);
    if (slug && slug !== 'undefined') {
      navigate(`/preparation-blog/${slug}`);
    } else {
      console.error('Cannot navigate: blog slug is invalid', blog);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getPreparationBlogs();
      
      // Response structure: { success: true, data: { message: "...", data: [...] } }
      const blogsData = response?.data?.data || response?.data || [];
      
      // Ensure it's always an array
      const blogsArray = Array.isArray(blogsData) ? blogsData : [];
      setBlogs(blogsArray);
      setFilteredBlogs(blogsArray);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
      setFilteredBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-blue-100">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li>/</li>
              <li className="text-white font-medium">Preparation Blogs</li>
            </ol>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              UPSC Preparation Blogs
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Expert insights, strategies, and tips to ace your UPSC preparation journey
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition shadow-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredBlogs.length}</span> of{' '}
            <span className="font-semibold text-blue-600">{blogs.length}</span> blogs
          </p>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new content'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleBlogClick(blog)}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
              >
                {/* Thumbnail/Featured Image */}
                {blog.file?._id && (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                    {blog.file.contentType?.startsWith('image/') ? (
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/api/v1/download/${blog.file._id}`}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-blue-600" />
                      </div>
                    )}
                    {/* Category Badge on Image */}
                    {blog.category && (
                      <span className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded font-medium shadow-lg">
                        {blog.category}
                      </span>
                    )}
                  </div>
                )}

                {/* Compact Header */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2">
                    {stripHtml(blog.title)}
                  </h3>
                  
                  {/* Content Preview */}
                  {blog.content && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {stripHtml(blog.content)}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Team MentorsDaily</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlogClick(blog);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm bg-blue-600 text-white font-medium hover:bg-blue-700 transition rounded-lg"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default PreparationBlogs;
