export const MARKET_TABS = [
  {
    value: "firms",
    label: "Firms",
    agentClasses: ["Firms"]
  },
  {
    value: "governments",
    label: "Governments",
    agentClasses: ["Governments"]
  },
  {
    value: "central-banks",
    label: "Central Banks",
    agentClasses: ["CentralBanks"]
  },
  {
    value: "individuals",
    label: "Individuals",
    agentClasses: ["Households"]
  },
  {
    value: "commodities",
    label: "Commodities",
    type: "commodity"
  },
  {
    value: "securities",
    label: "Securities",
    type: "security"
  }
] as const;