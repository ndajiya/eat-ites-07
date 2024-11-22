export type SecurityClass = 
  | "Equity" 
  | "Debt" 
  | "Hybrid" 
  | "Derivative" 
  | "Government" 
  | "Fund";

export type SecurityType = 
  | "CommonStock"
  | "PreferredStock"
  | "CorporateBond"
  | "GovernmentBond"
  | "ConvertibleBond"
  | "Future"
  | "Option"
  | "ETF"
  | "MutualFund";

export interface Security {
  id: string;
  name: string;
  class: SecurityClass;
  type: SecurityType;
  price: number;
  volatility: number; // 0-1 scale
  quantity: number;
  issuer: string;
  description: string;
  marketCap?: number; // for stocks
  interestRate?: number; // for bonds
  maturityDate?: string; // for bonds
  strikePrice?: number; // for options
  underlyingAsset?: string; // for derivatives
}

export interface Trade {
  id: string;
  securityId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  price: number;
  timestamp: string;
  type: "Buy" | "Sell";
}

export interface MarketImpact {
  priceChange: number;
  volumeChange: number;
  marketSentiment: "Bullish" | "Bearish" | "Neutral";
}