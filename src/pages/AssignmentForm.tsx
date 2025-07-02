import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, Brain, Calendar, BookOpen, FileText } from 'lucide-react';
import type { AssignmentFormData } from '../types';
import toast from 'react-hot-toast';

const AssignmentForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<AssignmentFormData>();

  const assignmentTypes = [
    { value: 'essay', label: 'Essay' },
    { value: 'math', label: 'Mathematics Problem' },
    { value: 'code', label: 'Programming/ICT Project' },
    { value: 'research', label: 'Research Project' },
    { value: 'general', label: 'General Assignment' },
  ];

  // CBC Curriculum subjects for Kenya
  const subjects = [
    // Core Subjects (Primary & Secondary)
    'Mathematics',
    'English',
    'Kiswahili',
    'Science and Technology',
    'Social Studies',
    'Christian Religious Education',
    'Islamic Religious Education',
    'Hindu Religious Education',
    
    // Practical Subjects
    'Home Science',
    'Art and Craft',
    'Music',
    'Physical Education',
    'Agriculture',
    
    // Languages
    'French',
    'German',
    'Arabic',
    'Indigenous Languages',
    
    // Secondary Level Subjects
    'Biology',
    'Chemistry',
    'Physics',
    'Geography',
    'History and Government',
    'Business Studies',
    'Computer Studies',
    'Life Skills Education',
    
    // Technical Subjects
    'Building and Construction',
    'Electrical Installation',
    'Power Mechanics',
    'Woodwork',
    'Metalwork',
    'Leather Work',
    
    // Other
    'Career Guidance',
    'Environmental Education',
    'Other',
  ];

  const onSubmit = async (data: AssignmentFormData) => {
    setIsSubmitting(true);
    
    try {
      // Mock assignment creation for now
      console.log('Creating assignment:', data);
      
      toast.success('Assignment created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">New Assignment</h1>
                <p className="text-xs text-gray-500">CBC Curriculum - Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Assignment Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create assignments aligned with Kenya's Competency-Based Curriculum (CBC). 
              Our AI assistant follows KICD guidelines and supports learner-centered approaches.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignment title"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Subject and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  CBC Subject *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    {...register('subject', { required: 'Subject is required' })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a CBC subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="assignment_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Type *
                </label>
                <select
                  {...register('assignment_type', { required: 'Assignment type is required' })}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select assignment type</option>
                  {assignmentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.assignment_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.assignment_type.message}</p>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('due_date')}
                  type="date"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your assignment requirements, learning objectives, and any specific CBC competencies to be assessed..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Include specific CBC competencies, learning outcomes, and assessment criteria as per KICD guidelines.
              </p>
            </div>

            {/* Initial Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Initial Content (Optional)
              </label>
              <textarea
                {...register('content')}
                rows={6}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Start working on your assignment here, or leave blank to begin with AI assistance aligned to CBC standards..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Our AI assistant will help ensure your work meets CBC learning outcomes and assessment standards.
              </p>
            </div>

            {/* CBC Compliance Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-1 rounded-full">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <h4 className="font-medium text-blue-900 mb-1">CBC Compliance</h4>
                  <p className="text-blue-700">
                    This AI assistant is designed to support Kenya's Competency-Based Curriculum, 
                    promoting learner-centered approaches, critical thinking, and practical application 
                    of knowledge as outlined by the Kenya Institute of Curriculum Development (KICD).
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                to="/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Creating...' : 'Create Assignment'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;