
import React from 'react';
import { Link } from 'react-router-dom';
import BlogSEO from '../../../components/SEO/BlogSEO';

const HowToPrepareUpsc2025In100Days = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <BlogSEO
        title="How to Prepare UPSC 2025 in 100 Days | Complete Strategy | MentorsDaily"
        description="Comprehensive 100-day strategy for UPSC 2025 preparation. Time management, study plan, and expert tips for last-minute preparation."
        keywords="UPSC 100 days preparation, last minute strategy, time management, quick preparation, UPSC 2025"
        author="MentorsDaily Team"
        publishDate="2024-12-19T00:00:00Z"
        modifiedDate="2024-12-19T00:00:00Z"
        imageUrl="/images/blog-100days.png"
        articleUrl="/blogs/how-to-prepare-upsc-2025-in-100-days"
        category="UPSC Preparation"
        readingTime="12 min read"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">How to Prepare for UPSC 2025 in 100 Days</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-100days.png" 
              alt="How to Prepare for UPSC 2025 in 100 Days" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Prepare for UPSC 2025 in 100 Days
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: January 5, 2025</span>
              <span className="mx-2">•</span>
              <span>12 min read</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                With just 100 days left for UPSC 2025, it's time to focus on strategic preparation. 
                This comprehensive guide will help you maximize your preparation efficiency and 
                increase your chances of success in the upcoming examination.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">100-Day Study Plan</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Phase 1: Foundation (Days 1-30)</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Complete NCERT books for all subjects</li>
                  <li>Focus on basic concepts and fundamentals</li>
                  <li>Start daily newspaper reading</li>
                  <li>Begin answer writing practice</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Phase 2: Intensive Study (Days 31-70)</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Standard reference books for each subject</li>
                  <li>Daily current affairs compilation</li>
                  <li>Regular mock tests and previous year papers</li>
                  <li>Optional subject preparation</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">Phase 3: Revision & Practice (Days 71-100)</h3>
                <ul className="list-disc pl-6 text-orange-800 space-y-2">
                  <li>Comprehensive revision of all subjects</li>
                  <li>Daily answer writing practice</li>
                  <li>Mock tests and self-evaluation</li>
                  <li>Current affairs final revision</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Daily Schedule</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Activity</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6:00 AM - 7:00 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Newspaper Reading</td>
                      <td className="border border-gray-300 px-4 py-2">1 hour</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">7:00 AM - 9:00 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Subject Study</td>
                      <td className="border border-gray-300 px-4 py-2">2 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">9:00 AM - 10:00 AM</td>
                      <td className="border border-gray-300 px-4 py-2">Break & Breakfast</td>
                      <td className="border border-gray-300 px-4 py-2">1 hour</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10:00 AM - 12:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Answer Writing</td>
                      <td className="border border-gray-300 px-4 py-2">2 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">12:00 PM - 2:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Lunch & Rest</td>
                      <td className="border border-gray-300 px-4 py-2">2 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2:00 PM - 5:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Subject Study</td>
                      <td className="border border-gray-300 px-4 py-2">3 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">5:00 PM - 6:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Current Affairs</td>
                      <td className="border border-gray-300 px-4 py-2">1 hour</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6:00 PM - 8:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Dinner & Break</td>
                      <td className="border border-gray-300 px-4 py-2">2 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">8:00 PM - 10:00 PM</td>
                      <td className="border border-gray-300 px-4 py-2">Revision</td>
                      <td className="border border-gray-300 px-4 py-2">2 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Strategies</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Prioritize High-Weightage Topics:</strong> Focus on topics that frequently appear in exams</li>
                <li><strong>Regular Mock Tests:</strong> Take at least 2-3 mock tests per week</li>
                <li><strong>Answer Writing Practice:</strong> Write at least 2-3 answers daily</li>
                <li><strong>Current Affairs:</strong> Stay updated with daily news and analysis</li>
                <li><strong>Revision:</strong> Allocate 30% of study time for revision</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Note</h3>
                <p className="text-yellow-800">
                  This 100-day plan is intensive and requires dedication. Adjust the schedule based on 
                  your strengths and weaknesses, but maintain consistency in your preparation.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blogs/timetable-upsc-aspirants" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">Timetable for UPSC Aspirants</h4>
                  <p className="text-sm text-gray-600 mt-1">Structured study schedule</p>
                </Link>
                <Link to="/blogs/effective-revision-techniques" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">Effective Revision Techniques</h4>
                  <p className="text-sm text-gray-600 mt-1">Master the art of revision</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default HowToPrepareUpsc2025In100Days;
