import { NextRequest, NextResponse } from 'next/server'
import { ClubService } from '@/lib/database/services'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  // Debug: Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set')
  console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set')
  
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { 
        error: 'Supabase not configured',
        debug: {
          url: supabaseUrl ? 'Set' : 'Not set',
          anonKey: supabaseAnonKey ? 'Set' : 'Not set'
        }
      },
      { status: 500 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const filters = {
      category: category || undefined,
      search: search || undefined,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    }

    const clubs = await ClubService.getAllClubs(filters)

    return NextResponse.json({ clubs })
  } catch (error) {
    console.error('Error fetching clubs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const club = await ClubService.createClub(body)

    return NextResponse.json({ club }, { status: 201 })
  } catch (error) {
    console.error('Error creating club:', error)
    return NextResponse.json(
      { error: 'Failed to create club' },
      { status: 500 }
    )
  }
}
