import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { getPreparationBlogBySlug, incrementPreparationBlogViews } from '../../api/coreService';
import BlogSEO from '../../components/SEO/BlogSEO';
import { SEO_CONFIG } from '../../utils/seoUtils';

const PreparationBlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to strip HTML and get plain text
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Helper function to clean HTML content for rich display
  const cleanHtml = (html) => {
    if (!html) return '';
    
    let cleaned = html.replace(/<!--[\s\S]*?-->/g, '');
    
    cleaned = cleaned.replace(/style="[^"]*"/g, (match) => {
      const colorMatch = match.match(/color:\s*([^;]+);?/);
      const bgColorMatch = match.match(/background-color:\s*([^;]+);?/);
      
      let newStyle = '';
      if (colorMatch) newStyle += `color: ${colorMatch[1]};`;
      if (bgColorMatch) newStyle += `background-color: ${bgColorMatch[1]};`;
      
      return newStyle ? `style="${newStyle}"` : '';
    });
    
    // Remove empty style attributes
    cleaned = cleaned.replace(/\s*style=""\s*/g, ' ');
    
    return cleaned.trim();
  };

  useEffect(() => {
    // Check if slug is valid
    if (!slug || slug === 'undefined') {
      setError('Invalid blog URL');
      setLoading(false);
      return;
    }
    fetchBlogDetail();
  }, [slug]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!slug || slug === 'undefined') {
        setError('Invalid blog URL');
        setLoading(false);
        return;
      }

      const response = await getPreparationBlogBySlug(slug);
      const foundBlog = response?.data?.data;

      if (foundBlog) {
        setBlog(foundBlog);
        if (foundBlog._id) {
          incrementPreparationBlogViews(foundBlog._id).catch((err) =>
            console.error('Error incrementing views:', err)
          );
        }
      } else {
        setError('Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog detail:', error);
      const status = error?.response?.status;
      if (status === 404) {
        setError('Blog not found');
      } else {
        setError('Failed to load blog. Please try again later.');
      }
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

  const handleShare = () => {
    const shareText = blog?.shortDescription || stripHtml(blog?.content || '').slice(0, 120);
    if (navigator.share) {
      navigator.share({
        title: stripHtml(blog?.title || ''),
        text: shareText,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">{error || 'Blog not found'}</h2>
          <button
            onClick={() => navigate('/preparation-blogs')}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const plainTitle = stripHtml(blog.title);
  const metaDesc = (blog.shortDescription || stripHtml(blog.content).slice(0, 160)).trim();
  const publicApiBase = (
    import.meta.env.VITE_PUBLIC_API_URL ||
    import.meta.env.VITE_API_URL ||
    ''
  ).replace(/\/$/, '');
  const shareImageAbsolute =
    blog.file?._id && blog.file.contentType?.startsWith('image/') && publicApiBase
      ? `${publicApiBase}/api/v1/download/${blog.file._id}`
      : `${String(SEO_CONFIG.siteUrl).replace(/\/$/, '')}/images/hero.png`;
  const fileDownloadBase = publicApiBase || import.meta.env.VITE_API_URL || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <BlogSEO
        title={`${plainTitle} | MentorsDaily`}
        description={metaDesc}
        keywords={(blog.tags && blog.tags.length > 0 ? blog.tags.join(', ') : 'UPSC, preparation, MentorsDaily')}
        author="Team MentorsDaily"
        publishDate={blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined}
        modifiedDate={blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined}
        imageUrl={shareImageAbsolute}
        articleUrl={`/preparation-blog/${slug}`}
        category={blog.category || 'Preparation'}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li>/</li>
            <li><Link to="/preparation-blogs" className="hover:text-blue-600 transition">Preparation Blogs</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium truncate">{stripHtml(blog.title)}</li>
          </ol>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate('/preparation-blogs')}
          className="mb-6 inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blogs</span>
        </button>

        {/* Blog Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Featured Image/File - Full Width */}
          <div className="w-full aspect-[21/9] overflow-hidden relative bg-gray-100">
            {blog.file?._id ? (
              <>
                {/* If file is image, show it directly */}
                {blog.file.contentType?.startsWith('image/') ? (
                  <img
                    src={`${fileDownloadBase}/api/v1/download/${blog.file._id}`}
                    alt={stripHtml(blog.title)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* If file is PDF or other, show iframe preview */
                  <iframe
                    src={`${fileDownloadBase}/api/v1/download/${blog.file._id}`}
                    className="w-full h-full border-0"
                    title="File Preview"
                  />
                )}
                {/* Category Badge - Positioned without dark overlay */}
                {blog.category && (
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* No file - show gradient background */
              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    {stripHtml(blog.title)}
                  </h1>
                  {blog.category && (
                    <span className="inline-block px-4 py-2 bg-blue-600 bg-opacity-20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Blog Details Below Image */}
          <div className="p-6 md:p-10">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
              {blog.createdAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Published on: {formatDate(blog.createdAt)}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>By Team MentorsDaily</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition ml-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Short Description - Lead Paragraph */}
            {blog.shortDescription && (
              <div className="mb-8 pl-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg py-4 pr-4">
                <p className="text-lg text-gray-700 leading-relaxed font-medium italic">
                  {blog.shortDescription}
                </p>
              </div>
            )}

            {/* Blog Content */}
            {blog.content && (
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed blog-content"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(blog.content) }}
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                />
              </div>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/preparation-blogs"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition text-sm"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreparationBlogDetail;
