import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Edit3, Save, X, Wallet, Mail, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getMetaMaskAccount, getWalletBalance } from '../../lib/metamask';
import toast from 'react-hot-toast';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || '',
    grade_level: profile?.grade_level || '',
    preferred_subjects: profile?.preferred_subjects || [],
    learning_style: profile?.learning_style || '',
  });
  const [walletInfo, setWalletInfo] = useState<{ address?: string; balance?: string }>({});

  React.useEffect(() => {
    if (isOpen && user?.user_metadata?.wallet_address) {
      loadWalletInfo();
    }
  }, [isOpen, user]);

  const loadWalletInfo = async () => {
    try {
      const address = await getMetaMaskAccount();
      if (address) {
        const balance = await getWalletBalance(address);
        setWalletInfo({ address, balance });
      }
    } catch (error) {
      console.error('Error loading wallet info:', error);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const cbcSubjects = [
    'Mathematics', 'English', 'Kiswahili', 'Science and Technology',
    'Social Studies', 'Christian Religious Education', 'Islamic Religious Education',
    'Home Science', 'Art and Craft', 'Music', 'Physical Education',
    'French', 'German', 'Computer Studies', 'Agriculture'
  ];

  const gradeLevels = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Form 1', 'Form 2', 'Form 3', 'Form 4'
  ];

  const learningStyles = [
    'Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing', 'Mixed'
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  User Profile
                </h3>
                <div className="flex items-center space-x-2">
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="space-y-6">
                {/* Avatar and Basic Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.full_name}
                        onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Full Name"
                      />
                    ) : (
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {profile?.full_name || user?.user_metadata?.full_name || 'User'}
                      </h4>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Authentication Method */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Authentication Method
                  </h5>
                  <div className="flex items-center space-x-2">
                    {user?.user_metadata?.auth_method === 'metamask' ? (
                      <>
                        <Wallet className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">MetaMask</span>
                      </>
                    ) : user?.app_metadata?.provider === 'google' ? (
                      <>
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Google</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
                      </>
                    )}
                  </div>

                  {/* Wallet Info */}
                  {walletInfo.address && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Wallet: {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
                      </p>
                      {walletInfo.balance && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Balance: {parseFloat(walletInfo.balance).toFixed(4)} ETH
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Educational Info */}
                <div className="space-y-4">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    Educational Information
                  </h5>

                  {/* Grade Level */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Grade Level
                    </label>
                    {isEditing ? (
                      <select
                        value={editData.grade_level}
                        onChange={(e) => setEditData(prev => ({ ...prev, grade_level: e.target.value }))}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select grade level</option>
                        {gradeLevels.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile?.grade_level || 'Not specified'}
                      </p>
                    )}
                  </div>

                  {/* Learning Style */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Learning Style
                    </label>
                    {isEditing ? (
                      <select
                        value={editData.learning_style}
                        onChange={(e) => setEditData(prev => ({ ...prev, learning_style: e.target.value }))}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">Select learning style</option>
                        {learningStyles.map(style => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile?.learning_style || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Account Stats */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Account Statistics
                  </h5>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {profile?.credits || 10}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Credits</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {profile?.plan || 'Free'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Plan</p>
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  Member since {new Date(user?.created_at || '').toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfile;