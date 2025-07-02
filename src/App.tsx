import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AssignmentForm from './pages/AssignmentForm';
import AssignmentUpload from './pages/AssignmentUpload';
import AssignmentAnalysis from './pages/AssignmentAnalysis';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assignment/new" element={<AssignmentForm />} />
          <Route path="/assignment/upload" element={<AssignmentUpload />} />
          <Route path="/assignment/analysis/:id" element={<AssignmentAnalysis />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;