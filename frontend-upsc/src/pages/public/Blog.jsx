import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPreparationBlogs } from "../../api/coreService";

const BlogCard = ({ title, subtitle, image, to, category }) => {
  return (
    <div className="group h-full">
      <Link to={to} className="block h-full flex flex-col">
        <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] bg-white flex-1 flex flex-col">
          <div className="aspect-[16/9] w-full relative overflow-hidden bg-gray-100">
            {image ? (
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-blue-400">No Image</span>
              </div>
            )}
            {/* Category Badge */}
            {category && (
               <div className="absolute top-3 left-3">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg uppercase tracking-wider">
                  {category}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-5 flex-1 flex flex-col relative">
             {/* Gradient Overlay for text readability if needed, but white bg is cleaner for cards */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
             <div className="mt-auto">
                <span className="text-sm font-medium text-blue-600 group-hover:underline">Read Article &rarr;</span>
             </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getPreparationBlogs();
        const blogsData = response?.data?.data || response?.data || [];
        const blogsArray = Array.isArray(blogsData) ? blogsData : [];
        // Sort by date if needed, assuming API returns sorted or we take latest
        // Taking first 3
        setBlogs(blogsArray.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Helper to strip HTML
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getBlogImage = (blog) => {
      if (blog.file?._id && blog.file?.contentType?.startsWith('image/')) {
          return `${import.meta.env.VITE_API_URL}/api/v1/download/${blog.file._id}`;
      }
      return null;
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

  const getBlogLink = (blog) => {
      const slug = blog.slug && blog.slug.trim() ? blog.slug : generateSlug(blog.title) || blog._id;
      return `/preparation-blog/${slug}`;
  }


  if (loading) {
      return null; // Or a loading skeleton
  }

  if (blogs.length === 0) {
      return null;
  }

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">JOURNEY</span>
          </div>
          <h2 className=" text-4xl md:text-5xl font-bold mb-4 text-gray-900">
             Latest From Our <span className="text-blue-600">Blog</span>
          </h2>
           <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest insights, tips, and strategies for your UPSC preparation journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, idx) => (
            <BlogCard 
                key={blog._id || idx} 
                title={stripHtml(blog.title)}
                subtitle={blog.category} // Using category as subtitle equivalent
                category={blog.category}
                image={getBlogImage(blog)}
                to={getBlogLink(blog)}
            />
          ))}
        </div>
        
        {/* <div className="text-center">
          <Link
             to="/preparation-blogs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>View More</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Blog;

