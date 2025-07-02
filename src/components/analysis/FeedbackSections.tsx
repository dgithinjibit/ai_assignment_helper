import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen, MessageSquare, Lightbulb, Target, Palette } from 'lucide-react';
import type { FeedbackSection } from '../../types';

interface FeedbackSectionsProps {
  sections: FeedbackSection[];
}

const FeedbackSections: React.FC<FeedbackSectionsProps> = ({ sections }) => {
  const [selectedSection, setSelectedSection] = useState<string>(sections[0]?.category || '');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'structure': return Target;
      case 'content': return BookOpen;
      case 'language': return MessageSquare;
      case 'critical_thinking': return Lightbulb;
      case 'creativity': return Palette;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'structure': return 'blue';
      case 'content': return 'green';
      case 'language': return 'purple';
      case 'critical_thinking': return 'orange';
      case 'creativity': return 'pink';
      default: return 'gray';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const selectedSectionData = sections.find(s => s.category === selectedSection);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Feedback</h3>
        <p className="text-gray-600 text-sm">
          Comprehensive analysis of your work across different competency areas.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = getCategoryIcon(section.category);
              const color = getCategoryColor(section.category);
              const isSelected = selectedSection === section.category;

              return (
                <button
                  key={section.category}
                  onClick={() => setSelectedSection(section.category)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    isSelected
                      ? `bg-${color}-100 border-${color}-200 border`
                      : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isSelected ? `text-${color}-600` : 'text-gray-500'}`} />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{section.title}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getScoreColor(section.score)}`}>
                          {section.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Content */}
        <div className="lg:col-span-3">
          {selectedSectionData && (
            <motion.div
              key={selectedSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-gray-900">{selectedSectionData.title}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= selectedSectionData.score / 20
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedSectionData.score)}`}>
                    {selectedSectionData.score}%
                  </span>
                </div>
              </div>

              {/* Main Feedback */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Overall Assessment</h5>
                <p className="text-gray-700 leading-relaxed">{selectedSectionData.feedback}</p>
              </div>

              {/* Specific Examples */}
              {selectedSectionData.specific_examples.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Specific Examples</h5>
                  <div className="space-y-2">
                    {selectedSectionData.specific_examples.map((example, index) => (
                      <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-3">
                        <p className="text-blue-800 text-sm">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Improvement Suggestions */}
              {selectedSectionData.improvement_suggestions.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Suggestions for Improvement</h5>
                  <div className="space-y-2">
                    {selectedSectionData.improvement_suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {selectedSectionData.resources.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Recommended Resources</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedSectionData.resources.map((resource, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h6 className="font-medium text-gray-900 text-sm">{resource.title}</h6>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs mb-2">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            resource.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            resource.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {resource.difficulty}
                          </span>
                          {resource.url && (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                            >
                              View Resource
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSections;