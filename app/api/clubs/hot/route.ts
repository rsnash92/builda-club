import { NextRequest, NextResponse } from 'next/server'
import { ClubService } from '@/lib/database/services'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    const clubs = await ClubService.getHotClubs(limit ? parseInt(limit) : 6)

    return NextResponse.json({ clubs })
  } catch (error) {
    console.error('Error fetching hot clubs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hot clubs' },
      { status: 500 }
    )
  }
}
