/*
  # Create assignments table

  1. New Tables
    - `assignments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `subject` (text)
      - `assignment_type` (text)
      - `status` (text)
      - `due_date` (timestamptz, optional)
      - `content` (text, optional)
      - `ai_suggestions` (text array, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `assignments` table
    - Add policies for users to manage their own assignments
*/

CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  subject text NOT NULL,
  assignment_type text NOT NULL CHECK (assignment_type IN ('essay', 'research', 'presentation', 'report', 'other')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'submitted')),
  due_date timestamptz,
  content text,
  ai_suggestions text[],
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own assignments"
  ON assignments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assignments"
  ON assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assignments"
  ON assignments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assignments"
  ON assignments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS assignments_user_id_idx ON assignments(user_id);
CREATE INDEX IF NOT EXISTS assignments_status_idx ON assignments(status);
CREATE INDEX IF NOT EXISTS assignments_created_at_idx ON assignments(created_at DESC);