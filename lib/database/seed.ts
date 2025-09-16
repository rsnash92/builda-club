import { supabaseAdmin } from '@/lib/supabase'

const sampleClubs = [
  {
    name: "fantard.io",
    description: "Your apps become glowing 8-bit cartridges in a dark blue retro gaming interface. Transform any project into a nostalgic gaming experience.",
    category: "gaming",
    token_symbol: "$FNTRD",
    thumbnail_url: null,
    likes: 0,
    is_hot: true,
    is_lord_of_dev: true,
    progress: 85,
    market_cap: 35600,
    market_cap_change: 233.00,
    volume: 41900,
    treasury_balance: 35600,
    created_by: null // Will be set to null for now
  },
  {
    name: "PaceTerminal",
    description: "Blink and you'll miss how fast your tokens load in this lightning-fast terminal interface. Built for speed and efficiency.",
    category: "utility",
    token_symbol: "$PACE",
    thumbnail_url: null,
    likes: 14,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 92,
    market_cap: 148900,
    market_cap_change: -10.86,
    volume: 6700,
    treasury_balance: 148900,
    created_by: "00000000-0000-0000-0000-000000000002"
  },
  {
    name: "zalascape95",
    description: "Your project landing page disguised as a delightfully retro Windows 95 desktop. Nostalgia meets modern functionality.",
    category: "utility",
    token_symbol: "$ZALA",
    thumbnail_url: null,
    likes: 8,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 78,
    market_cap: 119500,
    market_cap_change: 20.39,
    volume: 5300,
    treasury_balance: 119500,
    created_by: "00000000-0000-0000-0000-000000000003"
  },
  {
    name: "zero.fun",
    description: "Stop the power surge at perfect zero to win SOL in this pixel-perfect timing game. Test your reflexes and win crypto.",
    category: "gaming",
    token_symbol: "$ZERO",
    thumbnail_url: null,
    likes: 23,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 45,
    market_cap: 4800,
    market_cap_change: 0.00,
    volume: 24.8,
    treasury_balance: 4800,
    created_by: "00000000-0000-0000-0000-000000000004"
  },
  {
    name: "Meme Generator",
    description: "Unleash your inner comedy genius with this ridiculously powerful meme creation tool. Create viral content in seconds.",
    category: "fun",
    token_symbol: "$MEME",
    thumbnail_url: null,
    likes: 156,
    is_hot: true,
    is_lord_of_dev: false,
    progress: 100,
    market_cap: 1200000,
    market_cap_change: -18.37,
    volume: 162700,
    treasury_balance: 1200000,
    created_by: "00000000-0000-0000-0000-000000000005"
  },
  {
    name: "YESNODAO",
    description: "Stake tiny SOL bets on daily predictions in a pixel-perfect prediction market. Will Oscar Piastri win F1 2023?",
    category: "gaming",
    token_symbol: "$YESNO",
    thumbnail_url: null,
    likes: 42,
    is_hot: false,
    is_lord_of_dev: false,
    progress: 67,
    market_cap: 116300,
    market_cap_change: 1.87,
    volume: 2500,
    treasury_balance: 116300,
    created_by: "00000000-0000-0000-0000-000000000006"
  }
]

export async function seedDatabase() {
  if (!supabaseAdmin) {
    console.error('Supabase admin client not configured')
    return
  }

  try {
    console.log('Starting database seed...')

    // Clear existing data
    await supabaseAdmin.from('clubs').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Insert sample clubs
    const { data, error } = await supabaseAdmin
      .from('clubs')
      .insert(sampleClubs)
      .select()

    if (error) {
      console.error('Error seeding clubs:', error)
      return
    }

    console.log(`Successfully seeded ${data.length} clubs`)
    return data
  } catch (error) {
    console.error('Error during seeding:', error)
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase().then(() => {
    console.log('Seeding complete')
    process.exit(0)
  }).catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })
}
