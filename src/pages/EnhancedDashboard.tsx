import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, MessageSquare, BookOpen, Target, Settings, Bell, User, Send, Paperclip, Star, Heart, Sparkles, Smile } from 'lucide-react';
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
      content: 'Hey there, superstar! 🌟 I\'m Mwalimu AI, your super friendly learning buddy! Upload your homework and let\'s have some fun learning together! What subject are we exploring today? 📚✨',
      timestamp: new Date(),
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentAssignment, setCurrentAssignment] = useState<any>(null);

  const tabs = [
    { key: 'chat', label: 'Chat with Mwalimu', icon: MessageSquare, emoji: '💬' },
    { key: 'progress', label: 'My Progress', icon: Target, emoji: '📈' },
    { key: 'resources', label: 'Fun Resources', icon: BookOpen, emoji: '🎮' },
  ];

  const handleAssignmentSubmit = async (data: any) => {
    setIsAnalyzing(true);
    setCurrentAssignment(data);
    
    try {
      // Add user message about uploading assignment
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `Hi Mwalimu! I've uploaded my ${data.assignmentType} assignment: "${data.title}" for ${data.subject} (${data.gradeLevel}) 📝`,
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
        content: `Awesome! 🎉 I've got your ${data.subject} assignment "${data.title}" right here! This looks like a great ${data.gradeLevel} project! 

I'm so excited to help you with this! 🤗 Here's what we can do together:

🎯 **Let's explore your assignment step by step!**
• I can help you understand what the assignment is asking for
• We can brainstorm ideas together 
• I'll guide you through organizing your thoughts
• We can make sure your work shows off your amazing skills!

What would you like to start with? You can ask me:
1. "What does this assignment want me to do?" 🤔
2. "Can you help me get started?" 🚀
3. "How can I make this really good?" ⭐
4. "I'm stuck on this part..." 🤝

Don't worry - we'll figure this out together! I'm here to help you succeed! 💪✨`,
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
      `That's such a great question! 🤔 Let me help you think through this step by step. ${assignment ? `For your ${assignment.subject} assignment` : 'In your learning journey'}, the most important thing is understanding the "why" behind everything. What do you think is the main idea here? 🎯`,
      
      `I love how you're thinking about this! 🌟 You're asking exactly the right questions! Let's explore this together - what do you already know about this topic? This will help me understand how to guide you best! 🗺️`,
      
      `Excellent thinking! 💡 You know what's really cool? This connects to so many things in real life! Can you think of a time when you might use this knowledge outside of school? That's what makes learning so exciting! 🌍`,
      
      `You're doing amazing! 🎉 Here's a fun way to think about it: What clues or evidence can you find that support your thinking? It's like being a detective! 🔍 Let's solve this mystery together!`,
      
      `Great question, my friend! 🤗 Learning is all about the journey, not just the destination. What part of this feels tricky to you? Let's break it down into smaller, easier pieces! We've got this! 💪✨`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mwalimu AI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your Fun Learning Friend! 🌟</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
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
          className="mb-8 text-center"
        >
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Your Learning Adventure!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Upload your homework and let's have some fun learning together! 🚀✨
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{tab.emoji}</span>
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
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Mwalimu AI</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <p className="text-sm text-blue-100">Online • Ready to Help! 🤗</p>
                        </div>
                      </div>
                      <div className="ml-auto flex space-x-1">
                        <Star className="h-4 w-4 text-yellow-300" />
                        <Heart className="h-4 w-4 text-pink-300" />
                        <Sparkles className="h-4 w-4 text-purple-300" />
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          {message.type === 'ai' && (
                            <div className="flex items-center space-x-2 mb-2">
                              <Smile className="h-4 w-4 text-blue-500" />
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Mwalimu AI</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          <p className="text-xs mt-2 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isAnalyzing && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Mwalimu is thinking... 🤔</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="px-6 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask me anything about your homework! 😊"
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isAnalyzing}
                        className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
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
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center">
                <div className="text-6xl mb-6">🎮</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fun Learning Resources</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Exciting games, videos, and activities are coming soon to make learning even more fun! 🌟
                </p>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Math Games</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-4 rounded-xl text-center">
                    <div className="text-2xl mb-2">📚</div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Story Time</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-xl text-center">
                    <div className="text-2xl mb-2">🔬</div>
                    <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Science Fun</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;