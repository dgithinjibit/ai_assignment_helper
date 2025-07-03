import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { connectMetaMask, getMetaMaskAccount } from '../lib/metamask';
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
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        loading: false,
      }));

      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({
          ...prev,
          user: session?.user ?? null,
          loading: false,
          error: null,
        }));

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setState(prev => ({ ...prev, profile: null }));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setState(prev => ({ ...prev, profile }));
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signInWithGoogle = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast.error('Failed to sign in with Google');
      throw error;
    }
  };

  const signInWithMetaMask = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Connect to MetaMask
      const account = await connectMetaMask();
      
      if (!account) {
        throw new Error('No MetaMask account found');
      }

      // Create a message to sign
      const message = `Sign in to AI Assignment Helper\nWallet: ${account}\nTimestamp: ${Date.now()}`;
      
      // Request signature from MetaMask
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account],
      });

      // Sign in with Supabase using the wallet address as identifier
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${account.toLowerCase()}@metamask.local`,
        password: signature,
      });

      if (error && error.message.includes('Invalid login credentials')) {
        // If user doesn't exist, create account
        const { error: signUpError } = await supabase.auth.signUp({
          email: `${account.toLowerCase()}@metamask.local`,
          password: signature,
          options: {
            data: {
              wallet_address: account,
              auth_method: 'metamask',
              full_name: `MetaMask User ${account.slice(0, 6)}...${account.slice(-4)}`,
            },
          },
        });

        if (signUpError) throw signUpError;
        
        toast.success('MetaMask account created successfully!');
      } else if (error) {
        throw error;
      } else {
        toast.success('Signed in with MetaMask!');
      }

    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast.error(error.message || 'Failed to sign in with MetaMask');
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Welcome back!');
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast.error('Failed to sign in');
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            auth_method: 'email',
          },
        },
      });

      if (error) throw error;
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast.error('Failed to create account');
      throw error;
    }
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success('Signed out successfully');
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    if (!state.user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: state.user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      await fetchProfile(state.user.id);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  return {
    ...state,
    signInWithGoogle,
    signInWithMetaMask,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateProfile,
  };
}