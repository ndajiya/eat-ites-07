import { AgentClass } from './baseTypes';

export const CentralBanksClass: AgentClass = {
  name: "Central Banks",
  description: "Monetary authorities responsible for monetary policy and financial stability.",
  roles: [
    "Monetary policy implementation",
    "Interest rate management",
    "Financial system oversight"
  ],
  examples: [
    "Federal Reserve",
    "European Central Bank",
    "Bank of Japan"
  ],
  defaultInventory: [
    {
      commodityName: "Foreign Exchange Reserves",
      quantity: 10000,
      averagePurchasePrice: 1000
    }
  ],
  riskTolerance: 0.1,
  tradingStrategy: "conservative"
};