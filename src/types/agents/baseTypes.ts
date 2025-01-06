export type AgentClass = {
  name: string;
  description: string;
  roles: string[];
  examples: string[];
  defaultProduction?: {
    commodityName: string;
    rate: number;
    cost: number;
  }[];
  defaultInventory?: {
    commodityName: string;
    quantity: number;
    averagePurchasePrice: number;
  }[];
  riskTolerance: number;
  tradingStrategy: "conservative" | "aggressive" | "balanced";
};