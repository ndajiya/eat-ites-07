export const MARKET_TABS = [
  {
    value: "central-banks",
    label: "Central Banks",
    agentClasses: ["CentralBanks"] as const,
  },
  {
    value: "firms",
    label: "Firms",
    agentClasses: ["Firms"] as const,
  },
  {
    value: "commodities",
    label: "Commodities",
    type: "commodity" as const,
  },
  {
    value: "securities",
    label: "Securities",
    type: "security" as const,
  },
] as const;