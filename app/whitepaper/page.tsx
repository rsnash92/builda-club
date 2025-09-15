import Link from 'next/link'
import { ArrowLeft, Download, Share2 } from 'lucide-react'

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <span className="text-2xl font-bold text-gray-900">builda.club</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="btn btn-secondary px-4 py-2">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button className="btn btn-primary px-4 py-2">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Whitepaper Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                builda.club Whitepaper v5.0
              </h1>
              <p className="text-xl text-gray-600 italic mb-6">
                BUIDL Your Community's Future
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <span>Version 5.0</span>
                <span>•</span>
                <span>December 2024</span>
                <span>•</span>
                <span>The BUIDL Revolution</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Executive Summary</h2>
                <p className="text-blue-800 leading-relaxed">
                  <strong>builda.club</strong> transforms online communities into builder DAOs where members become co-owners, not subscribers. 
                  Unlike traditional platforms where value flows to platform owners, or failed Web3 social tokens that become speculation vehicles, 
                  builda.club empowers any Discord or Telegram group to BUIDL a collectively-owned entity with shared resources, governance rights, and aligned incentives.
                </p>
                <p className="text-blue-800 leading-relaxed mt-4">
                  Built with battle-tested Web3 infrastructure (Privy, Vercel, Supabase, thirdweb), builda.club delivers a seamless experience 
                  for both crypto natives and mainstream users. The platform embodies BUIDL culture - focusing on building value, not trading speculation.
                </p>
                <p className="text-blue-800 font-semibold mt-4">
                  The genius: "builda" = "build a club" for normies, "build a DAO" for the informed, and taps directly into crypto's beloved BUIDL culture.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem: Communities Create Value, Platforms Capture It</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-red-900 mb-4">The $10 Billion Problem</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">19M+</div>
                      <div className="text-sm text-red-800">Discord servers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">$10B+</div>
                      <div className="text-sm text-red-800">Value created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">$0</div>
                      <div className="text-sm text-red-800">Value captured by communities</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="card p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Creators Suffer</h4>
                    <p className="text-gray-600 text-sm">
                      Pay for everything, burn out, quit. 70% abandon within year one.
                    </p>
                  </div>
                  <div className="card p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Members Get Nothing</h4>
                    <p className="text-gray-600 text-sm">
                      Build value for free, own nothing. Years of contribution, nothing to show.
                    </p>
                  </div>
                  <div className="card p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Communities Can't Coordinate</h4>
                    <p className="text-gray-600 text-sm">
                      Fragmented tools, no shared treasury. Potential unrealized, value extracted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution: builda.club</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Core Concept: BUIDL Your Community's Future</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Model</h4>
                      <p className="text-green-700">Internet country clubs owned by members</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Why It Works</h4>
                      <p className="text-green-700">We're BUIDLers, not traders</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="card p-6 text-center">
                    <div className="text-2xl mb-2">🏗️</div>
                    <h4 className="font-semibold mb-2">Build</h4>
                    <p className="text-gray-600 text-sm">Create your club in minutes</p>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <h4 className="font-semibold mb-2">Pool</h4>
                    <p className="text-gray-600 text-sm">Combine resources for shared tools</p>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-2xl mb-2">👑</div>
                    <h4 className="font-semibold mb-2">Own</h4>
                    <p className="text-gray-600 text-sm">Members get real equity</p>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-2">Earn</h4>
                    <p className="text-gray-600 text-sm">Contribute value, earn $BUIDL</p>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-2xl mb-2">🗳️</div>
                    <h4 className="font-semibold mb-2">Govern</h4>
                    <p className="text-gray-600 text-sm">Vote on treasury decisions</p>
                  </div>
                  <div className="card p-6 text-center">
                    <div className="text-2xl mb-2">📈</div>
                    <h4 className="font-semibold mb-2">Grow</h4>
                    <p className="text-gray-600 text-sm">BUIDL together, prosper together</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Architecture</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">🔐 Authentication & Wallets</h3>
                    <p className="text-gray-600 mb-2"><strong>Privy</strong> - Seamless Web2 + Web3 auth</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Phantom, Solflare, Backpack support</li>
                      <li>• Auto wallets for email users</li>
                      <li>• Google, Discord, Twitter login</li>
                      <li>• Progressive disclosure</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">💾 Database & Real-time</h3>
                    <p className="text-gray-600 mb-2"><strong>Supabase</strong> - PostgreSQL + real-time + storage</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Live treasury updates</li>
                      <li>• Community assets storage</li>
                      <li>• Row-level security</li>
                      <li>• Edge functions worldwide</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">⛓️ Blockchain Infrastructure</h3>
                    <p className="text-gray-600 mb-2"><strong>thirdweb + Solana</strong> - Pre-built contracts + fastest chain</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Modifiable templates</li>
                      <li>• Sponsored transactions</li>
                      <li>• TypeScript-first SDK</li>
                      <li>• RPC, IPFS included</li>
                    </ul>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">🚀 Deployment</h3>
                    <p className="text-gray-600 mb-2"><strong>Vercel</strong> - Created Next.js, deploys instantly</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Edge functions everywhere</li>
                      <li>• Every PR gets a URL</li>
                      <li>• Built-in monitoring</li>
                      <li>• 0 to millions automatically</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Token Economics</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">Community Club Tokens (Non-Tradeable)</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Why Non-Tradeable?</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Prevent speculation and pump & dumps</li>
                          <li>• Maintain focus on building value</li>
                          <li>• Align incentives for everyone</li>
                          <li>• Sustainable growth through real value</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Distribution</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Builders</span>
                            <span className="font-semibold">70%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Founders</span>
                            <span className="font-semibold">15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Early Builders</span>
                            <span className="font-semibold">10%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Treasury</span>
                            <span className="font-semibold">5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">$BUIDL Platform Token</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 1 billion fixed supply</li>
                          <li>• Tradeable (unlike club tokens)</li>
                          <li>• Cultural significance in crypto</li>
                          <li>• Building over speculation values</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Utility</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Burn 1000 $BUIDL to create club</li>
                          <li>• Stake for 2x earning multiplier</li>
                          <li>• Vote on platform evolution</li>
                          <li>• Access to premium features</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Roadmap</h2>
                
                <div className="space-y-6">
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">Phase 1: BUIDL Foundation (Weeks 1-2)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Week 1</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Setup Vercel + Privy + Supabase</li>
                          <li>• Database schema + auth flow</li>
                          <li>• Basic UI with Next.js + Tailwind</li>
                          <li>• Deploy to builda.club</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Week 2</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Builder profiles + dashboard</li>
                          <li>• Club creation wizard</li>
                          <li>• Member management system</li>
                          <li>• Testing and polish</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">Phase 2: MVP BUIDL (Weeks 3-6)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Weeks 3-4</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Treasury + payments integration</li>
                          <li>• Building features (chat, resources)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Weeks 5-6</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• thirdweb integration</li>
                          <li>• Beta launch preparation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold mb-4">Phase 3: $BUIDL Launch (Weeks 7-12)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Weeks 7-10</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• BUIDL token + bonding curves</li>
                          <li>• Full token mechanics</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Weeks 11-12</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• $BUIDL token public launch</li>
                          <li>• DEX liquidity pools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Metrics</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card p-6 text-center">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">Month 1</h3>
                    <div className="space-y-2 text-sm">
                      <div>10 clubs</div>
                      <div>500 builders</div>
                      <div>$100k treasury</div>
                      <div>80% WAU retention</div>
                    </div>
                  </div>
                  
                  <div className="card p-6 text-center">
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">Month 6</h3>
                    <div className="space-y-2 text-sm">
                      <div>1,000 clubs</div>
                      <div>50,000 builders</div>
                      <div>$10M treasury</div>
                      <div>$50k MRR</div>
                    </div>
                  </div>
                  
                  <div className="card p-6 text-center">
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Year 1</h3>
                    <div className="space-y-2 text-sm">
                      <div>10,000 clubs</div>
                      <div>500,000 builders</div>
                      <div>$250M treasury</div>
                      <div>$500k MRR</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">The Vision</h2>
                <p className="text-xl mb-6">
                  We're not just building another platform. We're building the future of how communities organize, create value, and share ownership.
                </p>
                <p className="text-lg mb-8">
                  The revolution isn't about trading tokens. It's about BUIDLing together.
                </p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">Welcome to the BUIDL movement.</p>
                  <p className="text-2xl font-bold">Welcome to <strong>builda.club</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


