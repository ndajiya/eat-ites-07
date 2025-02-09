
import { useState, useEffect } from "react";
import { Agent, EducationLevel } from "@/types/simulator";
import { Bookkeeping } from "@/utils/Bookkeeping";
import associatesAgentData from "@/data/associates-agents.json";
import bachelorsAgentData from "@/data/bachelors-agents.json";

export const useAgentState = (level: EducationLevel) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Select the appropriate data based on education level
    const agentData = level === 'ASSOCIATES' ? associatesAgentData : bachelorsAgentData;
    
    // Initialize agents from JSON data
    const initializedAgents = agentData.agents.map(agent => ({
      ...agent,
      bookkeeping: new Bookkeeping(), // Reinitialize bookkeeping since it can't be serialized in JSON
    }));
    setAgents(initializedAgents);
  }, [level]);

  return { agents, setAgents };
};
