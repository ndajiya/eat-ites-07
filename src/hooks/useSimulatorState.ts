import { useState } from "react";
import { Agent, Commodity, RoundData } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { useToast } from "@/components/ui/use-toast";
import { calculateMarketImpact, updateSecurityPrice } from "@/utils/marketOperations";
import { simulateRound } from "@/utils/simulationOperations";

export const useSimulatorState = () => {
  const { toast } = useToast();
  
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

  const [commodities, setCommodities] = useState<Commodity[]>([
    { 
      name: "Commodity1", 
      averagePrice: 50, 
      priceTrend: "Up" as const,
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    },
    { 
      name: "Commodity2", 
      averagePrice: 30, 
      priceTrend: "Down" as const,
      class: "Soft",
      type: "Food",
      marketType: "Futures"
    },
  ]);

  const [securities, setSecurities] = useState<Security[]>([
    {
      id: "1",
      name: "Tech Corp Common Stock",
      class: "Equity",
      type: "CommonStock",
      price: 100,
      volatility: 0.3,
      quantity: 1000000,
      issuer: "Tech Corporation",
      description: "Common stock of leading tech company",
      marketCap: 100000000
    },
    {
      id: "2",
      name: "Gov 10Y Bond",
      class: "Government",
      type: "GovernmentBond",
      price: 1000,
      volatility: 0.1,
      quantity: 500000,
      issuer: "Federal Government",
      description: "10-year government bond",
      interestRate: 0.035,
      maturityDate: "2034-03-15"
    }
  ]);

  return {
    agents,
    setAgents,
    commodities,
    setCommodities,
    securities,
    setSecurities
  };
};
