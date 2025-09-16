'use client';

import { useState } from 'react';

interface VaultResource {
  id: string;
  name: string;
  type: 'CREATED_CONTENT' | 'EDUCATIONAL' | 'INFRASTRUCTURE' | 'DIGITAL_ASSET';
  category: string;
  creator: string;
  value: string;
  accessLevel: 'ALL' | 'BUILDER' | 'PRO' | 'ELITE';
  uploadDate: string;
  downloadCount: number;
  upvotes: number;
  description: string;
  ipfsHash?: string;
}

interface ClubVaultProps {
  clubId: string;
  memberTier: 'OBSERVER' | 'BUILDER' | 'PRO' | 'ELITE';
  memberAddress: string;
  isAdmin?: boolean;
}

const ClubVault: React.FC<ClubVaultProps> = ({
  clubId,
  memberTier,
  memberAddress,
  isAdmin = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'infrastructure' | 'assets' | 'upload'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock vault data - focusing on legally safe content
  const vaultResources: VaultResource[] = [
    {
      id: '1',
      name: '2024 DeFi Strategy Framework',
      type: 'CREATED_CONTENT',
      category: 'Trading Strategies',
      creator: 'Sarah.eth',
      value: '$15,000 development cost',
      accessLevel: 'PRO',
      uploadDate: '2024-01-15',
      downloadCount: 234,
      upvotes: 47,
      description: 'Comprehensive framework for DeFi yield farming strategies, backtested over 2 years of data. Created collaboratively by 12 club members.',
      ipfsHash: 'QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx'
    },
    {
      id: '2',
      name: 'Solana Trading Bot v3.1',
      type: 'CREATED_CONTENT',
      category: 'Trading Tools',
      creator: 'Mike.eth',
      value: '$25,000 development cost',
      accessLevel: 'BUILDER',
      uploadDate: '2024-01-20',
      downloadCount: 189,
      upvotes: 52,
      description: 'Advanced trading bot with ML integration, built specifically for Solana DEXs. Includes backtesting suite and risk management.',
      ipfsHash: 'QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy'
    },
    {
      id: '3',
      name: 'Web3 Development Course',
      type: 'EDUCATIONAL',
      category: 'Education',
      creator: 'Alex.eth',
      value: '$5,000 course value',
      accessLevel: 'BUILDER',
      uploadDate: '2024-01-10',
      downloadCount: 456,
      upvotes: 89,
      description: 'Complete 40-hour course on Web3 development, from basics to advanced smart contract deployment. Includes hands-on projects.',
      ipfsHash: 'QmZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZzZz'
    },
    {
      id: '4',
      name: 'Club Brand Asset Kit',
      type: 'CREATED_CONTENT',
      category: 'Design Assets',
      creator: 'Emma.eth',
      value: '$8,000 design cost',
      accessLevel: 'ALL',
      uploadDate: '2024-01-25',
      downloadCount: 123,
      upvotes: 34,
      description: 'Complete brand kit including logos, color palettes, typography, and design templates. Created by professional designers in the club.',
      ipfsHash: 'QmAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa'
    }
  ];

  const vaultStats = {
    totalResources: 247,
    totalValue: '$127,000',
    monthlyDownloads: 2847,
    activeContributors: 34,
    categories: {
      'Trading Strategies': 45,
      'Trading Tools': 23,
      'Education': 89,
      'Design Assets': 34,
      'Code Libraries': 56
    }
  };

  const getAccessIcon = (level: string) => {
    switch (level) {
      case 'ALL': return '🟢';
      case 'BUILDER': return '🔵';
      case 'PRO': return '🟡';
      case 'ELITE': return '🟣';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'CREATED_CONTENT': return '✨';
      case 'EDUCATIONAL': return '📚';
      case 'INFRASTRUCTURE': return '🔧';
      case 'DIGITAL_ASSET': return '💎';
      default: return '📄';
    }
  };

  const canAccess = (resource: VaultResource) => {
    const tierLevels = { 'OBSERVER': 0, 'BUILDER': 1, 'PRO': 2, 'ELITE': 3 };
    const resourceLevels = { 'ALL': 0, 'BUILDER': 1, 'PRO': 2, 'ELITE': 3 };
    return tierLevels[memberTier] >= resourceLevels[resource.accessLevel];
  };

  const filteredResources = selectedCategory === 'all' 
    ? vaultResources 
    : vaultResources.filter(r => r.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">🏦 Club Treasury & Resources</h1>
          <p className="text-gray-600 mt-2">Build valuable IP together - everything club-created is club-owned</p>
        </div>
        {memberTier === 'ELITE' && (
          <button
            onClick={() => setActiveTab('upload')}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            📤 Upload Resource
          </button>
        )}
      </div>

      {/* Vault Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">Total Resources</div>
          <div className="text-3xl font-bold">{vaultStats.totalResources}</div>
          <div className="text-sm opacity-75 mt-1">Club-created content</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">Total Value Created</div>
          <div className="text-3xl font-bold">{vaultStats.totalValue}</div>
          <div className="text-sm opacity-75 mt-1">IP development cost</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">Monthly Downloads</div>
          <div className="text-3xl font-bold">{vaultStats.monthlyDownloads.toLocaleString()}</div>
          <div className="text-sm opacity-75 mt-1">Resource usage</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="text-sm opacity-90">Contributors</div>
          <div className="text-3xl font-bold">{vaultStats.activeContributors}</div>
          <div className="text-sm opacity-75 mt-1">Active creators</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'content', label: 'Created Content', icon: '✨' },
          { id: 'infrastructure', label: 'Infrastructure', icon: '🔧' },
          { id: 'assets', label: 'Digital Assets', icon: '💎' },
          { id: 'upload', label: 'Upload', icon: '📤' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold mb-4">💡 Why Club Vaults Are Game-Changing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🏗️ Build IP Together</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Develop proprietary strategies and tools</li>
                  <li>• Create educational content collaboratively</li>
                  <li>• Build code libraries and templates</li>
                  <li>• Everything club-created is club-owned</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">💰 Massive Value Creation</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Average club creates $50k+ IP value/year</li>
                  <li>• Members save 100s of hours of development</li>
                  <li>• Access professional-grade resources</li>
                  <li>• Build competitive advantages together</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📂 Resource Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(vaultStats.categories).map(([category, count]) => (
                <div key={category} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category}</span>
                    <span className="text-2xl font-bold text-blue-600">{count}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Club-created resources</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Additions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🆕 Recently Added</h3>
            <div className="space-y-3">
              {vaultResources.slice(0, 3).map((resource) => (
                <div key={resource.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                  <div className="flex-1">
                    <div className="font-medium">{resource.name}</div>
                    <div className="text-sm text-gray-600">by {resource.creator} • {resource.value}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{resource.upvotes} upvotes</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      canAccess(resource) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {getAccessIcon(resource.accessLevel)} {resource.accessLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Categories
            </button>
            {Object.keys(vaultStats.categories).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                    <div>
                      <h3 className="font-semibold">{resource.name}</h3>
                      <p className="text-sm text-gray-600">by {resource.creator}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    canAccess(resource) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {getAccessIcon(resource.accessLevel)} {resource.accessLevel}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-4">{resource.description}</p>

                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span>💰 {resource.value}</span>
                  <span>📥 {resource.downloadCount} downloads</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">👍 {resource.upvotes}</span>
                    <span className="text-sm text-gray-500">• {resource.category}</span>
                  </div>
                  {canAccess(resource) ? (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      Download
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                    >
                      Upgrade to Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Infrastructure Tab */}
      {activeTab === 'infrastructure' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">🔧 Shared Infrastructure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ GitHub Organization</h4>
                <p className="text-sm text-green-700">Team license for 25 developers</p>
                <p className="text-sm text-green-600 mt-1">Proper team plan - fully legal</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ Vercel Team Account</h4>
                <p className="text-sm text-green-700">500GB bandwidth pooled</p>
                <p className="text-sm text-green-600 mt-1">Team deployment infrastructure</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ OpenAI API Credits</h4>
                <p className="text-sm text-green-700">$2,000 monthly quota shared</p>
                <p className="text-sm text-green-600 mt-1">Rate-limited by member tier</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">✅ AWS Credits</h4>
                <p className="text-sm text-green-700">$10,000 annual credit pool</p>
                <p className="text-sm text-green-600 mt-1">Shared cloud infrastructure</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Infrastructure Guidelines</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• All shared resources use legitimate team plans</li>
              <li>• Usage is tracked and rate-limited by member tier</li>
              <li>• Members are responsible for their individual usage</li>
              <li>• Platform provides treasury management, not license sharing</li>
            </ul>
          </div>
        </div>
      )}

      {/* Digital Assets Tab */}
      {activeTab === 'assets' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">💎 Digital Asset Treasury</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🎫 Developer DAO Pass</h4>
                <p className="text-sm text-purple-700">Access to developer community</p>
                <p className="text-sm text-purple-600 mt-1">Floor: 2.5 ETH • Rotating monthly</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🌐 buildaclub.eth</h4>
                <p className="text-sm text-purple-700">ENS domain for club identity</p>
                <p className="text-sm text-purple-600 mt-1">Expires 2027 • Treasury owned</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">📚 Course NFT Passes</h4>
                <p className="text-sm text-purple-700">Access to premium courses</p>
                <p className="text-sm text-purple-600 mt-1">Value: $5,000 • Shared access</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">🎨 Exclusive Artwork</h4>
                <p className="text-sm text-purple-700">Club-commissioned digital art</p>
                <p className="text-sm text-purple-600 mt-1">Co-owned by treasury</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">📤 Upload New Resource</h3>
          {memberTier !== 'ELITE' ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔒</div>
              <div className="text-xl">Elite Member Required</div>
              <div className="text-sm">Only Elite members can upload resources to the vault</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Upload Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Only original content created by club members</li>
                  <li>• Educational materials must be legally obtained</li>
                  <li>• All resources will be stored on IPFS</li>
                  <li>• Contributors earn $BUIDL rewards for valuable uploads</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Resource Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Advanced Trading Strategy 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Trading Strategies</option>
                    <option>Trading Tools</option>
                    <option>Education</option>
                    <option>Design Assets</option>
                    <option>Code Libraries</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the resource, its value, and how it was created..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Access Level</label>
                  <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>ALL</option>
                    <option>BUILDER</option>
                    <option>PRO</option>
                    <option>ELITE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Value</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $5,000 development cost"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Upload File</label>
                  <input
                    type="file"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Upload to Vault
                </button>
                <button className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                  Save as Draft
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubVault;
