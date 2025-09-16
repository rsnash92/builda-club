'use client';

import { useState } from 'react';

interface EarnProposal {
  id: string;
  member: string;
  activity: string;
  description: string;
  requestedTokens: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  votes: Vote[];
  createdAt: string;
}

interface Vote {
  member: string;
  verdict: 'APPROVE' | 'REJECT';
  comment: string;
  timestamp: string;
}

interface MintingGovernanceProps {
  clubId: string;
  memberAddress: string;
  isApprovedMinter: boolean;
  canVote: boolean;
}

const MintingGovernance: React.FC<MintingGovernanceProps> = ({
  clubId,
  memberAddress,
  isApprovedMinter,
  canVote
}) => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'create' | 'stats'>('proposals');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock proposals data
  const proposals: EarnProposal[] = [
    {
      id: '1',
      member: '0x1234...5678',
      activity: 'Ship new feature',
      description: 'Built and deployed the new user dashboard with real-time analytics',
      requestedTokens: 75,
      status: 'PENDING',
      votes: [
        { member: '0x9876...5432', verdict: 'APPROVE', comment: 'Great work, much needed feature', timestamp: '2024-04-15T10:30:00Z' },
        { member: '0x4567...8901', verdict: 'APPROVE', comment: 'Clean implementation', timestamp: '2024-04-15T11:15:00Z' }
      ],
      createdAt: '2024-04-15T09:00:00Z'
    },
    {
      id: '2',
      member: '0xabcd...efgh',
      activity: 'Write documentation',
      description: 'Created comprehensive API documentation with examples',
      requestedTokens: 30,
      status: 'APPROVED',
      votes: [
        { member: '0x9876...5432', verdict: 'APPROVE', comment: 'Very helpful docs', timestamp: '2024-04-14T14:20:00Z' },
        { member: '0x4567...8901', verdict: 'APPROVE', comment: 'Well written', timestamp: '2024-04-14T15:10:00Z' },
        { member: '0x1234...5678', verdict: 'APPROVE', comment: 'Great examples', timestamp: '2024-04-14T16:00:00Z' }
      ],
      createdAt: '2024-04-14T13:30:00Z'
    },
    {
      id: '3',
      member: '0x5678...9abc',
      activity: 'Bug fix',
      description: 'Fixed critical security vulnerability in authentication system',
      requestedTokens: 100,
      status: 'APPROVED',
      votes: [
        { member: '0x9876...5432', verdict: 'APPROVE', comment: 'Critical fix, well done', timestamp: '2024-04-13T12:45:00Z' },
        { member: '0x4567...8901', verdict: 'APPROVE', comment: 'Important security fix', timestamp: '2024-04-13T13:20:00Z' },
        { member: '0x1234...5678', verdict: 'APPROVE', comment: 'Excellent work', timestamp: '2024-04-13T14:00:00Z' }
      ],
      createdAt: '2024-04-13T11:30:00Z'
    }
  ];

  const [newProposal, setNewProposal] = useState({
    activity: '',
    description: '',
    requestedTokens: 0
  });

  const handleVote = (proposalId: string, verdict: 'APPROVE' | 'REJECT', comment: string) => {
    // Vote logic would go here
    console.log('Voting on proposal:', proposalId, verdict, comment);
  };

  const handleCreateProposal = () => {
    // Create proposal logic
    console.log('Creating proposal:', newProposal);
    setShowCreateForm(false);
    setNewProposal({ activity: '', description: '', requestedTokens: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    return verdict === 'APPROVE' ? '✅' : '❌';
  };

  const getVerdictColor = (verdict: string) => {
    return verdict === 'APPROVE' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">🔨 Token Minting Governance</h1>
          <p className="text-gray-600 mt-2">Manage earned token proposals and approvals</p>
        </div>
        {isApprovedMinter && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            💡 Create Proposal
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'proposals', label: 'Active Proposals', icon: '📋' },
          { id: 'create', label: 'Create Proposal', icon: '➕' },
          { id: 'stats', label: 'Statistics', icon: '📊' }
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

      {/* Proposals Tab */}
      {activeTab === 'proposals' && (
        <div className="space-y-6">
          {proposals.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📋</div>
              <div className="text-xl">No Active Proposals</div>
              <div className="text-sm">Create a proposal to earn tokens for your contributions</div>
            </div>
          ) : (
            proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{proposal.activity}</h3>
                      <p className="text-gray-600">by {proposal.member}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      +{proposal.requestedTokens} tokens
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{proposal.description}</p>

                {/* Voting Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Voting Progress</span>
                    <span className="text-sm text-gray-600">
                      {proposal.votes.filter(v => v.verdict === 'APPROVE').length}/{proposal.votes.length} approvals
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ 
                        width: `${(proposal.votes.filter(v => v.verdict === 'APPROVE').length / Math.max(proposal.votes.length, 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Votes */}
                {proposal.votes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Votes ({proposal.votes.length}/3 required)</h4>
                    <div className="space-y-2">
                      {proposal.votes.map((vote, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className={`text-lg ${getVerdictColor(vote.verdict)}`}>
                            {getVerdictIcon(vote.verdict)}
                          </span>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{vote.member}</span>
                              <span className="text-sm text-gray-500">
                                {new Date(vote.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{vote.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vote Actions */}
                {canVote && proposal.status === 'PENDING' && proposal.votes.length < 3 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(proposal.id, 'APPROVE', 'Good work!')}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleVote(proposal.id, 'REJECT', 'Needs improvement')}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-500">
                  Created: {new Date(proposal.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Proposal Tab */}
      {activeTab === 'create' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Create Token Earning Proposal</h3>
          
          {!isApprovedMinter ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔒</div>
              <div className="text-xl">Approved Minter Required</div>
              <div className="text-sm">Only approved minters can create token earning proposals</div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📋 Earning Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Max 100 tokens per day</li>
                  <li>• Max 2,000 tokens per month</li>
                  <li>• Work tokens capped at 20% of total capital tokens</li>
                  <li>• Requires 3 member approvals for verification</li>
                  <li>• Must create genuine value for the community</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Activity Type</label>
                  <select
                    value={newProposal.activity}
                    onChange={(e) => setNewProposal({...newProposal, activity: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select activity...</option>
                    <option value="Ship new feature">Ship new feature (50-100 tokens)</option>
                    <option value="Write documentation">Write documentation (20-40 tokens)</option>
                    <option value="Bug fix">Bug fix (25-75 tokens)</option>
                    <option value="Code review">Code review (10-30 tokens)</option>
                    <option value="Onboard member">Onboard member (30-50 tokens)</option>
                    <option value="Design work">Design work (40-80 tokens)</option>
                    <option value="Research">Research (20-50 tokens)</option>
                    <option value="Other">Other (specify amount)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Requested Tokens</label>
                  <input
                    type="number"
                    value={newProposal.requestedTokens}
                    onChange={(e) => setNewProposal({...newProposal, requestedTokens: Number(e.target.value)})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="100"
                    placeholder="Enter amount..."
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Daily limit: 100 tokens
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what you accomplished and how it benefits the community..."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCreateProposal}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Submit Proposal
                </button>
                <button
                  onClick={() => setNewProposal({ activity: '', description: '', requestedTokens: 0 })}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset Form
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-blue-600">247</div>
              <div className="text-sm text-gray-600">Total Proposals</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-purple-600">12,450</div>
              <div className="text-sm text-gray-600">Tokens Earned</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-orange-600">67</div>
              <div className="text-sm text-gray-600">Active Contributors</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">📈 Earning Activity by Type</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Ship new feature</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Bug fixes</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Documentation</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Other activities</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create Token Earning Proposal</h3>
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

export default MintingGovernance;
