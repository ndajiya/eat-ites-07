import { Agent, Commodity } from "@/types/simulator";
import { Security } from "@/types/securities";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export const useEntityHandlers = (
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  setCommodities: React.Dispatch<React.SetStateAction<Commodity[]>>,
  setSecurities: React.Dispatch<React.SetStateAction<Security[]>>,
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void,
  setNewCommodity: (commodity: Omit<Commodity, "priceTrend">) => void,
  setNewSecurity: (security: Omit<Security, "id">) => void,
) => {
  const { toast } = useToast();

  const handleAgentEdit = useCallback((updatedAgent: Agent) => {
    setAgents(prevAgents => 
      prevAgents.map(agent => 
        agent.name === updatedAgent.name ? updatedAgent : agent
      )
    );
    toast({
      title: "Agent Updated",
      description: `${updatedAgent.name} has been updated successfully.`,
    });
  }, [setAgents, toast]);

  const handleCommodityEdit = useCallback((updatedCommodity: Commodity) => {
    setCommodities(prevCommodities => 
      prevCommodities.map(commodity => 
        commodity.name === updatedCommodity.name ? updatedCommodity : commodity
      )
    );
    toast({
      title: "Commodity Updated",
      description: `${updatedCommodity.name} has been updated successfully.`,
    });
  }, [setCommodities, toast]);

  const handleAddAgent = useCallback(() => {
    const newAgentData = {
      name: "",
      cash: 1000,
      class: "",
      lastRoundDifference: 0,
      bookkeeping: new Bookkeeping(),
      inventory: [],
      production: []
    };

    setAgents(prev => [...prev, newAgentData]);
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
  }, [setAgents, setNewAgent, toast]);

  const handleAddCommodity = useCallback(() => {
    const newCommodityData = {
      name: "",
      averagePrice: 0,
      priceTrend: "Up" as const,
      class: "Hard" as const,
      type: "Industrial" as const,
      marketType: "Spot" as const
    };

    setCommodities(prev => [...prev, newCommodityData]);
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
  }, [setCommodities, setNewCommodity, toast]);

  const handleAddSecurity = useCallback(() => {
    const newSecurityData = {
      id: Date.now().toString(),
      name: "",
      class: "Equity" as const,
      type: "CommonStock" as const,
      price: 0,
      volatility: 0.3,
      quantity: 0,
      issuer: "",
      description: "",
    };

    setSecurities(prev => [...prev, newSecurityData]);
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
  }, [setSecurities, setNewSecurity, toast]);

  return {
    handleAgentEdit,
    handleCommodityEdit,
    handleAddAgent,
    handleAddCommodity,
    handleAddSecurity,
  };
};