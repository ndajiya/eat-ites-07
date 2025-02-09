
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security } from "@/types/securities";
import { calculateNewPrice, determinePriceTrend } from "./commodityPricing";
import { generateRandomPriceFluctuation } from "./marketOperations";
import { processInChunks } from "./processInChunks";
import { generateTransactions } from "./transactions/generateTransactions";

export const simulateRound = async (
  currentRound: number,
  agents: Agent[],
  commodities: Commodity[],
  securities: Security[],
  roundsHistory: RoundData[]
): Promise<{
  updatedSecurities: Security[];
  updatedCommodities: Commodity[];
  updatedAgents: Agent[];
  newRoundData: RoundData;
}> => {
  // Process securities in chunks
  const updatedSecurities = processInChunks<Security>(
    securities,
    (security) => ({
      ...security,
      price: security.price + generateRandomPriceFluctuation(security)
    })
  );

  // Process commodities in chunks
  const updatedCommodities = processInChunks<Commodity>(
    commodities,
    (commodity) => {
      const newPrice = calculateNewPrice(commodity, currentRound, roundsHistory);
      return {
        ...commodity,
        averagePrice: newPrice,
        priceTrend: determinePriceTrend(commodity.averagePrice, newPrice)
      };
    }
  );

  // Generate transactions for each agent
  const transactions = generateTransactions(agents, currentRound);

  // Process agents in chunks with their transactions
  const updatedAgents = processInChunks<Agent>(
    agents,
    (agent) => {
      const transaction = transactions.find(t => t.agentId === agent.name);
      if (!transaction) return agent;

      const { cashChange, date, description, accountName, accountType } = transaction;
      const newCash = agent.cash + cashChange;
      
      // First record the revenue/expense transaction
      agent.bookkeeping.addTransaction(
        date,
        accountType,
        accountName,
        Math.abs(cashChange),
        description,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      // Then record the corresponding cash transaction
      agent.bookkeeping.addTransaction(
        date,
        "Assets",
        "Cash",
        Math.abs(cashChange),
        description,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      return {
        ...agent,
        cash: newCash,
        lastRoundDifference: cashChange,
      };
    }
  );

  // Create round history record
  const newRoundData: RoundData = {
    round: currentRound,
    agents: updatedAgents.map(({ name, cash, lastRoundDifference }) => ({
      name,
      cash,
      difference: lastRoundDifference,
    })),
    commodities: updatedCommodities.map(({ name, averagePrice }) => ({
      name,
      price: averagePrice,
    })),
  };

  return {
    updatedSecurities,
    updatedCommodities,
    updatedAgents,
    newRoundData
  };
};
