import React from 'react';
import { Link } from 'react-router-dom';

const DifferenceBetweenPrelimsAndMains = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">Difference between Prelims and Mains</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-prelimsvsmains.png" 
              alt="Difference between Prelims and Mains" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Difference between Prelims and Mains
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: November 10, 2024</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Understanding the key differences between UPSC Prelims and Mains is crucial for 
                effective preparation. This comprehensive guide explains the format, syllabus, 
                and preparation strategies for both stages of the examination.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">UPSC Prelims vs Mains: Key Differences</h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Prelims</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Mains</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Nature</td>
                      <td className="border border-gray-300 px-4 py-2">Objective (MCQ)</td>
                      <td className="border border-gray-300 px-4 py-2">Descriptive (Written)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Papers</td>
                      <td className="border border-gray-300 px-4 py-2">2 Papers</td>
                      <td className="border border-gray-300 px-4 py-2">9 Papers</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Duration</td>
                      <td className="border border-gray-300 px-4 py-2">2 hours each</td>
                      <td className="border border-gray-300 px-4 py-2">3 hours each</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Marks</td>
                      <td className="border border-gray-300 px-4 py-2">400 (200 each)</td>
                      <td className="border border-gray-300 px-4 py-2">1750 (Total)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Negative Marking</td>
                      <td className="border border-gray-300 px-4 py-2">Yes (1/3rd)</td>
                      <td className="border border-gray-300 px-4 py-2">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">UPSC Prelims Details</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Paper 1: General Studies</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Questions:</strong> 100 MCQs</li>
                  <li><strong>Marks:</strong> 200 (2 marks each)</li>
                  <li><strong>Duration:</strong> 2 hours</li>
                  <li><strong>Negative Marking:</strong> 1/3rd for wrong answers</li>
                  <li><strong>Syllabus:</strong> History, Geography, Polity, Economy, Science, Current Affairs</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Paper 2: CSAT (Civil Services Aptitude Test)</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li><strong>Questions:</strong> 80 MCQs</li>
                  <li><strong>Marks:</strong> 200 (2.5 marks each)</li>
                  <li><strong>Duration:</strong> 2 hours</li>
                  <li><strong>Negative Marking:</strong> 1/3rd for wrong answers</li>
                  <li><strong>Syllabus:</strong> Comprehension, Logical Reasoning, Quantitative Aptitude</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">UPSC Mains Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Paper A: Indian Language (300 marks)</h3>
                  <p className="text-purple-800">Any one of the 22 scheduled languages</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Paper B: English (300 marks)</h3>
                  <p className="text-purple-800">Compulsory English paper</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Paper 1: Essay (250 marks)</h3>
                  <p className="text-purple-800">Two essays to be written</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Paper 2-5: General Studies (250 marks each)</h3>
                  <p className="text-purple-800">Four GS papers covering different subjects</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Paper 6-7: Optional Subject (250 marks each)</h3>
                  <p className="text-purple-800">Two papers of chosen optional subject</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Preparation Strategy Differences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Prelims Preparation</h3>
                  <ul className="text-yellow-800 space-y-2">
                    <li>• Focus on facts and concepts</li>
                    <li>• Practice MCQs regularly</li>
                    <li>• Current affairs emphasis</li>
                    <li>• Quick revision techniques</li>
                    <li>• Mock tests and practice</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Mains Preparation</h3>
                  <ul className="text-red-800 space-y-2">
                    <li>• Deep understanding required</li>
                    <li>• Answer writing practice</li>
                    <li>• Analytical skills development</li>
                    <li>• Optional subject mastery</li>
                    <li>• Essay writing practice</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Syllabus Comparison</h2>
              
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prelims Syllabus</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Broader coverage of topics</li>
                    <li>• Fact-based questions</li>
                    <li>• Current affairs heavy</li>
                    <li>• Basic understanding sufficient</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Mains Syllabus</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Detailed and analytical</li>
                    <li>• Application-based questions</li>
                    <li>• Current affairs integration</li>
                    <li>• Deep understanding required</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Preparation Tips</h2>
              
              <div className="bg-indigo-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">For Prelims</h3>
                <ul className="list-disc pl-6 text-indigo-800 space-y-2">
                  <li>Focus on NCERT books for strong foundation</li>
                  <li>Practice previous year questions</li>
                  <li>Stay updated with current affairs</li>
                  <li>Take regular mock tests</li>
                  <li>Manage time effectively during exam</li>
                </ul>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-teal-900 mb-4">For Mains</h3>
                <ul className="list-disc pl-6 text-teal-800 space-y-2">
                  <li>Start answer writing practice early</li>
                  <li>Develop analytical thinking skills</li>
                  <li>Master your optional subject</li>
                  <li>Practice essay writing regularly</li>
                  <li>Focus on presentation and structure</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Remember</h3>
                <p className="text-green-800">
                  Both Prelims and Mains require different approaches and skills. 
                  Success in UPSC requires mastering both stages with appropriate 
                  preparation strategies for each.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default DifferenceBetweenPrelimsAndMains;
