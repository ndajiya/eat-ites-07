import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security } from "@/types/securities";
import { calculateNewPrice, determinePriceTrend } from "./commodityPricing";
import { generateRandomPriceFluctuation } from "./marketOperations";

const CHUNK_SIZE = 50;

interface Transaction {
  agentId: string;
  cashChange: number;
  date: string;
}

function processInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => T,
  chunkSize: number = CHUNK_SIZE
): T[] {
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const processedChunk = chunk.map((item, index) => processor(item, i + index));
    results.push(...processedChunk);
  }
  
  return results;
}

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

  // Generate transactions
  const transactions: Transaction[] = agents.map((agent) => ({
    agentId: agent.name,
    cashChange: Math.floor(Math.random() * 201) - 100,
    date: new Date().toISOString().split('T')[0]
  }));

  // Process agents in chunks with their transactions
  const updatedAgents = processInChunks<Agent>(
    agents,
    (agent) => {
      const transaction = transactions.find(t => t.agentId === agent.name);
      if (!transaction) return agent;

      const cashChange = transaction.cashChange;
      const date = transaction.date;
      const newCash = agent.cash + cashChange;
      
      agent.bookkeeping.addTransaction(
        date,
        "Revenue",
        cashChange >= 0 ? "Trading Income" : "Trading Expenses",
        Math.abs(cashChange),
        `Round ${currentRound} trading result`,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      agent.bookkeeping.addTransaction(
        date,
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