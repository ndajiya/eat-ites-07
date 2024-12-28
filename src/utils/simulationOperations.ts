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
  // Batch update securities prices
  const updatedSecurities = securities.map(security => ({
    ...security,
    price: security.price + generateRandomPriceFluctuation(security)
  }));

  // Batch update commodity prices
  const updatedCommodities = commodities.map(commodity => {
    const newPrice = calculateNewPrice(commodity, currentRound, roundsHistory);
    return {
      ...commodity,
      averagePrice: newPrice,
      priceTrend: determinePriceTrend(commodity.averagePrice, newPrice)
    };
  });

  // Prepare batch transactions for all agents
  const transactions = agents.map(agent => ({
    cashChange: Math.floor(Math.random() * 201) - 100,
    date: new Date().toISOString().split('T')[0],
  }));

  // Batch update agents with prepared transactions
  const updatedAgents = agents.map((agent, index) => {
    const { cashChange, date } = transactions[index];
    const newCash = agent.cash + cashChange;
    
    // Batch bookkeeping entries
    const bookkeepingEntries = [
      {
        date,
        category: cashChange >= 0 ? "Revenue" : "Expenses",
        subcategory: cashChange >= 0 ? "Trading Income" : "Trading Expenses",
        amount: Math.abs(cashChange),
        description: `Round ${currentRound} trading result`,
        type: "Increase"
      },
      {
        date,
        category: "Assets",
        subcategory: "Cash",
        amount: Math.abs(cashChange),
        description: `Round ${currentRound} cash adjustment`,
        type: cashChange >= 0 ? "Increase" : "Decrease"
      }
    ];

    // Batch add transactions to bookkeeping
    bookkeepingEntries.forEach(entry => {
      agent.bookkeeping.addTransaction(
        entry.date,
        entry.category,
        entry.subcategory,
        entry.amount,
        entry.description,
        entry.type as "Increase" | "Decrease"
      );
    });

    return {
      ...agent,
      cash: newCash,
      lastRoundDifference: cashChange,
    };
  });

  // Create round history record in a single operation
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
