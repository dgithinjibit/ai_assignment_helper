import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import type { Assignment } from '../types';

export function useAssignments(userId?: string) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setAssignments([]);
      setLoading(false);
      return;
    }

    fetchAssignments();
  }, [userId]);

  const fetchAssignments = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data, error } = await db.assignments.getByUserId(userId);
      
      if (error) throw error;
      
      setAssignments(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  const createAssignment = async (assignmentData: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await db.assignments.create(assignmentData);
      
      if (error) throw error;
      
      if (data) {
        setAssignments(prev => [data, ...prev]);
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create assignment');
      throw err;
    }
  };

  const updateAssignment = async (id: string, updates: Partial<Assignment>) => {
    try {
      const { data, error } = await db.assignments.update(id, updates);
      
      if (error) throw error;
      
      if (data) {
        setAssignments(prev => 
          prev.map(assignment => 
            assignment.id === id ? data : assignment
          )
        );
      }
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update assignment');
      throw err;
    }
  };

  const deleteAssignment = async (id: string) => {
    try {
      const { error } = await db.assignments.delete(id);
      
      if (error) throw error;
      
      setAssignments(prev => prev.filter(assignment => assignment.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete assignment');
      throw err;
    }
  };

  return {
    assignments,
    loading,
    error,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    refetch: fetchAssignments,
  };
}