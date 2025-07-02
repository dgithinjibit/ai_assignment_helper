import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Lightbulb, ChevronDown, ChevronRight } from 'lucide-react';
import type { SocraticQuestion } from '../../types';

interface SocraticQuestionsProps {
  questions: SocraticQuestion[];
}

const SocraticQuestions: React.FC<SocraticQuestionsProps> = ({ questions }) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Questions', color: 'gray' },
    { key: 'clarification', label: 'Clarification', color: 'blue' },
    { key: 'assumptions', label: 'Assumptions', color: 'purple' },
    { key: 'evidence', label: 'Evidence', color: 'green' },
    { key: 'perspective', label: 'Perspective', color: 'orange' },
    { key: 'implications', label: 'Implications', color: 'red' },
    { key: 'meta', label: 'Metacognition', color: 'indigo' },
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(c => c.key === category);
    const color = categoryData?.color || 'gray';
    
    const colors = {
      gray: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-100 text-blue-700',
      purple: 'bg-purple-100 text-purple-700',
      green: 'bg-green-100 text-green-700',
      orange: 'bg-orange-100 text-orange-700',
      red: 'bg-red-100 text-red-700',
      indigo: 'bg-indigo-100 text-indigo-700',
    };
    
    return colors[color as keyof typeof colors];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Socratic Questions</h3>
        </div>
        <p className="text-gray-600 text-sm">
          These questions are designed to guide your thinking and help you discover deeper insights about your work.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? getCategoryColor(category.key)
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(question.id)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{question.question}</p>
                    <p className="text-sm text-gray-600">{question.purpose}</p>
                  </div>
                  <div className="ml-4">
                    {expandedQuestions.has(question.id) ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedQuestions.has(question.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-gray-50"
                  >
                    <div className="p-4">
                      <div className="flex items-start space-x-2 mb-3">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Thinking Hints</h5>
                          <ul className="space-y-1">
                            {question.follow_up_hints.map((hint, hintIndex) => (
                              <li key={hintIndex} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {hint}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No questions available for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default SocraticQuestions;