import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, BookOpen, Users, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface CBCProgressDashboardProps {
  userId: string;
}

const CBCProgressDashboard: React.FC<CBCProgressDashboardProps> = ({ userId }) => {
  // Mock data - in real implementation, fetch from Supabase
  const progressData = [
    { month: 'Jan', communication: 65, critical_thinking: 70, creativity: 60, citizenship: 75 },
    { month: 'Feb', communication: 70, critical_thinking: 75, creativity: 65, citizenship: 78 },
    { month: 'Mar', communication: 75, critical_thinking: 80, creativity: 70, citizenship: 80 },
    { month: 'Apr', communication: 78, critical_thinking: 82, creativity: 75, citizenship: 82 },
    { month: 'May', communication: 82, critical_thinking: 85, creativity: 78, citizenship: 85 },
  ];

  const competencyRadarData = [
    { competency: 'Communication', current: 82, target: 90 },
    { competency: 'Critical Thinking', current: 85, target: 90 },
    { competency: 'Creativity', current: 78, target: 85 },
    { competency: 'Citizenship', current: 85, target: 90 },
    { competency: 'Digital Literacy', current: 75, target: 85 },
    { competency: 'Learning to Learn', current: 80, target: 88 },
    { competency: 'Self-Efficacy', current: 77, target: 85 },
  ];

  const achievements = [
    { title: 'Critical Thinker', description: 'Achieved proficient level in critical thinking', icon: Target, color: 'blue' },
    { title: 'Effective Communicator', description: 'Excellent progress in communication skills', icon: Users, color: 'green' },
    { title: 'Creative Problem Solver', description: 'Demonstrated creativity in assignments', icon: Star, color: 'purple' },
  ];

  const recentAssignments = [
    { subject: 'Mathematics', title: 'Algebra Problem Set', score: 85, competencies: ['Critical Thinking', 'Problem Solving'] },
    { subject: 'English', title: 'Persuasive Essay', score: 78, competencies: ['Communication', 'Critical Thinking'] },
    { subject: 'Science', title: 'Plant Classification', score: 92, competencies: ['Learning to Learn', 'Critical Thinking'] },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
      green: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
      purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">81%</p>
              <p className="text-xs text-green-600 dark:text-green-400">+5% this month</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assignments Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              <p className="text-xs text-green-600 dark:text-green-400">+3 this week</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Competencies Mastered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3/7</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">43% complete</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
              <p className="text-xs text-green-600 dark:text-green-400">+2% improvement</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            CBC Competency Progress Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="communication" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="critical_thinking" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="creativity" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="citizenship" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Competency Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current vs Target Competency Levels
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8 }} />
                <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Radar name="Target" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getColorClass(achievement.color)}`}>
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Assignments</h3>
          <div className="space-y-4">
            {recentAssignments.map((assignment, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.subject}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded">
                    {assignment.score}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {assignment.competencies.map((competency, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                    >
                      {competency}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CBCProgressDashboard;