-- Targeted migration for existing clubs table
-- This adds only the missing UI-specific columns

-- Add UI-specific fields to existing clubs table
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
END $$;

-- Create indexes for better performance (if they don't exist)
CREATE INDEX IF NOT EXISTS idx_clubs_category ON clubs(category);
CREATE INDEX IF NOT EXISTS idx_clubs_is_hot ON clubs(is_hot);
CREATE INDEX IF NOT EXISTS idx_clubs_created_by ON clubs(created_by);

-- Enable RLS if not already enabled
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
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
END $$;

-- Create trigger function for updated_at if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_clubs_updated_at') THEN
        CREATE TRIGGER update_clubs_updated_at BEFORE UPDATE ON clubs
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
