import React, { useState } from 'react';
import { GraduationCap, BookOpen, Target, Compass, Users, TrendingUp } from 'lucide-react';
import DigitalCurriculumHub from '../components/modules/DigitalCurriculumHub';
import SkillTradeMastery from '../components/modules/SkillTradeMastery';
import ExamPrepNavigator from '../components/modules/ExamPrepNavigator';
import CareerCompass from '../components/modules/CareerCompass';
import BasicLiteracyBoost from '../components/modules/BasicLiteracyBoost';
import { EDUCATION_STRUCTURE } from '../lib/nigerian-curriculum';
import { EducationLevel } from '../types/nigerian-education';

const NaijaScholarDashboard: React.FC = () => {
  const [userLevel, setUserLevel] = useState<EducationLevel>('sss');
  const [userGrade, setUserGrade] = useState('SSS3');
  const [activeModule, setActiveModule] = useState<'curriculum' | 'skills' | 'exams' | 'career' | 'literacy'>('curriculum');

  const modules = [
    {
      id: 'literacy',
      name: 'Basic Literacy & Numeracy Boost',
      description: 'Foundation skills for early learners & catch-up',
      icon: BookOpen,
      color: 'blue',
      targetUsers: 'Primary 1-3, Out-of-School Youth'
    },
    {
      id: 'curriculum',
      name: 'Digital Curriculum Hub',
      description: 'Video lessons & quizzes aligned with 2025 reforms',
      icon: TrendingUp,
      color: 'green',
      targetUsers: 'Primary 1-6, JSS 1-3, SSS 1-3'
    },
    {
      id: 'skills',
      name: 'Skill & Trade Mastery',
      description: 'TVET integration with practical skills',
      icon: Users,
      color: 'orange',
      targetUsers: 'JSS (Upper Basic), SSS (Post-Basic)'
    },
    {
      id: 'exams',
      name: 'Exam Prep Navigator',
      description: 'BECE, WAEC/NECO, JAMB preparation',
      icon: Target,
      color: 'blue',
      targetUsers: 'JSS 3, SSS 3'
    },
    {
      id: 'career',
      name: 'Higher Ed & Career Compass',
      description: 'University finder & scholarship alerts',
      icon: Compass,
      color: 'purple',
      targetUsers: 'SSS 1-3'
    }
  ];

  const userLevelData = EDUCATION_STRUCTURE.find(level => level.grade === userGrade);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Naija Scholar</h1>
                <p className="text-sm text-gray-600">Nigerian Education System (9-3-4)</p>
              </div>
            </div>
            
            {/* User Level Selector */}
            <div className="flex items-center space-x-4">
              <select
                value={userGrade}
                onChange={(e) => {
                  setUserGrade(e.target.value);
                  const levelData = EDUCATION_STRUCTURE.find(level => level.grade === e.target.value);
                  if (levelData) setUserLevel(levelData.level);
                }}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {EDUCATION_STRUCTURE.map(level => (
                  <option key={level.grade} value={level.grade}>
                    {level.grade} ({level.ageRange} years)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Naija Scholar!</h2>
                <p className="text-green-100 mb-1">
                  Currently in: <strong>{userGrade}</strong> ({userLevelData?.description})
                </p>
                <p className="text-green-100">
                  Age Range: {userLevelData?.ageRange} years • Level: {userLevel.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-lg p-3">
                  <TrendingUp className="h-8 w-8 mb-2" />
                  <p className="text-sm">2025 Reformed Curriculum</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {modules.map(module => (
            <div
              key={module.id}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                activeModule === module.id
                  ? 'bg-blue-50 border-2 border-blue-500 shadow-lg'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setActiveModule(module.id as any)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  module.color === 'blue' ? 'bg-blue-100' :
                  module.color === 'green' ? 'bg-green-100' :
                  module.color === 'orange' ? 'bg-orange-100' :
                  module.color === 'purple' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  <module.icon className={`h-6 w-6 ${
                    module.color === 'blue' ? 'text-blue-600' :
                    module.color === 'green' ? 'text-green-600' :
                    module.color === 'orange' ? 'text-orange-600' :
                    module.color === 'purple' ? 'text-purple-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{module.name}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{module.description}</p>
              <p className="text-xs text-gray-500">{module.targetUsers}</p>
            </div>
          ))}
        </div>

        {/* Active Module Content */}
        <div className="mb-8">
          {activeModule === 'literacy' && (
            <BasicLiteracyBoost 
              targetGroup={userLevel === 'primary' && ['P1', 'P2', 'P3'].includes(userGrade) ? 'primary-early' : 'out-of-school'} 
            />
          )}

          {activeModule === 'curriculum' && (
            <DigitalCurriculumHub userLevel={userLevel} userGrade={userGrade} />
          )}
          
          {activeModule === 'skills' && (userLevel === 'jss' || userLevel === 'sss') && (
            <SkillTradeMastery userLevel={userLevel as 'jss' | 'sss'} />
          )}
          
          {activeModule === 'exams' && (
            <ExamPrepNavigator userLevel={userLevel} userGrade={userGrade} />
          )}
          
          {activeModule === 'career' && userLevel === 'sss' && (
            <CareerCompass userLevel="sss" userGrade={userGrade} />
          )}

          {/* Module not available message */}
          {((activeModule === 'skills' && userLevel === 'primary') ||
            (activeModule === 'career' && userLevel !== 'sss')) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
              <div className="text-yellow-600 mb-2">
                <Target className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Module Not Available for Your Level
              </h3>
              <p className="text-yellow-700">
                {activeModule === 'skills' 
                  ? 'Skill & Trade Mastery is available from JSS level onwards.'
                  : 'Career Compass is designed for Senior Secondary School students.'}
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Learning Progress</h3>
                <p className="text-2xl font-bold text-blue-600">78%</p>
                <p className="text-sm text-gray-600">Current term completion</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Exam Readiness</h3>
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-sm text-gray-600">JAMB/WAEC prep score</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Trade Skills</h3>
                <p className="text-2xl font-bold text-orange-600">3</p>
                <p className="text-sm text-gray-600">TVET skills in progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Compass className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Career Matches</h3>
                <p className="text-2xl font-bold text-purple-600">12</p>
                <p className="text-sm text-gray-600">Universities & scholarships</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaijaScholarDashboard;