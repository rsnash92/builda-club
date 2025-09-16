import Link from 'next/link'
import { Search, Flame, Gamepad2, Brain, Wrench, MessageCircle, DollarSign, PartyPopper, Heart, Users, Crown, TrendingUp, TrendingDown } from 'lucide-react'
import { AuthButton } from './components/AuthButton'

// Mock data for communities
const communities = [
  {
    id: 1,
    title: "fantard.io",
    creator: "Fantardio",
    description: "Your apps become glowing 8-bit cartridges in a dark blue retro gaming interface. Transform any project into a nostalgic gaming experience.",
    category: "gaming",
    thumbnail: "/api/placeholder/300/200",
    likes: 0,
    members: 46,
    tokenSymbol: "$FNTRD",
    marketCap: "$35.6K",
    marketCapChange: "+233.00%",
    volume: "$41.9K",
    isHot: true,
    isLordOfDev: true,
    progress: 85
  },
  {
    id: 2,
    title: "PaceTerminal",
    creator: "kasper",
    description: "Blink and you'll miss how fast your tokens load in this lightning-fast terminal interface. Built for speed and efficiency.",
    category: "utility",
    thumbnail: "/api/placeholder/300/200",
    likes: 14,
    members: 13369,
    tokenSymbol: "$PACE",
    marketCap: "$148.9K",
    marketCapChange: "-10.86%",
    volume: "$6.7K",
    isHot: false,
    isLordOfDev: false,
    progress: 92
  },
  {
    id: 3,
    title: "zalascape95",
    creator: "zala",
    description: "Your project landing page disguised as a delightfully retro Windows 95 desktop. Nostalgia meets modern functionality.",
    category: "utility",
    thumbnail: "/api/placeholder/300/200",
    likes: 8,
    members: 2341,
    tokenSymbol: "$ZALA",
    marketCap: "$119.5K",
    marketCapChange: "+20.39%",
    volume: "$5.3K",
    isHot: false,
    isLordOfDev: false,
    progress: 78
  },
  {
    id: 4,
    title: "zero.fun",
    creator: "zerodev",
    description: "Stop the power surge at perfect zero to win SOL in this pixel-perfect timing game. Test your reflexes and win crypto.",
    category: "gaming",
    thumbnail: "/api/placeholder/300/200",
    likes: 23,
    members: 891,
    tokenSymbol: "$ZERO",
    marketCap: "$4.8K",
    marketCapChange: "+0.00%",
    volume: "$24.8",
    isHot: false,
    isLordOfDev: false,
    progress: 45
  },
  {
    id: 5,
    title: "Meme Generator",
    creator: "memelord",
    description: "Unleash your inner comedy genius with this ridiculously powerful meme creation tool. Create viral content in seconds.",
    category: "fun",
    thumbnail: "/api/placeholder/300/200",
    likes: 156,
    members: 12450,
    tokenSymbol: "$MEME",
    marketCap: "$1.2M",
    marketCapChange: "-18.37%",
    volume: "$162.7K",
    isHot: true,
    isLordOfDev: false,
    progress: 100
  },
  {
    id: 6,
    title: "YESNODAO",
    creator: "prediction",
    description: "Stake tiny SOL bets on daily predictions in a pixel-perfect prediction market. Will Oscar Piastri win F1 2023?",
    category: "gaming",
    thumbnail: "/api/placeholder/300/200",
    likes: 42,
    members: 3456,
    tokenSymbol: "$YESNO",
    marketCap: "$116.3K",
    marketCapChange: "+1.87%",
    volume: "$2.5K",
    isHot: false,
    isLordOfDev: false,
    progress: 67
  }
]

const categories = [
  { name: "what's hot", icon: Flame, isDropdown: true },
  { name: "gaming", icon: Gamepad2, isDropdown: false },
  { name: "ai", icon: Brain, isDropdown: false },
  { name: "utility", icon: Wrench, isDropdown: false },
  { name: "social", icon: MessageCircle, isDropdown: false },
  { name: "money", icon: DollarSign, isDropdown: false },
  { name: "fun", icon: PartyPopper, isDropdown: false }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span className="text-2xl font-bold">builda.club</span>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-green-400 border-b-2 border-green-400 pb-1 font-medium">
                communities
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                projects
              </Link>
              <Link href="/economics" className="text-gray-400 hover:text-white transition-colors">
                economics
              </Link>
            </nav>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="find the next 100x community..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <AuthButton />
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category.name === "what's hot"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span className="capitalize">{category.name}</span>
                {category.isDropdown && <span className="text-xs">▼</span>}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div key={community.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors">
              {/* Thumbnail */}
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-4xl font-bold text-white/80">
                    {community.title.charAt(0)}
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  {community.isHot && (
                    <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                      <Flame className="h-3 w-3 mr-1" />
                      HOT
                    </div>
                  )}
                  {community.isLordOfDev && (
                    <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium flex items-center">
                      <Crown className="h-3 w-3 mr-1" />
                      LORD OF DEV
                    </div>
                  )}
                </div>
                
                {/* Category Tag */}
                <div className="absolute top-2 left-2">
                  <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {community.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{community.title}</h3>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{community.creator}</p>
                
                {/* Engagement Metrics */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{community.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{community.members.toLocaleString()}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {community.description}
                </p>
                
                {/* Financial Metrics */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                      {community.tokenSymbol}
                    </button>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {community.marketCap}
                        <span className={`ml-1 text-xs ${
                          community.marketCapChange.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {community.marketCapChange}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        vol: {community.volume}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${community.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

