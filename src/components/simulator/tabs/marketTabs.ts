export const MARKET_TABS = [
  {
    value: "individuals",
    label: "Individuals",
    agentClasses: ["Households"] as const
  },
  {
    value: "firms",
    label: "Firms",
    agentClasses: ["Firms"] as const
  },
  {
    value: "governments",
    label: "Governments",
    agentClasses: ["Government"] as const  // Changed from "Governments" to match the class name
  },
  {
    value: "central-banks",
    label: "Central Banks",
    agentClasses: ["CentralBanks"] as const
  },
  {
    value: "commodities",
    label: "Commodities",
    type: "commodity" as const
  },
  {
    value: "securities",
    label: "Securities",
    type: "security" as const
  }
] as const;

export type MarketTabValue = typeof MARKET_TABS[number]["value"];