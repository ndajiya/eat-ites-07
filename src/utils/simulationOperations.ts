import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security } from "@/types/securities";
import { calculateNewPrice, determinePriceTrend } from "./commodityPricing";
import { generateRandomPriceFluctuation } from "./marketOperations";

const CHUNK_SIZE = 50; // Process 50 items at a time

const processInChunks = <T, R>(
  items: T[],
  processor: (item: T) => R,
  chunkSize: number = CHUNK_SIZE
): R[] => {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const processedChunk = chunk.map(processor);
    results.push(...processedChunk);
  }
  
  return results;
};

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
  const updatedSecurities = await new Promise<Security[]>((resolve) => {
    const processed = processInChunks(
      securities,
      security => ({
        ...security,
        price: security.price + generateRandomPriceFluctuation(security)
      })
    );
    resolve(processed);
  });

  // Process commodities in chunks
  const updatedCommodities = await new Promise<Commodity[]>((resolve) => {
    const processed = processInChunks(
      commodities,
      commodity => {
        const newPrice = calculateNewPrice(commodity, currentRound, roundsHistory);
        return {
          ...commodity,
          averagePrice: newPrice,
          priceTrend: determinePriceTrend(commodity.averagePrice, newPrice)
        };
      }
    );
    resolve(processed);
  });

  // Process agents in chunks
  const transactions = processInChunks(
    agents,
    () => ({
      cashChange: Math.floor(Math.random() * 201) - 100,
      date: new Date().toISOString().split('T')[0],
    })
  );

  const updatedAgents = await new Promise<Agent[]>((resolve) => {
    const processed = processInChunks(
      agents,
      (agent, index) => {
        const { cashChange, date } = transactions[index];
        const newCash = agent.cash + cashChange;
        
        const bookkeepingEntries = [
          {
            date,
            category: "Revenue" as const,
            subcategory: cashChange >= 0 ? "Trading Income" : "Trading Expenses",
            amount: Math.abs(cashChange),
            description: `Round ${currentRound} trading result`,
            type: "Increase" as const
          },
          {
            date,
            category: "Assets" as const,
            subcategory: "Cash",
            amount: Math.abs(cashChange),
            description: `Round ${currentRound} cash adjustment`,
            type: cashChange >= 0 ? "Increase" as const : "Decrease" as const
          }
        ];

        bookkeepingEntries.forEach(entry => {
          agent.bookkeeping.addTransaction(
            entry.date,
            entry.category,
            entry.subcategory,
            entry.amount,
            entry.description,
            entry.type
          );
        });

        return {
          ...agent,
          cash: newCash,
          lastRoundDifference: cashChange,
        };
      }
    );
    resolve(processed);
  });

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