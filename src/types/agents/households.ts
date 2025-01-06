import { AgentClass } from './baseTypes';

export const HouseholdsClass: AgentClass = {
  name: "Households",
  description: "Individuals or groups that consume goods and services and supply labor.",
  roles: [
    "Consumers of goods and services",
    "Suppliers of labor",
    "Basic investors"
  ],
  examples: [
    "Family units",
    "Individual consumers",
    "Retail investors"
  ],
  defaultInventory: [
    {
      commodityName: "Food",
      quantity: 10,
      averagePurchasePrice: 5
    }
  ],
  riskTolerance: 0.3,
  tradingStrategy: "conservative"
};