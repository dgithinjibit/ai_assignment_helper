import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Type, Calendar, BookOpen, Target, Star, Heart, Sparkles } from 'lucide-react';
import FileUpload from './FileUpload';

interface AssignmentInputProps {
  onSubmit: (data: AssignmentInputData) => void;
  loading?: boolean;
}

interface AssignmentInputData {
  content: string;
  title: string;
  subject: string;
  gradeLevel: string;
  assignmentType: string;
  dueDate?: string;
  courseContext?: string;
  specificRequirements?: string;
  learningObjectives?: string[];
}

const AssignmentInput: React.FC<AssignmentInputProps> = ({ onSubmit, loading = false }) => {
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [formData, setFormData] = useState<AssignmentInputData>({
    content: '',
    title: '',
    subject: '',
    gradeLevel: '',
    assignmentType: 'essay',
    dueDate: '',
    courseContext: '',
    specificRequirements: '',
    learningObjectives: []
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
    { value: 'essay', label: 'Essay Writing ✍️' },
    { value: 'math', label: 'Math Problem 🔢' },
    { value: 'code', label: 'Computer Project 💻' },
    { value: 'research', label: 'Research Project 🔍' },
    { value: 'general', label: 'General Assignment 📝' },
  ];

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFormData(prev => ({ 
        ...prev, 
        content,
        title: file.name.replace(/\.[^/.]+$/, '')
      }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim() || !formData.subject || !formData.gradeLevel) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <Star className="h-4 w-4 text-yellow-300" />
            <Heart className="h-4 w-4 text-pink-300" />
            <Sparkles className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Upload Your Homework! 📚</h2>
            <p className="text-sm text-green-100 mt-1">
              Let's learn together and have some fun! 🎉
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Input Method Toggle */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setInputMethod('text')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
              inputMethod === 'text'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg transform scale-105'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Type className="h-4 w-4" />
            <span>Type/Paste ✍️</span>
          </button>
          
          <button
            type="button"
            onClick={() => setInputMethod('file')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
              inputMethod === 'file'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg transform scale-105'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span>Upload File 📁</span>
          </button>
        </div>

        {/* Assignment Context */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📚 What Subject? *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Pick your subject! 🎯</option>
                {cbcSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🎓 What Grade? *
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.gradeLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, gradeLevel: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Choose your grade! 📊</option>
                {gradeLevels.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📝 What Type of Assignment?
            </label>
            <select
              value={formData.assignmentType}
              onChange={(e) => setFormData(prev => ({ ...prev, assignmentType: e.target.value }))}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {assignmentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📅 When is it due? (Optional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Assignment Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🏷️ What's your assignment called? *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Give your assignment a cool title! ✨"
            required
          />
        </div>

        {/* Assignment Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            📖 Your Assignment Content *
          </label>
          
          {inputMethod === 'text' ? (
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={12}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Paste your homework here, or tell me what you need help with! I'm excited to help you learn! 🌟"
              required
            />
          ) : (
            <FileUpload onFileSelect={handleFileSelect} />
          )}
          
          {formData.content && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Great! You've written {formData.content.length} characters! 📊
            </p>
          )}
        </div>

        {/* Fun Learning Notice */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-sm">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-1 flex items-center space-x-2">
                <span>Fun Learning with Mwalimu AI!</span>
                <span className="text-lg">🎉</span>
              </h4>
              <p className="text-green-800 dark:text-green-200">
                I'll help you understand your homework in a fun way! We'll chat about it together and I'll guide you 
                to discover the answers yourself. Learning is an adventure! 🚀✨
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !formData.content.trim() || !formData.subject || !formData.gradeLevel}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FileText className="h-5 w-5" />
            <span>{loading ? 'Getting Ready... 🤔' : "Let's Learn Together! 🚀"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentInput;