import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Target, TrendingUp } from 'lucide-react';
import type { CompetencyAssessment } from '../../types';

interface CBCCompetencyCardProps {
  competency: CompetencyAssessment;
  index: number;
}

const CBCCompetencyCard: React.FC<CBCCompetencyCardProps> = ({ competency, index }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'novice': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'developing': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'proficient': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'advanced': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'novice': return Circle;
      case 'developing': return Target;
      case 'proficient': return CheckCircle;
      case 'advanced': return TrendingUp;
      default: return Circle;
    }
  };

  const LevelIcon = getLevelIcon(competency.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {competency.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {competency.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <LevelIcon className="h-5 w-5 text-gray-400" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(competency.level)}`}>
            {competency.level.charAt(0).toUpperCase() + competency.level.slice(1)}
          </span>
        </div>
      </div>

      {/* Evidence */}
      {competency.evidence.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Evidence</h4>
          <ul className="space-y-1">
            {competency.evidence.map((evidence, idx) => (
              <li key={idx} className="text-sm text-green-700 dark:text-green-400 flex items-start">
                <CheckCircle className="h-3 w-3 mt-0.5 mr-2 flex-shrink-0" />
                {evidence}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {competency.suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Suggestions for Improvement</h4>
          <ul className="space-y-1">
            {competency.suggestions.map((suggestion, idx) => (
              <li key={idx} className="text-sm text-orange-700 dark:text-orange-400 flex items-start">
                <Target className="h-3 w-3 mt-0.5 mr-2 flex-shrink-0" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default CBCCompetencyCard;