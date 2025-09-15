import Link from 'next/link'
import { ArrowRight, Users, Zap, Shield, Globe } from 'lucide-react'
import { AuthButton } from './components/AuthButton'
import { SupabaseTest } from './components/SupabaseTest'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <span className="text-2xl font-bold text-gray-900">builda.club</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/whitepaper" className="text-gray-600 hover:text-gray-900">Whitepaper</Link>
              <Link href="/community" className="text-gray-600 hover:text-gray-900">Community</Link>
            </nav>
            <div className="flex space-x-4">
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            BUIDL Your Community's
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Future
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform online communities into builder DAOs where members become co-owners, not subscribers. 
            Built with battle-tested Web3 infrastructure for both crypto natives and mainstream users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary px-8 py-4 text-lg">
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="btn btn-secondary px-8 py-4 text-lg">
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>

      {/* Supabase Test Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <SupabaseTest />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why builda.club?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just building another platform. We're building the future of how communities organize, create value, and share ownership.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Ownership</h3>
              <p className="text-gray-600">
                Members get real equity in what they build together, not just subscriptions.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">BUIDL Culture</h3>
              <p className="text-gray-600">
                Focus on building value, not trading speculation. Non-tradeable club tokens.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Battle-Tested Stack</h3>
              <p className="text-gray-600">
                Privy, Supabase, thirdweb, Vercel - proven at scale with major platforms.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Progressive Disclosure</h3>
              <p className="text-gray-600">
                Crypto when ready, not required. Seamless experience for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to BUIDL?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the movement where builders become owners. Start your community's transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/create-club" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Create Your Club
            </a>
            <a href="/club/demo" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
              View Demo Club
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <span className="text-2xl font-bold">builda.club</span>
              </div>
              <p className="text-gray-400">
                Where Builders Become Owners
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/discord" className="hover:text-white">Discord</Link></li>
                <li><Link href="/twitter" className="hover:text-white">Twitter</Link></li>
                <li><Link href="/github" className="hover:text-white">GitHub</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 builda.club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

