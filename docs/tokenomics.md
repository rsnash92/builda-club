# Token Economics

## Overview

builda.club uses a dual-token system designed to align incentives around building value rather than speculation. The system consists of:

1. **Community Club Tokens** (Non-tradeable) - Represent ownership in specific clubs
2. **$BUIDL Platform Token** (Tradeable) - Platform-wide utility and rewards token

## Community Club Tokens

### Design Philosophy

Club tokens are **non-tradeable** by design. This prevents speculation and keeps communities focused on building value rather than trading tokens.

### Technical Implementation

```typescript
// SPL Token with transfer restrictions
export class ClubToken {
  name: string;
  symbol: string;
  supply: number;
  tradeable: false; // CANNOT be transferred between wallets
  
  // Fixed 1:1 token pricing
  getTokenPrice(): number {
    // Always 1 USDC = 1 Club Token
    return 1.0;
  }
  
  // Exit price calculation
  getExitPrice(tokenAmount: number): number {
    const treasuryShare = (tokenAmount * this.treasury) / this.totalSupply;
    const exitPenalty = 0.1; // 10% exit fee
    return treasuryShare * (1 - exitPenalty);
  }
}
```

### Token Distribution

| Allocation | Percentage | Vesting | Purpose |
|------------|------------|---------|---------|
| Builders | 70% | Immediate | Available to members who contribute |
| Founders | 15% | 2 years | Club creators and early team |
| Early Builders | 10% | 1 year | First 100 members |
| Treasury | 5% | N/A | Club growth and development fund |

### Fixed Token Pricing Model

```javascript
const FixedTokenModel = {
  // Core principle: Fair pricing for everyone
  philosophy: "1 USDC = 1 Club Token, always",
  
  // Token minting rules
  minting: {
    capitalTokens: {
      rule: "1 USDC = 1 Token",
      fair: "Same rate for everyone, forever",
      example: "$1000 contribution = 1000 tokens"
    },
    
    workTokens: {
      rule: "Earned through building",
      dailyCap: 100, // Max tokens per day
      monthlyCap: 2000, // Max per month
      totalCap: "Max 20% of capital tokens"
    }
  },
  
  // Value calculation
  tokenValue: {
    formula: "Treasury ÷ Total Tokens = Token Value",
    growth: "Token value increases as treasury grows",
    example: {
      month1: { treasury: 10000, tokens: 10000, value: 1.00 },
      month6: { treasury: 50000, tokens: 30000, value: 1.67 },
      year1: { treasury: 150000, tokens: 80000, value: 1.88 }
    }
  },
  
  // Fair for everyone
  fairness: {
    earlyMember: "Pays $100, gets 100 tokens",
    lateMember: "Pays $100, gets 100 tokens", 
    result: "Same price, different timing = fair"
  }
}
```

### Alternative Fair Pricing Models

```javascript
const AlternativeModels = {
  // 1. Scholarship System
  scholarship: {
    basePrice: "$1000",
    pool: "10% of treasury for scholarships",
    application: "Apply with what you'll build",
    sponsors: "Members vote on applications",
    payback: "Optional: share future $BUIDL earnings"
  },
  
  // 2. Contribution-Based Entry
  contribution: {
    options: [
      { type: "MONEY", amount: "$500" },
      { type: "CODE", requirement: "Ship a feature" },
      { type: "CONTENT", requirement: "Create 10 tutorials" },
      { type: "RECRUIT", requirement: "Bring 3 builders" }
    ]
  },
  
  // 3. Progressive Stake Model
  progressive: {
    entry: "$100 minimum",
    progression: {
      month1: "Observer - $100 stake",
      month2: "Builder - Add $200 (total $300)",
      month3: "Core - Add $300 (total $600)",
      month6: "Elder - Add $400 (total $1000)"
    },
    benefits: {
      observer: "1x $BUIDL rate",
      builder: "1.5x $BUIDL rate",
      core: "2x $BUIDL rate",
      elder: "3x $BUIDL rate + governance"
    }
  }
}
```

### Why Non-Tradeable?

1. **Prevent Speculation**: No pump and dumps
2. **Maintain Focus**: Build value, don't trade
3. **Align Incentives**: Everyone builds together
4. **Sustainable Growth**: Real value, not hype
5. **Community Cohesion**: Members committed to long-term success
6. **Democratic Pricing**: Members control their own pricing

## $BUIDL Platform Token

### Token Specifications

```typescript
export class BUIDLToken {
  name: "BUIDL";
  symbol: "BUIDL";
  supply: 1_000_000_000; // 1 billion fixed supply
  decimals: 9;
  tradeable: true; // Unlike club tokens
  
  // Cultural significance
  meaning: "BUIDL is legendary in crypto culture";
  values: "Building over speculation";
  identity: "Holders are BUIDLers";
}
```

### Token Distribution

| Allocation | Percentage | Amount | Vesting | Purpose |
|------------|------------|--------|---------|---------|
| Community Rewards | 40% | 400M | Immediate | Earned by building and contributing |
| Platform Treasury | 20% | 200M | N/A | Platform development and operations |
| Team | 15% | 150M | 2 years | Core team members |
| Investors | 15% | 150M | 1 year | Early investors and advisors |
| Liquidity | 10% | 100M | Immediate | DEX liquidity pools |

### Utility Functions

#### 1. Club Creation
```typescript
// Burn 1000 $BUIDL to create a new club
async createClub(clubData: ClubData): Promise<void> {
  await this.burn(1000 * 10**9); // Burn 1000 BUIDL
  await this.deployClubContract(clubData);
}
```

#### 2. Staking for Multipliers
```typescript
// Stake $BUIDL for 2x earning multiplier
async stakeBUIDL(amount: number, duration: number): Promise<void> {
  await this.transferToStaking(amount);
  this.multiplier = 2.0; // 2x earning multiplier
}
```

