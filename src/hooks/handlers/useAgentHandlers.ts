import { Agent } from "@/types/simulator";
import { Bookkeeping } from "@/utils/Bookkeeping";
import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

export const useAgentHandlers = (
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>,
  setNewAgent: (agent: Omit<Agent, "lastRoundDifference">) => void,
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

  const handleAgentDelete = useCallback((agentName: string) => {
    setAgents(prevAgents => prevAgents.filter(agent => agent.name !== agentName));
  }, [setAgents]);

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

  return {
    handleAgentEdit,
    handleAgentDelete,
    handleAddAgent,
  };
};