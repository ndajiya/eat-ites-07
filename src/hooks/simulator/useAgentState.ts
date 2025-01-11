import { useState, useEffect } from "react";
import { Agent } from "@/types/simulator";
import { Bookkeeping } from "@/utils/Bookkeeping";
import agentData from "@/data/agents.json";

export const useAgentState = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Initialize agents from JSON data
    const initializedAgents = agentData.agents.map(agent => ({
      ...agent,
      bookkeeping: new Bookkeeping(), // Reinitialize bookkeeping since it can't be serialized in JSON
    }));
    setAgents(initializedAgents);
  }, []);

  return { agents, setAgents };
};