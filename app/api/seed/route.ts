import { NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/database/seed'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function POST() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const result = await seedDatabase()
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      clubs: result 
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
