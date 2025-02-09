
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
    console.log("All agents:", agents);
    console.log("Filtering for classes:", classes);
    
    return agents.filter(agent => {
      console.log(`Checking agent ${agent.name} with class ${agent.class}`);
      return classes.some(cls => {
        const matches = agent.class === cls;
        console.log(`Comparing ${agent.class} with ${cls}: ${matches}`);
        return matches;
      });
    });
  };

  const renderTabContent = (tab: typeof MARKET_TABS[number]) => {
    if ('agentClasses' in tab) {
      const filteredAgents = filterAgentsByClass(agents, tab.agentClasses);
      console.log(`Tab ${tab.value} filtered agents:`, filteredAgents);
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
        <TabsContent key={tab.value} value={tab.value} className="mt-4 space-y-4">
          {renderTabContent(tab)}
        </TabsContent>
      ))}
    </>
  );
};
