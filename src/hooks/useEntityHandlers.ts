import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { useToast } from "@/components/ui/use-toast";

export const useEntityHandlers = (
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  setCommodities: React.Dispatch<React.SetStateAction<Commodity[]>>,
  setSecurities: React.Dispatch<React.SetStateAction<Security[]>>,
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void,
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void,
  setNewSecurity: (security: Omit<Security, "id">) => void,
) => {
  const { toast } = useToast();

  const handleAgentEdit = (updatedAgent: Agent) => {
    setAgents(agents => 
      agents.map(agent => 
        agent.name === updatedAgent.name ? updatedAgent : agent
      )
    );
    toast({
      title: "Agent Updated",
      description: `${updatedAgent.name} has been updated successfully.`,
    });
  };

  const handleCommodityEdit = (updatedCommodity: Commodity) => {
    setCommodities(commodities => 
      commodities.map(commodity => 
        commodity.name === updatedCommodity.name ? updatedCommodity : commodity
      )
    );
    toast({
      title: "Commodity Updated",
      description: `${updatedCommodity.name} has been updated successfully.`,
    });
  };

  const handleAddAgent = () => {
    setAgents(prev => [...prev, {
      name: "",
      cash: 1000,
      class: "",
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      production: []
    }]);
    setNewAgent({ 
      name: "", 
      cash: 1000, 
      class: "", 
      bookkeeping: new Bookkeeping(), 
      inventory: [], 
      production: [] 
    });
    toast({
      title: "Agent Added",
      description: "New agent has been added successfully.",
    });
  };

  const handleAddCommodity = () => {
    setCommodities(prev => [...prev, {
      name: "",
      averagePrice: 0,
      priceTrend: "Up",
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    }]);
    setNewCommodity({ 
      name: "", 
      averagePrice: 0,
      class: "Hard",
      type: "Industrial",
      marketType: "Spot"
    });
    toast({
      title: "Commodity Added",
      description: "New commodity has been added successfully.",
    });
  };

  const handleAddSecurity = () => {
    setSecurities(prev => [...prev, {
      id: (prev.length + 1).toString(),
      name: "",
      class: "Equity",
      type: "CommonStock",
      price: 0,
      volatility: 0.3,
      quantity: 0,
      issuer: "",
      description: "",
    }]);
    setNewSecurity({
      name: "",
      class: "Equity",
      type: "CommonStock",
      price: 0,
      volatility: 0.3,
      quantity: 0,
      issuer: "",
      description: "",
    });
    toast({
      title: "Security Added",
      description: "New security has been added successfully.",
    });
  };

  return {
    handleAgentEdit,
    handleCommodityEdit,
    handleAddAgent,
    handleAddCommodity,
    handleAddSecurity,
  };
};