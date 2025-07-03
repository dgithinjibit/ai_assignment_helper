import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Type, Calendar, BookOpen, Target } from 'lucide-react';
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
    { value: 'essay', label: 'Essay Writing' },
    { value: 'math', label: 'Mathematics Problem' },
    { value: 'code', label: 'Programming/ICT Project' },
    { value: 'research', label: 'Research Project' },
    { value: 'general', label: 'General Assignment' },
  ];

  const handleFileSelect = (file: File) => {
    // In a real implementation, you would extract text from the file
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFormData(prev => ({ 
        ...prev, 
        content,
        title: file.name.replace(/\.[^/.]+$/, '') // Remove file extension
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

  const handleObjectiveAdd = (objective: string) => {
    if (objective.trim() && !formData.learningObjectives?.includes(objective.trim())) {
      setFormData(prev => ({
        ...prev,
        learningObjectives: [...(prev.learningObjectives || []), objective.trim()]
      }));
    }
  };

  const handleObjectiveRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Submit Your Assignment</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Get CBC-aligned AI feedback and personalized learning guidance
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Input Method Toggle */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setInputMethod('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              inputMethod === 'text'
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Type className="h-4 w-4" />
            <span>Type/Paste Text</span>
          </button>
          
          <button
            type="button"
            onClick={() => setInputMethod('file')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              inputMethod === 'file'
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span>Upload File</span>
          </button>
        </div>

        {/* Assignment Context */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CBC Subject *
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Grade Level *
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={formData.gradeLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, gradeLevel: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assignment Type
            </label>
            <select
              value={formData.assignmentType}
              onChange={(e) => setFormData(prev => ({ ...prev, assignmentType: e.target.value }))}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              Due Date (Optional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Assignment Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assignment Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter assignment title"
            required
          />
        </div>

        {/* Assignment Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assignment Content *
          </label>
          
          {inputMethod === 'text' ? (
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={12}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Paste your assignment content here, or describe what you need help with..."
              required
            />
          ) : (
            <FileUpload onFileSelect={handleFileSelect} />
          )}
          
          {formData.content && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Content length: {formData.content.length} characters
            </p>
          )}
        </div>

        {/* Additional Context */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Context (Optional)
            </label>
            <textarea
              value={formData.courseContext}
              onChange={(e) => setFormData(prev => ({ ...prev, courseContext: e.target.value }))}
              rows={3}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Provide context about your course, unit, or topic..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specific Requirements (Optional)
            </label>
            <textarea
              value={formData.specificRequirements}
              onChange={(e) => setFormData(prev => ({ ...prev, specificRequirements: e.target.value }))}
              rows={3}
              className="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Any specific requirements, rubric criteria, or guidelines..."
            />
          </div>
        </div>

        {/* CBC Compliance Notice */}
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 dark:bg-green-800 p-1 rounded-full">
              <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-sm">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">CBC-Aligned Analysis</h4>
              <p className="text-green-800 dark:text-green-200">
                Our AI will analyze your assignment against Kenya's Competency-Based Curriculum standards, 
                focusing on core competencies, values integration, and learning outcomes as outlined by KICD.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !formData.content.trim() || !formData.subject || !formData.gradeLevel}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>{loading ? 'Analyzing...' : 'Get CBC Analysis'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentInput;