import React, { useState } from 'react';
import { Compass, Search, MapPin, Award, ExternalLink, GraduationCap, Users, TrendingUp } from 'lucide-react';
import { NIGERIAN_STATES, SAMPLE_UNIVERSITIES, SAMPLE_SCHOLARSHIPS } from '../../lib/nigerian-curriculum';

interface CareerCompassProps {
  userLevel: 'sss';
  userGrade: string;
}

const CareerCompass: React.FC<CareerCompassProps> = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'universities' | 'scholarships' | 'career-paths'>('courses');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const popularCourses = [
    { 
      name: 'Medicine & Surgery', 
      demand: 'Very High', 
      avgSalary: '₦500,000 - ₦2,000,000+', 
      duration: '6 years',
      jambSubjects: ['English', 'Biology', 'Chemistry', 'Physics'],
      cutoff: '350+',
      description: 'Train to become a medical doctor and save lives'
    },
    { 
      name: 'Computer Science', 
      demand: 'Very High', 
      avgSalary: '₦300,000 - ₦1,500,000+', 
      duration: '4 years',
      jambSubjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
      cutoff: '250+',
      description: 'Build software, websites, and digital solutions'
    },
    { 
      name: 'Electrical Engineering', 
      demand: 'High', 
      avgSalary: '₦250,000 - ₦800,000+', 
      duration: '5 years',
      jambSubjects: ['English', 'Mathematics', 'Physics', 'Chemistry'],
      cutoff: '280+',
      description: 'Design electrical systems and renewable energy solutions'
    },
    { 
      name: 'Law', 
      demand: 'High', 
      avgSalary: '₦200,000 - ₦1,000,000+', 
      duration: '5 years',
      jambSubjects: ['English', 'Literature', 'Government', 'Economics'],
      cutoff: '300+',
      description: 'Advocate for justice and legal representation'
    },
    { 
      name: 'Accounting', 
      demand: 'High', 
      avgSalary: '₦180,000 - ₦600,000+', 
      duration: '4 years',
      jambSubjects: ['English', 'Mathematics', 'Economics', 'Commerce'],
      cutoff: '220+',
      description: 'Manage finances and business operations'
    },
    { 
      name: 'Pharmacy', 
      demand: 'High', 
      avgSalary: '₦200,000 - ₦500,000+', 
      duration: '5 years',
      jambSubjects: ['English', 'Biology', 'Chemistry', 'Physics'],
      cutoff: '280+',
      description: 'Dispense medications and provide healthcare advice'
    }
  ];

  const careerPaths = [
    {
      category: 'Technology & Innovation',
      careers: [
        { title: 'Software Developer', education: 'Computer Science/Software Engineering', salary: '₦300,000 - ₦1,500,000+', growth: 'Very High' },
        { title: 'Data Scientist', education: 'Statistics/Computer Science/Mathematics', salary: '₦400,000 - ₦1,200,000+', growth: 'Very High' },
        { title: 'Cybersecurity Specialist', education: 'Computer Science/Information Security', salary: '₦350,000 - ₦1,000,000+', growth: 'Very High' }
      ]
    },
    {
      category: 'Healthcare & Medicine',
      careers: [
        { title: 'Medical Doctor', education: 'Medicine & Surgery', salary: '₦500,000 - ₦2,000,000+', growth: 'High' },
        { title: 'Pharmacist', education: 'Pharmacy', salary: '₦200,000 - ₦500,000+', growth: 'High' },
        { title: 'Nurse', education: 'Nursing Science', salary: '₦150,000 - ₦400,000+', growth: 'High' }
      ]
    },
    {
      category: 'Business & Finance',
      careers: [
        { title: 'Investment Banker', education: 'Economics/Finance/Accounting', salary: '₦400,000 - ₦1,500,000+', growth: 'High' },
        { title: 'Management Consultant', education: 'Business Administration/Economics', salary: '₦300,000 - ₦1,000,000+', growth: 'High' },
        { title: 'Entrepreneur', education: 'Any + Business Skills', salary: '₦200,000 - Unlimited', growth: 'Very High' }
      ]
    }
  ];

  const filteredUniversities = SAMPLE_UNIVERSITIES.filter(uni => 
    !selectedState || uni.state === selectedState
  );

  const filteredScholarships = SAMPLE_SCHOLARSHIPS.filter(scholarship =>
    !searchTerm || scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Compass className="h-8 w-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Higher Ed & Career Compass</h2>
          <p className="text-gray-600">Discover your perfect university course and career path in Nigeria 🇳🇬</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'courses', label: 'Popular Courses', icon: GraduationCap },
          { id: 'universities', label: 'Universities', icon: MapPin },
          { id: 'scholarships', label: 'Scholarships', icon: Award },
          { id: 'career-paths', label: 'Career Paths', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses, universities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All States</option>
            {NIGERIAN_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Fields</option>
            <option value="medicine">Medicine & Health</option>
            <option value="engineering">Engineering & Technology</option>
            <option value="sciences">Pure & Applied Sciences</option>
            <option value="arts">Arts & Humanities</option>
            <option value="social">Social Sciences</option>
            <option value="business">Business & Management</option>
          </select>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularCourses.map((course, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.demand === 'Very High' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {course.demand} Demand
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Expected Salary:</span>
                  <span className="font-semibold text-green-600">{course.avgSalary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">JAMB Cut-off:</span>
                  <span className="font-medium text-blue-600">{course.cutoff}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">JAMB Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {course.jambSubjects.map(subject => (
                    <span key={subject} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  View Universities
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Requirements
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'universities' && (
        <div className="space-y-6">
          {filteredUniversities.map((uni, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{uni.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{uni.state} State</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{uni.type}</span>
                    <span className="text-gray-500">Est. {uni.established}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Top University
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Available Courses:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {uni.courses.map(course => (
                    <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{course.name}</h5>
                        <span className="text-sm text-blue-600 font-medium">{course.cutoffMark}+</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{course.faculty}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{course.duration}</span>
                        <span>{course.jambSubjects.length} subjects</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  View All Courses
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Admission Requirements
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1">
                  <ExternalLink className="h-4 w-4" />
                  <span>Visit Website</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'scholarships' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScholarships.map((scholarship, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900">{scholarship.name}</h3>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                  scholarship.type === 'international' ? 'bg-green-100 text-green-800' :
                  scholarship.type === 'local' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{scholarship.description}</p>
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-medium">Provider:</span> {scholarship.provider}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Amount:</span>
                  <span className="font-semibold text-green-600">{scholarship.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Deadline:</span>
                  <span className="font-medium text-red-600">{scholarship.deadline}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Eligibility:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scholarship.eligibility.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'career-paths' && (
        <div className="space-y-8">
          {careerPaths.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="h-6 w-6 text-purple-600" />
                <span>{category.category}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.careers.map((career, careerIndex) => (
                  <div key={careerIndex} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{career.title}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Education:</span>
                        <p className="font-medium text-blue-600">{career.education}</p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary Range:</span>
                        <span className="font-medium text-green-600">{career.salary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth:</span>
                        <span className={`font-medium ${
                          career.growth === 'Very High' ? 'text-green-600' : 'text-blue-600'
                        }`}>{career.growth}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Explore Path
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerCompass;