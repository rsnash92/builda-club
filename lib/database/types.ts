export interface Club {
  id: string
  name: string
  description?: string
  category?: string
  token_symbol?: string
  treasury_balance: number
  token_address?: string
  treasury_address?: string
  thumbnail_url?: string
  likes: number
  is_hot: boolean
  is_lord_of_dev: boolean
  progress: number
  market_cap: number
  market_cap_change: number
  volume: number
  created_at: string
  updated_at: string
  created_by: string
}

export interface Member {
  id: string
  club_id: string
  user_id: string
  token_balance: number
  contribution_amount: number
  joined_at: string
  is_active: boolean
}

export interface Transaction {
  id: string
  club_id: string
  user_id: string
  type: 'contribution' | 'withdrawal' | 'mint' | 'burn'
  amount: number
  token_amount?: number
  description?: string
  tx_hash?: string
  created_at: string
}

export interface UserProfile {
  id: string
  email?: string
  wallet_address?: string
  display_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Database response types
export type ClubWithMembers = Club & {
  members: Member[]
  member_count: number
}

export type MemberWithProfile = Member & {
  user_profile: UserProfile
}

export type TransactionWithProfile = Transaction & {
  user_profile: UserProfile
}

