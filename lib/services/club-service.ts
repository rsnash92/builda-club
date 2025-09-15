import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase'
import { Club, Member, ClubWithMembers } from '@/lib/database/types'

export class ClubService {
  // Get all clubs
  static async getClubs(): Promise<Club[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty clubs array')
      return []
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching clubs:', error)
      throw error
    }

    return data || []
  }

  // Get club by ID with members
  static async getClubById(id: string): Promise<ClubWithMembers | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning null')
      return null
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .select(`
        *,
        members (
          *,
          user_profiles (*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching club:', error)
      return null
    }

    return {
      ...data,
      member_count: data.members?.length || 0
    }
  }

  // Create a new club
  static async createClub(clubData: {
    name: string
    description?: string
    created_by: string
  }): Promise<Club> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .insert([clubData])
      .select()
      .single()

    if (error) {
      console.error('Error creating club:', error)
      throw error
    }

    return data
  }

  // Join a club
  static async joinClub(clubId: string, userId: string, contributionAmount: number = 0): Promise<Member> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('members')
      .insert([{
        club_id: clubId,
        user_id: userId,
        contribution_amount: contributionAmount,
        token_balance: contributionAmount // For now, 1:1 ratio
      }])
      .select()
      .single()

    if (error) {
      console.error('Error joining club:', error)
      throw error
    }

    return data
  }

  // Get user's clubs
  static async getUserClubs(userId: string): Promise<ClubWithMembers[]> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured, returning empty clubs array')
      return []
    }

    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('clubs')
      .select(`
        *,
        members!inner (
          *,
          user_profiles (*)
        )
      `)
      .eq('members.user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user clubs:', error)
      throw error
    }

    return data?.map((club: any) => ({
      ...club,
      member_count: club.members?.length || 0
    })) || []
  }

  // Update club treasury balance
  static async updateTreasuryBalance(clubId: string, newBalance: number): Promise<void> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase not configured')
    }

    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('clubs')
      .update({ treasury_balance: newBalance })
      .eq('id', clubId)

    if (error) {
      console.error('Error updating treasury balance:', error)
      throw error
    }
  }
}