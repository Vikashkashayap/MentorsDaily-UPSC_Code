import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, User, Search, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPreparationBlogs } from '../../api/coreService';

const PAGE_SIZE = 6;
const SEARCH_DEBOUNCE_MS = 350;

const PreparationBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const generateSlug = (text) => {
    if (!text) return '';
    const plainText = stripHtml(text);
    return plainText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const getBlogSlug = (blog) => {
    if (blog.slug && blog.slug.trim()) {
      return blog.slug;
    }
    return generateSlug(blog.title) || blog._id;
  };

  const handleBlogClick = (blog) => {
    const slug = getBlogSlug(blog);
    if (slug && slug !== 'undefined') {
      navigate(`/preparation-blog/${slug}`);
    } else {
      console.error('Cannot navigate: blog slug is invalid', blog);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPreparationBlogs({
        page: currentPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
      });

      const envelope = response?.data;
      const payload = envelope?.data;

      if (payload && Array.isArray(payload.blogs)) {
        setBlogs(payload.blogs);
        setTotal(typeof payload.total === 'number' ? payload.total : 0);
      } else {
        let blogsData = Array.isArray(payload) ? payload : [];
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          blogsData = blogsData.filter(
            (blog) =>
              blog.title?.toLowerCase().includes(q) ||
              blog.content?.toLowerCase().includes(q) ||
              blog.category?.toLowerCase().includes(q)
          );
        }
        setTotal(blogsData.length);
        const start = (currentPage - 1) * PAGE_SIZE;
        setBlogs(blogsData.slice(start, start + PAGE_SIZE));
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startItem = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, total);

  if (loading && blogs.length === 0) {
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

        <div className="mb-8 text-center">
          <p className="text-gray-600">
            {total > 0 ? (
              <>
                Showing <span className="font-semibold text-blue-600">{startItem}</span>
                {'–'}
                <span className="font-semibold text-blue-600">{endItem}</span> of{' '}
                <span className="font-semibold text-blue-600">{total}</span> blogs
              </>
            ) : (
              <>No blogs to show</>
            )}
          </p>
        </div>

        <div className={`relative ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new content'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => handleBlogClick(blog)}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                >
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
                      {blog.category && (
                        <span className="absolute top-2 right-2 px-2 py-1 text-xs bg-blue-600 text-white rounded font-medium shadow-lg">
                          {blog.category}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2">
                      {stripHtml(blog.title)}
                    </h3>

                    {(blog.shortDescription || blog.content) && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {blog.shortDescription
                          ? blog.shortDescription
                          : stripHtml(blog.content).slice(0, 120) + (stripHtml(blog.content).length > 120 ? '…' : '')}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 shrink-0" />
                        <span>Team MentorsDaily</span>
                      </div>
                    </div>

                    <button
                      type="button"
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

        {totalPages > 1 && (
          <nav
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            aria-label="Blog pagination"
          >
            <button
              type="button"
              disabled={currentPage <= 1 || loading}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page <span className="font-semibold text-blue-600">{currentPage}</span> of{' '}
              <span className="font-semibold text-blue-600">{totalPages}</span>
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages || loading}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PreparationBlogs;
