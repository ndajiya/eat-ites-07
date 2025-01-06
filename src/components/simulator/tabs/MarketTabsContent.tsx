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
    return agents.filter(agent => {
      // Normalize both strings for comparison
      const normalizedAgentClass = agent.class.toLowerCase();
      const matchesClass = classes.some(cls => cls.toLowerCase() === normalizedAgentClass);
      console.log('Filtering agent:', agent.name, 'class:', agent.class, 'matches:', matchesClass);
      return matchesClass;
    });
  };

  const renderTabContent = (tab: typeof MARKET_TABS[number]) => {
    if ('agentClasses' in tab) {
      const filteredAgents = filterAgentsByClass(agents, tab.agentClasses);
      console.log(`Filtered agents for ${tab.value}:`, filteredAgents);
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