import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security } from "@/types/securities";
import { calculateNewPrice, determinePriceTrend } from "./commodityPricing";
import { generateRandomPriceFluctuation } from "./marketOperations";

const CHUNK_SIZE = 50;

interface Transaction {
  agentId: string;
  cashChange: number;
  date: string;
  description: string;
  accountName: string;
  accountType: "Revenue" | "Expenses";
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

  // Generate transactions with more detailed descriptions based on agent type
  const transactions: Transaction[] = agents.map((agent) => {
    const baseChange = Math.floor(Math.random() * 201) - 100;
    let description = "";
    let accountType: "Revenue" | "Expenses" = baseChange >= 0 ? "Revenue" : "Expenses";
    let accountName = "";

    // Customize transaction details based on agent class
    switch (agent.class) {
      case "Household":
        accountName = baseChange >= 0 ? "Wage Income" : "Household Expenses";
        description = baseChange >= 0 ? "Monthly wage income" : "Monthly household expenses";
        break;
      case "Firm":
        accountName = baseChange >= 0 ? "Sales Revenue" : "Operating Expenses";
        description = baseChange >= 0 ? "Product sales revenue" : "Business operating costs";
        break;
      case "Government":
        accountName = baseChange >= 0 ? "Tax Revenue" : "Government Spending";
        description = baseChange >= 0 ? "Tax collection" : "Public expenditure";
        break;
      case "CentralBank":
        accountName = baseChange >= 0 ? "Interest Income" : "Monetary Operations";
        description = baseChange >= 0 ? "Interest earned on securities" : "Cost of monetary operations";
        break;
      default:
        accountName = baseChange >= 0 ? "Trading Income" : "Trading Expenses";
        description = baseChange >= 0 ? "General income" : "General expenses";
    }

    return {
      agentId: agent.name,
      cashChange: baseChange,
      date: new Date().toISOString().split('T')[0],
      description: `Round ${currentRound}: ${description}`,
      accountName,
      accountType
    };
  });

  // Process agents in chunks with their transactions
  const updatedAgents = processInChunks<Agent>(
    agents,
    (agent) => {
      const transaction = transactions.find(t => t.agentId === agent.name);
      if (!transaction) return agent;

      const { cashChange, date, description, accountName, accountType } = transaction;
      const newCash = agent.cash + cashChange;
      
      // Record the transaction in the bookkeeping system
      // First record the revenue/expense entry
      agent.bookkeeping.addTransaction(
        date,
        accountType,
        accountName,
        Math.abs(cashChange),
        description,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      // Then record the corresponding cash entry
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
