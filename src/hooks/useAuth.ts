import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface AuthState {
  user: User | null;
  profile: any | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: false,
    error: null,
  });

  // Mock user for demo purposes
  useEffect(() => {
    setState({
      user: {
        id: 'demo-user',
        email: 'demo@mwalimu.ai',
        created_at: new Date().toISOString(),
      } as User,
      profile: {
        id: 'demo-user',
        full_name: 'Demo Student',
        grade_level: 'Grade 6',
        credits: 10,
        plan: 'free'
      },
      loading: false,
      error: null,
    });
  }, []);

  const signOut = async () => {
    toast.success('Demo mode - no actual sign out needed');
  };

  const updateProfile = async (updates: any) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates }
    }));
    toast.success('Profile updated successfully');
  };

  return {
    ...state,
    signOut,
    updateProfile,
  };
}