#### 3. Governance Rights
```typescript
// Vote on platform evolution
async vote(proposalId: string, support: boolean): Promise<void> {
  const votingPower = this.balance * this.stakedMultiplier;
  await this.castVote(proposalId, support, votingPower);
}
```

#### 4. Premium Features
```typescript
// Access to advanced features
async unlockPremiumFeatures(): Promise<void> {
  const requiredBalance = 10000 * 10**9; // 10,000 BUIDL
  require(this.balance >= requiredBalance, "Insufficient BUIDL");
  this.premiumAccess = true;
}
```

### Value Accrual Mechanisms

#### 1. Deflationary Burning
```typescript
// Every club creation burns 1000 $BUIDL
const burnRate = 1000 * clubsCreated;
const circulatingSupply = totalSupply - burnedAmount;
// As more clubs are created, supply decreases
```

#### 2. Staking Reduces Supply
```typescript
// Staked tokens are locked and reduce circulating supply
const circulatingSupply = totalSupply - stakedAmount - burnedAmount;
// More staking = less circulating supply = higher price
```

#### 3. Network Effects
```typescript
// More clubs = more demand for $BUIDL
const demand = clubsCount * averageBUIDLPerClub;
// Network effects drive organic demand growth
```

## Earning $BUIDL

### Earning Activities

| Activity | Reward | Multiplier | Max Per Day |
|----------|--------|------------|-------------|
| Create Club | 10,000 $BUIDL | 1x | 1 |
| Daily Active | 100 $BUIDL | 1x | 1 |
| Value Contribution | Up to 1,000 $BUIDL | 1-3x | 10 |
| Member Referral | 500 $BUIDL | 1x | 50 |
| Governance Vote | 200 $BUIDL | 1x | 5 |

### Multiplier System

```typescript
const Multipliers = {
  staking: {
    "0-999 BUIDL": 1.0,
    "1000-4999 BUIDL": 1.5,
    "5000+ BUIDL": 2.0
  },
  
  streak: {
    "7 days": 1.1,
    "30 days": 1.5,
    "90 days": 2.0
  },
  
  quality: {
    "exceptional": 3.0,
    "good": 1.5,
    "basic": 1.0
  },
  
  founder: {
    "club_founder": 2.0,
    "early_member": 1.2
  }
};
```

### Monthly Earning Potential

| Builder Type | Activities | Monthly $BUIDL | USD Value* |
|--------------|------------|----------------|------------|
| Casual | Daily active + occasional contributions | 1,000 | $10-50 |
| Active | Daily active + regular contributions + referrals | 5,000 | $50-250 |
| Power Builder | All activities + premium features | 20,000+ | $200-1000+ |

*USD value based on projected $BUIDL price of $0.01-0.05

## Treasury Economics

### Club Treasury Allocation

```typescript
const TreasuryAllocation = {
  tools: "40%", // Shared subscriptions and tools
  rewards: "30%", // $BUIDL rewards for builders
  events: "20%", // Hackathons, meetups, conferences
  reserve: "10%" // Emergency fund and opportunities
};
```

### Platform Revenue Model

```typescript
const RevenueModel = {
  transactionFees: {
    rate: "2%",
    description: "On all treasury transactions"
  },
  
  premiumSubscriptions: {
    pro: "$99/month",
    enterprise: "$999/month"
  },
  
  tokenValue: {
    utility: "Demand from club creation",
    burning: "Deflationary mechanics",
    staking: "Supply reduction"
  }
};
```

## Economic Projections

### Year 1 Projections

```typescript
const Year1Projections = {
  clubs: 10000,
  averageTreasury: "$25,000",
  totalValue: "$250M",
  monthlyRevenue: "$500k",
  buidlPrice: "$0.50-1.00",
  
  // Token metrics
  totalBurned: "10M BUIDL", // 10k clubs * 1000 BUIDL
  totalStaked: "200M BUIDL", // 20% of supply
  circulatingSupply: "590M BUIDL" // 1B - 10M burned - 200M staked - 200M treasury
};
```

### Year 2 Projections

```typescript
const Year2Projections = {
  clubs: 50000,
  averageTreasury: "$50,000",
  totalValue: "$2.5B",
  monthlyRevenue: "$2.5M",
  buidlPrice: "$5-10",
  
  // Token metrics
  totalBurned: "50M BUIDL",
  totalStaked: "400M BUIDL",
  circulatingSupply: "350M BUIDL"
};
```

## Risk Management

### Token Risks

1. **Speculation Risk**: Mitigated by non-tradeable club tokens
2. **Inflation Risk**: Fixed supply with deflationary burning
3. **Liquidity Risk**: Multiple DEX liquidity pools
4. **Regulatory Risk**: Compliance with applicable laws

### Economic Safeguards

1. **Exit Penalties**: 10% penalty discourages quick exits
2. **Vesting Schedules**: Prevents immediate dumps
3. **Governance Controls**: Community controls major decisions
4. **Treasury Diversification**: Multiple asset types in treasuries

## Conclusion

The builda.club token economics are designed to:

1. **Align Incentives**: Reward building over speculation
2. **Create Value**: Non-tradeable club tokens focus on real value
3. **Scale Sustainably**: Deflationary mechanics and network effects
4. **Empower Communities**: Shared ownership and governance
5. **Ensure Fairness**: Member-governed pricing prevents extraction

The system creates a sustainable economy where builders are rewarded for creating value, communities own what they build, members control their own pricing democratically, and the platform grows through network effects rather than speculation.

---

*This tokenomics document will be updated as the platform evolves and new economic mechanisms are introduced.*


