
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
  accountType: "Revenue" | "Expenses" | "Assets" | "Liabilities";
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

  // Generate transactions with more specific categorization
  const transactions: Transaction[] = agents.map((agent) => {
    const baseChange = Math.floor(Math.random() * 201) - 100;
    let description = "";
    let accountType: "Revenue" | "Expenses" | "Assets" | "Liabilities";
    let accountName = "";

    // Customize transaction details based on agent class
    switch (agent.class) {
      case "Household":
        if (baseChange >= 0) {
          accountType = "Revenue";
          accountName = "Wage Income";
          description = "Monthly wage income";
        } else {
          accountType = "Expenses";
          accountName = "Household Expenses";
          description = "Monthly household expenses";
        }
        break;
      case "Firm":
        if (baseChange >= 0) {
          accountType = "Revenue";
          accountName = "Sales Revenue";
          description = "Product sales revenue";
        } else {
          accountType = "Expenses";
          accountName = "Operating Expenses";
          description = "Business operating costs";
        }
        break;
      case "Government":
        if (baseChange >= 0) {
          accountType = "Revenue";
          accountName = "Tax Revenue";
          description = "Tax collection";
        } else {
          accountType = "Expenses";
          accountName = "Government Spending";
          description = "Public expenditure";
        }
        break;
      case "CentralBanks":
        if (baseChange >= 0) {
          accountType = "Revenue";
          accountName = "Interest Income";
          description = "Interest earned on securities";
        } else {
          accountType = "Expenses";
          accountName = "Monetary Operations";
          description = "Cost of monetary operations";
        }
        break;
      default:
        if (baseChange >= 0) {
          accountType = "Revenue";
          accountName = "Trading Income";
          description = "General income";
        } else {
          accountType = "Expenses";
          accountName = "Trading Expenses";
          description = "General expenses";
        }
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
      
      // Record the revenue/expense transaction
      agent.bookkeeping.addTransaction(
        date,
        accountType,
        accountName,
        Math.abs(cashChange),
        description,
        cashChange >= 0 ? "Increase" : "Decrease"
      );

      // Record the corresponding cash transaction
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
