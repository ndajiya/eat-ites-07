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

export const AGENT_CLASSES: Record<string, AgentClass> = {
  Household: {
    name: "Household",
    description: "Individual or group that consumes goods and services and supplies labor.",
    roles: [
      "Consumer of goods and services",
      "Supplier of labor",
      "Basic investor"
    ],
    examples: [
      "Family unit",
      "Individual consumer",
      "Retail investor"
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
  Firm: {
    name: "Firm",
    description: "Organization that produces goods and services for profit.",
    roles: [
      "Producer of goods",
      "Service provider",
      "Market maker"
    ],
    examples: [
      "Manufacturing company",
      "Service company",
      "Trading firm"
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
  Trader: {
    name: "Trader",
    description: "Specialized entity focused on market operations and arbitrage.",
    roles: [
      "Market maker",
      "Arbitrageur",
      "Speculator"
    ],
    examples: [
      "Trading desk",
      "Market maker",
      "Hedge fund"
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
  ResourceOwner: {
    name: "Resource Owner",
    description: "Entity that controls and manages natural resources.",
    roles: [
      "Resource extraction",
      "Resource management",
      "Supply control"
    ],
    examples: [
      "Mining company",
      "Oil producer",
      "Land owner"
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
  Government: {
    name: "Government",
    description: "State entity responsible for fiscal policy, regulation, and public services.",
    roles: [
      "Policy making",
      "Market regulation",
      "Public services provision",
      "Tax collection"
    ],
    examples: [
      "Federal government",
      "State government",
      "Municipal authority"
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
  CentralBank: {
    name: "Central Bank",
    description: "Monetary authority responsible for monetary policy and financial stability.",
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