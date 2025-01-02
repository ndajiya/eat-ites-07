type BaseTab = {
  readonly value: string;
  readonly label: string;
};

type AgentTab = BaseTab & {
  readonly agentClasses: readonly string[];
};

type NonAgentTab = BaseTab & {
  readonly type: "commodity" | "security";
};

type MarketTab = AgentTab | NonAgentTab;

export const MARKET_TABS: readonly MarketTab[] = [
  { value: "central-banks", label: "Central Banks", agentClasses: ["CentralBanks"] },
  { value: "governments", label: "Governments", agentClasses: ["Governments"] },
  { value: "firms", label: "Firms", agentClasses: ["Firms"] },
  { value: "individuals", label: "Individuals", agentClasses: ["Households", "Traders"] },
  { value: "commodities", label: "Commodities", type: "commodity" },
  { value: "securities", label: "Securities", type: "security" },
] as const;