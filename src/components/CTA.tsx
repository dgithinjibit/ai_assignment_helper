import React from 'react';
import { ArrowRight, Star, Users, BookOpen } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Ready to Transform Your Academic Performance?
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of students who have already improved their grades and academic confidence with our AI-powered assistance.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                View Pricing
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>10k+ Active Users</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold mb-2">Sarah M. - Computer Science</h3>
                  <p className="text-blue-100 text-sm">
                    "This platform helped me improve my essay writing by 40%. The AI suggestions were incredibly insightful and helped me understand my weak points."
                  </p>
                  <div className="flex items-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold mb-2">Michael R. - Psychology</h3>
                  <p className="text-blue-100 text-sm">
                    "The research tools saved me hours of work. I found credible sources in minutes and the citation help was perfect for my thesis."
                  </p>
                  <div className="flex items-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;