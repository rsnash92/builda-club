// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title FairTokenContract
 * @dev Implements fixed 1:1 token pricing with fair minting rules
 * @notice Prevents early whale problems by ensuring same price for everyone
 */
contract FairTokenContract {
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    
    // Core state variables
    uint256 public totalSupply;
    uint256 public treasury;
    uint256 public workTokensMinted;
    uint256 public constant WORK_TOKEN_CAP_PERCENT = 20; // Max 20% of total can be work tokens
    
    // Member balances and tracking
    mapping(address => uint256) public balances;
    mapping(address => uint256) public capitalTokens;
    mapping(address => uint256) public workTokens;
    mapping(address => uint256) public lastEarnTime;
    
    // Governance and access control
    address public governance;
    mapping(address => bool) public isApprovedMinter;
    
    // Events
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event TokensEarned(address indexed earner, uint256 amount, string reason);
    event MemberExited(address indexed member, uint256 tokenAmount, uint256 payout);
    event TreasuryUpdated(uint256 newTreasury);
    event GovernanceUpdated(address newGovernance);
    
    // Modifiers
    modifier onlyGovernance() {
        require(msg.sender == governance, "Only governance can call this");
        _;
    }
    
    modifier onlyApprovedMinter() {
        require(isApprovedMinter[msg.sender], "Only approved minters can call this");
        _;
    }
    
    constructor(
        string memory _name,
        string memory _symbol,
        address _governance
    ) {
        name = _name;
        symbol = _symbol;
        governance = _governance;
    }
    
    /**
     * @dev Buy tokens - always 1 USDC = 1 Token
     * @notice Fair pricing: same rate for everyone, forever
     */
    function buyTokens() external payable {
        require(msg.value > 0, "Must send USDC to buy tokens");
        
        uint256 tokens = msg.value; // 1:1 ratio always
        
        balances[msg.sender] += tokens;
        capitalTokens[msg.sender] += tokens;
        totalSupply += tokens;
        treasury += msg.value;
        
        emit TokensPurchased(msg.sender, tokens, msg.value);
    }
    
    /**
     * @dev Earn tokens through building - capped and controlled
     * @param member Address of member earning tokens
     * @param amount Amount of tokens to mint
     * @param reason Description of why tokens are earned
     */
    function earnTokens(
        address member, 
        uint256 amount, 
        string calldata reason
    ) external onlyApprovedMinter {
        require(amount > 0, "Amount must be positive");
        require(amount <= 100, "Exceeds daily earn limit");
        
        // Enforce daily cap
        require(block.timestamp > lastEarnTime[member] + 1 days, "Daily limit reached");
        
        // Enforce total work token cap
        uint256 capitalTokensTotal = totalSupply - workTokensMinted;
        uint256 maxWorkTokens = (capitalTokensTotal * WORK_TOKEN_CAP_PERCENT) / 100;
        require(workTokensMinted + amount <= maxWorkTokens, "Work token cap reached");
        
        balances[member] += amount;
        workTokens[member] += amount;
        totalSupply += amount;
        workTokensMinted += amount;
        lastEarnTime[member] = block.timestamp;
        
        emit TokensEarned(member, amount, reason);
    }
    
    /**
     * @dev Exit club - burn tokens for treasury share
     * @param tokenAmount Amount of tokens to burn
     */
    function exitClub(uint256 tokenAmount) external {
        require(balances[msg.sender] >= tokenAmount, "Insufficient balance");
        require(tokenAmount > 0, "Amount must be positive");
        
        // Calculate treasury share
        uint256 treasuryShare = (tokenAmount * treasury) / totalSupply;
        
        // Apply 10% exit fee
        uint256 exitFee = (treasuryShare * 10) / 100;
        uint256 payout = treasuryShare - exitFee;
        
        // Update balances
        balances[msg.sender] -= tokenAmount;
        
        // Update token tracking
        if (tokenAmount <= workTokens[msg.sender]) {
            workTokens[msg.sender] -= tokenAmount;
        } else {
            uint256 remainingWork = workTokens[msg.sender];
            workTokens[msg.sender] = 0;
            capitalTokens[msg.sender] -= (tokenAmount - remainingWork);
        }
        
        totalSupply -= tokenAmount;
        treasury -= payout;
        
        // Transfer payout
        payable(msg.sender).transfer(payout);
        
        emit MemberExited(msg.sender, tokenAmount, payout);
    }
    
    /**
     * @dev View current token value (treasury / total supply)
     * @return Current value of 1 token in USDC
     */
    function tokenValue() public view returns (uint256) {
        if (totalSupply == 0) return 1e18; // 1:1 before any mints
        return (treasury * 1e18) / totalSupply;
    }
    
    /**
     * @dev Calculate member's share of treasury
     * @param member Member address
     * @return Member's current treasury share value
     */
    function memberShareValue(address member) external view returns (uint256) {
        if (totalSupply == 0) return 0;
        return (balances[member] * treasury) / totalSupply;
    }
    
    /**
     * @dev Get member's ownership percentage
     * @param member Member address
     * @return Ownership percentage (in basis points, 10000 = 100%)
     */
    function memberOwnershipPercentage(address member) external view returns (uint256) {
        if (totalSupply == 0) return 0;
        return (balances[member] * 10000) / totalSupply;
    }
    
    /**
     * @dev Update treasury (for external revenue, investments, etc.)
     * @param additionalAmount Amount to add to treasury
     * @param reason Reason for treasury update
     */
    function updateTreasury(uint256 additionalAmount, string calldata reason) external onlyGovernance {
        treasury += additionalAmount;
        emit TreasuryUpdated(treasury);
    }
    
    /**
     * @dev Set approved minter (for earning tokens)
     * @param minter Address to approve/disapprove
     * @param approved Whether to approve or not
     */
    function setApprovedMinter(address minter, bool approved) external onlyGovernance {
        isApprovedMinter[minter] = approved;
    }
    
    /**
     * @dev Transfer governance to new address
     * @param newGovernance New governance address
     */
    function transferGovernance(address newGovernance) external onlyGovernance {
        require(newGovernance != address(0), "New governance cannot be zero address");
        governance = newGovernance;
        emit GovernanceUpdated(newGovernance);
    }
    
    /**
     * @dev Get comprehensive member info
     * @param member Member address
     * @return capital Capital tokens owned
     * @return work Work tokens owned
     * @return total Total tokens owned
     * @return shareValue Current treasury share value
     * @return ownershipPercent Ownership percentage (basis points)
     */
    function getMemberInfo(address member) external view returns (
        uint256 capital,
        uint256 work,
        uint256 total,
        uint256 shareValue,
        uint256 ownershipPercent
    ) {
        capital = capitalTokens[member];
        work = workTokens[member];
        total = balances[member];
        shareValue = total > 0 ? (total * treasury) / totalSupply : 0;
        ownershipPercent = total > 0 ? (total * 10000) / totalSupply : 0;
    }
    
    /**
     * @dev Get club statistics
     * @return _totalSupply Total tokens in circulation
     * @return _treasury Current treasury amount
     * @return _workTokensMinted Total work tokens minted
     * @return _tokenValue Current token value
     * @return _workTokenCap Maximum work tokens allowed
     */
    function getClubStats() external view returns (
        uint256 _totalSupply,
        uint256 _treasury,
        uint256 _workTokensMinted,
        uint256 _tokenValue,
        uint256 _workTokenCap
    ) {
        _totalSupply = totalSupply;
        _treasury = treasury;
        _workTokensMinted = workTokensMinted;
        _tokenValue = tokenValue();
        
        uint256 capitalTokensTotal = totalSupply - workTokensMinted;
        _workTokenCap = (capitalTokensTotal * WORK_TOKEN_CAP_PERCENT) / 100;
    }
    
    /**
     * @dev Emergency pause function (only governance)
     */
    function emergencyPause() external onlyGovernance {
        // Implementation would depend on using OpenZeppelin's Pausable
        // This is a placeholder for emergency functionality
    }
}
