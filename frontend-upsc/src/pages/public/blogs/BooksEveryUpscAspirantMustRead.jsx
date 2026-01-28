import React from 'react';
import { Link } from 'react-router-dom';

const BooksEveryUpscAspirantMustRead = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">Books that Every UPSC Aspirant Must Read</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-book.png" 
              alt="Books that Every UPSC Aspirant Must Read" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Books that Every UPSC Aspirant Must Read
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: November 15, 2024</span>
              <span className="mx-2">•</span>
              <span>12 min read</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Choosing the right books is crucial for UPSC preparation. This comprehensive guide 
                lists the essential books for each subject, helping you build a strong foundation 
                and maximize your chances of success in the examination.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Foundation Books (NCERT)</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Must-Read NCERT Books</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">History</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Class 6-12 History NCERT</li>
                      <li>• India's Ancient Past - R.S. Sharma</li>
                      <li>• Medieval India - Satish Chandra</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Geography</h4>
                    <ul className="text-blue-700 space-y-1 text-sm">
                      <li>• Class 6-12 Geography NCERT</li>
                      <li>• Certificate Physical Geography</li>
                      <li>• Indian Geography - Majid Hussain</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">General Studies Books</h2>
              
              <div className="space-y-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Polity & Governance</h3>
                  <ul className="text-green-800 space-y-2">
                    <li><strong>Indian Polity - Laxmikant:</strong> Complete coverage of Indian Constitution</li>
                    <li><strong>Introduction to the Constitution of India - D.D. Basu:</strong> Detailed constitutional analysis</li>
                    <li><strong>Governance in India - Laxmikant:</strong> Governance and public policy</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Economy</h3>
                  <ul className="text-purple-800 space-y-2">
                    <li><strong>Indian Economy - Ramesh Singh:</strong> Comprehensive economic concepts</li>
                    <li><strong>Economic Survey:</strong> Annual government publication</li>
                    <li><strong>Union Budget:</strong> Government's financial statement</li>
                    <li><strong>NITI Aayog Reports:</strong> Policy recommendations</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Environment & Ecology</h3>
                  <ul className="text-orange-800 space-y-2">
                    <li><strong>Environment - Shankar IAS:</strong> Complete environmental concepts</li>
                    <li><strong>Environment & Ecology - Majid Hussain:</strong> Detailed coverage</li>
                    <li><strong>Environment - Ravi Agrahari:</strong> Current environmental issues</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Science & Technology</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Essential Science Books</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Basic Science</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• NCERT Class 6-10 Science</li>
                      <li>• NCERT Class 11-12 Biology</li>
                      <li>• NCERT Class 11-12 Chemistry</li>
                      <li>• NCERT Class 11-12 Physics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Technology & Current Affairs</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• Science Reporter Magazine</li>
                      <li>• Down to Earth Magazine</li>
                      <li>• Yojana Magazine</li>
                      <li>• Kurukshetra Magazine</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Current Affairs Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Newspapers</h3>
                  <ul className="text-yellow-800 space-y-2">
                    <li>• The Hindu (Daily)</li>
                    <li>• Indian Express (Daily)</li>
                    <li>• Business Standard (Weekly)</li>
                    <li>• Frontline (Weekly)</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Magazines</h3>
                  <ul className="text-red-800 space-y-2">
                    <li>• Yojana (Monthly)</li>
                    <li>• Kurukshetra (Monthly)</li>
                    <li>• Economic & Political Weekly</li>
                    <li>• Down to Earth (Monthly)</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Optional Subject Books</h2>
              
              <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">Popular Optional Subjects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-2">Public Administration</h4>
                    <ul className="text-indigo-700 space-y-1 text-sm">
                      <li>• Public Administration - Laxmikant</li>
                      <li>• Administrative Thinkers - Prasad & Prasad</li>
                      <li>• Public Administration - Fadia & Fadia</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-2">Sociology</h4>
                    <ul className="text-indigo-700 space-y-1 text-sm">
                      <li>• Sociology - Haralambos & Holborn</li>
                      <li>• Indian Society - Ram Ahuja</li>
                      <li>• Social Change in India - M.N. Srinivas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Answer Writing & Practice</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Answer Writing Books</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Answer Writing for Civil Services - Arihant</li>
                    <li>• Essay Writing for Civil Services - Arihant</li>
                    <li>• Previous Year Question Papers</li>
                    <li>• Model Answer Papers</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Test Series & Practice</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Vision IAS Test Series</li>
                    <li>• Drishti IAS Test Series</li>
                    <li>• Vajiram & Ravi Test Series</li>
                    <li>• Self-made practice tests</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reading Strategy</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Start with NCERT:</strong> Build strong foundation</li>
                <li><strong>Move to Standard Books:</strong> After completing NCERT</li>
                <li><strong>Current Affairs Integration:</strong> Connect with static portions</li>
                <li><strong>Regular Revision:</strong> Don't forget what you've read</li>
                <li><strong>Practice Questions:</strong> Test your understanding</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Pro Tips</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• Don't buy too many books - focus on quality</li>
                  <li>• Complete one book before starting another</li>
                  <li>• Make notes while reading</li>
                  <li>• Regular revision is key</li>
                  <li>• Connect different subjects and topics</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BooksEveryUpscAspirantMustRead;
