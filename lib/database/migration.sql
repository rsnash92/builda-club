-- Migration script to add new fields to existing tables
-- This will NOT overwrite your existing data

-- Add new fields to existing clubs table (if it exists)
-- These commands will only add columns if they don't already exist

-- Add UI-specific fields to clubs table
DO $$ 
BEGIN
    -- Add category field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'category') THEN
        ALTER TABLE clubs ADD COLUMN category TEXT DEFAULT 'utility';
    END IF;
    
    -- Add token_symbol field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'token_symbol') THEN
        ALTER TABLE clubs ADD COLUMN token_symbol TEXT;
    END IF;
    
    -- Add thumbnail_url field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'thumbnail_url') THEN
        ALTER TABLE clubs ADD COLUMN thumbnail_url TEXT;
    END IF;
    
    -- Add likes field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'likes') THEN
        ALTER TABLE clubs ADD COLUMN likes INTEGER DEFAULT 0;
    END IF;
    
    -- Add is_hot field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'is_hot') THEN
        ALTER TABLE clubs ADD COLUMN is_hot BOOLEAN DEFAULT false;
    END IF;
    
    -- Add is_lord_of_dev field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'is_lord_of_dev') THEN
        ALTER TABLE clubs ADD COLUMN is_lord_of_dev BOOLEAN DEFAULT false;
    END IF;
    
    -- Add progress field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'progress') THEN
        ALTER TABLE clubs ADD COLUMN progress INTEGER DEFAULT 0;
    END IF;
    
    -- Add market_cap field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'market_cap') THEN
        ALTER TABLE clubs ADD COLUMN market_cap DECIMAL(18,2) DEFAULT 0;
    END IF;
    
    -- Add market_cap_change field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'market_cap_change') THEN
        ALTER TABLE clubs ADD COLUMN market_cap_change DECIMAL(5,2) DEFAULT 0;
    END IF;
    
    -- Add volume field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'volume') THEN
        ALTER TABLE clubs ADD COLUMN volume DECIMAL(18,2) DEFAULT 0;
    END IF;
    
    -- Add treasury_address field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'treasury_address') THEN
        ALTER TABLE clubs ADD COLUMN treasury_address TEXT;
    END IF;
    
    -- Add created_by field (if using Supabase auth)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'created_by') THEN
        ALTER TABLE clubs ADD COLUMN created_by UUID REFERENCES auth.users(id);
    END IF;
    
    -- Add updated_at field
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'clubs' AND column_name = 'updated_at') THEN
        ALTER TABLE clubs ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create members table if it doesn't exist
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  token_balance DECIMAL(18,2) DEFAULT 0,
  contribution_amount DECIMAL(18,2) DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(club_id, user_id)
);

-- Create transactions table if it doesn't exist
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type TEXT NOT NULL CHECK (type IN ('contribution', 'withdrawal', 'mint', 'burn')),
  amount DECIMAL(18,2) NOT NULL,
  token_amount DECIMAL(18,2),
  description TEXT,
  tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  wallet_address TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_members_club_id ON members(club_id);
CREATE INDEX IF NOT EXISTS idx_members_user_id ON members(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_club_id ON transactions(club_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_clubs_created_by ON clubs(created_by);

-- Enable RLS if not already enabled
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist (these will fail gracefully if they already exist)
DO $$ 
BEGIN
    -- Clubs policies
    BEGIN
        CREATE POLICY "Users can view all clubs" ON clubs FOR SELECT USING (true);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Users can create clubs" ON clubs FOR INSERT WITH CHECK (auth.uid() = created_by);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Club creators can update their clubs" ON clubs FOR UPDATE USING (auth.uid() = created_by);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    -- Members policies
    BEGIN
        CREATE POLICY "Users can view members of clubs they belong to" ON members FOR SELECT USING (
            auth.uid() = user_id OR 
            EXISTS (SELECT 1 FROM members m WHERE m.club_id = members.club_id AND m.user_id = auth.uid())
        );
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Users can join clubs" ON members FOR INSERT WITH CHECK (auth.uid() = user_id);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Users can update their own membership" ON members FOR UPDATE USING (auth.uid() = user_id);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    -- Transactions policies
    BEGIN
        CREATE POLICY "Users can view transactions of clubs they belong to" ON transactions FOR SELECT USING (
            EXISTS (SELECT 1 FROM members m WHERE m.club_id = transactions.club_id AND m.user_id = auth.uid())
        );
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Users can create transactions for clubs they belong to" ON transactions FOR INSERT WITH CHECK (
            auth.uid() = user_id AND
            EXISTS (SELECT 1 FROM members m WHERE m.club_id = transactions.club_id AND m.user_id = auth.uid())
        );
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    -- User profiles policies
    BEGIN
        CREATE POLICY "Users can view all profiles" ON user_profiles FOR SELECT USING (true);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
    
    BEGIN
        CREATE POLICY "Users can insert their own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN
        -- Policy already exists, ignore
    END;
END $$;

-- Create trigger function for updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_clubs_updated_at') THEN
        CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON clubs
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at') THEN
        CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
