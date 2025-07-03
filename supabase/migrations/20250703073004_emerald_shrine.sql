/*
  # Complete CBC AI Assignment Helper Schema

  1. New Tables
    - `profiles` - Extended user profiles with CBC learning preferences
    - `assignments` - Student assignments with CBC alignment
    - `workflow_templates` - AI analysis templates for different assignment types
    - `ai_results` - Comprehensive AI analysis results
    - `competency_assessments` - CBC competency tracking
    - `learning_paths` - Personalized learning journeys
    - `socratic_questions` - Generated questions for critical thinking
    - `usage_logs` - API usage and cost tracking
    - `resources` - Learning materials and references
    - `cbc_standards` - Kenya CBC curriculum standards
    - `learning_objectives` - Specific learning outcomes
    - `progress_tracking` - Student progress analytics

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Ensure users can only access their own data

  3. Performance
    - Add indexes for common queries
    - Create triggers for updated_at columns
    - Optimize for real-time subscriptions

  4. CBC Integration
    - Competency-based assessment structure
    - Kenyan curriculum alignment
    - Educational workflow templates
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types (handle existing types gracefully)
DO $$ BEGIN
  CREATE TYPE assignment_type AS ENUM ('essay', 'math', 'code', 'research', 'general');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE assignment_status AS ENUM ('uploaded', 'processing', 'completed', 'error');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE competency_level AS ENUM ('novice', 'developing', 'proficient', 'advanced');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE question_category AS ENUM ('clarification', 'assumptions', 'evidence', 'perspective', 'implications', 'meta');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE resource_type AS ENUM ('article', 'video', 'exercise', 'book', 'website');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CBC Standards table
CREATE TABLE IF NOT EXISTS cbc_standards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  grade_level text NOT NULL,
  strand text NOT NULL,
  sub_strand text,
  specific_outcome text NOT NULL,
  core_competencies text[],
  values text[],
  pertinent_issues text[],
  suggested_activities text[],
  assessment_methods text[],
  created_at timestamptz DEFAULT now()
);

-- Learning Objectives table
CREATE TABLE IF NOT EXISTS learning_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cbc_standard_id uuid REFERENCES cbc_standards(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  competency_area text NOT NULL,
  assessment_criteria text[],
  bloom_level text,
  created_at timestamptz DEFAULT now()
);

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
  theme_preference text DEFAULT 'light',
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
  due_date timestamptz,
  course_context text,
  specific_requirements text,
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
  cbc_standard_id uuid REFERENCES cbc_standards(id),
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

-- Progress tracking
CREATE TABLE IF NOT EXISTS progress_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  competency_name text NOT NULL,
  subject text NOT NULL,
  grade_level text,
  current_level competency_level NOT NULL,
  target_level competency_level NOT NULL,
  progress_percentage numeric(5,2) DEFAULT 0.0,
  last_assessment_date timestamptz DEFAULT now(),
  milestones_achieved text[],
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
ALTER TABLE cbc_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE socratic_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for CBC standards and learning objectives
CREATE POLICY "CBC standards are publicly readable" ON cbc_standards
  FOR SELECT USING (true);

CREATE POLICY "Learning objectives are publicly readable" ON learning_objectives
  FOR SELECT USING (true);

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

-- Progress tracking policies
CREATE POLICY "Users can view own progress_tracking" ON progress_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress_tracking" ON progress_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress_tracking" ON progress_tracking
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
CREATE INDEX IF NOT EXISTS cbc_standards_subject_grade_idx ON cbc_standards(subject, grade_level);
CREATE INDEX IF NOT EXISTS learning_objectives_competency_idx ON learning_objectives(competency_area);

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

CREATE INDEX IF NOT EXISTS progress_tracking_user_id_idx ON progress_tracking(user_id);
CREATE INDEX IF NOT EXISTS progress_tracking_competency_idx ON progress_tracking(competency_name);

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

CREATE TRIGGER update_progress_tracking_updated_at
  BEFORE UPDATE ON progress_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert CBC Standards for Kenya
INSERT INTO cbc_standards (subject, grade_level, strand, sub_strand, specific_outcome, core_competencies, values, pertinent_issues, suggested_activities, assessment_methods) VALUES
-- Mathematics
('Mathematics', 'Grade 4', 'Numbers', 'Whole Numbers', 'By the end of the sub strand, the learner should be able to read and write numbers up to 10,000', 
 ARRAY['Critical Thinking and Problem Solving', 'Communication and Collaboration'], 
 ARRAY['Responsibility', 'Respect'], 
 ARRAY['Financial Literacy'], 
 ARRAY['Number games', 'Real-life counting activities'], 
 ARRAY['Observation', 'Oral questions', 'Written exercises']),

-- English
('English', 'Grade 5', 'Listening and Speaking', 'Listening', 'By the end of the sub strand, the learner should be able to listen attentively to stories and poems',
 ARRAY['Communication and Collaboration', 'Learning to Learn'],
 ARRAY['Respect', 'Unity'],
 ARRAY['Life Skills'],
 ARRAY['Story telling', 'Poetry recitation'],
 ARRAY['Observation', 'Oral assessment']),

-- Kiswahili
('Kiswahili', 'Grade 6', 'Kusoma na Kuelewa', 'Kusoma kwa Sauti', 'Mwishoni mwa kipengele hiki, mwanafunzi ataweza kusoma kwa sauti vizuri',
 ARRAY['Communication and Collaboration', 'Self-Efficacy'],
 ARRAY['Unity', 'Patriotism'],
 ARRAY['Cultural Heritage'],
 ARRAY['Kusoma hadith', 'Mchezo wa majukumu'],
 ARRAY['Uchunguzi', 'Tathmini ya mdomo']),

-- Science and Technology
('Science and Technology', 'Grade 7', 'Living Things', 'Plants', 'By the end of the sub strand, the learner should be able to classify plants based on observable characteristics',
 ARRAY['Critical Thinking and Problem Solving', 'Imagination and Creativity'],
 ARRAY['Responsibility', 'Love'],
 ARRAY['Environmental Conservation'],
 ARRAY['Nature walks', 'Plant collection'],
 ARRAY['Practical assessment', 'Project work']),

-- Social Studies
('Social Studies', 'Grade 8', 'History and Government', 'Early Man', 'By the end of the sub strand, the learner should be able to explain the way of life of early man',
 ARRAY['Critical Thinking and Problem Solving', 'Citizenship'],
 ARRAY['Patriotism', 'Unity'],
 ARRAY['Cultural Heritage'],
 ARRAY['Role play', 'Field trips'],
 ARRAY['Oral questions', 'Written tests']),

-- Christian Religious Education
('Christian Religious Education', 'Grade 4', 'God the Creator', 'Creation', 'By the end of the sub strand, the learner should be able to appreciate God as the creator',
 ARRAY['Self-Efficacy', 'Citizenship'],
 ARRAY['Love', 'Respect', 'Responsibility'],
 ARRAY['Moral and Spiritual Values'],
 ARRAY['Bible study', 'Songs and prayers'],
 ARRAY['Observation', 'Oral assessment']),

-- Home Science
('Home Science', 'Grade 6', 'Food and Nutrition', 'Balanced Diet', 'By the end of the sub strand, the learner should be able to prepare a balanced meal',
 ARRAY['Critical Thinking and Problem Solving', 'Learning to Learn'],
 ARRAY['Responsibility', 'Love'],
 ARRAY['Health Education', 'Life Skills'],
 ARRAY['Cooking activities', 'Meal planning'],
 ARRAY['Practical assessment', 'Portfolio']),

-- Art and Craft
('Art and Craft', 'Grade 5', 'Drawing', 'Still Life Drawing', 'By the end of the sub strand, the learner should be able to draw objects from observation',
 ARRAY['Imagination and Creativity', 'Self-Efficacy'],
 ARRAY['Respect', 'Unity'],
 ARRAY['Cultural Heritage'],
 ARRAY['Drawing exercises', 'Art exhibitions'],
 ARRAY['Portfolio assessment', 'Peer assessment']);

-- Insert sample workflow templates
INSERT INTO workflow_templates (name, type, prompt_template, processing_steps, expected_output_format, cbc_alignment)
SELECT * FROM (VALUES
  (
    'CBC Essay Analysis',
    'essay'::assignment_type,
    'You are an expert educational mentor specializing in Kenya''s Competency-Based Curriculum. Analyze this essay for {grade_level} {subject} using CBC standards.

**Assignment Context Analysis:**
- Extract key requirements and CBC learning objectives
- Identify specific competencies being assessed
- Map to CBC values and pertinent issues

**CBC-Aligned Assessment:**
1. **Core Competencies Evaluation**: Assess Communication & Collaboration, Critical Thinking & Problem Solving, Imagination & Creativity
2. **Values Integration**: Check for Respect, Responsibility, Honesty, Peace, Love, Unity, Patriotism, Ubuntu
3. **Learning Outcomes**: Map to specific CBC strand outcomes
4. **Assessment Methods**: Use formative and authentic assessment approaches

**Socratic Guidance Questions:**
- How does your argument demonstrate critical thinking about {subject}?
- What evidence supports your main points in this {subject} context?
- How can you strengthen the connection between your ideas and CBC values?

**Personalized Learning Path:**
- Identify specific CBC competency gaps
- Suggest targeted activities aligned with KICD guidelines
- Recommend resources for improvement

[Assignment Content]: {content}
[CBC Subject]: {subject}
[Grade Level]: {grade_level}
[Learning Objectives]: {learning_objectives}',
    '["content_extraction", "cbc_competency_mapping", "values_assessment", "socratic_generation", "feedback_creation", "learning_path_generation"]'::jsonb,
    '{"competency_analysis": {}, "socratic_questions": [], "feedback_sections": [], "learning_path": [], "cbc_alignment": {}}'::jsonb,
    '{"core_competencies": ["communication", "critical_thinking", "creativity"], "values": ["respect", "responsibility", "honesty"], "assessment_methods": ["formative", "authentic"], "curriculum": "CBC Kenya"}'::jsonb
  ),
  (
    'CBC Mathematics Analysis',
    'math'::assignment_type,
    'You are an expert mathematics educator specializing in Kenya''s CBC curriculum. Analyze this mathematics work for {grade_level} using CBC standards.

**Mathematical Competency Assessment:**
1. **Problem-Solving Approach**: Evaluate strategy selection and implementation
2. **Mathematical Reasoning**: Assess logical thinking and justification
3. **Communication**: Check mathematical language and explanation clarity
4. **Application**: Evaluate real-world connection and relevance

**CBC Mathematics Strands Assessment:**
- Numbers and Number Operations
- Measurement and Estimation  
- Geometry and Spatial Sense
- Data Handling and Probability
- Patterns and Algebra

**Socratic Mathematical Questioning:**
- What mathematical concept is this problem testing?
- How did you decide on this solution method?
- Can you explain your reasoning step by step?
- How does this connect to real-life situations?

**Learning Path Development:**
- Identify specific mathematical skill gaps
- Suggest progressive practice activities
- Recommend manipulatives and resources

[Mathematics Content]: {content}
[Grade Level]: {grade_level}
[Mathematical Strand]: {strand}
[Learning Objectives]: {learning_objectives}',
    '["problem_identification", "solution_analysis", "reasoning_evaluation", "cbc_strand_mapping", "competency_assessment", "improvement_suggestions"]'::jsonb,
    '{"competency_analysis": {}, "socratic_questions": [], "feedback_sections": [], "learning_path": [], "mathematical_assessment": {}}'::jsonb,
    '{"core_competencies": ["critical_thinking", "problem_solving", "communication"], "strands": ["numbers", "measurement", "geometry", "data_handling", "algebra"], "assessment_focus": ["understanding", "application", "reasoning"], "curriculum": "CBC Kenya"}'::jsonb
  )
) AS t(name, type, prompt_template, processing_steps, expected_output_format, cbc_alignment)
WHERE NOT EXISTS (
  SELECT 1 FROM workflow_templates WHERE workflow_templates.name = t.name
);

-- Insert CBC learning resources
INSERT INTO resources (title, description, type, difficulty, subject, grade_level, cbc_competency, tags)
SELECT * FROM (VALUES
  (
    'CBC Writing Skills Development',
    'Comprehensive guide to developing writing skills according to CBC standards',
    'article'::resource_type,
    'beginner'::difficulty_level,
    'English',
    'Grade 4-8',
    'Communication and Collaboration',
    ARRAY['writing', 'communication', 'cbc', 'english']
  ),
  (
    'Mathematical Problem Solving Strategies',
    'Interactive exercises for developing mathematical reasoning in CBC context',
    'exercise'::resource_type,
    'intermediate'::difficulty_level,
    'Mathematics',
    'Grade 5-8',
    'Critical Thinking and Problem Solving',
    ARRAY['mathematics', 'problem_solving', 'reasoning', 'cbc']
  ),
  (
    'Kiswahili Language Development',
    'Resources for developing Kiswahili communication skills',
    'video'::resource_type,
    'intermediate'::difficulty_level,
    'Kiswahili',
    'Grade 4-8',
    'Communication and Collaboration',
    ARRAY['kiswahili', 'communication', 'language', 'cbc']
  ),
  (
    'Science Investigation Skills',
    'Hands-on activities for developing scientific inquiry skills',
    'exercise'::resource_type,
    'intermediate'::difficulty_level,
    'Science and Technology',
    'Grade 6-8',
    'Critical Thinking and Problem Solving',
    ARRAY['science', 'investigation', 'inquiry', 'cbc']
  ),
  (
    'CBC Values Integration Guide',
    'How to integrate CBC core values in learning activities',
    'article'::resource_type,
    'beginner'::difficulty_level,
    'General',
    'All Grades',
    'Citizenship',
    ARRAY['values', 'citizenship', 'character', 'cbc']
  )
) AS t(title, description, type, difficulty, subject, grade_level, cbc_competency, tags)
WHERE NOT EXISTS (
  SELECT 1 FROM resources WHERE resources.title = t.title
);