'use client';

import { useState } from 'react';

interface PriceProposalProps {
  clubId: string;
  currentPrice: number;
  currentMembers: number;
  treasury: number;
  lastVoteDate: string;
  memberCanPropose: boolean;
}

interface Vote {
  option: 'FOR' | 'AGAINST';
  count: number;
  percentage: number;
}

const PriceProposal: React.FC<PriceProposalProps> = ({
  clubId,
  currentPrice,
  currentMembers,
  treasury,
  lastVoteDate,
  memberCanPropose
}) => {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalType, setProposalType] = useState<'INCREASE_PRICE' | 'DECREASE_PRICE' | 'KEEP_SAME' | 'DYNAMIC_ADJUST'>('KEEP_SAME');
  const [newPrice, setNewPrice] = useState(currentPrice);
  const [reasoning, setReasoning] = useState('');

  // Mock vote data - would come from database
  const votes: Vote[] = [
    { option: 'FOR', count: 34, percentage: 72 },
    { option: 'AGAINST', count: 13, percentage: 28 }
  ];

  const treasuryPerMember = treasury / currentMembers;
  const avgMonthlyEarnings = 1234; // Mock data
  const suggestedPrice = Math.round(treasuryPerMember * 0.3); // 30% of treasury per member

  const handleSubmitProposal = () => {
    // Submit proposal logic
    console.log('Submitting proposal:', { proposalType, newPrice, reasoning });
    setShowProposalForm(false);
  };

  const canVote = true; // Mock - would check if user has voted
  const timeRemaining = "4 days 13 hours"; // Mock
  const quorumMet = true; // Mock

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        🗳️ Proposal: Adjust Entry Price
      </h2>

      {/* Current State */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Current Price</div>
          <div className="text-xl font-semibold">${currentPrice}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Current Members</div>
          <div className="text-xl font-semibold">{currentMembers}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Treasury</div>
          <div className="text-xl font-semibold">${treasury.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Last 30 days joined</div>
          <div className="text-xl font-semibold">12 members</div>
        </div>
      </div>

      {/* Proposal Details */}
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Proposed by: Sarah.eth</h3>
        <div className="flex items-center gap-2 mb-4">
          <span>Change entry price from</span>
          <span className="line-through text-gray-500">${currentPrice}</span>
          <span>to</span>
          <span className="font-bold text-green-600">${newPrice}</span>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Reasoning:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Treasury has grown 3x in last month</li>
            <li>We shipped 4 major features</li>
            <li>New members getting $2000+ value immediately</li>
            <li>Higher price = more committed builders</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Counter-perspective:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Higher barrier might slow growth</li>
            <li>Some talented builders can't afford ${newPrice}</li>
          </ul>
        </div>
      </div>

      {/* Voting Section */}
      <div className="space-y-4">
        <div className="flex gap-4">
          {votes.map((vote) => (
            <button
              key={vote.option}
              className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                vote.option === 'FOR'
                  ? 'border-green-500 bg-green-50 hover:bg-green-100'
                  : 'border-red-500 bg-red-50 hover:bg-red-100'
              }`}
            >
              <div className="font-semibold text-lg">
                {vote.option === 'FOR' ? '✅ FOR' : '❌ AGAINST'}
              </div>
              <div className="text-2xl font-bold">{vote.count}</div>
              <div className="text-sm">{vote.percentage}%</div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span>⏰ Timer: {timeRemaining}</span>
            <span className={`flex items-center gap-1 ${quorumMet ? 'text-green-600' : 'text-red-600'}`}>
              📊 Quorum: {47} / {34} {quorumMet ? '✅' : '❌'}
            </span>
          </div>
          {canVote && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Cast Vote
            </button>
          )}
        </div>
      </div>

      {/* Propose New Price Button */}
      {memberCanPropose && (
        <div className="mt-8 pt-6 border-t">
          <button
            onClick={() => setShowProposalForm(true)}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors"
          >
            💡 Propose Price Change
          </button>
        </div>
      )}

      {/* Proposal Form Modal */}
      {showProposalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Propose Price Change</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Proposal Type</label>
                <select
                  value={proposalType}
                  onChange={(e) => setProposalType(e.target.value as any)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="INCREASE_PRICE">Increase Price</option>
                  <option value="DECREASE_PRICE">Decrease Price</option>
                  <option value="KEEP_SAME">Keep Same</option>
                  <option value="DYNAMIC_ADJUST">Dynamic Adjust</option>
                </select>
              </div>

              {(proposalType === 'INCREASE_PRICE' || proposalType === 'DECREASE_PRICE') && (
                <div>
                  <label className="block text-sm font-medium mb-2">New Price ($)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                    min="10"
                    max={currentPrice * 2}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Suggested: ${suggestedPrice} (based on treasury per member)
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Reasoning</label>
                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  className="w-full p-2 border rounded-lg h-24"
                  placeholder="Explain why this price change is beneficial for the community..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmitProposal}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Submit Proposal
                </button>
                <button
                  onClick={() => setShowProposalForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceProposal;
