/*
  # Comprehensive AI Assignment Helper Schema

  1. New Tables
    - `profiles` - User profiles with CBC-specific data
    - `assignments` - Assignment submissions and metadata
    - `ai_results` - AI analysis results and feedback
    - `workflow_templates` - CBC-aligned analysis workflows
    - `usage_logs` - API usage tracking
    - `competency_assessments` - CBC competency tracking
    - `learning_paths` - Personalized learning recommendations
    - `socratic_questions` - Generated questions for reflection

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for data access
    - Ensure users can only access their own data

  3. CBC Integration
    - Support for Kenya's Competency-Based Curriculum
    - KICD standards alignment
    - Grade-level specific competencies
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE assignment_type AS ENUM ('essay', 'math', 'code', 'research', 'general');
CREATE TYPE assignment_status AS ENUM ('uploaded', 'processing', 'completed', 'error');
CREATE TYPE competency_level AS ENUM ('novice', 'developing', 'proficient', 'advanced');
CREATE TYPE question_category AS ENUM ('clarification', 'assumptions', 'evidence', 'perspective', 'implications', 'meta');
CREATE TYPE resource_type AS ENUM ('article', 'video', 'exercise', 'book', 'website');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  avatar_url text,
  plan text DEFAULT 'free',
  credits integer DEFAULT 10,
  grade_level text,
  preferred_subjects text[],
  learning_style text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  type assignment_type DEFAULT 'general',
  status assignment_status DEFAULT 'uploaded',
  difficulty_level integer DEFAULT 1,
  subject text,
  grade_level text,
  learning_objectives text[],
  original_filename text,
  file_url text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow templates for different analysis types
CREATE TABLE IF NOT EXISTS workflow_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type assignment_type NOT NULL,
  prompt_template text NOT NULL,
  processing_steps jsonb NOT NULL,
  expected_output_format jsonb NOT NULL,
  cbc_alignment jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- AI analysis results
CREATE TABLE IF NOT EXISTS ai_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  workflow_type text NOT NULL,
  ai_response jsonb NOT NULL,
  competency_analysis jsonb,
  socratic_questions jsonb,
  feedback_sections jsonb,
  learning_path jsonb,
  processing_time integer,
  tokens_used integer,
  cost_estimate numeric(10,4),
  quality_score numeric(3,2),
  created_at timestamptz DEFAULT now()
);

-- Competency assessments
CREATE TABLE IF NOT EXISTS competency_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  competency_name text NOT NULL,
  competency_area text NOT NULL,
  level competency_level NOT NULL,
  evidence text[],
  suggestions text[],
  weight numeric(3,2) DEFAULT 1.0,
  cbc_standard text,
  created_at timestamptz DEFAULT now()
);

-- Learning paths
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  items jsonb NOT NULL,
  progress numeric(3,2) DEFAULT 0.0,
  estimated_completion_time integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Socratic questions
CREATE TABLE IF NOT EXISTS socratic_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  question text NOT NULL,
  purpose text NOT NULL,
  category question_category NOT NULL,
  difficulty difficulty_level DEFAULT 'intermediate',
  follow_up_hints text[],
  cbc_competency text,
  created_at timestamptz DEFAULT now()
);

-- Usage logs for API tracking
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  api_provider text DEFAULT 'groq',
  tokens_used integer,
  cost numeric(10,4),
  processing_time integer,
  created_at timestamptz DEFAULT now()
);

-- Resources table for learning materials
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type resource_type NOT NULL,
  url text,
  difficulty difficulty_level DEFAULT 'intermediate',
  subject text,
  grade_level text,
  cbc_competency text,
  tags text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE socratic_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Assignments policies
CREATE POLICY "Users can view own assignments" ON assignments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assignments" ON assignments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assignments" ON assignments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assignments" ON assignments
  FOR DELETE USING (auth.uid() = user_id);

-- AI results policies
CREATE POLICY "Users can view own ai_results" ON ai_results
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM assignments WHERE assignments.id = ai_results.assignment_id)
  );

-- Competency assessments policies
CREATE POLICY "Users can view own competency_assessments" ON competency_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own competency_assessments" ON competency_assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Learning paths policies
CREATE POLICY "Users can view own learning_paths" ON learning_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own learning_paths" ON learning_paths
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning_paths" ON learning_paths
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Socratic questions policies
CREATE POLICY "Users can view own socratic_questions" ON socratic_questions
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM assignments WHERE assignments.id = socratic_questions.assignment_id)
  );

-- Usage logs policies
CREATE POLICY "Users can view own usage_logs" ON usage_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS assignments_user_id_idx ON assignments(user_id);
CREATE INDEX IF NOT EXISTS assignments_status_idx ON assignments(status);
CREATE INDEX IF NOT EXISTS assignments_created_at_idx ON assignments(created_at DESC);
CREATE INDEX IF NOT EXISTS assignments_subject_idx ON assignments(subject);

CREATE INDEX IF NOT EXISTS ai_results_assignment_id_idx ON ai_results(assignment_id);
CREATE INDEX IF NOT EXISTS ai_results_created_at_idx ON ai_results(created_at DESC);

CREATE INDEX IF NOT EXISTS competency_assessments_user_id_idx ON competency_assessments(user_id);
CREATE INDEX IF NOT EXISTS competency_assessments_competency_name_idx ON competency_assessments(competency_name);

CREATE INDEX IF NOT EXISTS learning_paths_user_id_idx ON learning_paths(user_id);
CREATE INDEX IF NOT EXISTS learning_paths_is_active_idx ON learning_paths(is_active);

CREATE INDEX IF NOT EXISTS usage_logs_user_id_idx ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS usage_logs_created_at_idx ON usage_logs(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample workflow templates
INSERT INTO workflow_templates (name, type, prompt_template, processing_steps, expected_output_format, cbc_alignment) VALUES
(
  'CBC Essay Analysis',
  'essay',
  'Analyze this essay according to Kenya''s Competency-Based Curriculum standards for {grade_level} {subject}. Focus on: 1) Writing competencies 2) Critical thinking 3) Communication skills 4) CBC values integration',
  '["content_extraction", "competency_mapping", "cbc_alignment", "socratic_generation", "feedback_creation", "learning_path_generation"]',
  '{"competency_analysis": {}, "socratic_questions": [], "feedback_sections": [], "learning_path": []}',
  '{"core_competencies": ["communication", "critical_thinking", "creativity"], "values": ["respect", "responsibility", "honesty"], "assessment_methods": ["formative", "authentic"]}'
),
(
  'CBC Math Problem Analysis',
  'math',
  'Evaluate this mathematics work against CBC standards for {grade_level}. Assess: 1) Problem-solving approach 2) Mathematical reasoning 3) Communication of solutions 4) Application of concepts',
  '["problem_identification", "solution_analysis", "reasoning_evaluation", "competency_assessment", "improvement_suggestions"]',
  '{"competency_analysis": {}, "socratic_questions": [], "feedback_sections": [], "learning_path": []}',
  '{"core_competencies": ["critical_thinking", "problem_solving", "communication"], "strands": ["number", "algebra", "geometry", "statistics"], "assessment_focus": ["understanding", "application", "reasoning"]}'
);

-- Insert sample CBC resources
INSERT INTO resources (title, description, type, difficulty, subject, grade_level, cbc_competency, tags) VALUES
(
  'CBC Writing Guidelines',
  'Comprehensive guide to writing skills development in CBC',
  'article',
  'beginner',
  'English',
  'Grade 4-8',
  'Communication and Collaboration',
  ARRAY['writing', 'communication', 'cbc', 'guidelines']
),
(
  'Critical Thinking Strategies',
  'Interactive exercises for developing critical thinking skills',
  'exercise',
  'intermediate',
  'General',
  'All Grades',
  'Critical Thinking and Problem Solving',
  ARRAY['critical_thinking', 'problem_solving', 'interactive']
),
(
  'Mathematics Problem Solving Techniques',
  'Video series on mathematical reasoning and problem solving',
  'video',
  'intermediate',
  'Mathematics',
  'Grade 6-9',
  'Critical Thinking and Problem Solving',
  ARRAY['mathematics', 'problem_solving', 'reasoning']
);