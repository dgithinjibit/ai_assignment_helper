import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, MessageSquare, BookOpen, Target, Settings, Bell, User, Send, Paperclip } from 'lucide-react';
import AssignmentInput from '../components/ui/AssignmentInput';
import CBCProgressDashboard from '../components/analysis/CBCProgressDashboard';
import ThemeToggle from '../components/ui/ThemeToggle';
import LoadingSpinner from '../components/ui/LoadingSpinner';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  assignmentContext?: {
    title: string;
    subject: string;
    gradeLevel: string;
  };
}

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Habari! I am Mwalimu AI, your personal teacher for the CBC curriculum. Upload your assignment and let\'s start learning together! What subject are you working on today?',
      timestamp: new Date(),
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentAssignment, setCurrentAssignment] = useState<any>(null);

  const tabs = [
    { key: 'chat', label: 'Chat with Mwalimu', icon: MessageSquare },
    { key: 'progress', label: 'CBC Progress', icon: Target },
    { key: 'resources', label: 'Learning Resources', icon: BookOpen },
  ];

  const handleAssignmentSubmit = async (data: any) => {
    setIsAnalyzing(true);
    setCurrentAssignment(data);
    
    try {
      // Add user message about uploading assignment
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `I've uploaded my ${data.assignmentType} assignment: "${data.title}" for ${data.subject} (${data.gradeLevel})`,
        timestamp: new Date(),
        assignmentContext: {
          title: data.title,
          subject: data.subject,
          gradeLevel: data.gradeLevel
        }
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      
      // Simulate AI analysis and response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Excellent! I've received your ${data.subject} assignment "${data.title}". I can see this is for ${data.gradeLevel}. Let me analyze your work according to CBC standards.

Based on what you've submitted, I can help you with:
• Understanding the assignment requirements
• Developing your ideas step by step
• Connecting your work to CBC competencies
• Improving your approach through guided questions

What specific aspect would you like to discuss first? Are you looking for help with:
1. Understanding what the assignment is asking for
2. Organizing your thoughts and ideas
3. Improving your writing or problem-solving approach
4. Connecting your work to CBC learning outcomes

Feel free to ask me any questions about your assignment!`,
        timestamp: new Date(),
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setActiveTab('chat');
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Simulate AI thinking
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate contextual AI response
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: generateAIResponse(currentMessage, currentAssignment),
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, aiResponse]);
    setIsAnalyzing(false);
  };

  const generateAIResponse = (userMessage: string, assignment: any) => {
    const responses = [
      `That's a great question! Let me guide you through this step by step. ${assignment ? `For your ${assignment.subject} assignment` : 'In CBC learning'}, we focus on understanding rather than just getting answers. What do you think is the main concept being tested here?`,
      
      `I can see you're thinking critically about this! That's exactly what CBC encourages. Let's explore this further - can you tell me what you already know about this topic? This will help me understand how to best guide you.`,
      
      `Excellent observation! In the CBC curriculum, we emphasize connecting learning to real life. How do you think this concept applies to situations you might encounter outside of school?`,
      
      `You're on the right track! Let me ask you a guiding question: What evidence or examples can you think of that support your thinking? This will help strengthen your understanding.`,
      
      `That's a thoughtful approach! In CBC, we value the learning process as much as the outcome. What challenges are you facing with this particular aspect? Let's work through them together.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mwalimu AI</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">CBC Curriculum - Kenya</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Mwalimu AI!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your personal AI teacher for CBC learning. Upload an assignment to start our conversation.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
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
          {activeTab === 'chat' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Mwalimu AI</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">Online • CBC Teacher</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isAnalyzing && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Mwalimu is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask Mwalimu about your assignment..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isAnalyzing}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assignment Upload */}
              <div className="lg:col-span-1">
                <AssignmentInput onSubmit={handleAssignmentSubmit} loading={isAnalyzing} />
              </div>
            </div>
          )}
          
          {activeTab === 'progress' && (
            <CBCProgressDashboard userId="demo-user" />
          )}
          
          {activeTab === 'resources' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CBC Learning Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Curated resources aligned with Kenya's Competency-Based Curriculum coming soon...
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;