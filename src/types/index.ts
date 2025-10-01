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

export interface AIResult {
  id: string;
  assignment_id: string;
  workflow_type: string;
  ai_response: {
    competency_analysis: CompetencyAnalysis;
    socratic_questions: SocraticQuestion[];
    feedback_sections: FeedbackSection[];
    learning_path: LearningPathItem[];
    quality_score: number;
  };
  processing_time: number;
  tokens_used: number;
  cost_estimate: number;
  quality_score: number;
  created_at: string;
}

export interface CompetencyAnalysis {
  subject: string;
  grade_level: string;
  competencies: CompetencyAssessment[];
  overall_level: 'novice' | 'developing' | 'proficient' | 'advanced';
  strengths: string[];
  areas_for_improvement: string[];
  next_steps: string[];
}

export interface CompetencyAssessment {
  name: string;
  description: string;
  level: 'novice' | 'developing' | 'proficient' | 'advanced';
  evidence: string[];
  suggestions: string[];
  weight: number;
}

export interface SocraticQuestion {
  id: string;
  question: string;
  purpose: string;
  category: 'clarification' | 'assumptions' | 'evidence' | 'perspective' | 'implications' | 'meta';
  difficulty: 'easy' | 'medium' | 'hard';
  follow_up_hints: string[];
}

export interface FeedbackSection {
  title: string;
  category: 'structure' | 'content' | 'language' | 'critical_thinking' | 'creativity';
  score: number;
  feedback: string;
  specific_examples: string[];
  improvement_suggestions: string[];
  resources: Resource[];
}

export interface LearningPathItem {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'skill' | 'practice' | 'assessment';
  difficulty: number;
  estimated_time: number;
  prerequisites: string[];
  resources: Resource[];
  completed: boolean;
}

export interface Resource {
  title: string;
  type: 'article' | 'video' | 'exercise' | 'book' | 'website';
  url?: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

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

export interface KICDStandard {
  subject: string;
  grade_level: string;
  core_competencies: string[];
  values: string[];
  pertinent_issues: string[];
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
  grade_level?: string;
  learning_objectives?: string[];
}

export interface AnalysisProgress {
  stage: 'uploading' | 'processing' | 'analyzing' | 'generating' | 'completed';
  progress: number;
  message: string;
}

export interface Theme {
  mode: 'light' | 'dark';
}