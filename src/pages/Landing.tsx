import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Lightbulb, Target, Zap, Brain, CheckCircle, Search, FileText, GraduationCap, Upload, Star, Heart, Sparkles } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "Your AI Learning Buddy",
      description: "Meet your friendly AI teacher who makes learning fun and helps you understand everything step by step!",
      color: "blue",
      emoji: "🤖"
    },
    {
      icon: Search,
      title: "Chat & Learn Together",
      description: "Ask questions, get help, and have fun conversations about your homework and projects!",
      color: "purple",
      emoji: "💬"
    },
    {
      icon: FileText,
      title: "All School Subjects",
      description: "From Math to English, Science to Kiswahili - get help with any subject you're studying!",
      color: "green",
      emoji: "📚"
    },
    {
      icon: CheckCircle,
      title: "Learn at Your Pace",
      description: "No pressure! Learn as fast or slow as you want. Your AI buddy is always patient and kind.",
      color: "orange",
      emoji: "⭐"
    }
  ];

  const cbcSubjects = [
    { name: "Mathematics", icon: "🔢", color: "bg-blue-100 text-blue-600" },
    { name: "English", icon: "📖", color: "bg-green-100 text-green-600" },
    { name: "Kiswahili", icon: "🇰🇪", color: "bg-red-100 text-red-600" },
    { name: "Science", icon: "🔬", color: "bg-purple-100 text-purple-600" },
    { name: "Social Studies", icon: "🌍", color: "bg-yellow-100 text-yellow-600" },
    { name: "Art & Craft", icon: "🎨", color: "bg-pink-100 text-pink-600" },
    { name: "Music", icon: "🎵", color: "bg-indigo-100 text-indigo-600" },
    { name: "Sports", icon: "⚽", color: "bg-orange-100 text-orange-600" },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mwalimu AI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Fun Learning Friend! 🌟</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start Learning!</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900 dark:to-blue-900 dark:text-green-200 mb-4 shadow-md">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span>For Students Ages 5-18 📚</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Hey there! Meet
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    Mwalimu AI! 🤖✨
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm your super friendly AI teacher! 🎉 Upload your homework and let's chat about it together. 
                  I'll help you understand everything in a fun way - no boring lectures, just friendly conversations! 💫
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/dashboard"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group shadow-xl"
                >
                  <Upload className="mr-3 h-6 w-6" />
                  Let's Start Learning! 🚀
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Always Kind & Patient 💚</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Fun Learning 🎮</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>All Subjects 📖</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Smart Help 🧠</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">I understand exactly what you need help with!</p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Your Pace ⏰</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Learn as fast or slow as you want - no rush!</p>
                </div>
              </div>
              
              <div className="space-y-6 mt-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Lightbulb className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Fun Chats 💬</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Learning through friendly conversations!</p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Quick Help ⚡</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Get answers instantly, anytime you need!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              All Your School Subjects! 📚✨
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I can help you with any subject you're studying - just upload your work and let's chat about it!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cbcSubjects.map((subject, index) => (
              <div 
                key={index}
                className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200 dark:border-gray-600 transform hover:scale-105"
              >
                <div className="text-4xl mb-3">{subject.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{subject.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Kids Love Mwalimu AI! 💖
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              I'm not just any AI - I'm your personal learning buddy who makes studying fun and easy!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-200 dark:border-gray-600"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{feature.emoji}</div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg ${getColorClasses(feature.color)}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Have Fun Learning?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Upload your homework and start chatting with me! I promise to make learning fun, easy, and exciting! 🌟
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/dashboard"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center group shadow-xl"
              >
                <Upload className="mr-3 h-6 w-6" />
                Let's Start Learning! 🚀
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-pink-300" />
                <span>Always Kind</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>Super Fun</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-300" />
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