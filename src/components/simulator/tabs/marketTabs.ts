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
  { value: "central-bank", label: "Central Bank", agentClasses: ["CentralBank"] },
  { value: "government", label: "Government", agentClasses: ["Government"] },
  { value: "firm", label: "Firm", agentClasses: ["Firm"] },
  { value: "individual", label: "Individual", agentClasses: ["Household", "Trader"] },
  { value: "commodities", label: "Commodities", type: "commodity" },
  { value: "securities", label: "Securities", type: "security" },
] as const;