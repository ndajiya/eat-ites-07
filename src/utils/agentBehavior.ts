import { Agent, Commodity } from "@/types/simulator";
import { AGENT_CLASSES } from "@/types/agentClasses";
import { createUtilityCalculator } from "./rationalAgent/utilityCalculator";
import { Bookkeeping } from "./Bookkeeping";

export const calculateTradeDecision = (
  agent: Agent,
  commodity: Commodity,
  currentPrice: number
): { action: 'buy' | 'sell' | 'hold'; quantity: number } => {
  const agentClass = AGENT_CLASSES[agent.class];
  if (!agentClass) return { action: 'hold', quantity: 0 };

  const calculator = createUtilityCalculator();
  
  // Base trade threshold adjusted by risk tolerance
  const tradeThreshold = 0.1 * (1 + agentClass.riskTolerance);
  
  // Calculate price deviation from average
  const priceDeviation = (currentPrice - commodity.averagePrice) / commodity.averagePrice;
  
  // Get current inventory of this commodity
  const currentInventory = agent.inventory.find(i => i.commodityName === commodity.name);
  const inventoryQuantity = currentInventory?.quantity || 0;
  
  // Determine action based on trading strategy
  switch (agentClass.tradingStrategy) {
    case 'aggressive':
      if (priceDeviation < -tradeThreshold) {
        // Buy aggressively when price is low
        const maxQuantity = Math.floor(agent.cash / currentPrice);
        return { action: 'buy', quantity: Math.min(maxQuantity, 100) };
      } else if (priceDeviation > tradeThreshold && inventoryQuantity > 0) {
        // Sell aggressively when price is high
        return { action: 'sell', quantity: inventoryQuantity };
      }
      break;
      
    case 'conservative':
      if (priceDeviation < -tradeThreshold * 2) {
        // Buy conservatively when price is very low
        const maxQuantity = Math.floor(agent.cash / currentPrice * 0.5);
        return { action: 'buy', quantity: Math.min(maxQuantity, 50) };
      } else if (priceDeviation > tradeThreshold * 2 && inventoryQuantity > 0) {
        // Sell conservatively when price is very high
        return { action: 'sell', quantity: Math.floor(inventoryQuantity * 0.5) };
      }
      break;
      
    case 'balanced':
      if (priceDeviation < -tradeThreshold * 1.5) {
        // Balanced buying approach
        const maxQuantity = Math.floor(agent.cash / currentPrice * 0.7);
        return { action: 'buy', quantity: Math.min(maxQuantity, 75) };
      } else if (priceDeviation > tradeThreshold * 1.5 && inventoryQuantity > 0) {
        // Balanced selling approach
        return { action: 'sell', quantity: Math.floor(inventoryQuantity * 0.7) };
      }
      break;
  }
  
  return { action: 'hold', quantity: 0 };
};

export const initializeAgentByClass = (
  name: string,
  initialCash: number,
  className: string
): Omit<Agent, "lastRoundDifference"> => {
  const agentClass = AGENT_CLASSES[className];
  if (!agentClass) {
    throw new Error(`Invalid agent class: ${className}`);
  }

  return {
    name,
    cash: initialCash,
    class: className,
    inventory: agentClass.defaultInventory || [],
    production: agentClass.defaultProduction || [],
    bookkeeping: new Bookkeeping()
  };
};