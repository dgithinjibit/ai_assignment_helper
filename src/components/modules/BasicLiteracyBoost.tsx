import React, { useState } from 'react';
import { BookOpen, Volume2, Award, Globe, Play, CheckCircle, Star } from 'lucide-react';
import { NIGERIAN_LANGUAGES } from '../../lib/nigerian-curriculum';
import { NigerianLanguage } from '../../types/nigerian-education';

interface BasicLiteracyBoostProps {
  targetGroup: 'primary-early' | 'out-of-school';
}

const BasicLiteracyBoost: React.FC<BasicLiteracyBoostProps> = ({ targetGroup }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<NigerianLanguage>('english');
  const [activeSkill, setActiveSkill] = useState<'reading' | 'writing' | 'numeracy'>('reading');

  const literacyModules = {
    reading: [
      { id: 'alphabet', name: 'Alphabet Recognition', level: 'Beginner', duration: '2 weeks', progress: 85 },
      { id: 'phonics', name: 'Phonics & Sounds', level: 'Beginner', duration: '3 weeks', progress: 60 },
      { id: 'sight-words', name: 'Common Sight Words', level: 'Intermediate', duration: '2 weeks', progress: 30 },
      { id: 'simple-sentences', name: 'Simple Sentences', level: 'Intermediate', duration: '3 weeks', progress: 0 }
    ],
    writing: [
      { id: 'letter-formation', name: 'Letter Formation', level: 'Beginner', duration: '3 weeks', progress: 70 },
      { id: 'word-writing', name: 'Writing Words', level: 'Beginner', duration: '2 weeks', progress: 45 },
      { id: 'sentence-writing', name: 'Writing Sentences', level: 'Intermediate', duration: '4 weeks', progress: 15 },
      { id: 'story-writing', name: 'Simple Stories', level: 'Advanced', duration: '4 weeks', progress: 0 }
    ],
    numeracy: [
      { id: 'number-recognition', name: 'Number Recognition (1-20)', level: 'Beginner', duration: '2 weeks', progress: 90 },
      { id: 'counting', name: 'Counting & Ordering', level: 'Beginner', duration: '2 weeks', progress: 75 },
      { id: 'basic-addition', name: 'Basic Addition', level: 'Intermediate', duration: '3 weeks', progress: 40 },
      { id: 'basic-subtraction', name: 'Basic Subtraction', level: 'Intermediate', duration: '3 weeks', progress: 20 }
    ]
  };

  const gamifiedActivities = [
    { name: 'Letter Hunt Game', description: 'Find letters in fun pictures', icon: '🔍', difficulty: 'Easy' },
    { name: 'Word Building Blocks', description: 'Build words with letter blocks', icon: '🧱', difficulty: 'Medium' },
    { name: 'Number Adventure', description: 'Count objects in exciting scenes', icon: '🎮', difficulty: 'Easy' },
    { name: 'Story Creator', description: 'Create your own simple stories', icon: '📖', difficulty: 'Hard' }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Basic Literacy & Numeracy Boost</h2>
            <p className="text-gray-600">
              {targetGroup === 'primary-early' 
                ? 'Foundation skills for Primary 1-3 students' 
                : 'Catch-up program for out-of-school youth'}
            </p>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-gray-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as NigerianLanguage)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {NIGERIAN_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* UBE Goal Highlight */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Universal Basic Education (UBE) Goal</h3>
        </div>
        <p className="text-sm text-blue-700">
          Supporting Nigeria's commitment to foundational literacy and numeracy for all children, 
          especially in underserved regions with high out-of-school rates.
        </p>
      </div>

      {/* Skill Navigation */}
      <div className="flex space-x-2 mb-6">
        {[
          { id: 'reading', label: 'Reading Skills', icon: BookOpen },
          { id: 'writing', label: 'Writing Skills', icon: Star },
          { id: 'numeracy', label: 'Numeracy Skills', icon: Award }
        ].map(skill => (
          <button
            key={skill.id}
            onClick={() => setActiveSkill(skill.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSkill === skill.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <skill.icon className="h-4 w-4" />
            <span>{skill.label}</span>
          </button>
        ))}
      </div>

      {/* Learning Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {literacyModules[activeSkill].map(module => (
          <div key={module.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{module.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(module.level)}`}>
                {module.level}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">Duration: {module.duration}</p>
            
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-medium">{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(module.progress)}`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Volume2 className="h-4 w-4" />
                <span>{selectedLanguage}</span>
              </div>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                <Play className="h-4 w-4" />
                <span className="text-sm">
                  {module.progress > 0 ? 'Continue' : 'Start'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Gamified Activities */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span>Fun Learning Games</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gamifiedActivities.map((activity, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{activity.icon}</div>
                <h4 className="font-medium text-gray-900">{activity.name}</h4>
              </div>
              <p className="text-sm text-gray-600 text-center mb-3">{activity.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activity.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {activity.difficulty}
                </span>
                <button className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Learning Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(literacyModules).map(([skill, modules]) => {
            const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0) / modules.length;
            return (
              <div key={skill} className="text-center">
                <div className="mb-2">
                  <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                    skill === 'reading' ? 'bg-blue-100' :
                    skill === 'writing' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    {skill === 'reading' ? <BookOpen className="h-8 w-8 text-blue-600" /> :
                     skill === 'writing' ? <Star className="h-8 w-8 text-green-600" /> :
                     <Award className="h-8 w-8 text-orange-600" />}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 capitalize">{skill}</h4>
                <p className="text-2xl font-bold text-gray-900">{Math.round(totalProgress)}%</p>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Keep up the great work!</span>
          </div>
          <p className="text-sm text-gray-600">
            You're building strong foundation skills that will help you succeed in your education journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicLiteracyBoost;