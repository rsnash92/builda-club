'use client';

import { useState, useEffect } from 'react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'PRICE_CHANGE' | 'TREASURY_ALLOCATION' | 'FEATURE_REQUEST' | 'RULE_CHANGE';
  status: 'ACTIVE' | 'PASSED' | 'FAILED' | 'EXECUTED';
  proposer: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: string;
  quorum: number;
  threshold: number;
}

interface GovernanceSystemProps {
  clubId: string;
  memberAddress: string;
  memberTokens: number;
  canPropose: boolean;
}

const GovernanceSystem: React.FC<GovernanceSystemProps> = ({
  clubId,
  memberAddress,
  memberTokens,
  canPropose
}) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'create'>('active');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock proposals data
  useEffect(() => {
    const mockProposals: Proposal[] = [
      {
        id: '1',
        title: 'Increase Entry Price to $750',
        description: 'Treasury has grown significantly and we need more committed builders. Higher price will ensure quality members.',
        type: 'PRICE_CHANGE',
        status: 'ACTIVE',
        proposer: '0x1234...5678',
        votesFor: 34,
        votesAgainst: 13,
        totalVotes: 47,
        endDate: '2024-02-15T23:59:59Z',
        quorum: 51,
        threshold: 66
      },
      {
        id: '2',
        title: 'Allocate 20% of Treasury for Developer Tools',
        description: 'We need better development infrastructure to attract more builders and improve productivity.',
        type: 'TREASURY_ALLOCATION',
        status: 'PASSED',
        proposer: '0x9876...5432',
        votesFor: 42,
        votesAgainst: 8,
        totalVotes: 50,
        endDate: '2024-01-30T23:59:59Z',
        quorum: 51,
        threshold: 66
      },
      {
        id: '3',
        title: 'Add Discord Integration',
        description: 'Integrate Discord bot for seamless community management and notifications.',
        type: 'FEATURE_REQUEST',
        status: 'EXECUTED',
        proposer: '0x4567...8901',
        votesFor: 38,
        votesAgainst: 5,
        totalVotes: 43,
        endDate: '2024-01-15T23:59:59Z',
        quorum: 51,
        threshold: 66
      }
    ];
    setProposals(mockProposals);
  }, []);

  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    type: 'PRICE_CHANGE' as Proposal['type']
  });

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'ACTIVE': return 'bg-blue-100 text-blue-800';
      case 'PASSED': return 'bg-green-100 text-green-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'EXECUTED': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Proposal['type']) => {
    switch (type) {
      case 'PRICE_CHANGE': return '💰';
      case 'TREASURY_ALLOCATION': return '🏦';
      case 'FEATURE_REQUEST': return '🚀';
      case 'RULE_CHANGE': return '📋';
      default: return '📄';
    }
  };

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h`;
  };

  const handleCreateProposal = () => {
    // Create proposal logic
    console.log('Creating proposal:', newProposal);
    setShowCreateForm(false);
    setNewProposal({ title: '', description: '', type: 'PRICE_CHANGE' });
  };

  const handleVote = (proposalId: string, support: boolean) => {
    // Vote logic
    console.log('Voting on proposal:', proposalId, support);
  };

  const activeProposals = proposals.filter(p => p.status === 'ACTIVE');
  const historicalProposals = proposals.filter(p => p.status !== 'ACTIVE');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🗳️ Governance System</h1>
        {canPropose && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            💡 Create Proposal
          </button>
        )}
      </div>

      {/* Member Info */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm opacity-90">Your Voting Power</div>
            <div className="text-2xl font-bold">{memberTokens.toLocaleString()}</div>
            <div className="text-sm opacity-75">Club tokens</div>
          </div>
          <div>
            <div className="text-sm opacity-90">Active Proposals</div>
            <div className="text-2xl font-bold">{activeProposals.length}</div>
            <div className="text-sm opacity-75">Awaiting your vote</div>
          </div>
          <div>
            <div className="text-sm opacity-90">Proposal Rights</div>
            <div className="text-2xl font-bold">{canPropose ? '✅' : '❌'}</div>
            <div className="text-sm opacity-75">
              {canPropose ? 'Can propose' : 'Need 30+ days'}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'active', label: 'Active Proposals', count: activeProposals.length },
          { id: 'history', label: 'History', count: historicalProposals.length },
          { id: 'create', label: 'Create Proposal', count: 0 }
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
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Active Proposals */}
      {activeTab === 'active' && (
        <div className="space-y-6">
          {activeProposals.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🗳️</div>
              <div className="text-xl">No active proposals</div>
              <div className="text-sm">Check back later or create one yourself!</div>
            </div>
          ) : (
            activeProposals.map((proposal) => (
              <div key={proposal.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(proposal.type)}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{proposal.title}</h3>
                      <p className="text-gray-600 text-sm">Proposed by {proposal.proposer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{proposal.description}</p>

                {/* Voting Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Voting Progress</span>
                    <span className="text-sm text-gray-600">{proposal.totalVotes} votes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-4">
                      <span className="text-sm text-green-600">✅ {proposal.votesFor} FOR</span>
                      <span className="text-sm text-red-600">❌ {proposal.votesAgainst} AGAINST</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.round((proposal.votesFor / proposal.totalVotes) * 100)}% support
                    </span>
                  </div>
                </div>

                {/* Vote Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>⏰ {formatTimeRemaining(proposal.endDate)}</span>
                    <span>📊 Quorum: {proposal.quorum}%</span>
                    <span>🎯 Threshold: {proposal.threshold}%</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(proposal.id, true)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Vote FOR
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, false)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Vote AGAINST
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {historicalProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(proposal.type)}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{proposal.title}</h3>
                    <p className="text-gray-600 text-sm">Proposed by {proposal.proposer}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                  {proposal.status}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{proposal.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Final Result: {proposal.votesFor} FOR, {proposal.votesAgainst} AGAINST</span>
                <span>Ended: {new Date(proposal.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Proposal Form */}
      {activeTab === 'create' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Create New Proposal</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Proposal Type</label>
              <select
                value={newProposal.type}
                onChange={(e) => setNewProposal({...newProposal, type: e.target.value as Proposal['type']})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PRICE_CHANGE">💰 Price Change</option>
                <option value="TREASURY_ALLOCATION">🏦 Treasury Allocation</option>
                <option value="FEATURE_REQUEST">🚀 Feature Request</option>
                <option value="RULE_CHANGE">📋 Rule Change</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newProposal.title}
                onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief, clear title for your proposal..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newProposal.description}
                onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed explanation of your proposal, including reasoning and expected outcomes..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCreateProposal}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit Proposal
              </button>
              <button
                onClick={() => setNewProposal({ title: '', description: '', type: 'PRICE_CHANGE' })}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create New Proposal</h3>
            {/* Form content would be the same as the create tab */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCreateProposal}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceSystem;
