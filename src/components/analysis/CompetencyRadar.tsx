import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { CompetencyAnalysis } from '../../types';

interface CompetencyRadarProps {
  analysis: CompetencyAnalysis;
}

const CompetencyRadar: React.FC<CompetencyRadarProps> = ({ analysis }) => {
  const data = analysis.competencies.map(comp => ({
    competency: comp.name,
    level: comp.level === 'novice' ? 1 : comp.level === 'developing' ? 2 : comp.level === 'proficient' ? 3 : 4,
    fullMark: 4,
  }));

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'novice': return 'text-red-600 bg-red-100';
      case 'developing': return 'text-orange-600 bg-orange-100';
      case 'proficient': return 'text-blue-600 bg-blue-100';
      case 'advanced': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Competency Analysis</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Overall Level:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(analysis.overall_level)}`}>
            {analysis.overall_level.charAt(0).toUpperCase() + analysis.overall_level.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="competency" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 4]}
                tick={{ fontSize: 10 }}
                tickCount={5}
              />
              <Radar
                name="Competency Level"
                dataKey="level"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Competency Details */}
        <div className="space-y-4">
          {analysis.competencies.map((comp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{comp.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(comp.level)}`}>
                  {comp.level}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{comp.description}</p>
              {comp.evidence.length > 0 && (
                <div className="text-xs text-gray-500">
                  <strong>Evidence:</strong> {comp.evidence.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
        <div>
          <h4 className="font-medium text-green-900 mb-3">Strengths</h4>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-green-700 flex items-start">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-orange-900 mb-3">Areas for Improvement</h4>
          <ul className="space-y-2">
            {analysis.areas_for_improvement.map((area, index) => (
              <li key={index} className="text-sm text-orange-700 flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompetencyRadar;