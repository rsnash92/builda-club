-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core tables for builda.club

-- Clubs table
CREATE TABLE clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'utility',
  token_symbol TEXT,
  treasury_balance DECIMAL(18,2) DEFAULT 0,
  token_address TEXT,
  treasury_address TEXT,
  thumbnail_url TEXT,
  likes INTEGER DEFAULT 0,
  is_hot BOOLEAN DEFAULT false,
  is_lord_of_dev BOOLEAN DEFAULT false,
  progress INTEGER DEFAULT 0,
  market_cap DECIMAL(18,2) DEFAULT 0,
  market_cap_change DECIMAL(5,2) DEFAULT 0,
  volume DECIMAL(18,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Members table
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  token_balance DECIMAL(18,2) DEFAULT 0,
  contribution_amount DECIMAL(18,2) DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(club_id, user_id)
);

-- Transactions table
CREATE TABLE transactions (
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

-- User profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  wallet_address TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_members_club_id ON members(club_id);
CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_transactions_club_id ON transactions(club_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_clubs_created_by ON clubs(created_by);

-- Row Level Security (RLS) policies
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for clubs
CREATE POLICY "Users can view all clubs" ON clubs
  FOR SELECT USING (true);

CREATE POLICY "Users can create clubs" ON clubs
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Club creators can update their clubs" ON clubs
  FOR UPDATE USING (auth.uid() = created_by);

-- Policies for members
CREATE POLICY "Users can view members of clubs they belong to" ON members
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM members m 
      WHERE m.club_id = members.club_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join clubs" ON members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership" ON members
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for transactions
CREATE POLICY "Users can view transactions of clubs they belong to" ON transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM members m 
      WHERE m.club_id = transactions.club_id AND m.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create transactions for clubs they belong to" ON transactions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM members m 
      WHERE m.club_id = transactions.club_id AND m.user_id = auth.uid()
    )
  );

-- Policies for user profiles
CREATE POLICY "Users can view all profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON clubs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

