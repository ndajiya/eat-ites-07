import { AgentClass } from './baseTypes';

export const GovernmentsClass: AgentClass = {
  name: "Governments",
  description: "State entities responsible for fiscal policy and public services.",
  roles: [
    "Policy making",
    "Market regulation",
    "Public services provision"
  ],
  examples: [
    "Federal government",
    "State governments",
    "Municipal authorities"
  ],
  defaultInventory: [
    {
      commodityName: "Strategic Reserves",
      quantity: 1000,
      averagePurchasePrice: 100
    }
  ],
  riskTolerance: 0.2,
  tradingStrategy: "conservative"
};