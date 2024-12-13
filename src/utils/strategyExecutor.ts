import { Agent, Commodity } from "@/types/simulator";

interface TradingDecision {
  action: 'buy' | 'sell' | 'hold';
  commodity?: string;
  quantity?: number;
}

export const executeStrategy = (
  strategyCode: string,
  agent: Agent,
  commodities: Commodity[]
): TradingDecision => {
  try {
    const strategyFn = new Function("agent", "market", strategyCode);
    const market = { commodities };
    
    const decision = strategyFn(agent, market);
    
    // Validate decision format
    if (!decision || !decision.action) {
      console.error("Invalid strategy result format");
      return { action: 'hold' };
    }
    
    return decision;
  } catch (error) {
    console.error("Error executing strategy:", error);
    return { action: 'hold' };
  }
};