import { useState } from "react";
import { Agent } from "@/types/simulator";
import { Bookkeeping } from "@/utils/Bookkeeping";

export const useAgentState = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { 
      name: "Federal Reserve", 
      cash: 1000000000, 
      class: "CentralBanks", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      monetaryPolicy: {
        interestRate: 0.05,
        reserveRequirement: 0.1
      }
    },
    { 
      name: "European Central Bank", 
      cash: 900000000, 
      class: "CentralBanks", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      monetaryPolicy: {
        interestRate: 0.04,
        reserveRequirement: 0.08
      }
    },
    { 
      name: "Bank of Japan", 
      cash: 800000000, 
      class: "CentralBanks", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      monetaryPolicy: {
        interestRate: 0.01,
        reserveRequirement: 0.06
      }
    },
    { 
      name: "Producer", 
      cash: 1000, 
      class: "Firms", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      production: [
        {
          commodityName: "Commodity1",
          rate: 10,
          cost: 30
        }
      ]
    },
    { 
      name: "Trader", 
      cash: 800, 
      class: "Firms", 
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [
        {
          commodityName: "Commodity1",
          quantity: 50,
          averagePurchasePrice: 45
        }
      ]
    },
  ]);

  return { agents, setAgents };
};