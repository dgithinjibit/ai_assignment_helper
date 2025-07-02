import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Clock, CheckCircle, FileText, Search, Brain, User, Upload, BarChart3, Target, Award } from 'lucide-react';
import { formatDate, getStatusColor } from '../utils/validation';

const Dashboard = () => {
  // Mock data for demonstration
  const mockAssignments = [
    {
      id: '1',
      title: 'Climate Change Essay',
      subject: 'Environmental Science',
      status: 'completed',
      created_at: '2025-01-01',
      due_date: '2025-01-15',
      score: 85
    },
    {
      id: '2',
      title: 'Algebra Problem Set',
      subject: 'Mathematics',
      status: 'in_progress',
      created_at: '2024-12-20',
      due_date: '2025-01-10',
      score: null
    },
    {
      id: '3',
      title: 'Kiswahili Composition',
      subject: 'Kiswahili',
      status: 'completed',
      created_at: '2024-12-15',
      due_date: '2024-12-30',
      score: 78
    }
  ];

  const assignments = mockAssignments;

  const stats = [
    {
      name: 'Total Assignments',
      value: assignments.length,
      icon: FileText,
      color: 'blue',
      change: '+2 this week'
    },
    {
      name: 'In Progress',
      value: assignments.filter(a => a.status === 'in_progress').length,
      icon: Clock,
      color: 'orange',
      change: '1 due soon'
    },
    {
      name: 'Completed',
      value: assignments.filter(a => a.status === 'completed').length,
      icon: CheckCircle,
      color: 'green',
      change: '+1 this week'
    },
    {
      name: 'Average Score',
      value: Math.round(assignments.filter(a => a.score).reduce((acc, a) => acc + (a.score || 0), 0) / assignments.filter(a => a.score).length) + '%',
      icon: Award,
      color: 'purple',
      change: '+5% improvement'
    },
  ];

  const competencyProgress = [
    { name: 'Critical Thinking', progress: 85, color: 'blue' },
    { name: 'Communication', progress: 78, color: 'green' },
    { name: 'Creativity', progress: 72, color: 'purple' },
    { name: 'Digital Literacy', progress: 90, color: 'orange' },
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
    };
    return colors[color as keyof typeof colors];
  };

  const getProgressColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      orange: 'bg-orange-600',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Assignment Helper</h1>
                <p className="text-xs text-gray-500">CBC Curriculum - Kenya</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/assignment/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Assignment</span>
              </Link>
              
              <div className="flex items-center space-x-2 text-gray-700">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="hidden md:block">Student</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, Student!
          </h2>
          <p className="text-gray-600 mt-2">
            Track your progress and continue your CBC learning journey with AI-powered assistance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Assignments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
                <Link 
                  to="/assignment/upload"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Assignment</span>
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {assignments.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h4>
                  <p className="text-gray-600 mb-6">
                    Upload your first assignment to get started with CBC-aligned AI assistance.
                  </p>
                  <Link 
                    to="/assignment/upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Assignment</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                            {assignment.status.replace('_', ' ')}
                          </span>
                          {assignment.score && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              {assignment.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{assignment.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created {formatDate(assignment.created_at)}
                          {assignment.due_date && ` • Due ${formatDate(assignment.due_date)}`}
                        </p>
                      </div>
                      <Link 
                        to={`/assignment/analysis/${assignment.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Analysis
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Competency Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">CBC Competency Progress</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {competencyProgress.map((competency) => (
                  <div key={competency.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{competency.name}</span>
                      <span className="text-sm text-gray-600">{competency.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(competency.color)}`}
                        style={{ width: `${competency.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>View Detailed Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/assignment/upload"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <Upload className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Upload Assignment</h3>
                <p className="text-blue-100 text-sm">Get CBC-aligned AI feedback</p>
              </div>
            </div>
          </Link>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-3">
              <Search className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Research Tools</h3>
                <p className="text-purple-100 text-sm">Find credible sources and citations</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">Learning Goals</h3>
                <p className="text-green-100 text-sm">Set and track CBC objectives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;