
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
  onDeleteCommodity: (commodityName: string) => void;
  onDeleteSecurity: (securityId: string) => void;
}

export const MarketTabsContent = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade,
  onDeleteCommodity,
  onDeleteSecurity,
}: MarketTabsContentProps) => {
  const filterAgentsByClass = (agents: Agent[], classes: readonly string[]) => {
    return agents.filter(agent => classes.some(cls => agent.class === cls));
  };

  const renderTabContent = (tab: typeof MARKET_TABS[number]) => {
    if ('agentClasses' in tab) {
      const filteredAgents = filterAgentsByClass(agents, tab.agentClasses);
      return (
        <AgentTab
          agents={filteredAgents}
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
          onDelete={onDeleteCommodity}
        />
      );
    }
    
    if (tab.type === 'security') {
      return (
        <SecuritiesTable
          securities={securities}
          agents={agents}
          onTrade={onSecurityTrade}
          onDelete={onDeleteSecurity}
        />
      );
    }

    return null;
  };

  return (
    <>
      {MARKET_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4 space-y-4">
          {renderTabContent(tab)}
        </TabsContent>
      ))}
    </>
  );
};
