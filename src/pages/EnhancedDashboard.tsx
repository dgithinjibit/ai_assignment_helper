import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, BarChart3, BookOpen, Target, Users, Settings, Bell } from 'lucide-react';
import AssignmentInput from '../components/ui/AssignmentInput';
import CBCProgressDashboard from '../components/analysis/CBCProgressDashboard';
import ThemeToggle from '../components/ui/ThemeToggle';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('submit');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tabs = [
    { key: 'submit', label: 'Submit Assignment', icon: Upload },
    { key: 'progress', label: 'CBC Progress', icon: BarChart3 },
    { key: 'resources', label: 'Learning Resources', icon: BookOpen },
    { key: 'goals', label: 'Learning Goals', icon: Target },
  ];

  const handleAssignmentSubmit = async (data: any) => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In real implementation, call Supabase edge function
      console.log('Analyzing assignment:', data);
      
      // Navigate to results or show success
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <ThemeToggle />
              
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="hidden md:block">{user?.email || 'Student'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, Student!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Continue your CBC learning journey with AI-powered educational guidance and competency-based assessment.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'submit' && (
            <div className="space-y-8">
              {isAnalyzing ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
                  <LoadingSpinner size="lg" text="Analyzing your assignment against CBC standards..." />
                </div>
              ) : (
                <AssignmentInput onSubmit={handleAssignmentSubmit} loading={isAnalyzing} />
              )}
            </div>
          )}
          
          {activeTab === 'progress' && (
            <CBCProgressDashboard userId={user?.id || ''} />
          )}
          
          {activeTab === 'resources' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CBC Learning Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Curated resources aligned with Kenya's Competency-Based Curriculum coming soon...
              </p>
            </div>
          )}
          
          {activeTab === 'goals' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learning Goals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set and track your CBC competency goals coming soon...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;