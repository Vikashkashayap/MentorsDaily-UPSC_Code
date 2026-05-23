import React from 'react';
import { Link } from 'react-router-dom';

const FreeResourcesForUpscPreparation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">Free Resources for UPSC Preparation</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-resouces.webp" 
              alt="Free Resources for UPSC Preparation" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Resources for UPSC Preparation
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: December 1, 2024</span>
              <span className="mx-2">â€¢</span>
              <span>8 min read</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                UPSC preparation doesn't have to be expensive. This comprehensive guide lists 
                the best free resources available online and offline to help you prepare 
                effectively without breaking the bank.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Government Resources</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Official Websites</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>UPSC Official Website:</strong> upsc.gov.in - Latest notifications and syllabus</li>
                  <li><strong>PIB (Press Information Bureau):</strong> pib.gov.in - Government press releases</li>
                  <li><strong>PRS Legislative Research:</strong> prsindia.org - Parliamentary analysis</li>
                  <li><strong>Ministry Websites:</strong> Various ministry websites for policy updates</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Study Materials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">NCERT Books</h3>
                  <ul className="text-green-800 space-y-2">
                    <li>â€¢ Available free on ncert.nic.in</li>
                    <li>â€¢ Classes 6-12 for all subjects</li>
                    <li>â€¢ PDF downloads available</li>
                    <li>â€¢ Audio books for some subjects</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Government Reports</h3>
                  <ul className="text-purple-800 space-y-2">
                    <li>â€¢ Economic Survey</li>
                    <li>â€¢ Union Budget</li>
                    <li>â€¢ NITI Aayog Reports</li>
                    <li>â€¢ Census Data</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Online Learning Platforms</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">YouTube Channels</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>â€¢ Unacademy (Free content)</li>
                    <li>â€¢ Study IQ Education</li>
                    <li>â€¢ Drishti IAS</li>
                    <li>â€¢ Vision IAS</li>
                    <li>â€¢ BYJU'S Exam Prep</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Mobile Apps</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>â€¢ UPSC Pathshala</li>
                    <li>â€¢ ClearIAS</li>
                    <li>â€¢ IAS Baba</li>
                    <li>â€¢ GK Today</li>
                    <li>â€¢ Current Affairs</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Newspapers & Magazines</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>The Hindu:</strong> Free online access with registration</li>
                <li><strong>Indian Express:</strong> Free articles and opinion pieces</li>
                <li><strong>Yojana Magazine:</strong> Free PDF downloads</li>
                <li><strong>Kurukshetra Magazine:</strong> Government publication</li>
                <li><strong>Frontline:</strong> Free articles on current affairs</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Library Resources</h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Public Libraries</h3>
                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                  <li>Access to reference books and study materials</li>
                  <li>Quiet study environment</li>
                  <li>Internet facilities</li>
                  <li>Group study spaces</li>
                  <li>Access to newspapers and magazines</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Online Communities</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Reddit:</strong> r/UPSC community for discussions</li>
                <li><strong>Telegram Groups:</strong> Study groups and material sharing</li>
                <li><strong>WhatsApp Groups:</strong> Daily current affairs updates</li>
                <li><strong>Facebook Groups:</strong> UPSC preparation communities</li>
                <li><strong>Quora:</strong> Expert answers and guidance</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Pro Tips</h3>
                <ul className="text-green-800 space-y-2">
                  <li>â€¢ Create a study schedule using free resources</li>
                  <li>â€¢ Join online study groups for motivation</li>
                  <li>â€¢ Use multiple sources to cross-verify information</li>
                  <li>â€¢ Make notes from free resources for revision</li>
                  <li>â€¢ Stay updated with government websites</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FreeResourcesForUpscPreparation;
