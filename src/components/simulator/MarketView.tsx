import { Tabs } from "@/components/ui/tabs";
import { Agent } from "@/types/simulator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { MarketHeader } from "./MarketHeader";
import { MarketTabsList } from "./tabs/MarketTabsList";
import { MarketTabsContent } from "./tabs/MarketTabsContent";

interface MarketViewProps {
  agents: Agent[];
  commodities: any[];
  securities: any[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: any) => void;
  onSecurityTrade: (trade: any) => void;
  newCommodity: any;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: any;
  onSecurityChange: (field: any, value: any) => void;
  onAddSecurity: () => void;
}

export const MarketView = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onSecurityTrade,
  newCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onAddCommodity,
  newSecurity,
  onSecurityChange,
  onAddSecurity,
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

  const handleAgentUpload = (uploadedAgents: Agent[]) => {
    uploadedAgents.forEach(agent => {
      onAgentEdit(agent);
    });
  };

  const handleCommodityUpload = (uploadedCommodities: any[]) => {
    uploadedCommodities.forEach(commodity => {
      onCommodityEdit(commodity);
    });
  };

  const handleSecurityUpload = (uploadedSecurities: any[]) => {
    uploadedSecurities.forEach(security => {
      // Assuming onSecurityChange can handle adding new securities
      onSecurityChange("new", security);
    });
  };

  return (
    <div className="space-y-6">
      <MarketHeader
        newAgent={newAgent}
        onAgentNameChange={(value) => setNewAgent({ ...newAgent, name: value })}
        onAgentCashChange={(value) => setNewAgent({ ...newAgent, cash: value })}
        onAgentClassChange={(value) => setNewAgent({ ...newAgent, class: value })}
        onAddAgent={handleAddAgent}
        newCommodity={newCommodity}
        onCommodityNameChange={onCommodityNameChange}
        onCommodityPriceChange={onCommodityPriceChange}
        onAddCommodity={onAddCommodity}
        newSecurity={newSecurity}
        onSecurityChange={onSecurityChange}
        onAddSecurity={onAddSecurity}
        onAgentUpload={handleAgentUpload}
        onCommodityUpload={handleCommodityUpload}
        onSecurityUpload={handleSecurityUpload}
      />

      <Tabs defaultValue="firms" className="w-full">
        <MarketTabsList />
        <MarketTabsContent
          agents={agents}
          commodities={commodities}
          securities={securities}
          onAgentEdit={onAgentEdit}
          onAgentDelete={onAgentDelete}
          onCommodityEdit={onCommodityEdit}
          onSecurityTrade={onSecurityTrade}
        />
      </Tabs>
    </div>
  );
};