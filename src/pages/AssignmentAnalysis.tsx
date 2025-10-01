import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Download, Share2, RefreshCw } from 'lucide-react';
import CompetencyRadar from '../components/analysis/CompetencyRadar';
import SocraticQuestions from '../components/analysis/SocraticQuestions';
import FeedbackSections from '../components/analysis/FeedbackSections';
import LearningPath from '../components/analysis/LearningPath';
import type { AIResult } from '../types';

const AssignmentAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  useEffect(() => {
    const mockAnalysis: AIResult = {
      id: '1',
      assignment_id: id || '1',
      workflow_type: 'essay_analysis',
      ai_response: {
        competency_analysis: {
          subject: 'English',
          grade_level: 'Grade 8',
          competencies: [
            {
              name: 'Writing Structure',
              description: 'Organization and flow of ideas',
              level: 'proficient',
              evidence: ['Clear introduction and conclusion', 'Logical paragraph structure'],
              suggestions: ['Add transition sentences between paragraphs'],
              weight: 0.25
            },
            {
              name: 'Language Use',
              description: 'Grammar, vocabulary, and style',
              level: 'developing',
              evidence: ['Good vocabulary range', 'Some grammatical errors'],
              suggestions: ['Review subject-verb agreement', 'Expand academic vocabulary'],
              weight: 0.25
            },
            {
              name: 'Critical Thinking',
              description: 'Analysis and evaluation of ideas',
              level: 'proficient',
              evidence: ['Strong arguments presented', 'Evidence-based reasoning'],
              suggestions: ['Consider counterarguments', 'Deepen analysis'],
              weight: 0.3
            },
            {
              name: 'Research Skills',
              description: 'Use of sources and citations',
              level: 'developing',
              evidence: ['Multiple sources used', 'Basic citation format'],
              suggestions: ['Improve source evaluation', 'Learn proper citation style'],
              weight: 0.2
            }
          ],
          overall_level: 'proficient',
          strengths: [
            'Strong critical thinking and argument development',
            'Good use of evidence to support points',
            'Clear writing structure with logical flow'
          ],
          areas_for_improvement: [
            'Grammar and language mechanics need attention',
            'Research and citation skills require development',
            'Could benefit from more sophisticated vocabulary'
          ],
          next_steps: [
            'Practice grammar exercises focusing on common errors',
            'Learn proper academic citation formats',
            'Read more academic texts to expand vocabulary'
          ]
        },
        socratic_questions: [
          {
            id: '1',
            question: 'What is the main argument you are trying to make in this essay?',
            purpose: 'Help clarify the central thesis and focus',
            category: 'clarification',
            difficulty: 'easy',
            follow_up_hints: [
              'Look at your introduction and conclusion',
              'What point are you trying to convince the reader of?',
              'Can you state your argument in one clear sentence?'
            ]
          },
          {
            id: '2',
            question: 'What assumptions are you making about your topic?',
            purpose: 'Encourage examination of underlying beliefs',
            category: 'assumptions',
            difficulty: 'medium',
            follow_up_hints: [
              'What do you take for granted about this topic?',
              'Are there different ways to view this issue?',
              'What background knowledge are you assuming your reader has?'
            ]
          },
          {
            id: '3',
            question: 'How strong is the evidence you have provided?',
            purpose: 'Evaluate the quality and relevance of supporting evidence',
            category: 'evidence',
            difficulty: 'medium',
            follow_up_hints: [
              'Are your sources credible and recent?',
              'Do you have enough evidence to support each point?',
              'Is there contradictory evidence you should address?'
            ]
          }
        ],
        feedback_sections: [
          {
            title: 'Structure & Organization',
            category: 'structure',
            score: 78,
            feedback: 'Your essay demonstrates good organizational skills with a clear introduction, body paragraphs, and conclusion. The logical flow of ideas helps readers follow your argument effectively.',
            specific_examples: [
              'Strong opening paragraph that introduces the topic clearly',
              'Each body paragraph focuses on a single main idea',
              'Conclusion effectively summarizes key points'
            ],
            improvement_suggestions: [
              'Add transition sentences between paragraphs to improve flow',
              'Consider using topic sentences that clearly state the main idea',
              'Strengthen the connection between your introduction and conclusion'
            ],
            resources: [
              {
                title: 'Essay Structure Guide',
                type: 'article',
                description: 'Comprehensive guide to organizing academic essays',
                difficulty: 'beginner',
                url: 'https://example.com/essay-structure'
              }
            ]
          },
          {
            title: 'Content & Ideas',
            category: 'content',
            score: 82,
            feedback: 'You present thoughtful ideas and demonstrate good understanding of the topic. Your arguments are generally well-developed and supported with relevant examples.',
            specific_examples: [
              'Insightful analysis of the main themes',
              'Good use of specific examples to support points',
              'Demonstrates understanding of complex concepts'
            ],
            improvement_suggestions: [
              'Develop some ideas more thoroughly with additional detail',
              'Consider exploring counterarguments to strengthen your position',
              'Add more depth to your analysis in certain sections'
            ],
            resources: [
              {
                title: 'Critical Thinking Strategies',
                type: 'video',
                description: 'Learn techniques for deeper analysis and evaluation',
                difficulty: 'intermediate'
              }
            ]
          }
        ],
        learning_path: [
          {
            id: '1',
            title: 'Grammar Fundamentals Review',
            description: 'Review basic grammar rules and common errors',
            type: 'concept',
            difficulty: 2,
            estimated_time: 45,
            prerequisites: [],
            resources: [
              {
                title: 'Grammar Basics',
                type: 'exercise',
                description: 'Interactive grammar exercises',
                difficulty: 'beginner'
              }
            ],
            completed: false
          },
          {
            id: '2',
            title: 'Academic Vocabulary Building',
            description: 'Expand your academic vocabulary for better expression',
            type: 'skill',
            difficulty: 3,
            estimated_time: 60,
            prerequisites: ['Grammar Fundamentals Review'],
            resources: [
              {
                title: 'Academic Word List',
                type: 'article',
                description: 'Essential academic vocabulary for students',
                difficulty: 'intermediate'
              }
            ],
            completed: false
          }
        ],
        quality_score: 0.8
      },
      processing_time: 45,
      tokens_used: 2500,
      cost_estimate: 0.05,
      quality_score: 0.8,
      created_at: new Date().toISOString()
    };

    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1000);
  }, [id]);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: Brain },
    { key: 'questions', label: 'Socratic Questions', icon: Brain },
    { key: 'feedback', label: 'Detailed Feedback', icon: Brain },
    { key: 'path', label: 'Learning Path', icon: Brain },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your assignment...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Analysis not found</p>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Assignment Analysis</h1>
                <p className="text-xs text-gray-500">CBC Curriculum - Kenya</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <RefreshCw className="h-4 w-4" />
                <span>Re-analyze</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <CompetencyRadar analysis={analysis.ai_response.competency_analysis} />
          )}
          
          {activeTab === 'questions' && (
            <SocraticQuestions questions={analysis.ai_response.socratic_questions} />
          )}
          
          {activeTab === 'feedback' && (
            <FeedbackSections sections={analysis.ai_response.feedback_sections} />
          )}
          
          {activeTab === 'path' && (
            <LearningPath 
              items={analysis.ai_response.learning_path}
              onItemComplete={(itemId) => {
                console.log('Completing item:', itemId);
                // Handle item completion
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AssignmentAnalysis;