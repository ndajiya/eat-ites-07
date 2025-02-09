
import { Tabs } from "@/components/ui/tabs";
import { Agent } from "@/types/simulator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { MarketHeader } from "./MarketHeader";
import { MarketTabsList } from "./tabs/MarketTabsList";
import { MarketTabsContent } from "./tabs/MarketTabsContent";
import { Button } from "@/components/ui/button";

interface MarketViewProps {
  agents: Agent[];
  commodities: any[];
  securities: any[];
  onAgentEdit: (agent: Agent) => void;
  onAgentDelete: (agentName: string) => void;
  onCommodityEdit: (commodity: any) => void;
  onCommodityDelete: (commodityName: string) => void;
  onSecurityTrade: (trade: any) => void;
  newCommodity: any;
  onCommodityNameChange: (value: string) => void;
  onCommodityPriceChange: (value: number) => void;
  onAddCommodity: () => void;
  newSecurity: any;
  onSecurityChange: (field: any, value: any) => void;
  onAddSecurity: () => void;
  onSecurityDelete: (securityId: string) => void;
}

export const MarketView = ({
  agents,
  commodities,
  securities,
  onAgentEdit,
  onAgentDelete,
  onCommodityEdit,
  onCommodityDelete,
  onSecurityTrade,
  newCommodity,
  onCommodityNameChange,
  onCommodityPriceChange,
  onAddCommodity,
  newSecurity,
  onSecurityChange,
  onAddSecurity,
  onSecurityDelete,
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
  const [isSimulating, setIsSimulating] = useState(false);

  const handleNewAgent = () => {
    const agentToAdd = {
      ...newAgent,
      lastRoundDifference: 0,
    };
    agents.push(agentToAdd);
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

  const handleNewCommodity = () => {
    const commodityToAdd = {
      ...newCommodity,
      priceTrend: "Up" as const
    };
    commodities.push(commodityToAdd);
    onCommodityNameChange("");
    onCommodityPriceChange(0);
    toast({
      title: "Commodity Added",
      description: `${newCommodity.name} has been added to the market.`,
    });
  };

  const handleNewSecurity = () => {
    const securityToAdd = {
      ...newSecurity,
      id: Date.now().toString(),
    };
    securities.push(securityToAdd);
    // Reset the form
    onSecurityChange("name", "");
    onSecurityChange("issuer", "");
    onSecurityChange("price", 0);
    onSecurityChange("quantity", 0);
    onSecurityChange("description", "");
    toast({
      title: "Security Added",
      description: `${newSecurity.name} has been added to the market.`,
    });
  };

  const handleDeleteAgent = (agentName: string) => {
    const index = agents.findIndex(agent => agent.name === agentName);
    if (index !== -1) {
      agents.splice(index, 1);
      toast({
        title: "Agent Deleted",
        description: `${agentName} has been removed from the simulation.`,
      });
    }
  };

  const handleDeleteCommodity = (commodityName: string) => {
    const index = commodities.findIndex(commodity => commodity.name === commodityName);
    if (index !== -1) {
      commodities.splice(index, 1);
      toast({
        title: "Commodity Deleted",
        description: `${commodityName} has been removed from the market.`,
      });
    }
  };

  const handleDeleteSecurity = (securityId: string) => {
    const index = securities.findIndex(security => security.id === securityId);
    if (index !== -1) {
      const securityName = securities[index].name;
      securities.splice(index, 1);
      toast({
        title: "Security Deleted",
        description: `${securityName} has been removed from the market.`,
      });
    }
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
      onSecurityChange("new", security);
    });
  };

  const handleSimulateRound = async () => {
    try {
      setIsSimulating(true);
      // Simulate market operations for each agent
      agents.forEach(agent => {
        const randomChange = Math.floor(Math.random() * 201) - 100; // Random value between -100 and 100
        const updatedAgent = {
          ...agent,
          cash: agent.cash + randomChange,
          lastRoundDifference: randomChange
        };
        onAgentEdit(updatedAgent);
      });

      // Update commodity prices
      commodities.forEach(commodity => {
        const priceChange = Math.random() > 0.5 ? 1.1 : 0.9; // 10% up or down
        const updatedCommodity = {
          ...commodity,
          averagePrice: commodity.averagePrice * priceChange,
          priceTrend: priceChange > 1 ? "Up" : "Down"
        };
        onCommodityEdit(updatedCommodity);
      });

      toast({
        title: "Round Simulated",
        description: "Market conditions have been updated.",
      });
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: "An error occurred during the simulation.",
        variant: "destructive"
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6">
      <MarketHeader
        newAgent={newAgent}
        onAgentNameChange={(value) => setNewAgent({ ...newAgent, name: value })}
        onAgentCashChange={(value) => setNewAgent({ ...newAgent, cash: value })}
        onAgentClassChange={(value) => setNewAgent({ ...newAgent, class: value })}
        onAddAgent={handleNewAgent}
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
        <div className="flex justify-center mb-4">
          <Button 
            onClick={handleSimulateRound}
            disabled={isSimulating}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {isSimulating ? "Simulating..." : "Simulate Round"}
          </Button>
        </div>
        <MarketTabsList />
        <MarketTabsContent
          agents={agents}
          commodities={commodities}
          securities={securities}
          onAgentEdit={onAgentEdit}
          onAgentDelete={onAgentDelete}
          onCommodityEdit={onCommodityEdit}
          onSecurityTrade={onSecurityTrade}
          onDeleteCommodity={onCommodityDelete}
          onDeleteSecurity={onSecurityDelete}
        />
      </Tabs>
    </div>
  );
};
