import { supabase } from '@/lib/supabase'
import { UserProfile } from '@/lib/database/types'

export async function syncPrivyUserWithSupabase(privyUser: any) {
  try {
    // Get or create Supabase user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: privyUser.email?.address || 'temp@example.com',
      password: 'temp-password' // This will be handled by Supabase's magic link or OAuth
    })

    if (authError && authError.message.includes('Invalid login credentials')) {
      // Create new user if doesn't exist
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: privyUser.email?.address || 'temp@example.com',
        password: 'temp-password'
      })

      if (signUpError) {
        console.error('Error creating Supabase user:', signUpError)
        return null
      }

      // Wait for email confirmation or use magic link
      if (signUpData.user) {
        await createUserProfile(signUpData.user.id, privyUser)
        return signUpData.user
      }
    } else if (authData.user) {
      await createUserProfile(authData.user.id, privyUser)
      return authData.user
    }

    return null
  } catch (error) {
    console.error('Error syncing Privy user with Supabase:', error)
    return null
  }
}

async function createUserProfile(userId: string, privyUser: any) {
  try {
    const profileData: Partial<UserProfile> = {
      id: userId,
      email: privyUser.email?.address,
      wallet_address: privyUser.wallet?.address,
      display_name: privyUser.email?.address?.split('@')[0] || 'User',
    }

    const { error } = await supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'id' })

    if (error) {
      console.error('Error creating user profile:', error)
    }
  } catch (error) {
    console.error('Error creating user profile:', error)
  }
}

export async function getSupabaseUserFromPrivy(privyUser: any) {
  try {
    // Try to find existing user by email
    if (privyUser.email?.address) {
      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', privyUser.email.address)
        .single()

      if (profiles) {
        return profiles
      }
    }

    // Try to find by wallet address
    if (privyUser.wallet?.address) {
      const { data: profiles } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('wallet_address', privyUser.wallet.address)
        .single()

      if (profiles) {
        return profiles
      }
    }

    return null
  } catch (error) {
    console.error('Error getting Supabase user from Privy:', error)
    return null
  }
}

