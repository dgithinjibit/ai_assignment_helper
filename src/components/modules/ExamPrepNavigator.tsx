import React, { useState } from 'react';
import { FileText, Clock, Target, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { EXAMINATIONS } from '../../lib/nigerian-curriculum';
import { EducationLevel } from '../../types/nigerian-education';

interface ExamPrepNavigatorProps {
  userLevel: EducationLevel;
  userGrade: string;
}

const ExamPrepNavigator: React.FC<ExamPrepNavigatorProps> = ({ userLevel, userGrade }) => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'practice' | 'pastQuestions' | 'validator'>('practice');

  // Filter exams based on user level
  const availableExams = EXAMINATIONS.filter(exam => exam.level === userLevel);

  const mockExamData = {
    bece: { completed: 12, total: 20, averageScore: 78 },
    waec: { completed: 8, total: 15, averageScore: 82 },
    neco: { completed: 6, total: 12, averageScore: 75 },
    jamb: { completed: 25, total: 30, averageScore: 285 }
  };

  const subjectCombinations = {
    'Medicine': ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    'Engineering': ['English', 'Mathematics', 'Physics', 'Chemistry'],
    'Law': ['English', 'Literature', 'Government', 'Economics'],
    'Accounting': ['English', 'Mathematics', 'Economics', 'Commerce'],
    'Computer Science': ['English', 'Mathematics', 'Physics', 'Chemistry']
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Target className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exam Prep Navigator</h2>
          <p className="text-gray-600">Master your terminal examinations</p>
        </div>
      </div>

      {/* Available Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {availableExams.map(exam => {
          const mockData = mockExamData[exam.id as keyof typeof mockExamData];
          return (
            <div
              key={exam.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedExam === exam.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedExam(exam.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-900">{exam.name}</h3>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-3">{exam.fullName}</p>
              <p className="text-xs text-gray-500 mb-3">Conducted by: {exam.conductedBy}</p>
              
              {mockData && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress:</span>
                    <span className="font-medium">{mockData.completed}/{mockData.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(mockData.completed / mockData.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Score:</span>
                    <span className="font-medium text-green-600">
                      {exam.id === 'jamb' ? `${mockData.averageScore}/400` : `${mockData.averageScore}%`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exam Details */}
      {selectedExam && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {availableExams.find(e => e.id === selectedExam)?.fullName}
            </h3>
            <div className="flex space-x-2">
              {['practice', 'pastQuestions', 'validator'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab === 'practice' ? 'Mock Exams' : 
                   tab === 'pastQuestions' ? 'Past Questions' : 
                   'Subject Validator'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'practice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Available Mock Exams</h4>
                <div className="space-y-3">
                  {[2024, 2023, 2022].map(year => (
                    <div key={year} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium">{selectedExam?.toUpperCase()} {year} Mock</p>
                        <p className="text-sm text-gray-600">Full simulation • 3 hours</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Practice</h4>
                <div className="space-y-3">
                  {availableExams.find(e => e.id === selectedExam)?.subjects.slice(0, 4).map(subject => (
                    <div key={subject} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium">{subject}</p>
                        <p className="text-sm text-gray-600">20 questions • 30 minutes</p>
                      </div>
                      <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                        Practice
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pastQuestions' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[2023, 2022, 2021, 2020, 2019, 2018].map(year => (
                <div key={year} className="p-4 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{year}</h4>
                    <BookOpen className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Complete question paper with solutions
                  </p>
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'validator' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Subject Combination Validator</h4>
                <p className="text-gray-600 mb-4">
                  Check if your subject combination meets university course requirements
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Popular Course Combinations</h5>
                  <div className="space-y-3">
                    {Object.entries(subjectCombinations).map(([course, subjects]) => (
                      <div key={course} className="p-3 bg-white rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-medium">{course}</h6>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {subjects.map(subject => (
                            <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-3">Your Current Subjects</h5>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-sm text-gray-600">Select your subjects to validate</span>
                    </div>
                    <div className="space-y-2">
                      {['English', 'Mathematics', 'Physics', 'Chemistry'].map(subject => (
                        <label key={subject} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{subject}</span>
                        </label>
                      ))}
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      Validate Combination
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamPrepNavigator;