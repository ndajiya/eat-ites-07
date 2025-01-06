import { Agent, Commodity } from "@/types/simulator";
import { Security, Trade } from "@/types/securities";
import { DataUploadDialog } from "./DataUploadDialog";
import { MarketHeader } from "./MarketHeader";
import { MarketTabsList } from "./tabs/MarketTabsList";
import { MarketTabsContent } from "./tabs/MarketTabsContent";
import { Tabs } from "@/components/ui/tabs";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MarketViewProps {
  agents: Agent[];
  commodities: Commodity[];
  securities: Security[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: Commodity) => void;
  onSecurityTrade: (trade: Omit<Trade, "id" | "timestamp">) => void;
  newCommodity: Commodity;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: Security;
  onSecurityChange: (field: string, value: any) => void;
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

  const handleAgentUpload = (uploadedAgents: any[]) => {
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
      onSecurityChange("new", security);
    });
  };

  return (
    <div className="space-y-4">
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
      <DataUploadDialog
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