import { supabase, getSupabaseClient } from '@/lib/supabase'
import { Club, Member, UserProfile, ClubWithMembers, MemberWithProfile, TransactionWithProfile } from './types'

// Club Services
export class ClubService {
  static async getAllClubs(filters?: {
    category?: string
    search?: string
    limit?: number
    offset?: number
  }) {
    const client = getSupabaseClient()
    
    let query = client
      .from('clubs')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.category && filters.category !== "what's hot") {
      query = query.eq('category', filters.category)
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching clubs:', error)
      throw error
    }

    return data as Club[]
  }

  static async getClubById(id: string) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('clubs')
      .select(`
        *,
        members!inner(*),
        user_profiles!clubs_created_by_fkey(display_name, avatar_url)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching club:', error)
      throw error
    }

    return data as ClubWithMembers & { creator_name: string; creator_avatar: string }
  }

  static async createClub(clubData: {
    name: string
    description?: string
    category?: string
    token_symbol?: string
    created_by: string
  }) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('clubs')
      .insert([clubData])
      .select()
      .single()

    if (error) {
      console.error('Error creating club:', error)
      throw error
    }

    return data as Club
  }

  static async updateClub(id: string, updates: Partial<Club>) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('clubs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating club:', error)
      throw error
    }

    return data as Club
  }

  static async deleteClub(id: string) {
    const client = getSupabaseClient()
    
    const { error } = await client
      .from('clubs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting club:', error)
      throw error
    }
  }

  static async getHotClubs(limit: number = 6) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('clubs')
      .select('*')
      .eq('is_hot', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching hot clubs:', error)
      throw error
    }

    return data as Club[]
  }
}

// Member Services
export class MemberService {
  static async joinClub(clubId: string, userId: string, contributionAmount: number = 0) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('members')
      .insert([{
        club_id: clubId,
        user_id: userId,
        contribution_amount: contributionAmount,
        token_balance: contributionAmount // 1:1 ratio for now
      }])
      .select()
      .single()

    if (error) {
      console.error('Error joining club:', error)
      throw error
    }

    return data as Member
  }

  static async leaveClub(clubId: string, userId: string) {
    const client = getSupabaseClient()
    
    const { error } = await client
      .from('members')
      .update({ is_active: false })
      .eq('club_id', clubId)
      .eq('user_id', userId)

    if (error) {
      console.error('Error leaving club:', error)
      throw error
    }
  }

  static async getClubMembers(clubId: string) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('members')
      .select(`
        *,
        user_profiles!members_user_id_fkey(*)
      `)
      .eq('club_id', clubId)
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching club members:', error)
      throw error
    }

    return data as MemberWithProfile[]
  }

  static async getUserClubs(userId: string) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('members')
      .select(`
        *,
        clubs!inner(*)
      `)
      .eq('user_id', userId)
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching user clubs:', error)
      throw error
    }

    return data as (Member & { clubs: Club })[]
  }
}

// User Profile Services
export class UserProfileService {
  static async getProfile(userId: string) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
      throw error
    }

    return data as UserProfile | null
  }

  static async createOrUpdateProfile(profileData: Partial<UserProfile>) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('user_profiles')
      .upsert([profileData])
      .select()
      .single()

    if (error) {
      console.error('Error creating/updating profile:', error)
      throw error
    }

    return data as UserProfile
  }
}

// Transaction Services
export class TransactionService {
  static async getClubTransactions(clubId: string, limit: number = 50) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('transactions')
      .select(`
        *,
        user_profiles!transactions_user_id_fkey(*)
      `)
      .eq('club_id', clubId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching transactions:', error)
      throw error
    }

    return data as TransactionWithProfile[]
  }

  static async createTransaction(transactionData: {
    club_id: string
    user_id: string
    type: 'contribution' | 'withdrawal' | 'mint' | 'burn'
    amount: number
    token_amount?: number
    description?: string
    tx_hash?: string
  }) {
    const client = getSupabaseClient()
    
    const { data, error } = await client
      .from('transactions')
      .insert([transactionData])
      .select()
      .single()

    if (error) {
      console.error('Error creating transaction:', error)
      throw error
    }

    return data
  }
}
