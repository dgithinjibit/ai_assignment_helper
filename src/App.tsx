import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Landing from './pages/Landing';
import EnhancedDashboard from './pages/EnhancedDashboard';
import AssignmentForm from './pages/AssignmentForm';
import AssignmentUpload from './pages/AssignmentUpload';
import AssignmentAnalysis from './pages/AssignmentAnalysis';
import LoadingSpinner from './components/ui/LoadingSpinner';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<EnhancedDashboard />} />
            <Route path="/assignment/new" element={<AssignmentForm />} />
            <Route path="/assignment/upload" element={<AssignmentUpload />} />
            <Route path="/assignment/analysis/:id" element={<AssignmentAnalysis />} />
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