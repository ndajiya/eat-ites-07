import { TabsContent } from "@/components/ui/tabs";
import { Agent } from "@/types/simulator";
import { AgentTab } from "./AgentTab";
import { CommodityTable } from "../CommodityTable";
import { SecuritiesTable } from "../SecuritiesTable";
import { MARKET_TABS } from "./marketTabs";

interface MarketTabsContentProps {
  agents: Agent[];
  commodities: any[];
  securities: any[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: any) => void;
  onSecurityTrade: (trade: any) => void;
}

export const MarketTabsContent = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade,
}: MarketTabsContentProps) => {
  const filterAgentsByClass = (agents: Agent[], classes: string[]) => {
    return agents.filter(agent => classes.includes(agent.class));
  };

  return (
    <>
      {MARKET_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.agentClasses ? (
            <AgentTab
              agents={filterAgentsByClass(agents, tab.agentClasses)}
              onAgentEdit={onAgentEdit}
              onAgentDelete={onAgentDelete}
            />
          ) : tab.value === "commodities" ? (
            <CommodityTable
              commodities={commodities}
              onCommodityEdit={onCommodityEdit}
            />
          ) : tab.value === "securities" ? (
            <SecuritiesTable
              securities={securities}
              agents={agents}
              onTrade={onSecurityTrade}
            />
          ) : null}
        </TabsContent>
      ))}
    </>
  );
};