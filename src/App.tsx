import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import EnhancedDashboard from './pages/EnhancedDashboard';
import AssignmentForm from './pages/AssignmentForm';
import AssignmentUpload from './pages/AssignmentUpload';
import AssignmentAnalysis from './pages/AssignmentAnalysis';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { user, loading } = useAuth();

  // Handle OAuth redirect
  useEffect(() => {
    const handleAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('code')) {
        // OAuth callback - let Supabase handle it
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    handleAuthRedirect();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Initializing..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <EnhancedDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/assignment/new" 
              element={
                <ProtectedRoute>
                  <AssignmentForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/assignment/upload" 
              element={
                <ProtectedRoute>
                  <AssignmentUpload />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/assignment/analysis/:id" 
              element={
                <ProtectedRoute>
                  <AssignmentAnalysis />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              duration: 4000,
            }}
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;