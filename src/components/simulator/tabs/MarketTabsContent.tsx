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
  const filterAgentsByClass = (agents: Agent[], classes: readonly string[]) => {
    return agents.filter(agent => classes.includes(agent.class));
  };

  const renderTabContent = (tab: typeof MARKET_TABS[number]) => {
    if ('agentClasses' in tab) {
      return (
        <AgentTab
          agents={filterAgentsByClass(agents, tab.agentClasses)}
          onAgentEdit={onAgentEdit}
          onAgentDelete={onAgentDelete}
        />
      );
    }
    
    if (tab.type === 'commodity') {
      return (
        <CommodityTable
          commodities={commodities}
          onCommodityEdit={onCommodityEdit}
        />
      );
    }
    
    if (tab.type === 'security') {
      return (
        <SecuritiesTable
          securities={securities}
          agents={agents}
          onTrade={onSecurityTrade}
        />
      );
    }

    return null;
  };

  return (
    <>
      {MARKET_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {renderTabContent(tab)}
        </TabsContent>
      ))}
    </>
  );
};