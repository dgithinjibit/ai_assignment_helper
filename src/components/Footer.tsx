import React from 'react';
import { Brain, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Assignment Helper</h3>
                <p className="text-sm text-gray-400">Intelligent Academic Assistance</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students worldwide with AI-powered tools to excel in their academic journey and achieve their educational goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Assignments</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Research Tools</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Templates</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Services</h4>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Essay Writing</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Research Assistance</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Citation Help</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Plagiarism Check</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Proofreading</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">support@aiassignmenthelper.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">123 Education Ave, Learning City</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h5 className="font-semibold">Stay Updated</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 AI Assignment Helper. All rights reserved.
            </p>
            <nav className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;