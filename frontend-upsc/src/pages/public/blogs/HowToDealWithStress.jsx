import React from 'react';
import { Link } from 'react-router-dom';

const HowToDealWithStress = () => {
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
            <li className="text-gray-900">How to Deal with Stress During UPSC Preparation</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <img 
              src="/images/blog-stress.png" 
              alt="How to Deal with Stress During UPSC Preparation" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Deal with Stress During UPSC Preparation
            </h1>
            
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span>Published on: December 28, 2024</span>
              <span className="mx-2">•</span>
              <span>8 min read</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                UPSC preparation can be mentally and emotionally challenging. This comprehensive guide 
                provides practical strategies to manage stress, maintain mental health, and stay 
                motivated throughout your preparation journey.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding UPSC Stress</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                UPSC preparation stress is unique due to the vast syllabus, competitive nature, and 
                uncertainty of outcomes. Recognizing the sources of stress is the first step toward 
                effective management.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Stress Factors</h2>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Vast Syllabus:</strong> The extensive curriculum can feel overwhelming</li>
                <li><strong>Time Pressure:</strong> Limited time to cover all topics</li>
                <li><strong>Competition:</strong> High competition and low success rate</li>
                <li><strong>Uncertainty:</strong> Unpredictable exam patterns and results</li>
                <li><strong>Social Pressure:</strong> Expectations from family and society</li>
                <li><strong>Financial Constraints:</strong> Cost of preparation and coaching</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Stress Management Techniques</h2>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Physical Well-being</h3>
                <ul className="list-disc pl-6 text-blue-800 space-y-2">
                  <li>Regular exercise and physical activity</li>
                  <li>Proper sleep schedule (7-8 hours daily)</li>
                  <li>Balanced diet with nutritious meals</li>
                  <li>Meditation and breathing exercises</li>
                  <li>Yoga and mindfulness practices</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Mental Health Strategies</h3>
                <ul className="list-disc pl-6 text-green-800 space-y-2">
                  <li>Set realistic goals and expectations</li>
                  <li>Break down large tasks into smaller ones</li>
                  <li>Practice positive self-talk</li>
                  <li>Seek support from family and friends</li>
                  <li>Consider professional counseling if needed</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Study-related Stress Management</h3>
                <ul className="list-disc pl-6 text-purple-800 space-y-2">
                  <li>Create a structured study schedule</li>
                  <li>Take regular breaks during study sessions</li>
                  <li>Avoid comparing yourself with others</li>
                  <li>Focus on your own progress and improvement</li>
                  <li>Celebrate small achievements and milestones</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Resilience</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Resilience is the ability to bounce back from setbacks. Building resilience during 
                UPSC preparation involves developing coping mechanisms, maintaining perspective, 
                and staying committed to your goals despite challenges.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When to Seek Help</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Warning Signs</h3>
                <ul className="list-disc pl-6 text-red-800 space-y-1">
                  <li>Persistent anxiety or depression</li>
                  <li>Sleep disturbances or insomnia</li>
                  <li>Loss of appetite or overeating</li>
                  <li>Social withdrawal and isolation</li>
                  <li>Thoughts of self-harm or suicide</li>
                </ul>
                <p className="text-red-800 mt-4">
                  <strong>If you experience any of these symptoms, please seek professional help immediately.</strong>
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Remember</h3>
                <p className="text-green-800">
                  Your mental health is more important than any exam. Take care of yourself, 
                  seek support when needed, and remember that there are multiple paths to success.
                </p>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blogs/how-to-boost-memory" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">How to Boost Your Memory</h4>
                  <p className="text-sm text-gray-600 mt-1">Memory enhancement techniques</p>
                </Link>
                <Link to="/blogs/balance-job-upsc" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-gray-900">Balance Job and UPSC</h4>
                  <p className="text-sm text-gray-600 mt-1">Managing work and preparation</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default HowToDealWithStress;
