export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  user_id: string;
  title: string;
  description: string;
  subject: string;
  assignment_type: 'essay' | 'research' | 'presentation' | 'report' | 'other';
  status: 'draft' | 'in_progress' | 'completed' | 'submitted';
  due_date?: string;
  content?: string;
  ai_suggestions?: string[];
  created_at: string;
  updated_at: string;
}

export interface AIResponse {
  content: string;
  suggestions: string[];
  confidence: number;
  tokens_used: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  subject: string;
  assignment_type: Assignment['assignment_type'];
  due_date?: string;
  content?: string;
}