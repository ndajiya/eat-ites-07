export const MARKET_TABS = [
  { value: "central-banks", label: "Central Banks", agentClasses: ["CentralBanks"] },
  { value: "governments", label: "Governments", agentClasses: ["Governments"] },
  { value: "firms", label: "Firms", agentClasses: ["Firms"] },
  { value: "individuals", label: "Individuals", agentClasses: ["Households", "Traders"] },
  { value: "commodities", label: "Commodities" },
  { value: "securities", label: "Securities" },
] as const;