import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lightbulb, Target, Zap, Brain, CheckCircle, Search, FileText, GraduationCap, Users, Award, Chrome, Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: "CBC-Aligned AI Assistant",
      description: "Get intelligent assistance that follows Kenya's Competency-Based Curriculum guidelines and KICD standards.",
      color: "blue"
    },
    {
      icon: Search,
      title: "Research & Citation Tools",
      description: "Find credible sources and learn proper citation methods aligned with Kenyan academic standards.",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Subject-Specific Support",
      description: "Specialized assistance for all CBC subjects from Mathematics to Kiswahili, Science to Social Studies.",
      color: "green"
    },
    {
      icon: CheckCircle,
      title: "Competency Assessment",
      description: "Receive feedback that aligns with CBC competency-based assessment and learning outcomes.",
      color: "orange"
    }
  ];

  const cbcSubjects = [
    { name: "Mathematics", icon: "📊" },
    { name: "English", icon: "📚" },
    { name: "Kiswahili", icon: "🇰🇪" },
    { name: "Science & Technology", icon: "🔬" },
    { name: "Social Studies", icon: "🌍" },
    { name: "CRE", icon: "✝️" },
    { name: "Home Science", icon: "🏠" },
    { name: "Art & Craft", icon: "🎨" },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      green: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      orange: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Assignment Helper</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">CBC Curriculum - Kenya</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-4">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Kenya's CBC Curriculum
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Excel in Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}CBC Journey
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get AI-powered assistance tailored to Kenya's Competency-Based Curriculum. 
                  From Mathematics to Kiswahili, Science to Social Studies - excel in every subject 
                  with guidance that follows KICD standards.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link 
                    to="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
                  >
                    Continue Learning
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/auth"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
                    >
                      Start Learning
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                      View Demo
                    </button>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>KICD Aligned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>All CBC Subjects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Competency-Based</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">CBC Standards</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">AI assistance that follows Kenya Institute of Curriculum Development guidelines.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Learning Outcomes</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Track progress against specific CBC competencies and learning objectives.</p>
                </div>
              </div>
              
              <div className="space-y-6 mt-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="bg-green-100 dark:bg-green-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Critical Thinking</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Develop analytical skills and problem-solving abilities as emphasized in CBC.</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="bg-orange-100 dark:bg-orange-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Practical Skills</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Apply knowledge practically with hands-on learning approaches.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Options Preview */}
      {!user && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Multiple Ways to Get Started
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose your preferred sign-in method for a personalized learning experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Chrome className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Google Account</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Quick and secure sign-in with your existing Google account
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">MetaMask Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect with your MetaMask wallet for Web3 authentication
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email & Password</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Traditional email registration with secure password protection
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CBC Subjects Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              All CBC Subjects Covered
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get specialized assistance for every subject in Kenya's Competency-Based Curriculum
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cbcSubjects.map((subject, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              CBC-Aligned Learning Support
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI assistant is specifically designed to support Kenya's educational framework, 
              promoting competency-based learning and holistic development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${getColorClasses(feature.color)}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Excel in Your CBC Studies?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Join Kenyan students who are already improving their academic performance with 
              AI assistance designed specifically for the Competency-Based Curriculum.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={user ? "/dashboard" : "/auth"}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
              >
                {user ? 'Go to Dashboard' : 'Start Learning Now'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>KICD Aligned</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>All CBC Subjects</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Free to Use</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;