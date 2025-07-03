/*
  # Authentication Enhancements

  1. Updates to profiles table
    - Add auth_method column to track authentication method
    - Add wallet_address for MetaMask users
    - Update RLS policies for better security

  2. Triggers and Functions
    - Auto-create profile on user signup
    - Handle different authentication methods

  3. Security
    - Enhanced RLS policies
    - Proper handling of OAuth and MetaMask users
*/

-- Add new columns to profiles table
DO $$ BEGIN
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS auth_method text DEFAULT 'email';
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE profiles ADD COLUMN IF NOT EXISTS wallet_address text;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    auth_method,
    wallet_address,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    COALESCE(new.raw_user_meta_data->>'auth_method', new.app_metadata->>'provider', 'email'),
    new.raw_user_meta_data->>'wallet_address',
    now(),
    now()
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update RLS policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create index for wallet addresses
CREATE INDEX IF NOT EXISTS profiles_wallet_address_idx ON profiles(wallet_address) WHERE wallet_address IS NOT NULL;

-- Create index for auth methods
CREATE INDEX IF NOT EXISTS profiles_auth_method_idx ON profiles(auth_method);

-- Update existing profiles to set default auth method
UPDATE profiles 
SET auth_method = 'email' 
WHERE auth_method IS NULL;