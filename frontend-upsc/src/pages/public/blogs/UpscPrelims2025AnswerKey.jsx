import React from 'react';
import { Link } from 'react-router-dom';

const UpscPrelims2025AnswerKey = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">UPSC Prelims 2025 Answer Key</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-prelim.png" 
              alt="UPSC Prelims 2025 Answer Key" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              UPSC Prelims 2025 Answer Key
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: January 15, 2025</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The UPSC Prelims 2025 examination is one of the most anticipated events for civil services aspirants. 
                This comprehensive guide provides you with the official answer key, detailed analysis, and expert 
                insights to help you evaluate your performance and plan your next steps.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Highlights</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Official answer key release date and process</li>
                <li>Subject-wise analysis of questions</li>
                <li>Expected cut-off trends and predictions</li>
                <li>Common mistakes to avoid in answer evaluation</li>
                <li>Preparation strategy for mains examination</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Answer Key Analysis</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The UPSC Prelims 2025 answer key provides crucial insights into the examination pattern and 
                difficulty level. Our expert analysis covers all subjects including History, Geography, 
                Polity, Economy, Science & Technology, and Current Affairs.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Next Steps</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Based on your performance in the prelims, it's essential to start preparing for the mains 
                examination immediately. Focus on answer writing practice, optional subject preparation, 
                and comprehensive current affairs coverage.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Pro Tip</h3>
                <p className="text-blue-800">
                  Don't just rely on the answer key. Cross-verify your answers with multiple sources and 
                  maintain a detailed record of your performance for future reference.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blogs/upsc-mains-result-2024" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">UPSC Mains Result 2024</h4>
                  <p className="text-sm text-gray-600 mt-1">Analysis of the latest mains results</p>
                </Link>
                <Link to="/upsc-syllabus" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">UPSC Syllabus</h4>
                  <p className="text-sm text-gray-600 mt-1">Complete syllabus breakdown</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UpscPrelims2025AnswerKey;
