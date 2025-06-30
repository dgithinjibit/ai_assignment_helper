import React from 'react';
import { 
  Brain, 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  Users, 
  BookOpen, 
  Lightbulb,
  Target,
  Zap,
  Shield,
  Award
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Writing Assistant",
      description: "Get intelligent suggestions for improving your writing style, grammar, and structure with advanced AI analysis.",
      color: "blue"
    },
    {
      icon: Search,
      title: "Smart Research Tools",
      description: "Find credible sources instantly and get help organizing your research with our intelligent citation assistant.",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Assignment Templates",
      description: "Access professionally designed templates for essays, reports, presentations, and more academic formats.",
      color: "green"
    },
    {
      icon: CheckCircle,
      title: "Plagiarism Detection",
      description: "Ensure your work is original with our advanced plagiarism detection and proper citation guidance.",
      color: "orange"
    }
  ];

  const additionalFeatures = [
    { icon: Clock, title: "24/7 Availability", description: "Get help whenever you need it" },
    { icon: Users, title: "Collaborative Tools", description: "Work together on group projects" },
    { icon: BookOpen, title: "Subject Expertise", description: "Specialized help for all subjects" },
    { icon: Lightbulb, title: "Creative Solutions", description: "Innovative approaches to problems" },
    { icon: Target, title: "Goal Tracking", description: "Monitor your academic progress" },
    { icon: Zap, title: "Instant Feedback", description: "Get immediate suggestions" },
    { icon: Shield, title: "Privacy Protected", description: "Your work stays confidential" },
    { icon: Award, title: "Quality Assured", description: "Professional-grade assistance" }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      green: "bg-green-100 text-green-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Academic Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools is designed to help you excel in every aspect of your academic journey.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${getColorClasses(feature.color)}`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h3>
            <p className="text-lg text-gray-600">
              Comprehensive tools and features designed for modern students
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index}
                className="text-center group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">10,000+</div>
            <div className="text-gray-600">Students Helped</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-600">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-600">24/7</div>
            <div className="text-gray-600">Availability</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-orange-600">50+</div>
            <div className="text-gray-600">Subjects Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;