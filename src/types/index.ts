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
  content: string;
  type: 'essay' | 'math' | 'code' | 'research' | 'general';
  status: 'uploaded' | 'processing' | 'completed' | 'error';
  difficulty_level?: number;
  subject?: string;
  original_filename?: string;
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
  assignment_type: Assignment['type'];
  due_date?: string;
  content?: string;
}

// CBC-specific types for Kenya's Competency-Based Curriculum
export interface CBCCompetency {
  id: string;
  subject: string;
  grade_level: string;
  competency_area: string;
  learning_outcome: string;
  assessment_criteria: string[];
}

export interface CBCSubject {
  name: string;
  code: string;
  category: 'core' | 'optional' | 'co-curricular';
  grade_levels: string[];
  competency_areas: string[];
}

export interface LearningOutcome {
  id: string;
  subject: string;
  grade_level: string;
  strand: string;
  sub_strand: string;
  specific_outcome: string;
  suggested_activities: string[];
  assessment_methods: string[];
}

// Kenya-specific educational standards
export interface KICDStandard {
  subject: string;
  grade_level: string;
  core_competencies: string[];
  values: string[];
  pertinent_issues: string[];
}