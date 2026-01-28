import React from 'react';
import { Link } from 'react-router-dom';

const EffectiveRevisionTechniques = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">Effective Revision Techniques for UPSC</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-technic.png" 
              alt="Effective Revision Techniques for UPSC" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Effective Revision Techniques for UPSC
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: December 5, 2024</span>
              <span className="mx-2">•</span>
              <span>9 min read</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Revision is the key to UPSC success. This comprehensive guide provides proven 
                revision techniques, strategies, and schedules to help you retain information 
                effectively and perform your best in the examination.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Science of Revision</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Effective revision is not just re-reading your notes. It involves active 
                engagement with the material, testing your understanding, and reinforcing 
                neural pathways through strategic repetition.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Revision Strategies</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">1. The 1-3-7-21 Rule</h3>
                <p className="text-blue-800 mb-4">
                  Follow this scientifically-proven schedule for optimal retention:
                </p>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li><strong>Day 1:</strong> Initial learning and note-taking</li>
                  <li><strong>Day 3:</strong> First revision - test your recall</li>
                  <li><strong>Day 7:</strong> Second revision - fill knowledge gaps</li>
                  <li><strong>Day 21:</strong> Final revision - consolidate learning</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">2. Active Recall Method</h3>
                <p className="text-green-800 mb-4">
                  Instead of passive re-reading, actively test your knowledge:
                </p>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Close books and write what you remember</li>
                  <li>Create questions and answer them</li>
                  <li>Explain concepts to someone else</li>
                  <li>Use flashcards for key points</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">3. Spaced Repetition</h3>
                <p className="text-purple-800 mb-4">
                  Review information at increasing intervals:
                </p>
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li>Immediate: Right after learning</li>
                  <li>Short-term: 1-2 days later</li>
                  <li>Medium-term: 1 week later</li>
                  <li>Long-term: 1 month later</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Revision Techniques by Subject</h2>
              
              <div className="space-y-6 mb-6">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">History & Culture</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Create timelines and flowcharts</li>
                    <li>• Use mnemonic devices for dates</li>
                    <li>• Connect events with causes and effects</li>
                    <li>• Practice map-based questions</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Geography</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Draw maps and diagrams</li>
                    <li>• Use visual memory techniques</li>
                    <li>• Connect physical and human geography</li>
                    <li>• Practice location-based questions</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Polity & Governance</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Create constitutional article summaries</li>
                    <li>• Use case studies and examples</li>
                    <li>• Connect with current affairs</li>
                    <li>• Practice analytical questions</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-orange-400 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Economy</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Use graphs and charts</li>
                    <li>• Connect theory with current data</li>
                    <li>• Practice numerical problems</li>
                    <li>• Link with government schemes</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Revision Schedule</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Revision Plan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium">Morning (1 hour)</span>
                    <span>Previous day's topics</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium">Afternoon (1 hour)</span>
                    <span>Weekly revision topics</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Evening (1 hour)</span>
                    <span>Monthly revision topics</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Revision Tools & Resources</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Mind Maps:</strong> Visual representation of topics</li>
                <li><strong>Flashcards:</strong> Quick recall of key points</li>
                <li><strong>Summary Notes:</strong> Condensed version of topics</li>
                <li><strong>Previous Year Papers:</strong> Test your knowledge</li>
                <li><strong>Mock Tests:</strong> Simulate exam conditions</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Pro Tips for Effective Revision</h3>
                <ul className="text-yellow-800 space-y-2">
                  <li>• Start revision early, not just before exams</li>
                  <li>• Use multiple senses while revising</li>
                  <li>• Take breaks between revision sessions</li>
                  <li>• Test yourself regularly</li>
                  <li>• Focus on understanding, not memorization</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default EffectiveRevisionTechniques;
