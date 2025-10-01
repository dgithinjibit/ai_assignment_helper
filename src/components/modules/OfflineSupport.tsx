import React, { useState } from 'react';
import { Download, Wifi, WifiOff, HardDrive, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface OfflineSupportProps {
  userLevel: string;
  userGrade: string;
}

const OfflineSupport: React.FC<OfflineSupportProps> = ({ userLevel, userGrade }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);

  const offlineContent = [
    {
      id: 'math-basics',
      title: 'Mathematics Fundamentals',
      type: 'video',
      size: 45,
      downloaded: true,
      subject: 'Mathematics',
      grade: userGrade
    },
    {
      id: 'english-grammar',
      title: 'English Grammar Essentials',
      type: 'document',
      size: 12,
      downloaded: false,
      subject: 'English',
      grade: userGrade
    },
    {
      id: 'science-experiments',
      title: 'Basic Science Experiments',
      type: 'video',
      size: 78,
      downloaded: false,
      subject: 'Basic Science',
      grade: userGrade
    },
    {
      id: 'jamb-practice',
      title: 'JAMB Practice Questions',
      type: 'quiz',
      size: 8,
      downloaded: true,
      subject: 'General',
      grade: 'SSS3'
    }
  ];

  const handleDownload = (contentId: string) => {
    setDownloadQueue([...downloadQueue, contentId]);
    // Simulate download process
    setTimeout(() => {
      setDownloadQueue(downloadQueue.filter(id => id !== contentId));
    }, 3000);
  };

  const getTotalSize = () => {
    return offlineContent.reduce((total, content) => total + content.size, 0);
  };

  const getDownloadedSize = () => {
    return offlineContent
      .filter(content => content.downloaded)
      .reduce((total, content) => total + content.size, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <HardDrive className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Offline Learning</h2>
            <p className="text-gray-600">Download content for offline study</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <div className="flex items-center space-x-2 text-green-600">
              <Wifi className="h-5 w-5" />
              <span className="text-sm font-medium">Online</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-red-600">
              <WifiOff className="h-5 w-5" />
              <span className="text-sm font-medium">Offline</span>
            </div>
          )}
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <HardDrive className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Storage Used</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{getDownloadedSize()} MB</p>
          <p className="text-sm text-blue-700">of {getTotalSize()} MB available</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Downloaded</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {offlineContent.filter(c => c.downloaded).length}
          </p>
          <p className="text-sm text-green-700">content items</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">In Queue</h3>
          </div>
          <p className="text-2xl font-bold text-orange-600">{downloadQueue.length}</p>
          <p className="text-sm text-orange-700">downloading</p>
        </div>
      </div>

      {/* Low Bandwidth Mode */}
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-2 mb-2">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <h3 className="font-semibold text-yellow-800">Low Bandwidth Mode</h3>
        </div>
        <p className="text-sm text-yellow-700 mb-3">
          Optimized for slow internet connections. Reduces data usage by 70%.
        </p>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm text-yellow-800">Enable low bandwidth mode</span>
        </label>
      </div>

      {/* Available Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Available for Download</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {offlineContent.map(content => (
            <div key={content.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    content.type === 'video' ? 'bg-red-100 text-red-600' :
                    content.type === 'document' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {content.type === 'video' ? '🎥' : 
                     content.type === 'document' ? '📄' : '❓'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{content.title}</h4>
                    <p className="text-sm text-gray-600">
                      {content.subject} • {content.grade} • {content.size} MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {content.downloaded ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Downloaded</span>
                    </div>
                  ) : downloadQueue.includes(content.id) ? (
                    <div className="flex items-center space-x-2 text-orange-600">
                      <Clock className="h-5 w-5 animate-spin" />
                      <span className="text-sm font-medium">Downloading...</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload(content.id)}
                      disabled={!isOnline}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isOnline
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Download className="h-4 w-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  )}
                </div>
              </div>
              
              {content.downloaded && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Available offline • Last updated: 2 days ago
                  </p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                    Open offline content
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Offline Study Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Offline Study Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Download content when you have good internet connection</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Use low bandwidth mode to save data on slow connections</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Downloaded quizzes work completely offline with instant feedback</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Progress syncs automatically when you reconnect to internet</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OfflineSupport;