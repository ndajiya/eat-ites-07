import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security } from "@/types/securities";
import { calculateNewPrice, determinePriceTrend } from "./commodityPricing";
import { generateRandomPriceFluctuation } from "./marketOperations";
import { Bookkeeping } from "./Bookkeeping";

export const simulateRound = (
  currentRound: number,
  agents: Agent[],
  commodities: Commodity[],
  securities: Security[],
  roundsHistory: RoundData[]
): {
  updatedSecurities: Security[];
  updatedCommodities: Commodity[];
  updatedAgents: Agent[];
  newRoundData: RoundData;
} => {
  // Update security prices
  const updatedSecurities = securities.map(security => ({
    ...security,
    price: security.price + generateRandomPriceFluctuation(security)
  }));

  // Update commodity prices using new pricing system
  const updatedCommodities = commodities.map(commodity => {
    const newPrice = calculateNewPrice(commodity, currentRound, roundsHistory);
    return {
      ...commodity,
      averagePrice: newPrice,
      priceTrend: determinePriceTrend(commodity.averagePrice, newPrice)
    };
  });

  const updatedAgents = agents.map((agent) => {
    const cashChange = Math.floor(Math.random() * 201) - 100;
    const newCash = agent.cash + cashChange;
    
    // Record the transaction in the agent's books
    agent.bookkeeping.addTransaction(
      new Date().toISOString().split('T')[0],
      cashChange >= 0 ? "Revenue" : "Expenses",
      cashChange >= 0 ? "Trading Income" : "Trading Expenses",
      Math.abs(cashChange),
      `Round ${currentRound} trading result`,
      "Increase"
    );

    // Update cash balance
    agent.bookkeeping.addTransaction(
      new Date().toISOString().split('T')[0],
      "Assets",
      "Cash",
      Math.abs(cashChange),
      `Round ${currentRound} cash adjustment`,
      cashChange >= 0 ? "Increase" : "Decrease"
    );

    return {
      ...agent,
      cash: newCash,
      lastRoundDifference: cashChange,
    };
  });

  // Record round history
  const newRoundData: RoundData = {
    round: currentRound,
    agents: updatedAgents.map(agent => ({
      name: agent.name,
      cash: agent.cash,
      difference: agent.lastRoundDifference,
    })),
    commodities: updatedCommodities.map(commodity => ({
      name: commodity.name,
      price: commodity.averagePrice,
    })),
  };

  return {
    updatedSecurities,
    updatedCommodities,
    updatedAgents,
    newRoundData
  };
};