import React, { useState } from 'react';
import { Wrench, Play, Award, TrendingUp, Users, Clock, DollarSign, MapPin, Star } from 'lucide-react';
import { TRADE_SUBJECTS, ENHANCED_TRADE_SKILLS } from '../../lib/nigerian-curriculum';
import { EnhancedTradeSkill } from '../../types/nigerian-education';


interface SkillTradeMasteryProps {
  userLevel: 'jss' | 'sss';
}

const SkillTradeMastery: React.FC<SkillTradeMasteryProps> = ({ userLevel }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'careers' | 'certification'>('overview');

  // Filter trade subjects based on user level
  const availableSkills = TRADE_SUBJECTS.filter(skill => skill.levels.includes(userLevel));
  const enhancedSkills: EnhancedTradeSkill[] = ENHANCED_TRADE_SKILLS || [];

  const selectedSkillData = availableSkills.find(skill => skill.id === selectedSkill);
  const selectedEnhancedSkill = enhancedSkills.find(skill => skill.id === selectedSkill);

  const skillCategories = [
    { id: 'renewable-energy', name: 'Renewable Energy', icon: '☀️', color: 'green' },
    { id: 'creative-arts', name: 'Creative Arts', icon: '🎨', color: 'pink' },
    { id: 'technology', name: 'Technology', icon: '💻', color: 'blue' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾', color: 'yellow' },
    { id: 'hospitality', name: 'Hospitality', icon: '🍽️', color: 'purple' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Wrench className="h-8 w-8 text-orange-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skill & Trade Mastery (TVET)</h2>
          <p className="text-gray-600">Master practical skills for Nigeria's growing economy 🇳🇬</p>
        </div>
      </div>

      {/* New 2025 Reform Highlight */}
      <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="h-5 w-5 text-orange-600" />
          <h3 className="font-semibold text-orange-800">2025 Curriculum Reform Focus</h3>
        </div>
        <p className="text-sm text-orange-700">
          Enhanced TVET integration with emphasis on digital skills, renewable energy, and entrepreneurship for workforce readiness
        </p>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {skillCategories.map(category => (
          <div key={category.id} className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-2xl mb-1">{category.icon}</div>
            <p className="text-sm font-medium text-gray-700">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {availableSkills.map(skill => {
          const enhancedData = enhancedSkills.find(e => e.id === skill.id);
          return (
            <div
              key={skill.id}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedSkill === skill.id
                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                  : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedSkill(skill.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900">{skill.name}</h3>
                {skill.isNew2025 && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                    New 2025
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
              
              {enhancedData && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-blue-600">{enhancedData.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Practical Hours:</span>
                    <span className="font-medium text-green-600">{enhancedData.practicalHours}h</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{skill.careerPaths.length} careers</span>
                </div>
                <button className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 font-medium">
                  <Play className="h-4 w-4" />
                  <span className="text-sm">Start Learning</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Details */}
      {selectedSkillData && (
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedSkillData.name}</h3>
              <p className="text-gray-600">{selectedSkillData.description}</p>
            </div>
            <div className="flex space-x-2">
              {['overview', 'modules', 'careers', 'certification'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'overview' ? 'Overview' : 
                   tab === 'modules' ? 'Learning Modules' : 
                   tab === 'careers' ? 'Career Paths' :
                   'Certification'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'overview' && selectedEnhancedSkill && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <span>What You'll Learn</span>
                </h4>
                <div className="space-y-3">
                  {selectedEnhancedSkill.modules.map((module, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                      <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Course Details</span>
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-bold text-blue-600">{selectedEnhancedSkill.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Practical Hours:</span>
                      <span className="font-bold text-green-600">{selectedEnhancedSkill.practicalHours} hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-bold text-purple-600 capitalize">{selectedEnhancedSkill.category.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg">
                    <h5 className="font-semibold mb-2">Certifications Available:</h5>
                    <div className="space-y-2">
                      {selectedEnhancedSkill.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'modules' && selectedEnhancedSkill && (
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Learning Modules</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedEnhancedSkill.modules.map((module, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-gray-900">Module {index + 1}: {module}</h5>
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Comprehensive hands-on training with real-world applications and industry best practices.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Duration: 2-4 weeks</span>
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        Start Module
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'careers' && selectedEnhancedSkill && (
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Career Opportunities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedEnhancedSkill.careerPaths.map((career, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h5 className="font-semibold text-gray-900">{career.title}</h5>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Expected Salary:</span>
                        <span className="font-bold text-green-600">{career.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Available nationwide</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Explore Career
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certification' && selectedEnhancedSkill && (
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Certification Pathway</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-semibold">Available Certifications:</h5>
                  {selectedEnhancedSkill.certifications.map((cert, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <h6 className="font-medium text-gray-900">{cert}</h6>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Industry-recognized certification that validates your skills and expertise.
                      </p>
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-semibold">Certification Process:</h5>
                  <div className="space-y-3">
                    {[
                      'Complete all learning modules',
                      'Pass practical assessments',
                      'Submit portfolio project',
                      'Take final certification exam',
                      'Receive digital certificate'
                    ].map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-orange-600" />
            <h4 className="font-semibold text-orange-800">Active Skills</h4>
          </div>
          <p className="text-2xl font-bold text-orange-600">2</p>
          <p className="text-sm text-orange-700">Currently learning</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Modules Done</h4>
          </div>
          <p className="text-2xl font-bold text-green-600">12</p>
          <p className="text-sm text-green-700">Practical sessions</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Certificates</h4>
          </div>
          <p className="text-2xl font-bold text-blue-600">1</p>
          <p className="text-sm text-blue-700">Skills certified</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <h4 className="font-semibold text-purple-800">Earning Potential</h4>
          </div>
          <p className="text-2xl font-bold text-purple-600">₦200K+</p>
          <p className="text-sm text-purple-700">Monthly income</p>
        </div>
      </div>
    </div>
  );
};

export default SkillTradeMastery;