import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Upload, FileText, Target, BookOpen } from 'lucide-react';
import FileUpload from '../components/ui/FileUpload';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import type { AnalysisProgress, AssignmentFormData } from '../types';
import toast from 'react-hot-toast';

const AssignmentUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<AnalysisProgress>({
    stage: 'uploading',
    progress: 0,
    message: 'Ready to upload your assignment'
  });
  const [assignmentData, setAssignmentData] = useState<Partial<AssignmentFormData>>({
    subject: '',
    assignment_type: 'essay',
    grade_level: '',
    learning_objectives: []
  });

  const cbcSubjects = [
    'Mathematics', 'English', 'Kiswahili', 'Science and Technology',
    'Social Studies', 'Christian Religious Education', 'Islamic Religious Education',
    'Home Science', 'Art and Craft', 'Music', 'Physical Education',
    'French', 'German', 'Computer Studies', 'Agriculture'
  ];

  const gradeLevels = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Form 1', 'Form 2', 'Form 3', 'Form 4'
  ];

  const assignmentTypes = [
    { value: 'essay', label: 'Essay Writing' },
    { value: 'math', label: 'Mathematics Problem' },
    { value: 'code', label: 'Programming/ICT Project' },
    { value: 'research', label: 'Research Project' },
    { value: 'general', label: 'General Assignment' },
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    toast.success(`File "${file.name}" selected successfully`);
  };

  const simulateProcessing = async () => {
    const stages = [
      { stage: 'uploading', progress: 20, message: 'Uploading your assignment...' },
      { stage: 'processing', progress: 40, message: 'Processing file content...' },
      { stage: 'analyzing', progress: 70, message: 'Analyzing against CBC standards...' },
      { stage: 'generating', progress: 90, message: 'Generating personalized feedback...' },
      { stage: 'completed', progress: 100, message: 'Analysis complete!' },
    ];

    for (const stage of stages) {
      setProgress(stage as AnalysisProgress);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to analyze');
      return;
    }

    if (!assignmentData.subject || !assignmentData.grade_level) {
      toast.error('Please fill in the required assignment details');
      return;
    }

    setIsProcessing(true);
    
    try {
      await simulateProcessing();
      toast.success('Assignment analyzed successfully!');
      navigate('/assignment/analysis/1'); // Navigate to analysis page
    } catch (error) {
      toast.error('Failed to analyze assignment');
      setIsProcessing(false);
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
                <h1 className="text-xl font-bold text-gray-900">Upload Assignment</h1>
                <p className="text-xs text-gray-500">CBC Curriculum - Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isProcessing ? (
          <ProgressIndicator progress={progress} />
        ) : (
          <div className="space-y-8">
            {/* Assignment Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Assignment Details</h2>
                <p className="text-gray-600 text-sm">
                  Provide context about your assignment to get more accurate CBC-aligned feedback.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CBC Subject *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      value={assignmentData.subject}
                      onChange={(e) => setAssignmentData(prev => ({ ...prev, subject: e.target.value }))}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a CBC subject</option>
                      {cbcSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level *
                  </label>
                  <div className="relative">
                    <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      value={assignmentData.grade_level}
                      onChange={(e) => setAssignmentData(prev => ({ ...prev, grade_level: e.target.value }))}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select grade level</option>
                      {gradeLevels.map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Type
                  </label>
                  <select
                    value={assignmentData.assignment_type}
                    onChange={(e) => setAssignmentData(prev => ({ ...prev, assignment_type: e.target.value as any }))}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {assignmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload Your Assignment</h2>
                <p className="text-gray-600 text-sm">
                  Upload your assignment file for AI-powered analysis and feedback.
                </p>
              </div>

              <FileUpload onFileSelect={handleFileSelect} />

              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900">{selectedFile.name}</h4>
                      <p className="text-sm text-blue-700">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* CBC Compliance Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900 mb-2">CBC-Aligned Analysis</h3>
                  <p className="text-green-800 text-sm mb-3">
                    Our AI will analyze your assignment against Kenya's Competency-Based Curriculum standards, 
                    focusing on:
                  </p>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Core competencies and learning outcomes</li>
                    <li>• Critical thinking and problem-solving skills</li>
                    <li>• Communication and collaboration abilities</li>
                    <li>• Creativity and imagination development</li>
                    <li>• Values and citizenship integration</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || !assignmentData.subject || !assignmentData.grade_level}
                className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Upload className="h-5 w-5" />
                <span>Analyze Assignment</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentUpload;