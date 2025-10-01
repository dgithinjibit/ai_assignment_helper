import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Award, Globe } from 'lucide-react';
import { CORE_SUBJECTS, TRADE_SUBJECTS, NIGERIAN_LANGUAGES } from '../../lib/nigerian-curriculum';
import { EducationLevel, NigerianLanguage } from '../../types/nigerian-education';

interface DigitalCurriculumHubProps {
  userLevel: EducationLevel;
  userGrade: string;
}

const DigitalCurriculumHub: React.FC<DigitalCurriculumHubProps> = ({ userLevel, userGrade }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<NigerianLanguage>('english');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Filter subjects based on user level
  const availableSubjects = [...CORE_SUBJECTS, ...TRADE_SUBJECTS].filter(
    subject => subject.levels.includes(userLevel)
  );

  const newCurriculumSubjects = availableSubjects.filter(subject => subject.isNew2025);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Digital Curriculum Hub</h2>
            <p className="text-gray-600">Aligned with Nigeria's 2025 Reformed Curriculum</p>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-gray-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as NigerianLanguage)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {NIGERIAN_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* New 2025 Curriculum Highlights */}
      {newCurriculumSubjects.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">New 2025 Curriculum Subjects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {newCurriculumSubjects.map(subject => (
              <div key={subject.id} className="flex items-center space-x-2 text-sm text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span>{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {availableSubjects.map(subject => (
          <div
            key={subject.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedSubject === subject.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedSubject(subject.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{subject.name}</h3>
              {subject.isNew2025 && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  New 2025
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{subject.description}</p>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs ${
                subject.category === 'core' ? 'bg-blue-100 text-blue-800' :
                subject.category === 'trade' ? 'bg-orange-100 text-orange-800' :
                subject.category === 'language' ? 'bg-purple-100 text-purple-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {subject.category.charAt(0).toUpperCase() + subject.category.slice(1)}
              </span>
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                <Play className="h-4 w-4" />
                <span className="text-sm">Start Learning</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Subject Details */}
      {selectedSubject && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {availableSubjects.find(s => s.id === selectedSubject)?.name} - {userGrade} Content
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Video Lessons</h4>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <Play className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Lesson {i}: Introduction to Topic</p>
                      <p className="text-sm text-gray-600">15 minutes • {selectedLanguage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Interactive Quizzes</h4>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Quiz {i}: Test Your Knowledge</p>
                      <p className="text-sm text-gray-600">10 questions • Multiple choice</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalCurriculumHub;