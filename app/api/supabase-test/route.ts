import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      error: 'Supabase not configured',
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
      }
    }, { status: 500 })
  }

  try {
    // Try a simple query to test connection
    const { data, error } = await supabase!.from('clubs').select('count').limit(1)
    
    if (error) {
      return NextResponse.json({
        error: 'Supabase query failed',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection working',
      data: data
    })
  } catch (err) {
    return NextResponse.json({
      error: 'Supabase connection failed',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
