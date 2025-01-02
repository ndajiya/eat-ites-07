import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "@/types/simulator";
import { CommodityTable } from "./CommodityTable";
import { SecuritiesTable } from "./SecuritiesTable";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { MarketHeader } from "./MarketHeader";
import { AgentTab } from "./tabs/AgentTab";

interface MarketViewProps {
  agents: Agent[];
  commodities: any[];
  securities: any[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: any) => void;
  onSecurityTrade: (trade: any) => void;
}

export const MarketView = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade
}: MarketViewProps) => {
  const [newAgent, setNewAgent] = useState<Omit<Agent, "lastRoundDifference">>({
    name: "",
    cash: 1000,
    class: "",
    bookkeeping: new Bookkeeping(),
    inventory: [],
    production: [],
  });
  const { toast } = useToast();

  const handleAddAgent = () => {
    const agentWithDifference = {
      ...newAgent,
      lastRoundDifference: 0,
    };
    onAgentEdit(agentWithDifference);
    setNewAgent({
      name: "",
      cash: 1000,
      class: "",
      bookkeeping: new Bookkeeping(),
      inventory: [],
      production: [],
    });
    toast({
      title: "Agent Added",
      description: `${newAgent.name} has been added to the simulation.`,
    });
  };

  const filterAgentsByClass = (agents: Agent[], classes: string[]) => {
    console.log("Filtering agents:", agents);
    console.log("Looking for classes:", classes);
    const filteredAgents = agents.filter(agent => {
      const matches = classes.includes(agent.class);
      console.log(`Agent ${agent.name} has class ${agent.class}, matches: ${matches}`);
      return matches;
    });
    console.log("Filtered agents:", filteredAgents);
    return filteredAgents;
  };

  useEffect(() => {
    console.log("All agents:", agents);
  }, [agents]);

  return (
    <div className="space-y-6">
      <MarketHeader
        newAgent={newAgent}
        onAgentNameChange={(value) => setNewAgent({ ...newAgent, name: value })}
        onAgentCashChange={(value) => setNewAgent({ ...newAgent, cash: value })}
        onAgentClassChange={(value) => setNewAgent({ ...newAgent, class: value })}
        onAddAgent={handleAddAgent}
      />

      <Tabs defaultValue="firms" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-background">
          <TabsTrigger value="central-banks">Central Banks</TabsTrigger>
          <TabsTrigger value="governments">Governments</TabsTrigger>
          <TabsTrigger value="firms">Firms</TabsTrigger>
          <TabsTrigger value="individuals">Individuals</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="securities">Securities</TabsTrigger>
        </TabsList>

        <TabsContent value="central-banks">
          <AgentTab
            agents={filterAgentsByClass(agents, ["CentralBanks"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="governments">
          <AgentTab
            agents={filterAgentsByClass(agents, ["Governments"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="firms">
          <AgentTab
            agents={filterAgentsByClass(agents, ["Firms"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="individuals">
          <AgentTab
            agents={filterAgentsByClass(agents, ["Households", "Traders"])}
            onAgentEdit={onAgentEdit}
            onAgentDelete={onAgentDelete}
          />
        </TabsContent>

        <TabsContent value="commodities">
          <CommodityTable 
            commodities={commodities}
            onCommodityEdit={onCommodityEdit}
          />
        </TabsContent>

        <TabsContent value="securities">
          <SecuritiesTable 
            securities={securities}
            agents={agents}
            onTrade={onSecurityTrade}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};