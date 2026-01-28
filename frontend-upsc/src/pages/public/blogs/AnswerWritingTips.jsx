import React from 'react';
import { Link } from 'react-router-dom';

const AnswerWritingTips = () => {
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
            <li className="text-gray-900">Answer Writing Tips to Score High in UPSC Mains</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-answer-writing.png" 
              alt="Answer Writing Tips to Score High in UPSC Mains" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Answer Writing Tips to Score High in UPSC Mains
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: December 20, 2024</span>
              <span className="mx-2">•</span>
              <span>10 min read</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Answer writing is the most crucial skill for UPSC Mains success. This comprehensive 
                guide provides proven strategies, techniques, and tips to help you write compelling 
                answers that can fetch maximum marks in the examination.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Fundamentals of Answer Writing</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Effective answer writing in UPSC Mains requires a combination of content knowledge, 
                analytical skills, and presentation techniques. Understanding the examiner's expectations 
                is key to scoring well.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Structure of a Good Answer</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">1. Introduction (10-15% of answer)</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Define key terms and concepts</li>
                  <li>Provide context and background</li>
                  <li>State your thesis or main argument</li>
                  <li>Keep it concise and relevant</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">2. Main Body (70-80% of answer)</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Present arguments with supporting evidence</li>
                  <li>Use examples, case studies, and data</li>
                  <li>Address different perspectives</li>
                  <li>Maintain logical flow and coherence</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">3. Conclusion (10-15% of answer)</h3>
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li>Summarize key points</li>
                  <li>Provide a balanced view</li>
                  <li>Suggest way forward or recommendations</li>
                  <li>End on a positive note</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Essential Writing Techniques</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Clarity & Conciseness</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use simple, clear language</li>
                    <li>• Avoid jargon and complex sentences</li>
                    <li>• Be direct and to the point</li>
                    <li>• Use active voice</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Logical Flow</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Use connecting words</li>
                    <li>• Maintain paragraph structure</li>
                    <li>• Follow cause-effect relationships</li>
                    <li>• Use bullet points for clarity</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Evidence & Examples</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Support arguments with facts</li>
                    <li>• Use relevant examples</li>
                    <li>• Include statistics and data</li>
                    <li>• Reference current affairs</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Presentation</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Maintain neat handwriting</li>
                    <li>• Use proper spacing</li>
                    <li>• Highlight key points</li>
                    <li>• Draw diagrams when needed</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Subject-Specific Tips</h2>
              
              <div className="space-y-6 mb-6">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">General Studies Papers</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Focus on current affairs integration</li>
                    <li>• Use government schemes and policies</li>
                    <li>• Include constitutional provisions</li>
                    <li>• Address multiple dimensions</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Optional Subject</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Demonstrate deep subject knowledge</li>
                    <li>• Use subject-specific terminology</li>
                    <li>• Include theoretical frameworks</li>
                    <li>• Show analytical depth</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Essay Paper</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Develop a clear thesis</li>
                    <li>• Use personal experiences</li>
                    <li>• Include philosophical insights</li>
                    <li>• Maintain balanced perspective</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practice Strategies</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Daily Practice:</strong> Write at least 2-3 answers daily</li>
                <li><strong>Time Management:</strong> Practice within time limits</li>
                <li><strong>Self-Evaluation:</strong> Review and improve</li>
                <li><strong>Peer Feedback:</strong> Get answers evaluated by others</li>
                <li><strong>Model Answers:</strong> Study high-scoring answers</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Pro Tips</h3>
                <ul className="text-yellow-800 space-y-2">
                  <li>• Start with your strongest points</li>
                  <li>• Use diagrams and flowcharts effectively</li>
                  <li>• Quote relevant constitutional articles</li>
                  <li>• Include recent examples and case studies</li>
                  <li>• Maintain consistent handwriting throughout</li>
                </ul>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blogs/upsc-mains-result-2024" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">UPSC Mains Result 2024</h4>
                  <p className="text-sm text-gray-600 mt-1">Latest results analysis</p>
                </Link>
                <Link to="/blogs/effective-revision-techniques" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">Effective Revision Techniques</h4>
                  <p className="text-sm text-gray-600 mt-1">Master revision strategies</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default AnswerWritingTips;
