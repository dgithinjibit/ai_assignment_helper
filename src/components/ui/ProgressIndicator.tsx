import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Brain, FileText, Lightbulb } from 'lucide-react';
import type { AnalysisProgress } from '../../types';

interface ProgressIndicatorProps {
  progress: AnalysisProgress;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => {
  const stages = [
    { key: 'uploading', label: 'Uploading', icon: FileText },
    { key: 'processing', label: 'Processing', icon: Clock },
    { key: 'analyzing', label: 'Analyzing', icon: Brain },
    { key: 'generating', label: 'Generating Feedback', icon: Lightbulb },
    { key: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  const currentStageIndex = stages.findIndex(stage => stage.key === progress.stage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Your Assignment</h3>
        <p className="text-gray-600">{progress.message}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progress.progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stage Indicators */}
      <div className="flex justify-between">
        {stages.map((stage, index) => {
          const isCompleted = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isUpcoming = index > currentStageIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isCompleted
                    ? 'bg-green-100 text-green-600'
                    : isCurrent
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
              >
                <stage.icon className="h-5 w-5" />
              </motion.div>
              <span
                className={`text-xs text-center ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;