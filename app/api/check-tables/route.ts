import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    // Get list of all tables
    const { data: tables, error: tablesError } = await supabaseAdmin!
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (tablesError) {
      throw tablesError
    }

    // Get columns for each table
    const tableDetails = await Promise.all(
      tables.map(async (table) => {
        const { data: columns, error: columnsError } = await supabaseAdmin!
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable, column_default')
          .eq('table_name', table.table_name)
          .eq('table_schema', 'public')

        if (columnsError) {
          console.error(`Error fetching columns for ${table.table_name}:`, columnsError)
          return { table_name: table.table_name, columns: [], error: columnsError.message }
        }

        return {
          table_name: table.table_name,
          columns: columns || []
        }
      })
    )

    return NextResponse.json({
      tables: tableDetails,
      message: 'Table structure retrieved successfully'
    })
  } catch (error) {
    console.error('Error checking tables:', error)
    return NextResponse.json(
      { error: 'Failed to check tables' },
      { status: 500 }
    )
  }
}
