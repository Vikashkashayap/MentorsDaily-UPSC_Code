import React from 'react';
import { Link } from 'react-router-dom';

const Top5MistakesInUpscPreparation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/upsc-preparation-blog" className="hover:text-blue-600">Blog</Link></li>
            <li>/</li>
            <li className="text-gray-900">Top 5 Mistakes Aspirants Make in UPSC CSE Preparation</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-mistake.png" 
              alt="Top 5 Mistakes Aspirants Make in UPSC CSE Preparation" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top 5 Mistakes Aspirants Make in UPSC CSE Preparation
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: November 25, 2024</span>
              <span className="mx-2">•</span>
              <span>7 min read</span>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                UPSC preparation is a journey filled with challenges, and many aspirants unknowingly 
                make common mistakes that hinder their progress. This guide identifies the top 5 
                mistakes and provides solutions to help you avoid them and stay on the right track.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Lack of Proper Planning and Strategy</h2>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">The Mistake</h3>
                <p className="text-red-800 mb-4">
                  Many aspirants start preparation without a clear plan, jumping from one topic to another 
                  without understanding the syllabus or exam pattern.
                </p>
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li>No structured study plan</li>
                  <li>Random topic selection</li>
                  <li>Ignoring syllabus completely</li>
                  <li>No timeline for completion</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">The Solution</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Create a detailed study plan with timelines</li>
                  <li>Follow the official UPSC syllabus religiously</li>
                  <li>Prioritize topics based on weightage</li>
                  <li>Set weekly and monthly targets</li>
                  <li>Regularly review and adjust your plan</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Over-reliance on Multiple Sources</h2>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">The Mistake</h3>
                <p className="text-red-800 mb-4">
                  Collecting too many books, notes, and resources without focusing on quality content 
                  leads to confusion and incomplete preparation.
                </p>
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li>Buying too many books</li>
                  <li>Following multiple coaching materials</li>
                  <li>Jumping between different sources</li>
                  <li>Not completing any single source</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">The Solution</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Choose 2-3 reliable sources per subject</li>
                  <li>Complete one source before moving to another</li>
                  <li>Focus on NCERT books for basics</li>
                  <li>Use standard reference books</li>
                  <li>Make your own notes from limited sources</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Neglecting Answer Writing Practice</h2>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">The Mistake</h3>
                <p className="text-red-800 mb-4">
                  Many aspirants focus only on reading and memorizing without practicing answer writing, 
                  which is crucial for mains examination.
                </p>
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li>Only reading without writing</li>
                  <li>No regular answer writing practice</li>
                  <li>Ignoring time management in answers</li>
                  <li>Not getting answers evaluated</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">The Solution</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Start answer writing from day one</li>
                  <li>Practice daily with time limits</li>
                  <li>Get answers evaluated by experts</li>
                  <li>Learn from model answers</li>
                  <li>Focus on structure and presentation</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Inadequate Current Affairs Preparation</h2>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">The Mistake</h3>
                <p className="text-red-800 mb-4">
                  Either completely ignoring current affairs or overloading with too much information 
                  without proper analysis and understanding.
                </p>
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li>Reading newspapers without analysis</li>
                  <li>Following too many current affairs sources</li>
                  <li>Not connecting current affairs with static portions</li>
                  <li>Memorizing facts without understanding</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">The Solution</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Follow one newspaper consistently</li>
                  <li>Analyze news from multiple perspectives</li>
                  <li>Connect current affairs with syllabus topics</li>
                  <li>Make notes of important issues</li>
                  <li>Regular revision of current affairs</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Poor Time Management and Procrastination</h2>
              
              <div className="bg-red-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4">The Mistake</h3>
                <p className="text-red-800 mb-4">
                  Not maintaining a consistent study schedule, procrastinating important topics, 
                  and poor time management leading to incomplete preparation.
                </p>
                <ul className="list-disc pl-6 text-red-800 space-y-2">
                  <li>Irregular study schedule</li>
                  <li>Procrastinating difficult topics</li>
                  <li>Poor time allocation for different subjects</li>
                  <li>No revision schedule</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">The Solution</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Create and stick to a daily schedule</li>
                  <li>Allocate time based on subject importance</li>
                  <li>Tackle difficult topics first</li>
                  <li>Include regular revision in schedule</li>
                  <li>Use time management techniques</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Key Takeaways</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Plan your preparation strategically</li>
                  <li>• Limit your sources but use them effectively</li>
                  <li>• Practice answer writing regularly</li>
                  <li>• Stay updated with current affairs</li>
                  <li>• Manage your time efficiently</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Top5MistakesInUpscPreparation;
