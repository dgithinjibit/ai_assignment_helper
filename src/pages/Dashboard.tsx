import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Clock, CheckCircle, FileText, Search, Brain, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAssignments } from '../hooks/useAssignments';
import { formatDate, getStatusColor } from '../utils/validation';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { assignments, loading } = useAssignments(user?.id);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const stats = [
    {
      name: 'Total Assignments',
      value: assignments.length,
      icon: FileText,
      color: 'blue',
    },
    {
      name: 'In Progress',
      value: assignments.filter(a => a.status === 'in_progress').length,
      icon: Clock,
      color: 'orange',
    },
    {
      name: 'Completed',
      value: assignments.filter(a => a.status === 'completed').length,
      icon: CheckCircle,
      color: 'green',
    },
    {
      name: 'Submitted',
      value: assignments.filter(a => a.status === 'submitted').length,
      icon: BookOpen,
      color: 'purple',
    },
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/assignment/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Assignment</span>
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="hidden md:block">{user?.email}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.full_name || 'Student'}!
          </h2>
          <p className="text-gray-600 mt-2">
            Here's an overview of your academic progress and assignments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${getStatColor(stat.color)}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
              <Link 
                to="/assignment/new"
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
                  Create your first assignment to get started with AI-powered assistance.
                </p>
                <Link 
                  to="/assignment/new"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Assignment</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {assignments.slice(0, 5).map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                          {assignment.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{assignment.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created {formatDate(assignment.created_at)}
                        {assignment.due_date && ` • Due ${formatDate(assignment.due_date)}`}
                      </p>
                    </div>
                    <Link 
                      to={`/assignment/${assignment.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View
                    </Link>
                  </div>
                ))}
                
                {assignments.length > 5 && (
                  <div className="text-center pt-4">
                    <Link 
                      to="/assignments"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all assignments ({assignments.length})
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/assignment/new"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <Plus className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">New Assignment</h3>
                <p className="text-blue-100 text-sm">Start a new assignment with AI assistance</p>
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
              <Brain className="h-8 w-8" />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-green-100 text-sm">Get instant help and feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;