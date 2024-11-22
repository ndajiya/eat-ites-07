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
  riskTolerance: number; // 0-1, higher means more risk-taking
  tradingStrategy: "conservative" | "aggressive" | "balanced";
};

export const AGENT_CLASSES: Record<string, AgentClass> = {
  Households: {
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
  },
  Firms: {
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
  },
  Traders: {
    name: "Traders",
    description: "Specialized entities focused on market operations and arbitrage.",
    roles: [
      "Market makers",
      "Arbitrageurs",
      "Speculators"
    ],
    examples: [
      "Trading desks",
      "Market makers",
      "Hedge funds"
    ],
    defaultInventory: [
      {
        commodityName: "Various Commodities",
        quantity: 200,
        averagePurchasePrice: 30
      }
    ],
    riskTolerance: 0.8,
    tradingStrategy: "aggressive"
  },
  ResourceOwners: {
    name: "Resource Owners",
    description: "Entities that control and manage natural resources.",
    roles: [
      "Resource extraction",
      "Resource management",
      "Supply control"
    ],
    examples: [
      "Mining companies",
      "Oil producers",
      "Land owners"
    ],
    defaultProduction: [
      {
        commodityName: "Raw Materials",
        rate: 20,
        cost: 30
      }
    ],
    riskTolerance: 0.5,
    tradingStrategy: "conservative"
  },
  Governments: {
    name: "Governments",
    description: "State entities responsible for fiscal policy, regulation, and public services.",
    roles: [
      "Policy making",
      "Market regulation",
      "Public services provision",
      "Tax collection"
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
  },
  CentralBanks: {
    name: "Central Banks",
    description: "Monetary authorities responsible for monetary policy and financial stability.",
    roles: [
      "Monetary policy implementation",
      "Interest rate management",
      "Financial system oversight",
      "Currency issuance"
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
  }
};