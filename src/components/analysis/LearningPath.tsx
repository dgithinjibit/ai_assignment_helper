import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, BookOpen, Target, Award, ArrowRight } from 'lucide-react';
import type { LearningPathItem } from '../../types';

interface LearningPathProps {
  items: LearningPathItem[];
  onItemComplete?: (itemId: string) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ items, onItemComplete }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return BookOpen;
      case 'skill': return Target;
      case 'practice': return Circle;
      case 'assessment': return Award;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'blue';
      case 'skill': return 'green';
      case 'practice': return 'orange';
      case 'assessment': return 'purple';
      default: return 'gray';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < difficulty ? 'bg-yellow-400' : 'bg-gray-200'
        }`}
      />
    ));
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const completedItems = items.filter(item => item.completed).length;
  const progressPercentage = (completedItems / items.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Personalized Learning Path</h3>
          <div className="text-sm text-gray-600">
            {completedItems} of {items.length} completed
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        
        <p className="text-gray-600 text-sm">
          Follow this personalized learning path to strengthen your competencies and achieve your learning goals.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = getTypeIcon(item.type);
          const color = getTypeColor(item.type);
          const isSelected = selectedItem === item.id;
          const isAvailable = index === 0 || items[index - 1].completed;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                item.completed
                  ? 'border-green-200 bg-green-50'
                  : isAvailable
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 bg-gray-50 opacity-60'
              }`}
            >
              <div
                className={`p-4 cursor-pointer ${isAvailable ? 'hover:bg-gray-50' : ''}`}
                onClick={() => isAvailable && setSelectedItem(isSelected ? null : item.id)}
              >
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {item.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : isAvailable ? (
                      <Circle className="h-6 w-6 text-gray-400" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className={`h-4 w-4 text-${color}-600`} />
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-700`}>
                            {item.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{formatTime(item.estimated_time)}</span>
                          </div>
                        </div>
                        
                        <h4 className={`font-medium mb-1 ${
                          item.completed ? 'text-green-900' : isAvailable ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {item.title}
                        </h4>
                        
                        <p className={`text-sm mb-2 ${
                          item.completed ? 'text-green-700' : isAvailable ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {item.description}
                        </p>

                        {/* Difficulty */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Difficulty:</span>
                          <div className="flex space-x-1">
                            {getDifficultyStars(item.difficulty)}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      {isAvailable && !item.completed && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemComplete?.(item.id);
                          }}
                          className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          Start
                        </button>
                      )}
                    </div>

                    {/* Prerequisites */}
                    {item.prerequisites.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Prerequisites:</span> {item.prerequisites.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 bg-gray-50 p-4"
                >
                  {item.resources.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Resources</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        {item.resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="bg-white border border-gray-200 rounded p-3">
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
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium"
                                >
                                  <span>Access</span>
                                  <ArrowRight className="h-3 w-3" />
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;