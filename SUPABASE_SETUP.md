# Supabase Setup Guide

This guide will help you set up Supabase for the builda.club application and transform the static content into dynamic data.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `builda-club`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
4. Click "Create new project"
5. Wait for the project to be created (2-3 minutes)

## 2. Get Your Supabase Credentials

1. Go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" in the settings menu
4. Copy the following values:
   - `Project URL` (looks like: `https://your-project-id.supabase.co`)
   - `anon public` key (starts with `eyJ...`)
   - `service_role` key (starts with `eyJ...`)

## 3. Update Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

## 4. Set Up Database Schema

### Option A: If you have existing tables (Recommended)

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `lib/database/migration.sql`
5. Paste it into the SQL editor
6. Click "Run" to execute the migration
7. This will safely add new columns to your existing tables without overwriting data

### Option B: If you want to start fresh

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `lib/database/schema.sql`
5. Paste it into the SQL editor
6. Click "Run" to execute the schema

### Check Your Current Tables

Before running either option, you can check what tables you currently have:

1. Go to `http://localhost:3000/admin` (after starting your dev server)
2. Click "Check Existing Tables" to see your current database structure
3. This will help you decide which approach to use

## 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/admin`
3. Log in with your account
4. Click "Test Supabase Connection" to verify everything is working
5. Click "Seed Database" to add sample data

## 6. Verify Dynamic Data

1. Go to the homepage (`http://localhost:3000`)
2. You should now see dynamic data from Supabase instead of static mock data
3. Try creating a new club using the "Create Club" button
4. Test the search and category filtering

## Database Schema Overview

The application uses the following main tables:

### `clubs`
- Stores club information including name, description, category
- Financial metrics like market cap, volume, treasury balance
- UI-specific fields like likes, progress, badges
- Links to creator via `created_by` field

### `members`
- Tracks club membership
- Stores token balances and contribution amounts
- Links users to clubs they belong to

### `transactions`
- Records all financial transactions
- Tracks contributions, withdrawals, mints, burns
- Links to both users and clubs

### `user_profiles`
- Stores user profile information
- Links to Supabase auth users
- Includes display name, avatar, wallet address

## API Endpoints

The application provides the following API endpoints:

- `GET /api/clubs` - Fetch clubs with filtering and pagination
- `POST /api/clubs` - Create a new club
- `GET /api/clubs/hot` - Fetch hot/trending clubs
- `POST /api/seed` - Seed database with sample data

## Next Steps

Once Supabase is set up and working:

1. **Real-time Updates**: Add real-time subscriptions for live data updates
2. **Search Enhancement**: Implement full-text search with Supabase
3. **User Authentication**: Integrate with Privy for Web3 authentication
4. **File Storage**: Use Supabase Storage for club thumbnails and assets
5. **Advanced Queries**: Add more sophisticated filtering and sorting options

## Troubleshooting

### Common Issues

1. **"Supabase not configured" error**
   - Check that your environment variables are set correctly
   - Restart your development server after updating `.env.local`

2. **Database connection errors**
   - Verify your Supabase URL and keys are correct
   - Check that your database schema has been applied
   - Ensure your Supabase project is active (not paused)

3. **Permission errors**
   - Check that Row Level Security (RLS) policies are set up correctly
   - Verify that your service role key has the necessary permissions

4. **Empty data**
   - Run the seed script to populate the database with sample data
   - Check the browser console for any API errors

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the application logs in your browser console
- Check the Supabase project logs in the dashboard
