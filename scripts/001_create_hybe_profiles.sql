-- Create HYBE user profiles table
CREATE TABLE IF NOT EXISTS public.hybe_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  hybe_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_default_password BOOLEAN DEFAULT TRUE,
  membership_tier TEXT DEFAULT 'Bronze' CHECK (membership_tier IN ('Bronze', 'Silver', 'Gold', 'Diamond')),
  army_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hybe_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "hybe_profiles_select_own"
  ON public.hybe_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "hybe_profiles_insert_own"
  ON public.hybe_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "hybe_profiles_update_own"
  ON public.hybe_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "hybe_profiles_delete_own"
  ON public.hybe_profiles FOR DELETE
  USING (auth.uid() = id);

-- Create admin table for manual profile management
CREATE TABLE IF NOT EXISTS public.hybe_admin_profiles (
  id SERIAL PRIMARY KEY,
  hybe_id TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT,
  default_password TEXT DEFAULT 'HYBEARMY2025',
  is_registered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the provided valid IDs
INSERT INTO public.hybe_admin_profiles (hybe_id, display_name, email) VALUES
('HYBFFF9012345', 'Haerin Kang', NULL),
('B07200EF6667', 'Radhika Verma', NULL),
('HYB10250GB0680', 'Elisabete Magalhaes', NULL),
('HYB59371A4C9F2', 'MEGHANA VAISHNAVI', NULL)
ON CONFLICT (hybe_id) DO NOTHING;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_hybe_user_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if this user was pre-registered in admin table
  UPDATE public.hybe_admin_profiles 
  SET is_registered = TRUE 
  WHERE hybe_id = (NEW.raw_user_meta_data ->> 'hybe_id');
  
  -- Insert into hybe_profiles
  INSERT INTO public.hybe_profiles (
    id, 
    hybe_id, 
    display_name, 
    email,
    is_default_password
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'hybe_id', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', ''),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data ->> 'is_default_password')::boolean, TRUE)
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_hybe_user_created ON auth.users;
CREATE TRIGGER on_hybe_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_hybe_user_registration();
