import { AgentClass } from './baseTypes';

export const FirmsClass: AgentClass = {
  name: "Firms",
  description: "Organizations that produce goods and services for profit.",
  roles: [
    "Producers of goods",
    "Service providers",
    "Market makers"
  ],
  examples: [
    "Manufacturing companies",
    "Service companies",
    "Trading firms"
  ],
  defaultProduction: [
    {
      commodityName: "Manufactured Goods",
      rate: 10,
      cost: 50
    }
  ],
  defaultInventory: [
    {
      commodityName: "Raw Materials",
      quantity: 100,
      averagePurchasePrice: 20
    }
  ],
  riskTolerance: 0.6,
  tradingStrategy: "balanced"
};