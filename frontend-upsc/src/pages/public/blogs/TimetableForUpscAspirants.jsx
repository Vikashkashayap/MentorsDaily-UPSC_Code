import React from 'react';
import { Link } from 'react-router-dom';

const TimetableForUpscAspirants = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">Timetable for UPSC Aspirants</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-timetable.png" 
              alt="Timetable for UPSC Aspirants" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Timetable for UPSC Aspirants
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: December 15, 2024</span>
              <span className="mx-2">•</span>
              <span>9 min read</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                A well-structured timetable is the backbone of successful UPSC preparation. This comprehensive 
                guide provides detailed study schedules, time management strategies, and practical tips to 
                help you make the most of your preparation time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Daily Study Schedule</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Morning Session (6:00 AM - 12:00 PM)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="font-medium">6:00 AM - 7:00 AM</span>
                    <span>Newspaper Reading & Current Affairs</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="font-medium">7:00 AM - 9:00 AM</span>
                    <span>Optional Subject Study</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="font-medium">9:00 AM - 10:00 AM</span>
                    <span>Break & Breakfast</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">10:00 AM - 12:00 PM</span>
                    <span>General Studies - Paper 1</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Afternoon Session (2:00 PM - 6:00 PM)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="font-medium">2:00 PM - 4:00 PM</span>
                    <span>General Studies - Paper 2</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200">
                    <span className="font-medium">4:00 PM - 5:00 PM</span>
                    <span>General Studies - Paper 3</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">5:00 PM - 6:00 PM</span>
                    <span>General Studies - Paper 4</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Evening Session (7:00 PM - 10:00 PM)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-purple-200">
                    <span className="font-medium">7:00 PM - 8:30 PM</span>
                    <span>Answer Writing Practice</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-purple-200">
                    <span className="font-medium">8:30 PM - 9:00 PM</span>
                    <span>Dinner Break</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">9:00 PM - 10:00 PM</span>
                    <span>Revision & Note-making</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Weekly Schedule</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Day</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Morning</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Afternoon</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Monday</td>
                      <td className="border border-gray-300 px-4 py-2">History & Culture</td>
                      <td className="border border-gray-300 px-4 py-2">Geography</td>
                      <td className="border border-gray-300 px-4 py-2">Answer Writing</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Tuesday</td>
                      <td className="border border-gray-300 px-4 py-2">Polity & Governance</td>
                      <td className="border border-gray-300 px-4 py-2">Economy</td>
                      <td className="border border-gray-300 px-4 py-2">Mock Test</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Wednesday</td>
                      <td className="border border-gray-300 px-4 py-2">Science & Technology</td>
                      <td className="border border-gray-300 px-4 py-2">Environment</td>
                      <td className="border border-gray-300 px-4 py-2">Answer Writing</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Thursday</td>
                      <td className="border border-gray-300 px-4 py-2">Current Affairs</td>
                      <td className="border border-gray-300 px-4 py-2">Ethics</td>
                      <td className="border border-gray-300 px-4 py-2">Revision</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Friday</td>
                      <td className="border border-gray-300 px-4 py-2">Optional Subject</td>
                      <td className="border border-gray-300 px-4 py-2">Optional Subject</td>
                      <td className="border border-gray-300 px-4 py-2">Answer Writing</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Saturday</td>
                      <td className="border border-gray-300 px-4 py-2">Test Series</td>
                      <td className="border border-gray-300 px-4 py-2">Analysis & Review</td>
                      <td className="border border-gray-300 px-4 py-2">Weak Areas</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Sunday</td>
                      <td className="border border-gray-300 px-4 py-2">Revision</td>
                      <td className="border border-gray-300 px-4 py-2">Relaxation</td>
                      <td className="border border-gray-300 px-4 py-2">Planning Next Week</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Time Management Tips</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Prioritize Subjects:</strong> Allocate more time to weaker subjects</li>
                <li><strong>Use Pomodoro Technique:</strong> 25-minute focused study sessions</li>
                <li><strong>Regular Breaks:</strong> Take 5-10 minute breaks every hour</li>
                <li><strong>Flexible Schedule:</strong> Adjust based on your energy levels</li>
                <li><strong>Weekly Review:</strong> Evaluate and modify your schedule</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notes</h3>
                <ul className="text-yellow-800 space-y-2">
                  <li>• Customize the schedule based on your strengths and weaknesses</li>
                  <li>• Maintain consistency rather than perfection</li>
                  <li>• Include time for physical exercise and relaxation</li>
                  <li>• Regular evaluation and adjustment of the timetable</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TimetableForUpscAspirants;
