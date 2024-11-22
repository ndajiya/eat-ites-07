import { Security, Trade, MarketImpact } from "@/types/securities";

export const calculateMarketImpact = (
  security: Security,
  trade: Omit<Trade, "id" | "timestamp">
): MarketImpact => {
  // Simple market impact calculation
  const impactFactor = trade.quantity / security.quantity;
  const priceChange = security.price * impactFactor * security.volatility;
  
  return {
    priceChange: trade.type === "Buy" ? priceChange : -priceChange,
    volumeChange: trade.quantity,
    marketSentiment: trade.type === "Buy" ? "Bullish" : "Bearish"
  };
};

export const updateSecurityPrice = (
  security: Security,
  impact: MarketImpact
): Security => {
  return {
    ...security,
    price: Math.max(0.01, security.price + impact.priceChange),
    quantity: security.quantity + impact.volumeChange
  };
};

export const generateRandomPriceFluctuation = (security: Security): number => {
  const maxChange = security.price * security.volatility * 0.1;
  return (Math.random() - 0.5) * maxChange;
};