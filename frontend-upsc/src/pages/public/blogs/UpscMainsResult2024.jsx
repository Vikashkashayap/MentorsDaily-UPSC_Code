import React from 'react';
import { Link } from 'react-router-dom';

const UpscMainsResult2024 = () => {
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
            <li className="text-gray-900">UPSC Mains Result 2024</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-mains.png" 
              alt="UPSC Mains Result 2024" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              UPSC Mains Result 2024
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: January 10, 2025</span>
              <span className="mx-2">•</span>
              <span>7 min read</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The UPSC Mains 2024 results have been declared, marking a significant milestone for thousands 
                of civil services aspirants. This comprehensive analysis provides insights into the results, 
                trends, and what this means for future aspirants.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Result Statistics</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Total Candidates Appeared:</strong> 2,65,000+</li>
                  <li><strong>Qualified for Interview:</strong> 2,855</li>
                  <li><strong>Success Rate:</strong> 1.08%</li>
                  <li><strong>Top Rankers:</strong> 15 candidates with 1000+ marks</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Trends Observed</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Increased focus on current affairs and contemporary issues</li>
                <li>Higher weightage to answer writing quality</li>
                <li>Optional subject performance showing significant impact</li>
                <li>Geographic diversity in successful candidates</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Analysis by Subject</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The results show interesting patterns across different subjects. General Studies papers 
                continue to be the deciding factor, while optional subjects play a crucial role in 
                determining the final ranking.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Lessons for Future Aspirants</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Based on the analysis of successful candidates, certain patterns emerge that can guide 
                future aspirants in their preparation strategy. Focus on comprehensive coverage, regular 
                answer writing practice, and staying updated with current affairs.
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Success Factor</h3>
                <p className="text-green-800">
                  Consistent preparation, regular answer writing practice, and staying updated with 
                  current affairs were the common factors among successful candidates.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blogs/upsc-prelims-2025-answer-key" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">UPSC Prelims 2025 Answer Key</h4>
                  <p className="text-sm text-gray-600 mt-1">Latest answer key analysis</p>
                </Link>
                <Link to="/blogs/answer-writing-tips" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">Answer Writing Tips</h4>
                  <p className="text-sm text-gray-600 mt-1">Score high in UPSC mains</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UpscMainsResult2024;
